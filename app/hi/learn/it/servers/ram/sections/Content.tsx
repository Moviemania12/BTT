"use client";
import { S, Callout, ComparisonTable, Figure, CodeBlock, DiagramGuide } from "@/app/learn/it/servers/ram/shared";
import TopicLink from "@/components/TopicLink";
import DramCellArray from "@/app/learn/it/servers/ram/svg/DramCellArray";
import EccFlow from "@/app/learn/it/servers/ram/svg/EccFlow";
import DimmAnatomy from "@/app/learn/it/servers/ram/svg/DimmAnatomy";
import DimmChannels from "@/app/learn/it/servers/ram/svg/DimmChannels";
import DimmPopulation from "@/app/learn/it/servers/ram/svg/DimmPopulation";
import LinuxMemoryView from "@/app/learn/it/servers/ram/svg/LinuxMemoryView";
import MemoryTroubleshootFlow from "@/app/learn/it/servers/ram/svg/MemoryTroubleshootFlow";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      {/* Quick Summary */}
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#14532d", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — Server RAM 2 Minute Mein</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>Kya hai:</strong> RAM CPU ki working memory hai — OS, applications, databases aur VM memory sab yahin rehte hain. Volatile: power band = data gaya.</li>
          <li><strong>DRAM ko refresh kyun chahiye:</strong> Har bit ek chhota capacitor hai jo leak karta hai. Controller use continuously refresh karta hai.</li>
          <li><strong>ECC:</strong> Extra check bits se controller single-bit error theek karta hai aur bade errors detect karta hai. Servers mein standard.</li>
          <li><strong>DIMM types:</strong> RDIMM server standard hai. LRDIMM bahut high capacity ke liye. UDIMM desktops aur chhote workstations ke liye. Types kabhi mix mat karo.</li>
          <li><strong>Bandwidth channels se aati hai:</strong> Peak = MT/s × 8 bytes × channels. DDR5-4800 ≈ 38.4 GB/s per channel. Khali channel = khoyi hui bandwidth.</li>
          <li><strong>Capacity ≠ bandwidth:</strong> 4 bade DIMMs mein 512 GB aur 8 chhote DIMMs mein 512 GB — capacity same, speed bahut alag.</li>
          <li><strong>NUMA:</strong> RAM ek socket ki hoti hai. Use sockets mein barabar baanto.</li>
          <li><strong>RAS:</strong> Scrubbing, sparing, mirroring aur chipkill-style schemes errors ko outage banne se rokte hain — platform dependent.</li>
          <li><strong>Operations:</strong> Har DIMM ke correctable errors trend karo, "free" nahi "available" padho, swap aur OOM dekho, OEM-qualified DIMMs use karo.</li>
          <li><strong>Golden rule:</strong> OEM population guide follow karo, ek time par ek hi change karo, aur badhte correctable-error trend ko kabhi ignore mat karo.</li>
        </ul>
      </div>

      {/* ══════════ 1. WHAT IS RAM ══════════ */}
      <h2 id="what-is-ram" style={S.h2}>What Is RAM? — Its Place in the Server</h2>
      <p style={S.p}>RAM (Random Access Memory) <TopicLink slug="cpu" variant="inline" /> ki working desk hai. CPU jo abhi use kar raha hai — operating system, applications, database buffers, virtual machine memory — sab RAM mein rehta hai.</p>
      <p style={S.p}>Storage ko warehouse samjho aur RAM ko saamne ki table. Warehouse mein bahut kuch rakh sakte ho, par fast kaam sirf wahi kar sakte ho jo table par rakha ho. Badi table aapko smart nahi banati, par warehouse ke kai chakkar bacha deti hai.</p>
      <p style={S.p}><strong>Volatile:</strong> RAM ko power chahiye. Server band karo to RAM ka sab kuch gayab. Isliye databases transaction confirm karne se pehle disk par log likhte hain, aur crash mein unsaved kaam ja sakta hai.</p>
      <ComparisonTable
        title="RAM vs Storage — Dono Kyun Hain"
        headers={["Property", "RAM (DRAM)", "NVMe SSD", "HDD"]}
        rows={[
          ["Access time (order of magnitude)", "tens se ~100 ns", "tens of microseconds", "milliseconds"],
          ["Bandwidth per device (order)", "per channel tens of GB/s", "kai GB/s", "~100–250 MB/s"],
          ["Power-off ke baad data bacha?", "Nahi", "Haan", "Haan"],
          ["Cost per GB", "Sabse zyada", "Medium", "Sabse kam"],
          ["Role", "Abhi ka working data", "Fast persistent data", "Bulk capacity"],
        ]}
        caption="Ballpark comparison. Exact numbers technology, generation aur load par depend karte hain."
      />
      <p style={S.p}>Data center mein RAM server ke sabse bade <strong>cost aur power</strong> items mein se ek hai. Bade servers mein per socket 1–2 TB ya zyada ho sakti hai. To sahi matra, speed aur population chunna performance aur budget dono ka decision hai. Server context: <TopicLink slug="server-basics" variant="inline" />.</p>

      {/* ══════════ 2. DRAM BASICS ══════════ */}
      <h2 id="dram-basics" style={S.h2}>DRAM Basics: Cell, Row/Column and Refresh</h2>
      <p style={S.p}>Server memory <strong>DRAM</strong> hai — Dynamic RAM. Har bit ek chhote capacitor mein store hota hai, jise ek transistor control karta hai. Charged capacitor = 1, khali = 0.</p>
      <p style={S.p}>"Dynamic" isliye kyunki capacitor dheere-dheere leak karta hai. Kuch na karo to bit milliseconds mein fade ho jaata hai. Isliye memory controller har second hazaron baar <strong>refresh</strong> commands bhejta hai, har row ko padhkar dobara likhne ke liye.</p>
      <Figure caption="Fig 1 — DRAM cell (ek transistor + ek capacitor), bank ke andar rows aur columns mein arranged cells, row buffer, aur teen access steps: activate, read/write, precharge."><DramCellArray /></Figure>
      <DiagramGuide
        title="Fig 1 ko kaise padhein"
        steps={[
          "Top-left box: ek DRAM cell. Transistor gate hai; uske neeche ka capacitor charge store karta hai. Bit line data andar-bahar le jaati hai, aur word line gate ko on karti hai.",
          "Laal note kamzori dikhata hai: charge leak hota hai, isliye cell ko refresh karna padta hai.",
          "Top-middle box: aise lakhon-karodon cells grid mein lage hote hain jise bank kehte hain. Cells ki ek horizontal line ek row hai (amber mein highlighted).",
          "Padhna poori row ek saath hota hai. Row ko row buffer (orange bar, sense amplifiers) mein copy kiya jaata hai; phir us buffer se zaroori column chuna jaata hai.",
          "Top-right box: physical hierarchy — DIMM → rank → chips → bank groups → banks → rows/columns. Alag banks parallel kaam kar sakte hain, jisse kuch delay chhup jaata hai.",
          "Neeche ki row: ek access ke teen steps. ACTIVATE row kholta hai (delay tRCD). READ/WRITE data move karta hai (delay CL). PRECHARGE row band karke agli ke liye taiyar karta hai (delay tRP). DIMM spec par dikhne wale timing numbers yahi hain.",
        ]}
      />
      <p style={S.p}>Row read <strong>destructive</strong> hota hai: charge sense karne par drain ho jaata hai, isliye data wapas likhna padta hai. Isiliye plain read mein bhi write-back aur precharge steps hote hain.</p>
      <p style={S.p}>Refresh ki cost hoti hai: refresh ke dauran wo row access nahi ho sakti. Bade-capacity chips ko zyada refresh kaam chahiye, aur high temperature mein capacitor tez leak karta hai to refresh zyada baar karna padta hai. Garam DIMMs ke slow hone ki ye ek chhupi wajah hai.</p>
      <Callout type="important" title="DRAM vs SRAM">
        CPU caches SRAM use karte hain, jisme har bit ke liye 6 transistors lagte hain aur refresh nahi — bahut fast par bada aur mehnga. DRAM mein har bit ke liye 1 transistor + 1 capacitor — gigabytes ke liye dense aur sasta. Cache/RAM ke split ke peeche yahi trade-off hai, jo <TopicLink slug="cpu" variant="inline" /> article mein samjhaya gaya hai.
      </Callout>

      {/* ══════════ 3. TIMINGS ══════════ */}
      <h2 id="dram-timings" style={S.h2}>Latency, Timings and Bandwidth</h2>
      <p style={S.p}>Memory performance ko do numbers describe karte hain, aur log inhe aksar mix kar dete hain. <strong>Latency</strong> ek access kitni der leta hai. <strong>Bandwidth</strong> bahut saare accesses chal rahe hon to ek second mein kitna data move hota hai.</p>
      <p style={S.p}>DIMM label par DDR5-4800 (4800 MT/s — megatransfers per second) jaisi speed aur CL40 jaise timings dikhte hain. CL (CAS latency) memory clock cycles mein gina jaata hai. DDR5 ke clocks tez hain, isliye bada CL number apne aap mein kharab real time nahi hota.</p>
      <CodeBlock lang="text">
{`Real latency (ns) ≈ CL × 2000 / MT/s     (sirf CAS hissa)

DDR4-3200 CL22 :  22 × 2000 / 3200 = 13.75 ns
DDR5-4800 CL40 :  40 × 2000 / 4800 = 16.67 ns
DDR5-6400 CL52 :  52 × 2000 / 6400 = 16.25 ns

Core ko dikhne wali poori load-to-use latency (cache miss, controller,
fabric hop, DRAM) kahin zyada hoti hai — aam taur par local 80–120 ns.`}
      </CodeBlock>
      <p style={S.p}>Server memory JEDEC-standard timings par chalti hai. Gaming RAM ki tarah overclock ya timings tweak nahi karte. Data center mein stability speed se badi hai.</p>
      <ComparisonTable
        title="Latency vs Bandwidth — Kaunsa Workload Kisse Zyada Darta Hai"
        headers={["Workload", "Zyada sensitive", "Kyun"]}
        rows={[
          ["OLTP database, key-value cache", "Latency", "Bahut saare chhote random accesses"],
          ["Analytics scans, HPC, AI host", "Bandwidth", "Bade sequential ya streaming accesses"],
          ["Virtualisation host", "Pehle capacity, phir dono", "Kai VMs; capacity consolidation limit karti hai"],
          ["File/web server", "Capacity (cache)", "Hot data OS page cache mein rehta hai"],
        ]}
        caption="Generalisation. Hamesha apna workload profile karo."
      />

      {/* ══════════ 4. ECC ══════════ */}
      <h2 id="ecc" style={S.h2}>ECC — Error-Correcting Code</h2>
      <p style={S.p}>Memory bits flip hote hain, kabhi-kabhi. Wajah: cosmic-ray particles, electrical noise, garmi, ageing cells, marginal signal. Ek server mein ye rare hai. Hazaron servers ke fleet mein, jinme se har ek mein terabytes hain, ye roz hota hai.</p>
      <p style={S.p}>Protection ke bina ek flipped bit database record ya program ko chup-chaap corrupt kar sakta hai. Na crash, na alarm — bas galat data. ECC (Error-Correcting Code) isi ko rokne ke liye hai.</p>
      <p style={S.p}>Kaise kaam karta hai: controller jab 64 bits data likhta hai, to unse 8 extra <strong>check bits</strong> compute karke saare 72 bits store karta hai. Padhte waqt dobara compute karke compare karta hai. Fark (syndrome) exact failing bit batata hai, jise wapas flip kiya ja sakta hai.</p>
      <Figure caption="Fig 2 — ECC write aur read path: write par check bits judte hain; read par syndrome decide karta hai ki no error, corrected single-bit error (CE) ya uncorrectable error (UCE)."><EccFlow /></Figure>
      <DiagramGuide
        title="Fig 2 ko kaise padhein"
        steps={[
          "Upar ki row (WRITE), left se right: CPU data → memory controller check bits compute karta hai → 72 bits (64 data + 8 check) DIMM par store hote hain. Isiliye ECC DIMMs mein extra chips hote hain.",
          "Doosri row (READ): 72 bits wapas aate hain, shayad ek bit flip hokar. Controller check bits dobara compute karke stored wale se compare karta hai.",
          "Purple box 'syndrome' us comparison ka result hai. Ye ek pattern hai jo batata hai kaunsa bit (agar koi) galat hai.",
          "Teen arrows teen natijon par jaate hain. Green: no error, data pass. Amber: single-bit error — turant theek hua aur correctable error (CE) ki tarah log hua. Red: multi-bit error — detect hua par theek nahi ho sakta, machine-check (UCE) uthta hai.",
          "Neeche ki yellow strip operational sabak hai: CE warning hai, UCE outage. CEs ko trend karo aur DIMM UCE banne se pehle badlo.",
        ]}
      />
      <h3 style={S.h3}>Protection ke levels</h3>
      <ComparisonTable
        title="ECC Levels (naam vendor ke hisaab se alag; capability platform dependent)"
        headers={["Level", "Kya kar sakta hai", "Notes"]}
        rows={[
          ["SEC-DED (basic ECC)", "Word mein 1 bit correct, 2 bits detect", "Classic server ECC"],
          ["SDDC / chipkill-class", "DIMM ke poore DRAM chip ke fail hone se bachta hai", "Enterprise platforms mein common; x4 DIMMs ya specific modes chahiye ho sakte hain"],
          ["On-die ECC (DDR5)", "DRAM chip ke andar hi errors theek karta hai", "DIMM-level ECC jaisa nahi — ECC DIMMs ki jagah nahi leta"],
          ["Mirroring / sparing", "DIMM fault se bachne ke liye memory duplicate ya reserve", "Capacity ki keemat par; RAS section dekho"],
        ]}
        caption="Exact capability CPU aur OEM documentation mein verify karo."
      />
      <Callout type="common-mistake" title="'DDR5 mein ECC hai — to koi bhi DIMM chalega?'">
        DDR5 chips mein on-die ECC apni yield badhane ke liye hota hai, par wo internal hai. Bus ke paar end-to-end protection ke liye server ko ECC DIMMs (extra data width) chahiye. Hamesha wahi DIMM type use karo jo OEM batata hai.
      </Callout>
      <Callout type="important" title="ECC platform-dependent hai">
        ECC tabhi kaam karta hai jab CPU, board/BIOS aur DIMM teeno support karein. OEM documentation check karo. Enterprise servers default mein ECC use karte hain.
      </Callout>

      {/* ══════════ 5. DIMM TYPES ══════════ */}
      <h2 id="dimm-types" style={S.h2}>DIMM Types — RDIMM, LRDIMM, UDIMM</h2>
      <p style={S.p}>DIMM DRAM chips wala chhota module hai. Type decide karta hai ki ek channel par kitne DIMMs lag sakte hain aur kitni speed par.</p>
      <p style={S.p}>Challenge electrical hai: channel par jitne zyada DIMMs, signal par utna zyada load. Module par lage buffer chips us load ko kam karte hain.</p>
      <ComparisonTable
        title="Server DIMM Types"
        headers={["Type", "Full name", "Buffering", "Typical use", "Notes"]}
        rows={[
          ["UDIMM", "Unbuffered DIMM", "Koi nahi", "Desktops, entry servers, workstations", "Sabse kam latency; DIMMs per channel aur capacity limited"],
          ["RDIMM", "Registered DIMM", "Command/address buffered (RCD)", "Mainstream server standard", "Per channel zyada DIMMs aur zyada capacity"],
          ["LRDIMM", "Load-Reduced DIMM", "Command/address + data buffered", "Bahut high capacity (khaaskar purane platforms par)", "Thodi zyada latency aur power; naye platforms par kam, kyunki RDIMM capacities badh gayi hain"],
          ["MRDIMM", "Multiplexed-Rank DIMM", "Buffered, do ranks multiplex karta hai", "Naye high-bandwidth server platforms", "Effective speed badhata hai; supported CPU chahiye"],
          ["SO-DIMM / CAMM", "Small form factor", "—", "Laptops, edge boxes", "Data center servers mein rare"],
        ]}
        caption="DIMM type support CPU platform aur motherboard par depend karta hai. Server mein DIMM types kabhi mix mat karo. OEM compatibility list dekho."
      />
      <Callout type="danger" title="Galat DIMM type ya generation">
        UDIMM aur RDIMM mix nahi ho sakte. DDR4 aur DDR5 physically alag keyed hain aur fit nahi honge — DIMM ko slot mein zabardasti mat ghusao. Agar DIMM aasani se click nahi karta to shayad galat hai ya ulta hai.
      </Callout>

      {/* ══════════ 6. DIMM ANATOMY ══════════ */}
      <h2 id="dimm-anatomy" style={S.h2}>DIMM Anatomy, Ranks and Reading the Label</h2>
      <p style={S.p}>Server se DIMM nikaalte ho to uske sticker se bahut kuch padh sakte ho. Label padhna aana galat orders aur galat replacements bachata hai.</p>
      <Figure caption="Fig 3 — Server RDIMM anatomy aur ek example label decode kiya hua. DDR5 RDIMMs par module par PMIC hota hai; har ECC DIMM par extra DRAM chips hote hain."><DimmAnatomy /></Figure>
      <DiagramGuide
        title="Fig 3 ko kaise padhein"
        steps={[
          "Hara board DIMM hai. Kale squares DRAM chips hain — asli memory. Front aur back dono taraf chips hote hain.",
          "Chip rows dekho: aath data chips ke har group ke saath ek extra chip hai. Wo extra chips ECC check bits store karte hain.",
          "Purple RCD (register/clock driver) commands ko buffer karta hai. Isi se ye 'registered' DIMM banta hai aur per channel zyada DIMMs allow hote hain.",
          "Orange PMIC DDR5 par milne wali on-module power-management chip hai. Neeli SPD chip DIMM ki identity, size aur timings store karti hai, jo BIOS boot par padhta hai.",
          "Sabse neeche sunhari patti contact area hai — kabhi mat chhuo. Safed notch wo key hai jo galat generation ko lagne se rokti hai.",
          "Sabse neeche ka label box ek typical sticker decode karta hai: 64GB 2Rx4 PC5-4800B-R = capacity, ranks × chip width, DDR5 speed grade, registered type.",
        ]}
      />
      <h3 style={S.h3}>Ranks aur chip width</h3>
      <p style={S.p}><strong>Rank</strong> chips ka wo set hai jo milkar 64-bit (plus ECC) data bus bharta hai. Single-rank (1R) DIMM mein ek set; dual-rank (2R) mein do sets channel share karte hain; quad-rank (4R) mein chaar. Ranks baari-baari kaam karte hain, to jab ek rank refresh ya precharge kar raha ho doosra jawab de sakta hai, jisse efficiency badh sakti hai. Per channel zyada ranks electrical load bhi badhate hain, jisse speed limit ho sakti hai.</p>
      <p style={S.p}><strong>x4 aur x8</strong> batate hain ki har chip kitne data bits deta hai. x4 DIMMs mein zyada chips lagte hain aur jahan chipkill-class protection chahiye wahan aksar prefer kiye jaate hain. x8 DIMMs mein kam chips, sasta aur kam power ho sakta hai.</p>
      <ComparisonTable
        title="Label Padhna"
        headers={["Part", "Example", "Matlab"]}
        rows={[
          ["Capacity", "64GB", "Total usable data capacity (ECC chips gine nahi jaate)"],
          ["Ranks × width", "2Rx4", "2 ranks, har chip x4"],
          ["Generation", "PC5 / PC4", "DDR5 / DDR4"],
          ["Speed", "4800", "MT/s (DDR5-4800)"],
          ["Grade letter", "B", "JEDEC timing grade"],
          ["Type", "R / L / E", "Registered / Load-reduced / Unbuffered ECC"],
          ["Part number", "Vendor-specific", "OEM compatibility lookup aur ordering ke liye use karo"],
        ]}
        caption="Label formats vendors ke beech thode alag hote hain. Replacement order karte waqt OEM part number use karo."
      />

      {/* ══════════ 7. DDR GENERATIONS ══════════ */}
      <h2 id="ddr-generations" style={S.h2}>DDR4 vs DDR5 and What Comes Next</h2>
      <p style={S.p}>DDR matlab <strong>Double Data Rate</strong>: data clock ke rising aur falling dono edge par move hota hai. Generations interchangeable nahi hain — notch position, voltage aur signalling alag hain, isliye DDR5 DIMM DDR4 slot mein fit nahi hoga.</p>
      <ComparisonTable
        title="Servers mein DDR4 vs DDR5"
        headers={["Aspect", "DDR4", "DDR5"]}
        rows={[
          ["Typical server speeds", "2133–3200 MT/s", "4800 MT/s aur upar (naye platforms aur upar; MRDIMM usse bhi upar)"],
          ["Voltage", "1.2 V", "1.1 V"],
          ["Power management", "Motherboard par", "Har DIMM par PMIC"],
          ["DIMM ka channel structure", "Ek 64-bit (ECC ke saath 72) channel", "Do independent 32-bit (ECC ke saath 40) sub-channels"],
          ["Burst length", "8", "16"],
          ["Banks", "16 (4 bank groups)", "32 (8 bank groups) — zyada parallelism"],
          ["On-die ECC", "Nahi", "Haan (chip ke andar)"],
          ["Capacity per DIMM", "128–256 GB tak common", "Recent platforms par 256 GB aur usse upar (3DS stacking ke saath zyada)"],
          ["Pins", "288", "288 (alag key notch)"],
        ]}
        caption="Typical values; exact supported speeds aur capacities CPU aur platform par depend karti hain."
      />
      <p style={S.p}>Sub-channels kyun matter karte hain: do independent 32-bit paths do requests ek saath serve karte hain, jisse servers ki bahut saari chhoti requests ke liye efficiency badhti hai. On-DIMM PMIC kyun matter karta hai: high speed par saaf power, par ek aur component jo fail ho sakta hai aur OEM-qualified DIMMs kharidne ki ek aur wajah.</p>
      <Callout type="best-practice" title="Generation platform decide karta hai">
        DDR4 ya DDR5 aap freely nahi chunte. CPU generation aur motherboard use fix karte hain. Purane cluster se upgrade plan karte waqt yaad rakho ki RAM DDR4 servers se DDR5 servers mein nahi ja sakti.
      </Callout>

      {/* ══════════ 8. CHANNELS ══════════ */}
      <h2 id="memory-channels" style={S.h2}>Memory Channels, Sockets and NUMA</h2>
      <p style={S.p}>CPU ke andar ka memory controller DIMMs se <strong>channels</strong> par baat karta hai. Har channel alag wires ka set hai, apni bandwidth ke saath. Aath channels ek channel se lagbhag aath guna bandwidth dete hain — agar sab populate hon.</p>
      <Figure caption="Fig 4 — CPU ke andar memory controller, chaar channels, har ek par do DIMM slots. Channels parallel kaam karte hain; ek channel ke DIMMs us channel ki bandwidth share karte hain."><DimmChannels /></Figure>
      <DiagramGuide
        title="Fig 4 ko kaise padhein"
        steps={[
          "Upar ka neela box CPU hai, apne built-in memory controller ke saath. Memory ab alag chip par nahi; seedha CPU se judti hai.",
          "Controller se chaar dashed lines chaar neele boxes tak jaati hain: Channel A, B, C aur D. Har channel alag data path hai. Real server CPUs mein 6, 8, 12 ya zyada hote hain.",
          "Har channel ke neeche do hare DIMM slots hain (DIMM 1 aur DIMM 2). Ye electrically ek hi channel par hain.",
          "Zaroori nateeja: channel mein doosra DIMM lagane se capacity badhti hai, bandwidth nahi. Bandwidth sirf zyada channels lagane se badhti hai.",
          "Peeli strip rule dohrati hai: channels symmetrically populate karo aur OEM guide follow karo, kyunki slot order aur allowed combinations platforms ke beech alag hote hain.",
        ]}
      />
      <h3 style={S.h3}>Sockets aur NUMA</h3>
      <p style={S.p}>2-socket server mein har CPU ke apne channels hote hain, to DIMM slots sockets ke beech bante hote hain. Socket 0 ke slots ki RAM NUMA node 0 ki hai; socket 1 ke slots ki node 1 ki. Doosre socket ki RAM tak pahunchne wale core ko extra latency deni padti hai (<TopicLink slug="cpu" variant="inline" /> article ka NUMA section dekho).</p>
      <p style={S.p}>Isliye <strong>RAM ko sockets mein barabar baanto</strong>. Saare DIMMs socket 0 mein ho to server chalega, par socket 1 ke cores sab kuch remote access karenge, aur uske channels idle rahenge.</p>
      <CodeBlock lang="bash" label="Linux — dekho memory NUMA nodes mein kaise failee hai">
{`numactl --hardware        # har node ki memory size aur free memory
numastat -m               # per-node meminfo
dmidecode -t memory | grep -E "Locator|Size|Speed|Type:|Rank|Manufacturer|Part"`}
      </CodeBlock>

      {/* ══════════ 9. CAPACITY VS BANDWIDTH ══════════ */}
      <h2 id="capacity-bandwidth" style={S.h2}>Memory Capacity vs Bandwidth</h2>
      <p style={S.p}><strong>Capacity</strong> matlab kitne gigabytes hain. Working set fit na ho to OS swap karna shuru kar deta hai aur performance girti hai.</p>
      <p style={S.p}><strong>Bandwidth</strong> matlab CPU memory kitni tez padh-likh sakta hai. Bandwidth limit ho to bahut RAM free hone par bhi cores data ka intezaar karte rehte hain.</p>
      <ComparisonTable
        title="Theoretical Peak Bandwidth (per socket)"
        headers={["Memory", "Per channel", "8 channels", "12 channels"]}
        rows={[
          ["DDR4-3200", "25.6 GB/s", "204.8 GB/s", "—"],
          ["DDR5-4800", "38.4 GB/s", "307.2 GB/s", "460.8 GB/s"],
          ["DDR5-5600", "44.8 GB/s", "358.4 GB/s", "537.6 GB/s"],
        ]}
        caption="Peak = MT/s × 8 bytes × channels. Achieved bandwidth kam hoti hai (STREAM-type tests mein aksar 70–90%). Speeds CPU, DIMMs per channel aur OEM rules par depend karti hain."
      />
      <h3 style={S.h3}>Ek kaam ka ratio: GB/s per core</h3>
      <p style={S.p}>12 channels DDR5-4800 wale 96-core CPU ka peak ~460 GB/s hai, yaani lagbhag 4.8 GB/s per core. 8 channels wale 32-core CPU ka ~307 GB/s, lagbhag 9.6 GB/s per core. Bandwidth-bhukhe software (analytics, HPC) ko ye fark mehsoos hota hai, chahe dono CPUs "powerful" dikhein.</p>
      <Callout type="common-mistake" title="'RAM badhayi par tez nahi hua'">
        Capacity tabhi madad karti hai jab aapki RAM khatam ho rahi thi. Agar bottleneck bandwidth ya latency tha, to usi tarah ki aur RAM se kuch nahi badalta — aur kuch platforms par doosre-slot positions (2 DIMMs per channel) bharne se supported speed kam bhi ho sakti hai.
      </Callout>

      {/* ══════════ 10. POPULATION ══════════ */}
      <h2 id="dimm-population" style={S.h2}>DIMM Population Rules</h2>
      <p style={S.p}>Population matlab kaun se slots mein kaun se DIMMs lagte hain. Unexplained slow server ki ye sabse common wajah hai.</p>
      <Figure caption="Fig 5 — Same dikhne wale memory totals, bahut alag natije: balanced 8-channel population, capacity-matched par channel-starved layout, aur uneven 6-DIMM layout."><DimmPopulation /></Figure>
      <DiagramGuide
        title="Fig 5 ko kaise padhein"
        steps={[
          "Har panel ek socket hai jisme aath channels A se H tak. Hare boxes installed DIMMs hain; dashed grey boxes khali channels.",
          "Case 1 (left, green frame): 8 × 64 GB = 512 GB. Har channel mein DIMM hai, isliye aathon channels traffic le jaate hain — poori bandwidth aur saaf interleave.",
          "Case 2 (middle, red frame): 4 × 128 GB bhi 512 GB hai, par sirf chaar channels use ho rahe hain. Capacity same dikhti hai, par peak bandwidth lagbhag aadhi.",
          "Case 3 (right, red frame): 6 DIMMs chhe channels bharte hain. Do channels idle hain aur memory addresses unevenly interleave hote hain, jisse effective bandwidth kam hoti hai.",
          "Sabak: RAM kharidte waqt total GB ke saath DIMMs ki ginti bhi batao. Bandwidth matter kare to saare channels mein failaye hue zyada, chhote DIMMs prefer karo.",
        ]}
      />
      <Callout type="warning" title="OEM manual har rule of thumb ko override karta hai">
        Slot colours, fill order, per channel maximum DIMMs, 2 DIMMs per channel par speed reduction, mixed-capacity rules aur rank limits platform-specific hote hain. Har server model ke liye OEM population guide ya configurator use karo.
      </Callout>
      <h3 style={S.h3}>General principles</h3>
      <ul style={S.ul}>
        <li><strong>Pehle saare channels bharo</strong>, phir capacity chahiye to hi har channel mein doosra DIMM lagao.</li>
        <li>Har channel par <strong>identical DIMMs</strong> (same size, speed, rank, type). Channels ke beech matching bandwidth ke liye aur bhi zaroori hai.</li>
        <li><strong>Sockets ke beech balance</strong>. Har CPU ko same DIMM layout milna chahiye.</li>
        <li><strong>Mixed speeds</strong>: poora system aam taur par sabse slow speed par chalta hai. Mix karne se bacho.</li>
        <li><strong>2 DIMMs per channel (2DPC)</strong> aksar 1DPC se supported speed kam kar deta hai.</li>
        <li>RDIMM aur LRDIMM, DDR generations, ya ECC aur non-ECC <strong>mix mat karo</strong>.</li>
        <li>OEM list ke <strong>qualified part numbers</strong> use karo.</li>
      </ul>
      <CodeBlock lang="text">
{`Example (illustrative): 2-socket server, per socket 12 channels, 1DPC
  Option A : 24 × 64 GB DIMM  = 1.5 TB   saare 24 channels used  → best bandwidth
  Option B : 12 × 128 GB DIMM = 1.5 TB   sirf 12 channels used   → aadhe channels idle
  Option C : 24 × 128 GB DIMM = 3.0 TB   saare channels used     → capacity + bandwidth

Upgrade path: aaj option A lo aur baad mein har channel mein doosra DIMM jodo
(agar platform acceptable speed par allow karta hai).`}
      </CodeBlock>

      {/* ══════════ 11. RAS ══════════ */}
      <h2 id="ras-scrubbing" style={S.h2}>RAS, Scrubbing, Sparing and Mirroring</h2>
      <p style={S.p}>RAS — Reliability, Availability, Serviceability — wo features hain jo memory errors ko outage ki jagah log line bana dete hain. Ye zyadatar dikhte nahi, isiliye keemti hain.</p>
      <h3 style={S.h3}>Scrubbing</h3>
      <p style={S.p}>Kam padhi jaane wali memory mein errors jama ho sakte hain: aaj ek bit flip, agle hafte doosra — ab double-bit error ban gaya jise ECC theek nahi kar sakta. <strong>Patrol scrubbing</strong> background mein saari memory padhta hai aur single-bit errors jaldi theek karta hai. <strong>Demand scrubbing</strong> normal read ke dauran error milne par corrected value wapas likhta hai.</p>
      <h3 style={S.h3}>Sparing, mirroring aur repair</h3>
      <ComparisonTable
        title="Advanced Memory RAS Features (platform dependent)"
        headers={["Feature", "Kaise kaam karta hai", "Trade-off"]}
        rows={[
          ["Rank / DIMM sparing", "Ek spare rank reserve hota hai. Active rank par errors threshold paar karein to data spare par chala jaata hai.", "Spare ki capacity khoti hai"],
          ["Memory mirroring", "Data ki do copies alag DIMMs/channels mein. Ek side poori fail ho sakti hai.", "Usable capacity lagbhag aadhi"],
          ["SDDC / chipkill-class ECC", "Data aise failaya jaata hai ki poora failed DRAM chip correct ho sake.", "Platform/DIMM-width requirements"],
          ["Post-package repair (PPR)", "Failing rows chip ke andar spare rows par remap hoti hain.", "Limited spare rows; boot ya runtime par apply"],
          ["Page retirement (OS)", "OS us physical page ko use karna band kar deta hai jis par errors aaye.", "Chhoti capacity loss; OS support chahiye"],
          ["Address range mirroring", "Sirf critical areas mirror (jaise hypervisor).", "Full mirroring se kam capacity loss"],
        ]}
        caption="Availability CPU, firmware aur OS par depend karti hai. Mirroring ya sparing enable karne se usable capacity badalti hai — plan karo."
      />
      <Callout type="best-practice" title="RAS features soch-samajhkar use karo">
        Mirroring bahut critical single hosts ke liye theek hai jinhe cluster nahi kiya ja sakta. Zyadatar data centers clustering aur fast failover ke saath ECC + scrubbing prefer karte hain, kyunki mirroring aadhi RAM barbaad karti hai. Ise documented design decision banao, BIOS profile ka ittefaq nahi.
      </Callout>

      {/* ══════════ 12. OS MEMORY ══════════ */}
      <h2 id="os-memory" style={S.h2}>How the OS Uses Memory: Cache, Swap, Huge Pages, OOM</h2>
      <p style={S.p}>Engineers 90% memory usage dekhkar ghabra jaate hain. Linux par ye aksar theek hota hai, kyunki OS spare RAM ko <strong>file cache</strong> ki tarah use karta hai aur applications maangein to wapas de deta hai. Sahi number <strong>available</strong> hai, <strong>free</strong> nahi.</p>
      <Figure caption="Fig 6 — Linux memory padhna: applications ki used, reclaimable buff/cache, free, aur 'available' estimate; saath mein healthy aur danger signs."><LinuxMemoryView /></Figure>
      <DiagramGuide
        title="Fig 6 ko kaise padhein"
        steps={[
          "Badi bar server ki total RAM hai, teen rangeen hisson mein bati hui.",
          "Laal: applications ki used memory. Kernel ise swap kiye ya kuch maare bina wapas nahi le sakta.",
          "Amber: buffers aur page cache — haal hi mein padhi ya likhi files. Application ko memory chahiye to OS ise turant chhod sakta hai, to ye lagbhag 'free' hai.",
          "Green: sach-much free memory. Bar ke neeche green bracket AVAILABLE = free + reclaimable cache dikhata hai. Wahi safe-to-use amount hai.",
          "Left box healthy signs batata hai: low 'free' par high 'available', steady swap, koi OOM message nahi. Right box danger signs: available ghat raha, constant swap-in/out, load badhna, OOM-kill messages.",
          "Ise decision tool ki tarah use karo: agar right-hand signs nahi hain, to high 'used' percentage incident nahi hai.",
        ]}
      />
      <CodeBlock lang="bash" label="Linux — 5 commands mein memory health">
{`free -h                          # 'available' column dekho
vmstat 2 5                       # si/so = per second swap in/out (~0 hona chahiye)
cat /proc/meminfo | head -20     # MemTotal, MemAvailable, Cached, SwapTotal, HugePages_*
dmesg -T | grep -i "out of memory\|oom"   # OOM killer events
sar -r 5 3                       # %memused aur %commit time ke saath (sysstat)`}
      </CodeBlock>
      <h3 style={S.h3}>Swap, OOM killer aur cgroups</h3>
      <p style={S.p}><strong>Swap</strong> disk space hai jo emergency memory ki tarah use hoti hai. Ye RAM se hazaron guna slow hai. Kam-use pages ke liye thoda swap theek hai; lagataar swapping (si/so non-zero) ka matlab working set fit nahi ho raha aur server "thrash" kar raha hai.</p>
      <p style={S.p}>Memory aur swap khatam hone par Linux <strong>OOM killer</strong> system bachane ke liye ek process maar deta hai. Aksar sabse bada chunta hai — jaise aapka database. Containers mein cgroup limits host mein free memory hote hue bhi OOM kill kar sakti hain.</p>
      <h3 style={S.h3}>Huge pages aur NUMA</h3>
      <p style={S.p}>Normal pages 4 KB ke hote hain. Bade databases aur VMs lakhon use karte hain, aur CPU ka address-translation cache (TLB) saath nahi de paata. <strong>Huge pages</strong> (2 MB ya 1 GB) is overhead ko kam karte hain. Oracle aur PostgreSQL jaise databases aur hypervisors aksar inhe recommend karte hain. Inhe pehle se reserve karna padta hai aur ye swappable nahi hote, to dhyan se size karo.</p>
      <p style={S.p}>Linux <strong>Transparent Huge Pages (THP)</strong> bhi automatically use kar sakta hai; kuch databases latency spikes ki wajah se ise band karne ko kehte hain. Application vendor ki guidance follow karo.</p>

      {/* ══════════ 13. VIRTUALISATION ══════════ */}
      <h2 id="memory-virtualisation" style={S.h2}>Memory in Virtualisation</h2>
      <p style={S.p}><TopicLink slug="virtualization" variant="inline" /> mein hypervisor har VM ko "guest physical" memory ka block deta hai aur use real RAM par map karta hai. CPU ke ulat, memory ko time slices mein share karna mushkil hai: ek VM ka use kiya hua byte usi pal doosre VM ke kaam nahi aa sakta. Isliye virtual cluster mein memory aksar sabse pehle khatam hone wala resource hai.</p>
      <ComparisonTable
        title="Hypervisor Memory-Saving Techniques (naam aur behaviour product ke hisaab se alag)"
        headers={["Technique", "Kya karta hai", "Risk / note"]}
        rows={[
          ["Memory reservation", "VM ko real RAM guarantee karta hai", "Flexibility kam; critical VMs ki performance pakki"],
          ["Ballooning", "Guest ka driver guest OS se unused memory chhodne ko kehta hai taaki host reuse kare", "Guest ko sach mein chahiye ho to wo andar swap kar sakta hai"],
          ["Page sharing (TPS/KSM)", "Identical pages ek baar store hote hain", "Large pages ke saath fayda kam; inter-VM sharing security ke liye aksar disabled"],
          ["Compression", "Swap karne se pehle pages compress", "CPU cost; disk swap se behtar"],
          ["Hypervisor swapping", "Host VM memory ko disk par swap karta hai", "Aakhri raasta; bahut slow — overcommit ka sanket"],
          ["Dynamic Memory (Hyper-V)", "VM RAM minimum aur maximum ke beech badalti hai", "Jin databases ko start par cache size karna hota hai unke liye theek nahi"],
        ]}
        caption="Technique ke naam VMware, Hyper-V aur KVM ke liye alag hain. Apne platform ki documentation dekho."
      />
      <Callout type="danger" title="Memory overcommit CPU overcommit se zyada risky hai">
        CPU overcommit ho to VMs slow hote hain. Memory overcommit ballooning aur compression ki seema se aage jaaye to host swapping shuru kar deta hai aur saare VMs ek saath freeze ho sakte hain. Production mein kai teams critical VMs ke liye memory ko 1:1 ke paas rakhti hain aur reservations use karti hain.
      </Callout>
      <p style={S.p}>NUMA bhi yaad rakho: ek NUMA node ki memory se bada VM sockets mein failega. Bade VMs ko jahan possible ho ek node ki RAM mein fit hone layak size karo, aur vNUMA par asar samjhe bina bade VM mein memory hot-add mat karo.</p>

      {/* ══════════ 14. CAPACITY PLANNING ══════════ */}
      <h2 id="capacity-planning" style={S.h2}>Capacity Planning and Sizing</h2>
      <p style={S.p}>Memory sizing ke teen steps hain: working set pata karo, headroom jodo, phir aisa DIMM layout chuno jo channel rules bhi satisfy kare.</p>
      <CodeBlock lang="text">
{`Example A — virtual host
  6 hosts ka cluster, N+1 failure tolerance → 5 hosts usable
  VM demand: 120 VMs × 16 GB = 1,920 GB
  Hypervisor + management overhead (maan lo 5–8%) aur 15–20% headroom jodo
  Zarurat ≈ 1,920 × 1.3 ≈ 2,500 GB usable 5 hosts par → 500 GB per host
  Valid layout mein round karo: 2 sockets × 8 channels × 1 DIMM
  → 16 × 32 GB = 512 GB per host  (saare channels used)

Example B — database server
  Working set (hot data + indexes) = 300 GB
  Buffer pool target = working set × 1.25 = ~375 GB
  OS, connections, baaki = 10–15% → ~430 GB
  8 × 64 GB ki jagah 16 × 32 GB (512 GB) chuno, taaki saare channels use hon`}
      </CodeBlock>
      <p style={S.p}>RAM per core ka rule-of-thumb sirf starting point hai — general virtualisation aksar 4–8 GB per core ke aas-paas, in-memory databases aur analytics 8–16 GB per core ya usse zyada, par aapki measurement kisi bhi rule se behtar hai. Average nahi, peak memory use dekho, aur 6–12 mahine ka growth trend bhi.</p>
      <Callout type="best-practice" title="Wo layout kharido jo badh sake">
        Abhi saare channels mid-size DIMMs se bharo taaki baad mein doosra set jod sako, na ki kuch giant DIMMs jo upgrades rok dein aur bandwidth bhookhi rakhein. Us path ko plan karne se pehle apne platform par 2DPC speed penalty check karo.
      </Callout>

      {/* ══════════ 15. POWER & COOLING ══════════ */}
      <h2 id="power-cooling" style={S.h2}>Power, Heat and Airflow of Memory</h2>
      <p style={S.p}>RAM sirf capacity nahi hai — ye power bhi khinchti hai aur heat bhi banati hai. Ek DIMM capacity, ranks, speed aur load ke hisaab se kuch watts se lekar das watts se zyada tak le sakta hai. 24 ya 32 DIMMs wala server sirf memory par sau-sau watts kharch kar sakta hai, kabhi CPU ke barabar.</p>
      <CodeBlock lang="text">
{`Sirf illustrative:
  32 DIMMs × ~8–12 W each ≈ 256–384 W ek server mein memory ke liye
  Rack mein aise 40 servers ≈ sirf RAM se 10–15 kW

Measured values use karo: BMC power telemetry, vendor power calculators
aur rack PDU readings — fixed 'watts per GB' number nahi.`}
      </CodeBlock>
      <p style={S.p}>DIMMs fans ke theek peeche aur CPUs ke aage ya bagal mein airflow path mein hote hain. High-density, high-speed DIMMs garam chalte hain. High temperature par DRAM refresh badhta hai, aur kai platforms DIMM temperature sensor threshold paar karne par memory throttle kar deti hain (speed ya bandwidth kam). Ye error ki tarah nahi, unexplained slowness ki tarah dikhta hai.</p>
      <ul style={S.ul}>
        <li><strong>Airflow shroud / baffle</strong> lagi honi chahiye taaki hawa sach mein DIMMs aur phir CPU heatsink par se guzre.</li>
        <li><strong>Blanking panels aur khali DIMM slots:</strong> OEMs kabhi-kabhi unused slots mein DIMM blanks maangte hain sahi airflow ke liye; guide follow karo.</li>
        <li><strong>Inlet temperature:</strong> cold-aisle ka high temperature seedha memory ka thermal margin kam karta hai. <TopicLink slug="airflow-management" variant="inline" /> aur <TopicLink slug="containment" variant="inline" /> dekho.</li>
        <li><strong>Monitoring:</strong> kai servers BMC ke zariye per-DIMM temperature dete hain. Uspar alert lagao.</li>
      </ul>
      <Callout type="important" title="Memory choice rack power badal deta hai">
        Same capacity ke liye 16 × 64 GB se 32 × 32 GB par jaane se DIMM count, power aur bandwidth badalte hain. Memory ko hamesha rack power calculation mein shaamil karo. Related: <TopicLink slug="pdu" variant="inline" />.
      </Callout>

      {/* ══════════ 16. BIOS ══════════ */}
      <h2 id="bios-settings" style={S.h2}>Important BIOS / UEFI Memory Settings</h2>
      <p style={S.p}>BIOS ki memory settings speed, reliability aur usable capacity badalti hain. Inhe build standard ka hissa maano aur server profile ya template mein store karo.</p>
      <ComparisonTable
        title="Common Memory-Related BIOS Settings"
        headers={["Setting", "Kya karta hai", "Typical guidance (OEM / workload ke hisaab se verify)"]}
        rows={[
          ["Memory operating mode", "Independent / mirror / sparing / lockstep modes", "Zyadatar ke liye Independent (optimizer); mirror ya spare sirf design decision se"],
          ["Memory speed / frequency", "Maximum DIMM speed jis par system train hoga", "Auto/maximum supported par chhodo; sirf troubleshooting mein kam karo"],
          ["Node interleaving", "Memory ko sockets mein uniformly failata hai (NUMA band)", "Aam taur par disabled; NUMA rakho"],
          ["Channel interleaving", "Addresses ko channels mein failata hai", "Enabled — bandwidth yahi banata hai"],
          ["Patrol scrub / demand scrub", "Background error correction", "Enabled"],
          ["Post-package repair (PPR)", "Failing rows repair karta hai", "OEM guidance ke hisaab se enable"],
          ["Memory refresh rate", "DRAM kitni baar refresh hoti hai", "Auto; OEM advice ke bina mat badlo"],
          ["Power-down / self-refresh modes", "Idle mein power bachata hai", "Performance profile latency ke liye disable kar sakta hai"],
          ["Memory encryption (TME / SME)", "RAM contents encrypt karta hai", "Security policy follow karo; chhoti performance cost"],
          ["Fast boot / POST par memory test", "Memory training/test skip ya run", "Production ke liye fast; naye/serviced hosts ke liye full test"],
        ]}
        caption="Naam OEM aur CPU vendor ke hisaab se alag hain. OEM tuning guide use karo."
      />
      <Callout type="danger" title="Replacement ke baad memory mode check karo">
        Mirrored ya spared mode chup-chaap usable RAM aadhi ya kam kar deta hai. BIOS reset se mode badal jaye to OS installed se 50% kam memory dikha sakta hai. BIOS profile ko healthy sibling server se compare karo.
      </Callout>

      {/* ══════════ 17. INSTALLATION ══════════ */}
      <h2 id="installation-replacement" style={S.h2}>DIMM Installation and Replacement</h2>
      <p style={S.p}>CPU-side components mein DIMMs sabse zyada badle jaate hain. Aasan lagta hai, par half-seated DIMM, galat slot ya static discharge ghanton ki troubleshooting karwa deta hai.</p>
      <h3 style={S.h3}>Shuru karne se pehle</h3>
      <p style={S.p}>Change ticket, BMC log se failing slot, aur existing DIMMs ke <strong>same type, speed aur capacity</strong> wala OEM-qualified replacement lo. Workload drain ya migrate karo. Platform hot-plug memory support karta ho (rare) to wo special procedure follow karo; warna power band karo.</p>
      <CodeBlock lang="text">
{`1. Gracefully shut down; workload migrate/evacuate karo
2. SAARI power cords (dono PSUs) nikalo; standby LEDs bujhne tak ruko
3. ESD wrist strap lagao, chassis ground se jodo
4. Server ko rails par bahar kheencho; top cover aur air shroud hatao
5. BMC log / diagnostic LED / slot map label se failed DIMM slot pehchano
6. Dono ejector latches bahar dabao; DIMM ko edges se seedha upar uthao
7. Naye DIMM ka label purane se compare karo (type, rank, speed, part no.)
8. Key notch ko slot key se align karo; tedha mat daalo
9. Dono ends par barabar dabav se tab tak dabao jab tak latches click na karein
10. Dono latches poori tarah band hain aur DIMM padosiyon ke barabar level hai — check karo
11. Shroud, cover lagao; power jodo; BIOS / lifecycle controller tak boot karo
12. Total memory, speed aur BMC log mein koi error nahi — verify karo; ticket mein record`}
      </CodeBlock>
      <ul style={S.ul}>
        <li>Sirf <strong>edges se pakdo</strong>. Gold contacts ya chips ko mat chhuo.</li>
        <li><strong>Kabhi zabardasti nahi.</strong> Firm, even pressure se na jaye to notch aur orientation check karo.</li>
        <li>OEM guide ka <strong>sahi slot order</strong> use karo. Galat slot mein DIMM ignore ho sakta hai.</li>
        <li><strong>Purana DIMM</strong> anti-static packaging mein rakho aur serial aur slot ke saath RMA ke liye label karo.</li>
        <li>Naye DIMM ki speed ya type baaki ke saath <strong>mix mat karo</strong>.</li>
      </ul>
      <Callout type="warning" title="Half-seated DIMMs ghost faults banate hain">
        1–2 mm ooncha baitha DIMM kuch din chal sakta hai aur vibration ya thermal cycling ke baad drop ho jaata hai, random errors aur 'installed se kam memory' deta hai. Dono latches check karo aur padosi DIMMs se height visually compare karo.
      </Callout>

      {/* ══════════ 18. TESTING ══════════ */}
      <h2 id="testing-commissioning" style={S.h2}>Testing and Commissioning</h2>
      <p style={S.p}>Naye aur serviced servers ko production se pehle apni memory prove karni chahiye. Large-memory servers POST mein kai minute le sakte hain jab memory train aur test hoti hai — ye normal hai, par time ko baseline ke roop mein record karo.</p>
      <CodeBlock lang="bash" label="Commissioning checks (Linux)">
{`# 1. Kya installed hai aur kya active hai
dmidecode -t memory | grep -E "Locator:|Size:|Speed:|Configured|Rank|Part Number|Manufacturer"
free -h ; lscpu | grep -i numa ; numactl --hardware

# 2. Har socket par same DIMM layout?  Saare DIMMs same speed par?

# 3. Bandwidth baseline (host ke liye compile kiya STREAM benchmark)
./stream_c.exe

# 4. Tay samay tak memory stress karo, temperature aur errors dekhte hue
stress-ng --vm 0 --vm-bytes 80% --vm-method all --timeout 3600s --metrics-brief
ipmitool sdr type temperature

# 5. Test ke baad: koi errors?
sudo ras-mc-ctl --summary
dmesg -T | grep -iE "edac|mce|memory error"
ipmitool sel elist | tail

# Optional offline: full pattern test ke liye memtest86+ / OEM diagnostics`}
      </CodeBlock>
      <ComparisonTable
        title="Commissioning Acceptance Criteria (example — apne khud ke set karo)"
        headers={["Check", "Pass condition"]}
        rows={[
          ["Installed vs recognised", "Total GB planned capacity ke barabar"],
          ["Population", "Design se match; sockets aur channels mein balanced"],
          ["Speed", "Saare DIMMs expected speed par, koi unexpected downclock nahi"],
          ["Bandwidth baseline", "CPU/memory config ke expected range ke andar (sibling se compare)"],
          ["Stress run", "Koi error nahi; DIMM temperature stable aur OEM limit ke neeche"],
          ["Error counters", "Koi UCE nahi; CE count zero ya explained"],
          ["BIOS memory mode", "Standard se match (independent, scrub on, NUMA on)"],
        ]}
        caption="Results save karo — wahi troubleshooting ka baseline banenge."
      />

      {/* ══════════ 19. MONITORING ══════════ */}
      <h2 id="monitoring" style={S.h2}>Memory Monitoring</h2>
      <p style={S.p}>Do layers monitor karo: <strong>hardware layer</strong> (errors, DIMM health, temperature — BMC aur EDAC se) aur <strong>OS/application layer</strong> (available memory, swap, OOM).</p>
      <ComparisonTable
        title="Kya Monitor Karein"
        headers={["Metric", "Source", "Action"]}
        rows={[
          ["Per DIMM correctable errors (rate aur trend)", "BMC SEL, rasdaemon, edac-util", "Ek DIMM par badh rahe → replacement plan karo"],
          ["Uncorrectable errors", "BMC SEL, MCE log", "Turant: replace, investigate"],
          ["DIMM temperature", "BMC sensors", "High → airflow, shroud, inlet temp, fan"],
          ["MemAvailable", "OS agent", "Girta trend → capacity risk"],
          ["Swap in/out rate", "vmstat, sar", "Lambe time non-zero → working set RAM se bada"],
          ["OOM-kill events", "kernel log", "Service impact; limits aur sizing review"],
          ["Hypervisor ballooning / swapping", "vCenter, esxtop, host metrics", "Host memory overcommit"],
          ["Installed vs recognised DIMMs", "Inventory / BMC", "DIMM missing = hardware ya seating issue"],
        ]}
        caption="Sirf thresholds par nahi, trends par alert lagao."
      />
      <CodeBlock lang="bash">
{`sudo ras-mc-ctl --summary            # per-DIMM error counts
sudo ras-mc-ctl --errors             # location ke saath error detail
edac-util -v                         # EDAC driver view (agar installed)
ls /sys/devices/system/edac/mc/      # raw controller aur csrow/dimm counters`}
      </CodeBlock>
      <p style={S.p}>Fleet-wide dashboards ke liye <TopicLink slug="dcim" variant="inline" /> ya apna monitoring stack use karo, aur facility alarms <TopicLink slug="bms" variant="inline" /> se jodo. Windows Server: Event Viewer system log, aur vendor tools (iDRAC, iLO, XClarity).</p>

      {/* ══════════ 20. MAINTENANCE ══════════ */}
      <h2 id="maintenance" style={S.h2}>Maintenance</h2>
      <ul style={S.ul}>
        <li><strong>Error trending:</strong> Correctable-error counts ka monthly review. DIMMs ko UCE banne se pehle policy par badlo.</li>
        <li><strong>Firmware:</strong> Memory-training fixes wale BIOS/microcode updates controlled batch process se lagao.</li>
        <li><strong>Airflow checks:</strong> Shrouds lage hon, filters saaf hon, blank panels fitted hon.</li>
        <li><strong>Spares:</strong> Har type aur speed ke kuch OEM-qualified spare DIMMs anti-static storage mein rakho.</li>
        <li><strong>Asset data:</strong> DIMM serial, slot, part number, firmware, install date record karo.</li>
        <li><strong>Standard layouts:</strong> Har server model ke liye ek DIMM layout document karo taaki replacement aur upgrade predictable rahein.</li>
        <li><strong>Memory-hog review:</strong> Applications mein leaks dekho; RAM badhane ki jagah source par theek karo.</li>
      </ul>
      <Callout type="maintenance" title="Ek time par ek hi change">
        Ek DIMM badlo, verify karo, phir aage badho. Ek window mein teen DIMMs aur BIOS version badal diye aur server POST nahi hua, to pata nahi chalega kaunsa change zimmedar hai.
      </Callout>

      {/* ══════════ 21. TROUBLESHOOTING ══════════ */}
      <h2 id="troubleshooting" style={S.h2}>DIMM Fault Isolation and Troubleshooting</h2>
      <p style={S.p}>Memory problems darawni lagti hain kyunki lakshan alag-alag hote hain: no POST, random reboots, missing capacity, slowness. Ek fixed flow aapko shaant rakhta hai.</p>
      <Figure caption="Fig 7 — Memory fault isolation flow: logs padho, symptom classify karo, DIMM aur slot swap karke isolate karo, DIMM vs slot vs CPU decide karo, phir test aur record."><MemoryTroubleshootFlow /></Figure>
      <DiagramGuide
        title="Fig 7 ko kaise padhein"
        steps={[
          "Hamesha upar se shuru karo: BMC event log aur POST code padho. Ye aksar exact slot aur correctable ya uncorrectable batata hai. Kuch bhi clear karne se pehle logs save karo.",
          "Chaar rangeen boxes symptom classes hain. Amber: server POST nahi hota. Green: OS ko installed se kam RAM dikh rahi. Purple: correctable errors badh rahe. Red: uncorrectable error, crash ya reboot.",
          "Har class ka pehla action andar likha hai — jaise no-POST ke liye reseat karo aur minimum configuration se boot karo, phir DIMMs ek-ek karke jodo.",
          "Chaaron raaste orange 'isolate' step par milte hain: suspect DIMM ko known-good se swap karo ya doosre slot mein le jao. Dekho problem DIMM ke saath jaati hai ya slot ke saath rehti hai.",
          "Blue box: error DIMM ke saath jaye to DIMM replace karo. Slot ke saath rahe to socket inspect karo aur OEM ko escalate karo, kyunki CPU memory channel ya board kharab ho sakta hai.",
          "Aakhri green box: memory test chalao, correctable-error trend dekho aur ticket mein sab record karo.",
        ]}
      />
      <h3 style={S.h3}>Server POST nahi ho raha (memory error)</h3>
      <p style={S.p}>ESD care ke saath saare DIMMs reseat karo. Minimum supported configuration se boot karo (manual ke hisaab se pehle slot mein ek DIMM). DIMMs ek-ek karke jodo. Sirf OEM-qualified DIMMs use karo. Virtual console se BIOS/BMC error code capture karo.</p>
      <h3 style={S.h3}>Installed se kam RAM</h3>
      <p style={S.p}><em>dmidecode</em> (kya installed hai) ko <em>free</em> ya BIOS (kya active hai) se compare karo. Wajah: auto-disabled failed DIMM, population rule violation, mirror/sparing mode, half-seated DIMM, ya reserved memory (jaise integrated graphics ya hardware ke liye).</p>
      <h3 style={S.h3}>Badhte correctable errors</h3>
      <p style={S.p}>Log se DIMM pehchano. Kuch isolated errors: monitor karo. Same DIMM par baar-baar errors: replacement schedule karo. Same slot mein naye DIMM par bhi errors aayein to slot ya CPU channel par shak karo.</p>
      <h3 style={S.h3}>Uncorrectable error ya crash</h3>
      <p style={S.p}>SEL aur OS crash record padho. Pehchane hue DIMM ko turant replace karo. Problem dohraye to slot vs CPU isolate karo. Failed DIMM ko logs ke saath RMA ke liye rakho.</p>
      <h3 style={S.h3}>Memory slow</h3>
      <p style={S.p}>Population symmetry aur speed (dmidecode "Configured Memory Speed"), DIMM temperature aur throttling, NUMA locality (numastat), BIOS mode check karo, aur sibling baseline se compare karne ke liye STREAM chalao.</p>
      <ComparisonTable
        title="Symptom → Likely Cause → First Check"
        headers={["Symptom", "Likely cause", "First check"]}
        rows={[
          ["No POST, memory LED/amber", "Half-seated ya failed DIMM", "BMC log; reseat; minimum config"],
          ["Aadhi RAM missing", "Mirror/sparing mode ya failed channel", "BIOS memory mode; dmidecode"],
          ["Speed DIMM rating se kam", "2DPC, mixed speeds, CPU limit", "Population guide; configured speed"],
          ["Random reboots + MCE", "Failing DIMM ya slot", "SEL, ras-mc-ctl location"],
          ["Sirf ek NUMA node par slow", "Imbalanced population", "numactl --hardware; DIMM layout"],
          ["DIMM par high temp warning", "Shroud missing / airflow issue", "Shroud, fans, inlet temp"],
          ["Host RAM free hote hue OOM kills", "cgroup/container limit", "Container memory limits"],
        ]}
        caption="Starting checklist. Final baat OEM diagnostic guide ki hai."
      />

      {/* ══════════ 22. FAILURE SCENARIOS ══════════ */}
      <h2 id="failure-scenarios" style={S.h2}>Real Failure Scenarios</h2>
      <p style={S.p}>Ye data centers mein dekhe gaye generic patterns hain, kisi ek site ki report nahi.</p>
      <h3 style={S.h3}>Scenario 1: Capacity upgrade jisne server ko slow kar diya</h3>
      <p style={S.p}><strong>Kya hua:</strong> Ek team ne har channel mein doosra DIMM jodkar RAM double ki. Applications slow ho gayi.</p>
      <p style={S.p}><strong>Root cause:</strong> 2 DIMMs per channel par platform ne memory speed kam kar di (aur naye DIMMs ka speed grade thoda alag tha).</p>
      <p style={S.p}><strong>Lesson:</strong> Upgrade se pehle platform ki speed-vs-population table padho. DIMM part numbers match karo.</p>
      <h3 style={S.h3}>Scenario 2: Correctable errors ignore hue</h3>
      <p style={S.p}><strong>Kya hua:</strong> Ek database host uncorrectable error se reboot hua. BMC log mein usi DIMM ke hafton ke correctable errors dikhe.</p>
      <p style={S.p}><strong>Root cause:</strong> CE counts ko koi trend nahi kar raha tha.</p>
      <p style={S.p}><strong>Lesson:</strong> Rate-of-change par alert lagao aur policy par replace karo.</p>
      <h3 style={S.h3}>Scenario 3: 'Memory leak' jo page cache nikla</h3>
      <p style={S.p}><strong>Kya hua:</strong> File server par alert aaya 95% memory used. Team ne RAM badhana shuru kiya.</p>
      <p style={S.p}><strong>Root cause:</strong> Wo file cache tha. 'Available' memory healthy thi aur swap idle.</p>
      <p style={S.p}><strong>Lesson:</strong> 'Used' par nahi, MemAvailable aur swap activity par alert lagao.</p>
      <h3 style={S.h3}>Scenario 4: Memory overcommit se cluster-wide freeze</h3>
      <p style={S.p}><strong>Kya hua:</strong> Host failure ke baad VMs doosre hosts par restart hue. Cluster ghisatne laga.</p>
      <p style={S.p}><strong>Root cause:</strong> Cluster mein N+1 ke liye spare memory thi hi nahi. Hosts ballooning aur swapping karne lage.</p>
      <p style={S.p}><strong>Lesson:</strong> Memory sirf normal operation ke liye nahi, failure case ke liye size karo.</p>
      <h3 style={S.h3}>Scenario 5: Half-seated DIMM se ghost faults</h3>
      <p style={S.p}><strong>Kya hua:</strong> Replacement ke baad ek server do hafte mein 'installed se kam memory' par aa gaya.</p>
      <p style={S.p}><strong>Root cause:</strong> DIMM poori tarah latch nahi hua tha aur thermal cycling ke baad khisak gaya.</p>
      <p style={S.p}><strong>Lesson:</strong> Latches aur height verify karo, phir stress test chalao aur 24 ghante baad logs dobara dekho.</p>
      <h3 style={S.h3}>Scenario 6: Shroud missing se memory throttling</h3>
      <p style={S.p}><strong>Kya hua:</strong> Ek server mein unexplained kam memory bandwidth aur intermittent warnings.</p>
      <p style={S.p}><strong>Root cause:</strong> Maintenance ke baad air shroud lagana bhool gaye. DIMMs garam ho gaye aur platform ne memory throttle ki.</p>
      <p style={S.p}><strong>Lesson:</strong> Har maintenance checklist mein 'shroud aur blanks fitted' jodo.</p>

      {/* ══════════ 23. PERSISTENT / CXL ══════════ */}
      <h2 id="persistent-cxl" style={S.h2}>Persistent Memory, CXL and Memory Tiers</h2>
      <p style={S.p}>Saalon tak memory ki duniya simple thi: ek taraf RAM, doosri taraf SSD. Nayi technologies in dono ke beech ka gap bharne ki koshish karti hain.</p>
      <ComparisonTable
        title="Plain DIMMs Ke Aage"
        headers={["Technology", "Idea", "Status / note"]}
        rows={[
          ["NVDIMM-N", "Battery/capacitor aur flash wali DRAM; power loss par data save", "Niche; write caches mein use"],
          ["Persistent memory (jaise Intel Optane PMem)", "Byte-addressable, persistent, DRAM se dense", "Product line wind-down ho chuki hai; purane fleets mein mil sakti hai"],
          ["CXL memory expansion (Type 3)", "PCIe/CXL lanes se jodi memory, extra NUMA node ki tarah dikhti hai", "Emerging; DIMM slots ke aage capacity deti hai, local DIMMs se zyada latency ke saath"],
          ["CXL memory pooling / sharing", "Kai hosts memory pool share karte hain", "Emerging; CXL version aur platform par depend"],
          ["HBM (on-package)", "Processor ke paas stacked DRAM, bahut high bandwidth", "GPUs/accelerators aur kuch CPUs par use"],
        ]}
        caption="Technology landscape tezi se badalta hai; current vendor support verify karo."
      />
      <p style={S.p}>Practical idea <strong>memory tiering</strong> hai: hot data fast local DRAM mein, warm data CXL memory mein, cold data NVMe par. Data ko achhi tarah rakhne ke liye OS aur applications ko tiers ka pata hona chahiye. Aaj ke engineer ke liye key ye hai ki CXL device ko alag NUMA node par extra capacity samjho jiski latency alag hai, 'tez RAM' nahi.</p>
      <Callout type="important" title="Aisi technology ke around plan mat karo jo kharidi na ja sake">
        Kisi bhi nayi memory type ke around design karne se pehle availability aur OEM support check karo. Kuch pehle ke products discontinue ho gaye, jisse owners ko service aur spare-part constraints jhelne pade.
      </Callout>

      {/* ══════════ 24. TIER III/IV ══════════ */}
      <h2 id="tier-iii-iv-view" style={S.h2}>Tier III and Tier IV View</h2>
      <p style={S.p}>Tier classification <strong>site</strong> ko describe karti hai — power paths, cooling aur maintainability — DIMM ko nahi. Par memory decisions tay karte hain ki compute layer us redundancy ka sach mein fayda utha sakti hai ya nahi.</p>
      <ComparisonTable
        title="Memory Decisions Site Design Se Kaise Jude Hain"
        headers={["Concern", "Normal industry view", "Data center view", "Tier III thinking", "Tier IV thinking"]}
        rows={[
          ["Capacity headroom", "RAM aaj ke load mein fit", "Cluster mein N+1 memory", "Ek host (ya ek power path ke hosts) maintenance ke liye nikal sakte hain aur VMs memory mein fir bhi fit rahein", "Fault + maintenance ke baad bhi critical services ke liye enough memory bache"],
          ["Power", "DIMMs ke watts", "Memory server watts ka bada hissa", "Path maintenance mein rack ek feed ki capacity ke andar rahe", "Fault ke baad bachi feed poora rack load uthaye"],
          ["Cooling / inlet temp", "Shroud aur fans", "Worst inlet par DIMM temperature limits", "Ek cooling unit ke maintenance mein margin", "Cooling fault mein margin"],
          ["Fault domains", "Ek server", "Memory-heavy cluster nodes racks/paths mein baanto", "Ek path ka maintenance bahut zyada memory na hataye", "Ek path ka fault bahut zyada memory na hataye"],
          ["Data protection", "ECC", "ECC + scrubbing; mirroring sirf design se", "Single-host mirroring nahi, availability ke liye clustering", "Wahi, domains ke paar fault-tolerant design ke saath"],
        ]}
        caption="Sirf conceptual mapping. Actual implementation project requirements, utility requirements, OEM design aur Data Center architecture par depend karti hai."
      />
      <p style={S.p}>Design philosophy: har jagah ECC aur scrubbing use karo, cluster memory failure case ke liye size karo, DIMM replacement ko standard, tested procedure banao, aur memory-heavy workloads ko independent power aur cooling paths mein failao. Related: <TopicLink slug="ups" variant="inline" />, <TopicLink slug="crac" variant="inline" />.</p>

      {/* ══════════ 25. SAFETY ══════════ */}
      <h2 id="safety-practices" style={S.h2}>Safety Practices</h2>
      <ul style={S.ul}>
        <li><strong>Power isolate karo:</strong> DIMMs chhune se pehle saari power cords nikalo (dual PSUs!). Standby power board ke kuch hisse live rakhti hai.</li>
        <li><strong>ESD:</strong> Chassis ground se wrist strap, spares ke liye anti-static bags; carpets aur synthetic kapdon se bacho.</li>
        <li><strong>Hot components:</strong> Shutdown ke baad DIMMs, heatsinks aur PMICs garam ho sakte hain — thanda hone do.</li>
        <li><strong>Mechanical:</strong> Bhaari servers ke liye server lift ya do-aadmi lift; server ko rail stop se aage mat kheencho.</li>
        <li><strong>Sharp edges:</strong> Chassis edges aur slot latches kaat sakte hain — jahan allowed ho gloves pehno.</li>
        <li><strong>Permit-to-work:</strong> Production rows ke liye change control follow karo.</li>
        <li><strong>Data security:</strong> Failed DIMMs aam taur par volatile hote hain, par kuch memory types persistent hoti hain. Kisi bhi persistent module ko RMA se pehle apni media-sanitisation policy follow karo.</li>
      </ul>

      {/* ══════════ 26. OEM ══════════ */}
      <h2 id="oem-reference" style={S.h2}>OEMs, Vendors and Qualified DIMMs</h2>
      <p style={S.p}>DRAM chips kuch hi manufacturers banate hain; DIMMs wo aur module makers banate hain; servers OEMs bechte hain. Production servers ke liye OEM ka qualified part number hi kharidte hain.</p>
      <ComparisonTable
        title="Server Memory Mein Kaun Kya Hai"
        headers={["Layer", "Examples", "Aap iska kya karte ho"]}
        rows={[
          ["DRAM chip makers", "Samsung, SK hynix, Micron", "Servers ke liye aam taur par seedha nahi kharidte"],
          ["Module vendors / OEM-branded DIMMs", "Dell, HPE, Lenovo, Supermicro-qualified modules; Kingston jaise module makers aur aur", "OEM-qualified part number kharido"],
          ["Server OEMs", "Dell PowerEdge, HPE ProLiant, Lenovo ThinkSystem, Supermicro, Cisco UCS", "Population guide, memory configurator, thermal aur speed tables"],
          ["Tools", "iDRAC, iLO, XClarity, Redfish", "Memory inventory, health, error logs"],
        ]}
        caption="Naam waqt ke saath badalte hain; OEM ki current documentation use karo."
      />
      <Callout type="best-practice" title="Qualified vs third-party DIMMs">
        Third-party DIMMs sasti aur kabhi-kabhi kaam karti hain, par unqualified modules warnings la sakte hain, support kho sakte hain ya instability de sakte hain. Production ke liye qualified part number kharido, usi ka spare stock rakho, aur OEM allow na kare to ek channel mein alag manufacturers mix mat karo.
      </Callout>

      {/* ══════════ 27. MISCONCEPTIONS ══════════ */}
      <h2 id="misconceptions" style={S.h2}>Common Misconceptions</h2>
      <ComparisonTable
        title="Myths vs Reality"
        headers={["Myth", "Reality"]}
        rows={[
          ["High memory usage matlab problem", "Linux mein cache spare RAM bhar deta hai. Available memory, swap aur OOM dekho."],
          ["Zyada RAM hamesha tez karti hai", "Tabhi jab capacity limit thi. Channels, speed aur NUMA aksar zyada matter karte hain."],
          ["Koi bhi DDR5 DIMM chalega", "Type, rank, speed, ECC aur OEM qualification matter karte hain."],
          ["Per channel 2 DIMMs bas RAM double karte hain", "Kuch platforms par memory speed kam ho sakti hai."],
          ["DDR5 on-die ECC ECC DIMMs ki jagah le leta hai", "On-die ECC internal hai; server ECC DIMMs data bus ko protect karte hain."],
          ["Correctable errors harmless hain", "Badhta trend failure predict karta hai; ye early warning hai."],
          ["RAM reboot ke baad bhi data rakhti hai", "Ye volatile hai; sirf persistent memory types alag hain."],
          ["Swap RAM ka substitute hai", "Swap kahin slow hai; constant swapping performance emergency hai."],
        ]}
        caption="Mental models jaldi theek karo."
      />

      {/* ══════════ 28. FUTURE ══════════ */}
      <h2 id="future-trends" style={S.h2}>Future Trends</h2>
      <ul style={S.ul}>
        <li><strong>Tez DDR5 aur MRDIMM:</strong> Multiplexed ranks ke saath per channel zyada effective speed aur bandwidth.</li>
        <li><strong>Per socket zyada channels:</strong> Zyada cores ko feed karne ke liye 12+ channels aur wider memory interfaces.</li>
        <li><strong>CXL memory:</strong> DIMM slots ke aage expansion, pooling aur tiering; memory rack-level resource ban jaati hai.</li>
        <li><strong>HBM aur on-package memory:</strong> AI/HPC ke liye bahut high bandwidth, ab CPUs aur accelerators par aa rahi hai. <TopicLink slug="gpu" variant="inline" /> aur <TopicLink slug="ai-gpu" variant="inline" /> dekho.</li>
        <li><strong>Servers mein low-power memory:</strong> Kuch designs mein per GB power kam karne ke liye LPDDR-based modules.</li>
        <li><strong>Stacked aur denser DRAM:</strong> Bade DIMMs ke liye 3D-stacked dies; per slot zyada heat.</li>
        <li><strong>Memory encryption aur confidential computing:</strong> Hardware-encrypted RAM, tenants ko host se isolate karti hai.</li>
        <li><strong>Behtar telemetry aur predictive failure:</strong> Fleet analytics error patterns se DIMM failure predict karti hai.</li>
        <li><strong>Liquid cooling mein memory bhi:</strong> Power badhne par DIMMs ko cover karne wale cold plates aur designs.</li>
      </ul>

      {/* ══════════ 29. LEARNING PATH ══════════ */}
      <h2 id="learning-path" style={S.h2}>Learning Path</h2>
      <ol style={S.ul}>
        <li><TopicLink slug="server-basics" variant="inline" /> — memory ke around poora server.</li>
        <li><TopicLink slug="cpu" variant="inline" /> — memory controllers, channels, cache aur NUMA.</li>
        <li><TopicLink slug="gpu" variant="inline" /> — GPU memory (HBM/GDDR) aur wo alag kyun hai.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — memory overcommit, ballooning aur VM sizing.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — dense shared-chassis compute mein memory.</li>
        <li><TopicLink slug="pdu" variant="inline" /> aur <TopicLink slug="airflow-management" variant="inline" /> — wo power aur cooling jis par memory nirbhar hai.</li>
      </ol>

      {/* ══════════ 30. INTERVIEW ══════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: ECC RAM kya hai aur servers mein kyun use hoti hai?</h3>
      <p style={S.p}><strong>Answer:</strong> ECC data ke saath extra check bits store karti hai. Read par controller unhe dobara compute karke compare karta hai, single-bit errors theek karta hai aur bade errors detect karta hai. Servers mein silent corruption acceptable nahi aur fleet scale par error rates matter karte hain, isliye ECC standard hai. Exact capability (SEC-DED, chipkill-class) platform dependent hai.</p>
      <h3 style={S.h3}>Q2: DIMM population galat ho to kya hota hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Unused channels ka matlab khoyi hui bandwidth; mixed speeds sabse slow speed force kar sakti hain; unsupported combinations ignore ya POST fail ho sakte hain. OEM population guide follow karo.</p>
      <h3 style={S.h3}>Q3: Channel mein doosra DIMM lagane se bandwidth badhti hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Nahi. Bandwidth per channel hoti hai. Doosra DIMM capacity badhata hai, aur supported speed bhi kam kar sakta hai. Bandwidth badhane ke liye zyada channels populate karo.</p>
      <h3 style={S.h3}>Q4: Linux 95% memory used dikha raha hai. Kya ye problem hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Apne aap mein nahi. 'Available', swap in/out rate aur OOM events check karo. High 'used' aksar reclaimable page cache hota hai.</p>
      <h3 style={S.h3}>Q5: RDIMM aur UDIMM mein difference?</h3>
      <p style={S.p}><strong>Answer:</strong> RDIMM mein register command/address signals buffer karta hai, jisse per channel zyada DIMMs aur zyada capacity allow hoti hai. UDIMM unbuffered hai, kam latency par limited scale. Dono mix nahi ho sakte.</p>
      <h3 style={S.h3}>Q6: DIMM ke correctable errors badh rahe hon to kya karoge?</h3>
      <p style={S.p}><strong>Answer:</strong> Logs se slot pehchano, trend dekho, policy ke hisaab se replacement schedule karo, qualified DIMM se swap karo aur monitor karo. Naya DIMM usi slot mein errors de to slot ya CPU channel par shak karo.</p>
      <h3 style={S.h3}>Q7: Virtualisation mein memory overcommit khatarnak kyun hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Physical RAM khatam hone par host balloon, compress aur aakhir mein VM memory swap karta hai, jisse saare VMs slow hote hain. N+1 failure ke liye size karo aur critical VMs ke liye reservations use karo.</p>
      <h3 style={S.h3}>Q8: "64GB 2Rx4 PC5-4800B-R" ko decode karo.</h3>
      <p style={S.p}><strong>Answer:</strong> 64 GB capacity, x4 chips ke saath dual rank, DDR5, 4800 MT/s speed grade B, registered DIMM.</p>

      {/* ══════════ 31. KEY TAKEAWAYS ══════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>RAM volatile working memory hai; DRAM cells leak karte hain aur constant refresh chahiye.</li>
        <li>Servers mein ECC standard hai; correctable errors trend karo aur uncorrectable banne se pehle policy par replace karo.</li>
        <li>RDIMM server standard hai; DIMM types ya DDR generations kabhi mix mat karo.</li>
        <li>Bandwidth channels se aati hai: peak = MT/s × 8 bytes × channels. Channel mein doosra DIMM capacity badhata hai, bandwidth nahi.</li>
        <li>RAM ko sockets aur channels mein barabar baanto; OEM population guide follow karo.</li>
        <li>'Used' ya 'free' nahi, 'available' memory, swap activity aur OOM logs padho.</li>
        <li>Virtualisation mein memory overcommit CPU overcommit se zyada risky hai; N+1 ke liye size karo.</li>
        <li>Memory asli power aur heat jodti hai; rack calculations mein shaamil karo aur shrouds lagaye rakho.</li>
        <li>Service ke baad BIOS memory mode, speed, latches aur logs verify karo; production se pehle test karo.</li>
        <li>OEM-qualified DIMMs use karo aur ek time par ek hi change karo.</li>
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
        <li><TopicLink slug="cpu" variant="inline" /> — Memory controllers, channels, cache aur NUMA.</li>
        <li><TopicLink slug="server-basics" variant="inline" /> — Poore server ka component overview.</li>
        <li><TopicLink slug="gpu" variant="inline" /> — Accelerator memory aur CPU-GPU relationship.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — vRAM allocation aur memory overcommit.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — Dense shared-chassis compute.</li>
      </ul>
    </>
  );
}
