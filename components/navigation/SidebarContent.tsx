"use client";

import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Crown, LogIn, LogOut, Settings, ShieldCheck } from "lucide-react";
import UserAvatar from "@/components/common/UserAvatar";
import { navItems } from "@/data/navigation";
import { useAuth } from "@/src/context/AuthContext";
import { auth } from "@/src/lib/firebase";
import { isStaff, shouldShowUpgradeCard } from "@/src/lib/access";

type SidebarContentProps = {
  onNavigate?: () => void;
};

function SidebarHeader({ onNavigate }: SidebarContentProps) {
  return (
    <Link href="/" onClick={onNavigate} className="relative mb-8 flex shrink-0 items-center gap-3 pr-10 lg:pr-0">
      <Image
        src="/logo.png"
        alt="CraftVerse"
        width={64}
        height={64}
        priority
        className="h-14 w-14 shrink-0 object-contain drop-shadow-[0_6px_14px_rgba(6,182,212,.22)] dark:drop-shadow-[0_8px_18px_rgba(34,211,238,.36)] lg:h-16 lg:w-16"
      />

      <div className="flex min-w-0 flex-col justify-center">
        <h1 className="text-[1.55rem] font-black leading-none tracking-tight lg:text-[1.7rem]">
          <span className="text-slate-900 dark:text-white">Craft</span>
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Verse
          </span>
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">Create your magic</p>
      </div>
    </Link>
  );
}

function SidebarNavigation({ onNavigate }: SidebarContentProps) {
  const pathname = usePathname();
  const { isLoggedIn, userProfile } = useAuth();

  const visibleItems = navItems.filter((item) => {
    if (item.requiresAuth && !isLoggedIn) {
      return false;
    }

    return true;
  });

  return (
    <nav className="space-y-2">
      {isStaff(userProfile?.role) ? <Link href="/admin" onClick={onNavigate} className="flex items-center gap-3 rounded-2xl border border-cyan-300 bg-cyan-50 px-4 py-3.5 text-sm font-bold text-cyan-900 dark:bg-cyan-500/10 dark:text-cyan-100"><ShieldCheck size={20}/>Admin Dashboard</Link> : null}
      {visibleItems.map((item) => {
        const Icon = item.icon;
        const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onNavigate}
            className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-300 ${
              active
                ? "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-[0_10px_30px_rgba(236,72,153,0.35)] dark:shadow-[0_12px_34px_rgba(34,211,238,0.22)]"
                : "border border-slate-200 bg-white/80 text-slate-900 shadow-sm hover:-translate-y-0.5 hover:border-cyan-400/60 hover:bg-cyan-50/70 hover:shadow-md dark:border-white/10 dark:bg-[#0f1b2f]/75 dark:text-slate-100 dark:hover:border-cyan-300/35 dark:hover:bg-[#17243c]"
            }`}
          >
            <span className="flex min-w-0 items-center gap-3">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                  active
                    ? "bg-white/20 text-white"
                    : `bg-slate-100 ${item.iconClass} group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-purple-500 group-hover:text-white dark:bg-white/10 dark:text-cyan-100`
                }`}
              >
                <Icon size={20} />
              </span>
              <span className="truncate">{item.name}</span>
            </span>

            <ChevronRight
              size={18}
              className={`shrink-0 transition ${
                active
                  ? "translate-x-0 opacity-100"
                  : "opacity-60 group-hover:translate-x-1 group-hover:opacity-100"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}

function UpgradeCard({ onNavigate }: SidebarContentProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-purple-200 bg-gradient-to-br from-violet-100 via-white to-pink-100 p-5 shadow-[0_18px_50px_rgba(124,77,255,0.22)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(236,72,153,0.26)] dark:border-purple-400/30 dark:bg-gradient-to-br dark:from-purple-950/80 dark:via-[#10183a] dark:to-pink-950/70 dark:shadow-xl">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-pink-400/25 blur-3xl dark:bg-pink-500/30" />
      <Crown size={26} className="relative text-purple-700 dark:text-yellow-300" />
      <h3 className="relative mt-2 text-lg font-black text-purple-800 dark:text-yellow-300">
        Upgrade to Pro
      </h3>
      <p className="relative mt-2 text-sm leading-6 text-slate-600 dark:text-white/75">
        Unlock premium tutorials, materials, AI Tutor, exclusive patterns and more.
      </p>
      <Link href="/pricing" onClick={onNavigate} className="relative mt-5 block w-full rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 px-4 py-3 text-center font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110">
        Upgrade Now
      </Link>
    </div>
  );
}

function SidebarUserCard({ onNavigate }: SidebarContentProps) {
  const { displayName, isLoggedIn, user, userProfile } = useAuth();

  if (!isLoggedIn) {
    return (
      <Link href="/login" onClick={onNavigate} className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#008099] px-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#006f85]">
        <LogIn size={17} />
        Login
      </Link>
    );
  }

  return (
    <div className="rounded-3xl border border-[#008099]/15 bg-white/85 p-4 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-[#0f1b2f]/75">
      <Link href="/profile" onClick={onNavigate} className="flex min-w-0 items-center gap-3">
        <UserAvatar
          user={user}
          userProfile={userProfile}
          className="h-11 w-11 shrink-0 rounded-2xl object-cover"
          fallbackClassName="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#008099] via-[#7C4DFF] to-[#4EFE32] text-base font-black text-white"
        />
        <span className="min-w-0">
          <span className="block truncate text-sm font-black text-slate-900 dark:text-white">
            {displayName}
          </span>
          <span className="block text-xs font-semibold text-slate-500 dark:text-slate-300">
            CraftVerse creator
          </span>
        </span>
      </Link>
    </div>
  );
}

function SidebarActions({ onNavigate }: SidebarContentProps) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <Link href="/settings" onClick={onNavigate} className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 text-sm font-black text-slate-700 shadow-sm transition hover:border-cyan-400/60 hover:bg-cyan-50 dark:border-white/10 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/15">
        <Settings size={16} />
        Settings
      </Link>
      <button
        type="button"
        onClick={async () => {
          onNavigate?.();
          await signOut(auth);
        }}
        className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-white/80 text-sm font-black text-rose-600 shadow-sm transition hover:bg-rose-50 dark:border-rose-400/20 dark:bg-white/10 dark:text-rose-300 dark:hover:bg-rose-500/10"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
}

export default function SidebarContent({ onNavigate }: SidebarContentProps) {
  const { loading, userProfile } = useAuth();
  const showUpgradeCard = !loading && shouldShowUpgradeCard(userProfile);

  return (
    <>
      <SidebarHeader onNavigate={onNavigate} />

      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="craft-scrollbar min-h-0 flex-1 overflow-y-auto pr-1">
          <SidebarNavigation onNavigate={onNavigate} />
        </div>

        {!loading ? (
          <div className="mt-5 shrink-0 space-y-3 pb-1">
            {showUpgradeCard ? <UpgradeCard onNavigate={onNavigate} /> : null}
            <SidebarUserCard onNavigate={onNavigate} />
            <SidebarActions onNavigate={onNavigate} />
          </div>
        ) : null}
      </div>
    </>
  );
}
