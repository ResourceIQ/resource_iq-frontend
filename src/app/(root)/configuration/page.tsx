"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  jiraApi,
  JiraConnectionStatus,
  JiraIssueTypeStatus,
  JiraProject,
  JiraSyncResponse,
  githubApi,
  GitHubConnectionStatus,
  GitHubRepository,
  GitHubSyncResponse,
} from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

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
  const [isGithubDisconnecting, setIsGithubDisconnecting] = useState(false);

  // GitHub project analysis state
  const [githubRepos, setGithubRepos] = useState<GitHubRepository[]>([]);
  const [isReposLoading, setIsReposLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<GitHubSyncResponse | null>(null);
  const [selectedRepos, setSelectedRepos] = useState<Set<string>>(new Set());

  // Jira project & sync state
  const [jiraProjects, setJiraProjects] = useState<JiraProject[]>([]);
  const [isJiraProjectsLoading, setIsJiraProjectsLoading] = useState(false);
  const [selectedJiraProjects, setSelectedJiraProjects] = useState<Set<string>>(new Set());
  const [isJiraSyncing, setIsJiraSyncing] = useState(false);
  const [jiraSyncResult, setJiraSyncResult] = useState<JiraSyncResponse | null>(null);

  // Jira issue type status state
  const [issueTypeStatuses, setIssueTypeStatuses] = useState<JiraIssueTypeStatus[]>([]);
  const [isIssueTypesLoading, setIsIssueTypesLoading] = useState(false);
  const [isSyncingIssueTypes, setIsSyncingIssueTypes] = useState(false);
  const [updatingTypeId, setUpdatingTypeId] = useState<string | null>(null);

  // Shared state
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState(false);

  const fetchJiraStatus = useCallback(async () => {
    try {
      setIsJiraLoading(true);
      const status = await jiraApi.getConnectionStatus();
      setJiraStatus(status);
      return true;
    } catch (err) {
      console.error("Failed to fetch Jira status:", err);
      setJiraStatus({ connected: false, message: null, cloud_id: null, jira_site_url: null, atlassian_account_id: null, expires_at: null, is_expired: false, can_refresh: false, scope: null, user_id: null });
      return false;
    } finally {
      setIsJiraLoading(false);
    }
  }, []);

  const fetchGithubStatus = useCallback(async () => {
    try {
      setIsGithubLoading(true);
      const status = await githubApi.getConnectionStatus();
      setGithubStatus(status);
      return true;
    } catch (err) {
      console.error("Failed to fetch GitHub status:", err);
      setGithubStatus({ connected: false, message: null, org_name: null, installation_id: null, install_url: null, repositories_count: null });
      return false;
    } finally {
      setIsGithubLoading(false);
    }
  }, []);

  const fetchGithubRepos = useCallback(async () => {
    try {
      setIsReposLoading(true);
      const repos = await githubApi.getRepositories();
      setGithubRepos(repos);
    } catch (err) {
      console.error("Failed to fetch GitHub repos:", err);
      setGithubRepos([]);
      setError("Could not load repositories. Please try refreshing or check your GitHub App permissions.");
    } finally {
      setIsReposLoading(false);
    }
  }, []);

  const fetchIssueTypeStatuses = useCallback(async () => {
    try {
      setIsIssueTypesLoading(true);
      const statuses = await jiraApi.getIssueTypeStatuses();
      setIssueTypeStatuses(statuses);
    } catch {
      setIssueTypeStatuses([]);
    } finally {
      setIsIssueTypesLoading(false);
    }
  }, []);

  const fetchJiraProjects = useCallback(async () => {
    try {
      setIsJiraProjectsLoading(true);
      const projects = await jiraApi.getProjects();
      setJiraProjects(projects);
    } catch {
      setJiraProjects([]);
    } finally {
      setIsJiraProjectsLoading(false);
    }
  }, []);

  const toggleJiraProjectSelection = (key: string) => {
    setSelectedJiraProjects((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const selectAllJiraProjects = () => {
    if (selectedJiraProjects.size === jiraProjects.length) {
      setSelectedJiraProjects(new Set());
    } else {
      setSelectedJiraProjects(new Set(jiraProjects.map((p) => p.key)));
    }
  };

  const handleSyncJira = async () => {
    try {
      setIsJiraSyncing(true);
      setError(null);
      setJiraSyncResult(null);
      const projectKeys = selectedJiraProjects.size > 0 ? Array.from(selectedJiraProjects) : null;
      const result = await jiraApi.syncIssues({
        project_keys: projectKeys,
        max_results: 100,
        include_closed: true,
        sync_comments: true,
        generate_embeddings: true,
      });
      setJiraSyncResult(result);
      setSuccessMessage(
        `Jira sync complete: ${result.issues_synced} issues synced, ${result.embeddings_generated} embeddings generated.`
      );
      setTimeout(() => setSuccessMessage(null), 8000);
    } catch {
      setError("Jira sync failed. The server may be busy or unavailable — please try again.");
    } finally {
      setIsJiraSyncing(false);
    }
  };

  const handleSyncIssueTypes = async () => {
    try {
      setIsSyncingIssueTypes(true);
      setError(null);
      const synced = await jiraApi.syncIssueTypeStatuses();
      setIssueTypeStatuses(synced);
      setSuccessMessage(
        `Synced ${synced.length} issue type(s) with their workflow statuses.`
      );
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch {
      setError(
        "Failed to sync issue types from Jira. Please check your connection and try again."
      );
    } finally {
      setIsSyncingIssueTypes(false);
    }
  };

  const handleToggleStatus = async (
    issueTypeId: string,
    status: string,
    currentSelected: string[]
  ) => {
    const next = currentSelected.includes(status)
      ? currentSelected.filter((s) => s !== status)
      : [...currentSelected, status];
    try {
      setUpdatingTypeId(issueTypeId);
      setError(null);
      const updated = await jiraApi.updateIssueTypeSelectedStatuses(issueTypeId, next);
      setIssueTypeStatuses((prev) =>
        prev.map((it) => (it.issue_type_id === issueTypeId ? updated : it))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update statuses."
      );
    } finally {
      setUpdatingTypeId(null);
    }
  };

  const handleConnectGithub = async () => {
    try {
      setError(null);
      const response = await githubApi.getInstallUrl();

      // If the backend auto-discovered an existing installation, it returns connected status
      if ("connected" in response && (response as any).connected) {
        setSuccessMessage("GitHub App connected! Installation was auto-discovered.");
        setTimeout(() => setSuccessMessage(null), 5000);
        await fetchGithubStatus();
        return;
      }

      // Otherwise redirect to GitHub to install the app
      if ("install_url" in response) {
        window.location.href = (response as any).install_url;
      }
    } catch (err) {
      setError("Could not connect to GitHub. Please check your network connection and try again.");
    }
  };

  const handleDisconnectGithub = async () => {
    try {
      setIsGithubDisconnecting(true);
      setError(null);
      await githubApi.disconnect();
      setGithubStatus(null);
      setGithubRepos([]);
      setSelectedRepos(new Set());
      setSyncResult(null);
      await fetchGithubStatus();
    } catch (err) {
      setError("Could not disconnect GitHub. The server may be unavailable — please try again shortly.");
    } finally {
      setIsGithubDisconnecting(false);
    }
  };

  const handleSyncGithub = async () => {
    try {
      setIsSyncing(true);
      setError(null);
      setSyncResult(null);
      const repoNames = selectedRepos.size > 0 ? Array.from(selectedRepos) : null;
      const result = await githubApi.syncRepos({
        repo_names: repoNames,
        max_prs_per_repo: 100,
        generate_embeddings: true,
      });
      setSyncResult(result);
      setSuccessMessage(
        `GitHub sync complete: ${result.prs_synced} PRs synced across ${result.repos_synced.length} repos.`
      );
      setTimeout(() => setSuccessMessage(null), 8000);
    } catch (err) {
      setError("Sync failed. The server may be busy or unavailable — please try again in a moment.");
    } finally {
      setIsSyncing(false);
    }
  };

  const toggleRepoSelection = (name: string) => {
    setSelectedRepos((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const selectAllRepos = () => {
    if (selectedRepos.size === githubRepos.length) {
      setSelectedRepos(new Set());
    } else {
      setSelectedRepos(new Set(githubRepos.map((r) => r.name)));
    }
  };

  // Handle callback query parameters
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
      setSuccessMessage("GitHub App installed successfully! Your organization is now linked.");
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
    const loadStatuses = async () => {
      const [jiraOk, githubOk] = await Promise.all([
        fetchJiraStatus(),
        fetchGithubStatus(),
      ]);
      setServerError(!jiraOk && !githubOk);
    };
    loadStatuses();
  }, [fetchJiraStatus, fetchGithubStatus]);

  useEffect(() => {
    if (githubStatus?.connected) {
      fetchGithubRepos();
    }
  }, [githubStatus, fetchGithubRepos]);

  useEffect(() => {
    if (jiraStatus?.connected) {
      fetchIssueTypeStatuses();
      fetchJiraProjects();
    }
  }, [jiraStatus, fetchIssueTypeStatuses, fetchJiraProjects]);

  // Jira handlers
  const handleConnectJira = async () => {
    try {
      setIsJiraConnecting(true);
      setError(null);
      const response = await jiraApi.getAuthUrl();
      sessionStorage.setItem("jira_oauth_state", response.state);
      window.location.href = response.auth_url;
    } catch (err) {
      setError("Could not connect to Jira. Please check your network connection and try again.");
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
      setError("Could not disconnect Jira. The server may be unavailable — please try again shortly.");
    } finally {
      setIsJiraDisconnecting(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="p-6">
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

      {/* Server Unreachable Banner */}
      {serverError && (
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg dark:bg-orange-900/20 dark:border-orange-800 flex items-start gap-3">
          <svg className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div className="flex-1">
            <p className="font-medium text-orange-800 dark:text-orange-200">Unable to reach the server</p>
            <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
              The backend server appears to be offline or unreachable. Integration statuses may not be accurate.
              Please make sure the server is running and try refreshing the page.
            </p>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive flex items-center justify-between">
          <div>
            <p className="font-medium">Something went wrong</p>
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
                {!jiraStatus?.connected && (
                  <CardDescription>
                    Connect your Jira workspace to sync issues and track developer workloads.
                  </CardDescription>
                )}
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

                {/* Issue Type Status Configuration for Embeddings */}
                <Collapsible className="border-t pt-4">
                  <CollapsibleTrigger className="flex items-center justify-between w-full group">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-90"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <h4 className="font-semibold text-sm">Embedding Status Filters</h4>
                      {issueTypeStatuses.length > 0 && (
                        <span className="text-xs text-muted-foreground">
                          ({issueTypeStatuses.length} types)
                        </span>
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground max-w-md">
                        For each issue type, select which statuses qualify an issue for
                        embedding. Only issues matching a selected status will be used
                        for similarity search and recommendations.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSyncIssueTypes}
                        disabled={isSyncingIssueTypes}
                      >
                        {isSyncingIssueTypes ? (
                          <>
                            <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
                            Syncing...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-3.5 h-3.5 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                            {issueTypeStatuses.length > 0 ? "Re-sync" : "Sync Issue Types"}
                          </>
                        )}
                      </Button>
                    </div>

                    {isIssueTypesLoading ? (
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Loading issue types...</span>
                      </div>
                    ) : issueTypeStatuses.length > 0 ? (
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                        {issueTypeStatuses.map((it) => (
                          <div
                            key={it.issue_type_id}
                            className="rounded-lg border border-border p-3 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">{it.issue_type_name}</span>
                              <span className="text-xs text-muted-foreground">
                                {it.selected_statuses.length}/{it.available_statuses.length} selected
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {it.available_statuses.map((status) => {
                                const isSelected = it.selected_statuses.includes(status);
                                return (
                                  <button
                                    key={status}
                                    type="button"
                                    onClick={() =>
                                      handleToggleStatus(
                                        it.issue_type_id,
                                        status,
                                        it.selected_statuses
                                      )
                                    }
                                    disabled={updatingTypeId === it.issue_type_id}
                                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border transition-colors disabled:opacity-50 ${
                                      isSelected
                                        ? "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
                                        : "bg-muted/50 text-muted-foreground border-border hover:bg-muted"
                                    }`}
                                  >
                                    {isSelected && (
                                      <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                    {status}
                                  </button>
                                );
                              })}
                            </div>
                            {updatingTypeId === it.issue_type_id && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Saving...
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No issue types configured yet. Click &quot;Sync Issue Types&quot;
                        to fetch them from your Jira workspace.
                      </p>
                    )}
                  </CollapsibleContent>
                </Collapsible>

                {/* Sync Project Section */}
                <Collapsible className="border-t pt-4">
                  <CollapsibleTrigger className="flex items-center justify-between w-full group">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-90"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <h4 className="font-semibold text-sm">Sync Project</h4>
                      {selectedJiraProjects.size > 0 && (
                        <span className="text-xs text-muted-foreground">
                          ({selectedJiraProjects.size} selected)
                        </span>
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-3 space-y-3">
                    {isJiraProjectsLoading ? (
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Loading projects...</span>
                      </div>
                    ) : jiraProjects.length > 0 ? (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {jiraProjects.length} project{jiraProjects.length !== 1 ? "s" : ""} available
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={selectAllJiraProjects}
                          >
                            {selectedJiraProjects.size === jiraProjects.length
                              ? "Deselect All"
                              : "Select All"}
                          </Button>
                        </div>

                        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                          {jiraProjects.map((project) => (
                            <label
                              key={project.id}
                              className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                                selectedJiraProjects.has(project.key)
                                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700"
                                  : "border-border hover:bg-muted/50"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={selectedJiraProjects.has(project.key)}
                                onChange={() => toggleJiraProjectSelection(project.key)}
                                className="rounded border-gray-300"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-sm truncate">
                                    {project.name}
                                  </p>
                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                    {project.key}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                                  <span>{project.projectTypeKey}</span>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>

                        <div className="flex items-center gap-3">
                          <Button
                            onClick={handleSyncJira}
                            disabled={isJiraSyncing}
                            size="sm"
                          >
                            {isJiraSyncing ? (
                              <>
                                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
                                Syncing Issues...
                              </>
                            ) : (
                              <>
                                <svg
                                  className="w-3.5 h-3.5 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                  />
                                </svg>
                                {selectedJiraProjects.size > 0
                                  ? `Sync ${selectedJiraProjects.size} project${selectedJiraProjects.size > 1 ? "s" : ""}`
                                  : "Sync All Projects"}
                              </>
                            )}
                          </Button>
                          <span className="text-xs text-muted-foreground">
                            Fetches issues and generates embeddings for task analysis
                          </span>
                        </div>

                        {jiraSyncResult && (
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800 text-sm space-y-1">
                            <p className="font-medium text-green-800 dark:text-green-200">
                              Sync {jiraSyncResult.status === "completed" ? "Completed" : "Completed with Errors"}
                            </p>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-green-700 dark:text-green-300 text-xs">
                              <span>Projects synced: {jiraSyncResult.projects_synced.length}</span>
                              <span>Issues synced: {jiraSyncResult.issues_synced}</span>
                              <span>Embeddings: {jiraSyncResult.embeddings_generated}</span>
                              <span>Duration: {jiraSyncResult.sync_duration_seconds}s</span>
                            </div>
                            {jiraSyncResult.errors.length > 0 && (
                              <div className="mt-2 text-xs text-red-700 dark:text-red-300">
                                {jiraSyncResult.errors.slice(0, 3).map((e, i) => (
                                  <p key={i}>{e}</p>
                                ))}
                                {jiraSyncResult.errors.length > 3 && (
                                  <p>...and {jiraSyncResult.errors.length - 3} more errors</p>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No projects found. Make sure your Jira workspace has accessible projects.
                      </p>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Connect your Atlassian account to enable Jira integration. This will allow the platform
                to sync your issues, track workloads, and provide intelligent task recommendations.
              </p>
            )}
          </CardContent>

          <div className="border-t" />
          <CardFooter className="flex justify-end gap-3">
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
                {!githubStatus?.connected && (
                  <CardDescription>
                    Install the GitHub App on your organization to analyze pull requests and developer contributions.
                  </CardDescription>
                )}
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
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Organization</p>
                    <p className="font-medium">
                      {githubStatus.org_name ? (
                        <a
                          href={`https://github.com/${githubStatus.org_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {githubStatus.org_name}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Installation ID</p>
                    <p className="font-medium font-mono text-xs">
                      {githubStatus.installation_id || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Repositories</p>
                    <p className="font-medium">
                      {githubStatus.repositories_count !== null ? githubStatus.repositories_count : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Auth Type</p>
                    <p className="font-medium text-xs">GitHub App</p>
                  </div>
                </div>

                {/* Repository Analysis Section */}
                <Collapsible className="border-t pt-4">
                  <CollapsibleTrigger className="flex items-center justify-between w-full group">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-90"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <h4 className="font-semibold text-sm">Projects / Repositories</h4>
                      {githubRepos.length > 0 && (
                        <span className="text-xs text-muted-foreground">
                          ({githubRepos.length})
                        </span>
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-3 space-y-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchGithubRepos}
                        disabled={isReposLoading}
                      >
                        {isReposLoading ? (
                          <>
                            <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
                            Loading...
                          </>
                        ) : (
                          "Refresh"
                        )}
                      </Button>
                      {githubRepos.length > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={selectAllRepos}
                        >
                          {selectedRepos.size === githubRepos.length
                            ? "Deselect All"
                            : "Select All"}
                        </Button>
                      )}
                    </div>

                    {isReposLoading ? (
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Loading repositories...</span>
                      </div>
                    ) : githubRepos.length > 0 ? (
                      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                        {githubRepos.map((repo) => (
                          <label
                            key={repo.id}
                            className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                              selectedRepos.has(repo.name)
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700"
                                : "border-border hover:bg-muted/50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedRepos.has(repo.name)}
                              onChange={() => toggleRepoSelection(repo.name)}
                              className="rounded border-gray-300"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm truncate">
                                  {repo.full_name}
                                </p>
                                {repo.private && (
                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                                    Private
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                                {repo.language && <span>{repo.language}</span>}
                                <span>{repo.stargazers_count} stars</span>
                                <span>{repo.open_issues_count} issues</span>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No repositories found. Make sure the GitHub App has access to your organization&apos;s repositories.
                      </p>
                    )}
                  </CollapsibleContent>
                </Collapsible>

                {/* Sync Project Section */}
                <Collapsible className="border-t pt-4">
                  <CollapsibleTrigger className="flex items-center justify-between w-full group">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-90"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <h4 className="font-semibold text-sm">Sync Project</h4>
                      {selectedRepos.size > 0 && (
                        <span className="text-xs text-muted-foreground">
                          ({selectedRepos.size} selected)
                        </span>
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-3 space-y-3">
                    {githubRepos.length > 0 ? (
                      <>
                        <div className="flex items-center gap-3">
                          <Button
                            onClick={handleSyncGithub}
                            disabled={isSyncing}
                            size="sm"
                          >
                            {isSyncing ? (
                              <>
                                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
                                Syncing PRs...
                              </>
                            ) : (
                              <>
                                <svg
                                  className="w-3.5 h-3.5 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                  />
                                </svg>
                                {selectedRepos.size > 0
                                  ? `Sync ${selectedRepos.size} repo${selectedRepos.size > 1 ? "s" : ""}`
                                  : "Sync All Repos"}
                              </>
                            )}
                          </Button>
                          <span className="text-xs text-muted-foreground">
                            Fetches PRs and generates embeddings for developer analysis
                          </span>
                        </div>

                        {syncResult && (
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800 text-sm space-y-1">
                            <p className="font-medium text-green-800 dark:text-green-200">
                              Sync {syncResult.status === "completed" ? "Completed" : "Completed with Errors"}
                            </p>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-green-700 dark:text-green-300 text-xs">
                              <span>Repos synced: {syncResult.repos_synced.length}</span>
                              <span>PRs synced: {syncResult.prs_synced}</span>
                              <span>Embeddings: {syncResult.embeddings_generated}</span>
                              <span>Duration: {syncResult.sync_duration_seconds}s</span>
                            </div>
                            {syncResult.errors.length > 0 && (
                              <div className="mt-2 text-xs text-red-700 dark:text-red-300">
                                {syncResult.errors.slice(0, 3).map((e, i) => (
                                  <p key={i}>{e}</p>
                                ))}
                                {syncResult.errors.length > 3 && (
                                  <p>...and {syncResult.errors.length - 3} more errors</p>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Expand &quot;Projects / Repositories&quot; above to select repos before syncing.
                      </p>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Install the Resource IQ GitHub App on your organization to enable repository integration.
                This will allow the platform to analyze pull requests, track contributions, and match developers to tasks.
              </p>
            )}
          </CardContent>

          <div className="border-t" />
          <CardFooter className="flex justify-end gap-3">
            {isGithubLoading ? null : githubStatus?.connected ? (
              <>
                {githubStatus.org_name && githubStatus.installation_id && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      window.open(
                        `https://github.com/organizations/${githubStatus.org_name}/settings/installations/${githubStatus.installation_id}`,
                        "_blank"
                      )
                    }
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Manage Access
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={fetchGithubStatus}
                >
                  Refresh Status
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
              <Button onClick={handleConnectGithub}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Install GitHub App
              </Button>
            )}
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
