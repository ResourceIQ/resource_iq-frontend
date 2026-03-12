const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: Record<string, string> = {
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  };

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      authApi.logout();
      if (typeof window !== 'undefined') {
        window.location.href = '/sign-in';
      }
    }
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || 'Something went wrong');
  }

  return response.json();
}

export const authApi = {
  login: async (formData: FormData) => {
    const response = await fetch(`${API_URL}/login/access-token`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Login failed' }));
      throw new Error(error.detail || 'Login failed');
    }

    return response.json();
  },
  getMe: () => apiFetch('/users/me', { method: 'GET' }),
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },
};

// GitHub API Types (GitHub App-based)
export interface GitHubConnectionStatus {
  connected: boolean;
  message: string | null;
  org_name: string | null;
  installation_id: string | null;
  install_url: string | null;
  repositories_count: number | null;
}

export interface GitHubAppConnectResponse {
  install_url: string;
  app_slug: string | null;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  default_branch: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string | null;
  updated_at: string | null;
  pushed_at: string | null;
}

export interface GitHubContributor {
  login: string;
  id: number;
  avatar_url: string | null;
  contributions: number;
}

export interface GitHubPullRequest {
  id: number;
  number: number;
  title: string;
  state: string;
  html_url: string;
  user: {
    login: string;
    id: number;
    avatar_url: string | null;
  };
  created_at: string | null;
  updated_at: string | null;
  merged_at: string | null;
  labels: string[];
}

export interface GitHubSyncRequest {
  repo_names?: string[] | null;
  max_prs_per_repo?: number;
  include_open?: boolean;
  generate_embeddings?: boolean;
}

export interface GitHubSyncResponse {
  status: string;
  repos_synced: string[];
  prs_synced: number;
  prs_created: number;
  prs_updated: number;
  embeddings_generated: number;
  errors: string[];
  sync_duration_seconds: number;
}

export const githubApi = {
  // Connection endpoints (GitHub App)
  getInstallUrl: (): Promise<GitHubAppConnectResponse> =>
    apiFetch('/github/auth/connect', { method: 'GET' }),

  getConnectionStatus: (): Promise<GitHubConnectionStatus> =>
    apiFetch('/github/auth/status', { method: 'GET' }),

  disconnect: (): Promise<{ message: string }> =>
    apiFetch('/github/auth/disconnect', { method: 'POST' }),

  // Repositories
  getRepositories: (): Promise<GitHubRepository[]> =>
    apiFetch('/github/repositories', { method: 'GET' }),

  getRepoContributors: (repoName: string): Promise<GitHubContributor[]> =>
    apiFetch(`/github/repositories/${repoName}/contributors`, { method: 'GET' }),

  getRepoPullRequests: (
    repoName: string,
    state: string = 'closed',
    perPage: number = 30,
  ): Promise<GitHubPullRequest[]> =>
    apiFetch(
      `/github/repositories/${repoName}/pulls?state=${state}&per_page=${perPage}`,
      { method: 'GET' },
    ),

  // Sync
  syncRepos: (request: GitHubSyncRequest): Promise<GitHubSyncResponse> =>
    apiFetch('/github/sync', {
      method: 'POST',
      body: JSON.stringify(request),
    }),

  // Org member endpoints
  getDevelopers: () => apiFetch('/github/get_developers', { method: 'GET' }),
  getClosedPrsAll: () => apiFetch('/github/get_closed_prs_context_all_authors', { method: 'GET' }),
  getPrsByAuthor: (author: string) => apiFetch('/github/get_closed_prs_context_per_author', {
    method: 'POST',
    body: JSON.stringify(author),
  }),
};

// Jira API Types
export interface JiraUser {
  account_id: string;
  display_name: string | null;
  email_address: string | null;
  avatar_url: string | null;
  active: boolean;
}

export interface JiraProject {
  id: string;
  key: string;
  name: string;
  projectTypeKey: string;
  avatarUrls?: Record<string, string>;
}

export interface JiraConnectionStatus {
  connected: boolean;
  message: string | null;
  cloud_id: string | null;
  jira_site_url: string | null;
  atlassian_account_id: string | null;
  expires_at: string | null;
  is_expired: boolean;
  can_refresh: boolean;
  scope: string | null;
  user_id: string | null;
}

export interface JiraAuthConnectResponse {
  auth_url: string;
  state: string;
}

export interface JiraSyncRequest {
  project_keys?: string[] | null;
  max_results?: number;
  include_closed?: boolean;
  sync_comments?: boolean;
  generate_embeddings?: boolean;
}

export interface JiraSyncResponse {
  status: string;
  projects_synced: string[];
  issues_synced: number;
  issues_updated: number;
  issues_created: number;
  embeddings_generated: number;
  errors: string[];
  sync_duration_seconds: number;
}

export interface DeveloperWorkload {
  jira_account_id: string;
  display_name: string | null;
  email: string | null;
  open_issues: number;
  in_progress_issues: number;
  in_review_issues: number;
  total_active_issues: number;
  high_priority_count: number;
  medium_priority_count: number;
  low_priority_count: number;
  bugs_count: number;
  tasks_count: number;
  stories_count: number;
  other_count: number;
  workload_score: number;
  last_updated: string | null;
}

export interface JiraIssueContent {
  issue_id: string;
  issue_key: string;
  project_key: string;
  summary: string;
  description: string | null;
  issue_type: string;
  status: string;
  priority: string | null;
  labels: string[];
  assignee: JiraUser | null;
  reporter: JiraUser | null;
  issue_url: string;
  comments: JiraComment[];
  created_at: string | null;
  updated_at: string | null;
  resolved_at: string | null;
  context: string | null;
}

export interface JiraComment {
  id: string;
  author: JiraUser;
  body: string;
  created: string;
  updated: string | null;
}

export interface JiraIssueTypeStatus {
  id: number;
  issue_type_id: string;
  issue_type_name: string;
  available_statuses: string[];
  selected_statuses: string[];
}

// Jira API Functions
export const jiraApi = {
  // Auth endpoints
  getAuthUrl: (): Promise<JiraAuthConnectResponse> =>
    apiFetch('/jira/auth/connect', { method: 'GET' }),

  getConnectionStatus: (): Promise<JiraConnectionStatus> =>
    apiFetch('/jira/auth/status', { method: 'GET' }),

  disconnect: (): Promise<{ message: string }> =>
    apiFetch('/jira/auth/disconnect', { method: 'POST' }),

  // Projects
  getProjects: (): Promise<JiraProject[]> =>
    apiFetch('/jira/projects', { method: 'GET' }),

  // Sync
  syncIssues: (request: JiraSyncRequest): Promise<JiraSyncResponse> =>
    apiFetch('/jira/sync', {
      method: 'POST',
      body: JSON.stringify(request),
    }),

  // Issue Type Status Configuration
  syncIssueTypeStatuses: (): Promise<JiraIssueTypeStatus[]> =>
    apiFetch('/jira/issue-type-statuses/sync', { method: 'POST' }),

  getIssueTypeStatuses: (): Promise<JiraIssueTypeStatus[]> =>
    apiFetch('/jira/issue-type-statuses', { method: 'GET' }),

  updateIssueTypeSelectedStatuses: (
    issueTypeId: string,
    selectedStatuses: string[],
  ): Promise<JiraIssueTypeStatus> =>
    apiFetch(`/jira/issue-type-statuses/${issueTypeId}`, {
      method: 'PUT',
      body: JSON.stringify({ selected_statuses: selectedStatuses }),
    }),
};
