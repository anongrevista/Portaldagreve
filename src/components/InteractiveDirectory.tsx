"use client";

import { useState } from 'react';
import { Folder, FileText, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const MOCK_DATA = {
  DCE: {
    description: "Documentos gerais e comunicados unificados do Diretório Central.",
    subfolders: {
      Pautas: [
        { title: "Pauta Unificada", href: "/documentos/dce/pautas/unificada" },
        { title: "Reivindicações DCE", href: "/documentos/dce/pautas/reivindicacoes" },
      ],
      Informações: [
        { title: "Comunicado Greve Geral", href: "/documentos/dce/informacoes/comunicado-greve" },
      ],
      ATAS: [
        { title: "Assembleia 20/05", href: "/documentos/dce/atas/assembleia-20-05" },
      ],
      Ofícios: [
        { title: "Ofício Reitoria", href: "/documentos/dce/oficios/reitoria" },
      ]
    }
  },
  IFusp: {
    description: "Pautas internas, atas e reivindicações do Instituto de Física.",
    subfolders: {
      Pautas: [
        { title: "Pauta Interna", href: "/documentos/ifusp/pautas/interna" },
      ],
      Informações: [
        { title: "Aviso de Paralisação", href: "/documentos/ifusp/informacoes/aviso-paralisacao" },
      ],
      ATAS: [
        { title: "Reunião Comando", href: "/documentos/ifusp/atas/reuniao-comando" },
      ],
      Ofícios: [
        { title: "Ofício Direção", href: "/documentos/ifusp/oficios/direcao" },
      ]
    }
  }
};

type MainFolder = keyof typeof MOCK_DATA;
type SubFolder = 'Pautas' | 'Informações' | 'ATAS' | 'Ofícios';

export function InteractiveDirectory() {
  const [selectedMain, setSelectedMain] = useState<MainFolder | null>(null);
  const [selectedSub, setSelectedSub] = useState<SubFolder | null>(null);

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

  return (
    <div className="flex flex-col gap-8">
      {/* Main Folders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(Object.keys(MOCK_DATA) as MainFolder[]).map((key) => (
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
              {MOCK_DATA[key].description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {Object.keys(MOCK_DATA[key].subfolders).map((sub) => (
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
            {(Object.keys(MOCK_DATA[selectedMain].subfolders) as SubFolder[]).map((sub) => {
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
            {MOCK_DATA[selectedMain].subfolders[selectedSub].length === 0 ? (
              <p className="text-gray-500 text-sm py-4 italic text-center border border-dashed border-gray-800 rounded-lg">
                Nenhum arquivo nesta pasta.
              </p>
            ) : (
              MOCK_DATA[selectedMain].subfolders[selectedSub].map((file, idx) => (
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
