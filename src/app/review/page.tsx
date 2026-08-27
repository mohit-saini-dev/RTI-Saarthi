"use client";

import { ArrowRight, CheckCircle2, ClipboardList, LoaderCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { defaultUniversalState, type RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";

export default function ReviewPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [state, setState] = useState<RtiState>(defaultUniversalState);

  useEffect(() => {
    const updateState = window.setTimeout(() => setState(readRtiState()), 0);

    return () => window.clearTimeout(updateState);
  }, []);

  function submitDemo() {
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f1e8] text-[#173c38]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between border-b border-[#173c38]/15 pb-5">
          <Link href="/" className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-[#173c38] text-[#f5f1e8]"><ClipboardList size={20} strokeWidth={1.8} /></div><div><p className="text-sm font-bold tracking-[0.16em] uppercase">RTI Saarthi</p><p className="text-xs text-[#173c38]/60">Citizen Intelligence &amp; RTI Filing Layer</p></div></Link>
                    <Link href="/" className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-[#173c38] text-[#f5f1e8]"><ClipboardList size={20} strokeWidth={1.8} /></div><div><p className="text-sm font-bold tracking-[0.16em] uppercase">RTI Saarthi</p><p className="text-xs text-[#173c38]/60">Citizen Intelligence &amp; RTI Filing Layer</p></div></Link>
          <div className="hidden items-center gap-2 text-xs font-semibold text-[#173c38]/60 sm:flex"><ShieldCheck size={16} /> Review &amp; mock submission</div>
        </header>

        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-12 lg:py-16">
          <div className="mb-7 flex items-center gap-2 text-sm font-semibold text-[#c45b35]"><ShieldCheck size={17} /> Screen 6 / Review &amp; submit</div>
          <h1 className="max-w-2xl text-5xl leading-[0.98] font-semibold tracking-[-0.04em] sm:text-7xl">One last look before you send.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#173c38]/70">Your request is ready. Check the records below, then submit this safe demonstration filing.</p>

          <div className="mt-10 rounded-2xl border border-[#173c38]/10 bg-[#fffdf8] p-6 shadow-[0_20px_45px_rgba(23,60,56,0.08)] sm:p-8">
            <div className="flex flex-col gap-4 border-b border-[#173c38]/10 pb-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold tracking-[0.14em] text-[#c45b35] uppercase">Requested records</p><h2 className="mt-1 text-2xl font-semibold">{state.restructuredRequests.length} items for review</h2></div><span className="w-fit rounded-full bg-[#e5eee4] px-3 py-1.5 text-xs font-bold text-[#27745e]">Application fee: ₹10</span></div>
            <ol className="mt-5 space-y-3">{state.restructuredRequests.map((request, index) => <li key={request} className="flex gap-3 text-sm leading-6"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#e5eee4] text-xs font-bold text-[#27745e]">{index + 1}</span><span>{request}</span></li>)}</ol>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#c45b35]/25 bg-[#f3dfc9] px-5 py-4 text-sm leading-6"><ShieldCheck className="mt-0.5 shrink-0 text-[#c45b35]" size={18} /><p><strong className="font-bold">MOCK — No real filing or payment will occur</strong><br /><span className="text-[#173c38]/70">This is a synthetic journey for demonstration only.</span></p></div>

          {!isSubmitted ? <button type="button" onClick={submitDemo} disabled={isSubmitting} className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#c45b35] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#a94728] disabled:cursor-wait disabled:opacity-70">{isSubmitting ? <><LoaderCircle className="animate-spin" size={17} /> Creating demo submission...</> : <>Submit Demo RTI <ArrowRight size={17} /></>}</button> : <div className="mt-6 rounded-2xl border border-[#27745e]/25 bg-[#e5eee4] p-5"><div className="flex items-center gap-2 text-[#27745e]"><CheckCircle2 size={19} /><p className="font-bold">Demo RTI submitted</p></div><p className="mt-3 text-sm text-[#173c38]/65">Synthetic registration number</p><p className="mt-1 text-2xl font-semibold tracking-[0.04em]">{state.registrationNumber}</p><Link href="/journey" className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#173c38] px-5 py-3 text-center text-sm font-bold text-[#f5f1e8] transition hover:bg-[#26534e]">Track RTI Journey <ArrowRight size={17} /></Link></div>}
        </section>
      </div>
    </main>
  );
}
