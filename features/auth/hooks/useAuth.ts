"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "../api/auth.service";
import { useAuthStore } from "@/shared/store/useAuthStore";
import { useToast } from "@/shared/hooks/useToast";

export const useLoginMutation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((s) => s.setAuth);
  const { showToast } = useToast();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setAuth({
        accessToken: data.tokens.access_token,
        refreshToken: data.tokens.refresh_token,
        role: data.profile.role,
      });
      showToast("Daxil olundu", "Hesabınıza uğurla daxil oldunuz.");
      const redirect = searchParams.get("redirect");
      router.replace(redirect || "/category");
    },
    onError: () => {
      showToast(
        "Daxil olma uğursuz oldu",
        "Telefon və ya parol yanlışdır.",
        "error",
      );
    },
  });
};

export const useSignupMutation = () => {
  const router = useRouter();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: authService.signup,
    onSuccess: () => {
      showToast(
        "Qeydiyyat tamamlandı",
        "Hesabınız yaradıldı. İndi daxil ola bilərsiniz.",
      );
      // TODO: backend-də OTP endpoint-i yoxdur (Postman collection-da yalnız
      // login/signup/refresh var). OTP hazır olanda bura
      // router.push(`/verify-otp?phone=${variables.phone}`) yazılacaq.
      router.replace("/login");
    },
    onError: () => {
      showToast(
        "Qeydiyyat uğursuz oldu",
        "Xahiş edirik məlumatları yenidən yoxlayın.",
        "error",
      );
    },
  });
};
