import OpenAI from "openai";
import { defaultUniversalState, type RequestDomain, type RtiState } from "@/src/lib/types";

export const runtime = "nodejs";

function offlineState(query: string): RtiState {
  const normalizedQuery = query.toLowerCase();

  if (normalizedQuery.match(/tree|forest|environment|felling|plantation/)) {
    return {
      ...defaultUniversalState,
      question: query.trim() || "How many trees did the forest department cut in 2023?",
      domain: "general",
      goal: "Obtain certified tree felling sanction orders, counts, and compensatory afforestation logs",
      publicAuthority: "Department of Forests & Wildlife",
      jurisdiction: "State",
      suitabilityReason: "RTI Act Section 2(f) entitles citizens to official permissions, felling logs, and plantation audit records.",
      restructuredRequests: [
        "Certified copy of official permission/sanction orders issued for felling trees during the year 2023.",
        "Total official count and species breakdown of trees cut by or under approval of the Forest Department in 2023.",
        "Certified copy of the compensatory afforestation plan and sapling plantation audit register for 2023.",
        "Inspection reports and contractor execution logs relating to tree clearance projects in 2023."
      ],
      authorityConfidence: 96,
      healthScore: 92,
      characterCount: query.length,
    };
  }

  if (normalizedQuery.match(/pension|gratuity|epfo|credited/)) {
    return {
      ...defaultUniversalState,
      question: query.trim(),
      domain: "pension",
      goal: "Obtain official sanction, audit, and disbursement records for delayed pension",
      publicAuthority: "Employees' Provident Fund Organisation (EPFO) / Pension Directorate",
      jurisdiction: "Central",
      suitabilityReason: "RTI allows inspection of daily progress notings and sanction registers regarding pending claim settlements.",
      restructuredRequests: [
        "Daily progress report and file notings on pension application from date of receipt to current date.",
        "Certified copy of internal sanction order and reason recorded for payment delay.",
        "Name and designation of the processing officer who withheld the file beyond statutory time limits.",
        "Audit trail of electronic fund transfer attempts and bank reconciliation statements."
      ],
      authorityConfidence: 95,
      healthScore: 90,
      characterCount: query.length,
    };
  }

  if (normalizedQuery.match(/scholarship|merit|sanction order|disbursement|student grant|छात्रवृत्ति|वजीफा|बृत्|বৃত্তি|উপবৃত্তি|உதவித்தொகை|ஸ்காலர்ஷிப்|స్కాలర్|విద్యార్థి వేతనం|शिष्यवृत्ती|શિષ્યવૃત્તિ|ವಿದ್ಯಾರ್ಥಿವೇತನ|സ്കോളർഷിപ്പ്|ਵਜ਼ੀਫ਼ਾ/)) {
    return {
      ...defaultUniversalState,
      question: query.trim(),
      domain: "scholarship",
      goal: "Obtain official scholarship sanction and disbursement records",
      publicAuthority: "Ministry of Education / Department of Higher Education",
      jurisdiction: "Central",
      suitabilityReason: "Central scholarship schemes and national education grants are administered directly under Ministry of Education public records (Section 2(f)).",
      restructuredRequests: [
        "Certified copy of the scholarship sanction order and release notification for FY 2025-26.",
        "Official criteria and beneficiary disbursement list for National Merit Scholarship.",
        "Certified file notings regarding fund allocation and disbursement timelines.",
        "Name and designation of the Public Information Officer / Section Officer handling student scholarship disbursements.",
      ],
      authorityConfidence: 96,
      healthScore: 94,
      characterCount: query.length,
    };
  }

  return {
    ...defaultUniversalState,
    question: query.trim() || defaultUniversalState.question,
    domain: "civic",
    goal: "Obtain certified public works records, tender sanctions, and inspection registers",
    publicAuthority: "Municipal Corporation / Public Works Department",
    jurisdiction: "Municipal",
    suitabilityReason: "Public infrastructure contracts and measurement books are accessible public records under Section 2(f).",
    restructuredRequests: [
      "Certified copy of the work order, technical sanction, and tender document.",
      "Name and contact details of the contractor awarded the contract.",
      "Certified copies of Measurement Book (MB) entries and completion certificates.",
      "Quality control inspection registers and delay penalty correspondence notings."
    ],
    authorityConfidence: 92,
    healthScore: 88,
    characterCount: query.length,
  };
}

function normalizeResult(query: string, result: Partial<RtiState>): RtiState {
  const fallback = offlineState(query);
  const domains: RequestDomain[] = ["infrastructure", "pension", "scholarship", "civic", "general"];
  const jurisdictions: RtiState["jurisdiction"][] = ["Central", "State", "Municipal"];

  return {
    ...fallback,
    ...result,
    question: query.trim() || fallback.question,
    domain: domains.includes(result.domain as RequestDomain) ? (result.domain as RequestDomain) : fallback.domain,
    goal: result.goal || fallback.goal,
    publicAuthority: result.publicAuthority || fallback.publicAuthority,
    jurisdiction: jurisdictions.includes(result.jurisdiction as RtiState["jurisdiction"]) ? (result.jurisdiction as RtiState["jurisdiction"]) : fallback.jurisdiction,
    suitabilityReason: result.suitabilityReason || fallback.suitabilityReason,
    restructuredRequests: Array.isArray(result.restructuredRequests) && result.restructuredRequests.length > 0 ? result.restructuredRequests : fallback.restructuredRequests,
    authorityConfidence: typeof result.authorityConfidence === "number" ? result.authorityConfidence : fallback.authorityConfidence,
    healthScore: typeof result.healthScore === "number" ? result.healthScore : fallback.healthScore,
    characterCount: query.length,
  };
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { query?: unknown } | null;
  const query = typeof body?.query === "string" ? body.query : "";
  const isScholarshipQuery = /scholarship|merit|sanction order|disbursement|student grant/i.test(query);

  if (isScholarshipQuery) {
    return Response.json(offlineState(query));
  }

  const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;

  if (!query.trim() || !apiKey) {
    return Response.json(offlineState(query));
  }

  try {
    const client = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const systemPrompt = `You are a careful Indian RTI (Right to Information Act, 2005) analyzer. Understand queries written in English, Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, or mixed scripts. Preserve the user's meaning and return the JSON schema below with no empty fields.
Return ONLY a valid JSON object matching this schema:
{
  "domain": "infrastructure" | "pension" | "scholarship" | "civic" | "general",
  "goal": "A concise 1-sentence legal objective describing what official public records are sought",
  "publicAuthority": "Accurate department name (e.g. Department of Forests & Wildlife / Municipal Corporation / EPFO / PWD)",
  "jurisdiction": "Central" | "State" | "Municipal",
  "suitabilityReason": "A clear legal explanation under RTI Act Section 2(f) describing which exact records to request",
  "restructuredRequests": [
    "Certified copy of record 1",
    "Certified copy of record 2",
    "Certified copy of record 3",
    "Certified copy of record 4"
  ],
  "authorityConfidence": 95,
  "healthScore": 90
}`;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Analyze this citizen query: ${query}` },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    const parsed = content ? (JSON.parse(content) as Partial<RtiState>) : {};

    return Response.json(normalizeResult(query, parsed));
  } catch (error) {
    console.error("API route error:", error);
    return Response.json(offlineState(query));
  }
}