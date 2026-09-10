import { Star } from "lucide-react"
import type { GitHubRepository } from "@/types/project"
import { formatRelativeTime } from "@/lib/format"

export function GitHubStatsInline({ repo }: { repo: GitHubRepository }) {
  return (
    <div className="repo-inline flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
      {repo.language && <span>{repo.language}</span>}
      <span className="inline-flex items-center gap-1" aria-label={`${repo.stars} stars`}><Star size={14} aria-hidden="true" />{repo.stars}</span>
      <span>Updated {formatRelativeTime(repo.pushedAt)}</span>
    </div>
  )
}

export function GitHubStatsPanel({ repo }: { repo: GitHubRepository }) {
  return (
    <dl className="repo-stats grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-sm sm:grid-cols-4">
      {repo.language && (
        <div>
          <dt className="text-xs">Language</dt>
          <dd className="mt-0.5">{repo.language}</dd>
        </div>
      )}
      <div>
        <dt className="text-xs">Stars</dt>
        <dd className="mt-0.5 inline-flex items-center gap-1"><Star size={15} aria-hidden="true" />{repo.stars}</dd>
      </div>
      <div>
        <dt className="text-xs">Forks</dt>
        <dd className="mt-0.5">{repo.forks}</dd>
      </div>
      <div>
        <dt className="text-xs">Last pushed</dt>
        <dd className="mt-0.5">
          {formatRelativeTime(repo.pushedAt)}
        </dd>
      </div>
      {repo.archived && (
        <div>
          <dt className="text-xs">State</dt>
          <dd className="mt-0.5">Archived</dd>
        </div>
      )}
    </dl>
  )
}
