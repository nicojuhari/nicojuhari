import type { Metadata } from "next"
import WhitespaceRemover from "./_components/whitespace-remover"

export const metadata: Metadata = {
  title: "Whitespace Remover | Replace or Remove Spaces in Text",
  description: "Online Whitespace Remover - quickly replace or remove spaces with hyphens, underscores, slashes, or new lines. Fast, browser-based tool, and FREE.",
}

export default function WhitespaceRemoverPage() {
  return (
    <div className="section px-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Whitespace Remover</h1>
      <p className="text-muted-foreground mb-8">Replace text spaces with dashes, underscores, slashes, or new lines.</p>
      <WhitespaceRemover />
    </div>
  )
}
