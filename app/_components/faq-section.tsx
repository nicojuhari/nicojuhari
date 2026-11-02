import { Plus } from "lucide-react";

export type Faq = { question: string; answer: string };

/** Question list with FAQPage structured data */
export default function FaqSection({
    faq,
    title = "Common questions",
    eyebrow = "Questions",
    className,
}: {
    faq: Faq[];
    title?: string;
    eyebrow?: string;
    className?: string;
}) {
    if (!faq.length) return null;

    return (
        <section className={className}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: faq.map((f) => ({
                            "@type": "Question",
                            name: f.question,
                            acceptedAnswer: { "@type": "Answer", text: f.answer },
                        })),
                    }),
                }}
            />
            <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
                <div className="flex flex-col gap-3">
                    <p className="eyebrow">{eyebrow}</p>
                    <h2 className="section-title">{title}</h2>
                </div>
                <div className="flex flex-col gap-2.5">
                    {faq.map((f) => (
                        <details key={f.question} className="group rounded-[20px] bg-white">
                            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4.5 text-base font-semibold text-ink sm:px-6 sm:py-5 sm:text-[17px] [&::-webkit-details-marker]:hidden">
                                {f.question}
                                <Plus
                                    className="size-8 shrink-0 rounded-full bg-bg-soft p-2 text-ink transition-transform group-open:rotate-45"
                                    strokeWidth={2.4}
                                    aria-hidden
                                />
                            </summary>
                            <p className="px-5 pb-5 text-[15px] leading-relaxed text-ink-muted sm:px-6 sm:text-base">{f.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
