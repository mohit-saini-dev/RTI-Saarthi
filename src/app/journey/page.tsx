"use client";

import { ArrowRight, CheckCircle2, ClipboardList, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { defaultUniversalState, type RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";

export default function JourneyPage() {
  const [state, setState] = useState<RtiState>(defaultUniversalState);
  useEffect(() => {
    const updateState = window.setTimeout(() => setState(readRtiState()), 0);

    return () => window.clearTimeout(updateState);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f1e8] text-[#173c38]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between border-b border-[#173c38]/15 pb-5">
          <Link href="/" className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-[#173c38] text-[#f5f1e8]"><ClipboardList size={20} strokeWidth={1.8} /></div><div><p className="text-sm font-bold tracking-[0.16em] uppercase">RTI Saarthi</p><p className="text-xs text-[#173c38]/60">Citizen Intelligence &amp; RTI Filing Layer</p></div></Link>
                    <Link href="/" className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-[#173c38] text-[#f5f1e8]"><ClipboardList size={20} strokeWidth={1.8} /></div><div><p className="text-sm font-bold tracking-[0.16em] uppercase">RTI Saarthi</p><p className="text-xs text-[#173c38]/60">Citizen Intelligence &amp; RTI Filing Layer</p></div></Link>
          <div className="hidden items-center gap-2 text-xs font-semibold text-[#173c38]/60 sm:flex"><ShieldCheck size={16} /> Demo journey</div>
        </header>
        <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center py-14 lg:py-20">
          <div className="mb-7 flex items-center gap-2 text-sm font-semibold text-[#c45b35]"><ShieldCheck size={17} /> Screen 7 / Track your RTI</div>
          <h1 className="max-w-2xl text-5xl leading-[0.98] font-semibold tracking-[-0.04em] sm:text-7xl">Your RTI journey is underway.</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#173c38]/70">This demo request is registered as <strong className="font-bold text-[#173c38]">{state.registrationNumber}</strong>. Follow the next step when you need to escalate a delayed response.</p>
          <div className="mt-10 rounded-2xl border border-[#173c38]/10 bg-[#fffdf8] p-6 shadow-[0_20px_45px_rgba(23,60,56,0.08)] sm:p-8">
            <div className="flex items-center gap-3 text-[#27745e]"><CheckCircle2 size={20} /><p className="font-bold">Demo submission recorded</p></div>
            <div className="mt-6 border-t border-[#173c38]/10 pt-5"><p className="text-xs font-bold tracking-[0.12em] text-[#173c38]/50 uppercase">Current status</p><p className="mt-2 text-xl font-semibold">Submitted for information</p><p className="mt-2 text-sm leading-6 text-[#173c38]/65">No real filing was made. This synthetic journey for {state.domain} is ready for the appeal step.</p></div>
            <Link href="/appeal" className="mt-8 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c45b35] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#a94728]">Continue to appeal <ArrowRight size={17} /></Link>
          </div>
        </section>
      </div>
    </main>
  );
}