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
      
      <div className="flex flex-1 overflow-hidden px-8 max-w-5xl mx-auto w-full pt-12">
        <div className="flex-1 overflow-y-auto pr-8 pb-32">
          
          <div className="mb-12 space-y-8">
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-4 text-white">
                <span className="text-primary">Central</span>
                <span className="text-gray-400 font-medium text-3xl"> da </span>
                <span className="text-secondary">Greve</span>
                <span className="text-gray-500 ml-2 text-2xl font-bold">(CG)</span>
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

            <div>
              <h2 className="text-xl font-bold text-white mb-2 uppercase tracking-wider text-sm text-gray-500">
                A Importância das Greves
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl leading-relaxed mb-4">
                A greve de 2016, que durou quase 3 meses, foi fundamental: graças a ela tivemos as cotas e o Enem-USP. Já a greve de 2023, que durou um mês e meio, teve como resultado a contratação de novos professores.
              </p>
              <p className="text-lg text-gray-400 max-w-2xl leading-relaxed mb-6">
                As greves são importantes e tentam se organizar para não atrapalhar os estudos, tendo mais informações sobre a greve atual nas pastas a seguir.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/documentos/apresentacao-do-hub-da-greve"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-[0_0_20px_rgba(15,102,136,0.4)] transition-all transform hover:-translate-y-0.5 active:scale-95 group"
                >
                  Ver Apresentação da Central
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>

                <a 
                  href="https://chat.whatsapp.com/BAKYXhrnPwxDeYaSCDw0Fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-500 text-white font-bold hover:shadow-[0_0_20px_rgba(22,163,74,0.4)] transition-all transform hover:-translate-y-0.5 active:scale-95 group"
                >
                  <MessageSquare size={18} />
                  Entrar no grupo da mobilização
                </a>
              </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            <Link 
              href="/documentos/ifusp/comando-de-greve/informacoes-sobre-a-greve"
              className="group p-6 rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/60 border border-gray-700/30 hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(15,102,136,0.15)] flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Importante</span>
                <ArrowRight size={16} className="text-gray-500 group-hover:text-primary transition-transform group-hover:translate-x-1" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Informações sobre a greve</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Conquistas passadas, pautas atuais e guia de funcionamento da mobilização.</p>
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

