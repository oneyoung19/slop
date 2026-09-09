import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { GitHubStatsInline } from "@/components/github-stats"
import { ProjectCategoryIcon } from "@/components/project-category-icon"
import { ProjectStatusBadge } from "@/components/project-status"
import { formatMonthYear } from "@/lib/format"
import { CATEGORY_LABELS, type GitHubRepository, type Project } from "@/types/project"

export function ProjectCard({ project, repo }: { project: Project; repo: GitHubRepository | null }) {
  return (
    <Link href={`/projects/${project.slug}`} className="project-card">
      <div className="card-meta">
        <span className="card-category"><ProjectCategoryIcon category={project.category} />{CATEGORY_LABELS[project.category]}</span>
        <ProjectStatusBadge status={project.status} />
      </div>
      <div className="card-description">
        <h3>{project.name}</h3>
        <p>{project.tagline}</p>
      </div>
      {repo && <GitHubStatsInline repo={repo} />}
      <div className="card-footer">
        <time dateTime={project.createdAt} title="Project started">{formatMonthYear(project.createdAt)}</time>
        <span className="card-action" aria-hidden="true"><ArrowUpRight size={23} strokeWidth={1.7} /></span>
      </div>
    </Link>
  )
}
