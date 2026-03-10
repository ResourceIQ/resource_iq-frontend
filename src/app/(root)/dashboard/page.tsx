"use client"

import { StatCard } from "@/components/StatCard"
import { Users, Clock, TrendingUp, CircleCheckBig } from "lucide-react"
import { ChartPieDonutText } from "@/components/chart-pie-donut"
import { ChartBarLabel } from "@/components/chart-bar"
import { useDashboardGetDashboard } from "@/api/generated/dashboard/dashboard"

export default function DashboardPage() {
    const { data, isLoading, error } = useDashboardGetDashboard()

    // Live data from API
    const teamTotal = (data as any)?.team_members?.total ?? 0
    const teamNew = (data as any)?.team_members?.new_this_month ?? 0

    return (
        <div className="p-6">

            <div className="grid grid-cols-4 gap-4 mb-8">
                <StatCard
                    title="Team Members"
                    value={isLoading ? "..." : String(teamTotal)}
                    massage={isLoading ? "Loading..." : `+${teamNew} this month`}
                    Iconname={Users}
                />
                <StatCard title="Team Utilization" value="59%" massage="Monitor closely" Iconname={TrendingUp} />
                <StatCard title="Active Tasks" value="9" massage="12 completed this week" Iconname={CircleCheckBig} />
                <StatCard title="Pending Assignments" value="5" massage="Needs attention" Iconname={Clock} />
            </div>

            <div className="grid grid-cols-3 gap-4">

                <div className="col-span-2 h-full">
                    <ChartBarLabel />
                </div>

                <ChartPieDonutText />

            </div>

        </div>
    )
}
