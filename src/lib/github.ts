import "server-only"

import type { GitHubRepository } from "@/types/project"

const GITHUB_CACHE_SECONDS = 6 * 60 * 60

interface GitHubRepoResponse {
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics?: string[]
  pushed_at: string
  archived: boolean
}

function normalize(data: GitHubRepoResponse): GitHubRepository {
  return {
    name: data.name,
    fullName: data.full_name,
    description: data.description,
    url: data.html_url,
    homepage: data.homepage,
    stars: data.stargazers_count,
    forks: data.forks_count,
    language: data.language,
    topics: data.topics ?? [],
    pushedAt: data.pushed_at,
    archived: data.archived,
  }
}

export async function getGitHubRepository(
  repository: string
): Promise<GitHubRepository | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    }

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(`https://api.github.com/repos/${repository}`, {
      headers,
      next: { revalidate: GITHUB_CACHE_SECONDS },
    })

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as GitHubRepoResponse
    return normalize(data)
  } catch {
    return null
  }
}
