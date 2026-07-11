"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { canAccessAdmin } from "@/src/lib/access";
import { getAdminUrl } from "@/src/lib/admin";

function AdminRedirectLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="rounded-3xl border border-[#008099]/20 bg-white/85 px-6 py-5 text-center shadow-xl dark:border-white/10 dark:bg-white/10">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#4EFE32]/30 border-t-[#008099]" />
        <p className="text-sm font-bold text-slate-700 dark:text-white">
          Opening CraftVerse Admin...
        </p>
      </div>
    </div>
  );
}

export default function AdminRedirect() {
  const router = useRouter();
  const { loading, profileError, user, userProfile } = useAuth();
  const canOpenAdmin = canAccessAdmin(userProfile?.role);

  useEffect(() => {
    if (loading || profileError) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!canOpenAdmin) {
      router.replace("/dashboard");
      return;
    }

    window.location.replace(getAdminUrl());
  }, [canOpenAdmin, loading, profileError, router, user]);

  return <AdminRedirectLoading />;
}
