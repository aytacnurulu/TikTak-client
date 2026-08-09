import type { ReactNode } from "react";
import SearchDataHydrator from "@/shared/components/SearchDataHydrator";
import { getCategories } from "@/shared/lib/api/categories";
import { getAllProducts } from "@/shared/lib/api/products";
import Header from "@/shared/components/Header";
import Container from "@/shared/components/Container";

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
      <Header />
       <main className="bg-[rgb(246,245,251)] min-h-screen">
        <Container>{children}</Container>
      </main>
    </>
  );
}