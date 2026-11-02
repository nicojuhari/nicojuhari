import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { tools } from "@/app/_data/tools";
import { breadcrumbSchema } from "@/app/_lib/schema";
import { cn } from "@/lib/utils";
import { toolIcons } from "./icons";
import ToolTile from "./tool-tile";
import FaqSection, { type Faq } from "./faq-section";

export type ToolTip = { label: string; title: string; text: string };
export type { Faq as ToolFaq } from "./faq-section";

type Props = {
    currentSlug: string;
    title: string;
    description: string;
    schema?: object;
    children: React.ReactNode;
    /** Short cards under the tool */
    tips?: ToolTip[];
    perks?: string[];
    /** Common questions - rendered on the page and as FAQPage structured data */
    faq?: Faq[];
    /** Extra content between the tips and the FAQ, e.g. a how-to */
    guide?: React.ReactNode;
    /** The tool draws its own workspace (no padding on the card) */
    bare?: boolean;
};

export default function ToolPageShell({
    currentSlug,
    title,
    description,
    schema,
    children,
    tips,
    perks = ["Free", "No sign-up"],
    faq,
    guide,
    bare = false,
}: Props) {
    const tool = tools.find((t) => t.slug === currentSlug);
    const Icon = toolIcons[currentSlug];
    const otherTools = tools.filter((t) => t.slug !== currentSlug);

    return (
        <div className="sm:mt-4">
            {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        breadcrumbSchema([
                            { name: "Home", path: "/" },
                            { name: "Tools", path: "/tools" },
                            { name: title, path: `/tools/${currentSlug}` },
                        ])
                    ),
                }}
            />

            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#5b6068]">
                <Link href="/tools" className="py-1.5 transition-colors hover:text-ink">
                    Free tools
                </Link>
                <ChevronRight className="size-3.5" aria-hidden />
                <span aria-current="page" className="text-ink">
                    {title}
                </span>
            </nav>

            <header className="mt-4 flex flex-col gap-5 sm:mt-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
                <div className="flex items-start gap-4 sm:items-center sm:gap-5">
                    {Icon && tool && (
                        <span
                            className="flex size-13 shrink-0 items-center justify-center rounded-2xl sm:size-16 sm:rounded-[18px]"
                            style={{ backgroundColor: tool.tint, color: tool.accent }}
                        >
                            <Icon className="size-6 sm:size-[30px]" strokeWidth={1.7} aria-hidden />
                        </span>
                    )}
                    <div className="flex flex-col gap-1.5">
                        <h1 className="text-[32px] leading-[1.05] font-semibold tracking-[-0.035em] text-ink sm:text-[48px] xl:text-[56px]">
                            {title}
                        </h1>
                        <p className="text-base leading-normal text-[#4a4f57] sm:text-lg">{description}</p>
                    </div>
                </div>
                <ul className="flex shrink-0 flex-wrap gap-2">
                    {perks.map((perk) => (
                        <li
                            key={perk}
                            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#e3f1ee] px-3 text-[13px] font-semibold text-[#0f5f57] sm:h-9 sm:text-sm"
                        >
                            <Check className="size-3.5" strokeWidth={2.4} aria-hidden />
                            {perk}
                        </li>
                    ))}
                </ul>
            </header>

            <div
                className={cn(
                    "mt-6 overflow-clip rounded-[24px] bg-white shadow-[0_24px_48px_-32px_rgba(22,40,77,0.22)] sm:mt-8 sm:rounded-[32px]",
                    !bare && "p-5 sm:p-6 lg:p-8"
                )}
            >
                {children}
            </div>

            {tips && tips.length > 0 && (
                <section className="mt-14 flex flex-col gap-6 sm:mt-20 sm:gap-7">
                    <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-ink sm:text-[34px]">Tips</h2>
                    <ul className="grid gap-3 md:grid-cols-3 md:gap-4">
                        {tips.map((tip, i) => (
                            <li key={tip.title} className="flex flex-col gap-2.5 rounded-[22px] bg-white p-6 sm:p-7">
                                <span className="text-sm font-bold text-teal">
                                    {String(i + 1).padStart(2, "0")} · {tip.label}
                                </span>
                                <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink">{tip.title}</h3>
                                <p className="text-[15px] leading-relaxed text-[#4a4f57]">{tip.text}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {guide && <div className="mt-12 sm:mt-16">{guide}</div>}

            {faq && <FaqSection faq={faq} className="mt-14 sm:mt-20" />}

            {/* Free tools lead to the service: a free check for business owners */}
            <section className="mt-14 flex flex-col gap-6 rounded-[24px] bg-brand p-6 text-white sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:rounded-[28px] sm:p-12">
                <div className="flex max-w-[680px] items-start gap-4 sm:gap-5">
                    <Image
                        src="/nick-profile-photo.webp"
                        alt=""
                        width={104}
                        height={104}
                        className="size-12 shrink-0 rounded-full object-cover ring-3 ring-[#1f3561] sm:size-13"
                    />
                    <div className="flex flex-col gap-2">
                        <h2 className="text-[22px] leading-tight font-semibold tracking-[-0.02em] sm:text-[28px]">Running a small business?</h2>
                        <p className="text-base leading-normal text-[#c3cbe0] sm:text-[17px]">
                            Your website should make it easy to call or book. I can check yours for free.
                        </p>
                    </div>
                </div>
                <Link
                    href="/services/local-business-websites#google-check"
                    className="inline-flex h-13 shrink-0 items-center justify-center gap-2.5 rounded-full bg-white px-6 text-base font-semibold text-brand transition-opacity hover:opacity-90"
                >
                    Get a free check
                    <ArrowRight className="size-4" aria-hidden />
                </Link>
            </section>

            <section className="mt-14 flex flex-col gap-5 sm:mt-20 sm:gap-6">
                <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-ink sm:text-[34px]">More free tools</h2>
                    <Link
                        href="/tools"
                        className="inline-flex items-center gap-1.5 py-2 text-[15px] font-semibold text-teal hover:underline"
                    >
                        All tools
                        <ArrowRight className="size-[15px]" aria-hidden />
                    </Link>
                </div>
                <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
                    {otherTools.map((t) => (
                        <li key={t.slug} className="min-w-0">
                            <ToolTile tool={t} variant="compact" />
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
