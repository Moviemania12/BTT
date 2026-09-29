import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
export const metadata: Metadata = {
  title: "Energy Management System (EMS) — Complete Guide for Data Center Engineers | Behind The Tech",
  description: "What EMS is, energy meters integration, kW/kWh/PUE tracking, Modbus/BACnet data acquisition, dashboards, troubleshooting — complete English guide for data center engineers.",
  keywords: ["energy management system","EMS data center","energy meter Modbus","PUE calculation","power factor","kWh monitoring","data center energy"],
  openGraph: { title: "Energy Management System (EMS) — Complete Data Center Guide", description: "EMS architecture, meter integration, PUE analysis, troubleshooting.", url: "https://behindthetech.in/learn/non-it/bms-dcim/ems", locale: "en_US", siteName: "Behind The Tech", type: "article", authors: ["Kumar Anil"], images: [SITE_OG_IMAGE], },
  twitter: { card: "summary_large_image", title: "EMS Complete Guide — Behind The Tech", description: "Energy Management System for data centers.", images: [SITE_OG_IMAGE.url], },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/bms-dcim/ems",
    languages: {
      en: "https://behindthetech.in/learn/non-it/bms-dcim/ems",
      hi: "https://behindthetech.in/hi/learn/non-it/bms-dcim/ems",
      "x-default": "https://behindthetech.in/learn/non-it/bms-dcim/ems",
    },
  },
};
export const faqs = [
  { q: "What is the fundamental difference between EMS and BMS?", a: "BMS monitors building M&E systems — HVAC, electrical, environment, and also controls them where designed. EMS focuses specifically on energy consumption — utility meter readings, sub-metering, energy KPIs (kW, kWh, demand, power factor), reporting and optimization. Some platforms combine both, but EMS is typically deeper on energy accounting and cost analysis while BMS is on operational monitoring and alarm management." },
  { q: "Is PUE calculated only from EMS?", a: "PUE (Power Usage Effectiveness) = Total Facility Power / IT Equipment Power. The data comes from total facility input and IT load measurement — this can come from BMS, EMS, DCIM or standalone metering systems. To calculate PUE accurately, metering points must be carefully defined — which load will count as IT, which as facility. The PUE value depends on measurement methodology and metering accuracy — refer to the Uptime Institute and Green Grid PUE guidelines." },
  { q: "A Modbus energy meter is giving a zero or wrong value — what should be checked?", a: "First: is the meter powered ON and are the local readings on the display correct? Second: Modbus wiring — do RS-485 A/B polarity, baud rate, parity, slave ID match? Third: is the register address correct — verify from the OEM manual, check 0-based vs 1-based offset. Fourth: are data type and scaling correct — energy meters often use 32-bit registers (2 consecutive Holding Registers), verify byte/word order. Fifth: is the BMS driver device status online?" },
  { q: "What is peak demand and why is it important in EMS?", a: "Peak demand is the highest power draw in a specified interval — typically a 15 or 30 minute average, according to the utility billing period. Utility companies often apply peak demand charges, which can be a significant part of the total bill. EMS tracks peak demand, generates alerts when demand approaches the threshold, and supports demand response strategies. Verify the actual billing structure and demand charge calculation from your utility tariff." },
  { q: "How long should energy data be retained?", a: "The retention period depends on regulatory requirements, utility billing dispute resolution, sustainability reporting, ISO 50001 compliance and operational analysis needs. There is no universal mandatory period. Common practice is granular (15-min/hourly) data for 1-2 years, daily summaries for a longer period. Check the client contract, applicable standards and local regulations." },
  { q: "What is sub-metering and why is it useful in a data center?", a: "Sub-metering means metering individual loads separately — UPS output, CRAC units, lighting, specific server hall circuits. The main utility meter tells total consumption, but which load consumes how much is not visible. Sub-metering gives granular visibility — IT load vs cooling load vs lighting — which is essential for PUE calculation, cost allocation, efficiency analysis and capacity planning. The instrumentation level depends on the project design." },
];
export const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
