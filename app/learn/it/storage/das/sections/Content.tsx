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
        <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — DAS in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>DAS kya hai:</strong> Direct Attached Storage — storage jo directly ek server se connected hoti hai, bina kisi network ke. Server ke andar ki drives DAS hain. Ek external box directly SAS cable se connected ho — woh bhi DAS hai.</li>
          <li><strong>Golden rule:</strong> Server aur storage ke beech agar network hai — DAS nahi. Directly cable se connected hai — DAS hai.</li>
          <li><strong>Kyun relevant hai:</strong> Network overhead zero, latency lowest, cost sabse kam. Single server ke liye fastest storage option.</li>
          <li><strong>Primary limitation:</strong> Sirf woh ek server access kar sakta hai jisse directly connected hai — shareable nahi.</li>
          <li><strong>Types:</strong> Internal DAS (server ke andar), External DAS / JBOD (bahar se SAS cable), NVMe-based DAS (PCIe-direct).</li>
          <li><strong>Interfaces:</strong> SATA (OS drives / budget), SAS (enterprise standard), NVMe (highest performance).</li>
          <li><strong>Enterprise use:</strong> Databases, virtualization hosts, HCI foundation, AI/ML training nodes, edge servers, OS boot drives.</li>
          <li><strong>HCI connection:</strong> VMware vSAN, Nutanix, Microsoft S2D — sab DAS drives ko software se pool karte hain. HCI ka foundation DAS hai.</li>
          <li><strong>Engineer daily kaam:</strong> RAID status monitor karna, S.M.A.R.T. health dekhna, predictive failure alerts pe act karna, capacity trends track karna.</li>
          <li><strong>Most critical field rule:</strong> Consumer drives enterprise RAID mein kabhi mat lagao — TLER nahi hota, production array degrade ho jaata hai.</li>
        </ul>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — DEFINITION
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="das-kya-hai" style={S.h2}>DAS Kya Hai — Definition aur Full Form</h2>
      <p style={S.p}><strong>DAS = Direct Attached Storage</strong></p>
      <p style={S.p}>Koi bhi storage device jo physically aur directly ek single server ya workstation se connected ho — bina kisi network, switch ya shared infrastructure ke — woh DAS hai.</p>
      <p style={S.p}>Ye kisi specific product ka naam nahi hai. Ye ek architecture pattern hai.</p>
      <p style={S.p}>DAS sabse pehle aaya — networking se pehle, shared storage se pehle. Pehle ke sab servers DAS pe chale. Aaj bhi data centers mein widely deployed hai — specifically jahan single-server local performance maximum chahiye.</p>
      <p style={S.p}><strong>Why it still matters:</strong> NAS aur SAN ne shared storage introduce ki, lekin network ke saath latency bhi aai. High-performance databases, real-time processing, AI training — inhe consistent microsecond-level storage access chahiye. DAS woh deta hai.</p>
      <CodeBlock lang="text">
{`Application → OS → Storage Driver → Physical Drive

No network. No switch. No protocol overhead.`}
      </CodeBlock>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — DAS vs PC Storage
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="das-vs-pc-storage" style={S.h2}>DAS vs Normal PC Storage</h2>
      <p style={S.p}>Surface pe dono same lagte hain — directly attached drives. Lekin engineering aur production use mein bada fark hai.</p>
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
      <p style={S.p}>Jab drive ko bad sector milta hai, woh recover karne ki koshish karta hai.</p>
      <ul style={S.ul}>
        <li><strong>Consumer drive:</strong> Aggressively retry karta hai — 30 se 120 seconds tak. RAID controller itna wait nahi karta — drive ko fail mark kar deta hai. Array degrade ho jaata hai even though drive physically theek hai.</li>
        <li><strong>Enterprise drive:</strong> Error recovery time-limit hoti hai (typically 7–15 seconds). Drive controller ko batati hai "error hai, tum handle karo." RAID proper error handling karta hai.</li>
      </ul>
      <Callout type="common-mistake" title="Consumer Drive Enterprise RAID Mein — Kabhi Nahi">
        Consumer drive kabhi enterprise server RAID mein mat lagao. Ek bad sector encounter par drive drop ho sakti hai. Agar doosri drive bhi worn out hai — data loss risk. Ye most common aur avoidable production mistake hai.
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

