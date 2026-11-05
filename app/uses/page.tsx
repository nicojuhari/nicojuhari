import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BarChart3, Code2, Megaphone, Sparkles } from "lucide-react";
import { uses, usesUpdated, type UseGroup } from "@/app/_data/uses";
import { formatDate } from "@/app/notes/_content";
import { pageMetadata } from "@/app/_lib/metadata";
import { collectionSchema } from "@/app/_lib/schema";

const description = "The tools I use to build websites and apps, keep my numbers in order and find customers. Only what I use today, with one line on why.";

export const metadata: Metadata = pageMetadata({ title: "Uses: Tools I Work With", description, path: "/uses" });

const icons: Record<UseGroup["id"], typeof Code2> = { code: Code2, ai: Sparkles, business: BarChart3, marketing: Megaphone };

const schema = collectionSchema(
    "Uses",
    description,
    "/uses",
    uses.flatMap((g) => g.items.map((i) => ({ type: "SoftwareApplication", name: i.name, description: i.why, url: i.url })))
);

export default function UsesPage() {
    return (
        <div className="container-sm mt-8 flex flex-col gap-12 sm:mt-14">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <section className="flex flex-col gap-5">
                <p className="eyebrow">Uses</p>
                <h1 className="text-[40px] leading-[1.03] font-semibold tracking-[-0.04em] text-ink sm:text-[54px]">
                    The tools I <span className="text-teal">work with.</span>
                </h1>
                <p className="text-lg leading-normal text-[#4a4f57] sm:text-xl">{description}</p>
                <p className="text-sm text-ink-muted">
                    Updated <time dateTime={usesUpdated}>{formatDate(usesUpdated)}</time>
                </p>
            </section>

            {uses.map((g) => {
                const Icon = icons[g.id];
                return (
                    <section key={g.id} className="flex flex-col gap-4">
                        <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-[-0.02em] text-ink">
                            <Icon className="size-5 text-teal" aria-hidden /> {g.title}
                        </h2>
                        <ul className="surface-card divide-y divide-rule">
                            {g.items.map((i) => (
                                <li key={i.name} className="flex flex-col gap-1 p-4 sm:p-5">
                                    <a href={i.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 self-start font-semibold text-ink hover:text-teal">
                                        {i.name} <ArrowUpRight className="size-4 text-ink-faint" aria-hidden />
                                    </a>
                                    <p className="text-[15px] leading-relaxed text-ink-soft">
                                        {i.why}
                                        {i.note && (
                                            <>
                                                {" "}
                                                <Link href={`/notes/${i.note}`} className="font-medium text-brand underline decoration-teal/40 underline-offset-4 hover:text-teal">
                                                    Read the note
                                                </Link>
                                            </>
                                        )}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>
                );
            })}
        </div>
    );
}
