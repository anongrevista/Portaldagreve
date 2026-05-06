"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const FAQ_ITEMS: FAQItem[] = [];

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
