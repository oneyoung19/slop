import type { Metadata } from "next"
import { Suspense } from "react"
import { Hammer, PackageCheck } from "lucide-react"

import { ProjectFilters } from "@/components/project-filters"
import { ProjectGrid } from "@/components/project-grid"
import { getProjects, getProjectStats } from "@/lib/projects"
import type { ProjectCategory, ProjectStatus } from "@/types/project"

export const metadata: Metadata = {
  title: "Slop — OneYoung's Project Lab",
  description:
    "Things I build, break, and occasionally ship. A collection of personal software projects, tools and experiments.",
  alternates: { canonical: "/" },
}

interface HomeProps {
  searchParams: Promise<{ category?: string; status?: string }>
}

export default async function Home({ searchParams }: HomeProps) {
  const { category, status } = await searchParams
  const stats = getProjectStats()

  const projects = getProjects().filter((project) => {
    if (category && project.category !== (category as ProjectCategory)) return false
    if (status && project.status !== (status as ProjectStatus)) return false
    return true
  })

  const categories = [...new Set(getProjects().map((project) => project.category))]

  return (
    <div className="site-shell home-page">
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">Build. Break.<br /><span>Sometimes ship.</span></h1>
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
          <ProjectFilters categories={categories} />
        </Suspense>
        <div aria-live="polite" aria-atomic="true" className="sr-only">{projects.length} projects found</div>
        <ProjectGrid projects={projects} />
      </section>
    </div>
  )
}
