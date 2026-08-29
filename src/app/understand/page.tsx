"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ClipboardList, ShieldCheck, Sparkles } from "lucide-react";
import { type RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";
import { useLanguage } from "../../context/LanguageContext";

export default function UnderstandPage() {
  const { t } = useLanguage();
  const [state, setState] = useState<RtiState | null>(null);

  useEffect(() => {
    setState(readRtiState());
  }, []);

  const question =
    state?.question ||
    "Inquiry regarding public authority records and administrative files.";

  const goal =
    state?.goal ||
    "Obtain certified administrative records, sanction orders, and file progress.";

  const suitabilityReason =
    state?.suitabilityReason ||
    "Under Section 2(f) of the RTI Act, citizens have the right to access recorded material, including memos, files, contracts, and official decisions.";

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#173c38]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-12">
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
            {t("route_guard")}
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-12 pb-28">
          {/* Screen Number Badge */}
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <Sparkles size={16} />
            <span>✦ Screen 2: Understand your goal</span>
          </div>

          <div className="rounded-2xl border border-[#173c38]/10 bg-white p-6 shadow-sm">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#173c38]/60 mb-1">
              Your Input Query
            </span>
            <p className="text-lg italic text-[#173c38]/90">
              &ldquo;{question}&rdquo;
            </p>
          </div>

          <h1 className="mt-8 max-w-3xl text-3xl font-semibold leading-[1.15] tracking-[-0.035em] sm:text-4xl">
            {goal}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#173c38]/80 sm:text-lg">
            {suitabilityReason}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col justify-between rounded-2xl border border-[#173c38]/15 bg-[#fffdf8] p-6 shadow-sm">
              <div>
                <span className="text-xs font-bold tracking-wider text-[#c45b35] uppercase">
                  Route 1: Statutory Records
                </span>
                <h3 className="mt-2 text-xl font-bold">{t("find_happened")}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#173c38]/70">
                  {t("information_route_desc")}
                </p>
              </div>
              <Link
                href="/question"
                className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c45b35] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                {t("find_happened_button")} <ArrowRight size={17} />
              </Link>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-[#173c38]/15 bg-[#fffdf8] p-6 shadow-sm">
              <div>
                <span className="text-xs font-bold tracking-wider text-[#27745e] uppercase">
                  Route 2: Grievance Resolution
                </span>
                <h3 className="mt-2 text-xl font-bold">{t("file_grievance")}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#173c38]/70">
                  {t("resolution_route_desc")}
                </p>
              </div>
              <a
                href="https://pgportal.gov.in"
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#173c38]/20 bg-white px-5 py-3 text-sm font-semibold text-[#173c38] transition-colors hover:bg-[#173c38]/5"
              >
                {t("file_grievance_button")}
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}