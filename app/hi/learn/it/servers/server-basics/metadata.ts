import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Server Basics — What Is a Server, Rack Deployment & Data Center Use | Behind The Tech",
  description:
    "Server kya hota hai, PC se kyun alag hai, form factors, server ke andar ke components, rack deployment, A/B power aur cooling math, cabling, boot flow, BMC, redundancy, Tier III/IV view, installation, operations, maintenance, troubleshooting, real failure scenarios, safety, OEMs aur interview questions — complete Hinglish engineer guide.",
  keywords: ["server basics","what is a server","rack server","1U 2U 4U server","server vs PC","ECC RAM","BMC iDRAC","rack PDU","data center server","server deployment","A/B power","rack planning","server troubleshooting","Tier III server","server commissioning"],
  openGraph: {
    title: "Server Basics — What Is a Server & How Is It Deployed in a Data Center",
    description: "Server architecture, form factors, rack deployment, components aur troubleshooting — complete guide.",
    url: "https://behindthetech.in/hi/learn/it/servers/server-basics",
    locale: "hi_IN",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"], images: [SITE_OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title: "Server Basics — Behind The Tech", description: "Server kya hai, rack mein kaise deploy hota hai — complete engineer guide.", images: [SITE_OG_IMAGE.url], },
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/it/servers/server-basics",
    languages: {
      en: "https://behindthetech.in/learn/it/servers/server-basics",
      hi: "https://behindthetech.in/hi/learn/it/servers/server-basics",
      "x-default": "https://behindthetech.in/learn/it/servers/server-basics",
    },
  },
};

export const faqs = [
  { q: "Server aur PC mein fundamental difference kya hai?", a: "Server continuous operation ke liye design kiya jaata hai — ECC RAM (memory error correction), redundant PSUs (ek fail hone pe server chalta rahe), hot-swap storage (bina shutdown drive replace karna), BMC/iDRAC (OS ke bina remote management), aur rack-mount form factor. Consumer PC mein yeh features typically nahi hoti kyunki occasional downtime acceptable hota hai. Specific capabilities server model aur configuration pe depend karti hain." },
  { q: "1U, 2U, 4U kya hota hai?", a: "Yeh server ki rack height hai. 1 Rack Unit (U) = 1.75 inches (44.45 mm). 1U server ek U space leta hai — thin, limited drive bays. 2U do U leta hai — more drives, better cooling headroom, more PCIe slots. 4U four U — typically large storage servers ya GPU servers. Yeh sirf physical height hai, server performance se koi seedha relation nahi." },
  { q: "BMC kya hai aur kyun zaroori hai?", a: "Baseboard Management Controller ek separate microcontroller hai jo server ke main system se independent operate karta hai. BMC ko standby power milta hai — matlab server main power off hone ke baad bhi (jab tak PSU mein AC supply hai) BMC apne dedicated network port se accessible rehta hai. Aap remotely power on/off, UEFI access, hardware health monitor, aur firmware update kar sakte hain bina physical access ke." },
  { q: "Ek 42U rack mein kitne servers fit hote hain?", a: "42U rack ka matlab 42 × 1U servers nahi hai. Actual deployable server count in factors pe depend karta hai: rack PDU power capacity, cooling (CRAC/CRAH capacity), rack weight limit, network switch ports, cable management space, blanking panels, aur redundancy requirements. Network switches aur patch panels bhi U space lete hain. Practical planning mein sab constraints simultaneously consider karo." },
  { q: "Hot-swap kya hota hai?", a: "Hot-swap ka matlab hai component ko running server pe replace karna — shutdown ki zarurat nahi. Typically drives, PSUs, aur kuch servers mein fans hot-swap hote hain. Hotswap ke liye appropriate hardware support aur OS/RAID configuration required hoti hai. Specific hot-swap capabilities OEM documentation se verify karo." },
  { q: "UEFI aur BIOS mein kya difference hai?", a: "BIOS (Basic Input/Output System) older firmware standard hai — 16-bit, 1MB firmware address limit, MBR-based boot. UEFI (Unified Extensible Firmware Interface) modern replacement hai — 64-bit, large storage support (GPT), faster boot, Secure Boot capability, graphical interface. Modern servers typically UEFI use karte hain. 'BIOS' term colloquially bhi use hoti hai for the server's pre-OS configuration interface even when it's technically UEFI." },
  { q: "Rack ka total load ek hi feed ki capacity ke andar kyun rakhna chahiye?", a: "A/B design mein har dual-PSU server dono feeds se draw karta hai. Feed A fail ho to feed B ko poora rack uthana padta hai. Agar rack load us se zyada hai jo ek feed safely utha sake (continuous load ke liye aam taur par breaker rating ka lagbhag 80%), to bacha hua breaker trip karta hai aur poora rack band ho jaata hai. Redundancy tabhi hai jab ek feed sab kuch utha sake. Actual limits site design aur local electrical codes par depend karte hain." },
  { q: "Out-of-band management kya hai aur kyun zaroori hai?", a: "Out-of-band ka matlab management path production path se alag hai. BMC ka apna dedicated network port hota hai aur ye standby power par chalta hai, isliye OS crash ho ya production network down ho tab bhi aap server power-cycle kar sakte ho, console dekh sakte ho, hardware logs padh sakte ho aur OS image mount kar sakte ho. Isse site visits bachte hain aur recovery time kam hota hai. Ise isolated management VLAN par rakhna aur secure karna zaroori hai." },
  { q: "Server engineer ko daily round mein kya check karna chahiye?", a: "Servers, PSU, fans aur drives par amber ya red LEDs dekho. Fan ka ajeeb shor suno. Naye BMC aur monitoring alerts review karo. Rack inlet temperature check karo. Blanking panels aur cabling ka intact hona confirm karo. Findings shift log mein likho aur open items handover karo. Chhoti cheezein jaldi pakadne se zyadatar bade incidents rukte hain." },
  { q: "Kya Tier III ya Tier IV server ko zyada reliable bana deta hai?", a: "Tier rating site infrastructure (power, cooling, distribution) ko describe karti hai, server ko nahi. Lekin Tier III ya Tier IV site sirf unhi servers ki madad karti hai jo dual-corded hain aur independent A/B paths se sahi cabled hain. Single-corded ya galat cabled server phir bhi single point of failure ho sakta hai. Actual implementation project requirements, utility requirements, OEM design aur data center architecture par depend karti hai." },
  { q: "Production servers par firmware kaise update karna chahiye?", a: "Vendor release notes aur compatibility matrix padho, firmware bundle non-production server par test karo, configuration backup lo, rollback plan rakho, approved window mein chhote batches mein update karo, flash kabhi interrupt mat karo, aur har batch ke baad health verify karo. Random component versions ki jagah vendor-tested bundles use karo." },
  { q: "Nameplate power aur actual server power mein kya farak hai?", a: "Nameplate power power supply ya system ki maximum rating hai. Actual draw asli workload par depend karta hai aur aksar kaafi kam hota hai. Planning ke liye BMC ya intelligent PDU ki measured values safety margin ke saath use karo, aur exact hardware configuration ke liye vendor ka power calculator." },
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
