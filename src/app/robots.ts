import type { MetadataRoute } from "next"

const BASE_URL = "https://slop.oneyoung.com"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
