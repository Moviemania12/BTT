"use client";
import { S, Callout, ComparisonTable, Figure, CodeBlock, DiagramGuide } from "@/app/learn/it/servers/gpu/shared";
import TopicLink from "@/components/TopicLink";
import CpuVsGpu from "@/app/learn/it/servers/gpu/svg/CpuVsGpu";
import GpuChipAnatomy from "@/app/learn/it/servers/gpu/svg/GpuChipAnatomy";
import GpuMemoryMath from "@/app/learn/it/servers/gpu/svg/GpuMemoryMath";
import GpuDataFlow from "@/app/learn/it/servers/gpu/svg/GpuDataFlow";
import GpuNodeTopology from "@/app/learn/it/servers/gpu/svg/GpuNodeTopology";
import GpuRailNetwork from "@/app/learn/it/servers/gpu/svg/GpuRailNetwork";
import LiquidCoolingLoop from "@/app/learn/it/servers/gpu/svg/LiquidCoolingLoop";
import GpuSoftwareStack from "@/app/learn/it/servers/gpu/svg/GpuSoftwareStack";
import GpuTroubleshootFlow from "@/app/learn/it/servers/gpu/svg/GpuTroubleshootFlow";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      {/* Quick Summary */}
      <div style={{ background: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#6b21a8", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — 2 Minute mein GPU</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>Kya hai:</strong> GPU ek parallel processor hai jisme hazaaron simple cores aur bahut tez memory hoti hai. AI training, inference aur HPC ka engine yahi hai.</li>
          <li><strong>CPU vs GPU:</strong> CPU = kam lekin smart cores, complex aur branchy kaam ke liye. GPU = bahut saare simple cores, same math bahut saare data par (matrix multiply).</li>
          <li><strong>Memory tay karti hai kya fit hoga:</strong> Weights, gradients, optimizer state aur activations GPU memory (HBM) mein rehte hain. Mixed precision + Adam mein training ke liye lagbhag 16 bytes per parameter lagta hai.</li>
          <li><strong>Form factor:</strong> General server ke liye PCIe card. 8-GPU AI node ke liye SXM / OAM module baseboard (HGX) par, NVLink ke saath.</li>
          <li><strong>Data paths:</strong> Node ke andar NVLink/NVSwitch, CPU aur NIC tak PCIe, nodes ke beech InfiniBand ya RoCE. Sabse slow path speed tay karta hai.</li>
          <li><strong>Power:</strong> Ek GPU 300 W se 1 kW+ le sakta hai. 8-GPU server lagbhag 10 kW class ka hota hai, to rack 40 kW se 100+ kW tak jaate hain.</li>
          <li><strong>Cooling:</strong> High-density GPU racks air se rear-door heat exchanger aur direct liquid cooling (cold plate, CDU) par shift hote hain.</li>
          <li><strong>Software:</strong> Firmware, driver, fabric manager, CUDA/NCCL, container, framework, scheduler. Version mismatch se ajeeb failures aate hain.</li>
          <li><strong>Operations:</strong> DCGM se monitor karo, XID aur ECC errors, throttle reasons aur NVLink counters dekho. Debug se pehle node isolate karo.</li>
          <li><strong>Golden rule:</strong> GPU utna hi tez hai jitna uska feed — memory, interconnect, network, power aur cooling sab saath chalne chahiye.</li>
        </ul>
      </div>

      {/* ══════════ 1. WHAT IS A GPU ══════════ */}
      <h2 id="what-is-gpu" style={S.h2}>What Is a GPU? — Its Place in the Data Center</h2>
      <p style={S.p}>GPU ka matlab Graphics Processing Unit. Ye games mein pixel draw karne ke liye bana tha, aur lakhon pixel calculate karna ek bahut parallel kaam hai — har pixel alag se calculate ho sakta hai.</p>
      <p style={S.p}>Scientists ne dekha ki wahi parallel hardware un sab math ke liye perfect hai jo bade arrays par repeat hota hai. Neural network bilkul wahi hai: arbon multiply-and-add operations. Is tarah GPU AI aur HPC ki backbone ban gaya (GPGPU — general purpose computing on GPU).</p>
      <p style={S.p}>Aaj data center mein GPU mostly <strong>AI training, AI inference, scientific simulation aur data analytics</strong> ke liye use hota hai. Graphics ab chhota hissa hai.</p>
      <p style={S.p}>GPU akela computer nahi hai. Ye server ke andar <TopicLink slug="cpu" variant="inline" />, <TopicLink slug="ram" variant="inline" />, storage aur network cards ke saath baitha hota hai. CPU OS chalata hai aur kaam launch karta hai; GPU bhaari math karta hai. Server context: <TopicLink slug="server-basics" variant="inline" />.</p>
      <p style={S.p}>Data center engineer ko kyun fark padta hai? Kyunki ek GPU server purane poore rack se zyada power le sakta hai, special cooling maangta hai, aur fast network par depend karta hai. GPU ne sirf IT ko nahi, power aur cooling design ko bhi badal diya.</p>

      {/* ══════════ 2. CPU VS GPU ══════════ */}
      <h2 id="cpu-vs-gpu" style={S.h2}>CPU vs GPU — Design Philosophy</h2>
      <Figure caption="Fig 1 — CPU vs GPU: kam powerful cores, bade cache aur branch logic ke saath (CPU) vs hazaaron simple cores jo fast memory share karte hain (GPU). Core counts illustrative hain."><CpuVsGpu /></Figure>
      <DiagramGuide
        title="Fig 1 ko kaise padhein"
        steps={[
          "Left side CPU hai. Kuch bade cores, har ek mein branch predictor, out-of-order engine aur apna L1/L2 cache, saath mein bada shared L3. Silicon ka zyada hissa ek thread ko tez chalane mein lagta hai.",
          "Right side GPU hai. Chhote cores ka bada grid, har core par bahut kam control logic. Silicon ka zyada hissa arithmetic units mein lagta hai.",
          "Memory: CPU system RAM tak apne memory controller se jaata hai. GPU ki apni memory (VRAM/HBM) hoti hai, bahut zyada bandwidth ke saath, chip ke bilkul paas.",
          "Takeaway: CPU ek task ka time kam karta hai (latency). GPU per second kitne tasks poore hote hain wo badhata hai (throughput).",
        ]}
      />
      <p style={S.p}><strong>CPU design:</strong> Har core powerful hai — branch prediction, out-of-order execution, bade caches. OS, database aur if-else se bhare code ke liye best.</p>
      <p style={S.p}><strong>GPU design:</strong> Hazaaron simple cores same instruction alag-alag data par chalate hain. Ise SIMT kehte hain — Single Instruction, Multiple Threads.</p>
      <p style={S.p}>CPU ko kuch expert chefs samjho jo koi bhi complex dish bana sakte hain. GPU junior cooks ka bada kitchen hai jo sab ek saath pyaaz kaat rahe hain. Ek complex dish ke liye expert jeetega. Das hazaar pyaaz ke liye bheed jeetegi.</p>
      <ComparisonTable
        title="CPU vs GPU — Quick Comparison"
        headers={["Property", "CPU", "GPU"]}
        rows={[
          ["Core count (order)", "Das se ~100+", "Hazaaron (CUDA cores) aur saikdon tensor cores"],
          ["Kis ke liye optimised", "Low latency, complex control flow", "High throughput, regular math"],
          ["Memory", "System DDR5, saikdon GB se TB", "Package par HBM/GDDR, dahaiyon se saikdon GB, bahut zyada bandwidth"],
          ["Best workloads", "OS, database, web, orchestration", "Matrix math, AI, simulation, rendering"],
          ["Doosre ki zaroorat?", "Akela chal sakta hai", "Boot aur feed ke liye CPU host chahiye"],
        ]}
        caption="Generalisation hai. Exact numbers product generation par depend karte hain — vendor datasheet verify karo."
      />
      <Callout type="common-mistake" title="'GPU lagaunga to application tez ho jayegi'">
        Apne-aap nahi. Code aisa likhna padta hai (ya library aisi use karni padti hai) jo kaam ko hazaaron parallel tukdon mein baante. Branchy, sequential application GPU par CPU se bhi slow chal sakti hai.
      </Callout>

      {/* ══════════ 3. GPU ARCHITECTURE ══════════ */}
      <h2 id="gpu-architecture" style={S.h2}>GPU Architecture — SM, Tensor Cores and Warps</h2>
      <Figure caption="Fig 2 — Data center GPU ke andar: GPCs jo Streaming Multiprocessors se bane hain, shared L2 cache, package par HBM stacks, NVLink aur PCIe interfaces, aur ek SM ka zoom. Layout schematic hai, counts model ke hisaab se badalte hain."><GpuChipAnatomy /></Figure>
      <DiagramGuide
        title="Fig 2 ko kaise padhein"
        steps={[
          "Bahar ka box GPU package hai. Beech ka bada die compute rakhta hai; side ke blocks HBM memory stacks hain jo usi package par die ke bahut paas baithe hain.",
          "Die ke andar GPCs hain, har ek mein kai SMs (Streaming Multiprocessors). SM wo basic building block hai jo yaad rakhna hai.",
          "GigaThread scheduler kaam ke blocks SMs ko deta hai. Shared L2 cache saare SMs aur HBM ke beech baitha hai, taaki baar-baar use hone wala data memory tak wapas na jaaye.",
          "Right ka zoom-in SM asli ingredients dikhata hai: warp schedulers, general math ke liye CUDA cores, matrix math ke liye tensor cores, register file aur shared memory / L1.",
          "Kinare par external interfaces hain: NVLink (doosre GPUs tak) aur PCIe (CPU aur NICs tak). GPU-to-GPU ya GPU-to-host har transfer inhi mein se ek se nikalta hai.",
        ]}
      />
      <p style={S.p}><strong>Streaming Multiprocessor (SM) — NVIDIA / Compute Unit (CU) — AMD:</strong> Basic compute block. Bade GPU mein sau se zyada SMs hote hain, aur total core count = SMs × cores per SM. Exact counts model par depend karte hain.</p>
      <p style={S.p}><strong>CUDA cores / stream processors:</strong> General floating point aur integer math units. Graphics, simulation aur normal code ke liye acche.</p>
      <p style={S.p}><strong>Tensor Cores (NVIDIA) / Matrix Cores (AMD):</strong> Special units jo chhote matrices ko multiply karke ek hi step mein add bhi kar dete hain. Modern GPU AI mein itne tez isi wajah se hain. Generation ke hisaab se FP16, BF16, FP8, INT8 jaise formats support hote hain.</p>
      <p style={S.p}><strong>Warps:</strong> GPU threads 32 ke group mein chalte hain (NVIDIA par warp; AMD par wavefront 32 ya 64). Warp ke saare threads same instruction ek saath chalate hain. Agar threads alag branch lein (divergence), kuch ruk jaate hain — efficiency girti hai.</p>
      <p style={S.p}><strong>Latency hiding:</strong> GPU ek thread ko tez banane ki koshish nahi karta. Jab ek warp memory ka wait karta hai, scheduler turant dusre ready warp par switch kar deta hai. Isliye GPU ko busy rakhne ke liye hazaaron threads in flight chahiye.</p>
      <p style={S.p}><strong>Memory hierarchy:</strong> registers (sabse fast, thread ke private) → shared memory / L1 (per SM) → L2 (saare SMs ka) → HBM (bada, off-die lekin on-package) → host RAM over PCIe (sabse slow). Acha GPU code data ko is seedhi mein jitna ho sake upar rakhta hai. CPU ki seedhi dekho <TopicLink slug="cpu" variant="inline" /> mein.</p>

      {/* ══════════ 4. GPU MEMORY ══════════ */}
      <h2 id="gpu-memory" style={S.h2}>GPU Memory — HBM, VRAM and Memory Math</h2>
      <p style={S.p}>VRAM GPU ki apni memory hai. Ye CPU RAM se alag hai. GPU ise seedha padhta-likhta hai, CPU se poochhe bina, aur normal server DDR se kaafi zyada bandwidth par.</p>
      <p style={S.p}><strong>HBM (High Bandwidth Memory):</strong> DRAM dies vertically stack hote hain aur GPU ke same package par lagte hain, hazaaron chhote wires se jude. Result: bahut zyada bandwidth, kam energy per bit — lekin mehenga aur capacity limited. Data center GPUs mein use hota hai.</p>
      <p style={S.p}><strong>GDDR6/6X/7:</strong> GPU ke aas-paas alag chips par lagi conventional graphics memory. Sasti, kam bandwidth. Workstation aur kuch inference GPUs mein milti hai.</p>
      <p style={S.p}>Order of magnitude: DDR5 per channel dahaiyon GB/s deta hai, poora CPU socket kuch sau GB/s tak. HBM wale GPUs kai TB/s tak jaate hain. Exact figures har generation badalte hain — datasheet verify karo.</p>
      <Figure caption="Fig 3 — GPU memory math. Left: 7-billion parameter model ko mixed precision aur Adam se train karne ke liye memory (lagbhag 16 bytes per parameter = ~112 GB) vs 80 GB GPU. Right: 70B model ko inference ke liye FP16, INT8 aur INT4 par hold karne ki memory. Figures activations aur KV-cache ke bina hain aur approximate hain."><GpuMemoryMath /></Figure>
      <DiagramGuide
        title="Fig 3 ko kaise padhein"
        steps={[
          "Left chart, training: har bar ek tarah ka data hai jo har parameter ke liye memory mein rakha jaata hai — FP16 weights (2 bytes), FP16 gradients (2 bytes), phir FP32 master weights, Adam momentum aur Adam variance (4-4 bytes).",
          "Jodo: 2 + 2 + 4 + 4 + 4 = 16 bytes per parameter. To 7B model ko activations se pehle lagbhag 7 × 16 = 112 GB chahiye. Red line 80 GB GPU dikhati hai — bars usse upar jaate hain, yaani ek GPU kaafi nahi.",
          "Right chart, inference: gradients aur optimizer nahi, sirf weights. 70B model FP16 par 140 GB, INT8 par 70 GB, INT4 par 35 GB — model wahi, lekin kam precision se kharidna kam padta hai.",
          "Seekh: pehle memory calculate karo, phir GPU count aur parallelism chuno. Real jobs ko activations (training) aur KV-cache (inference) ke liye bhi jagah chahiye, to headroom rakho.",
        ]}
      />
      <CodeBlock lang="text" label="Rule-of-thumb memory math (approximate)">
{`Training, mixed precision + Adam  ≈ 16 bytes / parameter
   7B  model → 7e9  × 16 B ≈ 112 GB  (+ activations)
  70B  model → 70e9 × 16 B ≈ 1.1 TB  (kai GPUs mein baanta hua)

Inference, sirf weights
   FP16 = 2 B/param   INT8 = 1 B/param   INT4 = 0.5 B/param
  70B @ FP16 ≈ 140 GB  → 2 × 80 GB GPU chahiye (+ KV-cache ki jagah)`}
      </CodeBlock>
      <Callout type="warning" title="OOM = job failure">
        CUDA out-of-memory error training step ko maar deta hai. Fix: chhota batch, mixed precision, activation checkpointing, model sharding (FSDP / ZeRO), tensor/pipeline parallelism, ya zyada GPUs. Capacity ek hard wall hai, soft limit nahi.
      </Callout>
      <p style={S.p}><strong>GPU memory par ECC:</strong> Data center GPUs HBM ko ECC se protect karte hain, bilkul server RAM ki tarah (dekho <TopicLink slug="ram" variant="inline" />). Correctable errors chupchap theek ho jaate hain; uncorrectable XID errors dete hain aur GPU reset ya replacement maang sakte hain. Row remapping GPU ko kharab memory rows retire karne deta hai, card badle bina — jab tak spare rows khatam na ho jaayen.</p>

      {/* ══════════ 5. PRECISION ══════════ */}
      <h2 id="precision-formats" style={S.h2}>Precision Formats — FP32, BF16, FP8, INT8</h2>
      <p style={S.p}>GPU ke andar numbers alag-alag bits mein store ho sakte hain. Kam bits matlab kam memory, kam bandwidth, kam power — aur per second zyada operations. Keemat: kam range ya accuracy.</p>
      <ComparisonTable
        title="Common GPU Number Formats"
        headers={["Format", "Bits", "Typical use", "Note"]}
        rows={[
          ["FP64", "64", "Scientific HPC, simulation", "AI-focused GPUs par slow; weather, CFD, physics ke liye zaroori"],
          ["FP32", "32", "General compute, master weights", "Baseline precision"],
          ["TF32", "19 (32 mein stored)", "Kam code change ke saath training", "NVIDIA tensor core mode"],
          ["FP16 / BF16", "16", "Mixed-precision training, inference", "BF16 FP32 ki range rakhta hai, isliye zyada stable"],
          ["FP8", "8", "Latest training aur inference", "Naye GPU generations aur scaling support chahiye"],
          ["INT8 / INT4", "8 / 4", "Quantised inference", "Sabse chhota aur fast; accuracy ke liye calibration lag sakti hai"],
        ]}
        caption="Kaun sa format accelerate hota hai wo GPU generation par depend karta hai. Vendor data sheet se verify karo."
      />
      <p style={S.p}><strong>Mixed precision</strong> matlab fast math 16 ya 8 bits mein, lekin important values (master weights, accumulators) 32 bits mein. Isse speed zyada milti hai aur accuracy loss kam — aaj training ka standard tareeka yahi hai.</p>
      <p style={S.p}>Data center mein kyun matter karta hai: ek hi GPU har format ke liye alag "TFLOPS" advertise kar sakta hai. GPUs compare karte waqt hamesha same format compare karo. Marketing numbers aksar sparsity ya sabse kam precision maan kar aate hain.</p>

      {/* ══════════ 6. FORM FACTORS ══════════ */}
      <h2 id="form-factors" style={S.h2}>Form Factors — PCIe, SXM, OAM, HGX, DGX</h2>
      <ComparisonTable
        title="GPU Form Factors"
        headers={["Form factor", "Kaise connect hota hai", "Power (order)", "Kahan use hota hai"]}
        rows={[
          ["PCIe card", "PCIe x16 slot mein edge connector, aux power cable", "~75 W se 300–400 W", "General 2U/4U servers, inference, workstations"],
          ["SXM (NVIDIA)", "Baseboard par mounted module, NVLink on board", "~700 W se 1 kW+", "HGX / DGX 8-GPU AI nodes"],
          ["OAM (OCP)", "UBB baseboard par Open Accelerator Module", "~500 W se 750 W+", "AMD Instinct, Intel Gaudi, hyperscale designs"],
        ]}
        caption="Power figures generation ke hisaab se approximate hain. Power planning se pehle datasheet mein exact TDP verify karo."
      />
      <p style={S.p}><strong>PCIe card:</strong> Standard servers mein add, replace aur mix karna aasan. Power kam, aur GPU-to-GPU communication aam taur par PCIe se hota hai (ya ek pair ke beech optional NVLink bridge se).</p>
      <p style={S.p}><strong>SXM / OAM module:</strong> GPU ek mezzanine module hota hai jo baseboard par bolt hota hai. Zyada power delivery, full NVLink mesh, aur behtar cooling contact. Server usi ke liye design hona chahiye — SXM GPU ko kisi bhi server mein plug nahi kar sakte.</p>
      <p style={S.p}><strong>HGX:</strong> NVIDIA ka reference baseboard jisme 8 (ya 4) SXM GPUs aur NVSwitch chips hote hain. Dell, HPE, Supermicro, Lenovo jaise OEMs iske around servers banate hain. <strong>DGX:</strong> NVIDIA ka apna complete system, usi idea par, validated software stack ke saath.</p>
      <Callout type="important" title="Generations ko laparwahi se mix mat karo">
        Ek NVLink domain ya ek training job mein alag GPU models ya generations hone par sabse slow GPU pace tay karta hai — aur aksar driver aur firmware conflict bhi hote hain. Cluster ke hisaab se standardise karo.
      </Callout>

      {/* ══════════ 7. PCIE ══════════ */}
      <h2 id="pcie-interfaces" style={S.h2}>PCIe and the CPU–GPU Data Path</h2>
      <Figure caption="Fig 4 — Storage se GPU tak data path: storage → CPU aur system RAM → PCIe → GPU aur VRAM → result. PCIe hop aam bottleneck hai; GPUDirect techniques path chhota karti hain."><GpuDataFlow /></Figure>
      <DiagramGuide
        title="Fig 4 ko kaise padhein"
        steps={[
          "Left se shuru karo storage (NVMe, network storage). Training data pehle yahin se padha jaata hai.",
          "Data system RAM mein aata hai, jise CPU manage karta hai. GPU use kare us se pehle CPU use prepare karta hai — decode, shuffle, batch.",
          "PCIe link host aur GPU ke beech ka patla pul hai. Iski bandwidth GPU ki apni memory bandwidth se bahut kam hai, to data agar ise baar-baar cross kare to GPU khaali baitha rehta hai.",
          "Right mein GPU VRAM use karke compute karta hai. Results usi path se wapas aate hain. Neeche ke notes usual bottleneck jagahon ko dikhate hain.",
          "Yaad rakho: slow data pipeline bahut mehenge GPU ko low utilisation dikhata hai. Zyada GPU kharidne se pehle feed theek karo.",
        ]}
      />
      <p style={S.p}><strong>PCIe generation aur width:</strong> GPU aam taur par x16 link use karta hai. Approximate per-lane bandwidth per direction: Gen4 ≈ 1.97 GB/s, Gen5 ≈ 3.94 GB/s. To Gen5 x16 ≈ 63 GB/s har taraf — kaam ka hai, lekin HBM ya NVLink se bahut chhota.</p>
      <p style={S.p}>GPU chupchap kam generation ya kam lanes (jaise x16 ki jagah x8) par train ho sakta hai — kharab riser, dhool, dheela card ya BIOS setting ki wajah se. Installation ke baad link state hamesha check karo.</p>
      <CodeBlock lang="bash" label="GPU ki PCIe link speed aur width check karo">
{`nvidia-smi --query-gpu=index,pcie.link.gen.current,pcie.link.gen.max,pcie.link.width.current,pcie.link.width.max --format=csv
# idle par current < max power saving ho sakta hai; load mein dobara check karo.
# load mein width.current, width.max se kam = asli problem (seating, riser, BIOS).`}
      </CodeBlock>
      <p style={S.p}><strong>GPUDirect:</strong> GPUDirect RDMA network card ko GPU memory seedha padhne-likhne deta hai, CPU ki RAM copy chhod kar. GPUDirect Storage NVMe ke liye wahi karta hai. Latency aur CPU load kam hota hai — lekin tabhi jab PCIe topology mein NIC aur GPU same switch ya root complex ke neeche hon.</p>
      <p style={S.p}><strong>NUMA matter karta hai:</strong> GPU ek CPU socket se attached hota hai. Doosre socket par pinned process ko CPU-to-CPU link cross karna padta hai aur bandwidth kam milti hai. Process ko apne GPU ke paas pin karo (NUMA ke liye <TopicLink slug="cpu" variant="inline" /> dekho).</p>

      {/* ══════════ 8. NVLINK ══════════ */}
      <h2 id="nvlink-nvswitch" style={S.h2}>NVLink, NVSwitch and Node Topology</h2>
      <p style={S.p}>Jab 8 GPUs ek model ko saath train karte hain to har step mein bahut data exchange karna padta hai. PCIe iske liye bahut slow hai. NVLink ek dedicated GPU-to-GPU link hai jiski bandwidth PCIe se kai guna zyada hai.</p>
      <p style={S.p}><strong>NVSwitch</strong> ek switch chip hai jo saare NVLinks ko jodta hai, taaki har GPU har doosre GPU se full speed par ek saath baat kar sake (all-to-all). NVSwitch ke bina GPUs sirf pairs ya rings mein jude hote hain.</p>
      <Figure caption="Fig 5 — 8-GPU server ki topology: do CPUs, chaar PCIe switches (har ek ke neeche do GPUs aur do NICs), aur NVSwitch fabric jo saare GPUs ko jodta hai. Teen alag paths hain: NVLink, PCIe aur CPU links."><GpuNodeTopology /></Figure>
      <DiagramGuide
        title="Fig 5 ko kaise padhein"
        steps={[
          "Upar: do CPUs, har ek apna NUMA node, CPU-to-CPU link se jude. Unke neeche chaar PCIe switches, har CPU ke neeche do.",
          "Har PCIe switch ke neeche do GPUs aur do NICs baithe hain. Ek switch share karne wale GPU aur NIC sabse chhote path se GPUDirect RDMA kar sakte hain.",
          "Neeche ki red bar NVSwitch fabric hai. Har GPU ki NVLink lines usme jaati hain, to GPU-to-GPU traffic PCIe ya CPUs ko chhuta bhi nahi.",
          "Teen paths follow karo. GPU↔GPU NVLink se = sabse fast. Same PCIe switch ke neeche GPU↔NIC = acha. CPUs ke paar PCIe se GPU↔GPU = slow, isse bachna hai.",
          "Operations mein software se ye map dekhne ke liye nvidia-smi topo -m chalao. NV8 (NVLink), PIX/PXB (PCIe switch) aur SYS (CPUs ke paar) jaise codes batate hain do devices kitne door hain.",
        ]}
      />
      <CodeBlock lang="bash" label="Linux se topology padho">
{`nvidia-smi topo -m
# NV#  = # NVLinks se connected    (best)
# PIX  = same PCIe switch          (acha)
# PXB  = kai PCIe switches         (theek)
# NODE = same NUMA node, host bridge se
# SYS  = CPU interconnect cross    (sabse kharab)

nvidia-smi nvlink --status          # per-link state aur speed`}
      </CodeBlock>
      <p style={S.p}><strong>Fabric Manager:</strong> NVSwitch systems par fabric manager naam ki service boot par switches configure karti hai. Agar ye fail ho ya version driver se match na kare, to GPUs dikhenge hi nahi ya NVLink domain nahi banega.</p>
      <p style={S.p}>Bade designs NVLink ko ek server ke bahar tak badhate hain (rack-scale NVLink domains), taaki darjano GPUs ek bade accelerator jaise behave karein. Exact scale aur bandwidth product generation par depend karti hai — vendor documentation verify karo.</p>
      <Callout type="best-practice" title="Job place karne se pehle topology jaano">
        4 GPU maangne wali job ko aise 4 GPUs milne chahiye jo NVLink aur NUMA locality share karte hon, koi bhi random 4 nahi. Schedulers (Slurm, topology-aware plugins wala Kubernetes) ko map pata hona chahiye.
      </Callout>

      {/* ══════════ 9. TRAINING VS INFERENCE ══════════ */}
      <h2 id="training-inference" style={S.h2}>Training vs Inference</h2>
      <ComparisonTable
        title="AI Training vs Inference on GPUs"
        headers={["Aspect", "Training", "Inference"]}
        rows={[
          ["Goal", "Weights seekhna", "Trained model se jawab dena"],
          ["Memory", "Weights + gradients + optimizer + activations (≈16 B/param)", "Weights + KV-cache (FP16 par ≈2 B/param ya kam)"],
          ["Compute pattern", "Forward + backward, bade batches, din ya hafte chalta hai", "Sirf forward, chhote batches, lagataar chalta hai"],
          ["Priority", "Throughput, kai GPUs par scaling", "Latency, cost per token, utilisation"],
          ["Network need", "Bahut zyada — har step all-reduce", "Moderate — zyadatar ek node ke andar"],
          ["Failure impact", "Checkpoint na ho to progress gayab", "Requests drop ya slow"],
        ]}
        caption="Typical differences. Real workloads model aur serving design par depend karte hain."
      />
      <p style={S.p}><strong>Training</strong> ek loop repeat karti hai: forward pass, loss, backward pass (gradients), optimizer update. Har step mein saare GPUs ko gradients par agree karna padta hai, to interconnect critical path par hai.</p>
      <p style={S.p}><strong>Inference</strong> mein large language model ke do phases hote hain: prefill (poora prompt parallel mein padhna — compute-heavy) aur decode (token by token generate karna — memory-bandwidth-heavy). Isliye inference mein HBM bandwidth itni important hai.</p>
      <p style={S.p}><strong>KV-cache:</strong> Decode ke dauran model pichhle tokens ke keys aur values store rakhta hai taaki dobara compute na karna pade. Ye cache context length aur users ke saath badhta hai aur kabhi model jitni memory bhi le sakta hai.</p>
      <p style={S.p}><strong>Checkpointing:</strong> Training jobs apni state regularly save karti hain. Job ke beech GPU fail ho to run last checkpoint se restart hota hai. Checkpoint interval lost work aur storage load ke beech ka trade-off hai — dekho <TopicLink slug="ai-storage" variant="inline" />.</p>
      <p style={S.p}>Bade AI picture ke liye padho <TopicLink slug="ai-infrastructure-basics" variant="inline" /> aur <TopicLink slug="ai-gpu" variant="inline" />.</p>

      {/* ══════════ 10. PARALLELISM ══════════ */}
      <h2 id="parallelism" style={S.h2}>Multi-GPU Parallelism and Collectives</h2>
      <p style={S.p}>Ek model aksar ek GPU par fit nahi hota ya kaafi tez train nahi hota. To kaam baanta jaata hai. Teen basic tareeke hain, aur real systems inhe mila kar use karte hain.</p>
      <ComparisonTable
        title="Parallelism Strategies"
        headers={["Strategy", "Kya baanta jaata hai", "Traffic pattern", "Network need"]}
        rows={[
          ["Data parallel", "Data batch (har GPU ke paas poora model copy)", "Har step gradients ka all-reduce", "High; nodes ke paar scale hota hai"],
          ["Tensor parallel", "Har layer ke matrices GPUs mein", "Har layer ke andar frequent all-reduce", "Bahut high; NVLink domain ke andar rakho"],
          ["Pipeline parallel", "Layers stages mein GPUs par", "Activations stage se stage jaate hain", "Moderate; slow links bardasht kar leta hai"],
          ["Sharded (FSDP/ZeRO)", "Weights, gradients, optimizer GPUs mein", "All-gather aur reduce-scatter", "High"],
        ]}
        caption="Bade jobs kai strategies mila kar chalate hain (jaise node ke andar tensor parallel, nodes ke paar pipeline aur data parallel)."
      />
      <p style={S.p}><strong>Collectives:</strong> GPUs group operations se baat karte hain — all-reduce (sabki values jodo aur result sabko do), all-gather, reduce-scatter aur all-to-all. NCCL wo library hai jo inhe NVLink, PCIe aur network par efficiently implement karti hai.</p>
      <p style={S.p}><strong>Data center engineer ko kyun fark padta hai:</strong> 1,000-GPU job ka step time uske sabse slow link ya sabse slow GPU se limit hota hai. Ek GPU garam hokar throttle kare, ya ek kharab optic, poore job ko slow kar deta hai — ise straggler kehte hain.</p>
      <Callout type="important" title="Ek bimaar GPU hazaaron ko slow kar sakta hai">
        Synchronous training har step mein sabse slow participant ka wait karti hai. Stragglers ko jaldi detect karke hatana core operations skill hai.
      </Callout>

      {/* ══════════ 11. CLUSTER NETWORKING ══════════ */}
      <h2 id="cluster-networking" style={S.h2}>Cluster Networking — Rails, InfiniBand, RoCE</h2>
      <p style={S.p}>Node ke andar GPUs NVLink use karte hain. Nodes ke beech ek alag high-speed network chalta hai — <strong>compute fabric</strong>, jo aam taur par InfiniBand ya RoCE (RDMA over Converged Ethernet) hota hai. Ye normal management aur storage network se alag hai. Dekho <TopicLink slug="ai-networking" variant="inline" /> aur <TopicLink slug="switch" variant="inline" />.</p>
      <Figure caption="Fig 6 — Rail-optimised GPU fabric: har GPU ka NIC apne rail ke dedicated leaf switch se jaata hai, aur leaf switches spine switches se jude hote hain. Servers ke paar same-rail traffic ko sirf ek switch hop lagta hai. Link speeds aur tiers design ke hisaab se badalte hain."><GpuRailNetwork /></Figure>
      <DiagramGuide
        title="Fig 6 ko kaise padhein"
        steps={[
          "Neeche ki row: chaar GPU servers. Har ek mein chaar GPUs (G0–G3) dikhte hain aur har GPU ke neeche uska NIC, rail (0, 1, 2, 3) ke rang mein.",
          "Beech ki row: leaf switches, har rail ka ek. Har server ke saare GPU-0 NICs Rail-0 leaf mein, GPU-1 NICs Rail-1 leaf mein, aur aise hi aage.",
          "Upar ki row: spine switches saare leaves ko jodte hain, to alag rails ya alag groups ke beech ka traffic bhi path paata hai.",
          "Ye kyun chalta hai: collective operations mostly alag servers ke same-number GPU ke beech data exchange karte hain. Rails ke saath wo traffic ek leaf ke neeche rehta hai — ek hop, low latency, kam congestion.",
          "Real clusters mein har server mein 8 rails, 400G ya 800G links aur aksar teen switch tiers hote hain. Cabling bahut zyada hoti hai, isliye labeling aur optics hygiene uptime tay karte hain.",
        ]}
      />
      <p style={S.p}><strong>InfiniBand:</strong> Purpose-built lossless fabric, hardware congestion control aur bahut low latency ke saath. Sabse bade AI clusters mein common.</p>
      <p style={S.p}><strong>RoCE Ethernet:</strong> Ethernet par RDMA. Ethernet switches ke saath chalta hai lekin lossless behave karne ke liye careful configuration (PFC, ECN, congestion control) chahiye.</p>
      <p style={S.p}><strong>Oversubscription:</strong> Fully non-blocking fabric (1:1) training scaling ke liye best hai lekin zyada switches aur optics lagte hain. Inference ya chhote clusters kuch oversubscription accept kar sakte hain.</p>
      <p style={S.p}><strong>Physical reality:</strong> Hazaaron DAC, AOC aur fibre links, har ek mein transceiver jo fail ya gandi ho sakti hai. Link flaps, gandi fibre ends aur kharab optics multi-node training ke slow hone ke sabse common kaaran hain.</p>

      {/* ══════════ 12. GPU SERVER ARCH ══════════ */}
      <h2 id="gpu-server-arch" style={S.h2}>GPU Server Architecture</h2>
      <p style={S.p}>8-GPU AI server sirf "GPUs wala server" nahi hai. Ye GPUs ke around design hota hai.</p>
      <ComparisonTable
        title="Typical 8-GPU AI Server ke andar"
        headers={["Subsystem", "Typical content", "Kyun matter karta hai"]}
        rows={[
          ["GPU baseboard", "8 SXM/OAM GPUs + NVSwitch (HGX/UBB)", "GPU-to-GPU bandwidth tay karta hai"],
          ["Host CPUs", "2 server CPUs", "Kernels launch, data preprocess, OS chalana"],
          ["System RAM", "1–2 TB ya zyada DDR5", "Staging area, data loaders, checkpoints"],
          ["Compute NICs", "Aksar har GPU ke liye ek 400G/800G NIC", "Inter-node training traffic"],
          ["Front-end NICs / DPU", "Storage aur management ke liye 1–2 NICs", "Datasets, checkpoints, control plane"],
          ["Local NVMe", "Kai TB, fast", "Scratch, dataset cache, checkpoints"],
          ["PSUs aur fans", "Kai high-power N+N supplies, strong fans ya liquid manifold", "Power aur cooling capacity"],
          ["BMC", "Out-of-band management", "Remote power, sensors, firmware"],
        ]}
        caption="Reference-style description. Actual configuration OEM aur generation par depend karti hai."
      />
      <p style={S.p}><strong>Chassis size:</strong> 8-GPU servers aam taur par 4U–10U aur bahut bhaari hote hain — aksar 100+ kg. Rack floor loading, lift tools aur rail strength real planning items hain.</p>
      <p style={S.p}><strong>CPU aur RAM ab bhi kyun zaroori hain:</strong> Kamzor CPU ya kam RAM GPUs ko data se bhookha rakhti hai. CPU orchestrator hai — dekho <TopicLink slug="cpu" variant="inline" /> aur <TopicLink slug="ram" variant="inline" />.</p>
      <p style={S.p}><strong>Alternative: blade-style density.</strong> Kuch designs GPU nodes ko shared chassis mein shared power aur cooling ke saath rakhte hain — dense shared-chassis compute ka idea <TopicLink slug="blade-server" variant="inline" /> mein dekho.</p>

      {/* ══════════ 13. CAPACITY PLANNING ══════════ */}
      <h2 id="capacity-planning" style={S.h2}>Capacity Planning — How Many GPUs?</h2>
      <p style={S.p}>Capacity planning ek chain hai: workload → memory → compute time → GPU count → servers → racks → power aur cooling → network. Ek step ki galti baaki sab ko bigaad deti hai.</p>
      <CodeBlock lang="text" label="Worked example (sirf illustrative numbers)">
{`Goal: 7B model ko fine-tune karna.
1. Memory  : 7B × 16 B ≈ 112 GB + activations ≈ 140 GB
2. GPU mem : har ek 80 GB → sharding ke saath ≥ 2 GPUs; speed ke liye 8 chuno
3. Server  : 1 × 8-GPU node (≈ 10 kW class)
4. Rack    : rack budget 40 kW ho to power ke hisaab se max 3 aise servers
5. Network : har server mein 8 compute NICs + 2 front-end NICs
6. Cooling : 10 kW per 8U ≈ high-density → rear-door ya liquid
7. N+1 spare capacity aur failures ke liye spare GPU pool jodo`}
      </CodeBlock>
      <p style={S.p}><strong>Teen limits socho:</strong> GPU memory (fit hoga?), GPU compute (kitna time lagega?), aur facility limits (power, cooling, floor weight, network ports). Sabse chhoti limit real capacity tay karti hai.</p>
      <p style={S.p}><strong>Utilisation:</strong> GPUs mehenge hain. 40% utilisation par chalta cluster kisi bhi power saving trick se zyada paisa barbaad karta hai. Scheduling, queue policy aur data pipelines hardware jitne hi important hain.</p>
      <p style={S.p}><strong>Spares:</strong> Spare pool plan karo. Scale par GPU aur optic failures routine statistics hain, rare events nahi. Cluster-level soch ke liye <TopicLink slug="gpu-cluster" variant="inline" /> dekho.</p>

      {/* ══════════ 14. POWER DENSITY ══════════ */}
      <h2 id="power-density" style={S.h2}>Power and Rack Density</h2>
      <p style={S.p}>Traditional enterprise rack lagbhag 5–10 kW use karta tha. Akela 8-GPU server lagbhag 10 kW class ka ho sakta hai. Ek rack mein teen-chaar ho to 30–40 kW; sabse naye rack-scale systems isse bahut upar jaate hain, aur liquid cooling mandatory hoti hai.</p>
      <ComparisonTable
        title="Workload ke hisaab se Typical Rack Density (order of magnitude)"
        headers={["Workload", "Rack power", "Cooling approach"]}
        rows={[
          ["Traditional enterprise", "~5–10 kW", "Room air, hot/cold aisle"],
          ["Virtualisation / cloud", "~10–20 kW", "Acchi containment ke saath air"],
          ["GPU inference (PCIe)", "~15–30 kW", "Strict containment ke saath air, ya rear-door"],
          ["8-GPU training racks", "~30–60 kW", "Rear-door heat exchanger ya direct liquid"],
          ["Rack-scale AI systems", "100 kW+", "Direct liquid cooling mandatory"],
        ]}
        caption="Sirf ranges. Actual figures exact platform aur design par depend karti hain."
      />
      <p style={S.p}><strong>Power chain:</strong> utility → transformer → UPS → PDU → rack busbar ya <TopicLink slug="pdu" variant="inline" /> → server PSU → GPU. Har stage continuous load plus redundancy ke hisaab se size hona chahiye. Backup design ke liye <TopicLink slug="ups" variant="inline" /> dekho.</p>
      <p style={S.p}><strong>Power spikes:</strong> GPU load bahut tezi se badalta hai — milliseconds mein idle se full, aur jab training step shuru ho ya checkpoint khatam ho to hazaaron GPUs ek saath. Ye swings UPS, generators aur utility grid tak ko stress karte hain. Kai operators power capping, smoothing features aur careful UPS design use karte hain.</p>
      <p style={S.p}><strong>Three-phase aur breaker sizing:</strong> High-density racks high-current three-phase feeds (jaise 415 V) use karte hain. PDU ratings, breaker coordination aur cable gauge continuous load (aam taur par 80% derating) ke against check karo. Power-on inrush se hone wale nuisance trips se bacho.</p>
      <Callout type="danger" title="PDU ya breaker rating kabhi cross mat karo">
        Per-phase current check kiye bina rack mein "bas ek aur GPU server" jodne se breaker trip hokar poora rack gir sakta hai. Installation se pehle per-phase load hamesha verify karo.
      </Callout>
      <Callout type="best-practice" title="Stranded capacity plan karo">
        Agar facility 40 kW per rack cool kar sakti hai lekin power sirf 20 kW de sakti hai, to cooling stranded hai (ulta bhi hota hai). Power, cooling aur floor loading ko saath match karo — <TopicLink slug="dcim" variant="inline" /> mein monitor karo.
      </Callout>

      {/* ══════════ 15. COOLING ══════════ */}
      <h2 id="cooling" style={S.h2}>Cooling — Air, Rear-Door and Direct Liquid</h2>
      <p style={S.p}>GPU jo bhi watt use karta hai wo heat ban jaata hai. 700 W ka GPU ek chhote heater jaisa hai, aur ek box mein aath GPUs plus CPUs ek space heater hain. Heat ko lagataar nikalna padta hai warna GPU throttle karta hai aur phir shutdown.</p>
      <ComparisonTable
        title="GPU Cooling Options"
        headers={["Method", "Kaise kaam karta hai", "Practical range", "Notes"]}
        rows={[
          ["Air cooling", "Server fans room air ko heatsinks se guzaarte hain", "Strict containment ke saath lagbhag 20–30 kW per rack tak", "Hot/cold aisle containment aur blanking panels chahiye"],
          ["Rear-door heat exchanger", "Rack par water-cooled door exhaust air se heat leta hai", "Lagbhag 30–50 kW per rack", "Retrofit friendly; servers air-cooled hi rehte hain"],
          ["Direct liquid cooling (DLC)", "GPUs/CPUs par cold plates heat ko liquid mein le jaate hain", "40 kW se 100+ kW per rack", "CDU, manifolds, leak detection chahiye; kuch air phir bhi chahiye"],
          ["Immersion", "Servers dielectric fluid mein doobe rehte hain", "Bahut high density", "Alag operations, special hardware; kam common"],
        ]}
        caption="Ranges indicative hain; actual limits server design, inlet temperature, airflow aur site engineering par depend karti hain."
      />
      <p style={S.p}><strong>Air cooling basics:</strong> Server fans front se cold air kheenchte hain aur back se hot air nikalte hain. Containment hot aur cold air ko mix hone se rokti hai — dekho <TopicLink slug="containment" variant="inline" /> aur <TopicLink slug="airflow-management" variant="inline" />. GPU servers ko bahut airflow chahiye, to fans loud hote hain aur khud kaafi power le sakte hain.</p>
      <p style={S.p}><strong>Direct liquid cooling:</strong> Har GPU (aur aksar CPU) par metal cold plate baithti hai. Plate ke andar liquid behta hai, heat uthata hai aur door le jaata hai. Paani volume mein air se bahut zyada heat carry karta hai, isliye DLC bahut zyada density support karti hai.</p>
      <Figure caption="Fig 7 — Direct liquid cooling loop: GPUs par cold plates, rack manifold, heat exchanger wala CDU, aur chiller ya dry cooler tak facility water. TCS (secondary) aur FWS (primary) loops kabhi mix nahi hote."><LiquidCoolingLoop /></Figure>
      <DiagramGuide
        title="Fig 7 ko kaise padhein"
        steps={[
          "Sabse left: GPU server. GPUs par cold plates (red). RAM, NICs, PSUs aur drives jaise parts ko aksar abhi bhi airflow chahiye, to fans poori tarah gayab nahi hote.",
          "Neela arrow = thanda coolant andar; laal arrow = garam coolant bahar. Server ke peeche dripless quick-disconnect couplings server nikalte waqt spill hone se bachate hain.",
          "Rack manifold: rack ke saath chalti supply aur return pipe jo har server ko feed karti hai. Leak, flow aur temperature sensors yahan lagte hain.",
          "CDU (Coolant Distribution Unit): system ka dil. Iska heat exchanger server-side loop ki heat ko building loop tak pahunchata hai bina liquids mix kiye. Pumps, filters aur tank pressure aur safai banaye rakhte hain.",
          "Sabse right: facility water chiller, dry cooler ya cooling tower tak jaata hai. Warm-water designs high temperature aur kam chiller energy allow karte hain.",
          "Neeche ke boxes: TCS (Technology Cooling System) saaf, treated loop hai jo cold plates ko chhuta hai. FWS (Facility Water System) bada building loop hai. TCS ki quality aur flow GPU ki health tay karte hain.",
        ]}
      />
      <p style={S.p}><strong>Related plant:</strong> Facility water <TopicLink slug="chiller" variant="inline" /> ya cooling tower (<TopicLink slug="cooling-tower" variant="inline" />) se aata hai. Room air ko baaki 10–30% heat ke liye abhi bhi <TopicLink slug="crac" variant="inline" /> ya PAC units chahiye. Aur detail <TopicLink slug="ai-cooling" variant="inline" /> mein.</p>
      <p style={S.p}><strong>Coolant quality:</strong> OEM jo coolant type aur filtration batata hai wahi use karo. Galat chemistry se corrosion, biofilm ya cold plates ke micro-channels block ho jaate hain — jo chupchap GPU temperature badha dete hain.</p>
      <p style={S.p}><strong>Leak philosophy:</strong> Dripless couplings, leak-detection rope aur sensors, pressure monitoring, drip trays aur isolation valve strategy use karo. Leak alarm ka ek defined action hona chahiye: rack loop isolate karo, affected servers ko safely power down karo, aur inspect karo — sirf acknowledge karke chhod mat do.</p>
      <Callout type="warning" title="Condensation ka risk">
        Agar supply coolant room ke dew point se thanda ho, to pipes aur electronics par paani jam jaata hai. CDU controls ko supply temperature dew point se margin ke saath upar rakhna chahiye.
      </Callout>
      <Callout type="common-mistake" title="'Liquid cooling hai to airflow ki zaroorat nahi'">
        Zyadatar DLC servers memory, drives, NICs aur power supplies ke liye abhi bhi air par depend karte hain. Liquid-cooled row mein containment ya blanking panels hataane se baaki parts overheat ho sakte hain.
      </Callout>

      {/* ══════════ 16. DATA CENTER GPUS ══════════ */}
      <h2 id="datacenter-gpus" style={S.h2}>Data Center GPU Families</h2>
      <p style={S.p}>Product names har ek-do saal mein badalte hain, to pattern yaad rakho, model number nahi. Current specs vendor se hamesha verify karo.</p>
      <ComparisonTable
        title="Data Center GPU Landscape (pattern, spec sheet nahi)"
        headers={["Family", "Vendor", "Typical position", "Notes"]}
        rows={[
          ["Hopper / Blackwell class", "NVIDIA", "Flagship AI training aur inference", "HBM, NVLink, SXM aur PCIe variants; sabse nayi generation mein rack-scale designs"],
          ["Ampere / Ada / L-class", "NVIDIA", "Mainstream compute aur inference", "PCIe cards, kam power, wide server support"],
          ["Instinct (MI-series)", "AMD", "AI aur HPC accelerators", "OAM modules, badi HBM capacity, ROCm software stack"],
          ["Gaudi", "Intel", "AI training aur inference accelerator", "Integrated Ethernet networking, apna software stack"],
          ["TPU aur custom ASICs", "Google, hyperscalers", "Cloud-specific accelerators", "GPU nahi hain, lekin same role mein compete karte hain — TPU topic dekho"],
        ]}
        caption="Illustrative landscape. Model names, specs aur availability tezi se badalte hain."
      />
      <p style={S.p}>Selection criteria: memory capacity aur bandwidth, supported precisions, interconnect, software ecosystem (CUDA vs ROCm vs others), power per rack, availability aur price. Software maturity aksar decider hoti hai — hardware bekaar hai agar aapka framework us par acche se na chale.</p>
      <p style={S.p}>Deep dives: <TopicLink slug="nvidia-architecture" variant="inline" />, <TopicLink slug="amd-ai-platforms" variant="inline" />, <TopicLink slug="tpu" variant="inline" /> aur <TopicLink slug="ai-accelerators" variant="inline" />.</p>

      {/* ══════════ 17. SHARING ══════════ */}
      <h2 id="sharing-virtualisation" style={S.h2}>Sharing GPUs — MIG, vGPU, Time-Slicing, Passthrough</h2>
      <p style={S.p}>Chhote job ke liye ek bada GPU aksar zyada hota hai. Idle mehenge GPUs barbaadi hain, isliye sharing ke kai tareeke hain. Har ek isolation aur efficiency ka alag balance deta hai.</p>
      <ComparisonTable
        title="GPU Sharing Methods"
        headers={["Method", "Kaise kaam karta hai", "Isolation", "Best for"]}
        rows={[
          ["Passthrough", "Poora GPU ek VM ko assign (IOMMU / VFIO se)", "Strong", "Dedicated VM, near-native performance"],
          ["MIG (Multi-Instance GPU)", "Hardware GPU ko 7 tak instances mein baanta hai, har ek ki apni memory aur compute", "Strong (hardware)", "Kai inference jobs, multi-tenant clusters"],
          ["vGPU", "Hypervisor-level virtual GPUs, vendor licensing ke saath", "Good", "Virtual desktops, VDI, shared VMs"],
          ["Time-slicing", "Kai processes ek GPU par baari-baari se chalte hain", "Weak", "Dev / test, bursty chhote jobs"],
          ["MPS / spatial sharing", "Processes SMs ko ek saath share karte hain", "Weak se medium", "Chhote cooperating jobs"],
        ]}
        caption="MIG aur vGPU ki availability GPU model aur licence par depend karti hai. Product ke hisaab se verify karo."
      />
      <p style={S.p}><strong>MIG details:</strong> Bada GPU fixed slices mein kat jaata hai, har ek ki dedicated memory aur cache. Ek noisy job doosre ki memory bandwidth nahi chura sakta. Slice sizes fixed profiles hain, isliye fragments waste na hon iske liye planning chahiye.</p>
      <p style={S.p}><strong>Time-slicing risk:</strong> Memory isolation nahi — ek job ki memory khatam hone se doosre bhi prabhavit ho sakte hain. Dev clusters ke liye acha, production SLAs ke liye kharab.</p>
      <p style={S.p}>Ye general virtualisation concepts se judta hai — <TopicLink slug="virtualization" variant="inline" />. Passthrough ke liye BIOS mein IOMMU enabled aur sahi PCIe grouping chahiye.</p>

      {/* ══════════ 18. SOFTWARE STACK ══════════ */}
      <h2 id="software-stack" style={S.h2}>The GPU Software Stack</h2>
      <Figure caption="Fig 8 — GPU software stack: hardware aur firmware se scheduler tak, saath mein DCGM monitoring. Neeche ke layer ki fault aksar upar confusing error ban kar dikhti hai."><GpuSoftwareStack /></Figure>
      <DiagramGuide
        title="Fig 8 ko kaise padhein"
        steps={[
          "Neeche se upar padho. Hardware (GPUs, NVLink, NICs, power aur cooling) foundation hai.",
          "Uske upar: firmware aur BIOS — GPU VBIOS, BMC, aur Above 4G decoding, ReBAR, IOMMU jaise BIOS options.",
          "Agla: kernel driver aur NVSwitch systems par fabric manager. Ye layer GPUs ko OS ko dikhati hai aur NVLink domain banati hai.",
          "Phir libraries aur container runtime — CUDA, cuDNN, NCCL — aur container toolkit jo GPUs ko Docker ya Kubernetes pods ke andar expose karta hai.",
          "Frameworks (PyTorch, JAX, vLLM, TensorRT) upar baithte hain, aur scheduler (Slurm ya Kubernetes) jobs ko nodes par place karta hai. Right panel DCGM monitoring aur health checks dikhata hai jo har layer ko dekhte hain.",
          "Kyun matter karta hai: driver mismatch ya fail fabric manager users ko 'meri training job crash ho rahi hai' jaisa dikhta hai. Neeche se upar debug karo.",
        ]}
      />
      <p style={S.p}><strong>Compatibility matrix:</strong> GPU driver version, CUDA version, framework version aur fabric manager version compatible hone chahiye. Har node type ka ek validated "golden image" rakho aur upgrade controlled, staged tareeke se karo — poore cluster ko aankh band karke upgrade mat karo.</p>
      <p style={S.p}><strong>Containers:</strong> NVIDIA container toolkit GPU devices aur driver libraries ko container ke andar pass karta hai. Applications apni CUDA libraries image mein laati hain aur driver node deta hai.</p>
      <p style={S.p}><strong>Schedulers:</strong> Kubernetes GPUs gin-ne ke liye device plugin use karta hai; Slurm GRES. Acche schedulers topology (NVLink groups, NUMA) samajhte hain aur gang scheduling support karte hain, taaki 64-GPU job tabhi shuru ho jab saare 64 free hon. Dekho <TopicLink slug="mlops" variant="inline" />.</p>
      <p style={S.p}><strong>AMD equivalent:</strong> ROCm AMD ka stack hai, similar layers ke saath (kernel driver, HIP, RCCL, ROCm SMI). Concepts wahi hain; naam alag.</p>

      {/* ══════════ 19. BIOS ══════════ */}
      <h2 id="bios-settings" style={S.h2}>BIOS and Firmware Settings</h2>
      <p style={S.p}>Bahut saari "mysterious" GPU problems BIOS settings se aati hain. Settings OEM aur BIOS version ke hisaab se badalti hain; hamesha OEM GPU server guide follow karo.</p>
      <ComparisonTable
        title="GPU Servers ke liye zaroori BIOS Settings"
        headers={["Setting", "Kyun matter karta hai", "Typical advice"]}
        rows={[
          ["Above 4G Decoding", "GPU 4 GB se upar address space mein bada memory (BAR) map karta hai", "Enabled — warna GPU initialise nahi ho sakta"],
          ["Resizable BAR (ReBAR)", "CPU ko GPU memory ki poori window access karne deta hai", "OEM/vendor guidance follow karo"],
          ["IOMMU / VT-d / AMD-Vi", "Passthrough aur DMA protection ke liye zaroori", "VMs ya passthrough use karte waqt enable karo"],
          ["SR-IOV", "vGPU aur NICs ke virtual functions", "vGPU ya SR-IOV NICs ho to enable karo"],
          ["ACS (Access Control Services)", "Devices ke beech peer-to-peer routing par asar", "Dhyaan se tune karo; galat setting GPUDirect P2P ya isolation tod deti hai"],
          ["PCIe generation / link speed", "Link generation force karta hai", "Auto, ya supported maximum par fixed"],
          ["NUMA / sub-NUMA", "Memory aur PCIe ko per socket kaise group kiya jaata hai", "Job pinning strategy se match karo"],
          ["Power / performance profile", "CPU C-states aur boost control karta hai", "Latency-sensitive nodes ke liye Performance profile"],
          ["Secure Boot", "Unsigned kernel modules block kar sakta hai", "Driver modules sign karo ya site policy follow karo"],
        ]}
        caption="Reference list. Actual option names aur defaults OEM aur BIOS version par depend karte hain."
      />
      <p style={S.p}><strong>Firmware order:</strong> BIOS, BMC, GPU VBIOS, NIC firmware aur driver versions OEM saath mein test karta hai. Ek ek part ki jagah matrix ki tarah upgrade karo, aur rollback images rakho.</p>
      <Callout type="best-practice" title="Golden BIOS profile document karo">
        Validated node ka BIOS configuration export karo aur BMC ya OEM tooling se saare identical nodes par apply karo. Nodes ke beech configuration drift "ek node slow hai" wali problem ka classic kaaran hai.
      </Callout>

      {/* ══════════ 20. INSTALLATION ══════════ */}
      <h2 id="installation-replacement" style={S.h2}>Installation and Replacement</h2>
      <p style={S.p}><strong>Kuch chhoone se pehle:</strong> change ticket confirm karo, check karo ki node scheduler se drain hai, confirm karo ki spare part number OEM list se match karta hai, aur us model ki service guide padho.</p>
      <CodeBlock lang="text" label="PCIe GPU card replacement — typical sequence (OEM guide follow karo)">
{`1. Node ko scheduler se drain karo; jobs khatam hone ya migrate hone do.
2. Graceful OS shutdown; power off; power cords nikalo (dono PSUs).
3. Residual power discharge hone ka wait karo (OEM guide ke hisaab se).
4. ESD protection on; top cover ya riser cage kholo.
5. Pehle auxiliary power cable, phir GPU retention bracket hatao.
6. Card ko seedha upar uthao; antistatic surface par rakho.
7. Naya card x16 slot mein firmly lagao; aux power jodo; cable type check karo.
8. Chassis band karo; power jodo; boot karo.
9. Verify: nvidia-smi mein GPU dikhe, PCIe gen/width sahi, firmware match.
10. Production mein wapas bhejne se pehle diagnostics chalao.`}
      </CodeBlock>
      <p style={S.p}><strong>SXM / OAM modules:</strong> Ye bhaari aur torque-sensitive hote hain aur aksar trained technicians tray ya baseboard ki tarah replace karte hain. OEM torque spec aur tool use karo — heatsink par galat torque module kharab karta hai ya thermal contact kharab deta hai.</p>
      <p style={S.p}><strong>Thermal interface:</strong> Purani thermal paste ya pads ko aankh band karke reuse mat karo; OEM-approved material use karo. Uneven contact se aisa GPU banta hai jo apne padosiyon se kam load par hi throttle karta hai.</p>
      <p style={S.p}><strong>Liquid-cooled nodes:</strong> Check karo ki quick-disconnect couplings click hokar seal hui hain, drip ke liye inspect karo, aur agar OEM procedure kahe to loop se air bleed karo. Power-on se pehle wet-test karo.</p>
      <p style={S.p}><strong>Cabling:</strong> Har compute NIC cable ko dono ends par rack, server, GPU/rail number se label karo. Fibre ka bend radius follow karo; optics ends ko use tak capped rakho aur lagane se pehle saaf karo.</p>
      <Callout type="danger" title="Jab tak platform explicitly support na kare, GPUs ko hot-swap mat karo">
        Zyadatar GPU servers mein GPUs hot-pluggable NAHI hote. Card nikalne ya lagane se pehle poora power down karo.
      </Callout>
      <Callout type="maintenance" title="Weight aur handling">
        8-GPU servers ka wazan 100 kg se zyada ho sakta hai. Server lift, do ya zyada log aur rated rails use karo. Aise server ko lift support ke bina rails par kabhi slide mat karo.
      </Callout>

      {/* ══════════ 21. TESTING ══════════ */}
      <h2 id="testing-commissioning" style={S.h2}>Testing and Commissioning</h2>
      <p style={S.p}>Naye ya repair kiye GPU node ko burn-in ke bina production pool mein mat daalo. Kai kamzor GPUs, kharab cables aur marginal power supplies ki fault sirf sustained load mein dikhti hai.</p>
      <ComparisonTable
        title="GPU Commissioning Test Plan"
        headers={["Stage", "Kya check karna hai", "Tool / method"]}
        rows={[
          ["Inventory", "GPU count, model, serial, firmware, PCIe gen/width", "nvidia-smi, lspci, BMC inventory"],
          ["Topology", "NVLink status, NUMA, NIC–GPU affinity", "nvidia-smi topo -m, nvlink --status"],
          ["Health diag", "Memory, PCIe, thermal aur stress tests", "dcgmi diag -r 3 (lambe ke liye 4)"],
          ["Burn-in", "Kai ghante full load par, temperature aur clocks dekho", "stress workload + DCGM logging"],
          ["Interconnect", "Node ke andar aur nodes ke paar all-reduce bandwidth", "nccl-tests (all_reduce_perf)"],
          ["Network", "Link speed, error counters, RDMA tests", "ib_write_bw, perftest, switch counters"],
          ["Power & thermal", "Rating ke against power draw; inlet/outlet temperature; coolant flow", "BMC, PDU, DCIM, CDU readings"],
          ["Acceptance", "Results record, baseline store, ticket close", "Commissioning report"],
        ]}
        caption="Typical plan. Pass criteria OEM acceptance guide aur project specification se aate hain."
      />
      <CodeBlock lang="bash" label="Quick health aur bandwidth tests">
{`nvidia-smi -L                    # GPUs aur UUIDs list karo
dcgmi diag -r 3                  # medium diagnostic (≈ minutes)
dcgmi diag -r 4                  # stress ke saath lamba diagnostic

# NCCL collective bandwidth (nccl-tests alag build hota hai)
./build/all_reduce_perf -b 8 -e 8G -f 2 -g 8
# busbw ko same topology ke OEM / vendor expected figure se compare karo.`}
      </CodeBlock>
      <p style={S.p}><strong>Baselines:</strong> Har node ke results save karo. Baad mein performance girne par guess karne ki jagah baseline se compare kar sakte ho.</p>

      {/* ══════════ 22. MONITORING ══════════ */}
      <h2 id="monitoring" style={S.h2}>Monitoring GPUs</h2>
      <p style={S.p}><strong>DCGM</strong> (Data Center GPU Manager) NVIDIA systems par standard telemetry aur health tool hai. dcgm-exporter metrics Prometheus ko deta hai, aur Grafana dashboards banata hai. AMD ke paas ROCm SMI aur similar exporters hain.</p>
      <ComparisonTable
        title="Key GPU Metrics aur wo kya batate hain"
        headers={["Metric", "Kya dikhata hai", "Kya dekhna hai"]}
        rows={[
          ["GPU utilisation", "Kitne time kernels chal rahe hain", "Kam = data/CPU/network se bhookha; 100% efficiency ka saboot nahi"],
          ["Memory used / free", "VRAM consumption", "Full ke paas = OOM risk"],
          ["Temperature (GPU, memory)", "Die aur HBM temperature", "Badhta trend, hot-spots, GPUs ke beech fark"],
          ["Power draw aur cap", "Limit ke against watts", "Limit par atka = power-capped throttling"],
          ["SM / memory clocks", "Operating frequency", "Load mein girna = throttling"],
          ["Throttle reasons", "Clocks kyun kam hue", "Thermal, power, HW slowdown"],
          ["ECC errors", "Correctable / uncorrectable memory errors, row-remap status", "Badhta trend; koi bhi uncorrectable"],
          ["XID errors", "Driver-reported GPU faults", "Troubleshooting mein XID table dekho"],
          ["NVLink counters", "CRC, replay, recovery errors", "Badhna = kharab link ya hardware"],
          ["PCIe replay / width", "Link health", "Replays badhna ya width kam hona"],
        ]}
        caption="Alert thresholds OEM/vendor guidance aur apni baseline se aani chahiye."
      />
      <CodeBlock lang="bash" label="Useful monitoring commands">
{`nvidia-smi                                   # overview
nvidia-smi -q -d TEMPERATURE,POWER,PERFORMANCE   # throttle reasons, clocks
nvidia-smi dmon -s pucvmet                   # live metrics stream
nvidia-smi -q -d ECC                         # ECC error counters
dmesg -T | grep -i xid                       # kernel log se XID events
dcgmi discovery -l                           # DCGM ko dikhne wale GPUs
dcgmi health -c                              # quick health check chalao`}
      </CodeBlock>
      <Callout type="important" title="Utilisation efficiency nahi hai">
        nvidia-smi 100% utilisation dikhata hai agar koi bhi kernel hamesha chal raha ho — chahe wo SMs ka bahut chhota hissa use kare. Asli efficiency ke liye profiler metrics (SM occupancy, tensor-core activity, tokens per second, MFU) dekho.
      </Callout>
      <p style={S.p}><strong>Facility side:</strong> GPU metrics ko rack power, inlet temperature aur coolant flow ke saath <TopicLink slug="dcim" variant="inline" /> aur <TopicLink slug="bms" variant="inline" /> mein combine karo. Monitoring strategy ke liye <TopicLink slug="ai-monitoring" variant="inline" /> dekho.</p>

      {/* ══════════ 23. MAINTENANCE ══════════ */}
      <h2 id="maintenance" style={S.h2}>Maintenance</h2>
      <ComparisonTable
        title="GPU Infrastructure Maintenance Schedule (example)"
        headers={["Frequency", "Task"]}
        rows={[
          ["Continuous", "DCGM telemetry, XID / ECC / throttle / NVLink errors par alerts"],
          ["Daily", "Dashboards, failed health checks, stragglers dekho"],
          ["Weekly", "Correctable-error trends review; filters aur CDU readings inspect"],
          ["Monthly", "Idle nodes par DCGM diag; coolant level, pressure, leak sensors check"],
          ["Quarterly", "Air filters saaf; fibre ends aur optics errors inspect; BIOS profile drift verify"],
          ["OEM plan ke hisaab se", "Firmware / driver update staged waves mein, rollback ke saath"],
          ["Annually", "OEM ke hisaab se coolant sample aur treatment; torque / connector inspection; node isolation DR drills"],
        ]}
        caption="Sirf example. Actual intervals OEM manuals aur operating policy se aate hain."
      />
      <p style={S.p}><strong>Dhool aur filters:</strong> GPU server fans bahut air kheenchte hain. Dhool heatsink fins ko band kar deti hai aur temperature dheere-dheere badhati hai — miss karna aasan fault. White space saaf rakho aur filters schedule par badlo.</p>
      <p style={S.p}><strong>Update philosophy:</strong> Naye driver/CUDA/firmware combination ko pehle chhote canary pool par real workloads ke saath test karo, phir waves mein roll out karo. Rollback ke liye last known good image rakho.</p>
      <p style={S.p}><strong>Spare strategy:</strong> Site par tested spare GPUs, power supplies, fans, optics aur cables rakho. GPUs ki lead time lambi ho sakti hai.</p>

      {/* ══════════ 24. TROUBLESHOOTING ══════════ */}
      <h2 id="troubleshooting" style={S.h2}>Troubleshooting</h2>
      <Figure caption="Fig 9 — GPU troubleshooting flow: alert → kya saare GPUs dikh rahe hain → XID/ECC errors → throttling → slow-but-healthy checks → fix aur validate. Hamesha pehle node ko scheduler se isolate karo."><GpuTroubleshootFlow /></Figure>
      <DiagramGuide
        title="Fig 9 ko kaise padhein"
        steps={[
          "Laal box se shuru karo: alert, failed job ya slow job.",
          "Pehla decision: kya nvidia-smi saare GPUs list karta hai jitne inventory kehti hai? NO ho to GPU bus se gir gaya hai (aksar XID 79). Order mein check karo: power cable, seating aur riser, BIOS, BMC log, thermal, phir part swap.",
          "Saare GPUs hain to kernel aur DCGM logs mein XID ya ECC errors dekho. Memory ya NVLink fault ka matlab: node drain karo, GPU reset karo, error repeat ho to RMA.",
          "Koi error nahi? Throttle reasons check karo. Thermal, power cap ya hardware slowdown cooling ya power problem batata hai — inlet temperature, coolant flow, PSUs aur power caps dekho.",
          "Phir bhi slow lekin healthy? GPU ke bahar dekho: data loader, NCCL, topology placement, aur driver/CUDA version mismatch.",
          "End mein validation run (dcgmi diag aur nccl-tests) aur sahi ticket. Jis node par abhi live jobs chal rahi hon use kabhi debug mat karo.",
        ]}
      />
      <ComparisonTable
        title="Common XID Errors (reference — current NVIDIA documentation se verify karo)"
        headers={["XID", "Typical matlab", "Usual pehla action"]}
        rows={[
          ["13, 31", "Application error: illegal instruction, user code mein memory fault", "Pehle job/code dekho, GPU nahi"],
          ["48", "Double-bit ECC error (uncorrectable)", "Node drain, GPU reset; repeat ho to replace"],
          ["63 / 64", "Row remapping event ya failure", "Remap apply karne ke liye reset; remap fail ya spares khatam ho to replace"],
          ["74", "NVLink error", "NVLink status, cabling/baseboard check; reset; persistent ho to RMA"],
          ["79", "GPU bus se gir gaya", "Power, seating, PCIe, thermal, BIOS; reboot; repeat ho to replace"],
          ["94 / 95", "Contained / uncontained ECC error", "Vendor guidance follow; jobs restart; frequent ho to replace"],
        ]}
        caption="XID meanings driver versions ke beech badal sakte hain. Sirf starting guide ki tarah use karo."
      />
      <ComparisonTable
        title="Symptom → Likely Cause → First Check"
        headers={["Symptom", "Likely cause", "First check"]}
        rows={[
          ["GPU nvidia-smi se gayab", "Seating, power cable, PCIe fault, dead GPU", "BMC log, dmesg, reseat / swap"],
          ["Low PCIe width ya gen", "Riser, dhool, dheela card, BIOS", "Load mein nvidia-smi pcie query, reseat"],
          ["Training baseline se slow", "Throttling, kharab NVLink, data loader, NCCL path", "Throttle reasons, topo -m, nccl-tests"],
          ["Ek GPU baaki se slow", "Thermal paste, fan ya coolant flow, power cap", "GPUs ke temp aur clocks compare karo"],
          ["CUDA OOM", "Model/batch bada, memory leak, doosra process", "nvidia-smi memory, process list, batch kam karo"],
          ["Multi-node job hang ya slow", "Link flap, kharab optic, NCCL misconfig, congestion", "Switch counters, NCCL_DEBUG logs, link error counters"],
          ["Node load mein reboot", "PSU / power limit, thermal trip", "BMC SEL, PSU status, PDU load"],
          ["Driver update ke baad GPU errors", "Fabric manager ya CUDA se version mismatch", "Driver / fabric manager / CUDA matrix check, rollback"],
        ]}
        caption="Sabse simple aur sasti check se shuru karo."
      />
      <CodeBlock lang="bash" label="Suspect GPU node par first-response commands">
{`nvidia-smi -L                       # saare GPUs hain?
dmesg -T | grep -iE "xid|nvrm|nvlink"
nvidia-smi -q -d ECC,TEMPERATURE,PERFORMANCE | less
nvidia-smi topo -m
ipmitool sel list | tail -20        # BMC events: PSU, thermal, power
dcgmi diag -r 2                     # node isolate hone ke baad quick diagnostic`}
      </CodeBlock>
      <Callout type="best-practice" title="Pehle isolate karo, phir debug">
        Koi bhi reset ya test se pehle Kubernetes ya Slurm mein node ko cordon/drain karo. Jis node par abhi customer job chal rahi ho uspar stress test chalane se doosra outage ho jaata hai.
      </Callout>

      {/* ══════════ 25. FAILURE SCENARIOS ══════════ */}
      <h2 id="failure-scenarios" style={S.h2}>Failure Scenarios</h2>
      <h3 style={S.h3}>Scenario 1 — Training ke beech GPU bus se gir gaya</h3>
      <p style={S.p}>XID 79 aata hai aur ek GPU nvidia-smi se gayab ho jaata hai. Job crash hoti hai kyunki saare ranks khoye hue ka wait karte hain. Scheduler job ko last checkpoint se healthy nodes par requeue karta hai. Bad node drain hota hai; engineers power cables, seating, riser aur BMC log check karte hain, reboot karke diagnostics chalate hain. Repeat ho to GPU replace hota hai.</p>
      <h3 style={S.h3}>Scenario 2 — Cooling loop pump failure</h3>
      <p style={S.p}>CDU pump fail ho jaata hai. Design mein N+1 pumps hon to redundant pump sambhal leta hai; nahi to coolant flow gir jaata hai aur GPU temperature tezi se badhta hai. Thermal throttling shuru hoti hai, phir GPUs khud ko bachane ke liye trip karte hain. CDU aur BMS ke alarms isse pehle warn karne chahiye. Operators load kam karte hain (power capping, nodes drain), flow restore karte hain aur service mein wapas lane se pehle inspect karte hain.</p>
      <h3 style={S.h3}>Scenario 3 — Liquid-cooled rack mein leak alarm</h3>
      <p style={S.p}>Leak rope trigger hoti hai. Runbook kehta hai: alarm confirm karo, rack loop valves isolate karo, affected servers ko gracefully power down karo, liquid check karo, sukhao aur inspect karo, pressure-test karo, phir restore karo. Design ka maqsad ek potential disaster ko planned maintenance bana dena hai.</p>
      <h3 style={S.h3}>Scenario 4 — Power swing se UPS trip</h3>
      <p style={S.p}>Hazaaron GPUs ek saath training step khatam karke checkpoint karte hain; load milliseconds mein sau kW ke swing karta hai. UPS aur generator design ye swings tolerate na kare to alarm ya transfer ho sakta hai. Mitigation: power capping, staggered checkpoints, load-smoothing features aur sahi size ka UPS — dekho <TopicLink slug="ups" variant="inline" />.</p>
      <h3 style={S.h3}>Scenario 5 — Gandi optic se silent slowdown</h3>
      <p style={S.p}>Ek gandi fibre end ek rail par link errors aur retransmits karwati hai. Koi GPU alarm nahi bajta, lekin har all-reduce slow link ka wait karta hai aur 512-GPU job 15% slow chalti hai. Switch error counters aur NCCL benchmarks ise pakadte hain; optic saaf ya replace karne se fix ho jaata hai.</p>
      <Callout type="interview" title="Failure mindset">
        Scale par failure normal hai. Acchi AI infrastructure maanti hai ki parts fail honge, unhe jaldi detect karti hai, apne-aap isolate karti hai aur baaki cluster ko chalta rakhti hai.
      </Callout>

      {/* ══════════ 26. TIER III / IV ══════════ */}
      <h2 id="tier-iii-iv-view" style={S.h2}>Tier III and Tier IV View</h2>
      <p style={S.p}>Tier classification facility infrastructure ki redundancy batati hai — power paths, cooling aur maintainability. Ye nahi batati ki kitne GPUs fail honge ya training job bachegi ya nahi. Phir bhi GPU load har Tier requirement ko stress karta hai.</p>
      <ComparisonTable
        title="GPU Infrastructure — Tier III vs Tier IV Thinking"
        headers={["Area", "Tier III thinking", "Tier IV thinking"]}
        rows={[
          ["GPU racks tak power", "N+1 UPS, concurrently maintainable; servers ko redundant PSUs ke saath dual feed", "2N (A/B poori tarah independent) taaki path fault servers na gira de"],
          ["Cooling", "N+1 chillers, pumps aur CDUs; shutdown ke bina maintain", "Fault tolerant: duplicate loops aur independent paths"],
          ["Liquid cooling", "Redundant CDU pumps; maintenance ke liye isolation valves", "Independent CDU/loop sets, automated failover"],
          ["Network fabric", "Redundant spines aur uplinks", "Poori tarah diverse fabric paths"],
          ["Monitoring", "Leak, flow, temperature, power par alarms", "Wahi, plus automated protective actions"],
        ]}
        caption="Sirf conceptual view. Kai AI training clusters enterprise sites se kam redundancy accept karte hain aur checkpointing par depend karte hain; inference aur customer-facing services ko aam taur par zyada redundancy chahiye."
      />
      <p style={S.p}><strong>Practical reality:</strong> 2N power par 30–100 kW ka rack electrical aur UPS investment ko double kar deta hai. Operators workload ke hisaab se redundancy chunte hain: training clusters aksar N+1 ya kam accept karke checkpoints se recover karte hain, jabki inference aur critical services zyada resilience use karti hain.</p>
      <p style={S.p}><strong>Dual PSU power:</strong> GPU servers mein kai PSUs N+N ya N+1 configuration mein hote hain, A aur B power paths se feed. Ensure karo ki ek path fail hone par combined load ek path mein fit ho.</p>
      <p style={S.p}>Actual implementation depends on project requirements, utility requirements, OEM design and data center architecture — hamesha vendor documentation se verify karo. Related facility topics: <TopicLink slug="data-center-types" variant="inline" />.</p>

      {/* ══════════ 27. SAFETY ══════════ */}
      <h2 id="safety-practices" style={S.h2}>Safety Practices</h2>
      <ul style={S.ul}>
        <li><strong>Electrical:</strong> High-current feeds aur PSUs. Lock-out/tag-out (LOTO) follow karo, de-energised verify karo, discharge time ka wait karo aur rated tools use karo.</li>
        <li><strong>Lifting:</strong> 8-GPU servers 100 kg ya zyada ke hote hain. Lifts, rated rails aur kaafi log use karo; akele kabhi mat uthao.</li>
        <li><strong>ESD:</strong> GPU boards aur modules ko chhoote waqt wrist straps aur antistatic mats use karo.</li>
        <li><strong>Hot surfaces:</strong> GPU heatsinks jala sakte hain. Shutdown ke baad handle karne se pehle thanda hone do.</li>
        <li><strong>Liquid cooling:</strong> Coolant type jaano (aksar glycol-based), MSDS ke hisaab se PPE pehno, absorbent material aur leak kits rakho, isolation valves jaano, trained na ho to pressure mein couplings kabhi mat kholo.</li>
        <li><strong>Paani aur bijli:</strong> Har leak ko electrical hazard maano. Safai se pehle affected area ko de-energise karo.</li>
        <li><strong>Noise:</strong> GPU server rooms bahut loud hote hain. Hearing protection use karo.</li>
        <li><strong>Fibre optics:</strong> Live fibre ya transceiver port mein kabhi mat dekho; laser power aankhon ko nuksaan pahuncha sakti hai.</li>
        <li><strong>Change control:</strong> Firmware, BIOS aur driver changes approved procedures aur rollback ke saath hon.</li>
      </ul>

      {/* ══════════ 28. OEM ══════════ */}
      <h2 id="oem-reference" style={S.h2}>OEMs and Reference Platforms</h2>
      <ComparisonTable
        title="GPU Ecosystem — Kaun kya banata hai"
        headers={["Layer", "Examples", "Role"]}
        rows={[
          ["GPU / accelerator silicon", "NVIDIA, AMD, Intel", "Chip, firmware, driver, SDKs"],
          ["Reference baseboard / system", "NVIDIA HGX / DGX, OCP UBB par AMD Instinct platform, Intel Gaudi systems", "Validated GPU baseboards aur designs"],
          ["Server OEMs", "Dell, HPE, Supermicro, Lenovo, Cisco, Inspur, Gigabyte aur doosre", "Complete servers, firmware, support aur warranty"],
          ["Network fabric", "NVIDIA (InfiniBand / Spectrum-X), Arista, Cisco, Broadcom-based switches", "Compute fabric"],
          ["Cooling", "CDU aur DLC vendors, rear-door heat exchanger makers", "Liquid aur heat rejection systems"],
          ["Cloud providers", "AWS, Azure, GCP aur doosre", "GPUs ghante ke hisaab se kiraye par — cloud topics dekho"],
        ]}
        caption="Illustrative, exhaustive nahi, aur endorsement nahi. Vendor compatibility lists hamesha check karo."
      />
      <p style={S.p}>OEM ke validated configurations aur compatibility matrices use karo. Unlisted GPUs, NICs aur firmware mix karne se support void hota hai aur instability ka risk badhta hai. Cloud alternatives ke liye <TopicLink slug="aws" variant="inline" />, <TopicLink slug="azure" variant="inline" /> aur <TopicLink slug="gcp" variant="inline" /> dekho.</p>

      {/* ══════════ 29. MISCONCEPTIONS ══════════ */}
      <h2 id="misconceptions" style={S.h2}>Common Misconceptions</h2>
      <ul style={S.ul}>
        <li><strong>"Zyada GPUs matlab hamesha tez."</strong> Tabhi jab network, data pipeline aur software scale karein. Kharab scaling GPUs ko idle chhod sakti hai.</li>
        <li><strong>"100% GPU utilisation matlab hum efficient hain."</strong> Iska matlab sirf itna ki koi kernel chal raha hai. Asli throughput aur tensor-core use dekho.</li>
        <li><strong>"Liquid cooling matlab air cooling nahi."</strong> Zyadatar DLC servers ko baaki parts ke liye abhi bhi air chahiye.</li>
        <li><strong>"Koi bhi GPU kisi bhi server mein fit ho jaata hai."</strong> Power, cooling, firmware, form factor aur PCIe lanes sab OEM design se match karne chahiye.</li>
        <li><strong>"Inference ko kam resources chahiye, to simple hai."</strong> KV-cache, latency targets aur scale inference infrastructure ko bhi mushkil banate hain.</li>
        <li><strong>"Same generation ke PCIe aur SXM GPUs ki performance same hoti hai."</strong> Power limits aur interconnect alag hote hain, to performance bhi.</li>
        <li><strong>"GPU errors hamesha hardware fault hote hain."</strong> Kai XIDs application bugs, driver mismatch ya power/cooling issues se aate hain.</li>
      </ul>

      {/* ══════════ 30. FUTURE TRENDS ══════════ */}
      <h2 id="future-trends" style={S.h2}>Future Trends</h2>
      <ul style={S.ul}>
        <li><strong>Rack-scale systems:</strong> Poora rack ek accelerator ki tarah design hota hai, bade NVLink domain aur integrated liquid cooling ke saath.</li>
        <li><strong>Zyada densities:</strong> Per rack 100 kW se kai sau kW, liquid cooling ko default bana kar.</li>
        <li><strong>Faster interconnects:</strong> Next-generation NVLink, 800G/1.6T networking, co-packaged optics.</li>
        <li><strong>Zyada memory:</strong> Bade aur tez HBM generations, aur host memory ke liye CXL memory pooling.</li>
        <li><strong>Kam precision:</strong> Tez, sasti training aur inference ke liye FP8, FP4 aur mixed formats.</li>
        <li><strong>Custom silicon:</strong> TPUs aur in-house accelerators GPUs ke saath chalte hain — dekho <TopicLink slug="ai-accelerators" variant="inline" />.</li>
        <li><strong>Power constraints:</strong> Grid availability main limit ban rahi hai — on-site generation, battery smoothing aur efficiency par focus.</li>
        <li><strong>Heat reuse aur efficiency:</strong> PUE aur sustainability sudharne ke liye warm-water cooling aur heat recovery.</li>
        <li><strong>Automation:</strong> Automated health checks, predictive failure analytics aur self-healing schedulers.</li>
      </ul>

      {/* ══════════ 31. LEARNING PATH ══════════ */}
      <h2 id="learning-path" style={S.h2}>Learning Path</h2>
      <p style={S.p}>Is article ke baad aur gehraai ke liye recommended order:</p>
      <ul style={S.ul}>
        <li><TopicLink slug="server-basics" variant="inline" /> → <TopicLink slug="cpu" variant="inline" /> → <TopicLink slug="ram" variant="inline" /> → ye GPU article.</li>
        <li>Servers group mein agla: <TopicLink slug="blade-server" variant="inline" /> aur <TopicLink slug="virtualization" variant="inline" />.</li>
        <li>AI track: <TopicLink slug="what-is-ai-infrastructure" variant="inline" /> → <TopicLink slug="ai-gpu" variant="inline" /> → <TopicLink slug="gpu-cluster" variant="inline" /> → <TopicLink slug="ai-networking" variant="inline" /> → <TopicLink slug="ai-cooling" variant="inline" />.</li>
        <li>Facility track: <TopicLink slug="pdu" variant="inline" />, <TopicLink slug="ups" variant="inline" />, <TopicLink slug="chiller" variant="inline" />, <TopicLink slug="containment" variant="inline" />.</li>
      </ul>

      {/* ══════════ 32. INTERVIEW ══════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: AI ke liye GPU CPU se behtar kyun hai?</h3>
      <p style={S.p}><strong>Answer:</strong> AI mostly matrix multiplication hai, jise hazaaron independent operations mein baanta ja sakta hai. GPU ke paas hazaaron simple cores, tensor cores aur bahut high memory bandwidth hoti hai, isliye wo per second CPU se kaafi zyada operations poore karta hai.</p>
      <h3 style={S.h3}>Q2: 7B model train karne ke liye kitni memory chahiye?</h3>
      <p style={S.p}><strong>Answer:</strong> Mixed precision aur Adam ke saath lagbhag 16 bytes per parameter — kareeb 112 GB — plus activations. To sharding ke bina ye ek 80 GB GPU mein fit nahi hota.</p>
      <h3 style={S.h3}>Q3: NVLink vs PCIe?</h3>
      <p style={S.p}><strong>Answer:</strong> PCIe GPU ko host aur NICs se jodta hai; NVLink GPUs ko aapas mein bahut zyada bandwidth par jodta hai. NVSwitch node ke andar NVLink fabric ko all-to-all bana deta hai.</p>
      <h3 style={S.h3}>Q4: nvidia-smi topo -m kya dikhata hai?</h3>
      <p style={S.p}><strong>Answer:</strong> GPUs aur NICs ke beech connectivity matrix — NVLink ke liye NV#, PCIe switches ke liye PIX/PXB, host aur cross-socket paths ke liye NODE aur SYS. Placement aur slow communication diagnose karne mein madad karta hai.</p>
      <h3 style={S.h3}>Q5: GPU racks ke liye cooling design kyun badalna padta hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Density 5–10 kW se 30–100+ kW per rack ho jaati hai. Akeli air itni heat reliably nahi nikal sakti, to rear-door heat exchangers ya CDUs ke saath direct liquid cooling use hoti hai.</p>
      <h3 style={S.h3}>Q6: XID 79 kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> GPU PCIe bus se gir gaya hai. Power, seating, risers, BIOS aur BMC logs check karo, repeat ho to replace karo.</p>
      <h3 style={S.h3}>Q7: MIG kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Multi-Instance GPU ek GPU ko hardware mein kai isolated instances mein baanta hai, har ek ki apni memory aur compute — multi-tenant inference ke liye acha.</p>
      <h3 style={S.h3}>Q8: 512-GPU job mein ek GPU baaki se slow ho to kya hoga?</h3>
      <p style={S.p}><strong>Answer:</strong> Synchronous training har step sabse slow rank ka wait karti hai, to poora job slow ho jaata hai. Temperature, clocks aur throttle reasons se dhundho, node isolate karo aur fix ya replace karo.</p>

      {/* ══════════ 33. KEY TAKEAWAYS ══════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>GPU ek throughput machine hai: hazaaron simple cores plus tensor cores aur bahut fast HBM.</li>
        <li>Memory tay karti hai kya fit hoga: training ke liye ≈16 bytes per parameter, inference weights ke liye ≈2 bytes ya kam.</li>
        <li>Precision (BF16, FP8, INT8) soch-samajh kar chuno — ye memory, speed aur accuracy badalti hai.</li>
        <li>Host aur NIC traffic ke liye PCIe, node ke andar NVLink/NVSwitch, nodes ke beech InfiniBand ya RoCE; sabse slow link speed tay karta hai.</li>
        <li>Placement matter karta hai: NUMA, PCIe switch aur NIC affinity real performance par asar daalte hain.</li>
        <li>GPU racks 30–100+ kW tak jaate hain; power chain, breakers, UPS aur floor loading ko saath plan karo.</li>
        <li>High density ke liye rear-door ya direct liquid cooling chahiye; coolant quality, flow aur leak detection control mein rakho.</li>
        <li>Firmware, driver, fabric manager, CUDA aur frameworks ko version-match karo; golden image rakho.</li>
        <li>DCGM se monitor karo; ECC, XID, throttle aur NVLink errors ka trend dekho, aur yaad rakho utilisation efficiency nahi hai.</li>
        <li>Debug se pehle node isolate karo; har naye ya repair kiye GPU ka burn-in aur baseline karo.</li>
        <li>Actual implementation depends on project requirements, utility requirements, OEM design and data center architecture — hamesha vendor documentation se verify karo.</li>
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
        <li><TopicLink slug="cpu" variant="inline" /> — Host processor jo GPU ko feed karta hai.</li>
        <li><TopicLink slug="ram" variant="inline" /> — System memory aur data staging.</li>
        <li><TopicLink slug="server-basics" variant="inline" /> — Server component overview.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — Dense shared-chassis compute.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — Virtual machines aur GPU sharing concepts.</li>
        <li><TopicLink slug="gpu-cluster" variant="inline" /> — Cluster-level GPU design.</li>
        <li><TopicLink slug="ai-cooling" variant="inline" /> — AI infrastructure ki cooling.</li>
        <li><TopicLink slug="ai-networking" variant="inline" /> — AI clusters ka networking.</li>
      </ul>
    </>
  );
}
