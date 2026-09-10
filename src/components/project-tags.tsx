export function ProjectTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null

  return (
    <ul className="project-tags">
      {tags.map((tag) => (
        <li key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  )
}
