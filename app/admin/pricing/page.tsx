"use client";

import { BadgeDollarSign, Crown, Sparkles } from "lucide-react";
import AdminToolPage from "@/app/admin/AdminToolPage";

export default function AdminPricingPage() {
  return (
    <AdminToolPage
      title="Manage Pricing"
      description="Review CraftVerse subscription and pricing controls from a protected admin-only route."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <article className="craft-dark-card rounded-3xl bg-white/85 p-6 shadow-xl dark:border dark:border-white/10">
          <Crown size={24} className="text-[#7C4DFF] dark:text-violet-200" />
          <h2 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">
            Premium Plan
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Manage premium membership settings in the secure admin system.
          </p>
        </article>
        <article className="craft-dark-card rounded-3xl bg-white/85 p-6 shadow-xl dark:border dark:border-white/10">
          <BadgeDollarSign size={24} className="text-[#008099] dark:text-[#4EFE32]" />
          <h2 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">
            Billing Rules
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Pricing changes should be handled through trusted backend workflows.
          </p>
        </article>
        <article className="craft-dark-card rounded-3xl bg-white/85 p-6 shadow-xl dark:border dark:border-white/10">
          <Sparkles size={24} className="text-[#4EFE32]" />
          <h2 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">
            Trial Offers
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Keep trial and upgrade messaging consistent across CraftVerse.
          </p>
        </article>
      </div>
    </AdminToolPage>
  );
}
