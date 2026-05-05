export interface DocumentSection {
  title: string;
  anchor: string;
  content: string;
}

export interface DocumentFile {
  title: string;
  href: string;
  content?: string;
  sections?: DocumentSection[];
}

export interface FolderData {
  description: string;
  subfolders: Record<string, DocumentFile[]>;
}

export type DirectoryData = Record<string, FolderData>;

export const DIRECTORY_DATA: DirectoryData = {
  "Portal da Greve": {
    description: "Documentos gerais, apresentações e glossário.",
    subfolders: {
      "Geral": [
        { 
          title: "Apresentação do Portal da Greve", 
          href: "/documentos/apresentacao-do-portal-da-greve",
          sections: [
            { title: "O projeto", anchor: "projeto-resumo", content: "A Portal da Greve (PG) é uma plataforma digital, um aplicativo que roda direto no navegador, construído para melhorar a comunicação e a organização durante o período de mobilização. O projeto segue a filosofia de software livre (open source)." },
            { title: "Introdução", anchor: "introducao", content: "Seu objetivo é transformar a forma como a comunicação da greve é realizada, tanto internamente quanto na relação entre a universidade e a sociedade." },
            { title: "Tecnologia", anchor: "parte-tecnica", content: "A arquitetura utiliza TypeScript, Next.js e Supabase. A performance é otimizada para redes móveis." }
          ]
        },
        {
          title: "Glossário da Greve",
          href: "/documentos/portal-da-greve/geral/glossario",
          content: "Termos e conceitos jurídicos e políticos usados durante a mobilização. Entenda as siglas e o vocabulário da greve."
        }
      ]
    }
  },
  "DCE": {
    description: "Documentos e pautas do Diretório Central dos Estudantes.",
    subfolders: {
      "Geral": [{ title: "READ-ME", href: "/documentos/dce/geral/read-me", content: "Documentação geral do Diretório Central dos Estudantes." }],
      "Notas": [{ title: "READ-ME", href: "/documentos/dce/notas/read-me", content: "Notas e posicionamentos oficiais do DCE." }]
    }
  },
  "Dossiês USP": {
    description: "Dossiês e investigações sobre as condições na USP.",
    subfolders: {
      "Geral": [
        { title: "Fotos horrendas dos bandejões", href: "/documentos/dossies-usp/geral/fotos-bandejoes", content: "Galeria de fotos denunciando a precariedade dos bandejões da USP. Larvas, comida estragada e falta de higiene." },
        { title: "READ-ME", href: "/documentos/dossies-usp/geral/read-me", content: "Informações sobre os dossiês da USP." }
      ]
    }
  },
  "IFUSP": {
    description: "Documentos, assembleias e reuniões do Instituto de Física.",
    subfolders: {
      "Geral": [{ title: "READ-ME", href: "/documentos/ifusp/geral/read-me", content: "Documentos gerais do IFUSP relacionados à greve." }],
      "CEFISMA": [
        { 
          title: "A Semana Decisiva da Greve", 
          href: "/documentos/ifusp/cefisma/a-semana-decisiva-da-greve",
          content: "Agenda do Cefisma para a semana crucial da mobilização. Posicionamento político e chamamento para as atividades."
        }
      ],
      "Assembleias": [{ title: "READ-ME", href: "/documentos/ifusp/assembleias/read-me", content: "Histórico e atas de assembleias do IFUSP." }],
      "Ofícios": [{ title: "READ-ME", href: "/documentos/ifusp/oficios/read-me", content: "Ofícios enviados e recebidos pela comissão de greve." }],
      "Plenárias": [{ title: "READ-ME", href: "/documentos/ifusp/plenarias/read-me", content: "Resumos das plenárias realizadas." }],
      "Reuniões": [
        { title: "Reunião do comando de greve", href: "/documentos/ifusp/reunioes/reuniao-comando", content: "Atas das reuniões do comando de greve do IFUSP." },
        { title: "Reuniões com a Kaline", href: "/documentos/ifusp/reunioes/reunioes-kaline", content: "Relatos e compromissos firmados em reuniões com a diretora do IF, Kaline Rabelo." },
        { title: "READ-ME", href: "/documentos/ifusp/reunioes/read-me", content: "Compilado de reuniões importantes." }
      ]
    }
  },
  "Manuais de greve": {
    description: "Guias, protocolos e informações sobre a paralisação.",
    subfolders: {
      "Geral": [
        { 
          title: "Informações sobre a greve (comando)", 
          href: "/documentos/ifusp/comando-de-greve/informacoes-sobre-a-greve",
          sections: [
            { title: "Conquistas de greves anteriores", anchor: "greves-anteriores", content: "GT de dados descobriu o parâmetro sustentabilidade da reitoria, contratação de professores, jantar aos sábados, PPP bacharelado, mudança de responsáveis pelo Física 1." },
            { title: "Lutas da greve", anchor: "lutas-da-greve", content: "Fim do ICMS, repasse de verba deve se manter e não a alternativa de terceirização. Contra a tomada dos espaços estudantis. Mais concursos para professores. Contra a privatização dos bandejões." },
            { title: "Pautas USP Geral", anchor: "pautas-da-greve", content: "Permanência, Eixo 1: Melhoras no Bandejão. Construção de bandejão poli/p3. Desprivatização. Café da manhã em todos os bancos. Vigilância sanitária constante. Jantar no domingo. Funcionar nos feriados." },
            { title: "Pautas IFUSP", anchor: "pautas-ifusp", content: "Exaustores no bandejão da física. Efetivação do Física Acolhe (equipe de psicólogos). GT anti assédio. Reabertura do bosque da física. Conforto térmico. Abertura da biblioteca e espaços de estudo como o Méson Pi." }
          ]
        },
        { 
          title: "O que é o Comando de Greve", 
          href: "/documentos/ifusp/comando-de-greve/o-que-e-o-comando",
          sections: [
            { title: "Definição", anchor: "definicao", content: "O comando de greve é votado em assembleia. Representa os estudantes, organiza, dirige o processo, mobiliza, negocia as pautas e constrói o calendário." }
          ]
        },
        { 
          title: "Como lidar com influencers de direita", 
          href: "/documentos/ifusp/comando-de-greve/influencers-de-direita",
          sections: [
            { title: "Medidas", anchor: "medidas", content: "Uso de sons altos com copyright (Disney), minimizar interações, piquete humano (corrente de pessoas), evitar agressividade com seguranças armados." }
          ]
        },
        { title: "READ-ME", href: "/documentos/manuais-de-greve/geral/read-me", content: "Guia inicial para novos membros do comando." }
      ]
    }
  }
};
