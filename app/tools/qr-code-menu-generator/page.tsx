import type { Metadata } from "next"
import QrGenerator from "./_components/qr-generator"

export const metadata: Metadata = {
  title: "QR Code Menu Generator | Free Online Tool",
  description: "Easily create a free QR code menu for your restaurant's website. No sign-up required! Download high-quality QR code images in seconds.",
}

export default function QrGeneratorPage() {
  return (
    <div className="section px-6">
      <h1 className="text-3xl font-bold mb-2">QR Code Menu Generator</h1>
      <p className="text-muted-foreground mb-8">Create printable QR menus in seconds — simply enter your website URL below.</p>
      <QrGenerator />
    </div>
  )
}
