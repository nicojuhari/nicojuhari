import type { Metadata } from "next";
import { Check } from "lucide-react";
import ContactForm from "../../_components/contact-form";
import CtaSection from "@/app/_components/cta-section";

export const metadata: Metadata = {
    title: "Custom Web Apps - Dashboards & Automations | Nicojuhari",
    description:
        "Web apps built around your process - dashboards, automations, approval flows, Stripe payments, and GPS tracking. Built from scratch, no off-the-shelf limits.",
};

const forYouIf = [
    "You're managing important business data in spreadsheets that are getting too complex",
    "Your team switches between 4-5 tools that don't talk to each other",
    "A manual process is eating hours of your team's time every week",
    "You need a dashboard, admin panel, or reporting tool that fits how your team works",
    "You're building a fintech product, financial tool, or investment calculator",
    "You need payments, location tracking, or AI built directly into your product",
    "Off-the-shelf SaaS tools make you work around them instead of for you",
];

const deliverables = [
    {
        title: "Dashboards & internal tools",
        description:
            "Real-time data views, KPI tracking, and admin panels your team can actually use - built around your data, not a template.",
    },
    {
        title: "Business process automation",
        description:
            "Replace repetitive manual steps with automated workflows. Less clicking, fewer errors, more time for work that matters.",
    },
    {
        title: "Workflow and approval systems",
        description: "Multi-step approval flows, task assignment, and status tracking built for how your team operates.",
    },
    {
        title: "Stripe payments & subscriptions",
        description: "One-time payments, recurring billing, invoicing, and subscription management - built into your app, not bolted on.",
    },
    {
        title: "GPS tracking & location features",
        description:
            "Delivery tracking, fleet management, geofencing, and location-based logic using Google Maps or Radar. Built for apps that move.",
    },
    {
        title: "Third-party API integrations",
        description: "Connect your app to CRMs, ERPs, payment providers, or any external service. Your tools should work together.",
    },
    {
        title: "Notifications & messaging",
        description:
            "SMS alerts via Twilio, transactional emails via Resend, and in-app notifications - so the right people get the right update at the right time.",
    },
    {
        title: "AI integrations",
        description:
            "Embed OpenAI or Claude into your workflow: document analysis, smart search, content generation, or any process that benefits from intelligence.",
    },
    {
        title: "Custom reporting & data views",
        description:
            "Tables, charts, and export tools built around how your business reads and uses data - not how the software vendor assumes.",
    },
    {
        title: "Fintech tools & financial calculators",
        description: "Loan calculators, investment trackers, budget planners - built to your exact logic and ready to embed anywhere.",
    },
];

const steps = [
    {
        number: "01",
        title: "Discovery call",
        description:
            "You explain the problem. I ask questions until I understand it properly - the process, the people involved, and what success looks like.",
    },
    {
        number: "02",
        title: "Scope & proposal",
        description: "A clear breakdown of what gets built, the timeline, and the price. No hourly billing, no scope creep surprises.",
    },
    {
        number: "03",
        title: "Build",
        description: "Regular updates so you see progress and can give feedback at any stage. Nothing gets shipped without your sign-off.",
    },
    {
        number: "04",
        title: "Launch & handover",
        description: "Deployed, documented, and yours to own. I can stay involved for ongoing support or hand it off clean.",
    },
];

export default function CustomWebAppsPage() {
    return (
        <>
            <section className="container-sm my-10">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-4">Service</p>
                <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">Software built around your process.</h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                    When off-the-shelf tools no longer cut it, custom software gives your team exactly what it needs - nothing more, nothing
                    less.
                </p>
            </section>
            <section className="container-sm my-10 bg-muted/60 border border-dashed rounded-xl">
                <CtaSection className="p-6 sm:justify-start" />
            </section>

            <section className="container-sm my-10">
                <h2 className="text-2xl font-bold mb-2">Is this for you?</h2>
                <p className="text-sm text-muted-foreground mb-6">You might be a good fit if any of these sound familiar:</p>
                <ul className="flex flex-col gap-3">
                    {forYouIf.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="container-sm my-10">
                <h2 className="text-2xl font-bold mb-2">What I build</h2>
                <p className="text-sm text-muted-foreground mb-6">
                    Every project is different, but these are the most common types of work:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {deliverables.map((item) => (
                        <div key={item.title} className="border rounded-xl p-5 bg-white">
                            <h3 className="font-semibold mb-1.5">{item.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container-sm my-10">
                <h2 className="text-2xl font-bold mb-8">How it works</h2>
                <div className="flex flex-col gap-8">
                    {steps.map((step) => (
                        <div key={step.number} className="flex gap-5">
                            <span className="text-3xl font-bold text-muted-foreground/25 leading-none shrink-0 w-10">{step.number}</span>
                            <div>
                                <h3 className="font-semibold mb-1">{step.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="container-sm my-10 bg-muted/60 border border-dashed rounded-xl">
                <CtaSection className="p-6 sm:justify-start" />
            </section>
        </>
    );
}
