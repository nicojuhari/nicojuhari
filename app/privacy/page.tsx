import type { Metadata } from "next";
import LegalPage from "@/app/_components/legal-page";
import { LEGAL, legalAddress } from "@/app/_data/legal";
import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata({
    title: "Privacy Policy | Nicojuhari",
    description:
        "Learn how nicojuhari.com protects your data under GDPR. Discover what personal information we collect, why, how long we keep it, and your privacy rights.",
    path: "/privacy",
});

export default function PrivacyPage() {
    return (
        <LegalPage
            eyebrow="Legal"
            title="Privacy policy"
            intro="This page explains what data this website processes, why, and what rights you have. In short: no cookies, no tracking profiles, and your data is never sold."
        >
            <h2>Who is responsible</h2>
            <p>
                The controller under the General Data Protection Regulation (GDPR) is {LEGAL.name} ({LEGAL.tradingAs}), {legalAddress}.
                Email: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>, phone: {LEGAL.phone}.
            </p>

            <h2>Hosting and server logs</h2>
            <p>
                This website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. When you open a page, the server
                records technical data: IP address, date and time, the page you opened, browser and operating system. This is needed to
                deliver the website and keep it secure. The logs are kept for a short time and then deleted.
            </p>
            <p>
                Legal basis: legitimate interest in a working, secure website (Art. 6 (1) (f) GDPR). Vercel is certified under the EU-US
                Data Privacy Framework, which covers transfers to the USA (Art. 45 GDPR).
            </p>

            <h2>Cookies</h2>
            <p>This website does not set cookies. That’s why there is no cookie banner.</p>

            <h2>Visitor statistics</h2>
            <p>
                I use Ahrefs Web Analytics (Ahrefs Pte. Ltd., Singapore) to count visits and see which pages are read. It works without
                cookies and does not store your IP address or build a profile of you. I only see totals, such as the number of visits per
                page and the country they come from.
            </p>
            <p>Legal basis: legitimate interest in knowing which pages are useful (Art. 6 (1) (f) GDPR).</p>

            <h2>Fonts</h2>
            <p>The fonts are stored on this website’s own server. Your browser does not connect to Google to load them.</p>

            <h2>Contact form</h2>
            <p>
                When you send the contact form, your name, email address and message are sent through Web3Forms (web3forms.com) to my email
                inbox, which is hosted by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. I use the data only to
                answer you and, if we work together, to prepare and carry out the project.
            </p>
            <p>
                Legal basis: steps before a contract, at your request (Art. 6 (1) (b) GDPR), or my legitimate interest in answering your
                message (Art. 6 (1) (f) GDPR).
            </p>

            <h2>WhatsApp, email and calls</h2>
            <p>
                The WhatsApp buttons open WhatsApp, a service of WhatsApp Ireland Limited (Meta). Once you send a message, WhatsApp’s own
                privacy policy applies to it. If you write by email or we talk on Google Meet, I process your contact details and what you
                tell me to answer you and to run the project.
            </p>
            <p>Legal basis: Art. 6 (1) (b) and (f) GDPR.</p>

            <h2>Free tools</h2>
            <p>
                The free tools run in your browser. What you type, upload or calculate is not sent to me. The bill split calculator saves
                your groups in your browser’s local storage so they are there next time. You can delete them at any time in the tool or in
                your browser settings.
            </p>
            <p>
                The product grid generator loads product images from the web addresses you enter. To show them, your browser connects to the
                server that hosts those images.
            </p>

            <h2>Client projects</h2>
            <p>
                When I work on your website, store or app, I may get access to your customers’ data, for example in Shopify or in Google
                Ads. I process it only on your instructions and only for the project. Where needed, we sign a data processing agreement
                (Art. 28 GDPR).
            </p>

            <h2>How long data is kept</h2>
            <ul>
                <li>Messages that don’t lead to a project: deleted when the conversation is over, at the latest after 12 months.</li>
                <li>Project emails, offers and invoices: kept for 7 years, as Austrian tax law requires (§ 132 BAO).</li>
                <li>Server logs: kept for a short time by the host, then deleted.</li>
            </ul>

            <h2>Your rights</h2>
            <p>You have the right to:</p>
            <ul>
                <li>get a copy of the data I hold about you (Art. 15 GDPR)</li>
                <li>have wrong data corrected (Art. 16)</li>
                <li>have your data deleted (Art. 17)</li>
                <li>limit how your data is used (Art. 18)</li>
                <li>get your data in a common format (Art. 20)</li>
                <li>object to processing based on legitimate interest (Art. 21)</li>
            </ul>
            <p>
                Write to <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>. If you think your data is processed unlawfully, you can also
                complain to the Austrian Data Protection Authority (Datenschutzbehörde), Barichgasse 40–42, 1030 Vienna,{" "}
                <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer">
                    dsb.gv.at
                </a>
                .
            </p>

            <h2>Changes</h2>
            <p>
                I update this page when the website changes, for example when I add a new tool or service. The date at the top shows the
                latest version.
            </p>
        </LegalPage>
    );
}
