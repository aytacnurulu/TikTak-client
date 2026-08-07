import { create } from "zustand";
import { Product } from "@/packages/types/product";
import { Category } from "@/packages/types/category";

interface SearchDataState {
  products: Product[];
  categories: Category[];
  setSearchData: (products: Product[], categories: Category[]) => void;
}

export const useSearchStore = create<SearchDataState>((set) => ({
  products: [],
  categories: [],
  setSearchData: (products, categories) => set({ products, categories }),
}));