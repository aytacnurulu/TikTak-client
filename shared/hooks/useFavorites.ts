"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@tiktak/api-client";
import { API, queryKeys, FAVORITES_QUERY_KEY } from "@tiktak/constants";
import type { ApiResponse, Product } from "@tiktak/types";
import { useAuthStore } from "@/shared/store/useAuthStore";

// Export for backward compatibility - use queryKeys.favorites.all instead
export { FAVORITES_QUERY_KEY };

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
    queryKey: queryKeys.favorites.all,
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
      await queryClient.cancelQueries({ queryKey: queryKeys.favorites.all });
      const previous = queryClient.getQueryData<Product[]>(
        queryKeys.favorites.all,
      );
      const wasFavorite =
        previous?.some((p) => Number(p.id) === productId) ?? false;

      // Both directions are safe to patch now: removing only needs the id,
      // and adding uses the full `product` the caller already has on hand.
      queryClient.setQueryData<Product[]>(
        queryKeys.favorites.all,
        (old = []) =>
          wasFavorite
            ? old.filter((p) => Number(p.id) !== productId)
            : [...old, product],
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.favorites.all, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all });
    },
  });
};
