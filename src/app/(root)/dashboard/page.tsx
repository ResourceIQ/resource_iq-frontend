"use client"

import { StatCard } from "@/components/StatCard"
import { Users, Clock, TrendingUp, CircleCheckBig } from "lucide-react"
import { ChartPieDonutText } from "@/components/chart-pie-donut"
import { ChartBarLabel } from "@/components/chart-bar"
import { IntegrationsHealthCard } from "@/components/IntegrationsHealthCard"
import { GithubPrStatsCard } from "@/components/GithubPrStatsCard"
import { JiraTasksStatsCard } from "@/components/JiraTasksStatsCard"
import { useDashboardGetDashboard, useDashboardGetIntegrationsHealth, useDashboardGetGithubStats, useDashboardGetJiraStats } from "@/api/generated/dashboard/dashboard"

export default function DashboardPage() {
    const { data, isLoading } = useDashboardGetDashboard()
    const { data: healthDataResponse, isLoading: isHealthLoading } = useDashboardGetIntegrationsHealth()
    const { data: githubStatsResponse, isLoading: isGithubStatsLoading } = useDashboardGetGithubStats()
    const { data: jiraStatsResponse, isLoading: isJiraStatsLoading } = useDashboardGetJiraStats()

    const dashboardData = (data as any)
    const healthData = (healthDataResponse as any)
    const githubStats = (githubStatsResponse as any)
    const jiraStats = (jiraStatsResponse as any)

    // Live data from API
    const team = dashboardData?.team_members
    const utilization = dashboardData?.team_utilization
    const tasks = dashboardData?.active_tasks
    const pending = dashboardData?.pending_assignments
    const allocation = dashboardData?.resource_allocation_by_team
    const status = dashboardData?.resource_utilization

    // Format current date
    const today = new Date()
    const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <div className="p-6 space-y-6">

            {/* Page Header */}
            <div className="animate-fade-in-up">
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    {formattedDate} — Here&apos;s your team overview
                </p>
            </div>

            {/* Stat Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="animate-fade-in-up stagger-1">
                    <StatCard
                        title="Team Members"
                        value={isLoading ? "..." : String(team?.total ?? 0)}
                        message={isLoading ? "Loading..." : `+${team?.new_this_month ?? 0} this month`}
                        icon={Users}
                        isLoading={isLoading}
                    />
                </div>
                <div className="animate-fade-in-up stagger-2">
                    <StatCard
                        title="Team Utilization"
                        value={isLoading ? "..." : `${utilization?.percentage ?? 0}%`}
                        message={isLoading ? "Loading..." : (utilization?.message ?? "N/A")}
                        icon={TrendingUp}
                        isLoading={isLoading}
                    />
                </div>
                <div className="animate-fade-in-up stagger-3">
                    <StatCard
                        title="Active Tasks"
                        value={isLoading ? "..." : String(tasks?.active_count ?? 0)}
                        message={isLoading ? "Loading..." : `${tasks?.completed_this_week ?? 0} completed this week`}
                        icon={CircleCheckBig}
                        isLoading={isLoading}
                    />
                </div>
                <div className="animate-fade-in-up stagger-4">
                    <StatCard
                        title="Pending Assignments"
                        value={isLoading ? "..." : String(pending?.count ?? 0)}
                        message={isLoading ? "Loading..." : (pending?.message ?? "N/A")}
                        icon={Clock}
                        isLoading={isLoading}
                    />
                </div>
            </div>

            {/* Charts & Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="animate-fade-in-up stagger-5">
                    <IntegrationsHealthCard
                        data={healthData}
                        isLoading={isHealthLoading}
                    />
                </div>
                <div className="animate-fade-in-up stagger-7">
                    <ChartPieDonutText data={status} />
                </div>
                
                <div className="animate-fade-in-up stagger-5 lg:col-span-2">
                    <GithubPrStatsCard
                        data={githubStats}
                        isLoading={isGithubStatsLoading}
                    />
                </div>
            </div>

            {/* Charts & Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="animate-fade-in-up stagger-5 lg:col-span-2">
                    <JiraTasksStatsCard
                        data={jiraStats}
                        isLoading={isJiraStatsLoading}
                    />
                </div>
                <div className="animate-fade-in-up stagger-5 lg:col-span-2">
                    <ChartBarLabel data={allocation} />
                </div>
            </div>

        </div>
    )
}
