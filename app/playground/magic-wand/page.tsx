import type { Metadata } from "next"
import MagicWandCanvas from "./_components/magic-wand-canvas"

export const metadata: Metadata = {
  title: "Magic Wand Sparkles",
  description: "A fun playground that creates magic wand sparkles using JavaScript and CSS animations.",
}

export default function MagicWandPage() {
  return <MagicWandCanvas />
}
