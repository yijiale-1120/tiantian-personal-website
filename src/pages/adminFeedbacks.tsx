// src/pages/adminFeedbacks.tsx
import * as dayjsModule from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { FaCommentDots } from "react-icons/fa"; // 新增装饰图标
import GlobalNav from "../components/GlobalNav.tsx";
import GlobalFooter from "../components/GlobalFooter.tsx";
import { useEffect, useState } from "react";
import { apiClient } from "../lib/axios.ts";

// dayjs/plugin/relativeTime uses `export = plugin` (no default export),
// so we need a safe interop fallback for different bundler/type behaviors.
type DayjsStatic = {
  (date?: import("dayjs").ConfigType): import("dayjs").Dayjs;
  extend: typeof import("dayjs").extend;
  locale: typeof import("dayjs").locale;
};

// Convert `export = dayjs` module namespace to a callable dayjs function.
const dayjs =
  (dayjsModule as unknown as { default?: DayjsStatic }).default ??
  (dayjsModule as unknown as DayjsStatic);

type ExtendArg = Parameters<typeof dayjs.extend>[0];
const relativeTimePlugin =
  (relativeTime as unknown as { default?: ExtendArg }).default ??
  (relativeTime as unknown as ExtendArg);
dayjs.extend(relativeTimePlugin);
dayjs.locale("zh-cn");

type Feedback = {
  id: number;
  name: string;
  email: string;
  content: string;
  createdAt: string;
};

export default function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchFeedbacks = async () => {
      try {
        const { data: payload } = await apiClient.get<{
          success?: boolean;
          message?: string;
          feedbacks?: Feedback[];
        }>("/api/feedback");
        if (payload?.success !== true) {
          throw new Error(payload?.message || "加载失败");
        }
        if (mounted) setFeedbacks(payload.feedbacks ?? []);
      } catch (err) {
        console.error(err);
        if (mounted) setErrorMsg("加载失败，请稍后重试");
      }
    };

    fetchFeedbacks();
    // "Real-time" update: periodically refresh the list.
    const timer = window.setInterval(fetchFeedbacks, 3000);

    return () => {
      mounted = false;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <GlobalNav />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 fade-in-up">
        {" "}
        {/* 页面淡入动画 */}
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            {" "}
            {/* 新增标题装饰 */}
            <FaCommentDots className="text-primary text-2xl" />
            <h1 className="text-3xl font-bold text-neutral-900">用户反馈</h1>
          </div>
          <p className="text-neutral-500 mb-8">
            共收到 {feedbacks.length} 条反馈
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="glass-card p-6 hover:shadow-xl transition-all duration-300 group" // 改用玻璃卡片，增加悬停效果
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-neutral-900">
                      {feedback.name}
                    </h3>
                    <p className="text-xs text-neutral-400">{feedback.email}</p>
                  </div>
                  <span className="text-xs text-neutral-400 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full">
                    {dayjs(feedback.createdAt).fromNow()}
                  </span>
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed mt-2">
                  {feedback.content}
                </p>
                {/* 新增装饰性下划线 */}
                <div className="mt-4 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"></div>
              </div>
            ))}
          </div>

          {errorMsg && (
            <p className="mt-6 text-sm text-red-600 text-center">{errorMsg}</p>
          )}
        </div>
      </main>
      <GlobalFooter />
    </div>
  );
}
