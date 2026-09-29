import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
export const metadata: Metadata = {
  title: "Blade Servers — Architecture, Chassis, Shared Infrastructure & Deployment | Behind The Tech",
  description: "What is a blade server, chassis architecture, shared failure domain, I/O modules, chassis fabric, oversubscription, redundancy, blade vs rack vs composable — Zero-to-Hero English guide.",
  keywords: ["blade server","blade chassis","blade vs rack server","HPE blade","Dell blade","blade server architecture","shared failure domain","composable infrastructure"],
  openGraph: { title: "Blade Servers — Architecture & Data Center Deployment", description: "Blade chassis, shared failure domain, I/O modules, redundancy and deployment.", url: "https://behindthetech.in/learn/it/servers/blade-server", locale: "en_US", siteName: "Behind The Tech", type: "article", authors: ["Kumar Anil"], images: [SITE_OG_IMAGE], },
  twitter: { card: "summary_large_image", title: "Blade Servers — Behind The Tech", description: "Blade server architecture and deployment guide.", images: [SITE_OG_IMAGE.url], },
  alternates: {
    canonical: "https://behindthetech.in/learn/it/servers/blade-server",
    languages: {
      en: "https://behindthetech.in/learn/it/servers/blade-server",
      hi: "https://behindthetech.in/hi/learn/it/servers/blade-server",
      "x-default": "https://behindthetech.in/learn/it/servers/blade-server",
    },
  },
};
export const faqs = [
  { q: "What is the key difference between a blade server and a rack server?", a: "Blade servers are slide-in compute cards in a shared chassis — power, cooling and networking are shared from the chassis. A rack server is self-contained — its own PSU, cooling and network. Blade: higher density, less cabling, centralised management, chassis-level shared failure domain. Rack: more flexible, independent, wider vendor choice, lower entry cost." },
  { q: "What is a shared failure domain in blade servers?", a: "A blade chassis has shared infrastructure — power supplies, cooling fans, I/O modules, management module — which all blades share together. If a chassis-level component fails, or the chassis has to be powered off for maintenance, all blades in that chassis are affected. In mission-critical deployments, distribute workloads across multiple chassis so that one chassis issue does not affect everything." },
  { q: "What do I/O modules do in a blade chassis?", a: "I/O modules at the rear of the chassis provide network and storage connectivity for all blades. Blades route through the internal chassis backplane to the I/O modules — there are no external cables per blade. Ethernet switching, pass-through (blades directly to an external switch) or Fibre Channel modules are available. Base I/O module selection on workload requirements." },
  { q: "What is composable infrastructure and how is it different from blade?", a: "Traditional blade servers are fixed compute blades — one blade has CPU + RAM + storage in a defined configuration. Composable (or modular) infrastructure disaggregates resources — compute, memory, storage and networking are separate pools and are composed dynamically through software. HPE Synergy is an example of this concept. This approach gives more flexibility, but complexity and cost are also higher. Evaluate it against your specific requirements." },
];
export const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
