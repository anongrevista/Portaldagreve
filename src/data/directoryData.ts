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
  "DCE": {
    description: "Documentos e pautas do Diretório Central dos Estudantes.",
    subfolders: {
      "Notas": [{ title: "READ-ME", href: "/documentos/dce/notas/read-me", content: "Notas e posicionamentos oficiais do DCE." }]
    }
  },
  "Docies USP": {
    description: "Dossiês e investigações sobre as condições na USP.",
    subfolders: {
      "Geral": [{ title: "READ-ME", href: "/documentos/docies-usp/geral/read-me", content: "Informações sobre os dossiês da USP." }]
    }
  },
  "IFUSP": {
    description: "Documentos, assembleias e reuniões do Instituto de Física.",
    subfolders: {
      "Assembleias": [{ title: "READ-ME", href: "/documentos/ifusp/assembleias/read-me", content: "Histórico e atas de assembleias do IFUSP." }],
      "Emails enviados": [{ title: "READ-ME", href: "/documentos/ifusp/emails-enviados/read-me", content: "Comunicações oficiais enviadas pelo comando." }],
      "Ofícios": [{ title: "READ-ME", href: "/documentos/ifusp/oficios/read-me", content: "Ofícios enviados e recebidos pela comissão de greve." }],
      "Plenárias": [{ title: "READ-ME", href: "/documentos/ifusp/plenarias/read-me", content: "Resumos das plenárias realizadas." }],
      "Reuniões": [{ title: "READ-ME", href: "/documentos/ifusp/reunioes/read-me", content: "Atas das reuniões do comando de greve do IFUSP." }]
    }
  },
  "Manuais de greve": {
    description: "Guias, protocolos e informações sobre a paralisação.",
    subfolders: {
      "Geral": [{ title: "READ-ME", href: "/documentos/manuais-de-greve/geral/read-me", content: "Guia inicial para novos membros do comando." }]
    }
  },
  "Referencias": {
    description: "Materiais de referência e consulta externa.",
    subfolders: {
      "Geral": [{ title: "READ-ME", href: "/documentos/referencias/geral/read-me", content: "Documentos e links de referência." }]
    }
  }
};
