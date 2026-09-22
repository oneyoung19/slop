"use client"

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

  function updateFilter(key: "category" | "status", value: string) {
    const url = new URL(window.location.href)
    if (value) url.searchParams.set(key, value)
    else url.searchParams.delete(key)
    window.history.pushState(null, "", url.pathname + url.search + url.hash)
  }

  function clearFilters() {
    const url = new URL(window.location.href)
    url.searchParams.delete("category")
    url.searchParams.delete("status")
    window.history.pushState(null, "", url.pathname + url.search + url.hash)
  }

  const filtered = projects
    .map((project, i) => ({ project, repo: repos[i] }))
    .filter(({ project }) => {
      if (category && project.category !== (category as ProjectCategory)) return false
      if (status && project.status !== (status as ProjectStatus)) return false
      return true
    })

  return (
    <>
      <ProjectFilters categories={categories} category={category} status={status} onFilterChange={updateFilter} />
      <div aria-live="polite" aria-atomic="true" className="sr-only">{filtered.length} projects found</div>
      {filtered.length === 0 ? (
        <div className="empty-state">
          <h3>No projects here yet.</h3>
          <p>Try another category or status to explore the lab.</p>
          <button type="button" onClick={clearFilters}>Clear filters</button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
