import { cache } from "react";
import { API, CACHE_TTL_SECONDS } from "@tiktak/constants";
import { Product, ProductsResponse } from "@/packages/types/product";
import { serviceFetch } from "./serviceFetch";

export const getProductsByCategory = cache(
  async (categoryId: number): Promise<Product[]> => {
    const json = await serviceFetch<ProductsResponse>(
      `${API.CLIENT.PRODUCT.LIST}?category_id=${categoryId}`,
      CACHE_TTL_SECONDS.PRODUCTS,
    );
    return json.data;
  },
);

export const getProductById = cache(
  async (productId: number): Promise<Product> => {
    const json = await serviceFetch<{
      message: string;
      data: Product;
      result: boolean;
    }>(API.CLIENT.PRODUCT.DETAIL(productId), CACHE_TTL_SECONDS.PRODUCTS);
    return json.data;
  },
);
