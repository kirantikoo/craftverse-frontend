"use client";

import Link from "next/link";
import {
  BarChart3,
  Crown,
  LayoutDashboard,
  Lock,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/context/AuthContext";

const adminStats = [
  {
    label: "Total Users",
    value: "Protected",
    detail: "User totals stay inside the Admin app.",
    icon: Users,
    accent: "bg-cyan-100 text-[#008099] dark:bg-cyan-400/10 dark:text-cyan-200",
  },
  {
    label: "Trial Users",
    value: "Protected",
    detail: "Trial counts are not exposed here.",
    icon: UserCheck,
    accent: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200",
  },
  {
    label: "Premium Users",
    value: "Protected",
    detail: "Subscription details live in the Admin app.",
    icon: Crown,
    accent: "bg-violet-100 text-[#7C4DFF] dark:bg-violet-400/10 dark:text-violet-200",
  },
  {
    label: "Expired Users",
    value: "Protected",
    detail: "Expired account reports are admin-only.",
    icon: BarChart3,
    accent: "bg-rose-100 text-rose-700 dark:bg-rose-400/10 dark:text-rose-200",
  },
];

function LoadingState() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="rounded-3xl border border-[#008099]/20 bg-white/85 px-6 py-5 text-center shadow-xl dark:border-white/10 dark:bg-white/10">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#4EFE32]/30 border-t-[#008099]" />
        <p className="text-sm font-bold text-slate-700 dark:text-white">
          Checking admin access...
        </p>
      </div>
    </div>
  );
}

function AccessDeniedState({ signedIn }: { signedIn: boolean }) {
  return (
    <section className="craft-dark-panel flex min-h-[60vh] items-center justify-center rounded-[2rem] border border-[#008099]/15 bg-[#FFF8F3] p-5 shadow-[0_22px_70px_rgba(0,128,153,0.14)] dark:border-white/10">
      <div className="craft-dark-card max-w-xl rounded-3xl bg-white/85 p-6 text-center shadow-xl sm:p-8 dark:border dark:border-white/10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 dark:bg-rose-400/10 dark:text-rose-200">
          <Lock size={26} />
        </div>
        <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          Access denied
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {signedIn
            ? "Your account does not have CraftVerse admin access."
            : "Please log in with an admin account to preview this page."}
        </p>
        {!signedIn ? (
          <Button asChild className="mt-6 h-12 rounded-2xl bg-[#008099] px-5 text-base font-black text-white hover:bg-[#006f85]">
            <Link href="/login">Log in</Link>
          </Button>
        ) : null}
      </div>
    </section>
  );
}

export default function AdminPage() {
  const { displayName, loading, user, userProfile } = useAuth();
  const isAdmin = userProfile?.role === "admin";

  if (loading) {
    return <LoadingState />;
  }

  if (!user || !isAdmin) {
    return <AccessDeniedState signedIn={Boolean(user)} />;
  }

  return (
    <section className="craft-dark-panel min-h-[70vh] rounded-[2rem] border border-[#008099]/15 bg-[#FFF8F3] p-5 shadow-[0_22px_70px_rgba(0,128,153,0.14)] sm:p-8 dark:border-white/10 dark:shadow-[0_24px_80px_rgba(0,0,0,0.30)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="craft-dark-card rounded-3xl bg-white/85 p-6 shadow-xl sm:p-8 dark:border dark:border-white/10">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#4EFE32]/40 bg-[#4EFE32]/15 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#008099] dark:text-[#4EFE32]">
              <ShieldCheck size={14} />
              Admin preview
            </p>
            <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              CraftVerse admin entry
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Welcome, {displayName}. This public frontend page is only a safe entry point for admin tools.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {adminStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article key={stat.label} className="craft-dark-card rounded-3xl border border-white/80 bg-white/85 p-5 shadow-lg dark:border-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.accent}`}>
                    <Icon size={22} />
                  </div>
                  <Lock size={18} className="text-slate-400 dark:text-slate-500" />
                </div>
                <p className="mt-5 text-sm font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {stat.detail}
                </p>
              </article>
            );
          })}
        </div>

        <div className="craft-dark-card rounded-3xl bg-white/85 p-5 shadow-xl sm:p-6 dark:border dark:border-white/10">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 rounded-2xl bg-[#008099] px-5 text-base font-black text-white hover:bg-[#006f85]">
              <Link href="/admin/dashboard">
                <LayoutDashboard />
                Open Admin Dashboard
              </Link>
            </Button>
            <Button asChild className="h-12 rounded-2xl bg-[#7C4DFF] px-5 text-base font-black text-white hover:bg-[#6b3df0]">
              <Link href="/admin/users">
                <Users />
                Manage Users
              </Link>
            </Button>
            <Button asChild className="h-12 rounded-2xl bg-[#7C4DFF] px-5 text-base font-black text-white hover:bg-[#6b3df0]">
              <Link href="/admin/pricing">
                <Crown />
                Manage Pricing
              </Link>
            </Button>
          </div>

          <p id="admin-app-note" className="mt-5 rounded-2xl border border-[#008099]/15 bg-[#FFF8F3] px-4 py-3 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-[#0f1b2f] dark:text-slate-200">
            Full admin controls are available in the separate CraftVerse Admin app.
          </p>
        </div>
      </div>
    </section>
  );
}
