"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import BladeChassisArch from "../svg/BladeChassisArch";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#c2410c", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — Blade Servers in 2 Minutes</p> <ul style={{ ...S.ul, marginBottom: 0 }}> <li><strong>What a blade is:</strong> A thin, self-contained compute card (blade) that slides into a shared chassis. Power, cooling and networking are shared from the chassis.</li> <li><strong>Chassis:</strong> Enclosure with shared PSUs, fans, I/O modules (networking) and management module — for all blades.</li> <li><strong>Shared failure domain:</strong> A chassis-level failure or maintenance affects all blades — cross-chassis distribution is essential for mission-critical.</li> <li><strong>vs Rack server:</strong> Blade = higher density, less cabling, centralised management, chassis dependency. Rack = flexible, independent, lower entry cost.</li> <li><strong>Modular/Composable:</strong> The next step — disaggregated resources dynamically composed via software. More flexibility, higher complexity.</li> <li><strong>Key check:</strong> Plan power budget, cooling capacity and network oversubscription ratio — at the time of chassis selection.</li> </ul>
      </div>

      <h2 id="what-is-blade" style={S.h2}>What Is a Blade Server?</h2>
      <p style={S.p}>A traditional rack server is a complete, self-contained unit — its own power supply, its own cooling, its own networking. A blade server uses a fundamentally different approach.</p>
      <p style={S.p}>There is a <strong>chassis</strong> (enclosure) that mounts in the rack. Multiple <strong>blades</strong> (compute cards) slide into this chassis. Blades contain only CPU, RAM and local storage — compute resources. Everything else — power supply, cooling, network switching, management — is shared at the chassis level. Each blade does not need its own PSU, its own cooling or its own network switch — these come from the chassis.</p>

      <h2 id="blade-architecture" style={S.h2}>Blade Architecture — Component by Component</h2>
      <Figure caption="Fig 1 — Blade chassis architecture: compute blades sharing PSUs, fans, I/O modules and management module through chassis backplane."><BladeChassisArch /></Figure>
      <p style={S.p}><strong>Chassis (Enclosure):</strong> Mounts in the rack — typically takes several U of space (exact size depends on vendor and model; verify vendor documentation). It has multiple blade slots.</p>
      <p style={S.p}><strong>Shared Power Supplies:</strong> Multiple PSUs in the chassis — all blades draw power from a shared power bus. Redundant configuration — the specific redundancy mode (N+1, 2N, etc.) depends on chassis design.</p>
      <p style={S.p}><strong>Shared Cooling:</strong> High-performance fans in the chassis — for all blades. There are no individual blade fans. Central cooling can be more coordinated.</p>
      <p style={S.p}><strong>I/O Modules:</strong> At the rear of the chassis — they provide networking and storage connectivity. Blade traffic is routed through the internal backplane to the I/O module. There are no per-blade external cables — uplinks connect at the I/O module level.</p>
      <p style={S.p}><strong>Management Module:</strong> Centralised out-of-band management — all blades from one interface. Power control, hardware health, virtual console — at the chassis level.</p>
      <p style={S.p}><strong>Chassis Backplane:</strong> Internal interconnect — routes power, management signals, and data and network traffic between all blades and chassis components.</p>

      <h2 id="blade-vs-rack" style={S.h2}>Blade vs Rack vs Modular/Composable</h2>
      <ComparisonTable
        title="Server Infrastructure Models — Comparison"
        headers={["Aspect","Rack Server","Blade Server","Modular/Composable"]}
        rows={[
          ["Self-contained","Yes — each server independent","No — shares chassis resources","Disaggregated pools"],
          ["Cabling","Per-server cables (power + network)","Chassis-level uplinks only","Fabric-based"],
          ["Density","Standard — 1U/2U/4U","Higher density per chassis","Varies, purpose-built"],
          ["Failure domain","Individual server","Shared chassis","Typically disaggregated"],
          ["Management","Per-server + DCIM","Centralised via chassis module","Software-defined (management plane)"],
          ["Vendor flexibility","Wide — standard rack","Blade vendor-specific","Typically proprietary"],
          ["Entry cost","Lower initial","Higher (chassis investment)","Higher — specialised"],
          ["Flexibility","High — mix/match","Limited — blade form factor","Highest — resource pools"],
        ]}
        caption="Selection depends on scale, density requirements, operational model, budget and existing infrastructure."
      />
      <p style={S.p}><strong>Modular / Composable Infrastructure:</strong> The next evolution — resources (CPU, memory, storage, networking) disaggregated into pools. Software-defined composition — needed resources are dynamically assigned. HPE Synergy is one commercial example of this concept, but there is no universal standard. Higher flexibility, higher complexity and investment. Evaluate it for large-scale, standardized deployments.</p>

      <h2 id="chassis-fabric" style={S.h2}>Chassis Fabric and Interconnects</h2>
      <p style={S.p}>The blade chassis's internal interconnect fabric routes data and network traffic between blades — together with the I/O modules. Fabric architecture depends on chassis design. Some chassis use a crossbar switch fabric — non-blocking bandwidth between blades. Some use a simpler shared backplane — oversubscription can be higher.</p>
      <p style={S.p}>I/O module types are available for different connectivity needs: Ethernet switching module (a virtual switch in the blades — a single uplink to the ToR), pass-through module (patch blade NICs directly to the ToR switch — simpler, more visible), Fibre Channel module (SAN connectivity). I/O module choice is based on workload, network architecture, and ops team preference.</p>

      <h2 id="oversubscription" style={S.h2}>Oversubscription in Blade Networks</h2>
      <p style={S.p}>Oversubscription occurs when total internal blade bandwidth exceeds total external uplink bandwidth. Example: 8 blades × 10Gbps per blade = 80Gbps internal aggregate, but the chassis's 2 uplinks = 20Gbps — 4:1 oversubscription.</p>
      <p style={S.p}>When oversubscription is acceptable: blades do not all use maximum network bandwidth simultaneously (in typical mixed workloads — web servers, VMs). When it is a problem: storage-heavy workloads, live migration traffic bursts, backup windows. Plan I/O module uplink capacity according to actual traffic patterns.</p>

      <h2 id="shared-failure" style={S.h2}>Shared Failure Domain</h2>
      <Callout type="warning" title="Blade Chassis = Shared Failure Domain, Not Universal Single Point of Failure">
        A blade chassis is a shared failure domain — chassis-level failures (complete power loss, management module issue) can affect all blades. However, redundant components (dual PSUs, N+1 fans, dual management modules) are designed to survive individual component failures. The blanket statement "single point of failure" is technically inaccurate — the chassis has internal redundancy. The real risk is at the individual chassis level — that is why cross-chassis distribution is important for mission-critical.
      </Callout>
      <p style={S.p}><strong>Cross-chassis distribution:</strong> For mission-critical services, distribute VMs or workloads across multiple chassis. When one chassis has maintenance or an issue, another chassis continues the service. This requires appropriate virtualisation and high availability configuration.</p>

      <h2 id="redundancy" style={S.h2}>Redundancy at Chassis Level</h2>
      <p style={S.p}><strong>Power:</strong> Redundant PSUs — hot-swap, multiple power feeds. Connect chassis PSUs to A/B power feeds with the same logic used for rack servers. Verify the specific PSU redundancy mode from the chassis vendor documentation.</p>
      <p style={S.p}><strong>Cooling:</strong> Fan modules are typically N+1 — if one fan module fails, the chassis continues (with reduced margin). Hot-swap is typically supported.</p>
      <p style={S.p}><strong>Management modules:</strong> Enterprise chassis typically support dual management modules — active/standby. Primary fails → secondary takes over.</p>
      <p style={S.p}><strong>I/O modules:</strong> Deploy redundant I/O modules in separate bays — so that a single I/O module failure does not impact blade connectivity.</p>

      <h2 id="management" style={S.h2}>Centralised Management</h2>
      <p style={S.p}>A significant advantage of a blade environment is centralised management. Manage all blades from one interface through the chassis management module (vendor-specific — verify current product names with the OEM). Power on/off, hardware health, blade configuration templates, firmware update coordination.</p>
      <p style={S.p}>Template-based deployment: pushing the same configuration to multiple blades keeps it automated and consistent. Useful in large, standardized compute environments.</p>

      <h2 id="deployment" style={S.h2}>Deployment Considerations</h2>
      <p style={S.p}><strong>Physical:</strong> A fully loaded chassis is heavy — use proper rails and an installation team. Verify rack depth compatibility. Rear service access — I/O modules and PSUs are at the rear.</p>
      <p style={S.p}><strong>Power:</strong> Calculate the total power draw of a fully loaded chassis — is the rack circuit adequate? Are A/B feeds planned? Per-blade TDP × total blades + chassis overhead = total draw estimate (use the vendor power calculator for specific numbers).</p>
      <p style={S.p}><strong>Cooling:</strong> A high-density chassis produces significant heat — verify CRAC/CRAH capacity. Maintain hot-aisle/cold-aisle orientation.</p>
      <p style={S.p}><strong>Network planning:</strong> I/O module uplink bandwidth vs total blade bandwidth — plan the oversubscription ratio. Management network — chassis management module on a dedicated management VLAN.</p>

      <h2 id="troubleshooting" style={S.h2}>Troubleshooting Blade Environments</h2>
      <h3 style={S.h3}>Blade Not Powering On</h3>
      <p style={S.p}>Check the chassis management console — is the blade recognized? Power budget exceeded (chassis total power limit hit)? Is the blade properly seated (re-seat)? Is the blade itself faulty — test with a known-good slot.</p>
      <h3 style={S.h3}>Network Connectivity Issue</h3>
      <p style={S.p}>Check the blade's I/O module path. Is the I/O module healthy — verify from chassis management. Status of the uplink from the I/O module to the ToR switch? Do VLAN configurations match between the I/O module and the blade OS?</p>
      <h3 style={S.h3}>Chassis Management Not Accessible</h3>
      <p style={S.p}>Check management network connectivity. Has the primary management module failed? Did the secondary take over? Is the network path to the management IP working?</p>
      <h3 style={S.h3}>Thermal Warnings</h3>
      <p style={S.p}>Fan modules — any failed? Blanking panels in empty blade slots (required for airflow). Is hot-aisle cold-aisle orientation correct? Are high-power blades concentrated? Ambient rack temperature?</p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: What is the key architectural difference between a blade server and a rack server?</h3>
      <p style={S.p}><strong>Answer:</strong> In a blade chassis, compute blades take power, cooling and networking through resources shared from the chassis — no per-blade PSU, cooling or network card. A rack server is self-contained. Blade: higher density, less cabling, centralised management, chassis-level shared failure domain. Rack: independent, flexible, wider vendor choice, lower initial investment.</p>
      <h3 style={S.h3}>Q2: What is a shared failure domain and how do you mitigate it?</h3>
      <p style={S.p}><strong>Answer:</strong> The shared infrastructure of a blade chassis (power, cooling, I/O) creates one failure domain — a chassis-level issue can affect all blades. Redundant PSUs, fans and management modules inside the chassis protect against individual component failures. For mission-critical: distribute VMs/workloads across multiple chassis — so that one chassis issue does not affect both simultaneously. This is achieved with virtualisation and HA configuration.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Blade server = compute card in a shared chassis — power, cooling and networking come from the chassis.</li>
        <li>The chassis is a shared failure domain — internal redundancy exists, but chassis-level issues can affect all blades.</li>
        <li>Cross-chassis distribution is essential for mission-critical workloads.</li>
        <li>I/O modules define blade networking — choose the type (switching/pass-through/FC) based on workload and architecture.</li>
        <li>Plan oversubscription — total blade bandwidth vs chassis uplink bandwidth.</li>
        <li>Composable/modular infrastructure is the next evolution — resources disaggregated, software-defined composition.</li>
        <li>Carefully plan chassis power budget, cooling capacity and network uplinks before deployment.</li>
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
        <li><TopicLink slug="server-basics" variant="inline" /> — Rack server fundamentals and deployment.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — VMs across blade chassis, HA configuration.</li>
      </ul>
    </>
  );
}
