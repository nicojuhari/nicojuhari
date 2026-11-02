import Link from "next/link";
import { BarChart, Stats } from "../_components/visuals";
import type { Note } from "./types";

// Source: campaigns/content-plan/google-ads-conversions-but-no-sales.md (real store check, client anonymized)
export const googleAds660Conversions: Note = {
    slug: "google-ads-660-conversions-26-sales",
    title: "Google Ads showed 660 conversions. The shop had 26 sales.",
    description:
        "In one shop I checked, Google Ads counted page views and add-to-cart as conversions. So Google looked for cheap clicks, not buyers.",
    date: "2026-11-02",
    tag: "business",
    draft: false,
    body: (
        <>
            <p>
                In a small wine shop in Austria, Google Ads showed <strong>660 conversions</strong>. The shop had{" "}
                <strong>26 orders</strong> in the same time. The ads were counting page views and add-to-cart as if they were sales.
            </p>

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

            <h2>Why it matters</h2>
            <p>
                Google Ads learns from what you call a conversion. If a page view counts, Google gets very good at finding people who
                look at a page. Those clicks are cheap. They just don&apos;t buy.
            </p>
            <p>
                Google Ads is a good tool. Nobody did anything strange here either: the Shopify app adds these actions, and one setting
                decides which ones count. Here, the wrong ones did.
            </p>

            <h2>What I&apos;d check first</h2>
            <p>
                In Google Ads: Goals → Conversions → Summary. Look at the column that says which actions are included in conversions.
                For an online shop, <strong>purchase</strong> should be the main one. Page view, add to cart and begin checkout can stay,
                as secondary actions, so you still see them without Google chasing them.
            </p>
            <p>
                Google Ads and Shopify will never match exactly (ad blockers, the click and the order on different days). But 660 vs. 26
                is not a small gap. If your ad numbers look much better than your sales, it&apos;s worth a look.
            </p>
            <p>
                This kind of check is part of my work on <Link href="/services/local-business-websites">websites and ad pages</Link>.
            </p>
        </>
    ),
};
