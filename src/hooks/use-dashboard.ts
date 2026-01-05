import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { githubApi, authApi } from "@/lib/api-client"
import { Developer, User } from "@/types"

export function useDashboard() {
    const [developers, setDevelopers] = useState<Developer[]>([])
    const [prs, setPrs] = useState<Record<string, any>>({})
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/sign-in")
            return
        }

        const fetchData = async () => {
            try {
                const [me, devs, prData] = await Promise.all([
                    authApi.getMe(),
                    githubApi.getDevelopers().catch(() => []),
                    githubApi.getClosedPrsAll().catch(() => ({})),
                ])
                setUser(me)
                setDevelopers(devs)
                setPrs(prData)
            } catch (error) {
                console.error("Failed to fetch data:", error)
                localStorage.removeItem("token")
                router.push("/sign-in")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem("token")
        router.push("/sign-in")
    }

    return {
        developers,
        prs,
        loading,
        user,
        handleLogout,
    }
}
