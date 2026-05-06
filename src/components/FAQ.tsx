"use client";

import { useState, useEffect } from "react";
import { ChevronDown, HelpCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import JSZip from 'jszip';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await fetch("/Documentos PG (Portal da greve)/FAQ - Perguntas frequentes.zip");
        const arrayBuffer = await res.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);
        
        const htmlFile = Object.values(zip.files).find(f => f.name.endsWith('.html'));
        if (!htmlFile) {
          setIsLoading(false);
          return;
        }

        const htmlContent = await htmlFile.async('text');
        
        // Parse the HTML using DOMParser
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");
        
        // The Google Docs structure observed:
        // <ol> <li> <span>Question</span> </li> </ol>
        // <p> <span>Answer</span> </p>
        
        const items: FAQItem[] = [];
        // Get all list items (usually ol > li)
        const questions = doc.querySelectorAll('li');
        
        questions.forEach((qNode) => {
          const questionText = qNode.textContent?.trim();
          if (!questionText) return;

          // Find the answer: in Google Docs, the <p> usually follows the <ol> that contains the <li>
          // Since this is a simple doc, we can look for the next sibling of the parent <ol>
          let answerNode = qNode.closest('ol')?.nextElementSibling;
          
          let answerHtml = '';
          // Collect all <p> elements until the next <ol> (which would be the next question)
          while (answerNode && answerNode.tagName.toLowerCase() !== 'ol' && answerNode.tagName.toLowerCase() !== 'h1' && answerNode.tagName.toLowerCase() !== 'h2') {
            answerHtml += answerNode.outerHTML;
            answerNode = answerNode.nextElementSibling;
          }

          if (answerHtml) {
            items.push({
              question: questionText,
              answer: <div dangerouslySetInnerHTML={{ __html: answerHtml }} />
            });
          }
        });

        setFaqItems(items);
      } catch (error) {
        console.error("Failed to parse FAQ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaq();
  }, []);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="mb-16">
      <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider text-sm text-gray-500 flex items-center gap-2">
        <HelpCircle size={18} className="text-primary" />
        Perguntas Frequentes
      </h2>

      {isLoading ? (
        <div className="flex items-center justify-center p-8 border border-dashed border-gray-800 rounded-xl">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : faqItems.length === 0 ? (
        <div className="p-8 border border-dashed border-gray-800 rounded-xl text-center text-gray-500 text-sm">
          Nenhuma pergunta frequente disponível no momento.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {faqItems.map((item, idx) => {
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
                  <div className="px-5 pb-5 border-t border-gray-800/60 pt-4 prose prose-invert max-w-none text-sm text-gray-300">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
