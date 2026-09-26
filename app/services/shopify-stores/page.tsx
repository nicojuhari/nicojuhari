import type { Metadata } from "next";
import ServiceDetail from "../_components/service-detail";

export const metadata: Metadata = {
    title: "Shopify Developer in Vienna | Store Setup & Development",
    description:
        "Shopify developer in Vienna: store setup, product pages, Klaviyo email flows, shipping and reviews - built to launch and grow, for shops in Austria and beyond.",
    alternates: { canonical: "https://nicojuhari.com/services/shopify-stores" },
};

export default function ShopifyStoresPage() {
    return (
        <ServiceDetail
            slug="shopify-stores"
            schemaName="Shopify Store Setup & Development"
            schemaDescription="Shopify store setup and development - product pages, Klaviyo email flows, shipping integrations, reviews, and custom theme work. Built to launch and grow."
        />
    );
}
