import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import CtaSection from "@/app/_components/cta-section";
import FaqSection from "@/app/_components/faq-section";
import { getService, whatsappLink } from "@/app/_data/services";
import { LEGAL } from "@/app/_data/legal";
import { pageMetadata } from "@/app/_lib/metadata";
import { breadcrumbSchema, serviceSchema } from "@/app/_lib/schema";

const PATH = "/de/softwareentwickler-wien";
const WHATSAPP_TEXT = "Hallo Nick, ich möchte über mein Unternehmen sprechen: ";

export const metadata: Metadata = pageMetadata({
    title: "Softwareentwickler Wien (Freelancer) | Nicolae Cojuhari",
    description:
        "Freiberuflicher Software- und Webentwickler in Wien. Websites, Landingpages für Werbung, Web-Apps und KI-Automationen für mehr Anrufe und Aufträge. Antwort in 24 h.",
    path: PATH,
    locale: "de_AT",
});

const websites = getService("local-business-websites");
const apps = getService("custom-web-apps");

const offers = [
    {
        service: websites,
        title: "Websites für lokale Unternehmen",
        text: "Für Handwerker, Praxen, Salons und Dienstleister. Mehr Anrufe und Buchungen über Google, Google Maps und Werbung.",
        items: [
            "Website und Google-Maps-Profil",
            "Eine Seite für jede Leistung",
            "Landingpages, die Ihre Werbung günstiger machen",
            "Automatische Antworten und Nachfassen",
            "Sie sehen jeden Monat, wie viele Anfragen kamen",
        ],
    },
    {
        service: apps,
        title: "Web-Apps und Automationen",
        text: "Für Firmen mit viel Handarbeit. Weniger Tipparbeit, klare Zahlen, Abläufe, die von selbst laufen.",
        items: [
            "Interne Tools und Dashboards",
            "Anfragen, Angebote und Rechnungen verbunden",
            "Automatische Abläufe mit n8n, Make oder Zapier",
            "KI-Automationen, wo sie Zeit sparen",
            "Betreuung nach dem Start",
        ],
    },
];

const path = [
    {
        title: "Gefunden werden",
        text: "Kunden finden Sie auf Google, Google Maps und über Ihre Werbung.",
    },
    { title: "Vertrauen", text: "Klare Seiten, echte Fotos, Bewertungen." },
    {
        title: "Schnell antworten",
        text: "Jede Anfrage landet sofort auf Ihrem Handy.",
    },
    {
        title: "Nachfassen",
        text: "Wer nicht gebucht hat, bekommt eine Erinnerung.",
    },
    { title: "Zählen", text: "Sie sehen, welche Anfragen zu Kunden wurden." },
];

const compare = [
    {
        label: "Ansprechpartner",
        freelancer: "Eine Person, vom ersten Gespräch bis nach dem Start",
        agency: "Meist mehrere Personen, oft ein Projektmanager",
    },
    {
        label: "Kosten",
        freelancer: "Meist günstiger, weil es kein großes Team gibt",
        agency: "Höher, dafür mehr Leute für große Projekte",
    },
    {
        label: "Passt gut für",
        freelancer: "Kleine und mittlere Unternehmen, klare Projekte",
        agency: "Große Projekte mit vielen Teilen gleichzeitig",
    },
    {
        label: "Worauf Sie achten sollten",
        freelancer: "Was passiert, wenn die Person ausfällt? Fragen Sie nach Code und Zugängen.",
        agency: "Wer arbeitet wirklich an Ihrem Projekt?",
    },
];

const projects = [
    {
        title: "Handwerker Netz",
        text: "Handwerker-Service in Wien. Website auf Deutsch und Englisch, Google-Maps-Profil, Anfragen mit Fotos.",
        href: "https://handwerker-netz.at",
    },
    {
        title: "System für eine Kreditfirma",
        text: "Kredite, Kunden, Zahlungen und Zahlen an einem Ort. Das Team arbeitet jeden Tag damit. Privat, kein öffentlicher Zugang.",
    },
    {
        title: "EPUfix",
        text: "Angebote, Rechnungen, Einnahmen und Ausgaben für Ein-Personen-Unternehmen in Österreich.",
        href: "https://epufix.at",
    },
];

const steps = [
    {
        title: "Sie schreiben mir",
        text: "Ein paar Zeilen auf WhatsApp oder per E-Mail. Ich antworte innerhalb von 24 Stunden.",
    },
    {
        title: "Kurzer Check",
        text: "Ich teste Ihre Website oder Ihren Ablauf wie ein Kunde und sage Ihnen, was ich zuerst ändern würde.",
    },
    {
        title: "Fester Preis",
        text: "Sie bekommen einen festen Preis und einen Zeitplan. Sie zahlen in Etappen, nach jedem fertigen Teil.",
    },
    {
        title: "Bauen und verbessern",
        text: "Sie sehen jede Woche, was fertig ist. Danach verbessere ich es weiter, wenn Sie möchten.",
    },
];

