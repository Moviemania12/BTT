import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CCTV in Data Centers — Complete Engineering Guide | Behind The Tech",
  description:
    "How a CCTV system works in a Data Center — IP cameras, NVR/VMS, PoE switch, NAS storage, RAID, camera placement, troubleshooting and cybersecurity. From beginner to O&M engineer level.",
  keywords: [
    "cctv data center",
    "ip camera nvr vms",
    "poe switch cctv",
    "nas storage cctv",
    "cctv troubleshooting data center",
    "data center physical security",
  ],
  openGraph: {
    title: "CCTV in Data Centers — Complete Engineering Guide",
    description:
      "From IP cameras to NVR/VMS, from PoE switch to NAS storage — the complete engineering guide to Data Center CCTV.",
    url: "https://behindthetech.in/learn/non-it/security/cctv",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CCTV in Data Centers — Behind The Tech",
    description: "Data Center CCTV system — IP cameras, NVR, NAS, RAID, troubleshooting and cybersecurity.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/security/cctv",
    languages: {
      en: "https://behindthetech.in/learn/non-it/security/cctv",
      hi: "https://behindthetech.in/hi/learn/non-it/security/cctv",
      "x-default": "https://behindthetech.in/learn/non-it/security/cctv",
    },
  },
};

const faqs = [
  {
    q: "What is the main difference between IP CCTV and analog CCTV?",
    a: "Analog cameras send an analog video signal over coaxial cable — the DVR decodes it. IP cameras send a compressed digital stream over the network — the NVR or VMS software processes it. IP cameras support higher resolution, remote access, PoE power and analytics. IP-based systems are standard in data centers.",
  },
  {
    q: "What is the difference between an NVR and a VMS?",
    a: "An NVR (Network Video Recorder) is a dedicated hardware appliance that records camera streams internally and stores them on local HDDs. A VMS (Video Management Software) is a software platform that runs on any server, can manage multiple NVRs, and provides advanced analytics, access control integration and enterprise-grade management. In data centers a VMS is typically preferred for flexibility.",
  },
  {
    q: "Is RAID a backup?",
    a: "No. RAID (Redundant Array of Independent Disks) gives protection against disk failure — if one or two disks fail, the data stays available. But RAID does not protect against accidental deletion, ransomware, file corruption or a site disaster. An actual backup means an independent copy at a separate location. For CCTV it is important that RAID health is monitored regularly and failed disks are replaced on time.",
  },
  {
    q: "How long should CCTV footage be stored in a Data Center?",
    a: "The retention period depends on project requirements, client policy, insurer requirements, local regulations and data classification. 30 to 90 days is a common range, but there is no universal standard. Longer retention can be specified for high-security areas. Actual storage planning should be done considering camera count, resolution, FPS, bitrate and recording mode.",
  },
  {
    q: "What should you choose between a PoE switch and a PoE injector?",
    a: "For data center CCTV a managed PoE switch is preferred — you get centralized power management, port-level monitoring, VLAN support and remote restart capability. Use PoE injectors only for a few cameras, or as a temporary solution with existing non-PoE switches. A managed switch also lets you monitor the port power budget and the actual power draw.",
  },
  {
    q: "What precautions should be taken for IP CCTV camera cybersecurity?",
    a: "Change default credentials immediately. Isolate cameras and the NVR on a dedicated VLAN — separate from the production network. Update firmware regularly. Disable unnecessary services/ports. Lock the camera housing for physical tampering protection. Use a VPN for remote access — avoid direct internet exposure. Review access logs regularly.",
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

export { faqs };
