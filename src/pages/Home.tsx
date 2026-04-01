// src/pages/Home.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.ts";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

// ---------- 数据（与原来一致）----------
const DATA = {
  profile: {
    name: "易家乐",
    role: "Frontend Developer",
    bio: "从土木工程蓝图到数字世界架构。我习惯于用严谨的工程思维，构建简洁、高效且易于维护的前端应用。",
    tags: ["25岁", "湖北工程学院", "土木转行", "自学成才"],
    status: "Looking for Opportunities",
  },
  projects: [
    {
      id: "weather",
      title: "Weather Pulse",
      type: "Weather App",
      desc: "基于 React 18 与第三方 API。攻克了异步请求并发控制,利用 Tailwind v4 实现动态主题切换。",
      tech: ["React", "Axios", "Vite"],
      link: "#",
      color: "from-sky-400 to-blue-500",
    },
    {
      id: "ai-chat",
      title: "DeepChat Mini",
      type: "AI Interface",
      desc: "集成 Deepseek API,配合 Node.js 中转服务器。实现了流式输出渲染与敏感信息加密处理。",
      tech: ["Node.js", "Express", "Stream API"],
      link: "#",
      color: "from-indigo-500 to-purple-600",
    },
    {
      id: "new-project",
      title: "AI 简历分析器",
      type: "Tool",
      desc: "使用 OpenAI API 解析简历，生成优化建议。支持 PDF 上传和关键词匹配。",
      tech: ["OpenAI", "React", "Express", "MongoDB"],
      link: "#",
      color: "from-emerald-400 to-teal-500",
    },
  ],
  skills: [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Vite",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Prisma",
    "Git",
    "Figma",
    "Jest",
    "Vue (基本)",
  ],
  timeline: [
    { year: "2021", event: "开始自学前端，接触 HTML/CSS/JS" },
    { year: "2022", event: "学习 React,完成第一个个人项目" },
    { year: "2023", event: "入职初创公司，负责前端开发" },
    { year: "2024", event: "深入学习 TypeScript 和 Next.js" },
    { year: "2025", event: "构建个人博客，探索全栈技术" },
  ],
  stats: [
    { value: "10+", label: "项目经验" },
    { value: "3年", label: "前端开发" },
    { value: "20+", label: "技术文章" },
    { value: "500+", label: "GitHub 贡献" },
  ],
  quote: "代码是逻辑的诗篇，而设计是情感的表达。",
  about:
    "我是一名热爱技术的开发者，拥有土木工程背景。转行以来，我始终保持着对新技术的好奇心，喜欢通过构建项目来深化理解。我相信优秀的代码不仅能够运行，更应具备可读性和可维护性。当前我正在探索全栈领域，希望未来能成为一名独立的创作者。",
};

