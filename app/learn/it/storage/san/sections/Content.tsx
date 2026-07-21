"use client";

import { S, Callout, ComparisonTable, Figure, CodeBlock } from "../shared";
import TopicLink from "@/components/TopicLink";
import SanDasNasCompare   from "../svg/SanDasNasCompare";
import SanDataPath        from "../svg/SanDataPath";
import SanDualFabric      from "../svg/SanDualFabric";
import SanFcLoginFlow     from "../svg/SanFcLoginFlow";
import SanZoningVsMasking from "../svg/SanZoningVsMasking";
import SanMultipathing    from "../svg/SanMultipathing";
import SanFcVsIscsi       from "../svg/SanFcVsIscsi";
import SanLunNotVisible   from "../svg/SanLunNotVisible";
import { faqs }           from "../metadata";

export default function Content() {
  return (
    <>
      {/* ── Quick Summary ─────────────────────────────────────────────── */}
      <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:10, padding:"1.2rem 1.4rem", marginBottom:"2rem" }}>
        <p style={{ fontWeight:700, color:"#15803d", marginBottom:"0.6rem", fontSize:"1rem" }}>📋 Quick Summary — SAN in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom:0 }}>
          <li><strong>SAN kya hai:</strong> Storage Area Network — dedicated high-speed storage network. Servers ko block-level storage provide karta hai. Server raw LUN dekhta hai — khud filesystem banata hai.</li>
          <li><strong>Block-level:</strong> SAN raw disk blocks present karta hai. Server's OS ya application filesystem create karta hai upar. NAS files share karta hai; SAN disk share karta hai.</li>
          <li><strong>Key concept — LUN:</strong> Logical Unit Number — storage array mein ek logical block storage unit. Physical disk nahi — storage pool se carved-out logical volume.</li>
          <li><strong>Zoning + LUN Masking:</strong> Dono alag layers. Zoning fabric communication controls karta hai. LUN Masking storage-side which-host-sees-which-LUN controls karta hai.</li>
          <li><strong>Dual Fabric:</strong> Mission-critical FC SAN designs commonly Fabric A + Fabric B use karte hain. Both controllers have ports on both fabrics. Ek fail → doosra active.</li>
          <li><strong>Multipathing:</strong> Multiple physical paths — same LUN. MPIO (Windows), DM-Multipath (Linux), VMware NMP — OS level pe redundancy aur optional load balancing.</li>
          <li><strong>Primary use cases:</strong> Oracle/SQL Server databases, VMware shared datastores, mission-critical block storage.</li>
          <li><strong>Critical warning:</strong> Galat LUN format karna data permanently destroy kar sakta hai. Har action double-verify karo.</li>
        </ul>
      </div>

      {/* ══ SECTION 1 — DEFINITION ══════════════════════════════════════════ */}
      <h2 id="san-kya-hai" style={S.h2}>SAN Kya Hai — Definition aur Full Form</h2>
      <p style={S.p}><strong>SAN = Storage Area Network</strong></p>
      <p style={S.p}>SAN ek dedicated high-speed network hai jo servers aur storage devices ke beech block-level storage access provide karta hai.</p>
      <p style={S.p}><strong>Simple definition:</strong> Ek alag network sirf storage ke liye — jahan server storage ko ek local disk ki tarah access karta hai, lekin woh disk actually ek enterprise storage array mein hoti hai.</p>
      <p style={S.p}><strong>Technical definition:</strong> SAN ek storage-specific network fabric hai jo hosts (servers) ko storage devices (arrays) ke saath connect karta hai — Fibre Channel ya TCP/IP (iSCSI) protocols ke through — aur block-level I/O access provide karta hai.</p>

      <h3 style={S.h3}>SAN Kyun Exist Karta Hai</h3>
      <ul style={S.ul}>
        <li>Multiple servers ek common storage pool ko block-level access kar sakte hain (with cluster-aware software)</li>
        <li>VMware jaise hypervisors shared datastores pe vMotion, HA, DRS enable karte hain</li>
        <li>Mission-critical databases dedicated block storage use karte hain</li>
        <li>Storage independently scale hoti hai servers se</li>
        <li>Storage consolidation — many servers, one centralized managed storage infrastructure</li>
      </ul>

      {/* ══ SECTION 2 — SAN VS LAN ══════════════════════════════════════════ */}
      <h2 id="san-vs-lan" style={S.h2}>SAN vs Normal Network</h2>
      <ComparisonTable
        title="LAN vs SAN — Fundamental Difference"
        headers={["Parameter","LAN (Normal Network)","SAN (Storage Network)"]}
        rows={[
          ["Purpose",           "General data communication",    "Storage I/O only"],
          ["Protocol",          "TCP/IP, HTTP, DNS, etc.",       "Fibre Channel ya iSCSI"],
          ["Traffic type",      "Files, web, email, queries",    "Raw block storage I/O"],
          ["Latency requirement","Medium",                       "Very low"],
          ["Infrastructure",    "Standard Ethernet switches",    "FC switches ya dedicated storage Ethernet"],
          ["Failure impact",    "Service disruption",            "Storage inaccessible — potentially critical"],
        ]}
        caption="SAN ek 'storage fabric' hai — ek alag world sirf storage I/O ke liye. Production SAN traffic aur general network traffic mix nahi hoti."
      />

      {/* ══ SECTION 3 — FILE VS BLOCK ══════════════════════════════════════ */}
      <h2 id="file-vs-block" style={S.h2}>File-Level vs Block-Level Storage</h2>
      <h3 style={S.h3}>File-Level Storage (NAS)</h3>
      <p style={S.p}>NAS ek complete file system expose karta hai. Client files aur folders dekhta hai — NAS ke andar kya hai (RAID, drives) client ko nahi pata.</p>
      <CodeBlock lang="text">
{`Client → Network → NAS → [NAS internal filesystem] → Storage
Client sirf FILES dekhta hai`}
      </CodeBlock>

      <h3 style={S.h3}>Block-Level Storage (SAN)</h3>
      <p style={S.p}>SAN raw disk blocks expose karta hai. Server ko ek raw disk milti hai (LUN). Server ka OS ya application uske upar filesystem create karta hai.</p>
      <CodeBlock lang="text">
{`Server → SAN Fabric → Storage Array → [presents raw blocks as LUN]
Server ek "disk" dekhta hai — NAS pe koi filesystem nahi
Server khud filesystem banana padta hai`}
      </CodeBlock>
      <Callout type="important" title="Block-Level Kuch Workloads Ke Liye Kyun Better">
        Databases directly block-level I/O pe operate kar sakte hain — tight filesystem integration ke saath predictable latency. VMware VMFS block-level (SAN LUN) ke upar chalta hai aur multi-host concurrent access manage karta hai safely.
      </Callout>

      {/* ══ SECTION 4 — DAS NAS SAN COMPARE ════════════════════════════════ */}
      <h2 id="das-nas-san-compare" style={S.h2}>DAS vs NAS vs SAN — Deep Comparison</h2>
      <Figure caption="Fig 1 — DAS vs NAS vs SAN data path comparison. DAS: block-level, single host (typically). NAS: file-level, multiple clients via Ethernet. SAN: block-level, dedicated fabric, multiple hosts with cluster-aware software.">
        <SanDasNasCompare />
      </Figure>
      <ComparisonTable
        title=""
        headers={["Parameter","DAS","NAS","SAN"]}
        rows={[
          ["Connection",         "Direct cable to host",            "Ethernet network",              "Dedicated FC/iSCSI fabric"],
          ["Access type",        "Block (host manages filesystem)", "File-level",                    "Block (host manages filesystem)"],
          ["Protocol",           "SAS, SATA, NVMe",                "SMB, NFS",                     "Fibre Channel, iSCSI, NVMe-oF"],
          ["Multi-host sharing", "Typically single host",           "Yes — multiple clients",       "Yes — with cluster-aware software"],
          ["Latency",            "Lowest (direct)",                 "Medium",                        "Low (dedicated fabric)"],
          ["Scalability",        "Limited (chassis)",               "Good (NAS scale-out)",         "High (enterprise arrays)"],
          ["Management",         "Per-server, simplest",            "Centralized NAS OS, medium",   "Centralized, most complex"],
          ["Cost",               "Lowest",                          "Medium",                        "Highest"],
          ["DC use case",        "Local storage, HCI",             "Shared files, backup",          "Databases, VMware, mission-critical"],
        ]}
        caption="DAS aur SAN dono block-level hain — DAS directly attached, SAN fabric se. Multi-host LUN sharing mein cluster-aware software mandatory."
      />

      {/* ══ SECTION 5 — SAN DATA PATH ══════════════════════════════════════ */}
      <h2 id="san-data-path" style={S.h2}>Complete SAN Data Path</h2>
      <Figure caption="Fig 2 — Complete SAN data path: Application → Filesystem → Volume Manager → Multipath → HBA → Fabric → Storage Controller → Cache → RAID → Physical Media. Read path travels in reverse.">
        <SanDataPath />
      </Figure>
      <p style={S.p}><strong>Key layers explained:</strong></p>
      <ul style={S.ul}>
        <li><strong>Multipath Layer:</strong> MPIO/DM-Multipath/VMware NMP — multiple physical paths manage karta hai. Path fail → automatically doosre pe I/O.</li>
        <li><strong>HBA:</strong> FC ke liye WWPN identity, iSCSI ke liye IQN.</li>
        <li><strong>SAN Fabric:</strong> FC switches ya iSCSI network — storage frames route karte hain initiator se target tak.</li>
        <li><strong>Storage Controller:</strong> I/O process karta hai, cache manage karta hai.</li>
        <li><strong>Write Cache (NVRAM/Flash):</strong> Fast acknowledge — background mein physical media pe flush.</li>
        <li><strong>RAID/Storage Pool:</strong> Data protection layer.</li>
      </ul>

      {/* ══ SECTION 6 — TERMINOLOGY ════════════════════════════════════════ */}
      <h2 id="san-terminology" style={S.h2}>Core SAN Terminology — Engineer Ki Dictionary</h2>

      <h3 style={S.h3}>Initiator</h3>
      <p style={S.p}>Server/host side — jo storage access karna chahta hai. FC mein: FC HBA port = initiator, identity = <strong>WWPN</strong>. iSCSI mein: iSCSI adapter = initiator, identity = <strong>IQN</strong>.</p>

      <h3 style={S.h3}>Target</h3>
      <p style={S.p}>Storage side — storage array ka port jo I/O requests receive karta hai. FC mein: storage controller ka FC front-end port = target (WWPN). iSCSI mein: storage iSCSI portal = target (IQN + IP:Port).</p>

      <h3 style={S.h3}>LUN — Logical Unit Number</h3>
      <p style={S.p}>Ek numbered logical storage unit jo storage target expose karta hai. <strong>LUN ek physical disk nahi hai</strong> — storage pool/RAID ke upar software se create ki gayi logical block storage unit.</p>

      <h3 style={S.h3}>HBA — Host Bus Adapter</h3>
      <p style={S.p}>Server mein laga PCIe card jo SAN fabric se connect karta hai. FC HBA ya iSCSI-capable NIC. Firmware aur driver OS ke saath HCL-verified hone chahiye.</p>

      <h3 style={S.h3}>WWN — World Wide Name</h3>
      <p style={S.p}><strong>WWNN (World Wide Node Name):</strong> HBA device (card) ka unique 8-byte identifier — ek HBA ka ek WWNN.</p>
      <p style={S.p}><strong>WWPN (World Wide Port Name):</strong> HBA ke specific port ka unique 8-byte identifier. Dual-port HBA = 2 WWPNs. <strong>Zoning aur LUN masking mein WWPN use hota hai — WWNN nahi.</strong></p>
      <CodeBlock lang="text">
{`WWPN format: 50:00:D3:10:00:4A:BC:12  (8 bytes, hexadecimal, colon-separated)

WWPN kahan milega:
  Windows: Device Manager → FC HBA properties
  Linux:   cat /sys/class/fc_host/host*/port_name
  VMware:  esxcli storage core adapter list`}
      </CodeBlock>

      <h3 style={S.h3}>Fabric, Zoning, LUN Masking, Multipathing, ALUA</h3>
      <p style={S.p}>Ye sab dedicated sections mein deep-dive mein explain hain. Brief definitions:</p>
      <ul style={S.ul}>
        <li><strong>Fabric:</strong> FC switches ka interconnected network — ISL (Inter-Switch Links) se connected.</li>
        <li><strong>Zoning:</strong> FC switch pe — which initiator WWPN can communicate with which target WWPN.</li>
        <li><strong>LUN Masking:</strong> Storage array pe — which host can see which LUN.</li>
        <li><strong>Multipathing:</strong> Multiple physical paths same LUN tak — MPIO/DM-Multipath/VMware NMP manage karta hai.</li>
        <li><strong>ALUA:</strong> T10 SCSI standard — storage array batata hai via Target Port Groups ki kaun sa path preferred (Active/Optimized) hai.</li>
      </ul>

      {/* ══ SECTION 7 — LUN DEEP ═══════════════════════════════════════════ */}
      <h2 id="lun-deep" style={S.h2}>LUN — Deep Explanation</h2>
      <h3 style={S.h3}>LUN Kya Hai Actually</h3>
      <CodeBlock lang="text">
{`Physical Drives (10 × SAS SSDs in array)
          ↓
Storage Pool (RAID protection — ~45TB usable, example)
          ↓
LUN 1 — 2TB  (for Oracle DB server)
LUN 2 — 5TB  (for VMware Datastore)
LUN 3 — 1TB  (for Backup target)

Each LUN is a separate logical block storage unit — carved from the pool.
Same pool can serve multiple hosts via different LUNs.`}
      </CodeBlock>

      <h3 style={S.h3}>LUN Ko Host Kaise Dekhta Hai</h3>
      <ul style={S.ul}>
        <li><strong>Windows:</strong> Disk Management mein "Disk 1 — 2047.98 GB Unallocated." Engineer initialize, partition, format karta hai.</li>
        <li><strong>Linux:</strong> <code>/dev/sdb</code> ya <code>/dev/mapper/mpath0</code> jaisa block device. Filesystem banana padega.</li>
        <li><strong>VMware ESXi:</strong> Storage adapter mein device/LUN appear hota hai. Admin VMFS datastore create karta hai.</li>
      </ul>

      <h3 style={S.h3}>Practical Provisioning Example</h3>
      <CodeBlock lang="text">
{`Scenario: DBA ko 5TB Oracle database volume chahiye

Storage admin:
  1. Storage pool capacity check: 45TB free
  2. 5TB thin-provisioned LUN create, LUN ID: 5
  3. Host object banaya for Oracle_DB_Server_1
  4. Oracle server ka HBA WWPN register kiya
  5. LUN 5 map kiya to Oracle_DB_Server_1

SAN admin:
  6. FC zone create: Oracle_Server1_WWPN ↔ Storage_Target_WWPNs
     (Both Fabric A and Fabric B — separately)

Server admin:
  7. Oracle server pe rescan kiya
  8. New "Disk 1 — 5.00TB Unallocated" appeared
  9. Initialize GPT, format, Oracle tablespace configured`}
      </CodeBlock>
      <Callout type="danger" title="LUN ID aur WWPN — Completely Different Concepts">
        LUN ID ek number hai (0, 1, 5...) — storage target ke context mein specific logical unit identify karta hai. WWPN ek identity address hai — physical port identify karta hai. In dono ko kabhi confuse mat karo.
      </Callout>

      {/* ══ SECTION 8 — SAN ARCHITECTURE ══════════════════════════════════ */}
      <h2 id="san-architecture" style={S.h2}>SAN Architecture — Dual Fabric</h2>

      <h3 style={S.h3}>Corrected Dual-Fabric Architecture</h3>
      <p style={S.p}>Mission-critical enterprise FC SAN designs commonly do independent fabrics use karte hain: <strong>Fabric A</strong> aur <strong>Fabric B</strong> — ek fabric ko single failure domain eliminate karne ke liye.</p>
      <p style={S.p}><strong>Critical point — both controllers on both fabrics:</strong> It is incorrect to associate Controller A exclusively with Fabric A and Controller B exclusively with Fabric B. In typical enterprise SAN designs, <strong>both controllers have front-end ports on both fabrics</strong> — providing redundant paths across all fabric and controller combinations.</p>
      <CodeBlock lang="text">
{`From Server HBA Port 1 (Fabric A):
  → Can reach Controller A front-end port on Fabric A
  → Can also reach Controller B front-end port on Fabric A

From Server HBA Port 2 (Fabric B):
  → Can reach Controller A front-end port on Fabric B
  → Can also reach Controller B front-end port on Fabric B

Result: 4 paths to same LUN from dual-HBA server
  (architecture and port count vary by vendor/model)`}
      </CodeBlock>
      <Figure caption="Fig 3 — Generic dual-controller scale-up SAN architecture. Both controllers have ports on BOTH fabrics. Scale-out/distributed array architectures differ — verify with vendor documentation.">
        <SanDualFabric />
      </Figure>
      <Callout type="important" title="What Happens If Fabric A Fails Completely">
        Agar Fabric A switch fail ho — sab Fabric A paths fail hote hain. Lekin Fabric B pe dono controllers ke front-end ports hain — Fabric B through sab I/O continue. Multipath software automatically route karta hai. Applications continue — alert generate hota hai, investigation begin hoti hai. <strong>Do NOT disturb Fabric B during active incident.</strong>
      </Callout>

      {/* ══ SECTION 9 — FIBRE CHANNEL ══════════════════════════════════════ */}
      <h2 id="fibre-channel" style={S.h2}>Fibre Channel SAN — Deep Practical Explanation</h2>

      <h3 style={S.h3}>Fibre Channel Kya Hai</h3>
      <p style={S.p}>Fibre Channel (FC) ek dedicated high-speed serial communication protocol hai — specifically storage networking ke liye designed. Standard Ethernet nahi hai.</p>
      <p style={S.p}>Fibre Channel uses credit-based flow control and is engineered to avoid congestion-driven frame loss during normal operation — physical/link errors and abnormal conditions can still cause transmission problems.</p>

      <h3 style={S.h3}>FC Hardware Components</h3>
      <ul style={S.ul}>
        <li><strong>FC HBA:</strong> Server mein PCIe card. Typically 2-port dual-port enterprise mein. Har port ka ek unique WWPN. Firmware aur driver HCL-verified hone chahiye.</li>
        <li><strong>SFP Transceivers:</strong> FC-specific optical modules — Ethernet SFPs FC ke liye nahi. Speed aur type compatibility required across HBA, switch, aur storage array.</li>
        <li><strong>Fibre Optic Cable:</strong> Multi-mode (shorter distances, data center) ya single-mode (longer distances). Connector type (LC) aur SFP match karna chahiye.</li>
        <li><strong>FC SAN Switch (Director):</strong> Dedicated FC fabric device. Two major vendors: <strong>Brocade (Broadcom, FOS firmware)</strong> aur <strong>Cisco MDS (NX-OS firmware)</strong>.</li>
        <li><strong>Storage Array FC Ports:</strong> Controller ke front-end ports — FC SFPs. These are the targets. Both controllers have ports on both fabrics in typical enterprise design.</li>
      </ul>

      <h3 style={S.h3}>FC Speeds — With Interoperability Note</h3>
      <ComparisonTable
        title="Common FC Speeds in Enterprise"
        headers={["Generation","Speed","Deployment"]}
        rows={[
          ["8GFC",  "8 Gbps",  "Older — still deployed in some environments"],
          ["16GFC", "16 Gbps", "Widely deployed — current mainstream"],
          ["32GFC", "32 Gbps", "Current enterprise generation"],
          ["64GFC", "64 Gbps", "Newer generation — vendor naming may vary"],
        ]}
        caption="FC speed compatibility depends on supported generations by HBA, switch, and storage port. Not all combinations automatically negotiate correctly — always verify vendor interoperability/HCL matrix. Do not assume any speed combination is universally supported."
      />

      {/* ══ SECTION 10 — FC LOGIN ═══════════════════════════════════════════ */}
      <h2 id="fc-login" style={S.h2}>Fibre Channel Login Process</h2>
      <p style={S.p}>FC cable connect karne se storage automatically accessible nahi hoti. Ek formal process hoti hai. Yeh ek educational/conceptual sequence hai — actual fabric services, timing aur implementation details platform-specific hain.</p>

      <h3 style={S.h3}>FLOGI — Fabric Login</h3>
      <p style={S.p}>HBA port FC switch se connect hota hai → <strong>FLOGI</strong> send karta hai — HBA apna WWPN fabric mein register karta hai. Fabric accept kare toh HBA ko ek <strong>N_Port ID (FCID)</strong> assign hoti hai — fabric-unique 24-bit address. FLOGI fail ho → HBA fabric ka part nahi. Kuch bhi work nahi karega.</p>

      <h3 style={S.h3}>Name Server / Directory Service</h3>
      <p style={S.p}>FLOGI ke baad HBA fabric ke Name Server mein register ho jaata hai — available devices ki directory. Hosts Name Server se available target ports query kar sakte hain.</p>

      <h3 style={S.h3}>PLOGI — Port Login</h3>
      <p style={S.p}>Initiator ek specific target port se direct connection establish karne ki koshish karta hai — <strong>PLOGI</strong>. Zoning determines which initiator-target pairs are permitted to discover and communicate according to the fabric platform's zoning implementation and enforcement behavior. Agar zoning allow nahi karta — communication blocked hoti hai. Storage accessible nahi hogi.</p>

      <h3 style={S.h3}>PRLI — Process Login</h3>
      <p style={S.p}><strong>PRLI</strong> SCSI upper protocol layer establish karta hai — confirms this connection is for SCSI I/O.</p>

      <h3 style={S.h3}>LUN Discovery</h3>
      <p style={S.p}>PRLI ke baad host REPORT LUNS aur INQUIRY commands se LUNs discover karta hai. Storage array sirf wo LUNs report karta hai jo is host ko mapped hain (LUN masking).</p>

      <Figure caption="Fig 4 — FC login educational sequence: FLOGI → Name Server → zoning check → PLOGI → PRLI → LUN discovery. Conceptual only — fabric services and timing are platform-specific.">
        <SanFcLoginFlow />
      </Figure>

      {/* ══ SECTION 11 — ZONING ════════════════════════════════════════════ */}
      <h2 id="san-zoning" style={S.h2}>SAN Zoning — Deep Explanation</h2>

      <h3 style={S.h3}>Zoning Kya Hai</h3>
      <p style={S.p}>Zoning SAN fabric pe access control mechanism hai — FC switch level pe. Defines: <strong>which initiator WWPN can communicate with which target WWPN</strong> via the fabric, according to the platform's implementation.</p>

      <h3 style={S.h3}>Zoning Kyun Exist Karta Hai</h3>
      <ul style={S.ul}>
        <li>Bina zoning ke: har HBA har storage port se potentially communicate kar sakta hai — security risk</li>
        <li>Isolation — server A ka traffic server B ko affect nahi karta</li>
        <li>Security layer — wrong server galat LUN access nahi kar sakta (zoning + LUN masking combination)</li>
      </ul>

      <h3 style={S.h3}>Zoning Types — Corrected</h3>
      <p style={S.p}><strong>WWPN-Based Zoning:</strong> Zone defined by WWPN list. Physical switch port change karo — zone still works. Most common in enterprise.</p>
      <p style={S.p}><strong>Switch-Port-Based Zoning:</strong> Zone defined by switch port numbers. Device move ports → zone no longer applies.</p>
      <Callout type="warning" title="Hard Zoning / Soft Zoning Terminology">
        These terms are used in some vendor documentation but do not have universally agreed definitions. The enforcement mechanism — whether hardware-level frame blocking or Name Server restriction — is vendor and platform dependent. Consult your specific SAN switch vendor documentation for enforcement behavior. Do not use "WWPN = soft, port = hard" as a universal rule.
      </Callout>

      <h3 style={S.h3}>Zone Design — Single-Initiator Patterns</h3>
      <p style={S.p}>A widely recommended practice is to limit initiator ports per zone — typically one initiator WWPN per zone, paired with the target ports that host should reach. This limits blast radius and simplifies troubleshooting. Exact recommended zone designs depend on storage vendor, SAN vendor, environment size, and requirements. Follow your storage vendor's SAN connectivity and zoning design guides.</p>

      <h3 style={S.h3}>Brocade vs Cisco — Terminology Corrected</h3>
      <ComparisonTable
        title="FC Switch Zone Terminology"
        headers={["Concept","Brocade FOS","Cisco MDS / NX-OS"]}
        rows={[
          ["Individual access group",  "Zone",                      "Zone"],
          ["Collection of zones",      "Zone Configuration (cfg)",   "Zoneset"],
          ["Fabric isolation concept", "Not applicable (native)", "VSAN (Virtual SAN)"],
          ["Save zone database",       "cfgsave",                   "zoneset activate / zone commit"],
          ["Activate configuration",   "cfgenable [cfgname]",        "zoneset activate name vsan N"],
          ["Show zone info",           "zoneshow",                   "show zone"],
          ["Show logged-in devices",   "nsshow",                     "show flogi database"],
        ]}
        caption="Terminology and commands differ between vendors. Always consult vendor-specific documentation. Never interchange Brocade FOS commands with Cisco MDS commands."
      />
      <Callout type="danger" title="Production Zone Changes — Extreme Caution Required">
        Zone configuration commands that activate zone configurations can impact production fabric traffic. ONLY perform in approved maintenance windows, by experienced SAN engineers, with peer review, change management approval, and clear rollback plan.
      </Callout>

      <h3 style={S.h3}>Zoning Example — Correct Dual-Fabric Design</h3>
      <CodeBlock lang="text">
{`Fabric A — Zone: ORACLE_SRV1_HBA1_TO_ARRAY_FA
  Initiator WWPN: 10:00:00:00:C9:AA:BB:11  (Oracle_Server_1, HBA Port 1)
  Target WWPN:    50:00:97:00:00:11:22:33  (Storage_Array, Ctrl_A port on Fabric A)
  Target WWPN:    50:00:97:00:00:11:22:55  (Storage_Array, Ctrl_B port on Fabric A)

Fabric B — Zone: ORACLE_SRV1_HBA2_TO_ARRAY_FB
  Initiator WWPN: 10:00:00:00:C9:AA:BB:22  (Oracle_Server_1, HBA Port 2)
  Target WWPN:    50:00:97:00:00:11:22:44  (Storage_Array, Ctrl_A port on Fabric B)
  Target WWPN:    50:00:97:00:00:11:22:66  (Storage_Array, Ctrl_B port on Fabric B)

Both controllers accessible from each fabric.`}
      </CodeBlock>

      {/* ══ SECTION 12 — LUN MASKING ════════════════════════════════════════ */}
      <h2 id="lun-masking" style={S.h2}>LUN Masking / Host Mapping</h2>
      <p style={S.p}>LUN masking storage array level pe access control hai — <strong>which host can ACCESS which LUN</strong>.</p>
      <p style={S.p}><strong>Configuration on storage array:</strong> (1) Create host object — give server a name. (2) Register server's HBA WWPN(s) as initiators. (3) Map specific LUNs to this host object.</p>
      <p style={S.p}>Different arrays different terminology use karte hain: "Host Group," "Initiator Group," "Host Object," "Volume Map," "LUN Mask" — concept same hai.</p>
      <Callout type="warning" title="Array Default Behavior — Do Not Assume">
        Without explicit LUN masking, array default LUN visibility behavior varies by vendor and platform — some arrays show no LUNs by default (safer), others may differ. Always configure explicit LUN masking. Never rely on default behavior assumptions.
      </Callout>

      {/* ══ SECTION 13 — ZONING VS MASKING ══════════════════════════════════ */}
      <h2 id="zoning-vs-masking" style={S.h2}>Zoning vs LUN Masking — Comparison</h2>
      <Figure caption="Fig 5 — Zoning vs LUN Masking: two independent access-control layers. Zoning at fabric/switch level. LUN masking at storage array level. Both required.">
        <SanZoningVsMasking />
      </Figure>
      <ComparisonTable
        title=""
        headers={["","Zoning","LUN Masking"]}
        rows={[
          ["Where configured", "SAN switch (fabric)",            "Storage array"],
          ["What it controls", "FC communication between ports", "Which LUNs a host can see"],
          ["Identity used",    "WWPN (initiator + target)",      "WWPN (or IQN) as host initiator"],
          ["Granularity",      "Port-level communication",       "LUN-level visibility"],
          ["Layer",            "Fabric layer",                   "Storage layer"],
          ["Who configures",   "SAN admin",                      "Storage admin"],
          ["Failure impact",   "Missing zone → no permitted communication → LUN invisible", "Missing map → LUN invisible or wrong LUN visible"],
        ]}
        caption="Both layers must be correctly configured. Zoning alone is not complete SAN security."
      />

      {/* ══ SECTION 14 — MULTIPATHING ═══════════════════════════════════════ */}
      <h2 id="multipathing" style={S.h2}>Multipathing — Deep Practical Explanation</h2>

      <h3 style={S.h3}>Kyun Multiple Paths</h3>
      <p style={S.p}>Corrected architecture: From Server HBA Port 1 (Fabric A), host can reach target ports on BOTH controllers via Fabric A. From HBA Port 2 (Fabric B), host can reach target ports on BOTH controllers via Fabric B.</p>
      <CodeBlock lang="text">
{`Four paths to same LUN from dual-HBA server (typical enterprise design):
Path 1: HBA Port 1 → Fabric A → Controller A (Fabric A port) → LUN
Path 2: HBA Port 1 → Fabric A → Controller B (Fabric A port) → LUN
Path 3: HBA Port 2 → Fabric B → Controller A (Fabric B port) → LUN
Path 4: HBA Port 2 → Fabric B → Controller B (Fabric B port) → LUN

Without multipathing software: OS may see LUN as 4 separate "disks" → DATA CORRUPTION
With multipathing software: OS sees ONE single device — all paths managed transparently`}
      </CodeBlock>

      <h3 style={S.h3}>Multipathing Software</h3>
      <p style={S.p}><strong>Windows — MPIO (Multipath I/O):</strong> Windows Server built-in framework. Microsoft DSM (MSDSM) built-in — supports standard ALUA-compliant arrays without additional vendor software. Storage vendor may provide vendor-specific DSM for enhanced/array-specific features — this is optional where vendor provides and supports one, not universally required.</p>
      <p style={S.p}><strong>Linux — DM-Multipath:</strong> Linux device-mapper subsystem. <code>/etc/multipath.conf</code> configuration. Devices appear as <code>/dev/mapper/mpath0</code> etc.</p>
      <p style={S.p}><strong>VMware — Native Multipathing (NMP):</strong> ESXi built-in. See VMware section.</p>

      <h3 style={S.h3}>ALUA — Target Port Groups Explained</h3>
      <p style={S.p}><strong>ALUA = Asymmetric Logical Unit Access (T10 SCSI standard)</strong></p>
      <p style={S.p}>ALUA ek standard mechanism hai jisse storage device communicates path access characteristics to a host, using <strong>Target Port Groups (TPGs)</strong> to organize storage target ports.</p>
      <ComparisonTable
        title="ALUA Access States"
        headers={["State","Meaning","Typical Implication"]}
        rows={[
          ["Active/Optimized",     "Preferred TPG — lowest latency, best performance",      "Controller or node with direct backend access to LUN"],
          ["Active/Non-Optimized", "Working but non-preferred — higher latency",            "Controller must route I/O internally to reach LUN"],
          ["Standby",              "Path exists but not actively serving I/O",              "Ready for failover"],
          ["Unavailable/Transitioning","Not currently usable",                              "Failover or recovery in progress"],
        ]}
        caption="ALUA states are communicated via REPORT TARGET PORT GROUPS SCSI command. Host multipath software reads this and prefers Active/Optimized paths. Behavior is array architecture and configuration dependent."
      />
      <Callout type="important" title="ALUA — Architecture Dependent">
        Do not assume "Controller A = preferred, Controller B = standby" universally. Some modern Active/Active arrays (various vendors) present all paths as Active/Optimized simultaneously — no asymmetry. Scale-out architectures distribute LUN ownership differently. Exact ALUA/TPG behavior depends on vendor, protocol, model, and software version. Consult your specific array documentation.
      </Callout>

      <Figure caption="Fig 6 — SAN multipathing: four paths via dual fabric and dual controllers. ALUA states shown as example only — actual path states depend on storage-array architecture and LUN/volume access model.">
        <SanMultipathing />
      </Figure>

      {/* ══ SECTION 15 — WINDOWS SAN ═══════════════════════════════════════ */}
      <h2 id="windows-san" style={S.h2}>Windows SAN Practical</h2>
      <Callout type="danger" title="CRITICAL: SAN LUN Format Warning">
        SAN pe galat LUN format karna data permanently destroy kar sakta hai. Before ANY initialization/format on a SAN LUN: (1) Correct disk number verify karo — size matches expected LUN from storage team. (2) Storage admin written confirmation lo. (3) Change management approval. (4) NEVER format without explicit triple-verification.
      </Callout>

      <h3 style={S.h3}>Disk Visibility — Safe Diagnostic Commands</h3>
      <CodeBlock label="Windows PowerShell — safe read-only diagnostics" lang="powershell">
{`# List all disks
Get-Disk

# Detailed disk info
Get-Disk | Select-Object Number, FriendlyName, OperationalStatus, Size, PartitionStyle

# Find offline disks
Get-Disk | Where-Object { $_.OperationalStatus -ne 'Online' }

# List volumes
Get-Volume

# Rescan (safe)
Update-Disk`}
      </CodeBlock>

      <h3 style={S.h3}>Windows MPIO — Corrected</h3>
      <p style={S.p}><strong>MPIO feature:</strong> Install via Server Manager or PowerShell. <strong>Microsoft DSM (MSDSM)</strong> is built-in — supports standard ALUA-compliant arrays without extra software. Vendor-specific DSM is optional where provided/recommended for array-specific features.</p>
      <CodeBlock label="Windows PowerShell — MPIO diagnostics (requires MPIO feature)" lang="powershell">
{`# Check MPIO supported hardware list
Get-MSDSMSupportedHW

# MPIO claim diagnostics (read-only)
mpclaim -s -d

# Note: Some commands require MPIO feature installed
# Vendor-specific MPIO commands vary by storage vendor`}
      </CodeBlock>

      {/* ══ SECTION 16 — LINUX SAN ══════════════════════════════════════════ */}
      <h2 id="linux-san" style={S.h2}>Linux SAN Practical</h2>
      <h3 style={S.h3}>Safe Diagnostic Commands</h3>
      <CodeBlock label="Linux — safe read-only SAN diagnostics" lang="bash">
{`# List block devices
lsblk
lsblk -S                    # SCSI-level info

# List SCSI devices (lsscsi package)
lsscsi

# DM-Multipath status — most important for SAN
multipath -ll
multipath -l

# Persistent identifiers (WWN-based for SAN)
ls -l /dev/disk/by-id/ | grep scsi

# Kernel storage messages
dmesg | grep -iE "scsi|sd[a-z]|mpath|multipath|hba|qla|lpfc" | tail -50

# HBA WWPN (from OS perspective)
cat /sys/class/fc_host/host*/port_name

# HBA port link state
cat /sys/class/fc_host/host*/port_state

# Device-mapper devices
ls /dev/mapper/`}
      </CodeBlock>

      <h3 style={S.h3}>DM-Multipath Output — Interpretation</h3>
      <CodeBlock label="multipath -ll — example output (illustrative — actual format varies)" lang="bash">
{`mpatha (360000000000000001) dm-0 VENDOR,PRODUCT
size=100G features='...' hwhandler='...' wp=rw
|-+- policy='service-time 0' prio=50 status=active     # Active/Optimized TPG
| |- 2:0:0:1 sdb 8:16 active ready running              # Path 1
| '- 3:0:0:1 sdd 8:48 active ready running              # Path 3
'-+- policy='service-time 0' prio=10 status=enabled    # Active/Non-Opt TPG (example)
  |- 2:0:1:1 sdc 8:32 active ready running              # Path 2
  '- 3:0:1:1 sde 8:64 active ready running              # Path 4

prio=50 = Active/Optimized TPG paths (example)
prio=10 = Active/Non-Optimized TPG paths (example)
All 4 paths healthy = expected. Missing path = investigate.
Output format varies by multipath version and configuration.`}
      </CodeBlock>
      <Callout type="warning" title="Linux SAN Rescan — Environment-Specific">
        Production system pe storage rescan procedure varies by Linux distribution, HBA driver, and vendor. Do not attempt without understanding your specific environment. Wrong rescan commands can cause issues. Consult storage vendor and OS documentation for your specific setup.
      </Callout>

      {/* ══ SECTION 17 — VMWARE SAN ═════════════════════════════════════════ */}
      <h2 id="vmware-san" style={S.h2}>VMware SAN</h2>

      <h3 style={S.h3}>ESXi aur SAN</h3>
      <p style={S.p}>VMware ESXi host SAN storage access karta hai through FC HBA, software iSCSI, hardware iSCSI, or FCoE adapter.</p>

      <h3 style={S.h3}>LUN to VMFS Datastore</h3>
      <ol style={{ ...S.ul, listStyleType:"decimal" }}>
        <li>ESXi storage adapter SAN se connect hota hai</li>
        <li>LUNs appear as storage devices in ESXi</li>
        <li>Admin VMFS datastore create karta hai LUN pe</li>
        <li>VMs VMDK files store karte hain datastore pe</li>
      </ol>
      <p style={S.p}><strong>VMFS (VMware File System):</strong> VMware's clustered filesystem. Multiple ESXi hosts simultaneously same VMFS datastore access kar sakte hain safely — VMFS clustering manages concurrent access. Regular filesystems (NTFS, ext4) ek non-cluster-aware LUN pe multiple hosts simultaneously mount nahi kar sakte safely.</p>

      <h3 style={S.h3}>VMware Path Selection Policy — Corrected</h3>
      <p style={S.p}>VMware NMP (Native Multipathing Plugin) uses <strong>SATP (Storage Array Type Plugin)</strong> + <strong>PSP (Path Selection Policy)</strong>.</p>
      <ComparisonTable
        title="VMware Path Selection Policies (PSP)"
        headers={["PSP","Behavior","Note"]}
        rows={[
          ["Fixed",        "Uses configured preferred path; returns to it after recovery",    "Useful for specific storage configurations"],
          ["MRU",          "Uses most recently selected path; does not return to previous",   "Common for certain active/passive designs"],
          ["Round Robin",  "Rotates across paths — distributes I/O",                         "Load distribution; verify with vendor HCL"],
        ]}
        caption="SATP/PSP assignment is driven by device detection rules in ESXi. Applicable defaults depend on ESXi version, array type, vendor-provided plugins, and HCL recommendations. WRONG PSP can cause performance/availability issues. Always check VMware HCL and storage vendor's VMware integration guide."
      />

      <h3 style={S.h3}>vMotion, HA, DRS — Qualified Statement</h3>
      <p style={S.p}>Traditional SAN-based VMware deployments use shared SAN datastores to enable vMotion, HA, and DRS — shared storage accessible by all ESXi hosts in cluster.</p>
      <Callout type="important" title="Modern VMware Architectures — SAN Not Always Required">
        vSAN (VMware's hyperconverged storage) provides shared storage without traditional SAN — storage aggregated from local disks. Some newer VMware features support scenarios without traditional shared SAN. Stating shared SAN is always required for VMware HA/vMotion is not universally accurate. SAN-backed datastores are a common enterprise approach, not the only one.
      </Callout>

      {/* ══ SECTION 18 — iSCSI SAN ══════════════════════════════════════════ */}
      <h2 id="iscsi-san" style={S.h2}>iSCSI SAN — Deep Practical Explanation</h2>

      <h3 style={S.h3}>iSCSI Kya Hai</h3>
      <p style={S.p}><strong>iSCSI = Internet Small Computer Systems Interface</strong> — SCSI commands TCP/IP Ethernet pe encapsulate karke storage access.</p>
      <p style={S.p}>FC mein dedicated hardware chahiye. iSCSI standard NICs pe bhi chal sakta hai — lower cost. Lekin dedicated storage network/VLAN still required.</p>

      <h3 style={S.h3}>iSCSI Components</h3>
      <ul style={S.ul}>
        <li><strong>Initiator:</strong> Software (OS built-in) ya hardware iSCSI HBA. Identity = IQN.</li>
        <li><strong>Target:</strong> Storage array — IP:Port (portal). Standard port: <strong>TCP 3260</strong>.</li>
        <li><strong>IQN:</strong> iSCSI Qualified Name — unique identifier. Format: <code>iqn.YYYY-MM.reverse-domain:identifier</code></li>
        <li><strong>CHAP:</strong> Challenge Handshake Authentication Protocol — one-way or mutual. Enable in production.</li>
      </ul>

      <h3 style={S.h3}>iSCSI Network Design</h3>
      <ul style={S.ul}>
        <li>Dedicated storage VLAN required — not mixed with general LAN</li>
        <li>Dedicated NICs strongly recommended</li>
        <li><strong>Jumbo Frames: OPTIONAL, not mandatory.</strong> If enabled: end-to-end MTU consistency required across server NIC, all switches, and storage portal. Common ~9000 MTU, but verify environment. MTU mismatch can cause fragmentation, packet drops, or PMTU-related issues.</li>
      </ul>

      {/* ══ SECTION 19 — IQN NAMING ═════════════════════════════════════════ */}
      <h2 id="iqn-naming" style={S.h2}>IQN Naming Convention</h2>
      <CodeBlock lang="text">
{`Format: iqn.YYYY-MM.reverse-domain:identifier

Initiator examples:
  iqn.2024-01.com.acmecorp:server01-iscsi-port1
  iqn.1991-05.com.microsoft:winserver-02  (Windows built-in)

Target examples:
  iqn.2024-03.com.storage-vendor:array01-ctrl-a-portal1

RFC 3720 defines IQN format. Naming conventions within
organizations vary — key requirement is global uniqueness.`}
      </CodeBlock>

      {/* ══ SECTION 20 — FC VS iSCSI ════════════════════════════════════════ */}
      <h2 id="fc-vs-iscsi" style={S.h2}>FC SAN vs iSCSI SAN — Comparison</h2>
      <Figure caption="Fig 7 — FC SAN vs iSCSI SAN architecture side-by-side. Both provide block-level LUN access. Performance depends on infrastructure, workload and configuration — not protocol alone.">
        <SanFcVsIscsi />
      </Figure>
      <ComparisonTable
        title=""
        headers={["Parameter","FC SAN","iSCSI SAN"]}
        rows={[
          ["Transport",       "Fibre Channel protocol",              "SCSI over TCP/IP"],
          ["Network",         "Dedicated FC fabric",                 "Ethernet (dedicated VLAN required)"],
          ["Adapter",         "FC HBA",                              "Software initiator or hardware iSCSI HBA"],
          ["Switch",          "FC switches (Brocade/Cisco MDS)",     "Standard Ethernet switches"],
          ["Addressing",      "WWPN/WWNN",                          "IQN + IP address"],
          ["Standard port",   "N/A (fabric)",                        "TCP 3260"],
          ["Flow control",    "Credit-based (engineered for storage fabric)", "TCP/IP standard congestion control"],
          ["Hardware cost",   "Higher",                              "Lower (software initiator option)"],
          ["Complexity",      "FC-specific skills required",         "IP networking skills transferable"],
          ["Security",        "Zoning + LUN masking",                "CHAP + VLAN isolation + LUN masking"],
          ["Typical use",     "Tier-1 DB, large VMware, latency-sensitive", "Cost-sensitive, mid-tier, remote sites"],
        ]}
        caption="Modern iSCSI (25GbE/100GbE) can achieve high throughput and competitive latency. FC's advantage is purpose-built lossless fabric. Choice depends on workload, budget, infrastructure, team skills."
      />

      {/* ══ SECTION 21 — FCoE ════════════════════════════════════════════════ */}
      <h2 id="fcoe" style={S.h2}>FCoE — Fibre Channel over Ethernet</h2>
      <p style={S.p}>FCoE (Fibre Channel over Ethernet): FC frames over Ethernet using CNA (Converged Network Adapter). Requires DCB (Data Center Bridging) for lossless Ethernet. <strong>FCoE is NOT iSCSI</strong> — completely different protocols. FCoE mein FC frame Ethernet mein encapsulate hoti hai; iSCSI mein SCSI command TCP/IP mein. Deployment depends on vendor support aur infrastructure architecture — not universally adopted.</p>

      {/* ══ SECTION 22 — NVMe-oF ════════════════════════════════════════════ */}
      <h2 id="nvme-of" style={S.h2}>NVMe over Fabrics (NVMe-oF)</h2>
      <p style={S.p}>Modern storage networking ka next generation. NVMe protocol ko ek storage fabric pe extend karta hai:</p>
      <ul style={S.ul}>
        <li><strong>NVMe/FC:</strong> NVMe commands over FC fabric (Gen 6 FC / 32G support)</li>
        <li><strong>NVMe/TCP:</strong> NVMe over TCP/IP Ethernet — simpler deployment, lower hardware cost</li>
        <li><strong>NVMe/RoCE:</strong> RDMA over Converged Ethernet — ultra-low latency</li>
      </ul>
      <p style={S.p}>Traditional SCSI-based SAN SCSI command overhead rakhti hai. NVMe-oF SCSI layer remove karta hai — lower protocol overhead. Growing adoption in modern all-flash arrays. Deployment maturity depends on array firmware, host drivers, OS compatibility, and fabric infrastructure.</p>

      {/* ══ SECTION 23 — SAN SWITCH ARCH ════════════════════════════════════ */}
      <h2 id="san-switch-arch" style={S.h2}>SAN Switch Architecture</h2>
      <p style={S.p}><strong>ISL (Inter-Switch Links):</strong> Multiple switches ke beech — bandwidth planning important. ISL oversubscription congestion create kar sakta hai.</p>
      <ComparisonTable
        title="SAN Switch Health Monitoring"
        headers={["Metric","What to Check"]}
        rows={[
          ["Port state",          "All production ports online?"],
          ["CRC errors",          "Even low rate = investigate — cable, SFP, connector issue"],
          ["Link resets",         "Frequent resets = cable/SFP/HBA hardware issue"],
          ["BB_Credit Zero",      "Fabric congestion indicator — causes I/O pauses"],
          ["ISL utilization",     "Congested? Oversubscribed?"],
          ["SFP TX/RX power",     "Within vendor spec? Degrading?"],
          ["Switch CPU/memory",   "Healthy?"],
          ["Firmware",            "Current/compatible with connected devices?"],
        ]}
        caption=""
      />

      {/* ══ SECTION 24 — STORAGE ARRAY ARCH ════════════════════════════════ */}
      <h2 id="storage-array-arch" style={S.h2}>Storage Array Architecture</h2>
      <Callout type="important" title="Storage Array Architectures Vary Significantly">
        Do NOT present any single dual-controller architecture as universal. Modern enterprise arrays include: Active/Active (all paths Active/Optimized), Active/Passive with ALUA (asymmetric controller ownership), scale-out distributed (multiple nodes), NVMe-native distributed architectures. Specific behavior — controller count, cache sharing, ALUA states, active/active vs active/passive — is vendor, model, and firmware specific. Always consult vendor architecture documentation.
      </Callout>

      <h3 style={S.h3}>Generic Dual-Controller Array (Conceptual)</h3>
      <CodeBlock lang="text">
{`Storage Array
  Controller A                    Controller B
  Front-End Ports → Fabric A     Front-End Ports → Fabric A
  Front-End Ports → Fabric B     Front-End Ports → Fabric B

  Cache (NVRAM/Flash) — architecture varies by vendor

  Back-End Connectivity (to drive shelves)

  Storage Pool / RAID / Erasure Coding

  Drive Shelves: NVMe SSD / SAS SSD / SAS HDD`}
      </CodeBlock>

      <h3 style={S.h3}>Hot Spare / Distributed Spare</h3>
      <p style={S.p}>Traditional: dedicated spare drive — failed drive rebuild ke liye. Distributed spare (modern): spare capacity distributed across pool drives — potentially faster rebuild. Vendor implementation varies.</p>

      {/* ══ SECTION 25 — VENDORS ════════════════════════════════════════════ */}
      <h2 id="san-vendors" style={S.h2}>Enterprise SAN Vendors / Platforms</h2>
      <Callout type="important" title="Vendor Disclaimer — Verify Current Documentation">
        Storage product lines evolve rapidly. Features, capabilities, and product names change with versions. All vendor statements below require verification against current vendor documentation for the specific product generation and firmware you are deploying.
      </Callout>

      <h3 style={S.h3}>Dell Technologies</h3>
      <ul style={S.ul}>
        <li><strong>PowerMax:</strong> High-end enterprise, NVMe-based. Mission-critical databases, mainframe, enterprise applications. FC + NVMe-oF support — verify current generation capabilities.</li>
        <li><strong>PowerStore:</strong> Mid-range to enterprise, NVMe-native. FC + iSCSI + NVMe-oF. Controller/node architecture and host-path behavior is generation and software dependent — refer to applicable PowerStore host-connectivity guide.</li>
      </ul>

      <h3 style={S.h3}>NetApp</h3>
      <ul style={S.ul}>
        <li><strong>AFF (All Flash FAS):</strong> Enterprise block + file. ONTAP OS. FC + iSCSI + NVMe-oF (protocol support varies by AFF generation — verify). Dual-controller or scale-out models.</li>
        <li><strong>ASA (All SAN Array):</strong> Block-optimized ONTAP. Current generation ASA uses symmetric active-active architecture. Exact ALUA/path behavior — verify with current NetApp ASA documentation.</li>
      </ul>

      <h3 style={S.h3}>HPE</h3>
      <ul style={S.ul}>
        <li><strong>Alletra / Primera:</strong> HPE's current enterprise SAN portfolio. Specific SAN block capabilities (Alletra 5000, 6000, 9000 series) vary by model and OS version. Current product capabilities: verify HPE documentation.</li>
      </ul>

      <h3 style={S.h3}>IBM</h3>
      <ul style={S.ul}>
        <li><strong>FlashSystem:</strong> All-flash enterprise SAN. FC + iSCSI + NVMe-oF (current generation). IBM Storage Virtualize software. Various FlashSystem models — capabilities scale with model.</li>
      </ul>

      <h3 style={S.h3}>Pure Storage</h3>
      <ul style={S.ul}>
        <li><strong>FlashArray:</strong> All-NVMe/all-flash SAN. FC + iSCSI + NVMe-oF. Exact ALUA/path behavior depends on protocol, model, and software version — consult Pure Storage host connectivity guides for specific configuration.</li>
      </ul>

      <h3 style={S.h3}>Hitachi Vantara</h3>
      <ul style={S.ul}>
        <li><strong>VSP (Virtual Storage Platform):</strong> Enterprise high-end. FC + iSCSI + NVMe (current generation). Various VSP models — capabilities by model. Current generation documentation authoritative.</li>
      </ul>

      {/* ══ SECTION 26 — PROVISIONING WORKFLOW ══════════════════════════════ */}
      <h2 id="san-provisioning" style={S.h2}>SAN Provisioning Workflow</h2>
      <CodeBlock lang="text">
{`1. REQUIREMENT
   Capacity, performance (IOPS/throughput), host OS, application,
   retention/snapshot, replication requirement

2. CAPACITY/PERFORMANCE PLANNING
   Pool availability, thin vs thick, RAID level, controller load

3. STORAGE POOL/VOLUME CREATION  [Storage Admin]
   Select/verify pool, create logical volume/LUN, size, thin/thick

4. HOST OBJECT CREATION  [Storage Admin]
   Create host record, register server HBA WWPNs (FC) or IQN (iSCSI)

5. SAN ZONING — FC ONLY  [SAN Admin]
   Fabric A: zone initiator WWPN ↔ appropriate target WWPNs
   Fabric B: zone initiator WWPN ↔ appropriate target WWPNs
   Activate zone configuration on both fabrics

6. LUN MAPPING  [Storage Admin]
   Map/mask LUN to host object

7. HOST RESCAN  [Server/VMware Admin]
   Windows: Disk Management rescan / Update-Disk
   Linux: multipath -r or SCSI host scan (environment-specific)
   VMware: Storage Adapter rescan

8. MULTIPATH VERIFICATION
   Confirm expected paths present, Active/Optimized where applicable

9. DEVICE/DISK VALIDATION
   Correct LUN size? Correct device? (VERIFY before any format)

10. FILESYSTEM/DATASTORE CREATION  [Server/VMware Admin]
    Windows: Initialize GPT, format NTFS/ReFS
    Linux: partition, filesystem (ext4/XFS)
    VMware: VMFS datastore

11. APPLICATION HANDOVER + MONITORING SETUP + DOCUMENTATION`}
      </CodeBlock>

      {/* ══ SECTION 27 — CAPACITY MANAGEMENT ═══════════════════════════════ */}
      <h2 id="san-capacity" style={S.h2}>SAN Capacity Management</h2>
      <h3 style={S.h3}>Capacity Layers — Different Views</h3>
      <CodeBlock lang="text">
{`Storage Array Pool: 100TB usable (example)
    ↓
LUN Allocated (thin): 50TB provisioned
    ↓
LUN Actually Consumed: 18TB written data (physical pool)
    ↓
Filesystem on LUN: 50TB filesystem
    ↓
Filesystem Used: 16TB
    ↓
Application view: 16TB used data`}
      </CodeBlock>
      <p style={S.p}>Each layer is a different number. Storage admin sees pool consumption. Server admin sees filesystem free space. These are different values — understand which layer you are looking at.</p>

      {/* ══ SECTION 28 — THIN PROVISIONING ═════════════════════════════════ */}
      <h2 id="thin-provisioning" style={S.h2}>Thin Provisioning</h2>
      <p style={S.p}><strong>Thick:</strong> Physical storage reserved at LUN creation. Predictable, no over-subscription risk.</p>
      <p style={S.p}><strong>Thin:</strong> Virtual size provisioned, physical allocated as data written. Better space efficiency — but over-subscription risk exists.</p>
      <h3 style={S.h3}>Over-Subscription Example</h3>
      <CodeBlock lang="text">
{`Pool: 20TB usable
Thin LUNs provisioned: 80TB total virtual
Currently consumed: 15TB (appears fine — 5TB free)

Risk: All 80TB virtual LUNs simultaneously fill → pool exhaustion
→ Write I/O fails → applications crash

Thin provisioning requires active pool monitoring.`}
      </CodeBlock>
      <Callout type="warning" title="Thin Pool Thresholds — Not Universal Numbers">
        Do not use fixed percentages (70-80%) as universal thin pool alert thresholds. Appropriate thresholds depend on: current consumption rate and growth velocity, available expansion capacity and procurement lead time, snapshot consumption, workload write patterns, vendor platform recommendations, and organizational policy. Example thresholds (e.g., 75% warning, 85% critical) are starting points — calibrate to your specific environment.
      </Callout>

      {/* ══ SECTION 29 — PERFORMANCE ════════════════════════════════════════ */}
      <h2 id="san-performance" style={S.h2}>SAN Performance</h2>
      <h3 style={S.h3}>Key Metrics</h3>
      <ul style={S.ul}>
        <li><strong>IOPS:</strong> Small random reads/writes — database workloads</li>
        <li><strong>Throughput (MB/s):</strong> Large sequential I/O — backup, analytics</li>
        <li><strong>Latency:</strong> I/O completion time. End-to-end: host + HBA + fabric + array. Modern all-flash arrays can achieve very low latency — specific numbers depend on workload characteristics, array model, cache hit rate, and configuration. Do not rely on generic latency claims.</li>
        <li><strong>Queue Depth:</strong> Outstanding I/O operations. Too low = underutilizing. Too high = potential latency.</li>
      </ul>

      <h3 style={S.h3}>Performance Bottleneck Model</h3>
      <CodeBlock lang="text">
{`Application I/O slow?
     ↓ Application-level check
     ↓ Host OS: CPU? Memory? I/O wait?
     ↓ Queue depth appropriate?
     ↓ Multipath: all paths healthy? No flapping?
     ↓ HBA: utilization? Error counters?
     ↓ Fabric: congestion? CRC errors? Link resets? BB_credit zero?
     ↓ Storage front-end: port utilization?
     ↓ Storage controller: CPU? Cache hit ratio?
     ↓ Background operations: rebuild? Replication? Tiering?
     ↓ Backend media performance characteristics`}
      </CodeBlock>

      {/* ══ SECTION 30 — MONITORING ═════════════════════════════════════════ */}
      <h2 id="san-monitoring" style={S.h2}>SAN Monitoring</h2>
      <ComparisonTable
        title="Storage Array — What to Monitor"
        headers={["Metric","What to Check"]}
        rows={[
          ["Controller health",  "All controllers/nodes active"],
          ["Pool utilization",   "Per vendor/environment thresholds — set appropriately"],
          ["LUN latency",        "Rising trend = investigate"],
          ["Cache hit ratio",    "Dropping = more backend I/O"],
          ["IOPS/throughput",    "Controller overloaded?"],
          ["Drive health",       "Predictive failures?"],
          ["Replication",        "RPO met?"],
          ["Snapshot space",     "Pool being consumed by snapshots?"],
        ]}
        caption=""
      />
      <ComparisonTable
        title="SAN Fabric (Switch) — What to Monitor"
        headers={["Metric","What to Check"]}
        rows={[
          ["Port state",         "All production ports online?"],
          ["CRC errors",         "Any = investigate (cable, SFP)"],
          ["Link resets",        "Frequent = hardware issue"],
          ["BB_Credit Zero",     "Congestion indicator"],
          ["ISL utilization",    "Congested?"],
          ["SFP power",          "TX/RX within spec?"],
        ]}
        caption=""
      />
      <ComparisonTable
        title="Host — What to Monitor"
        headers={["Metric","What to Check"]}
        rows={[
          ["HBA status",         "Both ports online?"],
          ["Path count",         "Expected paths per LUN?"],
          ["Path state",         "Active/Optimized expected paths present?"],
          ["I/O errors",         "Any errors = investigate"],
          ["Multipath device",   "Device accessible?"],
        ]}
        caption=""
      />

      {/* ══ SECTION 31 — SECURITY ═══════════════════════════════════════════ */}
      <h2 id="san-security" style={S.h2}>SAN Security</h2>
      <ul style={S.ul}>
        <li><strong>Zoning:</strong> Fabric-level communication control — first layer</li>
        <li><strong>LUN Masking:</strong> Array-level LUN visibility — configure explicitly. Do not rely on default behavior.</li>
        <li><strong>Management Security:</strong> RBAC, management VLAN, MFA where supported, least privilege, audit logs, secure protocols, change default credentials day one</li>
        <li><strong>iSCSI Security:</strong> CHAP authentication, dedicated storage VLAN, firewall rules</li>
        <li><strong>Physical:</strong> Data center physical controls, unused port security</li>
        <li><strong>Firmware:</strong> Timely patches, compatibility testing before upgrade</li>
      </ul>
      <Callout type="warning" title="Zoning Alone is NOT Complete SAN Security">
        Zoning fabric communication control karta hai. LUN masking array-side LUN visibility control karta hai. Dono required hain. Additionally: management plane security, RBAC, audit logs, firmware patches — sab layers of SAN security hain.
      </Callout>

      {/* ══ SECTION 32 — SAN HA ═════════════════════════════════════════════ */}
      <h2 id="san-ha" style={S.h2}>SAN High Availability</h2>
      <ComparisonTable
        title="NAS Resiliency Design — What Each Protects Against"
        headers={["Component","Protection Type","Protects Against"]}
        rows={[
          ["Dual controllers/nodes",           "Controller redundancy",   "Single controller/node failure"],
          ["Dual HBAs per server",             "HBA redundancy",          "Single HBA failure"],
          ["Dual SAN fabrics (A+B)",           "Fabric redundancy",       "Single fabric failure"],
          ["Redundant front-end ports (both fabrics)","Port redundancy",  "Single front-end port failure"],
          ["Redundant PSUs (array + switch)",  "Power redundancy",        "Single PSU failure"],
          ["Multipathing software",            "Path failover",           "Single path failure"],
          ["RAID/storage protection",          "Disk-level protection",   "Drive failure(s) — per RAID level"],
          ["Replication to secondary site",    "DR/site protection",      "Site failure"],
        ]}
        caption="HA hardware failures se protect karta hai. Data corruption, ransomware, human error — inke liye backups aur proper access controls required hain."
      />

      {/* ══ SECTION 33 — FAILURES ═══════════════════════════════════════════ */}
      <h2 id="san-failures" style={S.h2}>SAN Failure Scenarios — Field Guide</h2>

      <h3 style={S.h3}>Failure 1 — Single HBA Port Failure</h3>
      <p style={S.p}><strong>Symptoms:</strong> Multipath reports one path down. Applications continue (other paths active).</p>
      <p style={S.p}><strong>Action:</strong> Identify which HBA port. Check LED, cable, SFP, switch port state. Replace cable/SFP. Do NOT reboot server — multipath handling via other paths.</p>

      <h3 style={S.h3}>Failure 2 — FC Cable / SFP Failure</h3>
      <p style={S.p}><strong>Symptoms:</strong> Path down. Switch port offline. CRC errors preceding.</p>
      <p style={S.p}><strong>Action:</strong> Check SFP TX/RX power. Physical cable inspection. Try different SFP/cable. After replacement — verify port comes online, path recovers.</p>

      <h3 style={S.h3}>Failure 3 — Entire Fabric A Failure</h3>
      <p style={S.p}><strong>Symptoms:</strong> All Fabric A paths fail. Multipath routes via Fabric B. High alerts.</p>
      <p style={S.p}><strong>Action:</strong> Investigate Fabric A switch. <strong>Do NOT disturb Fabric B</strong> — it is carrying all production I/O. Work with SAN team. Avoid disruptive changes on active fabric during incident.</p>

      <h3 style={S.h3}>Failure 4 — Zoning Issue (New LUN Not Visible)</h3>
      <p style={S.p}><strong>Symptoms:</strong> New server cannot see LUN. No path appears.</p>
      <p style={S.p}><strong>Checks:</strong> Zone exists with correct initiator + target WWPNs? Zone configuration active? Both Fabric A and Fabric B zoned separately?</p>

      <h3 style={S.h3}>Failure 5 — LUN Mapping Issue</h3>
      <p style={S.p}><strong>Symptoms:</strong> Zoning correct. PLOGI succeeds. Host rescan done. No LUN.</p>
      <p style={S.p}><strong>Checks:</strong> LUN mapped to host object on array? Correct WWPN registered? Correct host type set? LUN online in array?</p>

      <h3 style={S.h3}>Failure 6 — iSCSI Connectivity Failure</h3>
      <p style={S.p}><strong>Symptoms:</strong> iSCSI paths down or unreliable.</p>
      <p style={S.p}><strong>Checks:</strong> Storage VLAN reachable? TCP 3260 reachable? iSCSI service running? VLAN config correct? MTU consistent end-to-end (use path MTU testing if jumbo frames configured)?</p>

      <h3 style={S.h3}>Failure 7 — Storage Controller Failure</h3>
      <p style={S.p}><strong>Symptoms:</strong> Array alerts. Some paths via failed controller go down. ALUA failover to surviving paths (architecture dependent).</p>
      <p style={S.p}><strong>Action:</strong> Alert OEM support. Monitor I/O via surviving paths. Plan replacement per vendor guidance. Do NOT attempt controller maintenance without vendor direction.</p>

      <h3 style={S.h3}>Failure 8 — High SAN Latency</h3>
      <p style={S.p}><strong>Investigation:</strong> Fabric congestion (BB_credit zero, CRC errors)? All paths healthy? Controller load? Background operations (rebuild, replication, tiering)? Pool near capacity? Cache hit ratio dropped?</p>

      <h3 style={S.h3}>Failure 9 — Thin Pool Near Exhaustion</h3>
      <p style={S.p}><strong>Immediate actions:</strong> Alert storage admin and management. Identify top consumers. Check snapshot consumption. Delete unnecessary data (with data owner confirmation). Emergency capacity procurement. Notify application teams.</p>

      {/* ══ SECTION 34 — TROUBLESHOOT LAYERS ═══════════════════════════════ */}
      <h2 id="san-troubleshoot-layers" style={S.h2}>SAN Troubleshooting — Layer-by-Layer</h2>
      <CodeBlock lang="text">
{`Layer 1  — Physical
  Cable plugged? LED showing? SFP seated?

Layer 2  — HBA/NIC
  HBA driver loaded? Port online? WWPN visible to OS?

Layer 3  — Fabric/Network
  FC: Port logged into fabric (FLOGI)? Fabric healthy?
  iSCSI: NIC up? IP configured? Storage VLAN reachable? Port 3260 reachable?

Layer 4  — Zoning / iSCSI Access
  FC: Zone correct? Both Fabric A AND Fabric B? Zone configuration active?
  iSCSI: Session established? IQN correct?

Layer 5  — Storage Target
  Controller healthy? Front-end ports online on both fabrics?

Layer 6  — LUN Mapping / Masking
  Host object correct? Correct WWPNs? LUN mapped? LUN online?

Layer 7  — Multipathing
  Expected paths present? All paths Active? No dead paths?

Layer 8  — OS / Hypervisor
  Disk visible in OS? Device online?

Layer 9  — Filesystem / Datastore
  Filesystem mounted? Datastore accessible?

Layer 10 — Application
  Connecting correctly? Storage-related errors?`}
      </CodeBlock>

      {/* ══ SECTION 35 — LUN NOT VISIBLE ════════════════════════════════════ */}
      <h2 id="lun-not-visible" style={S.h2}>LUN Not Visible — Troubleshooting Flow</h2>
      <Figure caption="Fig 8 — LUN not visible: systematic troubleshooting flowchart. Check HBA → FLOGI → zoning (both fabrics) → storage target → host mapping → rescan → multipath → OS device. NEVER format until correct LUN verified.">
        <SanLunNotVisible />
      </Figure>

      {/* ══ SECTION 36 — PRODUCTION INCIDENTS ══════════════════════════════ */}
      <h2 id="production-incidents" style={S.h2}>Real Production Incidents</h2>

      <h3 style={S.h3}>Scenario 1 — New LUN Not Visible to Windows Server</h3>
      <p style={S.p}><strong>Symptoms:</strong> Storage provisioned, mapped. Windows admin rescans — no new disk appears.</p>
      <p style={S.p}><strong>Investigation:</strong> Storage team: LUN created, host object, LUN mapped ✓. SAN team: Fabric A zone ✓... Fabric B — zone missing. Server HBA Port 2 → Fabric B path — no zone = no permitted communication that fabric. Fabric A zone existed but HBA Port 1 had unnoticed SFP issue. Net result: no working path to storage.</p>
      <p style={S.p}><strong>Resolution:</strong> Fix HBA Port 1 SFP, create Fabric B zone. Rescan. LUN appeared. <strong>Lesson:</strong> Both fabric zones AND all physical paths must be verified independently.</p>

      <h3 style={S.h3}>Scenario 2 — ESXi Lost One FC Path (VMs Remained Online)</h3>
      <p style={S.p}><strong>Symptoms:</strong> Monitoring alert — VMware host path alarm. One path to storage array showing dead.</p>
      <p style={S.p}><strong>Investigation:</strong> SAN switch Fabric A — specific port showing link reset count rising before going offline. SFP TX power degrading.</p>
      <p style={S.p}><strong>Resolution:</strong> SFP replaced during maintenance window. Path recovered. <strong>Lesson:</strong> VMs continued — multipathing worked correctly. SFP power monitoring would have predicted failure.</p>

      <h3 style={S.h3}>Scenario 3 — LUN Mapped to Wrong Host</h3>
      <p style={S.p}><strong>Symptoms:</strong> DB team — new disk visible on production DB server with data, but team didn&apos;t initialize it. Panic.</p>
      <p style={S.p}><strong>Investigation:</strong> Copy-paste error in storage host mapping — production LUN accidentally included in second server&apos;s host mapping. Second server saw new disk — team caught it before formatting.</p>
      <p style={S.p}><strong>Resolution:</strong> Remove wrong LUN mapping immediately. No data loss. <strong>Lesson:</strong> LUN mapping peer review mandatory. Two engineers verify host-to-LUN mappings before production deployment.</p>

      <h3 style={S.h3}>Scenario 4 — Incorrect Zoning (Production Impact)</h3>
      <p style={S.p}><strong>Symptoms:</strong> Critical database server I/O errors.</p>
      <p style={S.p}><strong>Investigation:</strong> One path down. SAN switch: "cleanup" operation accidentally deleted wrong zone entry — DB server lost Fabric A path.</p>
      <p style={S.p}><strong>Resolution:</strong> Restore zone entry, activate configuration, path recovered. <strong>Lesson:</strong> Zone changes peer reviewed. Never delete zones without verifying all members. Change management mandatory.</p>

      <h3 style={S.h3}>Scenario 5 — iSCSI Connectivity Issue Due to MTU Mismatch</h3>
      <p style={S.p}><strong>Symptoms:</strong> iSCSI sessions not establishing reliably from backup server. Small ICMP pings succeed. TCP 3260 handshake completed but iSCSI login failed or dropped.</p>
      <p style={S.p}><strong>Investigation:</strong> Storage switches configured MTU 9000 (jumbo frames). Backup server NIC MTU 1500. Path MTU testing with DF-bit set — large packets failed beyond 1472-byte payload. After TCP handshake (small SYN packets succeed), iSCSI login and data frames encountered PMTU-related issues.</p>
      <p style={S.p}><strong>Resolution:</strong> Standardized MTU across all components in path. Verified with path MTU testing before re-enabling. <strong>Lesson:</strong> TCP handshake success does not confirm large frame compatibility. MTU must be consistent end-to-end. Test with appropriate path MTU tools.</p>

      <h3 style={S.h3}>Scenario 6 — Thin Pool Near Exhaustion During Backup</h3>
      <p style={S.p}><strong>Symptoms:</strong> 3 AM monitoring alert — thin pool at 91%.</p>
      <p style={S.p}><strong>Investigation:</strong> Daily backup job started at midnight — creates snapshots. Heavy DB writes + multiple active snapshots + high delta = pool grew rapidly from 72% to 91% in 3 hours.</p>
      <p style={S.p}><strong>Action:</strong> Delete oldest snapshot tier. Pool dropped. Alert storage architect. <strong>Lesson:</strong> Thin pool sizing must account for snapshot retention AND peak change rate. Thresholds calibrated per workload.</p>

      {/* ══ SECTION 37 — DANGEROUS MISTAKES ════════════════════════════════ */}
      <h2 id="dangerous-mistakes" style={S.h2}>Dangerous SAN Mistakes</h2>
      <Callout type="danger" title="These Mistakes Have Caused Real Data Loss and Outages">
        <ul style={{ ...S.ul, marginBottom:0 }}>
          <li><strong>Formatting wrong LUN:</strong> "Disk 2" se "Disk 3" mein confusion — Disk 2 had production database. Data permanently destroyed. TRIPLE-verify before any format.</li>
          <li><strong>Non-cluster-aware LUN to multiple hosts:</strong> Two Windows servers (non-cluster) both format and mount same LUN → filesystem corruption. Only VMFS/Windows Failover Cluster/Oracle RAC can safely share raw LUNs.</li>
          <li><strong>Deleting zone in production:</strong> "Cleanup" deleted what looked like unused zone — it was critical path. Production LUN lost a fabric.</li>
          <li><strong>LUN mapping to wrong host:</strong> De-provisioning from "old server" actually removed from active production server.</li>
          <li><strong>Wrong multipath configuration:</strong> Wrong PSP on array that requires specific policy — I/O errors or poor performance.</li>
          <li><strong>Ignoring thin pool warnings:</strong> Pool hits 100% → write I/O fails → applications crash.</li>
          <li><strong>Rebooting server when one path down:</strong> Multipath handling via other path. Reboot creates unnecessary downtime — investigate first.</li>
          <li><strong>Firmware upgrade without compatibility check:</strong> HBA firmware incompatible with storage array → connectivity failures.</li>
          <li><strong>Same-switch "dual fabric":</strong> Both fabrics on same physical switch — switch failure = both "fabrics" down. True independence required.</li>
          <li><strong>Shared admin credentials:</strong> No audit trail, accountability impossible.</li>
        </ul>
      </Callout>

      {/* ══ SECTION 38 — CHANGE MANAGEMENT ══════════════════════════════════ */}
      <h2 id="change-management" style={S.h2}>SAN Change Management</h2>
      <ol style={{ ...S.ul, listStyleType:"decimal" }}>
        <li><strong>Change management ticket:</strong> Document what, why, when, impact, rollback plan</li>
        <li><strong>Maintenance window:</strong> Schedule during low-traffic period</li>
        <li><strong>Backup verification:</strong> Recent backup exists and is restorable</li>
        <li><strong>Redundancy check:</strong> Modifying a path — are other paths active and healthy?</li>
        <li><strong>Compatibility matrix check:</strong> Any firmware/driver change — HCL verified?</li>
        <li><strong>Peer review:</strong> Second SAN/storage engineer reviews the plan</li>
        <li><strong>Stakeholder communication:</strong> Application/server/DBA teams aware</li>
        <li><strong>Post-change validation:</strong> Paths healthy? LUNs accessible? Applications running?</li>
        <li><strong>Documentation update:</strong> Zone config, LUN mapping, firmware versions</li>
      </ol>

      {/* ══ SECTION 39 — FIRMWARE COMPAT ════════════════════════════════════ */}
      <h2 id="firmware-compat" style={S.h2}>Firmware and Compatibility</h2>
      <CodeBlock lang="text">
{`Full SAN interoperability chain — ALL must be compatible:

Storage Array Firmware
    ↔
FC SAN Switch Firmware (Brocade FOS / Cisco MDS NX-OS)
    ↔
HBA Firmware
    ↔
HBA Driver (OS-specific version)
    ↔
Operating System (Windows/Linux/VMware version)
    ↔
Multipath Software (MPIO/DM-Multipath/VMware NMP)
    ↔
SFP/Optic Compatibility

Where to check:
  Storage vendor HCL — which HBAs, switches, OSes tested with which array firmware
  VMware HCL — vmware.com/resources/compatibility (critical for VMware)
  HBA vendor — driver/firmware compatibility matrix per OS
  SAN switch vendor — interoperability with arrays, HBAs, optics`}
      </CodeBlock>
      <Callout type="danger" title="Never Upgrade SAN Firmware Without">
        (1) Complete interoperability matrix check for all components. (2) OEM/vendor approval or support. (3) Change management approval. (4) Maintenance window. (5) Rollback plan. (6) Non-production testing where available.
      </Callout>

      {/* ══ SECTION 40 — OEM ESCALATION ═════════════════════════════════════ */}
      <h2 id="oem-escalation" style={S.h2}>OEM Escalation — What to Collect</h2>
      <ul style={S.ul}>
        <li><strong>Array:</strong> Model, serial number, firmware version, controller status (both controllers), affected LUN ID/size, storage pool name/utilization</li>
        <li><strong>Host/HBA:</strong> Host OS and version, HBA model, firmware version, driver version, all HBA port WWPNs</li>
        <li><strong>SAN Fabric:</strong> Switch vendor/model, firmware version, port where HBA connected, zoning info, FLOGI/PLOGI state, CRC/link reset counts</li>
        <li><strong>Problem:</strong> Exact error messages/codes, timestamps, affected users/applications, recent changes before issue</li>
        <li><strong>Logs:</strong> Array event log, support bundle/diagnostic package, multipath logs (<code>multipath -ll</code>), Windows/Linux/VMware storage logs, SAN switch logs</li>
        <li><strong>Impact:</strong> I/O completely down or degraded? Business impact? Troubleshooting already performed?</li>
      </ul>

      {/* ══ SECTION 41 — O&M CHECKLIST ══════════════════════════════════════ */}
      <h2 id="san-om-checklist" style={S.h2}>SAN O&amp;M Checklist</h2>

      <h3 style={S.h3}>Daily</h3>
      <ul style={S.ul}>
        <li>Storage array alerts: Zero critical?</li>
        <li>Controller health: All controllers/nodes active?</li>
        <li>Storage pool utilization: Under organizational threshold?</li>
        <li>Fabric health: All production ports online?</li>
        <li>CRC error count: Zero or at established baseline?</li>
        <li>Multipath status on key hosts: All expected paths active?</li>
        <li>Replication/mirror jobs: Completing? RPO met?</li>
        <li>Drive health: Any predictive failures?</li>
      </ul>

      <h3 style={S.h3}>Weekly</h3>
      <ul style={S.ul}>
        <li>Pool capacity growth trend</li>
        <li>Path review on critical hosts</li>
        <li>Switch error trend (CRC, link resets increasing?)</li>
        <li>Hardware events review</li>
        <li>Replication RPO verification</li>
        <li>Performance trend review on critical LUNs</li>
      </ul>

      <h3 style={S.h3}>Monthly</h3>
      <ul style={S.ul}>
        <li>Firmware advisory review — security patches?</li>
        <li>Full capacity review and growth forecast</li>
        <li>Support case review</li>
        <li>Documentation audit — changes documented?</li>
        <li>Thin provisioning review — pools not dangerously over-committed?</li>
        <li>HCL/compatibility review — upcoming OS/VMware upgrades?</li>
      </ul>

      <h3 style={S.h3}>Quarterly / Periodic</h3>
      <ul style={S.ul}>
        <li>Failover validation — per organizational policy, change management, vendor-supported procedures. Test one fabric failover, verify applications continue.</li>
        <li>DR/replication validation test</li>
        <li>Firmware/interoperability review — all components on supported matrix?</li>
        <li>Full SAN documentation audit — topology, WWPN inventory, zoning matrix, LUN mapping</li>
        <li>Capacity planning for next 6–12 months</li>
        <li>Zoning audit — any orphaned zones for decommissioned servers?</li>
      </ul>

      {/* ══ SECTION 42 — PREVENTIVE MAINTENANCE ════════════════════════════ */}
      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>

      <h3 style={S.h3}>Physical Inspection (Site Visits)</h3>
      <ul style={S.ul}>
        <li>SAN switch LEDs — any port amber/red?</li>
        <li>HBA port LEDs on servers — link active?</li>
        <li>SFP visual check — seated, no damage</li>
        <li>Cable condition — no sharp bends, properly labeled</li>
        <li>Switch environmental: temperature, fan status, PSU LEDs</li>
      </ul>
      <Callout type="warning" title="Physical Inspection — No Unplanned Changes">
        Do not make configuration changes during physical inspection without change management approval. Do not reseat SFPs or cables on production paths without understanding impact.
      </Callout>

      <h3 style={S.h3}>Never Without Change Management</h3>
      <ul style={S.ul}>
        <li>Modify or activate zone configurations</li>
        <li>Change LUN mapping on production hosts</li>
        <li>Apply firmware updates</li>
        <li>Reseat or replace SFPs on production ports</li>
        <li>Restart storage services</li>
      </ul>

      {/* ══ SECTION 43 — SAN DOCUMENTATION ══════════════════════════════════ */}
      <h2 id="san-documentation" style={S.h2}>SAN Documentation</h2>
      <p style={S.p}>Undocumented SAN = troubleshooting nightmare. Maintain:</p>
      <ul style={S.ul}>
        <li>SAN topology diagram — Fabric A/B, switch ports, server HBAs, storage ports</li>
        <li>WWPN inventory — server name, HBA model, port number, WWPN</li>
        <li>Zoning matrix — which zone contains which WWPNs, on which fabric, zone configuration name</li>
        <li>Host-to-LUN mapping — host object, LUNs mapped, LUN ID, size, application</li>
        <li>Storage pool/LUN inventory — pool name, size, RAID type, LUNs, consumers</li>
        <li>Switch port mapping — switch name, port number, connected device</li>
        <li>Firmware versions — array, switch, HBA, driver (all components)</li>
        <li>iSCSI details: IQNs, portals, VLANs, MTU configuration</li>
        <li>Escalation contacts — storage vendor support, SAN vendor support</li>
        <li>Change history — all changes with dates, engineers, outcomes</li>
      </ul>

      {/* ══ SECTION 44 — SAN MIGRATION ══════════════════════════════════════ */}
      <h2 id="san-migration" style={S.h2}>SAN Migration</h2>
      <p style={S.p}><strong>Migration types:</strong></p>
      <ul style={S.ul}>
        <li><strong>Host-based:</strong> Host reads source, writes target. Flexible but impacts host I/O.</li>
        <li><strong>Storage array-based:</strong> Array-native migration tools — many vendors provide live migration capabilities within or between arrays. Specific mechanism is vendor and product dependent.</li>
        <li><strong>Replication-based:</strong> Replicate to target, cutover when synced.</li>
        <li><strong>VMware Storage vMotion:</strong> VMs migrate between datastores online — no downtime.</li>
      </ul>
      <p style={S.p}><strong>Migration planning — critical items:</strong></p>
      <ul style={S.ul}>
        <li>WWPN zoning — may need reconfiguration for new array target ports (new WWPNs)</li>
        <li>LUN masking — new host objects on new array</li>
        <li>Multipath update — new array ALUA characteristics, possible PSP change</li>
        <li>Application quiesce for final data sync</li>
        <li>Data integrity validation — checksums/record counts</li>
        <li>Rollback plan — can we revert to source if migration fails?</li>
        <li>Firmware compatibility — host HBAs/drivers compatible with new array</li>
        <li>HCL verification for new array + existing HBA/OS/switch combination</li>
      </ul>

      {/* ══ SECTION 45 — INTERVIEW ══════════════════════════════════════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview / Job Knowledge</h2>

      <h3 style={S.h3}>Q: SAN kya hai aur NAS se kaise alag hai?</h3>
      <p style={S.p}><strong>Answer:</strong> SAN (Storage Area Network) ek dedicated storage network hai jo servers ko block-level storage (LUN) provide karta hai — server raw disk dekhta hai, khud filesystem banata hai. NAS file-level storage hai — NAS pe filesystem, client files/folders access karta hai (SMB/NFS). SAN databases, VMware, mission-critical applications ke liye. NAS file sharing aur backup ke liye.</p>

      <h3 style={S.h3}>Q: LUN kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Logical Unit Number — storage array mein logical block storage unit. Physical disk nahi — storage pool/RAID ke upar software-defined logical volume. Host is LUN ko raw block device ki tarah dekhta hai. Host ka OS ya application uske upar filesystem create karta hai. Ek storage pool se multiple LUNs create ho sakti hain.</p>

      <h3 style={S.h3}>Q: WWPN kya hai? WWPN aur WWNN mein fark?</h3>
      <p style={S.p}><strong>Answer:</strong> WWPN = World Wide Port Name — HBA ke specific port ka globally unique 8-byte identifier. Zoning aur LUN masking mein WWPN use hota hai. WWNN = World Wide Node Name — HBA device/card ka identifier. Dual-port HBA: ek WWNN, do WWPNs. Zoning mein WWPN use karo — WWNN nahi.</p>

      <h3 style={S.h3}>Q: Zoning kya hai? LUN Masking kya hai? Dono mein fark?</h3>
      <p style={S.p}><strong>Answer:</strong> Zoning: FC switch fabric level pe — which initiator WWPN can communicate with which target WWPN (per fabric platform's implementation). LUN masking: storage array level pe — which host can see which LUN. Zoning fabric communication control. Masking storage access control. Dono alag layers, dono required.</p>

      <h3 style={S.h3}>Q: Multipathing kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Server ke multiple HBA ports se multiple physical paths — same LUN tak through dual fabrics and dual storage controllers. MPIO (Windows), DM-Multipath (Linux), VMware NMP — OS level pe multiple paths ko ek single device mein aggregate karta hai. Ek path fail → automatically doosre path se I/O. Multipathing RAID nahi hai; storage controller HA nahi hai — host-side path management hai.</p>

      <h3 style={S.h3}>Q: Fabric A aur Fabric B kyun?</h3>
      <p style={S.p}><strong>Answer:</strong> Mission-critical FC SAN designs commonly two independent fabrics use karte hain. Ek fabric ko single failure domain eliminate karna — ek switch fail → doosra fabric carries all I/O. Both fabrics should have separate switches, cables, and storage controller front-end ports. True independence = true HA.</p>

      <h3 style={S.h3}>Q: Ek SAN switch fail ho toh kya hoga?</h3>
      <p style={S.p}><strong>Answer:</strong> Correctly configured dual-fabric mein: affected fabric ke sab paths fail hote hain. Multipath software automatically I/O doosri fabric se route karta hai. Applications continue — performance reduced agar load-balanced tha. High alert volume. Do NOT disturb surviving fabric. Investigate failed switch. No server reboot needed.</p>

      <h3 style={S.h3}>Q: FC aur iSCSI mein difference?</h3>
      <p style={S.p}><strong>Answer:</strong> FC: dedicated FC hardware (HBA, FC switches, SFP), WWPN-based identity, credit-based flow control fabric. iSCSI: SCSI over TCP/IP, Ethernet infrastructure, IQN-based identity, TCP port 3260. FC purpose-built storage fabric. iSCSI lower cost, IP networking skills. Both provide block-level LUN access. Performance depends on infrastructure aur workload — not protocol alone.</p>

      <h3 style={S.h3}>Q: IQN kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> iSCSI Qualified Name — iSCSI mein unique identifier for initiator or target. Format: <code>iqn.YYYY-MM.reverse-domain:identifier</code>. FC mein WWPN ka equivalent.</p>

      <h3 style={S.h3}>Q: iSCSI standard port?</h3>
      <p style={S.p}><strong>Answer:</strong> TCP 3260 (standard iSCSI target port). Complete iSCSI environments may have additional dependencies (CHAP ports, management, etc.) — verify with storage vendor documentation.</p>

      <h3 style={S.h3}>Q: ALUA kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Asymmetric Logical Unit Access — T10 SCSI standard. Storage array host ko Target Port Groups (TPGs) ke baare mein information provide karta hai — kaun sa TPG Active/Optimized (preferred, lower latency) hai aur kaun sa Active/Non-Optimized. Host multipath software ALUA information se optimized paths prefer karta hai. Behavior architecture-dependent — some arrays active-active (all paths optimized), others use ALUA asymmetrically. Vendor, protocol, model, software-version dependent.</p>

      <h3 style={S.h3}>Q: Thin provisioning kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> LUN ka virtual size provision karna — physical storage only as data is written consumed. Better space efficiency lekin over-subscription risk. Pool monitoring mandatory. Pool exhaustion = write failure = application crash.</p>

      <h3 style={S.h3}>Q: New LUN visible nahi hai — kya check karoge?</h3>
      <p style={S.p}><strong>Answer:</strong> Layer-by-layer: HBA port online → FLOGI fabric mein → zoning correct both fabrics → storage target port online → host object correct, WWPN registered → LUN mapped, LUN online → host rescan → multipath check → OS device visible.</p>

      <h3 style={S.h3}>Q: Same LUN ko do independent hosts pe present kyun nahi karna chahiye?</h3>
      <p style={S.p}><strong>Answer:</strong> Non-cluster-aware software ke saath do independent Windows/Linux servers ek raw LUN simultaneously mount/write karein → filesystem corruption/data loss. Sirf cluster-aware software (VMware VMFS, Windows Failover Cluster, Oracle RAC) shared raw LUN safely use kar sakta hai.</p>

      {/* ══ SECTION 46 — KEY TAKEAWAYS ══════════════════════════════════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li><strong>SAN = Storage Area Network</strong> — dedicated block-level storage network. Server raw LUN dekhta hai, khud filesystem banata hai.</li>
        <li><strong>LUN physical disk nahi hai</strong> — storage pool se carved-out logical block storage unit.</li>
        <li><strong>Zoning (fabric) + LUN Masking (storage)</strong> — dono alag layers, dono required. Zoning alone is not complete security.</li>
        <li><strong>WWPN</strong> — HBA port identity. Zoning aur masking mein WWPN use karo — WWNN nahi.</li>
        <li><strong>Dual Fabric:</strong> Mission-critical FC SAN commonly uses Fabric A + Fabric B as independent failure domains. Both controllers have ports on both fabrics.</li>
        <li><strong>ALUA (TPGs):</strong> Storage communicates Active/Optimized vs Non-Optimized path states via Target Port Groups. Architecture, vendor, model aur software-version dependent. Some arrays active-active (all paths optimized).</li>
        <li><strong>Multipathing</strong> — host-side path management. NOT storage HA, NOT RAID. MPIO/DM-Multipath/VMware NMP.</li>
        <li><strong>Windows MPIO:</strong> MSDSM built-in for ALUA arrays. Vendor DSM optional where provided/recommended.</li>
        <li><strong>VMware PSP:</strong> SATP/PSP defaults depend on device rules, ESXi version, vendor HCL. Verify before production.</li>
        <li><strong>iSCSI Jumbo Frames:</strong> Optional. End-to-end MTU consistency required if enabled. MTU mismatch = fragmentation/PMTU issues.</li>
        <li><strong>FC speed compatibility:</strong> Verify all components (HBA, switch, storage) against interoperability/HCL matrix.</li>
        <li><strong>Thin provisioning requires monitoring</strong> — pool exhaustion = write failure. Thresholds calibrated per environment.</li>
        <li><strong>Performance:</strong> No universal latency guarantees. Depends on workload, array model, cache, configuration.</li>
        <li><strong>Never format SAN LUN</strong> without triple-verification. Wrong LUN format = permanent data loss.</li>
        <li><strong>Firmware interoperability critical</strong> — all components on tested/supported combination.</li>
        <li><strong>Layer-by-layer troubleshooting</strong> — physical → HBA → fabric → zoning → storage → mapping → multipath → OS → filesystem → application.</li>
        <li><strong>Documentation mandatory</strong> — SAN topology, WWPN inventory, zoning matrix, LUN mapping, firmware versions.</li>
      </ul>

      {/* ══ FAQ ══════════════════════════════════════════════════════════════ */}
      <h2 style={{ ...S.h2, marginTop:"3rem" }}>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom:"1.5rem", paddingBottom:"1.5rem", borderBottom: i < faqs.length-1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight:700, marginBottom:"0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom:0 }}>{item.a}</p>
        </div>
      ))}

      {/* ══ RELATED ══════════════════════════════════════════════════════════ */}
      <h2 style={{ ...S.h2, marginTop:"3rem" }}>Related Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="nas" variant="inline" /> — Network Attached Storage — file-level storage. NAS padho SAN se pehle agar beginner ho.</li>
        <li><TopicLink slug="das" variant="inline" /> — Direct Attached Storage — block-level, single host. SAN ka simpler predecessor concept.</li>
        <li><TopicLink slug="backup" variant="inline" /> — Backup strategies — SAN storage ka data protect karna.</li>
        <li><TopicLink slug="server-basics" variant="inline" /> — Server hardware — HBAs, PCIe slots, SAN connectivity foundation.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — VMware — SAN shared datastores ka primary consumer.</li>
      </ul>
    </>
  );
}
