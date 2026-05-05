const BASE_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://127.0.0.1:8000/"
  : "https://safeguard-advisor-backend.onrender.com/";


interface ApiResponse<T = any> {
  data: T;
  status: number;
}

interface ApiError extends Error {
  response?: {
    data: any;
    status: number;
  };
}

const handleUnauthorized = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("token");
  localStorage.removeItem("adminToken");
  localStorage.removeItem("user");
  if (window.location.pathname !== "/auth") {
    window.location.href = "/auth";
  }
};

// Enhanced fetch-based API client
const API = {
  async post<T = any>(endpoint: string, data: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
    const headers: Record<string, string> = { 
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> || {})
    };

    console.log(`API POST: ${endpoint}`, headers);
    const res = await fetch(`${BASE_URL}${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`, {
      ...options,
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      handleUnauthorized();
    }

    const json = await res.json();

    if (!res.ok) {
      const error = new Error(json.detail || "Request failed") as ApiError;
      error.response = { data: json, status: res.status };
      throw error;
    }

    return { data: json, status: res.status };
  },

  async get<T = any>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
    const headers: Record<string, string> = {
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> || {})
    };

    console.log(`API GET: ${endpoint}`, headers);
    const res = await fetch(`${BASE_URL}${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`, { 
      ...options,
      headers 
    });

    if (res.status === 401) {
      handleUnauthorized();
    }
    
    const json = await res.json();

    if (!res.ok) {
      const error = new Error(json.detail || "Request failed") as ApiError;
      error.response = { data: json, status: res.status };
      throw error;
    }

    return { data: json, status: res.status };
  },

  async patch<T = any>(endpoint: string, data: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
    const headers: Record<string, string> = { 
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> || {})
    };

    const res = await fetch(`${BASE_URL}${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`, {
      ...options,
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      handleUnauthorized();
    }

    const json = await res.json();

    if (!res.ok) {
      const error = new Error(json.detail || "Update failed") as ApiError;
      error.response = { data: json, status: res.status };
      throw error;
    }

    return { data: json, status: res.status };
  },

  async put<T = any>(endpoint: string, data: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
    const headers: Record<string, string> = { 
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> || {})
    };

    const res = await fetch(`${BASE_URL}${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`, {
      ...options,
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      handleUnauthorized();
    }

    const json = await res.json();

    if (!res.ok) {
      const error = new Error(json.detail || "Update failed") as ApiError;
      error.response = { data: json, status: res.status };
      throw error;
    }

    return { data: json, status: res.status };
  },

  async delete<T = any>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
    const headers: Record<string, string> = {
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> || {})
    };

    const res = await fetch(`${BASE_URL}${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`, { 
      ...options,
      method: "DELETE",
      headers 
    });

    if (res.status === 401) {
      handleUnauthorized();
    }
    
    const json = await res.json();

    if (!res.ok) {
      const error = new Error(json.detail || "Delete failed") as ApiError;
      error.response = { data: json, status: res.status };
      throw error;
    }

    return { data: json, status: res.status };
  },
};

export default API;
