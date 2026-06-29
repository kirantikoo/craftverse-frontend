import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { CraftPage as CraftPageData } from "@/data/pages";

export default function CraftPage({ page }: { page: CraftPageData }) {
  return (
    <div className="mx-auto w-full max-w-[1540px] space-y-6 pb-2">
      <section className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-[#FFF8F3]/90 p-6 shadow-[0_18px_48px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-white/[0.07] dark:shadow-[0_18px_48px_rgba(0,0,0,0.24)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/70 px-4 py-2 text-sm font-bold text-[#008099] shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-cyan-200">
              <Sparkles size={16} />
              {page.eyebrow}
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              {page.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-slate-200">
              {page.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <Link href={page.primaryHref} className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#008099] via-[#7C4DFF] to-pink-500 px-5 text-sm font-black text-white shadow-[0_12px_30px_rgba(124,77,255,0.30)] transition hover:-translate-y-0.5 hover:brightness-110">
              {page.primaryCta}
              <ArrowRight size={17} />
            </Link>
            <Link href={page.secondaryHref} className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-5 text-sm font-black text-slate-900 shadow-sm transition hover:border-[#4EFE32]/70 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15">
              {page.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {page.cards.map((card) => (
          <Link key={card.title} href={card.href} className="group flex min-h-[260px] flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#008099]/45 hover:shadow-xl dark:border-white/10 dark:bg-white/10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#008099] via-[#7C4DFF] to-pink-500 text-3xl text-white shadow-lg">
                {card.emoji}
              </div>
              <span className="rounded-full bg-[#4EFE32]/18 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-[#4EFE32]/15 dark:text-[#4EFE32]">
                {card.meta}
              </span>
            </div>
            <h2 className="mt-5 text-xl font-black tracking-tight text-slate-900 dark:text-white">
              {card.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {card.description}
            </p>
            <span className="mt-5 flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-[#FFF8F3] text-sm font-bold text-slate-900 transition group-hover:border-[#7C4DFF]/40 group-hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:group-hover:bg-white/15">
              {card.cta}
              <ArrowRight size={16} />
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
