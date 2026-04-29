import Link from "next/link"
import { tools } from "@/app/_data/tools"

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <aside className="hidden md:flex flex-col w-52 shrink-0 border-r sticky top-14 self-start h-[calc(100vh-56px)] overflow-y-auto">
        <div className="p-4 pt-6">
          <Link
            href="/tools"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-4 block"
          >
            All Tools
          </Link>
          <nav className="space-y-0.5">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="block py-1.5 px-2 text-sm text-muted-foreground rounded-md hover:bg-muted hover:text-foreground transition-colors"
              >
                {tool.title}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        {/* Mobile tool picker */}
        <div className="md:hidden border-b bg-white overflow-x-auto">
          <div className="flex gap-2 p-3 min-w-max">
            <Link href="/tools" className="px-3 py-1 text-xs font-medium rounded-full border hover:bg-muted shrink-0">
              All
            </Link>
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="px-3 py-1 text-xs rounded-full border whitespace-nowrap hover:bg-muted"
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
