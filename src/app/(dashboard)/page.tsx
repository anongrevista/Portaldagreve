import { InteractiveDirectory } from "@/components/InteractiveDirectory";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { SocialFeed } from "@/components/SocialFeed";
import { Calendar } from "@/components/Calendar";
import { PicketStatus } from "@/components/PicketStatus";
import { PicketSituation } from "@/components/PicketSituation";
import { FAQ } from "@/components/FAQ";

export default function DashboardHome() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 min-w-0 overflow-hidden max-w-5xl mx-auto w-full">
        <div className="flex-1 min-w-0 pr-2 sm:pr-8 pb-24 sm:pb-32">

          {/* 1. INÍCIO (Hero/Intro) */}
          <section id="inicio" className="mb-12 scroll-mt-24">
            {/* ⚠️ AVISO DE REVISÃO */}
            <div className="mb-10 flex items-start gap-4 p-5 rounded-3xl bg-red-950/40 border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
              <span className="text-2xl shrink-0 mt-0.5">🚨</span>
              <div>
                <p className="text-red-400 font-black text-sm uppercase tracking-widest mb-1">
                  Documentos em revisão
                </p>
                <p className="text-red-300/70 text-xs leading-relaxed">
                  Os documentos desta plataforma ainda não foram finalizados. Por favor, <strong>não compartilhe este link</strong> publicamente até a liberação final.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white leading-none">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Portal da Greve</span>
                <span className="text-gray-500 ml-3">(PG)</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                Bem-vindo ao centro de inteligência e documentação do Comando de Greve. 
                Aqui você encontra pautas, atas e manuais organizados para fortalecer a mobilização.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link 
                  href="/documentos/apresentacao-do-portal-da-greve"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-black font-black hover:bg-gray-200 transition-all active:scale-95 text-sm uppercase tracking-widest"
                >
                  Ver Apresentação
                  <ArrowRight size={18} />
                </Link>
                <a 
                  href="https://chat.whatsapp.com/BAKYXhrnPwxDeYaSCDw0Fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#121212] border border-gray-800 text-white font-black hover:bg-gray-800 transition-all active:scale-95 text-sm uppercase tracking-widest"
                >
                  <MessageSquare size={18} className="text-green-500" />
                  Grupo Mobilização
                </a>
              </div>
            </div>
          </section>

          {/* 2. CALENDÁRIO */}
          <section id="calendario" className="mb-20 scroll-mt-24">
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-gray-800"></span>
              Calendário de Atividades
            </h2>
            <Calendar limit={3} />
            <div className="mt-6">
              <Link href="/calendario" className="text-primary hover:text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors">
                Ver calendário completo <ArrowRight size={12} />
              </Link>
            </div>
          </section>

          {/* 3. STATUS DA GREVE */}
          <section id="status" className="mb-20 scroll-mt-24 space-y-10">
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-gray-800"></span>
              Situação dos Piquetes
            </h2>
            <PicketStatus />
            <PicketSituation />
          </section>

          {/* 4. FAQ */}
          <section id="faq" className="mb-20 scroll-mt-24">
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-gray-800"></span>
              Perguntas Frequentes
            </h2>
            <FAQ />
          </section>

          {/* 5. POSTS SOBRE A GREVE (DCE + CEFISMA) */}
          <section id="posts" className="mb-20 scroll-mt-24">
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-gray-800"></span>
              Atualizações (DCE & CEFISMA)
            </h2>
            <SocialFeed />
          </section>

          {/* 6. DOCUMENTOS PG */}
          <section id="documentos" className="mb-20 scroll-mt-24">
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-gray-800"></span>
              Diretório de Documentos
            </h2>
            <InteractiveDirectory />
          </section>

        </div>
      </div>
    </div>
  );
}
