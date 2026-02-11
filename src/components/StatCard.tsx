import { LucideIcon } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function StatCard({ 
  title, 
  value, 
  massage, 
  Iconname 
}: { 
  title: string; 
  value: string; 
  massage: string; 
  Iconname: LucideIcon; 
}) {
  return (
  <Card className="w-full max-w-sm">
  <div className="px-8 py-6 rounded-lg">  {/* Changed from p-6 to px-8 py-6 */}
      <p className="text-xs font-bold uppercase">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>

    <div className="px-1 gap-2 flex items-start mt-4">  {/* Fixed mx typo */}
        <Iconname className="h-5 w-5 text-gray-600" />
        <p>{massage}</p>
      </div>
    </div>
  </Card>

  );
}