import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function SignInPage() {
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
                <CardContent className="pt-8 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="Value" type="email" className="h-11" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" placeholder="Value" type="password" className="h-11" />
                    </div>
                    <Button className="w-full h-11 text-base font-medium shadow-sm">Sign In</Button>
                </CardContent>
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
