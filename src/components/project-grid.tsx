import Link from "next/link"

import { ProjectCard } from "@/components/project-card"
import { getGitHubRepository } from "@/lib/github"
import type { Project } from "@/types/project"

export async function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="empty-state"><h3>No projects here yet.</h3><p>Try another category or status to explore the lab.</p><Link href="/">Clear filters</Link></div>
    )
  }

  const repos = await Promise.all(
    projects.map((project) =>
      project.repo ? getGitHubRepository(project.repo) : Promise.resolve(null)
    )
  )

  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {projects.map((project, i) => (
        <li key={project.slug}>
          <ProjectCard project={project} repo={repos[i]} />
        </li>
      ))}
    </ul>
  )
}
