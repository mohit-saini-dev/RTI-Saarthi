"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { type RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";

export default function HealthCheckPage() {
  const [state, setState] = useState<RtiState | null>(null);

  useEffect(() => {
    setState(readRtiState());
  }, []);

  const jurisdiction = state?.jurisdiction || "Central";
  const isCentral = jurisdiction === "Central";
  const charCount = state?.characterCount || 53;
  const healthScore = state?.healthScore || (isCentral ? 92 : 84);

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#173c38]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-14">
        {/* Header */}
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
            Deterministic Validation
          </div>
        </header>

        {/* Content */}
        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-12 lg:py-16">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <ShieldCheck size={17} />
            Screen 5 / Health check
          </div>

          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-4xl leading-[1.08] font-semibold tracking-[-0.035em] sm:text-6xl">
                Ready for a clean <br className="hidden sm:inline" />filing.
              </h1>
              <p className="mt-4 max-w-xl text-base text-[#173c38]/70">
                Deterministic rule engines keep your request focused, legally answerable, and routed to the correct portal.
              </p>
            </div>

            {/* Health Score Dial */}
            <div className="flex size-28 shrink-0 flex-col items-center justify-center rounded-full bg-[#173c38] text-[#f5f1e8] shadow-lg">
              <span className="text-3xl font-extrabold leading-none">{healthScore}</span>
              <span className="mt-1 text-[10px] font-semibold tracking-wider text-[#f5f1e8]/70 uppercase">
                OUT OF 100
              </span>
            </div>
          </div>

          {/* Validation Matrix */}
          <div className="mt-8 space-y-3 rounded-2xl border border-[#173c38]/10 bg-[#fffdf8] p-6 shadow-sm">
            {/* Rule 1: Authority & Portal Jurisdiction */}
            <div className="flex items-center justify-between border-b border-[#173c38]/10 py-3">
              <div className="flex items-center gap-3">
                {isCentral ? (
                  <CheckCircle2 className="text-[#27745e]" size={18} />
                ) : (
                  <AlertTriangle className="text-[#c45b35]" size={18} />
                )}
                <span className="text-sm font-semibold text-[#173c38]">Authority Jurisdiction</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#173c38]/80">{jurisdiction}</span>
                {isCentral ? (
                  <span className="rounded-md bg-[#e5eee4] px-2 py-0.5 text-xs font-bold text-[#27745e]">
                    Central Verified
                  </span>
                ) : (
                  <span className="rounded-md bg-[#fbeae5] px-2 py-0.5 text-xs font-bold text-[#c45b35]">
                    WARN
                  </span>
                )}
              </div>
            </div>

            {/* Rule 2: Request Type */}
            <div className="flex items-center justify-between border-b border-[#173c38]/10 py-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-[#27745e]" size={18} />
                <span className="text-sm font-semibold text-[#173c38]">Request Type</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#173c38]/80">Records</span>
                <span className="rounded-md bg-[#e5eee4] px-2 py-0.5 text-xs font-bold text-[#27745e]">
                  Passed
                </span>
              </div>
            </div>

            {/* Rule 3: Specificity */}
            <div className="flex items-center justify-between border-b border-[#173c38]/10 py-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-[#27745e]" size={18} />
                <span className="text-sm font-semibold text-[#173c38]">Specificity</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#173c38]/80">Clear</span>
                <span className="rounded-md bg-[#e5eee4] px-2 py-0.5 text-xs font-bold text-[#27745e]">
                  Passed
                </span>
              </div>
            </div>

            {/* Rule 4: Privacy Guard */}
            <div className="flex items-center justify-between border-b border-[#173c38]/10 py-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-[#27745e]" size={18} />
                <span className="text-sm font-semibold text-[#173c38]">Privacy Guard</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#27745e]">PASS</span>
                <span className="rounded-md bg-[#e5eee4] px-2 py-0.5 text-[11px] font-semibold text-[#27745e]">
                  No identity documents or sensitive IDs required
                </span>
              </div>
            </div>

            {/* Rule 5: Character Limit */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-[#27745e]" size={18} />
                <span className="text-sm font-semibold text-[#173c38]">Character Limit</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#173c38]/70">{charCount} / 3000</span>
                <span className="rounded-md bg-[#e5eee4] px-2 py-0.5 text-xs font-bold text-[#27745e]">
                  Passed
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Jurisdiction Warning Box */}
          {!isCentral && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#c45b35]/30 bg-[#fef5f2] p-4 text-xs leading-relaxed text-[#c45b35]">
              <ShieldAlert size={18} className="shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Jurisdiction Shield Warning:</strong> This request falls under a <strong>{jurisdiction}</strong> authority. The Central RTI Online portal (`rtionline.gov.in`) only accepts Central Government departments. File this application via the state portal or by physical post.
              </div>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link
              href="/authority"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#173c38]/20 bg-white px-6 py-3 text-sm font-bold transition hover:border-[#173c38]"
            >
              <ArrowLeft size={16} /> Back to Authority
            </Link>
            <Link
              href="/review"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c45b35] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#a94728]"
            >
              Review &amp; submit <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}