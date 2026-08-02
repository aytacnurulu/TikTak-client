import { Product, ProductsResponse } from "@/packages/types/product";
import { getServiceAccessToken } from "../serviceAuth";

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  const token = await getServiceAccessToken();

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/tiktak/products?category_id=${categoryId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("Products fetch failed: " + res.status);
  }

  const json: ProductsResponse = await res.json();
  return json.data;
}