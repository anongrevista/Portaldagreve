import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Central da Greve (CG)",
  description: "Portal interativo de documentação da greve",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="antialiased min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
