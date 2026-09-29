import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Access Control Systems in Data Centers — Complete Engineering Guide | Behind The Tech",
  description:
    "How an access control system works in a Data Center — controller, RFID reader, EM lock, door contact, REX, anti-passback, alarms, troubleshooting. From beginner to O&M engineer.",
  keywords: [
    "access control data center",
    "rfid access control",
    "electromagnetic lock data center",
    "access control troubleshooting",
    "data center physical security",
  ],
  openGraph: {
    title: "Access Control Systems in Data Centers — Complete Engineering Guide",
    description: "From controller to EM lock, from RFID to anti-passback — the complete engineering guide to Data Center access control.",
    url: "https://behindthetech.in/learn/non-it/security/access-control",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"], images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Access Control in Data Centers — Behind The Tech",
    description: "Data Center access control — controller, reader, lock, troubleshooting and integration.", images: [SITE_OG_IMAGE.url],
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/security/access-control",
    languages: {
      en: "https://behindthetech.in/learn/non-it/security/access-control",
      hi: "https://behindthetech.in/hi/learn/non-it/security/access-control",
      "x-default": "https://behindthetech.in/learn/non-it/security/access-control",
    },
  },
};

export const faqs = [
  {
    q: "What is the difference between an RFID card and a smart card?",
    a: "An RFID (Radio Frequency Identification) card transmits only a unique ID number — there is no cryptographic authentication. A smart card (and modern contactless cards like MIFARE DESFire, HID iCLASS SE) carries an onboard microprocessor and cryptographic keys. Authentication is based on challenge-response — cloning is significantly harder. In data centers smart card technology is preferred for higher security.",
  },
  {
    q: "What should you choose between an electromagnetic lock and an electric strike?",
    a: "An EM lock is mounted on the door frame and holds the door magnetically — fail-safe (opens on power cut). An electric strike replaces the latch mechanism in the door frame — fail-secure versions are available (stays locked on power cut). In data center server rooms typically an EM lock or a fail-secure electric strike is used, and release from the fire alarm is configured. Selection depends on the fire code, occupancy requirements and security policy.",
  },
  {
    q: "What is anti-passback and why is it important?",
    a: "Anti-passback is an access control feature that prevents a credential, after being used in one direction, from being used again in the same direction — another entry cannot happen without recording an exit after the entry. It discourages tailgating and credential sharing. Soft anti-passback generates an alarm on violation but allows access; with hard anti-passback access is denied. In data centers it is important for the server hall and high-security zones.",
  },
  {
    q: "What happens if the controller goes offline?",
    a: "Modern access controllers store the credential database and access rules in onboard memory — they can take local decisions even without server connectivity. This mode is called 'degraded mode' or 'standalone mode'. When the network comes back, the controller syncs with the server. Some older or basic controllers are fully server-dependent — with them, door behavior on server failure depends on the default policy (fail-open or fail-secure).",
  },
  {
    q: "What action should be taken on a door forced open alarm?",
    a: "Immediately check the CCTV footage of the affected door — has an unauthorized entry happened or is it a door malfunction? Alert the NOC/security operator. Do a physical inspection — is the door properly closed and latched? Is the door contact sensor loose or misaligned? Check the access log — was there a valid access event at that time? If unauthorized entry is confirmed, follow the security response protocol. If it is a mechanical issue, inspect the door/lock/sensor.",
  },
  {
    q: "For how many days should the access control system audit trail be stored?",
    a: "The retention period depends on project requirements, client policy, the applicable compliance framework (ISO 27001, SOC 2, PCI-DSS) and local regulations. There is no universal mandatory period — typically a range of 90 days to one year is common. Check client contractual requirements and applicable audit standards. Storage must be sufficient so that the audit log does not degrade at the required retention.",
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
