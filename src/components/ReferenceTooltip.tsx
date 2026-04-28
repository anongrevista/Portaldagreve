"use client";

import { Info, ExternalLink, FileCheck } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ReferenceProps {
  id: string;
  index: number;
  title: string;
  date: string;
  url?: string;
  children?: React.ReactNode;
}

export function Reference({ id, index, title, date, url, children }: ReferenceProps) {
  const [isVisible, setIsVisible] = useState(false);

  const sups = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
  const indexStr = index.toString().split('').map(d => sups[parseInt(d)]).join('');

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(`ref-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Add highlight effect
      el.classList.add('animate-highlight-flash');
      setTimeout(() => {
        el.classList.remove('animate-highlight-flash');
      }, 2000);
    }
  };

  return (
    <span 
      className="relative inline"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span 
        onClick={handleLinkClick}
        className={cn(
          "cursor-pointer text-gray-100 hover:text-white transition-all duration-300 decoration-skip-ink font-medium",
          children ? "border-b-2 border-red-500/60 hover:border-red-500" : ""
        )}
      >
        {children}
        <span className="text-xs font-bold text-secondary ml-0.5">
          {indexStr}
        </span>
      </span>

      {/* Hover Card */}
      <div className={cn(
        "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 z-[60] transition-all duration-200 pointer-events-none",
        isVisible ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-2 invisible"
      )}>
        <div className="bg-[#1a1f2e] border border-gray-700/50 rounded-xl p-4 shadow-2xl backdrop-blur-md pointer-events-auto">
          <div className="flex items-start justify-between mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileCheck size={16} className="text-primary" />
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{date}</span>
          </div>
          
          <h4 className="text-sm font-bold text-white mb-1 leading-tight">
            Referência {index}
          </h4>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed">
            {title}
          </p>

          <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
            <span className="text-[10px] text-gray-500 font-semibold italic">Ver Documento</span>
            {url ? (
              <a 
                href={url} 
                className="flex items-center gap-1.5 text-[10px] font-bold text-secondary hover:text-white transition-colors"
              >
                ABRIR <ExternalLink size={10} />
              </a>
            ) : (
              <span className="text-[10px] text-gray-600">Link não disponível</span>
            )}
          </div>
          
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1a1f2e] border-r border-b border-gray-700/50 rotate-45 -mt-1.5" />
        </div>
      </div>
    </span>
  );
}
