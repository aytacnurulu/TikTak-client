'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/store/useAuthStore';

interface BasketProduct {
  id: number;
  title: string;
  img_url: string;
  price: string;
}

export interface BasketItem {
  id: number;
  quantity: number;
  total_price: string;
  product: BasketProduct;
}

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const QUERY_KEY = ['basket'];

async function fetchBasket(token: string): Promise<BasketItem[]> {
  const res = await fetch(`${BASE}/api/tiktak/basket/list`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Basket fetch failed');
  return (await res.json()).data;
}

async function addOne(token: string, productId: number) {
  const res = await fetch(`${BASE}/api/tiktak/basket/${productId}/add`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Add failed');
}

async function removeOne(token: string, productId: number) {
  const res = await fetch(`${BASE}/api/tiktak/basket/${productId}/remove`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Remove failed');
}

async function removeAll(token: string, productId: number) {
  const res = await fetch(`${BASE}/api/tiktak/basket/${productId}/remove-all`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Remove all failed');
}

export function useBasketQuery() {
  const token = useAuthStore((s) => s.accessToken);
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => fetchBasket(token!),
    enabled: !!token,
  });
}

export function useBasketMutations() {
  const token = useAuthStore((s) => s.accessToken);
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: QUERY_KEY });

  // Bütün mutasiyalar üçün ortaq: refetch başlamazdan əvvəl davam edən sorğunu ləğv et,
  // köhnə vəziyyəti saxla (xəta olsa geri qaytarmaq üçün)
  const snapshot = async () => {
    await qc.cancelQueries({ queryKey: QUERY_KEY });
    return qc.getQueryData<BasketItem[]>(QUERY_KEY);
  };

  const add = useMutation({
    mutationFn: (productId: number) => addOne(token!, productId),
    onMutate: async (productId: number) => {
      const previous = await snapshot();
      qc.setQueryData<BasketItem[]>(QUERY_KEY, (old) =>
        old?.map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
                total_price: (Number(item.product.price) * (item.quantity + 1)).toFixed(2),
              }
            : item,
        ),
      );
      return { previous };
    },
    onError: (_err, _productId, ctx) => {
      if (ctx?.previous) qc.setQueryData(QUERY_KEY, ctx.previous);
    },
    onSettled: invalidate,
  });

  const remove = useMutation({
    mutationFn: (productId: number) => removeOne(token!, productId),
    onMutate: async (productId: number) => {
      const previous = await snapshot();
      qc.setQueryData<BasketItem[]>(QUERY_KEY, (old) =>
        old
          ?.map((item) =>
            item.product.id === productId && item.quantity > 1
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  total_price: (Number(item.product.price) * (item.quantity - 1)).toFixed(2),
                }
              : item,
          ),
      );
      return { previous };
    },
    onError: (_err, _productId, ctx) => {
      if (ctx?.previous) qc.setQueryData(QUERY_KEY, ctx.previous);
    },
    onSettled: invalidate,
  });

  const deleteItem = useMutation({
    mutationFn: (productId: number) => removeAll(token!, productId),
    onMutate: async (productId: number) => {
      const previous = await snapshot();
      qc.setQueryData<BasketItem[]>(QUERY_KEY, (old) =>
        old?.filter((item) => item.product.id !== productId),
      );
      return { previous };
    },
    onError: (_err, _productId, ctx) => {
      if (ctx?.previous) qc.setQueryData(QUERY_KEY, ctx.previous);
    },
    onSettled: invalidate,
  });

  return { add, remove, deleteItem };
}