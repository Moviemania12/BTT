import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
export const metadata: Metadata = {
  title: "GPU in Data Centers — Architecture, VRAM & AI Workloads | Behind The Tech",
  description: "GPU handbook for data center engineers — CPU vs GPU, SM and tensor cores, HBM and memory math, precision formats, PCIe/SXM/OAM, NVLink and NVSwitch, multi-GPU parallelism, rail-optimised networking, capacity planning, power density, air and direct liquid cooling, MIG and vGPU, software stack, BIOS, installation, DCGM monitoring, XID troubleshooting and Tier III/IV view.",
  keywords: ["GPU data center","GPU server","HBM memory","NVLink NVSwitch","SXM vs PCIe","HGX DGX","GPU cooling","direct liquid cooling","GPU power density","MIG GPU","DCGM monitoring","XID errors","nvidia-smi topo","AI training memory","GPU cluster networking","rail optimised network"],
  openGraph: { title: "GPU in Data Centers — Architecture & AI Workloads", description: "GPU architecture, VRAM, training vs inference, multi-GPU, server deployment.", url: "https://behindthetech.in/learn/it/servers/gpu", locale: "en_US", siteName: "Behind The Tech", type: "article", authors: ["Kumar Anil"], images: [SITE_OG_IMAGE], },
  twitter: { card: "summary_large_image", title: "GPU in Data Centers — Behind The Tech", description: "GPU architecture, AI workloads, deployment guide.", images: [SITE_OG_IMAGE.url], },
  alternates: {
    canonical: "https://behindthetech.in/learn/it/servers/gpu",
    languages: {
      en: "https://behindthetech.in/learn/it/servers/gpu",
      hi: "https://behindthetech.in/hi/learn/it/servers/gpu",
      "x-default": "https://behindthetech.in/learn/it/servers/gpu",
    },
  },
};
export const faqs = [
  { q: "What is a GPU and why is it used in data centers?", a: "A GPU is a parallel processor with thousands of simple cores and very high-bandwidth memory. It is used in data centers for AI training, AI inference, HPC simulation and analytics because these workloads are dominated by matrix math that can be split into many independent operations." },
  { q: "What is the difference between a CPU and a GPU?", a: "A CPU has a few powerful cores optimised for low latency and complex branching code. A GPU has thousands of simpler cores optimised for throughput on regular, parallel math. A GPU still needs a CPU host to boot, run the OS and launch its work." },
  { q: "How much GPU memory do I need to train a model?", a: "A common rule of thumb for mixed precision with the Adam optimizer is about 16 bytes per parameter (weights, gradients, FP32 master weights and two optimizer states), so a 7B model needs roughly 112 GB plus activations. Techniques such as sharding, activation checkpointing and parallelism spread this across several GPUs." },
  { q: "How much memory does inference need?", a: "Weights need about 2 bytes per parameter at FP16, 1 byte at INT8 and 0.5 byte at INT4, so a 70B model is roughly 140 GB, 70 GB and 35 GB. Add room for the KV-cache, which grows with context length and the number of concurrent users." },
  { q: "What is HBM and how is it different from DDR?", a: "HBM (High Bandwidth Memory) is stacked DRAM placed on the same package as the GPU with a very wide interface, giving several TB/s of bandwidth at lower energy per bit but with higher cost and limited capacity. Server DDR5 sits on DIMMs and delivers tens of GB/s per channel." },
  { q: "What is the difference between PCIe, SXM and OAM GPUs?", a: "PCIe GPUs are cards in standard slots with lower power and mostly PCIe-based GPU-to-GPU communication. SXM (NVIDIA) and OAM (open standard) are modules mounted on baseboards with higher power delivery and a full NVLink or equivalent mesh, used in 8-GPU AI servers such as HGX designs." },
  { q: "What do NVLink and NVSwitch do?", a: "NVLink is a high-bandwidth GPU-to-GPU interconnect, several times faster than PCIe. NVSwitch is a switch chip that connects all GPUs so any GPU can talk to any other at full speed at the same time, which is essential for tensor-parallel training and fast collectives." },
  { q: "Why does GPU rack power and cooling need special design?", a: "An 8-GPU server can be around 10 kW class, so racks reach 30–100+ kW against 5–10 kW for traditional racks. That requires heavier power chains, careful breaker and UPS sizing, and rear-door heat exchangers or direct liquid cooling instead of room air alone." },
  { q: "Do liquid-cooled GPU servers still need air cooling?", a: "Usually yes. Cold plates handle the GPUs and often CPUs, but memory, NICs, drives and power supplies are typically still air-cooled, so containment and airflow management remain important. Exact split depends on the server design." },
  { q: "What is MIG and when should I use it?", a: "Multi-Instance GPU partitions one supported GPU in hardware into several isolated instances, each with dedicated memory and compute. It suits multi-tenant or many-small-model inference where strong isolation and predictable performance are needed." },
  { q: "My GPU shows 100% utilisation but training is slow. Why?", a: "Utilisation only says a kernel was running, not how much of the GPU it used. Slowness can come from throttling, a starved data pipeline, poor NCCL or network performance, bad topology placement or small kernels. Check throttle reasons, clocks, topology and profiler metrics." },
  { q: "What should I do when a GPU shows XID 79?", a: "XID 79 means the GPU fell off the PCIe bus. Drain the node, check power cables, seating and risers, BIOS settings, BMC logs and temperature, reboot and run diagnostics such as dcgmi diag. If it repeats, replace the GPU or baseboard per OEM process." },
];
export const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
