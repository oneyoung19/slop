import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Slop — OneYoung's Project Lab",
  description:
    "Things I build, break, and occasionally ship. A collection of personal software projects, tools and experiments.",
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <div className="site-shell home-page">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-kicker"><span aria-hidden="true" /> OneYoung’s independent project lab</div>
          <h1 id="hero-title">Small ideas.<br /><span>Real things.</span></h1>
          <p>Tools and experiments, built out of curiosity.<br />A little workbench on the internet.</p>
          <div className="hero-actions">
            <Link className="hero-primary" href="/projects">Explore the projects <ArrowUpRight size={16} aria-hidden="true" /></Link>
            <Link className="hero-secondary" href="/about">Meet the maker <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
