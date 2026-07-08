"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import LpsArchitectureDiagram from "../svg/LpsArchitectureDiagram";
import SpdInstallationDiagram from "../svg/SpdInstallationDiagram";

export default function Fundamentals() {
  return (
    <>
      <h2 id="what-is-lps" style={S.h2}>What is Lightning Protection System (LPS)?</h2>
      <p style={S.p}><strong>Quick Summary:</strong> LPS ek engineered system hai jo lightning current ko safely building ke bahar se ground tak divert karta hai, bina structure ya equipment ko damage kiye. Teen core components: Air Termination, Down Conductor, aur Earth Termination.</p>
      <ul style={S.ul}>
        <li>LPS lightning current ko controlled, low-impedance path deta hai</li>
        <li>External LPS (structure protection) + Internal LPS (equipment protection) dono chahiye</li>
        <li>Standalone system nahi — building earthing se bonded hota hai</li>
        <li>Data Center mein LPS + SPD dono mila ke complete protection dete hain</li>
      </ul>
      <p style={S.p}><strong>Engineer Tip:</strong> LPS "lightning ko rokta hai" — yeh misconception hai. LPS lightning ko rok nahi sakta, sirf controlled path provide karta hai taaki current uncontrolled tarike se building/equipment ke through na jaaye. Yeh risk management hai, elimination nahi.</p>
      <p style={S.p}>Technically LPS teen main parts mein divide hota hai — Air Termination (strike ko intercept karta hai), Down Conductor (current ko ground tak le jaata hai), aur Earth Termination (current ko soil mein dissipate karta hai). In teeno ka combination External LPS banata hai. Internal LPS mein SPD aur bonding hoti hai jo equipment ko surge se bachati hai.</p>
      <Callout type="important" title="LPS Alone is Not Enough">
        LPS sirf direct strike current handle karta hai. Nearby lightning se induced surge — jo Data Centers mein zyada common hai — LPS akela handle nahi karta. SPD (Surge Protection Device) yeh gap fill karta hai. Complete protection ke liye dono chahiye.
      </Callout>

      <h2 id="why-dc-needs-lps" style={S.h2}>Why Data Centers Need Lightning Protection</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Data Center mein equipment cost aur downtime cost dono itne high hain ki even ek single lightning event catastrophic financial impact create kar sakta hai. LPS investment iske against insurance hai.</p>
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
      <p style={S.p}><strong>Real Data Center Example:</strong> Ek Data Center bina proper SPD coordination ke — nearby lightning strike hui building se 200m door. Induced surge power line ke through aayi, Type 1 SPD nahi tha main incoming pe, aur surge directly UPS rectifier tak pahunchi. Result: UPS rectifier module damage, aur downstream connected 3 PDUs bhi affected huyi. Estimated loss: equipment replacement + almost 6 hours downtime.</p>
      <p style={S.p}><strong>Key Takeaway:</strong> Data Center risk profile normal commercial building se alag hai — equipment sensitivity aur downtime cost dono LPS investment ko easily justify karte hain.</p>

      <h2 id="direct-vs-induced" style={S.h2}>Direct Strike vs Induced Surge</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Direct strike building pe actually girti hai — rare lekin catastrophic. Induced surge nearby strike se electromagnetic coupling ke through hoti hai — common aur underestimated.</p>
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
        Engineers often LPS design pe focus karte hain (visible, structural) lekin SPD coordination ko secondary treat karte hain. Reality mein Data Center equipment damage zyada induced surge se hoti hai, direct strike se nahi. SPD design equally, agar zyada nahi, priority deserve karta hai.
      </Callout>

      <h2 id="risk-assessment" style={S.h2}>Lightning Risk Assessment</h2>
      <p style={S.p}><strong>Quick Summary:</strong> IEC 62305-2 formal risk assessment methodology deta hai — building location, height, lightning flash density, aur consequence of failure sab factor karke required protection level determine karte hain.</p>
      <p style={S.p}>Risk assessment factors: (1) Ground flash density (strikes/km²/year — location-specific data), (2) Structure dimensions aur height, (3) Type of construction, (4) Value of contents aur consequence of loss, (5) Presence of existing protection measures.</p>
      <Callout type="best-practice" title="Best Practice — Formal Risk Assessment Document">
        Har Data Center project mein formal IEC 62305-2 risk assessment document banao — yeh sirf technical exercise nahi, insurance aur compliance documentation ke liye bhi zaroori hai. Assessment output directly LPL (Protection Level) determine karta hai jo baaki poora LPS design drive karta hai.
      </Callout>

      <h2 id="protection-levels" style={S.h2}>IEC 62305 Protection Levels (LPL I–IV)</h2>
      <p style={S.p}><strong>Quick Summary:</strong> 4 protection levels — LPL I sabse comprehensive (highest risk/consequence), LPL IV sabse basic. Level design parameters (mesh size, down conductor spacing) directly affect karta hai.</p>
      <ComparisonTable
        headers={["LPL", "Interception Efficiency", "Down Conductor Spacing", "Mesh Size", "Typical Application"]}
        rows={[
          ["LPL I", "99%", "10 m", "5m × 5m", "High-risk, Tier IV Data Centers, critical infrastructure"],
          ["LPL II", "97%", "10 m", "10m × 10m", "Tier III Data Centers, commercial critical facilities"],
          ["LPL III", "91%", "15 m", "15m × 15m", "General commercial buildings, Tier I/II"],
          ["LPL IV", "84%", "25 m", "20m × 20m", "Low-risk structures"],
        ]}
      />
      <p style={S.p}>Data Centers typically LPL I ya LPL II design karte hain — consequence of failure (data loss, extended downtime, reputational damage) itna high hota hai ki lower protection levels ka risk acceptable nahi hota.</p>

      <h2 id="air-termination" style={S.h2}>Air Termination</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Air termination lightning ko intercept karta hai before it reaches the structure. Teen main types — Franklin Rod, Mesh, aur Early Streamer Emission — har ek different coverage philosophy follow karta hai.</p>
      <ComparisonTable
        headers={["Type", "Description", "Coverage", "Data Center Use"]}
        rows={[
          ["Franklin Rod", "Vertical pointed rod, rolling sphere method coverage", "Point protection — specific high points", "Corners, edges, equipment on roof (chillers, antennas)"],
          ["Mesh (Faraday Cage)", "Conductor grid across entire roof surface", "Wide area, uniform coverage", "Standard for Data Center roofs — most common approach"],
          ["Early Streamer Emission (ESE)", "Claims larger protection radius via early ionization", "Larger radius claimed by manufacturer", "Controversial — not IEC 62305 certified in many countries, use with caution"],
        ]}
      />
      <Callout type="important" title="Important — Mesh + Franklin Rod Combination">
        Data Center roofs typically Mesh system use karte hain overall coverage ke liye, plus Franklin rods strategic high points pe (rooftop equipment, parapets, corners). Yeh combination IEC 62305 rolling sphere method ke according comprehensive coverage deta hai. ESE rods India/IEC context mein generally avoid kiye jaate hain unless specific local approval ho.
      </Callout>

      <h2 id="down-conductors" style={S.h2}>Down Conductors</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Down conductor air termination se intercepted current ko earth termination tak safely conduct karta hai. Minimum 2 conductors mandatory hain — redundancy ke liye.</p>
      <ComparisonTable
        headers={["Parameter", "Requirement", "Note"]}
        rows={[
          ["Minimum count", "2 per structure", "Single point of failure avoid karne ke liye"],
          ["Spacing (LPL I)", "10m along perimeter", "Building perimeter ke around evenly distributed"],
          ["Material", "Copper or aluminum tape/rod, typically 25×3mm or 50mm² equivalent", "Corrosion resistance zaroori hai"],
          ["Routing", "Shortest, straightest path possible", "Sharp bends inductance badhate hain, effectiveness kam"],
          ["Test joint", "Accessible test joint at each down conductor base", "Earth resistance testing ke liye disconnection point"],
        ]}
      />
      <Callout type="common-mistake" title="Common Mistake — Sharp Bends in Down Conductor">
        Down conductor routing mein sharp 90° bends avoid karo — lightning current ke liye yeh high impedance point create karte hain jo side flash risk badhata hai. Bend radius kam se kam 20cm hona chahiye, aur bend angle 90° se zyada open hona chahiye jahan possible ho.
      </Callout>

      <h2 id="earth-termination" style={S.h2}>Earth Termination</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Earth termination lightning current ko soil mein safely dissipate karta hai. LPS-specific earth termination hoti hai — lekin ultimately building ki common earthing se bonded hoti hai equipotential bonding ke through.</p>
      <p style={S.p}>Earth termination design considerations same principles follow karte hain jo <TopicLink slug="earthing" variant="inline" /> article mein detail se cover kiye gaye hain — low resistance, soil resistivity consideration, aur proper electrode selection. Difference sirf yeh hai ki LPS earth termination ko bahut zyada current (kA range) handle karna padta hai, bahut short duration mein.</p>
      <Callout type="best-practice" title="Best Practice — Ring Earth Electrode">
        Data Center LPS ke liye ring earth electrode (building perimeter ke around continuous conductor, multiple electrodes se connected) preferred approach hai. Yeh multiple down conductors ke earth resistance ko effectively parallel kar deta hai, resulting mein lower overall resistance aur better current distribution.
      </Callout>

      <h2 id="bonding" style={S.h2}>Bonding</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Bonding LPS ke different components aur building ke metallic systems ko electrically connect karta hai — side flash risk aur dangerous potential difference dono prevent karta hai.</p>
      <p style={S.p}>Lightning event ke time, agar LPS aur building steel/piping alag potential pe hain, dangerous side flash (arcing) ho sakta hai unke beech. Bonding conductor yeh risk eliminate karta hai by ensuring sab systems same potential pe rahein during the event.</p>

      <h2 id="spd" style={S.h2}>Surge Protection Devices (SPD)</h2>
      <p style={S.p}><strong>Quick Summary:</strong> SPD electrical circuits ko transient overvoltage se protect karta hai — chahe surge direct strike se ho ya induced ho. Teen types cascade mein install hoti hain — progressive protection deta hai.</p>
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
        Individual SPD types akele complete protection nahi dete — Type 1, 2, 3 ko coordinated cascade mein design karna zaroori hai. Agar Type 1 miss kar diya aur directly Type 2 laga diya main incoming pe, high-energy direct strike current Type 2 ko destroy kar sakta hai without adequately protecting downstream.
      </Callout>

      <h2 id="dc-lightning-path" style={S.h2}>Typical Data Center Lightning Path</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Grid se Rack tak poora power chain — har stage pe appropriate SPD type install hoti hai coordinated protection ke liye.</p>
      <p style={S.p}>Power chain: Grid → Transformer → RMU (Ring Main Unit) → <TopicLink slug="ups" variant="inline" /> → <TopicLink slug="pdu" variant="inline" /> → Rack. SPD placement: Type 1 at transformer secondary/RMU incoming, Type 2 at UPS input aur major PDU input, Type 3 at rack PDU output near servers.</p>
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
