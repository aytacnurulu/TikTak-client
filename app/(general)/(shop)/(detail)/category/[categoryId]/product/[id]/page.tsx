import type { Metadata } from "next";
import Link from "next/link";
import { getProductById } from "@/shared/lib/api/products";
import Card from "@/shared/components/Card";
import ProductImage from "@/shared/components/ProductCard/ProductImage";
import ProductDetailActions from "@/shared/components/ProductDetailActions/ProductDetailActions";
import FavoriteButton from "@/shared/components/FavoriteButton";
import { notFound } from "next/navigation";
import { cache } from "react";

interface ProductDetailPageProps {
  params: Promise<{ categoryId: string; id: string }>;
}

export const getProductByIdCached = cache(getProductById);

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductByIdCached(Number(id));

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} — Tik Tak`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.img_url],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { categoryId, id } = await params;
  const product = await getProductByIdCached(Number(id));


  if (!product) {
    notFound();
  }

  return (
    <Card className="rounded-[10px] p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href={`/category/${categoryId}`}
          className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12.5 8H3.5M3.5 8L7.5 4M3.5 8L7.5 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          geri qayıt
        </Link>

        <FavoriteButton
          product={{
            id: product.id,
            title: product.title,
            img_url: product.img_url,
            price: product.price,
            description: product.description,
            type: product.type,
            created_at: product.created_at,
            category: product.category,
          }}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="relative w-full sm:w-45 aspect-square shrink-0">
          <ProductImage
            image={product.img_url || "/image/apple.svg"}
            title={product.title}
          />
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <h1 className="text-xl font-bold text-gray-900">
            {product.title}
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
            {product.description}
          </p>
          <p className="text-lg font-bold text-gray-900">
            {Number(product.price).toFixed(2)} AZN
          </p>

          <ProductDetailActions productId={product.id} product={product} />
        </div>
      </div>
    </Card>
  );
}
