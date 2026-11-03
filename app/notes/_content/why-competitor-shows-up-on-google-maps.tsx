import Link from "next/link";
import type { Note } from "./types";

// Ranking factors: Google's own help page (relevance, distance, prominence). Painter example is illustrative, not a client case.
export const whyCompetitorOnGoogleMaps: Note = {
    slug: "why-competitor-shows-up-on-google-maps",
    title: "Why is your competitor on Google Maps and you're not?",
    description:
        "On the map, Google mostly looks at your Business Profile, not your website: what you picked as your category, your reviews, and how close you are.",
    date: "2026-11-03",
    tag: "business",
    draft: false,
    body: (
        <>
            <p>Your website is new. It&apos;s fast, and it looks good.</p>
            <p>But when someone nearby searches &quot;painter near me&quot;, the map shows three other businesses. Not yours.</p>
            <p>It&apos;s one of the most common questions small business owners have. And the answer is often not on the website.</p>
            <p>
                <strong>On the map, Google mostly looks at your Google Business Profile.</strong>
            </p>

            <h2>What Google looks at</h2>
            <p>Google says it uses three things to pick local results.</p>
            <ul>
                <li>
                    <strong>Relevance.</strong> Does your profile match what the person searched?
                </li>
                <li>
                    <strong>Distance.</strong> How close are you to them?
                </li>
                <li>
                    <strong>Prominence.</strong> How well known are you? Reviews, ratings, other sites that mention you.
                </li>
            </ul>
            <p>Your website helps with the last one. But the profile is what sits on the map.</p>

            <h2>The setting most people pick too fast</h2>
            <p>When you create a profile, Google asks for a primary category. Most people pick something close enough and move on.</p>
            <p>But that one choice tells Google which searches you belong in.</p>
            <p>
                For example, a painter who picks &quot;Contractor&quot; tells Google &quot;I do many things&quot;. A painter who picks
                &quot;Painter&quot; tells Google exactly what they do.
            </p>
            <p>You can add more categories later. The first one still counts the most.</p>

            <h2>Worth a look in your profile</h2>
            <ul>
                <li>The primary category is your main service, in plain words.</li>
                <li>New reviews keep coming, and each one has a short reply.</li>
                <li>Real photos of your work, not only the logo.</li>
                <li>Opening hours are right, holidays included.</li>
                <li>Name and phone number are the same as on your website.</li>
            </ul>
            <p>None of this needs a new website. Sometimes ten minutes in the profile matter more than a new design.</p>
            <p>
                And when the website is the missing part, that&apos;s what I build:{" "}
                <Link href="/services/local-business-websites">websites for local businesses</Link>.
            </p>

            <h2>Source</h2>
            <ul>
                <li>
                    <a href="https://support.google.com/business/answer/7091">Google: Tips to improve your local ranking</a>
                </li>
            </ul>
        </>
    ),
};
