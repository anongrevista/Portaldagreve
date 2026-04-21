"use client";

import { Home, Folder, ClipboardList, Music, Upload, HelpCircle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavRail() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-y-0 left-0 z-50 flex w-16 flex-col items-center justify-between border-r border-gray-800/50 bg-[#121212] py-6 hidden md:flex">
      <div className="flex flex-col items-center gap-6 w-full">
        <NavItem href="/" icon={<Home size={20} />} isActive={pathname === "/"} />
        <NavItem href="/explorer" icon={<Folder size={20} />} isActive={pathname.startsWith("/pautas") || pathname === "/explorer"} />
        <NavItem href="/submit" icon={<Upload size={20} />} isActive={pathname === "/submit"} />
      </div>
      
      <div className="flex flex-col items-center gap-6 w-full mb-4">
        <NavItem href="/help" icon={<HelpCircle size={20} />} isActive={pathname === "/help"} />
      </div>
    </nav>
  );
}

function NavItem({ icon, isActive, href }: { icon: React.ReactNode; isActive?: boolean; href: string }) {
  return (
    <Link href={href} className="relative flex w-full cursor-pointer items-center justify-center text-gray-500 hover:text-gray-300 transition-colors">
      {isActive && (
        <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r bg-secondary" />
      )}
      <div className={cn("p-2 rounded-lg", isActive && "text-white bg-gray-800/40")}>
        {icon}
      </div>
    </Link>
  );
}
