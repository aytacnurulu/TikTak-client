'use client';

import { useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import QuantitySelector from '@/shared/components/QuantitySelector';
import { AuthState, useAuthStore } from '@/shared/store/useAuthStore';
import { useRequireAuth } from '@/shared/hooks/useRequireAuth';
import Button from '@/shared/components/Button';
import type { Product } from '@/packages/types/product';

interface ProductDetailActionsProps {
  productId: number;
  product: Product;
}

interface BasketProduct {
  id: number;
  title: string;
  price: string;
}

interface BasketItem {
  id: number;
  quantity: number;
  total_price: string;
  product: BasketProduct;
}

interface BasketResponse {
  message: string;
  data: {
    items: BasketItem[];
    total: string;
    count: number;
  };
  result: boolean;
}

async function fetchBasket(token: string): Promise<BasketItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tiktak/basket`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Basket fetch failed');
  const json: BasketResponse = await res.json();
  return json.data.items;
}

async function addOneToBasket(token: string, productId: number): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tiktak/basket/${productId}/add`,
    { method: 'POST', headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) throw new Error('Add to basket failed');
}

async function removeOneFromBasket(token: string, productId: number): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tiktak/basket/${productId}/remove`,
    { method: 'POST', headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) throw new Error('Remove from basket failed');
}

export default function ProductDetailActions({ productId }: ProductDetailActionsProps) {
  const token = useAuthStore((state: AuthState) => state.accessToken);
  const { requireAuth } = useRequireAuth();
  const queryClient = useQueryClient();

  const { data: basketItems } = useQuery({
    queryKey: ['basket'],
    queryFn: () => fetchBasket(token!),
    enabled: !!token,
  });

  const currentItem = basketItems?.find((item) => item.product.id === productId);
  const currentQuantity = currentItem?.quantity ?? 0;

  const addMutation = useMutation({
    mutationFn: () => addOneToBasket(token!, productId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['basket'] });
      const previous = queryClient.getQueryData<BasketItem[]>(['basket']);
      queryClient.setQueryData<BasketItem[]>(['basket'], (old = []) =>
        old.some((item) => item.product.id === productId)
          ? old.map((item) =>
              item.product.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : old
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(['basket'], context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['basket'] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: () => removeOneFromBasket(token!, productId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['basket'] });
      const previous = queryClient.getQueryData<BasketItem[]>(['basket']);
      queryClient.setQueryData<BasketItem[]>(['basket'], (old = []) =>
        old
          .map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(['basket'], context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['basket'] });
    },
  });

  const pendingDelta = useRef(0);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flushDelta = () => {
    const delta = pendingDelta.current;
    pendingDelta.current = 0;
    if (delta > 0) {
      for (let i = 0; i < delta; i++) addMutation.mutate();
    } else if (delta < 0) {
      for (let i = 0; i < -delta; i++) removeMutation.mutate();
    }
  };

  const scheduleChange = (diff: 1 | -1) => {
    if (!requireAuth()) return;
    pendingDelta.current += diff;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(flushDelta, 500);
  };

  if (currentQuantity > 0) {
    return (
      <QuantitySelector
        value={currentQuantity}
        unit="1 kg"
        min={0}
        onIncrease={() => scheduleChange(1)}
        onDecrease={() => scheduleChange(-1)}
        disabled={addMutation.isPending || removeMutation.isPending}
      />
    );
  }

  return (
    <Button
      type="button"
      variant="success"
      size="lg"
      fullWidth
      loading={addMutation.isPending}
      onClick={(e) => {
        e.preventDefault();
        scheduleChange(1);
      }}
    >
      Səbətə əlavə et
    </Button>
  );
}