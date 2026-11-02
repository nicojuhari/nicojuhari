import Link from "next/link";
import { BarChart, Stats } from "../_components/visuals";
import type { Note } from "./types";

// Sources checked 2026-11-02: WKO EPU Zahlen (Datenstand 12/2025), Eurostat learning hub (2024),
// US Census nonemployer release Nov 2025 (2023 data), ILO 2021 summary + ILO "Small Matters" (2019).
export const onePersonBusinessesInNumbers: Note = {
    slug: "one-person-businesses-in-numbers",
    title: "How many people run a business alone? Austria and the world",
    description:
        "In Austria, 6 in 10 businesses are one person: about 376,000 in 2025. Around the world, about 1.5 billion people work for themselves.",
    date: "2026-11-02",
    tag: "business",
    draft: false,
    body: (
        <>
            <p>
                In Austria, about <strong>376,000 people</strong> ran a one-person business (EPU) in 2025. That is{" "}
                <strong>62% of all businesses</strong> in the country, and 3.9% more than a year before. Around the world, about 1.5
                billion people work for themselves.
            </p>
            <p>I looked these numbers up because I build for this group. I didn&apos;t expect it to be the biggest one.</p>

            <Stats
                items={[
                    { value: "376,000", label: "EPU in Austria, 2025" },
                    { value: "62%", label: "of all Austrian businesses" },
                    { value: "52%", label: "run by women" },
                ]}
            />

            <h2>What they do in Austria</h2>
            <BarChart
                caption="Largest EPU groups in Austria, 2025 (WKO)."
                data={[
                    { label: "Personal advice and care", value: 65900 },
                    { label: "Consulting and IT", value: 40400, highlight: true },
                    { label: "Personal services", value: 29000 },
                ]}
            />
            <p>
                Consulting and IT is the second largest group. Many of them are developers, designers and consultants like me, working
                alone.
            </p>

            <h2>Around the world</h2>
            <Stats
                items={[
                    { value: "26M", label: "self-employed in the EU, 2024" },
                    { value: "30.4M", label: "US businesses with no employees, 2023" },
                    { value: "~46%", label: "of all workers worldwide work for themselves" },
                ]}
            />
            <p>
                In the US, businesses with no employees made $1.8 trillion in sales in 2023. Worldwide, the ILO counts about 1.5 billion
                self-employed people in 2021. Counted together with micro and small companies, small units hold about 70% of all jobs.
            </p>

            <h2>What this means for software</h2>
            <p>
                One person is the sales team, the bookkeeper and the support desk at the same time. There is nobody to set up a big
                system or keep it running. So the software has to work on day one: one place, each number typed once, nothing to
                configure.
            </p>
            <p>
                AI and automations help most here. A small business doesn&apos;t need more tools. It needs the boring steps between them to
                happen on their own: an invoice that books the income when it&apos;s paid, a form that sends the reply, a report that
                is ready when the tax advisor asks. That is what I try to build, in{" "}
                <a href="https://epufix.at/?utm_source=nicojuhari&utm_campaign=one-person-businesses-in-numbers">EPUfix</a> and for{" "}
                <Link href="/services">clients</Link>.
            </p>

            <h2>Sources</h2>
            <ul>
                <li>
                    <a href="https://www.wko.at/epu/zahlen-daten-fakten">WKO: EPU Zahlen, Daten, Fakten</a> (2025, German)
                </li>
                <li>
                    <a href="https://ec.europa.eu/eurostat/web/european-statistics-learning-hub/statistics-for-beginners/labour-market-employment">
                        Eurostat: Labour market, employment
                    </a>{" "}
                    (2024, ages 20-64)
                </li>
                <li>
                    <a href="https://www.census.gov/newsroom/press-releases/2025/business-owner-characteristics.html">
                        US Census Bureau: nonemployer businesses
                    </a>{" "}
                    (2023 data)
                </li>
                <li>
                    <a href="https://www.ilo.org/publications/small-matters-global-evidence-contribution-employment-self-employed-micro-0">
                        ILO: Small Matters
                    </a>{" "}
                    and{" "}
                    <a href="https://data.worldbank.org/indicator/SL.EMP.SELF.ZS">World Bank: self-employed, % of employment</a>
                </li>
            </ul>
        </>
    ),
};
