"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { WHATSAPP_URL } from "@/app/_data/services";
import { navLinks } from "@/app/_lib/nav";
import { WhatsAppIcon } from "./icons";

const links = [{ href: "/", label: "Home" }, ...navLinks];

export default function MobileNav() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
                render={
                    <Button variant="ghost" size="icon" className="size-11 rounded-full bg-[#e9ecf3] text-brand hover:bg-[#dfe4ee]" aria-label="Open menu" />
                }
            >
                <MenuIcon className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
                <SheetHeader className="p-6 pb-2">
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4 py-2">
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setOpen(false)}
                            className="flex min-h-12 items-center rounded-xl px-3 text-lg font-semibold text-ink transition-colors hover:bg-bg-soft"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
                <div className="px-6 pt-4">
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-pill-primary h-12 w-full text-[15px]">
                        <WhatsAppIcon className="size-[18px]" />
                        Message on WhatsApp
                    </a>
                </div>
            </SheetContent>
        </Sheet>
    );
}
