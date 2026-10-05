"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { WHATSAPP_URL } from "@/app/_data/services";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/tools", label: "Tools" },
];

export default function MobileNav() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
                render={
                    <Button variant="ghost" size="icon" className="size-11 rounded-full" aria-label="Open menu" />
                }
            >
                <MenuIcon className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
                <SheetHeader className="border-b border-rule p-6 pb-4">
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 p-6">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setOpen(false)}
                            className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
                <div className="px-6">
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-pill-primary w-full">
                        Message on WhatsApp
                    </a>
                </div>
            </SheetContent>
        </Sheet>
    );
}
