"use client";

import { S, Callout, ComparisonTable, Figure, CodeBlock } from "../shared";
import TopicLink from "@/components/TopicLink";
import DasDataPath from "../svg/DasDataPath";
import DasBayLayout from "../svg/DasBayLayout";
import DasJbodConnection from "../svg/DasJbodConnection";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      {/* ── Quick Summary ─────────────────────────────────────────────────── */}
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — DAS in 2 Minutes</p> <ul style={{ ...S.ul, marginBottom: 0 }}> <li><strong>What DAS is:</strong> Direct Attached Storage — storage that is connected directly to one server, without any network. The drives inside a server are DAS. An external box connected directly by a SAS cable — that is DAS too.</li> <li><strong>Golden rule:</strong> If there is a network between the server and the storage — it is not DAS. If it is connected directly by cable — it is DAS.</li> <li><strong>Why it is relevant:</strong> Zero network overhead, lowest latency, lowest cost. The fastest storage option for a single server.</li> <li><strong>Primary limitation:</strong> Only the one server it is directly connected to can access it — not shareable.</li> <li><strong>Types:</strong> Internal DAS (inside the server), External DAS / JBOD (outside, via SAS cable), NVMe-based DAS (PCIe-direct).</li> <li><strong>Interfaces:</strong> SATA (OS drives / budget), SAS (enterprise standard), NVMe (highest performance).</li> <li><strong>Enterprise use:</strong> Databases, virtualization hosts, HCI foundation, AI/ML training nodes, edge servers, OS boot drives.</li> <li><strong>HCI connection:</strong> VMware vSAN, Nutanix, Microsoft S2D — all pool DAS drives through software. DAS is the foundation of HCI.</li> <li><strong>Engineer's daily work:</strong> Monitoring RAID status, checking S.M.A.R.T. health, acting on predictive failure alerts, tracking capacity trends.</li> <li><strong>Most critical field rule:</strong> Never put consumer drives in enterprise RAID — they have no TLER, and the production array degrades.</li> </ul>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — DEFINITION
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="das-kya-hai" style={S.h2}>What Is DAS — Definition and Full Form</h2>
      <p style={S.p}><strong>DAS = Direct Attached Storage</strong></p>
      <p style={S.p}>Any storage device that is physically and directly connected to a single server or workstation — without any network, switch or shared infrastructure — is DAS.</p>
      <p style={S.p}>This is not the name of a specific product. It is an architecture pattern.</p>
      <p style={S.p}>DAS came first — before networking, before shared storage. All early servers ran on DAS. It is still widely deployed in data centers today — specifically where maximum single-server local performance is needed.</p>
      <p style={S.p}><strong>Why it still matters:</strong> NAS and SAN introduced shared storage, but along with the network came latency. High-performance databases, real-time processing, AI training — these need consistent microsecond-level storage access. DAS delivers that.</p>
      <CodeBlock lang="text">
{`Application → OS → Storage Driver → Physical Drive

No network. No switch. No protocol overhead.`}
      </CodeBlock>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — DAS vs PC Storage
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="das-vs-pc-storage" style={S.h2}>DAS vs Normal PC Storage</h2>
      <p style={S.p}>On the surface both look the same — directly attached drives. But in engineering and production use there is a big difference.</p>
      <ComparisonTable
        title="PC Storage vs Enterprise DAS"
        headers={["Parameter", "PC / Laptop Storage", "Enterprise DAS"]}
        rows={[
          ["Primary interface",       "SATA, M.2",                    "SAS, NVMe U.2, SATA"],
          ["Workload design",          "~8 hours/day",                  "24×7 continuous"],
          ["Drive redundancy",         "Typically absent",              "RAID — standard"],
          ["Hot-swap",                 "No",                           "Yes (enterprise models)"],
          ["Drive bays",               "1–4",                          "4 to 100+"],
          ["Error recovery",           "Aggressive — RAID-incompatible","Time-limited — RAID-compatible"],
          ["S.M.A.R.T. monitoring",   "Basic",                        "Advanced + controller alerts"],
          ["Dual-port support (SAS)", "No",                           "Yes"],
          ["Support lifecycle",        "Consumer warranty",             "Enterprise support contract"],
        ]}
        caption="Specific capabilities depend on drive model and server configuration. Always verify with OEM documentation."
      />

      <h3 style={S.h3}>TLER / ERC — Most Important Difference in Practice</h3>
      <p style={S.p}><strong>TLER = Time-Limited Error Recovery | ERC = Error Recovery Control</strong></p>
      <p style={S.p}>When a drive hits a bad sector, it tries to recover it.</p>
      <ul style={S.ul}>
        <li><strong>Consumer drive:</strong> Retries aggressively — for 30 to 120 seconds. The RAID controller does not wait that long — it marks the drive as failed. The array degrades even though the drive is physically fine.</li>
        <li><strong>Enterprise drive:</strong> Error recovery is time-limited (typically 7–15 seconds). The drive tells the controller "there is an error, you handle it." RAID handles the error properly.</li>
      </ul>
      <Callout type="common-mistake" title="Consumer Drives in Enterprise RAID — Never">
        Never put a consumer drive in an enterprise server RAID. The drive can drop on encountering a single bad sector. If another drive is also worn out — there is a data loss risk. This is the most common and most avoidable production mistake.
      </Callout>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — DAS ARCHITECTURE
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="das-architecture" style={S.h2}>DAS Architecture</h2>

      <h3 style={S.h3}>Data Path</h3>
      <CodeBlock lang="text">
{`[ Application / Database / VM ]
             |
[ OS + File System ]
             |
[ Storage Driver ]
             |
[ Storage Controller / HBA ]
             |
[ Backplane ]
             |
[ Physical Drives — HDD / SSD / NVMe ]

This data path is completely local.
No network, no switch, no protocol handshake.`}
      </CodeBlock>

      <Figure caption="Fig 1 — DAS Data Path Overview. Left: Internal DAS showing direct path from server to drive bays with no network. Right: External JBOD connected via direct SAS cable. Note the crossed-out network switch — it does not exist in DAS.">
        <DasDataPath />
      </Figure>

      <h3 style={S.h3}>Component 1 — Storage Controller / HBA</h3>
      <ComparisonTable
        title="Controller Types"
        headers={["Type", "What It Does", "When to Use"]}
        rows={[
          ["RAID Controller", "Hardware RAID — has its own processor and cache RAM. Parity, caching, patrol read all at hardware level.", "Production workloads where hardware RAID protection is needed"],
          ["HBA (Host Bus Adapter)", "Presents drives directly to the OS — no RAID processing. The OS or software decides.", "HCI (vSAN/Nutanix), software RAID, direct disk access"],
          ["Integrated Controller", "Built into the motherboard — mostly SATA. Limited drive count and features.", "Entry-level servers, OS boot drives only"],
        ]}
        caption="OEM Examples — Dell: PERC H755 (RAID), HBA355i (HBA). HPE: Smart Array P408i-a (RAID), SR Gen11 (HBA). Lenovo: RAID 9350-8i, 430-8i HBA."
      />

      <h3 style={S.h3}>Component 2 — Backplane</h3>
      <p style={S.p}>A passive or active PCB inside the server that connects the drive bays to the storage controller. It routes both power and data signals. Hot-swap comes from the backplane — every bay is controlled independently.</p>
      <p style={S.p}>An <strong>active backplane</strong> has a SAS expander — multiple drives can connect through one HBA port. A <strong>passive backplane</strong> only routes signals — simpler, fewer points of failure.</p>

      <h3 style={S.h3}>Component 3 — Physical Drives</h3>
      <ComparisonTable
        title="Drive Types in DAS"
        headers={["Type", "Interface", "Typical Speed Range*", "Production Use"]}
        rows={[
          ["HDD (7200 RPM)",   "SAS / SATA",         "150–250 MB/s sequential",  "Bulk storage, cold data, backups"],
          ["SSD",              "SAS / SATA",          "500–600 MB/s",             "Mixed workloads, cost-efficient"],
          ["NVMe SSD",         "PCIe (U.2, M.2, E1.S)", "3,500–12,000+ MB/s",   "Databases, AI/ML, highest performance"],
        ]}
        caption="*Approximate peak sequential read. Actual throughput varies with RAID level, queue depth and workload type. Baseline test mandatory before production."
      />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — DAS TYPES
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="das-ke-types" style={S.h2}>Types of DAS</h2>

      <h3 style={S.h3}>Type 1 — Internal DAS</h3>
      <p style={S.p}>Drives installed inside the server chassis. <strong>The most common form of DAS — present in every rack server.</strong></p>
      <p style={S.p}>Drives fit into the server's front or rear drive bays — connected to the controller through the backplane.</p>

      <Figure caption="Fig 2 — Internal Drive Bay Layout — 2U server front view. Bay 7 (amber) = failed drive with fault LED on. Bay 12 (green) = active rebuild. Bay numbering starts at 0 from top-left. Inset shows drive carrier components.">
        <DasBayLayout />
      </Figure>

      <p style={S.p}><strong>Generic concept:</strong> A 2U server typically has 24 × 2.5" SFF bays or 12 × 3.5" LFF bays. The actual count depends on the server model and chassis design.</p>

      <Callout type="maintenance" title="OEM Examples — Internal DAS Servers">
        <ul style={{ ...S.ul, marginBottom: 0 }}> <li><strong>Dell:</strong> PowerEdge R750 — up to 24 × 2.5" SFF (SAS/SATA/NVMe mix), R6525 — NVMe-heavy configurations</li> <li><strong>HPE:</strong> ProLiant DL380 Gen11 — 8 LFF or 24 SFF bays, NVMe-capable; DL360 Gen11 — 1U dense, up to 10 SFF</li> <li><strong>Lenovo:</strong> ThinkSystem SR650 V3, SR630 V3 — flexible bay configurations</li> <li><strong>Supermicro:</strong> 1029P series — dense NVMe-only configurations</li> </ul> Always verify current specs on vendor site — models update frequently.
      </Callout>

      <h3 style={S.h3}>Type 2 — External DAS / JBOD</h3>
      <p style={S.p}>A separate enclosure — outside the server — connected directly by SAS cable to the server's HBA/controller. <strong>No network. Direct cable.</strong></p>
      <p style={S.p}><strong>JBOD = Just a Bunch of Disks</strong> — presents the drives as-is without RAID. The host server decides how to use them.</p>
      <p style={S.p}>When it is used:</p>
      <ul style={S.ul}>
        <li>The server's internal bays are full</li>
        <li>A lot of capacity is needed with a single server</li>
        <li>Additional raw drives are needed for HCI software</li>
      </ul>

      <Figure caption="Fig 3 — External JBOD Connection. Server HBA → Direct SAS Cable (SFF-8644 connector, max ~10 m) → JBOD Enclosure. No network switch exists in this path. Optional daisy-chain to second JBOD via SAS OUT port.">
        <DasJbodConnection />
      </Figure>

      <Callout type="maintenance" title="OEM Examples — External JBOD">
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>Dell:</strong> PowerVault ME5012 (12 × LFF), ME5024 (24 × SFF)</li>
          <li><strong>HPE:</strong> D3610 (12 × LFF SAS), D3710 (25 × SFF SAS)</li>
          <li><strong>Supermicro:</strong> 847 series — up to 45 bays, 4U</li>
        </ul>
      </Callout>

      <h3 style={S.h3}>Type 3 — NVMe-Based DAS (Direct PCIe Attached)</h3>
      <p style={S.p}>NVMe SSDs connected directly on the PCIe bus — or through a U.2 backplane. <strong>Currently the fastest commercially available DAS option.</strong></p>
      <p style={S.p}>Latency: single-digit microseconds. Sequential throughput: in GB/s. IOPS: in the hundreds of thousands. AI/ML training, real-time analytics, high-frequency databases — this is where NVMe DAS is becoming the standard choice.</p>

      <Callout type="maintenance" title="OEM Examples — NVMe DAS">
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>Dell:</strong> PowerEdge R6525 — up to 24 × NVMe U.2</li>
          <li><strong>HPE:</strong> ProLiant DL380 Gen11 — NVMe U.2 + boot NVMe</li>
          <li><strong>Supermicro:</strong> SSG-121E-NES24R — NVMe-focused dense configuration</li>
        </ul>
      </Callout>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 — INTERFACES
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="das-interfaces" style={S.h2}>DAS Interfaces — Brief Introduction</h2>
      <p style={S.p}>Detailed interface chapters will come later. Here is just an overview for DAS context.</p>
      <ComparisonTable
        title="DAS Storage Interfaces"
        headers={["Interface", "Type", "Approx. Max Speed*", "Typical Use in DAS"]}
        rows={[
          ["SATA III",          "Serial",          "~600 MB/s",       "OS drives, budget servers, cold data"],
          ["SAS 12Gb/s",        "Serial Attached SCSI", "~1,200 MB/s","Enterprise HDDs and SSDs — mainstream"],
          ["SAS 24Gb/s",        "Serial Attached SCSI", "~2,400 MB/s","High-performance enterprise SSDs"],
          ["NVMe PCIe 4.0 x4", "PCIe direct",     "~7,000 MB/s",    "High-performance databases, AI"],
          ["NVMe PCIe 5.0 x4", "PCIe direct",     "~14,000 MB/s",   "Next-gen AI/HPC servers"],
        ]}
        caption="*Approximate peak sequential read speeds. Actual performance varies significantly with RAID level, queue depth and workload pattern."
      />
      <Callout type="important" title="The Critical Advantage of SAS — Dual Port">
        Enterprise SAS drives are dual-port — they can connect to the server through two independent paths. One path fails → the other is active. SATA is single-port. Prefer SAS for mission-critical storage.
      </Callout>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6 — USE CASES
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="das-kahan-use" style={S.h2}>Where DAS Is Used — Production Examples</h2>

      <h3 style={S.h3}>Database Servers — High I/O Workloads</h3>
      <p style={S.p}>For OLTP databases (Oracle, SQL Server, PostgreSQL, MySQL), NVMe or SAS SSD DAS delivers consistent low latency. Compared to network-based storage, latency stays predictable even at peak load. Typical configuration: NVMe/SAS SSD, RAID 10, separate data volume and log volume.</p>

      <h3 style={S.h3}>Virtualization Hosts — Local Boot and Scratch Storage</h3>
      <p style={S.p}>The local datastore of a VMware ESXi or Hyper-V host. Small VMs, test environments, ephemeral workloads — run on local DAS. SAN/NFS is used for shared storage of production VMs — but local NVMe DAS measurably improves host performance as VM density grows.</p>

      <h3 style={S.h3}>Hyperconverged Infrastructure (HCI)</h3>
      <p style={S.p}>VMware vSAN, Nutanix AHV, Microsoft Storage Spaces Direct — all pool locally attached DAS drives through software to create shared storage. The DAS drives of multiple servers form a distributed storage cluster. <strong>The entire foundation of HCI is DAS.</strong></p>

      <h3 style={S.h3}>AI / ML Training Nodes</h3>
      <p style={S.p}>GPU servers need training data very fast — storage speed has to match GPU processing speed. NVMe DAS arrays feed data to GPU servers with microsecond latency. For high-bandwidth sequential reads, NVMe DAS is the purpose-built solution.</p>

      <h3 style={S.h3}>Edge Servers / Remote Locations</h3>
      <p style={S.p}>Branch offices, retail endpoints, factory floors, telecom towers — building a dedicated storage network is impractical. DAS is simple, reliable, network-independent. Maintenance is minimal.</p>

      <h3 style={S.h3}>OS Boot Drives</h3>
      <p style={S.p}><strong>Best Practice:</strong> 2 × enterprise SSD, internal DAS, RAID 1 — in every server. Even if production storage is on SAN, the OS drives stay on local DAS. Always a separate volume — do not mix OS and data.</p>

      <h3 style={S.h3}>Log and Scratch Space</h3>
      <p style={S.p}>Application logs, temporary processing files — local DAS. <strong>Production rule:</strong> Keep the log volume separate from the OS volume. Logs fill up — if they are on the same volume — the OS will crash.</p>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 7 — AVOID
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="das-avoid" style={S.h2}>Where DAS Should Be Avoided</h2>
      <ComparisonTable
        title="DAS — When Not to Use"
        headers={["Scenario", "Reason", "Better Option"]}
        rows={[
          ["Multiple servers need same data", "DAS is not shareable — one server only",       "NAS or SAN"],
          ["VM live migration / vMotion",        "Shared storage required",                    "SAN / NFS"],
          ["Centralized backup infrastructure", "Each server's DAS is managed separately",       "NAS / SAN + backup software"],
          ["Dynamic storage pool scaling",       "Server chassis capacity ceiling",            "SAN / Scale-out NAS"],
          ["HA clustering — shared disk",        "DAS is tied to one server",                     "SAN with multipathing"],
          ["Large file sharing across users",    "DAS is not directly network-accessible",      "NAS"],
          ["Long-distance replication",          "No built-in replication",                  "SAN / NAS with replication"],
        ]}
        caption="The primary limitation of DAS: it is not shareable. It is a fundamental constraint of the architecture — software cannot fix it."
      />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 8 — ADVANTAGES
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="das-advantages" style={S.h2}>Advantages of DAS</h2>
      <ComparisonTable
        title="DAS Advantages"
        headers={["Advantage", "Engineering Reason"]}
        rows={[
          ["Lowest latency",              "Direct path — no network hop, no protocol overhead"],
          ["Highest single-server I/O",   "No shared contention, no network bottleneck"],
          ["Simplest architecture",       "No network config, no zoning, no LUN masking"],
          ["Network-failure independent", "Storage operations fully local"],
          ["Lowest total cost",           "No SAN fabric, no storage OS, no extra licensing"],
        ]}
        caption=""
      />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 9 — LIMITATIONS
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="das-limitations" style={S.h2}>Limitations of DAS</h2>
      <ComparisonTable
        title="DAS Limitations"
        headers={["Limitation", "Engineering Impact"]}
        rows={[
          ["Not shareable",                    "Single server only — fundamental architecture constraint"],
          ["Server-tightly coupled",            "Server fail = DAS inaccessible until recovery or physical drive move"],
          ["Scalability ceiling",               "Server chassis bay count + external JBOD limit"],
          ["No built-in advanced data services","Dedup, compression, snapshots, replication — software solution needed"],
          ["Per-server management overhead",    "100 servers = 100 separate storage management contexts"],
          ["Backup complexity",                 "OS-level agent required — backup server cannot directly access DAS"],
        ]}
        caption=""
      />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 10 — MISCONCEPTIONS
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="misconceptions" style={S.h2}>Common Misconceptions</h2>
      <ul style={S.ul}>
        <li><strong>"DAS is outdated"</strong> — Wrong. HCI platforms (vSAN, Nutanix), AI training infrastructure, NVMe-based databases — all actively use DAS. NVMe DAS is currently the fastest commercially available storage.</li>
        <li><strong>"Internal drives are not DAS"</strong> — Wrong. Internal drives are the most common example of DAS. Every rack server has them.</li>
        <li><strong>"DAS has no RAID"</strong> — Wrong. RAID controller or software RAID — both are standard practice with DAS.</li>
        <li><strong>"External storage = SAN"</strong> — Wrong. An external enclosure connected directly to one server by SAS cable — that is DAS. SAN has a dedicated network and protocols.</li>
        <li><strong>"DAS is only for HDDs"</strong> — Wrong. NVMe DAS is currently the fastest option. Modern AI servers run on NVMe DAS.</li>
        <li><strong>"DAS is only for small setups"</strong> — Wrong. Hyperscale facilities use NVMe DAS per server. Enterprise HCI is deployed globally — all DAS-based.</li>
      </ul>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 11 — DAS vs NAS vs SAN
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="das-vs-nas-san" style={S.h2}>DAS and NAS/SAN — Brief Comparison</h2>
      <p style={S.p}>Dedicated chapters for <TopicLink slug="nas" variant="inline" /> and <TopicLink slug="san" variant="inline" /> come later. Here we only want to clarify positioning.</p>
      <ComparisonTable
        title="DAS vs NAS vs SAN"
        headers={["", "DAS", "NAS", "SAN"]}
        rows={[
          ["Network",             "No",              "Ethernet",         "FC / iSCSI"],
          ["Access type",         "Block",            "File",             "Block"],
          ["Multiple servers",    "No — single only", "Yes",              "Yes"],
          ["Latency",             "Lowest",           "Medium",           "Low"],
          ["Complexity",          "Simplest",         "Medium",           "Highest"],
          ["Cost",                "Lowest",           "Medium",           "Highest"],
          ["Best for",            "Single server perf, HCI", "File sharing, backup", "Shared databases, VMware HA"],
        ]}
        caption="Simple rule: One server, max performance → DAS. File sharing → NAS. Shared block storage, VMware → SAN."
      />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 12 — OEM REFERENCE
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="oem-reference" style={S.h2}>Enterprise OEM Reference</h2>
      <p style={S.p}>Any enterprise rack server typically offers: internal bays (LFF 3.5" or SFF 2.5" or NVMe U.2, ranging 4 to 24+ bays), external expansion via SAS JBOD, and controller options (RAID controller or HBA).</p>

      <h3 style={S.h3}>Dell Technologies</h3>
      <ComparisonTable
        title=""
        headers={["Category", "Model", "Key Spec"]}
        rows={[
          ["Internal DAS server",   "PowerEdge R750",    "Up to 24 × 2.5\" SFF (SAS/SATA/NVMe)"],
          ["NVMe-heavy server",     "PowerEdge R6525",   "Up to 24 × NVMe U.2"],
          ["External JBOD",         "PowerVault ME5012", "12 × LFF, SAS expansion"],
          ["External JBOD",         "PowerVault ME5024", "24 × SFF, SAS expansion"],
          ["RAID Controller",       "PERC H755",         "PCIe 4.0, 8GB cache, BBU/FBWC"],
          ["HBA",                   "HBA355i",           "Pass-through, for HCI"],
        ]}
        caption="Verify current specs at dell.com — models and configurations change with generation releases."
      />

      <h3 style={S.h3}>HPE (Hewlett Packard Enterprise)</h3>
      <ComparisonTable
        title=""
        headers={["Category", "Model", "Key Spec"]}
        rows={[
          ["Internal DAS server",   "ProLiant DL380 Gen11",   "8 LFF or 24 SFF, NVMe-capable"],
          ["Dense 1U server",       "ProLiant DL360 Gen11",   "Up to 10 SFF drives"],
          ["External JBOD",         "D3610",                  "12 × LFF SAS"],
          ["External JBOD",         "D3710",                  "25 × SFF SAS"],
          ["RAID Controller",       "Smart Array P408i-a",    "2GB cache, FBWC"],
          ["HBA",                   "SR Gen11",               "Pass-through, for HCI"],
        ]}
        caption="Verify current specs at hpe.com."
      />

      <h3 style={S.h3}>Lenovo and Supermicro</h3>
      <ComparisonTable
        title=""
        headers={["Vendor", "Category", "Model"]}
        rows={[
          ["Lenovo",      "Internal DAS server",   "ThinkSystem SR650 V3, SR630 V3"],
          ["Lenovo",      "RAID Controller",        "ThinkSystem RAID 9350-8i"],
          ["Lenovo",      "HBA",                   "ThinkSystem 430-8i"],
          ["Supermicro",  "NVMe server",           "SSG-121E-NES24R (24 × NVMe AIC)"],
          ["Supermicro",  "External JBOD",         "847 series — up to 45 bays"],
        ]}
        caption=""
      />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 13 — TERMINOLOGY
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="terminology" style={S.h2}>Important Storage Terminology</h2>
      <ComparisonTable
        title=""
        headers={["Term", "Engineering Meaning"]}
        rows={[
          ["RAID",              "Redundant Array of Independent Disks — combining drives for redundancy or performance. A dedicated chapter will follow."],
          ["HBA",               "Host Bus Adapter — presents drives directly to the OS, no RAID processing"],
          ["RAID Controller",   "Dedicated hardware controller — manages RAID, has its own processor and cache"],
          ["Backplane",         "Internal PCB — routes signals between drive bays and the storage controller"],
          ["JBOD",              "Just a Bunch of Disks — drives as-is presented, no RAID, typically external enclosure"],
          ["SAS",               "Serial Attached SCSI — enterprise interface, dual-port, hot-swap"],
          ["SATA",              "Serial ATA — common interface, single-port, lower cost"],
          ["NVMe",              "Non-Volatile Memory Express — PCIe-based SSD protocol"],
          ["U.2",               "Enterprise NVMe SSD form factor — 2.5\" size, hot-swap support"],
          ["Hot-swap",          "Replacing a drive without shutting down the server"],
          ["LFF / SFF",         "Large Form Factor (3.5\") / Small Form Factor (2.5\")"],
          ["IOPS",              "Input/Output Operations Per Second"],
          ["MTBF",              "Mean Time Between Failures — manufacturer-specified reliability indicator"],
          ["TLER / ERC",        "Time-Limited Error Recovery — enterprise drive RAID compatibility feature"],
          ["S.M.A.R.T.",       "Self-Monitoring, Analysis and Reporting Technology — drive health monitoring"],
          ["BBU",               "Battery Backup Unit — protects the controller cache on power loss"],
          ["FBWC",              "Flash-Backed Write Cache — the modern capacitor/flash alternative to BBU"],
          ["Write Cache",       "Controller RAM buffer that caches writes — improves performance"],
          ["Hot Spare",         "Pre-assigned spare drive — automatically rebuilds when a drive fails"],
          ["Reallocated Sector","A bad sector replaced from the spare area — tracked in S.M.A.R.T."],
          ["DWPD",              "Drive Writes Per Day — SSD endurance specification"],
        ]}
        caption="Terms related to RAID levels, filesystem types, LVM, SAN protocols — will be covered in dedicated chapters."
      />

      {/* ══════════════════════════════════════════════════════════════════
          LIFECYCLE PHASES
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="lifecycle-planning" style={S.h2}>Phase 1 — Planning</h2>
      <Callout type="important" title="Workload Analysis First — Procurement Later">
        Selecting drives without considering the workload is the most common planning mistake. First define IOPS, latency, capacity and redundancy requirements — then choose the hardware.
      </Callout>

      <h3 style={S.h3}>Drive Type Selection by Workload</h3>
      <ComparisonTable
        title=""
        headers={["Workload", "Recommended Drive Type", "RAID Level", "Notes"]}
        rows={[
          ["OS boot drives",          "2 × Enterprise SSD (SATA/SAS)",  "RAID 1",  "Mandatory — separate volume"],
          ["High-performance DB",     "NVMe U.2 or SAS SSD",            "RAID 10", "Best performance + redundancy"],
          ["Mixed enterprise",        "SAS SSD",                         "RAID 5/10","Balance of capacity and protection"],
          ["High-capacity bulk",      "SAS HDD 7200 RPM",               "RAID 6",  "2-drive fault tolerance"],
          ["AI/ML training data",     "NVMe U.2",                        "RAID 0/10","Data typically regenerable from source"],
        ]}
        caption=""
      />

      <h3 style={S.h3}>RAID Usable Capacity Reference</h3>
      <ComparisonTable
        title=""
        headers={["RAID Level", "Min Drives", "Usable Capacity", "Drive Failures Tolerated"]}
        rows={[
          ["RAID 0",  "2+",       "100% of raw",      "0 — no redundancy"],
          ["RAID 1",  "2",        "50%",               "1"],
          ["RAID 5",  "3+",       "(N−1)/N × raw",    "1"],
          ["RAID 6",  "4+",       "(N−2)/N × raw",    "2"],
          ["RAID 10", "4+ (even)","50%",               "1 per mirror pair"],
        ]}
        caption="Example: 6 × 1.92TB SAS SSD, RAID 5 → (5/6) × 11.52TB = 9.6TB usable. With 15% application buffer → provision ~8TB."
      />

      <h3 style={S.h3}>Controller Selection</h3>
      <ComparisonTable
        title=""
        headers={["Requirement", "Choose"]}
        rows={[
          ["Hardware RAID, write cache, large controller cache",        "RAID Controller with BBU/FBWC — Recommended Best Practice"],
          ["HCI software (vSAN/Nutanix), or OS/software RAID",         "HBA (pass-through)"],
          ["OS boot only, small server, minimal budget",                "Integrated motherboard controller — Optional"],
        ]}
        caption=""
      />

      <h3 style={S.h3}>Hot Spare — Decision</h3>
      <ul style={S.ul}>
        <li><strong>Recommended Best Practice</strong> for production systems: 1 dedicated global hot spare per controller. Drive fail → automatic rebuild without engineer present.</li>
        <li><strong>Optional</strong> for dev/test environments where downtime is acceptable.</li>
      </ul>

      {/* ── Phase 2: Installation ── */}
      <h2 id="lifecycle-installation" style={S.h2}>Phase 2 — Installation</h2>

      <h3 style={S.h3}>Drive Installation Procedure</h3>
      <ol style={{ ...S.ul, listStyleType: "decimal" }}>
        <li>Confirm bay numbering from the server documentation — Bay 0 is typically left or top</li>
        <li>Mount the drive in the drive carrier — tighten the screws evenly</li>
        <li>Slide it into the bay — the lock mechanism must engage (click sound)</li>
        <li>Check the bay LED activity — did the server detect the drive?</li>
      </ol>

      <h3 style={S.h3}>RAID Configuration — Controller Utility</h3>
      <CodeBlock label="Dell — OpenManage Storage Manager / perccli64" lang="bash">
{`# During server POST, Ctrl+R → RAID controller configuration
# Or from within the OS:
perccli64 /c0 show all`}
      </CodeBlock>
      <CodeBlock label="HPE — Smart Storage Administrator (SSA)" lang="bash">
{`# During POST, F10 → Intelligent Provisioning → Smart Storage Administrator
# Or from within the OS:
ssacli ctrl all show status`}
      </CodeBlock>
      <p style={S.p}><strong>Generic steps (controller-agnostic):</strong> List available drives → select RAID level, select drives, assign hot spare → Initialize (<strong>Full Initialize recommended</strong> for new deployments — bad sectors get identified) → Create the logical drive / virtual disk.</p>

      <h3 style={S.h3}>External JBOD — Cabling</h3>
      <ul style={S.ul}>
        <li>Modern connector: <strong>SFF-8644</strong> (Mini-SAS HD)</li>
        <li>Older servers: SFF-8088 (Mini-SAS)</li>
        <li>Cable lengths: Same rack — 0.5m–1m; adjacent rack — 2m–3m</li>
        <li><strong>Maximum reliable SAS cable length: ~10 meters</strong> (active cables ~20m+ possible)</li>
      </ul>
      <Callout type="best-practice" title="Cable Labeling — Mandatory Best Practice">
        Label both ends: [Server Name]/[HBA Port] | [JBOD Unit]/[SAS IN Port]. This guides future maintenance. Unlabeled SAS cables are a troubleshooting nightmare.
      </Callout>

      {/* ── Phase 3: OS Config ── */}
      <h2 id="lifecycle-os-config" style={S.h2}>Phase 3 — OS-Level Configuration</h2>

      <h3 style={S.h3}>Linux</h3>
      <CodeBlock label="Linux — Disk identification and filesystem creation" lang="bash">
{`# Identify the new disk
lsblk
# OR
fdisk -l

# Create a partition (GPT — mandatory for drives >2TB)
gdisk /dev/sdb

# Create the filesystem
mkfs.xfs /dev/sdb1     # XFS — databases, large files, high performance
mkfs.ext4 /dev/sdb1   # ext4 — general purpose

# Mount it
mkdir /data
mount /dev/sdb1 /data

# Persistent mount — /etc/fstab
# Use the UUID — not /dev/sdX (the device name can change on boot)
echo "UUID=$(blkid -s UUID -o value /dev/sdb1)  /data  xfs  defaults,nofail  0  2" >> /etc/fstab`}
      </CodeBlock>
      <Callout type="important" title="nofail Flag — Mandatory in Production">
        The <code>nofail</code> flag in /etc/fstab is important — if the storage mount fails, the OS boot does not halt. Without this flag, a drive issue can send the server into a boot loop.
      </Callout>

      <h3 style={S.h3}>Windows</h3>
      <p style={S.p}>Using Disk Management (diskmgmt.msc) or <code>diskpart</code>: Initialize the disk → <strong>GPT</strong> (mandatory for 2TB+ or UEFI systems) → Create a volume → Format NTFS → Assign a drive letter.</p>

      <h3 style={S.h3}>Volume Planning — Best Practice</h3>
      <ComparisonTable
        title=""
        headers={["Volume", "Purpose"]}
        rows={[
          ["OS Volume",      "OS only — no application data"],
          ["Data Volume",    "Application data files"],
          ["Log Volume",     "Application logs — keep separate: high-write workloads will not affect the OS"],
          ["DB Log Volume",  "Database transaction logs — separate from data files (I/O patterns are different)"],
        ]}
        caption=""
      />

      {/* ── Phase 4: Commissioning ── */}
      <h2 id="lifecycle-commissioning" style={S.h2}>Phase 4 — Commissioning and Baseline Testing</h2>

      <h3 style={S.h3}>RAID Health Verification — Mandatory Before Production</h3>
      <CodeBlock label="Dell — perccli64" lang="bash">
{`perccli64 /c0 /v0 show           # Virtual disk status — should be "Optimal"
perccli64 /c0 /eall /sall show   # Physical disk status — should be "Online"`}
      </CodeBlock>
      <CodeBlock label="HPE — ssacli" lang="bash">
{`ssacli ctrl slot=0 ld all show detail
ssacli ctrl slot=0 pd all show detail`}
      </CodeBlock>

      <h3 style={S.h3}>Pre-Production Checklist</h3>
      <ul style={S.ul}>
        <li>RAID array: Optimal ✓</li>
        <li>All drives: Online ✓</li>
        <li>Hot spare: Ready ✓</li>
        <li>Controller cache: Enabled ✓</li>
        <li>BBU / FBWC: Healthy, Charged ✓</li>
      </ul>

      <h3 style={S.h3}>Performance Baseline — Recommended Best Practice</h3>
      <Callout type="best-practice" title="Baseline Testing — Always Do It Before Production">
        Baseline testing is not optional for production. If a "storage has become slow" complaint comes in 6 months later — you need data to compare against. Without a baseline, root cause analysis becomes impossible.
      </Callout>
      <CodeBlock label="Linux — fio performance baseline (fio 3.x+, tested on RHEL 8/9, Ubuntu 20.04+)" lang="bash">
{`# Install fio (RHEL/CentOS: yum install fio, Ubuntu: apt install fio)

# Sequential Read — 1M block
fio --name=seq-read --filename=/dev/sdb --bs=1M --size=10G \
    --numjobs=4 --iodepth=32 --rw=read --direct=1 \
    --ioengine=libaio --runtime=60 --time_based

# Sequential Write — 1M block
fio --name=seq-write --filename=/dev/sdb --bs=1M --size=10G \
    --numjobs=4 --iodepth=32 --rw=write --direct=1 \
    --ioengine=libaio --runtime=60 --time_based

# Random Read — 4K (database workload simulation)
fio --name=rand-read --filename=/dev/sdb --bs=4k --size=10G \
    --numjobs=4 --iodepth=64 --rw=randread --direct=1 \
    --ioengine=libaio --runtime=60 --time_based

# Random Write — 4K
fio --name=rand-write --filename=/dev/sdb --bs=4k --size=10G \
    --numjobs=4 --iodepth=64 --rw=randwrite --direct=1 \
    --ioengine=libaio --runtime=60 --time_based`}
      </CodeBlock>
      <p style={S.p}><strong>Document:</strong> Sequential read/write (MB/s), Random IOPS (4K read/write), Average latency (ms). This is the baseline for future comparison.</p>

      <h3 style={S.h3}>S.M.A.R.T. Baseline Check</h3>
      <CodeBlock label="smartmontools (RHEL: yum install smartmontools, Ubuntu: apt install smartmontools)" lang="bash">
{`smartctl -a /dev/sda
# On new drives these should all be zero:
# Reallocated_Sector_Ct, Pending_Sector_Count, Uncorrectable_Sector_Ct`}
      </CodeBlock>

      {/* ── Phase 5: Monitoring ── */}
      <h2 id="lifecycle-monitoring" style={S.h2}>Phase 5 — Monitoring Setup</h2>

      <h3 style={S.h3}>iDRAC / iLO Alerts — Mandatory</h3>
      <ComparisonTable
        title="Alert Priority Configuration"
        headers={["Alert Type", "Priority"]}
        rows={[
          ["Drive predictive failure",    "P1 — Immediate action required"],
          ["RAID array degraded",          "P1 — Immediate action required"],
          ["RAID array failed",            "P1 Critical — Emergency"],
          ["Controller cache degraded",   "P2 — Schedule maintenance"],
          ["BBU / FBWC failure",          "P2 — Schedule replacement"],
        ]}
        caption="Configure email or SNMP traps to monitoring system. iDRAC/iLO → Alerts → configure SMTP or SNMP destination."
      />

      <h3 style={S.h3}>OS-Level Monitoring</h3>
      <CodeBlock label="Linux — iostat and S.M.A.R.T." lang="bash">
{`# Disk utilization (sysstat package)
iostat -x 1 5
# %util near 100% + high await = storage bottleneck

# Filesystem usage
df -h   # 80%+ = configure the warning threshold

# S.M.A.R.T. automated monitoring — smartd daemon
# Add to /etc/smartd.conf:
/dev/sda -a -o on -S on -s (S/../.././02|L/../../6/03) \
    -m storage-alerts@company.com`}
      </CodeBlock>
      <p style={S.p}><strong>Capacity trending:</strong> Record daily utilization. <strong>Alert threshold: 80% utilized → Warning; 90% → Critical.</strong></p>

      {/* ── Phase 6: Daily Ops ── */}
      <h2 id="lifecycle-ops" style={S.h2}>Phase 6 — Daily Operations</h2>

      <h3 style={S.h3}>Daily Checks</h3>
      <ComparisonTable
        title=""
        headers={["Check", "Method", "Expected"]}
        rows={[
          ["RAID array status",                "iDRAC/iLO Storage tab",  "All arrays: Optimal"],
          ["Drive predictive failure alerts",  "Monitoring tool / email", "No active alerts"],
          ["Storage utilization",              "OS monitoring",           "Below 80%"],
          ["BBU / FBWC status",               "iDRAC/iLO Storage → Controller", "Charged / Healthy"],
          ["Active rebuild status (if any)",  "Controller utility",      "Progress % increasing"],
        ]}
        caption=""
      />

      <h3 style={S.h3}>Weekly Checks</h3>
      <CodeBlock label="Linux — Weekly storage health" lang="bash">
{`# S.M.A.R.T. health — all drives
smartctl -H /dev/sda  # Expected: PASSED

# Controller event log
perccli64 /c0 show events   # Dell
ssacli ctrl slot=0 show events  # HPE

# Reallocated sectors trend — compare to baseline
smartctl -A /dev/sda | grep "Reallocated"`}
      </CodeBlock>

      <p style={S.p}><strong>Monthly — Physical inspection:</strong> Drive bay LEDs: Amber/orange = drive issue; blue blinking = activity normal. External JBOD (if present): Fan noise, enclosure LEDs, cable condition. SAS cables: Properly seated, no damage, labels intact.</p>

      {/* ── Phase 7: Alert Handling ── */}
      <h2 id="lifecycle-alerts" style={S.h2}>Phase 7 — Alert Handling</h2>

      <h3 style={S.h3}>Drive Predictive Failure Alert — Action Sequence</h3>
      <CodeBlock lang="text">
{`Alert received
      |
iDRAC/iLO confirm — which bay, drive serial, S.M.A.R.T. attribute
      |
Replacement drive procure — same interface, form factor, capacity (same or larger)
      |
Schedule hot-swap (predictive = some lead time, don't delay unnecessarily)
      |
Hot-swap procedure (see Phase 8)
      |
Monitor the rebuild
      |
Rebuild complete → RAID Optimal → document + close ticket`}
      </CodeBlock>

      <Callout type="warning" title="RAID Degraded Alert — First Task: Verify the Backup">
        When a RAID degraded alert arrives, the first task — <strong>verify the backup status.</strong> Replacement comes after. If another drive also fails during the rebuild — there must be a recovery option.
      </Callout>

      <h3 style={S.h3}>Rebuild Time Estimates</h3>
      <ComparisonTable
        title=""
        headers={["Drive Type", "Approximate Rebuild Time*"]}
        rows={[
          ["1TB SAS HDD, RAID 5",    "4–8 hours"],
          ["1.92TB SAS SSD, RAID 5", "1–3 hours"],
          ["3.84TB NVMe, RAID 5",    "30–90 minutes"],
        ]}
        caption="*Approximate only — actual time depends heavily on concurrent I/O load. High load = slower rebuild."
      />

      {/* ── Phase 8: Replacement ── */}
      <h2 id="lifecycle-replacement" style={S.h2}>Phase 8 — Drive Replacement Procedure</h2>

      <h3 style={S.h3}>Pre-Check</h3>
      <ol style={{ ...S.ul, listStyleType: "decimal" }}>
        <li>RAID status confirm — degraded (one drive gone), not failed (multiple gone)</li>
        <li>Identify the failed drive bay — turn on the physical locate LED from iDRAC</li>
        <li>Replacement drive ready — same interface, form factor, speed; capacity same or larger</li>
        <li>Verify the current backup status</li>
      </ol>

      <h3 style={S.h3}>Hot-Swap Procedure</h3>
      <ol style={{ ...S.ul, listStyleType: "decimal" }}>
        <li>Release the carrier latch — press the mechanism</li>
        <li>Drive carrier gently pull out — slow, steady</li>
        <li>Old drive: remove the screws, take it out of the carrier</li>
        <li>New drive: fit it into the carrier, tighten the screws evenly</li>
        <li>Slide it into the bay — it must be fully seated (click sound)</li>
        <li>Check the activity LED</li>
      </ol>

      <h3 style={S.h3}>Post-Replacement Verification</h3>
      <CodeBlock label="Dell — rebuild status monitor" lang="bash">
{`# Rebuild started?
perccli64 /c0 /v0 show  # Should show "Rebuilding: X%"

# Monitor progress
watch -n 30 "perccli64 /c0 /v0 show | grep -E 'State|Progress'"`}
      </CodeBlock>
      <CodeBlock label="HPE — rebuild status" lang="bash">
{`ssacli ctrl slot=0 ld 1 show`}
      </CodeBlock>

      <Callout type="danger" title="During Rebuild — What NOT to Do">
        <ul style={{ ...S.ul, marginBottom: 0 }}> <li>Do not remove a second drive</li> <li>Do not reboot the server (unless genuine emergency)</li> <li>Do not upgrade the controller firmware</li> <li>Do not deliberately schedule heavy I/O workloads during the rebuild window</li> </ul>
      </Callout>

      {/* ── Phase 9: PM ── */}
      <h2 id="lifecycle-pm" style={S.h2}>Phase 9 — Preventive Maintenance</h2>
      <ComparisonTable
        title="PM Schedule"
        headers={["Frequency", "Activity"]}
        rows={[
          ["Monthly",   "RAID status all arrays: Optimal ✓ | S.M.A.R.T. health: PASSED ✓ | Controller event log: No errors ✓ | Capacity trending: On track ✓ | BBU status: Charged ✓"],
          ["Quarterly", "Full S.M.A.R.T. attribute review — reallocated sectors increasing? | Drive firmware — vendor advisory check | Controller firmware — security/stability updates | BBU capacity test | fio performance comparison vs baseline | Cable inspection (external JBOD)"],
          ["Annual",    "Drive age assessment — manufacturer warranty/DWPD lifespan | Proactive replacement planning — 3+ year old HDDs in critical systems | Documentation audit — bay mapping, RAID config current | Full storage audit — all volumes, arrays, spare drives"],
        ]}
        caption=""
      />
      <Callout type="best-practice" title="Proactive Drive Replacement — Don't Wait for Failure">
        Enterprise HDDs are typically rated for ~5 years. SSD endurance depends on the DWPD specification and workload. Drives from the same batch tend to fail together — build a proactive replacement cycle, do not wait for individual failures.
      </Callout>

      {/* ── Phase 10: Troubleshooting ── */}
      <h2 id="lifecycle-troubleshoot" style={S.h2}>Phase 10 — Troubleshooting</h2>

      <h3 style={S.h3}>Scenario 1 — RAID Degraded</h3>
      <CodeBlock label="Identify the failed drive" lang="bash">
{`# Dell
perccli64 /c0 /eall /sall show
# Look for "Failed" or "Unconfigured(bad)"

# HPE
ssacli ctrl slot=0 pd all show detail
# Look for "Failed"

# Physical: iDRAC → Storage → Physical Drives → Locate LED
# Or: Bay amber LED visual confirmation`}
      </CodeBlock>
      <p style={S.p}>→ Drive replacement procedure (Phase 8)</p>

      <h3 style={S.h3}>Scenario 2 — Storage Performance Degraded</h3>
      <CodeBlock label="Performance degradation diagnosis" lang="bash">
{`# Step 1: Is a RAID rebuild running? (Expected degradation)
perccli64 /c0 /v0 show

# Step 2: I/O saturation check
iostat -x 1 10
# %util near 100% + high await (ms) = storage bottleneck

# Step 3: S.M.A.R.T. wear check
smartctl -A /dev/sda | grep -E "Reallocated|Pending|Uncorrectable|Wear_Leveling"

# Significant degradation = possible controller issue or drive degradation
# Compare to commissioning baseline`}
      </CodeBlock>

      <h3 style={S.h3}>Scenario 3 — Drive / Volume Not Visible in the OS</h3>
      <CodeBlock label="Drive detection check" lang="bash">
{`# Did the controller detect it?
perccli64 /c0 /eall /sall show  # Is the drive listed?
ssacli ctrl slot=0 pd all show detail

# OS level
lsblk
dmesg | grep -iE "sd[a-z]|nvme|ata"   # Kernel messages`}
      </CodeBlock>
      <p style={S.p}>If not detected by controller: Is the drive properly seated? → Pull it out and re-insert. Try a different bay — backplane port issue? Re-seat the SAS cable (for external JBOD). Check the controller event log.</p>

      <h3 style={S.h3}>Scenario 4 — Controller Not Detected / Server Boot Issue</h3>
      <ul style={S.ul}>
        <li>Is the controller listed in BIOS/UEFI?</li>
        <li>Is it properly seated in the PCIe slot?</li>
        <li>Power off → remove → clean contacts → re-insert → try a different PCIe slot</li>
        <li>Controller error in the iDRAC event log?</li>
        <li>Engage OEM support — controller hardware failure possible</li>
      </ul>

      <h3 style={S.h3}>Scenario 5 — Volume Full</h3>
      <CodeBlock label="Identify space consumption" lang="bash">
{`# What's consuming space
du -sh /* 2>/dev/null | sort -rh | head -20

# Find large files
find /data -size +1G -type f 2>/dev/null

# Common causes:
# 1. Application logs not rotating
# 2. Core dumps from application crashes
# 3. Temp files not cleaned
# 4. Database growth — capacity planning required`}
      </CodeBlock>
      <p style={S.p}>Short-term: Clean up unnecessary files. Long-term: Storage expansion plan (Phase 13).</p>

      <h3 style={S.h3}>Common Field Mistakes — Quick Reference</h3>
      <Callout type="common-mistake" title="Most Common Production DAS Mistakes">
        <ul style={{ ...S.ul, marginBottom: 0 }}> <li><strong>Consumer drives in RAID:</strong> No TLER = drive drop risk. Never do this.</li> <li><strong>Not verifying the backup during a RAID rebuild:</strong> A second failure during rebuild = potential data loss.</li> <li><strong>Not checking RAID status after a hot-swap:</strong> Did the rebuild actually start? Always verify in the controller.</li> <li><strong>OS and data on the same volume:</strong> Logs fill = OS crash. Separate volumes mandatory.</li> <li><strong>Not documenting bay mapping:</strong> Locating a failed drive among 24 bays becomes a nightmare.</li> <li><strong>Not taking a performance baseline:</strong> There will be no comparison point for future issues.</li> <li><strong>Enabling write cache without a BBU:</strong> Power cut = cached data lost = corruption risk.</li> </ul>
      </Callout>

      {/* ── Phase 11: RCA ── */}
      <h2 id="lifecycle-rca" style={S.h2}>Phase 11 — Root Cause Analysis</h2>
      <p style={S.p}><strong>Drive failure RCA — minimum documentation:</strong></p>
      <ol style={{ ...S.ul, listStyleType: "decimal" }}>
        <li><strong>What failed:</strong> Drive model, serial number, bay position, age (from installation date)</li>
        <li><strong>S.M.A.R.T. pre-failure data:</strong> Which attribute triggered — Reallocated_Sector_Ct? Pending? Read_Error_Rate?</li>
        <li><strong>Failure type:</strong> Predictive (was there a S.M.A.R.T. warning) or sudden (no warning)?</li>
        <li><strong>Impact:</strong> RAID degraded only? Data loss? Downtime? Rebuild duration?</li>
        <li><strong>Root cause:</strong> Drive age/wear, infant mortality, firmware bug, physical shock, environmental</li>
        <li><strong>Corrective actions:</strong> Monitoring improved? Hot spare added? Replacement cycle updated?</li>
        <li><strong>Preventive recommendation:</strong> Similar-age drives from the same batch — proactive replacement schedule?</li>
      </ol>

      {/* ── Phase 12: Firmware ── */}
      <h2 id="lifecycle-firmware" style={S.h2}>Phase 12 — Firmware Upgrade</h2>
      <ComparisonTable
        title="When to Upgrade Firmware"
        headers={["Trigger", "Priority"]}
        rows={[
          ["Security vulnerability advisory",          "Urgent — per change management"],
          ["Stability fix addressing known production issue", "Planned — next maintenance window"],
          ["New feature requirement",                   "Evaluate — not mandatory"],
          ["Routine version update",                    "Optional — per organization policy"],
        ]}
        caption=""
      />

      <h3 style={S.h3}>Controller Firmware Upgrade</h3>
      <CodeBlock label="Dell — iDRAC method (Recommended)" lang="text">
{`iDRAC → Maintenance → System Update → Local Update
Upload firmware file from support.dell.com`}
      </CodeBlock>
      <CodeBlock label="Dell — OS method (RHEL/Ubuntu)" lang="bash">
{`# Download .bin from Dell support
# Verify compatibility: controller model + current FW version
chmod +x MR_SATA_SAS_FW_xxx.bin
./MR_SATA_SAS_FW_xxx.bin
# Reboot required after upgrade`}
      </CodeBlock>
      <CodeBlock label="HPE — Service Pack for ProLiant (Recommended)" lang="text">
{`# Boot from SPP ISO or use Smart Update Manager
# All components update in correct dependency order`}
      </CodeBlock>

      <CodeBlock label="Drive firmware — current version check" lang="bash">
{`smartctl -i /dev/sda | grep "Firmware Version"
# Dell: iDRAC → System Update → Automatic Update`}
      </CodeBlock>

      <Callout type="danger" title="Mandatory Precautions Before Any Firmware Upgrade">
        <ul style={{ ...S.ul, marginBottom: 0 }}> <li>RAID array: confirm Optimal status</li> <li>Hot spare is present</li> <li>Current backup verified</li> <li>Document the RAID configuration (config loss is possible in edge cases)</li> <li>Do not upgrade during a rebuild — data integrity risk</li> </ul>
      </Callout>

      {/* ── Phase 13: Expansion ── */}
      <h2 id="lifecycle-expansion" style={S.h2}>Phase 13 — Capacity Expansion</h2>

      <h3 style={S.h3}>Option 1 — Larger Capacity Drives (Rolling Replacement)</h3>
      <p style={S.p}>Replace one drive at a time (with larger capacity), let the rebuild complete, then do the next. After all drives are replaced, RAID online expansion is possible (controller-dependent). Expand the filesystem:</p>
      <CodeBlock label="Filesystem expansion" lang="bash">
{`# XFS (online expansion — the filesystem stays mounted)
xfs_growfs /data

# ext4
resize2fs /dev/sdb1`}
      </CodeBlock>

      <h3 style={S.h3}>Option 2 — Additional Drives in Empty Bays</h3>
      <p style={S.p}>Install drives in the empty bays. Create a new RAID array from the additional drives (simpler, recommended). Or add them to the existing array — verify controller support first (not all controllers support online array expansion).</p>

      <h3 style={S.h3}>Option 3 — Add an External JBOD</h3>
      <p style={S.p}>Install the JBOD in the rack, power it on, connect the SAS cable to the server HBA. Once the drives are detected, configure the new RAID. <strong>Planning considerations:</strong> Check the controller's maximum supported drive count. Additional power draw + heat — rack capacity planning.</p>

      {/* ── Phase 14: Migration ── */}
      <h2 id="lifecycle-migration" style={S.h2}>Phase 14 — Migration</h2>

      <h3 style={S.h3}>DAS → SAN Migration</h3>
      <p style={S.p}><strong>Option A — Online (preferred, minimal downtime):</strong> Provision an equivalent LUN on the SAN → data sync (`rsync` Linux / robocopy Windows) → briefly quiesce the application → final sync → cut over to the SAN path → decommission the DAS.</p>
      <p style={S.p}><strong>Option B — VMware Storage vMotion:</strong> While the VM is running — initiate Storage vMotion → VM storage automatically migrates DAS → SAN. Typically zero downtime.</p>

      <h3 style={S.h3}>DAS → New Server (Physical Drive Move)</h3>
      <Callout type="danger" title="Same Controller Model — Critical Requirement">
        To import a RAID foreign configuration, the new server must have the same controller model. A different controller model will not recognize the RAID metadata → data inaccessible. Confirm compatibility with the OEM before attempting.
      </Callout>
      <ol style={{ ...S.ul, listStyleType: "decimal" }}>
        <li>Old server power off</li>
        <li>Document the RAID configuration</li>
        <li>Physically move the drives into the same slot positions (best practice)</li>
        <li>New server power on → controller → "Import Foreign Configuration"</li>
      </ol>

      {/* ── Phase 15: Decommissioning ── */}
      <h2 id="lifecycle-decommission" style={S.h2}>Phase 15 — Decommissioning</h2>
      <Callout type="important" title="Data Sanitization — Format Is Not Sufficient">
        Simply deleting or formatting is not sufficient — data is recoverable with recovery tools. Always secure erase during decommissioning.
      </Callout>

      <ComparisonTable
        title="Data Sanitization Options"
        headers={["Method", "Use Case", "Classification"]}
        rows={[
          ["Cryptographic Erase (NVMe/SSD)",  "Fastest, most reliable for SSDs",         "Recommended Best Practice"],
          ["Secure Erase (SATA)",              "For HDDs and SATA SSDs",               "Recommended"],
          ["OS overwrite (shred)",             "Where hardware erase not supported",        "Acceptable for general data"],
          ["Physical destruction",             "Highly sensitive / regulated data",         "Mandatory per policy"],
        ]}
        caption="Follow NIST 800-88 guidelines: Clear (general/internal reuse) → Purge (sensitive data) → Destroy (classified/regulated)."
      />

      <CodeBlock label="NVMe Cryptographic Erase (nvme-cli required)" lang="bash">
{`# nvme-cli install: RHEL: yum install nvme-cli, Ubuntu: apt install nvme-cli
nvme format /dev/nvme0n1 --ses=1  # ses=1 = Cryptographic erase`}
      </CodeBlock>
      <CodeBlock label="SAS/SATA Secure Erase via controller (Recommended)" lang="text">
{`# Dell: iDRAC → Storage → Physical Drive → Cryptographic Erase
# HPE: iLO → Smart Storage → Physical Drive → Erase`}
      </CodeBlock>
      <CodeBlock label="OS-level — HDDs (3-pass overwrite, takes hours for large drives)" lang="bash">
{`shred -vzn 3 /dev/sda`}
      </CodeBlock>

      <h3 style={S.h3}>Asset Tracking — Mandatory for Compliance Environments</h3>
      <ul style={S.ul}>
        <li>Record drive serial numbers pre-destruction</li>
        <li>Obtain a certificate of destruction from the disposal vendor</li>
        <li>Mark as decommissioned in the CMDB/asset management</li>
        <li>Remove or destroy the asset tag</li>
      </ul>

      {/* ── Phase 16: Documentation ── */}
      <h2 id="lifecycle-docs" style={S.h2}>Phase 16 — Documentation</h2>
      <p style={S.p}><strong>What to maintain (Mandatory for production environments):</strong></p>

      <h3 style={S.h3}>Bay Mapping Record (per server)</h3>
      <ComparisonTable
        title=""
        headers={["Bay #", "Drive Model", "Serial Number", "Interface", "Capacity", "Installed Date", "RAID Array"]}
        rows={[
          ["Bay 0", "MFG Model-XYZ", "S/N ABC123", "SAS SSD", "1.92TB", "YYYY-MM-DD", "VD0 (RAID5)"],
        ]}
        caption="Maintain this record for every server. Update on every drive replacement."
      />

      <h3 style={S.h3}>What Else to Maintain</h3>
      <ul style={S.ul}>
        <li><strong>RAID Configuration Record:</strong> Server name/IP/iDRAC IP, controller model + firmware, arrays (VD#, RAID level, drives, capacity, hot spare), logical volumes (filesystem, mount point, purpose)</li>
        <li><strong>Baseline Performance Record:</strong> Date, tool, results (sequential MB/s, random IOPS 4K, avg latency)</li>
        <li><strong>Maintenance Log:</strong> PM dates, what checked, found, actioned</li>
        <li><strong>Incident History:</strong> Drive failures, replacements, rebuild events — dates, duration, RCA, corrective action</li>
      </ul>

      {/* ══════════════════════════════════════════════════════════════════
          INTERVIEW TIPS
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="interview-tips" style={S.h2}>Interview Tips</h2>

      <h3 style={S.h3}>Q1: Main difference between DAS, NAS and SAN?</h3>
      <p style={S.p}><strong>Answer:</strong> DAS is physically connected directly to one server — no network, only that server accesses it. NAS is file-level storage on a standard Ethernet network — multiple clients access it simultaneously. SAN is block-level storage on a dedicated storage network (FC or iSCSI) — multiple servers get high-performance block access. In production all three coexist for different use cases.</p>

      <h3 style={S.h3}>Q2: Why are consumer drives not used in enterprise RAID?</h3>
      <p style={S.p}><strong>Answer:</strong> Consumer drives do not have TLER (Time-Limited Error Recovery). When a consumer drive hits a bad sector, it retries aggressively — for minutes. The RAID controller decides within ~15 seconds that the drive has failed — and drops it. Enterprise drives hand off to the controller after a time limit. In production: consumer drive = RAID drop risk = array degrade = potential data loss.</p>

      <h3 style={S.h3}>Q3: What is the difference between RAID degraded and RAID failed?</h3>
      <p style={S.p}><strong>Answer:</strong> Degraded: One drive failed, within the RAID tolerance — data accessible, redundancy temporarily gone. Failed: Tolerance exceeded — 2 drives failed in RAID 5, both failed in RAID 1 — data inaccessible. On degraded: verify the backup, replace immediately. On failed: a backup restore is typically needed.</p>

      <h3 style={S.h3}>Q4: What is a hot spare and why is it configured?</h3>
      <p style={S.p}><strong>Answer:</strong> An extra pre-assigned drive that sits idle in the RAID pool. When a production drive fails — the hot spare automatically starts the rebuild without an engineer being physically present. Critical in 24×7 operations — a drive fails at 3 AM, the hot spare rebuild completes by 6 AM, and when the engineer arrives the next morning it is already rebuilt.</p>

      <h3 style={S.h3}>Q5: Is it safe to enable write cache without a BBU?</h3>
      <p style={S.p}><strong>Answer:</strong> No. Write cache enabled + no BBU = cached writes permanently lost on power failure = filesystem corruption or database inconsistency. Enable write cache only when the BBU or FBWC is healthy and charged. The controller typically switches to write-through mode automatically when the battery fails.</p>

      <h3 style={S.h3}>Q6: What precautions are taken during a RAID rebuild?</h3>
      <p style={S.p}><strong>Answer:</strong> 1. Verify the current backup before replacement. 2. Do not remove a second drive — a second failure during rebuild = potential data loss. 3. Avoid heavy workloads — the rebuild competes for I/O. 4. Do not upgrade the controller firmware. 5. Monitor — is the rebuild hung? Investigate. 6. Rebuild complete — confirm RAID optimal.</p>

      <h3 style={S.h3}>Q7: What is the physical difference between external DAS and SAN?</h3>
      <p style={S.p}><strong>Answer:</strong> External DAS: A direct SAS cable from one server to a JBOD enclosure — no network, no switch, no protocol. Only that server accesses it. SAN: A dedicated storage network (Fibre Channel or iSCSI switches), multiple servers access it, centralized management. Whether the cable is directly attached or goes through a network — that is the main distinction.</p>

      {/* ══════════════════════════════════════════════════════════════════
          KEY TAKEAWAYS
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li><strong>DAS = Direct Attached Storage</strong> — an architecture pattern, not a specific product. Network in between → not DAS. Direct cable → DAS.</li>
        <li><strong>Fastest, simplest, cheapest</strong> single-server storage. Network overhead zero.</li>
        <li><strong>Internal DAS</strong> is the most common — present in every rack server.</li>
        <li><strong>NVMe DAS</strong> is currently the fastest commercially available storage — for AI/ML and databases.</li>
        <li><strong>Primary limitation:</strong> Not shareable — one server only. Multiple servers → NAS or SAN.</li>
        <li><strong>TLER/ERC</strong> — never put consumer drives in enterprise RAID. This is the most common and most avoidable production mistake.</li>
        <li><strong>DAS is the foundation of HCI</strong> — vSAN, Nutanix, S2D all pool local DAS drives.</li>
        <li><strong>Configure a hot spare</strong> — drive fails = automatic rebuild, no engineer needed immediately.</li>
        <li><strong>Write cache + BBU together</strong> — write cache without a BBU = data loss risk on power failure.</li>
        <li><strong>Take a performance baseline</strong> before production — to compare future degradation against.</li>
        <li><strong>Document bay mapping</strong> — mandatory in production.</li>
        <li><strong>Decommissioning: secure erase mandatory</strong> — format is not sufficient.</li>
        <li><strong>During a RAID rebuild:</strong> keep the backup current, do not remove a second drive.</li>
      </ul>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════════════ */}
      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: i < faqs.length - 1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight: 700, marginBottom: "0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom: 0 }}>{item.a}</p>
        </div>
      ))}

      {/* ══════════════════════════════════════════════════════════════════
          RELATED TOPICS
      ══════════════════════════════════════════════════════════════════ */}
      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Related Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="nas" variant="inline" /> — Network Attached Storage — file-level shared storage, the natural next step after DAS.</li>
        <li><TopicLink slug="san" variant="inline" /> — Storage Area Network — enterprise shared block storage, for VMware and large databases.</li>
        <li><TopicLink slug="server-basics" variant="inline" /> — Server hardware fundamentals — the foundation of DAS.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — The role of DAS in virtualization — local datastores and HCI.</li>
      </ul>
    </>
  );
}
