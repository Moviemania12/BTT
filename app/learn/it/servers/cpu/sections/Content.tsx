"use client";
import { S, Callout, ComparisonTable, Figure, CodeBlock, DiagramGuide } from "../shared";
import TopicLink from "@/components/TopicLink";
import CpuInstructionCycle from "../svg/CpuInstructionCycle";
import CpuPackageAnatomy from "../svg/CpuPackageAnatomy";
import CpuTopologyNuma from "../svg/CpuTopologyNuma";
import CpuTurboCurve from "../svg/CpuTurboCurve";
import CacheHierarchy from "../svg/CacheHierarchy";
import CpuVcpuScheduling from "../svg/CpuVcpuScheduling";
import CpuSelectionFlow from "../svg/CpuSelectionFlow";
import CpuThrottleFlow from "../svg/CpuThrottleFlow";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      {/* Quick Summary */}
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — Server CPU in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>What it is:</strong> The CPU is the server's compute engine. It runs every instruction of the OS, hypervisor and applications.</li>
          <li><strong>Hierarchy:</strong> Socket (physical chip) → Core (execution unit) → Thread (logical CPU via SMT). A 2-socket server with 2 × 32 cores and SMT shows 128 logical CPUs to the OS.</li>
          <li><strong>Speed has three parts:</strong> Clock × IPC (work per clock) × number of busy cores. Turbo changes the clock depending on how many cores are busy and how much power/thermal headroom exists.</li>
          <li><strong>Cache:</strong> L1 → L2 → L3 → RAM. Every step down is much slower. A good cache hit rate matters more than raw GHz for many databases.</li>
          <li><strong>Memory and I/O:</strong> Each CPU has its own memory channels and PCIe lanes. Total RAM bandwidth and NIC/NVMe/GPU lane budget are limited by the CPU, not the chassis.</li>
          <li><strong>NUMA:</strong> In a 2-socket server, RAM attached to the other socket is slower. NUMA-unaware placement silently loses performance.</li>
          <li><strong>Power:</strong> TDP is a cooling reference, not a maximum. 40 servers × 2 CPUs × 350 W is 28 kW from CPUs alone — rack power is often the first limit.</li>
          <li><strong>Virtualisation:</strong> A vCPU is only a scheduled slice of a hardware thread. Overcommit is useful but must be watched via %RDY / steal.</li>
          <li><strong>Engineer's work:</strong> Choose the right SKU, set the right BIOS profile, watch temperature/frequency/MCE logs, replace parts carefully and keep CPUs in a cluster compatible.</li>
          <li><strong>Tier III / IV view:</strong> The tier rating belongs to the site, but CPU power density, thermal limits and fault-domain placement decide whether the design really works.</li>
        </ul>
      </div>

      {/* ══════════ 1. WHAT IS A CPU ══════════ */}
      <h2 id="what-is-a-cpu" style={S.h2}>What Is a CPU? — Instruction Cycle and Pipeline</h2>
      <p style={S.p}>The CPU (Central Processing Unit) is the part of a <TopicLink slug="server-basics" variant="inline" /> that actually thinks. Everything else — RAM, disks, network cards — stores or moves data. The CPU is the one that processes it.</p>
      <p style={S.p}>Every action you see — a web page loading, a database query, a UPI payment — becomes a long list of tiny instructions. The CPU runs those instructions billions of times per second.</p>
      <h3 style={S.h3}>The instruction cycle</h3>
      <p style={S.p}>Each instruction goes through a few stages. First <strong>fetch</strong>: the CPU reads the next instruction from cache or memory. Then <strong>decode</strong>: it splits the instruction into small internal steps called micro-ops.</p>
      <p style={S.p}>Then <strong>execute</strong>: an arithmetic, floating-point or vector unit does the work. If data is needed, the <strong>memory</strong> stage loads or stores it. Finally <strong>write-back</strong> saves the result into a register.</p>
      <h3 style={S.h3}>Pipeline — why a core is faster than it looks</h3>
      <p style={S.p}>If a core waited for one instruction to finish all five stages before starting the next, most of the hardware would sit idle. So CPUs use a <strong>pipeline</strong>: while instruction 1 is executing, instruction 2 is being decoded and instruction 3 is being fetched.</p>
      <p style={S.p}>Modern cores go further. They are <strong>superscalar</strong> (several instructions per clock), <strong>out-of-order</strong> (a ready instruction can jump ahead of one that is waiting for data) and use a <strong>branch predictor</strong> (they guess which way an if-else will go and keep working instead of waiting).</p>
      <Figure caption="Fig 1 — Instruction cycle (top) and pipeline overlap (bottom). Simplified — real server cores have deeper pipelines, multiple execution units and a micro-op cache."><CpuInstructionCycle /></Figure>
      <DiagramGuide
        title="How to read Fig 1"
        steps={[
          "Top row, left to right: one instruction moves through Fetch → Decode → Execute → Memory → Write-back. Each coloured box is one stage.",
          "The grey strip below it names two tricks that keep the pipeline full: the branch predictor (guesses the next path) and the out-of-order engine (runs whichever instruction is ready first).",
          "Bottom half is a timeline. Each column is one clock cycle. Each row is a different instruction. Letters F, D, E, M, W are the stages.",
          "Look at cycle 3 (the vertical slice): Instruction 1 is in Execute, Instruction 2 in Decode and Instruction 3 in Fetch — all at the same moment. That is pipeline parallelism.",
          "Why it matters: a core finishes close to one instruction per cycle (or more) even though each instruction takes 5+ cycles end to end. When the pipeline stalls — a cache miss or a wrongly guessed branch — that throughput is lost.",
        ]}
      />
      <Callout type="important" title="Stalls are the real enemy">
        A fast CPU is not just a high GHz number. If the pipeline keeps waiting for data from RAM or recovering from a wrong branch guess, the core is "busy" but not productive. This is why cache size, memory speed and software behaviour matter so much.
      </Callout>
      <p style={S.p}>A key idea for the rest of this article: the OS sees <strong>one thread of instructions</strong> on a core, but inside, the core is running many instructions in parallel. That is why "one instruction at a time" is a wrong picture of a modern CPU.</p>

      {/* ══════════ 2. PACKAGE INSIDE ══════════ */}
      <h2 id="cpu-package-inside" style={S.h2}>Inside a CPU Package: Cores, Cache, Memory Controller, PCIe</h2>
      <p style={S.p}>When you hold a server CPU, you see a large square with gold contacts or pins. Inside that package there is much more than "cores".</p>
      <p style={S.p}>A server CPU package typically contains: <strong>cores</strong> with their private L1/L2 cache, a <strong>shared L3 cache</strong>, <strong>memory controllers</strong> that talk to the DIMMs, a <strong>PCIe root complex</strong> that talks to NICs, NVMe drives and GPUs, and an <strong>interconnect</strong> that links this CPU to the other socket.</p>
      <p style={S.p}>This matters because memory and PCIe are <strong>attached to the CPU</strong>, not to a separate northbridge chip like old systems. If a server has two CPUs, it has two sets of memory channels and two sets of PCIe lanes.</p>
      <h3 style={S.h3}>Monolithic vs chiplet</h3>
      <p style={S.p}>In a <strong>monolithic</strong> design, everything is on one large silicon die. Core-to-core communication is fast and uniform. The downside: a huge die is hard to manufacture without defects, so yield drops and cost rises.</p>
      <p style={S.p}>In a <strong>chiplet</strong> design, several small core dies (and an I/O die) are joined inside one package. Small dies yield better, so vendors can offer many more cores per socket. The trade-off is that a hop between dies can add latency, which makes cache and NUMA behaviour a bit more complex.</p>
      <Figure caption="Fig 2 — Conceptual layout of a server CPU package: monolithic die versus chiplet design. Actual die counts, cache sizes and floor-plans differ by vendor, generation and SKU."><CpuPackageAnatomy /></Figure>
      <DiagramGuide
        title="How to read Fig 2"
        steps={[
          "Left box (A) is a monolithic CPU. Blue cells are cores (each with private L1/L2). The amber block is the shared L3. The three boxes at the bottom are the memory controller, PCIe root complex and socket interconnect.",
          "Notice everything sits inside one dashed blue outline — one die. A request from any core to L3 or memory travels a short, fairly uniform path.",
          "Right box (B) is a chiplet CPU. The four upper blocks are core-complex dies, each with its own cores and an L3 slice. The orange block at the bottom is a separate I/O die.",
          "The dotted lines between the core dies and the I/O die are the die-to-die links. Every memory or PCIe access from a core die crosses this link.",
          "What to take away: both approaches have the same logical parts. Chiplets give more cores per socket and better manufacturing yield; monolithic gives simpler, uniform latency. As an engineer, you should know which style your CPU is because it affects NUMA settings and cache behaviour.",
        ]}
      />
      <Callout type="important" title="Why DC engineers care">
        When you plan a server, the <strong>CPU model decides</strong> how many DIMM channels, how much maximum RAM and how many PCIe lanes you get. Choosing a cheaper CPU can silently cap your NIC or NVMe options. Always read the CPU's platform datasheet, not just the server brochure.
      </Callout>

      {/* ══════════ 3. x86 vs ARM ══════════ */}
      <h2 id="x86-vs-arm" style={S.h2}>x86 vs ARM — Server CPU Architectures</h2>
      <p style={S.p}>An <strong>instruction set architecture (ISA)</strong> is the "language" a CPU understands. Software compiled for one ISA does not run directly on another.</p>
      <p style={S.p}><strong>x86-64 (Intel and AMD)</strong> has dominated servers for decades. Almost every enterprise application, hypervisor and driver supports it natively. This is the safe default in most data centers.</p>
      <p style={S.p}><strong>ARM</strong> is a different ISA with a simpler instruction design. ARM server chips (AWS Graviton, Ampere, NVIDIA Grace and others) often target high core counts with good performance per watt. Hyperscale cloud providers use them heavily; enterprise adoption is growing.</p>
      <ComparisonTable
        title="x86 vs ARM in Data Centers"
        headers={["Aspect", "x86-64 (Intel / AMD)", "ARM-based server"]}
        rows={[
          ["Software ecosystem", "Widest — nearly every enterprise product", "Growing — Linux/containers strong; some commercial software missing or needs ARM builds"],
          ["Typical strength", "High per-core speed, rich feature set, wide OEM choice", "Core density and performance per watt (workload dependent)"],
          ["Virtualisation", "Mature (VMware, Hyper-V, KVM)", "Mostly KVM-based/cloud; VMware/Hyper-V support depends on product and version"],
          ["Migration effort", "Lowest — most existing images run as-is", "Need ARM64 images/binaries; test every dependency"],
          ["Where seen", "Enterprise, colocation, private cloud", "Hyperscale cloud, web/microservices, increasingly AI host CPUs"],
        ]}
        caption="Generalisation only. Compatibility and performance depend on the exact product, version and workload — verify before deciding."
      />
      <Callout type="common-mistake" title="Container image mismatch">
        A team builds a container on an x86 laptop and deploys it on an ARM node: it fails with an "exec format error". In multi-arch environments build multi-architecture images and label node pools clearly.
      </Callout>

      {/* ══════════ 4. SERVER vs CONSUMER ══════════ */}
      <h2 id="server-vs-consumer" style={S.h2}>Server CPU vs Consumer CPU</h2>
      <p style={S.p}>A desktop CPU and a server CPU may share an ancestor, but they are designed for different lives. The desktop CPU should be fast for one user for a few hours a day. The server CPU should run at high load for years, with many users and many VMs.</p>
      <ComparisonTable
        title="Server CPU vs Consumer CPU"
        headers={["Feature", "Server CPU (Xeon / EPYC class)", "Consumer CPU (Core / Ryzen class)"]}
        rows={[
          ["Multi-socket", "Supported (2S common; 4S/8S on select platforms)", "Single socket only"],
          ["Memory channels", "Many (8–12 per socket on recent platforms)", "Usually 2"],
          ["Max RAM", "Terabytes per socket on recent platforms", "Tens to a couple of hundred GB"],
          ["ECC memory", "Supported — part of the platform design", "Limited / not guaranteed"],
          ["PCIe lanes", "Dozens to 128+ per socket", "Around 20–28"],
          ["RAS features", "Machine-check architecture, memory sparing/mirroring, poison handling", "Basic"],
          ["Core count", "Tens to 100+ cores per socket", "Fewer cores"],
          ["Lifecycle", "Longer availability and validation for platforms", "Short consumer release cycle"],
          ["Manageability", "Works with BMC, platform telemetry, remote tools", "Limited"],
        ]}
        caption="Specific capabilities depend on model, generation and platform. Always verify with the vendor datasheet."
      />
      <p style={S.p}>Why use a consumer CPU in a server? Occasionally it is done for small edge or lab setups. For production in a data center, the missing RAS, ECC and memory capacity usually make it a poor trade.</p>

      {/* ══════════ 5. VENDORS ══════════ */}
      <h2 id="cpu-vendors-families" style={S.h2}>Server CPU Families and Vendors</h2>
      <p style={S.p}>You do not need to memorise part numbers, but you should recognise the main families and what each is known for. Product lines move fast — always check the vendor's current generation list.</p>
      <ComparisonTable
        title="Common Server CPU Families (as generally known — verify current generation)"
        headers={["Family", "Architecture", "Known for"]}
        rows={[
          ["Intel Xeon Scalable (several generations)", "x86-64", "Wide ecosystem, built-in accelerators (e.g., AMX, QAT, DSA on recent generations), 1S–8S options; recent Xeon 6 line offers P-core and E-core variants"],
          ["AMD EPYC (Zen-based, 9004/9005 class and others)", "x86-64, chiplet", "High core counts, many memory channels and PCIe lanes per socket, strong performance per socket"],
          ["Ampere Altra / AmpereOne", "ARM", "High core density, predictable per-core performance, cloud-native workloads"],
          ["AWS Graviton", "ARM (Neoverse-based)", "Available inside AWS — you rent it, not buy it"],
          ["NVIDIA Grace", "ARM (Neoverse-based)", "Paired with GPUs (Grace-Hopper / Grace-Blackwell) for AI; high bandwidth link to GPU"],
        ]}
        caption="High-level overview. Model names, core counts and features change every generation — verify from the vendor's current documentation."
      />
      <Callout type="best-practice" title="Standardise SKUs">
        In production, fewer CPU models is better. A cluster with 3 different CPU generations needs EVC/baseline compatibility settings, complicates firmware and spares, and makes performance unpredictable. Pick one or two approved SKUs per workload class.
      </Callout>

      {/* ══════════ 6. TOPOLOGY ══════════ */}
      <h2 id="cpu-topology" style={S.h2}>CPU Topology: Socket → Core → Thread</h2>
      <p style={S.p}><strong>Socket:</strong> The physical slot on the motherboard that holds one CPU package. A 1S server has one; a 2S server has two. Socket type (e.g., LGA) must match the CPU generation exactly.</p>
      <p style={S.p}><strong>Core:</strong> An independent execution engine inside the CPU. Each core can run its own instruction stream.</p>
      <p style={S.p}><strong>Thread (logical processor):</strong> With SMT/Hyper-Threading, one physical core presents two logical processors to the OS. They share the core's execution resources.</p>
      <p style={S.p}>The numbers multiply. Example: a 2-socket server with 32 cores per socket and SMT on shows 2 × 32 × 2 = <strong>128 logical CPUs</strong> to Linux. But there are only 64 physical cores.</p>
      <CodeBlock lang="bash" label="Linux — see your CPU topology">
{`lscpu                      # sockets, cores per socket, threads per core, NUMA nodes, cache sizes
lscpu -e                   # per-logical-CPU table: which core/socket/NUMA node
numactl --hardware         # NUMA nodes, memory per node and distances
cat /proc/cpuinfo | grep "model name" | sort -u`}
      </CodeBlock>
      <Figure caption="Fig 3 — CPU topology (illustrative): socket → core → thread, shared L3, memory controllers with local RAM per NUMA node, and the CPU-to-CPU interconnect."><CpuTopologyNuma /></Figure>
      <DiagramGuide
        title="How to read Fig 3"
        steps={[
          "Find the two big boxes: Socket 0 and Socket 1. Each is one physical CPU in one motherboard socket.",
          "Inside each socket, the small blocks are cores. Each core shows two threads (logical CPUs) because SMT is on, and its private L1/L2 cache.",
          "The wide bar under the cores in each socket is the shared L3 cache. Any core in that socket can use it, which is why threads of one application should preferably stay on the same socket.",
          "From each socket a memory controller leads down to its own RAM. Socket 0 plus its RAM is NUMA node 0; Socket 1 plus its RAM is NUMA node 1.",
          "The line between the two sockets is the CPU-to-CPU interconnect (Intel UPI / AMD Infinity Fabric class link). A core reading its own RAM takes the short, fast path. Reading the other socket's RAM must cross this link — slower and shared by everyone.",
          "Take away: 'local = fast, remote = slow'. The rest of the NUMA section builds on this picture.",
        ]}
      />
      <Callout type="interview" title="Quick check">
        Q: A 2S server has 48 cores per CPU with SMT enabled. How many logical processors does the OS see? A: 2 × 48 × 2 = 192. And it has 96 physical cores — do not size per-core software licences using the logical count.
      </Callout>

      {/* ══════════ 7. CLOCK / TURBO ══════════ */}
      <h2 id="clock-turbo" style={S.h2}>Clock Speed, Turbo and Power States</h2>
      <p style={S.p}>People compare CPUs by GHz. That is only one third of the picture. Delivered performance is roughly: <strong>clock × IPC × number of busy cores</strong>. IPC means instructions per clock — how much work the core finishes each tick, and it improves with each new generation.</p>
      <p style={S.p}>So a newer 2.5 GHz CPU can beat an older 3.0 GHz one. And a 64-core CPU at 2.4 GHz can beat a 16-core CPU at 3.8 GHz on parallel work, while losing on a single-threaded job.</p>
      <h3 style={S.h3}>Base, turbo and all-core turbo</h3>
      <p style={S.p}><strong>Base frequency</strong> is the speed the vendor guarantees at rated power with all cores busy. <strong>Turbo</strong> lets some cores run faster when there is spare power and thermal room. The more cores are busy, the less turbo each can get, because the power budget is shared.</p>
      <p style={S.p}>For capacity planning, use the <strong>all-core turbo</strong> (sustained heavy load) number, not the maximum single-core turbo from the brochure.</p>
      <Figure caption="Fig 4 — Illustrative turbo curve: frequency falls as more cores become active. Real values depend on SKU, BIOS profile, power limit and cooling."><CpuTurboCurve /></Figure>
      <DiagramGuide
        title="How to read Fig 4"
        steps={[
          "Horizontal axis: how many cores are busy, from 1 core on the left to all cores on the right. Vertical axis: frequency.",
          "The blue line starts high on the left: with only one or two cores busy, the CPU has lots of power and thermal headroom, so those cores can run at maximum turbo.",
          "Moving right, more cores wake up and the same power budget is shared. The line steps down — medium-load turbo.",
          "On the far right, with every core busy, the line settles near the all-core turbo, which is still above the green dashed base-frequency line.",
          "The green dashed line is the base frequency — the guaranteed floor at rated power. If your server runs below this line under load, something is wrong (thermal throttle, power cap or a BIOS setting).",
          "Take away: a single-thread benchmark will look great; a fully loaded node will not. Plan with the right-hand end of the curve.",
        ]}
      />
      <h3 style={S.h3}>Power states: P-states and C-states</h3>
      <p style={S.p}><strong>P-states</strong> are performance states: different frequency/voltage pairs the CPU moves between. <strong>C-states</strong> are idle states: deeper C-states switch off more of the core to save power, but wake-up takes longer.</p>
      <p style={S.p}>For most servers, the BIOS "balanced / OS-controlled" profile is fine. For ultra-low-latency workloads (trading, telecom) engineers sometimes limit deep C-states and use a performance profile — it costs power but removes wake-up jitter. This must be a deliberate, documented choice.</p>
      <CodeBlock lang="bash" label="Linux — watch real frequency and power state">
{`cpupower frequency-info              # driver, governor, min/max frequency
sudo turbostat --quiet --interval 5  # per-core MHz, C-state residency, package power, temperature
grep MHz /proc/cpuinfo | sort -u | head`}
      </CodeBlock>

      {/* ══════════ 8. SMT ══════════ */}
      <h2 id="smt" style={S.h2}>SMT / Hyper-Threading in Depth</h2>
      <p style={S.p}>With SMT, a core keeps two thread contexts. When one thread stalls on memory, the other can use the idle execution units. It improves utilisation of the core — it does <strong>not</strong> double performance.</p>
      <p style={S.p}>Typical gain is workload dependent: good for web servers, many VMs and memory-bound code; small for tight, compute-heavy loops that already use all execution units. Do not quote a fixed percentage.</p>
      <ComparisonTable
        title="SMT: When to Keep It On, When to Think Twice"
        headers={["Situation", "Suggested approach", "Reason"]}
        rows={[
          ["General virtualisation / web / app servers", "Keep SMT on", "More schedulable threads, better utilisation"],
          ["Per-core licensed software (DB, ERP)", "Check licence terms first", "Some vendors count cores, some count threads — a licence audit can be costly"],
          ["Ultra-low-latency / HPC tight loops", "Test both; often off or pinned", "Sibling thread can cause jitter or cache contention"],
          ["Multi-tenant (different customers on one host)", "Follow security policy", "Side-channel attacks have used SMT siblings; some environments disable SMT or use core scheduling"],
        ]}
        caption="Decide by testing on your own workload and following your organisation's security policy."
      />

      {/* ══════════ 9. CACHE ══════════ */}
      <h2 id="cache-hierarchy" style={S.h2}>Cache Hierarchy</h2>
      <p style={S.p}>RAM is slow compared with a CPU core. If the core had to wait for RAM on every instruction, it would idle most of the time. So the CPU keeps recently used data in small, very fast memory <strong>inside the package</strong> — the cache.</p>
      <p style={S.p}>Think of it like a chef's kitchen. L1 is the cutting board in front of you. L2 is the shelf behind you. L3 is the shared fridge for the whole kitchen. RAM is the store room down the corridor. Storage is the warehouse in another city.</p>
      <Figure caption="Fig 5 — Memory hierarchy from L1 cache (fastest, smallest) to storage (slowest, largest). Every step down adds latency and adds capacity."><CacheHierarchy /></Figure>
      <DiagramGuide
        title="How to read Fig 5"
        steps={[
          "Read the pyramid from top to bottom. The top (L1) is narrow = small capacity but fastest. The bottom (storage) is wide = huge capacity but slowest.",
          "L1 and L2 sit inside each core. L3 is shared by all cores in the socket. RAM and storage are outside the CPU package.",
          "The arrows on the left (FASTER / SMALLER at top, SLOWER / LARGER at bottom) are the whole lesson: you cannot have big and fast together, so hardware layers them.",
          "When the CPU needs data it checks L1 first, then L2, then L3, then RAM. Finding it early is a 'hit'; going down a level is a 'miss'.",
          "Real-life impact: a database whose hot data fits in L3 flies. The same database with a working set that spills to RAM (or worse, to disk) slows down sharply even though the CPU is 'only' 30% busy.",
        ]}
      />
      <ComparisonTable
        title="Order-of-Magnitude Access Times (illustrative)"
        headers={["Level", "Typical scale", "Analogy (if L1 = 1 second)"]}
        rows={[
          ["L1 cache", "~1 ns (a few cycles)", "1 second"],
          ["L2 cache", "~3–5 ns", "~4 seconds"],
          ["L3 cache", "~10–40 ns (depends on design)", "~20 seconds"],
          ["Local RAM", "~80–120 ns", "~2 minutes"],
          ["Remote NUMA RAM", "~130–250 ns", "~3–4 minutes"],
          ["NVMe SSD", "~10–100 µs", "~3 hours to a day"],
          ["Network / SAN storage", "~100 µs to ms", "days"],
        ]}
        caption="Ballpark figures only. Exact latency varies by CPU architecture, clock, memory type and load. Use vendor documentation for real numbers."
      />
      <p style={S.p}>Data moves between cache and RAM in blocks called <strong>cache lines</strong> (commonly 64 bytes). If your code reads one byte, the CPU fetches 64. Software that walks memory in order (arrays) is cache friendly; software that jumps randomly (pointer chasing) is not.</p>
      <p style={S.p}>Two more terms you will hear: <strong>inclusive vs non-inclusive/victim L3</strong> (does L3 keep copies of L1/L2 data or only evicted lines) and <strong>cache coherency</strong> (hardware keeps every core's view of memory consistent). Coherency traffic between sockets is one reason cross-socket sharing is costly.</p>
      <Callout type="important" title="Why EPYC-style big L3 or '3D V-Cache' SKUs exist">
        Some workloads — EDA, large databases, simulations — are limited by cache misses. A SKU with more L3 can beat a higher-clocked SKU with less. This is why you benchmark with your workload instead of choosing by GHz.
      </Callout>

      {/* ══════════ 10. MEMORY CHANNELS ══════════ */}
      <h2 id="memory-channels" style={S.h2}>Memory Channels and Bandwidth</h2>
      <p style={S.p}>The memory controller inside the CPU talks to DIMMs through <strong>channels</strong>. Each channel is an independent data path. Channels work in parallel, so bandwidth multiplies with the number of channels you populate.</p>
      <p style={S.p}>Quick bandwidth formula: <strong>transfer rate (MT/s) × 8 bytes per transfer × channels</strong>. Real-world achieved bandwidth is lower than this theoretical peak.</p>
      <ComparisonTable
        title="Theoretical Peak Memory Bandwidth (per socket)"
        headers={["Memory type", "Per channel", "8 channels", "12 channels"]}
        rows={[
          ["DDR4-3200", "25.6 GB/s", "204.8 GB/s", "—"],
          ["DDR5-4800", "38.4 GB/s", "307.2 GB/s", "460.8 GB/s"],
          ["DDR5-5600", "44.8 GB/s", "358.4 GB/s", "537.6 GB/s"],
        ]}
        caption="Peak = MT/s × 8 bytes × channels. Real throughput is lower. Supported speeds depend on CPU, DIMMs per channel and platform — check the OEM's memory population guide."
      />
      <h3 style={S.h3}>Population rules that engineers must follow</h3>
      <p style={S.p}>Use <strong>all channels</strong>, with <strong>identical DIMMs</strong> (same size, speed, rank) per channel, in the slots the OEM manual specifies. Half-populated channels = half bandwidth.</p>
      <p style={S.p}>Using 2 DIMMs per channel (2DPC) usually allows more capacity but may lower the supported memory speed. Mixed DIMM sizes can force a slower speed or unbalanced interleave. Always follow the platform's population chart.</p>
      <Callout type="common-mistake" title="'We have 512 GB, why is it slow?'">
        A 2-socket server has 2 × 8 = 16 memory channels, but only 8 large DIMMs were installed — so half the channels were empty. Capacity looked right, but bandwidth-heavy workloads ran at about half the possible speed. Capacity and channel count are different things. See <TopicLink slug="ram" variant="inline" /> for DIMM layouts.
      </Callout>

      {/* ══════════ 11. PCIe ══════════ */}
      <h2 id="pcie-lanes" style={S.h2}>PCIe Lanes — The I/O Budget</h2>
      <p style={S.p}>NICs, NVMe SSDs, GPUs, RAID/HBA cards and DPUs all connect over <strong>PCIe lanes</strong>. These lanes come out of the CPU (and a little from the chipset on some platforms). The CPU model sets the total number.</p>
      <p style={S.p}>Each lane carries data in each direction. Approximate usable speed per lane per direction: Gen3 ≈ 0.98 GB/s, Gen4 ≈ 1.97 GB/s, Gen5 ≈ 3.94 GB/s. An x16 slot is 16 lanes, so a Gen5 x16 slot is roughly 63 GB/s each way.</p>
      <ComparisonTable
        title="Example Lane Budget — one socket with 128 PCIe Gen5 lanes (illustrative)"
        headers={["Device", "Lanes each", "Count", "Lanes used"]}
        rows={[
          ["400G NIC (x16)", "16", "1", "16"],
          ["GPU / accelerator (x16)", "16", "4", "64"],
          ["NVMe SSD (x4)", "4", "6", "24"],
          ["Boot / management / other", "—", "—", "8"],
          ["Total", "", "", "112 of 128 — 16 lanes spare"],
        ]}
        caption="Example only. Actual lane count, bifurcation options and slot wiring are defined by CPU and motherboard — always check the server's PCIe riser map."
      />
      <p style={S.p}>In a 2S server, a slot belongs to <strong>one socket</strong>. If a NIC is wired to socket 1 and your application runs on socket 0, every packet's data crosses the interconnect. This is called <strong>PCIe NUMA locality</strong>. For high-speed NICs and GPUs, bind the workload to the socket that owns the device.</p>
      <CodeBlock lang="bash" label="Linux — which NUMA node owns this device?">
{`cat /sys/class/net/eth0/device/numa_node     # NIC's NUMA node (-1 = unknown/single)
lspci -vv -s <bus:dev.fn> | grep -E "LnkCap|LnkSta"   # negotiated link speed and width
lstopo --no-io   # (hwloc) topology view`}
      </CodeBlock>
      <Callout type="warning" title="Negotiated link is often lower than expected">
        A Gen5 x16 card in a Gen4 slot, or an x16 card running at x8 because of a damaged riser or dirty contacts, silently halves bandwidth. Always read <em>LnkSta</em> during commissioning.
      </Callout>

      {/* ══════════ 12. NUMA ══════════ */}
      <h2 id="numa" style={S.h2}>NUMA — Non-Uniform Memory Access</h2>
      <p style={S.p}>In a 2-socket server both CPUs can reach all the RAM. But each DIMM is wired to <strong>one</strong> CPU's memory controller. Access to your own socket's DIMMs is local and fast. Access to the other socket's DIMMs goes through the interconnect and is slower.</p>
      <p style={S.p}>Each socket plus its attached RAM (and PCIe devices) forms a <strong>NUMA node</strong>. Linux reports a "distance" between nodes; a larger number means slower access (for example 10 for local, 21 for remote on many Intel systems).</p>
      <p style={S.p}>NUMA becomes sneaky because nothing breaks. A VM or database that uses the wrong node simply runs 20–40% slower in some cases, with no alarm. Many "mystery slowness" tickets are NUMA.</p>
      <CodeBlock lang="bash" label="Linux — measure and control NUMA">
{`numactl --hardware             # nodes, memory per node, distances
numastat                       # numa_hit / numa_miss / other_node counters
numastat -p <pid>              # memory of one process per node
numactl --cpunodebind=0 --membind=0 ./app    # run app on node 0 with node-0 memory
lscpu | grep -i numa`}
      </CodeBlock>
      <h3 style={S.h3}>Sub-NUMA modes inside one socket</h3>
      <p style={S.p}>Big chiplet or multi-tile CPUs can themselves behave like several NUMA domains. BIOS options such as <strong>Sub-NUMA Clustering (SNC)</strong> on Intel or <strong>NPS (NUMA nodes per socket)</strong> on AMD split one socket into 2 or 4 nodes. This lowers memory latency for well-pinned software but needs NUMA-aware placement.</p>
      <p style={S.p}>For general virtualisation clusters, the default is usually best. Change these only after testing the workload and documenting the setting as part of the build standard.</p>
      <Callout type="best-practice" title="NUMA rules of thumb">
        Keep a VM's vCPUs and memory within one NUMA node if the VM fits. Size big VMs as multiples of a node. Put NIC- and GPU-heavy apps on the socket that owns the device. Check <em>numastat</em> after changes — don't assume.
      </Callout>

      {/* ══════════ 13. RAS ══════════ */}
      <h2 id="ras-reliability" style={S.h2}>RAS and Hardware Error Handling</h2>
      <p style={S.p}>RAS means <strong>Reliability, Availability, Serviceability</strong>. It is what separates a server CPU platform from a desktop one. Hardware can detect, correct and report errors before they turn into outages.</p>
      <h3 style={S.h3}>How an error is handled</h3>
      <p style={S.p}>The CPU and memory use ECC codes. A <strong>correctable error (CE)</strong> is fixed on the fly and logged. An <strong>uncorrectable error (UCE)</strong> cannot be fixed. If it hits data in use, the hardware raises a <strong>Machine Check Exception (MCE)</strong>; the OS may kill the affected process, or — if the kernel's own memory is affected — panic or reboot.</p>
      <p style={S.p}>Everything is recorded by the <strong>Machine Check Architecture</strong> and exposed through the OS and BMC logs. Trend CEs: a DIMM with rising correctable errors is a warning to replace before it causes a UCE.</p>
      <ComparisonTable
        title="Common RAS Features (platform dependent)"
        headers={["Feature", "What it does", "Why useful"]}
        rows={[
          ["ECC / advanced ECC", "Corrects bit errors in memory", "Silent data corruption avoided"],
          ["Patrol scrub / demand scrub", "Reads memory in the background and fixes errors early", "Stops single-bit errors turning into double-bit errors"],
          ["Memory sparing / mirroring", "Reserves or duplicates memory ranks", "Survives a failing DIMM at the cost of capacity"],
          ["Page offlining / poison handling", "Retires bad pages instead of crashing", "Higher uptime"],
          ["Machine Check Architecture (MCA)", "Logs hardware errors with source and type", "Lets you identify the exact failing part"],
          ["PCIe AER", "Reports link/device errors", "Finds bad riser, cable or card"],
        ]}
        caption="Availability of each feature depends on CPU, firmware and OS. Verify with the OEM."
      />
      <CodeBlock lang="bash" label="Linux — read hardware error history">
{`sudo ras-mc-ctl --summary        # rasdaemon: error counts per DIMM / CPU
sudo ras-mc-ctl --errors         # detailed error list
journalctl -k | grep -iE "mce|machine check|edac|hardware error"
ipmitool sel elist | tail -30    # BMC event log (see server-basics article)`}
      </CodeBlock>
      <Callout type="maintenance" title="Policy: act on trends, not only failures">
        Define a threshold in monitoring: for example, repeated correctable errors from the same DIMM within a set period trigger a replacement ticket. The exact policy should follow the OEM's guidance.
      </Callout>

      {/* ══════════ 14. TDP ══════════ */}
      <h2 id="tdp-power" style={S.h2}>TDP and Power Planning</h2>
      <p style={S.p}><strong>TDP (Thermal Design Power)</strong> is the heat figure, in watts, that the cooling solution must be designed for under a defined workload. It is a <strong>design reference</strong>, not a guarantee of maximum power. Real CPUs can draw more than TDP for short or even sustained periods depending on the vendor's power-limit settings.</p>
      <p style={S.p}>Intel describes limits like <strong>PL1</strong> (sustained) and <strong>PL2</strong> (short burst); AMD uses PPT/TDP settings; both offer a configurable TDP (cTDP) so you can trade performance for power in constrained racks.</p>
      <h3 style={S.h3}>Worked example: why CPUs decide your rack kW</h3>
      <CodeBlock lang="text">
{`Rack: 40 × 1U 2-socket servers
CPU TDP: 350 W per CPU  →  2 CPUs = 700 W per server (CPUs only)
CPUs only: 40 × 700 W = 28,000 W = 28 kW

Add RAM, drives, NICs, fans, PSU losses (say +40%) → ~39 kW
A rack provisioned for 15–20 kW cannot hold this.
Real-world options: fewer servers per rack, lower-TDP SKU,
cTDP / power capping, or liquid-assisted cooling.`}
      </CodeBlock>
      <p style={S.p}>Values above are illustrative; use actual measured power from the BMC or rack <TopicLink slug="pdu" variant="inline" /> for real plans. High-TDP CPUs also stress cooling: see <TopicLink slug="airflow-management" variant="inline" /> and <TopicLink slug="containment" variant="inline" />.</p>
      <Callout type="important" title="Power capping is a tool, not magic">
        Setting a power cap in BMC/BIOS protects a rack from tripping a breaker, but it forces the CPU to lower frequency under load. Document it; otherwise the next engineer sees "slow CPU" and chases the wrong problem.
      </Callout>

      {/* ══════════ 15. SECURITY ══════════ */}
      <h2 id="security-features" style={S.h2}>CPU Security Features and Microcode</h2>
      <p style={S.p}>CPUs are not just hardware — they run <strong>microcode</strong>, small firmware that fixes bugs and applies security mitigations. Updates arrive through BIOS/UEFI updates or the OS. Keeping microcode current is part of patching.</p>
      <p style={S.p}>Since 2018, vulnerabilities such as <strong>Spectre</strong> and <strong>Meltdown</strong> showed that speculative execution can leak data between processes or VMs. OS kernels and microcode now include mitigations; some cost a small amount of performance depending on workload and CPU generation.</p>
      <ComparisonTable
        title="Security-Related CPU Capabilities (vendor naming differs)"
        headers={["Capability", "Purpose"]}
        rows={[
          ["Speculative-execution mitigations (microcode + OS)", "Reduce side-channel data leaks between processes/VMs"],
          ["Secure boot / hardware root of trust", "Only signed firmware and bootloaders run"],
          ["Memory encryption (e.g., AMD SME/SEV, Intel TME/TDX)", "Protects RAM contents and can isolate confidential VMs from the host"],
          ["Trusted execution (e.g., Intel SGX)", "Protects selected code/data in an enclave"],
          ["NX / execute-disable, SMEP/SMAP", "Make exploitation harder"],
        ]}
        caption="Feature names and availability differ by vendor and generation. Verify the exact model."
      />
      <CodeBlock lang="bash" label="Linux — mitigation status and microcode version">
{`lscpu | grep -i vulnerab
grep . /sys/devices/system/cpu/vulnerabilities/*
grep -m1 microcode /proc/cpuinfo`}
      </CodeBlock>
      <p style={S.p}>Operational rule: apply BIOS/microcode updates through the same controlled process as other firmware (see <TopicLink slug="server-basics" variant="inline" /> for firmware practice). Test on one host, then roll through a cluster in batches.</p>

      {/* ══════════ 16. VIRT EXT ══════════ */}
      <h2 id="virtualisation-ext" style={S.h2}>Hardware Virtualisation Extensions</h2>
      <p style={S.p}><strong>Intel VT-x / AMD-V:</strong> CPU modes that let a hypervisor run guest operating systems safely and efficiently. Without them, virtualisation would need slow software tricks. Modern hypervisors (ESXi, Hyper-V, KVM) require them. They must be enabled in BIOS/UEFI on some systems.</p>
      <p style={S.p}><strong>EPT / NPT (AMD RVI):</strong> Hardware support for translating guest addresses to physical addresses. It greatly reduces hypervisor overhead on memory-heavy VMs.</p>
      <p style={S.p}><strong>VT-d / AMD-Vi (IOMMU):</strong> Lets the hypervisor assign a physical device (NIC, GPU) to one VM safely, and protects memory from rogue DMA. Needed for PCIe passthrough and SR-IOV.</p>
      <p style={S.p}><strong>SR-IOV:</strong> A NIC presents multiple virtual functions, each assignable to a VM, bypassing most software switching. Common in telecom and low-latency setups.</p>
      <Callout type="common-mistake" title="'Hypervisor won't start / 64-bit VM fails'">
        Almost always the virtualisation option (VT-x/SVM) or IOMMU is disabled in BIOS after a reset or firmware update. Check the BIOS profile first, then OS/hypervisor logs.
      </Callout>

      {/* ══════════ 17. CPU IN VIRT ══════════ */}
      <h2 id="cpu-in-virtualisation" style={S.h2}>CPU in Virtualisation</h2>
      <p style={S.p}>In <TopicLink slug="virtualization" variant="inline" /> a VM does not own a physical core. It gets <strong>vCPUs</strong>. Each vCPU is a thread of execution that the hypervisor scheduler places on a real hardware thread for a short time slice.</p>
      <Figure caption="Fig 6 — Hypervisor scheduling 32 vCPUs from five VMs onto 16 physical cores (2:1 overcommit). Conceptual diagram."><CpuVcpuScheduling /></Figure>
      <DiagramGuide
        title="How to read Fig 6"
        steps={[
          "Left column: five VMs with their vCPU counts (4 + 8 + 4 + 8 + 8 = 32 vCPUs in total).",
          "The grey arrows show all those vCPUs going into one place — the hypervisor scheduler in the middle box.",
          "The scheduler's job: every few milliseconds pick which vCPU runs on which physical core. It also tries to keep a VM's vCPUs inside one socket (NUMA-aware placement).",
          "On the right are 16 physical cores. Only 16 vCPUs can run at any instant, because there are only 16 cores (SMT threads aside).",
          "The orange READY QUEUE is the key idea. A vCPU that is ready to run but finds no free core waits there. The wait time is reported as %RDY (VMware) or steal time (KVM/Linux).",
          "The bottom banner does the arithmetic: 32 ÷ 16 = 2:1 overcommit. It is fine if VMs rarely peak together; if they all become busy, the queue grows and every VM slows down.",
        ]}
      />
      <h3 style={S.h3}>Overcommit — useful but dangerous</h3>
      <p style={S.p}>Most VMs are idle most of the time, so hosting 2–4× more vCPUs than cores is common for light workloads. For latency-critical or database VMs, many teams keep a ratio close to 1:1. There is no universal safe ratio — decide from monitoring data.</p>
      <p style={S.p}><strong>Wide VM trap:</strong> A VM with many vCPUs needs all of them scheduled close together. Giving a small app 16 vCPUs "to be safe" often makes it <em>slower</em>, because the scheduler struggles to find 16 free cores and it hurts other VMs. Right-size using actual usage.</p>
      <h3 style={S.h3}>Metrics that tell the truth</h3>
      <ComparisonTable
        title="Which CPU Metric Should You Believe?"
        headers={["Metric", "Where", "What it tells you"]}
        rows={[
          ["%USED / guest CPU %", "Inside VM / hypervisor", "How much the VM used — not whether it was starved"],
          ["%RDY (CPU ready)", "VMware esxtop / vCenter", "Time vCPUs waited for a core. Sustained high values = overcommit problem"],
          ["%CSTP (co-stop)", "VMware esxtop", "Multi-vCPU VM waiting for siblings — sign of too many vCPUs"],
          ["Steal time (%st)", "Linux guest, KVM", "Time the guest wanted CPU but the host gave it to others"],
          ["Host CPU utilisation", "Hypervisor", "Capacity of the physical host"],
        ]}
        caption="Thresholds differ by vendor and workload; set baselines from your own environment."
      />
      <h3 style={S.h3}>vNUMA, pinning and EVC</h3>
      <p style={S.p}><strong>vNUMA:</strong> For big VMs the hypervisor exposes a virtual NUMA layout so the guest OS and database can place memory correctly. Do not hot-add CPU/RAM to such a VM unless you understand the effect on vNUMA.</p>
      <p style={S.p}><strong>CPU pinning / reservations:</strong> You can pin vCPUs to cores or reserve CPU for critical VMs. It improves predictability but reduces flexibility.</p>
      <p style={S.p}><strong>EVC / CPU compatibility mode:</strong> To live-migrate (vMotion, Hyper-V live migration) between hosts with different CPU generations, the cluster hides newer instructions behind a common baseline. The price: new features (e.g., newer vector instructions) are unavailable to VMs until the baseline is raised.</p>

      {/* ══════════ 18. SELECTION ══════════ */}
      <h2 id="cpu-selection" style={S.h2}>Workload-Based CPU Selection</h2>
      <p style={S.p}>"Which CPU should we buy?" has no single answer. The right method: find out what limits your workload, then pick the CPU that removes that limit at an acceptable power and licence cost.</p>
      <Figure caption="Fig 7 — CPU selection flow: workload → bottleneck → constraints → power/cooling fit → pilot test and standardisation."><CpuSelectionFlow /></Figure>
      <DiagramGuide
        title="How to read Fig 7"
        steps={[
          "Step 1 (top): measure the real workload — utilisation, memory use, I/O, per-thread behaviour. Do not guess from the application's name.",
          "Step 2: find the bottleneck. It branches into three paths — per-core speed (amber), throughput/density (blue) or memory-bandwidth/I/O heavy (purple).",
          "Amber path: databases, ERP, anything with a long single-thread critical path. Choose higher clock, fewer cores and a big cache. It is also the cheapest way to cut per-core licence cost.",
          "Blue path: virtualisation hosts, web, containers. Choose a high core count and check memory capacity per core.",
          "Purple path: analytics, HPC, storage and AI host nodes. Choose a CPU with many memory channels and lots of PCIe lanes. Core count is secondary.",
          "All three paths meet at Step 3 (constraints): software licence model, RAM size, and NIC/GPU lane needs. A SKU that fails here is rejected even if it is fast.",
          "Step 4: multiply TDP by servers per rack and compare with the rack's kW and airflow. Step 5: pilot test the shortlisted SKU with the real workload, then standardise it.",
        ]}
      />
      <ComparisonTable
        title="CPU Selection by Workload"
        headers={["Workload", "Prioritise", "Why"]}
        rows={[
          ["Web / API / microservices", "Core count, good efficiency", "Many small parallel requests"],
          ["OLTP database", "Per-core speed, large cache, enough RAM per core", "Short transactions, latency sensitive, often per-core licensed"],
          ["Analytics / OLAP / in-memory DB", "Many cores + memory channels + big RAM", "Large scans are bandwidth hungry"],
          ["Virtualisation / private cloud", "Core count, RAM capacity, NUMA fit, EVC baseline", "Many VMs; consolidation ratio drives cost"],
          ["HPC / simulation", "Vector units (AVX-512/AMX class), memory bandwidth, interconnect", "Floating-point and bandwidth limited"],
          ["AI training/inference host", "PCIe lanes, memory bandwidth, CPU-GPU link", "GPU does the maths; CPU must feed it — see the GPU article"],
          ["Storage / NVMe-oF / software-defined storage", "PCIe lanes, NIC offloads, many cores for erasure coding", "I/O and data-path heavy"],
          ["Edge / telecom", "Low power, long-life platforms, deterministic latency", "Space and power constrained"],
        ]}
        caption="Starting guidance only. Benchmark with your own workload before finalising."
      />
      <h3 style={S.h3}>1S or 2S?</h3>
      <p style={S.p}>A high-core-count 1S server often replaces a 2S one: no NUMA complexity, fewer parts, and software licensed per socket costs less. 2S doubles memory channels, PCIe lanes and RAM capacity, which some workloads need. Choose the smallest socket count that satisfies cores, RAM and lanes.</p>
      <h3 style={S.h3}>Sizing example</h3>
      <CodeBlock lang="text">
{`Need: host 120 VMs, average 4 vCPU each = 480 vCPU
Target overcommit: 3:1 for general workloads  → 160 physical cores needed
Plus N+1 host failure headroom in a 6-host cluster:
   usable hosts = 5  →  32 cores per host min (160 / 5)
Choose: 2S × 24-core (48 cores) = comfortable
Check: RAM (120 VMs × 16 GB = 1.9 TB → 6 hosts × 512 GB min with headroom),
       lanes for 2 × 25G NICs, rack power (see TDP section).`}
      </CodeBlock>
      <p style={S.p}>Numbers above are only an illustration of the method. Also check per-core software licences — in some cases, fewer faster cores save more money than they cost.</p>
      <Callout type="best-practice" title="Never buy on GHz or core count alone">
        Run a pilot with the real application and compare throughput, latency at peak load, and power draw. The "best" CPU is the one with the lowest cost per unit of useful work — including licence, power and rack space — not the one with the biggest spec sheet.
      </Callout>

      {/* ══════════ 19. BIOS ══════════ */}
      <h2 id="bios-settings" style={S.h2}>Important BIOS / UEFI CPU Settings</h2>
      <p style={S.p}>Two identical servers with different BIOS profiles can perform very differently. Treat BIOS settings as part of the build standard, store them as a profile/template, and apply them to every server of a class.</p>
      <ComparisonTable
        title="Common CPU-Related BIOS Settings"
        headers={["Setting", "What it controls", "Typical guidance (verify per workload/OEM)"]}
        rows={[
          ["System profile / power profile", "Performance vs balanced vs power-saver", "Balanced or OS-controlled for general use; Performance for latency-critical; avoid Power-saver for production apps"],
          ["Intel VT-x / AMD SVM", "Hardware virtualisation", "Enabled on hypervisor hosts"],
          ["VT-d / AMD IOMMU", "Device passthrough and DMA protection", "Enabled when using passthrough/SR-IOV or per security policy"],
          ["Hyper-Threading / SMT", "Logical threads per core", "On by default; follow security and licence policy"],
          ["Turbo Boost / Core Performance Boost", "Allow frequencies above base", "On for most; off only for strict-determinism needs"],
          ["C-states / package C-states", "Deep idle", "Limit deep C-states only for very low-latency apps"],
          ["SNC / NPS (NUMA per socket)", "Splits one socket into NUMA domains", "Keep default; change only after testing"],
          ["Memory interleaving / NUMA node interleaving", "How memory is spread", "Normally leave NUMA enabled; node interleave off"],
          ["Power capping / cTDP", "Lower CPU power limit", "Use when rack power is constrained; document it"],
          ["Secure Boot / TPM", "Firmware integrity", "Enable per security policy"],
        ]}
        caption="Names differ by OEM (Dell, HPE, Lenovo, Supermicro). Always follow the OEM's workload tuning guide."
      />
      <Callout type="danger" title="BIOS reset after a board or CPU replacement">
        After a motherboard swap, CMOS clear or BIOS reset, the server may come back in the <strong>default / power-saver profile</strong> with VT-x or SMT in the wrong state. It boots, passes POST — and then runs slowly or won't start VMs. Always re-apply the standard BIOS profile and compare settings against a known-good server.
      </Callout>

      {/* ══════════ 20. INSTALLATION ══════════ */}
      <h2 id="installation-replacement" style={S.h2}>CPU Installation and Replacement</h2>
      <p style={S.p}>In most data centers the CPU is not replaced often — most CPU work is done in the factory or in a planned upgrade. But when a CPU fails or a socket needs service, the procedure matters: a bent contact or wrong torque can destroy a very expensive motherboard.</p>
      <h3 style={S.h3}>Before you start</h3>
      <p style={S.p}>Get a change ticket and the OEM service guide. Confirm the replacement CPU part number, stepping and generation match the other CPU in a 2S server (mismatched CPUs are generally not supported). Check BIOS/BMC firmware supports the new CPU. Drain or migrate workloads and follow the lock-out procedure.</p>
      <CodeBlock lang="text">
{`1. Shut down gracefully; migrate/evacuate workload
2. Remove all power cords (both PSUs); wait for standby LEDs to go dark
3. Wear ESD wrist strap connected to chassis ground
4. Pull the server out on rails; remove top cover; remove air shroud
5. Loosen heatsink in the OEM-specified sequence (diagonal, a little at a time)
6. Lift heatsink straight up; clean old thermal paste from CPU lid
7. Release the socket retention lever(s) / carrier as per OEM guide
8. Lift out the old CPU holding only its edges/carrier
9. Inspect socket: look for bent pins/contacts, dust, damage  — DO NOT touch pins
10. Place the new CPU aligned with the notches/triangle marker; do NOT force
11. Close the retention mechanism; apply thermal interface material as specified
12. Refit heatsink; tighten screws in the specified order and torque
13. Refit shroud, cover; reconnect power; boot to BIOS
14. Verify CPU is detected, microcode/firmware, memory training OK, no MCE`}
      </CodeBlock>
      <Callout type="danger" title="Pins are on the motherboard socket">
        On many modern server platforms the fragile contact pins (LGA) are on the <strong>socket</strong>, not on the CPU. One touch or a CPU dropped at an angle can bend pins, causing missing DIMMs, PCIe lane loss or no-POST. Handle in the OEM carrier, never slide a CPU across the socket.
      </Callout>
      <h3 style={S.h3}>Thermal paste and heatsink — where most mistakes happen</h3>
      <p style={S.p}>Too little paste, old dried paste or an unevenly tightened heatsink gives poor heat transfer. The CPU then runs hot and throttles — the server does not fail, it just becomes slow. Use the OEM-approved quantity and pattern, and torque screws to the specified value in the specified order.</p>
      <p style={S.p}>Heatsinks may be different for front and rear CPU positions in 1U servers (different fin heights/airflow). A wrong heatsink at the wrong position is a classic mistake. Check the part number.</p>
      <Callout type="warning" title="Never mix up CPU 1 and CPU 2 settings">
        In a 2S server, CPU 2 needs matching memory and PCIe layout. Reconnecting DIMMs in the wrong slots after service can leave channels empty or reduce speed. Take a photo/label before removal.
      </Callout>

      {/* ══════════ 21. TESTING ══════════ */}
      <h2 id="testing-commissioning" style={S.h2}>Testing and Commissioning</h2>
      <p style={S.p}>A new or serviced server should not go into production until you have proved the CPU subsystem works at full load, stays cool and logs no hardware errors. Do this before applications are installed.</p>
      <CodeBlock lang="bash" label="Commissioning checklist — Linux live image or installed OS">
{`# 1. Identity and topology
lscpu                                  # model, sockets, cores, threads, NUMA nodes, flags
dmidecode -t processor | less          # SKU, socket, max speed
numactl --hardware                     # memory per node must be balanced

# 2. Virtualisation flags (hypervisor hosts)
lscpu | grep -E "Virtualization|vmx|svm"

# 3. Stress for 30–60 minutes while watching frequency and temperature
stress-ng --cpu 0 --cpu-method matrixprod --timeout 3600s --metrics-brief &
sudo turbostat --quiet --interval 10
ipmitool sdr type temperature          # CPU/inlet temperatures during test

# 4. Check for hardware errors after the test
sudo ras-mc-ctl --summary
journalctl -k | grep -iE "mce|hardware error|throttl"
ipmitool sel elist | tail`}
      </CodeBlock>
      <ComparisonTable
        title="Commissioning Acceptance Criteria (example — set your own)"
        headers={["Check", "Pass condition"]}
        rows={[
          ["CPU model / count / cores", "Matches purchase order and sibling servers"],
          ["Frequency under all-core load", "At or above expected all-core turbo/base; no unexplained drops"],
          ["Temperature under stress", "Stable and within the OEM limit with margin at the actual inlet temperature"],
          ["MCE / EDAC / BMC log", "No uncorrectable errors; no growing corrected-error counts"],
          ["NUMA balance", "Equal memory on each node; PCIe devices on expected nodes"],
          ["Power draw", "Within rack budget; recorded as baseline"],
          ["BIOS profile", "Identical to approved template"],
        ]}
        caption="Record the results — they become the baseline for future troubleshooting."
      />

      {/* ══════════ 22. MONITORING ══════════ */}
      <h2 id="monitoring-operations" style={S.h2}>Operations and Monitoring</h2>
      <p style={S.p}>In daily operations you watch two worlds: the <strong>OS view</strong> (utilisation, load, steal, NUMA) and the <strong>hardware view</strong> (temperature, power, MCE, throttling) through the BMC. Good monitoring connects both.</p>
      <ComparisonTable
        title="What to Monitor and Why"
        headers={["Metric", "Source", "Meaning / action"]}
        rows={[
          ["CPU utilisation per core", "OS agent", "A single core at 100% = single-thread bottleneck"],
          ["Run queue / load average", "OS", "Load greater than logical CPUs for long periods = CPU saturation"],
          ["%RDY / steal / co-stop", "Hypervisor / guest", "Overcommit or noisy neighbour"],
          ["CPU temperature + inlet temperature", "BMC (Redfish/IPMI)", "Rising CPU temp at constant load = airflow, fan or paste problem"],
          ["Core frequency vs base", "turbostat / telemetry", "Below base under load = throttling or power cap"],
          ["Package power", "BMC / RAPL / PDU", "Capacity planning; compare with cap"],
          ["Throttle / PROCHOT events", "BMC SEL, kernel log", "Thermal or power protection active — investigate immediately"],
          ["Corrected / uncorrected errors", "rasdaemon, BMC SEL", "Trend and replace parts before a crash"],
          ["Context switches, interrupts", "OS", "Software issue or network storm"],
        ]}
        caption="Alert on trends and baselines, not only on fixed numbers."
      />
      <CodeBlock lang="bash" label="Redfish — read processor and thermal data (vendor-neutral)">
{`# Use a read-only service account; keep credentials in environment/secret store
curl -sk -u "$BMC_USER:$BMC_PASS" https://<bmc-ip>/redfish/v1/Systems/1/Processors
curl -sk -u "$BMC_USER:$BMC_PASS" https://<bmc-ip>/redfish/v1/Chassis/1/Thermal`}
      </CodeBlock>
      <p style={S.p}>For fleet-level views use <TopicLink slug="dcim" variant="inline" /> or your monitoring platform; for facility-linked alarms see <TopicLink slug="bms" variant="inline" />.</p>

      {/* ══════════ 23. MAINTENANCE ══════════ */}
      <h2 id="maintenance" style={S.h2}>Maintenance</h2>
      <p style={S.p}>CPUs themselves have no moving parts, so maintenance is mostly about what surrounds them: cooling, firmware and configuration.</p>
      <ul style={S.ul}>
        <li><strong>Cooling path:</strong> Check fans, air shrouds, blanking panels and filters. A missing shroud can starve the CPU of airflow even if fans spin fast.</li>
        <li><strong>Firmware:</strong> Apply BIOS, microcode and BMC updates through the controlled cycle — test host first, then batches.</li>
        <li><strong>Baseline drift:</strong> Compare BIOS profiles across the fleet regularly. Servers silently drift after repairs.</li>
        <li><strong>Error trending:</strong> Review corrected-error counts monthly. Replace DIMMs/CPU on policy before UCE.</li>
        <li><strong>Thermal paste:</strong> Replace whenever a heatsink is removed — never reuse.</li>
        <li><strong>Spares:</strong> Keep spare heatsinks, matching CPU stock for critical clusters and confirm the compatibility list.</li>
        <li><strong>Documentation:</strong> Record serials, firmware versions and BIOS profile per server.</li>
      </ul>
      <Callout type="maintenance" title="Change one thing at a time">
        If you update BIOS, replace a DIMM and change a power profile in one window and the server misbehaves, you cannot tell which change caused it. Change in small steps, note each, and keep a rollback.
      </Callout>

      {/* ══════════ 24. TROUBLESHOOTING ══════════ */}
      <h2 id="troubleshooting" style={S.h2}>CPU Troubleshooting</h2>
      <p style={S.p}>"Server is slow" is the most common ticket and the least specific. Use a structured flow so you do not jump to "replace the CPU".</p>
      <Figure caption="Fig 8 — Troubleshooting flow for a slow server: utilisation → frequency/thermal → BIOS/power cap/MCE → NUMA placement → fix and record."><CpuThrottleFlow /></Figure>
      <DiagramGuide
        title="How to read Fig 8"
        steps={[
          "Start at the red box: the alert — slow application or high CPU.",
          "Step 1 asks who is using the CPU. Three outcomes: one process at 100% (software problem — hand to the application team), utilisation low but still slow (hardware/frequency suspect), or all cores busy (a capacity or overcommit problem).",
          "The middle (purple) branch is the hardware path. Step 2 compares the real core frequency with the expected value using turbostat and the BMC.",
          "Step 3: if frequency is low, look at temperature — fans, airflow, heatsink seating, thermal paste, inlet temperature.",
          "Step 4: if temperature is fine, look at configuration — BIOS power profile, power caps — and at the hardware error log for MCEs.",
          "Step 5: finally check NUMA placement, fix the cause, and write down what you found. The record helps the next engineer.",
          "Rule: always go top to bottom. Each step eliminates a class of problems cheaply before you touch hardware.",
        ]}
      />
      <h3 style={S.h3}>High CPU utilisation</h3>
      <p style={S.p}>Use per-core view (htop, mpstat -P ALL 1). One core pegged and others idle means a single-threaded bottleneck; more hardware will not help. All cores busy means real capacity pressure or a runaway process.</p>
      <CodeBlock lang="bash">
{`top -H                       # per-thread view
mpstat -P ALL 2 5            # per-core utilisation
ps -eo pid,comm,%cpu --sort=-%cpu | head
pidstat -u 2 5               # CPU by process over time
vmstat 2                     # r = run queue length; compare to logical CPU count`}
      </CodeBlock>
      <h3 style={S.h3}>Throttling (thermal or power)</h3>
      <p style={S.p}>Symptoms: utilisation moderate, but performance poor and clock below base. Check <em>turbostat</em>, BMC thermal sensors and the SEL for thermal/PROCHOT events. Causes: failed fan, missing blanking panel, high inlet temperature, poorly seated heatsink, dried paste, power cap, or "power-saver" BIOS profile.</p>
      <h3 style={S.h3}>Hardware errors / unexpected reboot</h3>
      <p style={S.p}>Read the BMC SEL and OS logs for MCE/EDAC entries. Identify the source (CPU, DIMM channel, PCIe). One corrected error may be noise; repeated errors from the same location is a replacement signal. Do not clear logs before saving them.</p>
      <h3 style={S.h3}>CPU steal / %RDY in virtual hosts</h3>
      <p style={S.p}>The VM sees low CPU but is slow. Check hypervisor ready time. Fix by migrating VMs, reducing vCPU counts, or adding hosts.</p>
      <h3 style={S.h3}>NUMA-related slowness</h3>
      <p style={S.p}>Check <em>numastat</em> for rising other-node counts and verify where the process memory lives. Pin or restart the workload on one node; fix VM sizing.</p>
      <ComparisonTable
        title="Symptom → Likely Cause → First Check"
        headers={["Symptom", "Likely cause", "First check"]}
        rows={[
          ["Slow at high temperature, clock below base", "Thermal throttle", "Fans, shroud, inlet temp, heatsink, BMC SEL"],
          ["Slow after board/CPU replacement", "BIOS defaults / power-saver profile", "Compare BIOS profile with healthy server"],
          ["Cores missing in OS", "Bent socket pins, disabled cores in BIOS, CPU fault", "BMC inventory, lscpu, POST messages"],
          ["DIMMs missing after CPU service", "Socket contact issue or wrong seating", "BIOS memory map; re-seat CPU/DIMM per guide"],
          ["Intermittent reboot with MCE", "CPU, DIMM or voltage issue", "SEL, rasdaemon source, isolate and swap"],
          ["VM live-migration fails", "CPU feature mismatch", "EVC/compatibility baseline"],
          ["Slow only on one socket's apps", "NUMA / NIC locality", "numastat, device NUMA node"],
        ]}
        caption="Use as a starting checklist, not as a replacement for the OEM diagnostic guide."
      />

      {/* ══════════ 25. FAILURE SCENARIOS ══════════ */}
      <h2 id="failure-scenarios" style={S.h2}>Real Failure Scenarios</h2>
      <p style={S.p}>These are patterns seen across data centers. Each shows the symptom, the root cause and the lesson. They are generic examples, not reports of one particular site.</p>
      <h3 style={S.h3}>Scenario 1: The server that was "fixed" but stayed slow</h3>
      <p style={S.p}><strong>What happened:</strong> A motherboard was replaced. The server booted, passed POST and went back to service. A day later, the application team complained of 30–40% lower throughput.</p>
      <p style={S.p}><strong>Root cause:</strong> The BIOS came back in a default power-saver profile with turbo limited. Nothing was "broken", so no alarm fired.</p>
      <p style={S.p}><strong>Lesson:</strong> After any board or CPU service, re-apply the golden BIOS profile and compare frequency under load with a sibling server before closing the ticket.</p>
      <h3 style={S.h3}>Scenario 2: Thermal throttling after a CPU replacement</h3>
      <p style={S.p}><strong>What happened:</strong> A CPU was swapped during a maintenance window. Within hours the server showed high latency under load and fans at maximum.</p>
      <p style={S.p}><strong>Root cause:</strong> The heatsink screws were tightened out of sequence and the paste was applied in excess. One corner of the CPU had poor contact.</p>
      <p style={S.p}><strong>Lesson:</strong> Follow the OEM torque order, use the specified amount of paste, and run a stress test with temperature monitoring before putting the server back.</p>
      <h3 style={S.h3}>Scenario 3: Database slow on a 2-socket host</h3>
      <p style={S.p}><strong>What happened:</strong> A large database VM was moved to a new host. CPU utilisation was only 40%, yet query latency doubled.</p>
      <p style={S.p}><strong>Root cause:</strong> The VM was sized wider than one NUMA node, and its memory was spread across both sockets. A large fraction of memory accesses went across the interconnect.</p>
      <p style={S.p}><strong>Lesson:</strong> Size VMs to fit a NUMA node when possible and check <em>numastat</em> / hypervisor NUMA statistics after migration.</p>
      <h3 style={S.h3}>Scenario 4: Corrected errors ignored until a crash</h3>
      <p style={S.p}><strong>What happened:</strong> A server rebooted unexpectedly with an uncorrectable memory error. The BMC log showed weeks of correctable errors from the same DIMM before the crash.</p>
      <p style={S.p}><strong>Root cause:</strong> Nobody was trending corrected errors.</p>
      <p style={S.p}><strong>Lesson:</strong> Alert on error trends and replace parts on policy, before the uncorrectable event.</p>
      <h3 style={S.h3}>Scenario 5: Live migration blocked in a mixed cluster</h3>
      <p style={S.p}><strong>What happened:</strong> New hosts with a newer CPU generation were added to an existing cluster. VMs could not vMotion to the older hosts, and the maintenance plan failed mid-window.</p>
      <p style={S.p}><strong>Root cause:</strong> The cluster's CPU compatibility baseline (EVC) was not planned for the new generation.</p>
      <p style={S.p}><strong>Lesson:</strong> Plan CPU generation mixing before purchase. Either keep clusters homogeneous or set the baseline early.</p>
      <h3 style={S.h3}>Scenario 6: Rack power breaker alarm after a CPU upgrade</h3>
      <p style={S.p}><strong>What happened:</strong> Servers were upgraded to a higher-TDP CPU in the same racks. At peak load the rack PDUs reported near-limit current and one feed alarmed.</p>
      <p style={S.p}><strong>Root cause:</strong> The upgrade was approved as "same chassis, same rack", without recalculating rack power and A/B redundancy headroom.</p>
      <p style={S.p}><strong>Lesson:</strong> A CPU change is a power and cooling change. Re-run the capacity calculation, including the failure case where one feed carries everything. See <TopicLink slug="pdu" variant="inline" />.</p>

      {/* ══════════ 26. TIER III / IV ══════════ */}
      <h2 id="tier-iii-iv-view" style={S.h2}>Tier III and Tier IV View</h2>
      <p style={S.p}>Tier classification (as defined by Uptime Institute's framework) describes the <strong>site infrastructure</strong>: power paths, cooling and maintainability. It does not rate an individual CPU. But CPU choices decide whether a Tier III or Tier IV design really performs as designed.</p>
      <ComparisonTable
        title="How CPU Decisions Interact with Site Design"
        headers={["Concern", "Normal industry view", "Data center view", "Tier III thinking", "Tier IV thinking"]}
        rows={[
          ["Power density", "CPU watts per server", "Watts per rack within circuit limits", "Concurrently maintainable: one path can be taken down while load stays up — rack must fit one feed", "Fault tolerant: the surviving path must carry full load after a fault"],
          ["Cooling", "Heatsink and fans", "Inlet temperature and airflow per rack", "Cooling units can be maintained without exceeding inlet limits", "Cooling continues through a single fault without exceeding limits"],
          ["Thermal margin", "Stay below throttle", "Throttling at the rack's worst inlet", "Plan for worst-case inlet during maintenance of one cooling unit", "Plan for inlet during a fault, not only maintenance"],
          ["Fault domains", "Single server", "Place cluster nodes across racks and feeds", "Spread nodes so a maintenance on one path doesn't hit quorum", "Spread across independent paths so a fault doesn't hit quorum"],
          ["Capacity headroom", "Peak utilisation", "N+1 compute capacity", "Capacity remains when one host or one path is down", "Capacity remains during fault plus maintenance scenarios"],
        ]}
        caption="Conceptual mapping only. Actual implementation depends on project requirements, utility requirements, OEM design and Data Center architecture."
      />
      <Callout type="important" title="High-TDP CPUs shift the design limit">
        A design that was comfortable with 150 W CPUs may be marginal with 350–500 W CPUs: PDU current, breaker ratings, cooling per rack and containment effectiveness all matter more. Treat a CPU generation change as a facility change request. Related reading: <TopicLink slug="ups" variant="inline" />, <TopicLink slug="crac" variant="inline" />, <TopicLink slug="chiller" variant="inline" />.
      </Callout>
      <p style={S.p}>Design philosophy: the CPU is chosen for the workload; the rack and room are designed for the worst thermal and power case; the cluster is designed so no single server, feed or cooling unit can take the service down.</p>

      {/* ══════════ 27. SAFETY ══════════ */}
      <h2 id="safety-practices" style={S.h2}>Safety Practices</h2>
      <ul style={S.ul}>
        <li><strong>Power isolation:</strong> Remove <em>all</em> power cords (dual PSUs!) before opening a server. Standby power keeps the BMC and parts of the board live.</li>
        <li><strong>Hot surfaces:</strong> CPU heatsinks stay hot after shutdown. Wait to cool before handling.</li>
        <li><strong>ESD:</strong> Use a wrist strap to a known ground and an anti-static mat. Store CPUs in their carrier/anti-static packaging.</li>
        <li><strong>Mechanical:</strong> Heavy heatsinks and 2U/4U servers — use a server lift when removing from high rack positions; follow lifting limits.</li>
        <li><strong>Sharp edges and pins:</strong> Chassis edges and socket pins injure people and equipment. Never touch socket contacts.</li>
        <li><strong>Permit-to-work:</strong> Follow the site's change management and live-work rules for any work in a production row.</li>
        <li><strong>Noise and hearing:</strong> Server fans at full speed are very loud; use hearing protection during long stress tests.</li>
        <li><strong>Test safely:</strong> Run stress tests on racked, monitored servers — not on an open server sitting on a bench with disabled fans.</li>
      </ul>

      {/* ══════════ 28. OEM ══════════ */}
      <h2 id="oem-reference" style={S.h2}>OEMs and Reference Platforms</h2>
      <p style={S.p}>CPUs come from silicon vendors (Intel, AMD, Ampere, NVIDIA and others). Servers come from OEMs that design the boards, cooling, firmware and BMC around those CPUs. You will mostly work with the OEM's documents.</p>
      <ComparisonTable
        title="Common Server OEMs and Where to Find CPU-Related Guidance"
        headers={["OEM", "Management / tools", "What to look for"]}
        rows={[
          ["Dell Technologies (PowerEdge)", "iDRAC, OpenManage", "Memory population guide, BIOS workload profiles, thermal restrictions per CPU TDP"],
          ["HPE (ProLiant)", "iLO, OneView", "Workload profiles, Gen-specific CPU/DIMM rules, thermal configuration"],
          ["Lenovo (ThinkSystem)", "XClarity, XCC", "Processor support matrix, memory rules"],
          ["Supermicro", "IPMI/Redfish, SUM", "Motherboard manual, supported CPU list per BIOS version"],
          ["Cisco (UCS), Fujitsu, Inspur, others", "Vendor management suites", "CPU compatibility and firmware bundles"],
          ["Hyperscale / OCP designs", "OpenBMC, Redfish", "Open specifications, rack-level power and cooling design"],
        ]}
        caption="Names change over time. Always use the OEM's current documentation for your exact server generation."
      />
      <Callout type="best-practice" title="Use the OEM's thermal restrictions table">
        Many server models limit the highest-TDP CPUs to certain configurations (for example, specific heatsinks, fan types, front-drive counts or maximum inlet temperature). Ignoring this table is a common cause of unexplained throttling.
      </Callout>

      {/* ══════════ 29. MISCONCEPTIONS ══════════ */}
      <h2 id="misconceptions" style={S.h2}>Common Misconceptions</h2>
      <ComparisonTable
        title="Myths vs Reality"
        headers={["Myth", "Reality"]}
        rows={[
          ["More GHz always means faster", "IPC, core count, cache and memory also matter. Compare using your workload."],
          ["More cores always means faster", "Only if the software can use them. Single-threaded jobs ignore extra cores."],
          ["Hyper-Threading doubles performance", "It improves core utilisation by some amount — workload dependent."],
          ["TDP is the maximum power", "TDP is a design reference. Actual power depends on limits, workload and settings."],
          ["Low CPU% means the CPU is fine", "In VMs, low guest CPU can hide high %RDY; in physical hosts, throttling can hide behind low util."],
          ["RAM capacity decides memory speed", "Channels populated and DIMM layout decide bandwidth."],
          ["A newer CPU always drops in as a replacement", "Needs socket, BIOS, firmware, power, cooling and cluster compatibility."],
          ["NUMA only matters for HPC", "It affects databases, VMs and network-heavy apps on any 2S server."],
        ]}
        caption="Fix wrong mental models early — they cause wrong purchases and wrong troubleshooting."
      />

      {/* ══════════ 30. FUTURE ══════════ */}
      <h2 id="future-trends" style={S.h2}>Future Trends</h2>
      <p style={S.p}>These are directions visible in the industry. Specific products and timelines will change — treat them as concepts to watch.</p>
      <ul style={S.ul}>
        <li><strong>More chiplets and tiles:</strong> Higher core counts through modular packages, and open chiplet standards such as UCIe.</li>
        <li><strong>Higher power and liquid cooling:</strong> Server CPUs with several hundred watts are pushing designs toward direct liquid cooling or rear-door heat exchangers.</li>
        <li><strong>Bigger caches and on-package memory:</strong> Stacked cache (such as 3D V-Cache) and CPUs with high-bandwidth memory for bandwidth-limited workloads.</li>
        <li><strong>Built-in accelerators:</strong> Matrix/AI units (e.g., AMX-class), crypto and data-movement engines inside the CPU.</li>
        <li><strong>CXL:</strong> Compute Express Link allows memory expansion and pooling beyond DIMM slots, changing how we think about RAM per socket. See <TopicLink slug="ram" variant="inline" />.</li>
        <li><strong>ARM and custom silicon:</strong> Growing share in cloud and AI host CPUs; more multi-architecture operations.</li>
        <li><strong>Confidential computing:</strong> Hardware-isolated VMs so even the host operator cannot read tenant memory.</li>
        <li><strong>Tight CPU–GPU coupling:</strong> High-bandwidth CPU-to-GPU links in AI platforms. See <TopicLink slug="ai-gpu" variant="inline" /> and <TopicLink slug="nvidia-architecture" variant="inline" />.</li>
        <li><strong>Efficiency focus:</strong> Performance per watt and sustainability drive CPU choices as much as raw speed.</li>
      </ul>

      {/* ══════════ 31. LEARNING PATH ══════════ */}
      <h2 id="learning-path" style={S.h2}>Learning Path</h2>
      <p style={S.p}>CPU is one piece of the compute stack. A good order to continue:</p>
      <ol style={S.ul}>
        <li><TopicLink slug="server-basics" variant="inline" /> — the full server: form factors, rack, power, BMC.</li>
        <li><TopicLink slug="ram" variant="inline" /> — memory channels, ECC and DIMM population in depth.</li>
        <li><TopicLink slug="gpu" variant="inline" /> — accelerators and how they connect to the CPU.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — hypervisors, vCPU scheduling and clusters.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — dense shared-chassis compute.</li>
        <li><TopicLink slug="pdu" variant="inline" /> and <TopicLink slug="airflow-management" variant="inline" /> — the power and cooling that CPUs depend on.</li>
      </ol>

      {/* ══════════ 32. INTERVIEW ══════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: What is NUMA and how does it affect performance?</h3>
      <p style={S.p}><strong>Answer:</strong> In a multi-socket server each CPU has its own local memory. Local access is fast; accessing the other socket's memory crosses the interconnect and is slower. NUMA-unaware placement silently reduces performance. Check with numactl/numastat and keep a workload's CPUs and memory on one node where possible.</p>
      <h3 style={S.h3}>Q2: Is TDP the maximum power a CPU can use?</h3>
      <p style={S.p}><strong>Answer:</strong> No. It is a thermal design reference. Actual power depends on workload and the vendor's power limits (for example, burst limits above TDP). Use TDP for cooling design and measured BMC/PDU readings for power planning.</p>
      <h3 style={S.h3}>Q3: A server shows low CPU usage but is slow. What do you check?</h3>
      <p style={S.p}><strong>Answer:</strong> Check frequency vs base (throttling/power cap/BIOS profile), temperature and BMC events, MCE logs, NUMA locality, and, in virtualisation, %RDY/steal. Low utilisation does not prove the CPU is performing at full speed.</p>
      <h3 style={S.h3}>Q4: How many logical processors does a 2-socket, 32-core, SMT-enabled server have?</h3>
      <p style={S.p}><strong>Answer:</strong> 2 × 32 × 2 = 128 logical CPUs (64 physical cores). Per-core software licences usually use physical cores — check the vendor's licence terms.</p>
      <h3 style={S.h3}>Q5: What is CPU overcommit and how do you monitor it?</h3>
      <p style={S.p}><strong>Answer:</strong> Assigning more vCPUs than physical threads. It works when VMs don't peak together. Monitor %RDY (VMware), steal time (Linux/KVM) and co-stop. High sustained values mean VMs are waiting for cores.</p>
      <h3 style={S.h3}>Q6: Why do memory channels matter more than DIMM capacity for some workloads?</h3>
      <p style={S.p}><strong>Answer:</strong> Bandwidth scales with the number of populated channels. A server with the right capacity but empty channels delivers lower bandwidth. Populate channels symmetrically per the OEM guide.</p>
      <h3 style={S.h3}>Q7: What do you do after replacing a CPU or motherboard?</h3>
      <p style={S.p}><strong>Answer:</strong> Verify detection and memory map, re-apply the standard BIOS profile, update/verify firmware, run a stress test with thermal monitoring, check error logs, compare to a sibling server and record the baseline.</p>
      <h3 style={S.h3}>Q8: Why can't I live-migrate a VM between two hosts in the same cluster?</h3>
      <p style={S.p}><strong>Answer:</strong> Often CPU feature mismatch. Use a cluster compatibility baseline (EVC in VMware, equivalent features elsewhere) or keep hosts homogeneous.</p>

      {/* ══════════ 33. KEY TAKEAWAYS ══════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Performance is clock × IPC × busy cores — and it is limited by cache hits, memory bandwidth and I/O, not GHz alone.</li>
        <li>Topology: socket → core → thread. A 2S, 32-core, SMT server shows 128 logical CPUs but has 64 cores.</li>
        <li>Memory controllers and PCIe lanes live inside the CPU, so the CPU model caps RAM channels, capacity and I/O.</li>
        <li>NUMA: local is fast, remote is slower. Keep VMs and databases within a node and bind to the device's node.</li>
        <li>TDP is a cooling reference. Measure real power; CPU changes are power and cooling changes.</li>
        <li>In virtualisation, watch %RDY / steal — guest CPU% can hide starvation.</li>
        <li>BIOS profile is part of the build. After any board or CPU service, re-apply and verify it.</li>
        <li>Heatsink seating and paste cause "silent slowness" — validate with a stress test before returning to service.</li>
        <li>Trend corrected errors and replace on policy before an uncorrectable crash.</li>
        <li>Standardise a few CPU SKUs and plan generation mixing for clusters.</li>
        <li>Actual implementation depends on project requirements, utility requirements, OEM design and data center architecture — always verify with vendor documentation.</li>
      </ul>

      {/* FAQ — excluded from TOC */}
      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: i < faqs.length - 1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight: 700, marginBottom: "0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom: 0 }}>{item.a}</p>
        </div>
      ))}

      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Related Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="server-basics" variant="inline" /> — The full server: form factors, rack, power, BMC.</li>
        <li><TopicLink slug="ram" variant="inline" /> — Memory channels, ECC, DIMM population.</li>
        <li><TopicLink slug="gpu" variant="inline" /> — Accelerators and CPU-GPU relationship.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — vCPU, overcommit, NUMA in VMs.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — High-density shared-chassis compute.</li>
      </ul>
    </>
  );
}
