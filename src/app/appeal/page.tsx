"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, ClipboardList, Copy, Download, ShieldAlert, ShieldCheck } from "lucide-react";
import { type RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";

export default function AppealPage() {
  const [state, setState] = useState<RtiState | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Hydrate browser-only localStorage state after the initial render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(readRtiState());
  }, []);

  const publicAuthority = state?.publicAuthority || "Ministry of Education / Department of Higher Education";
  const question = state?.question || "National merit scholarship disbursement delay & sanction order";
  const registrationNumber = state?.registrationNumber || "DEMO-RTI/2026/009142";
  const requests =
    state?.restructuredRequests && state.restructuredRequests.length > 0
      ? state.restructuredRequests
      : [
          "Certified copy of the scholarship sanction order and release notification for FY 2025-26.",
          "Official criteria and beneficiary disbursement list for National Merit Scholarship.",
          "Certified file notings regarding fund allocation and disbursement timelines.",
          "Name and designation of the Public Information Officer / Section Officer handling student scholarship disbursements.",
        ];

    const appealDraft = `FORM OF FIRST APPEAL UNDER SECTION 19(1) OF THE RTI ACT, 2005 [DEMO PROTOTYPE]

  To,
  The First Appellate Authority (FAA), ${publicAuthority}

  Subject: First Appeal under Section 19(1) against non-receipt of information within 30 days under Section 7(1) of the RTI Act, 2005.

  Reference: RTI application concerning "${question}"
  Registration reference: ${registrationNumber}

  Respected Sir/Madam,

  I, [Appellant Name], resident of [Full Postal Address], submit this First Appeal under Section 19(1) of the Right to Information Act, 2005. I filed the above RTI application with the Central Public Information Officer of ${publicAuthority}, seeking the public records listed below.

  The statutory period of 30 days prescribed under Section 7(1) has expired. I have not received the requested information, a decision refusing access, or any lawful communication explaining the delay. Accordingly, the information is deemed to have been refused for the purpose of this appeal. The requested material concerns existing public records within Section 2(f), including scholarship sanctions, allocation records, file notings, and disbursement records.

  Information requested:
  ${requests.map((req, i) => `   ${i + 1}. ${req}`).join("\n")}

  PRAYER FOR RELIEF UNDER SECTION 19(1)

  I respectfully request that the First Appellate Authority:
  1. Admit and decide this appeal under Section 19(1);
  2. Direct the CPIO to furnish complete, point-wise information and certified copies of the records requested above, without further delay; and
  3. Where any information is denied, provide a point-wise speaking order citing the specific exemption and appellate remedy relied upon.

  I confirm that the facts stated above are true to the best of my knowledge. A copy of the original RTI application and proof of submission/receipt may be enclosed with this appeal.

  Place: ____________________
  Date:  ____________________

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
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-14">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#173c38]/15 pb-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#173c38] text-[#f5f1e8]">
              <ClipboardList size={20} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-sm font-bold tracking-[0.16em] uppercase">RTI Saarthi</p>
              <p className="text-xs text-[#173c38]/60">Citizen Intelligence &amp; RTI Filing Layer</p>
            </div>
          </Link>
          <div className="hidden items-center gap-2 text-xs font-semibold text-[#173c38]/60 sm:flex">
            <ShieldCheck size={16} />
            Appeal Guidance
          </div>
        </header>

        {/* Content */}
        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-12 pb-28 lg:py-16 lg:pb-28">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <ShieldAlert size={17} />
            Screen 8 / Appeal guidance &amp; escalation
          </div>

          <h1 className="max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.035em] sm:text-6xl">
            Ready for the next step.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#173c38]/70">
            If the Public Information Officer does not respond within the applicable statutory timeline or furnishes incomplete records, a First Appeal may be filed under Section 19(1).
          </p>

          {/* Calibrated Guidance Timeline */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#173c38]/10 bg-white p-5 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c45b35]">Response Period</span>
              <h4 className="mt-1 text-base font-bold">Standard 30 Days</h4>
              <p className="mt-1 text-xs text-[#173c38]/70">Usually 30 days from application receipt under Section 7(1), subject to statutory exceptions.</p>
            </div>
            <div className="rounded-2xl border border-[#173c38]/10 bg-white p-5 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#27745e]">First Appeal</span>
              <h4 className="mt-1 text-base font-bold">First Appellate Authority</h4>
              <p className="mt-1 text-xs text-[#173c38]/70">Submit to the FAA of {publicAuthority} if no response or an unsatisfactory reply is received.</p>
            </div>
            <div className="rounded-2xl border border-[#173c38]/10 bg-white p-5 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#173c38]">Second Appeal</span>
              <h4 className="mt-1 text-base font-bold">Information Commission</h4>
              <p className="mt-1 text-xs text-[#173c38]/70">Available before the Central/State Information Commission with statutory review powers.</p>
            </div>
          </div>

          <p className="mt-3 text-xs italic text-[#173c38]/60">
            * Informational guidance generated for demonstration purposes — not legal advice.
          </p>

          {/* AI-Assisted Draft Box */}
          <div className="mt-6 rounded-2xl border border-[#173c38]/10 bg-[#fffdf8] p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#173c38]/10 pb-4">
              <div>
                <span className="text-sm font-bold text-[#173c38]">✓ AI-Assisted First Appeal Draft</span>
                <p className="text-xs text-[#173c38]/60">Informational guidance under Section 19(1) — review all details before formal submission.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-xl border border-[#173c38]/20 bg-white px-3.5 py-2 text-xs font-bold text-[#173c38] transition hover:border-[#173c38]"
                >
                  {copied ? <Check size={14} className="text-[#27745e]" /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy Draft"}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 rounded-xl bg-[#173c38] px-3.5 py-2 text-xs font-bold text-white transition hover:bg-[#27745e]"
                >
                  <Download size={14} /> Download .txt
                </button>
              </div>
            </div>

            <textarea
              readOnly
              value={appealDraft}
              rows={14}
              className="mt-4 w-full resize-none rounded-xl border border-[#173c38]/10 bg-white p-4 font-mono text-xs leading-relaxed text-[#173c38] outline-none"
            />
          </div>

          {/* Navigation */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link
              href="/review"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#173c38]/20 bg-white px-6 py-3 text-sm font-bold transition hover:border-[#173c38]"
            >
              <ArrowLeft size={16} /> Back to Review
            </Link>
            <Link
              href="/"
              className="flex min-h-12 items-center justify-center rounded-xl bg-[#c45b35] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#a94728]"
            >
              Start New Inquiry
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}