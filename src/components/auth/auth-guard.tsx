"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token")
            const isAuthPage = pathname === "/sign-in"

            if (!token) {
                if (!isAuthPage) {
                    router.replace("/sign-in")
                    setIsAuthenticated(false)
                } else {
                    setIsAuthenticated(false)
                }
            } else {
                if (isAuthPage) {
                    router.replace("/dashboard")
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(true)
                }
            }
        }

        checkAuth()

        // Optional: Listen for storage changes (e.g. if logout happens in another tab)
        window.addEventListener("storage", checkAuth)
        return () => window.removeEventListener("storage", checkAuth)
    }, [pathname, router])

    // While checking authentication, show nothing or a loading state
    if (isAuthenticated === null) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    // If we are on sign-in and have token, we are redirecting, so show nothing
    if (isAuthenticated && pathname === "/sign-in") {
        return null
    }

    // If we are NOT on sign-in and DON'T have token, we are redirecting, so show nothing
    if (!isAuthenticated && pathname !== "/sign-in") {
        return null
    }

    return <>{children}</>
}
