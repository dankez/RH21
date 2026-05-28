"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  Snowflake,
  Bell,
  Settings,
  Shield,
  Activity,
  ChevronDown,
  Wifi,
} from "lucide-react"

export function DashboardHeader() {
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }))
      setDate(
        now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="bg-[oklch(0.12_0.01_235)] border-b border-border sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-2.5 gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15 border border-primary/30">
            <Snowflake className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-foreground tracking-tight">
                PERFORMANCE HUB
              </span>
              <span className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-primary/15 border border-primary/30 text-[10px] font-bold text-primary tracking-widest">
                PRO
              </span>
            </div>
            <div className="text-[10px] text-muted-foreground font-mono">NHL Analytics Suite</div>
          </div>
        </div>

        {/* Nav Tabs */}
        <nav className="hidden md:flex items-center gap-1">
          {["Dashboard", "Athletes", "Analytics", "Training", "Medical", "Reports"].map((tab, i) => (
            <button
              key={tab}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                i === 0
                  ? "bg-primary/15 text-primary border border-primary/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Live clock */}
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-xs font-mono font-semibold text-foreground">{time}</span>
            <span className="text-[10px] text-muted-foreground">{date}</span>
          </div>

          {/* Status indicators */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-[oklch(0.62_0.17_152/0.10)] border border-[oklch(0.62_0.17_152/0.25)]">
              <Wifi className="w-2.5 h-2.5 text-[oklch(0.62_0.17_152)]" />
              <span className="text-[10px] text-[oklch(0.62_0.17_152)] font-semibold">LIVE</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-[oklch(0.68_0.16_218/0.10)] border border-[oklch(0.68_0.16_218/0.25)]">
              <Activity className="w-2.5 h-2.5 text-primary" />
              <span className="text-[10px] text-primary font-mono">6 Athletes</span>
            </div>
          </div>

          {/* Bell */}
          <button className="relative p-1.5 rounded-lg hover:bg-accent transition-colors">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-[oklch(0.60_0.22_25)] border border-background" />
          </button>

          {/* Settings */}
          <button className="p-1.5 rounded-lg hover:bg-accent transition-colors">
            <Settings className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* Coach profile */}
          <div className="flex items-center gap-2 pl-3 border-l border-border">
            <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold text-foreground leading-none">Rudolf Huna</div>
              <div className="text-[10px] text-muted-foreground leading-none mt-0.5">Head Coach</div>
            </div>
            <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
          </div>
        </div>
      </div>

      {/* Accent line */}
      <div className="h-px bg-primary/20" />
    </header>
  )
}
