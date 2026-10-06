import type { Metadata } from "next";
import ServiceDetail from "../_components/service-detail";
import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata({
    title: "Custom Web Apps & Automations in Vienna | Nicojuhari",
    description:
        "Custom web apps and automations for small businesses: dashboards, orders to invoices, AI that sorts requests. Starts with a check of one task.",
    path: "/services/custom-web-apps",
});

export default function CustomWebAppsPage() {
    return (
        <ServiceDetail
            slug="custom-web-apps"
            schemaName="Custom Web Apps & Automations"
            schemaDescription="Web apps and automations built around how a business works - a process check first, then dashboards, reports, automations, Stripe payments and AI features, with a monthly support plan."
        />
    );
}
