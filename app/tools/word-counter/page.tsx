import type { Metadata } from "next"
import WordCounter from "./_components/word-counter"

export const metadata: Metadata = {
  title: "Word Counter Tool | Free and Online",
  description: "Use Word Counter Tool Online and quickly count words, characters, and reading time from any text. Fast, simple, and FREE.",
}

export default function WordCounterPage() {
  return (
    <div className="section px-6">
      <h1 className="text-3xl font-bold mb-2">Word Counter Tool</h1>
      <p className="text-muted-foreground mb-8">Quickly count words, characters, and reading-time estimates in your text.</p>
      <WordCounter />
    </div>
  )
}
