"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, ClipboardList, Copy, Download, ShieldAlert, ShieldCheck } from "lucide-react";
import { type RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";
import { useLanguage } from "../../context/LanguageContext";

export default function AppealPage() {
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
      ? "Municipal Corporation / Local Urban Body"
      : state?.jurisdiction === "State"
      ? "State Public Authority"
      : "Central Public Information Officer");

  const question =
    state?.question ||
    state?.goal ||
    "Certified records request under Section 2(f)";

  const registrationNumber =
    state?.registrationNumber || `DEMO-RTI/${new Date().getFullYear()}/009142`;

  const requests =
    state?.restructuredRequests && state.restructuredRequests.length > 0
      ? state.restructuredRequests
      : [
          "Certified copies of administrative sanction orders and project approvals.",
          "Authenticated fund allocation ledgers and utilization certificates.",
          "Physical progress reports, inspection registers, and measurement entries.",
          "Designation and contact details of the nodal executive officer."
        ];

  const appealDraft = `FORM OF FIRST APPEAL UNDER SECTION 19(1) OF THE RTI ACT, 2005 [DEMO PROTOTYPE]
The statutory period of 30 days prescribed under Section 7(1) has expired. I have not received any response.

To,
The First Appellate Authority (FAA), ${publicAuthority}
Jurisdiction: ${state?.jurisdiction || "Central"} Government

Subject: First Appeal under Section 19(1) against non-receipt of information within 30 days under Section 7(1).

Reference: RTI application concerning "${question}"
Registration reference: ${registrationNumber}

Respected Sir/Madam,

I, [Appellant Name], resident of [Full Postal Address], submit this First Appeal under Section 19(1) of the RTI Act, 2005.

The statutory period of 30 days prescribed under Section 7(1) has expired. I have not received any communication or decision from the designated PIO.

Information requested:
${requests.map((req, i) => `  ${i + 1}. ${req}`).join("\n")}

PRAYER FOR RELIEF UNDER SECTION 19(1):
I respectfully request that the First Appellate Authority:
1. Admit and decide this appeal under Section 19(1);
2. Direct the CPIO/SPIO to furnish complete, point-wise certified records immediately;
3. Invoke Section 7(6) to furnish all information free of cost on account of the delay;
4. Where any information is denied, provide a point-wise speaking order citing the specific statutory exemption under Section 8.

I confirm that the facts stated above are true to the best of my knowledge. A copy of the original RTI request is enclosed.

Place: ____________________
Date: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}

Yours faithfully,

[Appellant Name]
[Postal Address]
[Email / Mobile Number]
[Signature]`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(appealDraft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([appealDraft], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `First_Appeal_${publicAuthority.replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
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
            {t("appeal_guidance")}
          </div>
        </header>

        {/* Content */}
        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-12">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <ShieldAlert size={17} />
            {t("screen8_badge")}
          </div>

          <h1 className="max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.035em] sm:text-5xl">
            {t("appeal_title")}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#173c38]/70">
            {t("appeal_desc")}
          </p>

          {/* Calibrated Guidance Timeline */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#173c38]/10 bg-white p-5 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c45b35]">
                {t("response_period")}
              </span>
              <h4 className="mt-1 text-base font-bold">{t("standard_30")}</h4>
              <p className="mt-1 text-xs text-[#173c38]/70">{t("response_period_desc")}</p>
            </div>
            <div className="rounded-2xl border border-[#173c38]/10 bg-white p-5 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#27745e]">
                First Appeal Window
              </span>
              <h4 className="mt-1 text-base font-bold">{t("first_appellate_authority")}</h4>
              <p className="mt-1 text-xs text-[#173c38]/70">{publicAuthority}</p>
            </div>
            <div className="rounded-2xl border border-[#173c38]/10 bg-white p-5 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#173c38]">
                Second Appeal Window
              </span>
              <h4 className="mt-1 text-base font-bold">{t("information_commission")}</h4>
              <p className="mt-1 text-xs text-[#173c38]/70">{t("second_appeal_desc")}</p>
            </div>
          </div>

          <p className="mt-3 text-xs italic text-[#173c38]/60">
            {t("informational_disclaimer")}
          </p>

          {/* AI Assisted Draft Box */}
          <div className="mt-6 rounded-2xl border border-[#173c38]/10 bg-[#fffdf8] p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#173c38]/10 pb-4">
              <div>
                <span className="text-sm font-bold text-[#173c38]">{t("draft_title")}</span>
                <p className="text-xs text-[#173c38]/60">{t("draft_desc")}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-xl border border-[#173c38]/20 bg-white px-3.5 py-2 text-xs font-semibold text-[#173c38] transition-colors hover:bg-[#173c38]/5"
                >
                  {copied ? <Check size={14} className="text-[#27745e]" /> : <Copy size={14} />}
                  {copied ? t("copied") : t("copy_draft")}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 rounded-xl bg-[#173c38] px-3.5 py-2 text-xs font-semibold text-[#f5f1e8] transition-opacity hover:opacity-90"
                >
                  <Download size={14} /> {t("download_txt")}
                </button>
              </div>
            </div>

            <textarea
              readOnly
              value={appealDraft}
              rows={14}
              className="mt-4 w-full resize-none rounded-xl border border-[#173c38]/10 bg-white p-4 font-mono text-xs leading-relaxed text-[#173c38] focus:outline-none"
            />
          </div>

          {/* Navigation */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link
              href="/review"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#173c38]/20 px-6 text-sm font-semibold text-[#173c38] transition-colors hover:bg-[#173c38]/5"
            >
              <ArrowLeft size={16} /> {t("back_review")}
            </Link>
            <Link
              href="/"
              className="flex min-h-12 items-center justify-center rounded-xl bg-[#c45b35] px-8 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              {t("start_new")}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}