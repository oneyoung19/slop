import type { MetadataRoute } from "next"

import { getProjects } from "@/lib/projects"

const BASE_URL = "https://slop.oneyoung.com"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries: MetadataRoute.Sitemap = getProjects().map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: project.updatedAt ?? project.createdAt,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
    },
    ...projectEntries,
  ]
}
