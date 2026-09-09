import Link from "next/link"
import { ArrowUpRight, ArrowRightLeft, MessageSquare, MessagesSquare, TerminalSquare, Activity, Braces } from "lucide-react"
import { GitHubStatsInline } from "@/components/github-stats"
import { ProjectCategoryIcon } from "@/components/project-category-icon"
import { ProjectStatusBadge } from "@/components/project-status"
import { formatMonthYear } from "@/lib/format"
import { CATEGORY_LABELS, type GitHubRepository, type Project } from "@/types/project"

export function ProjectCard({ project, repo }: { project: Project; repo: GitHubRepository | null }) {
  return (
    <Link href={`/projects/${project.slug}`} className="project-card" data-category={project.category}>
      <div className="card-visual" aria-hidden="true">
        {project.category === "web-extension" ? (
          <div className="card-illustration transfer-illustration"><span className="visual-node"><MessageSquare /></span><ArrowRightLeft className="visual-connector" /><span className="visual-node"><MessagesSquare /></span></div>
        ) : project.category === "web-app" ? (
          <div className="card-illustration tools-illustration"><span className="visual-node"><TerminalSquare /></span><Activity className="visual-connector" /><span className="visual-node"><Braces /></span></div>
        ) : <div className="card-illustration"><span className="visual-node"><ProjectCategoryIcon category={project.category} /></span></div>}
        <span className="visual-category">{CATEGORY_LABELS[project.category]}</span>
      </div>
      <div className="card-content">
      <div className="card-meta">
        <span className="sr-only">{CATEGORY_LABELS[project.category]}</span>
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
      </div>
    </Link>
  )
}
