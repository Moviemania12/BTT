// ═══════════════════════════════════════════════════════════════════════════
// lib/schemas/howToSchema.ts
// Reusable JSON-LD HowTo schema builder for worked calculation examples.
// ═══════════════════════════════════════════════════════════════════════════

export interface HowToStep {
  name: string;
  text: string;
}

export interface HowToSchemaInput {
  name: string;
  description: string;
  steps: HowToStep[];
}

export function buildHowToSchema(input: HowToSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    step: input.steps.map((step) => ({ "@type": "HowToStep", name: step.name, text: step.text })),
  };
}
