"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Calendar, Dumbbell, Utensils, Zap, Wind, Clock } from "lucide-react"

type SessionType = "gym" | "onice" | "meal" | "recovery" | "meeting"

interface Session {
  time: string
  label: string
  duration: string
  type: SessionType
  athletes?: string
  detail?: string
}

const schedule: Session[] = [
  {
    time: "06:00",
    label: "Morning Skate",
    duration: "75 min",
    type: "onice",
    athletes: "Full Squad",
    detail: "Systems + PP/PK units",
  },
  {
    time: "07:30",
    label: "Post-Skate Nutrition",
    duration: "30 min",
    type: "meal",
    detail: "Protein shake + carb reload",
  },
  {
    time: "09:00",
    label: "Strength & Conditioning",
    duration: "60 min",
    type: "gym",
    athletes: "Defense + Forwards",
    detail: "Lower body hypertrophy",
  },
  {
    time: "10:30",
    label: "Recovery & Mobility",
    duration: "45 min",
    type: "recovery",
    athletes: "Johansson, Braun",
    detail: "Pool + contrast therapy",
  },
  {
    time: "12:30",
    label: "Team Lunch",
    duration: "45 min",
    type: "meal",
    detail: "High-carb pre-afternoon",
  },
  {
    time: "14:00",
    label: "Tactical Video Session",
    duration: "30 min",
    type: "meeting",
    athletes: "Full Squad",
    detail: "Opponent breakdown",
  },
  {
    time: "15:00",
    label: "Afternoon Ice Practice",
    duration: "90 min",
    type: "onice",
    athletes: "Full Squad",
    detail: "5v5 Battle drills + Breakouts",
  },
  {
    time: "17:00",
    label: "Recovery Nutrition",
    duration: "20 min",
    type: "meal",
    detail: "BCAAs + electrolytes",
  },
  {
    time: "17:30",
    label: "Cold Plunge / Cryo",
    duration: "20 min",
    type: "recovery",
    athletes: "Full Squad",
    detail: "3 min @ 10°C",
  },
  {
    time: "19:30",
    label: "Evening Meal",
    duration: "45 min",
    type: "meal",
    detail: "Recovery-focused dinner",
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
}

const legendTypes: SessionType[] = ["onice", "gym", "meal", "recovery", "meeting"]

export function DailySchedule() {
  const now = new Date()
  const currentHour = now.getHours()
  const currentMin = now.getMinutes()
  const currentTime = currentHour * 60 + currentMin

  const isActive = (time: string, duration: string) => {
    const [h, m] = time.split(":").map(Number)
    const start = h * 60 + m
    const durationMins = parseInt(duration)
    return currentTime >= start && currentTime < start + durationMins
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Daily Schedule
            </CardTitle>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {legendTypes.map((t) => {
              const cfg = typeConfig[t]
              return (
                <div key={t} className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px]", cfg.bg)}>
                  <span className={cn("font-medium", cfg.color)}>{cfg.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
          {schedule.map((session, i) => {
            const cfg = typeConfig[session.type]
            const Icon = cfg.icon
            const active = isActive(session.time, session.duration)
            return (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-3 p-2.5 rounded-lg border-l-2 transition-all",
                  cfg.bg,
                  cfg.border,
                  active ? "ring-1 ring-primary/30" : ""
                )}
              >
                {/* Time */}
                <div className="flex flex-col items-center shrink-0 w-10">
                  <span className="text-[10px] font-mono font-semibold text-foreground">{session.time}</span>
                  {active && (
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  )}
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
