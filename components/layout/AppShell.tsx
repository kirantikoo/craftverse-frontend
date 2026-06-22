import Sidebar from "@/components/navigation/Sidebar";
import BottomNav from "@/components/navigation/BottomNav";
import TopHeader from "@/components/layout/TopHeader";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#f8fafc] text-slate-900 dark:bg-[#050816] dark:text-white">
      <Sidebar />

      <section className="min-h-screen pb-28 lg:ml-[272px] lg:pb-8">
        <TopHeader />
        <div className="mx-auto w-full max-w-[1540px] px-4 lg:px-6 xl:px-8">
          {children}
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
