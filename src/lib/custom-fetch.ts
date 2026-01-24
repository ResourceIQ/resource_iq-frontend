const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const customFetch = async <T>(
    url: string,
    options: RequestInit = {}
): Promise<T> => {

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers = {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    // Construct full URL: only prepend base URL for relative paths
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

    const response = await fetch(fullUrl, {
        ...options,
        headers,
    });

    if (!response.ok) {
        if (response.status === 401 && typeof window !== 'undefined') {
            if (!window.location.pathname.startsWith('/sign-in')) {
                localStorage.removeItem('token');
                window.location.href = '/sign-in';
            }
        }
        const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
        throw error;
    }

    return response.json();
};

export default customFetch;