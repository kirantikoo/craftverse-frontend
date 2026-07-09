"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Crown,
  Flame,
  Medal,
  MessageCircle,
  Palette,
  PlayCircle,
  Sparkles,
  Star,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/context/AuthContext";
import { getDaysLeft } from "@/src/lib/subscription";

const progressStats = [
  { label: "Current Plan", value: "Trial", icon: Crown },
  { label: "Trial Days Remaining", value: "12", icon: Sparkles },
  { label: "Current XP", value: "650", icon: Star },
  { label: "Current Streak", value: "5 days", icon: Flame },
];

const recentTutorials = [
  "Easy Tote Bag",
  "Crochet Flower",
  "Paper Butterfly",
];

const achievements = [
  "First Project Shared",
  "3-Day Learning Streak",
  "Sewing Basics Started",
];

function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-3xl bg-white/78 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_80px_rgba(0,128,153,0.16)] dark:bg-[#111827]/78 dark:shadow-[0_24px_80px_rgba(0,0,0,0.28)] ${className}`}>
      {children}
    </section>
  );
}

function SectionLabel({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#008099] dark:text-[#4EFE32]">
      <Icon size={15} />
      {children}
    </p>
  );
}

function DashboardContent() {
  const { displayName, profileError, userProfile } = useAuth();
  const daysLeft = getDaysLeft(userProfile?.trialEndsAt);
  const planLabel = userProfile?.plan === "premium" ? "Premium" : "Trial";
  const shownDaysLeft = daysLeft || 12;

  const stats = progressStats.map((stat) => {
    if (stat.label === "Current Plan") {
      return { ...stat, value: planLabel };
    }

    if (stat.label === "Trial Days Remaining") {
      return { ...stat, value: String(shownDaysLeft) };
    }

    return stat;
  });

  return (
    <main className="min-h-[70vh] rounded-[2rem] bg-[#F8FAFC] p-4 text-slate-950 sm:p-6 lg:p-8 dark:bg-[#050816] dark:text-[#F8FAFC]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        {profileError ? (
          <p className="rounded-3xl bg-amber-50 px-5 py-4 text-sm font-bold text-amber-800 shadow-lg dark:bg-amber-400/10 dark:text-amber-100">
            {profileError}
          </p>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[1.55fr_0.85fr]">
          <GlassCard className="overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(78,254,50,0.10),rgba(124,77,255,0.12))] dark:bg-[linear-gradient(135deg,rgba(17,24,39,0.92),rgba(0,128,153,0.16),rgba(124,77,255,0.18))]">
            <div className="max-w-3xl">
              <p className="text-sm font-bold text-[#008099] dark:text-[#4EFE32]">
                Welcome back,
              </p>
              <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                {displayName || "Maker"} <span aria-hidden="true">👋</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-[#94A3B8]">
                Ready to continue creating today?
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div key={stat.label} className="rounded-3xl bg-white/70 p-4 shadow-sm dark:bg-white/[0.06]">
                    <Icon size={19} className="text-[#008099] dark:text-[#4EFE32]" />
                    <p className="mt-4 text-xs font-bold text-slate-500 dark:text-[#94A3B8]">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-xl font-black">{stat.value}</p>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard className="bg-[linear-gradient(135deg,rgba(78,254,50,0.18),rgba(255,255,255,0.84),rgba(124,77,255,0.14))] dark:bg-[linear-gradient(135deg,rgba(78,254,50,0.12),rgba(17,24,39,0.9),rgba(124,77,255,0.18))]">
            <SectionLabel icon={Crown}>Premium Trial</SectionLabel>
            <h2 className="mt-5 text-2xl font-black">15-Day Free Trial</h2>
            <p className="mt-2 text-sm font-bold text-slate-600 dark:text-[#94A3B8]">
              {shownDaysLeft} {shownDaysLeft === 1 ? "day" : "days"} remaining
            </p>
          </GlassCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard>
            <SectionLabel icon={PlayCircle}>Continue Learning</SectionLabel>
            <h2 className="mt-5 text-2xl font-black">Easy Tote Bag</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-[#94A3B8]">
              Pick up at attaching handles and finishing the side seams.
            </p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-[#008099] to-[#4EFE32]" />
            </div>
            <Button asChild className="mt-6 h-11 rounded-2xl bg-[#008099] px-5 font-black text-white hover:bg-[#006f85]">
              <Link href="/tutorials/easy-tote-bag">Continue Learning</Link>
            </Button>
          </GlassCard>

          <GlassCard>
            <SectionLabel icon={Target}>Daily Challenge</SectionLabel>
            <h2 className="mt-5 text-2xl font-black">Make a Paper Butterfly</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-[#94A3B8]">
              A quick creative warmup with a focused XP reward.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-3xl bg-[#4EFE32]/12 p-4 text-sm font-bold text-emerald-700 dark:text-[#4EFE32]">
              <Trophy size={19} />
              Reward: +25 XP
            </div>
            <Button asChild className="mt-6 h-11 rounded-2xl bg-[#7C4DFF] px-5 font-black text-white hover:bg-[#6b3df0]">
              <Link href="/tutorials/paper-butterfly">Start Challenge</Link>
            </Button>
          </GlassCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard>
            <SectionLabel icon={BookOpen}>Recent Tutorials</SectionLabel>
            <div className="mt-5 space-y-3">
              {recentTutorials.map((tutorial) => (
                <div key={tutorial} className="flex items-center justify-between rounded-3xl bg-white/65 p-4 dark:bg-white/[0.06]">
                  <span className="font-black">{tutorial}</span>
                  <ArrowRight size={17} className="text-slate-400" />
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <SectionLabel icon={Medal}>Achievements</SectionLabel>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {achievements.map((achievement) => (
                <div key={achievement} className="rounded-3xl bg-gradient-to-br from-[#008099]/12 to-[#7C4DFF]/12 p-4">
                  <Medal size={20} className="text-[#7C4DFF] dark:text-violet-200" />
                  <p className="mt-4 text-sm font-black">{achievement}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard>
            <SectionLabel icon={MessageCircle}>Community Activity</SectionLabel>
            <h2 className="mt-5 text-2xl font-black">12 makers liked your flower set</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-[#94A3B8]">
              Your latest crochet upload is gaining encouragement from the community.
            </p>
          </GlassCard>

          <GlassCard>
            <SectionLabel icon={Palette}>Recommended Projects</SectionLabel>
            <h2 className="mt-5 text-2xl font-black">Mini Crochet Bag</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-[#94A3B8]">
              A compact project that builds on your current crochet progress.
            </p>
            <Button asChild className="mt-6 h-11 rounded-2xl bg-[#008099] px-5 font-black text-white hover:bg-[#006f85]">
              <Link href="/create">Create Project</Link>
            </Button>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
