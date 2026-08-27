"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, ClipboardList, Copy, Download, HelpCircle, ShieldAlert, ShieldCheck } from "lucide-react";
import { type RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";

export default function AppealPage() {
  const [state, setState] = useState<RtiState | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setState(readRtiState());
  }, []);

  const publicAuthority = state?.publicAuthority || "Department of Forests & Wildlife";
  const question = state?.question || "How many trees did the forest department cut in 2023?";
  const requests =
    state?.restructuredRequests && state.restructuredRequests.length > 0
      ? state.restructuredRequests
      : [
          "Certified copy of official permission/sanction orders issued for felling trees during the year 2023.",
          "Total official count and species breakdown of trees cut by or under approval of the Forest Department in 2023.",
          "Certified copy of the compensatory afforestation plan and sapling plantation audit register for 2023.",
          "Inspection reports and contractor execution logs relating to tree clearance projects in 2023.",
        ];

  const appealDraft = `FORM OF FIRST APPEAL UNDER SECTION 19(1) OF THE RTI ACT, 2005

To,
The First Appellate Authority (FAA),
${publicAuthority}

Subject: First Appeal under Section 19(1) of the RTI Act, 2005 against non-furnishing of information / unsatisfactory response.

Ref: Original RTI Application concerning "${question}"

Respected Authority,

1. Particulars of the Appellant:
   Name: [Citizen / Appellant Name]
   Address: [Postal Address for Communication]
   Contact: [Email / Mobile Number]

2. Particulars of the Central/State Public Information Officer (CPIO/SPIO):
   Designation: Public Information Officer
   Public Authority: ${publicAuthority}

3. Date of filing original RTI Application: [DD/MM/YYYY] (Registration No: RTI/${new Date().getFullYear()}/009142)

4. Brief Facts leading to this Appeal:
   The appellant filed an RTI application seeking official records. More than 30 days have elapsed since the receipt of the application, and no response has been received / the response provided was incomplete and misleading.

5. Information Requested in Original Application:
${requests.map((req, i) => `   ${i + 1}. ${req}`).join("\n")}

6. Grounds for Appeal:
   a) Non-adherence to the mandatory 30-day timeline prescribed under Section 7(1) of the RTI Act, 2005.
   b) Information sought relates to public records maintained under Section 2(f) and does not attract any exemption under Section 8(1).

7. Relief Sought:
   The appellant requests the First Appellate Authority to direct the PIO to provide certified copies of all requested records immediately free of charge under Section 7(6).

Place: _________________
Date:  _________________

Yours faithfully,

(Appellant Signature)`;

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
  };

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#173c38]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-14">
        {/* Portal Header */}
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

        {/* Main Content */}
        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-12 lg:py-16">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <ShieldAlert size={17} />
            Screen 8 / Appeal guidance &amp; escalation
          </div>

          <h1 className="max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.035em] sm:text-6xl">
            Ready for the next step.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#173c38]/70">
            If the Public Information Officer fails to respond within 30 days or provides incomplete records, you are entitled under <strong>Section 19(1)</strong> to escalate without paying an additional court fee.
          </p>

          {/* Timeline Guidance Strip */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#173c38]/10 bg-white p-5 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c45b35]">Day 0 to 30</span>
              <h4 className="mt-1 text-base font-bold">Statutory Window</h4>
              <p className="mt-1 text-xs text-[#173c38]/70">Section 7(1) mandates the PIO to provide records or cite rejection within 30 days.</p>
            </div>
            <div className="rounded-2xl border border-[#173c38]/10 bg-white p-5 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#27745e]">Day 30 to 60</span>
              <h4 className="mt-1 text-base font-bold">First Appeal Window</h4>
              <p className="mt-1 text-xs text-[#173c38]/70">File this First Appeal draft directly to the First Appellate Authority of {publicAuthority}.</p>
            </div>
            <div className="rounded-2xl border border-[#173c38]/10 bg-white p-5 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#173c38]">Day 90+</span>
              <h4 className="mt-1 text-base font-bold">Second Appeal / CIC</h4>
              <p className="mt-1 text-xs text-[#173c38]/70">Escalate to Central/State Information Commission with penalty invocation under Section 20.</p>
            </div>
          </div>

          {/* Editable / Printable Appeal Draft Box */}
          <div className="mt-8 rounded-2xl border border-[#173c38]/10 bg-[#fffdf8] p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#173c38]/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-[#e5eee4] text-xs font-bold text-[#27745e]">
                  ✓
                </span>
                <span className="text-sm font-bold text-[#173c38]">First Appeal Auto-Generated Draft</span>
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

          {/* Footer Navigation */}
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