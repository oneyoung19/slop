import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-1 flex-col items-start justify-center gap-3 px-4 py-20">
      <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">404</p>
      <h1 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        Project not found.
      </h1>
      <Link
        href="/"
        className="font-mono text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        ← Back to Slop
      </Link>
    </div>
  )
}
