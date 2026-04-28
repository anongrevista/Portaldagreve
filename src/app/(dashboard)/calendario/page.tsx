import { Calendar } from "@/components/Calendar";

export default function CalendarioPage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden px-4 sm:px-8 max-w-5xl mx-auto w-full pt-6 sm:pt-12 pb-24 sm:pb-32">
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-white break-words">
            <span className="text-primary">Calendário</span>
            <span className="text-gray-400 font-medium text-2xl sm:text-3xl"> de </span>
            <span className="text-secondary">Atividades</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
            Acompanhe prazos acadêmicos, assembleias e mobilizações do Comando de Greve.
          </p>
        </header>

        <Calendar />
        
        {/* Placeholder for Empty State */}
        <div className="mt-12 p-8 border border-dashed border-gray-800 rounded-2xl bg-gray-900/30 text-center">
          <p className="text-gray-500 text-sm italic">
            Novos eventos são adicionados conforme as decisões das assembleias.
          </p>
        </div>
      </main>
    </div>
  );
}

