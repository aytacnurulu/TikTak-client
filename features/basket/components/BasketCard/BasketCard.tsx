'use client';

import Image from 'next/image';
import Spinner from '@/shared/components/Spinner';
import type { BasketCardProps } from './types';

const unitLabel = (type: string) => (type === 'kg' ? 'kq' : type);

export default function BasketCard({ item, onIncrease, onDelete, disabled }: BasketCardProps) {
  return (
    <div className="flex items-center gap-4 py-4">
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
        <p className="font-bold text-gray-900 truncate">
          {item.product.title} {item.quantity} {unitLabel(item.product.type)}
        </p>
        <p className="mt-1 text-sm text-gray-500">{item.total_price} AZN</p>
      </div>

      <div className="flex items-center gap-1 bg-primary rounded-full px-1.5 py-1.5 shrink-0">
        <button
          type="button"
          onClick={onDelete}
          disabled={disabled}
          aria-label="Sil"
          className="flex items-center justify-center w-7 h-7 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {disabled ? (
            <Spinner size="sm" color="white" />
          ) : (
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 5h14M8 5V3.5A1.5 1.5 0 0 1 9.5 2h1A1.5 1.5 0 0 1 12 3.5V5m-7 0 .8 10.4A2 2 0 0 0 7.79 17h4.42a2 2 0 0 0 1.99-1.6L15 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M8.5 8.5v5M11.5 8.5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>

        <span className="w-5 text-center text-sm font-medium text-white">{item.quantity}</span>

        <button
          type="button"
          onClick={onIncrease}
          disabled={disabled}
          aria-label="Sayı artır"
          className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/25 text-white text-lg leading-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
}
