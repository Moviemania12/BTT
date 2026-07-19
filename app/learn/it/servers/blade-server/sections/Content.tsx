"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import BladeChassisArch from "../svg/BladeChassisArch";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#c2410c", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — Blade Servers in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>Blade kya hai:</strong> Thin, self-contained compute card (blade) jo shared chassis mein slide karta hai. Shared power, cooling, networking chassis se.</li>
          <li><strong>Chassis:</strong> Enclosure with shared PSUs, fans, I/O modules (networking), management module — sab blades ke liye.</li>
          <li><strong>Shared failure domain:</strong> Chassis-level failure ya maintenance sab blades affect karta hai — mission-critical mein cross-chassis distribution zaroori.</li>
          <li><strong>vs Rack server:</strong> Blade = higher density, less cabling, centralised management, chassis dependency. Rack = flexible, independent, lower entry cost.</li>
          <li><strong>Modular/Composable:</strong> Next step — disaggregated resources dynamically composed via software. More flexibility, higher complexity.</li>
          <li><strong>Key check:</strong> Power budget, cooling capacity, network oversubscription ratio plan karo — chassis selection ke waqt.</li>
        </ul>
      </div>

      <h2 id="what-is-blade" style={S.h2}>What Is a Blade Server?</h2>
      <p style={S.p}>Traditional rack server ek complete, self-contained unit hai — apna power supply, apna cooling, apna networking. Blade server fundamentally different approach use karta hai.</p>
      <p style={S.p}>Ek <strong>chassis</strong> (enclosure) hota hai jo rack mein mount hota hai. Is chassis mein multiple <strong>blades</strong> (compute cards) slide in hote hain. Blades mein sirf CPU, RAM, local storage hote hain — compute resources. Baaki sab — power supply, cooling, network switching, management — chassis level pe shared hota hai. Har blade ne apna PSU nahi rakhna, apna cooling nahi, apna network switch nahi — yeh chassis se milte hain.</p>

      <h2 id="blade-architecture" style={S.h2}>Blade Architecture — Component by Component</h2>
      <Figure caption="Fig 1 — Blade chassis architecture: compute blades sharing PSUs, fans, I/O modules and management module through chassis backplane."><BladeChassisArch /></Figure>
      <p style={S.p}><strong>Chassis (Enclosure):</strong> Rack mein mount hota hai — typically several U space leta hai (exact size vendor aur model pe depend karta hai, vendor documentation verify karo). Multiple blade slots hote hain.</p>
      <p style={S.p}><strong>Shared Power Supplies:</strong> Multiple PSUs chassis mein — sab blades ek shared power bus se power lete hain. Redundant configuration — specific redundancy mode (N+1, 2N, etc.) chassis design pe depend karta hai.</p>
      <p style={S.p}><strong>Shared Cooling:</strong> High-performance fans chassis mein — sab blades ke liye. Individual blade fans nahi hote. Central cooling more coordinated ho sakti hai.</p>
      <p style={S.p}><strong>I/O Modules:</strong> Chassis ke rear mein — networking aur storage connectivity provide karte hain. Blade traffic internal backplane se I/O module tak route hota hai. External cables per-blade nahi hote — I/O module level pe uplinks connect hote hain.</p>
      <p style={S.p}><strong>Management Module:</strong> Centralised out-of-band management — sab blades ek interface se. Power control, hardware health, virtual console — chassis level pe.</p>
      <p style={S.p}><strong>Chassis Backplane:</strong> Internal interconnect — power, management signals, aur data aur network traffic sab blades aur chassis components ke beech route karta hai.</p>

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
      <p style={S.p}><strong>Modular / Composable Infrastructure:</strong> Next evolution — resources (CPU, memory, storage, networking) disaggregated into pools. Software-defined composition — needed resources dynamically assigned. HPE Synergy is concept ka ek commercial example hai lekin koi universal standard nahi hai. Higher flexibility, higher complexity aur investment. Large-scale, standardized deployments ke liye evaluate karo.</p>

      <h2 id="chassis-fabric" style={S.h2}>Chassis Fabric and Interconnects</h2>
      <p style={S.p}>Blade chassis ka internal interconnect fabric blades ke beech data aur network traffic route karta hai — I/O modules ke saath. Fabric architecture chassis design pe depend karta hai. Kuch chassis crossbar switch fabric use karte hain — blades ke beech non-blocking bandwidth. Kuch simpler shared backplane use karte hain — oversubscription higher ho sakta hai.</p>
      <p style={S.p}>I/O module types available hote hain alag-alag connectivity ke liye: Ethernet switching module (blades mein virtual switch — ToR tak single uplink), pass-through module (blade NICs directly patch karo ToR switch pe — simpler, more visible), Fibre Channel module (SAN connectivity). I/O module choice — workload, network architecture, aur ops team preference pe based.</p>

      <h2 id="oversubscription" style={S.h2}>Oversubscription in Blade Networks</h2>
      <p style={S.p}>Oversubscription tab hota hai jab total internal blade bandwidth total external uplink bandwidth se zyada ho. Example: 8 blades × 10Gbps per blade = 80Gbps internal aggregate, lekin chassis ke 2 uplinks = 20Gbps — 4:1 oversubscription.</p>
      <p style={S.p}>Oversubscription kab acceptable hai: Blades sab simultaneously maximum network bandwidth use nahi karte (typical mixed workloads mein — web servers, VMs). Kab problem hai: Storage-heavy workloads, live migration traffic bursts, backup windows. Actual traffic patterns ke hisaab se I/O module uplink capacity plan karo.</p>

      <h2 id="shared-failure" style={S.h2}>Shared Failure Domain</h2>
      <Callout type="warning" title="Blade Chassis = Shared Failure Domain, Not Universal Single Point of Failure">
        Blade chassis ek shared failure domain hai — chassis-level failures (complete power loss, management module issue) sab blades affect kar sakte hain. Lekin redundant components (dual PSUs, N+1 fans, dual management modules) individual component failures survive karne ke liye design kiye gaye hain. "Single point of failure" blanket statement technically inaccurate hai — chassis has internal redundancy. Real risk individual chassis level — isliye cross-chassis distribution mission-critical ke liye important hai.
      </Callout>
      <p style={S.p}><strong>Cross-chassis distribution:</strong> Mission-critical services ke liye VMs ya workloads multiple chassis ke beech distribute karo. Ek chassis maintenance ya issue pe doosra chassis service continue karta hai. Yeh requires appropriate virtualisation aur high availability configuration.</p>

      <h2 id="redundancy" style={S.h2}>Redundancy at Chassis Level</h2>
      <p style={S.p}><strong>Power:</strong> Redundant PSUs — hot-swap, multiple power feeds. A/B power feeds se chassis PSUs connect karo same logic se jo rack servers ke liye hai. Specific PSU redundancy mode chassis vendor documentation se verify karo.</p>
      <p style={S.p}><strong>Cooling:</strong> Fan modules typically N+1 — one fan module fail hone pe chassis continues (reduced margin). Hot-swap typically supported.</p>
      <p style={S.p}><strong>Management modules:</strong> Enterprise chassis typically dual management modules support karte hain — active/standby. Primary fail → secondary takes over.</p>
      <p style={S.p}><strong>I/O modules:</strong> Redundant I/O modules alag bays mein deploy karo — single I/O module failure blade connectivity impact na kare.</p>

      <h2 id="management" style={S.h2}>Centralised Management</h2>
      <p style={S.p}>Blade environment ka significant advantage centralised management hai. Chassis management module (vendor-specific — verify current product names with OEM) se sab blades ek interface se manage karo. Power on/off, hardware health, blade configuration templates, firmware update coordination.</p>
      <p style={S.p}>Template-based deployment: same configuration multiple blades pe push karna automated aur consistent rakhta hai. Useful large, standardized compute environments mein.</p>

      <h2 id="deployment" style={S.h2}>Deployment Considerations</h2>
      <p style={S.p}><strong>Physical:</strong> Chassis heavy hoti hai fully loaded — proper rails aur installation team. Rack depth compatibility verify karo. Rear service access — I/O modules aur PSUs rear pe hote hain.</p>
      <p style={S.p}><strong>Power:</strong> Chassis full loaded pe total power draw calculate karo — rack circuit adequate? A/B feeds planned? Per-blade TDP × total blades + chassis overhead = total draw estimate (vendor power calculator use karo specific numbers ke liye).</p>
      <p style={S.p}><strong>Cooling:</strong> High-density chassis significant heat produce karta hai — CRAC/CRAH capacity verify karo. Hot-aisle/cold-aisle orientation maintain karo.</p>
      <p style={S.p}><strong>Network planning:</strong> I/O module uplink bandwidth vs total blade bandwidth — oversubscription ratio plan karo. Management network — chassis management module dedicated management VLAN pe.</p>

      <h2 id="troubleshooting" style={S.h2}>Troubleshooting Blade Environments</h2>
      <h3 style={S.h3}>Blade Not Powering On</h3>
      <p style={S.p}>Chassis management console check karo — blade recognized? Power budget exceeded (chassis total power limit hit)? Blade properly seated (re-seat)? Blade itself faulty — test with known-good slot.</p>
      <h3 style={S.h3}>Network Connectivity Issue</h3>
      <p style={S.p}>Blade ka I/O module path check karo. I/O module healthy — chassis management se verify. Uplink from I/O module to ToR switch status? VLAN configuration I/O module aur blade OS match karte hain?</p>
      <h3 style={S.h3}>Chassis Management Not Accessible</h3>
      <p style={S.p}>Management network connectivity check karo. Primary management module failed? Secondary take over hua? Network path to management IP working?</p>
      <h3 style={S.h3}>Thermal Warnings</h3>
      <p style={S.p}>Fan modules — koi failed? Blanking panels in empty blade slots (required for airflow). Hot-aisle cold-aisle orientation correct? High-power blades concentrated? Ambient rack temperature?</p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: Blade server aur rack server mein key architectural difference kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Blade chassis mein compute blades power, cooling aur networking chassis se shared resources ke through lete hain — per-blade PSU, cooling ya network card nahi. Rack server self-contained hai. Blade: higher density, less cabling, centralised management, chassis-level shared failure domain. Rack: independent, flexible, wider vendor choice, lower initial investment.</p>
      <h3 style={S.h3}>Q2: Shared failure domain kya hai aur kaise mitigate karte hain?</h3>
      <p style={S.p}><strong>Answer:</strong> Blade chassis shared infrastructure (power, cooling, I/O) ek failure domain banata hai — chassis-level issue sab blades affect kar sakta hai. Chassis ke andar redundant PSUs, fans, management modules individual component failures se protect karte hain. Mission-critical ke liye: VMs/workloads multiple chassis ke beech distribute karo — ek chassis issue dono simultaneously affect na kare. Yeh virtualisation aur HA configuration ke saath achieve hota hai.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Blade server = compute card in shared chassis — power, cooling, networking chassis se milte hain.</li>
        <li>Chassis ek shared failure domain hai — internal redundancy exist karti hai, lekin chassis-level issues sab blades affect kar sakte hain.</li>
        <li>Cross-chassis distribution mission-critical workloads ke liye zaroori hai.</li>
        <li>I/O modules blade networking define karte hain — type (switching/pass-through/FC) workload aur architecture pe based choose karo.</li>
        <li>Oversubscription plan karo — total blade bandwidth vs chassis uplink bandwidth.</li>
        <li>Composable/modular infrastructure next evolution hai — resources disaggregated, software-defined composition.</li>
        <li>Chassis power budget, cooling capacity aur network uplinks carefully plan karo before deployment.</li>
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
        <li><TopicLink slug="server-basics" variant="inline" /> — Rack server fundamentals aur deployment.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — VMs across blade chassis, HA configuration.</li>
      </ul>
    </>
  );
}
