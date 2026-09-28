"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { gpuClusterContent } from "@/content/gpu-cluster";

import GpuClusterHierarchy from "../svg/GpuClusterHierarchy";
import GpuComputeNodeInternals from "../svg/GpuComputeNodeInternals";
import GpuClusterNetwork from "../svg/GpuClusterNetwork";
import EastWestTraffic from "../svg/EastWestTraffic";
import GpuJobScheduling from "../svg/GpuJobScheduling";
import DistributedTraining from "../svg/DistributedTraining";
import StorageFlow from "../svg/StorageFlow";
import PowerCoolingDiagram from "../svg/PowerCoolingDiagram";
import DgxH100Specs from "../svg/DgxH100Specs";
import ClusterMonitoring from "../svg/ClusterMonitoring";

void gpuClusterContent;

export default function Content() {
  return (
    <article>

      {/* ── QUICK SUMMARY ─────────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          In the <TopicLink slug="ai-data-center-basics" variant="inline" /> article you learned what an AI data center is — buildings, power, cooling, networking, storage. One concept kept coming up repeatedly: the GPU Cluster.
        </p>
        <p style={S.p}>
          A GPU Cluster is a computing infrastructure in which multiple GPU servers are connected via high-speed networking, access data from common storage, and run jobs through a centralized scheduler — collectively behaving like one large parallel computing machine.
        </p>
        <p style={S.p}>
          A GPU Cluster is not just "many GPUs connected together." In a production cluster, compute, networking, storage, scheduling, monitoring, power, cooling, and operations all work together. This article explains that whole picture — from hardware to software, from beginner to engineer.
        </p>
      </section>

      {/* ── WHO SHOULD READ ───────────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>Beginners and Students</strong> — what a GPU is, what a cluster is, what happens inside it — understood from zero.</li>
          <li><strong>Data Center Engineers</strong> — power, cooling, rack design, network cabling, infrastructure impact — focus on the physical layer.</li>
          <li><strong>IT Infrastructure Engineers</strong> — Servers, networking, storage, monitoring — complete cluster architecture.</li>
          <li><strong>AI Infrastructure Engineers</strong> — Distributed training, scheduling, GPU utilization, checkpointing — AI-specific requirements.</li>
          <li><strong>O&M Engineers</strong> — Monitoring, health management, failure handling, troubleshooting — operations perspective.</li>
          <li><strong>Interview Preparation</strong> — Technical questions with accurate, well-reasoned answers.</li>
        </ul>
      </section>

      {/* ── WHAT YOU WILL LEARN ───────────────────────────────── */}
      <section id="what-you-will-learn">
        <h2 style={S.h2}>What You Will Learn</h2>
        <ul style={S.ul}>
          <li>What a GPU is, how it differs from a CPU, why it is suited for AI</li>
          <li>What happens inside a GPU Server / AI Compute Node</li>
          <li>Single GPU → Multi-GPU Server → GPU Cluster → AI Data Center hierarchy</li>
          <li>All the building blocks of a GPU Cluster</li>
          <li>Network architecture — management vs compute, InfiniBand vs RoCE vs NVLink vs PCIe — correctly distinguished</li>
          <li>The East-West traffic concept and why it changes network design</li>
          <li>Storage architecture — parallel file systems, checkpoint storage, data locality</li>
          <li>Job scheduling — Slurm, Kubernetes, job queues, multi-tenancy</li>
          <li>GPU utilization — what it really means and how to measure performance correctly</li>
          <li>Distributed AI training — data parallelism, tensor parallelism, model parallelism, pipeline parallelism</li>
          <li>Power and cooling — rack density, liquid cooling architecture, CDU, PUE</li>
          <li>Reliability, failure handling, redundancy</li>
          <li>Monitoring and observability</li>
          <li>Common mistakes and best practices</li>
        </ul>
      </section>

      {/* ── LEARNING PATH ─────────────────────────────────────── */}
      <section id="learning-path">
        <h2 style={S.h2}>Learning Path</h2>
        <ul style={S.ul}>
          <li><strong>Previous:</strong> <TopicLink slug="ai-data-center-basics" variant="inline" /> — physical facility, power chain, AI Pod, AI Factory</li>
          <li><strong>Current:</strong> GPU Cluster — the compute layer inside an AI Data Center</li>
          <li><strong>Upcoming:</strong> AI Networking (InfiniBand deep dive) → AI Storage (parallel file systems) → AI Cooling (liquid cooling engineering)</li>
        </ul>
      </section>

      {/* ── INTRODUCTION ──────────────────────────────────────── */}
      <section id="introduction">
        <h2 style={S.h2}>Introduction</h2>
        <p style={S.p}>
          Let's start with a bakery analogy.
        </p>
        <p style={S.p}>
          A bakery has one expert chef. He can make 500 loaves a day. That is enough for a small bakery.
        </p>
        <p style={S.p}>
          Now imagine customer demand suddenly jumps to 50,000 loaves a day. You hire 100 chefs, put them in a big kitchen, give each chef a specific task, and appoint a manager to coordinate them.
        </p>
        <p style={S.p}>
          This coordinated kitchen of 100 chefs = a <strong>GPU Cluster</strong>.
        </p>
        <p style={S.p}>
          Each chef = a GPU server. Kitchen = cluster. Manager = scheduler. Raw materials = data. Finished product = trained AI model.
        </p>
        <p style={S.p}>
          But one thing matters here: just hiring 100 chefs will not work. The kitchen needs ingredient storage (storage), a communication system between chefs (networking), temperature control for the kitchen (cooling), electricity (power), and someone to track performance (monitoring). All of this together makes a complete GPU cluster.
        </p>
        <Figure caption="GPU Cluster hierarchy: GPU chip → GPU Compute Node (GPU Server) → GPU Rack → GPU Cluster → AI Data Center. Each level contains and depends on everything below it.">
          <GpuClusterHierarchy />
        </Figure>
      </section>

      {/* ── WHAT IS A GPU CLUSTER ─────────────────────────────── */}
      <section id="what-is-gpu-cluster">
        <h2 style={S.h2}>What Is a GPU Cluster?</h2>
        <p style={S.p}>
          <strong>GPU Cluster</strong> is a computing infrastructure in which multiple GPU servers (AI Compute Nodes) are interconnected via high-speed networking, access common storage, run jobs through a centralized scheduler, and collectively behave like one large parallel computing machine.
        </p>
        <Callout type="important" title="GPU Cluster ≠ Just 'Many GPUs Connected Together'">
          This is a common misunderstanding. Simply wiring servers together does not make a cluster. In a production GPU cluster, the compute layer, high-speed networking, shared storage, the management layer (out-of-band), the scheduling layer, the monitoring layer, power infrastructure, cooling infrastructure, and operations systems all work together. Neglect any layer → the system has a problem.
        </Callout>
        <p style={S.p}><strong>Real-world examples:</strong></p>
        <ul style={S.ul}>
          <li>NVIDIA DGX SuperPOD — pre-validated GPU cluster reference design</li>
          <li>Meta's Research SuperCluster — large-scale GPU cluster for AI research</li>
          <li>University HPC clusters — research GPU clusters shared by multiple departments</li>
          <li>Cloud GPU instances (A100/H100 clusters on AWS, GCP, Azure) — GPU clusters as a service</li>
        </ul>
      </section>

      {/* ── WHY DO WE NEED GPU CLUSTERS ──────────────────────── */}
      <section id="why-clusters">
        <h2 style={S.h2}>Why Do We Need GPU Clusters?</h2>
        <p style={S.p}>
          A GPU today is very powerful. So why can't one GPU do the job?
        </p>
        <p style={S.p}>
          <strong>Because modern AI models do not fit on a single GPU.</strong>
        </p>
        <p style={S.p}>
          An H100 GPU has 80 GB of HBM3 memory. The LLaMA 3 70B model — just to store the model weights in FP16 precision needs approximately 140 GB of memory. It simply does not fit on one H100.
        </p>
        <p style={S.p}>
          Training needs more than just weights — gradients, optimizer states, and activations also need to be stored. The memory requirement becomes 3–4× the model size alone.
        </p>
        <p style={S.p}><strong>What clusters give you:</strong></p>
        <ul style={S.ul}>
          <li><strong>Distributed memory:</strong> 8 H100 GPUs = 640 GB total GPU memory. 64 H100s = 5.12 TB. Large models fit through model parallelism.</li>
          <li><strong>Speed:</strong> Parallelize the same work across multiple GPUs — weeks instead of years.</li>
          <li><strong>Scale for experiments:</strong> Run multiple experiments in parallel.</li>
          <li><strong>Inference throughput:</strong> Serve thousands of simultaneous user requests.</li>
        </ul>
      </section>

      {/* ── GPU VS CPU ────────────────────────────────────────── */}
      <section id="gpu-vs-cpu">
        <h2 style={S.h2}>GPU vs CPU for AI Workloads</h2>
        <p style={S.p}>
          <strong>CPU (Central Processing Unit)</strong> — an intelligent generalist. It can do complex decision making, branching logic, sequential tasks, OS management — everything. Few powerful cores (8–128 in modern servers), complex control logic, large caches. Each core can do a lot, is fast, but handles only a few tasks at a time per core.
        </p>
        <p style={S.p}>
          <strong>GPU (Graphics Processing Unit)</strong> — originally designed for graphics rendering. A GPU has thousands of simpler cores that can all perform simple math operations simultaneously.
        </p>
        <p style={S.p}>
          <strong>Why GPU wins for AI:</strong> the core operation of AI training is matrix multiplication — the same simple math operations (multiply and add) performed millions of times across millions of numbers, simultaneously. A GPU is orders of magnitude faster for this.
        </p>
        <ComparisonTable
          title="CPU vs GPU for AI Workloads"
          headers={["Aspect", "CPU", "GPU"]}
          rows={[
            ["Core count", "8–128 powerful cores", "Thousands of simpler cores"],
            ["Core design", "Complex (OOO, branch prediction, large cache)", "Simple (SIMD, throughput-optimized)"],
            ["Best for", "Complex sequential logic, OS, branching", "Massive parallel math (matrix multiply)"],
            ["AI training role", "Data loading, preprocessing, orchestration", "Primary compute — forward/backward pass"],
            ["Memory", "Hundreds of GB DDR5 (system RAM)", "40–192 GB HBM (per GPU, very high BW)"],
            ["Per-unit cost", "Rs. 1–5 lakhs range", "Rs. 30–80 lakhs+ range (enterprise GPU)"],
          ]}
        />
        <Callout type="best-practice" title="CPU and GPU Work Together">
          A GPU cluster has CPUs too. The CPU's job: data loading and preprocessing (getting training data to the GPU), job orchestration (running the PyTorch framework), OS and driver management, network stack management, storage I/O coordination. CPU and GPU are not competitors — they are a coordinated team.
        </Callout>
      </section>

      {/* ── SINGLE TO CLUSTER ────────────────────────────────── */}
      <section id="single-to-cluster">
        <h2 style={S.h2}>Single GPU → Multi-GPU Server → GPU Cluster</h2>
        <ComparisonTable
          title="GPU Scale Levels"
          headers={["Level", "GPU Count", "GPU Memory Available", "Use Case", "Failure Impact"]}
          rows={[
            ["Single GPU", "1", "80 GB (H100)", "Experiments, small models", "Total — job fails"],
            ["Multi-GPU Server", "4–8 per server", "320–640 GB", "Medium models, development", "Total — server down"],
            ["Small AI Cluster", "8–64 GPUs", "640 GB–5 TB", "Research, moderate training", "Partial"],
            ["Department Cluster", "128–512 GPUs", "10 TB–41 TB", "Org-wide AI team", "Partial"],
            ["Enterprise Cluster", "1,000+ GPUs", "80 TB+", "Large model training, production", "Designed for resilience"],
            ["Hyperscale AI Cluster", "10,000+ GPUs", "Petabyte scale", "Frontier model training", "Designed for continuous ops"],
          ]}
        />
        <Callout type="important" title="GPU Memory Available ≠ Maximum Model Size">
          This distinction matters a lot. Available GPU memory (HBM capacity) does not directly determine the maximum model size. The actual model size that will fit depends on: workload type (inference vs training), numerical precision (FP32, BF16, FP8), quantization, optimizer states, gradients, activations, batch size, framework overhead, and parallelism/sharding strategy. In training, an 80 GB model does not fit on an 80 GB GPU — gradients, optimizer states, and activations all use memory too.
        </Callout>
      </section>

      {/* ── GPU COMPUTE NODE ──────────────────────────────────── */}
      <section id="gpu-compute-node">
        <h2 style={S.h2}>GPU Compute Node</h2>
        <p style={S.p}>
          A <strong>GPU Compute Node</strong> is a compute server that is the unit of cluster scheduling. In AI clusters this commonly has one or more GPUs, and it is often also called a GPU Server.
        </p>
        <p style={S.p}>
          To define it precisely: a Node = a schedulable unit of compute resources from the scheduler's perspective. Typically one physical server = one node.
        </p>
        <p style={S.p}><strong>Node types in a cluster:</strong></p>
        <ul style={S.ul}>
          <li><strong>Compute nodes:</strong> GPU servers where the actual training or inference work happens — this is the primary focus of this article</li>
          <li><strong>Head/Login nodes:</strong> Where users log in and submit jobs</li>
          <li><strong>Storage nodes:</strong> Parallel file system servers</li>
          <li><strong>Management nodes:</strong> Scheduler, monitoring, control plane servers</li>
        </ul>
      </section>

      {/* ── INSIDE GPU SERVER ─────────────────────────────────── */}
      <section id="inside-gpu-server">
        <h2 style={S.h2}>What Is Inside a GPU Server?</h2>
        <Figure caption="GPU Compute Node internals: 8 GPU chips (each with 80 GB HBM ultra-fast memory), 2 CPUs managing the server, System RAM for data staging, PCIe bus connecting CPU to GPUs, high-speed NICs for both management and AI compute network, NVMe SSDs for local OS/cache, dual PSUs for redundancy, BMC chip for out-of-band remote management.">
          <GpuComputeNodeInternals />
        </Figure>
        <ul style={S.ul}>
          <li><strong>GPUs (4–8 typically):</strong> The main compute engine. H100, MI300X, or other accelerators. Each GPU has its own HBM.</li>
          <li><strong>CPUs (typically 2 sockets):</strong> Server management, data loading, framework orchestration. AMD EPYC or Intel Xeon.</li>
          <li><strong>System RAM (256 GB–2 TB):</strong> The CPU's working memory. Training data is temporarily staged here before transferring to GPU memory. The OS, framework code, and preprocessing pipelines run here.</li>
          <li><strong>HBM (the GPU's own memory):</strong> Each GPU has separate HBM. Physically integrated very close to the GPU. Model weights, activations, and gradients live in the GPU's HBM during compute.</li>
          <li><strong>PCIe bus:</strong> The standard interface between CPU and GPU (and other devices) within the server. Data transfer from CPU memory to GPU memory happens here.</li>
          <li><strong>NICs (multiple):</strong> Standard 1 GbE ports for the management network, high-speed ports for the compute/data network (InfiniBand ConnectX or high-speed Ethernet). Typically 2–8 high-speed ports per GPU server.</li>
          <li><strong>NVMe SSDs:</strong> Fast local storage for the OS, framework, temporary files, and local checkpoints. Not the primary training data storage — that sits on shared storage.</li>
          <li><strong>Dual PSUs:</strong> Redundant power supplies. One fails → the other seamlessly takes over.</li>
          <li><strong>BMC (Baseboard Management Controller):</strong> An out-of-band management chip. If the OS crashes, you can remotely power cycle and get console access through the BMC. It has its own separate IP on the management network. Critical for data center operations.</li>
        </ul>
        <p style={S.p}><strong>DGX H100 reference specifications:</strong></p>
        <Figure caption="NVIDIA DGX H100 reference specifications: 8× H100 SXM GPUs (80 GB each, 640 GB total HBM3), 4× NVSwitch with 4th-gen NVLink (900 GB/s), 2× Intel Xeon Platinum 8480C, 2 TB DDR5, 2× 1.92 TB + 8× 3.84 TB NVMe, 8× ConnectX-7 up to 400 Gb/s each, 10.2 kW max, 8U.">
          <DgxH100Specs />
        </Figure>
      </section>

      {/* ── GPU MEMORY VS SYSTEM MEMORY ──────────────────────── */}
      <section id="gpu-hbm-ram">
        <h2 style={S.h2}>GPU Memory vs System Memory</h2>
        <ComparisonTable
          title="HBM vs System RAM — Key Differences"
          headers={["Factor", "GPU HBM (High Bandwidth Memory)", "System RAM (CPU Memory)"]}
          rows={[
            ["Location", "On GPU package, physically integrated", "On motherboard, connected to CPU via memory bus"],
            ["Capacity", "40–192 GB per GPU (generation/model specific)", "256 GB–2 TB per server"],
            ["Bandwidth", "3+ TB/s (H100 HBM3), 5.3 TB/s (MI300X)", "~500 GB/s per memory channel"],
            ["Latency", "Very low (on-chip proximity)", "Higher (off-chip memory bus)"],
            ["Used by", "Model weights, activations, gradients, optimizer states", "OS, framework, data loading, preprocessing"],
            ["Cost per GB", "Very high", "Relatively lower"],
            ["Access from CPU", "Via PCIe (slower path)", "Direct, native access"],
          ]}
        />
        <p style={S.p}>
          <strong>Memory hierarchy during training:</strong> GPU Registers (fastest, per core) → GPU L1/L2 Cache → GPU HBM (main GPU memory) → PCIe → System RAM (CPU memory) → NVMe SSD (local storage) → Network Storage (shared, slowest). Speed decreases, capacity increases as you go down.
        </p>
        <Callout type="warning" title="Both Can Be Memory Bottlenecks">
          System RAM bottleneck: if data preprocessing is slow on the CPU → the GPU waits for data → GPU utilization drops. GPU HBM bottleneck: if the model doesn't fit in HBM → the job fails or model parallelism is required. Monitor both layers.
        </Callout>
      </section>

      {/* ── TERMINOLOGY ───────────────────────────────────────── */}
      <section id="terminology">
        <h2 style={S.h2}>GPU Server Terminology</h2>
        <p style={S.p}>The industry uses multiple terms for the same or similar things:</p>
        <ul style={S.ul}>
          <li><strong>GPU Server / GPU Compute Node:</strong> Same concept — a server with GPUs, a schedulable unit in the cluster</li>
          <li><strong>AI Compute Node:</strong> Same, emphasizes AI workload use case</li>
          <li><strong>DGX Node (NVIDIA specific):</strong> NVIDIA branded GPU server (DGX H100, DGX B200). Specific validated configuration from NVIDIA.</li>
          <li><strong>HGX (NVIDIA-specific):</strong> A GPU baseboard/module that OEMs integrate into their own server chassis. Gives OEM flexibility with NVIDIA GPU components.</li>
          <li><strong>Training Node vs Inference Node:</strong> Same physical hardware, different workload use — the distinction is workload type, not hardware type.</li>
          <li><strong>Worker Node:</strong> In Kubernetes context, nodes that run workloads (as opposed to control plane nodes).</li>
        </ul>
      </section>

      {/* ── CLUSTER ARCHITECTURE ─────────────────────────────── */}
      <section id="cluster-architecture">
        <h2 style={S.h2}>GPU Cluster Architecture</h2>
        <p style={S.p}>Let's understand a GPU cluster in layers:</p>
        <ul style={S.ul}>
          <li><strong>Layer 1 — Compute Layer:</strong> GPU Compute Nodes. This is where the actual AI computation happens.</li>
          <li><strong>Layer 2 — High-Speed Compute Network:</strong> Interconnects the compute nodes. GPU-to-GPU AllReduce runs on this network. High bandwidth, low latency. InfiniBand or high-speed RoCE.</li>
          <li><strong>Layer 3 — Storage Layer:</strong> Shared, high-bandwidth storage. Training datasets, checkpoints, artifacts. Parallel file systems. Accessible from compute nodes over the network.</li>
          <li><strong>Layer 4 — Management Layer:</strong> Separate management network. BMC/IPMI access, OS management, monitoring agents, software deployment. Completely separate from compute network.</li>
          <li><strong>Layer 5 — Scheduling / Control Layer:</strong> Slurm, Kubernetes. Job queue, resource allocation, fairness. Runs on dedicated management/head nodes.</li>
          <li><strong>Layer 6 — Monitoring Layer:</strong> GPU health (DCGM), network monitoring, storage monitoring, power/temperature sensors.</li>
          <li><strong>Layer 7 — Power Infrastructure:</strong> Utility → Transformers → UPS → PDUs → Servers. Redundant paths. Generators for backup.</li>
          <li><strong>Layer 8 — Cooling Infrastructure:</strong> Air cooling (CRAC/CRAH), liquid cooling (CDU, cold plates, manifolds).</li>
          <li><strong>Layer 9 — Operations:</strong> DCIM, BMS, ticketing, runbooks, on-call.</li>
        </ul>
      </section>

      {/* ── BUILDING BLOCKS ───────────────────────────────────── */}
      <section id="building-blocks">
        <h2 style={S.h2}>GPU Cluster Building Blocks</h2>
        <ul style={S.ul}>
          <li><strong>GPU Compute Nodes:</strong> Primary compute. Servers with GPUs, CPUs, RAM, NICs, NVMe, PSUs.</li>
          <li><strong>Top-of-Rack (ToR) Switches:</strong> A switch in each rack that connects all the servers in that rack to the cluster network and forwards traffic toward the leaf/spine fabric. InfiniBand or high-speed Ethernet switch for high-speed compute.</li>
          <li><strong>Spine/Core Switches:</strong> Interconnect multiple ToR switches. Leaf-spine design in a fat-tree topology. For full bisection bandwidth.</li>
          <li><strong>Storage Servers:</strong> Parallel file system nodes (Lustre MDS/OSS or GPFS). High-bandwidth connectivity to compute nodes required.</li>
          <li><strong>Management/Head Nodes:</strong> The scheduler runs here. Users log in here. Software deployment, monitoring collection.</li>
          <li><strong>Out-of-Band Management Network:</strong> The BMC/IPMI network. Typically 1 GbE. Every server's BMC is connected here. Always accessible for remote management.</li>
          <li><strong>Power Distribution:</strong> PDUs per rack. Rack-level power monitoring. Dual-feed PDUs for redundancy.</li>
          <li><strong>Cooling Equipment:</strong> CRAC/CRAH units (air). CDU + liquid cooling manifolds per rack (liquid). Temperature sensors.</li>
          <li><strong>Monitoring Infrastructure:</strong> DCGM agents, Prometheus exporters, Grafana dashboards, alerting.</li>
        </ul>
      </section>

      {/* ── RACK ARCHITECTURE ─────────────────────────────────── */}
      <section id="rack-architecture">
        <h2 style={S.h2}>GPU Rack Architecture</h2>
        <p style={S.p}>A GPU rack is very different from a traditional server rack.</p>
        <p style={S.p}><strong>Traditional rack:</strong> 42U, mix of 1U–2U servers, 20–40 servers, 3–15 kW typical, air cooled.</p>
        <p style={S.p}><strong>GPU server rack:</strong> 42U standard. GPU servers typically 4U–8U each. 4–8 GPU servers per rack typical. Power varies significantly based on GPU platform, server configuration, and number of servers per rack.</p>
        <Callout type="warning" title="Rack Power — Platform Specific">
          Don't define rack power with any universal number. A DGX H100 draws approximately 10.2 kW — 4 such servers in one rack = approximately 40+ kW plus networking plus management. A GB200 NVL72 rack: well over 100 kW. Older GPU generations draw less. Always design from actual server TDP specs — not from assumed averages. Plus a minimum 20% headroom.
        </Callout>
        <p style={S.p}><strong>Rack design considerations:</strong></p>
        <ul style={S.ul}>
          <li><strong>Power distribution:</strong> Follow the server manufacturer's approved electrical configuration, rack PDU ratings, breaker capacity, redundancy requirements, and applicable electrical standards/codes.</li>
          <li><strong>Cable density:</strong> A GPU server has 8+ high-speed network cables. Multiply by 4–8 servers = a significant cable management challenge. Poor cable management → airflow blockage → thermal issues.</li>
          <li><strong>Weight:</strong> GPU servers are significantly heavier — a DGX H100 is approximately 130 kg. Verify floor load capacity before deployment.</li>
          <li><strong>Cooling manifold:</strong> Liquid-cooled racks have a coolant manifold and distribution pipes. Leak detection sensors are mandatory at the rack level.</li>
          <li><strong>Service access:</strong> Design so GPUs are accessible without major disassembly — field replacement operations happen regularly.</li>
        </ul>
      </section>


      {/* ── NETWORK ARCHITECTURE ──────────────────────────────── */}
      <section id="network-architecture">
        <h2 style={S.h2}>GPU Cluster Network Architecture</h2>
        <p style={S.p}>
          The network is arguably the GPU cluster's most critical component — after the GPUs themselves.
        </p>
        <p style={S.p}>
          <strong>Why networking is so critical:</strong> in distributed AI training, after every training step, all GPUs need to share gradients — the AllReduce operation. If the network is slow, GPUs wait for communication, and effective training throughput drops dramatically.
        </p>
        <Figure caption="GPU Cluster dual-network architecture: High-Speed AI Compute Network (solid) connects GPU servers through Leaf and Spine switches for GPU-to-GPU AllReduce gradient sync. Separate Management Network (dashed) connects same servers via different NICs for admin access, monitoring, BMC — always available even if compute network has issues.">
          <GpuClusterNetwork />
        </Figure>
        <p style={S.p}><strong>Fat-tree topology</strong> (leaf-spine) is the standard choice for GPU clusters. Large distributed-training clusters often use a non-blocking or carefully engineered low-oversubscription network because collective communication can generate very high East-West traffic. Network architecture should be selected according to workload and required communication performance.</p>
        <ComparisonTable
          title="Cluster Network — Three Logical Networks"
          headers={["Network", "Purpose", "Speed", "Critical Requirement"]}
          rows={[
            ["Management Network", "BMC/IPMI, SSH, monitoring agents, OS updates", "1 GbE typical", "Always available, even if compute network down"],
            ["High-Speed Compute Network", "GPU-to-GPU AllReduce, gradient sync", "100–400 Gb/s (IB/RoCE)", "Max bandwidth, min latency, non-blocking"],
            ["Storage Network (optional separate)", "Training data reads, checkpoint writes", "100 Gb/s+", "High aggregate bandwidth, low latency"],
          ]}
        />
        <Callout type="important" title="The Three Networks Are Not Always Physically Separate">
          This logical separation matters — physical separation is implementation-specific. In some clusters, storage and compute traffic share the same physical fabric (different VLANs/QoS). Critical rule: the management network should always be separate — physically different NICs, different switches. Compute and storage separation depends on workload requirements.
        </Callout>
      </section>

      {/* ── MGMT VS COMPUTE NET ───────────────────────────────── */}
      <section id="mgmt-vs-compute-net">
        <h2 style={S.h2}>Management Network vs Compute Network</h2>
        <p style={S.p}>
          <strong>Management Network:</strong> Always on, always accessible. BMC/IPMI, SSH, monitoring agents, OS updates. 1 GbE per server sufficient. Separate NICs, separate switches, separate VLANs, ideally separate physical infrastructure.
        </p>
        <p style={S.p}>
          <strong>High-Speed Compute Network:</strong> used during active GPU compute jobs. AllReduce, data loading, checkpoint writes. 200–400 Gb/s per port is common. Specialized InfiniBand switches or 400 GbE switches.
        </p>
        <p style={S.p}><strong>Why separation matters:</strong></p>
        <ul style={S.ul}>
          <li><strong>Security:</strong> Training traffic (sensitive model weights, proprietary data) separated from management traffic.</li>
          <li><strong>Reliability:</strong> When diagnosing a compute network issue, access is still available via the management network.</li>
          <li><strong>Performance:</strong> Allowing management traffic (monitoring, BMC console) on the compute network can impact AllReduce performance.</li>
        </ul>
        <p style={S.p}><strong>Practical deployment:</strong> On each GPU server: 2 standard Ethernet ports → management network (bonded for redundancy), 2–8 high-speed NICs → compute/data network, BMC port → out-of-band management network (completely separate).</p>
      </section>

      {/* ── NVLINK NVSWITCH ───────────────────────────────────── */}
      <section id="nvlink-nvswitch">
        <h2 style={S.h2}>NVLink and NVSwitch</h2>
        <p style={S.p}>
          <strong>NVLink</strong> is NVIDIA's proprietary high-speed GPU-to-GPU interconnect technology. NVLink specifically provides direct connections between GPU chips — at much higher bandwidth than PCIe.
        </p>
        <p style={S.p}>
          In traditional DGX/HGX systems, NVLink/NVSwitch is primarily used for high-bandwidth communication between GPUs within the same node.
        </p>
        <p style={S.p}>
          Newer rack-scale architectures like NVIDIA GB200 NVL72 extend NVLink across multiple compute trays, creating a rack-scale NVLink domain — approximately 13.4 TB HBM3E, approximately 576 TB/s aggregate HBM bandwidth, approximately 130 TB/s NVLink bandwidth, approximately 120 kW rack power (DGX GB200 NVL72 reference configuration).
        </p>
        <p style={S.p}>
          Scale-out between larger systems/racks still requires high-performance networking such as InfiniBand or Ethernet.
        </p>
        <p style={S.p}>
          <strong>NVSwitch:</strong> a dedicated chip that switches NVLink connections — enabling any-to-any full-bandwidth communication within a server or rack domain. A DGX H100 has 4× NVSwitch chips that provide 900 GB/s GPU-to-GPU bandwidth via 4th-gen NVLink.
        </p>
        <p style={S.p}><strong>NVLink bandwidth (generation specific):</strong></p>
        <ul style={S.ul}>
          <li>NVLink 3.0 (A100): 600 GB/s bidirectional per GPU</li>
          <li>NVLink 4.0 (H100): 900 GB/s bidirectional per GPU</li>
        </ul>
        <Callout type="important" title="NVLink ≠ InfiniBand — Different Technologies, Different Roles">
          NVLink = NVIDIA-specific intra-server (or rack-scale NVLink domain) GPU interconnect. InfiniBand = cluster-wide networking technology (multi-vendor, inter-server/inter-rack). Both can exist simultaneously in a GPU cluster at different layers. NVLink is only available on specific NVIDIA platforms (DGX/HGX class).
        </Callout>
      </section>

      {/* ── INFINIBAND ROCE ───────────────────────────────────── */}
      <section id="infiniband-roce">
        <h2 style={S.h2}>InfiniBand and RoCE</h2>
        <p style={S.p}>
          These are inter-server cluster networking technologies — when GPUs sit on different servers, this network connects them.
        </p>
        <p style={S.p}>
          <strong>InfiniBand (IB):</strong> a specialized high-performance networking protocol designed specifically for HPC/AI clusters. Fundamentally different from standard Ethernet. Very low latency (~1 microsecond end-to-end), high bandwidth (NDR = 400 Gb/s, HDR = 200 Gb/s per port), native RDMA support. Purpose-built non-blocking fabrics are possible. NVIDIA (Mellanox) ConnectX series adapters are installed in the server.
        </p>
        <p style={S.p}>
          <strong>RoCE (RDMA over Converged Ethernet):</strong> RDMA capabilities on standard Ethernet infrastructure. An attempt at "best of both worlds": standard Ethernet hardware (cheaper, ubiquitous) + RDMA performance. RoCE v2 is the current standard: RDMA over UDP. Lossless Ethernet (Priority Flow Control, ECN) is required for good performance. Many hyperscalers (Meta, Google, Microsoft) use RoCE or similar custom Ethernet fabrics in large-scale AI clusters. AMD Instinct GPUs have strong native RoCE support.
        </p>
        <ComparisonTable
          title="InfiniBand vs RoCE Comparison"
          headers={["Factor", "InfiniBand NDR", "RoCE v2 (400 GbE)"]}
          rows={[
            ["Bandwidth", "400 Gb/s per port", "400 Gb/s (400GbE)"],
            ["Latency", "~1 µs", "Typically a few µs"],
            ["Protocol", "Purpose-built", "Ethernet-based"],
            ["Hardware cost", "Higher (specialized)", "Lower (standard Ethernet SW)"],
            ["Ecosystem", "NVIDIA-dominant", "Multi-vendor"],
            ["Complexity", "IB subnet manager needed", "Lossless Ethernet config needed"],
            ["Use cases", "HPC, NVIDIA GPU clusters", "Hyperscale, multi-vendor AI"],
          ]}
        />
        <Callout type="best-practice" title="Choice Depends on Multiple Factors">
          InfiniBand vs RoCE — there is no universal answer. It depends on: GPU platform affinity, budget, existing networking expertise, scale, performance sensitivity. NVIDIA GPU clusters: often InfiniBand. AMD Instinct clusters: strong RoCE support. Large hyperscalers: often custom Ethernet (RoCE-based). Check the vendor recommendation for your GPU platform.
        </Callout>
      </section>

      {/* ── PCIE ─────────────────────────────────────────────── */}
      <section id="pcie-role">
        <h2 style={S.h2}>PCIe and Its Role</h2>
        <p style={S.p}>
          <strong>PCIe (Peripheral Component Interconnect Express)</strong> — the standard interface that connects CPU and GPU (and other devices) within a server.
        </p>
        <p style={S.p}>
          PCIe provides the connection within a GPU server between CPU and GPU, between CPU and NICs, and between CPU and NVMe drives. On compatible platforms, GPUs can also use PCIe peer-to-peer (P2P) communication. In systems with NVLink/NVSwitch, high-bandwidth GPU-to-GPU communication is primarily handled through the NVLink fabric.
        </p>
        <p style={S.p}><strong>PCIe generations:</strong> PCIe 4.0: ~64 GB/s bidirectional (x16 slot). PCIe 5.0: ~128 GB/s bidirectional (x16 slot).</p>
        <p style={S.p}>
          Compare PCIe bandwidth to GPU HBM bandwidth: H100 HBM3 = ~3.35 TB/s. PCIe 5.0 x16 = ~128 GB/s. PCIe bandwidth is approximately 26× less than GPU HBM bandwidth. That is why CPU-GPU data transfer can be a bottleneck.
        </p>
        <p style={S.p}><strong>How clusters handle PCIe limitation:</strong></p>
        <ul style={S.ul}>
          <li>Minimize CPU-GPU data transfers: keep data in GPU HBM as much as possible.</li>
          <li>GPUDirect RDMA: GPU memory can transfer data directly to/from the NIC — bypassing CPU memory. "Zero copy" transfers directly on the cluster network.</li>
          <li>Batch loading: prefetch training data into CPU memory, transfer it to the GPU in batches — overlap compute and data loading.</li>
        </ul>
        <Callout type="important" title="PCIe Is Not Cluster-Wide Networking">
          PCIe is the CPU-to-device interface within a single server. Cluster-wide GPU-to-GPU communication happens over InfiniBand or RoCE — through separate NICs. GPU-to-GPU data goes over the cluster fabric, not through PCIe (thanks to GPUDirect RDMA).
        </Callout>
      </section>

      {/* ── GPU-TO-GPU COMM ───────────────────────────────────── */}
      <section id="gpu-to-gpu-comm">
        <h2 style={S.h2}>GPU-to-GPU Communication</h2>
        <p style={S.p}>
          <strong>The AllReduce operation:</strong> 1000 GPUs are training in parallel. Each GPU processes its own data batch and computes gradients. Then the gradients from all 1000 GPUs need to be averaged and told to everyone, so all of them start the next step from the same updated model. This "average and broadcast" = AllReduce.
        </p>
        <p style={S.p}><strong>Communication paths:</strong></p>
        <ul style={S.ul}>
          <li><strong>Within same server (intra-node):</strong> NVLink (NVIDIA NVLink-equipped platforms — DGX/HGX class) — very high bandwidth, low latency. PCIe P2P (compatible platforms without NVLink) — usable but lower bandwidth.</li>
          <li><strong>Across different servers (inter-node):</strong> GPU memory → NIC (via GPUDirect RDMA, CPU bypass) → InfiniBand/RoCE switch → destination server NIC → destination GPU memory.</li>
        </ul>
        <p style={S.p}>
          <strong>NCCL (NVIDIA Collective Communications Library):</strong> the backbone communication library for AI training. It automatically manages GPU communication inside the framework (PyTorch, TensorFlow). It automatically uses both NVLink (intra-node) and InfiniBand/RoCE (inter-node) according to topology. <strong>RCCL</strong> is the equivalent for AMD GPU clusters.
        </p>
      </section>

      {/* ── EAST-WEST ─────────────────────────────────────────── */}
      <section id="east-west-traffic">
        <h2 style={S.h2}>East-West Traffic in GPU Clusters</h2>
        <Figure caption="East-West vs North-South traffic patterns. Traditional DC: Client sends request to server (vertical, North-South). GPU Cluster: During AllReduce, all GPU servers simultaneously exchange gradient data with each other (horizontal, East-West, peer-to-peer). This massive concurrent communication is why GPU cluster networks need non-blocking or low-oversubscription fabric design.">
          <EastWestTraffic />
        </Figure>
        <p style={S.p}>
          <strong>North-South (traditional DC):</strong> Client → Server → Client. A user request comes in (south), the server responds (north). Vertical flow.
        </p>
        <p style={S.p}>
          <strong>East-West (AI/GPU cluster):</strong> Server → Server → Server. During AllReduce, all GPU servers are simultaneously sending gradients to each other. Massive horizontal traffic between peers.
        </p>
        <p style={S.p}>
          <strong>Design implication:</strong> for East-West heavy traffic, the network needs to be "non-blocking" or a carefully engineered low-oversubscription design. Fat-tree topology (leaf-spine) is the standard choice because it can provide full bisection bandwidth — every node can communicate with every other node at full speed.
        </p>
        <Callout type="important" title="Oversubscribed Network → Training Slow">
          If the network is "oversubscribed" (switch uplinks thinner than downlinks) → bottleneck at the spine → AllReduce slows down → GPUs wait → effective utilization drops dramatically. Expensive GPUs sit idle waiting on the network. Plan the network proportionally with GPU count.
        </Callout>
      </section>

      {/* ── STORAGE ARCHITECTURE ─────────────────────────────── */}
      <section id="storage-architecture">
        <h2 style={S.h2}>Storage Architecture for GPU Clusters</h2>
        <p style={S.p}>
          Underestimating storage is a common mistake. If training data isn't supplied fast enough, GPUs sit idle despite appearing to be "running."
        </p>
        <Figure caption="Storage flow: Dataset from Cold Storage (object storage) pre-staged to Hot Parallel File System before training. GPU nodes continuously read training batches from hot storage. Checkpoints written periodically to fast checkpoint storage. Final trained model goes to Model Registry. GPUDirect Storage (dashed, requires supported hardware and software stack) provides direct GPU-to-storage path bypassing CPU.">
          <StorageFlow />
        </Figure>
        <p style={S.p}><strong>Storage tiers:</strong></p>
        <ul style={S.ul}>
          <li><strong>Hot Storage:</strong> Actively used training data. Needs the highest bandwidth. Parallel file system (Lustre, GPFS). Requires low-latency, high-throughput access from compute nodes.</li>
          <li><strong>Cold Storage:</strong> Archived datasets, old models. Object storage (S3-compatible). Large capacity, low cost.</li>
          <li><strong>Checkpoint Storage:</strong> Training checkpoints — needs both fast writes and durable storage. Fast NVMe-backed storage for recent checkpoints.</li>
          <li><strong>Object Storage:</strong> Scalable, durable, cloud-native. Training data archive, final model weights, experiment artifacts.</li>
        </ul>
        <Callout type="warning" title="Storage Throughput — Benchmark It, Don't Guess">
          Required storage throughput depends on workload characteristics: dataset size, batch size, preprocessing, caching, data reuse, checkpoint frequency, and number of concurrent jobs. Production storage throughput should be determined through workload benchmarking rather than a fixed GB/s-per-GPU rule. Provision from actual measured requirements, not theoretical estimates.
        </Callout>
      </section>

      {/* ── DATA LOCALITY ─────────────────────────────────────── */}
      <section id="data-locality">
        <h2 style={S.h2}>Data Locality</h2>
        <p style={S.p}>
          <strong>Data Locality</strong> — the principle: the physically and logically closer data is to GPU compute, the lower the latency and the higher the throughput.
        </p>
        <p style={S.p}>
          Storage that is "far" from compute nodes → higher latency, lower effective bandwidth → GPUs wait for data. Put storage close to the GPU cluster on the network — same building or same network segment.
        </p>
        <ul style={S.ul}>
          <li><strong>Data pre-staging:</strong> before starting a training run, copy the relevant dataset onto fast hot storage.</li>
          <li><strong>Local NVMe use:</strong> use the GPU server's local NVMe as a temporary cache for frequently accessed data.</li>
          <li><strong>Network segregation:</strong> separate the storage network from compute (AllReduce) traffic — so congestion in one doesn't affect the other.</li>
          <li><strong>GPUDirect Storage:</strong> the GPU can read data directly from storage via supported paths — bypassing CPU memory. Requires a supported storage system, filesystem, NIC/PCIe topology, drivers, and software configuration — not automatic.</li>
        </ul>
      </section>

      {/* ── CHECKPOINT STORAGE ────────────────────────────────── */}
      <section id="checkpoint-storage">
        <h2 style={S.h2}>Checkpoint Storage</h2>
        <p style={S.p}>
          Checkpointing is the lifeline of AI training. During a training job, every N steps (or every N minutes), saving the current model state (weights, optimizer states, RNG state) to disk = a checkpoint.
        </p>
        <p style={S.p}>
          <strong>Why it's critical:</strong> large model training can run for weeks or months. Hardware failures are expected events at scale. A single node failure can fail a distributed training job unless the framework supports fault tolerance. Resume from a checkpoint — not from zero.
        </p>
        <p style={S.p}>
          <strong>Checkpoint frequency decision:</strong> Checkpoint frequency is selected by balancing checkpoint overhead (write time pauses training) against the amount of training work the organization is willing to lose after a failure.
        </p>
        <p style={S.p}><strong>Checkpoint strategy:</strong></p>
        <ul style={S.ul}>
          <li>Fast checkpoint: every N minutes/steps, onto fast local/shared NVMe storage.</li>
          <li>Durable checkpoint: every few hours, onto replicated durable storage.</li>
          <li>Final checkpoint: when training completes, onto long-term object storage.</li>
          <li>Async checkpointing: copy model state from GPU into memory, training continues, a background thread writes to disk — minimizes the training pause.</li>
        </ul>
        <Callout type="best-practice" title="Test Checkpoint Restore Before Long Runs">
          Before starting a multi-day training job, verify checkpoint restore. A corrupted checkpoint = false confidence. If the restore process is broken, all your checkpoints are useless. Actually run a test — small job → checkpoint → restore → verify continuation.
        </Callout>
      </section>

      {/* ── PARALLEL FILE SYSTEMS ─────────────────────────────── */}
      <section id="parallel-file-systems">
        <h2 style={S.h2}>Parallel File Systems</h2>
        <p style={S.p}>
          Standard NFS has a limited single-server bandwidth. For GPU clusters — as the cluster scales — a parallel file system is required.
        </p>
        <p style={S.p}>
          <strong>Parallel File System:</strong> a file system distributed across multiple storage servers, all of which can serve simultaneously. Aggregate bandwidth = combined bandwidth of all storage servers.
        </p>
        <p style={S.p}><strong>Options:</strong></p>
        <ul style={S.ul}>
          <li><strong>Lustre:</strong> Most common parallel file system in HPC/AI clusters. Open-source. Architecture: MDS (Metadata Server) + MDT, OSS (Object Storage Server) + OST. Multiple OSSes → aggregate bandwidth scales.</li>
          <li><strong>IBM Spectrum Scale (GPFS):</strong> enterprise-grade, more features than Lustre. Policy-based data placement, erasure coding. Used in IBM systems and some HPC installations.</li>
          <li><strong>WekaIO, VAST Data, NetApp:</strong> Newer generation all-flash parallel/distributed file systems. High performance, good GPU cluster support.</li>
        </ul>
        <p style={S.p}>
          Single-server NFS can be sufficient for small clusters, development, and testing. Large distributed-training environments may benefit from scale-out NFS, parallel file systems, or high-performance distributed storage depending on workload and I/O requirements.
        </p>
      </section>


      {/* ── SCHEDULER ─────────────────────────────────────────── */}
      <section id="scheduler">
        <h2 style={S.h2}>GPU Cluster Scheduler</h2>
        <p style={S.p}>
          The scheduler is a "traffic controller" for GPU cluster resources.
        </p>
        <p style={S.p}>
          <strong>Without scheduler:</strong> 10 teams, 1000 GPUs. Chaos, conflicts, unfair usage, over-allocation.
        </p>
        <p style={S.p}>
          <strong>With a scheduler:</strong> users/teams submit jobs → the scheduler maintains a queue → assigns jobs to available resources → enforces fair share policies.
        </p>
        <Figure caption="GPU Job Scheduling: Multiple users and teams submit AI jobs to the Job Queue. Scheduler (Slurm or Kubernetes) checks available GPU resources, applies priority and fair-share rules, and assigns jobs to available GPU Compute Nodes. Jobs that cannot run immediately wait in queue.">
          <GpuJobScheduling />
        </Figure>
        <p style={S.p}><strong>What scheduler manages:</strong></p>
        <ul style={S.ul}>
          <li>GPU allocation (how many GPUs, which nodes)</li>
          <li>CPU cores, system memory allocation</li>
          <li>Time limits per job</li>
          <li>User/project quotas and fair share</li>
          <li>Priority queues (research vs production vs debug)</li>
          <li>Gang scheduling: allocate all nodes of a multi-node job together</li>
          <li>Node health (scheduler marks unhealthy nodes as unavailable)</li>
        </ul>
      </section>

      {/* ── SLURM ─────────────────────────────────────────────── */}
      <section id="slurm">
        <h2 style={S.h2}>Slurm</h2>
        <p style={S.p}>
          <strong>Slurm (Simple Linux Utility for Resource Management)</strong> — the most widely used scheduler in HPC and AI clusters. The industry standard for on-premises GPU clusters, national labs, universities, and many enterprises.
        </p>
        <p style={S.p}><strong>Key concepts:</strong></p>
        <ul style={S.ul}>
          <li><strong>Partition (Queue):</strong> Logical grouping of nodes. "training" partition → high-memory GPU nodes. "inference" partition → inference-optimized. "debug" partition → small quick jobs.</li>
          <li><strong>Batch job:</strong> submit a job script, Slurm runs it when resources are available. The user does not need to stay online.</li>
          <li><strong>Gang scheduling:</strong> a 100-GPU job needs all 100 GPUs at once. Slurm supports this — there is also backfill scheduling where smaller jobs fill the gaps.</li>
          <li><strong>Fair share:</strong> tracks historical usage per user/project. Whoever has used more gets lower effective priority.</li>
        </ul>
        <p style={S.p}><strong>Common commands:</strong></p>
        <ul style={S.ul}>
          <li><code style={S.code}>sbatch job.sh</code> — submit a batch job</li>
          <li><code style={S.code}>srun python train.py</code> — interactive run</li>
          <li><code style={S.code}>squeue</code> — check job queue status</li>
          <li><code style={S.code}>sinfo</code> — cluster node status</li>
          <li><code style={S.code}>scancel &lt;job_id&gt;</code> — cancel a job</li>
          <li><code style={S.code}>sacct</code> — accounting, job history</li>
        </ul>
      </section>

      {/* ── KUBERNETES GPU ────────────────────────────────────── */}
      <section id="kubernetes-gpu">
        <h2 style={S.h2}>Kubernetes and GPU Workloads</h2>
        <p style={S.p}>
          <strong>Kubernetes</strong> — a container orchestration platform. Originally for microservices. Increasingly used for AI/ML workloads — especially inference serving.
        </p>
        <p style={S.p}><strong>GPU support:</strong> NVIDIA GPU Operator: automatically manages GPU drivers, container runtime, and DCGM monitoring. Resource request: specify <code style={S.code}>nvidia.com/gpu: 8</code> in the container spec → Kubernetes will schedule it on a node with 8 GPUs.</p>
        <ComparisonTable
          title="Slurm vs Kubernetes for GPU Workloads"
          headers={["Factor", "Slurm", "Kubernetes"]}
          rows={[
            ["Primary use", "HPC batch training jobs", "Containerized inference serving"],
            ["Gang scheduling", "Mature, excellent", "Improving (Volcano, Kueue)"],
            ["Autoscaling", "Limited", "Excellent"],
            ["Container support", "Via Singularity/OCI", "Native"],
            ["Deployment style", "Bare metal / HPC", "Cloud-native"],
            ["Learning curve", "HPC background helpful", "DevOps/K8s background helpful"],
            ["Best for", "Long training runs, on-prem clusters", "Inference, ML pipelines, cloud"],
          ]}
        />
        <Callout type="best-practice" title="A Hybrid Approach Is Common">
          Many production environments run both: Slurm for the training cluster, Kubernetes for inference serving. Gang scheduling is critical for training — Slurm is better. Autoscaling is critical for inference — Kubernetes is better.
        </Callout>
      </section>

      {/* ── JOB QUEUE ─────────────────────────────────────────── */}
      <section id="job-queue">
        <h2 style={S.h2}>GPU Job Queue and Resource Allocation</h2>
        <p style={S.p}>
          When resources are not available, jobs wait in the queue. This is normal and expected — it does not indicate a system problem.
        </p>
        <p style={S.p}><strong>Queue dynamics:</strong> a new job is submitted → the scheduler checks resources → if available: run now. If not: add to the queue, assign a position according to priority.</p>
        <p style={S.p}><strong>Queue ordering factors:</strong> Job priority, fair share (historical usage), job size (small jobs backfill through gang scheduling gaps), partition-specific policies, user/project quotas.</p>
        <p style={S.p}><strong>Resource fragmentation:</strong> in a 1000-GPU cluster with multiple jobs running, some GPUs sit idle because a large job doesn't have enough contiguous nodes available. Backfill scheduling: smaller jobs fill the empty gaps.</p>
        <p style={S.p}><strong>Preemption:</strong> when a high-priority job arrives, pause or cancel a lower-priority running job to free up resources. The preempted job resumes from its checkpoint.</p>
      </section>

      {/* ── MULTI-TENANCY ─────────────────────────────────────── */}
      <section id="multi-tenancy">
        <h2 style={S.h2}>Multi-Tenancy</h2>
        <p style={S.p}>
          <strong>Multi-Tenancy</strong> = multiple teams, projects, or users securely sharing the same physical GPU cluster.
        </p>
        <p style={S.p}>
          A company's research team, product team, infrastructure team — all share the GPU cluster. Dedicated clusters per team would be prohibitively expensive.
        </p>
        <p style={S.p}><strong>Multi-tenancy implementation:</strong></p>
        <ul style={S.ul}>
          <li><strong>Slurm:</strong> Per-user, per-project accounting, fair share, priority queues, partitions per team.</li>
          <li><strong>Kubernetes:</strong> Namespaces for isolation, resource quotas, LimitRanges, priority classes.</li>
          <li><strong>Chargeback/showback:</strong> track usage per team for billing or budget allocation. Visibility drives efficiency.</li>
          <li><strong>Container isolation:</strong> Kubernetes namespaces provide data and workload isolation — one team's pods cannot access another team's resources.</li>
        </ul>
        <p style={S.p}><strong>Multi-tenancy challenges:</strong> Fair resource distribution, performance isolation (noisy neighbor), priority conflicts (production vs research), security isolation (data separation).</p>
      </section>

      {/* ── GPU UTILIZATION ───────────────────────────────────── */}
      <section id="gpu-utilization">
        <h2 style={S.h2}>GPU Utilization</h2>
        <p style={S.p}>
          The GPU utilization metric needs to be understood carefully. There are common misconceptions.
        </p>
        <p style={S.p}>
          <strong>What GPU utilization means:</strong> As reported by nvidia-smi or DCGM — percentage of time in a sampling period that GPU's compute engines were active.
        </p>
        <p style={S.p}>
          <strong>What it does NOT mean:</strong> 100% utilization ≠ GPU performing at 100% efficiency. A GPU can show high utilization while being severely memory-bandwidth-bound (waiting for data from HBM) or communication-bound (waiting for AllReduce) — technically busy, but effectively constrained.
        </p>
        <p style={S.p}><strong>Metrics that matter more:</strong></p>
        <ul style={S.ul}>
          <li><strong>MFU (Model FLOP Utilization):</strong> Actual useful compute as fraction of theoretical peak FLOPS. Well-optimized large training jobs: 30–50% MFU typically. Very hard to reach 100%.</li>
          <li><strong>Training throughput:</strong> Tokens/second, samples/second — actual work done.</li>
          <li><strong>Memory bandwidth utilization:</strong> Is GPU HBM fully utilized?</li>
          <li><strong>AllReduce efficiency:</strong> Fraction of time in useful compute vs waiting for communication.</li>
          <li><strong>Data loading efficiency:</strong> GPU wait time for next training batch.</li>
        </ul>
        <Callout type="important" title="Low Utilization → Diagnose First">
          Low GPU utilization during training = something is wrong — but what? Profiling tells you: if the GPU is idle, why? Slow data loading (storage bottleneck)? Slow AllReduce (network bottleneck)? Genuinely compute-maxed (good!)? Each cause needs a different fix — a generic "improve GPU utilization" is misleading without profiling.
        </Callout>
      </section>

      {/* ── TRAINING WORKLOADS ────────────────────────────────── */}
      <section id="training-workloads">
        <h2 style={S.h2}>Training Workloads</h2>
        <p style={S.p}><strong>Characteristics:</strong> Long-running (hours to weeks), sustained high compute, large GPU memory (model + gradients + optimizer states), AllReduce every training step, continuous storage reads, sensitive to single-node failures, checkpointing required.</p>
        <p style={S.p}><strong>Training job lifecycle:</strong></p>
        <ol style={S.ol}>
          <li>Submit job to scheduler</li>
          <li>Scheduler allocates nodes (all at once — gang scheduling)</li>
          <li>Framework initializes on all nodes (PyTorch, TensorFlow)</li>
          <li>NCCL distributed communication group initialized</li>
          <li>Dataset located on shared storage</li>
          <li>Training loop: Read batch → forward pass → loss → backward → AllReduce → optimizer → next batch</li>
          <li>Periodically: Save checkpoint to storage</li>
          <li>Training completes → model saved to storage</li>
        </ol>
        <p style={S.p}><strong>Common training workload types:</strong> LLM pre-training (very large, weeks/months, thousands of GPUs), LLM fine-tuning (smaller, days, fewer GPUs), diffusion model training (variable), vision model training (variable).</p>
        <Callout type="important" title="Training Time Depends on Many Factors">
          Actual training time depends on model size, token count, dataset, sequence length, precision, parallelism strategy, checkpointing overhead, achieved MFU, and cluster efficiency. Specific training-time claims aren't accurate without a complete workload definition.
        </Callout>
      </section>

      {/* ── INFERENCE WORKLOADS ───────────────────────────────── */}
      <section id="inference-workloads">
        <h2 style={S.h2}>Inference Workloads</h2>
        <p style={S.p}>
          <strong>Inference = deploying a trained model to real users.</strong> Latency-sensitive, variable load, typically stateless, many simultaneous requests.
        </p>
        <ComparisonTable
          title="Training vs Inference Infrastructure"
          headers={["Factor", "Training", "Inference"]}
          rows={[
            ["Duration", "Days to months per run", "Continuous, indefinite"],
            ["GPU memory", "Very large (model + gradients + optimizer)", "Moderate (model weights only)"],
            ["Latency", "Not critical (batch compute)", "Very critical (user waiting)"],
            ["Scaling", "Fixed cluster for run", "Autoscales with traffic"],
            ["Fault tolerance", "Checkpointing + job restart", "Load balancer + auto-restart"],
            ["GPU type preferred", "H100, MI300X (high memory/BW)", "L4, A10G, Inferentia (cost-efficient)"],
            ["AllReduce", "Critical every training step", "Less critical (stateless requests)"],
          ]}
        />
        <p style={S.p}><strong>Inference optimization:</strong> Quantization (FP16 → INT8 → INT4 — reduces memory, increases throughput), TensorRT (NVIDIA inference engine), vLLM / TensorRT-LLM (optimized LLM serving), continuous batching (dynamic request batching).</p>
      </section>

      {/* ── DATA PARALLELISM ──────────────────────────────────── */}
      <section id="data-parallelism">
        <h2 style={S.h2}>Data Parallelism</h2>
        <p style={S.p}>
          Classic data parallelism replicates model states across participating GPUs and distributes different data batches between them.
        </p>
        <p style={S.p}>
          Modern approaches like FSDP (Fully Sharded Data Parallel) and ZeRO (Zero Redundancy Optimizer) can shard model states across GPUs — enabling bigger workloads than simple full-model replication.
        </p>
        <ul style={S.ul}>
          <li>Each GPU processes its own data batch → computes gradients</li>
          <li>AllReduce: all GPUs share gradients, receive the average</li>
          <li>All GPUs start the next step from the same updated model</li>
        </ul>
        <p style={S.p}><strong>PyTorch DDP (Distributed Data Parallel)</strong> is the most common implementation. Uses NCCL AllReduce.</p>
      </section>

      {/* ── MODEL PARALLELISM ─────────────────────────────────── */}
      <section id="model-parallelism">
        <h2 style={S.h2}>Model Parallelism</h2>
        <p style={S.p}>
          Model itself split across multiple GPUs. Each GPU holds part of the model. Used when model too large for single GPU.
        </p>
        <p style={S.p}><strong>Two main types:</strong></p>
        <ul style={S.ul}>
          <li><strong>Tensor Parallelism:</strong> split individual weight matrices across different GPUs</li>
          <li><strong>Pipeline Parallelism:</strong> split the model layer-by-layer across different GPU groups</li>
        </ul>
        <p style={S.p}>Common for LLM training (100B+ parameters). Often combined with data parallelism in 3D parallelism.</p>
      </section>

      {/* ── TENSOR PARALLELISM ────────────────────────────────── */}
      <section id="tensor-parallelism">
        <h2 style={S.h2}>Tensor Parallelism</h2>
        <p style={S.p}>
          Individual matrices (weight tensors) are split across multiple GPUs. Example: the large weight matrices (Q, K, V projections) of a Transformer attention layer — instead of one GPU holding the full matrix, split it across 4 GPUs — each GPU holds ¼.
        </p>
        <p style={S.p}>
          Tensor parallelism requires very high GPU-to-GPU bandwidth and low latency because constant communication happens during forward AND backward pass. It is often kept within an NVLink/NVSwitch domain when possible, but can also span nodes using high-speed InfiniBand or RoCE depending on the architecture.
        </p>
      </section>

      {/* ── PIPELINE PARALLELISM ──────────────────────────────── */}
      <section id="pipeline-parallelism">
        <h2 style={S.h2}>Pipeline Parallelism</h2>
        <p style={S.p}>
          Model split into "stages" — groups of consecutive layers. Each stage runs on different group of GPUs.
        </p>
        <p style={S.p}>
          Stage 1 (GPU group 1): Layers 1–N → Stage 2 (GPU group 2): Layers N+1–2N → Stage 3 (GPU group 3): Layers 2N+1–3N → ...
        </p>
        <p style={S.p}>
          Like a factory assembly line: Stage 1 processes Batch A, passes it to Stage 2. While Stage 2 processes Batch A, Stage 1 starts Batch B. "Pipeline bubble" = idle time at the start/end — reduced through micro-batching.
        </p>
        <p style={S.p}>
          Pipeline parallelism across nodes benefits from a high-bandwidth, low-latency interconnect such as InfiniBand or RoCE.
        </p>
        <p style={S.p}>
          <strong>3D Parallelism:</strong> Tensor Parallelism + Pipeline Parallelism + Data Parallelism simultaneously. 3D parallelism combines these three strategies to efficiently scale large distributed training workloads. Used for largest models (GPT-4 class). Frameworks: Megatron-LM (NVIDIA research), DeepSpeed (Microsoft).
        </p>
        <Figure caption="Distributed Training three strategies: Data Parallelism (same full model on each GPU, different data batches, AllReduce gradients — FSDP/ZeRO allows sharding model states for larger scale), Tensor Parallelism (one large weight matrix split across GPUs, constant communication needed — very high bandwidth required), Pipeline Parallelism (model layers split into stages across GPU groups like assembly line, micro-batching reduces idle time). 3D Parallelism combines all three for largest models.">
          <DistributedTraining />
        </Figure>
      </section>

      {/* ── CLUSTER SCALING ───────────────────────────────────── */}
      <section id="cluster-scaling">
        <h2 style={S.h2}>GPU Cluster Scaling</h2>
        <ul style={S.ul}>
          <li><strong>Vertical scaling:</strong> Better GPUs per server, more GPUs per server, faster NICs, more RAM — upgrade existing nodes.</li>
          <li><strong>Horizontal scaling:</strong> Add more GPU servers. More total GPUs. Network fabric expansion required. More storage bandwidth needed.</li>
          <li><strong>Network scaling:</strong> more nodes = more switch ports. Add leaf switches. Upgrade or add spine switches. Maintain bandwidth-per-server.</li>
          <li><strong>Storage scaling:</strong> More nodes = more parallel storage I/O needed. Add more OSS nodes to Lustre. Scale-out storage.</li>
        </ul>
        <p style={S.p}><strong>Scaling limits:</strong> Network bandwidth (AllReduce overhead grows at very large scale — though ring-AllReduce limits this), storage throughput (all nodes reading simultaneously), scheduler complexity (thousands of nodes), synchronization overhead.</p>
        <p style={S.p}><strong>Cluster size categories (approximate):</strong></p>
        <ul style={S.ul}>
          <li><strong>Small (8–64 GPUs):</strong> Research lab, startup. Simple networking. NFS may work for development. Slurm basic config.</li>
          <li><strong>Medium (128–1,024 GPUs):</strong> Department AI team. Leaf-spine network. Parallel file system recommended. Slurm fair share policies.</li>
          <li><strong>Large (1,000+ GPUs):</strong> Enterprise or hyperscaler. Multi-tier fat-tree. High-performance parallel file system mandatory. Sophisticated scheduler. Liquid cooling increasingly needed. Dedicated AI infrastructure team.</li>
        </ul>
      </section>


      {/* ── POWER REQUIREMENTS ────────────────────────────────── */}
      <section id="power-requirements">
        <h2 style={S.h2}>Power Requirements</h2>
        <p style={S.p}>GPU clusters are power-intensive. Power planning is essential for data center operations engineers.</p>
        <Figure caption="Power and Cooling infrastructure for GPU Cluster: Power chain from Utility Grid through Transformer, UPS (battery backup), Generator, PDU to GPU Servers. Cooling chain through Facility Cooling Plant, CDU (separates facility water from IT loop), Rack Manifold, Cold Plates on GPUs. CDU separation protects IT equipment from facility water chemistry. Air cooling shown as alternative for lower density deployments.">
          <PowerCoolingDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Power hierarchy:</strong> Utility grid → Transformers → Main switchgear → UPS → Distribution boards → PDUs → Server PSUs → GPUs</li>
          <li><strong>GPU server power:</strong> Varies significantly by GPU generation, number of GPUs per server, CPU/memory/NIC configuration, workload (idle vs peak training). Design from actual measured power draw — not nameplate TDP alone, and not assumed averages.</li>
          <li><strong>32-node DGX H100 example:</strong> 32 × 10.2 kW = 326.4 kW compute load at the stated maximum per-node rating. Networking, storage, management, and other infrastructure loads must be calculated separately. The final IT load should be based on actual equipment specifications and deployment requirements.</li>
          <li><strong>UPS:</strong> UPS systems protect critical GPU infrastructure from power interruptions and disturbances and provide continuity during transitions to alternate/generator power sources. N+1 or 2N UPS configurations for critical AI infrastructure. Runtime: typically 10–15 minutes — enough for generators to start.</li>
          <li><strong>PDUs:</strong> intelligent/managed PDUs are recommended — per-outlet metering, remote switching, load monitoring. Dual PDU feeds per rack for redundancy. Phase balancing is important. Power distribution must follow the server manufacturer's approved electrical configuration, rack PDU ratings, breaker capacity, redundancy requirements, and applicable electrical standards/codes.</li>
        </ul>
      </section>

      {/* ── COOLING REQUIREMENTS ──────────────────────────────── */}
      <section id="cooling-requirements">
        <h2 style={S.h2}>Cooling Requirements</h2>
        <p style={S.p}>
          Power density and cooling are closely linked. All that electrical power → heat that must be removed.
        </p>
        <p style={S.p}>
          Air-cooling capability depends on server design, rack airflow, inlet temperature, containment, CRAH/CRAC capacity, and facility design. High-density GPU deployments may require rear-door heat exchangers, direct liquid cooling, or other high-density cooling technologies.
        </p>
        <p style={S.p}><strong>Liquid cooling architecture:</strong></p>
        <ul style={S.ul}>
          <li><strong>Facility Cooling Water:</strong> Utility water/chiller output</li>
          <li><strong>CDU (Cooling Distribution Unit):</strong> a separator between the facility water and the IT liquid loop. The secondary loop protects IT equipment from facility water chemistry. Depends on the deployment architecture.</li>
          <li><strong>Rack Liquid Manifold:</strong> distributes coolant to each server; leak detection is critical here.</li>
          <li><strong>Cold Plates on GPU Chips:</strong> coolant absorbs GPU heat directly — much more efficient than air for high heat flux.</li>
          <li><strong>Warm Coolant Return:</strong> Heat carry back to CDU for rejection.</li>
        </ul>
        <p style={S.p}>
          Liquid cooling deployment architectures vary — no installation is identical. Verify the GPU server's liquid cooling support, CDU compatibility, and facility water quality requirements before planning.
        </p>
        <p style={S.p}>
          Liquid cooling can improve thermal efficiency and enable higher rack density, but it does not guarantee a particular PUE value. PUE is a facility-level metric influenced by the complete power and cooling architecture, climate, chiller efficiency, pumps, cooling towers, CDUs, airflow management, and IT load.
        </p>
        <Callout type="important" title="Cooling Infrastructure Planning — Before Hardware Procurement">
          Cooling infrastructure must be planned before — or simultaneously with — GPU hardware procurement. Retrofitting cooling for a high-density GPU cluster in an existing facility is expensive and disruptive. Cooling needs depend on the GPU server's power draw, facility cooling capacity, and the server manufacturer's guidance.
        </Callout>
      </section>

      {/* ── RELIABILITY ───────────────────────────────────────── */}
      <section id="reliability">
        <h2 style={S.h2}>Reliability and Failure Handling</h2>
        <p style={S.p}>
          <strong>The key mindset shift:</strong> in traditional enterprise IT, a server failure is an incident. In GPU cluster operations, hardware failure is an expected, routine event. Systems and processes need to be designed to handle it automatically.
        </p>
        <p style={S.p}>
          A single node failure does not necessarily bring down the entire cluster, but a distributed training job using that node may fail unless the training framework supports fault tolerance or elastic recovery. Checkpoints can then be used to restart or resume the workload.
        </p>
        <p style={S.p}><strong>Sources of failures:</strong></p>
        <ul style={S.ul}>
          <li><strong>GPU hardware:</strong> ECC correctable errors (auto-fixed, monitor trend), ECC uncorrectable errors (hard failure — remove from service), XID errors, GPU hang.</li>
          <li><strong>Network:</strong> NIC failures, cable/transceiver degradation, switch port issues.</li>
          <li><strong>Storage:</strong> Drive failures, storage server issues, filesystem errors.</li>
          <li><strong>Power:</strong> PSU failures (dual PSU mitigates), PDU issues, power transients.</li>
          <li><strong>Cooling:</strong> Temperature alerts → GPU throttling → performance degradation.</li>
        </ul>
        <p style={S.p}><strong>Failures at scale in a large cluster:</strong> at large cluster scale, even relatively low individual-component failure rates can translate into regular hardware failures. This is expected, not exceptional — cluster design must accommodate it.</p>
        <p style={S.p}><strong>Failure response process:</strong></p>
        <ol style={S.ol}>
          <li>Alert fires → on-call engineer</li>
          <li>Identify affected component</li>
          <li>Drain node from scheduler (mark "down" — no new jobs)</li>
          <li>Active jobs on the affected node: fail and re-queue from checkpoint</li>
          <li>Root cause analysis (XID errors check, DCGM diagnostics, GPU diagnostic tools)</li>
          <li>Repair/replacement (hot-swap where possible)</li>
          <li>Validation before returning to service</li>
        </ol>
      </section>

      {/* ── REDUNDANCY ────────────────────────────────────────── */}
      <section id="redundancy">
        <h2 style={S.h2}>Redundancy and High Availability</h2>
        <ul style={S.ul}>
          <li><strong>Server level:</strong> Dual PSU (one fails → other takes over), ECC memory (correctable errors auto-fixed).</li>
          <li><strong>Network level:</strong> Dual management network connections, redundant spine switches (multiple paths), storage network redundancy.</li>
          <li><strong>Storage level:</strong> RAID/erasure coding in storage servers, storage node redundancy (Lustre OSS N+1), checkpoint replication to secondary durable storage.</li>
          <li><strong>Power level:</strong> Dual PDU feeds per rack, N+1 UPS modules, N+1 or 2N generators.</li>
          <li><strong>Cluster level:</strong> Job scheduler handles node failures automatically, multiple head/management nodes for scheduler HA, checkpoint-based job resumption.</li>
        </ul>
        <p style={S.p}><strong>High Availability for Inference:</strong> inference services need higher HA (users are waiting). A load balancer in front, multiple inference server replicas, auto-restart on failure, rolling updates.</p>
      </section>

      {/* ── MONITORING ────────────────────────────────────────── */}
      <section id="monitoring">
        <h2 style={S.h2}>Monitoring and Observability</h2>
        <p style={S.p}>
          "You can't manage what you can't measure." GPU cluster monitoring tracks multiple layers simultaneously.
        </p>
        <Figure caption="GPU Cluster Monitoring Stack: GPU servers, network, storage, and power/cooling metrics collected by DCGM, node exporters, storage exporters, and PDU/BMS sensors. All metrics flow to Prometheus for storage and alerting. Grafana dashboards for visualization. Alertmanager routes alerts to on-call engineers via PagerDuty or Slack.">
          <ClusterMonitoring />
        </Figure>
        <p style={S.p}><strong>Key GPU metrics (via DCGM):</strong></p>
        <ComparisonTable
          title="GPU Health Metrics to Monitor"
          headers={["Metric", "What it tells", "Alert guidance"]}
          rows={[
            ["GPU Temperature", "Thermal health", "Monitor against platform-specific manufacturer limits. Thermal throttling can result from temperature, power, airflow, or platform conditions."],
            ["GPU Utilization", "Is GPU busy", "Low utilization during running job = investigate bottleneck"],
            ["GPU Memory Utilization", "Memory usage", "Near 100% = potential OOM risk"],
            ["ECC Correctable errors", "Memory degradation trend", "Increasing rate = plan replacement proactively"],
            ["ECC Uncorrectable errors", "Hard memory failure", "Any occurrence = remove from service, investigate"],
            ["NVLink bandwidth", "Intra-server GPU comm", "Low vs expected = NVLink issue (platform-specific)"],
            ["Power draw", "Energy consumption", "Significantly below TDP = possible GPU throttled"],
            ["Clock speed", "Performance throttling", "Below base clock = active throttle"],
          ]}
        />
        <p style={S.p}><strong>Monitoring stack:</strong> DCGM Exporter + Node Exporter → Prometheus → Grafana → Alertmanager → PagerDuty/Slack. Log aggregation: ELK stack or Loki + Grafana.</p>
      </section>

      {/* ── COMMON PROBLEMS ───────────────────────────────────── */}
      <section id="common-problems">
        <h2 style={S.h2}>Common GPU Cluster Problems</h2>
        <ComparisonTable
          headers={["Problem", "Common Causes", "Diagnosis / Fix"]}
          rows={[
            ["Low GPU utilization during training", "Data loading slow, AllReduce bottleneck, batch size too small, CPU preprocessing bottleneck", "Profile with Nsight Systems. Check DCGM timeline — where is GPU idle? Fix specific bottleneck."],
            ["Training job crashes without error", "GPU OOM, NVLink error, ECC uncorrectable, NCCL timeout, driver crash", "Check XID errors (dmesg, DCGM), NCCL debug output (NCCL_DEBUG=INFO), GPU health report."],
            ["Specific node always failing", "GPU hardware fault, NIC degraded, cable fault, storage access issue", "Run GPU diagnostic tools, network throughput test, storage test specifically from that node."],
            ["AllReduce slower than expected", "Network misconfiguration, IB link degradation, switch congestion, NUMA config", "NCCL_DEBUG=INFO logs, InfiniBand port counters, switch port counters, NCCL topo hints."],
            ["Jobs stuck in queue", "Insufficient resources, node failures reducing capacity, job requesting impossible resources", "squeue/sinfo (Slurm), check node drain reasons, resource request vs available comparison."],
            ["Storage throughput degraded", "Other jobs I/O interference, storage node failure, network issue", "Storage system I/O monitoring, other job I/O check, storage node health, network path check."],
            ["GPU temperature rising", "Cooling issue, airflow blockage, new workload higher power, power capping", "Coolant inlet temp, flow rate, airflow (cable management), power cap settings."],
          ]}
        />
      </section>

      {/* ── COMMON MISTAKES ───────────────────────────────────── */}
      <section id="common-mistakes">
        <h2 style={S.h2}>Common Design Mistakes</h2>
        <ul style={S.ul}>
          <li><strong>1. GPU cluster = just servers:</strong> plan every layer from day one — compute, network, storage, power, cooling, operations. Ignore any layer → a problem.</li>
          <li><strong>2. Underestimating power density:</strong> design from actual server TDP specs, not historical averages. Headroom is essential — target 80% or less loading of equipment ratings for a safety margin.</li>
          <li><strong>3. Mixing management and compute networks:</strong> separate NICs, switches, VLANs — mandatory. A problem in one shouldn't impact the other.</li>
          <li><strong>4. Oversubscribed network fabric:</strong> limited AllReduce bandwidth → training slows despite active GPUs. Design a non-blocking or low-oversubscription fat-tree according to workload requirements.</li>
          <li><strong>5. Ignoring storage throughput:</strong> benchmark from actual workload requirements. Don't jump directly to production-scale training on NFS without testing.</li>
          <li><strong>6. No checkpointing policy:</strong> Hardware failure → restart from zero → days/weeks of compute lost. Enforce checkpointing, test restore before long jobs.</li>
          <li><strong>7. Liquid cooling without leak detection:</strong> Liquid leak → equipment damage. Leak detection sensors at every connection point, rack level, room level. Automatic shutoff valves.</li>
          <li><strong>8. No GPU health monitoring from day one:</strong> Silent degradation, ECC trends invisible. DCGM from day one mandatory.</li>
          <li><strong>9. Single head node:</strong> Head node fail = cluster scheduling stops. Slurm HA with backup controller, Kubernetes 3-node control plane.</li>
          <li><strong>10. Not testing failure scenarios before production:</strong> Tabletop exercises. Actual failover tests before production. First failure during production = scrambling.</li>
        </ul>
      </section>

      {/* ── BEST PRACTICES ────────────────────────────────────── */}
      <section id="best-practices">
        <h2 style={S.h2}>Best Practices</h2>
        <ul style={S.ul}>
          <li><strong>Design for failure:</strong> hardware failures are expected — checkpoint, scheduler fault tolerance, monitoring, runbooks are mandatory.</li>
          <li><strong>Separate networks:</strong> management always physically separate. Compute and storage separation depends on workload requirements.</li>
          <li><strong>Network fabric matched to workload:</strong> non-blocking or a carefully engineered low-oversubscription fabric for distributed training. Base the architecture on workload requirements.</li>
          <li><strong>Parallel file system for production:</strong> NFS is fine for development/testing. Production training: Lustre, GPFS, or equivalent.</li>
          <li><strong>Liquid cooling plan first:</strong> Plan before GPU hardware procurement, not after. Verify manufacturer guidance, facility capacity, CDU architecture.</li>
          <li><strong>Monitoring before production:</strong> DCGM, network monitoring, storage monitoring — configured and alerting tested before the first production job.</li>
          <li><strong>Enforce checkpointing:</strong> Policy-level enforcement — not just recommendation. Test checkpoint restore before long runs.</li>
          <li><strong>Container-based workloads:</strong> Reproducibility, dependency isolation, easy migration.</li>
          <li><strong>MLOps from day one:</strong> Experiment tracking (W&B, MLflow), model versioning, reproducible training runs.</li>
          <li><strong>Runbooks for common failures:</strong> Written, tested, accessible. GPU failure, network issue, storage degradation, power event — all covered.</li>
          <li><strong>Spare parts inventory:</strong> InfiniBand cables/transceivers, spare NICs, drives for storage. Mean Time To Repair matters.</li>
          <li><strong>Profile before scaling:</strong> understand the bottleneck (compute? memory? network? storage?) before adding more GPUs.</li>
        </ul>
      </section>

      {/* ── INTERVIEW QUESTIONS ───────────────────────────────── */}
      <section id="interview-questions">
        <h2 style={S.h2}>Interview Questions</h2>

        {[
          {
            q: "What is the fundamental difference between a GPU Cluster and simply 'many GPUs connected'?",
            a: "A GPU Cluster is not just a hardware connection. A production cluster has: the compute layer (GPU servers), high-speed networking (InfiniBand/RoCE for inter-node), storage (parallel file systems), the management layer (out-of-band BMC/IPMI network), the scheduling layer (Slurm/Kubernetes), the monitoring layer (DCGM, metrics, alerting), power infrastructure (UPS, PDUs, generators), and cooling infrastructure. Simply wiring servers together does not create a reliable, efficient, manageable cluster — every layer needs proper design and integration.",
          },
          {
            q: "What exactly is the difference between NVLink, NVSwitch, InfiniBand, and RoCE?",
            a: "NVLink — NVIDIA's proprietary intra-server GPU-to-GPU interconnect. In traditional DGX/HGX systems, high-bandwidth communication between GPUs within the same node. In the newer GB200 NVL72 rack-scale architecture, the NVLink domain extends across multiple compute trays. NVSwitch — a dedicated chip that switches NVLink connections, enabling any-to-any full-bandwidth communication within the NVLink domain. InfiniBand — inter-server cluster networking. A purpose-built HPC/AI protocol, very low latency, native RDMA, multi-vendor. RoCE — inter-server networking using standard Ethernet with RDMA. Less expensive than IB, multi-vendor. Both can exist simultaneously in a GPU cluster at different layers. Scale-out between rack-scale systems still requires InfiniBand or Ethernet.",
          },
          {
            q: "What is East-West traffic and what is its impact on network design?",
            a: "East-West traffic = servers communicating directly with each other (peer-to-peer), as opposed to client-server (North-South). During AllReduce in GPU clusters, all GPU servers simultaneously exchange gradient data — massive horizontal traffic between all nodes. Network impact: standard networks designed for North-South traffic (high oversubscription at the spine) fail for GPU clusters. Large distributed-training clusters often require a non-blocking or carefully engineered low-oversubscription network because collective communication generates very high East-West traffic. Select the architecture based on workload requirements. Oversubscribed network → AllReduce bottleneck → GPU utilization drops dramatically despite GPUs being active.",
          },
          {
            q: "When do you use data parallelism, tensor parallelism, and pipeline parallelism?",
            a: "Data Parallelism: the classic approach replicates model states across participating GPUs and distributes different data batches. Modern FSDP/ZeRO can shard model states — enabling bigger workloads than simple full-model replication. Tensor Parallelism: split individual weight matrices across different GPUs. Needs very high GPU-to-GPU bandwidth and low latency — often kept within the NVLink/NVSwitch domain when possible, or high-speed IB/RoCE across servers. Constant communication during every forward and backward pass. Pipeline Parallelism: split model layers into stages across different GPU groups. Reduce the pipeline bubble through micro-batching. Benefits from high-bandwidth, low-latency interconnect such as InfiniBand or RoCE. 3D Parallelism: combines all three — data + tensor + pipeline. Efficiently scales large distributed training workloads. Megatron-LM, DeepSpeed frameworks.",
          },
          {
            q: "Why is checkpointing critical in a GPU cluster?",
            a: "Hardware failures at cluster scale are expected, not exceptional. A single node failure does not necessarily bring down the entire cluster, but a distributed training job using that node may fail unless the framework supports fault tolerance or elastic recovery. In a multi-week training run, restarting from zero after a single failure means days/weeks of expensive compute lost. A checkpoint = a periodic save of model weights, optimizer states, and RNG state. On failure, resume from the last checkpoint. Checkpoint frequency is selected by balancing checkpoint overhead (write time) against the amount of training work the organization is willing to lose after a failure. Test checkpoint restore before long jobs — a corrupted checkpoint is false confidence.",
          },
          {
            q: "Why should the management network be kept separate in a GPU cluster?",
            a: "Three key reasons: Security — training traffic (sensitive model weights, proprietary data) and management traffic (admin SSH, monitoring) should be separate. Reliability — access should remain available via the management network while troubleshooting a compute network issue. Even if the compute network is down, you can still remotely access, power cycle, and diagnose the server via BMC/IPMI. Performance — allowing management traffic (monitoring, console access) on the compute network can impact AllReduce performance. Implementation: dedicated management NICs (1 GbE) on each GPU server, separate switches, and a BMC port on a completely separate out-of-band management network.",
          },
        ].map((item, i) => (
          <div key={i} style={{ borderLeft: "4px solid #0891b2", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
            <p style={{ fontWeight: 700, color: "#0c4a6e", marginBottom: "0.5rem" }}>Q: {item.q}</p>
            <p style={S.p}>{item.a}</p>
          </div>
        ))}
      </section>

      {/* ── GLOSSARY ──────────────────────────────────────────── */}
      <section id="glossary">
        <h2 style={S.h2}>Glossary</h2>
        <ComparisonTable
          headers={["Term", "Simple Definition"]}
          rows={[
            ["AllReduce", "A collective operation in which all participating GPUs share their data, aggregate it, and everyone receives the result. The core operation of gradient sync in distributed training."],
            ["BMC (Baseboard Management Controller)", "A server chip for out-of-band management. Provides remote access — power cycle, console, health status — even when the OS crashes."],
            ["CDU (Cooling Distribution Unit)", "A separator unit between the facility water and IT liquid cooling loops. The secondary loop protects IT equipment."],
            ["CRAC/CRAH", "Computer Room Air Conditioning/Handling unit. Traditional data center air cooling. Insufficient at high density in GPU clusters."],
            ["CUDA", "NVIDIA's GPU programming platform. AI frameworks run code on the GPU through CUDA."],
            ["Data Parallelism", "A distributed training approach: model states (or shards via FSDP/ZeRO) on every GPU, with different data batches on each."],
            ["DCGM", "NVIDIA Data Center GPU Manager. GPU health metrics, ECC errors, utilization — for cluster-wide monitoring."],
            ["DDP (Distributed Data Parallel)", "PyTorch's data parallelism framework. Uses NCCL AllReduce."],
            ["ECC (Error Correcting Code)", "Memory error detection and correction. Correctable (single-bit, auto-fixed), uncorrectable (multi-bit, GPU action required)."],
            ["Fat-tree topology", "Cluster network design. Leaf-spine architecture providing high bisection bandwidth."],
            ["FSDP (Fully Sharded Data Parallel)", "PyTorch framework that shards model states across GPUs — enables larger models than simple data parallelism replication."],
            ["GPUDirect RDMA", "The GPU sends/receives data directly over the network, bypassing the CPU. For cluster-wide GPU-to-GPU communication."],
            ["GPUDirect Storage", "The GPU reads data directly from supported storage, bypassing CPU memory. Requires supported storage, filesystem, NIC/PCIe topology, drivers, and software configuration."],
            ["HBM (High Bandwidth Memory)", "The GPU's on-package ultra-fast memory. Model weights, activations, and gradients live here during compute."],
            ["InfiniBand (IB)", "High-performance specialized cluster networking. Low latency, high bandwidth, native RDMA. NVIDIA-dominant."],
            ["Kubernetes", "A container orchestration platform. Used with the NVIDIA GPU Operator for GPU workloads."],
            ["Leaf switch", "The lower-tier switch in a fat-tree that connects directly to servers."],
            ["Lustre", "Open-source parallel file system for HPC/AI clusters. MDS + MDT (metadata) + OSS + OST (data)."],
            ["MFU (Model FLOP Utilization)", "Actual useful compute as fraction of theoretical peak FLOPS. Better training efficiency metric than raw GPU utilization."],
            ["NCCL", "NVIDIA Collective Communications Library. AllReduce, AllGather etc. for distributed training. Topology-aware."],
            ["NIC (Network Interface Card)", "A server's network adapter. GPU servers have multiple NICs — for management and for high-speed compute."],
            ["NVLink", "NVIDIA proprietary GPU-to-GPU interconnect. Primarily intra-server; extended to rack-scale in GB200 NVL72 architecture."],
            ["NVSwitch", "NVIDIA chip enabling all-to-all NVLink connectivity within a server or rack-scale NVLink domain."],
            ["NVMe (Non-Volatile Memory Express)", "Fast SSD interface over PCIe. Local server storage — OS, framework, local checkpoints."],
            ["PCIe (Peripheral Component Interconnect Express)", "Standard bus interface for CPU-to-GPU, CPU-to-NIC, CPU-to-NVMe within server. Also supports PCIe P2P on compatible platforms."],
            ["Pipeline Parallelism", "Splitting model layers into consecutive stages across GPU groups. Micro-batching reduces the pipeline bubble."],
            ["RDMA (Remote Direct Memory Access)", "Direct memory access over the network, bypassing CPU overhead. Both InfiniBand and RoCE support RDMA."],
            ["RCCL", "AMD's Collective Communications Library. AMD's equivalent of NCCL. For AMD GPU distributed training."],
            ["RoCE (RDMA over Converged Ethernet)", "RDMA over standard Ethernet infrastructure. Less expensive than IB; requires lossless Ethernet configuration."],
            ["Slurm", "Standard HPC/AI cluster job scheduler. Gang scheduling, fair share, partitions, accounting."],
            ["Spine switch", "The upper-tier switch in a fat-tree that interconnects the leaf switches."],
            ["Tensor Parallelism", "Splitting individual weight tensors/matrices across multiple GPUs. Requires very high GPU-to-GPU bandwidth."],
            ["ToR (Top-of-Rack) switch", "A switch inside a rack that connects that rack's servers to the cluster network and forwards traffic toward the leaf/spine fabric."],
            ["XID error", "An NVIDIA GPU error code. Indicates a GPU driver or hardware issue. Meaning is type-specific."],
            ["ZeRO (Zero Redundancy Optimizer)", "Sharding model and optimizer states across GPUs — reduces memory footprint, enables larger model training."],
          ]}
        />
      </section>

      {/* ── KEY TAKEAWAYS ─────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li><strong>A GPU Cluster is a complete system, not just a collection of servers:</strong> compute, networking (compute + management), storage, scheduling, monitoring, power, cooling, operations — all layers together make a production GPU cluster. Neglect any layer → a system problem.</li>
          <li><strong>The management network and compute network should always be kept separate:</strong> management (BMC, monitoring, OS access) on physically separate NICs and switches. An issue in one shouldn't impact the other. Critical for troubleshooting when there's a compute network issue.</li>
          <li><strong>NVLink, InfiniBand, RoCE, PCIe — different technologies, different roles:</strong> NVLink = NVIDIA intra-server/rack-scale NVLink domain GPU interconnect. InfiniBand/RoCE = inter-server cluster fabric. PCIe = CPU-to-device within a server. All can exist simultaneously in a cluster at different layers. Scale-out between systems still requires InfiniBand or Ethernet.</li>
          <li><strong>East-West traffic dominates GPU cluster network design:</strong> AllReduce = massive horizontal GPU-to-GPU traffic. Large distributed-training clusters often require a non-blocking or low-oversubscription fabric. Oversubscribed network → AllReduce bottleneck → training throughput drops dramatically.</li>
          <li><strong>Available GPU Memory ≠ Maximum Model Size:</strong> the actual model size supported depends on inference vs training, precision, quantization, optimizer states, gradients, activations, batch size, framework overhead, and parallelism strategy. In training, an 80 GB model does not fit on an 80 GB GPU.</li>
          <li><strong>Checkpointing is mandatory, not optional:</strong> a single node failure can fail a distributed training job. Resume from checkpoint — not from zero. Balance checkpoint frequency against overhead vs acceptable loss. Test restore before long runs.</li>
          <li><strong>GPU utilization is not just one number:</strong> raw GPU utilization (nvidia-smi) ≠ efficiency. A GPU can show high utilization while being memory-bound or communication-bound. Understand actual performance through MFU, training throughput, and component-wise profiling.</li>
          <li><strong>Choose distributed training parallelism correctly:</strong> data parallelism (classic replication or FSDP/ZeRO sharding) — the simplest. Tensor parallelism — needs very high bandwidth. Pipeline parallelism — for very large models. 3D parallelism combines all three to efficiently scale large distributed workloads.</li>
          <li><strong>Hardware failures at scale are expected events:</strong> design for it — not just against it. Scheduler fault tolerance, checkpoint recovery, proactive monitoring, runbooks for common failures — first-class requirements. Large clusters mean hardware failures happen regularly.</li>
          <li><strong>Plan power and cooling before cluster hardware:</strong> retrofitting cooling is expensive and disruptive. Follow manufacturer specs and applicable codes for power distribution. Liquid cooling is increasingly important for high-density deployments — plan CDU architecture carefully.</li>
        </ul>
      </section>

    </article>
  );
}
