import {
  FaGithub,
  FaEnvelope,
  /*FaCode, 
  FaTerminal, */
  FaChevronRight,
  FaDatabase,
  FaCloudSun,
  FaRobot,
  FaMapMarkerAlt,
  FaGraduationCap,
} from "react-icons/fa";

/**
 * 易家乐的个人简历网站 - 博客响应式布局 (v4 适配版)
 */

// --- 数据模型定义 ---
const PROJECTS = [
  {
    title: "🌦️ 极简天气查询工具",
    date: "MAR 2026",
    tags: ["React 18", "TypeScript", "Vite", "Axios"],
    icon: <FaCloudSun className="text-sky-500" />,
    description:
      "基于 OpenWeather API 开发的实时天气系统。攻克了高频请求下的性能瓶颈，并利用 Tailwind v4 的 CSS 变量实现了随天气自动切换的动态主题色系统。",
    method: "通过本项目深度理解了组件生命周期与外部 API 的状态同步逻辑。",
  },
  {
    title: "🤖 DeepChat AI 助手",
    date: "APR 2026",
    tags: ["Node.js", "Deepseek API", "Stream UI"],
    icon: <FaRobot className="text-indigo-500" />,
    description:
      "一个全栈雏形项目。前端实现 Markdown 实时渲染，后端基于 Node.js 搭建中转服务，确保 API Key 安全的同时实现流式回复（Streaming）效果。",
    method: "掌握了前后端分离架构下的跨域处理（CORS）与环境变量配置。",
  },
];

const SKILLS = [
  "React",
  "TypeScript",
  "Vite",
  "Tailwind v4",
  "Node.js",
  "Git",
  "Zustand",
];

