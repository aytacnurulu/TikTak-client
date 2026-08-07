"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkoutService } from "../api/checkout.service";
import { BASKET_QUERY_KEY } from "@/shared/hooks/useBasket";
import { useAuthStore } from "@/shared/store/useAuthStore";

export { useBasketQuery } from "@/shared/hooks/useBasket";

export const useProfileQuery = () => {
  const token = useAuthStore((s) => s.accessToken);
  return useQuery({
    queryKey: ["profile"],
    queryFn: checkoutService.getProfile,
    enabled: !!token,
  });
};

export const useCheckoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkoutService.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BASKET_QUERY_KEY });
    },
  });
};
