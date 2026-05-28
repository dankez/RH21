"use client"

import { cn } from "@/lib/utils"
import { Heart, Dumbbell, TrendingUp, Users, Zap, ShieldAlert } from "lucide-react"

const stats = [
  {
    label: "Team Avg HRV",
    value: "65.5",
    unit: "ms",
    change: "+3.2",
    positive: true,
    icon: Heart,
    color: "text-[oklch(0.60_0.22_25)]",
    bg: "bg-[oklch(0.60_0.22_25/0.08)]",
  },
  {
    label: "Team Avg RPE",
    value: "6.6",
    unit: "/10",
    change: "-0.4",
    positive: true,
    icon: Dumbbell,
    color: "text-[oklch(0.72_0.18_70)]",
    bg: "bg-[oklch(0.72_0.18_70/0.08)]",
  },
  {
    label: "Avg ACWR",
    value: "1.09",
    unit: "",
    change: "+0.04",
    positive: true,
    icon: TrendingUp,
    color: "text-[oklch(0.62_0.17_152)]",
    bg: "bg-[oklch(0.62_0.17_152/0.08)]",
  },
  {
    label: "Athletes Ready",
    value: "4",
    unit: "/6",
    change: "",
    positive: true,
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/08",
  },
  {
    label: "Peak Readiness",
    value: "91",
    unit: "%",
    change: "Lindqvist",
    positive: true,
    icon: Zap,
    color: "text-[oklch(0.68_0.16_218)]",
    bg: "bg-[oklch(0.68_0.16_218/0.08)]",
  },
  {
    label: "Active Alerts",
    value: "2",
    unit: "",
    change: "Critical",
    positive: false,
    icon: ShieldAlert,
    color: "text-[oklch(0.60_0.22_25)]",
    bg: "bg-[oklch(0.60_0.22_25/0.08)]",
  },
]

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className={cn(
              "rounded-lg border border-border p-3 flex flex-col gap-1.5",
              "bg-card"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                {stat.label}
              </span>
              <div className={cn("w-5 h-5 rounded flex items-center justify-center", stat.bg)}>
                <Icon className={cn("w-3 h-3", stat.color)} />
              </div>
            </div>
            <div className="flex items-end gap-1">
              <span className={cn("text-lg font-bold font-mono leading-none", stat.color)}>
                {stat.value}
              </span>
              {stat.unit && (
                <span className="text-xs text-muted-foreground mb-0.5">{stat.unit}</span>
              )}
            </div>
            {stat.change && (
              <span className={cn("text-[10px] font-medium", stat.positive ? "text-[oklch(0.62_0.17_152)]" : "text-[oklch(0.60_0.22_25)]")}>
                {stat.change}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