// 右上角：未登录「登录 + 反馈」；已登录「已登录(灰、不可点) + 反馈」——仅把原来的「写反馈」换成「已登录」
function ActionButtons() {
  const { token, isReady } = useAuth();

  const feedbackLinkClass =
    "px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700 hover:bg-sky-500 hover:text-white transition-all shadow-sm text-sm font-medium";

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-3">
      {!isReady ? (
        <span className="px-4 py-2 rounded-full bg-white/60 text-slate-400 text-sm font-medium border border-slate-100">
          …
        </span>
      ) : token ? (
        <>
          <span
            className="px-4 py-2 rounded-full bg-slate-100/90 border border-slate-200 text-slate-400 text-sm font-medium cursor-not-allowed select-none"
            aria-disabled="true"
          >
            已登录
          </span>
          <Link to="/feedback" className={feedbackLinkClass}>
            反馈
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700 hover:bg-sky-500 hover:text-white transition-all shadow-sm text-sm font-medium"
          >
            登录
          </Link>
          <Link to="/feedback" className={feedbackLinkClass}>
            反馈
          </Link>
        </>
      )}
      <button className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700 hover:bg-sky-500 hover:text-white transition-all shadow-sm text-sm font-medium">
        订阅
      </button>
      <button className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700 hover:bg-sky-500 hover:text-white transition-all shadow-sm text-sm font-medium">
        联系
      </button>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("works");

  return (
    <div className="relative min-h-screen">
      {/* 右上角按钮组 */}
      <ActionButtons />

      {/* 顶部 1/4 大图 */}
      <div
        className="h-[25vh] bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* 主要内容区：左右分栏 */}
      <div className="w-full  px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* 左侧：个人介绍 + 时间戳 */}
          <aside className="lg:col-span-3 space-y-10">
            {/* 个人卡片 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="h-20 w-20 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-3xl font-black mb-6">
                乐
              </div>
              <h1 className="text-4xl font-black tracking-tight">
                {DATA.profile.name}
              </h1>
              <p className="text-sky-600 font-mono font-bold mt-1">
                {DATA.profile.role}
              </p>
              <p className="mt-4 text-slate-500 leading-relaxed text-sm">
                {DATA.profile.bio}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {DATA.profile.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-50 rounded-full text-[10px] font-bold text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 时间戳 */}
            <div className="bg-slate-50 rounded-3xl p-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                时间戳
              </h3>
              <div className="space-y-4">
                {DATA.timeline.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex gap-3 text-sm">
                    <span className="font-mono font-bold text-sky-600 w-16">
                      {item.year}
                    </span>
                    <span className="text-slate-600">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* 右侧：主内容 */}
          <main className="lg:col-span-9 space-y-16">
            {/* 技能墙 */}
            <section>
              <h2 className="text-2xl font-black tracking-tight mb-6">
                技术栈
              </h2>
              <div className="flex flex-wrap gap-2">
                {DATA.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700 hover:bg-sky-50 hover:border-sky-200 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* 项目作品（标签页） */}
            <section>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex gap-8">
                  <button
                    onClick={() => setActiveTab("works")}
                    className={`text-sm font-black uppercase tracking-widest transition ${
                      activeTab === "works" ? "text-black" : "text-slate-300"
                    }`}
                  >
                    项目作品
                  </button>
                  <button
                    onClick={() => setActiveTab("roadmap")}
                    className={`text-sm font-black uppercase tracking-widest transition ${
                      activeTab === "roadmap" ? "text-black" : "text-slate-300"
                    }`}
                  >
                    技术路线
                  </button>
                </div>
              </div>

              {activeTab === "works" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                  {DATA.projects.map((proj) => (
                    <article
                      key={proj.id}
                      className="group p-6 bg-white border border-slate-100 rounded-2xl hover:shadow-xl transition"
                    >
                      <div
                        className={`h-2 w-12 rounded-full bg-linear-to-r ${proj.color} mb-4`}
                      />
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {proj.type}
                      </h4>
                      <h3 className="text-xl font-black mt-2 group-hover:text-sky-600 transition">
                        {proj.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                        {proj.desc}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {proj.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-8 space-y-6">
                  {DATA.timeline.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100"
                    >
                      <div className="w-16 font-mono font-bold text-sky-600">
                        {item.year}
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-800 font-medium">
                          {item.event}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 统计 */}
            <section className="grid grid-cols-3 md:grid-cols-4 gap-8 py-4">
              {DATA.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-black text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </section>

            {/* 关于我 */}
            <section>
              <h2 className="text-2xl font-black tracking-tight mb-4">
                关于我
              </h2>
              <p className="text-slate-600 leading-relaxed">{DATA.about}</p>
            </section>
          </main>
        </div>
      </div>

      {/* 底部：金句 + 社交图标 */}
      <footer className="border-t border-slate-100 mt-20 py-12 px-6 text-center">
        <blockquote className="text-xl italic text-slate-500 mb-6 max-w-2xl mx-auto">
          “{DATA.quote}”
        </blockquote>
        <div className="flex justify-center gap-6 mb-4">
          <a
            href=" "
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-900 transition"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-900 transition"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-900 transition"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="mailto:your@email.com"
            className="text-slate-400 hover:text-slate-900 transition"
          >
            <FaEnvelope size={20} />
          </a>
        </div>
        <p className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">
          © 2026 易家乐 · 保持好奇
        </p>
      </footer>
    </div>
  );
}
