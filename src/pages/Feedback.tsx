// src/pages/Feedback.tsx
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa"; // 新增图标
import GlobalNav from "../components/GlobalNav";
import GlobalFooter from "../components/GlobalFooter";

type FormData = {
  name: string;
  email: string;
  content: string;
};

export default function Feedback() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: FormData) => {
    setSubmitStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("http://localhost:3000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = await res
        .json()
        .catch(() => ({} as { success?: boolean; message?: string }));

      if (!res.ok || payload?.success !== true) {
        throw new Error(payload?.message || `Request failed with ${res.status}`);
      }

      setSubmitStatus("success");
      // You can use returned id if you want to show it to users.
      // const { id } = payload as { success: true; id: number };
      reset();
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "提交失败，请重试"
      );
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <GlobalNav />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 fade-in-up">
        {" "}
        {/* 新增页面淡入动画 */}
        <div className="max-w-md mx-auto glass-card p-8 relative overflow-hidden">
          {" "}
          {/* 改用玻璃卡片 */}
          {/* 装饰光晕 */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              反馈建议
            </h1>
            <p className="text-neutral-500 mb-6">
              欢迎留下您的意见，帮助我们做得更好
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* 姓名 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  姓名
                </label>
                <input
                  type="text"
                  {...register("name", { required: "请输入姓名" })}
                  className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:bg-white/80" // 升级输入框
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* 邮箱 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  邮箱
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "请输入邮箱",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "邮箱格式不正确",
                    },
                  })}
                  className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:bg-white/80"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* 内容 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  内容
                </label>
                <textarea
                  rows={4}
                  {...register("content", { required: "请输入内容" })}
                  className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 hover:bg-white/80"
                />
                {errors.content && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.content.message}
                  </p>
                )}
              </div>

              {/* 提交按钮 */}
              <button
                type="submit"
                disabled={submitStatus === "loading"}
                className="w-full bg-linear-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 btn-hover-scale disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg" // 升级按钮
              >
                {submitStatus === "loading" ? "提交中..." : "提交反馈"}
              </button>

              {/* 状态提示 */}
              {submitStatus === "success" && (
                <div className="mt-3 p-3 bg-emerald-50/80 backdrop-blur-sm border border-emerald-200 text-emerald-700 rounded-xl text-center text-sm flex items-center justify-center gap-2">
                  <FaCheckCircle /> 提交成功，感谢您的反馈！
                </div>
              )}
              {submitStatus === "error" && (
                <div className="mt-3 p-3 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-xl text-center text-sm flex items-center justify-center gap-2">
                  <FaExclamationTriangle /> {errorMsg || "提交失败，请稍后再试"}
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
