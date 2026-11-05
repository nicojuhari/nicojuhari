import Link from "next/link";
import { Stats } from "../_components/visuals";
import type { Note } from "./types";

// Reply times: Nick's own (Handwerker Netz, 2026-11). 15 services: handwerker-netz content/services. Study: HBR 2011 (Oldroyd, McElheran, Elkington).
export const firstReplyGetsTheJob: Note = {
    slug: "first-reply-gets-the-job",
    title: "Why the first business to reply often gets the job",
    description:
        "People often message two or three businesses at once. The first one to reply often gets the job, before anyone compares prices.",
    date: "2026-11-05",
    tag: "business",
    draft: false,
    body: (
        <>
            <p>Someone needs a TV mounted on the wall. They find three businesses on Google and send each one a message.</p>
            <p>One answers in ten minutes. The other two answer tomorrow.</p>
            <p>By then, the job is already booked.</p>
            <p>
                <strong>Many jobs are not lost on price. They are lost on time.</strong>
            </p>

            <h2>What I see at Handwerker Netz</h2>
            <p>Handwerker Netz is a handyman service in Vienna that I co-own. It offers 15 small jobs, like IKEA assembly or TV mounting.</p>
            <p>Requests come in on WhatsApp or by email. I reply within an hour. Sometimes within five minutes.</p>

            <Stats
                items={[
                    { value: "5 min", label: "fastest reply" },
                    { value: "< 1 hour", label: "usual reply time" },
                    { value: "7×", label: "better chance to reach the customer in the first hour (study)" },
                ]}
            />

            <p>A fast reply doesn&apos;t need the full answer. A short &quot;Got it, I&apos;ll send you a price today&quot; is enough.</p>
            <p>The person knows someone is there.</p>

            <h2>The part nobody sees</h2>
            <p>A website can bring the request. But it can&apos;t answer it.</p>
            <p>The problem is often not the page. It&apos;s what happens after someone sends a message.</p>
            <p>Maybe the inbox is checked once a day. Maybe the form sends to an old email. Maybe the phone is on silent during work.</p>

            <h2>Worth a look</h2>
            <ul>
                <li>Where does a new request land? On your phone, or in an inbox you open at night?</li>
                <li>Send yourself a test request. How long until you notice it?</li>
                <li>Does the person get an automatic reply, so they know the message arrived?</li>
            </ul>
            <p>
                When I build <Link href="/services/local-business-websites">websites for local businesses</Link>, every request goes
                straight to the owner&apos;s phone.
            </p>

            <h2>Source</h2>
            <ul>
                <li>
                    <a href="https://scholarsarchive.byu.edu/facpub/9711">
                        Oldroyd, McElheran, Elkington: The Short Life of Online Sales Leads (Harvard Business Review, 2011)
                    </a>
                </li>
            </ul>
        </>
    ),
};
