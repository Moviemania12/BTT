"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import ServerVsPc from "../svg/ServerVsPc";
import RackElevation from "../svg/RackElevation";
import DualPsuPower from "../svg/DualPsuPower";
import ServerBootFlow from "../svg/ServerBootFlow";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      {/* Quick Summary */}
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — Server Basics in 2 Minutes</p> <ul style={{ ...S.ul, marginBottom: 0 }}> <li><strong>What a server is:</strong> A dedicated computer that provides resources, data or services to other devices on the network — designed for 24/7 continuous operation.</li> <li><strong>Why it differs from a PC:</strong> ECC RAM, redundant PSUs, hot-swap storage, BMC/iDRAC out-of-band management, rack-mount form factor — all for availability and manageability.</li> <li><strong>Form factors:</strong> Tower (standalone), Rack (1U/2U/4U — data center standard), Blade (shared chassis), Modular/Composable (software-defined resources).</li> <li><strong>Rack Unit (U):</strong> 1U = 1.75 inches (44.45 mm). A 42U rack has 42 U slots — but the actual number of deployable servers is limited by power, cooling, weight and cabling constraints.</li> <li><strong>Boot flow:</strong> Power → BMC init (from standby power) → UEFI POST → Boot device (PXE/disk/SAN) → Bootloader → OS/Hypervisor.</li> <li><strong>BMC:</strong> Separate chip — accessible even after an OS crash or with the server off (standby power required). Remote console, power control, hardware health.</li> <li><strong>PSU redundancy:</strong> Connect dual PSUs to A and B feeds — from separate electrical circuits. The redundancy mode depends on the server model.</li> </ul>
      </div>

      <h2 id="what-is-a-server" style={S.h2}>What Is a Server?</h2>
      <p style={S.p}>When you play a video on YouTube, search on Google or make a UPI payment — a computer in the background is processing your request. That computer is a <strong>server</strong>.</p>
      <p style={S.p}>A server is a dedicated computer system that provides services, data or compute resources to other devices (clients) on the network. The literal meaning of "server" is "one who serves" — fulfilling another device's request.</p>
      <p style={S.p}>But a server is not just a powerful PC. Design philosophy, components, form factor — everything is fundamentally different. A server is designed for continuous, uninterrupted operation, where hardware failures must be minimised and recovery must be fast.</p>

      <h2 id="server-vs-pc" style={S.h2}>Server vs Personal Computer</h2>
      <p style={S.p}>"If a server also uses a CPU, RAM and storage, how is it different from a PC?" — this is a valid question. The difference lies in the hardware features that support continuous operation.</p>
      <Figure caption="Fig 1 — Server vs PC: key hardware differences across memory, power, storage, management and form factor."><ServerVsPc /></Figure>
      <Callout type="important" title="Availability Is a System Property, Not Just a Server Property">
        Evaluate any individual uptime claim for a single server carefully. Actual service availability is the combined outcome of server hardware, redundancy architecture, software stack, networking, power infrastructure and operations processes. High availability targets are achieved through system-level design — not through server hardware alone.
      </Callout>
      <p style={S.p}><strong>ECC RAM</strong> (Error-Correcting Code) is the server standard. Memory errors — from cosmic rays, electrical interference, aging — are rare, but they do happen. Depending on the implementation, ECC can detect and/or correct single-bit and some multi-bit errors. Consumer RAM typically lacks this protection. Actual ECC capabilities depend on the implementation.</p>
      <p style={S.p}><strong>Redundant PSUs</strong> are another key differentiator. A server typically has 2 PSUs. The PSU redundancy configuration — active-active, active-standby, load-sharing — depends on the server model and PSU type. Ideally, both PSUs should be connected to separate A and B electrical feeds.</p>
      <p style={S.p}><strong>Hot-swap components</strong> allow drives, PSUs (and fans in some models) to be replaced on a running server. This requires appropriate hardware support and OS/RAID configuration.</p>
      <p style={S.p}><strong>BMC (Baseboard Management Controller)</strong> is a separate microcontroller — independent of the server's main system. The BMC is accessible on a dedicated network port. Standby power is required — meaning that as long as the PSU has AC supply, the BMC functions even when the server is off.</p>

      <h2 id="server-form-factors" style={S.h2}>Server Form Factors</h2>
      <ComparisonTable
        title="Server Form Factors — Comparison"
        headers={["Form Factor","Physical Shape","Data Center Use","Key Characteristic"]}
        rows={[
          ["Tower","Standalone upright box","Rarely — space inefficient","Self-contained, no rack needed"],
          ["Rack (1U/2U/4U)","Horizontal, rack-mounted","Standard — majority of DC servers","Industry-standard 19-inch mounting"],
          ["Blade","Thin card in shared chassis","High-density DC deployments","Shared power, cooling, networking via chassis"],
          ["Modular/Composable","Disaggregated resources, software-defined","Large-scale, evolving deployments","CPU/RAM/storage pools composed as needed"],
        ]}
        caption="Form factor selection depends on density requirements, budget, operational model and existing infrastructure."
      />
      <p style={S.p}><strong>Tower server</strong> is a standalone box — for a small office or lab. It is space-inefficient in a data center because it does not easily mount in a standard rack.</p>
      <p style={S.p}><strong>Rack server</strong> is the data center standard — it mounts in a standard 19-inch rack. Blade servers and modular infrastructure will be covered in depth in <TopicLink slug="blade-server" variant="inline"/>.</p>

      <h2 id="rack-mount-deployment" style={S.h2}>Rack Mount Deployment — The Full Picture</h2>
      <p style={S.p}>Data center deployment is not just buying a server and plugging it in. A complete deployment involves physical mounting, power planning, cooling, cabling and the management network.</p>
      <Callout type="best-practice" title="19-Inch Rack Standard">
        Data center equipment is typically designed for the 19-inch EIA-310 standard rack — the mounting holes on both sides of the rack are 19 inches (482.6 mm) apart. Equipment mounting ears are designed for this width. When choosing rack-compatible equipment, verify the mounting width and depth.
      </Callout>

      <h2 id="rack-u-explained" style={S.h2}>Rack Unit (U) Explained</h2>
      <p style={S.p}>Rack height is measured in <strong>U (Rack Units)</strong>. <strong>1U = 1.75 inches = 44.45 mm.</strong> This defines the server's physical height — it has no direct relation to server performance or capabilities.</p>
      <ComparisonTable
        title="Common Rack Heights"
        headers={["Rack Height","Total U Capacity","Typical Use"]}
        rows={[
          ["42U","42 U slots","Most common data center standard rack"],
          ["45U","45 U slots","Some vendors, slightly taller"],
          ["48U","48 U slots","Extended capacity deployments"],
        ]}
        caption="Actual usable rack capacity depends on equipment installation, cable management, and infrastructure within the rack."
      />
      <p style={S.p}><strong>1U server:</strong> Thin, typically limited drive bays, power-efficient. Web servers, API servers, network appliances. Higher density per rack U.</p>
      <p style={S.p}><strong>2U server:</strong> Most versatile — more drive bays, better cooling headroom, more PCIe expansion slots. Database servers, virtualisation hosts, general-purpose compute. Most common in enterprise data centers.</p>
      <p style={S.p}><strong>4U server:</strong> Large storage configurations, GPU-accelerated servers, high-expansion workloads. Takes significant rack space but provides maximum expansion capability.</p>
      <Figure caption="Fig 2 — Rack elevation showing 1U and 2U servers, network switches, patch panels, blanking panels and PDUs with U positions marked. For illustration only — actual deployments vary."><RackElevation /></Figure>
      <Callout type="warning" title="42U Rack ≠ 42 × 1U Servers">
        A 42U rack does not mean 42 servers can be safely deployed. The actual deployable count is limited by all of these constraints: Power: Rack PDU current rating and circuit breaker capacity. Cooling: CRAC/CRAH and aisle capacity for heat removal. Weight: Rack and floor load rating — servers are heavy. Network: Switch ports and patch panel space. Cabling: Cable management space. Redundancy: Blanking panels, operational clearance. In practical planning, evaluate U slots and all other constraints simultaneously.
      </Callout>

      <h2 id="rack-planning" style={S.h2}>Practical Rack Planning</h2>
      <p style={S.p}><strong>Server depth and clearance:</strong> Servers are typically 600-900 mm deep. The rack depth must be compatible. Space is needed at the front for service clearance (typically 1 meter recommended) and at the rear for cabling/PSU access.</p>
      <p style={S.p}><strong>Rack rails:</strong> Most servers come with a slide-in rail kit — the server mounts horizontally on rails in the rack, then slides in. The rails attach to the rack's vertical mounting strips. Then slide the server onto the rails and cable it. Rack-mount rails must be compatible with the vendor and the rack.</p>
      <p style={S.p}><strong>Blanking panels:</strong> Installing blanking panels in empty U slots is mandatory. Blanking panels maintain airflow — without them, cool air can recirculate into the hot-air zone and rack cooling efficiency degrades.</p>
      <p style={S.p}><strong>Hot-aisle / Cold-aisle orientation:</strong> Mount all servers in the same direction — front (air intake) facing the cold aisle, rear (exhaust) facing the hot aisle. Consistent orientation is critical for CRAC/CRAH effectiveness. Mixed orientation can short-circuit the airflow.</p>
      <p style={S.p}><strong>Cable management:</strong> Power cables, network cables, management cables — organized and labeled. Poor cable management can block airflow, slows troubleshooting and increases the risk of accidental disconnection. Velcro ties, cable managers and labeled cables are standard practice.</p>
      <Figure caption="Fig 3 — Redundant A/B power path: dual-PSU server connected to separate A and B rack PDUs on independent electrical circuits."><DualPsuPower /></Figure>
      <p style={S.p}><strong>A/B Redundant Power:</strong> For a dual-PSU server, connect PSU 1 to Rack PDU A and PSU 2 to Rack PDU B. Rack PDU A and B should be fed from separate upstream electrical circuits — the UPS, breaker or distribution path should be separate. In this arrangement, if one complete power path fails, the server continues running on the other PSU.</p>
      <p style={S.p}><strong>Weight planning:</strong> A fully loaded 2U server can weigh 15-30 kg or more — the actual weight depends on the model. When a 42U rack is filled with servers, the weight can become significant. Install heavy equipment in the lower part of the rack — keep the centre of gravity low for stability. Verify the floor load rating, especially in older buildings.</p>

      <h2 id="server-components" style={S.h2}>Key Server Components</h2>
      <p style={S.p}><strong>Motherboard (Server Board):</strong> CPU sockets, DIMM slots, PCIe slots, storage controllers, NIC ports, BMC chip — all are here. Server motherboards typically support multiple sockets (1S, 2S configurations most common).</p>
      <p style={S.p}><strong>CPU:</strong> The server compute engine. Intel Xeon and AMD EPYC are common in data centers — multi-socket support, more PCIe lanes, RAS features. Deep dive in <TopicLink slug="cpu" variant="inline"/>.</p>
      <p style={S.p}><strong>RAM:</strong> ECC RAM is standard in servers — the specific ECC implementation capability depends on the vendor and platform. Typically RDIMM (Registered DIMM) form factor. Covered in detail in <TopicLink slug="ram" variant="inline"/>.</p>
      <p style={S.p}><strong>Storage:</strong> SAS (Serial Attached SCSI) enterprise drives — higher cost. SATA drives — wide availability, various reliability classes. NVMe SSDs (PCIe-based) — very high performance. Drive reliability, server-grade vs consumer-grade, depends on the model and workload rating — avoid simplistic generalisations. The backplane enables hot-swap.</p>
      <p style={S.p}><strong>RAID Controller vs HBA:</strong> A RAID controller combines multiple drives for redundancy or performance — it performs hardware RAID processing onboard. An HBA (Host Bus Adapter) presents drives directly to the OS without RAID processing — for software RAID or direct disk access. The choice depends on the workload and architecture.</p>
      <p style={S.p}><strong>NIC (Network Interface Card):</strong> Multiple NICs or ports — redundancy (bonding/teaming), separate VLANs, management traffic. 10GbE, 25GbE and 100GbE are common in modern data centers.</p>
      <p style={S.p}><strong>PSU:</strong> Typically redundant. Hot-swap. Server-grade efficiency ratings (80 Plus Platinum/Titanium common). The PSU redundancy mode depends on the configuration.</p>
      <p style={S.p}><strong>TPM (Trusted Platform Module):</strong> Hardware security chip — securely stores cryptographic keys. Used for Secure Boot, disk encryption (BitLocker, dm-crypt) and remote attestation. Typically present in modern servers; configuration required to enable features.</p>
      <p style={S.p}><strong>Secure Boot:</strong> UEFI feature — allows only cryptographically signed bootloaders and OS kernels to run. Prevents unauthorized OSes or bootkits. Often enabled in enterprise environments.</p>

      <h2 id="boot-flow" style={S.h2}>Server Boot Flow</h2>
      <Figure caption="Fig 4 — Server boot sequence: from power applied, BMC init (on standby power), UEFI POST, boot device selection, bootloader, to OS/Hypervisor."><ServerBootFlow /></Figure>
      <p style={S.p}><strong>Step 1 — Power applied → BMC initialises:</strong> The BMC receives standby power. The BMC starts hardware health monitoring and network management becomes accessible. The main CPU has not booted yet.</p>
      <p style={S.p}><strong>Step 2 — UEFI/BIOS POST:</strong> Unified Extensible Firmware Interface (UEFI) is standard in modern servers — it replaces the older BIOS. POST (Power-On Self-Test) checks the CPU, RAM, storage controllers and PCIe devices. If there are issues, diagnostics are provided via error codes or indicator LEDs.</p>
      <p style={S.p}><strong>Step 3 — Boot device:</strong> The first valid device is selected from the UEFI boot order. Options: Local disk (SATA/NVMe/SAS), PXE (network boot — OS over the network), SAN boot (from a storage area network), USB (temporary/recovery). PXE boot is useful for large-scale automated OS deployment.</p>
      <p style={S.p}><strong>Step 4 — Bootloader → OS/Hypervisor:</strong> GRUB (Linux), Windows Boot Manager, or a hypervisor-specific bootloader. The OS kernel or hypervisor (VMware ESXi, Hyper-V, KVM) loads. Services start.</p>
      <p style={S.p}>Boot time depends on hardware, storage speed, OS/hypervisor and services — no universal boot time claim would be technically accurate.</p>

      <h2 id="bmc-management" style={S.h2}>BMC and Out-of-Band Management</h2>
      <p style={S.p}>Managing 500 servers in a data center with physical console cables is impractical. The BMC (Baseboard Management Controller) solves this problem.</p>
      <p style={S.p}>The BMC is a microcontroller completely independent of the server's main system. It has its own dedicated network port — typically on a management VLAN, separated from production traffic. <strong>Important:</strong> For the BMC to function, AC power supply must be connected (standby power) — the BMC will not be accessible on a completely unplugged server.</p>
      <p style={S.p}><strong>What the BMC can do:</strong> Remote power on/off/reset. Virtual console (keyboard/video/mouse over network). Hardware health monitoring (CPU temperature, fan speeds, PSU status, drive health). Remote media mount (OS installation over network). Firmware/BIOS update. System event log access. Alert generation (SNMP traps, email).</p>
      <p style={S.p}><strong>Protocols:</strong> IPMI (Intelligent Platform Management Interface) v2.0 — legacy standard. Redfish — modern REST API based standard, JSON, growing adoption. Vendor-specific GUIs and CLIs — Dell iDRAC (OpenManage), HPE iLO (iLO Amplifier), Lenovo XCC, Supermicro IPMI.</p>

      <h2 id="redundancy" style={S.h2}>Redundancy in Servers</h2>
      <p style={S.p}><strong>PSU redundancy:</strong> Dual PSUs are common. The configuration — active-active (both PSUs share load), active-standby (one PSU carries full load, other standby) or other modes — depends on the server model and PSU type. Verify OEM documentation.</p>
      <p style={S.p}><strong>Storage redundancy:</strong> RAID combines multiple drives. RAID 1 (mirror — 2 drives, same data), RAID 5 (striping with parity — minimum 3 drives) and RAID 10 (stripe + mirror) are common configurations. RAID can survive a drive failure (depends on RAID level). RAID does not replace backup.</p>
      <p style={S.p}><strong>NIC redundancy (bonding/teaming):</strong> Multiple NICs combined into one logical interface — if one NIC or switch port fails, the other path stays active. Linux bonding, Windows NIC teaming.</p>
      <p style={S.p}><strong>ECC RAM:</strong> Protects against memory errors — single point of protection for data in flight. The actual protection level depends on the ECC implementation.</p>

      <h2 id="server-lifecycle" style={S.h2}>Server Lifecycle</h2>
      <p style={S.p}><strong>Planning:</strong> Assess workload requirements — CPU cores, RAM, storage, network bandwidth. Form factor, redundancy level, power budget. Vendor selection, compatibility verification.</p>
      <p style={S.p}><strong>Procurement and Deployment:</strong> Hardware arrive → asset tag → rack and cable → power on and verify POST → firmware update (UEFI, BMC, drives) → OS/hypervisor install (PXE or manual) → configuration → testing → handover.</p>
      <p style={S.p}><strong>Operation:</strong> Monitoring (hardware health via BMC, OS metrics, application metrics). Patch management (OS, firmware — planned maintenance windows). Incident response. Capacity tracking.</p>
      <p style={S.p}><strong>Maintenance:</strong> Planned hardware replacements (drives, PSUs — proactively based on health). Firmware lifecycle management — keep firmware updated for security and stability, but test it first. Act on drive predictive failure alerts before actual failure.</p>
      <p style={S.p}><strong>Decommissioning:</strong> Workload migrate/terminate. Data sanitization — secure erase (refer to NIST 800-88 guidelines). Remove from monitoring, DCIM, DNS, IPAM. Physical removal, asset disposal (vendor return, certified recycling, resale).</p>

      <h2 id="monitoring" style={S.h2}>Monitoring a Server</h2>
      <p style={S.p}><strong>Hardware health (via BMC/IPMI/Redfish):</strong> CPU temperatures, inlet/ambient temperature, fan speeds (RPM), PSU status, drive health (SMART), memory errors, system event log.</p>
      <p style={S.p}><strong>OS-level:</strong> CPU utilization, RAM usage, disk I/O, network throughput, process health — standard monitoring agents (Prometheus node_exporter, Zabbix agent, Datadog agent, etc.).</p>
      <p style={S.p}><strong>Out-of-band alerts:</strong> BMC direct SNMP traps or email alerts — delivered even after an OS crash. Essential for critical hardware events.</p>
      <p style={S.p}><strong>Firmware monitoring:</strong> Track vendor security advisories — firmware vulnerabilities do exist. Maintain scheduled firmware update cycles.</p>

      <h2 id="troubleshooting" style={S.h2}>Common Faults and Troubleshooting</h2>
      <h3 style={S.h3}>Server Not Powering On</h3>
      <p style={S.p}>Is the PSU connected? LED indicators? Are both the A and B feeds live? Is the BMC accessible (standby power indicator)? Try powering on via the power button or the BMC. There may be a physical power button issue — try BMC remote power on.</p>
      <h3 style={S.h3}>Server Not Responding / OS Not Accessible</h3>
      <p style={S.p}>Is the BMC accessible? Open the virtual console from the BMC — you may see a crash screen or a hung OS. Check the system event log — hardware fault? Power cycle via the BMC. If still nothing works — physical access is required.</p>
      <h3 style={S.h3}>Drive Failure Alert</h3>
      <p style={S.p}>Identify the failed drive from the RAID controller / BMC (slot number, bay LED). Check RAID status — degraded? Hot-swap replacement — the RAID rebuild should start. Monitor rebuild progress. During a rebuild there is a risk of additional drive failure — verify backups.</p>
      <h3 style={S.h3}>PSU Failure</h3>
      <p style={S.p}>Check the BMC alert — which PSU? If the server is redundant, it continues running. Hot-swap replace the failed PSU. Verify the power feeds — are both A and B live?</p>
      <h3 style={S.h3}>Thermal / Fan Issues</h3>
      <p style={S.p}>Check temperatures and fan speeds from the BMC. Airflow blocked? Cable management? Blanking panels missing? Ambient rack temperature high? Fan failure? Hot-swap replace the fan if possible. Verify CPU/RAM thermal contact (heatsink properly seated).</p>
      <h3 style={S.h3}>POST Error / Server Not Booting</h3>
      <p style={S.p}>Capture the UEFI POST error message via the BMC virtual console. Common causes: new DIMM not compatible/not seated, new PCIe card issue, storage controller issue. Identify the last change and revert it to isolate. Check the UEFI event log.</p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: What are the key differences between a server and a PC?</h3>
      <p style={S.p}><strong>Answer:</strong> ECC RAM (memory error correction — dependent on implementation), redundant PSUs (surviving a single PSU failure — dependent on mode config), hot-swap storage and PSUs (replacing on a running system), BMC/iDRAC out-of-band management (OS-independent remote access, standby power required), rack-mount form factor (for data center density). A consumer PC typically lacks these features because occasional downtime is acceptable.</p>
      <h3 style={S.h3}>Q2: What is a BMC, how does it work, and when is it accessible?</h3>
      <p style={S.p}><strong>Answer:</strong> The Baseboard Management Controller is the server's independent microcontroller — separate from the main CPU/OS. The BMC has its own dedicated network port. It remains accessible as long as the PSU has AC supply (standby power) — even after the server is off. Virtual console, power control, hardware health, system event log — all remotely via the BMC. Protocol: IPMI v2.0 or the modern Redfish API.</p>
      <h3 style={S.h3}>Q3: How many servers can be deployed in a 42U rack, and why?</h3>
      <p style={S.p}><strong>Answer:</strong> 42U rack ≠ 42 servers. The actual deployable count is limited by these constraints: Rack PDU power capacity and circuit rating. CRAC/CRAH cooling capacity for heat removal. Rack and floor weight limits. Network switch ports and patch panels (which take up U space). Cable management space. Blanking panels (required in empty slots). In practical planning, evaluate everything simultaneously — do not look at the U count alone.</p>
      <h3 style={S.h3}>Q4: What is A/B redundant power?</h3>
      <p style={S.p}><strong>Answer:</strong> In a dual-PSU server, PSU 1 is connected to Rack PDU A and PSU 2 to Rack PDU B. Rack PDU A and B should be fed from completely separate electrical circuits (upstream UPS, breaker, distribution). If one complete power path fails, the server continues on the other PSU. The redundancy mode — active-active, active-standby — depends on the server model and PSU configuration.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>A server is designed for continuous operation — ECC RAM, redundant PSUs, hot-swap components, BMC management.</li>
        <li>1U = 1.75 inches (44.45 mm). The form factor indicates physical height — not performance.</li>
        <li>42 servers cannot automatically be deployed in a 42U rack — power, cooling, weight and cabling are all constraints.</li>
        <li>The BMC operates on standby power — accessible even after the server is off (as long as AC power is connected).</li>
        <li>For A/B redundant power, the PSUs must be fed from separate, independent electrical circuits.</li>
        <li>Installing blanking panels in empty rack slots is mandatory — to maintain airflow.</li>
        <li>Server lifecycle: planning → deployment → operation → maintenance → decommissioning — each phase has its own requirements.</li>
        <li>Hot-swap, PSU redundancy mode, ECC capabilities — all depend on the server model and configuration; verify OEM documentation.</li>
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
        <li><TopicLink slug="cpu" variant="inline" /> — The server's compute engine — architecture, NUMA, selection.</li>
        <li><TopicLink slug="ram" variant="inline" /> — ECC, channels, DIMM population, memory troubleshooting.</li>
        <li><TopicLink slug="gpu" variant="inline" /> — AI/HPC accelerators in servers.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — High-density shared-chassis compute.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — Multiple VMs on one physical server.</li>
      </ul>
    </>
  );
}
