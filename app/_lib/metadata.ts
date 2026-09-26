import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

/**
 * Full page metadata - canonical, Open Graph and Twitter in one place.
 * Next.js replaces nested fields (openGraph, twitter) instead of merging them,
 * so every page sets all of them here rather than relying on the layout.
 * The image comes from each route's opengraph-image.tsx (file-based metadata wins over this object).
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
    const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "website",
            locale: "en_US",
            siteName: SITE_NAME,
            url,
            title,
            description,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}
