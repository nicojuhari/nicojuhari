"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import WhatsAppButton from "./whatsapp-button";
import ContactFormInner from "./contact-form-inner";

type Props = {
    className?: string;
    tagline?: string;
    title?: string;
    description?: string;
};

export default function CtaSection({
    className,
    tagline = "Contact",
    title = "Let's work together.",
    description = "Have a project or an idea? Get in touch and we'll figure out the best way to approach it.",
}: Props) {
    const [open, setOpen] = useState(false);

    return (
        <section id="contact" className={cn("surface-card p-6 sm:p-8", className)}>
            <div className="max-w-2xl">
                <p className="eyebrow">{tagline}</p>
                <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,1.875rem)] font-semibold tracking-tight text-ink">
                    {title}
                </h2>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-muted">{description}</p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button
                    className="h-11 rounded-full bg-brand px-6 text-[14px] font-medium text-white hover:bg-brand/90"
                    onClick={() => setOpen(true)}
                >
                    Send an email
                </Button>
                <WhatsAppButton className="h-11 rounded-full px-6 text-[14px] font-medium" anchorText="WhatsApp" />
                <a
                    href="https://www.linkedin.com/in/nicojuhari/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 px-2 text-[14px] font-medium text-ink transition-colors hover:text-brand-green"
                >
                    LinkedIn
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                        →
                    </span>
                </a>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Get in touch</DialogTitle>
                        <DialogDescription>Tell me a bit about what you&apos;re working on.</DialogDescription>
                    </DialogHeader>
                    <ContactFormInner onSuccess={() => setTimeout(() => setOpen(false), 1500)} />
                </DialogContent>
            </Dialog>
        </section>
    );
}
