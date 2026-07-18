import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Control Systems in Data Centers — Complete Engineering Guide | Behind The Tech",
  description:
    "Data Center mein access control system kaise kaam karta hai — controller, RFID reader, EM lock, door contact, REX, anti-passback, alarms, troubleshooting. Beginner se O&M engineer tak.",
  keywords: [
    "access control data center",
    "rfid access control",
    "electromagnetic lock data center",
    "access control troubleshooting",
    "data center physical security",
  ],
  openGraph: {
    title: "Access Control Systems in Data Centers — Complete Engineering Guide",
    description: "Controller se EM lock tak, RFID se anti-passback tak — Data Center access control ka complete engineering guide.",
    url: "https://behindthetech.in/learn/non-it/security/access-control",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Access Control in Data Centers — Behind The Tech",
    description: "Data Center access control — controller, reader, lock, troubleshooting aur integration.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/security/access-control" },
};

export const faqs = [
  {
    q: "RFID card aur smart card mein kya fark hai?",
    a: "RFID (Radio Frequency Identification) card sirf ek unique ID number transmit karta hai — koi cryptographic authentication nahi hoti. Smart card (aur modern contactless cards jaise MIFARE DESFire, HID iCLASS SE) onboard microprocessor aur cryptographic keys carry karte hain. Authentication challenge-response pe based hoti hai — cloning significantly harder hoti hai. Data centers mein smart card technology preferred hai higher security ke liye.",
  },
  {
    q: "Electromagnetic lock aur electric strike mein kya choose karein?",
    a: "EM lock door frame pe mount hota hai aur door ko magnetically hold karta hai — fail-safe (power cut pe open). Electric strike door frame mein latch mechanism replace karta hai — fail-secure versions available hain (power cut pe locked rehta hai). Data center server rooms mein typically EM lock ya fail-secure electric strike use hota hai aur fire alarm se release configure hoti hai. Selection fire code, occupancy requirements aur security policy pe depend karta hai.",
  },
  {
    q: "Anti-passback kya hai aur ye kyun important hai?",
    a: "Anti-passback ek access control feature hai jo prevent karta hai ki ek credential ek direction mein use hone ke baad same direction mein dobara use ho — entry ke baad exit record kiye bina doosra entry nahi ho sakti. Ye tailgating aur credential sharing discourage karta hai. Soft anti-passback violation pe alarm generate karta hai lekin access allow karta hai; hard anti-passback pe access deny hoti hai. Data centers mein server hall aur high-security zones ke liye important hai.",
  },
  {
    q: "Controller offline ho jaaye to kya hota hai?",
    a: "Modern access controllers onboard memory mein credential database aur access rules store karte hain — server connectivity ke bina bhi local decisions le sakte hain. Is mode ko 'degraded mode' ya 'standalone mode' kehte hain. Network wapas aane pe controller server se sync karta hai. Kuch older ya basic controllers fully server-dependent hote hain — unke saath server failure pe door behavior default policy pe depend karta hai (fail-open ya fail-secure).",
  },
  {
    q: "Door forced open alarm pe kya action lena chahiye?",
    a: "Immediately CCTV footage check karo affected door ka — unauthorized entry hua hai ya door malfunction hai? NOC/security operator ko alert karo. Physical inspection karo — door properly closed aur latched hai? Door contact sensor loose hai ya misaligned? Access log check karo — koi valid access event tha us time? Agar unauthorized entry confirmed ho to security response protocol follow karo. Agar mechanical issue hai to door/lock/sensor inspect karo.",
  },
  {
    q: "Access control system ka audit trail kitne din store karna chahiye?",
    a: "Retention period project requirements, client policy, applicable compliance framework (ISO 27001, SOC 2, PCI-DSS) aur local regulations pe depend karta hai. Koi universal mandatory period nahi hai — typically 90 days se ek saal tak range common hai. Client contractual requirements aur applicable audit standards check karo. Storage sufficient hona chahiye required retention pe audit log degrade na ho.",
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
