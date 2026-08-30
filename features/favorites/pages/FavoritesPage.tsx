"use client";

import { useEffect } from "react";
import Grid from "@/shared/components/Grid";
import Spinner from "@/shared/components/Spinner";
import ProductCard from "@/shared/components/ProductCard";
import AddToBasketButton from "@/shared/components/AddToBasketButton";
import { useRequireAuth } from "@/shared/hooks/useRequireAuth";
import { useFavoritesQuery } from "@/shared/hooks/useFavorites";
import FavoriteEmptyState from "../components/FavoriteEmptyState";
import BasketPanel from "@/shared/components/BasketPanel";
import Breadcrumb from "@/shared/components/Breadcrumb/Breadcrumb";

export default function FavoritesPage() {
  const { requireAuth, isAuthenticated, hasHydrated } = useRequireAuth();

  useEffect(() => {
    if (!hasHydrated) return;
    requireAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated]);

  const { data: favorites, isLoading, isError } = useFavoritesQuery();

  if (!hasHydrated || !isAuthenticated || isLoading) {
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
    <div className="flex flex-col pb-6 lg:grid lg:grid-cols-[1fr_360px] lg:items-start lg:gap-x-6">
      <Breadcrumb
        items={[
          { label: "Ana səhifə", href: "/category" },
          { label: "Seçilmişlərim" },
        ]}
        className="lg:col-span-2"
      />
      <section aria-label="Seçilmiş məhsullar">
        <h1 className="text-[24px] font-bold text-dark mb-[10px]">
          Siyahılarım
        </h1>
        <Grid columns={6} gap={3} ariaLabel="Seçilmiş məhsullar">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.img_url}
              title={product.title}
              price={product.price}
              size="md"
              categoryId={product.category.id}
              actionSlot={
                <AddToBasketButton
                  productId={product.id}
                  productType={product.type}
                />
              }
            />
          ))}
        </Grid>
      </section>

      <div className="mt-6 lg:mt-0">
        <BasketPanel />
      </div>
    </div>
  );
}
