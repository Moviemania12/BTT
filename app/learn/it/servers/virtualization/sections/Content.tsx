"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import HypervisorTypes from "../svg/HypervisorTypes";
import VmArchitecture from "../svg/VmArchitecture";
import VmClusterHa from "../svg/VmClusterHa";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#14532d", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — Virtualisation in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>Virtualisation kya hai:</strong> Ek physical server pe multiple virtual servers (VMs) run karna. Each VM thinks it has dedicated hardware. Resources software ke through share aur abstract hote hain.</li>
          <li><strong>Hypervisor:</strong> Physical hardware aur VMs ke beech software layer. Type 1 (bare metal — ESXi/Hyper-V/KVM) data center standard. Type 2 (hosted — VirtualBox) dev/test ke liye.</li>
          <li><strong>VM = vCPU + vRAM + vDisk + vNIC:</strong> Sab virtual, physical resources pe map hote hain. vRAM allocation/reservation behaviour hypervisor aur configuration pe depend karta hai.</li>
          <li><strong>Overcommit:</strong> Physical resources se zyada virtual assign karna — carefully manage karo. Memory overcommit mein swapping catastrophic performance impact deta hai.</li>
          <li><strong>Snapshots ≠ Backups:</strong> Snapshot same storage pe, quick rollback ke liye. Backup separate location pe, disaster recovery ke liye. Dono alag hain.</li>
          <li><strong>Live migration:</strong> Running VM ko host se host pe bina downtime ke move karna. Shared storage ya storage migration typically required hai — hypervisor pe depend karta hai.</li>
          <li><strong>HA:</strong> Host fail → cluster automatically VMs restart karta hai doosre hosts pe. Recovery time = VM restart time (OS boot).</li>
        </ul>
      </div>

      <h2 id="why-virtualisation" style={S.h2}>Why Virtualisation?</h2>
      <p style={S.p}>Pre-virtualisation era: ek application = ek physical server. 100 applications = 100 servers. Problem: CPU utilization 5-15% typical tha most workloads ke liye — 85-95% server capacity waste. Hardware, power, space, cooling — sab wasteful.</p>
      <p style={S.p}>Virtualisation ne fundamentally badal diya: ek powerful physical server pe dozens of VMs run karo. Resource utilization improve hua, provisioning minutes mein ho gaya (weeks ki jagah), isolation maintained hua VMs ke beech, maintenance simplified hua.</p>
      <p style={S.p}>Aaj modern data center mein virtualisation standard practice hai — bare metal sirf specific high-performance workloads ke liye jahan overhead unacceptable ho (kuch HPC, latency-sensitive databases).</p>

      <h2 id="hypervisor-types" style={S.h2}>Hypervisor — Type 1 and Type 2</h2>
      <p style={S.p}>Hypervisor (Virtual Machine Monitor) software layer hai jo physical hardware aur VMs ke beech hota hai. Physical CPU, RAM, storage, network — sab abstract karta hai. VMs ko virtual hardware present karta hai. Resources allocate aur schedule karta hai. VMs ke beech isolation enforce karta hai.</p>
      <Figure caption="Fig 1 — Type 1 bare metal hypervisor (runs directly on hardware) vs Type 2 hosted hypervisor (runs as process on host OS). KVM note included."><HypervisorTypes /></Figure>
      <Callout type="important" title="KVM Architecture — Correctly Understood">
        KVM (Kernel-based Virtual Machine) ek Linux kernel module hai jo Linux kernel ko Type 1 hypervisor mein convert karta hai. KVM Type 2 nahi hai — yeh Linux kernel ka part ban jaata hai, directly hardware access karta hai. QEMU typically KVM ke saath device emulation ke liye use hota hai. KVM production data centers mein widely used hai — OpenStack, many cloud providers.
      </Callout>
      <p style={S.p}><strong>Microsoft Hyper-V</strong> bhi Type 1 hai — Windows Server pe Hyper-V role enable karne ke baad, Hyper-V hypervisor directly hardware pe run karta hai. Windows itself ek privileged VM ban jaati hai (parent partition). Yeh Type 2 nahi hai.</p>

      <h2 id="vm-architecture" style={S.h2}>VM Architecture</h2>
      <Figure caption="Fig 2 — VM architecture: physical host with hypervisor, three VMs each showing vCPU, vRAM, vDisk and vNIC. Values illustrative."><VmArchitecture /></Figure>
      <p style={S.p}><strong>vCPU (Virtual CPU):</strong> VM ko virtual processor cores milte hain. Hypervisor physical CPU threads pe vCPUs schedule karta hai. VM ko 4 vCPUs → hypervisor 4 physical threads use/schedule karta hai. NUMA topology preserve karna VM performance ke liye beneficial hai.</p>
      <p style={S.p}><strong>vRAM (Virtual RAM):</strong> VM ko assigned memory. Physical server RAM se backed. vRAM allocation, reservation aur limit behaviour hypervisor aur configuration pe depend karta hai — VMware memory reservation, ballooning, swapping sab alag configure hote hain. Default mein sab vRAM physically reserved nahi hoti — hypervisor dynamically manage karta hai.</p>
      <p style={S.p}><strong>vDisk (Virtual Disk):</strong> VMDK (VMware), VHD/VHDX (Hyper-V), QCOW2 (KVM) — virtual disk file ya direct block device. VM ko normal disk ki tarah dikhta hai. Thin provisioning (only used space allocated) vs thick provisioning (all space pre-allocated).</p>
      <p style={S.p}><strong>vNIC (Virtual Network Interface):</strong> Virtual switch se connect. VM ko normal network card ki tarah dikhta hai. Multiple vNICs assign ho sakte hain — different VLANs, redundancy ke liye.</p>

      <h2 id="resource-allocation" style={S.h2}>Resource Allocation and Overcommit</h2>
      <p style={S.p}><strong>CPU Overcommit:</strong> Physical threads se zyada vCPUs assign karna. Work karta hai kyunki sab VMs simultaneously peak pe nahi hote. Risk: simultaneous heavy load → CPU ready time badh jaati hai → VMs slow. Monitor karo CPU ready time metrics. Appropriate overcommit ratio workload mix pe depend karta hai — monitor karo aur baselines establish karo.</p>
      <p style={S.p}><strong>Memory Overcommit Techniques:</strong></p>
      <ul style={S.ul}>
        <li><strong>Memory Ballooning:</strong> Hypervisor VM ke andar balloon driver load karta hai — jab host pressure mein ho, driver VM se memory wapas leta hai.</li>
        <li><strong>Memory Swapping:</strong> VM RAM host disk pe swap — performance drastically falls (disk speed vs RAM speed). Avoid karo production workloads mein.</li>
        <li><strong>Transparent Page Sharing (TPS):</strong> Identical pages across VMs deduplicate — security concerns ke baad many hypervisors ne default disable kiya.</li>
      </ul>
      <Callout type="warning" title="Memory Overcommit Production Risk">
        Production workloads mein memory overcommit carefully use karo ya avoid karo. Memory swapping begin ho toh VM performance catastrophically degrade hoti hai. Physical RAM adequately provision karo — sum of all VM configured RAM + hypervisor overhead. Monitor balloon driver activity aur host memory pressure.
      </Callout>
      <p style={S.p}><strong>Storage Thin Provisioning:</strong> VM ko 500GB vDisk allocate karo lekin physically sirf used space allot hoti hai. Benefit: efficient storage use. Risk: total allocated across all VMs exceeds physical capacity — datastore full hone pe VMs pause ya crash ho sakte hain. Monitor datastore utilization carefully.</p>

      <h2 id="vm-lifecycle" style={S.h2}>VM Lifecycle</h2>
      <p style={S.p}><strong>Create:</strong> New VM wizard — vCPU count, vRAM, vDisk size, network, OS type specify karo. Template se create karo rapid deployment ke liye.</p>
      <p style={S.p}><strong>Provision:</strong> OS install karo (ISO mount ya PXE), VMware Tools / Hyper-V Integration Services install karo (critical — balloon driver, time sync, enhanced network/storage drivers).</p>
      <p style={S.p}><strong>Run:</strong> VM power on. Workload deploy karo. Monitoring configure karo.</p>
      <p style={S.p}><strong>Maintain:</strong> OS patches, application updates. VM hardware version updates (planned). Snapshot management — stale snapshots consolidate karo.</p>
      <p style={S.p}><strong>Migrate:</strong> Live migration (host maintenance), storage migration, cross-cluster moves.</p>
      <p style={S.p}><strong>Decommission:</strong> Workload migrate ya terminate. Data backup verify. VM delete — vDisk files cleanup. DNS/IPAM/CMDB se remove.</p>

      <h2 id="templates-cloning" style={S.h2}>Templates, Cloning and Datastores</h2>
      <p style={S.p}><strong>Templates:</strong> Golden image — pre-configured, patched OS image. New VMs templates se deploy hote hain — consistent aur fast. Template update karo → sab future deployments updated. VMware: VM → Convert to Template. Hyper-V: Differencing disk ya Checkpoint-based.</p>
      <p style={S.p}><strong>Cloning:</strong> Existing VM ka exact copy. Full clone — completely independent copy. Linked clone — base VM se space share karta hai (space efficient, dependent on base). Customization (sysprep/Linux equivalent) clone ke baad — unique hostname, IP, SID.</p>
      <p style={S.p}><strong>Datastores:</strong> VM files store karne ke liye logical storage container. SAN LUN, NFS share, or local storage datastore ban sakti hai. Multiple hosts same datastore access karte hain — shared storage live migration enable karta hai. Datastore capacity aur performance monitor karo — IOPS, latency, space.</p>

      <h2 id="virtual-networking" style={S.h2}>Virtual Networking</h2>
      <p style={S.p}><strong>Virtual Switch (vSwitch):</strong> Hypervisor software switch. VMs is switch se connect hoti hain. Physical NIC (uplink) real network se connect hota hai. Traffic: VM → vSwitch → physical NIC → physical switch.</p>
      <p style={S.p}><strong>Port Groups / VLANs:</strong> VMs logical groups mein organize karo — different VLANs, different security policies. Production VMs traffic management traffic se separate karo.</p>
      <p style={S.p}><strong>NIC Teaming:</strong> Multiple physical NICs virtual switch se connect karo — redundancy aur bandwidth aggregation. Active-active ya active-standby configuration possible.</p>
      <p style={S.p}><strong>Distributed Virtual Switch (VMware VDS / Hyper-V virtual switch):</strong> Enterprise environments mein centralised management — consistent policies across all hosts, better monitoring, LACP support.</p>

      <h2 id="snapshots-backups" style={S.h2}>Snapshots vs Backups</h2>
      <ComparisonTable
        title="Snapshot vs Backup — Critical Distinction"
        headers={["Aspect","Snapshot","Backup"]}
        rows={[
          ["What it is","Point-in-time state of VM (disk, memory, settings)","Copy of data to separate location"],
          ["Storage location","Same datastore — same storage device","Separate storage, ideally different location"],
          ["Purpose","Quick rollback before risky change","Disaster recovery, long-term retention"],
          ["If storage fails","Lost (same device)","Safe (different location)"],
          ["Performance impact","Degrades over time (delta disk growth)","None on running VM"],
          ["Application consistency","Not always — may not flush buffers","Requires VSS/quiescing for consistency"],
          ["Is it a backup?","NO","YES"],
        ]}
        caption="Snapshots are NOT backups. Production environments need proper backup solutions alongside snapshot management."
      />
      <Callout type="danger" title="Snapshots Are NOT Backups">
        Snapshot same datastore pe hota hai — storage failure mein VM aur snapshot dono gone. Long-running snapshots VM performance significantly degrade karte hain. Delta disk indefinitely grow karta hai. Production mein backup solution (Veeam, Commvault, Veritas, etc.) mandatory hai. Snapshot = temporary safety net for planned changes only.
      </Callout>
      <p style={S.p}><strong>Application Consistency:</strong> Crash-consistent snapshot (VM state as-is) vs application-consistent (VSS/quiescing se in-flight writes flush hote hain). Database workloads ke liye application-consistent backups critical hain — otherwise recovery mein data corruption risk.</p>

      <h2 id="live-migration" style={S.h2}>Live Migration</h2>
      <p style={S.p}>Live migration running VM ko ek physical host se doosre pe move karta hai bina VM shutdown kiye. Applications run karte rehte hain. VMware vMotion, Hyper-V Live Migration, KVM live migrate — common implementations.</p>
      <p style={S.p}><strong>How it works (simplified):</strong> VM memory pages destination pe copy hona start — "pre-copy". Changed pages (dirty pages) repeatedly sync. Brief pause (VM momentarily frozen — milliseconds to seconds). Destination pe execution resume. Source pe VM stopped. Network state transfer.</p>
      <p style={S.p}><strong>Traditional requirements:</strong> Shared storage (both hosts same VMDK/VHD access), compatible CPUs (feature parity ya compatibility mode), adequate resources on destination, network connectivity between hosts.</p>
      <Callout type="important" title="Shared Storage Not Always Mandatory">
        VMware Storage vMotion compute aur storage dono simultaneously migrate kar sakta hai. KVM live migration with storage migration local-to-local bhi possible hai. Hyper-V Shared Nothing Live Migration bhi exist karta hai. Specific capabilities hypervisor version aur configuration pe depend karti hain — "shared storage universally mandatory" correct nahi hai. Vendor documentation verify karo.
      </Callout>
      <p style={S.p}><strong>Use cases:</strong> Host maintenance (maintenance mode pe dalein → VMs auto-evacuate). Load balancing (busy host se VMs move karo). DRS (VMware Distributed Resource Scheduler) automatically VMs rebalance karta hai based on cluster load.</p>

      <h2 id="ha-clusters" style={S.h2}>HA and Cluster Architecture</h2>
      <Figure caption="Fig 3 — VM cluster HA: Host 1 fails, HA detects failure and restarts VMs A, B, C on surviving Hosts 2 and 3. Shared storage enables access to VM disks."><VmClusterHa /></Figure>
      <p style={S.p}><strong>Cluster:</strong> Multiple ESXi/Hyper-V hosts ek logical unit mein. Shared resources, shared features (HA, DRS, live migration). Hosts heartbeat ke through ek doosre ko monitor karte hain.</p>
      <p style={S.p}><strong>HA (High Availability):</strong> Host fail → HA detect karta hai → surviving hosts pe VMs automatically restart hoti hain. Recovery time VM restart time pe depend karta hai (OS boot) — seconds to minutes, not instantaneous. No fixed universal time claim accurate nahi hai.</p>
      <p style={S.p}><strong>Admission Control:</strong> HA reserved capacity ensure karta hai — N hosts fail ho sakte hain aur remaining hosts sab VMs handle kar saken. Configure karo based on required failure tolerance (e.g., 1 host, 2 hosts).</p>
      <p style={S.p}><strong>VMware FT (Fault Tolerance):</strong> Zero-downtime — VM ka identical running shadow copy another host pe. Primary fail → shadow instantly takes over, no restart. Significant compute overhead. High-criticality VMs ke liye sirf.</p>
      <p style={S.p}><strong>DRS (VMware Distributed Resource Scheduler):</strong> Cluster load monitor karta hai — imbalance pe VMs live migrate karta hai. Manual, partial ya fully automated mode. Load balancing aur initial VM placement optimize karta hai.</p>

      <h2 id="management-plane" style={S.h2}>Virtualisation Management Plane</h2>
      <p style={S.p}><strong>VMware vCenter Server:</strong> Centralized management platform — sab ESXi hosts, VMs, clusters, datastores ek interface se manage karo. HA, DRS, vMotion, permissions — sab vCenter se. vCenter down hone pe existing VMs run karte rehte hain — lekin management operations (new VMs, vMotion, HA reconfiguration) unavailable.</p>
      <p style={S.p}><strong>Microsoft System Center VMM (SCVMM) / Windows Admin Center:</strong> Hyper-V environments ka centralised management.</p>
      <p style={S.p}><strong>OpenStack / oVirt / Proxmox:</strong> Open-source management platforms — KVM/QEMU environments ke liye. Self-hosted cloud capabilities.</p>
      <p style={S.p}>Management plane VM lifecycle, resource allocation, user permissions, monitoring, alerts, compliance — sab handle karta hai. Management plane availability plan karo — HA configuration management servers ke liye bhi.</p>

      <h2 id="rpo-rto" style={S.h2}>RPO and RTO Concepts</h2>
      <p style={S.p}><strong>RPO (Recovery Point Objective):</strong> Maximum acceptable data loss time — "Disaster ke baad kitna data lose karna acceptable hai?" Agar RPO 1 hour hai → backups/replication har 1 hour honi chahiye. Shorter RPO = more frequent backups/replication = higher cost.</p>
      <p style={S.p}><strong>RTO (Recovery Time Objective):</strong> Maximum acceptable downtime — "Disaster ke baad kitne time mein service back up honi chahiye?" Shorter RTO = faster recovery mechanisms needed = higher cost (hot standby, FT, etc.).</p>
      <p style={S.p}>Virtualisation RPO/RTO achieve karne mein help karta hai: VM replication (shorter RPO), HA/FT (shorter RTO), snapshots (quick rollback — lekin ye backup nahi hai). Specific RPO/RTO targets business requirements se driven hote hain aur appropriate backup/replication/HA strategy design karte hain.</p>

      <h2 id="vm-vs-containers" style={S.h2}>VM vs Containers</h2>
      <ComparisonTable
        title="VMs vs Containers"
        headers={["Aspect","Virtual Machine (VM)","Container (Docker/Kubernetes)"]}
        rows={[
          ["Isolation","Full OS isolation — separate kernel","Process isolation — shared host OS kernel"],
          ["OS","Complete guest OS (different from host possible)","Uses host OS kernel — same kernel"],
          ["Size","GBs — full OS image","MBs — application + dependencies"],
          ["Startup time","Minutes (OS boot)","Seconds to milliseconds"],
          ["Resource overhead","Higher — full OS","Lower — no OS duplication"],
          ["Security boundary","Stronger — separate kernel","Weaker — kernel sharing"],
          ["Use case","Different OS, legacy apps, strong isolation","Microservices, cloud-native, fast scaling"],
          ["In practice","Often both used together","Containers often run on VMs"],
        ]}
        caption="VMs and containers are complementary, not competing. Most production environments use both — VMs for infrastructure, containers for application workloads."
      />

      <h2 id="security-isolation" style={S.h2}>Virtualisation Security and Isolation</h2>
      <p style={S.p}><strong>VM isolation:</strong> VMs ke beech hypervisor-enforced isolation. Ek VM doosri VM ka memory access nahi kar sakti normally. Side-channel attacks (Spectre/Meltdown) ne shared physical resources ke through information leakage demonstrate ki — mitigations (firmware patches, hypervisor updates, CPU microcode) apply karo.</p>
      <p style={S.p}><strong>Hypervisor attack surface:</strong> Hypervisor compromised → all VMs at risk. Hypervisor aur management plane firmware aur software regularly update karo. Minimal attack surface — unnecessary features disable karo.</p>
      <p style={S.p}><strong>VM escape:</strong> Rare but serious vulnerability jahan VM isolation break hoti hai aur VM host ya other VMs access kar sakti hai. CVE monitoring, timely patching critical hai.</p>
      <p style={S.p}><strong>Network microsegmentation:</strong> Virtual networking pe fine-grained firewall rules — VMs ke beech lateral movement restrict karo. NSX (VMware), Hyper-V virtual switch ACLs — VMs ke beech traffic control karo even same physical host pe.</p>
      <p style={S.p}><strong>vTPM (Virtual Trusted Platform Module):</strong> VM ko virtual TPM present karna — guest OS full disk encryption (BitLocker, etc.) aur secure boot ke liye. Sensitive workloads ke liye consider karo.</p>

      <h2 id="troubleshooting" style={S.h2}>Troubleshooting Virtualisation</h2>
      <h3 style={S.h3}>VM Slow / Unresponsive</h3>
      <p style={S.p}>Host resource check: CPU ready time high? Memory balloon/swap active? Storage latency high? `esxtop` (VMware) ya equivalent — per-VM CPU ready %, memory state, storage IOPS. Network saturation? Within VM: OS-level check — high process CPU, memory pressure?</p>
      <h3 style={S.h3}>VM Won't Start</h3>
      <p style={S.p}>Host mein enough RAM? vDisk file accessible (datastore mounted)? Configuration error? Incompatible hardware version? Permissions — correct user/service account rights? Logs check karo (vmware.log, event viewer in Hyper-V).</p>
      <h3 style={S.h3}>Live Migration Failing</h3>
      <p style={S.p}>Network connectivity between hosts? Required ports open? Shared storage accessible from destination? CPU incompatibility — EVC mode needed? Sufficient resources on destination? Logs check karo — specific error message most of the time pinpoint karta hai.</p>
      <h3 style={S.h3}>HA Not Triggering</h3>
      <p style={S.p}>HA enabled aur configured in cluster? Remaining hosts mein enough capacity (admission control settings check karo)? Shared storage accessible (storage failure HA restart prevent karta hai)? Management network (heartbeat) working? vCenter/management accessible?</p>
      <h3 style={S.h3}>Datastore Full — VMs Pausing</h3>
      <p style={S.p}>Thin-provisioned VMs grew beyond datastore capacity. Immediate: storage expand karo ya VMs doosre datastore pe migrate karo. Snapshot delta disks accumulation check karo — stale snapshots consolidate karo. Long-term: datastore capacity monitoring aur alerting configure karo.</p>
      <h3 style={S.h3}>High CPU Ready Time</h3>
      <p style={S.p}>VMs physical CPUs ke liye wait kar rahi hain. Host overcommitted. VMs migrate karo less-loaded host pe. Resource pools use karo production VMs ko guaranteed resources dene ke liye. Overcommit ratio review karo.</p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: Type 1 aur Type 2 hypervisor mein difference kya hai? KVM kahan fit hota hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Type 1 directly hardware pe — no host OS, lower overhead, data center standard (ESXi, Hyper-V, KVM). Type 2 host OS pe process ke roop mein — VirtualBox, Workstation — dev/test ke liye. KVM Linux kernel module hai jo kernel ko Type 1 hypervisor mein convert karta hai — Type 2 nahi. Hyper-V bhi Type 1 hai — Windows parent partition hypervisor ke upar privileged VM ke roop mein chalti hai.</p>
      <h3 style={S.h3}>Q2: Snapshot aur backup mein kya fark hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Snapshot same storage pe point-in-time state hai — risky change se pehle quick rollback ke liye. Same storage fail → snapshot bhi gone. Long-running snapshots performance degrade karte hain. Backup data separate location pe copy karta hai — disaster recovery ke liye. Production environments mein dono chahiye — snapshot backup replace nahi karta.</p>
      <h3 style={S.h3}>Q3: Live migration ke liye kya conditions required hain?</h3>
      <p style={S.p}><strong>Answer:</strong> Traditional implementation mein: shared storage (both hosts same vDisk access karein), compatible CPUs (ya EVC mode), network connectivity between hosts, adequate resources on destination. Lekin shared storage universally mandatory nahi hai — VMware Storage vMotion, KVM storage migration, Hyper-V Shared Nothing Live Migration bhi possible hain. Specific requirements hypervisor documentation se verify karo.</p>
      <h3 style={S.h3}>Q4: VM vs container — kab kya use karna chahiye?</h3>
      <p style={S.p}><strong>Answer:</strong> VM jab: different OS required, strong isolation critical, legacy applications, compliance requirements, different kernel versions needed. Container jab: cloud-native microservices, fast scaling, lightweight workloads, same OS kernel acceptable. Production mein often dono sath use hote hain — VMs infrastructure provide karte hain, containers VMs pe run hote hain.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Virtualisation ek physical server pe multiple VMs run karta hai — resource utilization improve, provisioning fast, isolation maintained.</li>
        <li>Type 1 hypervisor (ESXi, Hyper-V, KVM) data center standard — directly hardware pe, lower overhead.</li>
        <li>KVM Linux kernel module hai — Type 1 semantics, Type 2 nahi. Hyper-V bhi Type 1 hai.</li>
        <li>vRAM allocation/reservation behaviour hypervisor aur configuration pe depend karta hai — not universally pre-reserved.</li>
        <li>Snapshots backups nahi hain — same storage pe, performance degrade karte hain over time, disaster recovery ke liye insufficient.</li>
        <li>Live migration ke liye shared storage typically helpful hai lekin universally mandatory nahi — hypervisor capabilities vary karte hain.</li>
        <li>HA host failure pe VMs restart karta hai — recovery time VM restart time pe depend karta hai.</li>
        <li>VMs aur containers complementary hain — production mein often dono use hote hain.</li>
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
        <li><TopicLink slug="server-basics" variant="inline" /> — Physical server architecture jo VMs host karta hai.</li>
        <li><TopicLink slug="cpu" variant="inline" /> — vCPU scheduling, NUMA in VMs, virtualisation extensions.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — High-density VM hosting on blade infrastructure.</li>
        <li><TopicLink slug="cloud-vs-data-center" variant="inline" /> — Cloud virtualisation vs on-premise.</li>
      </ul>
    </>
  );
}
