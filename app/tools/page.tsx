import type { Metadata } from "next";
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
        <div className="flex flex-col gap-8 sm:mt-6 sm:gap-10">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
                <div className="flex max-w-[720px] flex-col gap-3.5 sm:gap-4.5">
                    <p className="eyebrow">Free tools</p>
                    <h1 className="text-[34px] leading-[1.06] font-semibold tracking-[-0.03em] text-ink sm:text-5xl xl:text-[56px] xl:leading-[1.03] xl:tracking-[-0.035em]">
                        Simple tools for everyday tasks.
                    </h1>
                    <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
                        Built for me, sharing with you. Split bills, make QR codes and checklists, crop images and more - free,
                        no sign-up needed.
                    </p>
                </div>
                <ul className="flex shrink-0 flex-wrap gap-2">
                    {perks.map((perk) => (
                        <li
                            key={perk}
                            className="inline-flex h-9 items-center gap-2 rounded-full border border-rule bg-white px-3.5 text-[13px] font-semibold text-ink-soft sm:h-10"
                        >
                            <Check className="size-[15px] text-teal" strokeWidth={2.2} aria-hidden />
                            {perk}
                        </li>
                    ))}
                </ul>
            </section>

            <ToolsFilter tools={tools} />
        </div>
    );
}
