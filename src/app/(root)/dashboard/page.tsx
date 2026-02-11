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

            <div className="grid grid-cols-3 gap-6">
                
                <div className="col-span-2 border border-black p-6 rounded-xl min-h-[400px]">
                    <h3 className="font-bold">Team Workload Distribution</h3>
                    <p className="text-sm text-gray-500">Current capacity usage by developer</p>
                </div>

                <div className="col-span-1 border border-black p-6 rounded-xl">
                    <h3 className="font-bold">Utilization Status</h3>
                    <p className="text-sm text-gray-500">Team distribution</p>
                </div>

            </div>
            
        </div>
    )
}

