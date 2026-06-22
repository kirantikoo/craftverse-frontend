"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { navItems } from "@/data/navigation";
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[82vw] max-w-[320px] border-slate-200 bg-white p-5 text-slate-900 dark:border-white/10 dark:bg-[#071020] dark:text-white"
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

          <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-bold transition ${
                    active
                      ? "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-[0_10px_30px_rgba(236,72,153,0.35)]"
                      : "border border-slate-200 bg-white/80 text-slate-900 shadow-sm hover:border-cyan-400/60 hover:bg-cyan-50/70 dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/[0.10]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${active ? "bg-white/20 text-white" : `bg-slate-100 ${item.iconClass} dark:bg-white/10`}`}>
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
            <button className="mt-5 h-12 w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 px-4 font-bold text-white shadow-lg">Upgrade Now →</button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
