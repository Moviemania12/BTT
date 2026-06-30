// ═══════════════════════════════════════════════════════════════════════════
// lib/schemas/speakableSchema.ts
// Reusable JSON-LD SpeakableSpecification builder for voice assistants.
// ═══════════════════════════════════════════════════════════════════════════

export interface SpeakableSchemaInput {
  cssSelectors: string[];
  url: string;
}

export function buildSpeakableSchema(input: SpeakableSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: { "@type": "SpeakableSpecification", cssSelector: input.cssSelectors },
    url: input.url,
  };
}
