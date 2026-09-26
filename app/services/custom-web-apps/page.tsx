import type { Metadata } from "next";
import ServiceDetail from "../_components/service-detail";

export const metadata: Metadata = {
    title: "Custom Web Apps: From Spreadsheet to Business Tool",
    description:
        "When a spreadsheet needs to grow into a tool your whole team uses - custom web apps with dashboards, approvals, payments and AI. Built in Vienna, fixed price.",
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
