import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitPullRequest, GitMerge, Users, LayoutList } from "lucide-react";
import { GitHubPRStatsCard as GitHubPRStatsCardModel } from "@/api/model/gitHubPRStatsCard";

interface GithubPrStatsCardProps {
  data?: GitHubPRStatsCardModel;
  isLoading: boolean;
}

export function GithubPrStatsCard({ data, isLoading }: GithubPrStatsCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full h-full min-h-[300px]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <GitPullRequest className="h-4 w-4" />
            GitHub PR Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="w-full h-full min-h-[300px]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <GitPullRequest className="h-4 w-4" />
            GitHub PR Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">No data available</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full min-h-[300px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-2">
            <GitPullRequest className="h-4 w-4" />
            Pull Requests Overview
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col mb-4">
          <span className="text-3xl font-bold text-primary">{data.total_active_prs}</span>
          <span className="text-xs text-muted-foreground">Total Active PRs</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Repositories */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground mb-2 shadow-sm border-b pb-1">
              <LayoutList className="h-3.5 w-3.5" />
              Active by Repository
            </div>
            {data.prs_by_repo?.length > 0 ? (
              <ul className="space-y-1.5">
                {data.prs_by_repo.map((repo, idx) => (
                  <li key={idx} className="flex justify-between items-center text-xs">
                    <span className="truncate max-w-[120px] font-medium" title={repo.repo_name}>
                      {repo.repo_name}
                    </span>
                    <span className="bg-secondary px-2 py-0.5 rounded-full font-bold">
                      {repo.count}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-xs text-muted-foreground">No repo data</div>
            )}
          </div>

          {/* Contributors */}
          <div className="space-y-2 border-l pl-4">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground mb-2 shadow-sm border-b pb-1">
              <Users className="h-3.5 w-3.5" />
              Top Contributors
            </div>
            {data.top_contributors?.length > 0 ? (
              <ul className="space-y-1.5">
                {data.top_contributors.slice(0, 5).map((contributor, idx) => (
                  <li key={idx} className="flex justify-between items-center text-xs">
                    <span className="truncate max-w-[100px] font-medium" title={contributor.author_login}>
                      @{contributor.author_login}
                    </span>
                    <span className="bg-secondary px-2 py-0.5 rounded-full font-bold">
                      {contributor.count}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
               <div className="text-xs text-muted-foreground">No contributor data</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
