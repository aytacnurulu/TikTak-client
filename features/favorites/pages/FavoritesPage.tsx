"use client";

import { useEffect } from "react";
import Grid from "@/shared/components/Grid";
import Spinner from "@/shared/components/Spinner";
import ProductCard from "@/shared/components/ProductCard";
import AddToBasketButton from "@/shared/components/AddToBasketButton";
import { useRequireAuth } from "@/shared/hooks/useRequireAuth";
import { useFavoritesQuery } from "@/shared/hooks/useFavorites";
import FavoriteEmptyState from "../components/FavoriteEmptyState";

export default function FavoritesPage() {
  const { requireAuth, isAuthenticated } = useRequireAuth();

  useEffect(() => {
    requireAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: favorites, isLoading, isError } = useFavoritesQuery();

  if (!isAuthenticated) return null;

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center text-error">
        Seçilmişlər yüklənərkən xəta baş verdi.
      </div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return <FavoriteEmptyState />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Seçilmişlər</h1>
      <Grid columns={6} gap={3} ariaLabel="Seçilmiş məhsullar">
        {favorites.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.img_url}
            title={product.title}
            price={product.price}
            size="md"
            actionSlot={<AddToBasketButton productId={product.id} />}
          />
        ))}
      </Grid>
    </div>
  );
}
