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
          <TopicLink slug="gpu-cluster" variant="inline" /> article mein aapne padha ki GPU servers enormous compute power provide karte hain. Lekin is compute ke saath aata hai ek fundamental physics problem: bijli jo compute karta hai woh sabhi heat mein convert hoti hai. Aur AI GPU servers bahut zyada bijli consume karte hain.
        </p>
        <p style={S.p}>
          Ek single NVIDIA DGX H100 server approximately 10.2 kW consume karta hai. Ek rack mein 4 aisi servers = 40+ kW sirf compute se. Purane data centers jo 10–20 kW per rack ke liye design the, unke liye yeh physically impossible hai cool karna without significant changes.
        </p>
        <p style={S.p}>
          AI Cooling un technologies, architectures aur engineering decisions ka complete domain hai jo ensure karte hain ki GPU servers safe operating temperatures pe kaam karein — taaki thermal throttling na ho, hardware damage na ho, aur expensive compute apni full capability deliver kare.
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
          Physics ka ek fundamental law: electrical energy ultimately heat mein convert hoti hai. GPU jo compute karta hai — matrix multiplications, gradient calculations — sab kuch heat produce karta hai. Yeh heat kahin jaani chahiye.
        </p>
        <p style={S.p}>
          Agar heat properly remove nahi ki jaaye, GPU temperature badh ti hai. GPU firmware temperature detect karke automatically clock speed reduce karta hai — thermal throttling. Performance drops. Expensive AI training slower ho jaati hai. Agar temperature aur badhti hai, hardware damage aur eventual failure possible hai.
        </p>
        <p style={S.p}>
          AI cooling simply "servers ko thanda rakhna" nahi hai — yeh directly AI training throughput, hardware reliability, aur return on investment determine karta hai.
        </p>
      </section>

      <section id="heat-density-challenge">
        <h2 style={S.h2}>Heat Density Challenge</h2>
        <p style={S.p}>
          The fundamental problem: AI GPU servers ki power density traditional servers se orders of magnitude zyada hai.
        </p>
        <Figure caption="Rack Heat Density Comparison: Traditional enterprise approximately 10-20 kW, high-performance compute approximately 20-30 kW, AI GPU rack (DGX H100 class) approximately 40-60 kW, latest generation AI GPU rack (GB200 NVL72 class) 100+ kW possible. Values are illustrative ranges — actual numbers depend on hardware, configuration, and workload.">
          <RackHeatDensity />
        </Figure>
        <p style={S.p}>
          Traditional CRAC/CRAH air cooling systems jo conventional data centers mein use hote hain, unki per-rack cooling capacity typically 10–30 kW range mein hoti hai (exact limit facility design pe depend karta hai). AI GPU racks is limit se kaafi exceed kar sakte hain.
        </p>
        <Callout type="important" title="Power Density Manufacturer Specs Se Verify Karo">
          Kisi bhi specific AI server ka actual power consumption uske manufacturer specifications se verify karo. Rack power density calculation: servers per rack × per-server TDP + networking + management equipment + 10–20% headroom. Aur TDP peak load pe hai — real workloads alag ho sakte hain. Always manufacturer's approved power distribution configuration follow karo.
        </Callout>
      </section>

      <section id="physics-of-heat">
        <h2 style={S.h2}>Physics of Heat Removal</h2>
        <p style={S.p}>
          Heat removal ki efficiency depend karti hai cooling medium ki specific heat capacity pe — ek material kitni heat absorb kar sakta hai per unit mass per degree temperature rise.
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
          Water ki specific heat capacity (per unit <em>mass</em>) air se approximately 4 guna zyada hoti hai — 4.18 kJ/kg·K vs ~1 kJ/kg·K. Lekin ek important distinction: yeh mass-basis comparison hai. Density difference (water air se ~800× denser) ki wajah se volumetric heat capacity aur bhi dramatically different hai. Practical implication: same pipe mein same flow rate pe water air ke mukable orders of magnitude zyada heat carry kar sakta hai. Yahi reason hai ki high-density AI racks ke liye liquid cooling air cooling se fundamentally more effective hoti hai — lekin "4× better" sirf mass basis pe hai, real-world advantage kaafi zyada hota hai.
        </p>
        <p style={S.p}><strong>Engineering Formula — Heat Removal:</strong></p>
        <p style={S.p}>
          <strong>Q = ṁ × Cₚ × ΔT</strong>
        </p>
        <ul style={S.ul}>
          <li><strong>Q</strong> = heat removed (watts ya kW)</li>
          <li><strong>ṁ</strong> = mass flow rate of coolant (kg/s)</li>
          <li><strong>Cₚ</strong> = specific heat of coolant (kJ/kg·K)</li>
          <li><strong>ΔT</strong> = temperature rise of coolant (supply → return, in °C or K)</li>
        </ul>
        <p style={S.p}><strong>Illustrative worked example</strong> (values approximate, for concept only — actual values depend on system design and OEM specs):</p>
        <p style={S.p}>
          Suppose ek CDU secondary loop mein water flow karta hai at ṁ = 2 kg/s, Cₚ = 4.18 kJ/kg·K, aur supply temperature 20°C se return temperature 30°C tak warm hoti hai (ΔT = 10°C).
        </p>
        <p style={S.p}>
          Q = 2 × 4.18 × 10 = <strong>83.6 kW</strong> heat removed.
        </p>
        <p style={S.p}>
          Yeh formula cooling system design mein fundamental hai — CDU sizing, flow rate selection, aur ΔT monitoring sabmein yeh directly apply hota hai. Actual design calculations qualified mechanical engineers ke saath aur OEM specifications ke according karni chahiye.
        </p>
      </section>

      <section id="temp-humidity">
        <h2 style={S.h2}>Temperature &amp; Humidity Management</h2>
        <p style={S.p}>
          Cooling sirf heat remove karne ke baare mein nahi hai — IT equipment ke liye temperature aur humidity dono ko appropriate ranges mein rakhna zaruri hai. ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers) TC 9.9 committee IT equipment ke liye thermal guidelines publish karta hai jo industry standard reference hai.
        </p>
        <h3 style={S.h3}>Air-Cooled IT Equipment — ASHRAE Temperature Classes</h3>
        <p style={S.p}>
          ASHRAE TC 9.9 ne air-cooled IT equipment ke liye environment classes define kiye hain. <strong>Recommended</strong> range woh hai jisme most IT equipment reliably operate karta hai without derating. <strong>Allowable</strong> range broader hai lekin equipment lifespan ya reliability pe impact possible hai.
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
          18–27°C recommended inlet temperature hai — yeh woh range hai jisme IT equipment optimal aur reliable operation ke liye designed hai. Allowable range wider hai (class-specific) lekin allowable range mein regularly operate karna equipment stress badha sakta hai. Data center operations mein recommended range maintain karna best practice hai. Specific equipment ka refer karo manufacturer documentation — har device ka apna spec hota hai.
        </Callout>
        <h3 style={S.h3}>Temperature Measurement Points</h3>
        <ul style={S.ul}>
          <li><strong>Cold Aisle / Rack Inlet:</strong> Server ka intake temperature — yahi ASHRAE specs ke against compare karte hain. Target: 18–27°C recommended range.</li>
          <li><strong>Hot Aisle / Rack Exhaust:</strong> Server se exhaust hot air temperature — typically 10–15°C+ warmer than inlet depending on server load. Monitor karo lekin IT equipment spec yahan nahi hoti.</li>
          <li><strong>Return Air to Cooling Unit:</strong> CRAC/CRAH ko wapas jaane wali air — cooling unit efficiency determine karta hai.</li>
          <li><strong>Room Average:</strong> General ambient — spot checks aur trending ke liye useful.</li>
        </ul>
        <h3 style={S.h3}>Humidity — RH vs Dew Point</h3>
        <p style={S.p}>
          Humidity control ke liye two metrics matter karte hain:
        </p>
        <ul style={S.ul}>
          <li><strong>Relative Humidity (RH):</strong> Air mein actual moisture vs air ki maximum moisture holding capacity at that temperature, percentage mein. ASHRAE TC 9.9 RH limits equipment class aur dew-point limits ke saath specify karta hai — RH alone sufficient indicator nahi hai. Specific limits current ASHRAE TC 9.9 edition aur applicable equipment class (A1–A4) se verify karo; koi single "recommended RH range" sabpe apply nahi hoti.</li>
          <li><strong>Dew Point:</strong> Temperature jiski neeche air cool hone pe moisture condense ho jaati hai. Dew point ek absolute measure hai — temperature pe dependent nahi. ASHRAE TC 9.9 dew-point based limits specify karta hai jo RH-only limits se zyada robust hain. ASHRAE recommended envelope conventionally express hoti hai as: lower bound ~5.5°C dew point (below this ESD risk increases) aur upper bound ~60% RH combined with ~15°C dew point maximum — yeh ek "zone" hai, not a simple single range. Always current ASHRAE TC 9.9 edition aur applicable equipment class verify karo.</li>
        </ul>
        <p style={S.p}>
          Dew point metric practically zyada useful hai: agar dew point janein, toh pata hai ki kisi bhi surface jo us temperature se cool ho uske pe condensation risk hai. ASHRAE TC 9.9 recommended envelope ek humidity zone define karta hai (roughly 5.5°C dew point lower bound se 60% RH / ~15°C dew point upper bound tak) — yeh ek envelope hai, simple linear range nahi. Specific equipment class aur current ASHRAE TC 9.9 edition se exact limits verify karo.
        </p>
        <h3 style={S.h3}>Condensation Risk</h3>
        <p style={S.p}>
          Condensation — liquid water forming on electronic components — serious hazard hai. Short circuits, corrosion, aur hardware failure cause karta hai.
        </p>
        <ul style={S.ul}>
          <li>Risk tab hoti hai jab kisi surface ka temperature room dew point se neeche ho</li>
          <li>Liquid cooling systems mein: agar cold plate ya coolant supply temperature bahut low ho relative to room humidity, cold surfaces pe condensation possible hai</li>
          <li>Server room mein warm humid outside air ka sudden ingress (door open karne se) bhi condensation spike create kar sakta hai</li>
          <li>Mitigation: dew point monitor karo, supply coolant temperature dew point se upar rakhno (with appropriate margin), HVAC properly commission karo</li>
        </ul>
        <h3 style={S.h3}>Low Humidity — ESD Risk</h3>
        <p style={S.p}>
          Very low humidity — below applicable ASHRAE class dew-point lower limit (follow current ASHRAE TC 9.9 aur OEM specification) — ESD (Electrostatic Discharge) risk badha deta hai. Dry air mein static electricity easily build up hoti hai aur discharge se sensitive electronics damage ho sakte hain. Data centers mein ESD-safe procedures (antistatic mats, wrist straps, proper grounding) important hain, especially low-humidity conditions mein.
        </p>
        <h3 style={S.h3}>Liquid Cooling Temperature Context</h3>
        <p style={S.p}>
          Liquid cooling ke liye temperature specifications alag hoti hain aur server OEM documentation se verify karne chahiye. Different loops alag temperatures pe operate karte hain:
        </p>
        <ul style={S.ul}>
          <li><strong>Facility water (primary loop):</strong> Chiller se aane wala water — temperature facility design pe depend karti hai aur ASHRAE W-class (W17, W27, W32 etc.) se correspond karti hai. W17 class facilities ~17°C max supply temperature pe design hoti hain, higher W-classes warmer supply allow karte hain. Actual value facility-specific hai.</li>
          <li><strong>CDU secondary loop supply:</strong> IT equipment ko jaane wala cooled fluid — temperature <strong>server OEM specification se determine hoti hai</strong>. Yeh server-se-server vary karta hai aur ek universal range nahi hai. CDU secondary loop temperature server OEM documentation mein specified maximum inlet coolant temperature se exceed nahi karni chahiye.</li>
          <li><strong>CDU secondary loop return:</strong> IT equipment se wapas aata warm fluid — supply se ΔT warmer (system design pe depend).</li>
          <li><strong>GPU cold plate surface:</strong> Coolant temperature + thermal resistance ke according GPU junction temperature significantly higher hoti hai.</li>
        </ul>
        <Callout type="warning" title="Liquid Cooling Temperatures Universal Nahi Hain">
          Upar diye gaye temperature ranges indicative hain. Har liquid-cooled server platform ka apna OEM-specified coolant temperature range hota hai — inlet temperature limits, maximum allowable return temperature, aur required ΔT. Yeh specs har platform pe alag hote hain. Always specific server OEM documentation primary reference maano.
        </Callout>
      </section>

      <section id="air-cooling">
        <h2 style={S.h2}>Air Cooling</h2>
        <p style={S.p}>
          Traditional data center cooling mein CRAC (Computer Room Air Conditioning) ya CRAH (Computer Room Air Handler) units hote hain. Yeh units cooled air produce karte hain jo server racks through flow karta hai, heat absorb karta hai, aur warm air return plenum se back to cooling units jaata hai.
        </p>
        <p style={S.p}><strong>CRAC vs CRAH:</strong></p>
        <ul style={S.ul}>
          <li><strong>CRAC:</strong> Self-contained unit — apna compressor, condenser, evaporator sab andar hota hai. Self-sufficient lekin less efficient at scale.</li>
          <li><strong>CRAH:</strong> Chilled water use karta hai central chiller plant se. Zyada efficient at large scale, central chiller plant required.</li>
        </ul>
        <p style={S.p}>
          Air cooling existing data centers mein well-understood, widely deployed, aur relatively simple hai. Low-density compute ke liye adequate rehta hai.
        </p>
      </section>

      <section id="containment">
        <h2 style={S.h2}>Hot Aisle / Cold Aisle Containment</h2>
        <p style={S.p}>
          Server racks typically front se cold air intake karte hain aur back se hot air exhaust karte hain. Agar racks randomly arrange kiye jaayein, cold aur hot air mix ho jaati hai — efficiency drops.
        </p>
        <p style={S.p}>
          Hot aisle/cold aisle arrangement mein: alternating rows of racks facing each other. Cold aisles mein rack fronts face karte hain — cooled air yahan supply hoti hai. Hot aisles mein rack backs face karte hain — exhaust air yahan collect hoti hai aur cooling units wapas jaati hai.
        </p>
        <p style={S.p}>
          Containment is concept ko further improve karta hai — physical barriers (aisle caps, doors, ceiling) hot aur cold air ko completely separate karte hain. Bypass airflow eliminate hoti hai. Cooling efficiency improve hoti hai.
        </p>
        <Callout type="important" title="Containment Cooling Capacity Increase Nahi Karta">
          Yeh ek common misunderstanding hai. Containment existing cooling capacity ko zyada efficiently use karta hai — lekin total heat removal capacity nahi badhaata. Agar racks ki heat output facility cooling capacity se exceed karti hai, containment solve nahi kar sakta. High-density AI racks ke liye containment necessary lekin insufficient hoti hai akele.
        </Callout>
      </section>

      <section id="air-cooling-limits">
        <h2 style={S.h2}>Air Cooling Limits for AI</h2>
        <p style={S.p}>
          Air cooling ki practical limits primarily determined hoti hain by: available airflow volume, temperature differential (supply vs return air), aur air's physical heat capacity.
        </p>
        <p style={S.p}>
          Modern GPU servers aur AI accelerators ki heat flux (watts per unit area) itni high hoti hai ki air cooling adequately manage karna increasingly challenging ho jaata hai. Specific density limits facility design pe depend karte hain — koi universal threshold nahi hai. Sufficiently high rack densities pe, jab air cooling facility design ki physical limits approach karne lagti hai, liquid cooling necessary ya strongly preferred ho sakti hai. Lekin yeh determination har deployment ke liye server design, actual rack density, aur specific facility cooling capability ke basis pe karni chahiye — blanket statement nahi hai ki har AI rack ko liquid cooling chahiye.
        </p>
        <p style={S.p}><strong>Air cooling ke limitations AI context mein:</strong></p>
        <ul style={S.ul}>
          <li>High acoustic noise — powerful fans required high-density servers cool karne ke liye</li>
          <li>Power consumption — fan power ek significant overhead hoti hai</li>
          <li>Airflow distribution — ensuring uniform cooling across all components challenging</li>
          <li>Physical heat removal capacity ceiling</li>
        </ul>
      </section>

      <section id="liquid-cooling-intro">
        <h2 style={S.h2}>Liquid Cooling — Introduction</h2>
        <p style={S.p}>
          Liquid cooling mein heat transfer medium air ki jagah liquid hoti hai — typically water ya dielectric fluid. Liquid ki superior heat capacity aur direct component contact possibilities AI GPU servers ke liye much more effective cooling enable karte hain.
        </p>
        <p style={S.p}>
          Liquid cooling several forms mein aata hai — CDU-based direct liquid cooling (most common for AI), rear-door heat exchangers, aur immersion cooling. Har approach ke alag tradeoffs hain.
        </p>
        <Callout type="best-practice" title="Liquid Cooling Planning Pehle Karo — Hardware Baad Mein">
          Liquid cooling infrastructure (CDU, piping, manifolds, facility water connections) planning aur procurement AI hardware procurement se pehle ya saath mein karo. Retroactively liquid cooling add karna expensive aur disruptive hota hai. Manufacturer specifications carefully read karo — liquid cooling compatibility, fluid type, temperature setpoints sab specific hote hain.
        </Callout>
      </section>

      <section id="ashrae-liquid-classes">
        <h2 style={S.h2}>ASHRAE Liquid Cooling Classes (W-Classes)</h2>
        <p style={S.p}>
          ASHRAE TC 9.9 ne liquid cooling ke liye bhi facility water supply temperature classes define ki hain — commonly "W-classes" kehte hain. Yeh classes facility side (TCS — Thermal Control System / chiller loop) ke water supply temperature define karti hain, not universal GPU coolant temperatures.
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
        <Callout type="important" title="W-Classes Facility/TCS Water Ko Define Karte Hain — GPU Temperature Ko Nahi">
          Yeh ek critical distinction hai jo often confuse hoti hai. W-classes facility water supply temperature (jo CDU primary side pe aata hai) define karte hain — yeh IT equipment ke andar coolant temperature ya GPU junction temperature specify nahi karte. Actual IT coolant loop (CDU secondary side) ki temperature aur GPU ko acceptable supply temperature server OEM documentation mein specifically stated hoti hai. W-class reference facility infrastructure design ke liye hai.
        </Callout>
        <p style={S.p}><strong>Practical implication:</strong> Higher W-class (W32, W40, W45) facility design karne se economizer operation ke more hours milte hain — chiller bypass ho sakta hai jab outside conditions allow karein. Modern AI liquid-cooled servers jo higher coolant temperatures accept kar sakte hain, unhe W32 ya W40 class facility water se serve karna energy-efficient approach hai. Lekin specific server ka OEM spec confirm karna zaruri hai ki woh server us temperature range mein operate kar sakta hai.</p>
      </section>

      <section id="heat-removal-formula">
        <h2 style={S.h2}>Heat Removal Engineering Formula</h2>
        <p style={S.p}>
          Cooling system design mein fundamental engineering formula yeh hai:
        </p>
        <p style={S.p}><strong>Q = ṁ × Cₚ × ΔT</strong></p>
        <ul style={S.ul}>
          <li><strong>Q</strong> — Heat removed (watts ya kW)</li>
          <li><strong>ṁ</strong> — Mass flow rate of coolant (kg/s)</li>
          <li><strong>Cₚ</strong> — Specific heat capacity of coolant (kJ/kg·K) — water ke liye ~4.18, dielectric fluids ke liye alag</li>
          <li><strong>ΔT</strong> — Temperature difference: coolant supply se return tak (°C ya K)</li>
        </ul>
        <p style={S.p}><strong>Illustrative example</strong> (concept demonstration only — actual system values OEM specifications aur qualified engineering se determine karo):</p>
        <p style={S.p}>
          Ek CDU secondary loop mein water 2 kg/s flow kar raha hai. Supply temperature 22°C, return temperature 32°C (ΔT = 10°C).
        </p>
        <p style={S.p}>
          Q = 2 × 4.18 × 10 = <strong>83.6 kW</strong>
        </p>
        <p style={S.p}>
          Yeh formula practically use hota hai: CDU sizing ke liye (kitni heat remove karni hai?), flow rate determine karne ke liye (given Q aur acceptable ΔT), aur monitoring mein ΔT drift detect karne ke liye (ΔT increase at same flow = more heat load, ya blockage, ya supply temp change).
        </p>
        <Callout type="best-practice" title="ΔT Monitoring Real-Time Operations Mein">
          CDU supply aur return temperatures monitor karo aur ΔT calculate karo. Agar ΔT unexpectedly badh jaaye same flow rate pe — cooling load increase hua hai ya supply temperature badhi hai. Agar ΔT unexpectedly kam ho jaaye — flow rate badha hai, ya short-circuit path hai coolant loop mein. ΔT trend data cooling system health ka early indicator hai.
        </Callout>
      </section>

      <section id="cdu">
        <h2 style={S.h2}>CDU — Cooling Distribution Unit</h2>
        <p style={S.p}>
          CDU AI data center liquid cooling architecture ka heart hai. Yeh ek heat exchanger hai jo facility cooling water aur IT equipment ke dedicated secondary liquid loop ke beech thermal exchange provide karta hai.
        </p>
        <Figure caption="CDU Liquid Cooling Architecture: Facility chiller provides cold water to CDU. CDU acts as thermal barrier — separating facility water loop (with chemical treatment) from IT secondary loop (IT-safe clean fluid). Secondary loop carries cooled fluid to rack manifolds and GPU cold plates. Warm fluid returns to CDU, heat transfers to facility water, which returns to chiller. Two loops never mix.">
          <CduArchitecture />
        </Figure>
        <p style={S.p}><strong>CDU ke primary functions:</strong></p>
        <ul style={S.ul}>
          <li><strong>Heat Exchange:</strong> Facility water aur secondary IT loop ke beech heat transfer karta hai.</li>
          <li><strong>Loop Isolation:</strong> Facility water (chemical treatment, potential contaminants) IT equipment se kabhi direct contact nahi karta.</li>
          <li><strong>Pumping:</strong> Secondary loop mein fluid circulation ke liye pumps.</li>
          <li><strong>Monitoring:</strong> Temperature, pressure, flow rate sensors — anomaly detection ke liye.</li>
          <li><strong>Control:</strong> Secondary loop temperature aur flow rate regulate karta hai server requirements ke according.</li>
        </ul>
        <p style={S.p}><strong>CDU deployment patterns:</strong></p>
        <ul style={S.ul}>
          <li><strong>Per-rack CDU:</strong> Har GPU rack ke liye dedicated CDU. Maximum isolation aur control. Higher cost.</li>
          <li><strong>Row-level CDU:</strong> Ek CDU multiple racks serve karta hai ek row mein.</li>
          <li><strong>Cluster CDU:</strong> Large CDU multiple rows ya zones serve karta hai. Economies of scale lekin more complex piping.</li>
        </ul>
        <Callout type="warning" title="CDU Fluid Type Manufacturer Specs Se Match Karo">
          Har GPU server manufacturer apne liquid cooling ke liye specific fluid requirements specify karta hai — chemistry, pH range, conductivity limits. Wrong fluid type corrosion, seal degradation, ya other issues cause kar sakta hai. Always server OEM ki approved fluid specifications follow karo. CDU selection bhi server compatibility ke saath verify karo.
        </Callout>
      </section>

      <section id="dlc-cold-plates">
        <h2 style={S.h2}>Direct Liquid Cooling and Cold Plates</h2>
        <p style={S.p}>
          Direct Liquid Cooling (DLC) mein coolant directly heat-generating components pe lage cold plates se flow karta hai. Cold plates typically GPU chips, aur sometimes memory ya VRMs pe mount kiye jaate hain.
        </p>
        <p style={S.p}><strong>Cold plate design:</strong></p>
        <ul style={S.ul}>
          <li>Metal (typically copper ya aluminum) block jo chip ke directly upar mount hota hai</li>
          <li>Internal channels se coolant flow karta hai — chip se direct heat absorb karta hai</li>
          <li>Thermal interface material (TIM) chip surface aur cold plate ke beech efficient heat transfer ensure karta hai</li>
          <li>Inlet aur outlet ports se rack manifold se connect hota hai</li>
        </ul>
        <p style={S.p}><strong>DLC aur air cooling hybrid:</strong> Kuch DLC implementations mein cold plates primary heat se deal karte hain (GPU chips) lekin server ke andar kuch components (VRMs, PCIe, networking) still air se cool hote hain via fans. Fully liquid cooled servers mein sab kuch liquid se handle hoti hai — no fans at all in some designs.</p>
        <p style={S.p}><strong>Manifold system:</strong> Rack ke andar ek manifold hoti hai jo CDU se incoming cooled fluid receive karti hai aur har server ke cold plates tak distribute karti hai. Warm fluid return manifold ke through wapas CDU jaata hai.</p>
      </section>

      <section id="rear-door-hx">
        <h2 style={S.h2}>Rear-Door Heat Exchangers</h2>
        <p style={S.p}>
          Rear-Door Heat Exchanger (RDHX) ek cooling component hai jo existing server rack ke rear door ki jagah attach hota hai. RDHX rack se exhaust hone wali hot air ko capture karta hai aur cooled water coils se pass karke cool karta hai — before yeh air room mein release ho.
        </p>
        <p style={S.p}><strong>RDHX kaise kaam karta hai:</strong> Server fans hot air exhaust karte hain rack ke back se. Yeh hot air RDHX coils se pass hoti hai. Coils mein cooled water flow kar raha hai. Hot air cool ho jaati hai. Cooled air (ya near-room-temperature air) data center floor pe release hoti hai.</p>
        <p style={S.p}><strong>RDHX use cases:</strong></p>
        <ul style={S.ul}>
          <li>Existing air-cooled facility mein moderate-density AI servers add karna without full infrastructure overhaul</li>
          <li>Air cooling ko supplement karna — RDHX heat load reduce karta hai jo CRAC/CRAH ko handle karna padta hai</li>
          <li>Transition strategy — existing facilities gradually upgrade karte waqt</li>
        </ul>
        <Callout type="important" title="RDHX Full DLC Ka Replacement Nahi">
          RDHX air cooling ko augment karta hai — replace nahi karta. Very high density AI racks (60+ kW) ke liye RDHX typically sufficient nahi hota. RDHX still server fans pe depend karta hai airflow ke liye — fan failure ya airflow issues RDHX effectiveness reduce karte hain. Full DLC (cold plates) zyada directly aur efficiently heat remove karta hai very high densities pe.
        </Callout>
      </section>

      <section id="immersion-cooling">
        <h2 style={S.h2}>Immersion Cooling</h2>
        <p style={S.p}>
          Immersion cooling mein IT equipment — typically server boards ya complete servers — ek electrically non-conductive (dielectric) fluid mein physically submerge kar diya jaata hai. Fluid directly components se contact karta hai aur heat absorb karta hai.
        </p>
        <p style={S.p}>
          Immersion cooling ka concept simple hai: electricity conduct nahi karne wala fluid mein electronics dub do — fluid heat absorb karega aur components safe rahenge. No fans required in most designs — fluid movement convection ya pumping se hoti hai.
        </p>
        <p style={S.p}><strong>Immersion cooling ke advantages:</strong></p>
        <ul style={S.ul}>
          <li>Very high density possible</li>
          <li>No fans — quiet operation, less mechanical complexity</li>
          <li>Direct component contact — very efficient heat transfer</li>
          <li>Potentially higher component reliability (no dust, no vibration from fans)</li>
        </ul>
        <p style={S.p}><strong>Challenges:</strong></p>
        <ul style={S.ul}>
          <li>Significant operational change — servers can't be serviced in normal way</li>
          <li>Special tooling aur procedures required</li>
          <li>Fluid cost aur management</li>
          <li>Not all hardware immediately compatible — some components not rated for immersion</li>
          <li>Less mature operational ecosystem compared to DLC</li>
        </ul>
      </section>

      <section id="single-phase">
        <h2 style={S.h2}>Single-Phase Immersion</h2>
        <p style={S.p}>
          Single-phase immersion mein dielectric fluid liquid state mein rehti hai — yeh kabhi boil nahi hoti during normal operation. Fluid warm hoti hai components se heat absorb karke, external heat exchanger (ya CDU) wapas jaati hai cool hone ke liye, aur tank mein return karti hai.
        </p>
        <p style={S.p}><strong>Fluid examples:</strong> Mineral oil (older deployments), engineered dielectric fluids like Novec-based compounds (being phased out due to environmental concerns), newer alternatives like synthetic esters aur other specialty fluids.</p>
        <p style={S.p}><strong>Tank design:</strong> Open-top ya sealed tanks mein servers vertically ya horizontally mounted. Fluid level maintained. Heat exchanger in-tank ya external.</p>
        <Callout type="warning" title="Dielectric Fluid Environmental Concerns">
          Traditional immersion cooling fluids jaise certain fluorocarbons high Global Warming Potential (GWP) rakhte hain. Industry actively alternatives explore kar rahi hai. Fluid selection mein environmental impact, regulatory compliance, aur future availability consider karo. Manufacturer guidance aur local environmental regulations check karo.
        </Callout>
      </section>

      <section id="two-phase">
        <h2 style={S.h2}>Two-Phase Immersion</h2>
        <p style={S.p}>
          Two-phase immersion mein dielectric fluid deliberately boil karne diya jaata hai. Components itne hot hote hain ki fluid ka boiling point reach ho jaata hai, fluid vapor mein convert hoti hai, vapors tank ke top mein condensers pe collect hote hain, condense ho jaate hain, aur drip back karte hain — continuous cycle.
        </p>
        <p style={S.p}>
          Phase change (liquid → vapor → liquid) mein latent heat absorption hoti hai jo very high heat transfer rates enable karta hai. Two-phase mein component temperatures tightly controlled rehte hain — boiling point pe temperature "clamp" ho jaata hai.
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
          Two-phase immersion aaj primarily research, HPC, aur specialty high-density applications mein use hoti hai. Mainstream AI production deployments mein DLC more common hai.
        </p>
      </section>

      <section id="cooling-comparison">
        <h2 style={S.h2}>Cooling Technologies Comparison</h2>
        <Figure caption="Cooling Technologies Comparison: Air cooling lowest cost and complexity, limited for high-density AI. Rear-door heat exchangers augment air cooling for moderate density. Direct Liquid Cooling (DLC) primary choice for modern AI racks — handles 40-100+ kW. Single-phase and two-phase immersion for very high density specialty applications. Many deployments use hybrid approach.">
          <CoolingTechComparison />
        </Figure>
        <Callout type="important" title="Hybrid Approach Common Hai">
          Production AI data centers mein typically hybrid cooling hoti hai: DLC for GPU server racks (high density), air cooling for networking equipment, storage servers, aur management infrastructure (lower density). Same facility mein multiple cooling technologies coexist karte hain.
        </Callout>
      </section>

      <section id="facility-cooling-chain">
        <h2 style={S.h2}>Facility Cooling Chain</h2>
        <p style={S.p}>
          AI server cooling sirf CDU aur cold plates tak nahi hai — ek complete chain hai jo facility infrastructure se start hoti hai.
        </p>
        <Figure caption="Complete AI Data Center Cooling Architecture: Cooling tower rejects heat to atmosphere. Chiller plant provides cold facility water. CDU room contains CDU units that exchange heat between facility water and IT secondary loop. AI server room has GPU racks with DLC cold plates, connected to CDUs via rack manifolds. Separate air cooling for networking and lower-density equipment.">
          <AiCoolingArchitecture />
        </Figure>
        <Callout type="important" title="Yeh Ek Example Architecture Hai — Universal Nahi">
          GPU → CDU → Chiller → Cooling Tower yeh sirf ek common example chain hai. Actual facility architecture vary karta hai. Alternatives include: air-cooled chillers (no cooling tower, direct air heat rejection), water-cooled chillers with dry coolers (no evaporative tower), economizer/free-cooling loops (chiller bypass possible conditions mein), hybrid/adiabatic systems. Architecture selection climate, water availability, energy cost, site constraints aur project requirements pe depend karta hai.
        </Callout>
        <ul style={S.ul}>
          <li><strong>GPU Chips → Cold Plates:</strong> Heat directly chip surface se cold plate mein transfer hoti hai</li>
          <li><strong>Cold Plates → Rack Manifold:</strong> Warm fluid rack ke andar manifold mein collect hoti hai</li>
          <li><strong>Rack Manifold → CDU:</strong> Warm fluid CDU mein jaati hai, heat transfer hoti hai</li>
          <li><strong>CDU → Facility Cooling Plant:</strong> Facility water (ya direct connection to dry cooler / economizer) warm hoke plant wapas jaata hai</li>
          <li><strong>Facility Plant → Heat Rejection:</strong> Chiller, dry cooler, cooling tower, ya economizer — design pe depend — heat ultimately atmosphere mein reject hoti hai</li>
        </ul>
        <p style={S.p}>
          Har link iss chain mein ek failure point hai — monitoring poori chain pe zaruri hai, sirf GPU temperature pe nahi.
        </p>
      </section>

      <section id="chiller-cooling-tower">
        <h2 style={S.h2}>Chiller and Cooling Tower</h2>
        <p style={S.p}>
          <TopicLink slug="chiller" variant="inline" /> article mein chiller plant ka detailed engineering covered hai. AI context mein key points:
        </p>
        <ul style={S.ul}>
          <li><strong>Chiller capacity sizing:</strong> AI racks ki total cooling load calculate karo. Redundancy level — N, N+1, 2N, ya distributed — project availability requirements, SLA, aur design basis ke according determine karo. Growth headroom rakhna.</li>
          <li><strong>Chilled water supply temperature:</strong> Liquid-cooled GPU servers typically higher supply water temperature tolerate kar sakte hain compared to air-cooled equipment — this enables free cooling (economizer) opportunities in cooler climates.</li>
          <li><strong>Redundancy:</strong> AI training jobs long-running hote hain — cooling system failure = training interruption. Cooling redundancy level N, N+1, 2N ya distributed architecture ho sakta hai — project availability requirements, SLA aur design basis ke according determine karo.</li>
          <li><strong>Cooling tower water consumption:</strong> Large AI clusters significant water use karte hain via evaporative cooling towers — WUE (Water Usage Effectiveness) plan karo.</li>
        </ul>
      </section>

      <section id="dry-cooler">
        <h2 style={S.h2}>Dry Coolers and Economizers</h2>
        <p style={S.p}>
          Dry cooler (ya air-cooled heat exchanger) heat reject karta hai atmosphere mein without evaporation — pani ki consumption zero. Fans air ko heat exchanger coils se pass karte hain.
        </p>
        <p style={S.p}>
          <strong>Economizer mode:</strong> Cooler climates mein (jab outside air temperature sufficient ho), mechanical refrigeration (chiller) bypass kiya ja sakta hai aur cooling tower ya dry cooler direct facility water cool kar sakta hai. Yeh "free cooling" hai — chiller compressor energy significantly reduce hoti hai. PUE improve hota hai. AI data centers ke liye economizer hours maximize karna energy cost reduction ka important strategy hai.
        </p>
        <p style={S.p}><strong>Higher water temperature opportunity:</strong> Kuch liquid-cooled GPU server platforms higher coolant supply temperatures accept kar sakte hain — lekin yeh capability server design aur OEM specification pe depend karti hai, universally guaranteed nahi hai. Agar OEM specifications allow karein, higher acceptable supply temperature = more hours eligible for economizer operation — especially in moderate climates. Specific maximum inlet coolant temperature always server OEM documentation se verify karo before facility design finalize karo.</p>
      </section>

      <section id="cooling-water-quality">
        <h2 style={S.h2}>Cooling Water Quality</h2>
        <p style={S.p}>
          Liquid cooling systems mein water/fluid quality critical hai. Poor quality water corrosion, scaling, biological growth, aur equipment damage cause kar sakta hai.
        </p>
        <ul style={S.ul}>
          <li><strong>Facility water (primary loop):</strong> Corrosion inhibitors, biocides, scale inhibitors regularly maintained. Water chemistry analysis periodic basis pe. Cooling tower water concentration cycles manage karo.</li>
          <li><strong>Secondary IT loop:</strong> Server OEM specifications ke according fluid chemistry maintain karo. pH, conductivity, dissolved oxygen, aur specific ions monitored. De-ionized water ya specific treated water as required.</li>
          <li><strong>CDU internal:</strong> CDU ke andar filters typically hote hain particles aur debris remove karne ke liye. Regular filter inspection aur replacement.</li>
        </ul>
        <Callout type="warning" title="Water Quality Monitoring Regular Honi Chahiye">
          Cooling water quality ek set-and-forget item nahi hai. Seasonal changes, makeup water variability, aur system conditions time ke saath water chemistry change karte hain. Sampling frequency OEM requirements, water treatment program, coolant chemistry, system criticality, aur site-specific conditions pe depend karti hai — koi universal interval applicable nahi hai. Water treatment specialist se consult karo aur OEM documentation follow karo.
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
          PUE ek useful metric hai lekin context zaroori hai. Bahut low PUE kisi bhi cost pe achieve karna wrong goal hai. Cold climate mein facility naturally lower PUE achieve kar sakti hai kyunki economizer hours zyada milte hain. GPU utilization capture nahi hota — idle GPUs ke saath PUE accha dikh sakta hai par efficiency poor hai. PUE ko GPU utilization, training throughput, aur total cost per useful AI compute ke saath together analyze karo.
        </Callout>
      </section>

      <section id="gpu-thermal-throttling">
        <h2 style={S.h2}>GPU Thermal Throttling</h2>
        <p style={S.p}>
          Thermal throttling GPU hardware ki built-in protection mechanism hai. Jab GPU temperature manufacturer ke specified thermal limits approach karta hai, GPU firmware automatically clock speed reduce karta hai taaki temperature safe range mein rahe.
        </p>
        <Figure caption="GPU Thermal Throttling Flow: Inadequate cooling → GPU temperature approaches limit → firmware reduces clock speed → compute performance drops → training throughput (tokens/sec) reduces → AI training ROI impacted. Throttling is silent — GPU appears 'running' but delivers less. Fix: improve cooling.">
          <ThermalThrottlingFlow />
        </Figure>
        <p style={S.p}><strong>Why throttling is insidious:</strong> GPU utilization metric (nvidia-smi ya monitoring dashboards pe) high dikh sakta hai even when throttling. GPU "busy" hai compute karne mein, lekin slower clock pe. Agar sirf GPU utilization % monitor karo aur clock speed ignore karo, throttling invisible rehti hai.</p>
        <p style={S.p}><strong>Detection:</strong></p>
        <ul style={S.ul}>
          <li>Monitor GPU clock speed aur temperature simultaneously — DCGM ya nvidia-smi se</li>
          <li>Agar clock speed base clock se significantly below ho during training → throttling possible</li>
          <li>Training throughput (tokens/sec ya samples/sec) baseline se compare karo — unexplained drops investigate karo</li>
          <li>NVIDIA DCGM mein throttling reason counters available hain — thermal throttle specifically identify kar sakte hain</li>
        </ul>
        <Callout type="best-practice" title="Cooling Verify Karo Before Production Training Runs">
          Long training jobs start karne se pehle: GPU temperatures burn-in workload ke saath verify karo, clock speeds check karo throttling nahi hai, cooling system metrics (CDU temperatures, flow rates) normal hain. Ek week ke training run mein discover karna ki cooling issue tha — months of delayed results le jaata hai.
        </Callout>
      </section>

      <section id="rack-power-density">
        <h2 style={S.h2}>Rack Power Density Planning</h2>
        <p style={S.p}>
          Rack power density ek specific rack ki total power consumption hai. AI deployment planning mein yeh critical calculation hai kyunki yeh directly cooling requirements determine karta hai.
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
        <Callout type="warning" title="Manufacturer Specs Always Verify Karo">
          Upar diye gaye ranges illustrative hain. Actual cooling requirements aur limits: server manufacturer liquid cooling specifications, CDU compatibility, facility cooling capacity, aur local design standards pe depend karte hain. Har specific deployment ke liye manufacturer documentation aur qualified cooling engineers se verify karo.
        </Callout>
      </section>

      <section id="leak-detection">
        <h2 style={S.h2}>Leak Detection</h2>
        <p style={S.p}>
          Liquid coolant aur electronics — yeh combination catastrophic failure cause karta hai. Single leak GPU servers (millions of dollars worth hardware) damage kar sakta hai. Leak detection isliye mandatory hai, not optional.
        </p>
        <p style={S.p}><strong>Leak detection layers:</strong></p>
        <ul style={S.ul}>
          <li><strong>CDU level:</strong> Pressure monitoring (pressure drop = possible leak), flow rate monitoring, liquid level sensors</li>
          <li><strong>Pipe connections:</strong> Moisture sensors ya liquid detection cables at joints, quick-disconnect fittings</li>
          <li><strong>Rack manifold level:</strong> Moisture sensors under manifold, drip trays with sensors</li>
          <li><strong>Under-floor/raised-floor:</strong> Rope-type liquid detection cables along cooling distribution paths</li>
          <li><strong>Visual indicators:</strong> Colored coolant (some deployments) makes leaks more visible</li>
          <li><strong>Automatic shutoff:</strong> Some CDU systems can automatically close valves on leak detection</li>
        </ul>
        <p style={S.p}><strong>Response procedure:</strong> Leak detected → immediate alert → isolate affected section (if automated shutoff not triggered, manually close valves) → evacuate coolant from section → identify leak source → repair → pressure test before reconnect → monitor closely after restart.</p>
        <Callout type="warning" title="Drip Trays aur Floor Drainage Plan Karo">
          Cooling water ka koi bhi amount data center floor pe, raised floor mein, ya electrical equipment ke paas serious hazard hai. Physical containment (drip trays under CDUs aur manifolds) design ke part of hone chahiye — monitoring ke saath. Floor drainage capacity consider karo worst-case coolant release scenarios ke liye.
        </Callout>
      </section>

      <section id="monitoring">
        <h2 style={S.h2}>AI Cooling Monitoring</h2>
        <p style={S.p}>
          Effective cooling monitoring sirf GPU temperature se bahut zyada hai — complete chain monitor karni hoti hai. Alarm setpoints OEM/design specifications se set karo — universal values yahan nahi diye gaye hain.
        </p>
        <ComparisonTable
          title="AI Cooling — Complete Monitoring Checklist"
          headers={["What to Monitor", "Why It Matters", "Abnormal Indication"]}
          rows={[
            ["Rack inlet temperature (per rack)", "Primary metric — IT equipment ko actual inlet air/coolant temperature. ASHRAE recommended 18–27°C for air-cooled.", "Above recommended range → cooling insufficient or bypass airflow issue"],
            ["Supply air temperature (CRAC/CRAH outlet)", "Cooling unit efficiency aur setpoint adherence", "Above setpoint → cooling unit issue or overload"],
            ["Return air temperature (hot aisle / CRAC return)", "Heat load indicator — high return = high IT load or containment issue", "Unusually high → check containment, verify cooling capacity"],
            ["Room relative humidity (RH)", "ESD risk (too low) aur condensation risk (too high)", "Below or above applicable ASHRAE class dew-point limits aur OEM/design specification → investigate. Follow current ASHRAE TC 9.9 aur equipment OEM limits."],
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
          Cooling failure ke time mein chaotic response expensive GPU damage cause kar sakta hai. Common failure scenarios ke liye written runbooks hone chahiye — step-by-step procedures, escalation contacts, automatic shutoff thresholds. O&M team ko in procedures se familiar hona chahiye before first failure, not during.
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
          Many organizations start with retrofit — deploying liquid cooling in existing facilities with modifications. As AI scale grows, greenfield AI-optimized data centers become more common. Choice depends on timeline, budget, density requirements, aur existing facility condition.
        </p>
      </section>

      <section id="real-world-arch">
        <h2 style={S.h2}>Real-World AI Data Center Cooling Architecture</h2>
        <p style={S.p}><strong>Typical production AI data center cooling design:</strong></p>
        <ul style={S.ul}>
          <li><strong>Outdoor:</strong> Cooling tower (evaporative, primary heat rejection) + Dry cooler (economizer, water-free heat rejection) + Chiller plant (N+1 or 2N mechanical refrigeration)</li>
          <li><strong>Facility distribution:</strong> Chilled water aur condenser water piping, chemical treatment systems, expansion tanks, pressurization</li>
          <li><strong>CDU room:</strong> Multiple CDUs (per cooling zone), secondary loop pumps, leak detection, monitoring integration</li>
          <li><strong>AI server room:</strong> GPU racks with DLC, rack manifolds, per-rack leak detection, temperature monitoring per GPU</li>
          <li><strong>Supplementary air cooling:</strong> CRAC/CRAH for networking rows, storage, management equipment</li>
          <li><strong>Monitoring:</strong> BMS integration, DCGM GPU telemetry, CDU monitoring, all into unified operations dashboard</li>
        </ul>
        <p style={S.p}>
          Actual implementation varies significantly by scale, location, hardware platform, aur facility constraints. No two AI data centers are identical — each is designed for its specific requirements.
        </p>
      </section>

      <section id="design-checklist">
        <h2 style={S.h2}>AI Cooling Design Checklist</h2>
        <ul style={S.ul}>
          <li>☐ <strong>Density calculation:</strong> Per-rack power calculated from actual server TDP specs + networking + headroom</li>
          <li>☐ <strong>Cooling technology selected:</strong> Air, DLC, immersion, or hybrid — matched to actual density</li>
          <li>☐ <strong>Manufacturer specifications:</strong> CDU fluid type, temperature setpoints, flow rates verified against server OEM requirements</li>
          <li>☐ <strong>CDU sizing and redundancy:</strong> CDU capacity sufficient for peak IT load. Redundancy level (N, N+1, 2N) project availability requirements aur design basis ke according</li>
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
          Yeh publicly available documents AI cooling engineering ke liye authoritative references hain. Site design, equipment selection, aur operational decisions ke liye inhe primary source maano.
        </p>
        <ul style={S.ul}>
          <li>
            <strong>ASHRAE TC 9.9 — AI Data Center Framework</strong><br />
            Publisher: ASHRAE TC 9.9<br />
            What it covers: Thermal aur environmental design guidance specifically for AI/GPU data centers, including high-density rack considerations, liquid cooling integration, aur updated W-class guidance for AI workloads.<br />
            URL: <a href="https://www.ashrae.org/technical-resources/ai-data-center-framework" style={{ color: "#2563eb" }}>https://www.ashrae.org/technical-resources/ai-data-center-framework</a>
          </li>
          <li>
            <strong>ASHRAE TC 9.9 — Thermal Guidelines for Data Processing Environments</strong><br />
            Publisher: ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers)<br />
            What it covers: IT equipment environmental classes (A1–A4, W-classes), recommended/allowable temperature aur humidity ranges (including dew-point envelope), data center thermal design guidance.<br />
            URL: <a href="https://www.ashrae.org/technical-resources/bookstore/datacom-series" style={{ color: "#2563eb" }}>https://www.ashrae.org/technical-resources/bookstore/datacom-series</a>
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
            <strong>NVIDIA DGX H100 System User Guide</strong><br />
            Publisher: NVIDIA Corporation<br />
            What it covers: DGX H100 system specifications including power consumption (~10.2 kW max per server), airflow and thermal requirements (air-cooled system — verify rack airflow capacity and operating temperature range), aur rack integration requirements.<br />
            URL: <a href="https://docs.nvidia.com/dgx/dgxh100-user-guide/" style={{ color: "#2563eb" }}>https://docs.nvidia.com/dgx/dgxh100-user-guide/</a>
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
        <Callout type="important" title="URLs Time Ke Saath Change Ho Sakte Hain">
          Upar diye gaye URLs publication time pe valid the. Documents updated ho sakte hain ya reorganized. Agar URL dead ho, toh publisher website pe document title se search karo. ASHRAE bookstore aur NVIDIA documentation portal pe latest versions milenge.
        </Callout>
      </section>

      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li><strong>AI rack power density traditional data centers se fundamentally alag hai:</strong> GPU servers jo 10+ kW each consume karte hain, ek rack mein multiple servers = 40–100+ kW. High-density AI deployments mein traditional air cooling ki practical limits jaldi approach ho sakti hain; liquid cooling many high-density deployments mein preferred ya necessary ho sakti hai, lekin actual requirement server OEM specifications aur facility design par depend karti hai.</li>
          <li><strong>CDU facility water aur IT equipment ke beech critical barrier hai:</strong> CDU dono loops ko physically separate rakhta hai — facility water (chemical treatment ke saath) IT equipment se direct contact nahi karta. Yeh separation IT hardware protect karta hai aur fluid specifications control enable karta hai.</li>
          <li><strong>Thermal throttling silent performance killer hai:</strong> GPU temperature limit approach karne pe firmware automatically clock speed reduce karta hai. GPU "running" dikh ta hai par throughput drops. GPU utilization percentage alone insufficient hai — clock speed bhi monitor karo simultaneously.</li>
          <li><strong>Cooling planning hardware procurement se pehle zaruri hai:</strong> Liquid cooling infrastructure (CDU, piping, facility modifications) planning aur procurement AI hardware se pehle ya saath karo. Retrofit expensive aur disruptive hota hai. Manufacturer specifications primary reference hai — generic rules nahi.</li>
          <li><strong>Leak detection mandatory hai, optional nahi:</strong> Liquid coolant aur electronics combination catastrophic damage cause karta hai. Multiple layer leak detection (CDU, manifold, rack, floor), drip trays, automatic shutoffs, aur tested response procedures — sab day-one requirements hain.</li>
          <li><strong>PUE context ke saath samjho:</strong> PUE useful metric hai lekin sole focus nahi hona chahiye. GPU utilization, training throughput, water usage (WUE), aur total cost per useful AI compute ke saath holistically evaluate karo. Very low PUE at the cost of other factors wrong optimization hai.</li>
          <li><strong>Hybrid cooling common hai:</strong> High-density GPU racks ke liye DLC, lower-density networking aur storage ke liye air cooling — same facility mein. "All liquid" ya "all air" binary choice nahi hai.</li>
          <li><strong>Cooling chain end-to-end monitor karo:</strong> GPU chip se cooling tower tak — har link monitor hona chahiye. CDU issue ya chiller problem GPU throttling cause kar sakta hai. Sirf GPU temperature dekh ke cooling chain problem identify nahi hogi.</li>
          <li><strong>Economizer opportunities maximize karo:</strong> Higher supply water temperature accept karne wale GPU servers + moderate climate = significant free cooling hours = lower PUE aur energy costs. Manufacturer temperature specs carefully check karo.</li>
          <li><strong>Runbooks first time mein banao:</strong> Cooling failure middle mein yeh sochna ki kya karna hai expensive hai. Common failure scenarios ke written procedures, escalation contacts, aur automatic shutoff thresholds — before first production deployment ready hone chahiye.</li>
        </ul>
      </section>

    </article>
  );
}
