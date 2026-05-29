"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Brain, AlertTriangle, CheckCircle, Info, TrendingUp, Zap, RefreshCw, Snowflake, Flame } from "lucide-react"

type AlertLevel = "critical" | "warning" | "info" | "positive"
type SeasonPhase = "off-season" | "in-season"

interface Insight {
  id: number
  level: AlertLevel
  athlete?: string
  metric?: string
  message: string
  recommendation: string
  time: string
  new?: boolean
}

const insights: Insight[] = [
  {
    id: 1,
    level: "critical",
    athlete: "Nikolas Braun",
    metric: "HRV",
    message: "HRV suppression detected — 44ms (↓31% vs 7-day avg). Autonomic stress markers elevated.",
    recommendation: "Suggest active recovery protocol today. Avoid high-intensity sessions. Re-assess tomorrow AM.",
    time: "07:42",
    new: true,
  },
  {
    id: 2,
    level: "critical",
    athlete: "Erik Johansson",
    metric: "ACWR",
    message: "Acute:Chronic Workload Ratio peaked at 1.72 last week — injury risk window still elevated.",
    recommendation: "Load cap at 60% today. Prioritize contrast therapy. Monitor hamstring fatigue markers.",
    time: "07:38",
    new: true,
  },
  {
    id: 3,
    level: "warning",
    athlete: "Alexei Volkov",
    metric: "RPE",
    message: "RPE trending ≥ 7 for 4 consecutive sessions. Perceived exertion inconsistent with planned load.",
    recommendation: "Review sleep quality data. Streprogen engine suggests reducing volume by 15% for next block.",
    time: "07:30",
  },
  {
    id: 4,
    level: "positive",
    athlete: "Marcus Lindqvist",
    metric: "HRV",
    message: "HRV 74ms — highest reading in 14 days. Readiness score: 91/100. Peak performance window.",
    recommendation: "Clear for full-intensity afternoon session. Streprogen optimized for hyper-acceleration drills.",
    time: "07:20",
  },
  {
    id: 5,
    level: "info",
    athlete: "Jake Perreault",
    metric: "Load",
    message: "ACWR stable at 1.03 — optimal training zone maintained for 10 consecutive days.",
    recommendation: "Continue current periodization plan. Streprogen strength phase transitions in 4 days.",
    time: "07:15",
  },
]

const levelConfig: Record<AlertLevel, { icon: React.ElementType; color: string; bg: string; border: string; badge: string }> = {
  critical: {
    icon: AlertTriangle,
    color: "text-[oklch(0.60_0.22_25)]",
    bg: "bg-[oklch(0.60_0.22_25/0.08)]",
    border: "border-[oklch(0.60_0.22_25/0.25)]",
    badge: "CRITICAL",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-[oklch(0.72_0.18_70)]",
    bg: "bg-[oklch(0.72_0.18_70/0.08)]",
    border: "border-[oklch(0.72_0.18_70/0.25)]",
    badge: "WARNING",
  },
  info: {
    icon: Info,
    color: "text-[oklch(0.68_0.16_218)]",
    bg: "bg-[oklch(0.68_0.16_218/0.08)]",
    border: "border-[oklch(0.68_0.16_218/0.25)]",
    badge: "INFO",
  },
  positive: {
    icon: CheckCircle,
    color: "text-[oklch(0.62_0.17_152)]",
    bg: "bg-[oklch(0.62_0.17_152/0.08)]",
    border: "border-[oklch(0.62_0.17_152/0.25)]",
    badge: "OPTIMAL",
  },
}

