"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/shared/components/Button";
import { useBasketQuery, useBasketMutations } from "@/shared/hooks/useBasket";
import { useRequireAuth } from "@/shared/hooks/useRequireAuth";
import BasketItemCard from "../BasketItemCard";

export default function BasketPanel() {
  const { isAuthenticated, hasHydrated } = useRequireAuth();
  const pathname = usePathname();
  const { data, isLoading } = useBasketQuery();
  const { add, remove, deleteItem } = useBasketMutations();

  
  const items = data?.items ?? [];
  const total = Number(data?.total ?? 0);

  return (
    <div className="h-[420px] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Səbətim</h2>

      {!hasHydrated || (isAuthenticated && isLoading) ? (
        <p className="text-sm text-gray-500">Yüklənir...</p>
      ) : !isAuthenticated ? (
        <div className="rounded-[10px] border border-gray-100 bg-white flex flex-col items-center text-center px-6 py-10">
          <p className="text-sm text-gray-500">
            Səbətinizi görmək üçün daxil olun
          </p>
          <Link
            href={`/login?redirect=${encodeURIComponent(pathname ?? "/")}`}
            className="mt-4"
          >
            <Button variant="dark" size="sm">
              Daxil ol
            </Button>
          </Link>
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-[10px] border border-gray-100 bg-white flex flex-col items-center text-center px-6 py-10">
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
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {items.map((item) => (
              <BasketItemCard
                key={item.id}
                item={item}
                onIncrease={() => add.mutate(item.product.id)}
                onDecrease={() => remove.mutate(item.product.id)}
                onDelete={() => deleteItem.mutate(item.product.id)}
                disabled={
                  add.isPending || remove.isPending || deleteItem.isPending
                }
              />
            ))}
          </div>

          <div className="mt-4 rounded-[10px] border border-gray-100 bg-white p-4">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Ümumi:</span>
                <span>{Number(total).toFixed(2)} AZN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Çatdırılma:</span>
                <span>Pulsuz</span>
              </div>
            </div>

            <div className="mt-2 flex justify-between font-semibold text-lg">
              <span>Yekun məbləğ:</span>
              <span>{Number(total).toFixed(2)} AZN</span>
            </div>

            <Button variant="dark" size="lg" fullWidth className="mt-4">
              Sifarişi tamamla
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
