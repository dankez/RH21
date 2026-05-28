"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsBar } from "@/components/dashboard/stats-bar"
import { AthleteOverview } from "@/components/dashboard/athlete-overview"
import { LoadManagementChart } from "@/components/dashboard/load-management-chart"
import { DailySchedule } from "@/components/dashboard/daily-schedule"
import { AIInsightPanel } from "@/components/dashboard/ai-insight-panel"

export default function DashboardPage() {
  const [selectedAthleteId, setSelectedAthleteId] = useState(1)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader />

      <main className="p-4 space-y-4 max-w-[1600px] mx-auto">
        {/* Stats Bar */}
        <StatsBar />

        {/* Main grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr_300px] gap-4">
          {/* Left: Athlete Overview */}
          <div className="xl:row-span-2">
            <AthleteOverview
              selectedAthleteId={selectedAthleteId}
              onSelectAthlete={setSelectedAthleteId}
            />
          </div>

          {/* Center top: Load Management Chart */}
          <div>
            <LoadManagementChart selectedAthleteId={selectedAthleteId} />
          </div>

          {/* Right: AI Insight Panel */}
          <div className="xl:row-span-2">
            <AIInsightPanel />
          </div>

          {/* Center bottom: Daily Schedule */}
          <div>
            <DailySchedule />
          </div>
        </div>
      </main>
    </div>
  )
}
