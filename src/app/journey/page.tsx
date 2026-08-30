"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Clock,
  Calendar,
  FileCheck,
  Send,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  ClipboardList,
  AlertTriangle,
  Scale,
  BellRing,
  CheckCircle2,
  FileSpreadsheet,
  Building2
} from "lucide-react";
import type { RtiState } from "@/src/lib/types";
import { readRtiState } from "@/src/lib/client-state";

export default function JourneyPage() {
  const [state, setState] = useState<RtiState | null>(null);
  const [activeDay, setActiveDay] = useState<number>(0);

  useEffect(() => {
    setState(readRtiState());
  }, []);

  const authority =
    state?.publicAuthority ||
    (state?.jurisdiction === "Municipal"
      ? "Municipal Corporation / Local Body"
      : state?.jurisdiction === "State"
      ? "State Public Authority"
      : "Central Public Information Officer (CPIO)");

  const isMunicipalOrState =
    state?.jurisdiction === "Municipal" || state?.jurisdiction === "State";

  const timelineSteps = [
    {
      day: "Day 0",
      title: "Application Dispatched & Logged",
      section: "Section 7(1)",
      desc: "Formal RTI request lodged with statutory application fee (₹10). The mandatory 30-calendar-day response clock begins immediately upon receipt.",
      badge: "Initiated",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: Send,
    },
    {
      day: "Day 5",
      title: "Statutory Section 6(3) Transfer Window",
      section: "Section 6(3)",
      desc: "If information belongs to another department, PIO is mandated by law to transfer the application within 5 days and formally notify the citizen.",
      badge: "Routing Check",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      icon: Building2,
    },
    {
      day: "Day 15",
      title: "Record Retrieval & Inspection Notice",
      section: "Section 7(3)",
      desc: "Authority calculates further computation/photocopy fees if applicable (₹2 per page). Statutory calculation period pauses deadline count.",
      badge: "Fee Assessment",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      icon: FileSpreadsheet,
    },
    {
      day: "Day 30",
      title: "Mandatory Statutory Response Deadline",
      section: "Section 7(1) & 7(6)",
      desc: "Absolute deadline to supply requested records. If delayed past Day 30, the authority forfeits fee rights: all records must be provided completely FREE under Section 7(6).",
      badge: "Statutory Hard Stop",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      icon: FileCheck,
    },
    {
      day: "Day 31-60",
      title: "First Statutory Appeal Escalation Window",
      section: "Section 19(1)",
      desc: "If no response received, information is deemed refused. Citizen holds direct legal right to file First Appeal before Senior Appellate Officer.",
      badge: "Deemed Refusal Window",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
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
            <Scale size={16} />
            <span>Deterministic Lifecycle Engine</span>
          </div>
        </header>

        {/* Content */}
        <section className="mx-auto flex w-full max-w-4xl flex-col justify-center py-10">
          {/* Screen Indicator */}
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <Clock size={16} />
            <span>Screen 7: RTI Lifecycle & Escalation Tracker</span>
          </div>

          <div className="rounded-2xl border border-[#173c38]/15 bg-white p-6 shadow-sm sm:p-8">
            {/* Top Summary Banner */}
            <div className="flex flex-col justify-between gap-6 border-b border-[#173c38]/10 pb-6 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-[#173c38]">
                  Statutory 30-Day Lifecycle Map
                </h1>
                <p className="mt-1 max-w-xl text-sm text-[#173c38]/70">
                  Deterministic escalation tracker calibrated to legal deadlines under Sections 7(1), 7(6) and 19(1) of the RTI Act, 2005.
                </p>
              </div>

              <div className="rounded-2xl border border-[#173c38]/15 bg-[#f5f1e8] px-5 py-3 text-right">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#173c38]/60">Assigned Authority</p>
                <p className="text-xs font-extrabold text-[#173c38] truncate max-w-[200px]">{authority}</p>
                <span className="mt-1 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  {state?.jurisdiction || "Central"} Authority
                </span>
              </div>
            </div>

            {/* Quick Stat Bar */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-[#173c38]/10 bg-[#fffdf8] p-3.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#173c38]/60">Statutory Term</p>
                <p className="mt-0.5 text-lg font-black text-[#173c38]">30 Days Max</p>
                <p className="text-[11px] text-[#173c38]/60">Under Section 7(1)</p>
              </div>
              <div className="rounded-xl border border-[#173c38]/10 bg-[#fffdf8] p-3.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#173c38]/60">Section 7(6) Guard</p>
                <p className="mt-0.5 text-lg font-black text-[#27745e]">₹0 Delay Penalty</p>
                <p className="text-[11px] text-[#173c38]/60">Free records if delayed</p>
              </div>
              <div className="rounded-xl border border-[#173c38]/10 bg-[#fffdf8] p-3.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#173c38]/60">First Appeal Legal Window</p>
                <p className="mt-0.5 text-lg font-black text-[#c45b35]">30 Days</p>
                <p className="text-[11px] text-[#173c38]/60">Days 31 to 60 (Sec 19(1))</p>
              </div>
            </div>

            {/* Step-by-Step Milestones */}
            <div className="mt-8 space-y-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#173c38]/60">
                Statutory Milestones & Citizen Rights
              </h2>

              <div className="space-y-4">
                {timelineSteps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col gap-3 rounded-xl border border-[#173c38]/10 bg-[#fffdf8] p-4.5 transition-all hover:border-[#173c38]/25 sm:flex-row sm:items-start"
                    >
                      <div className="flex shrink-0 items-center gap-3 sm:w-28 sm:flex-col sm:items-start sm:gap-1">
                        <span className="text-xs font-black uppercase text-[#c45b35]">{step.day}</span>
                        <span className="rounded-md border bg-white px-2 py-0.5 text-[10px] font-bold text-[#173c38]/70 shadow-2xs">
                          {step.section}
                        </span>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-sm font-bold text-[#173c38]">{step.title}</h3>
                          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${step.badgeColor}`}>
                            {step.badge}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-[#173c38]/75">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Escalation Advisory Card */}
            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
              <div className="flex items-start gap-3">
                <BellRing size={20} className="mt-0.5 shrink-0 text-amber-800" />
                <div>
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Automatic Deemed Refusal Trigger
                  </h4>
                  <p className="mt-0.5 text-xs text-amber-900/80">
                    If no response arrives by Day 30, you do not lose your fee or right to records. The system prepares grounds for First Statutory Appeal under Section 19(1), demanding penal action under Section 20 against non-responsive officers.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
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