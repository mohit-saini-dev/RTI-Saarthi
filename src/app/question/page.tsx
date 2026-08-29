"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ClipboardList, Pencil, ShieldCheck, Sparkles } from "lucide-react";
import { type RtiState } from "@/src/lib/types";
import { readRtiState, writeRtiState } from "@/src/lib/client-state";
import { useLanguage } from "../../context/LanguageContext";

export default function QuestionPage() {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [state, setState] = useState<RtiState | null>(null);
  const [requests, setRequests] = useState<string[]>([]);

  // Domain-neutral statutory fallbacks to prevent hardcoded demo leaks
  const neutralDefaultRequests = [
    "Certified true copies of administrative approvals, sanction orders, and file notings related to the stated project/matter.",
    "Authenticated statement of total budget allocated, funds released, and official utilization certificates submitted to date.",
    "Certified copies of inspection logs, field inquiry reports, and completion records entered in the official register.",
    "Name, official designation, and contact details of the competent authority responsible for executing this public action."
  ];

  useEffect(() => {
    // Hydrate browser-only localStorage state after initial render
    // eslint-disable-next-line react-hooks/set-state-in-effect
    const currentState = readRtiState();
    setState(currentState);

    if (currentState?.restructuredRequests && currentState.restructuredRequests.length > 0) {
      setRequests(currentState.restructuredRequests);
    } else {
      setRequests(neutralDefaultRequests);
    }
  }, []);

  const handleDoneEditing = () => {
    setIsEditing(false);
    if (state) {
      const updated = { ...state, restructuredRequests: requests };
      setState(updated);
      writeRtiState(updated);
    }
  };

  const displayRequests = requests.length > 0 ? requests : neutralDefaultRequests;

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
            {t("sahi_sawal")}
          </div>
        </header>

        {/* Content */}
        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-12 pb-28">
          {/* Unified Screen Indicator Badge */}
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <Sparkles size={17} />
            <span>✦ Screen 3: Sahi Sawal Engine (Section 2(f) Records)</span>
          </div>

          <h1 className="max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.035em] sm:text-5xl">
            {t("structured_requests_title")}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#173c38]/70">
            {t("structured_requests_desc")}
          </p>

          {/* Restructured Legal Requests */}
          <div className="mt-10 space-y-3">
            {displayRequests.map((request, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-2xl border border-[#173c38]/10 bg-white p-5 shadow-sm"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e5eee4] text-xs font-bold text-[#27745e]">
                  {index + 1}
                </span>
                {isEditing ? (
                  <input
                    aria-label={`Record request ${index + 1}`}
                    value={request}
                    onChange={(e) => {
                      const updated = [...displayRequests];
                      updated[index] = e.target.value;
                      setRequests(updated);
                    }}
                    className="min-w-0 flex-1 border-b border-[#c45b35] bg-transparent py-1 text-base font-medium text-[#173c38] focus:outline-none"
                  />
                ) : (
                  <p className="text-base font-medium leading-7 text-[#173c38]">
                    {request}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Edit / Customization Bar */}
          <div className="mt-6 flex items-center justify-between rounded-xl border border-[#173c38]/10 bg-[#fffdf8] px-4 py-3 text-xs text-[#173c38]/70">
            <span>
              {isEditing
                ? "Editing mode active: Make statutory adjustments as required."
                : "PIOs reject general questions. These queries explicitly demand certified material records under Section 2(f)."}
            </span>
            <button
              type="button"
              onClick={() => (isEditing ? handleDoneEditing() : setIsEditing(true))}
              className="flex items-center gap-1.5 font-bold text-[#c45b35] hover:opacity-80 transition"
            >
              {isEditing ? <Check size={15} /> : <Pencil size={15} />}
              {isEditing ? t("done_editing") : t("edit")}
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link
              href="/understand"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#173c38]/20 px-6 text-sm font-semibold text-[#173c38] transition-colors hover:bg-[#173c38]/5"
            >
              <ArrowLeft size={16} /> Back
            </Link>

            <Link
              href="/authority"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c45b35] px-8 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              {t("use_records")} <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}