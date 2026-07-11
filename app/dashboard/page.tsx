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
import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/context/AuthContext";
import { getPlanLabel, isStaff, isTrialUser } from "@/src/lib/access";
import { getDaysLeft } from "@/src/lib/subscription";
import { tutorials } from "@/src/data/tutorials";
import { normalizeInterest, recommendedTutorials, goalLabels, type PersonalizedTutorial } from "@/src/lib/personalization";

const progressStats = [
  { label: "Current Plan", value: "Trial", icon: Crown },
  { label: "Current XP", value: "650", icon: Star },
  { label: "Current Streak", value: "5 days", icon: Flame },
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
  const { displayName, profileError, user, userProfile } = useAuth();
  const daysLeft = getDaysLeft(userProfile?.trialEndsAt);
  const planLabel = getPlanLabel(userProfile);
  const showTrialCard = isTrialUser(userProfile);
  const showTrialDays = showTrialCard && !isStaff(userProfile?.role);
  const catalog: PersonalizedTutorial[] = tutorials.flatMap((tutorial) => {
    const category = normalizeInterest(tutorial.category);
    if (!category) return [];
    return [{ id: tutorial.slug, slug: tutorial.slug, title: tutorial.title, description: tutorial.description, category, level: tutorial.difficulty.toLowerCase() === "intermediate" ? "intermediate" : "beginner", learningGoals: ["learn-basics"], tags: [category], published: true, featured: tutorial.slug === "sewing-machine-basics", durationMinutes: Number.parseInt(tutorial.timeRequired) || undefined }];
  });
  const preferences = { interests: userProfile?.interests || [], skillLevel: userProfile?.skillLevel, learningGoals: userProfile?.learningGoals || [] };
  const recommendations = isStaff(userProfile?.role) ? catalog : recommendedTutorials(catalog, preferences);
  const dailyChallenge = recommendations[0];

  const stats = progressStats.flatMap((stat) => {
    const normalizedStat =
      stat.label === "Current Plan" ? { ...stat, value: planLabel } : stat;

    if (stat.label !== "Current Plan" || !showTrialDays) {
      return [normalizedStat];
    }

    return [
      normalizedStat,
      { label: "Trial Days Remaining", value: String(daysLeft), icon: Sparkles },
    ];
  });

  return (
    <main className="min-h-[70vh] rounded-[2rem] bg-[#F8FAFC] p-4 text-slate-950 sm:p-6 lg:p-8 dark:bg-[#050816] dark:text-[#F8FAFC]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        {profileError ? (
          <p className="rounded-3xl bg-amber-50 px-5 py-4 text-sm font-bold text-amber-800 shadow-lg dark:bg-amber-400/10 dark:text-amber-100">
            {profileError}
          </p>
        ) : null}

        <div className={`grid gap-6 ${showTrialCard ? "xl:grid-cols-[1.55fr_0.85fr]" : ""}`}>
          <GlassCard className="overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(78,254,50,0.10),rgba(124,77,255,0.12))] dark:bg-[linear-gradient(135deg,rgba(17,24,39,0.92),rgba(0,128,153,0.16),rgba(124,77,255,0.18))]">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <UserAvatar
                user={user}
                userProfile={userProfile}
                className="h-20 w-20 shrink-0 rounded-3xl object-cover shadow-xl"
                fallbackClassName="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-[#008099] via-[#7C4DFF] to-[#4EFE32] text-3xl font-black text-white shadow-xl"
              />
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

          {showTrialCard ? (
            <GlassCard className="bg-[linear-gradient(135deg,rgba(78,254,50,0.18),rgba(255,255,255,0.84),rgba(124,77,255,0.14))] dark:bg-[linear-gradient(135deg,rgba(78,254,50,0.12),rgba(17,24,39,0.9),rgba(124,77,255,0.18))]">
              <SectionLabel icon={Crown}>Premium Trial</SectionLabel>
              <h2 className="mt-5 text-2xl font-black">15-Day Free Trial</h2>
              <p className="mt-2 text-sm font-bold text-slate-600 dark:text-[#94A3B8]">
                {daysLeft} {daysLeft === 1 ? "day" : "days"} remaining
              </p>
            </GlassCard>
          ) : null}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard>
            <SectionLabel icon={PlayCircle}>Continue Learning</SectionLabel>
            <h2 className="mt-5 text-2xl font-black">No active lesson yet</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-[#94A3B8]">
              Start a recommended tutorial and your saved progress will appear here.
            </p>
            <Button asChild className="mt-6 h-11 rounded-2xl bg-[#008099] px-5 font-black text-white hover:bg-[#006f85]">
              <Link href="/learn">Find a lesson</Link>
            </Button>
          </GlassCard>

          <GlassCard>
            <SectionLabel icon={Target}>Daily Challenge</SectionLabel>
            <h2 className="mt-5 text-2xl font-black">{dailyChallenge?.title || "No challenge available"}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-[#94A3B8]">
              {dailyChallenge?.description || "Update your preferences to help us find a challenge in your crafts."}
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-3xl bg-[#4EFE32]/12 p-4 text-sm font-bold text-emerald-700 dark:text-[#4EFE32]">
              <Trophy size={19} />
              Reward: +25 XP
            </div>
            <Button asChild className="mt-6 h-11 rounded-2xl bg-[#7C4DFF] px-5 font-black text-white hover:bg-[#6b3df0]">
              <Link href={dailyChallenge?.slug?`/tutorials/${dailyChallenge.slug}`:"/settings/preferences"}>{dailyChallenge?"Start Challenge":"Update preferences"}</Link>
            </Button>
          </GlassCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard>
            <SectionLabel icon={BookOpen}>Recommended For You</SectionLabel>
            <div className="mt-5 space-y-3">
              {recommendations.map((tutorial) => (
                <Link href={`/tutorials/${tutorial.slug}`} key={tutorial.id} className="flex items-center justify-between rounded-3xl bg-white/65 p-4 dark:bg-white/[0.06]">
                  <span className="font-black">{tutorial.title}</span>
                  <ArrowRight size={17} className="text-slate-400" />
                </Link>
              ))}
              {!recommendations.length?<div className="rounded-3xl bg-white/65 p-5 dark:bg-white/[0.06]"><p>No exact tutorials match yet.</p><Link className="mt-3 inline-block font-black text-cyan-700" href="/settings/preferences">Update preferences</Link></div>:null}
            </div>
          </GlassCard>

          <GlassCard>
            <SectionLabel icon={Medal}>Your Craft Goals</SectionLabel>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {(userProfile?.learningGoals||[]).map((goal) => (
                <div key={goal} className="rounded-3xl bg-gradient-to-br from-[#008099]/12 to-[#7C4DFF]/12 p-4">
                  <Medal size={20} className="text-[#7C4DFF] dark:text-violet-200" />
                  <p className="mt-4 text-sm font-black">{goalLabels[goal]}</p>
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
