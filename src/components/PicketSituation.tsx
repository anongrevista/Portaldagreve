"use client";

import React from "react";
import { ShieldCheck, Ban, GraduationCap, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function PicketSituation() {
  return (
    <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
          <Info size={18} />
        </div>
        <h2 className="text-xl font-bold text-white uppercase tracking-wider text-sm text-gray-500">
          Situação Atual do Piquete
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Card: Piquete Ativo */}
        <div className="group relative p-6 rounded-2xl bg-[#121212] border border-gray-800 hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(15,102,136,0.1)]">
          <div className="absolute top-4 right-4 flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Ativo</span>
          </div>
          
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 border border-primary/20 group-hover:scale-110 transition-transform">
            <ShieldCheck size={24} />
          </div>
          
          <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight">Piquete no IFUSP</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            A mobilização segue firme. O comando de greve está presente garantindo a segurança e a organização do espaço.
          </p>
        </div>

        {/* Status Card: Aulas Bloqueadas */}
        <div className="group relative p-6 rounded-2xl bg-[#121212] border border-gray-800 hover:border-secondary/50 transition-all hover:shadow-[0_0_30px_rgba(241,67,67,0.1)]">
          <div className="absolute top-4 right-4">
            <span className="px-2 py-0.5 rounded-full bg-secondary/10 border border-secondary/20 text-[10px] font-black text-secondary uppercase tracking-widest">Suspensas</span>
          </div>
          
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4 border border-secondary/20 group-hover:scale-110 transition-transform">
            <Ban size={24} />
          </div>
          
          <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight">Aulas e Provas</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Nenhuma aula ou atividade letiva está sendo realizada. O piquete bloqueia o acesso às salas para manter a paralisação.
          </p>
        </div>

        {/* Status Card: Atividades Liberadas */}
        <div className="group relative p-6 rounded-2xl bg-[#121212] border border-gray-800 hover:border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
          <div className="absolute top-4 right-4">
            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest">Liberado</span>
          </div>
          
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/20 group-hover:scale-110 transition-transform">
            <GraduationCap size={24} />
          </div>
          
          <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight">Estudos e Pesquisa</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Monitorias, grupos de estudo e pesquisas estão <strong>liberados</strong>. Cole no IF para estudar e participar das atividades!
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 rounded-xl bg-gray-900/40 border border-gray-800/50 flex items-start gap-3">
        <Info size={16} className="text-gray-500 shrink-0 mt-0.5" />
        <p className="text-xs text-gray-500 leading-relaxed">
          A Central da Greve recomenda que você utilize os espaços comuns para estudos coletivos e mantenha-se informado sobre as decisões das assembleias para saber quando as atividades serão retomadas.
        </p>
      </div>
    </section>
  );
}
