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
                            "py-2.5 text-[15px] transition-colors",
                            active ? "font-semibold text-teal" : "font-medium text-brand hover:text-teal"
                        )}
                    >
                        {label}
                    </Link>
                );
            })}
        </>
    );
}
