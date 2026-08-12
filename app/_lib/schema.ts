import { PERSON_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "./site";

const BASE = SITE_URL;

const provider = {
    "@type": "ProfessionalService" as const,
    name: PERSON_NAME,
    url: BASE,
};

export function personSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: PERSON_NAME,
        url: BASE,
        image: `${BASE}/nick-profile-photo.webp`,
        jobTitle: "Software Engineer",
        description: SITE_DESCRIPTION,
        knowsAbout: ["Software Engineering", "Finance", "Artificial Intelligence", "Financial Software", "Productivity Apps"],
        address: {
            "@type": "PostalAddress",
            addressLocality: "Vienna",
            addressCountry: "AT",
        },
        sameAs: [...SOCIAL_LINKS],
    };
}

export function professionalServiceSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: SITE_NAME,
        url: BASE,
        description: SITE_DESCRIPTION,
        founder: {
            "@type": "Person",
            name: PERSON_NAME,
            sameAs: [...SOCIAL_LINKS],
        },
        address: {
            "@type": "PostalAddress",
            streetAddress: "Kurt-Tichy-Gasse 5",
            addressLocality: "Vienna",
            addressCountry: "AT",
        },
        areaServed: "Worldwide",
        knowsAbout: [
            "Financial Software",
            "Productivity Apps",
            "Custom Web Apps",
            "Next.js",
            "React",
            "AI-assisted development",
        ],
    };
}

export function webSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: BASE,
        description: SITE_DESCRIPTION,
        publisher: {
            "@type": "Person",
            name: PERSON_NAME,
        },
        inLanguage: "en",
    };
}

export function serviceSchema(name: string, description: string, path: string) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        provider,
        url: `${BASE}${path}`,
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
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
    };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${BASE}${item.path}`,
        })),
    };
}
