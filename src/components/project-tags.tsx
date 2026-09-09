export function ProjectTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null

  return (
    <ul className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-xs text-neutral-500 dark:text-neutral-400">
      {tags.map((tag, i) => (
        <li key={tag} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden>·</span>}
          {tag}
        </li>
      ))}
    </ul>
  )
}
