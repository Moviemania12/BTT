import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "CPU in Servers — Architecture, NUMA, Cores, Threads & Selection | Behind The Tech",
  description: "What is a server CPU, cores/threads/sockets, cache hierarchy, NUMA topology, TDP, x86 vs ARM concept, hardware virtualisation extensions, workload-based selection and troubleshooting — Zero-to-Hero English guide.",
  keywords: ["server CPU","Intel Xeon","AMD EPYC","NUMA","CPU cores threads","cache L1 L2 L3","TDP","virtualisation extensions","CPU selection data center"],
  openGraph: { title: "CPU in Servers — Architecture, NUMA & Selection", description: "CPU cores, threads, cache, NUMA, TDP, x86 vs ARM, virtualisation — complete guide.", url: "https://behindthetech.in/learn/it/servers/cpu", locale: "en_US", siteName: "Behind The Tech", type: "article", authors: ["Kumar Anil"] },
  twitter: { card: "summary_large_image", title: "CPU in Servers — Behind The Tech", description: "CPU architecture, NUMA, selection and troubleshooting guide." },
  alternates: {
    canonical: "https://behindthetech.in/learn/it/servers/cpu",
    languages: {
      en: "https://behindthetech.in/learn/it/servers/cpu",
      hi: "https://behindthetech.in/hi/learn/it/servers/cpu",
      "x-default": "https://behindthetech.in/learn/it/servers/cpu",
    },
  },
};
export const faqs = [
  { q: "What are the key differences between a server CPU and a consumer CPU?", a: "Multi-socket support (2S/4S configurations), more PCIe lanes, ECC memory support (platform dependent), RAS (Reliability/Availability/Serviceability) features, longer product lifecycle support, higher core counts, server-specific instruction set extensions. Intel Xeon and AMD EPYC are common in data centers. Specific capabilities depend on model and generation." },
  { q: "What is NUMA and how does it impact performance?", a: "Non-Uniform Memory Access — in a multi-socket server, each CPU (socket) has directly-connected local RAM. When a CPU accesses its own local RAM, it is fast. To access another CPU's RAM, it has to go through the CPU-to-CPU interconnect — higher latency, potentially lower bandwidth. NUMA-unaware workload placement can silently degrade performance. Check the topology in Linux with `numactl`." },
  { q: "Should Hyperthreading/SMT be enabled?", a: "Generally most workloads benefit, but the benefit is workload-specific — no universal percentage claim would be accurate. Some latency-sensitive or specific HPC workloads may see a neutral or slightly negative impact. Keep it on by default and tune based on specific workload testing. Check organizational policies for security considerations (side-channel vulnerabilities)." },
  { q: "What is TDP?", a: "Thermal Design Power — in watts — is a reference value against which the cooling solution should be designed. It gives an estimate of the CPU's maximum heat dissipation under defined load conditions. Actual CPU power consumption depends on the workload and, in some scenarios, can exceed or under-run TDP depending on architecture and configuration. TDP is a reference for cooling and power budgeting planning, not a universal maximum power figure." },
  { q: "What is the difference between x86 and ARM in the context of servers?", a: "x86 (Intel/AMD) has historically been dominant in servers — Intel Xeon, AMD EPYC. x86 uses a Complex Instruction Set Computing (CISC) architecture. ARM-based server processors (AWS Graviton, Ampere Altra, etc.) use a Reduced Instruction Set Computing (RISC) architecture — often better performance-per-watt in certain workloads. The ARM server ecosystem is growing. Check software compatibility — some software requires ARM native support or needs performance optimisation." },
];
export const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
