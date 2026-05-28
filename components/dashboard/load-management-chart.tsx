"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  TooltipProps,
} from "recharts"
import { Activity } from "lucide-react"

const athleteData: Record<number, { day: string; acwr: number; acute: number; chronic: number }[]> = {
  1: [
    { day: "May 1", acwr: 0.82, acute: 410, chronic: 500 },
    { day: "May 4", acwr: 0.91, acute: 465, chronic: 512 },
    { day: "May 7", acwr: 1.05, acute: 543, chronic: 517 },
    { day: "May 10", acwr: 1.12, acute: 582, chronic: 520 },
    { day: "May 13", acwr: 1.08, acute: 561, chronic: 519 },
    { day: "May 16", acwr: 1.21, acute: 630, chronic: 521 },
    { day: "May 19", acwr: 1.18, acute: 615, chronic: 521 },
    { day: "May 22", acwr: 1.35, acute: 702, chronic: 520 },
    { day: "May 25", acwr: 1.28, acute: 665, chronic: 520 },
    { day: "May 28", acwr: 1.15, acute: 598, chronic: 520 },
  ],
  2: [
    { day: "May 1", acwr: 1.3, acute: 650, chronic: 500 },
    { day: "May 4", acwr: 1.42, acute: 720, chronic: 507 },
    { day: "May 7", acwr: 1.55, acute: 790, chronic: 510 },
    { day: "May 10", acwr: 1.38, acute: 707, chronic: 512 },
    { day: "May 13", acwr: 1.1, acute: 565, chronic: 514 },
    { day: "May 16", acwr: 0.88, acute: 453, chronic: 515 },
    { day: "May 19", acwr: 0.75, acute: 386, chronic: 515 },
    { day: "May 22", acwr: 0.70, acute: 360, chronic: 514 },
    { day: "May 25", acwr: 0.80, acute: 411, chronic: 514 },
    { day: "May 28", acwr: 0.85, acute: 436, chronic: 513 },
  ],
  3: [
    { day: "May 1", acwr: 0.95, acute: 480, chronic: 505 },
    { day: "May 4", acwr: 1.02, acute: 516, chronic: 506 },
    { day: "May 7", acwr: 1.08, acute: 547, chronic: 507 },
    { day: "May 10", acwr: 1.15, acute: 584, chronic: 508 },
    { day: "May 13", acwr: 1.22, acute: 620, chronic: 508 },
    { day: "May 16", acwr: 1.18, acute: 600, chronic: 508 },
    { day: "May 19", acwr: 1.24, acute: 630, chronic: 508 },
    { day: "May 22", acwr: 1.30, acute: 660, chronic: 508 },
    { day: "May 25", acwr: 1.26, acute: 640, chronic: 508 },
    { day: "May 28", acwr: 1.20, acute: 609, chronic: 508 },
  ],
  4: [
    { day: "May 1", acwr: 1.0, acute: 520, chronic: 520 },
    { day: "May 4", acwr: 1.05, acute: 546, chronic: 520 },
    { day: "May 7", acwr: 0.97, acute: 505, chronic: 520 },
    { day: "May 10", acwr: 1.02, acute: 530, chronic: 520 },
    { day: "May 13", acwr: 1.08, acute: 562, chronic: 520 },
    { day: "May 16", acwr: 1.04, acute: 541, chronic: 520 },
    { day: "May 19", acwr: 0.99, acute: 515, chronic: 520 },
    { day: "May 22", acwr: 1.05, acute: 546, chronic: 520 },
    { day: "May 25", acwr: 1.10, acute: 572, chronic: 520 },
    { day: "May 28", acwr: 1.03, acute: 536, chronic: 520 },
  ],
  5: [
    { day: "May 1", acwr: 1.6, acute: 832, chronic: 520 },
    { day: "May 4", acwr: 1.72, acute: 894, chronic: 519 },
    { day: "May 7", acwr: 1.8, acute: 935, chronic: 519 },
    { day: "May 10", acwr: 1.55, acute: 805, chronic: 519 },
    { day: "May 13", acwr: 1.2, acute: 623, chronic: 519 },
    { day: "May 16", acwr: 0.75, acute: 389, chronic: 519 },
    { day: "May 19", acwr: 0.65, acute: 337, chronic: 518 },
    { day: "May 22", acwr: 0.60, acute: 311, chronic: 518 },
    { day: "May 25", acwr: 0.72, acute: 373, chronic: 518 },
    { day: "May 28", acwr: 0.80, acute: 414, chronic: 518 },
  ],
  6: [
    { day: "May 1", acwr: 0.88, acute: 457, chronic: 520 },
    { day: "May 4", acwr: 0.95, acute: 494, chronic: 520 },
    { day: "May 7", acwr: 1.04, acute: 541, chronic: 520 },
    { day: "May 10", acwr: 1.12, acute: 582, chronic: 520 },
    { day: "May 13", acwr: 1.19, acute: 619, chronic: 520 },
    { day: "May 16", acwr: 1.15, acute: 598, chronic: 520 },
    { day: "May 19", acwr: 1.22, acute: 634, chronic: 520 },
    { day: "May 22", acwr: 1.18, acute: 614, chronic: 520 },
    { day: "May 25", acwr: 1.10, acute: 572, chronic: 520 },
    { day: "May 28", acwr: 1.05, acute: 546, chronic: 520 },
  ],
}

