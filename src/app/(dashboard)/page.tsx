import { TopBar } from "@/components/TopBar";
import { InteractiveDirectory } from "@/components/InteractiveDirectory";

export default function DashboardHome() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      
      <div className="flex flex-1 overflow-hidden px-8 max-w-5xl mx-auto w-full pt-12">
        <div className="flex-1 overflow-y-auto pr-8 pb-32">
          
          <div className="mb-12">
            <h1 className="text-4xl font-black tracking-tight mb-4 text-white">
              <span className="text-primary">HUB</span>
              <span className="text-gray-400 font-medium text-3xl"> da </span>
              <span className="text-secondary">Greve</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
              Bem-vindo ao portal interativo de documentação. Selecione uma pasta abaixo ou na barra lateral para acessar as pautas, informações e atas formatadas e higienizadas.
            </p>
          </div>

          <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider text-sm text-gray-500">
            Navegar por Pastas
          </h2>

          <InteractiveDirectory />

        </div>
      </div>
    </div>
  );
}
