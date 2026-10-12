"use client";
import { S, Callout, ComparisonTable, Figure, CodeBlock, DiagramGuide } from "../shared";
import TopicLink from "@/components/TopicLink";
import BladeChassisArch from "../svg/BladeChassisArch";
import BladeAnatomy from "../svg/BladeAnatomy";
import BladeFabricPath from "../svg/BladeFabricPath";
import OversubscriptionMath from "../svg/OversubscriptionMath";
import ChassisRedundancy from "../svg/ChassisRedundancy";
import CrossChassisPlacement from "../svg/CrossChassisPlacement";
import BladeTroubleshootFlow from "../svg/BladeTroubleshootFlow";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      {/* Quick Summary */}
      <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#c2410c", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — Blade Servers in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>What a blade is:</strong> A thin compute card (CPU, RAM, a little local storage) that slides into a shared chassis. Power, cooling, networking and management come from the chassis.</li>
          <li><strong>Why it exists:</strong> Higher compute per rack unit, far fewer cables, one management point for many servers.</li>
          <li><strong>Network path:</strong> Blade mezzanine port → midplane → I/O module in the chassis → uplinks → top-of-rack switch. Two I/O bays give two fabrics.</li>
          <li><strong>Oversubscription:</strong> Internal blade bandwidth ÷ uplink bandwidth. 8 × 10 Gbps over 2 × 10 Gbps uplinks = 4:1.</li>
          <li><strong>Shared failure domain:</strong> Redundant PSUs, fans and management modules protect against single parts failing, but not against losing the whole chassis.</li>
          <li><strong>Power and cooling:</strong> A full chassis can be several kW to well over 10 kW. Plan feeds, PDU phases, aisle containment and blanking panels before purchase.</li>
          <li><strong>High availability:</strong> Spread VMs and cluster nodes across at least two chassis, with spare capacity for one chassis outage.</li>
          <li><strong>Operations:</strong> Use the chassis manager for health, firmware baselines and profiles. Update in waves, one chassis at a time.</li>
          <li><strong>Not always the answer:</strong> Modern high-density rack servers, HCI and GPU servers compete with blades. Choose by workload, not by habit.</li>
          <li><strong>Golden rule:</strong> Treat the chassis as a small shared data center — it has its own power, cooling, network and failure modes.</li>
        </ul>
      </div>

      {/* ══════════ 1. WHAT IS BLADE ══════════ */}
      <h2 id="what-is-blade" style={S.h2}>What Is a Blade Server?</h2>
      <p style={S.p}>A traditional rack server is a complete, self-contained unit. It has its own power supplies, its own fans and its own network ports. A blade server takes a different approach.</p>
      <p style={S.p}>There is a <strong>chassis</strong> (enclosure) that mounts in the rack. Multiple <strong>blades</strong> (compute cards) slide into the chassis from the front. A blade holds CPU, RAM and a little local storage — only the compute part.</p>
      <p style={S.p}>Everything else — power supplies, fans, network switching and management — is shared at the chassis level. A blade does not need its own PSU, its own fans or its own network switch.</p>
      <p style={S.p}>Think of a blade chassis as a small apartment building and each blade as a flat. The flats share the lift, water tank and electrical room, but each flat has its own family living inside. Save on shared services, but if the water tank fails, every flat is affected.</p>
      <p style={S.p}>For the general server background see <TopicLink slug="server-basics" variant="inline" />, and for the parts inside each blade see <TopicLink slug="cpu" variant="inline" /> and <TopicLink slug="ram" variant="inline" />.</p>

      {/* ══════════ 2. WHY BLADE ══════════ */}
      <h2 id="why-blade" style={S.h2}>Why Blade Servers Exist — Density and Cabling</h2>
      <p style={S.p}>Imagine 16 separate 1U rack servers. Each needs two power cords, two to six network cables, a management cable, rails and a spot in the rack. That is 60 or more cables to install, label, trace and replace.</p>
      <p style={S.p}>Put the same 16 servers as blades in one chassis, and you may have only a few power cords and a handful of uplink cables. Cable count falls sharply, and so does the time to rack and wire.</p>
      <ComparisonTable
        title="Why Operators Chose Blades (and what it costs)"
        headers={["Benefit", "Why it happens", "Trade-off"]}
        rows={[
          ["Higher density", "Shared PSUs, fans and switches take less space per server", "More heat and weight per rack"],
          ["Less cabling", "Network and power are aggregated inside the chassis", "Fewer, but more critical, cables and modules"],
          ["Faster deployment", "Slide in a blade, apply a profile, boot", "Chassis must be installed and wired first"],
          ["Central management", "One manager sees every blade", "Management module becomes important to protect"],
          ["Shared power efficiency", "Fewer, larger, efficient PSUs and fans", "Chassis power ceiling limits what you can add"],
          ["Lower operations effort at scale", "Standard blades, templates, central firmware", "Vendor lock-in and chassis dependency"],
        ]}
        caption="General pattern. Actual savings depend on the vendor, chassis generation and how full the chassis is."
      />
      <p style={S.p}>Blades were most popular when a data center had hundreds of similar servers and cabling was a big pain. Today high-density rack servers, hyper-converged systems and GPU servers compete for the same jobs — see the section on when blade is the right choice later in this article.</p>

      {/* ══════════ 3. ARCHITECTURE ══════════ */}
      <h2 id="blade-architecture" style={S.h2}>Blade Architecture — Component by Component</h2>
      <Figure caption="Fig 1 — Blade chassis architecture: compute blades sharing PSUs, fans, I/O modules and the management module through the chassis backplane."><BladeChassisArch /></Figure>
      <DiagramGuide
        title="How to read Fig 1"
        steps={[
          "The big outer box is the chassis. The row of boxes in the upper part are the blade slots. Filled slots show a blade; dashed slots are empty and must get a blanking panel.",
          "Each blade shows only CPU + RAM and local storage, and the notes 'No PSU' and 'No network card' remind you that those functions live in the chassis.",
          "The lower band shows the shared services: power supplies, fan modules, I/O modules and the management module. All blades draw from the same pool.",
          "The backplane/midplane between blades and shared modules is the 'road' that carries power, data and management signals.",
          "Takeaway: one chassis = one shared power, cooling, network and management system for many servers.",
        ]}
      />
      <p style={S.p}><strong>Chassis (enclosure):</strong> Mounts in the rack and usually takes several U of height (for example 6U to 10U depending on the vendor and model — verify the specification). It has multiple blade bays.</p>
      <p style={S.p}><strong>Shared power supplies:</strong> Several hot-swap PSUs sit at the chassis rear. All blades draw from a shared power bus. The redundancy mode (N+1, grid redundancy, 2N-style) depends on the chassis design and configuration.</p>
      <p style={S.p}><strong>Shared cooling:</strong> Hot-swap fan modules pull air from front to back through the blades. There are no per-blade fans. Central cooling is more coordinated, but it also means a fan failure affects the whole chassis.</p>
      <p style={S.p}><strong>I/O modules:</strong> At the rear of the chassis. They give blades their Ethernet, Fibre Channel or converged connectivity. There are no per-blade external network cables — uplinks leave from the I/O module.</p>
      <p style={S.p}><strong>Management module:</strong> Central out-of-band management for the chassis and every blade — power control, health, virtual console, firmware tools.</p>
      <p style={S.p}><strong>Midplane/backplane:</strong> A passive board inside the chassis with connectors on both sides: blades plug in from the front, rear modules from the back. It carries power, data lanes and management signals.</p>

      {/* ══════════ 4. ANATOMY ══════════ */}
      <h2 id="blade-anatomy" style={S.h2}>Inside One Blade — CPU, RAM, Mezzanine and Midplane</h2>
      <Figure caption="Fig 2 — Inside a half-height blade (top view): local drives at the front, two CPUs with their DIMMs, mezzanine slots for network/storage adapters, BMC, and the midplane connector at the rear. Layout is illustrative."><BladeAnatomy /></Figure>
      <DiagramGuide
        title="How to read Fig 2"
        steps={[
          "Front is on the left (faces the cold aisle). Rear is on the right, where the blade plugs into the chassis midplane.",
          "At the front: small hot-swap local drives (SSD/NVMe) used for boot or scratch space. Many blades boot from SAN or network instead.",
          "In the middle: two CPUs, each with its own DIMM slots (green strips). This is a normal dual-socket server board, just made small — see NUMA in the CPU article.",
          "Purple box: mezzanine slots. These are PCIe slots where network or Fibre Channel adapters are fitted. Their ports connect through the midplane to I/O modules, not to an external cable.",
          "Red box: the BMC — the small management computer on the blade. It talks to the chassis manager over the midplane.",
          "Right-hand tall bar: the midplane connector. The panel beside it lists what passes through — power, data lanes, management signals — and a reminder that the connector pins are delicate.",
          "Bottom note: half-height blades give more blades per chassis, while full-height or double-wide blades give more CPU, RAM, mezzanine slots or even GPUs.",
        ]}
      />
      <p style={S.p}><strong>Mezzanine/LOM:</strong> A blade has "LAN on motherboard" ports and one or more mezzanine slots. Whatever adapter you fit decides what type of I/O module it can pair with — an Ethernet adapter needs an Ethernet-capable bay, an FC adapter needs an FC-capable bay.</p>
      <p style={S.p}><strong>Blade bay → I/O bay mapping:</strong> The midplane wiring is fixed. Adapter port A always lands in one I/O bay and port B in another. If you install a module in the wrong bay or mix up adapters, links simply stay down. Always check the OEM mapping chart.</p>
      <p style={S.p}><strong>Local storage:</strong> Small and often only for the OS or caches. Large capacity usually comes from SAN, NAS or storage blades — see the storage section below and <TopicLink slug="san" variant="inline" />.</p>

      {/* ══════════ 5. BLADE VS RACK ══════════ */}
      <h2 id="blade-vs-rack" style={S.h2}>Blade vs Rack vs Modular/Composable</h2>
      <ComparisonTable
        title="Server Infrastructure Models — Comparison"
        headers={["Aspect", "Rack Server", "Blade Server", "Modular/Composable"]}
        rows={[
          ["Self-contained", "Yes — each server independent", "No — shares chassis resources", "Disaggregated pools"],
          ["Cabling", "Per-server cables (power + network)", "Chassis-level uplinks only", "Fabric-based"],
          ["Density", "Standard — 1U/2U/4U", "Higher density per chassis", "Varies, purpose-built"],
          ["Failure domain", "Individual server", "Shared chassis", "Typically disaggregated"],
          ["Management", "Per-server + DCIM", "Centralised via chassis module", "Software-defined (management plane)"],
          ["Vendor flexibility", "Wide — standard rack", "Blade vendor-specific", "Typically proprietary"],
          ["Entry cost", "Lower initial", "Higher (chassis investment)", "Higher — specialised"],
          ["Flexibility", "High — mix/match", "Limited — blade form factor", "Highest — resource pools"],
          ["GPU / special cards", "Easy (PCIe slots)", "Limited by blade size", "Depends on design"],
        ]}
        caption="Selection depends on scale, density requirements, operational model, budget and existing infrastructure."
      />
      <p style={S.p}><strong>Modular / composable infrastructure:</strong> The next step — CPU, memory, storage and networking are treated as pools, and software composes the servers you need. HPE Synergy is one commercial example of the concept, but there is no universal standard. More flexibility, higher complexity and cost.</p>

      {/* ══════════ 6. CHASSIS FABRIC ══════════ */}
      <h2 id="chassis-fabric" style={S.h2}>Chassis Fabric and the Network Path</h2>
      <Figure caption="Fig 3 — Blade network path: each blade has two ports (A and B) that reach two different I/O modules through the midplane; each I/O module has uplinks to a separate top-of-rack switch. Mapping and port counts differ per OEM."><BladeFabricPath /></Figure>
      <DiagramGuide
        title="How to read Fig 3"
        steps={[
          "Left: three blades. Each shows Port A (purple) and Port B (cyan). These are the adapter ports on the blade's mezzanine/LOM.",
          "Centre-left tall bar: the midplane. Purple lines carry Port A traffic to I/O Module A; cyan lines carry Port B traffic to I/O Module B. Wiring is fixed — you cannot patch it.",
          "Centre: the two I/O modules in different bays. Each has 'down-ports' to blades and 'up-ports' to the outside network. Inside, it may be a small switch or just a pass-through.",
          "Right: two separate ToR (top-of-rack) switches. Each I/O module has two uplinks (thick lines) to its own ToR switch. This gives two independent network paths, A and B.",
          "Bottom box: if one I/O module fails, half the paths go down, but the blades keep running. Teaming/bonding in the OS or hypervisor is what actually uses both paths.",
        ]}
      />
      <p style={S.p}>Inside the chassis, the fabric design depends on the vendor. Some chassis have a non-blocking crossbar between blades and I/O modules. Others use a simpler shared backplane where oversubscription can be higher. Always read the vendor architecture guide.</p>
      <p style={S.p}><strong>North-south vs east-west:</strong> Traffic from a blade to the outside network (north-south) goes through the I/O module uplinks. Traffic between blades in the same chassis (east-west) may be switched inside the I/O module without leaving the chassis, which is faster and does not use uplinks.</p>
      <p style={S.p}>For the outside network, see <TopicLink slug="switch" variant="inline" /> and how the connected infrastructure is built in <TopicLink slug="how-the-internet-works" variant="inline" />.</p>

      {/* ══════════ 7. IO MODULES ══════════ */}
      <h2 id="io-modules" style={S.h2}>I/O Modules — Switch, Pass-Through, FC</h2>
      <ComparisonTable
        title="Types of Blade I/O Modules"
        headers={["Type", "How it works", "Good for", "Watch out for"]}
        rows={[
          ["Ethernet switch module", "Built-in switch; blades connect to its down-ports, few uplinks leave", "Fewer cables, easy scaling", "It is another switch to configure, patch and upgrade; oversubscription"],
          ["Pass-through module", "Each blade port is brought out to its own external port", "Keep using your existing ToR switches; simple, visible", "Many cables again; needs many ToR ports"],
          ["Fibre Channel module / FC pass-through", "Connects blade HBAs to the SAN fabric", "Boot-from-SAN, block storage", "Zoning, NPIV and firmware compatibility"],
          ["Converged / fabric interconnect", "Carries LAN and SAN over one fabric (FCoE/RoCE etc.)", "Fewer adapters and cables", "More complex design and QoS"],
          ["Interconnect/stacking links", "Joins modules from several chassis into one logical fabric", "Single management for many chassis", "Wrong stacking can couple failures"],
        ]}
        caption="Names and capabilities vary by OEM; verify the compatibility matrix for your chassis generation."
      />
      <p style={S.p}><strong>How to choose:</strong> If your network team wants to keep full control on the top-of-rack switches, choose pass-through. If you want fewer cables and are happy to manage embedded switches, choose switch modules. For heavy SAN usage, plan FC or converged modules.</p>
      <p style={S.p}><strong>Always in pairs:</strong> Install I/O modules in redundant pairs and map them to separate ToR switches. A single I/O module is a single path for every blade in the chassis.</p>

      {/* ══════════ 8. OVERSUBSCRIPTION ══════════ */}
      <h2 id="oversubscription" style={S.h2}>Oversubscription in Blade Networks</h2>
      <Figure caption="Fig 4 — Oversubscription example: 8 blades × 10 Gbps = 80 Gbps possible demand, compared with 40, 20 and 10 Gbps of uplink capacity, giving 2:1, 4:1 and 8:1 ratios. Numbers are illustrative."><OversubscriptionMath /></Figure>
      <DiagramGuide
        title="How to read Fig 4"
        steps={[
          "Top blue banner: the maximum demand — 8 blades × 10 Gbps = 80 Gbps. This is the grey bar length in each row.",
          "Each coloured row shows the uplink capacity actually available: 40 Gbps (green), 20 Gbps (amber), 10 Gbps (red).",
          "The box on the right gives the ratio: 80 ÷ 40 = 2:1, 80 ÷ 20 = 4:1, 80 ÷ 10 = 8:1.",
          "Row labels suggest typical suitability — light mixed VMs can live with a high ratio; storage and backup-heavy chassis need a lower one.",
          "Bottom note: peaks rarely hit 100% on every blade, but live migration, backups and storage traffic can — size uplinks for the busiest realistic window.",
        ]}
      />
      <CodeBlock lang="text" label="Oversubscription formula">
{`ratio = (blades × bandwidth per blade) ÷ (uplinks × uplink speed)

8 × 10 Gbps = 80 Gbps internal
2 × 10 Gbps = 20 Gbps uplink      → 80 ÷ 20 = 4 : 1

Per fabric (A or B) the same maths applies separately.
When one I/O module fails, ALL traffic must squeeze through the other:
the effective ratio can double.`}
      </CodeBlock>
      <Callout type="important" title="Plan for the failure case">
        If both fabrics normally share load, a failed I/O module forces everything onto one fabric. Check that your uplinks, ToR ports and oversubscription still work in that degraded state.
      </Callout>
      <p style={S.p}><strong>When high is acceptable:</strong> Web servers, general VMs, test/dev — blades rarely burst together. <strong>When it hurts:</strong> storage over Ethernet (iSCSI/NFS), vMotion bursts, backup windows, big data. Measure real traffic, then size the uplinks.</p>

      {/* ══════════ 9. STORAGE ══════════ */}
      <h2 id="storage-connectivity" style={S.h2}>Storage Connectivity and Boot Options</h2>
      <p style={S.p}>Blades are thin, so there is little room for disks. Storage is usually provided in one of four ways.</p>
      <ComparisonTable
        title="Storage Options for Blades"
        headers={["Option", "How it works", "Typical use"]}
        rows={[
          ["Local mirrored drives", "2 small SSDs on the blade in RAID 1", "OS boot, hypervisor, scratch"],
          ["Boot from SAN (FC/FCoE/iSCSI)", "Blade boots from a LUN on the SAN via HBA/CNA", "Stateless blades; fast replacement"],
          ["SAN/NAS data volumes", "Applications use shared storage over FC, iSCSI or NFS", "VM datastores, databases — see SAN and NAS"],
          ["Storage blade / shared direct-attached", "Disk drawer or storage blade connected to compute blades", "Small deployments, local pools"],
        ]}
        caption="Choice depends on workload, storage platform and the OEM chassis capabilities."
      />
      <p style={S.p}><strong>Stateless blades:</strong> If the OS boots from SAN and identity (MAC, WWN, UUID) is stored in a profile, a failed blade can be replaced by a spare and the profile moved over. This is how many large blade deployments recover quickly.</p>
      <p style={S.p}>For storage concepts see <TopicLink slug="san" variant="inline" />, <TopicLink slug="nas" variant="inline" /> and <TopicLink slug="das" variant="inline" />. For backup of what runs on blades see <TopicLink slug="backup" variant="inline" />.</p>

      {/* ══════════ 10. SHARED FAILURE ══════════ */}
      <h2 id="shared-failure" style={S.h2}>Shared Failure Domain</h2>
      <Callout type="warning" title="Blade Chassis = Shared Failure Domain, Not Universal Single Point of Failure">
        A blade chassis is a shared failure domain. Chassis-level failures (complete power loss, midplane fault, a bad firmware update) can affect all blades. However, redundant components (multiple PSUs, N+1 fans, dual management modules, dual I/O modules) are designed to survive individual component failures. The blanket statement "single point of failure" is technically inaccurate. The real risk is the whole chassis — that is why cross-chassis distribution matters for mission-critical services.
      </Callout>
      <p style={S.p}>What shares fate in a chassis: the midplane (passive but still a part), the power bus, the airflow path, and the management network. What does not: the CPU, RAM and OS on each blade.</p>
      <p style={S.p}><strong>Blast radius thinking:</strong> Ask "if this chassis disappears for 4 hours, which services go down?" If the answer is "everything important", the design is too concentrated. Spread critical services across chassis, racks and power feeds.</p>
      <p style={S.p}><strong>Change risk:</strong> Chassis firmware updates and I/O module changes touch many servers at once. A mistake affects all blades, so changes need a tested plan and a rollback — and should never be done on all chassis on the same night.</p>

      {/* ══════════ 11. REDUNDANCY ══════════ */}
      <h2 id="redundancy" style={S.h2}>Redundancy at Chassis Level</h2>
      <Figure caption="Fig 5 — Redundancy inside and around the chassis: A/B power feeds into PSU groups on a shared bus, N+1 fan modules, active/standby management modules and dual I/O modules. Counts and modes are illustrative."><ChassisRedundancy /></Figure>
      <DiagramGuide
        title="How to read Fig 5"
        steps={[
          "Left: two separate power feeds, A (red, from UPS A) and B (blue, from UPS B). They should come from independent PDUs and ideally independent upstream paths.",
          "Top row inside the chassis: six PSUs; three on feed A (red) and three on feed B (blue). All of them join one shared power bus (yellow bar).",
          "Below the bus: the blades (green) consume power, cooling, network and management from the chassis. Next to them are fan modules (cyan, N+1) and management modules (purple, active + standby).",
          "Bottom row: two I/O modules, Bay 1 (Fabric A) and Bay 2 (Fabric B), each with uplinks to a different ToR switch.",
          "The yellow note on the left is the key warning: redundancy only works if the total load fits on the surviving PSUs and the configured mode matches your feed design.",
          "Closing text: this protects against one component failing — not against losing the whole chassis.",
        ]}
      />
      <p style={S.p}><strong>Power:</strong> Connect PSUs to A and B feeds with the same logic you use for rack servers (<TopicLink slug="pdu" variant="inline" />, <TopicLink slug="ups" variant="inline" />). Choose the correct redundancy mode in the chassis configuration — N+1 protects against a PSU failure, grid redundancy (A/B) also protects against a feed failure.</p>
      <p style={S.p}><strong>Cooling:</strong> Fan modules are typically N+1. If one fails the others speed up, but your thermal margin shrinks — replace quickly. Hot-swap is typically supported.</p>
      <p style={S.p}><strong>Management modules:</strong> Enterprise chassis support two modules in active/standby. If the primary fails, the secondary takes over; blades keep running even while the manager is down, but you lose control and monitoring for a while.</p>
      <p style={S.p}><strong>I/O modules:</strong> Install in separate bays and connect to separate ToR switches (see Fig 3).</p>
      <Callout type="common-mistake" title="'We have 6 PSUs so we are safe'">
        Not if all 6 are plugged into one PDU, or if the chassis load needs 5 of them. Redundancy has to exist in the feeds as well as in the PSU count — and the load must fit on what remains.
      </Callout>

      {/* ══════════ 12. POWER PLANNING ══════════ */}
      <h2 id="power-planning" style={S.h2}>Power Planning and Budget</h2>
      <p style={S.p}>A full blade chassis packs the power of 8, 16 or more servers into a few U. The total can reach several kW and, for dense or GPU-equipped designs, well above 10 kW. The rack power plan must be done <em>before</em> the chassis is bought.</p>
      <CodeBlock lang="text" label="Example power budget (illustrative numbers)">
{`16 blades × 450 W peak                    = 7,200 W
Chassis fans + management + I/O modules   =   900 W
Total peak                                 = 8,100 W

Add ~10-15% headroom for PSU efficiency / growth → plan ≈ 9 kW

Redundancy check (N+1 with 6 PSUs of 2,400 W each):
  5 PSUs available after one failure = 12,000 W  ≥ 8,100 W  ✔
Feed check (A/B): with one feed lost only half the PSUs remain:
  3 PSUs = 7,200 W  <  8,100 W  ✘  → blades must be power-capped or
  fewer blades used if you want full A/B tolerance`}
      </CodeBlock>
      <p style={S.p}><strong>Power capping:</strong> Most chassis managers let you set a power cap per blade or for the chassis. If a failure reduces available power, blades are throttled instead of shutting down. Capping needs to be planned, tested and documented.</p>
      <p style={S.p}><strong>Per-phase balancing:</strong> Chassis power cords are spread across three phases of a three-phase PDU. Unbalanced phases overload one phase breaker first. Check the phase mapping in the OEM guide and in <TopicLink slug="dcim" variant="inline" />.</p>
      <p style={S.p}><strong>Inrush at power-on:</strong> Starting many PSUs together can trip breakers. Many chassis stagger blade start-up. Use the OEM sequence and the PDU rating.</p>
      <Callout type="danger" title="Never exceed the PDU or breaker rating">
        A fully loaded chassis connected to an under-rated feed can trip a breaker and drop every blade at once. Verify the rated, derated (usually 80% continuous) and per-phase values before installing.
      </Callout>

      {/* ══════════ 13. COOLING ══════════ */}
      <h2 id="cooling-airflow" style={S.h2}>Cooling and Airflow</h2>
      <p style={S.p}>Blade chassis pull cold air from the front, pass it through the blades and exhaust it at the rear. Their fans are strong and shared. Good airflow depends on the rack and room more than on the chassis itself.</p>
      <p style={S.p}><strong>Blanking panels in every empty bay:</strong> An empty blade slot is a hole. Cold air takes the path of least resistance through the hole and bypasses the other blades. Always fit blanking panels in empty slots and empty rack units.</p>
      <p style={S.p}><strong>Aisle containment:</strong> A hot chassis recirculates hot air to its own inlet if hot and cold aisles mix. See <TopicLink slug="containment" variant="inline" /> and <TopicLink slug="airflow-management" variant="inline" />.</p>
      <p style={S.p}><strong>Heat density:</strong> A rack of blade chassis can reach 15–30 kW or more. Check CRAC/PAC/CRAH capacity and rack-level cooling — <TopicLink slug="crac" variant="inline" />, <TopicLink slug="pac" variant="inline" />, <TopicLink slug="chiller" variant="inline" />.</p>
      <p style={S.p}><strong>Fan behaviour:</strong> When ambient temperature rises, or a fan fails, the remaining fans speed up and noise and power rise. If thermal limits are reached, blades are throttled and then shut down to protect the hardware.</p>
      <Callout type="best-practice" title="Place heavy chassis low in the rack">
        A fully populated chassis is heavy. Mount it low for stability and safe lifting, keep cable bundles clear of exhausts, and leave rear service access for PSUs and I/O modules.
      </Callout>

      {/* ══════════ 14. MANAGEMENT ══════════ */}
      <h2 id="management" style={S.h2}>Centralised Management</h2>
      <p style={S.p}>A big advantage of blades is central control. From one management interface you can power blades on/off, see hardware health, open virtual consoles and manage firmware across the whole chassis. Product names are vendor specific — check the OEM.</p>
      <ComparisonTable
        title="What the Chassis Manager Typically Does"
        headers={["Function", "What it gives you"]}
        rows={[
          ["Inventory", "Every blade, adapter, PSU, fan and I/O module in one list"],
          ["Health and alerts", "Sensor, power and fan status; SNMP/syslog/e-mail alerts"],
          ["Power control and capping", "Power on/off, staged start-up, caps, power history"],
          ["Remote console", "KVM/virtual media through the blade BMC"],
          ["Profiles / templates", "BIOS, boot order, NIC/HBA identity (MAC, WWN) applied to any blade"],
          ["Firmware baseline", "Compare and update blade, chassis and I/O module firmware from one place"],
          ["Role-based access and audit", "Who did what, with which privileges"],
        ]}
        caption="Names such as chassis manager, enclosure manager or fabric manager differ by vendor."
      />
      <p style={S.p}><strong>Template-based deployment:</strong> Apply the same profile to many blades, so settings and identity are consistent and a replacement blade can be configured in minutes.</p>
      <p style={S.p}><strong>Protect the management plane:</strong> Put the chassis manager and blade BMCs on a dedicated management network, restrict access, change default credentials, and keep management firmware current. If someone takes over the manager, they control every blade. See <TopicLink slug="dcim" variant="inline" /> and <TopicLink slug="bms" variant="inline" /> for facility monitoring.</p>
      <Callout type="warning" title="Management module can become a surprise dependency">
        Blades usually keep running if the manager fails, but you lose console, alerts and some fan-control features. Test failover of the standby manager, and keep an out-of-band path (for example the blade's own BMC network) available.
      </Callout>

      {/* ══════════ 15. VIRTUALISATION HA ══════════ */}
      <h2 id="virtualisation-ha" style={S.h2}>Virtualisation, HA and Cross-Chassis Placement</h2>
      <p style={S.p}>Most blades run hypervisors — see <TopicLink slug="virtualization" variant="inline" />. The cluster must understand that blades are not independent: many blades share a chassis.</p>
      <Figure caption="Fig 6 — Cross-chassis placement: each service has copies on both chassis, so one chassis failing or entering maintenance leaves at least one copy running. HA restarts the rest on the surviving chassis."><CrossChassisPlacement /></Figure>
      <DiagramGuide
        title="How to read Fig 6"
        steps={[
          "Two big boxes are Chassis 1 and Chassis 2, each with blades. Coloured tags are VMs or service instances: Web, App, DB and Cache.",
          "Look at the colours: every colour appears in both chassis (Web-1 and Web-2, DB-1 and DB-2, and so on). That is anti-affinity placement — copies of the same service are not allowed on one chassis.",
          "The text under the chassis boxes states the capacity rule: each chassis should be loaded so that the other can absorb its workload (roughly 50% each in a two-chassis design, or N+1 for more chassis).",
          "The orange box explains the outage sequence: HA detects lost hosts, restarts VMs on the surviving chassis, services with a second copy keep running, and cluster quorum must not depend on the failed chassis.",
          "Takeaway: the chassis is the failure domain, so the cluster rules must treat 'chassis' like 'rack' or 'site' — a boundary that copies must cross.",
        ]}
      />
      <p style={S.p}><strong>Chassis awareness:</strong> In VMware, Hyper-V, KVM, OpenStack and Kubernetes you can express this with anti-affinity rules, fault domains or topology labels. A cluster that places both DB nodes on blades in one chassis is not highly available, no matter how many blades there are.</p>
      <p style={S.p}><strong>Capacity N+1 at chassis level:</strong> Sizing for "one blade fails" is not enough. Ask "if a whole chassis is offline for maintenance, can the rest carry the load?" For two chassis this means keeping each at or below about half of the combined capacity.</p>
      <p style={S.p}><strong>Quorum and witnesses:</strong> Put witness/tiebreaker components outside the chassis or in a third location. If every cluster member sits in one chassis, a chassis outage loses quorum.</p>
      <p style={S.p}>For disaster recovery above the chassis level see <TopicLink slug="disaster-recovery" variant="inline" /> and <TopicLink slug="backup" variant="inline" />.</p>

      {/* ══════════ 16. DEPLOYMENT ══════════ */}
      <h2 id="deployment" style={S.h2}>Deployment Considerations</h2>
      <p style={S.p}><strong>Physical:</strong> A loaded chassis can weigh well over 100 kg. Use a lift, proper rails and a trained team. Check rack depth, rack load rating and floor loading. Rear access is needed for PSUs and I/O modules.</p>
      <p style={S.p}><strong>Power:</strong> Calculate the total peak draw of a fully loaded chassis, check A/B feed redundancy, per-phase load and PDU rating — see the power planning section.</p>
      <p style={S.p}><strong>Cooling:</strong> Check heat load per rack, aisle containment, blanking panels and cooling plant capacity.</p>
      <p style={S.p}><strong>Network:</strong> Plan I/O module types, uplink count and speed, oversubscription for normal <em>and</em> failure state, VLANs, and a separate management VLAN for the chassis manager and BMCs.</p>
      <p style={S.p}><strong>Growth:</strong> Decide how full to buy the chassis. Half-empty chassis waste fixed cost; too full leaves no room for power or network growth. Many sites buy chassis in "blocks" of 2 for cross-chassis HA.</p>
      <p style={S.p}><strong>Lifecycle:</strong> Check how long the vendor will support the chassis generation, midplane compatibility with future blades and I/O modules, and spare-part availability.</p>

      {/* ══════════ 17. INSTALLATION ══════════ */}
      <h2 id="installation-replacement" style={S.h2}>Installation and Replacement</h2>
      <CodeBlock lang="text" label="Installing a new blade chassis — typical order (follow the OEM guide)">
{`1. Survey: rack depth, floor load, feeds A/B, PDU outlets, cooling, network ports.
2. Mount rails; lift chassis with a server lift (empty chassis first - remove
   PSUs/blades to cut weight if the OEM allows).
3. Install midplane-side modules: PSUs, fan modules, I/O modules, management modules.
4. Connect power cords: A-side PSUs to feed A, B-side PSUs to feed B (check phases).
5. Connect management network cables, then uplinks from I/O modules.
6. Power on the chassis; wait for manager to boot; set IPs, time, credentials.
7. Update chassis manager / I/O module firmware to the approved baseline.
8. Fit blades one by one; check each is recognised; apply profiles.
9. Fit blanking panels in every empty bay.
10. Document: slot map, cable map, power map, firmware versions, IPs.`}
      </CodeBlock>
      <CodeBlock lang="text" label="Replacing a blade — typical sequence">
{`1. Drain / evacuate VMs or workloads; confirm HA state is healthy.
2. Graceful shutdown; confirm blade is powered off in chassis manager.
3. Release latch; slide the blade out straight; ESD protection on.
4. Move or note the profile / identity (MAC, WWN, UUID) if tied to the slot.
5. Insert replacement fully - listen/feel for latch click; never force.
6. Apply profile; update firmware to baseline; verify BIOS settings.
7. Verify network and storage paths; rejoin cluster; return to production.`}
      </CodeBlock>
      <Callout type="danger" title="Never force a blade into a slot">
        Midplane connector pins are fragile. A bent pin can take down a whole slot — or worse, damage a connector shared with the other half of the chassis. If resistance is felt, withdraw and inspect.
      </Callout>
      <Callout type="maintenance" title="Heavy and awkward">
        A chassis is heavy even when partly populated. Use a lift, two or more people and rated rails. Remove PSUs and blades from a heavy chassis before lifting if the OEM permits.
      </Callout>
      <p style={S.p}><strong>PSU / fan / I/O module replacement:</strong> These are hot-swap in most designs, but only replace one at a time, check the redundancy state after each change, and do not remove the second of a pair while the first is still rebuilding or recovering.</p>
      <p style={S.p}><strong>Cabling:</strong> Label both ends of every uplink with chassis, bay and port. Keep cables clear of fan exhaust and rear-access areas. Clean fibre ends before plugging.</p>

      {/* ══════════ 18. TESTING ══════════ */}
      <h2 id="testing-commissioning" style={S.h2}>Testing and Commissioning</h2>
      <ComparisonTable
        title="Chassis Commissioning Test Plan"
        headers={["Stage", "What to check", "Tool / method"]}
        rows={[
          ["Inventory", "Every blade, adapter, PSU, fan and module recognised; firmware versions", "Chassis manager inventory"],
          ["Power redundancy", "Pull one feed (A) under controlled test; all blades must stay up; repeat for B", "Planned test with approval; watch manager and PDU"],
          ["PSU failure", "Remove one PSU; check alert and redundancy status; reinsert", "Chassis manager"],
          ["Fan failure", "Remove one fan module; check alerts, temperature, fan speeds", "Chassis manager"],
          ["Network paths", "Disconnect an uplink then an I/O module; traffic must failover without outage", "Ping/iperf, hypervisor teaming status"],
          ["Management failover", "Fail primary manager; standby takes over", "Chassis manager"],
          ["Boot and storage", "Boot-from-SAN or local boot, multipath working", "OS/hypervisor, SAN tools"],
          ["Burn-in", "Run load on all blades for hours; watch temperature and power", "Stress tools + manager logs"],
          ["Acceptance", "Record results, baseline, close commissioning ticket", "Commissioning report"],
        ]}
        caption="Pass criteria come from the OEM acceptance guide and the project specification. Perform power-feed tests only with approval and a rollback plan."
      />
      <p style={S.p}><strong>Baseline:</strong> Save a record of temperatures, fan speeds, power draw and link states when the chassis is healthy. Later, compare against it instead of guessing.</p>

      {/* ══════════ 19. MONITORING ══════════ */}
      <h2 id="monitoring" style={S.h2}>Monitoring Blade Chassis</h2>
      <ComparisonTable
        title="What to Monitor and Why"
        headers={["Item", "Metric", "Watch for"]}
        rows={[
          ["Power", "Chassis watts, per-PSU status, A/B feed state, cap events", "Loss of redundancy, load near the limit"],
          ["Cooling", "Inlet/outlet temperature, fan speeds, fan failures", "Rising inlet temperature, fan at 100%"],
          ["I/O modules", "Port status, error counters, uplink utilisation, firmware", "CRC errors, link flaps, saturation"],
          ["Blades", "BMC health, memory/CPU errors, thermal, power state", "Rising correctable errors, throttling"],
          ["Manager", "Active/standby state, config backups", "Standby not ready"],
          ["Firmware", "Versions across chassis and blades", "Drift from baseline"],
        ]}
        caption="Alarm thresholds should follow OEM guidance and your own baseline."
      />
      <p style={S.p}>Send chassis alerts (SNMP, Redfish events, syslog) to your central monitoring and <TopicLink slug="dcim" variant="inline" /> platform, not only to a mailbox nobody reads. Use rack-level power and temperature data from <TopicLink slug="bms" variant="inline" /> and <TopicLink slug="sensors" variant="inline" /> to cross-check.</p>
      <CodeBlock lang="bash" label="Redfish example - read chassis thermal data (generic pattern)">
{`# Most modern chassis managers expose Redfish. Exact paths differ per vendor.
curl -sk -u "$USER:$PASS" https://<chassis-manager>/redfish/v1/Chassis | jq .
curl -sk -u "$USER:$PASS" https://<chassis-manager>/redfish/v1/Chassis/<id>/Thermal | jq '.Temperatures[] | {Name, ReadingCelsius}'
# Store credentials in a secrets vault, never in scripts or shell history.`}
      </CodeBlock>

      {/* ══════════ 20. MAINTENANCE ══════════ */}
      <h2 id="maintenance" style={S.h2}>Maintenance and Firmware Updates</h2>
      <ComparisonTable
        title="Blade Infrastructure Maintenance Schedule (example)"
        headers={["Frequency", "Task"]}
        rows={[
          ["Continuous", "Monitoring and alerts for power, fans, modules and blades"],
          ["Weekly", "Review alarms, redundancy status, firmware drift"],
          ["Monthly", "Check logs, backup chassis/I/O configuration, review capacity (power, uplinks)"],
          ["Quarterly", "Clean filters/rack airflow path, check blanking panels, inspect cables and optics"],
          ["Per OEM plan", "Firmware updates in waves: test chassis → one production chassis → the rest"],
          ["Annually", "Failover tests (PSU, fan, I/O, manager), review spares and lifecycle status"],
        ]}
        caption="Example only. Actual intervals come from OEM manuals and your operating policy."
      />
      <p style={S.p}><strong>Firmware order matters:</strong> Chassis manager, I/O modules, blade BIOS/BMC and adapter firmware must be compatible. Vendors publish a validated bundle or recipe. Never update one part alone and hope.</p>
      <p style={S.p}><strong>Update in waves:</strong> Test chassis first. Then one production chassis at a time, moving workloads away before the update. Never update both chassis of a cross-chassis HA pair on the same night.</p>
      <p style={S.p}><strong>Backups:</strong> Export chassis manager configuration, I/O module configuration and blade profiles before every change. Store them off the chassis.</p>
      <p style={S.p}><strong>Spares:</strong> Keep at least one spare PSU, fan module, I/O module and blade (or a defined replacement SLA). Midplane failures are rare but take the whole chassis out — know the OEM response time.</p>

      {/* ══════════ 21. TROUBLESHOOTING ══════════ */}
      <h2 id="troubleshooting" style={S.h2}>Troubleshooting Blade Environments</h2>
      <Figure caption="Fig 7 — Blade troubleshooting flow: decide whether one blade or many are affected, then check blade-level causes, or chassis-level power, network and thermal; finish with fix, validate and document."><BladeTroubleshootFlow /></Figure>
      <DiagramGuide
        title="How to read Fig 7"
        steps={[
          "Start at the red box: an alert or outage report. The first question is scale — is it one blade or many?",
          "Left path (ONE): blade-level problem. Read the BMC log, reseat, then compare with a known-good slot or blade to tell whether the blade or the slot is bad.",
          "Right path (MANY): chassis-level problem. Always read the chassis manager alarms first.",
          "Then walk three layers in order: power (PSUs, feeds, power budget), network (I/O module path, uplinks, VLAN, firmware) and thermal (failed fans, open slots, hot aisle).",
          "Both paths finish at the green box: fix, validate that redundancy is restored, and document.",
          "Warning at the bottom: do not reseat or reset blades in a chassis with an active power or thermal alarm before reading the manager log.",
        ]}
      />
      <ComparisonTable
        title="Symptom → Likely Cause → First Check"
        headers={["Symptom", "Likely cause", "First check"]}
        rows={[
          ["Blade will not power on", "Power budget exceeded, blade not seated, slot or blade fault", "Chassis manager: blade recognised? Power cap / budget; reseat; test another slot"],
          ["Blade has no network", "I/O module down, wrong bay/adapter mapping, VLAN mismatch, uplink down", "I/O module health, port status, VLAN on module and OS, ToR port"],
          ["Several blades lose network at once", "I/O module or uplink failure, ToR issue", "Which fabric (A or B)? Module logs, uplink LEDs"],
          ["Blades throttle / thermal warnings", "Failed fan, missing blanking panel, hot-aisle recirculation, high inlet temperature", "Fan status, inlet temperature, empty bays"],
          ["Manager unreachable", "Management network issue, active manager failed, IP conflict", "Ping manager VIP, check standby, console on manager"],
          ["Blades reboot together", "Power event, firmware bug, PSU failure with insufficient capacity", "Manager event log, PDU/UPS logs, power budget"],
          ["Slow storage on blades", "Oversubscribed uplinks, FC zoning or multipath problem", "Uplink utilisation, errors, multipath status"],
          ["Redundancy lost alarm", "PSU, fan, or module failed", "Replace failed part promptly; confirm redundancy restored"],
        ]}
        caption="Start with the simplest and cheapest check first."
      />
      <h3 style={S.h3}>Blade Not Powering On</h3>
      <p style={S.p}>Is the blade recognised in the manager? Is the chassis power budget exhausted? Is the blade fully seated? Try the blade in another slot, and try a known-good blade in this slot.</p>
      <h3 style={S.h3}>Network Connectivity Issue</h3>
      <p style={S.p}>Trace the path: blade adapter → midplane → I/O module → uplink → ToR. Check each hop: link state, errors, VLAN, teaming. Remember Port A goes to one bay and Port B to the other.</p>
      <h3 style={S.h3}>Chassis Management Not Accessible</h3>
      <p style={S.p}>Check the management VLAN and cables. Has the primary manager failed and the standby taken over? Is the VIP correct? Blades usually keep running — do not panic-reboot them.</p>
      <h3 style={S.h3}>Thermal Warnings</h3>
      <p style={S.p}>Which fans failed? Are all empty bays blanked? Is hot air recirculating? Are high-power blades clustered? What is the rack inlet temperature compared with the baseline?</p>
      <Callout type="best-practice" title="Read the manager log before touching hardware">
        The chassis manager records power events, fan events and module resets with timestamps. Reading it first prevents the common mistake of reseating healthy blades when the real problem is a PSU or feed.
      </Callout>

      {/* ══════════ 22. FAILURE SCENARIOS ══════════ */}
      <h2 id="failure-scenarios" style={S.h2}>Failure Scenarios</h2>
      <h3 style={S.h3}>Scenario 1 — One PSU fails</h3>
      <p style={S.p}>An alert says "redundancy lost" but nothing is down. The other PSUs carry the load. Engineers confirm the load still fits, order or pull a spare, hot-swap the PSU, and check that redundancy returns. The risk is in delay: a second failure before replacement could power-cap or drop blades.</p>
      <h3 style={S.h3}>Scenario 2 — Power feed A is lost</h3>
      <p style={S.p}>A UPS or PDU fault removes feed A. Half the PSUs go off. If the load fits on feed B, nothing changes. If not, the manager caps power or blades shut down. This is why the power budget must be tested for the one-feed state, not only for the normal state.</p>
      <h3 style={S.h3}>Scenario 3 — I/O module crashes after a firmware update</h3>
      <p style={S.p}>Fabric A drops. Every blade loses half its paths. With proper teaming and cross-fabric ToR design, the OS fails over and applications keep running. Without it, a whole chassis loses network. Lesson: test failover, and update modules one at a time.</p>
      <h3 style={S.h3}>Scenario 4 — Midplane fault or whole-chassis outage</h3>
      <p style={S.p}>Rare, but serious. All blades in the chassis go down. HA restarts VMs on the second chassis if capacity exists. Services with anti-affinity copies stay up. This is the scenario the cross-chassis design is built for — see Fig 6.</p>
      <h3 style={S.h3}>Scenario 5 — Empty slot overheats neighbours</h3>
      <p style={S.p}>A blade was removed and not replaced with a blanking panel. Hot air recirculates through the hole; blades beside it throttle. The fix costs a few rupees — a blanking panel — but the discovery cost hours of troubleshooting. Always blank empty bays.</p>
      <Callout type="interview" title="Failure mindset">
        A chassis is small but concentrated. Think in layers: component failure (handled by redundancy), module failure (handled by dual paths), chassis failure (handled by cross-chassis design), site failure (handled by DR).
      </Callout>

      {/* ══════════ 23. TIER ══════════ */}
      <h2 id="tier-iii-iv-view" style={S.h2}>Tier III and Tier IV View</h2>
      <p style={S.p}>Tier classification covers facility infrastructure — power paths, cooling and maintainability. The way you connect and place blade chassis decides whether you can actually use that facility redundancy.</p>
      <ComparisonTable
        title="Blade Infrastructure — Tier III vs Tier IV Thinking"
        headers={["Area", "Tier III thinking", "Tier IV thinking"]}
        rows={[
          ["Power to chassis", "Concurrently maintainable: dual feeds (A/B), PSUs split across feeds, one path can be taken down for maintenance", "Fault tolerant: fully independent A and B systems; a single fault never drops a chassis"],
          ["Cooling", "N+1 cooling; chassis fans plus containment", "Independent cooling paths; no single fault reduces inlet conditions"],
          ["Network", "Redundant I/O modules to separate ToR switches", "Fully diverse paths, switches and uplink routes"],
          ["Chassis count", "At least two chassis for critical clusters, N+1 capacity", "Chassis spread over independent racks/rooms/power paths"],
          ["Management", "Redundant managers; dedicated management network", "Independent management paths with monitored failover"],
          ["Maintenance", "Take down one path, one chassis or one module at a time", "Any single component can be serviced or fail without service impact"],
        ]}
        caption="Conceptual view only. Actual implementation depends on project requirements, utility requirements, OEM design and data center architecture."
      />
      <p style={S.p}><strong>Practical reality:</strong> A Tier III or IV hall does not make a single chassis fault tolerant. If both chassis of a cluster sit in the same rack on the same A/B feed pair and same ToR pair, the design can still fail together. Facility redundancy and IT placement must be designed as one system.</p>
      <p style={S.p}>Actual implementation depends on project requirements, utility requirements, OEM design and data center architecture — always verify with vendor documentation. Facility types: <TopicLink slug="data-center-types" variant="inline" />.</p>

      {/* ══════════ 24. SAFETY ══════════ */}
      <h2 id="safety-practices" style={S.h2}>Safety Practices</h2>
      <ul style={S.ul}>
        <li><strong>Lifting:</strong> A loaded chassis can weigh well over 100 kg. Use a lift, remove PSUs and blades first where allowed, and never lift alone.</li>
        <li><strong>Electrical:</strong> Chassis use high-current feeds. Follow lock-out/tag-out, confirm de-energised, and use rated tools. Each PSU has live internals even after unplugging for a short time.</li>
        <li><strong>Hot-swap care:</strong> Replace one PSU or module at a time and check redundancy state before the next one.</li>
        <li><strong>ESD:</strong> Wrist strap and antistatic mat for blades and mezzanine cards.</li>
        <li><strong>Hot surfaces:</strong> Heatsinks and exhaust areas can be very hot — allow cool-down.</li>
        <li><strong>Pinch points:</strong> Blades, rails and chassis edges can trap fingers.</li>
        <li><strong>Noise:</strong> Chassis fans are loud; use hearing protection in dense rows.</li>
        <li><strong>Fibre optics:</strong> Never look into a live fibre or transceiver port.</li>
        <li><strong>Change control:</strong> Firmware, I/O module and power changes need an approved plan, a window and a rollback.</li>
        <li><strong>Security:</strong> Keep default credentials off the manager and BMCs; limit physical access to the rack.</li>
      </ul>

      {/* ══════════ 25. OEM ══════════ */}
      <h2 id="oem-reference" style={S.h2}>OEMs and Product Families</h2>
      <ComparisonTable
        title="Blade / Modular Ecosystem — Who Makes What"
        headers={["Vendor", "Examples of product families (verify current status)", "Notes"]}
        rows={[
          ["HPE", "BladeSystem (c-Class), Synergy (composable)", "Management via OneView / Onboard Administrator depending on generation"],
          ["Dell Technologies", "PowerEdge M-series chassis (M1000e), PowerEdge MX (modular)", "MX uses a fabric architecture; management via OpenManage"],
          ["Cisco", "UCS B-series with Fabric Interconnects, UCS X-Series", "Stateless profiles managed through UCS Manager / Intersight"],
          ["Lenovo", "Flex System, ThinkSystem SN-series", "Check current support status"],
          ["Fujitsu, Huawei, Inspur, others", "Regional blade and modular platforms", "Compatibility matrices differ"],
          ["Open / hyperscale", "OCP-style sleds and multi-node chassis", "Not classic blades; shared power and cooling with simpler design"],
        ]}
        caption="Product lines change; some generations have reached end of sale or support. Always verify the current lifecycle status and compatibility with the OEM. Not an endorsement."
      />
      <p style={S.p}>Use the OEM compatibility matrix for blades, adapters, I/O modules and firmware. Unlisted combinations void support and often fail in odd ways.</p>

      {/* ══════════ 26. WHEN NOT BLADE ══════════ */}
      <h2 id="when-not-blade" style={S.h2}>When Blade Is (and Is Not) the Right Choice</h2>
      <ComparisonTable
        title="Choosing Between Blade and Alternatives"
        headers={["Situation", "Better fit", "Why"]}
        rows={[
          ["Many similar general-purpose servers, strong cabling pain, central profile management", "Blade", "Shared infrastructure and templates save time"],
          ["Small deployment (a few servers)", "Rack servers", "Chassis fixed cost not justified"],
          ["Need GPUs, many PCIe cards or large local storage", "Rack servers / purpose-built GPU nodes", "Blades are space-constrained — see GPU article"],
          ["Maximum flexibility, mixed vendors", "Rack servers", "No chassis lock-in"],
          ["Software-defined storage and compute scale-out", "HCI or multi-node rack systems", "Disks live in the server nodes"],
          ["Very large, standardised, fast-changing fleets", "Composable / hyperscale designs", "Disaggregation and automation"],
        ]}
        caption="Decision guide only. Always compare total cost: hardware, power, cooling, licences, operations and lifecycle."
      />
      <p style={S.p}>For GPU workloads, see <TopicLink slug="gpu" variant="inline" />. For cloud alternatives that avoid owning chassis at all, see <TopicLink slug="cloud-vs-data-center" variant="inline" />.</p>

      {/* ══════════ 27. MISCONCEPTIONS ══════════ */}
      <h2 id="misconceptions" style={S.h2}>Common Misconceptions</h2>
      <ul style={S.ul}>
        <li><strong>"A blade chassis is a single point of failure."</strong> Not exactly. It has internal redundancy, but the whole chassis is one failure domain, so critical services must span chassis.</li>
        <li><strong>"More PSUs always means more safety."</strong> Only if feeds are separate and the load fits on the surviving PSUs.</li>
        <li><strong>"Blades are always cheaper."</strong> The chassis is a fixed cost. Blades win at scale and when the chassis is well filled.</li>
        <li><strong>"I/O modules are just cables."</strong> Many are full switches with their own firmware, VLANs and failure modes.</li>
        <li><strong>"If the manager is down, blades are down."</strong> Usually blades keep running, but you lose visibility and control.</li>
        <li><strong>"I can leave empty slots open."</strong> Open slots break airflow and overheat neighbours. Always fit blanking panels.</li>
        <li><strong>"Oversubscription only matters in normal operation."</strong> It matters even more when one I/O module fails and all traffic uses the other.</li>
        <li><strong>"Firmware can be updated one component at a time."</strong> Use the OEM validated bundle; mixed versions cause unexplained faults.</li>
      </ul>

      {/* ══════════ 28. FUTURE TRENDS ══════════ */}
      <h2 id="future-trends" style={S.h2}>Future Trends</h2>
      <ul style={S.ul}>
        <li><strong>Composable and disaggregated infrastructure:</strong> Compute, memory, storage and accelerators in pools, composed by software. CXL and PCIe fabrics may make this more practical.</li>
        <li><strong>Higher density and power:</strong> More CPU cores, faster NICs and accelerators push chassis power and heat up; liquid cooling appears in modular platforms.</li>
        <li><strong>Faster fabrics:</strong> 25/50/100G and beyond to blades, with RoCE and NVMe-oF for storage.</li>
        <li><strong>Redfish and automation:</strong> API-driven management, infrastructure as code and automated firmware compliance replace manual consoles.</li>
        <li><strong>Edge and telco:</strong> Compact modular chassis for edge sites, with fewer cables and remote management.</li>
        <li><strong>Competition from HCI and cloud:</strong> Many organisations move steady workloads to HCI or cloud, using blades only where density and central management pay off.</li>
        <li><strong>Lifecycle and sustainability:</strong> Chassis designed for several blade generations to reduce waste, and power-aware scheduling.</li>
      </ul>

      {/* ══════════ 29. LEARNING PATH ══════════ */}
      <h2 id="learning-path" style={S.h2}>Learning Path</h2>
      <p style={S.p}>Recommended order after this article:</p>
      <ul style={S.ul}>
        <li><TopicLink slug="server-basics" variant="inline" /> → <TopicLink slug="cpu" variant="inline" /> → <TopicLink slug="ram" variant="inline" /> → <TopicLink slug="gpu" variant="inline" /> → this Blade Server article.</li>
        <li>Next in the Servers group: <TopicLink slug="virtualization" variant="inline" />, which explains how VMs and HA run on top of blades.</li>
        <li>Networking track: <TopicLink slug="switch" variant="inline" /> → <TopicLink slug="router" variant="inline" /> → <TopicLink slug="load-balancer" variant="inline" />.</li>
        <li>Storage track: <TopicLink slug="das" variant="inline" /> → <TopicLink slug="nas" variant="inline" /> → <TopicLink slug="san" variant="inline" /> → <TopicLink slug="backup" variant="inline" />.</li>
        <li>Facility track: <TopicLink slug="pdu" variant="inline" />, <TopicLink slug="ups" variant="inline" />, <TopicLink slug="containment" variant="inline" />, <TopicLink slug="dcim" variant="inline" />.</li>
      </ul>

      {/* ══════════ 30. INTERVIEW ══════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: What is the key architectural difference between a blade server and a rack server?</h3>
      <p style={S.p}><strong>Answer:</strong> In a blade chassis, compute blades take power, cooling and networking from shared chassis resources — no per-blade PSU, fans or external network cards. A rack server is self-contained. Blade: higher density, less cabling, centralised management, chassis-level shared failure domain. Rack: independent, flexible, wider vendor choice, lower initial investment.</p>
      <h3 style={S.h3}>Q2: What is a shared failure domain and how do you mitigate it?</h3>
      <p style={S.p}><strong>Answer:</strong> The shared power, cooling, I/O and management of a chassis means a chassis-level issue can affect all blades. Redundant PSUs, fans, management and I/O modules protect against individual component failures. For mission-critical workloads, spread VMs or cluster nodes across multiple chassis using anti-affinity rules and keep capacity for one chassis outage.</p>
      <h3 style={S.h3}>Q3: How do you calculate oversubscription?</h3>
      <p style={S.p}><strong>Answer:</strong> Internal blade bandwidth divided by uplink bandwidth. Eight blades at 10 Gbps with two 10 Gbps uplinks gives 80 ÷ 20 = 4:1. Check the ratio in the failure state too, when one I/O module is gone.</p>
      <h3 style={S.h3}>Q4: Why do blades have two network ports on different I/O modules?</h3>
      <p style={S.p}><strong>Answer:</strong> To give two independent paths. Port A goes to one bay and Port B to another, each module uplinks to a different ToR switch, and OS teaming uses both. Losing one module leaves the blade online.</p>
      <h3 style={S.h3}>Q5: What would you check first if several blades in one chassis lose network?</h3>
      <p style={S.p}><strong>Answer:</strong> Which fabric is affected (A or B), then the I/O module health, uplink state, ToR port and any recent firmware or configuration change. Read the chassis manager log before touching hardware.</p>
      <h3 style={S.h3}>Q6: Why are blanking panels important?</h3>
      <p style={S.p}><strong>Answer:</strong> Empty bays let cold air bypass the blades and let hot air recirculate, so neighbouring blades throttle. Panels keep airflow through the active blades.</p>
      <h3 style={S.h3}>Q7: What is a stateless blade?</h3>
      <p style={S.p}><strong>Answer:</strong> A blade whose identity (MAC, WWN, UUID, BIOS and boot settings) comes from a profile and whose OS boots from SAN. If it fails, move the profile to a spare blade and boot the same OS.</p>
      <h3 style={S.h3}>Q8: When would you not choose blades?</h3>
      <p style={S.p}><strong>Answer:</strong> Small deployments, GPU or storage-heavy servers, or when vendor flexibility matters more than density. Compare total cost including chassis, power, cooling and lifecycle.</p>

      {/* ══════════ 31. KEY TAKEAWAYS ══════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Blade server = compute card in a shared chassis; power, cooling, networking and management come from the chassis.</li>
        <li>Blades trade independence for density, fewer cables and central management.</li>
        <li>The network path is blade port → midplane → I/O module → uplink → ToR; use two bays and two ToR switches.</li>
        <li>Calculate oversubscription for normal and failure states; size uplinks for peaks like backups and live migration.</li>
        <li>The chassis is a shared failure domain — internal redundancy protects components, cross-chassis design protects services.</li>
        <li>Plan power per feed and per phase, test the one-feed case, and never exceed PDU or breaker ratings.</li>
        <li>Blanking panels, containment and fan health decide thermal stability.</li>
        <li>Use the chassis manager for profiles and firmware baselines; protect and back up the management plane.</li>
        <li>Update firmware in validated bundles and in waves — never both chassis of an HA pair together.</li>
        <li>Choose blade when density and central management pay off; choose rack, HCI or GPU nodes when flexibility or accelerators matter.</li>
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
        <li><TopicLink slug="server-basics" variant="inline" /> — Rack server fundamentals and deployment.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — VMs across blade chassis, HA configuration.</li>
        <li><TopicLink slug="cpu" variant="inline" /> — Processors and NUMA inside each blade.</li>
        <li><TopicLink slug="ram" variant="inline" /> — Memory in blades.</li>
        <li><TopicLink slug="gpu" variant="inline" /> — Dense accelerator servers.</li>
        <li><TopicLink slug="switch" variant="inline" /> — Network switches behind the I/O modules.</li>
        <li><TopicLink slug="san" variant="inline" /> — Shared storage for blades.</li>
        <li><TopicLink slug="pdu" variant="inline" /> — Power distribution to the chassis.</li>
      </ul>
    </>
  );
}
