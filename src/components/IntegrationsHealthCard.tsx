import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle2, XCircle, AlertTriangle, Clock } from "lucide-react";
import { ConnectedIntegrationsCard } from "@/api/model/connectedIntegrationsCard";

interface IntegrationsHealthCardProps {
  data?: ConnectedIntegrationsCard;
  isLoading: boolean;
}

export function IntegrationsHealthCard({ data, isLoading }: IntegrationsHealthCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <Activity className="h-4 w-4" />
            Integrations Health
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
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <Activity className="h-4 w-4" />
            Integrations Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">No data</div>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "healthy":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const StatusIcon = () => {
    switch (data.health_status?.toLowerCase()) {
      case "healthy":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Integrations Status
          </div>
          <StatusIcon />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold mb-1 ${getStatusColor(data.health_status)}`}>
          {data.health_status || "Unknown"}
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          {data.health_message || "No status message"}
        </p>
        
        <div className="space-y-3">
          {/* Jira Integration Details */}
          <div className="bg-secondary/20 p-3 rounded-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Jira</span>
              {data.jira_connected ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
            </div>
            
            {data.jira_connected && (
              <div className="space-y-1 text-xs text-muted-foreground">
                {data.jira_site_url && (
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Site:</span> {new URL(data.jira_site_url).hostname || data.jira_site_url}
                  </div>
                )}
                {data.jira_token_expires_at && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span className="font-medium">Token exp:</span> 
                    <span className={data.jira_token_expiring_soon ? "text-yellow-500 font-medium" : ""}>
                      {new Date(data.jira_token_expires_at).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* GitHub Integration Details */}
          <div className="bg-secondary/20 p-3 rounded-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">GitHub</span>
              {data.github_connected ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
            </div>
            
            {data.github_connected && data.github_org_name && (
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">Organization:</span> {data.github_org_name}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
