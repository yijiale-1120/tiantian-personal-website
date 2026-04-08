import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const pill =
  "px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 hover:bg-sky-500 hover:text-white transition-all btn-hover-scale";

export default function GlobalNav() {
  return (
    <nav className="glass-nav mb-20 flex items-center justify-between font-mono px-6 md:px-12 lg:px-24 xl:px-32">
      <div className="flex items-center gap-4">
        <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
        <span className="text-xs font-black uppercase tracking-tighter">
          YIJIALE.SITE / 2026
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-3 text-sm font-bold uppercase tracking-widest">
        <Link href="/" className={pill}>
          Home
        </Link>
        <Link href="/feedback" className={pill}>
          Feedback
        </Link>
        <Link href="/admin/feedbacks" className={pill}>
          Admin
        </Link>
        <a
          href=" "
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 hover:bg-slate-800 hover:text-white transition-all btn-hover-scale"
        >
          <FaGithub className="inline mr-2" />
          GitHub
        </a>
      </div>
    </nav>
  );
}
