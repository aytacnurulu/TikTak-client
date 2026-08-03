'use client';

import Image from 'next/image';
import Card from '@/shared/components/Card';
import QuantitySelector from '@/shared/components/QuantitySelector';
import Spinner from '@/shared/components/Spinner';
import type { BasketItem } from '@/shared/hooks/useBasket';

interface Props {
    item: BasketItem;
    onIncrease: () => void;
    onDecrease: () => void;
    onDelete: () => void;
    disabled?: boolean;
}

export default function BasketItemCard({ item, onIncrease, onDecrease, onDelete, disabled }: Props) {
    return (
        <Card className="p-3 flex items-center gap-3 bg-gray-50">
            <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-white">
                <Image
                    src={item.product.img_url || '/placeholder-product.png'}
                    alt={item.product.title}
                    fill
                    sizes="64px"
                    className="object-contain"
                />
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{item.product.title}</p>
                <div className="mt-1 w-32">
                    <QuantitySelector
                        value={item.quantity}
                        min={0}
                        onIncrease={onIncrease}
                        onDecrease={onDecrease}
                        disabled={disabled}
                    />
                </div>
            </div>

            <div className="flex flex-col items-end justify-between self-stretch">
                <button
                    type="button"
                    onClick={onDelete}
                    disabled={disabled}
                    aria-label="Sil"
                    className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    {disabled ? (
                        <Spinner size="sm" color="primary" />
                    ) : (
                        <Image src="/icons/trash.svg" alt="" width={18} height={18} />
                    )}
                </button>
                <span className="text-sm font-medium text-gray-900">
                    {Number(item.total_price).toFixed(2)} AZN
                </span>
            </div>
        </Card>
    );
}