// ═══════════════════════════════════════════════════════════════════════════
// lib/schemas/breadcrumbSchema.ts
// Reusable JSON-LD BreadcrumbList schema builder, shared across all articles.
// ═══════════════════════════════════════════════════════════════════════════

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
