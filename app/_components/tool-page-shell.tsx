import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { tools } from "@/app/_data/tools";
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
    /** Older free-form notes - used until a tool gets its `tips` */
    notes?: React.ReactNode;
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
    notes,
    perks = ["Free", "No sign-up"],
    faq,
    guide,
    bare = false,
}: Props) {
    const tool = tools.find((t) => t.slug === currentSlug);
    const Icon = toolIcons[currentSlug];
    const otherTools = tools.filter((t) => t.slug !== currentSlug);

    return (
        <div className="sm:mt-2">
            {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}

            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-ink-faint">
                <Link href="/tools" className="py-1.5 font-medium text-ink-muted transition-colors hover:text-ink">
                    Tools
                </Link>
                <ChevronRight className="size-3.5 text-[#9a9ea5]" aria-hidden />
                <span aria-current="page" className="font-medium text-ink">
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
                        <h1 className="text-[28px] leading-[1.08] font-semibold tracking-[-0.025em] text-ink sm:text-[44px] sm:leading-[1.05] sm:tracking-[-0.03em]">
                            {title}
                        </h1>
                        <p className="text-[15px] leading-normal text-ink-muted sm:text-[17px]">{description}</p>
                    </div>
                </div>
                <ul className="flex shrink-0 flex-wrap gap-2">
                    {perks.map((perk) => (
                        <li
                            key={perk}
                            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-rule bg-white px-3 text-[13px] font-semibold text-ink-soft sm:h-9"
                        >
                            <Check className="size-3.5 text-teal" strokeWidth={2.4} aria-hidden />
                            {perk}
                        </li>
                    ))}
                </ul>
            </header>

            <div
                className={cn(
                    "mt-6 overflow-clip rounded-3xl border border-rule bg-white shadow-[0_1px_2px_rgba(17,20,24,0.04),0_24px_48px_-32px_rgba(22,40,77,0.22)] sm:mt-7 sm:rounded-[28px]",
                    !bare && "p-5 sm:p-6 lg:p-8"
                )}
            >
                {children}
            </div>

            {tips && tips.length > 0 && (
                <ul className="mt-12 grid gap-3 sm:mt-16 md:grid-cols-3 md:gap-4">
                    {tips.map((tip, i) => (
                        <li key={tip.title} className="flex flex-col gap-3 rounded-[20px] border border-rule bg-white p-5.5 sm:p-6.5">
                            <span className="font-mono text-xs font-semibold text-teal">
                                {String(i + 1).padStart(2, "0")} · {tip.label}
                            </span>
                            <h2 className="text-[17px] font-semibold text-ink">{tip.title}</h2>
                            <p className="text-sm leading-relaxed text-ink-muted">{tip.text}</p>
                        </li>
                    ))}
                </ul>
            )}

            {!tips && notes && (
                <div className="mt-10 max-w-2xl space-y-3 text-sm leading-relaxed text-ink-muted">{notes}</div>
            )}

            {guide && <div className="mt-12 sm:mt-16">{guide}</div>}

            {faq && <FaqSection faq={faq} className="mt-12 sm:mt-16" />}

            <section className="mt-12 flex flex-col gap-4 sm:mt-16">
                <div className="flex items-end justify-between gap-4">
                    <h2 className="eyebrow">More tools</h2>
                    <Link
                        href="/tools"
                        className="inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-brand transition-colors hover:text-teal"
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
