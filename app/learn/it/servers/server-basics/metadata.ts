import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Server Basics — What Is a Server, Rack Deployment & Data Center Use | Behind The Tech",
  description:
    "Server kya hota hai, PC se kyun alag hai, form factors (1U/2U/4U/Blade), rack deployment (U/42U/PDU/airflow), components (CPU/ECC RAM/BMC/PSU), boot flow, UEFI, out-of-band management aur data center troubleshooting — Zero-to-Hero Hinglish guide.",
  keywords: ["server basics","what is a server","rack server","1U 2U 4U server","server vs PC","ECC RAM","BMC iDRAC","rack PDU","data center server","server deployment"],
  openGraph: {
    title: "Server Basics — What Is a Server & How Is It Deployed in a Data Center",
    description: "Server architecture, form factors, rack deployment, components aur troubleshooting — complete guide.",
    url: "https://behindthetech.in/learn/it/servers/server-basics",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: { card: "summary_large_image", title: "Server Basics — Behind The Tech", description: "Server kya hai, rack mein kaise deploy hota hai — complete engineer guide." },
  alternates: { canonical: "https://behindthetech.in/learn/it/servers/server-basics" },
};

export const faqs = [
  { q: "Server aur PC mein fundamental difference kya hai?", a: "Server continuous operation ke liye design kiya jaata hai — ECC RAM (memory error correction), redundant PSUs (ek fail hone pe server chalta rahe), hot-swap storage (bina shutdown drive replace karna), BMC/iDRAC (OS ke bina remote management), aur rack-mount form factor. Consumer PC mein yeh features typically nahi hoti kyunki occasional downtime acceptable hota hai. Specific capabilities server model aur configuration pe depend karti hain." },
  { q: "1U, 2U, 4U kya hota hai?", a: "Yeh server ki rack height hai. 1 Rack Unit (U) = 1.75 inches (44.45 mm). 1U server ek U space leta hai — thin, limited drive bays. 2U do U leta hai — more drives, better cooling headroom, more PCIe slots. 4U four U — typically large storage servers ya GPU servers. Yeh sirf physical height hai, server performance se koi seedha relation nahi." },
  { q: "BMC kya hai aur kyun zaroori hai?", a: "Baseboard Management Controller ek separate microcontroller hai jo server ke main system se independent operate karta hai. BMC ko standby power milta hai — matlab server main power off hone ke baad bhi (jab tak PSU mein AC supply hai) BMC apne dedicated network port se accessible rehta hai. Aap remotely power on/off, UEFI access, hardware health monitor, aur firmware update kar sakte hain bina physical access ke." },
  { q: "Ek 42U rack mein kitne servers fit hote hain?", a: "42U rack ka matlab 42 × 1U servers nahi hai. Actual deployable server count in factors pe depend karta hai: rack PDU power capacity, cooling (CRAC/CRAH capacity), rack weight limit, network switch ports, cable management space, blanking panels, aur redundancy requirements. Network switches aur patch panels bhi U space lete hain. Practical planning mein sab constraints simultaneously consider karo." },
  { q: "Hot-swap kya hota hai?", a: "Hot-swap ka matlab hai component ko running server pe replace karna — shutdown ki zarurat nahi. Typically drives, PSUs, aur kuch servers mein fans hot-swap hote hain. Hotswap ke liye appropriate hardware support aur OS/RAID configuration required hoti hai. Specific hot-swap capabilities OEM documentation se verify karo." },
  { q: "UEFI aur BIOS mein kya difference hai?", a: "BIOS (Basic Input/Output System) older firmware standard hai — 16-bit, 1MB firmware address limit, MBR-based boot. UEFI (Unified Extensible Firmware Interface) modern replacement hai — 64-bit, large storage support (GPT), faster boot, Secure Boot capability, graphical interface. Modern servers typically UEFI use karte hain. 'BIOS' term colloquially bhi use hoti hai for the server's pre-OS configuration interface even when it's technically UEFI." },
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
