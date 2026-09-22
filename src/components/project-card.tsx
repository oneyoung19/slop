import Link from "next/link"
import Image from "next/image"
import { GitHubStatsInline } from "@/components/github-stats"
import { ProjectCategoryIcon } from "@/components/project-category-icon"
import { ProjectStatusBadge } from "@/components/project-status"
import { formatMonthYear } from "@/lib/format"
import { CATEGORY_LABELS, type GitHubRepository, type Project } from "@/types/project"

const illustrations: Record<string, string> = {
  "conversation-transfer": "/images/projects/conversation-transfer.webp",
  "claude-devtools": "/images/projects/claude-devtools.webp",
}

export function ProjectCard({ project, repo }: { project: Project; repo: GitHubRepository | null }) {
  return (
    <Link href={`/projects/${project.slug}`} className="project-card" data-category={project.category}>
      {illustrations[project.slug] && <Image className="card-background" src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${illustrations[project.slug]}`} alt="" fill unoptimized sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" />}
      <div className="card-content">
      <div className="card-meta">
        <span className="card-category" title={CATEGORY_LABELS[project.category]}><ProjectCategoryIcon category={project.category} /><span className="sr-only">{CATEGORY_LABELS[project.category]}</span></span>
        <ProjectStatusBadge status={project.status} />
      </div>
      <div className="card-description">
        <h3>{project.name}</h3>
        <p>{project.tagline}</p>
      </div>
      {repo && <GitHubStatsInline repo={repo} />}
      <div className="card-footer">
        <time dateTime={project.createdAt} title="Project started">{formatMonthYear(project.createdAt)}</time>
      </div>
      </div>
    </Link>
  )
}
