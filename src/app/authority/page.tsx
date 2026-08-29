"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ClipboardList, ShieldCheck, AlertTriangle, Building2 } from "lucide-react";
import { type RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";
import { useLanguage } from "../../context/LanguageContext";

export default function AuthorityPage() {
  const { t } = useLanguage();
  const [state, setState] = useState<RtiState | null>(null);

  useEffect(() => {
    // Hydrate browser-only localStorage state after initial render
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(readRtiState());
  }, []);

  const isMunicipalOrState =
    state?.jurisdiction === "Municipal" || state?.jurisdiction === "State";

  const publicAuthority =
    state?.publicAuthority ||
    (state?.jurisdiction === "Municipal"
      ? "Municipal Corporation / Local Urban Body"
      : state?.jurisdiction === "State"
      ? "State Government Public Authority"
      : "Central Public Authority Concerned");

  const jurisdiction = state?.jurisdiction || "Central";
  const confidence = state?.authorityConfidence || (isMunicipalOrState ? 92 : 96);

  const suitabilityReason =
    state?.suitabilityReason ||
    `Official custodian of public administrative files, approvals, and expenditure accounts under ${jurisdiction} jurisdiction.`;

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
            {t("authority_match")}
          </div>
        </header>

        {/* Content */}
        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-12 pb-28">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <Building2 size={17} />
            {t("screen4_badge")}
          </div>

          <h1 className="max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.035em] sm:text-5xl">
            {t("authority_title")}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#173c38]/70">
            {t("authority_desc")}
          </p>

          {/* Matched Authority Card */}
          <div className="mt-10 rounded-2xl border border-[#173c38]/10 bg-white p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c45b35]">
                {t("matched_authority")}
              </span>
              <span className="rounded-full bg-[#e5eee4] px-3 py-1 text-xs font-bold text-[#27745e]">
                {t("confidence")}: {confidence}%
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-[#173c38]">
              {publicAuthority}
            </h2>

            <p className="mt-3 text-sm text-[#173c38]/70">
              {t("jurisdiction")}:{" "}
              <span className="font-semibold text-[#173c38]">{jurisdiction}</span>
            </p>

            {/* Jurisdiction Alert Box if State / Municipal */}
            {isMunicipalOrState && (
              <div className="mt-5 rounded-xl border border-[#c45b35]/25 bg-[#fff5f2] p-4 text-xs text-[#173c38] leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold text-[#c45b35] mb-1">
                  <AlertTriangle size={15} />
                  Jurisdiction Shield Active
                </div>
                This public body operates under <strong>{jurisdiction} Government</strong> rules. It is not accepted by the Central RTI Online portal. RTI Saarthi will structure your draft specifically for State/Offline submission.
              </div>
            )}

            {/* Statutory Reason */}
            <div className="mt-6 border-l border-[#173c38]/10 pl-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#173c38]/50">
                {t("why_match") || "Statutory Custody Reason"}
              </p>
              <p className="mt-1 text-sm text-[#173c38]/80 leading-relaxed">
                {suitabilityReason}
              </p>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link
              href="/question"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#173c38]/20 px-6 text-sm font-semibold text-[#173c38] transition-colors hover:bg-[#173c38]/5"
            >
              <ArrowLeft size={16} /> Back
            </Link>

            <Link
              href="/health-check"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c45b35] px-8 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              {t("looks_continue")} <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}