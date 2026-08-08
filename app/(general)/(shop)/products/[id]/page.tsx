import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/shared/lib/api/categories";
import { getProductById } from "@/shared/lib/api/products";
import CategorySidebar from "@/features/category/components/CategorySidebar";
import AddToBasketButton from "@/shared/components/AddToBasketButton";
import BasketPanel from "@/shared/components/BasketPanel";
import Card from "@/shared/components/Card";
import ProductImage from "@/shared/components/ProductCard/ProductImage";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const productId = Number(id);
  const product = await getProductById(productId);

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

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);
  const [product, categories] = await Promise.all([
    getProductById(productId),
    getCategories(),
  ]);

  const categoryId = product.category.id;

  return (
    <main className="bg-[rgb(246,245,251)] min-h-screen">
      <div className="max-w-7xl mx-auto py-6 grid grid-cols-[240px_1fr_320px] gap-6">
        <div className="flex flex-col gap-4">
          <CategorySidebar
            categories={categories}
            currentCategoryId={categoryId}
          />

          <Card className="overflow-hidden rounded-3xl p-0">
            <div className="relative w-full aspect-3/4 bg-white">
              <ProductImage
                image={product.img_url || "/image/apple.svg"}
                title={product.title}
              />
            </div>
          </Card>
        </div>

        <section className="bg-white rounded-[30px] p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <Link
                href={`/category/${categoryId}`}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                ← geri qayıt
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-600">
                {product.category.name}
              </span>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold text-gray-900">
                  {product.title}
                </h1>
                <p className="text-gray-500 leading-relaxed">
                  {product.description}
                </p>
                <div className="rounded-[28px] bg-gray-50 p-5">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-sm text-gray-500">Çəkisi</p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">
                        1 kg
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Məhsul növü</p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">
                        {product.type || "Təbii"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Kateqoriya</p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">
                        {product.category.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[30px] border border-gray-100 bg-gray-50 p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Qiymət</p>
                    <p className="text-4xl font-bold text-dark">
                      {Number(product.price).toFixed(2)} AZN
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 shadow-sm">
                    <AddToBasketButton productId={product.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BasketPanel />
      </div>
    </main>
  );
}
