import Link from "next/link";
import Image from "next/image";
import MobileNav from "./mobile-nav";
import { WHATSAPP_URL } from "@/app/_data/services";
import NavLinks from "./nav-links";

export default function Header() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-5">
            <div className="container">
                <div className="flex h-14 items-center justify-between rounded-full border border-rule bg-white/90 pl-3.5 pr-1.5 shadow-[0_1px_2px_rgba(17,20,24,0.04)] backdrop-blur-md sm:h-15 sm:pl-5 sm:pr-2.5">
                    <Link href="/" title="Nicojuhari" className="flex shrink-0 items-center gap-2.5 text-ink">
                        <Image src="/nicojuhari-logo.svg" alt="Nicojuhari logo" width={28} height={28} priority />
                        <span className="text-[15px] font-semibold tracking-tight">Nicojuhari</span>
                    </Link>

                    <nav className="hidden items-center gap-1 md:flex">
                        <NavLinks />
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 inline-flex h-10 items-center rounded-full bg-brand px-4.5 text-[13px] font-semibold text-white transition-colors hover:bg-brand/90"
                        >
                            Message on WhatsApp
                        </a>
                    </nav>

                    <div className="flex items-center gap-1 md:hidden">
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-11 items-center rounded-full bg-brand px-4 text-[13px] font-semibold text-white"
                        >
                            WhatsApp
                        </a>
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    );
}
