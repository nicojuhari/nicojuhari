import Image from "next/image";
import { Barlow } from "next/font/google";
import type { LucideIcon } from "lucide-react";
import {
    Award,
    BriefcaseBusiness,
    FolderGit2,
    Gamepad2,
    Globe,
    GraduationCap,
    IdCard,
    Languages,
    Lightbulb,
    Link2,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/app/_components/icons";
import { cv, cvContact, cvSkills, type CvLang } from "@/app/_data/cv";

const barlow = Barlow({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"] });

/** A4 two-column CV. Screen: centred sheet (stacks on mobile). Print: see the cv-sheet rules in globals.css */
export default function CvSheet({ lang }: { lang: CvLang }) {
    const c = cv[lang];
    const contacts = [
        { Icon: Mail, text: cvContact.email, href: `mailto:${cvContact.email}` },
        { Icon: Phone, text: cvContact.phone, href: `tel:${cvContact.phone.replace(/\s/g, "")}` },
        { Icon: MapPin, text: c.location },
        { Icon: Globe, text: cvContact.website, href: `https://${cvContact.website}` },
        { Icon: LinkedInIcon, text: "LinkedIn", href: cvContact.linkedin },
        { Icon: GitHubIcon, text: "GitHub", href: cvContact.github },
    ];

    return (
        <article
            lang={lang}
            className={`cv-sheet ${barlow.className} mx-auto grid w-full max-w-[210mm] bg-[#fffcf7] text-[13.5px] leading-[1.45] text-[#3b4256] shadow-[0_8px_40px_rgba(22,40,77,0.12)] md:grid-cols-[46%_1fr] print:max-w-none print:grid-cols-[46%_1fr] print:shadow-none`}
        >
            {/* Sidebar */}
            <div className="flex flex-col gap-8 bg-[#313d5e] px-8 py-10 text-[#e6eaf3] box-decoration-clone sm:px-10 print:bg-transparent print:px-[12mm] print:py-[13mm]">
                <header className="flex flex-col gap-5">
                    <div>
                        <h1 className="text-[30px] leading-tight font-bold text-white">{cvContact.name}</h1>
                        <p className="text-[18px] text-[#d5dbea]">{c.title}</p>
                    </div>
                    <Image
                        src="/nick-profile-photo.webp"
                        alt={cvContact.name}
                        width={240}
                        height={240}
                        priority
                        className="size-[110px] rounded-full object-cover ring-4 ring-white/10"
                    />
                    <ul className="flex flex-col gap-2">
                        {contacts.map(({ Icon, text, href }) => (
                            <li key={text} className="flex items-center gap-3">
                                <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-white text-[#313d5e]">
                                    <Icon className="size-3" aria-hidden />
                                </span>
                                {href ? (
                                    <a href={href} className="hover:text-white hover:underline">
                                        {text}
                                    </a>
                                ) : (
                                    text
                                )}
                            </li>
                        ))}
                    </ul>
                </header>

                <SideSection Icon={IdCard} title={c.headings.profile}>
                    <div className="flex flex-col gap-2.5">
                        {c.profile.map((p) => (
                            <p key={p}>{p}</p>
                        ))}
                    </div>
                </SideSection>

                <SideSection Icon={Languages} title={c.headings.languages}>
                    <ul className="flex flex-col gap-3">
                        {c.languages.map((l) => (
                            <li key={l.name} className="flex items-center justify-between gap-4">
                                <span>
                                    <span className="block font-semibold text-white">{l.name}</span>
                                    <span className="text-[12.5px] text-[#b9c3dc]">{l.label}</span>
                                </span>
                                <span className="flex gap-1.5" aria-label={`${l.level} / 5`}>
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <span key={n} className={`size-2 rounded-full ${n <= l.level ? "bg-[#7dd3fc]" : "bg-white/15"}`} />
                                    ))}
                                </span>
                            </li>
                        ))}
                    </ul>
                </SideSection>

                <SideSection Icon={Lightbulb} title={c.headings.skills}>
                    <ul className="flex flex-wrap gap-2">
                        {cvSkills.map((s) => (
                            <li key={s} className="rounded-md bg-[#7dd3fc] px-2.5 py-1 text-[12.5px] font-semibold text-[#0f1b33]">
                                {s}
                            </li>
                        ))}
                    </ul>
                </SideSection>

                <SideSection Icon={FolderGit2} title={c.headings.projects}>
                    <ul className="flex flex-col gap-3">
                        {c.projects.map((p) => (
                            <li key={p.name}>
                                <span className="block font-semibold text-white">
                                    {p.url ? (
                                        <a href={p.url} className="hover:underline">
                                            {p.name} <span className="font-normal text-[#b9c3dc]">· {p.url.replace("https://", "")}</span>
                                        </a>
                                    ) : (
                                        p.name
                                    )}
                                </span>
                                {p.text}
                            </li>
                        ))}
                    </ul>
                </SideSection>

                <SideSection Icon={GraduationCap} title={c.headings.education}>
                    <ul className="flex flex-col gap-3.5">
                        {c.education.map((e) => (
                            <li key={e.title}>
                                <span className="block font-semibold text-white">{e.title}</span>
                                <span className="block italic">{e.school}</span>
                                {e.dates}
                            </li>
                        ))}
                    </ul>
                </SideSection>

                <SideSection Icon={Gamepad2} title={c.headings.interests}>
                    <p>{c.interests.join("  •  ")}</p>
                </SideSection>
            </div>

            {/* Main column */}
            <div className="flex flex-col gap-8 px-8 py-10 box-decoration-clone sm:px-10 print:px-[11mm] print:py-[13mm]">
                <MainSection Icon={BriefcaseBusiness} title={c.headings.experience}>
                    <ol className="flex flex-col gap-5">
                        {c.jobs.map((j) => (
                            <li key={j.title + j.dates} className="break-inside-avoid">
                                <h3 className="text-[15px] font-bold text-[#313d5e]">{j.title}</h3>
                                <p className="flex items-center gap-1 italic">
                                    {j.company}
                                    {j.url && (
                                        <a href={j.url} aria-label={j.company} className="text-[#7a8299] hover:text-[#313d5e]">
                                            <Link2 className="size-3" aria-hidden />
                                        </a>
                                    )}
                                </p>
                                <p className="mb-1 text-[#5b6378]">
                                    {j.dates}
                                    {j.place && ` | ${j.place}`}
                                </p>
                                <ul className="flex list-disc flex-col gap-0.5 pl-4 marker:text-[#313d5e]">
                                    {j.bullets.map((b) => (
                                        <li key={b}>{b}</li>
                                    ))}
                                    {j.tech && (
                                        <li className="mt-1">
                                            <span className="font-bold text-[#313d5e]">Tech:</span> {j.tech}
                                        </li>
                                    )}
                                </ul>
                            </li>
                        ))}
                    </ol>
                </MainSection>

                <MainSection Icon={Award} title={c.headings.certificates}>
                    <ul className="flex list-disc flex-col gap-1 pl-4 marker:text-[#313d5e]">
                        {c.certificates.map((x) => (
                            <li key={x}>{x}</li>
                        ))}
                    </ul>
                </MainSection>
            </div>
        </article>
    );
}

function SideSection({ Icon, title, children }: { Icon: LucideIcon; title: string; children: React.ReactNode }) {
    return (
        <section className="flex break-inside-avoid flex-col gap-3.5">
            <h2 className="flex items-center gap-2.5 text-[18px] font-bold tracking-wide text-white uppercase">
                <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                {title}
            </h2>
            {children}
        </section>
    );
}

function MainSection({ Icon, title, children }: { Icon: LucideIcon; title: string; children: React.ReactNode }) {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="flex items-center gap-2.5 text-[18px] font-bold tracking-wide text-[#313d5e] uppercase">
                <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                {title}
            </h2>
            {children}
        </section>
    );
}
