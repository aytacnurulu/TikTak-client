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
  return data?.some((p) => p.id === productId) ?? false;
};

export const useToggleFavoriteMutation = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleFavorite(productId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: FAVORITES_QUERY_KEY });
      const previous = queryClient.getQueryData<Product[]>(FAVORITES_QUERY_KEY);
      const wasFavorite = previous?.some((p) => p.id === productId) ?? false;

      // Safe optimistic case: removing only needs the id.
      if (wasFavorite) {
        queryClient.setQueryData<Product[]>(FAVORITES_QUERY_KEY, (old = []) =>
          old.filter((p) => p.id !== productId),
        );
      }
      // Adding a brand-new favorite needs a full Product object we don't have
      // here (same limitation AddToBasketButton's addMutation already has for
      // items not yet in its cached list) — left for onSettled's invalidate.
      // Instant visual feedback for this case is handled locally in
      // FavoriteButton's own state, not the query cache.

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
