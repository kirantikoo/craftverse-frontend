"use client";

import { BarChart3, Crown, UserCheck, Users } from "lucide-react";
import AdminToolPage from "@/app/admin/AdminToolPage";

const dashboardCards = [
  { label: "Total Users", value: "Protected", icon: Users },
  { label: "Trial Users", value: "Protected", icon: UserCheck },
  { label: "Premium Users", value: "Protected", icon: Crown },
  { label: "Admin Reports", value: "Preview", icon: BarChart3 },
];

export default function AdminDashboardPage() {
  return (
    <AdminToolPage
      title="Admin Dashboard"
      description="Preview key CraftVerse admin areas from the public frontend entry point."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((card) => {
          const Icon = card.icon;

          return (
            <article key={card.label} className="craft-dark-card rounded-3xl bg-white/85 p-6 shadow-xl dark:border dark:border-white/10">
              <Icon size={24} className="text-[#008099] dark:text-[#4EFE32]" />
              <p className="mt-5 text-sm font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                {card.label}
              </p>
              <p className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
                {card.value}
              </p>
            </article>
          );
        })}
      </div>
    </AdminToolPage>
  );
}
