"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, ClipboardList, LoaderCircle, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSampleQuestion, useLanguage } from "../context/LanguageContext";

const sampleQuestionKeys = ["sample_chip_road", "sample_chip_pension", "sample_chip_scholarship", "sample_chip_water"] as const;

function validateQuestion(question: string) {
  const hasQuestionShape = question.trim().length >= 12;

  if (hasQuestionShape) {
    return { isValid: true, label: "question_clear" as const, detail: "validation_clear_detail" as const };
  }

  return { isValid: false, label: "need_more_detail" as const, detail: "need_more_detail" as const };
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const validation = validateQuestion(question);
  const router = useRouter();
  const { language, t } = useLanguage();

  useEffect(() => {
    const languageCodes = ["en", "hi", "bn", "te", "mr", "ta", "gu", "kn", "ml", "pa"] as const;
    const matchingSampleKey = sampleQuestionKeys.find((sampleQuestionKey) =>
      languageCodes.some((languageCode) => question.trim() === getSampleQuestion(languageCode, sampleQuestionKey))
    );

    if (matchingSampleKey) {
      // Keep a selected sample aligned with the newly selected language.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuestion(getSampleQuestion(language, matchingSampleKey));
    }
  }, [language, question]);

  async function continueToUnderstand() {
    if (!validation.isValid || isAnalyzing) return;
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question.trim() }),
      });
      const data = await response.json();
      localStorage.setItem("rti_current_state", JSON.stringify(data));
      router.push("/understand");
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f1e8] text-[#173c38]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between border-b border-[#173c38]/15 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#173c38] text-[#f5f1e8]"><ClipboardList size={20} strokeWidth={1.8} /></div>
            <div><p className="text-sm font-bold tracking-[0.16em] uppercase">{t("brand_title")}</p><p className="text-xs text-[#173c38]/60">{t("header_subtitle")}</p></div>
          </div>
          <div className="hidden items-center gap-2 text-xs font-semibold text-[#173c38]/60 sm:flex"><ShieldCheck size={16} /> {t("checks_enabled")}</div>
        </header>
        <section className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:py-20">
          <div className="max-w-2xl">
            <div className="mb-7 flex items-center gap-2 text-sm font-semibold text-[#c45b35]"><Sparkles size={17} /> {t("screen_1_badge")}</div>
            <h1 className="max-w-xl text-5xl leading-[0.98] font-semibold tracking-[-0.04em] sm:text-7xl">{t("hero_title")}</h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-[#173c38]/70">{t("hero_sub")}</p>
            <div className="mt-10 max-w-xl">
              <label htmlFor="question" className="mb-3 block text-sm font-bold">{t("input_label")}</label>
              <div className="rounded-2xl border border-[#173c38]/20 bg-white p-2 shadow-[0_18px_45px_rgba(23,60,56,0.08)] focus-within:border-[#c45b35] focus-within:ring-4 focus-within:ring-[#c45b35]/10">
                <textarea id="question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={t("placeholder")} rows={3} className="w-full resize-none bg-transparent px-4 py-3 text-base leading-7 outline-none placeholder:text-[#173c38]/35" />
                <div className="flex items-center justify-between border-t border-[#173c38]/10 px-3 pt-3"><span className="text-xs text-[#173c38]/45">{question.length} / 3000 characters</span><button type="button" disabled={!validation.isValid || isAnalyzing} onClick={continueToUnderstand} className="flex items-center gap-2 rounded-xl bg-[#c45b35] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#a94728] disabled:cursor-not-allowed disabled:opacity-40">{isAnalyzing ? <><LoaderCircle className="animate-spin" size={16} /> {t("btn_analyze")}</> : <>{t("btn_continue")} <ArrowRight size={16} /></>}</button></div>
              </div>
              <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-[#e5eee4] px-4 py-3 text-sm">{validation.isValid ? <CheckCircle2 className="mt-0.5 shrink-0 text-[#27745e]" size={17} /> : <ShieldCheck className="mt-0.5 shrink-0 text-[#c45b35]" size={17} />}<div><p className="font-bold">{t(validation.label)}</p><p className="mt-0.5 leading-5 text-[#173c38]/65">{t(validation.detail)}</p></div></div>
            </div>
            <div className="mt-8"><p className="mb-3 text-xs font-bold tracking-[0.12em] text-[#173c38]/50 uppercase">{t("try_sample")}</p><div className="flex flex-wrap gap-2">{sampleQuestionKeys.map((sampleQuestionKey) => <button key={sampleQuestionKey} type="button" onClick={() => setQuestion(t(sampleQuestionKey))} className="rounded-full border border-[#173c38]/20 bg-transparent px-3.5 py-2 text-left text-xs font-semibold text-[#173c38]/75 transition hover:border-[#c45b35] hover:bg-white">{t(sampleQuestionKey)}</button>)}</div></div>
          </div>
          <aside className="relative hidden min-h-[460px] lg:block"><div className="absolute inset-0 rounded-[2rem] bg-[#d9e6d5]" /><div className="absolute top-10 right-10 left-10 rounded-2xl border border-[#173c38]/10 bg-[#fffdf8] p-6 shadow-[0_24px_50px_rgba(23,60,56,0.12)]"><div className="flex items-center justify-between border-b border-[#173c38]/10 pb-5"><div><p className="text-xs font-bold tracking-[0.14em] text-[#c45b35] uppercase">{t("your_records")}</p><h2 className="mt-1 text-xl font-semibold">{t("recent_inquiries")}</h2></div><span className="rounded-full bg-[#e5eee4] px-2.5 py-1 text-xs font-bold text-[#27745e]">{t("records_count")}</span></div><div className="space-y-2 pt-4"><div className="rounded-xl bg-[#f5f1e8] px-4 py-3"><p className="text-sm font-bold">{t("item_road_title")}</p><p className="mt-0.5 text-xs text-[#173c38]/55">{t("item_road_dept")}</p></div><div className="rounded-xl bg-[#f5f1e8] px-4 py-3"><p className="text-sm font-bold">{t("item_scholarship_title")}</p><p className="mt-0.5 text-xs text-[#173c38]/55">{t("item_scholarship_dept")}</p></div><div className="rounded-xl bg-[#f5f1e8] px-4 py-3"><p className="text-sm font-bold">{t("item_water_title")}</p><p className="mt-0.5 text-xs text-[#173c38]/55">{t("item_water_dept")}</p></div></div></div><div className="absolute right-8 bottom-10 left-8 rounded-2xl bg-[#173c38] p-5 text-[#f5f1e8]"><p className="text-xs font-bold tracking-[0.14em] text-[#c8dfc3] uppercase">{t("built_for_clarity")}</p><p className="mt-2 text-lg leading-7">{t("clarity_card")}</p></div></aside>
        </section>
      </div>
    </main>
  );
}
