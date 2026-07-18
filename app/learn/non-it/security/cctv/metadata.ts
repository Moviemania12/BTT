import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CCTV in Data Centers — Complete Engineering Guide | Behind The Tech",
  description:
    "CCTV system Data Center mein kaise kaam karta hai — IP cameras, NVR/VMS, PoE switch, NAS storage, RAID, camera placement, troubleshooting aur cybersecurity. Beginner se O&M engineer level tak.",
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
      "IP cameras se NVR/VMS tak, PoE switch se NAS storage tak — Data Center CCTV ka complete engineering guide.",
    url: "https://behindthetech.in/learn/non-it/security/cctv",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CCTV in Data Centers — Behind The Tech",
    description: "Data Center CCTV system — IP cameras, NVR, NAS, RAID, troubleshooting aur cybersecurity.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/security/cctv" },
};

const faqs = [
  {
    q: "IP CCTV aur analog CCTV mein main difference kya hai?",
    a: "Analog cameras coaxial cable pe analog video signal bhejte hain — DVR decode karta hai. IP cameras network pe compressed digital stream bhejte hain — NVR ya VMS software process karta hai. IP cameras higher resolution, remote access, PoE power aur analytics support karte hain. Data centers mein IP-based systems standard hain.",
  },
  {
    q: "NVR aur VMS mein kya fark hai?",
    a: "NVR (Network Video Recorder) ek dedicated hardware appliance hai jo internally camera streams record karta hai aur local HDDs pe store karta hai. VMS (Video Management Software) ek software platform hai jo kissi bhi server pe run karta hai, multiple NVRs manage kar sakta hai, advanced analytics, access control integration aur enterprise-grade management provide karta hai. Data centers mein VMS typically preferred hai flexibility ke liye.",
  },
  {
    q: "RAID backup hai kya?",
    a: "Nahi. RAID (Redundant Array of Independent Disks) disk failure se protection deta hai — ek ya do disks fail ho jaayein to data available rehta hai. Lekin RAID accidental deletion, ransomware, file corruption, ya site disaster se protect nahi karta. Actual backup ka matlab hai separate location pe independent copy. CCTV ke liye important hai ki RAID health regularly monitor ho aur failed disks time pe replace hon.",
  },
  {
    q: "Data Center mein CCTV footage kitne time tak store karni chahiye?",
    a: "Retention period project requirements, client policy, insurer requirements, local regulations aur data classification pe depend karta hai. 30 se 90 days common range hai lekin koi universal standard nahi hai. High-security areas ke liye longer retention specify kiya ja sakta hai. Actual storage planning camera count, resolution, FPS, bitrate aur recording mode consider karke karna chahiye.",
  },
  {
    q: "PoE switch aur PoE injector mein kya choose karein?",
    a: "Data center CCTV ke liye managed PoE switch preferred hai — centralized power management, port-level monitoring, VLAN support aur remote restart capability milti hai. PoE injectors sirf kuch cameras ke liye, ya existing non-PoE switches ke saath temporary solution ke liye use karo. Managed switch se port power budget, aur actual power draw bhi monitor hota hai.",
  },
  {
    q: "IP CCTV cameras cybersecurity ke liye kya precautions leni chahiye?",
    a: "Default credentials immediately change karo. Cameras aur NVR ko dedicated VLAN pe isolate karo — production network se separate. Firmware regularly update karo. Unnecessary services/ports disable karo. Physical tampering protection ke liye camera housing lock karo. Remote access ke liye VPN use karo — direct internet exposure avoid karo. Access logs regularly review karo.",
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
