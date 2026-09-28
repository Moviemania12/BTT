"use client";

import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import StsInternalDiagram from "../svg/StsInternalDiagram";
import DualUpsStsArchitecture from "../svg/DualUpsStsArchitecture";
import StsTransferLogicDiagram from "../svg/StsTransferLogicDiagram";

export default function Foundation() {
  return (
    <>
      <h2 id="what-is-sts" style={S.h2}>What is a Static Transfer Switch?</h2>

      <p style={S.p}>
        Imagine there is a printer in an office — it has only one power plug. It is not dual-corded. If UPS-A fails, the printer will shut down. No mechanical switch will switch fast enough for the printer not to notice.
      </p>

      <p style={S.p}>
        This is exactly the problem the <strong>Static Transfer Switch (STS)</strong> solves. An STS is a solid-state switching device that transfers a single-corded load between two independent power sources in <strong>2–4 milliseconds</strong> — the load does not even notice that the source changed.
      </p>

      <p style={S.p}>
        &quot;Static&quot; means there are no moving parts. Inside there are <strong>SCRs (Silicon Controlled Rectifiers) / Thyristors</strong> — pure semiconductor switching. Unlike mechanical contactors, there is no wear, no sparks, no bounce.
      </p>

      <Callout type="important" title="STS ≠ ATS">
        An Automatic Transfer Switch (ATS) has mechanical contactors — transfer time 100–500 milliseconds. For IT equipment this is very slow. An STS has SCR thyristors — transfer time 2–4 ms, completely invisible to the IT load.
      </Callout>

      <h2 id="why-sts-required" style={S.h2}>Why STS is Required</h2>

      <p style={S.p}>
        Modern Data Centers use a dual-bus architecture — <TopicLink slug="ups" variant="inline" /> A and UPS B both provide independent paths. Dual-corded servers connect directly to both — redundancy is automatic.
      </p>

      <p style={S.p}>
        The problem comes when the equipment is single-corded — only one power input. Some legacy servers, specialized network gear and industrial equipment do not support a dual-corded PSU. For these, the STS provides external dual-path protection.
      </p>

      <ComparisonTable
        headers={["Equipment Type", "Protection Method", "Failure Tolerance"]}
        rows={[
          ["Dual-corded server", "Direct dual-bus connection (PSU1 ← Path A, PSU2 ← Path B)", "One complete path loss — zero impact"],
          ["Single-corded server (with STS)", "STS handles path switching externally", "One path loss — STS transfers in 2–4 ms"],
          ["Single-corded server (no STS)", "Single path only", "Any path failure = server power loss"],
        ]}
      />

      <p style={S.p}>
        The second use of the STS: some organizations have a high-power single-fed load (industrial chillers, large UPS bypass panels) where an STS is a cost-effective redundancy solution compared to completely duplicating the equipment.
      </p>

      <h2 id="where-sts-installed" style={S.h2}>Where STS is Installed</h2>

      <p style={S.p}>
        In the power chain, the STS is installed after the <TopicLink slug="ups" variant="inline" /> output and before the load. Typically:
      </p>

      <ul style={S.ul}>
        <li><strong>In the rack:</strong> 1U/2U rack-mount STS, directly above/below the single-corded device</li>
        <li><strong>In the row cabinet:</strong> Dedicated STS cabinet at the end of a server row, serving multiple single-corded devices</li>
        <li><strong>At PDU level:</strong> Large STS replacing dual PDU for a zone of single-corded equipment</li>
        <li><strong>At floor distribution:</strong> Very large STS (400A+) for complete floor zone protection</li>
      </ul>

      <p style={S.p}>
        Inputs: Source A (from <TopicLink slug="ups" variant="inline" />-A or PDU-A) and Source B (from UPS-B or PDU-B). Output: Single feed to load.
      </p>

      <h2 id="power-flow-architecture" style={S.h2}>Power Flow Architecture</h2>

      <Figure caption="Fig 1 — Dual UPS + STS Architecture: dual-corded equipment uses direct A/B paths; single-corded equipment uses STS for automatic switching between both UPS outputs">
        <DualUpsStsArchitecture />
      </Figure>

      <p style={S.p}>
        In normal operation of the power chain: UPS-A → PDU-A → STS Input A. UPS-B → PDU-B → STS Input B. The STS serves the load on the preferred source (typically A).
      </p>

      <p style={S.p}>
        When UPS-A fails: STS detects Input A out-of-spec → verifies Input B ready → transfers load to Input B in 2–4 ms → load continues uninterrupted.
      </p>

      <Callout type="best-practice" title="Best Practice — STS Inputs Must Be Independent">
        Both inputs of the STS must be truly independent — from separate UPS or separate PDUs. If both inputs come from the same UPS, STS redundancy becomes meaningless. With a common-mode failure (single UPS failure), both inputs will fail simultaneously — the STS will not be able to help.
      </Callout>

      <h2 id="internal-construction" style={S.h2}>Internal Construction</h2>

      <Figure caption="Fig 2 — STS Internal Block Diagram: SCR sets, voltage/frequency sensors, and control logic work together to achieve sub-4ms switching">
        <StsInternalDiagram />
      </Figure>

      <p style={S.p}>
        The main components inside an STS are:
      </p>

      <ComparisonTable
        headers={["Component", "Function"]}
        rows={[
          ["SCR Set A (anti-parallel thyristors)", "Carries Source A current when A is preferred"],
          ["SCR Set B (anti-parallel thyristors)", "Carries Source B current when B is active"],
          ["Voltage/Frequency Sensors", "Continuously monitor both sources — detect threshold violations"],
          ["Control Logic Board", "Takes the transfer decision, generates gate firing signals"],
          ["Gate Drive Circuits", "Give appropriate firing pulses to the SCR gates"],
          ["Heat Sinks / Cooling", "Manage SCR power dissipation"],
          ["Communication Module", "SNMP/Modbus for monitoring and alarm reporting"],
          ["Maintenance Bypass Switch", "Manual isolation for STS servicing"],
        ]}
      />

      <h2 id="scr-thyristor-technology" style={S.h2}>SCR / Thyristor Technology</h2>

      <p style={S.p}>
        An SCR (Silicon Controlled Rectifier) is a 4-layer semiconductor device — PNPN structure. Once it gets a gate pulse and the anode-cathode voltage is positive, the SCR starts conducting. It stops conducting through natural commutation — when the current crosses zero in the AC cycle.
      </p>

      <p style={S.p}>
        An STS uses anti-parallel SCR pairs — two SCRs connected in opposite directions, so that both the positive and negative AC half-cycles can be handled. A 3-phase STS has three such pairs (one per phase).
      </p>

      <ComparisonTable
        headers={["Parameter", "SCR (STS)", "Mechanical Contactor (ATS)"]}
        rows={[
          ["Switching time", "Microseconds to milliseconds", "50–500 milliseconds"],
          ["Moving parts", "None — solid state", "Yes — mechanical contacts"],
          ["Arc during switching", "None", "Contact arc on break"],
          ["Wear mechanism", "None under normal operation", "Contact erosion over cycles"],
          ["Life expectancy", ">20 years typical", "Depends on operation count"],
          ["Heat generation", "Moderate (on-state resistance losses)", "Low (contact resistance)"],
          ["Parallel conduction possible?", "Yes — make-before-break", "No — brief open mandatory"],
        ]}
      />

      <Callout type="important" title="Anti-Parallel Configuration">
        A single SCR conducts in only one direction. For an AC load, both half-cycles have to be carried. That is why an anti-parallel pair (back-to-back SCRs) is used — one for the positive half, one for the negative half. This combined unit forms a bidirectional AC switch.
      </Callout>

      <h2 id="static-switching-principle" style={S.h2}>Static Switching Principle</h2>

      <p style={S.p}>
        In normal operation, SCR Set A receives gate pulses — it conducts continuously and Source A's current is delivered to the load. SCR Set B does not get gate pulses — it blocks, and Source B stays isolated.
      </p>

      <p style={S.p}>
        During transfer: the control logic removes the gate pulses of SCR Set A. SCR A turns off naturally at the next current zero crossing. Simultaneously (or a little later), SCR Set B starts getting gate pulses. SCR B starts conducting. Load current starts flowing from Source B.
      </p>

      <p style={S.p}>
        Total time: Source failure detection (1–2 ms) + zero crossing wait (0–8.3 ms at
        60Hz, 0–10 ms at 50Hz) + SCR B turn-on (microseconds). Net: typically 2–4 ms total.
      </p>

      <Callout type="interview" title="Interview Tip">
        In interviews they ask: &quot;Why does an STS transfer in 4ms when an SCR switches in microseconds?&quot; — Answer: Fault detection time + zero crossing wait (AC natural commutation) + control processing together add up to 2–4ms. Pure SCR switching time is negligible; detection and the commutation wait dominate.
      </Callout>

      <h2 id="transfer-logic" style={S.h2}>Transfer Logic</h2>

      <Figure caption="Fig 3 — STS Transfer Decision Flow: preferred source monitoring, synchronization check, and transfer mode selection">
        <StsTransferLogicDiagram />
      </Figure>

      <p style={S.p}>
        The STS transfer logic follows a decision tree:
      </p>

      <ol style={S.ol}>
        <li>Continuously monitor both sources: voltage (RMS), frequency, phase angle</li>
        <li>If preferred source is within spec → no action, continue serving load from preferred</li>
        <li>If preferred source goes out-of-spec → initiate transfer sequence</li>
        <li>Check if alternate source is within spec → if not, alarm but cannot transfer</li>
        <li>Check phase synchronization between sources → determines transfer mode</li>
        <li>Execute transfer (make-before-break if sync OK, else break-before-make)</li>
        <li>Monitor for preferred source restoration → optionally auto-retransfer (configurable)</li>
      </ol>

      <ComparisonTable
        headers={["Transfer Trigger", "Condition", "Action"]}
        rows={[
          ["Undervoltage", "Source voltage drops below threshold (typically 85–90% of nominal)", "Transfer to alternate"],
          ["Overvoltage", "Source voltage rises above threshold (typically 110–115% of nominal)", "Transfer to alternate"],
          ["Frequency deviation", "Source frequency outside ±2–3 Hz of nominal", "Transfer to alternate"],
          ["Phase loss", "One or more phases missing (3-phase STS)", "Transfer to alternate"],
          ["Manual command", "Operator initiates transfer via panel or SNMP", "Transfer to alternate"],
        ]}
      />

      <h2 id="source-priority" style={S.h2}>Source Priority</h2>

      <p style={S.p}>
        An STS has one preferred source and one alternate source — this is configured as a factory setting or at commissioning. Typically Source A is preferred.
      </p>

      <p style={S.p}>
        The STS always stays on the preferred source when it is available and in-spec. Transfer to the alternate source happens only in a fault condition.
      </p>

      <p style={S.p}>
        <strong>Auto-retransfer</strong> is configurable: whether the STS automatically comes back when the preferred source is restored — this is the operator's preference. Keeping auto-retransfer ON simplifies operations; keeping it OFF avoids an unexpected retransfer (a retransfer is also a switching event).
      </p>

      <Callout type="best-practice" title="Best Practice — Source Priority Load Balancing">
        If a data center has many STS units, mix the alternate sources — A preferred on some STS, B preferred on others. This load balancing gives an even distribution on both UPS-A and UPS-B. A preferred on all STS = UPS-A overloaded, UPS-B underutilized.
      </Callout>

      <h2 id="synchronization-requirements" style={S.h2}>Synchronization Requirements</h2>

      <p style={S.p}>
        For a make-before-break seamless transfer, both sources must be synchronized. &quot;Synchronized&quot; means: same frequency and minimal phase angle difference (typically less than ±20°).
      </p>

      <p style={S.p}>
        In a normal dual-UPS setup: both UPS take supply from the same grid → output frequency and phase are automatically aligned. This synchronization guarantees a seamless transfer.
      </p>

      <p style={S.p}>
        The problem comes when UPS-A and UPS-B are fed from separate independent grids or generators — phase alignment is not possible. In this case the STS uses break-before-make — there is a brief power interruption (typically &lt; 1 AC cycle, ~16ms at 60Hz).
      </p>

      <ComparisonTable
        headers={["Scenario", "Synchronization", "Transfer Mode", "Interruption"]}
        rows={[
          ["Both UPS from same grid", "Yes — naturally synchronized", "Make-before-break", "Zero"],
          ["UPS A from grid, UPS B from generator", "No — frequency may differ", "Break-before-make", "< 1 AC cycle (~16ms)"],
          ["Both from independent grids", "No — phase angle differs", "Break-before-make", "< 1 AC cycle"],
          ["Both from synchronized generators", "Yes — if generators are synchronized", "Make-before-break", "Zero"],
        ]}
      />

      <h2 id="transfer-time" style={S.h2}>Transfer Time — 2 to 4 ms</h2>

      <p style={S.p}>
        Breakdown of transfer time:
      </p>

      <ComparisonTable
        headers={["Phase", "Time", "What Happens"]}
        rows={[
          ["Source fault detection", "0.5–1 ms", "Voltage/frequency sensors detect out-of-spec condition"],
          ["Decision processing", "0.5–1 ms", "Control logic decides to transfer, checks alternate source"],
          ["Synchronization check", "~0.5 ms", "Phase angle verification"],
          ["SCR commutation wait", "0–8 ms", "Wait for current zero crossing (natural commutation)"],
          ["SCR B turn-on", "< 0.1 ms", "Gate pulse applied, thyristor conducts"],
          ["Total", "2–4 ms typical", "Load now on alternate source"],
        ]}
      />

      <p style={S.p}>
        Why is 2–4 ms acceptable for IT equipment? Modern server PSUs have capacitors that easily absorb a 10–20 ms interruption without output ripple. The server never &quot;knows&quot; that the source changed.
      </p>

      <Callout type="common-mistake" title="Common Mistake — Transfer Time Misunderstanding">
        Some people think that because an STS switches in 4ms, no load will ever lose more than 4ms. This is right for a seamless transfer (synchronized sources). But in break-before-make there is a brief interruption — this is still invisible to servers but technically not &quot;zero&quot; transfer time. Always clarify which mode applies to your installation.
      </Callout>

      <h2 id="break-free-transfer" style={S.h2}>Break-Free Transfer</h2>

      <p style={S.p}>
        Break-free (make-before-break) transfer is the STS's signature capability. In this mode, Source B's SCRs start conducting an instant before Source A's SCRs turn off.
      </p>

      <p style={S.p}>
        During this brief overlap, both sources are connected to the load simultaneously. This is safe only when both sources are synchronized — with a near-zero phase difference, circulating currents are minimal.
      </p>

      <p style={S.p}>
        Result: the load gets continuous, uninterrupted power. Practically no dip in the voltage waveform, no glitch. IT equipment is completely unaware.
      </p>

      <h2 id="single-bus-vs-dual-bus" style={S.h2}>Single Bus vs Dual Bus</h2>

      <ComparisonTable
        headers={["Architecture", "Description", "STS Use", "Tier Level"]}
        rows={[
          ["Single Bus", "One UPS, one PDU, all equipment on one path", "Not applicable — no second source", "Tier I/II"],
          ["Single Bus with Bypass", "One UPS + bypass source, ATS switching", "STS can replace ATS for faster switching", "Tier II"],
          ["Dual Bus (partial)", "Two UPS, dual-corded servers protected, single-corded unprotected", "STS added for single-corded equipment", "Tier III"],
          ["Full Dual Bus (2N)", "Two completely independent paths A and B", "STS for all single-corded equipment", "Tier IV"],
        ]}
      />

      <p style={S.p}>
        In a full dual-bus architecture: <strong>dual-corded equipment</strong> does not need an STS — the PSU is connected directly to both paths. For <strong>single-corded equipment</strong> an STS is mandatory to achieve the same redundancy level.
      </p>

      <h2 id="dual-ups-architecture" style={S.h2}>Dual UPS Architecture</h2>

      <p style={S.p}>
        In a dual UPS architecture, two completely independent <TopicLink slug="ups" variant="inline" /> systems operate — each with its own rectifiers, inverters, batteries and input feeds. This is the foundation of Tier IV.
      </p>

      <p style={S.p}>
        In this architecture the STS works as a &quot;bridge&quot; for single-corded loads — it gives them protection from both UPS outputs even though they support only one input.
      </p>

      <ComparisonTable
        headers={["Component", "Path A", "Path B"]}
        rows={[
          ["Utility input", "Feeder A — independent transformer", "Feeder B — independent transformer"],
          ["UPS", "UPS-A (complete independent system)", "UPS-B (complete independent system)"],
          ["Battery", "Battery Bank A", "Battery Bank B"],
          ["Distribution", "PDU-A", "PDU-B"],
          ["Dual-corded loads", "PSU1 ← PDU-A", "PSU2 ← PDU-B"],
          ["Single-corded loads", "STS Input A ← PDU-A", "STS Input B ← PDU-B → STS Output → Load"],
        ]}
      />

      <h2 id="ab-power-distribution" style={S.h2}>A & B Power Distribution</h2>

      <p style={S.p}>
        In A & B power distribution, both PDU-A and PDU-B outlets are available on every rack on the floor. Dual-corded servers connect directly to both. For single-corded servers, an STS is installed in the rack.
      </p>

      <p style={S.p}>
        Ensure load balancing: if Source A is preferred on all STS and UPS-B is only on standby, UPS-B can be underutilized and UPS-A overloaded. Assign alternate source priority in different racks for balanced loading.
      </p>

      <Callout type="important" title="A/B Path Capacity Planning">
        Each UPS (A and B) must be capable of handling the full site load — not just its own half. Because on one UPS failure, the other UPS will take the whole load. Include the STS load too in this calculation — on an STS failure or transfer event, one UPS will momentarily carry extra load.
      </Callout>
    </>
  );
}
