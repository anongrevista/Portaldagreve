"use client";

import { useSidebarStore } from '@/store/useSidebarStore';
import { cn } from '@/lib/utils';
import { Folder, FileText, ChevronRight, ChevronDown, File, Home, Calendar as CalendarIcon, Instagram, Upload, Presentation, HelpCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DIRECTORY_DATA } from './InteractiveDirectory';

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
        "fixed md:relative inset-y-0 left-0 z-50 w-72 bg-[#121212] border-r border-gray-800/50 flex flex-col transition-transform duration-300",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 pb-4">
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center overflow-hidden shadow-lg shadow-primary/10 transition-transform group-hover:scale-105">
              <img 
                src="/logo.png" 
                alt="Logo PG" 
                className="w-full h-full object-cover"
              />
            </div>
            Portal da Greve
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 pb-4">
           
           <Link href="/" className="flex items-center gap-2 px-2 py-2 rounded-md text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 transition-colors">
             <Home size={18} className="shrink-0" />
             <span className="text-sm font-medium">Início</span>
           </Link>

           <Link href="/calendario" className="flex items-center gap-2 px-2 py-2 rounded-md text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 transition-colors">
             <CalendarIcon size={18} className="shrink-0" />
             <span className="text-sm font-medium">Calendário</span>
           </Link>
           
           <Link href="/#social-feed" className="flex items-center gap-2 px-2 py-2 rounded-md text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors">
             <Instagram size={18} className="shrink-0" />
             <span className="text-sm font-medium">Posts da Greve</span>
           </Link>

           <Link href="/submit" className="flex items-center gap-2 px-2 py-2 rounded-md text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors">
             <Upload size={18} className="shrink-0" />
             <span className="text-sm font-medium">Envio de Documentos</span>
           </Link>

           <Link href="/documentos/apresentacao-do-portal-da-greve" className="flex items-center gap-2 px-2 py-2 mb-6 rounded-md text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 transition-colors">
             <Presentation size={18} className="shrink-0" />
             <span className="text-sm font-medium">Apresentação do PG</span>
           </Link>
            <Link href="/#faq" className="flex items-center gap-2 px-2 py-2 mb-6 rounded-md text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 transition-colors">
              <HelpCircle size={18} className="shrink-0" />
              <span className="text-sm font-medium">Perguntas Frequentes</span>
            </Link>

           <h3 className="text-xs font-semibold text-gray-500 mb-4 px-2 tracking-wider">DOCUMENTOS DO PORTAL</h3>
           
           <div className="flex flex-col gap-1 mb-2">
             <FileItem title="Informações sobre a greve" href="/documentos/ifusp/comando-de-greve/informacoes-sobre-a-greve" />
             <FileItem title="READ-ME do Portal" href="/documentos/portal-da-greve/geral/read-me" />
             <FileItem title="Glossário da Greve" href="/documentos/portal-da-greve/geral/glossario" />
           </div>

           <div className="flex flex-col gap-1">
              {Object.entries(DIRECTORY_DATA).map(([mainFolder, data]) => (
                <FolderItem 
                  key={mainFolder} 
                  title={mainFolder} 
                  color={(mainFolder === 'IFUSP' || mainFolder === 'DCE') ? 'blue' : 'red'}
                >
                  {Object.entries(data.subfolders).map(([subFolder, files]) => (
                    <FolderItem key={subFolder} title={subFolder}>
                      {files.length === 0 ? (
                        <div className="text-xs text-gray-600 py-2 italic px-4">Nenhum documento</div>
                      ) : (
                        files.map(file => (
                          <FileItem key={file.href} title={file.title} href={file.href} />
                        ))
                      )}
                    </FolderItem>
                  ))}
                </FolderItem>
              ))}
           </div>
        </div>
      </aside>
    </>
  );
}

function FolderItem({ title, defaultOpen = false, isFolderActive = false, color, children }: { title: string, defaultOpen?: boolean, isFolderActive?: boolean, color?: 'red' | 'blue', children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors select-none",
          isFolderActive ? "bg-primary text-white" : "hover:bg-gray-800/50",
          !isFolderActive && color === 'red' && "text-red-400 hover:text-red-300",
          !isFolderActive && color === 'blue' && "text-blue-400 hover:text-blue-300",
          !isFolderActive && !color && "text-gray-300 hover:text-white"
        )}
      >
        {isOpen ? <ChevronDown size={16} className="shrink-0" /> : <ChevronRight size={16} className="shrink-0" />}
        <Folder size={18} className={cn(
          "shrink-0", 
          isFolderActive ? "text-white" : (color === 'red' ? "text-red-400" : color === 'blue' ? "text-blue-400" : "text-gray-400")
        )} />
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
