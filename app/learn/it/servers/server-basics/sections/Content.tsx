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
        <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — Server Basics in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>Server kya hai:</strong> Ek dedicated computer jo network pe doosre devices ko resources, data ya services provide karta hai — 24/7 continuous operation ke liye designed.</li>
          <li><strong>PC se alag kyun:</strong> ECC RAM, redundant PSUs, hot-swap storage, BMC/iDRAC out-of-band management, rack-mount form factor — sab availability aur manageability ke liye.</li>
          <li><strong>Form factors:</strong> Tower (standalone), Rack (1U/2U/4U — data center standard), Blade (shared chassis), Modular/Composable (software-defined resources).</li>
          <li><strong>Rack Unit (U):</strong> 1U = 1.75 inches (44.45 mm). 42U rack mein 42 U slots hain — lekin actual deployable servers power, cooling, weight, cabling constraints se limited hain.</li>
          <li><strong>Boot flow:</strong> Power → BMC init (standby power se) → UEFI POST → Boot device (PXE/disk/SAN) → Bootloader → OS/Hypervisor.</li>
          <li><strong>BMC:</strong> Separate chip — OS crash ya server off hone ke baad bhi accessible (standby power required). Remote console, power control, hardware health.</li>
          <li><strong>PSU redundancy:</strong> Dual PSUs ko A aur B feeds se connect karo — separate electrical circuits se. Redundancy mode server model pe depend karta hai.</li>
        </ul>
      </div>

      <h2 id="what-is-a-server" style={S.h2}>What Is a Server?</h2>
      <p style={S.p}>Jab aap YouTube pe video play karte hain, Google pe search karte hain, ya UPI payment karte hain — background mein ek computer aapki request process kar raha hota hai. Woh computer ek <strong>server</strong> hai.</p>
      <p style={S.p}>Server ek dedicated computer system hai jo network pe doosre devices (clients) ko services, data ya compute resources provide karta hai. "Server" ka literal meaning hai "serve karne wala" — kisi doosri device ki request fulfill karna.</p>
      <p style={S.p}>Lekin server sirf ek powerful PC nahi hai. Design philosophy, components, form factor — sab kuch fundamentally alag hota hai. Server continuous, uninterrupted operation ke liye designed hota hai jahan hardware failure minimise honi chahiye aur recovery fast honi chahiye.</p>

      <h2 id="server-vs-pc" style={S.h2}>Server vs Personal Computer</h2>
      <p style={S.p}>"Agar server bhi CPU, RAM aur storage use karta hai toh PC se alag kya hai?" — yeh valid question hai. Difference hardware features mein hai jo continuous operation support karte hain.</p>
      <Figure caption="Fig 1 — Server vs PC: key hardware differences across memory, power, storage, management and form factor."><ServerVsPc /></Figure>
      <Callout type="important" title="Availability Is a System Property, Not Just a Server Property">
        Kisi bhi single server ki individual uptime claim carefully evaluate karo. Actual service availability server hardware, redundancy architecture, software stack, networking, power infrastructure aur operations processes ka combined outcome hai. High availability targets system-level design se achieve hote hain — sirf server hardware se nahi.
      </Callout>
      <p style={S.p}><strong>ECC RAM</strong> (Error-Correcting Code) server ka standard hai. Memory errors — cosmic rays, electrical interference, aging — rare hain lekin hote hain. ECC implementation ke hisaab se single-bit aur some multi-bit errors detect aur/ya correct kar sakta hai. Consumer RAM mein yeh protection typically nahi hoti. Actual ECC capabilities implementation pe depend karti hain.</p>
      <p style={S.p}><strong>Redundant PSUs</strong> ek aur key differentiator hain. Server typically 2 PSUs rakhta hai. PSU redundancy configuration — active-active, active-standby, load-sharing — server model aur PSU type pe depend karta hai. Ideally dono PSUs alag A aur B electrical feeds se connected honi chahiye.</p>
      <p style={S.p}><strong>Hot-swap components</strong> allow karte hain drives, PSUs (aur kuch models mein fans) ko running server pe replace karna. Yeh requires appropriate hardware support aur OS/RAID configuration.</p>
      <p style={S.p}><strong>BMC (Baseboard Management Controller)</strong> separate microcontroller hai — server ke main system se independent. Dedicated network port pe BMC accessible hota hai. Standby power required hai — matlab jab tak PSU mein AC supply hai, BMC function karta hai even jab server off ho.</p>

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
      <p style={S.p}><strong>Tower server</strong> standalone box hai — small office ya lab ke liye. Data center mein space inefficient hai kyunki rack mein standard mount nahi hota easily.</p>
      <p style={S.p}><strong>Rack server</strong> data center standard hai — standard 19-inch rack mein mount hota hai. Blade servers aur modular infrastructure deeper mein <TopicLink slug="blade-server" variant="inline"/> mein cover honge.</p>

      <h2 id="rack-mount-deployment" style={S.h2}>Rack Mount Deployment — The Full Picture</h2>
      <p style={S.p}>Data center deployment sirf server buy karna aur plug in karna nahi hai. Ek complete deployment mein physical mounting, power planning, cooling, cabling, aur management network sab involve hote hain.</p>
      <Callout type="best-practice" title="19-Inch Rack Standard">
        Data center equipment typically 19-inch EIA-310 standard rack ke liye designed hota hai — rack ke dono sides pe mounting holes 19 inches (482.6 mm) apart hote hain. Equipment ke mounting ears is width ke liye designed hote hain. Rack compatible equipment chunte time mounting width aur depth verify karo.
      </Callout>

      <h2 id="rack-u-explained" style={S.h2}>Rack Unit (U) Explained</h2>
      <p style={S.p}>Rack height <strong>U (Rack Units)</strong> mein measure hoti hai. <strong>1U = 1.75 inches = 44.45 mm.</strong> Yeh server ki physical height define karta hai — server performance ya capabilities se koi direct relation nahi hai.</p>
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
        Ek 42U rack ka matlab yeh nahi ki 42 servers safely deploy ho sakte hain. Actual deployable count in sab constraints se limited hota hai:
        Power: Rack PDU current rating aur circuit breaker capacity. Cooling: CRAC/CRAH aur aisle capacity for heat removal. Weight: Rack aur floor load rating — servers heavy hote hain. Network: Switch ports aur patch panel space. Cabling: Cable management space. Redundancy: Blanking panels, operational clearance. Practical planning mein U slots aur sab other constraints simultaneously evaluate karo.
      </Callout>

      <h2 id="rack-planning" style={S.h2}>Practical Rack Planning</h2>
      <p style={S.p}><strong>Server depth aur clearance:</strong> Servers typically 600-900 mm deep hote hain. Rack depth compatible honi chahiye. Front mein service clearance (typically 1 meter recommended) aur rear mein cabling/PSU access ke liye space chahiye.</p>
      <p style={S.p}><strong>Rack rails:</strong> Most servers slide-in rail kit ke saath aate hain — server rack mein horizontal mount hota hai rails pe, fir slide in. Rails rack ke vertical mounting strips pe attach hote hain. Server phir rails pe slide karo aur cable karo. Rack-mount rails vendor aur rack ke saath compatible hone chahiye.</p>
      <p style={S.p}><strong>Blanking panels:</strong> Empty U slots mein blanking panels lagana mandatory hai. Blanking panels airflow maintain karte hain — bina panels ke cool air hot-air zone mein recirculate kar sakti hai, rack cooling efficiency degrade hoti hai.</p>
      <p style={S.p}><strong>Hot-aisle / Cold-aisle orientation:</strong> All servers same direction mein mount karo — front (air intake) cold aisle ki taraf, rear (exhaust) hot aisle ki taraf. Consistent orientation CRAC/CRAH effectiveness ke liye critical hai. Mixed orientation airflow short-circuit kar sakta hai.</p>
      <p style={S.p}><strong>Cable management:</strong> Power cables, network cables, management cables — organized aur labeled. Poor cable management airflow block kar sakta hai, troubleshooting slow karta hai, aur accidental disconnection risk badh jaata hai. Velcro ties, cable managers, labeled cables standard practice hain.</p>
      <Figure caption="Fig 3 — Redundant A/B power path: dual-PSU server connected to separate A and B rack PDUs on independent electrical circuits."><DualPsuPower /></Figure>
      <p style={S.p}><strong>A/B Redundant Power:</strong> Dual-PSU server ke liye PSU 1 ko Rack PDU A se aur PSU 2 ko Rack PDU B se connect karo. Rack PDU A aur B alag upstream electrical circuits se fed honi chahiye — UPS, breaker, ya distribution path separate hone chahiye. Is arrangement mein ek complete power path fail ho toh server continues running on other PSU.</p>
      <p style={S.p}><strong>Weight planning:</strong> Fully loaded 2U server 15-30 kg ya more ho sakta hai — actual weight model pe depend karta hai. 42U rack servers se full hota hai toh significant weight ban sakti hai. Heavy equipment lower rack mein install karo — centre of gravity low rakho stability ke liye. Floor load rating verify karo especially older buildings mein.</p>

      <h2 id="server-components" style={S.h2}>Key Server Components</h2>
      <p style={S.p}><strong>Motherboard (Server Board):</strong> CPU sockets, DIMM slots, PCIe slots, storage controllers, NIC ports, BMC chip — sab yahan hain. Server motherboards typically multi-socket support karte hain (1S, 2S configurations most common).</p>
      <p style={S.p}><strong>CPU:</strong> Server compute engine. Intel Xeon aur AMD EPYC data center mein common hain — multi-socket support, more PCIe lanes, RAS features. Deep dive <TopicLink slug="cpu" variant="inline"/> mein.</p>
      <p style={S.p}><strong>RAM:</strong> Server mein ECC RAM standard hai — specific ECC implementation capability vendor aur platform pe depend karti hai. Typically RDIMM (Registered DIMM) form factor. <TopicLink slug="ram" variant="inline"/> mein detail mein.</p>
      <p style={S.p}><strong>Storage:</strong> SAS (Serial Attached SCSI) enterprise drives — higher cost. SATA drives — wide availability, various reliability classes. NVMe SSDs (PCIe-based) — very high performance. Drive reliability server-grade vs consumer-grade model aur workload rating pe depend karta hai — simplistic generalisations avoid karo. Backplane hot-swap enable karta hai.</p>
      <p style={S.p}><strong>RAID Controller vs HBA:</strong> RAID controller multiple drives ko combine karta hai redundancy ya performance ke liye — hardware RAID processing onboard karta hai. HBA (Host Bus Adapter) drives directly OS ko present karta hai without RAID processing — software RAID ya direct disk access ke liye. Choice workload aur architecture pe depend karta hai.</p>
      <p style={S.p}><strong>NIC (Network Interface Card):</strong> Multiple NICs ya ports — redundancy (bonding/teaming), separate VLANs, management traffic. 10GbE, 25GbE, 100GbE modern data centers mein common hain.</p>
      <p style={S.p}><strong>PSU:</strong> Typically redundant. Hot-swap. Server-grade efficiency ratings (80 Plus Platinum/Titanium common). PSU redundancy mode configuration pe depend karta hai.</p>
      <p style={S.p}><strong>TPM (Trusted Platform Module):</strong> Hardware security chip — cryptographic keys secure store karta hai. Secure Boot, disk encryption (BitLocker, dm-crypt), remote attestation ke liye use hota hai. Modern servers mein typically present, configuration required to enable features.</p>
      <p style={S.p}><strong>Secure Boot:</strong> UEFI feature — sirf cryptographically signed bootloaders aur OS kernels run hone allow karta hai. Unauthorized OS ya bootkit prevent karta hai. Enterprise environments mein often enabled.</p>

      <h2 id="boot-flow" style={S.h2}>Server Boot Flow</h2>
      <Figure caption="Fig 4 — Server boot sequence: from power applied, BMC init (on standby power), UEFI POST, boot device selection, bootloader, to OS/Hypervisor."><ServerBootFlow /></Figure>
      <p style={S.p}><strong>Step 1 — Power applied → BMC initialises:</strong> Standby power BMC ko milti hai. BMC hardware health monitoring start karta hai, network management accessible ho jaata hai. Main CPU abhi boot nahi hua.</p>
      <p style={S.p}><strong>Step 2 — UEFI/BIOS POST:</strong> Unified Extensible Firmware Interface (UEFI) modern servers mein standard hai — older BIOS replace karta hai. POST (Power-On Self-Test) CPU, RAM, storage controllers, PCIe devices check karta hai. Issues ho toh error codes ya indicator LEDs se diagnostics milti hai.</p>
      <p style={S.p}><strong>Step 3 — Boot device:</strong> UEFI boot order se pehla valid device select hota hai. Options: Local disk (SATA/NVMe/SAS), PXE (network boot — OS over network se), SAN boot (storage area network se), USB (temporary/recovery). PXE boot large-scale automated OS deployment ke liye useful hai.</p>
      <p style={S.p}><strong>Step 4 — Bootloader → OS/Hypervisor:</strong> GRUB (Linux), Windows Boot Manager, ya hypervisor-specific bootloader. OS kernel ya hypervisor (VMware ESXi, Hyper-V, KVM) load hota hai. Services start hoti hain.</p>
      <p style={S.p}>Boot time hardware, storage speed, OS/hypervisor aur services pe depend karta hai — koi universal boot time claim technically accurate nahi hogi.</p>

      <h2 id="bmc-management" style={S.h2}>BMC and Out-of-Band Management</h2>
      <p style={S.p}>Data center mein 500 servers ko physical console cables se manage karna impractical hai. BMC (Baseboard Management Controller) is problem solve karta hai.</p>
      <p style={S.p}>BMC server ke main system se completely independent microcontroller hai. Apna dedicated network port rakhta hai — typically management VLAN pe, production traffic se separated. <strong>Important:</strong> BMC ko function karne ke liye AC power supply connected honi chahiye (standby power) — completely unplugged server pe BMC accessible nahi hoga.</p>
      <p style={S.p}><strong>BMC se kya kya hota hai:</strong> Remote power on/off/reset. Virtual console (keyboard/video/mouse over network). Hardware health monitoring (CPU temperature, fan speeds, PSU status, drive health). Remote media mount (OS installation over network). Firmware/BIOS update. System event log access. Alert generation (SNMP traps, email).</p>
      <p style={S.p}><strong>Protocols:</strong> IPMI (Intelligent Platform Management Interface) v2.0 — legacy standard. Redfish — modern REST API based standard, JSON, growing adoption. Vendor-specific GUIs aur CLIs — Dell iDRAC (OpenManage), HPE iLO (iLO Amplifier), Lenovo XCC, Supermicro IPMI.</p>

      <h2 id="redundancy" style={S.h2}>Redundancy in Servers</h2>
      <p style={S.p}><strong>PSU redundancy:</strong> Dual PSUs common hain. Configuration — active-active (both PSUs load share), active-standby (one PSU carries full load, other standby) ya other modes — server model aur PSU type pe depend karta hai. OEM documentation verify karo.</p>
      <p style={S.p}><strong>Storage redundancy:</strong> RAID multiple drives combine karta hai. RAID 1 (mirror — 2 drives, same data), RAID 5 (striping with parity — minimum 3 drives), RAID 10 (stripe + mirror) common configurations hain. RAID ek drive failure survive kar sakta hai (depends on RAID level). RAID backup replace nahi karta.</p>
      <p style={S.p}><strong>NIC redundancy (bonding/teaming):</strong> Multiple NICs ek logical interface mein combine — ek NIC ya switch port fail ho toh doosra path active. Linux bonding, Windows NIC teaming.</p>
      <p style={S.p}><strong>ECC RAM:</strong> Memory errors se protect karta hai — single point of protection for data in flight. Actual protection level ECC implementation pe depend karta hai.</p>

      <h2 id="server-lifecycle" style={S.h2}>Server Lifecycle</h2>
      <p style={S.p}><strong>Planning:</strong> Workload requirements assess karo — CPU cores, RAM, storage, network bandwidth. Form factor, redundancy level, power budget. Vendor selection, compatibility verification.</p>
      <p style={S.p}><strong>Procurement aur Deployment:</strong> Hardware arrive → asset tag → rack aur cable → power on aur POST verify → firmware update (UEFI, BMC, drives) → OS/hypervisor install (PXE ya manual) → configuration → testing → handover.</p>
      <p style={S.p}><strong>Operation:</strong> Monitoring (hardware health via BMC, OS metrics, application metrics). Patch management (OS, firmware — planned maintenance windows). Incident response. Capacity tracking.</p>
      <p style={S.p}><strong>Maintenance:</strong> Planned hardware replacements (drives, PSUs — proactively based on health). Firmware lifecycle management — keep firmware updated for security aur stability, lekin test karo pehle. Drive predictive failure alerts act karo before actual failure.</p>
      <p style={S.p}><strong>Decommissioning:</strong> Workload migrate/terminate. Data sanitization — secure erase (NIST 800-88 guidelines reference karo). Remove from monitoring, DCIM, DNS, IPAM. Physical removal, asset disposal (vendor return, certified recycling, resale).</p>

      <h2 id="monitoring" style={S.h2}>Monitoring a Server</h2>
      <p style={S.p}><strong>Hardware health (via BMC/IPMI/Redfish):</strong> CPU temperatures, inlet/ambient temperature, fan speeds (RPM), PSU status, drive health (SMART), memory errors, system event log.</p>
      <p style={S.p}><strong>OS-level:</strong> CPU utilization, RAM usage, disk I/O, network throughput, process health — standard monitoring agents (Prometheus node_exporter, Zabbix agent, Datadog agent, etc.).</p>
      <p style={S.p}><strong>Out-of-band alerts:</strong> BMC direct SNMP traps ya email alerts — OS crash hone ke baad bhi deliver hote hain. Critical hardware events ke liye essential.</p>
      <p style={S.p}><strong>Firmware monitoring:</strong> Vendor security advisories track karo — firmware vulnerabilities exist karte hain. Scheduled firmware update cycles maintain karo.</p>

      <h2 id="troubleshooting" style={S.h2}>Common Faults and Troubleshooting</h2>
      <h3 style={S.h3}>Server Not Powering On</h3>
      <p style={S.p}>PSU connected hai? LED indicators? A aur B feeds both live hain? BMC accessible hai (standby power indicator)? Power button ya BMC se power on try karo. Physical power button issue ho sakta hai — BMC remote power on try karo.</p>
      <h3 style={S.h3}>Server Not Responding / OS Not Accessible</h3>
      <p style={S.p}>BMC accessible hai? BMC se virtual console open karo — crash screen ya hung OS dikhe. System event log check karo — hardware fault? BMC power cycle karo. Bhi kuch nahi — physical access required.</p>
      <h3 style={S.h3}>Drive Failure Alert</h3>
      <p style={S.p}>RAID controller / BMC se failed drive identify karo (slot number, bay LED). RAID status check karo — degraded? Hot-swap replacement — RAID rebuild start ho. Rebuild progress monitor karo. During rebuild additional drive failure risk hota hai — backup verify karo.</p>
      <h3 style={S.h3}>PSU Failure</h3>
      <p style={S.p}>BMC alert check karo — which PSU? Server redundant hai toh continues running. Failed PSU hot-swap replace karo. Power feeds verify karo — A aur B both live?</p>
      <h3 style={S.h3}>Thermal / Fan Issues</h3>
      <p style={S.p}>BMC se temperatures aur fan speeds check karo. Airflow blocked? Cable management? Blanking panels missing? Ambient rack temperature high? Fan failure? Fan hot-swap replace karo agar possible. CPU/RAM ke thermal contact verify karo (heatsink properly seated).</p>
      <h3 style={S.h3}>POST Error / Server Not Booting</h3>
      <p style={S.p}>BMC virtual console se UEFI POST error message capture karo. Common causes: new DIMM not compatible/not seated, new PCIe card issue, storage controller issue. Last change identify karo aur revert karo to isolate. UEFI event log check karo.</p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: Server aur PC mein key differences kya hain?</h3>
      <p style={S.p}><strong>Answer:</strong> ECC RAM (memory error correction — implementation pe dependent), redundant PSUs (single PSU failure survive karna — mode config pe dependent), hot-swap storage aur PSUs (running system pe replace karna), BMC/iDRAC out-of-band management (OS-independent remote access, standby power required), rack-mount form factor (data center density ke liye). Consumer PC mein yeh features typically nahi hoti kyunki occasional downtime acceptable hota hai.</p>
      <h3 style={S.h3}>Q2: BMC kya hai, kaise kaam karta hai, kab accessible hota hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Baseboard Management Controller server ka independent microcontroller hai — main CPU/OS se alag. BMC apna dedicated network port rakhta hai. Accessible rehta hai jab tak PSU mein AC supply hai (standby power) — server off hone ke baad bhi. Virtual console, power control, hardware health, system event log — sab BMC se remotely. Protocol: IPMI v2.0 ya modern Redfish API.</p>
      <h3 style={S.h3}>Q3: 42U rack mein kitne servers deploy ho sakte hain aur kyun?</h3>
      <p style={S.p}><strong>Answer:</strong> 42U rack ≠ 42 servers. Actual deployable count in constraints se limited hota hai: Rack PDU power capacity aur circuit rating. CRAC/CRAH cooling capacity for heat removal. Rack aur floor weight limits. Network switch ports aur patch panels (jo U space lete hain). Cable management space. Blanking panels (empty slots mein required). Practical planning mein sab simultaneously evaluate karo, sirf U count mat dekho.</p>
      <h3 style={S.h3}>Q4: A/B redundant power kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Dual-PSU server mein PSU 1 Rack PDU A se aur PSU 2 Rack PDU B se connected hoti hai. Rack PDU A aur B completely alag electrical circuits (upstream UPS, breaker, distribution) se fed honi chahiye. Ek complete power path fail ho toh server doosre PSU se continue karta hai. Redundancy mode — active-active, active-standby — server model aur PSU configuration pe depend karta hai.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Server continuous operation ke liye designed hai — ECC RAM, redundant PSUs, hot-swap components, BMC management.</li>
        <li>1U = 1.75 inches (44.45 mm). Form factor physical height batata hai — performance nahi.</li>
        <li>42U rack mein 42 servers automatically deploy nahi ho sakte — power, cooling, weight, cabling sab constraints hain.</li>
        <li>BMC standby power se operate karta hai — server off hone ke baad bhi accessible (jab tak AC power connected).</li>
        <li>A/B redundant power ke liye PSUs alag independent electrical circuits se feed hone chahiye.</li>
        <li>Blanking panels empty rack slots mein lagana mandatory hai — airflow maintain karne ke liye.</li>
        <li>Server lifecycle: planning → deployment → operation → maintenance → decommissioning — har phase ki apni requirements hain.</li>
        <li>Hot-swap, PSU redundancy mode, ECC capabilities — sab server model aur configuration pe depend karte hain, OEM documentation verify karo.</li>
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
        <li><TopicLink slug="cpu" variant="inline" /> — Server ka compute engine — architecture, NUMA, selection.</li>
        <li><TopicLink slug="ram" variant="inline" /> — ECC, channels, DIMM population, memory troubleshooting.</li>
        <li><TopicLink slug="gpu" variant="inline" /> — AI/HPC accelerators in servers.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — High-density shared-chassis compute.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — Multiple VMs on one physical server.</li>
      </ul>
    </>
  );
}
