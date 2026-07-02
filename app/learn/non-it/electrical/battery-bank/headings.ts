// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/headings.ts
//
// Table of Contents — single source of truth for the sticky TOC sidebar.
// All 49 headings map exactly to Blueprint v3.0 Parts 1–25.
// FAQ (Part 25.1) and Interview Questions (Part 25.2) excluded from TOC
// per platform architecture — they render via dedicated FAQ components.
// ═══════════════════════════════════════════════════════════════════════════

import type { ArticleHeading } from "@/components/ArticlePage";

export const HEADINGS: ArticleHeading[] = [
  // Part 1 — Foundation
  { id: "what-is-battery-bank", text: "What Is a Battery Bank?", level: 1 },
  { id: "why-battery-bank-exists", text: "Why Battery Bank Exists in a Data Center", level: 1 },
  { id: "power-chain-position", text: "Where It Sits in the Power Chain", level: 1 },
  { id: "battery-bank-vs-ups-battery", text: "Battery Bank vs UPS Battery", level: 1 },
  { id: "history-evolution", text: "History & Evolution of Data Center Batteries", level: 1 },

  // Part 2 — Battery Technologies
  { id: "battery-technology-overview", text: "Battery Technology Landscape", level: 1 },
  { id: "lead-acid-chemistry", text: "Lead Acid Chemistry", level: 2 },
  { id: "vrla-agm", text: "VRLA AGM — Absorbed Glass Mat", level: 2 },
  { id: "vrla-gel", text: "VRLA Gel", level: 2 },
  { id: "vla-flooded", text: "VLA — Vented / Flooded Lead Acid", level: 2 },
  { id: "lithium-chemistry", text: "Lithium Chemistry", level: 2 },
  { id: "lfp-battery", text: "LFP — Lithium Iron Phosphate", level: 2 },
  { id: "nmc-battery", text: "NMC — Nickel Manganese Cobalt", level: 2 },
  { id: "sodium-ion", text: "Sodium-Ion Batteries", level: 2 },
  { id: "flow-batteries", text: "Flow Batteries", level: 2 },
  { id: "supercapacitors", text: "Supercapacitors (Ultracapacitors)", level: 2 },
  { id: "flywheel-vs-battery", text: "Flywheel Energy Storage vs Battery", level: 2 },
  { id: "technology-comparison", text: "Technology Comparison Master Table", level: 1 },

  // Part 3 — Electrical Fundamentals
  { id: "electrical-fundamentals", text: "Electrical Fundamentals", level: 1 },
  { id: "ah-explained", text: "Ah (Ampere-Hour) — What It Really Means", level: 2 },
  { id: "wh-explained", text: "Wh (Watt-Hour) — Energy vs Capacity", level: 2 },
  { id: "c-rate", text: "C-Rate — Charge and Discharge Rate", level: 2 },
  { id: "depth-of-discharge", text: "Depth of Discharge (DoD)", level: 2 },
  { id: "state-of-charge", text: "State of Charge (SoC)", level: 2 },
  { id: "state-of-health", text: "State of Health (SoH)", level: 2 },
  { id: "internal-resistance", text: "Internal Resistance & Impedance", level: 2 },
  { id: "float-vs-equalisation", text: "Float Voltage vs Equalisation Voltage", level: 2 },
  { id: "peukerts-law", text: "Peukert's Law", level: 2 },
  { id: "ripple-current", text: "Ripple Current — The Hidden Battery Killer", level: 2 },

  // Part 4 — Battery Life Calculator Inputs
  { id: "battery-life-inputs", text: "Battery Life Calculator Inputs", level: 1 },

  // Part 5 — OEM Datasheet Reading Guide
  { id: "datasheet-guide", text: "OEM Datasheet Reading Guide", level: 1 },

  // Part 6 — Battery Sizing
  { id: "battery-sizing", text: "Battery Sizing Methodology", level: 1 },
  { id: "sizing-worked-examples", text: "Sizing Worked Examples", level: 2 },

  // Part 7 — Battery Selection Guide
  { id: "battery-selection-guide", text: "Battery Selection Guide", level: 1 },

  // Part 8 — String Architecture
  { id: "string-architecture", text: "String Architecture", level: 1 },
  { id: "series-vs-parallel", text: "Series vs Parallel", level: 2 },
  { id: "string-fusing", text: "String Fusing & Protection", level: 2 },

  // Part 9 — DC Bus & System Integration
  { id: "dc-bus-integration", text: "DC Bus & System Integration", level: 1 },

  // Part 10 — Battery Management System
  { id: "bms", text: "Battery Management System (BMS)", level: 1 },

  // Part 11 — Battery Room Engineering Calculations
  { id: "room-engineering-calculations", text: "Battery Room Engineering Calculations", level: 1 },
  { id: "h2-ventilation-calc", text: "Hydrogen Ventilation Calculation", level: 2 },
  { id: "heat-load-calc", text: "Heat Load Calculation", level: 2 },
  { id: "cooling-load-calc", text: "Battery Room Cooling Load", level: 2 },
  { id: "floor-loading-calc", text: "Floor Loading Calculation", level: 2 },
  { id: "weight-calc", text: "Battery Weight Calculation", level: 2 },
  { id: "room-sizing-calc", text: "Room Sizing Calculation", level: 2 },

  // Part 12 — Battery Room Design
  { id: "battery-room-design", text: "Battery Room Design", level: 1 },

  // Part 13 — OEM & Vendor Landscape
  { id: "oem-vendors", text: "OEM & Vendor Landscape", level: 1 },
  { id: "indian-oems", text: "Indian OEMs — VRLA", level: 2 },
  { id: "global-oems-vrla", text: "Global OEMs — VRLA", level: 2 },
  { id: "global-oems-liion", text: "Global OEMs — Lithium-Ion", level: 2 },

  // Part 14 — Common Engineering Mistakes
  { id: "common-mistakes", text: "Common Engineering Mistakes", level: 1 },

  // Part 15 — Battery Failure Gallery
  { id: "failure-gallery", text: "Battery Failure Gallery", level: 1 },

  // Part 16 — Installation & Commissioning
  { id: "installation-commissioning", text: "Installation & Commissioning", level: 1 },

  // Part 17 — Operation
  { id: "operation", text: "Operation", level: 1 },

  // Part 18 — Testing & Maintenance
  { id: "testing-maintenance", text: "Testing & Maintenance", level: 1 },

  // Part 19 — Real Maintenance Documentation
  { id: "maintenance-documentation", text: "Real Maintenance Documentation", level: 1 },

  // Part 20 — Common Faults & Troubleshooting
  { id: "common-faults", text: "Common Faults & Troubleshooting", level: 1 },

  // Part 21 — Safety
  { id: "safety", text: "Safety", level: 1 },

  // Part 22 — Tier III & Tier IV Design
  { id: "tier-iii-iv-design", text: "Tier III & Tier IV Design", level: 1 },

  // Part 23 — Standards Mapping Table
  { id: "standards-mapping", text: "Standards Mapping Table", level: 1 },

  // Part 24 — Future Trends
  { id: "future-trends", text: "Future Trends", level: 1 },

  // Part 25 — Closing
  { id: "key-takeaways", text: "Key Takeaways", level: 1 },
];
