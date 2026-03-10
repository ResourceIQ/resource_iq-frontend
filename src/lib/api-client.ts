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

// GitHub API Types
export interface GitHubConnectionStatus {
  connected: boolean;
  message: string | null;
  github_username: string | null;
  github_user_id: string | null;
  avatar_url: string | null;
  repositories_count: number | null;
  expires_at: string | null;
  is_expired: boolean;
  scope: string | null;
  user_id: string | null;
}

export interface GitHubAuthConnectResponse {
  auth_url: string;
  state: string;
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
}

export const githubApi = {
  // Auth endpoints
  getAuthUrl: (): Promise<GitHubAuthConnectResponse> =>
    apiFetch('/github/auth/connect', { method: 'GET' }),

  getConnectionStatus: (): Promise<GitHubConnectionStatus> =>
    apiFetch('/github/auth/status', { method: 'GET' }),

  disconnect: (): Promise<{ message: string }> =>
    apiFetch('/github/auth/disconnect', { method: 'POST' }),

  // Repositories
  getRepositories: (): Promise<GitHubRepository[]> =>
    apiFetch('/github/repositories', { method: 'GET' }),

  // Existing endpoints
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

// Jira API Functions
export const jiraApi = {
  // Auth endpoints
  getAuthUrl: (): Promise<JiraAuthConnectResponse> =>
    apiFetch('/jira/auth/connect', { method: 'GET' }),

  getConnectionStatus: (): Promise<JiraConnectionStatus> =>
    apiFetch('/jira/auth/status', { method: 'GET' }),

  disconnect: (): Promise<{ message: string }> =>
    apiFetch('/jira/auth/disconnect', { method: 'POST' }),

  // Projects & Users
  getProjects: (): Promise<JiraProject[]> =>
    apiFetch('/jira/projects', { method: 'GET' }),

  getUsers: (maxResults: number = 100): Promise<JiraUser[]> =>
    apiFetch(`/jira/users?max_results=${maxResults}`, { method: 'GET' }),

  getProjectUsers: (projectKey: string, maxResults: number = 100): Promise<JiraUser[]> =>
    apiFetch(`/jira/projects/${projectKey}/users?max_results=${maxResults}`, { method: 'GET' }),

  getUserByAccountId: (accountId: string): Promise<JiraUser> =>
    apiFetch(`/jira/users/${accountId}`, { method: 'GET' }),

  // Sync & Data
  syncIssues: (request: JiraSyncRequest): Promise<JiraSyncResponse> =>
    apiFetch('/jira/sync', {
      method: 'POST',
      body: JSON.stringify(request),
    }),

  getIssueVectors: (params?: {
    project_key?: string;
    assignee_account_id?: string;
    limit?: number;
  }): Promise<Record<string, unknown>[]> => {
    const searchParams = new URLSearchParams();
    if (params?.project_key) searchParams.append('project_key', params.project_key);
    if (params?.assignee_account_id) searchParams.append('assignee_account_id', params.assignee_account_id);
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return apiFetch(`/jira/vectors${query}`, { method: 'GET' });
  },

  getIssueVector: (issueKey: string): Promise<Record<string, unknown>> =>
    apiFetch(`/jira/vectors/${issueKey}`, { method: 'GET' }),

  // Workload
  getWorkloadByAccount: (jiraAccountId: string): Promise<DeveloperWorkload> =>
    apiFetch(`/jira/workload/${jiraAccountId}`, { method: 'GET' }),

  getAllWorkloads: (): Promise<DeveloperWorkload[]> =>
    apiFetch('/jira/workloads', { method: 'GET' }),

  // Search
  searchSimilarIssues: (params: {
    query: string;
    n_results?: number;
    project_key?: string;
    assignee_account_id?: string;
  }): Promise<Record<string, unknown>[]> => {
    const searchParams = new URLSearchParams();
    searchParams.append('query', params.query);
    if (params.n_results) searchParams.append('n_results', params.n_results.toString());
    if (params.project_key) searchParams.append('project_key', params.project_key);
    if (params.assignee_account_id) searchParams.append('assignee_account_id', params.assignee_account_id);
    return apiFetch(`/jira/search/similar?${searchParams.toString()}`, { method: 'POST' });
  },

  getIssueContext: (issueKey: string): Promise<JiraIssueContent> =>
    apiFetch(`/jira/issues/${issueKey}/context`, { method: 'GET' }),
};
