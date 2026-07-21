"use client";

import { S, Callout, ComparisonTable, Figure, CodeBlock } from "../shared";
import TopicLink from "@/components/TopicLink";
import NasDasComparison from "../svg/NasDasComparison";
import NasRequestFlow from "../svg/NasRequestFlow";
import NasHardwareArch from "../svg/NasHardwareArch";
import NasHaArchitecture from "../svg/NasHaArchitecture";
import NasSmbNfsFlow from "../svg/NasSmbNfsFlow";
import NasManagementUI from "../svg/NasManagementUI";
import NasTroubleshootFlow from "../svg/NasTroubleshootFlow";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      {/* ── Quick Summary ─────────────────────────────────────────────────── */}
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — NAS in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>NAS kya hai:</strong> Network Attached Storage — ek dedicated storage device jo Ethernet network pe connected hoti hai aur multiple servers aur clients ko simultaneously file-level storage provide karti hai.</li>
          <li><strong>Golden rule:</strong> Agar storage kisi host se directly attached hai aur general-purpose network file sharing nahi karta — typically DAS pattern hai. Agar storage network pe hai aur multiple systems file-level access karte hain — NAS hai.</li>
          <li><strong>File-level storage:</strong> NAS files aur folders share karti hai — underlying storage pool ke upar ek specialized file system hoti hai. Clients SMB/NFS protocol se files access karte hain; underlying NAS filesystem clients ko directly nahi dikhta.</li>
          <li><strong>Protocols:</strong> Windows clients SMB use karte hain (Port 445). Linux/Unix clients NFS use karte hain (Port 2049 primarily). Dono simultaneously ek NAS pe possible hain — lekin multiprotocol datasets ke liye careful identity mapping aur permission design required hai.</li>
          <li><strong>Data Center use:</strong> Shared file storage, backup targets, log servers, home directories, application data — jahan multiple servers ya users same files access karein.</li>
          <li><strong>Primary advantage:</strong> Multiple systems ek NAS simultaneously access kar sakte hain — DAS se fundamental fark.</li>
          <li><strong>Engineer daily kaam:</strong> Health aur capacity monitoring, drive health, share accessibility, replication/backup status, alert handling.</li>
          <li><strong>Most common beginner mistake:</strong> Ping se NAS service status judge karna — ping work karna aur SMB/NFS work karna alag-alag cheezein hain.</li>
          <li><strong>Snapshot ≠ Backup:</strong> NAS snapshot data protection tool hai; independent backup, preferably offsite/isolated, alag se required hai.</li>
        </ul>
      </div>

      {/* ══ SECTION 1 — DEFINITION ══════════════════════════════════════════ */}
      <h2 id="nas-kya-hai" style={S.h2}>NAS Kya Hai — Definition aur Full Form</h2>
      <p style={S.p}><strong>NAS = Network Attached Storage</strong></p>
      <p style={S.p}>NAS ek dedicated storage device hai jo directly Ethernet network se connected hoti hai. Servers, computers aur clients is device se network ke through files access karte hain.</p>
      <p style={S.p}><strong>Simple definition:</strong> Ek storage box jo network pe rakha hai. Koi bhi network pe connected system is box se files read aur write kar sakta hai — ek saath, simultaneously.</p>
      <p style={S.p}><strong>Technical definition:</strong> NAS ek dedicated storage appliance hai jo ek specialized operating system run karta hai, Ethernet network interfaces rakhta hai, aur file-level storage protocols (primarily SMB aur NFS) expose karta hai — multiple concurrent clients ko shared storage provide karne ke liye.</p>

      <h3 style={S.h3}>NAS Kyun Banaya Gaya</h3>
      <p style={S.p}>A general-purpose file server can also provide shared file storage, but NAS is a purpose-built storage platform that integrates centralized file services, storage management, redundancy, snapshots and replication into a specialized appliance/platform.</p>
      <p style={S.p}>Data centers mein yeh need exponentially badi ho jaati hai — hundreds of servers, thousands of users, petabytes of shared data. NAS is need ko dedicated, optimized hardware aur software se address karta hai.</p>

      {/* ══ SECTION 2 — DAS vs NAS ══════════════════════════════════════════ */}
      <h2 id="das-vs-nas" style={S.h2}>DAS vs NAS — Fundamental Difference</h2>
      <p style={S.p}>Ye confusion bahut common hai. Ek baar clearly samjho:</p>
      <CodeBlock lang="text">
{`Typical DAS (Direct Attached Storage):
Server ←——— Physical Cable ——→ Storage
(Directly attached to host — does not provide
general-purpose network file sharing)

NAS (Network Attached Storage):
Server A ←——┐
Server B ←——┤
Server C ←——┤——→ Ethernet Switch ——→ NAS
Laptop D ←——┘
(ALL of them access it simultaneously over network)`}
      </CodeBlock>
      <Callout type="important" title="DAS — Important Nuance">
        Typical DAS ek single host se directly connected hoti hai aur general-purpose network sharing provide nahi karta. Specialized designs (jaise shared-SAS clusters ya cluster-aware configurations) do ya zyada nodes ke beech shared disk access allow kar sakte hain — lekin yeh general NAS file sharing nahi hai aur platform-specific complexity rakhta hai. Block storage DAS topology ya SAN — dono se provide ho sakti hai.
      </Callout>

      <Figure caption="Fig 1 — DAS vs NAS data path comparison. DAS: direct cable to host, no general-purpose network sharing. NAS: multiple clients simultaneously via Ethernet. Both data paths shown side-by-side.">
        <NasDasComparison />
      </Figure>

      {/* ══ SECTION 3 — NAS vs External HDD ════════════════════════════════ */}
      <h2 id="nas-vs-external-hdd" style={S.h2}>NAS vs Normal External Hard Disk</h2>
      <p style={S.p}>Ghar pe use hone wali external hard disk aur NAS alag hain:</p>
      <ComparisonTable
        title="External Hard Disk vs NAS"
        headers={["Parameter", "External Hard Disk", "NAS"]}
        rows={[
          ["Connection",          "USB — one device at a time",       "Ethernet — multiple clients simultaneously"],
          ["Access",              "One person at a time",              "Multiple users concurrently"],
          ["Underlying file system","FAT32 / NTFS / exFAT",          "ZFS, WAFL, Btrfs, vendor-specific distributed filesystems*"],
          ["OS",                  "None",                              "Specialized NAS OS (ONTAP, OneFS, DSM, etc.)"],
          ["Redundancy",          "Usually none",                     "RAID standard"],
          ["Management",          "Drag-and-drop only",               "Web GUI, CLI, API"],
          ["Scale",               "Single drive",                     "Multiple drives, shelves, petabytes"],
          ["Data center use",     "Not suitable",                     "Standard"],
        ]}
        caption="*SMB/NFS clients do not directly see the underlying NAS filesystem — they use standard file operations. NAS filesystem is an internal implementation detail."
      />

      {/* ══ SECTION 4 — NAS vs SAN ══════════════════════════════════════════ */}
      <h2 id="nas-vs-san" style={S.h2}>NAS vs SAN — Brief Introduction</h2>
      <p style={S.p}>Ye dono alag hain. SAN ka dedicated chapter aayega — yahan sirf context ke liye:</p>
      <ComparisonTable
        title="NAS vs SAN — Overview"
        headers={["", "NAS", "SAN"]}
        rows={[
          ["Access type",  "File-level",                  "Block-level"],
          ["Protocol",     "SMB, NFS",                   "Fibre Channel, iSCSI"],
          ["Client sees",  "Files aur folders",           "Raw disk/LUN"],
          ["Network",      "Standard Ethernet",           "Dedicated FC network ya iSCSI"],
          ["Typical use",  "Shared files, backups",      "Databases, VMware shared datastores"],
        ]}
        caption="Block-level storage can be provided via local/direct-attached disks (DAS topology) or SAN-provided LUNs. DAS describes attachment topology, not access type. SAN chapter: coming soon."
      />
      <p style={S.p}><strong>Simple rule:</strong> NAS = files share karna. SAN = raw disk share karna. NAS easier hai use karne mein. SAN higher performance aur control deta hai database-type workloads ke liye.</p>

      {/* ══ SECTION 5 — NAS vs Cloud ════════════════════════════════════════ */}
      <h2 id="nas-vs-cloud" style={S.h2}>NAS vs Cloud Storage</h2>
      <p style={S.p}><strong>Cloud storage</strong> (Google Drive, S3, Azure Blob) internet pe storage hai — typically object storage, HTTP/HTTPS protocols.</p>
      <p style={S.p}><strong>NAS</strong> on-premise network pe hai — file protocols (SMB/NFS), low latency, private network. Data centers mein dono use hote hain alag purposes ke liye.</p>

      {/* ══ SECTION 6 — FILE-LEVEL STORAGE ═════════════════════════════════ */}
      <h2 id="file-level-storage" style={S.h2}>File-Level Storage Kya Hota Hai</h2>
      <p style={S.p}>Storage world mein teen main access types hain:</p>
      <ul style={S.ul}>
        <li><strong>Block storage:</strong> Raw disk blocks — OS ya application filesystem decide karta hai kaise use karna. Provided by local/direct-attached disks (DAS topology) ya SAN over network.</li>
        <li><strong>File storage (NAS):</strong> Files aur folders directly. NAS pe hi file system hoti hai. Client simply file open karta hai jaise local file hoti.</li>
        <li><strong>Object storage (Cloud, Ceph):</strong> Data objects as key-value pairs. HTTP se access. Unstructured data, backups, media ke liye.</li>
      </ul>
      <p style={S.p}>NAS file-level storage hai — client ko raw blocks nahi milte, seedhi files milti hain. Yahi NAS ka simplicity advantage hai aur yahi iska constraint bhi hai.</p>

      {/* ══ SECTION 7 — HOW NAS WORKS ══════════════════════════════════════ */}
      <h2 id="how-nas-works" style={S.h2}>How NAS Works — Complete Data Path</h2>
      <p style={S.p}>Jab ek Windows user <code>\\nas01\engineering</code> se ek file open karta hai, yeh sab hota hai:</p>
      <CodeBlock lang="text">
{`User double-clicks file in Windows Explorer
              ↓
Windows OS checks: local file or network path?
              ↓
UNC path identified: \\nas01\engineering
              ↓
DNS resolution: nas01 → IP address (e.g. 10.10.20.50)
              ↓
SMB client initiates TCP connection — Port 445
              ↓
SMB session established — authentication happens
              ↓
SMB: "open file X in share 'engineering'"
              ↓
NIC → Ethernet cable → Switch → NAS NIC
              ↓
NAS OS processes request — authenticated? Permissions OK?
              ↓
NAS file system locates file on storage pool
              ↓
Storage pool → RAID → Physical drives → data read
              ↓
Data returned via SMB response
              ↓
Network → Switch → Client NIC
              ↓
Application opens file`}
      </CodeBlock>
      <p style={S.p}>Linux path (<code>/mnt/nas</code>) mein NFS protocol use hota hai — same concept, different protocol.</p>

      <Figure caption="Fig 2 — NAS file access: complete request and response flow. Every numbered layer must succeed. Authentication, permissions and network path — all checked before data is returned.">
        <NasRequestFlow />
      </Figure>

      {/* ══ SECTION 8 — NAS HARDWARE ARCHITECTURE ══════════════════════════ */}
      <h2 id="nas-architecture" style={S.h2}>NAS Architecture — Hardware Components</h2>
      <p style={S.p}>Enterprise NAS ek complex appliance hai. Samjhte hain kya hota hai andar:</p>

      <h3 style={S.h3}>NAS Controller (Head Unit)</h3>
      <p style={S.p}>NAS ka "brain." Ek ya do controllers hote hain (redundancy ke liye). Controller ke andar:</p>
      <ul style={S.ul}>
        <li><strong>CPU:</strong> NAS OS run karta hai, SMB/NFS requests process karta hai, RAID calculations, deduplication/compression (agar enabled).</li>
        <li><strong>Memory (RAM):</strong> Read cache — frequently accessed data RAM mein rakho. Write cache — incoming writes buffer. Zyada RAM = better NAS performance generally.</li>
        <li><strong>Cache (NVRAM / SSD-based):</strong> Dedicated non-volatile write cache — power failure pe bhi cached data safe rehta hai. Regular RAM volatile hota hai.</li>
        <li><strong>Network Interfaces (NICs):</strong> Typically 10GbE, 25GbE, ya 100GbE enterprise mein. Redundant ports standard.</li>
        <li><strong>Management Interface:</strong> Separate port — management network ke liye. Production data traffic aur management traffic separate rakhna best practice hai.</li>
        <li><strong>Storage Controllers:</strong> Internal storage connections manage karte hain — drives aur disk shelves ke saath.</li>
      </ul>

      <h3 style={S.h3}>Storage Shelves (Disk Enclosures)</h3>
      <p style={S.p}>Controller ke saath additional storage attach karte hain. Large enterprise NAS mein multiple shelves hoti hain.</p>
      <ComparisonTable
        title="Drive Types in NAS"
        headers={["Type", "Interface", "Typical Use"]}
        rows={[
          ["SAS HDD",  "SAS",   "Enterprise reliability, high capacity — bulk storage, archival"],
          ["SATA HDD", "SATA",  "Lower cost, high capacity — SMB NAS, backup targets"],
          ["SAS SSD",  "SAS",   "Performance tier — frequently accessed data"],
          ["NVMe SSD", "PCIe",  "Highest performance — all-flash NAS, caching tier"],
        ]}
        caption="Tiering: some enterprise NAS platforms automatically migrate hot data to NVMe/SSD and cold data to HDD."
      />

      <h3 style={S.h3}>Power Supplies aur Cooling</h3>
      <p style={S.p}>Redundant PSUs standard in enterprise NAS — ek fail ho toh NAS chalta rahe. Hot-swappable typically. Redundant fans aur temperature monitoring — storage hardware heat-sensitive hai.</p>

      <Figure caption="Fig 3 — Enterprise NAS hardware internal architecture. Controller box: CPU, RAM, NVRAM cache, data NICs (data network), management port, storage controller, redundant PSUs. Disk shelves with hot-swap drives connect via storage controller.">
        <NasHardwareArch />
      </Figure>

      {/* ══ SECTION 9 — TYPES OF NAS ════════════════════════════════════════ */}
      <h2 id="types-of-nas" style={S.h2}>Types of NAS</h2>

      <h3 style={S.h3}>Desktop / Small Business NAS</h3>
      <p style={S.p}>Synology, QNAP, WD My Cloud — 2 to 8 drives. Ghar, small office, lab environment. Consumer ya prosumer grade. <strong>Use case:</strong> Home media server, small team file sharing, developer lab, learning environment.</p>

      <h3 style={S.h3}>Rackmount NAS</h3>
      <p style={S.p}>Rack-mounted unit — more drives, better redundancy, higher throughput. <strong>Use case:</strong> Small to medium enterprise file storage, backup targets, test environments.</p>

      <h3 style={S.h3}>Enterprise NAS — Scale-Up</h3>
      <p style={S.p}>NetApp AFF/FAS aur other dual-controller enterprise NAS platforms — purpose-built enterprise. Redundant controllers, large drive counts, advanced OS features, enterprise support. Scale-up = ek controller pair mein capacity badhao (more drives, additional shelves).</p>
      <p style={S.p}><strong>Use case:</strong> Enterprise file servers, corporate home directories, large collaborative workloads, backup infrastructure.</p>

      <h3 style={S.h3}>Scale-Out NAS (Clustered NAS)</h3>
      <p style={S.p}>Multiple nodes form a cluster — aggregate storage aur performance. <strong>Dell PowerScale (OneFS)</strong> is the dominant example. PowerScale ek distributed multi-node architecture use karta hai — scale-up dual-controller/shared-shelf design se fundamentally alag hai. OneFS ek distributed filesystem hai jo PowerScale scale-out storage platform mein integrated hai.</p>
      <p style={S.p}><strong>Use case:</strong> Media and entertainment (video production), large HPC environments, massive unstructured data — petabyte scale.</p>

      <h3 style={S.h3}>Unified Storage</h3>
      <p style={S.p}>Single platform that serves both NAS (file) aur SAN (block) protocols. Dell PowerStore, NetApp AFF/FAS — ye dono NAS aur SAN simultaneously serve kar sakte hain.</p>

      <h3 style={S.h3}>NAS Gateway</h3>
      <p style={S.p}>Controller only — apni drives nahi hoti. SAN storage ke upar file services present karta hai. Organizations jo already SAN mein invested hain unke liye.</p>

      <h3 style={S.h3}>Synology / QNAP — Positioning Note</h3>
      <p style={S.p}>Synology aur QNAP widely used hain SMB, departmental, backup aur lab environments mein. Suitability for enterprise production depends on specific model, HA capability, support SLA, workload aur organizational requirements — universally "non-enterprise" classify karna appropriate nahi.</p>

      {/* ══ SECTION 10 — ENTERPRISE NAS ARCHITECTURE ════════════════════════ */}
      <h2 id="enterprise-nas-arch" style={S.h2}>Enterprise NAS Architecture — Data Center Deployment</h2>
      <p style={S.p}>Realistic enterprise scale-up NAS deployment (dual-controller design):</p>
      <CodeBlock lang="text">
{`Servers / Client Workstations
         ↓
Access Layer Switches (ToR)
         ↓
Aggregation / Core Switches
         ↓
     ┌───┴───┐
Switch A  Switch B   (Redundant switches)
   ↓           ↓
NIC A1      NIC B1   } Controller A
NIC A2      NIC B2   }
   ↓           ↓
NIC A3      NIC B3   } Controller B
NIC A4      NIC B4   }
         ↓
    Storage Pool
         ↓
   Disk Shelf 1 ... Shelf N`}
      </CodeBlock>
      <p style={S.p}>Ek switch fail → traffic automatically second switch se. Ek NIC fail → partner NIC takes over. Ek controller fail → second controller serves all clients. Single drive fail → RAID protects data.</p>

      <Figure caption="Fig 4 — Generic Dual-Controller Scale-Up NAS Architecture. Note: Scale-out NAS platforms such as Dell PowerScale use a different distributed multi-node architecture — not this shared-shelf design.">
        <NasHaArchitecture />
      </Figure>

      {/* ══ SECTION 11 — NAS NETWORKING ════════════════════════════════════ */}
      <h2 id="nas-networking" style={S.h2}>NAS Networking — Practical Concepts</h2>

      <h3 style={S.h3}>IP Address aur Hostname</h3>
      <p style={S.p}>Har NAS data interface ek IP address rakhta hai. Clients is IP se connect karte hain. Hostname (jaise <code>nas01</code>) DNS se IP mein resolve hota hai.</p>
      <Callout type="important" title="Hostname aur Failover — Platform-Dependent">
        Enterprise NAS platforms virtual IPs (VIPs), logical interfaces, floating addresses, cluster namespaces ya DNS aliases use kar sakti hain — depending on platform architecture. Simple hostname-to-IP mapping alone failover cases mein automatically work nahi karta. Apne NAS platform ki documentation check karo ki failover pe client connectivity kaise handle hoti hai.
      </Callout>

      <h3 style={S.h3}>Management IP vs Data IP</h3>
      <ul style={S.ul}>
        <li><strong>Management IP:</strong> Admin GUI aur CLI ke liye. Management network pe. Production traffic se isolated.</li>
        <li><strong>Data IP (Logical Interface / SVM IP):</strong> Clients is IP se file access karte hain. Storage/data network pe.</li>
      </ul>
      <p style={S.p}><strong>Best Practice:</strong> Inhe alag networks pe rakho. Management network compromise hoti hai toh data network affected na ho.</p>

      <h3 style={S.h3}>NIC, Bonding aur Link Redundancy</h3>
      <p style={S.p}><strong>Bonding / Teaming:</strong> Multiple physical NICs ko ek logical interface mein combine karna — redundancy aur optionally bandwidth aggregation ke liye.</p>
      <p style={S.p}><strong>LACP (IEEE 802.3ad):</strong> Ek common link aggregation approach — switch aur NAS ke beech dynamically links negotiate karta hai. Switch side bhi LACP configured hona chahiye. Lekin NAS platform depending on, redundancy/performance link aggregation ke bajaye failover groups, virtual/logical interfaces, SMB Multichannel, clustering ya vendor-specific networking mechanisms se bhi achieve ho sakti hai.</p>
      <Callout type="maintenance" title="LACP Bandwidth Note">
        Single large file transfer typically ek link pe hi jaati hai — LACP aggregation multiple concurrent connections se benefit karta hai. Actual bandwidth improvement depends on traffic pattern aur switch implementation.
      </Callout>

      <h3 style={S.h3}>SMB Multichannel</h3>
      <p style={S.p}>SMB 3.x feature — <strong>alag concept from LACP.</strong> Jab client aur NAS dono support karte hain, SMB Multichannel multiple network connections simultaneously use kar sakta hai ek session ke liye — better throughput aur resilience.</p>
      <p style={S.p}>Windows clients modern SMB Multichannel automatically negotiate kar sakte hain agar multiple NICs available hain. Actual support aur behavior NAS platform aur OS configuration pe depend karta hai — vendor documentation verify karo.</p>

      <h3 style={S.h3}>VLAN</h3>
      <p style={S.p}>NAS storage traffic typically dedicated VLAN pe hoti hai — server management, application, aur user workstation traffic se separated. <strong>Client aur NAS same VLAN ya routed path pe honi chahiye — wrong VLAN = connectivity failure.</strong></p>

      <h3 style={S.h3}>Jumbo Frames (MTU)</h3>
      <p style={S.p}>Standard Ethernet MTU = 1500 bytes. Jumbo Frames typically ~9000-byte MTU range (exact value vendor/device dependent — universally 9000 nahi).</p>
      <Callout type="warning" title="Jumbo Frames — End-to-End Consistency Mandatory">
        MTU mismatch se fragmentation ho sakti hai (jahan permitted ho), packet drops, ya Path-MTU-related connectivity aur performance problems. NAS interface, switch ports aur client NICs — sab same MTU configured honi chahiye. Many enterprise environments standard MTU 1500 pe perfectly well run karte hain.
      </Callout>

      <h3 style={S.h3}>DNS aur Reverse DNS</h3>
      <p style={S.p}><strong>DNS:</strong> NAS hostname A record DNS mein register hona chahiye. Clients same DNS server use karein.</p>
      <p style={S.p}><strong>Reverse DNS (PTR record):</strong> Universal NFS requirement nahi hai. Specific Kerberos configurations, security policies, logging ya vendor-specific implementations mein PTR records needed ho sakte hain — generic NFS access ke liye generally required nahi.</p>

      <h3 style={S.h3}>NTP</h3>
      <p style={S.p}><strong>NTP mandatory for AD/Kerberos environments:</strong> Microsoft AD mein default maximum clock skew approximately five minutes hota hai (policy se change ho sakta hai). Agar NAS ka time AD se zyada alag ho — Kerberos authentication fail ho sakta hai. Simple fix: NTP configure karo day one.</p>

      {/* ══ SECTION 12 — NAS PROTOCOLS ═════════════════════════════════════ */}
      <h2 id="nas-protocols" style={S.h2}>NAS Protocols — SMB aur NFS</h2>

      <h3 style={S.h3}>SMB — Server Message Block</h3>
      <p style={S.p}><strong>Kya hai:</strong> Windows file sharing protocol. Jab Windows machine ek network drive access karta hai — SMB use ho raha hota hai mostly. <strong>Port:</strong> TCP 445.</p>
      <ComparisonTable
        title="SMB Versions"
        headers={["Version", "When", "Notes"]}
        rows={[
          ["SMB 1.0 / CIFS era", "Legacy",             "Serious security vulnerabilities. Disable in modern production."],
          ["SMB 2.0",            "Windows Vista/2008", "Significant improvements, fewer round-trips"],
          ["SMB 2.1",            "Windows 7/2008 R2",  "Minor improvements"],
          ["SMB 3.0",            "Windows 8/2012",     "Encryption, Multichannel"],
          ["SMB 3.1.1",          "Windows 10/2016+",   "Latest dialect — negotiated between client and server"],
        ]}
        caption="SMB dialect automatically negotiated between client and server — highest mutually supported version used. SMB 1.0 disable karo everywhere in modern production."
      />
      <p style={S.p}><strong>CIFS terminology:</strong> CIFS (Common Internet File System) generally SMB 1.0 era ka implementation/dialect refer karta hai. Modern SMB 2.x/3.x ko CIFS nahi kehna chahiye technically — legacy NAS interfaces mein "CIFS" label purani terminology ki wajah se dikhta hai.</p>
      <Callout type="warning" title="SMB 1.0 — Disable in Modern Environments">
        SMB 1.0 serious security vulnerabilities rakhta hai (EternalBlue, WannaCry). Unavoidable legacy dependencies: isolate, document, compensating controls lagao, migration plan banao.
      </Callout>

      <h3 style={S.h3}>NFS — Network File System</h3>
      <p style={S.p}><strong>Kya hai:</strong> Unix/Linux file sharing protocol. <strong>Primary port:</strong> TCP 2049.</p>
      <ComparisonTable
        title="NFS Versions"
        headers={["Version", "Common Use", "Port/Notes"]}
        rows={[
          ["NFSv3", "Still widely deployed", "TCP/UDP 2049 + rpcbind/portmapper TCP/UDP 111 + dynamic RPC ports (mountd, locking, stat). Complex firewalling."],
          ["NFSv4", "Modern standard",       "Primarily TCP 2049. Stateful, TCP only. Kerberos, DNS, identity services may need additional connectivity."],
          ["NFSv4.1","Enterprise",           "Parallel NFS (pNFS), better HA — additional vendor-specific requirements may apply."],
          ["NFSv4.2","Newer deployments",    "Server-side copy, sparse files."],
        ]}
        caption="NFSv3: TCP 2049 reachable alone does not prove complete NFSv3 functionality — portmapper + dynamic RPC ports also involved. Always verify exact requirements with NAS vendor documentation."
      />

      <h3 style={S.h3}>NFS Authorization — Two Distinct Layers</h3>
      <p style={S.p}><strong>Export authorization:</strong> Which client machine (IP address / subnet) is permitted to mount an export. This is the first gate.</p>
      <p style={S.p}><strong>File authorization:</strong> Once mounted, individual file/directory access UID (User ID) aur GID (Group ID) se control hoti hai, POSIX permission bits aur ACLs se. Linux user ka UID NAS pe same UID ke permissions se match karna chahiye.</p>
      <p style={S.p}><strong>NFSv4 aur Kerberos:</strong> NFSv4 automatically Kerberos use nahi karta. NFSv4 either AUTH_SYS (traditional UID/GID, no user authentication) ya Kerberos use kar sakta hai — configuration pe depend karta hai.</p>
      <ComparisonTable
        title="NFS Kerberos Security Flavors"
        headers={["Flavor", "Provides"]}
        rows={[
          ["krb5",   "Authentication only — identity verified"],
          ["krb5i",  "Authentication + integrity — data tampering detect"],
          ["krb5p",  "Authentication + integrity + privacy (encryption of data in transit)"],
        ]}
        caption="NFSv4 + krb5p strongest security — configuration aur performance overhead consider karo."
      />

      <h3 style={S.h3}>Multiprotocol SMB + NFS — Warning</h3>
      <Callout type="danger" title="Multiprotocol Access — Design Required, Not Optional">
        NAS ek saath SMB aur NFS expose kar sakta hai — same underlying storage. Lekin dono protocols ke through same dataset access karna — bina proper configuration ke — risky hai. Issues: Windows SID aur Unix UID/GID mismatch, ACL translation problems, security style (NTFS vs Unix), name mapping. NAS vendor documentation specifically for multiprotocol configuration follow karo. Ye "just enable both" situation nahi hai.
      </Callout>

      <Figure caption="Fig 5 — SMB vs NFS access flow. Windows: TCP 445, Kerberos/NTLM authentication. Linux: TCP 2049, export authorization + AUTH_SYS or Kerberos. Both access same NAS storage — multiprotocol requires identity mapping design.">
        <NasSmbNfsFlow />
      </Figure>

      {/* ══ SECTION 13 — SHARES AND EXPORTS ════════════════════════════════ */}
      <h2 id="nas-shares-exports" style={S.h2}>NAS Shares aur Exports — Practical</h2>

      <h3 style={S.h3}>SMB Share (Windows)</h3>
      <p style={S.p}><strong>UNC Path format:</strong> <code>{"\\\\server-name\\share-name"}</code></p>
      <p style={S.p}>Examples:</p>
      <CodeBlock lang="text">
{"\\\\nas01\\engineering    — server nas01, share: engineering\n\\\\10.10.20.50\\backup   — IP-direct (hostname bypass)\n\\\\nas01\\finance        — finance department share\n\\\\nas01\\home\\[username]  — per-user home directory"}
      </CodeBlock>
      <p style={S.p}><strong>Permissions — two layers both must be correct:</strong></p>
      <ul style={S.ul}>
        <li><strong>Share-level permissions:</strong> Who can connect to the share.</li>
        <li><strong>NTFS-style permissions (folder level):</strong> Who can do what inside the share.</li>
      </ul>

      <h3 style={S.h3}>NFS Export (Linux)</h3>
      <p style={S.p}><strong>Export example on NAS (illustrative):</strong> <code>{"/vol/engineering → allowed to 10.10.20.0/24"}</code></p>
      <p style={S.p}><strong>Note:</strong> NFSv4 pe actual export paths aur namespace/pseudoroot NAS/vendor configuration pe depend karte hain. Ye examples illustrative hain.</p>
      <CodeBlock label="Linux — NFS mount" lang="bash">
{`# NFSv4 mount (modern, recommended where supported)
sudo mount -t nfs4 nas01:/vol/engineering /mnt/engineering

# With version option (illustrative — verify for your environment)
sudo mount -t nfs -o vers=4.1,hard nas01:/vol/engineering /mnt/engineering`}
      </CodeBlock>
      <CodeBlock label="/etc/fstab — persistent NFS mount" lang="bash">
{`nas01:/vol/engineering  /mnt/engineering  nfs  defaults,_netdev,nofail  0  0
# _netdev: wait for network before mounting
# nofail: don't fail boot if mount fails
# Add vers=4.1 or other options as required by your environment`}
      </CodeBlock>
      <Callout type="warning" title="NFS Mount Options — Environment-Specific">
        <code>intr</code>/<code>nointr</code> legacy options hain — modern Linux NFS clients pe obsolete ya ignored. <code>sync</code> mount option significant performance impact introduce karta hai — workload aur vendor recommendations check karo. Mount options apne Linux distribution aur NAS vendor documentation se verify karo.
      </Callout>

      {/* ══ SECTION 14 — NAS SOFTWARE / OS ═════════════════════════════════ */}
      <h2 id="nas-software-os" style={S.h2}>NAS Software / Operating System</h2>
      <p style={S.p}>Enterprise NAS sirf hardware nahi hai — specialized OS run karta hai.</p>

      <h3 style={S.h3}>Enterprise NAS Platforms</h3>
      <p style={S.p}><strong>NetApp ONTAP:</strong> Industry-leading NAS/unified storage OS. NFS, SMB, iSCSI, FC support. Built-in: SnapShot, SnapMirror replication, deduplication, compression, FabricPool cloud tiering. Runs on NetApp AFF/FAS hardware aur ONTAP Select (software-defined).</p>
      <p style={S.p}><strong>Dell PowerScale (OneFS):</strong> Scale-out NAS dominant platform. Multiple nodes ek single namespace present karte hain. OneFS ek distributed filesystem hai jo PowerScale scale-out storage platform mein integrated hai — ye ZFS, WAFL ya Btrfs jaise per-node filesystems se architecturally alag hai. Petabyte scale common.</p>
      <p style={S.p}><strong>TrueNAS (SCALE / CORE):</strong> Open-source NAS OS. TrueNAS CORE: FreeBSD + ZFS. TrueNAS SCALE: Linux + ZFS. Small-to-medium deployments, labs. ZFS powerful — snapshots, deduplication, checksums. iXsystems commercial support available.</p>
      <p style={S.p}><strong>Synology DSM / QNAP QTS:</strong> Widely used in SMB, departmental, backup aur lab environments. Enterprise production suitability specific model, HA capability, support SLA, workload aur organizational requirements pe depend karti hai.</p>
      <p style={S.p}><strong>HPE Storage Platforms:</strong> HPE mein file storage capabilities product family aur generation ke hisaab se vary karti hain. Current HPE file/NAS capabilities ke liye HPE ki official documentation check karo.</p>
      <Callout type="important" title="Products Evolve — Verify With Vendor">
        NAS capabilities across vendors significantly differ in features, scale limits, performance aur licensing. Always verify current capabilities with vendor documentation.
      </Callout>

      <ComparisonTable
        title="SMB/Lab NAS vs Enterprise NAS"
        headers={["", "SMB/Lab NAS", "Enterprise NAS"]}
        rows={[
          ["Scale",          "TBs to low PBs",              "PBs+"],
          ["Concurrent clients","Tens to hundreds",          "Thousands"],
          ["Controllers",    "Varies by model",             "Redundant, scale-out"],
          ["Support",        "Varies — community to commercial","24×7 enterprise SLAs"],
          ["Cost",           "Low to medium",               "High"],
          ["DC suitability", "Lab/dev/SMB/departmental",   "Large production Data Center"],
        ]}
        caption=""
      />

      {/* ══ SECTION 15 — MANAGEMENT INTERFACE ══════════════════════════════ */}
      <h2 id="nas-management" style={S.h2}>NAS Management Interface</h2>
      <p style={S.p}>NAS typically multiple ways se manage hoti hai:</p>

      <h3 style={S.h3}>Web GUI — Primary Interface</h3>
      <p style={S.p}>Typical sections engineer sees: Dashboard, Storage (pools/volumes), Shares, NFS Exports, Network, Sessions, Protocols, Users, Quotas, Snapshots, Replication, Logs, Firmware.</p>

      <Figure caption="Fig 6 — Generic Educational NAS Management Interface (NOT an OEM screenshot). Dashboard shows: health status, capacity donut, active SMB/NFS sessions, replication status, active alerts, recent events.">
        <NasManagementUI />
      </Figure>

      <h3 style={S.h3}>CLI / SSH</h3>
      <ul style={S.ul}>
        <li><strong>NetApp ONTAP:</strong> <code>system node</code>, <code>volume</code>, <code>vserver</code> (SVM) commands</li>
        <li><strong>Dell PowerScale (OneFS):</strong> <code>isi</code> suite — <code>isi storagepool</code>, <code>isi smb shares</code>, <code>isi nfs exports</code></li>
        <li><strong>TrueNAS:</strong> Shell access, <code>midclt</code> commands</li>
        <li><strong>Synology:</strong> SSH available, standard Linux + custom commands</li>
      </ul>

      <h3 style={S.h3}>REST API</h3>
      <p style={S.p}>Modern enterprise NAS REST APIs expose karte hain — ONTAP REST API, OneFS REST API. Monitoring tools, ITSM systems, custom automation scripts integrate kar sakte hain.</p>

      {/* ══ SECTION 16 — QUOTAS ═════════════════════════════════════════════ */}
      <h2 id="nas-quotas" style={S.h2}>Quotas</h2>
      <p style={S.p}>Kuch NAS platforms quota management support karte hain:</p>
      <ul style={S.ul}>
        <li><strong>User quota:</strong> Individual user kitna space use kar sakta hai</li>
        <li><strong>Group quota:</strong> AD/LDAP group ka collective limit</li>
        <li><strong>Directory/tree quota:</strong> Specific folder tree ka space limit (platform-dependent)</li>
        <li><strong>Soft limit:</strong> Warning generate — access immediately block nahi hota (grace period)</li>
        <li><strong>Hard limit:</strong> Limit exceed hone pe writes block</li>
      </ul>
      <Callout type="important" title="Quota ≠ Physical Pool Free Space">
        Ek user ka quota 500GB ho sakta hai lekin pool 100GB free ho — actual writes 100GB pe cap honge. Dono dekhna zaroori hai.
      </Callout>

      {/* ══ SECTION 17 — FILE LOCKING ═══════════════════════════════════════ */}
      <h2 id="file-locking" style={S.h2}>File Locking / Open Files</h2>
      <p style={S.p}>Shared storage pe multiple users same file simultaneously access kar sakte hain — file locking is situation manage karta hai.</p>
      <p style={S.p}><strong>SMB Leases / Opportunistic Locking (Oplocks):</strong> SMB protocol clients ko locally cache karne deta hai file data — performance improve hoti hai. When another client accesses same file, NAS lease break karta hai — first client cached data flush karta hai.</p>
      <p style={S.p}><strong>NFS locking:</strong> NFSv4 integrated locking. NFSv3 mein NLM (Network Lock Manager) separate service.</p>
      <Callout type="danger" title="Active Sessions / Open Files — Never Force-Close Without Impact Assessment">
        Kabhi bhi active sessions ya open files force-close mat karo bina impact assessment ke. User koi file actively write kar raha hai aur session force-close ho — data corruption possible hai.
      </Callout>

      {/* ══ SECTION 18 — NAMESPACE ══════════════════════════════════════════ */}
      <h2 id="nas-namespace" style={S.h2}>Namespace</h2>
      <p style={S.p}>Enterprise environments mein users directly physical NAS controller hostname se connect nahi karte — ek logical namespace se connect karte hain.</p>
      <p style={S.p}><strong>Example:</strong> <code>{"\\\\files.company.local\\engineering"}</code> — yeh ek logical name hai, actual physical controller nahi. Namespace DFS (Windows Distributed File System), NAS platform cluster namespace, ya DNS alias se serve ho sakta hai.</p>
      <p style={S.p}><strong>Benefit:</strong> Physical NAS replace ya migrate karo — client namespace change nahi hota. Engineers migrate karte hain backend, clients same path use karte rehte hain.</p>

      {/* ══ SECTION 19 — CONFIG WORKFLOW ════════════════════════════════════ */}
      <h2 id="nas-config-workflow" style={S.h2}>NAS Configuration — Practical Workflow</h2>
      <p style={S.p}>High-level workflow jab ek new NAS deploy hoti hai. Exact steps OEM aur model pe vary karte hain.</p>
      <ol style={{ ...S.ul, listStyleType: "decimal" }}>
        <li><strong>Physical readiness:</strong> Rack mounting, dual PSUs → separate PDU A/B, physical cabling.</li>
        <li><strong>Initial management access:</strong> Management IP configure, Web GUI access verify.</li>
        <li><strong>Hostname, DNS, NTP:</strong> Hostname set, DNS servers configure, NTP configure (AD mein critical), timezone set.</li>
        <li><strong>Network interface configuration:</strong> Data IPs, subnet, gateway. Link redundancy — bonding, LACP, failover groups as appropriate. VLANs. MTU settings.</li>
        <li><strong>Storage pool creation:</strong> Disk discovery → RAID level → pool create → initialization complete hone do.</li>
        <li><strong>Volume / Filesystem creation:</strong> Size, thin/thick provisioning, filesystem type.</li>
        <li><strong>Protocol configuration:</strong> SMB service enable. NFS service enable. Multiprotocol use karo toh identity mapping plan karo.</li>
        <li><strong>Authentication integration (AD):</strong> Domain join, DNS aur AD records resolvable, time sync verify.</li>
        <li><strong>Share/Export creation:</strong> SMB share — path, name, permissions. NFS export — path, allowed clients, options.</li>
        <li><strong>Permission configuration:</strong> Share-level + folder-level. Test user se verify.</li>
        <li><strong>Client access testing:</strong> Windows: UNC path. Linux: mount. Read, write, delete — sab test.</li>
        <li><strong>Performance baseline:</strong> fio (Linux), DiskSPD (Windows), NAS built-in stats.</li>
        <li><strong>Monitoring setup:</strong> Email alerts, SNMP, capacity thresholds.</li>
        <li><strong>Snapshot schedule:</strong> Automated schedule + retention policy.</li>
        <li><strong>Backup/replication setup:</strong> Backup software + replication job (agar DR required).</li>
        <li><strong>Documentation:</strong> IPs, share paths, VLAN, RAID config, permissions matrix.</li>
        <li><strong>Production handover:</strong> Change ticket close, monitoring confirmed, stakeholders notified.</li>
      </ol>

      {/* ══ SECTION 20 — WINDOWS PRACTICAL ════════════════════════════════ */}
      <h2 id="windows-nas-practical" style={S.h2}>Windows + NAS — Practical Access</h2>

      <h3 style={S.h3}>UNC Path Se Access</h3>
      <CodeBlock lang="text">
{`\\nas01\engineering         — Windows Explorer direct
\\nas01\finance             — Finance share

Map Network Drive:
  Path: \\nas01\engineering
  Option: "Reconnect at sign-in"`}
      </CodeBlock>

      <h3 style={S.h3}>PowerShell Diagnostic Commands</h3>
      <CodeBlock label="Hostname resolution" lang="powershell">
{`nslookup nas01
# Expected: NAS data IP address
# Fail: DNS issue — NAS hostname not registered or wrong DNS server`}
      </CodeBlock>
      <CodeBlock label="Ping — ICMP test (caveats apply)" lang="powershell">
{`ping nas01
# Tests: Network reachability + ICMP response
# IMPORTANT: Ping success ≠ SMB working. Ping failure ≠ NAS down.
# ICMP may be disabled on NAS. Always verify at protocol level too.`}
      </CodeBlock>
      <CodeBlock label="SMB port test — recommended" lang="powershell">
{`Test-NetConnection nas01 -Port 445
# TcpTestSucceeded: True  = Port 445 reachable, SMB listening
# TcpTestSucceeded: False = Port blocked or SMB service down`}
      </CodeBlock>
      <CodeBlock label="NFS port test" lang="powershell">
{`Test-NetConnection nas01 -Port 2049
# Tests: TCP 2049 for NFS`}
      </CodeBlock>
      <CodeBlock label="Network drives" lang="powershell">
{`net use                              # List current mapped drives + status
net use Z: \\nas01\engineering /persistent:yes   # Map Z: drive
net use Z: /delete                   # Disconnect`}
      </CodeBlock>
      <Callout type="maintenance" title="Get-SmbSession / Get-SmbShare — Local Windows Server Commands">
        <code>Get-SmbSession</code> aur <code>Get-SmbShare</code> Windows Server pe local SMB server sessions/shares show karte hain. Generic NAS (NetApp, PowerScale, Synology) ke sessions/shares inse query nahi hote — us NAS platform ka apna management tool use karo.
      </Callout>
      <Callout type="best-practice" title="Telnet vs Test-NetConnection">
        Modern Windows mein Telnet client disabled by default. <code>Test-NetConnection</code> PowerShell 3.0+ mein built-in hai — port testing ke liye preferred method.
      </Callout>

      {/* ══ SECTION 21 — LINUX PRACTICAL ════════════════════════════════════ */}
      <h2 id="linux-nas-practical" style={S.h2}>Linux + NAS — Practical Commands</h2>

      <h3 style={S.h3}>NFS Mount Commands</h3>
      <CodeBlock label="Manual NFS mount" lang="bash">
{`# NFSv4 (modern, recommended where supported)
sudo mount -t nfs4 nas01:/vol/engineering /mnt/engineering

# With version option (verify for your environment + distro)
sudo mount -t nfs -o vers=4.1,hard nas01:/vol/engineering /mnt/engineering

# Note: Mount paths for NFSv4 depend on NAS vendor configuration.
# These examples are illustrative — verify with your NAS documentation.`}
      </CodeBlock>
      <CodeBlock label="/etc/fstab — persistent mount" lang="bash">
{`nas01:/vol/engineering  /mnt/engineering  nfs  defaults,_netdev,nofail  0  0
# _netdev: wait for network before mounting
# nofail: don't fail boot if this mount fails`}
      </CodeBlock>

      <h3 style={S.h3}>Diagnostic Commands</h3>
      <CodeBlock label="DNS resolution" lang="bash">
{`nslookup nas01
dig nas01 A
# Expected: NAS data IP`}
      </CodeBlock>
      <CodeBlock label="NFS port check" lang="bash">
{`nc -zv nas01 2049
# Tests TCP 2049 reachability
# Note: Port reachable ≠ complete NFSv3 functionality (portmapper + dynamic ports also needed)`}
      </CodeBlock>
      <CodeBlock label="Show NFS exports (NFSv3 environments)" lang="bash">
{`showmount -e nas01
# Relies on RPC mount services — primarily useful for NFSv3-style environments
# May not enumerate or work as expected against NFSv4-only servers`}
      </CodeBlock>
      <CodeBlock label="Mounted filesystems + routing" lang="bash">
{`df -h                  # All filesystems and usage
mount | grep nas01     # Current NAS mounts
ip addr show           # Network interfaces and IPs
ip route show          # Routing table — route to NAS subnet?`}
      </CodeBlock>
      <CodeBlock label="Active NFS connections" lang="bash">
{`ss -tn | grep 2049     # Active TCP connections to NFS port`}
      </CodeBlock>
      <CodeBlock label="Unmount — identify busy processes" lang="bash">
{`sudo umount /mnt/engineering

# If "device is busy":
fuser -vm /mnt/engineering     # Efficient — identify processes using mount
# lsof +D /mnt/engineering     # Warning: recursively scans directory tree
                                # Expensive on large NAS mounts — use fuser first`}
      </CodeBlock>

      {/* ══ SECTION 22 — PING, PORT, CONNECTIVITY ══════════════════════════ */}
      <h2 id="ping-port-connectivity" style={S.h2}>Ping, Port aur Connectivity — Key Concepts</h2>

      <h3 style={S.h3}>Ping Kya Test Karta Hai</h3>
      <p style={S.p}>Ping ICMP use karta hai — "are you alive?" jaisi check.</p>
      <ul style={S.ul}>
        <li><strong>Ping success matlab:</strong> Network path exists + NAS network stack respond + ICMP enabled</li>
        <li><strong>Ping success matlab NAHI:</strong> SMB/NFS running, authentication working, shares accessible</li>
        <li><strong>Ping fail matlab:</strong> NAS down ya network issue — ya sirf ICMP disabled on NAS (security)</li>
      </ul>
      <Callout type="common-mistake" title="Real Incident — Ping Misleads">
        Client <code>ping nas01</code> karta hai — timeout. "NAS down hai!" Actually ICMP disabled tha NAS pe. <code>Test-NetConnection nas01 -Port 445</code> kiya — TcpTestSucceeded: True. NAS bilkul theek thi.
      </Callout>

      <h3 style={S.h3}>Troubleshooting Layer Model</h3>
      <CodeBlock lang="text">
{`Layer 1: Can client reach NAS IP? (ping / traceroute)
    ↓ Yes →
Layer 2: Can client reach NAS protocol port? (Test-NetConnection / nc)
    ↓ Yes →
Layer 3: Can client authenticate? (test user connection)
    ↓ Yes →
Layer 4: Does the share/export exist and is it accessible?
    ↓ Yes →
Layer 5: Does the user have correct permissions?`}
      </CodeBlock>

      {/* ══ SECTION 23 — AUTH + PERMISSIONS ════════════════════════════════ */}
      <h2 id="auth-permissions" style={S.h2}>Authentication aur Permissions</h2>

      <h3 style={S.h3}>Authentication — Tum Kaun Ho?</h3>
      <ul style={S.ul}>
        <li><strong>Local users:</strong> NAS pe directly create — simple environments. Enterprise mein generally avoided.</li>
        <li><strong>Active Directory:</strong> Enterprise standard. NAS domain join karta hai. Single sign-on.</li>
        <li><strong>LDAP:</strong> Linux/Unix environments mein centralized user directory.</li>
        <li><strong>NFS AUTH_SYS:</strong> IP-based export control + UID/GID. No cryptographic user verification.</li>
        <li><strong>NFS + Kerberos:</strong> Proper user authentication. NFSv4 automatically Kerberos use nahi karta — configuration required.</li>
      </ul>
      <Callout type="important" title="AD Integration — Multiple Ports Required">
        AD integration ke liye multiple ports involved hain — DNS (53), Kerberos (88), LDAP (389), LDAPS (636), NTP (123), SMB (445), Global Catalog (3268/3269), aur possibly RPC/dynamic ports. Apne NAS vendor ki official AD integration port matrix use karo.
      </Callout>

      <h3 style={S.h3}>Permissions — Tum Kya Kar Sakte Ho?</h3>
      <p style={S.p}><strong>SMB — two layers (both must be correct):</strong></p>
      <ul style={S.ul}>
        <li><strong>Share-level:</strong> Who can connect to the share</li>
        <li><strong>Folder/NTFS-level:</strong> Who can do what inside the share</li>
      </ul>
      <p style={S.p}><strong>NFS — two layers:</strong></p>
      <ul style={S.ul}>
        <li><strong>Export rules:</strong> Client IP/subnet allowed?</li>
        <li><strong>POSIX permissions:</strong> UID/GID matching between NAS and client</li>
      </ul>

      <h3 style={S.h3}>Common Permission Problem</h3>
      <CodeBlock lang="text">
{`Symptoms:
- NAS reachable (ping OK)
- Port accessible (Test-NetConnection OK)
- Share exists, user can see it
- But: Access Denied when opening/writing files

Root causes (SMB):
1. Share permission: User not in allowed list
2. NTFS permission: User/group missing or wrong permissions
3. User not in correct AD group
4. Inherited Deny overriding Allow

Check sequence:
1. Share permissions → is user allowed?
2. Effective permissions on specific folder
3. AD group membership — user in correct group?
4. Any explicit Deny in chain?`}
      </CodeBlock>

      {/* ══ SECTION 24 — NAS SECURITY ═══════════════════════════════════════ */}
      <h2 id="nas-security" style={S.h2}>NAS Security</h2>

      <h3 style={S.h3}>Management Network Separation</h3>
      <p style={S.p}><strong>Recommended Best Practice:</strong> NAS management interface dedicated management VLAN pe — production data network se isolated.</p>

      <h3 style={S.h3}>Authentication Security</h3>
      <ul style={S.ul}>
        <li>Disable default/factory admin credentials on day 1</li>
        <li>Strong passwords — MFA/PAM where supported</li>
        <li>Role-based access — least privilege principle</li>
        <li>Avoid shared admin accounts</li>
      </ul>

      <h3 style={S.h3}>Protocol Security</h3>
      <p style={S.p}><strong>Disable SMB 1.0:</strong> Strong recommendation — all modern environments. Legacy dependencies: isolate, document, compensating controls, migration plan.</p>
      <p style={S.p}><strong>SMB Signing:</strong> Message integrity aur authenticity provide karta hai — data tampering aur certain man-in-the-middle attacks se protect karta hai. Recommended.</p>
      <p style={S.p}><strong>SMB Encryption:</strong> SMB 3.0+ mein available — data in transit encrypt karta hai. Processing overhead introduce kar sakta hai — actual impact SMB version, CPU capabilities, hardware offload, NAS platform aur workload pe depend karta hai.</p>
      <p style={S.p}><strong>NFSv4 with Kerberos:</strong> AUTH_SYS se better security. krb5p option data in transit encrypt karta hai.</p>

      <h3 style={S.h3}>Ransomware Considerations</h3>
      <p style={S.p}>NAS shared storage hai — ek infected client NAS files rapidly encrypt kar sakta hai.</p>
      <ul style={S.ul}>
        <li><strong>Snapshots:</strong> Client-side ransomware normally read-only snapshot contents directly modify nahi kar sakta. Lekin attacker administrative/API access gain kar le — snapshots delete karna possible. <strong>Immutable/locked snapshots</strong> (where supported) extra protection dete hain.</li>
        <li><strong>Independent backup:</strong> Independent backup, preferably offsite/isolated, strongly recommended per organizational policy — strongest when isolated, immutable/offline and independently protected.</li>
        <li><strong>Network segmentation:</strong> NAS sirf required subnets ko accessible hona chahiye</li>
        <li><strong>Least privilege:</strong> Users ko sirf necessary folders write access</li>
      </ul>

      <h3 style={S.h3}>Audit Logging</h3>
      <p style={S.p}>File access logging, failed auth attempts, admin activity logs. <strong>Warning:</strong> File-level audit logging very high log volume generate karta hai — storage aur performance impact plan karo.</p>

      {/* ══ SECTION 25 — HIGH AVAILABILITY ═════════════════════════════════ */}
      <h2 id="high-availability" style={S.h2}>High Availability (HA)</h2>

      <h3 style={S.h3}>Dual Controllers</h3>
      <p style={S.p}>Enterprise NAS mein typically two controllers. <strong>Active-Active:</strong> Dono simultaneously serve, load distribute. <strong>Active-Passive:</strong> Primary serves, secondary standby, failover pe takeover. Exact behavior OEM aur configuration pe depend karta hai.</p>

      <h3 style={S.h3}>NAS Resiliency Design — Protection Map</h3>
      <ComparisonTable
        title="What the Overall NAS Resiliency Design Protects Against"
        headers={["Component", "Protection Type", "Protects Against"]}
        rows={[
          ["Controller HA (dual controllers)",           "Controller redundancy", "Single controller failure"],
          ["Network redundancy (bonded NICs/failover)",  "Link/NIC redundancy",  "Single NIC or cable failure"],
          ["Network/fabric redundancy (dual switches)", "Switch redundancy",     "Single switch failure"],
          ["Power redundancy (redundant PSUs)",          "Power redundancy",      "Single PSU failure"],
          ["RAID / erasure coding",                      "Disk-level protection", "Drive failure(s) — per RAID level"],
          ["Replication / DR",                           "Site/disaster protection","Site failure, major disaster"],
          ["Snapshots + Backup",                         "Data protection",       "Accidental deletion, corruption"],
        ]}
        caption="HA hardware failures se protect karta hai. Data corruption, ransomware, site failure — inke liye snapshots + independent backup required hain."
      />

      <h3 style={S.h3}>Failover Testing</h3>
      <p style={S.p}>HA/failover testing should be performed periodically according to organizational policy, change management and vendor-supported procedures. Vendor-supported planned takeover procedure use karo — production controller deliberately break karna risky approach hai. Verify: client access continuous raha? Alerts generated? Failback works? Document karo.</p>

      {/* ══ SECTION 26 — SNAPSHOTS ══════════════════════════════════════════ */}
      <h2 id="snapshots" style={S.h2}>Snapshots</h2>

      <h3 style={S.h3}>Snapshot Kya Hai</h3>
      <p style={S.p}>Snapshot ek point-in-time copy hai — NAS ke ek specific moment ka state capture karta hai. Implementation filesystem/vendor dependent hai — platforms copy-on-write, redirect-on-write, metadata/pointer techniques ya other mechanisms use kar sakte hain.</p>
      <p style={S.p}><strong>Space efficiency:</strong> Many modern NAS snapshot implementations space-efficient hain aur initially relatively little additional capacity consume karte hain — exact behavior filesystem/platform dependent hai.</p>

      <h3 style={S.h3}>Snapshot vs Backup — Critical Difference</h3>
      <ComparisonTable
        title="Snapshot vs Backup"
        headers={["", "Snapshot", "Backup"]}
        rows={[
          ["Location",                         "Same NAS storage",    "Different location (tape, another NAS, cloud)"],
          ["Protection against hardware failure","No — NAS fails = snapshot gone","Yes"],
          ["Protection against ransomware",     "Limited; immutable/locked snapshots improve protection","Stronger when isolated, immutable/offline and independently protected"],
          ["Recovery speed",                    "Very fast",           "Slower"],
          ["Retention",                         "Limited (storage grows with changes)","Long-term"],
          ["Independent copy",                  "No",                  "Yes"],
        ]}
        caption="Snapshot is NOT a backup. 3-2-1 principle (3 copies, 2 different media, 1 offsite) is a recommended data-protection strategy."
      />
      <Callout type="danger" title="Snapshot ≠ Backup">
        Snapshot same hardware pe hai. NAS storage fail ho — snapshot bhi gone. Independent backup, preferably with an offsite/isolated copy, is strongly recommended according to organizational backup and DR policy.
      </Callout>

      <h3 style={S.h3}>Snapshot Retention Planning</h3>
      <p style={S.p}>Example schedule: Hourly (last 24h), Daily (last 7 days), Weekly (last 4 weeks), Monthly (last 6–12 months). Old snapshots automatically delete karo — "forever retain" space exhaust kar sakta hai.</p>

      {/* ══ SECTION 27 — BACKUP & REPLICATION ══════════════════════════════ */}
      <h2 id="backup-replication" style={S.h2}>Backup aur Replication</h2>

      <h3 style={S.h3}>NAS Backup Approaches</h3>
      <ul style={S.ul}>
        <li><strong>Agent-based backup:</strong> Backup software (Veeam, Commvault, NetBackup) agent se files backup.</li>
        <li><strong>NDMP (Network Data Management Protocol):</strong> Long-established protocol — supported by many enterprise NAS platforms aur backup software. NAS directly backup device se communicate karta hai, data server pe route nahi hota. Modern NAS backup architectures may also use native snapshots, vendor APIs, replication, file-based backup ya object-storage integration — NDMP ek option hai.</li>
        <li><strong>Snapshot-based backup:</strong> Snapshots create karo, snapshot data backup system ko export karo.</li>
      </ul>

      <h3 style={S.h3}>NAS-to-NAS Replication</h3>
      <p style={S.p}>Primary NAS → Secondary NAS (DR site). Examples: NetApp SnapMirror, OneFS SyncIQ, TrueNAS ZFS Replication.</p>
      <p style={S.p}><strong>RPO:</strong> Replication frequency se determine. <strong>RTO:</strong> Failover process se determine.</p>

      {/* ══ SECTION 28 — CAPACITY MANAGEMENT ═══════════════════════════════ */}
      <h2 id="capacity-management" style={S.h2}>Capacity Management</h2>

      <h3 style={S.h3}>Capacity Calculations</h3>
      <p style={S.p}><strong>Conceptual example:</strong> 24 × 4TB = 96TB raw. RAID 6 (2 parity drives) = 22 × 4TB = 88TB after RAID. Actual usable capacity RAID group/layout, distributed spare capacity, system reserve, metadata, vendor implementation aur TB vs TiB reporting pe depend karta hai.</p>
      <p style={S.p}><strong>Snapshot consumption:</strong> Changes ke saath snapshots space consume karte hain same pool se. <strong>Thin provisioning:</strong> Over-provisioning risk — total allocated &gt; physical available.</p>

      <h3 style={S.h3}>Why Low Free Space is Dangerous</h3>
      <ul style={S.ul}>
        <li>Write operations fail — applications get I/O errors</li>
        <li>NAS performance degrade ho sakti hai — thresholds aur behavior platform/filesystem dependent</li>
        <li>Snapshots new changes capture nahi kar paayenge</li>
        <li>NAS OS operations affected ho sakte hain</li>
      </ul>
      <Callout type="warning" title="Capacity Thresholds — Per Vendor Recommendations aur Policy">
        Example operational thresholds: ~80% → Warning, ~90% → Critical. Actual thresholds vendor recommendations, snapshot reserve requirements, workload behavior aur organizational policy se set karo.
      </Callout>

      {/* ══ SECTION 29 — PERFORMANCE ════════════════════════════════════════ */}
      <h2 id="performance" style={S.h2}>Performance</h2>

      <h3 style={S.h3}>Key Metrics</h3>
      <ul style={S.ul}>
        <li><strong>IOPS:</strong> Input/Output Operations Per Second — small random reads/writes, database workloads</li>
        <li><strong>Throughput (MB/s):</strong> Large sequential reads/writes, media streaming</li>
        <li><strong>Latency (ms):</strong> Operation completion time — lower is better</li>
        <li><strong>Metadata latency:</strong> File creates, deletes, directory listings — critical for small file workloads</li>
      </ul>

      <h3 style={S.h3}>Performance Bottleneck Identification</h3>
      <CodeBlock lang="text">
{`Is client CPU/memory maxed? → Client bottleneck
       ↓ No
Is network saturated? (check NAS NIC + switch stats) → Network bottleneck
       ↓ No
Is NAS controller CPU/memory high? → Controller bottleneck
       ↓ No
Is disk/storage pool latency high? → Disk bottleneck
       ↓ No
Background jobs? (backup, replication, rebuild) → Background job impact`}
      </CodeBlock>
      <p style={S.p}><strong>Common causes:</strong> Network congestion/NIC errors, controller overloaded, RAID rebuild in progress, cache thrashing, backup/replication running concurrently, small file/metadata workloads, client-side issues.</p>

      <h3 style={S.h3}>Small Files vs Large Files</h3>
      <p style={S.p}>Small files: High metadata operations — NAS controller CPU intensive. Large files: Sequential throughput dominant. Profile workload before sizing NAS.</p>

      {/* ══ SECTION 30 — MONITORING ═════════════════════════════════════════ */}
      <h2 id="monitoring" style={S.h2}>Monitoring — What Engineers Watch</h2>

      <h3 style={S.h3}>Daily Monitoring Checklist</h3>
      <ComparisonTable
        title=""
        headers={["Check", "What to Look For"]}
        rows={[
          ["System health",                "Green/OK on all components"],
          ["Critical alerts",             "Zero critical alerts"],
          ["Failed disks",                "Any drive faults?"],
          ["Storage pool health",         "RAID optimal/degraded?"],
          ["Capacity",                    "Under organizational warning threshold"],
          ["Controller state",            "Both controllers active/healthy"],
          ["Network interface errors",    "Zero or at established baseline"],
          ["SMB/NFS active sessions",     "Counts normal? Unexpected drops?"],
          ["Authentication failures",     "Any unusual patterns in last 24h?"],
          ["Replication status",          "All jobs succeeded, lag within RPO"],
          ["Backup status",               "Last backup completed successfully"],
        ]}
        caption=""
      />

      <h3 style={S.h3}>What Each Metric Tells You</h3>
      <ul style={S.ul}>
        <li><strong>Cache hit ratio:</strong> High = data served from cache (fast). Dropping = workload changed or capacity issue.</li>
        <li><strong>Disk latency:</strong> Rising = drives aging, RAID rebuild, or pool full</li>
        <li><strong>NIC utilization:</strong> Near 100% sustained = network bottleneck</li>
        <li><strong>Protocol errors:</strong> SMB/NFS service issues, network problems</li>
        <li><strong>Replication lag:</strong> Backup data freshness — rising lag = RPO at risk</li>
        <li><strong>Snapshot space:</strong> Growing unexpectedly = high change rate or too many snapshots</li>
      </ul>

      <h3 style={S.h3}>Monitoring Tools</h3>
      <ul style={S.ul}>
        <li><strong>OEM Dashboard (Web GUI):</strong> Primary — visual, check this daily</li>
        <li><strong>SNMP:</strong> Enterprise monitoring platforms (Prometheus, Nagios, Zabbix, SolarWinds) SNMP OIDs poll karte hain</li>
        <li><strong>Syslog:</strong> NAS events aur alerts centralized log management mein</li>
        <li><strong>Email Alerts:</strong> Configure day one — direct notification on critical events</li>
        <li><strong>REST API:</strong> Advanced — automation, custom monitoring integration</li>
      </ul>

      {/* ══ SECTION 31 — SWITCH-SIDE TROUBLESHOOTING ═══════════════════════ */}
      <h2 id="switch-troubleshooting" style={S.h2}>Network Troubleshooting — Switch Side</h2>
      <p style={S.p}>NAS troubleshooting often requires checking both NAS-side aur switch-side statistics. NAS side clean dikhta hai lekin switch pe problem ho sakta hai.</p>
      <ComparisonTable
        title="Switch-Side Checklist"
        headers={["Check", "What to Verify"]}
        rows={[
          ["Switch port link state",   "Port up? Speed/duplex correct (no auto-negotiation mismatch)?"],
          ["VLAN membership",          "NAS port correct VLAN mein?"],
          ["LACP state",               "LACP negotiated properly? Both sides active?"],
          ["CRC / interface errors",   "Physical layer errors — bad cable, SFP?"],
          ["Packet drops",             "Input/output drops — congestion?"],
          ["SFP/transceiver health",  "DOM/diagnostics check — optical power levels?"],
          ["MAC learning",             "NAS MAC address learned on correct port?"],
          ["MTU consistency",          "Switch port MTU matches NAS and clients?"],
        ]}
        caption="Common switch-side causes: wrong VLAN on port, LACP misconfiguration, CRC errors (bad cable/SFP), MTU mismatch with jumbo frames."
      />

      {/* ══ SECTION 32 — COMMON FAILURES ════════════════════════════════════ */}
      <h2 id="common-failures" style={S.h2}>Common NAS Failures — Field Guide</h2>

      <h3 style={S.h3}>Failure 1 — Drive Failure</h3>
      <p style={S.p}><strong>Symptoms:</strong> NAS dashboard mein drive fault alert, RAID degraded, possible performance decrease during rebuild.</p>
      <p style={S.p}><strong>Action:</strong> Confirm drive bay (GUI → Storage). LED verify karo. Confirm correct replacement — same model/capacity/speed. Change management approval. Hot-swap per OEM procedure. Monitor rebuild progress aur remaining redundancy. Escalate if rebuild behavior abnormal. RAID optimal → document.</p>
      <Callout type="danger" title="During Drive Replacement">
        Wrong drive remove mat karo — bay number twice confirm karo. Do not remove second drive during rebuild. Ignore degraded state mat karo — second failure = data loss.
      </Callout>

      <h3 style={S.h3}>Failure 2 — NIC Failure</h3>
      <p style={S.p}><strong>Symptoms:</strong> Throughput reduced, possible client disconnections, NAS interface down alert.</p>
      <p style={S.p}><strong>Action:</strong> Which interface failed (GUI → Network). Bonding/failover functioning on remaining interface? Physical check: cable, switch port, SFP. Cable swap first. Replace NIC if hardware failure (OEM procedure).</p>

      <h3 style={S.h3}>Failure 3 — PSU Failure</h3>
      <p style={S.p}><strong>Symptoms:</strong> NAS PSU alert, amber/red LED. NAS continues running (redundant PSU).</p>
      <p style={S.p}><strong>Action:</strong> Which PSU (GUI → Hardware). Confirm other PSU active. Hot-swap replacement per OEM. Ensure replacement PSU connected to correct PDU (A/B).</p>

      <h3 style={S.h3}>Failure 4 — SMB Service Unavailable</h3>
      <p style={S.p}><strong>Symptoms:</strong> UNC path access fails. Port 445 test fails. Management GUI accessible.</p>
      <p style={S.p}><strong>Action:</strong> NAS GUI → Protocols → SMB status. Recent changes? Firmware update? Restart SMB service agar supported. OEM support if service won't start.</p>

      <h3 style={S.h3}>Failure 5 — NFS Mount Failure</h3>
      <CodeBlock label="NFS failure diagnostics" lang="bash">
{`showmount -e nas01        # NFSv3 environments — export visible?
nc -zv nas01 2049         # Port 2049 reachable?
# NFS service status: NAS GUI → Protocols → NFS
# Export list: client IP in allowed list?`}
      </CodeBlock>

      <h3 style={S.h3}>Failure 6 — Capacity Critical</h3>
      <p style={S.p}><strong>Immediate actions:</strong> (1) Identify largest consumers (NAS GUI capacity reports). (2) Delete unnecessary data — with data owner confirmation. (3) Move completed project files to archive/cold storage. (4) Reduce snapshot retention temporarily. (5) Emergency procurement initiated. (6) Application teams notify — potential write failures.</p>

      <h3 style={S.h3}>Failure 7 — High Latency / Slow Access</h3>
      <p style={S.p}><strong>Investigation:</strong> Background jobs running (rebuild, backup, replication)? Controller CPU/memory? Cache hit ratio? Network errors? Disk latency? Metadata workload heavy? Client-side changes?</p>
      <Callout type="important" title="RAID Rebuild — Action, Not Just Wait">
        Rebuild chal raha hai: Confirm degraded/rebuild status, remaining redundancy, rebuild ETA, any errors. Check vendor-supported rebuild priority/QoS controls. Communicate impact to stakeholders. Avoid risky additional maintenance. Escalate if rebuild behavior abnormal.
      </Callout>

      <h3 style={S.h3}>Failure 8 — Authentication Failure (Access Denied)</h3>
      <p style={S.p}><strong>Investigation:</strong> AD connectivity from NAS (DNS + AD ports)? NAS time synced with AD (Kerberos clock skew ~5 min default)? Share permissions? Folder permissions? Account locked/disabled in AD?</p>

      {/* ══ SECTION 33 — TROUBLESHOOTING MATRIX ════════════════════════════ */}
      <h2 id="troubleshooting-matrix" style={S.h2}>Troubleshooting Matrix</h2>
      <ComparisonTable
        title=""
        headers={["Symptom", "Likely Cause", "First Check", "Tool", "Next Action"]}
        rows={[
          ["Hostname not resolving",   "DNS issue",               "DNS A record",             "nslookup nas01",                 "Fix NAS A record, check client DNS"],
          ["Ping fails",              "Network / ICMP disabled", "Network path, VLAN",        "traceroute nas01",               "Test port — don't assume NAS down"],
          ["Port 445 fails",          "SMB down / firewall",     "SMB service on NAS",        "Test-NetConnection nas01 -Port 445","NAS GUI → SMB, check firewall"],
          ["Port 2049 fails",         "NFS down / firewall",     "NFS service on NAS",        "nc -zv nas01 2049",              "NAS GUI → NFS, check VLAN"],
          ["Share not accessible",    "Removed / permissions",   "Share existence on NAS",    "Try from different client",      "NAS GUI → Shares, verify permissions"],
          ["NFS mount fails",         "Export/IP/portmapper",    "Export list",               "showmount -e nas01 (NFSv3)",     "Check NFS exports, client IP allowed"],
          ["Access Denied",           "Permissions",             "Share + folder permissions","Effective permissions check",    "Verify AD groups, NTFS ACL"],
          ["Slow file transfer",      "Network/disk/bg jobs",    "NAS performance stats",     "NAS dashboard, iostat (client)", "Layer-by-layer bottleneck ID"],
          ["Pool degraded",           "Drive failure",           "Which drive",               "NAS GUI → Storage → Drives",    "Replace per OEM procedure"],
          ["Capacity critical",       "Data growth",             "Space consumers",           "NAS GUI → Capacity reports",    "Cleanup + procurement"],
          ["High latency",            "Multiple causes",         "Background jobs, CPU stats","NAS performance dashboard",     "Identify bottleneck layer"],
          ["Auth fails",              "AD/time/ports",           "NAS time, AD reachability","w32tm /query /status (Win)",    "Sync NAS NTP, verify AD ports"],
        ]}
        caption=""
      />

      {/* ══ SECTION 34 — TROUBLESHOOTING FLOWCHART ═════════════════════════ */}
      <Figure caption="Fig 7 — NAS inaccessible: systematic troubleshooting flowchart. Note: management GUI inaccessible has multiple causes beyond hardware failure — check management VLAN, routing, firewall, management service and controller separately.">
        <NasTroubleshootFlow />
      </Figure>

      {/* ══ SECTION 35 — PRODUCTION INCIDENTS ══════════════════════════════ */}
      <h2 id="production-incidents" style={S.h2}>Real Production Incident Scenarios</h2>

      <h3 style={S.h3}>Scenario 1 — NAS Responds to Ping but Files Inaccessible</h3>
      <p style={S.p}><strong>Symptoms:</strong> <code>\\nas01\engineering</code> inaccessible. Ping works. Initial conclusion: "issue on user side."</p>
      <CodeBlock label="Protocol-level test" lang="powershell">
{`Test-NetConnection nas01 -Port 445
# Result: TcpTestSucceeded: False`}
      </CodeBlock>
      <p style={S.p}><strong>Investigation:</strong> Port 445 fail. NAS management GUI: SMB service stopped. Event log: firmware update 30 minutes ago — SMB service start failure post-update.</p>
      <p style={S.p}><strong>Resolution:</strong> SMB service restart from NAS GUI. Configuration parameter re-applied per new firmware documentation. <strong>Lesson:</strong> Ping misleads. Always test at protocol level.</p>

      <h3 style={S.h3}>Scenario 2 — SMB Works from Some Servers, Not Others</h3>
      <p style={S.p}><strong>Symptoms:</strong> Dev servers access share. Production servers cannot. Same credentials.</p>
      <p style={S.p}><strong>Root Cause:</strong> Production servers recently moved to new VLAN. Firewall blocking production VLAN → NAS port 445. <strong>Resolution:</strong> Firewall rule update. <strong>Lesson:</strong> "Same credentials" irrelevant agar network block ho — network layer pehle.</p>

      <h3 style={S.h3}>Scenario 3 — NFS Mount Suddenly Fails</h3>
      <p style={S.p}><strong>Symptoms:</strong> 3 AM: Linux app servers NFS mount missing. Applications in error state.</p>
      <CodeBlock label="Investigation" lang="bash">
{`showmount -e nas01
# Export /vol/appdata not listed`}
      </CodeBlock>
      <p style={S.p}><strong>Root Cause:</strong> Junior admin ne "cleanup" ke dauran export delete kiya — actually 12 servers use kar rahe the. <strong>Resolution:</strong> Export re-create, remount, services restart. <strong>Prevention:</strong> NFS exports deletion change management ke under.</p>

      <h3 style={S.h3}>Scenario 4 — File Transfer Extremely Slow</h3>
      <p style={S.p}><strong>Symptoms:</strong> Engineering team large files copy karne mein hours le raha hai.</p>
      <p style={S.p}><strong>Investigation:</strong> NAS dashboard: storage pool rebuilding. Controller CPU 90%+ (rebuild + user workload combined).</p>
      <p style={S.p}><strong>Action:</strong> Confirm rebuild progress, ETA, remaining redundancy. Check vendor-supported rebuild priority controls. Communicate temporary degradation to users. Do not attempt additional risky maintenance during rebuild. <strong>Prevention:</strong> Hot spare configure karo. Rebuild priority tuning.</p>

      <h3 style={S.h3}>Scenario 5 — NAS at Critical Capacity</h3>
      <p style={S.p}><strong>Symptoms:</strong> 94% capacity. Previous 80% alert acknowledged but no action taken.</p>
      <p style={S.p}><strong>Investigation:</strong> Video production share — 40TB in 3 weeks (new project). Snapshots also consuming significant space.</p>
      <p style={S.p}><strong>Immediate actions:</strong> Video team inform. Archive completed project files. Reduce snapshot retention. Emergency procurement. <strong>Prevention:</strong> Warning threshold pe action mandatory — not just acknowledgment.</p>

      {/* ══ SECTION 36 — BEGINNER MISTAKES ═════════════════════════════════ */}
      <h2 id="beginner-mistakes" style={S.h2}>Common Beginner / Field Mistakes</h2>
      <ul style={S.ul}>
        <li><strong>"Ping success means NAS is working"</strong> — Galat. Ping tests ICMP. SMB/NFS alag hai. Always test at protocol level.</li>
        <li><strong>Confusing DAS, NAS and SAN</strong> — DAS: direct attachment, typically one host. NAS: network, file-level, multiple clients. SAN: dedicated network, block-level. Different use cases.</li>
        <li><strong>Testing wrong IP</strong> — Management IP aur data IP alag. Share access test data IP se karo.</li>
        <li><strong>Wrong VLAN</strong> — Client aur NAS same VLAN ya routed path pe honi chahiye.</li>
        <li><strong>Wrong DNS or no DNS</strong> — UNC path DNS pe depend karta hai. IP se test kiya — "works" bola. Production hostname se fails.</li>
        <li><strong>Wrong share path</strong> — Share name exact match chahiye. Typo = access denied.</li>
        <li><strong>Permissions checked at share level only</strong> — Both share + folder/NTFS levels check karo.</li>
        <li><strong>Ignoring capacity alerts</strong> — Warning threshold pe capacity planning start karo immediately.</li>
        <li><strong>Removing a disk without confirming correct bay</strong> — iDRAC/GUI se confirm, LED verify karo before pulling.</li>
        <li><strong>Treating snapshot as backup</strong> — Snapshot same hardware. Independent backup alag se required.</li>
        <li><strong>Making network changes without redundancy check</strong> — NIC config change: current link redundant verify karo pehle.</li>
        <li><strong>Force-closing active sessions without impact assessment</strong> — Active writes force-close = data corruption risk.</li>
      </ul>

      {/* ══ SECTION 37 — BEST PRACTICES ═════════════════════════════════════ */}
      <h2 id="best-practices" style={S.h2}>Best Practices</h2>
      <ComparisonTable
        title=""
        headers={["Practice", "Classification"]}
        rows={[
          ["Management network separation (dedicated VLAN)",              "Recommended Best Practice"],
          ["Disable SMB 1.0 in modern environments",                      "Strong Recommendation — legacy deps: isolate + compensating controls"],
          ["Enable email alerts on day 1",                                "Recommended Best Practice"],
          ["Redundant NICs + link redundancy",                            "Recommended Best Practice"],
          ["Dual switches for production NAS",                            "Recommended Best Practice"],
          ["Dual controllers for production",                             "Recommended Best Practice"],
          ["Regular snapshot schedule",                                   "Recommended Best Practice"],
          ["Independent backup (offsite/isolated copy)",                  "Strongly Recommended per org backup/DR policy"],
          ["Capacity threshold alerts at ~80%/90%",                       "Recommended Best Practice — per vendor + org policy"],
          ["Document everything (IPs, paths, VLANs, permissions)",        "Recommended Best Practice"],
          ["Firmware updates via change management only",                  "Mandatory — no unplanned production updates"],
          ["HA/failover testing periodically",                            "Recommended per org policy + change management"],
          ["NTP configuration in AD/Kerberos environments",               "Mandatory"],
          ["Principle of least privilege",                                "Recommended Best Practice"],
          ["NFSv4 over NFSv3 where environment supports",                 "Recommended Best Practice"],
          ["Multiprotocol access: plan identity mapping before enabling", "Mandatory consideration"],
        ]}
        caption=""
      />

      {/* ══ SECTION 38 — DAS vs NAS vs SAN COMPARISON ══════════════════════ */}
      <h2 id="das-nas-san-comparison" style={S.h2}>DAS vs NAS vs SAN — Complete Comparison</h2>
      <ComparisonTable
        title=""
        headers={["Parameter", "DAS", "NAS", "SAN"]}
        rows={[
          ["Connection",              "Direct cable to host",                  "Ethernet network",              "Dedicated FC/iSCSI network"],
          ["Access type",             "Local block (OS manages filesystem)",    "File-level (NAS manages filesystem)", "Block-level (server OS/app manages)"],
          ["Multi-host sharing",      "Typically no (specialized designs: limited)","Yes — multiple concurrent clients","Yes — multiple servers"],
          ["Protocol",                "SAS, SATA, NVMe",                       "SMB, NFS",                     "Fibre Channel, iSCSI"],
          ["Network dependency",      "None",                                  "Yes — Ethernet",               "Yes — dedicated storage network"],
          ["Client sees",             "Raw disk blocks",                       "Files and folders",            "Raw disk / LUN"],
          ["Complexity",              "Simplest",                              "Medium",                       "Highest"],
          ["Cost",                    "Lowest",                                "Medium",                       "Highest"],
          ["Latency",                 "Lowest",                                "Medium (network adds latency)", "Low (dedicated network)"],
          ["Scalability",             "Limited (chassis)",                     "Good (scale-out NAS)",         "High"],
          ["Typical DC use",          "Local server storage, HCI",             "Shared files, home dirs, backup","Databases, VMware, mission-critical"],
          ["Management",              "Per-server",                            "Centralized NAS OS",           "SAN management suite"],
        ]}
        caption="SAN — dedicated chapter coming soon. Block storage can be provided via DAS topology (local) or SAN (network)."
      />

      {/* ══ SECTION 39 — LOGS AND EVENTS ════════════════════════════════════ */}
      <h2 id="logs-events" style={S.h2}>Logs aur Events — What to Collect</h2>
      <p style={S.p}><strong>OEM support case ke liye collect karo:</strong></p>
      <ul style={S.ul}>
        <li><strong>System information:</strong> NAS model, serial number, OS/firmware version, controller status</li>
        <li><strong>Problem details:</strong> Error messages (screenshots), timestamps, affected users/shares/clients, recent changes</li>
        <li><strong>Logs:</strong> System event log (NAS GUI → Events), support bundle/diagnostic package (NAS GUI ya CLI), syslog if configured, client-side logs (Windows Event Viewer, <code>/var/log/messages</code>)</li>
        <li><strong>NAS diagnostics:</strong> Storage pool status, drive health, network stats, performance graphs near problem time</li>
        <li><strong>Impact:</strong> How many affected, business impact, troubleshooting already performed</li>
      </ul>

      {/* ══ SECTION 40 — OPERATIONS CHECKLIST ══════════════════════════════ */}
      <h2 id="operations-checklist" style={S.h2}>Daily / Weekly / Monthly / Quarterly Operations</h2>

      <h3 style={S.h3}>Daily</h3>
      <ul style={S.ul}>
        <li>System health: All components green?</li>
        <li>Critical alerts: Zero?</li>
        <li>Failed/degraded drives: None?</li>
        <li>RAID pool status: Optimal?</li>
        <li>Capacity: Under organizational warning threshold?</li>
        <li>Network interface errors: Zero or at baseline?</li>
        <li>SMB/NFS active sessions: Normal counts?</li>
        <li>Authentication failures: Any unusual patterns?</li>
        <li>Replication jobs: All succeeded, within RPO?</li>
        <li>Backup last run: Completed?</li>
      </ul>

      <h3 style={S.h3}>Weekly</h3>
      <ul style={S.ul}>
        <li>Drive health trends — any S.M.A.R.T. warnings?</li>
        <li>Capacity growth rate — when will warning threshold be reached?</li>
        <li>Event log review — any unresolved warnings?</li>
        <li>Snapshot health — all scheduled snapshots completing? Space consumption?</li>
        <li>Network stats trend — any increasing errors?</li>
        <li>Performance stats review — any degradation vs baseline?</li>
      </ul>

      <h3 style={S.h3}>Monthly</h3>
      <ul style={S.ul}>
        <li>Firmware advisory review — security patches released?</li>
        <li>Full capacity review aur growth projection</li>
        <li>Backup restore spot test — verify backup is actually restorable</li>
        <li>Documentation update — changes made this month?</li>
        <li>Open alerts/events review — anything unresolved?</li>
      </ul>

      <h3 style={S.h3}>Quarterly</h3>
      <ul style={S.ul}>
        <li>HA/failover test per organizational policy, change management, vendor-supported procedure</li>
        <li>Capacity procurement review</li>
        <li>Security review — SMB version, inactive accounts, audit logs</li>
        <li>OEM support contract check</li>
        <li>Participate in organizational DR exercises — validate NAS replication, recovery aur client/application access per DR plan</li>
      </ul>

      {/* ══ SECTION 41 — PREVENTIVE MAINTENANCE ════════════════════════════ */}
      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>

      <h3 style={S.h3}>Physical Inspection (Site Visits)</h3>
      <ul style={S.ul}>
        <li>Drive bay LEDs — any amber/orange/red?</li>
        <li>PSU LEDs — both green?</li>
        <li>Fan noise — abnormal?</li>
        <li>Cable condition — no damage, properly seated</li>
        <li>SFP/cable connections firmly connected</li>
        <li>Airflow clearance — front/rear</li>
      </ul>
      <Callout type="warning" title="Physical Inspection — No Unplanned Changes">
        Do not make configuration changes during physical inspection without change management approval.
      </Callout>

      <h3 style={S.h3}>Configuration Review (Planned Window)</h3>
      <ul style={S.ul}>
        <li>Snapshot schedules running?</li>
        <li>Replication jobs healthy?</li>
        <li>Alert email delivery — test send karo</li>
        <li>Firmware advisory check</li>
      </ul>

      <h3 style={S.h3}>Never Do Without Change Management</h3>
      <ul style={S.ul}>
        <li>Restart production services</li>
        <li>Remove drives</li>
        <li>Change network configuration</li>
        <li>Apply firmware updates</li>
        <li>Modify shares/exports/permissions</li>
      </ul>

      {/* ══ SECTION 42 — NAS MIGRATION ══════════════════════════════════════ */}
      <h2 id="nas-migration" style={S.h2}>NAS Migration</h2>
      <p style={S.p}>NAS replace karte waqt ek basic file copy often insufficient hai. Plan aur validate karo:</p>
      <ul style={S.ul}>
        <li><strong>ACLs and ownership</strong> — NTFS ACLs, POSIX permissions, extended ACLs</li>
        <li><strong>Timestamps</strong> — creation, modification, access times</li>
        <li><strong>Extended attributes</strong> — xattrs on Linux, resource forks on some platforms</li>
        <li><strong>Alternate data streams</strong> — Windows/NTFS environments</li>
        <li><strong>SMB share definitions</strong> — share names, paths, permissions</li>
        <li><strong>NFS export rules</strong> — client access, mount options</li>
        <li><strong>Quotas</strong> — per-user/group/directory quotas</li>
        <li><strong>Identity mapping</strong> — UID/GID, SID mapping configuration</li>
        <li><strong>DNS / namespace cutover</strong> — DFS, virtual IPs, DNS aliases</li>
        <li><strong>Application freeze / delta sync</strong> — quiesce applications for final delta</li>
        <li><strong>Data integrity validation</strong> — checksums/verification where appropriate</li>
      </ul>
      <Callout type="warning" title="robocopy / rsync — Not a Complete NAS Migration Tool">
        robocopy aur rsync useful hain lekin automatically every NAS metadata element, ACL ya protocol-specific configuration preserve nahi karte. Exactly kya preserve hoga aur kya manually migrate karna padega — verify karo. Enterprise NAS migrations typically vendor-specific migration procedures require karte hain.
      </Callout>

      {/* ══ SECTION 43 — NAS vs WINDOWS FILE SERVER ════════════════════════ */}
      <h2 id="nas-vs-windows-fs" style={S.h2}>NAS vs Windows File Server</h2>
      <p style={S.p}><strong>Windows File Server:</strong> General-purpose OS (Windows Server) pe SMB share host karna. Microsoft ecosystem ke saath tight integration, flexible.</p>
      <p style={S.p}><strong>NAS:</strong> Purpose-built storage platform — storage management, hardware redundancy, snapshots, replication aur file protocols ek specialized appliance mein integrated hain.</p>
      <p style={S.p}>Dono valid solutions hain — choice scale, budget, existing infrastructure, required features aur operational model pe depend karta hai.</p>

      {/* ══ SECTION 44 — INTERVIEW QUESTIONS ═══════════════════════════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview / Job Knowledge</h2>

      <h3 style={S.h3}>Q1: NAS kya hai aur DAS se kaise alag hai?</h3>
      <p style={S.p}><strong>Answer:</strong> NAS ek dedicated file storage appliance hai jo Ethernet network pe connected hota hai aur multiple clients ko simultaneously file-level storage provide karta hai. DAS directly ek host se cable se attached hoti hai — typically general-purpose network file sharing provide nahi karta. NAS ka main advantage: shared multi-client access. DAS ka main advantage: lowest latency, simplest architecture. Production mein dono alag use cases ke liye use hote hain.</p>

      <h3 style={S.h3}>Q2: SMB aur NFS mein kya difference hai?</h3>
      <p style={S.p}><strong>Answer:</strong> SMB (Server Message Block) — Windows file sharing protocol, TCP port 445. NFS (Network File System) — Linux/Unix standard, primarily TCP port 2049. SMB user-based authentication (AD/Kerberos/NTLM) use karta hai. NFS traditionally IP-based export control + UID/GID. NFSv4 with Kerberos proper user auth add karta hai. Same NAS dono simultaneously support kar sakta hai — multiprotocol datasets ke liye identity mapping design required hai.</p>

      <h3 style={S.h3}>Q3: Port 445 kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> SMB (Server Message Block) protocol ka primary TCP port. Windows file sharing is port pe karta hai. <code>Test-NetConnection nas01 -Port 445</code> se verify karte hain ki NAS par SMB service accessible hai aur port reachable hai.</p>

      <h3 style={S.h3}>Q4: Ping kaam karta hai lekin SMB nahi — kyun?</h3>
      <p style={S.p}><strong>Answer:</strong> Ping ICMP test karta hai. SMB TCP port 445 use karta hai. Dono alag protocols hain. ICMP enabled ho, SMB service stopped ya port blocked ho — ping tab bhi work karta hai. Always test at protocol level: <code>Test-NetConnection nas01 -Port 445</code>.</p>

      <h3 style={S.h3}>Q5: NAS troubleshoot kaise karte ho jab inaccessible ho?</h3>
      <p style={S.p}><strong>Answer:</strong> Layer-by-layer: (1) Management GUI accessible? Consider: management VLAN, routing, firewall, service, controller, physical. (2) DNS — hostname resolve? (3) Network path — VLAN/routing correct? (4) Protocol port open? (445 / 2049) (5) Share/export exists? (6) Authentication successful? (7) Permissions correct? Har layer verify karo before assuming hardware failure.</p>

      <h3 style={S.h3}>Q6: NAS slow hai — kya check karoge?</h3>
      <p style={S.p}><strong>Answer:</strong> Network congestion/NIC errors. NAS controller CPU/memory. Background jobs: rebuild, backup, replication. Cache hit ratio. Disk latency. Metadata workload heavy? Client-side issues? Layer-by-layer bottleneck identify karo — ek factor assume mat karo.</p>

      <h3 style={S.h3}>Q7: NAS capacity 100% ho jaaye toh kya hoga?</h3>
      <p style={S.p}><strong>Answer:</strong> Write operations fail honge — applications ko I/O errors. Performance degrade hogi. Snapshots fail kar sakte hain. Serious production impact. Organizational warning threshold pe immediate action lo — wait mat karo 100% tak.</p>

      <h3 style={S.h3}>Q8: Snapshot aur backup mein kya difference hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Snapshot same NAS pe — fast restore, space-efficient. NAS fail ho — snapshot gone. Independent backup alag storage/location pe — hardware failure, ransomware, site disaster se protect karta hai. Dono alag-alag use karo — snapshot backup replace nahi karta.</p>

      <h3 style={S.h3}>Q9: NFSv3 aur NFSv4 mein firewall mein kya difference hai?</h3>
      <p style={S.p}><strong>Answer:</strong> NFSv3: portmapper/rpcbind TCP/UDP 111 + NFS data port 2049 + dynamic RPC ports for mountd/locking/stat — complex, multiple ports. NFSv4: primarily TCP 2049 for basic protocol traffic. Kerberos, DNS, identity services additional connectivity require kar sakte hain. Always NAS vendor documentation verify karo.</p>

      <h3 style={S.h3}>Q10: SMB 1.0 kyun disable karna chahiye?</h3>
      <p style={S.p}><strong>Answer:</strong> SMB 1.0 serious security vulnerabilities rakhta hai — EternalBlue exploit, WannaCry ransomware. Modern systems SMB 2.x/3.x support karte hain. Legacy dependencies: isolate, document, compensating controls, migration plan. Production mein SMB 1.0 enabled rakhna unacceptable security risk hai.</p>

      {/* ══ SECTION 45 — KEY TAKEAWAYS ══════════════════════════════════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li><strong>NAS = Network Attached Storage</strong> — dedicated file storage appliance on Ethernet. Multiple clients simultaneously access karte hain.</li>
        <li><strong>File-level storage</strong> — NAS files aur folders share karta hai. Underlying NAS filesystem (ZFS, WAFL, Btrfs, vendor-specific) clients ko directly nahi dikhta.</li>
        <li><strong>SMB = Windows protocol (Port 445). NFS = Linux/Unix (Port 2049 primarily).</strong> Enterprise NAS dono simultaneously support karta hai — multiprotocol datasets ke liye identity mapping design required hai.</li>
        <li><strong>Ping ≠ NAS health.</strong> Always test at protocol port level.</li>
        <li><strong>Layer-by-layer troubleshooting:</strong> Network → DNS → Port → Service → Share → Auth → Permissions.</li>
        <li><strong>Access Denied ke teen checks:</strong> Share permission, folder permission, authentication.</li>
        <li><strong>Capacity thresholds</strong> vendor recommendations aur organizational policy se set karo.</li>
        <li><strong>Snapshot ≠ Backup.</strong> Same hardware pe hai. Independent backup, preferably offsite/isolated, strongly recommended per organizational policy.</li>
        <li><strong>SMB 1.0 disable karo</strong> — legacy dependencies: isolate, document, migration plan.</li>
        <li><strong>NTP mandatory in AD/Kerberos environments</strong> — time skew = auth failure.</li>
        <li><strong>HA/failover testing</strong> should be performed periodically per org policy, change management aur vendor-supported procedures.</li>
        <li><strong>NFSv3 firewalling complex</strong> (portmapper + dynamic ports). NFSv4 simpler (primarily TCP 2049 + identity/Kerberos deps).</li>
        <li><strong>Multiprotocol NAS requires design</strong> — identity mapping, security style, name mapping plan karo before enabling both protocols.</li>
        <li><strong>NAS migration:</strong> ACLs, timestamps, identity mapping, share/export definitions — sab explicitly plan karo. Basic file copy sufficient nahi.</li>
        <li><strong>Monitor daily:</strong> Drive health, RAID status, capacity, network errors, session counts, replication lag, auth failures.</li>
        <li><strong>Document everything:</strong> Share paths, IPs, VLANs, permissions matrix.</li>
      </ul>

      {/* ══ FAQ ══════════════════════════════════════════════════════════════ */}
      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: i < faqs.length - 1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight: 700, marginBottom: "0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom: 0 }}>{item.a}</p>
        </div>
      ))}

      {/* ══ RELATED TOPICS ═══════════════════════════════════════════════════ */}
      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Related Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="das" variant="inline" /> — Direct Attached Storage — NAS ka predecessor concept. DAS ke baad NAS padho.</li>
        <li><TopicLink slug="san" variant="inline" /> — Storage Area Network — enterprise shared block storage. NAS aur SAN ko compare karo.</li>
        <li><TopicLink slug="server-basics" variant="inline" /> — Server hardware fundamentals — NAS deploy karne wale servers.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — VMware aur NAS — shared datastores aur VM storage.</li>
      </ul>
    </>
  );
}
