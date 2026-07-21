import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disaster Recovery (DR) — Complete Engineer Guide | Behind The Tech",
  description:
    "Disaster Recovery kya hai, RPO, RTO, MTD, WRT, hot/warm/cold sites, sync/async replication, VMware DR, cloud DR, ransomware recovery, failover, failback, split-brain, DR testing, runbooks, O&M checklist — complete Hinglish Data Center engineer handbook.",
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
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Disaster Recovery (DR) | Behind The Tech",
    description: "DR complete engineer guide — RPO, RTO, replication, VMware SRM, cloud DR, ransomware recovery, failover, testing.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/it/storage/disaster-recovery" },
};

export const faqs = [
  {
    q: "Disaster Recovery aur Backup mein kya fark hai?",
    a: "Backup data protect karta hai — recoverable historical copies. DR poori service restoration capability hai — infrastructure, network, applications, authentication, DNS, validation sab include. Backup DR ka ek component ho sakta hai, lekin backup alone DR nahi hai. Backup deleted file recover karne ke liye; DR primary site fail hone pe poori business service restore karne ke liye.",
  },
  {
    q: "RPO kya hai aur backup frequency se kaise alag hai?",
    a: "RPO (Recovery Point Objective) = acceptable data loss measured in time. Kisi specific backup frequency se automatically defined nahi — replication type, frequency, aur application criticality se determined. Continuous synchronous replication se near-zero RPO possible hai regardless of backup schedule. Asynchronous replication mein replication lag = potential RPO. Backup-based DR mein RPO = time since last verified backup.",
  },
  {
    q: "RTO mein sirf restore time include hota hai?",
    a: "Nahi. RTO = Recovery Time Objective = time from disaster event to business-available service. Includes: detection time, confirmation, formal declaration, infrastructure recovery, data recovery, dependency startup sequence (AD → DNS → DB → app → web), validation, and business-ready state. Sirf 'restore speed' nahi — sab components ka time RTO mein count hota hai.",
  },
  {
    q: "Hot site, warm site, cold site mein kya difference hai?",
    a: "Hot site: fully provisioned always-on infrastructure, continuous replication, near-zero RTO/RPO, highest cost. Warm site: partially provisioned standby, periodic async replication, hours RTO, moderate cost. Cold site: minimal infrastructure, backup-restore based, days RTO, lowest cost. Right-size per application criticality from BIA — not every workload needs hot site.",
  },
  {
    q: "Synchronous replication se zero RPO guarantee hota hai?",
    a: "Near-zero RPO, not guaranteed zero RPO. Synchronous replication ensures application-acknowledged writes are on both sites before acknowledgment to application. However: in-flight transactions, application write buffers, and application state at exact failure moment must be considered. 'Near-zero' is the technically accurate term. Also distance/latency limited — synchronous replication adds write latency equal to round-trip to DR site.",
  },
  {
    q: "Failback kya hai aur failover se kaise alag hai?",
    a: "Failback = primary site restore hone ke baad DR site se production wapas primary site pe transfer karna. Failback is NOT simply the reverse of failover. Requires: primary site restoration validation, data resynchronization (DR → primary for changes during DR period), planned maintenance window, final delta sync, validation at primary, DNS updates back, DR returned to standby, replication restarted in normal direction. Rushed failback without data resync = data loss risk.",
  },
  {
    q: "Ransomware ke baad DR failover karna sahi hai?",
    a: "Traditional DR failover ransomware attack mein fail ho sakta hai — replication ne encrypted data DR site tak bhi pahuncha diya hoga. First: identify infection timeline. Check if DR replication has clean data before infection time. If DR data is also encrypted: do NOT failover. Use isolated immutable backup copies in clean room environment. Cyber recovery is different from traditional infrastructure DR — requires forensic validation before reconnecting to production.",
  },
  {
    q: "DR test kyun karna chahiye aur kitni baar?",
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
