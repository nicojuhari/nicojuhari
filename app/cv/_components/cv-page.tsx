import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { pageMetadata } from "@/app/_lib/metadata";
import { SITE_URL } from "@/app/_lib/site";
import { cv, type CvLang } from "@/app/_data/cv";
import AutoPrint from "./auto-print";
import CvSheet from "./cv-sheet";

const base = { en: "/cv", de: "/de/cv" } as const;

export function cvMetadata(lang: CvLang): Metadata {
    const meta = pageMetadata({
        title: lang === "en" ? "CV - Nicolae Cojuhari, Senior Full-Stack Engineer" : "Lebenslauf - Nicolae Cojuhari, Senior Full-Stack Engineer",
        description:
            lang === "en"
                ? "CV of Nicolae Cojuhari: full-stack engineer in Vienna with 10+ years in TypeScript, React, Next.js and Node.js, and a background in banking and credit."
                : "Lebenslauf von Nicolae Cojuhari: Full-Stack Engineer in Wien mit über 10 Jahren Erfahrung in TypeScript, React, Next.js und Node.js und Hintergrund im Kreditwesen.",
        path: base[lang],
        locale: lang === "en" ? "en_US" : "de_AT",
    });
    return {
        ...meta,
        alternates: { ...meta.alternates, languages: { en: `${SITE_URL}/cv`, de: `${SITE_URL}/de/cv`, "x-default": `${SITE_URL}/cv` } },
    };
}

export const printMetadata: Metadata = { title: "CV - Nicolae Cojuhari", robots: { index: false } };

export function CvPage({ lang }: { lang: CvLang }) {
    const other = lang === "en" ? "de" : "en";
    return (
        <div className="container mt-8 flex flex-col gap-5 sm:mt-12">
            <div className="flex items-center justify-end gap-3">
                <Link href={base[other]} hrefLang={other} className="inline-flex h-11 items-center rounded-full border border-ink/15 px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-ink/5">
                    {cv[lang].ui.switchTo}
                </Link>
                <a href={`${base[lang]}/print`} target="_blank" className="btn-pill-primary h-11 px-5 text-[15px]">
                    <Download className="size-4" aria-hidden />
                    {cv[lang].ui.download}
                </a>
            </div>
            <CvSheet lang={lang} />
        </div>
    );
}

export function CvPrintPage({ lang }: { lang: CvLang }) {
    return (
        <div className="cv-print">
            <CvSheet lang={lang} />
            <AutoPrint />
        </div>
    );
}
