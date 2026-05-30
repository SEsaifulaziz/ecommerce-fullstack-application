import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error(
      '[apiClient] VITE_API_BASE_URL is not set. ' +
      'Add it to your .env file locally or to Vercel Environment Variables in production.'
  );
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 s — Render free tier can be slow on cold start
});

// Request interceptor: attach JWT from localStorage if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle global 401 (expired / invalid token)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token is invalid or expired — clear local auth state
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        // Only force-reload if we were actually authenticated (avoids loop on login page)
        if (window.location.pathname !== '/') {
          window.location.reload();
        }
      }
      return Promise.reject(error);
    }
);

export { API_BASE_URL, apiClient };
