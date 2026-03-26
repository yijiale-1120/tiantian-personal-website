// src/pages/Feedback.tsx
import { useForm } from "react-hook-form";
import { useState } from "react";

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
    // 模拟 API 请求
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // 假设提交成功
      console.log("提交的数据:", data);
      setSubmitStatus("success");
      reset(); // 清空表单
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      setErrorMsg("提交失败，请重试");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">反馈建议</h1>
        <p className="text-slate-500 mb-6">
          欢迎留下您的意见，帮助我们做得更好
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 姓名 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              姓名
            </label>
            <input
              type="text"
              {...register("name", { required: "请输入姓名" })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* 邮箱 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
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
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* 内容 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              内容
            </label>
            <textarea
              rows={4}
              {...register("content", { required: "请输入内容" })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
            />
            {errors.content && (
              <p className="text-red-500 text-xs mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* 提交按钮及状态反馈 */}
          <button
            type="submit"
            disabled={submitStatus === "loading"}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitStatus === "loading" ? "提交中..." : "提交反馈"}
          </button>

          {submitStatus === "success" && (
            <div className="mt-3 p-3 bg-green-50 text-green-700 rounded-lg text-center text-sm">
              提交成功，感谢您的反馈！
            </div>
          )}
          {submitStatus === "error" && (
            <div className="mt-3 p-3 bg-red-50 text-red-700 rounded-lg text-center text-sm">
              {errorMsg || "提交失败，请稍后再试"}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
