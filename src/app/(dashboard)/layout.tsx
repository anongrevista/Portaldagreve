import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-[#151414] text-foreground overflow-hidden">
      {/* TopBar is now the full-width header */}
      <TopBar />
      
      <div className="flex flex-1 min-w-0 overflow-hidden">
        {/* Sidebar starts below TopBar */}
        <Sidebar />
        
        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden pb-16 md:pb-0 bg-[#151414]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
