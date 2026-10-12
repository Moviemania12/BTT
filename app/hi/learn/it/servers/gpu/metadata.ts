import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
export const metadata: Metadata = {
  title: "GPU in Data Centers — Architecture, VRAM, AI Workloads & Deployment | Behind The Tech",
  description: "Data center engineers ke liye GPU handbook — CPU vs GPU, SM aur tensor cores, HBM aur memory math, precision formats, PCIe/SXM/OAM, NVLink aur NVSwitch, multi-GPU parallelism, rail-optimised networking, capacity planning, power density, air aur direct liquid cooling, MIG aur vGPU, software stack, BIOS, installation, DCGM monitoring, XID troubleshooting aur Tier III/IV view.",
  keywords: ["GPU data center","GPU server","HBM memory","NVLink NVSwitch","SXM vs PCIe","HGX DGX","GPU cooling","direct liquid cooling","GPU power density","MIG GPU","DCGM monitoring","XID errors","nvidia-smi topo","AI training memory","GPU cluster networking","rail optimised network"],
  openGraph: { title: "GPU in Data Centers — Architecture & AI Workloads", description: "GPU architecture, VRAM, training vs inference, multi-GPU, server deployment.", url: "https://behindthetech.in/hi/learn/it/servers/gpu", locale: "hi_IN", siteName: "Behind The Tech", type: "article", authors: ["Kumar Anil"], images: [SITE_OG_IMAGE], },
  twitter: { card: "summary_large_image", title: "GPU in Data Centers — Behind The Tech", description: "GPU architecture, AI workloads, deployment guide.", images: [SITE_OG_IMAGE.url], },
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/it/servers/gpu",
    languages: {
      en: "https://behindthetech.in/learn/it/servers/gpu",
      hi: "https://behindthetech.in/hi/learn/it/servers/gpu",
      "x-default": "https://behindthetech.in/learn/it/servers/gpu",
    },
  },
};
export const faqs = [
  { q: "GPU kya hai aur data center mein kyun use hota hai?", a: "GPU ek parallel processor hai jisme hazaaron simple cores aur bahut high-bandwidth memory hoti hai. Data center mein ye AI training, AI inference, HPC simulation aur analytics ke liye use hota hai kyunki ye workloads matrix math par based hain jise bahut saare independent operations mein baanta ja sakta hai." },
  { q: "CPU aur GPU mein kya fark hai?", a: "CPU ke paas kuch powerful cores hote hain jo low latency aur complex branching code ke liye optimised hain. GPU ke paas hazaaron simpler cores hote hain jo regular, parallel math par throughput ke liye optimised hain. GPU ko boot karne, OS chalane aur kaam launch karne ke liye abhi bhi CPU host chahiye." },
  { q: "Model train karne ke liye kitni GPU memory chahiye?", a: "Mixed precision aur Adam optimizer ke liye rule of thumb lagbhag 16 bytes per parameter hai (weights, gradients, FP32 master weights aur do optimizer states), to 7B model ko activations ke alawa lagbhag 112 GB chahiye. Sharding, activation checkpointing aur parallelism se ye kai GPUs mein baant jaata hai." },
  { q: "Inference ke liye kitni memory chahiye?", a: "Weights ko FP16 par lagbhag 2 bytes per parameter, INT8 par 1 byte aur INT4 par 0.5 byte chahiye, to 70B model lagbhag 140 GB, 70 GB aur 35 GB hota hai. KV-cache ke liye alag jagah rakho, jo context length aur concurrent users ke saath badhta hai." },
  { q: "HBM kya hai aur DDR se kaise alag hai?", a: "HBM (High Bandwidth Memory) stacked DRAM hai jo GPU ke same package par lagi hoti hai aur bahut wide interface deti hai — kai TB/s bandwidth, kam energy per bit, lekin mehengi aur limited capacity. Server DDR5 DIMMs par hoti hai aur per channel dahaiyon GB/s deti hai." },
  { q: "PCIe, SXM aur OAM GPUs mein kya fark hai?", a: "PCIe GPUs standard slots mein cards hain, kam power aur zyadatar PCIe-based GPU-to-GPU communication ke saath. SXM (NVIDIA) aur OAM (open standard) baseboards par mounted modules hain jinme zyada power delivery aur full NVLink ya equivalent mesh hota hai, 8-GPU AI servers (jaise HGX designs) mein use hote hain." },
  { q: "NVLink aur NVSwitch kya karte hain?", a: "NVLink high-bandwidth GPU-to-GPU interconnect hai, PCIe se kai guna tez. NVSwitch ek switch chip hai jo saare GPUs ko jodta hai taaki koi bhi GPU kisi bhi doosre se full speed par ek saath baat kar sake — tensor-parallel training aur fast collectives ke liye zaroori." },
  { q: "GPU rack ke power aur cooling ko special design kyun chahiye?", a: "8-GPU server lagbhag 10 kW class ka ho sakta hai, to racks 30–100+ kW tak jaate hain jabki traditional racks 5–10 kW ke hote hain. Isliye heavier power chain, careful breaker aur UPS sizing, aur akeli room air ki jagah rear-door heat exchangers ya direct liquid cooling chahiye." },
  { q: "Liquid-cooled GPU servers ko abhi bhi air cooling chahiye?", a: "Aam taur par haan. Cold plates GPUs aur aksar CPUs sambhalti hain, lekin memory, NICs, drives aur power supplies aksar abhi bhi air-cooled hote hain, isliye containment aur airflow management important rehte hain. Exact split server design par depend karta hai." },
  { q: "MIG kya hai aur kab use karna chahiye?", a: "Multi-Instance GPU ek supported GPU ko hardware mein kai isolated instances mein baantta hai, har ek ki dedicated memory aur compute ke saath. Ye multi-tenant ya bahut saare chhote models ke inference ke liye acha hai jahan strong isolation aur predictable performance chahiye." },
  { q: "GPU 100% utilisation dikha raha hai lekin training slow hai. Kyun?", a: "Utilisation sirf batata hai ki kernel chal raha tha, ye nahi ki GPU ka kitna hissa use hua. Slowness throttling, bhookhe data pipeline, kharab NCCL ya network performance, galat topology placement ya chhote kernels se aa sakti hai. Throttle reasons, clocks, topology aur profiler metrics check karo." },
  { q: "GPU par XID 79 aaye to kya karna chahiye?", a: "XID 79 ka matlab GPU PCIe bus se gir gaya. Node drain karo, power cables, seating aur risers, BIOS settings, BMC logs aur temperature check karo, reboot karke dcgmi diag jaise diagnostics chalao. Repeat ho to OEM process ke hisaab se GPU ya baseboard replace karo." },
];
export const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