const stack = ["Next.js", "React", "TypeScript", "Node.js", "Supabase", "PostgreSQL", "MySQL", "Tailwind CSS", "Stripe", "Shopify"];

const faq = [
    {
        question: "Was kostet eine Website oder eine Web-App?",
        answer: "Das hängt vom Umfang ab. Nach einem kurzen Check bekommen Sie einen festen Preis, bevor ich anfange. Sie zahlen in Etappen, nach jedem fertigen Teil. Ich rechne nicht nach Stunden ab.",
    },
    {
        question: "Freelancer oder Agentur: was ist besser?",
        answer: "Für kleine und mittlere Unternehmen ist ein Freelancer oft die bessere Wahl: ein Ansprechpartner, kurze Wege, meist niedrigere Kosten. Eine Agentur passt besser zu großen Projekten mit vielen Teilen gleichzeitig.",
    },
    {
        question: "Wem gehören die Website, der Code und die Daten?",
        answer: "Ihnen. Die Domain, die Website, der Code, das Google-Profil und die Daten gehören Ihrem Unternehmen.",
    },
    {
        question: "Wird meine Google-Werbung mit einer besseren Website günstiger?",
        answer: "Ja. Google bewertet die Seite, auf die Ihre Anzeige führt. Eine schnelle, klare Seite bekommt eine bessere Bewertung, und Sie zahlen weniger pro Klick. Und wenn mehr Besucher anrufen oder buchen, kostet Sie jeder Kunde weniger.",
    },
    {
        question: "Betreuen Sie das Projekt nach dem Start?",
        answer: "Ja, wenn Sie möchten. Mit einem Monatsplan verbessere ich die Website oder App weiter und zeige Ihnen jeden Monat die Zahlen: Anrufe, Anfragen oder gesparte Stunden.",
    },
    {
        question: "Wie lange dauert ein Projekt?",
        answer: "Das hängt vom Umfang ab. Nach dem ersten Check bekommen Sie einen Zeitplan. Sie sehen jede Woche, was fertig ist.",
    },
    {
        question: "Arbeiten Sie auch als Entwickler in einem bestehenden Team?",
        answer: "Ja, für einzelne Projekte. Schreiben Sie mir, worum es geht und welche Technik Sie verwenden.",
    },
    {
        question: "Wie läuft die Kommunikation?",
        answer: "Über WhatsApp oder E-Mail. Gespräche führen wir auf Google Meet. Ich arbeite von Wien aus, für Unternehmen in ganz Österreich.",
    },
];

const proof = {
    stat: "95%+",
    title: "der Kunden kommen über die Website und Google Maps",
    text: "Das ist das Ergebnis bei Handwerker Netz, einem Handwerker-Service in Wien, den ich mitbesitze. Ich habe die Website und das Google-Profil gemacht und verbessere beides jede Woche.",
    href: "https://handwerker-netz.at",
    linkLabel: "handwerker-netz.at ansehen",
};

const schemaService = {
    ...serviceSchema(
        "Softwareentwicklung und Webentwicklung in Wien",
        "Freiberuflicher Software- und Webentwickler in Wien: Websites für lokale Unternehmen, Web-Apps und Automationen, die mehr Anrufe, Buchungen und Aufträge bringen.",
        PATH,
    ),
    inLanguage: "de-AT",
};

