"use client"

import { useState, useMemo } from "react"
import { PlusIcon, TrashIcon, CopyIcon, CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type Product = { title: string; image: string; url: string; price: string; description: string }

const EMPTY: Product = { title: "", image: "", url: "", price: "", description: "" }

const DEFAULT_PRODUCTS: Product[] = [
  { title: "Product Title", image: "https://nicojuhari.b-cdn.net/tools/grid/product-1.webp", url: "#", price: "$19.99", description: "Product description, some text" },
  { title: "Product Title", image: "https://nicojuhari.b-cdn.net/tools/grid/product-2.webp", url: "#", price: "$29.99", description: "" },
  { title: "Product Title", image: "https://nicojuhari.b-cdn.net/tools/grid/product-3.webp", url: "#", price: "$39.99", description: "" },
  { title: "Product Title", image: "https://nicojuhari.b-cdn.net/tools/grid/product-4.webp", url: "#", price: "$49.99", description: "" },
]

const COMMON_STYLES = `
.nc-row{padding:.5rem 0;gap:1.5rem}
.nc-row-item{border-radius:6px;background-color:#fff;box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);overflow:hidden}
.nc-row-item__url{text-decoration:none;color:inherit}
.nc-row-item__content{padding:1rem;display:flex;flex-direction:column;gap:.5rem}
.nc-row-item__img{width:100%;object-fit:cover;object-position:center;aspect-ratio:1/1}
.nc-row-item__title{font-size:1.2rem;font-weight:600}
.nc-row-item__price{font-size:1rem;margin-top:auto}
.nc-row-item__desc{font-size:.75rem;opacity:.8;display:-webkit-box;overflow:hidden;-webkit-line-clamp:1;-webkit-box-orient:vertical}
`

const GRID_STYLES: Record<1 | 2, string> = {
  1: `.nc-row{display:grid;grid-template-columns:1fr 1fr}`,
  2: `.nc-row{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;padding-left:.25rem;padding-right:.25rem}.nc-row-item{width:18rem;scroll-snap-align:center;flex-shrink:0}`,
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS)
  const [design, setDesign] = useState<1 | 2>(2)
  const [form, setForm] = useState<Product>(EMPTY)
  const [showForm, setShowForm] = useState(false)
  const [copied, setCopied] = useState(false)

  const html = useMemo(() => {
    if (!products.length) return ""
    const items = products.map((p) => `
  <div class="nc-row-item">
    <a href="${p.url}" class="nc-row-item__url" title="${p.title}">
      <img src="${p.image}" class="nc-row-item__img" alt="${p.title}" loading="lazy">
      <div class="nc-row-item__content">
        <div class="nc-row-item__title">${p.title}</div>
        ${p.description ? `<p class="nc-row-item__desc">${p.description}</p>` : ""}
        ${p.price ? `<p class="nc-row-item__price">${p.price}</p>` : ""}
      </div>
    </a>
  </div>`).join("")
    return `<div class="nc-row">${items}\n</div>\n<style>${COMMON_STYLES}${GRID_STYLES[design]}</style>`
  }, [products, design])

  const addProduct = () => {
    if (!form.title || !form.image || !form.url) {
      alert("Title, Image URL, and Product URL are required.")
      return
    }
    setProducts((prev) => [...prev, { ...form }])
    setForm(EMPTY)
    setShowForm(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant={design === 1 ? "default" : "outline"} size="icon" onClick={() => setDesign(1)} title="Grid layout">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M8.5 11H5.563a2.5 2.5 0 0 1-2.5-2.5V5.564a2.5 2.5 0 0 1 2.5-2.5H8.5a2.5 2.5 0 0 1 2.5 2.5V8.5A2.5 2.5 0 0 1 8.5 11m9.936 0H15.5A2.5 2.5 0 0 1 13 8.5V5.564a2.5 2.5 0 0 1 2.5-2.5h2.934a2.5 2.5 0 0 1 2.5 2.5V8.5a2.5 2.5 0 0 1-2.498 2.5M8.5 20.937H5.564a2.5 2.5 0 0 1-2.5-2.5V15.5a2.5 2.5 0 0 1 2.5-2.5H8.5a2.5 2.5 0 0 1 2.5 2.5v2.936a2.5 2.5 0 0 1-2.5 2.5m9.936 0H15.5a2.5 2.5 0 0 1-2.5-2.5V15.5a2.5 2.5 0 0 1 2.5-2.5h2.934a2.5 2.5 0 0 1 2.5 2.5v2.936a2.5 2.5 0 0 1-2.498 2.5"/></svg>
          </Button>
          <Button variant={design === 2 ? "default" : "outline"} size="icon" onClick={() => setDesign(2)} title="Carousel layout">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M18.436 20.937H15.5a2.5 2.5 0 0 1-2.5-2.5V5.565a2.5 2.5 0 0 1 2.5-2.5h2.933a2.5 2.5 0 0 1 2.5 2.5v12.872a2.5 2.5 0 0 1-2.497 2.5M8.5 20.937H5.564a2.5 2.5 0 0 1-2.5-2.5V5.565a2.5 2.5 0 0 1 2.5-2.5H8.5a2.5 2.5 0 0 1 2.5 2.5v12.872a2.5 2.5 0 0 1-2.5 2.5"/></svg>
          </Button>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-1.5">
          <PlusIcon className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="border rounded-xl p-4 bg-white space-y-4">
          <p className="font-medium">New Product</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Title *</Label>
              <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Price</Label>
              <Input value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} placeholder="$19.99" />
            </div>
            <div className="space-y-1.5">
              <Label>Image URL *</Label>
              <Input value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="https://" />
            </div>
            <div className="space-y-1.5">
              <Label>Product URL *</Label>
              <Input value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} placeholder="https://" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="min-h-[60px] resize-none text-sm" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => { setShowForm(false); setForm(EMPTY) }}>Cancel</Button>
            <Button onClick={addProduct}>Add</Button>
          </div>
        </div>
      )}

      {/* Live preview */}
      {html ? (
        <>
          <div className="border rounded-xl overflow-hidden bg-white p-2">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
          <div className="flex justify-between">
            <Button variant="ghost" className="text-destructive hover:text-destructive gap-1.5" onClick={() => setProducts([])}>
              <TrashIcon className="w-4 h-4" /> Clear all
            </Button>
            <Button variant="outline" onClick={copy} className="gap-1.5">
              {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Code"}
            </Button>
          </div>
        </>
      ) : (
        <p className="text-muted-foreground text-sm text-center py-8 border rounded-xl">No products added yet.</p>
      )}
    </div>
  )
}
