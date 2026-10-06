import { LEGAL } from "@/app/_data/legal";

type Props = {
    eyebrow: string;
    title: string;
    intro?: string;
    children: React.ReactNode;
};

/** Shared layout for the imprint, privacy policy and terms */
export default function LegalPage({ eyebrow, title, intro, children }: Props) {
    return (
        <div className="container-sm mt-6 sm:mt-16">
            <header className="flex flex-col gap-3.5 border-b border-rule pb-7 sm:gap-4">
                <p className="eyebrow">{eyebrow}</p>
                <h1 className="text-[34px] leading-[1.06] font-semibold tracking-[-0.03em] text-ink sm:text-5xl">{title}</h1>
                {intro && <p className="text-base leading-relaxed text-ink-muted sm:text-lg">{intro}</p>}
                <p className="font-mono text-xs text-ink-faint">Last updated: {LEGAL.lastUpdated}</p>
            </header>
            <div className="mt-8 flex flex-col gap-4 text-[15px] leading-relaxed text-ink-soft [&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-6 [&_h2]:text-[22px] [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_h3]:mt-2 [&_h3]:text-[17px] [&_h3]:font-semibold [&_h3]:text-ink [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:pl-5">
                {children}
            </div>
        </div>
    );
}
