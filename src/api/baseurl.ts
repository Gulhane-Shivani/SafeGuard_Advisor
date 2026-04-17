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

// Enhanced fetch-based API client
const API = {
  async post<T = any>(endpoint: string, data: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
    const headers: Record<string, string> = { 
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> || {})
    };

    const res = await fetch(`${BASE_URL}${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`, {
      ...options,
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

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

    const res = await fetch(`${BASE_URL}${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`, { 
      ...options,
      headers 
    });
    
    const json = await res.json();

    if (!res.ok) {
      const error = new Error(json.detail || "Request failed") as ApiError;
      error.response = { data: json, status: res.status };
      throw error;
    }

    return { data: json, status: res.status };
  },
};

export default API;
