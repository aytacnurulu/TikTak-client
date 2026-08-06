import { Product, ProductsResponse } from "@/packages/types/product";
import { getServiceAccessToken } from "../serviceAuth";

export async function getProductsByCategory(
  categoryId: number,
): Promise<Product[]> {
  const token = await getServiceAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tiktak/products?category_id=${categoryId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error("Products fetch failed: " + res.status);
  }

  const json: ProductsResponse = await res.json();
  return json.data;
}

export async function getProductById(productId: number): Promise<Product> {
  const token = await getServiceAccessToken();

  const detailRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tiktak/products/${productId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    },
  );

  if (detailRes.ok) {
    const json: { message: string; data: Product; result: boolean } =
      await detailRes.json();
    return json.data;
  }

  const fallbackUrls = [
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tiktak/products?product_id=${productId}`,
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tiktak/products?id=${productId}`,
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tiktak/products`,
  ];

  for (const url of fallbackUrls) {
    const fallbackRes = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    });

    if (!fallbackRes.ok) {
      continue;
    }

    const fallbackJson: ProductsResponse = await fallbackRes.json();
    const product = fallbackJson.data.find((item) => item.id === productId);
    if (product) {
      return product;
    }
  }

  throw new Error(`Product fetch failed: ${detailRes.status}`);
}
