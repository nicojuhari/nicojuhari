import Link from "next/link";
import { Stats } from "../_components/visuals";
import type { Note } from "./types";

// Numbers: handwerker-netz repo, 2026-11-12. 155 `permanent: true` entries in next.config.ts; site started 2026-02-09; 625 clicks / 3 months from the case study.
export const cheapestWebsiteCostsTheMost: Note = {
    slug: "cheapest-website-costs-the-most",
    title: "Why the cheapest website often costs the most",
    description:
        "You pay for a website once. The real cost comes each time your business changes and old links stop working.",
    date: "2026-11-12",
    tag: "business",
    draft: true,
    body: (
        <>
            <p>When people buy a website, they compare prices.</p>
            <p>But the price is paid once. The real cost comes later, each time the business changes.</p>

            <h2>A business keeps changing</h2>
            <p>Handwerker Netz is a handyman service in Vienna that I co-own. Its website went live in February 2026.</p>
            <p>Since then, we added services, removed some, and merged two kitchen pages into one.</p>
            <p>Each change moved a page to a new address.</p>

            <h2>Google still has the old address</h2>
            <p>So do people who saved the link, and other sites that link to it.</p>
            <p>Someone finds you on Google, taps the link, and sees &quot;Page not found&quot;. They go back and call the next business.</p>
            <p>Over time, Google drops that page from search.</p>
            <p>
                <strong>A broken link loses a customer who already found you.</strong>
            </p>
            <p>The fix is a redirect: a small rule that sends the old address to the new page.</p>

            <Stats
                items={[
                    { value: "155", label: "old addresses that still work" },
                    { value: "625", label: "clicks from Google in 3 months" },
                ]}
            />

            <h2>Where cheap gets expensive</h2>
            <p>When a site is hard to change, it often gets replaced instead. A new site usually means new addresses.</p>
            <p>Then you pay twice: once for the new site, and again in visitors lost while Google catches up.</p>

            <h2>Worth asking before you pay</h2>
            <ul>
                <li>Can I add or remove a page myself?</li>
                <li>When a page moves, who sets up the redirect?</li>
                <li>If I leave, do I keep the site and its addresses?</li>
            </ul>
            <p>
                When I build <Link href="/services/local-business-websites">websites for local businesses</Link>, these are part of the
                plan from day one.
            </p>
        </>
    ),
};
