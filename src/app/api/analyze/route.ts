import OpenAI from "openai";
import { defaultUniversalState, type RequestDomain, type RtiState } from "@/src/lib/types";

export const runtime = "nodejs";

function offlineState(query: string): RtiState {
  const normalizedQuery = query.toLowerCase();
  const preset = normalizedQuery.match(/pension|gratuity|epfo|credited/)
    ? { domain: "pension" as const, goal: "Understand pension payment delay and file movement" }
    : normalizedQuery.match(/scholarship|merit|stipend|disbursement/)
    ? { domain: "scholarship" as const, goal: "Obtain official sanction and disbursement records for scholarship" }
    : normalizedQuery.match(/road|ward|pothole|tender|contractor/)
    ? { domain: "infrastructure" as const, goal: "Inspect road repair tender status and contractor execution" }
    : { domain: "civic" as const, goal: "Obtain official public records and inspection logs for civic service request" };

  return {
    ...defaultUniversalState,
    question: query.trim() || defaultUniversalState.question,
    domain: preset.domain,
    goal: preset.goal,
  };
}

function normalizeResult(query: string, result: Partial<RtiState>): RtiState {
  const fallback = offlineState(query);
  const domains: RequestDomain[] = ["infrastructure", "pension", "scholarship", "civic", "general"];
  const jurisdictions: RtiState["jurisdiction"][] = ["Central", "State", "Municipal"];

  return {
    ...fallback,
    ...result,
    question: query.trim(),
    domain: domains.includes(result.domain as RequestDomain) ? (result.domain as RequestDomain) : fallback.domain,
    jurisdiction: jurisdictions.includes(result.jurisdiction as RtiState["jurisdiction"]) ? (result.jurisdiction as RtiState["jurisdiction"]) : fallback.jurisdiction,
    restructuredRequests: Array.isArray(result.restructuredRequests) && result.restructuredRequests.length > 0 ? result.restructuredRequests : fallback.restructuredRequests,
    authorityConfidence: typeof result.authorityConfidence === "number" ? result.authorityConfidence : fallback.authorityConfidence,
    healthScore: typeof result.healthScore === "number" ? result.healthScore : fallback.healthScore,
    characterCount: query.length,
  };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { query?: unknown } | null;
  const query = typeof body?.query === "string" ? body.query : "";

  const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;

  if (!query.trim() || !apiKey) {
    return Response.json(offlineState(query));
  }

  try {
    const client = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const systemPrompt = `You are a careful Indian RTI (Right to Information Act, 2005) analyzer. 
Return ONLY a valid JSON object matching this schema:
{
  "domain": "infrastructure" | "pension" | "scholarship" | "civic" | "general",
  "goal": "A concise 1-sentence legal objective describing what official public records are sought",
  "publicAuthority": "Accurate department name (e.g. Forest Department / Municipal Corporation / EPFO / PWD)",
  "jurisdiction": "Central" | "State" | "Municipal",
  "suitabilityReason": "A clear legal explanation of why RTI applies and which exact records to request",
  "restructuredRequests": [
    "Certified copy of record item 1",
    "Certified copy of record item 2",
    "Certified copy of record item 3",
    "Certified copy of record item 4"
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
    console.error("AI Analysis Error:", error);
    return Response.json(offlineState(query));
  }
}