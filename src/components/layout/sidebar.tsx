"use client"

import { LucideIcon, LogOut, LayoutDashboard, Briefcase, Users, BarChart3, Settings } from "lucide-react"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { User } from "@/types"

interface SidebarLinkProps {
    icon: LucideIcon
    label: string
    active?: boolean
    count?: number
    href?: string
}

function SidebarLink({ icon: Icon, label, active = false, count, href = "#" }: SidebarLinkProps) {
    return (
        <a
            href={href}
            className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all ${active
                ? "bg-primary/10 text-primary font-bold shadow-sm ring-1 ring-primary/20"
                : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                }`}
        >
            <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${active ? "text-primary" : ""}`} />
                <span className="text-[11px] uppercase tracking-wider font-bold antialiased">{label}</span>
            </div>
            {count !== undefined && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 font-bold text-neutral-500">
                    {count}
                </span>
            )}
        </a>
    )
}

interface SidebarProps {
    user: User | null
    developersCount: number
    onLogout: () => void
    currentPath?: string
}

export function Sidebar({ user, developersCount, onLogout, currentPath = "overview" }: SidebarProps) {
    const navItems = [
        { icon: LayoutDashboard, label: "Overview", id: "overview" },
        { icon: Briefcase, label: "Projects", id: "projects" },
        { icon: Users, label: "Developers", id: "developers", count: developersCount },
        { icon: BarChart3, label: "Analytics", id: "analytics" },
        { icon: Settings, label: "Settings", id: "settings" },
    ]

    // Note: Replacing Icons.logo with actual lucide icons in the list below for better visual
    // This is a placeholder since the original code had them passed as props

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white dark:bg-neutral-900 hidden lg:block">
            <div className="flex h-full flex-col p-4 shadow-sm">
                <div className="flex items-center gap-3 px-2 mb-10">
                    <div className="bg-primary p-1.5 rounded-lg">
                        <Icons.logo className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">ResourceIQ</span>
                </div>

                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => (
                        <SidebarLink
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            active={currentPath === item.id}
                            count={item.count}
                            href={`/dashboard/${item.id === 'overview' ? '' : item.id}`}
                        />
                    ))}
                </nav>

                <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer group">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold group-hover:scale-105 transition-transform">
                            {user?.email?.[0]?.toUpperCase() || "A"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate leading-none mb-1">
                                {user?.full_name || "Admin User"}
                            </p>
                            <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-neutral-400"
                            onClick={onLogout}
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </aside>
    )
}
