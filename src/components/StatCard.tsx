import { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface StatCardProps {
  title: string;
  value: string;
  message: string;
  icon: LucideIcon;
  isLoading?: boolean;
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  message, 
  icon: Icon,
  isLoading = false,
  className = "",
}: StatCardProps) {
  if (isLoading) {
    return (
      <Card className={`w-full transition-shadow hover:shadow-md ${className}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-bold uppercase tracking-wide text-muted-foreground flex items-center justify-between">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Skeleton className="h-8 w-20 mb-2" />
          <Skeleton className="h-4 w-32" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full transition-shadow hover:shadow-md ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-wide text-muted-foreground flex items-center justify-between">
          {title}
          <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10">
            <Icon className="h-4.5 w-4.5 text-primary" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <h2 className="text-3xl font-bold tracking-tight">{value}</h2>
        <p className="text-sm text-muted-foreground mt-1">{message}</p>
      </CardContent>
    </Card>
  );
}