import { STATUS_LABELS, type ProjectStatus } from "@/types/project"

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="project-status" data-status={status}>
      <span aria-hidden="true" />
      {STATUS_LABELS[status]}
    </span>
  )
}
