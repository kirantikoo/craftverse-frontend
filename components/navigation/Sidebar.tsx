"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronRight, LogIn } from "lucide-react";
import { navItems } from "@/data/navigation";
import { useAuth } from "@/src/context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { displayName, isLoggedIn, loading } = useAuth();
  const visibleNavItems = navItems.filter((item) => !item.requiresAuth || isLoggedIn);
  const avatarInitial = displayName.charAt(0).toUpperCase() || "C";

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[272px] overflow-hidden border-r border-slate-200 bg-white/90 p-5 shadow-[0_0_60px_rgba(14,165,233,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#071020]/95 lg:flex lg:flex-col">
      <div className="pointer-events-none absolute -left-20 top-10 h-60 w-60 rounded-full bg-cyan-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-60 w-60 rounded-full bg-purple-500/20 blur-[100px]" />

      <Link href="/" className="relative mb-8 flex shrink-0 items-center gap-3">
        <Image
          src="/logo.png"
          alt="CraftVerse"
          width={64}
          height={64}
          priority
          className="h-16 w-16 shrink-0 object-contain drop-shadow-[0_6px_14px_rgba(6,182,212,.22)] dark:drop-shadow-[0_8px_18px_rgba(34,211,238,.36)]"
        />

        <div className="flex flex-col justify-center">
          <h1 className="text-[1.7rem] font-black leading-none tracking-tight">
            <span className="text-slate-900 dark:text-white">Craft</span>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Verse
            </span>
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">Create your magic ✨</p>
        </div>
      </Link>

      <div className="relative flex-1 overflow-y-auto pr-1">
        <nav className="space-y-2">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-[0_10px_30px_rgba(236,72,153,0.35)]"
                    : "border border-slate-200 bg-white/80 text-slate-900 shadow-sm hover:-translate-y-0.5 hover:border-cyan-400/60 hover:bg-cyan-50/70 hover:shadow-md dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/[0.10]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                      active
                        ? "bg-white/20"
                        : `bg-slate-100 ${item.iconClass} group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-purple-500 group-hover:text-white dark:bg-white/10`
                    }`}
                  >
                    <Icon size={20} />
                  </span>
                  {item.name}
                </span>

                <ChevronRight
                  size={18}
                  className={`transition ${
                    active
                      ? "translate-x-0 opacity-100"
                      : "opacity-60 group-hover:translate-x-1 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {!loading ? (
          <div className="mt-7 rounded-3xl border border-[#008099]/15 bg-white/85 p-4 shadow-lg dark:border-white/10 dark:bg-white/[0.06]">
            {isLoggedIn ? (
              <Link href="/profile" className="flex min-w-0 items-center gap-3">
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
              <Link href="/login" className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#008099] px-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#006f85]">
                <LogIn size={17} />
                Login
              </Link>
            )}
          </div>
        ) : null}

        <div className="mt-7 overflow-hidden rounded-3xl border border-purple-200 bg-gradient-to-br from-violet-100 via-white to-pink-100 p-5 shadow-lg dark:border-purple-400/30 dark:bg-gradient-to-br dark:from-purple-950/80 dark:via-[#10183a] dark:to-pink-950/70 dark:shadow-xl">
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-pink-400/25 blur-3xl dark:bg-pink-500/30" />
          <p className="text-2xl">👑</p>
          <h3 className="mt-2 text-lg font-black text-purple-800 dark:text-yellow-300">
            Upgrade to Pro
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-white/75">
            Unlock premium tutorials, materials & more.
          </p>
          <Link href="/pricing" className="mt-5 block w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 px-4 py-3 text-center font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110">
            Upgrade Now →
          </Link>
        </div>
      </div>
    </aside>
  );
}
