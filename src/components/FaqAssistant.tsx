"use client";

import { ChevronDown, MessageCircle, Search, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/src/context/LanguageContext";

const faqs = [
  { question: "What is the difference between RTI and a grievance (CPGRAMS)?", answer: "RTI obtains existing records and information. A grievance portal such as CPGRAMS is for requesting action or resolving a service problem, such as a delayed payment." },
  { question: "What can and cannot be asked under RTI?", answer: "Ask for existing records, orders, registers, file notings, correspondence, and data. RTI does not require an authority to create explanations, opinions, or new analysis." },
  { question: "How does the 30-day timeline and First Appeal work?", answer: "A Public Information Officer generally responds within 30 days. If the response is late, incomplete, or unsatisfactory, you can file a First Appeal with the designated First Appellate Authority." },
  { question: "What is the application fee (₹10 Central)?", answer: "The application fee for a standard Central Government RTI request is ₹10. State and local authorities may have different fee rules." },
];

export default function FaqAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const { t } = useLanguage();
  const visibleFaqs = faqs.filter((faq) => `${faq.question} ${faq.answer}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className="fixed right-5 bottom-6 z-40 flex items-center gap-2 rounded-full bg-[#173c38] px-4 py-3 text-sm font-bold text-[#f5f1e8] shadow-[0_12px_30px_rgba(23,60,56,0.22)] transition hover:bg-[#26534e]" aria-label={t("faq_desk_btn")}><MessageCircle size={18} /> {t("faq_desk_btn")}</button>
      {isOpen && <div className="fixed inset-0 z-50 bg-[#173c38]/35" onClick={() => setIsOpen(false)}><aside className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-l border-[#173c38]/10 bg-[#f5f1e8] shadow-[-15px_0_45px_rgba(23,60,56,0.15)]" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="faq-title"><div className="flex items-start justify-between border-b border-[#173c38]/15 px-6 py-5"><div><p className="text-xs font-bold tracking-[0.14em] text-[#c45b35] uppercase">Instant guidance</p><h2 id="faq-title" className="mt-1 text-2xl font-semibold">{t("faq_desk_btn")}</h2></div><button type="button" onClick={() => setIsOpen(false)} aria-label="Close help desk" className="rounded-lg p-1 text-[#173c38]/60 hover:bg-[#e5eee4]"><X size={20} /></button></div><div className="px-6 py-5"><div className="flex items-center gap-2 rounded-xl border border-[#173c38]/15 bg-white px-3 py-2"><Search size={17} className="text-[#173c38]/45" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search RTI questions" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#173c38]/40" /></div></div><div className="flex-1 overflow-y-auto px-6 pb-8">{visibleFaqs.length > 0 ? visibleFaqs.map((faq) => { const index = faqs.indexOf(faq); const isExpanded = expanded === index; return <div key={faq.question} className="border-b border-[#173c38]/10 py-4"><button type="button" onClick={() => setExpanded(isExpanded ? null : index)} className="flex w-full items-start justify-between gap-4 text-left text-sm font-bold"><span>{faq.question}</span><ChevronDown size={18} className={`mt-0.5 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} /></button>{isExpanded && <p className="mt-3 pr-6 text-sm leading-6 text-[#173c38]/70">{faq.answer}</p>}</div>; }) : <p className="py-8 text-sm text-[#173c38]/60">No matching RTI guidance found.</p>}</div></aside></div>}
    </>
  );
}
