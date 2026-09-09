"use client"

import { SlidersHorizontal } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { CATEGORY_LABELS, STATUS_LABELS, type ProjectCategory } from "@/types/project"

export function ProjectFilters({ categories }: { categories: ProjectCategory[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const status = searchParams.get("status")

  function setParam(key: "category" | "status", value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    const query = params.toString()
    router.push(query ? `/?${query}` : "/", { scroll: false })
  }

  return (
    <div className="project-filters">
      <div className="category-filters" role="group" aria-label="Project category">
        <button type="button" aria-pressed={!category} onClick={() => setParam("category", "")}>All projects</button>
        {categories.map((c) => (
          <button type="button" key={c} aria-pressed={category === c} onClick={() => setParam("category", c)}>{CATEGORY_LABELS[c]}</button>
        ))}
      </div>
      <label className="status-filter">
        <SlidersHorizontal size={17} aria-hidden="true" />
        <span className="sr-only">Status</span>
        <select value={status ?? ""} onChange={(event) => setParam("status", event.target.value)}>
          <option value="">All statuses</option>
          {Object.entries(STATUS_LABELS).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
        </select>
      </label>
    </div>
  )
}
