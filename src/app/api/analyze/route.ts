import OpenAI from "openai";
import { defaultUniversalState, type RequestDomain, type RtiState } from "@/src/lib/types";

export const runtime = "nodejs";

function offlineState(query: string): RtiState {
  const normalizedQuery = query.toLowerCase();
  const preset = normalizedQuery.match(/pension|gratuity|epfo|credited/)
    ? { domain: "pension" as const, goal: "Understand pension payment delay and file movement", requests: ["Copy of the sanction/release order for my pension", "Current status of my pension file", "Date last payment was processed", "Name/Designation of the dealing officer", "File notings/correspondence regarding the delay."], authority: "Department of Pension & Pensioners' Welfare (Central)", confidence: 91, jurisdiction: "Central" as const, reason: "Your question appears to concern a Central Government pension.", route: "CPGRAMS", url: "https://pgportal.gov.in" }
    : normalizedQuery.match(/scholarship|merit|stipend|disbursement/)
      ? { domain: "scholarship" as const, goal: "Obtain official sanction and disbursement records for National Merit Scholarship", requests: ["Certified copy of merit list sanction order", "DBT disbursement transaction failure log/reasons", "Current nodal officer designation", "Budget allocation and release status"], authority: "Ministry of Education / UGC", confidence: 89, jurisdiction: "Central" as const, reason: "The request concerns scholarship sanction and disbursement records.", route: "Scholarship grievance portal", url: "https://pgportal.gov.in" }
      : normalizedQuery.match(/road|ward|pothole|tender|contractor/)
        ? { domain: "infrastructure" as const, goal: "Inspect road repair tender status and contractor execution in Ward 4", requests: ["Certified copy of tender agreement and sanctioned timeline", "Measurement Book (MB) entries", "Inspection logbook", "Delay penalty records"], authority: "Public Works Department (PWD) / Municipal Corporation", confidence: 94, jurisdiction: "Municipal" as const, reason: "The request concerns a Municipal road infrastructure project.", route: "Municipal grievance portal", url: "https://pgportal.gov.in" }
        : { domain: "civic" as const, goal: "Obtain official public records and inspection logs for civic service request", requests: defaultUniversalState.restructuredRequests, authority: "Municipal Corporation / Civic Administration", confidence: 85, jurisdiction: "Municipal" as const, reason: "The request concerns a civic service and its official records.", route: "Municipal grievance portal", url: "https://pgportal.gov.in" };
  return {
    ...defaultUniversalState,
    question: query.trim() || defaultUniversalState.question,
    domain: preset.domain,
    goal: preset.goal,
    citizenGoal: preset.goal,
    suggestedAuthority: preset.authority,
    publicAuthority: preset.authority,
    authorityReason: preset.reason,
    restructuredRequests: preset.requests,
    authorityConfidence: preset.confidence,
    jurisdiction: preset.jurisdiction,
    jurisdictionWarning: preset.jurisdiction !== "Central",
    betterGrievanceRoute: preset.route,
    grievanceUrl: preset.url,
    characterCount: query.length,
    usedFallback: true,
  };
}

function normalizeResult(query: string, result: Partial<RtiState>): RtiState {
  const fallback = offlineState(query);
  const domains: RequestDomain[] = ["infrastructure", "pension", "scholarship", "civic", "general"];
  const jurisdictions: RtiState["jurisdiction"][] = ["Central", "State", "Municipal"];
  const stringValue = (value: unknown, fallbackValue: string) =>
    typeof value === "string" && value.trim() ? value.trim() : fallbackValue;
  const scoreValue = (value: unknown, fallbackValue: number) =>
    typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100 ? value : fallbackValue;
  const requests = Array.isArray(result.restructuredRequests)
    && result.restructuredRequests.length >= 4
    && result.restructuredRequests.length <= 5
    && result.restructuredRequests.every((request) => typeof request === "string" && request.trim())
    ? result.restructuredRequests.map((request) => request.trim())
    : fallback.restructuredRequests;
  const domain = domains.includes(result.domain as RequestDomain) ? result.domain as RequestDomain : fallback.domain;
  const jurisdiction = jurisdictions.includes(result.jurisdiction as RtiState["jurisdiction"])
    ? result.jurisdiction as RtiState["jurisdiction"]
    : fallback.jurisdiction;
  const citizenGoal = stringValue(result.citizenGoal, fallback.citizenGoal);
  const suitabilityReason = stringValue(result.suitabilityReason, fallback.suitabilityReason);
  const publicAuthority = stringValue(
    result.publicAuthority,
    stringValue(result.suggestedAuthority, fallback.publicAuthority),
  );
  const authorityReason = stringValue(result.authorityReason, suitabilityReason);

  return {
    ...fallback,
    question: query.trim(),
    domain,
    citizenGoal,
    goal: citizenGoal,
    suitabilityReason,
    authorityReason,
    restructuredRequests: requests,
    publicAuthority,
    suggestedAuthority: publicAuthority,
    jurisdiction,
    jurisdictionWarning: jurisdiction !== "Central",
    authorityConfidence: scoreValue(result.authorityConfidence, fallback.authorityConfidence),
    betterGrievanceRoute: stringValue(result.betterGrievanceRoute, fallback.betterGrievanceRoute),
    grievanceUrl: stringValue(result.grievanceUrl, fallback.grievanceUrl),
    healthScore: scoreValue(result.healthScore, fallback.healthScore),
    privacyGuard: stringValue(result.privacyGuard, fallback.privacyGuard),
    characterCount: query.length,
    usedFallback: false,
  };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { query?: unknown } | null;
  const query = typeof body?.query === "string" ? body.query : "";

  if (!query.trim() || !process.env.OPENAI_API_KEY) {
    return Response.json(offlineState(query));
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are a careful Indian RTI request analyzer. Return only JSON matching the requested schema. RTI under Section 2(f) seeks existing records, not explanations, action, or opinions. Suggest 4-5 precise record requests such as certified work orders, measurement books, file notings, inspection registers, and officer designations. Never request Aadhaar, PAN, or sensitive identity documents." },
        { role: "user", content: `Analyze this citizen query: ${query}\nReturn exactly one JSON object with no additional keys or markdown. Its keys must be exactly: domain (infrastructure|pension|scholarship|civic|general), citizenGoal, suitabilityReason, restructuredRequests (an array of 4-5 strings), publicAuthority, suggestedAuthority (exactly the same string as publicAuthority), jurisdiction (Central|State|Municipal), authorityConfidence (number 0-100), authorityReason, betterGrievanceRoute, grievanceUrl, healthScore (number 0-100), privacyGuard.` },
      ],
    });
    const content = completion.choices[0]?.message.content;
    const parsed = content ? JSON.parse(content) as Partial<RtiState> : {};
    return Response.json(normalizeResult(query, parsed));
  } catch (error) {
    console.error("RTI analysis failed; returning offline fallback", error);
    return Response.json(offlineState(query));
  }
}
