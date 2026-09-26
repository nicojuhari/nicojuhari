import type { Metadata } from "next";
import ServiceDetail from "../_components/service-detail";

export const metadata: Metadata = {
    title: "Web Designer for Small Businesses in Vienna | Nicojuhari",
    description:
        "Websites for small and service businesses in Vienna - fast on mobile, set up for local search and Google Business Profile, easy for customers to call or book.",
    alternates: { canonical: "https://nicojuhari.com/services/business-websites" },
    openGraph: { url: "https://nicojuhari.com/services/business-websites" },
};

export default function BusinessWebsitesPage() {
    return (
        <ServiceDetail
            slug="business-websites"
            schemaName="Business Website Design"
            schemaDescription="Clean, fast websites for local and service businesses - built to rank in search, load fast on mobile, and turn visitors into bookings, calls, and sales."
        />
    );
}
