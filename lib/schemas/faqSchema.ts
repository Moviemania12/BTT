// ═══════════════════════════════════════════════════════════════════════════
// lib/schemas/faqSchema.ts
//
// Reusable JSON-LD FAQPage schema builder. Takes the same FaqItem shape
// that content/<slug>/faq.ts exports — schema generation reads structured
// content directly, never duplicates the Q&A text.
// ═══════════════════════════════════════════════════════════════════════════

export interface FaqItem {
  question: string;
  answer: string;
}

export function buildFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
