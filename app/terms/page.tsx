import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/app/_components/legal-page";
import { LEGAL } from "@/app/_data/legal";
import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata({
    title: "Terms and Conditions | Nicojuhari",
    description: "The terms for working with Nicojuhari: offers, payment in stages, ownership, liability, monthly plans and the free tools.",
    path: "/terms",
});

export default function TermsPage() {
    return (
        <LegalPage
            eyebrow="Legal"
            title="Terms and conditions"
            intro={`These terms apply to all work ${LEGAL.name} (${LEGAL.tradingAs}) does for clients: websites, Shopify stores, web apps, checks and monthly plans. They also cover the free tools on this website.`}
        >
            <h2>1. What these terms cover</h2>
            <p>
                These terms apply to every offer and every project, unless we agree something different in writing. Email or
                WhatsApp counts as writing. If your own terms say something different, mine apply unless I accept yours in writing.
            </p>

            <h2>2. Offers and agreement</h2>
            <p>
                Before any paid work, you get an offer with the scope, the stages, the timeline and the price. The project starts
                when you accept the offer in writing. Free checks, such as the free first look or the free Google check, are not a
                contract and don’t oblige you to anything.
            </p>

            <h2>3. Scope and changes</h2>
            <p>
                I do the work described in the offer. If you want more or something different, I tell you what it changes in time
                and price, and do it once you agree. Small adjustments within the agreed scope are included.
            </p>

            <h2>4. What I need from you</h2>
            <p>
                Access to the accounts and tools the work needs (for example Shopify, Google Ads, hosting or your domain), your
                content and timely feedback. If something I need arrives late, the timeline moves by the same time. You confirm
                that you have the rights to the texts, images and logos you give me.
            </p>

            <h2>5. Prices and payment</h2>
            <ul>
                <li>Every project has a fixed price, agreed before I start. No hourly billing unless we agree on it.</li>
                <li>The work is split into stages. I send an invoice after each stage is done. You pay within 14 days.</li>
                <li>Monthly plans are invoiced at the end of each month.</li>
                <li>Prices are in euros. {LEGAL.vat}, so invoices show no VAT.</li>
                <li>
                    Costs of third-party services, such as Shopify plans, apps, themes, hosting, domains, ad budgets or email
                    tools, are paid by you directly, unless the offer says otherwise.
                </li>
                <li>
                    If we agree that part of the fee is a share of results (for example a share of extra sales), the details are in
                    a separate written agreement.
                </li>
            </ul>
            <p>If an invoice is not paid on time, I may pause the work until it is paid. Statutory default interest applies.</p>

            <h2>6. Checking each stage</h2>
            <p>
                After each stage, you check the work and tell me within 7 days if something is missing or doesn’t work as agreed.
                I fix it at no extra cost. A stage counts as accepted when you use it live or don’t report a problem within 7 days.
            </p>

            <h2>7. Results</h2>
            <p>
                I work to bring you more clients, sales or time, and I measure the results with you. But sales, rankings and ad
                results also depend on things I don’t control, such as your market, prices, products, competitors, Google and ad
                platforms. So I can’t guarantee a specific number.
            </p>

            <h2>8. Ownership</h2>
            <p>
                Once a stage is paid, you own what I made in it: the website, theme changes, code, texts and designs, with
                unlimited rights to use and change them. Your accounts, domain and customer data are always yours. I may reuse
                general know-how, my own code libraries and open-source parts. I may show the finished work in my portfolio, unless
                you tell me not to.
            </p>

            <h2>9. Third-party services</h2>
            <p>
                Many projects use services from other companies, such as Shopify, Google, Klaviyo, Stripe, hosting providers or
                AI tools. Their terms and prices apply. I am not responsible for their outages, price changes or changes to how they
                work, but I help you adapt when they change.
            </p>

            <h2>10. Monthly plans</h2>
            <p>
                Monthly plans run month to month. You can end a plan at the end of any month by telling me at least 14 days before.
                So can I. Work that is already done in that month is invoiced.
            </p>

            <h2>11. Confidentiality and data</h2>
            <p>
                I keep your business information and logins confidential, during and after the project. When I process your
                customers’ personal data, I do it only on your instructions, and we sign a data processing agreement where the law
                requires one. More in the <Link href="/privacy">privacy policy</Link>.
            </p>

            <h2>12. Liability</h2>
            <p>
                I fix defects in my work as described in section 6. Beyond that, I am liable for damage only if I caused it
                intentionally or through gross negligence. This limit does not apply to personal injury. For business clients, I am
                not liable for lost profit, lost data that wasn’t backed up, or indirect damage, and my liability is limited to the
                fee of the project or stage concerned.
            </p>
            <p>
                If you are a consumer, the mandatory rules of the Austrian Consumer Protection Act (KSchG) and the Distance and
                Off-Premises Contracts Act (FAGG), including your right of withdrawal, apply and are not limited by these terms.
            </p>

            <h2>13. Free tools</h2>
            <p>
                The free tools on this website are offered as they are, without a guarantee that they are error-free or always
                available. Check the results before you rely on them, for example before you pay a split bill or print a QR code.
            </p>

            <h2>14. Law and court</h2>
            <p>
                Austrian law applies, without its conflict-of-law rules and without the UN Convention on Contracts for the
                International Sale of Goods. For business clients, the courts in Vienna have jurisdiction. Consumers keep the
                jurisdiction the law gives them.
            </p>

            <h2>15. Other</h2>
            <p>
                If one part of these terms is invalid, the rest still applies. The invalid part is replaced by a valid rule that
                comes closest to what was meant.
            </p>
            <p>
                Questions about these terms: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>.
            </p>
        </LegalPage>
    );
}
