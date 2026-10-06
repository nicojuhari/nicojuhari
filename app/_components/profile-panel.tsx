import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_URL } from "@/app/_data/services";
import { socialLinks } from "./icons";

export default function ProfilePanel() {
    return (
        <aside className="lg:sticky lg:top-28">
            <div className="flex flex-col rounded-3xl border border-rule bg-white p-6 shadow-[0_1px_2px_rgba(17,20,24,0.04),0_12px_32px_-16px_rgba(22,40,77,0.12)] sm:p-8">
                <div className="flex items-center gap-3.5 sm:gap-4">
                    <Image
                        src="/nick-profile-photo.webp"
                        alt="Nicolae Cojuhari"
                        title="Nicolae Cojuhari"
                        width={144}
                        height={144}
                        priority
                        className="size-16 rounded-full object-cover shadow-[0_0_0_1px_#e6e3dc,0_0_0_4px_#fff,0_0_0_5px_#e6e3dc] sm:size-[72px] sm:shadow-[0_0_0_1px_#e6e3dc,0_0_0_5px_#fff,0_0_0_6px_#e6e3dc]"
                    />
                    <div className="flex flex-col gap-1.5">
                        <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-brand-green/10 px-2.5 py-1 text-xs font-semibold text-teal">
                            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden />
                            Available for projects
                        </span>
                        <span className="font-mono text-xs text-ink-faint">Vienna · CET</span>
                    </div>
                </div>

                <h1 className="mt-5 sm:mt-6">
                    <span className="block text-[28px] leading-[1.1] font-semibold tracking-[-0.025em] text-ink sm:text-[30px]">
                        Nicolae Cojuhari
                    </span>
                    <span className="mt-1.5 block text-sm font-medium text-ink-soft sm:mt-2">
                        Software Engineer <span className="text-brand-green">·</span> Finance{" "}
                        <span className="text-brand-green">·</span> AI
                    </span>
                </h1>

                <p className="mt-3.5 text-[15px] leading-relaxed text-ink-muted sm:mt-4.5">
                    Business websites, online stores and custom apps that bring real results.
                </p>

                <div className="mt-5 flex flex-col gap-2.5 sm:mt-6">
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-pill-primary h-12 w-full text-[15px] sm:h-[46px] sm:text-sm"
                    >
                        Message on WhatsApp
                    </a>
                    <Link href="/projects" className="btn-pill-secondary h-12 w-full text-[15px] sm:h-[46px] sm:text-sm">
                        See my projects
                    </Link>
                </div>

                <ul className="mt-4 flex justify-center gap-2 border-t border-line pt-3 sm:mt-5">
                    {socialLinks.map(({ href, label, Icon }) => (
                        <li key={href}>
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={label}
                                className="flex size-11 items-center justify-center rounded-xl text-ink-muted transition-colors hover:bg-[#f4f3ef] hover:text-ink"
                            >
                                <Icon className="size-5" />
                                <span className="sr-only">{label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
