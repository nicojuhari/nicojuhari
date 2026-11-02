import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/app/_lib/nav";

const legalLinks = [
    { href: "/imprint", label: "Imprint" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/de/softwareentwickler-wien", label: "Deutsch" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="container mt-16 flex flex-col gap-8 pt-10 pb-10 sm:mt-24 sm:gap-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2">
                    <Link href="/" className="flex items-center gap-2.5 self-start text-ink">
                        <Image src="/nicojuhari-logo.svg" alt="" width={24} height={24} />
                        <span className="text-[17px] font-bold tracking-[-0.02em]">Nicojuhari</span>
                    </Link>
                    <p className="text-[15px] text-[#4a4f57]">Websites and apps for small businesses.</p>
                </div>
                <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-7 gap-y-1 text-[15px] font-medium">
                    {navLinks.map(({ href, label }) => (
                        <Link key={href} href={href} className="py-2 text-brand transition-colors hover:text-teal">
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="flex flex-col gap-2 border-t border-[#e6e3dc] pt-6 text-sm text-[#5b6068] sm:flex-row sm:items-center sm:justify-between">
                <p>© {year} Nicolae Cojuhari · Vienna, Austria</p>
                <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5">
                    {legalLinks.map(({ href, label }) => (
                        <Link key={href} href={href} className="py-2 transition-colors hover:text-ink">
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
