const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const customFetch = async <T>(
    url: string,
    options: RequestInit = {}
): Promise<T> => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers: HeadersInit = {
        ...(!(options.body instanceof FormData) && { 'Content-Type': 'application/json' }),
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    let cleanUrl = url;
    if (url.startsWith('/api/v1') && API_BASE_URL.endsWith('/api/v1')) {
        cleanUrl = url.replace('/api/v1', '');
    }

    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${cleanUrl}`;

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

        const errorText = await response.text();
        try {
            throw JSON.parse(errorText);
        } catch (e) {
            throw { detail: errorText || `HTTP Error ${response.status}`, status: response.status };
        }
    }

    if (response.status === 204) {
        return {} as T;
    }

    return response.json();
};

export default customFetch;