Ye data path completely local hai.
Network nahi, switch nahi, protocol handshake nahi.`}
      </CodeBlock>

      <Figure caption="Fig 1 — DAS Data Path Overview. Left: Internal DAS showing direct path from server to drive bays with no network. Right: External JBOD connected via direct SAS cable. Note the crossed-out network switch — it does not exist in DAS.">
        <DasDataPath />
      </Figure>

      <h3 style={S.h3}>Component 1 — Storage Controller / HBA</h3>
      <ComparisonTable
        title="Controller Types"
        headers={["Type", "What It Does", "When to Use"]}
        rows={[
          ["RAID Controller", "Hardware RAID — apna processor aur cache RAM rakhta hai. Parity, caching, patrol read sab hardware level pe.", "Production workloads jahan hardware RAID protection chahiye"],
          ["HBA (Host Bus Adapter)", "Drives directly OS ko present karta hai — no RAID processing. OS ya software decide karta hai.", "HCI (vSAN/Nutanix), software RAID, direct disk access"],
          ["Integrated Controller", "Motherboard par built-in — mostly SATA. Limited drive count aur features.", "Entry-level servers, OS boot drives only"],
        ]}
        caption="OEM Examples — Dell: PERC H755 (RAID), HBA355i (HBA). HPE: Smart Array P408i-a (RAID), SR Gen11 (HBA). Lenovo: RAID 9350-8i, 430-8i HBA."
      />

      <h3 style={S.h3}>Component 2 — Backplane</h3>
      <p style={S.p}>Server ke andar passive ya active PCB jo drive bays ko storage controller se connect karta hai. Power aur data signal dono route karta hai. Hot-swap backplane se aata hai — har bay independently controlled hoti hai.</p>
      <p style={S.p}><strong>Active backplane</strong> mein SAS expander hota hai — multiple drives ek HBA port se connect ho sakti hain. <strong>Passive backplane</strong> sirf signal route karta hai — simpler, less points of failure.</p>

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
      <h2 id="das-ke-types" style={S.h2}>DAS ke Types</h2>

      <h3 style={S.h3}>Type 1 — Internal DAS</h3>
      <p style={S.p}>Server chassis ke andar installed drives. <strong>Sabse common DAS form — har rack server mein hota hai.</strong></p>
      <p style={S.p}>Drives server ke front ya rear drive bays mein fit hoti hain — backplane ke through controller se connected.</p>

      <Figure caption="Fig 2 — Internal Drive Bay Layout — 2U server front view. Bay 7 (amber) = failed drive with fault LED on. Bay 12 (green) = active rebuild. Bay numbering starts at 0 from top-left. Inset shows drive carrier components.">
        <DasBayLayout />
      </Figure>

      <p style={S.p}><strong>Generic concept:</strong> 2U server typically 24 × 2.5" SFF bays ya 12 × 3.5" LFF bays rakhta hai. Actual count server model aur chassis design pe depend karta hai.</p>

      <Callout type="maintenance" title="OEM Examples — Internal DAS Servers">
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>Dell:</strong> PowerEdge R750 — up to 24 × 2.5" SFF (SAS/SATA/NVMe mix), R6525 — NVMe-heavy configurations</li>
          <li><strong>HPE:</strong> ProLiant DL380 Gen11 — 8 LFF ya 24 SFF bays, NVMe-capable; DL360 Gen11 — 1U dense, up to 10 SFF</li>
          <li><strong>Lenovo:</strong> ThinkSystem SR650 V3, SR630 V3 — flexible bay configurations</li>
          <li><strong>Supermicro:</strong> 1029P series — dense NVMe-only configurations</li>
        </ul>
        Always verify current specs on vendor site — models update frequently.
      </Callout>

      <h3 style={S.h3}>Type 2 — External DAS / JBOD</h3>
      <p style={S.p}>Ek separate enclosure — server ke bahar — directly SAS cable se server ke HBA/controller se connected. <strong>Koi network nahi. Direct cable.</strong></p>
      <p style={S.p}><strong>JBOD = Just a Bunch of Disks</strong> — drives as-is present karta hai bina RAID ke. Host server decide karta hai kaise use karna hai.</p>
      <p style={S.p}>Kab use hota hai:</p>
      <ul style={S.ul}>
        <li>Server ke internal bays full ho gayi hain</li>
        <li>Bahut zyada capacity chahiye ek server ke saath</li>
        <li>HCI software ke liye additional raw drives chahiye</li>
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
      <p style={S.p}>NVMe SSDs PCIe bus par directly connected — ya U.2 backplane ke through. <strong>Abhi fastest commercially available DAS option.</strong></p>
      <p style={S.p}>Latency: single-digit microseconds. Sequential throughput: GB/s mein. IOPS: lakhs mein. AI/ML training, real-time analytics, high-frequency databases — yahan NVMe DAS standard choice ban raha hai.</p>

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
      <p style={S.p}>Detailed interface chapters aage aayenge. Yahan sirf DAS context ke liye overview.</p>
      <ComparisonTable
        title="DAS Storage Interfaces"
        headers={["Interface", "Type", "Approx. Max Speed*", "Typical Use in DAS"]}
        rows={[
          ["SATA III",          "Serial",          "~600 MB/s",       "OS drives, budget servers, cold data"],
          ["SAS 12Gb/s",        "Serial Attached SCSI", "~1,200 MB/s","Enterprise HDDs aur SSDs — mainstream"],
          ["SAS 24Gb/s",        "Serial Attached SCSI", "~2,400 MB/s","High-performance enterprise SSDs"],
          ["NVMe PCIe 4.0 x4", "PCIe direct",     "~7,000 MB/s",    "High-performance databases, AI"],
          ["NVMe PCIe 5.0 x4", "PCIe direct",     "~14,000 MB/s",   "Next-gen AI/HPC servers"],
        ]}
        caption="*Approximate peak sequential read speeds. Actual performance varies significantly with RAID level, queue depth and workload pattern."
      />
      <Callout type="important" title="SAS ka Critical Advantage — Dual Port">
        Enterprise SAS drives dual-port hoti hain — do independent paths se server se connect ho sakti hain. Ek path fail → doosra active. SATA single-port hai. Mission-critical storage ke liye SAS prefer karo.
      </Callout>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6 — USE CASES
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="das-kahan-use" style={S.h2}>DAS Kahan Use Hota Hai — Production Examples</h2>

      <h3 style={S.h3}>Database Servers — High I/O Workloads</h3>
      <p style={S.p}>OLTP databases (Oracle, SQL Server, PostgreSQL, MySQL) ke liye NVMe ya SAS SSD DAS consistent low-latency deta hai. Network-based storage ke compared latency predictable rehti hai peak load par bhi. Typical configuration: NVMe/SAS SSD, RAID 10, data volume aur log volume separate.</p>

      <h3 style={S.h3}>Virtualization Hosts — Local Boot aur Scratch Storage</h3>
      <p style={S.p}>VMware ESXi ya Hyper-V host ka local datastore. Small VMs, test environments, ephemeral workloads — local DAS pe run karte hain. Production VMs ke shared storage ke liye SAN/NFS use hoti hai — lekin local NVMe DAS host performance measurably improve karta hai VM density ke saath.</p>

      <h3 style={S.h3}>Hyperconverged Infrastructure (HCI)</h3>
      <p style={S.p}>VMware vSAN, Nutanix AHV, Microsoft Storage Spaces Direct — sab locally attached DAS drives ko software se pool karke shared storage banate hain. Multiple servers ke DAS drives ek distributed storage cluster form karte hain. <strong>HCI ka poora foundation DAS hai.</strong></p>

      <h3 style={S.h3}>AI / ML Training Nodes</h3>
      <p style={S.p}>GPU servers ko training data bahut fast chahiye — GPU processing speed se storage speed match karni padti hai. NVMe DAS arrays GPU servers ko data feed karte hain microsecond latency ke saath. High-bandwidth sequential reads ke liye NVMe DAS purpose-built solution hai.</p>

      <h3 style={S.h3}>Edge Servers / Remote Locations</h3>
      <p style={S.p}>Branch offices, retail endpoints, factory floors, telecom towers — dedicated storage network banana impractical hai. DAS simple, reliable, network-independent. Maintenance minimal.</p>

      <h3 style={S.h3}>OS Boot Drives</h3>
      <p style={S.p}><strong>Best Practice:</strong> 2 × enterprise SSD, internal DAS, RAID 1 — har server mein. Production storage SAN par bhi ho toh OS drives local DAS par. Always separate volume — OS aur data mix mat karo.</p>

      <h3 style={S.h3}>Log aur Scratch Space</h3>
      <p style={S.p}>Application logs, temporary processing files — local DAS. <strong>Production rule:</strong> Log volume OS volume se alag rakho. Logs fill ho jaate hain — agar same volume ho — OS crash hoga.</p>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 7 — AVOID
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="das-avoid" style={S.h2}>DAS Kahan Avoid Karna Chahiye</h2>
      <ComparisonTable
        title="DAS — When Not to Use"
        headers={["Scenario", "Reason", "Better Option"]}
        rows={[
          ["Multiple servers ko same data",     "DAS shareable nahi — ek server only",       "NAS ya SAN"],
          ["VM live migration / vMotion",        "Shared storage required",                    "SAN / NFS"],
          ["Centralized backup infrastructure", "Har server ka DAS separately managed",       "NAS / SAN + backup software"],
          ["Dynamic storage pool scaling",       "Server chassis capacity ceiling",            "SAN / Scale-out NAS"],
          ["HA clustering — shared disk",        "DAS ek server se tied",                     "SAN with multipathing"],
          ["Large file sharing across users",    "DAS network-accessible nahi directly",      "NAS"],
          ["Long-distance replication",          "Built-in replication nahi",                  "SAN / NAS with replication"],
        ]}
        caption="DAS ki primary limitation hai: shareable nahi. Architecture se fundamental constraint hai — software se fix nahi hoti."
      />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 8 — ADVANTAGES
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="das-advantages" style={S.h2}>DAS ke Advantages</h2>
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
      <h2 id="das-limitations" style={S.h2}>DAS ki Limitations</h2>
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
        <li><strong>"DAS outdated hai"</strong> — Galat. HCI platforms (vSAN, Nutanix), AI training infrastructure, NVMe-based databases — sab active DAS use karte hain. NVMe DAS abhi fastest commercially available storage hai.</li>
        <li><strong>"Internal drives DAS nahi hain"</strong> — Galat. Internal drives DAS ka sabse common example hain. Har rack server mein hota hai.</li>
        <li><strong>"DAS mein RAID nahi hoti"</strong> — Galat. RAID controller ya software RAID — dono DAS ke saath standard practice hain.</li>
        <li><strong>"External storage = SAN"</strong> — Galat. External enclosure directly SAS cable se ek server se connected ho — woh DAS hai. SAN mein dedicated network aur protocols hote hain.</li>
        <li><strong>"DAS sirf HDDs ke liye hai"</strong> — Galat. NVMe DAS currently fastest option. Modern AI servers NVMe DAS par run karte hain.</li>
        <li><strong>"DAS sirf chhote setups ke liye hai"</strong> — Galat. Hyperscale facilities NVMe DAS per-server use karti hain. Enterprise HCI globally deployed hai — sab DAS-based.</li>
      </ul>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 11 — DAS vs NAS vs SAN
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="das-vs-nas-san" style={S.h2}>DAS aur NAS/SAN — Brief Comparison</h2>
      <p style={S.p}><TopicLink slug="nas" variant="inline" /> aur <TopicLink slug="san" variant="inline" /> ke liye dedicated chapters aage hain. Yahan sirf positioning clear karna hai.</p>
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
        caption="Simple rule: Ek server, max performance → DAS. File sharing → NAS. Shared block storage, VMware → SAN."
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

      <h3 style={S.h3}>Lenovo aur Supermicro</h3>
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
          ["RAID",              "Redundant Array of Independent Disks — drives combine karna redundancy ya performance ke liye. Dedicated chapter aayega."],
          ["HBA",               "Host Bus Adapter — drives directly OS ko present, no RAID processing"],
          ["RAID Controller",   "Dedicated hardware controller — RAID manage karta hai, apna processor aur cache"],
          ["Backplane",         "Internal PCB — drive bays aur storage controller ke beech signal route"],
          ["JBOD",              "Just a Bunch of Disks — drives as-is presented, no RAID, typically external enclosure"],
          ["SAS",               "Serial Attached SCSI — enterprise interface, dual-port, hot-swap"],
          ["SATA",              "Serial ATA — common interface, single-port, lower cost"],
          ["NVMe",              "Non-Volatile Memory Express — PCIe-based SSD protocol"],
          ["U.2",               "Enterprise NVMe SSD form factor — 2.5\" size, hot-swap support"],
          ["Hot-swap",          "Drive replace karna bina server band kiye"],
          ["LFF / SFF",         "Large Form Factor (3.5\") / Small Form Factor (2.5\")"],
          ["IOPS",              "Input/Output Operations Per Second"],
          ["MTBF",              "Mean Time Between Failures — manufacturer-specified reliability indicator"],
          ["TLER / ERC",        "Time-Limited Error Recovery — enterprise drive RAID compatibility feature"],
          ["S.M.A.R.T.",       "Self-Monitoring, Analysis and Reporting Technology — drive health monitoring"],
          ["BBU",               "Battery Backup Unit — controller cache protect karta hai power loss pe"],
          ["FBWC",              "Flash-Backed Write Cache — BBU ka modern capacitor/flash alternative"],
          ["Write Cache",       "Controller RAM buffer jo writes cache karta hai — performance improve karta hai"],
          ["Hot Spare",         "Pre-assigned spare drive — automatically rebuild karta hai jab koi drive fail ho"],
          ["Reallocated Sector","Bad sector jo spare area se replace hua — S.M.A.R.T. mein tracked"],
          ["DWPD",              "Drive Writes Per Day — SSD endurance specification"],
        ]}
        caption="Terms related to RAID levels, filesystem types, LVM, SAN protocols — dedicated chapters mein cover honge."
      />

      {/* ══════════════════════════════════════════════════════════════════
          LIFECYCLE PHASES
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="lifecycle-planning" style={S.h2}>Phase 1 — Planning</h2>
      <Callout type="important" title="Workload Analysis Pehle — Procurement Baad Mein">
        Workload ke bina drive selection karna sab se common planning mistake hai. Pehle IOPS, latency, capacity aur redundancy requirements define karo — phir hardware choose karo.
      </Callout>

      <h3 style={S.h3}>Drive Type Selection by Workload</h3>
      <ComparisonTable
        title=""
        headers={["Workload", "Recommended Drive Type", "RAID Level", "Notes"]}
        rows={[
          ["OS boot drives",          "2 × Enterprise SSD (SATA/SAS)",  "RAID 1",  "Mandatory — separate volume"],
          ["High-performance DB",     "NVMe U.2 ya SAS SSD",            "RAID 10", "Best performance + redundancy"],
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
        <li>Server documentation se bay numbering confirm karo — Bay 0 typically left ya top</li>
        <li>Drive carrier mein drive mount karo — screws evenly tighten karo</li>
        <li>Bay mein slide in karo — lock mechanism engage hona chahiye (click sound)</li>
        <li>Bay LED activity check karo — server ne drive detect ki?</li>
      </ol>

      <h3 style={S.h3}>RAID Configuration — Controller Utility</h3>
      <CodeBlock label="Dell — OpenManage Storage Manager / perccli64" lang="bash">
{`# Server POST ke dauran Ctrl+R → RAID controller configuration
# Ya OS ke andar:
perccli64 /c0 show all`}
      </CodeBlock>
      <CodeBlock label="HPE — Smart Storage Administrator (SSA)" lang="bash">
{`# POST ke dauran F10 → Intelligent Provisioning → Smart Storage Administrator
# Ya OS ke andar:
ssacli ctrl all show status`}
      </CodeBlock>
      <p style={S.p}><strong>Generic steps (controller-agnostic):</strong> Available drives list karo → RAID level select, drives select, hot spare assign → Initialize karo (<strong>Full Initialize recommended</strong> for new deployments — bad sectors identify hote hain) → Logical drive / virtual disk create karo.</p>

      <h3 style={S.h3}>External JBOD — Cabling</h3>
      <ul style={S.ul}>
        <li>Modern connector: <strong>SFF-8644</strong> (Mini-SAS HD)</li>
        <li>Older servers: SFF-8088 (Mini-SAS)</li>
        <li>Cable lengths: Same rack — 0.5m–1m; adjacent rack — 2m–3m</li>
        <li><strong>Maximum reliable SAS cable length: ~10 meters</strong> (active cables ~20m+ possible)</li>
      </ul>
      <Callout type="best-practice" title="Cable Labeling — Mandatory Best Practice">
        Both ends label karo: [Server Name]/[HBA Port] | [JBOD Unit]/[SAS IN Port]. Future maintenance mein guide karta hai. Unlabeled SAS cables troubleshooting nightmare hain.
      </Callout>

      {/* ── Phase 3: OS Config ── */}
      <h2 id="lifecycle-os-config" style={S.h2}>Phase 3 — OS-Level Configuration</h2>

      <h3 style={S.h3}>Linux</h3>
      <CodeBlock label="Linux — Disk identification aur filesystem creation" lang="bash">
{`# New disk identify karo
lsblk
# OR
fdisk -l

