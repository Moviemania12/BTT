import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Server Basics — What Is a Server, Rack Deployment & Data Center Use | Behind The Tech",
  description:
    "What a server is, why it is different from a PC, form factors (1U/2U/4U/Blade), rack deployment (U/42U/PDU/airflow), components (CPU/ECC RAM/BMC/PSU), boot flow, UEFI, out-of-band management and data center troubleshooting — a Zero-to-Hero English guide.",
  keywords: ["server basics","what is a server","rack server","1U 2U 4U server","server vs PC","ECC RAM","BMC iDRAC","rack PDU","data center server","server deployment"],
  openGraph: {
    title: "Server Basics — What Is a Server & How Is It Deployed in a Data Center",
    description: "Server architecture, form factors, rack deployment, components and troubleshooting — complete guide.",
    url: "https://behindthetech.in/learn/it/servers/server-basics",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: { card: "summary_large_image", title: "Server Basics — Behind The Tech", description: "What a server is and how it is deployed in a rack — complete engineer guide." },
  alternates: {
    canonical: "https://behindthetech.in/learn/it/servers/server-basics",
    languages: {
      en: "https://behindthetech.in/learn/it/servers/server-basics",
      hi: "https://behindthetech.in/hi/learn/it/servers/server-basics",
      "x-default": "https://behindthetech.in/learn/it/servers/server-basics",
    },
  },
};

export const faqs = [
  { q: "What is the fundamental difference between a server and a PC?", a: "A server is designed for continuous operation — ECC RAM (memory error correction), redundant PSUs (the server keeps running if one fails), hot-swap storage (replacing drives without shutdown), BMC/iDRAC (remote management without the OS), and a rack-mount form factor. A consumer PC typically lacks these features because occasional downtime is acceptable. Specific capabilities depend on the server model and configuration." },
  { q: "What are 1U, 2U and 4U?", a: "This is the server's rack height. 1 Rack Unit (U) = 1.75 inches (44.45 mm). A 1U server occupies one U of space — thin, limited drive bays. 2U occupies two U — more drives, better cooling headroom, more PCIe slots. 4U is four U — typically large storage servers or GPU servers. This is only physical height; it has no direct relation to server performance." },
  { q: "What is a BMC and why is it needed?", a: "A Baseboard Management Controller is a separate microcontroller that operates independently of the server's main system. The BMC receives standby power — meaning that even after the server's main power is off (as long as the PSU has AC supply), the BMC remains accessible through its dedicated network port. You can remotely power on/off, access UEFI, monitor hardware health and update firmware without physical access." },
  { q: "How many servers fit in a 42U rack?", a: "A 42U rack does not mean 42 × 1U servers. The actual deployable server count depends on these factors: rack PDU power capacity, cooling (CRAC/CRAH capacity), rack weight limit, network switch ports, cable management space, blanking panels, and redundancy requirements. Network switches and patch panels also take up U space. In practical planning, consider all constraints simultaneously." },
  { q: "What is hot-swap?", a: "Hot-swap means replacing a component on a running server — no shutdown needed. Typically drives, PSUs, and in some servers fans, are hot-swappable. Hot-swap requires appropriate hardware support and OS/RAID configuration. Verify specific hot-swap capabilities from OEM documentation." },
  { q: "What is the difference between UEFI and BIOS?", a: "BIOS (Basic Input/Output System) is the older firmware standard — 16-bit, 1MB firmware address limit, MBR-based boot. UEFI (Unified Extensible Firmware Interface) is the modern replacement — 64-bit, large storage support (GPT), faster boot, Secure Boot capability, graphical interface. Modern servers typically use UEFI. The term 'BIOS' is also used colloquially for the server's pre-OS configuration interface even when it's technically UEFI." },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
