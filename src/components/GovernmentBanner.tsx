"use client";

import React from "react";
import { useLanguage, LanguageCode } from "../context/LanguageContext";

const languages: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी (Hindi)" }
];

export default function GovernmentBanner() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="bg-emerald-950 text-white border-b border-emerald-900 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2 font-medium tracking-wide">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
          <span>RTI Saarthi • Pre-Filing Statutory Intelligence Layer</span>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageCode)}
            className="bg-emerald-900 text-white border border-emerald-700 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer"
            aria-label="Select Language"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-emerald-950 text-white">
                {lang.label}
              </option>
            ))}
          </select>

          <span className="text-emerald-200/80 hover:text-white cursor-pointer transition">
            RTI Act, 2005
          </span>
        </div>
      </div>
    </header>
  );
}