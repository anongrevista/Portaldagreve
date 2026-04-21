"use client";

import { useSidebarStore } from '@/store/useSidebarStore';
import { cn } from '@/lib/utils';
import { Folder, FileText, ChevronRight, ChevronDown, File, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export function Sidebar() {
  const { isMobileMenuOpen, setMobileMenuOpen } = useSidebarStore();
  const [mounted, setMounted] = useState(false);

  // Prevent Hydration Mismatch for Zustand persist
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-72 bg-[#121212] border-r border-gray-800 hidden md:block"></div>;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar Container */}
      <aside className={cn(
        "fixed md:static inset-y-0 left-0 z-50 w-72 bg-[#121212] border-r border-gray-800/50 flex flex-col transition-transform duration-300",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 pb-4">
          <h2 className="text-xl font-bold text-white tracking-tight">
            HUB da Greve
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 pb-4">
           
           <Link href="/" className="flex items-center gap-2 px-2 py-2 mb-6 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors">
             <Home size={18} className="shrink-0" />
             <span className="text-sm font-medium">Início</span>
           </Link>

           <h3 className="text-xs font-semibold text-gray-500 mb-4 px-2 tracking-wider">DOCUMENTOS DO HUB</h3>
           
           <div className="flex flex-col gap-1">
             <FolderItem title="DCE" defaultOpen>
               <FolderItem title="Pautas">
                 <FileItem title="Pauta Unificada" href="/documentos/dce/pautas/unificada" />
                 <FileItem title="Reivindicações DCE" href="/documentos/dce/pautas/reivindicacoes" />
               </FolderItem>
               <FolderItem title="Informações">
                 <FileItem title="Comunicado Greve Geral" href="/documentos/dce/informacoes/comunicado-greve" />
               </FolderItem>
               <FolderItem title="ATAS">
                 <FileItem title="Assembleia 20/05" href="/documentos/dce/atas/assembleia-20-05" />
               </FolderItem>
               <FolderItem title="Ofícios">
                 <FileItem title="Ofício Reitoria" href="/documentos/dce/oficios/reitoria" />
               </FolderItem>
             </FolderItem>
             
             <FolderItem title="IFusp" defaultOpen>
               <FolderItem title="Pautas" defaultOpen>
                 <FileItem title="Pauta Interna" href="/documentos/ifusp/pautas/interna" />
               </FolderItem>
               <FolderItem title="Informações">
                 <FileItem title="Aviso de Paralisação" href="/documentos/ifusp/informacoes/aviso-paralisacao" />
               </FolderItem>
               <FolderItem title="ATAS">
                 <FileItem title="Reunião Comando" href="/documentos/ifusp/atas/reuniao-comando" />
               </FolderItem>
               <FolderItem title="Ofícios">
                 <FileItem title="Ofício Direção" href="/documentos/ifusp/oficios/direcao" />
               </FolderItem>
             </FolderItem>
           </div>
        </div>
      </aside>
    </>
  );
}

function FolderItem({ title, defaultOpen = false, isFolderActive = false, children }: { title: string, defaultOpen?: boolean, isFolderActive?: boolean, children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors select-none",
          isFolderActive ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
        )}
      >
        {isOpen ? <ChevronDown size={16} className="shrink-0" /> : <ChevronRight size={16} className="shrink-0" />}
        <Folder size={18} className={cn("shrink-0", isFolderActive ? "text-white" : "text-gray-400")} />
        <span className="text-sm font-medium truncate">{title}</span>
      </div>
      {isOpen && children && (
        <div className="flex flex-col pl-3 mt-1 ml-4 gap-1 border-l border-gray-800/80 hover:border-gray-700 transition-colors">
          <div className="pl-3">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

function FileItem({ title, icon = 'pdf', href, isActive = false }: { title: string, icon?: 'pdf' | 'doc', href: string, isActive?: boolean }) {
  return (
    <Link 
      href={href}
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors",
        isActive ? "bg-gray-800/60 text-white" : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/30"
      )}
    >
      {icon === 'pdf' ? (
        <FileText size={16} className="text-secondary shrink-0" />
      ) : (
        <File size={16} className="text-gray-500 shrink-0" />
      )}
      <span className="text-sm truncate">{title}</span>
      {isActive && (
        <span className="ml-auto text-[10px] uppercase text-gray-500 font-semibold tracking-wider bg-gray-900 px-1.5 py-0.5 rounded shrink-0">Active</span>
      )}
    </Link>
  );
}
