import { LoginResponse, RefreshResponse, TokenPair } from "@/packages/types/auth";

type TokenCache = {
  accessToken: string;
  refreshToken: string;
  accessExpiresAt: number;
};

let cachedToken: TokenCache | null = null;
const ACCESS_TOKEN_TTL_MS = 10 * 60 * 1000;

async function refreshAccessToken(refreshToken: string): Promise<TokenPair> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tiktak/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!res.ok) {
    throw new Error("Refresh token failed: " + res.status);
  }

  const json: RefreshResponse = await res.json();
  return {
    access_token: json.data.access_token,
    refresh_token: json.data.refresh_token,
  };
}

async function loginWithCredentials(): Promise<TokenPair> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tiktak/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: process.env.SSR_SERVICE_PHONE,
      password: process.env.SSR_SERVICE_PASSWORD,
    }),
  });

  if (!res.ok) {
    throw new Error("Service login failed: " + res.status);
  }

  const json: LoginResponse = await res.json();
  return json.data.tokens;
}

export async function getServiceAccessToken(): Promise<string> {
  const now = Date.now();

  if (cachedToken && cachedToken.accessExpiresAt > now) {
    return cachedToken.accessToken;
  }

  const refreshToken =
    cachedToken?.refreshToken ?? process.env.SSR_SERVICE_REFRESH_TOKEN!;

  try {
    const newTokens = await refreshAccessToken(refreshToken);
    cachedToken = {
      accessToken: newTokens.access_token,
      refreshToken: newTokens.refresh_token,
      accessExpiresAt: now + ACCESS_TOKEN_TTL_MS,
    };
    return cachedToken.accessToken;
  } catch (refreshErr) {
    console.warn("Refresh failed, falling back to full login:", refreshErr);
    const newTokens = await loginWithCredentials();
    cachedToken = {
      accessToken: newTokens.access_token,
      refreshToken: newTokens.refresh_token,
      accessExpiresAt: now + ACCESS_TOKEN_TTL_MS,
    };
    return cachedToken.accessToken;
  }
}