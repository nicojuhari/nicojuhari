import Link from "next/link";
import Image from "next/image";
import MobileNav from "./mobile-nav";
import ContactButton from "./contact-button";

const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/tools", label: "Tools" },
];

export default function Header() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 pt-3">
            <div className="container">
                <div className="flex h-12 items-center justify-between rounded-full border border-rule bg-background/85 px-4 backdrop-blur-md sm:h-14 sm:px-5">
                    <Link href="/" title="Nicojuhari" className="flex shrink-0 items-center gap-2.5">
                        <Image src="/nicojuhari-logo.svg" alt="Nicojuhari" width={28} height={28} priority />
                        <span className="hidden text-sm font-semibold tracking-tight text-ink sm:inline">Nicojuhari</span>
                    </Link>

                    <nav className="hidden items-center gap-0.5 md:flex">
                        {navLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className="rounded-full px-3.5 py-2 text-[14px] font-medium text-ink-muted transition-colors hover:text-ink"
                            >
                                {label}
                            </Link>
                        ))}
                        <ContactButton className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-brand/90">
                            Contact
                        </ContactButton>
                    </nav>
                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
