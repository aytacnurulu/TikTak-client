import type { ReactNode } from "react";
import SearchDataHydrator from "@/shared/components/SearchDataHydrator";
import { getCategories } from "@/shared/lib/api/categories";
import { getAllProducts } from "@/shared/lib/api/products";

export default async function GeneralLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getAllProducts(),
  ]);

  return (
    <>
      <SearchDataHydrator products={products} categories={categories} />
      <main>{children}</main>
    </>
  );
}