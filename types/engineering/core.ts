// ═══════════════════════════════════════════════════════════════════════════
// types/engineering/core.ts
//
// Domain-agnostic structural types for shared UI components. These are
// distinct from types/engineering/content.ts (which defines the full
// per-article ArticleContent contract) and types/engineering/registry.ts
// (which defines the AI-facing registry shapes) — this file holds the
// minimal shapes the *generic, reusable UI components* in
// components/engineering/* need, independent of any specific article.
//
// GAP FOUND DURING PHASE 1 VALIDATION: components/engineering/Checklist.tsx
// and EngineeringTable.tsx referenced "@/types/engineering" (a flat path
// that no longer exists after the domain-folder split) for ChecklistData
// and ComparisonTableData. Those shapes were never migrated into the new
// types/engineering/ folder — only an article-specific ChecklistData
// existed (content/ups/checklists.ts). This file completes that gap with
// the domain-agnostic versions the shared components actually need.
// ═══════════════════════════════════════════════════════════════════════════

export interface ComparisonTableData {
  title?: string;
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface ChecklistItem {
  task: string;
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "half-yearly" | "yearly";
  done?: boolean;
}

export interface ChecklistData {
  title: string;
  items: ChecklistItem[];
}
