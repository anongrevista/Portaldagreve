"use client";

import { useState } from 'react';
import { Folder, FileText, ChevronRight, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface DocumentFile {
  title: string;
  href: string;
}

export interface FolderData {
  description: string;
  subfolders: Record<string, DocumentFile[]>;
}

export type DirectoryData = Record<string, FolderData>;

export const DIRECTORY_DATA: DirectoryData = {
  "Central da Greve": {
    description: "Documentos gerais, apresentações e glossário.",
    subfolders: {
      "Geral": [
        { title: "Apresentação da Central da Greve", href: "/documentos/apresentacao-da-central-da-greve" },
        { title: "Glossário da greve", href: "/documentos/central-da-greve/geral/glossario" },
        { title: "READ-ME", href: "/documentos/central-da-greve/geral/read-me" }
      ]
    }
  },
  "DCE": {
    description: "Documentos e pautas do Diretório Central dos Estudantes.",
    subfolders: {
      "Geral": [
        { title: "READ-ME", href: "/documentos/dce/geral/read-me" }
      ],
      "Notas": [
        { title: "READ-ME", href: "/documentos/dce/notas/read-me" }
      ]
    }
  },
  "Dossiês USP": {
    description: "Dossiês e investigações sobre as condições na USP.",
    subfolders: {
      "Geral": [
        { title: "Fotos horrendas dos bandejões", href: "/documentos/dossies-usp/geral/fotos-bandejoes" },
        { title: "READ-ME", href: "/documentos/dossies-usp/geral/read-me" }
      ]
    }
  },
  "IFUSP": {
    description: "Documentos, assembleias e reuniões do Instituto de Física.",
    subfolders: {
      "Geral": [
        { title: "READ-ME", href: "/documentos/ifusp/geral/read-me" }
      ],
      "Assembleias": [
        { title: "READ-ME", href: "/documentos/ifusp/assembleias/read-me" }
      ],
      "Ofícios": [
        { title: "READ-ME", href: "/documentos/ifusp/oficios/read-me" }
      ],
      "Plenárias": [
        { title: "READ-ME", href: "/documentos/ifusp/plenarias/read-me" }
      ],
      "Reuniões": [
        { title: "Reunião do comando de greve", href: "/documentos/ifusp/reunioes/reuniao-comando" },
        { title: "Reuniões com a Kaline", href: "/documentos/ifusp/reunioes/reunioes-kaline" },
        { title: "READ-ME", href: "/documentos/ifusp/reunioes/read-me" }
      ]
    }
  },
  "Manuais de greve": {
    description: "Guias, protocolos e informações sobre a paralisação.",
    subfolders: {
      "Geral": [
        { title: "Informações sobre a greve (comando)", href: "/documentos/ifusp/comando-de-greve/informacoes-sobre-a-greve" },
        { title: "O que é o Comando de Greve", href: "/documentos/ifusp/comando-de-greve/o-que-e-o-comando" },
        { title: "Como lidar com influencers de direita", href: "/documentos/ifusp/comando-de-greve/influencers-de-direita" },
        { title: "READ-ME", href: "/documentos/manuais-de-greve/geral/read-me" }
      ]
    }
  }
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
      <div className="flex flex-col items-center justify-center py-8 sm:py-16 px-4 sm:px-8 border border-dashed border-gray-800 rounded-xl bg-[#121212]/30">
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
