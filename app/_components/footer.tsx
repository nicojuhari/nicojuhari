import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/app/_lib/nav";

const legalLinks = [
    { href: "/imprint", label: "Imprint" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="container mt-12 flex flex-col items-center gap-5 border-t border-rule pb-9 pt-7 text-center sm:mt-16 sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-2.5">
                <Image src="/nicojuhari-logo.svg" alt="" width={22} height={22} />
                <p className="text-[13px] text-ink-muted">
                    © {year} Nicolae Cojuhari<span className="hidden sm:inline"> · Software Engineer · Finance · AI</span>
                </p>
            </div>

            <div className="flex flex-col items-center gap-1 sm:items-end">
                <nav className="flex items-center gap-6 text-[13px] font-medium">
                    {navLinks.map(({ href, label }) => (
                        <Link key={href} href={href} className="py-2 text-ink-muted transition-colors hover:text-ink">
                            {label}
                        </Link>
                    ))}
                </nav>
                <nav aria-label="Legal" className="flex items-center gap-5 text-xs">
                    {legalLinks.map(({ href, label }) => (
                        <Link key={href} href={href} className="py-1.5 text-ink-faint transition-colors hover:text-ink">
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
