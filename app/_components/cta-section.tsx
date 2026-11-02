import Link from "next/link";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/app/_data/services";
import ContactButton from "./contact-button";
import { WhatsAppIcon } from "./icons";

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
    "inline-flex h-12 w-full items-center justify-center rounded-full border border-white/35 px-6 text-[15px] font-semibold text-white transition-colors hover:border-white/70";

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
                "relative flex scroll-mt-28 flex-col gap-6 overflow-hidden rounded-[26px] bg-teal px-5.5 py-8 text-white sm:rounded-[32px] sm:p-14 lg:flex-row lg:items-center lg:justify-between lg:gap-8",
                className
            )}
        >
            <span className="absolute -bottom-28 -left-16 size-72 rounded-full bg-[#158a7e]" aria-hidden />
            <div className="relative flex max-w-2xl flex-col gap-3">
                <h2 className="text-[30px] leading-[1.08] font-semibold tracking-[-0.035em] sm:text-[40px] lg:text-[44px]">{title}</h2>
                <p className="text-base leading-relaxed text-[#e2f3f0] sm:text-lg">{description}</p>
            </div>

            <div className="relative flex w-full shrink-0 flex-col gap-2.5 sm:w-72">
                <a
                    href={whatsappLink(whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-white px-6 text-base font-semibold text-[#0b4c45] transition-colors hover:bg-white/90"
                >
                    <WhatsAppIcon className="size-[18px]" />
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
