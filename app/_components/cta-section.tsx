import Link from "next/link";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/app/_data/services";
import ContactButton from "./contact-button";

type Props = {
    className?: string;
    title?: string;
    description?: string;
    /** Label on the main button, which opens WhatsApp */
    primaryLabel?: string;
    /** Prefilled WhatsApp message */
    whatsappText?: string;
    /** Outline button - the contact form by default */
    secondary?: { label: string; href: string };
};

const outline =
    "inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-6 text-[15px] font-semibold text-white transition-colors hover:border-white/50 sm:text-sm";

export default function CtaSection({
    className,
    title = "Let’s work together.",
    description = "Have a project in mind? Reach out and we’ll figure out the best way to approach it.",
    primaryLabel = "Message me on WhatsApp",
    whatsappText,
    secondary,
}: Props) {
    return (
        <section
            id="contact"
            className={cn(
                "navy-dots flex scroll-mt-28 flex-col gap-5 rounded-3xl px-5.5 py-7 sm:rounded-[28px] sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8",
                className
            )}
        >
            <div className="flex max-w-xl flex-col gap-2.5 sm:gap-3">
                <h2 className="text-[26px] leading-[1.12] font-semibold tracking-[-0.025em] sm:text-[34px] sm:leading-[1.1] sm:tracking-[-0.03em]">
                    {title}
                </h2>
                <p className="text-[15px] leading-relaxed text-[#c5cddc] sm:text-base">{description}</p>
            </div>

            <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
                <a
                    href={whatsappLink(whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-brand transition-colors hover:bg-white/90 sm:text-sm"
                >
                    {primaryLabel}
                </a>
                {secondary ? (
                    <Link href={secondary.href} className={outline}>
                        {secondary.label}
                    </Link>
                ) : (
                    <ContactButton className={outline} arrow={false}>
                        Send an email
                    </ContactButton>
                )}
            </div>
        </section>
    );
}
