"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Por que as universidades estaduais estão em crise financeira?",
    answer: (
      <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
        <p>
          Historicamente, o repasse de verba do Estado de São Paulo para as universidades estaduais (USP, UNICAMP e UNESP) era vinculado a uma parcela do <strong className="text-white">ICMS</strong> — o Imposto sobre Circulação de Mercadorias e Serviços. Esse mecanismo garantia que, à medida que a arrecadação crescia, as universidades também recebiam mais.
        </p>
        <p>
          Com a <strong className="text-white">Reforma Tributária aprovada em 2023</strong>, o ICMS será substituído gradualmente pelo <strong className="text-white">IBS (Imposto sobre Bens e Serviços)</strong> ao longo de vários anos. Isso coloca em xeque o modelo de repasse atual: se o ICMS deixa de existir, qual é a base de cálculo do repasse para as universidades?
        </p>
        <p>
          O problema é que, em vez de garantir um <strong className="text-white">novo mecanismo constitucional de repasse</strong> equivalente, a reitoria da USP e o governo estadual têm defendido que as universidades desenvolvam <strong className="text-white">capacidade de autofinanciamento</strong> — isto é, que a instituição busque receitas próprias por meio de parcerias com empresas privadas, prestação de serviços e outras fontes.
        </p>
        <div className="bg-red-950/40 border border-red-500/30 rounded-lg p-3 mt-2">
          <p className="text-red-300 font-semibold mb-1">⚠️ Por que isso é problemático?</p>
          <p className="text-red-200/80">
            O autofinanciamento <strong>subordina a agenda da pesquisa e do ensino aos interesses do mercado</strong>. Uma universidade que depende de contratos privados tende a priorizar áreas de interesse empresarial em detrimento de ciências humanas, artes, pesquisa básica e qualquer área que não gere lucro imediato — comprometendo sua função pública e democrática.
          </p>
        </div>
        <p>
          A greve exige que o Estado garanta, por lei, a <strong className="text-white">manutenção do repasse em patamar equivalente</strong> ao atual durante e após a transição tributária, sem abrir mão do financiamento público das universidades.
        </p>
      </div>
    ),
  },
  {
    question: "O que são as cotas trans e indígenas e por que a greve as defende?",
    answer: (
      <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
        <p>
          As <strong className="text-white">cotas para pessoas trans e indígenas</strong> são políticas de ação afirmativa que reservam vagas específicas no vestibular para esses grupos historicamente excluídos do ensino superior. A pauta está entre as reivindicações da greve porque a USP <strong className="text-white">ainda não adotou essas cotas</strong>, ficando atrás de outras instituições do país.
        </p>

        <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
          <p className="text-primary font-semibold mb-2">📍 Onde já existem?</p>
          <ul className="space-y-1 text-gray-300">
            <li>• <strong className="text-white">UNICAMP</strong> — possui cotas para indígenas desde 2018 e ampliou as políticas de inclusão nos últimos anos.</li>
            <li>• <strong className="text-white">UFMG, UFRGS, UFBA e outras federais</strong> — implementaram cotas trans após resolução do MEC e debates internos.</li>
            <li>• <strong className="text-white">UNESP</strong> — avança em políticas de inclusão para populações originárias.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-white">Por que são necessárias?</p>
          <p>
            <strong className="text-white">Povos indígenas:</strong> enfrentam barreiras estruturais enormes de acesso — desde a distância geográfica até a diferença entre o currículo escolar indígena e o exigido no vestibular. Sem políticas específicas, sua presença nas universidades públicas permanece residual.
          </p>
          <p>
            <strong className="text-white">Pessoas trans:</strong> sofrem altíssimas taxas de evasão escolar antes mesmo do ensino superior, fruto de violência, exclusão familiar e falta de suporte institucional. Reservar vagas é uma forma de reconhecer essa trajetória de exclusão e criar condições reais de acesso.
          </p>
        </div>

        <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3">
          <p className="text-secondary font-semibold mb-1">💬 Argumento comum e resposta</p>
          <p className="text-gray-300">
            <em>"Cotas reduzem o mérito acadêmico."</em> — Pesquisas do próprio NUPES/USP e de outras instituições mostram que <strong className="text-white">cotistas têm desempenho equivalente ou superior</strong> aos não-cotistas ao longo da graduação. O que as cotas corrigem é a desigualdade de <em>oportunidade</em> de acesso, não de capacidade.
          </p>
        </div>
      </div>
    ),
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="mb-16">
      <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider text-sm text-gray-500 flex items-center gap-2">
        <HelpCircle size={18} className="text-primary" />
        Perguntas Frequentes
      </h2>

      <div className="flex flex-col gap-3">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={cn(
                "rounded-xl border transition-all duration-300 overflow-hidden",
                isOpen
                  ? "border-primary/50 bg-gradient-to-br from-gray-900 to-[#0f1623]"
                  : "border-gray-800 bg-[#121212]/50 hover:border-gray-700"
              )}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className={cn(
                  "font-semibold text-sm sm:text-base transition-colors leading-snug",
                  isOpen ? "text-primary" : "text-gray-200"
                )}>
                  {item.question}
                </span>
                <ChevronDown
                  size={20}
                  className={cn(
                    "shrink-0 text-gray-400 transition-transform duration-300",
                    isOpen ? "rotate-180 text-primary" : ""
                  )}
                />
              </button>

              <div
                className={cn(
                  "transition-all duration-300 ease-in-out",
                  isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="px-5 pb-5 border-t border-gray-800/60 pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
