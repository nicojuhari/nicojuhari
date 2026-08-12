import type { Metadata } from "next";
import ProductGrid from "./_components/product-grid";
import ToolPageShell from "@/app/_components/tool-page-shell";
import { webAppSchema } from "@/app/_lib/schema";

export const metadata: Metadata = {
    title: "Product Grid Generator for Shopify Blog Posts",
    description:
        "Build responsive product grids for Shopify blog posts - add titles, images, prices, and links, then copy the ready-to-use HTML. Free, no sign-up.",
    alternates: { canonical: "https://nicojuhari.com/tools/product-grid-generator" },
};

export default function ProductGridPage() {
    return (
        <ToolPageShell
            currentSlug="product-grid-generator"
            title="Product Grid Generator"
            description="Build responsive product grids for your blog - add images, links, and prices, get clean HTML instantly."
            schema={webAppSchema(
                "Product Grid Generator",
                "Build responsive product grids for Shopify blog posts - add titles, images, prices, and links, then copy the ready-to-use HTML. Free, no sign-up.",
                "product-grid-generator"
            )}
            notes={
                <>
                    <p>Create simple, elegant product grids for your Shopify blog in seconds - no coding required.</p>
                    <p>
                        Paste product titles, image URLs, links, prices, and descriptions, and the tool outputs responsive
                        HTML/CSS you can drop straight into a post.
                    </p>
                    <p>Free to use with instant output.</p>
                </>
            }
        >
            <ProductGrid />
        </ToolPageShell>
    );
}
