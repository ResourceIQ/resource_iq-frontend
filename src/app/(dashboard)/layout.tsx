import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-col flex-1 w-full min-h-screen bg-gray-50/50 dark:bg-background">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white dark:bg-card">
                    <SidebarTrigger className="-ml-1" />
                    <div className="flex-1">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">ResourceIQ Platform</h2>
                    </div>
                </header>
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}
