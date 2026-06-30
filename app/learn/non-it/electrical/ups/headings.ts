// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/headings.ts
//
// Table of Contents — single source of truth for the sticky TOC sidebar.
// FAQ is intentionally excluded per architecture plan (Phase 1).
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx, extended in
// Phase 4 with two new top-level anchors required by sections 26-27
// (Static Transfer Switch, PDU) which Phase 1's original 47-entry plan
// had only referenced as cross-links, not as their own sections.
// ═══════════════════════════════════════════════════════════════════════════

import type { ArticleHeading } from "@/components/ArticlePage";

export const HEADINGS: ArticleHeading[] = [
  { id: "what-is-ups", text: "What is a UPS?", level: 1 },
  { id: "why-ups-required", text: "Why UPS is Required", level: 1 },
  { id: "history-of-ups", text: "History of UPS Technology", level: 1 },
  { id: "ups-standards", text: "UPS Standards & Codes", level: 1 },
  { id: "working-principle", text: "Working Principle", level: 1 },
  { id: "internal-block-diagram", text: "Internal Block Diagram", level: 1 },
  { id: "ups-single-line-diagram", text: "UPS Single Line Diagram (SLD)", level: 1 },
  { id: "components", text: "Core Components Overview", level: 1 },
  { id: "rectifier", text: "Rectifier", level: 2 },
  { id: "inverter", text: "Inverter", level: 2 },
  { id: "static-switch", text: "Static Switch", level: 2 },
  { id: "battery-charger", text: "Battery Charger", level: 2 },
  { id: "ups-types", text: "UPS Types Overview", level: 1 },
  { id: "offline-ups", text: "Offline (Standby) UPS", level: 2 },
  { id: "line-interactive-ups", text: "Line Interactive UPS", level: 2 },
  { id: "online-double-conversion", text: "Online Double Conversion UPS", level: 2 },
  { id: "delta-conversion", text: "Delta Conversion UPS", level: 2 },
  { id: "modular-ups", text: "Modular UPS", level: 2 },
  { id: "capacity-selection", text: "Capacity Selection (VA/kVA/kW/PF)", level: 1 },
  { id: "ups-sizing", text: "UPS Sizing Methodology", level: 1 },
  { id: "load-calculation", text: "Load Calculation (Worked Examples)", level: 1 },
  { id: "battery-types", text: "Battery Types", level: 1 },
  { id: "battery-bank-config", text: "Battery Bank: Series / Parallel / Series-Parallel", level: 1 },
  { id: "battery-calculation", text: "Battery & Runtime Calculation", level: 1 },
  { id: "battery-monitoring-system", text: "Battery Monitoring System (BMS)", level: 1 },
  { id: "dc-bus", text: "DC Bus", level: 1 },
  { id: "input-output-supply", text: "Input & Output Supply", level: 1 },
  { id: "bypass-modes", text: "Bypass: Static / Maintenance / Internal", level: 1 },
  { id: "eco-mode", text: "ECO Mode", level: 1 },
  { id: "redundancy-architecture", text: "Redundancy: N / N+1 / N+2 / 2N / 2(N+1)", level: 1 },
  { id: "parallel-ups", text: "Parallel UPS Systems", level: 1 },
  { id: "dual-bus-ab-feed", text: "Dual Bus & A-B Feed Architecture", level: 1 },
  { id: "static-transfer-switch", text: "Static Transfer Switch (STS)", level: 1 },
  { id: "pdu-distribution", text: "Power Distribution Unit (PDU)", level: 1 },
  { id: "data-center-ups-architecture", text: "Data Center UPS Architecture", level: 1 },
  { id: "ups-battery-room-layout", text: "UPS Room & Battery Room Layout", level: 1 },
  { id: "earthing-cable-sizing", text: "Earthing & Cable Sizing", level: 1 },
  { id: "ups-efficiency-harmonics", text: "Efficiency, Power Factor & Harmonics", level: 1 },
  { id: "ups-monitoring-protocols", text: "Monitoring: SNMP, Modbus, BACnet, DCIM, BMS, EMS", level: 1 },
  { id: "ups-alarms-troubleshooting", text: "Alarms & Troubleshooting", level: 1 },
  { id: "maintenance", text: "Preventive & Corrective Maintenance", level: 1 },
  { id: "common-failures", text: "Common Failures", level: 1 },
  { id: "ups-vs-generator", text: "UPS vs Generator", level: 1 },
  { id: "ups-vs-inverter", text: "UPS vs Inverter", level: 1 },
  { id: "ups-critical-applications", text: "UPS in Hospitals, Airports, Banks, Data Centers", level: 1 },
  { id: "oem-comparison", text: "OEM Comparison", level: 1 },
  { id: "real-project-examples", text: "Real Project Examples", level: 1 },
  { id: "interview-questions", text: "Interview Questions", level: 1 },
  { id: "key-takeaways", text: "Key Takeaways", level: 1 },
];
