export type ProjectCategory =
  | "web-app"
  | "web-extension"
  | "cli"
  | "library"
  | "automation"
  | "experiment"

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  "web-app": "Web Apps",
  "web-extension": "Web Extensions",
  cli: "CLI",
  library: "Libraries",
  automation: "Automation",
  experiment: "Experiments",
}

export type ProjectStatus =
  | "idea"
  | "building"
  | "shipped"
  | "paused"
  | "abandoned"
  | "archived"

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  idea: "Idea",
  building: "Building",
  shipped: "Shipped",
  paused: "Paused",
  abandoned: "Abandoned",
  archived: "Archived",
}

export interface ProjectLog {
  date: string
  title?: string
  content: string
}

export interface Project {
  slug: string

  name: string
  tagline: string

  category: ProjectCategory
  status: ProjectStatus

  tags: string[]

  repo?: string
  demoUrl?: string

  createdAt: string
  updatedAt?: string

  featured?: boolean

  summary?: string
  motivation?: string

  learnings?: string[]

  logs?: ProjectLog[]
}

export interface GitHubRepository {
  name: string
  fullName: string

  description: string | null

  url: string
  homepage: string | null

  stars: number
  forks: number

  language: string | null

  topics: string[]

  pushedAt: string

  archived: boolean
}
