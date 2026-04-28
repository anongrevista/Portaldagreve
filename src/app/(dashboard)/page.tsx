import { InteractiveDirectory } from "@/components/InteractiveDirectory";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { SocialFeed } from "@/components/SocialFeed";
import { Calendar } from "@/components/Calendar";
import { PicketStatus } from "@/components/PicketStatus";
import { PicketSituation } from "@/components/PicketSituation";

export default function DashboardHome() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <div className="flex flex-1 min-w-0 overflow-hidden px-4 sm:px-8 max-w-5xl mx-auto w-full pt-6 sm:pt-12">
        <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden pr-2 sm:pr-8 pb-24 sm:pb-32">
          
          <div className="mb-12 space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-white break-words">
                <span className="text-primary">Central</span>
                <span className="text-gray-400 font-medium text-2xl sm:text-3xl"> da </span>
                <span className="text-secondary">Greve</span>
                <span className="text-gray-500 ml-2 text-xl sm:text-2xl font-bold">(CG)</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                Bem-vindo ao portal interativo de documentação.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2 uppercase tracking-wider text-sm text-gray-500">
                Como Usar
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                Selecione uma pasta abaixo ou na barra lateral para acessar as pautas, informações e atas formatadas e higienizadas.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-6">
              <Link 
                href="/documentos/apresentacao-da-central-da-greve"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-[0_0_20px_rgba(15,102,136,0.4)] transition-all transform hover:-translate-y-0.5 active:scale-95 group text-center"
              >
                Ver Apresentação da Central
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <a 
                href="https://chat.whatsapp.com/BAKYXhrnPwxDeYaSCDw0Fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-500 text-white font-bold hover:shadow-[0_0_20px_rgba(22,163,74,0.4)] transition-all transform hover:-translate-y-0.5 active:scale-95 group text-center"
              >
                <MessageSquare size={18} />
                Entrar no grupo da mobilização
              </a>
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider text-sm text-gray-500 flex items-center gap-2">
              Calendário de Atividades
            </h2>
            <Calendar limit={3} />
            <div className="mt-4">
              <Link href="/calendario" className="text-primary hover:text-primary/80 text-sm font-bold flex items-center gap-1 transition-colors">
                Ver calendário completo <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          <PicketStatus />
          <PicketSituation />

          <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider text-sm text-gray-500">
            Documentos em destaque
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Card 1 - Informações (Secondary/Red) */}
            <Link 
              href="/documentos/ifusp/comando-de-greve/informacoes-sobre-a-greve"
              className="group relative p-6 rounded-3xl bg-gradient-to-br from-[#231a1a] to-[#121212] border border-secondary/20 hover:border-secondary/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(241,67,67,0.2)] overflow-hidden flex flex-col gap-4"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-500"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <span className="px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-[10px] font-black text-secondary uppercase tracking-widest drop-shadow-md">Importante</span>
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
              
              <div className="mt-2 relative z-10">
                <h3 className="text-xl font-black text-white group-hover:text-secondary transition-colors mb-2 leading-tight">Informações sobre a greve</h3>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">Conquistas passadas, pautas atuais e guia de funcionamento da mobilização.</p>
              </div>
            </Link>

            {/* Card 2 - README (Primary/Blue) */}
            <Link 
              href="/documentos/central-da-greve/geral/read-me"
              className="group relative p-6 rounded-3xl bg-gradient-to-br from-[#1a202c] to-[#121212] border border-primary/20 hover:border-primary/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(15,102,136,0.2)] overflow-hidden flex flex-col gap-4"
            >
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-[10px] font-black text-primary uppercase tracking-widest drop-shadow-md">Geral</span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
              
              <div className="mt-2 relative z-10">
                <h3 className="text-xl font-black text-white group-hover:text-primary transition-colors mb-2 leading-tight">READ-ME do Hub</h3>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">Guia de como navegar e utilizar a documentação da Central da Greve.</p>
              </div>
            </Link>

            {/* Card 3 - Glossário (Secondary/Red) */}
            <Link 
              href="/documentos/central-da-greve/geral/glossario"
              className="group relative p-6 rounded-3xl bg-gradient-to-br from-[#231a1a] to-[#121212] border border-secondary/20 hover:border-secondary/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(241,67,67,0.2)] overflow-hidden flex flex-col gap-4"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-500"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <span className="px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-[10px] font-black text-secondary uppercase tracking-widest drop-shadow-md">Base</span>
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
              
              <div className="mt-2 relative z-10">
                <h3 className="text-xl font-black text-white group-hover:text-secondary transition-colors mb-2 leading-tight">Glossário da Greve</h3>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">Entenda os termos, siglas e jargões essenciais usados durante o movimento.</p>
              </div>
            </Link>
          </div>

          <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider text-sm text-gray-500">
            Navegar por Pastas
          </h2>

          <InteractiveDirectory />

          <SocialFeed />

        </div>
      </div>
    </div>
  );
}

