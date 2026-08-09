import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "@/shared/components/Card";
import CategorySidebar from "@/features/category/components/CategorySidebar";
import BasketPanel from "@/shared/components/BasketPanel";
import { getCategories } from "@/shared/lib/api/categories";

interface CategoryDetailLayoutProps {
  children: ReactNode;
  params: Promise<{ categoryId: string }>;
}

export default async function CategoryDetailLayout({
  children,
  params,
}: CategoryDetailLayoutProps) {
  const { categoryId } = await params;
  const categoryIdNum = Number(categoryId);

  const categories = await getCategories();
  const currentCategory = categories.find((c) => c.id === categoryIdNum);

  return (
    <>
      <nav className="mb-4 pt-2 text-sm text-gray-500">
        <Link href="/category" className="hover:text-gray-700">
          Ana səhifə
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">
          {currentCategory?.name ?? "Kateqoriya"}
        </span>
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

        {children}

        <BasketPanel />
      </div>
    </>
  );
}