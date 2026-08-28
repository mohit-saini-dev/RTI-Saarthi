"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";

const disclaimers: Record<string, string> = {
  en: "Disclaimer: RTI Saarthi is an independent hackathon prototype for demonstration purposes. It is not affiliated with, endorsed by, or operated by the Government of India.",
  hi: "अस्वीकरण: आरटीआई सारथी केवल प्रदर्शन उद्देश्यों के लिए बनाया गया एक स्वतंत्र हैकाथॉन प्रोटोटाइप है। इसका भारत सरकार से कोई संबंध नहीं है।",
  bn: "দাবিত্যাগ: আরটিআই সারথি একটি স্বাধীন হ্যাকাথন প্রোটোটাইপ যা শুধুমাত্র প্রদর্শনের উদ্দেশ্যে তৈরি। এটি ভারত সরকারের সাথে অনুমোদিত নয়।",
  te: "నిరాకరణ: RTI సారథి అనేది ప్రదర్శన ప్రయోజనాల కోసం మాత్రమే రూపొందించబడిన స్వతంత్ర హ్యాకథాన్ ప్రోటోటైప్. ఇది భారత ప్రభుత్వంతో అనుబంధించబడలేదు.",
  mr: "अस्वीकरण: आरटीआय सारथी हा केवळ प्रात्यक्षिकासाठी तयार केलेला एक स्वतंत्र हॅकाथॉन प्रोटोटाइप आहे. याचा भारत सरकारशी संबंध नाही.",
  ta: "பொறுப்புத் துறப்பு: ஆர்டிஐ சாரதி என்பது மாதிரி பயன்பாட்டிற்காக உருவாக்கப்பட்ட ஒரு சுயாதீன ஹேக்கத்தான் முன்மாதிரி.",
  gu: "અસ્વીકરણ: RTI સારથી એ પ્રદર્શન હેતુ માટે બનાવવામાં આવેલ એક સ્વતંત્ર હેકાથોન પ્રોટોટાઇપ છે.",
  kn: "ಹಕ್ಕುತ್ಯಾಗ: RTI ಸಾರಥಿಯು ಪ್ರದರ್ಶನ ಉದ್ದೇಶಗಳಿಗಾಗಿ ರಚಿಸಲಾದ ಸ್ವತಂತ್ರ ಹ್ಯಾಕಥಾನ್ ಮೂಲಮಾದರಿಯಾಗಿದೆ.",
  ml: "നിരാകരണം: ആർടിഐ സാരഥി ഒരു ഡെമോ ആവശ്യങ്ങൾക്കായി നിർമ്മിച്ച സ്വതന്ത്ര ഹാക്കത്തോൺ പ്രോട്ടോടൈപ്പ് ആണ്.",
  pa: "ਬੇਦਾਅਵਾ: ਆਰਟੀਆਈ ਸਾਰਥੀ ਪ੍ਰਦਰਸ਼ਨ ਦੇ ਉਦੇਸ਼ਾਂ ਲਈ ਬਣਾਇਆ ਗਿਆ ਇੱਕ ਸੁਤੰਤਰ ਹੈਕਾਥੌਨ ਪ੍ਰੋਟੋਟਾਈਪ ਹੈ।"
};

export default function DisclaimerBanner() {
  const { language } = useLanguage();
  const currentText = disclaimers[language] || disclaimers.en;

  return (
    <div
      style={{
        backgroundColor: "#fef3c7",
        borderBottom: "1px solid #f59e0b",
        color: "#92400e",
        padding: "8px 16px",
        fontSize: "13px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
      }}
    >
      <span>⚠️ {currentText}</span>
    </div>
  );
}
