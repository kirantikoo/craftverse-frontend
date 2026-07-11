"use client";

import SidebarContent from "@/components/navigation/SidebarContent";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[272px] overflow-hidden border-r border-slate-200 bg-white/90 p-5 shadow-[0_0_60px_rgba(14,165,233,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#071020]/90 dark:shadow-[0_0_70px_rgba(0,0,0,0.35)] lg:flex lg:flex-col">
      <div className="pointer-events-none absolute -left-20 top-10 h-60 w-60 rounded-full bg-cyan-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-60 w-60 rounded-full bg-purple-500/20 blur-[100px]" />
      <SidebarContent />
    </aside>
  );
}
