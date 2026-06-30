// ═══════════════════════════════════════════════════════════════════════════
// content/ups/faq.ts
//
// UPS FAQ content. Single source of truth — page.tsx renders this AND the
// FAQ JSON-LD schema is generated from this AND the AI registry reads this
// directly via getFAQs("ups").
//
// NOTE: The full 100-FAQ target is Phase 7 work (deferred per the article's
// own phased plan). This file is structurally complete and ready — the
// remaining FAQs get appended here, not architected differently.
// ═══════════════════════════════════════════════════════════════════════════

export interface FaqEntry {
  question: string;
  answer: string;
}

export const upsFaq: FaqEntry[] = [
  {
    question: "UPS aur DG Set dono backup hain, toh dono kyun chahiye?",
    answer:
      "UPS instant transfer ke liye hai (zero downtime, battery se immediate switch). DG Set extended runtime ke liye hai — UPS battery typically sirf 10-15 minutes chalti hai, jabki DG Set ghanton chala sakta hai. UPS DG ke start hone tak ka gap cover karta hai.",
  },
  {
    question: "Online Double Conversion UPS Data Center mein standard kyun hai?",
    answer:
      "Online Double Conversion (IEC 62040 classification: VFI) output ko input se completely isolate karta hai — koi voltage sag, surge, frequency variation, ya harmonics load tak nahi pohonchte. Zero transfer time hota hai kyunki load hamesha inverter se power leta hai.",
  },
  {
    question: "DoD (Depth of Discharge) battery sizing mein kyun important hai?",
    answer:
      "Battery ko 100% discharge karna permanently capacity damage karta hai. DoD limit (jaise 80% for VRLA) battery life preserve karta hai by avoiding deep discharge cycles — yeh trade-off hai usable capacity vs battery longevity ke beech.",
  },
  {
    question: "VRLA aur Lithium-ion battery mein kya difference hai?",
    answer:
      "VRLA sasti hai upfront lekin 3-5 saal life deti hai aur bhaari/bulky hoti hai. Lithium-ion 2-3x zyada costly hai upfront lekin 10-15 saal life deti hai, 70% tak chhota footprint, aur often lower total cost of ownership over 10 years despite higher upfront cost.",
  },
  {
    question: "N+1 aur 2N redundancy mein kya farak hai?",
    answer:
      "N+1 matlab ek extra module hai backup ke liye — single module failure survive karta hai. 2N matlab poora dusra independent path hai — yeh complete path failure (not just one module) survive kar sakta hai. 2N zyada costly hai lekin Tier IV ke liye mandatory hai.",
  },
];
