import type { FaqItem } from "@/lib/schemas";

export const aiInfraFaq: FaqItem[] = [
  {
    question: "What is AI Infrastructure?",
    answer:
      "AI Infrastructure is the purpose-built technology stack needed to train, deploy, and operate machine learning models — GPU clusters, high-speed networking (InfiniBand/RoCE), parallel storage, specialized power and cooling systems, and a supporting software stack (PyTorch, NCCL, Kubernetes/Slurm). It's fundamentally different from traditional IT infrastructure because it operates a single workload type (matrix math) at extreme scale.",
  },
  {
    question: "Why is GPU better than CPU for AI?",
    answer:
      "A CPU has 8-128 powerful general-purpose cores that handle diverse workloads. A GPU has 10,000-16,000+ simpler cores specifically for parallel computation. The core operation of neural network training is matrix multiplication — inherently parallel. An NVIDIA H100 GPU is 60-80x faster than a top-end CPU for matrix multiplication. AI training doesn't happen on a single GPU — thousands of GPUs work simultaneously. This parallelism is exactly what makes the GPU AI's primary compute resource.",
  },
  {
    question: "Why do we use InfiniBand instead of regular Ethernet in AI Infrastructure?",
    answer:
      "AI training happens in a distributed fashion across thousands of GPUs. In every training step, gradients are synchronized through an all-reduce operation — latency directly affects training speed. InfiniBand (HDR 200Gbps / NDR 400Gbps) provides sub-microsecond latency and native RDMA support. NCCL (NVIDIA's collective communications library) is optimized for InfiniBand. For large clusters, InfiniBand improves training throughput by 20-30% vs Ethernet. Ethernet (RoCE) is viable for smaller deployments or cost-sensitive setups, but InfiniBand is preferred for large-scale training.",
  },
  {
    question: "What is the difference between an AI Data Center and a traditional Data Center?",
    answer:
      "Key differences: power density (AI 40-100+ kW per rack vs traditional 5-15 kW), cooling method (liquid cooling mandatory for AI vs air cooling for traditional), networking (400G InfiniBand/Ethernet vs 10-25GbE), primary compute (GPU-centric vs CPU-centric), utilization target (80-95%+ GPU vs 40-70% CPU), failure tolerance (checkpointing for training vs N+1 hardware), and cost profile (GPU dominates 60-70% of hardware spend vs balanced distribution).",
  },
  {
    question: "What skills are needed for AI Infrastructure jobs?",
    answer:
      "For an AI Infrastructure Engineer: Linux system administration (RHEL/Ubuntu), GPU driver/CUDA ecosystem knowledge, distributed systems (Kubernetes, Slurm), networking (InfiniBand/RoCE configuration, NCCL tuning), Python scripting, ML framework basics (PyTorch), monitoring (DCGM, Prometheus, Grafana), storage systems (Lustre, Weka, NFS), and physical infrastructure awareness (power density, liquid cooling concepts). Additional skills for engineers coming from a Data Center background: GPU health monitoring, NCCL troubleshooting, distributed training debugging.",
  },
  {
    question: "What is the difference between AI Training and AI Inference from an infrastructure perspective?",
    answer:
      "Training: batch size 512-4096, weeks-long continuous jobs, maximum GPU throughput priority, large parallel storage needed, a few large clusters, checkpointing required. Inference: real-time latency <500ms, variable traffic load, smaller batch sizes (1-32), autoscaling needed, many deployment instances. GPU choice differs: H100 for training large models, A10G/L4/L40S more cost-effective for inference. The infrastructure design is completely different — ideally the training cluster and inference cluster should be separate.",
  },
  {
    question: "What are NVLink and NVSwitch and why do they matter?",
    answer:
      "NVLink is NVIDIA's high-speed GPU-to-GPU interconnect. In the H100 generation, NVLink 4.0 provides 900 GB/s bidirectional bandwidth per GPU — 14x more than PCIe 5.0 (64 GB/s). NVSwitch is a dedicated chip that interconnects all 8 GPUs inside a server at full bandwidth. This means: tensor parallelism (splitting model layers across GPUs) works efficiently within a single server. NVLink bandwidth is exactly why 8 H100 GPUs in one node behave almost like a single giant GPU. PCIe-based systems don't have this bandwidth available — training is slower.",
  },
  {
    question: "What is NVIDIA Blackwell and what is the GB200 NVL72?",
    answer:
      "Blackwell is NVIDIA's next-generation GPU architecture. B100/B200 GPUs are the successors to Hopper (H100). The B200 delivers ~4.5 PFLOPS of BF16 peak performance — roughly 2x the improvement over H100's ~2 PFLOPS. GB200 is a combined Grace CPU + Blackwell GPU package (Grace Blackwell). NVL72 is a rack-scale system with 36 GB200 modules (72 Blackwell GPUs + 36 Grace CPUs) interconnected via NVLink — effectively one giant unified system. GPU-to-GPU bandwidth inside the NVL72 is 1.8 TB/s — a game-changer for training clusters.",
  },
  {
    question: "What is CXL and why is it relevant to AI Infrastructure?",
    answer:
      "CXL (Compute Express Link) is an open interconnect standard (based on PCIe 5.0) that connects CPUs, GPUs, and memory devices with a high-bandwidth, low-latency link. AI Infrastructure relevance: Memory pooling — multiple GPUs can access a shared memory pool. Memory capacity expansion — additional fast memory beyond GPU HBM. CPU-GPU memory coherence — the GPU can efficiently access CPU memory directly. CXL 3.0 (2022+) adds fabric support — multiple hosts and devices can share a memory pool. Long-term, this could partially address the GPU memory limitation.",
  },
  {
    question: "How do you plan power density for AI Infrastructure?",
    answer:
      "Step 1: Estimate power from GPU count and server spec. NVIDIA HGX H100 server (8 GPUs): ~10-11 kW. Step 2: Add networking and storage overhead (typically 15-20% of compute power). Step 3: Apply the PUE factor (AI DC target PUE 1.2-1.4): total facility power = IT power × PUE. Step 4: Rack layout planning — 4 HGX H100 servers per rack = 40-44 kW per rack. For retrofitting an existing DC: you'll need to install high-density PDUs, 3-phase distribution, and liquid cooling manifolds. Step 5: UPS sizing for the full cluster load — dedicated UPS banks for MW-scale systems. Step 6: Generator capacity for sustained AI training runs.",
  },
  {
    question: "Should you run AI Infrastructure on cloud or on-premises?",
    answer:
      "Cloud is best for: experimentation, variable workloads, no GPU expertise on the team, short-term projects, small-medium training runs. On-premises is justified for: sustained predictable workloads (12+ months continuous use), data sovereignty/regulatory requirements (RBI, healthcare data), >$2-5M/year cloud GPU spend, customization needed. Hybrid is common: owned infrastructure for sustained training, cloud for burst capacity, inference on cloud with autoscaling. Cost analysis over a 1-3 year horizon typically shows a break-even when GPU utilization is consistently high. CoreWeave and Lambda Labs often offer better AI pricing than hyperscalers with GPU-dedicated cloud.",
  },
  {
    question: "Why is liquid cooling becoming mandatory in AI Infrastructure?",
    answer:
      "The NVIDIA HGX H100 server draws 10-11 kW per 2U chassis. 4 servers per rack = 40-44 kW. ASHRAE A1 class and traditional CRAC/CRAH systems efficiently handle up to 30-40 kW per rack — below AI rack density. Air cooling above 40 kW per rack needs massive airflow volumes (noise, complex pressure management), requires cooling infrastructure over-provisioning, and PUE suffers. Direct Liquid Cooling (DLC) cold plates absorb heat directly from GPUs and CPUs — easily achieving 80-130+ kW per rack. NVIDIA H100 servers are designed for DLC. Liquid cooling is becoming the default in new AI DC deployments.",
  },
  {
    question: "What do BlueField DPU and SmartNIC do in AI Infrastructure?",
    answer:
      "A DPU (Data Processing Unit) — NVIDIA BlueField — is a programmable network processor that shifts networking, storage, and security offload tasks from the CPU to the DPU. AI Infrastructure relevance: Storage offload: NVMe-over-Fabric operations on the DPU, freeing the CPU for AI computation. Network security: encryption/decryption offload. Telemetry: network monitoring without CPU overhead. Isolation: tenant isolation in multi-tenant AI clusters. SmartNIC is the broader category — NICs with onboard processing. In production AI clusters, where there are hundreds of servers and CPU cycles are precious, DPU/SmartNIC lets the CPU focus purely on AI compute.",
  },
  {
    question: "What is AI Infrastructure sustainability and PUE?",
    answer:
      "PUE (Power Usage Effectiveness) = Total Facility Power / IT Equipment Power. AI DC target: 1.2-1.4 with liquid cooling. Traditional DC average: 1.58 (Uptime Institute 2023). WUE (Water Usage Effectiveness): cooling water consumption per kWh of IT load. CUE (Carbon Usage Effectiveness): kg CO2 per kWh. AI training energy consumption growing rapidly — Microsoft FY2024 carbon emissions increased 30% due to AI infrastructure buildout. Mitigation approaches: renewable energy PPAs, nuclear power contracts (Microsoft-Constellation), liquid cooling for higher efficiency, waste heat reuse for building heating in cold climates, AI workload scheduling for low-carbon grid hours.",
  },
];
