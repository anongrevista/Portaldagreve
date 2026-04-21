"use client";

import { cn } from "@/lib/utils";

const tocItems = [
  { id: "1", label: "1. Contexto Geral", isActive: false },
  { id: "2", label: "2. Ações Prioritárias", isActive: true },
  { id: "3", label: "3. Cronograma", isActive: false },
  { id: "4", label: "4. Ações de Proprarias", isActive: false },
  { id: "5", label: "5. Evadiluação", isActive: false },
  { id: "6", label: "6. Connectivo", isActive: false },
  { id: "7", label: "7. Rencelos", isActive: false },
];

export function TableOfContents() {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0 pl-6 border-l border-gray-800/50 py-8">
      <h3 className="text-xs font-semibold text-gray-400 mb-6 tracking-wider uppercase">Conteúdo do Documento</h3>
      <nav className="flex flex-col gap-1">
        {tocItems.map((item) => (
          <div key={item.id} className="relative">
            {item.isActive && (
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-secondary rounded-r" />
            )}
            <a
              href={`#section-${item.id}`}
              className={cn(
                "block py-2 px-4 text-sm rounded-r-md transition-colors",
                item.isActive 
                  ? "bg-primary/20 text-blue-400 font-medium" 
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/30"
              )}
            >
              {item.label}
            </a>
          </div>
        ))}
      </nav>
    </aside>
  );
}
