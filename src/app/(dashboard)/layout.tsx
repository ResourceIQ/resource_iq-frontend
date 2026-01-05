import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/newsidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white dark:bg-card shadow-sm sticky top-0 z-10">
                    <SidebarTrigger className="-ml-1" />
                    <div className="flex-1 px-4">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">ResourceIQ Platform</h2>
                    </div>
                </header>
                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto bg-gray-50/30 dark:bg-background/30">
                    <div className="max-w-7xl mx-auto h-full">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
