"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import { isStaff } from "@/src/lib/access";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { loading, profileError, user, userProfile } = useAuth();
  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login?next=/admin");
    else if (!profileError && !isStaff(userProfile?.role)) router.replace("/dashboard");
  }, [loading, profileError, router, user, userProfile]);
  if (loading || (!user && !loading)) return <div className="grid min-h-[55vh] place-items-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-200 border-t-cyan-600" /></div>;
  if (profileError) return <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-800">Unable to verify your trusted admin profile: {profileError}</div>;
  if (!isStaff(userProfile?.role)) return null;
  return children;
}
