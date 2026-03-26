// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import Home from "./pages/Home";
import Feedback from "./pages/Feedback";
import AdminFeedbacks from "./pages/adminFeedbacks";

// 全局导航栏组件（复用原 Home 中的 nav 样式）
const GlobalNav = () => (
  <nav className="mb-20 flex items-center justify-between font-mono">
    <div className="flex items-center gap-4">
      <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
      <span className="text-xs font-black uppercase tracking-tighter">
        YIJIALE.SITE / 2026
      </span>
    </div>
    <div className="flex gap-3 text-sm font-bold uppercase tracking-widest">
      <Link
        to="/"
        className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all duration-200 shadow-sm"
      >
        Home
      </Link>
      <Link
        to="/feedback"
        className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all duration-200 shadow-sm"
      >
        Feedback
      </Link>
      <Link
        to="/admin/feedbacks"
        className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all duration-200 shadow-sm"
      >
        Admin
      </Link>
      <a
        href=" "
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-200 shadow-sm"
      >
        GitHub
      </a>
    </div>
  </nav>
);

// 全局底部组件（复用原 Home 中的 footer 样式）
const GlobalFooter = () => (
  <footer className="border-t border-slate-100 pt-10 pb-6 px-6 md:px-12 lg:px-24 xl:px-32">
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-6">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-slate-900 transition"
        >
          <FaGithub size={20} />
        </a>
        {/* ... 其他社交链接 */}
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black text-slate-300 tracking-[0.2em] uppercase w-full">
        <p>© 2026 Yijiale Portfolio / All Rights Reserved</p>
        <div className="flex gap-8">
          <span className="hover:text-sky-500 cursor-pointer transition">
            Status: v4.0.2 Stable
          </span>
          <span className="hover:text-sky-500 cursor-pointer transition">
            Built for Performance
          </span>
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  // 可以根据需要隐藏导航栏或底部，例如某些页面可能不需要
  const hideNav = false; // 可扩展/admin/feedbacks
  const hideFooter = false;

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-slate-900 selection:bg-sky-100">
      {!hideNav && <GlobalNav />}
      <div className="w-full px-6 py-10 md:px-12 lg:px-24 xl:px-32 grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/admin/feedbacks" element={<AdminFeedbacks />} />
        </Routes>
      </div>
      {!hideFooter && <GlobalFooter />}
    </div>
  );
}

export default function Root() {
  return (
    <BrowserRouter basename="/tiantian-personal-website/">
      <App />
    </BrowserRouter>
  );
}
