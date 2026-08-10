import type { Metadata } from "next";
import Grid from "@/shared/components/Grid";
import { getCategories } from "@/shared/lib/api/categories";
import { getProductsByCategory } from "@/shared/lib/api/products";
import ProductCard from "@/shared/components/ProductCard";
import AddToBasketButton from "@/shared/components/AddToBasketButton";
import { notFound } from "next/navigation";
import Image from "next/image";

interface CategoryPageProps {
  params: Promise<{ categoryId: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categoryId } = await params;
  const categories = await getCategories();
  const current = categories.find((c) => c.id === Number(categoryId));

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
  const { categoryId } = await params;
  const categoryIdNum = Number(categoryId);

  const products = await getProductsByCategory(categoryIdNum);

  const categories = await getCategories();
  const currentCategory = categories.find((c) => c.id === categoryIdNum);

  if (!currentCategory) {
    notFound();
  }

  return (
    <section aria-label={currentCategory.name}>
      <h1 className="text-lg font-semibold text-gray-900 mb-4">
        {currentCategory.name}
      </h1>

      {products.length === 0 ? (
        <div className="h-[333px] flex flex-col items-center justify-center py-16 text-center bg-white rounded-lg">
          <Image
            src="/image/empty-state-category.svg"
            alt="Məhsul tapılmadı"
            width={300}
            height={300}
          />
        </div>
      ) : (
        <Grid columns={4} ariaLabel="Məhsullar">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              href={`/category/${categoryIdNum}/product/${product.id}`}
              image={product.img_url || "/image/apple.svg"}
              title={product.title}
              price={product.price}
              actionSlot={<AddToBasketButton productId={product.id}   productType={product.type} />}
            />
          ))}
        </Grid>
      )}
    </section>
  );
}
