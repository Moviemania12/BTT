"use client";
import { S, Callout, ComparisonTable, Figure, CodeBlock, DiagramGuide } from "../shared";
import TopicLink from "@/components/TopicLink";
import HypervisorTypes from "../svg/HypervisorTypes";
import VirtualisationStack from "../svg/VirtualisationStack";
import VmArchitecture from "../svg/VmArchitecture";
import VcpuScheduling from "../svg/VcpuScheduling";
import MemoryOvercommitLadder from "../svg/MemoryOvercommitLadder";
import VirtualStoragePath from "../svg/VirtualStoragePath";
import VirtualNetworking from "../svg/VirtualNetworking";
import LiveMigrationSteps from "../svg/LiveMigrationSteps";
import VmClusterHa from "../svg/VmClusterHa";
import VirtTroubleshootFlow from "../svg/VirtTroubleshootFlow";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      {/* Quick Summary */}
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#14532d", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — Virtualisation in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>What it is:</strong> Running many virtual servers (VMs) on one physical server. Each VM believes it has its own hardware; the hypervisor shares and isolates the real CPU, RAM, storage and network.</li>
          <li><strong>Hypervisor:</strong> Type 1 (ESXi, Hyper-V, KVM, Xen) runs on bare metal and is the data center standard. Type 2 (VirtualBox, Workstation) runs on a host OS for desktops and labs.</li>
          <li><strong>Hardware assist:</strong> Intel VT-x / AMD-V, EPT/NPT and VT-d/IOMMU make virtualisation fast. They must be enabled in the BIOS.</li>
          <li><strong>CPU:</strong> vCPUs queue for physical cores. Watch CPU ready time, right-size VMs and keep them inside a NUMA node.</li>
          <li><strong>Memory:</strong> Overcommit climbs a ladder — ballooning, compression, then swapping. Keep production at the top of the ladder.</li>
          <li><strong>Storage and network:</strong> Datastores are shared pools; virtual switches use VLANs and two uplinks. Measure latency per layer.</li>
          <li><strong>Snapshots are not backups.</strong> They live on the same storage and slow VMs over time.</li>
          <li><strong>HA and live migration:</strong> HA restarts VMs after a host failure; live migration moves running VMs. Both need spare capacity and correct network, storage and CPU compatibility.</li>
          <li><strong>Capacity:</strong> Size for N+1 host failure, spread critical VMs with anti-affinity across hosts, racks and chassis.</li>
          <li><strong>Golden rule:</strong> Virtualisation hides hardware, not physics — every VM still depends on real power, cooling, network and storage.</li>
        </ul>
      </div>

      {/* ══════════ 1. WHY ══════════ */}
      <h2 id="why-virtualisation" style={S.h2}>Why Virtualisation?</h2>
      <p style={S.p}>In the pre-virtualisation era, one application meant one physical server. 100 applications meant 100 servers. Most of them used only 5–15% of their CPU — 85–95% of the capacity sat idle.</p>
      <p style={S.p}>That meant wasted hardware, power, space and cooling. It also meant weeks of procurement for every new application.</p>
      <p style={S.p}>Virtualisation fixed this. Run dozens of VMs on one powerful physical server. Utilisation rises, provisioning drops to minutes, VMs stay isolated from each other, and maintenance becomes easier.</p>
      <ComparisonTable
        title="Physical-Only vs Virtualised Data Center"
        headers={["Area", "One app per physical server", "Virtualised"]}
        rows={[
          ["Hardware utilisation", "Often 5–15%", "Commonly 40–70% (target depends on policy)"],
          ["Provisioning time", "Days to weeks", "Minutes (from templates)"],
          ["Power and cooling", "One full server per app", "Fewer servers for the same workload"],
          ["Failure recovery", "Rebuild / restore a server", "HA restarts VMs on another host"],
          ["Maintenance", "Downtime per server", "Live-migrate VMs, patch host, no app downtime"],
          ["Isolation", "Physical", "Hypervisor-enforced"],
          ["Cost", "Hardware heavy", "Fewer servers, but hypervisor licences and management"],
        ]}
        caption="General pattern. Actual numbers depend on workload mix, policy and platform."
      />
      <p style={S.p}>Today virtualisation is the default in a modern data center. Bare metal is kept only for workloads where even small overhead is unacceptable — some HPC, very latency-sensitive databases, or GPU-heavy AI nodes (see <TopicLink slug="gpu" variant="inline" />).</p>
      <p style={S.p}>The physical host underneath is a normal server — read <TopicLink slug="server-basics" variant="inline" />, <TopicLink slug="cpu" variant="inline" /> and <TopicLink slug="ram" variant="inline" /> first if needed. High-density chassis hosting VMs: <TopicLink slug="blade-server" variant="inline" />.</p>

      {/* ══════════ 2. HYPERVISOR TYPES ══════════ */}
      <h2 id="hypervisor-types" style={S.h2}>Hypervisor — Type 1 and Type 2</h2>
      <p style={S.p}>A hypervisor (Virtual Machine Monitor) is the software layer between physical hardware and the VMs. It abstracts the CPU, RAM, storage and network, presents virtual hardware to each VM, schedules resources and enforces isolation.</p>
      <Figure caption="Fig 1 — Type 1 bare-metal hypervisor (runs directly on hardware) vs Type 2 hosted hypervisor (runs as a process on a host OS). KVM note included."><HypervisorTypes /></Figure>
      <DiagramGuide
        title="How to read Fig 1"
        steps={[
          "Left stack (Type 1): from bottom to top — physical hardware, then the hypervisor directly on it, then the VMs. No general-purpose OS sits in between, so overhead is low.",
          "Right stack (Type 2): hardware, then a normal host OS (Windows, Linux, macOS), then the hypervisor as just another application, then the VMs. Every VM request passes through the host OS — extra layer, extra overhead.",
          "The KVM note explains why people get confused: KVM is a Linux kernel module that turns the Linux kernel itself into a Type 1 hypervisor. It is not Type 2.",
          "Takeaway: data centers use Type 1 because of performance, density and manageability. Type 2 is for developer laptops, labs and demos.",
        ]}
      />
      <Callout type="important" title="KVM Architecture — Correctly Understood">
        KVM (Kernel-based Virtual Machine) is a Linux kernel module that turns the Linux kernel into a Type 1 hypervisor. KVM is not Type 2 — it becomes part of the kernel and accesses hardware directly. QEMU is typically used with KVM for device emulation. KVM is widely used in production — OpenStack, many cloud providers.
      </Callout>
      <p style={S.p}><strong>Microsoft Hyper-V</strong> is also Type 1. After the Hyper-V role is enabled, the hypervisor runs directly on hardware and Windows becomes a privileged VM (the parent partition). It is not Type 2.</p>

      {/* ══════════ 3. HOW IT WORKS ══════════ */}
      <h2 id="how-virtualisation-works" style={S.h2}>How Virtualisation Works — CPU, Memory and I/O</h2>
      <p style={S.p}>To fool an OS into thinking it owns the machine, the hypervisor must handle three things: the CPU, the memory and the I/O devices. Modern CPUs have special hardware to make this cheap.</p>
      <Figure caption="Fig 2 — Hardware-assisted virtualisation: (1) guest code runs natively and privileged operations cause a VM exit to the hypervisor; (2) memory is translated in two levels by the CPU itself (EPT/NPT); (3) I/O uses emulated devices, paravirtual drivers or direct passthrough."><VirtualisationStack /></Figure>
      <DiagramGuide
        title="How to read Fig 2"
        steps={[
          "Left panel — CPU: the guest OS and its applications run directly on the processor at native speed. Only sensitive operations (for example touching a hardware register) cannot be allowed, so the CPU triggers a VM exit (red arrow) and control jumps to the hypervisor.",
          "The hypervisor handles the operation, then performs a VM entry (green arrow) back to the guest. VT-x (Intel) and AMD-V make this switch cheap. If a workload causes very many exits, it feels slow.",
          "Middle panel — memory: an application uses a guest virtual address, the guest OS maps it to a guest physical address, and the hypervisor's table maps that to the real host physical address. Hardware (EPT on Intel, NPT on AMD) walks both tables itself.",
          "Right panel — I/O: three options from slow to fast. Emulated devices (compatible but slow), paravirtual drivers such as virtio or VMXNET (guest knows it is virtual, fast), and passthrough or SR-IOV (VM talks to the real device through IOMMU, near native speed but less flexible).",
          "Bottom box: the practical checklist — enable VT-x/AMD-V, EPT/NPT and VT-d/IOMMU in BIOS, install guest tools, and plan HA carefully for passthrough VMs.",
        ]}
      />
      <p style={S.p}><strong>CPU virtualisation:</strong> Before hardware support, hypervisors had to rewrite or trap privileged instructions in software — slow and complicated. With VT-x/AMD-V the CPU has a special guest mode, so most code just runs.</p>
      <p style={S.p}><strong>Memory virtualisation:</strong> Without EPT/NPT, the hypervisor had to maintain "shadow" page tables in software. With them, the hardware does the two-level translation. Huge pages (2 MB / 1 GB) reduce the cost further and are popular for databases.</p>
      <p style={S.p}><strong>I/O virtualisation:</strong> Real devices cannot easily be shared. Hypervisors therefore emulate them, provide paravirtual versions, or give a device (or a slice of it) directly to one VM. See the passthrough section later.</p>
      <Callout type="best-practice" title="Install guest tools and paravirtual drivers">
        VMware Tools, Hyper-V Integration Services and virtio drivers are not optional extras. They provide efficient network and disk drivers, time sync, graceful shutdown and the balloon driver. A VM without them is slow and hard to manage.
      </Callout>

      {/* ══════════ 4. VM ARCHITECTURE ══════════ */}
      <h2 id="vm-architecture" style={S.h2}>VM Architecture</h2>
      <Figure caption="Fig 3 — VM architecture: physical host with hypervisor, three VMs each showing vCPU, vRAM, vDisk and vNIC. Values illustrative."><VmArchitecture /></Figure>
      <DiagramGuide
        title="How to read Fig 3"
        steps={[
          "The bottom block is the physical server: real CPUs, RAM, storage connection and NICs.",
          "The hypervisor layer above it turns those real resources into virtual ones.",
          "Each VM box shows the four virtual devices every VM gets: vCPU, vRAM, vDisk and vNIC. These are the numbers you choose when creating a VM.",
          "Notice that the VMs have different sizes — a VM is just a slice of the host. The sum of all VM slices may be more than the physical total (overcommit) — covered next.",
        ]}
      />
      <p style={S.p}><strong>vCPU (Virtual CPU):</strong> The VM receives virtual cores. The hypervisor schedules each vCPU on a physical thread. A VM with 4 vCPUs needs the hypervisor to find 4 threads. Respecting NUMA topology helps performance.</p>
      <p style={S.p}><strong>vRAM (Virtual RAM):</strong> Memory assigned to the VM, backed by host RAM. Whether it is fully reserved depends on hypervisor settings — reservations, limits, ballooning and swapping are configured separately. By default not all vRAM is physically reserved; the hypervisor manages it dynamically.</p>
      <p style={S.p}><strong>vDisk (Virtual Disk):</strong> A file or a block device: VMDK (VMware), VHD/VHDX (Hyper-V), QCOW2 (KVM), or raw. To the VM it looks like a normal disk. Thin provisioning allocates space as used; thick provisioning reserves everything upfront.</p>
      <p style={S.p}><strong>vNIC (Virtual NIC):</strong> Connects to a virtual switch and looks like a normal network card. A VM can have several vNICs for different VLANs.</p>
      <p style={S.p}><strong>Other virtual hardware:</strong> virtual CD-ROM, serial, USB, TPM (vTPM), GPU (vGPU) and a virtual BIOS/UEFI. The "VM hardware version" decides which features a VM sees — upgrade it only on a plan, because older hosts may not run newer versions.</p>

      {/* ══════════ 5. VCPU SCHEDULING ══════════ */}
      <h2 id="vcpu-scheduling" style={S.h2}>vCPU Scheduling, CPU Ready and NUMA</h2>
      <Figure caption="Fig 4 — vCPU scheduling: six vCPUs share four physical cores over time slices. A vCPU waiting for a free core is accumulating CPU ready time. Illustrative schedule."><VcpuScheduling /></Figure>
      <DiagramGuide
        title="How to read Fig 4"
        steps={[
          "Each row is one physical core; each coloured block is the vCPU that owns that core for one time slice. Time moves left to right.",
          "There are 6 vCPUs (different colours) but only 4 cores, so at any moment 2 vCPUs are waiting. The same vCPU colour hops between rows — the hypervisor is free to move it.",
          "The red panel explains CPU ready time: the time a vCPU wanted to run but had no free core. It is invisible inside the guest, which may show 'low CPU' while the application is slow.",
          "The yellow box lists design lessons: overcommit works only while VMs do not all peak together, bigger VMs can wait longer, keep a VM inside one NUMA node, and hyperthreads are not full cores.",
        ]}
      />
      <p style={S.p}><strong>CPU ready time:</strong> The most important virtualisation CPU metric. High ready time means the host is overcommitted or a few VMs are too large. Many teams investigate when ready exceeds a few percent per vCPU — thresholds differ by platform and workload, so build your own baseline.</p>
      <p style={S.p}><strong>Right-sizing:</strong> A VM with 16 vCPUs that uses 2 is worse than a VM with 4 vCPUs. The big VM needs many free cores at once, so it waits longer. Start small and grow on evidence.</p>
      <p style={S.p}><strong>NUMA and vNUMA:</strong> A modern server has several CPU sockets, each with its own local memory — see <TopicLink slug="cpu" variant="inline" />. A VM that spans sockets accesses remote memory and slows down. Where possible, size VMs to fit within one NUMA node, and let the hypervisor present vNUMA to big VMs.</p>
      <p style={S.p}><strong>Hyperthreading:</strong> Two threads share one core's execution units. Count a hyperthread as roughly a fraction of a core, not a full core, when planning.</p>
      <CodeBlock lang="bash" label="Linux KVM host — quick look at CPU and NUMA layout">
{`lscpu | grep -E "Model name|Socket|Thread|NUMA"
numactl --hardware
virsh vcpuinfo <vm-name>         # where each vCPU is running
virsh numatune <vm-name>         # NUMA memory policy of the VM`}
      </CodeBlock>

      {/* ══════════ 6. RESOURCE ALLOCATION ══════════ */}
      <h2 id="resource-allocation" style={S.h2}>Resource Allocation and Overcommit</h2>
      <p style={S.p}><strong>CPU overcommit:</strong> Assigning more vCPUs than there are physical threads. It works because not all VMs peak together. The risk: simultaneous heavy load increases ready time and VMs slow down. The right ratio depends on the workload mix — monitor and baseline.</p>
      <ComparisonTable
        title="Typical Resource Controls (names vary by platform)"
        headers={["Control", "What it does", "When to use"]}
        rows={[
          ["Shares / weight", "Relative priority when there is contention", "Give production more than test"],
          ["Reservation", "Guaranteed minimum CPU or RAM", "Critical VMs, latency-sensitive apps"],
          ["Limit", "Hard cap on use", "Rarely — can hurt guest behaviour; prefer right-sizing"],
          ["Resource pool", "Group of VMs sharing a pool of shares/reservations", "Departments, tenants, environments"],
          ["CPU / NUMA pinning", "Fix vCPUs to cores or NUMA node", "Latency-critical, telco, HPC"],
          ["Storage QoS / IOPS limit", "Cap or guarantee disk I/O", "Noisy-neighbour control"],
        ]}
        caption="Use reservations sparingly: every reservation reduces what the cluster can overcommit and what HA can restart."
      />
      <p style={S.p}><strong>Storage thin provisioning:</strong> Assign a 500 GB vDisk but allocate only used space. Efficient — but total promised space can exceed real capacity. When the datastore fills, VMs can pause or crash. Always monitor datastore usage and set alerts.</p>
      <Callout type="warning" title="Overcommit is a tool, not a free lunch">
        CPU overcommit degrades gently (slower VMs). Memory and storage overcommit can fail suddenly (swapping, paused VMs). Treat each resource differently and keep production on conservative ratios.
      </Callout>

      {/* ══════════ 7. MEMORY ══════════ */}
      <h2 id="memory-management" style={S.h2}>Memory Management — Ballooning, Compression, Swap</h2>
      <Figure caption="Fig 5 — Memory overcommit ladder: as host RAM runs out, the hypervisor moves from page sharing and large pages, to ballooning, compression, hypervisor swapping, and finally outage. Each step is more expensive than the last."><MemoryOvercommitLadder /></Figure>
      <DiagramGuide
        title="How to read Fig 5"
        steps={[
          "Read from top (green) to bottom (red). Each box is a stage the host goes through as free memory falls. The right-hand text is the impact on VMs.",
          "Stage 1: plenty of memory — nothing visible happens. Stage 2: ballooning — a driver inside each VM asks the guest to give back pages it is not using. The guest OS chooses what to release, so impact is small.",
          "Stage 3: compression — the hypervisor compresses cold pages in RAM instead of sending them to disk. It costs CPU, but is much faster than disk.",
          "Stage 4: hypervisor swapping — VM memory is written to a swap file on disk. Disk is hundreds or thousands of times slower than RAM, so VMs crawl.",
          "Stage 5: out of options — VMs freeze or are killed. Aim to keep production at stage 1 and use the others only as short-lived safety nets.",
        ]}
      />
      <ul style={S.ul}>
        <li><strong>Memory ballooning:</strong> A driver in the guest (installed with guest tools) inflates inside the VM to pressure the guest OS into releasing unused pages, returning RAM to the host.</li>
        <li><strong>Memory compression:</strong> Compresses rarely used pages in RAM — cheaper than swapping.</li>
        <li><strong>Hypervisor swapping:</strong> Last resort. VM memory goes to a swap file on the host's datastore. Avoid in production.</li>
        <li><strong>Transparent page sharing:</strong> Identical memory pages across VMs are deduplicated. After security concerns, many platforms restrict it by default.</li>
        <li><strong>Large pages:</strong> Improve performance, but reduce sharing and can make memory pressure harder to relieve.</li>
      </ul>
      <Callout type="warning" title="Memory Overcommit Production Risk">
        Use memory overcommit carefully in production, or avoid it. Once swapping starts, VM performance collapses. Provision physical RAM for the sum of VM memory plus hypervisor overhead, with N+1 host headroom. Watch balloon activity and host memory pressure.
      </Callout>
      <p style={S.p}>Server memory behaviour is covered in <TopicLink slug="ram" variant="inline" />: ECC, NUMA and channels still matter under the hypervisor.</p>

      {/* ══════════ 8. LIFECYCLE ══════════ */}
      <h2 id="vm-lifecycle" style={S.h2}>VM Lifecycle</h2>
      <ComparisonTable
        title="VM Lifecycle Stages"
        headers={["Stage", "What happens", "Common mistake"]}
        rows={[
          ["Request / design", "Decide size, network, storage, backup, owner, expiry", "No owner or purpose recorded"],
          ["Create", "New VM from wizard, template or automation — vCPU, vRAM, vDisk, network, OS type", "Oversized 'just in case'"],
          ["Provision", "Install OS (ISO/PXE) or deploy image; install guest tools; patch; join domain", "Skipping guest tools"],
          ["Run", "Power on; deploy workload; add monitoring and backup", "Not added to backup / monitoring"],
          ["Maintain", "OS patches, VM hardware version upgrades, snapshot hygiene", "Leaving snapshots for weeks"],
          ["Migrate", "Live migration, storage migration, cross-cluster moves", "Ignoring compatibility and network rules"],
          ["Decommission", "Confirm backup/retention, shut down, delete VM and disks, remove from DNS/IPAM/CMDB/monitoring", "VM sprawl — powered-off VMs forgotten"],
        ]}
        caption="Lifecycle discipline prevents VM sprawl, the silent waste of CPU, RAM, storage and licences."
      />
      <p style={S.p}><strong>VM sprawl:</strong> Because VMs are easy to create, they multiply. Old test VMs keep consuming storage, backup space and licences. Use naming standards, owner tags, expiry dates and periodic cleanup.</p>

      {/* ══════════ 9. TEMPLATES ══════════ */}
      <h2 id="templates-cloning" style={S.h2}>Templates, Cloning and Images</h2>
      <p style={S.p}><strong>Templates (golden images):</strong> A pre-configured, patched OS image. New VMs deploy from it — fast and consistent. Update the template and all future deployments are updated. Keep a small set of templates, version them, and re-patch regularly.</p>
      <p style={S.p}><strong>Cloning:</strong> An exact copy of a VM. A full clone is independent. A linked clone shares disk blocks with a base — space efficient but dependent on the base. After cloning, customise (sysprep or Linux equivalent) so hostname, IP and machine identity are unique.</p>
      <p style={S.p}><strong>Cloud-init and automation:</strong> On Linux and cloud platforms, cloud-init injects hostname, keys and network on first boot. Infrastructure-as-code tools (Terraform, Ansible, vendor APIs) create VMs repeatably instead of clicking in a console.</p>
      <Callout type="best-practice" title="Treat templates like production code">
        A template with an old password, unpatched OS or leftover agent config will be copied hundreds of times. Review, scan and version every template.
      </Callout>

      {/* ══════════ 10. STORAGE ══════════ */}
      <h2 id="storage-datastores" style={S.h2}>Storage and Datastores</h2>
      <Figure caption="Fig 6 — Virtual disk I/O path: guest application → guest file system → virtual disk controller → hypervisor storage stack → host HBA/NIC → storage network → array → LUN/volume → datastore. Latency can be measured at several layers."><VirtualStoragePath /></Figure>
      <DiagramGuide
        title="How to read Fig 6"
        steps={[
          "Top row, left to right: the request starts in the guest application, passes through the guest file system and driver, then the virtual disk controller (paravirtual such as PVSCSI, virtio-scsi or NVMe).",
          "Next is the hypervisor's storage stack — queues, multipathing and the VMDK/VHDX/QCOW2 file handling — then the host's HBA or NIC (FC, iSCSI, NFS or NVMe-oF).",
          "On the right, the request travels over the storage network to the array's controllers, cache and disks, which present a LUN, volume or share.",
          "The bottom row shows the datastore built on that LUN/volume, where many VM disks live together.",
          "The red box explains latency: what the guest sees equals the hypervisor-kernel part plus the device (array) part. This tells you whether to look at the host queue or at the array and fabric.",
          "Pointers at the bottom: thin disks and snapshots can fill datastores, noisy neighbours steal IOPS, and dual paths are the storage version of dual power feeds.",
        ]}
      />
      <ComparisonTable
        title="Datastore Types"
        headers={["Type", "How it works", "Good for", "Watch out for"]}
        rows={[
          ["Block datastore (FC / iSCSI / NVMe-oF LUN)", "Host formats LUN with a cluster file system (VMFS, CSV, etc.)", "Traditional enterprise arrays", "Zoning, multipath, queue depth, LUN size"],
          ["NFS / SMB datastore", "VM files stored on a file share", "Simple management, file-level access", "Network design, locking, latency"],
          ["Hyper-converged / vSAN-style", "Local disks of hosts pooled into shared storage", "Scale-out, no separate array", "Network quality, failure-tolerance policies, rebuild traffic"],
          ["Local disk", "Disks inside the host", "Edge, lab, scratch", "No shared storage → limited HA / migration"],
        ]}
        caption="Choice depends on platform, performance, skills and budget. See SAN, NAS and DAS articles."
      />
      <p style={S.p}><strong>Thin vs thick disks:</strong> Thick reserves space and gives predictable performance. Thin saves space but needs monitoring. Whichever you use, set datastore alerts at around 70–80% and plan expansion early.</p>
      <p style={S.p}><strong>Performance:</strong> IOPS, throughput and latency all matter. A database VM needs low latency; a backup VM needs throughput. Keep different workloads on appropriate tiers (flash vs capacity).</p>
      <p style={S.p}>Storage background: <TopicLink slug="san" variant="inline" />, <TopicLink slug="nas" variant="inline" />, <TopicLink slug="das" variant="inline" />.</p>

      {/* ══════════ 11. NETWORKING ══════════ */}
      <h2 id="virtual-networking" style={S.h2}>Virtual Networking</h2>
      <Figure caption="Fig 7 — Virtual networking inside a host: VM vNICs connect to port groups on a virtual switch; two uplink NICs trunk VLANs to two top-of-rack switches; management, live-migration and storage traffic use separate VLANs."><VirtualNetworking /></Figure>
      <DiagramGuide
        title="How to read Fig 7"
        steps={[
          "Top row inside the host: three VMs (Web, App, DB), each with a vNIC, plus 'host services' for management, live migration and storage traffic.",
          "Second row: port groups, each with a VLAN. A VM's vNIC is attached to a port group, which decides its VLAN and policies.",
          "Yellow bar: the virtual switch (standard or distributed). It switches frames in software, applies teaming and security policy, and connects everything to the uplinks.",
          "Below the switch: two uplink NICs, the host's physical ports.",
          "Blue lines go out to two ToR switches, trunk ports carrying tagged VLANs. Two NICs to two switches = no single NIC or switch failure.",
          "Note at the bottom: VM-to-VM traffic in the same VLAN on the same host stays inside the host — physical firewalls will not see it unless microsegmentation is used.",
        ]}
      />
      <p style={S.p}><strong>Virtual switch (vSwitch):</strong> A software switch inside the hypervisor. Path: VM → vSwitch → physical NIC → physical switch.</p>
      <p style={S.p}><strong>Port groups and VLANs:</strong> Organise VMs into logical groups with different VLANs and policies. Separate VM traffic from management, live migration and storage traffic.</p>
      <p style={S.p}><strong>NIC teaming / LACP:</strong> Use two or more uplinks for redundancy and bandwidth. Teaming policy must match the physical switch (for example LACP vs static). Mismatch causes flapping and drops.</p>
      <p style={S.p}><strong>Distributed switches:</strong> One virtual switch configuration managed centrally across many hosts, with consistent policy and better monitoring.</p>
      <p style={S.p}><strong>Overlay and SDN:</strong> Platforms such as NSX or open-source alternatives create virtual networks (VXLAN/Geneve) on top of the physical fabric, with distributed firewalls. This enables microsegmentation and fast network provisioning.</p>
      <p style={S.p}>Physical side: <TopicLink slug="switch" variant="inline" />, <TopicLink slug="firewall" variant="inline" />, <TopicLink slug="load-balancer" variant="inline" />.</p>
      <Callout type="common-mistake" title="Forgetting the VLAN on the physical trunk">
        A new VLAN added to a port group but not allowed on the physical switch trunks gives a VM that powers on but has no network. Always change virtual and physical networks together.
      </Callout>

      {/* ══════════ 12. SNAPSHOTS ══════════ */}
      <h2 id="snapshots-backups" style={S.h2}>Snapshots vs Backups</h2>
      <ComparisonTable
        title="Snapshot vs Backup — Critical Distinction"
        headers={["Aspect", "Snapshot", "Backup"]}
        rows={[
          ["What it is", "Point-in-time state of VM (disk, memory, settings)", "Copy of data to a separate location"],
          ["Storage location", "Same datastore — same storage device", "Separate storage, ideally different location"],
          ["Purpose", "Quick rollback before a risky change", "Disaster recovery, long-term retention"],
          ["If storage fails", "Lost (same device)", "Safe (different location)"],
          ["Performance impact", "Degrades over time (delta disk growth)", "None on running VM"],
          ["Application consistency", "Not always — may not flush buffers", "Requires VSS/quiescing for consistency"],
          ["Is it a backup?", "NO", "YES"],
        ]}
        caption="Snapshots are NOT backups. Production environments need proper backup solutions alongside snapshot management."
      />
      <Callout type="danger" title="Snapshots Are NOT Backups">
        A snapshot lives on the same datastore — if storage fails, both the VM and the snapshot are gone. Long-running snapshots degrade VM performance, and the delta disk keeps growing. In production a backup solution (Veeam, Commvault, Veritas, and others) is mandatory. A snapshot is only a temporary safety net for planned changes.
      </Callout>
      <p style={S.p}><strong>Application consistency:</strong> A crash-consistent copy is like pulling the power cord; an application-consistent copy flushes in-flight writes (VSS or quiescing). For databases, use application-consistent backups — otherwise recovery may fail or corrupt data.</p>
      <p style={S.p}><strong>Snapshot hygiene:</strong> Take before a change, delete after verifying — within hours or days, not weeks. Alert on snapshots older than a defined age. Backups: <TopicLink slug="backup" variant="inline" />.</p>

      {/* ══════════ 13. LIVE MIGRATION ══════════ */}
      <h2 id="live-migration" style={S.h2}>Live Migration</h2>
      <p style={S.p}>Live migration moves a running VM from one host to another without shutting it down. Applications keep running. VMware vMotion, Hyper-V Live Migration and KVM live migration are common implementations.</p>
      <Figure caption="Fig 8 — Live migration in five steps: check, pre-copy memory, iterate dirty pages, short switch-over, clean-up. Memory moves over a dedicated migration network."><LiveMigrationSteps /></Figure>
      <DiagramGuide
        title="How to read Fig 8"
        steps={[
          "Top row, left to right: the five stages. Step 1 checks that the destination can run the VM — CPU features, RAM, network and storage access.",
          "Step 2 (pre-copy): memory pages are copied to the destination while the VM keeps running on the source. Step 3: pages changed in the meantime (dirty pages) are copied again; this repeats until the remaining set is small.",
          "Step 4 (switch-over): the VM is paused briefly — milliseconds to seconds — final pages and CPU state are sent, and it resumes on the destination. Step 5: the network learns the new location and the source memory is freed. IP and MAC stay the same.",
          "Middle row: the source host (blue) and destination host (green), with the thick arrow showing the dedicated migration network.",
          "Bottom box: when migration struggles — VMs that change memory faster than the network can copy, passthrough devices, CPU mismatch (needs compatibility mode such as EVC), and cross-storage migrations that copy disks too.",
        ]}
      />
      <p style={S.p}><strong>Traditional requirements:</strong> Shared storage accessible by both hosts, compatible CPUs (or a compatibility mode), enough resources on the destination, and a good network between hosts.</p>
      <Callout type="important" title="Shared Storage Not Always Mandatory">
        VMware Storage vMotion can migrate compute and storage together. KVM live migration with storage copy is possible local-to-local. Hyper-V shared-nothing live migration also exists. Capabilities depend on the hypervisor version and configuration — "shared storage is universally mandatory" is not correct. Verify vendor documentation.
      </Callout>
      <p style={S.p}><strong>Use cases:</strong> Host maintenance (maintenance mode evacuates VMs), load balancing (DRS), hardware refresh and power-aware consolidation.</p>
      <CodeBlock lang="bash" label="KVM/libvirt — live migrate a VM (example pattern)">
{`virsh migrate --live --persistent <vm-name> qemu+ssh://<dest-host>/system
# add --copy-storage-all when disks are local (slower, heavier on network)
# check progress:  virsh domjobinfo <vm-name>`}
      </CodeBlock>

      {/* ══════════ 14. HA ══════════ */}
      <h2 id="ha-clusters" style={S.h2}>HA and Cluster Architecture</h2>
      <Figure caption="Fig 9 — VM cluster HA: Host 1 fails, HA detects the failure and restarts VMs A, B and C on surviving Hosts 2 and 3. Shared storage gives access to the VM disks."><VmClusterHa /></Figure>
      <DiagramGuide
        title="How to read Fig 9"
        steps={[
          "Three hosts form one cluster. Each host runs some VMs. All hosts see the same shared storage at the bottom.",
          "Host 1 fails (shown crossed out). Its VMs A, B and C stop because they ran on that host.",
          "The cluster detects the failure through missing heartbeats and restarts VMs A, B and C on Hosts 2 and 3. They can do so because they can read the same VM disks on shared storage.",
          "Important reading: this is a restart, not a continuation. Applications experience an outage while the guest OS boots again — seconds to minutes depending on the VM and the application.",
          "Capacity lesson: Hosts 2 and 3 must have spare CPU and RAM for the restarted VMs — that is what admission control reserves.",
        ]}
      />
      <p style={S.p}><strong>Cluster:</strong> Several hosts managed as one pool, sharing features like HA, DRS and live migration. Hosts check each other through heartbeats over the management network and storage.</p>
      <p style={S.p}><strong>HA:</strong> Host fails → the cluster detects it → VMs restart on surviving hosts. Recovery time depends on VM boot and application start. No universal fixed time is correct.</p>
      <p style={S.p}><strong>Admission control:</strong> Reserves capacity so N hosts can fail and the remaining hosts can still run all protected VMs. Configure for the failure tolerance you need (1 host, 2 hosts or a percentage).</p>
      <p style={S.p}><strong>Split-brain and isolation:</strong> If a host loses the management network but still sees storage, the cluster must decide whether to restart its VMs elsewhere. Datastore heartbeating, isolation responses and proper network redundancy prevent duplicate VMs.</p>
      <p style={S.p}><strong>Fault Tolerance:</strong> VMware FT (and similar) keeps a lockstep shadow VM on another host. If the primary fails, the shadow takes over instantly with no restart. Overhead is significant, so use it for very critical VMs only.</p>
      <p style={S.p}><strong>Application-level HA:</strong> Databases and middleware clusters (Always On, Patroni, Pacemaker and others) give faster failover and survive guest OS failures, which hypervisor HA cannot see. Use both layers for critical services.</p>

      {/* ══════════ 15. DRS ══════════ */}
      <h2 id="drs-affinity" style={S.h2}>DRS, Affinity and Resource Pools</h2>
      <p style={S.p}><strong>DRS (Distributed Resource Scheduler) and similar schedulers:</strong> Watch cluster load and live-migrate VMs when hosts become imbalanced. They also place new VMs. Modes range from manual recommendations to fully automatic.</p>
      <ComparisonTable
        title="Placement Rules"
        headers={["Rule", "Meaning", "Example"]}
        rows={[
          ["VM-VM affinity", "Keep VMs together on the same host", "App and cache that talk heavily"],
          ["VM-VM anti-affinity", "Keep VMs on different hosts", "Two nodes of a database cluster, two domain controllers"],
          ["VM-Host affinity", "Pin VMs to a group of hosts", "Licence-bound VMs on licensed hosts"],
          ["VM-Host anti-affinity", "Keep VMs away from certain hosts", "Avoid hosts with limited network"],
          ["Fault-domain aware", "Spread by chassis, rack or room", "Cross-chassis placement for blades"],
        ]}
        caption="Rules make failure behaviour predictable but reduce scheduling freedom; review them regularly."
      />
      <p style={S.p}>Anti-affinity across racks, power feeds and blade chassis (<TopicLink slug="blade-server" variant="inline" />) is how you make the virtual layer respect the physical failure domains.</p>
      <p style={S.p}><strong>Resource pools:</strong> Group VMs so that a team or tenant gets a guaranteed share and cannot starve others. Do not use pools as folders — shares in nested pools can produce surprising results.</p>

      {/* ══════════ 16. MANAGEMENT ══════════ */}
      <h2 id="management-plane" style={S.h2}>Virtualisation Management Plane</h2>
      <p style={S.p}><strong>VMware vCenter Server:</strong> Central management for ESXi hosts, VMs, clusters and datastores — HA, DRS, vMotion, permissions, templates. If vCenter is down, running VMs continue, but management operations (new VMs, vMotion, some HA configuration) are unavailable.</p>
      <p style={S.p}><strong>Microsoft SCVMM / Windows Admin Center / Failover Cluster Manager:</strong> Management for Hyper-V environments.</p>
      <p style={S.p}><strong>Proxmox, oVirt/RHV-style, OpenStack, CloudStack:</strong> Open-source or open-core platforms for KVM — many data centers run them for private cloud.</p>
      <p style={S.p}>The management plane handles lifecycle, resource allocation, RBAC, monitoring, alerts and compliance. Plan its availability: HA for management servers, tested backups of its database/configuration, restricted network access and strong authentication.</p>
      <Callout type="warning" title="Protect the management plane like a domain controller">
        Whoever controls the management plane controls every VM. Use MFA, separate admin accounts, a management VLAN, logging and patching on a fast schedule.
      </Callout>

      {/* ══════════ 17. PLATFORMS ══════════ */}
      <h2 id="hypervisor-platforms" style={S.h2}>Hypervisor Platforms Compared</h2>
      <p style={S.p}>Most data centers meet one or more of these platforms. The concepts are the same; the tools, licensing and management planes differ.</p>
      <ComparisonTable
        title="Common Platforms"
        headers={["Platform", "Type / basis", "Typical strengths", "Typical use"]}
        rows={[
          ["VMware ESXi + vCenter", "Type 1, proprietary", "Mature HA/DRS/vMotion, large ecosystem, broad hardware and storage support", "Enterprise and colocation private cloud"],
          ["Microsoft Hyper-V", "Type 1, Windows-based", "Tight Windows / Active Directory integration, Failover Clustering, Storage Spaces Direct", "Windows-heavy enterprises, Azure Stack style setups"],
          ["KVM (+ libvirt / QEMU)", "Type 1 semantics, Linux kernel module", "Open source, flexible, powers most public clouds and OpenStack", "Cloud providers, Linux-centric teams"],
          ["Proxmox VE", "KVM + LXC with a web UI", "Low cost, built-in clustering, Ceph integration", "SMBs, labs, cost-sensitive private cloud"],
          ["OpenStack / CloudStack", "Cloud platform over KVM (or others)", "Self-service, multi-tenant, API driven", "Service providers, large private clouds"],
          ["Xen / XCP-ng", "Type 1, microkernel style", "Strong isolation heritage, open source", "Hosting providers, some legacy clouds"],
          ["Nutanix AHV", "KVM-based, HCI", "Integrated compute + storage, simple management", "HCI deployments"],
        ]}
        caption="Platform choice is driven by existing skills, licensing, ecosystem and support — not just features."
      />
      <Callout type="warning" title="Licensing and packaging change often">
        Vendors rename products, change editions and revise licensing models regularly. Treat any comparison as a starting point, and check current vendor documentation and contracts before choosing a platform.
      </Callout>
      <p style={S.p}><strong>Hyperscalers:</strong> Public clouds (<TopicLink slug="aws" variant="inline" />, <TopicLink slug="azure" variant="inline" />, <TopicLink slug="gcp" variant="inline" />) run customised hypervisors on their own hardware and expose VMs as instances. The ideas you learn here — vCPU, overcommit, live migration — apply there too.</p>

      {/* ══════════ 18. PASSTHROUGH ══════════ */}
      <h2 id="hardware-passthrough" style={S.h2}>Passthrough, SR-IOV and vGPU</h2>
      <p style={S.p}>Normally the hypervisor emulates devices, which costs CPU and adds latency. For some workloads you want the VM to use real hardware directly.</p>
      <p style={S.p}><strong>PCI passthrough (DirectPath I/O):</strong> A whole physical device is given to one VM using VT-d / IOMMU. The VM gets near-native performance. The cost: that VM usually cannot live-migrate freely, and the device belongs to it alone.</p>
      <p style={S.p}><strong>SR-IOV:</strong> One physical NIC presents many lightweight virtual functions (VFs). Each VM gets a VF and talks to the hardware almost directly. Great for low-latency networking and NFV, but it bypasses some virtual-switch features and can limit mobility.</p>
      <p style={S.p}><strong>vGPU and GPU partitioning:</strong> One physical <TopicLink slug="gpu" variant="inline" /> is shared between several VMs through vendor virtualisation software, or partitioned in hardware (for example MIG-style slicing). Used for VDI, AI inference and shared development.</p>
      <ComparisonTable
        title="Choosing an I/O Method"
        headers={["Method", "Performance", "Sharing", "Live migration", "Typical use"]}
        rows={[
          ["Emulated device", "Lowest", "Many VMs", "Easy", "Legacy / simple VMs"],
          ["Paravirtual (virtio, VMXNET3)", "High", "Many VMs", "Easy", "Default choice for most VMs"],
          ["SR-IOV", "Very high", "Limited by VF count", "Restricted", "Low-latency network, NFV"],
          ["Passthrough", "Near native", "One VM per device", "Usually not possible", "GPU, NVMe, special cards"],
          ["vGPU / partitioning", "High", "Several VMs", "Depends on vendor support", "VDI, AI inference"],
        ]}
        caption="More direct access means more performance but less flexibility — pick the least direct method that meets the requirement."
      />
      <Callout type="common-mistake" title="Passthrough quietly breaks mobility">
        A cluster full of passthrough VMs cannot evacuate hosts easily, and HA may need special handling. Plan maintenance windows and capacity for these VMs separately.
      </Callout>

      {/* ══════════ 19. CAPACITY ══════════ */}
      <h2 id="capacity-planning" style={S.h2}>Capacity Planning and Host Sizing</h2>
      <p style={S.p}>Capacity planning answers one question: how many hosts, of what size, do we need — today and in 18 months — while still surviving failures?</p>
      <h3 style={S.h3}>Step 1 — Know the workload</h3>
      <p style={S.p}>Collect real CPU, memory, disk IOPS and network numbers over at least a full business cycle, including month-end peaks. Do not size from VM settings alone; measure actual use.</p>
      <h3 style={S.h3}>Step 2 — Choose a consolidation ratio</h3>
      <p style={S.p}>vCPU:pCore ratios of 2:1 to 4:1 are common for general servers, lower for latency-sensitive databases, and 1:1 for real-time or GPU-feeding workloads. Memory is usually sized close to 1:1 for production.</p>
      <h3 style={S.h3}>Step 3 — Add failure headroom (N+1 / N+2)</h3>
      <p style={S.p}>If one host fails, the remaining hosts must carry the load. A cluster of 6 hosts that must tolerate 1 failure should run at no more than about 5/6 (roughly 83%) of its total capacity before accounting for any other buffer. For higher tiers or large failure domains (a whole blade chassis, see <TopicLink slug="blade-server" variant="inline" />), reserve more.</p>
      <CodeBlock lang="text" label="Quick sizing example (illustrative numbers)">
{`Demand:   600 vCPUs at 4:1  -> 150 physical cores
          4 TB RAM (production, ~1:1)
Host:     2 sockets x 32 cores = 64 cores, 1 TB RAM
Raw need: cores 150/64 = 2.3 hosts ; RAM 4/1 = 4 hosts   -> RAM is the limit
N+1:      4 + 1 = 5 hosts (before growth)
Growth:   +25% over 18 months -> plan for 6 hosts`}
      </CodeBlock>
      <p style={S.p}>Notice that RAM, not CPU, decided the host count here. That is common — see <TopicLink slug="ram" variant="inline" /> and <TopicLink slug="cpu" variant="inline" /> for how to pick the right balance per host.</p>
      <p style={S.p}><strong>Also size:</strong> storage capacity and IOPS, network uplinks (migration and storage traffic), licences (per core or per socket), and the power and cooling for the final host count.</p>

      {/* ══════════ 20. BIOS ══════════ */}
      <h2 id="host-bios-settings" style={S.h2}>Host BIOS and Firmware Settings</h2>
      <p style={S.p}>A hypervisor can only use what the BIOS lets it see. Wrong settings are a very common cause of "VM will not start" and "performance is poor".</p>
      <ComparisonTable
        title="Settings to Check Before Installing a Hypervisor"
        headers={["Setting", "Why it matters", "Typical choice"]}
        rows={[
          ["Intel VT-x / AMD-V", "Hardware CPU virtualisation. Without it, 64-bit VMs will not run", "Enabled"],
          ["EPT / NPT (SLAT)", "Hardware memory virtualisation; large speed-up", "Enabled"],
          ["VT-d / AMD-Vi (IOMMU)", "Needed for passthrough and safe DMA isolation", "Enabled"],
          ["SR-IOV", "Allows virtual functions on supported NICs", "Enabled if used"],
          ["NUMA / Node interleaving", "Interleaving hides NUMA from the hypervisor", "NUMA on, node interleaving off"],
          ["Power profile", "Power-saving states add wake-up latency", "Maximum performance or OS/vendor-recommended"],
          ["Hyper-Threading / SMT", "More logical CPUs; some security guidance may disable it", "Per vendor and security policy"],
          ["Boot mode / Secure Boot / TPM", "Required for some features and attestation", "UEFI, per hypervisor guidance"],
          ["Firmware versions", "NIC, HBA and BIOS bugs cause PSODs and drops", "Match the vendor compatibility list"],
        ]}
        caption="Apply settings consistently across all hosts in a cluster — mixed settings cause odd migration and performance problems."
      />
      <Callout type="best-practice" title="Use a host profile or configuration baseline">
        Capture the correct BIOS and hypervisor settings once and apply them to every host. Drift between hosts is a silent cause of intermittent problems.
      </Callout>

      {/* ══════════ 21. POWER COOLING ══════════ */}
      <h2 id="power-cooling" style={S.h2}>Power, Cooling and Density</h2>
      <p style={S.p}>Virtualisation reduces the number of servers, but the remaining hosts run hotter and draw more. A rack of well-loaded virtualisation hosts can be 10 to 20 kW or more.</p>
      <p style={S.p}><strong>Power:</strong> Each host should use two PSUs on separate feeds (A and B) from <TopicLink slug="pdu" variant="inline" /> units backed by <TopicLink slug="ups" variant="inline" />. If a rack feed fails, every host must keep running on the other. Remember N+1 maths: after a feed loss, the surviving PSUs must carry the full load.</p>
      <p style={S.p}><strong>Cooling:</strong> Dense hosts need good <TopicLink slug="airflow-management" variant="inline" /> and <TopicLink slug="containment" variant="inline" />. Consolidation increases heat per rack, even though total room load may fall.</p>
      <p style={S.p}><strong>Power capping and DPM:</strong> Distributed Power Management can power down idle hosts overnight. This saves energy but can slow HA restarts and add wake-up delay. Many Tier III and IV sites keep it off or use conservative settings for critical clusters.</p>
      <Callout type="important" title="Consolidation moves risk, it does not remove it">
        Fewer, bigger hosts means each host failure affects more VMs. Choose host size and rack distribution with the failure domain in mind.
      </Callout>

      {/* ══════════ 22. INSTALLATION ══════════ */}
      <h2 id="installation-deployment" style={S.h2}>Installation and Cluster Build</h2>
      <p style={S.p}>A reliable build is repeatable. Follow the same order every time and record what you did.</p>
      <ol style={S.ul}>
        <li><strong>Design and plan:</strong> Network VLANs and IP plan, storage layout, naming, cluster size, licences, change approval.</li>
        <li><strong>Prepare hardware:</strong> Rack, cable (power A/B, management, data, storage), update firmware, set BIOS options from the baseline.</li>
        <li><strong>Install the hypervisor:</strong> Boot from mirrored M.2 / SD alternatives per vendor guidance, or from SAN; set hostname, management IP, NTP and DNS.</li>
        <li><strong>Network:</strong> Create virtual switches, uplinks, port groups and VLANs; keep management, migration and storage separate.</li>
        <li><strong>Storage:</strong> Connect to shared storage or build the HCI pool; verify multipathing and that every host sees the same datastores.</li>
        <li><strong>Management plane:</strong> Deploy and secure the manager, add hosts, create the cluster.</li>
        <li><strong>Cluster features:</strong> Enable HA, DRS, anti-affinity rules, admission control, EVC mode if CPUs differ.</li>
        <li><strong>Templates and standards:</strong> Build golden images, tags, backup jobs and monitoring.</li>
      </ol>
      <CodeBlock lang="bash" label="Sanity checks on a KVM host before use (example)">
{`egrep -c '(vmx|svm)' /proc/cpuinfo      # >0 means VT-x / AMD-V visible
lsmod | grep kvm                          # kvm_intel or kvm_amd loaded
dmesg | grep -i -e DMAR -e IOMMU          # IOMMU active
virsh nodeinfo                            # CPUs, memory as seen by libvirt`}
      </CodeBlock>

      {/* ══════════ 23. TESTING ══════════ */}
      <h2 id="testing-commissioning" style={S.h2}>Testing and Commissioning</h2>
      <p style={S.p}>Never hand over a cluster that has only been tested while everything works. Test the failure paths on purpose, before production.</p>
      <ComparisonTable
        title="Typical Commissioning Tests"
        headers={["Test", "What you do", "What you expect"]}
        rows={[
          ["Live migration", "Move test VMs between every pair of hosts", "No dropped sessions, short pause only"],
          ["Host failure (HA)", "Power off or isolate a host in a controlled way", "VMs restart on other hosts within the design time"],
          ["Maintenance mode", "Evacuate a host, patch, return", "No service impact"],
          ["Network path loss", "Pull one uplink / disable one ToR port", "Traffic continues on the second path"],
          ["Storage path loss", "Disable one storage path or controller", "I/O continues, no VM pause"],
          ["Power feed loss", "Switch off one rack feed (with approval)", "All hosts stay up on the other PSU"],
          ["Backup restore", "Restore a VM to a test location", "VM boots; data intact; time measured"],
          ["Performance baseline", "Run representative load", "Latency and ready time within targets"],
        ]}
        caption="Write down the expected result before you test; unplanned surprises are findings."
      />
      <Callout type="important" title="Test restore, not just backup">
        A backup job that shows green is not proof. Restore at least a few VMs and measure the time. That number is your real RTO input.
      </Callout>

      {/* ══════════ 24. MONITORING ══════════ */}
      <h2 id="monitoring" style={S.h2}>Monitoring Virtual Infrastructure</h2>
      <p style={S.p}>Guest tools only show what the VM sees. You also need the host view. Together they tell the real story.</p>
      <ComparisonTable
        title="Key Metrics"
        headers={["Area", "Metric", "Worry when"]}
        rows={[
          ["CPU", "CPU ready / steal time", "Sustained above a few percent per vCPU (use vendor guidance)"],
          ["CPU", "Host utilisation", "Cluster cannot survive the loss of one host"],
          ["Memory", "Ballooning, compression, swap", "Any sustained swap-in activity"],
          ["Memory", "Active vs consumed memory", "Consumed near host capacity with growing demand"],
          ["Storage", "Read/write latency (guest and datastore)", "Consistently high, or a big gap between guest and datastore"],
          ["Storage", "Datastore free space / snapshots", "Free space low, snapshots older than agreed days"],
          ["Network", "Dropped packets, uplink utilisation", "Drops or one uplink saturated"],
          ["Cluster", "HA state, alarms, host connectivity", "Any host not responding or HA disabled"],
        ]}
        caption="Alert on trends and thresholds, then review them regularly so alerts stay meaningful."
      />
      <p style={S.p}>Feed events into central logging and the wider monitoring stack — <TopicLink slug="dcim" variant="inline" /> and <TopicLink slug="bms" variant="inline" /> — so a host temperature alarm and a VM slowdown can be seen together.</p>

      {/* ══════════ 25. MAINTENANCE ══════════ */}
      <h2 id="maintenance" style={S.h2}>Maintenance and Patching</h2>
      <p style={S.p}>The standard pattern is rolling maintenance: take one host at a time, move its VMs away, patch, test and return it.</p>
      <ol style={S.ul}>
        <li>Confirm the cluster can lose one more host (HA admission control still satisfied).</li>
        <li>Put the host in maintenance mode; VMs live-migrate automatically.</li>
        <li>Apply hypervisor, firmware and driver updates from the validated list.</li>
        <li>Reboot, verify connectivity, storage paths and health, then exit maintenance mode.</li>
        <li>Move to the next host only after the previous one is stable.</li>
      </ol>
      <p style={S.p}><strong>Also routine:</strong> Remove stale snapshots, check datastore free space, review backup reports, test HA periodically, review rules, and patch the management plane and guest tools.</p>
      <Callout type="maintenance" title="Patch in rings">
        Test updates on a lab or non-production cluster first, then a small production group, then the rest. Keep compatibility matrices (hypervisor, firmware, driver, storage) in front of you.
      </Callout>

      {/* ══════════ 26. RPO RTO ══════════ */}
      <h2 id="rpo-rto" style={S.h2}>RPO, RTO and Disaster Recovery</h2>
      <p style={S.p}><strong>RPO (Recovery Point Objective):</strong> How much data you can afford to lose, measured in time. RPO of 15 minutes means backups or replication at least every 15 minutes.</p>
      <p style={S.p}><strong>RTO (Recovery Time Objective):</strong> How long you can be down. RTO of 1 hour means everything must be running again within one hour.</p>
      <ComparisonTable
        title="Protection Methods"
        headers={["Method", "Typical RPO", "Typical RTO", "Notes"]}
        rows={[
          ["Image backup to local disk", "Hours to a day", "Hours", "Cheap; same site"],
          ["Backup to remote / immutable storage", "Hours to a day", "Hours", "Protects against ransomware and site loss"],
          ["Storage-level replication", "Minutes", "Minutes to an hour", "Array-based; needs compatible arrays"],
          ["Hypervisor replication", "Minutes", "Minutes to an hour", "Per-VM, flexible, async"],
          ["Stretched cluster / synchronous", "Near zero", "Minutes", "Needs low latency and a witness; complex"],
        ]}
        caption="Lower RPO/RTO means more cost and more design effort. Match the method to business criticality."
      />
      <p style={S.p}>Backup and DR are broader topics — see <TopicLink slug="backup" variant="inline" /> and <TopicLink slug="disaster-recovery" variant="inline" />. A DR plan must be documented, tested at least yearly, and include the order in which VMs should start (databases before applications).</p>

      {/* ══════════ 27. VM VS CONTAINERS ══════════ */}
      <h2 id="vm-vs-containers" style={S.h2}>VM vs Containers</h2>
      <p style={S.p}>A VM virtualises hardware and runs a full guest OS. A container shares the host kernel and isolates processes. Different tools for different jobs.</p>
      <ComparisonTable
        title="VM vs Container"
        headers={["Aspect", "VM", "Container"]}
        rows={[
          ["Isolation", "Strong — separate kernel", "Weaker — shared kernel"],
          ["Startup time", "Seconds to minutes", "Milliseconds to seconds"],
          ["Size", "GBs (full OS)", "MBs (app + libraries)"],
          ["OS support", "Any guest OS", "Same kernel family as host"],
          ["Density per host", "Tens", "Hundreds"],
          ["Typical use", "Legacy apps, multi-tenant, mixed OS", "Microservices, CI/CD, cloud-native"],
        ]}
        caption="In production they are usually combined: containers run inside VMs for isolation and easier operations."
      />
      <p style={S.p}>Kubernetes clusters in most enterprises run on virtual machines. The VM layer provides tenant isolation, hardware abstraction and live migration; the container layer provides packaging and fast scaling.</p>

      {/* ══════════ 28. SECURITY ══════════ */}
      <h2 id="security-isolation" style={S.h2}>Virtualisation Security and Isolation</h2>
      <p style={S.p}>The hypervisor is a high-value target: compromise it and you may reach every VM. Isolation is strong, but not magic.</p>
      <ul style={S.ul}>
        <li><strong>VM escape:</strong> A rare class of vulnerability where code in a VM attacks the hypervisor. Patch promptly and reduce attack surface (disable unused virtual devices).</li>
        <li><strong>Side-channel attacks:</strong> Spectre, Meltdown and similar issues can leak data between VMs sharing a CPU. Mitigations (microcode, hypervisor and guest patches, scheduler options) cost some performance.</li>
        <li><strong>VM sprawl:</strong> Forgotten VMs miss patches and become entry points. Track ownership and expiry.</li>
        <li><strong>Snapshot and backup exposure:</strong> Snapshots and backups contain memory and secrets. Protect them like production data.</li>
        <li><strong>Network segmentation:</strong> Use VLANs plus microsegmentation / distributed firewalls (<TopicLink slug="firewall" variant="inline" />) so a compromised VM cannot move sideways.</li>
        <li><strong>Management access:</strong> MFA, role-based access, separate admin network, audit logs.</li>
        <li><strong>Trusted boot:</strong> Secure Boot, TPM and virtual TPM (vTPM) support attestation and disk encryption in guests.</li>
        <li><strong>Immutable backups:</strong> Ransomware often targets backup and hypervisor management first; keep an offline or immutable copy.</li>
      </ul>

      {/* ══════════ 29. TROUBLESHOOTING ══════════ */}
      <h2 id="troubleshooting" style={S.h2}>Troubleshooting Virtualisation</h2>
      <Figure caption="Fig 10 — Troubleshooting flow: decide whether one VM or many are affected, check the guest, then walk through host CPU, memory, storage and network, and finally fix, validate and document."><VirtTroubleshootFlow /></Figure>
      <DiagramGuide
        title="How to read Fig 10"
        steps={[
          "Start at the red box: a complaint that a VM is slow or down. The first question (blue box) is scope — is it one VM or many VMs on a host or cluster?",
          "Left path (ONE VM): look inside the guest first — process CPU, memory, disk and logs. If the guest looks healthy but still slow, the cause is on the host side: ready time, ballooning or storage latency.",
          "Right path (MANY): go to host and cluster level — events, alarms, HA state. Then walk the column top to bottom: CPU ready, memory pressure, storage latency and space, and finally network uplinks and drops.",
          "Both paths end in the green box: fix, validate that metrics are back to baseline, and document the cause so it can be prevented.",
          "Footer note: ready time, balloon and datastore latency are invisible inside the guest, so always check the host view too.",
        ]}
      />
      <ComparisonTable
        title="Symptom to Likely Cause"
        headers={["Symptom", "Likely cause", "First check"]}
        rows={[
          ["VM slow, guest CPU low", "High CPU ready, noisy neighbour, NUMA spread", "Host CPU ready / steal time"],
          ["VM slow, disk heavy", "Datastore latency, snapshots, array queue", "Datastore latency, snapshot age"],
          ["VM freezes or pauses", "Datastore full or storage path down", "Datastore free space, path state"],
          ["VM will not power on", "Insufficient resources, reservation, lock, missing disk", "Task / event log, host resources"],
          ["Migration fails", "CPU mismatch, network issue, passthrough device", "Compatibility mode, migration network"],
          ["HA did not restart VMs", "HA disabled, admission control, isolation settings", "Cluster HA status and logs"],
          ["Random network drops", "VLAN mismatch, uplink flap, driver / firmware bug", "Uplink state, switch port logs"],
          ["Host purple screen / crash", "Hardware fault, driver bug, memory error", "Hardware logs, firmware list"],
        ]}
        caption="Use symptoms to pick the first check, but confirm with metrics before changing anything."
      />
      <h3 style={S.h3}>VM Is Slow</h3>
      <p style={S.p}>Check inside the guest for a runaway process first. If the guest is idle but slow, look at host CPU ready time, memory ballooning or swapping, and datastore latency. A common root cause is host overcommit or an old snapshot.</p>
      <h3 style={S.h3}>VM Will Not Start</h3>
      <p style={S.p}>Read the error. Typical causes: not enough host memory for the reservation, a missing or locked virtual disk, a datastore that is full or unreachable, or a compatibility issue. Fix the cause, do not just retry.</p>
      <h3 style={S.h3}>Live Migration Failing</h3>
      <p style={S.p}>Check CPU compatibility (use EVC or a compatibility mode), the migration network and MTU, storage visibility on both hosts, and any attached passthrough devices or ISO files.</p>
      <h3 style={S.h3}>HA Not Triggering</h3>
      <p style={S.p}>Confirm HA is enabled, the failed host was really detected as failed (not just isolated), admission control allows restart, and the restart priority and isolation response are configured.</p>
      <h3 style={S.h3}>Datastore Full — VMs Pausing</h3>
      <p style={S.p}>Thin-provisioned disks or snapshot delta files have grown beyond capacity. Immediate: free or add space, or migrate VMs to another datastore, and consolidate stale snapshots. Long term: capacity alerts and snapshot policy.</p>
      <h3 style={S.h3}>High CPU Ready Time</h3>
      <p style={S.p}>VMs are waiting for physical CPUs. Reduce overcommit, right-size oversized VMs (fewer vCPUs is often faster), migrate VMs to a less loaded host, and use shares or reservations for critical VMs.</p>
      <Callout type="interview" title="A useful rule">
        If a VM is slow and the guest looks fine, the problem is almost always on the host side: CPU ready, memory reclaim, or storage latency. Look at the host view.
      </Callout>

      {/* ══════════ 30. FAILURE SCENARIOS ══════════ */}
      <h2 id="failure-scenarios" style={S.h2}>Failure Scenarios</h2>
      <ComparisonTable
        title="What Happens When Something Fails"
        headers={["Failure", "Immediate effect", "What should happen", "Design lesson"]}
        rows={[
          ["Single host crash", "VMs on it stop", "HA restarts them on other hosts (minutes)", "N+1 capacity and restart priorities"],
          ["Network isolation of a host", "Host alive but cut off", "Isolation response (leave on / shut down / power off) per policy", "Redundant uplinks and heartbeat paths"],
          ["Split brain in a stretched cluster", "Two sites both think they own VMs", "Witness decides the survivor", "Third-site witness and clear tie-break rules"],
          ["Storage array / datastore failure", "Many VMs lose disks", "Failover to replica or restore from backup", "Replication, multipath, spread across arrays"],
          ["Management plane down", "Running VMs fine; no changes", "Restore manager from backup, HA continues", "Back up and protect the manager itself"],
          ["Datastore full", "VMs pause or crash", "Free space, consolidate snapshots", "Capacity alarms and thin-provisioning policy"],
          ["Snapshot storm", "Latency spikes, long consolidation", "Consolidate gradually", "Snapshot age limits, no long-term snapshots"],
          ["Ransomware via management", "Mass encryption or deletion", "Restore from immutable backup", "Isolated management, MFA, immutable copies"],
          ["Whole rack or feed loss", "All hosts in the rack impacted", "VMs restart elsewhere if spread", "Anti-affinity across racks and feeds"],
        ]}
        caption="Every failure scenario should be mapped to a documented runbook and, where possible, tested."
      />
      <p style={S.p}><strong>Restart storms:</strong> After a big failure, hundreds of VMs boot at once and hammer storage and CPU. Use restart priorities, delays and orchestration so critical systems (directory, DNS, databases) come first.</p>

      {/* ══════════ 31. TIER III / IV ══════════ */}
      <h2 id="tier-iii-iv-view" style={S.h2}>Tier III and Tier IV View</h2>
      <p style={S.p}>Tier classification mostly describes the physical facility, but virtualisation design must match it. The hypervisor layer should not become the weak link in a concurrently maintainable or fault-tolerant site.</p>
      <ComparisonTable
        title="Typical Design Approach"
        headers={["Area", "Tier III style", "Tier IV style"]}
        rows={[
          ["Host power", "Dual PSU on A/B feeds; host maintainable without VM impact", "Same, with fully independent fault-tolerant paths"],
          ["Cluster spare", "N+1 hosts, rolling maintenance", "N+1 or N+2, spread across independent zones"],
          ["Network", "Dual ToR, redundant uplinks", "Fully independent fabrics A and B"],
          ["Storage", "Redundant controllers and paths", "Independent arrays or synchronous replication across zones"],
          ["Placement", "Anti-affinity across hosts and racks", "Anti-affinity across rooms or fault zones"],
          ["Management plane", "HA manager, tested backup", "Distributed or multi-site management"],
          ["DR", "Second site with tested replication", "Active-active or tightly managed active-passive"],
        ]}
        caption="Illustrative only. Actual implementation depends on project requirements, utility requirements, OEM design and data center architecture — always verify with vendor documentation."
      />
      <p style={S.p}>Remember that a Tier rating does not protect an application that is installed on a single VM. Application design and VM placement decide whether the facility's redundancy is actually used.</p>

      {/* ══════════ 32. SAFETY ══════════ */}
      <h2 id="safety-practices" style={S.h2}>Safety and Change Discipline</h2>
      <p style={S.p}>Virtualisation safety is mostly about protecting people from mistakes and protecting production from changes.</p>
      <ul style={S.ul}>
        <li><strong>Change control:</strong> Every host, network or storage change has an approval, a rollback plan and a window.</li>
        <li><strong>Never work alone on live clusters:</strong> A second person verifies destructive actions such as deleting VMs, datastores or snapshots.</li>
        <li><strong>Check before maintenance mode:</strong> Confirm the cluster can lose that host and that no passthrough or pinned VMs will block evacuation.</li>
        <li><strong>Confirm the target:</strong> Many outages come from acting on the wrong VM, datastore or host with similar names.</li>
        <li><strong>Physical safety:</strong> When touching hosts in the rack, follow site rules — lifting, ESD, and lockout for power work. See <TopicLink slug="server-basics" variant="inline" />.</li>
        <li><strong>Backup before risk:</strong> Verified backup, not just a snapshot, before upgrades.</li>
        <li><strong>Least privilege:</strong> Separate read-only, operator and administrator roles.</li>
      </ul>

      {/* ══════════ 33. MISCONCEPTIONS ══════════ */}
      <h2 id="misconceptions" style={S.h2}>Common Misconceptions</h2>
      <ul style={S.ul}>
        <li><strong>"A VM is just software, so it cannot fail."</strong> It depends on hosts, storage, network and power.</li>
        <li><strong>"HA means zero downtime."</strong> HA restarts VMs; there is an outage of minutes. Only FT or application clustering avoids it.</li>
        <li><strong>"Snapshots are backups."</strong> They live on the same storage and degrade performance.</li>
        <li><strong>"More vCPUs make a VM faster."</strong> Often the opposite — bigger VMs wait longer for free cores.</li>
        <li><strong>"Type 2 hypervisors are used in data centers."</strong> Almost never for production.</li>
        <li><strong>"Live migration needs shared storage always."</strong> Many platforms support shared-nothing migration.</li>
        <li><strong>"Containers replace VMs."</strong> They usually run on top of VMs.</li>
      </ul>

      {/* ══════════ 34. FUTURE ══════════ */}
      <h2 id="future-trends" style={S.h2}>Future Trends</h2>
      <ul style={S.ul}>
        <li><strong>DPUs and SmartNICs:</strong> Offload virtual switching, storage and security from host CPUs.</li>
        <li><strong>Confidential computing:</strong> Memory encryption for VMs so even the hypervisor cannot read guest data.</li>
        <li><strong>GPU virtualisation and AI clusters:</strong> Sharing and slicing accelerators — see <TopicLink slug="ai-gpu" variant="inline" /> and <TopicLink slug="gpu-cluster" variant="inline" />.</li>
        <li><strong>Kubernetes-native virtualisation:</strong> Running VMs alongside containers on one platform (KubeVirt style).</li>
        <li><strong>Hyperconverged and composable infrastructure:</strong> Compute, storage and network pooled in software.</li>
        <li><strong>Automation:</strong> Infrastructure-as-code, policy-driven placement and AI-assisted capacity planning.</li>
        <li><strong>Lightweight isolation:</strong> MicroVMs (Firecracker style) for fast, secure serverless workloads.</li>
      </ul>

      {/* ══════════ 35. LEARNING PATH ══════════ */}
      <h2 id="learning-path" style={S.h2}>Learning Path</h2>
      <ol style={S.ul}>
        <li>Understand the hardware: <TopicLink slug="server-basics" variant="inline" />, <TopicLink slug="cpu" variant="inline" />, <TopicLink slug="ram" variant="inline" />.</li>
        <li>Learn how storage is attached: <TopicLink slug="das" variant="inline" />, <TopicLink slug="nas" variant="inline" />, <TopicLink slug="san" variant="inline" />.</li>
        <li>Learn the network: <TopicLink slug="switch" variant="inline" />, <TopicLink slug="load-balancer" variant="inline" />.</li>
        <li>Build a lab with KVM or Proxmox and try live migration and snapshots.</li>
        <li>Study HA, DR and backup: <TopicLink slug="backup" variant="inline" />, <TopicLink slug="disaster-recovery" variant="inline" />.</li>
        <li>Move to cloud and AI platforms: <TopicLink slug="cloud-vs-data-center" variant="inline" />, <TopicLink slug="what-is-ai-infrastructure" variant="inline" />.</li>
      </ol>

      {/* ══════════ 36. INTERVIEW ══════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: What is the difference between a Type 1 and a Type 2 hypervisor? Where does KVM fit?</h3>
      <p style={S.p}><strong>Answer:</strong> Type 1 runs directly on hardware — no host OS, lower overhead, data center standard (ESXi, Hyper-V, KVM). Type 2 runs as a process on a host OS — VirtualBox, Workstation — for dev/test. KVM is a Linux kernel module that turns the kernel into a Type 1 hypervisor. Hyper-V is also Type 1 — the Windows parent partition runs as a privileged VM on top of the hypervisor.</p>
      <h3 style={S.h3}>Q2: What is the difference between a snapshot and a backup?</h3>
      <p style={S.p}><strong>Answer:</strong> A snapshot is a point-in-time state on the same storage — for quick rollback before a risky change. If that storage fails, the snapshot is lost too, and long-running snapshots degrade performance. A backup copies data to a separate location for disaster recovery. Production needs both.</p>
      <h3 style={S.h3}>Q3: What conditions are required for live migration?</h3>
      <p style={S.p}><strong>Answer:</strong> Traditionally: shared storage, compatible CPUs (or EVC mode), network connectivity between hosts and enough resources on the destination. Shared storage is not universally mandatory — Storage vMotion, KVM storage migration and Hyper-V shared-nothing migration also exist. Check vendor documentation.</p>
      <h3 style={S.h3}>Q4: VM vs container — when should you use which?</h3>
      <p style={S.p}><strong>Answer:</strong> VM when a different OS, strong isolation, legacy apps or compliance requirements exist. Container for cloud-native microservices, fast scaling and lightweight workloads. In production, containers often run on VMs.</p>
      <h3 style={S.h3}>Q5: What is CPU ready time and why does it matter?</h3>
      <p style={S.p}><strong>Answer:</strong> It is the time a vCPU is ready to run but waiting for a physical core. High ready time means the host is overcommitted or VMs are oversized. It is invisible inside the guest, so you read it on the host.</p>
      <h3 style={S.h3}>Q6: How does memory ballooning work?</h3>
      <p style={S.p}><strong>Answer:</strong> When the host is short of RAM, a balloon driver in the guest asks the guest OS for memory; the guest frees less-used pages, and the hypervisor reuses the underlying physical memory. It is better than host swapping, but still a sign of memory pressure.</p>
      <h3 style={S.h3}>Q7: How would you size a cluster?</h3>
      <p style={S.p}><strong>Answer:</strong> Measure real utilisation, choose consolidation ratios, calculate host count for CPU and RAM (RAM is often the limit), add N+1 or N+2 failure headroom, then add growth, storage, network and power.</p>
      <h3 style={S.h3}>Q8: What is the difference between HA and Fault Tolerance?</h3>
      <p style={S.p}><strong>Answer:</strong> HA restarts failed VMs on another host after a short outage. FT keeps a lockstep copy and switches over with no restart, at the cost of extra resources and limits on VM size.</p>

      {/* ══════════ 37. KEY TAKEAWAYS ══════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Virtualisation runs multiple VMs on one physical server — better utilisation, fast provisioning, isolation maintained.</li>
        <li>Type 1 hypervisors (ESXi, Hyper-V, KVM) are the data center standard; KVM and Hyper-V are Type 1.</li>
        <li>Hardware assist (VT-x/AMD-V, EPT/NPT, VT-d) must be enabled in BIOS.</li>
        <li>CPU overcommit shows up as CPU ready time; memory overcommit shows up as ballooning, compression and swap.</li>
        <li>Snapshots are not backups. Keep them short-lived and verify restores.</li>
        <li>Live migration usually needs compatible CPUs and a good network; shared storage is common but not always mandatory.</li>
        <li>HA restarts VMs after host failure; capacity must be reserved (N+1) for it to work.</li>
        <li>Spread VMs across failure domains with anti-affinity; the management plane needs its own protection.</li>
        <li>Always look at the host view when a VM is slow.</li>
        <li>VMs and containers are complementary; both are used together in production.</li>
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
        <li><TopicLink slug="server-basics" variant="inline" /> — The physical server architecture that hosts VMs.</li>
        <li><TopicLink slug="cpu" variant="inline" /> — vCPU scheduling, NUMA in VMs, virtualisation extensions.</li>
        <li><TopicLink slug="ram" variant="inline" /> — Memory capacity, channels and overcommit limits.</li>
        <li><TopicLink slug="gpu" variant="inline" /> — GPU sharing, passthrough and vGPU.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — High-density VM hosting on blade infrastructure.</li>
        <li><TopicLink slug="san" variant="inline" /> — Shared storage that makes clusters and live migration practical.</li>
        <li><TopicLink slug="disaster-recovery" variant="inline" /> — Replication and recovery planning.</li>
        <li><TopicLink slug="cloud-vs-data-center" variant="inline" /> — Cloud virtualisation vs on-premise.</li>
      </ul>
    </>
  );
}
