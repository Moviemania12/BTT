import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
export const metadata: Metadata = {
  title: "DCIM — Data Center Infrastructure Management Complete Guide | Behind The Tech",
  description: "What DCIM is, architecture, asset management, power chain, capacity planning, SNMP/Modbus/API integration, Vertiv Trellis, Athenta, Sunbird, Nlyte — a deep engineer-level English guide.",
  keywords: ["DCIM data center","data center infrastructure management","Vertiv Trellis","Athenta DCIM","SNMP PDU monitoring","rack capacity planning","DCIM vs BMS"],
  openGraph: { title: "DCIM — Data Center Infrastructure Management", description: "DCIM architecture, asset management, power chain, integration, troubleshooting.", url: "https://behindthetech.in/learn/non-it/bms-dcim/dcim", locale: "en_US", siteName: "Behind The Tech", type: "article", authors: ["Kumar Anil"], images: [SITE_OG_IMAGE], },
  twitter: { card: "summary_large_image", title: "DCIM Complete Guide — Behind The Tech", description: "Data Center Infrastructure Management for engineers.", images: [SITE_OG_IMAGE.url], },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/bms-dcim/dcim",
    languages: {
      en: "https://behindthetech.in/learn/non-it/bms-dcim/dcim",
      hi: "https://behindthetech.in/hi/learn/non-it/bms-dcim/dcim",
      "x-default": "https://behindthetech.in/learn/non-it/bms-dcim/dcim",
    },
  },
};
export const faqs = [
  { q: "What is the fundamental difference between DCIM and BMS?", a: "BMS (Building Management System) monitors and controls building M&E infrastructure — HVAC, cooling systems, electrical panels, environmental sensors. DCIM (Data Center Infrastructure Management) focuses on the IT infrastructure layer — individual racks, servers, network devices, IT power distribution, IT cooling at rack level, cable connectivity, asset lifecycle. BMS gives the floor-level environment; DCIM gives rack-level IT granularity. In enterprise data centers there are typically two separate tools that share data." },
  { q: "A device is not being discovered in DCIM over SNMP — what should be checked?", a: "First: Is SNMP enabled on the device? Correct SNMP version (v1/v2c/v3)? Is the community string (v1/v2c) or credentials (v3) correct? Second: Network connectivity — ping the device IP from the DCIM server? Is UDP port 161 open in the firewall? Third: DCIM driver/module — correct device type selected? MIB loaded? Fourth: Is the SNMP agent configured to allow the DCIM server IP? Fifth: Is the device supported in the DCIM platform — some devices need specific drivers or MIBs." },
  { q: "How is rack capacity calculated in DCIM?", a: "Rack capacity is typically tracked in three dimensions: Space (U slots — total vs used), Power (kW/A — rated vs actual measured), and Weight (kg — floor load). DCIM reads actual power consumption in real time from intelligent PDUs or metered outlets (where available). Power capacity is compared as 'rated' (nameplate) vs 'actual' — it estimates drained capacity, i.e. when the rack will be full at the current growth rate. Actual metering is essential for accurate capacity data — nameplate ratings are conservative and actual use is typically lower." },
  { q: "What is Athenta DCIM?", a: "Athenta is a DCIM and facility monitoring platform that focuses on data center infrastructure monitoring, dashboards, alarms and reporting. Athenta provides facilities management and monitoring capabilities — equipment monitoring, environmental data, power chain visibility, and integration with various protocols. Verify actual features, editions and capabilities from Athenta's current product documentation and version — the platform evolves over time." },
  { q: "How is UPS data integrated into DCIM?", a: "Most common: SNMP (if the UPS has a network management card), Modbus TCP/RTU, or a manufacturer-specific protocol. Steps: identify the UPS communication interface (SNMP card or Modbus port); add the device in DCIM; configure the protocol and credentials; run discovery; map the relevant points (load %, battery, bypass, alarms); configure polling. UPS data is used in DCIM for power chain visualization — which racks are on which UPS, current load vs capacity." },
  { q: "What is the difference between DCIM reporting and a CMMS?", a: "DCIM (Data Center Infrastructure Management) manages real-time and historical IT infrastructure data — assets, power, capacity, environment — and generates reports. A CMMS (Computerized Maintenance Management System) manages maintenance activities — work orders, preventive maintenance schedules, parts inventory, technician assignments. Some enterprise platforms integrate both — an alarm comes from DCIM → a work order is auto-created in the CMMS. Typically these are separate systems connected through an API." },
];
export const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
