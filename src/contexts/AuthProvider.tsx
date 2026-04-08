"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { apiUrl } from "../lib/api";
import { DEV_SERVER_INSTANCE_STORAGE_KEY } from "../lib/dev-server-session";
import { TOKEN_KEY } from "../lib/axios";
import { AuthContext } from "./auth-context-instance";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(apiUrl("/api/health"));
        if (!res.ok) throw new Error("health failed");
        const data = (await res.json()) as { instanceId?: string };
        const instanceId = data.instanceId;
        const prev = localStorage.getItem(DEV_SERVER_INSTANCE_STORAGE_KEY);

        // Demo/检查用：后端重启 → instanceId 变化 → 清登录态，便于每次重启 dev:server 后演示登录页。
        if (prev != null && instanceId != null && prev !== instanceId) {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem("username");
        }
        if (instanceId) {
          localStorage.setItem(DEV_SERVER_INSTANCE_STORAGE_KEY, instanceId);
        }
      } catch {
        // 后端未启动时不写 instanceId，也不清 token，避免纯前端开发时误伤
      } finally {
        if (!cancelled) {
          setToken(localStorage.getItem(TOKEN_KEY));
          setUsername(localStorage.getItem("username"));
          setIsReady(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (u: string, password: string) => {
    const { data } = await axios.post<{
      access_token?: string;
    }>(apiUrl("/api/auth/login"), {
      username: u.trim(),
      password,
    });
    const access_token = data?.access_token;
    if (!access_token) {
      throw new Error("登录失败");
    }
    localStorage.setItem(TOKEN_KEY, access_token);
    localStorage.setItem("username", u.trim());
    setToken(access_token);
    setUsername(u.trim());
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      username,
      isReady,
      login,
      logout,
    }),
    [token, username, isReady, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
