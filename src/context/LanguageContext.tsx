"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type LanguageCode = "en" | "hi" | "bn" | "te" | "mr" | "ta" | "gu" | "kn" | "ml" | "pa";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    portalTitle: "CITIZEN SERVICES PORTAL",
    aboutRti: "About RTI Saarthi",
    appName: "RTI SAARTHI",
    appSub: "Citizen Intelligence & RTI Filing Layer",
    liveAlert: "Statutory Alert: Section 7(1) mandates a 30-day response window. Do not attach Aadhaar or PAN numbers.",
    screen1Badge: "Screen 1 / Ask a question",
    heroTitle: "Ask the government with clarity.",
    heroSub: "Convert plain-language questions into clear, structured RTI requests and guide citizens through the process.",
    inputLabel: "What would you like to find out?",
    inputPlaceholder: "For example: What is the status of the road repair tender in Ward 4?",
    continueBtn: "Continue",
    clearPass: "Query is clear",
    clearPassSub: "Sufficient details provided to identify the public record subject.",
    recentInquiries: "Recent Public Inquiries",
    whyMatterTitle: "Built for clarity",
    whyMatterSub: "Every successful RTI starts with an answerable question and a clear public authority.",
    screen2Badge: "Screen 2 / Understand your goal",
    understandTitle: "Determine the correct filing route.",
    understandSub: "RTI is designed to request existing public records, not to resolve operational grievances directly.",
    infoPathTitle: "Find out what happened",
    infoPathSub: "Use RTI to request official files, sanction orders, and related records for this topic.",
    grievancePathTitle: "File a Grievance",
    grievancePathSub: "Report service delays or administrative non-action directly to CPGRAMS for executive resolution.",
    proceedRti: "Proceed with RTI Request",
    screen3Badge: "Screen 3 / Sahi Sawal",
    sahiSawalTitle: "Structured requests for existing public records under Section 2(f):",
    sahiSawalSub: "These four requests turn your inquiry into specific, tangible records that can be sought under Section 2(f).",
    useRecordsBtn: "Use these records",
    screen4Badge: "Screen 4 / Authority match",
    authorityTitle: "Who should receive this request?",
    authoritySub: "We matched your records request to the public authority most likely to hold the information.",
    matchedAuthLabel: "MATCHED AUTHORITY",
    whyMatchLabel: "WHY THIS MATCH",
    looksRightBtn: "Looks right, continue",
    screen5Badge: "Screen 5 / Health check",
    healthTitlePass: "Ready for submission.",
    healthTitleWarn: "One check requires attention.",
    healthSub: "Deterministic rule engines verified your request parameters before submission.",
    reviewBtn: "Review & submit",
    screen6Badge: "Screen 6 / Review & submit",
    reviewTitle: "One last look before you send.",
    reviewSub: "Your request is ready. Check the records below, then proceed to view your RTI lifecycle journey or download your draft.",
    proceedJourneyBtn: "Proceed to RTI Journey",
    downloadBtn: "Download Application",
    screen7Badge: "Screen 7 / Your RTI Journey & Lifecycle",
    journeyTitle: "Track what happens next.",
    journeySub: "Illustrative lifecycle for this RTI submission.",
    firstAppealGuidanceBtn: "View First Appeal Guidance",
    screen8Badge: "Screen 8 / Appeal guidance & escalation",
    appealTitle: "Ready for the next step.",
    appealSub: "If the Public Information Officer does not respond within the statutory timeline, a First Appeal may be filed under Section 19(1).",
    copyDraftBtn: "Copy Draft",
    downloadTxtBtn: "Download .txt",
    startNewBtn: "Start New Inquiry",
    faqAssistant: "RTI Help Desk"
  },
  hi: {
    portalTitle: "नागरिक सेवा पोर्टल",
    aboutRti: "आरटीआई सारथी के बारे में",
    appName: "आरटीआई सारथी",
    appSub: "नागरिक आसूचना एवं आरटीआई आवेदन प्रणाली",
    liveAlert: "वैधानिक चेतावनी: धारा 7(1) के तहत 30 दिनों में उत्तर अनिवार्य है। आधार या पैन नंबर संलग्न न करें।",
    screen1Badge: "स्क्रीन 1 / प्रश्न पूछें",
    heroTitle: "सरकार से स्पष्टता के साथ पूछें।",
    heroSub: "अपनी सरल भाषा के प्रश्नों को सभी विभागों के लिए संरचित और कानूनी रूप से मान्य आरटीआई अनुरोधों में बदलें।",
    inputLabel: "आप क्या जानना चाहते हैं?",
    inputPlaceholder: "उदाहरण: वार्ड 4 सड़क मरम्मत टेंडर स्थिति एवं ठेकेदार फाइल नोटिंग्स",
    continueBtn: "जारी रखें",
    clearPass: "प्रश्न स्पष्ट है",
    clearPassSub: "सार्वजनिक रिकॉर्ड खोजने के लिए पर्याप्त विवरण उपलब्ध हैं।",
    recentInquiries: "हाल की सार्वजनिक पूछताछ",
    whyMatterTitle: "स्पष्टता के लिए निर्मित",
    whyMatterSub: "हर उत्तर एक सटीक सवाल और स्पष्ट सार्वजनिक प्राधिकरण से शुरू होता है।",
    screen2Badge: "स्क्रीन 2 / अपना लक्ष्य समझें",
    understandTitle: "सही आवेदन मार्ग चुनें।",
    understandSub: "आरटीआई का उपयोग मौजूदा सरकारी रिकॉर्ड प्राप्त करने के लिए किया जाता है, सीधे शिकायत निवारण के लिए नहीं।",
    infoPathTitle: "क्या हुआ, पता करें",
    infoPathSub: "इस विषय पर आधिकारिक फाइलें, स्वीकृति आदेश और रिकॉर्ड मांगने के लिए आरटीआई का उपयोग करें।",
    grievancePathTitle: "शिकायत दर्ज करें",
    grievancePathSub: "प्रशासनिक देरी या निष्क्रियता की शिकायत सीधे CPGRAMS पर दर्ज करें।",
    proceedRti: "आरटीआई अनुरोध जारी रखें",
    screen3Badge: "स्क्रीन 3 / सही सवाल",
    sahiSawalTitle: "धारा 2(f) के तहत मौजूदा सार्वजनिक रिकॉर्ड के लिए संरचित अनुरोध:",
    sahiSawalSub: "ये चार बिंदु आपके प्रश्न को ठोस और वैधानिक रिकॉर्ड अनुरोध में बदलते हैं।",
    useRecordsBtn: "इन रिकॉर्ड्स का उपयोग करें",
    screen4Badge: "स्क्रीन 4 / प्राधिकरण मिलान",
    authorityTitle: "यह अनुरोध किसे भेजा जाना चाहिए?",
    authoritySub: "हमने आपके रिकॉर्ड अनुरोध को संबंधित सार्वजनिक प्राधिकरण से सुमेलित किया है।",
    matchedAuthLabel: "मिलान किया गया प्राधिकरण",
    whyMatchLabel: "यह मिलान क्यों",
    looksRightBtn: "सही है, जारी रखें",
    screen5Badge: "स्क्रीन 5 / स्वास्थ्य जांच",
    healthTitlePass: "आवेदन दाखिल करने के लिए तैयार।",
    healthTitleWarn: "एक जांच पर ध्यान देने की आवश्यकता है।",
    healthSub: "नियम इंजनों ने आवेदन दाखिल करने से पहले आपके अनुरोध की पुष्टि की है।",
    reviewBtn: "समीक्षा और जमा करें",
    screen6Badge: "स्क्रीन 6 / समीक्षा और जमा करें",
    reviewTitle: "भेजने से पहले अंतिम जांच।",
    reviewSub: "आपका अनुरोध तैयार है। नीचे दिए गए रिकॉर्ड देखें, फिर यात्रा देखें या मसौदा डाउनलोड करें।",
    proceedJourneyBtn: "आरटीआई यात्रा पर आगे बढ़ें",
    downloadBtn: "आवेदन डाउनलोड करें",
    screen7Badge: "स्क्रीन 7 / आपकी आरटीआई यात्रा",
    journeyTitle: "आगे क्या होता है, देखें।",
    journeySub: "इस आरटीआई आवेदन के लिए सांकेतिक समयसीमा।",
    firstAppealGuidanceBtn: "प्रथम अपील मार्गदर्शन देखें",
    screen8Badge: "स्क्रीन 8 / अपील मार्गदर्शन",
    appealTitle: "अगले चरण के लिए तैयार।",
    appealSub: "यदि लोक सूचना अधिकारी समयसीमा में उत्तर नहीं देते हैं, तो धारा 19(1) के तहत प्रथम अपील दायर की जा सकती है।",
    copyDraftBtn: "ड्राफ्ट कॉपी करें",
    downloadTxtBtn: ".txt डाउनलोड करें",
    startNewBtn: "नई पूछताछ शुरू करें",
    faqAssistant: "आरटीआई सहायता डेस्क"
  },
  bn: {} as any,
  te: {} as any,
  mr: {} as any,
  ta: {} as any,
  gu: {} as any,
  kn: {} as any,
  ml: {} as any,
  pa: {} as any
};

const supportedLocales: LanguageCode[] = ["bn", "te", "mr", "ta", "gu", "kn", "ml", "pa"];
supportedLocales.forEach((locale) => {
  translations[locale] = { ...translations.en };
});

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const saved = localStorage.getItem("rti_lang") as LanguageCode;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem("rti_lang", lang);
  };

  const t = (key: string): string => {
    const currentDict = translations[language] || translations.en;
    return currentDict[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
