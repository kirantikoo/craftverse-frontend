import Image from "next/image";
import { ArrowRight, Bot, Play, Sparkles, Star, Trophy, Users } from "lucide-react";
import { categories, tutorials } from "@/data/home";
import StatActionCard from "@/components/dashboard/StatActionCard";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[1540px] space-y-6 pb-2">
      <section className="relative -mx-4 min-h-[520px] overflow-hidden bg-gradient-to-br from-sky-100 via-violet-100 to-pink-100 shadow-[0_22px_60px_rgba(15,23,42,.13)] sm:mx-0 sm:rounded-[32px] dark:bg-[#071020] dark:shadow-[0_24px_70px_rgba(0,0,0,.34)]">
        <Image src="/images/peacock-feather-crochet.png" alt="Peacock feather crochet" fill priority sizes="(max-width: 1023px) 100vw, 82vw" className="object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fff8f3] via-[#fff8f3]/85 to-transparent dark:from-[#050816] dark:via-[#050816]/85 dark:to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,183,194,.35),transparent_35%),radial-gradient(circle_at_75%_30%,rgba(139,92,246,.25),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(236,72,153,.25),transparent_35%)]" />

        <div className="relative z-10 flex min-h-[520px] max-w-2xl flex-col justify-center p-7 sm:p-9 lg:p-12">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/55 bg-white/55 px-4 py-2 text-sm font-bold text-slate-900 shadow-sm backdrop-blur-xl dark:border-white/15 dark:bg-white/10 dark:text-white">
            <Sparkles size={16} className="text-yellow-500 dark:text-yellow-300" /> AI-powered craft learning
          </div>
          <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-slate-900 sm:text-5xl xl:text-[4.1rem] dark:text-white">
            Learn, create and sell your <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">handmade magic</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8 dark:text-slate-200">CraftVerse helps you learn sewing, stitching, crochet, DIY crafts, AI tutorials, daily challenges and creative projects in one cozy colorful world.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 px-7 py-4 font-black text-white shadow-[0_12px_32px_rgba(168,85,247,.38)] transition hover:-translate-y-0.5 hover:brightness-110">🚀 Start Creating <ArrowRight size={18} /></button>
            <button className="flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/65 px-7 py-4 font-black text-slate-900 backdrop-blur-xl transition hover:bg-white dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"><Play size={18} /> Watch Demo</button>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-700 sm:text-base dark:text-slate-200"><span>📚 1000+ Tutorials</span><span>🏆 Daily Challenges</span><span>🤖 AI Craft Tutor</span></div>
        </div>
      </section>

      <section className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatActionCard accent="bg-emerald-100/65 dark:bg-emerald-950/35" icon={<Star className="h-8 w-8 fill-white" />} label="Your Level" title="Creative Beginner" description="Level 3 · 650 / 1000 XP" action="View Progress">
          <div className="h-3 rounded-full bg-emerald-950/10 dark:bg-white/10"><div className="h-full w-[65%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" /></div>
        </StatActionCard>
        <StatActionCard accent="bg-orange-100/65 dark:bg-rose-950/35" icon={<Trophy className="h-8 w-8" />} label="Daily Challenge" title="Make a Paper Flower" description="Reward: +50 XP" action="Start Challenge" />
        <StatActionCard accent="bg-purple-100/65 dark:bg-purple-950/35" icon={<Bot className="h-8 w-8" />} label="AI Tutor" title="Ask for craft help" description="Get tips, stitch guides and creative ideas." action="Chat with AI" />
        <StatActionCard accent="bg-cyan-100/65 dark:bg-cyan-950/35" icon={<Users className="h-8 w-8" />} label="Community" title="12.5K Creators" description="Share, inspire and grow together." action="Explore Community" />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Explore Categories</h2><button className="font-bold text-purple-600 transition hover:text-pink-500 dark:text-purple-300">View All →</button></div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {categories.map((item) => <article key={item.name} className={`rounded-2xl bg-gradient-to-br ${item.color} p-4 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5`}><div className="text-3xl">{item.emoji}</div><h3 className="mt-3 font-extrabold">{item.name}</h3><p className="text-sm text-white/80">{item.count}</p></article>)}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Trending Tutorials</h2><button className="font-bold text-purple-600 transition hover:text-pink-500 dark:text-purple-300">View All →</button></div>
        <div className="grid gap-4 md:grid-cols-3">
          {tutorials.map((item) => <article key={item.title} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/80 p-4 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/10"><div className="mb-4 flex h-36 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 text-5xl">{item.emoji}</div><p className="text-sm font-bold text-purple-600 dark:text-purple-300">{item.category}</p><h3 className="mt-1 text-xl font-black text-slate-900 dark:text-white">{item.title}</h3><div className="mt-4 flex justify-between text-sm text-slate-600 dark:text-slate-300"><span>{item.duration}</span><span>+{item.xp} XP</span></div></article>)}
        </div>
      </section>
    </div>
  );
}
