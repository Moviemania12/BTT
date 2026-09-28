import type { FaqItem } from "@/lib/schemas";

export const aiGpuFaq: FaqItem[] = [
  {
    question: "Can a consumer GPU (GeForce RTX) be used for AI?",
    answer:
      "Technically yes, practically limited. The GeForce RTX 4090 (24GB GDDR6X) is an affordable option for experimentation — you can run Llama 3 8B, small fine-tuning is possible. But: no ECC memory (reliability risk for production), limited memory capacity, no NVLink support on consumer cards, no MIG, limited enterprise support, consumer-grade reliability. For production AI inference or training: use data center GPUs (A100, H100, L4, A10G). For development and experimentation: GeForce is acceptable.",
  },
  {
    question: "What's the practical difference between H100 and A100?",
    answer:
      "A100 (Ampere, 2020): 80GB HBM2e, 2 TB/s bandwidth, 312 TFLOPS FP16 Tensor Core dense, NVLink 3.0 (600 GB/s). H100 (Hopper, 2022): 80GB HBM3, 3.35 TB/s bandwidth, FP8 support via Transformer Engine (~3,958 TFLOPS FP8 sparse), NVLink 4.0 (900 GB/s bidirectional). Practical difference: the H100 is roughly 2-3x faster for LLM training and inference vs A100 for typical workloads. H100 cost is higher. For inference: the H100's higher memory bandwidth directly translates to faster token generation. For training: FP8 plus Transformer Engine gives significantly faster convergence per dollar.",
  },
  {
    question: "How many GPUs do you need to serve a 70B model?",
    answer:
      "Model size: 70B parameters × 2 bytes (FP16) = 140GB. Minimum GPU requirement: enough HBM to hold model weights plus KV cache. At FP16: 2 H100 80GB (160GB combined). At INT4 quantization: ~35GB — fits in 1 H100 with KV cache budget. For production with concurrent requests and KV cache: 2-4 H100s recommended at FP16 for comfortable throughput. With AMD MI300X (192GB): 1 GPU can hold 70B at FP16 with KV cache margin.",
  },
  {
    question: "Cloud GPU vs on-premises — when to choose what?",
    answer:
      "Choose cloud when: a fast start is needed, workloads are variable or unpredictable, capital budget is limited, data privacy doesn't require on-premises, the team lacks GPU infrastructure expertise. Choose on-premises when: predictable high utilization (above 70%), data sovereignty or compliance requires on-premises, long-term cost optimization at scale (3+ year horizon), large consistent workloads, a team with GPU infrastructure capability. Hybrid: burst with cloud, use on-premises as baseline. India context: RBI, DPDP Act compliance often requires on-premises for sensitive financial and personal data.",
  },
  {
    question: "How do you handle restarting a training job after a GPU failure?",
    answer:
      "Best practice: frequent checkpointing (every 30 minutes minimum), automatic detection (DCGM alert to job scheduler notification), automatic restart from the last checkpoint on node failure. Slurm: the --requeue flag automatically requeues failed jobs. Kubernetes: pod restart policy OnFailure or Always. Training framework integration: PyTorch Elastic (torchrun) handles dynamic node membership — nodes join or leave without a full restart. Large training runs: comprehensive fault tolerance is built in — jobs checkpoint every 30 minutes, automatic resume from checkpoint on any failure.",
  },
  {
    question: "Why are NVIDIA GPUs so expensive?",
    answer:
      "Multiple factors: H100 chip manufacturing complexity (TSMC advanced process node, CoWoS packaging for HBM integration), HBM3 memory itself high-cost 3D-stacked technology, research and development cost amortized over units, supply constraints (TSMC production capacity limited), massive demand from hyperscalers and enterprises, NVIDIA CUDA ecosystem creates switching cost and pricing power. GPU prices change rapidly depending on supply, demand, and generation — always verify current market pricing before procurement decisions.",
  },
  {
    question: "What is a Tensor Core and how is it different from a regular CUDA Core?",
    answer:
      "A CUDA Core is a lightweight arithmetic execution unit — it does general floating-point or integer math. It's not a CPU core — don't compare it directly to a CPU core. A Tensor Core is specialized matrix multiplication hardware designed into NVIDIA GPUs for AI acceleration. Neural network layers are essentially matrix multiplications. Tensor Cores significantly improved GPU AI performance vs CUDA Cores alone — the actual improvement depends on architecture, workload, matrix size, and precision (FP16, BF16, FP8).",
  },
  {
    question: "When should you use MIG?",
    answer:
      "Use MIG (Multi-Instance GPU) when: development and testing workflows, multiple teams are sharing GPU resources, smaller models need a dedicated GPU, isolation is required in multi-tenant inference serving. Don't use MIG when: large model training (needs a full GPU or multiple GPUs), you need maximum single-workload throughput. MIG provides hardware-level isolation — one instance can't access another's memory. Up to seven isolated GPU instances depending on the selected MIG profile (on H100).",
  },
  {
    question: "What do you do when you get a GPU OOM error?",
    answer:
      "Diagnose first: calculate model size × precision × batch size × sequence length. Then optimize: (1) reduce batch size — the simplest fix, (2) enable gradient checkpointing — recompute activations instead of storing them, trades compute for memory, (3) switch to FP16/BF16 from FP32 — 2x memory reduction, (4) quantization for inference — INT8 or INT4, (5) model parallelism — split the model across multiple GPUs (tensor parallel or pipeline parallel), (6) CPU offloading — ZeRO-Infinity/DeepSpeed, (7) reduce sequence length. Always profile first — understand exactly what is consuming memory before optimizing blindly.",
  },
  {
    question: "What's the difference between DGX and HGX?",
    answer:
      "DGX is NVIDIA's complete, integrated AI server — GPUs, CPU, DRAM, NVMe, networking, software — all configured and tested. HGX is the GPU baseboard that OEM manufacturers (Dell, Supermicro, HPE) use in their servers. Same GPU performance (same H100 chips), different form factor and support model. Specifications may vary depending on DGX generation and configuration. DGX: turnkey, premium, faster deployment, full NVIDIA support. HGX-based OEM servers: more customizable, often lower cost, vendor support, better for large scale where customization matters.",
  },
  {
    question: "What is NVSwitch and how is it different from a regular network switch?",
    answer:
      "NVSwitch is a dedicated GPU interconnect switch that sits inside a GPU server — it's not an Ethernet switch. NVSwitch routes NVLink connections between all the GPUs in the same server. The DGX H100 has 3 NVSwitch chips connecting all 8 GPUs — any GPU can talk to any other GPU at the full 900 GB/s NVLink bandwidth. An Ethernet switch handles external network requests. NVSwitch handles internal GPU-to-GPU communication — a completely different use case.",
  },
  {
    question: "Why is GPU utilization often so low in inference workloads?",
    answer:
      "Inference workloads often intentionally run at lower GPU utilization because latency matters more than throughput. In training the goal is: keep the GPU 95% busy, maximize throughput. In inference the goal is: get every request done quickly — even if the GPU stays 30-40% idle. If you push the GPU to 95% during inference, queues build up, latency rises, user experience suffers. That's why inference serving configuration typically sacrifices throughput for low latency. Don't panic seeing low utilization in DCGM if it's an inference workload.",
  },
];
