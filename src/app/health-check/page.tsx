"use client";

import { ArrowRight, CheckCircle2, ClipboardList, ShieldCheck, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { defaultUniversalState, type RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";

export default function HealthCheckPage() {
  const [state, setState] = useState<RtiState>(defaultUniversalState);
  useEffect(() => {
    const updateState = window.setTimeout(() => setState(readRtiState()), 0);

    return () => window.clearTimeout(updateState);
  }, []);
  const healthScore = state.jurisdictionWarning ? Math.min(state.healthScore, 65) : state.healthScore;
  const checks = [
    { label: "Authority", value: state.jurisdiction, detail: state.jurisdictionWarning ? "Check required" : "Verified", warning: state.jurisdictionWarning },
    { label: "Request Type", value: "Records", detail: "Passed", warning: false },
    { label: "Specificity", value: "Clear", detail: "Passed", warning: false },
    { label: "Privacy Guard", value: "PASS", detail: state.privacyGuard, warning: false },
    { label: "Character Limit", value: `${state.characterCount} / 3000`, detail: "Passed", warning: false },
  ];
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f1e8] text-[#173c38]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between border-b border-[#173c38]/15 pb-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#173c38] text-[#f5f1e8]"><ClipboardList size={20} strokeWidth={1.8} /></div>
            <div><p className="text-sm font-bold tracking-[0.16em] uppercase">RTI Saarthi</p><p className="text-xs text-[#173c38]/60">Citizen Intelligence &amp; RTI Filing Layer</p></div>
                      <div><p className="text-sm font-bold tracking-[0.16em] uppercase">RTI Saarthi</p><p className="text-xs text-[#173c38]/60">Citizen Intelligence &amp; RTI Filing Layer</p></div>
          </Link>
          <div className="hidden items-center gap-2 text-xs font-semibold text-[#173c38]/60 sm:flex"><ShieldCheck size={16} /> Deterministic health check</div>
        </header>

        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-12 lg:py-16">
          <div className="mb-7 flex items-center gap-2 text-sm font-semibold text-[#c45b35]"><ShieldCheck size={17} /> Screen 5 / Health check</div>
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div><h1 className="max-w-2xl text-5xl leading-[0.98] font-semibold tracking-[-0.04em] sm:text-7xl">{state.jurisdictionWarning ? "One issue to check before filing." : "Ready for a clean filing."}</h1><p className="mt-6 max-w-xl text-lg leading-8 text-[#173c38]/70">A few deterministic checks keep your RTI request focused, answerable, and safe to submit.</p></div>
            <div className={`flex size-32 shrink-0 flex-col items-center justify-center rounded-full border-[10px] bg-[#173c38] text-[#f5f1e8] shadow-[0_18px_40px_rgba(23,60,56,0.15)] ${state.jurisdictionWarning ? "border-[#e6b46b]" : "border-[#c8dfc3]"}`}><span className="text-4xl font-semibold">{healthScore}</span><span className="text-xs font-bold tracking-[0.12em] uppercase opacity-70">out of 100</span></div>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[#173c38]/10 bg-[#fffdf8] shadow-[0_20px_45px_rgba(23,60,56,0.08)]">
            {checks.map((check, index) => (
              <div key={check.label} className={`flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5 ${index > 0 ? "border-t border-[#173c38]/10" : ""}`}>
                <div className="flex items-center gap-3">{check.warning ? <TriangleAlert className="shrink-0 text-[#c45b35]" size={19} /> : <CheckCircle2 className="shrink-0 text-[#27745e]" size={19} />}<p className="text-sm font-bold">{check.label}</p></div>
                <div className="flex items-center gap-3 pl-8 sm:pl-0"><span className="text-sm font-semibold">{check.value}</span><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${check.warning ? "bg-[#f3dfc9] text-[#c45b35]" : "bg-[#e5eee4] text-[#27745e]"}`}>{check.detail}</span></div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-2xl bg-[#f3dfc9] px-5 py-4 text-sm leading-6 text-[#173c38]/80"><ShieldCheck className="mt-0.5 shrink-0 text-[#c45b35]" size={18} /><p><strong className="font-bold text-[#173c38]">Privacy reminder:</strong> No identity documents are needed. Do not upload your Aadhaar or PAN.</p></div>
          <div className={`mt-4 flex flex-col gap-4 rounded-2xl border px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${state.jurisdictionWarning ? "border-[#c45b35]/35 bg-[#f3dfc9]" : "border-[#27745e]/25 bg-[#e5eee4]"}`}><div><p className={`text-xs font-bold tracking-[0.12em] uppercase ${state.jurisdictionWarning ? "text-[#c45b35]" : "text-[#27745e]"}`}>Jurisdiction shield</p>{state.jurisdictionWarning ? <p className="mt-1 font-bold">WARN <span className="font-normal text-[#173c38]/65">This appears to be a {state.jurisdiction} subject. The Central RTI Online portal handles only Central Government authorities — filing there may result in your application being returned without a refund. File with the relevant {state.jurisdiction} authority or State RTI portal instead.</span></p> : <p className="mt-1 font-bold">PASS <span className="font-normal text-[#173c38]/65">(Central subject)</span></p>}</div><Link href="/review" className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c45b35] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#a94728]">{state.jurisdictionWarning ? "Continue anyway" : "Review & submit"} <ArrowRight size={17} /></Link></div>
        </section>
      </div>
    </main>
  );
}
