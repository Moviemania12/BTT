import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DAS — Direct Attached Storage: Complete Engineer Guide | Behind The Tech",
  description:
    "DAS kya hai, architecture, types (internal/JBOD/NVMe), interfaces (SAS/SATA/NVMe), RAID, TLER/ERC, production lifecycle (planning se decommissioning tak), troubleshooting, OEM reference aur interview tips — complete Hinglish engineer handbook.",
  keywords: [
    "direct attached storage", "DAS storage", "JBOD", "SAS storage", "NVMe DAS",
    "RAID controller", "HBA storage", "enterprise storage", "TLER ERC", "hot swap drive",
    "storage troubleshooting", "perccli", "ssacli", "smartctl", "data center storage",
  ],
  openGraph: {
    title: "DAS — Direct Attached Storage: Complete Engineer Guide",
    description: "DAS architecture, types, interfaces, RAID, production lifecycle, OEM reference aur troubleshooting — complete guide.",
    url: "https://behindthetech.in/learn/it/storage/das",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DAS — Direct Attached Storage | Behind The Tech",
    description: "Direct Attached Storage — complete engineer guide Hinglish mein. Planning se decommissioning tak.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/it/storage/das" },
};

export const faqs = [
  {
    q: "DAS, NAS aur SAN mein main difference kya hai?",
    a: "DAS directly ek server se physically connected hai — no network, sirf woh server access karta hai. NAS file-level storage hai jo standard Ethernet network par multiple clients ko accessible hai. SAN block-level storage hai dedicated storage network par (FC ya iSCSI) — multiple servers high-performance block access karte hain. Production mein teeno coexist karte hain alag use cases ke liye.",
  },
  {
    q: "Consumer drive enterprise RAID mein kyun nahi lagate?",
    a: "TLER (Time-Limited Error Recovery) consumer drives mein nahi hota. Bad sector milne par consumer drive aggressively retry karta hai — minutes tak. RAID controller ~15 seconds mein decide karta hai drive fail ho gayi — drop kar deta hai. Enterprise drives time-limit ke baad controller ko handoff karti hain. Production mein: consumer drive = RAID drop risk = array degrade = potential data loss.",
  },
  {
    q: "RAID degraded aur RAID failed mein kya fark hai?",
    a: "Degraded: Ek drive fail, RAID tolerance ke andar — data accessible, redundancy temporarily gone. Failed: Tolerance exceed — RAID 5 mein 2 drives fail, RAID 1 mein both fail — data inaccessible. Degraded pe: backup verify karo, immediately replace karo. Failed pe: backup restore needed typically.",
  },
  {
    q: "Hot spare kya hai aur kyun configure karte hain?",
    a: "Extra pre-assigned drive jo RAID pool mein idle hoti hai. Koi production drive fail hoti hai — hot spare automatically rebuild shuru karta hai bina engineer ke physically present hue. 24x7 operations mein critical — raat 3 baje fail, hot spare rebuild 6 baje tak complete, engineer next morning aata hai already rebuilt.",
  },
  {
    q: "Write cache enable karna safe hai kya bina BBU ke?",
    a: "Nahi. Write cache enabled + no BBU = power failure pe cached writes permanently lost = filesystem corruption ya database inconsistency. Write cache tabhi enable karo jab BBU ya FBWC healthy aur charged ho. Controller typically battery fail hone par automatically write-through mode mein chala jaata hai.",
  },
  {
    q: "Secure erase aur format mein kya fark hai?",
    a: "Format only filesystem metadata remove karta hai — data bytes physically present rehte hain, recovery tools se recoverable. Secure erase actual data bytes overwrite ya cryptographically erase karta hai — recovery extremely difficult ya impossible. Decommissioning mein hamesha secure erase karo. NIST 800-88 guidelines follow karo.",
  },
  {
    q: "External JBOD server se kitni door ho sakta hai?",
    a: "Standard SAS passive cable: reliable ~10 meters. Active SAS cables: ~20 meters possible. Building cross-floor ya long distance ke liye DAS appropriate nahi — SAN consider karo. DAS rack-level direct attachment ke liye designed hai.",
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
