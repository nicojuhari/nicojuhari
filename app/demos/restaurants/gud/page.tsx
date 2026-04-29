import type { Metadata } from "next"
import Link from "next/link"
import gudMenu from "./menu.json"

export const metadata: Metadata = {
  title: "GUD Restaurant — Restaurant Website Example",
  description: "Restaurant Website Example — GUD, modern and clean design. Created with Next.js, React, and Tailwind CSS.",
}

type MenuProduct = {
  uid: string
  name: string
  description: string
  imageUrl: string
  categoryId: string
  options: { size: string; price: string; salePrice: string }[]
}

type MenuCategory = { uid: string; name: string; description?: string }

function groupMenu(categories: MenuCategory[], products: MenuProduct[]) {
  return categories.map((cat) => ({
    ...cat,
    products: products.filter((p) => p.categoryId === cat.uid),
  }))
}

const categories = gudMenu.categories as MenuCategory[]
const products = gudMenu.products as MenuProduct[]
const grouped = groupMenu(categories, products)

export default function GudPage() {
  return (
    <div className="bg-slate-50 font-sans">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-10">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16 text-white">
          <div className="font-bold text-2xl tracking-wide">GUD</div>
          <div className="flex items-center gap-4">
            <a href="#our-menu" className="bg-[#c08133] text-white px-4 py-2 rounded-full text-sm">
              Menu
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-screen">
        <div className="flex relative w-full h-full">
          <img
            src="https://nicojuhari.b-cdn.net/demos/2/gut-restaurant-hero-bg.jpg"
            alt="GUD Restaurant"
            className="w-full md:w-1/2 h-full ml-auto object-cover"
          />
          <div className="absolute inset-0 gud-gradient" />
        </div>
        <div className="absolute inset-0">
          <div className="max-w-5xl mx-auto px-4 text-white h-full flex">
            <div className="mt-auto mb-10 md:my-auto flex-shrink-0 w-full">
              <h1 className="text-3xl md:text-6xl">
                <span className="text-8xl md:text-[10rem] font-bold leading-none">GUD</span>
                <br />
                by Alexandru Comerzan
              </h1>
              <div className="my-8 md:text-2xl text-xl text-[#c08133]">Restaurant | Bar | Terrace</div>
              <a
                href="tel:+37369454994"
                className="inline-flex items-center border border-white/50 rounded-full h-12 pr-6 gap-3 text-base md:text-xl hover:border-white transition-colors"
              >
                <div className="bg-white/20 h-12 w-12 inline-flex items-center justify-center rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z" />
                  </svg>
                </div>
                <span>069 454 994</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Photo grid row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 bg-white">
        <img src="https://1food-menu-demos-2.b-cdn.net/gud/gud-grid-3.png" alt="" className="w-full object-cover" />
        <div className="flex px-6 min-h-[320px]">
          <div className="m-auto flex flex-col items-center gap-5 text-xl text-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#c08133]" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                </svg>
              ))}
            </div>
            <blockquote className="font-bold italic">"Cel mai gustos burger din lume"</blockquote>
            <cite className="not-italic text-gray-500">— Lucia</cite>
          </div>
        </div>
        <img src="https://1food-menu-demos-2.b-cdn.net/gud/gud-grid-2.png" alt="" className="w-full object-cover" />
      </div>

      {/* Photo grid row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 bg-white">
        <div className="flex px-6 min-h-[320px]">
          <div className="m-auto flex flex-col items-center gap-4 text-xl text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#c08133]" viewBox="0 0 24 24">
              <path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
            <div className="font-bold">Luni - Duminică</div>
            <div className="text-gray-600">11:00 – 23:00</div>
          </div>
        </div>
        <img src="https://1food-menu-demos-2.b-cdn.net/gud/gud-grid-1.png" alt="" className="w-full object-cover" />
        <div className="flex px-6 min-h-[320px]">
          <div className="m-auto flex flex-col items-center gap-4 text-xl text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#c08133]" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5" />
            </svg>
            <div className="font-bold">Strada Mihail Sadoveanu 19</div>
            <div className="text-gray-600">Chișinău, Moldova</div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <section id="our-menu" className="bg-slate-50">
        {/* Category nav */}
        <div className="sticky top-0 bg-white border-b z-10 overflow-x-auto">
          <div className="max-w-5xl mx-auto px-4 flex gap-1 py-2">
            {grouped.map((cat) => (
              <a
                key={cat.uid}
                href={`#cat-${cat.uid}`}
                className="px-3 py-1.5 rounded-full text-sm whitespace-nowrap hover:bg-[#c08133]/10 hover:text-[#c08133] transition-colors"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
          {grouped.map((cat) => (
            <div key={cat.uid} id={`cat-${cat.uid}`}>
              <h2 className="text-2xl font-bold mb-1">{cat.name}</h2>
              {cat.description && <p className="text-gray-600 text-sm mb-4">{cat.description}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-2">
                {cat.products.map((product) => (
                  <div
                    key={product.uid}
                    className="flex flex-col items-center gap-4 rounded-lg bg-white border border-gray-200 p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-100 shrink-0">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">🍽️</div>
                      )}
                    </div>
                    <div className="flex flex-col w-full flex-1 text-center">
                      <p className="font-semibold line-clamp-2 text-sm">{product.name}</p>
                      {product.description && (
                        <p className="text-gray-500 text-xs mt-1 line-clamp-2">{product.description}</p>
                      )}
                      {product.options?.[0] && (
                        <div className="mt-auto pt-3 flex justify-between items-center text-sm">
                          <span className="text-gray-400">{product.options[0].size}</span>
                          <span className="text-[#c08133] font-medium">
                            {product.options[0].salePrice || product.options[0].price} lei
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-6 flex gap-6 items-center flex-col md:flex-row md:justify-between text-sm">
          <div><span className="font-bold">GUD</span> Restaurant</div>
          <div className="text-gray-500">
            Created with ♥ by{" "}
            <Link href="/" className="font-bold text-gray-700 hover:text-black">
              Nick
            </Link>
          </div>
        </div>
      </footer>

      <style>{`
        .gud-gradient {
          background: linear-gradient(0deg, rgba(14,12,6,1) 0%, rgba(14,12,6,1) 25%, rgba(14,12,6,0) 65%);
        }
        @media (min-width: 768px) {
          .gud-gradient {
            background: linear-gradient(90deg, rgba(14,12,6,1) 0%, rgba(14,12,6,1) 50%, rgba(14,12,6,0) 75%);
          }
        }
      `}</style>
    </div>
  )
}
