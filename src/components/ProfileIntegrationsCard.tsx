import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plug, Trello, Github } from "lucide-react";
import { ProfileIntegrationsCard as ProfileIntegrationsCardModel } from "@/api/model/profileIntegrationsCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileIntegrationsCardProps {
  data?: ProfileIntegrationsCardModel;
  isLoading: boolean;
}

export function ProfileIntegrationsCard({ data, isLoading }: ProfileIntegrationsCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <Plug className="h-4 w-4" />
            Team Integrations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <div className="flex gap-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <div className="flex gap-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
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
            <Plug className="h-4 w-4" />
            Team Integrations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-muted-foreground mt-2">No adoption data</div>
        </CardContent>
      </Card>
    );
  }

  // Calculate totals and percentages
  const totalJira = data.jira_connected + data.jira_unconnected;
  const jiraConnectedPercent = totalJira > 0 ? Math.round((data.jira_connected / totalJira) * 100) : 0;
  
  const totalGithub = data.github_connected + data.github_unconnected;
  const githubConnectedPercent = totalGithub > 0 ? Math.round((data.github_connected / totalGithub) * 100) : 0;

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-2">
            <Plug className="h-4 w-4" />
            Integration Adoption
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mt-2">
          
          {/* Jira Integration Stats */}
          <div className="bg-secondary/20 p-3 rounded-lg flex flex-col justify-between h-full border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Trello className="h-4 w-4 text-[#0052CC]" />
              <span className="text-sm font-semibold">Jira</span>
              <span className="ml-auto text-xs font-bold text-muted-foreground">
                {jiraConnectedPercent}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-green-500/10 rounded-md p-2">
                <div className="text-xl font-bold text-green-600 dark:text-green-500">
                  {data.jira_connected}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  Linked
                </div>
              </div>
              <div className="bg-red-500/10 rounded-md p-2">
                <div className="text-xl font-bold text-red-600 dark:text-red-500">
                  {data.jira_unconnected}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  Missing
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Integration Stats */}
          <div className="bg-secondary/20 p-3 rounded-lg flex flex-col justify-between h-full border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Github className="h-4 w-4" />
              <span className="text-sm font-semibold">GitHub</span>
              <span className="ml-auto text-xs font-bold text-muted-foreground">
                {githubConnectedPercent}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-green-500/10 rounded-md p-2">
                <div className="text-xl font-bold text-green-600 dark:text-green-500">
                  {data.github_connected}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  Linked
                </div>
              </div>
              <div className="bg-red-500/10 rounded-md p-2">
                <div className="text-xl font-bold text-red-600 dark:text-red-500">
                  {data.github_unconnected}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  Missing
                </div>
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
