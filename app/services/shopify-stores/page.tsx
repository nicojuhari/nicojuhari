import type { Metadata } from "next";
import ServiceDetail from "../_components/service-detail";
import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata({
    title: "Shopify Developer in Vienna | Store Setup & Redesign",
    description:
        "Shopify developer in Vienna. Store setup or redesign, clear product pages, Klaviyo emails, reviews and shipping - so more of your visitors buy.",
    path: "/services/shopify-stores",
});

export default function ShopifyStoresPage() {
    return (
        <ServiceDetail
            slug="shopify-stores"
            schemaName="Shopify Store Setup & Development"
            schemaDescription="Shopify store setup and development - product pages, Klaviyo email flows, shipping integrations, reviews, and custom theme work. Built to launch and grow."
        />
    );
}
