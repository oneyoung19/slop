import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseContributions, calendarWeeks } from '../src/lib/contributions.ts'
const day = (date, count = 0, level = 0) => ({ date, count, level })

test('calendar preserves Sunday–Saturday alignment across year boundary', () => {
  const days = parseContributions({ contributions: [day('2026-01-01', 2, 1), day('2025-12-31')] })
  const weeks = calendarWeeks(days)
  assert.equal(weeks.length, 1)
  assert.equal(weeks[0].length, 7)
  assert.equal(weeks[0][3].date, '2025-12-31')
  assert.equal(weeks[0][4].count, 2)
  assert.equal(weeks[0][5], null)
})

test('leap day is valid and starts new week correctly', () => {
  const days = parseContributions({ contributions: [day('2024-02-28'), day('2024-02-29'), day('2024-03-01'), day('2024-03-02'), day('2024-03-03')] })
  const weeks = calendarWeeks(days)
  assert.equal(weeks[1][0].date, '2024-03-03')
  assert.equal(weeks.flat().filter(Boolean).length, 5)
})

test('malformed, missing, duplicate, or impossible dates are not rendered as zero activity', () => {
  for (const contributions of [[], [day('2025-02-29')], [day('2026-01-01'), day('2026-01-03')], [day('2026-01-01'), day('2026-01-01')], [day('2026-01-01', -1)], [day('2026-01-01', 1, 5)]]) {
    assert.throws(() => parseContributions({ contributions }))
  }
  assert.throws(() => parseContributions({ error: 'Rate limit' }))
})
