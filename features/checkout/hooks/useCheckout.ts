"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@tiktak/constants";
import { checkoutService } from "../api/checkout.service";
import { useAuthStore } from "@/shared/store/useAuthStore";

export { useBasketQuery } from "@/shared/hooks/useBasket";

export const useProfileQuery = () => {
  const token = useAuthStore((s) => s.accessToken);
  return useQuery({
    queryKey: queryKeys.checkout.profile,
    queryFn: checkoutService.getProfile,
    enabled: !!token,
  });
};

export const useCheckoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkoutService.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.basket.all });
    },
  });
};
