"use client";

import { useState } from 'react';
import { Folder, FileText, ChevronRight, Inbox, Search, Star, X, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { DIRECTORY_DATA, ROOT_DOCUMENTS, RootDocument } from '@/data/directoryData';
import JSZip from 'jszip';

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

  const destaques = ROOT_DOCUMENTS.filter(doc => doc.destaque);
  const outrosDocumentos = ROOT_DOCUMENTS.filter(doc => !doc.destaque);

  return (
    <div className="flex flex-col gap-8">

      {/* Documentos em Destaque */}
      {destaques.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-secondary mb-4 uppercase tracking-wider flex items-center gap-2">
            <Star size={16} /> Documentos em Destaque
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {destaques.map((doc, idx) => (
              <Link 
                key={idx}
                href={`/documentos/${doc.slug}`}
                className="group flex flex-col p-5 rounded-xl border border-secondary/30 bg-secondary/5 hover:bg-secondary/10 transition-all cursor-pointer shadow-lg hover:shadow-secondary/20 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
                <div className="flex items-start gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-secondary/20 text-secondary">
                    <FileText size={20} />
                  </div>
                  <h3 className="font-bold text-white group-hover:text-secondary transition-colors line-clamp-2">
                    {doc.title}
                  </h3>
                </div>
                {doc.description && (
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">{doc.description}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Outros Documentos (Não destaques) */}
      {outrosDocumentos.length > 0 && (
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {outrosDocumentos.map((doc, idx) => (
              <Link
                key={idx}
                href={`/documentos/${doc.slug}`}
                className="group flex items-center gap-3 p-4 rounded-xl border border-gray-800 bg-[#121212]/50 hover:bg-gray-800/40 transition-all cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-gray-800 text-gray-400 group-hover:text-white transition-colors">
                  <FileText size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-200 group-hover:text-white truncate transition-colors">
                    {doc.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

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
          {Object.keys(DIRECTORY_DATA[selectedMain].subfolders).length === 0 ? (
            <div className="p-8 border border-dashed border-gray-800 rounded-xl bg-[#121212]/30 text-center">
              <p className="text-gray-500 text-sm italic">Nenhuma subpasta específica encontrada. Os arquivos serão listados aqui assim que disponíveis.</p>
            </div>
          ) : (
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
          )}
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

