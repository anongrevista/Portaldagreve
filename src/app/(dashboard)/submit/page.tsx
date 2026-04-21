import { TopBar } from "@/components/TopBar";
import { Mail, ArrowRight, FileUp, Link as LinkIcon } from "lucide-react";

export default function SubmitPage() {
  const email = "hubgreve@gmail.com";
  const subject = encodeURIComponent("Submissão de documento ao HUB");
  const body = encodeURIComponent(`Oi, sou o xxxxx, tudo bem?

Estou enviando o link de um documento para o HUB, o documento é para xxxxxxxxxx.

link para o documento:
[ ]

Ass,
xxxx`);

  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

  return (
    <div className="flex flex-col min-h-screen bg-[#09090b]">
      <TopBar />
      
      <div className="flex-1 overflow-y-auto px-8 pt-16 pb-32 max-w-4xl mx-auto w-full">
        <div className="mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-secondary/20 rounded-xl mb-6">
            <FileUp size={32} className="text-secondary" />
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-4 text-white">
            Submeter Documento
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Para garantir a organização e a padronização visual da plataforma, todos os documentos são higienizados antes de serem publicados no HUB. Envie o link do seu arquivo e nós cuidamos do resto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Instruções */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-white mb-2">Como Funciona?</h2>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center font-bold text-gray-300 shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-gray-200 mb-1">Gere um Link Compartilhável</h3>
                <p className="text-sm text-gray-400">Suba seu documento no Google Drive, Docs ou similar, e ative a permissão de visualização para qualquer pessoa com o link.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center font-bold text-gray-300 shrink-0">2</div>
              <div>
                <h3 className="font-semibold text-gray-200 mb-1">Envie por E-mail</h3>
                <p className="text-sm text-gray-400">Clique no botão ao lado para abrir seu e-mail padrão. Um modelo de mensagem já estará preenchido, basta substituir os "X" com seus dados.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-gray-200 mb-1">Processamento</h3>
                <p className="text-sm text-gray-400">Nossa equipe receberá o arquivo, fará a conversão para o nosso layout interativo (Dark Mode, tipografia, sumário) e o publicará no HUB.</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-[#121212] border border-gray-800 rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <Mail size={120} />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">Pronto para enviar?</h3>
            <p className="text-gray-400 mb-8">
              Clique abaixo. Seu aplicativo de e-mail será aberto automaticamente com a formatação correta.
            </p>

            <a 
              href={mailtoLink}
              className="inline-flex items-center justify-center gap-3 bg-secondary hover:bg-secondary/90 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(241,67,67,0.3)] hover:shadow-[0_0_30px_rgba(241,67,67,0.5)] active:scale-95"
            >
              <Mail size={20} />
              Abrir Aplicativo de E-mail
              <ArrowRight size={20} className="ml-2" />
            </a>

            <div className="mt-8 pt-6 border-t border-gray-800/50">
              <p className="text-xs text-gray-500 font-mono flex items-center gap-2">
                <LinkIcon size={12} />
                Destino: hubgreve@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
