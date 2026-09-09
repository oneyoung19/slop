import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { SiGithub } from "@icons-pack/react-simple-icons"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { GitHubStatsPanel } from "@/components/github-stats"
import { ProjectLogList } from "@/components/project-log"
import { ProjectStatusBadge } from "@/components/project-status"
import { ProjectTags } from "@/components/project-tags"
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
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <ArrowLeft size={17} aria-hidden="true" /> All projects
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
          {project.name}
        </h1>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-neutral-500 dark:text-neutral-400">
          <ProjectStatusBadge status={project.status} />
          <span>· {CATEGORY_LABELS[project.category]}</span>
          <span>· Started {formatMonthYear(project.createdAt)}</span>
        </div>

        <p className="text-neutral-600 dark:text-neutral-400">{project.tagline}</p>

        <ProjectTags tags={project.tags} />

        {(project.repo || project.demoUrl) && (
          <div className="mt-2 flex gap-3 text-sm">
            {repo && (
              <a
                href={repo.url}
                aria-label={`${project.name} on GitHub`}
                title="GitHub"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-neutral-200 px-3 py-1.5 text-neutral-700 hover:border-neutral-400 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600"
              >
                <SiGithub size={20} aria-hidden="true" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-neutral-200 px-3 py-1.5 text-neutral-700 hover:border-neutral-400 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600"
              >
                <ExternalLink size={17} aria-hidden="true" /> Live Demo
              </a>
            )}
          </div>
        )}
      </div>

      {project.summary && (
        <section className="flex flex-col gap-2 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <h2 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">About</h2>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {project.summary}
          </p>
        </section>
      )}

      {project.motivation && (
        <section className="flex flex-col gap-2 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <h2 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Why</h2>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {project.motivation}
          </p>
        </section>
      )}

      {project.learnings && project.learnings.length > 0 && (
        <section className="flex flex-col gap-2 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <h2 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            What I Learned
          </h2>
          <ul className="flex flex-col gap-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
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
        <section className="flex flex-col gap-4 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <h2 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Build Log
          </h2>
          <ProjectLogList logs={project.logs} />
        </section>
      )}

      {repo && (
        <section className="flex flex-col gap-3 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <h2 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">GitHub</h2>
          <GitHubStatsPanel repo={repo} />
        </section>
      )}
    </div>
  )
}
