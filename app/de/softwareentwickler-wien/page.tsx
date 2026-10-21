import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import CtaSection from "@/app/_components/cta-section";
import FaqSection from "@/app/_components/faq-section";
import ProofBlock from "@/app/_components/proof-block";
import { getService, whatsappLink } from "@/app/_data/services";
import { LEGAL } from "@/app/_data/legal";
import { pageMetadata } from "@/app/_lib/metadata";
import { breadcrumbSchema, serviceSchema } from "@/app/_lib/schema";

const PATH = "/de/softwareentwickler-wien";
const WHATSAPP_TEXT = "Hallo Nick, ich möchte über mein Unternehmen sprechen: ";

export const metadata: Metadata = pageMetadata({
    title: "Softwareentwickler Wien (Freelancer) | Nicolae Cojuhari",
    description:
        "Freiberuflicher Software- und Webentwickler in Wien. Websites, Web-Apps und Automationen, die mehr Anrufe, Buchungen und Aufträge bringen. Antwort in 24 h.",
    path: PATH,
    locale: "de_AT",
});

const websites = getService("local-business-websites");
const apps = getService("custom-web-apps");

const offers = [
    {
        service: websites,
        title: "Websites für lokale Unternehmen",
        text: "Für Handwerker, Praxen, Salons und Dienstleister. Mehr Anrufe und Buchungen über Google und Google Maps.",
        items: ["Website und Google-Maps-Profil", "Eine Seite für jede Leistung", "Landingpages für Werbung", "Schnelle Antworten und Nachfassen", "Sie sehen jeden Monat, wie viele Anfragen kamen"],
    },
    {
        service: apps,
        title: "Web-Apps und Automationen",
        text: "Für Firmen mit viel Handarbeit. Weniger Tipparbeit, klare Zahlen, Abläufe, die von selbst laufen.",
        items: ["Interne Tools und Dashboards", "Anfragen, Angebote und Rechnungen verbunden", "Ihre Tools sprechen miteinander", "KI, wo sie Zeit spart", "Betreuung nach dem Start"],
    },
];

const path = [
    { title: "Gefunden werden", text: "Kunden finden Sie auf Google und Google Maps." },
    { title: "Vertrauen", text: "Klare Seiten, echte Fotos, Bewertungen." },
    { title: "Schnell antworten", text: "Jede Anfrage landet sofort auf Ihrem Handy." },
    { title: "Nachfassen", text: "Wer nicht gebucht hat, bekommt eine Erinnerung." },
    { title: "Zählen", text: "Sie sehen, welche Anfragen zu Kunden wurden." },
];

const compare = [
    { label: "Ansprechpartner", freelancer: "Eine Person, vom ersten Gespräch bis nach dem Start", agency: "Meist mehrere Personen, oft ein Projektmanager" },
    { label: "Kosten", freelancer: "Meist günstiger, weil es kein großes Team gibt", agency: "Höher, dafür mehr Leute für große Projekte" },
    { label: "Passt gut für", freelancer: "Kleine und mittlere Unternehmen, klare Projekte", agency: "Große Projekte mit vielen Teilen gleichzeitig" },
    { label: "Worauf Sie achten sollten", freelancer: "Was passiert, wenn die Person ausfällt? Fragen Sie nach Code und Zugängen.", agency: "Wer arbeitet wirklich an Ihrem Projekt?" },
];

const projects = [
    { title: "Handwerker Netz", text: "Handwerker-Service in Wien. Website auf Deutsch und Englisch, Google-Maps-Profil, Anfragen mit Fotos.", href: "https://handwerker-netz.at" },
    { title: "System für eine Kreditfirma", text: "Kredite, Kunden, Zahlungen und Zahlen an einem Ort. Das Team arbeitet jeden Tag damit. Privat, kein öffentlicher Zugang." },
    { title: "EPUfix", text: "Angebote, Rechnungen, Einnahmen und Ausgaben für Ein-Personen-Unternehmen in Österreich.", href: "https://epufix.at" },
];

const steps = [
    { title: "Sie schreiben mir", text: "Ein paar Zeilen auf WhatsApp oder per E-Mail. Ich antworte innerhalb von 24 Stunden." },
    { title: "Kurzer Check", text: "Ich teste Ihre Website oder Ihren Ablauf wie ein Kunde und sage Ihnen, was ich zuerst ändern würde." },
    { title: "Fester Preis", text: "Sie bekommen einen festen Preis und einen Zeitplan. Sie zahlen in Etappen, nach jedem fertigen Teil." },
    { title: "Bauen und verbessern", text: "Sie sehen jede Woche, was fertig ist. Danach verbessere ich es weiter, wenn Sie möchten." },
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
        PATH
    ),
    inLanguage: "de-AT",
};

