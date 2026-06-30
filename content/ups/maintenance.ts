// ═══════════════════════════════════════════════════════════════════════════
// content/ups/maintenance.ts
//
// UPS maintenance tasks (Daily/Weekly/Monthly/Quarterly/Half-Yearly/Yearly).
// Populated when Phase 4's maintenance checklist content is written.
// ═══════════════════════════════════════════════════════════════════════════

export interface MaintenanceTask {
  task: string;
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "half-yearly" | "yearly";
}

export const upsMaintenanceTasks: MaintenanceTask[] = [];
