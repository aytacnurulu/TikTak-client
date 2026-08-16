import {
  LoginResponse,
  RefreshResponse,
  TokenPair,
} from "@/packages/types/auth";
import { API } from "@tiktak/constants";
import { postJson } from "@tiktak/api-client";

type TokenCache = {
  accessToken: string;
  refreshToken: string;
  accessExpiresAt: number;
};

let cachedToken: TokenCache | null = null;
const ACCESS_TOKEN_TTL_MS = 10 * 60 * 1000;

async function refreshAccessToken(refreshToken: string): Promise<TokenPair> {
  const json = await postJson<RefreshResponse>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API.CLIENT.AUTH.REFRESH}`,
    { refresh_token: refreshToken },
  );
  return {
    access_token: json.data.access_token,
    refresh_token: json.data.refresh_token,
  };
}

async function loginWithCredentials(): Promise<TokenPair> {
  const json = await postJson<LoginResponse>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API.CLIENT.AUTH.LOGIN}`,
    {
      phone: process.env.SSR_SERVICE_PHONE,
      password: process.env.SSR_SERVICE_PASSWORD,
    },
  );
  return json.data.tokens;
}

export async function getServiceAccessToken(): Promise<string> {
  const now = Date.now();

  if (cachedToken && cachedToken.accessExpiresAt > now) {
    return cachedToken.accessToken;
  }

  // Yalnız BU PROCESS daxilində əvvəlcədən əldə edilmiş refresh token varsa
  // onu sınayırıq. .env-dəki statik SSR_SERVICE_REFRESH_TOKEN artıq bir dəfə
  // istifadə olunub rotasiya edilmiş ola bilər — onu heç vaxt fallback kimi
  // istifadə etmirik, çünki dev-də modul state sıfırlana bilir və bu, hər
  // dəfə eyni köhnəlmiş token-lə 401 xətasına səbəb olurdu.
  if (cachedToken?.refreshToken) {
    try {
      const newTokens = await refreshAccessToken(cachedToken.refreshToken);
      cachedToken = {
        accessToken: newTokens.access_token,
        refreshToken: newTokens.refresh_token,
        accessExpiresAt: now + ACCESS_TOKEN_TTL_MS,
      };
      return cachedToken.accessToken;
    } catch (refreshErr) {
      console.warn("Refresh failed, falling back to full login:", refreshErr);
    }
  }

  const newTokens = await loginWithCredentials();
  cachedToken = {
    accessToken: newTokens.access_token,
    refreshToken: newTokens.refresh_token,
    accessExpiresAt: now + ACCESS_TOKEN_TTL_MS,
  };
  return cachedToken.accessToken;
}
