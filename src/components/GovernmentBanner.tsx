"use client";

import { Info, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLanguage, type LanguageCode } from "../context/LanguageContext";

const languages: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "English" }, { code: "hi", label: "हिन्दी (Hindi)" }, { code: "bn", label: "বাংলা (Bengali)" }, { code: "te", label: "తెలుగు (Telugu)" }, { code: "mr", label: "मराठी (Marathi)" }, { code: "ta", label: "தமிழ் (Tamil)" }, { code: "gu", label: "ગુજરાતી (Gujarati)" }, { code: "kn", label: "ಕನ್ನಡ (Kannada)" }, { code: "ml", label: "മലയാളം (Malayalam)" }, { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
];

export default function GovernmentBanner() {
  const { language, setLanguage, t } = useLanguage();
  const [fontSize, setFontSize] = useState<"small" | "normal" | "large">("normal");
  const [showAbout, setShowAbout] = useState(false);

  function changeFontSize(size: "small" | "normal" | "large") {
    setFontSize(size);
    document.documentElement.dataset.fontSize = size;
  }

  return (
    <>
      <div className="bg-[#173c38] text-[#f5f1e8]">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-5 gap-y-2 px-6 py-2 text-xs sm:px-10 lg:px-14">
          <div className="flex items-center gap-2 font-semibold tracking-[0.08em] uppercase"><span className="size-1.5 rounded-full bg-[#c8dfc3]" /> {t("portal_title")}</div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2"><span className="sr-only">Choose language</span><select value={language} onChange={(event) => setLanguage(event.target.value as LanguageCode)} className="cursor-pointer bg-transparent font-semibold outline-none">{languages.map((item) => <option key={item.code} value={item.code} className="text-[#173c38]">{item.label}</option>)}</select></label>
            <div className="flex items-center gap-1 border-l border-white/20 pl-4" aria-label="Font size"><button type="button" onClick={() => changeFontSize("small")} aria-label="Decrease font size" className={`px-1 font-semibold ${fontSize === "small" ? "text-[#c8dfc3]" : "text-white/70"}`}>A-</button><button type="button" onClick={() => changeFontSize("normal")} aria-label="Normal font size" className={`px-1 font-semibold ${fontSize === "normal" ? "text-[#c8dfc3]" : "text-white/70"}`}>A</button><button type="button" onClick={() => changeFontSize("large")} aria-label="Increase font size" className={`px-1 font-semibold ${fontSize === "large" ? "text-[#c8dfc3]" : "text-white/70"}`}>A+</button></div>
            <button type="button" onClick={() => setShowAbout(true)} className="hidden font-semibold text-[#c8dfc3] underline-offset-4 hover:underline sm:block">{t("about")}</button>
          </div>
        </div>
      </div>
      <div className="overflow-hidden border-b border-[#c45b35]/25 bg-[#f3dfc9] text-[#173c38]" role="status">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-2 text-xs sm:px-10 lg:px-14"><span className="shrink-0 rounded-full bg-[#c45b35] px-2.5 py-1 font-bold tracking-[0.08em] text-white uppercase">{t("live_alert_badge")}</span><div className="min-w-0 overflow-hidden"><div className="animate-[marquee_32s_linear_infinite] whitespace-nowrap font-medium">{t("live_alert")}&nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;{t("live_alert")}</div></div></div>
      </div>
      {showAbout && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#173c38]/40 px-6" role="dialog" aria-modal="true" aria-labelledby="about-dialog-title"><div className="w-full max-w-lg rounded-2xl border border-[#173c38]/10 bg-[#fffdf8] p-6 shadow-[0_25px_60px_rgba(23,60,56,0.2)] sm:p-8"><div className="flex items-start justify-between"><div><p className="text-xs font-bold tracking-[0.14em] text-[#c45b35] uppercase">{t("about")}</p><h2 id="about-dialog-title" className="mt-2 text-2xl font-semibold">{t("brand_title")}</h2></div><button type="button" onClick={() => setShowAbout(false)} aria-label="Close about dialog" className="rounded-lg p-1 text-[#173c38]/60 hover:bg-[#e5eee4]"><X size={20} /></button></div><p className="mt-5 leading-7 text-[#173c38]/70">{t("clarity_card")}</p><Link href="/about" onClick={() => setShowAbout(false)} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#c45b35] hover:underline"><Info size={16} /> {t("about")}</Link></div></div>}
    </>
  );
}
