"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import CpuTopologyNuma from "../svg/CpuTopologyNuma";
import CacheHierarchy from "../svg/CacheHierarchy";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — CPU in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>CPU kya hai:</strong> Central Processing Unit — server ka primary compute engine. Instructions execute karta hai, calculations perform karta hai.</li>
          <li><strong>Topology:</strong> Socket (physical CPU) → Core (physical execution unit) → Thread (logical — SMT/Hyperthreading se ek core 2 threads present karta hai OS ko).</li>
          <li><strong>Cache:</strong> L1 (per-core, fastest) → L2 (per-core) → L3 (all cores share) — RAM se much faster. Cache miss hone pe RAM fetch — latency badh jaati hai.</li>
          <li><strong>NUMA:</strong> Multi-socket mein har CPU ki local RAM hoti hai. Remote RAM access slow hota hai — workload placement matter karta hai.</li>
          <li><strong>TDP:</strong> Thermal Design Power — cooling aur power budgeting reference value. Universal maximum power figure nahi.</li>
          <li><strong>Virtualisation extensions:</strong> Intel VT-x / AMD-V — hardware se VMs efficiently run karne ke liye required, modern server CPUs mein standard.</li>
          <li><strong>Selection:</strong> Single-threaded workloads = higher clock speed priority. Parallel workloads = more cores priority. Workload analyse karo phir CPU choose karo.</li>
        </ul>
      </div>

      <h2 id="what-is-a-cpu" style={S.h2}>What Is a CPU?</h2>
      <p style={S.p}>CPU (Central Processing Unit) server ka primary compute engine hai. Har instruction jo application run karti hai — arithmetic, comparison, memory read/write, network packet processing — ultimately CPU pe execute hota hai. Modern server CPUs ek simple "calculator" se kahin zyada complex hain — sophisticated execution pipelines, prediction units, memory controllers, aur I/O interfaces hain.</p>
      <p style={S.p}>Ek CPU core ek instruction at a time execute karta hai — yeh oversimplification hai. Modern CPUs out-of-order execution, superscalar pipelines aur branch prediction use karte hain, matlab ek core multiple instructions simultaneously different stages pe process kar sakta hai (pipeline parallelism). Ek core ek sequential instruction stream handle karta hai (thread), lekin internally kaafi parallel processing hoti hai.</p>

      <h2 id="x86-vs-arm" style={S.h2}>x86 vs ARM — Server CPU Architectures</h2>
      <p style={S.p}><strong>x86 (Intel / AMD):</strong> Historically server dominant architecture. Intel Xeon aur AMD EPYC families. Complex Instruction Set Computing (CISC) — rich instruction set, hardware complexity high. Excellent software ecosystem — virtually sab enterprise software natively supported.</p>
      <p style={S.p}><strong>ARM-based servers:</strong> Growing significantly. AWS Graviton (Amazon data centers mein use), Ampere Altra, NVIDIA Grace Hopper. Reduced Instruction Set Computing (RISC) — simpler instructions, often better performance-per-watt in certain workloads. Cloud providers ARM instances offer karte hain. Software compatibility check karo — kuch software ARM native binaries required karte hain ya performance tuning needed hota hai.</p>
      <p style={S.p}>Architecture choice ecosystem, software support, workload characteristics aur organizational standards pe depend karta hai. Specific performance comparisons model, workload aur configuration pe highly dependent hain.</p>

      <h2 id="server-vs-consumer" style={S.h2}>Server CPU vs Consumer CPU</h2>
      <ComparisonTable
        title="Server CPU vs Consumer CPU"
        headers={["Feature","Server CPU (Xeon/EPYC)","Consumer CPU (Core/Ryzen)"]}
        rows={[
          ["Multi-socket","Supported (2S, 4S typical)","Single socket only"],
          ["ECC Memory","Supported (platform/chipset dependent)","Often not officially supported"],
          ["PCIe Lanes","More lanes per socket","Fewer lanes"],
          ["RAS Features","Hardware error detection/correction","Limited or absent"],
          ["Product Lifecycle","Longer support cycle","Consumer release cycle"],
          ["Core Count","Wide range — varies by model","Fewer in most consumer lines"],
          ["Price","Significantly higher","Lower"],
        ]}
        caption="Specific capabilities depend on CPU model, generation, chipset and platform. Always verify with vendor documentation."
      />

      <h2 id="cpu-topology" style={S.h2}>CPU Topology: Socket → Core → Thread</h2>
      <p style={S.p}><strong>Socket:</strong> Physical CPU slot on motherboard. 1-socket (1S) server ek physical CPU. 2-socket (2S) do physical CPUs ek motherboard pe — double cores, double memory channels, NUMA introduces hoti hai. Socket type CPU generation specific hoti hai — socket match must hona chahiye.</p>
      <p style={S.p}><strong>Core:</strong> Physical execution unit within the CPU. Each core instructions execute kar sakta hai independently. More cores = more parallel workloads simultaneously. Core count CPU model pe significantly vary karta hai.</p>
      <p style={S.p}><strong>Thread (Hyperthreading/SMT):</strong> Intel Hyper-Threading Technology / AMD Simultaneous Multi-Threading (SMT) — ek physical core ke resources do logical threads ke beech share karte hain. OS ko ek physical core 2 logical processors ki tarah dikhta hai. Benefit workload-specific hai — memory-bound ya branch-heavy code mein more benefit; pure integer compute mein less. SMT by default most servers pe enabled hota hai.</p>
      <Figure caption="Fig 1 — CPU topology (illustrative): socket → core → thread, plus NUMA showing local vs remote memory access in a 2-socket system."><CpuTopologyNuma /></Figure>
      <Callout type="important" title="NUMA Awareness Is Critical for Performance">
        Multi-socket server mein workload ko NUMA-aware deploy karo. VM ya database process jo ek NUMA node pe run ho lekin doosre node ki RAM access kare — silently performance degraded rehti hai bina obvious error ke. `numactl --hardware` Linux mein NUMA topology check karo. NUMA imbalance performance issues identify karne ke liye `numastat` use karo.
      </Callout>

      <h2 id="cache-hierarchy" style={S.h2}>Cache Hierarchy</h2>
      <p style={S.p}>CPU cache temporary high-speed memory hai CPU package ke andar. RAM se access karna relatively slow hota hai — cache frequently used data CPU ke paas rakhta hai. Cache miss hone pe CPU RAM se fetch karta hai — significant latency increase.</p>
      <Figure caption="Fig 2 — Memory hierarchy from L1 cache (fastest, smallest) down to storage (slowest, largest)."><CacheHierarchy /></Figure>
      <p style={S.p}><strong>L1 cache:</strong> Fastest, smallest capacity, per-core. Instruction cache aur data cache separate hote hain typically.</p>
      <p style={S.p}><strong>L2 cache:</strong> Larger than L1, per-core. L1 miss → L2 check.</p>
      <p style={S.p}><strong>L3 cache (Last Level Cache / LLC):</strong> Largest on-chip cache — all cores share karte hain. L2 miss → L3 check. Server CPUs mein significant L3 capacity hoti hai — database buffer pools, frequently accessed working sets ko cache karna.</p>
      <p style={S.p}>Actual latency aur capacity values CPU architecture, generation aur implementation pe depend karte hain — specific numbers OEM technical documentation se verify karo.</p>

      <h2 id="memory-channels" style={S.h2}>Memory Channels and Bandwidth</h2>
      <p style={S.p}>CPU memory controller RAM se memory channels ke through connect hota hai. Multiple channels parallel mein operate karte hain — bandwidth multiply hoti hai. Server CPUs multiple memory channels support karte hain — specific count model aur generation pe depend karta hai.</p>
      <p style={S.p}><strong>Maximise bandwidth:</strong> Sab available memory channels populate karo identical DIMMs se (symmetric population). Asymmetric population kuch channels unused chhod deta hai — bandwidth sub-optimal. OEM memory population guidelines follow karo exactly — platform manual mandatory reference hai.</p>
      <p style={S.p}>Memory bandwidth CPU-intensive vs memory-bandwidth-intensive workloads ke liye differently important hota hai. Scientific computing, large dataset analytics, in-memory databases memory bandwidth se significantly benefit karte hain.</p>

      <h2 id="numa" style={S.h2}>NUMA — Non-Uniform Memory Access</h2>
      <p style={S.p}>2-socket server mein dono CPUs ko sab RAM access karni hoti hai. Lekin physical architecture mein kuch RAM CPU 0 ke memory controller se directly connected hai, kuch CPU 1 se. CPU 0 apni local RAM access kare → fast. CPU 0 CPU 1 ki RAM access kare → CPU-to-CPU interconnect (Intel UPI / AMD Infinity Fabric) se jaana padta hai → higher latency, lower bandwidth.</p>
      <p style={S.p}><strong>NUMA nodes:</strong> Har socket aur uski directly-connected RAM ek NUMA node form karta hai. `numactl --hardware` Linux mein node topology aur distances show karta hai. Lower NUMA distance = faster access.</p>
      <p style={S.p}><strong>Practical implications:</strong> Database workloads — NUMA node pe pin karo (numactl). VMs — same NUMA node pe vCPUs aur vRAM assign karo. Application behaviour — NUMA-aware applications locality optimise kar sakte hain. OS typically NUMA-aware allocation karta hai default — but large applications ko explicit configuration benefit deta hai.</p>

      <h2 id="tdp-power" style={S.h2}>TDP and Power</h2>
      <p style={S.p}>TDP (Thermal Design Power) watt mein ek reference value hai jis pe cooling solution design karna chahiye. Yeh specific workload conditions pe CPU ka heat dissipation estimate hai. TDP universal maximum power consumption figure nahi hai — actual power workload aur configuration pe depend karta hai. Kuch scenarios mein brief periods mein TDP exceed ho sakta hai (all-core turbo), kuch mein idle load pe significantly under hota hai.</p>
      <p style={S.p}><strong>Data center relevance:</strong> Rack power budget planning mein TDP figures reference karo. Cooling system design — heatsink, airflow — TDP pe based hoti hai. Actual power monitoring (BMC power readings, rack PDU monitoring) deployment ke baad karo accurate capacity planning ke liye.</p>
      <p style={S.p}>High-core-count, high-TDP CPUs power per rack aur cooling requirements badha sakte hain. CPU selection mein performance per watt consider karo along with raw performance.</p>

      <h2 id="virtualisation-ext" style={S.h2}>Hardware Virtualisation Extensions</h2>
      <p style={S.p}><strong>Intel VT-x (Virtualisation Technology for x86) / AMD-V (AMD Virtualisation):</strong> Hardware features jo hypervisors ko efficiently VMs run karne allow karte hain. Software-only virtualisation se much better performance. Modern server CPUs mein standard — typically UEFI mein enabled by default hote hain. Hypervisor run karne ke liye required (VMware ESXi, Hyper-V, KVM).</p>
      <p style={S.p}><strong>Intel VT-d / AMD-Vi (IOMMU):</strong> I/O virtualisation — devices directly VMs ko pass-through karna allow karta hai without hypervisor overhead (PCIe passthrough). GPU passthrough ke liye bhi use hota hai. UEFI mein enable karna typically required.</p>
      <p style={S.p}><strong>EPT (Extended Page Tables) / AMD RVI (Rapid Virtualisation Indexing):</strong> Hardware-accelerated memory address translation for VMs — software TLB management pe less overhead. VM memory performance improve karta hai.</p>

      <h2 id="cpu-selection" style={S.h2}>Workload-Based CPU Selection</h2>
      <ComparisonTable
        title="CPU Selection by Workload Type"
        headers={["Workload","Priority","Rationale"]}
        rows={[
          ["Web/API servers","Higher core count, moderate clock","Many parallel requests, each lightweight"],
          ["Database (OLTP)","Higher clock speed, good single-thread perf","Many short transactions, often single-thread critical path"],
          ["Analytics/OLAP","More cores, high memory bandwidth","Large data scans, parallel query execution"],
          ["Virtualisation hosts","High core count, NUMA awareness","Many VMs, each needing vCPUs"],
          ["HPC/Scientific","Architecture-specific — varies","Depends on application — evaluate specifically"],
          ["AI Training (CPU role)","Data preprocessing capabilities","GPU does main compute; CPU feeds data"],
        ]}
        caption="Workload requirements vary significantly. Benchmark with representative workloads before finalising selection."
      />
      <p style={S.p}>Socket selection: 1S simpler, lower cost — small-medium workloads. 2S double resources but NUMA consideration. More sockets — specialized requirements, higher complexity aur cost. Workload fit karo minimum required socket count mein.</p>

      <h2 id="cpu-in-virtualisation" style={S.h2}>CPU in Virtualisation</h2>
      <p style={S.p}><strong>vCPU:</strong> Hypervisor VM ko virtual CPU cores present karta hai. vCPU physical CPU threads pe scheduled hote hain. VM ko 8 vCPUs → hypervisor 8 physical threads use/schedule karta hai.</p>
      <p style={S.p}><strong>CPU overcommit:</strong> Physical threads se zyada vCPUs assign karna. Work karta hai kyunki sab VMs simultaneously peak mein nahi hote. Risk: sab VMs simultaneously heavy load pe → CPU ready queue mein wait → performance degradation. Overcommit ratio carefully monitor karo.</p>
      <p style={S.p}><strong>NUMA in VMs:</strong> VM ke vCPUs aur vRAM same physical NUMA node pe hone chahiye ideally — hypervisor typically manage karta hai lekin large VMs pe explicit configuration benefit deta hai. Hypervisor NUMA topology expose karta hai VM ko bhi.</p>
      <p style={S.p}><strong>EVC (Enhanced vMotion Compatibility) — VMware:</strong> CPUs ke beech feature differences mask karta hai live migration ke liye. CPU feature sets mein difference ho toh EVC mode enable karo cluster level pe. Yeh concept other hypervisors mein bhi similar feature hoti hai.</p>

      <h2 id="troubleshooting" style={S.h2}>CPU Troubleshooting</h2>
      <h3 style={S.h3}>High CPU Utilization</h3>
      <p style={S.p}>`top` ya `htop` Linux mein — per-core utilization. Which processes? `ps aux --sort=-%cpu`. Spike hai ya sustained? All cores ya single core? Single core 100% = single-threaded bottleneck — software issue, hardware nahi solve karega.</p>
      <h3 style={S.h3}>CPU Steal (Virtualised)</h3>
      <p style={S.p}>`%st` in top — physical host busy hai doosre VMs ke saath. High steal = overcommitted host. Workload migrate karo ya host capacity add karo. Monitoring pe CPU steal track karo baseline establish karo.</p>
      <h3 style={S.h3}>Thermal Issues / Throttling</h3>
      <p style={S.p}>BMC temperature readings check karo. Fan speeds normal hain? Airflow adequate? Heatsink properly seated? CPU frequency drop check karo (performance mode disabled? Power capping?). CPU thermal throttle karta hai to prevent damage — root cause fix karo.</p>
      <h3 style={S.h3}>NUMA Performance Issues</h3>
      <p style={S.p}>`numastat` — NUMA miss rate. High remote memory access rate. Workload NUMA node pe pin karo (`numactl`). VMs large hain toh NUMA topology check karo hypervisor se.</p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: NUMA kya hai aur performance pe kaise impact karta hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Multi-socket server mein har CPU (socket) ki directly-connected local RAM hoti hai — NUMA node banata hai. CPU apni local RAM access kare to fast. Doosre CPU ki RAM access karne ke liye CPU-to-CPU interconnect se jaana padta hai — higher latency. NUMA-unaware workload placement silently performance degrade kar sakta hai. `numactl --hardware` topology dikhata hai, `numastat` miss rates.</p>
      <h3 style={S.h3}>Q2: TDP kya hota hai — kya yeh CPU ka maximum power consumption hai?</h3>
      <p style={S.p}><strong>Answer:</strong> TDP (Thermal Design Power) ek reference value hai jis pe cooling system design karna chahiye — specific load conditions pe heat dissipation estimate. Yeh universal maximum power figure nahi hai — actual power workload pe vary karta hai. Idle pe TDP se significantly under hota hai, some all-core turbo scenarios mein briefly exceed bhi ho sakta hai. Cooling design aur rack power budgeting ke liye reference use karo, exact maximum power figure ke roop mein nahi.</p>
      <h3 style={S.h3}>Q3: Intel VT-x / AMD-V kya hai aur kyun zaroori hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Hardware virtualisation extensions hain — hypervisors ko efficiently VMs run karne allow karte hain. Bina hardware support ke software-only virtualisation much slower hoti. Modern server CPUs mein standard feature hai. VMware ESXi, Hyper-V, KVM — sab require karte hain. UEFI mein enabled hona chahiye (typically default).</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>CPU topology: Socket → Core → Thread. SMT/Hyperthreading ek core pe 2 logical threads present karta hai.</li>
        <li>Cache hierarchy: L1 (fastest, per-core) → L2 (per-core) → L3 (shared) → RAM. Cache miss hone pe latency significantly badh jaati hai.</li>
        <li>NUMA multi-socket servers mein critical — local vs remote memory access performance ko meaningfully affect karta hai.</li>
        <li>TDP cooling reference value hai — universal maximum power figure nahi. Actual power workload pe depend karta hai.</li>
        <li>Intel VT-x / AMD-V virtualisation ke liye hardware requirement hain — server CPUs mein standard.</li>
        <li>CPU selection: single-threaded workloads = clock speed priority; parallel = core count priority; workload-specific benchmarking best approach.</li>
        <li>x86 (Intel Xeon/AMD EPYC) dominant, ARM-based servers (Graviton, Ampere) growing — software compatibility check karo.</li>
      </ul>

      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: i < faqs.length - 1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight: 700, marginBottom: "0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom: 0 }}>{item.a}</p>
        </div>
      ))}

      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Related Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="server-basics" variant="inline" /> — CPU context in full server architecture.</li>
        <li><TopicLink slug="ram" variant="inline" /> — Memory channels, NUMA relationship.</li>
        <li><TopicLink slug="gpu" variant="inline" /> — Accelerator architecture, CPU vs GPU.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — vCPU, overcommit, NUMA in VMs.</li>
      </ul>
    </>
  );
}