# Partition create karo (GPT — drives >2TB ke liye mandatory)
gdisk /dev/sdb

# Filesystem create karo
mkfs.xfs /dev/sdb1     # XFS — databases, large files, high performance
mkfs.ext4 /dev/sdb1   # ext4 — general purpose

# Mount karo
mkdir /data
mount /dev/sdb1 /data

# Persistent mount — /etc/fstab
# UUID use karo — /dev/sdX nahi (device name boot pe change ho sakta hai)
echo "UUID=$(blkid -s UUID -o value /dev/sdb1)  /data  xfs  defaults,nofail  0  2" >> /etc/fstab`}
      </CodeBlock>
      <Callout type="important" title="nofail Flag — Production Mein Mandatory">
        /etc/fstab mein <code>nofail</code> flag important hai — agar storage mount fail ho toh OS boot nahi rukta. Bina is flag ke drive issue hone par server boot loop mein ja sakta hai.
      </Callout>

      <h3 style={S.h3}>Windows</h3>
      <p style={S.p}>Disk Management (diskmgmt.msc) ya <code>diskpart</code> se: Disk initialize karo → <strong>GPT</strong> (2TB+ ya UEFI systems ke liye mandatory) → Volume create karo → Format NTFS → Drive letter assign karo.</p>

      <h3 style={S.h3}>Volume Planning — Best Practice</h3>
      <ComparisonTable
        title=""
        headers={["Volume", "Purpose"]}
        rows={[
          ["OS Volume",      "OS only — no application data"],
          ["Data Volume",    "Application data files"],
          ["Log Volume",     "Application logs — separate karo: high write workloads OS ko affect nahi karenge"],
          ["DB Log Volume",  "Database transaction logs — separate from data files (I/O patterns alag hain)"],
        ]}
        caption=""
      />

      {/* ── Phase 4: Commissioning ── */}
      <h2 id="lifecycle-commissioning" style={S.h2}>Phase 4 — Commissioning aur Baseline Testing</h2>

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
      <Callout type="best-practice" title="Baseline Testing — Karo Hamesha Before Production">
        Baseline test karna not optional for production. Agar 6 months baad "storage slow ho gaya hai" complaint aaye — compare karne ke liye data chahiye. Bina baseline ke root cause analysis impossible hoti hai.
      </Callout>
      <CodeBlock label="Linux — fio performance baseline (fio 3.x+, tested on RHEL 8/9, Ubuntu 20.04+)" lang="bash">
{`# fio install karo (RHEL/CentOS: yum install fio, Ubuntu: apt install fio)

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
      <p style={S.p}><strong>Document karo:</strong> Sequential read/write (MB/s), Random IOPS (4K read/write), Average latency (ms). Ye future comparison ke liye baseline hai.</p>

      <h3 style={S.h3}>S.M.A.R.T. Baseline Check</h3>
      <CodeBlock label="smartmontools (RHEL: yum install smartmontools, Ubuntu: apt install smartmontools)" lang="bash">
{`smartctl -a /dev/sda
# New drives mein sab zero hone chahiye:
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
        caption="Configure email ya SNMP traps to monitoring system. iDRAC/iLO → Alerts → configure SMTP or SNMP destination."
      />

      <h3 style={S.h3}>OS-Level Monitoring</h3>
      <CodeBlock label="Linux — iostat aur S.M.A.R.T." lang="bash">
{`# Disk utilization (sysstat package)
iostat -x 1 5
# %util near 100% + high await = storage bottleneck

# Filesystem usage
df -h   # 80%+ = warning threshold configure karo

# S.M.A.R.T. automated monitoring — smartd daemon
# /etc/smartd.conf mein add karo:
/dev/sda -a -o on -S on -s (S/../.././02|L/../../6/03) \
    -m storage-alerts@company.com`}
      </CodeBlock>
      <p style={S.p}><strong>Capacity trending:</strong> Daily utilization record karo. <strong>Alert threshold: 80% utilized → Warning; 90% → Critical.</strong></p>

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
Rebuild monitor karo
      |
Rebuild complete → RAID Optimal → document + close ticket`}
      </CodeBlock>

      <Callout type="warning" title="RAID Degraded Alert — Pehla Kaam: Backup Verify Karo">
        RAID degraded alert aane par pehla kaam — <strong>backup status verify karo.</strong> Replacement baad mein. Agar doosri drive bhi fail ho rebuild ke dauran — recovery option hona chahiye.
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
        <li>Failed drive bay identify — iDRAC se physical locate LED on karo</li>
        <li>Replacement drive ready — same interface, form factor, speed; capacity same ya larger</li>
        <li>Current backup status verify karo</li>
      </ol>

      <h3 style={S.h3}>Hot-Swap Procedure</h3>
      <ol style={{ ...S.ul, listStyleType: "decimal" }}>
        <li>Carrier latch release karo — mechanism press karo</li>
        <li>Drive carrier gently pull out — slow, steady</li>
        <li>Old drive: screws remove, carrier se nikalo</li>
        <li>New drive: carrier mein fit karo, screws evenly tighten</li>
        <li>Bay mein slide in — fully seated hona chahiye (click sound)</li>
        <li>Activity LED check karo</li>
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
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li>Doosri drive remove mat karo</li>
          <li>Server reboot mat karo (unless genuine emergency)</li>
          <li>Controller firmware upgrade mat karo</li>
          <li>Heavy I/O workloads deliberately schedule mat karo during rebuild window</li>
        </ul>
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
        Enterprise HDDs typically rated for ~5 years. SSD endurance depends on DWPD specification aur workload. Drives ek batch ki saath fail hoti hain — proactive replacement cycle banao, individual failure ka wait mat karo.
      </Callout>

      {/* ── Phase 10: Troubleshooting ── */}
      <h2 id="lifecycle-troubleshoot" style={S.h2}>Phase 10 — Troubleshooting</h2>

      <h3 style={S.h3}>Scenario 1 — RAID Degraded</h3>
      <CodeBlock label="Failed drive identify karo" lang="bash">
{`# Dell
perccli64 /c0 /eall /sall show
# "Failed" ya "Unconfigured(bad)" dhundo

# HPE
ssacli ctrl slot=0 pd all show detail
# "Failed" dhundo

# Physical: iDRAC → Storage → Physical Drives → Locate LED
# Ya: Bay amber LED visual confirmation`}
      </CodeBlock>
      <p style={S.p}>→ Drive replacement procedure (Phase 8)</p>

      <h3 style={S.h3}>Scenario 2 — Storage Performance Degraded</h3>
      <CodeBlock label="Performance degradation diagnosis" lang="bash">
{`# Step 1: RAID rebuild chal raha hai? (Expected degradation)
perccli64 /c0 /v0 show

# Step 2: I/O saturation check
iostat -x 1 10
# %util near 100% + high await (ms) = storage bottleneck

# Step 3: S.M.A.R.T. wear check
smartctl -A /dev/sda | grep -E "Reallocated|Pending|Uncorrectable|Wear_Leveling"

# Significant degradation = possible controller issue ya drive degradation
# Compare to commissioning baseline`}
      </CodeBlock>

      <h3 style={S.h3}>Scenario 3 — Drive / Volume OS Mein Visible Nahi</h3>
      <CodeBlock label="Drive detection check" lang="bash">
{`# Controller ne detect kiya?
perccli64 /c0 /eall /sall show  # Drive listed hai?
ssacli ctrl slot=0 pd all show detail

# OS level
lsblk
dmesg | grep -iE "sd[a-z]|nvme|ata"   # Kernel messages`}
      </CodeBlock>
      <p style={S.p}>If not detected by controller: Drive properly seated? → Pull out aur re-insert. Different bay try karo — backplane port issue? SAS cable re-seat (external JBOD ke liye). Controller event log check karo.</p>

      <h3 style={S.h3}>Scenario 4 — Controller Not Detected / Server Boot Issue</h3>
      <ul style={S.ul}>
        <li>BIOS/UEFI mein controller listed hai?</li>
        <li>PCIe slot mein properly seated hai?</li>
        <li>Power off → remove → clean contacts → re-insert → different PCIe slot try karo</li>
        <li>iDRAC event log mein controller error?</li>
        <li>OEM support engage karo — controller hardware failure possible</li>
      </ul>

      <h3 style={S.h3}>Scenario 5 — Volume Full</h3>
      <CodeBlock label="Space consumption identify karo" lang="bash">
{`# What's consuming space
du -sh /* 2>/dev/null | sort -rh | head -20

# Large files dhundo
find /data -size +1G -type f 2>/dev/null

# Common causes:
# 1. Application logs not rotating
# 2. Core dumps from application crashes
# 3. Temp files not cleaned
# 4. Database growth — capacity planning required`}
      </CodeBlock>
      <p style={S.p}>Short-term: Unnecessary files clean karo. Long-term: Storage expansion plan (Phase 13).</p>

      <h3 style={S.h3}>Common Field Mistakes — Quick Reference</h3>
      <Callout type="common-mistake" title="Most Common Production DAS Mistakes">
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>Consumer drives RAID mein:</strong> TLER nahi = drive drop risk. Never do this.</li>
          <li><strong>RAID rebuild ke waqt backup verify na karna:</strong> Rebuild ke dauran second failure = potential data loss.</li>
          <li><strong>Hot-swap ke baad RAID status check na karna:</strong> Rebuild actually started? Always verify in controller.</li>
          <li><strong>OS aur data volume same volume pe:</strong> Logs fill = OS crash. Separate volumes mandatory.</li>
          <li><strong>Bay mapping document na karna:</strong> 24 bays mein failed drive locate karna nightmare.</li>
          <li><strong>Performance baseline na lena:</strong> Future issue mein comparison point nahi hoga.</li>
          <li><strong>Write cache bina BBU ke enable karna:</strong> Power cut = cached data lost = corruption risk.</li>
        </ul>
      </Callout>

      {/* ── Phase 11: RCA ── */}
      <h2 id="lifecycle-rca" style={S.h2}>Phase 11 — Root Cause Analysis</h2>
      <p style={S.p}><strong>Drive failure RCA — minimum documentation:</strong></p>
      <ol style={{ ...S.ul, listStyleType: "decimal" }}>
        <li><strong>What failed:</strong> Drive model, serial number, bay position, age (from installation date)</li>
        <li><strong>S.M.A.R.T. pre-failure data:</strong> Which attribute triggered — Reallocated_Sector_Ct? Pending? Read_Error_Rate?</li>
        <li><strong>Failure type:</strong> Predictive (S.M.A.R.T. warning aaya tha) ya sudden (no warning)?</li>
        <li><strong>Impact:</strong> RAID degraded only? Data loss? Downtime? Rebuild duration?</li>
        <li><strong>Root cause:</strong> Drive age/wear, infant mortality, firmware bug, physical shock, environmental</li>
        <li><strong>Corrective actions:</strong> Monitoring improved? Hot spare added? Replacement cycle updated?</li>
        <li><strong>Preventive recommendation:</strong> Same batch ke similar-age drives — proactive replacement schedule?</li>
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
{`# Boot from SPP ISO ya use Smart Update Manager
# All components update in correct dependency order`}
      </CodeBlock>

      <CodeBlock label="Drive firmware — current version check" lang="bash">
{`smartctl -i /dev/sda | grep "Firmware Version"
# Dell: iDRAC → System Update → Automatic Update`}
      </CodeBlock>

      <Callout type="danger" title="Mandatory Precautions Before Any Firmware Upgrade">
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li>RAID array: Optimal status confirm karo</li>
          <li>Hot spare present hai</li>
          <li>Current backup verified</li>
          <li>RAID configuration document karo (edge cases mein config loss possible)</li>
          <li>Upgrade during rebuild mat karo — data integrity risk</li>
        </ul>
      </Callout>

      {/* ── Phase 13: Expansion ── */}
      <h2 id="lifecycle-expansion" style={S.h2}>Phase 13 — Capacity Expansion</h2>

      <h3 style={S.h3}>Option 1 — Larger Capacity Drives (Rolling Replacement)</h3>
      <p style={S.p}>Ek drive at a time replace karo (larger capacity se), rebuild complete hone do, phir next. Sab drives replace hone ke baad RAID online expansion possible (controller-dependent). Filesystem expand karo:</p>
      <CodeBlock label="Filesystem expansion" lang="bash">
{`# XFS (online expansion — filesystem mounted rehta hai)
xfs_growfs /data

# ext4
resize2fs /dev/sdb1`}
      </CodeBlock>

      <h3 style={S.h3}>Option 2 — Additional Drives in Empty Bays</h3>
      <p style={S.p}>Empty bays mein drives install karo. New RAID array create karo additional drives se (simpler, recommended). Ya existing array mein add karo — controller support verify karo pehle (not all controllers support online array expansion).</p>

      <h3 style={S.h3}>Option 3 — External JBOD Add Karo</h3>
      <p style={S.p}>JBOD rack mein install, power on, server HBA se SAS cable connect karo. Drives detect hone ke baad new RAID configure karo. <strong>Planning considerations:</strong> Controller maximum supported drive count check karo. Additional power draw + heat — rack capacity planning.</p>

      {/* ── Phase 14: Migration ── */}
      <h2 id="lifecycle-migration" style={S.h2}>Phase 14 — Migration</h2>

      <h3 style={S.h3}>DAS → SAN Migration</h3>
      <p style={S.p}><strong>Option A — Online (preferred, minimal downtime):</strong> SAN pe equivalent LUN provision karo → data sync (`rsync` Linux / robocopy Windows) → Application briefly quiesce → final sync → cut over to SAN path → DAS decommission.</p>
      <p style={S.p}><strong>Option B — VMware Storage vMotion:</strong> VM running hai — Storage vMotion initiate karo → VM storage automatically migrates DAS → SAN. Typically zero downtime.</p>

      <h3 style={S.h3}>DAS → New Server (Physical Drive Move)</h3>
      <Callout type="danger" title="Same Controller Model — Critical Requirement">
        RAID foreign configuration import ke liye same controller model new server mein hona chahiye. Different model controller ne RAID metadata recognize nahi kiya → data inaccessible. OEM se compatibility confirm karo before attempting.
      </Callout>
      <ol style={{ ...S.ul, listStyleType: "decimal" }}>
        <li>Old server power off</li>
        <li>RAID configuration document karo</li>
        <li>Drives physically move karo same slot positions mein (best practice)</li>
        <li>New server power on → controller → "Import Foreign Configuration"</li>
      </ol>

      {/* ── Phase 15: Decommissioning ── */}
      <h2 id="lifecycle-decommission" style={S.h2}>Phase 15 — Decommissioning</h2>
      <Callout type="important" title="Data Sanitization — Format Sufficient Nahi Hai">
        Simply delete ya format karna sufficient nahi hai — data recovery tools se recoverable. Decommissioning mein hamesha secure erase karo.
      </Callout>

      <ComparisonTable
        title="Data Sanitization Options"
        headers={["Method", "Use Case", "Classification"]}
        rows={[
          ["Cryptographic Erase (NVMe/SSD)",  "Fastest, most reliable for SSDs",         "Recommended Best Practice"],
          ["Secure Erase (SATA)",              "HDDs aur SATA SSDs ke liye",               "Recommended"],
          ["OS overwrite (shred)",             "Where hardware erase not supported",        "Acceptable for general data"],
          ["Physical destruction",             "Highly sensitive / regulated data",         "Mandatory per policy"],
        ]}
        caption="NIST 800-88 guidelines follow karo: Clear (general/internal reuse) → Purge (sensitive data) → Destroy (classified/regulated)."
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
        <li>Drive serial numbers record karo pre-destruction</li>
        <li>Certificate of destruction obtain karo from disposal vendor</li>
        <li>CMDB/asset management mein decommissioned mark karo</li>
        <li>Asset tag remove ya destroy karo</li>
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

      <h3 style={S.h3}>Q1: DAS, NAS, SAN mein main difference?</h3>
      <p style={S.p}><strong>Answer:</strong> DAS directly ek server se physically connected hai — no network, sirf woh server access karta hai. NAS file-level storage hai standard Ethernet network par — multiple clients simultaneously access karte hain. SAN block-level storage hai dedicated storage network par (FC ya iSCSI) — multiple servers high-performance block access karte hain. Production mein teeno coexist karte hain alag use cases ke liye.</p>

      <h3 style={S.h3}>Q2: Consumer drive enterprise RAID mein kyun nahi lagate?</h3>
      <p style={S.p}><strong>Answer:</strong> TLER (Time-Limited Error Recovery) consumer drives mein nahi hota. Bad sector milne par consumer drive aggressively retry karta hai — minutes tak. RAID controller ~15 seconds mein decide karta hai drive fail ho gayi — drop kar deta hai. Enterprise drives time-limit ke baad controller ko handoff karti hain. Production mein: consumer drive = RAID drop risk = array degrade = potential data loss.</p>

      <h3 style={S.h3}>Q3: RAID degraded aur RAID failed mein kya fark hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Degraded: Ek drive fail, RAID tolerance ke andar — data accessible, redundancy temporarily gone. Failed: Tolerance exceed — RAID 5 mein 2 drives fail, RAID 1 mein both fail — data inaccessible. Degraded pe: backup verify karo, immediately replace karo. Failed pe: backup restore needed typically.</p>

      <h3 style={S.h3}>Q4: Hot spare kya hai aur kyun configure karte hain?</h3>
      <p style={S.p}><strong>Answer:</strong> Extra pre-assigned drive jo RAID pool mein idle hoti hai. Koi production drive fail hoti hai — hot spare automatically rebuild shuru karta hai bina engineer ke physically present hue. 24×7 operations mein critical — raat 3 baje fail, hot spare rebuild 6 baje tak complete, engineer next morning aata hai already rebuilt.</p>

      <h3 style={S.h3}>Q5: Write cache enable karna safe hai kya bina BBU ke?</h3>
      <p style={S.p}><strong>Answer:</strong> Nahi. Write cache enabled + no BBU = power failure pe cached writes permanently lost = filesystem corruption ya database inconsistency. Write cache tabhi enable karo jab BBU ya FBWC healthy aur charged ho. Controller typically battery fail hone par automatically write-through mode mein chala jaata hai.</p>

      <h3 style={S.h3}>Q6: RAID rebuild ke dauran kya precautions lete hain?</h3>
      <p style={S.p}><strong>Answer:</strong> 1. Current backup verify karo before replacement. 2. Doosri drive mat remove karo — rebuild ke dauran second failure = potential data loss. 3. Heavy workloads avoid karo — rebuild I/O pe compete karta hai. 4. Controller firmware upgrade mat karo. 5. Monitor karo — rebuild hung? Investigate. 6. Rebuild complete — RAID optimal confirm karo.</p>

      <h3 style={S.h3}>Q7: External DAS aur SAN mein physically kya difference hai?</h3>
      <p style={S.p}><strong>Answer:</strong> External DAS: Direct SAS cable ek server se JBOD enclosure — no network, no switch, no protocol. Sirf woh server access karta hai. SAN: Dedicated storage network (Fibre Channel ya iSCSI switches), multiple servers access karte hain, centralized management. Cable directly attached hai ya network through — yahi main distinction.</p>

      {/* ══════════════════════════════════════════════════════════════════
          KEY TAKEAWAYS
      ══════════════════════════════════════════════════════════════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li><strong>DAS = Direct Attached Storage</strong> — architecture pattern, specific product nahi. Network beech mein → DAS nahi. Direct cable → DAS.</li>
        <li><strong>Fastest, simplest, cheapest</strong> single-server storage. Network overhead zero.</li>
        <li><strong>Internal DAS</strong> sabse common — har rack server mein hota hai.</li>
        <li><strong>NVMe DAS</strong> abhi fastest commercially available storage — AI/ML, databases ke liye.</li>
        <li><strong>Primary limitation:</strong> Shareable nahi — sirf ek server. Multiple servers → NAS ya SAN.</li>
        <li><strong>TLER/ERC</strong> — consumer drives enterprise RAID mein kabhi mat lagao. Ye most common aur avoidable production mistake hai.</li>
        <li><strong>HCI ka foundation DAS hai</strong> — vSAN, Nutanix, S2D sab local DAS drives pool karte hain.</li>
        <li><strong>Hot spare configure karo</strong> — drive fail = automatic rebuild, no engineer needed immediately.</li>
        <li><strong>Write cache + BBU together</strong> — write cache bina BBU ke = power failure pe data loss risk.</li>
        <li><strong>Baseline performance lo</strong> before production — future degradation compare karne ke liye.</li>
        <li><strong>Bay mapping document karo</strong> — production mein mandatory.</li>
        <li><strong>Decommissioning: secure erase mandatory</strong> — format sufficient nahi.</li>
        <li><strong>RAID rebuild ke dauran:</strong> backup current rakho, doosri drive mat remove karo.</li>
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
        <li><TopicLink slug="nas" variant="inline" /> — Network Attached Storage — file-level shared storage, DAS ka natural next step.</li>
        <li><TopicLink slug="san" variant="inline" /> — Storage Area Network — enterprise shared block storage, VMware aur large databases ke liye.</li>
        <li><TopicLink slug="server-basics" variant="inline" /> — Server hardware fundamentals — DAS ka foundation.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — Virtualization pe DAS ka role — local datastores aur HCI.</li>
      </ul>
    </>
  );
}
