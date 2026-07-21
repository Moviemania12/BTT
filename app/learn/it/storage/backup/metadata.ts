import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Backup — Data Protection Engineering Handbook | Behind The Tech",
  description:
    "Backup kya hai, snapshot vs replication vs DR, RPO/RTO, full/incremental/differential, 3-2-1 strategy, immutable backup, ransomware recovery, VSS, VMware/Hyper-V, database backup, tape, cloud, restore testing aur O&M — complete Hinglish Data Center engineer handbook.",
  keywords: [
    "data backup", "backup strategy", "RPO RTO", "3-2-1 backup", "immutable backup",
    "ransomware recovery", "backup vs snapshot", "incremental backup", "full backup",
    "VSS backup", "VMware backup", "database backup", "tape backup", "cloud backup",
    "backup restore testing", "data center backup", "backup O&M",
  ],
  openGraph: {
    title: "Backup — Data Protection Engineering Handbook",
    description: "Backup types, strategy, immutability, ransomware recovery, VMware/database/tape/cloud — complete engineer guide.",
    url: "https://behindthetech.in/learn/it/storage/backup",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Backup — Data Protection | Behind The Tech",
    description: "Backup complete engineer guide Hinglish mein — strategy se production O&M tak.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/it/storage/backup" },
};

export const faqs = [
  {
    q: "Backup aur snapshot mein kya fark hai?",
    a: "Snapshot same source storage system pe hota hai — source storage fail ho toh snapshot bhi gone. Backup ek independent copy hai alag storage/location pe — source storage fail hone ke baad bhi accessible. Snapshot fast operational recovery ke liye excellent hai (recent accidental deletion, fast rollback). Independent backup longer-term protection aur site-failure recovery ke liye mandatory hai. Snapshot backup replace nahi karta.",
  },
  {
    q: "RPO aur RTO kya hain?",
    a: "RPO (Recovery Point Objective): Kitna data loss acceptable hai? Last backup se failure time tak ka gap = potential data loss. Ye business decision hai — application criticality pe based. RTO (Recovery Time Objective): Kitna downtime acceptable hai? Ye sirf restore time nahi hai — detection time, decision time, restore time, application startup time, aur validation time sab include hote hain. Dono business team ke saath define karo, sirf IT nahi.",
  },
  {
    q: "Backup job 'Success' show karta hai — kya backup recoverable hai?",
    a: "Nahi — automatically nahi. Backup job 'Success' means data repository mein write hua. Ye prove nahi karta ki data consistent hai, complete hai, application-recoverable hai, ya encryption key accessible hai. Periodic restore tests mandatory hain — isolated environment mein, application startup verify karo. 'Backup ki pariksha tabhi hoti hai jab restore ki zaroorat hoti hai' — is situation se pehle test karo.",
  },
  {
    q: "3-2-1 backup strategy kya hai?",
    a: "3 copies of data, 2 different media/storage types, 1 offsite copy. Modern extension 3-2-1-1-0 adds: 1 offline/air-gapped/immutable copy (ransomware protection ke liye), aur 0 errors after verification/testing. Ye strategies/guidelines hain — formal published standards nahi. Core principle: multiple independent copies, media diversity, offsite/isolated copy.",
  },
  {
    q: "Immutable backup kya hai?",
    a: "Immutable backup retention period mein delete ya modify nahi ki ja sakti. Implementation types: S3 Object Lock (compliance mode — strongest, even root cannot delete; governance mode — privileged users can override), Linux hardened repository, WORM tape. Immutability strength platform aur configured enforcement mode pe depend karti hai — vendor documentation verify karo. Immutability strong protection hai but specific implementation ke limits samjho.",
  },
  {
    q: "Application-consistent aur crash-consistent mein kya fark hai?",
    a: "Crash-consistent: Application quiesce nahi hua backup ke waqt — like pulling power cord. May require crash recovery on restore. Application-consistent: Application properly quiesced — write buffers flushed, in-flight transactions completed. Databases aur transactional applications ke liye mandatory. Windows mein VSS (coordination framework), VMware mein VMware Tools quiesce, databases mein vendor-specific mechanisms. Note: Application-consistent backup application state at backup time preserve karta hai — pre-existing corruption ya media issues se protect nahi karta. Restore testing still essential.",
  },
  {
    q: "Ransomware attack ke baad backup se recover kaise karein?",
    a: "(1) Infected systems isolate karo. Shutdown vs keep-running: organizational IR plan aur security team se consult karo — ye decision IR capabilities, forensic requirements aur ransomware behavior pe depend karta hai, universally 'shut down' ya 'do not shut down' nahi keh sakte. (2) Last known clean restore point identify karo — infection se pehle ka. (3) Immutable/offline copy use karo — verify it predates infection. (4) Isolated environment mein restore karo first. (5) Cleanliness verify karo before connecting to production. (6) Incident response team engage karo.",
  },
  {
    q: "Backup retention kitne time tak rakhni chahiye?",
    a: "Retention business requirements, compliance/regulatory requirements, aur storage budget pe depend karta hai. Koi universal answer nahi hai. Different workloads ke liye different retention: critical databases longer, dev environments shorter. Regulatory environments (financial, healthcare, etc.) specific minimum retention mandate kar sakte hain — in ke interaction with backup data complex ho sakta hai (e.g., GDPR right to erasure). Legal/compliance team se input mandatory hai regulated environments mein. IT akela ye decision nahi karta.",
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
