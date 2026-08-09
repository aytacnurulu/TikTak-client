import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/shared/lib/api/categories";
import { getProductById } from "@/shared/lib/api/products";
import CategorySidebar from "@/features/category/components/CategorySidebar";
import Header from "@/shared/components/Header";
import BasketPanel from "@/shared/components/BasketPanel";
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
  const categoryIdNum = Number(categoryId);
  const productId = Number(id);

  let product;
  let categories;

  try {
    [product, categories] = await Promise.all([
      getProductByIdCached(productId),
      getCategories(),
    ]);
  } catch {
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-[rgb(246,245,251)] min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto py-6 px-4">
        <nav className="mb-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            Ana səhifə
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.category.name}</span>
        </nav>

        <div className="grid grid-cols-[280px_1fr_320px] gap-6 items-start">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-900">
              {product.category.name}
            </h2>
            <CategorySidebar
              categories={categories}
              currentCategoryId={categoryIdNum}
            />
          </div>

          <Card className="rounded-[10px] p-6 overflow-hidden h-105">
            <div className="flex items-center justify-between mb-5">
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

            <div className="h-full overflow-y-auto pr-2">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative w-full sm:w-45 aspect-square shrink-0">
                  <ProductImage
                    image={product.img_url || "/image/apple.svg"}
                    title={product.title}
                  />
                </div>

                <div className="flex flex-col gap-2.5 flex-1">
                  <h1 className="text-xl font-bold text-gray-900">
                    {product.title}
                  </h1>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {Number(product.price).toFixed(2)} AZN
                  </p>

                  <div className="mt-1">
                    <ProductDetailActions
                      productId={product.id}
                      product={product}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div>
            <BasketPanel />
          </div>
        </div>
      </div>
    </main>
  );
}
