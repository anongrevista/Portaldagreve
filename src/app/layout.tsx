import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Portal da Greve (PG)",
  description: "Portal interativo de documentação da greve",
};

import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { IframeResizer } from "@/components/IframeResizer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="antialiased min-h-screen bg-[#151414] text-foreground">
        <IframeResizer />
        <ReadingProgressBar />
        {children}
      </body>
    </html>
  );
}
