import type { Metadata } from "next";
import ProductGrid from "./_components/product-grid";
import ToolPageShell from "@/app/_components/tool-page-shell";
import { webAppSchema } from "@/app/_lib/schema";

const DESCRIPTION =
    "Build a responsive product grid or carousel for Shopify blog posts - add products, pick columns and a button, preview it, then copy clean HTML. Free, no sign-up.";

export const metadata: Metadata = {
    title: "Product Grid Generator for Shopify Blog Posts",
    description: DESCRIPTION,
    alternates: { canonical: "https://nicojuhari.com/tools/product-grid-generator" },
};

const tips = [
    {
        label: "Add",
        title: "Use links from your store",
        text: "Copy the image address and product link from your store. Shop paths like /products/mug work too and keep readers on your site.",
    },
    {
        label: "Design",
        title: "Grid or carousel",
        text: "A grid suits 3–8 products. A carousel keeps longer lists compact - readers swipe through them on phones.",
    },
    {
        label: "Paste",
        title: "Works in any blog editor",
        text: "The code is plain HTML and CSS - no scripts or apps. Paste it into the HTML view of a Shopify post or any page builder.",
    },
];

export default function ProductGridPage() {
    return (
        <ToolPageShell
            currentSlug="product-grid-generator"
            title="Product Grid Generator"
            description="Build a product grid for your blog - add products, choose the look, and copy clean HTML."
            perks={["Free", "No sign-up", "No scripts in the code"]}
            schema={webAppSchema("Product Grid Generator", DESCRIPTION, "product-grid-generator")}
            tips={tips}
            bare
        >
            <ProductGrid />
        </ToolPageShell>
    );
}
