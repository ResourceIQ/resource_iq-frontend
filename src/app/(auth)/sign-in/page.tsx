"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { authApi } from "@/lib/api-client"
import { useRouter } from "next/navigation"

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
            
            router.push("/")
        } catch (err: any) {
            setError(err.message || "Invalid email or password")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-background p-4 animate-in fade-in duration-500">
            <div className="mb-8 text-center space-y-2">
                <div className="flex justify-center mb-4">
                    <Icons.logo className="h-16 w-16 text-primary" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">ResourceIQ</h1>
                <p className="text-lg text-muted-foreground">Intelligent Task Allocation Platform</p>
            </div>

            <Card className="w-full max-w-md shadow-lg border-muted/40">
                <form onSubmit={handleSubmit}>
                    <CardContent className="pt-8 space-y-6">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email" 
                                placeholder="name@example.com" 
                                type="email" 
                                className="h-11" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password" 
                                placeholder="••••••••" 
                                type="password" 
                                className="h-11" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button 
                            className="w-full h-11 text-base font-medium shadow-sm" 
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                    </CardContent>
                </form>
                <CardFooter className="pb-8 pt-0">
                    <Link href="#" className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors">
                        Forgot password?
                    </Link>
                </CardFooter>
            </Card>

            <footer className="mt-12 text-sm font-medium text-muted-foreground">
                © 2025 ResourceIQ. All rights reserved.
            </footer>
        </div>
    )
}
