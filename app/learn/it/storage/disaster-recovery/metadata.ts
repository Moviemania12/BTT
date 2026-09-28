import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disaster Recovery (DR) — Complete Engineer Guide | Behind The Tech",
  description:
    "What Disaster Recovery is, RPO, RTO, MTD, WRT, hot/warm/cold sites, sync/async replication, VMware DR, cloud DR, ransomware recovery, failover, failback, split-brain, DR testing, runbooks, O&M checklist — a complete English Data Center engineer handbook.",
  keywords: [
    "disaster recovery", "DR planning", "RPO RTO", "business continuity",
    "hot site warm site cold site", "DR failover", "replication synchronous asynchronous",
    "VMware SRM", "Azure Site Recovery", "ransomware recovery", "DR testing",
    "failback", "split brain prevention", "DNS TTL failover", "DR runbook",
    "data center DR", "active passive DR", "pilot light", "clean room recovery",
  ],
  openGraph: {
    title: "Disaster Recovery (DR) — Complete Engineer Guide",
    description: "RPO, RTO, site types, replication, VMware, cloud DR, ransomware recovery, failover, failback — complete DR handbook.",
    url: "https://behindthetech.in/learn/it/storage/disaster-recovery",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Disaster Recovery (DR) | Behind The Tech",
    description: "DR complete engineer guide — RPO, RTO, replication, VMware SRM, cloud DR, ransomware recovery, failover, testing.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/it/storage/disaster-recovery",
    languages: {
      en: "https://behindthetech.in/learn/it/storage/disaster-recovery",
      hi: "https://behindthetech.in/hi/learn/it/storage/disaster-recovery",
      "x-default": "https://behindthetech.in/learn/it/storage/disaster-recovery",
    },
  },
};

export const faqs = [
  {
    q: "What is the difference between Disaster Recovery and Backup?",
    a: "Backup protects data — recoverable historical copies. DR is the complete service restoration capability — infrastructure, network, applications, authentication, DNS and validation are all included. Backup can be one component of DR, but backup alone is not DR. Backup is for recovering a deleted file; DR is for restoring the entire business service when the primary site fails.",
  },
  {
    q: "What is RPO and how is it different from backup frequency?",
    a: "RPO (Recovery Point Objective) = acceptable data loss measured in time. It is not automatically defined by any specific backup frequency — it is determined by replication type, frequency, and application criticality. Continuous synchronous replication makes near-zero RPO possible regardless of backup schedule. In asynchronous replication, replication lag = potential RPO. In backup-based DR, RPO = time since last verified backup.",
  },
  {
    q: "Does RTO include only restore time?",
    a: "No. RTO = Recovery Time Objective = time from disaster event to business-available service. Includes: detection time, confirmation, formal declaration, infrastructure recovery, data recovery, dependency startup sequence (AD → DNS → DB → app → web), validation, and business-ready state. Not just 'restore speed' — the time of all components counts toward RTO.",
  },
  {
    q: "What is the difference between a hot site, warm site and cold site?",
    a: "Hot site: fully provisioned always-on infrastructure, continuous replication, near-zero RTO/RPO, highest cost. Warm site: partially provisioned standby, periodic async replication, hours RTO, moderate cost. Cold site: minimal infrastructure, backup-restore based, days RTO, lowest cost. Right-size per application criticality from BIA — not every workload needs hot site.",
  },
  {
    q: "Does synchronous replication guarantee zero RPO?",
    a: "Near-zero RPO, not guaranteed zero RPO. Synchronous replication ensures application-acknowledged writes are on both sites before acknowledgment to application. However: in-flight transactions, application write buffers, and application state at exact failure moment must be considered. 'Near-zero' is the technically accurate term. Also distance/latency limited — synchronous replication adds write latency equal to round-trip to DR site.",
  },
  {
    q: "What is failback and how is it different from failover?",
    a: "Failback = transferring production from the DR site back to the primary site after the primary site is restored. Failback is NOT simply the reverse of failover. Requires: primary site restoration validation, data resynchronization (DR → primary for changes during DR period), planned maintenance window, final delta sync, validation at primary, DNS updates back, DR returned to standby, replication restarted in normal direction. Rushed failback without data resync = data loss risk.",
  },
  {
    q: "Is it right to do a DR failover after ransomware?",
    a: "Traditional DR failover can fail in a ransomware attack — replication may have carried the encrypted data to the DR site as well. First: identify infection timeline. Check if DR replication has clean data before infection time. If DR data is also encrypted: do NOT failover. Use isolated immutable backup copies in clean room environment. Cyber recovery is different from traditional infrastructure DR — requires forensic validation before reconnecting to production.",
  },
  {
    q: "Why should DR tests be done and how often?",
    a: "Untested DR = assumption, not capability. First real test should not be during actual disaster. Testing levels: tabletop (quarterly) → simulation (semi-annual) → partial failover → full failover test (annually for critical apps). Each test measures RTA vs RTO and RPA vs RPO — gap analysis drives improvements. Regulatory requirements may mandate specific frequency. Undocumented test results are insufficient for audit evidence.",
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
