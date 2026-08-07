import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  hasHydrated: boolean;
  setAuth: (params: {
    accessToken: string;
    refreshToken: string;
    role: string;
  }) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      role: null,
      hasHydrated: false,
      setAuth: ({ accessToken, refreshToken, role }) =>
        set({ accessToken, refreshToken, role }),
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      clearAuth: () =>
        set({ accessToken: null, refreshToken: null, role: null }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "tiktak-client-auth",
      partialize: ({ accessToken, refreshToken, role }) => ({
        accessToken,
        refreshToken,
        role,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
