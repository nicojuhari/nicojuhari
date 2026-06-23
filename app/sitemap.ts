import type { MetadataRoute } from "next"
import { tools } from "./_data/tools"

const BASE = "https://nicojuhari.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/business-websites`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/shopify-stores`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/custom-web-apps`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/playground`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/playground/magic-wand`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/playground/rain-of-emojis`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ]

  const toolRoutes: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${BASE}/tools/${t.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...toolRoutes]
}
