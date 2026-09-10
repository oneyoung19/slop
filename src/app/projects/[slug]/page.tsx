import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { SiGithub } from "@icons-pack/react-simple-icons"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { GitHubStatsPanel } from "@/components/github-stats"
import { ProjectLogList } from "@/components/project-log"
import { ProjectStatusBadge } from "@/components/project-status"
import { ProjectTags } from "@/components/project-tags"
import { ProjectCategoryIcon } from "@/components/project-category-icon"
import { formatMonthYear } from "@/lib/format"
import { getGitHubRepository } from "@/lib/github"
import { getProjectBySlug, getProjects } from "@/lib/projects"
import { CATEGORY_LABELS } from "@/types/project"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) return {}

  return {
    title: `${project.name} — Slop`,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — Slop`,
      description: project.tagline,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  const repo = project.repo ? await getGitHubRepository(project.repo) : null

  return (
    <div className="reading-page flex flex-1 flex-col gap-10">
      <div>
        <Link
          href="/"
          className="back-link"
        >
          <ArrowLeft size={17} aria-hidden="true" /> All projects
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-medium tracking-tight">
          {project.name}
        </h1>

        <div className="project-details-meta">
          <ProjectStatusBadge status={project.status} />
          <span className="project-type" title={CATEGORY_LABELS[project.category]}><ProjectCategoryIcon category={project.category} /><span className="sr-only">{CATEGORY_LABELS[project.category]}</span></span>
          <span>Started {formatMonthYear(project.createdAt)}</span>
        </div>

        <p>{project.tagline}</p>

        <ProjectTags tags={project.tags} />

        {(project.repo || project.demoUrl) && (
          <div className="project-actions">
            {repo && (
              <a
                href={repo.url}
                aria-label={`${project.name} on GitHub`}
                title="GitHub"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border px-3 py-1.5"
              >
                <SiGithub size={20} aria-hidden="true" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border px-3 py-1.5"
              >
                <ExternalLink size={17} aria-hidden="true" /> Live Demo
              </a>
            )}
          </div>
        )}
      </div>

      {project.summary && (
        <section className="flex flex-col gap-2 border-t pt-8">
          <h2 className="text-sm font-medium">About</h2>
          <p className="text-sm leading-relaxed">
            {project.summary}
          </p>
        </section>
      )}

      {project.motivation && (
        <section className="flex flex-col gap-2 border-t pt-8">
          <h2 className="text-sm font-medium">Why</h2>
          <p className="text-sm leading-relaxed">
            {project.motivation}
          </p>
        </section>
      )}

      {project.learnings && project.learnings.length > 0 && (
        <section className="flex flex-col gap-2 border-t pt-8">
          <h2 className="text-sm font-medium">
            What I Learned
          </h2>
          <ul className="flex flex-col gap-1.5 text-sm leading-relaxed">
            {project.learnings.map((learning, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden>·</span>
                <span>{learning}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.logs && project.logs.length > 0 && (
        <section className="flex flex-col gap-4 border-t pt-8">
          <h2 className="text-sm font-medium">
            Build Log
          </h2>
          <ProjectLogList logs={project.logs} />
        </section>
      )}

      {repo && (
        <section className="flex flex-col gap-3 border-t pt-8">
          <h2 className="text-sm font-medium">GitHub</h2>
          <GitHubStatsPanel repo={repo} />
        </section>
      )}
    </div>
  )
}
