"use client";

import { useEffect } from "react";
import Image from "next/image";
import Card from "@/shared/components/Card";
import Breadcrumb from "@/shared/components/Breadcrumb";
import BasketSkeleton from "@/features/basket/components/BasketSkeleton";
import { useRequireAuth } from "@/shared/hooks/useRequireAuth";
import { useBasketQuery, useBasketMutations } from "@/shared/hooks/useBasket";
import BasketCard from "../components/BasketCard";
import BasketTotalCountPanel from "../components/BasketTotalCountPanel";

export default function BasketPage() {
  const { requireAuth, isAuthenticated, hasHydrated } = useRequireAuth();

  useEffect(() => {
    if (!hasHydrated) return;
    requireAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated]);

  const { data, isLoading } = useBasketQuery();
  const { add, remove, deleteItem, clear } = useBasketMutations();

  const items = data?.items ?? [];
  const isMutating = add.isPending || remove.isPending || deleteItem.isPending;
  const isEmpty = items.length === 0;

  if (!hasHydrated || !isAuthenticated || isLoading) {
    return (
        <BasketSkeleton />
    );
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Ana səhifə", href: "/category" },
          { label: "Səbətim" },
        ]}
        className=" lg:col-span-2"
      />

      <div>
        <div className="flex items-center justify-between mb-[10px]">
          <h1 className="text-[24px] font-bold text-dark">Səbətim</h1>
          {!isEmpty && (
            <button
              type="button"
              onClick={() => clear.mutate()}
              disabled={clear.isPending}
              className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 cursor-pointer"
            >
              Səbəti təmizlə
            </button>
          )}
        </div>

        {isEmpty ? (
          <Card className="flex flex-col items-center text-center px-6 py-10">
            <div className="relative w-40 h-40">
              <Image
                src="/image/emptybasket.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-lg font-semibold text-primary">
              Səbətiniz boşdur
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Sifariş vermək üçün səbətinizə məhsul əlavə edin
            </p>
          </Card>
        ) : (
          <Card className="px-6 divide-y divide-gray-100">
            {items.map((item) => (
              <BasketCard
                key={item.id}
                item={item}
                onIncrease={() => add.mutate(item.product.id)}
                onDelete={() => deleteItem.mutate(item.product.id)}
                disabled={isMutating}
              />
            ))}
          </Card>
        )}
      </div>

      <BasketTotalCountPanel total={data?.total ?? "0.00"} disabled={isEmpty} />
    </>
  );
}
