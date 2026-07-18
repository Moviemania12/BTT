// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/bms-dcim/bms/headings.ts
//
// BMS article Table of Contents — single source of truth for the sticky
// TOC sidebar. FAQ is excluded from TOC per platform architecture.
// ═══════════════════════════════════════════════════════════════════════════

import type { ArticleHeading } from "@/components/ArticlePage";

export const HEADINGS: ArticleHeading[] = [
  { id: "what-is-bms",               text: "What Is a Building Management System?",              level: 1 },
  { id: "why-dc-uses-bms",           text: "Why Data Centers Use BMS",                           level: 1 },
  { id: "bms-vs-dcim-ems-scada",     text: "BMS vs EMS vs DCIM vs SCADA",                        level: 1 },
  { id: "bms-architecture",          text: "Complete BMS System Architecture",                    level: 1 },
  { id: "sensors-field-devices",     text: "Sensors and Field Devices",                           level: 1 },
  { id: "ddc-plc",                   text: "DDC Controllers and PLCs",                            level: 1 },
  { id: "integration-methods",       text: "Integration Methods — Hardwired and Protocol-Based",  level: 1 },
  { id: "protocols-in-depth",        text: "Protocols in Depth",                                  level: 1 },
  { id: "data-flow",                 text: "Data Flow — From Equipment to HMI",                   level: 1 },
  { id: "what-bms-monitors",         text: "What BMS Can Monitor in a Data Center",               level: 1 },
  { id: "monitoring-vs-control",     text: "Monitoring vs Control — A Critical Distinction",      level: 1 },
  { id: "ups-integration",           text: "How to Integrate a UPS with BMS — Step by Step",     level: 1 },
  { id: "alarm-management",          text: "Alarm Management",                                    level: 1 },
  { id: "trends-reports",            text: "Trends, Reports and Root Cause Analysis",             level: 1 },
  { id: "user-roles",                text: "BMS User Roles and Access Control",                   level: 1 },
  { id: "network-architecture",      text: "BMS Network Architecture",                            level: 1 },
  { id: "software-platforms",        text: "BMS Software Platforms — OEM Overview",               level: 1 },
  { id: "commissioning",             text: "BMS Commissioning and Documentation",                  level: 1 },
  { id: "preventive-maintenance",    text: "Preventive Maintenance",                              level: 1 },
  { id: "troubleshooting",           text: "Engineer Troubleshooting — BMS Data Not Updating",    level: 1 },
  { id: "advantages-limitations",   text: "Advantages and Limitations",                           level: 1 },
  { id: "illustrative-scenario",    text: "Illustrative Scenario",                                level: 1 },
  { id: "interview-questions",      text: "Interview Questions",                                  level: 1 },
  { id: "key-takeaways",            text: "Key Takeaways",                                        level: 1 },
];
