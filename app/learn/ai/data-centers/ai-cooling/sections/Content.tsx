"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { aiCoolingContent } from "@/content/ai-cooling";

import RackHeatDensity from "../svg/RackHeatDensity";
import CduArchitecture from "../svg/CduArchitecture";
import CoolingTechComparison from "../svg/CoolingTechComparison";
import ThermalThrottlingFlow from "../svg/ThermalThrottlingFlow";
import AiCoolingArchitecture from "../svg/AiCoolingArchitecture";

void aiCoolingContent;

export default function Content() {
  return (
    <article>

      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          <TopicLink slug="gpu-cluster" variant="inline" /> In that article you learned that GPU servers provide enormous compute power. But with this compute comes a fundamental physics problem: the electricity that does the computing all converts into heat. And AI GPU servers consume a huge amount of electricity.
        </p>
        <p style={S.p}>
          A single NVIDIA DGX H100 server consumes approximately 10.2 kW. Four such servers in one rack = 40+ kW from compute alone. For older data centers that were designed for 10–20 kW per rack, cooling this is physically impossible without significant changes.
        </p>
        <p style={S.p}>
          AI Cooling is the complete domain of technologies, architectures, and engineering decisions that ensure GPU servers operate at safe temperatures — so that thermal throttling does not occur, hardware damage does not occur, and expensive compute delivers its full capability.
        </p>
      </section>

      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>Data Center Engineers:</strong> Cooling infrastructure design, capacity planning, liquid cooling deployment.</li>
          <li><strong>Facility Engineers:</strong> CDU integration, chiller plant, cooling water management, physical infrastructure.</li>
          <li><strong>AI Infrastructure Engineers:</strong> Understanding cooling constraints for GPU deployment decisions.</li>
          <li><strong>O&amp;M Engineers:</strong> Cooling monitoring, failure detection, troubleshooting, leak management.</li>
          <li><strong>Students &amp; Beginners:</strong> Complete zero-to-understanding journey for AI cooling concepts.</li>
        </ul>
      </section>

      <section id="learning-path">
        <h2 style={S.h2}>Learning Path</h2>
        <ul style={S.ul}>
          <li><strong>Previous:</strong> <TopicLink slug="ai-storage" variant="inline" /> — storage hierarchy, parallel file systems, checkpointing</li>
          <li><strong>Current:</strong> AI Cooling — why and how AI racks need specialized cooling</li>
          <li><strong>Related:</strong> <TopicLink slug="pac" variant="inline" /> — precision air conditioning in data centers</li>
          <li><strong>Related:</strong> <TopicLink slug="chiller" variant="inline" /> — chiller plant engineering</li>
        </ul>
      </section>

      <section id="why-cooling-critical">
        <h2 style={S.h2}>Why Cooling Is Critical for AI</h2>
        <p style={S.p}>
          A fundamental law of physics: electrical energy ultimately converts into heat. Everything a GPU computes — matrix multiplications, gradient calculations — produces heat. This heat has to go somewhere.
        </p>
        <p style={S.p}>
          If heat is not properly removed, GPU temperature rises. GPU firmware detects the temperature and automatically reduces clock speed — thermal throttling. Performance drops. Expensive AI training slows down. If temperature keeps rising further, hardware damage and eventual failure are possible.
        </p>
        <p style={S.p}>
          AI cooling is not simply "keeping servers cool" — it directly determines AI training throughput, hardware reliability, and return on investment.
        </p>
      </section>

      <section id="heat-density-challenge">
        <h2 style={S.h2}>Heat Density Challenge</h2>
        <p style={S.p}>
          The fundamental problem: the power density of AI GPU servers is orders of magnitude greater than that of traditional servers.
        </p>
        <Figure caption="Rack Heat Density Comparison: Traditional enterprise approximately 10-20 kW, high-performance compute approximately 20-30 kW, AI GPU rack (DGX H100 class) approximately 40-60 kW, latest generation AI GPU rack (GB200 NVL72 class) 100+ kW possible. Values are illustrative ranges — actual numbers depend on hardware, configuration, and workload.">
          <RackHeatDensity />
        </Figure>
        <p style={S.p}>
          Traditional CRAC/CRAH air cooling systems used in conventional data centers typically have a per-rack cooling capacity in the 10–30 kW range (the exact limit depends on facility design). AI GPU racks can significantly exceed this limit.
        </p>
        <Callout type="important" title="Verify Power Density From Manufacturer Specs">
          Verify any specific AI server's actual power consumption against its manufacturer specifications. Rack power density calculation: servers per rack × per-server TDP + networking + management equipment + 10–20% headroom. And TDP is at peak load — real workloads may differ. Always follow the manufacturer's approved power distribution configuration.
        </Callout>
      </section>

      <section id="physics-of-heat">
        <h2 style={S.h2}>Physics of Heat Removal</h2>
        <p style={S.p}>
          The efficiency of heat removal depends on the specific heat capacity of the cooling medium — how much heat a material can absorb per unit mass per degree of temperature rise.
        </p>
        <ComparisonTable
          title="Cooling Medium Heat Capacity Comparison"
          headers={["Medium", "Specific Heat (approx)", "Relative Capacity", "Used In"]}
          rows={[
            ["Air", "~1 kJ/kg·K", "Baseline (1×)", "Traditional CRAC/CRAH cooling"],
            ["Water", "~4.18 kJ/kg·K", "~4× air", "CDU secondary loops, cold plates"],
            ["Dielectric fluid (typical)", "~1–2 kJ/kg·K (liquid)", "~1–2× air", "Immersion cooling systems"],
            ["Two-phase fluid (phase change)", "Very high (latent heat)", "Much higher at boiling point", "Two-phase immersion systems"],
          ]}
        />
        <p style={S.p}>
          Water's specific heat capacity (per unit <em>mass</em>) is approximately 4 times that of air — 4.18 kJ/kg·K vs ~1 kJ/kg·K. But an important distinction: this is a mass-basis comparison. Because of the density difference (water is ~800× denser than air), the volumetric heat capacity is even more dramatically different. Practical implication: at the same flow rate through the same pipe, water can carry orders of magnitude more heat than air. This is exactly why liquid cooling is fundamentally more effective than air cooling for high-density AI racks — but the "4× better" figure is only on a mass basis; the real-world advantage is far greater.
        </p>
        <p style={S.p}><strong>Engineering Formula — Heat Removal:</strong></p>
        <p style={S.p}>
          <strong>Q = ṁ × Cₚ × ΔT</strong>
        </p>
        <ul style={S.ul}>
          <li><strong>Q</strong> = heat removed (watts or kW)</li>
          <li><strong>ṁ</strong> = mass flow rate of coolant (kg/s)</li>
          <li><strong>Cₚ</strong> = specific heat of coolant (kJ/kg·K)</li>
          <li><strong>ΔT</strong> = temperature rise of coolant (supply → return, in °C or K)</li>
        </ul>
        <p style={S.p}><strong>Illustrative worked example</strong> (values approximate, for concept only — actual values depend on system design and OEM specs):</p>
        <p style={S.p}>
          Suppose water flows in a CDU secondary loop at ṁ = 2 kg/s, Cₚ = 4.18 kJ/kg·K, and the temperature rises from a supply temperature of 20°C to a return temperature of 30°C (ΔT = 10°C).
        </p>
        <p style={S.p}>
          Q = 2 × 4.18 × 10 = <strong>83.6 kW</strong> heat removed.
        </p>
        <p style={S.p}>
          This formula is fundamental in cooling system design — it applies directly to CDU sizing, flow rate selection, and ΔT monitoring. Actual design calculations should be done with qualified mechanical engineers and according to OEM specifications.
        </p>
      </section>

      <section id="temp-humidity">
        <h2 style={S.h2}>Temperature &amp; Humidity Management</h2>
        <p style={S.p}>
          Cooling is not just about removing heat — it is essential to keep both temperature and humidity within appropriate ranges for IT equipment. ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers) TC 9.9 committee publishes thermal guidelines for IT equipment that serve as the industry-standard reference.
        </p>
        <h3 style={S.h3}>Air-Cooled IT Equipment — ASHRAE Temperature Classes</h3>
        <p style={S.p}>
          ASHRAE TC 9.9 has defined environment classes for air-cooled IT equipment. The <strong>Recommended</strong> range is where most IT equipment operates reliably without derating. The <strong>Allowable</strong> range is broader but can impact equipment lifespan or reliability.
        </p>
        <ComparisonTable
          title="ASHRAE IT Equipment Environmental Classes (Air-Cooled)"
          headers={["Class", "Recommended Inlet Temp", "Allowable Inlet Temp", "Typical Use"]}
          rows={[
            ["A1", "18–27°C", "15–32°C", "Enterprise servers, controlled DC environment"],
            ["A2", "18–27°C", "10–35°C", "General purpose servers"],
            ["A3", "18–27°C", "5–40°C", "Broader range equipment"],
            ["A4", "18–27°C", "5–45°C", "High-temperature capable equipment"],
          ]}
        />
        <Callout type="important" title="Recommended vs Allowable — Difference Samjho">
          18–27°C is the recommended inlet temperature — this is the range for which IT equipment is designed for optimal and reliable operation. The allowable range is wider (class-specific), but regularly operating in the allowable range can increase equipment stress. Maintaining the recommended range in data center operations is best practice. Refer to specific equipment manufacturer documentation — every device has its own spec.
        </Callout>
        <h3 style={S.h3}>Temperature Measurement Points</h3>
        <ul style={S.ul}>
          <li><strong>Cold Aisle / Rack Inlet:</strong> The server's intake temperature — this is what is compared against ASHRAE specs. Target: 18–27°C recommended range.</li>
          <li><strong>Hot Aisle / Rack Exhaust:</strong> The exhaust hot air temperature from the server — typically 10–15°C+ warmer than inlet depending on server load. Monitor it, but there is no IT equipment spec here.</li>
          <li><strong>Return Air to Cooling Unit:</strong> Air returning to the CRAC/CRAH — determines cooling unit efficiency.</li>
          <li><strong>Room Average:</strong> General ambient — useful for spot checks and trending.</li>
        </ul>
        <h3 style={S.h3}>Humidity — RH vs Dew Point</h3>
        <p style={S.p}>
          Two metrics matter for humidity control:
        </p>
        <ul style={S.ul}>
          <li><strong>Relative Humidity (RH):</strong> The actual moisture in the air vs. the maximum moisture-holding capacity of air at that temperature, as a percentage. ASHRAE TC 9.9 specifies RH limits along with dew-point limits by equipment class — RH alone is not a sufficient indicator. Verify specific limits from the current ASHRAE TC 9.9 edition and the applicable equipment class (A1–A4); there is no single "recommended RH range" that applies to everything.</li>
          <li><strong>Dew Point:</strong> The temperature below which air, when cooled, causes moisture to condense. Dew point is an absolute measure — it does not depend on temperature. ASHRAE TC 9.9 specifies dew-point-based limits that are more robust than RH-only limits. The ASHRAE recommended envelope is conventionally expressed as: a lower bound of ~5.5°C dew point (below this, ESD risk increases) and an upper bound of ~60% RH combined with a ~15°C dew point maximum — this is a "zone," not a simple single range. Always verify the current ASHRAE TC 9.9 edition and applicable equipment class.</li>
        </ul>
        <p style={S.p}>
          The dew point metric is practically more useful: if you know the dew point, you know that any surface that cools below that temperature carries condensation risk. The ASHRAE TC 9.9 recommended envelope defines a humidity zone (roughly from a 5.5°C dew point lower bound to a 60% RH / ~15°C dew point upper bound) — this is an envelope, not a simple linear range. Verify exact limits from the specific equipment class and the current ASHRAE TC 9.9 edition.
        </p>
        <h3 style={S.h3}>Condensation Risk</h3>
        <p style={S.p}>
          Condensation — liquid water forming on electronic components — is a serious hazard. It causes short circuits, corrosion, and hardware failure.
        </p>
        <ul style={S.ul}>
          <li>Risk occurs when a surface's temperature drops below the room's dew point</li>
          <li>In liquid cooling systems: if the cold plate or coolant supply temperature is too low relative to room humidity, condensation is possible on cold surfaces</li>
          <li>A sudden ingress of warm humid outside air into the server room (from a door being opened) can also create a condensation spike</li>
          <li>Mitigation: monitor dew point, keep supply coolant temperature above the dew point (with appropriate margin), and properly commission the HVAC</li>
        </ul>
        <h3 style={S.h3}>Low Humidity — ESD Risk</h3>
        <p style={S.p}>
          Very low humidity — below the applicable ASHRAE class dew-point lower limit (follow the current ASHRAE TC 9.9 and OEM specification) — increases ESD (Electrostatic Discharge) risk. Static electricity builds up easily in dry air, and discharge can damage sensitive electronics. ESD-safe procedures (antistatic mats, wrist straps, proper grounding) are important in data centers, especially in low-humidity conditions.
        </p>
        <h3 style={S.h3}>Liquid Cooling Temperature Context</h3>
        <p style={S.p}>
          Temperature specifications for liquid cooling are different and should be verified from server OEM documentation. Different loops operate at different temperatures:
        </p>
        <ul style={S.ul}>
          <li><strong>Facility water (primary loop):</strong> Water coming from the chiller — temperature depends on facility design and corresponds to the ASHRAE W-class (W17, W27, W32, etc.). W17-class facilities are designed for a ~17°C max supply temperature, higher W-classes allow warmer supply. The actual value is facility-specific.</li>
          <li><strong>CDU secondary loop supply:</strong> The cooled fluid going to IT equipment — temperature is <strong>determined by the server OEM specification</strong>. This varies from server to server and there is no universal range. The CDU secondary loop temperature should not exceed the maximum inlet coolant temperature specified in the server OEM documentation.</li>
          <li><strong>CDU secondary loop return:</strong> The warm fluid returning from IT equipment — warmer than supply by a ΔT (depends on system design).</li>
          <li><strong>GPU cold plate surface:</strong> Depending on coolant temperature plus thermal resistance, the GPU junction temperature is significantly higher.</li>
        </ul>
        <Callout type="warning" title="Liquid Cooling Temperatures Are Not Universal">
          The temperature ranges given above are indicative. Every liquid-cooled server platform has its own OEM-specified coolant temperature range — inlet temperature limits, maximum allowable return temperature, and required ΔT. These specs differ across platforms. Always treat specific server OEM documentation as the primary reference.
        </Callout>
      </section>

      <section id="air-cooling">
        <h2 style={S.h2}>Air Cooling</h2>
        <p style={S.p}>
          Traditional data center cooling uses CRAC (Computer Room Air Conditioning) or CRAH (Computer Room Air Handler) units. These units produce cooled air that flows through server racks, absorbs heat, and returns as warm air through the return plenum back to the cooling units.
        </p>
        <p style={S.p}><strong>CRAC vs CRAH:</strong></p>
        <ul style={S.ul}>
          <li><strong>CRAC:</strong> A self-contained unit — has its own compressor, condenser, evaporator all inside. Self-sufficient but less efficient at scale.</li>
          <li><strong>CRAH:</strong> Uses chilled water from a central chiller plant. More efficient at large scale, requires a central chiller plant.</li>
        </ul>
        <p style={S.p}>
          Air cooling is well-understood, widely deployed, and relatively simple in existing data centers. It remains adequate for low-density compute.
        </p>
      </section>

      <section id="containment">
        <h2 style={S.h2}>Hot Aisle / Cold Aisle Containment</h2>
        <p style={S.p}>
          Server racks typically take in cold air intake from the front and exhaust hot air from the back. If racks are arranged randomly, cold and hot air mix — efficiency drops.
        </p>
        <p style={S.p}>
          In a hot aisle/cold aisle arrangement: alternating rows of racks face each other. In cold aisles, rack fronts face each other — cooled air is supplied here. In hot aisles, rack backs face each other — exhaust air collects here and returns to the cooling units.
        </p>
        <p style={S.p}>
          Containment further improves this concept — physical barriers (aisle caps, doors, ceiling) completely separate hot and cold air. Bypass airflow is eliminated. Cooling efficiency improves.
        </p>
        <Callout type="important" title="Containment Does Not Increase Cooling Capacity">
          This is a common misunderstanding. Containment uses existing cooling capacity more efficiently — but it does not increase total heat removal capacity. If the heat output of the racks exceeds the facility's cooling capacity, containment cannot solve it. For high-density AI racks, containment is necessary but not sufficient on its own.
        </Callout>
      </section>

      <section id="air-cooling-limits">
        <h2 style={S.h2}>Air Cooling Limits for AI</h2>
        <p style={S.p}>
          Air cooling's practical limits are primarily determined by: available airflow volume, the temperature differential (supply vs. return air), and air's physical heat capacity.
        </p>
        <p style={S.p}>
          The heat flux (watts per unit area) of modern GPU servers and AI accelerators is so high that adequately managing it with air cooling becomes increasingly challenging. Specific density limits depend on facility design — there is no universal threshold. At sufficiently high rack densities, when air cooling starts approaching the physical limits of the facility design, liquid cooling may become necessary or strongly preferred. But this determination should be made for each deployment based on server design, actual rack density, and specific facility cooling capability — it is not a blanket statement that every AI rack needs liquid cooling.
        </p>
        <p style={S.p}><strong>Limitations of air cooling in the AI context:</strong></p>
        <ul style={S.ul}>
          <li>High acoustic noise — powerful fans are required to cool high-density servers</li>
          <li>Power consumption — fan power is a significant overhead</li>
          <li>Airflow distribution — ensuring uniform cooling across all components challenging</li>
          <li>Physical heat removal capacity ceiling</li>
        </ul>
      </section>

      <section id="liquid-cooling-intro">
        <h2 style={S.h2}>Liquid Cooling — Introduction</h2>
        <p style={S.p}>
          In liquid cooling, the heat transfer medium is liquid instead of air — typically water or a dielectric fluid. Liquid's superior heat capacity and the possibility of direct component contact enable much more effective cooling for AI GPU servers.
        </p>
        <p style={S.p}>
          Liquid cooling comes in several forms — CDU-based direct liquid cooling (most common for AI), rear-door heat exchangers, and immersion cooling. Each approach has different tradeoffs.
        </p>
        <Callout type="best-practice" title="Plan Liquid Cooling First — Hardware Later">
          Plan and procure liquid cooling infrastructure (CDU, piping, manifolds, facility water connections) before or alongside AI hardware procurement. Adding liquid cooling retroactively is expensive and disruptive. Read manufacturer specifications carefully — liquid cooling compatibility, fluid type, and temperature setpoints are all specific.
        </Callout>
      </section>

      <section id="ashrae-liquid-classes">
        <h2 style={S.h2}>ASHRAE Liquid Cooling Classes (W-Classes)</h2>
        <p style={S.p}>
          ASHRAE TC 9.9 has also defined facility water supply temperature classes for liquid cooling — commonly called "W-classes." These classes define the facility-side (TCS — Thermal Control System / chiller loop) water supply temperature, not universal GPU coolant temperatures.
        </p>
        <ComparisonTable
          title="ASHRAE Liquid Cooling W-Classes — Facility Water Supply Temperature"
          headers={["Class", "Max Facility Water Supply Temp", "Meaning"]}
          rows={[
            ["W17", "17°C", "Conventional chilled water — mechanical refrigeration typically required"],
            ["W27", "27°C", "Elevated supply temp — partial free cooling possible in many climates"],
            ["W32", "32°C", "Higher supply temp — increased free cooling hours"],
            ["W40", "40°C", "Warm water cooling — significant free cooling potential"],
            ["W45", "45°C", "Higher warm water — extensive free cooling capability"],
            ["W+", ">45°C", "Very high temperature water — specialized applications"],
          ]}
        />
        <Callout type="important" title="W-Classes Define Facility/TCS Water — Not GPU Temperature">
          This is a critical distinction that is often confused. W-classes define the facility water supply temperature (which arrives on the CDU primary side) — they do not specify the coolant temperature inside the IT equipment or the GPU junction temperature. The actual IT coolant loop (CDU secondary side) temperature and the acceptable supply temperature to the GPU are specifically stated in server OEM documentation. The W-class reference is for facility infrastructure design.
        </Callout>
        <p style={S.p}><strong>Practical implication:</strong> Designing a higher W-class facility (W32, W40, W45) gets you more hours of economizer operation — the chiller can be bypassed when outside conditions allow. For modern AI liquid-cooled servers that can accept higher coolant temperatures, serving them from W32 or W40 class facility water is an energy-efficient approach. But it is essential to confirm the specific server's OEM spec that it can operate in that temperature range.</p>
      </section>

      <section id="heat-removal-formula">
        <h2 style={S.h2}>Heat Removal Engineering Formula</h2>
        <p style={S.p}>
          The fundamental engineering formula in cooling system design is:
        </p>
        <p style={S.p}><strong>Q = ṁ × Cₚ × ΔT</strong></p>
        <ul style={S.ul}>
          <li><strong>Q</strong> — Heat removed (watts or kW)</li>
          <li><strong>ṁ</strong> — Mass flow rate of coolant (kg/s)</li>
          <li><strong>Cₚ</strong> — Specific heat capacity of coolant (kJ/kg·K) — ~4.18 for water, different for dielectric fluids</li>
          <li><strong>ΔT</strong> — Temperature difference: coolant supply to return (°C or K)</li>
        </ul>
        <p style={S.p}><strong>Illustrative example</strong> (concept demonstration only — determine actual system values from OEM specifications and qualified engineering):</p>
        <p style={S.p}>
          Water is flowing at 2 kg/s in a CDU secondary loop. Supply temperature 22°C, return temperature 32°C (ΔT = 10°C).
        </p>
        <p style={S.p}>
          Q = 2 × 4.18 × 10 = <strong>83.6 kW</strong>
        </p>
        <p style={S.p}>
          This formula is used practically: for CDU sizing (how much heat needs to be removed?), for determining flow rate (given Q and acceptable ΔT), and for detecting ΔT drift in monitoring (an increase in ΔT at the same flow means more heat load, a blockage, or a supply temperature change).
        </p>
        <Callout type="best-practice" title="ΔT Monitoring In Real-Time Operations">
          Monitor the CDU supply and return temperatures and calculate ΔT. If ΔT unexpectedly rises at the same flow rate — cooling load has increased or supply temperature has risen. If ΔT unexpectedly drops — flow rate has increased, or there is a short-circuit path in the coolant loop. ΔT trend data is an early indicator of cooling system health.
        </Callout>
      </section>

      <section id="cdu">
        <h2 style={S.h2}>CDU — Cooling Distribution Unit</h2>
        <p style={S.p}>
          The CDU is the heart of AI data center liquid cooling architecture. It is a heat exchanger that provides thermal exchange between facility cooling water and a dedicated secondary liquid loop for IT equipment.
        </p>
        <Figure caption="CDU Liquid Cooling Architecture: Facility chiller provides cold water to CDU. CDU acts as thermal barrier — separating facility water loop (with chemical treatment) from IT secondary loop (IT-safe clean fluid). Secondary loop carries cooled fluid to rack manifolds and GPU cold plates. Warm fluid returns to CDU, heat transfers to facility water, which returns to chiller. Two loops never mix.">
          <CduArchitecture />
        </Figure>
        <p style={S.p}><strong>Primary functions of a CDU:</strong></p>
        <ul style={S.ul}>
          <li><strong>Heat Exchange:</strong> Transfers heat between facility water and the secondary IT loop.</li>
          <li><strong>Loop Isolation:</strong> Facility water (with chemical treatment, potential contaminants) never directly contacts IT equipment.</li>
          <li><strong>Pumping:</strong> Pumps for fluid circulation in the secondary loop.</li>
          <li><strong>Monitoring:</strong> Temperature, pressure, flow rate sensors — for anomaly detection.</li>
          <li><strong>Control:</strong> Regulates secondary loop temperature and flow rate according to server requirements.</li>
        </ul>
        <p style={S.p}><strong>CDU deployment patterns:</strong></p>
        <ul style={S.ul}>
          <li><strong>Per-rack CDU:</strong> A dedicated CDU for every GPU rack. Maximum isolation and control. Higher cost.</li>
          <li><strong>Row-level CDU:</strong> One CDU serves multiple racks in a row.</li>
          <li><strong>Cluster CDU:</strong> A large CDU serves multiple rows or zones. Economies of scale but more complex piping.</li>
        </ul>
        <Callout type="warning" title="Match CDU Fluid Type To Manufacturer Specs">
          Every GPU server manufacturer specifies specific fluid requirements for their liquid cooling — chemistry, pH range, conductivity limits. The wrong fluid type can cause corrosion, seal degradation, or other issues. Always follow the server OEM's approved fluid specifications. Also verify CDU selection for server compatibility.
        </Callout>
      </section>

      <section id="dlc-cold-plates">
        <h2 style={S.h2}>Direct Liquid Cooling and Cold Plates</h2>
        <p style={S.p}>
          In Direct Liquid Cooling (DLC), coolant flows directly through cold plates mounted on heat-generating components. Cold plates are typically mounted on GPU chips, and sometimes on memory or VRMs.
        </p>
        <p style={S.p}><strong>Cold plate design:</strong></p>
        <ul style={S.ul}>
          <li>A metal (typically copper or aluminum) block mounted directly on top of the chip</li>
          <li>Coolant flows through internal channels — absorbs heat directly from the chip</li>
          <li>A thermal interface material (TIM) ensures efficient heat transfer between the chip surface and the cold plate</li>
          <li>Connects to the rack manifold via inlet and outlet ports</li>
        </ul>
        <p style={S.p}><strong>DLC and air cooling hybrid:</strong> In some DLC implementations, cold plates handle the primary heat sources (GPU chips), but some components inside the server (VRMs, PCIe, networking) are still air-cooled via fans. In fully liquid-cooled servers, everything is handled by liquid — no fans at all in some designs.</p>
        <p style={S.p}><strong>Manifold system:</strong> Inside the rack there is a manifold that receives incoming cooled fluid from the CDU and distributes it to each server's cold plates. Warm fluid returns to the CDU through the return manifold.</p>
      </section>

      <section id="rear-door-hx">
        <h2 style={S.h2}>Rear-Door Heat Exchangers</h2>
        <p style={S.p}>
          A Rear-Door Heat Exchanger (RDHX) is a cooling component that attaches in place of the rear door of an existing server rack. RDHX captures the hot air being exhausted from the rack and cools it by passing it through cooled water coils — before this air is released into the room.
        </p>
        <p style={S.p}><strong>How RDHX works:</strong> Server fans exhaust hot air from the back of the rack. This hot air passes through the RDHX coils. Cooled water is flowing in the coils. The hot air cools down. The cooled (or near-room-temperature) air is released onto the data center floor.</p>
        <p style={S.p}><strong>RDHX use cases:</strong></p>
        <ul style={S.ul}>
          <li>Adding moderate-density AI servers to an existing air-cooled facility without a full infrastructure overhaul</li>
          <li>Supplementing air cooling — RDHX reduces the heat load that the CRAC/CRAH has to handle</li>
          <li>A transition strategy — while gradually upgrading existing facilities</li>
        </ul>
        <Callout type="important" title="RDHX Is Not A Replacement For Full DLC">
          RDHX augments air cooling — it does not replace it. For very high density AI racks (60+ kW), RDHX is typically not sufficient. RDHX still depends on server fans for airflow — fan failure or airflow issues reduce RDHX effectiveness. Full DLC (cold plates) removes heat more directly and efficiently at very high densities.
        </Callout>
      </section>

      <section id="immersion-cooling">
        <h2 style={S.h2}>Immersion Cooling</h2>
        <p style={S.p}>
          In immersion cooling, IT equipment — typically server boards or complete servers — is physically submerged in an electrically non-conductive (dielectric) fluid. The fluid directly contacts components and absorbs heat.
        </p>
        <p style={S.p}>
          The concept of immersion cooling is simple: submerge electronics in a fluid that does not conduct electricity — the fluid absorbs heat and the components stay safe. No fans required in most designs — fluid movement happens via convection or pumping.
        </p>
        <p style={S.p}><strong>Advantages of immersion cooling:</strong></p>
        <ul style={S.ul}>
          <li>Very high density possible</li>
          <li>No fans — quiet operation, less mechanical complexity</li>
          <li>Direct component contact — very efficient heat transfer</li>
          <li>Potentially higher component reliability (no dust, no vibration from fans)</li>
        </ul>
        <p style={S.p}><strong>Challenges:</strong></p>
        <ul style={S.ul}>
          <li>Significant operational change — servers can't be serviced in normal way</li>
          <li>Special tooling and procedures required</li>
          <li>Fluid cost and management</li>
          <li>Not all hardware immediately compatible — some components not rated for immersion</li>
          <li>Less mature operational ecosystem compared to DLC</li>
        </ul>
      </section>

      <section id="single-phase">
        <h2 style={S.h2}>Single-Phase Immersion</h2>
        <p style={S.p}>
          In single-phase immersion, the dielectric fluid stays in a liquid state — it never boils during normal operation. The fluid warms up as it absorbs heat from the components, returns to an external heat exchanger (or CDU) to cool down, and returns to the tank.
        </p>
        <p style={S.p}><strong>Fluid examples:</strong> Mineral oil (older deployments), engineered dielectric fluids like Novec-based compounds (being phased out due to environmental concerns), newer alternatives like synthetic esters and other specialty fluids.</p>
        <p style={S.p}><strong>Tank design:</strong> Servers mounted vertically or horizontally in open-top or sealed tanks. Fluid level maintained. Heat exchanger in-tank or external.</p>
        <Callout type="warning" title="Dielectric Fluid Environmental Concerns">
          Traditional immersion cooling fluids such as certain fluorocarbons have high Global Warming Potential (GWP). The industry is actively exploring alternatives. Consider environmental impact, regulatory compliance, and future availability in fluid selection. Check manufacturer guidance and local environmental regulations.
        </Callout>
      </section>

      <section id="two-phase">
        <h2 style={S.h2}>Two-Phase Immersion</h2>
        <p style={S.p}>
          In two-phase immersion, the dielectric fluid is deliberately allowed to boil. Components get so hot that the fluid's boiling point is reached, the fluid converts to vapor, the vapor collects on condensers at the top of the tank, condenses, and drips back — a continuous cycle.
        </p>
        <p style={S.p}>
          Phase change (liquid → vapor → liquid) involves latent heat absorption, which enables very high heat transfer rates. In two-phase, component temperatures stay tightly controlled — temperature "clamps" at the boiling point.
        </p>
        <p style={S.p}><strong>Challenges specific to two-phase:</strong></p>
        <ul style={S.ul}>
          <li>Specialty fluids required — typically fluorocarbon-based with specific boiling points</li>
          <li>Vapor management — sealed system required, vapor recovery critical</li>
          <li>High fluid cost</li>
          <li>Environmental concerns — GWP of specialty fluids</li>
          <li>Less deployed at scale compared to single-phase or DLC</li>
        </ul>
        <p style={S.p}>
          Today, two-phase immersion is primarily used in research, HPC, and specialty high-density applications. In mainstream AI production deployments, DLC is more common.
        </p>
      </section>

      <section id="cooling-comparison">
        <h2 style={S.h2}>Cooling Technologies Comparison</h2>
        <Figure caption="Cooling Technologies Comparison: Air cooling lowest cost and complexity, limited for high-density AI. Rear-door heat exchangers augment air cooling for moderate density. Direct Liquid Cooling (DLC) primary choice for modern AI racks — handles 40-100+ kW. Single-phase and two-phase immersion for very high density specialty applications. Many deployments use hybrid approach.">
          <CoolingTechComparison />
        </Figure>
        <Callout type="important" title="Hybrid Approach Is Common">
          Production AI data centers typically have hybrid cooling: DLC for GPU server racks (high density), air cooling for networking equipment, storage servers, and management infrastructure (lower density). Multiple cooling technologies coexist within the same facility.
        </Callout>
      </section>

      <section id="facility-cooling-chain">
        <h2 style={S.h2}>Facility Cooling Chain</h2>
        <p style={S.p}>
          AI server cooling is not limited to the CDU and cold plates — it is a complete chain that starts from facility infrastructure.
        </p>
        <Figure caption="Complete AI Data Center Cooling Architecture: Cooling tower rejects heat to atmosphere. Chiller plant provides cold facility water. CDU room contains CDU units that exchange heat between facility water and IT secondary loop. AI server room has GPU racks with DLC cold plates, connected to CDUs via rack manifolds. Separate air cooling for networking and lower-density equipment.">
          <AiCoolingArchitecture />
        </Figure>
        <Callout type="important" title="This Is An Example Architecture — Not Universal">
          GPU → CDU → Chiller → Cooling Tower is just one common example chain. Actual facility architecture varies. Alternatives include: air-cooled chillers (no cooling tower, direct air heat rejection), water-cooled chillers with dry coolers (no evaporative tower), economizer/free-cooling loops (chiller bypass possible under some conditions), and hybrid/adiabatic systems. Architecture selection depends on climate, water availability, energy cost, site constraints, and project requirements.
        </Callout>
        <ul style={S.ul}>
          <li><strong>GPU Chips → Cold Plates:</strong> Heat transfers directly from the chip surface into the cold plate</li>
          <li><strong>Cold Plates → Rack Manifold:</strong> Warm fluid collects in the manifold inside the rack</li>
          <li><strong>Rack Manifold → CDU:</strong> Warm fluid goes to the CDU, heat transfer occurs</li>
          <li><strong>CDU → Facility Cooling Plant:</strong> Facility water (or a direct connection to a dry cooler / economizer) warms up and returns to the plant</li>
          <li><strong>Facility Plant → Heat Rejection:</strong> A chiller, dry cooler, cooling tower, or economizer — depending on design — ultimately rejects the heat to the atmosphere</li>
        </ul>
        <p style={S.p}>
          Every link in this chain is a failure point — monitoring is needed across the whole chain, not just GPU temperature.
        </p>
      </section>

      <section id="chiller-cooling-tower">
        <h2 style={S.h2}>Chiller and Cooling Tower</h2>
        <p style={S.p}>
          <TopicLink slug="chiller" variant="inline" /> That article covers detailed chiller plant engineering. Key points in the AI context:
        </p>
        <ul style={S.ul}>
          <li><strong>Chiller capacity sizing:</strong> Calculate the total cooling load of the AI racks. Determine the redundancy level — N, N+1, 2N, or distributed — according to project availability requirements, SLA, and design basis. Keep growth headroom.</li>
          <li><strong>Chilled water supply temperature:</strong> Liquid-cooled GPU servers can typically tolerate higher supply water temperatures compared to air-cooled equipment — this enables free cooling (economizer) opportunities in cooler climates.</li>
          <li><strong>Redundancy:</strong> AI training jobs run for a long time — a cooling system failure means training interruption. Cooling redundancy can be N, N+1, 2N, or a distributed architecture — determine per project availability requirements, SLA, and design basis.</li>
          <li><strong>Cooling tower water consumption:</strong> Large AI clusters use significant water via evaporative cooling towers — plan for WUE (Water Usage Effectiveness).</li>
        </ul>
      </section>

      <section id="dry-cooler">
        <h2 style={S.h2}>Dry Coolers and Economizers</h2>
        <p style={S.p}>
          A dry cooler (or air-cooled heat exchanger) rejects heat to the atmosphere without evaporation — zero water consumption. Fans pass air through the heat exchanger coils.
        </p>
        <p style={S.p}>
          <strong>Economizer mode:</strong> In cooler climates (when outside air temperature is sufficient), mechanical refrigeration (chiller) can be bypassed, and the cooling tower or dry cooler can directly cool the facility water. This is "free cooling" — chiller compressor energy is significantly reduced. PUE improves. For AI data centers, maximizing economizer hours is an important strategy for reducing energy cost.
        </p>
        <p style={S.p}><strong>Higher water temperature opportunity:</strong> Some liquid-cooled GPU server platforms can accept higher coolant supply temperatures — but this capability depends on server design and OEM specification, it is not universally guaranteed. If OEM specifications allow it, a higher acceptable supply temperature means more hours eligible for economizer operation — especially in moderate climates. Always verify the specific maximum inlet coolant temperature from server OEM documentation before finalizing facility design.</p>
      </section>

      <section id="cooling-water-quality">
        <h2 style={S.h2}>Cooling Water Quality</h2>
        <p style={S.p}>
          Water/fluid quality is critical in liquid cooling systems. Poor quality water can cause corrosion, scaling, biological growth, and equipment damage.
        </p>
        <ul style={S.ul}>
          <li><strong>Facility water (primary loop):</strong> Corrosion inhibitors, biocides, and scale inhibitors regularly maintained. Water chemistry analysis on a periodic basis. Manage cooling tower water concentration cycles.</li>
          <li><strong>Secondary IT loop:</strong> Maintain fluid chemistry per server OEM specifications. pH, conductivity, dissolved oxygen, and specific ions monitored. De-ionized water or specific treated water as required.</li>
          <li><strong>CDU internal:</strong> CDUs typically have filters to remove particles and debris. Regular filter inspection and replacement.</li>
        </ul>
        <Callout type="warning" title="Water Quality Monitoring Regular Honi Chahiye">
          Cooling water quality is not a set-and-forget item. Seasonal changes, makeup water variability, and system conditions change water chemistry over time. Sampling frequency depends on OEM requirements, the water treatment program, coolant chemistry, system criticality, and site-specific conditions — no universal interval applies. Consult a water treatment specialist and follow OEM documentation.
        </Callout>
      </section>

      <section id="pue-wue">
        <h2 style={S.h2}>PUE and WUE Metrics</h2>
        <ComparisonTable
          title="Key Cooling Efficiency Metrics"
          headers={["Metric", "Formula", "What It Measures", "AI Context"]}
          rows={[
            ["PUE (Power Usage Effectiveness)", "Total Facility Power ÷ IT Equipment Power", "Energy efficiency — how much overhead power for cooling, lighting, etc.", "Lower is better. 1.0 = ideal (impossible). 1.1–1.2 = excellent. 1.4+ = poor for modern facilities."],
            ["WUE (Water Usage Effectiveness)", "Annual Water Usage (L) ÷ IT Energy (kWh)", "Water consumption efficiency", "Important for water-scarce regions. Evaporative cooling raises WUE. Dry cooling lowers WUE."],
            ["DCiE (Data Center Infrastructure Efficiency)", "IT Power ÷ Total Facility Power × 100%", "Inverse of PUE expressed as percentage", "Higher is better. DCiE = 1/PUE × 100%."],
            ["CUE (Carbon Usage Effectiveness)", "Total CO₂ Emissions ÷ IT Equipment Energy", "Carbon footprint", "Depends on energy source. Renewable energy significantly reduces CUE."],
          ]}
        />
        <Callout type="important" title="PUE Context Without Caution">
          PUE is a useful metric, but context is necessary. Achieving a very low PUE at any cost is the wrong goal. A facility in a cold climate can naturally achieve a lower PUE because it gets more economizer hours. It does not capture GPU utilization — PUE can look good with idle GPUs even though efficiency is poor. Analyze PUE together with GPU utilization, training throughput, and total cost per useful AI compute.
        </Callout>
      </section>

      <section id="gpu-thermal-throttling">
        <h2 style={S.h2}>GPU Thermal Throttling</h2>
        <p style={S.p}>
          Thermal throttling is a built-in protection mechanism in GPU hardware. When GPU temperature approaches the manufacturer's specified thermal limits, the GPU firmware automatically reduces clock speed so temperature stays in a safe range.
        </p>
        <Figure caption="GPU Thermal Throttling Flow: Inadequate cooling → GPU temperature approaches limit → firmware reduces clock speed → compute performance drops → training throughput (tokens/sec) reduces → AI training ROI impacted. Throttling is silent — GPU appears 'running' but delivers less. Fix: improve cooling.">
          <ThermalThrottlingFlow />
        </Figure>
        <p style={S.p}><strong>Why throttling is insidious:</strong> The GPU utilization metric (on nvidia-smi or monitoring dashboards) can look high even while throttling. The GPU is "busy" computing, but at a slower clock. If you only monitor GPU utilization % and ignore clock speed, throttling remains invisible.</p>
        <p style={S.p}><strong>Detection:</strong></p>
        <ul style={S.ul}>
          <li>Monitor GPU clock speed and temperature simultaneously — via DCGM or nvidia-smi</li>
          <li>If clock speed is significantly below base clock during training → throttling is possible</li>
          <li>Compare training throughput (tokens/sec or samples/sec) against baseline — investigate unexplained drops</li>
          <li>NVIDIA DCGM has throttling reason counters available — can specifically identify thermal throttle</li>
        </ul>
        <Callout type="best-practice" title="Verify Cooling Before Production Training Runs">
          Before starting long training jobs: verify GPU temperatures with a burn-in workload, check clock speeds for no throttling, confirm cooling system metrics (CDU temperatures, flow rates) are normal. Discovering a cooling issue during a week-long training run costs months of delayed results.
        </Callout>
      </section>

      <section id="rack-power-density">
        <h2 style={S.h2}>Rack Power Density Planning</h2>
        <p style={S.p}>
          Rack power density is the total power consumption of a specific rack. This is a critical calculation in AI deployment planning because it directly determines cooling requirements.
        </p>
        <p style={S.p}><strong>Rack power calculation (simplified):</strong></p>
        <ol style={S.ol}>
          <li>Server TDP × number of servers per rack = server load</li>
          <li>Add: ToR switch power, PDU overhead, any other rack equipment</li>
          <li>Add: 10–20% headroom buffer</li>
          <li>Total = design rack power density</li>
        </ol>
        <p style={S.p}><strong>Cooling selection based on density (illustrative — facility-specific):</strong></p>
        <ul style={S.ul}>
          <li>Up to ~25–30 kW: Air cooling potentially feasible with proper containment (facility-dependent)</li>
          <li>30–60 kW (illustrative): Air cooling may become increasingly difficult — liquid cooling options (DLC, RDHX) worth evaluating depending on server airflow design and facility capability</li>
          <li>60–100+ kW (illustrative): Liquid cooling strongly preferred or necessary in most facility designs — actual requirement depends on server OEM design, rack configuration, and available facility cooling</li>
          <li>100+ kW: Advanced liquid cooling, potentially immersion; specialized facility design</li>
        </ul>
        <Callout type="warning" title="Always Verify Manufacturer Specs">
          The ranges given above are illustrative. Actual cooling requirements and limits depend on: server manufacturer liquid cooling specifications, CDU compatibility, facility cooling capacity, and local design standards. Verify with manufacturer documentation and qualified cooling engineers for every specific deployment.
        </Callout>
      </section>

      <section id="leak-detection">
        <h2 style={S.h2}>Leak Detection</h2>
        <p style={S.p}>
          Liquid coolant and electronics — this combination causes catastrophic failure. A single leak can damage GPU servers (hardware worth millions of dollars). This is why leak detection is mandatory, not optional.
        </p>
        <p style={S.p}><strong>Leak detection layers:</strong></p>
        <ul style={S.ul}>
          <li><strong>CDU level:</strong> Pressure monitoring (pressure drop = possible leak), flow rate monitoring, liquid level sensors</li>
          <li><strong>Pipe connections:</strong> Moisture sensors or liquid detection cables at joints, quick-disconnect fittings</li>
          <li><strong>Rack manifold level:</strong> Moisture sensors under manifold, drip trays with sensors</li>
          <li><strong>Under-floor/raised-floor:</strong> Rope-type liquid detection cables along cooling distribution paths</li>
          <li><strong>Visual indicators:</strong> Colored coolant (some deployments) makes leaks more visible</li>
          <li><strong>Automatic shutoff:</strong> Some CDU systems can automatically close valves on leak detection</li>
        </ul>
        <p style={S.p}><strong>Response procedure:</strong> Leak detected → immediate alert → isolate affected section (if automated shutoff not triggered, manually close valves) → evacuate coolant from section → identify leak source → repair → pressure test before reconnect → monitor closely after restart.</p>
        <Callout type="warning" title="Plan Drip Trays And Floor Drainage">
          Any amount of cooling water on the data center floor, in a raised floor, or near electrical equipment is a serious hazard. Physical containment (drip trays under CDUs and manifolds) should be part of the design — along with monitoring. Consider floor drainage capacity for worst-case coolant release scenarios.
        </Callout>
      </section>

      <section id="monitoring">
        <h2 style={S.h2}>AI Cooling Monitoring</h2>
        <p style={S.p}>
          Effective cooling monitoring is much more than just GPU temperature — the complete chain needs to be monitored. Set alarm setpoints from OEM/design specifications — universal values are not given here.
        </p>
        <ComparisonTable
          title="AI Cooling — Complete Monitoring Checklist"
          headers={["What to Monitor", "Why It Matters", "Abnormal Indication"]}
          rows={[
            ["Rack inlet temperature (per rack)", "Primary metric — the actual inlet air/coolant temperature to IT equipment. ASHRAE recommended 18–27°C for air-cooled.", "Above recommended range → cooling insufficient or bypass airflow issue"],
            ["Supply air temperature (CRAC/CRAH outlet)", "Cooling unit efficiency and setpoint adherence", "Above setpoint → cooling unit issue or overload"],
            ["Return air temperature (hot aisle / CRAC return)", "Heat load indicator — high return = high IT load or containment issue", "Unusually high → check containment, verify cooling capacity"],
            ["Room relative humidity (RH)", "ESD risk (too low) and condensation risk (too high)", "Below or above applicable ASHRAE class dew-point limits and OEM/design specification → investigate. Follow current ASHRAE TC 9.9 and equipment OEM limits."],
            ["Dew point", "More reliable condensation indicator than RH alone", "Dew point approaching or exceeding coolant supply temperature → condensation risk"],
            ["GPU junction temperature (per GPU)", "Direct hardware health indicator. Throttling trigger.", "Approaching OEM thermal limit → throttling imminent"],
            ["GPU thermal throttling status", "Silent performance degradation indicator", "Any throttling during production workload → investigate cooling"],
            ["GPU clock speed", "Confirm no throttling; corroborate temperature data", "Below expected boost/base clock during load → throttling"],
            ["Coolant supply temperature (CDU secondary)", "Verify CDU is delivering adequately cooled fluid to IT equipment", "Above OEM-specified max → check facility water, CDU heat exchanger"],
            ["Coolant return temperature (CDU secondary)", "Combined with supply gives ΔT — heat removal indicator", "ΔT too high (overload) or too low (flow bypass/short-circuit) — investigate"],
            ["Coolant ΔT (supply − return)", "Q = ṁ × Cₚ × ΔT — ΔT drift indicates load change or flow issue", "Rising ΔT at same flow = more heat load or supply warming; falling ΔT = possible bypass"],
            ["Coolant flow rate (per CDU, per manifold)", "Adequate flow ensures heat removal. Low flow = inadequate cooling.", "Below design spec → pump issue, partial blockage, or leak"],
            ["Coolant loop pressure (supply and return)", "Pressure drop indicates leak or blockage", "Unexpected drop → possible leak; unexpected rise → possible blockage"],
            ["CDU pump status and health", "Single pump failure in non-redundant setup = cooling loss", "Pump fault alarm, current draw anomaly, vibration"],
            ["CDU alarms (general)", "CDU self-monitoring — various fault conditions", "Any CDU alarm → investigate immediately"],
            ["Leak detection sensors (rack, manifold, CDU, floor)", "Early warning before major damage", "Any trigger → immediate response; locate and isolate"],
            ["Chiller status and outlet temperature", "Facility cooling chain health", "Chiller fault or outlet above setpoint → capacity or equipment issue"],
            ["Cooling tower / dry cooler status", "Heat rejection capability", "Fan fault, low water level (tower), high outlet temperature"],
            ["Facility water supply temperature (to CDU primary)", "Upstream of CDU — if this rises, CDU secondary will too", "Above design supply temperature → chiller/plant issue"],
          ]}
        />
      </section>

      <section id="failure-scenarios">
        <h2 style={S.h2}>Common Failure Scenarios</h2>
        <p style={S.p}>
          Har scenario: Symptom → Possible Causes → Checks → Corrective Action.
        </p>
        <ComparisonTable
          headers={["Symptom", "Possible Causes", "Checks", "Corrective Action"]}
          rows={[
            [
              "Single GPU high temperature",
              "Cold plate poor contact, cold plate blockage, TIM degradation, that GPU's specific cooling path issue",
              "Compare vs other GPUs in same server. Check per-GPU coolant flow if measurable. Visual inspect connection.",
              "Verify cold plate seated/connected. If persistent: schedule maintenance window, inspect/replace cold plate or TIM."
            ],
            [
              "All GPUs in one server high temperature",
              "Server coolant inlet blocked or disconnected, server-level manifold issue, server fan failure (hybrid cooling), coolant flow to that server below spec",
              "Check coolant flow to that specific server. Verify connections. Check server-level alarms.",
              "Verify all quick-disconnect fittings properly connected. Check manifold valve for that server. If flow issue: isolate server, investigate."
            ],
            [
              "All GPUs in entire rack high temperature",
              "Rack manifold blockage, CDU supply temperature high, CDU flow rate low, CDU pump issue",
              "Check CDU supply temp and flow rate. Check rack manifold pressure. Compare other racks on same CDU.",
              "If CDU issue: switch to backup pump / CDU if N+1. Reduce IT load. Alert facilities team."
            ],
            [
              "Low coolant flow rate",
              "CDU pump degradation or failure, partial blockage in loop, leak (flow going elsewhere), valve partially closed",
              "CDU pump status. Coolant loop pressure differential. Leak sensors. Physical inspection of valves.",
              "Check pump operation. Switch to redundant pump if available. Locate blockage or leak. Do not operate at below-spec flow — GPU temperatures will rise."
            ],
            [
              "High ΔT (supply−return wider than normal)",
              "Higher than expected heat load, reduced flow rate, supply temperature dropped (ΔT widens for same Q)",
              "Verify flow rate unchanged. Check IT workload (has GPU utilization increased?). Check supply temperature.",
              "If flow unchanged and load unchanged: investigate facility water supply temperature. If load increased: verify adequate cooling capacity for new load."
            ],
            [
              "Abnormally low ΔT",
              "Short-circuit path in coolant loop (coolant bypassing IT equipment), very high flow rate, very low IT load",
              "Check flow rate. Check IT workload / GPU utilization. Inspect loop for bypass paths or misconfigured valves.",
              "If flow rate unexpectedly high: check pump settings. If bypass suspected: inspect loop configuration. Low load is expected during idle — correlate with workload."
            ],
            [
              "CDU pump failure alarm",
              "Pump mechanical failure, power supply issue, control system fault",
              "CDU pump status indicator. Power supply to pump. Pump current draw. CDU controller logs.",
              "Switch to redundant pump if N+1 design. Alert mechanical/facilities team. If no redundancy: reduce/suspend IT load to avoid GPU overheating, emergency repair."
            ],
            [
              "CDU not maintaining supply temperature setpoint",
              "Facility water supply temperature too high, heat exchanger fouling/scaling, CDU capacity undersized for current load",
              "Facility water temperature at CDU primary inlet. CDU heat exchanger condition. Current IT load vs CDU rated capacity.",
              "Check facility water supply (chiller issue upstream?). Schedule CDU heat exchanger inspection/cleaning. If load exceeds CDU capacity: reduce IT load or add CDU capacity."
            ],
            [
              "High facility water temperature (to CDU primary)",
              "Chiller failure or underperformance, cooling tower issue, economizer temperature too high for current ambient",
              "Chiller status and alarms. Cooling tower fan and water level status. Ambient temperature (economizer mode check).",
              "Switch to standby chiller if available. Check cooling tower operation. If in economizer mode and ambient too warm: switch to mechanical cooling (chiller)."
            ],
            [
              "Chiller failure",
              "Compressor fault, refrigerant issue, electrical fault, control system failure",
              "Chiller controller fault codes. Utility power supply. Refrigerant pressure. BMS alarms.",
              "Switch to standby chiller (N+1 design). Alert facilities/chiller service. Monitor CDU supply temperature closely — will rise if no standby available. Reduce IT load to protect hardware."
            ],
            [
              "Leak detection alarm",
              "Quick-disconnect fitting leak, pipe joint leak, CDU internal leak, manifold connection leak",
              "Identify which sensor triggered. Visual inspection of area. CDU loop pressure drop. Flow rate change.",
              "Isolate affected section (close valves). If automated shutoff available: activate. Locate exact leak source. Dry affected areas. Repair. Pressure test before restart. Inspect electronics for water damage before re-powering."
            ],
            [
              "Manifold restriction (high pressure drop across manifold)",
              "Debris in manifold, partial valve closure, manifold fouling over time",
              "Measure pressure at manifold inlet vs outlet. Compare flow rates on affected vs unaffected servers.",
              "Schedule manifold flushing or cleaning. Check valves fully open. If debris: flush and inspect filter elements."
            ],
            [
              "Trapped air in cooling loop",
              "Air introduced during installation, maintenance, or topping up fluid; inadequate air purging during commissioning",
              "Unusual flow noise (gurgling). Flow rate lower than expected. Intermittent cooling performance.",
              "Use air bleed/purge valves at high points in the system. Proper commissioning procedures include air purge. If repeated air ingress: check for leak path where air is entering."
            ],
            [
              "GPU thermal throttling (all GPUs or cluster-wide)",
              "Systematic cooling chain issue (CDU, facility water), unusual ambient conditions, sustained workload beyond cooling design",
              "Check cooling chain end-to-end. Verify CDU operation. Check ambient temperature in server room. Compare current workload vs design workload.",
              "Identify and fix root cause in cooling chain. Thermal throttling is a symptom — the problem is upstream in cooling infrastructure."
            ],
          ]}
        />
      </section>

      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting AI Cooling Problems</h2>
        <p style={S.p}><strong>Systematic approach — start from GPU, go upstream:</strong></p>
        <ol style={S.ol}>
          <li><strong>Identify affected GPUs:</strong> Which specific GPUs are showing high temperature? One GPU, all GPUs in a server, or all GPUs in a rack?</li>
          <li><strong>Check GPU-level:</strong> Is throttling occurring (clock speed reduced)? Temperature vs GPU-specific thermal limit. Cold plate properly seated?</li>
          <li><strong>Check server-level:</strong> All cold plates connected? No visible leaks at server connections? Flow rate to this server normal?</li>
          <li><strong>Check rack manifold:</strong> Manifold pressure normal? Flow rate to rack normal? Any partial blockage? Leak sensors status?</li>
          <li><strong>Check CDU:</strong> CDU supply temperature? Return temperature delta-T normal? Flow rate normal? Pump status? CDU alarms?</li>
          <li><strong>Check facility:</strong> Chiller outlet temperature? Cooling tower operation? Facility water supply temperature?</li>
          <li><strong>Isolate and fix:</strong> Identify the layer with the problem and fix it specifically. Don't guess — data-driven diagnosis.</li>
        </ol>
        <Callout type="best-practice" title="Runbooks Pehle Se Banao">
          A chaotic response during a cooling failure can cause expensive GPU damage. There should be written runbooks for common failure scenarios — step-by-step procedures, escalation contacts, automatic shutoff thresholds. The O&M team should be familiar with these procedures before the first failure, not during.
        </Callout>
      </section>

      <section id="retrofit-vs-greenfield">
        <h2 style={S.h2}>Retrofit vs Greenfield</h2>
        <ComparisonTable
          title="Retrofit vs Greenfield for AI Liquid Cooling"
          headers={["Factor", "Retrofit (Existing Facility)", "Greenfield (New Facility)"]}
          rows={[
            ["Upfront cost", "Lower (existing structure)", "Higher (full construction)"],
            ["Timeline", "Faster if modest changes", "Longer construction cycle"],
            ["Liquid cooling integration", "Complex — existing infrastructure constraints", "Clean design from scratch"],
            ["Density achievable", "Limited by existing power/cooling infrastructure", "Design to target density"],
            ["Disruption", "Operational disruption during retrofit", "No impact to existing operations"],
            ["Risk", "Unknown structural/infrastructure surprises", "Predictable with good planning"],
            ["Cooling efficiency", "Constrained by existing design", "Optimized for AI workloads"],
            ["Best for", "Moderate density upgrade, limited budget", "Large scale, long-term, high density AI"],
          ]}
        />
        <p style={S.p}>
          Many organizations start with retrofit — deploying liquid cooling in existing facilities with modifications. As AI scale grows, greenfield AI-optimized data centers become more common. The choice depends on timeline, budget, density requirements, and existing facility condition.
        </p>
      </section>

      <section id="real-world-arch">
        <h2 style={S.h2}>Real-World AI Data Center Cooling Architecture</h2>
        <p style={S.p}><strong>Typical production AI data center cooling design:</strong></p>
        <ul style={S.ul}>
          <li><strong>Outdoor:</strong> Cooling tower (evaporative, primary heat rejection) + Dry cooler (economizer, water-free heat rejection) + Chiller plant (N+1 or 2N mechanical refrigeration)</li>
          <li><strong>Facility distribution:</strong> Chilled water and condenser water piping, chemical treatment systems, expansion tanks, pressurization</li>
          <li><strong>CDU room:</strong> Multiple CDUs (per cooling zone), secondary loop pumps, leak detection, monitoring integration</li>
          <li><strong>AI server room:</strong> GPU racks with DLC, rack manifolds, per-rack leak detection, temperature monitoring per GPU</li>
          <li><strong>Supplementary air cooling:</strong> CRAC/CRAH for networking rows, storage, management equipment</li>
          <li><strong>Monitoring:</strong> BMS integration, DCGM GPU telemetry, CDU monitoring, all into unified operations dashboard</li>
        </ul>
        <p style={S.p}>
          Actual implementation varies significantly by scale, location, hardware platform, and facility constraints. No two AI data centers are identical — each is designed for its specific requirements.
        </p>
      </section>

      <section id="design-checklist">
        <h2 style={S.h2}>AI Cooling Design Checklist</h2>
        <ul style={S.ul}>
          <li>☐ <strong>Density calculation:</strong> Per-rack power calculated from actual server TDP specs + networking + headroom</li>
          <li>☐ <strong>Cooling technology selected:</strong> Air, DLC, immersion, or hybrid — matched to actual density</li>
          <li>☐ <strong>Manufacturer specifications:</strong> CDU fluid type, temperature setpoints, flow rates verified against server OEM requirements</li>
          <li>☐ <strong>CDU sizing and redundancy:</strong> CDU capacity sufficient for peak IT load. Redundancy level (N, N+1, 2N) according to project availability requirements and design basis</li>
          <li>☐ <strong>Chiller sizing:</strong> Total cooling load calculated, chiller capacity sufficient with redundancy</li>
          <li>☐ <strong>Economizer feasibility:</strong> Climate analyzed, higher supply water temperature checked with OEM, free cooling hours estimated</li>
          <li>☐ <strong>Water quality plan:</strong> Primary loop chemistry treatment, secondary loop fluid specification, monitoring intervals</li>
          <li>☐ <strong>Leak detection:</strong> Sensors at CDU, manifolds, rack level, and floor; drip trays; response procedure documented</li>
          <li>☐ <strong>Monitoring:</strong> GPU temperature and clock speed per GPU; CDU supply/return temperatures; flow rates; facility cooling metrics — all monitored with alerts</li>
          <li>☐ <strong>Throttling baseline:</strong> GPU temperature and clock speed benchmarked under load before production use</li>
          <li>☐ <strong>PUE and WUE targets:</strong> Defined, measured, tracked over time</li>
          <li>☐ <strong>Runbooks:</strong> Cooling failure procedures written, tested, team trained</li>
          <li>☐ <strong>Growth planning:</strong> Cooling infrastructure scale-out path defined before hitting capacity</li>
          <li>☐ <strong>Vendor support:</strong> CDU and cooling system vendor support contracts in place</li>
        </ul>
      </section>

      <section id="technical-references">
        <h2 style={S.h2}>Technical References</h2>
        <p style={S.p}>
          These publicly available documents are authoritative references for AI cooling engineering. Treat them as the primary source for site design, equipment selection, and operational decisions.
        </p>
        <ul style={S.ul}>
          <li>
            <strong>ASHRAE TC 9.9 — AI Data Center Framework</strong><br /> Publisher: ASHRAE TC 9.9<br /> What it covers: Thermal and environmental design guidance specifically for AI/GPU data centers, including high-density rack considerations, liquid cooling integration, and updated W-class guidance for AI workloads.<br /> URL: <a href="https://www.ashrae.org/technical-resources/ai-data-center-framework" style={{ color: "#2563eb" }}>https://www.ashrae.org/technical-resources/ai-data-center-framework</a>
          </li>
          <li>
            <strong>ASHRAE TC 9.9 — Thermal Guidelines for Data Processing Environments</strong><br /> Publisher: ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers)<br /> What it covers: IT equipment environmental classes (A1–A4, W-classes), recommended/allowable temperature and humidity ranges (including dew-point envelope), data center thermal design guidance.<br /> URL: <a href="https://www.ashrae.org/technical-resources/bookstore/datacom-series" style={{ color: "#2563eb" }}>https://www.ashrae.org/technical-resources/bookstore/datacom-series</a>
          </li>
          <li>
            <strong>ASHRAE — Data Center Power Equipment Thermal Guidelines and Best Practices</strong><br />
            Publisher: ASHRAE TC 9.9<br />
            What it covers: Power equipment (UPS, PDU) thermal management in data centers, complementary to IT equipment guidelines.<br />
            URL: <a href="https://www.ashrae.org/technical-resources/bookstore/datacom-series" style={{ color: "#2563eb" }}>https://www.ashrae.org/technical-resources/bookstore/datacom-series</a>
          </li>
          <li>
            <strong>Open Compute Project (OCP) — Liquid Cooling Documentation</strong><br />
            Publisher: Open Compute Project<br />
            What it covers: Cold plate specifications, CDU interface standards, manifold designs, liquid cooling interoperability specifications for open hardware platforms.<br />
            URL: <a href="https://www.opencompute.org/wiki/Server/Thermal" style={{ color: "#2563eb" }}>https://www.opencompute.org/wiki/Server/Thermal</a>
          </li>
          <li>
            <strong>NVIDIA DGX H100 System User Guide</strong><br /> Publisher: NVIDIA Corporation<br /> What it covers: DGX H100 system specifications including power consumption (~10.2 kW max per server), airflow and thermal requirements (air-cooled system — verify rack airflow capacity and operating temperature range), and rack integration requirements.<br /> URL: <a href="https://docs.nvidia.com/dgx/dgxh100-user-guide/" style={{ color: "#2563eb" }}>https://docs.nvidia.com/dgx/dgxh100-user-guide/</a>
          </li>
          <li>
            <strong>NVIDIA GB200 NVL72 Documentation</strong><br />
            Publisher: NVIDIA Corporation<br />
            What it covers: GB200 NVL72 rack-scale system specifications, power and cooling requirements for 100+ kW rack-level deployments.<br />
            URL: <a href="https://www.nvidia.com/en-us/data-center/gb200-nvl72/" style={{ color: "#2563eb" }}>https://www.nvidia.com/en-us/data-center/gb200-nvl72/</a>
          </li>
          <li>
            <strong>Vertiv — Liquid Cooling Reference Designs and White Papers</strong><br />
            Publisher: Vertiv Co.<br />
            What it covers: CDU design considerations, AI data center cooling architecture reference designs, thermal management white papers for high-density deployments.<br />
            URL: <a href="https://www.vertiv.com/en-us/products-catalog/thermal-management/" style={{ color: "#2563eb" }}>https://www.vertiv.com/en-us/products-catalog/thermal-management/</a>
          </li>
        </ul>
        <Callout type="important" title="URLs May Change Over Time">
          The URLs given above were valid at the time of publication. Documents may be updated or reorganized. If a URL is dead, search the publisher website by document title. Latest versions will be found on the ASHRAE bookstore and NVIDIA documentation portal.
        </Callout>
      </section>

      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li><strong>AI rack power density is fundamentally different from traditional data centers:</strong> GPU servers each consuming 10+ kW, with multiple servers in one rack, means 40–100+ kW. In high-density AI deployments, the practical limits of traditional air cooling can be reached quickly; liquid cooling may be preferred or necessary in many high-density deployments, but the actual requirement depends on server OEM specifications and facility design.</li>
          <li><strong>The CDU is a critical barrier between facility water and IT equipment:</strong> The CDU keeps the two loops physically separate — facility water (with chemical treatment) never directly contacts IT equipment. This separation protects IT hardware and enables control of fluid specifications.</li>
          <li><strong>Thermal throttling is a silent performance killer:</strong> When GPU temperature approaches the limit, firmware automatically reduces clock speed. The GPU appears "running" but throughput drops. GPU utilization percentage alone is insufficient — monitor clock speed simultaneously too.</li>
          <li><strong>Cooling planning is necessary before hardware procurement:</strong> Plan and procure liquid cooling infrastructure (CDU, piping, facility modifications) before or alongside AI hardware. Retrofitting is expensive and disruptive. Manufacturer specifications are the primary reference — not generic rules.</li>
          <li><strong>Leak detection is mandatory, not optional:</strong> The combination of liquid coolant and electronics causes catastrophic damage. Multi-layer leak detection (CDU, manifold, rack, floor), drip trays, automatic shutoffs, and tested response procedures — all are day-one requirements.</li>
          <li><strong>Understand PUE in context:</strong> PUE is a useful metric but should not be the sole focus. Evaluate it holistically together with GPU utilization, training throughput, water usage (WUE), and total cost per useful AI compute. A very low PUE at the cost of other factors is the wrong optimization.</li>
          <li><strong>Hybrid cooling is common:</strong> DLC for high-density GPU racks, air cooling for lower-density networking and storage — within the same facility. It is not a binary "all liquid" or "all air" choice.</li>
          <li><strong>Monitor the cooling chain end-to-end:</strong> From the GPU chip to the cooling tower — every link should be monitored. A CDU issue or chiller problem can cause GPU throttling. Looking only at GPU temperature will not identify a cooling chain problem.</li>
          <li><strong>Maximize economizer opportunities:</strong> GPU servers that accept higher supply water temperature + a moderate climate = significant free cooling hours = lower PUE and energy costs. Carefully check manufacturer temperature specs.</li>
          <li><strong>Build runbooks the first time:</strong> Figuring out what to do in the middle of a cooling failure is expensive. Written procedures for common failure scenarios, escalation contacts, and automatic shutoff thresholds should be ready before first production deployment.</li>
        </ul>
      </section>

    </article>
  );
}
