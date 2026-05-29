"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Calendar, Dumbbell, Utensils, Zap, Wind, Clock, Trophy } from "lucide-react"

type SessionType = "gym" | "onice" | "meal" | "recovery" | "meeting" | "game"

interface Session {
  time: string
  label: string
  duration: string
  type: SessionType
  athletes?: string
  detail?: string
}

const inSeasonSchedule: Session[] = [
  {
    time: "09:00",
    label: "Morning Skate",
    duration: "45 min",
    type: "onice",
    athletes: "Full Squad",
    detail: "Pre-game activation + PP/PK",
  },
  {
    time: "10:30",
    label: "Team Meeting",
    duration: "30 min",
    type: "meeting",
    detail: "Opponent scouting report",
  },
  {
    time: "12:00",
    label: "Pre-Game Meal",
    duration: "45 min",
    type: "meal",
    detail: "High carb, low fiber",
  },
  {
    time: "19:00",
    label: "GAME vs RANGERS",
    duration: "150 min",
    type: "game",
    athletes: "Full Squad",
    detail: "Madison Square Garden",
  },
]

const offSeasonSchedule: Session[] = [
  {
    time: "07:00",
    label: "Streprogen Strength",
    duration: "90 min",
    type: "gym",
    athletes: "Group A",
    detail: "Back Squat + Accessory",
  },
  {
    time: "09:30",
    label: "Ice: Edge Work",
    duration: "60 min",
    type: "onice",
    athletes: "Group A",
    detail: "Individual skill development",
  },
  {
    time: "11:30",
    label: "Metabolic Conditioning",
    duration: "45 min",
    type: "gym",
    detail: "Assault bike intervals",
  },
  {
    time: "13:00",
    label: "Recovery Nutrition",
    duration: "30 min",
    type: "meal",
    detail: "40g Protein + BCAAs",
  },
]

const typeConfig: Record<SessionType, { icon: React.ElementType; color: string; bg: string; border: string; label: string }> = {
  onice: {
    icon: Zap,
    color: "text-[oklch(0.68_0.16_218)]",
    bg: "bg-[oklch(0.68_0.16_218/0.10)]",
    border: "border-l-[oklch(0.68_0.16_218)]",
    label: "On-Ice",
  },
  gym: {
    icon: Dumbbell,
    color: "text-[oklch(0.72_0.18_70)]",
    bg: "bg-[oklch(0.72_0.18_70/0.10)]",
    border: "border-l-[oklch(0.72_0.18_70)]",
    label: "Gym",
  },
  meal: {
    icon: Utensils,
    color: "text-[oklch(0.62_0.17_152)]",
    bg: "bg-[oklch(0.62_0.17_152/0.08)]",
    border: "border-l-[oklch(0.62_0.17_152)]",
    label: "Nutrition",
  },
  recovery: {
    icon: Wind,
    color: "text-[oklch(0.76_0.10_280)]",
    bg: "bg-[oklch(0.76_0.10_280/0.08)]",
    border: "border-l-[oklch(0.76_0.10_280)]",
    label: "Recovery",
  },
  meeting: {
    icon: Calendar,
    color: "text-[oklch(0.55_0.08_240)]",
    bg: "bg-[oklch(0.55_0.08_240/0.08)]",
    border: "border-l-[oklch(0.55_0.08_240)]",
    label: "Tactical",
  },
  game: {
    icon: Trophy,
    color: "text-[oklch(0.60_0.22_25)]",
    bg: "bg-[oklch(0.60_0.22_25/0.10)]",
    border: "border-l-[oklch(0.60_0.22_25)]",
    label: "Game",
  },
}

export function DailySchedule() {
  const isOffSeason = false // Simplified toggle for demo
  const schedule = isOffSeason ? offSeasonSchedule : inSeasonSchedule

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Daily Schedule {isOffSeason ? "(Off-Season)" : "(In-Season)"}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
          {schedule.map((session, i) => {
            const cfg = typeConfig[session.type]
            const Icon = cfg.icon
            return (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-3 p-2.5 rounded-lg border-l-2 transition-all",
                  cfg.bg,
                  cfg.border
                )}
              >
                {/* Time */}
                <div className="flex flex-col items-center shrink-0 w-10">
                  <span className="text-[10px] font-mono font-semibold text-foreground">{session.time}</span>
                </div>

                {/* Icon */}
                <div className={cn("w-5 h-5 shrink-0 flex items-center justify-center mt-0.5", cfg.color)}>
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-foreground">{session.label}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      <Clock className="w-2.5 h-2.5 text-muted-foreground" />
                      <span className="text-[10px] font-mono text-muted-foreground">{session.duration}</span>
                    </div>
                  </div>
                  {session.detail && (
                    <p className="text-[10px] text-muted-foreground mt-0.5">{session.detail}</p>
                  )}
                  {session.athletes && (
                    <span className={cn("text-[10px] font-medium mt-0.5 block", cfg.color)}>
                      {session.athletes}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
