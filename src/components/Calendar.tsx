"use client";

import { Calendar as CalendarIcon, Clock, MapPin, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventData {
  date: string;
  title: string;
  time: string;
  location: string;
  category: string;
  priority: string;
}

interface CalendarEvent extends EventData {
  eventDate: Date;
}


export const EVENTS = [
  {
    date: "2026-04-27",
    title: "Café da Manhã",
    time: "07:00",
    location: "IFUSP",
    category: "Mobilização",
    priority: "low"
  },
  {
    date: "2026-04-27",
    title: "Reunião do Comando da Física",
    time: "08:00",
    location: "IFUSP",
    category: "Reunião",
    priority: "high"
  },
  {
    date: "2026-04-27",
    title: "Grupos de Estudos",
    time: "08:00",
    location: "IFUSP",
    category: "Acadêmico",
    priority: "medium"
  },
  {
    date: "2026-04-27",
    title: "Plenária: Plano Diretor IFUSP",
    time: "10:00",
    location: "IFUSP",
    category: "Assembleia",
    priority: "high"
  },
  {
    date: "2026-04-27",
    title: "\"Almoço\" - Bandejão da Física",
    time: "12:00",
    location: "Bandejão da Física",
    category: "Mobilização",
    priority: "low"
  },
  {
    date: "2026-04-27",
    title: "Reunião do Comando da Física",
    time: "14:00",
    location: "IFUSP",
    category: "Reunião",
    priority: "high"
  },
  {
    date: "2026-04-27",
    title: "Grupos de Estudos",
    time: "14:00",
    location: "IFUSP",
    category: "Acadêmico",
    priority: "medium"
  },
  {
    date: "2026-04-27",
    title: "Grupos de Estudos",
    time: "16:00",
    location: "IFUSP",
    category: "Acadêmico",
    priority: "medium"
  },
  {
    date: "2026-04-27",
    title: "Reunião do Comando do Baixo-Matão",
    time: "16:00",
    location: "Baixo-Matão",
    category: "Reunião",
    priority: "high"
  },
  {
    date: "2026-04-27",
    title: "\"Janta\" - Bandejão da Física",
    time: "18:00",
    location: "Bandejão da Física",
    category: "Mobilização",
    priority: "low"
  },
  {
    date: "2026-04-27",
    title: "Plenária: Plano Diretor IFUSP",
    time: "19:00",
    location: "IFUSP",
    category: "Assembleia",
    priority: "high"
  },
  {
    date: "2026-04-27",
    title: "Cine-Greve: Agente Secreto",
    time: "21:00",
    location: "IFUSP",
    category: "Cultura",
    priority: "medium"
  }
];

import { useEffect, useState } from "react";

export function Calendar({ limit }: { limit?: number }) {
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const now = new Date();
    
    // Convert current events to comparable dates and filter
    const upcoming = EVENTS.map(event => {
      // Assuming date is YYYY-MM-DD and time is HH:mm
      const [year, month, day] = event.date.split('-').map(Number);
      const [hour, minute] = event.time.split(':').map(Number);
      const eventDate = new Date(year, month - 1, day, hour, minute);
      return { ...event, eventDate };
    })
    .filter(event => event.eventDate >= now)
    .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());

    setUpcomingEvents(upcoming.slice(0, limit || 3));
  }, [limit]);

  if (!isMounted) return <div className="animate-pulse h-48 bg-gray-900/50 rounded-2xl" />;

  if (upcomingEvents.length === 0) {
    return (
      <div className="p-8 border border-dashed border-gray-800 rounded-2xl bg-gray-900/30 text-center">
        <p className="text-gray-500 text-sm italic">
          Não há atividades programadas para as próximas horas.
        </p>
      </div>
    );
  }

  const nextActivity = upcomingEvents[0];
  const followingActivities = upcomingEvents.slice(1);

  return (
    <div className="flex flex-col gap-8">
      {/* Próxima Atividade */}
      <div>
        <h3 className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          Próxima Atividade
        </h3>
        
        <div className="group relative bg-gradient-to-br from-secondary/20 to-primary/10 border border-secondary/30 rounded-3xl p-8 transition-all hover:shadow-[0_0_40px_rgba(15,102,136,0.2)] overflow-hidden">
          <div className={cn(
            "absolute top-0 left-0 w-2 h-full",
            nextActivity.priority === 'high' ? "bg-red-500" : "bg-secondary"
          )} />
          
          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            <div className="flex flex-col items-center justify-center min-w-[100px] p-5 rounded-2xl bg-gray-900/80 border border-white/5 text-center shadow-2xl">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">
                {nextActivity.eventDate.toLocaleDateString('pt-BR', { month: 'short' })}
              </span>
              <span className="text-5xl font-black text-white">
                {nextActivity.eventDate.getDate()}
              </span>
              <span className="text-xs font-bold text-gray-500 mt-2 uppercase tracking-tighter">
                {nextActivity.time}
              </span>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-secondary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                  {nextActivity.category}
                </span>
              </div>
              <h2 className="text-3xl font-black text-white mb-6 leading-tight">
                {nextActivity.title}
              </h2>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="p-2 rounded-lg bg-white/5">
                    <Clock size={18} className="text-secondary" />
                  </div>
                  <span>Inicia às <strong>{nextActivity.time}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="p-2 rounded-lg bg-white/5">
                    <MapPin size={18} className="text-secondary" />
                  </div>
                  <span>Local: <strong>{nextActivity.location}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seguintes */}
      {followingActivities.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">
            Seguintes
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {followingActivities.map((event, idx) => (
              <div 
                key={idx}
                className="group relative bg-[#121212] border border-gray-800/50 hover:border-gray-700 rounded-2xl p-5 transition-all hover:bg-gray-800/20"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-5">
                    <div className="flex flex-col items-center justify-center min-w-[50px] py-2 px-3 rounded-xl bg-gray-900 border border-gray-800 text-center">
                      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">
                        {event.eventDate.getDate()} {event.eventDate.toLocaleDateString('pt-BR', { month: 'short' })}
                      </span>
                      <span className="text-lg font-black text-white leading-none mt-1">
                        {event.time}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-200 group-hover:text-white transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{event.location}</p>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-600 border border-gray-800 px-2 py-1 rounded">
                      {event.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
