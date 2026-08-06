'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Card from '@/shared/components/Card';
import Spinner from '@/shared/components/Spinner';
import { useRequireAuth } from '@/shared/hooks/useRequireAuth';
import { useBasketQuery, useBasketMutations } from '@/shared/hooks/useBasket';
import BasketCard from '../components/BasketCard';
import BasketTotalCountPanel from '../components/BasketTotalCountPanel';

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

  if (!hasHydrated || !isAuthenticated || isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="py-8">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/category" className="hover:text-gray-700">
          Ana səhifə
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">Səbətim</span>
      </nav>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-dark">Səbətim</h1>
        {items.length > 0 && (
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

      {items.length === 0 ? (
        <Card className="flex flex-col items-center text-center px-6 py-10">
          <div className="relative w-40 h-40">
            <Image src="/image/emptybasket.svg" alt="" fill className="object-contain" />
          </div>
          <p className="mt-4 text-lg font-semibold text-primary">Səbətiniz boşdur</p>
          <p className="mt-2 text-sm text-gray-500">
            Sifariş vermək üçün səbətinizə məhsul əlavə edin
          </p>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
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

          <BasketTotalCountPanel total={data?.total ?? '0.00'} disabled={items.length === 0} />
        </div>
      )}
    </div>
  );
}
