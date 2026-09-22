import type { Metadata } from "next"
import { Suspense } from "react"
import { Hammer, PackageCheck } from "lucide-react"

import { GitHubContributions } from "@/components/github-contributions"
import { ProjectWorkbench } from "@/components/project-workbench"
import { getGitHubRepository } from "@/lib/github"
import { getProjects, getProjectStats } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Projects — Slop",
  description: "Explore the workbench: personal projects, tools, experiments, and GitHub activity.",
  alternates: { canonical: "/projects" },
}

export default async function ProjectsPage() {
  const stats = getProjectStats()
  const projects = getProjects()
  const categories = [...new Set(projects.map((project) => project.category))]
  const repos = await Promise.all(
    projects.map((project) => (project.repo ? getGitHubRepository(project.repo) : Promise.resolve(null)))
  )

  return (
    <div className="site-shell projects-page">
      <section id="workbench" className="project-collection" aria-labelledby="projects-title">
        <div className="section-heading">
          <h1 id="projects-title">The workbench <span aria-label={`${stats.total} projects`}>{stats.total}</span></h1>
          <dl className="lab-stats">
            <div><dt><Hammer size={16} aria-hidden="true" />Building</dt><dd>{stats.building}</dd></div>
            <div><dt><PackageCheck size={16} aria-hidden="true" />Shipped</dt><dd>{stats.shipped}</dd></div>
          </dl>
        </div>
        <Suspense fallback={<div className="filter-placeholder" />}>
          <ProjectWorkbench projects={projects} repos={repos} categories={categories} />
        </Suspense>
      </section>
      <GitHubContributions />
    </div>
  )
}
