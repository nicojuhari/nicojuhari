import type { Metadata } from "next";
import ServiceDetail from "../_components/service-detail";
import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata({
    title: "Local Business Websites in Vienna | Calls from Google & Maps",
    description:
        "Web designer for small and local businesses in Vienna. Website and Google profile built to bring calls and bookings. Starts with a free Google check.",
    path: "/services/local-business-websites",
});

export default function LocalBusinessWebsitesPage() {
    return (
        <ServiceDetail
            slug="local-business-websites"
            schemaName="Local Business Website Design"
            schemaDescription="Websites and Google Business Profiles for local and service businesses - a free Google check, a page for each service and area, call and WhatsApp buttons, review requests and a monthly count of calls."
        />
    );
}
