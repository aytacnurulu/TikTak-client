import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import Card from '@/shared/components/Card';

interface ProductCardProps {
  id: number | string;
  image: string | StaticImageData;
  title: string;
  price: string;
  currency?: string;
  actionSlot: ReactNode;
  className?: string;
}

export default function ProductCard({
  id,
  image,
  title,
  price,
  currency = 'AZN',
  actionSlot,
  className = '',
}: ProductCardProps) {
  return (
    <Card
      className={`flex flex-col items-center p-3 w-full transition-shadow hover:shadow-md ${className}`}
    >
      <Link href={`/product/${id}`} className="flex flex-col items-center w-full">
        <div className="relative w-full aspect-square shrink-0">
          <Image
            src={image}
            alt={title}
            sizes="(max-width: 768px) 45vw, 200px"
            fill
            className="object-contain"
          />
        </div>
        <span className="mt-4 text-sm font-medium text-gray-800 text-center leading-snug line-clamp-2 min-h-[2.5em]">
          {title}
        </span>
        <span className="mt-0.5 text-sm text-gray-500">
          {Number(price).toFixed(2)} {currency}
        </span>
      </Link>

      <div className="w-full mt-3">{actionSlot}</div>
    </Card>
  );
}