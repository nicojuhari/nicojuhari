import type { Metadata } from "next";
import ProductGrid from "./_components/product-grid";

export const metadata: Metadata = {
    title: "Product Grid Generator for Shopify Blogs",
    description:
        "Build beautiful product grids for your Shopify blog fast and free. Add images, titles, and descriptions to increase clicks and sales.",
};

export default function ProductGridPage() {
    return (
        <div className="section px-6 max-w-3xl">
            <h1 className="text-3xl font-bold mb-2">Product Grid Generator</h1>
            <h2 className="text-lg text-muted-foreground mb-8 font-normal">Build responsive product grids for your blog — add images, links, and prices, get clean HTML instantly.</h2>
            <ProductGrid />
            <div className="mt-12 space-y-3 text-sm text-muted-foreground">
                <p>Create simple, elegant product grids for your Shopify blog in seconds - no coding required.</p>
                <p>
                    Paste product titles, image URLs, links, prices, and descriptions, and the tool outputs responsive HTML/CSS you can drop
                    straight into a post.
                </p>
                <p>Styles are scoped so the grid won't break your theme, and layouts are mobile-friendly to boost engagement on phones.</p>
                <p>Better visuals keep readers scrolling and drive more clicks to product pages, improving conversion rates.</p>
                <p>Free to use with instant output.</p>
            </div>
        </div>
    );
}
