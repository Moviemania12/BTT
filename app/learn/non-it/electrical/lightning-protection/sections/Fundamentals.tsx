"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import LpsArchitectureDiagram from "../svg/LpsArchitectureDiagram";
import SpdInstallationDiagram from "../svg/SpdInstallationDiagram";

export default function Fundamentals() {
  return (
    <>
      <h2 id="what-is-lps" style={S.h2}>What is Lightning Protection System (LPS)?</h2>
      <p style={S.p}><strong>Quick Summary:</strong> An LPS is an engineered system that safely diverts lightning current from outside the building to the ground, without damaging the structure or equipment. Three core components: Air Termination, Down Conductor and Earth Termination.</p>
      <ul style={S.ul}>
        <li>An LPS gives lightning current a controlled, low-impedance path</li>
        <li>Both External LPS (structure protection) + Internal LPS (equipment protection) are needed</li>
        <li>It is not a standalone system — it is bonded to the building earthing</li>
        <li>In a Data Center, LPS + SPD together give complete protection</li>
      </ul>
      <p style={S.p}><strong>Engineer Tip:</strong> "An LPS stops lightning" — this is a misconception. An LPS cannot stop lightning; it only provides a controlled path so that the current does not go through the building/equipment in an uncontrolled way. It is risk management, not elimination.</p>
      <p style={S.p}>Technically an LPS is divided into three main parts — Air Termination (intercepts the strike), Down Conductor (carries the current to the ground) and Earth Termination (dissipates the current into the soil). The combination of these three makes the External LPS. The Internal LPS has SPDs and bonding that protect equipment from surges.</p>
      <Callout type="important" title="LPS Alone is Not Enough">
        An LPS only handles direct strike current. Induced surges from nearby lightning — which are more common in Data Centers — are not handled by the LPS alone. The SPD (Surge Protection Device) fills this gap. Both are needed for complete protection.
      </Callout>

      <h2 id="why-dc-needs-lps" style={S.h2}>Why Data Centers Need Lightning Protection</h2>
      <p style={S.p}><strong>Quick Summary:</strong> In a Data Center, both equipment cost and downtime cost are so high that even a single lightning event can create a catastrophic financial impact. LPS investment is insurance against this.</p>
      <ComparisonTable
        headers={["Risk Without LPS", "Consequence"]}
        rows={[
          ["Direct strike on building", "Structural damage, fire risk, complete equipment loss in strike path"],
          ["Induced surge on power lines", "UPS, PDU, server PSU damage — simultaneous multi-device failure"],
          ["Induced surge on data/comm lines", "Network equipment damage, BMS/DCIM controller failure"],
          ["Ground potential rise", "Touch voltage hazard for personnel, equipment chassis damage"],
          ["No coordinated protection", "Single point of failure — one surge event takes down entire facility"],
        ]}
      />
      <p style={S.p}><strong>Real Data Center Example:</strong> A Data Center without proper SPD coordination — a nearby lightning strike hit 200m away from the building. The induced surge came in through the power line; there was no Type 1 SPD at the main incoming, and the surge reached the UPS rectifier directly. Result: UPS rectifier module damage, and 3 downstream connected PDUs were also affected. Estimated loss: equipment replacement + almost 6 hours of downtime.</p>
      <p style={S.p}><strong>Key Takeaway:</strong> A Data Center's risk profile is different from a normal commercial building — both equipment sensitivity and downtime cost easily justify LPS investment.</p>

      <h2 id="direct-vs-induced" style={S.h2}>Direct Strike vs Induced Surge</h2>
      <p style={S.p}><strong>Quick Summary:</strong> A direct strike actually hits the building — rare but catastrophic. An induced surge comes from a nearby strike through electromagnetic coupling — common and underestimated.</p>
      <ComparisonTable
        headers={["Parameter", "Direct Strike", "Induced Surge"]}
        rows={[
          ["Frequency", "Rare — depends on building height, location", "Common — even strikes several km away"],
          ["Current magnitude", "Very high — up to 200 kA", "Lower — but still damaging (kV range induced voltage)"],
          ["Primary defense", "Air termination + down conductor", "SPD (Surge Protection Device)"],
          ["Damage path", "Physical structure, direct contact equipment", "Power lines, data/comm cables, any long conductor"],
          ["Detection difficulty", "Obvious — visible damage often", "Subtle — may cause gradual component degradation"],
        ]}
      />
      <Callout type="warning" title="Common Mistake — Underestimating Induced Surge">
        Engineers often focus on LPS design (visible, structural) but treat SPD coordination as secondary. In reality, more Data Center equipment damage comes from induced surges, not direct strikes. SPD design deserves equal, if not more, priority.
      </Callout>

      <h2 id="risk-assessment" style={S.h2}>Lightning Risk Assessment</h2>
      <p style={S.p}><strong>Quick Summary:</strong> IEC 62305-2 gives a formal risk assessment methodology — it determines the required protection level by factoring in building location, height, lightning flash density and the consequence of failure.</p>
      <p style={S.p}>Risk assessment factors: (1) Ground flash density (strikes/km²/year — location-specific data), (2) Structure dimensions and height, (3) Type of construction, (4) Value of contents and consequence of loss, (5) Presence of existing protection measures.</p>
      <Callout type="best-practice" title="Best Practice — Formal Risk Assessment Document">
        Create a formal IEC 62305-2 risk assessment document for every Data Center project — it is not just a technical exercise; it is also necessary for insurance and compliance documentation. The assessment output directly determines the LPL (Protection Level), which drives the rest of the whole LPS design.
      </Callout>

      <h2 id="protection-levels" style={S.h2}>IEC 62305 Protection Levels (LPL I–IV)</h2>
      <p style={S.p}><strong>Quick Summary:</strong> 4 protection levels — LPL I is the most comprehensive (highest risk/consequence), LPL IV the most basic. The level directly affects design parameters (mesh size, down conductor spacing).</p>
      <ComparisonTable
        headers={["LPL", "Interception Efficiency", "Down Conductor Spacing", "Mesh Size", "Typical Application"]}
        rows={[
          ["LPL I", "99%", "10 m", "5m × 5m", "High-risk, Tier IV Data Centers, critical infrastructure"],
          ["LPL II", "97%", "10 m", "10m × 10m", "Tier III Data Centers, commercial critical facilities"],
          ["LPL III", "91%", "15 m", "15m × 15m", "General commercial buildings, Tier I/II"],
          ["LPL IV", "84%", "25 m", "20m × 20m", "Low-risk structures"],
        ]}
      />
      <p style={S.p}>Data Centers typically design for LPL I or LPL II — the consequence of failure (data loss, extended downtime, reputational damage) is so high that the risk of lower protection levels is not acceptable.</p>

      <h2 id="air-termination" style={S.h2}>Air Termination</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Air termination intercepts lightning before it reaches the structure. Three main types — Franklin Rod, Mesh and Early Streamer Emission — each follows a different coverage philosophy.</p>
      <ComparisonTable
        headers={["Type", "Description", "Coverage", "Data Center Use"]}
        rows={[
          ["Franklin Rod", "Vertical pointed rod, rolling sphere method coverage", "Point protection — specific high points", "Corners, edges, equipment on roof (chillers, antennas)"],
          ["Mesh (Faraday Cage)", "Conductor grid across entire roof surface", "Wide area, uniform coverage", "Standard for Data Center roofs — most common approach"],
          ["Early Streamer Emission (ESE)", "Claims larger protection radius via early ionization", "Larger radius claimed by manufacturer", "Controversial — not IEC 62305 certified in many countries, use with caution"],
        ]}
      />
      <Callout type="important" title="Important — Mesh + Franklin Rod Combination">
        Data Center roofs typically use a Mesh system for overall coverage, plus Franklin rods at strategic high points (rooftop equipment, parapets, corners). This combination gives comprehensive coverage as per the IEC 62305 rolling sphere method. ESE rods are generally avoided in the India/IEC context unless there is specific local approval.
      </Callout>

      <h2 id="down-conductors" style={S.h2}>Down Conductors</h2>
      <p style={S.p}><strong>Quick Summary:</strong> The down conductor safely conducts the current intercepted by the air termination to the earth termination. A minimum of 2 conductors is mandatory — for redundancy.</p>
      <ComparisonTable
        headers={["Parameter", "Requirement", "Note"]}
        rows={[
          ["Minimum count", "2 per structure", "To avoid a single point of failure"],
          ["Spacing (LPL I)", "10m along perimeter", "Evenly distributed around the building perimeter"],
          ["Material", "Copper or aluminum tape/rod, typically 25×3mm or 50mm² equivalent", "Corrosion resistance is essential"],
          ["Routing", "Shortest, straightest path possible", "Sharp bends increase inductance and reduce effectiveness"],
          ["Test joint", "Accessible test joint at each down conductor base", "Disconnection point for earth resistance testing"],
        ]}
      />
      <Callout type="common-mistake" title="Common Mistake — Sharp Bends in Down Conductor">
        Avoid sharp 90° bends in down conductor routing — they create a high impedance point for lightning current, which increases side flash risk. The bend radius should be at least 20cm, and the bend angle should be more open than 90° wherever possible.
      </Callout>

      <h2 id="earth-termination" style={S.h2}>Earth Termination</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Earth termination safely dissipates lightning current into the soil. It is an LPS-specific earth termination — but it is ultimately bonded to the building's common earthing through equipotential bonding.</p>
      <p style={S.p}>Earth termination design considerations follow the same principles covered in detail in the <TopicLink slug="earthing" variant="inline" /> article — low resistance, soil resistivity consideration and proper electrode selection. The only difference is that the LPS earth termination has to handle much more current (kA range) in a much shorter duration.</p>
      <Callout type="best-practice" title="Best Practice — Ring Earth Electrode">
        For a Data Center LPS, a ring earth electrode (a continuous conductor around the building perimeter, connected to multiple electrodes) is the preferred approach. It effectively parallels the earth resistance of multiple down conductors, resulting in lower overall resistance and better current distribution.
      </Callout>

      <h2 id="bonding" style={S.h2}>Bonding</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Bonding electrically connects the different LPS components and the building's metallic systems — it prevents both side flash risk and dangerous potential differences.</p>
      <p style={S.p}>During a lightning event, if the LPS and the building steel/piping are at different potentials, a dangerous side flash (arcing) can happen between them. The bonding conductor eliminates this risk by ensuring all systems stay at the same potential during the event.</p>

      <h2 id="spd" style={S.h2}>Surge Protection Devices (SPD)</h2>
      <p style={S.p}><strong>Quick Summary:</strong> An SPD protects electrical circuits from transient overvoltage — whether the surge comes from a direct strike or is induced. Three types are installed in cascade — giving progressive protection.</p>
      <Figure caption="Fig 2 — SPD Installation: Type 1 at main incoming (grid/transformer side), Type 2 at UPS/distribution, Type 3 at rack level — cascaded protection.">
        <SpdInstallationDiagram />
      </Figure>
      <ComparisonTable
        headers={["SPD Type", "Purpose", "Typical Location", "Energy Handling"]}
        rows={[
          ["Type 1", "Direct/partial lightning current diversion", "Main incoming supply (LV panel, transformer secondary side)", "Very high — kA range (10/350μs waveform)"],
          ["Type 2", "Residual surge protection at distribution", "Distribution panels, UPS input, sub-panels", "Medium — kA range (8/20μs waveform)"],
          ["Type 3", "Fine protection for sensitive equipment", "PDU, rack level, near sensitive electronics", "Low — for final equipment-level protection"],
        ]}
      />
      <Callout type="important" title="Important — SPD Coordination is Mandatory">
        Individual SPD types alone do not give complete protection — Type 1, 2 and 3 must be designed in a coordinated cascade. If Type 1 is missed and Type 2 is installed directly at the main incoming, high-energy direct strike current can destroy the Type 2 without adequately protecting downstream.
      </Callout>

      <h2 id="dc-lightning-path" style={S.h2}>Typical Data Center Lightning Path</h2>
      <p style={S.p}><strong>Quick Summary:</strong> The whole power chain from the Grid to the Rack — the appropriate SPD type is installed at every stage for coordinated protection.</p>
      <p style={S.p}>Power chain: Grid → Transformer → RMU (Ring Main Unit) → <TopicLink slug="ups" variant="inline" /> → <TopicLink slug="pdu" variant="inline" /> → Rack. SPD placement: Type 1 at the transformer secondary/RMU incoming, Type 2 at the UPS input and major PDU inputs, Type 3 at the rack PDU output near servers.</p>
      <ComparisonTable
        headers={["Power Chain Stage", "SPD Type", "Reasoning"]}
        rows={[
          ["Grid → Transformer", "Type 1 (at LV side)", "First point of entry — handles high-energy direct/partial strike current"],
          ["Transformer → RMU", "Type 1/2 combination", "Distribution level — still significant residual energy"],
          ["RMU → UPS", "Type 2", "Protects UPS rectifier from residual surge"],
          ["UPS → PDU", "Type 2 (optional Type 3)", "Further attenuation before rack-level distribution"],
          ["PDU → Rack/Server", "Type 3", "Final fine protection for sensitive IT equipment"],
        ]}
      />
    </>
  );
}
