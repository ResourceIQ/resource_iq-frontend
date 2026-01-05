"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { authApi } from "@/lib/api-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

import {
    LayoutDashboard,
    Briefcase,
    Users,
    Settings,
    Folder,
    MoreHorizontal,
    LogOut,
} from "lucide-react"

export function AppSidebar() {
    const router = useRouter()
    return (
        <Sidebar collapsible="icon">
            {/* Header */}
            <SidebarHeader>
                <div className="flex items-center gap-2 px-2">
                    <div className="h-8 w-8 rounded-md bg-primary" />
                    <span className="font-semibold">ResourceIQ</span>
                </div>
            </SidebarHeader>

            {/* Main content */}
            <SidebarContent>
                {/* Platform */}
                <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <LayoutDashboard />
                                    <span>Dashboard</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton isActive>
                                    <Briefcase />
                                    <span>Best Fit</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Users />
                                    <span>Developers</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Settings />
                                    <span>Configuration</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Projects */}
                <SidebarGroup>
                    <SidebarGroupLabel>Projects</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Folder />
                                    <span>Design Engineering</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Folder />
                                    <span>Sales & Marketing</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Folder />
                                    <span>Travel</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <MoreHorizontal />
                                    <span>More</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter>
                <div className="flex flex-col gap-4 p-2">
                    <div className="flex items-center gap-2">
                        <img
                            src="https://github.com/shadcn.png"
                            className="h-8 w-8 rounded-full"
                            alt="User"
                        />
                        <div className="text-sm overflow-hidden">
                            <div className="font-medium truncate">Senuja J</div>
                            <div className="text-muted-foreground truncate">
                                senuja.j@resourceiq.lk
                            </div>
                        </div>
                    </div>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={() => {
                                    authApi.logout()
                                    router.push("/sign-in")
                                }}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 w-full"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
