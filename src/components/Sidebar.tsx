"use client";

import { useSidebarStore } from '@/store/useSidebarStore';
import { cn } from '@/lib/utils';
import { Folder, FileText, ChevronRight, ChevronDown, Home, Calendar, Instagram, Upload, HelpCircle, Activity, BookOpen, GraduationCap, MessageSquare, Info } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { DIRECTORY_DATA, ROOT_DOCUMENTS } from '@/data/directoryData';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const { isMobileMenuOpen, setMobileMenuOpen } = useSidebarStore();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const pathname = usePathname();
  
  useEffect(() => setMounted(true), []);

  // ScrollSpy Logic
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = ['inicio', 'calendario', 'status', 'posts', 'documentos'];


    const observers = new Map();

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  if (!mounted) return <div className="w-64 bg-transparent border-r border-gray-800/20 hidden md:block"></div>;

  const isHome = pathname === '/';

  return (
    <>
      {isMobileMenuOpen && (
        <div className="fixed top-16 inset-0 bg-black/50 z-30 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
      
      <aside className={cn(
        "fixed md:sticky top-16 inset-y-0 right-0 md:left-0 z-40 w-64 h-[calc(100vh-64px)] bg-[#151414] border-l md:border-l-0 md:border-r border-gray-800/30 flex flex-col transition-transform duration-300 shadow-2xl md:shadow-none",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
      )}>
        <div className="flex-1 overflow-y-auto px-3 pt-12 pb-6 space-y-8">
          
          {/* Main Navigation Group (Scroll Tracker) */}
          <div className="space-y-1">
            <h3 className="px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Navegação</h3>


            <SidebarButton 
              href={isHome ? "#status" : "/#status"} 
              icon={<Activity size={18} />} 
              label="Status da Greve" 
              isActive={isHome && activeSection === 'status'} 
              color="blue" 
            />

            <SidebarButton 
              href={isHome ? "#documentos" : "/#documentos"} 
              icon={<BookOpen size={18} />} 
              label="Documentos PG" 
              isActive={isHome && activeSection === 'documentos'} 
              color="red" 
            />
            <SidebarButton 
              href={isHome ? "#posts" : "/#posts"} 
              icon={<Instagram size={18} />} 
              label="Posts da Greve" 
              isActive={isHome && activeSection === 'posts'} 
              color="red" 
            />
          </div>

          <div className="px-1">
            <Link 
              href="/documentos/apresentacao-do-portal-da-greve"
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all text-center group w-full"
            >
              <Info size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-black uppercase tracking-widest leading-tight">Apresentação<br />do PG</span>
            </Link>
          </div>

          {/* Destaques */}
          <div>
            <h3 className="px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Destaques</h3>
            <div className="space-y-1">
              {ROOT_DOCUMENTS.filter(doc => doc.destaque).slice(0, 3).map(doc => (
                <Link 
                  key={doc.slug}
                  href={`/documentos/${doc.slug}`}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 mx-2 rounded-lg text-xs font-medium transition-all border border-transparent",
                    pathname === `/documentos/${doc.slug}`
                      ? "text-secondary bg-secondary/10 border-secondary/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <FileText size={14} className="shrink-0" />
                  <span className="truncate">{doc.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Detailed Document Index */}
          <div>
            <h3 className="px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Índice de Pastas</h3>
            <div className="space-y-1">
               {Object.entries(DIRECTORY_DATA).map(([folder, data]) => (
                 <FolderCollapse key={folder} title={folder} color={folder === 'IFUSP' ? 'blue' : 'red'}>
                   {Object.entries(data.subfolders).map(([sub, files]) => (
                     <FolderCollapse key={sub} title={sub} isSub>
                       {files.map(file => (
                         <FileLink key={file.href} title={file.title} href={file.href} />
                       ))}
                     </FolderCollapse>
                   ))}
                 </FolderCollapse>
               ))}
            </div>
          </div>


        </div>
      </aside>
    </>
  );
}

function SidebarButton({ href, icon, label, isActive, color = 'blue' }: { href: string; icon: React.ReactNode; label: string; isActive: boolean; color?: 'blue' | 'red' | 'green' | 'orange' | 'purple' }) {
  const colorMap = {
    blue: 'text-primary bg-primary/10 border-primary/20 hover:border-primary/40',
    red: 'text-secondary bg-secondary/10 border-secondary/20 hover:border-secondary/40',
    green: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40',
    orange: 'text-orange-500 bg-orange-500/10 border-orange-500/20 hover:border-orange-500/40',
    purple: 'text-purple-500 bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40',
  };

  const activeClass = isActive ? colorMap[color] : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border-transparent';

  return (
    <Link 
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-medium text-sm group border",
        activeClass
      )}
    >
      <div className={cn(
        "shrink-0 transition-colors",
        isActive ? "" : "text-gray-500 group-hover:text-gray-300"
      )}>
        {icon}
      </div>
      <span>{label}</span>
      {isActive && <div className={cn("ml-auto w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]", color === 'blue' ? 'bg-primary' : (color === 'red' ? 'bg-secondary' : 'bg-current'))} />}
    </Link>
  );
}

function FolderCollapse({ title, isSub = false, color = 'blue', children }: { title: string; isSub?: boolean; color?: 'blue' | 'red'; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const colorClass = color === 'blue' ? 'text-primary' : 'text-secondary';
  
  return (
    <div className="flex flex-col">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium text-gray-400 hover:text-gray-200",
          isSub && "ml-4 text-xs"
        )}
      >
        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {!isSub && <Folder size={16} className={cn("shrink-0", colorClass)} />}
        <span className="truncate">{title}</span>
      </button>
      {isOpen && <div className={cn("flex flex-col mt-1", !isSub && "ml-4")}>{children}</div>}
    </div>
  );
}

function FileLink({ title, href }: { title: string; href: string }) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-2 px-4 py-1.5 ml-4 rounded-md text-xs text-gray-500 hover:text-primary hover:bg-primary/5 transition-all border-l border-gray-800/50"
    >
      <FileText size={12} className="shrink-0" />
      <span className="truncate">{title}</span>
    </Link>
  );
}
