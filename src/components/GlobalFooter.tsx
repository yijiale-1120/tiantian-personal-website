// src/components/GlobalFooter.tsx
import { FaGithub } from "react-icons/fa";

export default function GlobalFooter() {
  return (
    <footer className="border-t border-slate-100 pt-10 pb-6 px-6 md:px-12 lg:px-24 xl:px-32">
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-6">
          <a
            href=" "
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-900 transition"
          >
            <FaGithub size={20} />
          </a>
          {/* 可添加更多社交链接 */}
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
}
