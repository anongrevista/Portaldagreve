import { Sidebar } from "@/components/Sidebar";
import { BottomNavigation } from "@/components/BottomNavigation";
import { NavRail } from "@/components/NavRail";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#09090b] text-foreground overflow-hidden">
      <NavRail />
      {/* Container to offset the fixed NavRail on desktop */}
      <div className="flex flex-1 md:pl-16">
        <Sidebar />
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0 bg-[#09090b]">
          {children}
        </main>
      </div>
      <BottomNavigation />
    </div>
  );
}
