import Link from "next/link";
import Image from "next/image";
import MobileNav from "./mobile-nav";
import { FileText } from "lucide-react";
import NavLinks from "./nav-links";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-bg-soft/90 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between gap-4 sm:h-[76px]">
                <Link href="/" className="flex shrink-0 items-center gap-2.5 text-ink">
                    <Image src="/nicojuhari-logo.svg" alt="Nicojuhari logo" width={28} height={28} priority />
                    <span className="text-[17px] font-bold tracking-[-0.02em] sm:text-lg">Nicojuhari</span>
                </Link>

                <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
                    <NavLinks />
                </nav>

                <Link
                    href="/cv"
                    className="hidden h-11 items-center gap-2 rounded-full bg-brand px-4.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand/90 md:inline-flex"
                >
                    <FileText className="size-[17px]" aria-hidden />
                    View CV
                </Link>

                <div className="md:hidden">
                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
