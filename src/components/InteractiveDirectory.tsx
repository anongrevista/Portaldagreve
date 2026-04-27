"use client";

import { useState } from 'react';
import { Folder, FileText, ChevronRight, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface DocumentFile {
  title: string;
  href: string;
}

interface FolderData {
  description: string;
  subfolders: Record<string, DocumentFile[]>;
}

type DirectoryData = Record<string, FolderData>;

const DIRECTORY_DATA: DirectoryData = {
  DCE: {
    description: "Documentos e pautas do Diretório Central dos Estudantes.",
    subfolders: {},
  },
  IFusp: {
    description: "Documentos, pautas e informações do Instituto de Física da USP.",
    subfolders: {
      "Comando de Greve": [
        {
          title: "Informações sobre a greve",
          href: "/documentos/ifusp/comando-de-greve/informacoes-sobre-a-greve",
        },
        {
          title: "Reunião com a Direção do IFUSP",
          href: "/documentos/ifusp/comando-de-greve/reuniao-direcao-ifusp",
        },
        {
          title: "Reunião com Todos os Comandos de Greve",
          href: "/documentos/ifusp/comando-de-greve/reuniao-todos-comandos",
        },
        {
          title: "Reuniões Comando e Kaline",
          href: "/documentos/ifusp/comando-de-greve/reunioes-comando-kaline",
        },
        {
          title: "Documento de Assinatura (Kaline)",
          href: "/documentos/ifusp/comando-de-greve/documento-assinatura-kaline",
        },
        {
          title: "O que é o Comando de Greve",
          href: "/documentos/ifusp/comando-de-greve/o-que-e-o-comando",
        },
        {
          title: "Como lidar com influencers de direita",
          href: "/documentos/ifusp/comando-de-greve/influencers-de-direita",
        },
      ],
    },
  },
};

type MainFolder = string;
type SubFolder = string;

export function InteractiveDirectory() {
  const [selectedMain, setSelectedMain] = useState<MainFolder | null>(null);
  const [selectedSub, setSelectedSub] = useState<SubFolder | null>(null);

  const mainFolders = Object.keys(DIRECTORY_DATA);

  const handleMainClick = (folder: MainFolder) => {
    if (selectedMain === folder) {
      setSelectedMain(null);
      setSelectedSub(null);
    } else {
      setSelectedMain(folder);
      setSelectedSub(null);
    }
  };

  const handleSubClick = (sub: SubFolder) => {
    setSelectedSub(selectedSub === sub ? null : sub);
  };

  if (mainFolders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-8 border border-dashed border-gray-800 rounded-xl bg-[#121212]/30">
        <div className="p-4 bg-gray-800/30 rounded-full mb-6">
          <Inbox size={40} className="text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-400 mb-2">
          Nenhum documento disponível ainda
        </h3>
        <p className="text-sm text-gray-600 text-center max-w-md">
          Os documentos reais serão integrados em breve via banco de dados. Utilize a aba &quot;Enviar&quot; para submeter novos documentos.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Root Level Documents */}
      <div>
        <h2 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider flex items-center gap-2">
          <FileText size={16} className="text-primary" />
          Documentos em Destaque
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <Link
            href="/documentos/ifusp/comando-de-greve/informacoes-sobre-a-greve"
            className="group flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-[#1a1f2e] to-[#121212] border border-primary/30 hover:border-primary transition-all hover:shadow-[0_0_20px_rgba(15,102,136,0.15)]"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <FileText size={24} />
              </div>
              <div>
                <span className="font-bold text-gray-100 group-hover:text-white transition-colors block">
                  Informações sobre a greve
                </span>
                <span className="text-xs text-gray-500">Documento oficial do Comando de Greve — IFUSP</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
              Ler Agora <ChevronRight size={18} />
            </div>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4 my-2">
        <div className="h-px bg-gray-800 flex-1" />
        <span className="text-[10px] uppercase font-bold text-gray-600 tracking-[0.2em]">Ou navegue pelas pastas</span>
        <div className="h-px bg-gray-800 flex-1" />
      </div>

      {/* Main Folders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mainFolders.map((key) => (
          <div 
            key={key}
            onClick={() => handleMainClick(key)}
            className={cn(
              "flex flex-col p-6 rounded-xl border transition-all cursor-pointer group",
              selectedMain === key 
                ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(15,102,136,0.2)]" 
                : "border-gray-800 bg-[#121212]/50 hover:bg-gray-800/40",
              selectedMain && selectedMain !== key ? "opacity-50 scale-[0.98]" : "opacity-100 scale-100"
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={cn(
                "p-3 rounded-lg transition-colors",
                selectedMain === key ? "bg-primary/20" : "bg-gray-800/80 group-hover:bg-primary/20"
              )}>
                <Folder size={24} className={cn(
                  "transition-colors",
                  selectedMain === key ? "text-primary" : "text-gray-400 group-hover:text-primary"
                )} />
              </div>
              <h3 className={cn(
                "text-xl font-bold transition-colors",
                selectedMain === key ? "text-primary" : "text-white group-hover:text-primary"
              )}>{key}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6 flex-1">
              {DIRECTORY_DATA[key].description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {Object.keys(DIRECTORY_DATA[key].subfolders).map((sub) => (
                <span key={sub} className="text-xs font-medium px-2 py-1 bg-gray-800/50 rounded-md text-gray-400">
                  {sub}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Subfolders */}
      {selectedMain && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">
            Subpastas de {selectedMain}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(DIRECTORY_DATA[selectedMain].subfolders).map((sub) => {
              const isSelected = selectedSub === sub;
              const hasSelection = selectedSub !== null;
              
              return (
                <div
                  key={sub}
                  onClick={() => handleSubClick(sub)}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-lg border transition-all cursor-pointer text-center",
                    isSelected 
                      ? "border-secondary bg-secondary/10" 
                      : "border-gray-800 bg-[#121212]/50 hover:bg-gray-800",
                    hasSelection && !isSelected ? "opacity-30 scale-95" : "opacity-100 scale-100"
                  )}
                >
                  <Folder size={32} className={cn(
                    "mb-2 transition-colors",
                    isSelected ? "text-secondary" : "text-gray-400"
                  )} />
                  <span className={cn(
                    "font-medium text-sm transition-colors",
                    isSelected ? "text-white" : "text-gray-300"
                  )}>
                    {sub}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Files List */}
      {selectedMain && selectedSub && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300 bg-[#121212]/30 border border-gray-800/50 rounded-xl p-6 mt-2">
          <h2 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider flex items-center gap-2">
            <span className="text-gray-600">Arquivos em</span>
            <span className="text-secondary">{selectedSub}</span>
          </h2>
          
          <div className="flex flex-col gap-2">
            {DIRECTORY_DATA[selectedMain].subfolders[selectedSub].length === 0 ? (
              <p className="text-gray-500 text-sm py-4 italic text-center border border-dashed border-gray-800 rounded-lg">
                Nenhum arquivo nesta pasta.
              </p>
            ) : (
              DIRECTORY_DATA[selectedMain].subfolders[selectedSub].map((file, idx) => (
                <Link
                  key={idx}
                  href={file.href}
                  className="group flex items-center justify-between p-4 rounded-lg bg-[#09090b] border border-gray-800 hover:border-gray-600 transition-all hover:bg-gray-800/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-800/50 rounded text-secondary group-hover:bg-secondary/20 transition-colors">
                      <FileText size={20} />
                    </div>
                    <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                      {file.title}
                    </span>
                  </div>
                  <ChevronRight size={18} className="text-gray-600 group-hover:text-secondary transition-colors" />
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
