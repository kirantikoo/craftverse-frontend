"use client";

import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "firebase/auth";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Settings,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import UserAvatar from "@/components/common/UserAvatar";
import { useAuth } from "@/src/context/AuthContext";
import { auth } from "@/src/lib/firebase";
import { canAccessAdmin } from "@/src/lib/access";
import { getAdminUrl } from "@/src/lib/admin";

type UserMenuProps = {
  displayName: string;
  className?: string;
};

const menuItems = [
  { label: "Profile", href: "/profile", icon: UserCircle },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function UserMenu({ className = "", displayName }: UserMenuProps) {
  const { user, userProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isAdmin = canAccessAdmin(userProfile?.role);
  const adminUrl = getAdminUrl();

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;

      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }

      setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const firstItem = menuRef.current?.querySelector<HTMLElement>("a, button");
    firstItem?.focus();
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    closeMenu();
    await signOut(auth);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open user menu"
        onClick={() => setOpen((current) => !current)}
        className="flex h-11 w-11 min-w-0 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 p-1.5 shadow-sm transition hover:border-cyan-400/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/20 dark:border-white/10 dark:bg-white/10 sm:w-auto sm:gap-2 sm:pr-3"
      >
        <UserAvatar
          user={user}
          userProfile={userProfile}
          className="h-8 w-8 shrink-0 rounded-xl object-cover"
          fallbackClassName="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#008099] via-[#7C4DFF] to-[#4EFE32] text-sm font-black text-white"
        />
        <span className="hidden max-w-28 truncate text-sm font-black text-slate-800 dark:text-white sm:block">
          {displayName}
        </span>
        <ChevronDown
          size={16}
          className={`hidden shrink-0 text-muted-foreground transition sm:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close user menu"
              className="fixed inset-0 z-40 bg-black/35 backdrop-blur-sm sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={closeMenu}
            />
            <motion.div
              ref={menuRef}
              role="menu"
              aria-label="User menu"
              className="fixed inset-x-3 bottom-3 z-50 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-white p-2 text-slate-900 shadow-[0_24px_80px_rgba(15,23,42,0.28)] outline-none dark:bg-[#171B2D] dark:text-white sm:absolute sm:bottom-auto sm:right-0 sm:top-[calc(100%+0.75rem)] sm:inset-x-auto sm:w-72"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="border-b border-slate-200/70 px-3 py-3 dark:border-white/10">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#008099] dark:text-[#4EFE32]">
                  CraftVerse account
                </p>
                <p className="mt-1 truncate text-sm font-black">{displayName}</p>
              </div>

              <div className="py-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;

                  if (item.href === "/settings" && isAdmin) {
                    return (
                      <div key={item.href}>
                        <a
                          href={adminUrl}
                          role="menuitem"
                          onClick={closeMenu}
                          className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-black transition hover:bg-gradient-to-r hover:from-[#008099] hover:via-[#0EA5B7] hover:to-[#7C4DFF] hover:text-white focus:bg-gradient-to-r focus:from-[#008099] focus:via-[#0EA5B7] focus:to-[#7C4DFF] focus:text-white focus:outline-none"
                        >
                          <ShieldCheck size={18} />
                          Admin Dashboard
                        </a>
                        <Link
                          href={item.href}
                          role="menuitem"
                          onClick={closeMenu}
                          className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-black transition hover:bg-gradient-to-r hover:from-[#008099] hover:via-[#0EA5B7] hover:to-[#7C4DFF] hover:text-white focus:bg-gradient-to-r focus:from-[#008099] focus:via-[#0EA5B7] focus:to-[#7C4DFF] focus:text-white focus:outline-none"
                        >
                          <Icon size={18} />
                          {item.label}
                        </Link>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={closeMenu}
                      className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-black transition hover:bg-gradient-to-r hover:from-[#008099] hover:via-[#0EA5B7] hover:to-[#7C4DFF] hover:text-white focus:bg-gradient-to-r focus:from-[#008099] focus:via-[#0EA5B7] focus:to-[#7C4DFF] focus:text-white focus:outline-none"
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-slate-200/70 pt-2 dark:border-white/10">
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-black text-rose-600 transition hover:bg-rose-50 focus:bg-rose-50 focus:outline-none dark:text-rose-300 dark:hover:bg-rose-500/10 dark:focus:bg-rose-500/10"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
