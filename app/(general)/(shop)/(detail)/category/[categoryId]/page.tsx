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
import BasketPanel from "@/shared/components/BasketPanel";
import Container from "@/shared/components/Container";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ categoryId: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categoryId } = await params;

  if (!categoryId) {
    notFound()
  }

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

  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(categoryIdNum),
  ]);

  const currentCategory = categories.find((c) => c.id === categoryIdNum);

  if (!currentCategory) {
    notFound();
  }

  return (
    <main className="bg-[rgb(246,245,251)]">
      <Header />
      <Container>
        <nav className="mb-4 mt-4 text-sm text-gray-500">
          <Link href="/category" className="hover:text-gray-700">
            Ana səhifə
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{currentCategory?.name ?? "Kateqoriya"}</span>
        </nav>
        <div className="grid grid-cols-[240px_1fr_320px] gap-6 py-2">
          <div className="flex flex-col gap-4">
            <CategorySidebar
              categories={categories}
              currentCategoryId={categoryIdNum}
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
                  href={`/category/${categoryId}/product/${product.id}`}
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
      </Container>
    </main>
  );
}
