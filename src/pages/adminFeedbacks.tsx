// src/pages/adminFeedbacks.tsx
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn"; // 可选中文

dayjs.extend(relativeTime);
dayjs.locale("zh-cn"); // 设置中文相对时间

// Mock 数据 - 后续替换为真实 API 请求
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
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">用户反馈</h1>
        <p className="text-slate-500 mb-8">
          共收到 {mockFeedbacks.length} 条反馈
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFeedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-slate-100"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-900">{feedback.name}</h3>
                  <p className="text-xs text-slate-400">{feedback.email}</p>
                </div>
                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                  {dayjs(feedback.createdAt).fromNow()}
                </span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mt-2">
                {feedback.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
