import { configureApiClient } from "@tiktak/api-client";
import { useAuthStore } from "@/shared/store/useAuthStore";
console.log("NEXT_PUBLIC_API_BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
configureApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL!,
  getToken: () => useAuthStore.getState().accessToken,
});
