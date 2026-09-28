import type { FaqItem } from "@/lib/schemas";

export const aiAcceleratorsFaq: FaqItem[] = [
  {
    question: "NPU, GPU, TPU, aur DPU mein kya fark hai — ek line mein?",
    answer:
      "GPU: general parallel processor — graphics banata tha, ab AI bhi karta hai. TPU: Google ka matrix multiply specialist — sirf AI training/inference. NPU (Neural Processing Unit): mobile aur edge devices ke liye low-power AI engine — aapke phone mein Face ID, voice assistant yahi karta hai. DPU (Data Processing Unit): network aur storage I/O specialist — AI data ko move karne mein help karta hai, compute nahi karta. Simple analogy: GPU ek truck driver hai (heavy lifting karta hai), TPU ek specialist courier hai (ek specific route expert), NPU ek bicycle delivery wala hai (small, efficient, local), DPU ek traffic controller hai (data flow manage karta hai).",
  },
  {
    question: "FPGA aur ASIC mein kya difference hai — kab kaunsa use karein?",
    answer:
      "FPGA (Field Programmable Gate Array): reprogrammable chip — ek baar banao, baad mein logic change kar sako software se. Flexible lekin less efficient. ASIC (Application Specific Integrated Circuit): ek specific kaam ke liye permanently designed chip — reprogrammable nahi, lekin maximum efficiency. Analogy: FPGA ek whiteboard hai jis pe aap kuch bhi likh sako aur mita bhi sako. ASIC ek printed book hai — ek baar print ho gayi, change nahi hogi, lekin padhna fast hai. Kab kya: FPGA use karo jab algorithm change ho sakta ho (early research, protocol flexibility), ya volume low ho (<10,000 units), ya time-to-market critical ho. ASIC use karo jab algorithm fixed ho, volume high ho (millions of units), aur power efficiency critical ho. AWS Inferentia, Google TPU — sab ASICs hain. FPGA use hota hai research aur niche deployments mein.",
  },
  {
    question: "AWS Trainium aur AWS Inferentia mein kya difference hai?",
    answer:
      "Dono AWS ke custom AI chips hain lekin alag use cases ke liye. Trainium (Trn1): training ke liye optimize kiya gaya hai — model banana. Large cluster training possible hai, high memory bandwidth, bfloat16 support. Inferentia (Inf2): inference ke liye optimize — trained model use karna for predictions. Lower latency, better cost-per-inference, on-demand scaling. Analogy: Trainium ek factory hai jahan product banate ho (high capital, high output). Inferentia ek shop hai jahan product bechte ho (lower cost per transaction, customer-facing). AWS pe: PyTorch/TensorFlow models Neuron SDK ke through compile karte hain — phir Trn1/Inf2 instances pe run karte hain. Cost advantage: Inferentia 2 often 40-60% cheaper than equivalent GPU inference at AWS, depending on workload.",
  },
  {
    question: "Cerebras WSE kya hai aur yeh GPU se itna alag kyun hai?",
    answer:
      "Cerebras WSE (Wafer Scale Engine) ek single chip hai jo puri semiconductor wafer pe bana hai — normal chips wafer se cut hoti hain, Cerebras wafer cut nahi karta. Result: WSE-3 mein 900,000 AI cores aur 44 GB on-chip SRAM hain — sab ek chip pe. Analogy: normal GPU ek apartment hai (limited space, neighbors share building). WSE ek entire building hai — no neighbors, sab space aapka. Main advantage: no inter-chip communication — sab on-chip. Model weights on-chip memory mein fit hoti hain toh HBM memory bandwidth bottleneck remove hoti hai. Main limitation: only one chip per server — can't scale beyond one wafer. Not available on-premises widely — mostly cloud/partnership. Best for: large model single-chip training, scientific computing, LLM inference where latency critical.",
  },
  {
    question: "Intel Gaudi 2/3 NVIDIA GPU ka replacement ho sakta hai?",
    answer:
      "Intel Gaudi (Gaudi 2, Gaudi 3) reasonable alternative hai for specific workloads. Gaudi 3 mein 96 GB HBM2e memory hai aur competitive BF16 performance hai H100 ke saath. Software side: Habana SynapseAI SDK (mature lekin CUDA se smaller ecosystem). PyTorch integration available hai. Kab consider karo: price-performance important ho aur CUDA-specific libraries na ho workload mein, Intel ka broader ecosystem (Xeon CPUs, Optane storage) already use karo, EU/non-NVIDIA sourcing requirement ho. Kab avoid karo: CUDA-specific code heavily, large existing NVIDIA ecosystem, aur cutting-edge framework support zaroori ho (NVIDIA pe pehle milti hai). Practical reality: CUDA ecosystem itna dominant hai ki GPU replacement mushkil hai even with comparable hardware specs. Intel Gaudi viable alternative hai for targeted workloads, not universal replacement.",
  },
  {
    question: "Graphcore IPU kya hai aur traditional GPU se kaise alag approach hai?",
    answer:
      "IPU (Intelligence Processing Unit) Graphcore ka hai — fundamentally alag architecture. GPU: large matrices, high memory bandwidth, batch processing. IPU: massive fine-grained parallelism (1,472 independent processors per chip), BSP (Bulk Synchronous Parallel) execution model, large on-chip SRAM (900 MB per chip — very high), low off-chip memory bandwidth (by design). IPU best kaam karta hai: sparse computation (graphs, GNNs, recommendation systems), irregular data patterns, small batch inference. IPU struggle karta hai: large dense matrix operations (LLMs), workloads requiring huge memory capacity. Analogy: GPU ek freeway hai (high throughput, designed for heavy traffic). IPU ek city road network hai (many parallel small streets, great for complex routing, less ideal for trucks). Real-world: Graphcore enterprise deployments exist but ecosystem much smaller than NVIDIA. Niche use cases mein compelling, broad LLM training mein GPU still better.",
  },
  {
    question: "Edge AI Accelerator kya hai — phone pe NPU aur cloud GPU mein kya difference hai?",
    answer:
      "Edge AI Accelerator ek low-power AI chip hai jo device pe hi (phone, camera, IoT sensor) AI inference karta hai — cloud pe data bhejne ki zaroorat nahi. Phone NPU examples: Apple Neural Engine (aapka iPhone), Qualcomm Hexagon DSP (Android phones), Google Tensor chip (Pixel phones). Advantages of edge inference: Privacy (data device pe hi process hoti hai, cloud pe nahi jaati), Latency (milliseconds vs seconds for cloud round-trip), No internet dependency (offline works), Cost (no cloud API charges per query). Limitations: Limited model size (small models only — few hundred MB max), Less compute than cloud GPU, Harder to update models. Data center relevance: Even DC engineers need to know edge AI — because some applications use hybrid architecture: small model pe edge (fast response), large model pe cloud (complex reasoning). Knowing where to run which inference is a design decision.",
  },
  {
    question: "Custom silicon strategy kab sahi hai — kab NVIDIA GPU kharidna better hai?",
    answer:
      "Custom silicon (FPGA/ASIC/custom chip) strategy sahi hai jab: Volume very high ho (millions of inference queries per day — then per-unit savings justify design cost), Algorithm stable ho (won't change frequently — ASIC investment wasted agar algorithm changes), Differentiation important ho (competitors ke paas same chip, aap unique advantage chahte ho), Power envelope critical ho (edge deployment, battery-powered devices — ASICs much more efficient). NVIDIA GPU better hai jab: Time to market critical (GPU available today, custom chip 18-24 months), Ecosystem important (CUDA, cuDNN, frameworks — all work out of box), Volume low to medium, Algorithm evolving (research phase), Budget limited for chip design (custom chip design = $10-100M+). Most companies choose GPU. Only hyperscalers (Google, AWS, Meta, Microsoft) design custom chips because their volume (millions of queries per second) justifies the investment.",
  },
  {
    question: "DPU (Data Processing Unit) AI workloads mein kyun important hai?",
    answer:
      "DPU (Data Processing Unit — jaise NVIDIA BlueField, Marvell OCTEON) ek network-on-a-chip hai jo CPU aur GPU se network aur storage I/O ka burden utha leta hai. AI workloads mein relevance: Large model training mein: data loading, network communication (gradient sync), storage I/O — yeh sab CPU pe run karte hain aur GPU ko wait karwate hain. DPU in tasks ko offload kar leti hai. Training job 10-20% faster ho sakta hai simply by freeing CPU for GPU orchestration. Inference serving mein: TLS termination, request parsing, load balancing — yeh CPU tasks GPU response latency add karte hain. DPU yeh handle karta hai. Security: DPU network traffic encryption/decryption GPU se independently handle kar sakta hai. When to care: Large-scale GPU clusters (8+ GPUs) mein DPU investment consider karo. Single GPU workstations ke liye overkill hai.",
  },
  {
    question: "SambaNova aur alternative AI chips enterprise deployment mein kaise use hote hain?",
    answer:
      "SambaNova DataScale ek full-stack AI system hai — chip, board, software stack, preconfigured system sab ek saath. SambaNova chips reconfigurable dataflow architecture use karte hain — different pe FPGA aur ASIC dono ke advantages mix karne ki koshish. Enterprise use case: Financial services (on-premises AI inference with data sovereignty), Healthcare (HIPAA-compliant on-premises AI), Government (classified data can't go to cloud). Key differentiator: SambaNova GPU-like experience dene ki koshish karta hai lekin on-premises, without needing NVIDIA expertise. Practical reality: Ecosystem NVIDIA se much smaller. Best suited for organizations with specific compliance requirements aur dedicated AI infrastructure team. Not a casual choice. Cost: Enterprise pricing (contact sales) — not publicly available. Compare: NVIDIA DGX on-premises vs SambaNova — both valid, evaluate based on software compatibility, support contract, aur long-term vendor viability.",
  },
  {
    question: "AI chip mein 'inference' aur 'training' optimization alag kyun hoti hai?",
    answer:
      "Training aur inference ke hardware requirements fundamentally different hain. Training: needs high memory capacity (model weights + gradients + optimizer states = 3-4x model size), high memory bandwidth (frequent weight updates), large batch processing, aur backward pass (gradient computation) support. FP32/BF16 precision standard. Inference: needs low latency (user wait kar raha hai), lower memory (weights only, no gradients), aur quantization support (INT8, INT4 — smaller numbers = faster compute). Key hardware implication: H100 excellent for training (high HBM capacity, NVLink scaling). AWS Inferentia excellent for inference (low latency, low cost per query, INT8 support). This is why Google has both: TPU for training (large Pod, BF16), Edge TPU for inference (tiny, INT8). Best practice: train on GPU/TPU, then quantize model, then deploy on inference-optimized chip. Never use same hardware budgeting for both — optimize separately.",
  },
  {
    question: "2025-2026 mein AI chip landscape kaise change ho raha hai?",
    answer:
      "Major trends: (1) Inference specialization growing — as more models move to production, inference-optimized chips (Inferentia, Gaudi for inference, future dedicated inference ASICs) demand badh raha hai. (2) Memory capacity race — LLMs getting bigger (GPT-4 level, then beyond), chips with more HBM (H200 141GB, MI300X 192GB) becoming standard. (3) Edge AI explosion — Qualcomm, Apple, MediaTek sab NPU capabilities agressively improving. On-device AI (phones, cars, cameras) growing rapidly. (4) China alternative chips — Huawei Ascend, Biren, SMIC-fabbed alternatives growing in China due to US export controls — different ecosystem. (5) RISC-V based AI chips — open architecture enabling new entrants. (6) Optical compute research — light-based computing prototypes exist, commercial viability 5-10 years away. (7) Power efficiency focus — AI datacenter power consumption is becoming a political and economic issue, driving efficiency innovation across all vendors. Watch: TSMC 2nm production, CoWoS packaging advances, HBM4 availability — these will define next generation capabilities.",
  },
];
