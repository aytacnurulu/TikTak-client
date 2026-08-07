import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

// Auth axınından (login/refresh) kənar, sadə fetch tələb edən yerlər üçün:
// bu sorğular apiClient-in interceptor-larından (token, dil, 401-refresh) keçməməlidir.
export async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const message = await res.text().catch(() => "");
    throw new Error(`POST ${url} failed: ${res.status}${message ? ` — ${message}` : ""}`);
  }

  return res.json() as Promise<T>;
}

interface RefreshedTokens {
  accessToken: string;
  refreshToken: string;
}

interface ApiClientConfig {
  baseURL: string;
  getToken?: () => string | null;
  getLanguage?: () => string;
  getRefreshToken?: () => string | null;
  refreshTokens?: (refreshToken: string) => Promise<RefreshedTokens>;
  onAuthFailure?: () => void;
}

type RetriableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let tokenGetter: () => string | null = () => null;
let languageGetter: () => string = () => "az";
let refreshTokenGetter: () => string | null = () => null;
let refreshTokens: ((refreshToken: string) => Promise<RefreshedTokens>) | null = null;
let onAuthFailure: (() => void) | null = null;

export const apiClient: AxiosInstance = axios.create();

export const configureApiClient = ({
  baseURL,
  getToken,
  getLanguage,
  getRefreshToken,
  refreshTokens: refresh,
  onAuthFailure: onFail,
}: ApiClientConfig) => {
  apiClient.defaults.baseURL = baseURL;
  if (getToken) tokenGetter = getToken;
  if (getLanguage) languageGetter = getLanguage;
  if (getRefreshToken) refreshTokenGetter = getRefreshToken;
  if (refresh) refreshTokens = refresh;
  if (onFail) onAuthFailure = onFail;
};

apiClient.interceptors.request.use((config) => {
  const token = tokenGetter();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Accept-Language"] = languageGetter();
  return config;
});

// Login/signup/refresh 401-lərini bu axının xaricində saxlayırıq —
// onlar yanlış parol/token deməkdir, sessiya bitməsi deyil.
const AUTH_ENDPOINT_MARKERS = ["/auth/login", "/auth/signup", "/auth/refresh"];

let refreshPromise: Promise<string> | null = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;
    const status = error.response?.status;
    const hadAccessToken = !!tokenGetter();

    const shouldAttemptRefresh =
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      hadAccessToken &&
      !AUTH_ENDPOINT_MARKERS.some((marker) => originalRequest.url?.includes(marker));

    if (!shouldAttemptRefresh) {
      return Promise.reject(error);
    }

    const currentRefreshToken = refreshTokenGetter();
    if (!refreshTokens || !currentRefreshToken) {
      onAuthFailure?.();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshTokens(currentRefreshToken)
          .then(({ accessToken }) => accessToken)
          .finally(() => {
            refreshPromise = null;
          });
      }
      const newAccessToken = await refreshPromise;

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      onAuthFailure?.();
      return Promise.reject(refreshError);
    }
  },
);
