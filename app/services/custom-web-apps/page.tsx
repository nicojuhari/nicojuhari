import type { Metadata } from "next";
import ServiceDetail from "../_components/service-detail";
import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata({
    title: "Custom Web Apps: From Spreadsheet to Business Tool",
    description:
        "Custom web apps that save your team hours: dashboards, automation, approvals, payments and AI in one place. Built in Vienna for a fixed price.",
    path: "/services/custom-web-apps",
});

export default function CustomWebAppsPage() {
    return (
        <ServiceDetail
            slug="custom-web-apps"
            schemaName="Custom Web Apps"
            schemaDescription="Web apps built around your process - dashboards, automations, approval flows, Stripe payments, and GPS tracking. Built from scratch, no off-the-shelf limits."
        />
    );
}
