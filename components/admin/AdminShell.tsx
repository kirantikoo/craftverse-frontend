"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BookOpen, Palette, Tags, MessageSquareWarning, CreditCard, BadgeDollarSign, Flag, Settings } from "lucide-react";
import AdminGuard from "./AdminGuard";

const links = [["/admin","Dashboard",LayoutDashboard],["/admin/users","Users",Users],["/admin/tutorials","Tutorials",BookOpen],["/admin/crafts","Crafts",Palette],["/admin/categories","Categories",Tags],["/admin/community","Community",MessageSquareWarning],["/admin/subscriptions","Subscriptions",CreditCard],["/admin/pricing","Pricing",BadgeDollarSign],["/admin/reports","Reports",Flag],["/admin/settings","Settings",Settings]] as const;
export default function AdminShell({ children }: { children: React.ReactNode }) {
 const path=usePathname();
 return <AdminGuard><div className="py-6"><div className="mb-6"><p className="text-xs font-black uppercase tracking-[.25em] text-cyan-600">Staff workspace</p><h1 className="text-3xl font-black">CraftVerse Admin</h1></div><div className="flex gap-2 overflow-x-auto pb-4">{links.map(([href,label,Icon])=><Link key={href} href={href} className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${path===href?"bg-cyan-600 text-white":"border bg-white dark:bg-white/10"}`}><Icon size={16}/>{label}</Link>)}</div>{children}</div></AdminGuard>;
}
