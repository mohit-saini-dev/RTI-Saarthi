"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ClipboardList, ShieldCheck } from "lucide-react";
import { type RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";
import { useLanguage } from "../../context/LanguageContext";

export default function UnderstandPage() {
  const { t } = useLanguage();
  const [state, setState] = useState<RtiState | null>(null);

  useEffect(() => {
    // Hydrate browser-only localStorage state after the initial render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
              <p className="text-xs text-[#173c38]/60">{t("workflow_subtitle")}</p>
            </div>
          </Link>
          <div className="hidden items-center gap-2 text-xs font-semibold text-[#173c38]/60 sm:flex">
            <ShieldCheck size={16} />
            {t("route_guard")}
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-14 lg:py-20">
          <div className="mb-7 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <ShieldCheck size={17} />
            {t("screen2_badge")}
          </div>

          <div className="rounded-2xl border border-[#173c38]/10 bg-white p-6 shadow-sm">
            <p className="text-lg text-[#173c38]/80 italic">
              &ldquo;{state?.question || t("default_question")}&rdquo;
            </p>
          </div>

          <h1 className="mt-8 text-4xl leading-[1.08] font-semibold tracking-[-0.035em] text-[#173c38] sm:text-6xl">
            {state?.goal || t("default_goal")}
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#173c38]/70">
            {state?.suitabilityReason ||
              t("default_reason")}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col justify-between rounded-2xl border border-[#173c38]/15 bg-[#fffdf8] p-6 shadow-sm">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#c45b35]">{t("information_route")}</span>
                <h3 className="mt-2 text-xl font-bold">{t("find_happened")}</h3>
                <p className="mt-2 text-sm text-[#173c38]/70">
                  {t("information_route_desc")}
                </p>
              </div>
              <Link
                href="/question"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#c45b35] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#a94728]"
              >
                {t("find_happened_button")} <ArrowRight size={17} />
              </Link>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-[#173c38]/15 bg-[#fffdf8] p-6 shadow-sm">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#27745e]">{t("resolution_route")}</span>
                <h3 className="mt-2 text-xl font-bold">{t("file_grievance")}</h3>
                <p className="mt-2 text-sm text-[#173c38]/70">
                  {t("resolution_route_desc")}
                </p>
              </div>
              <a
                href="https://pgportal.gov.in"
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-[#173c38]/20 px-5 py-3 text-sm font-bold transition hover:bg-white"
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
