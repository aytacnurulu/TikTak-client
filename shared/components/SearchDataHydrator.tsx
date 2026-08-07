"use client";

import { useEffect } from "react";
import { useSearchStore } from "@/shared/store/useSearchStore";
import { Product } from "@/packages/types/product";
import { Category } from "@/packages/types/category";

interface Props {
  products: Product[];
  categories: Category[];
}

export default function SearchDataHydrator({ products, categories }: Props) {
  const setSearchData = useSearchStore((s) => s.setSearchData);

  useEffect(() => {
    setSearchData(products, categories);
  }, [products, categories, setSearchData]);

  return null;
}