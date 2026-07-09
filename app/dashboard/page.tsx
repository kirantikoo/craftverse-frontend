"use client";

import { signOut } from "firebase/auth";
import Link from "next/link";
import { Crown, LogOut, Sparkles } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/context/AuthContext";
import { auth } from "@/src/lib/firebase";
import { getDaysLeft } from "@/src/lib/subscription";

function DashboardContent() {
  const { displayName, profileError, user, userProfile } = useAuth();
  const daysLeft = getDaysLeft(userProfile?.trialEndsAt);

  return (
    <section className="craft-dark-panel min-h-[70vh] rounded-[2rem] border border-[#008099]/15 bg-[#FFF8F3] p-5 shadow-[0_22px_70px_rgba(0,128,153,0.14)] sm:p-8 dark:border-white/10 dark:shadow-[0_24px_80px_rgba(0,0,0,0.30)]">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <div className="craft-dark-card rounded-3xl bg-white/85 p-6 shadow-xl sm:p-8 dark:border dark:border-white/10">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4EFE32]/40 bg-[#4EFE32]/15 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#008099] dark:text-[#4EFE32]">
            <Sparkles size={14} />
            {displayName ? `${displayName}'s dashboard` : "Your dashboard"}
          </p>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
            Welcome back, {displayName}!
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
            You are signed in and ready to keep learning, creating, sharing, and selling.
          </p>

          {profileError ? (
            <p className="mt-5 rounded-2xl border border-amber-300/70 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800 dark:border-amber-300/30 dark:bg-amber-400/10 dark:text-amber-100">
              {profileError}
            </p>
          ) : null}

          <div className="mt-8 rounded-2xl border border-[#008099]/15 bg-[#FFF8F3] p-4 dark:border-white/10 dark:bg-[#0f1b2f]">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Signed in as
            </p>
            <p className="mt-2 break-all text-lg font-black text-[#008099] dark:text-cyan-200">
              {user?.email ?? displayName}
            </p>
          </div>

          <div className="mt-5 rounded-3xl border border-[#4EFE32]/35 bg-[linear-gradient(135deg,rgba(78,254,50,0.16),rgba(255,248,243,0.96)_48%,rgba(124,77,255,0.14))] p-5 dark:border-[#4EFE32]/25 dark:bg-[linear-gradient(135deg,rgba(78,254,50,0.12),rgba(15,23,42,0.96)_44%,rgba(124,77,255,0.18))]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-[#008099] dark:text-[#4EFE32]">
                  <Crown size={17} />
                  Premium trial
                </p>
                <h2 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
                  You are on a 15-day free trial
                </h2>
                <p className="mt-2 text-sm font-bold text-slate-600 dark:text-slate-300">
                  {daysLeft} {daysLeft === 1 ? "day" : "days"} left
                </p>
              </div>
              <Button asChild className="h-12 rounded-2xl bg-[#008099] px-5 text-base font-black text-white hover:bg-[#006f85]">
                <Link href="/pricing">Upgrade to Premium</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm font-black text-[#7C4DFF] dark:text-violet-200">
              Premium price: $5/month
            </p>
          </div>

          <Button
            type="button"
            onClick={() => signOut(auth)}
            className="mt-8 h-12 rounded-2xl bg-[#7C4DFF] px-5 text-base font-black text-white hover:bg-[#6b3df0]"
          >
            <LogOut />
            Logout
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
