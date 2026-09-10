import Link from "next/link"

export default function NotFound() {
  return (
    <div className="reading-page not-found-page flex flex-1 flex-col items-start gap-6">
      <p className="font-mono text-xs">404</p>
      <h1 className="text-lg font-medium">
        Project not found.
      </h1>
      <Link
        href="/"
        className="font-mono text-xs"
      >
        ← Back to Slop
      </Link>
    </div>
  )
}
