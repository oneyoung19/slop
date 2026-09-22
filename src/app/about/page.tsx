import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About — Slop",
  description: "What Slop is and why it exists.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <div className="reading-page about-page flex flex-1 flex-col">
      <h1 className="text-2xl font-medium tracking-tight">
        A place for things<br />I make along the way.
      </h1>
      <p className="text-sm leading-relaxed">
        Slop is a personal project lab and build log — a record of the tools, experiments,
        prototypes and abandoned ideas I&apos;ve worked on, regardless of whether they
        succeeded.
      </p>
      <p className="text-sm leading-relaxed">
        GitHub provides the facts — commits, stars, activity. Slop provides the context:
        what a project is, why it exists, what state it&apos;s in, and what I learned
        building it.
      </p>
      <p className="about-footer"><Link href="/projects" className="inline-flex items-center gap-2">Explore the projects <ArrowUpRight size={18} aria-hidden="true" /></Link></p>
    </div>
  )
}
