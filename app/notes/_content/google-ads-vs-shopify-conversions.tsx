import Link from "next/link";
import { BarChart, Stats } from "../_components/visuals";
import type { Note } from "./types";

// Source: campaigns/content-plan/google-ads-conversions-but-no-sales.md (real store check, client anonymized)
export const googleAds660Conversions: Note = {
    slug: "google-ads-vs-shopify-conversions",
    title: "Why does Google Ads show more sales than your shop?",
    description:
        "Google Ads showed 660 conversions, but only 26 real orders. Learn why your ads report inflated numbers and how to fix it for accurate ROI tracking.",
    date: "2026-11-02",
    tag: "business",
    draft: false,
    body: (
        <>
            <p>The report looked great: 660 conversions.</p>
            <p>The shop had 26 orders in the same months.</p>
            <p>This was a small wine shop in Austria, with €5,519 spent on ads since December.</p>

            <Stats
                items={[
                    { value: "€5,519", label: "ad spend since December" },
                    { value: "660", label: "“conversions” in Google Ads" },
                    { value: "26", label: "real orders" },
                ]}
            />

            <BarChart
                caption="Same period, same shop. What Google Ads counted vs. what the shop sold."
                data={[
                    { label: "Google Ads conversions", value: 660 },
                    { label: "Shop orders", value: 26, highlight: true },
                ]}
            />

            <h2>What happened</h2>
            <p>Google Ads was counting page views and add-to-cart as conversions. As if everyone who looked had bought.</p>
            <p>Nobody did anything strange. The Shopify app adds these actions on its own. One setting decides which ones count.</p>

            <h2>The part nobody sees</h2>
            <p>Google Ads learns from what you call a win.</p>
            <p>
                Tell it a win is &quot;someone looked at a page&quot;, and it finds more people who look. Looking is cheap. Buying is not.
            </p>
            <p>
                <strong>A wrong number doesn&apos;t just look nice. It teaches the ads to find the wrong people.</strong>
            </p>

            <h2>Where to look</h2>
            <p>In Google Ads: Goals → Conversions → Summary. One column shows which actions count.</p>
            <p>
                For a shop, <strong>purchase</strong> should be the main one. The others can stay as secondary. You still see them, but
                Google doesn&apos;t chase them.
            </p>
            <p>
                The two numbers never match exactly. Ad blockers, a click today and an order next week. But 660 vs. 26 is not a small gap.
            </p>
            <p>
                It&apos;s one of the first things worth checking before spending more on ads. More on{" "}
                <Link href="/services/local-business-websites">websites and ad pages</Link>.
            </p>
        </>
    ),
};
