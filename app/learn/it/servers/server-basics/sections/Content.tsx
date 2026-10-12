"use client";
import { S, Callout, ComparisonTable, Figure, CodeBlock } from "../shared";
import TopicLink from "@/components/TopicLink";
import ServerVsPc from "../svg/ServerVsPc";
import RackElevation from "../svg/RackElevation";
import DualPsuPower from "../svg/DualPsuPower";
import ServerBootFlow from "../svg/ServerBootFlow";
import ServerAnatomy from "../svg/ServerAnatomy";
import RackAirflow from "../svg/RackAirflow";
import ServerTroubleshootFlow from "../svg/ServerTroubleshootFlow";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      {/* Quick Summary */}
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — Server Basics in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>What a server is:</strong> A dedicated computer that gives resources, data or services to other devices on a network — built for 24×7 operation.</li>
          <li><strong>Why it differs from a PC:</strong> ECC RAM, redundant PSUs, hot-swap parts, a BMC for remote management and a rack-mount body. All of it exists to improve availability and manageability.</li>
          <li><strong>Form factors:</strong> Tower, Rack (1U/2U/4U — the data center standard), Blade and Modular/Composable.</li>
          <li><strong>Rack Unit:</strong> 1U = 1.75 in (44.45 mm). A 42U rack has 42 U of space — but power, cooling, weight and cabling decide how many servers you can really install.</li>
          <li><strong>Power:</strong> Dual PSUs go to separate A and B feeds. Plan so that one feed can carry the whole rack load.</li>
          <li><strong>Cooling:</strong> Front-to-back airflow, hot-aisle/cold-aisle layout, blanking panels in every empty U.</li>
          <li><strong>BMC:</strong> A separate small computer on standby power. It works even when the server is off or the OS has crashed.</li>
          <li><strong>Engineer's daily work:</strong> Walk the rows for amber LEDs, read BMC event logs, replace failed PSUs/drives/fans, track firmware and capacity.</li>
          <li><strong>Tier III / IV view:</strong> The tier rating belongs to the site, not the server. But dual-corded servers on independent A/B paths are what make that design actually work.</li>
          <li><strong>Golden field rule:</strong> Change one thing at a time, note the change, and always know your rollback.</li>
        </ul>
      </div>

      {/* ══════════ 1. WHAT IS A SERVER ══════════ */}
      <h2 id="what-is-a-server" style={S.h2}>What Is a Server?</h2>
      <p style={S.p}>When you watch a video on YouTube, search on Google or make a UPI payment, a computer somewhere is working on your request. That computer is a <strong>server</strong>.</p>
      <p style={S.p}>A server is a dedicated computer system that provides services, data or compute power to other devices (called clients) over a network. The word itself means "one who serves".</p>
      <p style={S.p}>This is called the <strong>client–server model</strong>. The client asks. The server answers. Your phone is the client. The machine in the data center is the server.</p>
      <CodeBlock lang="text">
{`Client (phone / laptop / another server)
        |   request:  "show me my account balance"
        v
   Network (switch → router → internet)
        |
        v
Server (application + database)
        |   response: "₹ 12,450"
        v
Client`}
      </CodeBlock>
      <p style={S.p}>A server is not simply a powerful PC. Its design goal is different. A PC is built to be fast for one person. A server is built to <strong>stay up</strong> for thousands of users, for years, with parts failing and being replaced while it runs.</p>
      <p style={S.p}>Why does this matter to you as a data center engineer? Because almost everything else in the building exists to feed, cool, connect and protect these machines. UPS, generators, CRAC units, fire systems, network — all of it is there for the servers.</p>
      <Callout type="important" title="Server = Hardware + Role">
        The word "server" is used in two ways. A <strong>physical server</strong> is the hardware you rack. A <strong>logical server</strong> is the role — a web server, a database server — which can even be a virtual machine. In this article, "server" mostly means the physical box. Virtual machines are covered in <TopicLink slug="virtualization" variant="inline" />.
      </Callout>

      {/* ══════════ 2. ROLES ══════════ */}
      <h2 id="server-roles" style={S.h2}>Server Roles and Workload Types</h2>
      <p style={S.p}>The same physical server hardware can do very different jobs depending on the software on it. The job decides how you configure the CPU, RAM, storage and network.</p>
      <ComparisonTable
        title="Common Server Roles and What They Need Most"
        headers={["Role", "What It Does", "Hardware That Matters Most"]}
        rows={[
          ["Web / API server", "Serves websites and application requests", "CPU cores, network bandwidth"],
          ["Application server", "Runs business logic (ERP, banking apps)", "CPU, RAM"],
          ["Database server", "Stores and queries structured data", "RAM size, fast NVMe storage, CPU clock/cache"],
          ["File / backup server", "Stores files and backup copies", "Disk capacity, network throughput"],
          ["Virtualization host", "Runs many virtual machines", "Core count, large RAM, many NICs"],
          ["DNS / DHCP / directory", "Network and identity services", "Light hardware — but must be highly available"],
          ["GPU / AI server", "Trains and runs AI models", "GPUs, PCIe lanes, very high power and cooling"],
          ["Edge server", "Compute near the user or site", "Compact size, low power, remote management"],
        ]}
        caption="One server model can be configured for many roles. Sizing always starts from the workload, not from the box."
      />
      <p style={S.p}>A common beginner mistake is to size a server by "how powerful it is". Experienced engineers ask first: what is the workload, how many users, how much data, and what happens if it goes down?</p>
      <p style={S.p}>A database server may need 1 TB of RAM but little CPU. A web server may need lots of cores but little RAM. A backup server may need huge disks and almost no CPU. Same rack space — very different builds.</p>

      {/* ══════════ 3. SERVER VS PC ══════════ */}
      <h2 id="server-vs-pc" style={S.h2}>Server vs Personal Computer</h2>
      <p style={S.p}>"If a server also uses a CPU, RAM and storage, how is it different from a PC?" — a fair question. The difference lies in the features that keep it running continuously.</p>
      <Figure caption="Fig 1 — Server vs PC: key hardware differences across memory, power, storage, management and form factor."><ServerVsPc /></Figure>
      <Callout type="important" title="Availability Is a System Property, Not Just a Server Property">
        Be careful with any uptime claim for a single server. Real service availability comes from the combination of server hardware, redundancy design, software, networking, power infrastructure and operations process. High availability is achieved at system level — not by the server box alone.
      </Callout>
      <h3 style={S.h3}>ECC RAM</h3>
      <p style={S.p}><strong>ECC (Error-Correcting Code)</strong> memory is the server standard. Memory bits can flip because of electrical noise, ageing or even cosmic radiation. It is rare, but at data center scale it happens every day.</p>
      <p style={S.p}>Depending on the implementation, ECC can detect and correct single-bit errors and detect some multi-bit errors. Consumer RAM usually has no such protection. Details are in <TopicLink slug="ram" variant="inline" />.</p>
      <h3 style={S.h3}>Redundant PSUs</h3>
      <p style={S.p}>Most servers have two power supplies. If one fails, the other keeps the server running. The mode — active-active load sharing or active-standby — depends on the server model.</p>
      <p style={S.p}>Ideally, each PSU connects to a separate electrical feed (A and B). Then even a complete power path failure does not stop the server.</p>
      <h3 style={S.h3}>Hot-Swap Components</h3>
      <p style={S.p}>Drives, PSUs and, in many models, fans can be replaced while the server is running. This needs hardware support plus the right OS/RAID configuration — it is not automatic.</p>
      <h3 style={S.h3}>BMC — Remote Management</h3>
      <p style={S.p}>The BMC is a separate small computer on the motherboard with its own network port. It lets you power-cycle, see the screen and read hardware health — even when the OS is dead. Full detail comes later in this article.</p>
      <h3 style={S.h3}>Design Philosophy in One Line</h3>
      <p style={S.p}>A PC asks: "how cheap and fast can this be for one user?" A server asks: "how do I keep this running when something breaks, and how do I fix it without stopping the service?"</p>

      {/* ══════════ 4. FORM FACTORS ══════════ */}
      <h2 id="server-form-factors" style={S.h2}>Server Form Factors</h2>
      <ComparisonTable
        title="Server Form Factors — Comparison"
        headers={["Form Factor", "Physical Shape", "Data Center Use", "Key Characteristic"]}
        rows={[
          ["Tower", "Standalone upright box", "Rarely — wastes space", "Self-contained, no rack needed"],
          ["Rack (1U/2U/4U)", "Horizontal, rack-mounted", "Standard — most DC servers", "Industry-standard 19-inch mounting"],
          ["Blade", "Thin card in a shared chassis", "High-density deployments", "Shared power, cooling, networking in the chassis"],
          ["Modular / Composable", "Disaggregated resource pools", "Large-scale and evolving sites", "CPU/RAM/storage composed on demand"],
          ["OCP / Hyperscale sled", "Open-rack sled, shared busbar power", "Hyperscale data centers", "No per-server PSU; rack-level power shelf"],
        ]}
        caption="Choice of form factor depends on density target, budget, operating model and existing infrastructure."
      />
      <p style={S.p}><strong>Tower server:</strong> A standalone box for a small office or lab. It does not mount in a standard rack, so it wastes space in a data center.</p>
      <p style={S.p}><strong>Rack server:</strong> The data center standard. It mounts in a 19-inch rack on slide rails.</p>
      <p style={S.p}><strong>Blade server:</strong> Many thin server cards share one chassis that supplies power, cooling and network. This gives high density — see <TopicLink slug="blade-server" variant="inline" />.</p>
      <p style={S.p}><strong>Hyperscale/OCP:</strong> Cloud giants strip the server down — no individual PSU, no fancy bezel — and power sleds from a rack busbar. This reduces cost and conversion losses at large scale.</p>

      {/* ══════════ 5. ANATOMY ══════════ */}
      <h2 id="server-anatomy" style={S.h2}>Inside a Server — Component Walkthrough</h2>
      <p style={S.p}>Let us open the lid. You do not need to memorise every part, but you must know what each one does and what its failure looks like.</p>
      <Figure caption="Fig 2 — Block diagram of a 2-socket server: CPUs with their own DIMM channels, PCIe devices, BMC, chipset, UEFI, redundant PSUs and fans. Simplified — exact topology depends on the CPU generation."><ServerAnatomy /></Figure>
      <h3 style={S.h3}>Motherboard</h3>
      <p style={S.p}>CPU sockets, DIMM slots, PCIe slots, storage connectors, NIC and the BMC chip all live here. Server boards usually support one or two CPU sockets (1S or 2S).</p>
      <h3 style={S.h3}>CPU</h3>
      <p style={S.p}>The compute engine. Intel Xeon and AMD EPYC are common; ARM-based CPUs are growing. Server CPUs have more cores, more memory channels, more PCIe lanes and reliability (RAS) features. Deep dive: <TopicLink slug="cpu" variant="inline" />.</p>
      <p style={S.p}>In a 2-socket server each CPU owns some of the DIMMs and PCIe slots. Accessing the other CPU's memory is slower. This is called <strong>NUMA</strong>, and it matters for databases and VMs.</p>
      <h3 style={S.h3}>Memory (RAM)</h3>
      <p style={S.p}>Servers use ECC RDIMMs (or LRDIMMs for very high capacity). Slots are filled in a specific pattern to use all memory channels. A wrong population pattern can silently cut memory speed. See <TopicLink slug="ram" variant="inline" />.</p>
      <h3 style={S.h3}>Storage</h3>
      <p style={S.p}>Front drive bays connect through a backplane to a RAID controller or HBA. Drives may be SAS, SATA or NVMe. Many servers also have a small mirrored M.2 module just for the OS or hypervisor, so data drives stay free.</p>
      <p style={S.p}>RAID controller = hardware RAID with cache. HBA = passes disks straight to the OS for software-defined storage. More in <TopicLink slug="das" variant="inline" />.</p>
      <h3 style={S.h3}>Network Interface Cards</h3>
      <p style={S.p}>Servers have several network ports: one or two for production traffic, others for storage, backup, vMotion/live migration and the BMC. 10/25/100 GbE is common in modern sites. Many use an OCP 3.0 mezzanine NIC. See <TopicLink slug="switch" variant="inline" />.</p>
      <h3 style={S.h3}>Power Supplies and Fans</h3>
      <p style={S.p}>Hot-swap PSUs with efficiency ratings such as 80 Plus Platinum or Titanium. Fans sit in hot-swap modules, usually with N+1 redundancy, and their speed is controlled by temperature sensors.</p>
      <h3 style={S.h3}>PCIe Cards, GPUs and Risers</h3>
      <p style={S.p}>PCIe slots hold extra NICs, HBAs, FPGAs and GPUs. A GPU adds large power and heat — see <TopicLink slug="gpu" variant="inline" />. Check that the PSU, fans and slot support the card before ordering.</p>
      <h3 style={S.h3}>TPM and Secure Boot</h3>
      <p style={S.p}>The <strong>TPM</strong> is a small security chip that stores cryptographic keys for disk encryption and platform integrity checks. <strong>Secure Boot</strong> lets only signed bootloaders and kernels run. Both need to be enabled and configured — having the chip alone is not enough.</p>

      {/* ══════════ 6. RACK MOUNT ══════════ */}
      <h2 id="rack-mount-deployment" style={S.h2}>Rack Mount Deployment — The Full Picture</h2>
      <p style={S.p}>Deploying a server is more than plugging it in. A complete deployment covers physical mounting, power planning, cooling, cabling, the management network and documentation.</p>
      <Callout type="best-practice" title="The 19-Inch Rack Standard">
        Most data center IT equipment follows the 19-inch (EIA-310) standard — the mounting ears are 482.6 mm wide. When ordering, verify the rack width, depth and rail compatibility. Deep servers (800–1000 mm) need deep racks and extra rear space for cables and PSUs.
      </Callout>
      <p style={S.p}>A rack is a steel frame with vertical mounting rails, usually with front and rear doors, cable management, and in-rack power distribution units. In many data centers, racks are the unit of planning for power and cooling — "this rack has 8 kW".</p>
      <p style={S.p}>Racks are arranged in rows. Rows face front-to-front (cold aisle) and back-to-back (hot aisle). Airflow management then keeps cold and hot air from mixing — see <TopicLink slug="airflow-management" variant="inline" /> and <TopicLink slug="containment" variant="inline" />.</p>

      {/* ══════════ 7. RACK UNIT ══════════ */}
      <h2 id="rack-u-explained" style={S.h2}>Rack Unit (U) Explained</h2>
      <p style={S.p}>Rack height is measured in <strong>U (Rack Units)</strong>. <strong>1U = 1.75 inches = 44.45 mm.</strong> It is only a measure of height. It tells you nothing about performance.</p>
      <ComparisonTable
        title="Common Rack Heights"
        headers={["Rack Height", "Total U Capacity", "Typical Use"]}
        rows={[
          ["42U", "42 U slots", "Most common data center standard rack"],
          ["45U", "45 U slots", "Some vendors, slightly taller"],
          ["48U", "48 U slots", "Extended-capacity deployments"],
        ]}
        caption="Usable capacity is lower — PDUs, switches, patch panels, cable managers and blanking panels also use U space."
      />
      <p style={S.p}><strong>1U server:</strong> Thin, few drive bays, high density per U. Used for web servers, API servers and network appliances. Small fans spin fast, so they are louder and use more fan power.</p>
      <p style={S.p}><strong>2U server:</strong> The most versatile and most common in enterprise sites. More drive bays, larger fans (better cooling headroom) and more PCIe slots. Used for databases, virtualization hosts and general compute.</p>
      <p style={S.p}><strong>4U and above:</strong> Large storage servers, 8-GPU AI servers, high-expansion systems. Takes a lot of rack space but gives maximum expansion. AI servers can be 4U–10U and weigh over 100 kg.</p>
      <Figure caption="Fig 3 — Rack elevation showing 1U and 2U servers, network switches, patch panels, blanking panels and PDUs with U positions marked. For illustration only — real deployments vary."><RackElevation /></Figure>
      <Callout type="warning" title="42U Rack ≠ 42 × 1U Servers">
        A 42U rack does not mean you can install 42 servers. The real count is limited by: <strong>Power</strong> — PDU rating and breaker capacity. <strong>Cooling</strong> — heat the room and aisle can remove. <strong>Weight</strong> — rack and floor load rating. <strong>Network</strong> — switch ports and patch panels. <strong>Cabling</strong> — space for cable management. <strong>Redundancy</strong> — the load must still fit when one feed is lost.
      </Callout>
      <h3 style={S.h3}>U Numbering Convention</h3>
      <p style={S.p}>U positions are normally numbered from the bottom (U1) to the top (U42). Asset records say "Rack C12, U20–U21". Always follow your site's convention and label the rack rails — a wrong U number can mean a technician pulls the wrong server.</p>

      {/* ══════════ 8. RACK PLANNING ══════════ */}
      <h2 id="rack-planning" style={S.h2}>Practical Rack Planning</h2>
      <p style={S.p}><strong>Depth and clearance:</strong> Servers are typically 600–900 mm deep. The rack must be deep enough for the server plus cables and PSU handles. Keep enough front clearance to pull a server out on its rails.</p>
      <p style={S.p}><strong>Rails:</strong> Most servers use a slide-rail kit. Fix the rails to the rack, slide the server in, and cable it. Rails must match the vendor and rack type. Tool-less rails save time, but check the latch every time.</p>
      <p style={S.p}><strong>Blanking panels:</strong> Fill every empty U. Without them, hot air from the back flows around to the front and raises server inlet temperature.</p>
      <Figure caption="Fig 4 — Side view of a rack. Servers pull cold-aisle air from the front and exhaust to the hot aisle. An empty U without a blanking panel lets hot air recirculate to the front."><RackAirflow /></Figure>
      <p style={S.p}><strong>Hot-aisle / cold-aisle orientation:</strong> Mount every server in the same direction — intake at the front facing the cold aisle, exhaust at the rear. One backwards server pumps hot air into the cold aisle. Always check the airflow direction label (some network switches come in both directions).</p>
      <p style={S.p}><strong>Cable management:</strong> Keep power, network and management cables separate, tidy and labelled. Bad cabling blocks airflow, slows troubleshooting and causes accidental disconnections.</p>
      <Figure caption="Fig 5 — Redundant A/B power path: a dual-PSU server connected to separate A and B rack PDUs on independent electrical circuits."><DualPsuPower /></Figure>
      <p style={S.p}><strong>A/B redundant power:</strong> Connect PSU 1 to PDU A and PSU 2 to PDU B. The two PDUs should come from separate upstream paths — separate UPS, breakers and distribution. Then a complete path failure does not stop the server. See <TopicLink slug="pdu" variant="inline" /> and <TopicLink slug="ups" variant="inline" />.</p>
      <p style={S.p}><strong>Weight planning:</strong> A loaded 2U server can weigh 20–30 kg or more; AI servers can exceed 100 kg. Place heavy equipment low in the rack to keep the centre of gravity low. Check floor and rack load ratings, and use a server lift for heavy units.</p>
      <p style={S.p}><strong>Space for growth:</strong> Do not fill the rack to 100% on day one. Leave room for expansion, but also leave power and cooling headroom — space is rarely the first limit; power usually is.</p>
      <ComparisonTable
        title="Rack Planning Checklist"
        headers={["Check", "Question to Ask", "Why It Matters"]}
        rows={[
          ["Power", "Does total load fit on ONE feed after failover?", "A/B redundancy fails if both feeds run near their limit"],
          ["Cooling", "Is the rack within its kW cooling envelope?", "Hot spots shorten server life and trigger throttling"],
          ["Weight", "Is the rack + floor load rating enough?", "Safety and structural limit"],
          ["Network", "Are switch ports and cable lengths available?", "No port = no service"],
          ["Airflow", "Are blanking panels and brush strips in place?", "Prevents recirculation"],
          ["Labels", "Rack ID, U number, hostname, port labels?", "Fast, error-free troubleshooting"],
          ["Documentation", "Entered in DCIM / asset database?", "You cannot manage what you have not recorded"],
        ]}
        caption="Use this checklist for every new server or rack change request."
      />

      {/* ══════════ 9. POWER COOLING MATH ══════════ */}
      <h2 id="power-cooling-math" style={S.h2}>Power and Cooling Math for a Server</h2>
      <p style={S.p}>Every watt a server draws becomes heat. Almost 100% of the electrical power going into IT equipment is released as heat in the room. So power planning and cooling planning are two sides of one coin.</p>
      <h3 style={S.h3}>Typical Power Draw</h3>
      <ComparisonTable
        title="Rough Power Ranges (Indicative Only)"
        headers={["Server Type", "Typical Power Range", "Note"]}
        rows={[
          ["1U 2-socket general server", "300–800 W", "Depends on CPU, RAM and drives"],
          ["2U virtualization host (full RAM)", "500–1,000 W", "Large RAM adds significantly"],
          ["Storage-dense 4U server", "800–1,500 W", "Many spinning drives"],
          ["8-GPU AI server", "6,000–10,000+ W", "Needs very high-density power and often liquid cooling"],
        ]}
        caption="Always use the vendor power calculator for the real configuration. Nameplate power is a maximum, not the normal operating draw."
      />
      <p style={S.p}><strong>Nameplate vs actual:</strong> The label on the PSU shows the maximum rating. A server rarely draws that much. Real draw depends on load. Plan with measured values from the BMC or PDU, and keep a margin.</p>
      <h3 style={S.h3}>Worked Example — A/B Rack Power</h3>
      <p style={S.p}>Take a rack with two 32 A, 230 V single-phase PDUs (A and B). Each PDU can deliver about 32 × 230 = 7.36 kVA.</p>
      <p style={S.p}>Electrical practice limits a continuous load to about 80% of the breaker rating. So each feed can carry roughly 7.36 × 0.8 = 5.9 kVA continuously.</p>
      <p style={S.p}>In a 2N A/B design, every server draws from both feeds. If feed A fails, feed B must carry the <em>whole</em> rack. So the total rack load must stay below about 5.9 kVA — not 2 × 5.9. In normal operation each feed carries only half.</p>
      <CodeBlock lang="text">
{`Feed capacity (each)     : 32 A × 230 V        = 7.36 kVA
Continuous limit (80%)   : 7.36 × 0.8          = 5.9 kVA
Rack total must be ≤ 5.9 kVA   (so B can carry everything if A fails)
Normal state             : A ≈ 2.9 kVA, B ≈ 2.9 kVA`}
      </CodeBlock>
      <Callout type="common-mistake" title="The Classic A/B Trap">
        Engineers load both PDUs to 70–80% each "because there are two feeds". On a feed failure, the surviving PDU would need 140–160% — its breaker trips, and the whole rack goes dark. Redundancy exists only if one feed can carry everything. Actual limits depend on site design, breaker types and local electrical codes.
      </Callout>
      <h3 style={S.h3}>Power to Heat to Airflow</h3>
      <p style={S.p}>Useful conversions: <strong>1 kW ≈ 3,412 BTU/hr</strong>. And 1 ton of refrigeration = 12,000 BTU/hr ≈ 3.5 kW.</p>
      <p style={S.p}>Servers also need airflow. A common rule of thumb is <strong>CFM ≈ 3,160 × kW ÷ ΔT(°F)</strong>, where ΔT is the temperature rise from server inlet to exhaust. For a 5 kW rack with ΔT of 20 °F, you need about 790 CFM through the rack.</p>
      <p style={S.p}>If the room supplies less air than the servers pull, servers start taking hot exhaust air from the back — that is recirculation. This is why airflow management matters so much.</p>
      <p style={S.p}>ASHRAE recommends a server inlet temperature of about 18–27 °C. Many sites now run at the higher end to save energy, but only if airflow is well managed. See <TopicLink slug="crac" variant="inline" /> and <TopicLink slug="airflow-management" variant="inline" />.</p>
      <h3 style={S.h3}>Rack Density in Practice</h3>
      <p style={S.p}>Traditional enterprise racks run around 4–10 kW. High-density racks reach 15–30 kW with good containment. AI/GPU racks go to 40–100+ kW and usually need rear-door heat exchangers or direct-to-chip liquid cooling.</p>
      <p style={S.p}>Actual limits depend on project design, cooling architecture and utility capacity.</p>

      {/* ══════════ 10. CABLING ══════════ */}
      <h2 id="cabling" style={S.h2}>Cabling — Power, Network and Management</h2>
      <p style={S.p}>A single server may have four to ten cables. Multiply that by 40 servers in a rack and cabling becomes a real engineering topic.</p>
      <ComparisonTable
        title="Cables on a Typical Server"
        headers={["Cable", "Purpose", "Good Practice"]}
        rows={[
          ["Power ×2", "PSU 1 → PDU A, PSU 2 → PDU B", "Use locking or colour-coded cords (A and B different colours)"],
          ["Production network ×2", "Application traffic to two different switches", "Bond/team across two switches for redundancy"],
          ["Storage / backup network", "SAN, iSCSI, NFS or backup traffic", "Separate VLAN or physical network"],
          ["BMC / management ×1", "iDRAC / iLO / XCC dedicated port", "Management VLAN only — never expose to the internet"],
          ["Console / USB (temporary)", "Local setup", "Remove after commissioning"],
        ]}
        caption="Cable counts vary by design. Follow the site cabling standard and label both ends."
      />
      <p style={S.p}><strong>Labelling:</strong> Label both ends of every cable with hostname, port and destination. A common standard is ANSI/TIA-606. A labelled cable can be traced in seconds; an unlabelled one can take an hour and a risky guess.</p>
      <p style={S.p}><strong>Copper vs fibre:</strong> Short links (inside a rack, up to about 5 m) can use DAC (direct attach copper) cables. Longer links use fibre with transceivers (SFP+/SFP28/QSFP). Handle fibre connectors carefully — dust on the end-face is a leading cause of link errors.</p>
      <p style={S.p}><strong>Cable routing:</strong> Keep power cables and data cables on opposite sides where possible. Do not block the rear of the server — fans and PSUs need free airflow, and you need room to pull the PSU out. Never bend a cable tighter than its minimum bend radius.</p>
      <Callout type="best-practice" title="Engineer Tip — Two Colours for Two Feeds">
        Use red power cords for feed A and blue for feed B (or whatever your site standard is). During an emergency at 3 AM, nobody should need to trace a cable to learn which feed it is on.
      </Callout>

      {/* ══════════ 11. BOOT FLOW ══════════ */}
      <h2 id="boot-flow" style={S.h2}>Server Boot Flow</h2>
      <Figure caption="Fig 6 — Server boot sequence: power applied, BMC init (on standby power), UEFI POST, boot device selection, bootloader, then OS/hypervisor."><ServerBootFlow /></Figure>
      <p style={S.p}><strong>Step 1 — Power applied, BMC starts:</strong> As soon as AC is connected, the PSUs give standby power to the BMC. The BMC boots first and starts watching hardware health. The main CPU is still off.</p>
      <p style={S.p}><strong>Step 2 — UEFI / BIOS POST:</strong> The firmware initialises the CPU, memory and PCIe devices and runs the Power-On Self-Test. Problems show up as error codes, LED patterns or log entries. Memory training on a large-RAM server can take several minutes.</p>
      <p style={S.p}><strong>Step 3 — Boot device:</strong> The firmware picks the first valid device in the boot order: local drive, mirrored M.2/BOSS module, PXE (network), SAN boot or USB. PXE is used to install operating systems on many servers automatically.</p>
      <p style={S.p}><strong>Step 4 — Bootloader to OS/hypervisor:</strong> GRUB, Windows Boot Manager or the hypervisor loader starts the kernel. Services come up. If Secure Boot is on, each stage is signature-checked.</p>
      <p style={S.p}>Boot time depends on hardware, memory size, option ROMs and the OS. A big server may take 3–10 minutes to reach the OS — so patching windows must allow for it.</p>
      <Callout type="maintenance" title="Why This Matters in the Field">
        If a server "does not boot", you must know <em>where</em> in this sequence it stopped. No BMC response = power/standby problem. Stuck at POST = hardware (RAM, CPU, PCIe). Reaches boot but no OS = storage, boot order or bootloader.
      </Callout>

      {/* ══════════ 12. BMC ══════════ */}
      <h2 id="bmc-management" style={S.h2}>BMC and Out-of-Band Management</h2>
      <p style={S.p}>Imagine 500 servers and a broken one at 2 AM. Running to the data hall with a keyboard and monitor for each fault is impractical. The BMC solves this.</p>
      <p style={S.p}>The <strong>Baseboard Management Controller</strong> is a small, independent computer on the server board. It has its own firmware and its own dedicated network port, normally on a separate management VLAN.</p>
      <p style={S.p}>"Out-of-band" means the management path is separate from the production path. If the OS crashes or the production network is down, the BMC is still reachable. <strong>It needs standby power</strong> — a completely unplugged server has no BMC.</p>
      <h3 style={S.h3}>What the BMC Can Do</h3>
      <ul style={S.ul}>
        <li>Remote power on, off, reset and power-cycle.</li>
        <li>Virtual console — keyboard, video and mouse over the network.</li>
        <li>Remote media — mount an ISO and install an OS without visiting the site.</li>
        <li>Hardware health — temperatures, fans, PSU, drives, memory errors.</li>
        <li>System Event Log (SEL) — the black-box record of hardware events.</li>
        <li>Firmware and BIOS updates, and alerts through SNMP, syslog or email.</li>
      </ul>
      <h3 style={S.h3}>Vendor Names and Standards</h3>
      <ComparisonTable
        title="BMC Implementations"
        headers={["Vendor", "BMC Name", "Typical Tools"]}
        rows={[
          ["Dell", "iDRAC", "iDRAC web UI, racadm, OpenManage"],
          ["HPE", "iLO", "iLO web UI, ilorest, OneView"],
          ["Lenovo", "XCC (XClarity Controller)", "XCC UI, XClarity Administrator"],
          ["Supermicro", "IPMI / Redfish BMC", "Web UI, IPMIView, ipmitool"],
          ["Cisco", "CIMC / Intersight", "CIMC UI, Intersight"],
          ["Open / hyperscale", "OpenBMC", "Redfish API, custom tooling"],
        ]}
        caption="Names and tools change with generations. Verify current documentation from the vendor."
      />
      <p style={S.p}><strong>IPMI v2.0</strong> is the older standard. <strong>Redfish</strong> is the modern REST/JSON-based standard from DMTF and is the future direction. Many sites use both during the transition.</p>
      <h3 style={S.h3}>Useful BMC Commands</h3>
      <CodeBlock lang="bash" label="ipmitool — generic IPMI (password from environment, not typed on the command line)">
{`# Power state
ipmitool -I lanplus -H <bmc-ip> -U <user> -E chassis power status

# Read the system event log
ipmitool -I lanplus -H <bmc-ip> -U <user> -E sel list

# Temperatures and fans
ipmitool -I lanplus -H <bmc-ip> -U <user> -E sdr type Temperature
ipmitool -I lanplus -H <bmc-ip> -U <user> -E sdr type Fan`}
      </CodeBlock>
      <CodeBlock lang="bash" label="Redfish — vendor-neutral REST API">
{`curl -sk -u <user> https://<bmc-ip>/redfish/v1/Systems`}
      </CodeBlock>
      <Callout type="danger" title="Secure the BMC — It Is a Powerful Door">
        The BMC can power-cycle a server, mount media and reflash firmware. Never place the BMC network on the public internet. Put it on an isolated management VLAN, change default credentials at commissioning, use strong unique passwords or directory login, disable IPMI-over-LAN if you do not need it, and keep BMC firmware patched.
      </Callout>

      {/* ══════════ 13. REDUNDANCY ══════════ */}
      <h2 id="redundancy" style={S.h2}>Redundancy in Servers</h2>
      <p style={S.p}>Redundancy means that a single failure does not stop the service. Servers apply it at many levels.</p>
      <ComparisonTable
        title="Redundancy Inside and Around a Server"
        headers={["Layer", "Mechanism", "What It Protects Against"]}
        rows={[
          ["Power supply", "1+1 hot-swap PSUs on A/B feeds", "PSU failure or loss of one power path"],
          ["Cooling", "N+1 hot-swap fan modules", "Single fan failure"],
          ["Memory", "ECC, plus optional mirroring/sparing modes", "Bit errors and failing DIMM cells"],
          ["Storage", "RAID 1 / 5 / 6 / 10, hot spare", "Drive failure"],
          ["Network", "NIC bonding / LACP across two switches", "NIC, cable or switch failure"],
          ["Boot", "Mirrored M.2 / BOSS boot module", "OS drive failure"],
          ["Server level", "Clusters, VM failover, load balancers", "Whole-server failure"],
        ]}
        caption="Exact features depend on the server model and configuration."
      />
      <p style={S.p}><strong>PSU redundancy:</strong> 1+1 is common. Size each PSU so that one alone can carry the full server load. In active-active mode both share the load; in active-standby mode one carries it all. Check the OEM manual.</p>
      <p style={S.p}><strong>Storage:</strong> RAID 1 mirrors two drives. RAID 5 uses parity across three or more drives. RAID 6 survives two failures. RAID 10 stripes mirrored pairs. <strong>RAID is not backup</strong> — it protects against drive failure, not against deletion, ransomware or a burning building. See <TopicLink slug="backup" variant="inline" />.</p>
      <p style={S.p}><strong>Network:</strong> Two NIC ports bonded to two different switches. If a switch fails or is upgraded, traffic continues on the other. Always test the failover, not only the configuration.</p>
      <p style={S.p}><strong>Beyond one server:</strong> No single server is perfectly reliable. Real high availability uses multiple servers — clusters, load balancers and VM failover. See <TopicLink slug="load-balancer" variant="inline" /> and <TopicLink slug="virtualization" variant="inline" />.</p>

      {/* ══════════ 14. TIER III / IV ══════════ */}
      <h2 id="tier-iii-iv-view" style={S.h2}>Servers in Tier III and Tier IV Data Centers</h2>
      <p style={S.p}>Let us connect the server to the building. First, the view from normal industry, then from the data center, then from Tier III and Tier IV.</p>
      <ComparisonTable
        title="Same Server — Four Views"
        headers={["View", "What the Server Is", "What Matters"]}
        rows={[
          ["Normal office / IT room", "One box under a desk or in a small rack", "Cost, convenience; downtime is acceptable"],
          ["Data center", "One of hundreds in a managed rack", "Rack power/cooling, remote management, labelled cabling"],
          ["Tier III site", "Dual-corded server on a concurrently maintainable infrastructure", "Any single power/cooling component can be taken out for maintenance with no IT impact"],
          ["Tier IV site", "Dual-corded server on a fault-tolerant infrastructure", "Any single unplanned failure — even a whole path — does not impact IT"],
        ]}
        caption="Tier classification (Uptime Institute) describes site infrastructure. It does not rate a server. Actual implementation depends on project requirements, utility requirements, OEM design and data center architecture."
      />
      <h3 style={S.h3}>Tier III Design Philosophy</h3>
      <p style={S.p}>Tier III is <strong>concurrently maintainable</strong>. Every capacity component and distribution path can be taken out of service for planned maintenance without shutting down IT equipment.</p>
      <p style={S.p}>Usually there is an N+1 design with multiple distribution paths, but typically one path is active and the other is alternate. Uptime Institute commonly cites about 99.982% availability for Tier III (roughly 1.6 hours of downtime a year).</p>
      <p style={S.p}>For servers this means: dual PSUs go to two independent PDUs, so engineers can shut one path for maintenance while servers keep running on the other. This is exactly why A/B cabling discipline is critical.</p>
      <h3 style={S.h3}>Tier IV Design Philosophy</h3>
      <p style={S.p}>Tier IV is <strong>fault tolerant</strong>. It must survive any single unplanned failure — including a full power path — without IT impact. It typically uses 2N or 2(N+1) with two simultaneously active paths and compartmentalised (physically separated) systems. Uptime Institute commonly cites about 99.995% availability (around 26 minutes a year).</p>
      <p style={S.p}>For servers: dual-corded equipment is essential. A single-corded server is a single point of failure even in a Tier IV building, because it sits on only one path.</p>
      <Callout type="warning" title="Single-Corded Devices Break the Design">
        Some appliances and old devices have only one power cord. Do not plug them into one PDU and hope. Use a rack-level or room-level static transfer switch (see <TopicLink slug="sts" variant="inline" />) or an automatic transfer switch so the device can survive the loss of one path. Document these devices as exceptions.
      </Callout>
      <h3 style={S.h3}>What the Server Engineer Must Do for Tier III / IV</h3>
      <ul style={S.ul}>
        <li>Ensure every server with two PSUs is cabled to <strong>both</strong> A and B — never both PSUs to one PDU.</li>
        <li>Keep total rack load within what a single feed can carry after failover.</li>
        <li>Before planned power maintenance, check that no server is running on a single PSU by mistake.</li>
        <li>Verify that PSU and network failover alerts reach monitoring when a path is removed.</li>
        <li>Place workload replicas (cluster nodes) in different racks and, ideally, different power zones.</li>
      </ul>
      <p style={S.p}>For the infrastructure side, see <TopicLink slug="ups" variant="inline" />, <TopicLink slug="pdu" variant="inline" /> and <TopicLink slug="data-center-types" variant="inline" />.</p>

      {/* ══════════ 15. INSTALLATION ══════════ */}
      <h2 id="installation-commissioning" style={S.h2}>Installation and Commissioning</h2>
      <p style={S.p}>A good installation is slow and boring on purpose. Most field failures can be traced back to a skipped step during commissioning.</p>
      <h3 style={S.h3}>Phase 1 — Before the Server Arrives</h3>
      <ul style={S.ul}>
        <li>Approved change request with date, rack, U position and rollback.</li>
        <li>Power, cooling and port capacity confirmed for the target rack.</li>
        <li>IP addresses reserved for the BMC and OS; hostnames agreed.</li>
        <li>Rails, power cords, cables, transceivers and labels ready.</li>
      </ul>
      <h3 style={S.h3}>Phase 2 — Receiving and Inspection</h3>
      <p style={S.p}>Check the box for shipping damage. Match serial numbers with the purchase order. Record the service tag and serial in the asset database. Inspect DIMMs, drives and PSUs — loose parts after transport do happen.</p>
      <h3 style={S.h3}>Phase 3 — Racking</h3>
      <ol style={S.ul}>
        <li>Fit rails at the correct U position and lock them.</li>
        <li>Lift the server with two people or a server lift. Never lift by the handles of the bezel or the PSU.</li>
        <li>Slide it in until the latches click; test sliding in and out once.</li>
        <li>Install the cable management arm only if your site standard allows it (some reduce airflow).</li>
      </ol>
      <h3 style={S.h3}>Phase 4 — Cabling</h3>
      <p style={S.p}>Connect PSU 1 to PDU A and PSU 2 to PDU B. Connect network ports to two different switches. Connect the BMC port to the management switch. Label every cable at both ends. Verify the link LEDs.</p>
      <h3 style={S.h3}>Phase 5 — First Power-On and Baseline</h3>
      <ul style={S.ul}>
        <li>Power on and watch POST via the BMC virtual console. Note any warnings.</li>
        <li>Change the default BMC credentials and set the BMC IP, time (NTP), and alert destinations.</li>
        <li>Update firmware to the approved baseline: BIOS/UEFI, BMC, NIC, RAID/HBA, drives.</li>
        <li>Configure RAID, boot order, power profile and Secure Boot as per design.</li>
        <li>Install the OS or hypervisor (PXE or remote media) and apply the standard build.</li>
      </ul>
      <h3 style={S.h3}>Phase 6 — Testing and Burn-In</h3>
      <ul style={S.ul}>
        <li><strong>Hardware check:</strong> memory count and speed correct, all drives visible, no errors in the BMC log.</li>
        <li><strong>Stress/burn-in:</strong> run a CPU and memory stress for several hours and watch temperatures and fans.</li>
        <li><strong>Redundancy test:</strong> with an approved procedure, remove one power cord and confirm the server stays up and the alert fires; restore it and confirm the alert clears. Repeat for the other PSU.</li>
        <li><strong>Network test:</strong> unplug one NIC link and confirm failover works.</li>
        <li><strong>Alerting test:</strong> confirm the monitoring system receives BMC traps and OS metrics.</li>
      </ul>
      <Callout type="warning" title="Do Not Test Redundancy on a Live Production Rack Without Approval">
        Pulling a power cord is a real test, and a wrong move on a live rack can cause an outage. Do it on a new, not-yet-live server, or only under an approved Method of Procedure (MOP) with the right people informed.
      </Callout>
      <h3 style={S.h3}>Phase 7 — Handover</h3>
      <p style={S.p}>Update DCIM and the asset database with rack, U, serials, MAC addresses, IPs and cable map. Save the configuration baseline. Hand over to the operations team with a sign-off record. See <TopicLink slug="dcim" variant="inline" />.</p>

      {/* ══════════ 16. OPERATIONS ══════════ */}
      <h2 id="operations-monitoring" style={S.h2}>Daily Operations and Monitoring</h2>
      <h3 style={S.h3}>What Operations Look Like</h3>
      <p style={S.p}>The server engineer's day is a mix of routine rounds, ticket handling and planned changes. A good team prevents incidents by catching small things early.</p>
      <h3 style={S.h3}>Shift Round Checklist</h3>
      <ul style={S.ul}>
        <li>Walk the aisles and look for amber/red LEDs on servers, PSUs, fans and drives.</li>
        <li>Check for unusual noise — a fan failing or running at full speed.</li>
        <li>Review the BMC/monitoring console for new hardware alerts.</li>
        <li>Check rack inlet temperature and humidity readings against limits.</li>
        <li>Confirm no empty U without blanking panels and no loose cables.</li>
        <li>Record findings in the shift log and hand over open items.</li>
      </ul>
      <h3 style={S.h3}>What to Monitor</h3>
      <ComparisonTable
        title="Server Monitoring Layers"
        headers={["Layer", "What to Watch", "Source"]}
        rows={[
          ["Hardware health", "CPU/inlet temperature, fan RPM, PSU status, drive and memory errors, SEL", "BMC via IPMI / Redfish / SNMP"],
          ["Power", "Watts per server, per rack, per feed", "BMC, intelligent PDU, DCIM"],
          ["OS metrics", "CPU, RAM, disk I/O, network, process health", "Agents (Prometheus node_exporter, Zabbix, etc.)"],
          ["Application", "Response time, error rate", "APM / application monitoring"],
          ["Environment", "Rack inlet temp, humidity, leak", "Sensors, BMS, DCIM"],
        ]}
        caption="Alerts must reach a person who can act. An alarm nobody receives is the same as no alarm."
      />
      <p style={S.p}><strong>Out-of-band alerts:</strong> BMC alerts via SNMP traps, email or syslog reach you even after the OS crashes. They are the most important hardware alerts.</p>
      <p style={S.p}><strong>Alert hygiene:</strong> Too many alarms create alarm fatigue. Tune thresholds, group alerts by severity and review them regularly. A critical alert should be rare and always actionable.</p>
      <h3 style={S.h3}>Capacity Tracking</h3>
      <p style={S.p}>Track four capacities per rack: <strong>power</strong> (kW used vs limit), <strong>cooling</strong>, <strong>space</strong> (free U) and <strong>network</strong> (free ports). The first one to run out is the real limit — usually power. See <TopicLink slug="bms" variant="inline" /> for environmental monitoring.</p>
      <h3 style={S.h3}>Change and Incident Discipline</h3>
      <p style={S.p}>Planned work goes through change management: description, risk, window, approval, rollback. Incidents get a ticket, severity, owner and timeline. This habit separates a professional operation from a risky one.</p>

      {/* ══════════ 17. MAINTENANCE ══════════ */}
      <h2 id="maintenance" style={S.h2}>Preventive Maintenance and Firmware</h2>
      <h3 style={S.h3}>Physical Preventive Maintenance</h3>
      <ul style={S.ul}>
        <li>Check and clean dust at server intakes and rack filters/doors; dust blocks airflow and traps heat.</li>
        <li>Check fan health from the BMC; replace fans that show rising RPM or errors.</li>
        <li>Check PSU status and cord seating; confirm both PSUs share load as expected.</li>
        <li>Check that blanking panels, brush strips and rack doors are in place.</li>
        <li>Check RAID cache battery/capacitor health and drive predictive-failure alerts.</li>
        <li>Keep critical spares on site: PSUs, fans, common drives, DIMMs, power cords, transceivers.</li>
      </ul>
      <h3 style={S.h3}>Firmware Lifecycle</h3>
      <p style={S.p}>Firmware exists everywhere: BIOS/UEFI, BMC, NIC, RAID/HBA, drives, backplane, PSU. Updates fix bugs and security issues — but a bad update can also break things.</p>
      <ol style={S.ul}>
        <li>Read the vendor release notes and compatibility matrix.</li>
        <li>Test the bundle on a non-production or lab server first.</li>
        <li>Take a configuration backup and confirm a rollback path.</li>
        <li>Update production in small batches during an approved window.</li>
        <li>Verify health and performance after each batch before continuing.</li>
      </ol>
      <p style={S.p}>Vendors offer firmware bundles (for example Dell repository bundles, HPE Service Pack for ProLiant, Lenovo update packs) that are tested together. Using the vendor bundle is safer than updating components one by one.</p>
      <Callout type="warning" title="Never Interrupt a Firmware Update">
        Power loss or a reset during a BIOS/BMC/RAID firmware flash can brick the component. Check that the server is on stable power, keep both PSUs live, and wait for the completion message — even if it looks stuck.
      </Callout>
      <h3 style={S.h3}>Support Contracts</h3>
      <p style={S.p}>Enterprise servers usually come with OEM support — for example next-business-day or 4-hour on-site response. Know your contract level, keep the service tag handy and use the vendor's diagnostic logs when raising a case.</p>

      {/* ══════════ 18. TROUBLESHOOTING ══════════ */}
      <h2 id="troubleshooting" style={S.h2}>Common Faults and Troubleshooting</h2>
      <p style={S.p}>Good troubleshooting is a method, not a trick. Follow the same steps every time and you will be faster and safer.</p>
      <Figure caption="Fig 7 — A seven-step troubleshooting flow: alert, scope, out-of-band check, physical check, isolate, fix and verify, record."><ServerTroubleshootFlow /></Figure>
      <h3 style={S.h3}>Server Not Powering On</h3>
      <p style={S.p}>Check PSU LEDs and that both A and B feeds are live. Is the BMC reachable? If yes, try a remote power-on from the BMC. If the BMC is also dead, suspect AC feed, PDU outlet, power cord or both PSUs. Reseat the PSU and try a known-good cord.</p>
      <h3 style={S.h3}>Server Running but Not Reachable</h3>
      <p style={S.p}>Open the BMC virtual console. You may see a kernel panic, a hung OS or a frozen login. Check the SEL for hardware events. If it is only a network issue, check NIC link lights, switch port status and VLAN. A power cycle from the BMC is the last resort, not the first.</p>
      <h3 style={S.h3}>Drive Failure Alert</h3>
      <p style={S.p}>Identify the slot from the controller or BMC and the bay LED. Check the RAID state (degraded?). Confirm a recent backup exists. Hot-swap the failed drive with the same type, and watch the rebuild. During a rebuild the array is more exposed — avoid heavy changes. More in <TopicLink slug="das" variant="inline" />.</p>
      <h3 style={S.h3}>PSU Failure</h3>
      <p style={S.p}>The BMC will flag which PSU. A redundant server keeps running. Check whether the feed or the PSU failed — move the cord to another outlet or compare with the other PSU. Hot-swap the failed PSU and confirm both PSUs now show OK and the alert clears.</p>
      <h3 style={S.h3}>Overheating and Fan Faults</h3>
      <p style={S.p}>Read temperature and fan sensors from the BMC. Check rack inlet temperature, missing blanking panels, blocked filters, reversed server orientation and cable bundles behind the server. Replace failed fan modules. Also check heatsink seating if one CPU is much hotter than the other.</p>
      <h3 style={S.h3}>Memory Errors and Random Reboots</h3>
      <p style={S.p}>Correctable ECC errors are logged but harmless in small numbers. A rising count on one DIMM is an early warning — replace it during a planned window. Uncorrectable errors can crash the server.</p>
      <CodeBlock lang="bash" label="Linux — look for memory/CPU hardware errors">
{`dmesg -T | grep -i -E "mce|edac|ecc|hardware error"
ipmitool sel elist
edac-util -v        # if EDAC tools are installed
dmidecode -t memory # DIMM slots, size, speed`}
      </CodeBlock>
      <h3 style={S.h3}>POST Error / Server Does Not Boot</h3>
      <p style={S.p}>Capture the POST message or LED code through the BMC. Typical causes: a new DIMM unseated or incompatible, a faulty PCIe card, a bad firmware change, or a failed boot drive. Think about the <em>last change</em> and undo it first.</p>
      <h3 style={S.h3}>Slow Performance</h3>
      <p style={S.p}>Check whether the CPU is thermal-throttling, memory is running at a lower speed than expected, a RAID cache battery has failed (forcing write-through), or the network link negotiated at a lower speed. Hardware is often the hidden cause of "software slowness".</p>
      <ComparisonTable
        title="Symptom to First Check — Quick Table"
        headers={["Symptom", "First Thing to Check", "Tool"]}
        rows={[
          ["No power, no LEDs", "A/B feed, PDU outlet, cord, PSU", "Multimeter/PDU display, visual"],
          ["Powers on, no video", "RAM seating, CPU, PCIe cards", "BMC console, POST code"],
          ["Amber system LED", "Hardware event in SEL", "BMC / ipmitool"],
          ["Fans at full speed", "Inlet temperature, failed fan, sensor", "BMC sensors"],
          ["Degraded RAID", "Failed or removed drive", "Controller CLI/BMC"],
          ["Network down", "Link light, bond, switch port, VLAN", "ethtool, switch CLI"],
        ]}
        caption="Quick reference only — always combine with logs and the last-change record."
      />

      {/* ══════════ 19. FAILURE SCENARIOS ══════════ */}
      <h2 id="failure-scenarios" style={S.h2}>Real Failure Scenarios and RCA</h2>
      <p style={S.p}>These are typical scenarios seen in operating data centers. Names and numbers are generic, but the patterns are real.</p>
      <h3 style={S.h3}>Scenario 1 — One Feed Fails and the Second Trips (The Domino)</h3>
      <p style={S.p}><strong>What happened:</strong> Feed A went down because of an upstream fault. Servers moved their full load to feed B. The B PDU breaker tripped within seconds and the entire rack lost power.</p>
      <p style={S.p}><strong>Root cause:</strong> Both feeds were each loaded to about 65–70% "because there are two feeds". After failover, B needed to carry over 130%.</p>
      <p style={S.p}><strong>Prevention:</strong> Keep total rack load within a single feed's safe limit. Monitor per-feed load in DCIM and alert at a threshold (for example 40–45% per feed in a 2N design).</p>
      <h3 style={S.h3}>Scenario 2 — Both PSUs on the Same PDU</h3>
      <p style={S.p}><strong>What happened:</strong> During planned maintenance on path A, a server went down even though it had two PSUs.</p>
      <p style={S.p}><strong>Root cause:</strong> A rushed installation connected both PSUs to PDU A. The server looked redundant but was not.</p>
      <p style={S.p}><strong>Prevention:</strong> Colour-coded cords, a post-installation audit, and a pre-maintenance check of every server's PSU status on the affected path.</p>
      <h3 style={S.h3}>Scenario 3 — Hot Spot After a "Small" Change</h3>
      <p style={S.p}><strong>What happened:</strong> A server in the middle of a rack throttled and then shut down at night. The BMC log showed an inlet over-temperature.</p>
      <p style={S.p}><strong>Root cause:</strong> Two servers were removed the previous day and the blanking panels were not replaced. Hot air recirculated through the gap.</p>
      <p style={S.p}><strong>Prevention:</strong> Make "install blanking panels" part of the decommission checklist. Add rack-inlet temperature alarms.</p>
      <h3 style={S.h3}>Scenario 4 — Memory Errors Ignored</h3>
      <p style={S.p}><strong>What happened:</strong> A database server crashed with a machine-check error. Months earlier, the SEL had shown hundreds of correctable errors on one DIMM.</p>
      <p style={S.p}><strong>Root cause:</strong> Nobody monitored or acted on correctable memory errors.</p>
      <p style={S.p}><strong>Prevention:</strong> Alert on rising DIMM error counts and replace the module in a planned window before it becomes uncorrectable.</p>
      <h3 style={S.h3}>Scenario 5 — Firmware Update Gone Wrong</h3>
      <p style={S.p}><strong>What happened:</strong> A RAID controller firmware update was pushed to all servers at once. A bug caused drives to drop on several servers.</p>
      <p style={S.p}><strong>Root cause:</strong> No staged rollout and no test on one non-production server.</p>
      <p style={S.p}><strong>Prevention:</strong> Staged rollout, release-note review and a rollback plan for every firmware change.</p>
      <Callout type="best-practice" title="How to Write a Good RCA">
        Timeline of events, direct cause, root cause (the "why" behind the "why"), impact, what worked, what did not, corrective actions with an owner and a date. An RCA is not about blame — it is about making sure the same failure cannot happen twice.
      </Callout>

      {/* ══════════ 20. SAFETY ══════════ */}
      <h2 id="safety-practices" style={S.h2}>Safety Practices</h2>
      <p style={S.p}>Servers look harmless, but a data hall has real hazards: electricity, weight, heat, noise and sharp edges. Follow your site safety rules and permit-to-work process first. The points below are general good practice.</p>
      <ComparisonTable
        title="Server Room Safety — Hazard and Control"
        headers={["Hazard", "Risk", "Control"]}
        rows={[
          ["Heavy equipment", "Back injury, crushed hands, dropped server", "Two-person lift or server lift; lift from the chassis, not from the bezel/PSU"],
          ["Rack tipping", "Rack falls when several heavy servers are pulled out", "Load heavy gear low; use stabiliser feet; pull out only one server at a time"],
          ["Electrical", "Shock inside PSU or PDU, short circuits", "Do not open PSUs; follow lockout/tagout for PDU circuits; use insulated tools"],
          ["Multiple power cords", "Server stays energised after one cord is removed", "Disconnect ALL power cords before opening the server"],
          ["Static discharge (ESD)", "Silent damage to DIMMs, CPUs, cards", "ESD wrist strap or mat, hold parts by edges, use antistatic bags"],
          ["Hot surfaces", "Burns from heatsinks, PSUs, drives", "Let hot parts cool; use gloves where required"],
          ["Fibre optics", "Eye damage from invisible laser light", "Never look into a fibre end or transceiver; cap unused ports"],
          ["Noise", "Hearing damage in a loud data hall", "Use hearing protection as per site rules"],
          ["Working at height", "Fall from ladder or step", "Use approved steps, keep three points of contact"],
          ["Fire / suppression", "Gas discharge or smoke event", "Know evacuation routes and pre-discharge alarms; see site fire procedure"],
        ]}
        caption="This is a general list and does not replace your site's safety rules, electrical regulations and permit-to-work system."
      />
      <Callout type="danger" title="Never Work Alone on Live Electrical Equipment">
        Servers with redundant PSUs have more than one power source. Removing one cord does not make the server safe to open. Always isolate and verify all sources, and follow the site's lockout/tagout and permit-to-work rules. If unsure, stop and ask.
      </Callout>
      <h3 style={S.h3}>Safe Hot-Swap Habits</h3>
      <ul style={S.ul}>
        <li>Confirm the part number and slot <em>before</em> pulling a failed part — never pull on assumption.</li>
        <li>For a PSU: confirm the <em>other</em> PSU is healthy and its feed is live first. Otherwise you may switch the server off.</li>
        <li>For a drive: confirm the RAID state and that the array is not already degraded before removing another drive.</li>
        <li>Keep the removed part in an antistatic bag and tag it for return to the vendor.</li>
      </ul>

      {/* ══════════ 21. LIFECYCLE ══════════ */}
      <h2 id="server-lifecycle" style={S.h2}>Server Lifecycle</h2>
      <p style={S.p}>A server lives in the data center for roughly three to seven years, depending on the workload, warranty and technology refresh policy. Each stage has its own risks.</p>
      <ComparisonTable
        title="Lifecycle Stages"
        headers={["Stage", "Main Activities", "Typical Risk"]}
        rows={[
          ["Planning", "Workload sizing, form factor, power budget, redundancy, vendor and compatibility check", "Undersizing/oversizing; ignoring power and cooling"],
          ["Procurement", "Quotation, configuration, support contract, delivery schedule", "Wrong part numbers, missing rails/cords"],
          ["Deployment", "Receiving, racking, cabling, firmware, OS, testing, handover", "Cabling errors, skipped testing"],
          ["Operation", "Monitoring, patching, incident response, capacity tracking", "Ignored alerts, unplanned changes"],
          ["Maintenance", "Part replacement, firmware, preventive checks", "Bad update, rushed swaps"],
          ["Refresh / migration", "Move workload to new hardware", "Data loss, downtime during cutover"],
          ["Decommissioning", "Sanitise data, remove from systems, physically remove, dispose", "Data leakage, orphaned records"],
        ]}
        caption="Refresh cycles vary by organisation, warranty and performance-per-watt gains."
      />
      <h3 style={S.h3}>Decommissioning Checklist</h3>
      <ol style={S.ul}>
        <li>Confirm with the owner that the workload is migrated or retired — get written approval.</li>
        <li>Take a final backup if required by policy, and verify it.</li>
        <li>Shut the server down in a controlled way; disconnect power and network.</li>
        <li>Securely erase drives (follow NIST SP 800-88 guidelines) or destroy them with a certificate.</li>
        <li>Remove the server from monitoring, DCIM, DNS, IPAM, backup and CMDB.</li>
        <li>Physically remove it, <strong>refit a blanking panel</strong>, and update the rack documentation.</li>
        <li>Dispose via return-to-vendor, resale or certified recycling, following local e-waste rules.</li>
      </ol>
      <Callout type="common-mistake" title="Forgetting the Records">
        A server removed from the rack but still in the asset database and monitoring becomes a "ghost" — it creates false alarms, wastes licences and confuses capacity planning. Closing the paperwork is part of the job.
      </Callout>

      {/* ══════════ 22. OEM ══════════ */}
      <h2 id="oem-reference" style={S.h2}>OEMs and Vendors — Reference</h2>
      <p style={S.p}>Knowing who makes what helps you read documentation, order parts and talk to vendor support. Always verify current models on the vendor website — lineups change every generation.</p>
      <ComparisonTable
        title="Major Server Vendors (Representative)"
        headers={["Vendor", "Rack Server Families", "BMC / Management", "Notes"]}
        rows={[
          ["Dell Technologies", "PowerEdge (R-series rack, XE for AI)", "iDRAC, OpenManage", "Very common in enterprise data centers"],
          ["Hewlett Packard Enterprise", "ProLiant DL (rack), Synergy/BladeSystem (blade)", "iLO, OneView", "Strong in enterprise and blade"],
          ["Lenovo", "ThinkSystem SR series", "XCC, XClarity", "Enterprise and HPC"],
          ["Supermicro", "SuperServer / GPU / storage-dense systems", "IPMI/Redfish BMC", "Popular for GPU and custom builds"],
          ["Cisco", "UCS C-series rack, X-series modular", "CIMC, Intersight", "Strong tie with networking"],
          ["Inspur / Huawei / others", "Regional enterprise & cloud servers", "Vendor BMC", "Strong in some regions"],
          ["ODM / OCP (Quanta, Wiwynn, Foxconn)", "Open-rack and hyperscale sleds", "OpenBMC", "Built for cloud-scale deployments"],
        ]}
        caption="Representative only; not an endorsement. Availability and models differ by region and year."
      />
      <p style={S.p}><strong>CPU vendors:</strong> Intel (Xeon), AMD (EPYC), and ARM-based CPUs (for example AWS Graviton, Ampere) are used in servers. NVIDIA, AMD and others supply GPUs and accelerators — see <TopicLink slug="gpu" variant="inline" />.</p>
      <p style={S.p}><strong>Parts and support:</strong> Always use OEM-qualified drives, DIMMs and optics when possible. Third-party parts may work, but can break support or cause compatibility alerts. Check the vendor's compatibility list.</p>

      {/* ══════════ 23. MISCONCEPTIONS ══════════ */}
      <h2 id="misconceptions" style={S.h2}>Common Misconceptions</h2>
      <ComparisonTable
        title="Myth vs Reality"
        headers={["Common Belief", "Reality"]}
        rows={[
          ["A bigger U number means a faster server", "U is only height. A 1U server can outperform an old 4U server."],
          ["Two PSUs means the server can never go down", "Only if both feeds are independent and one feed can carry the whole load. Both PSUs on one PDU is not redundancy."],
          ["RAID is a backup", "RAID protects from drive failure only. Deletion, ransomware and site loss need real backups."],
          ["A 42U rack can hold 42 servers", "Power, cooling, weight and cabling set the limit — usually power first."],
          ["The BMC works with the power cord removed", "The BMC needs standby power. No AC = no BMC."],
          ["Firmware updates are always safe", "They fix issues but can also introduce new ones. Test and stage them."],
          ["Servers are fine at any temperature if the fans are loud", "High inlet temperature shortens life and triggers throttling."],
          ["A server in a Tier IV site is automatically Tier IV", "The tier describes the site. Single-corded or badly cabled servers can still be a single point of failure."],
        ]}
        caption="Clearing these myths early saves real downtime later."
      />

      {/* ══════════ 24. FUTURE TRENDS ══════════ */}
      <h2 id="future-trends" style={S.h2}>Future Trends</h2>
      <ul style={S.ul}>
        <li><strong>Rack density keeps rising:</strong> AI racks of 40–100+ kW are pushing sites toward liquid cooling — rear-door heat exchangers and direct-to-chip cold plates.</li>
        <li><strong>GPU/accelerator servers:</strong> 8-GPU nodes and rack-scale systems change power, weight and cooling design. See <TopicLink slug="gpu-cluster" variant="inline" /> and <TopicLink slug="ai-data-center-basics" variant="inline" />.</li>
        <li><strong>DPUs / SmartNICs:</strong> Offload networking, storage and security from the CPU to dedicated processors on the NIC.</li>
        <li><strong>CXL (Compute Express Link):</strong> Lets servers share and expand memory over a high-speed link, supporting disaggregated and composable designs.</li>
        <li><strong>ARM and custom silicon:</strong> More power-efficient CPUs for cloud workloads.</li>
        <li><strong>Higher-voltage and busbar power:</strong> 48 V and OCP-style rack busbars cut conversion losses.</li>
        <li><strong>Redfish and automation:</strong> Zero-touch provisioning, infrastructure as code, and API-driven management replace manual configuration.</li>
        <li><strong>Security in hardware:</strong> Secure Boot, TPM attestation and confidential computing (hardware-isolated VMs) are becoming standard expectations.</li>
        <li><strong>Sustainability:</strong> Power capping, better PUE and efficient hardware refresh drive total cost and carbon down.</li>
        <li><strong>Edge servers:</strong> Smaller, ruggedised servers placed close to users, often managed remotely.</li>
      </ul>

      {/* ══════════ 25. LEARNING PATH ══════════ */}
      <h2 id="learning-path" style={S.h2}>Your Next Learning Steps</h2>
      <p style={S.p}>Server Basics is the first step of the servers track. Continue in this order — each topic builds on the last.</p>
      <ol style={S.ul}>
        <li><TopicLink slug="cpu" variant="inline" /> — how server processors, cores, cache and NUMA work.</li>
        <li><TopicLink slug="ram" variant="inline" /> — ECC memory, channels, DIMM population and memory errors.</li>
        <li><TopicLink slug="gpu" variant="inline" /> — accelerators for AI and HPC and their power/cooling impact.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — shared-chassis high-density compute.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — many virtual machines on one physical server.</li>
        <li><TopicLink slug="das" variant="inline" />, <TopicLink slug="nas" variant="inline" /> and <TopicLink slug="san" variant="inline" /> — where server data lives.</li>
        <li><TopicLink slug="switch" variant="inline" /> — how servers connect to the network.</li>
        <li><TopicLink slug="pdu" variant="inline" /> and <TopicLink slug="ups" variant="inline" /> — the power side that keeps servers alive.</li>
      </ol>

      {/* ══════════ 26. INTERVIEW QUESTIONS ══════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: What are the key differences between a server and a PC?</h3>
      <p style={S.p}><strong>Answer:</strong> ECC memory, redundant hot-swap PSUs, hot-swap drives and fans, BMC out-of-band management, rack-mount form factor and design for continuous operation. A PC is built for one user and tolerates downtime. Exact features depend on the server model.</p>
      <h3 style={S.h3}>Q2: What is a BMC and when is it reachable?</h3>
      <p style={S.p}><strong>Answer:</strong> A Baseboard Management Controller is an independent microcontroller with its own network port. It runs on standby power, so it is reachable when the server is off or the OS has crashed — as long as AC is connected. It provides power control, a virtual console, health data and event logs.</p>
      <h3 style={S.h3}>Q3: How many servers fit in a 42U rack?</h3>
      <p style={S.p}><strong>Answer:</strong> It depends. Power per rack, cooling capacity, weight, network ports, cabling and the need to keep redundancy within one feed all limit the number. Usually power is the first limit. 42U is only the space.</p>
      <h3 style={S.h3}>Q4: Explain A/B redundant power with an example.</h3>
      <p style={S.p}><strong>Answer:</strong> PSU 1 goes to PDU A and PSU 2 to PDU B, which are fed from independent upstream paths. If one path fails or is under maintenance, the other keeps the server up. For this to work, the total load must be within the capacity of a single feed — for example, with two 32 A / 230 V feeds, keep the rack under roughly 5.9 kVA.</p>
      <h3 style={S.h3}>Q5: A server shows an amber LED. What do you do?</h3>
      <p style={S.p}><strong>Answer:</strong> Identify which server and what the LED means. Check the BMC event log and sensors. Match the event with a physical check — PSU, fan, drive, DIMM. Check recent changes. Fix with the correct hot-swap part if applicable, confirm the alert clears, and record it in the ticket.</p>
      <h3 style={S.h3}>Q6: Why are blanking panels important?</h3>
      <p style={S.p}><strong>Answer:</strong> They stop hot exhaust air from recirculating through empty rack units to the cold side. Without them, server inlet temperature rises, fans work harder, efficiency drops and servers may throttle or shut down.</p>
      <h3 style={S.h3}>Q7: What is the difference between a server's "nameplate power" and its real draw?</h3>
      <p style={S.p}><strong>Answer:</strong> Nameplate is the maximum rating of the PSU or system. Real draw depends on the actual load and is usually much lower. Plan with measured values from the BMC/PDU and keep a margin, and use the vendor's power calculator for the exact configuration.</p>
      <h3 style={S.h3}>Q8: How do you safely update server firmware in production?</h3>
      <p style={S.p}><strong>Answer:</strong> Read release notes and the compatibility matrix, test on a non-production server, back up the configuration, plan a rollback, update in small batches in an approved window, never interrupt the flash, and verify health after each batch.</p>

      {/* ══════════ 27. KEY TAKEAWAYS ══════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>A server is built for continuous operation — ECC RAM, redundant PSUs, hot-swap parts and a BMC.</li>
        <li>1U = 1.75 inches (44.45 mm). U measures height, not performance.</li>
        <li>A 42U rack cannot automatically hold 42 servers — power is usually the first limit, then cooling, weight and cabling.</li>
        <li>For real A/B redundancy, one feed must be able to carry the whole rack. Never load both feeds to high levels.</li>
        <li>Always cable PSU 1 to feed A and PSU 2 to feed B, and label both ends of every cable.</li>
        <li>Blanking panels and consistent front-to-back orientation are mandatory for good airflow.</li>
        <li>The BMC works on standby power and is your window into a dead or remote server — keep it isolated and secured.</li>
        <li>Tier ratings describe the site; dual-corded servers on independent paths make the design work.</li>
        <li>Commission with testing, operate with monitoring, maintain with staged firmware updates and document everything.</li>
        <li>Safety first: disconnect all power sources, use ESD protection, lift correctly and follow permit-to-work rules.</li>
        <li>Actual implementation depends on project requirements, utility requirements, OEM design and data center architecture — always verify with vendor documentation.</li>
      </ul>

      {/* FAQ — excluded from TOC */}
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
        <li><TopicLink slug="pdu" variant="inline" /> — Rack power distribution for servers.</li>
      </ul>
    </>
  );
}
