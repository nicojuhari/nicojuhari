import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            // Tool slug changes
            {
                source: "/tools/qr-code-menu-generator",
                destination: "/tools/qr-code-generator",
                permanent: true,
            },
            {
                source: "/tools/word-counter-tool",
                destination: "/tools/word-counter",
                permanent: true,
            },
            // Restaurant examples (section removed, redirect to home)
            {
                source: "/restaurant-website-examples/:slug",
                destination: "/",
                permanent: true,
            },
            {
                source: "/restaurant-website-examples",
                destination: "/",
                permanent: true,
            },
            // Shopify sections → projects
            {
                source: "/shopify-sections/:slug",
                destination: "/projects",
                permanent: true,
            },
            {
                source: "/shopify-sections",
                destination: "/projects",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
