"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle, Clock, ClipboardList, ShieldCheck } from "lucide-react";
import { type RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";
import { useLanguage } from "../../context/LanguageContext";

export default function JourneyPage() {
  const { t } = useLanguage();
  const [state, setState] = useState<RtiState | null>(null);

  useEffect(() => {
    // Hydrate browser-only localStorage state after the initial render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(readRtiState());
  }, []);

  const authority = state?.publicAuthority || t("default_authority");
  const registrationNumber = state?.registrationNumber || "DEMO-RTI/2026/009142";

  const steps = [
    {
      title: t("step_submitted"),
      desc: t("timeline_desc1").replace("{authority}", authority).replace("{registrationNumber}", registrationNumber),
      status: "completed",
      day: t("day0"),
    },
    {
      title: t("step_assigned"),
      desc: t("timeline_desc2").replace("{authority}", authority),
      status: "completed",
      day: t("day3"),
    },
    {
      title: t("step_scrutiny"),
      desc: t("timeline_desc3"),
      status: "in_progress",
      day: t("day12"),
    },
    {
      title: t("step_response"),
      desc: t("timeline_desc4"),
      status: "pending",
      day: t("day30"),
    },
    {
      title: t("step_appeal_window"),
      desc: t("timeline_desc5"),
      status: "pending",
      day: t("day31_60"),
    },
  ];

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
              <p className="text-xs text-[#173c38]/60">{t("workflow_subtitle")}</p>
            </div>
          </Link>
          <div className="hidden items-center gap-2 text-xs font-semibold text-[#173c38]/60 sm:flex">
            <ShieldCheck size={16} />
            {t("lifecycle_tracker")}
          </div>
        </header>

        {/* Content */}
        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-12 pb-28 lg:py-16 lg:pb-28">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <Clock size={17} />
            {t("screen7_badge")}
          </div>

          <h1 className="max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.035em] sm:text-6xl">
            {t("journey_title")}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#173c38]/70">
            {t("journey_desc")} {authority}.
          </p>
          <h2 className="mt-2 text-xl font-bold">{t("submitted_to")} {authority}</h2>

          {/* Timeline Cards */}
          <div className="mt-10 space-y-4">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-2xl border border-[#173c38]/10 bg-[#fffdf8] p-5 shadow-sm"
              >
                <div className="mt-0.5">
                  {step.status === "completed" ? (
                    <CheckCircle2 className="text-[#27745e]" size={22} />
                  ) : step.status === "in_progress" ? (
                    <Clock className="text-[#c45b35]" size={22} />
                  ) : (
                    <Circle className="text-[#173c38]/30" size={22} />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#173c38]">{step.title}</h3>
                    <span className="rounded-full bg-[#173c38]/5 px-2.5 py-0.5 text-xs font-bold text-[#173c38]/70">
                      {step.day}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[#173c38]/70">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Action */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link
              href="/review"
              className="flex min-h-12 items-center justify-center rounded-xl border border-[#173c38]/20 bg-white px-6 py-3 text-sm font-bold transition hover:border-[#173c38]"
            >
              {t("back_review")}
            </Link>
            <Link
              href="/appeal"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c45b35] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#a94728]"
            >
              {t("view_appeal")} <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
