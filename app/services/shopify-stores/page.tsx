import type { Metadata } from "next";
import ServiceDetail from "../_components/service-detail";

export const metadata: Metadata = {
    title: "Shopify Store Setup & Development | Nicojuhari",
    description:
        "Shopify store setup and development - product pages, Klaviyo email flows, shipping integrations, reviews, and custom theme work. Built to launch and grow.",
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
