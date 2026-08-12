import type { Metadata } from "next";
import { Check } from "lucide-react";
import CtaSection from "@/app/_components/cta-section";
import { serviceSchema, breadcrumbSchema } from "@/app/_lib/schema";

export const metadata: Metadata = {
    title: "Shopify Store Setup & Development | Nicojuhari",
    description:
        "Shopify store setup and development - product pages, Klaviyo email flows, shipping integrations, reviews, and custom theme work. Built to launch and grow.",
    alternates: { canonical: "https://nicojuhari.com/services/shopify-stores" },
};

const forYouIf = [
    "You want to sell online but don't know where to start",
    "Your current store looks outdated or isn't converting visitors into buyers",
    "You're migrating from another platform and need a clean, fresh Shopify setup",
    "You're leaving money on the table with no post-purchase email flow",
    "Managing your store takes too much time and you want it to run more smoothly",
    "You want a store you can actually be proud to send customers to",
];

const deliverables = [
    {
        title: "Full Shopify store setup",
        description:
            "Theme selection and customization, store settings, payment and tax configuration - everything done right from the start.",
    },
    {
        title: "Product pages & collections",
        description:
            "Product pages built to convert: clear descriptions, strong imagery structure, and collection pages that are easy to browse.",
    },
    {
        title: "Klaviyo email marketing",
        description:
            "Welcome sequences, abandoned cart flows, and post-purchase emails set up and running - so you earn more from every visitor.",
    },
    {
        title: "Shipping & fulfillment integrations",
        description: "Connect Shippo, Shipstation, or your carrier of choice. Automate labels, tracking, and fulfillment notifications.",
    },
    {
        title: "Reviews & social proof",
        description:
            "Judge.me or Okendo set up to collect and display reviews automatically - the single biggest trust signal you can add.",
    },
    {
        title: "Custom theme & app configuration",
        description: "Shopify apps selected and configured to fit your workflow - no bloat, no unused installs slowing your store down.",
    },
];

const steps = [
    {
        number: "01",
        title: "Discovery",
        description:
            "I learn about your products, your customers, and what success looks like - so the store is built around your business, not a generic template.",
    },
    {
        number: "02",
        title: "Design & structure",
        description:
            "Theme selection, layout decisions, and collection structure mapped out before anything is built. You approve the direction first.",
    },
    {
        number: "03",
        title: "Build & configure",
        description:
            "Store setup, product import, app configuration, and email flows built and tested. Every part of the buying experience checked.",
    },
    {
        number: "04",
        title: "Launch",
        description: "Go live with your domain connected, analytics in place, and a store that's ready to take orders from day one.",
    },
];

export default function ShopifyStoresPage() {
    return (
        <div className="container py-6 sm:py-10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        serviceSchema(
                            "Shopify Store Setup & Development",
                            "Shopify store setup and development - product pages, Klaviyo email flows, shipping integrations, reviews, and custom theme work. Built to launch and grow.",
                            "/services/shopify-stores"
                        )
                    ),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        breadcrumbSchema([
                            { name: "Home", path: "/" },
                            { name: "Services", path: "/services" },
                            { name: "Shopify Stores", path: "/services/shopify-stores" },
                        ])
                    ),
                }}
            />

            <header className="mb-10 max-w-2xl">
                <p className="eyebrow">Service</p>
                <h1 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-ink">A store built to sell.</h1>
                <p className="mt-4 leading-relaxed text-ink-muted">
                    Set up right, easy to manage, and built to grow. Whether you&apos;re starting from scratch or improving what you have,
                    the goal is a store your customers trust and keep coming back to.
                </p>
            </header>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold tracking-tight text-ink">Is this for you?</h2>
                <p className="mt-2 mb-6 text-sm text-ink-muted">You might be a good fit if any of these sound familiar:</p>
                <ul className="flex flex-col gap-3">
                    {forYouIf.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-ink">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                            <span className="leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold tracking-tight text-ink">What I build</h2>
                <p className="mt-2 mb-6 text-sm text-ink-muted">Depending on your needs, here&apos;s what the work typically covers:</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {deliverables.map((item) => (
                        <div key={item.title} className="surface-card p-5">
                            <h3 className="font-semibold text-ink">{item.title}</h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="mb-8 text-2xl font-semibold tracking-tight text-ink">How it works</h2>
                <div className="flex flex-col gap-8">
                    {steps.map((step) => (
                        <div key={step.number} className="flex gap-5">
                            <span className="w-10 shrink-0 text-3xl font-bold leading-none text-ink-muted/30">{step.number}</span>
                            <div>
                                <h3 className="font-semibold text-ink">{step.title}</h3>
                                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <CtaSection description="Tell me about your products and what you want the store to do. We'll figure out the rest from there." />
        </div>
    );
}
