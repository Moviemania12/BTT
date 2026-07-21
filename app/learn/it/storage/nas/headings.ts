// ═══════════════════════════════════════════════════════════════════════════
// app/learn/it/storage/nas/headings.ts
//
// NAS article Table of Contents — single source of truth for the sticky
// TOC sidebar. FAQ is excluded per platform architecture.
// Every id must match the corresponding <h2> id in Content.tsx.
// ═══════════════════════════════════════════════════════════════════════════

import type { ArticleHeading } from "@/components/ArticlePage";

export const HEADINGS: ArticleHeading[] = [
  { id: "nas-kya-hai",              text: "NAS Kya Hai — Definition aur Full Form",           level: 1 },
  { id: "das-vs-nas",               text: "DAS vs NAS — Fundamental Difference",              level: 1 },
  { id: "nas-vs-external-hdd",      text: "NAS vs Normal External Hard Disk",                 level: 1 },
  { id: "nas-vs-san",               text: "NAS vs SAN — Brief Introduction",                  level: 1 },
  { id: "nas-vs-cloud",             text: "NAS vs Cloud Storage",                             level: 1 },
  { id: "file-level-storage",       text: "File-Level Storage Kya Hota Hai",                  level: 1 },
  { id: "how-nas-works",            text: "How NAS Works — Complete Data Path",               level: 1 },
  { id: "nas-architecture",         text: "NAS Architecture — Hardware Components",           level: 1 },
  { id: "types-of-nas",             text: "Types of NAS",                                     level: 1 },
  { id: "enterprise-nas-arch",      text: "Enterprise NAS Architecture",                      level: 1 },
  { id: "nas-networking",           text: "NAS Networking — Practical Concepts",              level: 1 },
  { id: "nas-protocols",            text: "NAS Protocols — SMB aur NFS",                      level: 1 },
  { id: "nas-shares-exports",       text: "NAS Shares aur Exports — Practical",               level: 1 },
  { id: "nas-software-os",          text: "NAS Software / Operating System",                  level: 1 },
  { id: "nas-management",           text: "NAS Management Interface",                         level: 1 },
  { id: "nas-quotas",               text: "Quotas",                                           level: 1 },
  { id: "file-locking",             text: "File Locking / Open Files",                        level: 1 },
  { id: "nas-namespace",            text: "Namespace",                                        level: 1 },
  { id: "nas-config-workflow",      text: "NAS Configuration — Practical Workflow",           level: 1 },
  { id: "windows-nas-practical",    text: "Windows + NAS — Practical Access",                 level: 1 },
  { id: "linux-nas-practical",      text: "Linux + NAS — Practical Commands",                 level: 1 },
  { id: "ping-port-connectivity",   text: "Ping, Port aur Connectivity — Key Concepts",       level: 1 },
  { id: "auth-permissions",         text: "Authentication aur Permissions",                   level: 1 },
  { id: "nas-security",             text: "NAS Security",                                     level: 1 },
  { id: "high-availability",        text: "High Availability (HA)",                           level: 1 },
  { id: "snapshots",                text: "Snapshots",                                        level: 1 },
  { id: "backup-replication",       text: "Backup aur Replication",                           level: 1 },
  { id: "capacity-management",      text: "Capacity Management",                              level: 1 },
  { id: "performance",              text: "Performance",                                      level: 1 },
  { id: "monitoring",               text: "Monitoring — What Engineers Watch",                level: 1 },
  { id: "switch-troubleshooting",   text: "Network Troubleshooting — Switch Side",            level: 1 },
  { id: "common-failures",          text: "Common NAS Failures — Field Guide",                level: 1 },
  { id: "troubleshooting-matrix",   text: "Troubleshooting Matrix",                           level: 1 },
  { id: "production-incidents",     text: "Real Production Incident Scenarios",               level: 1 },
  { id: "beginner-mistakes",        text: "Common Beginner / Field Mistakes",                 level: 1 },
  { id: "best-practices",           text: "Best Practices",                                   level: 1 },
  { id: "das-nas-san-comparison",   text: "DAS vs NAS vs SAN — Complete Comparison",          level: 1 },
  { id: "logs-events",              text: "Logs aur Events — What to Collect",                level: 1 },
  { id: "operations-checklist",     text: "Daily / Weekly / Monthly / Quarterly Operations",  level: 1 },
  { id: "preventive-maintenance",   text: "Preventive Maintenance",                           level: 1 },
  { id: "nas-migration",            text: "NAS Migration",                                    level: 1 },
  { id: "nas-vs-windows-fs",        text: "NAS vs Windows File Server",                       level: 1 },
  { id: "interview-questions",      text: "Interview / Job Knowledge",                        level: 1 },
  { id: "key-takeaways",            text: "Key Takeaways",                                    level: 1 },
];
