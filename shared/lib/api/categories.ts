import { cache } from "react";
import { API, CACHE_TTL_SECONDS } from "@tiktak/constants";
import { CategoriesResponse, Category } from "@/packages/types/category";
import { serviceFetch } from "./serviceFetch";

export const getCategories = cache(async (): Promise<Category[]> => {
  const json = await serviceFetch<CategoriesResponse>(
    API.CLIENT.CATEGORY.LIST,
    CACHE_TTL_SECONDS.CATEGORIES,
  );
  return json.data;
});
