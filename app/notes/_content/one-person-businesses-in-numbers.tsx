import Link from "next/link";
import { BarChart, Stats } from "../_components/visuals";
import type { Note } from "./types";

// Sources checked 2026-11-02: WKO EPU Zahlen (Datenstand 12/2025), Eurostat learning hub (2024),
// US Census nonemployer release Nov 2025 (2023 data), ILO 2021 summary + ILO "Small Matters" (2019).
export const onePersonBusinessesInNumbers: Note = {
    slug: "one-person-businesses-in-numbers",
    title: "Most businesses in Austria have no employees at all",
    description:
        "In Austria, 6 in 10 businesses have no employees: about 376,000 in 2025. Around the world, about 1.5 billion people work for themselves.",
    date: "2026-11-02",
    tag: "business",
    draft: false,
    body: (
        <>
            <p>When we think of &quot;a business&quot;, we picture an office and a team.</p>
            <p>But in Austria, 6 in 10 businesses are just one person.</p>
            <p>
                About <strong>376,000 people</strong> ran a one-person business (EPU) in 2025. That&apos;s 62% of all businesses in the
                country, and 3.9% more than a year before.
            </p>

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
            <p>Consulting and IT is the second largest group. Developers, designers, consultants, each working alone.</p>

            <h2>Around the world</h2>
            <Stats
                items={[
                    { value: "26M", label: "self-employed in the EU, 2024" },
                    { value: "30.4M", label: "US businesses with no employees, 2023" },
                    { value: "~46%", label: "of all workers worldwide work for themselves" },
                ]}
            />
            <p>In the US, businesses with no employees sold $1.8 trillion in 2023.</p>
            <p>Worldwide, about 1.5 billion people work for themselves (ILO, 2021). Together with micro and small companies, small units hold about 70% of all jobs.</p>

            <h2>Most software is made for teams</h2>
            <p>Roles, settings, and someone whose job is to set it all up.</p>
            <p>But one person is the sales team, the bookkeeper and the support desk at the same time. Nobody has time to set up a big system.</p>
            <p>
                <strong>For one person, the best tool isn&apos;t the one with the most features. It&apos;s the one where the boring steps happen on their own.</strong>
            </p>
            <p>An invoice that books the income when it&apos;s paid. A form that sends the reply. A report that is ready when the tax advisor asks.</p>
            <p>
                That&apos;s what I try to build, in{" "}
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
