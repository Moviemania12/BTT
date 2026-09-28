"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { aiAcceleratorsContent } from "@/content/ai-accelerators";

import AcceleratorLandscape from "../svg/AcceleratorLandscape";
import NpuArchitecture from "../svg/NpuArchitecture";
import FpgaVsAsic from "../svg/FpgaVsAsic";
import AwsChipsDiagram from "../svg/AwsChipsDiagram";
import IntelGaudiDiagram from "../svg/IntelGaudiDiagram";
import CerebrasDiagram from "../svg/CerebrasDiagram";
import DpuDataCenter from "../svg/DpuDataCenter";
import TrainingVsInferenceHW from "../svg/TrainingVsInferenceHW";
import CustomSiliconStrategy from "../svg/CustomSiliconStrategy";
import AiAcceleratorDcPower from "../svg/AiAcceleratorDcPower";

void aiAcceleratorsContent;

export default function Content() {
  return (
    <article>

      {/* ── QUICK SUMMARY ──────────────────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          GPU is just one option for AI — but not the only one. As of 2024, the AI hardware landscape has many players: the NPU is in your phone (that's what runs Face ID), the DPU is in your data center network (manages data flow), the FPGA is a reprogrammable chip (a researcher's best friend), the ASIC is a permanently optimized chip (the hyperscaler's choice), and then there are custom chips — AWS Trainium, Intel Gaudi, Cerebras, Graphcore — each with its own distinct approach.
        </p>
        <p style={S.p}>
          This article explains all of them in one place — from beginner to engineer level. What each chip does, when to use it, how it's deployed in a data center, what power and cooling it needs — everything.
        </p>
        <Callout type="important" title="Ek Line Reality Check">
          NVIDIA GPU is and will remain the dominant choice for AI infrastructure — but blindly choosing a GPU is a mistake. The right chip selection depends on use case, scale, framework, and budget. This article will help you make that decision confidently.
        </Callout>
      </section>

      {/* ── WHO SHOULD READ ────────────────────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>AI/ML Engineers:</strong> Understanding GPU alternatives — when to consider AWS Trainium, Intel Gaudi, or Cloud TPU, and when simply sticking with GPU is the right call.</li>
          <li><strong>Data Center Engineers:</strong> Power, cooling, networking, and rack density requirements of different accelerators — concrete numbers for planning.</li>
          <li><strong>Cloud/Infrastructure Architects:</strong> Training vs inference hardware selection, multi-chip scale-out design, software stack compatibility.</li>
          <li><strong>Product Managers and Technical Architects:</strong> Custom silicon strategy — when buying a GPU is right, and when FPGA or ASIC development is justified.</li>
          <li><strong>Students and Freshers:</strong> The complete landscape of AI hardware — in one place, in simple language.</li>
        </ul>
      </section>

      {/* ── WHAT YOU WILL LEARN ────────────────────────────────────────── */}
      <section id="what-you-will-learn">
        <h2 style={S.h2}>What You Will Learn</h2>
        <ul style={S.ul}>
          <li>AI accelerator landscape — from CPU to ASIC, an overview of all types</li>
          <li>NPU (Neural Processing Unit) — how AI works on your phone</li>
          <li>DPU (Data Processing Unit) — the AI data flow manager in the data center</li>
          <li>FPGA for AI — a reprogrammable chip, when to use it</li>
          <li>ASIC design philosophy — when custom silicon is justified</li>
          <li>AWS Trainium and Inferentia — Amazon's custom AI chips</li>
          <li>Intel Gaudi 3 — H100 alternative, real comparison</li>
          <li>Cerebras WSE — wafer-scale chip, unique architecture</li>
          <li>Graphcore IPU — different approach to AI compute</li>
          <li>SambaNova — enterprise on-premises AI system</li>
          <li>Edge AI chips — on-device inference landscape</li>
          <li>Training vs inference hardware differences</li>
          <li>Data center deployment — power, cooling, networking per chip type</li>
          <li>Custom silicon strategy — GPU vs build your own decision</li>
          <li>Software ecosystem — CUDA dominance and alternatives</li>
          <li>Cost and TCO analysis</li>
        </ul>
      </section>

      {/* ── LEARNING PATH ──────────────────────────────────────────────── */}
      <section id="learning-path">
        <h2 style={S.h2}>Learning Path</h2>
        <ul style={S.ul}>
          <li><strong>Previous:</strong> <TopicLink slug="tpu" variant="inline" /> — Google TPU, Systolic Array, TPU Pod, Cloud TPU</li>
          <li><strong>Before that:</strong> <TopicLink slug="ai-gpu" variant="inline" /> — NVIDIA GPU architecture, CUDA, Tensor Cores, HBM</li>
          <li><strong>Current:</strong> AI Accelerators — NPU, DPU, FPGA, ASIC, AWS chips, Intel Gaudi, Cerebras, alternatives</li>
          <li><strong>Related:</strong> <TopicLink slug="what-is-ai-infrastructure" variant="inline" />, <TopicLink slug="deep-learning" variant="inline" />, <TopicLink slug="llm" variant="inline" /></li>
        </ul>
      </section>

      {/* ── INTRODUCTION ───────────────────────────────────────────────── */}
      <section id="introduction">
        <h2 style={S.h2}>Introduction</h2>
        <p style={S.p}>
          In 2012, AlexNet won the ImageNet competition and the era of GPU-based deep learning began. Since then, a simple assumption took hold in the AI world: AI = NVIDIA GPU.
        </p>
        <p style={S.p}>
          That assumption isn't accurate anymore, in 2024. Today your phone has an Apple Neural Engine (for on-device AI), your data center server has an NVIDIA BlueField DPU (for network offload), AWS's cloud has Trainium chips (for training), and Google's racks have TPUs (for Gemini). All of these are "AI accelerators" — but they're all completely different.
        </p>
        <p style={S.p}>
          <strong>Simple question:</strong> In any AI system, why is computation slow? Because a regular chip — the CPU — does one thing at a time (sequential), but AI math (matrix multiplication) needs millions of calculations done at once (parallel). An AI accelerator is a chip built to do parallel math efficiently.
        </p>
        <p style={S.p}>
          But "efficiently" means something different for different chips. A GPU does it efficiently through thousands of CUDA cores. A TPU does it efficiently through a systolic array. An NPU does it efficiently through a low-power fixed pipeline. Each approach has its tradeoffs.
        </p>
        <Callout type="best-practice" title="Why This Matters for Data Center Engineers">
          Each different accelerator type has different power requirements, cooling methods, network interfaces, and rack footprints. GPU server: ~10 kW per chassis, liquid cooling recommended. TPU Pod: 40-100 kW per rack, liquid mandatory. NPU: milliwatts, fan-less. You need to understand all of these because future DC infrastructure will host a mix of these chips.
        </Callout>
      </section>

      {/* ── WHY ACCELERATORS EXIST ─────────────────────────────────────── */}
      <section id="why-accelerators-exist">
        <h2 style={S.h2}>Why AI Accelerators Exist</h2>
        <p style={S.p}>
          <strong>Simple answer:</strong> The CPU is too slow and power-hungry for AI math at scale.
        </p>
        <p style={S.p}>
          <strong>Concrete example:</strong> On a smartphone, the Apple Neural Engine does a Face ID recognition in ~1 millisecond using &lt;1 Watt. If you did the same job on a CPU — 100+ milliseconds and 5+ Watts. The battery would drain within an hour.
        </p>
        <p style={S.p}>
          At cloud scale: processing one Google Search query = dozens of neural network operations. Google handles billions of queries a day. Doing this on standard CPUs: you'd need thousands of servers, expensive and energy-intensive. Doing it on Google TPU: a fraction of the servers, a fraction of the electricity.
        </p>
        <p style={S.p}>
          <strong>Three reasons AI accelerators dominate:</strong>
        </p>
        <ul style={S.ul}>
          <li><strong>Parallelism:</strong> AI math = same operation on many data points simultaneously. CPU: 8-128 cores. GPU: 10,000+ cores. NPU: dedicated parallel pipelines. Accelerators win.</li>
          <li><strong>Memory bandwidth:</strong> AI operations need to read/write model weights rapidly. CPU uses DDR5 (~100 GB/s). GPU uses HBM3 (~3.35 TB/s). 33× faster memory access = 33× less waiting.</li>
          <li><strong>Specialization:</strong> CPU die area goes into: branch prediction, out-of-order execution, large caches — all for general purpose. AI accelerator die area: mostly matrix multiply units. Specialization = efficiency for the target workload.</li>
        </ul>
      </section>

      {/* ── ACCELERATOR LANDSCAPE ──────────────────────────────────────── */}
      <section id="accelerator-landscape">
        <h2 style={S.h2}>The AI Accelerator Landscape</h2>
        <p style={S.p}>
          Let's start with an overview — all the types in one place.
        </p>
        <Figure caption="The AI Accelerator Landscape: from general-purpose CPU to extreme-specialist Custom ASICs. GPU is the sweet spot for most teams. Custom ASICs (TPU, Trainium, Inferentia) only make sense at hyperscaler scale (billions of queries/day). NPU handles on-device AI. DPU handles data movement.">
          <AcceleratorLandscape />
        </Figure>
        <p style={S.p}>
          <strong>The spectrum — from flexible to specialist:</strong>
        </p>
        <ul style={S.ul}>
          <li><strong>CPU (Central Processing Unit):</strong> Maximum flexibility, minimum AI efficiency. Every computer has one. It works for AI but slowly and expensively at scale.</li>
          <li><strong>GPU (Graphics Processing Unit):</strong> The AI workhorse. Originally for graphics (pixels), repurposed for AI (parallel math). The CUDA ecosystem made it the default for AI.</li>
          <li><strong>TPU (Tensor Processing Unit):</strong> Google's matrix multiply specialist. (Covered in detail in previous article — <TopicLink slug="tpu" variant="inline" />)</li>
          <li><strong>NPU (Neural Processing Unit):</strong> A low-power mobile/edge AI engine. It's in your phone. This article covers it in detail.</li>
          <li><strong>DPU (Data Processing Unit):</strong> A network + storage I/O specialist. Lifts the burden off the CPU and GPU. This article covers it in detail.</li>
          <li><strong>FPGA (Field Programmable Gate Array):</strong> Reprogrammable chip. Flexible but complex to program. Detailed coverage in this article.</li>
          <li><strong>ASIC (Application Specific Integrated Circuit):</strong> Permanently optimized chip for one job. Maximum efficiency, zero flexibility. AWS Trainium, Intel Gaudi, Cerebras — all ASICs.</li>
        </ul>
      </section>

      {/* ── NPU ────────────────────────────────────────────────────────── */}
      <section id="npu">
        <h2 style={S.h2}>NPU — Neural Processing Unit</h2>
        <p style={S.p}>
          <strong>NPU (Neural Processing Unit)</strong> — this is the chip that unlocks your phone with face recognition, listens for "Hey Siri" or "OK Google" for your voice assistant, detects the scene in your camera, and does real-time translation — all without going to the cloud, in milliseconds, barely using any battery.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> A GPU is a powerful factory — thousands of workers, high electricity, a big building. An NPU is a specialized small workshop — a few dedicated workers, low electricity, compact space. The factory can produce more, but the workshop does its specific job very efficiently and fits in your bag.
        </p>
        <Figure caption="NPU (Neural Processing Unit) inside a mobile SoC (System on Chip): MAC Array does AI math, SRAM is fast on-chip memory, DMA Engine moves data efficiently, Scheduler manages tasks, and Power Manager keeps battery drain minimal at 1-5 Watts — vs cloud GPU at 300-700 Watts.">
          <NpuArchitecture />
        </Figure>
        <p style={S.p}>
          <strong>How an NPU works — technically:</strong> An NPU has a <strong>MAC Array (Multiply-Accumulate Array)</strong> — the hardware that does matrix multiplication, the same job as a GPU's Tensor Core or a TPU's MXU, but much smaller and lower power. On-chip SRAM (fast local memory) stores the important parts of model weights so slow DRAM access is minimized. A DMA Engine (Direct Memory Access — a dedicated data mover) loads/stores data in the background while the MAC Array is computing.
        </p>
        <ul style={S.ul}>
          <li><strong>Apple Neural Engine (ANE):</strong> In Apple's A-series and M-series chips. A17 Pro: 35 TOPS (Tera Operations Per Second — trillion operations/second). Face ID, Siri, on-device ML all run here. INT8 precision.</li>
          <li><strong>Qualcomm Hexagon NPU:</strong> In Snapdragon chipsets (Samsung, OnePlus, Motorola Android phones). Hexagon AI engine with a dedicated DSP (Digital Signal Processor). 73 TOPS on the latest Snapdragon 8 Gen 3.</li>
          <li><strong>Google Tensor chip:</strong> In Pixel phones. Custom designed by Google. Tight integration with Google's TFLite models (speech recognition, photo processing).</li>
          <li><strong>MediaTek APU:</strong> In budget Android phones. APU (AI Processing Unit) is MediaTek's NPU variant. 5-45 TOPS depending on chip tier.</li>
          <li><strong>Samsung Exynos NPU:</strong> Samsung's own phones (Korea, some markets). Neural processing unit with Samsung's One UI AI features.</li>
        </ul>
        <Callout type="best-practice" title="DC Engineer Perspective: Why NPUs Matter for Data Centers">
          The edge AI revolution is driven by the NPU. In future DC architecture: not everything will go to the cloud. Time-sensitive inference (a factory robot's reaction, an autonomous vehicle, a real-time security camera), privacy-sensitive inference (a medical device, a financial transaction), and bandwidth-constrained inference (a remote location) will all happen on-device via NPU. DC engineers design hybrid systems: the NPU handles first-pass inference on the device, complex cases escalate to a cloud GPU.
        </Callout>
      </section>

      {/* ── DPU ────────────────────────────────────────────────────────── */}
      <section id="dpu">
        <h2 style={S.h2}>DPU — Data Processing Unit</h2>
        <p style={S.p}>
          <strong>DPU (Data Processing Unit)</strong> — this doesn't do AI compute directly. But it solves a hidden bottleneck for AI workloads. It's important to understand.
        </p>
        <p style={S.p}>
          <strong>The problem it solves:</strong> In a GPU training job, the GPU only does the AI math. But before the AI math — data has to be loaded from storage, gradients have to be synced over the network (distributed training), TLS/SSL security has to be handled, load balancing has to be managed. Traditionally, the CPU does all of this. In a busy GPU cluster, the CPU stays so busy with these I/O tasks that preparing the data pipeline for the GPU falls behind — the GPU waits. A $30,000 GPU sits idle waiting on the CPU.
        </p>
        <p style={S.p}>
          <strong>The DPU's solution:</strong> Turn the network card (NIC) into a full processor. A DPU is a network card with an ARM processor, dedicated network acceleration, and storage engines on it. It takes all the I/O tasks off the CPU — network, storage, security. The CPU is freed up for GPU orchestration. The GPU stays continuously fed. A 10-20% training speedup just from I/O offload.
        </p>
        <Figure caption="DPU (Data Processing Unit) in an AI Data Center: Without DPU, CPU wastes 30-40% time on network/storage I/O, and GPU sits idle waiting for data. With DPU, all I/O is offloaded to the DPU — CPU manages GPU orchestration, GPU does AI compute 85-95% of the time.">
          <DpuDataCenter />
        </Figure>
        <ul style={S.ul}>
          <li><strong>NVIDIA BlueField-3 DPU:</strong> The most widely deployed. 400 GbE networking, ARM Cortex cores onboard, DOCA software framework. Direct integration with NVIDIA GPU servers (optional BlueField in the DGX H100). NVIDIA&apos;s vision: every AI server has a DPU.</li>
          <li><strong>Marvell OCTEON:</strong> Enterprise networking DPU. Strong in telecom and cloud provider deployments. Lower power than BlueField.</li>
          <li><strong>Intel IPU (Infrastructure Processing Unit):</strong> Intel's DPU equivalent. Integrated with the Intel Xeon ecosystem. The Mount Evans IPU is specifically for cloud-scale infrastructure offload.</li>
          <li><strong>Fungible DPU (acquired by Microsoft):</strong> Microsoft acquired Fungible (2023) — expect Azure-specific DPU deployments.</li>
        </ul>
        <Callout type="important" title="When DPU Makes Sense — and When It Doesn't">
          DPU ROI is positive for: large GPU clusters (16+ GPUs), high-throughput distributed training, multi-tenant GPU serving (where isolation matters), security-sensitive AI workloads. DPU is overkill for: single GPU workstations, small teams, research experiments. Practical threshold: if your AI cluster has 8+ GPU nodes doing distributed training, DPU investment is worth evaluating.
        </Callout>
      </section>

      {/* ── FPGA FOR AI ────────────────────────────────────────────────── */}
      <section id="fpga-for-ai">
        <h2 style={S.h2}>FPGA for AI — The Reprogrammable Chip</h2>
        <p style={S.p}>
          <strong>FPGA (Field Programmable Gate Array)</strong> — a chip you can reprogram through software. "Field Programmable" means: even after it leaves the factory, even after it's deployed in the field, you can still change its logic.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> An FPGA is a whiteboard. You write something, erase it, write something else. A completely new thing every time. An ASIC is a printed book — once printed it can't be changed, but reading it is very fast. An FPGA is flexible like a whiteboard, an ASIC is efficient like a printed book.
        </p>
        <p style={S.p}>
          <strong>How it works, technically:</strong> An FPGA has thousands of <strong>LUTs (Look-Up Tables — reprogrammable logic blocks)</strong> connected in a grid. You use <strong>HDL (Hardware Description Language — like VHDL or Verilog)</strong> or modern high-level tools (Intel HLS, Xilinx HLS — High Level Synthesis) to define how these LUTs should behave. Once loaded, the FPGA runs that custom logic — at the hardware level, very fast.
        </p>
        <Figure caption="FPGA (Reprogrammable Chip — like a whiteboard, change anytime) vs ASIC (Permanent Custom Chip — like a printed book, fixed forever but very efficient). FPGA: faster to market, flexible, higher cost per unit. ASIC: 18-24 months design time, $10M+ upfront, but 5-10x cheaper per unit at scale and 3-5x more power efficient.">
          <FpgaVsAsic />
        </Figure>
        <p style={S.p}>
          <strong>When FPGA is used for AI:</strong>
        </p>
        <ul style={S.ul}>
          <li><strong>Low-latency inference:</strong> The FPGA's pipelined architecture makes microsecond-level inference possible — faster than a GPU for some specific tasks. High-frequency trading firms run AI inference on FPGA for sub-millisecond decisions.</li>
          <li><strong>Edge deployment:</strong> The FPGA's configurable power profile allows much less power than a GPU. FPGAs are common in industrial IoT, medical devices, and defense systems.</li>
          <li><strong>Algorithm prototyping:</strong> Validate the algorithm on an FPGA before building an ASIC. Much cheaper than building the wrong ASIC.</li>
          <li><strong>Custom data pipelines:</strong> Real-time data preprocessing (video stream, sensor data) — a custom FPGA pipeline is very efficient for this.</li>
          <li><strong>Protocol flexibility:</strong> For network protocols that a CPU/GPU can't handle efficiently, an FPGA can implement custom hardware.</li>
        </ul>
        <ComparisonTable
          title="Major FPGA Vendors for AI"
          headers={["Vendor", "Key Product", "Strength", "Typical AI Use"]}
          rows={[
            ["AMD/Xilinx", "Alveo U250, Versal", "AI Engine embedded, Python support (Vitis AI)", "Inference acceleration, video analytics"],
            ["Intel/Altera", "Stratix 10, Agilex", "Intel ecosystem integration, OpenCL support", "Network processing, cloud FPGA"],
            ["Lattice", "ECP5, Nexus", "Low-power, small form factor", "Edge AI, IoT, always-on inference"],
            ["Microchip/Microsemi", "PolarFire", "Ultra-low power, radiation tolerant", "Defense, aerospace, medical"],
          ]}
        />
      </section>

      {/* ── ASIC FOR AI ────────────────────────────────────────────────── */}
      <section id="asic-for-ai">
        <h2 style={S.h2}>ASIC — Custom Silicon for AI</h2>
        <p style={S.p}>
          <strong>ASIC (Application Specific Integrated Circuit)</strong> — a chip permanently designed for one specific job. "Application Specific" = for just one application. "Integrated Circuit" = everything on one silicon chip.
        </p>
        <p style={S.p}>
          Google TPU is an ASIC — optimized only for matrix multiplication. AWS Trainium is an ASIC — only for neural network training. Apple's A17 Neural Engine is an ASIC — only for on-device AI inference.
        </p>
        <p style={S.p}>
          <strong>Why ASIC is the ultimate chip (for the right use case):</strong> When a chip does only one job, every transistor for that job can be perfectly placed. No wasted space — no area reserved for general-purpose circuits. Result: 3-5x more power efficient than FPGA, 5-10x lower cost per unit at scale than FPGA, maximum performance for that specific workload.
        </p>
        <ul style={S.ul}>
          <li><strong>Design cost:</strong> $10M–$100M+ for chip design, mask creation, tape-out. Only makes sense at very high volume (millions of queries per day) or high-value applications.</li>
          <li><strong>Time to market:</strong> 18-24 months from design start to first silicon. Risk: if the algorithm changes in that time, the ASIC can become obsolete.</li>
          <li><strong>Who designs ASICs:</strong> Mostly hyperscalers (Google, AWS, Meta, Microsoft, Apple, Tesla) and specialized chip companies. Regular enterprises: use a GPU — an ASIC investment doesn't pay off.</li>
          <li><strong>Manufacturing:</strong> TSMC, Samsung Foundry — the same foundries that make NVIDIA's GPUs. AI ASICs use advanced process nodes (5nm, 3nm).</li>
        </ul>
        <Callout type="important" title="The ASIC Paradox">
          The ASIC is the most efficient chip — but only build one when the volume is high enough to justify the design cost. Google built TPU v1 because they had to handle billions of daily queries and the per-query cost of CPU/GPU was too high. For a startup, the same decision would be: use a GPU, don't build an ASIC.
        </Callout>
      </section>

      {/* ── FPGA VS ASIC ───────────────────────────────────────────────── */}
      <section id="fpga-vs-asic">
        <h2 style={S.h2}>FPGA vs ASIC — When to Use Which</h2>
        <ComparisonTable
          title="FPGA vs ASIC Decision Guide"
          headers={["Factor", "FPGA", "ASIC"]}
          rows={[
            ["Flexibility", "Reprogrammable anytime — logic change via software", "Permanent — cannot change after fabrication"],
            ["Time to deploy", "Weeks — buy existing chip, program it", "18–24 months — design, fabricate, test"],
            ["Upfront cost", "Low — buy off-shelf ($500–$50K depending on chip)", "$10M–$100M+ for design + fabrication"],
            ["Cost per unit (at volume)", "High — complex chip, high power", "Very low — optimized chip, mass production"],
            ["Power efficiency", "3–5× worse than equivalent ASIC", "Maximum — every transistor optimized"],
            ["Performance", "Good — fast programmable logic", "Best — custom optimized pipeline"],
            ["Risk level", "Low — can reprogram if wrong", "High — if wrong, $10M+ lost"],
            ["Best for volume", "Low to medium (< 50,000 units)", "High (millions of units)"],
            ["Programming skill", "HDL / HLS — specialized skillset", "RTL design + semiconductor expertise"],
            ["Best use case", "Prototyping, low-volume, edge, protocol flexibility", "High-volume production, hyperscaler AI chips"],
          ]}
        />
        <p style={S.p}>
          <strong>Practical decision for most engineers:</strong> You will rarely design FPGAs or ASICs yourself. But you need to understand them to:
        </p>
        <ul style={S.ul}>
          <li>Evaluate vendor claims ("our ASIC is 10× faster") — now you know why ASICs can be faster</li>
          <li>Understand why AWS Trainium exists and what its limitations are</li>
          <li>Know when recommending FPGA-based inference makes sense (ultra-low latency, edge)</li>
          <li>Design data center infrastructure for FPGA/ASIC-based systems correctly</li>
        </ul>
      </section>

      {/* ── AWS TRAINIUM ───────────────────────────────────────────────── */}
      <section id="aws-trainium">
        <h2 style={S.h2}>AWS Trainium — Amazon's Training Chip</h2>
        <p style={S.p}>
          <strong>AWS Trainium</strong> (the chip's name) — Amazon's custom ASIC built specifically for AI model training. Available on AWS EC2 via the "Trn1" instance type.
        </p>
        <p style={S.p}>
          <strong>Why Amazon built it:</strong> AWS was renting thousands of GPU instances (from NVIDIA). At scale, the margin was thin. Build a custom chip → cost control, differentiation, better margin. This is the same reason Google (TPU), Microsoft (Maia), and Meta (MTIA) also built custom chips — volume justifies it.
        </p>
        <Figure caption="AWS Trainium (model builder) vs AWS Inferentia (model server): Trainium has high memory, NeuronLink for multi-chip scale-out, BFloat16 for training. Inferentia has low-latency INT8 support, 40-60% cheaper than GPU inference at AWS. Both use the same Neuron SDK for PyTorch/TensorFlow code compilation.">
          <AwsChipsDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Trainium (Trn1) chip specs:</strong> NeuronCore v2, 32 GB HBM2e per chip, BFloat16 + FP32 + FP16 + INT8 support. NeuronLink: Amazon's custom chip-to-chip interconnect (like NVLink for GPU).</li>
          <li><strong>Trn1 instance:</strong> Trn1.2xl (1 chip), Trn1.32xl (16 chips, 512 GB total HBM). Up to 3.4 petaflops BF16 in Trn1.32xl.</li>
          <li><strong>Trn2 (2024):</strong> Second generation, improved performance, more memory. Verify current specs on AWS documentation.</li>
          <li><strong>Software: Neuron SDK:</strong> AWS built an SDK that compiles PyTorch and TensorFlow code for Trainium. Same concept as Google's XLA. Models need to be "neuron compiled" — the first compile is slow, subsequent runs are fast.</li>
          <li><strong>Cost advantage:</strong> AWS claims a 50% lower training cost vs. P4de (A100) instances for suitable workloads. Actual savings depend heavily on the model type and whether it compiles cleanly via the Neuron SDK.</li>
          <li><strong>Limitation:</strong> The Neuron SDK ecosystem is much smaller than CUDA's. Not all PyTorch operations are supported. Custom ops may need rewriting. Debugging is less mature. Same tradeoffs as switching to any non-NVIDIA chip.</li>
        </ul>
        <Callout type="best-practice" title="When to Try Trainium">
          Move to Trainium if: you're already training on AWS, you're using standard transformer architectures (BERT, T5, the LLaMA family), your model compiles on the Neuron SDK (test this first), and a 30%+ cost saving target is realistic. Test it: run your model on the Neuron Compiler → check compilation success → benchmark vs. P4/P3 → then decide.
        </Callout>
      </section>

      {/* ── AWS INFERENTIA ─────────────────────────────────────────────── */}
      <section id="aws-inferentia">
        <h2 style={S.h2}>AWS Inferentia — Amazon's Inference Chip</h2>
        <p style={S.p}>
          <strong>AWS Inferentia</strong> — Trainium's sibling, but for a different job. Inferentia is optimized for serving trained models — not training, production inference.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> Trainium is a factory — high capital, runs continuously, produces the product. Inferentia is a retail store — lower cost per transaction, customer-facing, scales up/down with demand.
        </p>
        <ul style={S.ul}>
          <li><strong>Inf2 chip specs:</strong> NeuronCore v2 (same architecture family as Trainium), 32 GB HBM2e per chip, INT8 + BF16 + FP16 support. NeuronLink: multiple Inf2 chips connect for large model serving.</li>
          <li><strong>Inf2.48xl:</strong> 12 chips, 384 GB total memory — enough to run 70B parameter models at FP16 inference without quantization.</li>
          <li><strong>Cost advantage:</strong> AWS claims 40-60% lower cost per inference vs G5 (A10G GPU) instances for supported models. Real savings depend on model, batch size, framework.</li>
          <li><strong>INT8 support:</strong> Quantized models (INT8) run faster and cheaper on Inferentia vs. running FP16. Automatic quantization tools are available in the AWS Neuron SDK.</li>
          <li><strong>Same Neuron SDK:</strong> Model trained on Trainium → Neuron compile → deploy on Inferentia. One SDK for both — this is a key advantage.</li>
          <li><strong>Use case examples:</strong> AWS has specifically optimized Hugging Face Transformers (BERT, GPT-2, DistilBERT) for Inferentia. Pre-compiled Neuron artifacts are available for many popular models.</li>
        </ul>
      </section>

      {/* ── INTEL GAUDI ────────────────────────────────────────────────── */}
      <section id="intel-gaudi">
        <h2 style={S.h2}>Intel Gaudi — H100 Alternative</h2>
        <p style={S.p}>
          <strong>Intel Gaudi</strong> (originally Habana Labs — acquired by Intel in 2019) — Intel's direct H100 competitor. Gaudi 2 and Gaudi 3 are designed for data center training and inference.
        </p>
        <p style={S.p}>
          <strong>Why Intel is a serious player:</strong> The Gaudi 3 has 96 GB of HBM2e memory (more than the H100's 80 GB) and competitive BF16 performance. Most importantly: <strong>RoCE 2.0 (RDMA over Converged Ethernet)</strong> — an open standard for networking, unlike NVIDIA's proprietary NVLink. That means Gaudi chips scale with standard 200GbE Ethernet switches — no vendor lock-in for networking.
        </p>
        <Figure caption="Intel Gaudi 3 Architecture: MME (Matrix Math Engine) for dense AI compute, TPC Clusters (programmable Tensor Cores equivalent), 96 GB HBM2e memory (more than H100's 80 GB), and RoCE 2.0 open networking (21×200GbE per chip) for scale-out without proprietary switches.">
          <IntelGaudiDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Gaudi 3 specs:</strong> ~1,835 BF16 TFLOPS (H100 ~1,979 TFLOPS — very close). 96 GB HBM2e. 21 × 200 GbE network ports per chip. 900 W TDP. PCIe Gen 5 host interface.</li>
          <li><strong>Software: Habana SynapseAI SDK:</strong> PyTorch and TensorFlow support, Habana model optimization tools. A smaller ecosystem than CUDA but growing. The Hugging Face Optimum Habana library optimizes models.</li>
          <li><strong>Open networking advantage:</strong> Gaudi pods connect via standard InfiniBand or RoCE Ethernet. Scale-out is possible independent of NVIDIA's NVLink ecosystem. Lower networking cost for some configurations.</li>
          <li><strong>Availability:</strong> Available on Intel Developer Cloud. Select OEM server partners (Supermicro, HPE, Dell) sell Gaudi-based servers. On-premises deployment is possible — unlike TPU.</li>
          <li><strong>Who is using it:</strong> Stability AI, Intel flagship AI customers, select enterprises exploring non-NVIDIA options.</li>
        </ul>
        <Callout type="warning" title="Realistic Assessment of Gaudi">
          The hardware specs make Gaudi 3 competitive. But there's a significant gap versus CUDA in software ecosystem and community support. PyTorch runs on Gaudi, but CUDA's extensive library support (FlashAttention, DeepSpeed optimizations, custom kernels) is mature only in CUDA. Consider Gaudi if: NVIDIA hardware supply is constrained, open networking matters, and your team can invest in the SynapseAI SDK.
        </Callout>
      </section>

      {/* ── CEREBRAS WSE ───────────────────────────────────────────────── */}
      <section id="cerebras-wse">
        <h2 style={S.h2}>Cerebras WSE — The Wafer-Scale Engine</h2>
        <p style={S.p}>
          <strong>Cerebras WSE (Wafer Scale Engine)</strong> — a radical rethink of the semiconductor industry. Normal chips: cut a semiconductor wafer into thousands of small chips. Cerebras: don't cut the wafer at all — the entire wafer is one chip.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> Normally you build an apartment building — each apartment is a chip, and residents (data) have to take lifts (interconnects) from one floor to another. Cerebras made an entire city block into one apartment — all the space is yours, no lifts, everything on one level.
        </p>
        <Figure caption="Cerebras WSE-3 vs Normal Chip Approach: Normal approach cuts wafer into many small chips that need chip-to-chip communication. Cerebras uses the ENTIRE wafer as one chip — 900,000 AI cores, 44 GB on-chip SRAM, no inter-chip communication bottleneck. Die size: 46,225 mm² (vs H100's ~814 mm²).">
          <CerebrasDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>WSE-3 specs:</strong> 900,000 AI cores (Sparse Linear Algebra Compute cores), 44 GB on-chip SRAM (vs. the H100's 80 MB L2 cache — the WSE-3 has 550x more on-chip memory). 125 PFLOPS peak BF16. 46,225 mm² die size (H100: ~814 mm²).</li>
          <li><strong>Why massive on-chip SRAM matters:</strong> Large model weights can fit in on-chip memory — the need for HBM (off-chip) access drops dramatically. The memory bandwidth bottleneck goes away. Dramatic speedups are possible for specific workloads.</li>
          <li><strong>Main limitation — cannot scale beyond one chip:</strong> The WSE is designed as a single-chip system. Multi-chip scaling (like GPU NVLink or TPU ICI) doesn't happen. The model must fit entirely in on-chip memory. Limited for very large models (GPT-4 class).</li>
          <li><strong>Cerebras CS-3 system:</strong> The WSE-3 chip comes with a dedicated "MemoryX" memory system that stores model weights and feeds the chip in a streaming fashion — a workaround for large models that don't fit on-chip.</li>
          <li><strong>Software: Cerebras software stack:</strong> PyTorch and TensorFlow support. The Cerebras Graph Compiler compiles the code. A relatively simple programming model — less complex than a GPU distributed training setup.</li>
          <li><strong>Deployment:</strong> On-premises or Cerebras Cloud. Cerebras has signed dedicated AI supercomputer contracts (Abu Dhabi, Cincinnati, Saudi Arabia).</li>
        </ul>
        <Callout type="best-practice" title="When Cerebras WSE Makes Sense">
          WSE is compelling for: large model inference where single-chip latency is critical, scientific computing (molecular dynamics, weather modeling) where the computation graph is irregular, LLM inference where HBM bandwidth is the bottleneck on GPU. WSE is not ideal for: multi-node training of frontier models, workloads that need conventional multi-chip parallelism. Practical: access is mostly via Cerebras Cloud or direct partnership — not available casually.
        </Callout>
      </section>

      {/* ── GRAPHCORE IPU ──────────────────────────────────────────────── */}
      <section id="graphcore-ipu">
        <h2 style={S.h2}>Graphcore IPU — A Different Architecture</h2>
        <p style={S.p}>
          <strong>Graphcore IPU (Intelligence Processing Unit)</strong> — a fundamentally different AI chip architecture from the UK. Instead of optimizing for large dense matrix multiplication (a GPU's strength), the IPU uses large on-chip SRAM and focuses on fine-grained parallelism.
        </p>
        <p style={S.p}>
          <strong>The architecture difference — simple explanation:</strong> A GPU is a freeway — high throughput, trucks (large data) move fast, parallel lanes (CUDA cores). An IPU is a detailed city road network — thousands of small streets (1,472 IPU processors), great for complex routing, packages (data) move independently, less ideal for 18-wheelers (large dense matrices).
        </p>
        <ul style={S.ul}>
          <li><strong>IPU-M2000 specs:</strong> 1,472 independent IPU processor cores, 900 MB on-chip SRAM (much larger than GPU L2 cache), BSP (Bulk Synchronous Parallel) execution model, 251 TFLOPS FP16.</li>
          <li><strong>BSP execution model:</strong> Compute phase → communicate phase → repeat. Deterministic execution — same result every run. Less suitable for streaming workloads, better for iterative algorithms.</li>
          <li><strong>Where IPU is strong:</strong> Sparse computation (Graph Neural Networks, sparse transformer attention), recommendation systems (irregular data patterns), unusual model architectures in research.</li>
          <li><strong>Where IPU is weak:</strong> Large dense LLM training (GPU better), memory-capacity-limited workloads (900 MB on-chip limited vs HBM GPUs), production deployment at scale (limited ecosystem).</li>
          <li><strong>Software: Poplar SDK:</strong> PyTorch and TensorFlow support via PopTorch/TF-Poplar. C++ graph programming is also possible. A smaller community than CUDA.</li>
          <li><strong>Market reality:</strong> Graphcore raised significant funding, faced challenges in mainstream adoption. Niche but technically interesting. Watch for ecosystem developments.</li>
        </ul>
      </section>

      {/* ── SAMBANOVA ──────────────────────────────────────────────────── */}
      <section id="sambanova">
        <h2 style={S.h2}>SambaNova — Reconfigurable AI</h2>
        <p style={S.p}>
          <strong>SambaNova Systems</strong> — a full-stack AI company that includes silicon, software, and pre-configured systems, all together. SambaNova's DataScale SN40L system is an enterprise AI appliance — the box arrives, setup is minimal, you run AI.
        </p>
        <ul style={S.ul}>
          <li><strong>Architecture:</strong> RDU (Reconfigurable Dataflow Unit) — combines elements of both FPGA and ASIC. The reconfigurable dataflow architecture allows efficient execution of different model types.</li>
          <li><strong>SambaNova SN40L chip:</strong> 520 MB on-chip SRAM (very large — similar philosophy to Cerebras), 64 GB HBM2e. Focus on memory bandwidth and low latency inference.</li>
          <li><strong>Full stack differentiator:</strong> SambaNova tries to give a GPU-like experience with the SambaFlow SDK (PyTorch compatible). For enterprise customers, the "AI appliance" model often fits better than a DIY GPU cluster setup.</li>
          <li><strong>Target market:</strong> Financial services (on-prem LLM inference with data privacy), healthcare (HIPAA-compliant AI), government (data sovereignty). Organizations that shouldn't use cloud chips (for compliance reasons) and don't have GPU expertise.</li>
          <li><strong>Pricing:</strong> Enterprise pricing, contact sales. Not publicly available. Significantly higher upfront than cloud — but if data cannot leave premises, comparison changes.</li>
        </ul>
      </section>

      {/* ── EDGE AI CHIPS ──────────────────────────────────────────────── */}
      <section id="edge-ai-chips">
        <h2 style={S.h2}>Edge AI Chips — NPUs in Your Pocket</h2>
        <p style={S.p}>
          <strong>Edge AI</strong> — AI inference directly on the device, without sending data to the cloud. <strong>Edge AI chips</strong> are mostly NPUs, as we covered in the NPU section — but here we cover the complete ecosystem: from phones to industrial cameras.
        </p>
        <ComparisonTable
          title="Edge AI Chip Landscape"
          headers={["Chip", "Device", "AI Performance", "Power", "Key AI Feature"]}
          rows={[
            ["Apple A17 Pro Neural Engine", "iPhone 15 Pro", "35 TOPS", "<5W (full SoC)", "On-device LLM, Image AI, Face ID"],
            ["Apple M3 Neural Engine", "MacBook, iPad", "18 TOPS", "<8W (chip)", "Image generation, video analysis"],
            ["Qualcomm Snapdragon 8 Gen 3 Hexagon", "Flagship Android", "73 TOPS", "<10W (full SoC)", "On-device AI assistant, photo AI"],
            ["Google Tensor G3", "Pixel 8 Pro", "~50 TOPS est.", "<10W (full SoC)", "Magic Eraser, Live Translate, speech"],
            ["NVIDIA Jetson Orin", "Industrial edge", "275 TOPS", "15–60W", "Robot AI, autonomous vehicle, factory"],
            ["Intel Movidius Myriad X", "Industrial camera", "4 TOPS", "1W", "Computer vision, surveillance AI"],
            ["Hailo-8L", "Smart camera, router", "13 TOPS", "1.5W", "Object detection, video analytics"],
            ["Ambarella CV5", "Security camera", "8 TOPS", "5W", "4K video AI analysis"],
          ]}
        />
        <p style={S.p}>
          <strong>NVIDIA Jetson</strong> deserves special mention — this is an edge GPU (not an NPU). Jetson Orin NX: ARM CPU + Ampere GPU cores + CUDA support. This is the bridge between cloud GPU and mobile NPU — real CUDA code runs directly. Widely used in robotics, autonomous vehicles, and factory automation. More expensive and more power than an NPU, but you get GPU flexibility at the edge.
        </p>
        <Callout type="best-practice" title="Hybrid Edge-Cloud Architecture">
          Real production systems are often hybrid: run a lightweight model on the edge NPU (real-time, low latency, privacy) → send interesting/complex cases to a cloud GPU (heavy processing, model update). Example: a factory camera's Hailo chip detects defects in real time. Complex or novel defects get analyzed on a cloud LLM. DC engineers need to design for both — edge connectivity, edge device management, cloud AI endpoints.
        </Callout>
      </section>

      {/* ── CHIP COMPARISON ────────────────────────────────────────────── */}
      <section id="chip-comparison">
        <h2 style={S.h2}>Side-by-Side: All Major AI Chips</h2>
        <ComparisonTable
          title="Major AI Accelerators — Complete Comparison (2024)"
          headers={["Chip", "Type", "Memory", "Peak BF16", "Power", "Available", "Best For"]}
          rows={[
            ["NVIDIA H100 SXM5", "GPU", "80 GB HBM3", "~1,979 TFLOPS", "700W", "Cloud + on-prem", "General AI training + inference"],
            ["NVIDIA H200", "GPU", "141 GB HBM3e", "~1,979 TFLOPS BF16", "700W", "Cloud + on-prem", "Memory-heavy LLM (fits bigger models)"],
            ["AMD MI300X", "GPU", "192 GB HBM3", "~1,307 TFLOPS", "750W", "Cloud + on-prem", "Large model inference (biggest HBM)"],
            ["Google TPU v4", "ASIC", "32 GB HBM2 per chip", "~275 TFLOPS", "~200W", "Google Cloud only", "TF/JAX large-scale training"],
            ["AWS Trainium Trn1", "ASIC", "32 GB HBM2e per chip", "Competitive", "~400W", "AWS Cloud only", "Neural network training on AWS"],
            ["AWS Inferentia Inf2", "ASIC", "32 GB HBM2e per chip", "INT8 focus", "~330W", "AWS Cloud only", "Low-cost inference at AWS scale"],
            ["Intel Gaudi 3", "ASIC", "96 GB HBM2e", "~1,835 TFLOPS", "900W", "Cloud + on-prem", "H100 alternative, open networking"],
            ["Cerebras WSE-3", "ASIC", "44 GB SRAM on-chip", "125 PFLOPS", "~23,000W", "Cloud + partner", "Wafer-scale, unique architecture"],
            ["Graphcore Bow IPU", "ASIC", "900 MB on-chip SRAM", "251 TFLOPS FP16", "~185W", "Cloud + on-prem", "Sparse AI, graph neural networks"],
            ["NVIDIA Jetson Orin", "Edge GPU", "32 GB LPDDR5", "275 TOPS", "15–60W", "OEM purchase", "Robotics, edge AI with CUDA"],
            ["Apple A17 Neural Engine", "Mobile NPU", "Shared 6 GB", "35 TOPS", "<5W total SoC", "iPhone only", "On-device AI, privacy"],
            ["NVIDIA BlueField-3 DPU", "DPU", "N/A (I/O focused)", "N/A", "~120W", "On-prem servers", "Network offload, AI data movement"],
          ]}
        />
      </section>

      {/* ── TRAINING VS INFERENCE HW ───────────────────────────────────── */}
      <section id="training-vs-inference">
        <h2 style={S.h2}>Training vs Inference — Different Hardware Needs</h2>
        <p style={S.p}>
          A common mistake is using the same hardware for both training and inference. Reality: the hardware requirements for both are fundamentally different, and the wrong choice gets expensive.
        </p>
        <Figure caption="Training needs: high memory capacity (weights+gradients+optimizer = 4x model size), high memory bandwidth for frequent weight updates, large batch processing, BF16 precision, scale-out interconnect. Inference needs: low latency, high throughput, INT8 quantization support, cost per query optimization, lower memory (weights only).">
          <TrainingVsInferenceHW />
        </Figure>
        <ComparisonTable
          title="Hardware Optimization: Training vs Inference"
          headers={["Requirement", "Training", "Inference", "Why Different"]}
          rows={[
            ["Memory per chip", "Very high (100+ GB preferred)", "Lower OK if quantized", "Training: weights+gradients+optimizer states. Inference: weights only."],
            ["Memory bandwidth", "Maximum possible", "High but less critical", "Frequent weight updates during training. Inference reads weights once per layer."],
            ["Precision", "BF16, FP16, FP32", "INT8, INT4, FP16", "Training: precision for convergence stability. Inference: quantize for speed."],
            ["Batch size", "Larger = better GPU utilization", "Small for latency, large for throughput", "Training: more data per step. Inference: depends on latency SLA."],
            ["Interconnect", "Critical (gradient sync across chips)", "Less critical (stateless per request)", "Distributed training needs all-reduce. Inference can be independent."],
            ["Cost model", "High upfront, amortized over training run", "Ongoing per-query cost", "Train once (expensive), serve forever (recurring)."],
          ]}
        />
        <Callout type="best-practice" title="Practical Strategy: Separate Training and Inference Infrastructure">
          Best practice: train on H100 or TPU (high memory, high bandwidth). After training: quantize the model to INT8. Deploy the quantized model on inference-optimized chips (Inferentia, L4, A10G). Savings: H100 inference cost per query is often 3-5x higher than L4 for the same throughput. Always benchmark your specific model before making infrastructure decisions.
        </Callout>
      </section>

      {/* ── CUSTOM SILICON STRATEGY ────────────────────────────────────── */}
      <section id="custom-silicon-strategy">
        <h2 style={S.h2}>Custom Silicon Strategy</h2>
        <p style={S.p}>
          <strong>Custom silicon</strong> — designing your own chip. This decision is the biggest investment in the hardware world. When does it make sense, and when doesn't it?
        </p>
        <Figure caption="Custom Silicon Decision Framework: Start with your query volume and algorithm stability. Under 10M queries/day: use GPU. 10M-100M/day with stable algorithm: consider FPGA first, then ASIC. Over 100M/day with budget: Cloud GPU/TPU or custom ASIC (hyperscaler territory).">
          <CustomSiliconStrategy />
        </Figure>
        <p style={S.p}>
          <strong>The economics — konkrete numbers:</strong>
        </p>
        <ul style={S.ul}>
          <li><strong>GPU cloud inference:</strong> NVIDIA A10G on AWS: ~$1.00/hour. At 1,000 queries/hour: $0.001 per query.</li>
          <li><strong>Custom ASIC at scale:</strong> Design cost ~$30M amortized over 10M chips over 5 years = $3 per chip. Chip runs 100,000 queries/hour at 0.01W per query vs GPU 1W per query. At billions of daily queries, per-query cost can be 10× lower.</li>
          <li><strong>When custom makes sense:</strong> If you process 1 billion queries per day AND your current GPU cost is $0.001/query → $1M/day → $365M/year. Even $50M custom chip investment has ROI in months. This is why Google, AWS, Meta build custom chips.</li>
          <li><strong>When GPU is correct:</strong> Under 100M daily queries (most companies), changing algorithm (research), need framework flexibility, limited chip design talent.</li>
        </ul>
        <ComparisonTable
          title="Who Builds Custom Silicon and Why"
          headers={["Company", "Custom Chip", "Why It Made Sense"]}
          rows={[
            ["Google", "TPU", "Billions of Search/Translate queries/day — GPU cost would be astronomical"],
            ["AWS/Amazon", "Trainium + Inferentia", "AWS hosts 30%+ of cloud workloads — custom chips improve margin and differentiation"],
            ["Meta", "MTIA", "Recommendation systems — billions of daily users, unique sparse AI workloads"],
            ["Microsoft", "Maia 100", "Azure AI services at scale — reduce NVIDIA dependency"],
            ["Apple", "Neural Engine in A/M chips", "Billions of iPhone/Mac users — battery efficiency critical"],
            ["Tesla", "Dojo D1 chip", "Billions of miles of video training data — GPU cost justified own silicon"],
            ["Qualcomm", "Hexagon DSP/NPU", "Billions of Snapdragon phones — per-chip cost critical at mobile scale"],
          ]}
        />
      </section>

      {/* ── DC DEPLOYMENT ──────────────────────────────────────────────── */}
      <section id="dc-deployment">
        <h2 style={S.h2}>Data Center Deployment</h2>
        <p style={S.p}>
          Every type of AI accelerator gets deployed differently in a data center. For DC engineers, these are concrete operational differences.
        </p>
        <ul style={S.ul}>
          <li>
            <strong>GPU Servers (NVIDIA DGX, HGX):</strong> Standard 4U–8U rack servers. 8 GPUs per server typical (DGX H100). PCIe Gen 5 host interface. NVLink internal GPU-to-GPU. InfiniBand external server-to-server. Deployment: standard DC rack, network cabling, IB switch fabric. Monitoring: NVIDIA DCGM (Data Center GPU Manager) — metrics per GPU, health alerts.
          </li>
          <li>
            <strong>TPU Boards (Google Cloud):</strong> Google-proprietary hardware — you don&apos;t physically deploy it. Access via the cloud API. The physical reality at a Google DC: custom 8U-equivalent boards, 4 chips per board, optical ICI cabling, liquid cooling manifolds. You manage the software; Google manages the physical infrastructure.
          </li>
          <li>
            <strong>AWS Trainium/Inferentia (EC2):</strong> Similar to TPU — cloud instances only. AWS manages physical hardware. You manage EC2 instances, Neuron SDK, model deployment. Inf2/Trn1 instances: launch same as regular EC2. No physical access.
          </li>
          <li>
            <strong>Intel Gaudi (On-Premises):</strong> Gaudi-based servers from Supermicro, HPE, Dell available. OCP (Open Compute Project) design in some cases. Standard RoCE 2.0 networking — uses existing 200GbE/400GbE switches, no special switch hardware needed. Rack density: similar to GPU servers, ~10 kW range per server. Monitoring: Intel Gaudi Management Library.
          </li>
          <li>
            <strong>Cerebras CS-3 System:</strong> Dedicated cabinet deployment — full 15U enclosure per WSE chip. Liquid cooling loop mandatory (23 kW chip). MemoryX expansion units connected via high-speed interconnect. Specialized rack, dedicated liquid cooling, dedicated power. Not casual deployment.
          </li>
          <li>
            <strong>FPGA Cards (Xilinx Alveo, Intel Agilex):</strong> PCIe cards installed in standard servers. Multiple FPGAs per server possible. Air-cooled (lower power). Standard rack servers. Programming complexity is the main deployment challenge — HDL/HLS expertise needed.
          </li>
          <li>
            <strong>DPU (NVIDIA BlueField):</strong> Replaces standard NIC in server. PCIe slot. DOCA (Data Center Infrastructure on a Chip Architecture) SDK for programming. Deployment: swap existing NIC, configure DOCA. Works alongside existing GPU/CPU infrastructure.
          </li>
        </ul>
      </section>

      {/* ── POWER AND COOLING ──────────────────────────────────────────── */}
      <section id="power-cooling">
        <h2 style={S.h2}>Power and Cooling for AI Accelerators</h2>
        <p style={S.p}>
          This is the most critical section for DC engineers. Every chip type has different power and cooling demands — planning is essential to host different systems in the same data center.
        </p>
        <Figure caption="AI Accelerator Power Consumption: NPU (under 5W, passive cooling), CPU server (~3 kW per rack), GPU H100 server (~10 kW per 8-GPU chassis, liquid cooling recommended above 15kW/rack), TPU Pod rack (40-100 kW, liquid cooling mandatory), Cerebras WSE-3 (23 kW single unit, liquid mandatory). Higher power = more infrastructure needed.">
          <AiAcceleratorDcPower />
        </Figure>
        <ComparisonTable
          title="Power and Cooling Requirements by Chip Type"
          headers={["System", "Power (approx)", "Cooling Needed", "Rack Density", "Special Requirements"]}
          rows={[
            ["CPU server", "300–500W per server", "Air cooling sufficient", "3–5 kW per rack", "Standard — nothing special"],
            ["GPU H100 server (8×)", "~10 kW per chassis", "Air OK up to 15kW/rack, then liquid", "10–25 kW per rack", "High-airflow rack, front-to-back"],
            ["GPU H100 NVL (16× SXM)", "~20+ kW per system", "Liquid cooling recommended", "20–30 kW per rack", "Direct Liquid Cooling (DLC) preferred"],
            ["TPU v4 board (Google)", "~800W per 4-chip board", "Liquid cooling mandatory", "40–100 kW per rack", "Google-managed — not your concern on Cloud TPU"],
            ["Cerebras CS-3", "~23,000W per system", "Liquid cooling mandatory, dedicated circuit", "Dedicated cabinet", "Special 3-phase power, liquid loop, floor reinforcement"],
            ["Intel Gaudi 3 server", "~900W per chip, ~10 kW per 8-chip server", "Air OK, liquid preferred", "10–15 kW per rack", "Standard OCP racks, RoCE 2.0 network"],
            ["FPGA (Xilinx Alveo)", "75–225W per card", "Air cooling", "3–5 kW per rack", "Standard PCIe server"],
            ["NVIDIA BlueField-3 DPU", "~120W", "Air cooling", "Minimal addition", "PCIe slot in existing server"],
          ]}
        />
        <p style={S.p}>
          <strong>Liquid cooling threshold — practical DC engineering rule:</strong> Air cooling limit for a standard 42U rack: approximately 15–20 kW. Above this, air cannot efficiently remove heat. Liquid cooling options:
        </p>
        <ul style={S.ul}>
          <li><strong>DLC (Direct Liquid Cooling):</strong> Cold plates directly on chip surface. Cold water (18–22°C supply, 35–45°C return) circulates via manifold. Most efficient. Required for TPU, recommended for high-density GPU. Requires chilled water plant, piping to rack, manifolds.</li>
          <li><strong>Rear-door heat exchangers:</strong> Liquid-cooled door on back of rack captures heat from exhaust air. Less efficient than DLC but easier retrofit. Works up to ~30 kW per rack.</li>
          <li><strong>Immersion cooling (future):</strong> Complete server submerged in dielectric fluid. Ultimate density — 100+ kW per tank possible. Emerging for AI datacenters. Not mainstream yet but watch this space.</li>
          <li><strong>Air cooling with hot/cold aisle containment:</strong> For moderate AI loads (GPU servers under 15 kW/rack). CRAC units, hot aisle containment, cold aisle tiles. Sufficient for many GPU deployments.</li>
        </ul>
      </section>

      {/* ── NETWORKING AND STORAGE ─────────────────────────────────────── */}
      <section id="networking-storage">
        <h2 style={S.h2}>Networking and Storage</h2>
        <p style={S.p}>
          The real limiting factor for AI accelerator performance is often networking and storage — no matter how fast a chip can compute, data needs to arrive just as fast.
        </p>
        <ul style={S.ul}>
          <li>
            <strong>GPU Cluster Networking:</strong> Within a server: NVLink (NVIDIA proprietary, 900 GB/s per GPU). Between servers: InfiniBand HDR/NDR (200–400 Gb/s) or RoCE 2.0 (RDMA over Converged Ethernet). InfiniBand: lowest latency, highest bandwidth, proprietary switches (Mellanox/NVIDIA). RoCE 2.0: RDMA on standard Ethernet infrastructure, cheaper switches, growing adoption. Fat-tree topology: the standard for GPU clusters — full bisection bandwidth, no oversubscription.
          </li>
          <li>
            <strong>Gaudi 3 Networking:</strong> RoCE 2.0 natively (no proprietary network). You can use standard 200GbE/400GbE switches (Arista, Cisco, Juniper). No InfiniBand hardware needed. Lower networking CapEx in some scenarios.
          </li>
          <li>
            <strong>TPU / AWS Chips Networking:</strong> Google/AWS internal network — you don't design this. Cloud provider&apos;s responsibility. Your job: GCS/S3 bucket in same region as compute, VPC configuration, data pipeline design.
          </li>
          <li>
            <strong>Storage for AI training:</strong> Training data storage: parallel file systems (Lustre, GPFS) for on-premises HPC clusters. All-flash NVMe for hot training data. Object storage (S3, GCS) for archive and cloud training. The data loading pipeline is critical: if storage bandwidth is less than GPU compute throughput, the GPU waits. Rule of thumb: each GPU server should have dedicated storage bandwidth of 10–20 GB/s.
          </li>
          <li>
            <strong>Storage for AI inference:</strong> Model files: load once at startup, keep in GPU/NPU memory. Low latency NVMe for fast model loading. Fast model swap for multi-tenant serving. Checkpoint storage: frequent writes during training, fast SSD needed.
          </li>
        </ul>
        <Callout type="important" title="The Storage-Compute Balance">
          Common mistake: buy expensive GPUs, cheap storage. Result: GPU utilization 40-60% because storage I/O is bottleneck. Rule: storage bandwidth should match compute throughput. For 8× H100 server (peak 270 GB/s aggregate HBM bandwidth): dedicated 25+ GB/s storage bandwidth recommended. This often means NVMe-oF (NVMe over Fabrics) or dedicated high-bandwidth storage fabric.
        </Callout>
      </section>

      {/* ── SOFTWARE ECOSYSTEM ─────────────────────────────────────────── */}
      <section id="software-ecosystem">
        <h2 style={S.h2}>Software Ecosystems — CUDA vs the Rest</h2>
        <p style={S.p}>
          Often, the software ecosystem matters more than the hardware specs. This is the reason NVIDIA GPU is dominant despite competitors having comparable specs.
        </p>
        <ComparisonTable
          title="Software Ecosystem Comparison"
          headers={["Platform", "Framework", "Custom Ops", "Community", "Maturity"]}
          rows={[
            ["NVIDIA GPU", "CUDA — PyTorch, TF, JAX native", "Full CUDA kernel support — unlimited", "Massive — millions of developers", "14+ years, extremely mature"],
            ["Google TPU", "JAX, TensorFlow + XLA compiler", "Limited — XLA-compatible only", "Growing — Google-centric", "8 years, maturing"],
            ["AWS Trainium/Inferentia", "PyTorch/TF via Neuron SDK", "Limited — Neuron-compatible only", "Small but growing", "4 years, developing"],
            ["Intel Gaudi", "PyTorch/TF via SynapseAI", "TPC programmable cores", "Small", "5 years, developing"],
            ["AMD GPU + ROCm", "PyTorch, TF via ROCm/HIP", "HIP kernels (CUDA-like)", "Growing rapidly", "5 years, improving"],
            ["Cerebras", "PyTorch/TF via Cerebras compiler", "Limited", "Niche", "3 years, early"],
            ["Graphcore IPU", "PopTorch, TF-Poplar", "Poplar C++ graphs", "Small", "4 years, niche"],
            ["FPGA (Xilinx/Intel)", "Vitis AI, OpenCL, HLS", "Full reprogrammable", "Specialized hardware engineers", "20+ years (FPGA), 5 (AI tools)"],
          ]}
        />
        <p style={S.p}>
          <strong>Why CUDA ecosystem is so sticky:</strong>
        </p>
        <ul style={S.ul}>
          <li><strong>FlashAttention:</strong> A critical LLM attention optimization — CUDA kernels. Flash Attention 2 and 3: GPT-4, LLaMA 2, Mistral — all CUDA-specific. Only approximate equivalents are available on non-NVIDIA chips.</li>
          <li><strong>DeepSpeed:</strong> Microsoft's distributed training library — CUDA optimized. ZeRO optimizer stages, gradient checkpointing, pipeline parallelism — all CUDA-native.</li>
          <li><strong>cuDNN, cuBLAS:</strong> NVIDIA's optimized math libraries. Decades of hand-tuned kernels. Competing equivalent libraries exist but often lag in performance.</li>
          <li><strong>Hugging Face ecosystem:</strong> 400,000+ models, all primarily tested on GPU. CUDA de-facto requirement for most HF workflows.</li>
          <li><strong>Stack Overflow, GitHub issues:</strong> Solving problems is harder on non-CUDA platforms — community help is limited.</li>
        </ul>
      </section>

      {/* ── COST AND TCO ───────────────────────────────────────────────── */}
      <section id="cost-tco">
        <h2 style={S.h2}>Cost and TCO Analysis</h2>
        <p style={S.p}>
          <strong>TCO (Total Cost of Ownership)</strong> — not just the chip's price, but the complete 3-year cost of running AI infrastructure.
        </p>
        <ComparisonTable
          title="TCO Components for AI Accelerator Deployment"
          headers={["Cost Component", "GPU On-Prem", "Cloud GPU", "AWS Inferentia", "Edge NPU"]}
          rows={[
            ["Hardware CapEx", "$25K–$35K per H100", "$0 (rental)", "$0 (rental)", "Part of device cost"],
            ["Power (annual, 10kW rack)", "~$8K–$15K/year", "Included", "Included", "Negligible (<10W)"],
            ["Cooling (annual)", "$2K–$5K/year", "Included", "Included", "None needed"],
            ["Network (switches, cables)", "$10K–$50K upfront", "Included", "Included", "WiFi/LTE"],
            ["Software/licensing", "CUDA free, enterprise tools vary", "Included", "Neuron SDK free", "SDKs free"],
            ["Operations (human)", "1 FTE ~$100K/year", "Reduced", "Reduced", "Minimal"],
            ["Flexibility", "Fixed — upgrade costs", "Scale up/down instantly", "Scale instantly", "Limited to device"],
            ["3-year break-even vs cloud", "Month 12–18 typically", "N/A (ongoing)", "If >50% cheaper/query", "N/A"],
          ]}
        />
        <Callout type="warning" title="Pricing Changes — Always Verify">
          GPU prices, cloud instance pricing, and chip availability change rapidly. NVIDIA H100 spot prices went above $40K+ in 2023, and normalized in 2024. AWS and Google Cloud have revised pricing multiple times. The numbers above are illustrative — always check current pricing before budgeting. Also: always include engineer time for migration (non-NVIDIA) and ecosystem investment in your total cost evaluation.
        </Callout>
      </section>

      {/* ── SELECTION GUIDE ────────────────────────────────────────────── */}
      <section id="selection-guide">
        <h2 style={S.h2}>Accelerator Selection Guide</h2>
        <ComparisonTable
          title="Quick Selection Guide"
          headers={["Your Situation", "Best Choice", "Why"]}
          rows={[
            ["General AI training, any framework", "NVIDIA GPU (H100/A100)", "Mature ecosystem, any framework, best community"],
            ["LLM training on AWS, PyTorch", "H100 P4de/P5 → consider Trainium if Neuron SDK supports your model", "Test Neuron compile first, then cost compare"],
            ["LLM training on GCP, TF/JAX", "Cloud TPU v5p or v5e", "Native TF/JAX, excellent performance"],
            ["Production inference, cost-sensitive", "AWS Inferentia Inf2 / NVIDIA L4", "40-60% cheaper vs H100 inference"],
            ["On-premises AI, non-NVIDIA option", "Intel Gaudi 3 via Supermicro/HPE", "Open networking, competitive specs, on-prem available"],
            ["On-premises compliance AI appliance", "SambaNova DataScale", "Full stack, easy setup, HIPAA/regulatory friendly"],
            ["Edge real-time AI, battery device", "Phone NPU (A17, Snapdragon 8 Gen 3)", "Built into device, 1-5W, privacy"],
            ["Edge AI, industrial/factory", "NVIDIA Jetson Orin", "CUDA on the edge, full PyTorch support"],
            ["Ultra-low latency inference (<1ms)", "FPGA (Xilinx Alveo)", "Deterministic pipeline, microsecond latency"],
            ["Sparse AI / Graph Neural Networks", "Graphcore IPU or GPU with sparse libs", "IPU architecture fits sparse patterns"],
            ["Research, novel architecture", "NVIDIA GPU", "Maximum flexibility, CUDA, largest community"],
            ["Network offload for GPU cluster", "NVIDIA BlueField-3 DPU", "Proven, DOCA SDK, tight NVIDIA integration"],
          ]}
        />
      </section>

      {/* ── TROUBLESHOOTING ────────────────────────────────────────────── */}
      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting AI Accelerator Issues</h2>
        <ComparisonTable
          headers={["Problem", "Likely Cause", "Fix"]}
          rows={[
            ["Trainium model won't compile", "Unsupported PyTorch ops in Neuron SDK", "Check Neuron SDK op support list. Rewrite unsupported ops or use CPU fallback for those layers."],
            ["Gaudi training slower than GPU", "SynapseAI not fully optimized for your model", "Profile with HL-SMI. Check Habana Model Zoo for your architecture. Update SynapseAI version."],
            ["Inferentia high latency", "Dynamic batch sizing causing recompilation", "Fix batch size at compile time. Use static batches. Enable neuron-cc optimization flags."],
            ["FPGA bitfile not loading", "FPGA programming failed or wrong file", "Check device compatibility. Verify bitfile for correct FPGA part number. Re-flash."],
            ["DPU not offloading traffic", "DOCA services not started or misconfigured", "Check DOCA service status. Verify BlueField OS mode (DPU mode vs NIC mode). Restart DOCA."],
            ["NPU inference wrong results", "Quantization precision loss too high", "Check quantization calibration dataset. Try INT8 with higher calibration, or stay FP16."],
            ["Cerebras WSE training crash", "Model too large for on-chip SRAM without MemoryX", "Use MemoryX expansion. Reduce model layers per section. Check Cerebras documentation for large model strategy."],
            ["GPU underutilization on non-NVIDIA chip", "Software stack not optimizing compute kernels", "Profile with vendor tools. Check if FlashAttention equivalent available. May need kernel rewrite."],
            ["High power draw unexpected", "All chips running at max TDP simultaneously", "Check power capping settings. Verify cooling capacity. GPU: use nvidia-smi --power-limit. Gaudi: hl-smi power settings."],
          ]}
        />
      </section>

      {/* ── FUTURE TRENDS ──────────────────────────────────────────────── */}
      <section id="future-trends">
        <h2 style={S.h2}>Future Trends</h2>
        <ul style={S.ul}>
          <li><strong>Memory capacity race:</strong> LLMs getting larger — 1T+ parameter models on horizon. H200 (141 GB HBM3e), MI300X (192 GB), future chips will push 256 GB+ per accelerator. Memory is becoming the key differentiator, not compute FLOPS.</li>
          <li><strong>Inference specialization growing:</strong> As more models move to production, dedicated inference chips market growing. AWS Inferentia, NVIDIA L4, future Google Cloud inference-specific TPUs — dedicated inference silicon becoming mainstream.</li>
          <li><strong>Edge NPU explosion:</strong> Apple, Qualcomm, MediaTek aggressively competing. On-device LLMs (Phi-3, LLaMA 3.2 mobile) becoming practical. Hybrid edge-cloud AI architectures proliferating. DC engineers need to design for this.</li>
          <li><strong>China alternative ecosystem:</strong> US export controls on advanced chips to China → Huawei Ascend 910B, Biren Technology, SMIC-fabricated alternatives growing in China. Different SDK, different ecosystem. China AI infrastructure increasingly China-chip based.</li>
          <li><strong>Photonic/Optical computing:</strong> Light-based neural network processors in research (MIT, Lightmatter). Commercial viability 5-10 years away but fundamental physics advantages (speed of light, no heat from resistance). Watch Lightmatter, Luminous Computing for early commercial products.</li>
          <li><strong>RISC-V based AI chips:</strong> Open ISA enabling new entrants without ARM/x86 licensing costs. Esperanto ET-SoC, SiFive AI chips. Democratization of chip design possible via open architecture.</li>
          <li><strong>CoWoS packaging advances:</strong> TSMC CoWoS (Chip on Wafer on Substrate) — multiple dies on one package. HBM4 availability (2025-26) → 2× bandwidth vs HBM3. Next GPU generation will benefit significantly.</li>
          <li><strong>Power efficiency as primary metric:</strong> AI datacenter power consumption becoming political and business issue. NVIDIA, AMD, Intel, custom chip makers all competing on Performance-per-Watt. PUE targets getting stricter. Liquid cooling becoming standard, not exception.</li>
        </ul>
      </section>

      {/* ── INTERVIEW QUESTIONS ────────────────────────────────────────── */}
      <section id="interview-questions">
        <h2 style={S.h2}>Interview Questions</h2>
        {[
          {
            q: "What is the fundamental difference between NPU, GPU, and TPU?",
            a: "GPU is a general-purpose parallel processor — originally for graphics, repurposed for AI. Thousands of CUDA cores, the CUDA ecosystem, flexible for any AI workload. TPU is Google's matrix-multiply specialist ASIC — only for AI training/inference, TF/JAX optimized, Google Cloud only. NPU is a low-power mobile/edge AI engine — in the milliwatt to watt range, designed for on-device inference, MAC Array based. Key distinction: GPU flexibility is high but less efficient per operation than specialist chips. TPU/ASIC gives maximum efficiency for the target workload but zero flexibility. NPU gives extreme power efficiency but limited model size/compute. The right chip choice depends on: (1) use case (cloud training vs edge inference), (2) framework (CUDA vs TF/JAX), (3) power envelope, (4) data privacy requirements.",
          },
          {
            q: "What is the difference between FPGA and ASIC — when to choose which?",
            a: "FPGA: a reprogrammable chip. You can change the logic through software. Whiteboard analogy — write, erase, rewrite. Lower per-unit cost, weeks to deploy, buy an FPGA off the shelf. Limitation: 3-5x more power, 5-10x higher cost per unit vs an equivalent ASIC. ASIC: a permanently fixed chip for one specific job. Printed book analogy — once printed, can't change, but very efficient to read. $10M+ upfront design cost, 18-24 month lead time. Maximum efficiency for the target workload. Choose FPGA when: the algorithm might change (research phase), volume is low (<50K units), you need a rapid prototype, time-to-market is critical, or compliance requires on-premises flexible compute. Choose ASIC when: the algorithm is stable for 3+ years, volume is very high (millions), maximum efficiency is critical (battery/power constrained), and there's a budget for chip design. Hyperscalers choose ASIC (TPU, Trainium). Research teams choose FPGA. Most companies: just buy a GPU.",
          },
          {
            q: "What is the process for migrating to AWS Trainium and what are the challenges?",
            a: "Process: (1) install the AWS Neuron SDK, (2) compile your PyTorch/TF model with the Neuron compiler (neuron-cc command), (3) check compilation success — you'll get a list of unsupported ops in the error, (4) benchmark once it compiles successfully — throughput, latency GPU vs Trainium, (5) do a cost comparison (GPU hours vs Trn1 hours x ratio), (6) migrate if favorable. Key challenges: the Neuron SDK has limited op support — custom CUDA kernels, some advanced PyTorch ops don't run on Trainium. Dynamic shapes cause recompilation (an XLA-like problem). Smaller community — debugging is harder, less Stack Overflow help. A FlashAttention equivalent exists natively for Neuron but may lag the CUDA version. Recommendation: test model compilation success first, then benchmark, then commit. Don't assume migration is easy — every model is a different experience.",
          },
          {
            q: "Why is DPU used in the data center — when does the ROI turn positive?",
            a: "A DPU (Data Processing Unit) offloads network and storage I/O tasks from the CPU. In AI workloads: network I/O (gradient sync in distributed training), storage I/O (training data loading), TLS/security, load balancing — all of these CPU tasks starve the GPU of data. Without a DPU: the CPU is 30-40% busy with I/O, GPU utilization is 60-70%, and an expensive GPU sits idle waiting. With a DPU: I/O is offloaded, the CPU is free for GPU orchestration, GPU utilization is 85-95%, training is 10-20% faster. ROI is positive when: large GPU clusters (16+ GPU nodes doing distributed training), high network I/O workloads (frequent gradient sync, large dataset streaming), multi-tenant environments (where isolation matters), security-sensitive AI (the DPU handles encryption without CPU overhead). ROI is negative/overkill for: single GPU workstations, research experiments, small teams. DPU examples: NVIDIA BlueField-3, Marvell OCTEON, Intel IPU.",
          },
          {
            q: "Why do training and inference need different hardware?",
            a: "The hardware requirements for training and inference are fundamentally different. Training needs: (1) very high memory capacity — model weights + gradients + optimizer states = 3-4x model size. A 70B model: ~560 GB for full training. (2) high memory bandwidth — frequent weight updates during backprop. (3) large batch sizes — more samples per gradient step = more stable convergence. (4) scale-out interconnect — the model is too large for one chip, gradient sync across chips. (5) BF16/FP16 precision. Inference needs: (1) low latency — the user is waiting for a response, milliseconds matter. (2) high throughput — thousands of concurrent users. (3) INT8/INT4 quantization support — smaller precision = 2-4x faster compute. (4) lower memory — weights only, no gradients. (5) cost-per-query optimization. Best practice: train on H100/TPU (high memory, high bandwidth), quantize the model to INT8, deploy on an inference-optimized chip (Inferentia, L4, A10G). H100 inference is often 3-5x more expensive per query than a dedicated inference chip for the same throughput.",
          },
          {
            q: "What is unique about Cerebras WSE's architecture and when is it used?",
            a: "Cerebras WSE is unique because it turns the entire semiconductor wafer into one chip — normal chips are cut from the wafer. WSE-3: 900,000 AI cores, 44 GB on-chip SRAM (a GPU's L2 cache is 80 MB — the WSE has 550x more on-chip memory), 125 PFLOPS BF16. Key advantage: no inter-chip communication — all cores are on a single die. Model weights fit in on-chip SRAM → the HBM bandwidth bottleneck goes away. On a GPU, LLM inference: attention layers have to repeatedly load weights from HBM (slow). On WSE: weights are on-chip, no HBM round-trips for those weights → a significant latency improvement. When to use it: large model single-chip inference (latency critical), scientific computing with irregular patterns, LLM inference where memory bandwidth is the bottleneck. Limitations: cannot scale beyond one chip (unlike GPU multi-chip pods), very large models still need MemoryX expansion, specialized deployment, a niche ecosystem. Practical access: mostly through Cerebras Cloud or direct partnerships.",
          },
        ].map((item, i) => (
          <div key={i} style={{ borderLeft: "4px solid #ea580c", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
            <p style={{ fontWeight: 700, color: "#7c2d12", marginBottom: "0.5rem" }}>Q: {item.q}</p>
            <p style={S.p}>{item.a}</p>
          </div>
        ))}
      </section>

      {/* ── GLOSSARY ───────────────────────────────────────────────────── */}
      <section id="glossary">
        <h2 style={S.h2}>Glossary</h2>
        <ComparisonTable
          headers={["Term", "Plain English Definition"]}
          rows={[
            ["ASIC (Application Specific Integrated Circuit)", "A chip permanently designed for ONE specific job. Maximum efficiency, zero flexibility. Examples: Google TPU, AWS Trainium, Apple Neural Engine."],
            ["BSP (Bulk Synchronous Parallel)", "Graphcore IPU's execution model: compute phase → communicate phase → repeat. Deterministic, good for iterative algorithms."],
            ["CoWoS (Chip on Wafer on Substrate)", "Advanced chip packaging from TSMC. Multiple chips (CPU, HBM, etc.) packaged together on one substrate. Enables HBM integration."],
            ["DLC (Direct Liquid Cooling)", "Cold plates directly on chip surface carrying water to remove heat. Mandatory for high-density AI racks (>15kW)."],
            ["DOCA (Data Center Infrastructure on a Chip Architecture)", "NVIDIA's SDK for programming BlueField DPU. Like CUDA but for network/storage offload."],
            ["DPU (Data Processing Unit)", "Network-on-a-chip that offloads I/O work from CPU. Lets GPU focus on AI compute. Example: NVIDIA BlueField."],
            ["FPGA (Field Programmable Gate Array)", "Reprogrammable chip — change its logic via software after manufacturing. Flexible but less efficient than ASIC."],
            ["HBM (High Bandwidth Memory)", "3D-stacked fast memory directly on AI chip package. 10-30× faster than regular DRAM. Used in GPU, TPU, custom AI chips."],
            ["HDL (Hardware Description Language)", "Language for describing digital circuits (VHDL, Verilog). Used to program FPGAs and design ASICs."],
            ["HLS (High Level Synthesis)", "Tool that converts C/C++ code into FPGA hardware description. Makes FPGA programming more accessible."],
            ["INT8 / INT4 (Quantized Formats)", "Reduced precision number formats for inference. Smaller numbers = faster compute = lower memory. Small quality loss acceptable for inference."],
            ["IPU (Intelligence Processing Unit)", "Graphcore's AI chip. Optimized for sparse, irregular computation patterns — different architecture from GPU."],
            ["LUT (Look-Up Table)", "Basic building block of FPGA — a small reprogrammable logic element that implements any boolean function."],
            ["MAC (Multiply-Accumulate)", "The fundamental AI operation: multiply two numbers, add to running total. NPU's MAC Array does many of these simultaneously."],
            ["MTIA (Meta Training and Inference Accelerator)", "Meta's custom AI chip for recommendation systems (Facebook, Instagram feed ranking)."],
            ["Neuron SDK", "AWS's compiler and runtime for Trainium and Inferentia chips. Converts PyTorch/TF models to run on AWS custom chips."],
            ["NPU (Neural Processing Unit)", "Low-power AI engine for mobile/edge devices. 1-5W vs GPU's 300-700W. Your phone's Face ID uses this."],
            ["RDU (Reconfigurable Dataflow Unit)", "SambaNova's chip architecture — combines FPGA flexibility with ASIC efficiency via reconfigurable dataflow design."],
            ["ROCm (Radeon Open Compute)", "AMD's open-source GPU computing platform. Alternative to CUDA for AMD GPUs."],
            ["RoCE 2.0 (RDMA over Converged Ethernet)", "Open standard for high-speed server interconnect. Used by Gaudi 3 — doesn't require proprietary switches like InfiniBand."],
            ["SoC (System on Chip)", "Multiple components (CPU, GPU, NPU, memory controller) integrated on one chip. Used in phones, embedded devices."],
            ["TOPS (Tera Operations Per Second)", "Trillion operations per second. Common measure for NPU performance. Different from GPU TFLOPS (which measures floating-point ops)."],
            ["TPU (Tensor Processing Unit)", "Google's matrix multiply ASIC. Systolic array architecture. Training and inference. Google Cloud only."],
            ["WSE (Wafer Scale Engine)", "Cerebras's chip that uses the ENTIRE semiconductor wafer as one chip. Massive on-chip SRAM, no inter-chip comm."],
          ]}
        />
      </section>

      {/* ── KEY TAKEAWAYS ──────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li>AI accelerators are a spectrum — from CPU (flexible, inefficient for AI) to ASIC (inflexible, maximally efficient for one AI task). GPU is the sweet spot because it balances flexibility and performance. The CUDA ecosystem made GPU dominant — software lock-in matters more than hardware specs.</li>
          <li>The NPU (Neural Processing Unit) is already in your phone — it's what runs Face ID, voice assistant, and camera AI. In 1-5 Watts. A cloud GPU uses 300-700W. The edge AI revolution is being built on the NPU — DC engineers need to know how to design hybrid edge-cloud architectures.</li>
          <li>The DPU (Data Processing Unit) improves GPU performance without touching the GPU. Offloading network + storage I/O from the CPU improves GPU utilization from 60-70% to 85-95%. A 10-20% training speedup just from I/O offload. Evaluate DPU investment for large GPU clusters (16+ nodes).</li>
          <li>FPGA vs ASIC: FPGA is a whiteboard (flexible, change anytime, higher cost per unit). ASIC is a printed book (fixed, maximum efficiency, lower cost at scale, $10M+ upfront). Most companies should use a GPU — ASIC only pays off for hyperscalers.</li>
          <li>AWS Trainium/Inferentia: same Neuron SDK, different jobs. Trainium = building the model (training). Inferentia = selling the model (inference). 40-60% cheaper inference vs H100 on AWS — but only if the Neuron SDK supports your model. Test first, migrate later.</li>
          <li>Intel Gaudi 3: comparable specs to H100, open RoCE 2.0 networking (works with standard switches, no proprietary InfiniBand needed), available on-premises (unlike TPU). The software ecosystem is smaller than CUDA — evaluate based on your framework requirements and willingness to invest in the SynapseAI SDK.</li>
          <li>Cerebras WSE: a radical architecture — the entire wafer as one chip. 900K cores, 44 GB on-chip SRAM. No inter-chip communication bottleneck. Ideal for latency-critical large model inference. Cannot scale multi-chip. Specialized deployment. Not for everyone — but technically compelling for the right workloads.</li>
          <li>Training vs inference hardware: Always separate budget and strategy. Train on high-memory, high-bandwidth GPU/TPU. Quantize model to INT8. Deploy on inference-optimized chip. H100 inference often 3-5× more expensive per query than L4 or Inferentia for same throughput.</li>
          <li>Data center planning: Power density varies dramatically — CPU server 3-5 kW/rack, GPU server 10-25 kW/rack, TPU Pod 40-100 kW/rack, Cerebras 23 kW single unit. Liquid cooling threshold: 15-20 kW/rack. Plan DLC infrastructure from day 1 if hosting any GPU/ASIC AI chips — retrofitting is 3× more expensive. Storage bandwidth must match compute throughput.</li>
          <li>The CUDA ecosystem moat is real: even when alternative hardware specs match GPU, the CUDA ecosystem (FlashAttention, DeepSpeed, cuDNN, HuggingFace optimization) has over a decade of optimization behind it. Switching cost = engineer time + potential performance regression + limited community support. Evaluate holistically — not just hardware specs, but total cost including migration and operations.</li>
        </ul>
      </section>

    </article>
  );
}
