"use client"

import { StatCard } from "@/components/StatCard"
import { Users, Clock, TrendingUp, CircleCheckBig, Activity } from "lucide-react"
import { ChartPieDonutText } from "@/components/chart-pie-donut"
import { ChartBarLabel } from "@/components/chart-bar"
import { IntegrationsHealthCard } from "@/components/IntegrationsHealthCard"
import { GithubPrStatsCard } from "@/components/GithubPrStatsCard"
import { useDashboardGetDashboard, useDashboardGetIntegrationsHealth, useDashboardGetGithubStats } from "@/api/generated/dashboard/dashboard"

export default function DashboardPage() {
    const { data, isLoading } = useDashboardGetDashboard()
    const { data: healthDataResponse, isLoading: isHealthLoading } = useDashboardGetIntegrationsHealth()
    const { data: githubStatsResponse, isLoading: isGithubStatsLoading } = useDashboardGetGithubStats()
    
    const dashboardData = (data as any)
    const healthData = (healthDataResponse as any)
    const githubStats = (githubStatsResponse as any)

    // Live data from API
    const team = dashboardData?.team_members
    const utilization = dashboardData?.team_utilization
    const tasks = dashboardData?.active_tasks
    const pending = dashboardData?.pending_assignments
    const allocation = dashboardData?.resource_allocation_by_team
    const status = dashboardData?.resource_utilization

    return (
        <div className="p-4">

            <div className="grid grid-cols-5 gap-4 mb-8">
                <StatCard
                    title="Team Members"
                    value={isLoading ? "..." : String(team?.total ?? 0)}
                    massage={isLoading ? "Loading..." : `+${team?.new_this_month ?? 0} this month`}
                    Iconname={Users}
                />
                <StatCard
                    title="Team Utilization"
                    value={isLoading ? "..." : `${utilization?.percentage ?? 0}%`}
                    massage={isLoading ? "Loading..." : (utilization?.message ?? "N/A")}
                    Iconname={TrendingUp}
                />
                <StatCard
                    title="Active Tasks"
                    value={isLoading ? "..." : String(tasks?.active_count ?? 0)}
                    massage={isLoading ? "Loading..." : `${tasks?.completed_this_week ?? 0} completed this week`}
                    Iconname={CircleCheckBig}
                />
                <StatCard
                    title="Pending Assignments"
                    value={isLoading ? "..." : String(pending?.count ?? 0)}
                    massage={isLoading ? "Loading..." : (pending?.message ?? "N/A")}
                    Iconname={Clock}
                /> 
            </div>

            <div className="grid grid-cols-4 gap-4">
                
                <IntegrationsHealthCard 
                        data={healthData} 
                        isLoading={isHealthLoading} 
                        />

                 <GithubPrStatsCard
                        data={githubStats}
                        isLoading={isGithubStatsLoading}
                    />

                <ChartPieDonutText data={status} />



            </div>

            <div className="grid grid-cols-8 gap-4">

                
                
                <div className="col-span-2 h-full">
                    <ChartBarLabel data={allocation} />
                </div>
                

                
            </div>

        </div>
    )
}
