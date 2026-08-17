"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@tiktak/api-client";
import { API, queryKeys, BASKET_QUERY_KEY } from "@tiktak/constants";
import type { ApiResponse, Basket, BasketItem } from "@tiktak/types";
import { useAuthStore } from "@/shared/store/useAuthStore";
import { useRequireAuth } from "@/shared/hooks/useRequireAuth";
import { useToast } from "@/shared/hooks/useToast";

export type { BasketItem };

// Export for backward compatibility - use queryKeys.basket.all instead
export { BASKET_QUERY_KEY };

async function fetchBasket(): Promise<Basket> {
  const { data } = await apiClient.get<ApiResponse<Basket>>(
    API.CLIENT.BASKET.LIST,
  );
  return {
    ...data.data,
    items: [...data.data.items].sort((a, b) => b.id - a.id),
  };
}

async function addOne(productId: number): Promise<void> {
  await apiClient.post(API.CLIENT.BASKET.ADD(productId));
}

async function removeOne(productId: number): Promise<void> {
  await apiClient.post(API.CLIENT.BASKET.REMOVE(productId));
}

async function removeAll(productId: number): Promise<void> {
  await apiClient.delete(API.CLIENT.BASKET.REMOVE_ALL(productId));
}

async function clearBasket(): Promise<void> {
  await apiClient.delete(API.CLIENT.BASKET.CLEAR);
}

function priceForQuantity(price: string, quantity: number): string {
  return (Number(price) * quantity).toFixed(2);
}

export function useBasketQuery() {
  const token = useAuthStore((s) => s.accessToken);
  return useQuery({
    queryKey: queryKeys.basket.all,
    queryFn: fetchBasket,
    enabled: !!token,
  });
}

export function useBasketMutations() {
  const qc = useQueryClient();
  const { showToast } = useToast();
  const invalidate = () =>
    qc.invalidateQueries({ queryKey: queryKeys.basket.all });

  // Bütün mutasiyalar üçün ortaq: refetch başlamazdan əvvəl davam edən sorğunu ləğv et,
  // köhnə vəziyyəti saxla (xəta olsa geri qaytarmaq üçün)
  const useOptimisticMutation = (
    mutationFn: (productId: number) => Promise<void>,
    updateItems: (items: BasketItem[], productId: number) => BasketItem[],
    successMessage: string,
    errorMessage: string,
  ) =>
    useMutation({
      mutationFn,
      onMutate: async (productId: number) => {
        await qc.cancelQueries({ queryKey: queryKeys.basket.all });
        const previous = qc.getQueryData<Basket>(queryKeys.basket.all);
        if (previous) {
          qc.setQueryData<Basket>(queryKeys.basket.all, {
            ...previous,
            items: updateItems(previous.items, productId),
          });
        }
        return { previous };
      },
      onSuccess: () => {
        showToast(successMessage);
      },
      onError: (_err, _productId, ctx) => {
        if (ctx?.previous) qc.setQueryData(queryKeys.basket.all, ctx.previous);
        showToast("Əməliyyat uğursuz oldu", errorMessage, "error");
      },
      onSettled: invalidate,
    });

  const add = useOptimisticMutation(
    addOne,
    (items, productId) =>
      items.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
              total_price: priceForQuantity(
                item.product.price,
                item.quantity + 1,
              ),
            }
          : item,
      ),
    "Məhsul səbətə əlavə edildi",
    "Məhsul səbətə əlavə edilə bilmədi",
  );

  const remove = useOptimisticMutation(
    removeOne,
    (items, productId) =>
      items
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
                total_price: priceForQuantity(
                  item.product.price,
                  item.quantity - 1,
                ),
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    "Məhsul sayı yeniləndi",
    "Məhsul sayı yenilənə bilmədi",
  );

  const deleteItem = useOptimisticMutation(
    removeAll,
    (items, productId) => items.filter((item) => item.product.id !== productId),
    "Məhsul səbətdən silindi",
    "Məhsul səbətdən silinə bilmədi",
  );

  const clear = useMutation({
    mutationFn: clearBasket,
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: queryKeys.basket.all });
      const previous = qc.getQueryData<Basket>(queryKeys.basket.all);
      if (previous) {
        qc.setQueryData<Basket>(queryKeys.basket.all, {
          ...previous,
          items: [],
          total: "0.00",
          count: 0,
        });
      }
      return { previous };
    },
    onSuccess: () => {
      showToast("Səbət təmizləndi", "Bütün məhsullar səbətdən silindi.");
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(queryKeys.basket.all, ctx.previous);
      showToast(
        "Səbət təmizlənmədi",
        "Xahiş edirik yenidən cəhd edin.",
        "error",
      );
    },
    onSettled: invalidate,
  });

  return { add, remove, deleteItem, clear };
}

export function useBasketQuantity(productId: number) {
  const { data } = useBasketQuery();
  const { add, remove } = useBasketMutations();
  const { requireAuth, hasHydrated } = useRequireAuth();

  const currentItem = data?.items.find((item) => item.product.id === productId);
  const quantity = currentItem?.quantity ?? 0;

  const setQuantity = (target: number) => {
    if (!requireAuth()) return;
    const diff = target - quantity;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) add.mutate(productId);
    } else if (diff < 0) {
      for (let i = 0; i < -diff; i++) remove.mutate(productId);
    }
  };

  return {
    quantity,
    increase: () => setQuantity(quantity + 1),
    decrease: () => setQuantity(quantity - 1),
    setQuantity,
    isPending: add.isPending || remove.isPending || !hasHydrated,
  };
}