const ROADMAP = [
  {
    phase: "01 / NOW",
    title: "前端筑基 (Current)",
    desc: "深耕 React 生态，掌握 TypeScript 强类型开发。目前已具备独立交付高质量响应式页面的能力。",
    techs: ["React Hooks", "Component Design", "Tailwind Logic"],
  },
  {
    phase: "02 / SOON",
    title: "全栈进阶 (Evolution)",
    desc: "引入 Next.js 15 框架，学习 Prisma 与 PostgreSQL 数据库建模，实现用户登录与数据持久化功能。",
    techs: ["Next.js", "PostgreSQL", "Server Actions"],
  },
  {
    phase: "03 / FUTURE",
    title: "架构师视角 (Vision)",
    desc: "探索 Web3 或 3D 渲染（Three.js），掌握 CI/CD 自动化流水线，成为真正意义上的工程化专家。",
    techs: ["Three.js", "Docker", "CI/CD"],
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-sky-100 selection:text-sky-900">
      {/* --- 全局布局容器 (最大宽度 1600px) --- */}
      <div className="mx-auto max-w-[1600px] px-6 py-6 md:px-12 md:py-10">
        {/* 顶部微型装饰 */}
        <header className="mb-12 flex items-center justify-between border-b border-slate-50 pb-6">
          <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
            <span className="h-2 w-2 rounded-full bg-sky-500"></span>
            Yijiale.Builds / v4.0 Stable
          </div>
          <nav className="flex gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <a href="#projects" className="hover:text-sky-500 transition">
              Works
            </a>
            <a href="#roadmap" className="hover:text-sky-500 transition">
              Roadmap
            </a>
            <span className="hidden md:inline text-slate-200">|</span>
            <span className="hidden md:inline">Built with Bricks & Bits</span>
          </nav>
        </header>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* --- 左侧：个人名片 (Aside) - 占比 3/12 --- */}
          <aside className="lg:col-span-3 lg:sticky lg:top-10 lg:h-[calc(100vh-100px)] flex flex-col justify-between">
            <div className="space-y-8">
              {/* 头像与标题 */}
              <div className="space-y-6">
                <div className="relative inline-block group">
                  <div className="absolute -inset-1 bg-linear-to-r from-sky-400 to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <div className="relative h-28 w-28 rounded-[2.2rem] bg-white border border-slate-100 flex items-center justify-center text-4xl font-black text-slate-900 shadow-sm">
                    乐
                  </div>
                </div>

                <div className="space-y-2">
                  <h1 className="text-5xl font-black tracking-tighter text-slate-950">
                    易家乐
                  </h1>
                  <p className="text-lg font-medium text-sky-600">
                    Frontend Developer
                  </p>
                </div>
              </div>

              {/* 核心信息 */}
              <div className="space-y-4 text-sm text-slate-500">
                <p className="leading-relaxed">
                  25岁，湖北工程学院土木本科毕业。
                  <br />
                  我将建筑行业的严谨融入代码，致力于构建高性能、可扩展的 Web
                  应用。
                </p>

                <div className="space-y-3 pt-4 font-medium">
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-slate-300" /> 现居：湖北
                  </div>
                  <div className="flex items-center gap-3">
                    <FaGraduationCap className="text-slate-300" /> 土木工程 ·
                    本科
                  </div>
                </div>
              </div>

              {/* 标签云 */}
              <div className="pt-4 flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[11px] font-bold text-slate-500"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 侧边栏底部联系方式 */}
            <div className="pt-8 space-y-4 border-t border-slate-100">
              <a
                href="mailto:yijiale@email.com"
                className="group flex items-center gap-4 text-sm font-bold text-slate-900"
              >
                <div className="p-2.5 bg-slate-900 text-white rounded-xl transition-transform group-hover:scale-110">
                  <FaEnvelope size={14} />
                </div>
                yijiale@email.com
              </a>
              <a
                href="https://github.com"
                className="group flex items-center gap-4 text-sm font-bold text-slate-900"
              >
                <div className="p-2.5 bg-slate-100 text-slate-900 rounded-xl transition-transform group-hover:bg-sky-500 group-hover:text-white">
                  <FaGithub size={14} />
                </div>
                GitHub Profile
              </a>
            </div>
          </aside>

          {/* --- 右侧：内容流 (Main) - 占比 9/12 --- */}
          <main className="lg:col-span-9 space-y-24">
            {/* 项目展示板块 */}
            <section id="projects" className="space-y-10">
              <div className="flex items-baseline gap-4">
                <h2 className="text-4xl font-black tracking-tighter text-slate-950">
                  Works / 项目归档
                </h2>
                <div className="h-1 flex-1 bg-slate-50 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PROJECTS.map((proj, i) => (
                  <article
                    key={i}
                    className="group relative bg-white p-10 rounded-[3rem] border border-slate-100 hover:border-sky-200 transition-all duration-500 hover:shadow-2xl hover:shadow-sky-100/30"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="p-4 bg-slate-50 rounded-[1.5rem] group-hover:bg-sky-50 transition-colors duration-500">
                        {proj.icon}
                      </div>
                      <span className="text-[10px] font-black text-slate-300 tracking-[0.2em]">
                        {proj.date}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-950 mb-4 group-hover:text-sky-600 transition">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-8">
                      {proj.description}
                    </p>

                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-2">
                        {proj.tags.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 bg-slate-50 text-[10px] font-extrabold text-slate-400 rounded-full uppercase tracking-wider"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-2 group-hover:gap-3 transition-all">
                          查看技术文档 <FaChevronRight size={10} />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* 全栈升级路线图板块 */}
            <section
              id="roadmap"
              className="relative overflow-hidden rounded-[3.5rem] bg-slate-950 p-10 md:p-20 text-slate-400"
            >
              {/* 背景装饰光晕 */}
              <div className="absolute top-0 right-0 -mr-40 -mt-40 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[120px]"></div>

              <div className="relative z-10 space-y-16">
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-white tracking-tighter italic">
                    Roadmap v2.0
                  </h2>
                  <p className="max-w-xl text-slate-500">
                    这不仅仅是未来的计划，更是我作为“跨界开发者”不断推倒重建、迭代升级的工程蓝图。
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {ROADMAP.map((item, i) => (
                    <div key={i} className="group space-y-6">
                      <div className="text-[10px] font-black text-sky-500 tracking-[0.3em] uppercase">
                        {item.phase}
                      </div>
                      <h4 className="text-xl font-bold text-white group-hover:translate-x-2 transition-transform">
                        {item.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-slate-500">
                        {item.desc}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-4">
                        {item.techs.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-bold text-slate-400 border border-slate-800 px-2 py-1 rounded"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 全栈进阶的方法论说明 */}
                <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row gap-10 items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-500 shadow-inner">
                      <FaDatabase size={24} />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white uppercase tracking-widest">
                        全栈实现路径
                      </h5>
                      <p className="text-xs text-slate-500 mt-1">
                        使用 Next.js 服务端 Actions 替代传统 API，通过 Prisma
                        ORM 筑牢底层数据地基。
                      </p>
                    </div>
                  </div>
                  <button className="w-full md:w-auto px-8 py-4 bg-white text-slate-950 text-xs font-black rounded-2xl hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
                    获取详细技术栈清单
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>

        {/* --- 底部 (Footer) --- */}
        <footer className="mt-24 border-t border-slate-100 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
            © 2026 Yijiale.Builds / Designed by Yijiale
          </div>
          <div className="flex gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span className="text-green-500 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Portfolio Active
            </span>
            <a href="#" className="hover:text-slate-900 transition">
              GitHub Source
            </a>
            <a href="#" className="hover:text-slate-900 transition">
              RSS Feed
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
