"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { ProjectCard } from "@/components/project-card"
import { ProjectFilters } from "@/components/project-filters"
import type { GitHubRepository, Project, ProjectCategory, ProjectStatus } from "@/types/project"

interface ProjectWorkbenchProps {
  projects: Project[]
  repos: (GitHubRepository | null)[]
  categories: ProjectCategory[]
}

export function ProjectWorkbench({ projects, repos, categories }: ProjectWorkbenchProps) {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const status = searchParams.get("status")

  const filtered = projects
    .map((project, i) => ({ project, repo: repos[i] }))
    .filter(({ project }) => {
      if (category && project.category !== (category as ProjectCategory)) return false
      if (status && project.status !== (status as ProjectStatus)) return false
      return true
    })

  return (
    <>
      <ProjectFilters categories={categories} />
      <div aria-live="polite" aria-atomic="true" className="sr-only">{filtered.length} projects found</div>
      {filtered.length === 0 ? (
        <div className="empty-state">
          <h3>No projects here yet.</h3>
          <p>Try another category or status to explore the lab.</p>
          <Link href="/">Clear filters</Link>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filtered.map(({ project, repo }) => (
            <li key={project.slug}>
              <ProjectCard project={project} repo={repo} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
