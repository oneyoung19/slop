import type { ProjectLog } from "@/types/project"
import { formatFullDate } from "@/lib/format"

export function ProjectLogList({ logs }: { logs: ProjectLog[] }) {
  const sorted = [...logs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <ol className="build-log flex flex-col gap-5">
      {sorted.map((log, i) => (
        <li key={`${log.date}-${i}`} className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <time dateTime={log.date} className="font-mono text-xs">
              {formatFullDate(log.date)}
            </time>
            {log.title && (
              <span className="text-sm font-medium">
                {log.title}
              </span>
            )}
          </div>
          <p className="text-sm">{log.content}</p>
        </li>
      ))}
    </ol>
  )
}
