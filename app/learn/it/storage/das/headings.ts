// ═══════════════════════════════════════════════════════════════════════════
// app/learn/it/storage/das/headings.ts
//
// DAS article Table of Contents — single source of truth for the sticky
// TOC sidebar. FAQ is excluded from TOC per platform architecture.
// Every id here must have a matching id on the corresponding <h2> in Content.tsx.
// ═══════════════════════════════════════════════════════════════════════════

import type { ArticleHeading } from "@/components/ArticlePage";

export const HEADINGS: ArticleHeading[] = [
  { id: "das-kya-hai",             text: "DAS Kya Hai — Definition aur Full Form",        level: 1 },
  { id: "das-vs-pc-storage",       text: "DAS vs Normal PC Storage",                      level: 1 },
  { id: "das-architecture",        text: "DAS Architecture",                              level: 1 },
  { id: "das-ke-types",            text: "DAS ke Types",                                  level: 1 },
  { id: "das-interfaces",          text: "DAS Interfaces — Brief Introduction",           level: 1 },
  { id: "das-kahan-use",           text: "DAS Kahan Use Hota Hai",                        level: 1 },
  { id: "das-avoid",               text: "DAS Kahan Avoid Karna Chahiye",                 level: 1 },
  { id: "das-advantages",          text: "DAS ke Advantages",                             level: 1 },
  { id: "das-limitations",         text: "DAS ki Limitations",                            level: 1 },
  { id: "misconceptions",          text: "Common Misconceptions",                         level: 1 },
  { id: "das-vs-nas-san",          text: "DAS aur NAS/SAN — Brief Comparison",            level: 1 },
  { id: "oem-reference",           text: "Enterprise OEM Reference",                      level: 1 },
  { id: "terminology",             text: "Important Storage Terminology",                  level: 1 },
  { id: "lifecycle-planning",      text: "Phase 1 — Planning",                            level: 1 },
  { id: "lifecycle-installation",  text: "Phase 2 — Installation",                        level: 1 },
  { id: "lifecycle-os-config",     text: "Phase 3 — OS-Level Configuration",              level: 1 },
  { id: "lifecycle-commissioning", text: "Phase 4 — Commissioning aur Baseline Testing",  level: 1 },
  { id: "lifecycle-monitoring",    text: "Phase 5 — Monitoring Setup",                    level: 1 },
  { id: "lifecycle-ops",           text: "Phase 6 — Daily Operations",                    level: 1 },
  { id: "lifecycle-alerts",        text: "Phase 7 — Alert Handling",                      level: 1 },
  { id: "lifecycle-replacement",   text: "Phase 8 — Drive Replacement Procedure",         level: 1 },
  { id: "lifecycle-pm",            text: "Phase 9 — Preventive Maintenance",              level: 1 },
  { id: "lifecycle-troubleshoot",  text: "Phase 10 — Troubleshooting",                    level: 1 },
  { id: "lifecycle-rca",           text: "Phase 11 — Root Cause Analysis",                level: 1 },
  { id: "lifecycle-firmware",      text: "Phase 12 — Firmware Upgrade",                   level: 1 },
  { id: "lifecycle-expansion",     text: "Phase 13 — Capacity Expansion",                 level: 1 },
  { id: "lifecycle-migration",     text: "Phase 14 — Migration",                          level: 1 },
  { id: "lifecycle-decommission",  text: "Phase 15 — Decommissioning",                    level: 1 },
  { id: "lifecycle-docs",          text: "Phase 16 — Documentation",                      level: 1 },
  { id: "interview-tips",          text: "Interview Tips",                                 level: 1 },
  { id: "key-takeaways",           text: "Key Takeaways",                                 level: 1 },
];
