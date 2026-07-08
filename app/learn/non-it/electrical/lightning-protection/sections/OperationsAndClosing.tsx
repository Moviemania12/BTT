"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import LightningCurrentFlowDiagram from "../svg/LightningCurrentFlowDiagram";

export default function OperationsAndClosing() {
  return (
    <>
      <h2 id="external-lps" style={S.h2}>External LPS</h2>
      <p style={S.p}><strong>Quick Summary:</strong> External LPS structure ko direct strike se protect karta hai — Air Termination, Down Conductor, aur Earth Termination teeno mila ke.</p>
      <p style={S.p}>External LPS ka poora purpose: lightning current ko structure ke bahar se, controlled path se, ground tak safely le jaana — bina building fabric ya equipment ko damage kiye. Yeh purely structural protection hai, equipment-level protection SPD (Internal LPS) ka kaam hai.</p>
      <p style={S.p}><strong>Key Takeaway:</strong> External LPS = physical strike ka defense; equipment ko yeh directly protect nahi karta — woh Internal LPS ka role hai.</p>

      <h2 id="internal-lps" style={S.h2}>Internal LPS</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Internal LPS equipment ko surge se protect karta hai — SPD, bonding, aur shielding sab included hain. Yeh Data Center equipment survival ke liye critical hai.</p>
      <p style={S.p}>Internal LPS components: SPD (Type 1/2/3), equipotential bonding, aur cable shielding/separation (power aur data cables ke beech adequate spacing, taaki induced coupling minimize ho). Modern Data Center design mein Internal LPS often External LPS se zyada practical value deta hai — kyunki induced surge zyada common hai.</p>

      <h2 id="equipotential-bonding" style={S.h2}>Equipotential Bonding</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Equipotential bonding sab metallic systems (structural steel, cable trays, pipes, LPS, earthing) ko same electrical potential pe laata hai — lightning event ke time dangerous voltage difference prevent karta hai.</p>
      <Callout type="important" title="Bonding Bar — Single Reference Point">
        Data Center mein ek Main Bonding Bar (typically main LV panel ke paas) common reference point hoti hai — sab systems (LPS earth, equipment earth, cable tray, structural steel) yahan bond hote hain. Yeh IEC 62305 aur equipotential bonding philosophy ka practical implementation hai.
      </Callout>
      <p style={S.p}><strong>Key Takeaway:</strong> Equipotential bonding lightning protection ka "glue" hai — individual systems (LPS, earthing, structural) ko ek coherent, safe network mein connect karta hai.</p>

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
      <p style={S.p}>Dono systems ultimately bonded hote hain common reference point pe, lekin design aur purpose distinctly different hain. Complete coverage <TopicLink slug="earthing" variant="inline" /> article mein hai.</p>

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
        Common question: &quot;Agar building mein LPS hai toh SPD ki zaroorat kyun hai?&quot; Answer: LPS sirf direct strike current structure se divert karta hai — yeh electrical circuits ko induced surge se protect nahi karta. SPD specifically electrical equipment ko surge voltage se bachata hai, chahe surge ka source direct strike ho ya kahin nearby ki strike se induced ho. Dono complementary hain, ek doosre ka substitute nahi.
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
        SPD infinite-life component nahi hai — har significant surge event internal varistor ko degrade karta hai. Manufacturer-specified replacement interval follow karo, aur health indicator monthly check karo. Ek "silently failed" SPD (visually normal lekin internally degraded) ka matlab hai next surge event pe zero protection.
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
      <p style={S.p}><strong>Visual Inspection:</strong> Air termination, down conductors, aur connections physically check karo — corrosion, physical damage, secure mounting. Yeh sabse basic lekin most frequently skipped test hai.</p>
      <p style={S.p}><strong>Earth Resistance:</strong> LPS earth termination ka resistance measure karo — same 3-pole/clamp methods jo general earthing testing mein use hote hain. Target typically &lt;10Ω for LPS earth (specific value project design pe depend karta hai).</p>
      <p style={S.p}><strong>Continuity Testing:</strong> Down conductor se earth termination tak, aur bonding connections — sab continuity verify karo micro-ohmmeter se. Break ya high resistance = compromised protection path.</p>
      <p style={S.p}><strong>SPD Health Indication:</strong> Visual indicator window (green/red) ya remote signaling contact check karo. Kuch modern SPDs BMS integration bhi dete hain automated alerting ke liye.</p>

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
        Yeh general industry observations hain based on publicly available information. Specifications, pricing, aur India support frequently change karte hain. Koi bhi vendor finalize karne se pehle current datasheets aur India sales team se directly verify karo.
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
      <p style={S.p}>India mein IS 2309 baseline reference hai, lekin IEC 62305 zyada comprehensive hai aur international projects/clients ke liye typically preferred hota hai. Modern Indian Data Center projects often IEC 62305 follow karte hain even jab IS 2309 baseline compliance ke liye reference rehta hai.</p>

      <h2 id="real-dc-example" style={S.h2}>Real Data Center Example</h2>
      <Callout type="important" title="Real Data Center Example — Nearby Strike Protection Chain in Action">
        Ek Data Center ke 300m radius mein lightning strike hui. Sequence: Air Terminal ne nearby structure protect kiya (koi direct hit nahi is building pe), lekin induced surge power grid line ke through facility mein enter hui. Type 1 SPD (main incoming pe) ne primary surge absorb ki. Residual surge Type 2 SPD (UPS input pe) tak pahunchi aur further attenuate hui. Chhota residual voltage Type 3 SPD (rack level) tak pahuncha aur completely absorb hua. Result: zero equipment damage, zero downtime — sab servers normal operation mein continue rahe.
      </Callout>
      <p style={S.p}>Yeh example exactly demonstrate karta hai ki coordinated LPS + SPD design kaise kaam karta hai: <strong>Air Terminal → Down Conductor → Earthing → SPD (cascade) → UPS → Server</strong> — har layer progressively surge ko attenuate karti hai jab tak equipment tak pahunchne wala residual voltage safe threshold ke andar na ho.</p>

      <h2 id="interview-questions" style={S.h2}>Common Interview Questions</h2>
      <ul style={S.ul}>
        <li>LPS ke teen main components kya hain aur har ek ka function kya hai?</li>
        <li>Direct strike aur induced surge mein kya difference hai, aur dono ke defense mechanisms alag kyun hain?</li>
        <li>SPD Type 1, 2, aur 3 mein kya difference hai aur unhe kahan install karte hain?</li>
        <li>IEC 62305 ke 4 Protection Levels (LPL) kya represent karte hain?</li>
        <li>Equipotential bonding lightning protection mein kyun critical hai?</li>
        <li>External LPS aur Internal LPS mein kya fark hai?</li>
        <li>Lightning Protection aur Earthing same cheez hain kya? Explain the relationship.</li>
        <li>SPD health kaise verify karte ho field mein?</li>
        <li>Down conductor routing mein sharp bends kyun avoid karte hain?</li>
        <li>Kya har Data Center ko LPL I chahiye? Decision kaise lete hain?</li>
      </ul>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li><strong>LPS lightning ko rokta nahi — controlled path deta hai</strong> current ko safely ground tak divert karne ke liye.</li>
        <li><strong>Teen core components hain</strong> — Air Termination, Down Conductor, Earth Termination — External LPS banate hain.</li>
        <li><strong>Induced surge direct strike se zyada common hai</strong> Data Centers mein — SPD isliye equally critical hai.</li>
        <li><strong>SPD Type 1/2/3 cascade design mein kaam karte hain</strong> — Grid se Rack tak progressive protection.</li>
        <li><strong>IEC 62305 LPL I/II typically Data Centers ke liye recommended hai</strong> — high consequence of failure ki wajah se.</li>
        <li><strong>Equipotential bonding side flash risk prevent karta hai</strong> — sab metallic systems same potential pe rakhta hai.</li>
        <li><strong>LPS aur SPD complementary hain, substitute nahi</strong> — dono zaroori hain complete protection ke liye.</li>
        <li><strong>SPD ki finite life hoti hai</strong> — health indicator regularly check karo, surge event ke baad especially.</li>
        <li><strong>Annual earth resistance aur continuity testing mandatory hai</strong> — LPS effectiveness verify karne ka only reliable tareeka.</li>
        <li><strong>Actual design project-specific hoti hai</strong> — risk assessment, building geometry, aur local lightning data sab final LPL aur design shape karte hain.</li>
      </ul>
      <p style={S.p}>Lightning Protection ke baad natural next step hai <TopicLink slug="earthing" variant="inline" /> ka complete coverage — LPS earthing ke bina meaningfully kaam nahi karta. Power chain samajhne ke liye <TopicLink slug="ups" variant="inline" />, <TopicLink slug="battery-bank" variant="inline" />, <TopicLink slug="sts" variant="inline" /> aur <TopicLink slug="pdu" variant="inline" /> articles dekho.</p>
    </>
  );
}
