const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export const api = {
  get: async (endpoint: string, params: Record<string, string | number | boolean> = {}) => {
    const url = new URL(`${API_URL}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
         url.searchParams.append(key, String(value));
      }
    });

    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw { status: response.status, data: errorData };
    }
    return response.json();
  },

  post: async (endpoint: string, body: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw { status: response.status, data: errorData };
    }
    return response.json();
  },

  put: async (endpoint: string, body: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw { status: response.status, data: errorData };
    }
    return response.json();
  },

  delete: async (endpoint: string) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw { status: response.status, data: errorData };
    }
    
    // DELETE typically returns 204 No Content
    return response.status === 204 ? null : response.json().catch(() => null);
  }
};
