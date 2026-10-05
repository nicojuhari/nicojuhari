import type { Metadata } from "next";
import ServiceDetail from "../_components/service-detail";
import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata({
    title: "Shopify Store Check & Conversion Fixes | Vienna",
    description:
        "Shopify developer in Vienna. Store gets traffic but not enough sales? A store check (audit) finds where buyers drop off. Then fixes and a monthly plan.",
    path: "/services/shopify-stores",
});

export default function ShopifyStoresPage() {
    return (
        <ServiceDetail
            slug="shopify-stores"
            schemaName="Shopify Store Check & Conversion Fixes"
            schemaDescription="A Shopify store check that finds where buyers drop off, fixes to product pages, checkout, speed and Klaviyo emails, and a monthly plan with a results note."
        />
    );
}
