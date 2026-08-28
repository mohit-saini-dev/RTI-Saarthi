"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ClipboardList, ShieldCheck } from "lucide-react";
import { type RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";
import { useLanguage } from "../../context/LanguageContext";

export default function AuthorityPage() {
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
            {t("authority_match")}
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-14 lg:py-20">
          <div className="mb-7 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <ShieldCheck size={17} />
            {t("screen4_badge")}
          </div>

          <h1 className="max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.035em] sm:text-6xl">
            {t("authority_title")}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#173c38]/70">
            {t("authority_desc")}
          </p>

          <div className="mt-10 rounded-2xl border border-[#173c38]/10 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c45b35]">
                {t("matched_authority")}
              </span>
              <span className="rounded-full bg-[#e5eee4] px-3 py-1 text-xs font-bold text-[#27745e]">
                {t("confidence")}: {state?.authorityConfidence || 96}%
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-[#173c38]">
              {state?.publicAuthority || t("default_authority")}
            </h2>

            <p className="mt-3 text-sm text-[#173c38]/70">
                {t("jurisdiction")}: <span className="font-semibold">{state?.jurisdiction === "State" ? t("state") : state?.jurisdiction === "Municipal" ? t("municipal") : t("central")}</span>
            </p>

            <div className="mt-6 border-t border-[#173c38]/10 pt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#173c38]/50">{t("why_match")}</p>
              <p className="mt-1 text-sm text-[#173c38]/80">
                {state?.suitabilityReason || t("authority_reason")}
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <Link
              href="/health-check"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c45b35] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a94728]"
            >
              {t("looks_continue")} <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
