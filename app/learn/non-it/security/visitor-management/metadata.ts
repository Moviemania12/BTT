import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visitor Management in Data Centers — Complete Engineering Guide | Behind The Tech",
  description:
    "How a visitor management system works in a Data Center — pre-registration, identity verification, temporary badge, access provisioning, audit trail, integration and troubleshooting.",
  keywords: [
    "visitor management data center",
    "visitor management system",
    "temporary access data center",
    "visitor badge data center",
    "data center physical security",
  ],
  openGraph: {
    title: "Visitor Management in Data Centers — Complete Engineering Guide",
    description: "From pre-registration to checkout — the complete engineering guide to Data Center visitor management.",
    url: "https://behindthetech.in/learn/non-it/security/visitor-management",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visitor Management in Data Centers — Behind The Tech",
    description: "Data Center visitor management — registration, access, badge, audit trail and troubleshooting.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/security/visitor-management",
    languages: {
      en: "https://behindthetech.in/learn/non-it/security/visitor-management",
      hi: "https://behindthetech.in/hi/learn/non-it/security/visitor-management",
      "x-default": "https://behindthetech.in/learn/non-it/security/visitor-management",
    },
  },
};

export const faqs = [
  {
    q: "What is the difference between a visitor management system and a sign-in register?",
    a: "A paper sign-in register only records name and time — no identity verification, no access control integration, no real-time visibility. A visitor management system scans/verifies government ID, sends host notification automatically, provisions a temporary access credential, enforces escort rules, and stores the audit trail in a searchable format. Digital visitor management systems provide measurably better accountability, auditability and integration capability than manual/paper-based processes.",
  },
  {
    q: "What should be the difference between a visitor badge and a permanent employee badge?",
    a: "A visitor badge must be visually distinct — different color, 'VISITOR' text clearly visible, escort required indication. A temporary badge must be valid on limited access zones — only approved areas, approved time window. It must be immediately identifiable from physical appearance that this is a visitor and not an employee. In data centers the visitor badge typically also differs in hardware from the permanent employee badge — limited cloning risk.",
  },
  {
    q: "When should a visitor credential expire?",
    a: "The credential must be provisioned for the visit duration — if the visit is 2 hours, the credential should automatically expire after 2 hours. End-of-day expiry at the latest (same day midnight) is safe practice. For longer visits re-approve each day. Revoke immediately on visitor check-out — manual check-out must be possible if the visitor did not leave properly. Automatic expiry is the fail-safe if check-out is missed.",
  },
  {
    q: "For how many days should visitor data be stored?",
    a: "The retention period depends on compliance requirements, client policy and applicable regulations. There is no universal mandatory period. Common practice is 90 days to one year — check client contractual requirements and applicable audit frameworks. GDPR and similar privacy regulations mandate data minimization and defined retention limits — verify jurisdiction-specific requirements with legal counsel.",
  },
  {
    q: "Why is pre-registration important and what should it include?",
    a: "Pre-registration gives advance notice — the security team is expecting the visitor, the host is ready, and access is provisioned before arrival. Walk-in visitors require a slower process and the surprise element can be a security risk. Include in pre-registration: visitor full name, government ID type, purpose of visit, host name, expected arrival/departure time, areas to be visited. The approval workflow ensures an unauthorized visit cannot be booked.",
  },
  {
    q: "What are the cybersecurity concerns in a visitor management system?",
    a: "Visitor data — names, ID numbers, photos — is sensitive personal data. A breach of the system compromises visitor privacy and has regulatory implications. Key controls: encrypted database, access control on the VMS server, visitor data retention limits, audit logs. Visitor-facing kiosks must be secure — no data leakage between visitors. Network segmentation — keep the VMS separate from production IT. Regular software updates.",
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
