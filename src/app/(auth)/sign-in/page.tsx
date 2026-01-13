"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authApi } from "@/lib/api-client"
import { LoginForm } from "@/components/login-form"

export default function SignInPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const formData = new FormData()
            formData.append("username", email)
            formData.append("password", password)

            const data = await authApi.login(formData)
            localStorage.setItem("token", data.access_token)

            router.push("/dashboard")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Invalid email or password")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">
                <LoginForm 
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    isLoading={isLoading}
                    error={error}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}