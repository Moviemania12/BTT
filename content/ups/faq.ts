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
    question: "UPS and DG Set are both backup, so why are both needed?",
    answer:
      "UPS is for instant transfer (zero downtime, immediate switch to battery). DG Set is for extended runtime — a UPS battery typically runs only 10-15 minutes, whereas a DG Set can run for hours. The UPS covers the gap until the DG starts.",
  },
  {
    question: "Why is the Online Double Conversion UPS the standard in Data Centers?",
    answer:
      "Online Double Conversion (IEC 62040 classification: VFI) completely isolates the output from the input — no voltage sag, surge, frequency variation or harmonics reach the load. Transfer time is zero because the load always takes power from the inverter.",
  },
  {
    question: "Why is DoD (Depth of Discharge) important in battery sizing?",
    answer:
      "Discharging a battery 100% permanently damages its capacity. A DoD limit (such as 80% for VRLA) preserves battery life by avoiding deep discharge cycles — this is a trade-off between usable capacity and battery longevity.",
  },
  {
    question: "What is the difference between VRLA and Lithium-ion batteries?",
    answer:
      "VRLA is cheaper upfront but gives a 3-5 year life and is heavy/bulky. Lithium-ion is 2-3x more costly upfront but gives a 10-15 year life, up to 70% smaller footprint, and often a lower total cost of ownership over 10 years despite the higher upfront cost.",
  },
  {
    question: "What is the difference between N+1 and 2N redundancy?",
    answer:
      "N+1 means there is one extra module for backup — it survives a single module failure. 2N means there is a whole second independent path — it can survive a complete path failure (not just one module). 2N is more costly but is mandatory for Tier IV.",
  },
];
