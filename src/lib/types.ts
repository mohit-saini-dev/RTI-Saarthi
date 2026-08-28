export interface PensionRecord {
  id: string;
  name: string;
  department: string;
  retirementDate: string;
  qualifyingServiceYears: number;
  lastDrawnBasicPay: number;
  monthlyPension: number;
  status: "verified" | "needs-review";
}

export type RequestDomain = "infrastructure" | "pension" | "scholarship" | "civic" | "general";

export interface RtiState {
  question: string;
  domain: RequestDomain;
  goal: string;
  suggestedAuthority: string;
  authorityReason: string;
  citizenGoal: string;
  suitabilityReason: string;
  restructuredRequests: string[];
  publicAuthority: string;
  jurisdiction: "Central" | "State" | "Municipal";
  authorityConfidence: number;
  betterGrievanceRoute: string;
  grievanceUrl: string;
  healthScore: number;
  characterCount: number;
  privacyGuard: string;
  pensionData: PensionRecord[];
  registrationNumber: string;
  validation: {
    isValid: boolean;
    label: string;
    detail: string;
  };
}

export const initialRtiState: RtiState = {
  question: "",
  domain: "pension",
  goal: "Get your pension payment fixed",
  suggestedAuthority: "Department of Pension & Pensioners' Welfare (Central)",
  authorityReason: "Your question appears to concern a Central Government pension.",
  citizenGoal: "Get your pension payment fixed",
  suitabilityReason: "RTI can help you find out WHAT HAPPENED to your case, but it cannot directly release your payment.",
  publicAuthority: "Department of Pension & Pensioners' Welfare (Central)",
  jurisdiction: "Central",
  authorityConfidence: 88,
  betterGrievanceRoute: "CPGRAMS",
  grievanceUrl: "https://pgportal.gov.in",
  healthScore: 91,
  characterCount: 640,
  privacyGuard: "No identity documents or sensitive IDs required",
  registrationNumber: "RTI-2026-000112",
  restructuredRequests: [
    "Copy of the sanction/release order for my pension",
    "Current status of my pension file",
    "Date the last payment was processed",
    "Name/Designation of the officer handling my case",
    "Any file notings or correspondence on the delay",
  ],
  pensionData: [
    {
      id: "RTI-2024-001",
      name: "Anil Kumar Sharma",
      department: "Public Works Department",
      retirementDate: "2024-06-30",
      qualifyingServiceYears: 31,
      lastDrawnBasicPay: 68400,
      monthlyPension: 34200,
      status: "verified",
    },
    {
      id: "RTI-2024-002",
      name: "Meena Joshi",
      department: "School Education",
      retirementDate: "2023-03-31",
      qualifyingServiceYears: 28,
      lastDrawnBasicPay: 61200,
      monthlyPension: 30600,
      status: "verified",
    },
    {
      id: "RTI-2024-003",
      name: "Raghav Prasad",
      department: "Rural Development",
      retirementDate: "2022-11-30",
      qualifyingServiceYears: 24,
      lastDrawnBasicPay: 55800,
      monthlyPension: 27900,
      status: "needs-review",
    },
  ],
  validation: {
    isValid: false,
    label: "Waiting for your question",
    detail: "Ask about a pension record, calculation, or document status.",
  },
};

export const initialDemoState = initialRtiState;

export const defaultUniversalState: RtiState = {
  ...initialRtiState,
  question: "National merit scholarship disbursement delay & sanction order",
  domain: "scholarship",
  citizenGoal: "Obtain official records explaining the National Merit Scholarship disbursement delay",
  goal: "Obtain official scholarship sanction and disbursement records",
  suggestedAuthority: "Ministry of Education / Department of Higher Education",
  authorityReason: "Central scholarship schemes and national education grants are administered directly under Ministry of Education public records (Section 2(f)).",
  suitabilityReason: "RTI can provide certified scholarship sanction, allocation, file noting, and disbursement records under Section 2(f).",
  restructuredRequests: [
    "Certified copy of the scholarship sanction order and release notification for FY 2025-26.",
    "Official criteria and beneficiary disbursement list for National Merit Scholarship.",
    "Certified file notings regarding fund allocation and disbursement timelines.",
    "Name and designation of the Public Information Officer / Section Officer handling student scholarship disbursements.",
  ],
  publicAuthority: "Ministry of Education / Department of Higher Education",
  jurisdiction: "Central",
  authorityConfidence: 96,
  betterGrievanceRoute: "CPGRAMS",
  grievanceUrl: "https://pgportal.gov.in",
  healthScore: 94,
  characterCount: 62,
};