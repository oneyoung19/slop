import type { Metadata } from "next"
import { Suspense } from "react"
import { Hammer, PackageCheck } from "lucide-react"

import { HeroParticles } from "@/components/hero-particles"
import { GitHubContributions } from "@/components/github-contributions"
import { ProjectWorkbench } from "@/components/project-workbench"
import { getGitHubRepository } from "@/lib/github"
import { getProjects, getProjectStats } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Slop — OneYoung's Project Lab",
  description:
    "Things I build, break, and occasionally ship. A collection of personal software projects, tools and experiments.",
  alternates: { canonical: "/" },
}

export default async function Home() {
  const stats = getProjectStats()
  const projects = getProjects()
  const categories = [...new Set(projects.map((project) => project.category))]
  const repos = await Promise.all(
    projects.map((project) => (project.repo ? getGitHubRepository(project.repo) : Promise.resolve(null)))
  )

  return (
    <div className="site-shell home-page">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy"><h1 id="hero-title">Small ideas.<br /><span>Real things.</span></h1><p>Tools and experiments, built out of curiosity.</p></div>
        <HeroParticles />
      </section>
      <section className="project-collection" aria-labelledby="projects-title">
        <div className="section-heading">
          <h2 id="projects-title">The workbench <span aria-label={`${stats.total} projects`}>{stats.total}</span></h2>
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
