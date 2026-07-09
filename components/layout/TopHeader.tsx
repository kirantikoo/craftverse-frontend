"use client";

import { Bell, LogIn, Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/components/theme/ThemeToggle";
import MobileDrawer from "@/components/navigation/MobileDrawer";
import UserMenu from "@/components/layout/UserMenu";
import { useAuth } from "@/src/context/AuthContext";

export default function TopHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { displayName, isLoggedIn, loading } = useAuth();

  return (
    <header className="sticky top-0 z-30 mb-5 border-b border-slate-200/80 bg-white/75 backdrop-blur-2xl dark:border-white/10 dark:bg-[#050816]/80">
      <div className="mx-auto flex max-w-[1540px] items-center justify-between gap-3 px-4 py-3 lg:px-6 xl:px-8">
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-slate-900 shadow-sm transition hover:border-cyan-400/60 dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            <Menu size={22} />
          </button>
          <Image
            src="/logo.png"
            alt="CraftVerse"
            width={44}
            height={44}
            priority
            className="h-11 w-11 shrink-0 object-contain drop-shadow-[0_5px_12px_rgba(6,182,212,.22)] dark:drop-shadow-[0_6px_14px_rgba(34,211,238,.35)]"
          />
          <span className="text-base font-black tracking-tight text-slate-900 sm:text-lg dark:text-white">
            Craft<span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">Verse</span>
          </span>
        </div>
        <label className="hidden w-full max-w-xl items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-xl transition focus-within:border-cyan-400/70 focus-within:ring-4 focus-within:ring-cyan-400/10 dark:border-white/10 dark:bg-white/10 md:flex">
          <Search size={18} className="text-muted-foreground" />
          <input aria-label="Search CraftVerse" placeholder="Search crafts, stitching, tutorials..." className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
          <kbd className="rounded-lg border border-border px-2 py-0.5 text-xs text-muted-foreground">⌘K</kbd>
        </label>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          {!loading && isLoggedIn ? (
            <UserMenu displayName={displayName} className="sm:hidden" />
          ) : !loading ? (
            <Link href="/login" aria-label="Login" className="flex h-11 items-center gap-2 rounded-2xl border border-[#008099]/20 bg-white/80 px-3 text-sm font-black text-[#008099] shadow-sm transition hover:-translate-y-0.5 hover:border-[#008099]/50 hover:bg-[#4EFE32]/15 dark:border-white/10 dark:bg-white/10 dark:text-white sm:px-4">
              <LogIn size={17} />
              <span className="hidden sm:inline">Login</span>
            </Link>
          ) : null}
          <Link href="/notifications" aria-label="Notifications" className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-purple-400/60 hover:shadow-lg dark:border-white/10 dark:bg-white/10 dark:text-white">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-pink-500 ring-2 ring-card" />
          </Link>
          {!loading && isLoggedIn ? <UserMenu displayName={displayName} className="hidden sm:block" /> : null}
        </div>
      </div>
      <MobileDrawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </header>
  );
}
