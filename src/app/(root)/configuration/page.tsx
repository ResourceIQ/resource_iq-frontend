"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { jiraApi, JiraConnectionStatus, githubApi, GitHubConnectionStatus } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function ConfigurationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Jira state
  const [jiraStatus, setJiraStatus] = useState<JiraConnectionStatus | null>(null);
  const [isJiraLoading, setIsJiraLoading] = useState(true);
  const [isJiraConnecting, setIsJiraConnecting] = useState(false);
  const [isJiraDisconnecting, setIsJiraDisconnecting] = useState(false);

  // GitHub state
  const [githubStatus, setGithubStatus] = useState<GitHubConnectionStatus | null>(null);
  const [isGithubLoading, setIsGithubLoading] = useState(true);
  const [isGithubConnecting, setIsGithubConnecting] = useState(false);
  const [isGithubDisconnecting, setIsGithubDisconnecting] = useState(false);

  // Shared state
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchJiraStatus = useCallback(async () => {
    try {
      setIsJiraLoading(true);
      const status = await jiraApi.getConnectionStatus();
      setJiraStatus(status);
    } catch (err) {
      // Don't set global error for status fetch - just means not connected
      console.error("Failed to fetch Jira status:", err);
      setJiraStatus({ connected: false, message: null, cloud_id: null, jira_site_url: null, atlassian_account_id: null, expires_at: null, is_expired: false, can_refresh: false, scope: null, user_id: null });
    } finally {
      setIsJiraLoading(false);
    }
  }, []);

  const fetchGithubStatus = useCallback(async () => {
    try {
      setIsGithubLoading(true);
      const status = await githubApi.getConnectionStatus();
      setGithubStatus(status);
    } catch (err) {
      // Don't set global error for status fetch - just means not connected
      console.error("Failed to fetch GitHub status:", err);
      setGithubStatus({ connected: false, message: null, github_username: null, github_user_id: null, avatar_url: null, repositories_count: null, expires_at: null, is_expired: false, scope: null, user_id: null });
    } finally {
      setIsGithubLoading(false);
    }
  }, []);

  // Handle OAuth callback query parameters
  useEffect(() => {
    const jiraParam = searchParams.get("jira");
    const githubParam = searchParams.get("github");
    const errorParam = searchParams.get("error");
    
    if (jiraParam === "connected") {
      setSuccessMessage("Jira connected successfully! Your workspace is now linked.");
      router.replace("/configuration", { scroll: false });
      setTimeout(() => setSuccessMessage(null), 5000);
    } else if (jiraParam === "disconnected") {
      setSuccessMessage("Jira disconnected successfully.");
      router.replace("/configuration", { scroll: false });
      setTimeout(() => setSuccessMessage(null), 5000);
    } else if (githubParam === "connected") {
      setSuccessMessage("GitHub connected successfully! Your repositories are now linked.");
      router.replace("/configuration", { scroll: false });
      setTimeout(() => setSuccessMessage(null), 5000);
    } else if (githubParam === "disconnected") {
      setSuccessMessage("GitHub disconnected successfully.");
      router.replace("/configuration", { scroll: false });
      setTimeout(() => setSuccessMessage(null), 5000);
    } else if (errorParam) {
      setError(decodeURIComponent(errorParam));
      router.replace("/configuration", { scroll: false });
    }
  }, [searchParams, router]);

  useEffect(() => {
    fetchJiraStatus();
    fetchGithubStatus();
  }, [fetchJiraStatus, fetchGithubStatus]);

  // Jira handlers
  const handleConnectJira = async () => {
    try {
      setIsJiraConnecting(true);
      setError(null);
      const response = await jiraApi.getAuthUrl();
      sessionStorage.setItem("jira_oauth_state", response.state);
      window.location.href = response.auth_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to initiate Jira connection");
      setIsJiraConnecting(false);
    }
  };

  const handleDisconnectJira = async () => {
    try {
      setIsJiraDisconnecting(true);
      setError(null);
      await jiraApi.disconnect();
      setJiraStatus(null);
      await fetchJiraStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to disconnect Jira");
    } finally {
      setIsJiraDisconnecting(false);
    }
  };

  // GitHub handlers
  const handleConnectGithub = async () => {
    try {
      setIsGithubConnecting(true);
      setError(null);
      const response = await githubApi.getAuthUrl();
      sessionStorage.setItem("github_oauth_state", response.state);
      window.location.href = response.auth_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to initiate GitHub connection");
      setIsGithubConnecting(false);
    }
  };

  const handleDisconnectGithub = async () => {
    try {
      setIsGithubDisconnecting(true);
      setError(null);
      await githubApi.disconnect();
      setGithubStatus(null);
      await fetchGithubStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to disconnect GitHub");
    } finally {
      setIsGithubDisconnecting(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Configuration</h1>
      <p className="text-muted-foreground mb-8">
        Adjust your platform settings and connect your integrations.
      </p>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="font-medium">{successMessage}</p>
          </div>
          <button
            onClick={() => setSuccessMessage(null)}
            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive flex items-center justify-between">
          <div>
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-destructive hover:text-destructive/80"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Integrations Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Integrations</h2>

        {/* Jira Integration Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-6 h-6"
                >
                  <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.005 1.005 0 0 0 23.013 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  Jira
                  {jiraStatus?.connected && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Connected
                    </span>
                  )}
                  {jiraStatus && !jiraStatus.connected && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                      Not Connected
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  Connect your Jira workspace to sync issues and track developer workloads.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {isJiraLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Checking connection status...</span>
              </div>
            ) : jiraStatus?.connected ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Jira Site</p>
                    <p className="font-medium">
                      {jiraStatus.jira_site_url ? (
                        <a
                          href={jiraStatus.jira_site_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {jiraStatus.jira_site_url.replace("https://", "")}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Cloud ID</p>
                    <p className="font-medium font-mono text-xs">
                      {jiraStatus.cloud_id || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Token Expires</p>
                    <p className="font-medium">
                      {formatDate(jiraStatus.expires_at)}
                      {jiraStatus.is_expired && (
                        <span className="ml-2 text-destructive text-xs">(Expired)</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Scopes</p>
                    <p className="font-medium text-xs">
                      {jiraStatus.scope || "N/A"}
                    </p>
                  </div>
                </div>

                {jiraStatus.is_expired && jiraStatus.can_refresh && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-yellow-900/20 dark:border-yellow-800">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      Your Jira token has expired but can be refreshed automatically on the next API call.
                    </p>
                  </div>
                )}

                {jiraStatus.is_expired && !jiraStatus.can_refresh && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      Your Jira token has expired and cannot be refreshed. Please reconnect.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Connect your Atlassian account to enable Jira integration. This will allow the platform
                to sync your issues, track workloads, and provide intelligent task recommendations.
              </p>
            )}
          </CardContent>

          <CardFooter className="flex gap-3">
            {isJiraLoading ? null : jiraStatus?.connected ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleConnectJira}
                  disabled={isJiraConnecting}
                >
                  {isJiraConnecting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Reconnecting...
                    </>
                  ) : (
                    "Reconnect"
                  )}
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDisconnectJira}
                  disabled={isJiraDisconnecting}
                >
                  {isJiraDisconnecting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Disconnecting...
                    </>
                  ) : (
                    "Disconnect"
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={handleConnectJira} disabled={isJiraConnecting}>
                {isJiraConnecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.005 1.005 0 0 0 23.013 0z" />
                    </svg>
                    Connect to Jira
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* GitHub Integration Card */}
        <Card className="mt-4">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-900 dark:bg-gray-700 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  GitHub
                  {githubStatus?.connected && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Connected
                    </span>
                  )}
                  {githubStatus && !githubStatus.connected && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                      Not Connected
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  Connect your GitHub account to analyze pull requests and developer contributions.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {isGithubLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Checking connection status...</span>
              </div>
            ) : githubStatus?.connected ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">GitHub Username</p>
                    <p className="font-medium flex items-center gap-2">
                      {githubStatus.avatar_url && (
                        <img 
                          src={githubStatus.avatar_url} 
                          alt={githubStatus.github_username || "GitHub avatar"} 
                          className="w-5 h-5 rounded-full"
                        />
                      )}
                      {githubStatus.github_username ? (
                        <a
                          href={`https://github.com/${githubStatus.github_username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          @{githubStatus.github_username}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">User ID</p>
                    <p className="font-medium font-mono text-xs">
                      {githubStatus.github_user_id || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Repositories</p>
                    <p className="font-medium">
                      {githubStatus.repositories_count !== null ? githubStatus.repositories_count : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Scopes</p>
                    <p className="font-medium text-xs">
                      {githubStatus.scope || "N/A"}
                    </p>
                  </div>
                </div>

                {githubStatus.is_expired && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      Your GitHub token has expired. Please reconnect.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Connect your GitHub account to enable repository integration. This will allow the platform
                to analyze pull requests, track contributions, and match developers to tasks.
              </p>
            )}
          </CardContent>

          <CardFooter className="flex gap-3">
            {isGithubLoading ? null : githubStatus?.connected ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleConnectGithub}
                  disabled={isGithubConnecting}
                >
                  {isGithubConnecting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Reconnecting...
                    </>
                  ) : (
                    "Reconnect"
                  )}
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDisconnectGithub}
                  disabled={isGithubDisconnecting}
                >
                  {isGithubDisconnecting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Disconnecting...
                    </>
                  ) : (
                    "Disconnect"
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={handleConnectGithub} disabled={isGithubConnecting}>
                {isGithubConnecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    Connect to GitHub
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
