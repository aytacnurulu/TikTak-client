"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { checkoutService } from "../api/checkout.service";

export const useProfileQuery = () =>
  useQuery({ queryKey: ["profile"], queryFn: checkoutService.getProfile });

export const useBasketQuery = () =>
  useQuery({ queryKey: ["basket"], queryFn: checkoutService.getBasket });

export const useCheckoutMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkoutService.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["basket"] });
      router.push("/profile/orders");
    },
  });
};
