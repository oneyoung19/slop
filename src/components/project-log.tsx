import type { ProjectLog } from "@/types/project"
import { formatFullDate } from "@/lib/format"

export function ProjectLogList({ logs }: { logs: ProjectLog[] }) {
  const sorted = [...logs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <ol className="flex flex-col gap-5">
      {sorted.map((log, i) => (
        <li key={`${log.date}-${i}`} className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <time dateTime={log.date} className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
              {formatFullDate(log.date)}
            </time>
            {log.title && (
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {log.title}
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{log.content}</p>
        </li>
      ))}
    </ol>
  )
}
