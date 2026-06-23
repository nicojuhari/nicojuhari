const BASE = "https://nicojuhari.com";

const provider = {
    "@type": "ProfessionalService" as const,
    name: "Nicolae Cojuhari",
    url: BASE,
};

export function professionalServiceSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Nicojuhari",
        url: BASE,
        founder: {
            "@type": "Person",
            name: "Nicolae Cojuhari",
            sameAs: ["https://github.com/nicojuhari", "https://twitter.com/nicojuhari", "https://www.linkedin.com/in/nicojuhari/"],
        },
        areaServed: "Worldwide",
        knowsAbout: ["Web Development", "Shopify", "Next.js", "React", "Custom Web Apps"],
    };
}

export function webSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Nicojuhari",
        url: BASE,
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
