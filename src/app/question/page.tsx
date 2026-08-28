"use client";

import { ArrowRight, Check, ClipboardList, Pencil, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type RtiState } from "@/src/lib/types";
import { readRtiState, writeRtiState } from "@/src/lib/client-state";
import { useLanguage } from "../../context/LanguageContext";

export default function QuestionPage() {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [state, setState] = useState<RtiState | null>(null);
  const [requests, setRequests] = useState<string[]>([]);
  const defaultRequests = [t("request_1"), t("request_2"), t("request_3"), t("request_4")];

  useEffect(() => {
    const currentState = readRtiState();
    // Hydrate browser-only localStorage state after the initial render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(currentState);
    if (currentState?.restructuredRequests?.length) {
      setRequests(currentState.restructuredRequests);
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
            {t("sahi_sawal")}
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-14 lg:py-20">
          <div className="mb-7 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <ShieldCheck size={17} />
            {t("screen3_badge")}
          </div>
          <h1 className="max-w-3xl text-4xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-6xl">
            {t("structured_requests_title")}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#173c38]/70">
            {t("structured_requests_desc")}
          </p>

          <div className="mt-10 space-y-3">
            {(requests.length ? requests : defaultRequests).map((request, index) => (
              <div key={index} className="flex items-center gap-4 rounded-2xl border border-[#173c38]/10 bg-[#fffdf8] px-5 py-4 shadow-[0_12px_30px_rgba(23,60,56,0.06)]">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e5eee4] text-sm font-bold text-[#27745e]">
                  {index + 1}
                </span>
                {isEditing ? (
                  <input
                    aria-label={`Record request ${index + 1}`}
                    value={request}
                    onChange={(e) =>
                      setRequests((current) =>
                        current.map((item, i) => (i === index ? e.target.value : item))
                      )
                    }
                    className="min-w-0 flex-1 border-b border-[#c45b35] bg-transparent py-1 text-base leading-7 outline-none"
                  />
                ) : (
                  <p className="text-base leading-7 font-medium">{request}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => (isEditing ? handleDoneEditing() : setIsEditing(true))}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#173c38]/20 px-5 py-3 text-sm font-bold transition hover:border-[#173c38] hover:bg-white"
            >
              {isEditing ? <Check size={16} /> : <Pencil size={16} />}
              {isEditing ? t("done_editing") : t("edit")}
            </button>
            <Link
              href="/authority"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c45b35] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#a94728]"
            >
              {t("use_records")} <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
