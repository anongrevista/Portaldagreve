"use client";

import { Home, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavRail() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-y-0 left-0 z-50 flex w-16 flex-col items-center justify-between bg-background/50 backdrop-blur-sm py-6 hidden md:flex border-r border-gray-800/20">
      <div className="flex flex-col items-center gap-6 w-full">
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
