import { LucideIcon } from "lucide-react";

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
    <div className="border border-black p-6 rounded-lg">
      <p className="text-xs font-bold uppercase">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>

      <div className="px-1 gap-2 flex items-start mx mt-4">
        <Iconname className="h-5 w-5 text-gray-600" />
        <p>{massage}</p>
      </div>
    </div>
  );
}