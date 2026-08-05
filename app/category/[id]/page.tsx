import type { Metadata } from "next";
import Image from "next/image";
import Grid from "@/shared/components/Grid";
import Card from "@/shared/components/Card";
import { getCategories } from "@/shared/lib/api/categories";
import { getProductsByCategory } from "@/shared/lib/api/products";
import CategorySidebar from "@/features/category/components/CategorySidebar";
import ProductCard from "@/shared/components/ProductCard";
import AddToBasketButton from "@/shared/components/AddToBasketButton";
import Header from "@/shared/components/Header";
import BasketPanel from "@/features/basket/components/BasketPanel";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { id } = await params;
  const categories = await getCategories();
  const current = categories.find((c) => c.id === Number(id));

  if (!current) {
    return { title: "Kateqoriya tapılmadı — Tik Tak" };
  }

  return {
    title: `${current.name} — Tik Tak`,
    description: current.description,
    openGraph: {
      title: current.name,
      description: current.description,
      images: [current.img_url],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const categoryId = Number(id);

  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(categoryId),
  ]);

  const currentCategory = categories.find((c) => c.id === categoryId);

  return (
    <main className="bg-[rgb(246,245,251)]">
      <Header />
      <div className="max-w-7xl mx-auto py-2 grid grid-cols-[240px_1fr_320px] gap-6">
        <div className="flex flex-col gap-4">
          <CategorySidebar
            categories={categories}
            currentCategoryId={categoryId}
          />

          <Card className="relative w-full aspect-[3/4] overflow-hidden p-0">
            <Image
              src="/image/categorydetailbanner.svg"
              alt="Meyvələrə endirim"
              fill
              className="object-cover"
            />
          </Card>
        </div>

        <section aria-label={currentCategory?.name ?? "Məhsullar"}>
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            {currentCategory?.name}
          </h1>

          <Grid columns={4} ariaLabel="Məhsullar">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.img_url || "/image/apple.svg"}
                title={product.title}
                price={product.price}
                actionSlot={<AddToBasketButton productId={product.id} />}
              />
            ))}
          </Grid>
        </section>

        <BasketPanel />
      </div>
    </main>
  );
}
