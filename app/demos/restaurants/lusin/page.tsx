import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Lusin Restaurant — Restaurant Website Example",
  description: "Restaurant Website Example — Lusin, Armenian cuisine in Saudi Arabia. Created with Next.js and React.",
}

type MenuItem = {
  uid: string
  name: string
  description: string
  imageUrl: string
  options: { size?: string; price?: string; salePrice?: string }[]
}

type MenuCategory = { uid: string; name: string }

type MenuData = {
  menu: {
    categories: MenuCategory[]
    products: MenuItem[]
  }
}

async function getMenu(): Promise<MenuData | null> {
  try {
    const res = await fetch("https://api.1food.menu/v1/menus/677972a80011654b9076", {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data
  } catch {
    return null
  }
}

function groupByCategory(categories: MenuCategory[], products: MenuItem[]) {
  return categories.map((cat) => ({
    ...cat,
    products: products.filter((p: MenuItem & { categoryId?: string }) => p.categoryId === cat.uid),
  }))
}

export default async function LusinPage() {
  const menuData = await getMenu()
  const grouped =
    menuData?.menu?.categories && menuData?.menu?.products
      ? groupByCategory(menuData.menu.categories, menuData.menu.products)
      : []

  return (
    <div className="font-sans">
      {/* Hero */}
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://lusinrestaurant.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-25-at-4.57.20-PM-2.jpeg"
            alt="Lusin Restaurant"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,.8), rgba(0,0,0,.3))" }} />
        </div>

        {/* Nav */}
        <div className="relative z-10 h-14 text-white">
          <div className="max-w-5xl mx-auto px-4 flex items-center justify-between py-3">
            <img
              src="https://nicojuhari.b-cdn.net/demos/lusin/lusin-logo.png"
              alt="Lusin Restaurant"
              className="h-8 w-auto object-contain"
            />
            <a
              href="#menu"
              className="bg-white text-black hover:bg-white/90 rounded-full px-6 py-1.5 text-sm font-medium transition-colors"
            >
              Menu
            </a>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center text-center pt-32 pb-56 px-4">
          <img
            src="https://nicojuhari.b-cdn.net/demos/lusin/lusin-logo-animation.gif"
            alt="Lusin Restaurant"
            className="h-52 w-auto object-contain"
          />
          <h1 className="text-2xl text-white font-thin uppercase tracking-widest mt-4">Lusin Saudi Arabia</h1>
          <div className="flex gap-4 mt-8 flex-wrap justify-center">
            <a
              href="#menu"
              className="bg-[#d10f8b] text-white hover:bg-[#d10f8b]/80 rounded-full px-8 py-3 font-medium transition-colors"
            >
              View Menu
            </a>
            <a
              href="#reservation"
              className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-3 font-medium transition-colors"
            >
              Reserve a Table
            </a>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div id="menu" className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl text-[#d10f8b] font-thin uppercase text-center tracking-widest mb-10">Menu</h2>
          {grouped.length > 0 ? (
            <div className="space-y-10">
              {grouped.map((cat) => (
                <div key={cat.uid}>
                  <h3 className="text-xl font-semibold mb-4 border-b pb-2">{cat.name}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {cat.products.map((p) => (
                      <div key={p.uid} className="bg-white rounded-lg border p-4 flex gap-3">
                        {p.imageUrl && (
                          <img src={p.imageUrl} alt={p.name} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{p.name}</p>
                          {p.description && <p className="text-gray-500 text-xs mt-1 line-clamp-2">{p.description}</p>}
                          {p.options?.[0]?.price && (
                            <p className="text-[#d10f8b] font-semibold text-sm mt-2">
                              ${p.options[0].salePrice || p.options[0].price}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">Menu temporarily unavailable.</p>
          )}
        </div>
      </div>

      {/* About */}
      <div id="about" className="max-w-5xl mx-auto px-4 py-20">
        <h2 className="text-3xl text-[#d10f8b] font-thin uppercase text-center tracking-widest mb-10">About</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://nicojuhari.b-cdn.net/demos/lusin/lusin-gallery-1.jpeg"
              alt="Lusin Restaurant"
              className="w-full h-full object-cover rounded-lg"
            />
            <img
              src="https://nicojuhari.b-cdn.net/demos/lusin/lusin-gallery-2.jpg"
              alt="Lusin Restaurant"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4 text-gray-700">
            <p>Lusin is Armenian cuisine. Lusin comes expressing "the moon" — a beautiful and delicate symbol in the Armenian culture.</p>
            <p>Lusin is a leading brand in the Kingdom of Saudi Arabia and the United Kingdom to serve Armenian foods with a modern twist.</p>
            <p>Lusin serves its guests enticing Armenian specialties renowned for their distinctive aromas and flavorful preparations.</p>
          </div>
        </div>
      </div>

      {/* Contact & Hours */}
      <div id="reservation" className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold uppercase mb-4">Operating Hours</h3>
              <p className="text-[#d10f8b]">Monday – Sunday</p>
              <p className="text-gray-600">12:00 PM – 01:00 AM</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold uppercase mb-4">Contacts</h3>
              <div className="space-y-2 text-sm">
                <a href="tel:+966115200161" className="flex items-center gap-2 text-gray-600 hover:text-[#d10f8b] transition-colors">
                  <span>+966 11 520 0161</span>
                </a>
                <a href="mailto:lusinrestaurant@mira-foods.com" className="flex items-center gap-2 text-gray-600 hover:text-[#d10f8b] transition-colors">
                  <span>lusinrestaurant@mira-foods.com</span>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold uppercase mb-4">Our Locations</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-[#d10f8b]">Lusin Diyafa</p>
                  <p className="text-gray-600">Diyafa Plaza, Northern Ring Branch Road, Riyadh</p>
                </div>
                <div>
                  <p className="font-semibold text-[#d10f8b]">Lusin Centria</p>
                  <p className="text-gray-600">Centria Mall Olaya Street, Riyadh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center bg-gray-100">
        <div className="py-6 px-4">
          <p className="text-sm text-gray-500">
            © 2025 Lusin Restaurant. All rights reserved. · Demo by{" "}
            <Link href="/" className="font-bold text-gray-700 hover:text-black">
              Nick
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
