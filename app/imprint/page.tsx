import type { Metadata } from "next";
import LegalPage from "@/app/_components/legal-page";
import { LEGAL, legalAddress } from "@/app/_data/legal";
import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata({
    title: "Imprint (Impressum) | Nicojuhari",
    description:
        "Legal information for Nicolae Cojuhari trading as Nicojuhari. Web design and software development business in Vienna, Austria. Contact details and business regulations.",
    path: "/imprint",
});

const rows: [string, React.ReactNode][] = [
    ["Business owner", LEGAL.name],
    ["Trading as", LEGAL.tradingAs],
    ["Legal form", LEGAL.form],
    ["Address", legalAddress],
    [
        "Email",
        <a key="email" href={`mailto:${LEGAL.email}`}>
            {LEGAL.email}
        </a>,
    ],
    [
        "Phone",
        <a key="phone" href={`tel:${LEGAL.phone.replace(/\s/g, "")}`}>
            {LEGAL.phone}
        </a>,
    ],
    ["Business purpose", LEGAL.purpose],
    ["Trade licence", LEGAL.tradeLicence],
    ["Trade authority", LEGAL.tradeAuthority],
    ["Member of", LEGAL.chamber],
    [
        "Applicable rules",
        <>
            Austrian Trade Regulation Act (Gewerbeordnung), available at{" "}
            <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer">
                ris.bka.gv.at
            </a>
        </>,
    ],
    ["VAT", LEGAL.vat],
];

export default function ImprintPage() {
    return (
        <LegalPage
            eyebrow="Legal"
            title="Imprint"
            intro="Information under § 5 E-Commerce Act (ECG), § 14 Commercial Code (UGB) and § 25 Media Act (MedienG)."
        >
            <dl className="overflow-hidden rounded-[20px] border border-rule bg-white">
                {rows.map(([label, value]) => (
                    <div
                        key={label}
                        className="grid gap-1 border-b border-line px-5 py-3.5 last:border-b-0 sm:grid-cols-[180px_1fr] sm:gap-4 sm:px-6"
                    >
                        <dt className="text-sm font-semibold text-ink">{label}</dt>
                        <dd className="text-sm text-ink-soft">{value}</dd>
                    </div>
                ))}
            </dl>

            <h2>Media owner and publisher</h2>
            <p>
                {LEGAL.name}, {legalAddress}. This website presents the services, projects and free tools of {LEGAL.tradingAs}.
            </p>

            <h2>Content of this website</h2>
            <p>
                I write the content of this website with care, but I can’t guarantee that everything is complete, correct and up to date at
                all times. Nothing on this website is a binding offer. A project starts only with an offer we both agree on.
            </p>

            <h2>Links to other websites</h2>
            <p>
                This website links to other websites. I have no control over their content and am not responsible for it. When I set a link,
                I found nothing unlawful on the linked page. If I learn that a linked page breaks the law, I remove the link.
            </p>

            <h2>Copyright</h2>
            <p>
                Texts, images, graphics and code on this website are protected by copyright. Please ask before you copy or use them, unless
                the law allows it. The free tools may be used for any personal or business purpose.
            </p>

            <h2>Disputes with consumers</h2>
            <p>I am not obliged and not willing to take part in dispute settlement procedures before a consumer arbitration board.</p>
        </LegalPage>
    );
}
