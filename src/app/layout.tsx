import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProposalForge — AI Proposal Generator",
  description: "Generate professional business proposals with AI in minutes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}
