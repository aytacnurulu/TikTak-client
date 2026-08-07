import { configureApiClient, postJson } from "@tiktak/api-client";
import type { RefreshResponse } from "@/packages/types/auth";
import { useAuthStore } from "@/shared/store/useAuthStore";
import { logout } from "@/shared/lib/logout";
import { API } from "@tiktak/constants";
console.log("NEXT_PUBLIC_API_BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

async function refreshTokens(refreshToken: string) {
  const json = await postJson<RefreshResponse>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API.CLIENT.AUTH.REFRESH}`,
    { refresh_token: refreshToken },
  );

  useAuthStore
    .getState()
    .setTokens(json.data.access_token, json.data.refresh_token);

  return {
    accessToken: json.data.access_token,
    refreshToken: json.data.refresh_token,
  };
}

configureApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL!,
  getToken: () => useAuthStore.getState().accessToken,
  getRefreshToken: () => useAuthStore.getState().refreshToken,
  refreshTokens,
  onAuthFailure: () => {
    logout();
    if (typeof window !== "undefined") {
      const redirect = encodeURIComponent(
        window.location.pathname + window.location.search,
      );
      window.location.href = `/login?redirect=${redirect}`;
    }
  },
});
