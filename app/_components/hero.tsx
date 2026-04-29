import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const WHATSAPP_URL = "https://wa.me/YOUR_NUMBER"

export default function Hero() {
  const yearsOfExperience = new Date().getFullYear() - 2019 + 1

  return (
    <section className="section container-sm text-center">
      <p className="text-muted-foreground mb-6">👋 Hello, I am Nick</p>
      <div className="flex justify-center mb-6">
        <Image
          src="/nick-profile-photo.webp"
          alt="Nick profile photo"
          width={96}
          height={96}
          priority
          className="rounded-full object-cover border-4 border-white shadow-md"
        />
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
        Software Engineer
      </h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
        I architect and build modern web apps, from business websites to complex custom platforms.
      </p>
      <div className="flex justify-center gap-3 mb-14 flex-wrap">
        <Button
          className="h-11 px-6 text-base"
          render={<a href={WHATSAPP_URL} target="_blank" rel="nofollow noopener" />}
        >
          💬 WhatsApp
        </Button>
        <Button
          variant="outline"
          className="h-11 px-6 text-base"
          render={<Link href="/#contact" />}
        >
          Contact Me
        </Button>
      </div>
      <div className="inline-flex items-center gap-3 border rounded-xl px-8 py-4 bg-white shadow-sm">
        <span className="text-2xl font-bold">{yearsOfExperience}+</span>
        <span className="text-muted-foreground font-medium">years of experience</span>
      </div>
    </section>
  )
}
