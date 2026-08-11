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
          <TopicLink slug="gpu-cluster" variant="inline" /> article mein aapne padha ki distributed AI training mein sab GPUs ko har step pe gradients sync karne hote hain. Yeh sync network se hoti hai. Agar network slow ya congested ho, toh powerful GPU bhi communication ka wait karta hai — expensive hardware idle rehti hai.
        </p>
        <p style={S.p}>
          AI Networking un network technologies, topologies, protocols aur configurations ka complete ecosystem hai jo AI data centers mein GPU servers ke beech high-bandwidth, low-latency communication enable karta hai.
        </p>
        <p style={S.p}>
          Basic path yeh hai: <strong>GPU → PCIe → NIC/RNIC → Leaf Switch → Spine → Leaf Switch → NIC/RNIC → GPU</strong>. Lekin iss simple path ke andar kai technologies hain — RDMA, InfiniBand, RoCE, PFC, ECN, NCCL, leaf-spine topology — jo sab milake yeh communication efficient banate hain.
        </p>
        <p style={S.p}>
          Yeh article un sabhi technologies ko systematically explain karta hai — beginner-friendly shuruat se lekar O&M engineer-level depth tak.
        </p>
      </section>

      {/* ── WHO SHOULD READ ───────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>Students &amp; Beginners:</strong> GPU networking kyun important hai — zero se samjhenge.</li>
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
          <li><strong>Current:</strong> AI Networking — network fabric jo GPU communication enable karta hai</li>
          <li><strong>Next:</strong> <TopicLink slug="ai-storage" variant="inline" /> — parallel file systems, checkpointing, storage hierarchy</li>
        </ul>
      </section>

      {/* ── WHY SPECIALIZED ───────────────────────────────── */}
      <section id="why-specialized">
        <h2 style={S.h2}>Why AI Needs Specialized Networking</h2>
        <p style={S.p}>
          Traditional enterprise networking mainly North-South traffic ke liye design hoti hai — user laptop se server tak request jaati hai, response aati hai. Email, web browsing, file sharing — yeh sab relatively lightweight, burst-tolerant workloads hain.
        </p>
        <p style={S.p}>
          AI training clusters mein traffic pattern fundamentally alag hai. Thousands of GPU servers simultaneously ek doosre se gradients exchange karte hain — yeh massive East-West traffic hai. Har training step pe yeh hota hai, continuously, for hours or days.
        </p>
        <p style={S.p}><strong>Specific AI networking demands:</strong></p>
        <ul style={S.ul}>
          <li><strong>High bandwidth:</strong> Large gradient tensors — potentially gigabytes — fast transfer karne hote hain.</li>
          <li><strong>Low latency:</strong> Har sync operation mein delay accumulate hoti hai across millions of training steps.</li>
          <li><strong>High message rate:</strong> Collective operations mein kai chote messages bhi hote hain — IOPS matter karta hai.</li>
          <li><strong>Synchronized communication:</strong> Sab GPUs ek saath sync karte hain — koi bhi slow GPU ya network path sab ko slow kar sakta hai.</li>
          <li><strong>Congestion tolerance:</strong> Burst traffic patterns hote hain — network congestion gracefully handle karni hoti hai.</li>
        </ul>
        <Callout type="important" title="Har AI Workload Ki Requirements Same Nahi Hoti">
          Yeh ek important nuance hai. Small experiments (single server), fine-tuning (few GPUs), aur inference serving — inki networking requirements large-scale pre-training se very different hain. InfiniBand ya ultra-low-latency networking har AI use case ke liye required nahi hai. Actual requirements depend karte hain workload, model size, training/inference, topology, aur collective communication patterns pe.
        </Callout>
      </section>

      {/* ── SERVER ARCHITECTURE ───────────────────────────── */}
      <section id="server-architecture">
        <h2 style={S.h2}>AI Server Networking Architecture</h2>
        <p style={S.p}>
          Ek GPU server mein network ki puri chain samajhna zaruri hai. Yahan do alag types of communication hote hain:
        </p>
        <Figure caption="AI Network End-to-End Architecture: GPU → PCIe → NIC/RNIC → Leaf Switch → Spine → Leaf Switch → NIC/RNIC → GPU. NVLink connects GPUs within a server (not across servers). ECMP on spine distributes traffic across multiple paths.">
          <AiNetworkEndToEnd />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Intra-node (within server):</strong> NVLink aur NVSwitch — NVIDIA ke supported GPU platforms mein GPUs directly high-speed pe communicate karte hain. Yeh data center network nahi hai.</li>
          <li><strong>PCIe:</strong> GPU, CPU, aur NIC ke beech standard interface within the server. Data flow: GPU memory → PCIe → NIC → network.</li>
          <li><strong>NIC/RNIC:</strong> Network Interface Card — server ko network se connect karta hai. RNIC = RDMA-capable NIC.</li>
          <li><strong>Leaf/ToR Switch:</strong> Rack ke andar ya ToR (Top-of-Rack) switch — uss rack ke sabhi servers ko network fabric se connect karta hai.</li>
          <li><strong>Spine:</strong> Multiple leaf switches ko interconnect karta hai. ECMP (Equal-Cost Multi-Path) se traffic multiple paths pe distribute hoti hai.</li>
        </ul>
        <Callout type="warning" title="NVLink Data Center Network Nahi Hai">
          NVLink NVIDIA ka proprietary GPU-to-GPU interconnect hai jo ek server ke andar (ya supported rack-scale platforms mein) kaam karta hai. Yeh InfiniBand ya Ethernet nahi hai. Ek GPU server mein dono simultaneously ho sakte hain — NVLink intra-node communication ke liye, aur InfiniBand/Ethernet inter-node communication ke liye. Inhe mix mat karo.
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
          Yeh distinction critical hai. Jab hum "AI networking bottleneck" ki baat karte hain, typically inter-node network fabric ki baat hoti hai — NIC se spine switches tak. NVLink intra-node optimization hai, inter-node bottleneck ka solution nahi.
        </p>
      </section>

      {/* ── GPU TO GPU ────────────────────────────────────── */}
      <section id="gpu-to-gpu">
        <h2 style={S.h2}>GPU-to-GPU Communication</h2>
        <p style={S.p}>
          Jab ek GPU ko doosre server ke GPU se data exchange karna hai, toh yeh path follow hota hai:
        </p>
        <ol style={S.ol}>
          <li>GPU memory mein data ready hota hai (HBM).</li>
          <li>Data PCIe bus ke through CPU/system memory mein transfer hota hai (ya GPUDirect ke through directly NIC ke paas jaata hai).</li>
          <li>NIC/RNIC data le ke network pe transmit karta hai.</li>
          <li>Receiving server ki NIC data receive karti hai.</li>
          <li>Data receiving GPU ki memory mein transfer hota hai.</li>
        </ol>
        <p style={S.p}>
          <strong>GPUDirect RDMA</strong> ek specific technology hai (NVIDIA platforms pe available, supported configurations mein) jo GPU memory ko directly network fabric se connect karta hai — CPU memory bypass karke. Yeh CPU overhead reduce karta hai aur latency improve kar sakta hai. Lekin yeh har RDMA deployment mein automatic nahi hota — specific hardware, driver, aur software stack support required hai.
        </p>
        <Callout type="important" title="GPU Direct RDMA = Specific Technology, Not Universal RDMA Behavior">
          RDMA (Remote Direct Memory Access) aur GPUDirect RDMA alag cheezein hain. Standard RDMA typically CPU memory aur remote CPU memory ke beech operate karta hai. GPUDirect RDMA specifically GPU memory aur network ke beech direct path provide karta hai. Supported platforms pe significant performance benefits hain, lekin yeh assume mat karo ki har RDMA setup automatically GPUDirect hai.
        </Callout>
      </section>

      {/* ── COLLECTIVE COMM ───────────────────────────────── */}
      <section id="collective-comm">
        <h2 style={S.h2}>Collective Communication</h2>
        <p style={S.p}>
          Distributed AI training mein sirf point-to-point (A to B) communication nahi hoti. Sab GPUs ko coordinate karna hota hai — iske liye collective communication operations use hote hain.
        </p>
        <p style={S.p}>
          Yeh operations networking bottlenecks expose karte hain kyunki: sab nodes simultaneously communicate karte hain, large amounts of data transfer hote hain, aur training continue nahi ho sakti jab tak sync complete na ho.
        </p>
      </section>

      {/* ── ALLREDUCE ─────────────────────────────────────── */}
      <section id="allreduce">
        <h2 style={S.h2}>AllReduce</h2>
        <p style={S.p}>
          AllReduce distributed AI training ka most critical collective operation hai. Har training step ke baad, sab GPUs apne gradients contribute karte hain, average/sum hota hai, aur sab ko result milta hai.
        </p>
        <p style={S.p}><strong>Simple example:</strong> 4 GPUs data train kar rahe hain. Har GPU apne batch pe gradients compute karta hai. AllReduce se: GPU1 gradient + GPU2 gradient + GPU3 gradient + GPU4 gradient = sum, phir divide by 4 = average. Yeh average sab 4 GPUs ko milta hai. Sab same point se next step start karte hain.</p>
        <p style={S.p}>
          Large models mein gradient tensors very large hote hain. AllReduce ka data volume = model size × number of participating GPUs / ring size (depending on algorithm). Yahi reason hai ki large-scale training ke liye high network bandwidth critical hai.
        </p>
      </section>

      {/* ── ALLGATHER ─────────────────────────────────────── */}
      <section id="allgather">
        <h2 style={S.h2}>AllGather</h2>
        <p style={S.p}>
          AllGather mein har node apna data share karta hai aur result mein sab nodes ka combined data hota hai (concatenated, not summed). Koi bhi reduce nahi hota.
        </p>
        <p style={S.p}><strong>Example:</strong> 4 nodes, har ek ke paas apna data chunk D1, D2, D3, D4 hai. AllGather ke baad sab nodes ke paas [D1, D2, D3, D4] hota hai.</p>
        <p style={S.p}>
          AI training mein AllGather FSDP (Fully Sharded Data Parallel) aur ZeRO optimization mein use hota hai — model parameters shards collect karne ke liye before forward pass.
        </p>
      </section>

      {/* ── REDUCESCATTER ─────────────────────────────────── */}
      <section id="reducescatter">
        <h2 style={S.h2}>ReduceScatter</h2>
        <p style={S.p}>
          ReduceScatter AllReduce ka pehla half hai. Sab nodes data contribute karte hain, reduce (sum/average) hota hai, lekin result equal chunks mein different nodes ko distribute hota hai — har node sirf apna portion rakhta hai.
        </p>
        <p style={S.p}>
          FSDP/ZeRO gradient computation mein ReduceScatter use hota hai — sab nodes gradients share karte hain aur har node apna gradient shard ka responsibility leta hai.
        </p>
      </section>

      {/* ── BROADCAST ─────────────────────────────────────── */}
      <section id="broadcast">
        <h2 style={S.h2}>Broadcast</h2>
        <p style={S.p}>
          Broadcast mein ek node (root) apna data sab doosre nodes ko send karta hai. Doosre nodes data receive karte hain.
        </p>
        <p style={S.p}>
          AI training mein Broadcast model initialization ke time use hota hai — root node pe initialize kiya hua model sab nodes pe broadcast hota hai taaki sab same starting point se train karein.
        </p>
      </section>

      {/* ── ALL TO ALL ────────────────────────────────────── */}
      <section id="all-to-all">
        <h2 style={S.h2}>All-to-All</h2>
        <p style={S.p}>
          All-to-All mein har node har doosre node ko data send karta hai — N nodes mein N×N transfers. Yeh most network-intensive collective operation hai.
        </p>
        <p style={S.p}>
          Expert Parallel training (Mixture of Experts models) mein All-to-All heavy use hota hai — tokens different expert GPUs ko route karne ke liye. Yeh operation network fabric pe extreme pressure daal sakta hai.
        </p>
      </section>

      {/* ── NCCL ──────────────────────────────────────────── */}
      <section id="nccl">
        <h2 style={S.h2}>NCCL</h2>
        <p style={S.p}>
          NCCL (NVIDIA Collective Communications Library) ek software library hai — yeh physical network ya fabric NAHI hai. NCCL in sab collective operations (AllReduce, AllGather, etc.) ko efficiently implement karta hai GPU systems ke liye.
        </p>
        <p style={S.p}><strong>NCCL kya karta hai:</strong></p>
        <ul style={S.ul}>
          <li>Topology detect karta hai — GPUs ek server pe hain ya alag servers pe?</li>
          <li>Best communication path choose karta hai — NVLink (faster, intra-node) ya network fabric (inter-node).</li>
          <li>Ring-AllReduce ya tree-based algorithms implement karta hai efficiently.</li>
          <li>GPU memory directly use karta hai without unnecessary CPU copies (where GPUDirect available).</li>
        </ul>
        <p style={S.p}>
          PyTorch, TensorFlow — yeh frameworks NCCL ko internally use karte hain. Developer ko explicitly NCCL call nahi karna padta.
        </p>
        <Callout type="warning" title="NCCL Ek Network Nahi Hai">
          NCCL ek communication library hai — software. Jab log kehte hain "NCCL slow hai," toh asal mein network ya PCIe ya NUMA bottleneck slow hai — NCCL us bottleneck ko expose kar raha hai. NCCL ko fix nahi karte, underlying network infrastructure fix karte hain.
        </Callout>
        <p style={S.p}><strong>AMD RCCL:</strong> AMD GPU clusters ke liye RCCL (ROCm Collective Communications Library) NCCL ka equivalent hai — similar collective operations, AMD GPU architecture ke liye optimized.</p>
      </section>

      {/* ── RDMA ──────────────────────────────────────────── */}
      <section id="rdma">
        <h2 style={S.h2}>RDMA — Remote Direct Memory Access</h2>
        <p style={S.p}>
          Traditional networking mein data transfer ka path: Application → Kernel network stack → NIC → Network → NIC → Kernel network stack → Application. Har step mein CPU involvement aur memory copies hoti hain.
        </p>
        <p style={S.p}>
          RDMA (Remote Direct Memory Access) iss path ko dramatically shorten karta hai. RDMA ke saath: ek machine doosri machine ki memory mein directly read/write kar sakti hai bina doosri machine ke CPU ko involve kiye. Data directly memory se NIC ke through jaata hai — kernel bypass hoti hai.
        </p>
        <p style={S.p}><strong>RDMA ke benefits:</strong></p>
        <ul style={S.ul}>
          <li><strong>Low CPU overhead:</strong> CPU data transfer mein busy nahi rehta — GPU compute ke liye available rehta hai.</li>
          <li><strong>Low latency:</strong> Kernel bypass se latency significantly reduce hoti hai.</li>
          <li><strong>High throughput:</strong> CPU bottleneck remove hone se high sustained bandwidth possible hai.</li>
          <li><strong>Zero-copy:</strong> Unnecessary memory copies avoid hote hain.</li>
        </ul>
        <p style={S.p}><strong>RNIC (RDMA-capable NIC):</strong> RDMA use karne ke liye special network adapter chahiye — RNIC. Yeh NIC complex network protocol processing (typically kernel ka kaam) hardware mein accelerate karta hai.</p>
        <Callout type="important" title="RDMA InfiniBand Ka Synonym Nahi Hai">
          RDMA ek communication technology/mechanism hai. Yeh implement ho sakta hai InfiniBand pe (natively), Ethernet pe (via RoCE), aur kuch other transports pe. InfiniBand har jagah RDMA use karta hai, lekin RDMA sirf InfiniBand tak limited nahi hai. RoCE = RDMA over Converged Ethernet.
        </Callout>
      </section>

      {/* ── INFINIBAND ────────────────────────────────────── */}
      <section id="infiniband">
        <h2 style={S.h2}>InfiniBand</h2>
        <p style={S.p}>
          InfiniBand ek high-performance networking fabric/technology hai jo specifically HPC (High Performance Computing) aur AI clusters ke liye design kiya gaya tha. Yeh standard Ethernet se fundamentally alag hai — alag physical layer, alag protocol stack, alag ecosystem.
        </p>
        <p style={S.p}><strong>InfiniBand architecture:</strong></p>
        <ul style={S.ul}>
          <li><strong>HCA (Host Channel Adapter):</strong> Server mein install hone wala InfiniBand adapter — Ethernet NIC ka equivalent lekin InfiniBand fabric ke liye. RDMA natively support karta hai.</li>
          <li><strong>InfiniBand Switches:</strong> Specialized switches jo InfiniBand fabric form karte hain. Regular Ethernet switches nahi hain.</li>
          <li><strong>Subnet Manager (SM):</strong> InfiniBand fabric manage karne wala software — routing, addressing, port configuration. Typically dedicated server ya switch pe run hota hai.</li>
          <li><strong>Fabric:</strong> Poora InfiniBand network ek "fabric" kehlaata hai — ek subnet ke andar logical unit.</li>
          <li><strong>Partitions:</strong> InfiniBand mein partitions concept hai — logically isolate different workloads while sharing physical fabric.</li>
        </ul>
        <p style={S.p}>
          InfiniBand AI clusters mein kyun popular hai: very low latency (microsecond range), high bandwidth, mature RDMA support, aur large-scale HPC heritage. NVIDIA (Mellanox) InfiniBand ecosystem ka dominant player hai.
        </p>
        <Callout type="important" title="InfiniBand 'Ethernet with RDMA' Nahi Hai">
          Yeh common galat dharna hai. InfiniBand aur Ethernet/RoCE alag technologies hain — alag physical standards, alag protocol stacks, alag management tools, alag ecosystem. Dono pe RDMA hota hai lekin implementation alag hai.
        </Callout>
      </section>

      {/* ── ETHERNET FOR AI ───────────────────────────────── */}
      <section id="ethernet-for-ai">
        <h2 style={S.h2}>Ethernet for AI</h2>
        <p style={S.p}>
          Ethernet AI clusters ke liye bilkul suitable hai — yeh ek common misconception hai ki sirf InfiniBand kaam karta hai. Modern high-speed Ethernet (100/200/400 GbE aur upcoming higher speeds) aur RoCEv2 ke combination se large-scale AI training successfully hoti hai.
        </p>
        <p style={S.p}><strong>Ethernet ke advantages for AI:</strong></p>
        <ul style={S.ul}>
          <li><strong>Broad ecosystem:</strong> Multi-vendor hardware, wide availability, lower cost per port.</li>
          <li><strong>Flexible routing:</strong> IP routing, standard tooling, familiar operations.</li>
          <li><strong>Scale:</strong> Ethernet switches ke saath very large fabrics build ho sakti hain.</li>
          <li><strong>RoCE:</strong> Ethernet pe RDMA capabilities — high performance with right configuration.</li>
        </ul>
        <p style={S.p}><strong>Challenges with Ethernet for AI:</strong></p>
        <ul style={S.ul}>
          <li>Standard TCP/IP Ethernet high CPU overhead rakhta hai — RDMA (RoCE) ke liye careful configuration chahiye.</li>
          <li>Lossless fabric ke liye PFC aur ECN configuration required — additional complexity.</li>
          <li>Congestion management tuning workload-specific hoti hai.</li>
        </ul>
        <p style={S.p}>
          Meta, Google, Microsoft — kai hyperscalers primarily Ethernet-based networking apne large AI clusters mein use karte hain. InfiniBand typically individual use-case, ecosystem aur operational preference pe depend karta hai.
        </p>
      </section>

      {/* ── ROCE ──────────────────────────────────────────── */}
      <section id="roce">
        <h2 style={S.h2}>RoCE — RDMA over Converged Ethernet</h2>
        <p style={S.p}>
          RoCE ek technology hai jo standard Ethernet infrastructure pe RDMA capabilities provide karta hai. "Converged Ethernet" isliye kehte hain kyunki yeh LAN traffic aur storage/RDMA traffic ek hi Ethernet fabric pe converge karta hai.
        </p>
        <p style={S.p}>
          RoCE ke liye RNIC (RDMA-capable Ethernet NIC) chahiye — regular Ethernet NIC pe RoCE kaam nahi karta.
        </p>
        <p style={S.p}><strong>Why RoCE for AI:</strong> RDMA ki low latency aur low CPU overhead benefits milti hain Ethernet infrastructure pe — existing Ethernet skills aur tooling reuse ho sakti hai.</p>
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
        <Callout type="important" title="RoCEv2 UDP/IP Pe Chalta Hai — Layer-2 Only Nahi">
          RoCEv2 UDP/IP encapsulation use karta hai aur Layer-3 routable hai. Ise "sirf Layer-2 RDMA" mat kehna — yeh technically incorrect hai. RoCEv2 modern leaf-spine topologies mein deploy ho sakta hai jo IP routing use karte hain.
        </Callout>
      </section>

      {/* ── PFC ───────────────────────────────────────────── */}
      <section id="pfc">
        <h2 style={S.h2}>PFC — Priority Flow Control</h2>
        <p style={S.p}>
          PFC (IEEE 802.1Qbb) ek Ethernet mechanism hai jo specific traffic priorities ke liye pause behavior provide karta hai. Jab ek switch port buffer almost full hone lagta hai, woh upstream neighbor ko PAUSE frame bhejta hai us specific priority ke liye.
        </p>
        <p style={S.p}><strong>Why PFC for RDMA:</strong> Standard RDMA protocols assume lossless network — packet drop hone pe RDMA operation fail ya slow ho sakti hai. PFC packet drop avoid karne mein help karta hai RoCE traffic ke liye specific priority class pe.</p>
        <p style={S.p}><strong>PFC risks aur limitations:</strong></p>
        <ul style={S.ul}>
          <li><strong>Head-of-Line Blocking (HoL):</strong> Ek paused priority class se doosre flows bhi block ho sakte hain agar same port share kar rahe hon.</li>
          <li><strong>Congestion Propagation:</strong> PAUSE cascade ho sakta hai — switch A pauses switch B, switch B pauses switch C, aur aage. Congestion entire fabric mein spread ho sakta hai.</li>
          <li><strong>PFC Storm:</strong> Misconfiguration ya topology issues se PAUSE frames indefinitely loop ho sakte hain — essentially fabric deadlock.</li>
          <li><strong>Limited scope:</strong> PFC sirf directly connected ports ke beech ek specific priority pe kaam karta hai — poori fabric "lossless" nahi hoti.</li>
        </ul>
        <Callout type="warning" title="PFC = Per-Priority Pause, Not 'Lossless Network'">
          PFC poori Ethernet network ko universally lossless nahi banata. Yeh ek per-priority pause mechanism hai jo carefully design aur configure karna hota hai. Poorly designed PFC PFC storms aur congestion propagation cause kar sakta hai. PFC ko ECN ke saath complement karo — sirf PFC pe rely mat karo.
        </Callout>
      </section>

      {/* ── ECN ───────────────────────────────────────────── */}
      <section id="ecn">
        <h2 style={S.h2}>ECN — Explicit Congestion Notification</h2>
        <p style={S.p}>
          ECN (RFC 3168) ek IP-level mechanism hai congestion signaling ke liye. Jab switch buffer fill hone lagta hai, woh packet ko drop karne ki jagah packet header mein ECN bits mark karta hai.
        </p>
        <p style={S.p}><strong>ECN flow:</strong></p>
        <ol style={S.ol}>
          <li>Congested switch packet ka ECN field mark karta hai (CE = Congestion Experienced).</li>
          <li>Receiver yeh mark dekh ke sender ko CNP (Congestion Notification Packet) bhejta hai.</li>
          <li>Sender apni transmission rate reduce kar leta hai.</li>
          <li>Congestion relieve hoti hai as rate decreases.</li>
        </ol>
        <p style={S.p}>
          ECN PFC se alag hai kyunki: ECN rate-based control hai (smooth), PFC pause-based hai (stop-and-go). ECN packet drops ko signal karta hai — khud packet loss guarantee nahi karta. Agar congestion bahut severe ho toh ECN marking ke bawajood drops ho sakte hain.
        </p>
        <Figure caption="ECN and PFC — Two distinct congestion control mechanisms. ECN (left): Rate-based marking and feedback loop — smoother, IP-level. PFC (right): Per-priority pause frames — immediate but with risks of head-of-line blocking and storm propagation. Both serve complementary roles in RoCE networks.">
          <EcnPfcFlow />
        </Figure>
      </section>

      {/* ── CNP CONGESTION ────────────────────────────────── */}
      <section id="cnp-congestion">
        <h2 style={S.h2}>CNP and RoCE Congestion Control</h2>
        <p style={S.p}>
          CNP (Congestion Notification Packet) RoCE congestion control mein specifically use hota hai. Jab receiver ECN-marked packet receive karta hai, woh sender ko CNP bhejta hai.
        </p>
        <p style={S.p}>
          RoCE sender CNP receive karke apni injection rate reduce karta hai. Yeh mechanism PFC ka complement hai — PFC short-term burst protection deta hai, ECN/CNP long-term rate adjustment karta hai.
        </p>
        <p style={S.p}>
          Different vendors ke RDMA implementations mein congestion control algorithms alag ho sakte hain. Specific behavior hardware aur driver version pe depend karta hai — kisi specific vendor implementation ko universal standard mat samjho.
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
        <Callout type="best-practice" title="RDMA Har Situation Ke Liye Better Nahi">
          RDMA large-scale distributed training mein significant performance benefits deta hai. Lekin: complex setup hai, specific hardware chahiye, lossless fabric configuration critical hai. Small experiments, inference serving, aur control plane operations ke liye standard TCP/IP adequate ho sakta hai. Workload analyze karo, phir choose karo.
        </Callout>
      </section>

      {/* ── LEAF SPINE ────────────────────────────────────── */}
      <section id="leaf-spine">
        <h2 style={S.h2}>Leaf-Spine Architecture</h2>
        <p style={S.p}>
          Leaf-Spine (ya two-tier Clos) AI clusters ka standard network topology hai. Traditional hierarchical networking (Core-Distribution-Access) ke mukable yeh much better East-West traffic handle karta hai.
        </p>
        <p style={S.p}><strong>Structure:</strong></p>
        <ul style={S.ul}>
          <li><strong>Leaf Switches:</strong> Directly GPU servers se connect hote hain (ToR — Top of Rack). Har rack mein typically ek ya zyada leaf switches.</li>
          <li><strong>Spine Switches:</strong> Multiple leaf switches ko interconnect karte hain. Har leaf switch har spine switch se connect hota hai.</li>
          <li><strong>Equal-Cost Paths:</strong> Kisi bhi leaf se doosre leaf tak multiple equal-cost paths hote hain — ECMP se traffic distribute hoti hai.</li>
        </ul>
        <p style={S.p}><strong>Why Leaf-Spine for AI:</strong></p>
        <ul style={S.ul}>
          <li>Consistent latency — koi bhi server doosre server tak same number of hops mein pahonchta hai.</li>
          <li>Predictable bandwidth — oversubscription ratio controllable hai.</li>
          <li>Scale-out — aur leaf ya spine switches add karke fabric grow kar sakte hain.</li>
          <li>Failure domains — ek spine switch fail hone se sirf bandwidth reduce hoti hai, connectivity nahi jaati (multiple paths available).</li>
        </ul>
      </section>

      {/* ── CLOS ECMP ─────────────────────────────────────── */}
      <section id="clos-ecmp">
        <h2 style={S.h2}>Clos Architecture and ECMP</h2>
        <p style={S.p}>
          Clos network ek multi-stage switching fabric concept hai (1950s mein Charles Clos ne describe kiya telephony ke liye). Modern data center leaf-spine Clos architecture ka simplest form hai. Larger clusters mein multi-stage (3-stage, 5-stage) Clos fabrics build hote hain.
        </p>
        <p style={S.p}><strong>ECMP (Equal-Cost Multi-Path):</strong> Jab multiple equal-cost paths exist karte hain destination tak, ECMP traffic in paths pe distribute karta hai. Typically flow-based hashing use hota hai — ek flow consistently ek path pe jaata hai (reordering avoid karne ke liye).
        </p>
        <p style={S.p}><strong>ECMP limitations:</strong> Hash collisions se uneven distribution ho sakti hai — kuch paths overloaded, kuch underutilized. AI AllReduce traffic ke liye yeh "elephant flow" problem create kar sakta hai. Advanced load balancing (DLRS, adaptive routing) yeh mitigate karte hain.
        </p>
      </section>

      {/* ── RAIL ARCHITECTURE ─────────────────────────────── */}
      <section id="rail-architecture">
        <h2 style={S.h2}>GPU and NIC Rail Architecture</h2>
        <p style={S.p}>
          "Rail" concept GPU cluster networking mein important hai. Ek GPU server mein typically multiple NICs hote hain (e.g., 8 NICs for 8 GPUs). "Rail" ka matlab hai ki har GPU ka apna dedicated NIC hota hai jo apne dedicated switch port se connect hota hai.
        </p>
        <p style={S.p}><strong>Rail-optimized topology:</strong> GPU 0 → NIC 0 → Switch A port 0. GPU 1 → NIC 1 → Switch A port 1. GPU 2 → NIC 2 → Switch B port 0... Yeh ensure karta hai ki traffic distributed hai aur koi single NIC ya switch port overloaded nahi hota.
        </p>
        <p style={S.p}>
          Rail architecture ke benefits: balanced bandwidth utilization, no NIC bottleneck, better locality (same-rail GPUs faster communicate kar sakte hain).
        </p>
        <Callout type="important" title="Rail Topology Workload-Specific Hai">
          Rail architecture concepts exist karte hain aur large GPU deployments mein beneficial hain. Specific implementation (number of rails, NIC-to-switch mapping, etc.) hardware platform aur workload pe depend karti hai. Koi universal "standard" rail topology nahi hai.
        </Callout>
      </section>

      {/* ── BANDWIDTH ─────────────────────────────────────── */}
      <section id="bandwidth">
        <h2 style={S.h2}>Network Bandwidth</h2>
        <p style={S.p}>
          Bandwidth ek network link ki maximum data carrying capacity hai — typically Gbps (Gigabits per second) mein measure hoti hai. Modern AI cluster links 100, 200, 400, ya aur high-speed links pe operate karte hain.
        </p>
        <p style={S.p}><strong>Aggregate bandwidth:</strong> Ek cluster ka total bandwidth = sab active links ka sum. Ek server mein 8 NICs × 400 Gbps = 3,200 Gbps server-level bandwidth (theoretical maximum).</p>
        <p style={S.p}><strong>Bidirectional/Full-duplex:</strong> Modern Ethernet aur InfiniBand links full-duplex hain — same time pe send aur receive ho sakta hai. 400 Gbps link = 400 Gbps in each direction simultaneously.</p>
      </section>

      {/* ── GBPS VS GBYTES ────────────────────────────────── */}
      <section id="gbps-vs-gbytes">
        <h2 style={S.h2}>Gbps vs GB/s</h2>
        <p style={S.p}>
          Yeh confusion bahut common hai — aur expensive mistakes cause kar sakta hai planning mein.
        </p>
        <p style={S.p}><strong>Gbps = Gigabits per second</strong> (lowercase 'b' = bits). Network speed measure karta hai.</p>
        <p style={S.p}><strong>GB/s = Gigabytes per second</strong> (uppercase 'B' = bytes). Data throughput measure karta hai.</p>
        <p style={S.p}><strong>Conversion:</strong> 8 bits = 1 byte. Isliye: 100 Gbps link ≈ 12.5 GB/s maximum throughput (100 ÷ 8 = 12.5). 400 Gbps ≈ 50 GB/s.</p>
        <p style={S.p}>
          <strong>Practical example:</strong> AllReduce mein 10 GB data transfer karna hai. 100 Gbps (= 12.5 GB/s) link pe theoretical minimum time ≈ 10/12.5 = 0.8 seconds. Real-world mein protocol overhead, multiple hops, aur congestion se actual time zyada hogi.
        </p>
        <Callout type="warning" title="Gbps ≠ GB/s — 8× Difference">
          Har jagah yeh distinction clearly check karo. Vendor spec sheets, monitoring tools, aur capacity planning documents mein units always verify karo. 400 Gbps ko 400 GB/s mat padho — actual throughput 50 GB/s hai (approximately).
        </Callout>
      </section>

      {/* ── LATENCY ───────────────────────────────────────── */}
      <section id="latency">
        <h2 style={S.h2}>Network Latency</h2>
        <p style={S.p}>
          Latency ek packet ke source se destination tak pohonchne mein laga time hai — typically microseconds (µs) ya milliseconds (ms) mein measure hoti hai.
        </p>
        <p style={S.p}><strong>Latency components:</strong></p>
        <ul style={S.ul}>
          <li><strong>Serialization delay:</strong> Packet bits ko wire pe "serialize" karne mein time — packet size aur link speed dependent.</li>
          <li><strong>Propagation delay:</strong> Electrical/optical signal physical distance travel karne mein time — speed of light limited.</li>
          <li><strong>Switching/forwarding delay:</strong> Switch mein packet process hone mein time — nanoseconds to microseconds.</li>
          <li><strong>Queueing delay:</strong> Congestion hone pe packet switch buffer mein wait karne mein time — highly variable.</li>
          <li><strong>Software/stack delay:</strong> OS kernel, driver processing — RDMA mein yeh significantly reduced hoti hai.</li>
        </ul>
        <p style={S.p}><strong>Why latency matters for AI:</strong> AllReduce barrier synchronization hai — sab nodes sync hone ka wait karte hain. Agar ek node ka network latency high hai, sab nodes uss ek node ka wait karenge. Millions of training steps mein accumulated latency training time significantly increase kar sakta hai.
        </p>
        <Callout type="important" title="High Bandwidth ≠ Low Latency">
          Yeh distinct metrics hain. Ek 400 Gbps link pe latency still ho sakta hai poor — congestion, queueing, ya processing delays se. Bandwidth aur latency dono independently monitor aur optimize karte hain.
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
          Oversubscription tab hota hai jab servers ki total bandwidth uplink bandwidth se zyada hoti hai. Example: 48 servers × 100 Gbps = 4,800 Gbps server-facing bandwidth, lekin spine uplinks total only 1,200 Gbps = 4:1 oversubscription.
        </p>
        <p style={S.p}><strong>Oversubscription ratio = server-facing bandwidth / uplink bandwidth.</strong> 1:1 = no oversubscription (full bisection bandwidth). 2:1 = 2× more server bandwidth than uplink.</p>
        <p style={S.p}><strong>Why oversubscription matters for AI:</strong> AI AllReduce traffic simultaneously sab nodes generate karte hain — yeh exactly the worst case for oversubscribed networks. Uplinks saturate, queues fill, drops occur ya PFC triggers.</p>
        <Callout type="important" title="Zero Oversubscription Har AI Workload Ke Liye Mandatory Nahi">
          Workload specific hai. Small experiments aur inference serving typically 4:1 ya even higher oversubscription tolerate kar sakte hain. Large-scale synchronous training (e.g., 1000+ GPU AllReduce) lower oversubscription prefer karta hai. Actual requirement benchmark karo — universal rule nahi hai. Over-engineering expensive hai, under-engineering bottleneck create karta hai.
        </Callout>
      </section>

      {/* ── BISECTION BANDWIDTH ───────────────────────────── */}
      <section id="bisection-bandwidth">
        <h2 style={S.h2}>Bisection Bandwidth</h2>
        <p style={S.p}>
          Bisection bandwidth ek cluster ko do equal halves mein divide karne pe available bandwidth hai between those halves. Yeh ek measure hai ki cluster kaise communicate kar sakta hai when traffic crosses the "bisection."
        </p>
        <p style={S.p}>
          Full bisection bandwidth = koi bhi half cluster ki sab nodes simultaneously doosre half ke saath full link speed pe communicate kar sakti hain — no bottleneck.
        </p>
        <p style={S.p}>
          Large-scale AI training jobs mein jab communication patterns unpredictable hote hain — multiple overlapping AllReduce operations, pipeline parallelism, tensor parallelism — bisection bandwidth bottleneck ho sakta hai.
        </p>
      </section>

      {/* ── NIC RNIC ──────────────────────────────────────── */}
      <section id="nic-rnic">
        <h2 style={S.h2}>NIC and RNIC</h2>
        <p style={S.p}><strong>NIC (Network Interface Card):</strong> Server ko network se connect karne wala hardware. Ports, buffers, DMA engines, firmware — sab physical layer networking handle karta hai.</p>
        <p style={S.p}><strong>RNIC (RDMA-capable NIC):</strong> NIC jisme RDMA hardware acceleration hai. Network stack processing (typically kernel ka kaam) hardware mein implement hoti hai — CPU bypass enable karta hai.</p>
        <p style={S.p}><strong>NIC performance factors:</strong></p>
        <ul style={S.ul}>
          <li><strong>Port speed:</strong> Link bandwidth ceiling.</li>
          <li><strong>Number of ports:</strong> Multiple ports = multiple rails possible.</li>
          <li><strong>RDMA capabilities:</strong> Queue pairs, memory regions, completion queues.</li>
          <li><strong>PCIe connectivity:</strong> NIC ka PCIe bandwidth bottleneck ho sakta hai — especially PCIe 3.0 pe high-speed NICs ke saath.</li>
          <li><strong>Firmware version:</strong> Bugs, performance regressions firmware mein ho sakte hain — important to keep updated.</li>
          <li><strong>Driver version:</strong> OS driver NIC firmware ke saath compatible hona chahiye.</li>
        </ul>
      </section>

      {/* ── PCIE BOTTLENECK ───────────────────────────────── */}
      <section id="pcie-bottleneck">
        <h2 style={S.h2}>PCIe Bottlenecks</h2>
        <p style={S.p}>
          GPU aur NIC ke beech PCIe bus hai. PCIe bandwidth limited hoti hai — agar NIC aur GPU dono same PCIe bandwidth share kar rahe hain, bottleneck create ho sakta hai.
        </p>
        <p style={S.p}><strong>PCIe bandwidth (approximate, generation/width dependent):</strong></p>
        <ul style={S.ul}>
          <li>PCIe 4.0 x16: ~32 GB/s bidirectional (approximate, depends on implementation)</li>
          <li>PCIe 5.0 x16: ~64 GB/s bidirectional (approximate)</li>
        </ul>
        <p style={S.p}>
          Actual numbers depend on specific implementation aur overhead. Key point: high-speed NICs (e.g., 400 Gbps = ~50 GB/s) ke liye PCIe 4.0 x16 bandwidth sufficient may not be if there are multiple high-speed devices sharing the same PCIe complex.
        </p>
        <p style={S.p}><strong>PCIe topology matters:</strong> Different PCIe root complexes pe connected devices ke beech data transfer PCIe switch ya CPU interconnect se jaata hai — potential bottleneck. GPU aur NIC ka same PCIe root complex pe hona better locality deta hai.
        </p>
      </section>

      {/* ── NUMA AFFINITY ─────────────────────────────────── */}
      <section id="numa-affinity">
        <h2 style={S.h2}>NUMA and CPU Affinity</h2>
        <p style={S.p}>
          NUMA (Non-Uniform Memory Access) multi-socket servers mein hoti hai. Har CPU socket apna local memory rakhta hai — local memory access fast hoti hai, remote (other socket's) memory access slower hoti hai.
        </p>
        <p style={S.p}><strong>AI networking mein NUMA impact:</strong></p>
        <ul style={S.ul}>
          <li>GPU typically ek specific PCIe root complex se connected hoti hai — isliye ek specific CPU socket se "affinit" hoti hai.</li>
          <li>NIC bhi ek specific PCIe root complex se connected hoti hai.</li>
          <li>Agar GPU socket 0 pe hai aur NIC socket 1 pe, toh GPU-to-NIC data transfer socket boundary cross karta hai — slower.</li>
          <li>NCCL aur MPI implementations NUMA topology pe based affinity hints use kar sakte hain performance optimize karne ke liye.</li>
        </ul>
        <p style={S.p}><strong>Fix:</strong> GPU aur uski associated NIC ko same NUMA domain mein prefer karo. Server hardware design aur slot placement planning mein yeh consider karo.</p>
      </section>

      {/* ── SWITCH ARCHITECTURE ───────────────────────────── */}
      <section id="switch-architecture">
        <h2 style={S.h2}>Switch Architecture</h2>
        <p style={S.p}>
          AI fabric switches conventional enterprise switches se different requirements rakhte hain. Key architectural aspects:
        </p>
        <ul style={S.ul}>
          <li><strong>ASIC (Application-Specific Integrated Circuit):</strong> Switch forwarding engine. Determines per-port bandwidth, latency, buffer size, aur features. Different vendors ke different ASIC designs hain — kisi ek ko universal standard mat kaho.</li>
          <li><strong>Switch buffers:</strong> Congestion ke dauran packets in-switch buffers mein queue hote hain. AI traffic patterns bursty hote hain — deep buffers congestion absorb karte hain lekin badi queue latency increase karti hai. Buffer sizing trade-off hai.</li>
          <li><strong>Queues aur QoS:</strong> Per-port per-priority queues — different traffic types (RDMA, management, storage) alag queues mein.</li>
          <li><strong>ECMP implementation:</strong> Hash algorithm quality determine karta hai path distribution uniformity. Better hash = less collision.</li>
          <li><strong>Telemetry:</strong> Modern switches INT (In-band Network Telemetry) ya similar mechanisms support karte hain — real-time per-flow visibility. AI performance debugging ke liye valuable.</li>
        </ul>
        <Callout type="best-practice" title="Switch Buffer Behavior AI Traffic Ke Liye Critical">
          AI AllReduce traffic highly synchronized hota hai — sab nodes simultaneously same time pe large bursts generate karte hain. Switch buffers iss burst absorb karte hain. Insufficient buffer = drops/PFC. Excessive buffer = high latency. Workload characterization karo, phir buffer sizing evaluate karo.
        </Callout>
      </section>

      {/* ── OPTICS DAC AOC ────────────────────────────────── */}
      <section id="optics-dac-aoc">
        <h2 style={S.h2}>DAC, AOC and Optical Transceivers</h2>
        <p style={S.p}>
          Server se switch tak physical connection ke multiple options hain — DAC, AOC, ya fiber with optical transceivers.
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
        <p style={S.p}><strong>Optical types (single-mode vs multimode):</strong> Single-mode fiber longer distances support karta hai (hundreds of meters to km). Multimode shorter distances pe used hota hai (typically within a data center). Connector types (LC, MTP/MPO) aur compatibility verify karo before deployment. Specific reach aur compatibility hardware vendor documentation se verify karo.</p>
      </section>

      {/* ── OPTICS PROBLEMS ───────────────────────────────── */}
      <section id="optics-problems">
        <h2 style={S.h2}>Fiber and Optics Problems</h2>
        <p style={S.p}>
          Physical layer problems AI network performance dramatically impact kar sakte hain — aur yeh kaafi common issue hai O&M mein.
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
          MTU (Maximum Transmission Unit) maximum packet/frame size define karta hai. Standard Ethernet MTU 1500 bytes hai. Jumbo Frames typically 9000 bytes (9K MTU) tak ke frames allow karte hain.
        </p>
        <p style={S.p}><strong>Why larger MTU can help AI:</strong> Large RDMA transfers fewer but bigger packets mein ho sakte hain — per-packet header overhead proportionally kam hoti hai, throughput improve ho sakti hai.</p>
        <p style={S.p}><strong>MTU consistency critical hai:</strong> End-to-end MTU consistent honi chahiye — every server, NIC, switch, aur any intermediate device pe same MTU. MTU mismatch = fragmentation (Ethernet typically doesn't fragment RDMA) ya packet drops. Yeh mysterious connectivity aur performance issues cause karta hai.</p>
        <Callout type="important" title="Jumbo Frames Universally Mandatory Nahi">
          MTU 9000 many AI/RoCE deployments mein use hota hai lekin mandatory nahi hai. Actual MTU choice depend karta hai network equipment compatibility, end-to-end consistency capability, aur workload characteristics pe. 1500 MTU pe bhi AI training work kar sakti hai — throughput optimization ke liye larger MTU beneficial ho sakta hai lekin default requirement nahi hai.
        </Callout>
      </section>

      {/* ── QOS ───────────────────────────────────────────── */}
      <section id="qos">
        <h2 style={S.h2}>QoS — Quality of Service</h2>
        <p style={S.p}>
          QoS mechanisms different traffic types ko different priorities aur treatment de sakte hain. AI networks mein typically multiple traffic types coexist karte hain: RDMA/AI training traffic, storage traffic, management traffic.
        </p>
        <p style={S.p}><strong>QoS mechanisms:</strong></p>
        <ul style={S.ul}>
          <li><strong>Traffic Classes:</strong> Different logical queues — high priority RDMA, lower priority management.</li>
          <li><strong>DSCP (Differentiated Services Code Point):</strong> IP packet header mein priority marking — routers aur switches yeh dekh ke treatment decide karte hain.</li>
          <li><strong>PFC:</strong> Per-priority pause — QoS ke saath coordinate karta hai ki kaunsa priority class pause ho.</li>
          <li><strong>Scheduling:</strong> Switch mein queues se packets kis order mein forward karein — strict priority ya weighted fair queuing.</li>
        </ul>
        <Callout type="important" title="QoS aur PFC Alag Mechanisms Hain">
          QoS traffic classification aur prioritization hai. PFC ek specific pause mechanism hai jo typically ek specific QoS class ke liye apply hota hai. Dono complementary hain lekin dono ek cheez nahi hain.
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
          <li><strong>ECMP-based resilience:</strong> In leaf-spine, ek link ya spine fail hone pe ECMP traffic remaining equal-cost paths pe redirect karta hai — no manual intervention needed typically.</li>
          <li><strong>NIC bonding:</strong> Some configurations mein dual NICs per server — active-active ya active-standby. Depends on fabric and workload support.</li>
        </ul>
        <p style={S.p}><strong>Failure domains:</strong> Redundancy strategy fail domains define karta hai. Ek leaf switch fail hone pe sirf woh rack affected hoti hai (dual-ToR design mein half bandwidth lost). Ek spine fail pe bandwidth reduces but connectivity maintains.</p>
      </section>

      {/* ── NETWORK SECURITY ──────────────────────────────── */}
      <section id="network-security">
        <h2 style={S.h2}>AI Network Security</h2>
        <p style={S.p}><strong>Plane separation — critical:</strong></p>
        <ul style={S.ul}>
          <li><strong>Management plane:</strong> BMC/IPMI, SSH, SNMP, monitoring. Physically ya logically separate network. Out-of-band access.</li>
          <li><strong>AI compute/data plane:</strong> GPU-to-GPU training traffic, RDMA. High-bandwidth, low-latency.</li>
          <li><strong>Storage plane:</strong> Dataset reads, checkpoint writes. Separate from compute plane ideally.</li>
        </ul>
        <p style={S.p}><strong>Security practices:</strong></p>
        <ul style={S.ul}>
          <li>Management network physically isolate karo — AI training traffic management network pe flow nahi karni chahiye.</li>
          <li>Switch management interfaces alag VLAN ya physical port pe.</li>
          <li>NIC aur switch firmware regularly update karo — security patches.</li>
          <li>Access control: who can configure switches, who can SSH to servers.</li>
          <li>Monitoring: unusual traffic patterns detect karo — unexpected flows, high error rates could indicate issues.</li>
          <li>InfiniBand partitions: workloads logically isolate karo shared fabrics pe.</li>
        </ul>
        <Callout type="warning" title="BMS/DCIM AI Training Traffic Carry Nahi Karta">
          BMS (Building Management System) aur DCIM (Data Center Infrastructure Management) physical infrastructure (power, cooling, temperature) monitor aur manage karte hain. GPU training data, gradients, aur RDMA traffic BMS network pe bilkul nahi hoti — yeh completely separate systems hain.
        </Callout>
      </section>

      {/* ── MONITORING ────────────────────────────────────── */}
      <section id="monitoring">
        <h2 style={S.h2}>AI Network Monitoring</h2>
        <p style={S.p}>
          Comprehensive monitoring without which problems invisible rehte hain until they become serious failures.
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
          <li><strong>Profile collective communication:</strong> PyTorch Profiler ya NCCL_DEBUG=INFO se check karo — AllReduce mein kitna time ja raha hai. Agar communication time &gt;= compute time, network issue likely.</li>
          <li><strong>Check NIC utilization:</strong> NIC bandwidth saturated? RDMA counters normal? Any NIC-level errors?</li>
          <li><strong>Check PCIe aur NUMA:</strong> PCIe bandwidth utilization. GPU-NIC NUMA affinity correct hai?</li>
          <li><strong>Check switch metrics:</strong> Port utilization, packet drops, buffer occupancy. Congested uplinks?</li>
          <li><strong>Check PFC aur ECN:</strong> PFC pause frames very high? PFC storm? ECN marking rate high indicates congestion.</li>
          <li><strong>Check physical layer:</strong> CRC errors, FEC errors, link flaps — optics problems?</li>
          <li><strong>Check MTU:</strong> End-to-end MTU consistent? Any mismatch causing drops?</li>
          <li><strong>Check path balance:</strong> ECMP hash causing one rail/path overloaded while others idle?</li>
          <li><strong>Identify bottleneck aur fix:</strong> Specific layer fix karo, re-measure, verify improvement.</li>
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
        <Callout type="important" title="Koi Universal 'Best' Nahi Hai">
          InfiniBand vs RoCE vs TCP choice workload, scale, budget, existing expertise, aur ecosystem pe depend karti hai. Large-scale NVIDIA GPU training clusters mein InfiniBand popular hai. Hyperscaler AI clusters mein RoCE-based Ethernet common hai. Small experiments aur inference mein TCP adequate ho sakta hai. Apne specific requirements ke basis pe evaluate karo.
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
          <li><strong>Storage Plane:</strong> Training dataset reads, checkpoint writes. May be separate fabric ya logically segregated on same physical network. High throughput, moderate latency.</li>
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
          <li><strong>Link speed:</strong> NIC port speed aur switch port speed — determine per-node bandwidth.</li>
          <li><strong>Switch port count:</strong> Leaf switch ports (server-facing) + uplink ports (to spine).</li>
          <li><strong>Oversubscription target:</strong> Based on workload — low for synchronous training, higher for inference.</li>
          <li><strong>Redundancy:</strong> Dual-ToR, redundant spines — additional ports aur switches needed.</li>
          <li><strong>Growth headroom:</strong> Future expansion — plan for scale-out rather than forklift upgrades.</li>
          <li><strong>Failure domains:</strong> Acceptable blast radius — how many GPUs affected if one switch fails?</li>
        </ul>
        <p style={S.p}><strong>Conceptual planning example:</strong> 512 GPUs, 8 GPUs per server = 64 GPU servers. 8 NICs per server × 64 servers = 512 server-facing ports on leaf switches. Target 2:1 oversubscription: 512 server ports need 256 uplink ports to spine. Spine ports accordingly. Actual numbers depend on specific switch models, port density, and topology design choices — this is illustrative only.
        </p>
        <Callout type="best-practice" title="Benchmark, Don't Guess">
          Theoretical calculations capacity planning ka starting point hai. Actual workload benchmark karo before finalizing design — different AI models, batch sizes, aur collective patterns produce very different network utilization. Measure actual AllReduce bandwidth requirements on representative training runs.
        </Callout>
      </section>

      {/* ── DESIGN CHECKLIST ──────────────────────────────── */}
      <section id="design-checklist">
        <h2 style={S.h2}>AI Networking Design Checklist</h2>
        <ul style={S.ul}>
          <li>☐ <strong>Architecture:</strong> Leaf-Spine topology designed with appropriate oversubscription ratio for workload.</li>
          <li>☐ <strong>Bandwidth:</strong> Per-node bandwidth calculated. Aggregate bandwidth sufficient for peak AllReduce.</li>
          <li>☐ <strong>RDMA:</strong> InfiniBand ya RoCE selected based on workload, budget, ecosystem.</li>
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
          <li><strong>AI networking throughput aur latency dono matter karte hain — different reasons ke liye:</strong> AllReduce large data transfer karta hai (bandwidth critical), lekin barrier synchronization latency accumulate karta hai across millions of steps (latency bhi critical). Dono independently monitor aur optimize karo.</li>
          <li><strong>NVLink aur InfiniBand/Ethernet fundamentally alag hain:</strong> NVLink intra-node GPU interconnect hai (NVIDIA-specific). InfiniBand aur Ethernet inter-node data center network fabric hain. Dono ek GPU cluster mein simultaneously ho sakte hain different layers pe — inhe kabhi mix mat karo.</li>
          <li><strong>RDMA InfiniBand ka synonym nahi hai:</strong> RDMA ek mechanism/concept hai. InfiniBand natively RDMA implement karta hai. RoCE Ethernet pe RDMA provide karta hai. Dono pe RDMA possible hai — different technologies.</li>
          <li><strong>RoCEv2 UDP/IP pe chalta hai aur routable hai:</strong> Yeh "Layer-2 only" nahi hai. RoCEv2 modern leaf-spine routed topologies ke saath compatible hai.</li>
          <li><strong>PFC poori network ko lossless nahi banata:</strong> PFC ek per-priority pause mechanism hai specific ports ke liye. Risks hain: HoL blocking, congestion propagation, PFC storms. ECN ke saath complement karo, carefully configure karo.</li>
          <li><strong>ECN congestion signal karta hai, packet loss guarantee nahi karta:</strong> ECN marking rate reduction trigger karta hai. Severe congestion mein drops abhi bhi ho sakte hain. ECN aur PFC different mechanisms hain.</li>
          <li><strong>NCCL ek library hai, network nahi:</strong> NCCL collective operations implement karta hai. NCCL "slow" matlab network ya PCIe ya NUMA bottleneck hai jise NCCL expose kar raha hai.</li>
          <li><strong>Ethernet AI ke liye suitable hai:</strong> Modern high-speed Ethernet + RoCEv2 large-scale AI training support karta hai. InfiniBand mandatory nahi hai — choice workload, scale, expertise, aur cost pe depend karta hai.</li>
          <li><strong>Gbps aur GB/s confuse mat karo:</strong> 8 bits = 1 byte. 400 Gbps ≈ 50 GB/s throughput. Planning aur monitoring mein units always verify karo.</li>
          <li><strong>Leaf-Spine topology East-West traffic ke liye optimal hai:</strong> Consistent latency, ECMP path diversity, controllable oversubscription — AI AllReduce ke liye suitable design.</li>
          <li><strong>PCIe aur NUMA network bottlenecks create kar sakte hain:</strong> Switch bandwidth check karna kaafi nahi hai. GPU-NIC PCIe path aur NUMA affinity bhi AI networking performance determine karte hain.</li>
          <li><strong>Physical layer problems common aur serious hain:</strong> Dirty fiber, bad optics, FEC errors — yeh real O&M issues hain. DOM monitoring, FEC counter tracking, aur proactive replacement necessary hain.</li>
          <li><strong>Management, Compute, aur Storage networks separate rakhna chahiye:</strong> Plane separation security, reliability, aur performance ke liye important hai. BMS/DCIM AI training traffic carry nahi karta — yeh infrastructure management ke liye hai.</li>
          <li><strong>MTU end-to-end consistent honi chahiye:</strong> Jumbo frames universally mandatory nahi hain, lekin agar use karo toh every single device pe same MTU. MTU mismatch mysterious problems cause karta hai.</li>
          <li><strong>Troubleshooting systematic hona chahiye:</strong> Layer-by-layer diagnose karo. GPU utilization issue → collective timing → NIC → PCIe → switch → PFC/ECN → optics → MTU → path balance. First bottleneck fix karo, re-measure, verify.</li>
        </ul>
      </section>

    </article>
  );
}
