import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LOTECA IA v2.1 FULL - Sistema Preditivo Evolutivo",
  description: "Análise Loteca com fórmula base, R01-R06, AP001-AP008, validação 2+ fontes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0A0A0B] antialiased">{children}</body>
    </html>
  );
}
