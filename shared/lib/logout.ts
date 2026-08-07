import { useAuthStore } from "@/shared/store/useAuthStore";
import { getQueryClient } from "@/shared/lib/queryClient";

// Tokenləri təmizləmək kifayət deyil — React Query basket/favorites
// kimi user-ə aid data-nı `enabled: false` olduqda belə cache-də saxlayır,
// əks halda əvvəlki sessiyanın datası logout-dan sonra ekranda qalır.
export function logout() {
  useAuthStore.getState().clearAuth();
  getQueryClient().clear();
}
