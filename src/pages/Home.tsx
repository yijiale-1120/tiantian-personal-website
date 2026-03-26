import { useState } from "react";
import {
  /*FaCode,
  FaTerminal,
  FaDatabase,*/
  FaExternalLinkAlt,
  /*FaLayerGroup,*/
} from "react-icons/fa";

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
  roadmap: [
    {
      version: "v1.0",
      status: "Done",
      title: "Frontend Foundation",
      details: "React, Tailwind v4, TS 基础.",
    },
    {
      version: "v2.0",
      status: "Active",
      title: "Full-Stack Bridge",
      details: "Next.js 15, PostgreSQL, Prisma.",
    },
    {
      version: "v3.0",
      status: "Planned",
      title: "Engineering Expert",
      details: "CI/CD, Vitest, Performance Opt.",
    },
  ],
  // 新增文章数据
  posts: [
    {
      id: 1,
      title: "从土木到前端：我的自学之路",
      date: "2025-03-20",
      excerpt: "分享如何从零开始学习前端，跨越专业壁垒，最终找到自己的热爱。",
      link: "#",
    },
    {
      id: 2,
      title: "深入 Tailwind CSS v4 新特性",
      date: "2025-03-15",
      excerpt:
        "介绍 Tailwind v4 的 Vite 插件配置、CSS-first 理念，以及相比 v3 的变化。",
      link: "#",
    },
    {
      id: 3,
      title: "使用 GitHub Actions 自动化部署 Vite 项目",
      date: "2025-03-10",
      excerpt: "一步步配置工作流，实现推送即部署到 GitHub Pages。",
      link: "#",
    },
  ],
  // 新增时间线数据
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

export default function Home() {
  const [activeTab, setActiveTab] = useState("works");

  return (
    <div className="w-full px-6 py-10 md:px-12 lg:px-24 xl:px-32 grow">
      {/* --- Header / Navigation --- */}

      {/* --- Main Grid Layout --- */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* --- Left Column: Static Profile Card (保留原有) --- */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-10 shadow-sm transition-all hover:shadow-xl">
            <div className="relative z-10 space-y-6">
              <div className="h-20 w-20 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-3xl font-black">
                乐
              </div>
              <div className="space-y-2">
                <h1 className="text-5xl font-black tracking-tighter italic">
                  {DATA.profile.name}
                </h1>
                <p className="text-sky-600 font-mono font-bold">
                  {DATA.profile.role}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                {DATA.profile.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {DATA.profile.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-50 rounded-full text-[10px] font-bold text-slate-400 border border-slate-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 h-40 w-40 bg-sky-50 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
          </div>

          {/* --- 技术墙 (非卡片形式，替换原有技能卡片) --- */}
          <div className="p-8 bg-slate-900 rounded-[2.5rem]">
            <h3 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {DATA.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-[11px] font-medium hover:bg-white/20 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* --- Right Column: Dynamic Content Area --- */}
        <main className="lg:col-span-8 space-y-16">
          {/* --- 现有标签页 (保留 Project Works 和 Roadmap/Log) --- */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab("works")}
                  className={`text-sm font-black uppercase tracking-widest transition ${activeTab === "works" ? "text-black" : "text-slate-300"}`}
                >
                  Project Works
                </button>
                <button
                  onClick={() => setActiveTab("roadmap")}
                  className={`text-sm font-black uppercase tracking-widest transition ${activeTab === "roadmap" ? "text-black" : "text-slate-300"}`}
                >
                  Roadmap / Log
                </button>
              </div>
              <span className="font-mono text-[10px] text-slate-300">
                Total_Items:{" "}
                {activeTab === "works"
                  ? DATA.projects.length
                  : DATA.roadmap.length}
              </span>
            </div>

            {activeTab === "works" ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-8">
                {DATA.projects.map((proj) => (
                  <article
                    key={proj.id}
                    className="group flex flex-col justify-between p-8 bg-white border border-slate-100 rounded-4xl hover:shadow-2xl hover:shadow-slate-200/50 transition-all"
                  >
                    <div className="space-y-4">
                      <div
                        className={`h-2 w-12 rounded-full bg-linear-to-r ${proj.color}`}
                      ></div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {proj.type}
                      </h4>
                      <h3 className="text-2xl font-black text-slate-900 group-hover:text-sky-600 transition">
                        {proj.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {proj.desc}
                      </p>
                    </div>
                    <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
                      <div className="flex gap-2">
                        {proj.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-bold text-slate-400"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                      <FaExternalLinkAlt
                        className="text-slate-300 group-hover:text-slate-900 transition cursor-pointer"
                        size={14}
                      />
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="space-y-6 mt-8">
                {DATA.roadmap.map((item, index) => (
                  <div
                    key={item.version}
                    className="flex items-start gap-6 p-8 bg-white border border-slate-100 rounded-3xl relative overflow-hidden group"
                  >
                    <div className="text-xs font-mono font-bold text-sky-500">
                      {item.version}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-black text-slate-900">
                          {item.title}
                        </h4>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${item.status === "Active" ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-400"}`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">{item.details}</p>
                    </div>
                    {index !== DATA.roadmap.length - 1 && (
                      <div className="absolute left-8.5 top-14 bottom-0 w-px bg-slate-100"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ========== 新增内容区域 (非卡片形式) ========== */}

          {/* --- 1. 最新文章 (垂直列表) --- */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black tracking-tight">最新文章</h2>
            <div className="divide-y divide-slate-100">
              {DATA.posts.map((post) => (
                <div key={post.id} className="py-6 first:pt-0 last:pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                    <span className="text-xs font-mono text-slate-400 sm:w-24 shrink-0">
                      {post.date}
                    </span>
                    <div className="flex-1">
                      <a
                        href={post.link}
                        className="text-lg font-bold text-slate-900 hover:text-sky-600 transition"
                      >
                        {post.title}
                      </a>
                      <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <a
                        href={post.link}
                        className="inline-block mt-2 text-xs font-bold text-sky-600 hover:underline"
                      >
                        阅读更多 →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- 2. 技术足迹 (时间线，无卡片) --- */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black tracking-tight">技术足迹</h2>
            <div className="relative pl-6 border-l border-slate-200 ml-4 space-y-8">
              {DATA.timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[1.65rem] top-0 w-3 h-3 rounded-full bg-sky-400 border-2 border-white"></div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                    <span className="text-sm font-mono font-bold text-sky-600 sm:w-24 shrink-0">
                      {item.year}
                    </span>
                    <p className="text-slate-700">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- 3. 数据展示区 (数字指标，无边框) --- */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4">
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

          {/* --- 4. 关于我 (长篇叙事) --- */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight">关于我</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-base leading-relaxed text-slate-600">
                {DATA.about}
              </p>
            </div>
          </section>

          {/* --- 5. 引用金句 --- */}
          <blockquote className="py-8 px-6 bg-slate-100 rounded-2xl italic text-slate-600 text-center text-xl font-medium border-l-4 border-sky-400">
            “{DATA.quote}”
          </blockquote>
        </main>
      </div>
    </div>
  );
}
