import { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Field } from "./ui/field";

interface StatCardProps {
  title: string;
  value: string;
  message: string;
  icon: LucideIcon;
  isLoading?: boolean;
  className?: string;
  filed1Name?: string;
  filed1?: string;
  filed2Name?: string;
  filed2?: string;
}

export function StatCard({
  title,
  value,
  message,
  icon: Icon,
  isLoading = false,
  className = "",
  filed1Name,
  filed1,
  filed2Name,
  filed2,
}: StatCardProps) {
  if (isLoading) {
    return (
      <Card className={`w-full h-full transition-shadow hover:shadow-md ${className} flex flex-col`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-bold uppercase tracking-wide text-muted-foreground flex items-center justify-between">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex-1">
          <Skeleton className="h-8 w-20 mb-2" />
          <Skeleton className="h-4 w-32" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full h-full transition-shadow hover:shadow-md ${className} flex flex-col`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-wide text-muted-foreground flex items-center justify-between">
          {title}
          <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10">
            <Icon className="h-4.5 w-4.5 text-primary" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{value}</h2>

          {/*additional fields */}
          {(filed1Name || filed2Name) && (
            <div className="mt-2 space-y-1">
              {filed1Name && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{filed1Name}</span>
                  <span className="font-medium">{filed1}</span>
                </div>
              )}
              {filed2Name && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{filed2Name}</span>
                  <span className="font-medium">{filed2}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground mt-1">{message}</p>
      </CardContent>
    </Card>
  );
}