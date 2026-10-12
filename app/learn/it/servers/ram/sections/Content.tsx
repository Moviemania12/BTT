"use client";
import { S, Callout, ComparisonTable, Figure, CodeBlock, DiagramGuide } from "../shared";
import TopicLink from "@/components/TopicLink";
import DramCellArray from "../svg/DramCellArray";
import EccFlow from "../svg/EccFlow";
import DimmAnatomy from "../svg/DimmAnatomy";
import DimmChannels from "../svg/DimmChannels";
import DimmPopulation from "../svg/DimmPopulation";
import LinuxMemoryView from "../svg/LinuxMemoryView";
import MemoryTroubleshootFlow from "../svg/MemoryTroubleshootFlow";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      {/* Quick Summary */}
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#14532d", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — Server RAM in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>What it is:</strong> RAM is the CPU's working memory — OS, applications, databases and VM memory all live here. Volatile: power off means data gone.</li>
          <li><strong>Why DRAM needs refresh:</strong> Each bit is a tiny capacitor that leaks. The controller refreshes it continuously.</li>
          <li><strong>ECC:</strong> Extra check bits let the controller correct single-bit errors and detect bigger ones. It is standard in servers.</li>
          <li><strong>DIMM types:</strong> RDIMM is the server standard. LRDIMM is for very high capacity. UDIMM is for desktops and small workstations. Never mix types.</li>
          <li><strong>Channels decide bandwidth:</strong> Peak = MT/s × 8 bytes × channels. DDR5-4800 ≈ 38.4 GB/s per channel. Empty channels mean lost bandwidth.</li>
          <li><strong>Capacity ≠ bandwidth:</strong> 512 GB in 4 big DIMMs and 512 GB in 8 smaller DIMMs have the same capacity but very different speed.</li>
          <li><strong>NUMA:</strong> RAM belongs to one socket. Spread it evenly across sockets.</li>
          <li><strong>RAS:</strong> Scrubbing, sparing, mirroring and chipkill-style schemes keep errors from becoming outages — platform dependent.</li>
          <li><strong>Operations:</strong> Trend correctable errors per DIMM, read "available" not "free", watch swap and OOM, use OEM-qualified DIMMs.</li>
          <li><strong>Golden rule:</strong> Follow the OEM population guide, change one thing at a time, and never ignore a rising correctable-error trend.</li>
        </ul>
      </div>

      {/* ══════════ 1. WHAT IS RAM ══════════ */}
      <h2 id="what-is-ram" style={S.h2}>What Is RAM? — Its Place in the Server</h2>
      <p style={S.p}>RAM (Random Access Memory) is the working desk of the <TopicLink slug="cpu" variant="inline" />. Whatever the CPU is using right now — operating system, applications, database buffers, virtual machine memory — is kept in RAM.</p>
      <p style={S.p}>Think of storage as a warehouse and RAM as the table in front of you. You can keep a lot in the warehouse, but you can only work fast on what is on the table. A bigger table does not make you smarter, but it saves you many trips to the warehouse.</p>
      <p style={S.p}><strong>Volatile:</strong> RAM needs power. Switch the server off and everything in RAM disappears. That is why databases write a log to disk before they confirm a transaction, and why a crash can lose unsaved work.</p>
      <ComparisonTable
        title="RAM vs Storage — Why Both Exist"
        headers={["Property", "RAM (DRAM)", "NVMe SSD", "HDD"]}
        rows={[
          ["Access time (order of magnitude)", "tens to ~100 ns", "tens of microseconds", "milliseconds"],
          ["Bandwidth per device (order)", "tens of GB/s per channel", "several GB/s", "~100–250 MB/s"],
          ["Persistent after power-off?", "No", "Yes", "Yes"],
          ["Cost per GB", "Highest", "Medium", "Lowest"],
          ["Role", "Working data now", "Fast persistent data", "Bulk capacity"],
        ]}
        caption="Ballpark comparison. Exact numbers depend on technology, generation and load."
      />
      <p style={S.p}>In a data center, RAM is also one of the biggest <strong>cost and power</strong> items of a server. Large servers can have 1–2 TB or more per socket. So choosing the right amount, speed and population is both a performance and a budget decision. Server context: <TopicLink slug="server-basics" variant="inline" />.</p>

      {/* ══════════ 2. DRAM BASICS ══════════ */}
      <h2 id="dram-basics" style={S.h2}>DRAM Basics: Cell, Row/Column and Refresh</h2>
      <p style={S.p}>Server memory is <strong>DRAM</strong> — Dynamic RAM. Each bit is stored in one tiny capacitor, controlled by one transistor. A charged capacitor means 1, an empty one means 0.</p>
      <p style={S.p}>The word "dynamic" is there because the capacitor slowly leaks. If nobody does anything, the bit fades away in milliseconds. So the memory controller sends <strong>refresh</strong> commands, thousands of times per second, to read and rewrite every row.</p>
      <Figure caption="Fig 1 — DRAM cell (one transistor + one capacitor), cells arranged in rows and columns inside a bank, the row buffer, and the three access steps: activate, read/write, precharge."><DramCellArray /></Figure>
      <DiagramGuide
        title="How to read Fig 1"
        steps={[
          "Top-left box: one DRAM cell. The transistor is a gate; the capacitor below it stores the charge. The bit line carries data in or out, and the word line switches the gate on.",
          "The red note shows the weakness: charge leaks, so the cell must be refreshed.",
          "Top-middle box: millions of such cells are laid out as a grid called a bank. One horizontal line of cells is a row (highlighted amber).",
          "Reading is done a whole row at a time. The row is copied into the row buffer (orange bar) made of sense amplifiers; then the needed column is picked from that buffer.",
          "Top-right box: the physical hierarchy — DIMM → rank → chips → bank groups → banks → rows/columns. Different banks can work in parallel, which hides some delay.",
          "Bottom row: the three steps of an access. ACTIVATE opens a row (delay tRCD). READ/WRITE moves the data (delay CL). PRECHARGE closes the row and gets ready for the next one (delay tRP). These are the timing numbers you see on a DIMM spec.",
        ]}
      />
      <p style={S.p}>A row read is <strong>destructive</strong>: sensing the charge drains it, so the data must be written back. That is why even a plain read has built-in write-back and precharge steps.</p>
      <p style={S.p}>Refresh has a cost: while a row is being refreshed, it cannot be accessed. Bigger-capacity chips need more refresh work, and high temperature makes the capacitor leak faster so refresh must happen more often. This is one hidden reason why hot DIMMs perform worse.</p>
      <Callout type="important" title="DRAM vs SRAM">
        CPU caches use SRAM, which needs 6 transistors per bit and no refresh — very fast but big and expensive. DRAM uses 1 transistor + 1 capacitor per bit — dense and cheap enough for gigabytes. That is the trade-off behind the cache/RAM split described in the <TopicLink slug="cpu" variant="inline" /> article.
      </Callout>

      {/* ══════════ 3. TIMINGS ══════════ */}
      <h2 id="dram-timings" style={S.h2}>Latency, Timings and Bandwidth</h2>
      <p style={S.p}>Two numbers describe memory performance, and people often mix them up. <strong>Latency</strong> is how long one access takes. <strong>Bandwidth</strong> is how much data moves per second when many accesses are in flight.</p>
      <p style={S.p}>A DIMM label shows a speed like DDR5-4800 (4800 MT/s — megatransfers per second) and timings like CL40. CL (CAS latency) is counted in memory clock cycles. Because DDR5 clocks are faster, a higher CL number does not automatically mean worse real time.</p>
      <CodeBlock lang="text">
{`Real latency (ns) ≈ CL × 2000 / MT/s     (CAS part only)

DDR4-3200 CL22 :  22 × 2000 / 3200 = 13.75 ns
DDR5-4800 CL40 :  40 × 2000 / 4800 = 16.67 ns
DDR5-6400 CL52 :  52 × 2000 / 6400 = 16.25 ns

Full load-to-use latency seen by a core (cache miss, controller,
fabric hop, DRAM) is much higher — typically 80–120 ns local.`}
      </CodeBlock>
      <p style={S.p}>Server memory runs at JEDEC-standard timings. Unlike gaming RAM, you do not overclock or tweak timings. Stability beats speed in a data center.</p>
      <ComparisonTable
        title="Latency vs Bandwidth — Which Workload Cares About What"
        headers={["Workload", "More sensitive to", "Why"]}
        rows={[
          ["OLTP database, key-value cache", "Latency", "Many small random accesses"],
          ["Analytics scans, HPC, AI host", "Bandwidth", "Large sequential or streaming access"],
          ["Virtualisation host", "Capacity first, then both", "Many VMs; capacity limits consolidation"],
          ["File/web server", "Capacity (cache)", "Hot data stays in OS page cache"],
        ]}
        caption="Generalisation. Always profile your own workload."
      />

      {/* ══════════ 4. ECC ══════════ */}
      <h2 id="ecc" style={S.h2}>ECC — Error-Correcting Code</h2>
      <p style={S.p}>Memory bits do flip, rarely. Causes: cosmic-ray particles, electrical noise, heat, ageing cells, marginal signal. In one server it is rare. In a fleet of thousands of servers with terabytes each, it happens every day.</p>
      <p style={S.p}>Without protection, a flipped bit can corrupt a database record or a program silently. No crash, no alarm — just wrong data. ECC (Error-Correcting Code) exists to stop exactly that.</p>
      <p style={S.p}>How it works: when the controller writes 64 bits of data, it computes 8 extra <strong>check bits</strong> from them and stores all 72 bits. When reading, it recomputes and compares. The difference (syndrome) points to the exact failing bit, which can be flipped back.</p>
      <Figure caption="Fig 2 — ECC write and read path: check bits are added on write; on read, the syndrome decides between no error, a corrected single-bit error (CE) or an uncorrectable error (UCE)."><EccFlow /></Figure>
      <DiagramGuide
        title="How to read Fig 2"
        steps={[
          "Top row (WRITE), left to right: CPU data → memory controller computes check bits → 72 bits (64 data + 8 check) are stored on the DIMM. That is why ECC DIMMs have extra chips.",
          "Second row (READ): the 72 bits come back, maybe with one bit flipped. The controller recomputes the check bits and compares them to the stored ones.",
          "The purple box 'syndrome' is the result of that comparison. It is a pattern that says which bit (if any) is wrong.",
          "Three arrows go to three outcomes. Green: no error, data passes. Amber: single-bit error — corrected on the fly and logged as a correctable error (CE). Red: multi-bit error — detected but not fixable, raised as a machine-check (UCE).",
          "The yellow strip at the bottom is the operational lesson: CEs are a warning, UCEs are the outage. Trend the CEs and replace the DIMM before it turns into UCEs.",
        ]}
      />
      <h3 style={S.h3}>Levels of protection</h3>
      <ComparisonTable
        title="ECC Levels (names vary by vendor; capability is platform dependent)"
        headers={["Level", "What it can do", "Notes"]}
        rows={[
          ["SEC-DED (basic ECC)", "Correct 1 bit, detect 2 bits in a word", "Classic server ECC"],
          ["SDDC / chipkill-class", "Survive failure of a whole DRAM chip on the DIMM", "Common in enterprise platforms; may need x4 DIMMs or specific modes"],
          ["On-die ECC (DDR5)", "Fixes errors inside the DRAM chip itself", "Not the same as DIMM-level ECC — does not replace ECC DIMMs"],
          ["Mirroring / sparing", "Duplicate or reserve memory to survive a DIMM fault", "Costs capacity; see RAS section"],
        ]}
        caption="Verify exact capability in the CPU and OEM documentation."
      />
      <Callout type="common-mistake" title="DDR5 'has ECC' — so I can use any DIMM?">
        DDR5 chips include on-die ECC to improve their own yield, but that is internal. A server still needs ECC DIMMs (extra data width) for end-to-end protection across the bus. Always use the DIMM type the OEM specifies.
      </Callout>
      <Callout type="important" title="ECC is platform-dependent">
        ECC works only if the CPU, board/BIOS and DIMM all support it. Check the OEM documentation. Enterprise servers use ECC by default.
      </Callout>

      {/* ══════════ 5. DIMM TYPES ══════════ */}
      <h2 id="dimm-types" style={S.h2}>DIMM Types — RDIMM, LRDIMM, UDIMM</h2>
      <p style={S.p}>A DIMM is a small module with DRAM chips. The type decides how many DIMMs a channel can carry and how fast.</p>
      <p style={S.p}>The challenge is electrical: the more DIMMs you hang on a channel, the more load on the signal. Buffer chips on the module reduce that load.</p>
      <ComparisonTable
        title="Server DIMM Types"
        headers={["Type", "Full name", "Buffering", "Typical use", "Notes"]}
        rows={[
          ["UDIMM", "Unbuffered DIMM", "None", "Desktops, entry servers, workstations", "Lowest latency; limited DIMMs per channel and capacity"],
          ["RDIMM", "Registered DIMM", "Command/address buffered (RCD)", "Mainstream server standard", "More DIMMs and more capacity per channel"],
          ["LRDIMM", "Load-Reduced DIMM", "Command/address + data buffered", "Very high capacity (older platforms especially)", "Slightly higher latency and power; less common on newer platforms because RDIMM capacities have grown"],
          ["MRDIMM", "Multiplexed-Rank DIMM", "Buffered, multiplexes two ranks", "Newer high-bandwidth server platforms", "Raises effective speed; needs supported CPU"],
          ["SO-DIMM / CAMM", "Small form factor", "—", "Laptops, edge boxes", "Rare in data center servers"],
        ]}
        caption="DIMM type support depends on CPU platform and motherboard. Never mix DIMM types in a server. Check the OEM compatibility list."
      />
      <Callout type="danger" title="Wrong DIMM type or generation">
        UDIMM and RDIMM cannot be mixed. DDR4 and DDR5 are physically keyed differently and will not fit — never force a DIMM into a slot. A DIMM that does not click in easily is probably the wrong one or the wrong way round.
      </Callout>

      {/* ══════════ 6. DIMM ANATOMY ══════════ */}
      <h2 id="dimm-anatomy" style={S.h2}>DIMM Anatomy, Ranks and Reading the Label</h2>
      <p style={S.p}>When you pull a DIMM out of a server, you can read a lot from its sticker. Knowing how to read it saves wrong orders and wrong replacements.</p>
      <Figure caption="Fig 3 — Server RDIMM anatomy and an example label decoded. DDR5 RDIMMs carry a PMIC on the module; every ECC DIMM carries extra DRAM chips."><DimmAnatomy /></Figure>
      <DiagramGuide
        title="How to read Fig 3"
        steps={[
          "The green board is the DIMM. The dark squares are DRAM chips — the actual memory. Front and back both carry chips.",
          "Look at the chip rows: every group of eight data chips has one extra chip. Those extra chips store the ECC check bits.",
          "The purple RCD (register/clock driver) buffers commands. This is what makes it a 'registered' DIMM and allows more DIMMs per channel.",
          "The orange PMIC is the on-module power-management chip found on DDR5. The blue SPD chip stores the DIMM's identity, size and timings, which BIOS reads at boot.",
          "At the bottom, the gold strip is the contact area — never touch it. The white notch is the key that stops you inserting the wrong generation.",
          "The label box at the very bottom decodes a typical sticker: 64GB 2Rx4 PC5-4800B-R = capacity, ranks × chip width, DDR5 speed grade, registered type.",
        ]}
      />
      <h3 style={S.h3}>Ranks and chip width</h3>
      <p style={S.p}>A <strong>rank</strong> is a set of chips that together fill the 64-bit (plus ECC) data bus. A single-rank (1R) DIMM has one set; dual-rank (2R) has two sets sharing the channel; quad-rank (4R) four. Ranks take turns, so while one rank is refreshing or precharging another can respond, which can improve efficiency. More ranks per channel also increases electrical load, which may limit speed.</p>
      <p style={S.p}><strong>x4 and x8</strong> describe how many data bits each chip contributes. x4 DIMMs use more chips and are commonly preferred where chipkill-class protection is wanted. x8 DIMMs use fewer chips and can be cheaper and lower power.</p>
      <ComparisonTable
        title="Reading a Label"
        headers={["Part", "Example", "Meaning"]}
        rows={[
          ["Capacity", "64GB", "Total usable data capacity (ECC chips not counted)"],
          ["Ranks × width", "2Rx4", "2 ranks, each chip x4"],
          ["Generation", "PC5 / PC4", "DDR5 / DDR4"],
          ["Speed", "4800", "MT/s (DDR5-4800)"],
          ["Grade letter", "B", "JEDEC timing grade"],
          ["Type", "R / L / E", "Registered / Load-reduced / Unbuffered ECC"],
          ["Part number", "Vendor-specific", "Use it for OEM compatibility lookups and ordering"],
        ]}
        caption="Label formats differ slightly between vendors. Use the OEM part number when ordering a replacement."
      />

      {/* ══════════ 7. DDR GENERATIONS ══════════ */}
      <h2 id="ddr-generations" style={S.h2}>DDR4 vs DDR5 and What Comes Next</h2>
      <p style={S.p}>DDR means <strong>Double Data Rate</strong>: data moves on both the rising and falling edge of the clock. Generations are not interchangeable — the notch position, voltage and signalling are different, so a DDR5 DIMM will not fit in a DDR4 slot.</p>
      <ComparisonTable
        title="DDR4 vs DDR5 in Servers"
        headers={["Aspect", "DDR4", "DDR5"]}
        rows={[
          ["Typical server speeds", "2133–3200 MT/s", "4800 MT/s and above (newer platforms go higher; MRDIMM higher still)"],
          ["Voltage", "1.2 V", "1.1 V"],
          ["Power management", "On the motherboard", "PMIC on every DIMM"],
          ["Channel structure per DIMM", "One 64-bit (72 with ECC) channel", "Two independent 32-bit (40 with ECC) sub-channels"],
          ["Burst length", "8", "16"],
          ["Banks", "16 (4 bank groups)", "32 (8 bank groups) — more parallelism"],
          ["On-die ECC", "No", "Yes (internal to the chip)"],
          ["Capacity per DIMM", "Up to 128–256 GB common", "Up to 256 GB and beyond on recent platforms (higher with 3DS stacking)"],
          ["Pins", "288", "288 (different key notch)"],
        ]}
        caption="Typical values; exact supported speeds and capacities depend on the CPU and platform."
      />
      <p style={S.p}>Why sub-channels matter: two independent 32-bit paths serve two requests at once, which improves efficiency for the many small requests that servers generate. Why on-DIMM PMIC matters: cleaner power at higher speed, but one more component that can fail and one more reason to buy OEM-qualified DIMMs.</p>
      <Callout type="best-practice" title="Platform decides the generation">
        You do not choose DDR4 or DDR5 freely. The CPU generation and motherboard fix it. When you plan an upgrade from an older cluster, remember RAM cannot be moved over from DDR4 servers to DDR5 servers.
      </Callout>

      {/* ══════════ 8. CHANNELS ══════════ */}
      <h2 id="memory-channels" style={S.h2}>Memory Channels, Sockets and NUMA</h2>
      <p style={S.p}>The memory controller inside the CPU talks to DIMMs over <strong>channels</strong>. Each channel is an independent set of wires with its own bandwidth. Eight channels deliver roughly eight times the bandwidth of one — if all are populated.</p>
      <Figure caption="Fig 4 — Memory controller inside the CPU, four channels shown with two DIMM slots each. Channels work in parallel; DIMMs on the same channel share its bandwidth."><DimmChannels /></Figure>
      <DiagramGuide
        title="How to read Fig 4"
        steps={[
          "The blue box at the top is the CPU with its built-in memory controller. Memory is no longer on a separate chip; it connects straight to the CPU.",
          "From the controller, four dashed lines go to four blue boxes: Channel A, B, C and D. Each channel is a separate data path. Real server CPUs have 6, 8, 12 or more.",
          "Under each channel there are two green DIMM slots (DIMM 1 and DIMM 2). They are electrically on the same channel.",
          "Important consequence: adding a second DIMM to a channel adds capacity, not bandwidth. Only adding more channels adds bandwidth.",
          "The yellow strip repeats the rule: populate channels symmetrically and follow the OEM guide, because slot order and allowed combinations differ between platforms.",
        ]}
      />
      <h3 style={S.h3}>Sockets and NUMA</h3>
      <p style={S.p}>In a 2-socket server, each CPU has its own set of channels, so the DIMM slots are split between sockets. RAM in socket 0's slots belongs to NUMA node 0; RAM in socket 1's slots to node 1. A core reaching the other socket's RAM pays extra latency (see the NUMA section of the <TopicLink slug="cpu" variant="inline" /> article).</p>
      <p style={S.p}>So <strong>distribute RAM equally across sockets</strong>. A 2S server with all DIMMs in socket 0 will run, but socket 1's cores will access everything remotely, and its channels sit idle.</p>
      <CodeBlock lang="bash" label="Linux — see how memory is spread across NUMA nodes">
{`numactl --hardware        # memory size and free memory per node
numastat -m               # per-node meminfo
dmidecode -t memory | grep -E "Locator|Size|Speed|Type:|Rank|Manufacturer|Part"`}
      </CodeBlock>

      {/* ══════════ 9. CAPACITY VS BANDWIDTH ══════════ */}
      <h2 id="capacity-bandwidth" style={S.h2}>Memory Capacity vs Bandwidth</h2>
      <p style={S.p}><strong>Capacity</strong> is how many gigabytes you have. If the working set does not fit, the OS starts swapping to disk and performance collapses.</p>
      <p style={S.p}><strong>Bandwidth</strong> is how fast the CPU can read and write memory. If bandwidth is the limit, cores sit waiting for data even when plenty of RAM is free.</p>
      <ComparisonTable
        title="Theoretical Peak Bandwidth (per socket)"
        headers={["Memory", "Per channel", "8 channels", "12 channels"]}
        rows={[
          ["DDR4-3200", "25.6 GB/s", "204.8 GB/s", "—"],
          ["DDR5-4800", "38.4 GB/s", "307.2 GB/s", "460.8 GB/s"],
          ["DDR5-5600", "44.8 GB/s", "358.4 GB/s", "537.6 GB/s"],
        ]}
        caption="Peak = MT/s × 8 bytes × channels. Achieved bandwidth is lower (often 70–90% in STREAM-type tests). Speeds depend on CPU, DIMMs per channel and OEM rules."
      />
      <h3 style={S.h3}>A useful ratio: GB/s per core</h3>
      <p style={S.p}>A 96-core CPU with 12 channels of DDR5-4800 has ~460 GB/s peak, i.e. about 4.8 GB/s per core. A 32-core CPU with 8 channels has ~307 GB/s, about 9.6 GB/s per core. Bandwidth-hungry software (analytics, HPC) feels this difference even though both CPUs look "powerful".</p>
      <Callout type="common-mistake" title="'I added more RAM and it didn't get faster'">
        Capacity helps only if you were running out of it. If the bottleneck was bandwidth or latency, more of the same RAM changes nothing — and filling second-slot positions (2 DIMMs per channel) can actually lower the supported speed on some platforms.
      </Callout>

      {/* ══════════ 10. POPULATION ══════════ */}
      <h2 id="dimm-population" style={S.h2}>DIMM Population Rules</h2>
      <p style={S.p}>Population means which slots you fill with which DIMMs. It is the most common reason for an unexplained slow server.</p>
      <Figure caption="Fig 5 — Same-looking memory totals, very different results: a balanced 8-channel population versus a capacity-matched but channel-starved layout and an uneven 6-DIMM layout."><DimmPopulation /></Figure>
      <DiagramGuide
        title="How to read Fig 5"
        steps={[
          "Each panel is one socket with eight channels A to H. Green boxes are installed DIMMs; dashed grey boxes are empty channels.",
          "Case 1 (left, green frame): 8 × 64 GB = 512 GB. Every channel has a DIMM, so all eight channels carry traffic — full bandwidth and a clean interleave.",
          "Case 2 (middle, red frame): 4 × 128 GB is also 512 GB, but only four channels are used. The capacity looks identical, yet peak bandwidth is roughly half.",
          "Case 3 (right, red frame): 6 DIMMs fill six channels. Two channels are idle and memory addresses are interleaved unevenly, which lowers effective bandwidth.",
          "Lesson: when buying RAM, specify the number of DIMMs as well as the total GB. Prefer more, smaller DIMMs spread over all channels when bandwidth matters.",
        ]}
      />
      <Callout type="warning" title="The OEM manual overrides every rule of thumb">
        Slot colours, fill order, maximum DIMMs per channel, speed reduction at 2 DIMMs per channel, mixed-capacity rules and rank limits are platform-specific. Use the OEM population guide or configurator for each server model.
      </Callout>
      <h3 style={S.h3}>General principles</h3>
      <ul style={S.ul}>
        <li><strong>Fill all channels first</strong>, then add a second DIMM per channel only if you need capacity.</li>
        <li><strong>Identical DIMMs</strong> on each channel (same size, speed, rank, type). Matching across channels is even more important for bandwidth.</li>
        <li><strong>Balance across sockets.</strong> Each CPU gets the same DIMM layout.</li>
        <li><strong>Mixed speeds</strong>: the whole system usually runs at the slowest speed. Avoid mixing.</li>
        <li><strong>2 DIMMs per channel (2DPC)</strong> often lowers the supported speed compared with 1DPC.</li>
        <li><strong>Do not mix</strong> RDIMM and LRDIMM, DDR generations, or ECC and non-ECC.</li>
        <li><strong>Use qualified part numbers</strong> from the OEM list.</li>
      </ul>
      <CodeBlock lang="text">
{`Example (illustrative): 2-socket server, 12 channels per socket, 1DPC
  Option A : 24 × 64 GB DIMM  = 1.5 TB   all 24 channels used  → best bandwidth
  Option B : 12 × 128 GB DIMM = 1.5 TB   only 12 channels used → half the channels idle
  Option C : 24 × 128 GB DIMM = 3.0 TB   all channels used     → capacity + bandwidth

Upgrade path: choose option A today and add a second DIMM per channel later
(if the platform allows it at an acceptable speed).`}
      </CodeBlock>

      {/* ══════════ 11. RAS ══════════ */}
      <h2 id="ras-scrubbing" style={S.h2}>RAS, Scrubbing, Sparing and Mirroring</h2>
      <p style={S.p}>RAS — Reliability, Availability, Serviceability — are the features that turn memory errors into log lines instead of outages. They are mostly invisible, which is why they are valuable.</p>
      <h3 style={S.h3}>Scrubbing</h3>
      <p style={S.p}>Errors that sit in rarely-read memory can accumulate: one flipped bit today, another next week — now you have a double-bit error that ECC cannot fix. <strong>Patrol scrubbing</strong> reads through all memory in the background and corrects single-bit errors early. <strong>Demand scrubbing</strong> rewrites the corrected value when an error is found during a normal read.</p>
      <h3 style={S.h3}>Sparing, mirroring and repair</h3>
      <ComparisonTable
        title="Advanced Memory RAS Features (platform dependent)"
        headers={["Feature", "How it works", "Trade-off"]}
        rows={[
          ["Rank / DIMM sparing", "A spare rank is reserved. When errors on an active rank cross a threshold, data moves to the spare.", "Lose the capacity of the spare"],
          ["Memory mirroring", "Two copies of the data are kept in different DIMMs/channels. One side can fail completely.", "Usable capacity roughly halved"],
          ["SDDC / chipkill-class ECC", "Data is spread so that a whole failed DRAM chip can be corrected.", "Platform/DIMM-width requirements"],
          ["Post-package repair (PPR)", "Failing rows are remapped to spare rows inside the chip.", "Limited spare rows; applied at boot or runtime"],
          ["Page retirement (OS)", "OS stops using a physical page that had errors.", "Small capacity loss; needs OS support"],
          ["Address range mirroring", "Mirror only critical areas (for example the hypervisor).", "Less capacity loss than full mirroring"],
        ]}
        caption="Availability depends on CPU, firmware and OS. Enabling mirroring or sparing changes usable capacity — plan for it."
      />
      <Callout type="best-practice" title="Use RAS features deliberately">
        Mirroring suits very critical single hosts that cannot be clustered. Most data centers prefer clustering and fast failover plus ECC + scrubbing, because mirroring wastes half the RAM. Make this a documented design decision, not an accident of a BIOS profile.
      </Callout>

      {/* ══════════ 12. OS MEMORY ══════════ */}
      <h2 id="os-memory" style={S.h2}>How the OS Uses Memory: Cache, Swap, Huge Pages, OOM</h2>
      <p style={S.p}>Engineers often panic when they see 90% memory usage. On Linux that is usually fine, because the OS uses spare RAM as a <strong>file cache</strong> and gives it back when applications ask. The correct number to read is <strong>available</strong>, not <strong>free</strong>.</p>
      <Figure caption="Fig 6 — Reading Linux memory: used by applications, reclaimable buff/cache, free, and the 'available' estimate; plus healthy versus danger signs."><LinuxMemoryView /></Figure>
      <DiagramGuide
        title="How to read Fig 6"
        steps={[
          "The big bar is the total RAM of the server, split into three coloured parts.",
          "Red: memory used by applications. The kernel cannot take it back without swapping or killing something.",
          "Amber: buffers and page cache — files recently read or written. The OS can drop this instantly if an application needs memory, so it is almost 'free'.",
          "Green: truly free memory. The green bracket under the bar shows AVAILABLE = free + reclaimable cache. That is the safe-to-use amount.",
          "Left box lists healthy signs: low 'free' but high 'available', steady swap, no OOM messages. Right box lists danger signs: available shrinking, constant swap-in/out, rising load, OOM-kill messages.",
          "Use it as a decision tool: if the right-hand signs are absent, high 'used' percentage is not an incident.",
        ]}
      />
      <CodeBlock lang="bash" label="Linux — memory health in 5 commands">
{`free -h                          # look at the 'available' column
vmstat 2 5                       # si/so = swap in/out per second (should be ~0)
cat /proc/meminfo | head -20     # MemTotal, MemAvailable, Cached, SwapTotal, HugePages_*
dmesg -T | grep -i "out of memory\|oom"   # OOM killer events
sar -r 5 3                       # %memused and %commit over time (sysstat)`}
      </CodeBlock>
      <h3 style={S.h3}>Swap, OOM killer and cgroups</h3>
      <p style={S.p}><strong>Swap</strong> is disk space used as emergency memory. It is thousands of times slower than RAM. A little swap for rarely used pages is fine; constant swapping (si/so non-zero) means the working set does not fit and the server is "thrashing".</p>
      <p style={S.p}>When memory and swap are exhausted, the Linux <strong>OOM killer</strong> picks a process to terminate to save the system. It often picks the biggest — for example your database. In containers, cgroup limits can trigger OOM kills even when the host has free memory.</p>
      <h3 style={S.h3}>Huge pages and NUMA</h3>
      <p style={S.p}>Normal pages are 4 KB. Large databases and VMs use millions of them, and the CPU's address-translation cache (TLB) can't keep up. <strong>Huge pages</strong> (2 MB or 1 GB) reduce this overhead. Databases such as Oracle and PostgreSQL, and hypervisors, often recommend them. They must be reserved ahead of time and are not swappable, so size them carefully.</p>
      <p style={S.p}>Linux can also use <strong>Transparent Huge Pages (THP)</strong> automatically; some databases recommend turning it off because of latency spikes. Follow the application vendor's guidance.</p>

      {/* ══════════ 13. VIRTUALISATION ══════════ */}
      <h2 id="memory-virtualisation" style={S.h2}>Memory in Virtualisation</h2>
      <p style={S.p}>In <TopicLink slug="virtualization" variant="inline" />, the hypervisor gives each VM a block of "guest physical" memory and maps it to real RAM. Unlike CPU, memory is hard to share in time slices: a byte used by one VM cannot be used by another at the same instant. So memory is usually the first resource to run out in a virtual cluster.</p>
      <ComparisonTable
        title="Hypervisor Memory-Saving Techniques (names and behaviour vary by product)"
        headers={["Technique", "What it does", "Risk / note"]}
        rows={[
          ["Memory reservation", "Guarantees real RAM to a VM", "Less flexibility; ensures performance for critical VMs"],
          ["Ballooning", "A driver in the guest asks the guest OS to give up unused memory so the host can reuse it", "Guest may swap internally if it really needs the memory"],
          ["Page sharing (TPS/KSM)", "Identical pages are stored once", "Limited benefit with large pages; inter-VM sharing is often disabled for security"],
          ["Compression", "Compress pages before swapping", "CPU cost; better than disk swap"],
          ["Hypervisor swapping", "Host swaps VM memory to disk", "Last resort; very slow — a sign of overcommit"],
          ["Dynamic Memory (Hyper-V)", "Changes VM RAM between a minimum and maximum", "Not ideal for databases that size caches at start"],
        ]}
        caption="Technique names differ for VMware, Hyper-V and KVM. Check your platform's documentation."
      />
      <Callout type="danger" title="Memory overcommit is riskier than CPU overcommit">
        If CPU is overcommitted, VMs slow down. If memory is overcommitted past what ballooning and compression can handle, the host starts swapping and every VM can freeze together. For production, many teams keep memory close to 1:1 for critical VMs and use reservations.
      </Callout>
      <p style={S.p}>Also remember NUMA: a VM bigger than one NUMA node's memory will span sockets. Size big VMs so they fit one node's RAM when possible, and do not hot-add memory to large VMs without understanding the effect on vNUMA.</p>

      {/* ══════════ 14. CAPACITY PLANNING ══════════ */}
      <h2 id="capacity-planning" style={S.h2}>Capacity Planning and Sizing</h2>
      <p style={S.p}>Sizing memory has three steps: find the working set, add headroom, then pick a DIMM layout that also satisfies the channel rules.</p>
      <CodeBlock lang="text">
{`Example A — virtual host
  Cluster of 6 hosts, N+1 failure tolerance → 5 hosts usable
  VM demand: 120 VMs × 16 GB = 1,920 GB
  Add hypervisor + management overhead (say 5–8%) and 15–20% headroom
  Needed ≈ 1,920 × 1.3 ≈ 2,500 GB usable across 5 hosts → 500 GB per host
  Round to a valid layout: 2 sockets × 8 channels × 1 DIMM
  → 16 × 32 GB = 512 GB per host  (all channels used)

Example B — database server
  Working set (hot data + indexes) = 300 GB
  Buffer pool target = working set × 1.25 = ~375 GB
  OS, connections, other = 10–15% → ~430 GB
  Choose 16 × 32 GB (512 GB) rather than 8 × 64 GB, so all channels are used`}
      </CodeBlock>
      <p style={S.p}>Rule-of-thumb RAM per core is only a starting point — general virtualisation often lands around 4–8 GB per core, in-memory databases and analytics 8–16 GB per core or more, but your measurement beats any rule. Check peak (not average) memory use, and the growth trend over six to twelve months.</p>
      <Callout type="best-practice" title="Buy the layout that can grow">
        Populate all channels with mid-size DIMMs now so you can add a second set later, rather than buying a few giant DIMMs that block upgrades and starve bandwidth. Check the speed penalty for 2DPC on your platform before planning that path.
      </Callout>

      {/* ══════════ 15. POWER & COOLING ══════════ */}
      <h2 id="power-cooling" style={S.h2}>Power, Heat and Airflow of Memory</h2>
      <p style={S.p}>RAM is not just capacity — it also draws power and makes heat. A DIMM typically uses from a few watts to more than ten watts depending on capacity, rank count, speed and load. A server with 24 or 32 DIMMs can spend hundreds of watts on memory alone, sometimes comparable to a CPU.</p>
      <CodeBlock lang="text">
{`Illustrative only:
  32 DIMMs × ~8–12 W each ≈ 256–384 W for memory in one server
  40 such servers in a rack ≈ 10–15 kW from RAM alone

Use measured values: BMC power telemetry, vendor power calculators
and rack PDU readings — not a fixed 'watts per GB' number.`}
      </CodeBlock>
      <p style={S.p}>DIMMs sit directly in the airflow path behind the fans and in front of or beside the CPUs. High-density, high-speed DIMMs run hot. DRAM refresh increases at high temperature, and many platforms throttle memory (reduce speed or bandwidth) when a DIMM temperature sensor crosses a threshold. This shows up as unexplained slowness, not as an error.</p>
      <ul style={S.ul}>
        <li><strong>Airflow shroud / baffle</strong> must be in place so air actually flows across DIMMs and then the CPU heatsink.</li>
        <li><strong>Blanking panels and empty DIMM slots:</strong> OEMs sometimes require DIMM blanks in unused slots for correct airflow; follow the guide.</li>
        <li><strong>Inlet temperature:</strong> high cold-aisle temperature directly reduces memory thermal margin. See <TopicLink slug="airflow-management" variant="inline" /> and <TopicLink slug="containment" variant="inline" />.</li>
        <li><strong>Monitoring:</strong> many servers expose per-DIMM temperature through the BMC. Alert on it.</li>
      </ul>
      <Callout type="important" title="Memory choice changes rack power">
        Moving from 16 × 64 GB to 32 × 32 GB for the same capacity changes DIMM count, power and bandwidth. Always include memory in the rack power calculation. Related: <TopicLink slug="pdu" variant="inline" />.
      </Callout>

      {/* ══════════ 16. BIOS ══════════ */}
      <h2 id="bios-settings" style={S.h2}>Important BIOS / UEFI Memory Settings</h2>
      <p style={S.p}>Memory settings in BIOS change speed, reliability and usable capacity. Treat them as part of your build standard and store them in a server profile or template.</p>
      <ComparisonTable
        title="Common Memory-Related BIOS Settings"
        headers={["Setting", "What it does", "Typical guidance (verify per OEM / workload)"]}
        rows={[
          ["Memory operating mode", "Independent / mirror / sparing / lockstep modes", "Independent (optimizer) for most; mirror or spare only by design decision"],
          ["Memory speed / frequency", "Maximum DIMM speed the system will train to", "Leave at auto/maximum supported; lower only for troubleshooting"],
          ["Node interleaving", "Spreads memory across sockets uniformly (disables NUMA)", "Normally disabled; keep NUMA"],
          ["Channel interleaving", "Spreads addresses over channels", "Enabled — it creates the bandwidth"],
          ["Patrol scrub / demand scrub", "Background error correction", "Enabled"],
          ["Post-package repair (PPR)", "Repairs failing rows", "Enable per OEM guidance"],
          ["Memory refresh rate", "How often DRAM is refreshed", "Auto; do not change without OEM advice"],
          ["Power-down / self-refresh modes", "Saves power when idle", "Performance profile may disable for latency"],
          ["Memory encryption (TME / SME)", "Encrypts RAM contents", "Follow security policy; small performance cost"],
          ["Fast boot / memory test at POST", "Skip or run memory training/test", "Fast for production; full test for new/serviced hosts"],
        ]}
        caption="Names vary by OEM and CPU vendor. Use the OEM tuning guide."
      />
      <Callout type="danger" title="After a replacement, check the memory mode">
        A mirrored or spared mode silently halves or reduces usable RAM. If a BIOS reset changes mode, the OS may show 50% less memory than installed. Compare BIOS profile against a healthy sibling server.
      </Callout>

      {/* ══════════ 17. INSTALLATION ══════════ */}
      <h2 id="installation-replacement" style={S.h2}>DIMM Installation and Replacement</h2>
      <p style={S.p}>DIMMs are the part replaced most often among CPU-side components. It looks simple, but a half-seated DIMM, wrong slot or static discharge causes hours of troubleshooting.</p>
      <h3 style={S.h3}>Before you start</h3>
      <p style={S.p}>Get the change ticket, the failing slot from the BMC log, and an OEM-qualified replacement with the <strong>same type, speed and capacity</strong> as the existing DIMMs. Drain or migrate the workload. If the platform supports hot-plug memory (rare), follow that special procedure; otherwise power down.</p>
      <CodeBlock lang="text">
{`1. Gracefully shut down; migrate/evacuate workload
2. Remove ALL power cords (both PSUs); wait for standby LEDs to go out
3. ESD wrist strap on, connected to chassis ground
4. Slide server out on rails; remove top cover and air shroud
5. Identify the failed DIMM slot from BMC log / diagnostic LED / slot map label
6. Press both ejector latches outward; lift the DIMM straight out by the edges
7. Compare the new DIMM label with the old one (type, rank, speed, part no.)
8. Align the key notch with the slot key; do not insert at an angle
9. Press down firmly with even pressure on both ends until the latches click
10. Check both latches are fully closed and the DIMM sits level with neighbours
11. Refit shroud, cover; reconnect power; boot to BIOS / lifecycle controller
12. Verify total memory, speed and no errors in the BMC log; record in ticket`}
      </CodeBlock>
      <ul style={S.ul}>
        <li><strong>Hold by the edges</strong> only. Do not touch the gold contacts or the chips.</li>
        <li><strong>Never force.</strong> If it doesn't go in with firm, even pressure, check the notch and orientation.</li>
        <li><strong>Use the correct slot order</strong> from the OEM guide. A DIMM in the wrong slot may be ignored.</li>
        <li><strong>Pack the old DIMM</strong> in anti-static packaging and label it for RMA with serial and slot.</li>
        <li><strong>Do not mix</strong> the new DIMM's speed or type with the others.</li>
      </ul>
      <Callout type="warning" title="Half-seated DIMMs cause ghost faults">
        A DIMM sitting 1–2 mm high may work for days and then drop out after vibration or thermal cycling, producing random errors and 'less memory than installed'. Check both latches and visually compare height with neighbouring DIMMs.
      </Callout>

      {/* ══════════ 18. TESTING ══════════ */}
      <h2 id="testing-commissioning" style={S.h2}>Testing and Commissioning</h2>
      <p style={S.p}>New servers and serviced servers should prove their memory before production. Large-memory servers may take many minutes in POST while memory trains and tests — this is normal, but record the time as a baseline.</p>
      <CodeBlock lang="bash" label="Commissioning checks (Linux)">
{`# 1. What is installed and what is active
dmidecode -t memory | grep -E "Locator:|Size:|Speed:|Configured|Rank|Part Number|Manufacturer"
free -h ; lscpu | grep -i numa ; numactl --hardware

# 2. Same DIMM layout on every socket?  Same speed on all DIMMs?

# 3. Bandwidth baseline (STREAM benchmark compiled for the host)
./stream_c.exe

# 4. Stress memory for a set period and watch temperature and errors
stress-ng --vm 0 --vm-bytes 80% --vm-method all --timeout 3600s --metrics-brief
ipmitool sdr type temperature

# 5. After the test: any errors?
sudo ras-mc-ctl --summary
dmesg -T | grep -iE "edac|mce|memory error"
ipmitool sel elist | tail

# Optional offline: memtest86+ / OEM diagnostics for a full pattern test`}
      </CodeBlock>
      <ComparisonTable
        title="Commissioning Acceptance Criteria (example — set your own)"
        headers={["Check", "Pass condition"]}
        rows={[
          ["Installed vs recognised", "Total GB equals planned capacity"],
          ["Population", "Matches design; balanced across sockets and channels"],
          ["Speed", "All DIMMs at the expected speed, no unexpected downclock"],
          ["Bandwidth baseline", "Within the expected range for the CPU/memory config (compare to sibling)"],
          ["Stress run", "No errors; DIMM temperature stable and below the OEM limit"],
          ["Error counters", "No UCE; CE count zero or explained"],
          ["BIOS memory mode", "Matches standard (independent, scrub on, NUMA on)"],
        ]}
        caption="Save results — they become the baseline for troubleshooting."
      />

      {/* ══════════ 19. MONITORING ══════════ */}
      <h2 id="monitoring" style={S.h2}>Memory Monitoring</h2>
      <p style={S.p}>Monitor two layers: the <strong>hardware layer</strong> (errors, DIMM health, temperature, via BMC and EDAC) and the <strong>OS/application layer</strong> (available memory, swap, OOM).</p>
      <ComparisonTable
        title="What to Monitor"
        headers={["Metric", "Source", "Action"]}
        rows={[
          ["Correctable errors per DIMM (rate and trend)", "BMC SEL, rasdaemon, edac-util", "Rising on one DIMM → plan replacement"],
          ["Uncorrectable errors", "BMC SEL, MCE log", "Immediate: replace, investigate"],
          ["DIMM temperature", "BMC sensors", "High → airflow, shroud, inlet temp, fan"],
          ["MemAvailable", "OS agent", "Falling trend → capacity risk"],
          ["Swap in/out rate", "vmstat, sar", "Non-zero for long → working set exceeds RAM"],
          ["OOM-kill events", "kernel log", "Service impact; review limits and sizing"],
          ["Hypervisor ballooning / swapping", "vCenter, esxtop, host metrics", "Host memory overcommit"],
          ["Installed vs recognised DIMMs", "Inventory / BMC", "Missing DIMM = hardware or seating issue"],
        ]}
        caption="Alert on trends, not only thresholds."
      />
      <CodeBlock lang="bash">
{`sudo ras-mc-ctl --summary            # per-DIMM error counts
sudo ras-mc-ctl --errors             # error detail with location
edac-util -v                         # EDAC driver view (if installed)
ls /sys/devices/system/edac/mc/      # raw controller and csrow/dimm counters`}
      </CodeBlock>
      <p style={S.p}>For fleet-wide dashboards use <TopicLink slug="dcim" variant="inline" /> or your monitoring stack, and connect facility alarms through <TopicLink slug="bms" variant="inline" />. Windows Server: Event Viewer system log, plus vendor tools (iDRAC, iLO, XClarity).</p>

      {/* ══════════ 20. MAINTENANCE ══════════ */}
      <h2 id="maintenance" style={S.h2}>Maintenance</h2>
      <ul style={S.ul}>
        <li><strong>Error trending:</strong> Review correctable-error counts monthly. Replace DIMMs on policy before they become UCEs.</li>
        <li><strong>Firmware:</strong> Apply BIOS/microcode updates that include memory-training fixes in a controlled batch process.</li>
        <li><strong>Airflow checks:</strong> Shrouds in place, filters clean, blank panels fitted.</li>
        <li><strong>Spares:</strong> Keep a few OEM-qualified spare DIMMs per type and speed, in anti-static storage.</li>
        <li><strong>Asset data:</strong> Record DIMM serial, slot, part number, firmware, install date.</li>
        <li><strong>Standard layouts:</strong> Document one DIMM layout per server model so replacement and upgrade are predictable.</li>
        <li><strong>Memory-hog review:</strong> Check applications for leaks; fix at source rather than adding RAM.</li>
      </ul>
      <Callout type="maintenance" title="One change at a time">
        Replace one DIMM, verify, then proceed. If you swap three DIMMs and a BIOS version in one window and the server fails to POST, you won't know which change caused it.
      </Callout>

      {/* ══════════ 21. TROUBLESHOOTING ══════════ */}
      <h2 id="troubleshooting" style={S.h2}>DIMM Fault Isolation and Troubleshooting</h2>
      <p style={S.p}>Memory problems feel scary because symptoms vary: no POST, random reboots, missing capacity, slowness. A fixed flow keeps you calm.</p>
      <Figure caption="Fig 7 — Memory fault isolation flow: read the logs, classify the symptom, isolate by swapping DIMM and slot, decide DIMM vs slot vs CPU, then test and record."><MemoryTroubleshootFlow /></Figure>
      <DiagramGuide
        title="How to read Fig 7"
        steps={[
          "Always start at the top: read the BMC event log and any POST code. It usually tells you the exact slot and whether the error was correctable or uncorrectable. Save logs before clearing anything.",
          "The four coloured boxes are symptom classes. Amber: server won't POST. Green: OS sees less RAM than installed. Purple: correctable errors rising. Red: uncorrectable error, crash or reboot.",
          "Each class has a first action written inside — for example for no-POST, reseat and boot with the minimum configuration, then add DIMMs one by one.",
          "All four paths merge at the orange 'isolate' step: swap the suspect DIMM with a known-good one or move it to another slot. Watch whether the problem follows the DIMM or stays with the slot.",
          "Blue box: if the error follows the DIMM, replace the DIMM. If it stays with the slot, inspect the socket and escalate to the OEM because the CPU memory channel or board may be faulty.",
          "Final green box: run a memory test, watch the correctable-error trend, and record everything in the ticket.",
        ]}
      />
      <h3 style={S.h3}>Server won't POST (memory error)</h3>
      <p style={S.p}>Reseat all DIMMs with ESD care. Boot with the minimum supported configuration (one DIMM in the first slot as per the manual). Add DIMMs one at a time. Use OEM-qualified DIMMs only. Capture the BIOS/BMC error code from the virtual console.</p>
      <h3 style={S.h3}>Less RAM than installed</h3>
      <p style={S.p}>Compare <em>dmidecode</em> (what is installed) with <em>free</em> or BIOS (what is active). Causes: a failed DIMM auto-disabled, a population rule violation, mirror/sparing mode, a half-seated DIMM, or reserved memory (e.g. for integrated graphics or hardware).</p>
      <h3 style={S.h3}>Rising correctable errors</h3>
      <p style={S.p}>Identify the DIMM from the log. Isolated few errors: monitor. Repeated errors on the same DIMM: schedule replacement. If the new DIMM in the same slot shows errors too, suspect the slot or CPU channel.</p>
      <h3 style={S.h3}>Uncorrectable error or crash</h3>
      <p style={S.p}>Read the SEL and the OS crash record. Replace the identified DIMM immediately. If the problem repeats, isolate slot vs CPU. Keep the failed DIMM for RMA with logs.</p>
      <h3 style={S.h3}>Memory slow</h3>
      <p style={S.p}>Check population symmetry and speed (dmidecode "Configured Memory Speed"), DIMM temperature and throttling, NUMA locality (numastat), BIOS mode, and run STREAM to compare with the sibling baseline.</p>
      <ComparisonTable
        title="Symptom → Likely Cause → First Check"
        headers={["Symptom", "Likely cause", "First check"]}
        rows={[
          ["No POST, memory LED/amber", "Half-seated or failed DIMM", "BMC log; reseat; minimum config"],
          ["Half the RAM missing", "Mirror/sparing mode or failed channel", "BIOS memory mode; dmidecode"],
          ["Speed lower than DIMM rating", "2DPC, mixed speeds, CPU limit", "Population guide; configured speed"],
          ["Random reboots + MCE", "Failing DIMM or slot", "SEL, ras-mc-ctl location"],
          ["Slow only on one NUMA node", "Imbalanced population", "numactl --hardware; DIMM layout"],
          ["High temp warning on DIMM", "Missing shroud / airflow issue", "Shroud, fans, inlet temp"],
          ["OOM kills with free host RAM", "cgroup/container limit", "Container memory limits"],
        ]}
        caption="Starting checklist. The OEM diagnostic guide has the final word."
      />

      {/* ══════════ 22. FAILURE SCENARIOS ══════════ */}
      <h2 id="failure-scenarios" style={S.h2}>Real Failure Scenarios</h2>
      <p style={S.p}>These are generic patterns seen in data centers, not reports from one particular site.</p>
      <h3 style={S.h3}>Scenario 1: Capacity upgrade that made the server slower</h3>
      <p style={S.p}><strong>What happened:</strong> A team doubled RAM by adding a second DIMM to every channel. Applications ran slower.</p>
      <p style={S.p}><strong>Root cause:</strong> At 2 DIMMs per channel, the platform lowered the memory speed (and the new DIMMs were slightly different speed grade).</p>
      <p style={S.p}><strong>Lesson:</strong> Read the platform's speed-vs-population table before upgrading. Match DIMM part numbers.</p>
      <h3 style={S.h3}>Scenario 2: Correctable errors ignored</h3>
      <p style={S.p}><strong>What happened:</strong> A database host rebooted with an uncorrectable error. The BMC log showed weeks of correctable errors from the same DIMM.</p>
      <p style={S.p}><strong>Root cause:</strong> Nobody trended CE counts.</p>
      <p style={S.p}><strong>Lesson:</strong> Alert on rate-of-change and replace on policy.</p>
      <h3 style={S.h3}>Scenario 3: The 'memory leak' that was page cache</h3>
      <p style={S.p}><strong>What happened:</strong> An alert said 95% memory used on a file server. The team started adding RAM.</p>
      <p style={S.p}><strong>Root cause:</strong> It was file cache. 'Available' memory was healthy and swap was idle.</p>
      <p style={S.p}><strong>Lesson:</strong> Alert on MemAvailable and swap activity, not on 'used'.</p>
      <h3 style={S.h3}>Scenario 4: Cluster-wide freeze from memory overcommit</h3>
      <p style={S.p}><strong>What happened:</strong> After a host failure, VMs restarted on other hosts. The cluster slowed to a crawl.</p>
      <p style={S.p}><strong>Root cause:</strong> The cluster had no spare memory for N+1. Hosts began ballooning and swapping.</p>
      <p style={S.p}><strong>Lesson:</strong> Size memory for the failure case, not only for normal operation.</p>
      <h3 style={S.h3}>Scenario 5: Ghost faults from a half-seated DIMM</h3>
      <p style={S.p}><strong>What happened:</strong> After a replacement, a server dropped to 'less memory than installed' after two weeks.</p>
      <p style={S.p}><strong>Root cause:</strong> The DIMM was not fully latched and shifted after thermal cycling.</p>
      <p style={S.p}><strong>Lesson:</strong> Verify latches and height, then run a stress test and re-check logs after 24 hours.</p>
      <h3 style={S.h3}>Scenario 6: Memory throttling from missing shroud</h3>
      <p style={S.p}><strong>What happened:</strong> A server had unexplained low memory bandwidth and intermittent warnings.</p>
      <p style={S.p}><strong>Root cause:</strong> The air shroud was left off after maintenance. DIMMs overheated and the platform throttled memory.</p>
      <p style={S.p}><strong>Lesson:</strong> Add 'shroud and blanks fitted' to every maintenance checklist.</p>

      {/* ══════════ 23. PERSISTENT / CXL ══════════ */}
      <h2 id="persistent-cxl" style={S.h2}>Persistent Memory, CXL and Memory Tiers</h2>
      <p style={S.p}>For years the memory world was simple: RAM on one side, SSD on the other. New technologies try to fill the gap between them.</p>
      <ComparisonTable
        title="Beyond Plain DIMMs"
        headers={["Technology", "Idea", "Status / note"]}
        rows={[
          ["NVDIMM-N", "DRAM with battery/capacitor and flash; saves data on power loss", "Niche; used for write caches"],
          ["Persistent memory (e.g., Intel Optane PMem)", "Byte-addressable, persistent, denser than DRAM", "Product line has been wound down; you may still meet it in older fleets"],
          ["CXL memory expansion (Type 3)", "Memory attached through PCIe/CXL lanes, appears as extra NUMA node", "Emerging; adds capacity beyond DIMM slots, with higher latency than local DIMMs"],
          ["CXL memory pooling / sharing", "Several hosts share a pool of memory", "Emerging; depends on CXL version and platform"],
          ["HBM (on-package)", "Stacked DRAM next to the processor, very high bandwidth", "Used on GPUs/accelerators and some CPUs"],
        ]}
        caption="Technology landscape changes quickly; verify current vendor support."
      />
      <p style={S.p}>The practical idea is <strong>memory tiering</strong>: hot data in fast local DRAM, warm data in CXL memory, cold data on NVMe. The OS and applications need to know about tiers to place data well. For an engineer today, the key is to recognise a CXL device as extra capacity on a separate NUMA node with different latency, not as 'faster RAM'.</p>
      <Callout type="important" title="Don't plan around a technology you can't buy">
        Check availability and OEM support before designing around any new memory type. Some earlier products have been discontinued, leaving owners with service and spare-part constraints.
      </Callout>

      {/* ══════════ 24. TIER III/IV ══════════ */}
      <h2 id="tier-iii-iv-view" style={S.h2}>Tier III and Tier IV View</h2>
      <p style={S.p}>Tier classification describes the <strong>site</strong> — power paths, cooling and maintainability — not a DIMM. But memory decisions decide whether the compute layer can actually exploit that redundancy.</p>
      <ComparisonTable
        title="How Memory Decisions Connect to Site Design"
        headers={["Concern", "Normal industry view", "Data center view", "Tier III thinking", "Tier IV thinking"]}
        rows={[
          ["Capacity headroom", "RAM fits today's load", "N+1 memory across the cluster", "One host (or one power path's hosts) can be taken out for maintenance and VMs still fit in memory", "A fault plus maintenance still leaves enough memory for critical services"],
          ["Power", "Watts of DIMMs", "Memory is a big share of server watts", "Rack stays within one feed's capacity during path maintenance", "Surviving feed carries the full rack load after a fault"],
          ["Cooling / inlet temp", "Shroud and fans", "DIMM temperature limits at worst inlet", "Margin during one cooling unit maintenance", "Margin during a cooling fault"],
          ["Fault domains", "One server", "Spread memory-heavy cluster nodes over racks/paths", "Maintenance on one path doesn't remove too much memory", "A fault on one path doesn't remove too much memory"],
          ["Data protection", "ECC", "ECC + scrubbing; mirroring only by design", "Clustering for availability, not single-host mirroring", "Same, with fault-tolerant design across domains"],
        ]}
        caption="Conceptual mapping only. Actual implementation depends on project requirements, utility requirements, OEM design and Data Center architecture."
      />
      <p style={S.p}>Design philosophy: use ECC and scrubbing everywhere, size cluster memory for the failure case, make DIMM replacement a standard, tested procedure, and spread memory-heavy workloads across independent power and cooling paths. Related: <TopicLink slug="ups" variant="inline" />, <TopicLink slug="crac" variant="inline" />.</p>

      {/* ══════════ 25. SAFETY ══════════ */}
      <h2 id="safety-practices" style={S.h2}>Safety Practices</h2>
      <ul style={S.ul}>
        <li><strong>Isolate power:</strong> Remove all power cords (dual PSUs!) before touching DIMMs. Standby power keeps parts of the board live.</li>
        <li><strong>ESD:</strong> Wrist strap to chassis ground, anti-static bags for spares; avoid carpets and synthetic clothes.</li>
        <li><strong>Hot components:</strong> DIMMs, heatsinks and PMICs can be hot after shutdown — let them cool.</li>
        <li><strong>Mechanical:</strong> Use a server lift or two-person lift for heavy servers; don't pull a server out beyond its rail stop.</li>
        <li><strong>Sharp edges:</strong> Chassis edges and slot latches can cut — wear suitable gloves where permitted.</li>
        <li><strong>Permit-to-work:</strong> Follow change control for production rows.</li>
        <li><strong>Data security:</strong> Failed DIMMs are generally volatile, but some memory types are persistent. Follow your media-sanitisation policy before RMA for any persistent module.</li>
      </ul>

      {/* ══════════ 26. OEM ══════════ */}
      <h2 id="oem-reference" style={S.h2}>OEMs, Vendors and Qualified DIMMs</h2>
      <p style={S.p}>DRAM chips are made by a small number of manufacturers; DIMMs are built by them and by module makers; servers are sold by OEMs. The OEM's qualified part number is what you buy for production servers.</p>
      <ComparisonTable
        title="Who Is Who in Server Memory"
        headers={["Layer", "Examples", "What you do with it"]}
        rows={[
          ["DRAM chip makers", "Samsung, SK hynix, Micron", "Usually not bought directly for servers"],
          ["Module vendors / OEM-branded DIMMs", "Dell, HPE, Lenovo, Supermicro-qualified modules; module makers such as Kingston and others", "Buy the OEM-qualified part number"],
          ["Server OEMs", "Dell PowerEdge, HPE ProLiant, Lenovo ThinkSystem, Supermicro, Cisco UCS", "Population guide, memory configurator, thermal and speed tables"],
          ["Tools", "iDRAC, iLO, XClarity, Redfish", "Memory inventory, health, error logs"],
        ]}
        caption="Names change over time; use the OEM's current documentation."
      />
      <Callout type="best-practice" title="Qualified vs third-party DIMMs">
        Third-party DIMMs can be cheaper and sometimes work, but unqualified modules may trigger warnings, lose support or cause instability. For production, buy the qualified part number, keep spare stock of the same, and avoid mixing manufacturers within one channel unless the OEM allows it.
      </Callout>

      {/* ══════════ 27. MISCONCEPTIONS ══════════ */}
      <h2 id="misconceptions" style={S.h2}>Common Misconceptions</h2>
      <ComparisonTable
        title="Myths vs Reality"
        headers={["Myth", "Reality"]}
        rows={[
          ["High memory usage means a problem", "On Linux, cache fills spare RAM. Look at available memory, swap and OOM."],
          ["More RAM always makes it faster", "Only if capacity was the limit. Channels, speed and NUMA often matter more."],
          ["Any DDR5 DIMM will work", "Type, rank, speed, ECC and OEM qualification matter."],
          ["2 DIMMs per channel just doubles RAM", "It may reduce memory speed on some platforms."],
          ["DDR5 on-die ECC replaces ECC DIMMs", "On-die ECC is internal; server ECC DIMMs protect the data bus."],
          ["Correctable errors are harmless", "A rising trend predicts failure; they are an early warning."],
          ["RAM keeps data after reboot", "It's volatile; only persistent memory types differ."],
          ["Swap is a substitute for RAM", "Swap is far slower; constant swapping is a performance emergency."],
        ]}
        caption="Fix mental models early."
      />

      {/* ══════════ 28. FUTURE ══════════ */}
      <h2 id="future-trends" style={S.h2}>Future Trends</h2>
      <ul style={S.ul}>
        <li><strong>Faster DDR5 and MRDIMM:</strong> Higher effective speeds and bandwidth per channel with multiplexed ranks.</li>
        <li><strong>More channels per socket:</strong> 12+ channels and wider memory interfaces to feed more cores.</li>
        <li><strong>CXL memory:</strong> Expansion, pooling and tiering beyond DIMM slots; memory becomes a rack-level resource.</li>
        <li><strong>HBM and on-package memory:</strong> Very high bandwidth for AI/HPC, now appearing on CPUs and accelerators. See <TopicLink slug="gpu" variant="inline" /> and <TopicLink slug="ai-gpu" variant="inline" />.</li>
        <li><strong>Low-power memory in servers:</strong> LPDDR-based modules to cut power per GB in some designs.</li>
        <li><strong>Stacked and denser DRAM:</strong> 3D-stacked dies for larger DIMMs; more heat per slot.</li>
        <li><strong>Memory encryption and confidential computing:</strong> Hardware-encrypted RAM, isolating tenants from the host.</li>
        <li><strong>Better telemetry and predictive failure:</strong> Fleet analytics predicting DIMM failure from error patterns.</li>
        <li><strong>Liquid cooling includes memory:</strong> Cold plates and designs covering DIMMs as power rises.</li>
      </ul>

      {/* ══════════ 29. LEARNING PATH ══════════ */}
      <h2 id="learning-path" style={S.h2}>Learning Path</h2>
      <ol style={S.ul}>
        <li><TopicLink slug="server-basics" variant="inline" /> — the whole server around the memory.</li>
        <li><TopicLink slug="cpu" variant="inline" /> — memory controllers, channels, cache and NUMA.</li>
        <li><TopicLink slug="gpu" variant="inline" /> — GPU memory (HBM/GDDR) and why it differs.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — memory overcommit, ballooning and VM sizing.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — memory in dense shared-chassis compute.</li>
        <li><TopicLink slug="pdu" variant="inline" /> and <TopicLink slug="airflow-management" variant="inline" /> — the power and cooling that memory depends on.</li>
      </ol>

      {/* ══════════ 30. INTERVIEW ══════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: What is ECC RAM and why is it used in servers?</h3>
      <p style={S.p}><strong>Answer:</strong> ECC stores extra check bits with the data. On read, the controller recomputes and compares them, correcting single-bit errors and detecting larger ones. In servers, silent corruption is unacceptable and error rates matter at fleet scale, so ECC is standard. Exact capability (SEC-DED, chipkill-class) is platform dependent.</p>
      <h3 style={S.h3}>Q2: What happens if DIMM population is wrong?</h3>
      <p style={S.p}><strong>Answer:</strong> Unused channels mean lost bandwidth; mixed speeds can force the slowest speed; unsupported combinations may be ignored or fail POST. Follow the OEM population guide.</p>
      <h3 style={S.h3}>Q3: Does adding a second DIMM to a channel increase bandwidth?</h3>
      <p style={S.p}><strong>Answer:</strong> No. Bandwidth is per channel. A second DIMM adds capacity, and may even reduce the supported speed. To increase bandwidth, populate more channels.</p>
      <h3 style={S.h3}>Q4: Linux shows 95% memory used. Is it a problem?</h3>
      <p style={S.p}><strong>Answer:</strong> Not by itself. Check 'available', swap in/out rate, and OOM events. High 'used' is often reclaimable page cache.</p>
      <h3 style={S.h3}>Q5: Difference between RDIMM and UDIMM?</h3>
      <p style={S.p}><strong>Answer:</strong> RDIMM has a register that buffers command/address signals, allowing more DIMMs and larger capacity per channel. UDIMM is unbuffered with lower latency but limited scale. They cannot be mixed.</p>
      <h3 style={S.h3}>Q6: What do you do when a DIMM shows rising correctable errors?</h3>
      <p style={S.p}><strong>Answer:</strong> Identify the slot from logs, check the trend, schedule replacement per policy, swap with a qualified DIMM, and monitor. If the new DIMM errors in the same slot, suspect the slot or CPU channel.</p>
      <h3 style={S.h3}>Q7: Why can memory overcommit be dangerous in virtualisation?</h3>
      <p style={S.p}><strong>Answer:</strong> When physical RAM runs out the host balloons, compresses and finally swaps VM memory, slowing all VMs. Size for N+1 failure and use reservations for critical VMs.</p>
      <h3 style={S.h3}>Q8: How do you decode "64GB 2Rx4 PC5-4800B-R"?</h3>
      <p style={S.p}><strong>Answer:</strong> 64 GB capacity, dual rank with x4 chips, DDR5, 4800 MT/s speed grade B, registered DIMM.</p>

      {/* ══════════ 31. KEY TAKEAWAYS ══════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>RAM is volatile working memory; DRAM cells leak and need constant refresh.</li>
        <li>ECC is standard in servers; trend correctable errors and replace on policy before they become uncorrectable.</li>
        <li>RDIMM is the server standard; never mix DIMM types or DDR generations.</li>
        <li>Bandwidth comes from channels: peak = MT/s × 8 bytes × channels. A second DIMM per channel adds capacity, not bandwidth.</li>
        <li>Spread RAM evenly across sockets and channels; follow the OEM population guide.</li>
        <li>Read 'available' memory, swap activity and OOM logs, not 'used' or 'free'.</li>
        <li>In virtualisation, memory overcommit is riskier than CPU overcommit; size for N+1.</li>
        <li>Memory adds real power and heat; include it in rack calculations and keep shrouds fitted.</li>
        <li>After service, verify BIOS memory mode, speed, latches and logs; test before returning to production.</li>
        <li>Use OEM-qualified DIMMs and change one thing at a time.</li>
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
        <li><TopicLink slug="cpu" variant="inline" /> — Memory controllers, channels, cache and NUMA.</li>
        <li><TopicLink slug="server-basics" variant="inline" /> — Full server component overview.</li>
        <li><TopicLink slug="gpu" variant="inline" /> — Accelerator memory and CPU-GPU relationship.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — vRAM allocation and memory overcommit.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — Dense shared-chassis compute.</li>
      </ul>
    </>
  );
}
