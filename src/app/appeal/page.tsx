"use client";

import { CheckCircle2, ClipboardList, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { defaultUniversalState, type RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";

export default function AppealPage() {
  const [state, setState] = useState<RtiState>(defaultUniversalState);
  useEffect(() => {
    const updateState = window.setTimeout(() => setState(readRtiState()), 0);
    return () => window.clearTimeout(updateState);
  }, []);
  const draft = `Subject: First Appeal regarding RTI request on ${state.question}\n\nTo the First Appellate Authority of ${state.suggestedAuthority},\n\nI seek a review of the response or delay relating to my RTI request. The requested records were:\n${state.restructuredRequests.map((request, index) => `${index + 1}. ${request}`).join("\n")}\n\nPlease provide the information and action required under the RTI Act.`;

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#173c38]"><div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-14">
      <header className="flex items-center justify-between border-b border-[#173c38]/15 pb-5"><Link href="/" className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-[#173c38] text-[#f5f1e8]"><ClipboardList size={20} /></div><div><p className="text-sm font-bold tracking-[0.16em] uppercase">RTI Saarthi</p><p className="text-xs text-[#173c38]/60">Citizen Intelligence &amp; RTI Filing Layer</p></div></Link><div className="hidden items-center gap-2 text-xs font-semibold text-[#173c38]/60 sm:flex"><ShieldCheck size={16} /> First appeal draft</div></header>
      <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-14 lg:py-20"><div className="mb-7 flex items-center gap-2 text-sm font-semibold text-[#c45b35]"><ShieldCheck size={17} /> Screen 8 / Appeal guidance</div><h1 className="max-w-2xl text-5xl leading-[0.98] font-semibold tracking-[-0.04em] sm:text-7xl">Ready for the next step.</h1><p className="mt-7 max-w-xl text-lg leading-8 text-[#173c38]/70">This draft reflects your question, requested records, and matched authority.</p><div className="mt-10 rounded-2xl border border-[#27745e]/25 bg-[#e5eee4] p-6 shadow-[0_18px_40px_rgba(23,60,56,0.06)] sm:p-8"><div className="flex items-center gap-3 text-[#27745e]"><CheckCircle2 size={20} /><p className="font-bold">First Appeal draft</p></div><textarea readOnly value={draft} rows={12} className="mt-5 w-full resize-y rounded-xl border border-[#173c38]/10 bg-[#fffdf8] p-4 text-sm leading-6 text-[#173c38] outline-none" /><p className="mt-4 text-sm leading-7 text-[#173c38]/70">Keep registration number {state.registrationNumber} and any reply you receive.</p><Link href="/" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl border border-[#173c38]/20 px-5 py-3 text-sm font-bold transition hover:border-[#173c38] hover:bg-white">Start another question</Link></div></section>
    </div></main>
  );
}
