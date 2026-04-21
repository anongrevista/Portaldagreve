---
trigger: always_on
---

# REGRAS DE ENGENHARIA PARA O PROJETO

1.  **TypeScript Rigoroso:** Proibido o uso de `any`. Use tipos literais, interfaces e Zod para validação.
2.  **Next.js App Router:** * Por padrão, todos os componentes devem ser Server Components. 
    * Use a diretiva `"use client"` estritamente onde houver interatividade (hooks, onClick, JSZip).
3.  **Supabase:** Todas as chamadas de banco de dados devem usar o cliente oficial `@supabase/ssr` adequado (Client ou Server) e Server Actions para mutações.
4.  **Estilização:** Use Tailwind CSS. Para união de classes dinâmicas, utilize o utilitário `cn()` (clsx + tailwind-merge) padrão do Shadcn UI.
5.  **Execução Cautelosa:** Escreva código de forma modular. Não altere múltiplos arquivos complexos simultaneamente. Sempre revise o código gerado em busca de ambiguidades lógicas antes de me apresentar a solução final.