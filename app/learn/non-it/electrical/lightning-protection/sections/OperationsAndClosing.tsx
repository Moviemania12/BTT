"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import LightningCurrentFlowDiagram from "../svg/LightningCurrentFlowDiagram";

export default function OperationsAndClosing() {
  return (
    <>
      <h2 id="external-lps" style={S.h2}>External LPS</h2>
      <p style={S.p}><strong>Quick Summary:</strong> The External LPS protects the structure from a direct strike — Air Termination, Down Conductor and Earth Termination all three together.</p>
      <p style={S.p}>The whole purpose of the External LPS: to take lightning current from outside the structure, through a controlled path, safely to the ground — without damaging the building fabric or equipment. It is purely structural protection; equipment-level protection is the job of the SPD (Internal LPS).</p>
      <p style={S.p}><strong>Key Takeaway:</strong> External LPS = defense against the physical strike; it does not protect equipment directly — that is the role of the Internal LPS.</p>

      <h2 id="internal-lps" style={S.h2}>Internal LPS</h2>
      <p style={S.p}><strong>Quick Summary:</strong> The Internal LPS protects equipment from surges — SPDs, bonding and shielding are all included. It is critical for Data Center equipment survival.</p>
      <p style={S.p}>Internal LPS components: SPD (Type 1/2/3), equipotential bonding, and cable shielding/separation (adequate spacing between power and data cables, so that induced coupling is minimized). In modern Data Center design the Internal LPS often gives more practical value than the External LPS — because induced surges are more common.</p>

      <h2 id="equipotential-bonding" style={S.h2}>Equipotential Bonding</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Equipotential bonding brings all metallic systems (structural steel, cable trays, pipes, LPS, earthing) to the same electrical potential — it prevents dangerous voltage differences during a lightning event.</p>
      <Callout type="important" title="Bonding Bar — Single Reference Point">
        In a Data Center, a Main Bonding Bar (typically near the main LV panel) is the common reference point — all systems (LPS earth, equipment earth, cable tray, structural steel) are bonded here. This is the practical implementation of IEC 62305 and the equipotential bonding philosophy.
      </Callout>
      <p style={S.p}><strong>Key Takeaway:</strong> Equipotential bonding is the "glue" of lightning protection — it connects the individual systems (LPS, earthing, structural) into one coherent, safe network.</p>

      <h2 id="lps-vs-earthing" style={S.h2}>Lightning Protection vs Earthing</h2>
      <ComparisonTable
        headers={["Aspect", "Lightning Protection (LPS)", "General Earthing"]}
        rows={[
          ["Purpose", "High-current, short-duration lightning discharge", "Normal fault current, operational safety"],
          ["Current magnitude", "Up to 200 kA", "Typically hundreds of amperes (fault current)"],
          ["Duration", "Microseconds", "Can be sustained until breaker trips"],
          ["Design standard", "IEC 62305", "IS 3043 / IEC 60364"],
          ["Relationship", "Bonded to common earthing, but function-specific path", "Foundation that LPS bonds into"],
        ]}
      />
      <p style={S.p}>Both systems are ultimately bonded at a common reference point, but their design and purpose are distinctly different. Complete coverage is in the <TopicLink slug="earthing" variant="inline" /> article.</p>

      <h2 id="lps-vs-surge" style={S.h2}>Lightning Protection vs Surge Protection</h2>
      <ComparisonTable
        headers={["Aspect", "Lightning Protection (LPS)", "Surge Protection (SPD)"]}
        rows={[
          ["Protects against", "Direct strike current on structure", "Transient overvoltage on electrical circuits"],
          ["Physical location", "Roof, exterior, down conductors", "Panels, UPS input, PDU, rack level"],
          ["Trigger", "Direct strike interception", "Any voltage transient — direct or induced"],
          ["Equipment protection?", "Indirect — protects structure primarily", "Direct — protects connected electrical equipment"],
          ["Standard", "IEC 62305", "IEC 61643"],
        ]}
      />
      <Callout type="interview" title="Interview Tip">
        Common question: &quot;If the building has an LPS, why is an SPD needed?&quot; Answer: the LPS only diverts direct strike current away from the structure — it does not protect electrical circuits from induced surges. The SPD specifically protects electrical equipment from surge voltage, whether the source of the surge is a direct strike or is induced by a strike somewhere nearby. The two are complementary, not substitutes for each other.
      </Callout>

      <h2 id="inspection-maintenance" style={S.h2}>Inspection & Maintenance</h2>
      <ComparisonTable
        headers={["Frequency", "Tasks"]}
        rows={[
          ["Monthly", "Visual SPD health indicator check, visible damage inspection at air termination"],
          ["Quarterly", "Down conductor visual check — corrosion, physical damage, secure mounting"],
          ["Annual", "Complete earth resistance test, continuity test on all down conductors, SPD replacement per manufacturer schedule"],
          ["Post-event", "Full inspection after any significant lightning event — even if system appeared to function correctly"],
        ]}
      />
      <Callout type="maintenance" title="Maintenance Tip — SPD Has a Finite Life">
        An SPD is not an infinite-life component — every significant surge event degrades the internal varistor. Follow the manufacturer-specified replacement interval, and check the health indicator monthly. A "silently failed" SPD (visually normal but internally degraded) means zero protection on the next surge event.
      </Callout>

      <h2 id="common-failures" style={S.h2}>Common Failures</h2>
      <ComparisonTable
        headers={["Failure", "Symptoms", "Root Cause", "Corrective Action"]}
        rows={[
          ["SPD end-of-life", "Health indicator shows red/fault", "Absorbed significant surge, internal component degraded", "Replace immediately per manufacturer spec"],
          ["Down conductor corrosion", "High resistance on continuity test", "Weathering, dissimilar metal contact, age", "Clean/replace affected section"],
          ["Loose air termination connection", "Visual looseness, high resistance", "Vibration, inadequate initial torque", "Re-secure, re-torque, verify continuity"],
          ["Missing bonding connection", "Potential difference between systems", "Incomplete installation, later modification without re-bonding", "Full bonding audit, restore missing connections"],
          ["Earth resistance drift", "Annual test shows increasing resistance", "Soil drying, electrode degradation", "Same remediation as general earthing — water pit, add electrodes"],
        ]}
      />

      <h2 id="testing" style={S.h2}>Testing</h2>
      <Figure caption="Fig 3 — Lightning Current Flow: Strike → Air Termination → Down Conductor → Earth Termination, with induced surge branching to SPD protection path.">
        <LightningCurrentFlowDiagram />
      </Figure>
      <p style={S.p}><strong>Visual Inspection:</strong> Physically check the air termination, down conductors and connections — corrosion, physical damage, secure mounting. This is the most basic but most frequently skipped test.</p>
      <p style={S.p}><strong>Earth Resistance:</strong> Measure the resistance of the LPS earth termination — the same 3-pole/clamp methods used in general earthing testing. Target is typically &lt;10Ω for LPS earth (the specific value depends on the project design).</p>
      <p style={S.p}><strong>Continuity Testing:</strong> From the down conductor to the earth termination, and the bonding connections — verify all continuity with a micro-ohmmeter. A break or high resistance = a compromised protection path.</p>
      <p style={S.p}><strong>SPD Health Indication:</strong> Check the visual indicator window (green/red) or the remote signaling contact. Some modern SPDs also offer BMS integration for automated alerting.</p>

      <h2 id="required-instruments" style={S.h2}>Required Instruments</h2>
      <ComparisonTable
        headers={["Instrument", "Purpose", "LPS-Specific Use"]}
        rows={[
          ["Earth Tester", "Earth resistance measurement", "LPS earth termination resistance verification"],
          ["Clamp Meter", "Non-invasive current/resistance measurement", "Quick routine checks without disconnection"],
          ["Multimeter", "Voltage, continuity, basic checks", "SPD voltage checks, quick continuity verification"],
          ["Insulation Tester (Megger)", "Insulation resistance measurement", "Cable insulation verification after suspected surge damage"],
        ]}
      />

      <h2 id="oems" style={S.h2}>OEMs</h2>
      <ComparisonTable
        headers={["OEM", "Known For"]}
        rows={[
          ["OBO Bettermann", "Comprehensive LPS + bonding components, strong European standard compliance"],
          ["DEHN", "Premium SPD and LPS systems — industry reference brand for surge protection"],
          ["Phoenix Contact", "SPD, industrial surge protection, strong DIN rail product range"],
          ["Schneider Electric", "SPD integrated with distribution products, wide availability"],
          ["ABB", "SPD and protection devices, strong industrial/utility presence"],
          ["LPI (Lightning Protection International)", "Specialist LPS design and installation"],
          ["nVent ERICO", "Air termination, down conductor components, earthing/bonding products"],
        ]}
      />
      <Callout type="important" title="OEM Disclaimer">
        These are general industry observations based on publicly available information. Specifications, pricing and India support change frequently. Before finalizing any vendor, verify directly with current datasheets and the India sales team.
      </Callout>

      <h2 id="standards" style={S.h2}>Relevant Standards</h2>
      <ComparisonTable
        headers={["Standard", "Scope"]}
        rows={[
          ["IEC 62305 (Parts 1-4)", "Comprehensive lightning protection — risk management, LPS design, SPD, internal systems"],
          ["IEC 61643", "Surge protective devices — low voltage systems"],
          ["IEEE 998", "Guide for direct lightning stroke shielding of substations"],
          ["NFPA 780", "US standard for installation of lightning protection systems"],
          ["IS 2309", "Indian standard — code of practice for protection of buildings against lightning"],
        ]}
      />
      <p style={S.p}>In India, IS 2309 is the baseline reference, but IEC 62305 is more comprehensive and is typically preferred for international projects/clients. Modern Indian Data Center projects often follow IEC 62305 even when IS 2309 remains the reference for baseline compliance.</p>

      <h2 id="real-dc-example" style={S.h2}>Real Data Center Example</h2>
      <Callout type="important" title="Real Data Center Example — Nearby Strike Protection Chain in Action">
        A lightning strike hit within a 300m radius of a Data Center. Sequence: the Air Terminal protected the nearby structure (no direct hit on this building), but an induced surge entered the facility through the power grid line. The Type 1 SPD (at the main incoming) absorbed the primary surge. The residual surge reached the Type 2 SPD (at the UPS input) and was further attenuated. A small residual voltage reached the Type 3 SPD (rack level) and was completely absorbed. Result: zero equipment damage, zero downtime — all servers continued in normal operation.
      </Callout>
      <p style={S.p}>This example demonstrates exactly how a coordinated LPS + SPD design works: <strong>Air Terminal → Down Conductor → Earthing → SPD (cascade) → UPS → Server</strong> — every layer progressively attenuates the surge until the residual voltage reaching the equipment is within a safe threshold.</p>

      <h2 id="interview-questions" style={S.h2}>Common Interview Questions</h2>
      <ul style={S.ul}>
        <li>What are the three main components of an LPS and what is the function of each?</li>
        <li>What is the difference between a direct strike and an induced surge, and why are their defense mechanisms different?</li>
        <li>What is the difference between SPD Type 1, 2 and 3, and where are they installed?</li>
        <li>What do the 4 Protection Levels (LPL) of IEC 62305 represent?</li>
        <li>Why is equipotential bonding critical in lightning protection?</li>
        <li>What is the difference between External LPS and Internal LPS?</li>
        <li>Are Lightning Protection and Earthing the same thing? Explain the relationship.</li>
        <li>How do you verify SPD health in the field?</li>
        <li>Why are sharp bends avoided in down conductor routing?</li>
        <li>Does every Data Center need LPL I? How is the decision taken?</li>
      </ul>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li><strong>An LPS does not stop lightning — it provides a controlled path</strong> to safely divert the current to the ground.</li>
        <li><strong>There are three core components</strong> — Air Termination, Down Conductor, Earth Termination — they make up the External LPS.</li>
        <li><strong>Induced surges are more common than direct strikes</strong> in Data Centers — that is why the SPD is equally critical.</li>
        <li><strong>SPD Type 1/2/3 work in a cascade design</strong> — progressive protection from the Grid to the Rack.</li>
        <li><strong>IEC 62305 LPL I/II is typically recommended for Data Centers</strong> — because of the high consequence of failure.</li>
        <li><strong>Equipotential bonding prevents side flash risk</strong> — it keeps all metallic systems at the same potential.</li>
        <li><strong>LPS and SPD are complementary, not substitutes</strong> — both are necessary for complete protection.</li>
        <li><strong>An SPD has a finite life</strong> — check the health indicator regularly, especially after a surge event.</li>
        <li><strong>Annual earth resistance and continuity testing are mandatory</strong> — the only reliable way to verify LPS effectiveness.</li>
        <li><strong>Actual design is project-specific</strong> — risk assessment, building geometry and local lightning data all shape the final LPL and design.</li>
      </ul>
      <p style={S.p}>The natural next step after Lightning Protection is complete coverage of <TopicLink slug="earthing" variant="inline" /> — an LPS does not work meaningfully without earthing. To understand the power chain, see the <TopicLink slug="ups" variant="inline" />, <TopicLink slug="battery-bank" variant="inline" />, <TopicLink slug="sts" variant="inline" /> and <TopicLink slug="pdu" variant="inline" /> articles.</p>
    </>
  );
}
