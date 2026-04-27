"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";

interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  time?: string;
  status: "past" | "current" | "future";
}

const events: TimelineEvent[] = [
  // Past
  {
    date: "17 Abr",
    title: "Assembleia Geral IFUSP",
    description: "Greve aprovada e eleição do comando.",
    status: "past",
  },
  {
    date: "17 Abr",
    title: "Trancamento das Salas",
    description: "Início do piquete no IFUSP.",
    status: "past",
  },
  {
    date: "20-24 Abr",
    title: "Semana de Piquetes",
    description: "Mobilização e atividades internas.",
    status: "past",
  },
  {
    date: "24 Abr",
    title: "Comandos USP",
    description: "Reunião dos comandos de greve da USP.",
    status: "past",
  },
  {
    date: "24 Abr",
    title: "Direção IFUSP",
    description: "Reunião com a direção do instituto.",
    status: "past",
  },
  // Current (Monday)
  {
    date: "Hoje (Seg)",
    time: "08:00",
    title: "C.G. IFUSP",
    description: "Reunião do comando de greve IF.",
    status: "current",
  },
  {
    date: "Hoje (Seg)",
    time: "16:00",
    title: "Baixo Matão",
    description: "Reunião dos comandos do baixo matão.",
    status: "current",
  },
  // Future
  {
    date: "Terça",
    title: "Reunião Reitoria",
    description: "Comandos com o reitor.",
    status: "future",
  },
  {
    date: "Quarta",
    title: "Comandos Gerais",
    description: "Reunião dos comandos gerais.",
    status: "future",
  },
  {
    date: "Quinta",
    title: "Assembleia Geral",
    description: "Assembleia geral do IF.",
    status: "future",
  },
];

export function PicketStatus() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Scroll to the current event on mount
    const currentEvent = document.getElementById("event-current");
    if (currentEvent && scrollRef.current) {
      const scrollWidth = scrollRef.current.offsetWidth;
      const elementOffset = currentEvent.offsetLeft;
      const elementWidth = currentEvent.offsetWidth;
      
      scrollRef.current.scrollTo({
        left: elementOffset - scrollWidth / 2 + elementWidth / 2,
        behavior: "smooth"
      });
    }
  }, []);

  return (
    <div className="w-full mb-16 group/timeline">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white uppercase tracking-wider text-sm text-gray-500 flex items-center gap-2">
          <Clock className="text-primary" size={18} />
          Status da Greve
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={() => scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" })}
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 text-gray-400 hover:text-white transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={() => scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })}
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 text-gray-400 hover:text-white transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto pb-8 pt-4 no-scrollbar gap-4 relative"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {/* The Track Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-gray-800 via-primary/30 to-gray-800 -translate-y-1/2 z-0" />

        {events.map((event, idx) => {
          const isCurrent = event.status === "current";
          const isPast = event.status === "past";
          
          return (
            <div 
              key={idx}
              id={isCurrent ? "event-current" : undefined}
              className={cn(
                "relative flex-shrink-0 w-64 flex flex-col items-center z-10 scroll-snap-align-center",
                isCurrent ? "scale-110" : "scale-100 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all"
              )}
            >
              {/* Date Bubble */}
              <div className={cn(
                "mb-8 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all",
                isCurrent 
                  ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(15,102,136,0.5)]" 
                  : "bg-gray-900 text-gray-400 border-gray-700"
              )}>
                {event.date}
              </div>

              {/* Point on Timeline */}
              <div className={cn(
                "w-4 h-4 rounded-full border-2 mb-8 relative transition-all",
                isCurrent 
                  ? "bg-white border-primary shadow-[0_0_20px_rgba(15,102,136,0.8)] scale-125" 
                  : isPast 
                    ? "bg-gray-700 border-gray-600" 
                    : "bg-transparent border-gray-600"
              )}>
                {isCurrent && (
                  <div className="absolute inset-0 rounded-full animate-ping bg-primary/40" />
                )}
              </div>

              {/* Content Card */}
              <div className={cn(
                "p-4 rounded-xl border w-full text-center transition-all",
                isCurrent 
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border-primary/50 shadow-xl" 
                  : "bg-gray-900/40 border-gray-800/50"
              )}>
                {event.time && (
                  <span className="text-[10px] font-bold text-secondary mb-1 block">
                    {event.time}
                  </span>
                )}
                <h3 className={cn(
                  "font-bold text-sm mb-1 line-clamp-1",
                  isCurrent ? "text-white" : "text-gray-300"
                )}>
                  {event.title}
                </h3>
                <p className="text-[11px] text-gray-500 leading-tight line-clamp-2">
                  {event.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
