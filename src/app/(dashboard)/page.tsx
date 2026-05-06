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
              
              <div className="flex flex-col sm:flex-row gap-5 pt-6">
                <Link 
                  href="/documentos/apresentacao-do-portal-da-greve"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-black transition-all duration-300 hover:scale-[1.02] active:scale-95 text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(15,102,136,0.3)] hover:shadow-[0_0_40px_rgba(241,67,67,0.4)] overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Ver Apresentação</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href="https://chat.whatsapp.com/BAKYXhrnPwxDeYaSCDw0Fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#121212]/80 backdrop-blur-md border border-green-500/30 text-white font-black transition-all duration-300 hover:bg-green-500/10 hover:border-green-500/50 hover:scale-[1.02] active:scale-95 text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                >
                  <MessageSquare size={18} className="text-green-500 group-hover:scale-110 transition-transform" />
                  <span>Grupo Mobilização</span>
                </a>
              </div>
            </div>
          </section>

          {/* 2. CALENDÁRIO UNIFICADO */}
          <section id="calendario" className="mb-20 scroll-mt-24">
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-12 flex items-center gap-3">
              <span className="w-8 h-px bg-gray-800"></span>
              Calendário Unificado
            </h2>
            
            <div className="space-y-16">
              <div>
                <Calendar limit={3} type="atividades" />
              </div>
              
              <div>
                <Calendar limit={3} type="monitorias" />
              </div>
            </div>

            <div className="mt-10">
              <Link href="/calendario" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all text-[10px] font-black uppercase tracking-widest shadow-lg">
                Ver calendário completo <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          {/* 3. STATUS DA GREVE */}
          <section id="status" className="mb-20 scroll-mt-24 space-y-10">
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-gray-800"></span>
              Linha do Tempo
            </h2>
            <PicketStatus />
            <PicketSituation />
          </section>


          {/* 5. DOCUMENTOS PG */}
          <section id="documentos" className="mb-20 scroll-mt-24">
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-gray-800"></span>
              Diretório de Documentos
            </h2>
            <InteractiveDirectory />
          </section>

          {/* 6. POSTS SOBRE A GREVE (DCE + CEFISMA) */}
          <section id="posts" className="mb-20 scroll-mt-24">
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-gray-800"></span>
              Atualizações (DCE & CEFISMA)
            </h2>
            <SocialFeed />
          </section>

        </div>
      </div>
    </div>
  );
}
