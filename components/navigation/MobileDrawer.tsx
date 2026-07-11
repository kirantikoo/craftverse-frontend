"use client";

import SidebarContent from "@/components/navigation/SidebarContent";
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
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[min(86vw,320px)] border-slate-200 bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-slate-900 dark:border-white/10 dark:bg-[#071020]/95 dark:text-white"
      >
        <SheetTitle className="sr-only">CraftVerse navigation</SheetTitle>
        <SheetDescription className="sr-only">Navigate CraftVerse</SheetDescription>

        <div className="flex h-full min-h-0 flex-col overflow-hidden">
          <SidebarContent onNavigate={() => onOpenChange(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
