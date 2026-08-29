"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ClipboardList, Download, Copy, Check, ShieldCheck, FileCheck2 } from "lucide-react";
import { type RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";
import { useLanguage } from "../../context/LanguageContext";

export default function ReviewPage() {
  const { t } = useLanguage();
  const [state, setState] = useState<RtiState | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Hydrate browser-only localStorage state after the initial render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(readRtiState());
  }, []);

  const publicAuthority =
    state?.publicAuthority ||
    (state?.jurisdiction === "Municipal"
      ? "Municipal Corporation / Local Body"
      : state?.jurisdiction === "State"
      ? "State Public Authority"
      : "Central Public Authority Concerned");

  const jurisdiction = state?.jurisdiction || "Central";

  const neutralDefaultRequests = [
    "Certified true copies of administrative approvals, sanction orders, and file notings related to the stated matter.",
    "Authenticated statement of budget allocations, expenditure ledgers, and official utilization certificates.",
    "Certified copies of inspection logs, progress audit records, and register entries under Section 2(f).",
    "Designation and official contact information of the designated nodal executive officer."
  ];

  const requests =
    state?.restructuredRequests && state.restructuredRequests.length > 0
      ? state.restructuredRequests
      : neutralDefaultRequests;

  const fullApplicationText = `APPLICATION UNDER SECTION 6(1) OF THE RIGHT TO INFORMATION ACT, 2005
[STRUCTURED PRE-FILING DRAFT — PRODUCED BY RTI SAARTHI]

To:
The Central/State Public Information Officer (CPIO/SPIO),
${publicAuthority}
Jurisdiction: ${jurisdiction} Government

Subject: Request for certified records under Section 6(1) read with Section 2(f) of the RTI Act, 2005.

Particulars of Information / Records Required:
${requests.map((item, index) => `(${index + 1}) ${item}`).join("\n")}

Statutory Application Fee: ₹10 (Standard Fee under RTI Rules, 2012)
Applicant: [Citizen / Registered User]
Date: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}

Note under Section 6(2): The applicant is not required to give any reason for requesting the information or any other personal details except those necessary for contacting him/her.`;

  const handleCopyApplication = async () => {
    try {
      await navigator.clipboard.writeText(fullApplicationText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy application: ", err);
    }
  };

  const handleDownloadApplication = () => {
    const file = new Blob([fullApplicationText], { type: "text/plain;charset=utf-8" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = `RTI_Application_${publicAuthority.replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  };

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
            {t("review_submit")}
          </div>
        </header>

        {/* Content */}
        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-12 pb-28">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <FileCheck2 size={17} />
            {t("screen6_badge")}
          </div>

          <h1 className="max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.035em] sm:text-5xl">
            {t("review_title")}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#173c38]/70">
            {t("review_desc")}
          </p>

          {/* Review Box */}
          <div className="mt-8 rounded-2xl border border-[#173c38]/10 bg-[#fffdf8] p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#173c38]/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#c45b35]">
                  Target Public Authority
                </span>
                <p className="mt-1 text-xl font-bold text-[#173c38]">{publicAuthority}</p>
                <p className="text-xs text-[#173c38]/60">Jurisdiction: {jurisdiction}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#e5eee4] px-3 py-1 text-xs font-bold text-[#27745e]">
                  Fee: ₹10 (Statutory)
                </span>
                <button
                  type="button"
                  onClick={handleCopyApplication}
                  className="flex items-center gap-1.5 rounded-xl border border-[#173c38]/20 bg-white px-3.5 py-2 text-xs font-semibold text-[#173c38] transition-colors hover:bg-[#173c38]/5"
                >
                  {copied ? <Check size={14} className="text-[#27745e]" /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy Draft"}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadApplication}
                  className="flex items-center gap-1.5 rounded-xl bg-[#173c38] px-3.5 py-2 text-xs font-semibold text-[#f5f1e8] transition-opacity hover:opacity-90"
                >
                  <Download size={14} /> {t("download_application")}
                </button>
              </div>
            </div>

            {/* Dynamic Requests List */}
            <div className="mt-6 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#173c38]/60 block mb-2">
                Section 2(f) Admissible Demand Points
              </span>
              {requests.map((req, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-[#173c38]/10 bg-white p-4"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#173c38]/5 text-xs font-bold text-[#173c38]">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-[#173c38]">{req}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link
              href="/health-check"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#173c38]/20 px-6 text-sm font-semibold text-[#173c38] transition-colors hover:bg-[#173c38]/5"
            >
              <ArrowLeft size={16} /> Back to Health Check
            </Link>
            <Link
              href="/journey"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c45b35] px-8 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              {t("proceed_journey")} <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}