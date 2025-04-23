// User-agent: *
// Disallow: /admin/
// Allow: /
// Sitemap: https://nika-nishnianidze.online/sitemap.xml

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
