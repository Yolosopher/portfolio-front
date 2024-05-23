// User-agent: *
// Disallow: /admin/
// Allow: /
// Sitemap: https://yolosopher.online/sitemap.xml

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/"],
      },
    ],
  };
}
