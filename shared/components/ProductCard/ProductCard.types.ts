import { ReactNode } from "react";
import type { StaticImageData } from "next/image";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  badge?: string;
}

export type ProductCardSize = "sm" | "md" | "lg";

export interface ProductCardProps {
  id: number | string;
  image: string | StaticImageData;
  title: string;
  price: string;
  href?: string;
  currency?: string;
  categoryId?: number | string;
  actionSlot: ReactNode;
  className?: string;
  size?: ProductCardSize;
  onAddToCart?: (product: Product, quantity: number) => void;
}
