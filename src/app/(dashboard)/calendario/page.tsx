import { Calendar } from "@/components/Calendar";

export default function CalendarioPage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden px-4 sm:px-8 max-w-5xl mx-auto w-full pt-6 sm:pt-12 pb-24 sm:pb-32">
        <header className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4 text-white">
            <span className="text-primary">Calendário</span>
            <span className="text-gray-500"> Geral</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
            Consulte aqui o cronograma completo de mobilizações, assembleias e as monitorias acadêmicas realizadas durante a greve.
          </p>
        </header>

        <div className="space-y-24">
          <section id="atividades">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-primary rounded-full shadow-[0_0_15px_rgba(15,102,136,0.5)]"></div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Atividades e Mobilização</h2>
            </div>
            <Calendar type="atividades" />
          </section>

          <section id="monitorias">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-secondary rounded-full shadow-[0_0_15px_rgba(241,67,67,0.5)]"></div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Monitorias e Acadêmico</h2>
            </div>
            <Calendar type="monitorias" />
          </section>
        </div>

        <div className="mt-20 p-10 border border-dashed border-gray-800 rounded-[2rem] bg-gray-900/20 text-center">
          <p className="text-gray-500 text-sm italic max-w-md mx-auto">
            A agenda é atualizada diariamente de acordo com as deliberações do comando de greve e disponibilidade dos monitores.
          </p>
        </div>
      </main>
    </div>
  );
}

