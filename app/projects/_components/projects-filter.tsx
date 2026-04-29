"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/app/_data/projects"

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col border rounded-xl overflow-hidden bg-white hover:shadow-md hover:border-foreground/20 transition-all"
    >
      <div className="relative aspect-video bg-muted overflow-hidden">
        {project.images[0] ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <span className="text-4xl font-bold text-muted-foreground/20 select-none">
              {project.title[0]}
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h2 className="font-semibold text-base">{project.title}</h2>
          <span className="text-sm text-muted-foreground shrink-0">{project.year}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default function ProjectsFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All")

  const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.stack))).sort()]
  const filtered = active === "All" ? projects : projects.filter((p) => p.stack.includes(active))

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              active === tag
                ? "bg-foreground text-background border-foreground"
                : "bg-white text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-16">No projects match this filter.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
