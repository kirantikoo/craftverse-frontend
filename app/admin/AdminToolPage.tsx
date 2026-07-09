"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/context/AuthContext";

type AdminToolPageProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function AdminLoading() {
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

function AdminAccessDenied() {
  return (
    <section className="craft-dark-panel flex min-h-[60vh] items-center justify-center rounded-[2rem] border border-[#008099]/15 bg-[#FFF8F3] p-5 shadow-[0_22px_70px_rgba(0,128,153,0.14)] dark:border-white/10">
      <div className="craft-dark-card max-w-xl rounded-3xl bg-white/85 p-6 text-center shadow-xl sm:p-8 dark:border dark:border-white/10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 dark:bg-rose-400/10 dark:text-rose-200">
          <Lock size={26} />
        </div>
        <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          You do not have permission to access admin tools.
        </h1>
        <Button asChild className="mt-6 h-12 rounded-2xl bg-[#008099] px-5 text-base font-black text-white hover:bg-[#006f85]">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </section>
  );
}

export default function AdminToolPage({ children, description, title }: AdminToolPageProps) {
  const { loading, userProfile } = useAuth();
  const isAdmin = userProfile?.role === "admin";

  if (loading) {
    return <AdminLoading />;
  }

  if (!isAdmin) {
    return <AdminAccessDenied />;
  }

  return (
    <section className="craft-dark-panel min-h-[70vh] rounded-[2rem] border border-[#008099]/15 bg-[#FFF8F3] p-5 shadow-[0_22px_70px_rgba(0,128,153,0.14)] sm:p-8 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="craft-dark-card rounded-3xl bg-white/85 p-6 shadow-xl sm:p-8 dark:border dark:border-white/10">
          <Button asChild variant="outline" className="mb-6 h-10 rounded-2xl border-[#008099]/25 bg-white px-4 font-black text-[#008099] hover:bg-[#4EFE32]/15 dark:border-white/10 dark:bg-white/10 dark:text-white">
            <Link href="/admin">
              <ArrowLeft />
              Admin Entry
            </Link>
          </Button>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {description}
          </p>
        </div>

        {children}
      </div>
    </section>
  );
}
