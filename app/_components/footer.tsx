import Link from "next/link";

const links = [
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/tools", label: "Tools" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-rule bg-background py-8 sm:py-10">
            <div className="container flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:text-left">
                <p className="text-sm text-ink-muted">
                    © {year} Nicolae Cojuhari
                    <br />
                    <span className="text-xs text-ink-muted/80">Software Engineer · Finance · AI</span>
                </p>

                <nav className="flex items-center gap-1 text-sm">
                    {links.map(({ href, label }, i) => (
                        <span key={href} className="flex items-center gap-1">
                            {i > 0 && <span className="px-1.5 text-ink-muted/40" aria-hidden>·</span>}
                            <Link href={href} className="px-1.5 py-1 text-ink-muted transition-colors hover:text-ink">
                                {label}
                            </Link>
                        </span>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
