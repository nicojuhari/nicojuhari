"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import WhatsAppButton from "./whatsapp-button";
import ContactFormInner from "./contact-form-inner";

type Props = {
    tagline?: string;
    whatsappLabel?: string;
    contactLabel?: string;
    className?: string;
};

export default function CtaSection({
    tagline = "Let's work together, on your next project!",
    whatsappLabel = "WhatsApp",
    contactLabel = "Send and email",
    className,
}: Props) {
    const [open, setOpen] = useState(false);

    return (
        <section className={cn("section container-sm text-center", className)}>
            <p className="text-muted-foreground text-sm mb-2">{tagline}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
                <WhatsAppButton className="h-11 px-6 text-base" anchorText={whatsappLabel} />
                <Button variant="outline" className="h-11 px-6 text-base" onClick={() => setOpen(true)}>
                    {contactLabel}
                </Button>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Get in touch</DialogTitle>
                        <DialogDescription>I&apos;ll get back to you within 24 hours.</DialogDescription>
                    </DialogHeader>
                    <ContactFormInner onSuccess={() => setTimeout(() => setOpen(false), 1500)} />
                </DialogContent>
            </Dialog>
        </section>
    );
}
