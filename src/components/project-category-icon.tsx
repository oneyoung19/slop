import { Blocks, FlaskConical, Smartphone, Puzzle, Terminal, Workflow } from "lucide-react"
import type { ProjectCategory } from "@/types/project"

const icons = {
  "web-app": Smartphone,
  "web-extension": Puzzle,
  cli: Terminal,
  library: Blocks,
  automation: Workflow,
  experiment: FlaskConical,
}

export function ProjectCategoryIcon({ category }: { category: ProjectCategory }) {
  const Icon = icons[category]
  return <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
}
