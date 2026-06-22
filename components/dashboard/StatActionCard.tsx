import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type StatActionCardProps = {
  icon: ReactNode;
  label: string;
  title: string;
  description: string;
  action: string;
  accent: string;
  children?: ReactNode;
};

export default function StatActionCard({
  icon,
  label,
  title,
  description,
  action,
  accent,
  children,
}: StatActionCardProps) {
  return (
    <article
      className={`flex min-h-[250px] h-full flex-col rounded-[28px] border border-slate-200/80 p-6 shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:shadow-[0_16px_36px_rgba(0,0,0,.24)] ${accent}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 text-white shadow-lg">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</p>
          <h3 className="mt-1 text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
        </div>
      </div>

      {children && <div className="pt-5">{children}</div>}

      <div className="mt-auto pt-5">
        <button className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/65 text-sm font-bold text-slate-900 transition hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15">
          {action}
          <ArrowRight size={17} />
        </button>
      </div>
    </article>
  );
}
