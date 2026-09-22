"use client"

import { ChevronDown } from "lucide-react"
import { CATEGORY_LABELS, STATUS_LABELS, type ProjectCategory } from "@/types/project"
import { ProjectCategoryIcon } from "@/components/project-category-icon"

interface ProjectFiltersProps {
  categories: ProjectCategory[]
  category: string | null
  status: string | null
  onFilterChange: (key: "category" | "status", value: string) => void
}

export function ProjectFilters({ categories, category, status, onFilterChange }: ProjectFiltersProps) {
  return (
    <div className="project-filters">
      <div className="category-filters" role="group" aria-label="Project category">
        <button type="button" aria-pressed={!category} onClick={() => onFilterChange("category", "")}>All projects</button>
        {categories.map((c) => (
          <button type="button" key={c} aria-label={CATEGORY_LABELS[c]} title={CATEGORY_LABELS[c]} aria-pressed={category === c} onClick={() => onFilterChange("category", c)}><ProjectCategoryIcon category={c} /></button>
        ))}
      </div>
      <label className="status-filter">
        <span className="sr-only">Status</span>
        <select value={status ?? ""} onChange={(event) => onFilterChange("status", event.target.value)}>
          <option value="">All statuses</option>
          {Object.entries(STATUS_LABELS).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
        </select>
        <ChevronDown className="status-filter-chevron" size={14} aria-hidden="true" />
      </label>
    </div>
  )
}
