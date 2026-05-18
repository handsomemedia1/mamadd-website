import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://mamadd.com";

    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/menu", "/blog/", "/about", "/contact", "/legal/"],
                disallow: ["/admin/", "/api/", "/_next/", "/admin"],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: "mamadd.com", // Host must be a domain name, not a full URL
    };
}
