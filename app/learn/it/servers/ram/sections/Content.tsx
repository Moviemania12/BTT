"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import DimmChannels from "../svg/DimmChannels";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#14532d", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — RAM in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>RAM kya hai:</strong> CPU ka working memory. Active data aur instructions yahan store hote hain — power off = data erase (volatile).</li>
          <li><strong>ECC:</strong> Error-Correcting Code — memory bit errors detect aur kuch cases mein correct karta hai. Implementation pe depend karta hai. Server standard. Consumer RAM mein typically nahi.</li>
          <li><strong>RDIMM:</strong> Registered DIMM — server standard. Buffer chip command/address signals handle karta hai — large DIMM counts support.</li>
          <li><strong>Channels:</strong> Multiple parallel paths CPU aur RAM ke beech. More channels = higher bandwidth. Symmetric population required.</li>
          <li><strong>NUMA:</strong> Multi-socket server mein RAM physically ek CPU ke paas hoti hai — doosre CPU ke liye remote access slower.</li>
          <li><strong>Population rules:</strong> OEM platform manual follow karo exactly — universal rules avoid karo.</li>
          <li><strong>Monitoring:</strong> ECC error rate per DIMM track karo — increasing correctable errors = proactive replacement.</li>
        </ul>
      </div>

      <h2 id="what-is-ram" style={S.h2}>What Is RAM?</h2>
      <p style={S.p}>RAM (Random Access Memory) CPU ka direct working memory hai. OS, running applications, database buffers, VM memory — sab RAM mein hota hai. RAM se access karna storage se dramatically faster hota hai. Ek simple analogy: storage pantry hai (door hoti hai, slow access), RAM kitchen counter hai (chef ke paas, fast access).</p>
      <p style={S.p}><strong>Volatile:</strong> RAM power dependent hai. Server power off → RAM erase. Permanent data storage ke liye drives hain. Yeh distinction important hai — server crash pe RAM ka data lost ho sakta hai, isliye application state persistence carefully design karna padta hai.</p>

      <h2 id="dram-basics" style={S.h2}>DRAM Basics</h2>
      <p style={S.p}>DRAM (Dynamic RAM) modern servers mein standard hai. "Dynamic" isliye ki har memory cell ek tiny capacitor hai jo charge store karta hai — aur capacitor naturally leak karta hai, isliye continuously refresh karna padta hai (thousands of times per second). Yeh refresh overhead DRAM ko slower banata hai compared to SRAM (jo refresh nahi chahiye lekin much more expensive aur physically larger hai).</p>
      <p style={S.p}>Data read karte waqt: capacitor charge sense hota hai, lekin read operation destructive hai — charge loss hota hai, data wapas write karna padta hai (restore). Yeh basic operating principle latency add karta hai. Timing parameters (CL, tRCD, tRP etc.) in operations ke latencies describe karte hain.</p>

      <h2 id="ecc" style={S.h2}>ECC — Error-Correcting Code</h2>
      <p style={S.p}>Memory errors kahan se aate hain? Cosmic rays, electrical noise, thermal effects, aging components — bit flip kar sakte hain. Consumer RAM mein koi protection nahi — silent data corruption possible. ECC extra "check bits" store karta hai alongside actual data. Jab data read hota hai, algorithm check bits se verify karta hai.</p>
      <p style={S.p}>ECC exact capability implementation pe depend karti hai. Typical enterprise ECC implementations single-bit errors correct aur multi-bit errors detect kar sakte hain. Kuch advanced implementations (chipkill, etc.) broader protection provide karte hain. Specific ECC capabilities platform aur memory vendor documentation se verify karo.</p>
      <Callout type="important" title="ECC Is Not Universal — Platform Dependent">
        ECC support CPU chipset, motherboard aur memory module sab pe depend karta hai. Nahi sab servers ECC require karte hain technically, lekin enterprise aur data center deployments mein ECC RAM standard practice hai. ECC support verify karo OEM documentation se before purchasing.
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
      <p style={S.p}>DDR (Double Data Rate) — har clock cycle mein 2 transfers. DDR4 aur DDR5 current generation technologies hain. DDR5 higher bandwidth aur capacity per DIMM offer karta hai lekin DDR4 se electrically different hai — physically incompatible.</p>
      <p style={S.p}>Specific supported DDR generation CPU platform aur motherboard pe depend karta hai — mixing generations impossible (physically different connectors typically). Speed (MT/s — megatransfers per second) within same generation vary karta hai. Server mein actual effective speed CPU memory controller limits aur DIMM configuration pe depend karta hai. OEM qualified vendor list (QVL) follow karo server-grade DIMMs ke liye.</p>

      <h2 id="memory-channels" style={S.h2}>Memory Channels, Sockets and NUMA</h2>
      <Figure caption="Fig 1 — Memory channels: CPU memory controller connecting to multiple DIMM channels. Symmetric population maximises bandwidth."><DimmChannels /></Figure>
      <p style={S.p}>Server CPU multiple memory channels support karta hai — specific channel count model aur generation pe depend karta hai. Har channel independently data transfer karta hai — parallel bandwidth multiply hoti hai. Channels ko evenly populate karo identical DIMMs se maximum bandwidth ke liye.</p>
      <p style={S.p}><strong>NUMA aur memory:</strong> Multi-socket server mein RAM physically specific CPU ke memory controller slots mein installed hoti hai. Woh RAM uss CPU ka NUMA node banati hai. Sockets ke beech RAM evenly distribute karo — agar sab RAM ek socket ke slots mein ho toh doosra CPU remote access karta hai → performance hit. <TopicLink slug="cpu" variant="inline"/> mein NUMA detail mein cover hua hai.</p>

      <h2 id="capacity-bandwidth" style={S.h2}>Memory Capacity vs Bandwidth</h2>
      <p style={S.p}><strong>Capacity:</strong> Total RAM — kitna data simultaneously RAM mein hold ho sakta hai. Database mein: buffer pool size, working set size. VMs ke liye: sab VMs ka total vRAM. Capacity insufficient ho toh swapping/paging start hoti hai — performance dramatically falls.</p>
      <p style={S.p}><strong>Bandwidth:</strong> RAM se data transfer rate — GB/s. Memory-intensive workloads (large matrix operations, scientific computing, analytics) bandwidth-sensitive hote hain. Channels maximise karo bandwidth ke liye. In-memory databases aur AI workloads mein memory bandwidth often bottleneck hoti hai.</p>
      <p style={S.p}>Capacity aur bandwidth dono plan karo workload ke hisaab se — sirf capacity dekh ke bandwidth miss mat karo, sirf bandwidth dekh ke capacity miss mat karo.</p>

      <h2 id="dimm-population" style={S.h2}>DIMM Population Rules</h2>
      <Callout type="warning" title="Always Follow OEM Platform Manual">
        DIMM population rules platform-specific hain. Koi universal rule nahi hai jo sab servers pe apply ho. OEM server manual explicitly population rules document karta hai — kaunse slots pehle populate karo, kaise groups mein, konse combinations supported hain. Galat population: reduced bandwidth, instability, ya POST failure.
      </Callout>
      <p style={S.p}>General principles (lekin OEM manual override karta hai): Sab channels populate karo symmetric DIMMs se. Same speed aur rank DIMMs use karo. Different speed DIMMs: system typically lowest common speed pe operate karta hai — worst case instability, guaranteed speed reduction — mixing avoid karo. Different DIMM types (RDIMM/LRDIMM) mix mat karo.</p>
      <p style={S.p}><strong>Ranks:</strong> Single-rank vs dual-rank DIMMs — same capacity mein different electrical organisation. Slot capacity limits per channel exist karte hain. OEM specification verify karo.</p>

      <h2 id="ras-scrubbing" style={S.h2}>RAS and Memory Scrubbing</h2>
      <p style={S.p}>RAS (Reliability, Availability, Serviceability) server memory features include karta hai beyond basic ECC. Memory scrubbing ek background hardware process hai jo periodically RAM scan karta hai — errors detect karta hai before they accumulate ya become uncorrectable. Kuch platform implementations hardware scrubbing enable karte hain — configuration options platform pe depend karte hain.</p>
      <p style={S.p}>Memory mirroring (kuch platforms) do memory regions mein identical data maintain karta hai — single DIMM failure survive karo. Memory sparing — pre-configured spare ranks jo automatically fail hoti DIMMs replace kar saken. Yeh features platform-specific hain, OEM documentation verify karo.</p>

      <h2 id="monitoring" style={S.h2}>Memory Monitoring</h2>
      <p style={S.p}><strong>Linux:</strong> `edac-utils` — ECC error counting per DIMM. `/sys/devices/system/edac/mc/` raw error counts. BMC/iDRAC memory events. `dmidecode -t memory` — installed DIMM info.</p>
      <p style={S.p}><strong>Windows Server:</strong> Event Viewer → System log → hardware errors. Vendor tools (Dell OpenManage, HPE iLO).</p>
      <p style={S.p}><strong>What to monitor:</strong> Per-DIMM correctable error count aur trend — increasing rate = proactive replacement schedule. Uncorrectable errors — immediate action. Total recognized capacity vs installed — DIMM not recognized?</p>

      <h2 id="troubleshooting" style={S.h2}>DIMM Fault Isolation and Troubleshooting</h2>
      <h3 style={S.h3}>Server Won't POST — Memory Error</h3>
      <p style={S.p}>DIMMs properly seated hain? (ESD precautions lete hue reseat). Minimum supported configuration try karo — ek DIMM per channel. One DIMM at a time eliminate karo faulty DIMM identify karne ke liye. OEM approved DIMM use ho raha hai? UEFI POST error code capture karo (BMC virtual console se).</p>
      <h3 style={S.h3}>System Shows Less RAM Than Installed</h3>
      <p style={S.p}>UEFI mein all slots recognized? Bad DIMM disabled auto? Population rule violation — some slots ignored by controller? `dmidecode -t memory` Linux mein installed vs active. BMC logs check karo — memory fault?</p>
      <h3 style={S.h3}>Increasing Correctable ECC Errors</h3>
      <p style={S.p}>`edac-util` ya vendor tool se which DIMM track karo. Isolated occurrence → monitor. Consistent increase on same DIMM → schedule replacement. After replacement, monitor new DIMM.</p>
      <h3 style={S.h3}>Uncorrectable Memory Error / System Crash</h3>
      <p style={S.p}>BMC system event log check karo — which DIMM slot? Replace immediately. Agar recurring on new DIMM in same slot — slot issue? CPU memory controller issue? Try DIMM in different slot to isolate.</p>
      <h3 style={S.h3}>Memory Performance Degraded</h3>
      <p style={S.p}>All channels populated symmetrically? `numastat` — NUMA miss rate high? DIMM speed correctly configured in UEFI? Memory bandwidth benchmark (e.g., stream benchmark) run karo to confirm bandwidth level.</p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: ECC RAM kya hai, kaise kaam karta hai, aur kyun server mein use hota hai?</h3>
      <p style={S.p}><strong>Answer:</strong> ECC extra check bits store karta hai data ke saath — Hamming code ya similar algorithm. Read karte waqt algorithm verify karta hai. Exact protection level (single-bit correction, multi-bit detection, chipkill) implementation pe depend karta hai. Server workloads mein silent memory corruption catastrophic ho sakta hai — database corruption, wrong financial calculation. ECC background mein protect karta hai. ECC platform aur CPU chipset support required.</p>
      <h3 style={S.h3}>Q2: DIMM population galat karne se kya hota hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Galat population — channels symmetrically populated nahi — mein available bandwidth sub-optimal hogi. Worst case: POST failure, server boot nahi karta. Kuch slots ignored ho sakte hain. Memory speed to lowest common denominator drop ho sakti hai. Isliye OEM platform manual exactly follow karo — universal "rules" reliable nahi hain.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>RAM volatile hai — power off = data erase. Persistent storage ke liye drives required.</li>
        <li>ECC implementation-dependent hai — single-bit correction to chipkill various levels exist karte hain. Server standard lekin platform verify karo.</li>
        <li>RDIMM server standard — buffer chip large DIMM counts support karta hai. LRDIMM higher capacity ke liye.</li>
        <li>Maximum bandwidth ke liye sab channels symmetric populate karo — OEM platform manual exactly follow karo.</li>
        <li>Multi-socket mein RAM evenly distribute karo sockets ke beech — NUMA performance ke liye.</li>
        <li>Correctable ECC errors monitor karo per-DIMM — increasing rate pe proactive replacement schedule karo.</li>
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
