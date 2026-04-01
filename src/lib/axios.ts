import axios from "axios";
import { apiUrl } from "./api.ts";

export const TOKEN_KEY = "access_token";

export const apiClient = axios.create();

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const u = config.url;
  if (u && !u.startsWith("http")) {
    config.url = apiUrl(u);
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err: unknown) => {
    const status = axios.isAxiosError(err) ? err.response?.status : undefined;
    if (status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem("username");
      const path = window.location.pathname;
      const base = import.meta.env.BASE_URL.replace(/\/$/, "") || "";
      if (!path.endsWith("/login")) {
        const qs = `?from=${encodeURIComponent(path + window.location.search)}`;
        window.location.href = `${base}/login${qs}`;
      }
    }
    return Promise.reject(err);
  },
);
