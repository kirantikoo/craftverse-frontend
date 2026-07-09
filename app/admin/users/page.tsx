"use client";

import { Search, ShieldCheck, Users } from "lucide-react";
import AdminToolPage from "@/app/admin/AdminToolPage";

export default function AdminUsersPage() {
  return (
    <AdminToolPage
      title="Manage Users"
      description="User management is protected for CraftVerse admins. Sensitive user actions should remain in the dedicated admin backend."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="craft-dark-card rounded-3xl bg-white/85 p-6 shadow-xl dark:border dark:border-white/10">
          <Users size={24} className="text-[#008099] dark:text-[#4EFE32]" />
          <h2 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">
            User Directory
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Search, review, and manage creator accounts from the secure admin experience.
          </p>
        </article>
        <article className="craft-dark-card rounded-3xl bg-white/85 p-6 shadow-xl dark:border dark:border-white/10">
          <ShieldCheck size={24} className="text-[#7C4DFF] dark:text-violet-200" />
          <h2 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">
            Role Protection
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            This page only renders when the synced profile has role: &quot;admin&quot;.
          </p>
        </article>
        <article className="craft-dark-card rounded-3xl bg-white/85 p-6 shadow-xl lg:col-span-2 dark:border dark:border-white/10">
          <Search size={24} className="text-[#008099] dark:text-[#4EFE32]" />
          <h2 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">
            Search Preview
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Live user data and destructive actions are intentionally not exposed in this public frontend page.
          </p>
        </article>
      </div>
    </AdminToolPage>
  );
}
