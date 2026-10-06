import { services } from "@/app/_data/services";
import { PERSON_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "./site";

const BASE = SITE_URL;

/** Stable ids so every page points at the same person, business and site */
const ID = {
    person: `${BASE}/#person`,
    business: `${BASE}/#business`,
    website: `${BASE}/#website`,
};

const TELEPHONE = "+4369010196811";

/** Service-area business: city only, no street (matches the hidden address on Google Business Profile) */
const address = {
    "@type": "PostalAddress",
    addressLocality: "Vienna",
    addressCountry: "AT",
};

/** Where I work: Vienna in person, the rest of Austria online or on a visit */
export const areaServed = [
    { "@type": "City", name: "Vienna" },
    { "@type": "State", name: "Lower Austria" },
    { "@type": "Country", name: "Austria" },
];

function person() {
    return {
        "@type": "Person",
        "@id": ID.person,
        name: PERSON_NAME,
        url: BASE,
        image: `${BASE}/nick-profile-photo.webp`,
        jobTitle: "Software Engineer",
        knowsAbout: ["Software Engineering", "Web Development", "Shopify", "Local SEO", "Finance", "Artificial Intelligence"],
        address,
        worksFor: { "@id": ID.business },
        sameAs: [...SOCIAL_LINKS],
    };
}

function business() {
    return {
        "@type": "ProfessionalService",
        "@id": ID.business,
        name: SITE_NAME,
        url: BASE,
        description: SITE_DESCRIPTION,
        image: `${BASE}/nicojuhari-og-image.jpg`,
        logo: `${BASE}/nicojuhari-logo.svg`,
        telephone: TELEPHONE,
        address,
        areaServed,
        founder: { "@id": ID.person },
        sameAs: [...SOCIAL_LINKS],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Services",
            itemListElement: services.map((s) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: s.title, description: s.tagline, url: `${BASE}${s.href}` },
            })),
        },
    };
}

function website() {
    return {
        "@type": "WebSite",
        "@id": ID.website,
        name: SITE_NAME,
        url: BASE,
        description: SITE_DESCRIPTION,
        publisher: { "@id": ID.person },
        inLanguage: "en",
    };
}

/** Homepage: person, business and website in one linked graph */
export function homeSchema() {
    return { "@context": "https://schema.org", "@graph": [person(), business(), website()] };
}

export function serviceSchema(name: string, description: string, path: string) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: `${BASE}${path}`,
        provider: { "@type": "ProfessionalService", "@id": ID.business, name: SITE_NAME, url: BASE },
        areaServed,
    };
}

export function webAppSchema(name: string, description: string, slug: string) {
    return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name,
        description,
        url: `${BASE}/tools/${slug}`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires a modern web browser",
        isAccessibleForFree: true,
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "EUR",
        },
        author: { "@type": "Person", "@id": ID.person, name: PERSON_NAME },
    };
}

type ListEntry = { type: string; name: string; description?: string; url?: string; extra?: Record<string, unknown> };

/** List pages (services, projects, tools): the page, what it lists, and its breadcrumb */
export function collectionSchema(name: string, description: string, path: string, entries: ListEntry[]) {
    const url = `${BASE}${path}`;
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": `${url}#page`,
                name,
                description,
                url,
                inLanguage: "en",
                isPartOf: { "@id": ID.website },
                author: { "@id": ID.person },
                mainEntity: {
                    "@type": "ItemList",
                    numberOfItems: entries.length,
                    itemListElement: entries.map((entry, index) => ({
                        "@type": "ListItem",
                        position: index + 1,
                        item: {
                            "@type": entry.type,
                            name: entry.name,
                            ...(entry.description && { description: entry.description }),
                            ...(entry.url && { url: entry.url }),
                            ...entry.extra,
                        },
                    })),
                },
                breadcrumb: { "@id": `${url}#breadcrumb` },
            },
            {
                ...breadcrumbList([
                    { name: "Home", path: "/" },
                    { name, path },
                ]),
                "@id": `${url}#breadcrumb`,
            },
        ],
    };
}

/** Full URL for a site path */
export const absoluteUrl = (path: string) => `${BASE}${path}`;

/** Shared provider/author references for list entries */
export const businessRef = { "@id": ID.business };
export const personRef = { "@id": ID.person };

export function breadcrumbSchema(items: { name: string; path: string }[]) {
    return { "@context": "https://schema.org", ...breadcrumbList(items) };
}

function breadcrumbList(items: { name: string; path: string }[]) {
    return {
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.path === "/" ? BASE : `${BASE}${item.path}`,
        })),
    };
}
