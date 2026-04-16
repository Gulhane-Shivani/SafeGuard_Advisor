const BASE_URL = "https://safeguard-advisor-backend.onrender.com/";

// Lightweight fetch-based API client (no axios dependency)
const API = {
  async post(endpoint, data) {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      // Mimic axios error shape so Auth.tsx error handling works
      const error = new Error(json.detail || "Request failed");
      error.response = { data: json, status: res.status };
      throw error;
    }

    return { data: json, status: res.status };
  },

  async get(endpoint) {
    const token = localStorage.getItem("token");
    const headers = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}${endpoint}`, { headers });
    const json = await res.json();

    if (!res.ok) {
      const error = new Error(json.detail || "Request failed");
      error.response = { data: json, status: res.status };
      throw error;
    }

    return { data: json, status: res.status };
  },
};

export default API;