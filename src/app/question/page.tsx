"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ClipboardList, Loader2, Sparkles } from "lucide-react";
import { writeRtiState } from "@/src/lib/client-state";

const EXAMPLE_QUERIES = [
  "How many trees did the forest department cut in 2023?",
  "Why is my pension disbursement delayed for 6 months?",
  "Status of road repair tender in Ward 4",
];

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const queryToSubmit = (customQuery || query).trim();
    if (!queryToSubmit || isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryToSubmit }),
      });

      if (!res.ok) throw new Error("Failed to analyze");
      const data = await res.json();
      
      // Save AI result to localStorage
      writeRtiState(data);
      router.push("/understand");
    } catch (err) {
      console.error("Analysis failed:", err);
      router.push("/understand");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#173c38]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-14">
        {/* Navigation */}
        <header className="flex items-center justify-between border-b border-[#173c38]/15 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#173c38] text-[#f5f1e8]">
              <ClipboardList size={20} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-sm font-bold tracking-[0.16em] uppercase">RTI Saarthi</p>
              <p className="text-xs text-[#173c38]/60">Citizen Intelligence &amp; RTI Filing Layer</p>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-12 lg:py-16">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#c45b35]">
            <Sparkles size={17} />
            Screen 1 / Ask a question
          </div>

          <h1 className="max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.035em] sm:text-6xl">
            Ask the government with clarity.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#173c38]/70">
            Convert plain-language questions into structured, legally actionable RTI requests across all departments.
          </p>

          {/* Form */}
          <form onSubmit={handleAnalyze} className="mt-8 w-full">
            <div className="relative rounded-2xl border border-[#173c38]/20 bg-white p-4 shadow-[0_12px_30px_rgba(23,60,56,0.06)] transition-all focus-within:border-[#c45b35]">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. How many trees were cut by the Forest Department in 2023?"
                rows={3}
                className="w-full resize-none bg-transparent text-base text-[#173c38] placeholder-[#173c38]/40 outline-none"
              />

              <div className="mt-3 flex items-center justify-between border-t border-[#173c38]/10 pt-3">
                <span className="text-xs text-[#173c38]/50">
                  {query.length} / 240
                </span>

                <button
                  type="submit"
                  disabled={!query.trim() || isLoading}
                  className="flex items-center gap-2 rounded-xl bg-[#c45b35] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#a94728] disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Continue <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Preset Prompts */}
          <div className="mt-8">
            <p className="text-xs font-semibold tracking-wider text-[#173c38]/60 uppercase">
              Or try one of these examples:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {EXAMPLE_QUERIES.map((example, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setQuery(example);
                    handleAnalyze(undefined, example);
                  }}
                  className="rounded-xl border border-[#173c38]/15 bg-white px-3.5 py-2 text-xs font-medium text-[#173c38] transition hover:border-[#173c38] hover:bg-[#fffdf8]"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}