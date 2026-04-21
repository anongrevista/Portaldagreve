"use client";

import { Search } from "lucide-react";

export function TopBar() {
  return (
    <header className="flex items-center justify-between px-8 py-6 w-full max-w-5xl mx-auto">
      <div className="flex items-center gap-3 text-gray-400 bg-transparent">
        <Search size={18} />
        <input 
          type="text" 
          placeholder="Procurar documentos..." 
          className="bg-transparent border-none outline-none text-sm placeholder:text-gray-500 w-64 text-white"
        />
      </div>
    </header>
  );
}
