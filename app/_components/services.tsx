import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/+4369010196811";

const services = [
    {
        label: "For teams & growing businesses",
        title: "Custom Web Apps",
        oneLiner: "When your business needs software that works exactly your way.",
        features: [
            "Dashboards & internal tools",
            "Business process automation",
            "Stripe payments & subscriptions",
            "GPS tracking with Google Maps or Radar",
            "Workflow and approval systems",
            "AI integrations (OpenAI, Claude)",
            "Custom reporting & data views",
            "Notifications via Twilio or Resend",
        ],
        benefits: [
            "One tool instead of patched-together spreadsheets",
            "Less time on manual, repetitive work",
            "Your team has the data it needs, when it needs it",
            "Software built around how your business actually runs",
        ],
        href: "/services/custom-web-apps",
        cta: "Explore custom apps",
    },
    {
        label: "For local & service businesses",
        title: "Business Websites",
        oneLiner: "A website that shows up in search, loads fast, and turns visitors into customers.",
        features: [
            "Business website design & redesign",
            "Google Business Profile optimization",
            "Local SEO setup",
            "Booking integrations (Calendly, Cal.com)",
            "Analytics & conversion tracking",
            "Mobile-first, fast-loading pages",
        ],
        benefits: [
            "Show up when people search locally",
            "More inquiries, calls, and bookings",
            "A site you're proud to share",
            "Know what's working with real data",
        ],
        href: "/services/business-websites",
        cta: "Explore business websites",
    },
    {
        label: "For online sellers & brands",
        title: "Shopify Stores",
        oneLiner: "A store built to sell - set up right, easy to manage, and ready to grow.",
        features: [
            "Full Shopify store setup",
            "Product pages & collections",
            "Klaviyo email marketing",
            "Shipping & fulfillment integrations",
            "Reviews with Judge.me or Okendo",
            "Custom theme & app configuration",
        ],
        benefits: [
            "An online store that's easy to manage",
            "Customers who come back through email",
            "A checkout experience that converts",
            "Built on a platform that scales with you",
        ],
        href: "/services/shopify-stores",
        cta: "Explore Shopify stores",
    },
];

export default function Services() {
    return (
        <section className="container section">
            <h2 className="text-3xl font-bold text-center mb-10">Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {services.map((service) => (
                    <div key={service.title} className="flex flex-col border rounded-xl p-6 gap-8">
                        <div>
                            <p className="text-xs font-medium text-brand uppercase tracking-wide mb-6">{service.label}</p>
                            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{service.oneLiner}</p>
                        </div>

                        <div className="flex-1 flex flex-col gap-5">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">What I build</p>
                                <ul className="flex flex-col gap-2">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-sm">
                                            <Check className="w-4 h-4 text-brand-green shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">What you get</p>
                                <ul className="flex flex-col gap-2">
                                    {service.benefits.map((benefit) => (
                                        <li key={benefit} className="flex items-start gap-2 text-sm">
                                            <span className="text-primary font-bold leading-none mt-0.5">-</span>
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <Button className="w-full mt-1" nativeButton={false} render={<Link href={service.href} />}>
                            {service.cta}
                        </Button>
                    </div>
                ))}
            </div>
        </section>
    );
}
