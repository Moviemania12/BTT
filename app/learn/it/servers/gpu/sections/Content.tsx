"use client";
import { S, Callout, ComparisonTable, Figure, CodeBlock, DiagramGuide } from "../shared";
import TopicLink from "@/components/TopicLink";
import CpuVsGpu from "../svg/CpuVsGpu";
import GpuChipAnatomy from "../svg/GpuChipAnatomy";
import GpuMemoryMath from "../svg/GpuMemoryMath";
import GpuDataFlow from "../svg/GpuDataFlow";
import GpuNodeTopology from "../svg/GpuNodeTopology";
import GpuRailNetwork from "../svg/GpuRailNetwork";
import LiquidCoolingLoop from "../svg/LiquidCoolingLoop";
import GpuSoftwareStack from "../svg/GpuSoftwareStack";
import GpuTroubleshootFlow from "../svg/GpuTroubleshootFlow";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      {/* Quick Summary */}
      <div style={{ background: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#6b21a8", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — GPU in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>What it is:</strong> A GPU is a parallel processor with thousands of simple cores and very fast memory. It is the engine of AI training, inference and HPC.</li>
          <li><strong>CPU vs GPU:</strong> CPU = few smart cores for complex, branchy work. GPU = huge number of simple cores doing the same math on lots of data (matrix multiply).</li>
          <li><strong>Memory decides what fits:</strong> Weights, gradients, optimizer state and activations live in GPU memory (HBM). Training needs roughly 16 bytes per parameter with mixed precision and Adam.</li>
          <li><strong>Form factor:</strong> PCIe cards for general servers. SXM / OAM modules on baseboards (HGX) for 8-GPU AI nodes with NVLink.</li>
          <li><strong>Data paths:</strong> NVLink/NVSwitch inside the node, PCIe to the CPU and NICs, InfiniBand or RoCE between nodes. The slowest path sets the speed.</li>
          <li><strong>Power:</strong> One GPU can draw 300 W to 1 kW or more. An 8-GPU server is roughly 10 kW class, so racks reach 40 kW to 100+ kW.</li>
          <li><strong>Cooling:</strong> High-density GPU racks move from air to rear-door heat exchangers and direct liquid cooling (cold plates, CDU).</li>
          <li><strong>Software:</strong> Firmware, driver, fabric manager, CUDA/NCCL, containers, frameworks, scheduler. Version mismatches cause strange failures.</li>
          <li><strong>Operations:</strong> Monitor with DCGM, watch XID and ECC errors, throttle reasons and NVLink counters. Isolate the node before debugging.</li>
          <li><strong>Golden rule:</strong> A GPU is only as fast as its feed — memory, interconnect, network, power and cooling must all keep up.</li>
        </ul>
      </div>

      {/* ══════════ 1. WHAT IS A GPU ══════════ */}
      <h2 id="what-is-gpu" style={S.h2}>What Is a GPU? — Its Place in the Data Center</h2>
      <p style={S.p}>GPU stands for Graphics Processing Unit. It was built to draw pixels for games, and drawing millions of pixels is a very parallel job — every pixel can be calculated independently.</p>
      <p style={S.p}>Scientists noticed that the same parallel hardware is perfect for any math that repeats on large arrays. Neural networks are exactly that: billions of multiply-and-add operations. That is how the GPU became the backbone of AI and HPC (GPGPU — general purpose computing on GPU).</p>
      <p style={S.p}>In a data center today, a GPU is mostly used for <strong>AI training, AI inference, scientific simulation and data analytics</strong>. Graphics is now a small part of the story.</p>
      <p style={S.p}>A GPU is not a standalone computer. It sits inside a server next to a <TopicLink slug="cpu" variant="inline" />, <TopicLink slug="ram" variant="inline" />, storage and network cards. The CPU runs the operating system and launches work; the GPU does the heavy math. Server context: <TopicLink slug="server-basics" variant="inline" />.</p>
      <p style={S.p}>Why does a data center engineer care? Because one GPU server can use more power than an entire older rack, needs special cooling, and depends on a fast network. GPUs changed the design of power, cooling and cabling — not only the IT side.</p>

      {/* ══════════ 2. CPU VS GPU ══════════ */}
      <h2 id="cpu-vs-gpu" style={S.h2}>CPU vs GPU — Design Philosophy</h2>
      <Figure caption="Fig 1 — CPU vs GPU: few powerful cores with big caches and branch logic (CPU) against thousands of simple cores sharing fast memory (GPU). Core counts are illustrative."><CpuVsGpu /></Figure>
      <DiagramGuide
        title="How to read Fig 1"
        steps={[
          "Left side is the CPU. A few large cores, each with branch predictor, out-of-order engine and its own L1/L2 cache, plus a big shared L3. Most of the silicon is spent on making one thread run fast.",
          "Right side is the GPU. A large grid of small cores with very little control logic per core. Most of the silicon is spent on arithmetic units.",
          "Memory: the CPU reaches system RAM through its memory controller. The GPU has its own memory (VRAM/HBM) with far higher bandwidth, placed very close to the chip.",
          "Takeaway: the CPU minimises the time of one task (latency). The GPU maximises the number of tasks finished per second (throughput).",
        ]}
      />
      <p style={S.p}><strong>CPU design:</strong> Each core is powerful — branch prediction, out-of-order execution, big caches. It is great for operating systems, databases and code full of if-else decisions.</p>
      <p style={S.p}><strong>GPU design:</strong> Thousands of simpler cores run the same instruction on different data. This is called SIMT — Single Instruction, Multiple Threads.</p>
      <p style={S.p}>Think of a CPU as a few expert chefs who can cook any complex dish. A GPU is a huge kitchen of junior cooks who all chop onions at the same time. For one complex dish, the expert wins. For ten thousand onions, the crowd wins.</p>
      <ComparisonTable
        title="CPU vs GPU — Quick Comparison"
        headers={["Property", "CPU", "GPU"]}
        rows={[
          ["Core count (order)", "Tens to ~100+", "Thousands (CUDA cores) plus hundreds of tensor cores"],
          ["Optimised for", "Low latency, complex control flow", "High throughput, regular math"],
          ["Memory", "System DDR5, hundreds of GB to TB", "HBM/GDDR on package, tens to hundreds of GB, much higher bandwidth"],
          ["Best workloads", "OS, databases, web, orchestration", "Matrix math, AI, simulation, rendering"],
          ["Needs the other?", "Works alone", "Needs a CPU host to boot and feed it"],
        ]}
        caption="Generalisation only. Exact numbers depend on the product generation — verify vendor datasheets."
      />
      <Callout type="common-mistake" title="'GPU will make my application faster'">
        Not automatically. Code must be written (or a library must be used) so that work is split into thousands of parallel pieces. A branchy, sequential application can run slower on a GPU than on a CPU.
      </Callout>

      {/* ══════════ 3. GPU ARCHITECTURE ══════════ */}
      <h2 id="gpu-architecture" style={S.h2}>GPU Architecture — SM, Tensor Cores and Warps</h2>
      <Figure caption="Fig 2 — Inside a data center GPU: GPCs made of Streaming Multiprocessors, shared L2 cache, HBM stacks on the package, NVLink and PCIe interfaces, plus a zoom into one SM. Layout is schematic, counts differ per model."><GpuChipAnatomy /></Figure>
      <DiagramGuide
        title="How to read Fig 2"
        steps={[
          "Outer box is the GPU package. The big die in the middle holds the compute; the blocks on the sides are HBM memory stacks sitting very close to the die on the same package.",
          "Inside the die, the GPCs (graphics/GPU processing clusters) each hold many SMs (Streaming Multiprocessors). The SM is the basic building block you should remember.",
          "The GigaThread scheduler hands blocks of work to the SMs. The shared L2 cache sits between all SMs and the HBM, so repeated data does not go back to memory.",
          "The zoomed SM on the right shows the real ingredients: warp schedulers, CUDA cores for general math, tensor cores for matrix math, the register file and shared memory / L1.",
          "At the edge are the external interfaces: NVLink (to other GPUs) and PCIe (to the CPU and NICs). Every GPU-to-GPU or GPU-to-host transfer leaves through one of these.",
        ]}
      />
      <p style={S.p}><strong>Streaming Multiprocessor (SM) — NVIDIA / Compute Unit (CU) — AMD:</strong> The basic compute block. A big GPU has over a hundred of them, and total core count is SMs × cores per SM. Exact counts vary by model.</p>
      <p style={S.p}><strong>CUDA cores / stream processors:</strong> General purpose floating point and integer math units. Good for graphics, simulation and normal code.</p>
      <p style={S.p}><strong>Tensor Cores (NVIDIA) / Matrix Cores (AMD):</strong> Special units that multiply small matrices and add the result in one step. They are the reason modern GPUs are so fast at AI. They support FP16, BF16, FP8, INT8 and other formats depending on generation.</p>
      <p style={S.p}><strong>Warps:</strong> GPU threads execute in groups of 32 (a warp on NVIDIA; wavefronts on AMD are 32 or 64). All threads in a warp run the same instruction together. If threads take different branches (divergence), some wait — efficiency drops.</p>
      <p style={S.p}><strong>Latency hiding:</strong> A GPU does not try to make one thread fast. When one warp waits for memory, the scheduler instantly switches to another ready warp. This is why GPUs need thousands of threads in flight to stay busy.</p>
      <p style={S.p}><strong>Memory hierarchy:</strong> registers (fastest, private to a thread) → shared memory / L1 (per SM) → L2 (shared by all SMs) → HBM (large, off-die but on-package) → host RAM over PCIe (slowest). Good GPU code keeps data as high in this ladder as possible. Compare with the CPU ladder in <TopicLink slug="cpu" variant="inline" />.</p>

      {/* ══════════ 4. GPU MEMORY ══════════ */}
      <h2 id="gpu-memory" style={S.h2}>GPU Memory — HBM, VRAM and Memory Math</h2>
      <p style={S.p}>VRAM is the GPU's own memory. It is separate from CPU RAM. The GPU reads and writes it directly, without asking the CPU, and at a much higher bandwidth than normal server DDR memory.</p>
      <p style={S.p}><strong>HBM (High Bandwidth Memory):</strong> DRAM dies stacked vertically and placed on the same package as the GPU, connected through thousands of tiny wires. Result: huge bandwidth, lower energy per bit — but expensive and capacity-limited. Used in data center GPUs.</p>
      <p style={S.p}><strong>GDDR6/6X/7:</strong> Conventional graphics memory on separate chips around the GPU. Cheaper, lower bandwidth. Seen in workstation and some inference GPUs.</p>
      <p style={S.p}>Order of magnitude: DDR5 gives tens of GB/s per channel, a whole CPU socket reaches a few hundred GB/s. HBM-based GPUs reach several TB/s. Exact figures change every generation — verify the datasheet.</p>
      <Figure caption="Fig 3 — GPU memory math. Left: memory needed to train a 7-billion parameter model with mixed precision and Adam (about 16 bytes per parameter = ~112 GB) against an 80 GB GPU. Right: memory needed just to hold a 70B model for inference at FP16, INT8 and INT4. Figures exclude activations and KV-cache and are approximate."><GpuMemoryMath /></Figure>
      <DiagramGuide
        title="How to read Fig 3"
        steps={[
          "Left chart, training: each bar is one kind of data kept in memory for every parameter — FP16 weights (2 bytes), FP16 gradients (2 bytes), then FP32 master weights, Adam momentum and Adam variance (4 bytes each).",
          "Add them: 2 + 2 + 4 + 4 + 4 = 16 bytes per parameter. A 7B model therefore needs about 7 × 16 = 112 GB before activations. The red line marks an 80 GB GPU — the bars cross it, so one GPU is not enough.",
          "Right chart, inference: no gradients and no optimizer, only weights. A 70B model needs 140 GB at FP16, 70 GB at INT8, 35 GB at INT4 — the same model, but lower precision shrinks what you must buy.",
          "Lesson: first calculate memory, then choose GPU count and parallelism. Real jobs also need space for activations (training) and KV-cache (inference), so leave headroom.",
        ]}
      />
      <CodeBlock lang="text" label="Rule-of-thumb memory math (approximate)">
{`Training, mixed precision + Adam  ≈ 16 bytes / parameter
   7B  model → 7e9  × 16 B ≈ 112 GB  (+ activations)
  70B  model → 70e9 × 16 B ≈ 1.1 TB  (spread over many GPUs)

Inference, weights only
   FP16 = 2 B/param   INT8 = 1 B/param   INT4 = 0.5 B/param
  70B @ FP16 ≈ 140 GB  → needs 2 × 80 GB GPUs (+ KV-cache room)`}
      </CodeBlock>
      <Callout type="warning" title="OOM = job failure">
        A CUDA out-of-memory error kills the training step. Fixes: smaller batch, mixed precision, activation checkpointing, sharding the model (FSDP / ZeRO), tensor/pipeline parallelism, or more GPUs. Capacity is a hard wall, not a soft limit.
      </Callout>
      <p style={S.p}><strong>ECC on GPU memory:</strong> Data center GPUs protect HBM with ECC, just like server RAM (see <TopicLink slug="ram" variant="inline" />). Correctable errors are fixed silently; uncorrectable ones trigger XID errors and may require a GPU reset or replacement. Row remapping lets the GPU retire bad memory rows without replacing the card — until spare rows run out.</p>

      {/* ══════════ 5. PRECISION ══════════ */}
      <h2 id="precision-formats" style={S.h2}>Precision Formats — FP32, BF16, FP8, INT8</h2>
      <p style={S.p}>Numbers inside a GPU can be stored with different numbers of bits. Fewer bits means less memory, less bandwidth, less power — and more operations per second. The price is smaller range or accuracy.</p>
      <ComparisonTable
        title="Common GPU Number Formats"
        headers={["Format", "Bits", "Typical use", "Note"]}
        rows={[
          ["FP64", "64", "Scientific HPC, simulation", "Slow on AI-focused GPUs; vital for weather, CFD, physics"],
          ["FP32", "32", "General compute, master weights", "Baseline precision"],
          ["TF32", "19 (stored in 32)", "Training with minimal code change", "NVIDIA tensor core mode"],
          ["FP16 / BF16", "16", "Mixed-precision training, inference", "BF16 keeps FP32's range, so it is more stable"],
          ["FP8", "8", "Latest training and inference", "Needs newer GPU generations and scaling support"],
          ["INT8 / INT4", "8 / 4", "Quantised inference", "Smallest and fastest; may need calibration for accuracy"],
        ]}
        caption="Which formats a GPU accelerates depends on its generation. Verify with the vendor's data sheet."
      />
      <p style={S.p}><strong>Mixed precision</strong> means doing the fast math in 16 or 8 bits but keeping important values (master weights, accumulators) in 32 bits. This gives most of the speed with little accuracy loss — it is the standard way to train today.</p>
      <p style={S.p}>Why this matters in a data center: the same GPU may advertise very different "TFLOPS" for each format. Always compare the same format when comparing GPUs or reading vendor numbers. Marketing numbers often assume sparsity or the lowest precision.</p>

      {/* ══════════ 6. FORM FACTORS ══════════ */}
      <h2 id="form-factors" style={S.h2}>Form Factors — PCIe, SXM, OAM, HGX, DGX</h2>
      <ComparisonTable
        title="GPU Form Factors"
        headers={["Form factor", "How it connects", "Power (order)", "Used in"]}
        rows={[
          ["PCIe card", "Edge connector in a PCIe x16 slot, aux power cable", "~75 W to 300–400 W", "General 2U/4U servers, inference, workstations"],
          ["SXM (NVIDIA)", "Module mounted on a baseboard, NVLink on board", "~700 W to 1 kW+", "HGX / DGX 8-GPU AI nodes"],
          ["OAM (OCP)", "Open Accelerator Module on a UBB baseboard", "~500 W to 750 W+", "AMD Instinct, Intel Gaudi, hyperscale designs"],
        ]}
        caption="Power figures are approximate by generation. Verify exact TDP in the datasheet before power planning."
      />
      <p style={S.p}><strong>PCIe card:</strong> Easy to add, replace and mix into standard servers. Lower power, and GPU-to-GPU communication usually goes through PCIe (or an optional NVLink bridge between a pair).</p>
      <p style={S.p}><strong>SXM / OAM module:</strong> The GPU is a mezzanine module bolted onto a baseboard. More power delivery, full NVLink mesh, and better cooling contact. The server must be designed for it — you cannot just plug an SXM GPU into any server.</p>
      <p style={S.p}><strong>HGX:</strong> NVIDIA's reference baseboard with 8 (or 4) SXM GPUs and NVSwitch chips. OEMs such as Dell, HPE, Supermicro and Lenovo build servers around it. <strong>DGX:</strong> NVIDIA's own complete system built on the same idea, with a validated software stack.</p>
      <Callout type="important" title="Do not mix generations carelessly">
        Different GPU models or generations in one NVLink domain or one training job lead to the slowest GPU setting the pace — and often to driver and firmware conflicts. Standardise per cluster.
      </Callout>

      {/* ══════════ 7. PCIE ══════════ */}
      <h2 id="pcie-interfaces" style={S.h2}>PCIe and the CPU–GPU Data Path</h2>
      <Figure caption="Fig 4 — Data path from storage to GPU: storage → CPU and system RAM → PCIe → GPU and VRAM → result. The PCIe hop is a common bottleneck; GPUDirect techniques shorten the path."><GpuDataFlow /></Figure>
      <DiagramGuide
        title="How to read Fig 4"
        steps={[
          "Start on the left with storage (NVMe, network storage). Training data must first be read from here.",
          "Data lands in system RAM, managed by the CPU. The CPU prepares it — decoding, shuffling, batching — before the GPU can use it.",
          "The PCIe link is the narrow bridge between host and GPU. Its bandwidth is far lower than the GPU's own memory bandwidth, so if data crosses it too often the GPU sits idle.",
          "On the right, the GPU computes using VRAM. Results go back through the same path. The bottom notes point to the usual bottleneck places.",
          "Remember: a slow data pipeline makes a very expensive GPU show low utilisation. Fix the feed before buying more GPUs.",
        ]}
      />
      <p style={S.p}><strong>PCIe generation and width:</strong> A GPU normally uses a x16 link. Approximate per-lane bandwidth per direction: Gen4 ≈ 1.97 GB/s, Gen5 ≈ 3.94 GB/s. So Gen5 x16 ≈ 63 GB/s each way — useful, but much smaller than HBM or NVLink bandwidth.</p>
      <p style={S.p}>A GPU can silently train down to a lower generation or fewer lanes (for example x8 instead of x16) because of a bad riser, dust, a loose card or a BIOS setting. Always check the link state after installation.</p>
      <CodeBlock lang="bash" label="Check PCIe link speed and width of a GPU">
{`nvidia-smi --query-gpu=index,pcie.link.gen.current,pcie.link.gen.max,pcie.link.width.current,pcie.link.width.max --format=csv
# current < max at idle can be power saving; check again under load.
# width.current lower than width.max under load = real problem (seating, riser, BIOS).`}
      </CodeBlock>
      <p style={S.p}><strong>GPUDirect:</strong> GPUDirect RDMA lets a network card read and write GPU memory directly, skipping the CPU's RAM copy. GPUDirect Storage does the same for NVMe. They cut latency and CPU load — but only if the PCIe topology places the NIC and GPU under the same switch or root complex.</p>
      <p style={S.p}><strong>NUMA matters:</strong> The GPU is attached to one CPU socket. A process pinned on the other socket must cross the CPU-to-CPU link and loses bandwidth. Pin processes close to their GPU (see NUMA in <TopicLink slug="cpu" variant="inline" />).</p>

      {/* ══════════ 8. NVLINK ══════════ */}
      <h2 id="nvlink-nvswitch" style={S.h2}>NVLink, NVSwitch and Node Topology</h2>
      <p style={S.p}>When 8 GPUs train one model together they must exchange huge amounts of data every step. PCIe is too slow for this. NVLink is a dedicated GPU-to-GPU link with several times the bandwidth of PCIe.</p>
      <p style={S.p}><strong>NVSwitch</strong> is a switch chip that connects all NVLinks, so every GPU can talk to every other GPU at full speed at the same time (all-to-all). Without NVSwitch, GPUs are connected only in pairs or rings.</p>
      <Figure caption="Fig 5 — Topology of an 8-GPU server: two CPUs, four PCIe switches (each with two GPUs and two NICs), and an NVSwitch fabric linking all GPUs. Three separate paths exist: NVLink, PCIe and CPU links."><GpuNodeTopology /></Figure>
      <DiagramGuide
        title="How to read Fig 5"
        steps={[
          "Top: two CPUs, each its own NUMA node, joined by a CPU-to-CPU link. Below them are four PCIe switches, two per CPU.",
          "Under every PCIe switch sit two GPUs and two NICs. GPU and NIC sharing one switch can use GPUDirect RDMA with the shortest path.",
          "Red bar at the bottom: the NVSwitch fabric. Every GPU has NVLink lines into it, so GPU-to-GPU traffic never touches PCIe or the CPUs.",
          "Follow three paths. GPU↔GPU via NVLink = fastest. GPU↔NIC under the same PCIe switch = good. GPU↔GPU across CPUs by PCIe = slow and must be avoided.",
          "In operations, run nvidia-smi topo -m to see this map from software. Codes like NV8 (NVLink), PIX/PXB (PCIe switch) and SYS (across CPUs) tell you how far apart two devices are.",
        ]}
      />
      <CodeBlock lang="bash" label="Read the topology from Linux">
{`nvidia-smi topo -m
# NV#  = connected over # NVLinks  (best)
# PIX  = same PCIe switch          (good)
# PXB  = several PCIe switches     (ok)
# NODE = same NUMA node, via host bridge
# SYS  = crosses CPU interconnect  (worst)

nvidia-smi nvlink --status          # per-link state and speed`}
      </CodeBlock>
      <p style={S.p}><strong>Fabric Manager:</strong> On NVSwitch systems a service called fabric manager configures the switches at boot. If it fails or the version does not match the driver, GPUs may not appear or may not form the NVLink domain.</p>
      <p style={S.p}>Bigger designs extend NVLink beyond one server (rack-scale NVLink domains) so dozens of GPUs behave like one big accelerator. Exact scale and bandwidth depend on the product generation — verify vendor documentation.</p>
      <Callout type="best-practice" title="Know your topology before placing jobs">
        A job that needs 4 GPUs should get 4 GPUs that share NVLink and NUMA locality, not 4 random GPUs. Schedulers (Slurm, Kubernetes with topology-aware plugins) should know the map.
      </Callout>

      {/* ══════════ 9. TRAINING VS INFERENCE ══════════ */}
      <h2 id="training-inference" style={S.h2}>Training vs Inference</h2>
      <ComparisonTable
        title="AI Training vs Inference on GPUs"
        headers={["Aspect", "Training", "Inference"]}
        rows={[
          ["Goal", "Learn the weights", "Use the trained model to answer"],
          ["Memory", "Weights + gradients + optimizer + activations (≈16 B/param)", "Weights + KV-cache (≈2 B/param at FP16 or less)"],
          ["Compute pattern", "Forward + backward, huge batches, runs days or weeks", "Forward only, small batches, runs continuously"],
          ["Priority", "Throughput, scaling across many GPUs", "Latency, cost per token, utilisation"],
          ["Network need", "Very high — all-reduce every step", "Moderate — mostly within one node"],
          ["Failure impact", "Lost progress unless checkpointed", "Dropped or slow requests"],
        ]}
        caption="Typical differences. Real workloads vary by model and serving design."
      />
      <p style={S.p}><strong>Training</strong> repeats a loop: forward pass, loss, backward pass (gradients), optimizer update. Every step all GPUs must agree on the gradients, so the interconnect is on the critical path.</p>
      <p style={S.p}><strong>Inference</strong> for large language models has two phases: prefill (read the whole prompt in parallel — compute-heavy) and decode (generate token by token — memory-bandwidth-heavy). That is why HBM bandwidth matters so much for inference.</p>
      <p style={S.p}><strong>KV-cache:</strong> During decode the model stores keys and values of previous tokens so it does not recompute them. This cache grows with context length and number of users and can take as much memory as the model itself.</p>
      <p style={S.p}><strong>Checkpointing:</strong> Training jobs save their state regularly. When a GPU fails mid-job, the run restarts from the last checkpoint. Checkpoint interval is a trade-off between lost work and storage load — see <TopicLink slug="ai-storage" variant="inline" />.</p>
      <p style={S.p}>For the wider AI picture read <TopicLink slug="ai-infrastructure-basics" variant="inline" /> and <TopicLink slug="ai-gpu" variant="inline" />.</p>

      {/* ══════════ 10. PARALLELISM ══════════ */}
      <h2 id="parallelism" style={S.h2}>Multi-GPU Parallelism and Collectives</h2>
      <p style={S.p}>One model rarely fits or trains fast enough on one GPU. So the work is split. There are three basic ways, and real systems combine them.</p>
      <ComparisonTable
        title="Parallelism Strategies"
        headers={["Strategy", "What is split", "Traffic pattern", "Network need"]}
        rows={[
          ["Data parallel", "Data batch (each GPU has a full model copy)", "All-reduce of gradients each step", "High; scales across nodes"],
          ["Tensor parallel", "Each layer's matrices across GPUs", "Frequent all-reduce inside every layer", "Very high; keep inside NVLink domain"],
          ["Pipeline parallel", "Layers in stages across GPUs", "Activations passed stage to stage", "Moderate; tolerant of slower links"],
          ["Sharded (FSDP/ZeRO)", "Weights, gradients, optimizer across GPUs", "All-gather and reduce-scatter", "High"],
        ]}
        caption="Large jobs mix several strategies (for example tensor parallel inside a node, pipeline and data parallel across nodes)."
      />
      <p style={S.p}><strong>Collectives:</strong> GPUs talk through group operations — all-reduce (sum everyone's values and give the result to everyone), all-gather, reduce-scatter and all-to-all. NCCL is the library that implements them efficiently over NVLink, PCIe and the network.</p>
      <p style={S.p}><strong>Why the data center engineer cares:</strong> The step time of a 1,000-GPU job is limited by its slowest link or slowest GPU. One GPU running hot and throttling, or one bad optic, slows the whole job — this is called a straggler.</p>
      <Callout type="important" title="One sick GPU can slow thousands">
        Synchronous training waits for the slowest participant every step. Fast detection and removal of stragglers is a core operations skill.
      </Callout>

      {/* ══════════ 11. CLUSTER NETWORKING ══════════ */}
      <h2 id="cluster-networking" style={S.h2}>Cluster Networking — Rails, InfiniBand, RoCE</h2>
      <p style={S.p}>Inside the node GPUs use NVLink. Between nodes they use a separate high-speed network — the <strong>compute fabric</strong>, usually InfiniBand or RoCE (RDMA over Converged Ethernet). It is different from the normal management and storage network. See <TopicLink slug="ai-networking" variant="inline" /> and <TopicLink slug="switch" variant="inline" />.</p>
      <Figure caption="Fig 6 — Rail-optimised GPU fabric: each GPU's NIC connects to a leaf switch dedicated to its rail, and leaf switches connect to spine switches. Same-rail traffic across servers needs only one switch hop. Link speeds and tiers vary by design."><GpuRailNetwork /></Figure>
      <DiagramGuide
        title="How to read Fig 6"
        steps={[
          "Bottom row: four GPU servers. Each shows four GPUs (G0–G3) and below each GPU its own NIC, coloured by rail (rail 0, 1, 2, 3).",
          "Middle row: leaf switches, one per rail. All GPU-0 NICs from every server plug into the Rail-0 leaf, all GPU-1 NICs into the Rail-1 leaf, and so on.",
          "Top row: spine switches connect all leaves, so traffic between different rails or different groups still has a path.",
          "Why it works: collective operations mostly exchange data between the same-numbered GPU of different servers. With rails, that traffic stays under one leaf — one hop, low latency, little congestion.",
          "Real clusters have 8 rails per server, 400G or 800G links and often three switch tiers. Cabling count is huge, which is why labeling and optics hygiene decide uptime.",
        ]}
      />
      <p style={S.p}><strong>InfiniBand:</strong> Purpose-built lossless fabric with hardware congestion control and very low latency. Common in the largest AI clusters.</p>
      <p style={S.p}><strong>RoCE Ethernet:</strong> RDMA over Ethernet. Works with Ethernet switches but needs careful configuration — PFC, ECN, congestion control — to behave losslessly.</p>
      <p style={S.p}><strong>Oversubscription:</strong> A fully non-blocking fabric (1:1) gives the best training scaling but costs more switches and optics. Inference or smaller clusters may accept some oversubscription.</p>
      <p style={S.p}><strong>Physical reality:</strong> Thousands of DAC, AOC and fibre links, each with a transceiver that can fail or run dirty. Link flaps, dirty fibre ends and bad optics are among the most common causes of slow multi-node training.</p>

      {/* ══════════ 12. GPU SERVER ARCH ══════════ */}
      <h2 id="gpu-server-arch" style={S.h2}>GPU Server Architecture</h2>
      <p style={S.p}>An 8-GPU AI server is not just "a server with GPUs". It is designed around the GPUs.</p>
      <ComparisonTable
        title="Inside a Typical 8-GPU AI Server"
        headers={["Subsystem", "Typical content", "Why it matters"]}
        rows={[
          ["GPU baseboard", "8 SXM/OAM GPUs + NVSwitch (HGX/UBB)", "Defines GPU-to-GPU bandwidth"],
          ["Host CPUs", "2 server CPUs", "Launch kernels, preprocess data, run the OS"],
          ["System RAM", "1–2 TB or more DDR5", "Staging area, data loaders, checkpoints"],
          ["Compute NICs", "One 400G/800G NIC per GPU (often)", "Inter-node training traffic"],
          ["Front-end NICs / DPU", "1–2 NICs for storage and management", "Datasets, checkpoints, control plane"],
          ["Local NVMe", "Several TB, fast", "Scratch, dataset cache, checkpoints"],
          ["PSUs and fans", "Multiple high-power N+N supplies, strong fans or liquid manifold", "Power and cooling capacity"],
          ["BMC", "Out-of-band management", "Remote power, sensors, firmware"],
        ]}
        caption="Reference-style description. Actual configurations depend on OEM and generation."
      />
      <p style={S.p}><strong>Chassis size:</strong> 8-GPU servers are usually 4U–10U and very heavy — often 100+ kg. Rack floor loading, lift tools and rail strength become real planning items.</p>
      <p style={S.p}><strong>Why CPU and RAM still matter:</strong> A weak CPU or too little RAM starves the GPUs of data. The CPU is the orchestrator — see <TopicLink slug="cpu" variant="inline" /> and <TopicLink slug="ram" variant="inline" />.</p>
      <p style={S.p}><strong>Alternative: blade-style density.</strong> Some designs put GPU nodes in shared chassis with shared power and cooling — see <TopicLink slug="blade-server" variant="inline" /> for the idea of dense shared-chassis compute.</p>

      {/* ══════════ 13. CAPACITY PLANNING ══════════ */}
      <h2 id="capacity-planning" style={S.h2}>Capacity Planning — How Many GPUs?</h2>
      <p style={S.p}>Capacity planning is a chain: workload → memory → compute time → GPU count → servers → racks → power and cooling → network. A mistake at one step breaks all later ones.</p>
      <CodeBlock lang="text" label="Worked example (illustrative numbers only)">
{`Goal: fine-tune a 7B model.
1. Memory  : 7B × 16 B ≈ 112 GB + activations ≈ 140 GB
2. GPU mem : 80 GB each  → need ≥ 2 GPUs with sharding; choose 8 for speed
3. Server  : 1 × 8-GPU node (≈ 10 kW class)
4. Rack    : if rack budget is 40 kW → max 3 such servers by power
5. Network : 8 compute NICs + 2 front-end NICs per server
6. Cooling : 10 kW per 8U ≈ high-density → rear-door or liquid
7. Add N+1 spare capacity and a spare GPU pool for failures`}
      </CodeBlock>
      <p style={S.p}><strong>Think in three limits:</strong> GPU memory (does it fit?), GPU compute (how long does it take?), and facility limits (power, cooling, floor weight, network ports). The smallest limit sets the real capacity.</p>
      <p style={S.p}><strong>Utilisation:</strong> GPUs are expensive. A cluster running at 40% utilisation wastes more money than any power saving trick can recover. Scheduling, queue policy and data pipelines matter as much as hardware.</p>
      <p style={S.p}><strong>Spares:</strong> Plan a spare pool. At scale, GPU and optic failures are routine statistics, not rare events. See <TopicLink slug="gpu-cluster" variant="inline" /> for cluster-level thinking.</p>

      {/* ══════════ 14. POWER DENSITY ══════════ */}
      <h2 id="power-density" style={S.h2}>Power and Rack Density</h2>
      <p style={S.p}>A traditional enterprise rack used about 5–10 kW. An 8-GPU server alone can be roughly 10 kW class. Three or four of them in one rack means 30–40 kW; the newest rack-scale systems go far higher, with liquid cooling mandatory.</p>
      <ComparisonTable
        title="Typical Rack Density by Workload (order of magnitude)"
        headers={["Workload", "Rack power", "Cooling approach"]}
        rows={[
          ["Traditional enterprise", "~5–10 kW", "Room air, hot/cold aisle"],
          ["Virtualisation / cloud", "~10–20 kW", "Air with good containment"],
          ["GPU inference (PCIe)", "~15–30 kW", "Air with strict containment, or rear-door"],
          ["8-GPU training racks", "~30–60 kW", "Rear-door heat exchanger or direct liquid"],
          ["Rack-scale AI systems", "100 kW+", "Direct liquid cooling mandatory"],
        ]}
        caption="Ranges only. Actual figures depend on exact platform and design."
      />
      <p style={S.p}><strong>Power chain:</strong> utility → transformer → UPS → PDU → rack busbar or <TopicLink slug="pdu" variant="inline" /> → server PSU → GPU. Each stage must be sized for the continuous load plus redundancy. See <TopicLink slug="ups" variant="inline" /> for backup design.</p>
      <p style={S.p}><strong>Power spikes:</strong> GPU loads change very fast — from idle to full in milliseconds, in sync across thousands of GPUs when a training step starts or a checkpoint finishes. These swings stress UPS, generators and even the utility grid. Many operators use power capping, smoothing features and careful UPS design.</p>
      <p style={S.p}><strong>Three-phase and breaker sizing:</strong> High-density racks use high-current three-phase feeds (for example 415 V). PDU ratings, breaker coordination and cable gauge must be checked against the continuous load (typically derated to 80%). Protect against nuisance trips caused by inrush at power-on.</p>
      <Callout type="danger" title="Never exceed the PDU or breaker rating">
        Adding "just one more GPU server" to a rack without checking per-phase current can trip a breaker and drop the whole rack. Always verify per-phase load before installation.
      </Callout>
      <Callout type="best-practice" title="Plan stranded capacity">
        If your facility can cool 40 kW per rack but power only 20 kW, the cooling is stranded (and the opposite). Match power, cooling and floor loading together — monitor in <TopicLink slug="dcim" variant="inline" />.
      </Callout>

      {/* ══════════ 15. COOLING ══════════ */}
      <h2 id="cooling" style={S.h2}>Cooling — Air, Rear-Door and Direct Liquid</h2>
      <p style={S.p}>Every watt a GPU uses becomes heat. A 700 W GPU is like a small heater, and eight of them in one box plus CPUs is a space heater. Heat must be removed continuously or the GPU throttles and then shuts down.</p>
      <ComparisonTable
        title="GPU Cooling Options"
        headers={["Method", "How it works", "Practical range", "Notes"]}
        rows={[
          ["Air cooling", "Server fans push room air through heatsinks", "Up to roughly 20–30 kW per rack with strict containment", "Needs hot/cold aisle containment and blanking panels"],
          ["Rear-door heat exchanger", "Water-cooled door on the rack takes heat from exhaust air", "Roughly 30–50 kW per rack", "Retrofit friendly; servers stay air-cooled"],
          ["Direct liquid cooling (DLC)", "Cold plates on GPUs/CPUs carry heat into liquid", "40 kW to 100+ kW per rack", "Needs CDU, manifolds, leak detection; some air still required"],
          ["Immersion", "Servers submerged in dielectric fluid", "Very high density", "Different operations, special hardware; less common"],
        ]}
        caption="Ranges are indicative; actual limits depend on server design, inlet temperature, airflow and site engineering."
      />
      <p style={S.p}><strong>Air cooling basics:</strong> Server fans pull cold air from the front and exhaust hot air at the back. Containment stops hot and cold air from mixing — see <TopicLink slug="containment" variant="inline" /> and <TopicLink slug="airflow-management" variant="inline" />. GPU servers need a lot of airflow, so fans are loud and can themselves use significant power.</p>
      <p style={S.p}><strong>Direct liquid cooling:</strong> A metal cold plate sits on each GPU (and often CPU). Liquid flows through the plate, picks up heat and carries it away. Water carries far more heat per volume than air, which is why DLC supports much higher density.</p>
      <Figure caption="Fig 7 — Direct liquid cooling loop: cold plates on the GPUs, rack manifold, CDU with heat exchanger, and facility water to a chiller or dry cooler. TCS (secondary) and FWS (primary) loops never mix."><LiquidCoolingLoop /></Figure>
      <DiagramGuide
        title="How to read Fig 7"
        steps={[
          "Far left: the GPU server. Cold plates sit on the GPUs (red). Parts like RAM, NICs, PSUs and drives usually still need airflow, so fans do not disappear completely.",
          "Blue arrow = cool coolant going in; red arrow = warm coolant coming out. Dripless quick-disconnect couplings at the back of the server let you pull a server without spilling.",
          "Rack manifold: a supply and return pipe along the rack that feeds every server. Leak, flow and temperature sensors sit here.",
          "CDU (Coolant Distribution Unit): the heart of the system. Its heat exchanger passes heat from the server-side loop to the building loop without mixing the liquids. Pumps, filters and a tank maintain pressure and cleanliness.",
          "Far right: the facility water goes to a chiller, dry cooler or cooling tower. Warm-water designs allow higher temperatures and less chiller energy.",
          "Bottom boxes: TCS (Technology Cooling System) is the clean, treated loop touching the cold plates. FWS (Facility Water System) is the large building loop. Quality and flow of the TCS decide GPU health.",
        ]}
      />
      <p style={S.p}><strong>Related plant:</strong> Facility water comes from a <TopicLink slug="chiller" variant="inline" /> or cooling tower (<TopicLink slug="cooling-tower" variant="inline" />). Room air still needs <TopicLink slug="crac" variant="inline" /> or PAC units for the remaining 10–30% heat. More in <TopicLink slug="ai-cooling" variant="inline" />.</p>
      <p style={S.p}><strong>Coolant quality:</strong> Use the coolant type and filtration that the OEM specifies. Wrong chemistry causes corrosion, biofilm or clogged micro-channels in the cold plates — which silently raise GPU temperature.</p>
      <p style={S.p}><strong>Leak philosophy:</strong> Use dripless couplings, leak-detection rope and sensors, pressure monitoring, drip trays and an isolation valve strategy. A leak alarm must have a defined action: isolate the rack loop, power down affected servers safely, and inspect — not just acknowledge.</p>
      <Callout type="warning" title="Condensation risk">
        If supply coolant is colder than the room dew point, water condenses on pipes and electronics. CDU controls must hold supply temperature above dew point with margin.
      </Callout>
      <Callout type="common-mistake" title="'We have liquid cooling so we do not need airflow'">
        Most DLC servers still rely on air for memory, drives, NICs and power supplies. Removing containment or blanking panels in a liquid-cooled row can still overheat the remaining parts.
      </Callout>

      {/* ══════════ 16. DATA CENTER GPUS ══════════ */}
      <h2 id="datacenter-gpus" style={S.h2}>Data Center GPU Families</h2>
      <p style={S.p}>Product names change every year or two, so remember the pattern rather than the model number. Always verify the current specs with the vendor.</p>
      <ComparisonTable
        title="Data Center GPU Landscape (pattern, not a spec sheet)"
        headers={["Family", "Vendor", "Typical position", "Notes"]}
        rows={[
          ["Hopper / Blackwell class", "NVIDIA", "Flagship AI training and inference", "HBM, NVLink, SXM and PCIe variants; rack-scale designs on the newest generation"],
          ["Ampere / Ada / L-class", "NVIDIA", "Mainstream compute and inference", "PCIe cards, lower power, wide server support"],
          ["Instinct (MI-series)", "AMD", "AI and HPC accelerators", "OAM modules, large HBM capacity, ROCm software stack"],
          ["Gaudi", "Intel", "AI training and inference accelerator", "Integrated Ethernet networking, own software stack"],
          ["TPU and custom ASICs", "Google, hyperscalers", "Cloud-specific accelerators", "Not GPUs, but compete in the same role — see TPU topics"],
        ]}
        caption="Illustrative landscape. Model names, specs and availability change quickly."
      />
      <p style={S.p}>Selection criteria: memory capacity and bandwidth, supported precisions, interconnect, software ecosystem (CUDA vs ROCm vs others), power per rack, availability and price. Software maturity is often the deciding factor — hardware is useless if your framework does not run well on it.</p>
      <p style={S.p}>Deep dives: <TopicLink slug="nvidia-architecture" variant="inline" />, <TopicLink slug="amd-ai-platforms" variant="inline" />, <TopicLink slug="tpu" variant="inline" /> and <TopicLink slug="ai-accelerators" variant="inline" />.</p>

      {/* ══════════ 17. SHARING ══════════ */}
      <h2 id="sharing-virtualisation" style={S.h2}>Sharing GPUs — MIG, vGPU, Time-Slicing, Passthrough</h2>
      <p style={S.p}>One big GPU is often too much for a small job. Idle expensive GPUs are a waste, so several methods allow sharing. Each gives a different balance of isolation and efficiency.</p>
      <ComparisonTable
        title="GPU Sharing Methods"
        headers={["Method", "How it works", "Isolation", "Best for"]}
        rows={[
          ["Passthrough", "Whole GPU assigned to one VM (via IOMMU / VFIO)", "Strong", "Dedicated VM, near-native performance"],
          ["MIG (Multi-Instance GPU)", "Hardware partitions GPU into up to 7 instances, each with own memory and compute", "Strong (hardware)", "Multiple inference jobs, multi-tenant clusters"],
          ["vGPU", "Hypervisor-level virtual GPUs with vendor licensing", "Good", "Virtual desktops, VDI, shared VMs"],
          ["Time-slicing", "Several processes take turns on one GPU", "Weak", "Dev / test, bursty small jobs"],
          ["MPS / spatial sharing", "Processes share SMs concurrently", "Weak to medium", "Small cooperating jobs"],
        ]}
        caption="Availability of MIG and vGPU depends on GPU model and licence. Verify per product."
      />
      <p style={S.p}><strong>MIG details:</strong> A big GPU is cut into fixed slices with dedicated memory and cache. One noisy job cannot steal memory bandwidth from another. Slice sizes are fixed profiles, so planning is needed to avoid wasted fragments.</p>
      <p style={S.p}><strong>Time-slicing risk:</strong> No memory isolation — one job running out of memory can hurt others. Good for dev clusters, poor for production SLAs.</p>
      <p style={S.p}>This connects to general virtualisation concepts in <TopicLink slug="virtualization" variant="inline" />. Passthrough needs IOMMU enabled in the BIOS and proper PCIe grouping.</p>

      {/* ══════════ 18. SOFTWARE STACK ══════════ */}
      <h2 id="software-stack" style={S.h2}>The GPU Software Stack</h2>
      <Figure caption="Fig 8 — GPU software stack from hardware and firmware up to the scheduler, with DCGM monitoring alongside. A fault at a lower layer often appears as a confusing error at the top."><GpuSoftwareStack /></Figure>
      <DiagramGuide
        title="How to read Fig 8"
        steps={[
          "Read from the bottom up. Hardware (GPUs, NVLink, NICs, power and cooling) is the foundation.",
          "Above it: firmware and BIOS — GPU VBIOS, the BMC, and BIOS options such as Above 4G decoding, ReBAR and IOMMU.",
          "Next: the kernel driver and, on NVSwitch systems, fabric manager. This layer makes GPUs visible to the OS and forms the NVLink domain.",
          "Then libraries and container runtime — CUDA, cuDNN, NCCL — and the container toolkit that exposes GPUs inside Docker or Kubernetes pods.",
          "Frameworks (PyTorch, JAX, vLLM, TensorRT) sit on top, and a scheduler (Slurm or Kubernetes) places jobs on nodes. The right-hand panel shows DCGM monitoring and health checks watching every layer.",
          "Why it matters: a driver mismatch or a failed fabric manager appears to users as 'my training job crashes'. Debug from the bottom up.",
        ]}
      />
      <p style={S.p}><strong>Compatibility matrix:</strong> GPU driver version, CUDA version, framework version and fabric manager version must be compatible. Keep a validated "golden image" for each node type and upgrade in a controlled, staged way — never upgrade a whole cluster blindly.</p>
      <p style={S.p}><strong>Containers:</strong> The NVIDIA container toolkit passes GPU devices and driver libraries into containers. Applications ship their own CUDA libraries in the image while the node supplies the driver.</p>
      <p style={S.p}><strong>Schedulers:</strong> Kubernetes uses a device plugin to count GPUs; Slurm uses GRES. Good schedulers understand topology (NVLink groups, NUMA) and support gang scheduling so a 64-GPU job starts only when all 64 are free. See <TopicLink slug="mlops" variant="inline" />.</p>
      <p style={S.p}><strong>AMD equivalent:</strong> ROCm is the AMD stack with similar layers (kernel driver, HIP, RCCL, ROCm SMI). Concepts are the same; names differ.</p>

      {/* ══════════ 19. BIOS ══════════ */}
      <h2 id="bios-settings" style={S.h2}>BIOS and Firmware Settings</h2>
      <p style={S.p}>Many "mysterious" GPU problems come from BIOS settings. Settings differ per OEM and BIOS version; always follow the OEM GPU server guide.</p>
      <ComparisonTable
        title="BIOS Settings That Matter for GPU Servers"
        headers={["Setting", "Why it matters", "Typical advice"]}
        rows={[
          ["Above 4G Decoding", "GPU maps large memory (BAR) above 4 GB address space", "Enabled — GPU may not initialise otherwise"],
          ["Resizable BAR (ReBAR)", "Lets CPU access full GPU memory window", "Follow OEM/vendor guidance"],
          ["IOMMU / VT-d / AMD-Vi", "Needed for passthrough and DMA protection", "Enable when using VMs or passthrough"],
          ["SR-IOV", "Virtual functions for vGPU and NICs", "Enable if using vGPU or SR-IOV NICs"],
          ["ACS (Access Control Services)", "Affects peer-to-peer routing between devices", "Tune carefully; wrong setting breaks GPUDirect P2P or isolation"],
          ["PCIe generation / link speed", "Forces the link generation", "Auto, or fixed to supported maximum"],
          ["NUMA / sub-NUMA", "How memory and PCIe are grouped per socket", "Match the job pinning strategy"],
          ["Power / performance profile", "Controls CPU C-states and boost", "Performance profile for latency-sensitive nodes"],
          ["Secure Boot", "May block unsigned kernel modules", "Sign driver modules or follow site policy"],
        ]}
        caption="Reference list. Actual option names and defaults depend on the OEM and BIOS version."
      />
      <p style={S.p}><strong>Firmware order:</strong> BIOS, BMC, GPU VBIOS, NIC firmware and driver versions are tested together by the OEM. Upgrade as a matrix, not as single parts, and keep rollback images.</p>
      <Callout type="best-practice" title="Document a golden BIOS profile">
        Export the BIOS configuration of a validated node and apply it to all identical nodes using the BMC or OEM tooling. Configuration drift between nodes is a classic cause of one-node-is-slower problems.
      </Callout>

      {/* ══════════ 20. INSTALLATION ══════════ */}
      <h2 id="installation-replacement" style={S.h2}>Installation and Replacement</h2>
      <p style={S.p}><strong>Before you touch anything:</strong> confirm the change ticket, check that the node is drained from the scheduler, confirm the spare part number matches the OEM list, and read the service guide for that model.</p>
      <CodeBlock lang="text" label="PCIe GPU card replacement — typical sequence (follow OEM guide)">
{`1. Drain node from scheduler; wait for jobs to finish or migrate.
2. Graceful OS shutdown; power off; remove power cords (both PSUs).
3. Wait for residual power to discharge (per OEM guide).
4. ESD protection on; open top cover or riser cage.
5. Remove auxiliary power cable, then GPU retention bracket.
6. Lift card straight out; place on antistatic surface.
7. Fit new card firmly in x16 slot; reconnect aux power; check cable type.
8. Close chassis; reconnect power; boot.
9. Verify: nvidia-smi lists GPU, PCIe gen/width correct, firmware matches.
10. Run diagnostics before returning to production.`}
      </CodeBlock>
      <p style={S.p}><strong>SXM / OAM modules:</strong> These are heavy, torque-sensitive and often replaced as a tray or baseboard by trained technicians. Use the OEM torque spec and tool — wrong torque on a heatsink damages the module or gives poor thermal contact.</p>
      <p style={S.p}><strong>Thermal interface:</strong> Never reuse old thermal paste or pads blindly; use the OEM-approved material. Uneven contact causes a hot GPU that throttles at a lower load than its neighbours.</p>
      <p style={S.p}><strong>Liquid-cooled nodes:</strong> Check the quick-disconnect couplings click and seal, inspect for drips, and bleed air from the loop if the OEM procedure requires it. Wet-test before power-on.</p>
      <p style={S.p}><strong>Cabling:</strong> Label every compute NIC cable at both ends with rack, server, GPU/rail number. Follow bend radius for fibre; keep optics ends capped until use and clean before plugging.</p>
      <Callout type="danger" title="Never hot-swap GPUs unless the platform explicitly supports it">
        Most GPU servers are NOT hot-pluggable for GPUs. Power down fully before removing or installing a card.
      </Callout>
      <Callout type="maintenance" title="Weight and handling">
        8-GPU servers can weigh over 100 kg. Use a server lift, two or more people, and rated rails. Never slide such a server out on rails alone with no lift support.
      </Callout>

      {/* ══════════ 21. TESTING ══════════ */}
      <h2 id="testing-commissioning" style={S.h2}>Testing and Commissioning</h2>
      <p style={S.p}>Never put a new or repaired GPU node into the production pool without a burn-in. Many weak GPUs, bad cables and marginal power supplies only show their faults under sustained load.</p>
      <ComparisonTable
        title="GPU Commissioning Test Plan"
        headers={["Stage", "What to check", "Tool / method"]}
        rows={[
          ["Inventory", "GPU count, model, serial, firmware, PCIe gen/width", "nvidia-smi, lspci, BMC inventory"],
          ["Topology", "NVLink status, NUMA, NIC–GPU affinity", "nvidia-smi topo -m, nvlink --status"],
          ["Health diag", "Memory, PCIe, thermal and stress tests", "dcgmi diag -r 3 (or 4 for long)"],
          ["Burn-in", "Several hours at full load, watch temperature and clocks", "stress workload + DCGM logging"],
          ["Interconnect", "All-reduce bandwidth within node and across nodes", "nccl-tests (all_reduce_perf)"],
          ["Network", "Link speed, error counters, RDMA tests", "ib_write_bw, perftest, switch counters"],
          ["Power & thermal", "Power draw vs rating; inlet/outlet temperature; coolant flow", "BMC, PDU, DCIM, CDU readings"],
          ["Acceptance", "Results recorded, baseline stored, ticket closed", "Commissioning report"],
        ]}
        caption="Typical plan. Pass criteria come from the OEM acceptance guide and the project specification."
      />
      <CodeBlock lang="bash" label="Quick health and bandwidth tests">
{`nvidia-smi -L                    # list GPUs and UUIDs
dcgmi diag -r 3                  # medium diagnostic (≈ minutes)
dcgmi diag -r 4                  # long diagnostic with stress

# NCCL collective bandwidth (nccl-tests built separately)
./build/all_reduce_perf -b 8 -e 8G -f 2 -g 8
# Compare busbw with the OEM / vendor expected figure for the same topology.`}
      </CodeBlock>
      <p style={S.p}><strong>Baselines:</strong> Save results for each node. Later, when performance drops, you can compare against the baseline instead of guessing.</p>

      {/* ══════════ 22. MONITORING ══════════ */}
      <h2 id="monitoring" style={S.h2}>Monitoring GPUs</h2>
      <p style={S.p}><strong>DCGM</strong> (Data Center GPU Manager) is the standard telemetry and health tool on NVIDIA systems. The dcgm-exporter publishes metrics to Prometheus, and Grafana draws dashboards. AMD offers ROCm SMI and similar exporters.</p>
      <ComparisonTable
        title="Key GPU Metrics and What They Tell You"
        headers={["Metric", "What it shows", "Watch for"]}
        rows={[
          ["GPU utilisation", "Share of time kernels are running", "Low = starved by data/CPU/network; 100% does not prove efficiency"],
          ["Memory used / free", "VRAM consumption", "Near full = OOM risk"],
          ["Temperature (GPU, memory)", "Die and HBM temperature", "Rising trend, hot-spots, difference between GPUs"],
          ["Power draw and cap", "Watts vs limit", "Pinned at limit = power-capped throttling"],
          ["SM / memory clocks", "Operating frequency", "Drops under load = throttling"],
          ["Throttle reasons", "Why clocks are reduced", "Thermal, power, HW slowdown"],
          ["ECC errors", "Correctable / uncorrectable memory errors, row-remap status", "Rising trend; any uncorrectable"],
          ["XID errors", "Driver-reported GPU faults", "See XID table in troubleshooting"],
          ["NVLink counters", "CRC, replay, recovery errors", "Increasing = bad link or hardware"],
          ["PCIe replay / width", "Link health", "Replays rising or width reduced"],
        ]}
        caption="Alert thresholds should come from OEM/vendor guidance and your own baseline."
      />
      <CodeBlock lang="bash" label="Useful monitoring commands">
{`nvidia-smi                                   # overview
nvidia-smi -q -d TEMPERATURE,POWER,PERFORMANCE   # throttle reasons, clocks
nvidia-smi dmon -s pucvmet                   # live stream of metrics
nvidia-smi -q -d ECC                         # ECC error counters
dmesg -T | grep -i xid                       # XID events from kernel log
dcgmi discovery -l                           # GPUs known to DCGM
dcgmi health -c                              # run quick health check`}
      </CodeBlock>
      <Callout type="important" title="Utilisation is not efficiency">
        nvidia-smi shows 100% utilisation if any kernel runs all the time — even if it uses a tiny share of the SMs. Use profiler metrics (SM occupancy, tensor-core activity, tokens per second, MFU) for real efficiency.
      </Callout>
      <p style={S.p}><strong>Facility side:</strong> Combine GPU metrics with rack power, inlet temperature and coolant flow in <TopicLink slug="dcim" variant="inline" /> and <TopicLink slug="bms" variant="inline" />. See <TopicLink slug="ai-monitoring" variant="inline" /> for monitoring strategy.</p>

      {/* ══════════ 23. MAINTENANCE ══════════ */}
      <h2 id="maintenance" style={S.h2}>Maintenance</h2>
      <ComparisonTable
        title="GPU Infrastructure Maintenance Schedule (example)"
        headers={["Frequency", "Task"]}
        rows={[
          ["Continuous", "DCGM telemetry, alerts on XID / ECC / throttle / NVLink errors"],
          ["Daily", "Check dashboards, failed health checks, stragglers"],
          ["Weekly", "Review correctable-error trends; inspect filters and CDU readings"],
          ["Monthly", "Run DCGM diag on idle nodes; check coolant level, pressure, leak sensors"],
          ["Quarterly", "Clean air filters; inspect fibre ends and optics errors; verify BIOS profile drift"],
          ["Per OEM plan", "Firmware / driver update in staged waves with rollback"],
          ["Annually", "Coolant sample and treatment per OEM; torque / connector inspection; DR drills for node isolation"],
        ]}
        caption="Example only. Actual intervals come from OEM manuals and operating policy."
      />
      <p style={S.p}><strong>Dust and filters:</strong> GPU server fans pull a lot of air. Dust clogs heatsink fins and raises temperature slowly — an easy fault to miss. Keep the white space clean and replace filters on schedule.</p>
      <p style={S.p}><strong>Update philosophy:</strong> Test a new driver/CUDA/firmware combination on a small canary pool with real workloads, then roll out in waves. Keep the last known good image for rollback.</p>
      <p style={S.p}><strong>Spare strategy:</strong> Keep tested spare GPUs, power supplies, fans, optics and cables on site. Lead times for GPUs can be long.</p>

      {/* ══════════ 24. TROUBLESHOOTING ══════════ */}
      <h2 id="troubleshooting" style={S.h2}>Troubleshooting</h2>
      <Figure caption="Fig 9 — GPU troubleshooting flow: alert → are all GPUs visible → XID/ECC errors → throttling → slow-but-healthy checks → fix and validate. Always isolate the node from the scheduler first."><GpuTroubleshootFlow /></Figure>
      <DiagramGuide
        title="How to read Fig 9"
        steps={[
          "Start at the red box: an alert, a failed job or a slow job.",
          "First decision: does nvidia-smi list all GPUs the inventory says should be there? If NO, the GPU fell off the bus (often XID 79). Check in order: power cable, seating and riser, BIOS, BMC log, thermal, then swap the part.",
          "If all GPUs are present, look at the kernel and DCGM logs for XID or ECC errors. Memory or NVLink faults mean: drain the node, reset the GPU, and RMA if the error repeats.",
          "No errors? Check throttle reasons. Thermal, power cap or hardware slowdown points to a cooling or power problem — check inlet temperature, coolant flow, PSUs and power caps.",
          "Still slow but healthy? Look outside the GPU: data loader, NCCL, topology placement, and driver/CUDA version mismatch.",
          "Finish with a validation run (dcgmi diag and nccl-tests) and a proper ticket. Never debug a node that is still taking live jobs.",
        ]}
      />
      <ComparisonTable
        title="Common XID Errors (reference — verify against current NVIDIA documentation)"
        headers={["XID", "Typical meaning", "Usual first action"]}
        rows={[
          ["13, 31", "Application error: illegal instruction, memory fault in user code", "Look at the job/code first, not the GPU"],
          ["48", "Double-bit ECC error (uncorrectable)", "Drain node, reset GPU; replace if it repeats"],
          ["63 / 64", "Row remapping event or failure", "Reset to apply remap; replace if remap fails or spares exhausted"],
          ["74", "NVLink error", "Check NVLink status, cabling/baseboard; reset; RMA if persistent"],
          ["79", "GPU has fallen off the bus", "Power, seating, PCIe, thermal, BIOS; reboot; replace if repeated"],
          ["94 / 95", "Contained / uncontained ECC error", "Follow vendor guidance; restart jobs; replace if frequent"],
        ]}
        caption="XID meanings can change between driver versions. Use this as a starting guide only."
      />
      <ComparisonTable
        title="Symptom → Likely Cause → First Check"
        headers={["Symptom", "Likely cause", "First check"]}
        rows={[
          ["GPU missing from nvidia-smi", "Seating, power cable, PCIe fault, dead GPU", "BMC log, dmesg, reseat / swap"],
          ["Low PCIe width or gen", "Riser, dust, loose card, BIOS", "nvidia-smi pcie query under load, reseat"],
          ["Training slower than baseline", "Throttling, bad NVLink, data loader, NCCL path", "Throttle reasons, topo -m, nccl-tests"],
          ["One GPU slower than others", "Thermal paste, fan or coolant flow, power cap", "Compare temp and clocks across GPUs"],
          ["CUDA OOM", "Model/batch too large, memory leak, other process", "nvidia-smi memory, process list, reduce batch"],
          ["Multi-node job hangs or slow", "Link flap, bad optic, NCCL misconfig, congestion", "Switch counters, NCCL_DEBUG logs, link error counters"],
          ["Node reboots under load", "PSU / power limit, thermal trip", "BMC SEL, PSU status, PDU load"],
          ["GPU errors after driver update", "Version mismatch with fabric manager or CUDA", "Check driver / fabric manager / CUDA matrix, roll back"],
        ]}
        caption="Start with the simplest and cheapest check first."
      />
      <CodeBlock lang="bash" label="First-response commands on a suspect GPU node">
{`nvidia-smi -L                       # are all GPUs there?
dmesg -T | grep -iE "xid|nvrm|nvlink"
nvidia-smi -q -d ECC,TEMPERATURE,PERFORMANCE | less
nvidia-smi topo -m
ipmitool sel list | tail -20        # BMC events: PSU, thermal, power
dcgmi diag -r 2                     # quick diagnostic once node is isolated`}
      </CodeBlock>
      <Callout type="best-practice" title="Isolate first, debug second">
        Cordon/drain the node in Kubernetes or Slurm before any reset or test. Running a stress test on a node that still serves a customer job causes a second outage.
      </Callout>

      {/* ══════════ 25. FAILURE SCENARIOS ══════════ */}
      <h2 id="failure-scenarios" style={S.h2}>Failure Scenarios</h2>
      <h3 style={S.h3}>Scenario 1 — A GPU falls off the bus mid-training</h3>
      <p style={S.p}>XID 79 appears and one GPU vanishes from nvidia-smi. The job crashes because all ranks wait for the lost one. Scheduler requeues the job from the last checkpoint on healthy nodes. The bad node is drained; engineers check power cables, seating, riser and BMC log, reboot, and run diagnostics. If it repeats, the GPU is replaced.</p>
      <h3 style={S.h3}>Scenario 2 — Cooling loop pump failure</h3>
      <p style={S.p}>A CDU pump fails. Redundant pump takes over if the design has N+1 pumps; if not, coolant flow drops and GPU temperature rises quickly. Thermal throttling starts, then GPUs trip to protect themselves. Alarms from the CDU and BMS should warn before that. Operators reduce load (power capping, draining nodes), restore flow and inspect before returning to service.</p>
      <h3 style={S.h3}>Scenario 3 — Leak alarm in a liquid-cooled rack</h3>
      <p style={S.p}>A leak rope triggers. The runbook says: confirm alarm, isolate the rack loop valves, gracefully power down affected servers, check for liquid, dry and inspect, pressure-test, then restore. The point of the design is to turn a potential disaster into a planned maintenance.</p>
      <h3 style={S.h3}>Scenario 4 — Power swing trips a UPS</h3>
      <p style={S.p}>Thousands of GPUs finish a training step and checkpoint at the same time; load swings by hundreds of kW in milliseconds. If UPS and generator design do not tolerate these swings, they can alarm or transfer. Mitigation: power capping, staggered checkpoints, load-smoothing features and correctly sized UPS — see <TopicLink slug="ups" variant="inline" />.</p>
      <h3 style={S.h3}>Scenario 5 — Silent slowdown from a dirty optic</h3>
      <p style={S.p}>One dirty fibre end causes link errors and retransmits on a single rail. No GPU alarm fires, but every all-reduce waits for the slow link and the 512-GPU job runs 15% slower. Switch error counters and NCCL benchmarks find it; cleaning or replacing the optic fixes it.</p>
      <Callout type="interview" title="Failure mindset">
        At scale, failure is normal. Good AI infrastructure assumes parts will fail, detects them fast, isolates them automatically and keeps the rest of the cluster working.
      </Callout>

      {/* ══════════ 26. TIER III / IV ══════════ */}
      <h2 id="tier-iii-iv-view" style={S.h2}>Tier III and Tier IV View</h2>
      <p style={S.p}>Tier classification describes facility infrastructure redundancy — power paths, cooling and maintainability. It does not describe how many GPUs fail or whether a training job survives. Still, GPU load stresses every Tier requirement.</p>
      <ComparisonTable
        title="GPU Infrastructure — Tier III vs Tier IV Thinking"
        headers={["Area", "Tier III thinking", "Tier IV thinking"]}
        rows={[
          ["Power to GPU racks", "N+1 UPS, concurrently maintainable; dual feed to servers with redundant PSUs", "2N (A/B fully independent) so a path fault does not drop servers"],
          ["Cooling", "N+1 chillers, pumps and CDUs; maintain without shutdown", "Fault tolerant: duplicated loops and independent paths"],
          ["Liquid cooling", "Redundant CDU pumps; isolation valves for maintenance", "Independent CDU/loop sets, automated failover"],
          ["Network fabric", "Redundant spines and uplinks", "Fully diverse fabric paths"],
          ["Monitoring", "Alarms on leak, flow, temperature, power", "Same, plus automated protective actions"],
        ]}
        caption="Conceptual view only. Many AI training clusters accept lower redundancy than enterprise sites and rely on checkpointing instead; inference and customer-facing services usually need higher redundancy."
      />
      <p style={S.p}><strong>Practical reality:</strong> A 30–100 kW rack at 2N power doubles the electrical and UPS investment. Operators choose redundancy per workload: training clusters often accept N+1 or less and recover through checkpoints, while inference and critical services use higher resilience.</p>
      <p style={S.p}><strong>Dual PSU power:</strong> GPU servers have several PSUs in N+N or N+1 configuration, fed from A and B power paths. Make sure the combined load still fits one path if the other fails.</p>
      <p style={S.p}>Actual implementation depends on project requirements, utility requirements, OEM design and data center architecture — always verify with vendor documentation. Related facility topics: <TopicLink slug="data-center-types" variant="inline" />.</p>

      {/* ══════════ 27. SAFETY ══════════ */}
      <h2 id="safety-practices" style={S.h2}>Safety Practices</h2>
      <ul style={S.ul}>
        <li><strong>Electrical:</strong> High-current feeds and PSUs. Follow lock-out/tag-out (LOTO), verify de-energised, wait for discharge time and use rated tools.</li>
        <li><strong>Lifting:</strong> 8-GPU servers weigh 100 kg or more. Use lifts, rated rails and enough people; never lift alone.</li>
        <li><strong>ESD:</strong> Use wrist straps and antistatic mats when touching GPU boards and modules.</li>
        <li><strong>Hot surfaces:</strong> GPU heatsinks can burn. Let them cool before handling after shutdown.</li>
        <li><strong>Liquid cooling:</strong> Know the coolant type (often glycol-based), wear PPE per MSDS, keep absorbent material and leak kits, know the isolation valves, never open couplings under pressure unless trained.</li>
        <li><strong>Water and electricity:</strong> Treat any leak as an electrical hazard. De-energise the affected area before cleanup.</li>
        <li><strong>Noise:</strong> GPU server rooms are very loud. Use hearing protection.</li>
        <li><strong>Fibre optics:</strong> Never look into a live fibre or transceiver port; laser power can harm eyes.</li>
        <li><strong>Change control:</strong> Firmware, BIOS and driver changes follow approved procedures with rollback.</li>
      </ul>

      {/* ══════════ 28. OEM ══════════ */}
      <h2 id="oem-reference" style={S.h2}>OEMs and Reference Platforms</h2>
      <ComparisonTable
        title="GPU Ecosystem — Who Makes What"
        headers={["Layer", "Examples", "Role"]}
        rows={[
          ["GPU / accelerator silicon", "NVIDIA, AMD, Intel", "Chip, firmware, driver, SDKs"],
          ["Reference baseboard / system", "NVIDIA HGX / DGX, AMD Instinct platform on OCP UBB, Intel Gaudi systems", "Validated GPU baseboards and designs"],
          ["Server OEMs", "Dell, HPE, Supermicro, Lenovo, Cisco, Inspur, Gigabyte and others", "Complete servers, firmware, support and warranty"],
          ["Network fabric", "NVIDIA (InfiniBand / Spectrum-X), Arista, Cisco, Broadcom-based switches", "Compute fabric"],
          ["Cooling", "CDU and DLC vendors, rear-door heat exchanger makers", "Liquid and heat rejection systems"],
          ["Cloud providers", "AWS, Azure, GCP and others", "Rent GPUs by the hour — see cloud topics"],
        ]}
        caption="Illustrative, not exhaustive, and not an endorsement. Always check vendor compatibility lists."
      />
      <p style={S.p}>Use the OEM's validated configurations and compatibility matrices. Mixing unlisted GPUs, NICs and firmware voids support and risks instability. For cloud alternatives see <TopicLink slug="aws" variant="inline" />, <TopicLink slug="azure" variant="inline" /> and <TopicLink slug="gcp" variant="inline" />.</p>

      {/* ══════════ 29. MISCONCEPTIONS ══════════ */}
      <h2 id="misconceptions" style={S.h2}>Common Misconceptions</h2>
      <ul style={S.ul}>
        <li><strong>"More GPUs always means faster."</strong> Only if network, data pipeline and software scale. Poor scaling can leave GPUs idle.</li>
        <li><strong>"100% GPU utilisation means we are efficient."</strong> It only means a kernel is running. Check real throughput and tensor-core use.</li>
        <li><strong>"Liquid cooling means no air cooling."</strong> Most DLC servers still need air for other parts.</li>
        <li><strong>"Any GPU fits any server."</strong> Power, cooling, firmware, form factor and PCIe lanes must all match the OEM design.</li>
        <li><strong>"Inference needs fewer resources so it is simple."</strong> KV-cache, latency targets and scale make inference infrastructure hard too.</li>
        <li><strong>"PCIe GPUs and SXM GPUs of the same generation perform the same."</strong> Power limits and interconnect differ, and so does performance.</li>
        <li><strong>"GPU errors are always hardware faults."</strong> Many XIDs come from application bugs, driver mismatches or power/cooling issues.</li>
      </ul>

      {/* ══════════ 30. FUTURE TRENDS ══════════ */}
      <h2 id="future-trends" style={S.h2}>Future Trends</h2>
      <ul style={S.ul}>
        <li><strong>Rack-scale systems:</strong> A whole rack designed as one accelerator with a large NVLink domain and integrated liquid cooling.</li>
        <li><strong>Higher densities:</strong> 100 kW to several hundred kW per rack, making liquid cooling the default.</li>
        <li><strong>Faster interconnects:</strong> Next-generation NVLink, 800G/1.6T networking, co-packaged optics.</li>
        <li><strong>More memory:</strong> Larger and faster HBM generations, plus CXL memory pooling for host memory.</li>
        <li><strong>Lower precision:</strong> FP8, FP4 and mixed formats for faster, cheaper training and inference.</li>
        <li><strong>Custom silicon:</strong> TPUs and in-house accelerators sit beside GPUs — see <TopicLink slug="ai-accelerators" variant="inline" />.</li>
        <li><strong>Power constraints:</strong> Grid availability is becoming the main limit — on-site generation, battery smoothing and efficiency focus.</li>
        <li><strong>Heat reuse and efficiency:</strong> Warm-water cooling and heat recovery to improve PUE and sustainability.</li>
        <li><strong>Automation:</strong> Automated health checks, predictive failure analytics and self-healing schedulers.</li>
      </ul>

      {/* ══════════ 31. LEARNING PATH ══════════ */}
      <h2 id="learning-path" style={S.h2}>Learning Path</h2>
      <p style={S.p}>Recommended order to go deeper after this article:</p>
      <ul style={S.ul}>
        <li><TopicLink slug="server-basics" variant="inline" /> → <TopicLink slug="cpu" variant="inline" /> → <TopicLink slug="ram" variant="inline" /> → this GPU article.</li>
        <li>Next in the Servers group: <TopicLink slug="blade-server" variant="inline" /> and <TopicLink slug="virtualization" variant="inline" />.</li>
        <li>AI track: <TopicLink slug="what-is-ai-infrastructure" variant="inline" /> → <TopicLink slug="ai-gpu" variant="inline" /> → <TopicLink slug="gpu-cluster" variant="inline" /> → <TopicLink slug="ai-networking" variant="inline" /> → <TopicLink slug="ai-cooling" variant="inline" />.</li>
        <li>Facility track: <TopicLink slug="pdu" variant="inline" />, <TopicLink slug="ups" variant="inline" />, <TopicLink slug="chiller" variant="inline" />, <TopicLink slug="containment" variant="inline" />.</li>
      </ul>

      {/* ══════════ 32. INTERVIEW ══════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: Why are GPUs better than CPUs for AI?</h3>
      <p style={S.p}><strong>Answer:</strong> AI is mostly matrix multiplication, which can be split into thousands of independent operations. GPUs have thousands of simple cores, tensor cores and very high memory bandwidth, so they finish far more of these operations per second than CPUs.</p>
      <h3 style={S.h3}>Q2: How much memory does it take to train a 7B model?</h3>
      <p style={S.p}><strong>Answer:</strong> About 16 bytes per parameter with mixed precision and Adam — roughly 112 GB — plus activations. So it does not fit one 80 GB GPU without sharding.</p>
      <h3 style={S.h3}>Q3: NVLink vs PCIe?</h3>
      <p style={S.p}><strong>Answer:</strong> PCIe connects the GPU to the host and NICs; NVLink connects GPUs to each other at much higher bandwidth. NVSwitch makes the NVLink fabric all-to-all inside a node.</p>
      <h3 style={S.h3}>Q4: What does nvidia-smi topo -m show?</h3>
      <p style={S.p}><strong>Answer:</strong> The connectivity matrix between GPUs and NICs — NV# for NVLink, PIX/PXB for PCIe switches, NODE and SYS for host and cross-socket paths. It helps with placement and diagnosing slow communication.</p>
      <h3 style={S.h3}>Q5: Why must cooling design change for GPU racks?</h3>
      <p style={S.p}><strong>Answer:</strong> Density goes from about 5–10 kW to 30–100+ kW per rack. Air alone cannot remove that heat reliably, so rear-door heat exchangers or direct liquid cooling with CDUs are used.</p>
      <h3 style={S.h3}>Q6: What is XID 79?</h3>
      <p style={S.p}><strong>Answer:</strong> The GPU has fallen off the PCIe bus. Check power, seating, risers, BIOS and BMC logs, then replace if it repeats.</p>
      <h3 style={S.h3}>Q7: What is MIG?</h3>
      <p style={S.p}><strong>Answer:</strong> Multi-Instance GPU partitions one GPU in hardware into several isolated instances, each with its own memory and compute — good for multi-tenant inference.</p>
      <h3 style={S.h3}>Q8: One GPU is slower than the rest in a 512-GPU job. What happens?</h3>
      <p style={S.p}><strong>Answer:</strong> Synchronous training waits for the slowest rank every step, so the whole job slows. Find it through temperature, clocks and throttle reasons, isolate the node and fix or replace.</p>

      {/* ══════════ 33. KEY TAKEAWAYS ══════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>A GPU is a throughput machine: thousands of simple cores plus tensor cores and very fast HBM.</li>
        <li>Memory decides what fits: ≈16 bytes per parameter for training, ≈2 bytes or less for inference weights.</li>
        <li>Choose precision (BF16, FP8, INT8) deliberately — it changes memory, speed and accuracy.</li>
        <li>PCIe for host and NIC traffic, NVLink/NVSwitch inside the node, InfiniBand or RoCE between nodes; the slowest link sets the speed.</li>
        <li>Placement matters: NUMA, PCIe switch and NIC affinity affect real performance.</li>
        <li>GPU racks reach 30–100+ kW; power chain, breakers, UPS and floor loading must be planned together.</li>
        <li>High density needs rear-door or direct liquid cooling; keep coolant quality, flow and leak detection under control.</li>
        <li>Version-match firmware, driver, fabric manager, CUDA and frameworks; keep a golden image.</li>
        <li>Monitor with DCGM; trend ECC, XID, throttle and NVLink errors, and remember utilisation is not efficiency.</li>
        <li>Isolate a node before debugging; burn-in and baseline every new or repaired GPU.</li>
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
        <li><TopicLink slug="cpu" variant="inline" /> — The host processor that feeds the GPU.</li>
        <li><TopicLink slug="ram" variant="inline" /> — System memory and staging data.</li>
        <li><TopicLink slug="server-basics" variant="inline" /> — Server component overview.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — Dense shared-chassis compute.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — Virtual machines and GPU sharing concepts.</li>
        <li><TopicLink slug="gpu-cluster" variant="inline" /> — Cluster-level GPU design.</li>
        <li><TopicLink slug="ai-cooling" variant="inline" /> — Cooling for AI infrastructure.</li>
        <li><TopicLink slug="ai-networking" variant="inline" /> — Networking for AI clusters.</li>
      </ul>
    </>
  );
}
