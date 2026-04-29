import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Demo Projects",
  description: "Restaurant Website Examples — from simple to complex designs. Created with Next.js, React, and Tailwind CSS.",
}

const DEMOS = [
  {
    href: "/demos/restaurants/gud",
    title: "GUD Restaurant",
    imgUrl: "https://nicojuhari.b-cdn.net/demos/thumbnails/gud-restaurant.webp",
  },
  {
    href: "/demos/restaurants/lusin",
    title: "Lusin Restaurant",
    imgUrl: "https://nicojuhari.b-cdn.net/demos/thumbnails/lusin.jpeg",
  },
  {
    href: "/demos/restaurants/bella-cucina",
    title: "Bella Cucina Restaurant",
    imgUrl: "https://nicojuhari.b-cdn.net/demos/thumbnails/bella-cucina.jpeg",
  },
]

export default function DemosPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center py-10">
          <h1 className="text-4xl font-bold">Demo Projects</h1>
          <p className="text-xl text-gray-600 mt-2">Not real websites, but businesses are real.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {DEMOS.map((demo) => (
            <Link
              key={demo.href}
              href={demo.href}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <img src={demo.imgUrl} alt={demo.title} className="w-full aspect-video object-cover" />
              <div className="text-lg p-5 font-bold">{demo.title}</div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            ← Back to nicojuhari.com
          </Link>
        </div>
      </div>
    </main>
  )
}
