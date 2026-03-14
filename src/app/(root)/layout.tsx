"use client" // Layout needs to be client-side to hold the ref

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/newsidebar"
import BreadcrumbHeader from "@/components/layout/breadcrumb-header"
import LoadingBar from "react-top-loading-bar"
import { HeaderLoaderProvider, useHeaderLoader } from "@/hooks/use-header-loader" // Import our new hook

function LayoutContent({ children }: { children: React.ReactNode }) {
    const { loaderRef } = useHeaderLoader()

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white dark:bg-card shadow-sm sticky top-0 z-10 relative">
                    <BreadcrumbHeader />
                    <div className="absolute bottom-0 left-0 w-full z-50">
                        <LoadingBar 
                            color="linear-gradient(to right, rgb(45, 212, 191), rgb(168, 85, 247))"
                            ref={loaderRef} 
                            shadow={false}
                            height={2}
                            containerStyle={{ position: 'absolute', width: '100%' }}
                        />
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-4 lg:p-4 overflow-auto bg-gray-50/30 dark:bg-background/30">
                    <div className="mx-auto h-full">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <HeaderLoaderProvider>
            <LayoutContent>{children}</LayoutContent>
        </HeaderLoaderProvider>
    )
}