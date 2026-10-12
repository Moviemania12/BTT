"use client";
import { S, Callout, ComparisonTable, Figure, CodeBlock, DiagramGuide } from "@/app/learn/it/servers/cpu/shared";
import TopicLink from "@/components/TopicLink";
import CpuInstructionCycle from "@/app/learn/it/servers/cpu/svg/CpuInstructionCycle";
import CpuPackageAnatomy from "@/app/learn/it/servers/cpu/svg/CpuPackageAnatomy";
import CpuTopologyNuma from "@/app/learn/it/servers/cpu/svg/CpuTopologyNuma";
import CpuTurboCurve from "@/app/learn/it/servers/cpu/svg/CpuTurboCurve";
import CacheHierarchy from "@/app/learn/it/servers/cpu/svg/CacheHierarchy";
import CpuVcpuScheduling from "@/app/learn/it/servers/cpu/svg/CpuVcpuScheduling";
import CpuSelectionFlow from "@/app/learn/it/servers/cpu/svg/CpuSelectionFlow";
import CpuThrottleFlow from "@/app/learn/it/servers/cpu/svg/CpuThrottleFlow";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      {/* Quick Summary */}
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — Server CPU 2 Minute Mein</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>CPU kya hai:</strong> Server ka compute engine. OS, hypervisor aur applications ki har instruction yahi chalata hai.</li>
          <li><strong>Hierarchy:</strong> Socket (physical chip) → Core (execution unit) → Thread (SMT se logical CPU). 2 × 32 core aur SMT wala 2-socket server OS ko 128 logical CPU dikhata hai.</li>
          <li><strong>Speed ke 3 hisse:</strong> Clock × IPC (har clock mein kitna kaam) × busy cores. Turbo clock ko is baat par badalta hai ki kitne core busy hain aur kitna power/thermal headroom bacha hai.</li>
          <li><strong>Cache:</strong> L1 → L2 → L3 → RAM. Har step neeche jaana bahut slow hota hai. Kai databases ke liye achha cache hit rate GHz se zyada matter karta hai.</li>
          <li><strong>Memory aur I/O:</strong> Har CPU ke apne memory channels aur PCIe lanes hote hain. RAM bandwidth aur NIC/NVMe/GPU lane budget CPU decide karta hai, chassis nahi.</li>
          <li><strong>NUMA:</strong> 2-socket server mein doosre socket ki RAM slow hoti hai. NUMA ka dhyan na rakho to performance chup-chaap girti hai.</li>
          <li><strong>Power:</strong> TDP cooling ka reference hai, maximum nahi. 40 server × 2 CPU × 350 W = sirf CPU se 28 kW — rack power aksar pehli limit banti hai.</li>
          <li><strong>Virtualisation:</strong> vCPU hardware thread ka ek scheduled hissa hai. Overcommit kaam ki cheez hai, par %RDY / steal par nazar rakhni padti hai.</li>
          <li><strong>Engineer ka kaam:</strong> Sahi SKU chunna, sahi BIOS profile lagana, temperature/frequency/MCE log dekhna, parts dhyan se badalna aur cluster mein CPU compatible rakhna.</li>
          <li><strong>Tier III / IV view:</strong> Tier rating site ki hoti hai, par CPU ki power density, thermal limit aur fault-domain placement decide karte hain ki design sach mein chalega ya nahi.</li>
        </ul>
      </div>

      {/* ══════════ 1. WHAT IS A CPU ══════════ */}
      <h2 id="what-is-a-cpu" style={S.h2}>What Is a CPU? — Instruction Cycle and Pipeline</h2>
      <p style={S.p}>CPU (Central Processing Unit) <TopicLink slug="server-basics" variant="inline" /> ka wo hissa hai jo asli mein "sochta" hai. Baaki sab — RAM, disk, network card — data store ya move karte hain. Process CPU karta hai.</p>
      <p style={S.p}>Aap jo bhi dekhte ho — web page khulna, database query, UPI payment — sab chhoti-chhoti instructions ki lambi list ban jaata hai. CPU ye instructions ek second mein arabon baar chalata hai.</p>
      <h3 style={S.h3}>Instruction cycle</h3>
      <p style={S.p}>Har instruction kuch stages se guzarti hai. Pehle <strong>fetch</strong>: CPU agli instruction cache ya memory se padhta hai. Phir <strong>decode</strong>: instruction ko chhote internal steps (micro-ops) mein todta hai.</p>
      <p style={S.p}>Phir <strong>execute</strong>: arithmetic, floating-point ya vector unit kaam karta hai. Data chahiye to <strong>memory</strong> stage load/store karta hai. Aakhir mein <strong>write-back</strong> result ko register mein save karta hai.</p>
      <h3 style={S.h3}>Pipeline — core dikhne se tez kyun hai</h3>
      <p style={S.p}>Agar core ek instruction ke paanchon stage poore hone ka intezaar karke hi agli shuru karta, to zyadatar hardware khali baitha rehta. Isliye CPU <strong>pipeline</strong> use karta hai: jab instruction 1 execute ho rahi hai, instruction 2 decode ho rahi hai aur instruction 3 fetch.</p>
      <p style={S.p}>Modern core aur aage jaate hain. Wo <strong>superscalar</strong> hain (ek clock mein kai instructions), <strong>out-of-order</strong> hain (jo instruction ready hai wo data ka intezaar kar rahi instruction se pehle chal sakti hai) aur <strong>branch predictor</strong> use karte hain (if-else ka rasta guess karke kaam chalate rehte hain).</p>
      <Figure caption="Fig 1 — Instruction cycle (upar) aur pipeline overlap (neeche). Simplified — real server cores mein deeper pipelines, kai execution units aur micro-op cache hote hain."><CpuInstructionCycle /></Figure>
      <DiagramGuide
        title="Fig 1 ko kaise padhein"
        steps={[
          "Upar wali row, left se right: ek instruction Fetch → Decode → Execute → Memory → Write-back se guzarti hai. Har rangeen box ek stage hai.",
          "Uske neeche grey strip do tricks batati hai jo pipeline ko bhara rakhti hain: branch predictor (agla rasta guess) aur out-of-order engine (jo ready ho wo pehle chalao).",
          "Neeche wala hissa timeline hai. Har column ek clock cycle hai. Har row alag instruction hai. F, D, E, M, W akshar stages hain.",
          "Cycle 3 (vertical slice) dekho: Instruction 1 Execute mein, Instruction 2 Decode mein aur Instruction 3 Fetch mein — teeno ek hi waqt par. Isko pipeline parallelism kehte hain.",
          "Kyun zaroori hai: har instruction end-to-end 5+ cycle leti hai, phir bhi core lagbhag ek instruction per cycle (ya zyada) nipta leta hai. Jab pipeline atak jaati hai — cache miss ya galat branch guess — to ye throughput kho jaata hai.",
        ]}
      />
      <Callout type="important" title="Stalls hi asli dushman hain">
        Tez CPU sirf high GHz number nahi hai. Agar pipeline baar-baar RAM ka data ya galat branch guess ke recovery ka intezaar karti rahe, to core "busy" dikhta hai par productive nahi hota. Isiliye cache size, memory speed aur software behaviour itne matter karte hain.
      </Callout>
      <p style={S.p}>Aage ke liye ek important idea: OS ko core par <strong>ek thread of instructions</strong> dikhta hai, par andar core kai instructions parallel chala raha hota hai. Isliye "ek time par ek instruction" modern CPU ki galat tasveer hai.</p>

      {/* ══════════ 2. PACKAGE INSIDE ══════════ */}
      <h2 id="cpu-package-inside" style={S.h2}>Inside a CPU Package: Cores, Cache, Memory Controller, PCIe</h2>
      <p style={S.p}>Server CPU haath mein lo to ek bada square dikhta hai, neeche gold contacts ya pins ke saath. Us package ke andar sirf "cores" nahi hote.</p>
      <p style={S.p}>Ek server CPU package mein aam taur par hote hain: apne L1/L2 cache wale <strong>cores</strong>, ek <strong>shared L3 cache</strong>, DIMM se baat karne wale <strong>memory controllers</strong>, NIC/NVMe/GPU se baat karne wala <strong>PCIe root complex</strong>, aur doosre socket se jodne wala <strong>interconnect</strong>.</p>
      <p style={S.p}>Ye isliye matter karta hai kyunki memory aur PCIe <strong>CPU se jude hote hain</strong>, purane systems ki tarah alag northbridge chip se nahi. Server mein 2 CPU hain to 2 set memory channels aur 2 set PCIe lanes hain.</p>
      <h3 style={S.h3}>Monolithic vs chiplet</h3>
      <p style={S.p}><strong>Monolithic</strong> design mein sab kuch ek bade silicon die par hota hai. Core-to-core communication fast aur uniform. Nuksan: bade die mein defect aane ka chance zyada, to yield girta hai aur cost badhti hai.</p>
      <p style={S.p}><strong>Chiplet</strong> design mein kai chhote core dies (aur ek I/O die) ek package mein jode jaate hain. Chhote dies ka yield achha hota hai, isliye vendor ek socket mein bahut zyada cores de paate hain. Trade-off: dies ke beech hop se latency thodi badh sakti hai, to cache aur NUMA behaviour thoda complex ho jaata hai.</p>
      <Figure caption="Fig 2 — Server CPU package ka conceptual layout: monolithic die vs chiplet design. Actual die count, cache size aur floor-plan vendor, generation aur SKU ke hisaab se alag hote hain."><CpuPackageAnatomy /></Figure>
      <DiagramGuide
        title="Fig 2 ko kaise padhein"
        steps={[
          "Left box (A) monolithic CPU hai. Neele cells cores hain (har ek ka private L1/L2). Amber block shared L3 hai. Neeche ke teen box memory controller, PCIe root complex aur socket interconnect hain.",
          "Dhyan do: sab kuch ek dashed neele outline ke andar hai — matlab ek hi die. Kisi bhi core se L3 ya memory tak ka rasta chhota aur lagbhag uniform hai.",
          "Right box (B) chiplet CPU hai. Upar ke chaar block core-complex dies hain, har ek ke apne cores aur L3 slice ke saath. Neeche ka orange block alag I/O die hai.",
          "Core dies aur I/O die ke beech dotted lines die-to-die links hain. Core die se har memory ya PCIe access is link se guzarta hai.",
          "Kya samajhna hai: dono approach mein logical parts same hain. Chiplet mein ek socket mein zyada cores aur better yield milta hai; monolithic mein simple, uniform latency. Engineer ko pata hona chahiye ki uska CPU kaunsa style hai, kyunki isse NUMA settings aur cache behaviour par asar padta hai.",
        ]}
      />
      <Callout type="important" title="DC engineer ko kyun farak padta hai">
        Server plan karte waqt <strong>CPU model decide karta hai</strong> ki kitne DIMM channel, kitni maximum RAM aur kitni PCIe lanes milengi. Sasta CPU chunne se NIC ya NVMe options chup-chaap cap ho sakte hain. Sirf server brochure nahi, CPU ka platform datasheet bhi padho.
      </Callout>

      {/* ══════════ 3. x86 vs ARM ══════════ */}
      <h2 id="x86-vs-arm" style={S.h2}>x86 vs ARM — Server CPU Architectures</h2>
      <p style={S.p}><strong>Instruction set architecture (ISA)</strong> CPU ki "bhasha" hai. Ek ISA ke liye compile hua software seedha doosre ISA par nahi chalta.</p>
      <p style={S.p}><strong>x86-64 (Intel aur AMD)</strong> dashkon se servers par chhaya hai. Lagbhag har enterprise application, hypervisor aur driver ise natively support karta hai. Zyadatar data centers mein ye safe default hai.</p>
      <p style={S.p}><strong>ARM</strong> alag ISA hai, simple instruction design ke saath. ARM server chips (AWS Graviton, Ampere, NVIDIA Grace aur aur) aksar high core count aur achhi performance per watt target karte hain. Hyperscale cloud providers inhe khoob use karte hain; enterprise adoption badh raha hai.</p>
      <ComparisonTable
        title="x86 vs ARM in Data Centers"
        headers={["Aspect", "x86-64 (Intel / AMD)", "ARM-based server"]}
        rows={[
          ["Software ecosystem", "Sabse wide — lagbhag har enterprise product", "Badh raha hai — Linux/containers strong; kuch commercial software nahi hai ya ARM build chahiye"],
          ["Typical strength", "High per-core speed, rich features, wide OEM choice", "Core density aur performance per watt (workload par depend)"],
          ["Virtualisation", "Mature (VMware, Hyper-V, KVM)", "Zyadatar KVM-based/cloud; VMware/Hyper-V support product aur version par depend"],
          ["Migration effort", "Sabse kam — zyadatar existing images chalti hain", "ARM64 images/binaries chahiye; har dependency test karo"],
          ["Kahan dikhta hai", "Enterprise, colocation, private cloud", "Hyperscale cloud, web/microservices, AI host CPUs mein badhta hua"],
        ]}
        caption="Sirf general picture. Compatibility aur performance exact product, version aur workload par depend karti hai — decide karne se pehle verify karo."
      />
      <Callout type="common-mistake" title="Container image mismatch">
        Team x86 laptop par container banati hai aur ARM node par deploy karti hai: "exec format error" aata hai. Multi-arch environment mein multi-architecture images banao aur node pools ko clearly label karo.
      </Callout>

      {/* ══════════ 4. SERVER vs CONSUMER ══════════ */}
      <h2 id="server-vs-consumer" style={S.h2}>Server CPU vs Consumer CPU</h2>
      <p style={S.p}>Desktop CPU aur server CPU ka ancestor same ho sakta hai, par dono alag zindagi jeene ke liye bane hain. Desktop CPU ek user ke liye din ke kuch ghante tez hona chahiye. Server CPU saalon tak high load par, kai users aur kai VMs ke saath chalna chahiye.</p>
      <ComparisonTable
        title="Server CPU vs Consumer CPU"
        headers={["Feature", "Server CPU (Xeon / EPYC class)", "Consumer CPU (Core / Ryzen class)"]}
        rows={[
          ["Multi-socket", "Supported (2S common; select platforms par 4S/8S)", "Sirf single socket"],
          ["Memory channels", "Kai (recent platforms par 8–12 per socket)", "Aam taur par 2"],
          ["Max RAM", "Recent platforms par per socket TB tak", "Kuch dher GB se ek-do sau GB"],
          ["ECC memory", "Supported — platform design ka hissa", "Limited / guaranteed nahi"],
          ["PCIe lanes", "Dozens se 128+ per socket", "Lagbhag 20–28"],
          ["RAS features", "Machine-check architecture, memory sparing/mirroring, poison handling", "Basic"],
          ["Core count", "Per socket tens se 100+ cores", "Kam cores"],
          ["Lifecycle", "Platform ki lambi availability aur validation", "Chhota consumer release cycle"],
          ["Manageability", "BMC, platform telemetry, remote tools ke saath kaam", "Limited"],
        ]}
        caption="Specific capabilities model, generation aur platform par depend karti hain. Hamesha vendor datasheet se verify karo."
      />
      <p style={S.p}>Server mein consumer CPU kyun lagayein? Kabhi-kabhi chhote edge ya lab setup mein hota hai. Data center production ke liye missing RAS, ECC aur memory capacity ki wajah se aksar ye ghate ka sauda hai.</p>

      {/* ══════════ 5. VENDORS ══════════ */}
      <h2 id="cpu-vendors-families" style={S.h2}>Server CPU Families and Vendors</h2>
      <p style={S.p}>Part numbers yaad karne ki zarurat nahi, par main families pehchanni chahiye aur ye ki har ek kis cheez ke liye jaani jaati hai. Product lines tezi se badalti hain — hamesha vendor ki current generation list dekho.</p>
      <ComparisonTable
        title="Common Server CPU Families (jaisa aam taur par jaana jaata hai — current generation verify karo)"
        headers={["Family", "Architecture", "Known for"]}
        rows={[
          ["Intel Xeon Scalable (kai generations)", "x86-64", "Wide ecosystem, built-in accelerators (jaise recent generations mein AMX, QAT, DSA), 1S–8S options; recent Xeon 6 line mein P-core aur E-core variants"],
          ["AMD EPYC (Zen-based, 9004/9005 class aur aur)", "x86-64, chiplet", "High core counts, per socket kai memory channels aur PCIe lanes, achhi per-socket performance"],
          ["Ampere Altra / AmpereOne", "ARM", "High core density, predictable per-core performance, cloud-native workloads"],
          ["AWS Graviton", "ARM (Neoverse-based)", "AWS ke andar milta hai — kiraye par lete ho, kharidte nahi"],
          ["NVIDIA Grace", "ARM (Neoverse-based)", "AI ke liye GPUs ke saath (Grace-Hopper / Grace-Blackwell); GPU tak high bandwidth link"],
        ]}
        caption="High-level overview. Model names, core counts aur features har generation mein badalte hain — vendor ki current documentation se verify karo."
      />
      <Callout type="best-practice" title="SKUs standardise karo">
        Production mein CPU models jitne kam, utna achha. 3 alag generation wale cluster ko EVC/baseline compatibility settings chahiye, firmware aur spares complicated ho jaate hain, aur performance unpredictable. Har workload class ke liye ek-do approved SKU chuno.
      </Callout>

      {/* ══════════ 6. TOPOLOGY ══════════ */}
      <h2 id="cpu-topology" style={S.h2}>CPU Topology: Socket → Core → Thread</h2>
      <p style={S.p}><strong>Socket:</strong> Motherboard par wo physical slot jisme ek CPU package lagta hai. 1S server mein ek, 2S mein do. Socket type (jaise LGA) CPU generation se exactly match hona chahiye.</p>
      <p style={S.p}><strong>Core:</strong> CPU ke andar ek independent execution engine. Har core apni instruction stream chala sakta hai.</p>
      <p style={S.p}><strong>Thread (logical processor):</strong> SMT/Hyper-Threading ke saath ek physical core OS ko do logical processors dikhata hai. Ye core ke execution resources share karte hain.</p>
      <p style={S.p}>Numbers multiply hote hain. Example: 32 cores per socket aur SMT on wala 2-socket server Linux ko 2 × 32 × 2 = <strong>128 logical CPUs</strong> dikhata hai. Par physical cores sirf 64 hain.</p>
      <CodeBlock lang="bash" label="Linux — apna CPU topology dekho">
{`lscpu                      # sockets, cores per socket, threads per core, NUMA nodes, cache sizes
lscpu -e                   # per-logical-CPU table: kaunsa core/socket/NUMA node
numactl --hardware         # NUMA nodes, har node ki memory aur distances
cat /proc/cpuinfo | grep "model name" | sort -u`}
      </CodeBlock>
      <Figure caption="Fig 3 — CPU topology (illustrative): socket → core → thread, shared L3, har NUMA node ki local RAM ke saath memory controllers, aur CPU-to-CPU interconnect."><CpuTopologyNuma /></Figure>
      <DiagramGuide
        title="Fig 3 ko kaise padhein"
        steps={[
          "Do bade box dhundo: Socket 0 aur Socket 1. Har ek motherboard ke ek socket mein laga ek physical CPU hai.",
          "Har socket ke andar chhote blocks cores hain. SMT on hone ki wajah se har core mein do threads (logical CPUs) dikhte hain, saath mein core ka private L1/L2 cache.",
          "Har socket mein cores ke neeche wali chaudi bar shared L3 cache hai. Us socket ka koi bhi core ise use kar sakta hai, isliye ek application ke threads ko behtar hai ek hi socket par rakho.",
          "Har socket se ek memory controller neeche apni RAM tak jaata hai. Socket 0 + uski RAM = NUMA node 0; Socket 1 + uski RAM = NUMA node 1.",
          "Dono sockets ke beech ki line CPU-to-CPU interconnect hai (Intel UPI / AMD Infinity Fabric class link). Core apni RAM padhe to chhota, fast rasta. Doosre socket ki RAM padhe to is link se guzarna padta hai — slow aur sabke saath shared.",
          "Yaad rakhne wali baat: 'local = fast, remote = slow'. NUMA section isi tasveer par bana hai.",
        ]}
      />
      <Callout type="interview" title="Quick check">
        Q: 2S server mein har CPU par 48 cores hain aur SMT enabled hai. OS ko kitne logical processors dikhenge? A: 2 × 48 × 2 = 192. Aur physical cores 96 hain — per-core software licence ka hisaab logical count se mat lagao.
      </Callout>

      {/* ══════════ 7. CLOCK / TURBO ══════════ */}
      <h2 id="clock-turbo" style={S.h2}>Clock Speed, Turbo and Power States</h2>
      <p style={S.p}>Log CPU ko GHz se compare karte hain. Ye tasveer ka sirf ek-tihai hissa hai. Delivered performance lagbhag hai: <strong>clock × IPC × busy cores</strong>. IPC matlab instructions per clock — core har tick mein kitna kaam nipta leta hai, aur ye har nayi generation mein behtar hota hai.</p>
      <p style={S.p}>To naya 2.5 GHz CPU purane 3.0 GHz CPU ko haraa sakta hai. Aur 2.4 GHz par 64-core CPU, 3.8 GHz par 16-core CPU ko parallel kaam mein haraa sakta hai, par single-threaded job mein haar bhi sakta hai.</p>
      <h3 style={S.h3}>Base, turbo aur all-core turbo</h3>
      <p style={S.p}><strong>Base frequency</strong> wo speed hai jo vendor rated power par sab cores busy hone par guarantee karta hai. <strong>Turbo</strong> kuch cores ko tab tez chalne deta hai jab spare power aur thermal room ho. Jitne zyada core busy, har core ko utna kam turbo milta hai, kyunki power budget baatna padta hai.</p>
      <p style={S.p}>Capacity planning ke liye brochure ka maximum single-core turbo nahi, <strong>all-core turbo</strong> (sustained heavy load) number use karo.</p>
      <Figure caption="Fig 4 — Illustrative turbo curve: jaise-jaise zyada cores active hote hain, frequency girti hai. Real values SKU, BIOS profile, power limit aur cooling par depend karti hain."><CpuTurboCurve /></Figure>
      <DiagramGuide
        title="Fig 4 ko kaise padhein"
        steps={[
          "Horizontal axis: kitne cores busy hain, left mein 1 core se right mein sab cores tak. Vertical axis: frequency.",
          "Neeli line left mein upar se shuru hoti hai: sirf ek-do core busy hon to CPU ke paas bahut power aur thermal headroom hai, isliye wo cores maximum turbo par chal sakte hain.",
          "Right ki taraf jaate hue zyada cores jaagte hain aur wahi power budget baantna padta hai. Line neeche utarti hai — medium-load turbo.",
          "Sabse right par, jab har core busy hai, line all-core turbo ke aas-paas tikti hai, jo abhi bhi green dashed base-frequency line se upar hai.",
          "Green dashed line base frequency hai — rated power par guaranteed floor. Agar load mein aapka server is line se neeche chal raha hai, to kuch galat hai (thermal throttle, power cap ya BIOS setting).",
          "Seekh: single-thread benchmark bahut achha dikhega; poora loaded node nahi. Planning right-hand end se karo.",
        ]}
      />
      <h3 style={S.h3}>Power states: P-states aur C-states</h3>
      <p style={S.p}><strong>P-states</strong> performance states hain: alag frequency/voltage jodiyan jinke beech CPU move karta hai. <strong>C-states</strong> idle states hain: deeper C-state core ka zyada hissa band karta hai aur power bachata hai, par wake-up mein zyada time lagta hai.</p>
      <p style={S.p}>Zyadatar servers ke liye BIOS ka "balanced / OS-controlled" profile theek hai. Ultra-low-latency workloads (trading, telecom) mein engineers kabhi deep C-states limit karke performance profile lagate hain — power zyada lagti hai par wake-up jitter hat jaata hai. Ye soch-samajhkar liya, document kiya hua decision hona chahiye.</p>
      <CodeBlock lang="bash" label="Linux — real frequency aur power state dekho">
{`cpupower frequency-info              # driver, governor, min/max frequency
sudo turbostat --quiet --interval 5  # per-core MHz, C-state residency, package power, temperature
grep MHz /proc/cpuinfo | sort -u | head`}
      </CodeBlock>

      {/* ══════════ 8. SMT ══════════ */}
      <h2 id="smt" style={S.h2}>SMT / Hyper-Threading in Depth</h2>
      <p style={S.p}>SMT ke saath core do thread contexts rakhta hai. Jab ek thread memory ke liye ruk jaata hai, doosra thread khali execution units use kar leta hai. Isse core ka utilisation badhta hai — performance <strong>double nahi</strong> hoti.</p>
      <p style={S.p}>Typical gain workload par depend karta hai: web servers, kai VMs aur memory-bound code mein achha; tight compute-heavy loops mein kam, jo pehle hi saare execution units use kar rahe hain. Koi fixed percentage mat batao.</p>
      <ComparisonTable
        title="SMT: Kab On Rakhein, Kab Sochein"
        headers={["Situation", "Suggested approach", "Reason"]}
        rows={[
          ["General virtualisation / web / app servers", "SMT on rakho", "Zyada schedulable threads, behtar utilisation"],
          ["Per-core licensed software (DB, ERP)", "Pehle licence terms dekho", "Kuch vendors cores gintay hain, kuch threads — licence audit mehnga pad sakta hai"],
          ["Ultra-low-latency / HPC tight loops", "Dono test karo; aksar off ya pinned", "Sibling thread jitter ya cache contention kar sakta hai"],
          ["Multi-tenant (ek host par alag customers)", "Security policy follow karo", "Side-channel attacks SMT siblings use kar chuke hain; kuch environments SMT disable karte hain ya core scheduling lagate hain"],
        ]}
        caption="Apne workload par test karke aur organisation ki security policy follow karke decide karo."
      />

      {/* ══════════ 9. CACHE ══════════ */}
      <h2 id="cache-hierarchy" style={S.h2}>Cache Hierarchy</h2>
      <p style={S.p}>CPU core ke muqable RAM slow hai. Agar core ko har instruction par RAM ka intezaar karna padta, to wo zyadatar khali rehta. Isliye CPU recently use hua data <strong>package ke andar</strong> chhoti, bahut fast memory mein rakhta hai — cache.</p>
      <p style={S.p}>Isse chef ki kitchen samjho. L1 aapke saamne ka cutting board hai. L2 peeche ki shelf. L3 poori kitchen ka shared fridge. RAM corridor ke neeche ka store room. Storage doosre shehar ka warehouse.</p>
      <Figure caption="Fig 5 — L1 cache (sabse fast, sabse chhota) se storage (sabse slow, sabse bada) tak memory hierarchy. Har step neeche latency badhti hai aur capacity badhti hai."><CacheHierarchy /></Figure>
      <DiagramGuide
        title="Fig 5 ko kaise padhein"
        steps={[
          "Pyramid ko upar se neeche padho. Upar (L1) patla = chhoti capacity par sabse fast. Neeche (storage) chauda = bahut badi capacity par sabse slow.",
          "L1 aur L2 har core ke andar hain. L3 socket ke sab cores share karte hain. RAM aur storage CPU package ke bahar hain.",
          "Left ke arrows (upar FASTER / SMALLER, neeche SLOWER / LARGER) hi poora sabak hain: bada aur fast ek saath nahi mil sakta, isliye hardware layers banata hai.",
          "Data chahiye to CPU pehle L1 dekhta hai, phir L2, L3, phir RAM. Jaldi mil jaye to 'hit'; ek level neeche jaana 'miss'.",
          "Real-life asar: jis database ka hot data L3 mein fit ho wo udta hai. Wahi database jiska working set RAM (ya disk) mein chhalak jaye, CPU sirf 30% busy hote hue bhi bahut slow ho jaata hai.",
        ]}
      />
      <ComparisonTable
        title="Order-of-Magnitude Access Times (illustrative)"
        headers={["Level", "Typical scale", "Analogy (agar L1 = 1 second)"]}
        rows={[
          ["L1 cache", "~1 ns (kuch cycles)", "1 second"],
          ["L2 cache", "~3–5 ns", "~4 seconds"],
          ["L3 cache", "~10–40 ns (design par depend)", "~20 seconds"],
          ["Local RAM", "~80–120 ns", "~2 minutes"],
          ["Remote NUMA RAM", "~130–250 ns", "~3–4 minutes"],
          ["NVMe SSD", "~10–100 µs", "~3 ghante se ek din"],
          ["Network / SAN storage", "~100 µs se ms", "din"],
        ]}
        caption="Sirf ballpark figures. Exact latency CPU architecture, clock, memory type aur load par depend karti hai. Real numbers ke liye vendor documentation dekho."
      />
      <p style={S.p}>Cache aur RAM ke beech data <strong>cache lines</strong> naam ke blocks mein chalta hai (aam taur par 64 bytes). Aapka code ek byte padhe to CPU 64 laata hai. Jo software memory ko order mein padhta hai (arrays) wo cache friendly hai; jo random kudta hai (pointer chasing) wo nahi.</p>
      <p style={S.p}>Do aur terms: <strong>inclusive vs non-inclusive/victim L3</strong> (L3 L1/L2 data ki copy rakhta hai ya sirf nikaali gayi lines) aur <strong>cache coherency</strong> (hardware har core ka memory view consistent rakhta hai). Sockets ke beech coherency traffic cross-socket sharing mehngi hone ki ek wajah hai.</p>
      <Callout type="important" title="Bade L3 ya '3D V-Cache' SKUs kyun bante hain">
        Kuch workloads — EDA, bade databases, simulations — cache misses se limited hote hain. Zyada L3 wala SKU, kam L3 wale high-clock SKU ko haraa sakta hai. Isliye GHz se nahi, apne workload se benchmark karo.
      </Callout>

      {/* ══════════ 10. MEMORY CHANNELS ══════════ */}
      <h2 id="memory-channels" style={S.h2}>Memory Channels and Bandwidth</h2>
      <p style={S.p}>CPU ke andar ka memory controller DIMMs se <strong>channels</strong> ke zariye baat karta hai. Har channel ek independent data path hai. Channels parallel chalte hain, isliye jitne channels populate karoge bandwidth utni multiply hogi.</p>
      <p style={S.p}>Quick bandwidth formula: <strong>transfer rate (MT/s) × 8 bytes per transfer × channels</strong>. Real-world bandwidth theoretical peak se kam hoti hai.</p>
      <ComparisonTable
        title="Theoretical Peak Memory Bandwidth (per socket)"
        headers={["Memory type", "Per channel", "8 channels", "12 channels"]}
        rows={[
          ["DDR4-3200", "25.6 GB/s", "204.8 GB/s", "—"],
          ["DDR5-4800", "38.4 GB/s", "307.2 GB/s", "460.8 GB/s"],
          ["DDR5-5600", "44.8 GB/s", "358.4 GB/s", "537.6 GB/s"],
        ]}
        caption="Peak = MT/s × 8 bytes × channels. Real throughput kam hota hai. Supported speeds CPU, DIMMs per channel aur platform par depend karti hain — OEM ka memory population guide dekho."
      />
      <h3 style={S.h3}>Population rules jo engineer ko follow karne hain</h3>
      <p style={S.p}><strong>Saare channels</strong> use karo, har channel mein <strong>identical DIMMs</strong> (same size, speed, rank), OEM manual ke batae slots mein. Aadhe bhare channels = aadhi bandwidth.</p>
      <p style={S.p}>Har channel mein 2 DIMMs (2DPC) aam taur par zyada capacity deta hai par supported memory speed kam kar sakta hai. Mixed DIMM sizes slow speed ya unbalanced interleave la sakte hain. Hamesha platform ka population chart follow karo.</p>
      <Callout type="common-mistake" title="'512 GB hai, phir bhi slow kyun?'">
        2-socket server mein 2 × 8 = 16 memory channels hote hain, par sirf 8 bade DIMMs lage the — matlab aadhe channels khali. Capacity theek dikhi, par bandwidth-heavy workloads lagbhag aadhi possible speed par chale. Capacity aur channel count alag cheezein hain. DIMM layouts ke liye <TopicLink slug="ram" variant="inline" /> dekho.
      </Callout>

      {/* ══════════ 11. PCIe ══════════ */}
      <h2 id="pcie-lanes" style={S.h2}>PCIe Lanes — The I/O Budget</h2>
      <p style={S.p}>NICs, NVMe SSDs, GPUs, RAID/HBA cards aur DPUs sab <strong>PCIe lanes</strong> se jude hote hain. Ye lanes CPU se nikalti hain (kuch platforms par thodi chipset se). Total number CPU model decide karta hai.</p>
      <p style={S.p}>Har lane har direction mein data le jaati hai. Per lane per direction approximate usable speed: Gen3 ≈ 0.98 GB/s, Gen4 ≈ 1.97 GB/s, Gen5 ≈ 3.94 GB/s. x16 slot matlab 16 lanes, to Gen5 x16 slot lagbhag 63 GB/s har taraf.</p>
      <ComparisonTable
        title="Example Lane Budget — ek socket, 128 PCIe Gen5 lanes (illustrative)"
        headers={["Device", "Lanes each", "Count", "Lanes used"]}
        rows={[
          ["400G NIC (x16)", "16", "1", "16"],
          ["GPU / accelerator (x16)", "16", "4", "64"],
          ["NVMe SSD (x4)", "4", "6", "24"],
          ["Boot / management / other", "—", "—", "8"],
          ["Total", "", "", "128 mein se 112 — 16 lanes spare"],
        ]}
        caption="Sirf example. Actual lane count, bifurcation options aur slot wiring CPU aur motherboard define karte hain — server ka PCIe riser map zaroor dekho."
      />
      <p style={S.p}>2S server mein slot <strong>ek socket</strong> ka hota hai. Agar NIC socket 1 se wired hai aur aapka application socket 0 par chal raha hai, to har packet ka data interconnect se guzarta hai. Ise <strong>PCIe NUMA locality</strong> kehte hain. Tez NICs aur GPUs ke liye workload ko wahi socket do jo device ka malik hai.</p>
      <CodeBlock lang="bash" label="Linux — ye device kis NUMA node ka hai?">
{`cat /sys/class/net/eth0/device/numa_node     # NIC ka NUMA node (-1 = unknown/single)
lspci -vv -s <bus:dev.fn> | grep -E "LnkCap|LnkSta"   # negotiated link speed aur width
lstopo --no-io   # (hwloc) topology view`}
      </CodeBlock>
      <Callout type="warning" title="Negotiated link aksar expected se kam hota hai">
        Gen4 slot mein Gen5 x16 card, ya kharab riser/gande contacts ki wajah se x8 par chalta x16 card, chup-chaap bandwidth aadhi kar deta hai. Commissioning ke waqt <em>LnkSta</em> zaroor padho.
      </Callout>

      {/* ══════════ 12. NUMA ══════════ */}
      <h2 id="numa" style={S.h2}>NUMA — Non-Uniform Memory Access</h2>
      <p style={S.p}>2-socket server mein dono CPUs poori RAM tak pahunch sakte hain. Par har DIMM <strong>ek</strong> CPU ke memory controller se wired hai. Apne socket ke DIMMs ka access local aur fast. Doosre socket ke DIMMs ka access interconnect se hokar jaata hai aur slow.</p>
      <p style={S.p}>Har socket + uski attached RAM (aur PCIe devices) ek <strong>NUMA node</strong> banate hain. Linux nodes ke beech "distance" batata hai; bada number = slow access (jaise kai Intel systems par local ke liye 10, remote ke liye 21).</p>
      <p style={S.p}>NUMA chhupa hua isliye hai kyunki kuch toot-ta nahi. Galat node use karne wala VM ya database kuch cases mein 20–40% slow chal sakta hai, bina kisi alarm ke. Bahut saare "mystery slowness" tickets NUMA ke hote hain.</p>
      <CodeBlock lang="bash" label="Linux — NUMA measure aur control karo">
{`numactl --hardware             # nodes, per node memory, distances
numastat                       # numa_hit / numa_miss / other_node counters
numastat -p <pid>              # ek process ki memory per node
numactl --cpunodebind=0 --membind=0 ./app    # app ko node 0 par node-0 memory ke saath chalao
lscpu | grep -i numa`}
      </CodeBlock>
      <h3 style={S.h3}>Ek socket ke andar sub-NUMA modes</h3>
      <p style={S.p}>Bade chiplet ya multi-tile CPUs khud bhi kai NUMA domains ki tarah behave kar sakte hain. Intel par <strong>Sub-NUMA Clustering (SNC)</strong> ya AMD par <strong>NPS (NUMA nodes per socket)</strong> jaise BIOS options ek socket ko 2 ya 4 nodes mein baant dete hain. Isse well-pinned software ki memory latency kam hoti hai, par NUMA-aware placement chahiye.</p>
      <p style={S.p}>General virtualisation clusters ke liye default aksar best hai. Ye tabhi badlo jab workload test kar liya ho aur setting ko build standard mein document kar diya ho.</p>
      <Callout type="best-practice" title="NUMA rules of thumb">
        VM fit ho to uske vCPUs aur memory ek NUMA node ke andar rakho. Bade VMs ko node ke multiples mein size karo. NIC/GPU-heavy apps ko wahi socket do jo device ka hai. Changes ke baad <em>numastat</em> check karo — assume mat karo.
      </Callout>

      {/* ══════════ 13. RAS ══════════ */}
      <h2 id="ras-reliability" style={S.h2}>RAS and Hardware Error Handling</h2>
      <p style={S.p}>RAS matlab <strong>Reliability, Availability, Serviceability</strong>. Yahi server CPU platform ko desktop se alag karta hai. Hardware errors ko outage banne se pehle detect, correct aur report kar sakta hai.</p>
      <h3 style={S.h3}>Error kaise handle hota hai</h3>
      <p style={S.p}>CPU aur memory ECC codes use karte hain. <strong>Correctable error (CE)</strong> turant theek ho jaata hai aur log hota hai. <strong>Uncorrectable error (UCE)</strong> theek nahi ho sakta. Agar wo use mein aa rahe data par lage to hardware <strong>Machine Check Exception (MCE)</strong> uthata hai; OS affected process ko maar sakta hai, ya kernel ki apni memory affected ho to panic ya reboot.</p>
      <p style={S.p}>Sab kuch <strong>Machine Check Architecture</strong> record karta hai aur OS aur BMC logs mein dikhta hai. CEs ko trend karo: jis DIMM mein correctable errors badh rahe hon, use UCE se pehle badalne ka warning samjho.</p>
      <ComparisonTable
        title="Common RAS Features (platform dependent)"
        headers={["Feature", "Kya karta hai", "Kyun useful"]}
        rows={[
          ["ECC / advanced ECC", "Memory ke bit errors theek karta hai", "Silent data corruption se bachav"],
          ["Patrol scrub / demand scrub", "Background mein memory padhkar errors jaldi theek karta hai", "Single-bit error ko double-bit error banne se rokta hai"],
          ["Memory sparing / mirroring", "Memory ranks reserve ya duplicate karta hai", "Capacity ke badle mein failing DIMM survive karta hai"],
          ["Page offlining / poison handling", "Crash ke bajay bad pages ko retire karta hai", "Zyada uptime"],
          ["Machine Check Architecture (MCA)", "Hardware errors source aur type ke saath log karta hai", "Exact failing part pehchan sakte ho"],
          ["PCIe AER", "Link/device errors report karta hai", "Kharab riser, cable ya card dhoondhta hai"],
        ]}
        caption="Har feature ki availability CPU, firmware aur OS par depend karti hai. OEM se verify karo."
      />
      <CodeBlock lang="bash" label="Linux — hardware error history padho">
{`sudo ras-mc-ctl --summary        # rasdaemon: har DIMM / CPU ke error counts
sudo ras-mc-ctl --errors         # detailed error list
journalctl -k | grep -iE "mce|machine check|edac|hardware error"
ipmitool sel elist | tail -30    # BMC event log (server-basics article dekho)`}
      </CodeBlock>
      <Callout type="maintenance" title="Policy: sirf failure par nahi, trend par action lo">
        Monitoring mein threshold tay karo: jaise ek hi DIMM se kuch time mein baar-baar correctable errors aayein to replacement ticket khule. Exact policy OEM ki guidance ke hisaab se honi chahiye.
      </Callout>

      {/* ══════════ 14. TDP ══════════ */}
      <h2 id="tdp-power" style={S.h2}>TDP and Power Planning</h2>
      <p style={S.p}><strong>TDP (Thermal Design Power)</strong> watts mein wo heat figure hai jiske liye cooling solution design hona chahiye (defined workload par). Ye ek <strong>design reference</strong> hai, maximum power ki guarantee nahi. Vendor ki power-limit settings ke hisaab se real CPUs TDP se zyada power chhote ya kabhi-kabhi sustained time ke liye kheench sakte hain.</p>
      <p style={S.p}>Intel <strong>PL1</strong> (sustained) aur <strong>PL2</strong> (short burst) jaise limits batata hai; AMD PPT/TDP settings use karta hai; dono configurable TDP (cTDP) dete hain taaki power-constrained racks mein performance ke badle power bacha sako.</p>
      <h3 style={S.h3}>Worked example: CPUs aapke rack kW kaise decide karte hain</h3>
      <CodeBlock lang="text">
{`Rack: 40 × 1U 2-socket servers
CPU TDP: 350 W per CPU  →  2 CPUs = 700 W per server (sirf CPUs)
Sirf CPUs: 40 × 700 W = 28,000 W = 28 kW

RAM, drives, NICs, fans, PSU losses jodo (maan lo +40%) → ~39 kW
15–20 kW ke liye provision kiya rack ise nahi sambhal sakta.
Real-world options: rack mein kam servers, kam-TDP SKU,
cTDP / power capping, ya liquid-assisted cooling.`}
      </CodeBlock>
      <p style={S.p}>Upar ke values sirf illustrative hain; real plan ke liye BMC ya rack <TopicLink slug="pdu" variant="inline" /> ki measured power use karo. High-TDP CPUs cooling par bhi dabav daalte hain: <TopicLink slug="airflow-management" variant="inline" /> aur <TopicLink slug="containment" variant="inline" /> dekho.</p>
      <Callout type="important" title="Power capping tool hai, jaadu nahi">
        BMC/BIOS mein power cap lagane se rack breaker trip hone se bachta hai, par load mein CPU ko frequency kam karni padti hai. Document karo; warna agla engineer "slow CPU" dekhkar galat problem ke peeche bhagega.
      </Callout>

      {/* ══════════ 15. SECURITY ══════════ */}
      <h2 id="security-features" style={S.h2}>CPU Security Features and Microcode</h2>
      <p style={S.p}>CPU sirf hardware nahi hai — wo <strong>microcode</strong> bhi chalata hai, chhota firmware jo bugs theek karta hai aur security mitigations lagata hai. Updates BIOS/UEFI update ya OS ke zariye aate hain. Microcode current rakhna patching ka hissa hai.</p>
      <p style={S.p}>2018 ke baad <strong>Spectre</strong> aur <strong>Meltdown</strong> jaisi vulnerabilities ne dikhaya ki speculative execution processes ya VMs ke beech data leak kar sakta hai. OS kernels aur microcode mein ab mitigations hain; kuch workload aur CPU generation ke hisaab se thodi performance cost lete hain.</p>
      <ComparisonTable
        title="Security-Related CPU Capabilities (vendor naming alag hota hai)"
        headers={["Capability", "Purpose"]}
        rows={[
          ["Speculative-execution mitigations (microcode + OS)", "Processes/VMs ke beech side-channel data leaks kam karte hain"],
          ["Secure boot / hardware root of trust", "Sirf signed firmware aur bootloaders chalte hain"],
          ["Memory encryption (jaise AMD SME/SEV, Intel TME/TDX)", "RAM contents ko protect karta hai aur confidential VMs ko host se isolate kar sakta hai"],
          ["Trusted execution (jaise Intel SGX)", "Chune hue code/data ko enclave mein protect karta hai"],
          ["NX / execute-disable, SMEP/SMAP", "Exploitation mushkil banate hain"],
        ]}
        caption="Feature names aur availability vendor aur generation ke hisaab se alag hote hain. Exact model verify karo."
      />
      <CodeBlock lang="bash" label="Linux — mitigation status aur microcode version">
{`lscpu | grep -i vulnerab
grep . /sys/devices/system/cpu/vulnerabilities/*
grep -m1 microcode /proc/cpuinfo`}
      </CodeBlock>
      <p style={S.p}>Operational rule: BIOS/microcode updates ko baaki firmware ki tarah controlled process se lagao (firmware practice ke liye <TopicLink slug="server-basics" variant="inline" /> dekho). Pehle ek host par test, phir cluster mein batches mein.</p>

      {/* ══════════ 16. VIRT EXT ══════════ */}
      <h2 id="virtualisation-ext" style={S.h2}>Hardware Virtualisation Extensions</h2>
      <p style={S.p}><strong>Intel VT-x / AMD-V:</strong> CPU modes jo hypervisor ko guest operating systems safely aur efficiently chalane dete hain. Inke bina virtualisation ko slow software tricks chahiye hote. Modern hypervisors (ESXi, Hyper-V, KVM) inhe require karte hain. Kuch systems par BIOS/UEFI mein enable karna padta hai.</p>
      <p style={S.p}><strong>EPT / NPT (AMD RVI):</strong> Guest addresses ko physical addresses mein translate karne ka hardware support. Memory-heavy VMs par hypervisor overhead bahut kam kar deta hai.</p>
      <p style={S.p}><strong>VT-d / AMD-Vi (IOMMU):</strong> Hypervisor ko physical device (NIC, GPU) ek VM ko safely assign karne deta hai aur rogue DMA se memory bachata hai. PCIe passthrough aur SR-IOV ke liye zaroori.</p>
      <p style={S.p}><strong>SR-IOV:</strong> NIC kai virtual functions dikhata hai, har ek VM ko assign ho sakta hai, software switching ko lagbhag bypass karte hue. Telecom aur low-latency setups mein common.</p>
      <Callout type="common-mistake" title="'Hypervisor start nahi hota / 64-bit VM fail'">
        Lagbhag hamesha reset ya firmware update ke baad BIOS mein virtualisation option (VT-x/SVM) ya IOMMU disabled ho jaata hai. Pehle BIOS profile dekho, phir OS/hypervisor logs.
      </Callout>

      {/* ══════════ 17. CPU IN VIRT ══════════ */}
      <h2 id="cpu-in-virtualisation" style={S.h2}>CPU in Virtualisation</h2>
      <p style={S.p}><TopicLink slug="virtualization" variant="inline" /> mein VM ke paas physical core nahi hota. Use <strong>vCPUs</strong> milte hain. Har vCPU ek thread of execution hai jise hypervisor scheduler thode time slice ke liye real hardware thread par rakhta hai.</p>
      <Figure caption="Fig 6 — Hypervisor paanch VMs ke 32 vCPUs ko 16 physical cores par schedule kar raha hai (2:1 overcommit). Conceptual diagram."><CpuVcpuScheduling /></Figure>
      <DiagramGuide
        title="Fig 6 ko kaise padhein"
        steps={[
          "Left column: paanch VMs apne vCPU counts ke saath (4 + 8 + 4 + 8 + 8 = kul 32 vCPUs).",
          "Grey arrows dikhate hain ki ye saare vCPUs ek hi jagah ja rahe hain — beech ke box mein hypervisor scheduler.",
          "Scheduler ka kaam: har kuch milliseconds mein tay karna ki kaunsa vCPU kaunse physical core par chalega. Wo VM ke vCPUs ko ek socket ke andar rakhne ki koshish bhi karta hai (NUMA-aware placement).",
          "Right mein 16 physical cores hain. Kisi bhi pal sirf 16 vCPUs chal sakte hain, kyunki cores sirf 16 hain (SMT threads alag).",
          "Orange READY QUEUE key idea hai. Jo vCPU chalne ke liye ready hai par free core nahi milta wo yahan intezaar karta hai. Is wait time ko %RDY (VMware) ya steal time (KVM/Linux) kehte hain.",
          "Neeche ka banner hisaab karta hai: 32 ÷ 16 = 2:1 overcommit. Tab tak theek hai jab VMs shayad hi ek saath peak par jaayein; agar sab busy ho gaye to queue lambi hogi aur har VM slow ho jaayega.",
        ]}
      />
      <h3 style={S.h3}>Overcommit — kaam ka par khatarnak</h3>
      <p style={S.p}>Zyadatar VMs zyadatar waqt idle rehte hain, isliye light workloads ke liye cores se 2–4× zyada vCPUs host karna common hai. Latency-critical ya database VMs ke liye kai teams ratio 1:1 ke aas-paas rakhti hain. Koi universal safe ratio nahi hai — monitoring data se decide karo.</p>
      <p style={S.p}><strong>Wide VM trap:</strong> Bahut vCPUs wale VM ke saare vCPUs ek saath ke aas-paas schedule hone chahiye. Chhote app ko "safe side ke liye" 16 vCPUs dene se wo aksar <em>slow</em> ho jaata hai, kyunki scheduler ko 16 free cores dhoondhne mein dikkat hoti hai aur doosre VMs par asar padta hai. Actual usage se right-size karo.</p>
      <h3 style={S.h3}>Wo metrics jo sach batate hain</h3>
      <ComparisonTable
        title="Kaunsa CPU Metric Maanein?"
        headers={["Metric", "Kahan", "Kya batata hai"]}
        rows={[
          ["%USED / guest CPU %", "VM ke andar / hypervisor", "VM ne kitna use kiya — ye nahi ki wo bhookha raha ya nahi"],
          ["%RDY (CPU ready)", "VMware esxtop / vCenter", "vCPUs ne core ke liye kitna wait kiya. Lagataar high = overcommit problem"],
          ["%CSTP (co-stop)", "VMware esxtop", "Multi-vCPU VM apne siblings ka wait kar raha hai — bahut zyada vCPUs ka sanket"],
          ["Steal time (%st)", "Linux guest, KVM", "Guest ko CPU chahiye tha par host ne doosron ko de diya"],
          ["Host CPU utilisation", "Hypervisor", "Physical host ki capacity"],
        ]}
        caption="Thresholds vendor aur workload ke hisaab se alag hote hain; baseline apne environment se banao."
      />
      <h3 style={S.h3}>vNUMA, pinning aur EVC</h3>
      <p style={S.p}><strong>vNUMA:</strong> Bade VMs ke liye hypervisor virtual NUMA layout dikhata hai taaki guest OS aur database memory sahi jagah rakh sakein. Aise VM mein CPU/RAM hot-add tab tak mat karo jab tak vNUMA par asar na samajh lo.</p>
      <p style={S.p}><strong>CPU pinning / reservations:</strong> vCPUs ko cores par pin kar sakte ho ya critical VMs ke liye CPU reserve kar sakte ho. Predictability badhti hai par flexibility kam hoti hai.</p>
      <p style={S.p}><strong>EVC / CPU compatibility mode:</strong> Alag CPU generations wale hosts ke beech live-migrate (vMotion, Hyper-V live migration) karne ke liye cluster naye instructions ko common baseline ke peeche chhupa deta hai. Keemat: naye features (jaise newer vector instructions) VMs ko tab tak nahi milte jab tak baseline upar na uthaya jaye.</p>

      {/* ══════════ 18. SELECTION ══════════ */}
      <h2 id="cpu-selection" style={S.h2}>Workload-Based CPU Selection</h2>
      <p style={S.p}>"Kaunsa CPU kharidein?" ka koi ek jawab nahi hota. Sahi tareeka: pata karo ki aapke workload ko kya limit karta hai, phir wo CPU chuno jo us limit ko acceptable power aur licence cost par hata de.</p>
      <Figure caption="Fig 7 — CPU selection flow: workload → bottleneck → constraints → power/cooling fit → pilot test aur standardisation."><CpuSelectionFlow /></Figure>
      <DiagramGuide
        title="Fig 7 ko kaise padhein"
        steps={[
          "Step 1 (sabse upar): real workload measure karo — utilisation, memory use, I/O, per-thread behaviour. Application ke naam se andaza mat lagao.",
          "Step 2: bottleneck dhundo. Teen raste nikalte hain — per-core speed (amber), throughput/density (blue) ya memory-bandwidth/I/O heavy (purple).",
          "Amber raasta: databases, ERP, jahan single-thread critical path lamba ho. High clock, kam cores aur bada cache chuno. Per-core licence cost kam karne ka ye sabse sasta tareeka bhi hai.",
          "Blue raasta: virtualisation hosts, web, containers. High core count chuno aur per core memory capacity check karo.",
          "Purple raasta: analytics, HPC, storage aur AI host nodes. Kai memory channels aur bahut PCIe lanes wala CPU chuno. Core count doosre number par.",
          "Teeno raaste Step 3 (constraints) par milte hain: software licence model, RAM size aur NIC/GPU lane needs. Jo SKU yahan fail ho wo reject, chahe kitna bhi tez ho.",
          "Step 4: TDP ko rack mein servers se multiply karke rack ke kW aur airflow se compare karo. Step 5: shortlisted SKU ko real workload se pilot test karo, phir standardise karo.",
        ]}
      />
      <ComparisonTable
        title="CPU Selection by Workload"
        headers={["Workload", "Prioritise", "Kyun"]}
        rows={[
          ["Web / API / microservices", "Core count, achhi efficiency", "Bahut saari chhoti parallel requests"],
          ["OLTP database", "Per-core speed, bada cache, per core enough RAM", "Chhote transactions, latency sensitive, aksar per-core licensed"],
          ["Analytics / OLAP / in-memory DB", "Zyada cores + memory channels + badi RAM", "Bade scans bandwidth ke bhookhe hote hain"],
          ["Virtualisation / private cloud", "Core count, RAM capacity, NUMA fit, EVC baseline", "Kai VMs; consolidation ratio cost decide karta hai"],
          ["HPC / simulation", "Vector units (AVX-512/AMX class), memory bandwidth, interconnect", "Floating-point aur bandwidth limited"],
          ["AI training/inference host", "PCIe lanes, memory bandwidth, CPU-GPU link", "GPU maths karta hai; CPU ko use feed karna hota hai — GPU article dekho"],
          ["Storage / NVMe-oF / software-defined storage", "PCIe lanes, NIC offloads, erasure coding ke liye kai cores", "I/O aur data-path heavy"],
          ["Edge / telecom", "Low power, long-life platforms, deterministic latency", "Space aur power constrained"],
        ]}
        caption="Sirf starting guidance. Final karne se pehle apne workload se benchmark karo."
      />
      <h3 style={S.h3}>1S ya 2S?</h3>
      <p style={S.p}>High-core-count 1S server aksar 2S ki jagah le leta hai: NUMA complexity nahi, kam parts, aur per-socket licensed software sasta. 2S memory channels, PCIe lanes aur RAM capacity double karta hai, jo kuch workloads ko chahiye. Cores, RAM aur lanes ke liye jitna kam socket count chalega, utna chuno.</p>
      <h3 style={S.h3}>Sizing example</h3>
      <CodeBlock lang="text">
{`Zarurat: 120 VMs host karna, average 4 vCPU each = 480 vCPU
Target overcommit: general workloads ke liye 3:1  → 160 physical cores chahiye
Upar se N+1 host-failure headroom, 6-host cluster mein:
   usable hosts = 5  →  per host kam se kam 32 cores (160 / 5)
Chuno: 2S × 24-core (48 cores) = comfortable
Check: RAM (120 VMs × 16 GB = 1.9 TB → 6 hosts × 512 GB min with headroom),
       2 × 25G NICs ke liye lanes, rack power (TDP section dekho).`}
      </CodeBlock>
      <p style={S.p}>Upar ke numbers sirf method samjhane ke liye hain. Per-core software licences bhi dekho — kuch cases mein kam par tez cores licence mein jitna bachate hain wo cost se zyada hota hai.</p>
      <Callout type="best-practice" title="Sirf GHz ya core count se mat kharido">
        Real application ke saath pilot chalao aur throughput, peak load par latency aur power draw compare karo. "Best" CPU wo hai jiski useful work ki per-unit cost sabse kam ho — licence, power aur rack space jodkar — wo nahi jiski spec sheet sabse badi ho.
      </Callout>

      {/* ══════════ 19. BIOS ══════════ */}
      <h2 id="bios-settings" style={S.h2}>Important BIOS / UEFI CPU Settings</h2>
      <p style={S.p}>Do identical servers, alag BIOS profiles ke saath, bahut alag perform kar sakte hain. BIOS settings ko build standard ka hissa maano, profile/template ki tarah store karo aur ek class ke har server par lagao.</p>
      <ComparisonTable
        title="Common CPU-Related BIOS Settings"
        headers={["Setting", "Kya control karta hai", "Typical guidance (workload/OEM ke hisaab se verify karo)"]}
        rows={[
          ["System profile / power profile", "Performance vs balanced vs power-saver", "General use ke liye balanced ya OS-controlled; latency-critical ke liye Performance; production apps ke liye Power-saver se bacho"],
          ["Intel VT-x / AMD SVM", "Hardware virtualisation", "Hypervisor hosts par enabled"],
          ["VT-d / AMD IOMMU", "Device passthrough aur DMA protection", "Passthrough/SR-IOV ya security policy ke liye enabled"],
          ["Hyper-Threading / SMT", "Per core logical threads", "Default on; security aur licence policy follow karo"],
          ["Turbo Boost / Core Performance Boost", "Base se upar frequency allow karo", "Zyadatar ke liye on; strict determinism ke liye hi off"],
          ["C-states / package C-states", "Deep idle", "Deep C-states sirf bahut low-latency apps ke liye limit karo"],
          ["SNC / NPS (NUMA per socket)", "Ek socket ko NUMA domains mein baantta hai", "Default rakho; test ke baad hi badlo"],
          ["Memory interleaving / NUMA node interleaving", "Memory kaise failti hai", "Aam taur par NUMA enabled rakho; node interleave off"],
          ["Power capping / cTDP", "CPU power limit kam karna", "Rack power constrained ho to use karo; document karo"],
          ["Secure Boot / TPM", "Firmware integrity", "Security policy ke hisaab se enable"],
        ]}
        caption="Names OEM (Dell, HPE, Lenovo, Supermicro) ke hisaab se alag hote hain. Hamesha OEM ka workload tuning guide follow karo."
      />
      <Callout type="danger" title="Board ya CPU replacement ke baad BIOS reset">
        Motherboard swap, CMOS clear ya BIOS reset ke baad server <strong>default / power-saver profile</strong> mein aa sakta hai, VT-x ya SMT galat state mein. Server boot hota hai, POST pass karta hai — aur phir slow chalta hai ya VMs start nahi hote. Hamesha standard BIOS profile dobara lagao aur known-good server se settings compare karo.
      </Callout>

      {/* ══════════ 20. INSTALLATION ══════════ */}
      <h2 id="installation-replacement" style={S.h2}>CPU Installation and Replacement</h2>
      <p style={S.p}>Zyadatar data centers mein CPU baar-baar nahi badla jaata — zyadatar CPU kaam factory mein ya planned upgrade mein hota hai. Par jab CPU fail ho ya socket service chahiye, procedure matter karta hai: ek bent contact ya galat torque bahut mehnge motherboard ko barbaad kar sakta hai.</p>
      <h3 style={S.h3}>Shuru karne se pehle</h3>
      <p style={S.p}>Change ticket aur OEM service guide lo. Confirm karo ki replacement CPU ka part number, stepping aur generation 2S server ke doosre CPU se match karta hai (mismatched CPUs aam taur par supported nahi). Check karo ki BIOS/BMC firmware naye CPU ko support karta hai. Workload drain ya migrate karo aur lock-out procedure follow karo.</p>
      <CodeBlock lang="text">
{`1. Gracefully shut down; workload evacuate/migrate karo
2. Saari power cords (dono PSUs) nikalo; standby LEDs bujhne tak ruko
3. ESD wrist strap chassis ground se lagao
4. Server ko rails par bahar kheencho; top cover aur air shroud hatao
5. Heatsink OEM ke batae sequence mein dheela karo (diagonal, thoda-thoda)
6. Heatsink seedha upar uthao; CPU lid se purana thermal paste saaf karo
7. OEM guide ke hisaab se socket retention lever(s) / carrier chhodo
8. Purane CPU ko sirf edges/carrier se pakadkar nikalo
9. Socket inspect karo: bent pins/contacts, dhool, damage — pins ko MAT chhuo
10. Naya CPU notches/triangle marker se align karke rakho; zor MAT lagao
11. Retention mechanism band karo; specified thermal interface material lagao
12. Heatsink lagao; screws specified order aur torque mein kaso
13. Shroud, cover lagao; power jodo; BIOS tak boot karo
14. Verify: CPU detected, microcode/firmware, memory training OK, koi MCE nahi`}
      </CodeBlock>
      <Callout type="danger" title="Pins motherboard socket par hote hain">
        Kai modern server platforms mein nazuk contact pins (LGA) CPU par nahi, <strong>socket</strong> mein hote hain. Ek touch ya CPU ka tedha girna pins mod sakta hai — DIMMs missing, PCIe lanes gayab ya no-POST. OEM carrier mein hi pakdo, CPU ko kabhi socket par ghasito mat.
      </Callout>
      <h3 style={S.h3}>Thermal paste aur heatsink — zyadatar galtiyan yahin hoti hain</h3>
      <p style={S.p}>Kam paste, purana sookha paste ya unevenly kasa heatsink — heat transfer kharab hota hai. CPU garam chalta hai aur throttle karta hai — server fail nahi hota, bas slow ho jaata hai. OEM-approved matra aur pattern use karo, aur screws ko specified value par specified order mein kaso.</p>
      <p style={S.p}>1U servers mein front aur rear CPU positions ke heatsinks alag ho sakte hain (fin height/airflow alag). Galat position par galat heatsink classic galti hai. Part number check karo.</p>
      <Callout type="warning" title="CPU 1 aur CPU 2 ki settings kabhi mix mat karo">
        2S server mein CPU 2 ko matching memory aur PCIe layout chahiye. Service ke baad DIMMs galat slots mein lagane se channels khali reh sakte hain ya speed kam ho sakti hai. Hatane se pehle photo lo/label lagao.
      </Callout>

      {/* ══════════ 21. TESTING ══════════ */}
      <h2 id="testing-commissioning" style={S.h2}>Testing and Commissioning</h2>
      <p style={S.p}>Naye ya serviced server ko tab tak production mein mat daalo jab tak ye prove na ho jaye ki CPU subsystem full load par chalta hai, thanda rehta hai aur koi hardware errors log nahi karta. Ye applications install hone se pehle karo.</p>
      <CodeBlock lang="bash" label="Commissioning checklist — Linux live image ya installed OS">
{`# 1. Identity aur topology
lscpu                                  # model, sockets, cores, threads, NUMA nodes, flags
dmidecode -t processor | less          # SKU, socket, max speed
numactl --hardware                     # har node ki memory balanced honi chahiye

# 2. Virtualisation flags (hypervisor hosts)
lscpu | grep -E "Virtualization|vmx|svm"

# 3. 30–60 minute stress, frequency aur temperature dekhte hue
stress-ng --cpu 0 --cpu-method matrixprod --timeout 3600s --metrics-brief &
sudo turbostat --quiet --interval 10
ipmitool sdr type temperature          # test ke dauran CPU/inlet temperatures

# 4. Test ke baad hardware errors check karo
sudo ras-mc-ctl --summary
journalctl -k | grep -iE "mce|hardware error|throttl"
ipmitool sel elist | tail`}
      </CodeBlock>
      <ComparisonTable
        title="Commissioning Acceptance Criteria (example — apne khud ke set karo)"
        headers={["Check", "Pass condition"]}
        rows={[
          ["CPU model / count / cores", "Purchase order aur sibling servers se match"],
          ["All-core load par frequency", "Expected all-core turbo/base par ya upar; koi unexplained drop nahi"],
          ["Stress mein temperature", "Stable aur actual inlet temperature par OEM limit ke andar margin ke saath"],
          ["MCE / EDAC / BMC log", "Koi uncorrectable error nahi; corrected-error counts badh nahi rahe"],
          ["NUMA balance", "Har node par barabar memory; PCIe devices expected nodes par"],
          ["Power draw", "Rack budget ke andar; baseline ki tarah record"],
          ["BIOS profile", "Approved template ke identical"],
        ]}
        caption="Results record karo — wahi future troubleshooting ka baseline banenge."
      />

      {/* ══════════ 22. MONITORING ══════════ */}
      <h2 id="monitoring-operations" style={S.h2}>Operations and Monitoring</h2>
      <p style={S.p}>Daily operations mein do duniyaon par nazar rakhte ho: <strong>OS view</strong> (utilisation, load, steal, NUMA) aur BMC ke zariye <strong>hardware view</strong> (temperature, power, MCE, throttling). Achhi monitoring dono ko jodti hai.</p>
      <ComparisonTable
        title="Kya Monitor Karein Aur Kyun"
        headers={["Metric", "Source", "Matlab / action"]}
        rows={[
          ["Per-core CPU utilisation", "OS agent", "Ek core 100% = single-thread bottleneck"],
          ["Run queue / load average", "OS", "Load lambe time tak logical CPUs se zyada = CPU saturation"],
          ["%RDY / steal / co-stop", "Hypervisor / guest", "Overcommit ya noisy neighbour"],
          ["CPU temperature + inlet temperature", "BMC (Redfish/IPMI)", "Constant load par CPU temp badhna = airflow, fan ya paste problem"],
          ["Core frequency vs base", "turbostat / telemetry", "Load mein base se neeche = throttling ya power cap"],
          ["Package power", "BMC / RAPL / PDU", "Capacity planning; cap se compare karo"],
          ["Throttle / PROCHOT events", "BMC SEL, kernel log", "Thermal ya power protection active — turant investigate karo"],
          ["Corrected / uncorrected errors", "rasdaemon, BMC SEL", "Trend karo aur crash se pehle parts badlo"],
          ["Context switches, interrupts", "OS", "Software issue ya network storm"],
        ]}
        caption="Sirf fixed numbers par nahi, trends aur baselines par alert lagao."
      />
      <CodeBlock lang="bash" label="Redfish — processor aur thermal data padho (vendor-neutral)">
{`# Read-only service account use karo; credentials environment/secret store mein rakho
curl -sk -u "$BMC_USER:$BMC_PASS" https://<bmc-ip>/redfish/v1/Systems/1/Processors
curl -sk -u "$BMC_USER:$BMC_PASS" https://<bmc-ip>/redfish/v1/Chassis/1/Thermal`}
      </CodeBlock>
      <p style={S.p}>Fleet-level view ke liye <TopicLink slug="dcim" variant="inline" /> ya apna monitoring platform use karo; facility-linked alarms ke liye <TopicLink slug="bms" variant="inline" /> dekho.</p>

      {/* ══════════ 23. MAINTENANCE ══════════ */}
      <h2 id="maintenance" style={S.h2}>Maintenance</h2>
      <p style={S.p}>CPU mein khud koi moving part nahi hota, isliye maintenance zyadatar uske aas-paas ki cheezon ki hoti hai: cooling, firmware aur configuration.</p>
      <ul style={S.ul}>
        <li><strong>Cooling path:</strong> Fans, air shrouds, blanking panels aur filters check karo. Shroud missing ho to fans tez ghoomne par bhi CPU ko airflow nahi milta.</li>
        <li><strong>Firmware:</strong> BIOS, microcode aur BMC updates controlled cycle se lagao — pehle test host, phir batches.</li>
        <li><strong>Baseline drift:</strong> Fleet mein BIOS profiles ko regularly compare karo. Repairs ke baad servers chup-chaap drift karte hain.</li>
        <li><strong>Error trending:</strong> Corrected-error counts ka monthly review karo. UCE se pehle policy par DIMM/CPU badlo.</li>
        <li><strong>Thermal paste:</strong> Jab bhi heatsink hatao, paste badlo — kabhi reuse mat karo.</li>
        <li><strong>Spares:</strong> Spare heatsinks rakho, critical clusters ke liye matching CPU stock rakho aur compatibility list confirm karo.</li>
        <li><strong>Documentation:</strong> Har server ke serials, firmware versions aur BIOS profile record karo.</li>
      </ul>
      <Callout type="maintenance" title="Ek time par ek hi cheez badlo">
        Agar ek hi window mein BIOS update, DIMM replace aur power profile badal diye aur server galat chale, to pata nahi chalega ki kaunsa change zimmedar hai. Chhote steps mein badlo, har ek note karo aur rollback ready rakho.
      </Callout>

      {/* ══════════ 24. TROUBLESHOOTING ══════════ */}
      <h2 id="troubleshooting" style={S.h2}>CPU Troubleshooting</h2>
      <p style={S.p}>"Server slow hai" sabse common aur sabse kam specific ticket hai. Structured flow use karo taaki seedha "CPU badal do" par na kudo.</p>
      <Figure caption="Fig 8 — Slow server ke liye troubleshooting flow: utilisation → frequency/thermal → BIOS/power cap/MCE → NUMA placement → fix aur record."><CpuThrottleFlow /></Figure>
      <DiagramGuide
        title="Fig 8 ko kaise padhein"
        steps={[
          "Laal box se shuru karo: alert — slow application ya high CPU.",
          "Step 1 poochta hai CPU kaun use kar raha hai. Teen natije: ek process 100% (software problem — application team ko do), utilisation low par phir bhi slow (hardware/frequency par shak), ya sab cores busy (capacity ya overcommit problem).",
          "Beech ki (purple) branch hardware path hai. Step 2 turbostat aur BMC se real core frequency ko expected value se compare karta hai.",
          "Step 3: frequency kam ho to temperature dekho — fans, airflow, heatsink seating, thermal paste, inlet temperature.",
          "Step 4: temperature theek ho to configuration dekho — BIOS power profile, power caps — aur hardware error log mein MCEs.",
          "Step 5: aakhir mein NUMA placement check karo, cause theek karo aur jo mila wo likh lo. Ye record agle engineer ke kaam aata hai.",
          "Rule: hamesha upar se neeche jao. Har step hardware chhune se pehle ek class ki problems sasti mein hata deta hai.",
        ]}
      />
      <h3 style={S.h3}>High CPU utilisation</h3>
      <p style={S.p}>Per-core view use karo (htop, mpstat -P ALL 1). Ek core pegged aur baaki idle = single-threaded bottleneck; aur hardware se kuch nahi hoga. Saare cores busy = real capacity pressure ya runaway process.</p>
      <CodeBlock lang="bash">
{`top -H                       # per-thread view
mpstat -P ALL 2 5            # per-core utilisation
ps -eo pid,comm,%cpu --sort=-%cpu | head
pidstat -u 2 5               # time ke saath process-wise CPU
vmstat 2                     # r = run queue length; logical CPU count se compare karo`}
      </CodeBlock>
      <h3 style={S.h3}>Throttling (thermal ya power)</h3>
      <p style={S.p}>Lakshan: utilisation moderate, par performance kharab aur clock base se neeche. <em>turbostat</em>, BMC thermal sensors aur SEL mein thermal/PROCHOT events dekho. Wajah: fail fan, missing blanking panel, high inlet temperature, kharab seated heatsink, sookha paste, power cap ya "power-saver" BIOS profile.</p>
      <h3 style={S.h3}>Hardware errors / unexpected reboot</h3>
      <p style={S.p}>BMC SEL aur OS logs mein MCE/EDAC entries padho. Source pehchano (CPU, DIMM channel, PCIe). Ek corrected error noise ho sakta hai; ek hi jagah se baar-baar errors replacement ka signal hai. Logs clear karne se pehle unhe save karo.</p>
      <h3 style={S.h3}>Virtual hosts mein CPU steal / %RDY</h3>
      <p style={S.p}>VM ko CPU low dikhta hai par wo slow hai. Hypervisor ready time dekho. Theek karne ke liye VMs migrate karo, vCPU counts kam karo ya hosts badhao.</p>
      <h3 style={S.h3}>NUMA-related slowness</h3>
      <p style={S.p}><em>numastat</em> mein other-node counts badhte dekho aur verify karo ki process ki memory kahan hai. Workload ko ek node par pin ya restart karo; VM sizing theek karo.</p>
      <ComparisonTable
        title="Symptom → Likely Cause → First Check"
        headers={["Symptom", "Likely cause", "First check"]}
        rows={[
          ["Garmi mein slow, clock base se neeche", "Thermal throttle", "Fans, shroud, inlet temp, heatsink, BMC SEL"],
          ["Board/CPU replacement ke baad slow", "BIOS defaults / power-saver profile", "BIOS profile ko healthy server se compare karo"],
          ["OS mein cores kam dikh rahe", "Bent socket pins, BIOS mein disabled cores, CPU fault", "BMC inventory, lscpu, POST messages"],
          ["CPU service ke baad DIMMs missing", "Socket contact issue ya galat seating", "BIOS memory map; guide ke hisaab se CPU/DIMM re-seat"],
          ["MCE ke saath intermittent reboot", "CPU, DIMM ya voltage issue", "SEL, rasdaemon source, isolate karke swap"],
          ["VM live-migration fail", "CPU feature mismatch", "EVC/compatibility baseline"],
          ["Sirf ek socket ke apps slow", "NUMA / NIC locality", "numastat, device NUMA node"],
        ]}
        caption="Starting checklist ki tarah use karo, OEM diagnostic guide ki jagah nahi."
      />

      {/* ══════════ 25. FAILURE SCENARIOS ══════════ */}
      <h2 id="failure-scenarios" style={S.h2}>Real Failure Scenarios</h2>
      <p style={S.p}>Ye patterns kai data centers mein dekhe gaye hain. Har ek mein symptom, root cause aur lesson hai. Ye generic examples hain, kisi ek site ki report nahi.</p>
      <h3 style={S.h3}>Scenario 1: Wo server jo "theek" hua par slow hi raha</h3>
      <p style={S.p}><strong>Kya hua:</strong> Motherboard badla gaya. Server boot hua, POST pass kiya aur service mein wapas gaya. Ek din baad application team ne 30–40% kam throughput ki shikayat ki.</p>
      <p style={S.p}><strong>Root cause:</strong> BIOS default power-saver profile mein aaya, turbo limited. Kuch "toota" nahi tha, isliye koi alarm nahi bajaa.</p>
      <p style={S.p}><strong>Lesson:</strong> Board ya CPU service ke baad golden BIOS profile dobara lagao aur ticket band karne se pehle load mein frequency ko sibling server se compare karo.</p>
      <h3 style={S.h3}>Scenario 2: CPU replacement ke baad thermal throttling</h3>
      <p style={S.p}><strong>Kya hua:</strong> Maintenance window mein CPU swap hua. Kuch ghanton mein server ne load par high latency dikhayi aur fans maximum par the.</p>
      <p style={S.p}><strong>Root cause:</strong> Heatsink screws galat sequence mein kase gaye aur paste zyada lagayi gayi. CPU ke ek corner par contact kharab tha.</p>
      <p style={S.p}><strong>Lesson:</strong> OEM torque order follow karo, specified matra mein paste lagao aur server wapas lagane se pehle temperature monitoring ke saath stress test chalao.</p>
      <h3 style={S.h3}>Scenario 3: 2-socket host par database slow</h3>
      <p style={S.p}><strong>Kya hua:</strong> Bada database VM naye host par gaya. CPU utilisation sirf 40% tha, phir bhi query latency double ho gayi.</p>
      <p style={S.p}><strong>Root cause:</strong> VM ek NUMA node se bada size kiya gaya tha aur uski memory dono sockets mein faili thi. Memory accesses ka bada hissa interconnect se guzar raha tha.</p>
      <p style={S.p}><strong>Lesson:</strong> Jahan possible ho VMs ko ek NUMA node mein fit hone layak size karo aur migration ke baad <em>numastat</em> / hypervisor NUMA statistics check karo.</p>
      <h3 style={S.h3}>Scenario 4: Corrected errors crash tak ignore hue</h3>
      <p style={S.p}><strong>Kya hua:</strong> Ek server uncorrectable memory error se achanak reboot hua. BMC log mein crash se pehle hafton se usi DIMM ke correctable errors dikh rahe the.</p>
      <p style={S.p}><strong>Root cause:</strong> Corrected errors ko koi trend nahi kar raha tha.</p>
      <p style={S.p}><strong>Lesson:</strong> Error trends par alert lagao aur uncorrectable event se pehle policy par parts badlo.</p>
      <h3 style={S.h3}>Scenario 5: Mixed cluster mein live migration block</h3>
      <p style={S.p}><strong>Kya hua:</strong> Naye CPU generation wale naye hosts purane cluster mein joden gaye. VMs purane hosts par vMotion nahi kar paye, aur maintenance plan window ke beech fail ho gaya.</p>
      <p style={S.p}><strong>Root cause:</strong> Cluster ka CPU compatibility baseline (EVC) naye generation ke liye plan nahi kiya gaya tha.</p>
      <p style={S.p}><strong>Lesson:</strong> CPU generations mix karna kharidne se pehle plan karo. Ya to clusters homogeneous rakho ya baseline pehle set karo.</p>
      <h3 style={S.h3}>Scenario 6: CPU upgrade ke baad rack power breaker alarm</h3>
      <p style={S.p}><strong>Kya hua:</strong> Same racks mein servers ko higher-TDP CPU par upgrade kiya gaya. Peak load par rack PDUs ne near-limit current dikhaya aur ek feed par alarm aaya.</p>
      <p style={S.p}><strong>Root cause:</strong> Upgrade "same chassis, same rack" maankar approve hua, rack power aur A/B redundancy headroom dobara calculate kiye bina.</p>
      <p style={S.p}><strong>Lesson:</strong> CPU change power aur cooling change hai. Capacity calculation dobara karo, wo case bhi jisme ek feed poora load uthati hai. <TopicLink slug="pdu" variant="inline" /> dekho.</p>

      {/* ══════════ 26. TIER III / IV ══════════ */}
      <h2 id="tier-iii-iv-view" style={S.h2}>Tier III and Tier IV View</h2>
      <p style={S.p}>Tier classification (Uptime Institute ke framework ke hisaab se) <strong>site infrastructure</strong> describe karti hai: power paths, cooling aur maintainability. Ye kisi individual CPU ko rate nahi karti. Par CPU choices decide karte hain ki Tier III ya Tier IV design sach mein design ke hisaab se perform karega ya nahi.</p>
      <ComparisonTable
        title="CPU Decisions Site Design Se Kaise Jude Hain"
        headers={["Concern", "Normal industry view", "Data center view", "Tier III thinking", "Tier IV thinking"]}
        rows={[
          ["Power density", "Server ke CPU watts", "Circuit limits ke andar rack ke watts", "Concurrently maintainable: ek path band ho sakta hai aur load chalta rahe — rack ek feed par fit hona chahiye", "Fault tolerant: fault ke baad bachi path poora load uthaye"],
          ["Cooling", "Heatsink aur fans", "Har rack ka inlet temperature aur airflow", "Cooling units maintain ho sakein bina inlet limits paar kiye", "Single fault mein bhi cooling limits ke andar chalti rahe"],
          ["Thermal margin", "Throttle se neeche raho", "Rack ke worst inlet par throttling", "Ek cooling unit ke maintenance mein worst-case inlet plan karo", "Sirf maintenance nahi, fault ke dauran inlet plan karo"],
          ["Fault domains", "Single server", "Cluster nodes ko racks aur feeds mein baanto", "Nodes ko aise failao ki ek path ke maintenance se quorum na tute", "Independent paths mein failao taaki fault se quorum na tute"],
          ["Capacity headroom", "Peak utilisation", "N+1 compute capacity", "Ek host ya ek path down ho tab bhi capacity bache", "Fault + maintenance scenarios mein bhi capacity bache"],
        ]}
        caption="Sirf conceptual mapping. Actual implementation project requirements, utility requirements, OEM design aur Data Center architecture par depend karti hai."
      />
      <Callout type="important" title="High-TDP CPUs design limit khiskaate hain">
        150 W CPUs ke saath comfortable design 350–500 W CPUs ke saath marginal ho sakta hai: PDU current, breaker ratings, per rack cooling aur containment effectiveness sab zyada matter karte hain. CPU generation change ko facility change request maano. Related reading: <TopicLink slug="ups" variant="inline" />, <TopicLink slug="crac" variant="inline" />, <TopicLink slug="chiller" variant="inline" />.
      </Callout>
      <p style={S.p}>Design philosophy: CPU workload ke liye chuna jaata hai; rack aur room worst thermal aur power case ke liye design hote hain; cluster aise design hota hai ki koi single server, feed ya cooling unit service ko down na kar sake.</p>

      {/* ══════════ 27. SAFETY ══════════ */}
      <h2 id="safety-practices" style={S.h2}>Safety Practices</h2>
      <ul style={S.ul}>
        <li><strong>Power isolation:</strong> Server kholne se pehle <em>saari</em> power cords nikalo (dual PSUs!). Standby power BMC aur board ke kuch hisse live rakhti hai.</li>
        <li><strong>Hot surfaces:</strong> Shutdown ke baad bhi CPU heatsinks garam rehte hain. Chhune se pehle thanda hone do.</li>
        <li><strong>ESD:</strong> Known ground se wrist strap aur anti-static mat use karo. CPUs ko carrier/anti-static packaging mein rakho.</li>
        <li><strong>Mechanical:</strong> Bhaari heatsinks aur 2U/4U servers — unchi rack position se nikalte waqt server lift use karo; lifting limits follow karo.</li>
        <li><strong>Sharp edges aur pins:</strong> Chassis edges aur socket pins logon aur equipment dono ko nuksan pahunchate hain. Socket contacts ko kabhi mat chhuo.</li>
        <li><strong>Permit-to-work:</strong> Production row mein kisi bhi kaam ke liye site ke change management aur live-work rules follow karo.</li>
        <li><strong>Noise aur hearing:</strong> Full speed par server fans bahut tez aawaz karte hain; lambe stress tests mein hearing protection use karo.</li>
        <li><strong>Safely test karo:</strong> Stress tests racked, monitored servers par chalao — disabled fans ke saath bench par rakhe khule server par nahi.</li>
      </ul>

      {/* ══════════ 28. OEM ══════════ */}
      <h2 id="oem-reference" style={S.h2}>OEMs and Reference Platforms</h2>
      <p style={S.p}>CPUs silicon vendors (Intel, AMD, Ampere, NVIDIA aur aur) se aate hain. Servers OEMs se aate hain jo in CPUs ke around boards, cooling, firmware aur BMC design karte hain. Aap zyadatar OEM ke documents ke saath kaam karoge.</p>
      <ComparisonTable
        title="Common Server OEMs aur CPU-Related Guidance Kahan Milti Hai"
        headers={["OEM", "Management / tools", "Kya dekhein"]}
        rows={[
          ["Dell Technologies (PowerEdge)", "iDRAC, OpenManage", "Memory population guide, BIOS workload profiles, CPU TDP ke hisaab se thermal restrictions"],
          ["HPE (ProLiant)", "iLO, OneView", "Workload profiles, Gen-specific CPU/DIMM rules, thermal configuration"],
          ["Lenovo (ThinkSystem)", "XClarity, XCC", "Processor support matrix, memory rules"],
          ["Supermicro", "IPMI/Redfish, SUM", "Motherboard manual, BIOS version ke hisaab se supported CPU list"],
          ["Cisco (UCS), Fujitsu, Inspur, aur", "Vendor management suites", "CPU compatibility aur firmware bundles"],
          ["Hyperscale / OCP designs", "OpenBMC, Redfish", "Open specifications, rack-level power aur cooling design"],
        ]}
        caption="Naam waqt ke saath badalte hain. Apne exact server generation ke liye hamesha OEM ki current documentation use karo."
      />
      <Callout type="best-practice" title="OEM ki thermal restrictions table use karo">
        Kai server models sabse high-TDP CPUs ko kuch configurations tak limit karte hain (jaise specific heatsinks, fan types, front-drive counts ya maximum inlet temperature). Is table ko ignore karna unexplained throttling ki common wajah hai.
      </Callout>

      {/* ══════════ 29. MISCONCEPTIONS ══════════ */}
      <h2 id="misconceptions" style={S.h2}>Common Misconceptions</h2>
      <ComparisonTable
        title="Myths vs Reality"
        headers={["Myth", "Reality"]}
        rows={[
          ["Zyada GHz = hamesha tez", "IPC, core count, cache aur memory bhi matter karte hain. Apne workload se compare karo."],
          ["Zyada cores = hamesha tez", "Tabhi jab software unhe use kar sake. Single-threaded jobs extra cores ignore karte hain."],
          ["Hyper-Threading performance double karta hai", "Ye core utilisation kuch had tak badhata hai — workload par depend."],
          ["TDP maximum power hai", "TDP design reference hai. Actual power limits, workload aur settings par depend karti hai."],
          ["Low CPU% matlab CPU theek hai", "VMs mein low guest CPU ke peeche high %RDY chhupa ho sakta hai; physical hosts mein low util ke peeche throttling."],
          ["RAM capacity memory speed decide karti hai", "Populated channels aur DIMM layout bandwidth decide karte hain."],
          ["Naya CPU hamesha drop-in replacement hai", "Socket, BIOS, firmware, power, cooling aur cluster compatibility chahiye."],
          ["NUMA sirf HPC ke liye matter karta hai", "Kisi bhi 2S server par databases, VMs aur network-heavy apps par asar karta hai."],
        ]}
        caption="Galat mental models jaldi theek karo — wahi galat purchases aur galat troubleshooting karwate hain."
      />

      {/* ══════════ 30. FUTURE ══════════ */}
      <h2 id="future-trends" style={S.h2}>Future Trends</h2>
      <p style={S.p}>Ye industry mein dikh rahi directions hain. Specific products aur timelines badlenge — inhe dekhne layak concepts maano.</p>
      <ul style={S.ul}>
        <li><strong>Zyada chiplets aur tiles:</strong> Modular packages se high core counts, aur UCIe jaise open chiplet standards.</li>
        <li><strong>Higher power aur liquid cooling:</strong> Kai sau watt ke server CPUs designs ko direct liquid cooling ya rear-door heat exchangers ki taraf dhakel rahe hain.</li>
        <li><strong>Bade caches aur on-package memory:</strong> Stacked cache (jaise 3D V-Cache) aur bandwidth-limited workloads ke liye high-bandwidth memory wale CPUs.</li>
        <li><strong>Built-in accelerators:</strong> CPU ke andar matrix/AI units (jaise AMX-class), crypto aur data-movement engines.</li>
        <li><strong>CXL:</strong> Compute Express Link DIMM slots ke bahar memory expansion aur pooling deta hai, jisse per socket RAM ke baare mein sochne ka tareeka badalta hai. <TopicLink slug="ram" variant="inline" /> dekho.</li>
        <li><strong>ARM aur custom silicon:</strong> Cloud aur AI host CPUs mein badhta hissa; zyada multi-architecture operations.</li>
        <li><strong>Confidential computing:</strong> Hardware-isolated VMs taaki host operator bhi tenant memory na padh sake.</li>
        <li><strong>Tight CPU–GPU coupling:</strong> AI platforms mein high-bandwidth CPU-to-GPU links. <TopicLink slug="ai-gpu" variant="inline" /> aur <TopicLink slug="nvidia-architecture" variant="inline" /> dekho.</li>
        <li><strong>Efficiency focus:</strong> Performance per watt aur sustainability CPU choices mein raw speed jitne hi matter karte hain.</li>
      </ul>

      {/* ══════════ 31. LEARNING PATH ══════════ */}
      <h2 id="learning-path" style={S.h2}>Learning Path</h2>
      <p style={S.p}>CPU compute stack ka sirf ek hissa hai. Aage badhne ka achha order:</p>
      <ol style={S.ul}>
        <li><TopicLink slug="server-basics" variant="inline" /> — poora server: form factors, rack, power, BMC.</li>
        <li><TopicLink slug="ram" variant="inline" /> — memory channels, ECC aur DIMM population gehrai mein.</li>
        <li><TopicLink slug="gpu" variant="inline" /> — accelerators aur wo CPU se kaise jude hain.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — hypervisors, vCPU scheduling aur clusters.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — dense shared-chassis compute.</li>
        <li><TopicLink slug="pdu" variant="inline" /> aur <TopicLink slug="airflow-management" variant="inline" /> — wo power aur cooling jis par CPUs nirbhar hain.</li>
      </ol>

      {/* ══════════ 32. INTERVIEW ══════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: NUMA kya hai aur performance par kaise asar karta hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Multi-socket server mein har CPU ki apni local memory hoti hai. Local access fast; doosre socket ki memory interconnect se guzarti hai aur slow. NUMA-unaware placement chup-chaap performance girata hai. numactl/numastat se check karo aur workload ke CPUs aur memory ko jahan possible ho ek node par rakho.</p>
      <h3 style={S.h3}>Q2: Kya TDP CPU ki maximum power hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Nahi. Ye thermal design reference hai. Actual power workload aur vendor ke power limits par depend karti hai (jaise TDP se upar burst limits). Cooling design ke liye TDP, power planning ke liye measured BMC/PDU readings use karo.</p>
      <h3 style={S.h3}>Q3: Server mein CPU usage low hai par wo slow hai. Kya check karoge?</h3>
      <p style={S.p}><strong>Answer:</strong> Frequency vs base (throttling/power cap/BIOS profile), temperature aur BMC events, MCE logs, NUMA locality, aur virtualisation mein %RDY/steal. Low utilisation ye prove nahi karta ki CPU full speed par perform kar raha hai.</p>
      <h3 style={S.h3}>Q4: 2-socket, 32-core, SMT-enabled server mein kitne logical processors honge?</h3>
      <p style={S.p}><strong>Answer:</strong> 2 × 32 × 2 = 128 logical CPUs (64 physical cores). Per-core software licences aam taur par physical cores use karte hain — vendor ke licence terms check karo.</p>
      <h3 style={S.h3}>Q5: CPU overcommit kya hai aur use kaise monitor karte ho?</h3>
      <p style={S.p}><strong>Answer:</strong> Physical threads se zyada vCPUs assign karna. Tab kaam karta hai jab VMs ek saath peak na karein. %RDY (VMware), steal time (Linux/KVM) aur co-stop monitor karo. Lagataar high values ka matlab VMs cores ka intezaar kar rahe hain.</p>
      <h3 style={S.h3}>Q6: Kuch workloads ke liye memory channels DIMM capacity se zyada matter kyun karte hain?</h3>
      <p style={S.p}><strong>Answer:</strong> Bandwidth populated channels ke saath scale karti hai. Sahi capacity par khali channels wala server kam bandwidth deta hai. OEM guide ke hisaab se channels symmetrically populate karo.</p>
      <h3 style={S.h3}>Q7: CPU ya motherboard replace karne ke baad kya karte ho?</h3>
      <p style={S.p}><strong>Answer:</strong> Detection aur memory map verify karo, standard BIOS profile dobara lagao, firmware update/verify karo, thermal monitoring ke saath stress test chalao, error logs check karo, sibling server se compare karo aur baseline record karo.</p>
      <h3 style={S.h3}>Q8: Ek hi cluster ke do hosts ke beech VM live-migrate kyun nahi ho raha?</h3>
      <p style={S.p}><strong>Answer:</strong> Aksar CPU feature mismatch. Cluster compatibility baseline (VMware mein EVC, doosron mein equivalent) use karo ya hosts homogeneous rakho.</p>

      {/* ══════════ 33. KEY TAKEAWAYS ══════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Performance = clock × IPC × busy cores — aur wo cache hits, memory bandwidth aur I/O se limited hoti hai, sirf GHz se nahi.</li>
        <li>Topology: socket → core → thread. 2S, 32-core, SMT server 128 logical CPUs dikhata hai par uske 64 cores hain.</li>
        <li>Memory controllers aur PCIe lanes CPU ke andar hain, isliye CPU model RAM channels, capacity aur I/O ko cap karta hai.</li>
        <li>NUMA: local fast, remote slow. VMs aur databases ko node ke andar rakho aur device ke node se bind karo.</li>
        <li>TDP cooling reference hai. Real power measure karo; CPU change power aur cooling change hai.</li>
        <li>Virtualisation mein %RDY / steal dekho — guest CPU% bhookhe VM ko chhupa sakta hai.</li>
        <li>BIOS profile build ka hissa hai. Board ya CPU service ke baad dobara lagao aur verify karo.</li>
        <li>Heatsink seating aur paste "silent slowness" ki wajah hain — wapas service mein daalne se pehle stress test se validate karo.</li>
        <li>Corrected errors ko trend karo aur uncorrectable crash se pehle policy par replace karo.</li>
        <li>Kuch hi CPU SKUs standardise karo aur clusters ke liye generation mixing pehle plan karo.</li>
        <li>Actual implementation project requirements, utility requirements, OEM design aur data center architecture par depend karti hai — hamesha vendor documentation se verify karo.</li>
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
        <li><TopicLink slug="server-basics" variant="inline" /> — Poora server: form factors, rack, power, BMC.</li>
        <li><TopicLink slug="ram" variant="inline" /> — Memory channels, ECC, DIMM population.</li>
        <li><TopicLink slug="gpu" variant="inline" /> — Accelerators aur CPU-GPU relationship.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — vCPU, overcommit, VMs mein NUMA.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — High-density shared-chassis compute.</li>
      </ul>
    </>
  );
}
