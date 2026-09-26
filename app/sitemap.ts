import type { MetadataRoute } from "next";
import { services } from "./_data/services";
import { tools } from "./_data/tools";
import { SITE_URL } from "./_lib/site";

/** No lastModified: a build date on every URL tells Google nothing, and it ignores changeFrequency/priority */
export default function sitemap(): MetadataRoute.Sitemap {
    const paths = ["", "/services", ...services.map((s) => s.href), "/projects", "/tools", ...tools.map((t) => `/tools/${t.slug}`)];

    return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
