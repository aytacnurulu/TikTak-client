"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkoutService } from "../api/checkout.service";
import { BASKET_QUERY_KEY } from "@/shared/hooks/useBasket";

export { useBasketQuery } from "@/shared/hooks/useBasket";

export const useProfileQuery = () =>
  useQuery({ queryKey: ["profile"], queryFn: checkoutService.getProfile });

export const useCheckoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkoutService.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BASKET_QUERY_KEY });
    },
  });
};
