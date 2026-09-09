"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, RotateCw } from "lucide-react"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { calendarWeeks, parseContributions, type ContributionDay } from "@/lib/contributions"

const USERNAME = "oneyoung19"
const PROFILE = `https://github.com/${USERNAME}`
const monthFormat = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" })
const dayFormat = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" })

export function GitHubContributions() {
  const [days, setDays] = useState<ContributionDay[] | null>(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [selected, setSelected] = useState<ContributionDay | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15_000)
    let active = true
    async function load() {
      try {
        // Public profile data only; this service requires no GitHub token.
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`, { signal: controller.signal })
        if (!response.ok) throw new Error("Contribution request failed")
        const result = parseContributions(await response.json())
        if (active) setDays(result)
      } catch {
        if (active) setError(true)
      } finally { clearTimeout(timeout) }
    }
    void load()
    return () => { active = false; clearTimeout(timeout); controller.abort() }
  }, [attempt])

  const weeks = calendarWeeks(days ?? [])
  const total = days?.reduce((sum, day) => sum + day.count, 0) ?? 0

  return (
    <section className="github-activity" aria-labelledby="activity-title">
      <div className="section-heading">
        <h2 id="activity-title"><SiGithub size={25} aria-hidden="true" />GitHub activity</h2>
        <a className="activity-profile" href={PROFILE} target="_blank" rel="noreferrer">@{USERNAME}<ArrowUpRight size={18} aria-hidden="true" /></a>
      </div>
      <div className="activity-panel">
        {!days ? (
          <div className="activity-placeholder" role="status">
            <p>{error ? "GitHub activity is temporarily unavailable." : "Loading GitHub contributions…"}</p>
            {error && <button type="button" onClick={() => { setError(false); setAttempt(attempt + 1) }}><RotateCw size={16} aria-hidden="true" />Try again</button>}
          </div>
        ) : (
          <>
            <div className="activity-summary"><p><strong>{total.toLocaleString("en-US")}</strong> contributions in the last year</p><span>{days[0].date.slice(0, 4)} — {days.at(-1)!.date.slice(0, 4)}</span></div>
            <div className="calendar-scroll" tabIndex={0} role="region" aria-label="Contribution calendar, scroll horizontally to see all dates">
              <div className="contribution-calendar" style={{ gridTemplateColumns: `30px repeat(${weeks.length}, minmax(10px, 1fr))` }}>
                <div className="calendar-weekdays" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></div>
                {weeks.map((week, index) => {
                  const first = week.find((day) => day !== null)!
                  const previous = index ? weeks[index - 1].find((day) => day !== null)! : null
                  const showMonth = !previous || first.date.slice(0, 7) !== previous.date.slice(0, 7)
                  return <div className="calendar-week" key={first.date}>
                    <span className="calendar-month">{showMonth && index < weeks.length - 2 ? monthFormat.format(new Date(`${first.date}T00:00:00Z`)) : ""}</span>
                    {week.map((day, weekday) => day ? <button type="button" key={day.date} className="contribution-day" data-level={day.level} title={`${day.count} contributions on ${dayFormat.format(new Date(`${day.date}T00:00:00Z`))}`} aria-label={`${day.count} contributions on ${day.date}`} onClick={() => setSelected(day)} onFocus={() => setSelected(day)} tabIndex={day.date === (selected?.date ?? days.at(-1)!.date) ? 0 : -1} onKeyDown={(event) => {
                      const offsets: Record<string, number> = { ArrowRight: 7, ArrowLeft: -7, ArrowDown: 1, ArrowUp: -1 }
                      const offset = offsets[event.key]
                      if (offset === undefined) return
                      event.preventDefault()
                      const cells = Array.from(event.currentTarget.closest(".contribution-calendar")!.querySelectorAll<HTMLButtonElement>("button"))
                      cells[Math.max(0, Math.min(cells.length - 1, cells.indexOf(event.currentTarget) + offset))]?.focus()
                    }} /> : <span key={`empty-${weekday}`} className="contribution-empty" />)}
                  </div>
                })}
              </div>
            </div>
            <div className="calendar-footer">
              <p aria-live="polite">{selected ? `${selected.count} contributions on ${dayFormat.format(new Date(`${selected.date}T00:00:00Z`))}` : "Select a day to see contributions."}</p>
              <div className="calendar-legend" aria-label="Color intensity indicates more contributions"><span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i key={level} data-level={level} />)}<span>More</span></div>
            </div>
            <details className="activity-data"><summary>View daily contributions</summary><div><table><caption>GitHub contributions by date</caption><thead><tr><th scope="col">Date</th><th scope="col">Contributions</th></tr></thead><tbody>{[...days].reverse().map((day) => <tr key={day.date}><th scope="row">{day.date}</th><td>{day.count}</td></tr>)}</tbody></table></div></details>
          </>
        )}
      </div>
    </section>
  )
}
