import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trello, Users, LayoutList, AlertCircle } from "lucide-react";
import { JiraTaskStatsCard as JiraTaskStatsCardModel } from "@/api/model/jiraTaskStatsCard";
import { Skeleton } from "@/components/ui/skeleton";

interface JiraTasksStatsCardProps {
  data?: JiraTaskStatsCardModel;
  isLoading: boolean;
}

export function JiraTasksStatsCard({ data, isLoading }: JiraTasksStatsCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <Trello className="h-4 w-4" />
            Jira Task Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Skeleton className="h-8 w-16 mb-1" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="w-full h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <Trello className="h-4 w-4" />
            Jira Task Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-muted-foreground">No data available</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-2">
            <Trello className="h-4 w-4" />
            Jira Workload Overview
          </div>
          {data.unassigned_tasks > 0 && (
            <div className="flex items-center gap-1 text-amber-500 text-[10px] font-bold uppercase">
              <AlertCircle className="h-3 w-3" />
              {data.unassigned_tasks} Unassigned
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col mb-4">
          <span className="text-3xl font-bold text-primary">{data.total_active_tasks}</span>
          <span className="text-xs text-muted-foreground">Total Active Tasks</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Projects */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground mb-2 border-b pb-1">
              <LayoutList className="h-3.5 w-3.5" />
              By Project
            </div>
            {data.tasks_by_project?.length > 0 ? (
              <ul className="space-y-1.5">
                {data.tasks_by_project.map((project, idx) => (
                  <li key={idx} className="flex justify-between items-center text-xs">
                    <span className="truncate max-w-[80px] font-medium" title={project.project_key}>
                      {project.project_key}
                    </span>
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold text-[11px]">
                      {project.count}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-xs text-muted-foreground">No project data</div>
            )}
          </div>

          {/* Top Assignees */}
          <div className="space-y-2 border-l pl-4">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground mb-2 border-b pb-1">
              <Users className="h-3.5 w-3.5" />
              Top Assignees
            </div>
            {data.top_assignees?.length > 0 ? (
              <ul className="space-y-1.5">
                {data.top_assignees.map((assignee, idx) => (
                  <li key={idx} className="flex justify-between items-center text-xs">
                    <span className="truncate max-w-[100px] font-medium" title={assignee.assignee_account_id ?? undefined}>
                      {(assignee.assignee_account_id ?? 'Unknown').split(':').pop()?.slice(0, 8)}...
                    </span>
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold text-[11px]">
                      {assignee.count}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
               <div className="text-xs text-muted-foreground">No assignee data</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
