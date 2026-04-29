import Link from "next/link"

const projects = [
  {
    href: "/playground/rain-of-emojis",
    emoji: "🎉",
    title: "Rain of Emojis",
    description: "Emojis raining down the screen",
  },
  {
    href: "/playground/magic-wand",
    emoji: "✨",
    title: "Magic Wand Sparkles",
    description: "Click anywhere for sparkles",
  },
]

export default function PlaygroundPreview() {
  return (
    <section className="section container-sm">
      <h2 className="text-3xl font-bold text-center mb-10">Playground</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Link
            key={project.href}
            href={project.href}
            className="flex items-center gap-4 border rounded-xl p-5 bg-white hover:shadow-md hover:border-foreground/20 transition-all"
          >
            <span className="text-3xl shrink-0">{project.emoji}</span>
            <div>
              <p className="font-semibold">{project.title}</p>
              <p className="text-muted-foreground text-sm">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
