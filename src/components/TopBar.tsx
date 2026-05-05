"use client";

import { Search, X, FileText, ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import { useSearchStore } from "@/store/useSearchStore";
import { useSidebarStore } from "@/store/useSidebarStore";
import { useEffect, useRef, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DIRECTORY_DATA, type DocumentFile } from "@/data/directoryData";
import { cn } from "@/lib/utils";

export function TopBar() {
  const { query, setQuery } = useSearchStore();
  const { isMobileMenuOpen, setMobileMenuOpen } = useSidebarStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Search logic
  const searchResults = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    
    const results: { file: DocumentFile; main: string; sub: string; matchType: 'title' | 'content' | 'section'; preview?: string; anchor?: string }[] = [];
    const lowerQuery = query.toLowerCase();

    const getPreview = (text: string, query: string) => {
      const index = text.toLowerCase().indexOf(query.toLowerCase());
      if (index === -1) return '';
      const start = Math.max(0, index - 30);
      const end = Math.min(text.length, index + query.length + 50);
      let preview = text.substring(start, end);
      if (start > 0) preview = '...' + preview;
      if (end < text.length) preview = preview + '...';
      return preview;
    };

    Object.entries(DIRECTORY_DATA).forEach(([main, mainData]) => {
      Object.entries(mainData.subfolders).forEach(([sub, files]) => {
        files.forEach(file => {
          if (file.title.toLowerCase().includes(lowerQuery)) {
            results.push({ file, main, sub, matchType: 'title' });
            return;
          }
          if (file.sections) {
            for (const section of file.sections) {
              if (section.title.toLowerCase().includes(lowerQuery) || section.content.toLowerCase().includes(lowerQuery)) {
                results.push({ file, main, sub, matchType: 'section', anchor: section.anchor, preview: getPreview(section.content, lowerQuery) });
                return;
              }
            }
          }
          if (file.content && file.content.toLowerCase().includes(lowerQuery)) {
            results.push({ file, main, sub, matchType: 'content', preview: getPreview(file.content, lowerQuery) });
          }
        });
      });
    });
    return results;
  }, [query]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsResultsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (!isResultsOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex(prev => Math.min(prev + 1, searchResults.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(prev => Math.max(prev - 1, -1));
      } else if (e.key === "Enter" && activeIndex >= 0) {
        const result = searchResults[activeIndex];
        const href = result.anchor ? `${result.file.href}#${result.anchor}` : result.file.href;
        router.push(href);
        setIsResultsOpen(false);
        setQuery('');
      } else if (e.key === "Escape") {
        setIsResultsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isResultsOpen, searchResults, activeIndex, router, setQuery]);

  useEffect(() => {
    if (query.trim()) setIsResultsOpen(true);
    else setIsResultsOpen(false);
  }, [query]);

  return (
    <header className="w-full bg-[#151414]/90 backdrop-blur-md border-b border-gray-800/50 z-50 sticky top-0">
      <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Logo & Title */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center overflow-hidden shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-black text-lg tracking-tight uppercase">
              Portal da Greve (PG)
            </span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-0.5">Comando de Greve do IFUSP</span>
          </div>
        </Link>

        {/* Center: Navigation Bar (Pill style like the image) */}
        <nav className="hidden xl:flex items-center bg-[#1a1f2e]/40 border border-gray-800/50 rounded-full px-1 py-1">
          <TopNavLink href="/" label="Início" isActive={pathname === "/"} />
          <TopNavLink href="/calendario" label="Calendário" isActive={pathname === "/calendario"} />
          <TopNavLink href="/submit" label="Enviar" isActive={pathname === "/submit"} />
          <TopNavLink href="/#faq" label="FAQ" isActive={false} />
        </nav>

        {/* Right: Search Bar & Mobile Menu */}
        <div className="flex items-center gap-3 flex-1 max-w-md justify-end">
          <div className="flex-1 relative" ref={containerRef}>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900/50 rounded-lg border border-gray-800 focus-within:border-primary/40 focus-within:bg-gray-900 transition-all group/search">
              <Search size={16} className="text-gray-500 group-focus-within/search:text-primary transition-colors" />
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Buscar... (⌘K)" 
                className="bg-transparent border-none outline-none text-sm placeholder:text-gray-600 w-full text-white"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query.trim() && setIsResultsOpen(true)}
              />
              {query && (
                <button onClick={() => { setQuery(''); setIsResultsOpen(false); }} className="p-1 hover:bg-gray-800 rounded-full text-gray-500">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {isResultsOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#121212]/95 backdrop-blur-xl border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50 max-h-[400px] overflow-y-auto">
                <div className="p-2">
                  {searchResults.length === 0 ? (
                    <div className="p-8 text-center">
                      <Search size={24} className="mx-auto text-gray-700 mb-2" />
                      <p className="text-xs text-gray-500">Nenhum resultado para "{query}"</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <div className="px-3 py-2 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-800/50 mb-1">
                        Encontrados ({searchResults.length})
                      </div>
                      {searchResults.map((result, idx) => {
                        const href = result.anchor ? `${result.file.href}#${result.anchor}` : result.file.href;
                        const isActive = idx === activeIndex;
                        return (
                          <Link
                            key={idx}
                            href={href}
                            onClick={() => { setIsResultsOpen(false); setQuery(''); }}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={cn("flex flex-col p-2.5 rounded-lg transition-all", isActive ? "bg-white/10" : "hover:bg-white/5")}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <FileText size={14} className="text-primary" />
                              <span className="text-sm font-bold text-gray-200 truncate">{result.file.title}</span>
                            </div>
                            {result.preview && (
                              <p className="text-[10px] text-gray-500 italic line-clamp-1">
                                {result.preview}
                              </p>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <button 
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-all"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

function TopNavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link 
      href={href} 
      className={cn(
        "px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
        isActive 
          ? "bg-primary/20 text-primary shadow-[0_0_15px_rgba(15,102,136,0.3)]" 
          : "text-gray-400 hover:text-white hover:bg-white/5"
      )}
    >
      {label}
    </Link>
  );
}
