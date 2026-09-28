import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DAS — Direct Attached Storage: Complete Engineer Guide | Behind The Tech",
  description:
    "What DAS is, architecture, types (internal/JBOD/NVMe), interfaces (SAS/SATA/NVMe), RAID, TLER/ERC, production lifecycle (from planning to decommissioning), troubleshooting, OEM reference and interview tips — the complete English engineer handbook.",
  keywords: [
    "direct attached storage", "DAS storage", "JBOD", "SAS storage", "NVMe DAS",
    "RAID controller", "HBA storage", "enterprise storage", "TLER ERC", "hot swap drive",
    "storage troubleshooting", "perccli", "ssacli", "smartctl", "data center storage",
  ],
  openGraph: {
    title: "DAS — Direct Attached Storage: Complete Engineer Guide",
    description: "DAS architecture, types, interfaces, RAID, production lifecycle, OEM reference and troubleshooting — complete guide.",
    url: "https://behindthetech.in/learn/it/storage/das",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DAS — Direct Attached Storage | Behind The Tech",
    description: "Direct Attached Storage — the complete engineer guide in English. From planning to decommissioning.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/it/storage/das",
    languages: {
      en: "https://behindthetech.in/learn/it/storage/das",
      hi: "https://behindthetech.in/hi/learn/it/storage/das",
      "x-default": "https://behindthetech.in/learn/it/storage/das",
    },
  },
};

export const faqs = [
  {
    q: "What is the main difference between DAS, NAS and SAN?",
    a: "DAS is physically connected directly to one server — no network, only that server accesses it. NAS is file-level storage that is accessible to multiple clients over a standard Ethernet network. SAN is block-level storage on a dedicated storage network (FC or iSCSI) — multiple servers get high-performance block access. In production all three coexist for different use cases.",
  },
  {
    q: "Why are consumer drives not used in enterprise RAID?",
    a: "Consumer drives do not have TLER (Time-Limited Error Recovery). When a consumer drive hits a bad sector, it retries aggressively — for minutes. The RAID controller decides within ~15 seconds that the drive has failed — and drops it. Enterprise drives hand off to the controller after a time limit. In production: consumer drive = RAID drop risk = array degrade = potential data loss.",
  },
  {
    q: "What is the difference between RAID degraded and RAID failed?",
    a: "Degraded: One drive failed, within the RAID tolerance — data accessible, redundancy temporarily gone. Failed: Tolerance exceeded — 2 drives failed in RAID 5, both failed in RAID 1 — data inaccessible. On degraded: verify the backup, replace immediately. On failed: a backup restore is typically needed.",
  },
  {
    q: "What is a hot spare and why is it configured?",
    a: "An extra pre-assigned drive that sits idle in the RAID pool. When a production drive fails — the hot spare automatically starts the rebuild without an engineer being physically present. Critical in 24x7 operations — a drive fails at 3 AM, the hot spare rebuild completes by 6 AM, and when the engineer arrives the next morning it is already rebuilt.",
  },
  {
    q: "Is it safe to enable write cache without a BBU?",
    a: "No. Write cache enabled + no BBU = cached writes permanently lost on power failure = filesystem corruption or database inconsistency. Enable write cache only when the BBU or FBWC is healthy and charged. The controller typically switches to write-through mode automatically when the battery fails.",
  },
  {
    q: "What is the difference between secure erase and format?",
    a: "Format only removes filesystem metadata — the data bytes remain physically present and are recoverable with recovery tools. Secure erase overwrites or cryptographically erases the actual data bytes — recovery is extremely difficult or impossible. Always secure erase during decommissioning. Follow the NIST 800-88 guidelines.",
  },
  {
    q: "How far can an external JBOD be from the server?",
    a: "Standard SAS passive cable: reliable up to ~10 meters. Active SAS cables: ~20 meters possible. For cross-floor or long distances within a building DAS is not appropriate — consider SAN. DAS is designed for rack-level direct attachment.",
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
