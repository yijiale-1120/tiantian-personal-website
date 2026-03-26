import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  /* FaCode, 
  FaTerminal, FaChevronRight, FaDatabase,*/ FaToolbox,
  FaQuoteLeft,
  FaArrowRight,
  FaHistory,
} from "react-icons/fa";

/**
 * 易家乐 (Yijiale) Personal Portfolio v5.0 - Narrative Edition
 * 布局：响应式全宽流式布局
 */

const DATA = {
  stats: [
    { label: "Lines of Code", value: "50k+" },
    { label: "Cups of Coffee", value: "240" },
    { label: "Projects Built", value: "12" },
    { label: "Learning Days", value: "365" },
  ],
  skills: [
    "React",
    "TypeScript",
    "Vite",
    "Tailwind v4",
    "Next.js",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Prisma",
    "Zustand",
    "Git",
    "Docker",
    "Postman",
  ],
  articles: [
    {
      date: "2026-03",
      title: "从土木蓝图到 React 组件：逻辑的异曲同工",
      readTime: "5 min",
    },
    {
      date: "2026-02",
      title: "Tailwind v4 迁移指南：为什么 CSS-first 是未来",
      readTime: "8 min",
    },
    {
      date: "2026-01",
      title: "如何用 Node.js 优雅地封装一个 AI 中转层",
      readTime: "12 min",
    },
  ],
  timeline: [
    { year: "2026", event: "启动全栈进阶计划，攻克分布式缓存与后端架构。" },
    {
      year: "2025",
      event: "成功转型前端开发，交付 3 个高质量商业级单页应用。",
    },
    {
      year: "2024",
      event: "挥别土木工地，开启自学模式，完成首个 100 Days of Code。",
    },
  ],
};

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-slate-900 selection:bg-sky-100">
      {/* --- 全宽容器 --- */}
      <div className="w-full px-6 py-10 md:px-12 lg:px-24 xl:px-32 grow">
        {/* --- 顶部导航 --- */}
        <nav className="mb-24 flex items-center justify-between mix-blend-difference">
          <div className="text-xl font-black tracking-tighter uppercase italic">
            Yijiale<span className="text-sky-500">.</span>Dev
          </div>
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <a href="#story" className="hover:text-black transition">
              The Story
            </a>
            <a href="#archive" className="hover:text-black transition">
              Archive
            </a>
            <a href="#arsenal" className="hover:text-black transition">
              Arsenal
            </a>
            <a
              href="#contact"
              className="hover:text-sky-500 transition text-sky-600"
            >
              Hire Me
            </a>
          </div>
        </nav>

        {/* --- 主布局 --- */}
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
          {/* --- 左侧：核心名片 (Sticky) --- */}
          <aside className="lg:col-span-4 lg:sticky lg:top-10 lg:h-fit">
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="h-16 w-16 bg-black rounded-full flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-slate-200">
                  乐
                </div>
                <h1 className="text-6xl font-black tracking-tighter">易家乐</h1>
                <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
                  Building digital concrete
                </p>
              </div>

              {/* 社交链接行 */}
              <div className="flex gap-6 text-xl text-slate-300">
                <FaGithub className="hover:text-black transition cursor-pointer" />
                <FaLinkedin className="hover:text-sky-600 transition cursor-pointer" />
                <FaTwitter className="hover:text-sky-400 transition cursor-pointer" />
                <FaEnvelope className="hover:text-red-500 transition cursor-pointer" />
              </div>

              {/* 数据展示区 (Stats) */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-10">
                {DATA.stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-black text-slate-900">
                      {s.value}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* --- 右侧：沉浸式流式内容 --- */}
          <main className="lg:col-span-8 space-y-32 pb-20">
            {/* 1. 长篇叙事区块 (Narrative) */}
            <section id="story" className="relative">
              <FaQuoteLeft className="absolute -left-10 -top-6 text-slate-100 text-6xl -z-10" />
              <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight mb-8">
                “代码是另一种形式的建筑。在土木现场，我学会了
                <span className="text-sky-500 underline decoration-4 underline-offset-8">
                  地基的高度决定大楼的高度
                </span>
                ；在屏幕前，我用逻辑搭建我的世界。”
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 space-y-4 leading-relaxed">
                <p>
                  我今年 25
                  岁，毕业于土木工程专业。曾经我的工具是安全帽和经纬仪，现在是
                  VS Code 和 Chrome DevTools。
                  转行并不是逃避，而是发现代码能提供更纯粹的创造力。
                </p>
                <p>
                  目前我专注于 **React 生态系统**，并对 **Tailwind v4**
                  的工程化效率着迷。我写代码不仅为了实现功能，更为了那份如蓝图般严丝合缝的结构美感。
                </p>
              </div>
            </section>

            {/* 2. 文章/项目列表 (Minimal List) */}
            <section id="archive" className="space-y-12">
              <div className="flex items-center gap-4">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300">
                  Selected Writing
                </h3>
                <div className="h-px flex-1 bg-slate-100"></div>
              </div>
              <div className="space-y-0">
                {DATA.articles.map((art, i) => (
                  <div
                    key={i}
                    className="group py-8 border-b border-slate-100 flex items-center justify-between hover:px-4 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="font-mono text-[10px] text-slate-300">
                        {art.date}
                      </span>
                      <h4 className="text-xl font-bold group-hover:text-sky-600 transition">
                        {art.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="hidden md:inline text-[10px] font-bold text-slate-300 uppercase italic">
                        {art.readTime}
                      </span>
                      <FaArrowRight
                        size={12}
                        className="text-slate-200 group-hover:text-sky-500 group-hover:translate-x-2 transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. 技能工具墙 (Arsenal Wall) */}
            <section id="arsenal" className="space-y-10">
              <div className="flex items-center gap-3 mb-8">
                <FaToolbox className="text-sky-500" />
                <h3 className="text-sm font-black uppercase tracking-widest">
                  My Digital Arsenal
                </h3>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-6">
                {DATA.skills.map((s) => (
                  <span
                    key={s}
                    className="text-4xl md:text-5xl font-black text-slate-100 hover:text-sky-500 transition-colors duration-500 cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400 font-medium">
                不断扩充中... 正在深入探索分布式系统与 Rust 语言。
              </p>
            </section>

            {/* 4. 时间线 (Evolution) */}
            <section className="space-y-10">
              <div className="flex items-center gap-3 mb-8">
                <FaHistory className="text-slate-300" />
                <h3 className="text-sm font-black uppercase tracking-widest">
                  Evolution Timeline
                </h3>
              </div>
              <div className="relative border-l-2 border-slate-100 ml-4 pl-10 space-y-16 py-4">
                {DATA.timeline.map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-12.25 top-1.5 h-4 w-4 rounded-full bg-white border-4 border-slate-900 shadow-sm"></div>
                    <div className="font-mono text-xs font-black text-sky-500 mb-2">
                      {item.year}
                    </div>
                    <p className="text-sm text-slate-600 max-w-xl font-medium">
                      {item.event}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. 底部联系区 (Final CTA) */}
            <section
              id="contact"
              className="py-20 bg-slate-900 rounded-[3rem] p-12 text-center space-y-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-64 w-64 bg-sky-500/20 blur-[100px]"></div>
              <h2 className="text-4xl font-black text-white tracking-tighter">
                准备好开启下一个工程了吗？
              </h2>
              <p className="text-slate-400 max-w-md mx-auto text-sm">
                正在寻找前端或全栈相关的开发机会。无论你在哪里，只要有代码，就有无限可能。
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="mailto:yijiale@email.com"
                  className="px-8 py-4 bg-white text-slate-900 text-xs font-black rounded-full hover:bg-sky-500 hover:text-white transition-all uppercase tracking-widest"
                >
                  Send an Email
                </a>
                <button className="px-8 py-4 bg-slate-800 text-white text-xs font-black rounded-full hover:bg-slate-700 transition-all uppercase tracking-widest">
                  Download Resume
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* --- Footer --- */}
      <footer className="w-full px-6 py-10 md:px-12 lg:px-24 xl:px-32 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
          Copyright © 2026 Yijiale.Dev — Built on Oxide Engine
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-green-500 rounded-full"></span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            Always Online / Ready to Build
          </span>
        </div>
      </footer>
    </div>
  );
}
