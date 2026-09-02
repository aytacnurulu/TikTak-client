import { MetadataRoute } from "next";

const BASE_URL = "https://tik-tak-client.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/category"],
      disallow: [
        "/checkout",
        "/account",
        "/login",
        "/register",
        "/favorites",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}