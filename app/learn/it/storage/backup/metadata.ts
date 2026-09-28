import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Backup — Data Protection Engineering Handbook | Behind The Tech",
  description:
    "What backup is, snapshot vs replication vs DR, RPO/RTO, full/incremental/differential, 3-2-1 strategy, immutable backup, ransomware recovery, VSS, VMware/Hyper-V, database backup, tape, cloud, restore testing and O&M — a complete English Data Center engineer handbook.",
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
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Backup — Data Protection | Behind The Tech",
    description: "Complete backup engineer guide in English — from strategy to production O&M.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/it/storage/backup",
    languages: {
      en: "https://behindthetech.in/learn/it/storage/backup",
      hi: "https://behindthetech.in/hi/learn/it/storage/backup",
      "x-default": "https://behindthetech.in/learn/it/storage/backup",
    },
  },
};

export const faqs = [
  {
    q: "What is the difference between backup and snapshot?",
    a: "A snapshot lives on the same source storage system — if the source storage fails, the snapshot is gone too. A backup is an independent copy on separate storage/location — accessible even after the source storage fails. A snapshot is excellent for fast operational recovery (recent accidental deletion, fast rollback). Independent backup is mandatory for longer-term protection and site-failure recovery. A snapshot does not replace a backup.",
  },
  {
    q: "What are RPO and RTO?",
    a: "RPO (Recovery Point Objective): How much data loss is acceptable? The gap from the last backup to the failure time = potential data loss. This is a business decision — based on application criticality. RTO (Recovery Time Objective): How much downtime is acceptable? It is not just restore time — detection time, decision time, restore time, application startup time and validation time are all included. Define both with the business team, not IT alone.",
  },
  {
    q: "The backup job shows 'Success' — is the backup recoverable?",
    a: "No — not automatically. A backup job 'Success' means the data was written to the repository. It does not prove that the data is consistent, complete, application-recoverable, or that the encryption key is accessible. Periodic restore tests are mandatory — in an isolated environment, verify application startup. 'A backup is only truly tested when a restore is needed' — test before you are in that situation.",
  },
  {
    q: "What is the 3-2-1 backup strategy?",
    a: "3 copies of data, 2 different media/storage types, 1 offsite copy. The modern extension 3-2-1-1-0 adds: 1 offline/air-gapped/immutable copy (for ransomware protection), and 0 errors after verification/testing. These are strategies/guidelines — not formal published standards. Core principle: multiple independent copies, media diversity, offsite/isolated copy.",
  },
  {
    q: "What is an immutable backup?",
    a: "An immutable backup cannot be deleted or modified during the retention period. Implementation types: S3 Object Lock (compliance mode — strongest, even root cannot delete; governance mode — privileged users can override), Linux hardened repository, WORM tape. Immutability strength depends on the platform and the configured enforcement mode — verify the vendor documentation. Immutability is strong protection, but understand the limits of the specific implementation.",
  },
  {
    q: "What is the difference between application-consistent and crash-consistent?",
    a: "Crash-consistent: The application was not quiesced at backup time — like pulling the power cord. May require crash recovery on restore. Application-consistent: The application is properly quiesced — write buffers flushed, in-flight transactions completed. Mandatory for databases and transactional applications. VSS (coordination framework) on Windows, VMware Tools quiesce on VMware, vendor-specific mechanisms for databases. Note: An application-consistent backup preserves the application state at backup time — it does not protect against pre-existing corruption or media issues. Restore testing is still essential.",
  },
  {
    q: "How do you recover from backup after a ransomware attack?",
    a: "(1) Isolate infected systems. Shutdown vs keep-running: consult the organizational IR plan and security team — this decision depends on IR capabilities, forensic requirements and ransomware behavior; you cannot universally say 'shut down' or 'do not shut down'. (2) Identify the last known clean restore point — from before the infection. (3) Use the immutable/offline copy — verify it predates infection. (4) Restore in an isolated environment first. (5) Verify cleanliness before connecting to production. (6) Engage the incident response team.",
  },
  {
    q: "How long should backup retention be kept?",
    a: "Retention depends on business requirements, compliance/regulatory requirements, and storage budget. There is no universal answer. Different retention for different workloads: longer for critical databases, shorter for dev environments. Regulatory environments (financial, healthcare, etc.) may mandate specific minimum retention — their interaction with backup data can be complex (e.g., GDPR right to erasure). Input from the legal/compliance team is mandatory in regulated environments. IT does not make this decision alone.",
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
