"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { isStaff } from "@/src/lib/access";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, userProfile, loading, profileError } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    } else if (!loading && user && !profileError && !isStaff(userProfile?.role) && userProfile?.onboardingCompleted !== true && pathname !== "/onboarding") {
      router.replace("/onboarding");
    }
  }, [loading, pathname, profileError, router, user, userProfile]);

  if (loading || !user || (!isStaff(userProfile?.role) && userProfile?.onboardingCompleted !== true)) {
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

  if (profileError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-md rounded-3xl border border-amber-200 bg-amber-50 px-6 py-5 text-center shadow-xl dark:border-amber-400/20 dark:bg-amber-400/10">
          <p className="text-sm font-bold text-amber-900 dark:text-amber-100">
            {profileError}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-2xl bg-[#008099] px-5 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[#006f85]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
