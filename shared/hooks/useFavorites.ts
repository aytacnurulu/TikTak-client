"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@tiktak/api-client";
import { API } from "@tiktak/constants";
import type { ApiResponse, Product } from "@tiktak/types";
import { useAuthStore } from "@/shared/store/useAuthStore";

export const FAVORITES_QUERY_KEY = ["favorites"] as const;

async function getFavorites(): Promise<Product[]> {
  const { data } = await apiClient.get<ApiResponse<Product[]>>(
    API.CLIENT.PRODUCT.FAVORITES_LIST,
  );
  return data.data;
}

// Response body ignored on purpose — real toggle response shape is
// unconfirmed. Optimistic UI + `["favorites"]` invalidation makes the
// resolved value irrelevant for now.
async function toggleFavorite(productId: number): Promise<void> {
  await apiClient.post(API.CLIENT.PRODUCT.FAVORITE_TOGGLE(productId));
}

export const useFavoritesQuery = () => {
  const token = useAuthStore((s) => s.accessToken);
  return useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: getFavorites,
    enabled: !!token,
  });
};

// Mirrors AddToBasketButton's `basketItems?.find(...)` derivation — reads the
// already-cached favorites list, no extra fetch.
export const useIsFavorite = (productId: number): boolean => {
  const { data } = useFavoritesQuery();
  return data?.some((p) => Number(p.id) === productId) ?? false;
};

export const useToggleFavoriteMutation = (product: Product) => {
  const queryClient = useQueryClient();
  const productId = Number(product.id);

  return useMutation({
    mutationFn: () => toggleFavorite(productId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: FAVORITES_QUERY_KEY });
      const previous = queryClient.getQueryData<Product[]>(FAVORITES_QUERY_KEY);
      const wasFavorite = previous?.some((p) => Number(p.id) === productId) ?? false;

      // Both directions are safe to patch now: removing only needs the id,
      // and adding uses the full `product` the caller already has on hand.
      queryClient.setQueryData<Product[]>(FAVORITES_QUERY_KEY, (old = []) =>
        wasFavorite
          ? old.filter((p) => Number(p.id) !== productId)
          : [...old, product],
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(FAVORITES_QUERY_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY });
    },
  });
};
