// ═══════════════════════════════════════════════════════════════════════════
// lib/schemas/organizationSchema.ts
// Reusable Organization and Author (Person) schema builders.
// ═══════════════════════════════════════════════════════════════════════════

export interface OrganizationSchemaInput {
  name: string;
  url: string;
  logoUrl?: string;
}

export function buildOrganizationSchema(input: OrganizationSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.name,
    url: input.url,
    ...(input.logoUrl ? { logo: input.logoUrl } : {}),
  };
}

export interface AuthorSchemaInput {
  name: string;
  url?: string;
}

export function buildAuthorSchema(input: AuthorSchemaInput) {
  return {
    "@type": "Person",
    name: input.name,
    ...(input.url ? { url: input.url } : {}),
  };
}
