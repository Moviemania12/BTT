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
          AI Infrastructure is the entire physical and software ecosystem needed to run artificial intelligence workloads — training, inference, and data processing. It's fundamentally different from traditional IT infrastructure.
        </p>
        <p style={S.p}>
          There, general-purpose CPUs run diverse workloads. Here, specialized GPUs or AI accelerators, ultra-low latency networking, high-throughput storage, and massive power density work together for a single purpose: mathematical computation at extreme scale.
        </p>
        <Callout type="important" title="If You Are a DC Engineer">
          AI infrastructure isn't just a topic for AI engineers. Power density of 40-100+ kW per rack means DC design, UPS sizing, cooling architecture, and power distribution all need to be completely rethought. If you run infrastructure, this article is for you.
        </Callout>
      </section>

      {/* ─── WHO SHOULD READ ────────────────────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>Data Center Engineers:</strong> To understand power density, cooling design, UPS sizing, and liquid cooling architecture.</li>
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
          <li>What AI Infrastructure is and how it differs from traditional IT</li>
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
          <li>The vendor landscape and future trends</li>
        </ul>
      </section>

      {/* ─── LEARNING PATH ──────────────────────────────────────────────── */}
      <section id="learning-path">
        <h2 style={S.h2}>Learning Path</h2>
        <p style={S.p}>
          This article is the foundation article for the AI Infrastructure track. After this, topic-specific deep dives:
        </p>
        <ul style={S.ul}>
          <li>Previous: <TopicLink slug="what-is-ai" variant="inline" /> — AI basics</li>
          <li>Current: What is AI Infrastructure (this article)</li>
          <li>Next: <TopicLink slug="ai-gpu" variant="inline" /> — GPU deep dive</li>
          <li>Related: <TopicLink slug="gpu-cluster" variant="inline" />, <TopicLink slug="ai-cooling" variant="inline" />, <TopicLink slug="ai-data-center-basics" variant="inline" /></li>
        </ul>
      </section>

      {/* ─── WHAT IS AI INFRASTRUCTURE ──────────────────────────────────── */}
      <section id="what-is-ai-infra">
        <h2 style={S.h2}>What is AI Infrastructure?</h2>
        <p style={S.p}>
          AI Infrastructure is the purpose-built technology stack designed for the creation (training), deployment (inference), and continuous improvement (fine-tuning and retraining) of machine learning models.
        </p>
        <p style={S.p}>
          There are three layers to it:
        </p>
        <ul style={S.ul}>
          <li><strong>Compute Layer:</strong> GPU clusters or AI accelerators (NVIDIA H100, A100, AMD MI300X, Google TPU, etc.). This is where the actual mathematical work happens.</li>
          <li><strong>Data and Storage Layer:</strong> High-throughput storage systems that can deliver training data to the GPUs fast enough. This is frequently a bottleneck too.</li>
          <li><strong>Networking Layer:</strong> The fabric that connects GPUs to each other and to storage. InfiniBand or high-speed Ethernet. Latency matters here in microseconds.</li>
        </ul>
        <p style={S.p}>
          Above all this runs a software stack: AI frameworks (PyTorch, TensorFlow, JAX), orchestration systems (Kubernetes, Slurm), model serving platforms (Triton, vLLM), and observability tools.
        </p>
        <Figure caption="AI Infrastructure — Complete Stack from Physical to Application Layer">
          <AiInfraStackDiagram />
        </Figure>
      </section>

      {/* ─── WHY IT EXISTS ──────────────────────────────────────────────── */}
      <section id="why-it-exists">
        <h2 style={S.h2}>Why AI Infrastructure Exists</h2>
        <p style={S.p}>
          A question worth asking: we already have servers, cloud, data centers. Isn't that enough?
        </p>
        <p style={S.p}>
          No, it isn't. And it's important to understand why.
        </p>
        <p style={S.p}>
          A general-purpose server has a CPU — versatile, but suboptimal for neural network training. Modern CPUs have 64 or 128 cores. They handle diverse workloads: database queries, web requests, video encoding.
        </p>
        <p style={S.p}>
          The operation that happens in neural network training is <strong>matrix multiplication</strong> — one type of computation, at a very large scale, inherently parallel. An NVIDIA H100 GPU has 16,896 CUDA cores. A single H100 is 60-80x faster than a modern high-end CPU specifically for matrix multiplication.
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
          And training doesn't happen on a single GPU — thousands of GPUs work simultaneously on a single model. This density and specialization demands something different from traditional infrastructure design:
        </p>
        <ul style={S.ul}>
          <li>Power per rack goes from 5-15kW to 40-100+ kW — cooling needs a completely different approach</li>
          <li>NVLink (900 GB/s) vs PCIe (64 GB/s) for GPU-to-GPU bandwidth</li>
          <li>400G InfiniBand vs 25G Ethernet for inter-node bandwidth</li>
          <li>Parallel file systems (TB/s throughput) vs standard NAS for training data</li>
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
          Each generation has dramatically changed infrastructure requirements. From AlexNet's 2 GPUs to today's 100,000+ GPU clusters — at every step, power, cooling, networking, and storage requirements created a new design category.
        </p>
      </section>

      {/* ─── TRADITIONAL VS AI ──────────────────────────────────────────── */}
      <section id="traditional-vs-ai">
        <h2 style={S.h2}>Traditional IT vs AI Infrastructure</h2>
        <p style={S.p}>
          This comparison is important to understand. An engineer moving from traditional DC operations to AI infrastructure should expect almost every assumption to be challenged.
        </p>
        <Figure caption="Traditional IT vs AI Infrastructure — Every dimension is different">
          <TraditionalVsAiDiagram />
        </Figure>
        <Callout type="warning" title="The Most Critical Difference: Power Density">
          Traditional server: 200-400W. NVIDIA HGX H100 server (8 GPUs): 10,000-11,000W. 4 servers per rack = 40-44 kW per rack. The traditional DC design assumption (5-15 kW/rack) completely breaks down. Cooling, PDU, UPS, floor loading — everything needs to be reconsidered.
        </Callout>
      </section>

      {/* ─── CLOUD VS AI ────────────────────────────────────────────────── */}
      <section id="cloud-vs-ai">
        <h2 style={S.h2}>Cloud vs AI Infrastructure</h2>
        <p style={S.p}>
          "Can we run AI on the cloud?" — yes, absolutely. "Does the cloud replace dedicated AI infrastructure?" — depends on the workload and scale.
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
          Cloud-first for organizations starting out. Evaluate on-prem when: (1) sustained GPU utilization is &gt;70% for 12+ months, (2) there are data sovereignty requirements, (3) cloud spend approaches $2-5M/year on GPU instances. CoreWeave and Lambda Labs often offer better AI pricing than hyperscalers for GPU-dedicated cloud.
        </Callout>
      </section>

      {/* ─── HPC VS AI ──────────────────────────────────────────────────── */}
      <section id="hpc-vs-ai">
        <h2 style={S.h2}>HPC vs AI Infrastructure</h2>
        <p style={S.p}>
          AI infrastructure shares a lot with HPC (High Performance Computing) — but they aren't identical. These differences matter in practice.
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
          HPC clusters frequently use Lustre (same as AI), InfiniBand (same as AI), GPU nodes (same as AI). But the software stack and workload characteristics are fundamentally different. Engineers with an HPC background can transition into AI infrastructure relatively easily — but the ML framework ecosystem (PyTorch, NCCL, distributed training) is a different world.
        </p>
      </section>

      {/* ─── ECOSYSTEM ──────────────────────────────────────────────────── */}
      <section id="ecosystem">
        <h2 style={S.h2}>AI Infrastructure Ecosystem</h2>
        <p style={S.p}>
          AI infrastructure is an ecosystem, not one vendor's product. The complete picture:
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
          GPU — Graphics Processing Unit — was originally designed for game graphics. Rendering millions of pixels means doing the same math repeatedly — inherently parallel. Researchers realized that neural network math (matrix multiplication) follows the same pattern.
        </p>
        <p style={S.p}>
          Modern AI GPUs differ from traditional gaming GPUs in significant ways:
        </p>
        <ul style={S.ul}>
          <li><strong>ECC Memory:</strong> Error-Correcting Code memory. Training runs go on for weeks — a single memory bit flip can silently corrupt a model without detection. ECC detects and corrects single-bit errors.</li>
          <li><strong>HBM (High Bandwidth Memory):</strong> Gaming GPUs use GDDR6. AI GPUs use HBM2e or HBM3 — memory chips stacked very close to the GPU die. The H100 SXM5 has HBM3 bandwidth of 3.35 TB/s — 5-6x higher than GDDR6X.</li>
          <li><strong>Tensor Cores:</strong> Introduced with the NVIDIA V100. Dedicated hardware units that perform matrix multiply-accumulate operations at extreme speed. H100 has the 4th generation Transformer Engine — FP8, FP16, BF16, TF32, all of it.</li>
          <li><strong>High Memory Capacity:</strong> H100: 80GB HBM3. AMD MI300X: 192GB HBM3. Bigger model = more GPU memory. GPT-3 (175B parameters) needs roughly 350GB of memory in FP16 — a minimum of 5 H100 GPUs just to hold the model.</li>
          <li><strong>NVLink / NVSwitch:</strong> NVIDIA's GPU-to-GPU interconnect. 8 H100 GPUs in a DGX/HGX system are connected via NVSwitch. Each GPU gets 900 GB/s of bidirectional bandwidth.</li>
          <li><strong>Form Factors:</strong> PCIe (plugs into standard slot, flexible) vs SXM (mezzanine board, maximum NVLink bandwidth). Training clusters use SXM exclusively.</li>
        </ul>

        <Figure caption="GPU Cluster Architecture: Two HGX H100 servers with NVSwitch fabric, InfiniBand inter-node, and parallel storage">
          <GpuClusterDiagram />
        </Figure>

        <section id="blackwell-nvl72">
          <h3 style={S.h3}>Blackwell, GB200, and NVL72</h3>
          <p style={S.p}>
            NVIDIA Blackwell (2024-25) is the next generation after Hopper (H100).
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
            The NVL72 has 36 GB200 modules (72 Blackwell GPUs + 36 Grace CPUs) interconnected via NVLink 5.0. Intra-system GPU-to-GPU bandwidth: 1.8 TB/s — essentially one massive single computer.
          </p>
        </section>

        <section id="nvlink-nvswitch">
          <h3 style={S.h3}>NVLink and NVSwitch</h3>
          <p style={S.p}>
            NVLink is NVIDIA's proprietary high-bandwidth GPU-to-GPU interconnect.
          </p>
          <ul style={S.ul}>
            <li><strong>NVLink 4.0 (H100):</strong> 900 GB/s bidirectional per GPU</li>
            <li><strong>NVLink 5.0 (B200/NVL72):</strong> 1.8 TB/s per GPU</li>
            <li><strong>PCIe 5.0 comparison:</strong> ~64 GB/s — NVLink 14x faster</li>
          </ul>
          <p style={S.p}>
            NVSwitch is a dedicated switching chip that enables all-to-all GPU connectivity within a server. 3 NVSwitch chips per HGX H100 — any GPU to any other GPU at 900 GB/s.
          </p>
          <p style={S.p}>
            Practical impact: tensor parallelism (splitting model layers across GPUs) is efficiently possible within a single node thanks to NVLink. In PCIe-based systems, bandwidth bottlenecks create training slowdown.
          </p>
        </section>

        <section id="pcie-cxl">
          <h3 style={S.h3}>PCIe, CXL, and Memory Pooling</h3>
          <p style={S.p}>
            PCIe 5.0: 64 GB/s bandwidth per slot, for host-to-GPU communication. The standard interface for GPU cards not using NVLink.
          </p>
          <p style={S.p}>
            CXL (Compute Express Link): an open interconnect standard based on PCIe 5.0. Future relevance for AI Infrastructure:
          </p>
          <ul style={S.ul}>
            <li>Memory pooling: multiple GPUs can access a shared memory pool</li>
            <li>Memory capacity expansion: additional fast memory beyond GPU HBM</li>
            <li>CXL 3.0 fabric: multiple hosts and devices sharing one memory pool</li>
          </ul>
          <p style={S.p}>
            CXL is still emerging in production AI clusters. Longer term, it could address GPU memory constraints — especially as models grow beyond single-GPU HBM capacity.
          </p>
        </section>

        <section id="dpus-smartnics">
          <h3 style={S.h3}>DPUs and SmartNICs</h3>
          <p style={S.p}>
            DPU (Data Processing Unit) — NVIDIA BlueField — is a programmable network processor. In AI Infrastructure, it offloads specific functions from the CPU to the DPU:
          </p>
          <ul style={S.ul}>
            <li>Storage offload: NVMe-over-Fabric operations on the DPU, freeing the CPU for AI computation</li>
            <li>Network security: encryption/decryption offload without CPU overhead</li>
            <li>Telemetry: network monitoring without consuming CPU cycles</li>
            <li>Tenant isolation: per-tenant network isolation in multi-tenant AI clusters</li>
          </ul>
          <p style={S.p}>
            In production AI clusters with hundreds of servers, CPU cycles are precious. DPU lets the CPU focus purely on AI compute.
          </p>
        </section>
      </section>

      {/* ─── NETWORKING ─────────────────────────────────────────────────── */}
      <section id="networking">
        <h2 style={S.h2}>AI Networking</h2>
        <p style={S.p}>
          Networking in AI infrastructure is often misunderstood or underinvested — and then training performance suffers.
        </p>
        <p style={S.p}>
          <strong>Why is networking so critical?</strong> Neural network training happens in a distributed fashion. Each GPU computes gradients for its portion of the training batch. Then all GPUs need to share their gradients — this is called <strong>all-reduce</strong>.
        </p>
        <p style={S.p}>
          Training step time = compute time + communication time. If networking is slow, GPUs sit idle waiting for gradient synchronization. This is "communication-bound" training — GPU utilization falls, training becomes expensive.
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
          A storage bottleneck is a common, expensive mistake in AI infrastructure. Training stalls because the DataLoader can't feed the GPUs fast enough.
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
          <li><strong>Lustre:</strong> Open-source, widely used in HPC and AI. DDN, Whamcloud.</li>
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
          This section is especially important for DC engineers. The power density challenge is AI infrastructure's most tangible impact on existing facilities.
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
          A 1,000 H100 server cluster at 10kW average per server = 10,000 kW = 10 MW. Utility feed, transformer, UPS, bus-bar, PDUs — everything needs to be designed at MW scale.
        </p>
        <Callout type="warning" title="Existing DC Retrofit Warning">
          Before adding AI GPU servers to an existing DC: (1) Check LT panel headroom — nameplate vs actual current draw. (2) Verify PDU ampere rating per rack. (3) Check phase balancing — unbalanced loading creates neutral current. (4) A cooling capacity assessment is mandatory. 10kW per server without liquid cooling means hot spots immediately.
        </Callout>
      </section>

      {/* ─── COOLING ────────────────────────────────────────────────────── */}
      <section id="cooling">
        <h2 style={S.h2}>Cooling Architecture</h2>
        <p style={S.p}>
          AI infrastructure cooling is the most challenging and interesting engineering problem here. Traditional air cooling isn't enough for high-density AI racks — it's a physics limit.
        </p>
        <p style={S.p}>
          Air has low thermal mass. Removing 100kW of rack heat needs a massive airflow volume — noise, pressure management, HVAC oversizing. Above roughly 30-40 kW/rack, air cooling becomes inefficient and often impractical.
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
          NVIDIA HGX H100 servers are designed for DLC. The server has a rear manifold or chassis-integrated plumbing. Cold plates sit on the GPUs, CPUs, memory. Coolant absorbs heat, goes to the CDU (Coolant Distribution Unit), and transfers into the facility chilled water loop.
        </p>
        <Callout type="best-practice" title="Liquid Cooling Decision for Existing DC">
          Retrofit approach: install a CDU for a row or zone. Run a chilled water manifold between racks. Install cold plates on existing servers (OEM must support this). Leak detection cable is mandatory throughout. Phased approach: start with the highest-density AI rows, expand as needed.
        </Callout>
      </section>

      {/* ─── RACK DESIGN ────────────────────────────────────────────────── */}
      <section id="rack-design">
        <h2 style={S.h2}>AI Rack Design</h2>
        <p style={S.p}>
          AI racks physically look different from standard IT racks. Key considerations:
        </p>
        <ul style={S.ul}>
          <li><strong>Server density:</strong> HGX H100 server = 8U. A 42U rack fits a maximum of 4-5 servers (leaving room for networking). 40-44 kW per rack at 4 servers.</li>
          <li><strong>Cable management:</strong> InfiniBand cables are significantly thicker and less flexible than CAT6 or SFP+. A 256-GPU cluster has 2,048 IB cables. A routing plan is mandatory before rack deployment.</li>
          <li><strong>Weight:</strong> A full 8-GPU server with drives: 70-80+ kg per 8U chassis. 4 servers = 320 kg of servers alone. Plus networking hardware. Floor loading must be verified — 600-1200 kg/m² for AI racks.</li>
          <li><strong>Liquid coolant manifolds:</strong> DLC-equipped racks have integrated water inlet/outlet manifolds. Leak detection cable throughout the rack — mandatory.</li>
          <li><strong>Hot-swap accessibility:</strong> Training runs go on for a long time. Hardware failures happen during training. Design the rack so servers can be accessed without disrupting adjacent ones.</li>
        </ul>
      </section>

      {/* ─── SOFTWARE STACK ─────────────────────────────────────────────── */}
      <section id="software-stack">
        <h2 style={S.h2}>Software Stack</h2>
        <p style={S.p}>
          Without hardware nothing works, but without software the hardware is wasted. The AI infrastructure software stack is layered:
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
          <strong>Key tools:</strong> PyTorch (the dominant framework), NCCL (GPU collective communications), DeepSpeed (Microsoft — ZeRO optimization), Megatron-LM (NVIDIA — 3D parallelism), vLLM (inference serving), DCGM (GPU monitoring), Slurm or Kubernetes (job scheduling).
        </p>
        <Callout type="important" title="Version Pinning is Critical">
          Pin the CUDA version, driver version, PyTorch version, NCCL version — all of it. A mid-training framework upgrade can change computation results and break reproducibility. Manage cluster configuration with infrastructure-as-code (Ansible, Terraform).
        </Callout>
      </section>

      {/* ─── TRAINING WORKFLOW ──────────────────────────────────────────── */}
      <section id="training-workflow">
        <h2 style={S.h2}>AI Training Workflow</h2>
        <p style={S.p}>
          An infrastructure engineer should understand the training workflow — that's what's placing the demanding load on the hardware.
        </p>
        <ol style={{ ...S.ul, listStyleType: "decimal" }}>
          <li><strong>Data Preparation:</strong> Raw data → tokenize, normalize, augment → write to training format (WebDataset, Parquet, TFRECORDS) → store in parallel file system.</li>
          <li><strong>Cluster Launch:</strong> Allocate GPU resources via Slurm or Kubernetes. All GPU processes start. NCCL initializes. Master broadcasts initial model parameters to all GPUs.</li>
          <li><strong>Training Loop:</strong> DataLoader reads batch from storage → CPU memory → GPU memory → forward pass (compute loss) → backward pass (compute gradients) → all-reduce via NCCL (gradient aggregation) → optimizer step (update weights) → repeat millions of times.</li>
          <li><strong>Checkpointing:</strong> Every N steps, model state saved to storage. H100 HBM → local NVMe (async) → parallel FS (background). 70B BF16 model = ~140GB checkpoint. Async checkpointing critical for minimizing training pause.</li>
          <li><strong>Evaluation:</strong> Periodic validation on held-out data. Track loss, perplexity, benchmarks. Weights & Biases or MLflow for experiment tracking.</li>
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
          NVIDIA introduced the "AI Factory" concept — an integrated collection of AI clusters, networking, storage, and software as a unified production system.
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
          Scale categories and the corresponding architecture decisions:
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
          Enterprise organizations typically don't build OpenAI-scale clusters. A starting point and growth path:
        </p>
        <ul style={S.ul}>
          <li><strong>4-GPU server (H100 NVL4 or 4× A100):</strong> Rs. 1-2 crore range. Fits a standard rack. 20-25kW. Air-cooled. For 4-7B parameter fine-tuning, inference serving.</li>
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
          What this cluster can do: fine-tune a 70B parameter model in 2-3 days. Train a 7-13B parameter model from scratch in 2-4 weeks. Serve multiple concurrent inference workloads in production.
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
          <li><strong>Plan for failures:</strong> GPU failures happen in a 1,000-GPU cluster. Configure training frameworks with automatic checkpoint restart — a production requirement, not optional.</li>
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
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}> Q: What is the fundamental difference between GPU and CPU from an AI workloads perspective? </p> <p style={S.p}> CPU: few powerful general-purpose cores, high single-thread performance, low parallelism. GPU: thousands of simpler cores, massive parallelism, SIMD architecture. The core operation of AI training is matrix multiplication — inherently parallel. The H100 has 16,896 CUDA cores and dedicated Tensor Cores for matrix ops. The GPU is 60-80x faster than a top-end CPU at matrix multiplication. Training doesn't happen on a single GPU — thousands work simultaneously. This parallelism is exactly what makes the GPU AI's primary compute resource. </p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}> Q: Why do AI training clusters use InfiniBand instead of Ethernet? </p> <p style={S.p}> The all-reduce operation (gradient synchronization) happens at every step in distributed training. Latency directly affects training speed. InfiniBand: sub-microsecond latency, native RDMA (kernel bypass), hardware-level flow control. NCCL is natively optimized for InfiniBand. In large clusters (100+ nodes), InfiniBand improves training throughput by 20-30% vs Ethernet. RoCE (RDMA over Ethernet) is viable with proper PFC/ECN configuration but needs more tuning. </p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}> Q: What is the difference between training and inference infrastructure requirements? </p> <p style={S.p}> Training: weeks-long jobs, batch size 512-4096, maximize GPU throughput, parallel storage for training data, a few large dedicated clusters, checkpointing required. Inference: real-time (&lt;500ms), batch size 1-32, autoscaling with traffic, always-on service, model weights read once (cached in GPU memory). GPU choice differs: H100 for training, A10G/L4 more cost-effective for inference. Separate infrastructure is preferred — sharing creates scheduling conflicts. </p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}> Q: What is NVLink and why does it matter? </p> <p style={S.p}> NVLink is NVIDIA's proprietary GPU-to-GPU interconnect. On the H100, NVLink 4.0 = 900 GB/s bidirectional per GPU — 14x faster than PCIe 5.0 (64 GB/s). NVSwitch is a dedicated chip that connects 8 GPUs all-to-all at full 900 GB/s bandwidth. Tensor parallelism (model layers across GPUs) efficiently requires NVLink bandwidth — PCIe-based systems are significantly slower. 8 H100s in one node behave, via NVLink, effectively like one giant GPU. </p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}> Q: Explain the power density challenge for AI infrastructure. </p> <p style={S.p}> Traditional server: 200-400W. NVIDIA HGX H100 (8 GPUs): ~10-11kW per 2U chassis. 4 servers per rack = 40-44 kW. Traditional DC is designed for 5-15 kW/rack — an AI rack needs 3-7x more power. This breaks: PDU ampere ratings (need 63A+ vs standard 32A), cooling systems (air cooling limit ~40 kW/rack, liquid cooling mandatory above that), floor loading (400+ kg per AI rack), and UPS/generator sizing (MW-scale for AI clusters). Every layer of DC design must be reconsidered. </p>
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
          <li>AI Infrastructure isn't an extension of traditional IT — it's a distinct engineering discipline with its own unique requirements, failure modes, and design principles.</li>
          <li>GPU is the primary compute resource, but alone insufficient. Networking, storage, power, cooling — all of it needs to be co-designed. One weak link destroys the entire training throughput.</li>
          <li>Power density is the most critical constraint of AI infrastructure for most organizations. 40-100+ kW per rack needs a completely different power distribution and liquid cooling design.</li>
          <li>The networking fabric cost is often equal to or greater than the GPU cost in large clusters. Non-blocking InfiniBand is an investment, not overhead. All-reduce performance directly determines training efficiency.</li>
          <li>The software stack complexity is real and underestimated. NCCL tuning, distributed training debugging, storage configuration — each layer requires specialized expertise.</li>
          <li>Observability isn't optional. GPU utilization, temperature, NVLink bandwidth, NCCL throughput — monitor everything with DCGM + Prometheus + Grafana. Silent degradation is common in AI training.</li>
          <li>Scaling laws make infrastructure a strategic competitive advantage. More compute = reliably better models. AI infrastructure investment is a business decision, not just IT.</li>
          <li>Cloud is right starting point for most. Build expertise, understand workloads, then evaluate on-prem vs cloud at 1-3 year TCO analysis.</li>
          <li>Liquid cooling is now the default for new AI infrastructure deployments. Plan for it, or be constrained by it.</li>
          <li>For DC engineers looking to transition into AI infrastructure: power density and cooling expertise is directly relevant. Add GPU cluster management, InfiniBand, and basic ML workflow knowledge — and you're positioned for one of the most high-demand engineering roles of this decade.</li>
        </ul>
      </section>

    </article>
  );
}