function TypingText({ text, speed = 12 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed("")
    setDone(false)
    let i = 0
    const timer = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(timer)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return (
    <span>
      {displayed}
      {!done && <span className="inline-block w-0.5 h-3 bg-primary ml-0.5 animate-pulse" />}
    </span>
  )
}

export function AIInsightPanel() {
  const [refreshing, setRefreshing] = useState(false)
  const [timestamp, setTimestamp] = useState("05/28 · 07:42 AM")
  const [animateFirst, setAnimateFirst] = useState(false)
  const [phase, setPhase] = useState<SeasonPhase>("in-season")

  const criticalCount = insights.filter((i) => i.level === "critical").length
  const warningCount = insights.filter((i) => i.level === "warning").length

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      setAnimateFirst(true)
      const now = new Date()
      setTimestamp(`05/28 · ${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`)
    }, 1200)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Brain className="w-4 h-4 text-primary" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            </div>
            <CardTitle className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Rudolf Huna AI
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPhase(phase === "in-season" ? "off-season" : "in-season")}
              className={cn(
                "flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold transition-all",
                phase === "in-season"
                  ? "bg-[oklch(0.68_0.16_218/0.15)] text-primary border border-primary/30"
                  : "bg-[oklch(0.72_0.18_70/0.12)] text-[oklch(0.72_0.18_70)] border border-[oklch(0.72_0.18_70/0.3)]"
              )}
            >
              {phase === "in-season" ? <Snowflake className="w-2.5 h-2.5" /> : <Flame className="w-2.5 h-2.5" />}
              {phase.toUpperCase()}
            </button>
            <button
              onClick={handleRefresh}
              className="p-1 rounded hover:bg-accent transition-colors"
              aria-label="Refresh insights"
            >
              <RefreshCw className={cn("w-3 h-3 text-muted-foreground", refreshing && "animate-spin")} />
            </button>
          </div>
        </div>
        {/* AI Status bar */}
        <div className="flex items-center gap-2 mt-2">
          <Zap className="w-3 h-3 text-primary" />
          <span className="text-[10px] text-muted-foreground font-mono">
            Streprogen analysis · {timestamp}
          </span>
          <span className="ml-auto flex items-center gap-1 text-[10px] text-[oklch(0.62_0.17_152)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.62_0.17_152)] animate-pulse" />
            LIVE
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-3 space-y-2 max-h-[400px] overflow-y-auto">
        <div className="mb-2 p-2 rounded bg-muted/50 border border-border">
          <p className="text-[10px] text-muted-foreground leading-tight">
            <span className="font-bold text-foreground">Phase Focus:</span> {phase === "in-season"
              ? "Tactical maintenance, speed preservation, and active recovery. ACWR threshold: 1.3."
              : "Hypertrophy, maximum strength, and metabolic conditioning. ACWR threshold: 1.6."}
          </p>
        </div>
        {insights.map((insight, idx) => {
          const cfg = levelConfig[insight.level]
          const Icon = cfg.icon
          const isNew = insight.new

          return (
            <div
              key={insight.id}
              className={cn(
                "rounded-lg border p-3 transition-all",
                cfg.bg,
                cfg.border,
                isNew ? "ring-1 ring-inset" : "",
                isNew && insight.level === "critical" ? "ring-[oklch(0.60_0.22_25/0.3)]" : "",
                isNew && insight.level === "warning" ? "ring-[oklch(0.72_0.18_70/0.2)]" : ""
              )}
            >
              <div className="flex items-start gap-2.5">
                <Icon className={cn("w-3.5 h-3.5 shrink-0 mt-0.5", cfg.color)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={cn("text-[10px] font-bold tracking-widest", cfg.color)}>
                      {cfg.badge}
                    </span>
                    {insight.athlete && (
                      <span className="text-[10px] font-semibold text-foreground">{insight.athlete}</span>
                    )}
                    {insight.metric && (
                      <span className="text-[10px] text-muted-foreground">· {insight.metric}</span>
                    )}
                    <span className="ml-auto text-[10px] font-mono text-muted-foreground">{insight.time}</span>
                    {isNew && (
                      <span className="px-1 py-0 rounded bg-primary/20 text-[10px] text-primary font-semibold">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-foreground leading-relaxed mb-1.5">
                    {idx === 0 && animateFirst ? (
                      <TypingText text={insight.message} />
                    ) : (
                      insight.message
                    )}
                  </p>
                  <div className="flex items-start gap-1.5">
                    <TrendingUp className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      {insight.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
