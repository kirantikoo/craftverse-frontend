"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomNavItems } from "@/data/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-3 left-1/2 z-30 flex w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 items-center justify-between rounded-2xl border border-slate-200 bg-white/95 px-2 py-2 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#071020]/95 lg:hidden">
      {bottomNavItems.map((item) => {
        const Icon = item.icon;
        const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link key={item.name} href={item.href} aria-label={item.name} className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${active ? "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-lg" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
            <Icon size={20} />
          </Link>
        );
      })}
    </nav>
  );
}
