import type { Metadata } from "next";
import CtaSection from "@/app/_components/cta-section";
import { Check } from "lucide-react";
import { tools } from "@/app/_data/tools";
import ToolsFilter from "./_components/tools-filter";
import { pageMetadata } from "@/app/_lib/metadata";
import { absoluteUrl, collectionSchema, personRef } from "@/app/_lib/schema";

export const metadata: Metadata = pageMetadata({
    title: "Free Browser Tools - QR Codes, Checklists & More",
    description:
        "Free browser tools for everyday tasks: split bills, make QR codes and checklists, crop images, count words and more. No sign-up needed.",
    path: "/tools",
});

const schema = collectionSchema(
    "Free tools",
    "Free browser tools for everyday tasks: split bills, make QR codes and checklists, crop images, count words and more. No sign-up needed.",
    "/tools",
    tools.map((t) => ({
        type: "WebApplication",
        name: t.title,
        description: t.description,
        url: absoluteUrl(`/tools/${t.slug}`),
        extra: {
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            isAccessibleForFree: true,
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            author: personRef,
        },
    }))
);

const perks = ["Free", "No sign-up", "In your browser"];

export default function ToolsPage() {
    return (
        <div className="flex flex-col gap-10 sm:mt-4 sm:gap-12">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
                <div className="flex max-w-[720px] flex-col gap-5 sm:gap-6">
                    <p className="eyebrow">Free tools</p>
                    <h1 className="text-[40px] leading-[1.03] font-semibold tracking-[-0.04em] text-ink sm:text-[54px] xl:text-[64px]">
                        Simple tools for <span className="text-teal">everyday tasks.</span>
                    </h1>
                    <p className="text-lg leading-normal text-[#4a4f57] sm:text-xl">
                        Tools I made for my own work. Split bills, make QR codes, crop images and more.
                    </p>
                </div>
                <ul className="flex shrink-0 flex-wrap gap-2">
                    {perks.map((perk) => (
                        <li
                            key={perk}
                            className="inline-flex h-9 items-center gap-2 rounded-full bg-[#e3f1ee] px-3.5 text-sm font-semibold text-[#0f5f57]"
                        >
                            <Check className="size-[15px]" strokeWidth={2.4} aria-hidden />
                            {perk}
                        </li>
                    ))}
                </ul>
            </section>

            <ToolsFilter tools={tools} />

            <CtaSection
                className="mt-6 sm:mt-12"
                title="Need a tool built for your business?"
                description="Calculators, dashboards and internal tools, built around how your team works. Tell me the task on WhatsApp."
                primaryLabel="Tell me the task"
                whatsappText="Hi Nick, the task that takes us the most time is: "
                secondary={{ label: "See custom web apps", href: "/services/custom-web-apps" }}
            />
        </div>
    );
}
