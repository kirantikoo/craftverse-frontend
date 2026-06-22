"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return <div aria-hidden className="h-11 w-11 rounded-2xl border border-slate-200 bg-white/80 dark:border-white/10 dark:bg-white/10" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-slate-900 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-400/60 hover:shadow-lg dark:border-white/10 dark:bg-white/10 dark:text-white"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
