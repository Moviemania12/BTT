import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mantrap (Airlock) in Data Centers — Complete Engineering Guide | Behind The Tech",
  description:
    "How a Data Center mantrap works — door interlock, occupancy detection, anti-tailgating, emergency release, fire integration, troubleshooting. From beginner to O&M engineer.",
  keywords: [
    "mantrap data center",
    "airlock data center",
    "anti-tailgating",
    "mantrap interlock",
    "data center physical security",
  ],
  openGraph: {
    title: "Mantrap (Airlock) in Data Centers — Complete Engineering Guide",
    description: "From door interlock to occupancy detection — the complete engineering guide to the Data Center mantrap.",
    url: "https://behindthetech.in/learn/non-it/security/mantrap",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mantrap in Data Centers — Behind The Tech",
    description: "Data Center mantrap — interlock logic, anti-tailgating, emergency release and troubleshooting.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/security/mantrap",
    languages: {
      en: "https://behindthetech.in/learn/non-it/security/mantrap",
      hi: "https://behindthetech.in/hi/learn/non-it/security/mantrap",
      "x-default": "https://behindthetech.in/learn/non-it/security/mantrap",
    },
  },
};

export const faqs = [
  {
    q: "What is the fundamental difference between a mantrap and a normal access control door?",
    a: "A normal access control door has only one door — present a credential and go in. There is no mechanical mechanism to prevent tailgating. A mantrap has two interlocked doors — only one door can be open at a time. If Door 1 is open, Door 2 stays mechanically locked — and vice versa. This arrangement ensures that every person is individually authenticated in a controlled space.",
  },
  {
    q: "Why is an occupancy sensor installed in a mantrap?",
    a: "The occupancy sensor (PIR or weight sensor) detects how many people are present inside the mantrap. When more than one person comes in (tailgating attempt), the system does not open the second door — it generates an alarm. Without occupancy detection, an authorized person opens the door and a second unauthorized person slips in with them — the security purpose of the mantrap is defeated.",
  },
  {
    q: "How does a mantrap behave on a fire alarm?",
    a: "On a fire alarm all doors must open immediately — the evacuation path must not be blocked. Fail-safe configuration: on a power cut or fire alarm signal both doors open. This is a life safety requirement and mandatory for fire code compliance. The controller or PLC logic overrides the interlock on the fire alarm input. Verify this integration at the time of commissioning and test it regularly.",
  },
  {
    q: "What should be done if someone gets stuck inside the mantrap and cannot come out?",
    a: "A mantrap must have a manual emergency release — typically a red break-glass switch or manual override. The security operator can also do a remote release from the VMS/access control interface. If someone is stuck inside: release the door remotely, or security staff should go and override manually. An intercom must also be installed — so communication is possible when someone is stuck inside. Include the emergency release procedure in staff training.",
  },
  {
    q: "Why is it essential to integrate the mantrap with CCTV?",
    a: "A mantrap is a controlled entry point — its footage is critical for forensic evidence. CCTV WDR cameras capture faces clearly in the mantrap. Automatic camera recording and a snapshot on every access event are essential. Instant footage review is important on a tailgating attempt or security alert. Without CCTV, the mantrap entry log audit trail is incomplete.",
  },
  {
    q: "What should you choose between a single-door and a double-door mantrap?",
    a: "Some vendors offer a single-door mantrap where there is a door + inner cage/turnstile combination — smaller footprint. The traditional double-door mantrap gives two full separate doors and an enclosed vestibule space — more space but stronger anti-tailgating. For data center high-security entry the traditional double-door mantrap is preferred. Under space constraints evaluate single-door alternatives — but maintain occupancy detection.",
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
