import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projects } from "@/app/_data/projects"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <div className="section container-page max-w-4xl">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Projects
      </Link>

      {/* Hero image */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-8">
        {project.images[0] ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <span className="text-7xl font-bold text-muted-foreground/20 select-none">
              {project.title[0]}
            </span>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">{project.title}</h1>
          <p className="text-muted-foreground">{project.year}</p>
        </div>
        {project.url && (
          <Button
            render={<a href={project.url} target="_blank" rel="noopener noreferrer" />}
          >
            <ExternalLinkIcon className="w-4 h-4" />
            Live site
          </Button>
        )}
      </div>

      {/* Stack badges */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.stack.map((tech) => (
          <Badge key={tech} variant="secondary">
            {tech}
          </Badge>
        ))}
      </div>

      {/* Description */}
      <div className="prose prose-neutral max-w-none mb-10">
        <p className="text-base leading-relaxed text-foreground/80">{project.longDescription}</p>
      </div>

      {/* Additional screenshots */}
      {project.images.length > 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.images.slice(1).map((src, i) => (
            <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-muted">
              <Image
                src={src}
                alt={`${project.title} screenshot ${i + 2}`}
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
