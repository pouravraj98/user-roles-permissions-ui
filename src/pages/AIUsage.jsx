import { useState } from 'react'

/* ───────────────────────── Plan config (not usage data) ───────────────────────── */

const PLAN_ALLOTMENT = 2500

// Usage data — empty until real usage is recorded.
const usedThisCycle = 0
const dailyUsage = [] // [{ day, credits }]
const byAgent = [] // [{ name, credits, color }]

const RANGES = ['Last 7 days', 'Last 14 days', 'Last 30 days', 'This cycle']

/* ───────────────────────── Atoms ───────────────────────── */

function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
    </div>
  )
}

function EmptyState({ icon, title, sub }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400">{icon}</div>
      <p className="text-sm font-medium text-gray-700">{title}</p>
      {sub && <p className="mt-1 max-w-xs text-xs text-gray-500">{sub}</p>}
    </div>
  )
}

/* ───────────────────────── Page ───────────────────────── */

export default function AIUsage() {
  const [range, setRange] = useState('Last 14 days')
  const [rangeOpen, setRangeOpen] = useState(false)

  const avgPerDay = dailyUsage.length ? Math.round(dailyUsage.reduce((a, d) => a + d.credits, 0) / dailyUsage.length) : 0
  const pctOfPlan = Math.round((usedThisCycle / PLAN_ALLOTMENT) * 100)
  const hasUsage = usedThisCycle > 0

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-5">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Usage</h1>
          <p className="mt-1 text-sm text-gray-500">See how your AI agents are consuming credits.</p>
        </div>
        {/* Range selector */}
        <div className="relative">
          <button onClick={() => setRangeOpen((v) => !v)} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            {range}
            <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
          </button>
          {rangeOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setRangeOpen(false)} />
              <div className="absolute right-0 z-20 mt-1 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                {RANGES.map((r) => (
                  <button key={r} onClick={() => { setRange(r); setRangeOpen(false) }}
                    className={`block w-full px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${r === range ? 'font-medium text-purple-600' : 'text-gray-700'}`}>{r}</button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-6 p-8">
        {/* Summary stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <StatCard label="Used this cycle" value={usedThisCycle.toLocaleString()} sub={`of ${PLAN_ALLOTMENT.toLocaleString()} plan credits · ${pctOfPlan}%`} />
          <StatCard label="Daily average" value={avgPerDay} sub="credits / day" />
          <StatCard label="Active agents" value={byAgent.length} sub="consuming credits" />
        </div>

        {/* Consumption over time */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Consumption over time</h3>
              <p className="text-xs text-gray-500">Credits consumed per day</p>
            </div>
            {hasUsage && <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="h-2 w-2 rounded-full bg-purple-600" /> Credits</span>}
          </div>
          {hasUsage ? (
            <div className="flex h-48 items-end gap-2">
              {dailyUsage.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center justify-end">
                  <div className="w-full rounded-t-md bg-purple-500" style={{ height: `${(d.credits / Math.max(...dailyUsage.map((x) => x.credits))) * 100}%` }} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>}
              title="No usage data yet"
              sub="Once your agents start handling conversations, daily credit consumption will appear here."
            />
          )}
        </div>

        {/* Breakdown by agent */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-1 text-sm font-semibold text-gray-900">By agent</h3>
          <p className="mb-2 text-xs text-gray-500">Credit usage across your agents</p>
          {byAgent.length ? (
            <div className="mt-4 space-y-4">
              {byAgent.map((a) => {
                const pct = Math.round((a.credits / usedThisCycle) * 100)
                return (
                  <div key={a.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-gray-700">{a.name}</span>
                      <span className="text-gray-500">{a.credits.toLocaleString()} · {pct}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div className={`h-full rounded-full ${a.color}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <EmptyState
              icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /></svg>}
              title="No agent usage yet"
              sub="When your agents consume credits, you'll see a per-agent breakdown here."
            />
          )}
        </div>
      </div>
    </div>
  )
}
