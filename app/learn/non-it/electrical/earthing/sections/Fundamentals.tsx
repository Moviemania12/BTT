"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import EarthingNetworkDiagram from "../svg/EarthingNetworkDiagram";
import EarthPitDiagram from "../svg/EarthPitDiagram";

export default function Fundamentals() {
  return (
    <>
      <h2 id="what-is-earthing" style={S.h2}>What is Earthing?</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Earthing creates a low-resistance path to send fault current safely into the ground. Without earthing, fault current can find a path through equipment or through a person — both are dangerous.</p>
      <ul style={S.ul}>
        <li>Earthing = intentional electrical connection to ground</li>
        <li>Purpose: to give fault current a safe path</li>
        <li>Essential for both personnel safety and equipment protection</li>
        <li>In a Data Center, multiple earthing systems run in parallel</li>
      </ul>
      <p style={S.p}><strong>Engineer Tip:</strong> Do not think of earthing as a "backup safety system" — it is part of primary protection. The protective relay, breaker and earthing together make one complete protection scheme.</p>
      <p style={S.p}><strong>Real Data Center Example:</strong> If a server PSU shorts internally and the chassis becomes live — with proper earthing, fault current will immediately flow through the earth path, the breaker will trip, and touching the chassis will give no shock. Without earthing, current will flow through the person touching the chassis.</p>
      <p style={S.p}>Technically, earthing connects metallic parts (which normally do not carry current) to ground through a low-impedance conductor. In a fault condition this path safely diverts the current — not through a person, not through equipment.</p>
      <Callout type="important" title="Common Mistake">
        Many engineers see earthing only as a "compliance requirement" — a checkbox to tick for IS 3043. In reality, earthing failure can directly cause both personnel death and equipment destruction. It is a safety-critical system, not paperwork.
      </Callout>
      <p style={S.p}><strong>Key Takeaway:</strong> Earthing = a safe path designed for fault current — operating a Data Center without it is extremely dangerous, even before IEC or IS compliance.</p>

      <h2 id="why-earthing-required" style={S.h2}>Why Earthing is Required</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Earthing is required for 4 core reasons — personnel safety, equipment protection, enabling fault clearance and reducing electrical noise. In a Data Center all of these are equally critical.</p>
      <ComparisonTable
        headers={["Reason", "What It Prevents", "Data Center Impact"]}
        rows={[
          ["Personnel safety", "Electric shock from faulted equipment", "Engineer/technician life protection"],
          ["Equipment protection", "Overvoltage damage from faults/surges", "Server, UPS, network equipment survival"],
          ["Fault clearance", "Sustained fault current without trip", "Breaker/relay coordination works correctly"],
          ["Noise reduction", "EMI/RFI interference on signal cables", "Clean data transmission, no communication errors"],
          ["Lightning protection", "Direct/induced lightning damage", "Building + IT equipment survival"],
          ["Static discharge", "ESD damage to sensitive electronics", "Component-level protection"],
        ]}
      />
      <p style={S.p}><strong>Engineer Tip:</strong> If a Data Center has "noisy" network connections or intermittent data errors with no clear IT cause, check the earthing. Poor earthing/bonding often manifests as unexplained IT issues, not obvious electrical faults.</p>
      <p style={S.p}><strong>Key Takeaway:</strong> Earthing is not only for safety — both signal integrity and equipment longevity depend directly on earthing quality.</p>

      <h2 id="earthing-vs-grounding" style={S.h2}>Earthing vs Grounding</h2>
      <p style={S.p}><strong>Quick Summary:</strong> India/UK terminology uses "Earthing", US terminology uses "Grounding" — both are technically the same concept. There are some subtle usage differences worth understanding.</p>
      <ComparisonTable
        headers={["Aspect", "Earthing (IS/IEC terminology)", "Grounding (US/NEC terminology)"]}
        rows={[
          ["Region", "India, UK, IEC countries", "USA, NEC-based countries"],
          ["Core concept", "Same — connection to earth potential", "Same — connection to earth potential"],
          ["Standard reference", "IS 3043", "NEC (NFPA 70)"],
          ["Common usage", "\"Earth pit\", \"earthing system\"", "\"Ground rod\", \"grounding electrode system\""],
          ["Data Center India", "Uses IS 3043 primarily", "May reference IEEE/NEC if US-based OEM"],
        ]}
      />
      <p style={S.p}>In India, Data Centers primarily follow IS 3043 — but the documentation of imported equipment (US OEMs) will use "grounding" terminology. An engineer should understand both terms as the same concept.</p>
      <p style={S.p}><strong>Key Takeaway:</strong> Earthing and Grounding are the same engineering concept with different regional terminology — do not get confused when an OEM manual says "grounding".</p>

      <h2 id="dc-earthing-philosophy" style={S.h2}>Data Center Earthing Philosophy</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Data Center earthing design does not depend on a single earth pit — the whole facility forms an interconnected earthing grid in which every major piece of equipment is bonded to a common reference point.</p>
      <p style={S.p}><strong>Engineer Tip:</strong> The "Single point earthing" vs "Grid earthing" decision depends on facility size. Small server rooms can use single point earthing — but Tier III/IV Data Centers always use grid/mesh earthing because the single point of failure risk is unacceptable.</p>
      <p style={S.p}>Core philosophy: <strong>Equipotential Bonding</strong> — all metallic parts should be at the same electrical potential. If there is a potential difference between two points, a touch voltage risk is created during fault conditions.</p>
      <Callout type="best-practice" title="Best Practice — Common Bonding Network (CBN)">
        Modern Data Center design uses a Common Bonding Network (CBN) approach — all earthing systems (equipment, lightning, functional) are interconnected at a common reference point, while still maintaining function-specific paths. This is the IEC 61000-5-2 recommended approach.
      </Callout>
      <p style={S.p}><strong>Key Takeaway:</strong> More important than individual earth pit design is designing the whole facility as a unified, equipotential earthing grid.</p>

      <h2 id="complete-earthing-network" style={S.h2}>Complete Data Center Earthing Network</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Every major Data Center system — from the Transformer to DCIM — is connected to the earthing network. This section maps the whole network.</p>
      <Figure caption="Fig 1 — Complete Data Center Earthing Network: Transformer, DG, UPS, Battery Bank, STS, PDU, Panels, Cable Trays, Server Rack, Cooling systems, Fire systems, Building Steel, and Lightning Protection — all bonded to the common earth grid.">
        <EarthingNetworkDiagram />
      </Figure>
      <ComparisonTable
        headers={["System", "Earthing Requirement", "Why It Matters"]}
        rows={[
          ["Transformer", "Neutral earthing + body earthing separate", "Fault current return path, personnel safety"],
          ["DG Set", "Body earthing + neutral (if source)", "Alternator fault protection"],
          ["UPS", "Body earthing + DC bus floating ground monitor", "AC/DC fault isolation"],
          ["Battery Bank", "Rack earthing, isolated from DC bus", "Prevents DC ground fault propagation"],
          ["STS", "Body earthing, bonded to common grid", "Fault protection during transfer"],
          ["PDU", "Body earthing at every unit", "Server chassis fault protection"],
          ["Panels/Switchgear", "Body earthing + busbar earth connection", "Arc fault containment"],
          ["Cable Trays", "Continuous bonding along entire run", "EMI reduction, fault path continuity"],
          ["Server Rack", "Rack frame earthing + rail bonding", "Chassis fault protection, ESD control"],
          ["PAC/CRAC/Chiller", "Body earthing per equipment", "Motor/compressor fault protection"],
          ["Fire Alarm/VESDA", "Functional earth for signal integrity", "False alarm prevention, EMI immunity"],
          ["Building Steel", "Structural steel bonded to earth grid", "Lightning current dissipation path"],
          ["Raised Floor", "Floor grid bonded, ESD floor tiles", "Static discharge protection"],
          ["Lightning Protection", "Separate down-conductor + dedicated earth", "High-current lightning discharge path"],
          ["BMS/DCIM", "Functional/clean earth for control signals", "Noise-free monitoring data"],
        ]}
      />
      <Callout type="important" title="Important — Separate but Bonded">
        The earthing paths of different systems are kept physically separate (especially clean vs dirty earth), but are ultimately bonded at a common reference point. This is because if they are kept completely isolated, a potential difference can develop between systems during a fault — which is dangerous.
      </Callout>
      <p style={S.p}><strong>Key Takeaway:</strong> Data Center earthing is not a single system — it is an interconnected network of 15+ subsystems, all following the equipotential bonding principle.</p>

      <h2 id="types-of-earthing" style={S.h2}>Types of Earthing</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Earthing is categorized by function — equipment vs system, clean vs dirty, functional, lightning and static. Each type has a specific purpose in the Data Center.</p>

      <h3 id="equipment-earthing" style={S.h3}>Equipment Earthing</h3>
      <p style={S.p}>Equipment earthing (body earthing) — connects non-current-carrying metallic parts (equipment body/chassis) to earth. Purpose: so that the chassis does not come to a dangerous voltage in case of a fault.</p>
      <p style={S.p}><strong>Real Example:</strong> The metal body of a UPS cabinet — it does not carry current in normal operation, but if internal insulation fails, the body can become live. Equipment earthing prevents this scenario.</p>

      <h3 id="system-earthing" style={S.h3}>System Earthing</h3>
      <p style={S.p}>System earthing — intentionally connects a current-carrying conductor of the power system (typically the neutral) to earth. It establishes a voltage reference and gives fault current a controlled path.</p>
      <ComparisonTable
        headers={["System Earthing Type", "Description", "Common Use"]}
        rows={[
          ["Solidly Earthed (TN)", "Neutral directly earthed at source", "Most common in India LV systems"],
          ["Resistance Earthed", "Neutral earthed through resistor", "Limits fault current, common in DG systems"],
          ["Unearthed/Floating (IT system)", "No intentional earth connection", "UPS DC bus — monitored via EFM/GFM"],
        ]}
      />

      <h3 id="clean-earth-dirty-earth" style={S.h3}>Clean Earth vs Dirty Earth</h3>
      <ComparisonTable
        headers={["Parameter", "Clean Earth", "Dirty Earth"]}
        rows={[
          ["Purpose", "Sensitive electronics, signal reference", "Fault current, power system earthing"],
          ["Typical connection", "IT equipment, BMS, communication systems", "Panels, motors, switchgear body"],
          ["Noise tolerance", "Very low — isolated from power faults", "Higher noise acceptable"],
          ["Common name", "Instrument earth, technical earth", "Body earth, power earth"],
          ["Bonding", "Bonded at single reference point only", "Bonded throughout system"],
        ]}
      />
      <Callout type="warning" title="Warning — Never Mix Clean and Dirty Earth Casually">
        Randomly connecting clean earth to dirty earth introduces EMI/noise into sensitive electronics — it can cause BMS false alarms, communication errors, even data corruption. Both should be bonded at the same ultimate reference point, but in a controlled, single-point manner — not through multiple random connections.
      </Callout>

      <h3 id="functional-earth" style={S.h3}>Functional Earth</h3>
      <p style={S.p}>Functional earth is not for safety — it is required for the correct operation of equipment. Example: BMS controllers, PLCs and communication equipment that need a stable reference voltage for signal processing.</p>

      <h3 id="lightning-earth" style={S.h3}>Lightning Earth</h3>
      <p style={S.p}>Lightning earth is a dedicated system — designed to handle very high current (tens of kA), very short duration (microseconds) discharges. It is kept separate from normal equipment earthing but is ultimately bonded.</p>
      <p style={S.p}>Complete coverage of the lightning protection system is in the <TopicLink slug="lightning-protection" variant="inline" /> article.</p>

      <h3 id="static-earth" style={S.h3}>Static Earth</h3>
      <p style={S.p}>Static earth is for electrostatic discharge (ESD) control — raised floor tiles, chairs and wrist straps are all connected to static earth. Static earth is critical while handling server components — ESD can damage sensitive chips.</p>

      <h2 id="earthing-components" style={S.h2}>Earthing Components</h2>
      <p style={S.p}><strong>Quick Summary:</strong> A complete earthing system is made of multiple physical components — from the earth pit to the test link. Each component has a specific role.</p>
      <ComparisonTable
        headers={["Component", "Function", "Material Typical"]}
        rows={[
          ["Earth Pit", "Earth electrode housing in the ground", "Concrete/GI chamber"],
          ["Earth Chamber", "Access point for testing/maintenance", "Concrete with cover"],
          ["Earth Electrode", "Actual ground contact — plate/rod", "Copper, GI, copper-bonded"],
          ["Earth Strip", "Connects electrode to building system", "Copper or GI, 25x3mm to 50x6mm"],
          ["Earth Bus/Bar", "Central connection point in panel", "Copper bar"],
          ["Earth Wire", "Flexible connection at equipment", "Copper, insulated green-yellow"],
          ["Earth Clamp", "Mechanical connection to electrode", "Brass/copper alloy"],
          ["Test Link", "Disconnection point for resistance testing", "Bolted copper link"],
          ["Inspection Chamber", "Access for periodic inspection", "Concrete/plastic chamber with lid"],
        ]}
      />
      <Callout type="common-mistake" title="Common Mistake — Skipping the Test Link">
        In many installations the test link is not installed — the earth strip becomes a directly welded/bolted permanent connection. This means: to do an earth resistance test, the system has to be physically disconnected, which is risky and time-consuming. Always install a test link — it is designed for proper isolation.
      </Callout>

      <h2 id="earth-pit-types" style={S.h2}>Earth Pit Types</h2>
      <p style={S.p}><strong>Quick Summary:</strong> There are 5 main types of earth pit construction — Plate, Rod, Chemical, Grid and Ring. Each type's application and cost is different.</p>

      <h3 id="plate-earthing" style={S.h3}>Plate Earthing</h3>
      <p style={S.p}>A GI or copper plate (typically 600mm x 600mm) is buried vertically in the ground, with a charcoal/salt layer to improve the surrounding soil resistivity. Traditional method — proven, but periodic watering required.</p>

      <h3 id="rod-earthing" style={S.h3}>Rod / Pipe Earthing</h3>
      <p style={S.p}>A GI pipe or copper-bonded rod is driven vertically into the ground — typically 3m length; deeper installations couple multiple rods. Compact footprint, deeper moisture access — good for space-constrained sites.</p>

      <h3 id="chemical-earthing" style={S.h3}>Chemical / Maintenance Free Earthing</h3>
      <Figure caption="Fig 2 — Maintenance Free Earthing (MFE) Cross Section: Electrode surrounded by conductive chemical compound backfill, reducing dependency on soil moisture.">
        <EarthPitDiagram />
      </Figure>
      <p style={S.p}>Chemical earthing surrounds the electrode with a conductive compound (bentonite + chemical backfill) — it retains moisture and naturally reduces soil resistivity, without regular watering. It is the preferred choice in modern Data Centers — genuinely lower maintenance.</p>
      <ComparisonTable
        headers={["Parameter", "Conventional (Plate/Rod)", "Chemical/MFE"]}
        rows={[
          ["Maintenance", "Regular watering required (dry season)", "Minimal — compound retains moisture 5-7+ years"],
          ["Initial cost", "Lower", "Higher (30-50% more)"],
          ["Resistance stability", "Varies with season/moisture", "Stable year-round"],
          ["Lifespan", "10-15 years with maintenance", "15-20+ years"],
          ["Data Center recommendation", "Acceptable for budget projects", "Recommended for Tier III/IV"],
        ]}
      />

      <h3 id="grid-earthing" style={S.h3}>Grid / Mesh Earthing</h3>
      <p style={S.p}>Multiple electrodes interconnected in a grid pattern underground — provides very low, stable resistance and excellent fault current distribution. Standard for large Data Centers and substations.</p>

      <h3 id="ring-earthing" style={S.h3}>Ring Earthing</h3>
      <p style={S.p}>A continuous earth conductor ring is buried around the building perimeter, connected to multiple electrodes. Building steel and equipment can easily tap off this ring — good for uniform earthing of a large facility.</p>

      <h3 id="earth-enhancement-compound" style={S.h3}>Earth Enhancement Compound</h3>
      <p style={S.p}>In high-resistivity soil areas (rocky, sandy), earth enhancement compound is used as backfill around the electrode — it artificially improves conductivity where the natural soil is insufficient.</p>
    </>
  );
}
