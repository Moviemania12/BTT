import type { FaqItem } from "@/lib/schemas";

export const aiGpuFaq: FaqItem[] = [
  {
    question: "Kya consumer GPU (GeForce RTX) AI ke liye use ho sakta hai?",
    answer:
      "Technically haan, practically limited. GeForce RTX 4090 (24GB GDDR6X) ek affordable option hai experimentation ke liye — Llama 3 8B run ho sakta hai, small fine-tuning possible. Lekin: no ECC memory (reliability risk for production), limited memory capacity, no NVLink support for consumer cards, no MIG, limited enterprise support, consumer-grade reliability. Production AI inference ya training: data center GPUs (A100, H100, L4, A10G) use karo. Development aur experimentation: GeForce acceptable hai.",
  },
  {
    question: "H100 aur A100 mein practically kya difference hai?",
    answer:
      "A100 (Ampere, 2020): 80GB HBM2e, 2 TB/s bandwidth, 312 TFLOPS FP16 Tensor Core dense, NVLink 3.0 (600 GB/s). H100 (Hopper, 2022): 80GB HBM3, 3.35 TB/s bandwidth, FP8 support via Transformer Engine (~3,958 TFLOPS FP8 sparse), NVLink 4.0 (900 GB/s bidirectional). Practical difference: H100 roughly 2-3× faster for LLM training and inference vs A100 for typical workloads. H100 cost is higher. For inference: H100 ki higher memory bandwidth directly translates to faster token generation. For training: FP8 plus Transformer Engine significantly faster convergence per dollar.",
  },
  {
    question: "Kitne GPUs chahiye hain ek 70B model serve karne ke liye?",
    answer:
      "Model size: 70B parameters × 2 bytes (FP16) = 140GB. Minimum GPU requirement: enough HBM to hold model weights plus KV cache. At FP16: 2 H100 80GB (160GB combined). At INT4 quantization: ~35GB — fits in 1 H100 with KV cache budget. For production with concurrent requests and KV cache: 2-4 H100s recommended at FP16 for comfortable throughput. With AMD MI300X (192GB): 1 GPU can hold 70B at FP16 with KV cache margin.",
  },
  {
    question: "Cloud GPU vs on-premises — kab kya choose karein?",
    answer:
      "Cloud choose karo when: fast start needed, variable or unpredictable workloads, limited capital budget, data privacy not requiring on-premises, team lacks GPU infrastructure expertise. On-premises choose karo when: predictable high utilization (above 70%), data sovereignty or compliance requiring on-premises, long-term cost optimization at scale (3+ year horizon), large consistent workloads, team with GPU infrastructure capability. Hybrid: cloud ke saath burst karo, on-premises baseline use karo. India context: RBI, DPDP Act compliance often requires on-premises for sensitive financial and personal data.",
  },
  {
    question: "GPU failure pe training job restart kaise handle karein?",
    answer:
      "Best practice: frequent checkpointing (every 30 minutes minimum), automatic detection (DCGM alert to job scheduler notification), automatic restart from last checkpoint on node failure. Slurm: --requeue flag automatic requeue karta hai failed jobs. Kubernetes: pod restart policy OnFailure or Always. Training framework integration: PyTorch Elastic (torchrun) handles dynamic node membership — nodes join or leave without full restart. Large training runs: comprehensive fault tolerance built in — jobs checkpoint every 30 minutes, automatic resume from checkpoint on any failure.",
  },
  {
    question: "NVIDIA GPU itne expensive kyun hain?",
    answer:
      "Multiple factors: H100 chip manufacturing complexity (TSMC advanced process node, CoWoS packaging for HBM integration), HBM3 memory itself high-cost 3D-stacked technology, research and development cost amortized over units, supply constraints (TSMC production capacity limited), massive demand from hyperscalers and enterprises, NVIDIA CUDA ecosystem creates switching cost and pricing power. GPU prices change rapidly depending on supply, demand, and generation — always verify current market pricing before procurement decisions.",
  },
  {
    question: "Tensor Core kya hai aur regular CUDA Core se kaise alag hai?",
    answer:
      "CUDA Core ek lightweight arithmetic execution unit hai — general floating-point ya integer math karta hai. Yeh CPU core nahi hai — CPU core se direct comparison nahi karna chahiye. Tensor Core specialized matrix multiplication hardware hai jo NVIDIA GPUs mein AI acceleration ke liye designed hai. Neural network layers essentially matrix multiplications hain. Tensor Cores ne GPU AI performance significantly improve kiya vs CUDA Cores alone — actual improvement architecture, workload, matrix size, aur precision (FP16, BF16, FP8) pe depend karta hai.",
  },
  {
    question: "MIG kab use karna chahiye?",
    answer:
      "MIG (Multi-Instance GPU) use karo when: development aur testing workflows, multiple teams GPU resources share kar rahe hain, smaller models dedicated GPU chahte hain, multi-tenant inference serving mein isolation required hai. MIG use mat karo when: large model training (full GPU ya multi-GPU needs), maximum single-workload throughput chahiye. MIG hardware-level isolation provide karta hai — ek instance doosre ki memory access nahi kar sakta. Up to seven isolated GPU instances depending on the selected MIG profile (H100 pe).",
  },
  {
    question: "GPU OOM error aane pe kya karte hain?",
    answer:
      "Diagnosis first: model size × precision × batch size × sequence length calculate karo. Then optimize: (1) Reduce batch size — simplest fix, (2) Enable gradient checkpointing — recompute activations vs store, trades compute for memory, (3) Switch to FP16/BF16 from FP32 — 2× memory reduction, (4) Quantization for inference — INT8 or INT4, (5) Model parallelism — split model across multiple GPUs (tensor parallel or pipeline parallel), (6) CPU offloading — ZeRO-Infinity/DeepSpeed, (7) Reduce sequence length. Always profile first — understand exactly what is consuming memory before optimizing blindly.",
  },
  {
    question: "DGX aur HGX mein kya difference hai?",
    answer:
      "DGX NVIDIA ka complete, integrated AI server hai — GPUs, CPU, DRAM, NVMe, networking, software — sab configured aur tested. HGX woh GPU baseboard hai jo OEM manufacturers (Dell, Supermicro, HPE) apne servers mein use karte hain. Same GPU performance (same H100 chips), different form factor aur support model. Specifications may vary depending on DGX generation and configuration. DGX: turnkey, premium, faster deployment, NVIDIA full support. HGX-based OEM servers: more customizable, often lower cost, vendor support, better for large scale where customization matters.",
  },
  {
    question: "NVSwitch kya hai aur yeh regular network switch se kaise alag hai?",
    answer:
      "NVSwitch ek dedicated GPU interconnect switch hai jo GPU servers ke andar hota hai — yeh Ethernet switch nahi hai. NVSwitch NVLink connections ko route karta hai sab GPUs ke beech same server mein. DGX H100 mein 3 NVSwitch chips hain jo sab 8 GPUs ko connect karte hain — koi bhi GPU kisi bhi doosre GPU se full 900 GB/s NVLink bandwidth pe baat kar sakta hai. Ethernet switch external network requests handle karta hai. NVSwitch internal GPU-to-GPU communication handle karta hai — completely alag use case.",
  },
  {
    question: "GPU inference workloads mein GPU utilization itna low kyun hota hai?",
    answer:
      "Inference workloads often intentionally run at lower GPU utilization kyunki latency throughput se zyada important hoti hai. Training mein goal hai: GPU 95% busy rakho, throughput maximize karo. Inference mein goal hai: har request jaldi complete ho — even if GPU 30-40% idle rahe. Agar aap GPU 95% pe push karo inference mein, toh queue build up hogi, latency badh jaayegi, user experience kharab hogi. Isliye inference serving configuration typically throughput sacrifice karta hai for low latency. DCGM mein low utilization dekh ke panic mat karo agar inference workload chal raha ho.",
  },
];
