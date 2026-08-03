"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { aiInfraContent } from "@/content/what-is-ai-infrastructure";

import AiInfraStackDiagram from "../svg/AiInfraStackDiagram";
import GpuClusterDiagram from "../svg/GpuClusterDiagram";
import TraditionalVsAiDiagram from "../svg/TraditionalVsAiDiagram";

export default function Content() {
  return (
    <article>

      {/* ─── QUICK SUMMARY ──────────────────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          AI Infrastructure woh poora physical aur software ecosystem hai jo artificial intelligence workloads — training, inference, aur data processing — run karne ke liye chahiye. Traditional IT infrastructure se fundamentally alag hai.
        </p>
        <p style={S.p}>
          Wahan general-purpose CPUs pe diverse workloads chalte hain. Yahan specialized GPUs ya AI accelerators, ultra-low latency networking, high-throughput storage, aur massive power density ek saath kaam karti hain ek singular purpose ke liye: mathematical computation at extreme scale.
        </p>
        <Callout type="important" title="Agar Aap DC Engineer Hain">
          AI infrastructure sirf AI engineers ka topic nahi hai. Power density 40-100+ kW per rack ka matlab hai ki DC design, UPS sizing, cooling architecture, aur power distribution sab kuch completely rethink karna padta hai. Agar aap infrastructure run karte hain, toh yeh article aapke liye hai.
        </Callout>
      </section>

      {/* ─── WHO SHOULD READ ────────────────────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>Data Center Engineers:</strong> Power density, cooling design, UPS sizing, liquid cooling architecture samajhne ke liye.</li>
          <li><strong>IT Infrastructure Engineers:</strong> GPU server deployment, networking (InfiniBand), storage systems, DCIM for AI clusters.</li>
          <li><strong>Cloud Engineers:</strong> Cloud AI instances (AWS P5, Azure NDv5, GCP A3) vs on-prem comparison.</li>
          <li><strong>AI/MLOps Engineers:</strong> Infrastructure requirements of the stack you deploy on.</li>
          <li><strong>Platform Engineers:</strong> Kubernetes GPU scheduling, Slurm, distributed training infrastructure.</li>
          <li><strong>CTOs and Technical Managers:</strong> Build vs buy decisions, cloud vs on-prem cost models, AI infrastructure roadmap.</li>
        </ul>
      </section>

      {/* ─── WHAT YOU WILL LEARN ────────────────────────────────────────── */}
      <section id="what-you-will-learn">
        <h2 style={S.h2}>What You Will Learn</h2>
        <ul style={S.ul}>
          <li>AI Infrastructure kya hai aur traditional IT se kaise alag hai</li>
          <li>GPU architecture: H100, Blackwell, NVLink, NVSwitch, HBM3</li>
          <li>AI networking: InfiniBand NDR vs RoCE, RDMA, all-reduce operations</li>
          <li>Storage: parallel file systems (Lustre, Weka, VAST), NVMe burst buffers</li>
          <li>Power infrastructure for 40-100+ kW per rack density</li>
          <li>Liquid cooling: DLC, immersion, rear-door heat exchangers</li>
          <li>Training vs Inference infrastructure differences</li>
          <li>Software stack: PyTorch, NCCL, Kubernetes, Slurm, vLLM</li>
          <li>Production 256-GPU cluster design example</li>
          <li>Cloud vs on-premises decision framework</li>
          <li>Sustainability: PUE, WUE, CUE for AI DCs</li>
          <li>Vendor landscape aur future trends</li>
        </ul>
      </section>

      {/* ─── LEARNING PATH ──────────────────────────────────────────────── */}
      <section id="learning-path">
        <h2 style={S.h2}>Learning Path</h2>
        <p style={S.p}>
          Yeh article AI Infrastructure track ka foundation article hai. Iske baad topic-specific deep dives:
        </p>
        <ul style={S.ul}>
          <li>Previous: <TopicLink slug="what-is-ai" variant="inline" /> — AI basics</li>
          <li>Current: What is AI Infrastructure (yeh article)</li>
          <li>Next: <TopicLink slug="ai-gpu" variant="inline" /> — GPU deep dive</li>
          <li>Related: <TopicLink slug="gpu-cluster" variant="inline" />, <TopicLink slug="ai-cooling" variant="inline" />, <TopicLink slug="ai-data-center-basics" variant="inline" /></li>
        </ul>
      </section>

      {/* ─── WHAT IS AI INFRASTRUCTURE ──────────────────────────────────── */}
      <section id="what-is-ai-infra">
        <h2 style={S.h2}>What is AI Infrastructure?</h2>
        <p style={S.p}>
          AI Infrastructure woh purpose-built technology stack hai jo machine learning models ke creation (training), deployment (inference), aur continuous improvement (fine-tuning aur retraining) ke liye design ki gayi hai.
        </p>
        <p style={S.p}>
          Teen layers hain isme:
        </p>
        <ul style={S.ul}>
          <li><strong>Compute Layer:</strong> GPU clusters ya AI accelerators (NVIDIA H100, A100, AMD MI300X, Google TPU, etc.). Yeh actual mathematical work karte hain.</li>
          <li><strong>Data aur Storage Layer:</strong> High-throughput storage systems jo training data ko GPUs tak fast enough pahuncha sake. Bottleneck yahan bhi hota hai frequently.</li>
          <li><strong>Networking Layer:</strong> GPUs ko aapas mein aur storage se connect karne wala fabric. InfiniBand ya high-speed Ethernet. Latency yahan microseconds mein matter karti hai.</li>
        </ul>
        <p style={S.p}>
          Upar yeh sab ek software stack chalti hai: AI frameworks (PyTorch, TensorFlow, JAX), orchestration systems (Kubernetes, Slurm), model serving platforms (Triton, vLLM), aur observability tools.
        </p>
        <Figure caption="AI Infrastructure — Complete Stack from Physical to Application Layer">
          <AiInfraStackDiagram />
        </Figure>
      </section>

      {/* ─── WHY IT EXISTS ──────────────────────────────────────────────── */}
      <section id="why-it-exists">
        <h2 style={S.h2}>Why AI Infrastructure Exists</h2>
        <p style={S.p}>
          Ek sawaal poochha ja sakta hai: pehle se to servers hain, cloud hai, data centers hain. Kya woh kaafi nahi hain?
        </p>
        <p style={S.p}>
          Nahi hain. Aur reason samajhna important hai.
        </p>
        <p style={S.p}>
          Ek general-purpose server mein ek CPU hota hai — versatile, lekin neural network training ke liye suboptimal. Modern CPUs mein 64 ya 128 cores hote hain. Woh diverse workloads karte hain: database queries, web requests, video encoding.
        </p>
        <p style={S.p}>
          Neural network training mein jo operation hoti hai woh hai <strong>matrix multiplication</strong> — ek hi type ki computation, bahut badi scale pe, inherently parallel. Ek NVIDIA H100 GPU mein 16,896 CUDA cores hain. Ek single H100 ek modern high-end CPU se 60-80x faster hai specifically matrix multiplication ke liye.
        </p>
        <ComparisonTable
          headers={["Why Not CPU?", "Why GPU?"]}
          rows={[
            ["8-128 powerful cores (general purpose)", "16,000+ simpler cores (parallel specialist)"],
            ["Optimized for diverse sequential tasks", "Optimized for identical operations at massive scale"],
            ["200-400W per server (typical)", "10,000-11,000W per 8-GPU server"],
            ["Training a large model: months", "Training a large model: days to weeks"],
            ["Cost-effective for web/DB workloads", "Cost-effective for AI training at scale"],
          ]}
        />
        <p style={S.p}>
          Aur training ek GPU pe nahi hoti — hazaron GPUs simultaneously kaam karte hain ek model par. Yeh density aur specialization traditional infrastructure design se alag kuch maangti hai:
        </p>
        <ul style={S.ul}>
          <li>Power per rack 5-15kW se 40-100+ kW ho jaata hai — cooling completely alag approach</li>
          <li>GPU-to-GPU bandwidth ke liye NVLink (900 GB/s) vs PCIe (64 GB/s)</li>
          <li>Inter-node bandwidth ke liye 400G InfiniBand vs 25G Ethernet</li>
          <li>Training data ke liye parallel file systems (TB/s throughput) vs standard NAS</li>
        </ul>
      </section>

      {/* ─── EVOLUTION ──────────────────────────────────────────────────── */}
      <section id="evolution">
        <h2 style={S.h2}>History and Evolution</h2>
        <ComparisonTable
          title="AI Infrastructure — Key Milestones"
          headers={["Year", "Milestone", "Infrastructure Impact"]}
          rows={[
            ["1990s", "HPC clusters in national labs", "Parallel compute exists but CPU-based, specialized"],
            ["2006", "NVIDIA CUDA launch", "GPU programming for non-graphics applications enabled"],
            ["2012", "AlexNet wins ImageNet on 2× GTX 580", "Consumer GPUs → research AI. 3GB GPU memory, weeks of training"],
            ["2013", "AWS G2 GPU instances", "Cloud GPU access democratized — but general-purpose, not AI-optimized"],
            ["2017", "NVIDIA Volta, V100, DGX-1", "First purpose-built AI server. Tensor Cores. NVLink. Dedicated training hardware"],
            ["2020", "NVIDIA A100, GPT-3", "10,000+ GPUs for one training run. Azure AI partnership. AI infrastructure as strategic asset"],
            ["2022-23", "H100, ChatGPT, hyperscale AI buildout", "NDR InfiniBand, liquid cooling mandatory, AI DC as separate building category"],
            ["2024-25", "Blackwell GB200, NVL72", "Rack-scale integration. 72 GPUs as one system. 1.8 TB/s intra-system bandwidth"],
          ]}
        />
        <p style={S.p}>
          Each generation ne infrastructure requirements dramatically change kiye. AlexNet ke 2 GPUs se aaj ke 100,000+ GPU clusters tak — har step pe power, cooling, networking, aur storage requirements ne ek new design category banaya.
        </p>
      </section>

      {/* ─── TRADITIONAL VS AI ──────────────────────────────────────────── */}
      <section id="traditional-vs-ai">
        <h2 style={S.h2}>Traditional IT vs AI Infrastructure</h2>
        <p style={S.p}>
          Yeh comparison bahut important hai samajhna. Jo engineer traditional DC operations se AI infrastructure mein shift hota hai, usse expect karna chahiye ki almost har assumption challenge hogi.
        </p>
        <Figure caption="Traditional IT vs AI Infrastructure — Every dimension is different">
          <TraditionalVsAiDiagram />
        </Figure>
        <Callout type="warning" title="Sabse Critical Difference: Power Density">
          Traditional server: 200-400W. NVIDIA HGX H100 server (8 GPUs): 10,000-11,000W. 4 servers per rack = 40-44 kW per rack. Traditional DC design assumption (5-15 kW/rack) completely breaks. Cooling, PDU, UPS, floor loading — sab kuch reconsider karna padta hai.
        </Callout>
      </section>

      {/* ─── CLOUD VS AI ────────────────────────────────────────────────── */}
      <section id="cloud-vs-ai">
        <h2 style={S.h2}>Cloud vs AI Infrastructure</h2>
        <p style={S.p}>
          "Kya cloud pe AI run kar sakte hain?" — haan, bilkul. "Kya cloud dedicated AI infrastructure replace karta hai?" — depends on workload aur scale.
        </p>
        <ComparisonTable
          headers={["Factor", "Cloud AI (AWS/Azure/GCP)", "On-Premises / Dedicated"]}
          rows={[
            ["Upfront cost", "Zero CAPEX", "High CAPEX ($50-500M+ for large clusters)"],
            ["Variable workloads", "✓ Excellent — pay per use", "✗ Fixed capacity, idle cost"],
            ["Sustained 12+ month usage TCO", "Often expensive", "Often better at scale"],
            ["Data sovereignty (RBI, HIPAA)", "Limited — depends on region", "✓ Full control"],
            ["Hardware customization", "✗ Standard instances only", "✓ Full control (liquid cooling, IB fabric)"],
            ["GPU availability", "Variable — waitlists exist", "Depends on procurement lead time"],
            ["Networking performance", "Virtualized (some overhead)", "Bare-metal IB at full spec"],
            ["MLOps tooling integration", "✓ Excellent native integrations", "Must build/integrate yourself"],
            ["Best for", "Experiments, burst, inference", "Sustained training, regulated industries"],
          ]}
        />
        <p style={S.p}>
          Most enterprises use a hybrid model: core training on owned infrastructure or reserved cloud capacity, burst to cloud for peak demand, inference on cloud with auto-scaling.
        </p>
        <Callout type="best-practice" title="Cloud Decision Framework">
          Cloud-first for organizations starting out. Evaluate on-prem when: (1) sustained GPU utilization &gt;70% for 12+ months, (2) data sovereignty requirements, (3) cloud spend approaching $2-5M/year on GPU instances. CoreWeave aur Lambda Labs hyperscalers se often better AI pricing dete hain GPU-dedicated cloud ke liye.
        </Callout>
      </section>

      {/* ─── HPC VS AI ──────────────────────────────────────────────────── */}
      <section id="hpc-vs-ai">
        <h2 style={S.h2}>HPC vs AI Infrastructure</h2>
        <p style={S.p}>
          AI infrastructure HPC (High Performance Computing) se bahut kuch share karta hai — lekin identical nahi hain. Ye differences practically matter karte hain.
        </p>
        <ComparisonTable
          headers={["Aspect", "Traditional HPC", "AI Infrastructure"]}
          rows={[
            ["Primary precision", "FP64 (scientific accuracy critical)", "BF16 / FP8 / FP16 (throughput > precision)"],
            ["Programming model", "MPI (Message Passing Interface)", "NCCL + PyTorch/JAX distributed"],
            ["Job scheduling", "Fair-share across many users", "Large single jobs, maximize GPU util."],
            ["Hardware focus", "CPUs + GPUs balanced", "GPU-dominant (60-70% of spend)"],
            ["Workload", "Diverse: CFD, molecular dynamics, climate", "Primarily: transformer model training"],
            ["Memory requirements", "High precision = more memory per FP", "HBM for high bandwidth, not just capacity"],
            ["Key metric", "FLOPS (FP64)", "FLOPS (BF16/FP8) + MFU (Model FLOP Utilization)"],
          ]}
        />
        <p style={S.p}>
          HPC clusters frequently use Lustre (same as AI), InfiniBand (same as AI), GPU nodes (same as AI). Lekin software stack aur workload characteristics fundamentally different hain. HPC background wale engineers AI infrastructure mein transition kar sakte hain relatively easily — lekin ML framework ecosystem (PyTorch, NCCL, distributed training) alag world hai.
        </p>
      </section>

      {/* ─── ECOSYSTEM ──────────────────────────────────────────────────── */}
      <section id="ecosystem">
        <h2 style={S.h2}>AI Infrastructure Ecosystem</h2>
        <p style={S.p}>
          AI infrastructure ek ecosystem hai, kisi ek vendor ka product nahi. Complete picture:
        </p>
        <ComparisonTable
          title="AI Infrastructure Ecosystem — Complete Vendor Map"
          headers={["Layer", "Category", "Key Players"]}
          rows={[
            ["Compute", "GPU Compute", "NVIDIA (dominant), AMD, Intel Gaudi"],
            ["Compute", "Custom AI Chips", "Google TPU v5, AWS Trainium/Inferentia, Microsoft Maia"],
            ["Networking", "InfiniBand", "NVIDIA/Mellanox (HDR 200G, NDR 400G)"],
            ["Networking", "High-Speed Ethernet", "Arista, Cisco, Juniper, NVIDIA Spectrum"],
            ["Servers", "AI Server OEMs", "NVIDIA DGX, Supermicro, Dell PowerEdge, HPE, Lenovo"],
            ["Storage", "Parallel File Systems", "DDN, IBM Spectrum Scale, Weka, VAST Data, Hammerspace"],
            ["Cooling", "DLC", "Vertiv, Schneider, CoolIT, Stulz"],
            ["Cooling", "Immersion", "GreenRevolution Cooling, Submer, LiquidStack"],
            ["Cloud", "AI-Optimized Cloud", "AWS (P5), Azure (NDv5), GCP (A3), Oracle, CoreWeave, Lambda Labs"],
            ["Software", "AI Frameworks", "PyTorch (dominant), TensorFlow, JAX"],
            ["Software", "Distributed Training", "DeepSpeed (Microsoft), Megatron-LM (NVIDIA), NCCL"],
            ["Software", "Inference Serving", "vLLM, NVIDIA Triton, TorchServe, TensorRT-LLM"],
            ["Software", "MLOps", "Weights & Biases, MLflow, DVC, Determined AI"],
          ]}
        />
      </section>

      {/* ─── GPU DEEP DIVE ──────────────────────────────────────────────── */}
      <section id="gpu-deep-dive">
        <h2 style={S.h2}>GPU Infrastructure — Deep Dive</h2>
        <p style={S.p}>
          GPU — Graphics Processing Unit — originally game graphics ke liye design hua tha. Rendering millions of pixels ke liye same math karo — inherently parallel. Researchers ne realize kiya ki neural network math (matrix multiplication) bhi isi pattern follow karta hai.
        </p>
        <p style={S.p}>
          Modern AI GPUs traditional gaming GPUs se significant ways mein differ karte hain:
        </p>
        <ul style={S.ul}>
          <li><strong>ECC Memory:</strong> Error-Correcting Code memory. Training runs hafte chalte hain — ek memory bit flip bina detection ke model silently corrupt kar sakti hai. ECC single-bit errors detect aur correct karta hai.</li>
          <li><strong>HBM (High Bandwidth Memory):</strong> Gaming GPUs mein GDDR6. AI GPUs mein HBM2e ya HBM3 — memory chips GPU die ke bahut paas stack ki jaati hain. H100 SXM5 mein HBM3 bandwidth 3.35 TB/s — GDDR6X se 5-6x higher.</li>
          <li><strong>Tensor Cores:</strong> NVIDIA V100 se introduce hue. Dedicated hardware units jo matrix multiply-accumulate operations karte hain at extreme speed. H100 mein 4th generation Transformer Engine — FP8, FP16, BF16, TF32 sab.</li>
          <li><strong>High Memory Capacity:</strong> H100: 80GB HBM3. AMD MI300X: 192GB HBM3. Bada model = zyada GPU memory. GPT-3 (175B parameters) ko FP16 mein roughly 350GB memory chahiye — minimum 5 H100 GPUs sirf model hold karne ke liye.</li>
          <li><strong>NVLink / NVSwitch:</strong> GPU-to-GPU interconnect NVIDIA ka. 8 H100 GPUs ek DGX/HGX system mein NVSwitch se connected hain. Each GPU 900 GB/s bidirectional bandwidth pata hai.</li>
          <li><strong>Form Factors:</strong> PCIe (plugs into standard slot, flexible) vs SXM (mezzanine board, maximum NVLink bandwidth). Training clusters use SXM exclusively.</li>
        </ul>

        <Figure caption="GPU Cluster Architecture: Two HGX H100 servers with NVSwitch fabric, InfiniBand inter-node, and parallel storage">
          <GpuClusterDiagram />
        </Figure>

        <section id="blackwell-nvl72">
          <h3 style={S.h3}>Blackwell, GB200, and NVL72</h3>
          <p style={S.p}>
            NVIDIA Blackwell (2024-25) next generation hai Hopper (H100) ke baad.
          </p>
          <ComparisonTable
            headers={["GPU", "Architecture", "BF16 Peak", "Memory", "Key Feature"]}
            rows={[
              ["H100 SXM5", "Hopper", "~2 PFLOPS", "80GB HBM3", "Current generation standard"],
              ["B100", "Blackwell", "~3.5 PFLOPS", "192GB HBM3e", "Drop-in H100 replacement"],
              ["B200", "Blackwell", "~4.5 PFLOPS", "192GB HBM3e", "Maximum single-GPU performance"],
              ["GB200", "Grace Blackwell", "~4.5 PFLOPS + Grace CPU", "192GB HBM3e + 480GB LPDDR5X", "Unified CPU+GPU module"],
              ["GB200 NVL72", "Grace Blackwell Rack", "~130 PFLOPS aggregate", "36×192GB = 6.9TB", "72 GPUs as one system"],
            ]}
          />
          <p style={S.p}>
            NVL72 mein 36 GB200 modules hain (72 Blackwell GPUs + 36 Grace CPUs) jo NVLink 5.0 se interconnect hote hain. Intra-system GPU-to-GPU bandwidth: 1.8 TB/s — essentially ek massive single computer.
          </p>
        </section>

        <section id="nvlink-nvswitch">
          <h3 style={S.h3}>NVLink and NVSwitch</h3>
          <p style={S.p}>
            NVLink NVIDIA ka proprietary GPU-to-GPU high-bandwidth interconnect hai.
          </p>
          <ul style={S.ul}>
            <li><strong>NVLink 4.0 (H100):</strong> 900 GB/s bidirectional per GPU</li>
            <li><strong>NVLink 5.0 (B200/NVL72):</strong> 1.8 TB/s per GPU</li>
            <li><strong>PCIe 5.0 comparison:</strong> ~64 GB/s — NVLink 14x faster</li>
          </ul>
          <p style={S.p}>
            NVSwitch dedicated switching chip hai jo all-to-all GPU connectivity enable karta hai ek server ke andar. 3 NVSwitch chips per HGX H100 — any GPU to any other GPU at 900 GB/s.
          </p>
          <p style={S.p}>
            Practical impact: tensor parallelism (model layers across GPUs split karna) efficiently ek node ke andar possible hai NVLink se. PCIe-based systems mein bandwidth bottleneck creates training slowdown.
          </p>
        </section>

        <section id="pcie-cxl">
          <h3 style={S.h3}>PCIe, CXL, and Memory Pooling</h3>
          <p style={S.p}>
            PCIe 5.0: 64 GB/s bandwidth per slot, host-to-GPU communication ke liye. Standard interface for GPU cards not using NVLink.
          </p>
          <p style={S.p}>
            CXL (Compute Express Link): open interconnect standard based on PCIe 5.0. AI Infrastructure ke liye future relevance:
          </p>
          <ul style={S.ul}>
            <li>Memory pooling: multiple GPUs ek shared memory pool access kar sakte hain</li>
            <li>Memory capacity expansion: GPU HBM ke bahar additional fast memory</li>
            <li>CXL 3.0 fabric: multiple hosts and devices sharing one memory pool</li>
          </ul>
          <p style={S.p}>
            CXL abhi emerging hai production AI clusters mein. Longer term yeh GPU memory constraints address kar sakta hai — especially jab models grow karte hain single-GPU HBM capacity se zyada.
          </p>
        </section>

        <section id="dpus-smartnics">
          <h3 style={S.h3}>DPUs and SmartNICs</h3>
          <p style={S.p}>
            DPU (Data Processing Unit) — NVIDIA BlueField — ek programmable network processor hai. AI Infrastructure mein specific functions CPU se DPU pe offload karta hai:
          </p>
          <ul style={S.ul}>
            <li>Storage offload: NVMe-over-Fabric operations DPU pe, CPU free for AI computation</li>
            <li>Network security: encryption/decryption offload without CPU overhead</li>
            <li>Telemetry: network monitoring without consuming CPU cycles</li>
            <li>Tenant isolation: multi-tenant AI clusters mein per-tenant network isolation</li>
          </ul>
          <p style={S.p}>
            Production AI clusters mein jab hundreds of servers hote hain, CPU cycles precious hote hain. DPU CPU ko sirf AI compute pe focus karne deta hai.
          </p>
        </section>
      </section>

      {/* ─── NETWORKING ─────────────────────────────────────────────────── */}
      <section id="networking">
        <h2 style={S.h2}>AI Networking</h2>
        <p style={S.p}>
          Networking AI infrastructure mein often misunderstood ya underinvested hoti hai — aur phir training performance suffer karti hai.
        </p>
        <p style={S.p}>
          <strong>Why is networking so critical?</strong> Neural network training distributed fashion mein hoti hai. Each GPU computes gradients for its portion of the training batch. Phir all GPUs ko apne gradients share karne hote hain — this is called <strong>all-reduce</strong>.
        </p>
        <p style={S.p}>
          Training step time = compute time + communication time. Agar networking slow hai, GPUs sit idle waiting for gradient synchronization. Yeh "communication-bound" training hai — GPU utilization falls, training becomes expensive.
        </p>

        <section id="infiniband-vs-ethernet">
          <h3 style={S.h3}>InfiniBand vs Ethernet for AI</h3>
          <ComparisonTable
            headers={["Factor", "InfiniBand NDR (400G)", "RoCE (Ethernet 400G)"]}
            rows={[
              ["Latency", "< 1 microsecond", "1-5 microseconds"],
              ["RDMA support", "Native, hardware-level", "Yes (with configuration)"],
              ["Configuration complexity", "Lower", "Higher (PFC, ECN tuning required)"],
              ["NCCL optimization", "Native, highly optimized", "Good but requires tuning"],
              ["Cost per port (400G)", "Higher", "Lower"],
              ["At 100+ node scale", "Preferred for training", "Viable with careful design"],
              ["Used by", "Most large AI training clusters", "Meta, some hyperscalers (custom)"],
              ["Best for", "Maximum training throughput", "Cost-sensitive or inference"],
            ]}
          />
          <p style={S.p}>
            Network topology: non-blocking fat-tree (every GPU to every GPU at full bandwidth) is the gold standard for AI training. Any oversubscription means all-reduce slows down — directly hurting training throughput.
          </p>
        </section>
      </section>

      {/* ─── STORAGE ────────────────────────────────────────────────────── */}
      <section id="storage">
        <h2 style={S.h2}>AI Storage Architecture</h2>
        <p style={S.p}>
          Storage bottleneck ek common, expensive mistake hai AI infrastructure mein. Training stalls kyunki DataLoader GPUs ko fast enough feed nahi kar pata.
        </p>
        <ComparisonTable
          title="AI Storage Hierarchy"
          headers={["Layer", "Technology", "Bandwidth", "Capacity", "Use Case"]}
          rows={[
            ["L1: GPU HBM", "HBM3 (on-GPU)", "3.35 TB/s per GPU", "80GB per H100", "Active model weights, activations"],
            ["L2: CPU DRAM", "DDR5 (server RAM)", "~500 GB/s aggregate", "2-4 TB per server", "Dataset caching, preprocessing"],
            ["L3: Local NVMe", "U.2 / M.2 NVMe", "10-20 GB/s per drive", "4-32 TB per server", "Hot data cache, checkpoint temp"],
            ["L4: Parallel FS", "Lustre/Weka/VAST", "100s GB/s to TB/s", "Petabytes", "Training data lake, all checkpoints"],
            ["L5: Object Store", "S3-compatible", "Gigabytes/s", "Unlimited", "Archive, model artifacts, cold data"],
          ]}
        />
        <p style={S.p}>
          Training data pipeline: Object Store → Parallel File System → Local NVMe Cache → CPU DRAM → GPU HBM. Efficient training means keeping GPU HBM fed continuously without starvation at any layer.
        </p>
        <Callout type="important" title="Storage Throughput Rule of Thumb">
          Storage throughput should sustain: number of GPUs × per-GPU HBM bandwidth × data loading fraction. For 256 H100s at a modest 5% loading fraction: 256 × 3.35 TB/s × 0.05 = ~43 GB/s minimum sustained read throughput. Most parallel FS deployments target 100-300+ GB/s for a 256-GPU cluster to have headroom.
        </Callout>
        <ul style={S.ul}>
          <li><strong>Lustre:</strong> Open-source, widely used in HPC aur AI. DDN, Whamcloud.</li>
          <li><strong>Weka.io:</strong> Modern all-flash parallel FS, multi-protocol (POSIX + S3 + NFS). Growing AI adoption.</li>
          <li><strong>VAST Data:</strong> Disaggregated NVMe-based all-flash. High performance, good scalability.</li>
          <li><strong>IBM Spectrum Scale (GPFS):</strong> Enterprise, major research labs. Policy-based tiering.</li>
          <li><strong>DDN AI400X2:</strong> Purpose-built AI training storage systems.</li>
        </ul>
      </section>

      {/* ─── POWER INFRASTRUCTURE ───────────────────────────────────────── */}
      <section id="power-infra">
        <h2 style={S.h2}>Power Infrastructure</h2>
        <p style={S.p}>
          Yeh section DC engineers ke liye especially important hai. Power density challenge AI infrastructure ka sabse tangible impact hai existing facilities pe.
        </p>
        <ComparisonTable
          title="AI Infrastructure Power Planning"
          headers={["Parameter", "Traditional IT DC", "AI Infrastructure DC"]}
          rows={[
            ["Average rack density", "5-15 kW", "40-100+ kW"],
            ["Single GPU server power", "200-400W", "10,000-11,000W (8× H100)"],
            ["Servers per rack", "20-40U worth", "4-5 HGX servers (practical limit)"],
            ["UPS sizing approach", "kW range per row", "Multi-MW per cluster"],
            ["Power delivery", "Standard PDU (16A/32A)", "High-density PDU (63A+), busbar"],
            ["3-phase balance priority", "Standard", "Critical — per-phase monitoring mandatory"],
            ["Generator sizing", "UPS bridge support", "Full cluster load + growth headroom"],
            ["Power monitoring", "Per-rack PDU level", "Per-server, per-GPU (DCGM integration)"],
          ]}
        />
        <p style={S.p}>
          Ek 1,000 H100 server cluster at 10kW average per server = 10,000 kW = 10 MW. Utility feed, transformer, UPS, bus-bar, PDUs — sab kuch MW scale pe design karna padta hai.
        </p>
        <Callout type="warning" title="Existing DC Retrofit Warning">
          Existing DC mein AI GPU servers add karne se pehle: (1) LT panel headroom check karo — nameplate vs actual current draw. (2) PDU ampere rating verify karo per rack. (3) Phase balancing check karo — unbalanced loading neutral current create karta hai. (4) Cooling capacity assessment mandatory. 10kW per server without liquid cooling = hot spots immediately.
        </Callout>
      </section>

      {/* ─── COOLING ────────────────────────────────────────────────────── */}
      <section id="cooling">
        <h2 style={S.h2}>Cooling Architecture</h2>
        <p style={S.p}>
          AI infrastructure cooling sabse challenging aur interesting engineering problem hai. Traditional air cooling kaafi nahi hai high-density AI racks ke liye — physics ki limit hai.
        </p>
        <p style={S.p}>
          Air has low thermal mass. 100kW rack heat remove karne ke liye massive airflow volume chahiye — noise, pressure management, HVAC oversizing. Above approximately 30-40 kW/rack, air cooling inefficient aur often impractical ho jaata hai.
        </p>
        <ComparisonTable
          title="Cooling Methods Comparison for AI Infrastructure"
          headers={["Method", "Max Rack Density", "Complexity", "Water in Row?", "PUE Impact", "Suitable For"]}
          rows={[
            ["Air (CRAC/CRAH)", "~30-40 kW", "Low", "No", "1.5-1.8", "Traditional DC, small AI setups"],
            ["Rear-Door HEX (RDHx)", "~40-60 kW", "Medium", "Yes (rear)", "1.4-1.6", "Mid-density GPU deployments"],
            ["Direct Liquid Cooling (DLC)", "80-130+ kW", "High", "Yes (to server)", "1.2-1.4", "Standard for H100/B200 clusters"],
            ["Single-Phase Immersion", "100-200+ kW", "Very High", "Yes (dielectric)", "1.1-1.3", "Ultra-high density, specialized"],
            ["Two-Phase Immersion", "200+ kW", "Highest", "Yes (dielectric)", "1.05-1.15", "Extreme density R&D environments"],
          ]}
        />
        <p style={S.p}>
          NVIDIA HGX H100 servers DLC ke liye designed hain. Server mein rear manifold ya chassis-integrated plumbing hai. Cold plates GPUs, CPUs, memory pe. Coolant absorbs heat, CDU (Coolant Distribution Unit) pe jaata hai, facility chilled water loop mein transfer hota hai.
        </p>
        <Callout type="best-practice" title="Liquid Cooling Decision for Existing DC">
          Retrofit approach: CDU ek row ya zone ke liye install karo. Chilled water manifold run karo racks ke beech. Cold plates existing servers pe install karo (OEM must support). Leak detection cable mandatory throughout. Phased approach: start with highest-density AI rows, expand as needed.
        </Callout>
      </section>

      {/* ─── RACK DESIGN ────────────────────────────────────────────────── */}
      <section id="rack-design">
        <h2 style={S.h2}>AI Rack Design</h2>
        <p style={S.p}>
          AI racks physically alag dikhte hain standard IT racks se. Key considerations:
        </p>
        <ul style={S.ul}>
          <li><strong>Server density:</strong> HGX H100 server = 8U. 42U rack mein 4-5 servers maximum (leaving room for networking). 40-44 kW per rack at 4 servers.</li>
          <li><strong>Cable management:</strong> InfiniBand cables significantly thicker aur less flexible hain CAT6 ya SFP+ se. 256-GPU cluster mein 2,048 IB cables hote hain. Routing plan mandatory before rack deployment.</li>
          <li><strong>Weight:</strong> Full 8-GPU server with drives: 70-80+ kg per 8U chassis. 4 servers = 320 kg of servers alone. Plus networking hardware. Floor loading must be verified — 600-1200 kg/m² AI racks ke liye.</li>
          <li><strong>Liquid coolant manifolds:</strong> DLC-equipped racks mein water inlet/outlet manifolds integrated hote hain. Leak detection cable throughout rack — mandatory.</li>
          <li><strong>Hot-swap accessibility:</strong> Training runs long hote hain. Hardware failures during training happen. Rack design aise karo ki adjacent servers disrupt kiye bina access ho.</li>
        </ul>
      </section>

      {/* ─── SOFTWARE STACK ─────────────────────────────────────────────── */}
      <section id="software-stack">
        <h2 style={S.h2}>Software Stack</h2>
        <p style={S.p}>
          Hardware ke bina kuch nahi hota, lekin software ke bina hardware waste hai. AI infrastructure software stack layered hai:
        </p>
        <ComparisonTable
          title="Parallelism Strategies for Distributed Training"
          headers={["Strategy", "What's Split", "When to Use", "Communication"]}
          rows={[
            ["Data Parallelism (DDP)", "Training data across GPUs", "Model fits in one GPU", "All-reduce gradients (NCCL)"],
            ["Tensor Parallelism", "Model layers horizontally", "Model too large for one GPU", "All-reduce, all-gather"],
            ["Pipeline Parallelism", "Model layers vertically", "Very deep models", "Point-to-point activations"],
            ["FSDP (ZeRO)", "Params + grads + optimizer", "Memory constraints", "All-gather + reduce-scatter"],
            ["3D Parallelism", "All three combined", "GPT-3 scale and beyond", "All patterns combined"],
          ]}
        />
        <p style={S.p}>
          <strong>Key tools:</strong> PyTorch (dominant framework), NCCL (GPU collective communications), DeepSpeed (Microsoft — ZeRO optimization), Megatron-LM (NVIDIA — 3D parallelism), vLLM (inference serving), DCGM (GPU monitoring), Slurm ya Kubernetes (job scheduling).
        </p>
        <Callout type="important" title="Version Pinning is Critical">
          CUDA version, driver version, PyTorch version, NCCL version — sab pin karo. A mid-training framework upgrade computation results change kar sakta hai aur reproducibility break kar sakta hai. Infrastructure-as-code (Ansible, Terraform) se cluster configuration manage karo.
        </Callout>
      </section>

      {/* ─── TRAINING WORKFLOW ──────────────────────────────────────────── */}
      <section id="training-workflow">
        <h2 style={S.h2}>AI Training Workflow</h2>
        <p style={S.p}>
          Infrastructure engineer ko training workflow samajhna chahiye — yahi woh hai jo hardware ki demanding use kar raha hai.
        </p>
        <ol style={{ ...S.ul, listStyleType: "decimal" }}>
          <li><strong>Data Preparation:</strong> Raw data → tokenize, normalize, augment → write to training format (WebDataset, Parquet, TFRECORDS) → store in parallel file system.</li>
          <li><strong>Cluster Launch:</strong> Slurm ya Kubernetes se GPU resources allocate. All GPU processes start. NCCL initializes. Master broadcasts initial model parameters to all GPUs.</li>
          <li><strong>Training Loop:</strong> DataLoader reads batch from storage → CPU memory → GPU memory → forward pass (compute loss) → backward pass (compute gradients) → all-reduce via NCCL (gradient aggregation) → optimizer step (update weights) → repeat millions of times.</li>
          <li><strong>Checkpointing:</strong> Every N steps, model state saved to storage. H100 HBM → local NVMe (async) → parallel FS (background). 70B BF16 model = ~140GB checkpoint. Async checkpointing critical for minimizing training pause.</li>
          <li><strong>Evaluation:</strong> Periodic validation on held-out data. Track loss, perplexity, benchmarks. Weights & Biases ya MLflow for experiment tracking.</li>
          <li><strong>Model Export:</strong> Final model → HuggingFace safetensors format → model registry → inference serving pipeline.</li>
        </ol>
      </section>

      {/* ─── INFERENCE ──────────────────────────────────────────────────── */}
      <section id="inference">
        <h2 style={S.h2}>AI Inference Infrastructure</h2>
        <p style={S.p}>
          Training is resource-intensive but happens once. Inference runs continuously, at scale, serving real users.
        </p>
        <ComparisonTable
          headers={["Factor", "Training Infrastructure", "Inference Infrastructure"]}
          rows={[
            ["Batch size", "512-4096 (maximize throughput)", "1-32 (latency constraints)"],
            ["GPU utilization target", "80-95%+", "60-80%"],
            ["Job duration", "Days to weeks", "Indefinite (always running)"],
            ["Latency requirement", "None (batch job)", "< 500ms interactive"],
            ["Scaling model", "Fixed cluster size", "Auto-scale with traffic"],
            ["GPU choice", "H100 (maximum throughput)", "A10G, L4, L40S (cost-efficient), H100 (large models)"],
            ["Storage requirement", "TB/s training data access", "Model weights only (read once, cache)"],
            ["Key optimization", "MFU, distributed throughput", "Latency per token, tokens per second per GPU"],
          ]}
        />
        <p style={S.p}>
          <strong>Continuous batching (vLLM):</strong> New requests join an ongoing inference batch as soon as a slot is available. Dramatically increases GPU utilization vs naive one-request-at-a-time approach.
        </p>
        <p style={S.p}>
          <strong>Quantization:</strong> BF16 training model → INT8 inference (2x memory reduction) → INT4 (4x reduction). Llama 70B: at BF16 needs 140GB (multiple H100s). At INT4: 35GB (fits one H100). Quality tradeoff minimal for most use cases.
        </p>
      </section>

      {/* ─── AI FACTORY ─────────────────────────────────────────────────── */}
      <section id="ai-factory">
        <h2 style={S.h2}>AI Factory, AI Pod, AI Supercomputer</h2>
        <p style={S.p}>
          NVIDIA ne "AI Factory" concept introduce kiya — integrated collection of AI clusters, networking, storage, aur software as a unified production system.
        </p>
        <ul style={S.ul}>
          <li><strong>AI Pod:</strong> Standard building block. Typically 32-64 HGX H100 servers (256-512 GPUs), non-blocking InfiniBand switch fabric, dedicated storage nodes. A pod is the minimum production AI training unit.</li>
          <li><strong>AI Supercomputer:</strong> Multiple AI Pods connected via spine-level InfiniBand switching. NVIDIA DGX SuperPOD: standardized design reference. 1,024 H100s minimum for a "supercomputer" designation.</li>
          <li><strong>AI Factory:</strong> Multiple supercomputers with shared infrastructure — shared parallel storage, unified job scheduling, MLOps platform. OpenAI's training infrastructure is an "AI Factory" at this scale.</li>
        </ul>
        <p style={S.p}>
          Enterprise reality: most organizations start with a single AI Pod (or smaller). A single 32-server (256 GPU) cluster is adequate for significant enterprise AI work — fine-tuning 70B models, training smaller custom models, running inference for internal applications.
        </p>
      </section>

      {/* ─── DC ARCHITECTURE ────────────────────────────────────────────── */}
      <section id="dc-architecture">
        <h2 style={S.h2}>AI Data Center Architecture</h2>
        <p style={S.p}>
          Scale categories aur corresponding architecture decisions:
        </p>
        <ComparisonTable
          headers={["Scale", "GPU Count", "Rack Count", "Architecture Implications"]}
          rows={[
            ["Small", "16-64 GPUs", "2-8 racks", "Single IB switch, standard DC, may need power upgrade"],
            ["Medium", "256-1024 GPUs", "32-128 racks", "IB leaf-spine, dedicated liquid cooling infrastructure, storage cluster"],
            ["Large", "1000-10,000 GPUs", "100s of racks", "Multiple IB fabrics, dedicated building or wing, MW-scale power"],
            ["Hyperscale", "50,000+ GPUs", "Purpose-built campus", "Multiple buildings, custom switching, GW-scale utility planning"],
          ]}
        />

        <section id="dc-power-cooling-ops">
          <h3 style={S.h3}>DC Operations — Power, Cooling, Fire, BMS</h3>
          <p style={S.p}>
            Traditional DC operations knowledge directly applicable — with modifications for AI density:
          </p>
          <ul style={S.ul}>
            <li><strong>UPS/DG/ATS:</strong> Same principles, MW scale. Generator fuel storage extended (training jobs can't pause). Battery runtime tested quarterly — AI load draws maximum current.</li>
            <li><strong>Cooling:</strong> CDU commissioning, chilled water manifold leak detection, DLC system performance monitoring (supply/return temperature, flow rate). COP tracking via BMS.</li>
            <li><strong>Fire suppression:</strong> FM200/Novec for server halls — same. Liquid cooling infrastructure adds water leak detection requirement. VESDA still critical in high-density areas.</li>
            <li><strong>BMS/DCIM:</strong> Standard DC metrics PLUS GPU-level metrics (DCGM integration). Per-rack power monitoring mandatory at AI density. GPU utilization, NVLink bandwidth — these become operational metrics, not just engineering metrics.</li>
          </ul>
        </section>

        <section id="retrofit">
          <h3 style={S.h3}>Retrofitting Existing Data Centers for AI</h3>
          <p style={S.p}>
            Most organizations add AI capacity to existing DC rather than greenfield build. Key retrofit checklist:
          </p>
          <ul style={S.ul}>
            <li>Power: LT panel headroom check (nameplate allocated vs actual draw). If &lt; 20% headroom, capacity addition required before GPU deployment.</li>
            <li>Cooling: CDU installation per AI rack row. Chilled water manifolds to racks. Phase selection: start DLC with highest-density rows first.</li>
            <li>Floor loading: AI rack with 4 HGX H100 servers = 400+ kg. Structural engineer assessment if existing floor was designed for standard 800 kg/m².</li>
            <li>PDU upgrade: 63A 3-phase circuits replace standard 32A circuits for AI rows.</li>
            <li>Network separation: dedicated OOB management network, dedicated IB training fabric — never co-mingle with existing production LAN.</li>
          </ul>
        </section>
      </section>

      {/* ─── OPERATIONS ─────────────────────────────────────────────────── */}
      <section id="operations">
        <h2 style={S.h2}>Operations and Maintenance</h2>
        <ul style={S.ul}>
          <li><strong>Daily GPU health:</strong> <code style={S.code}>dcgmi dmon -e 1001</code> or <code style={S.code}>nvidia-smi dmon</code>. GPU utilization, temperature, power draw, NVLink error counts.</li>
          <li><strong>ECC error monitoring:</strong> Increasing correctable ECC errors = DIMM degrading. Uncorrectable ECC = immediate training abort + GPU replacement.</li>
          <li><strong>NCCL bandwidth test:</strong> Run nccl-tests all-reduce bandwidth test weekly. Degraded result = network fabric issue before it causes training hang.</li>
          <li><strong>Firmware management:</strong> CUDA driver version pinned per cluster. NVLink firmware updates require maintenance window. No mid-training firmware updates.</li>
          <li><strong>Capacity tracking:</strong> GPU utilization per cluster. Average Job Wait Time (training queue depth). Storage throughput per training run vs capacity.</li>
          <li><strong>Hardware refresh cycle:</strong> GPU clusters: 3-5 years. NVIDIA releases new architecture every 1-2 years — plan refresh cycles accordingly.</li>
        </ul>
      </section>

      {/* ─── SUSTAINABILITY ──────────────────────────────────────────────── */}
      <section id="sustainability">
        <h2 style={S.h2}>Sustainability — PUE, WUE, CUE</h2>
        <ComparisonTable
          headers={["Metric", "Formula", "AI DC Target", "Traditional DC Average"]}
          rows={[
            ["PUE (Power Usage Effectiveness)", "Total Facility Power / IT Power", "1.2-1.4 with liquid cooling", "1.58 (Uptime Institute 2023)"],
            ["WUE (Water Usage Effectiveness)", "Annual Water Usage / IT Energy (L/kWh)", "0.3-0.8 for efficient systems", "1.8 L/kWh (US average)"],
            ["CUE (Carbon Usage Effectiveness)", "Total CO2 Emissions / IT Energy (kg CO2/kWh)", "Depends on grid carbon intensity", "Varies by grid mix"],
          ]}
        />
        <p style={S.p}>
          AI training energy consumption significantly growing. Microsoft FY2024 carbon emissions increased ~30% partly due to AI infrastructure buildout. Sustainability approaches:
        </p>
        <ul style={S.ul}>
          <li>Renewable energy Power Purchase Agreements (PPAs) — long-term contracts for renewable electricity</li>
          <li>Nuclear power contracts — Microsoft-Constellation Three Mile Island deal (2024)</li>
          <li>Liquid cooling for lower PUE (1.2 vs 1.6 air cooled = 25% energy saving)</li>
          <li>Waste heat reuse — 40-50°C liquid cooling output can heat buildings in cold climates</li>
          <li>AI workload scheduling during low-carbon grid hours (time-shifting training runs)</li>
        </ul>
      </section>

      {/* ─── ENTERPRISE DEPLOYMENT ──────────────────────────────────────── */}
      <section id="enterprise-deployment">
        <h2 style={S.h2}>Enterprise Deployment</h2>
        <p style={S.p}>
          Enterprise organizations typically don't build OpenAI-scale clusters. Starting point aur growth path:
        </p>
        <ul style={S.ul}>
          <li><strong>4-GPU server (H100 NVL4 ya 4× A100):</strong> Rs. 1-2 crore range. Fits standard rack. 20-25kW. Air-cooled. 4-7B parameter fine-tuning, inference serving.</li>
          <li><strong>8-GPU server (HGX H100):</strong> Rs. 2-4 crore. 10-11kW. May need liquid cooling. Full 70B fine-tuning, medium model training.</li>
          <li><strong>Multi-node (2-4 servers + IB):</strong> Add InfiniBand switch. Multi-node training unlocked. Larger model training possible.</li>
          <li><strong>AI Pod (32+ servers):</strong> Dedicated infrastructure. Full-scale training cluster. Parallel storage needed.</li>
        </ul>
        <p style={S.p}>
          Key enterprise considerations: security (training data isolation, network segmentation), MLOps tooling from day 1, compliance (data handling requirements affect where you train), integration with existing IT systems.
        </p>
      </section>

      {/* ─── PRODUCTION EXAMPLE ─────────────────────────────────────────── */}
      <section id="production-example">
        <h2 style={S.h2}>Production Example — 256-GPU Cluster</h2>
        <ComparisonTable
          title="256-GPU AI Training Cluster Specification"
          headers={["Layer", "Specification", "Notes"]}
          rows={[
            ["Compute", "32× HGX H100 servers (8× H100 SXM5 80GB each)", "2× Intel Xeon 8480+ CPUs, 2TB DDR5, 4× 3.84TB NVMe per server"],
            ["GPU total", "256× H100 GPUs, 256 × 80GB = 20TB aggregate GPU memory", "NVLink 4.0 intra-node, IB NDR inter-node"],
            ["Networking", "8× ConnectX-7 NICs per server (1 per GPU)", "4× NDR leaf switches, 2× spine switches — non-blocking"],
            ["Storage", "4× Weka storage nodes (4.8PB usable, ~300 GB/s aggregate)", "Plus S3-compatible object storage for cold data"],
            ["Power", "~10kW per server × 32 = 320kW compute", "Storage + networking + overhead = ~400-450kW total IT load"],
            ["Cooling", "Direct Liquid Cooling, CDU per rack row", "Chiller water plant N+1, chilled water loop to CDUs"],
            ["Rack layout", "4 HGX servers per rack, 8 compute racks", "Plus 2 networking racks, 1 storage rack"],
            ["UPS sizing", "N+1 at 600kW rating", "1MW utility feed with headroom for cooling"],
            ["Software", "Ubuntu 22.04, CUDA 12.2, NVIDIA drivers pinned", "Slurm + PyTorch + DeepSpeed + W&B + Prometheus + DCGM"],
          ]}
        />
        <p style={S.p}>
          Yeh cluster kya kar sakta hai: 70B parameter model fine-tune karna 2-3 days mein. 7-13B parameter model train karna from scratch 2-4 weeks mein. Multiple concurrent inference workloads serve karna production pe.
        </p>
      </section>

      {/* ─── CASE STUDIES ───────────────────────────────────────────────── */}
      <section id="case-studies">
        <h2 style={S.h2}>Case Studies</h2>
        <ComparisonTable
          title="Hyperscale AI Infrastructure Deployments"
          headers={["Organization", "Scale", "Key Infrastructure Detail"]}
          rows={[
            ["OpenAI / Microsoft", "10,000+ H100s for GPT-4", "Azure partnership, custom networking fabric, multi-datacenter training"],
            ["Meta", "350,000+ H100s (announced)", "Custom RDMA-capable Ethernet (not InfiniBand), Llama open-source release"],
            ["Google", "Custom TPU v4/v5 pods", "Own TPU ASICs, custom Jupiter networking fabric, proprietary everywhere"],
            ["xAI (Elon Musk)", "100,000 GPU Colossus (Memphis)", "Built in 122 days — fastest large-scale AI cluster deployment"],
            ["CoreWeave", "GPU-first cloud", "Largest non-hyperscale GPU cloud, bare-metal H100 at competitive pricing"],
            ["Microsoft Azure", "$13B+ in AI infrastructure", "Custom Maia 100 AI chip, massive H100 fleet, global AI DC rollout"],
          ]}
        />
      </section>

      {/* ─── ADVANTAGES ─────────────────────────────────────────────────── */}
      <section id="advantages">
        <h2 style={S.h2}>Advantages of Dedicated AI Infrastructure</h2>
        <ul style={S.ul}>
          <li><strong>Performance:</strong> Bare-metal GPU access, no virtualization overhead, optimized networking fabric — maximum MFU</li>
          <li><strong>Cost efficiency at scale:</strong> At sustained 12+ month usage, owned hardware often beats cloud TCO significantly</li>
          <li><strong>Customization:</strong> Control every layer — kernel, CUDA version, networking config, cooling design</li>
          <li><strong>Data sovereignty:</strong> Sensitive training data stays in your physical infrastructure</li>
          <li><strong>Predictable performance:</strong> No noisy neighbor effects, consistent training throughput</li>
          <li><strong>Hardware lifecycle:</strong> 3-5 year lifecycle, not subject to cloud pricing changes</li>
          <li><strong>Regulatory compliance:</strong> Data residency requirements met without cloud region limitations</li>
        </ul>
      </section>

      {/* ─── LIMITATIONS ────────────────────────────────────────────────── */}
      <section id="limitations">
        <h2 style={S.h2}>Limitations and Challenges</h2>
        <ul style={S.ul}>
          <li><strong>High upfront CAPEX:</strong> 1,000-GPU H100 cluster = $50-100M+ in hardware alone. Not accessible to most.</li>
          <li><strong>Expertise scarcity:</strong> GPU cluster administration, InfiniBand tuning, NCCL debugging — skills are rare and expensive.</li>
          <li><strong>Hardware obsolescence:</strong> NVIDIA releases new architecture every 1-2 years. H100 today, Blackwell next year.</li>
          <li><strong>Power and cooling constraints:</strong> Existing DCs often cannot support AI density without major retrofit.</li>
          <li><strong>Long procurement lead times:</strong> GPU delivery at peak demand: 6-12+ months. Planning becomes extremely difficult.</li>
          <li><strong>Software complexity:</strong> Distributed training debugging is genuinely hard. NCCL hangs, gradient explosion, memory fragmentation — deep expertise needed.</li>
        </ul>
      </section>

      {/* ─── BEST PRACTICES ─────────────────────────────────────────────── */}
      <section id="best-practices">
        <h2 style={S.h2}>Best Practices</h2>
        <ul style={S.ul}>
          <li><strong>Networking first:</strong> Design IB fabric before buying GPUs. Under-provisioned network = expensive GPUs idle waiting for gradient sync.</li>
          <li><strong>Monitor at GPU level:</strong> DCGM exposes per-GPU temperature, power, utilization, memory bandwidth, NVLink errors. Integrate into Prometheus + Grafana.</li>
          <li><strong>Checkpoint frequently but asynchronously:</strong> 6-hour checkpoint gap = 6 hours of compute at risk. Async checkpoint to NVMe, background copy to parallel FS.</li>
          <li><strong>Test NCCL bandwidth before training:</strong> <code style={S.code}>nccl-tests all-reduce bandwidth</code> between all nodes before starting any training run.</li>
          <li><strong>Plan for failures:</strong> 1,000-GPU cluster mein GPU failures happen. Training frameworks with automatic checkpoint restart configured — production requirement, not optional.</li>
          <li><strong>Separate training and inference:</strong> Different GPU choices, different scheduling, different networking requirements. Mixing creates complexity and performance issues.</li>
          <li><strong>Version pin everything:</strong> CUDA, driver, PyTorch, NCCL — pin and document. Infrastructure-as-code for cluster configuration.</li>
        </ul>
      </section>

      {/* ─── COMMON MISTAKES ────────────────────────────────────────────── */}
      <section id="common-mistakes">
        <h2 style={S.h2}>Common Mistakes</h2>
        <ul style={S.ul}>
          <li><strong>Buying GPUs before networking design:</strong> Then networking becomes bottleneck. Design full stack first.</li>
          <li><strong>Insufficient storage throughput:</strong> GPU starvation during training. Benchmark storage throughput before training starts.</li>
          <li><strong>Underestimating power and cooling:</strong> Most common enterprise mistake. 10kW per server catches people off-guard.</li>
          <li><strong>No GPU-level observability:</strong> DCGM minimum. Silent performance degradation invisible without per-GPU metrics.</li>
          <li><strong>Shared file system without proper striping:</strong> All GPUs hit single storage node for data. Proper Lustre/Weka striping across all nodes essential.</li>
          <li><strong>iDRAC/BMC on production network:</strong> Compromise training network = compromise management. Always separate OOB management.</li>
          <li><strong>No async checkpointing:</strong> Synchronous checkpointing blocks training. Even 2-minute checkpoint = significant training throughput loss over a week-long run.</li>
        </ul>
      </section>

      {/* ─── SECURITY ───────────────────────────────────────────────────── */}
      <section id="security">
        <h2 style={S.h2}>Security Considerations</h2>
        <ul style={S.ul}>
          <li><strong>Training data protection:</strong> ACLs on parallel storage. Only authorized training jobs access sensitive data. Audit logs on all storage access.</li>
          <li><strong>Model weight protection:</strong> Trained models are valuable IP. Encryption at rest, strict access controls on model registry.</li>
          <li><strong>GPU management network:</strong> BMC/IPMI completely isolated from training fabric and internet. Strong authentication, rotate credentials, audit all BMC access.</li>
          <li><strong>Supply chain:</strong> GPU firmware, BMC firmware — verify integrity before deployment. NVIDIA provides signed firmware.</li>
          <li><strong>Network segmentation:</strong> Training fabric no internet access. Management network separate. Inference network separate. Air-gap training data from internet.</li>
          <li><strong>Multi-tenant isolation:</strong> Kubernetes namespaces + network policies, or Slurm with strict cgroup isolation for shared clusters.</li>
        </ul>
      </section>

      {/* ─── PERFORMANCE OPTIMIZATION ───────────────────────────────────── */}
      <section id="performance-opt">
        <h2 style={S.h2}>Performance Optimization</h2>
        <p style={S.p}>
          <strong>MFU (Model FLOP Utilization)</strong> — primary training efficiency metric.
        </p>
        <p style={S.p}>
          MFU = achieved FLOPS / theoretical peak FLOPS. 40-60% is good. Below 30% = significant optimization opportunity.
        </p>
        <ul style={S.ul}>
          <li><strong>Mixed precision training (BF16):</strong> Default for all training on H100. Significantly faster than FP32 with minimal quality loss.</li>
          <li><strong>Flash Attention 2/3:</strong> Alternative attention implementation that avoids materializing full attention matrix in HBM. Dramatically reduces memory and increases throughput for transformers. Always use.</li>
          <li><strong>Gradient accumulation:</strong> Run N mini-batches before updating. Reduces all-reduce frequency. Useful when communication is bottleneck.</li>
          <li><strong>Data loading optimization:</strong> Multiple DataLoader workers, prefetch into RAM, local NVMe cache for hot data, efficient formats (WebDataset for streaming).</li>
          <li><strong>Profiling tools:</strong> PyTorch Profiler, NVIDIA Nsight Systems. Identify compute vs memory vs communication time per training step.</li>
        </ul>
      </section>

      {/* ─── SCALABILITY ────────────────────────────────────────────────── */}
      <section id="scalability">
        <h2 style={S.h2}>Scalability and Capacity Planning</h2>
        <p style={S.p}>
          Training FLOPS rough calculation:
        </p>
        <p style={S.p}>
          <code style={S.code}>Training FLOPS ≈ 6 × N_parameters × N_tokens</code>
        </p>
        <p style={S.p}>
          Example: 70B parameter model, 1T token dataset = 6 × 70×10⁹ × 10¹² = 4.2×10²³ FLOPS. H100 at 50% MFU: ~990 TFLOPS effective. On 256 H100s: ~4.2×10²³ / (256 × 9.9×10¹⁴) ≈ 19 days.
        </p>
        <p style={S.p}>
          <strong>Scaling laws (Kaplan et al. 2020):</strong> Model performance scales predictably with compute × data × parameters. More GPUs + more data + more parameters = reliably better models. Infrastructure scale directly translates to model capability — making AI infrastructure a strategic competitive advantage.
        </p>
        <p style={S.p}>
          <strong>Inference autoscaling:</strong> Kubernetes HPA (Horizontal Pod Autoscaler) based on GPU utilization or request queue depth. Scale down during low traffic (especially on cloud) to save cost.
        </p>
      </section>

      {/* ─── FUTURE TRENDS ──────────────────────────────────────────────── */}
      <section id="future-trends">
        <h2 style={S.h2}>Future Trends</h2>
        <ul style={S.ul}>
          <li><strong>Blackwell B200/GB200 NVL72:</strong> ~2x training throughput per GPU vs H100. Rack-scale integration. NVLink 5.0. Now shipping.</li>
          <li><strong>AI-specific silicon competition:</strong> Google TPU v5, AMD MI350X, Intel Gaudi 3, AWS Trainium 2, Microsoft Maia 100 — serious alternatives emerging.</li>
          <li><strong>Optical networking:</strong> Co-packaged optics, 1600G per port becoming feasible. Removes copper distance/power limitations.</li>
          <li><strong>Liquid cooling as default:</strong> By 2026, liquid cooling will be the default assumption for new AI infrastructure deployments globally.</li>
          <li><strong>Nuclear power:</strong> Microsoft (Three Mile Island), Amazon (Talen Energy) — dedicated nuclear contracts for always-on low-carbon AI power.</li>
          <li><strong>Edge AI inference:</strong> Compressed models (INT4, INT2) running on-device — NVIDIA Jetson, Apple Neural Engine, Qualcomm. Reduces cloud dependency for inference.</li>
          <li><strong>Wafer-scale integration:</strong> Cerebras Wafer-Scale Engine — single-chip entire cluster. Niche but extreme bandwidth, low latency.</li>
        </ul>
      </section>

      {/* ─── COMPARISON TABLES ──────────────────────────────────────────── */}
      <section id="comparison-tables">
        <h2 style={S.h2}>Comparison Tables</h2>
        <ComparisonTable
          title="GPU vs CPU for AI"
          headers={["Aspect", "CPU", "GPU"]}
          rows={[
            ["Core count", "8-128 powerful cores", "10,000-16,896 specialized cores"],
            ["Single-thread performance", "High", "Low per core"],
            ["Parallel throughput", "Limited", "Extreme"],
            ["Matrix multiply speed", "Baseline", "60-80x faster"],
            ["Memory bandwidth", "100-400 GB/s", "3.35 TB/s (H100 HBM3)"],
            ["Power", "120-350W", "700W per GPU"],
            ["Best for", "Diverse sequential workloads", "Parallel math (AI training)"],
          ]}
        />
        <ComparisonTable
          title="Training vs Inference Infrastructure"
          headers={["Factor", "Training", "Inference"]}
          rows={[
            ["Duration", "Days to weeks", "Indefinite (always on)"],
            ["Batch size", "512-4096", "1-32"],
            ["GPU utilization target", "80-95%+", "60-80%"],
            ["Latency requirement", "None (batch job)", "<500ms (interactive)"],
            ["Scale", "Few large clusters", "Many instances, auto-scale"],
            ["GPU preference", "H100 SXM (max throughput)", "A10G/L4 (cost-efficient), H100 (large models)"],
            ["Storage need", "TB/s parallel FS", "Read-once model weights"],
            ["Key metric", "MFU, throughput/$ ", "Tokens/second/GPU, P99 latency"],
          ]}
        />
        <ComparisonTable
          title="Air vs Liquid Cooling"
          headers={["Method", "Max Density", "Cost", "Complexity", "PUE"]}
          rows={[
            ["Air (CRAC/CRAH)", "~40 kW/rack", "Low", "Low", "1.5-1.8"],
            ["Rear-door HEX", "~60 kW/rack", "Medium", "Medium", "1.4-1.6"],
            ["DLC (Direct Liquid)", "130+ kW/rack", "High", "High", "1.2-1.4"],
            ["Immersion (single-phase)", "200+ kW/rack", "Very High", "Very High", "1.1-1.3"],
          ]}
        />
      </section>

      {/* ─── VENDOR LANDSCAPE ───────────────────────────────────────────── */}
      <section id="vendor-landscape">
        <h2 style={S.h2}>Vendor Landscape</h2>
        <ComparisonTable
          headers={["Category", "Key Vendors", "Notes"]}
          rows={[
            ["GPU Compute", "NVIDIA (dominant), AMD, Intel Gaudi", "NVIDIA ~80%+ AI training market share"],
            ["AI Accelerators", "Google TPU, AWS Trainium, MS Maia, Cerebras", "Alternative to NVIDIA for specific use cases"],
            ["InfiniBand", "NVIDIA/Mellanox (HDR 200G, NDR 400G)", "Near-monopoly on AI training networking"],
            ["High-Speed Ethernet", "Arista, Cisco, Juniper, NVIDIA Spectrum-4", "Alternative to IB for some deployments"],
            ["AI Servers", "NVIDIA DGX, Supermicro, Dell, HPE, Lenovo", "All use same NVIDIA GPUs, differ in build quality"],
            ["Parallel Storage", "DDN, IBM GPFS, Weka, VAST Data, Hammerspace", "Weka and VAST growing fastest in AI"],
            ["DLC Cooling", "Vertiv, Schneider, CoolIT, Stulz, ZutaCore", "Most server OEMs now have CDU partnerships"],
            ["Immersion Cooling", "GreenRevolution, Submer, LiquidStack, Wiwynn", "Niche but growing for extreme density"],
            ["AI Cloud", "AWS, Azure, GCP, Oracle, CoreWeave, Lambda", "CoreWeave/Lambda better economics for AI vs hyperscalers"],
            ["MLOps", "Weights & Biases, MLflow, DVC, Determined AI", "W&B most popular for experiment tracking"],
            ["Inference Serving", "NVIDIA Triton, vLLM (open), TGI", "vLLM dominant open-source LLM serving"],
          ]}
        />
      </section>

      {/* ─── INTERVIEW QUESTIONS ────────────────────────────────────────── */}
      <section id="interview-questions">
        <h2 style={S.h2}>Interview Questions</h2>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>
            Q: GPU aur CPU mein AI workloads ke perspective se kya fundamental difference hai?
          </p>
          <p style={S.p}>
            CPU: few powerful general-purpose cores, high single-thread performance, low parallelism. GPU: thousands of simpler cores, massive parallelism, SIMD architecture. AI training ka core operation hai matrix multiplication — inherently parallel. H100 mein 16,896 CUDA cores aur dedicated Tensor Cores matrix ops ke liye. GPU 60-80x faster hai matrix multiplication mein vs top-end CPU. Training ek GPU pe nahi hoti — hazaron simultaneously. Parallelism hi GPU ko AI ka primary compute resource banata hai.
          </p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>
            Q: InfiniBand kyun use karte hain AI training clusters mein Ethernet ki jagah?
          </p>
          <p style={S.p}>
            All-reduce operation (gradient synchronization) distributed training mein har step pe hota hai. Latency directly training speed affect karta hai. InfiniBand: sub-microsecond latency, native RDMA (kernel bypass), hardware-level flow control. NCCL InfiniBand ke liye natively optimized. Large clusters (100+ nodes) mein InfiniBand training throughput 20-30% improve karta hai vs Ethernet. RoCE (RDMA over Ethernet) viable hai with proper PFC/ECN configuration but needs more tuning.
          </p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>
            Q: Training aur inference infrastructure requirements mein kya fark hai?
          </p>
          <p style={S.p}>
            Training: weeks-long jobs, batch size 512-4096, maximize GPU throughput, parallel storage for training data, few large dedicated clusters, checkpointing required. Inference: real-time (&lt;500ms), batch size 1-32, autoscaling with traffic, always-on service, model weights read once (cache in GPU memory). GPU choice differs: H100 for training, A10G/L4 more cost-effective for inference. Separate infrastructure preferred — sharing creates scheduling conflicts.
          </p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>
            Q: NVLink kya hai aur kyun important hai?
          </p>
          <p style={S.p}>
            NVLink NVIDIA ka proprietary GPU-to-GPU interconnect hai. H100 mein NVLink 4.0 = 900 GB/s bidirectional per GPU — PCIe 5.0 (64 GB/s) se 14x faster. NVSwitch dedicated chip hai jo 8 GPUs ko all-to-all connect karta hai at full 900 GB/s bandwidth. Tensor parallelism (model layers across GPUs) efficiently NVLink bandwidth requires — PCIe-based systems mein significantly slower. 8 H100s ek node mein NVLink se effectively ek giant GPU jaise behave karte hain.
          </p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>
            Q: AI infrastructure ke liye power density challenge explain karo.
          </p>
          <p style={S.p}>
            Traditional server: 200-400W. NVIDIA HGX H100 (8 GPUs): ~10-11kW per 2U chassis. 4 servers per rack = 40-44 kW. Traditional DC designed for 5-15 kW/rack — AI rack = 3-7x more power. This breaks: PDU ampere ratings (need 63A+ vs standard 32A), cooling systems (air cooling limit ~40 kW/rack, liquid cooling mandatory above that), floor loading (400+ kg per AI rack), and UPS/generator sizing (MW-scale for AI clusters). Every layer of DC design must be reconsidered.
          </p>
        </div>
      </section>

      {/* ─── TROUBLESHOOTING ────────────────────────────────────────────── */}
      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting Guide</h2>
        <ComparisonTable
          title="Common AI Infrastructure Issues and Resolution"
          headers={["Problem", "Likely Cause", "Diagnosis", "Resolution"]}
          rows={[
            [
              "Low GPU utilization (<50%)",
              "Data loading bottleneck, NCCL issue, or storage throughput",
              "dcgmi dmon -e 1001; profile DataLoader time; nccl-tests bandwidth",
              "Add DataLoader workers, prefetch to NVMe, fix storage striping, check IB fabric",
            ],
            [
              "NCCL timeout / training hang",
              "Network issue, one node failed, or deadlock in collective",
              "NCCL_DEBUG=INFO; ibping tests; check system logs for GPU failure",
              "Check IB connectivity, verify all nodes healthy, check firewall (NCCL uses random high ports)",
            ],
            [
              "High GPU temperature (>80°C)",
              "Cooling issue: liquid flow rate low, CDU fault, or air pocket",
              "DCGM temperature reading; CDU panel: inlet/outlet temp, flow rate",
              "Verify CDU flow, check coolant level, check for air in liquid loop, verify cold plate contact",
            ],
            [
              "Checkpoint writing slows training",
              "Synchronous checkpoint blocking training; storage throughput",
              "Profile checkpoint vs training step ratio; storage throughput test",
              "Implement async checkpointing to NVMe first, background copy to parallel FS",
            ],
            [
              "InfiniBand link errors / packet loss",
              "Cable, transceiver, or switch issue",
              "ibstat; show port errors on IB switch; ibping latency test",
              "Replace cable/transceiver; check switch port; verify BIOS settings (PCIe slot power)",
            ],
          ]}
        />
        <Callout type="best-practice" title="Proactive Monitoring Checklist">
          Daily: GPU utilization per GPU (DCGM), temperature alerts (&gt;80°C), ECC correctable error count (rising trend = GPU failing). Weekly: NCCL all-reduce bandwidth test between all nodes. Monthly: storage throughput benchmark, IB cable BERT test for high-error links.
        </Callout>
      </section>

      {/* ─── GLOSSARY ───────────────────────────────────────────────────── */}
      <section id="glossary">
        <h2 style={S.h2}>Glossary</h2>
        <ComparisonTable
          headers={["Term", "Full Form", "Meaning"]}
          rows={[
            ["ASIC", "Application-Specific Integrated Circuit", "Custom chip for specific workload (e.g., TPU for matrix math)"],
            ["BF16", "Brain Float 16", "16-bit float with wide dynamic range. Standard for AI training on modern hardware"],
            ["CUDA", "Compute Unified Device Architecture", "NVIDIA's GPU programming platform. Foundation of AI compute ecosystem"],
            ["DGX", "Data Center GPU", "NVIDIA's purpose-built AI server product line (DGX H100 = 8× H100 server)"],
            ["DLC", "Direct Liquid Cooling", "Cold plates directly on GPU/CPU components for high-density heat removal"],
            ["DPU", "Data Processing Unit", "NVIDIA BlueField — offloads networking/storage/security from CPU"],
            ["FSDP", "Fully Sharded Data Parallel", "PyTorch distributed training sharding parameters+gradients+optimizer across GPUs"],
            ["FP8", "8-bit floating point", "Supported on H100. 2x more ops vs FP16. Used for inference and training"],
            ["HBM", "High Bandwidth Memory", "3D-stacked memory on GPU. HBM3 in H100: 3.35 TB/s bandwidth per GPU"],
            ["HGX", "Hopper GPU Exchange", "NVIDIA's server board specification for 8× H100 SXM with NVSwitch"],
            ["InfiniBand", "InfiniBand", "High-speed networking: sub-microsecond latency, native RDMA, 200-400Gbps per port"],
            ["KV Cache", "Key-Value Cache", "LLM inference attention cache. Memory-intensive for long context windows"],
            ["MFU", "Model FLOP Utilization", "Actual FLOPS / theoretical peak FLOPS. 40-60% is good training efficiency"],
            ["NCCL", "NVIDIA Collective Communications Library", "GPU-optimized all-reduce, broadcast, etc. for distributed training"],
            ["NVL72", "NVLink 72", "NVIDIA GB200 rack-scale system: 72 Blackwell GPUs + 36 Grace CPUs unified"],
            ["NVLink", "NVLink", "NVIDIA GPU-to-GPU interconnect: 900 GB/s (H100), 1.8 TB/s (B200)"],
            ["NVSwitch", "NVSwitch", "NVIDIA's switching chip enabling all-to-all GPU connectivity at NVLink speed"],
            ["PagedAttention", "PagedAttention", "vLLM's KV cache memory management — virtual memory concepts for LLM inference"],
            ["RDMA", "Remote Direct Memory Access", "Network read/write to another machine's memory without CPU. Low latency"],
            ["SXM", "Server PCI Express Module", "NVIDIA's high-density GPU form factor with maximum NVLink bandwidth"],
            ["Tensor Core", "Tensor Core", "Dedicated NVIDIA hardware for matrix multiply-accumulate ops — key to AI performance"],
            ["TPU", "Tensor Processing Unit", "Google's custom AI accelerator ASIC. Available via Google Cloud"],
            ["vLLM", "vLLM", "Open-source LLM inference server. PagedAttention, continuous batching. De facto standard"],
            ["WUE", "Water Usage Effectiveness", "Cooling water consumption per kWh IT load — AI DC sustainability metric"],
            ["ZeRO", "Zero Redundancy Optimizer", "Microsoft DeepSpeed memory optimization — shards optimizer/gradient/params across GPUs"],
          ]}
        />
      </section>

      {/* ─── KEY TAKEAWAYS ──────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li>AI Infrastructure traditional IT ka extension nahi hai — yeh ek distinct engineering discipline hai apni unique requirements, failure modes, aur design principles ke saath.</li>
          <li>GPU is the primary compute resource, but alone insufficient. Networking, storage, power, cooling — sabka co-design zaroori hai. Ek weak link pooraa training throughput destroy karta hai.</li>
          <li>Power density AI infrastructure ka sabse critical constraint hai for most organizations. 40-100+ kW per rack ke liye completely different power distribution aur liquid cooling design chahiye.</li>
          <li>Networking fabric cost often GPU cost ke barabar ya zyada hoti hai large clusters mein. Non-blocking InfiniBand investment hai, overhead nahi. All-reduce performance directly training efficiency determine karta hai.</li>
          <li>Software stack complexity real aur underestimated hai. NCCL tuning, distributed training debugging, storage configuration — each layer requires specialized expertise.</li>
          <li>Observability optional nahi hai. GPU utilization, temperature, NVLink bandwidth, NCCL throughput — monitor everything with DCGM + Prometheus + Grafana. Silent degradation AI training mein common hai.</li>
          <li>Scaling laws make infrastructure a strategic competitive advantage. More compute = reliably better models. AI infrastructure investment is a business decision, not just IT.</li>
          <li>Cloud is right starting point for most. Build expertise, understand workloads, then evaluate on-prem vs cloud at 1-3 year TCO analysis.</li>
          <li>Liquid cooling ab default hai new AI infrastructure deployments ke liye. Plan for it, or be constrained by it.</li>
          <li>DC engineers jo AI infrastructure mein transition karna chahte hain: power density aur cooling expertise directly relevant hai. Add GPU cluster management, InfiniBand, aur basic ML workflow knowledge — aur you're positioned for one of the most high-demand engineering roles of this decade.</li>
        </ul>
      </section>

    </article>
  );
}
