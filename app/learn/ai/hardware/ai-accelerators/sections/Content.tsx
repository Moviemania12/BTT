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
          GPU sirf ek option hai AI ke liye — lekin sirf ek option nahi hai. Aaj 2024 mein AI hardware landscape mein bohot saare players hain: NPU aapke phone mein hai (Face ID use karta hai), DPU aapke data center network mein hai (data flow manage karta hai), FPGA ek reprogrammable chip hai (researcher ka best friend), ASIC ek permanently optimized chip hai (hyperscaler ka choice), aur phir custom chips hain — AWS Trainium, Intel Gaudi, Cerebras, Graphcore — sab apne aap mein alag approach.
        </p>
        <p style={S.p}>
          Yeh article in sab ko ek jagah explain karta hai — beginner se engineer level tak. Kaunsa chip kya karta hai, kab use karein, data center mein kaise deploy hota hai, power aur cooling kya chahiye — sab kuch.
        </p>
        <Callout type="important" title="Ek Line Reality Check">
          NVIDIA GPU AI infrastructure ka dominant choice hai aur rahega — lekin blindly GPU choose karna galat hai. Sahi chip ka selection use case, scale, framework, aur budget pe depend karta hai. Yeh article aapko woh decision confidently karne mein help karega.
        </Callout>
      </section>

      {/* ── WHO SHOULD READ ────────────────────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>AI/ML Engineers:</strong> GPU ke alternatives samajhna — kab AWS Trainium, Intel Gaudi, ya Cloud TPU consider karein aur kab simply GPU pe rehna sahi hai.</li>
          <li><strong>Data Center Engineers:</strong> Different accelerators ke power, cooling, networking, aur rack density requirements — planning ke liye concrete numbers.</li>
          <li><strong>Cloud/Infrastructure Architects:</strong> Training vs inference hardware selection, multi-chip scale-out design, software stack compatibility.</li>
          <li><strong>Product Managers aur Technical Architects:</strong> Custom silicon strategy — kab GPU kharidna sahi hai aur kab FPGA ya ASIC development justify hota hai.</li>
          <li><strong>Students aur Freshers:</strong> AI hardware ka complete landscape — ek jagah, simple language mein.</li>
        </ul>
      </section>

      {/* ── WHAT YOU WILL LEARN ────────────────────────────────────────── */}
      <section id="what-you-will-learn">
        <h2 style={S.h2}>What You Will Learn</h2>
        <ul style={S.ul}>
          <li>AI accelerator landscape — CPU se ASIC tak, sab types ka overview</li>
          <li>NPU (Neural Processing Unit) — phone mein AI kaise kaam karta hai</li>
          <li>DPU (Data Processing Unit) — data center mein AI data flow manager</li>
          <li>FPGA for AI — reprogrammable chip, kab use karein</li>
          <li>ASIC design philosophy — kab custom silicon justify hota hai</li>
          <li>AWS Trainium aur Inferentia — Amazon ke custom AI chips</li>
          <li>Intel Gaudi 3 — H100 alternative, real comparison</li>
          <li>Cerebras WSE — wafer-scale chip, unique architecture</li>
          <li>Graphcore IPU — different approach to AI compute</li>
          <li>SambaNova — enterprise on-premises AI system</li>
          <li>Edge AI chips — on-device inference landscape</li>
          <li>Training vs inference hardware differences</li>
          <li>Data center deployment — power, cooling, networking per chip type</li>
          <li>Custom silicon strategy — GPU vs build your own decision</li>
          <li>Software ecosystem — CUDA dominance aur alternatives</li>
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
          2012 mein AlexNet ne ImageNet competition jeet li aur GPU-based deep learning ka era shuru hua. Tab se ek simple assumption ban gayi AI world mein: AI = NVIDIA GPU.
        </p>
        <p style={S.p}>
          Yeh assumption 2024 mein accurate nahi rahi. Aaj aapke phone mein Apple Neural Engine hai (on-device AI ke liye), aapke data center server mein NVIDIA BlueField DPU hai (network offload ke liye), AWS ke cloud mein Trainium chips hain (training ke liye), aur Google ke racks mein TPUs hain (Gemini ke liye). Sab "AI accelerators" hain — lekin sab bilkul alag hain.
        </p>
        <p style={S.p}>
          <strong>Simple question:</strong> Kisi bhi AI system mein, computation slow kyon hota hai? Kyunki ek regular chip — CPU — ek time pe ek kaam karta hai (sequential), lekin AI math (matrix multiplication) mein ek saath lakhon calculations karni hoti hain (parallel). AI accelerator ek chip hai jo parallel math efficiently kar sake.
        </p>
        <p style={S.p}>
          Lekin "efficiently" ka matlab alag-alag chips ke liye alag hai. GPU efficiently karta hai via thousands of CUDA cores. TPU efficiently karta hai via systolic array. NPU efficiently karta hai via low-power fixed pipeline. Har approach ke tradeoffs hain.
        </p>
        <Callout type="best-practice" title="Why This Matters for Data Center Engineers">
          Har alag accelerator type ke alag power requirements, cooling methods, network interfaces, aur rack footprints hain. GPU server: ~10 kW per chassis, liquid cooling recommended. TPU Pod: 40-100 kW per rack, liquid mandatory. NPU: milliwatts, fan-less. Aapko sab samajhne honge kyunki future DC infrastructure will host mix of these chips.
        </Callout>
      </section>

      {/* ── WHY ACCELERATORS EXIST ─────────────────────────────────────── */}
      <section id="why-accelerators-exist">
        <h2 style={S.h2}>Why AI Accelerators Exist</h2>
        <p style={S.p}>
          <strong>Simple answer:</strong> CPU AI math ke liye bahut slow aur power-hungry hai at scale.
        </p>
        <p style={S.p}>
          <strong>Concrete example:</strong> Ek smartphone mein Face ID ke liye Apple Neural Engine ek recognition ~1 millisecond mein karta hai aur &lt;1 Watt use karta hai. Agar wahi kaam CPU pe karo — 100+ milliseconds aur 5+ Watts. Battery ek ghante mein khatam ho jaayegi.
        </p>
        <p style={S.p}>
          Cloud scale pe: Google Search pe ek query process karna = dozens of neural network operations. Google billions of queries per day handle karta hai. Standard CPU se karna: thousands of servers chahiye, expensive aur energy-intensive. Google TPU se: fraction of the servers, fraction of the electricity.
        </p>
        <p style={S.p}>
          <strong>Three reasons AI accelerators dominate:</strong>
        </p>
        <ul style={S.ul}>
          <li><strong>Parallelism:</strong> AI math = same operation on many data points simultaneously. CPU: 8-128 cores. GPU: 10,000+ cores. NPU: dedicated parallel pipelines. Accelerators win.</li>
          <li><strong>Memory bandwidth:</strong> AI operations need to read/write model weights rapidly. CPU uses DDR5 (~100 GB/s). GPU uses HBM3 (~3.35 TB/s). 33× faster memory access = 33× less waiting.</li>
          <li><strong>Specialization:</strong> CPU die area mein: branch prediction, out-of-order execution, large caches — all for general purpose. AI accelerator die area: mostly matrix multiply units. Specialization = efficiency for the target workload.</li>
        </ul>
      </section>

      {/* ── ACCELERATOR LANDSCAPE ──────────────────────────────────────── */}
      <section id="accelerator-landscape">
        <h2 style={S.h2}>The AI Accelerator Landscape</h2>
        <p style={S.p}>
          Ek overview se shuru karte hain — sab types ek jagah.
        </p>
        <Figure caption="The AI Accelerator Landscape: from general-purpose CPU to extreme-specialist Custom ASICs. GPU is the sweet spot for most teams. Custom ASICs (TPU, Trainium, Inferentia) only make sense at hyperscaler scale (billions of queries/day). NPU handles on-device AI. DPU handles data movement.">
          <AcceleratorLandscape />
        </Figure>
        <p style={S.p}>
          <strong>The spectrum — from flexible to specialist:</strong>
        </p>
        <ul style={S.ul}>
          <li><strong>CPU (Central Processing Unit):</strong> Maximum flexibility, minimum AI efficiency. Every computer has one. AI pe kaam karta hai lekin slowly aur expensively at scale.</li>
          <li><strong>GPU (Graphics Processing Unit):</strong> The AI workhorse. Originally for graphics (pixels), repurposed for AI (parallel math). CUDA ecosystem ne ise AI ka default bana diya.</li>
          <li><strong>TPU (Tensor Processing Unit):</strong> Google's matrix multiply specialist. (Covered in detail in previous article — <TopicLink slug="tpu" variant="inline" />)</li>
          <li><strong>NPU (Neural Processing Unit):</strong> Mobile/edge low-power AI engine. Aapke phone mein hota hai. This article covers in detail.</li>
          <li><strong>DPU (Data Processing Unit):</strong> Network + storage I/O specialist. CPU aur GPU ka burden lift karta hai. This article covers in detail.</li>
          <li><strong>FPGA (Field Programmable Gate Array):</strong> Reprogrammable chip. Flexible but complex to program. Detailed coverage in this article.</li>
          <li><strong>ASIC (Application Specific Integrated Circuit):</strong> Permanently optimized chip for one job. Maximum efficiency, zero flexibility. AWS Trainium, Intel Gaudi, Cerebras — all ASICs.</li>
        </ul>
      </section>

      {/* ── NPU ────────────────────────────────────────────────────────── */}
      <section id="npu">
        <h2 style={S.h2}>NPU — Neural Processing Unit</h2>
        <p style={S.p}>
          <strong>NPU (Neural Processing Unit)</strong> — yeh woh chip hai jo aapke phone mein face unlock karta hai, voice assistant ko "Hey Siri" ya "OK Google" sunata hai, camera mein scene detect karta hai, aur real-time translation karta hai — sab kuch bina cloud pe jaaye, milliseconds mein, battery barely use karke.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> GPU ek powerful factory hai — thousands of workers, high electricity, big building. NPU ek specialized small workshop hai — few dedicated workers, low electricity, compact space. Factory zyada produce kar sakti hai, lekin workshop apna specific kaam bohot efficiently karta hai aur aapke bag mein fit hota hai.
        </p>
        <Figure caption="NPU (Neural Processing Unit) inside a mobile SoC (System on Chip): MAC Array does AI math, SRAM is fast on-chip memory, DMA Engine moves data efficiently, Scheduler manages tasks, and Power Manager keeps battery drain minimal at 1-5 Watts — vs cloud GPU at 300-700 Watts.">
          <NpuArchitecture />
        </Figure>
        <p style={S.p}>
          <strong>How NPU kaam karta hai — technically:</strong> NPU mein ek <strong>MAC Array (Multiply-Accumulate Array)</strong> — yeh woh hardware hai jo matrix multiplication karta hai, same as GPU ka Tensor Core ya TPU ka MXU, lekin much smaller aur lower power. On-chip SRAM (fast local memory) model weights ke important parts ko store rakhta hai taaki slow DRAM access minimum ho. DMA Engine (Direct Memory Access — dedicated data mover) background mein data load/store karta hai jab MAC Array compute kar raha hota hai.
        </p>
        <ul style={S.ul}>
          <li><strong>Apple Neural Engine (ANE):</strong> Apple ke A-series aur M-series chips mein. A17 Pro: 35 TOPS (Tera Operations Per Second — trillion operations/second). Face ID, Siri, on-device ML all run here. INT8 precision.</li>
          <li><strong>Qualcomm Hexagon NPU:</strong> Snapdragon chipsets mein (Samsung, OnePlus, Motorola Android phones). Hexagon AI engine with dedicated DSP (Digital Signal Processor). 73 TOPS on latest Snapdragon 8 Gen 3.</li>
          <li><strong>Google Tensor chip:</strong> Pixel phones mein. Custom designed by Google. Tight integration with Google's TFLite models (speech recognition, photo processing).</li>
          <li><strong>MediaTek APU:</strong> Budget Android phones mein. APU (AI Processing Unit) is MediaTek's NPU variant. 5-45 TOPS depending on chip tier.</li>
          <li><strong>Samsung Exynos NPU:</strong> Samsung's own phones (Korea, some markets). Neural processing unit with Samsung's One UI AI features.</li>
        </ul>
        <Callout type="best-practice" title="DC Engineer Perspective: Why NPUs Matter for Data Centers">
          Edge AI revolution NPU se driven hai. Future DC architecture mein: not everything will go to cloud. Time-sensitive inference (factory robot reaction, autonomous vehicle, real-time security camera), privacy-sensitive inference (medical device, financial transaction), aur bandwidth-constrained inference (remote location) will all happen on-device via NPU. DC engineers design hybrid systems: NPU handles first-pass inference on device, complex cases escalate to cloud GPU.
        </Callout>
      </section>

      {/* ── DPU ────────────────────────────────────────────────────────── */}
      <section id="dpu">
        <h2 style={S.h2}>DPU — Data Processing Unit</h2>
        <p style={S.p}>
          <strong>DPU (Data Processing Unit)</strong> — yeh directly AI compute nahi karta. Lekin AI workloads ke liye ek hidden bottleneck solve karta hai. Samajhna zaroori hai.
        </p>
        <p style={S.p}>
          <strong>The problem it solves:</strong> Ek GPU training job mein, GPU sirf AI math karta hai. Lekin AI math se pehle — data storage se data load karna hai, network pe gradient sync karna hai (distributed training), TLS/SSL security handle karni hai, load balancing manage karni hai. Yeh sab kaam traditionally CPU karta hai. Ek busy GPU cluster mein CPU in I/O tasks mein itna busy rehta hai ki GPU ke liye data pipeline ready karna late ho jaata hai — GPU waits. $30,000 ka GPU idle baitha hai CPU ka wait karke.
        </p>
        <p style={S.p}>
          <strong>DPU ka solution:</strong> Network card (NIC) ko ek full processor bana do. DPU ek network card hai jispe ek ARM processor, dedicated network acceleration, aur storage engines hain. Yeh CPU se sab I/O tasks le leta hai — network, storage, security. CPU free ho jaata hai GPU orchestration ke liye. GPU continuously fed rehta hai. 10-20% training speedup sirf I/O offload se.
        </p>
        <Figure caption="DPU (Data Processing Unit) in an AI Data Center: Without DPU, CPU wastes 30-40% time on network/storage I/O, and GPU sits idle waiting for data. With DPU, all I/O is offloaded to the DPU — CPU manages GPU orchestration, GPU does AI compute 85-95% of the time.">
          <DpuDataCenter />
        </Figure>
        <ul style={S.ul}>
          <li><strong>NVIDIA BlueField-3 DPU:</strong> Most widely deployed. 400 GbE networking, ARM Cortex cores onboard, DOCA software framework. Direct integration with NVIDIA GPU servers (DGX H100 mein optional BlueField). NVIDIA&apos;s vision: every AI server has a DPU.</li>
          <li><strong>Marvell OCTEON:</strong> Enterprise networking DPU. Strong in telecom and cloud provider deployments. Lower power than BlueField.</li>
          <li><strong>Intel IPU (Infrastructure Processing Unit):</strong> Intel ka DPU equivalent. Integrated with Intel Xeon ecosystem. Mount Evans IPU specifically for cloud-scale infrastructure offload.</li>
          <li><strong>Fungible DPU (acquired by Microsoft):</strong> Microsoft acquired Fungible (2023) — expect Azure-specific DPU deployments.</li>
        </ul>
        <Callout type="important" title="When DPU Makes Sense — and When It Doesn't">
          DPU ROI positive hai: Large GPU clusters (16+ GPUs), high-throughput distributed training, multi-tenant GPU serving (isolation important), security-sensitive AI workloads. DPU overkill hai: Single GPU workstations, small teams, research experiments. Practical threshold: if your AI cluster has 8+ GPU nodes doing distributed training, DPU investment worth evaluating.
        </Callout>
      </section>

      {/* ── FPGA FOR AI ────────────────────────────────────────────────── */}
      <section id="fpga-for-ai">
        <h2 style={S.h2}>FPGA for AI — The Reprogrammable Chip</h2>
        <p style={S.p}>
          <strong>FPGA (Field Programmable Gate Array)</strong> — yeh ek chip hai jise aap software se reprogram kar sakte ho. "Field Programmable" ka matlab hai: factory se baad bhi, field mein deploy hone ke baad bhi, aap iska logic change kar sakte ho.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> FPGA ek whiteboard hai. Aap kuch likho, mita do, kuch aur likho. Har baar bilkul nayi cheez. ASIC ek printed book hai — ek baar print hone ke baad change nahi hogi, lekin padhna bahut fast hai. FPGA whiteboard ki tarah flexible hai, ASIC printed book ki tarah efficient.
        </p>
        <p style={S.p}>
          <strong>Technically kaise kaam karta hai:</strong> FPGA mein thousands of <strong>LUTs (Look-Up Tables — reprogrammable logic blocks)</strong> hote hain jo ek grid mein connected hain. Aap <strong>HDL (Hardware Description Language — jaise VHDL ya Verilog)</strong> ya modern high-level tools (Intel HLS, Xilinx HLS — High Level Synthesis) use karke define karte ho ki yeh LUTs kaise behave karein. Load hone ke baad, FPGA woh custom logic run karta hai — hardware level pe, very fast.
        </p>
        <Figure caption="FPGA (Reprogrammable Chip — like a whiteboard, change anytime) vs ASIC (Permanent Custom Chip — like a printed book, fixed forever but very efficient). FPGA: faster to market, flexible, higher cost per unit. ASIC: 18-24 months design time, $10M+ upfront, but 5-10x cheaper per unit at scale and 3-5x more power efficient.">
          <FpgaVsAsic />
        </Figure>
        <p style={S.p}>
          <strong>AI ke liye FPGA kab use hota hai:</strong>
        </p>
        <ul style={S.ul}>
          <li><strong>Low-latency inference:</strong> FPGA pipelined architecture microsecond-level inference possible banata hai — faster than GPU at some specific tasks. High-frequency trading firms AI inference on FPGA run karte hain for sub-millisecond decisions.</li>
          <li><strong>Edge deployment:</strong> FPGA configurable power profile allow karta hai — GPU se much less power. Industrial IoT, medical devices, defense systems mein FPGA common hai.</li>
          <li><strong>Algorithm prototyping:</strong> ASIC banane se pehle algorithm validate karo FPGA pe. Much cheaper than building wrong ASIC.</li>
          <li><strong>Custom data pipelines:</strong> Real-time data preprocessing (video stream, sensor data) — FPGA custom pipeline bahut efficient hoti hai.</li>
          <li><strong>Protocol flexibility:</strong> Network protocols jo CPU/GPU efficiently handle nahi karte, FPGA custom hardware implement kar sakta hai.</li>
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
          <strong>ASIC (Application Specific Integrated Circuit)</strong> — ek chip jo ek specific kaam ke liye permanently design kiya gaya hai. "Application Specific" = sirf ek application ke liye. "Integrated Circuit" = ek silicon chip pe sab kuch.
        </p>
        <p style={S.p}>
          Google TPU ek ASIC hai — sirf matrix multiplication ke liye optimized. AWS Trainium ek ASIC hai — sirf neural network training ke liye. Apple A17 Neural Engine ek ASIC hai — sirf on-device AI inference ke liye.
        </p>
        <p style={S.p}>
          <strong>Why ASIC is the ultimate chip (for the right use case):</strong> Jab ek chip ek hi kaam kare, toh us kaam ke liye har transistor perfectly placed ho sakta hai. Koi wasted space nahi — general-purpose circuits ke liye koi area reserve nahi. Result: FPGA se 3-5× more power efficient, FPGA se 5-10× lower cost per unit at scale, maximum performance for that specific workload.
        </p>
        <ul style={S.ul}>
          <li><strong>Design cost:</strong> $10M–$100M+ for chip design, mask creation, tape-out. Only makes sense at very high volume (millions of queries per day) or high-value applications.</li>
          <li><strong>Time to market:</strong> 18–24 months from design start to first silicon. Risk: agar algorithm change ho jaaye is beech, ASIC obsolete ho sakti hai.</li>
          <li><strong>Who designs ASICs:</strong> Mostly hyperscalers (Google, AWS, Meta, Microsoft, Apple, Tesla) aur specialized chip companies. Regular enterprises: GPU use karo — ASIC investment justify nahi hota.</li>
          <li><strong>Manufacturing:</strong> TSMC, Samsung Foundry — same foundries jo NVIDIA ke GPUs banati hain. Advanced process nodes (5nm, 3nm) use karte hain AI ASICs.</li>
        </ul>
        <Callout type="important" title="The ASIC Paradox">
          ASIC sabse efficient chip hai — lekin tabhi kab banaao jab volume itni zyada ho ki design cost justify ho. Google ne TPU v1 banaya kyunki unhe billions of daily queries handle karni thi aur CPU/GPU per query cost too high tha. Ek startup ke liye wahi decision — GPU use karo, ASIC mat banao.
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
          <strong>AWS Trainium</strong> (chip naam) — Amazon ka custom ASIC specifically AI model training ke liye banaya gaya. "Trn1" instance type pe available hai AWS EC2 pe.
        </p>
        <p style={S.p}>
          <strong>Why Amazon built it:</strong> AWS thousands of GPU instances rent karta tha (NVIDIA se). At scale, margin thin tha. Custom chip banao → cost control, differentiation, better margin. Yahi reason hai Google (TPU), Microsoft (Maia), Meta (MTIA) ne bhi custom chips banaye — volume justify karta hai.
        </p>
        <Figure caption="AWS Trainium (model builder) vs AWS Inferentia (model server): Trainium has high memory, NeuronLink for multi-chip scale-out, BFloat16 for training. Inferentia has low-latency INT8 support, 40-60% cheaper than GPU inference at AWS. Both use the same Neuron SDK for PyTorch/TensorFlow code compilation.">
          <AwsChipsDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Trainium (Trn1) chip specs:</strong> NeuronCore v2, 32 GB HBM2e per chip, BFloat16 + FP32 + FP16 + INT8 support. NeuronLink: Amazon ka custom chip-to-chip interconnect (like NVLink for GPU).</li>
          <li><strong>Trn1 instance:</strong> Trn1.2xl (1 chip), Trn1.32xl (16 chips, 512 GB total HBM). Up to 3.4 petaflops BF16 in Trn1.32xl.</li>
          <li><strong>Trn2 (2024):</strong> Second generation, improved performance, more memory. Verify current specs on AWS documentation.</li>
          <li><strong>Software: Neuron SDK:</strong> AWS ne ek SDK banaya hai jo PyTorch aur TensorFlow code Trainium ke liye compile karta hai. Same concept as Google ka XLA. Models ko "neuron compile" karna padta hai — first compile slow, subsequent runs fast.</li>
          <li><strong>Cost advantage:</strong> AWS claims 50% lower training cost vs P4de (A100) instances for suitable workloads. Actual savings depend heavily on model type aur whether it compiles cleanly via Neuron SDK.</li>
          <li><strong>Limitation:</strong> Neuron SDK ecosystem CUDA se much smaller. Not all PyTorch operations supported. Custom ops may need rewriting. Debugging less mature. Same tradeoffs as switching to any non-NVIDIA chip.</li>
        </ul>
        <Callout type="best-practice" title="When to Try Trainium">
          Trainium pe shift karo agar: AWS pe already training kar rahe ho, standard transformer architectures use ho rahi hain (BERT, T5, LLaMA family), Neuron SDK mein tumhara model compile hota ho (test karo pehle), aur 30%+ cost savings ka target realistic ho. Test karo: Neuron Compiler pe apna model run karo → compilation success check karo → benchmark vs P4/P3 → phir decision.
        </Callout>
      </section>

      {/* ── AWS INFERENTIA ─────────────────────────────────────────────── */}
      <section id="aws-inferentia">
        <h2 style={S.h2}>AWS Inferentia — Amazon's Inference Chip</h2>
        <p style={S.p}>
          <strong>AWS Inferentia</strong> — Trainium ka sibling, lekin alag job ke liye. Inferentia trained models serve karne ke liye optimize kiya gaya hai — training nahi, production inference.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> Trainium ek factory hai — high capital, runs continuously, produces the product. Inferentia ek retail store hai — lower cost per transaction, customer-facing, scale up/down with demand.
        </p>
        <ul style={S.ul}>
          <li><strong>Inf2 chip specs:</strong> NeuronCore v2 (same architecture family as Trainium), 32 GB HBM2e per chip, INT8 + BF16 + FP16 support. NeuronLink: multiple Inf2 chips connect for large model serving.</li>
          <li><strong>Inf2.48xl:</strong> 12 chips, 384 GB total memory — enough to run 70B parameter models at FP16 inference without quantization.</li>
          <li><strong>Cost advantage:</strong> AWS claims 40-60% lower cost per inference vs G5 (A10G GPU) instances for supported models. Real savings depend on model, batch size, framework.</li>
          <li><strong>INT8 support:</strong> Quantized models (INT8) run faster and cheaper on Inferentia vs running FP16. AWS Neuron SDK mein automatic quantization tools available hain.</li>
          <li><strong>Same Neuron SDK:</strong> Trainium pe trained model → Neuron compile → Inferentia pe deploy. One SDK for both — this is a key advantage.</li>
          <li><strong>Use case examples:</strong> Hugging Face Transformers (BERT, GPT-2, DistilBERT) AWS ne specifically Inferentia ke liye optimize kiya hai. Many popular models ke liye pre-compiled Neuron artifacts available hain.</li>
        </ul>
      </section>

      {/* ── INTEL GAUDI ────────────────────────────────────────────────── */}
      <section id="intel-gaudi">
        <h2 style={S.h2}>Intel Gaudi — H100 Alternative</h2>
        <p style={S.p}>
          <strong>Intel Gaudi</strong> (originally Habana Labs — Intel ne 2019 mein acquire kiya) — Intel ka direct H100 competitor. Gaudi 2 aur Gaudi 3 data center training aur inference ke liye designed hain.
        </p>
        <p style={S.p}>
          <strong>Why Intel is a serious player:</strong> Gaudi 3 mein 96 GB HBM2e memory hai (H100 ke 80 GB se zyada) aur competitive BF16 performance hai. Most importantly: <strong>RoCE 2.0 (RDMA over Converged Ethernet)</strong> — yeh open standard networking hai, NVIDIA ke proprietary NVLink ke viparit. Matlab Gaudi chips standard 200GbE Ethernet switches ke saath scale hote hain — no vendor lock-in for networking.
        </p>
        <Figure caption="Intel Gaudi 3 Architecture: MME (Matrix Math Engine) for dense AI compute, TPC Clusters (programmable Tensor Cores equivalent), 96 GB HBM2e memory (more than H100's 80 GB), and RoCE 2.0 open networking (21×200GbE per chip) for scale-out without proprietary switches.">
          <IntelGaudiDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Gaudi 3 specs:</strong> ~1,835 BF16 TFLOPS (H100 ~1,979 TFLOPS — very close). 96 GB HBM2e. 21 × 200 GbE network ports per chip. 900 W TDP. PCIe Gen 5 host interface.</li>
          <li><strong>Software: Habana SynapseAI SDK:</strong> PyTorch aur TensorFlow support, Habana model optimization tools. Smaller ecosystem than CUDA but growing. Hugging Face Optimum Habana library models optimize karta hai.</li>
          <li><strong>Open networking advantage:</strong> Gaudi pods standard InfiniBand ya RoCE Ethernet se connect hote hain. NVIDIA ke NVLink ecosystem se independent scale-out possible. Lower networking cost for some configurations.</li>
          <li><strong>Availability:</strong> Intel Developer Cloud pe available. Select OEM server partners (Supermicro, HPE, Dell) Gaudi-based servers bechte hain. On-premises deployment possible — unlike TPU.</li>
          <li><strong>Who is using it:</strong> Stability AI, Intel flagship AI customers, select enterprises exploring non-NVIDIA options.</li>
        </ul>
        <Callout type="warning" title="Realistic Assessment of Gaudi">
          Hardware specs Gaudi 3 competitive banate hain. Lekin software ecosystem aur community support mein CUDA se significant gap hai. PyTorch Gaudi pe chalti hai lekin CUDA ka extensive library support (FlashAttention, DeepSpeed optimizations, custom kernels) sirf CUDA mein mature hai. Gaudi consider karo agar: NVIDIA hardware supply constrained hai, open networking important hai, aur team SynapseAI SDK invest kar sakti hai.
        </Callout>
      </section>

      {/* ── CEREBRAS WSE ───────────────────────────────────────────────── */}
      <section id="cerebras-wse">
        <h2 style={S.h2}>Cerebras WSE — The Wafer-Scale Engine</h2>
        <p style={S.p}>
          <strong>Cerebras WSE (Wafer Scale Engine)</strong> — semiconductor industry ka ek radical rethink. Normal chips: semiconductor wafer ko thousands of small chips mein cut karo. Cerebras: wafar ko cut mat karo — poori wafer ek chip hai.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> Normally ek apartment building banate ho — har apartment ek chip hai, residents (data) ko lifts (interconnects) se ek floor se doosre floor pe jaana padta hai. Cerebras ne poori city block ek apartment banaya — sab space aapka, koi lifts nahi, sab kuch ek hi level pe.
        </p>
        <Figure caption="Cerebras WSE-3 vs Normal Chip Approach: Normal approach cuts wafer into many small chips that need chip-to-chip communication. Cerebras uses the ENTIRE wafer as one chip — 900,000 AI cores, 44 GB on-chip SRAM, no inter-chip communication bottleneck. Die size: 46,225 mm² (vs H100's ~814 mm²).">
          <CerebrasDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>WSE-3 specs:</strong> 900,000 AI cores (Sparse Linear Algebra Compute cores), 44 GB on-chip SRAM (vs H100 ka 80 MB L2 cache — WSE-3 on-chip memory 550× more). 125 PFLOPS peak BF16. 46,225 mm² die size (H100: ~814 mm²).</li>
          <li><strong>Why massive on-chip SRAM matters:</strong> Large model weights on-chip memory mein fit ho sakti hain — HBM (off-chip) access ki zaroorat dramatically kam hoti hai. Memory bandwidth bottleneck remove hoti hai. Specific workloads pe dramatic speedups possible hain.</li>
          <li><strong>Main limitation — cannot scale beyond one chip:</strong> WSE is designed as a single-chip system. Multi-chip scaling (like GPU NVLink or TPU ICI) nahi hota. Model poori on-chip memory mein fit hona chahiye. Very large models (GPT-4 class) pe limited.</li>
          <li><strong>Cerebras CS-3 system:</strong> WSE-3 chip ek dedicated "MemoryX" memory system ke saath ata hai jo model weights store karta hai aur streaming fashion mein chip ko feed karta hai — workaround for large models that don't fit on-chip.</li>
          <li><strong>Software: Cerebras software stack:</strong> PyTorch aur TensorFlow support. Cerebras Graph Compiler code compile karta hai. Relatively simple programming model — less complex than GPU distributed training setup.</li>
          <li><strong>Deployment:</strong> On-premises or Cerebras Cloud. Cerebras ne dedicated AI supercomputer contracts (Abu Dhabi, Cincinnati, Saudi Arabia) liye hain.</li>
        </ul>
        <Callout type="best-practice" title="When Cerebras WSE Makes Sense">
          WSE compelling hai: Large model inference jahan single-chip latency critical hai, scientific computing (molecular dynamics, weather modeling) where computation graph irregular, LLM inference jahan HBM bandwidth bottleneck GPU pe hai. WSE not ideal: Multi-node training of frontier models, workloads requiring conventional multi-chip parallelism. Practical: access mostly via Cerebras Cloud or direct partnership — not available casually.
        </Callout>
      </section>

      {/* ── GRAPHCORE IPU ──────────────────────────────────────────────── */}
      <section id="graphcore-ipu">
        <h2 style={S.h2}>Graphcore IPU — A Different Architecture</h2>
        <p style={S.p}>
          <strong>Graphcore IPU (Intelligence Processing Unit)</strong> — ek fundamentally different AI chip architecture from the UK. Instead of optimizing for large dense matrix multiplication (GPU ka strength), IPU large on-chip SRAM use karta hai aur fine-grained parallelism pe focus karta hai.
        </p>
        <p style={S.p}>
          <strong>Architecture difference — simple explanation:</strong> GPU ek freeway hai — high throughput, trucks (large data) move fast, parallel lanes (CUDA cores). IPU ek detailed city road network hai — thousands of small streets (1,472 IPU processors), great for complex routing, packages (data) move independently, less ideal for 18-wheelers (large dense matrices).
        </p>
        <ul style={S.ul}>
          <li><strong>IPU-M2000 specs:</strong> 1,472 independent IPU processor cores, 900 MB on-chip SRAM (much larger than GPU L2 cache), BSP (Bulk Synchronous Parallel) execution model, 251 TFLOPS FP16.</li>
          <li><strong>BSP execution model:</strong> Compute phase → communicate phase → repeat. Deterministic execution — same result every run. Less suitable for streaming workloads, better for iterative algorithms.</li>
          <li><strong>Where IPU is strong:</strong> Sparse computation (Graph Neural Networks, sparse transformer attention), recommendation systems (irregular data patterns), research mein unusual model architectures.</li>
          <li><strong>Where IPU is weak:</strong> Large dense LLM training (GPU better), memory-capacity-limited workloads (900 MB on-chip limited vs HBM GPUs), production deployment at scale (limited ecosystem).</li>
          <li><strong>Software: Poplar SDK:</strong> PyTorch aur TensorFlow support via PopTorch/TF-Poplar. C++ graph programming also possible. Smaller community than CUDA.</li>
          <li><strong>Market reality:</strong> Graphcore raised significant funding, faced challenges in mainstream adoption. Niche but technically interesting. Watch for ecosystem developments.</li>
        </ul>
      </section>

      {/* ── SAMBANOVA ──────────────────────────────────────────────────── */}
      <section id="sambanova">
        <h2 style={S.h2}>SambaNova — Reconfigurable AI</h2>
        <p style={S.p}>
          <strong>SambaNova Systems</strong> — ek full-stack AI company jisme silicon, software, aur pre-configured systems sab include hain. SambaNova ka DataScale SN40L system ek enterprise AI appliance hai — box deliver hota hai, setup minimal, AI run karo.
        </p>
        <ul style={S.ul}>
          <li><strong>Architecture:</strong> RDU (Reconfigurable Dataflow Unit) — FPGA aur ASIC dono ke elements combine karta hai. Reconfigurable dataflow architecture allows efficient execution of different model types.</li>
          <li><strong>SambaNova SN40L chip:</strong> 520 MB on-chip SRAM (very large — similar philosophy to Cerebras), 64 GB HBM2e. Focus on memory bandwidth and low latency inference.</li>
          <li><strong>Full stack differentiator:</strong> SambaNova GPU-like experience dene ki koshish karta hai with SambaFlow SDK (PyTorch compatible). Enterprise customers ko "AI appliance" model better fits than DIY GPU cluster setup.</li>
          <li><strong>Target market:</strong> Financial services (on-prem LLM inference with data privacy), healthcare (HIPAA-compliant AI), government (data sovereignty). Organizations jinhein cloud chips use nahi karne chahiye (compliance reasons) aur GPU expertise nahi hai.</li>
          <li><strong>Pricing:</strong> Enterprise pricing, contact sales. Not publicly available. Significantly higher upfront than cloud — but if data cannot leave premises, comparison changes.</li>
        </ul>
      </section>

      {/* ── EDGE AI CHIPS ──────────────────────────────────────────────── */}
      <section id="edge-ai-chips">
        <h2 style={S.h2}>Edge AI Chips — NPUs in Your Pocket</h2>
        <p style={S.p}>
          <strong>Edge AI</strong> — AI inference directly on the device, without sending data to cloud. <strong>Edge AI chips</strong> mostly NPUs hain jaise humne NPU section mein padha — lekin yahan hum complete ecosystem cover karte hain: phones se lekar industrial cameras tak.
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
          <strong>NVIDIA Jetson</strong> worth special mention — yeh edge GPU hai (not NPU). Jetson Orin NX: ARM CPU + Ampere GPU cores + CUDA support. Yeh bridge hai cloud GPU aur mobile NPU ke beech — real CUDA code directly chalti hai. Robotics, autonomous vehicles, factory automation mein widely used. More expensive aur more power than NPU, lekin GPU flexibility on-the-edge milti hai.
        </p>
        <Callout type="best-practice" title="Hybrid Edge-Cloud Architecture">
          Real production systems often hybrid hain: Edge NPU pe lightweight model run karo (real-time, low latency, privacy) → interesting/complex cases cloud GPU pe send karo (heavy processing, model update). Example: factory camera pe Hailo chip defect detect karta hai real-time. Complex or novel defects cloud LLM pe analyze hote hain. DC engineers need to design for both — edge connectivity, edge device management, cloud AI endpoints.
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
          Ek common mistake hai: same hardware use karo training aur inference ke liye. Reality: dono ke hardware requirements fundamentally different hain, aur wrong choice expensive hoti hai.
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
          Best practice: Train pe H100 ya TPU (high memory, high bandwidth). After training: quantize model to INT8. Deploy quantized model on inference-optimized chips (Inferentia, L4, A10G). Savings: H100 inference cost per query often 3-5× higher than L4 for same throughput. Always benchmark your specific model before infrastructure decisions.
        </Callout>
      </section>

      {/* ── CUSTOM SILICON STRATEGY ────────────────────────────────────── */}
      <section id="custom-silicon-strategy">
        <h2 style={S.h2}>Custom Silicon Strategy</h2>
        <p style={S.p}>
          <strong>Custom silicon</strong> — apna khud ka chip design karna. Ye decision hardware world ka biggest investment hai. Kab sahi hai, kab galat?
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
          Har AI accelerator type data center mein alag tarike se deploy hota hai. DC engineers ke liye yeh concrete operational differences hain.
        </p>
        <ul style={S.ul}>
          <li>
            <strong>GPU Servers (NVIDIA DGX, HGX):</strong> Standard 4U–8U rack servers. 8 GPUs per server typical (DGX H100). PCIe Gen 5 host interface. NVLink internal GPU-to-GPU. InfiniBand external server-to-server. Deployment: standard DC rack, network cabling, IB switch fabric. Monitoring: NVIDIA DCGM (Data Center GPU Manager) — metrics per GPU, health alerts.
          </li>
          <li>
            <strong>TPU Boards (Google Cloud):</strong> Google-proprietary hardware — you don&apos;t physically deploy it. Cloud API se access. Physical reality at Google DC: custom 8U-equivalent boards, 4 chips per board, optical ICI cabling, liquid cooling manifolds. You manage software; Google manages physical infra.
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
          DC engineers ke liye yeh sabse critical section hai. Har chip type different power aur cooling demands rakhta hai — ek hi data center mein different systems host karne ke liye planning zaroori hai.
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
          AI accelerators ke performance ki asली limiting factor often networking aur storage hoti hai — chip jitna fast compute kar sakti hai, utni fast data aana chahiye.
        </p>
        <ul style={S.ul}>
          <li>
            <strong>GPU Cluster Networking:</strong> Within a server: NVLink (NVIDIA proprietary, 900 GB/s per GPU). Between servers: InfiniBand HDR/NDR (200–400 Gb/s) ya RoCE 2.0 (RDMA over Converged Ethernet). InfiniBand: lowest latency, highest bandwidth, proprietary switches (Mellanox/NVIDIA). RoCE 2.0: standard Ethernet infrastructure pe RDMA, cheaper switches, growing adoption. Fat-tree topology: GPU cluster standard — full bisection bandwidth, no oversubscription.
          </li>
          <li>
            <strong>Gaudi 3 Networking:</strong> RoCE 2.0 natively (no proprietary network). Standard 200GbE/400GbE switches (Arista, Cisco, Juniper) use kar sakte ho. No InfiniBand hardware needed. Lower networking CapEx in some scenarios.
          </li>
          <li>
            <strong>TPU / AWS Chips Networking:</strong> Google/AWS internal network — you don't design this. Cloud provider&apos;s responsibility. Your job: GCS/S3 bucket in same region as compute, VPC configuration, data pipeline design.
          </li>
          <li>
            <strong>Storage for AI training:</strong> Training data storage: Parallel file systems (Lustre, GPFS) for on-premises HPC clusters. All-flash NVMe for hot training data. Object storage (S3, GCS) for archive aur cloud training. Data loading pipeline critical: if storage bandwidth less than GPU compute throughput, GPU waits. Rule of thumb: each GPU server should have dedicated storage bandwidth of 10–20 GB/s.
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
          Hardware specifications se zyada important often software ecosystem hota hai. Yeh woh reason hai ki NVIDIA GPU dominant hai despite competitors having comparable specs.
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
          <li><strong>FlashAttention:</strong> Critical LLM attention optimization — CUDA kernels. Flash Attention 2 and 3: GPT-4, LLaMA 2, Mistral — sab CUDA-specific. Non-NVIDIA chips pe sirf approximate equivalents available hain.</li>
          <li><strong>DeepSpeed:</strong> Microsoft ka distributed training library — CUDA optimized. ZeRO optimizer stages, gradient checkpointing, pipeline parallelism — all CUDA-native.</li>
          <li><strong>cuDNN, cuBLAS:</strong> NVIDIA ke optimized math libraries. Decades of hand-tuned kernels. Competitor equivalent libraries exist but often lag in performance.</li>
          <li><strong>Hugging Face ecosystem:</strong> 400,000+ models, all primarily tested on GPU. CUDA de-facto requirement for most HF workflows.</li>
          <li><strong>Stack Overflow, GitHub issues:</strong> Problem solve karna mushkil hota hai non-CUDA platforms pe — community help limited hoti hai.</li>
        </ul>
      </section>

      {/* ── COST AND TCO ───────────────────────────────────────────────── */}
      <section id="cost-tco">
        <h2 style={S.h2}>Cost and TCO Analysis</h2>
        <p style={S.p}>
          <strong>TCO (Total Cost of Ownership)</strong> — sirf chip ki price nahi, complete 3-year cost of running AI infrastructure.
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
          GPU prices, cloud instance pricing, aur chip availability rapidly change karte hain. NVIDIA H100 spot prices 2023 mein $40K+ tak gayi, 2024 mein normalize hui. AWS, Google Cloud ne multiple times pricing revise kiya. Numbers upar illustrative hain — always check current pricing before budgeting. Also: total cost evaluation mein engineer time for migration (non-NVIDIA) aur ecosystem investment always include karo.
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
            q: "NPU, GPU, aur TPU mein kya fundamental difference hai?",
            a: "GPU general-purpose parallel processor hai — originally graphics ke liye, AI ke liye repurposed. Thousands of CUDA cores, CUDA ecosystem, flexible for any AI workload. TPU Google ka matrix multiply specialist ASIC hai — sirf AI training/inference, TF/JAX optimized, Google Cloud only. NPU low-power mobile/edge AI engine hai — milliwatts se watts range, on-device inference ke liye design, MAC Array based. Key distinction: GPU flexibility high lekin less efficient per operation than specialist chips. TPU/ASIC maximum efficiency for target workload lekin zero flexibility. NPU extreme power efficiency lekin limited model size/compute. Right chip selection depends on: (1) Use case (cloud training vs edge inference), (2) Framework (CUDA vs TF/JAX), (3) Power envelope, (4) Data privacy requirements.",
          },
          {
            q: "FPGA aur ASIC mein kya difference hai — kab kaunsa choose karein?",
            a: "FPGA: Reprogrammable chip. Logic software se change kar sakte ho. Whiteboard analogy — write, erase, rewrite. Lower per-unit cost, weeks to deploy, FPGA off-shelf khareed lo. Limitation: 3-5× more power, 5-10× higher cost per unit vs equivalent ASIC. ASIC: Permanently fixed chip for one specific job. Printed book analogy — once printed, can't change, but very efficient to read. $10M+ upfront design cost, 18-24 month lead time. Maximum efficiency for target workload. Choose FPGA when: algorithm may change (research phase), volume low (<50K units), need rapid prototype, time-to-market critical, or compliance requires on-premises flexible compute. Choose ASIC when: algorithm stable for 3+ years, volume very high (millions), maximum efficiency critical (battery/power constrained), and budget for chip design exists. Hyperscalers choose ASIC (TPU, Trainium). Research teams choose FPGA. Most companies: just buy GPU.",
          },
          {
            q: "AWS Trainium pe migration ke liye kya process hai aur kya challenges hain?",
            a: "Process: (1) AWS Neuron SDK install karo, (2) apna PyTorch/TF model Neuron compiler se compile karo (neuron-cc command), (3) compilation success check karo — unsupported ops error mein list milegi, (4) successful compile hone pe benchmark — throughput, latency GPU vs Trainium, (5) cost comparison karo (GPU hours vs Trn1 hours × ratio), (6) agar favorable → migrate. Key challenges: Neuron SDK limited op support — custom CUDA kernels, some advanced PyTorch ops Trainium pe nahi chalte. Dynamic shapes recompilation cause karte hain (XLA jaisi problem). Smaller community — debugging harder, less Stack Overflow help. FlashAttention equivalent Neuron-native hai lekin CUDA version se lag possible. Recommendation: test karo pehle model compilation success, phir benchmark, phir commit karo. Don't assume migration easy — har model alag experience hai.",
          },
          {
            q: "DPU data center mein kyun use hota hai — kab ROI positive hota hai?",
            a: "DPU (Data Processing Unit) network aur storage I/O tasks CPU se offload karta hai. In AI workloads: network I/O (gradient sync in distributed training), storage I/O (training data loading), TLS/security, load balancing — yeh sab CPU tasks GPU ko data starved karte hain. Without DPU: CPU 30-40% busy with I/O, GPU utilization 60-70%, expensive GPU idle baitha hai wait karke. With DPU: I/O offloaded, CPU free for GPU orchestration, GPU utilization 85-95%, training 10-20% faster. ROI positive hai when: Large GPU clusters (16+ GPU nodes doing distributed training), high network I/O workloads (frequent gradient sync, large dataset streaming), multi-tenant environments (isolation important), security-sensitive AI (DPU handles encryption without CPU overhead). ROI negative/overkill: Single GPU workstations, research experiments, small teams. DPU examples: NVIDIA BlueField-3, Marvell OCTEON, Intel IPU.",
          },
          {
            q: "Training aur inference ke liye alag hardware kyun chahiye?",
            a: "Training aur inference ke hardware requirements fundamentally different hain. Training needs: (1) Very high memory capacity — model weights + gradients + optimizer states = 3-4× model size. 70B model: ~560 GB for full training. (2) High memory bandwidth — frequent weight updates during backprop. (3) Large batch sizes — more samples per gradient step = more stable convergence. (4) Scale-out interconnect — model too large for one chip, gradient sync across chips. (5) BF16/FP16 precision. Inference needs: (1) Low latency — user waiting for response, milliseconds matter. (2) High throughput — thousands of concurrent users. (3) INT8/INT4 quantization support — smaller precision = 2-4× faster compute. (4) Lower memory — weights only, no gradients. (5) Cost-per-query optimization. Best practice: train on H100/TPU (high memory, high bandwidth), quantize model to INT8, deploy on inference-optimized chip (Inferentia, L4, A10G). H100 inference often 3-5× more expensive per query than dedicated inference chip for same throughput.",
          },
          {
            q: "Cerebras WSE ka unique architecture kya hai aur kab use karte hain?",
            a: "Cerebras WSE unique hai kyunki woh puri semiconductor wafer ko ek chip banata hai — normal chips wafer se cut karte hain. WSE-3: 900,000 AI cores, 44 GB on-chip SRAM (GPU ka L2 cache 80 MB — WSE 550× more on-chip memory), 125 PFLOPS BF16. Key advantage: koi inter-chip communication nahi — sab cores ek hi die pe. Model weights on-chip SRAM mein fit hoti hain → HBM bandwidth bottleneck remove hoti hai. GPU pe LLM inference: attention layers mein weights repeatedly HBM se load karne padte hain (slow). WSE pe: weights on-chip, no HBM round-trips for those weights → significant latency improvement. When to use: Large model single-chip inference (latency critical), scientific computing with irregular patterns, LLM inference where memory bandwidth is bottleneck. Limitations: Cannot scale beyond one chip (unlike GPU multi-chip pods), very large models still need MemoryX expansion, specialized deployment, niche ecosystem. Practical access: mostly Cerebras Cloud or direct partnerships.",
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
          <li>AI accelerator ek spectrum hai — CPU (flexible, inefficient for AI) se ASIC (inflexible, maximally efficient for one AI task) tak. GPU sweet spot hai kyunki woh flexibility aur performance balance karta hai. CUDA ecosystem ne GPU ko dominant banaya — hardware specs se zyada, software lock-in matter karta hai.</li>
          <li>NPU (Neural Processing Unit) aapke phone mein already hai — Face ID, voice assistant, camera AI yahi karta hai. 1-5 Watts mein. Cloud GPU 300-700W use karta hai. Edge AI revolution NPU pe build ho rahi hai — DC engineers ko hybrid edge-cloud architectures design karne aane chahiye.</li>
          <li>DPU (Data Processing Unit) GPU performance improve karta hai without touching the GPU. Network + storage I/O CPU se offload karke GPU utilization 60-70% se 85-95% tak improve hoti hai. 10-20% training speedup sirf I/O offload se. Large GPU clusters (16+ nodes) mein DPU investment evaluate karo.</li>
          <li>FPGA vs ASIC: FPGA whiteboard (flexible, change anytime, higher cost per unit). ASIC printed book (fixed, maximum efficiency, lower cost at scale, $10M+ upfront). Most companies GPU use karo — ASIC sirf hyperscalers ke liye justify hota hai.</li>
          <li>AWS Trainium/Inferentia: Same Neuron SDK, alag jobs. Trainium = model banana (training). Inferentia = model bechna (inference). 40-60% cheaper inference vs H100 at AWS — lekin sirf agar Neuron SDK aapka model support karta ho. Test pehle, migrate baad mein.</li>
          <li>Intel Gaudi 3: H100 ke comparable specs, open RoCE 2.0 networking (standard switches chalte hain, proprietary InfiniBand nahi chahiye), on-premises available (unlike TPU). Software ecosystem smaller than CUDA — evaluate based on your framework requirements aur willingness to invest in SynapseAI SDK.</li>
          <li>Cerebras WSE: Radical architecture — poori wafer ek chip. 900K cores, 44 GB on-chip SRAM. No inter-chip communication bottleneck. Ideal for large model inference latency. Cannot scale multi-chip. Specialized deployment. Not for everyone — but technically compelling for right workloads.</li>
          <li>Training vs inference hardware: Always separate budget and strategy. Train on high-memory, high-bandwidth GPU/TPU. Quantize model to INT8. Deploy on inference-optimized chip. H100 inference often 3-5× more expensive per query than L4 or Inferentia for same throughput.</li>
          <li>Data center planning: Power density varies dramatically — CPU server 3-5 kW/rack, GPU server 10-25 kW/rack, TPU Pod 40-100 kW/rack, Cerebras 23 kW single unit. Liquid cooling threshold: 15-20 kW/rack. Plan DLC infrastructure from day 1 if hosting any GPU/ASIC AI chips — retrofitting is 3× more expensive. Storage bandwidth must match compute throughput.</li>
          <li>CUDA ecosystem moat is real: Even when alternative hardware specs match GPU, CUDA ecosystem (FlashAttention, DeepSpeed, cuDNN, HuggingFace optimization) mein decade+ of optimization hai. Switching cost = engineer time + potential performance regression + limited community support. Evaluate holistically — not just hardware specs, but total cost including migration and operations.</li>
        </ul>
      </section>

    </article>
  );
}
