"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function TopBar() {
  return (
    <header className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 w-full max-w-7xl mx-auto border-b border-gray-800/50 mb-4 sm:mb-8 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-30">
      <Link 
        href="/" 
        className="flex items-center gap-3 hover:opacity-80 transition-all group"
      >
        <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
          <Image 
            src="/logo.svg" 
            alt="Logo Central da Greve" 
            width={32} 
            height={32}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-left hidden sm:block">
          <span className="block text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase leading-none mb-1">Portal Interativo</span>
          <div className="flex items-center font-black text-lg leading-none uppercase tracking-tight">
            <span className="text-primary">Central</span>
            <span className="text-white mx-1">da</span>
            <span className="text-secondary">Greve</span>
            <span className="text-gray-500 ml-1 text-sm font-bold">(CG)</span>
          </div>
        </div>
      </Link>

      <div className="flex items-center gap-3 px-4 py-2 bg-gray-900/50 rounded-full border border-gray-800 focus-within:border-primary/50 transition-all group/search">
        <Search size={16} className="text-gray-500 group-focus-within/search:text-primary transition-colors" />
        <input 
          type="text" 
          placeholder="Procurar documentos..." 
          className="bg-transparent border-none outline-none text-sm placeholder:text-gray-600 w-32 sm:w-64 text-white"
        />
        <div className="hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded border border-gray-800 bg-gray-900 text-[10px] font-medium text-gray-500">
          <span className="text-[12px]">⌘</span>
          <span>K</span>
        </div>
      </div>
    </header>
  );
}
