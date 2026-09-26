import type { Metadata } from "next";
import ServiceDetail from "../_components/service-detail";
import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata({
    title: "Local Business Websites & Google Maps | Vienna Web Designer",
    description:
        "More calls and bookings from Google and Maps. Websites and Google Business Profiles for local and service businesses in Vienna.",
    path: "/services/local-business-websites",
});

export default function LocalBusinessWebsitesPage() {
    return (
        <ServiceDetail
            slug="local-business-websites"
            schemaName="Local Business Website Design"
            schemaDescription="Websites and Google Business Profiles for local and service businesses - a page for each service and area, call and booking buttons, and call tracking."
        />
    );
}
