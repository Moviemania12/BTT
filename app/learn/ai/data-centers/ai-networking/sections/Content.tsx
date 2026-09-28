"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { aiNetworkingContent } from "@/content/ai-networking";

import AiNetworkEndToEnd from "../svg/AiNetworkEndToEnd";
import IntraVsInterNode from "../svg/IntraVsInterNode";
import EcnPfcFlow from "../svg/EcnPfcFlow";
import NetworkTroubleshootingFlow from "../svg/NetworkTroubleshootingFlow";
import AiDcNetworkArchitecture from "../svg/AiDcNetworkArchitecture";

void aiNetworkingContent;

export default function Content() {
  return (
    <article>

      {/* ── QUICK SUMMARY ─────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          In the <TopicLink slug="gpu-cluster" variant="inline" /> article, you read that in distributed AI training, all GPUs need to sync gradients at every step. This sync happens over the network. If the network is slow or congested, even a powerful GPU ends up waiting on communication — expensive hardware sits idle.
        </p>
        <p style={S.p}>
          AI Networking is the complete ecosystem of network technologies, topologies, protocols and configurations that enables high-bandwidth, low-latency communication between GPU servers in AI data centers.
        </p>
        <p style={S.p}>
          The basic path is: <strong>GPU → PCIe → NIC/RNIC → Leaf Switch → Spine → Leaf Switch → NIC/RNIC → GPU</strong>. But within this simple path lie a lot of technologies — RDMA, InfiniBand, RoCE, PFC, ECN, NCCL, leaf-spine topology — that together make this communication efficient.
        </p>
        <p style={S.p}>
          This article explains all these technologies systematically — starting from beginner-friendly basics all the way to O&M engineer-level depth.
        </p>
      </section>

      {/* ── WHO SHOULD READ ───────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>Students &amp; Beginners:</strong> Why GPU networking matters — we'll understand it from zero.</li>
          <li><strong>Data Center Engineers:</strong> AI cluster network design, cabling, topology planning.</li>
          <li><strong>Network Engineers:</strong> AI-specific networking requirements vs traditional DC networking.</li>
          <li><strong>AI Infrastructure Engineers:</strong> RDMA, NCCL, congestion control, performance tuning.</li>
          <li><strong>O&amp;M Engineers:</strong> Monitoring, troubleshooting, failure analysis, optics maintenance.</li>
        </ul>
      </section>

      {/* ── LEARNING PATH ─────────────────────────────────── */}
      <section id="learning-path">
        <h2 style={S.h2}>Learning Path</h2>
        <ul style={S.ul}>
          <li><strong>Previous:</strong> <TopicLink slug="gpu-cluster" variant="inline" /> — GPU servers, distributed training, AllReduce basics</li>
          <li><strong>Current:</strong> AI Networking — the network fabric that enables GPU communication</li>
          <li><strong>Next:</strong> <TopicLink slug="ai-storage" variant="inline" /> — parallel file systems, checkpointing, storage hierarchy</li>
        </ul>
      </section>

      {/* ── WHY SPECIALIZED ───────────────────────────────── */}
      <section id="why-specialized">
        <h2 style={S.h2}>Why AI Needs Specialized Networking</h2>
        <p style={S.p}>
          Traditional enterprise networking is mainly designed for North-South traffic — a request goes from a user's laptop to a server, and a response comes back. Email, web browsing, file sharing — these are all relatively lightweight, burst-tolerant workloads.
        </p>
        <p style={S.p}>
          In AI training clusters, the traffic pattern is fundamentally different. Thousands of GPU servers simultaneously exchange gradients with each other — this is massive East-West traffic. This happens at every training step, continuously, for hours or days.
        </p>
        <p style={S.p}><strong>Specific AI networking demands:</strong></p>
        <ul style={S.ul}>
          <li><strong>High bandwidth:</strong> Large gradient tensors — potentially gigabytes — need to be transferred fast.</li>
          <li><strong>Low latency:</strong> Delay accumulates at every sync operation across millions of training steps.</li>
          <li><strong>High message rate:</strong> Collective operations also involve many small messages — IOPS matters.</li>
          <li><strong>Synchronized communication:</strong> All GPUs sync together — any one slow GPU or network path can slow everyone down.</li>
          <li><strong>Congestion tolerance:</strong> Traffic patterns are bursty — network congestion needs to be handled gracefully.</li>
        </ul>
        <Callout type="important" title="Not Every AI Workload Has the Same Requirements">
          This is an important nuance. Small experiments (single server), fine-tuning (few GPUs), and inference serving have networking requirements very different from large-scale pre-training. InfiniBand or ultra-low-latency networking isn't required for every AI use case. Actual requirements depend on the workload, model size, training/inference, topology, and collective communication patterns.
        </Callout>
      </section>

      {/* ── SERVER ARCHITECTURE ───────────────────────────── */}
      <section id="server-architecture">
        <h2 style={S.h2}>AI Server Networking Architecture</h2>
        <p style={S.p}>
          It's important to understand the full chain of a GPU server's network. There are two different types of communication here:
        </p>
        <Figure caption="AI Network End-to-End Architecture: GPU → PCIe → NIC/RNIC → Leaf Switch → Spine → Leaf Switch → NIC/RNIC → GPU. NVLink connects GPUs within a server (not across servers). ECMP on spine distributes traffic across multiple paths.">
          <AiNetworkEndToEnd />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Intra-node (within server):</strong> NVLink and NVSwitch — on NVIDIA's supported GPU platforms, GPUs communicate directly at high speed. This is not a data center network.</li>
          <li><strong>PCIe:</strong> A standard interface between GPU, CPU, and NIC within the server. Data flow: GPU memory → PCIe → NIC → network.</li>
          <li><strong>NIC/RNIC:</strong> Network Interface Card — connects the server to the network. RNIC = RDMA-capable NIC.</li>
          <li><strong>Leaf/ToR Switch:</strong> The switch within the rack, or ToR (Top-of-Rack) switch — connects all servers in that rack to the network fabric.</li>
          <li><strong>Spine:</strong> Interconnects multiple leaf switches. ECMP (Equal-Cost Multi-Path) distributes traffic across multiple paths.</li>
        </ul>
        <Callout type="warning" title="NVLink Is Not a Data Center Network">
          NVLink is NVIDIA's proprietary GPU-to-GPU interconnect that works within a server (or in supported rack-scale platforms). It is not InfiniBand or Ethernet. Both can exist simultaneously in a GPU server — NVLink for intra-node communication, and InfiniBand/Ethernet for inter-node communication. Don't mix them up.
        </Callout>
      </section>

      {/* ── INTRA VS INTER NODE ───────────────────────────── */}
      <section id="intra-vs-inter">
        <h2 style={S.h2}>Intra-Node vs Inter-Node Communication</h2>
        <Figure caption="Intra-Node (left): GPUs within one server connected via NVLink/NVSwitch — high bandwidth, low latency, NVIDIA-specific, NOT a data center network. PCIe connects GPU to CPU and NIC. Inter-Node (right): Between different servers via NIC → network fabric (InfiniBand or Ethernet/RoCE) — completely different technology from NVLink.">
          <IntraVsInterNode />
        </Figure>
        <ComparisonTable
          title="Intra-Node vs Inter-Node Communication"
          headers={["Factor", "Intra-Node", "Inter-Node"]}
          rows={[
            ["Technology", "NVLink, NVSwitch, PCIe", "InfiniBand, Ethernet, RoCE"],
            ["Scope", "Within one server", "Between different servers"],
            ["Bandwidth", "Very high (depends on platform)", "Link speed (e.g., 100/200/400 Gbps)"],
            ["Latency", "Very low (direct chip-to-chip)", "Higher (network hops, serialization)"],
            ["Ecosystem", "NVIDIA-specific (NVLink/NVSwitch)", "Multi-vendor (IB/Ethernet)"],
            ["Standard", "Proprietary (NVLink)", "Open standards (IB spec, IEEE Ethernet)"],
            ["Scale", "GPUs within one server/platform", "Entire cluster across racks"],
          ]}
        />
        <p style={S.p}>
          This distinction is critical. When we talk about an "AI networking bottleneck," we typically mean the inter-node network fabric — from the NIC to the spine switches. NVLink is an intra-node optimization, not a solution to an inter-node bottleneck.
        </p>
      </section>

      {/* ── GPU TO GPU ────────────────────────────────────── */}
      <section id="gpu-to-gpu">
        <h2 style={S.h2}>GPU-to-GPU Communication</h2>
        <p style={S.p}>
          When one GPU needs to exchange data with a GPU on another server, this path is followed:
        </p>
        <ol style={S.ol}>
          <li>Data becomes ready in GPU memory (HBM).</li>
          <li>Data transfers through the PCIe bus into CPU/system memory (or goes directly to the NIC via GPUDirect).</li>
          <li>The NIC/RNIC takes the data and transmits it on the network.</li>
          <li>The receiving server's NIC receives the data.</li>
          <li>Data transfers into the receiving GPU's memory.</li>
        </ol>
        <p style={S.p}>
          <strong>GPUDirect RDMA</strong> is a specific technology (available on NVIDIA platforms, in supported configurations) that connects GPU memory directly to the network fabric — bypassing CPU memory. This reduces CPU overhead and can improve latency. But this isn't automatic in every RDMA deployment — it requires specific hardware, driver, and software stack support.
        </p>
        <Callout type="important" title="GPU Direct RDMA = Specific Technology, Not Universal RDMA Behavior">
          RDMA (Remote Direct Memory Access) and GPUDirect RDMA are different things. Standard RDMA typically operates between CPU memory and remote CPU memory. GPUDirect RDMA specifically provides a direct path between GPU memory and the network. On supported platforms there are significant performance benefits, but don't assume every RDMA setup is automatically GPUDirect.
        </Callout>
      </section>

      {/* ── COLLECTIVE COMM ───────────────────────────────── */}
      <section id="collective-comm">
        <h2 style={S.h2}>Collective Communication</h2>
        <p style={S.p}>
          In distributed AI training, it's not just point-to-point (A to B) communication. All GPUs need to be coordinated — this is where collective communication operations come in.
        </p>
        <p style={S.p}>
          These operations expose networking bottlenecks because: all nodes communicate simultaneously, large amounts of data get transferred, and training can't continue until the sync completes.
        </p>
      </section>

      {/* ── ALLREDUCE ─────────────────────────────────────── */}
      <section id="allreduce">
        <h2 style={S.h2}>AllReduce</h2>
        <p style={S.p}>
          AllReduce is the most critical collective operation in distributed AI training. After every training step, all GPUs contribute their gradients, they get averaged/summed, and everyone gets the result.
        </p>
        <p style={S.p}><strong>Simple example:</strong> 4 GPUs are training on data. Each GPU computes gradients on its own batch. With AllReduce: GPU1 gradient + GPU2 gradient + GPU3 gradient + GPU4 gradient = sum, then divide by 4 = average. All 4 GPUs get this average. Everyone starts the next step from the same point.</p>
        <p style={S.p}>
          In large models, gradient tensors are very large. AllReduce data volume = model size × number of participating GPUs / ring size (depending on the algorithm). This is why high network bandwidth is critical for large-scale training.
        </p>
      </section>

      {/* ── ALLGATHER ─────────────────────────────────────── */}
      <section id="allgather">
        <h2 style={S.h2}>AllGather</h2>
        <p style={S.p}>
          In AllGather, each node shares its own data, and the result is the combined data of all nodes (concatenated, not summed). No reduction happens.
        </p>
        <p style={S.p}><strong>Example:</strong> 4 nodes, each with its own data chunk D1, D2, D3, D4. After AllGather, every node has [D1, D2, D3, D4].</p>
        <p style={S.p}>
          In AI training, AllGather is used in FSDP (Fully Sharded Data Parallel) and ZeRO optimization — to collect model parameter shards before the forward pass.
        </p>
      </section>

      {/* ── REDUCESCATTER ─────────────────────────────────── */}
      <section id="reducescatter">
        <h2 style={S.h2}>ReduceScatter</h2>
        <p style={S.p}>
          ReduceScatter is the first half of AllReduce. All nodes contribute data, reduction (sum/average) happens, but the result is distributed to different nodes in equal chunks — each node keeps only its own portion.
        </p>
        <p style={S.p}>
          ReduceScatter is used in FSDP/ZeRO gradient computation — all nodes share gradients and each node takes responsibility for its own gradient shard.
        </p>
      </section>

      {/* ── BROADCAST ─────────────────────────────────────── */}
      <section id="broadcast">
        <h2 style={S.h2}>Broadcast</h2>
        <p style={S.p}>
          In Broadcast, one node (the root) sends its data to all other nodes. The other nodes receive the data.
        </p>
        <p style={S.p}>
          In AI training, Broadcast is used during model initialization — the model initialized on the root node is broadcast to all nodes so everyone trains starting from the same point.
        </p>
      </section>

      {/* ── ALL TO ALL ────────────────────────────────────── */}
      <section id="all-to-all">
        <h2 style={S.h2}>All-to-All</h2>
        <p style={S.p}>
          In All-to-All, every node sends data to every other node — with N nodes that's N×N transfers. This is the most network-intensive collective operation.
        </p>
        <p style={S.p}>
          All-to-All sees heavy use in Expert Parallel training (Mixture of Experts models) — to route tokens to different expert GPUs. This operation can put extreme pressure on the network fabric.
        </p>
      </section>

      {/* ── NCCL ──────────────────────────────────────────── */}
      <section id="nccl">
        <h2 style={S.h2}>NCCL</h2>
        <p style={S.p}>
          NCCL (NVIDIA Collective Communications Library) is a software library — it is NOT a physical network or fabric. NCCL efficiently implements all these collective operations (AllReduce, AllGather, etc.) for GPU systems.
        </p>
        <p style={S.p}><strong>What NCCL does:</strong></p>
        <ul style={S.ul}>
          <li>Detects topology — are the GPUs on the same server or on different servers?</li>
          <li>Chooses the best communication path — NVLink (faster, intra-node) or the network fabric (inter-node).</li>
          <li>Efficiently implements Ring-AllReduce or tree-based algorithms.</li>
          <li>Uses GPU memory directly without unnecessary CPU copies (where GPUDirect is available).</li>
        </ul>
        <p style={S.p}>
          Frameworks like PyTorch and TensorFlow use NCCL internally. Developers don't need to call NCCL explicitly.
        </p>
        <Callout type="warning" title="NCCL Is Not a Network">
          NCCL is a communication library — software. When people say "NCCL is slow," what's actually slow is the network, PCIe, or a NUMA bottleneck — NCCL is just exposing that bottleneck. You don't fix NCCL, you fix the underlying network infrastructure.
        </Callout>
        <p style={S.p}><strong>AMD RCCL:</strong> For AMD GPU clusters, RCCL (ROCm Collective Communications Library) is the equivalent of NCCL — similar collective operations, optimized for AMD GPU architecture.</p>
      </section>

      {/* ── RDMA ──────────────────────────────────────────── */}
      <section id="rdma">
        <h2 style={S.h2}>RDMA — Remote Direct Memory Access</h2>
        <p style={S.p}>
          In traditional networking, the data transfer path is: Application → Kernel network stack → NIC → Network → NIC → Kernel network stack → Application. Every step involves CPU involvement and memory copies.
        </p>
        <p style={S.p}>
          RDMA (Remote Direct Memory Access) dramatically shortens this path. With RDMA: one machine can directly read/write into another machine's memory without involving the other machine's CPU. Data goes directly from memory through the NIC — the kernel is bypassed.
        </p>
        <p style={S.p}><strong>Benefits of RDMA:</strong></p>
        <ul style={S.ul}>
          <li><strong>Low CPU overhead:</strong> The CPU isn't busy with data transfer — it stays available for GPU compute.</li>
          <li><strong>Low latency:</strong> Kernel bypass significantly reduces latency.</li>
          <li><strong>High throughput:</strong> With the CPU bottleneck removed, high sustained bandwidth is possible.</li>
          <li><strong>Zero-copy:</strong> Unnecessary memory copies are avoided.</li>
        </ul>
        <p style={S.p}><strong>RNIC (RDMA-capable NIC):</strong> A special network adapter is needed to use RDMA — the RNIC. This NIC accelerates complex network protocol processing (typically the kernel's job) in hardware.</p>
        <Callout type="important" title="RDMA Is Not a Synonym for InfiniBand">
          RDMA is a communication technology/mechanism. It can be implemented over InfiniBand (natively), over Ethernet (via RoCE), and over a few other transports. InfiniBand always uses RDMA, but RDMA isn't limited to InfiniBand alone. RoCE = RDMA over Converged Ethernet.
        </Callout>
      </section>

      {/* ── INFINIBAND ────────────────────────────────────── */}
      <section id="infiniband">
        <h2 style={S.h2}>InfiniBand</h2>
        <p style={S.p}>
          InfiniBand is a high-performance networking fabric/technology specifically designed for HPC (High Performance Computing) and AI clusters. It is fundamentally different from standard Ethernet — different physical layer, different protocol stack, different ecosystem.
        </p>
        <p style={S.p}><strong>InfiniBand architecture:</strong></p>
        <ul style={S.ul}>
          <li><strong>HCA (Host Channel Adapter):</strong> The InfiniBand adapter installed in a server — the equivalent of an Ethernet NIC, but for the InfiniBand fabric. Natively supports RDMA.</li>
          <li><strong>InfiniBand Switches:</strong> Specialized switches that form the InfiniBand fabric. They are not regular Ethernet switches.</li>
          <li><strong>Subnet Manager (SM):</strong> The software that manages the InfiniBand fabric — routing, addressing, port configuration. Typically runs on a dedicated server or switch.</li>
          <li><strong>Fabric:</strong> The entire InfiniBand network is called a "fabric" — a logical unit within a subnet.</li>
          <li><strong>Partitions:</strong> InfiniBand has a concept of partitions — logically isolating different workloads while sharing the physical fabric.</li>
        </ul>
        <p style={S.p}>
          Why InfiniBand is popular in AI clusters: very low latency (microsecond range), high bandwidth, mature RDMA support, and a large-scale HPC heritage. NVIDIA (Mellanox) is the dominant player in the InfiniBand ecosystem.
        </p>
        <Callout type="important" title="InfiniBand Is Not Just 'Ethernet with RDMA'">
          This is a common misconception. InfiniBand and Ethernet/RoCE are different technologies — different physical standards, different protocol stacks, different management tools, different ecosystems. Both support RDMA, but the implementation is different.
        </Callout>
      </section>

      {/* ── ETHERNET FOR AI ───────────────────────────────── */}
      <section id="ethernet-for-ai">
        <h2 style={S.h2}>Ethernet for AI</h2>
        <p style={S.p}>
          Ethernet is absolutely suitable for AI clusters — it's a common misconception that only InfiniBand works. Large-scale AI training happens successfully with a combination of modern high-speed Ethernet (100/200/400 GbE and upcoming higher speeds) and RoCEv2.
        </p>
        <p style={S.p}><strong>Ethernet's advantages for AI:</strong></p>
        <ul style={S.ul}>
          <li><strong>Broad ecosystem:</strong> Multi-vendor hardware, wide availability, lower cost per port.</li>
          <li><strong>Flexible routing:</strong> IP routing, standard tooling, familiar operations.</li>
          <li><strong>Scale:</strong> Very large fabrics can be built with Ethernet switches.</li>
          <li><strong>RoCE:</strong> RDMA capabilities over Ethernet — high performance with the right configuration.</li>
        </ul>
        <p style={S.p}><strong>Challenges with Ethernet for AI:</strong></p>
        <ul style={S.ul}>
          <li>Standard TCP/IP Ethernet carries high CPU overhead — RDMA (RoCE) needs careful configuration.</li>
          <li>PFC and ECN configuration are required for a lossless fabric — additional complexity.</li>
          <li>Congestion management tuning is workload-specific.</li>
        </ul>
        <p style={S.p}>
          Meta, Google, Microsoft — several hyperscalers primarily use Ethernet-based networking in their large AI clusters. InfiniBand typically depends on individual use case, ecosystem, and operational preference.
        </p>
      </section>

      {/* ── ROCE ──────────────────────────────────────────── */}
      <section id="roce">
        <h2 style={S.h2}>RoCE — RDMA over Converged Ethernet</h2>
        <p style={S.p}>
          RoCE is a technology that provides RDMA capabilities over standard Ethernet infrastructure. It's called "Converged Ethernet" because it converges LAN traffic and storage/RDMA traffic onto the same Ethernet fabric.
        </p>
        <p style={S.p}>
          RoCE needs an RNIC (RDMA-capable Ethernet NIC) — RoCE doesn't work on a regular Ethernet NIC.
        </p>
        <p style={S.p}><strong>Why RoCE for AI:</strong> You get RDMA's low-latency and low-CPU-overhead benefits on Ethernet infrastructure — existing Ethernet skills and tooling can be reused.</p>
      </section>

      {/* ── ROCE V1 V2 ────────────────────────────────────── */}
      <section id="roce-v1-v2">
        <h2 style={S.h2}>RoCEv1 vs RoCEv2</h2>
        <ComparisonTable
          title="RoCEv1 vs RoCEv2"
          headers={["Factor", "RoCEv1", "RoCEv2"]}
          rows={[
            ["Layer", "Layer 2 (Ethernet)", "Layer 3 (IP/UDP)"],
            ["Encapsulation", "Ethernet frames directly", "UDP/IP encapsulation"],
            ["Routable", "No — same broadcast domain only", "Yes — can traverse IP routers"],
            ["Scalability", "Limited to L2 domain", "Scales across routed networks"],
            ["Deployment", "Older, limited use", "Current standard for AI/HPC"],
            ["Congestion control", "PFC (L2)", "PFC + ECN (L3-aware)"],
            ["Subnet Manager", "Not required", "Standard IP routing"],
          ]}
        />
        <Callout type="important" title="RoCEv2 Runs on UDP/IP — Not Layer-2 Only">
          RoCEv2 uses UDP/IP encapsulation and is Layer-3 routable. Don't call it "Layer-2-only RDMA" — that's technically incorrect. RoCEv2 can be deployed in modern leaf-spine topologies that use IP routing.
        </Callout>
      </section>

      {/* ── PFC ───────────────────────────────────────────── */}
      <section id="pfc">
        <h2 style={S.h2}>PFC — Priority Flow Control</h2>
        <p style={S.p}>
          PFC (IEEE 802.1Qbb) is an Ethernet mechanism that provides pause behavior for specific traffic priorities. When a switch port's buffer starts getting almost full, it sends a PAUSE frame to the upstream neighbor for that specific priority.
        </p>
        <p style={S.p}><strong>Why PFC for RDMA:</strong> Standard RDMA protocols assume a lossless network — if a packet drops, the RDMA operation can fail or slow down. PFC helps avoid packet drops for RoCE traffic on a specific priority class.</p>
        <p style={S.p}><strong>PFC risks and limitations:</strong></p>
        <ul style={S.ul}>
          <li><strong>Head-of-Line Blocking (HoL):</strong> Other flows can also get blocked because of one paused priority class if they share the same port.</li>
          <li><strong>Congestion Propagation:</strong> The PAUSE can cascade — switch A pauses switch B, switch B pauses switch C, and so on. Congestion can spread across the entire fabric.</li>
          <li><strong>PFC Storm:</strong> Misconfiguration or topology issues can cause PAUSE frames to loop indefinitely — essentially a fabric deadlock.</li>
          <li><strong>Limited scope:</strong> PFC only works between directly connected ports for one specific priority — the whole fabric isn't "lossless."</li>
        </ul>
        <Callout type="warning" title="PFC = Per-Priority Pause, Not 'Lossless Network'">
          PFC does not make the entire Ethernet network universally lossless. It's a per-priority pause mechanism that needs to be carefully designed and configured. Poorly designed PFC can cause PFC storms and congestion propagation. Complement PFC with ECN — don't rely on PFC alone.
        </Callout>
      </section>

      {/* ── ECN ───────────────────────────────────────────── */}
      <section id="ecn">
        <h2 style={S.h2}>ECN — Explicit Congestion Notification</h2>
        <p style={S.p}>
          ECN (RFC 3168) is an IP-level mechanism for congestion signaling. When a switch buffer starts filling up, instead of dropping the packet, it marks ECN bits in the packet header.
        </p>
        <p style={S.p}><strong>ECN flow:</strong></p>
        <ol style={S.ol}>
          <li>The congested switch marks the packet's ECN field (CE = Congestion Experienced).</li>
          <li>The receiver sees this mark and sends a CNP (Congestion Notification Packet) to the sender.</li>
          <li>The sender reduces its transmission rate.</li>
          <li>Congestion eases as the rate decreases.</li>
        </ol>
        <p style={S.p}>
          ECN is different from PFC because: ECN is rate-based control (smooth), while PFC is pause-based (stop-and-go). ECN signals packet drops — it doesn't itself guarantee against packet loss. If congestion is very severe, drops can still happen despite ECN marking.
        </p>
        <Figure caption="ECN and PFC — Two distinct congestion control mechanisms. ECN (left): Rate-based marking and feedback loop — smoother, IP-level. PFC (right): Per-priority pause frames — immediate but with risks of head-of-line blocking and storm propagation. Both serve complementary roles in RoCE networks.">
          <EcnPfcFlow />
        </Figure>
      </section>

      {/* ── CNP CONGESTION ────────────────────────────────── */}
      <section id="cnp-congestion">
        <h2 style={S.h2}>CNP and RoCE Congestion Control</h2>
        <p style={S.p}>
          CNP (Congestion Notification Packet) is used specifically in RoCE congestion control. When the receiver receives an ECN-marked packet, it sends a CNP to the sender.
        </p>
        <p style={S.p}>
          The RoCE sender reduces its injection rate upon receiving the CNP. This mechanism complements PFC — PFC provides short-term burst protection, ECN/CNP handles long-term rate adjustment.
        </p>
        <p style={S.p}>
          Congestion control algorithms can differ across different vendors' RDMA implementations. The specific behavior depends on hardware and driver version — don't treat any specific vendor's implementation as a universal standard.
        </p>
      </section>

      {/* ── TCP VS RDMA ───────────────────────────────────── */}
      <section id="tcp-vs-rdma">
        <h2 style={S.h2}>TCP vs RDMA</h2>
        <ComparisonTable
          title="TCP/IP vs RDMA for AI Workloads"
          headers={["Factor", "TCP/IP", "RDMA"]}
          rows={[
            ["CPU involvement", "High — kernel processes every packet", "Low — kernel bypass, hardware handles transfer"],
            ["Latency", "Higher — kernel overhead, context switches", "Lower — direct memory access"],
            ["Memory copies", "Multiple copies (kernel buffers)", "Zero-copy possible"],
            ["Reliability", "TCP handles retransmission, ordering", "Assumed reliable network (PFC/ECN) or in-order delivery"],
            ["Deployment", "Simple — standard networking", "Complex — RNIC, lossless fabric configuration"],
            ["Ecosystem", "Universal — any NIC, any switch", "Specific hardware required (RNIC, compatible fabric)"],
            ["AI use", "Small clusters, control plane, inference", "Large-scale training, collective communication"],
            ["Tuning", "Relatively simpler", "PFC, ECN, MTU, QoS all need careful tuning"],
          ]}
        />
        <Callout type="best-practice" title="RDMA Isn't Better for Every Situation">
          RDMA provides significant performance benefits in large-scale distributed training. But: the setup is complex, specific hardware is needed, and lossless fabric configuration is critical. For small experiments, inference serving, and control-plane operations, standard TCP/IP can be adequate. Analyze the workload, then choose.
        </Callout>
      </section>

      {/* ── LEAF SPINE ────────────────────────────────────── */}
      <section id="leaf-spine">
        <h2 style={S.h2}>Leaf-Spine Architecture</h2>
        <p style={S.p}>
          Leaf-Spine (or two-tier Clos) is the standard network topology for AI clusters. Compared to traditional hierarchical networking (Core-Distribution-Access), it handles East-West traffic much better.
        </p>
        <p style={S.p}><strong>Structure:</strong></p>
        <ul style={S.ul}>
          <li><strong>Leaf Switches:</strong> Connect directly to GPU servers (ToR — Top of Rack). Typically one or more leaf switches per rack.</li>
          <li><strong>Spine Switches:</strong> Interconnect multiple leaf switches. Every leaf switch connects to every spine switch.</li>
          <li><strong>Equal-Cost Paths:</strong> There are multiple equal-cost paths from any leaf to any other leaf — ECMP distributes traffic across them.</li>
        </ul>
        <p style={S.p}><strong>Why Leaf-Spine for AI:</strong></p>
        <ul style={S.ul}>
          <li>Consistent latency — any server reaches any other server in the same number of hops.</li>
          <li>Predictable bandwidth — the oversubscription ratio is controllable.</li>
          <li>Scale-out — you can grow the fabric by adding more leaf or spine switches.</li>
          <li>Failure domains — if one spine switch fails, bandwidth reduces but connectivity isn't lost (multiple paths are available).</li>
        </ul>
      </section>

      {/* ── CLOS ECMP ─────────────────────────────────────── */}
      <section id="clos-ecmp">
        <h2 style={S.h2}>Clos Architecture and ECMP</h2>
        <p style={S.p}>
          Clos network is a multi-stage switching fabric concept (described by Charles Clos in the 1950s for telephony). Modern data center leaf-spine is the simplest form of a Clos architecture. In larger clusters, multi-stage (3-stage, 5-stage) Clos fabrics are built.
        </p>
        <p style={S.p}><strong>ECMP (Equal-Cost Multi-Path):</strong> When multiple equal-cost paths exist to a destination, ECMP distributes traffic across these paths. Typically flow-based hashing is used — a flow consistently goes over one path (to avoid reordering).
        </p>
        <p style={S.p}><strong>ECMP limitations:</strong> Hash collisions can cause uneven distribution — some paths get overloaded, some underutilized. For AI AllReduce traffic, this can create the "elephant flow" problem. Advanced load balancing (DLRS, adaptive routing) mitigates this.
        </p>
      </section>

      {/* ── RAIL ARCHITECTURE ─────────────────────────────── */}
      <section id="rail-architecture">
        <h2 style={S.h2}>GPU and NIC Rail Architecture</h2>
        <p style={S.p}>
          The concept of a "Rail" is important in GPU cluster networking. A GPU server typically has multiple NICs (e.g., 8 NICs for 8 GPUs). "Rail" means each GPU has its own dedicated NIC that connects to its own dedicated switch port.
        </p>
        <p style={S.p}><strong>Rail-optimized topology:</strong> GPU 0 → NIC 0 → Switch A port 0. GPU 1 → NIC 1 → Switch A port 1. GPU 2 → NIC 2 → Switch B port 0... This ensures traffic is distributed and no single NIC or switch port gets overloaded.
        </p>
        <p style={S.p}>
          Benefits of rail architecture: balanced bandwidth utilization, no NIC bottleneck, better locality (same-rail GPUs can communicate faster).
        </p>
        <Callout type="important" title="Rail Topology Is Workload-Specific">
          Rail architecture concepts exist and are beneficial in large GPU deployments. The specific implementation (number of rails, NIC-to-switch mapping, etc.) depends on the hardware platform and workload. There's no universal "standard" rail topology.
        </Callout>
      </section>

      {/* ── BANDWIDTH ─────────────────────────────────────── */}
      <section id="bandwidth">
        <h2 style={S.h2}>Network Bandwidth</h2>
        <p style={S.p}>
          Bandwidth is a network link's maximum data-carrying capacity — typically measured in Gbps (Gigabits per second). Modern AI cluster links operate at 100, 200, 400, or even higher speeds.
        </p>
        <p style={S.p}><strong>Aggregate bandwidth:</strong> A cluster's total bandwidth = the sum of all active links. A server with 8 NICs × 400 Gbps = 3,200 Gbps of server-level bandwidth (theoretical maximum).</p>
        <p style={S.p}><strong>Bidirectional/Full-duplex:</strong> Modern Ethernet and InfiniBand links are full-duplex — send and receive can happen at the same time. A 400 Gbps link = 400 Gbps in each direction simultaneously.</p>
      </section>

      {/* ── GBPS VS GBYTES ────────────────────────────────── */}
      <section id="gbps-vs-gbytes">
        <h2 style={S.h2}>Gbps vs GB/s</h2>
        <p style={S.p}>
          This confusion is very common — and can cause expensive mistakes in planning.
        </p>
        <p style={S.p}><strong>Gbps = Gigabits per second</strong> (lowercase 'b' = bits). Measures network speed.</p>
        <p style={S.p}><strong>GB/s = Gigabytes per second</strong> (uppercase 'B' = bytes). Measures data throughput.</p>
        <p style={S.p}><strong>Conversion:</strong> 8 bits = 1 byte. So: a 100 Gbps link ≈ 12.5 GB/s maximum throughput (100 ÷ 8 = 12.5). 400 Gbps ≈ 50 GB/s.</p>
        <p style={S.p}>
          <strong>Practical example:</strong> AllReduce needs to transfer 10 GB of data. On a 100 Gbps (= 12.5 GB/s) link, the theoretical minimum time ≈ 10/12.5 = 0.8 seconds. In the real world, protocol overhead, multiple hops, and congestion will make the actual time higher.
        </p>
        <Callout type="warning" title="Gbps ≠ GB/s — 8× Difference">
          Always check this distinction carefully, everywhere. Always verify units in vendor spec sheets, monitoring tools, and capacity planning documents. Don't read 400 Gbps as 400 GB/s — the actual throughput is (approximately) 50 GB/s.
        </Callout>
      </section>

      {/* ── LATENCY ───────────────────────────────────────── */}
      <section id="latency">
        <h2 style={S.h2}>Network Latency</h2>
        <p style={S.p}>
          Latency is the time a packet takes to travel from source to destination — typically measured in microseconds (µs) or milliseconds (ms).
        </p>
        <p style={S.p}><strong>Latency components:</strong></p>
        <ul style={S.ul}>
          <li><strong>Serialization delay:</strong> The time to "serialize" the packet's bits onto the wire — depends on packet size and link speed.</li>
          <li><strong>Propagation delay:</strong> The time for the electrical/optical signal to travel the physical distance — limited by the speed of light.</li>
          <li><strong>Switching/forwarding delay:</strong> The time for a packet to be processed in a switch — nanoseconds to microseconds.</li>
          <li><strong>Queueing delay:</strong> The time a packet waits in a switch buffer during congestion — highly variable.</li>
          <li><strong>Software/stack delay:</strong> OS kernel, driver processing — significantly reduced with RDMA.</li>
        </ul>
        <p style={S.p}><strong>Why latency matters for AI:</strong> AllReduce is a barrier synchronization — all nodes wait to get in sync. If one node has high network latency, all nodes will wait for that one node. Across millions of training steps, accumulated latency can significantly increase training time.
        </p>
        <Callout type="important" title="High Bandwidth ≠ Low Latency">
          These are distinct metrics. A 400 Gbps link can still have poor latency — due to congestion, queueing, or processing delays. Bandwidth and latency are both monitored and optimized independently.
        </Callout>
      </section>

      {/* ── THROUGHPUT BW LAT ─────────────────────────────── */}
      <section id="throughput-bw-lat">
        <h2 style={S.h2}>Throughput vs Bandwidth vs Latency</h2>
        <ComparisonTable
          title="Network Performance Metrics — Distinctions"
          headers={["Metric", "Definition", "Unit", "AI Training Relevance"]}
          rows={[
            ["Bandwidth", "Maximum data carrying capacity of a link", "Gbps, Tb/s", "Theoretical ceiling — actual throughput always less"],
            ["Throughput", "Actual data transferred per unit time", "GB/s, Gbps", "Real collective communication performance"],
            ["Latency", "Time for one packet to travel source to destination", "µs, ms", "Critical for synchronized collective operations"],
            ["Jitter", "Variation in latency over time", "µs", "Causes inconsistent sync times, straggler effects"],
            ["Packet loss", "Percentage of packets not delivered", "%", "RDMA very sensitive — retransmission expensive"],
            ["Congestion", "Overload causing queueing delays and possible drops", "Queue depth, drop rate", "Primary cause of reduced throughput in AI fabrics"],
          ]}
        />
        <p style={S.p}>
          A network can have high theoretical bandwidth but poor throughput due to: congestion (most common), topology bottlenecks (oversubscription), PCIe limitations, small message inefficiency, software overhead, or poor NUMA affinity.
        </p>
      </section>

      {/* ── OVERSUBSCRIPTION ──────────────────────────────── */}
      <section id="oversubscription">
        <h2 style={S.h2}>Oversubscription</h2>
        <p style={S.p}>
          Oversubscription happens when servers' total bandwidth exceeds the uplink bandwidth. Example: 48 servers × 100 Gbps = 4,800 Gbps of server-facing bandwidth, but the spine uplinks total only 1,200 Gbps = 4:1 oversubscription.
        </p>
        <p style={S.p}><strong>Oversubscription ratio = server-facing bandwidth / uplink bandwidth.</strong> 1:1 = no oversubscription (full bisection bandwidth). 2:1 = 2× more server bandwidth than uplink.</p>
        <p style={S.p}><strong>Why oversubscription matters for AI:</strong> AI AllReduce traffic has all nodes generating traffic simultaneously — this is exactly the worst case for oversubscribed networks. Uplinks saturate, queues fill up, and drops occur or PFC triggers.</p>
        <Callout type="important" title="Zero Oversubscription Isn't Mandatory for Every AI Workload">
          It's workload-specific. Small experiments and inference serving can typically tolerate 4:1 or even higher oversubscription. Large-scale synchronous training (e.g., 1000+ GPU AllReduce) prefers lower oversubscription. Benchmark the actual requirement — there's no universal rule. Over-engineering is expensive, under-engineering creates a bottleneck.
        </Callout>
      </section>

      {/* ── BISECTION BANDWIDTH ───────────────────────────── */}
      <section id="bisection-bandwidth">
        <h2 style={S.h2}>Bisection Bandwidth</h2>
        <p style={S.p}>
          Bisection bandwidth is the bandwidth available between two equal halves when a cluster is divided into them. It's a measure of how well a cluster can communicate when traffic crosses the "bisection."
        </p>
        <p style={S.p}>
          Full bisection bandwidth = all nodes in any half of the cluster can simultaneously communicate with the other half at full link speed — no bottleneck.
        </p>
        <p style={S.p}>
          In large-scale AI training jobs, when communication patterns are unpredictable — multiple overlapping AllReduce operations, pipeline parallelism, tensor parallelism — bisection bandwidth can become a bottleneck.
        </p>
      </section>

      {/* ── NIC RNIC ──────────────────────────────────────── */}
      <section id="nic-rnic">
        <h2 style={S.h2}>NIC and RNIC</h2>
        <p style={S.p}><strong>NIC (Network Interface Card):</strong> The hardware that connects a server to the network. Ports, buffers, DMA engines, firmware — it handles all physical-layer networking.</p>
        <p style={S.p}><strong>RNIC (RDMA-capable NIC):</strong> A NIC with RDMA hardware acceleration. Network stack processing (typically the kernel's job) is implemented in hardware — enabling CPU bypass.</p>
        <p style={S.p}><strong>NIC performance factors:</strong></p>
        <ul style={S.ul}>
          <li><strong>Port speed:</strong> Link bandwidth ceiling.</li>
          <li><strong>Number of ports:</strong> Multiple ports = multiple rails possible.</li>
          <li><strong>RDMA capabilities:</strong> Queue pairs, memory regions, completion queues.</li>
          <li><strong>PCIe connectivity:</strong> The NIC's PCIe bandwidth can be a bottleneck — especially with high-speed NICs on PCIe 3.0.</li>
          <li><strong>Firmware version:</strong> Bugs and performance regressions can exist in firmware — important to keep it updated.</li>
          <li><strong>Driver version:</strong> The OS driver needs to be compatible with the NIC firmware.</li>
        </ul>
      </section>

      {/* ── PCIE BOTTLENECK ───────────────────────────────── */}
      <section id="pcie-bottleneck">
        <h2 style={S.h2}>PCIe Bottlenecks</h2>
        <p style={S.p}>
          There's a PCIe bus between the GPU and NIC. PCIe bandwidth is limited — if the NIC and GPU are both sharing the same PCIe bandwidth, a bottleneck can occur.
        </p>
        <p style={S.p}><strong>PCIe bandwidth (approximate, generation/width dependent):</strong></p>
        <ul style={S.ul}>
          <li>PCIe 4.0 x16: ~32 GB/s bidirectional (approximate, depends on implementation)</li>
          <li>PCIe 5.0 x16: ~64 GB/s bidirectional (approximate)</li>
        </ul>
        <p style={S.p}>
          The actual numbers depend on the specific implementation and overhead. Key point: for high-speed NICs (e.g., 400 Gbps = ~50 GB/s), PCIe 4.0 x16 bandwidth may not be sufficient if multiple high-speed devices are sharing the same PCIe complex.
        </p>
        <p style={S.p}><strong>PCIe topology matters:</strong> Data transfer between devices connected to different PCIe root complexes goes through a PCIe switch or CPU interconnect — a potential bottleneck. Having the GPU and NIC on the same PCIe root complex gives better locality.
        </p>
      </section>

      {/* ── NUMA AFFINITY ─────────────────────────────────── */}
      <section id="numa-affinity">
        <h2 style={S.h2}>NUMA and CPU Affinity</h2>
        <p style={S.p}>
          NUMA (Non-Uniform Memory Access) occurs in multi-socket servers. Each CPU socket has its own local memory — local memory access is fast, remote (other socket's) memory access is slower.
        </p>
        <p style={S.p}><strong>NUMA impact on AI networking:</strong></p>
        <ul style={S.ul}>
          <li>A GPU is typically connected to a specific PCIe root complex — so it's "affinitized" to a specific CPU socket.</li>
          <li>The NIC is also connected to a specific PCIe root complex.</li>
          <li>If the GPU is on socket 0 and the NIC is on socket 1, GPU-to-NIC data transfer crosses the socket boundary — slower.</li>
          <li>NCCL and MPI implementations can use NUMA-topology-based affinity hints to optimize performance.</li>
        </ul>
        <p style={S.p}><strong>Fix:</strong> Prefer keeping a GPU and its associated NIC in the same NUMA domain. Consider this in server hardware design and slot placement planning.</p>
      </section>

      {/* ── SWITCH ARCHITECTURE ───────────────────────────── */}
      <section id="switch-architecture">
        <h2 style={S.h2}>Switch Architecture</h2>
        <p style={S.p}>
          AI fabric switches have different requirements from conventional enterprise switches. Key architectural aspects:
        </p>
        <ul style={S.ul}>
          <li><strong>ASIC (Application-Specific Integrated Circuit):</strong> The switch's forwarding engine. Determines per-port bandwidth, latency, buffer size, and features. Different vendors have different ASIC designs — don't treat any one as a universal standard.</li>
          <li><strong>Switch buffers:</strong> During congestion, packets queue up in in-switch buffers. AI traffic patterns are bursty — deeper buffers absorb congestion but a large queue increases latency. Buffer sizing is a trade-off.</li>
          <li><strong>Queues and QoS:</strong> Per-port, per-priority queues — different traffic types (RDMA, management, storage) go into separate queues.</li>
          <li><strong>ECMP implementation:</strong> Hash algorithm quality determines the uniformity of path distribution. Better hashing = fewer collisions.</li>
          <li><strong>Telemetry:</strong> Modern switches support INT (In-band Network Telemetry) or similar mechanisms — real-time, per-flow visibility. Valuable for AI performance debugging.</li>
        </ul>
        <Callout type="best-practice" title="Switch Buffer Behavior Is Critical for AI Traffic">
          AI AllReduce traffic is highly synchronized — all nodes generate large bursts at the same time. Switch buffers absorb this burst. Insufficient buffer = drops/PFC. Excessive buffer = high latency. Characterize the workload, then evaluate buffer sizing.
        </Callout>
      </section>

      {/* ── OPTICS DAC AOC ────────────────────────────────── */}
      <section id="optics-dac-aoc">
        <h2 style={S.h2}>DAC, AOC and Optical Transceivers</h2>
        <p style={S.p}>
          There are multiple physical connection options from server to switch — DAC, AOC, or fiber with optical transceivers.
        </p>
        <ComparisonTable
          title="DAC vs AOC vs Optical Transceiver + Fiber"
          headers={["Factor", "DAC (Direct Attach Copper)", "AOC (Active Optical Cable)", "Optical Transceiver + Fiber"]}
          rows={[
            ["Medium", "Copper cable with integrated connectors", "Fiber with integrated transceivers", "Separate transceiver + fiber cable"],
            ["Max reach", "Short (typically few meters)", "Longer than DAC (tens of meters)", "Varies widely — SR, DR, FR, LR types"],
            ["Power", "Low", "Medium (active electronics)", "Depends on transceiver type"],
            ["Cost", "Low", "Medium", "Higher (separate components)"],
            ["Hot-swap", "Yes", "Yes", "Yes — transceiver separate"],
            ["Troubleshoot", "Replace whole cable", "Replace whole cable", "Can replace transceiver or fiber separately"],
            ["Use case", "Short rack connections", "Intra-row/rack connections", "Longer distances, cross-aisle, inter-row"],
          ]}
        />
        <p style={S.p}><strong>Optical types (single-mode vs multimode):</strong> Single-mode fiber supports longer distances (hundreds of meters to km). Multimode is used for shorter distances (typically within a data center). Verify connector types (LC, MTP/MPO) and compatibility before deployment. Verify the specific reach and compatibility from hardware vendor documentation.</p>
      </section>

      {/* ── OPTICS PROBLEMS ───────────────────────────────── */}
      <section id="optics-problems">
        <h2 style={S.h2}>Fiber and Optics Problems</h2>
        <p style={S.p}>
          Physical-layer problems can dramatically impact AI network performance — and this is a fairly common issue in O&M.
        </p>
        <ComparisonTable
          title="Common Optics/Fiber Problems"
          headers={["Problem", "Symptom", "Check", "Fix"]}
          rows={[
            ["Dirty fiber/connector", "CRC errors, high BER, intermittent drops", "DOM optical power, visual inspection", "Clean with proper fiber cleaning tools"],
            ["Bad optical transceiver", "Link down, high error rate, module errors", "DOM readings, swap transceiver", "Replace transceiver"],
            ["Wrong fiber type", "High attenuation, CRC errors", "DOM optical power level vs expected", "Match fiber type to transceiver spec"],
            ["Bent fiber", "High attenuation, packet loss", "Visual inspection, optical power", "Reroute fiber, replace if damaged"],
            ["High temperature", "FEC errors, link instability", "DOM temperature reading", "Improve airflow, check cooling"],
            ["Link flap", "Frequent link up/down, interface events", "Interface error counters, log messages", "Check cable, connector, transceiver"],
            ["FEC errors increasing", "Degrading link, before hard errors", "FEC corrected/uncorrected counters", "Investigate before uncorrected FEC failures occur"],
          ]}
        />
      </section>

      {/* ── MTU JUMBO ─────────────────────────────────────── */}
      <section id="mtu-jumbo">
        <h2 style={S.h2}>MTU and Jumbo Frames</h2>
        <p style={S.p}>
          MTU (Maximum Transmission Unit) defines the maximum packet/frame size. Standard Ethernet MTU is 1500 bytes. Jumbo Frames typically allow frames up to 9000 bytes (9K MTU).
        </p>
        <p style={S.p}><strong>Why larger MTU can help AI:</strong> Large RDMA transfers can happen in fewer, bigger packets — per-packet header overhead proportionally decreases, and throughput can improve.</p>
        <p style={S.p}><strong>MTU consistency is critical:</strong> MTU must be consistent end-to-end — the same MTU on every server, NIC, switch, and any intermediate device. MTU mismatch = fragmentation (Ethernet typically doesn't fragment RDMA) or packet drops. This causes mysterious connectivity and performance issues.</p>
        <Callout type="important" title="Jumbo Frames Aren't Universally Mandatory">
          MTU 9000 is used in many AI/RoCE deployments but isn't mandatory. The actual MTU choice depends on network equipment compatibility, end-to-end consistency capability, and workload characteristics. AI training can work even at 1500 MTU — a larger MTU can be beneficial for throughput optimization, but it's not a default requirement.
        </Callout>
      </section>

      {/* ── QOS ───────────────────────────────────────────── */}
      <section id="qos">
        <h2 style={S.h2}>QoS — Quality of Service</h2>
        <p style={S.p}>
          QoS mechanisms can give different traffic types different priorities and treatment. In AI networks, multiple traffic types typically coexist: RDMA/AI training traffic, storage traffic, management traffic.
        </p>
        <p style={S.p}><strong>QoS mechanisms:</strong></p>
        <ul style={S.ul}>
          <li><strong>Traffic Classes:</strong> Different logical queues — high priority RDMA, lower priority management.</li>
          <li><strong>DSCP (Differentiated Services Code Point):</strong> A priority marking in the IP packet header — routers and switches use it to decide treatment.</li>
          <li><strong>PFC:</strong> Per-priority pause — coordinates with QoS to decide which priority class pauses.</li>
          <li><strong>Scheduling:</strong> Determines the order in which packets are forwarded from switch queues — strict priority or weighted fair queuing.</li>
        </ul>
        <Callout type="important" title="QoS and PFC Are Different Mechanisms">
          QoS is traffic classification and prioritization. PFC is a specific pause mechanism that typically applies to one specific QoS class. They're complementary, but they're not the same thing.
        </Callout>
      </section>

      {/* ── NETWORK RESILIENCE ────────────────────────────── */}
      <section id="network-resilience">
        <h2 style={S.h2}>Network Resilience</h2>
        <p style={S.p}><strong>Redundancy strategies:</strong></p>
        <ul style={S.ul}>
          <li><strong>Redundant uplinks (bonding/LAG):</strong> Multiple physical links logically combined — bandwidth aggregation + failover. Per-port physical redundancy.</li>
          <li><strong>Redundant leaf switches:</strong> Dual ToR design — server connects to two leaf switches. One leaf fails, other continues serving.</li>
          <li><strong>Redundant spine switches:</strong> Multiple spines — ECMP automatically uses remaining paths if one spine fails.</li>
          <li><strong>ECMP-based resilience:</strong> In leaf-spine, if a link or spine fails, ECMP redirects traffic to the remaining equal-cost paths — typically without needing manual intervention.</li>
          <li><strong>NIC bonding:</strong> Some configurations use dual NICs per server — active-active or active-standby. Depends on fabric and workload support.</li>
        </ul>
        <p style={S.p}><strong>Failure domains:</strong> The redundancy strategy defines failure domains. If one leaf switch fails, only that rack is affected (in dual-ToR design, half the bandwidth is lost). If one spine fails, bandwidth reduces but connectivity is maintained.</p>
      </section>

      {/* ── NETWORK SECURITY ──────────────────────────────── */}
      <section id="network-security">
        <h2 style={S.h2}>AI Network Security</h2>
        <p style={S.p}><strong>Plane separation — critical:</strong></p>
        <ul style={S.ul}>
          <li><strong>Management plane:</strong> BMC/IPMI, SSH, SNMP, monitoring. Physically or logically separate network. Out-of-band access.</li>
          <li><strong>AI compute/data plane:</strong> GPU-to-GPU training traffic, RDMA. High-bandwidth, low-latency.</li>
          <li><strong>Storage plane:</strong> Dataset reads, checkpoint writes. Separate from compute plane ideally.</li>
        </ul>
        <p style={S.p}><strong>Security practices:</strong></p>
        <ul style={S.ul}>
          <li>Physically isolate the management network — AI training traffic should not flow on the management network.</li>
          <li>Keep switch management interfaces on a separate VLAN or physical port.</li>
          <li>Update NIC and switch firmware regularly — security patches.</li>
          <li>Access control: who can configure switches, who can SSH to servers.</li>
          <li>Monitoring: detect unusual traffic patterns — unexpected flows, high error rates could indicate issues.</li>
          <li>InfiniBand partitions: logically isolate workloads on shared fabrics.</li>
        </ul>
        <Callout type="warning" title="BMS/DCIM Doesn't Carry AI Training Traffic">
          BMS (Building Management System) and DCIM (Data Center Infrastructure Management) monitor and manage physical infrastructure (power, cooling, temperature). GPU training data, gradients, and RDMA traffic never run on the BMS network — these are completely separate systems.
        </Callout>
      </section>

      {/* ── MONITORING ────────────────────────────────────── */}
      <section id="monitoring">
        <h2 style={S.h2}>AI Network Monitoring</h2>
        <p style={S.p}>
          Comprehensive monitoring, without which problems stay invisible until they become serious failures.
        </p>
        <ComparisonTable
          title="AI Network Monitoring — Key Metrics"
          headers={["Metric", "What It Shows", "Why Monitor", "Alert Threshold"]}
          rows={[
            ["Link utilization", "% of link bandwidth used", "Identify overloaded links, capacity planning", "Consistently >80% (check oversubscription)"],
            ["Packet drops (switch)", "Packets discarded at switch", "Congestion, buffer overflow indicator", "Any non-zero drops during training"],
            ["CRC/FCS errors", "Corrupt packets at physical layer", "Physical layer problems — cable, optics, hardware", "Any — investigate immediately"],
            ["FEC corrected errors", "Bit errors corrected by FEC", "Degrading link — before hard failures", "Increasing trend — investigate proactively"],
            ["FEC uncorrected errors", "Bit errors FEC could not fix", "Serious link degradation", "Any occurrence"],
            ["Interface errors", "TX/RX errors on interface", "Various physical or software issues", "Any non-zero"],
            ["Link flaps", "Interface up/down events", "Unstable physical link", "Any during training"],
            ["PFC pause frames", "PFC PAUSE sent/received counts", "Congestion management behavior, PFC storm detection", "Very high rates — investigate"],
            ["ECN marks", "Packets with ECN congestion mark", "Active congestion in fabric", "High marking rate — investigate fabric"],
            ["Queue drops", "Packets dropped at switch queue", "Queue saturation", "Any during active training"],
            ["NIC utilization", "% of NIC bandwidth used", "NIC-level bottleneck", "Near 100% consistently"],
            ["RDMA counters", "RDMA operations, completions, errors", "RDMA stack health", "Errors — investigate"],
            ["GPU idle time", "% time GPU waiting (not computing)", "Network or storage bottleneck indicator", "High idle during training"],
            ["NCCL operation time", "Time spent in collective operations", "Network communication overhead", "Increasing relative to compute time"],
          ]}
        />
      </section>

      {/* ── TROUBLESHOOTING ───────────────────────────────── */}
      <section id="troubleshooting">
        <h2 style={S.h2}>AI Network Troubleshooting</h2>
        <Figure caption="AI Network Troubleshooting Flow: Systematic layer-by-layer diagnosis starting from GPU utilization being low, through collective communication, NIC, PCIe, NUMA, switch utilization, PFC/ECN, CRC/FEC errors, optics, and MTU/path issues. Fix only after identifying the actual bottleneck layer.">
          <NetworkTroubleshootingFlow />
        </Figure>
        <p style={S.p}><strong>Step-by-step methodology:</strong></p>
        <ol style={S.ol}>
          <li><strong>Observe symptoms:</strong> GPU utilization low? Training throughput degraded? Collective operations timing out? Intermittent failures?</li>
          <li><strong>Profile collective communication:</strong> Check with PyTorch Profiler or NCCL_DEBUG=INFO — how much time AllReduce is taking. If communication time &gt;= compute time, a network issue is likely.</li>
          <li><strong>Check NIC utilization:</strong> NIC bandwidth saturated? RDMA counters normal? Any NIC-level errors?</li>
          <li><strong>Check PCIe and NUMA:</strong> PCIe bandwidth utilization. Is GPU-NIC NUMA affinity correct?</li>
          <li><strong>Check switch metrics:</strong> Port utilization, packet drops, buffer occupancy. Congested uplinks?</li>
          <li><strong>Check PFC and ECN:</strong> Are PFC pause frames very high? PFC storm? A high ECN marking rate indicates congestion.</li>
          <li><strong>Check physical layer:</strong> CRC errors, FEC errors, link flaps — optics problems?</li>
          <li><strong>Check MTU:</strong> End-to-end MTU consistent? Any mismatch causing drops?</li>
          <li><strong>Check path balance:</strong> ECMP hash causing one rail/path overloaded while others idle?</li>
          <li><strong>Identify the bottleneck and fix it:</strong> Fix the specific layer, re-measure, verify the improvement.</li>
        </ol>
      </section>

      {/* ── FAILURE SCENARIOS ─────────────────────────────── */}
      <section id="failure-scenarios">
        <h2 style={S.h2}>Common AI Networking Failure Scenarios</h2>
        <ComparisonTable
          headers={["Failure", "Symptom", "Check", "Fix"]}
          rows={[
            ["Bad optical module", "Link errors, high BER, DOM alarm", "DOM readings, swap test", "Replace transceiver"],
            ["Dirty fiber", "CRC errors, intermittent drops, optical power low", "Clean connectors, check DOM power", "Clean with fiber cleaning tools"],
            ["CRC errors", "Data corruption, retransmissions, training errors", "Interface error counters, CRC counter", "Identify physical layer cause — fiber, cable, transceiver"],
            ["FEC errors increasing", "Pre-failure warning — link degrading", "FEC corrected/uncorrected counters trend", "Investigate physical layer before hard failure"],
            ["PFC storm", "Network freezes, all traffic stopped, training hang", "PFC pause counter very high, detect loops", "Identify loop/misconfiguration, fix topology or QoS config"],
            ["Incorrect ECN config", "Congestion without rate reduction, drops increase", "ECN counters, CNP rates, congestion", "Reconfigure ECN thresholds per workload"],
            ["Oversubscribed uplink", "Bandwidth ceiling hit, drops during AllReduce", "Port utilization on uplinks during training", "Upgrade links, add spines, or redesign topology"],
            ["MTU mismatch", "Intermittent drops, mysterious hangs, path failures", "End-to-end MTU check on all devices", "Standardize MTU across all endpoints"],
            ["NIC firmware mismatch", "RDMA errors, unexpected performance regression", "NIC firmware version vs recommended", "Update NIC firmware (per vendor guidance)"],
            ["Driver mismatch", "NIC or RDMA instability, errors", "Driver version vs NIC firmware compatibility", "Update driver to compatible version"],
            ["PCIe bottleneck", "NIC bandwidth < port speed, GPU-network slow", "PCIe utilization, NUMA topology check", "Optimize slot placement, check PCIe generation"],
            ["NUMA misalignment", "Poor GPU-to-NIC bandwidth, higher latency", "numactl, NUMA topology inspection", "Bind processes to correct NUMA domain"],
            ["Wrong routing", "Some nodes can't reach others, partial connectivity", "Routing table, subnet manager logs", "Fix routing configuration, verify subnet manager"],
            ["Link flap", "Intermittent training failures, link event logs", "Interface event logs, link state counters", "Check cable, connector, transceiver"],
            ["Uneven rail utilization", "Some NICs saturated, others idle", "Per-NIC utilization monitoring", "Fix ECMP hashing, rebalance rail assignments"],
            ["Switch congestion", "Queue drops, high latency, training slowdown", "Switch queue depths, drop counters", "Tune QoS, ECN, PFC; consider topology change"],
            ["Wrong QoS classification", "RDMA traffic not getting priority treatment", "DSCP/802.1p markings, QoS config", "Correct traffic classification, match PFC priority class"],
          ]}
        />
      </section>

      {/* ── AI VS TRADITIONAL ─────────────────────────────── */}
      <section id="ai-vs-traditional">
        <h2 style={S.h2}>AI Networking vs Traditional Data Center Networking</h2>
        <ComparisonTable
          title="AI Networking vs Traditional Data Center Networking"
          headers={["Factor", "Traditional DC Networking", "AI Cluster Networking"]}
          rows={[
            ["Primary traffic", "North-South (client-server)", "East-West (server-to-server, all-to-all)"],
            ["Bandwidth requirement", "Moderate — burst tolerant", "High sustained — continuous AllReduce"],
            ["Latency sensitivity", "Moderate — milliseconds acceptable", "High — microseconds matter for sync"],
            ["Traffic pattern", "Asymmetric, diverse", "Synchronized, bulk collective operations"],
            ["Congestion impact", "Retry, slower response", "Training stalls, GPU idle time"],
            ["Topology priority", "Availability, redundancy", "Low oversubscription, ECMP, low latency"],
            ["RDMA use", "Uncommon (iSCSI, some storage)", "Common — RDMA fabric for training"],
            ["PFC/ECN", "Rarely needed", "Often required for RoCE fabrics"],
            ["Monitoring", "Uptime, capacity", "GPU idle time, collective timing, RDMA counters"],
            ["Failure impact", "User-facing service degradation", "Training job failure/slowdown across all GPUs"],
          ]}
        />
      </section>

      {/* ── IB ROCE TCP ───────────────────────────────────── */}
      <section id="ib-roce-tcp-comparison">
        <h2 style={S.h2}>InfiniBand vs RoCE vs TCP Ethernet</h2>
        <ComparisonTable
          title="InfiniBand vs RoCE vs TCP Ethernet — Technical Comparison"
          headers={["Factor", "InfiniBand", "RoCE (v2)", "TCP Ethernet"]}
          rows={[
            ["Transport", "Dedicated IB fabric", "Ethernet + UDP/IP", "Ethernet + TCP/IP"],
            ["RDMA", "Native, built-in", "Yes (hardware support)", "No (or via iWARP — complex)"],
            ["Routability", "Within IB subnet", "Layer-3 routable (RoCEv2)", "Fully routable"],
            ["Congestion control", "IB native mechanisms", "PFC + ECN + CNP", "TCP congestion control"],
            ["Ecosystem", "NVIDIA-dominant", "Multi-vendor", "Universal"],
            ["Operational complexity", "Requires SM, IB-specific tooling", "Ethernet tooling + RDMA config", "Simpler — standard Ethernet"],
            ["Latency", "Very low latency capable", "Low latency (with good config)", "Higher (kernel stack overhead)"],
            ["CPU overhead", "Very low (RDMA)", "Low (RDMA, when configured)", "High (kernel stack)"],
            ["Common AI use", "HPC-origin AI clusters, NVIDIA GPU focus", "Large-scale Ethernet AI clusters", "Small clusters, inference, control plane"],
            ["Cost", "Higher (specialized HW)", "Moderate (standard Ethernet switch + RNIC)", "Lower (commodity)"],
          ]}
        />
        <Callout type="important" title="There's No Universal 'Best'">
          The choice between InfiniBand vs RoCE vs TCP depends on workload, scale, budget, existing expertise, and ecosystem. InfiniBand is popular in large-scale NVIDIA GPU training clusters. RoCE-based Ethernet is common in hyperscaler AI clusters. TCP can be adequate for small experiments and inference. Evaluate based on your own specific requirements.
        </Callout>
      </section>

      {/* ── TRAINING VS INFERENCE ─────────────────────────── */}
      <section id="training-vs-inference">
        <h2 style={S.h2}>Training vs Inference Networking</h2>
        <ComparisonTable
          title="AI Training vs Inference Networking Requirements"
          headers={["Factor", "AI Training", "AI Inference"]}
          rows={[
            ["Traffic pattern", "Synchronized East-West (AllReduce)", "Request-response, North-South + some East-West (model sharding)"],
            ["Bandwidth", "High sustained — continuous collective ops", "Variable — depends on throughput requirement"],
            ["Latency", "Important — sync latency accumulates", "Critical — user-facing response time"],
            ["RDMA", "Highly beneficial", "Sometimes — model loading, model sharding"],
            ["Collective ops", "Heavy — AllReduce, AllGather every step", "Less frequent — depends on inference architecture"],
            ["Scale", "Distributed training — many GPU nodes", "Can be single GPU or distributed"],
            ["Failure tolerance", "Job restartable from checkpoint", "Low tolerance — user requests affected"],
            ["Network design priority", "High throughput, low oversubscription", "Low latency, high availability"],
          ]}
        />
      </section>

      {/* ── REAL WORLD ARCH ───────────────────────────────── */}
      <section id="real-world-arch">
        <h2 style={S.h2}>Real-World AI Data Center Network Architecture</h2>
        <Figure caption="Complete AI Data Center Network Architecture with three separate networks: AI Compute Network (purple) — GPU servers connect via high-speed NICs through AI Leaf-Spine fabric; Storage Network (blue) — separate storage NICs to Storage switches then Parallel File System; Management Network (gray) — separate low-speed management NICs to Management switches for BMC/IPMI, SSH, monitoring. BMS/DCIM handles infrastructure management only, does NOT carry training traffic.">
          <AiDcNetworkArchitecture />
        </Figure>
        <p style={S.p}><strong>Three network planes:</strong></p>
        <ul style={S.ul}>
          <li><strong>AI Compute/Data Plane:</strong> Primary AI training traffic — GPU-to-GPU gradients via collective operations. High bandwidth, low latency, RDMA-capable. Leaf-Spine topology. Dedicated high-speed NICs per server.</li>
          <li><strong>Storage Plane:</strong> Training dataset reads, checkpoint writes. May be a separate fabric or logically segregated on the same physical network. High throughput, moderate latency.</li>
          <li><strong>Management Plane:</strong> BMC/IPMI, SSH, monitoring agents, OS updates. Low bandwidth, high reliability. Physically separate preferred — completely isolated from training traffic.</li>
        </ul>
      </section>

      {/* ── CAPACITY PLANNING ─────────────────────────────── */}
      <section id="capacity-planning">
        <h2 style={S.h2}>AI Network Capacity Planning</h2>
        <p style={S.p}><strong>Key planning inputs:</strong></p>
        <ul style={S.ul}>
          <li><strong>GPU count:</strong> Total GPUs in cluster — determine aggregate network scale needed.</li>
          <li><strong>NIC count per server:</strong> NICs per GPU server — total ports needed on leaf switches.</li>
          <li><strong>Link speed:</strong> NIC port speed and switch port speed — determine per-node bandwidth.</li>
          <li><strong>Switch port count:</strong> Leaf switch ports (server-facing) + uplink ports (to spine).</li>
          <li><strong>Oversubscription target:</strong> Based on workload — low for synchronous training, higher for inference.</li>
          <li><strong>Redundancy:</strong> Dual-ToR, redundant spines — additional ports and switches needed.</li>
          <li><strong>Growth headroom:</strong> Future expansion — plan for scale-out rather than forklift upgrades.</li>
          <li><strong>Failure domains:</strong> Acceptable blast radius — how many GPUs affected if one switch fails?</li>
        </ul>
        <p style={S.p}><strong>Conceptual planning example:</strong> 512 GPUs, 8 GPUs per server = 64 GPU servers. 8 NICs per server × 64 servers = 512 server-facing ports on leaf switches. Target 2:1 oversubscription: 512 server ports need 256 uplink ports to spine. Spine ports accordingly. Actual numbers depend on specific switch models, port density, and topology design choices — this is illustrative only.
        </p>
        <Callout type="best-practice" title="Benchmark, Don't Guess">
          Theoretical calculations are the starting point for capacity planning. Benchmark the actual workload before finalizing the design — different AI models, batch sizes, and collective patterns produce very different network utilization. Measure actual AllReduce bandwidth requirements on representative training runs.
        </Callout>
      </section>

      {/* ── DESIGN CHECKLIST ──────────────────────────────── */}
      <section id="design-checklist">
        <h2 style={S.h2}>AI Networking Design Checklist</h2>
        <ul style={S.ul}>
          <li>☐ <strong>Architecture:</strong> Leaf-Spine topology designed with appropriate oversubscription ratio for workload.</li>
          <li>☐ <strong>Bandwidth:</strong> Per-node bandwidth calculated. Aggregate bandwidth sufficient for peak AllReduce.</li>
          <li>☐ <strong>RDMA:</strong> InfiniBand or RoCE selected based on workload, budget, ecosystem.</li>
          <li>☐ <strong>NIC:</strong> RNIC selected with appropriate port speed. Multiple ports per server for rail architecture.</li>
          <li>☐ <strong>PCIe:</strong> NIC-to-GPU PCIe topology verified. Same NUMA domain preferred.</li>
          <li>☐ <strong>NUMA:</strong> GPU-NIC NUMA affinity mapped and verified. Software affinity hints configured.</li>
          <li>☐ <strong>PFC:</strong> PFC configured on specific priority class for RDMA traffic only. Watchdog timers enabled. Storm detection considered.</li>
          <li>☐ <strong>ECN:</strong> ECN enabled on switches for RDMA traffic priority. Thresholds tuned for workload.</li>
          <li>☐ <strong>QoS:</strong> Traffic classes defined — RDMA, storage, management separate priorities. DSCP marking correct.</li>
          <li>☐ <strong>MTU:</strong> End-to-end MTU consistent across all servers, NICs, switches. Jumbo frames if chosen — end-to-end.</li>
          <li>☐ <strong>Optics:</strong> Correct cable type for distances. Fiber types match transceivers. DOM monitoring enabled.</li>
          <li>☐ <strong>ECMP:</strong> ECMP hash algorithm verified for good distribution. Path imbalance tested.</li>
          <li>☐ <strong>Redundancy:</strong> Dual-ToR or equivalent. Redundant spines. Failover tested.</li>
          <li>☐ <strong>Monitoring:</strong> All key metrics (utilization, drops, errors, FEC, PFC, ECN, GPU idle) monitored with alerts.</li>
          <li>☐ <strong>Telemetry:</strong> Per-port, per-queue telemetry enabled for performance debugging.</li>
          <li>☐ <strong>Management separation:</strong> Management network physically/logically separate from compute and storage.</li>
          <li>☐ <strong>Security:</strong> Switch management access controlled. Firmware updated. InfiniBand partitions where applicable.</li>
          <li>☐ <strong>Capacity:</strong> Growth headroom planned. Expansion path defined without forklift upgrade.</li>
          <li>☐ <strong>Troubleshooting runbooks:</strong> Documented procedures for common failures. On-call team trained.</li>
          <li>☐ <strong>Documentation:</strong> Network diagrams, IP addressing, port assignments, cable maps — all current.</li>
        </ul>
      </section>

      {/* ── KEY TAKEAWAYS ─────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li><strong>AI networking throughput and latency both matter — for different reasons:</strong> AllReduce transfers large amounts of data (bandwidth is critical), but barrier synchronization latency accumulates across millions of steps (latency is critical too). Monitor and optimize both independently.</li>
          <li><strong>NVLink and InfiniBand/Ethernet are fundamentally different:</strong> NVLink is an intra-node GPU interconnect (NVIDIA-specific). InfiniBand and Ethernet are inter-node data center network fabrics. Both can exist simultaneously in a GPU cluster at different layers — never mix them up.</li>
          <li><strong>RDMA is not a synonym for InfiniBand:</strong> RDMA is a mechanism/concept. InfiniBand natively implements RDMA. RoCE provides RDMA over Ethernet. RDMA is possible over both — different technologies.</li>
          <li><strong>RoCEv2 runs on UDP/IP and is routable:</strong> It is not "Layer-2 only." RoCEv2 is compatible with modern leaf-spine routed topologies.</li>
          <li><strong>PFC does not make the whole network lossless:</strong> PFC is a per-priority pause mechanism for specific ports. Risks include: HoL blocking, congestion propagation, PFC storms. Complement it with ECN, and configure it carefully.</li>
          <li><strong>ECN signals congestion, it doesn't guarantee against packet loss:</strong> ECN marking triggers rate reduction. Under severe congestion, drops can still happen. ECN and PFC are different mechanisms.</li>
          <li><strong>NCCL is a library, not a network:</strong> NCCL implements collective operations. NCCL being "slow" means it's exposing a network, PCIe, or NUMA bottleneck.</li>
          <li><strong>Ethernet is suitable for AI:</strong> Modern high-speed Ethernet + RoCEv2 supports large-scale AI training. InfiniBand isn't mandatory — the choice depends on workload, scale, expertise, and cost.</li>
          <li><strong>Don't confuse Gbps and GB/s:</strong> 8 bits = 1 byte. 400 Gbps ≈ 50 GB/s throughput. Always verify units in planning and monitoring.</li>
          <li><strong>Leaf-Spine topology is optimal for East-West traffic:</strong> Consistent latency, ECMP path diversity, controllable oversubscription — a design suited for AI AllReduce.</li>
          <li><strong>PCIe and NUMA can create network bottlenecks:</strong> Checking switch bandwidth isn't enough. GPU-NIC PCIe path and NUMA affinity also determine AI networking performance.</li>
          <li><strong>Physical-layer problems are common and serious:</strong> Dirty fiber, bad optics, FEC errors — these are real O&M issues. DOM monitoring, FEC counter tracking, and proactive replacement are necessary.</li>
          <li><strong>Management, Compute, and Storage networks should be kept separate:</strong> Plane separation is important for security, reliability, and performance. BMS/DCIM does not carry AI training traffic — it's for infrastructure management.</li>
          <li><strong>MTU must be consistent end-to-end:</strong> Jumbo frames aren't universally mandatory, but if you use them, keep the same MTU on every single device. MTU mismatch causes mysterious problems.</li>
          <li><strong>Troubleshooting should be systematic:</strong> Diagnose layer-by-layer. GPU utilization issue → collective timing → NIC → PCIe → switch → PFC/ECN → optics → MTU → path balance. Fix the first bottleneck, re-measure, verify.</li>
        </ul>
      </section>

    </article>
  );
}
