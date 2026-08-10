import type { ReactNode } from "react";
import Image from "next/image";
import Card from "@/shared/components/Card";
import Breadcrumb from "@/shared/components/Breadcrumb";
import CategorySidebar from "@/features/category/components/CategorySidebar";
import CategoryFilterAccordion from "@/features/category/components/CategoryFilterAccordion";
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
      <Breadcrumb
        items={[
          { label: "Ana səhifə", href: "/category" },
          { label: currentCategory?.name ?? "Kateqoriya" },
        ]}
      />

      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[240px_1fr_320px] lg:gap-6 lg:items-start">
        <CategoryFilterAccordion
          categories={categories}
          currentCategoryId={categoryIdNum}
        />

        <div className="hidden lg:flex lg:flex-col gap-4">
          <CategorySidebar
            categories={categories}
            currentCategoryId={categoryIdNum}
            variant="card"
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

        <BasketPanel
          headingAs="h2"
          headingClassName="text-lg font-semibold text-gray-900 mb-4"
        />
      </div>
    </>
  );
}
