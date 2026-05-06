# Implementação Técnica: Página de Apresentação (Docs to Web)

Este documento descreve a engenharia por trás da transformação de documentos institucionais (exportados como HTML) em páginas interativas de alta performance no HUB LabDiv. E essa engenharia deve ser implementada agora no PG (Portal da greve)  e depois ser usada para todos os outros documentos.   
---

## 1. Visão Geral do Fluxo
O objetivo desta feature é converter um documento linear (Google Docs/Word) em uma experiência rica que respeite a Identidade Visual (IDV) do laboratório, oferecendo navegação contextual e legibilidade superior.

### Arquitetura de Dados
Em vez de injetar HTML bruto (`dangerouslySetInnerHTML`), o conteúdo é convertido em um modelo de dados estruturado em TypeScript. Isso garante:
- **Performance:** Sem parsing de strings pesadas no cliente.
- **Segurança:** Proteção contra ataques XSS.
- **Estilização:** Controle total sobre cada elemento via Tailwind CSS.

---

## 2. Estrutura de Dados ([`apresentacaoData.ts`](file:///home/stangorlini/HUB-LabDiv/src/data/apresentacaoData.ts))
O esquema de dados divide o documento em blocos semânticos:

```typescript
export const apresentacaoData = {
  title: "Título do Documento",
  subtitle: "Subtítulo",
  sections: [
    {
      id: "introducao",
      title: "1. Introdução",
      paragraphs: ["Texto do parágrafo 1...", "Texto do parágrafo 2..."],
      content: [
        { subtitle: "Subtópico A", text: "Descrição detalhada..." }
      ]
    }
  ]
};
```

---

## 3. Componentes de UI ([`ApresentacaoClient.tsx`](file:///home/stangorlini/HUB-LabDiv/src/app/apresentacao/ApresentacaoClient.tsx))

### A. Sistema de Navegação (Scroll Spy)
Utiliza a **Intersection Observer API** para rastrear a leitura do usuário e destacar o sumário lateral em tempo real.

- **Ação:** Monitora quando uma `section` entra no viewport.
- **Feedback:** Aplica classes de destaque (`text-brand-yellow`, `translate-x-2`) no item correspondente do sumário.

### B. Sumário de Dupla Entrada
O documento oferece duas formas de navegação:
1.  **Grid de Acesso Rápido:** No início do documento, um grid visual permite pular para capítulos específicos.
2.  **Sidebar Sticky:** Uma barra lateral persistente que acompanha a rolagem.

### C. Design Editorial e Ritmo Visual
- **Temas Alternados:** Um mapa de cores (`themeMap`) alterna as cores de marca (Azul LabDiv, Amarelo LabDiv, Vermelho LabDiv) entre as seções para evitar monotonia.
- **Glassmorphism:** Subtópicos utilizam a classe `.glass-card`, proporcionando profundidade e contraste em telas Dark Mode.

---

## 4. Diretrizes para Implementação (Dev Guide)

Para um desenvolvedor replicar esta funcionalidade em um novo documento:

### Passo 1: Extração e Limpeza
Não utilize o HTML exportado diretamente. Extraia os textos e organize-os no esquema de seções definido acima.

### Passo 2: Configuração do Observer
Implemente o hook `useEffect` com o observer para garantir que o sumário reflita a posição real do usuário. Use um `rootMargin` adequado (ex: `-20% 0px -80% 0px`) para acionar a troca de seção no momento certo.

### Passo 3: Tipografia de Destaque
Respeite as fontes definidas no sistema:
- **Títulos:** `font-bukra` (ou fallback `Outfit`), Bold, Italic e UpperCase.
- **Corpo:** `font-open-sans`, com espaçamento entre linhas generoso (`leading-relaxed`).

### Passo 4: Responsividade Mobile
Em telas menores (< 768px), oculte a sidebar e garanta que o conteúdo ocupe a largura total, mantendo margens confortáveis.

---

Em resumo, 
1. Prepare o Conteúdo:

- Exporte seu documento como HTML.
- Transforme a estrutura em um arquivo .ts (JSON), separando por sections, cada uma com um id, title, paragraphs (texto corrido) e content (lista de itens com subtítulo).            

2. Crie a Estrutura de Layout:

- Use um container principal com uma largura máxima (ex: max-w-4xl) para que o texto não fique muito largo e cansativo de ler.
- Implemente um Header/Hero impactante com o título principal e uma introdução destacada.  

3. Implemente o Sumário Lateral:

- Crie um componente lateral (aside) que receba a lista de IDs e nomes das seções.
- Adicione a lógica de scrollToSection usando window.scrollTo({ behavior: 'smooth' }).

4. Adicione Interatividade:

  - Configure o IntersectionObserver para atualizar o estado da "seção ativa".
  - Adicione animações de entrada (como animate-in fade-in slide-in-from-bottom) para que o conteúdo apareça suavemente conforme o scroll.
5. Refine a Estética:

- Grades: Se uma seção tiver muitos tópicos curtos, use grid-cols-1 md:grid-cols-2.
- Cores: Não use apenas branco no preto. Use variações de cinza para o texto (text-gray-400) e cores vibrantes apenas em títulos e bordas sutis.  