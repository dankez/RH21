"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Heart,
  Dumbbell,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight,
  Users,
} from "lucide-react"

const athletes = [
  {
    id: 1,
    name: "Marcus Lindqvist",
    number: 19,
    sport: "Ice Hockey",
    position: "Center",
    status: "Healthy",
    hrv: 74,
    hrvTrend: "up",
    rpe: 6.2,
    rpeTrend: "down",
    load: 82,
    avatar: "ML",
  },
  {
    id: 2,
    name: "Erik Johansson",
    number: 7,
    sport: "Ice Hockey",
    position: "D",
    status: "Recovery",
    hrv: 51,
    hrvTrend: "down",
    rpe: 7.8,
    rpeTrend: "up",
    load: 64,
    avatar: "EJ",
  },
  {
    id: 3,
    name: "Alexei Volkov",
    number: 88,
    sport: "Ice Hockey",
    position: "RW",
    status: "Training",
    hrv: 68,
    hrvTrend: "stable",
    rpe: 5.9,
    rpeTrend: "stable",
    load: 91,
    avatar: "AV",
  },
  {
    id: 4,
    name: "Jake Perreault",
    number: 24,
    sport: "Football",
    position: "QB",
    status: "Healthy",
    hrv: 80,
    hrvTrend: "up",
    rpe: 4.5,
    rpeTrend: "down",
    load: 73,
    avatar: "JP",
  },
  {
    id: 5,
    name: "Nikolas Braun",
    number: 3,
    sport: "Ice Hockey",
    position: "G",
    status: "Recovery",
    hrv: 44,
    hrvTrend: "down",
    rpe: 8.4,
    rpeTrend: "up",
    load: 55,
    avatar: "NB",
  },
  {
    id: 6,
    name: "Connor Walsh",
    number: 11,
    sport: "Football",
    position: "WR",
    status: "Training",
    hrv: 72,
    hrvTrend: "up",
    rpe: 6.7,
    rpeTrend: "stable",
    load: 88,
    avatar: "CW",
  },
]

const statusConfig = {
  Healthy: {
    color: "text-[oklch(0.62_0.17_152)]",
    bg: "bg-[oklch(0.62_0.17_152/0.12)]",
    border: "border-[oklch(0.62_0.17_152/0.3)]",
    dot: "bg-[oklch(0.62_0.17_152)]",
  },
  Recovery: {
    color: "text-[oklch(0.72_0.18_70)]",
    bg: "bg-[oklch(0.72_0.18_70/0.12)]",
    border: "border-[oklch(0.72_0.18_70/0.3)]",
    dot: "bg-[oklch(0.72_0.18_70)]",
  },
  Training: {
    color: "text-[oklch(0.68_0.16_218)]",
    bg: "bg-[oklch(0.68_0.16_218/0.12)]",
    border: "border-[oklch(0.68_0.16_218/0.3)]",
    dot: "bg-[oklch(0.68_0.16_218)]",
  },
}

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="w-3 h-3 text-[oklch(0.62_0.17_152)]" />
  if (trend === "down") return <TrendingDown className="w-3 h-3 text-[oklch(0.60_0.22_25)]" />
  return <Minus className="w-3 h-3 text-muted-foreground" />
}

const HRVBar = ({ value }: { value: number }) => {
  const color =
    value >= 70 ? "oklch(0.62 0.17 152)" : value >= 55 ? "oklch(0.72 0.18 70)" : "oklch(0.60 0.22 25)"
  return (
    <div className="w-16 h-1.5 rounded-full bg-[oklch(0.22_0.015_230)] overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  )
}

interface AthleteOverviewProps {
  selectedAthleteId: number
  onSelectAthlete: (id: number) => void
}

export function AthleteOverview({ selectedAthleteId, onSelectAthlete }: AthleteOverviewProps) {
  return (
    <Card className="bg-card border-border h-full">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Athlete Roster
            </CardTitle>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {athletes.length} Athletes
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {athletes.map((athlete) => {
            const sc = statusConfig[athlete.status as keyof typeof statusConfig]
            const isSelected = athlete.id === selectedAthleteId
            return (
              <button
                key={athlete.id}
                onClick={() => onSelectAthlete(athlete.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-left transition-all group",
                  isSelected
                    ? "bg-[oklch(0.68_0.16_218/0.08)] border-l-2 border-l-primary"
                    : "hover:bg-[oklch(0.175_0.012_232)] border-l-2 border-l-transparent"
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-[oklch(0.22_0.015_230)] text-muted-foreground"
                  )}
                >
                  {athlete.avatar}
                </div>

                {/* Name + Sport */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-foreground truncate">
                      {athlete.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      #{athlete.number}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-muted-foreground">{athlete.sport}</span>
                    <span className="text-[10px] text-muted-foreground">·</span>
                    <span className="text-[10px] text-muted-foreground">{athlete.position}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div
                  className={cn(
                    "flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-medium shrink-0",
                    sc.bg,
                    sc.border,
                    sc.color
                  )}
                >
                  <span className={cn("w-1.5 h-1.5 rounded-full", sc.dot)} />
                  {athlete.status}
                </div>

                {/* Metrics */}
                <div className="hidden lg:flex flex-col items-end gap-1 shrink-0">
                  <div className="flex items-center gap-1">
                    <Heart className="w-2.5 h-2.5 text-muted-foreground" />
                    <span className="text-[10px] font-mono text-foreground">{athlete.hrv}</span>
                    <TrendIcon trend={athlete.hrvTrend} />
                    <HRVBar value={athlete.hrv} />
                  </div>
                  <div className="flex items-center gap-1">
                    <Dumbbell className="w-2.5 h-2.5 text-muted-foreground" />
                    <span className="text-[10px] font-mono text-foreground">RPE {athlete.rpe}</span>
                    <TrendIcon trend={athlete.rpeTrend} />
                  </div>
                </div>

                <ChevronRight
                  className={cn(
                    "w-3 h-3 shrink-0 transition-colors",
                    isSelected ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export { athletes }
