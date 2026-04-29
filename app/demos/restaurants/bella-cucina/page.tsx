import type { Metadata } from "next"
import Link from "next/link"
import bellaCucinaMenu from "./menu.json"

export const metadata: Metadata = {
  title: "Bella Cucina Restaurant — Restaurant Website Example",
  description: "Restaurant Website Example — Bella Cucina, where taste comes alive. Created with Next.js and React.",
}

type MenuProduct = {
  uid: string
  name: string
  description: string
  imageUrl?: string
  categoryId: string
  tags?: string[]
  options: { size?: string; price?: string; salePrice?: string }[]
}

type MenuCategory = { uid: string; name: string; description?: string }

const categories = bellaCucinaMenu.categories as MenuCategory[]
const products = bellaCucinaMenu.products as MenuProduct[]

const grouped = categories.map((cat) => ({
  ...cat,
  products: products.filter((p) => p.categoryId === cat.uid),
}))

export default function BellaCucinaPage() {
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Header / Hero info */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src="https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="h-64 object-cover w-full rounded-lg"
            alt="Bella Cucina Restaurant"
          />
          <div className="flex flex-col py-2">
            <h1 className="text-3xl font-bold">Bella Cucina Restaurant</h1>
            <p className="text-gray-500 text-lg mt-1">Where Taste Comes Alive</p>
            <div className="flex flex-col gap-2 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-blue-500 font-bold">Open</span>
                <span>·</span>
                <span className="text-gray-600">Closes at 22:00</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span>Cash & Card</span>
                <span>·</span>
                <span>City, 1st Street, nr. 34</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                </svg>
                <span className="font-medium">4.9</span>
                <span className="text-gray-500">Very Good</span>
              </div>
            </div>
            <div className="mt-auto pt-6 flex items-center gap-4 flex-wrap">
              <a
                href="#menu"
                className="bg-black text-white px-5 py-2 rounded-lg hover:bg-black/80 transition-colors text-sm font-medium"
              >
                Order Now
              </a>
              <span className="text-sm text-gray-500">Delivery in 30 – 50 mins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <div id="menu" className="sticky top-0 bg-white border-b z-10 overflow-x-auto">
        <div className="max-w-5xl mx-auto px-4 flex gap-1 py-2">
          {categories.map((cat) => (
            <a
              key={cat.uid}
              href={`#cat-${cat.uid}`}
              className="px-3 py-1.5 rounded-full text-sm whitespace-nowrap hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {grouped.map((cat) => (
          <div key={cat.uid} id={`cat-${cat.uid}`}>
            <h2 className="text-2xl font-semibold mb-2">{cat.name}</h2>
            {cat.description && <p className="text-gray-500 text-sm mb-4">{cat.description}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.products.map((product) => (
                <div
                  key={product.uid}
                  className="flex gap-4 rounded-lg bg-white border p-4 shadow-sm hover:shadow-md transition-shadow h-40"
                >
                  <div className="flex-1 min-w-0 flex flex-col">
                    <p className="font-medium text-sm">{product.name}</p>
                    {product.description && (
                      <p className="text-gray-500 text-xs mt-1 line-clamp-2">{product.description}</p>
                    )}
                    {product.tags && product.tags.length > 0 && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {product.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-auto flex items-center gap-2">
                      {product.options?.[0]?.salePrice && (
                        <span className="text-blue-700 font-semibold text-sm">
                          ${product.options[0].salePrice}
                        </span>
                      )}
                      {product.options?.[0]?.price && (
                        <span
                          className={`text-sm font-semibold ${product.options[0].salePrice ? "text-red-500 line-through" : "text-blue-600"}`}
                        >
                          ${product.options[0].price}
                        </span>
                      )}
                      {product.options?.[0]?.size && (
                        <span className="text-xs text-gray-400">/ {product.options[0].size}</span>
                      )}
                    </div>
                  </div>
                  {product.imageUrl && (
                    <div className="w-24 h-full rounded-lg overflow-hidden border border-gray-100 shrink-0">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white mt-10">
        <div className="max-w-5xl mx-auto px-4 py-6 flex gap-6 items-center flex-col md:flex-row md:justify-between text-sm">
          <div className="font-bold">Bella Cucina</div>
          <div className="text-gray-500">
            Created with ♥ by{" "}
            <Link href="/" className="font-bold text-gray-700 hover:text-black">
              Nick
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
