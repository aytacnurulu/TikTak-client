import { getCategories } from "@/shared/lib/api/categories";
import { getProductsByCategory } from "@/shared/lib/api/products";
import { MetadataRoute } from "next";

const BASE_URL = "https://tik-tak-client.vercel.app";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/category`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/favorites`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.3,
    },
  ];

  const categories = await getCategories().catch((error) => {
    console.error("Sitemap: categories fetch failed", error);
    return [];
  });

  if (categories.length === 0) {
    return staticRoutes;
  }

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/category/${category.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutesNested = await Promise.all(
    categories.map(async (category) => {
      const products = await getProductsByCategory(category.id).catch((error) => {
        console.error(`Sitemap: products fetch failed for category ${category.id}`, error);
        return [];
      });

      return products.map((product) => ({
        url: `${BASE_URL}/category/${category.id}/product/${product.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }),
  );

  return [...staticRoutes, ...categoryRoutes, ...productRoutesNested.flat()];
}