export default function SoftwareentwicklerWienPage() {
    return (
        <div lang="de" className="container mt-6 sm:mt-12">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        breadcrumbSchema([
                            { name: "Home", path: "/" },
                            { name: "Softwareentwickler Wien", path: PATH },
                        ])
                    ),
                }}
            />

            {/* Hero */}
            <section className="flex max-w-[820px] flex-col gap-5 sm:gap-6">
                <p className="eyebrow">Freelancer · Wien</p>
                <h1 className="text-[34px] leading-[1.06] font-semibold tracking-[-0.03em] text-ink sm:text-[44px] xl:text-[52px] xl:leading-[1.04]">
                    Softwareentwickler in Wien. <span className="text-ink-faint">Für mehr Kunden und weniger Handarbeit.</span>
                </h1>
                <p className="max-w-[660px] text-base leading-relaxed text-ink-muted sm:text-lg">
                    Websites und Apps für kleine Unternehmen, die mehr Anrufe, Buchungen und Aufträge bringen. Freiberuflich, direkt
                    mit mir: Nicolae Cojuhari.
                </p>
                <div className="mt-1 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
                    <a
                        href={whatsappLink(WHATSAPP_TEXT)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-pill-primary h-12 px-6 text-[15px] sm:text-sm"
                    >
                        Auf WhatsApp schreiben
                        <ArrowRight className="size-4" aria-hidden />
                    </a>
                    <a href="#leistungen" className="btn-pill-secondary h-12 px-5.5 text-[15px] sm:text-sm">
                        Was ich mache
                    </a>
                </div>
                <span className="font-mono text-xs text-ink-faint">Antwort innerhalb von 24 Stunden · Mo–Fr · Gespräche auf Google Meet</span>
            </section>

            <ProofBlock proof={proof} className="mt-12 sm:mt-16" />

            {/* Services */}
            <section id="leistungen" className="mt-16 flex scroll-mt-28 flex-col gap-6 sm:mt-24">
                <div className="flex max-w-[680px] flex-col gap-2.5">
                    <p className="eyebrow">Leistungen</p>
                    <h2 className="text-[28px] leading-[1.1] font-semibold tracking-[-0.03em] text-ink sm:text-[38px]">Was ich für Sie mache</h2>
                    <p className="text-[15px] leading-relaxed text-ink-muted">
                        Die Website bringt die Kunden. Die App erledigt die Arbeit danach.
                    </p>
                </div>
                <ul className="grid gap-3 md:grid-cols-2 md:gap-4">
                    {offers.map(({ service, title, text, items }) => (
                        <li key={title} className="flex flex-col gap-4 rounded-[20px] border border-rule bg-white p-5.5 sm:p-7">
                            <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">{title}</h3>
                            <p className="text-[15px] leading-relaxed text-ink-muted">{text}</p>
                            <ul className="flex flex-col">
                                {items.map((item) => (
                                    <li key={item} className="flex items-start gap-3 border-t border-line py-2.5">
                                        <span
                                            className="mt-px flex size-5.5 shrink-0 items-center justify-center rounded-full"
                                            style={{ backgroundColor: service.tint, color: service.accent }}
                                        >
                                            <Check className="size-[13px]" strokeWidth={2.6} aria-hidden />
                                        </span>
                                        <span className="text-[15px] leading-normal text-ink-soft">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={service.href}
                                className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold"
                                style={{ color: service.accent }}
                            >
                                Mehr dazu (Englisch)
                                <ArrowRight className="size-[15px]" aria-hidden />
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* The whole path */}
            <section className="mt-16 flex flex-col gap-6 sm:mt-24">
                <div className="flex max-w-[680px] flex-col gap-2.5">
                    <p className="eyebrow">Der ganze Weg</p>
                    <h2 className="text-[28px] leading-[1.1] font-semibold tracking-[-0.03em] text-ink sm:text-[38px]">
                        Vom ersten Klick zum zahlenden Kunden
                    </h2>
                    <p className="text-[15px] leading-relaxed text-ink-muted">
                        Viele Anbieter hören bei der Anfrage auf. Ich kümmere mich auch um alles danach.
                    </p>
                </div>
                <ol className="grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-5">
                    {path.map((step, i) => (
                        <li key={step.title} className="flex flex-col gap-1 rounded-[20px] border border-rule bg-white px-5 py-4 lg:gap-2 lg:p-5.5">
                            <span className="font-mono text-xs font-semibold text-teal">{String(i + 1).padStart(2, "0")}</span>
                            <h3 className="text-base font-semibold text-ink">{step.title}</h3>
                            <p className="text-sm leading-relaxed text-ink-muted">{step.text}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Freelancer vs agency */}
            <section className="mt-16 flex flex-col gap-6 sm:mt-24">
                <div className="flex max-w-[680px] flex-col gap-2.5">
                    <p className="eyebrow">Vergleich</p>
                    <h2 className="text-[28px] leading-[1.1] font-semibold tracking-[-0.03em] text-ink sm:text-[38px]">
                        Freelancer oder Agentur in Wien?
                    </h2>
                    <p className="text-[15px] leading-relaxed text-ink-muted">
                        Für kleine und mittlere Unternehmen ist ein Freelancer oft die bessere Wahl: ein Ansprechpartner und meist
                        niedrigere Kosten. Eine Agentur passt besser zu großen Projekten mit vielen Leuten.
                    </p>
                </div>
                <div className="overflow-x-auto rounded-[20px] border border-rule bg-white">
                    <table className="w-full min-w-[560px] text-left text-sm">
                        <thead>
                            <tr className="border-b border-rule text-ink">
                                <th className="p-4 font-semibold sm:p-5" />
                                <th className="p-4 font-semibold sm:p-5">Freelancer</th>
                                <th className="p-4 font-semibold sm:p-5">Agentur</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compare.map((row) => (
                                <tr key={row.label} className="border-b border-line last:border-0">
                                    <th scope="row" className="p-4 align-top font-semibold text-ink sm:p-5">
                                        {row.label}
                                    </th>
                                    <td className="p-4 align-top leading-relaxed text-ink-muted sm:p-5">{row.freelancer}</td>
                                    <td className="p-4 align-top leading-relaxed text-ink-muted sm:p-5">{row.agency}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Projects + for companies hiring */}
            <section className="mt-16 grid gap-3 sm:mt-24 md:grid-cols-2 md:gap-4">
                <div className="flex flex-col gap-4 rounded-[20px] border border-rule bg-white p-5.5 sm:p-7">
                    <h2 className="eyebrow">Projekte</h2>
                    <ul className="flex flex-col gap-4">
                        {projects.map((project) => (
                            <li key={project.title} className="flex flex-col gap-0.5">
                                {project.href ? (
                                    <a
                                        href={project.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[15px] font-semibold text-brand underline-offset-4 hover:underline"
                                    >
                                        {project.title}
                                    </a>
                                ) : (
                                    <span className="text-[15px] font-semibold text-ink">{project.title}</span>
                                )}
                                <span className="text-sm leading-normal text-ink-muted">{project.text}</span>
                            </li>
                        ))}
                    </ul>
                    <Link href="/projects" className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-brand">
                        Alle Projekte (Englisch)
                        <ArrowRight className="size-[15px]" aria-hidden />
                    </Link>
                </div>

                <div className="flex flex-col gap-4 rounded-[20px] border border-rule bg-white p-5.5 sm:p-7">
                    <h2 className="eyebrow">Sie suchen einen Entwickler?</h2>
                    <p className="text-[15px] leading-[1.65] text-ink-soft">
                        Sie haben ein Team und brauchen Unterstützung für ein Projekt? Ich arbeite als freiberuflicher Full-Stack-Entwickler
                        mit. Mein Vorteil: Ich denke nicht nur an den Code, sondern auch daran, wie er Ihrem Unternehmen Kunden und Umsatz
                        bringt.
                    </p>
                    <ul className="flex flex-wrap gap-2">
                        {stack.map((tech) => (
                            <li key={tech} className="rounded-full border border-rule px-3 py-1 font-mono text-xs text-ink-soft">
                                {tech}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* How we work */}
            <section className="mt-16 flex flex-col gap-6 rounded-3xl border border-rule bg-white p-5.5 sm:mt-24 sm:rounded-[28px] sm:p-11">
                <h2 className="text-[28px] leading-[1.1] font-semibold tracking-[-0.03em] text-ink sm:text-[38px]">So arbeiten wir zusammen</h2>
                <ol className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, i) => (
                        <li key={step.title} className="flex flex-col gap-1.5">
                            <span className="font-mono text-[13px] font-semibold text-teal">{String(i + 1).padStart(2, "0")}</span>
                            <span className="text-[15px] font-semibold text-ink">{step.title}</span>
                            <span className="text-sm leading-normal text-ink-muted">{step.text}</span>
                        </li>
                    ))}
                </ol>
            </section>

            <FaqSection faq={faq} eyebrow="Fragen" title="Häufige Fragen" className="mt-16 sm:mt-24" />

            <CtaSection
                className="mt-16 mb-4 sm:mt-24"
                title="Mehr Kunden und weniger Handarbeit?"
                description="Schreiben Sie mir kurz, worum es geht. Ich antworte innerhalb von 24 Stunden mit dem ersten Schritt, den ich vorschlagen würde."
                primaryLabel="Auf WhatsApp schreiben"
                whatsappText={WHATSAPP_TEXT}
                secondary={{ label: "E-Mail schreiben", href: `mailto:${LEGAL.email}` }}
            />
        </div>
    );
}
