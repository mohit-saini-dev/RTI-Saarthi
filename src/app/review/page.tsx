"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ClipboardList, Download, ShieldCheck } from "lucide-react";
import { type RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";

export default function ReviewPage() {
  const [state, setState] = useState<RtiState | null>(null);

  useEffect(() => {
    // Hydrate browser-only localStorage state after the initial render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(readRtiState());
  }, []);

  const publicAuthority = state?.publicAuthority || "Ministry of Education / Department of Higher Education";
  const requests =
    state?.restructuredRequests && state.restructuredRequests.length > 0
      ? state.restructuredRequests
      : [
          "Certified copy of the scholarship sanction order and release notification for FY 2025-26.",
          "Official criteria and beneficiary disbursement list for National Merit Scholarship.",
          "Certified file notings regarding fund allocation and disbursement timelines.",
          "Name and designation of the Public Information Officer / Section Officer handling student scholarship disbursements.",
        ];

  const handleDownloadApplication = () => {
    const content = `APPLICATION UNDER THE RIGHT TO INFORMATION ACT, 2005
[DEMONSTRATION PROTOTYPE FILING]

To:
The Central/State Public Information Officer (CPIO/SPIO),
${publicAuthority}

Subject: Request for Information under Section 6(1) of the RTI Act, 2005.

Particulars of Information Required:
${requests.map((item, index) => `${index + 1}. ${item}`).join("\n")}

Application Fee: ₹10 (Standard Statutory Demo Fee)
Applicant: [Citizen / Demonstration User]
Date: ${new Date().toLocaleDateString()}
`;

    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `RTI_Application_${publicAuthority.replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
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
            Review &amp; Submit
          </div>
        </header>

        {/* Content */}
        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-12 lg:py-16">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <ShieldCheck size={17} />
            Screen 6 / Review &amp; submit
          </div>

          <h1 className="max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.035em] sm:text-6xl">
            One last look before you send.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#173c38]/70">
            Your request is ready. Check the records below, then proceed to view your RTI lifecycle journey or download your draft.
          </p>

          {/* Review Box */}
          <div className="mt-8 rounded-2xl border border-[#173c38]/10 bg-[#fffdf8] p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#173c38]/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#c45b35]">Target Authority</span>
                <p className="mt-1 text-xl font-bold">{publicAuthority}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#e5eee4] px-3 py-1 text-xs font-bold text-[#27745e]">
                  Application fee: ₹10
                </span>
                <button
                  type="button"
                  onClick={handleDownloadApplication}
                  className="flex items-center gap-1.5 rounded-xl bg-white border border-[#173c38]/20 px-3.5 py-1.5 text-xs font-bold text-[#173c38] transition hover:border-[#173c38]"
                >
                  <Download size={14} /> Download Application
                </button>
              </div>
            </div>

            {/* Dynamic Requests List */}
            <div className="mt-6 space-y-3">
              {requests.map((req, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl bg-white p-4 border border-[#173c38]/10"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e5eee4] text-xs font-bold text-[#27745e]">
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
              href="/question"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#173c38]/20 bg-white px-6 py-3 text-sm font-bold transition hover:border-[#173c38]"
            >
              <ArrowLeft size={16} /> Back to Edit
            </Link>
            <Link
              href="/journey"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c45b35] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#a94728]"
            >
              Proceed to RTI Journey <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}