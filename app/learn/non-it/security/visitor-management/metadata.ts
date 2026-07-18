import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visitor Management in Data Centers — Complete Engineering Guide | Behind The Tech",
  description:
    "Data Center mein visitor management system kaise kaam karta hai — pre-registration, identity verification, temporary badge, access provisioning, audit trail, integration aur troubleshooting.",
  keywords: [
    "visitor management data center",
    "visitor management system",
    "temporary access data center",
    "visitor badge data center",
    "data center physical security",
  ],
  openGraph: {
    title: "Visitor Management in Data Centers — Complete Engineering Guide",
    description: "Pre-registration se checkout tak — Data Center visitor management ka complete engineering guide.",
    url: "https://behindthetech.in/learn/non-it/security/visitor-management",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visitor Management in Data Centers — Behind The Tech",
    description: "Data Center visitor management — registration, access, badge, audit trail aur troubleshooting.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/security/visitor-management" },
};

export const faqs = [
  {
    q: "Visitor management system aur sign-in register mein kya difference hai?",
    a: "Paper sign-in register sirf name aur time record karta hai — koi identity verification nahi, koi access control integration nahi, koi real-time visibility nahi. Visitor management system government ID scan/verify karta hai, host notification automatic bhejta hai, temporary access credential provision karta hai, escort rules enforce karta hai, aur audit trail searchable format mein store karta hai. Digital visitor management systems manual/paper-based processes se measurably better accountability, auditability aur integration capability provide karte hain.",
  },
  {
    q: "Visitor badge aur permanent employee badge mein kya difference hona chahiye?",
    a: "Visitor badge visually distinct honi chahiye — different color, 'VISITOR' text clearly visible, escort required indication. Temporary badge limited access zones pe valid honi chahiye — sirf approved areas, approved time window. Physical appearance se immediately identifiable hona chahiye ki ye visitor hai employee nahi. Data centers mein typically visitor badge permanent employee badge se hardware bhi different hoti hai — limited cloning risk.",
  },
  {
    q: "Visitor credential kab expire karni chahiye?",
    a: "Credential visit duration ke liye provision honi chahiye — agar visit 2 hour hai to credential 2 hour ke baad automatically expire ho. End-of-day expiry at latest (same day midnight) safe practice hai. Longer visits ke liye each day re-approve karo. Visitor check-out pe immediately revoke karo — manual check-out possible hona chahiye agar visitor bahar nahi gaya properly. Automatic expiry fail-safe hai agar check-out missed ho.",
  },
  {
    q: "Visitor data kitne din store karna chahiye?",
    a: "Retention period compliance requirements, client policy aur applicable regulations pe depend karta hai. Koi universal mandatory period nahi hai. Common practice 90 days se ek saal tak hoti hai — client contractual requirements aur applicable audit frameworks check karo. GDPR aur similar privacy regulations data minimization aur defined retention limits mandate karte hain — legal counsel se verify karo jurisdiction-specific requirements.",
  },
  {
    q: "Pre-registration kyun important hai aur kya include karna chahiye?",
    a: "Pre-registration advance notice deta hai — security team visitor ko expect kar raha hota hai, host ready hota hai, aur access provisioned hota hai before arrival. Walk-in visitors slower process require karte hain aur surprise element security risk ho sakta hai. Pre-registration mein include karo: visitor full name, government ID type, purpose of visit, host name, expected arrival/departure time, areas to be visited. Approval workflow ensure karta hai ki unauthorized visit book na ho sake.",
  },
  {
    q: "Visitor management system mein cybersecurity concerns kya hain?",
    a: "Visitor data — names, ID numbers, photos — sensitive personal data hai. System ka breach visitor privacy compromise karta hai aur regulatory implications hain. Key controls: encrypted database, access control on VMS server, visitor data retention limits, audit logs. Visitor-facing kiosks secure hone chahiye — koi data leakage between visitors. Network segmentation — VMS ko production IT se alag rakho. Regular software updates.",
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
