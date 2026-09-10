import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { ArrowDown, ArrowUpRight, Hammer, PackageCheck } from "lucide-react"

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
        <div className="hero-copy">
          <div className="hero-kicker"><span aria-hidden="true" /> OneYoung’s independent project lab</div>
          <h1 id="hero-title">Small ideas.<br /><span>Real things.</span></h1>
          <p>Tools and experiments, built out of curiosity.<br />A little workbench on the internet.</p>
          <div className="hero-actions">
            <a className="hero-primary" href="#workbench">Explore the projects <ArrowDown size={16} aria-hidden="true" /></a>
            <Link className="hero-secondary" href="/about">Meet the maker <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      <section id="workbench" className="project-collection" aria-labelledby="projects-title">
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
