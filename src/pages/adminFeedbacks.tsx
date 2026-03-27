// src/pages/adminFeedbacks.tsx
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { FaCommentDots } from "react-icons/fa"; // 新增装饰图标
import GlobalNav from "../components/GlobalNav";
import GlobalFooter from "../components/GlobalFooter";

dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

const mockFeedbacks = [
  {
    id: 1,
    name: "张三",
    email: "zhangsan@example.com",
    content: "网站风格很酷，内容也很丰富！期待更多技术文章。",
    createdAt: "2025-03-26T10:30:00Z",
  },
  {
    id: 2,
    name: "李四",
    email: "lisi@example.com",
    content: "反馈页面设计得不错，提交成功提示很友好。",
    createdAt: "2025-03-25T15:20:00Z",
  },
  {
    id: 3,
    name: "王五",
    email: "wangwu@example.com",
    content: "建议增加 RSS 订阅功能，方便追更。",
    createdAt: "2025-03-24T09:45:00Z",
  },
];

export default function AdminFeedbacks() {
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
            共收到 {mockFeedbacks.length} 条反馈
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFeedbacks.map((feedback) => (
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
        </div>
      </main>
      <GlobalFooter />
    </div>
  );
}
