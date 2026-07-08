"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import EarthingNetworkDiagram from "../svg/EarthingNetworkDiagram";
import EarthPitDiagram from "../svg/EarthPitDiagram";

export default function Fundamentals() {
  return (
    <>
      <h2 id="what-is-earthing" style={S.h2}>What is Earthing?</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Earthing ek low-resistance path banati hai fault current ko safely ground mein bhejne ke liye. Bina earthing ke fault current equipment ke through ya insaan ke through path dhundh sakta hai — dono dangerous hain.</p>
      <ul style={S.ul}>
        <li>Earthing = intentional electrical connection to ground</li>
        <li>Purpose: fault current ko safe path dena</li>
        <li>Personnel safety aur equipment protection dono ke liye zaroori</li>
        <li>Data Center mein multiple earthing systems parallel chalte hain</li>
      </ul>
      <p style={S.p}><strong>Engineer Tip:</strong> Earthing ko "backup safety system" mat samjho — yeh primary protection ka hissa hai. Protective relay, breaker, aur earthing teeno mila ke ek complete protection scheme banate hain.</p>
      <p style={S.p}><strong>Real Data Center Example:</strong> Server PSU internally short ho jaaye aur chassis live ho jaaye — agar proper earthing hai, fault current turant earth path se flow karegi, breaker trip karega, aur chassis touch karne pe koi shock nahi lagega. Bina earthing ke, chassis touch karne wale insaan ke through current flow karegi.</p>
      <p style={S.p}>Technically, earthing metallic parts (jo normally current-carrying nahi hote) ko ek low-impedance conductor se ground mein connect karta hai. Fault condition mein yeh path current ko safely divert karta hai — insaan ke through nahi, equipment ke through nahi.</p>
      <Callout type="important" title="Common Mistake">
        Kai engineers earthing ko sirf "compliance requirement" samajhte hain — ek checkbox jo IS 3043 ke liye tick karna hai. Reality mein earthing failure directly personnel death aur equipment destruction dono cause kar sakti hai. Yeh safety-critical system hai, paperwork nahi.
      </Callout>
      <p style={S.p}><strong>Key Takeaway:</strong> Earthing = fault current ke liye designed safe path — bina isske Data Center operate karna extremely dangerous hai, IEC ya IS compliance se pehle bhi.</p>

      <h2 id="why-earthing-required" style={S.h2}>Why Earthing is Required</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Earthing 4 core reasons se required hai — personnel safety, equipment protection, fault clearance enable karna, aur electrical noise reduce karna. Data Center mein yeh sab equally critical hain.</p>
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
      <p style={S.p}><strong>Engineer Tip:</strong> Agar Data Center mein "noisy" network connections ya intermittent data errors ho rahe hain jinka koi clear IT cause nahi mil raha, earthing check karo. Poor earthing/bonding often manifest hota hai as unexplained IT issues, not obvious electrical faults.</p>
      <p style={S.p}><strong>Key Takeaway:</strong> Earthing sirf safety ke liye nahi — signal integrity aur equipment longevity dono directly earthing quality pe depend karte hain.</p>

      <h2 id="earthing-vs-grounding" style={S.h2}>Earthing vs Grounding</h2>
      <p style={S.p}><strong>Quick Summary:</strong> India/UK terminology mein "Earthing" use hota hai, US terminology mein "Grounding" — dono technically same concept hain. Kuch subtle usage differences hain jo samajhna chahiye.</p>
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
      <p style={S.p}>India mein Data Centers primarily IS 3043 follow karte hain — lekin imported equipment (US OEMs) ki documentation mein "grounding" terminology milegi. Engineer ko dono terms same concept samajhna chahiye.</p>
      <p style={S.p}><strong>Key Takeaway:</strong> Earthing aur Grounding same engineering concept hain, alag regional terminology — confuse mat ho jaana jab OEM manual "grounding" bole.</p>

      <h2 id="dc-earthing-philosophy" style={S.h2}>Data Center Earthing Philosophy</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Data Center earthing design ek single earth pit pe depend nahi karta — poora facility ek interconnected earthing grid banata hai jisme har major equipment bonded hota hai common reference point se.</p>
      <p style={S.p}><strong>Engineer Tip:</strong> "Single point earthing" vs "Grid earthing" ka decision facility size pe depend karta hai. Small server rooms single point earthing use kar sakte hain — lekin Tier III/IV Data Centers hamesha grid/mesh earthing use karte hain kyunki single point of failure risk unacceptable hai.</p>
      <p style={S.p}>Core philosophy: <strong>Equipotential Bonding</strong> — sab metallic parts same electrical potential pe hone chahiye. Agar do points ke beech potential difference hai, touch voltage risk create hota hai during fault conditions.</p>
      <Callout type="best-practice" title="Best Practice — Common Bonding Network (CBN)">
        Modern Data Center design mein ek Common Bonding Network (CBN) approach use hoti hai — sab earthing systems (equipment, lightning, functional) ek common reference point se interconnected hote hain, phir bhi function-specific paths maintain karte hain. Yeh IEC 61000-5-2 recommended approach hai.
      </Callout>
      <p style={S.p}><strong>Key Takeaway:</strong> Individual earth pit design se zyada important hai — poora facility ek unified, equipotential earthing grid ke roop mein design karna.</p>

      <h2 id="complete-earthing-network" style={S.h2}>Complete Data Center Earthing Network</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Har major Data Center system — Transformer se lekar DCIM tak — earthing network se connected hota hai. Yeh section poora network map karta hai.</p>
      <Figure caption="Fig 1 — Complete Data Center Earthing Network: Transformer, DG, UPS, Battery Bank, STS, PDU, Panels, Cable Trays, Server Rack, Cooling systems, Fire systems, Building Steel, aur Lightning Protection sab common earth grid se bonded.">
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
        Different systems ke earthing paths physically separate rakhe jaate hain (especially clean vs dirty earth) lekin ultimately ek common reference point pe bond hote hain. Yeh isliye kyunki agar completely isolated rakho, potential difference develop ho sakti hai between systems during fault — jo dangerous hai.
      </Callout>
      <p style={S.p}><strong>Key Takeaway:</strong> Data Center earthing ek single system nahi — 15+ subsystems ka interconnected network hai, sab equipotential bonding principle follow karte hue.</p>

      <h2 id="types-of-earthing" style={S.h2}>Types of Earthing</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Earthing ko function ke basis pe categorize karte hain — equipment vs system, clean vs dirty, functional, lightning, aur static. Har type ka specific purpose hai Data Center mein.</p>

      <h3 id="equipment-earthing" style={S.h3}>Equipment Earthing</h3>
      <p style={S.p}>Equipment earthing (body earthing) — non-current-carrying metallic parts (equipment body/chassis) ko earth se connect karta hai. Purpose: fault ke case mein chassis dangerous voltage pe na aaye.</p>
      <p style={S.p}><strong>Real Example:</strong> UPS cabinet ka metal body — normal operation mein current carry nahi karta, lekin internal insulation fail hone pe body live ho sakti hai. Equipment earthing yeh scenario prevent karta hai.</p>

      <h3 id="system-earthing" style={S.h3}>System Earthing</h3>
      <p style={S.p}>System earthing — power system ke current-carrying conductor (typically neutral) ko intentionally earth se connect karta hai. Yeh voltage reference establish karta hai aur fault current ko controlled path deta hai.</p>
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
        Clean earth ko dirty earth se randomly connect karna EMI/noise introduce karta hai sensitive electronics mein — BMS false alarms, communication errors, data corruption tak ho sakta hai. Dono ek hi ultimate reference point pe bond hone chahiye, lekin controlled, single-point manner mein — not multiple random connections.
      </Callout>

      <h3 id="functional-earth" style={S.h3}>Functional Earth</h3>
      <p style={S.p}>Functional earth safety ke liye nahi — equipment ke correct operation ke liye required hoti hai. Example: BMS controllers, PLCs, communication equipment jinko stable reference voltage chahiye signal processing ke liye.</p>

      <h3 id="lightning-earth" style={S.h3}>Lightning Earth</h3>
      <p style={S.p}>Lightning earth dedicated system hai — very high current (tens of kA), very short duration (microseconds) discharge handle karne ke liye designed. Yeh normal equipment earthing se separate rakhi jaati hai lekin ultimately bonded hoti hai.</p>
      <p style={S.p}><TopicLink slug="lightning-protection" variant="inline" /> article mein complete lightning protection system coverage milega.</p>

      <h3 id="static-earth" style={S.h3}>Static Earth</h3>
      <p style={S.p}>Static earth electrostatic discharge (ESD) control ke liye hai — raised floor tiles, chairs, wrist straps sab static earth se connected hote hain. Server components handle karte waqt static earth critical hai — ESD se sensitive chips damage ho sakte hain.</p>

      <h2 id="earthing-components" style={S.h2}>Earthing Components</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Complete earthing system multiple physical components se bana hota hai — earth pit se lekar test link tak. Har component ka specific role hai.</p>
      <ComparisonTable
        headers={["Component", "Function", "Material Typical"]}
        rows={[
          ["Earth Pit", "Ground mein earth electrode housing", "Concrete/GI chamber"],
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
      <Callout type="common-mistake" title="Common Mistake — Test Link Skip Karna">
        Kai installations mein test link install nahi hoti — earth strip directly welded/bolted permanent connection ban jaati hai. Iska matlab: earth resistance test karne ke liye system ko physically disconnect karna padta hai, jo risky aur time-consuming hai. Test link hamesha install karo — yeh proper isolation ke liye designed hai.
      </Callout>

      <h2 id="earth-pit-types" style={S.h2}>Earth Pit Types</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Earth pit construction ke 5 main types hain — Plate, Rod, Chemical, Grid, aur Ring. Har type ka application aur cost different hai.</p>

      <h3 id="plate-earthing" style={S.h3}>Plate Earthing</h3>
      <p style={S.p}>GI ya copper plate (typically 600mm x 600mm) ground mein vertically bury ki jaati hai, charcoal/salt layer ke saath surrounding soil resistivity improve karne ke liye. Traditional method — proven, lekin periodic watering required.</p>

      <h3 id="rod-earthing" style={S.h3}>Rod / Pipe Earthing</h3>
      <p style={S.p}>GI pipe ya copper-bonded rod ground mein vertically drive ki jaati hai — typically 3m length, deeper installations multiple rods coupled. Compact footprint, deeper moisture access — good for space-constrained sites.</p>

      <h3 id="chemical-earthing" style={S.h3}>Chemical / Maintenance Free Earthing</h3>
      <Figure caption="Fig 2 — Maintenance Free Earthing (MFE) Cross Section: Electrode surrounded by conductive chemical compound backfill, reducing dependency on soil moisture.">
        <EarthPitDiagram />
      </Figure>
      <p style={S.p}>Chemical earthing electrode ko conductive compound (bentonite + chemical backfill) se surround karta hai — yeh moisture retain karta hai aur soil resistivity ko naturally reduce karta hai, without regular watering. Modern Data Centers mein preferred choice hai — genuinely lower maintenance.</p>
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
      <p style={S.p}>Multiple electrodes interconnected in a grid pattern underground — provides very low, stable resistance aur excellent fault current distribution. Standard for large Data Centers aur substations.</p>

      <h3 id="ring-earthing" style={S.h3}>Ring Earthing</h3>
      <p style={S.p}>Building perimeter ke around ek continuous earth conductor ring bury ki jaati hai, multiple electrodes se connected. Building steel aur equipment easily is ring se tap ho sakte hain — good for large facility uniform earthing.</p>

      <h3 id="earth-enhancement-compound" style={S.h3}>Earth Enhancement Compound</h3>
      <p style={S.p}>High-resistivity soil areas (rocky, sandy) mein earth enhancement compound use hota hai electrode ke around backfill ke roop mein — conductivity artificially improve karta hai jahan natural soil insufficient hai.</p>
    </>
  );
}