export default function SoftwareentwicklerWienPage() {
    return (
        <div lang="de">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        breadcrumbSchema([
                            { name: "Home", path: "/" },
                            { name: "Softwareentwickler Wien", path: PATH },
                        ]),
                    ),
                }}
            />

            {/* Hero */}
            <section className="container mt-8 flex flex-col gap-5 sm:mt-14 sm:gap-6.5">
                <p className="eyebrow">Freelancer · Wien</p>
                <h1 className="max-w-[900px] text-[38px] leading-[1.04] font-semibold tracking-[-0.04em] text-ink sm:text-[52px] xl:text-[62px]">
                    Softwareentwickler in Wien. <span className="text-teal">Für mehr Kunden und weniger Handarbeit.</span>
                </h1>
                <p className="max-w-[640px] text-lg leading-normal text-[#4a4f57] sm:text-xl">
                    Websites und Apps für kleine Unternehmen, die mehr Anrufe, Buchungen und Aufträge bringen. Freiberuflich, direkt mit
                    mir: Nicolae Cojuhari.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                        href={whatsappLink(WHATSAPP_TEXT)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-pill-primary h-14 px-6.5 text-base sm:text-[17px]"
                    >
                        Auf WhatsApp schreiben
                        <ArrowRight className="size-[18px]" aria-hidden />
                    </a>
                    <a
                        href="#leistungen"
                        className="inline-flex h-14 items-center justify-center rounded-full bg-white px-6 text-base font-semibold text-ink transition-opacity hover:opacity-85 sm:text-[17px]"
                    >
                        Was ich mache
                    </a>
                </div>
                <p className="text-[15px] text-[#4a4f57]">Antwort innerhalb von 24 Stunden · Mo–Fr · Gespräche auf Google Meet</p>
            </section>

            {/* Proof */}
            <section className="mt-16 bg-brand text-white sm:mt-24">
                <div className="container grid items-center gap-7 py-14 sm:py-24 lg:grid-cols-2 lg:gap-16">
                    <div className="flex flex-col gap-2.5">
                        <p className="eyebrow text-[#f2a9c9]">Im eigenen Unternehmen getestet</p>
                        <p className="text-[64px] leading-none font-semibold tracking-[-0.05em] text-[#f2a9c9] sm:text-[96px] xl:text-[112px]">
                            {proof.stat}
                        </p>
                        <p className="text-[22px] leading-tight font-semibold tracking-[-0.02em] sm:text-[28px]">{proof.title}.</p>
                    </div>
                    <div className="flex flex-col gap-5">
                        <p className="text-[17px] leading-relaxed text-[#c3cbe0] sm:text-[19px]">{proof.text}</p>
                        <a
                            href={proof.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-12 items-center gap-2 self-start rounded-full bg-white px-5 text-[15px] font-semibold text-brand transition-opacity hover:opacity-90"
                        >
                            {proof.linkLabel}
                            <ArrowUpRight className="size-4" aria-hidden />
                        </a>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="leistungen" className="container mt-16 flex scroll-mt-28 flex-col gap-8 sm:mt-24 sm:gap-10">
                <div className="flex max-w-[680px] flex-col gap-3">
                    <p className="eyebrow">Leistungen</p>
                    <h2 className="section-title">Was ich für Sie mache</h2>
                    <p className="text-base leading-normal text-[#4a4f57] sm:text-lg">
                        Die Website bringt die Kunden. Die App erledigt die Arbeit danach.
                    </p>
                </div>
                <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
                    {offers.map(({ service, title, text, items }) => (
                        <li
                            key={title}
                            className="flex flex-col gap-5 rounded-[26px] p-6 sm:rounded-[32px] sm:p-10"
                            style={{ backgroundColor: service.tint }}
                        >
                            <h3
                                className="text-[24px] leading-[1.15] font-semibold tracking-[-0.03em] sm:text-[30px]"
                                style={{ color: service.ink }}
                            >
                                {title}
                            </h3>
                            <p className="text-[17px] leading-normal text-[#2c3440]">{text}</p>
                            <ul className="flex flex-col gap-2.5 text-[15px] text-[#2c3440] sm:text-base">
                                {items.map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <Check
                                            className="mt-0.5 size-5 shrink-0"
                                            strokeWidth={2.4}
                                            style={{ color: service.accent }}
                                            aria-hidden
                                        />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={service.href}
                                className="mt-auto inline-flex h-12 items-center justify-center gap-2 self-start rounded-full px-5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
                                style={{ backgroundColor: service.accent }}
                            >
                                Mehr dazu (Englisch)
                                <ArrowRight className="size-4" aria-hidden />
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* The whole path */}
            <section className="container mt-16 flex flex-col gap-8 sm:mt-24 sm:gap-10">
                <div className="flex max-w-[680px] flex-col gap-3">
                    <p className="eyebrow">Der ganze Weg</p>
                    <h2 className="section-title">Vom ersten Klick zum zahlenden Kunden</h2>
                    <p className="text-base leading-normal text-[#4a4f57] sm:text-lg">
                        Viele Anbieter hören bei der Anfrage auf. Ich kümmere mich auch um alles danach.
                    </p>
                </div>
                <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
                    {path.map((step, i) => (
                        <li key={step.title} className="flex flex-col gap-2.5 rounded-[22px] bg-white p-6">
                            <span className="text-sm font-bold text-teal">{i + 1}</span>
                            <h3 className="text-[19px] leading-tight font-semibold tracking-[-0.02em] text-ink">{step.title}</h3>
                            <p className="text-[15px] leading-relaxed text-[#4a4f57]">{step.text}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Freelancer vs agency */}
            <section className="container mt-16 flex flex-col gap-8 sm:mt-24 sm:gap-10">
                <div className="flex max-w-[680px] flex-col gap-3">
                    <p className="eyebrow">Vergleich</p>
                    <h2 className="section-title">Freelancer oder Agentur in Wien?</h2>
                    <p className="text-base leading-normal text-[#4a4f57] sm:text-lg">
                        Für kleine und mittlere Unternehmen ist ein Freelancer oft die bessere Wahl: ein Ansprechpartner und meist
                        niedrigere Kosten. Eine Agentur passt besser zu großen Projekten mit vielen Leuten.
                    </p>
                </div>
                <div className="overflow-x-auto rounded-[24px] bg-white p-2 sm:p-3">
                    <table className="w-full min-w-[560px] text-left text-[15px]">
                        <thead>
                            <tr className="text-ink">
                                <th className="p-4 sm:p-5" />
                                <th className="p-4 text-base font-semibold text-teal sm:p-5">Freelancer</th>
                                <th className="p-4 text-base font-semibold sm:p-5">Agentur</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compare.map((row) => (
                                <tr key={row.label} className="odd:bg-bg-soft">
                                    <th scope="row" className="rounded-l-[16px] p-4 align-top font-semibold text-ink sm:p-5">
                                        {row.label}
                                    </th>
                                    <td className="p-4 align-top leading-relaxed text-[#2c3440] sm:p-5">{row.freelancer}</td>
                                    <td className="rounded-r-[16px] p-4 align-top leading-relaxed text-[#4a4f57] sm:p-5">{row.agency}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Projects + for companies hiring */}
            <section className="container mt-16 grid gap-4 sm:mt-24 md:grid-cols-2 md:gap-5">
                <div className="flex flex-col gap-5 rounded-[24px] bg-white p-6 sm:p-8">
                    <h2 className="text-[24px] leading-tight font-semibold tracking-[-0.03em] text-ink sm:text-[28px]">Projekte</h2>
                    <ul className="flex flex-col gap-2.5">
                        {projects.map((project) => (
                            <li key={project.title} className="flex flex-col gap-1 rounded-[18px] bg-bg-soft p-4.5">
                                {project.href ? (
                                    <a
                                        href={project.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 self-start text-base font-semibold text-brand underline-offset-4 hover:underline"
                                    >
                                        {project.title}
                                        <ArrowUpRight className="size-4" aria-hidden />
                                    </a>
                                ) : (
                                    <span className="text-base font-semibold text-ink">{project.title}</span>
                                )}
                                <span className="text-[15px] leading-normal text-[#4a4f57]">{project.text}</span>
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="/projects"
                        className="mt-auto inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand hover:underline"
                    >
                        Alle Projekte (Englisch)
                        <ArrowRight className="size-4" aria-hidden />
                    </Link>
                </div>

                <div className="flex flex-col gap-5 rounded-[24px] bg-white p-6 sm:p-8">
                    <h2 className="text-[24px] leading-tight font-semibold tracking-[-0.03em] text-ink sm:text-[28px]">
                        Sie suchen einen Entwickler?
                    </h2>
                    <p className="text-base leading-relaxed text-[#2c3440]">
                        Sie haben ein Team und brauchen Unterstützung für ein Projekt? Ich arbeite als freiberuflicher Full-Stack-Entwickler
                        mit. Ich denke nicht nur an den Code. Ich denke auch daran, wie er Ihnen Kunden und Umsatz bringt.
                    </p>
                    <ul className="flex flex-wrap gap-2 text-sm font-medium text-[#2c3440]">
                        {stack.map((tech) => (
                            <li key={tech} className="rounded-full bg-bg-soft px-3.5 py-2">
                                {tech}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* How we work */}
            <section className="mt-16 bg-brand text-white sm:mt-24">
                <div className="container flex flex-col gap-8 py-14 sm:gap-12 sm:py-24">
                    <h2 className="section-title text-white">So arbeiten wir zusammen</h2>
                    <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                        {steps.map((step, i) => (
                            <li key={step.title} className="flex flex-col gap-3 rounded-[22px] bg-[#1f3561] p-6 sm:p-7">
                                <span className="flex size-9 items-center justify-center rounded-full bg-[#f2a9c9] text-[15px] font-bold text-brand">
                                    {i + 1}
                                </span>
                                <h3 className="text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                                <p className="text-[15px] leading-relaxed text-[#c3cbe0]">{step.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <FaqSection faq={faq} eyebrow="Fragen" title="Häufige Fragen" className="container mt-16 sm:mt-24" />

            <div className="container mt-16 sm:mt-24">
                <CtaSection
                    title="Mehr Kunden und weniger Handarbeit?"
                    description="Schreiben Sie mir kurz, worum es geht. Ich antworte innerhalb von 24 Stunden mit dem ersten Schritt, den ich vorschlagen würde."
                    primaryLabel="Auf WhatsApp schreiben"
                    whatsappText={WHATSAPP_TEXT}
                    secondary={{
                        label: "E-Mail schreiben",
                        href: `mailto:${LEGAL.email}`,
                    }}
                />
            </div>
        </div>
    );
}
