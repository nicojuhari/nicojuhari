import type { MetadataRoute } from "next";
import { services } from "./_data/services";
import { caseStudies } from "./_data/case-studies";
import { tools } from "./_data/tools";
import { SITE_URL } from "./_lib/site";
import { notes } from "./notes/_content";

/** No lastModified: a build date on every URL tells Google nothing, and it ignores changeFrequency/priority */
export default function sitemap(): MetadataRoute.Sitemap {
    const paths = ["", "/services", ...services.map((s) => s.href), "/de/softwareentwickler-wien", "/about", "/cv", "/de/cv", "/projects", ...caseStudies.map((c) => `/projects/${c.slug}`), "/tools", ...tools.map((t) => `/tools/${t.slug}`), "/uses", ...(notes.length ? ["/notes", ...notes.map((n) => `/notes/${n.slug}`)] : []), "/imprint", "/privacy", "/terms"];

    return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
