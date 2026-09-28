"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import DimmChannels from "../svg/DimmChannels";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#14532d", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — RAM in 2 Minutes</p> <ul style={{ ...S.ul, marginBottom: 0 }}> <li><strong>What RAM is:</strong> The CPU's working memory. Active data and instructions are stored here — power off = data erased (volatile).</li> <li><strong>ECC:</strong> Error-Correcting Code — detects memory bit errors and, in some cases, corrects them. Depends on the implementation. Server standard. Typically not in consumer RAM.</li> <li><strong>RDIMM:</strong> Registered DIMM — server standard. A buffer chip handles command/address signals — supports large DIMM counts.</li> <li><strong>Channels:</strong> Multiple parallel paths between the CPU and RAM. More channels = higher bandwidth. Symmetric population required.</li> <li><strong>NUMA:</strong> In a multi-socket server, RAM physically sits next to one CPU — remote access is slower for the other CPU.</li> <li><strong>Population rules:</strong> Follow the OEM platform manual exactly — avoid universal rules.</li> <li><strong>Monitoring:</strong> Track the ECC error rate per DIMM — increasing correctable errors = proactive replacement.</li> </ul>
      </div>

      <h2 id="what-is-ram" style={S.h2}>What Is RAM?</h2>
      <p style={S.p}>RAM (Random Access Memory) is the CPU's direct working memory. The OS, running applications, database buffers, VM memory — everything lives in RAM. Accessing RAM is dramatically faster than accessing storage. A simple analogy: storage is the pantry (far away, slow access), RAM is the kitchen counter (right next to the chef, fast access).</p>
      <p style={S.p}><strong>Volatile:</strong> RAM depends on power. Server powered off → RAM erased. Drives exist for permanent data storage. This distinction is important — data in RAM can be lost in a server crash, so application state persistence has to be designed carefully.</p>

      <h2 id="dram-basics" style={S.h2}>DRAM Basics</h2>
      <p style={S.p}>DRAM (Dynamic RAM) is standard in modern servers. It is called "Dynamic" because each memory cell is a tiny capacitor that stores charge — and the capacitor naturally leaks, so it has to be refreshed continuously (thousands of times per second). This refresh overhead makes DRAM slower compared to SRAM (which does not need refresh but is much more expensive and physically larger).</p>
      <p style={S.p}>When reading data: the capacitor charge is sensed, but the read operation is destructive — charge is lost, so the data has to be written back (restore). This basic operating principle adds latency. Timing parameters (CL, tRCD, tRP etc.) describe the latencies of these operations.</p>

      <h2 id="ecc" style={S.h2}>ECC — Error-Correcting Code</h2>
      <p style={S.p}>Where do memory errors come from? Cosmic rays, electrical noise, thermal effects, aging components — they can flip bits. Consumer RAM has no protection — silent data corruption is possible. ECC stores extra "check bits" alongside the actual data. When data is read, an algorithm verifies it using the check bits.</p>
      <p style={S.p}>The exact ECC capability depends on the implementation. Typical enterprise ECC implementations can correct single-bit errors and detect multi-bit errors. Some advanced implementations (chipkill, etc.) provide broader protection. Verify specific ECC capabilities from platform and memory vendor documentation.</p>
      <Callout type="important" title="ECC Is Not Universal — Platform Dependent">
        ECC support depends on the CPU chipset, the motherboard and the memory module. Not all servers technically require ECC, but ECC RAM is standard practice in enterprise and data center deployments. Verify ECC support from OEM documentation before purchasing.
      </Callout>

      <h2 id="dimm-types" style={S.h2}>DIMM Types — RDIMM, LRDIMM, UDIMM</h2>
      <ComparisonTable
        title="Server DIMM Types"
        headers={["Type","Full Name","Buffering","Server Use","Notes"]}
        rows={[
          ["RDIMM","Registered DIMM","Command/Address buffered","Server standard","Supports larger DIMM counts per channel"],
          ["LRDIMM","Load-Reduced DIMM","Command/Address + Data buffered","High-capacity deployments","Even more DIMMs possible; slightly higher latency"],
          ["UDIMM","Unbuffered DIMM","No buffering","Consumer, some workstations","Lower latency, limited slots per channel"],
        ]}
        caption="DIMM type compatibility depends on CPU platform and motherboard. Never mix DIMM types; verify OEM compatibility matrix."
      />

      <h2 id="ddr-generations" style={S.h2}>DDR Generations</h2>
      <p style={S.p}>DDR (Double Data Rate) — 2 transfers per clock cycle. DDR4 and DDR5 are the current generation technologies. DDR5 offers higher bandwidth and capacity per DIMM but is electrically different from DDR4 — physically incompatible.</p>
      <p style={S.p}>The specific supported DDR generation depends on the CPU platform and motherboard — mixing generations is impossible (typically physically different connectors). Speed (MT/s — megatransfers per second) varies within the same generation. In a server, the actual effective speed depends on CPU memory controller limits and DIMM configuration. Follow the OEM qualified vendor list (QVL) for server-grade DIMMs.</p>

      <h2 id="memory-channels" style={S.h2}>Memory Channels, Sockets and NUMA</h2>
      <Figure caption="Fig 1 — Memory channels: CPU memory controller connecting to multiple DIMM channels. Symmetric population maximises bandwidth."><DimmChannels /></Figure>
      <p style={S.p}>A server CPU supports multiple memory channels — the specific channel count depends on model and generation. Each channel transfers data independently — parallel bandwidth multiplies. Populate channels evenly with identical DIMMs for maximum bandwidth.</p>
      <p style={S.p}><strong>NUMA and memory:</strong> In a multi-socket server, RAM is physically installed in a specific CPU's memory controller slots. That RAM forms that CPU's NUMA node. Distribute RAM evenly across sockets — if all the RAM is in one socket's slots, the other CPU does remote access → performance hit. NUMA is covered in detail in <TopicLink slug="cpu" variant="inline"/>.</p>

      <h2 id="capacity-bandwidth" style={S.h2}>Memory Capacity vs Bandwidth</h2>
      <p style={S.p}><strong>Capacity:</strong> Total RAM — how much data can be held in RAM simultaneously. For databases: buffer pool size, working set size. For VMs: the total vRAM of all VMs. If capacity is insufficient, swapping/paging starts — performance falls dramatically.</p>
      <p style={S.p}><strong>Bandwidth:</strong> Data transfer rate from RAM — GB/s. Memory-intensive workloads (large matrix operations, scientific computing, analytics) are bandwidth-sensitive. Maximise channels for bandwidth. In in-memory databases and AI workloads, memory bandwidth is often the bottleneck.</p>
      <p style={S.p}>Plan both capacity and bandwidth according to the workload — do not miss bandwidth by looking only at capacity, and do not miss capacity by looking only at bandwidth.</p>

      <h2 id="dimm-population" style={S.h2}>DIMM Population Rules</h2>
      <Callout type="warning" title="Always Follow OEM Platform Manual">
        DIMM population rules are platform-specific. There is no universal rule that applies to all servers. The OEM server manual explicitly documents population rules — which slots to populate first, in what groups, and which combinations are supported. Wrong population: reduced bandwidth, instability, or POST failure.
      </Callout>
      <p style={S.p}>General principles (but the OEM manual overrides them): Populate all channels with symmetric DIMMs. Use DIMMs of the same speed and rank. Different speed DIMMs: the system typically operates at the lowest common speed — worst case instability, guaranteed speed reduction — avoid mixing. Do not mix different DIMM types (RDIMM/LRDIMM).</p>
      <p style={S.p}><strong>Ranks:</strong> Single-rank vs dual-rank DIMMs — different electrical organisation at the same capacity. Slot capacity limits per channel exist. Verify the OEM specification.</p>

      <h2 id="ras-scrubbing" style={S.h2}>RAS and Memory Scrubbing</h2>
      <p style={S.p}>RAS (Reliability, Availability, Serviceability) includes server memory features beyond basic ECC. Memory scrubbing is a background hardware process that periodically scans RAM — detecting errors before they accumulate or become uncorrectable. Some platform implementations enable hardware scrubbing — configuration options depend on the platform.</p>
      <p style={S.p}>Memory mirroring (on some platforms) maintains identical data in two memory regions — survive a single DIMM failure. Memory sparing — pre-configured spare ranks that can automatically replace failing DIMMs. These features are platform-specific; verify OEM documentation.</p>

      <h2 id="monitoring" style={S.h2}>Memory Monitoring</h2>
      <p style={S.p}><strong>Linux:</strong> `edac-utils` — ECC error counting per DIMM. `/sys/devices/system/edac/mc/` raw error counts. BMC/iDRAC memory events. `dmidecode -t memory` — installed DIMM info.</p>
      <p style={S.p}><strong>Windows Server:</strong> Event Viewer → System log → hardware errors. Vendor tools (Dell OpenManage, HPE iLO).</p>
      <p style={S.p}><strong>What to monitor:</strong> Per-DIMM correctable error count and trend — increasing rate = proactive replacement schedule. Uncorrectable errors — immediate action. Total recognized capacity vs installed — DIMM not recognized?</p>

      <h2 id="troubleshooting" style={S.h2}>DIMM Fault Isolation and Troubleshooting</h2>
      <h3 style={S.h3}>Server Won't POST — Memory Error</h3>
      <p style={S.p}>Are the DIMMs properly seated? (Reseat while taking ESD precautions). Try the minimum supported configuration — one DIMM per channel. Eliminate one DIMM at a time to identify the faulty DIMM. Is an OEM-approved DIMM being used? Capture the UEFI POST error code (from the BMC virtual console).</p>
      <h3 style={S.h3}>System Shows Less RAM Than Installed</h3>
      <p style={S.p}>All slots recognized in UEFI? Bad DIMM auto-disabled? Population rule violation — some slots ignored by the controller? `dmidecode -t memory` in Linux for installed vs active. Check BMC logs — memory fault?</p>
      <h3 style={S.h3}>Increasing Correctable ECC Errors</h3>
      <p style={S.p}>Track which DIMM with `edac-util` or a vendor tool. Isolated occurrence → monitor. Consistent increase on the same DIMM → schedule replacement. After replacement, monitor the new DIMM.</p>
      <h3 style={S.h3}>Uncorrectable Memory Error / System Crash</h3>
      <p style={S.p}>Check the BMC system event log — which DIMM slot? Replace immediately. If it recurs on a new DIMM in the same slot — slot issue? CPU memory controller issue? Try the DIMM in a different slot to isolate.</p>
      <h3 style={S.h3}>Memory Performance Degraded</h3>
      <p style={S.p}>All channels populated symmetrically? `numastat` — is the NUMA miss rate high? DIMM speed correctly configured in UEFI? Run a memory bandwidth benchmark (e.g., stream benchmark) to confirm the bandwidth level.</p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: What is ECC RAM, how does it work, and why is it used in servers?</h3>
      <p style={S.p}><strong>Answer:</strong> ECC stores extra check bits alongside the data — Hamming code or a similar algorithm. When reading, the algorithm verifies the data. The exact protection level (single-bit correction, multi-bit detection, chipkill) depends on the implementation. In server workloads, silent memory corruption can be catastrophic — database corruption, a wrong financial calculation. ECC protects in the background. ECC requires platform and CPU chipset support.</p>
      <h3 style={S.h3}>Q2: What happens if DIMM population is done wrong?</h3>
      <p style={S.p}><strong>Answer:</strong> With wrong population — channels not symmetrically populated — available bandwidth will be sub-optimal. Worst case: POST failure, the server does not boot. Some slots may be ignored. Memory speed may drop to the lowest common denominator. That is why you should follow the OEM platform manual exactly — universal "rules" are not reliable.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>RAM is volatile — power off = data erased. Drives are required for persistent storage.</li>
        <li>ECC is implementation-dependent — various levels exist, from single-bit correction to chipkill. Server standard, but verify the platform.</li>
        <li>RDIMM is the server standard — the buffer chip supports large DIMM counts. LRDIMM is for higher capacity.</li>
        <li>For maximum bandwidth, populate all channels symmetrically — follow the OEM platform manual exactly.</li>
        <li>In multi-socket systems, distribute RAM evenly across sockets — for NUMA performance.</li>
        <li>Monitor correctable ECC errors per-DIMM — schedule proactive replacement when the rate increases.</li>
        <li>Uncorrectable memory errors = immediate investigation, replacement.</li>
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
        <li><TopicLink slug="cpu" variant="inline" /> — Memory channels, NUMA topology.</li>
        <li><TopicLink slug="server-basics" variant="inline" /> — Full server component overview.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — vRAM allocation, memory overcommit.</li>
      </ul>
    </>
  );
}
