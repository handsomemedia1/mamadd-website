import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mamadd.com";

    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/menu", "/blog/", "/about", "/contact", "/legal/"],
                disallow: ["/admin/", "/api/", "/_next/", "/admin"],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
