import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { LinkedInIcon } from "@/app/_components/icons";
import { cv, cvContact, cvSkills } from "@/app/_data/cv";
import { pageMetadata } from "@/app/_lib/metadata";
import { profilePageSchema } from "@/app/_lib/schema";

const description =
    "Nicolae Cojuhari, full-stack engineer in Vienna. 10+ years building web applications, from bwin to a loan system a credit company runs on every day.";

export const metadata: Metadata = pageMetadata({ title: "About Nick: Full-Stack Engineer in Vienna", description, path: "/about" });

const story = [
    {
        years: "2009 – 2014",
        title: "Banking and credit",
        text: "Credit economist at Victoriabank, then running the loan portfolio at Ideal Credit. I learned how loans, risk and reports work from the inside.",
    },
    {
        years: "2014",
        title: "First code, for a real business",
        text: "Ideal Credit needed a website and a loan calculator, so I built them. Then the internal system for loans and payments. I still build and run it today.",
    },
    {
        years: "2016 – 2019",
        title: "Web agencies in the UK",
        text: "Websites and online stores for small businesses in Manchester. WordPress, Magento, Shopify, and a lot of fixing other people's code.",
    },
    {
        years: "2020 – 2024",
        title: "bwin, Vienna",
        text: "Front end developer, then senior software engineer. My team owned the shared UI system for all the company's brands - dozens of websites.",
    },
    {
        years: "2024 – now",
        title: "Building my own products",
        text: "EPUfix, an invoicing app for self-employed people in Austria. The Ideal Credit loan system. Websites and apps for a few clients.",
    },
];

export default function AboutPage() {
    const en = cv.en;
    return (
        <div className="container-sm mt-8 flex flex-col gap-14 sm:mt-14 sm:gap-16">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema("/about")) }} />
            <section className="flex flex-col gap-6">
                <Image
                    src="/nick-profile-photo.webp"
                    alt="Nicolae Cojuhari"
                    width={192}
                    height={192}
                    priority
                    className="size-20 rounded-full object-cover ring-4 ring-white sm:size-24"
                />
                <div className="flex flex-col gap-4">
                    <p className="eyebrow">About</p>
                    <h1 className="text-[40px] leading-[1.03] font-semibold tracking-[-0.04em] text-ink sm:text-[54px]">
                        Hi, I’m Nick. <span className="text-teal">I build web applications.</span>
                    </h1>
                    <p className="text-lg leading-normal text-[#4a4f57] sm:text-xl">
                        Full-stack engineer in Vienna. 10+ years of writing software, and 5 years in banking and credit before that.
                    </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <Link href="/cv" className="btn-pill-primary h-12 px-6 text-[15px]">
                        <FileText className="size-[18px]" aria-hidden />
                        View my CV
                    </Link>
                    <a
                        href={`mailto:${cvContact.email}`}
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/15 px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-ink/5"
                    >
                        <Mail className="size-[18px]" aria-hidden />
                        Email me
                    </a>
                    <a
                        href={cvContact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/15 px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-ink/5"
                    >
                        <LinkedInIcon className="size-[18px]" />
                        LinkedIn
                    </a>
                </div>
            </section>

            <section className="flex flex-col gap-6">
                <h2 className="section-title">How I got here</h2>
                <ol className="flex flex-col border-l-2 border-rule">
                    {story.map((s) => (
                        <li key={s.years} className="relative flex flex-col gap-1.5 pb-8 pl-6 last:pb-0">
                            <span className="absolute top-1.5 -left-[7px] size-3 rounded-full bg-teal ring-4 ring-bg-soft" aria-hidden />
                            <span className="font-mono text-sm text-ink-muted">{s.years}</span>
                            <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">{s.title}</h3>
                            <p className="text-base leading-relaxed text-ink-soft">{s.text}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="flex flex-col gap-5">
                <h2 className="section-title">What I work with</h2>
                <ul className="flex flex-wrap gap-2">
                    {cvSkills.map((s) => (
                        <li key={s} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink">
                            {s}
                        </li>
                    ))}
                </ul>
                <dl className="grid gap-4 text-base sm:grid-cols-2">
                    <div className="surface-card flex flex-col gap-1 p-5">
                        <dt className="font-semibold text-ink">Languages</dt>
                        <dd className="text-ink-soft">{en.languages.map((l) => `${l.name} (${l.label})`).join(", ")}</dd>
                    </div>
                    <div className="surface-card flex flex-col gap-1 p-5">
                        <dt className="font-semibold text-ink">Education</dt>
                        {en.education.map((e) => (
                            <dd key={e.title} className="text-ink-soft">
                                {e.title}, {e.school}
                            </dd>
                        ))}
                    </div>
                </dl>
            </section>

            <section className="surface-card flex flex-col gap-4 p-6 sm:p-8">
                <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink">What I’m looking for</h2>
                <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
                    A full-time full-stack role in Vienna (hybrid) or remote. On the side, I take on a few freelance projects: websites and
                    custom apps for small businesses.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <Link href="/projects" className="inline-flex items-center gap-2 py-2 text-[15px] font-semibold text-teal hover:underline">
                        See my work <ArrowRight className="size-4" aria-hidden />
                    </Link>
                    <Link href="/services" className="inline-flex items-center gap-2 py-2 text-[15px] font-semibold text-brand hover:underline">
                        Freelance services <ArrowRight className="size-4" aria-hidden />
                    </Link>
                </div>
            </section>
        </div>
    );
}
