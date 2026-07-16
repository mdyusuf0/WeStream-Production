import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/", // Example private route disallow rule
    },
    sitemap: "https://westream.in/sitemap.xml",
  };
}
