"use client";

import Link from "next/link";
import { ReactNode } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/context/AuthContext";
import { isTrialActive } from "@/src/lib/subscription";

function UpgradeScreen() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center rounded-[2rem] border border-[#008099]/15 bg-[#FFF8F3] p-5 shadow-[0_22px_70px_rgba(0,128,153,0.14)] dark:border-white/10 dark:bg-white/10">
      <div className="max-w-xl rounded-3xl bg-white/90 p-6 text-center shadow-xl dark:bg-[#08111f]/85 sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#008099]">
          Premium access
        </p>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          Your free trial has ended
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
          Subscribe for $5/month to continue premium CraftVerse learning.
        </p>
        <Button asChild className="mt-7 h-12 rounded-2xl bg-[#7C4DFF] px-5 text-base font-black text-white hover:bg-[#6b3df0]">
          <Link href="/pricing">Upgrade for $5/month</Link>
        </Button>
      </div>
    </section>
  );
}

function PremiumGateContent({ children }: { children: ReactNode }) {
  const { loading, userProfile } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4EFE32]/30 border-t-[#008099]" />
      </div>
    );
  }

  const hasPremiumAccess =
    userProfile?.plan === "premium" || isTrialActive(userProfile?.trialEndsAt);

  if (!hasPremiumAccess) {
    return <UpgradeScreen />;
  }

  return <>{children}</>;
}

export default function PremiumGate({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <PremiumGateContent>{children}</PremiumGateContent>
    </ProtectedRoute>
  );
}
