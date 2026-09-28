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
        <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — CPU in 2 Minutes</p> <ul style={{ ...S.ul, marginBottom: 0 }}> <li><strong>What a CPU is:</strong> Central Processing Unit — the server's primary compute engine. It executes instructions and performs calculations.</li> <li><strong>Topology:</strong> Socket (physical CPU) → Core (physical execution unit) → Thread (logical — with SMT/Hyperthreading, one core presents 2 threads to the OS).</li> <li><strong>Cache:</strong> L1 (per-core, fastest) → L2 (per-core) → L3 (shared by all cores) — much faster than RAM. On a cache miss, data is fetched from RAM — latency increases.</li> <li><strong>NUMA:</strong> In multi-socket systems, each CPU has its own local RAM. Remote RAM access is slower — workload placement matters.</li> <li><strong>TDP:</strong> Thermal Design Power — a reference value for cooling and power budgeting. Not a universal maximum power figure.</li> <li><strong>Virtualisation extensions:</strong> Intel VT-x / AMD-V — required to run VMs efficiently in hardware, standard in modern server CPUs.</li> <li><strong>Selection:</strong> Single-threaded workloads = prioritise higher clock speed. Parallel workloads = prioritise more cores. Analyse the workload, then choose the CPU.</li> </ul>
      </div>

      <h2 id="what-is-a-cpu" style={S.h2}>What Is a CPU?</h2>
      <p style={S.p}>The CPU (Central Processing Unit) is the server's primary compute engine. Every instruction an application runs — arithmetic, comparison, memory read/write, network packet processing — is ultimately executed on the CPU. Modern server CPUs are far more complex than a simple "calculator" — they have sophisticated execution pipelines, prediction units, memory controllers, and I/O interfaces.</p>
      <p style={S.p}>Saying a CPU core executes one instruction at a time is an oversimplification. Modern CPUs use out-of-order execution, superscalar pipelines and branch prediction, meaning one core can process multiple instructions simultaneously at different stages (pipeline parallelism). A core handles one sequential instruction stream (thread), but internally a lot of parallel processing happens.</p>

      <h2 id="x86-vs-arm" style={S.h2}>x86 vs ARM — Server CPU Architectures</h2>
      <p style={S.p}><strong>x86 (Intel / AMD):</strong> Historically the dominant server architecture. Intel Xeon and AMD EPYC families. Complex Instruction Set Computing (CISC) — rich instruction set, high hardware complexity. Excellent software ecosystem — virtually all enterprise software is natively supported.</p>
      <p style={S.p}><strong>ARM-based servers:</strong> Growing significantly. AWS Graviton (used in Amazon data centers), Ampere Altra, NVIDIA Grace Hopper. Reduced Instruction Set Computing (RISC) — simpler instructions, often better performance-per-watt in certain workloads. Cloud providers offer ARM instances. Check software compatibility — some software requires ARM native binaries or needs performance tuning.</p>
      <p style={S.p}>Architecture choice depends on ecosystem, software support, workload characteristics and organizational standards. Specific performance comparisons are highly dependent on model, workload and configuration.</p>

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
      <p style={S.p}><strong>Socket:</strong> Physical CPU slot on the motherboard. A 1-socket (1S) server has one physical CPU. A 2-socket (2S) server has two physical CPUs on one motherboard — double the cores, double the memory channels, and NUMA is introduced. Socket type is specific to the CPU generation — the socket must match.</p>
      <p style={S.p}><strong>Core:</strong> Physical execution unit within the CPU. Each core can execute instructions independently. More cores = more parallel workloads simultaneously. Core count varies significantly by CPU model.</p>
      <p style={S.p}><strong>Thread (Hyperthreading/SMT):</strong> Intel Hyper-Threading Technology / AMD Simultaneous Multi-Threading (SMT) — one physical core's resources are shared between two logical threads. To the OS, one physical core appears as 2 logical processors. The benefit is workload-specific — more benefit in memory-bound or branch-heavy code; less in pure integer compute. SMT is enabled by default on most servers.</p>
      <Figure caption="Fig 1 — CPU topology (illustrative): socket → core → thread, plus NUMA showing local vs remote memory access in a 2-socket system."><CpuTopologyNuma /></Figure>
      <Callout type="important" title="NUMA Awareness Is Critical for Performance">
        Deploy workloads NUMA-aware on multi-socket servers. A VM or database process running on one NUMA node but accessing another node's RAM stays silently performance-degraded without any obvious error. Check NUMA topology in Linux with `numactl --hardware`. Use `numastat` to identify NUMA imbalance performance issues.
      </Callout>

      <h2 id="cache-hierarchy" style={S.h2}>Cache Hierarchy</h2>
      <p style={S.p}>CPU cache is temporary high-speed memory inside the CPU package. Accessing RAM is relatively slow — the cache keeps frequently used data close to the CPU. On a cache miss, the CPU fetches from RAM — a significant latency increase.</p>
      <Figure caption="Fig 2 — Memory hierarchy from L1 cache (fastest, smallest) down to storage (slowest, largest)."><CacheHierarchy /></Figure>
      <p style={S.p}><strong>L1 cache:</strong> Fastest, smallest capacity, per-core. Instruction cache and data cache are typically separate.</p>
      <p style={S.p}><strong>L2 cache:</strong> Larger than L1, per-core. L1 miss → L2 check.</p>
      <p style={S.p}><strong>L3 cache (Last Level Cache / LLC):</strong> Largest on-chip cache — shared by all cores. L2 miss → check L3. Server CPUs have significant L3 capacity — caching database buffer pools and frequently accessed working sets.</p>
      <p style={S.p}>Actual latency and capacity values depend on CPU architecture, generation and implementation — verify specific numbers from OEM technical documentation.</p>

      <h2 id="memory-channels" style={S.h2}>Memory Channels and Bandwidth</h2>
      <p style={S.p}>The CPU memory controller connects to RAM through memory channels. Multiple channels operate in parallel — bandwidth multiplies. Server CPUs support multiple memory channels — the specific count depends on model and generation.</p>
      <p style={S.p}><strong>Maximise bandwidth:</strong> Populate all available memory channels with identical DIMMs (symmetric population). Asymmetric population leaves some channels unused — bandwidth is sub-optimal. Follow OEM memory population guidelines exactly — the platform manual is the mandatory reference.</p>
      <p style={S.p}>Memory bandwidth matters differently for CPU-intensive vs memory-bandwidth-intensive workloads. Scientific computing, large dataset analytics and in-memory databases benefit significantly from memory bandwidth.</p>

      <h2 id="numa" style={S.h2}>NUMA — Non-Uniform Memory Access</h2>
      <p style={S.p}>In a 2-socket server, both CPUs need to access all the RAM. But in the physical architecture, some RAM is directly connected to CPU 0's memory controller and some to CPU 1's. CPU 0 accessing its own local RAM → fast. CPU 0 accessing CPU 1's RAM → it has to go through the CPU-to-CPU interconnect (Intel UPI / AMD Infinity Fabric) → higher latency, lower bandwidth.</p>
      <p style={S.p}><strong>NUMA nodes:</strong> Each socket and its directly-connected RAM form a NUMA node. In Linux, `numactl --hardware` shows node topology and distances. Lower NUMA distance = faster access.</p>
      <p style={S.p}><strong>Practical implications:</strong> Database workloads — pin to a NUMA node (numactl). VMs — assign vCPUs and vRAM on the same NUMA node. Application behaviour — NUMA-aware applications can optimise locality. The OS typically does NUMA-aware allocation by default — but large applications benefit from explicit configuration.</p>

      <h2 id="tdp-power" style={S.h2}>TDP and Power</h2>
      <p style={S.p}>TDP (Thermal Design Power) is a reference value in watts against which the cooling solution should be designed. It is an estimate of the CPU's heat dissipation under specific workload conditions. TDP is not a universal maximum power consumption figure — actual power depends on workload and configuration. In some scenarios TDP can be exceeded for brief periods (all-core turbo); in others, at idle load, power is significantly under it.</p>
      <p style={S.p}><strong>Data center relevance:</strong> Reference TDP figures in rack power budget planning. Cooling system design — heatsink, airflow — is based on TDP. After deployment, do actual power monitoring (BMC power readings, rack PDU monitoring) for accurate capacity planning.</p>
      <p style={S.p}>High-core-count, high-TDP CPUs can increase power per rack and cooling requirements. Consider performance per watt along with raw performance in CPU selection.</p>

      <h2 id="virtualisation-ext" style={S.h2}>Hardware Virtualisation Extensions</h2>
      <p style={S.p}><strong>Intel VT-x (Virtualisation Technology for x86) / AMD-V (AMD Virtualisation):</strong> Hardware features that allow hypervisors to run VMs efficiently. Much better performance than software-only virtualisation. Standard in modern server CPUs — typically enabled by default in UEFI. Required to run a hypervisor (VMware ESXi, Hyper-V, KVM).</p>
      <p style={S.p}><strong>Intel VT-d / AMD-Vi (IOMMU):</strong> I/O virtualisation — allows devices to be passed through directly to VMs without hypervisor overhead (PCIe passthrough). Also used for GPU passthrough. Typically needs to be enabled in UEFI.</p>
      <p style={S.p}><strong>EPT (Extended Page Tables) / AMD RVI (Rapid Virtualisation Indexing):</strong> Hardware-accelerated memory address translation for VMs — less overhead from software TLB management. Improves VM memory performance.</p>

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
      <p style={S.p}>Socket selection: 1S is simpler, lower cost — small-to-medium workloads. 2S doubles resources but brings NUMA considerations. More sockets — specialized requirements, higher complexity and cost. Fit the workload into the minimum required socket count.</p>

      <h2 id="cpu-in-virtualisation" style={S.h2}>CPU in Virtualisation</h2>
      <p style={S.p}><strong>vCPU:</strong> The hypervisor presents virtual CPU cores to a VM. vCPUs are scheduled on physical CPU threads. A VM with 8 vCPUs → the hypervisor uses/schedules 8 physical threads.</p>
      <p style={S.p}><strong>CPU overcommit:</strong> Assigning more vCPUs than physical threads. It works because not all VMs peak simultaneously. Risk: all VMs under heavy load simultaneously → waiting in the CPU ready queue → performance degradation. Monitor the overcommit ratio carefully.</p>
      <p style={S.p}><strong>NUMA in VMs:</strong> A VM's vCPUs and vRAM should ideally be on the same physical NUMA node — the hypervisor typically manages this, but large VMs benefit from explicit configuration. The hypervisor also exposes NUMA topology to the VM.</p>
      <p style={S.p}><strong>EVC (Enhanced vMotion Compatibility) — VMware:</strong> Masks feature differences between CPUs for live migration. If CPU feature sets differ, enable EVC mode at the cluster level. Other hypervisors have a similar feature for this concept as well.</p>

      <h2 id="troubleshooting" style={S.h2}>CPU Troubleshooting</h2>
      <h3 style={S.h3}>High CPU Utilization</h3>
      <p style={S.p}>`top` or `htop` in Linux — per-core utilization. Which processes? `ps aux --sort=-%cpu`. Is it a spike or sustained? All cores or a single core? Single core at 100% = single-threaded bottleneck — a software issue that hardware will not solve.</p>
      <h3 style={S.h3}>CPU Steal (Virtualised)</h3>
      <p style={S.p}>`%st` in top — the physical host is busy with other VMs. High steal = overcommitted host. Migrate the workload or add host capacity. Track CPU steal in monitoring and establish a baseline.</p>
      <h3 style={S.h3}>Thermal Issues / Throttling</h3>
      <p style={S.p}>Check BMC temperature readings. Are fan speeds normal? Is airflow adequate? Is the heatsink properly seated? Check for CPU frequency drops (performance mode disabled? Power capping?). The CPU thermally throttles to prevent damage — fix the root cause.</p>
      <h3 style={S.h3}>NUMA Performance Issues</h3>
      <p style={S.p}>`numastat` — NUMA miss rate. High remote memory access rate. Pin the workload to a NUMA node (`numactl`). If VMs are large, check NUMA topology from the hypervisor.</p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: What is NUMA and how does it impact performance?</h3>
      <p style={S.p}><strong>Answer:</strong> In a multi-socket server, each CPU (socket) has directly-connected local RAM — forming a NUMA node. When a CPU accesses its own local RAM, it is fast. To access another CPU's RAM, it has to go through the CPU-to-CPU interconnect — higher latency. NUMA-unaware workload placement can silently degrade performance. `numactl --hardware` shows the topology, `numastat` the miss rates.</p>
      <h3 style={S.h3}>Q2: What is TDP — is it the CPU's maximum power consumption?</h3>
      <p style={S.p}><strong>Answer:</strong> TDP (Thermal Design Power) is a reference value against which the cooling system should be designed — a heat dissipation estimate under specific load conditions. It is not a universal maximum power figure — actual power varies with workload. At idle it is significantly under TDP, and in some all-core turbo scenarios it can briefly exceed it. Use it as a reference for cooling design and rack power budgeting, not as an exact maximum power figure.</p>
      <h3 style={S.h3}>Q3: What is Intel VT-x / AMD-V and why is it essential?</h3>
      <p style={S.p}><strong>Answer:</strong> They are hardware virtualisation extensions — they allow hypervisors to run VMs efficiently. Without hardware support, software-only virtualisation would be much slower. It is a standard feature in modern server CPUs. VMware ESXi, Hyper-V, KVM — all require it. It must be enabled in UEFI (typically the default).</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>CPU topology: Socket → Core → Thread. SMT/Hyperthreading presents 2 logical threads on one core.</li>
        <li>Cache hierarchy: L1 (fastest, per-core) → L2 (per-core) → L3 (shared) → RAM. On a cache miss, latency increases significantly.</li>
        <li>NUMA is critical in multi-socket servers — local vs remote memory access meaningfully affects performance.</li>
        <li>TDP is a cooling reference value — not a universal maximum power figure. Actual power depends on workload.</li>
        <li>Intel VT-x / AMD-V are hardware requirements for virtualisation — standard in server CPUs.</li>
        <li>CPU selection: single-threaded workloads = clock speed priority; parallel = core count priority; workload-specific benchmarking best approach.</li>
        <li>x86 (Intel Xeon/AMD EPYC) is dominant, ARM-based servers (Graviton, Ampere) are growing — check software compatibility.</li>
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
