import { TopBar } from "@/components/TopBar";
import { TableOfContents } from "@/components/TableOfContents";

export default function DocumentoPage({ params }: { params: { slug: string[] } }) {
  // Format slug array into a title, e.g., ["dce", "pautas", "unificada"] -> "Unificada"
  const slugTitle = params.slug[params.slug.length - 1].replace(/-/g, ' ');
  const title = slugTitle.charAt(0).toUpperCase() + slugTitle.slice(1);
  const context = params.slug.slice(0, -1).join(' / ').toUpperCase();

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      
      <div className="flex flex-1 overflow-hidden px-8 max-w-7xl mx-auto w-full">
        {/* Document Content Area */}
        <div className="flex-1 overflow-y-auto pr-8 pb-32 pt-4 prose prose-invert max-w-3xl">
          <div className="mb-4 text-xs font-semibold text-gray-500 tracking-wider">
            DOCUMENTOS DO HUB &gt; {context}
          </div>
          
          <h1 className="text-primary font-bold text-3xl mb-6 flex items-center gap-4">
            <span className="text-gray-600 font-medium text-lg mt-1 uppercase tracking-wider">DOC</span>
            {title}
          </h1>
          
          <p className="text-gray-300 leading-relaxed mb-10 text-lg">
            Este é um documento mock gerado dinamicamente para a rota: <strong>{params.slug.join('/')}</strong>. O conteúdo higienizado e real será injetado aqui via banco de dados.
          </p>

          <section id="section-1" className="mb-10">
            <h2 className="text-white font-bold text-2xl border-b-0 pb-0 flex items-center gap-4 mb-4">
               <span className="text-gray-600 font-medium text-base uppercase tracking-wider">H2</span>
               1. Contexto do Documento
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              A estratégia delineada neste documento (<span className="text-secondary">{title}</span>) baseia-se em deliberações anteriores e define as ações a serem tomadas.
            </p>

            <h3 className="text-white font-semibold text-xl mb-4">1.1 Objetivos Principais</h3>
            <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-6 marker:text-gray-500">
              <li><span className="text-secondary">Organização</span>, estruturação das frentes de trabalho.</li>
              <li><span className="text-secondary">Comunicação</span>: repassar informes para toda a base.</li>
              <li><span className="text-secondary">Acompanhamento</span> de negociações ativas.</li>
            </ul>
          </section>

          <section id="section-2" className="mb-10">
            <h2 className="text-white font-bold text-2xl border-b-0 pb-0 flex items-center gap-4 mb-4">
               <span className="text-gray-600 font-medium text-base uppercase tracking-wider">H2</span>
               2. Ações e Deliberações
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              A ações prioritárias foram votadas e aprovadas para o presente momento da mobilização:
            </p>

            <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-8 marker:text-gray-500">
              <li><span className="text-secondary">Mobilização Geral</span> e chamadas para os próximos atos.</li>
              <li><span className="text-secondary">Grupos de Trabalho</span>: manutenção da estrutura e apoio.</li>
            </ul>
          </section>
        </div>

        {/* Right Sidebar (Table of Contents) */}
        <TableOfContents />
      </div>
    </div>
  );
}
