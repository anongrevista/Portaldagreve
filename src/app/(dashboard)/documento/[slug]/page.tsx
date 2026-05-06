"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, FileText, Download } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { apresentacaoData } from "@/data/apresentacaoData";
import { glossarioData } from "@/data/glossarioData";
import { informacoesData } from "@/data/informacoesData";
import { ROOT_DOCUMENTS } from "@/data/directoryData";

const dataMap: Record<string, any> = {
  "apresentacao-portal": apresentacaoData,
  "glossario-da-greve": glossarioData,
  "informacoes-sobre-a-greve": informacoesData,
};

export default function DocumentoPage({ params }: { params: { slug: string } }) {
  const [activeSection, setActiveSection] = useState<string>("");
  
  const docData = dataMap[params.slug];
  const rootDoc = ROOT_DOCUMENTS.find(doc => doc.slug === params.slug);

  useEffect(() => {
    if (!docData) return;
    
    const observers = new Map();
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -80% 0px", // Trigger when the top of the section is near the top of the viewport
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

    docData.sections.forEach((sec: any) => {
      const element = document.getElementById(sec.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [docData]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  if (!docData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Documento não encontrado</h2>
        <p className="text-gray-400 mb-6">O documento que você está procurando não existe ou não foi estruturado.</p>
        <Link href="/" className="px-6 py-2 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/80 transition-colors">
          Voltar ao Início
        </Link>
      </div>
    );
  }

  // Theme map for alternating vibrant colors just like in HUB LabDiv
  const themeColors = ["text-primary", "text-secondary", "text-emerald-500"];
  const borderColors = ["border-primary/30", "border-secondary/30", "border-emerald-500/30"];

  return (
    <div className="max-w-6xl mx-auto pb-24 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 items-start">
      
      {/* Lateral Menu (ScrollSpy) - Sticky on Desktop */}
      <aside className="hidden md:block sticky top-24 w-64 shrink-0">
        <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-2xl">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors mb-6 uppercase tracking-wider">
            <ArrowLeft size={14} /> Voltar
          </Link>
          <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">Sumário</h3>
          <nav className="flex flex-col gap-2">
            {docData.sections.map((sec: any) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={cn(
                  "text-left text-sm font-medium transition-all duration-300 rounded-md px-2 py-1.5",
                  activeSection === sec.id
                    ? "text-primary bg-primary/10 translate-x-2 border-l-2 border-primary"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border-l-2 border-transparent"
                )}
              >
                {sec.title}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Header / Hero */}
        <header className="mb-12 border-b border-gray-800/50 pb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/5 rounded-xl text-white border border-gray-800 shadow-xl">
              <FileText size={32} />
            </div>
            {rootDoc && (
              <a
                href={rootDoc.fileUrl}
                download
                className="ml-auto flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-gray-800 rounded-lg text-xs text-gray-300 font-semibold transition-all shrink-0"
                title="Baixar versão original"
              >
                <Download size={14} />
                Baixar ZIP Original
              </a>
            )}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">{docData.title}</h1>
          <p className="text-lg sm:text-xl text-gray-400 font-medium leading-relaxed">{docData.subtitle}</p>
        </header>

        {/* Sections */}
        <article className="space-y-16">
          {docData.sections.map((sec: any, index: number) => {
            const colorClass = themeColors[index % themeColors.length];
            const borderClass = borderColors[index % borderColors.length];
            
            return (
              <section key={sec.id} id={sec.id} className="scroll-mt-32">
                <h2 className={cn("text-2xl sm:text-3xl font-bold mb-6 font-bukra uppercase tracking-wide", colorClass)}>
                  {sec.title}
                </h2>
                
                {/* Paragraphs */}
                {sec.paragraphs && sec.paragraphs.length > 0 && (
                  <div className="space-y-4 mb-8">
                    {sec.paragraphs.map((p: string, pIdx: number) => (
                      <p key={pIdx} className="text-gray-300 text-base sm:text-lg leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                )}

                {/* Content Cards (Grid) */}
                {sec.content && sec.content.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sec.content.map((item: any, itemIdx: number) => (
                      <div 
                        key={itemIdx} 
                        className={cn(
                          "flex flex-col p-5 rounded-xl border bg-[#121212]/50 shadow-lg transition-transform hover:scale-[1.02] duration-300 glass-card",
                          borderClass
                        )}
                      >
                        {item.subtitle && (
                          <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">{item.subtitle}</h4>
                        )}
                        <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </article>

      </main>
    </div>
  );
}
