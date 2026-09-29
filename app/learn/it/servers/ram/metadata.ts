import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
export const metadata: Metadata = {
  title: "RAM in Servers — ECC, RDIMM, Channels, NUMA & Troubleshooting | Behind The Tech",
  description: "What is server RAM, DRAM basics, ECC, RDIMM/LRDIMM, DDR generations, memory channels, NUMA relationship, DIMM population rules, RAS, scrubbing and fault isolation — Zero-to-Hero English guide.",
  keywords: ["server RAM","ECC RAM","RDIMM LRDIMM","DDR4 DDR5","memory channels","NUMA RAM","DIMM population","memory scrubbing","server memory troubleshooting"],
  openGraph: { title: "RAM in Servers — ECC, Channels & Troubleshooting", description: "ECC, RDIMM, DDR generations, NUMA, DIMM population and troubleshooting.", url: "https://behindthetech.in/learn/it/servers/ram", locale: "en_US", siteName: "Behind The Tech", type: "article", authors: ["Kumar Anil"], images: [SITE_OG_IMAGE], },
  twitter: { card: "summary_large_image", title: "RAM in Servers — Behind The Tech", description: "Server memory complete guide.", images: [SITE_OG_IMAGE.url], },
  alternates: {
    canonical: "https://behindthetech.in/learn/it/servers/ram",
    languages: {
      en: "https://behindthetech.in/learn/it/servers/ram",
      hi: "https://behindthetech.in/hi/learn/it/servers/ram",
      "x-default": "https://behindthetech.in/learn/it/servers/ram",
    },
  },
};
export const faqs = [
  { q: "What is ECC RAM and why is it essential in a server?", a: "ECC (Error-Correcting Code) RAM can detect memory errors and, in some cases, correct them. The exact ECC capability — single-bit correction, multi-bit detection, chipkill — depends on the implementation. Consumer RAM typically does not have this protection. In server workloads, memory corruption can be catastrophic — database corruption, wrong calculations, OS instability. ECC protects against this. ECC support depends on the platform and CPU chipset — not universally required by all servers but standard in enterprise deployments." },
  { q: "What is the difference between RDIMM and UDIMM?", a: "An RDIMM (Registered DIMM) has a register/buffer chip that buffers command and address signals — it supports a larger DIMM count per channel and reduces electrical loading. Server standard. A UDIMM (Unbuffered DIMM) does not have this buffer — simpler, lower latency, but supports a limited slot count per channel. Used in consumer systems and some workstations. An LRDIMM buffers data signals as well — even higher DIMM counts, slightly higher latency. Check the OEM compatibility matrix." },
  { q: "What are memory channels and how do they affect bandwidth?", a: "The CPU's memory controller accesses RAM through multiple parallel channels. More channels = higher memory bandwidth. For maximum bandwidth, populate all available channels with symmetric DIMMs. Follow OEM population guidelines exactly — the platform manual is the mandatory reference." },
  { q: "How normal are correctable ECC errors?", a: "Isolated occasional correctable errors are possible. But a consistently increasing rate on the same DIMM, or frequent correctable errors = the DIMM is degrading. Monitor the per-DIMM error rate — on an increasing trend, schedule replacement proactively. Uncorrectable errors = immediate investigation and replacement." },
  { q: "What is memory scrubbing?", a: "Memory scrubbing is a hardware process that periodically scans RAM content for errors — detecting and correcting them before errors accumulate. ECC scrubbing runs in the background. Some server platforms support hardware-level scrubbing that identifies silent bit errors which have not surfaced in normal operation. Configuration options depend on the platform." },
];
export const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
