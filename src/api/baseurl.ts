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

// Lightweight fetch-based API client (no axios dependency)
const API = {
  async post<T = any>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      // Mimic axios error shape so error handling works
      const error = new Error(json.detail || "Request failed") as ApiError;
      error.response = { data: json, status: res.status };
      throw error;
    }

    return { data: json, status: res.status };
  },

  async get<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`, { headers });
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
