"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks } from "@/app/_lib/nav";

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {navLinks.map(({ href, label }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                    <Link
                        key={href}
                        href={href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                            "rounded-full px-4 py-2 text-sm transition-colors",
                            active ? "bg-[#f1efea] font-semibold text-ink" : "font-medium text-ink-muted hover:text-ink"
                        )}
                    >
                        {label}
                    </Link>
                );
            })}
        </>
    );
}
