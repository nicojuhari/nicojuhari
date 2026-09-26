import type { Metadata } from "next";
import ServiceDetail from "../_components/service-detail";

export const metadata: Metadata = {
    title: "Custom Web Apps - Dashboards & Automations | Nicojuhari",
    description:
        "Custom web apps around your process - dashboards, automations, approvals, Stripe payments, and GPS. Built from scratch, no off-the-shelf limits.",
    alternates: { canonical: "https://nicojuhari.com/services/custom-web-apps" },
};

export default function CustomWebAppsPage() {
    return (
        <ServiceDetail
            slug="custom-web-apps"
            schemaName="Custom Web Apps"
            schemaDescription="Web apps built around your process - dashboards, automations, approval flows, Stripe payments, and GPS tracking. Built from scratch, no off-the-shelf limits."
        />
    );
}
