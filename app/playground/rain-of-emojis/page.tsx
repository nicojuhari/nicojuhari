import type { Metadata } from "next"
import EmojiRainCanvas from "./_components/emoji-rain-canvas"

export const metadata: Metadata = {
  title: "Rain of Emojis",
  description: "A fun playground that creates a rain of emojis using JavaScript, React, and CSS animations.",
}

export default function RainOfEmojisPage() {
  return <EmojiRainCanvas />
}
