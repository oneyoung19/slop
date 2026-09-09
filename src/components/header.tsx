"use client"

import Link from "next/link"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()
  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <Link href="/" className="wordmark" aria-label="Slop home">slop<span>.</span></Link>
        <nav aria-label="Main navigation">
          <Link href="/" aria-current={pathname === "/" || pathname.startsWith("/projects/") ? "page" : undefined}>Projects</Link>
          <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined}>About</Link>
          <a className="icon-link" href="https://github.com/oneyoung19" target="_blank" rel="noreferrer" aria-label="OneYoung on GitHub" title="GitHub"><SiGithub size={21} aria-hidden="true" /></a>
        </nav>
      </div>
    </header>
  )
}
