"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ClipboardList, Download, ShieldCheck } from "lucide-react";
import { type RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";

export default function ReviewPage() {
  const [state, setState] = useState<RtiState | null>(null);

  useEffect(() => {
    setState(readRtiState());
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#173c38]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between border-b border-[#173c38]/15 pb-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#173c38] text-[#f5f1e8]">
              <ClipboardList size={20} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-sm font-bold tracking-[0.16em] uppercase">RTI Saarthi</p>
              <p className="text-xs text-[#173c38]/60">Citizen Intelligence &amp; RTI Filing Layer</p>
            </div>
          </Link>
          <div className="hidden items-center gap-2 text-xs font-semibold text-[#173c38]/60 sm:flex">
            <ShieldCheck size={16} />
            Review &amp; Submit
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-14 lg:py-20">
          <div className="mb-7 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <ShieldCheck size={17} />
            Screen 6 / Review &amp; submit
          </div>

          <h1 className="max-w-3xl text-4xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-6xl">
            One last look before you send.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#173c38]/70">
            Your request is ready. Check the records below, then download your structured application.
          </p>

          <div className="mt-10 rounded-2xl border border-[#173c38]/10 bg-[#fffdf8] p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#173c38]/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#c45b35]">Target Authority</span>
                <p className="mt-1 text-lg font-bold">{state?.publicAuthority || "Public Authority"}</p>
              </div>
              <span className="rounded-full bg-[#e5eee4] px-3 py-1 text-xs font-bold text-[#27745e]">
                Application fee: ₹10
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {(state?.restructuredRequests || []).map((req, index) => (
                <div key={index} className="flex items-start gap-3 rounded-xl bg-white p-3.5 border border-[#173c38]/10">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e5eee4] text-xs font-bold text-[#27745e]">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-6 text-[#173c38]">{req}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/question"
              className="flex min-h-12 items-center justify-center rounded-xl border border-[#173c38]/20 px-5 py-3 text-sm font-bold transition hover:bg-white"
            >
              Back to edit
            </Link>
            <Link
              href="/appeal"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c45b35] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a94728]"
            >
              Proceed to Appeal Guidance <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}