import { projects } from "@/data/projects"
import type { Project, ProjectCategory, ProjectStatus } from "@/types/project"

const STATUS_RELEVANCE: Record<ProjectStatus, number> = {
  building: 0,
  idea: 1,
  shipped: 2,
  paused: 3,
  abandoned: 4,
  archived: 5,
}

function projectTimestamp(project: Project): number {
  const date = project.updatedAt ?? project.createdAt
  return new Date(date).getTime()
}

export function getProjects(): Project[] {
  return [...projects].sort((a, b) => {
    const featuredDiff = Number(b.featured ?? false) - Number(a.featured ?? false)
    if (featuredDiff !== 0) return featuredDiff

    const statusDiff = STATUS_RELEVANCE[a.status] - STATUS_RELEVANCE[b.status]
    if (statusDiff !== 0) return statusDiff

    return projectTimestamp(b) - projectTimestamp(a)
  })
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return getProjects().filter((project) => project.category === category)
}

export function getProjectsByStatus(status: ProjectStatus): Project[] {
  return getProjects().filter((project) => project.status === status)
}

export interface ProjectStats {
  total: number
  shipped: number
  building: number
  abandoned: number
}

export function getProjectStats(): ProjectStats {
  return {
    total: projects.length,
    shipped: projects.filter((p) => p.status === "shipped").length,
    building: projects.filter((p) => p.status === "building").length,
    abandoned: projects.filter((p) => p.status === "abandoned").length,
  }
}
