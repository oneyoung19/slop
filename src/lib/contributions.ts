export interface ContributionDay {
  date: string
  count: number
  level: number
}

export function parseContributions(value: unknown): ContributionDay[] {
  if (!value || typeof value !== "object" || !("contributions" in value) || !Array.isArray(value.contributions)) throw new Error("Invalid contribution response")
  if (value.contributions.length > 371) throw new Error("Unexpected calendar range")
  const days: ContributionDay[] = value.contributions.map((day: unknown) => {
    if (!day || typeof day !== "object" || !("date" in day) || !("count" in day) || !("level" in day) || typeof day.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isFinite(Date.parse(day.date)) || typeof day.count !== "number" || !Number.isInteger(day.count) || day.count < 0 || typeof day.level !== "number" || !Number.isInteger(day.level) || day.level < 0 || day.level > 4) throw new Error("Invalid contribution day")
    if (new Date(day.date).toISOString().slice(0, 10) !== day.date) throw new Error("Invalid calendar date")
    return { date: day.date, count: day.count, level: day.level }
  })
  if (!days.length) throw new Error("No contribution data")
  days.sort((a, b) => a.date.localeCompare(b.date))
  for (let i = 1; i < days.length; i++) {
    if (Date.parse(days[i].date) - Date.parse(days[i - 1].date) !== 86_400_000) throw new Error("Incomplete contribution calendar")
  }
  return days
}

export function calendarWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (!days.length) return []
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay()
  const padded: (ContributionDay | null)[] = [...Array<null>(offset).fill(null), ...days]
  while (padded.length % 7) padded.push(null)
  return Array.from({ length: padded.length / 7 }, (_, i) => padded.slice(i * 7, i * 7 + 7))
}
