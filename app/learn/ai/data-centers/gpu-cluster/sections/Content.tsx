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
          <TopicLink slug="ai-data-center-basics" variant="inline" /> article mein aapne samjha ki ek AI data center kya hota hai — buildings, power, cooling, networking, storage. Usme ek concept baar baar aaya: GPU Cluster.
        </p>
        <p style={S.p}>
          GPU Cluster ek aise computing infrastructure hai jisme multiple GPU servers high-speed networking se connect hoke, common storage se data access karte hue, ek centralized scheduler ke through jobs run karte hain — collectively ek bade parallel computing machine ki tarah.
        </p>
        <p style={S.p}>
          GPU Cluster sirf "many GPUs connected together" nahi hai. Ek production cluster mein compute, networking, storage, scheduling, monitoring, power, cooling, aur operations sab milake kaam karte hain. Yeh article woh poori picture explain karta hai — hardware se leke software tak, beginner se leke engineer tak.
        </p>
      </section>

      {/* ── WHO SHOULD READ ───────────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>Beginners aur Students</strong> — GPU kya hota hai, cluster kya hoti hai, andar kya hota hai — zero se samjhenge.</li>
          <li><strong>Data Center Engineers</strong> — Power, cooling, rack design, network cabling, infrastructure impact — physical layer pe focus.</li>
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
          <li>GPU kya hai, CPU se kaise alag hai, AI ke liye kyun suited hai</li>
          <li>GPU Server / AI Compute Node ke andar kya hota hai</li>
          <li>Single GPU → Multi-GPU Server → GPU Cluster → AI Data Center hierarchy</li>
          <li>GPU Cluster ke sabhi building blocks</li>
          <li>Network architecture — management vs compute, InfiniBand vs RoCE vs NVLink vs PCIe — correctly distinguished</li>
          <li>East-West traffic concept aur why it changes network design</li>
          <li>Storage architecture — parallel file systems, checkpoint storage, data locality</li>
          <li>Job scheduling — Slurm, Kubernetes, job queues, multi-tenancy</li>
          <li>GPU utilization — what it really means and how to measure performance correctly</li>
          <li>Distributed AI training — data parallelism, tensor parallelism, model parallelism, pipeline parallelism</li>
          <li>Power aur cooling — rack density, liquid cooling architecture, CDU, PUE</li>
          <li>Reliability, failure handling, redundancy</li>
          <li>Monitoring aur observability</li>
          <li>Common mistakes aur best practices</li>
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
          Ek bakery analogy se shuru karte hain.
        </p>
        <p style={S.p}>
          Ek bakery mein ek hi expert chef hai. Woh ek din mein 500 loaves bana sakta hai. Chhoti bakery ke liye kaafi hai.
        </p>
        <p style={S.p}>
          Ab socho customer demand aachanak 50,000 loaves per day ho gayi. Aap 100 chefs hire karte ho, unhe ek badi kitchen mein rakhte ho, har chef ko specific kaam dete ho, aur ek manager rakhte ho jo coordinate kare.
        </p>
        <p style={S.p}>
          Yeh 100 chefs ka coordinated kitchen = <strong>GPU Cluster</strong>.
        </p>
        <p style={S.p}>
          Har chef = ek GPU server. Kitchen = cluster. Manager = scheduler. Raw materials = data. Finished product = trained AI model.
        </p>
        <p style={S.p}>
          Lekin ek baat important hai: sirf 100 chefs hire karne se kaam nahi chalega. Kitchen mein ingredient storage chahiye (storage), chefs ke beech communication system chahiye (networking), kitchen ka temperature control chahiye (cooling), bijli chahiye (power), koi performance track kare (monitoring). Yeh sab milake ek complete GPU cluster banata hai.
        </p>
        <Figure caption="GPU Cluster hierarchy: GPU chip → GPU Compute Node (GPU Server) → GPU Rack → GPU Cluster → AI Data Center. Har level neeche wale sab kuch contain aur depend karta hai.">
          <GpuClusterHierarchy />
        </Figure>
      </section>

      {/* ── WHAT IS A GPU CLUSTER ─────────────────────────────── */}
      <section id="what-is-gpu-cluster">
        <h2 style={S.h2}>What Is a GPU Cluster?</h2>
        <p style={S.p}>
          <strong>GPU Cluster</strong> ek computing infrastructure hai jisme multiple GPU servers (AI Compute Nodes) high-speed networking se interconnect hote hain, common storage access karte hain, ek centralized scheduler ke through jobs run karte hain, aur collectively ek bade parallel computing machine ki tarah behave karte hain.
        </p>
        <Callout type="important" title="GPU Cluster ≠ Sirf 'Many GPUs Connected Together'">
          Yeh ek common galat samajh hai. Sirf servers ko wire karne se cluster nahi banta. Ek production GPU cluster mein compute layer, high-speed networking, shared storage, management layer (out-of-band), scheduling layer, monitoring layer, power infrastructure, cooling infrastructure, aur operations systems — sab milake kaam karte hain. Koi bhi layer neglect karo → system problem.
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
          Ek GPU aaj bahut powerful hai. Toh ek GPU se kaam kyun nahi chalta?
        </p>
        <p style={S.p}>
          <strong>Kyunki modern AI models ek GPU pe fit nahi hote.</strong>
        </p>
        <p style={S.p}>
          Ek H100 GPU ke paas 80 GB HBM3 memory hai. LLaMA 3 70B model — sirf model weights store karne ke liye FP16 precision mein approximately 140 GB memory chahiye. Ek H100 pe fit hi nahi hota.
        </p>
        <p style={S.p}>
          Training ke liye sirf weights nahi — gradients, optimizer states, activations bhi store karne padte hain. Memory requirement 3–4× ho jaati hai sirf model size se.
        </p>
        <p style={S.p}><strong>Clusters se kya milta hai:</strong></p>
        <ul style={S.ul}>
          <li><strong>Distributed memory:</strong> 8 H100 GPUs = 640 GB total GPU memory. 64 H100s = 5.12 TB. Large models fit ho jaate hain model parallelism ke through.</li>
          <li><strong>Speed:</strong> Same work multiple GPUs pe parallelize karo — weeks instead of years.</li>
          <li><strong>Scale for experiments:</strong> Multiple experiments parallel run karo.</li>
          <li><strong>Inference throughput:</strong> Thousands of simultaneous user requests serve karo.</li>
        </ul>
      </section>

      {/* ── GPU VS CPU ────────────────────────────────────────── */}
      <section id="gpu-vs-cpu">
        <h2 style={S.h2}>GPU vs CPU for AI Workloads</h2>
        <p style={S.p}>
          <strong>CPU (Central Processing Unit)</strong> — ek intelligent generalist hai. Complex decision making, branching logic, sequential tasks, OS management — sab kuch kar sakta hai. Few powerful cores (8–128 modern servers mein), complex control logic, large caches. Har core bahut kuch kar sakta hai, fast, but ek time pe few tasks per core.
        </p>
        <p style={S.p}>
          <strong>GPU (Graphics Processing Unit)</strong> — originally graphics rendering ke liye design hua tha. GPU ke paas thousands of simpler cores hote hain jo sab ek saath simple math operations simultaneously kar sakte hain.
        </p>
        <p style={S.p}>
          <strong>Why GPU wins for AI:</strong> AI training ka core operation hai matrix multiplication — same simple math operations (multiply aur add) millions of times across millions of numbers, simultaneously. GPU is orders of magnitude faster for this.
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
        <Callout type="best-practice" title="CPU aur GPU Ek Saath Kaam Karte Hain">
          GPU cluster mein CPU bhi hote hain. CPU ka kaam: data loading aur preprocessing (training data GPU tak pahonchane se pehle), job orchestration (PyTorch framework run karna), OS aur driver management, network stack management, storage I/O coordination. CPU aur GPU competitors nahi hain — coordinated team hain.
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
          Yeh distinction bahut important hai. GPU memory available (HBM capacity) directly model ka maximum size determine nahi karta. Actual model size jo fit hoga woh depend karta hai: workload type (inference vs training), numerical precision (FP32, BF16, FP8), quantization, optimizer states, gradients, activations, batch size, framework overhead, aur parallelism/sharding strategy. Training mein ek 80 GB GPU pe 80 GB ka model fit nahi hota — gradients, optimizer states, activations sab bhi memory use karte hain.
        </Callout>
      </section>

      {/* ── GPU COMPUTE NODE ──────────────────────────────────── */}
      <section id="gpu-compute-node">
        <h2 style={S.h2}>GPU Compute Node</h2>
        <p style={S.p}>
          <strong>GPU Compute Node</strong> ek compute server hai jo cluster scheduling ka unit hota hai. AI clusters mein isme commonly ek ya zyada GPUs hote hain, aur isse aksar GPU Server bhi kaha jaata hai.
        </p>
        <p style={S.p}>
          Precisely define karein: Node = scheduler ke perspective se ek schedulable unit of compute resources. Typically ek physical server = ek node.
        </p>
        <p style={S.p}><strong>Cluster mein node types:</strong></p>
        <ul style={S.ul}>
          <li><strong>Compute nodes:</strong> GPU servers jahan actual training ya inference kaam hota hai — yeh primary focus hai is article ka</li>
          <li><strong>Head/Login nodes:</strong> Jahan users login karte hain, jobs submit karte hain</li>
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
          <li><strong>GPUs (4–8 typically):</strong> Main compute engine. H100, MI300X, ya other accelerators. Har GPU ke paas apni HBM hoti hai.</li>
          <li><strong>CPUs (typically 2 sockets):</strong> Server management, data loading, framework orchestration. AMD EPYC ya Intel Xeon.</li>
          <li><strong>System RAM (256 GB–2 TB):</strong> CPU ka working memory. Training data temporarily yahan staged hota hai before GPU memory mein transfer. OS, framework code, preprocessing pipelines yahan run hoti hain.</li>
          <li><strong>HBM (GPU ka apna memory):</strong> Har GPU ke paas alag HBM. Physically GPU ke bahut paas integrated. Model weights, activations, gradients GPU ke HBM mein hote hain during compute.</li>
          <li><strong>PCIe bus:</strong> CPU aur GPU (aur other devices) ke beech standard interface within the server. CPU memory se GPU memory mein data transfer yahan hota hai.</li>
          <li><strong>NICs (multiple):</strong> Management network ke liye standard 1 GbE ports, compute/data network ke liye high-speed ports (InfiniBand ConnectX ya high-speed Ethernet). Typically 2–8 high-speed ports per GPU server.</li>
          <li><strong>NVMe SSDs:</strong> Fast local storage for OS, framework, temporary files, local checkpoints. Primary training data storage nahi — woh shared storage pe hota hai.</li>
          <li><strong>Dual PSUs:</strong> Redundant power supplies. Ek fail → doosra seamlessly takes over.</li>
          <li><strong>BMC (Baseboard Management Controller):</strong> Out-of-band management chip. OS crash ho jaye — BMC ke through remotely power cycle, console access. Management network pe alag IP hoti hai. Critical for data center operations.</li>
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
        <Callout type="warning" title="Dono Memory Bottleneck Ho Sakti Hai">
          System RAM bottleneck: Agar data preprocessing CPU pe slow hai → GPU data ke liye wait karti hai → GPU utilization drops. GPU HBM bottleneck: Agar model HBM mein fit nahi hoti → job fail ya model parallelism required. Dono layers monitor karo.
        </Callout>
      </section>

      {/* ── TERMINOLOGY ───────────────────────────────────────── */}
      <section id="terminology">
        <h2 style={S.h2}>GPU Server Terminology</h2>
        <p style={S.p}>Industry mein multiple terms use hote hain same ya similar things ke liye:</p>
        <ul style={S.ul}>
          <li><strong>GPU Server / GPU Compute Node:</strong> Same concept — ek server with GPUs, schedulable unit in cluster</li>
          <li><strong>AI Compute Node:</strong> Same, emphasizes AI workload use case</li>
          <li><strong>DGX Node (NVIDIA specific):</strong> NVIDIA branded GPU server (DGX H100, DGX B200). Specific validated configuration from NVIDIA.</li>
          <li><strong>HGX (NVIDIA specific):</strong> GPU baseboard/module jo OEMs apne server chassis mein integrate karte hain. OEM flexibility with NVIDIA GPU components.</li>
          <li><strong>Training Node vs Inference Node:</strong> Same physical hardware different workload use mein — distinction is workload type, not hardware type.</li>
          <li><strong>Worker Node:</strong> Kubernetes context mein workloads run karne wale nodes (control plane nodes se alag).</li>
        </ul>
      </section>

      {/* ── CLUSTER ARCHITECTURE ─────────────────────────────── */}
      <section id="cluster-architecture">
        <h2 style={S.h2}>GPU Cluster Architecture</h2>
        <p style={S.p}>GPU cluster ko layers mein samjhte hain:</p>
        <ul style={S.ul}>
          <li><strong>Layer 1 — Compute Layer:</strong> GPU Compute Nodes. Actual AI computation yahan hota hai.</li>
          <li><strong>Layer 2 — High-Speed Compute Network:</strong> Compute nodes interconnect. GPU-to-GPU AllReduce is network pe. High bandwidth, low latency. InfiniBand ya high-speed RoCE.</li>
          <li><strong>Layer 3 — Storage Layer:</strong> Shared, high-bandwidth storage. Training datasets, checkpoints, artifacts. Parallel file systems. Compute nodes se network ke through accessible.</li>
          <li><strong>Layer 4 — Management Layer:</strong> Separate management network. BMC/IPMI access, OS management, monitoring agents, software deployment. Completely separate from compute network.</li>
          <li><strong>Layer 5 — Scheduling / Control Layer:</strong> Slurm, Kubernetes. Job queue, resource allocation, fairness. Dedicated management/head nodes pe run hota hai.</li>
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
          <li><strong>Top-of-Rack (ToR) Switches:</strong> Har rack mein ek switch jo us rack ke sab servers ko cluster network se connect karta hai aur traffic ko leaf/spine fabric ki taraf forward karta hai. High-speed compute ke liye InfiniBand ya high-speed Ethernet switch.</li>
          <li><strong>Spine/Core Switches:</strong> Multiple ToR switches ko interconnect karte hain. Fat-tree topology mein leaf-spine design. Full bisection bandwidth ke liye.</li>
          <li><strong>Storage Servers:</strong> Parallel file system nodes (Lustre MDS/OSS ya GPFS). High-bandwidth connectivity to compute nodes required.</li>
          <li><strong>Management/Head Nodes:</strong> Scheduler runs yahan. Users yahan login karte hain. Software deployment, monitoring collection.</li>
          <li><strong>Out-of-Band Management Network:</strong> BMC/IPMI network. 1 GbE typically. Every server ka BMC yahan connected. Always accessible for remote management.</li>
          <li><strong>Power Distribution:</strong> PDUs per rack. Rack-level power monitoring. Dual-feed PDUs for redundancy.</li>
          <li><strong>Cooling Equipment:</strong> CRAC/CRAH units (air). CDU + liquid cooling manifolds per rack (liquid). Temperature sensors.</li>
          <li><strong>Monitoring Infrastructure:</strong> DCGM agents, Prometheus exporters, Grafana dashboards, alerting.</li>
        </ul>
      </section>

      {/* ── RACK ARCHITECTURE ─────────────────────────────────── */}
      <section id="rack-architecture">
        <h2 style={S.h2}>GPU Rack Architecture</h2>
        <p style={S.p}>GPU rack traditional server rack se bahut alag hoti hai.</p>
        <p style={S.p}><strong>Traditional rack:</strong> 42U, mix of 1U–2U servers, 20–40 servers, 3–15 kW typical, air cooled.</p>
        <p style={S.p}><strong>GPU server rack:</strong> 42U standard. GPU servers typically 4U–8U each. 4–8 GPU servers per rack typical. Power varies significantly based on GPU platform, server configuration, and number of servers per rack.</p>
        <Callout type="warning" title="Rack Power — Platform Specific">
          Rack power ko kisi bhi universal number se define mat karo. DGX H100 approximately 10.2 kW pe — 4 such servers in one rack = approximately 40+ kW plus networking plus management. GB200 NVL72 rack: well over 100 kW. Older GPU generations draw less. Hamesha actual server TDP specs se design karo — assumed averages se nahi. Plus 20% headroom minimum.
        </Callout>
        <p style={S.p}><strong>Rack design considerations:</strong></p>
        <ul style={S.ul}>
          <li><strong>Power distribution:</strong> Follow server manufacturer's approved electrical configuration, rack PDU ratings, breaker capacity, redundancy requirements aur applicable electrical standards/codes.</li>
          <li><strong>Cable density:</strong> Ek GPU server mein 8+ high-speed network cables hote hain. Multiply by 4–8 servers = significant cable management challenge. Poor cable management → airflow blockage → thermal issues.</li>
          <li><strong>Weight:</strong> GPU servers significantly heavier — DGX H100 approximately 130 kg. Floor load capacity verify karo before deployment.</li>
          <li><strong>Cooling manifold:</strong> Liquid-cooled racks mein coolant manifold, distribution pipes. Leak detection sensors mandatory at rack level.</li>
          <li><strong>Service access:</strong> Design karo taaki GPUs accessible hain without major disassembly — field replacement operations hoti hain.</li>
        </ul>
      </section>


      {/* ── NETWORK ARCHITECTURE ──────────────────────────────── */}
      <section id="network-architecture">
        <h2 style={S.h2}>GPU Cluster Network Architecture</h2>
        <p style={S.p}>
          Network GPU cluster ka arguably most critical component hai — GPUs ke baad.
        </p>
        <p style={S.p}>
          <strong>Why networking is so critical:</strong> Distributed AI training mein, every training step ke baad, sab GPUs ko gradients share karne hote hain — AllReduce operation. Agar network slow hai → GPUs wait karte hain communication ke liye → effective training throughput dramatically drops.
        </p>
        <Figure caption="GPU Cluster dual-network architecture: High-Speed AI Compute Network (solid) connects GPU servers through Leaf and Spine switches for GPU-to-GPU AllReduce gradient sync. Separate Management Network (dashed) connects same servers via different NICs for admin access, monitoring, BMC — always available even if compute network has issues.">
          <GpuClusterNetwork />
        </Figure>
        <p style={S.p}><strong>Fat-tree topology</strong> (leaf-spine) standard choice hai GPU clusters ke liye. Large distributed-training clusters often use a non-blocking or carefully engineered low-oversubscription network because collective communication can generate very high East-West traffic. Network architecture should be selected according to workload and required communication performance.</p>
        <ComparisonTable
          title="Cluster Network — Three Logical Networks"
          headers={["Network", "Purpose", "Speed", "Critical Requirement"]}
          rows={[
            ["Management Network", "BMC/IPMI, SSH, monitoring agents, OS updates", "1 GbE typical", "Always available, even if compute network down"],
            ["High-Speed Compute Network", "GPU-to-GPU AllReduce, gradient sync", "100–400 Gb/s (IB/RoCE)", "Max bandwidth, min latency, non-blocking"],
            ["Storage Network (optional separate)", "Training data reads, checkpoint writes", "100 Gb/s+", "High aggregate bandwidth, low latency"],
          ]}
        />
        <Callout type="important" title="Teen Networks Hamesha Physically Separate Nahi Hoti">
          Yeh logical separation important hai — physical separation implementation-specific hai. Some clusters mein storage aur compute traffic same physical fabric share karte hain (different VLANs/QoS). Critical rule: Management network hamesha separate honi chahiye — physically different NICs, different switches. Compute aur storage separation workload requirements pe depend karta hai.
        </Callout>
      </section>

      {/* ── MGMT VS COMPUTE NET ───────────────────────────────── */}
      <section id="mgmt-vs-compute-net">
        <h2 style={S.h2}>Management Network vs Compute Network</h2>
        <p style={S.p}>
          <strong>Management Network:</strong> Always on, always accessible. BMC/IPMI, SSH, monitoring agents, OS updates. 1 GbE per server sufficient. Separate NICs, separate switches, separate VLANs, ideally separate physical infrastructure.
        </p>
        <p style={S.p}>
          <strong>High-Speed Compute Network:</strong> Used during active GPU compute jobs. AllReduce, data loading, checkpoint writes. 200–400 Gb/s per port common. Specialized InfiniBand switches ya 400 GbE switches.
        </p>
        <p style={S.p}><strong>Why separation matters:</strong></p>
        <ul style={S.ul}>
          <li><strong>Security:</strong> Training traffic (sensitive model weights, proprietary data) separated from management traffic.</li>
          <li><strong>Reliability:</strong> Compute network issue diagnose karte waqt management network se access available rehta hai.</li>
          <li><strong>Performance:</strong> Management traffic (monitoring, BMC console) ko compute network pe allow karne se AllReduce performance impact ho sakti hai.</li>
        </ul>
        <p style={S.p}><strong>Practical deployment:</strong> Har GPU server mein: 2 standard Ethernet ports → management network (bonded for redundancy), 2–8 high-speed NICs → compute/data network, BMC port → out-of-band management network (completely separate).</p>
      </section>

      {/* ── NVLINK NVSWITCH ───────────────────────────────────── */}
      <section id="nvlink-nvswitch">
        <h2 style={S.h2}>NVLink and NVSwitch</h2>
        <p style={S.p}>
          <strong>NVLink</strong> NVIDIA ka proprietary high-speed GPU-to-GPU interconnect technology hai. NVLink specifically GPU chips ke beech direct connections provide karta hai — PCIe se much higher bandwidth ke saath.
        </p>
        <p style={S.p}>
          Traditional DGX/HGX systems mein NVLink/NVSwitch primarily same node ke andar GPUs ke beech high-bandwidth communication ke liye use hota hai.
        </p>
        <p style={S.p}>
          Newer rack-scale architectures jaise NVIDIA GB200 NVL72 extend karte hain NVLink ko multiple compute trays ke across, ek rack-scale NVLink domain banate hain — approximately 13.4 TB HBM3E, approximately 576 TB/s aggregate HBM bandwidth, approximately 130 TB/s NVLink bandwidth, approximately 120 kW rack power (DGX GB200 NVL72 reference configuration).
        </p>
        <p style={S.p}>
          Scale-out between larger systems/racks still requires high-performance networking such as InfiniBand or Ethernet.
        </p>
        <p style={S.p}>
          <strong>NVSwitch:</strong> Dedicated chip jo NVLink connections ko switch karta hai — ek server ya rack domain ke andar any-to-any full-bandwidth communication enable karta hai. DGX H100 mein 4× NVSwitch hote hain jo 4th-gen NVLink ke through 900 GB/s GPU-to-GPU bandwidth provide karte hain.
        </p>
        <p style={S.p}><strong>NVLink bandwidth (generation specific):</strong></p>
        <ul style={S.ul}>
          <li>NVLink 3.0 (A100): 600 GB/s bidirectional per GPU</li>
          <li>NVLink 4.0 (H100): 900 GB/s bidirectional per GPU</li>
        </ul>
        <Callout type="important" title="NVLink ≠ InfiniBand — Different Technologies, Different Roles">
          NVLink = NVIDIA-specific intra-server (ya rack-scale NVLink domain) GPU interconnect. InfiniBand = cluster-wide networking technology (multi-vendor, inter-server/inter-rack). Dono ek GPU cluster mein simultaneously ho sakte hain different layers pe. NVLink sirf specific NVIDIA platforms (DGX/HGX class) mein available hai.
        </Callout>
      </section>

      {/* ── INFINIBAND ROCE ───────────────────────────────────── */}
      <section id="infiniband-roce">
        <h2 style={S.h2}>InfiniBand and RoCE</h2>
        <p style={S.p}>
          Yeh inter-server cluster networking technologies hain — jab GPUs alag servers pe hote hain toh yeh network unhe connect karti hai.
        </p>
        <p style={S.p}>
          <strong>InfiniBand (IB):</strong> Specialized high-performance networking protocol specifically HPC/AI clusters ke liye designed. Standard Ethernet se fundamentally different. Very low latency (~1 microsecond end-to-end), high bandwidth (NDR = 400 Gb/s, HDR = 200 Gb/s per port), native RDMA support. Purpose-built non-blocking fabrics possible. NVIDIA (Mellanox) ConnectX series adapters server mein install hoti hain.
        </p>
        <p style={S.p}>
          <strong>RoCE (RDMA over Converged Ethernet):</strong> Standard Ethernet infrastructure pe RDMA capabilities. "Best of both worlds" attempt: standard Ethernet hardware (cheaper, ubiquitous) + RDMA performance. RoCE v2 current standard: UDP pe RDMA. Lossless Ethernet (Priority Flow Control, ECN) required for good performance. Many hyperscalers (Meta, Google, Microsoft) large-scale AI clusters mein RoCE ya similar custom Ethernet fabrics use karte hain. AMD Instinct GPUs strong native RoCE support rakhte hain.
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
          InfiniBand vs RoCE — no universal answer. Depends on: GPU platform affinity, budget, existing networking expertise, scale, performance sensitivity. NVIDIA GPU clusters: often InfiniBand. AMD Instinct clusters: strong RoCE support. Large hyperscalers: often custom Ethernet (RoCE-based). Vendor recommendation check karo for your GPU platform.
        </Callout>
      </section>

      {/* ── PCIE ─────────────────────────────────────────────── */}
      <section id="pcie-role">
        <h2 style={S.h2}>PCIe and Its Role</h2>
        <p style={S.p}>
          <strong>PCIe (Peripheral Component Interconnect Express)</strong> — standard interface jo CPU aur GPU (aur other devices) ko connect karta hai within a server.
        </p>
        <p style={S.p}>
          PCIe GPU server ke andar CPU aur GPU ke beech, CPU aur NICs ke beech, CPU aur NVMe drives ke beech connection provide karta hai. On compatible platforms, GPUs can also use PCIe peer-to-peer (P2P) communication. In systems with NVLink/NVSwitch, high-bandwidth GPU-to-GPU communication is primarily handled through the NVLink fabric.
        </p>
        <p style={S.p}><strong>PCIe generations:</strong> PCIe 4.0: ~64 GB/s bidirectional (x16 slot). PCIe 5.0: ~128 GB/s bidirectional (x16 slot).</p>
        <p style={S.p}>
          PCIe bandwidth compare karo GPU HBM bandwidth se: H100 HBM3 = ~3.35 TB/s. PCIe 5.0 x16 = ~128 GB/s. PCIe bandwidth is approximately 26× less than GPU HBM bandwidth. Isliye CPU-GPU data transfer ek bottleneck ho sakta hai.
        </p>
        <p style={S.p}><strong>How clusters handle PCIe limitation:</strong></p>
        <ul style={S.ul}>
          <li>Minimize CPU-GPU data transfers: Data GPU HBM mein rakhte hain jitna ho sake.</li>
          <li>GPUDirect RDMA: GPU memory directly NIC se data transfer kar sakti hai — CPU memory bypass karke. Cluster networking pe directly "zero copy" transfers.</li>
          <li>Batch loading: Training data CPU memory mein prefetch karo, batches mein GPU ko transfer karo — overlap karo compute aur data loading.</li>
        </ul>
        <Callout type="important" title="PCIe Cluster-Wide Networking Nahi Hai">
          PCIe single server ke andar CPU-to-device interface hai. Cluster-wide GPU-to-GPU communication InfiniBand ya RoCE pe hoti hai — alag NICs ke through. GPU-to-GPU data cluster fabric pe jaata hai, PCIe ke through nahi (GPUDirect RDMA ki wajah se).
        </Callout>
      </section>

      {/* ── GPU-TO-GPU COMM ───────────────────────────────────── */}
      <section id="gpu-to-gpu-comm">
        <h2 style={S.h2}>GPU-to-GPU Communication</h2>
        <p style={S.p}>
          <strong>AllReduce operation:</strong> 1000 GPUs parallel train kar rahe hain. Har GPU apna data batch process karta hai, gradients compute karta hai. Phir sab 1000 GPUs ke gradients average karke sab ko batana hota hai taaki sab same updated model se agla step shuru karein. Yeh "average and broadcast" = AllReduce.
        </p>
        <p style={S.p}><strong>Communication paths:</strong></p>
        <ul style={S.ul}>
          <li><strong>Within same server (intra-node):</strong> NVLink (NVIDIA NVLink-equipped platforms — DGX/HGX class) — very high bandwidth, low latency. PCIe P2P (compatible platforms without NVLink) — usable but lower bandwidth.</li>
          <li><strong>Across different servers (inter-node):</strong> GPU memory → NIC (via GPUDirect RDMA, CPU bypass) → InfiniBand/RoCE switch → destination server NIC → destination GPU memory.</li>
        </ul>
        <p style={S.p}>
          <strong>NCCL (NVIDIA Collective Communications Library):</strong> AI training ka backbone communication library. Framework (PyTorch, TensorFlow) ke andar automatically GPU communication manage karta hai. NVLink (intra-node) aur InfiniBand/RoCE (inter-node) dono ko automatically use karta hai topology ke according. <strong>RCCL</strong> AMD GPU clusters ke liye equivalent hai.
        </p>
      </section>

      {/* ── EAST-WEST ─────────────────────────────────────────── */}
      <section id="east-west-traffic">
        <h2 style={S.h2}>East-West Traffic in GPU Clusters</h2>
        <Figure caption="East-West vs North-South traffic patterns. Traditional DC: Client sends request to server (vertical, North-South). GPU Cluster: During AllReduce, all GPU servers simultaneously exchange gradient data with each other (horizontal, East-West, peer-to-peer). This massive concurrent communication is why GPU cluster networks need non-blocking or low-oversubscription fabric design.">
          <EastWestTraffic />
        </Figure>
        <p style={S.p}>
          <strong>North-South (traditional DC):</strong> Client → Server → Client. User request aati hai (south), server respond karta hai (north). Vertical flow.
        </p>
        <p style={S.p}>
          <strong>East-West (AI/GPU cluster):</strong> Server → Server → Server. AllReduce ke dauran, sab GPU servers simultaneously ek dusre ko gradients bhej rahe hote hain. Massive horizontal traffic between peers.
        </p>
        <p style={S.p}>
          <strong>Design implication:</strong> East-West heavy traffic ke liye network "non-blocking" ya carefully engineered low-oversubscription design honi chahiye. Fat-tree topology (leaf-spine) standard choice hai kyunki it can provide full bisection bandwidth — har node doosre node se poori speed pe communicate kar sakta hai.
        </p>
        <Callout type="important" title="Oversubscribed Network → Training Slow">
          Agar network "oversubscribed" hai (switch uplinks thinner than downlinks) → bottleneck at spine → AllReduce slow → GPUs wait karte hain → effective utilization drops dramatically. Expensive GPUs idle baithti hain network wait karte hue. Network ko GPU count ke saath proportionally plan karo.
        </Callout>
      </section>

      {/* ── STORAGE ARCHITECTURE ─────────────────────────────── */}
      <section id="storage-architecture">
        <h2 style={S.h2}>Storage Architecture for GPU Clusters</h2>
        <p style={S.p}>
          Storage ko underestimate karna ek common mistake hai. Training data fast enough supply na ho toh GPUs idle reh jaati hain despite being "running."
        </p>
        <Figure caption="Storage flow: Dataset from Cold Storage (object storage) pre-staged to Hot Parallel File System before training. GPU nodes continuously read training batches from hot storage. Checkpoints written periodically to fast checkpoint storage. Final trained model goes to Model Registry. GPUDirect Storage (dashed, requires supported hardware and software stack) provides direct GPU-to-storage path bypassing CPU.">
          <StorageFlow />
        </Figure>
        <p style={S.p}><strong>Storage tiers:</strong></p>
        <ul style={S.ul}>
          <li><strong>Hot Storage:</strong> Actively used training data. Highest bandwidth needed. Parallel file system (Lustre, GPFS). Compute nodes se low latency, high throughput access required.</li>
          <li><strong>Cold Storage:</strong> Archived datasets, old models. Object storage (S3-compatible). Large capacity, low cost.</li>
          <li><strong>Checkpoint Storage:</strong> Training checkpoints — fast writes aur durable storage dono required. Fast NVMe-backed storage for recent checkpoints.</li>
          <li><strong>Object Storage:</strong> Scalable, durable, cloud-native. Training data archive, final model weights, experiment artifacts.</li>
        </ul>
        <Callout type="warning" title="Storage Throughput — Benchmark Karo, Guess Mat Karo">
          Required storage throughput depends on workload characteristics: dataset size, batch size, preprocessing, caching, data reuse, checkpoint frequency, aur number of concurrent jobs. Production storage throughput should be determined through workload benchmarking rather than a fixed GB/s-per-GPU rule. Provision karo actual measured requirements se, theoretical estimates se nahi.
        </Callout>
      </section>

      {/* ── DATA LOCALITY ─────────────────────────────────────── */}
      <section id="data-locality">
        <h2 style={S.h2}>Data Locality</h2>
        <p style={S.p}>
          <strong>Data Locality</strong> — principle: data physically aur logically GPU compute ke jitna paas hoga, latency utni kam hogi aur throughput utna zyada hoga.
        </p>
        <p style={S.p}>
          Storage jo compute nodes se "far" hai → higher latency, lower effective bandwidth → GPUs data ke liye wait karte hain. Storage GPU cluster ke paas network pe lagao — same building ya same network segment.
        </p>
        <ul style={S.ul}>
          <li><strong>Data pre-staging:</strong> Training run start karne se pehle, relevant dataset ko fast hot storage pe copy karo.</li>
          <li><strong>Local NVMe use:</strong> GPU servers ka local NVMe frequently accessed data ke liye temporary cache ke roop mein use karo.</li>
          <li><strong>Network segregation:</strong> Storage network ko compute (AllReduce) traffic se separate karo — ek ki congestion doosre ko affect na kare.</li>
          <li><strong>GPUDirect Storage:</strong> GPU directly storage se data read kar sakti hai via supported paths — CPU memory bypass karte hue. Requires supported storage system, filesystem, NIC/PCIe topology, drivers aur software configuration — not automatic.</li>
        </ul>
      </section>

      {/* ── CHECKPOINT STORAGE ────────────────────────────────── */}
      <section id="checkpoint-storage">
        <h2 style={S.h2}>Checkpoint Storage</h2>
        <p style={S.p}>
          Checkpointing AI training ki lifeline hai. Training job ke dauran, har N steps pe (ya har N minutes pe), current model state (weights, optimizer states, RNG state) disk pe save karna = checkpoint.
        </p>
        <p style={S.p}>
          <strong>Why critical:</strong> Large model training weeks ya months tak chal sakti hai. Hardware failures expected events hain at scale. Single node failure distributed training job fail kar sakta hai unless framework supports fault tolerance. Checkpoint se resume karo — last save se nahi zero se.
        </p>
        <p style={S.p}>
          <strong>Checkpoint frequency decision:</strong> Checkpoint frequency is selected by balancing checkpoint overhead (write time pauses training) against the amount of training work the organization is willing to lose after a failure.
        </p>
        <p style={S.p}><strong>Checkpoint strategy:</strong></p>
        <ul style={S.ul}>
          <li>Fast checkpoint: Har N minutes/steps, fast local/shared NVMe storage pe.</li>
          <li>Durable checkpoint: Har few hours, replicated durable storage pe.</li>
          <li>Final checkpoint: Training complete, long-term object storage pe.</li>
          <li>Async checkpointing: Model state GPU se memory mein copy, training continues, background thread disk pe write kare — training pause minimized.</li>
        </ul>
        <Callout type="best-practice" title="Checkpoint Restore Test Karo Before Long Runs">
          Before starting a multi-day training job, checkpoint restore verify karo. Corrupted checkpoint = false confidence. Agar restore process broken hai toh sab checkpoints useless hain. Actual test run do — small job → checkpoint → restore → verify continuation.
        </Callout>
      </section>

      {/* ── PARALLEL FILE SYSTEMS ─────────────────────────────── */}
      <section id="parallel-file-systems">
        <h2 style={S.h2}>Parallel File Systems</h2>
        <p style={S.p}>
          Standard NFS single server bandwidth limited hota hai. GPU clusters ke liye — jaise cluster scale karta hai — parallel file system required hoti hai.
        </p>
        <p style={S.p}>
          <strong>Parallel File System:</strong> File system jo multiple storage servers pe distribute hoti hai, sab simultaneously serve kar sakte hain. Aggregate bandwidth = all storage servers combined bandwidth.
        </p>
        <p style={S.p}><strong>Options:</strong></p>
        <ul style={S.ul}>
          <li><strong>Lustre:</strong> Most common parallel file system in HPC/AI clusters. Open-source. Architecture: MDS (Metadata Server) + MDT, OSS (Object Storage Server) + OST. Multiple OSSes → aggregate bandwidth scales.</li>
          <li><strong>IBM Spectrum Scale (GPFS):</strong> Enterprise-grade, more features than Lustre. Policy-based data placement, erasure coding. IBM systems aur some HPC installations mein.</li>
          <li><strong>WekaIO, VAST Data, NetApp:</strong> Newer generation all-flash parallel/distributed file systems. High performance, good GPU cluster support.</li>
        </ul>
        <p style={S.p}>
          Single-server NFS small clusters, development aur testing ke liye sufficient ho sakta hai. Large distributed-training environments may benefit from scale-out NFS, parallel file systems ya high-performance distributed storage depending on workload aur I/O requirements.
        </p>
      </section>


      {/* ── SCHEDULER ─────────────────────────────────────────── */}
      <section id="scheduler">
        <h2 style={S.h2}>GPU Cluster Scheduler</h2>
        <p style={S.p}>
          Scheduler ek "traffic controller" hai GPU cluster resources ke liye.
        </p>
        <p style={S.p}>
          <strong>Without scheduler:</strong> 10 teams, 1000 GPUs. Chaos, conflicts, unfair usage, over-allocation.
        </p>
        <p style={S.p}>
          <strong>With scheduler:</strong> Users/teams jobs submit karte hain → scheduler queue maintain karta hai → available resources pe jobs assign karta hai → fair share policies enforce karta hai.
        </p>
        <Figure caption="GPU Job Scheduling: Multiple users and teams submit AI jobs to the Job Queue. Scheduler (Slurm or Kubernetes) checks available GPU resources, applies priority and fair-share rules, and assigns jobs to available GPU Compute Nodes. Jobs that cannot run immediately wait in queue.">
          <GpuJobScheduling />
        </Figure>
        <p style={S.p}><strong>What scheduler manages:</strong></p>
        <ul style={S.ul}>
          <li>GPU allocation (how many GPUs, which nodes)</li>
          <li>CPU cores, system memory allocation</li>
          <li>Time limits per job</li>
          <li>User/project quotas aur fair share</li>
          <li>Priority queues (research vs production vs debug)</li>
          <li>Gang scheduling: Multi-node job ke sab nodes ek saath allocate karo</li>
          <li>Node health (scheduler marks unhealthy nodes as unavailable)</li>
        </ul>
      </section>

      {/* ── SLURM ─────────────────────────────────────────────── */}
      <section id="slurm">
        <h2 style={S.h2}>Slurm</h2>
        <p style={S.p}>
          <strong>Slurm (Simple Linux Utility for Resource Management)</strong> — most widely used scheduler in HPC aur AI clusters. Industry standard for on-premises GPU clusters, national labs, universities, aur many enterprises.
        </p>
        <p style={S.p}><strong>Key concepts:</strong></p>
        <ul style={S.ul}>
          <li><strong>Partition (Queue):</strong> Logical grouping of nodes. "training" partition → high-memory GPU nodes. "inference" partition → inference-optimized. "debug" partition → small quick jobs.</li>
          <li><strong>Batch job:</strong> Submit job script, Slurm runs it when resources available. User online rehna zaruri nahi.</li>
          <li><strong>Gang scheduling:</strong> 100-GPU job ko 100 GPUs sab ek saath chahiye. Slurm supports this — backfill scheduling bhi hai jisme smaller jobs gaps fill karte hain.</li>
          <li><strong>Fair share:</strong> Historical usage track karta hai per user/project. Jo zyada use kar chuka hai, uski effective priority kam hoti hai.</li>
        </ul>
        <p style={S.p}><strong>Common commands:</strong></p>
        <ul style={S.ul}>
          <li><code style={S.code}>sbatch job.sh</code> — batch job submit karo</li>
          <li><code style={S.code}>srun python train.py</code> — interactive run</li>
          <li><code style={S.code}>squeue</code> — job queue status dekho</li>
          <li><code style={S.code}>sinfo</code> — cluster node status</li>
          <li><code style={S.code}>scancel &lt;job_id&gt;</code> — job cancel karo</li>
          <li><code style={S.code}>sacct</code> — accounting, job history</li>
        </ul>
      </section>

      {/* ── KUBERNETES GPU ────────────────────────────────────── */}
      <section id="kubernetes-gpu">
        <h2 style={S.h2}>Kubernetes and GPU Workloads</h2>
        <p style={S.p}>
          <strong>Kubernetes</strong> — container orchestration platform. Originally microservices ke liye. AI/ML workloads ke liye increasingly used — especially inference serving.
        </p>
        <p style={S.p}><strong>GPU support:</strong> NVIDIA GPU Operator: GPU drivers, container runtime, DCGM monitoring automatically manage karta hai. Resource request: Container spec mein <code style={S.code}>nvidia.com/gpu: 8</code> specify karo → Kubernetes 8 GPUs wala node pe schedule karega.</p>
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
        <Callout type="best-practice" title="Hybrid Approach Common Hai">
          Many production environments run dono: Slurm for training cluster, Kubernetes for inference serving. Training ke liye gang scheduling critical hai — Slurm better. Inference ke liye autoscaling critical hai — Kubernetes better.
        </Callout>
      </section>

      {/* ── JOB QUEUE ─────────────────────────────────────────── */}
      <section id="job-queue">
        <h2 style={S.h2}>GPU Job Queue and Resource Allocation</h2>
        <p style={S.p}>
          Jab resources available nahi hote, jobs queue mein wait karte hain. Yeh normal aur expected hai — it does not indicate a system problem.
        </p>
        <p style={S.p}><strong>Queue dynamics:</strong> New job submitted → scheduler checks resources → agar available: run now. Agar nahi: queue mein add karo, priority ke according position assign karo.</p>
        <p style={S.p}><strong>Queue ordering factors:</strong> Job priority, fair share (historical usage), job size (small jobs backfill through gang scheduling gaps), partition-specific policies, user/project quotas.</p>
        <p style={S.p}><strong>Resource fragmentation:</strong> 1000-GPU cluster mein multiple jobs run ho rahe hain — kuch GPUs idle hain kyunki ek large job ke liye enough contiguous nodes nahi hain. Backfill scheduling: smaller jobs khali gaps fill karte hain.</p>
        <p style={S.p}><strong>Preemption:</strong> High-priority job ke aane pe lower-priority running job ko pause ya cancel kar ke resources free karo. Preempted job checkpoint se resume hoti hai.</p>
      </section>

      {/* ── MULTI-TENANCY ─────────────────────────────────────── */}
      <section id="multi-tenancy">
        <h2 style={S.h2}>Multi-Tenancy</h2>
        <p style={S.p}>
          <strong>Multi-Tenancy</strong> = same physical GPU cluster multiple teams, projects, ya users securely share karein.
        </p>
        <p style={S.p}>
          Ek company ki research team, product team, infrastructure team — sab GPU cluster share karte hain. Dedicated clusters per team prohibitively expensive hoti hain.
        </p>
        <p style={S.p}><strong>Multi-tenancy implementation:</strong></p>
        <ul style={S.ul}>
          <li><strong>Slurm:</strong> Per-user, per-project accounting, fair share, priority queues, partitions per team.</li>
          <li><strong>Kubernetes:</strong> Namespaces for isolation, resource quotas, LimitRanges, priority classes.</li>
          <li><strong>Chargeback/showback:</strong> Track usage per team for billing ya budget allocation. Visibility drives efficiency.</li>
          <li><strong>Container isolation:</strong> Kubernetes namespaces data aur workload isolation provide karte hain — ek team ki pods doosri team ke resources access nahi kar sakti.</li>
        </ul>
        <p style={S.p}><strong>Multi-tenancy challenges:</strong> Fair resource distribution, performance isolation (noisy neighbor), priority conflicts (production vs research), security isolation (data separation).</p>
      </section>

      {/* ── GPU UTILIZATION ───────────────────────────────────── */}
      <section id="gpu-utilization">
        <h2 style={S.h2}>GPU Utilization</h2>
        <p style={S.p}>
          GPU utilization metric carefully samajhni chahiye. Common misconceptions hain.
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
          Low GPU utilization during training = something wrong — but what? Profiling se pata chalta hai: GPU idle hai toh kyun? Data loading slow (storage bottleneck)? AllReduce slow (network bottleneck)? Compute genuinely maxed out (good!)? Each cause demands a different fix — generic "GPU utilization improve karo" misleading hai without profiling.
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
          Actual training time depends on model size, token count, dataset, sequence length, precision, parallelism strategy, checkpointing overhead, achieved MFU aur cluster efficiency. Specific training time claims bina complete workload definition ke accurate nahi hote.
        </Callout>
      </section>

      {/* ── INFERENCE WORKLOADS ───────────────────────────────── */}
      <section id="inference-workloads">
        <h2 style={S.h2}>Inference Workloads</h2>
        <p style={S.p}>
          <strong>Inference = trained model ko real users pe deploy karna.</strong> Latency-sensitive, variable load, typically stateless, many simultaneous requests.
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
          Classic data parallelism model states ko participating GPUs pe replicate karta hai aur different data batches unke beech distribute karta hai.
        </p>
        <p style={S.p}>
          Modern approaches jaise FSDP (Fully Sharded Data Parallel) aur ZeRO (Zero Redundancy Optimizer) model states across GPUs shard kar sakte hain — simple full-model replication se bade workloads enable karte hain.
        </p>
        <ul style={S.ul}>
          <li>Each GPU apna data batch process karta hai → gradients compute karta hai</li>
          <li>AllReduce: All GPUs gradients share karte hain, average receive karte hain</li>
          <li>Sab GPUs same updated model se agla step shuru karte hain</li>
        </ul>
        <p style={S.p}><strong>PyTorch DDP (Distributed Data Parallel)</strong> most common implementation. NCCL AllReduce use karta hai.</p>
      </section>

      {/* ── MODEL PARALLELISM ─────────────────────────────────── */}
      <section id="model-parallelism">
        <h2 style={S.h2}>Model Parallelism</h2>
        <p style={S.p}>
          Model itself split across multiple GPUs. Each GPU holds part of the model. Used when model too large for single GPU.
        </p>
        <p style={S.p}><strong>Two main types:</strong></p>
        <ul style={S.ul}>
          <li><strong>Tensor Parallelism:</strong> Individual weight matrices alag GPUs pe split karo</li>
          <li><strong>Pipeline Parallelism:</strong> Model layer-by-layer alag GPU groups pe split karo</li>
        </ul>
        <p style={S.p}>Common for LLM training (100B+ parameters). Often combined with data parallelism in 3D parallelism.</p>
      </section>

      {/* ── TENSOR PARALLELISM ────────────────────────────────── */}
      <section id="tensor-parallelism">
        <h2 style={S.h2}>Tensor Parallelism</h2>
        <p style={S.p}>
          Individual matrices (weight tensors) split across multiple GPUs. Example: Transformer attention layer ke large weight matrices (Q, K, V projections) — instead of one GPU full matrix hold kare, split karo 4 GPUs pe — har GPU ¼ holds.
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
          Like factory assembly line: Stage 1 processes Batch A, passes to Stage 2. While Stage 2 processes Batch A, Stage 1 starts Batch B. "Pipeline bubble" = idle time at start/end — micro-batching se reduce hota hai.
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
          <li><strong>Network scaling:</strong> More nodes = more switch ports. Add leaf switches. Spine switches upgrade ya add karo. Bandwidth-per-server maintain karo.</li>
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
        <p style={S.p}>GPU clusters are power-intensive. Data center operations engineers ke liye power planning essential hai.</p>
        <Figure caption="Power and Cooling infrastructure for GPU Cluster: Power chain from Utility Grid through Transformer, UPS (battery backup), Generator, PDU to GPU Servers. Cooling chain through Facility Cooling Plant, CDU (separates facility water from IT loop), Rack Manifold, Cold Plates on GPUs. CDU separation protects IT equipment from facility water chemistry. Air cooling shown as alternative for lower density deployments.">
          <PowerCoolingDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Power hierarchy:</strong> Utility grid → Transformers → Main switchgear → UPS → Distribution boards → PDUs → Server PSUs → GPUs</li>
          <li><strong>GPU server power:</strong> Varies significantly by GPU generation, number of GPUs per server, CPU/memory/NIC configuration, workload (idle vs peak training). Design from actual measured power draw — not nameplate TDP alone, and not assumed averages.</li>
          <li><strong>32-node DGX H100 example:</strong> 32 × 10.2 kW = 326.4 kW compute load at stated maximum per-node rating. Networking, storage, management, aur other infrastructure loads must be calculated separately. Final IT load should be based on actual equipment specifications aur deployment requirements.</li>
          <li><strong>UPS:</strong> UPS systems protect critical GPU infrastructure from power interruptions and disturbances aur provide continuity during transitions to alternate/generator power sources. N+1 or 2N UPS configurations for critical AI infrastructure. Runtime: Typically 10–15 minutes — enough for generators to start.</li>
          <li><strong>PDUs:</strong> Intelligent/managed PDUs recommended — per-outlet metering, remote switching, load monitoring. Dual PDU feeds per rack for redundancy. Phase balancing important. Power distribution must follow server manufacturer's approved electrical configuration, rack PDU ratings, breaker capacity, redundancy requirements aur applicable electrical standards/codes.</li>
        </ul>
      </section>

      {/* ── COOLING REQUIREMENTS ──────────────────────────────── */}
      <section id="cooling-requirements">
        <h2 style={S.h2}>Cooling Requirements</h2>
        <p style={S.p}>
          Power density aur cooling closely linked hain. All that electrical power → heat that must be removed.
        </p>
        <p style={S.p}>
          Air-cooling capability depends on server design, rack airflow, inlet temperature, containment, CRAH/CRAC capacity aur facility design. High-density GPU deployments may require rear-door heat exchangers, direct liquid cooling, ya other high-density cooling technologies.
        </p>
        <p style={S.p}><strong>Liquid cooling architecture:</strong></p>
        <ul style={S.ul}>
          <li><strong>Facility Cooling Water:</strong> Utility water/chiller output</li>
          <li><strong>CDU (Cooling Distribution Unit):</strong> Facility water aur IT liquid loop ke beech separator. Secondary loop IT equipment protect karta hai facility water chemistry se. Deployment architecture pe depend karta hai.</li>
          <li><strong>Rack Liquid Manifold:</strong> Coolant distribute karta hai har server tak; leak detection yahan critical hai.</li>
          <li><strong>Cold Plates on GPU Chips:</strong> Coolant directly GPU heat absorb karta hai — much more efficient than air for high heat flux.</li>
          <li><strong>Warm Coolant Return:</strong> Heat carry back to CDU for rejection.</li>
        </ul>
        <p style={S.p}>
          Liquid cooling deployment architectures vary — every installation identical nahi hoti. Verify GPU server's liquid cooling support, CDU compatibility, facility water quality requirements before planning.
        </p>
        <p style={S.p}>
          Liquid cooling can improve thermal efficiency aur enable higher rack density, but it does not guarantee a particular PUE value. PUE ek facility-level metric hai influenced by complete power aur cooling architecture, climate, chiller efficiency, pumps, cooling towers, CDUs, airflow management, aur IT load.
        </p>
        <Callout type="important" title="Cooling Infrastructure Planning — Before Hardware Procurement">
          Cooling infrastructure must be planned before — ya simultaneously with — GPU hardware procurement. Retrofitting cooling for high-density GPU cluster existing facility mein expensive aur disruptive hai. Cooling ki zaroorat GPU server ka power draw, facility cooling capacity, aur server manufacturer guidance pe depend karti hai.
        </Callout>
      </section>

      {/* ── RELIABILITY ───────────────────────────────────────── */}
      <section id="reliability">
        <h2 style={S.h2}>Reliability and Failure Handling</h2>
        <p style={S.p}>
          <strong>The key mindset shift:</strong> Traditional enterprise IT — server failure ek incident hai. GPU cluster operations — hardware failure ek expected, routine event hai. Systems aur processes automatically handle karne ke liye designed honi chahiye.
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
        <p style={S.p}><strong>Large cluster mein failures at scale:</strong> At large cluster scale, even relatively low individual-component failure rates can translate into regular hardware failures. This is expected, not exceptional — cluster design must accommodate it.</p>
        <p style={S.p}><strong>Failure response process:</strong></p>
        <ol style={S.ol}>
          <li>Alert fires → on-call engineer</li>
          <li>Identify affected component</li>
          <li>Drain node from scheduler (mark "down" — no new jobs)</li>
          <li>Active jobs on affected node: fail aur checkpoint se re-queue</li>
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
        <p style={S.p}><strong>High Availability for Inference:</strong> Inference services higher HA need karte hain (users waiting). Load balancer in front, multiple inference server replicas, auto-restart on failure, rolling updates.</p>
      </section>

      {/* ── MONITORING ────────────────────────────────────────── */}
      <section id="monitoring">
        <h2 style={S.h2}>Monitoring and Observability</h2>
        <p style={S.p}>
          "You can't manage what you can't measure." GPU cluster monitoring multiple layers simultaneously track karta hai.
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
        <p style={S.p}><strong>Monitoring stack:</strong> DCGM Exporter + Node Exporter → Prometheus → Grafana → Alertmanager → PagerDuty/Slack. Log aggregation: ELK stack ya Loki + Grafana.</p>
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
          <li><strong>1. GPU cluster = sirf servers:</strong> Sab layers plan karo from day one — compute, network, storage, power, cooling, operations. Koi bhi layer ignore karo → problem.</li>
          <li><strong>2. Power density underestimate:</strong> Actual server TDP specs se design karo, historical averages se nahi. Headroom rakhna zaroori hai — equipment ratings se 80% ya less loading target karo for safety margin.</li>
          <li><strong>3. Management aur compute network mix karna:</strong> Separate NICs, switches, VLANs — mandatory. Ek ka problem doosre pe impact nahi karna chahiye.</li>
          <li><strong>4. Oversubscribed network fabric:</strong> AllReduce bandwidth limited → training slow despite GPUs active. Non-blocking ya low-oversubscription fat-tree design karo according to workload requirements.</li>
          <li><strong>5. Storage throughput ignore karna:</strong> Benchmark actual workload ke requirements se. NFS se directly production-scale training shuru mat karo without testing.</li>
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
          <li><strong>Design for failure:</strong> Hardware failures expected hain — checkpoint, scheduler fault tolerance, monitoring, runbooks mandatory.</li>
          <li><strong>Separate networks:</strong> Management always physically separate. Compute aur storage separation per workload requirements.</li>
          <li><strong>Network fabric according to workload:</strong> Non-blocking ya carefully engineered low-oversubscription fabric for distributed training. Architecture workload requirements pe base karo.</li>
          <li><strong>Parallel file system for production:</strong> NFS development/testing ke liye theek. Production training: Lustre, GPFS, ya equivalent.</li>
          <li><strong>Liquid cooling plan first:</strong> Plan before GPU hardware procurement, not after. Verify manufacturer guidance, facility capacity, CDU architecture.</li>
          <li><strong>Monitoring before production:</strong> DCGM, network monitoring, storage monitoring — configured aur alerting tested before first production job.</li>
          <li><strong>Enforce checkpointing:</strong> Policy-level enforcement — not just recommendation. Test checkpoint restore before long runs.</li>
          <li><strong>Container-based workloads:</strong> Reproducibility, dependency isolation, easy migration.</li>
          <li><strong>MLOps from day one:</strong> Experiment tracking (W&B, MLflow), model versioning, reproducible training runs.</li>
          <li><strong>Runbooks for common failures:</strong> Written, tested, accessible. GPU failure, network issue, storage degradation, power event — all covered.</li>
          <li><strong>Spare parts inventory:</strong> InfiniBand cables/transceivers, spare NICs, drives for storage. Mean Time To Repair matters.</li>
          <li><strong>Profile before scaling:</strong> Bottleneck samjho (compute? memory? network? storage?) before adding more GPUs.</li>
        </ul>
      </section>

      {/* ── INTERVIEW QUESTIONS ───────────────────────────────── */}
      <section id="interview-questions">
        <h2 style={S.h2}>Interview Questions</h2>

        {[
          {
            q: "GPU Cluster aur simple 'many GPUs connected' mein kya fundamental difference hai?",
            a: "GPU Cluster sirf hardware connection nahi hai. Ek production cluster mein: compute layer (GPU servers), high-speed networking (InfiniBand/RoCE for inter-node), storage (parallel file systems), management layer (out-of-band BMC/IPMI network), scheduling layer (Slurm/Kubernetes), monitoring layer (DCGM, metrics, alerting), power infrastructure (UPS, PDUs, generators), aur cooling infrastructure. Simply servers wire karne se reliable, efficient, manageable cluster nahi banta — har layer ka proper design aur integration required hai.",
          },
          {
            q: "NVLink, NVSwitch, InfiniBand, aur RoCE mein exactly kya difference hai?",
            a: "NVLink — NVIDIA proprietary intra-server GPU-to-GPU interconnect. Traditional DGX/HGX systems mein same node ke GPUs ke beech high-bandwidth communication. Newer GB200 NVL72 rack-scale architecture mein NVLink domain multiple compute trays tak extend hota hai. NVSwitch — dedicated chip jo NVLink connections switch karta hai, any-to-any full-bandwidth communication enable karta hai within the NVLink domain. InfiniBand — inter-server cluster networking. Purpose-built HPC/AI protocol, very low latency, native RDMA, multi-vendor. RoCE — inter-server networking using standard Ethernet with RDMA. Less expensive than IB, multi-vendor. Ek GPU cluster mein dono simultaneously ho sakte hain different layers pe. Scale-out between rack-scale systems still requires InfiniBand ya Ethernet.",
          },
          {
            q: "East-West traffic kya hai aur network design pe kya impact hai?",
            a: "East-West traffic = servers ka ek dusre se directly communicate karna (peer-to-peer), as opposed to client-server (North-South). GPU clusters mein AllReduce ke dauran sab GPU servers simultaneously gradient data exchange karte hain — massive horizontal traffic between all nodes. Network impact: Standard networks jo North-South ke liye design hain (high oversubscription at spine) fail karte hain GPU clusters ke liye. Large distributed-training clusters often require non-blocking ya carefully engineered low-oversubscription network because collective communication generates very high East-West traffic. Architecture workload requirements pe select karo. Oversubscribed network → AllReduce bottleneck → GPU utilization dramatically drops despite GPUs being active.",
          },
          {
            q: "Data parallelism, tensor parallelism, aur pipeline parallelism kab use karte hain?",
            a: "Data Parallelism: Classic approach model states ko participating GPUs pe replicate karta hai, different data batches distribute karta hai. Modern FSDP/ZeRO model states shard kar sakte hain — simple full-model replication se bade workloads possible. Tensor Parallelism: Individual weight matrices alag GPUs pe split. Very high GPU-to-GPU bandwidth aur low latency required — often kept within NVLink/NVSwitch domain when possible, ya high-speed IB/RoCE inter-server. Constant communication during every forward aur backward pass. Pipeline Parallelism: Model layers ko stages mein split karo, different GPU groups pe. Micro-batching se pipeline bubble reduce karo. Benefits from high-bandwidth, low-latency interconnect such as InfiniBand or RoCE. 3D Parallelism: Sab teen combine — data + tensor + pipeline. Efficiently scales large distributed training workloads. Megatron-LM, DeepSpeed frameworks.",
          },
          {
            q: "GPU cluster mein checkpointing kyun critical hai?",
            a: "Hardware failures at cluster scale are expected, not exceptional. A single node failure does not necessarily bring down the entire cluster, but a distributed training job using that node may fail unless the framework supports fault tolerance or elastic recovery. Multi-week training run mein ek failure se zero se restart karna = days/weeks of expensive compute lost. Checkpoint = periodic save of model weights, optimizer states, RNG state. Failure pe last checkpoint se resume. Checkpoint frequency is selected by balancing checkpoint overhead (write time) against the amount of training work the organization is willing to lose after a failure. Test checkpoint restore before long jobs — corrupted checkpoint = false confidence.",
          },
          {
            q: "GPU cluster mein management network alag kyun rakhni chahiye?",
            a: "Teen key reasons: Security — training traffic (sensitive model weights, proprietary data) aur management traffic (admin SSH, monitoring) separate honi chahiye. Reliability — compute network issue troubleshoot karte waqt management network se access available rehna chahiye. Compute network down ho toh bhi BMC/IPMI se server remotely access, power cycle, diagnose kar sako. Performance — management traffic (monitoring, console access) compute network pe allow karne se AllReduce performance impact ho sakti hai. Implementation: Har GPU server mein dedicated management NICs (1 GbE), separate switches, BMC port on completely separate out-of-band management network.",
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
            ["AllReduce", "Collective operation jisme sab participating GPUs apna data share karte hain, aggregate karte hain, result sab ko milta hai. Distributed training gradient sync ka core operation."],
            ["BMC (Baseboard Management Controller)", "Server chip for out-of-band management. OS crash hone pe bhi remote access — power cycle, console, health status."],
            ["CDU (Cooling Distribution Unit)", "Facility water aur IT liquid cooling loop ke beech separator unit. Secondary loop IT equipment protect karta hai."],
            ["CRAC/CRAH", "Computer Room Air Conditioning/Handling unit. Traditional data center air cooling. GPU clusters mein high-density pe insufficient."],
            ["CUDA", "NVIDIA GPU programming platform. AI frameworks GPU pe CUDA ke through code run karte hain."],
            ["Data Parallelism", "Distributed training approach: model states (or shards via FSDP/ZeRO) har GPU pe, different data batches each pe."],
            ["DCGM", "NVIDIA Data Center GPU Manager. GPU health metrics, ECC errors, utilization — cluster-wide monitoring ke liye."],
            ["DDP (Distributed Data Parallel)", "PyTorch ka data parallelism framework. NCCL AllReduce use karta hai."],
            ["ECC (Error Correcting Code)", "Memory error detection and correction. Correctable (single-bit, auto-fixed), uncorrectable (multi-bit, GPU action required)."],
            ["Fat-tree topology", "Cluster network design. Leaf-spine architecture providing high bisection bandwidth."],
            ["FSDP (Fully Sharded Data Parallel)", "PyTorch framework that shards model states across GPUs — enables larger models than simple data parallelism replication."],
            ["GPUDirect RDMA", "GPU directly network se data bhejta/receive karta hai, CPU bypass. Cluster-wide GPU-to-GPU communication ke liye."],
            ["GPUDirect Storage", "GPU directly supported storage se data read karta hai, CPU memory bypass. Requires supported storage, filesystem, NIC/PCIe topology, drivers aur software configuration."],
            ["HBM (High Bandwidth Memory)", "GPU ka on-package ultra-fast memory. Model weights, activations, gradients yahan hote hain during compute."],
            ["InfiniBand (IB)", "High-performance specialized cluster networking. Low latency, high bandwidth, native RDMA. NVIDIA-dominant."],
            ["Kubernetes", "Container orchestration platform. GPU workloads ke liye NVIDIA GPU Operator ke saath use hota hai."],
            ["Leaf switch", "Fat-tree mein lower-tier switch jo servers se directly connect hota hai."],
            ["Lustre", "Open-source parallel file system for HPC/AI clusters. MDS + MDT (metadata) + OSS + OST (data)."],
            ["MFU (Model FLOP Utilization)", "Actual useful compute as fraction of theoretical peak FLOPS. Better training efficiency metric than raw GPU utilization."],
            ["NCCL", "NVIDIA Collective Communications Library. AllReduce, AllGather etc. for distributed training. Topology-aware."],
            ["NIC (Network Interface Card)", "Server ka network adapter. GPU servers mein multiple NICs — management aur high-speed compute ke liye."],
            ["NVLink", "NVIDIA proprietary GPU-to-GPU interconnect. Primarily intra-server; extended to rack-scale in GB200 NVL72 architecture."],
            ["NVSwitch", "NVIDIA chip enabling all-to-all NVLink connectivity within a server or rack-scale NVLink domain."],
            ["NVMe (Non-Volatile Memory Express)", "Fast SSD interface over PCIe. Local server storage — OS, framework, local checkpoints."],
            ["PCIe (Peripheral Component Interconnect Express)", "Standard bus interface for CPU-to-GPU, CPU-to-NIC, CPU-to-NVMe within server. Also supports PCIe P2P on compatible platforms."],
            ["Pipeline Parallelism", "Model layers ko consecutive stages mein split karo across GPU groups. Micro-batching reduces pipeline bubble."],
            ["RDMA (Remote Direct Memory Access)", "Direct memory access over network — CPU overhead bypass. InfiniBand aur RoCE dono RDMA support karte hain."],
            ["RCCL", "AMD Collective Communications Library. NCCL ka AMD equivalent. AMD GPU distributed training ke liye."],
            ["RoCE (RDMA over Converged Ethernet)", "RDMA over standard Ethernet infrastructure. Less expensive than IB; requires lossless Ethernet configuration."],
            ["Slurm", "Standard HPC/AI cluster job scheduler. Gang scheduling, fair share, partitions, accounting."],
            ["Spine switch", "Fat-tree mein upper-tier switch jo leaf switches ko interconnect karta hai."],
            ["Tensor Parallelism", "Individual weight tensors/matrices ko multiple GPUs pe split karna. Very high bandwidth GPU-to-GPU required."],
            ["ToR (Top-of-Rack) switch", "Rack ke andar switch jo us rack ke servers ko cluster network se connect karta hai aur traffic leaf/spine fabric ki taraf forward karta hai."],
            ["XID error", "NVIDIA GPU error code. GPU driver ya hardware issue indicate karta hai. Type-specific meaning."],
            ["ZeRO (Zero Redundancy Optimizer)", "Model aur optimizer states sharding across GPUs — reduces memory footprint, enables larger model training."],
          ]}
        />
      </section>

      {/* ── KEY TAKEAWAYS ─────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li><strong>GPU Cluster ek complete system hai, sirf servers ka collection nahi:</strong> Compute, networking (compute + management), storage, scheduling, monitoring, power, cooling, operations — sab layers milake production GPU cluster banate hain. Koi bhi layer neglect karo → system problem.</li>
          <li><strong>Management network aur compute network hamesha alag rakhni chahiye:</strong> Management (BMC, monitoring, OS access) physically separate NICs, switches pe. Ek ka issue doosre pe impact nahi karna chahiye. Troubleshooting critical hai jab compute network issue ho.</li>
          <li><strong>NVLink, InfiniBand, RoCE, PCIe — alag technologies, alag roles:</strong> NVLink = NVIDIA intra-server/rack-scale NVLink domain GPU interconnect. InfiniBand/RoCE = inter-server cluster fabric. PCIe = CPU-to-device within server. Dono ek cluster mein simultaneously alag layers pe. Scale-out between systems still requires InfiniBand ya Ethernet.</li>
          <li><strong>East-West traffic GPU cluster network design ko dominate karta hai:</strong> AllReduce = massive horizontal GPU-to-GPU traffic. Large distributed-training clusters often require non-blocking ya low-oversubscription fabric. Oversubscribed network → AllReduce bottleneck → training throughput drops dramatically.</li>
          <li><strong>GPU Memory Available ≠ Maximum Model Size:</strong> Actual model size supported depends on inference vs training, precision, quantization, optimizer states, gradients, activations, batch size, framework overhead aur parallelism strategy. Training mein 80 GB GPU pe 80 GB model fit nahi hota.</li>
          <li><strong>Checkpointing mandatory hai, optional nahi:</strong> Single node failure distributed training job fail kar sakta hai. Checkpoint se resume karo — zero se nahi. Checkpoint frequency balance karo overhead vs acceptable loss. Test restore before long runs.</li>
          <li><strong>GPU utilization sirf ek number nahi hai:</strong> Raw GPU utilization (nvidia-smi) ≠ efficiency. GPU high utilization show kar sakta hai jabki memory-bound ya communication-bound ho. MFU, training throughput, aur component-wise profiling se actual performance samjho.</li>
          <li><strong>Distributed training parallelism correctly choose karo:</strong> Data parallelism (classic replication ya FSDP/ZeRO sharding) — simplest. Tensor parallelism — very high bandwidth needed. Pipeline parallelism — very large models. 3D parallelism combines all three to efficiently scale large distributed workloads.</li>
          <li><strong>Hardware failures at scale expected events hain:</strong> Design for it — not just against it. Scheduler fault tolerance, checkpoint recovery, proactive monitoring, runbooks for common failures — first-class requirements. Large cluster = hardware failures happen regularly.</li>
          <li><strong>Power aur cooling cluster hardware se pehle plan karo:</strong> Cooling infrastructure retrofitting expensive aur disruptive. Power distribution follow karo manufacturer specs + applicable codes. Liquid cooling increasingly important for high-density deployments — CDU architecture carefully plan karo.</li>
        </ul>
      </section>

    </article>
  );
}
