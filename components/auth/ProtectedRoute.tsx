"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/src/context/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, router, user]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-3xl border border-[#008099]/20 bg-white/85 px-6 py-5 text-center shadow-xl dark:border-white/10 dark:bg-white/10">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#4EFE32]/30 border-t-[#008099]" />
          <p className="text-sm font-bold text-slate-700 dark:text-white">
            Checking your CraftVerse session...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
