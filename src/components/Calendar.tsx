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
  // SEGUNDA-FEIRA (04/05)
  { date: "2026-05-04", title: "Monitoria: Mec. ríg e fluídos (Nora)", time: "10:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-04", title: "Monitoria: Física Experimental 3 (Nelson Carlin)", time: "10:00", location: "H.S.", category: "Monitoria", priority: "medium" },
  { date: "2026-05-04", title: "Monitoria: Teoria Espectral (Ricardo Correa)", time: "10:00", location: "Vão da Biblioteca", category: "Monitoria", priority: "medium" },
  { date: "2026-05-04", title: "Monitoria: Física 1", time: "13:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-04", title: "Monitoria: Cálculo 1 - Bac", time: "13:00", location: "H.S.", category: "Monitoria", priority: "medium" },
  { date: "2026-05-04", title: "Monitoria: Física Experimental 3 (Nelson Carlin)", time: "15:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-04", title: "Monitoria: Termodinâmica (Salinas)", time: "15:00", location: "H.S.", category: "Monitoria", priority: "medium" },
  { date: "2026-05-04", title: "Monitoria: Vetores/Geometria (Grishkove)", time: "19:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-04", title: "Monitoria: Mec. ríg e fluídos (Nora)", time: "19:00", location: "H.S.", category: "Monitoria", priority: "medium" },

  // TERÇA-FEIRA (05/05)
  { date: "2026-05-05", title: "Monitoria: Quantica II da Pós", time: "10:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-05", title: "Monitoria: Algebra linear e vetores", time: "10:00", location: "H.S.", category: "Monitoria", priority: "medium" },
  { date: "2026-05-05", title: "Monitoria: Física IV (Élcio Abdalla)", time: "13:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-05", title: "Monitoria: Ótica - Anne", time: "13:00", location: "H.S.", category: "Monitoria", priority: "medium" },
  { date: "2026-05-05", title: "Monitoria: Física para farmácia", time: "15:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-05", title: "Monitoria: Fundamentos de Mecânica", time: "15:00", location: "H.S.", category: "Monitoria", priority: "medium" },
  { date: "2026-05-05", title: "Monitoria: Física 1", time: "19:00", location: "Vivência", category: "Monitoria", priority: "medium" },

  // QUARTA-FEIRA (06/05)
  { date: "2026-05-06", title: "Monitoria: Teoria Espectral (Ricardo Correa)", time: "10:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-06", title: "Monitoria: Vetores e geometria", time: "10:00", location: "H.S.", category: "Monitoria", priority: "medium" },
  { date: "2026-05-06", title: "Monitoria: Física Quântica (Canuto)", time: "13:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-06", title: "Monitoria: Mec. ríg e fluídos (Medina)", time: "13:00", location: "H.S.", category: "Monitoria", priority: "medium" },
  { date: "2026-05-06", title: "Monitoria: Física I", time: "15:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-06", title: "Monitoria: Física Experimental 3 (Nelson Carlin)", time: "15:00", location: "H.S.", category: "Monitoria", priority: "medium" },
  { date: "2026-05-06", title: "Monitoria: Termodinâmica (Salinas)", time: "15:00", location: "Vão da Biblioteca", category: "Monitoria", priority: "medium" },
  { date: "2026-05-06", title: "Monitoria: Vetores/Geometria (Grishkove)", time: "19:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-06", title: "Monitoria: Cálculo 1 - bac", time: "19:00", location: "H.S.", category: "Monitoria", priority: "medium" },

  // QUINTA-FEIRA (07/05)
  { date: "2026-05-07", title: "Monitoria: Quantica II da Pos", time: "10:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-07", title: "Monitoria: Física 1 Renato Higa", time: "10:00", location: "H.S.", category: "Monitoria", priority: "medium" },
  { date: "2026-05-07", title: "Monitoria: Física Experimental III (Nelson)", time: "13:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-07", title: "Monitoria: Física I / Renato Higa", time: "13:00", location: "H.S.", category: "Monitoria", priority: "medium" },
  { date: "2026-05-07", title: "Monitoria: Laboratório de Mecânica", time: "15:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-07", title: "Monitoria: Física Quântica (Canuto)", time: "15:00", location: "H.S.", category: "Monitoria", priority: "medium" },
  { date: "2026-05-07", title: "Monitoria: Termodinâmica (Salinas)", time: "19:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-07", title: "Monitoria: Intro à Mec Quânt Ondu (Munhoz)", time: "19:00", location: "H.S.", category: "Monitoria", priority: "medium" },
  { date: "2026-05-07", title: "Karaoquinta com churrasquinho", time: "18:00", location: "IFUSP", category: "Mobilização", priority: "medium" },

  // SEXTA-FEIRA (08/05)
  { date: "2026-05-08", title: "Monitoria: Física Experimental III - Nelson", time: "10:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-08", title: "Monitoria: Física Quântica (Canuto)", time: "13:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-08", title: "Monitoria: Mec. ríg e fluídos (Medina)", time: "13:00", location: "H.S.", category: "Monitoria", priority: "medium" },
  { date: "2026-05-08", title: "Monitoria: Integração de conceitos e Física 1", time: "15:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-08", title: "Monitoria: Mec. ríg e fluídos (Nora)", time: "15:00", location: "H.S.", category: "Monitoria", priority: "medium" },
  { date: "2026-05-08", title: "Monitoria: Mecânica quântica 2 (Oscar Éboli)", time: "19:00", location: "Vivência", category: "Monitoria", priority: "medium" },
  { date: "2026-05-08", title: "Assembleia Geral do IFUSP (Pauta: Continuidade da greve)", time: "14:00", location: "IFUSP", category: "Assembleia", priority: "high" },
  { date: "2026-05-08", title: "Sexta do Rock", time: "18:00", location: "IFUSP", category: "Mobilização", priority: "medium" },
  { date: "2026-05-08", title: "Assembleia Geral do IFUSP (Pauta: Continuidade da greve)", time: "18:00", location: "IFUSP", category: "Assembleia", priority: "high" },
];

