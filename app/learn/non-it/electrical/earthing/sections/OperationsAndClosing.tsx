"use client";
import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function OperationsAndClosing() {
  return (
    <>
      <h2 id="common-faults" style={S.h2}>Common Faults & Troubleshooting</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Earthing faults mostly develop gradually — corrosion, loosening, moisture loss. They are not detected early unless there is periodic testing.</p>
      <ComparisonTable
        headers={["Fault", "Symptoms", "Root Cause", "Corrective Action"]}
        rows={[
          ["High Earth Resistance", "Test reading above acceptable limit", "Dry soil, corroded electrode, broken strip", "Water pit (seasonal fix), replace electrode, add parallel electrodes"],
          ["Broken Earth Strip", "Continuity test fails, visual damage", "Physical damage, corrosion, theft (copper)", "Replace strip, secure routing, consider tamper-proof clamps"],
          ["Loose Clamp", "Intermittent high resistance, visible looseness", "Vibration, inadequate torque, corrosion", "Clean contact surface, re-torque, apply anti-oxidant compound"],
          ["Corrosion", "Green/white deposits, increased resistance", "Dissimilar metal contact, moisture, chemical soil", "Clean, use compatible materials, protective coating"],
          ["Dry Earth Pit", "Seasonal resistance spike (summer)", "Moisture evaporation, especially conventional plate/rod", "Regular watering schedule, or upgrade to chemical earthing"],
          ["Floating Ground", "Unstable/fluctuating readings", "Broken connection, single point of failure", "Verify entire path continuity, add redundant connection"],
          ["Ground Loop", "Noise on signal cables, hum in audio/data", "Multiple earth paths creating circulating current", "Single-point bonding design, isolate signal grounds properly"],
          ["Neutral Mixing", "Neutral-Earth voltage abnormally high", "Neutral and earth connected at multiple points", "Verify single N-E bond point only (at source), remove extras"],
          ["Multiple N-E Bonds", "Circulating currents, nuisance RCD trips", "Downstream panels re-bonding N to E", "Audit entire system, remove all but the one authorized bond point"],
          ["Noise Ground", "BMS/communication errors, data corruption", "Poor clean earth isolation, shared dirty earth path", "Separate clean earth path, single-point bond only"],
        ]}
      />
      <Callout type="danger" title="Danger — Multiple Neutral-Earth Bonds">
        This is the most common and dangerous mistake — if the neutral is bonded to earth at multiple locations (anywhere other than the source), normal load current also starts flowing through the earth conductor. This creates RCD/ELCB false tripping, voltage on equipment bodies and fire risk. According to IS 3043, the neutral-earth bond should be at only one place (source/transformer).
      </Callout>

      <h2 id="maintenance-schedule" style={S.h2}>Maintenance Schedule</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Earthing maintenance is defined at 6 frequency levels — from a daily visual check to annual comprehensive testing.</p>
      <ComparisonTable
        headers={["Frequency", "Tasks"]}
        rows={[
          ["Daily", "Visual check — earth bar connections, any visible damage, BMS earth alarm status"],
          ["Weekly", "Earth chamber covers secure, no water logging visible, no obvious corrosion signs"],
          ["Monthly", "Clamp method earth resistance spot-check on critical systems (UPS, Battery Bank)"],
          ["Quarterly", "Full continuity test on rack bonding, cable tray sections, panel connections"],
          ["Half-Yearly", "Earth pit watering (conventional type), visual inspection of all accessible strips/clamps"],
          ["Annual", "Complete 3-pole fall of potential test on all earth pits, full documentation update, soil resistivity re-check"],
        ]}
      />
      <Callout type="maintenance" title="Maintenance Tip — Document Every Reading">
        Document every earth resistance reading with the date, ambient condition (dry/wet season) and instrument used. Trending is more valuable than a single reading — gradually increasing resistance over years indicates degrading earth pit before it becomes a compliance failure.
      </Callout>

      <h2 id="rack-server-earthing" style={S.h2}>Rack & Server Earthing</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Server rack earthing happens in multiple layers — the rack frame, rail, PDU body and individual server chassis should all be bonded to a common reference.</p>
      <ComparisonTable
        headers={["Component", "Earthing Requirement", "Common Mistake"]}
        rows={[
          ["Rack frame", "Bonded to building earth grid via dedicated conductor", "Painted rack surface preventing good contact — use star washers"],
          ["Rack rails", "Bonded to rack frame — often assumed, not verified", "Rails powder-coated, no continuity to frame — must be explicitly bonded"],
          ["PDU body", "Direct earth connection at input", "PDU relying only on rack frame contact — verify with continuity test"],
          ["Server chassis", "Earthed via PSU earth pin/plug", "Using non-earthed extension or converter plug — never do this"],
          ["Cable tray above rack", "Continuous bonding along entire tray run", "Tray sections joined but not electrically bonded across joints"],
        ]}
      />
      <Callout type="important" title="Real Data Center Example — Server Grounding Issue">
        In one Data Center, intermittent network errors were reported from a specific rack. The investigation found the rack rails were powder-coated and not properly bonded to the frame — there was only mechanical mounting contact, not electrical continuity. Static charge was accumulating and occasionally discharging through network cable shields, causing errors. Fix: explicit bonding jumper rail-to-frame, verified with a continuity test.
      </Callout>

      <h2 id="battery-room-earthing" style={S.h2}>Battery Room Earthing</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Earthing is especially critical in the <TopicLink slug="battery-bank" variant="inline" /> room — DC systems, high fault current potential and an explosive gas environment (H₂) are all factors.</p>
      <p style={S.p}>The battery rack frame should be earthed, but the DC bus itself is typically kept floating (unearthed) with an Earth Fault Monitor (EFM) — it monitors insulation resistance without being directly bonded to earth.</p>
      <Callout type="important" title="Real Data Center Example — Battery Room Ground Fault">
        An EFM alarm triggered in a battery bank — insulation resistance dropped below the expected value. The investigation found that a battery terminal had made accidental contact with the rack frame (loose cable). This was a genuine ground fault — if it had stayed undetected, a second fault (somewhere else) could have created a short circuit through the chassis. The EFM achieved exactly this design intent — early detection without an automatic disconnect (which would be disruptive in a battery bank).
      </Callout>

      <h2 id="oem-instruments" style={S.h2}>OEM Instruments</h2>
      <p style={S.p}><strong>Quick Summary:</strong> There are established global and India-relevant brands of earth testing instruments — consider both accuracy and India service support when selecting.</p>
      <ComparisonTable
        headers={["OEM", "Known For", "India Presence"]}
        rows={[
          ["Megger", "Insulation testers, earth testers — industry standard name", "Excellent — widely available"],
          ["Fluke", "Multimeters, clamp meters, power quality analyzers", "Excellent — strong distribution"],
          ["Hioki", "Precision clamp meters, earth testers", "Good — growing presence"],
          ["Kyoritsu", "Earth testers, clamp meters — Japanese precision", "Good — established in India"],
          ["Motwane", "Earth testers — India-manufactured, cost-effective", "Excellent — Indian brand, wide service network"],
          ["Chauvin Arnoux", "Power quality analyzers, earth testers", "Moderate — specialist distributors"],
          ["Omicron", "Advanced protection testing, high-end power quality", "Limited — specialist/utility segment"],
        ]}
      />

      <h2 id="standards" style={S.h2}>Standards & References</h2>
      <ComparisonTable
        headers={["Standard", "Body", "Scope"]}
        rows={[
          ["IS 3043", "BIS (India)", "Code of practice for earthing — primary Indian reference"],
          ["IEC 61000-5-2", "IEC", "EMC earthing and cabling for information technology systems"],
          ["IEEE 80", "IEEE", "Guide for safety in AC substation grounding — touch/step voltage"],
          ["TIA-942", "TIA", "Data Center infrastructure standard — includes grounding requirements"],
          ["NFPA 70 (NEC)", "NFPA", "US National Electrical Code — grounding requirements"],
          ["NEC (India)", "CEA", "National Electrical Code India — general wiring/earthing rules"],
        ]}
      />
      <p style={S.p}>In India, IS 3043 is the primary reference. TIA-942 gives Data Center-specific guidance that is relevant for international clients/audits. IEEE 80 is particularly important when doing touch/step voltage analysis of high fault current areas (substation-adjacent, large transformer yards).</p>

      <h2 id="comparison-tables" style={S.h2}>Comparison Tables</h2>
      <ComparisonTable
        headers={["Comparison", "Option A", "Option B", "Recommendation"]}
        rows={[
          ["Copper vs GI Strip", "Copper — better conductivity, corrosion resistant, costly", "GI — cheaper, corrodes faster, needs more maintenance", "Copper for critical Data Center systems"],
          ["Plate vs Rod Earthing", "Plate — larger surface area, more excavation", "Rod — compact, deeper moisture access, easier install", "Rod/chemical for modern space-constrained sites"],
          ["Chemical vs Conventional", "Chemical — stable, low maintenance, costly upfront", "Conventional — cheaper, needs regular watering", "Chemical recommended for Tier III/IV"],
          ["Clamp Tester vs Earth Tester", "Clamp — fast, non-invasive, needs parallel paths", "3-pole — accurate, disconnection needed, space needed", "3-pole for annual verification, clamp for routine checks"],
          ["Megger vs Earth Tester", "Megger — insulation resistance (MΩ range)", "Earth tester — earth resistance (Ω range)", "Both needed — measure different things entirely"],
          ["3 Pole vs Clamp Method", "3-pole — reference/most accurate method", "Clamp — convenient, good for trending", "Use 3-pole for baseline, clamp for ongoing monitoring"],
        ]}
      />

      <h2 id="real-dc-examples" style={S.h2}>Real Data Center Examples</h2>
      <ComparisonTable
        headers={["Scenario", "Symptoms", "Root Cause", "Corrective Action"]}
        rows={[
          ["Poor Earth Resistance", "Annual test shows 8Ω vs 1Ω target", "Dry season, degraded electrode over years", "Chemical compound refresh, additional parallel electrode"],
          ["Loose Earth Strip", "Continuity test intermittent fail", "Vibration from adjacent HVAC equipment", "Re-torque, add vibration-resistant clamp"],
          ["UPS Earth Alarm", "UPS display shows ground fault alarm", "Insulation degradation in output cable", "Megger test cable, replace if below threshold"],
          ["Battery Room Ground Fault", "EFM alarm active", "Loose cable touching rack frame", "Isolate, repair connection, re-verify insulation"],
          ["BMS Earth Alarm", "BMS panel showing persistent earth fault flag", "Sensor cable shield improperly grounded at both ends", "Single-end ground shield per BMS design guidance"],
          ["SPD Failure", "Surge protector indicator shows fault/end-of-life", "Absorbed a significant surge event, or poor earth path limited effectiveness", "Replace SPD module, verify earth resistance is within spec"],
          ["Lightning Event", "Post-storm: intermittent electronics issues", "Induced transient through inadequate bonding", "Full earthing/bonding audit, verify lightning earth separate but bonded"],
          ["Rack Earthing Failure", "New rack installed, intermittent server resets", "Rack not bonded, relying only on floor tile contact", "Explicit dedicated earth conductor to rack frame"],
          ["Noise on Communication Cable", "Data errors, retransmissions on specific link", "Ground loop — cable shield earthed at both ends", "Earth shield at one end only per signal earthing practice"],
        ]}
      />

      <h2 id="tier-iii-iv-earthing" style={S.h2}>Tier III & Tier IV Earthing Design</h2>
      <ComparisonTable
        headers={["Aspect", "Tier III", "Tier IV"]}
        rows={[
          ["Earth grid", "Single grid, well-designed and tested", "Redundant grid paths, physically diverse routing where feasible"],
          ["Testing frequency", "Annual comprehensive + quarterly spot-check", "Same, with more rigorous documentation and audit trail"],
          ["Concurrent maintainability", "Earth system testable without shutdown", "Fully fault-tolerant — no single earthing fault impacts operations"],
          ["Documentation", "Standard test records", "Comprehensive — often required for compliance/insurance audits"],
          ["Redundant bonding paths", "Recommended for critical systems", "Mandatory — 2N philosophy extends to earthing where practical"],
        ]}
      />
      <p style={S.p}>Actual implementation always depends on project requirements, utility requirements, OEM design and Data Center architecture — there is no single universal earthing design for all Tier III/IV facilities.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li><strong>Earthing is a safety-critical system, not a compliance checkbox</strong> — both personnel life and equipment depend directly on its quality.</li>
        <li><strong>Earthing and Grounding are the same concept</strong> — it is a regional terminology difference (India/IEC vs US/NEC).</li>
        <li><strong>Equipotential bonding is the core philosophy</strong> — all systems should be bonded to a common reference point to minimize potential difference.</li>
        <li><strong>Chemical/Maintenance-Free Earthing is recommended for Tier III/IV</strong> — stable resistance, low long-term maintenance.</li>
        <li><strong>3-pole (Fall of Potential) is the most accurate testing method</strong> — use it for annual baseline testing; the clamp method for routine monitoring.</li>
        <li><strong>The Neutral-Earth bond should be at only one place</strong> — multiple bonds create circulating current and nuisance trips.</li>
        <li><strong>Keep clean earth and dirty earth separate</strong> — a noise-free path is essential for sensitive electronics (BMS, communication).</li>
        <li><strong>&lt;1Ω is the target for Data Center critical systems</strong> — UPS, Battery Bank and server rack earthing.</li>
        <li><strong>Ground loops are a silent cause of communication errors</strong> — do not earth the cable shield at both ends.</li>
        <li><strong>Actual implementation is project-specific</strong> — soil resistivity, Tier level and OEM requirements all shape the final design.</li>
      </ul>
      <p style={S.p}>Natural next steps after earthing: complete coverage of <TopicLink slug="lightning-protection" variant="inline" />, or transformer-side neutral earthing detail in the <TopicLink slug="transformer" variant="inline" /> article.</p>
      <p style={S.p}>To understand the power chain, see the <TopicLink slug="ups" variant="inline" />, <TopicLink slug="battery-bank" variant="inline" />, <TopicLink slug="sts" variant="inline" /> and <TopicLink slug="pdu" variant="inline" /> articles — earthing provides the underlying safety layer for all of them.</p>
    </>
  );
}
