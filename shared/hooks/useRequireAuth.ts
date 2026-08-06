"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/shared/store/useAuthStore";

export const useRequireAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((s) => s.accessToken);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  const requireAuth = (): boolean => {
    if (token) return true;
    router.push(`/login?redirect=${encodeURIComponent(pathname ?? "/")}`);
    return false;
  };

  return { requireAuth, isAuthenticated: !!token, hasHydrated };
};
