import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductGrid from "./_components/product-grid";
import ToolPageShell from "@/app/_components/tool-page-shell";
import { webAppSchema } from "@/app/_lib/schema";

const DESCRIPTION =
    "Add products to a Shopify blog post without an app: build a responsive product grid or carousel, preview it, and paste the HTML into your post. Free, no sign-up.";

export const metadata: Metadata = {
    title: "Add Products to a Shopify Blog Post Without an App",
    description: DESCRIPTION,
    alternates: { canonical: "https://nicojuhari.com/tools/product-grid-generator" },
};

const steps = [
    {
        title: "Build the grid",
        text: "Add your products above - name, image link, product link and price. Pick a grid or carousel and the look you want.",
    },
    {
        title: "Copy the code",
        text: "Press “Copy code”. You get plain HTML and CSS - no scripts, nothing to install, and it works with any theme.",
    },
    {
        title: "Paste it into your post",
        text: "In Shopify, open Online Store → Blog posts, edit the post, click the “Show HTML” button (<>) and paste the code where the products should appear. Save.",
    },
];

const faq = [
    {
        question: "Can I add products to a Shopify blog post without an app?",
        answer: "Yes. Build the grid with this tool, copy the HTML, and paste it into the HTML view of the blog post editor. Nothing is installed in your store and there's no monthly fee.",
    },
    {
        question: "Where do I find the product image link and product link?",
        answer: "Open the product page in your store, right-click the main image and copy the image address. For the product link you can paste the full address or just the path, like /products/ceramic-mug.",
    },
    {
        question: "Will the product grid slow down my store?",
        answer: "No. The code is a few lines of HTML and CSS with lazy-loaded images - no scripts or apps load with it.",
    },
    {
        question: "Can I show the products as a carousel?",
        answer: "Yes. Choose “Carousel” in the design options. On phones readers swipe through the products; on desktop the grid shows 2, 3 or 4 columns.",
    },
    {
        question: "Does it update when I change a price in Shopify?",
        answer: "No - the grid is static HTML, so prices and images stay as you entered them. If a price changes, update it here and paste the new code.",
    },
];

export default function ProductGridPage() {
    return (
        <ToolPageShell
            currentSlug="product-grid-generator"
            title="Product Grid Generator"
            description="Add products to a Shopify blog post without an app - build a grid, copy the HTML, paste it in."
            perks={["Free", "No app needed", "No scripts in the code"]}
            schema={webAppSchema("Product Grid Generator", DESCRIPTION, "product-grid-generator")}
            faq={faq}
            bare
            guide={
                <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
                    <div className="flex flex-col gap-2">
                        <p className="eyebrow">How to</p>
                        <h2 className="text-2xl font-semibold tracking-[-0.025em] text-ink sm:text-[28px]">
                            How to add products to a Shopify blog post without an app
                        </h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        <ol className="grid gap-3 md:grid-cols-3">
                            {steps.map((step, i) => (
                                <li key={step.title} className="flex flex-col gap-2.5 rounded-[20px] border border-rule bg-white p-5.5">
                                    <span className="font-mono text-xs font-semibold text-teal">{String(i + 1).padStart(2, "0")}</span>
                                    <h3 className="text-base font-semibold text-ink">{step.title}</h3>
                                    <p className="text-sm leading-relaxed text-ink-muted">{step.text}</p>
                                </li>
                            ))}
                        </ol>
                        <Link
                            href="/services/shopify-stores"
                            className="group inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand transition-colors hover:text-teal"
                        >
                            Need the whole store set up properly? See Shopify Stores
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                        </Link>
                    </div>
                </section>
            }
        >
            <ProductGrid />
        </ToolPageShell>
    );
}
