"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/sections/Operations.tsx
//
// Sections covering Bypass Modes, ECO Mode, Redundancy Architecture,
// Parallel UPS, Dual Bus & A-B Feed, Static Transfer Switch, PDU. Written
// to close the gap found during TOC/heading validation — every id below
// corresponds to an entry already declared in headings.ts that previously
// had no rendered section.
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function Operations() {
  return (
    <>
      <h2 id="bypass-modes" style={S.h2}>Bypass: Static / Maintenance / Internal</h2>

      <p style={S.p}>
        Bypass is the safety net of the UPS — if the inverter fails, gets overloaded, or the UPS has to be isolated for maintenance, the bypass gives the load continuous power without interruption. There are three separate bypass paths, each for a different purpose.
      </p>

      <ComparisonTable
        headers={["Bypass Type", "Trigger", "Transfer Time", "Use Case"]}
        rows={[
          ["Static Bypass", "Automatic — inverter fault/overload", "< 4 ms (thyristor-based)", "Fault protection, no manual action needed"],
          ["Maintenance Bypass", "Manual — operator switches it", "Brief interruption possible (mechanical)", "UPS servicing, full electrical isolation"],
          ["Internal Bypass", "Built into UPS cabinet, automatic or manual", "Varies by OEM design", "Compact installs without external bypass panel"],
        ]}
      />

      <Callout type="danger" title="Danger — Maintenance Bypass Required Before Servicing">
        Static bypass is for transfer, not for electrical isolation — the UPS internals still remain live. Before working on a UPS, always activate the Maintenance Bypass and follow proper LOTO (Lock Out Tag Out). Static bypass per se does not give safe isolation.
      </Callout>

      <p style={S.p}>
        The maintenance bypass is typically a separate physical switch/panel that removes the UPS from the circuit completely — input, output and battery are all disconnected, and the load goes directly onto raw mains. This is the safe state for servicing.
      </p>

      <Callout type="interview" title="Interview Tip">
        If asked "What is the difference between static bypass and maintenance bypass?" — answer: <em>Static bypass is automatic, for fault response, happens in milliseconds, but the UPS is not electrically isolated. Maintenance bypass is manual, gives complete isolation and is used for servicing.</em>
      </Callout>

      <h2 id="eco-mode" style={S.h2}>ECO Mode</h2>

      <p style={S.p}>
        ECO Mode is the high-efficiency operating state of a UPS — the load normally takes power from the bypass path (raw mains, with minor filtering) and the inverter stays in standby. If grid quality becomes poor, the UPS activates the inverter within milliseconds.
      </p>

      <ComparisonTable
        headers={["Mode", "Efficiency", "Output Quality", "Transfer Risk"]}
        rows={[
          ["Double Conversion (Online)", "94-96%", "Always clean, zero transfer time", "None — inverter always on"],
          ["ECO Mode", "Up to 99%", "Bypass quality normally, clean only during transfer", "Brief transfer if grid degrades (sub-cycle)"],
        ]}
      />

      <Callout type="best-practice" title="Best Practice — ECO Mode Trade-off">
        ECO mode gives significant energy savings (heat generation is also lower, which reduces the cooling load) — but it is a trade-off against a slight transfer risk. For critical Tier IV loads, many operators avoid ECO mode in favour of pure double-conversion. The actual decision depends on project requirements and risk tolerance.
      </Callout>

      <h2 id="redundancy-architecture" style={S.h2}>Redundancy: N / N+1 / N+2 / 2N / 2(N+1)</h2>

      <p style={S.p}>
        The redundancy architecture decides how many UPS modules are needed and what happens if one or more modules fail. This is the most critical decision in Data Center design.
      </p>

      <ComparisonTable
        headers={["Architecture", "Spare Capacity", "Fault Tolerance", "Typical Tier"]}
        rows={[
          ["N", "Zero — exact load match", "None — any failure = outage", "Tier I"],
          ["N+1", "One extra module", "Survives 1 module failure", "Tier II / III"],
          ["N+2", "Two extra modules", "Survives 2 simultaneous failures", "High-availability Tier III"],
          ["2N", "Full duplicate path", "Survives complete path loss", "Tier IV"],
          ["2(N+1)", "Two fully redundant N+1 paths", "Survives path loss AND module failure within a path", "Tier IV — highest resilience"],
        ]}
      />

      <p style={S.p}>
        Use the <strong>UPS Redundancy Calculator</strong> (linked at the end of this article) to
        calculate exact module counts, spare capacity, and utilization for your chosen architecture.
      </p>

      <Callout type="common-mistake" title="Common Mistake — Confusing 2N with N+1">
        2N does not simply mean more redundancy than N+1, just &quot;double&quot; — 2N means <strong>two completely independent paths</strong>, each capable of handling the full load alone. N+1 is an extra module in a single path. Mixing these up is a common gotcha in design reviews.
      </Callout>

      <h2 id="parallel-ups" style={S.h2}>Parallel UPS Systems</h2>

      <p style={S.p}>
        When a single UPS unit is insufficient for the required capacity, or redundancy is needed, multiple UPS units operate in <strong>parallel</strong> — they share the same output bus, and the load is split proportionally.
      </p>

      <ComparisonTable
        headers={["Parameter", "Requirement", "Why It Matters"]}
        rows={[
          ["Voltage sync", "All units must match output voltage/frequency/phase", "Mismatch causes circulating currents between units"],
          ["Load sharing", "Active load-sharing logic (master/slave or democratic)", "Prevents one unit from overloading while others idle"],
          ["Same OEM/model", "Strongly recommended", "Synchronization protocols are often proprietary between vendors"],
          ["Communication bus", "Inter-unit comms (CAN bus typical)", "Coordinates synchronization and fault response"],
        ]}
      />

      <Callout type="warning" title="Warning — Never Mix UPS Models in Parallel">
        Running different UPS models/OEMs in parallel is risky — the synchronization and load-sharing logic may be incompatible. The same model series and same firmware version are recommended for parallel installations.
      </Callout>

      <h2 id="dual-bus-ab-feed" style={S.h2}>Dual Bus & A-B Feed Architecture</h2>

      <p style={S.p}>
        In a Dual Bus (or A-B Feed) architecture, every critical load in the Data Center is fed from <strong>two independent power paths</strong> — Source A and Source B. This is the physical implementation of 2N redundancy.
      </p>

      <ComparisonTable
        headers={["Component", "A Path", "B Path"]}
        rows={[
          ["Grid Feed", "Independent utility feeder/transformer", "Separate independent utility feeder/transformer"],
          ["UPS", "Dedicated UPS system A", "Dedicated UPS system B"],
          ["Battery", "Independent battery bank A", "Independent battery bank B"],
          ["PDU", "PDU-A", "PDU-B"],
          ["Server Connection", "Power Supply 1", "Power Supply 2 (dual-corded servers)"],
        ]}
      />

      <p style={S.p}>
        Dual-corded servers are connected to both paths simultaneously — if path A fails completely (UPS failure, PDU failure, breaker trip), the server keeps taking power seamlessly from path B, zero downtime.
      </p>

      <Callout type="important" title="Important — True Independence Required">
        Dual Bus is effective only when the A and B paths are <strong>genuinely independent</strong> — a shared transformer, shared breaker or shared physical routing (same cable tray) creates a single point of failure that defeats the whole 2N design. Physical separation is as important as electrical.
      </Callout>

      <h2 id="static-transfer-switch" style={S.h2}>Static Transfer Switch (STS)</h2>

      <p style={S.p}>
        The STS is a critical component in a dual-bus architecture — it transfers a single-corded load (one that does not support dual power input) between the A and B sources in sub-4ms, using thyristor-based switching, with no mechanical moving parts.
      </p>

      <ComparisonTable
        headers={["Parameter", "STS", "ATS (Automatic Transfer Switch)"]}
        rows={[
          ["Switching technology", "Thyristor (solid-state)", "Mechanical contactor/breaker"],
          ["Transfer time", "< 4 ms", "100-500 ms typical"],
          ["Suitable for IT loads?", "Yes — invisible to sensitive equipment", "Risky — can cause reboot/glitch"],
          ["Typical use", "Data Center single-corded load protection", "Generator changeover, building-level switching"],
        ]}
      />

      <Callout type="important" title="Important — STS Requires Phase Sync">
        The STS does not detect phase synchronization on its own — both sources (A and B) must be phase-synchronized upstream for the transfer to be truly seamless. This is a design constraint directly connected to UPS and generator synchronization.
      </Callout>

      <p style={S.p}>
        Deeper coverage of the STS is in the dedicated <TopicLink slug="sts" variant="inline" /> article.
      </p>

      <h2 id="pdu-distribution" style={S.h2}>Power Distribution Unit (PDU)</h2>

      <p style={S.p}>
        The PDU distributes the UPS output to individual racks — it is the final stage of the whole power path, where the server actually takes power from.
      </p>

      <ComparisonTable
        headers={["PDU Type", "Function", "Best For"]}
        rows={[
          ["Floor-mount/Main PDU", "Receives UPS output, distributes via breakers to rack PDUs", "Centralized distribution in larger DCs"],
          ["Rack PDU (Basic)", "Simple outlet strip, no monitoring", "Small/non-critical racks"],
          ["Rack PDU (Metered)", "Per-outlet or per-inlet power monitoring", "Capacity planning, billing"],
          ["Rack PDU (Switched/Intelligent)", "Remote outlet control + monitoring, DCIM integration", "Critical racks, remote reboot capability"],
        ]}
      />

      <p style={S.p}>
        In dual-corded racks, the server connects to both PDU-A and PDU-B — if one PDU/path fails, the server keeps running from the other. Monitoring phase balance at the PDU level is also essential — unbalanced 3-phase loading unnecessarily stresses both cables and breakers.
      </p>

      <p style={S.p}>
        Complete coverage of the PDU is in the dedicated <TopicLink slug="pdu" variant="inline" /> article.
      </p>
    </>
  );
}
