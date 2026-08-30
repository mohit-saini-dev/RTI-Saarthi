import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FaqAssistant from "@/src/components/FaqAssistant";
import { LanguageProvider } from "@/src/context/LanguageContext";
import DisclaimerBanner from "@/src/components/DisclaimerBanner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RTI Saarthi | Citizen Intelligence & RTI Assistant",
  description: "Find clear, checkable answers about public records and government services.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full">
        <LanguageProvider>
          <DisclaimerBanner />
          {children}
          <FaqAssistant />
        </LanguageProvider>
      </body>
    </html>
  );
}