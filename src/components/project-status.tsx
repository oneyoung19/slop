import { STATUS_LABELS, type ProjectStatus } from "@/types/project"

const STATUS_DOT_CLASS: Record<ProjectStatus, string> = {
  idea: "bg-neutral-400 dark:bg-neutral-500",
  building: "bg-blue-500",
  shipped: "bg-emerald-500",
  paused: "bg-amber-500",
  abandoned: "bg-rose-500/70",
  archived: "bg-neutral-400 dark:bg-neutral-600",
}

const STATUS_TEXT_CLASS: Record<ProjectStatus, string> = {
  idea: "text-neutral-500 dark:text-neutral-400",
  building: "text-blue-600 dark:text-blue-400",
  shipped: "text-emerald-600 dark:text-emerald-400",
  paused: "text-amber-600 dark:text-amber-400",
  abandoned: "text-rose-600/80 dark:text-rose-400/80",
  archived: "text-neutral-500 dark:text-neutral-400",
}

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`project-status inline-flex items-center gap-1.5 text-xs ${STATUS_TEXT_CLASS[status]}`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT_CLASS[status]}`}
      />
      {STATUS_LABELS[status]}
    </span>
  )
}
