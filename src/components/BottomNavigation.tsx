"use client";

import { useSidebarStore } from '@/store/useSidebarStore';
import { Menu, Home, Upload } from 'lucide-react';
import Link from 'next/link';

export function BottomNavigation() {
  const { setMobileMenuOpen, isMobileMenuOpen } = useSidebarStore();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#09090b] border-t border-gray-800 flex justify-around items-center p-3 z-40">
      <button 
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        className="flex flex-col items-center text-gray-400 hover:text-primary transition-colors"
      >
        <Menu size={24} />
        <span className="text-[10px] mt-1">Documentos</span>
      </button>
      
      <Link href="/" className="flex flex-col items-center text-gray-400 hover:text-primary transition-colors">
        <Home size={24} />
        <span className="text-[10px] mt-1">Início</span>
      </Link>

      <Link href="/submit" className="flex flex-col items-center text-gray-400 hover:text-secondary transition-colors">
        <Upload size={24} />
        <span className="text-[10px] mt-1">Submeter</span>
      </Link>
    </nav>
  );
}