import { useEffect, useState } from "react";

export function Calendar({ limit, type = 'atividades' }: { limit?: number, type?: 'atividades' | 'monitorias' }) {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    setIsMounted(true);
    const now = new Date();
    // Use midnight of current day to include events that happened earlier today in the day view
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const processed = EVENTS.map(event => {
      const [year, month, day] = event.date.split('-').map(Number);
      const [hour, minute] = event.time.split(':').map(Number);
      const eventDate = new Date(year, month - 1, day, hour, minute);
      return { ...event, eventDate };
    })
    .filter(event => {
      const isMonitoria = event.category === 'Monitoria' || event.category === 'Acadêmico';
      return type === 'monitorias' ? isMonitoria : !isMonitoria;
    })
    .filter(event => {
      // In the dashboard (with limit), only show truly upcoming events
      if (limit) return event.eventDate >= now;
      // In the full calendar, show today onwards
      return event.eventDate >= todayMidnight;
    })
    .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());

    setAllEvents(processed);
    
    // Set default selected date to the first available day
    if (processed.length > 0 && !selectedDate) {
      setSelectedDate(processed[0].date);
    }
  }, [type, limit]);

  if (!isMounted) return <div className="animate-pulse h-48 bg-gray-900/50 rounded-2xl" />;

  if (allEvents.length === 0) {
    return (
      <div className="p-6 sm:p-8 border border-dashed border-gray-800 rounded-2xl bg-gray-900/30 text-center">
        <p className="text-gray-500 text-sm italic">
          Não há {type} programadas para os próximos dias.
        </p>
      </div>
    );
  }

  // Group events for the tabs
  const uniqueDates = Array.from(new Set(allEvents.map(e => e.date))).sort();
  const currentEvents = allEvents.filter(e => limit ? true : e.date === selectedDate).slice(0, limit || 999);

  const getDayName = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) return "Hoje";
    
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) return "Amanhã";

    return date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' }).replace('.', '');
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Day Selector (only in full view) */}
      {!limit && uniqueDates.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-2 p-1 bg-gray-900/50 rounded-2xl border border-gray-800 w-fit">
          {uniqueDates.map(date => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                selectedDate === date 
                  ? "bg-secondary text-white shadow-lg shadow-secondary/20" 
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
              )}
            >
              {getDayName(date)}
            </button>
          ))}
        </div>
      )}

      {currentEvents.length > 0 ? (
        <div className="flex flex-col gap-6">
          {/* Header for Day in Full View */}
          {!limit && (
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">
                {new Date(selectedDate! + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
              <div className="flex-1 h-px bg-gray-800/50"></div>
            </div>
          )}

          {/* Featured First Event (only if it's truly next) */}
          {limit && (
            <div>
              <h3 className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Próxima {type === 'monitorias' ? 'Monitoria' : 'Atividade'}
              </h3>
              <FeaturedEventCard event={currentEvents[0]} />
            </div>
          )}

          {/* List of Events */}
          <div className="space-y-4">
            {limit && currentEvents.length > 1 && (
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Seguintes</h3>
            )}
            
            <div className="grid grid-cols-1 gap-4">
              {(limit ? currentEvents.slice(1) : currentEvents).map((event, idx) => (
                <EventRow key={idx} event={event} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center border border-dashed border-gray-800 rounded-3xl">
          <p className="text-gray-500 text-sm italic text-balance">Nenhum evento encontrado para este dia.</p>
        </div>
      )}
    </div>
  );
}

function FeaturedEventCard({ event }: { event: CalendarEvent }) {
  return (
    <div className="group relative bg-gradient-to-br from-secondary/20 to-primary/10 border border-secondary/30 rounded-3xl p-6 sm:p-8 transition-all hover:shadow-[0_0_40px_rgba(15,102,136,0.2)] overflow-hidden">
      <div className={cn(
        "absolute top-0 left-0 w-2 h-full",
        event.priority === 'high' ? "bg-red-500" : "bg-secondary"
      )} />
      
      <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start relative z-10">
        <div className="flex flex-col items-center justify-center min-w-[100px] p-5 rounded-2xl bg-gray-900/80 border border-white/5 text-center shadow-2xl">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">
            {event.eventDate.toLocaleDateString('pt-BR', { month: 'short' })}
          </span>
          <span className="text-5xl font-black text-white">
            {event.eventDate.getDate()}
          </span>
          <span className="text-xs font-bold text-gray-500 mt-2 uppercase tracking-tighter">
            {event.time}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-secondary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
              {event.category}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 leading-tight break-words">
            {event.title}
          </h2>
          
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="p-2 rounded-lg bg-white/5">
                <Clock size={18} className="text-secondary" />
              </div>
              <span>Inicia às <strong>{event.time}</strong></span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="p-2 rounded-lg bg-white/5">
                <MapPin size={18} className="text-secondary" />
              </div>
              <span>Local: <strong>{event.location}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventRow({ event }: { event: CalendarEvent }) {
  return (
    <div className="group relative bg-[#121212] border border-gray-800/50 hover:border-gray-700 rounded-2xl p-5 transition-all hover:bg-gray-800/20">
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
  );
}
