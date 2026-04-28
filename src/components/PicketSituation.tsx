"use client";

import React from "react";
import { ShieldCheck, Ban, GraduationCap, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function PicketSituation() {
  return (
    <section className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center text-secondary border border-secondary/30 shadow-[0_0_15px_rgba(241,67,67,0.2)]">
          <Info size={20} />
        </div>
        <h2 className="text-2xl font-black text-white uppercase tracking-widest flex items-center gap-3">
          Situação Atual do Piquete
          <span className="h-px bg-gradient-to-r from-secondary/50 to-transparent flex-1 w-32 md:w-64"></span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Card: Piquete Ativo */}
        <div className="group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1a1c23] to-[#121212] border border-primary/20 hover:border-primary/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(15,102,136,0.2)] overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
          
          <div className="absolute top-6 right-6 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary shadow-[0_0_10px_rgba(15,102,136,1)]"></span>
            </span>
            <span className="text-xs font-black text-primary uppercase tracking-widest drop-shadow-md">Ativo</span>
          </div>
          
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mb-6 border border-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_0_20px_rgba(15,102,136,0.15)] relative z-10">
            <ShieldCheck size={32} />
          </div>
          
          <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight relative z-10">Piquete no IFUSP</h3>
          <p className="text-sm text-gray-300 leading-relaxed relative z-10">
            A mobilização segue firme. O comando de greve está presente garantindo a segurança e a organização do espaço.
          </p>
        </div>

        {/* Status Card: Aulas Bloqueadas */}
        <div className="group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#231a1a] to-[#121212] border border-secondary/20 hover:border-secondary/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(241,67,67,0.2)] overflow-hidden">
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-500"></div>
          
          <div className="absolute top-6 right-6">
            <span className="px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-xs font-black text-secondary uppercase tracking-widest drop-shadow-md shadow-[0_0_15px_rgba(241,67,67,0.2)]">Suspensas</span>
          </div>
          
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center text-secondary mb-6 border border-secondary/30 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-[0_0_20px_rgba(241,67,67,0.15)] relative z-10">
            <Ban size={32} />
          </div>
          
          <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight relative z-10">Aulas e Provas</h3>
          <p className="text-sm text-gray-300 leading-relaxed relative z-10">
            Nenhuma aula ou atividade letiva está sendo realizada. O piquete bloqueia o acesso às salas para manter a paralisação.
          </p>
        </div>

        {/* Status Card: Atividades Liberadas */}
        <div className="group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1a202c] to-[#121212] border border-blue-500/20 hover:border-blue-500/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.2)] overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
          
          <div className="absolute top-6 right-6">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-xs font-black text-blue-400 uppercase tracking-widest drop-shadow-md shadow-[0_0_15px_rgba(59,130,246,0.2)]">Liberado</span>
          </div>
          
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center text-blue-400 mb-6 border border-blue-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.15)] relative z-10">
            <GraduationCap size={32} />
          </div>
          
          <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight relative z-10">Estudos e Pesquisa</h3>
          <p className="text-sm text-gray-300 leading-relaxed relative z-10">
            Monitorias, grupos de estudo e pesquisas estão <strong className="text-blue-400">liberados</strong>. Cole no IF para estudar e participar das atividades!
          </p>
        </div>
      </div>

      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-gray-900/60 to-gray-800/40 border border-gray-700/50 flex items-start gap-4 shadow-lg backdrop-blur-sm">
        <div className="p-2 rounded-full bg-gray-800/80 border border-gray-700 shrink-0">
          <Info size={20} className="text-gray-400" />
        </div>
        <p className="text-sm text-gray-400 leading-relaxed pt-0.5">
          A <strong className="text-gray-300">Central da Greve</strong> recomenda que você utilize os espaços comuns para estudos coletivos e mantenha-se informado sobre as decisões das assembleias para saber quando as atividades serão retomadas.
        </p>
      </div>
    </section>
  );
}
