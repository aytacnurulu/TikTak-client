"use client";

import { useState } from "react";
import type { Product } from "@tiktak/types";
import {
  useIsFavorite,
  useToggleFavoriteMutation,
} from "@/shared/hooks/useFavorites";
import { useRequireAuth } from "@/shared/hooks/useRequireAuth";
import HeartIcon from "./HeartIcon";

interface FavoriteButtonProps {
  product: Product;
  className?: string;
}

export default function FavoriteButton({ product, className = "" }: FavoriteButtonProps) {
  const { requireAuth, hasHydrated } = useRequireAuth();
  const productId = Number(product.id);
  const isFavorite = useIsFavorite(productId);
  const toggleMutation = useToggleFavoriteMutation(product);

  const [optimisticOverride, setOptimisticOverride] = useState<boolean | null>(null);
  const displayedAsFavorite = optimisticOverride ?? isFavorite;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!requireAuth()) return;

    setOptimisticOverride(!displayedAsFavorite);
    toggleMutation.mutate(undefined, {
      onSettled: () => setOptimisticOverride(null),
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={displayedAsFavorite}
      aria-label={displayedAsFavorite ? "Seçilmişlərdən çıxar" : "Seçilmişlərə əlavə et"}
      disabled={toggleMutation.isPending || !hasHydrated}
      className={`flex items-center justify-center h-8 w-8 rounded-full bg-white/90 shadow-sm disabled:opacity-70 ${className}`}
    >
      <HeartIcon filled={displayedAsFavorite}/>
    </button>
  );
}

