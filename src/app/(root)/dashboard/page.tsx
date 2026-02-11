import { StatCard } from "@/components/StatCard"


export default function DashboardPage() {
    return (
        <div className="p-6">{/* This is the root container */}
            
            <div className="grid grid-cols-4 gap-4 mb-8">
                <StatCard title="Team Members" value="6" />
                <StatCard title="Team Utilization" value="59%" />
                <StatCard title="Active Tasks" value="9" />
                <StatCard title="Pending Assignments" value="5" />
            </div>

            
        </div>
    )
}

