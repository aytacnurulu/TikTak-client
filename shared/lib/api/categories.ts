import { CategoriesResponse, Category } from "@/packages/types/category";
import { getServiceAccessToken } from "../serviceAuth";

export async function getCategories(): Promise<Category[]> {
  const token = await getServiceAccessToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tiktak/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 3600, 
    },
  });

  if (!res.ok) {
    throw new Error("Categories fetch failed: " + res.status);
  }

  const json: CategoriesResponse= await res.json();
  return json.data;
}