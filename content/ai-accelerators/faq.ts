import type { FaqItem } from "@/lib/schemas";

export const aiAcceleratorsFaq: FaqItem[] = [
  {
    question: "What's the difference between NPU, GPU, TPU, and DPU — in one line?",
    answer:
      "GPU: general-purpose parallel processor — used to make graphics, now does AI too. TPU: Google's matrix-multiply specialist — only for AI training/inference. NPU (Neural Processing Unit): a low-power AI engine for mobile and edge devices — this is what powers Face ID and voice assistants on your phone. DPU (Data Processing Unit): a network and storage I/O specialist — helps move AI data around, doesn't compute. Simple analogy: a GPU is a truck driver (does the heavy lifting), a TPU is a specialist courier (expert on one specific route), an NPU is a bicycle delivery rider (small, efficient, local), a DPU is a traffic controller (manages data flow).",
  },
  {
    question: "What's the difference between FPGA and ASIC — when to use which?",
    answer:
      "FPGA (Field Programmable Gate Array): a reprogrammable chip — build it once, then change its logic later in software. Flexible but less efficient. ASIC (Application Specific Integrated Circuit): a chip permanently designed for one specific job — not reprogrammable, but maximum efficiency. Analogy: an FPGA is a whiteboard you can write on and erase anytime. An ASIC is a printed book — once printed it can't be changed, but reading it is fast. When to use what: use an FPGA when the algorithm might change (early research, protocol flexibility), or volume is low (<10,000 units), or time-to-market is critical. Use an ASIC when the algorithm is fixed, volume is high (millions of units), and power efficiency is critical. AWS Inferentia, Google TPU — these are all ASICs. FPGAs are used in research and niche deployments.",
  },
  {
    question: "What's the difference between AWS Trainium and AWS Inferentia?",
    answer:
      "Both are AWS's custom AI chips but built for different use cases. Trainium (Trn1): optimized for training — building the model. Enables large cluster training, high memory bandwidth, bfloat16 support. Inferentia (Inf2): optimized for inference — using a trained model to make predictions. Lower latency, better cost-per-inference, on-demand scaling. Analogy: Trainium is a factory where you manufacture a product (high capital, high output). Inferentia is a shop where you sell the product (lower cost per transaction, customer-facing). On AWS: you compile PyTorch/TensorFlow models through the Neuron SDK — then run them on Trn1/Inf2 instances. Cost advantage: Inferentia 2 is often 40-60% cheaper than equivalent GPU inference on AWS, depending on the workload.",
  },
  {
    question: "What is Cerebras WSE and why is it so different from a GPU?",
    answer:
      "Cerebras WSE (Wafer Scale Engine) is a single chip built on an entire semiconductor wafer — normal chips are cut from a wafer, Cerebras doesn't cut the wafer at all. Result: the WSE-3 has 900,000 AI cores and 44 GB of on-chip SRAM — all on one chip. Analogy: a normal GPU is an apartment (limited space, neighbors share the building). The WSE is an entire building — no neighbors, all the space is yours. Main advantage: no inter-chip communication — everything is on-chip. Model weights fit in on-chip memory, so the HBM memory-bandwidth bottleneck goes away. Main limitation: only one chip per server — can't scale beyond one wafer. Not widely available on-premises — mostly cloud/partnership. Best for: large single-chip model training, scientific computing, LLM inference where latency is critical.",
  },
  {
    question: "Can Intel Gaudi 2/3 replace an NVIDIA GPU?",
    answer:
      "Intel Gaudi (Gaudi 2, Gaudi 3) is a reasonable alternative for specific workloads. The Gaudi 3 has 96 GB of HBM2e memory and competitive BF16 performance against the H100. On the software side: the Habana SynapseAI SDK (mature but a smaller ecosystem than CUDA). PyTorch integration is available. When to consider it: price-performance matters and the workload doesn't depend on CUDA-specific libraries, you're already using Intel's broader ecosystem (Xeon CPUs, Optane storage), or there's an EU/non-NVIDIA sourcing requirement. When to avoid it: heavily CUDA-specific code, a large existing NVIDIA ecosystem, and cutting-edge framework support is essential (NVIDIA gets it first). Practical reality: the CUDA ecosystem is so dominant that replacing GPUs is hard even with comparable hardware specs. Intel Gaudi is a viable alternative for targeted workloads, not a universal replacement.",
  },
  {
    question: "What is a Graphcore IPU and how is its approach different from a traditional GPU?",
    answer:
      "The IPU (Intelligence Processing Unit) is Graphcore's chip — a fundamentally different architecture. GPU: large matrices, high memory bandwidth, batch processing. IPU: massive fine-grained parallelism (1,472 independent processors per chip), a BSP (Bulk Synchronous Parallel) execution model, large on-chip SRAM (900 MB per chip — very high), low off-chip memory bandwidth (by design). The IPU works best for: sparse computation (graphs, GNNs, recommendation systems), irregular data patterns, small-batch inference. The IPU struggles with: large dense matrix operations (LLMs), workloads that need huge memory capacity. Analogy: a GPU is a freeway (high throughput, built for heavy traffic). An IPU is a city road network (many parallel small streets, great for complex routing, less ideal for trucks). Real-world: Graphcore enterprise deployments exist but the ecosystem is much smaller than NVIDIA's. Compelling in niche use cases, GPUs still win for broad LLM training.",
  },
  {
    question: "What is an edge AI accelerator — what's the difference between an NPU on a phone and a cloud GPU?",
    answer:
      "An edge AI accelerator is a low-power AI chip that runs AI inference right on the device (phone, camera, IoT sensor) — no need to send data to the cloud. Phone NPU examples: Apple Neural Engine (your iPhone), Qualcomm Hexagon DSP (Android phones), Google Tensor chip (Pixel phones). Advantages of edge inference: privacy (data is processed on the device, never goes to the cloud), latency (milliseconds vs. seconds for a cloud round trip), no internet dependency (works offline), cost (no cloud API charges per query). Limitations: limited model size (small models only — a few hundred MB at most), less compute than a cloud GPU, harder to update models. Data center relevance: even DC engineers need to know edge AI — because some applications use a hybrid architecture: a small model at the edge (fast response), a large model in the cloud (complex reasoning). Knowing where to run which inference is a design decision.",
  },
  {
    question: "When does a custom silicon strategy make sense — when is buying an NVIDIA GPU the better call?",
    answer:
      "A custom silicon (FPGA/ASIC/custom chip) strategy makes sense when: volume is very high (millions of inference queries a day — then per-unit savings justify the design cost), the algorithm is stable (won't change often — an ASIC investment is wasted if the algorithm changes), differentiation matters (competitors have the same chip, you want a unique edge), or the power envelope is critical (edge deployment, battery-powered devices — ASICs are far more efficient). An NVIDIA GPU is the better choice when: time to market is critical (GPUs are available today, a custom chip takes 18-24 months), the ecosystem matters (CUDA, cuDNN, frameworks — all work out of the box), volume is low to medium, the algorithm is still evolving (research phase), or the budget for chip design is limited (custom chip design = $10-100M+). Most companies choose GPUs. Only hyperscalers (Google, AWS, Meta, Microsoft) design custom chips, because their volume (millions of queries per second) justifies the investment.",
  },
  {
    question: "Why does a DPU (Data Processing Unit) matter for AI workloads?",
    answer:
      "A DPU (Data Processing Unit — like NVIDIA BlueField, Marvell OCTEON) is a network-on-a-chip that takes the burden of network and storage I/O off the CPU and GPU. Relevance to AI workloads: in large model training, data loading, network communication (gradient sync), and storage I/O all run on the CPU and make the GPU wait. The DPU offloads these tasks. A training job can run 10-20% faster simply by freeing the CPU up for GPU orchestration. In inference serving: TLS termination, request parsing, load balancing — these CPU tasks add to GPU response latency. The DPU handles them. Security: the DPU can handle network traffic encryption/decryption independently of the GPU. When to care: consider DPU investment for large-scale GPU clusters (8+ GPUs). Overkill for single-GPU workstations.",
  },
  {
    question: "How are SambaNova and other alternative AI chips used in enterprise deployments?",
    answer:
      "SambaNova DataScale is a full-stack AI system — chip, board, software stack, preconfigured system, all together. SambaNova chips use a reconfigurable dataflow architecture — trying to combine the advantages of both FPGA and ASIC in one place. Enterprise use cases: financial services (on-premises AI inference with data sovereignty), healthcare (HIPAA-compliant on-premises AI), government (classified data can't go to the cloud). Key differentiator: SambaNova tries to give a GPU-like experience but on-premises, without needing NVIDIA expertise. Practical reality: the ecosystem is much smaller than NVIDIA's. Best suited for organizations with specific compliance requirements and a dedicated AI infrastructure team. Not a casual choice. Cost: enterprise pricing (contact sales) — not publicly available. Compare: NVIDIA DGX on-premises vs. SambaNova — both valid, evaluate based on software compatibility, support contract, and long-term vendor viability.",
  },
  {
    question: "Why is 'inference' vs. 'training' optimization different on an AI chip?",
    answer:
      "The hardware requirements for training and inference are fundamentally different. Training needs: high memory capacity (model weights + gradients + optimizer states = 3-4x model size), high memory bandwidth (frequent weight updates), large batch processing, and backward pass (gradient computation) support. FP32/BF16 precision is standard. Inference needs: low latency (the user is waiting), lower memory (weights only, no gradients), and quantization support (INT8, INT4 — smaller numbers mean faster compute). Key hardware implication: the H100 is excellent for training (high HBM capacity, NVLink scaling). AWS Inferentia is excellent for inference (low latency, low cost per query, INT8 support). This is why Google has both: TPU for training (large Pod, BF16), Edge TPU for inference (tiny, INT8). Best practice: train on GPU/TPU, then quantize the model, then deploy on an inference-optimized chip. Never budget the same hardware for both — optimize separately.",
  },
  {
    question: "How is the AI chip landscape changing in 2025-2026?",
    answer:
      "Major trends: (1) Inference specialization is growing — as more models move to production, demand for inference-optimized chips (Inferentia, Gaudi for inference, future dedicated inference ASICs) is rising. (2) The memory capacity race — LLMs keep getting bigger (GPT-4 level, then beyond), chips with more HBM (H200 141GB, MI300X 192GB) are becoming standard. (3) Edge AI explosion — Qualcomm, Apple, MediaTek are all aggressively improving NPU capabilities. On-device AI (phones, cars, cameras) is growing fast. (4) Chinese alternative chips — Huawei Ascend, Biren, SMIC-fabbed alternatives are growing in China due to US export controls — a different ecosystem. (5) RISC-V based AI chips — an open architecture enabling new entrants. (6) Optical compute research — light-based computing prototypes exist, commercial viability is 5-10 years away. (7) Power efficiency focus — AI datacenter power consumption is becoming a political and economic issue, driving efficiency innovation across all vendors. Watch: TSMC 2nm production, CoWoS packaging advances, HBM4 availability — these will define next-generation capabilities.",
  },
];