const athleteNames: Record<number, string> = {
  1: "Marcus Lindqvist",
  2: "Erik Johansson",
  3: "Alexei Volkov",
  4: "Jake Perreault",
  5: "Nikolas Braun",
  6: "Connor Walsh",
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null
  const acwr = payload.find((p) => p.dataKey === "acwr")?.value as number
  const zone =
    acwr > 1.5 ? { label: "HIGH RISK", color: "oklch(0.60 0.22 25)" } :
    acwr > 1.3 ? { label: "CAUTION", color: "oklch(0.72 0.18 70)" } :
    acwr >= 0.8 ? { label: "OPTIMAL", color: "oklch(0.62 0.17 152)" } :
    { label: "UNDERLOAD", color: "oklch(0.55 0.08 240)" }

  return (
    <div className="bg-[oklch(0.135_0.01_230)] border border-[oklch(0.22_0.015_230)] rounded-lg p-3 shadow-xl">
      <p className="text-xs text-muted-foreground mb-2 font-mono">{label}</p>
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">ACWR</span>
          <span className="text-xs font-bold font-mono" style={{ color: zone.color }}>
            {(acwr as number).toFixed(2)}
          </span>
        </div>
        {payload.map((p) =>
          p.dataKey !== "acwr" ? (
            <div key={p.dataKey} className="flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground capitalize">{p.dataKey}</span>
              <span className="text-xs font-mono text-foreground">{p.value} AU</span>
            </div>
          ) : null
        )}
        <div
          className="mt-2 pt-2 border-t border-[oklch(0.22_0.015_230)] text-[10px] font-semibold tracking-wider"
          style={{ color: zone.color }}
        >
          {zone.label}
        </div>
      </div>
    </div>
  )
}

interface LoadManagementChartProps {
  selectedAthleteId: number
}

export function LoadManagementChart({ selectedAthleteId }: LoadManagementChartProps) {
  const data = athleteData[selectedAthleteId] ?? athleteData[1]
  const athleteName = athleteNames[selectedAthleteId] ?? "Athlete"
  const latest = data[data.length - 1]
  const zone =
    latest.acwr > 1.5 ? { label: "HIGH RISK", color: "oklch(0.60 0.22 25)" } :
    latest.acwr > 1.3 ? { label: "CAUTION", color: "oklch(0.72 0.18 70)" } :
    latest.acwr >= 0.8 ? { label: "OPTIMAL", color: "oklch(0.62 0.17 152)" } :
    { label: "UNDERLOAD", color: "oklch(0.55 0.08 240)" }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm font-semibold text-foreground tracking-wider uppercase">
              ACWR Load Management
            </CardTitle>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{athleteName}</span>
            <div
              className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest"
              style={{ color: zone.color, backgroundColor: `${zone.color.replace(")", "/0.12)").replace("oklch(", "oklch(")}` }}
            >
              {zone.label} · {latest.acwr.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Risk Zone Legend */}
        <div className="flex items-center gap-4 mt-2 flex-wrap">
          {[
            { label: "Underload < 0.8", color: "oklch(0.55 0.08 240)" },
            { label: "Optimal 0.8–1.3", color: "oklch(0.62 0.17 152)" },
            { label: "Caution 1.3–1.5", color: "oklch(0.72 0.18 70)" },
            { label: "High Risk > 1.5", color: "oklch(0.60 0.22 25)" },
          ].map((z) => (
            <div key={z.label} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: z.color }} />
              <span className="text-[10px] text-muted-foreground">{z.label}</span>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-2 px-2">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="acwrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.68 0.16 218)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.68 0.16 218)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.22 0.015 230)"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fill: "oklch(0.55 0.02 225)", fontSize: 10, fontFamily: "monospace" }}
              axisLine={false}
              tickLine={false}
              interval={1}
            />
            <YAxis
              domain={[0.4, 2.0]}
              tick={{ fill: "oklch(0.55 0.02 225)", fontSize: 10, fontFamily: "monospace" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => v.toFixed(1)}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Risk zone reference lines */}
            <ReferenceLine
              y={0.8}
              stroke="oklch(0.55 0.08 240)"
              strokeDasharray="4 2"
              strokeWidth={1}
              label={{ value: "0.8", position: "right", fontSize: 9, fill: "oklch(0.55 0.08 240)" }}
            />
            <ReferenceLine
              y={1.3}
              stroke="oklch(0.72 0.18 70)"
              strokeDasharray="4 2"
              strokeWidth={1}
              label={{ value: "1.3", position: "right", fontSize: 9, fill: "oklch(0.72 0.18 70)" }}
            />
            <ReferenceLine
              y={1.5}
              stroke="oklch(0.60 0.22 25)"
              strokeDasharray="4 2"
              strokeWidth={1}
              label={{ value: "1.5", position: "right", fontSize: 9, fill: "oklch(0.60 0.22 25)" }}
            />
            <Area
              type="monotone"
              dataKey="acwr"
              stroke="oklch(0.68 0.16 218)"
              strokeWidth={2}
              fill="url(#acwrGrad)"
              dot={(props) => {
                const { cx, cy, payload } = props
                const v = payload.acwr
                const c =
                  v > 1.5 ? "oklch(0.60 0.22 25)" :
                  v > 1.3 ? "oklch(0.72 0.18 70)" :
                  v >= 0.8 ? "oklch(0.62 0.17 152)" :
                  "oklch(0.55 0.08 240)"
                return (
                  <circle
                    key={`dot-${cx}-${cy}`}
                    cx={cx}
                    cy={cy}
                    r={3}
                    fill={c}
                    stroke="oklch(0.135 0.01 230)"
                    strokeWidth={1.5}
                  />
                )
              }}
              activeDot={{ r: 5, fill: "oklch(0.68 0.16 218)", stroke: "oklch(0.135 0.01 230)", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
