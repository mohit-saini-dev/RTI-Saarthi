"use client";

import { ArrowRight, ClipboardList, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { defaultUniversalState, type RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";

export default function UnderstandPage() {
  const [state, setState] = useState<RtiState>(defaultUniversalState);

  useEffect(() => {
    const updateState = window.setTimeout(() => setState(readRtiState()), 0);

    return () => window.clearTimeout(updateState);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f1e8] text-[#173c38]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between border-b border-[#173c38]/15 pb-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#173c38] text-[#f5f1e8]">
              <ClipboardList size={20} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-[#173c38] uppercase">RTI Saarthi</p>
              <p className="text-xs text-[#173c38]/60">Citizen Intelligence &amp; RTI Filing Layer</p>
                          <p className="text-xs text-[#173c38]/60">Citizen Intelligence &amp; RTI Filing Layer</p>
            </div>
          </Link>
          <div className="hidden items-center gap-2 text-xs font-semibold text-[#173c38]/60 sm:flex">
            <ShieldCheck size={16} />
            Route guard
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-14 lg:py-20">
          <div className="mb-7 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <ShieldCheck size={17} />
            Screen 2 / Understand your goal
          </div>
          <p className="max-w-2xl rounded-2xl border border-[#173c38]/10 bg-white px-5 py-4 text-lg leading-8 text-[#173c38]/75 shadow-[0_18px_45px_rgba(23,60,56,0.06)]">
            “{state.question}”
          </p>

          <div className="mt-10 max-w-3xl">
            <h1 className="max-w-2xl text-5xl leading-[0.98] font-semibold tracking-[-0.04em] text-[#173c38] sm:text-7xl">
              {state.goal}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#173c38]/70">
              {state.suitabilityReason}
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="flex flex-col justify-between rounded-2xl border border-[#173c38]/10 bg-[#fffdf8] p-6 shadow-[0_18px_45px_rgba(23,60,56,0.08)]">
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-[#c45b35] uppercase">Information route</p>
                <h2 className="mt-3 text-2xl font-semibold">Find out what happened</h2>
                <p className="mt-3 leading-7 text-[#173c38]/65">
                  Use RTI to request the status, file movement, and reasons behind the delay.
                </p>
              </div>
              <Link
                href="/question"
                className="mt-8 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c45b35] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#a94728]"
              >
                Find out what happened <ArrowRight size={17} />
              </Link>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-[#173c38]/10 bg-[#e5eee4] p-6 shadow-[0_18px_45px_rgba(23,60,56,0.05)]">
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-[#27745e] uppercase">Resolution route</p>
                <h2 className="mt-3 text-2xl font-semibold">Get payment resolved</h2>
                <p className="mt-3 leading-7 text-[#173c38]/65">
                  Submit a grievance to the department that can take action on your delayed payment.
                </p>
              </div>
              <a
                href="https://pgportal.gov.in"
                target="_blank"
                rel="noreferrer"
                className="mt-8 flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#173c38]/20 bg-transparent px-5 py-3 text-center text-sm font-bold text-[#173c38] transition hover:border-[#173c38] hover:bg-white"
              >
                Get payment resolved <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}