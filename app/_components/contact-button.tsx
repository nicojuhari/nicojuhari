"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ContactFormInner from "./contact-form-inner";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
    children?: React.ReactNode;
    /** Show the trailing arrow */
    arrow?: boolean;
};

export default function ContactButton({ className, children = "Get in touch", arrow = true }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button type="button" onClick={() => setOpen(true)} className={cn("group", className)}>
                {children}
                {arrow && (
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                )}
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Get in touch</DialogTitle>
                        <DialogDescription>I&apos;ll get back to you within 24 hours.</DialogDescription>
                    </DialogHeader>
                    <ContactFormInner onSuccess={() => setTimeout(() => setOpen(false), 1500)} />
                </DialogContent>
            </Dialog>
        </>
    );
}
