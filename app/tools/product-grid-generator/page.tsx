import type { Metadata } from "next"
import ProductGrid from "./_components/product-grid"

export const metadata: Metadata = {
  title: "Product Grid Generator for Shopify Blogs",
  description: "Build beautiful product grids for your Shopify blog fast and free. Add images, titles, and descriptions to increase clicks and sales.",
}

export default function ProductGridPage() {
  return (
    <div className="section px-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Product Grid Generator</h1>
      <p className="text-muted-foreground mb-8">Increase conversions with attractive product grids on your blog.</p>
      <ProductGrid />
    </div>
  )
}
