import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Server Basics — What Is a Server, Rack Deployment & Data Center Use | Behind The Tech",
  description:
    "What a server is, how it differs from a PC, form factors, inside-the-server components, rack deployment, A/B power and cooling math, cabling, boot flow, BMC, redundancy, Tier III/IV view, installation, operations, maintenance, troubleshooting, real failure scenarios, safety, OEMs and interview questions — the complete English engineer guide.",
  keywords: ["server basics","what is a server","rack server","1U 2U 4U server","server vs PC","ECC RAM","BMC iDRAC","rack PDU","data center server","server deployment","A/B power","rack planning","server troubleshooting","Tier III server","server commissioning"],
  openGraph: {
    title: "Server Basics — What Is a Server & How Is It Deployed in a Data Center",
    description: "Server architecture, form factors, rack deployment, components and troubleshooting — complete guide.",
    url: "https://behindthetech.in/learn/it/servers/server-basics",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"], images: [SITE_OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title: "Server Basics — Behind The Tech", description: "What a server is and how it is deployed in a rack — complete engineer guide.", images: [SITE_OG_IMAGE.url], },
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
  { q: "Why should the total load of a rack stay within ONE feed's capacity?", a: "In an A/B design every dual-PSU server draws from both feeds. If feed A fails, feed B must carry the whole rack. If the rack load is above what one feed can safely carry (commonly about 80% of the breaker rating for continuous load), the surviving breaker trips and the whole rack loses power. Redundancy exists only if one feed can carry everything. Actual limits depend on site design and local electrical codes." },
  { q: "What is out-of-band management and why does it matter?", a: "Out-of-band means the management path is separate from the production path. The BMC has its own dedicated network port and runs on standby power, so you can power-cycle a server, see its console, read hardware logs and mount an OS image even when the OS has crashed or the production network is down. It saves site visits and cuts recovery time. It must be on an isolated management VLAN and secured." },
  { q: "What should a server engineer check during a daily round?", a: "Look for amber or red LEDs on servers, PSUs, fans and drives. Listen for abnormal fan noise. Review new BMC and monitoring alerts. Check rack inlet temperature. Confirm blanking panels and cabling are intact. Record findings in the shift log and hand over open items. Catching small issues early prevents most major incidents." },
  { q: "Does Tier III or Tier IV make a server more reliable?", a: "The tier rating describes the site infrastructure (power, cooling, distribution), not the server. However, a Tier III or Tier IV site only helps servers that are dual-corded and correctly cabled to independent A/B paths. A single-corded or incorrectly cabled server can still be a single point of failure. Actual implementation depends on project requirements, utility requirements, OEM design and data center architecture." },
  { q: "How should firmware be updated on production servers?", a: "Read the vendor release notes and compatibility matrix, test the firmware bundle on a non-production server, back up the configuration, plan a rollback, update in small batches during an approved window, never interrupt a flash, and verify health after each batch. Use vendor-tested bundles rather than random component versions." },
  { q: "What is the difference between nameplate power and actual server power?", a: "Nameplate power is the maximum rating of the power supply or system. Actual draw depends on the real workload and is usually much lower. For planning, use measured values from the BMC or intelligent PDU with a safety margin, and use the vendor's power calculator for the exact hardware configuration." },
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
