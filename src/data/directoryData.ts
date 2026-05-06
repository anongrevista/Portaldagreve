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

export interface RootDocument {
  title: string;
  slug: string;
  fileUrl: string;
  destaque: boolean;
  description?: string;
}

export const ROOT_DOCUMENTS: RootDocument[] = [
  { 
    title: "Apresentação do Portal da Greve (PG)", 
    slug: "apresentacao-portal",
    fileUrl: "/Documentos PG (Portal da greve)/Apresentação do Portal da Greve o (PG).zip",
    destaque: true,
    description: "Visão geral e objetivos do Portal da Greve."
  },
  { 
    title: "Glossário da greve", 
    slug: "glossario-da-greve",
    fileUrl: "/Documentos PG (Portal da greve)/Glossário da greve .zip",
    destaque: true,
    description: "Termos e definições importantes do movimento."
  },
  { 
    title: "Informações sobre a greve", 
    slug: "informacoes-sobre-a-greve",
    fileUrl: "/Documentos PG (Portal da greve)/Informações sobre a greve.zip",
    destaque: true,
    description: "Dados centrais, pautas e reivindicações."
  }
];

export const DIRECTORY_DATA: DirectoryData = {
  "DCE": {
    description: "Documentos e pautas do Diretório Central dos Estudantes.",
    subfolders: {
      "Notas": []
    }
  },
  "Docies USP": {
    description: "Dossiês e investigações sobre as condições na USP.",
    subfolders: {}
  },
  "IFUSP": {
    description: "Documentos, assembleias e reuniões do Instituto de Física.",
    subfolders: {
      "Assembleias": [],
      "Emails enviados": [],
      "Ofícios": [],
      "Plenárias": [],
      "Reuniões": []
    }
  },
  "Manuais de greve": {
    description: "Guias, protocolos e informações sobre a paralisação.",
    subfolders: {}
  },
  "Referencias": {
    description: "Materiais de referência e consulta externa.",
    subfolders: {}
  }
};
