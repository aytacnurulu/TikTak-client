'use client';

import Image from 'next/image';
import Card from '@/shared/components/Card';
import Button from '@/shared/components/Button';
import { useBasketQuery, useBasketMutations } from '@/shared/hooks/useBasket';
import BasketItemCard from '../BasketItemCard';

export default function BasketPanel() {
    const { data, isLoading } = useBasketQuery();
    const { add, remove, deleteItem } = useBasketMutations();

    const total = data?.reduce((sum, item) => sum + Number(item.total_price), 0) ?? 0;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Səbətim</h2>

            {isLoading ? (
                <p className="text-sm text-gray-500">Yüklənir...</p>
            ) : !data || data.length === 0 ? (
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
                <>
                    <div className="space-y-3">
                        {data.map((item) => (
                            <BasketItemCard
                                key={item.id}
                                item={item}
                                onIncrease={() => add.mutate(item.product.id)}
                                onDecrease={() => remove.mutate(item.product.id)}
                                onDelete={() => deleteItem.mutate(item.product.id)}
                                disabled={add.isPending || remove.isPending || deleteItem.isPending}
                            />
                        ))}
                    </div>

                    <Card className="mt-4 p-4">
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
                    </Card>
                </>
            )}
        </div>
    );
}