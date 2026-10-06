import type { Metadata } from "next";
import ServiceDetail from "../_components/service-detail";
import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata({
    title: "Shopify Store Audit, Redesign & CRO | Vienna",
    description:
        "Shopify developer in Vienna. Visitors but few sales? A store check finds what stops buyers. Then fixes, a redesign and monthly CRO.",
    path: "/services/shopify-stores",
});

export default function ShopifyStoresPage() {
    return (
        <ServiceDetail
            slug="shopify-stores"
            schemaName="Shopify Store Audit, Redesign & CRO"
            schemaDescription="A Shopify store check that finds where buyers drop off, then fixes, store redesign, ads tracking, Klaviyo emails and monthly conversion rate optimization (CRO) with a results note."
        />
    );
}
