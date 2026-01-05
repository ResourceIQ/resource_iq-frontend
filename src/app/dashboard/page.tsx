export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                <p className="text-muted-foreground">Welcome back to your ResourceIQ dashboard.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Placeholder cards */}
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-32 rounded-xl border bg-card text-card-foreground shadow-sm animate-pulse" />
                ))}
            </div>

            <div className="h-[400px] rounded-xl border bg-card text-card-foreground shadow-sm flex items-center justify-center text-muted-foreground italic">
                Platform content coming soon...
            </div>
        </div>
    )
}
