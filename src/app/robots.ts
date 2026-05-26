import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/admin",
          "/dashboard",
          "/admin",
          "/api/",
          "/checkout/",
        ],
      },
    ],
    sitemap: "https://www.beyondintern.com/sitemap.xml",
  };
}
