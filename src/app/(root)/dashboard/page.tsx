import { StatCard } from "@/components/StatCard"
import { Users ,Clock,TrendingUp,CircleCheckBig} from 'lucide-react';


export default function DashboardPage() {
    return (
        <div className="p-6">
            
            <div className="grid grid-cols-4 gap-4 mb-8">
                <StatCard title="Team Members" value="6" massage="+2 this month" Iconname={Users}/>
                <StatCard title="Team Utilization" value="59%" massage="Monitor closely"Iconname={TrendingUp}/>
                <StatCard title="Active Tasks" value="9" massage="12 completed this week"Iconname={CircleCheckBig}/>
                <StatCard title="Pending Assignments" value="5" massage="Needs attention"Iconname={Clock}/>
            </div>

            
        </div>
    )
}

