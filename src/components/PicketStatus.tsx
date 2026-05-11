"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";

interface TimelineEvent {
  dateObj?: Date;
  dateStr?: string;
  title: string;
  description?: string;
  time?: string;
}

const rawEvents: TimelineEvent[] = [
  {
    dateStr: "16 Abr",
    dateObj: new Date("2026-04-16T00:00:00"),
    title: "Assembleia Geral USP",
    description: "Greve aprovada na USP.",
  },
  {
    dateStr: "17 Abr",
    dateObj: new Date("2026-04-17T00:00:00"),
    title: "Assembleia Geral IFUSP",
    description: "Greve aprovada no IF.",
  },
  {
    dateStr: "20 Abr",
    dateObj: new Date("2026-04-20T00:00:00"),
    title: "Começo dos Piquetes",
    description: "Início dos piquetes no IF.",
  },
  {
    dateStr: "24 Abr",
    dateObj: new Date("2026-04-24T00:00:00"),
    title: "Comandos USP",
    description: "Reunião dos comandos de greve da USP.",
  },
  {
    dateStr: "24 Abr",
    dateObj: new Date("2026-04-24T00:00:00"),
    title: "Direção IF",
    description: "Reunião com a direção do IF (alunos, professores, funcionários e direção).",
  },
  {
    dateStr: "25 Abr",
    dateObj: new Date("2026-04-25T00:00:00"),
    title: "Fim da Greve Func.",
    description: "Fim da greve dos funcionários.",
  },
  {
    dateStr: "28 Abr",
    dateObj: new Date("2026-04-28T00:00:00"),
    title: "Reunião Reitor",
    description: "Reunião dos representantes eleitos pelos comandos com o reitor.",
  },
  {
    dateStr: "29 Abr",
    dateObj: new Date("2026-04-29T00:00:00"),
    title: "Assembleia Geral USP",
    description: "Continuidade da greve aprovada.",
  },
  {
    dateStr: "30 Abr",
    dateObj: new Date("2026-04-30T00:00:00"),
    title: "Nova Negociação",
    description: "Nova negociação com o reitor.",
  },
  {
    dateStr: "30 Abr",
    dateObj: new Date("2026-04-30T00:00:00"),
    title: "Assembleia Geral IFUSP",
    description: "Greve aprovada no IF.",
  },
  {
    dateStr: "04 Mai",
    dateObj: new Date("2026-05-04T00:00:00"),
    title: "Negociação Cotas",
    description: "Negociação sobre cotas trans e vestibular indígena.",
  },
  {
    dateStr: "04 Mai",
    dateObj: new Date("2026-05-04T00:00:00"),
    title: "Ato no CRUESP",
    description: "Ato em frente ao CRUESP - Reunião entre reitores das estaduais.",
  },
  {
    dateStr: "06 Mai",
    dateObj: new Date("2026-05-06T00:00:00"),
    time: "18:00",
    title: "Assembleia Geral USP",
    description: "Assembleia geral da USP.",
  },
  {
    dateStr: "07 Mai",
    dateObj: new Date("2026-05-07T00:00:00"),
    title: "Ocupação da Reitoria",
    description: "Estudantes ocupam o prédio da reitoria da USP.",
  },
  {
    dateStr: "07 Mai",
    dateObj: new Date("2026-05-07T00:00:00"),
    title: "Assembleia Geral",
    description: "Assembleia geral realizada na ocupação.",
  },
  {
    dateStr: "08 Mai",
    dateObj: new Date("2026-05-08T00:00:00"),
    title: "Assembleia Geral",
    description: "Assembleia geral de continuidade da greve.",
  },
];

export function PicketStatus() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const events = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const formatDayOfWeek = (date: Date) => {
      const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
      return days[date.getDay()];
    };

    return rawEvents.map((event) => {
      let status: "past" | "current" | "future" = "future";
      let displayDate = event.dateStr || "";

      if (event.dateObj) {
        const eventDate = new Date(event.dateObj);
        eventDate.setHours(0, 0, 0, 0);
        
        const diffTime = eventDate.getTime() - today.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
          status = "past";
        } else if (diffDays === 0) {
          status = "current";
          displayDate = `Hoje (${formatDayOfWeek(eventDate)})`;
        } else {
          status = "future";
          if (!event.dateStr) {
            const daysFull = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
            displayDate = diffDays === 1 ? `Amanhã (${formatDayOfWeek(eventDate)})` : daysFull[eventDate.getDay()];
          }
        }
        
        if (!displayDate && event.dateStr) {
          displayDate = event.dateStr;
        }
      } else {
        // Fallback for events without dateObj
        status = "past";
      }

      return {
        ...event,
        status,
        date: displayDate,
      };
    });
  }, []);

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
  }, [events]);

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
