import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
    label: string
    value: string
    description: string
    icon: LucideIcon
    trend?: string
    color?: string
}

export function StatCard({ label, value, description, icon: Icon, trend, color }: StatCardProps) {
    return (
        <Card className="border-none shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-800 overflow-hidden bg-white dark:bg-neutral-900">
            <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 ${color}`}>
                        <Icon className="h-5 w-5" />
                    </div>
                    {trend && (
                        <span
                            className={`text-xs font-bold ${trend.startsWith("+") ? "text-emerald-500" : "text-amber-500"
                                } bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg`}
                        >
                            {trend}
                        </span>
                    )}
                </div>
                <div className="space-y-1">
                    <p className="text-xl font-bold tracking-tight">{value}</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">{label}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-50 dark:border-neutral-800">
                    <p className="text-[11px] text-neutral-500 font-medium">{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}
