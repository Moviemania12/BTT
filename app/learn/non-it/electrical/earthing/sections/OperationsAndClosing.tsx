"use client";
import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function OperationsAndClosing() {
  return (
    <>
      <h2 id="common-faults" style={S.h2}>Common Faults & Troubleshooting</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Earthing faults zyada tar gradually develop hote hain — corrosion, loosening, moisture loss. Yeh jaldi detect nahi hote jab tak periodic testing na ho.</p>
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
        Yeh sabse common aur dangerous mistake hai — agar neutral ko multiple locations pe earth se bond kiya jaaye (source ke alawa kahi aur bhi), normal load current earth conductor ke through bhi flow karne lagti hai. Yeh RCD/ELCB false tripping, equipment body pe voltage, aur fire risk create karta hai. IS 3043 ke according, neutral-earth bond sirf ek jagah (source/transformer) pe honi chahiye.
      </Callout>

      <h2 id="maintenance-schedule" style={S.h2}>Maintenance Schedule</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Earthing maintenance daily visual check se lekar annual comprehensive testing tak — 6 frequency levels pe defined hai.</p>
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
        Har earth resistance reading date, ambient condition (dry/wet season), aur instrument used ke saath document karo. Trending is more valuable than a single reading — gradually increasing resistance over years indicates degrading earth pit before it becomes a compliance failure.
      </Callout>

      <h2 id="rack-server-earthing" style={S.h2}>Rack & Server Earthing</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Server rack earthing multiple layers mein hoti hai — rack frame, rail, PDU body, aur individual server chassis sab bonded honi chahiye common reference se.</p>
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
        Ek Data Center mein intermittent network errors report hue ek specific rack se. Investigation mein pata chala rack rails powder-coated thi aur frame se properly bonded nahi thi — sirf mechanical mounting contact tha, electrical continuity nahi. Static charge accumulate ho raha tha aur occasionally discharge ho raha tha through network cable shields, causing errors. Fix: explicit bonding jumper rail-to-frame, verified with continuity test.
      </Callout>

      <h2 id="battery-room-earthing" style={S.h2}>Battery Room Earthing</h2>
      <p style={S.p}><strong>Quick Summary:</strong> <TopicLink slug="battery-bank" variant="inline" /> room mein earthing especially critical hai — DC systems, high fault current potential, aur explosive gas environment (H₂) sab factor karte hain.</p>
      <p style={S.p}>Battery rack frame earthed honi chahiye, lekin DC bus itself typically floating (unearthed) rakha jaata hai with an Earth Fault Monitor (EFM) — yeh insulation resistance monitor karta hai bina directly earth se bond kiye.</p>
      <Callout type="important" title="Real Data Center Example — Battery Room Ground Fault">
        Battery bank mein EFM alarm trigger hua — insulation resistance drop hui expected value se neeche. Investigation mein mila ek battery terminal se accidental contact ho gaya tha rack frame se (loose cable). Yeh ek genuine ground fault tha — agar undetected rehta, doosra fault (dusri jagah) short circuit create kar sakta tha through the chassis. EFM ne exactly yeh design intent achieve kiya — early detection bina automatic disconnect (jo battery bank mein disruptive hota) ke.
      </Callout>

      <h2 id="oem-instruments" style={S.h2}>OEM Instruments</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Earth testing instruments ke established global aur India-relevant brands hain — accuracy aur India service support dono consider karo select karte waqt.</p>
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
      <p style={S.p}>India mein IS 3043 primary reference hai. TIA-942 Data Center-specific guidance deta hai jo international clients/audits ke liye relevant hota hai. IEEE 80 particularly important hai jab high fault current areas (substation-adjacent, large transformer yards) ka touch/step voltage analysis karna ho.</p>

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
      <p style={S.p}>Actual implementation hamesha project requirements, utility requirements, OEM design, aur Data Center architecture pe depend karta hai — koi ek universal earthing design nahi hoti sabhi Tier III/IV facilities ke liye.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li><strong>Earthing safety-critical system hai, compliance checkbox nahi</strong> — personnel life aur equipment dono directly depend karte hain iski quality pe.</li>
        <li><strong>Earthing aur Grounding same concept hain</strong> — regional terminology difference hai (India/IEC vs US/NEC).</li>
        <li><strong>Equipotential bonding core philosophy hai</strong> — sab systems ek common reference point se bonded hone chahiye, potential difference minimize karne ke liye.</li>
        <li><strong>Chemical/Maintenance-Free Earthing Tier III/IV ke liye recommended hai</strong> — stable resistance, low long-term maintenance.</li>
        <li><strong>3-pole (Fall of Potential) sabse accurate testing method hai</strong> — annual baseline testing ke liye use karo; clamp method routine monitoring ke liye.</li>
        <li><strong>Neutral-Earth bond sirf ek jagah honi chahiye</strong> — multiple bonds circulating current aur nuisance trips create karte hain.</li>
        <li><strong>Clean earth aur dirty earth alag rakho</strong> — sensitive electronics (BMS, communication) ke liye noise-free path zaroori hai.</li>
        <li><strong>&lt;1Ω target hai Data Center critical systems ke liye</strong> — UPS, Battery Bank, aur server rack earthing.</li>
        <li><strong>Ground loops communication errors ka silent cause hote hain</strong> — cable shield ko dono end pe earth mat karo.</li>
        <li><strong>Actual implementation project-specific hoti hai</strong> — soil resistivity, Tier level, aur OEM requirements sab final design shape karte hain.</li>
      </ul>
      <p style={S.p}>Earthing ke baad natural next steps: <TopicLink slug="lightning-protection" variant="inline" /> ka complete coverage, ya <TopicLink slug="transformer" variant="inline" /> article mein transformer-side neutral earthing detail.</p>
      <p style={S.p}>Power chain samajhne ke liye <TopicLink slug="ups" variant="inline" />, <TopicLink slug="battery-bank" variant="inline" />, <TopicLink slug="sts" variant="inline" /> aur <TopicLink slug="pdu" variant="inline" /> articles dekho — earthing in sabko underlying safety layer provide karti hai.</p>
    </>
  );
}
