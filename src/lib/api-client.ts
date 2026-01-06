const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

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

export const githubApi = {
  getDevelopers: () => apiFetch('/github/get_developers', { method: 'GET' }),
  getClosedPrsAll: () => apiFetch('/github/get_closed_prs_context_all_authors', { method: 'GET' }),
  getPrsByAuthor: (author: string) => apiFetch('/github/get_closed_prs_context_per_author', {
    method: 'POST',
    body: JSON.stringify(author),
  }),
};
