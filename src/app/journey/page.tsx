"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  FileCheck,
  Send,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  ClipboardList
} from "lucide-react";
import type { RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";

export default function JourneyPage() {
  const [state, setState] = useState<RtiState | null>(null);

  useEffect(() => {
    setState(readRtiState());
  }, []);

  const timelineSteps = [
    {
      title: "Day 0: Application Dispatched",
      desc: "RTI request formally lodged with application fee. 30-day statutory countdown initiates under Section 7(1).",
      status: "done",
      icon: Send,
    },
    {
      title: "Day 5-7: Central Inward & PIO Allocation",
      desc: "Central Registry logs physical or digital receipt and transfers file to designated Public Information Officer.",
      status: "current",
      icon: Clock,
    },
    {
      title: "Day 15: Statutory Transfer Window (Sec 6(3))",
      desc: "If information held by another authority, official transfer must conclude within 5 days of receipt.",
      status: "pending",
      icon: Calendar,
    },
    {
      title: "Day 30: Statutory Response Deadline",
      desc: "PIO mandated by law to provide records or issue statutory rejection order citing explicit exemptions.",
      status: "pending",
      icon: FileCheck,
    },
    {
      title: "Day 31-60: First Statutory Appeal Window",
      desc: "If unanswered or denied unfairly, citizen holds statutory right to escalate to First Appellate Authority under Section 19(1).",
      status: "appeal",
      icon: ShieldAlert,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#173c38]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-12">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#173c38]/15 pb-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#173c38] text-white shadow-sm">
              <ClipboardList size={20} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-sm font-bold tracking-[0.16em] uppercase">RTI Saarthi</p>
              <p className="text-xs text-[#173c38]/60">Citizen Intelligence & RTI Filing Layer</p>
            </div>
          </Link>
          <div className="hidden items-center gap-2 text-xs font-semibold text-[#173c38]/60 sm:flex">
            <span>Deterministic Timeline Guard</span>
          </div>
        </header>

        {/* Content */}
        <section className="mx-auto flex w-full max-w-4xl flex-col justify-center py-10">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <Clock size={16} />
            <span>Screen 7: RTI Lifecycle & Escalation Tracker</span>
          </div>

          <div className="rounded-2xl border border-[#173c38]/15 bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#173c38]">
              Statutory 30-Day Lifecycle Map
            </h1>
            <p className="mt-1 text-sm text-[#173c38]/70">
              Deterministic escalation roadmaps calibrated to legal deadlines under Sections 7(1) & 19(1).
            </p>

            <div className="mt-8 space-y-6">
              {timelineSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 border-l-2 border-[#173c38]/20 pl-4">
                    <div className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg ${
                      step.status === "done"
                        ? "bg-emerald-100 text-emerald-800"
                        : step.status === "appeal"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-[#173c38]/10 text-[#173c38]"
                    }`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#173c38]">{step.title}</h3>
                      <p className="mt-0.5 text-xs text-[#173c38]/70">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#173c38]/10 pt-6 sm:flex-row">
              <Link
                href="/review"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#173c38]/20 bg-white px-6 py-3 text-sm font-bold text-[#173c38] hover:bg-[#173c38]/5 sm:w-auto"
              >
                <ArrowLeft size={16} /> Back to Review
              </Link>

              <Link
                href="/appeal"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#c45b35] px-8 py-3 text-sm font-bold text-white hover:bg-[#a84d2d] sm:w-auto"
              >
                Simulate Appeal Protocol (Screen 8) <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}