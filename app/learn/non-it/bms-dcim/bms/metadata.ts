// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/bms-dcim/bms/metadata.ts
// ═══════════════════════════════════════════════════════════════════════════

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building Management System (BMS) — Complete Guide for Data Center Engineers | Behind The Tech",
  description:
    "BMS kya hai, kaise kaam karta hai, Data Center mein kyun zaroori hai — architecture, protocols (Modbus, BACnet, SNMP), UPS integration, data flow, alarm management, troubleshooting. Engineer-level Hinglish guide.",
  keywords: [
    "building management system",
    "BMS data center",
    "BMS vs DCIM",
    "Modbus BACnet SNMP integration",
    "UPS BMS integration",
    "BMS troubleshooting",
    "DDC controller",
    "BMS protocols",
    "data center monitoring",
    "EcoStruxure Desigo Metasys",
  ],
  openGraph: {
    title: "Building Management System (BMS) — Complete Guide for Data Center Engineers",
    description: "BMS architecture, protocols, UPS integration, alarm management aur troubleshooting — engineer-level guide.",
    url: "https://behindthetech.in/learn/non-it/bms-dcim/bms",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "BMS Complete Guide — Behind The Tech",
    description: "Building Management System — Data Center engineers ke liye complete engineering guide.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/bms-dcim/bms" },
};

export const faqs = [
  {
    q: "BMS aur DCIM mein kya fundamental difference hai?",
    a: "BMS building infrastructure monitor karta hai — HVAC, electrical, environment, fire — typically using building-automation protocols like BACnet aur Modbus. DCIM IT infrastructure pe focus karta hai — rack-level power, cooling, IT asset management, PUE, capacity planning. Dono overlap karte hain data center environment mein, aur kuch platforms dono combine karte hain. Actual boundary project design aur platform selection pe depend karta hai.",
  },
  {
    q: "Modbus mein 0-based aur 1-based addressing ka kya issue hai?",
    a: "Modbus specification (Modbus.org) register addresses 0-based define karta hai internally. Lekin bahut OEM documentation 1-based addresses publish karte hain — Holding Register 1 actually address 0 hota hai internally. BMS driver mein configure karte time ye offset bahut common source of error hai. Hamesha OEM documentation carefully read karo — 'Holding Register 40001' typically address 0 (or 0x0000) map hota hai in Modbus frame. Test karo aur OEM software se compare karo.",
  },
  {
    q: "BMS mein fire alarm aur security system ko integrate karein ya nahi?",
    a: "BMS typically fire alarm aur security systems se selected status/alarm points receive karta hai — monitoring ke liye. Lekin BMS in dedicated life-safety systems ko replace nahi karta aur primary life-safety control path nahi hona chahiye. Fire alarm panel, VESDA system aur access control apne dedicated controllers aur logic pe operate karte hain. BMS sirf visibility deta hai — actual suppression, evacuation sequence ya door control dedicated system handle karta hai.",
  },
  {
    q: "BACnet COV (Change of Value) aur polling mein kya fark hai?",
    a: "Polling mein BMS har specified interval pe controller se value read karta hai — bandwidth predictable, lekin slow changes miss ho sakte hain between polls. COV (Change of Value) subscription mein controller BMS ko automatically notify karta hai jab value specified deadband se change ho — efficient aur faster response. BACnet COV support karta hai natively. Modbus mein COV nahi hota — sirf polling. COV network bandwidth reduce karta hai lekin subscription management required hai.",
  },
  {
    q: "RS-485 bus pe multiple Modbus slaves kab communicate fail karte hain?",
    a: "Common causes: termination resistor missing ya galat jagah (sirf bus ke dono ends pe chahiye — 120 ohm each); polarity reversal (A/B wires swapped); address conflict (do devices same slave ID pe); baud rate/parity mismatch; cable too long without proper specifications; ground loop (shield kuch equipment pe grounded hai aur dono ends connect ho rahe hain). Systematic troubleshooting: ek slave disconnect karo aur test karo, phir ek ek add karo.",
  },
  {
    q: "BMS mein critical equipment remotely control karna safe hai kya?",
    a: "Remote control through BMS carefully designed, authorized, risk-assessed aur protected hona chahiye. Monitoring points typically read-only hote hain. Commandable points (jaise setpoint change, start/stop) ke liye proper access permission, interlocks aur protection zaroori hai. Critical equipment pe — UPS, DG, fire suppression — kisi bhi remote command se pehle OEM guidance, safety interlocks aur operational procedures verify karo. Monitoring aur control ke boundary project design aur client policy pe define hote hain.",
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
