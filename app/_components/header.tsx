import Link from "next/link";
import Image from "next/image";
import MobileNav from "./mobile-nav";

const navLinks = [
    { href: "/tools", label: "Tools" },
    { href: "/projects", label: "Projects" },
    { href: "/playground", label: "Playground" },
];

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
            <div className="container flex items-center justify-between h-14">
                <Link href="/" title="Nicojuhari" className="shrink-0">
                    <Image src="/Logo.svg" alt="Nicojuhari" width={36} height={36} priority />
                </Link>

                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
                <MobileNav />
            </div>
        </header>
    );
}
