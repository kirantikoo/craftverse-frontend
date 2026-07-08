"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, LogIn } from "lucide-react";
import { navItems } from "@/data/navigation";
import { useAuth } from "@/src/context/AuthContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

type MobileDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function MobileDrawer({ open, onOpenChange }: MobileDrawerProps) {
  const pathname = usePathname();
  const { displayName, isLoggedIn, loading } = useAuth();
  const visibleNavItems = navItems.filter((item) => !item.requiresAuth || isLoggedIn);
  const avatarInitial = displayName.charAt(0).toUpperCase() || "C";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[82vw] max-w-[320px] border-slate-200 bg-white p-5 text-slate-900 dark:border-white/10 dark:bg-[#071020]/95 dark:text-white"
      >
        <SheetTitle className="sr-only">CraftVerse navigation</SheetTitle>
        <SheetDescription className="sr-only">Navigate CraftVerse</SheetDescription>

        <div className="flex h-full flex-col overflow-hidden">
          <Link href="/" onClick={() => onOpenChange(false)} className="mb-8 flex shrink-0 items-center gap-3 pr-10">
            <Image
              src="/logo.png"
              alt="CraftVerse"
              width={56}
              height={56}
              priority
              className="h-14 w-14 shrink-0 object-contain drop-shadow-[0_6px_14px_rgba(6,182,212,.22)] dark:drop-shadow-[0_8px_18px_rgba(34,211,238,.36)]"
            />
            <div>
              <p className="text-[1.55rem] font-black leading-none tracking-tight">
                Craft<span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">Verse</span>
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">Create your magic ✨</p>
            </div>
          </Link>

          {!loading ? (
            <div className="mb-5 rounded-3xl border border-[#008099]/15 bg-[#FFF8F3] p-4 dark:border-white/10 dark:bg-[#0f1b2f]/75">
              {isLoggedIn ? (
                <Link href="/profile" onClick={() => onOpenChange(false)} className="flex min-w-0 items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#008099] via-[#7C4DFF] to-[#4EFE32] text-base font-black text-white">
                    {avatarInitial}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-black text-slate-900 dark:text-white">
                      {displayName}
                    </span>
                    <span className="block text-xs font-semibold text-slate-500 dark:text-slate-300">
                      CraftVerse creator
                    </span>
                  </span>
                </Link>
              ) : (
                <Link href="/login" onClick={() => onOpenChange(false)} className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#008099] px-4 text-sm font-black text-white shadow-lg">
                  <LogIn size={17} />
                  Login
                </Link>
              )}
            </div>
          ) : null}

          <nav className="craft-scrollbar flex-1 space-y-2 overflow-y-auto pr-1">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-bold transition ${
                    active
                      ? "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-[0_10px_30px_rgba(236,72,153,0.35)] dark:shadow-[0_12px_34px_rgba(34,211,238,0.22)]"
                      : "border border-slate-200 bg-white/80 text-slate-900 shadow-sm hover:border-cyan-400/60 hover:bg-cyan-50/70 dark:border-white/10 dark:bg-[#0f1b2f]/75 dark:text-slate-100 dark:hover:border-cyan-300/35 dark:hover:bg-[#17243c]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${active ? "bg-white/20 text-white" : `bg-slate-100 ${item.iconClass} dark:bg-white/10 dark:text-cyan-100`}`}>
                      <Icon size={20} />
                    </span>
                    {item.name}
                  </span>
                  <ChevronRight size={18} className="opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 shrink-0 overflow-hidden rounded-3xl border border-purple-200 bg-gradient-to-br from-violet-100 via-white to-pink-100 p-5 shadow-lg dark:border-purple-400/30 dark:from-purple-950/80 dark:via-[#10183a] dark:to-pink-950/70">
            <p className="text-2xl">👑</p>
            <h3 className="mt-2 text-lg font-black text-purple-800 dark:text-yellow-300">Upgrade to Pro</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-white/75">Unlock premium tutorials, materials & more.</p>
            <Link href="/pricing" onClick={() => onOpenChange(false)} className="mt-5 flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 px-4 font-bold text-white shadow-lg">Upgrade Now →</Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
