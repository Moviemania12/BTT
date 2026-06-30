// ═══════════════════════════════════════════════════════════════════════════
// lib/schemas/index.ts
// Barrel export — articles import every schema builder from one path.
// ═══════════════════════════════════════════════════════════════════════════

export { buildArticleSchema, type ArticleSchemaInput } from "./articleSchema";
export { buildBreadcrumbSchema, type BreadcrumbItem } from "./breadcrumbSchema";
export { buildFaqSchema, type FaqItem } from "./faqSchema";
export { buildHowToSchema, type HowToSchemaInput, type HowToStep } from "./howToSchema";
export { buildSpeakableSchema, type SpeakableSchemaInput } from "./speakableSchema";
export { buildOrganizationSchema, buildAuthorSchema, type OrganizationSchemaInput, type AuthorSchemaInput } from "./organizationSchema";
export { buildRobotsMeta, buildOpenGraphMeta, buildTwitterMeta, buildPageMetadata } from "./metaTags";
