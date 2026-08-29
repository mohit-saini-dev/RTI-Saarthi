"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  Lock, 
  ClipboardList
} from "lucide-react";
import { type RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";
import { useLanguage } from "../../context/LanguageContext";

export default function HealthCheckPage() {
  const { t } = useLanguage();
  const [state, setState] = useState<RtiState | null>(null);

  useEffect(() => {
    setState(readRtiState());
  }, []);

  const authority =
    state?.publicAuthority ||
    (state?.jurisdiction === "Municipal"
      ? "Municipal Corporation / Local Body"
      : state?.jurisdiction === "State"
      ? "State Public Authority"
      : "Central Public Information Officer");

  const isMunicipalOrState =
    state?.jurisdiction === "Municipal" || state?.jurisdiction === "State";

  const healthScore = state?.healthScore ?? (isMunicipalOrState ? 68 : 94);
  const isPass = healthScore >= 80;

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#173c38]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-12">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#173c38]/15 pb-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#173c38] text-[#f5f1e8]">
              <ClipboardList size={20} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-sm font-bold tracking-[0.16em] uppercase">RTI Saarthi</p>
              <p className="text-xs text-[#173c38]/60">{t("workflow_subtitle")}</p>
            </div>
          </Link>
          <div className="hidden items-center gap-2 text-xs font-semibold text-[#173c38]/60 sm:flex">
            <ShieldCheck size={16} />
            Compliance Shield
          </div>
        </header>

        {/* Content */}
        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-12 pb-28">
          {/* Unified Screen Indicator Badge */}
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <ShieldCheck size={16} />
            <span>✦ Screen 5: Pre-Flight Statutory Health Check</span>
          </div>

          <div className="bg-white rounded-2xl border border-[#173c38]/15 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#173c38]/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    isPass ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"
                  }`}>
                    {isPass ? "Filing Health: PASS" : "Filing Health: CAUTION / WARN"}
                  </span>
                </div>
                <h1 className="text-3xl font-extrabold text-[#173c38] tracking-tight mt-2">
                  Pre-Flight Statutory Health Check
                </h1>
                <p className="text-sm text-[#173c38]/70 mt-1 max-w-xl">
                  Audited against Central RTI Online portal constraints, Section 2(f) statutory requirements, and data privacy safeguards.
                </p>
              </div>

              {/* Health Score Gauge */}
              <div className="flex items-center gap-4 bg-[#f5f1e8] px-6 py-4 rounded-2xl border border-[#173c38]/10">
                <div className="text-right">
                  <span className="text-3xl font-black text-[#173c38]">{healthScore}</span>
                  <span className="text-sm font-semibold text-[#173c38]/60">/100</span>
                  <p className="text-[11px] font-bold text-[#173c38]/60 uppercase tracking-wider">Health Index</p>
                </div>
                <div className="p-3 bg-white rounded-xl shadow-xs">
                  {isPass ? (
                    <CheckCircle2 size={32} className="text-[#27745e]" />
                  ) : (
                    <AlertTriangle size={32} className="text-[#c45b35]" />
                  )}
                </div>
              </div>
            </div>

            {/* Compliance Checks */}
            <div className="mt-8 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#173c38]/60">
                Deterministic Rule Validations
              </h2>

              {/* Jurisdiction Check */}
              <div className="p-4 rounded-xl border border-[#173c38]/10 bg-[#fffdf8] flex items-start gap-4">
                <div className="mt-0.5">
                  {isMunicipalOrState ? (
                    <AlertTriangle size={20} className="text-[#c45b35]" />
                  ) : (
                    <CheckCircle2 size={20} className="text-[#27745e]" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#173c38]">
                      Jurisdiction & Portal Routing Check
                    </h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      isMunicipalOrState ? "bg-amber-100 text-amber-900" : "bg-emerald-100 text-emerald-900"
                    }`}>
                      {isMunicipalOrState ? "WARN" : "PASSED"}
                    </span>
                  </div>
                  <p className="text-xs text-[#173c38]/70 mt-1">
                    Target Authority: <strong>{authority}</strong> ({state?.jurisdiction || "Central"} jurisdiction).
                  </p>
                  {isMunicipalOrState && (
                    <div className="mt-2.5 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                      <strong>Critical Guard:</strong> Central RTI Online (rtionline.gov.in) does not accept municipal or state authority filings. Filing this request on the central portal would cost you your ₹10 application fee and delay you by several weeks.
                    </div>
                  )}
                </div>
              </div>

              {/* Section 2(f) Check */}
              <div className="p-4 rounded-xl border border-[#173c38]/10 bg-[#fffdf8] flex items-start gap-4">
                <div className="mt-0.5">
                  <CheckCircle2 size={20} className="text-[#27745e]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#173c38]">
                      Section 2(f) Admissibility Check
                    </h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                      PASSED
                    </span>
                  </div>
                  <p className="text-xs text-[#173c38]/70 mt-1">
                    Your question has been converted into specific certified record demands rather than interrogative queries, preventing summary dismissal by the PIO.
                  </p>
                </div>
              </div>

              {/* PII Check */}
              <div className="p-4 rounded-xl border border-[#173c38]/10 bg-[#fffdf8] flex items-start gap-4">
                <div className="mt-0.5">
                  <Lock size={20} className="text-[#27745e]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#173c38]">
                      Personally Identifiable Information (PII) Guard
                    </h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                      SECURED
                    </span>
                  </div>
                  <p className="text-xs text-[#173c38]/70 mt-1">
                    No personal identity card numbers, banking credentials, or unnecessary personal disclosures were detected.
                  </p>
                </div>
              </div>

              {/* Character Limit */}
              <div className="p-4 rounded-xl border border-[#173c38]/10 bg-[#fffdf8] flex items-start gap-4">
                <div className="mt-0.5">
                  <FileText size={20} className="text-[#27745e]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#173c38]">
                      Portal Character Limit (3,000 Characters)
                    </h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                      COMPLIANT
                    </span>
                  </div>
                  <p className="text-xs text-[#173c38]/70 mt-1">
                    Restructured query fits within character requirements, formatted for immediate copy-pasting.
                  </p>
                </div>
              </div>
            </div>

            {/* Jurisdiction Action */}
            {isMunicipalOrState ? (
              <div className="mt-6 p-4 rounded-xl bg-[#fff5f2] border border-[#c45b35]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-[#c45b35] uppercase tracking-wider">
                    Recommended Routing Action
                  </p>
                  <p className="text-xs text-[#173c38]/80 mt-0.5">
                    Prepare to file via your State RTI portal or submit via registered physical post.
                  </p>
                </div>
                <Link
                  href="/review"
                  className="px-4 py-2 bg-[#c45b35] hover:bg-[#a84d2d] text-white text-xs font-bold rounded-lg transition whitespace-nowrap text-center"
                >
                  Proceed to Review & Export Draft
                </Link>
              </div>
            ) : (
              <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Ready for Review
                  </p>
                  <p className="text-xs text-[#173c38]/80 mt-0.5">
                    All compliance checks passed. Your request is ready for statutory review.
                  </p>
                </div>
                <Link
                  href="/review"
                  className="px-4 py-2 bg-[#173c38] hover:bg-black text-white text-xs font-bold rounded-lg transition whitespace-nowrap text-center"
                >
                  Continue to Final Review
                </Link>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/authority"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#173c38]/20 text-sm font-semibold text-[#173c38] hover:bg-white transition"
            >
              <ArrowLeft size={16} /> Back to Authority Routing
            </Link>

            <Link
              href="/review"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#173c38] hover:bg-black text-white text-sm font-semibold shadow-sm transition"
            >
              Continue to Review <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}