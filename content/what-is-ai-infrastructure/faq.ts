import type { FaqItem } from "@/lib/schemas";

export const aiInfraFaq: FaqItem[] = [
  {
    question: "AI Infrastructure kya hota hai?",
    answer:
      "AI Infrastructure woh purpose-built technology stack hai jo machine learning models ko train karne, deploy karne aur operate karne ke liye chahiye — GPU clusters, high-speed networking (InfiniBand/RoCE), parallel storage, specialized power aur cooling systems, aur supporting software stack (PyTorch, NCCL, Kubernetes/Slurm). Traditional IT infrastructure se fundamentally alag hai kyunki ek hi workload type (matrix math) pe extreme scale pe operate karta hai.",
  },
  {
    question: "GPU CPU se AI ke liye better kyun hai?",
    answer:
      "CPU mein 8-128 powerful general-purpose cores hain jo diverse workloads handle karte hain. GPU mein 10,000-16,000+ simpler cores hain specifically parallel computation ke liye. Neural network training ka core operation hai matrix multiplication — inherently parallel. Ek NVIDIA H100 GPU matrix multiplication ke liye ek top-end CPU se 60-80x faster hai. AI training ek GPU pe nahi hoti — hazaron GPUs simultaneously kaam karte hain. Parallelism hi GPU ko AI ka primary compute resource banata hai.",
  },
  {
    question: "AI Infrastructure mein InfiniBand kyun use karte hain regular Ethernet ki jagah?",
    answer:
      "AI training distributed fashion mein thousands of GPUs pe hoti hai. Har training step mein gradients all-reduce operation ke through synchronize hote hain — latency directly training speed affect karti hai. InfiniBand (HDR 200Gbps / NDR 400Gbps) sub-microsecond latency aur native RDMA support provide karta hai. NCCL (NVIDIA's collective communications library) InfiniBand ke liye optimized hai. Large clusters ke liye InfiniBand training throughput 20-30% improve karta hai vs Ethernet. Ethernet (RoCE) viable hai smaller deployments ya cost-sensitive setups ke liye, lekin large-scale training ke liye InfiniBand preferred hai.",
  },
  {
    question: "AI Data Center aur traditional Data Center mein kya difference hai?",
    answer:
      "Key differences: Power density (AI 40-100+ kW per rack vs traditional 5-15 kW), cooling method (liquid cooling mandatory for AI vs air cooling for traditional), networking (400G InfiniBand/Ethernet vs 10-25GbE), primary compute (GPU-centric vs CPU-centric), utilization target (80-95%+ GPU vs 40-70% CPU), failure tolerance (checkpointing for training vs N+1 hardware), aur cost profile (GPU dominates 60-70% of hardware spend vs balanced distribution).",
  },
  {
    question: "AI Infrastructure jobs mein kya skills chahiye?",
    answer:
      "AI Infrastructure Engineer ke liye: Linux system administration (RHEL/Ubuntu), GPU driver/CUDA ecosystem knowledge, distributed systems (Kubernetes, Slurm), networking (InfiniBand/RoCE configuration, NCCL tuning), Python scripting, ML framework basics (PyTorch), monitoring (DCGM, Prometheus, Grafana), storage systems (Lustre, Weka, NFS), aur physical infrastructure awareness (power density, liquid cooling concepts). Data Center background wale engineers ke liye additional skills: GPU health monitoring, NCCL troubleshooting, distributed training debugging.",
  },
  {
    question: "AI Training aur AI Inference mein kya difference hai infrastructure perspective se?",
    answer:
      "Training: batch size 512-4096, weeks-long continuous jobs, maximum GPU throughput priority, large parallel storage needed, few large clusters, checkpointing required. Inference: real-time latency <500ms, variable traffic load, smaller batch sizes (1-32), autoscaling needed, many deployment instances. GPU choice differs: H100 for training large models, A10G/L4/L40S more cost-effective for inference. Infrastructure design completely alag — training cluster aur inference cluster ideally separate honi chahiye.",
  },
  {
    question: "NVLink aur NVSwitch kya hai aur kyun important hai?",
    answer:
      "NVLink NVIDIA ka high-speed GPU-to-GPU interconnect hai. H100 generation mein NVLink 4.0 pe 900 GB/s bidirectional bandwidth per GPU milti hai — PCIe 5.0 (64 GB/s) se 14x zyada. NVSwitch ek dedicated chip hai jo ek server ke andar sab 8 GPUs ko full bandwidth pe interconnect karta hai. Matlab: tensor parallelism (model layers GPUs pe split karna) efficiently ek server ke andar kaam karta hai. NVLink bandwidth hi reason hai ki 8 H100 GPUs ek node mein almost ek giant GPU jaise behave karte hain. PCIe-based systems mein yeh bandwidth available nahi hoti — training slower hoti hai.",
  },
  {
    question: "NVIDIA Blackwell kya hai aur GB200 NVL72 kya hota hai?",
    answer:
      "Blackwell NVIDIA ki next-generation GPU architecture hai. B100/B200 GPUs Hopper (H100) ke successor hain. B200 BF16 peak performance ~4.5 PFLOPS deliver karta hai — H100 ke ~2 PFLOPS se roughly 2x improvement. GB200 ek combined Grace CPU + Blackwell GPU package hai (Grace Blackwell). NVL72 ek rack-scale system hai jisme 36 GB200 modules hain (72 Blackwell GPUs + 36 Grace CPUs) jo NVLink se interconnect hote hain — effectively ek giant unified system. NVL72 ke andar GPU-to-GPU bandwidth 1.8 TB/s hai — training clusters ke liye game-changing.",
  },
  {
    question: "CXL kya hai aur AI Infrastructure mein kyun relevant hai?",
    answer:
      "CXL (Compute Express Link) ek open interconnect standard hai (PCIe 5.0 pe based) jo CPUs, GPUs, aur memory devices ko high-bandwidth, low-latency link se connect karta hai. AI Infrastructure relevance: Memory pooling — multiple GPUs ek shared memory pool access kar sakte hain. Memory capacity expansion — GPU HBM ke bahar additional fast memory. CPU-GPU memory coherence — GPU direct CPU memory access efficiently kar sakta hai. CXL 3.0 (2022+) fabric support add karta hai — multiple hosts aur devices ek memory pool share kar sakte hain. Long-term yeh GPU memory limitation ko partially address kar sakta hai.",
  },
  {
    question: "AI Infrastructure ke liye power density planning kaise karte hain?",
    answer:
      "Step 1: GPU count aur server spec se power estimate karo. NVIDIA HGX H100 server (8 GPUs): ~10-11 kW. Step 2: Networking, storage overhead add karo (typically 15-20% of compute power). Step 3: PUE factor apply karo (AI DC target PUE 1.2-1.4): total facility power = IT power × PUE. Step 4: Rack layout planning — 4 HGX H100 servers per rack = 40-44 kW per rack. Existing DC mein retrofit ke liye: high-density PDUs, 3-phase distribution, liquid cooling manifolds install karne padte hain. Step 5: UPS sizing for full cluster load — MW scale systems ke liye dedicated UPS banks. Step 6: Generator capacity for sustained AI training runs.",
  },
  {
    question: "AI Infrastructure cloud pe run karein ya on-premises?",
    answer:
      "Cloud best hai: experimentation, variable workloads, no GPU expertise in team, short-term projects, small-medium training runs. On-premises justified: sustained predictable workloads (12+ months continuous use), data sovereignty/regulatory requirements (RBI, healthcare data), >$2-5M/year cloud GPU spend, customization needed. Hybrid common: owned infrastructure for sustained training, cloud for burst capacity, inference on cloud with autoscaling. Cost analysis at 1-3 year horizon typically shows break-even when GPU utilization is consistently high. CoreWeave, Lambda Labs offer GPU-dedicated cloud with better AI pricing than hyperscalers.",
  },
  {
    question: "AI Infrastructure mein liquid cooling kyun mandatory ho rahi hai?",
    answer:
      "NVIDIA HGX H100 server 10-11 kW per 2U chassis draw karta hai. 4 servers per rack = 40-44 kW. ASHRAE A1 class aur traditional CRAC/CRAH systems efficiently 30-40 kW per rack tak handle karte hain — AI rack density se below. Air cooling above 40 kW per rack: massive airflow volumes chahiye (noise, pressure management complex), cooling infrastructure over-provisioning required, PUE suffers. Direct Liquid Cooling (DLC) cold plates GPUs, CPUs pe directly heat absorb karte hain — 80-130+ kW per rack easily achievable. NVIDIA H100 servers DLC ke liye designed hain. New AI DC deployments mein liquid cooling default ban raha hai.",
  },
  {
    question: "BlueField DPU aur SmartNIC AI Infrastructure mein kya karte hain?",
    answer:
      "DPU (Data Processing Unit) — NVIDIA BlueField — ek programmable network processor hai jo networking, storage, aur security offload tasks CPU se DPU pe shift karta hai. AI Infrastructure relevance: Storage offload: NVMe-over-Fabric operations DPU pe, CPU free for AI computation. Network security: encryption/decryption offload. Telemetry: network monitoring without CPU overhead. Isolation: multi-tenant AI clusters mein tenant isolation. SmartNIC broader category hai — NICs with onboard processing. Production AI clusters mein, jab hundreds of servers hote hain aur CPU cycles precious hote hain, DPU/SmartNIC CPU ko sirf AI compute pe focus karne deta hai.",
  },
  {
    question: "AI Infrastructure sustainability aur PUE kya hota hai?",
    answer:
      "PUE (Power Usage Effectiveness) = Total Facility Power / IT Equipment Power. AI DC target: 1.2-1.4 with liquid cooling. Traditional DC average: 1.58 (Uptime Institute 2023). WUE (Water Usage Effectiveness): cooling water consumption per kWh of IT load. CUE (Carbon Usage Effectiveness): kg CO2 per kWh. AI training energy consumption growing rapidly — Microsoft FY2024 carbon emissions increased 30% due to AI infrastructure buildout. Mitigation approaches: renewable energy PPAs, nuclear power contracts (Microsoft-Constellation), liquid cooling for higher efficiency, waste heat reuse for building heating in cold climates, AI workload scheduling for low-carbon grid hours.",
  },
];
