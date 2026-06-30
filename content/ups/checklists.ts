// ═══════════════════════════════════════════════════════════════════════════
// content/ups/checklists.ts
//
// UPS maintenance checklists, grouped by frequency. Rendered via the
// shared Checklist component; AI registry reads this directly.
// ═══════════════════════════════════════════════════════════════════════════

export interface ChecklistData {
  title: string;
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "half-yearly" | "yearly";
  items: string[];
}

export const upsChecklists: ChecklistData[] = [];
