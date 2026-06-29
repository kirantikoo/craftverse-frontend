import Link from "next/link";
import { ArrowRight, Clock, Sparkles, Trophy } from "lucide-react";
import type { Tutorial } from "@/src/data/tutorials";

export default function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <Link
      href={`/tutorials/${tutorial.slug}`}
      className="group flex min-h-[320px] flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white/85 p-5 shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#008099]/50 hover:shadow-xl dark:border-white/10 dark:bg-white/10"
    >
      <div className="flex h-36 items-center justify-center rounded-3xl bg-gradient-to-br from-[#008099] via-[#7C4DFF] to-pink-500 text-6xl shadow-inner">
        {tutorial.emoji}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#4EFE32]/15 px-3 py-1 text-xs font-black text-emerald-700 dark:text-[#4EFE32]">
          <Sparkles size={13} />
          {tutorial.difficulty}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#008099]/10 px-3 py-1 text-xs font-black text-[#008099] dark:text-cyan-200">
          <Clock size={13} />
          {tutorial.timeRequired}
        </span>
      </div>
      <p className="mt-4 text-sm font-bold text-[#7C4DFF] dark:text-violet-300">{tutorial.category}</p>
      <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900 dark:text-white">{tutorial.title}</h2>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{tutorial.description}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
          <Trophy size={16} className="text-[#7C4DFF]" />
          {tutorial.xp} XP
        </span>
        <span className="inline-flex h-11 items-center gap-2 rounded-2xl bg-[#FFF8F3] px-4 text-sm font-black text-slate-900 transition group-hover:bg-white dark:bg-white/10 dark:text-white dark:group-hover:bg-[#FFF8F3] dark:group-hover:text-slate-950">
          Open Tutorial
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
