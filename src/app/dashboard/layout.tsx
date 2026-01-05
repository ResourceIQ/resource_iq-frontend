"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { authApi, githubApi } from "@/lib/api-client"
import { User } from "@/types"
import { Loader2 } from "lucide-react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<User | null>(null)
    const [devsCount, setDevsCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/sign-in")
            return
        }

        const initData = async () => {
            try {
                const [me, devs] = await Promise.all([
                    authApi.getMe(),
                    githubApi.getDevelopers().catch(() => [])
                ])
                setUser(me)
                setDevsCount(devs.length)
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error)
                localStorage.removeItem("token")
                router.push("/sign-in")
            } finally {
                setLoading(false)
            }
        }

        initData()
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem("token")
        router.push("/sign-in")
    }

    const currentPath = pathname.split("/").pop() || "overview"

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-white dark:bg-neutral-950">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading ResourceIQ...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-neutral-50/50 dark:bg-neutral-950">
            <Sidebar
                user={user}
                developersCount={devsCount}
                onLogout={handleLogout}
                currentPath={currentPath}
            />
            <main className="flex-1 lg:ml-64 p-4 md:p-8 lg:p-10">
                {children}
            </main>
        </div>
    )
}
