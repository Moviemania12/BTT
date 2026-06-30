// ═══════════════════════════════════════════════════════════════════════════
// content/ups/examples.ts
//
// UPS worked calculation examples — structured data extracted from the
// real Section 13 (Load Calculation) content written in Phase 3.
// ═══════════════════════════════════════════════════════════════════════════

import type { WorkedExample } from "@/types/engineering/content";

export const upsExamples: WorkedExample[] = [
  {
    title: "100 Rack Data Center",
    rows: [
      { component: "Servers (100 racks × 4kW avg)", valueKw: 400, notes: "Compute load — biggest share" },
      { component: "Storage", valueKw: 60, notes: "SAN/NAS arrays" },
      { component: "Network", valueKw: 25, notes: "Core/leaf switches, routers" },
      { component: "PDU losses", valueKw: 15, notes: "~3% distribution loss" },
      { component: "Lighting", valueKw: 8, notes: "LED, occupancy-sensor controlled" },
      { component: "Security (CCTV, access control)", valueKw: 5, notes: "Low but mandatory load" },
    ],
    steps: [
      "Total Connected Load: 513 kW",
      "Demand Factor (80%): 513 × 0.8 = 410.4 kW",
      "Power Factor (0.9): 410.4 ÷ 0.9 = 456 kVA",
      "Future Growth (25%): 456 × 1.25 = 570 kVA",
    ],
    finalResult: "Final UPS Size (Tier III, N+1): ~600 kVA (2 × 300 kVA modules + 1 redundant)",
  },
  {
    title: "Office Building (Mixed IT + Common Area)",
    rows: [
      { component: "Small server room (10 racks)", valueKw: 25 },
      { component: "Workstations (200 PCs)", valueKw: 30 },
      { component: "Network equipment", valueKw: 5 },
    ],
    steps: [
      "Total Connected Load: 60 kW",
      "Demand Factor (75%): 60 × 0.75 = 45 kW",
      "Power Factor (0.85): 45 ÷ 0.85 = 53 kVA",
    ],
    finalResult: "Final UPS Size: 60 kVA standard unit",
  },
  {
    title: "Hospital Critical Power",
    rows: [
      { component: "ICU + OT equipment", valueKw: 80 },
      { component: "HIS (Hospital Information System) servers", valueKw: 20 },
      { component: "Imaging (CT/MRI support systems)", valueKw: 40 },
      { component: "Emergency lighting", valueKw: 10 },
    ],
    steps: [
      "Total Connected Load: 150 kW",
      "Demand Factor (90% — hospital loads less diversifiable): 150 × 0.9 = 135 kW",
      "Power Factor (0.9): 135 ÷ 0.9 = 150 kVA",
    ],
    finalResult: "Final UPS Size (2N — life-safety critical): 2 × 200 kVA fully redundant paths",
  },
  {
    title: "Industrial Plant (Control Systems Only)",
    rows: [
      { component: "PLC/SCADA panels", valueKw: 15 },
      { component: "HMI workstations", valueKw: 5 },
      { component: "Instrumentation power", valueKw: 10 },
    ],
    steps: [
      "Total Connected Load: 30 kW",
      "Demand Factor (95% — control systems run continuously): 30 × 0.95 = 28.5 kW",
      "Power Factor (0.95 — modern PLC power supplies): 28.5 ÷ 0.95 = 30 kVA",
    ],
    finalResult: "Final UPS Size: 30 kVA, N (single path acceptable for non-critical control loop)",
  },
];
