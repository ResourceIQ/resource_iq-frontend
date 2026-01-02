"use client"

import {
    Users, GitPullRequest, LayoutDashboard, Briefcase,
    BarChart3, Settings, Bell, Search, Plus,
    Clock, CheckCircle2, AlertCircle, ChevronRight,
    LogOut
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { StatCard } from "@/components/common/stat-card"
import { useDashboard } from "../hooks/use-dashboard"
import { Loader2 } from "lucide-react"

export function DashboardShell() {
    const { developers, prs, loading, user, handleLogout } = useDashboard()

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-white dark:bg-neutral-950">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-sm font-medium text-muted-foreground animate-pulse">Initializing ResourceIQ...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white dark:bg-neutral-900 hidden lg:block">
                <div className="flex h-full flex-col p-4 shadow-sm">
                    <div className="flex items-center gap-3 px-2 mb-10">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <Icons.logo className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">ResourceIQ</span>
                    </div>

                    <nav className="flex-1 space-y-1">
                        <SidebarLink icon={LayoutDashboard} label="Overview" active />
                        <SidebarLink icon={Briefcase} label="Projects" />
                        <SidebarLink icon={Users} label="Developers" count={developers.length} />
                        <SidebarLink icon={BarChart3} label="Analytics" />
                        <SidebarLink icon={Settings} label="Settings" />
                    </nav>

                    <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800">
                        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer group">
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold group-hover:scale-105 transition-transform">
                                {user?.email?.[0]?.toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate leading-none mb-1">{user?.full_name || 'Admin User'}</p>
                                <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400" onClick={handleLogout}>
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 p-4 md:p-8 lg:p-10">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">Good Morning, Admin</h1>
                        <p className="text-neutral-500 font-medium">Here's what's happening across your resources today.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="h-10 pl-10 pr-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-60"
                            />
                        </div>
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-neutral-900"></span>
                        </Button>
                        <Button className="h-10 rounded-xl gap-2 px-4 shadow-sm bg-primary hover:bg-primary/90">
                            <Plus className="h-4 w-4" />
                            <span>New Project</span>
                        </Button>
                    </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard
                        label="Platform Health"
                        value="98%"
                        description="All systems operational"
                        icon={BarChart3}
                        trend="+2.1%"
                        color="text-primary"
                    />
                    <StatCard
                        label="Active Devs"
                        value={developers.length.toString()}
                        description="Currently assigned"
                        icon={Users}
                        trend="+0"
                        color="text-emerald-500"
                    />
                    <StatCard
                        label="Open Tasks"
                        value="24"
                        description="12 due today"
                        icon={Clock}
                        trend="-4"
                        color="text-amber-500"
                    />
                    <StatCard
                        label="Closed PRs"
                        value={Object.values(prs).flat().length.toString()}
                        description="Past 7 days"
                        icon={GitPullRequest}
                        trend="+18%"
                        color="text-indigo-500"
                    />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <Card className="xl:col-span-2 border-none shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-800 overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <div>
                                <CardTitle className="text-xl">Resource Activity</CardTitle>
                                <CardDescription>Real-time updates from integrated repositories</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary font-semibold hover:bg-primary/5">View All</Button>
                        </CardHeader>
                        <CardContent className="p-0 border-t">
                            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                {Object.values(prs).flat().length > 0 ? (
                                    Object.entries(prs).slice(0, 5).map(([author, activities]: [string, any], i) => (
                                        <div key={i} className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/20 transition-colors">
                                            {activities.slice(0, 1).map((pr: any, j: number) => (
                                                <div key={j} className="flex gap-4">
                                                    <div className="mt-1 h-10 w-10 shrink-0 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-neutral-600 dark:text-neutral-400 capitalize">
                                                        {author[0]}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="font-bold text-sm">{author}</span>
                                                            <span className="text-xs text-neutral-400">{new Date(pr.closed_at).toLocaleDateString()}</span>
                                                        </div>
                                                        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 line-clamp-1 mb-2">
                                                            Merged: <span className="text-neutral-900 dark:text-neutral-100 font-semibold">{pr.title}</span>
                                                        </p>
                                                        <div className="flex items-center gap-3">
                                                            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-100 dark:border-emerald-800/50">
                                                                <CheckCircle2 className="h-3 w-3" />
                                                                Completed
                                                            </span>
                                                            <span className="text-xs text-neutral-400 flex items-center gap-1">
                                                                #{pr.number} • GitHub Integration
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-10 flex flex-col items-center justify-center text-center space-y-3">
                                        <div className="h-12 w-12 rounded-2xl bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center text-neutral-400 ring-1 ring-neutral-200 dark:ring-neutral-800">
                                            <AlertCircle className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">No activity found</p>
                                            <p className="text-sm text-neutral-500">Connect your GitHub app to see live insights.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="border-none shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-800">
                            <CardHeader>
                                <CardTitle className="text-lg">Featured Developers</CardTitle>
                                <CardDescription>Highly active contributors</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {developers.length > 0 ? (
                                    developers.slice(0, 5).map((dev, i) => (
                                        <div key={i} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden">
                                                        {dev.avatar_url ? <img src={dev.avatar_url} alt={dev.login} className="h-full w-full object-cover" /> : dev.login?.[0]?.toUpperCase()}
                                                    </div>
                                                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white dark:border-neutral-900"></span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold">{dev.login}</p>
                                                    <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-tight">{dev.type}</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-4 text-center">
                                        <p className="text-sm text-neutral-500 italic">No developers synced yet.</p>
                                    </div>
                                )}
                                <Button variant="outline" className="w-full mt-2 rounded-xl border-dashed">Manage Team</Button>
                            </CardContent>
                        </Card>

                        <Card className="border-none bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                                        <LayoutDashboard className="h-5 w-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-lg leading-tight">AI Insights Available</h3>
                                        <p className="text-sm text-primary-foreground/80 leading-snug">Generate smart resource allocation reports using our new AI module.</p>
                                    </div>
                                    <Button variant="secondary" className="w-full font-bold shadow-sm">Enable AI Core</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}

function SidebarLink({ icon: Icon, label, active = false, count }: any) {
    return (
        <a
            href="#"
            className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all ${active
                    ? 'bg-primary/10 text-primary font-bold shadow-sm ring-1 ring-primary/20'
                    : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
        >
            <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${active ? 'text-primary' : ''}`} />
                <span className="text-sm uppercase tracking-wider font-bold antialiased text-[11px]">{label}</span>
            </div>
            {count !== undefined && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 font-bold text-neutral-500">
                    {count}
                </span>
            )}
        </a>
    )
}
