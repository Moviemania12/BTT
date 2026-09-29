// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/bms-dcim/bms/metadata.ts
// ═══════════════════════════════════════════════════════════════════════════

import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Building Management System (BMS) — Complete Guide for Data Center Engineers | Behind The Tech",
  description:
    "What BMS is, how it works, why it is essential in a Data Center — architecture, protocols (Modbus, BACnet, SNMP), UPS integration, data flow, alarm management, troubleshooting. Engineer-level English guide.",
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
    description: "BMS architecture, protocols, UPS integration, alarm management and troubleshooting — engineer-level guide.",
    url: "https://behindthetech.in/learn/non-it/bms-dcim/bms",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"], images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "BMS Complete Guide — Behind The Tech",
    description: "Building Management System — a complete engineering guide for Data Center engineers.", images: [SITE_OG_IMAGE.url],
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/bms-dcim/bms",
    languages: {
      en: "https://behindthetech.in/learn/non-it/bms-dcim/bms",
      hi: "https://behindthetech.in/hi/learn/non-it/bms-dcim/bms",
      "x-default": "https://behindthetech.in/learn/non-it/bms-dcim/bms",
    },
  },
};

export const faqs = [
  {
    q: "What is the fundamental difference between BMS and DCIM?",
    a: "BMS monitors building infrastructure — HVAC, electrical, environment, fire — typically using building-automation protocols like BACnet and Modbus. DCIM focuses on IT infrastructure — rack-level power, cooling, IT asset management, PUE, capacity planning. The two overlap in the data center environment, and some platforms combine both. The actual boundary depends on project design and platform selection.",
  },
  {
    q: "What is the issue with 0-based and 1-based addressing in Modbus?",
    a: "The Modbus specification (Modbus.org) defines register addresses as 0-based internally. But a lot of OEM documentation publishes 1-based addresses — Holding Register 1 is actually address 0 internally. This offset is a very common source of error when configuring the BMS driver. Always read the OEM documentation carefully — 'Holding Register 40001' typically maps to address 0 (or 0x0000) in the Modbus frame. Test it and compare with the OEM software.",
  },
  {
    q: "Should fire alarm and security systems be integrated into the BMS or not?",
    a: "The BMS typically receives selected status/alarm points from fire alarm and security systems — for monitoring. But the BMS does not replace these dedicated life-safety systems and must not be the primary life-safety control path. The fire alarm panel, VESDA system and access control operate on their own dedicated controllers and logic. The BMS only gives visibility — the actual suppression, evacuation sequence or door control is handled by the dedicated system.",
  },
  {
    q: "What is the difference between BACnet COV (Change of Value) and polling?",
    a: "In polling, the BMS reads the value from the controller at every specified interval — bandwidth is predictable, but slow changes can be missed between polls. In a COV (Change of Value) subscription, the controller automatically notifies the BMS when the value changes by a specified deadband — efficient and a faster response. BACnet supports COV natively. Modbus has no COV — only polling. COV reduces network bandwidth but subscription management is required.",
  },
  {
    q: "When do multiple Modbus slaves on an RS-485 bus fail to communicate?",
    a: "Common causes: termination resistor missing or in the wrong place (needed only at both ends of the bus — 120 ohm each); polarity reversal (A/B wires swapped); address conflict (two devices on the same slave ID); baud rate/parity mismatch; cable too long without proper specifications; ground loop (the shield is grounded on some equipment and both ends are being connected). Systematic troubleshooting: disconnect one slave and test, then add them back one by one.",
  },
  {
    q: "Is it safe to remotely control critical equipment through the BMS?",
    a: "Remote control through the BMS must be carefully designed, authorized, risk-assessed and protected. Monitoring points are typically read-only. For commandable points (such as setpoint change, start/stop) proper access permission, interlocks and protection are essential. On critical equipment — UPS, DG, fire suppression — verify OEM guidance, safety interlocks and operational procedures before any remote command. The boundary between monitoring and control is defined by the project design and client policy.",
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
