"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaExclamationTriangle } from "react-icons/fa";
import GlobalNav from "../components/GlobalNav";
import GlobalFooter from "../components/GlobalFooter";
import { useAuth } from "../hooks/use-auth";

type FormData = {
  username: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams?.get("from") ?? "/";

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setErrorMsg("");
    try {
      await login(data.username, data.password);
      router.replace(from);
    } catch (e) {
      let msg = "登录失败，请检查账号密码";
      if (axios.isAxiosError(e)) {
        const m = e.response?.data as { message?: string | string[] };
        if (Array.isArray(m?.message)) msg = String(m.message[0]);
        else if (typeof m?.message === "string") msg = m.message;
      } else if (e instanceof Error) {
        msg = e.message;
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <GlobalNav />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 fade-in-up">
        <div className="max-w-md mx-auto glass-card p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">登录</h1>
            <p className="text-neutral-500 mb-6">
              使用管理员账号登录后可提交反馈与查看管理页
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  用户名
                </label>
                <input
                  type="text"
                  autoComplete="username"
                  {...register("username", { required: "请输入用户名" })}
                  className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:bg-white/80"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  密码
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  {...register("password", { required: "请输入密码" })}
                  className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:bg-white/80"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 btn-hover-scale disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {loading ? "登录中…" : "登录"}
              </button>

              {errorMsg && (
                <div className="mt-3 p-3 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-xl text-center text-sm flex items-center justify-center gap-2">
                  <FaExclamationTriangle /> {errorMsg}
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
      <GlobalFooter />
    </div>
  );
}
