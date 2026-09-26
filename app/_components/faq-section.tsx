export type Faq = { question: string; answer: string };

/** Question list with FAQPage structured data */
export default function FaqSection({ faq, title = "Common questions", className }: { faq: Faq[]; title?: string; className?: string }) {
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
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
                <div className="flex flex-col gap-2">
                    <p className="eyebrow">Questions</p>
                    <h2 className="text-2xl font-semibold tracking-[-0.025em] text-ink sm:text-[28px]">{title}</h2>
                </div>
                <div className="divide-y divide-line rounded-[20px] border border-rule bg-white">
                    {faq.map((f) => (
                        <details key={f.question} className="group px-5 py-4 sm:px-6">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                                {f.question}
                                <span className="text-xl leading-none font-normal text-ink-faint transition-transform group-open:rotate-45" aria-hidden>
                                    +
                                </span>
                            </summary>
                            <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{f.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
