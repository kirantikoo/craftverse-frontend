import Link from "next/link";
import { ArrowRight, Bot, Sparkles } from "lucide-react";
import TutorialCard from "@/components/tutorials/TutorialCard";
import { tutorials } from "@/src/data/tutorials";

export default function TutorialsPage() {
  return (
    <div className="mx-auto w-full max-w-[1540px] space-y-6 pb-4">
      <section className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-[#FFF8F3] p-6 shadow-[0_24px_70px_rgba(15,23,42,0.12)] sm:p-8 lg:p-10 dark:border-white/10 dark:bg-white/[0.07]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/70 px-4 py-2 text-sm font-black text-[#008099] dark:border-white/10 dark:bg-white/10 dark:text-cyan-200">
              <Sparkles size={16} />
              Tutorial System Phase 1
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              CraftVerse Tutorials
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-slate-200">
              Learn with structured lessons, embedded YouTube placeholders, AI summaries, step progress, uploads, XP and comments.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <Link href="/tutorials/easy-tote-bag" className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#008099] via-[#7C4DFF] to-pink-500 px-5 text-sm font-black text-white shadow-[0_12px_30px_rgba(124,77,255,0.30)] transition hover:-translate-y-0.5 hover:brightness-110">
              Start Creating
              <ArrowRight size={17} />
            </Link>
            <Link href="/ai-tutor" className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-5 text-sm font-black text-slate-900 transition hover:border-[#4EFE32]/70 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white">
              <Bot size={17} />
              Ask AI Tutor
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial.slug} tutorial={tutorial} />
        ))}
      </section>
    </div>
  );
}
