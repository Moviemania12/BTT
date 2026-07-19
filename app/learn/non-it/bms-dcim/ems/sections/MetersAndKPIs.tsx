"use client";
import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function MetersAndKPIs() {
  return (
    <>
      <h2 id="energy-meters" style={S.h2}>Energy Meters — The Foundation of EMS</h2>
      <p style={S.p}>EMS ka foundation energy meters hain. Bina accurate metering ke EMS kuch bhi nahi — dashboards sab zero ya wrong show karenge. Energy meters voltage aur current measure karte hain aur se kW, kWh, kVAR, power factor, frequency aur demand calculate karte hain. Data center mein meters typically utility incomer pe, transformer secondary pe, UPS input/output pe, CRAC/chiller circuits pe, aur PDU level pe lagaye jaate hain — project instrumentation design ke hisaab se.</p>
      <p style={S.p}>Meters different accuracy classes mein aate hain. IEC 62053 aur IEC 61557-12 standards relevant hain — Class 0.2S, 0.5S, 1, 2 accuracy grades hote hain. Billing-grade meters (Class 0.5 ya better) utility interface pe zaroori hain. Sub-metering ke liye Class 1 ya 2 often sufficient hai. Current Transformers (CT) aur Voltage Transformers (VT/PT) high-voltage circuits pe meter ko isolate karte hain aur accurate measurement provide karte hain. CT ratio aur VT ratio correctly configured hona chahiye — wrong ratio means proportionally wrong energy readings.</p>
      <Callout type="warning" title="CT Polarity and Ratio — Common Error Source">
        CT connections mein polarity matter karta hai — reversed CT kW aur kWh wrong direction mein measure karta hai (negative reading possible). CT secondary open-circuit hazardous hai (high voltage). CT ratio (e.g., 200:5 A) meter mein correctly programmed hona chahiye — wrong ratio means energy readings proportionally off. Always verify with meter commissioning test.
      </Callout>
      <p style={S.p}>Modern meters Modbus RTU ya Modbus TCP natively support karte hain — registers mein kW, kWh, kVAR, power factor, frequency, voltage aur current sab available hote hain. Pulse output meters bhi common hain — har pulse ek energy quantum represent karta hai (OEM spec se verify karo — 1 pulse = 1 Wh? 10 Wh? 1 kWh?). Direct API integration kuch intelligent meters aur sub-metering systems mein available hota hai.</p>

      <h2 id="meter-integration" style={S.h2}>Meter Integration and Data Acquisition</h2>
      <p style={S.p}>Modbus RTU/TCP se energy meter integrate karne ke liye: OEM register map obtain karo (32-bit energy registers typically 2 consecutive Holding Registers mein hote hain — FC 03), baud rate/parity/slave ID configure karo, EMS mein device add karo, scaling apply karo (raw register value to engineering unit), aur historian logging enable karo. Common issue: 32-bit energy values mein word order (High Word first ya Low Word first) OEM-specific hota hai — wrong order pe completely incorrect energy reading aata hai.</p>
      <p style={S.p}>BACnet meters (increasingly common in newer deployments) BACnet/IP ya MS/TP pe communicate karte hain. Analog Input objects energy readings expose karte hain. Pulse counter integrations BMS/EMS controller ke digital input pe connect hote hain — pulse rate aur integration interval correctly set karo. Data validation essential hai: accumulated meter reading monotonically increasing hona chahiye — agar value suddenly drop kare to rollover ya comm issue investigate karo.</p>
      <ComparisonTable
        title="Meter Integration Methods — Comparison"
        headers={["Method","Protocol","Data Available","Common Issue","Best For"]}
        rows={[
          ["Modbus RTU","Serial RS-485","kW, kWh, PF, V, A, frequency","Byte order, slave ID, baud mismatch","Legacy meters, serial bus"],
          ["Modbus TCP","Ethernet","Same as RTU over network","Unit ID, firewall, wrong register","Modern meters, IP network"],
          ["BACnet/IP","Ethernet UDP","AI objects for each parameter","Device ID, port config, discovery","Building automation meters"],
          ["Pulse counter","Hardwired digital input","kWh accumulated (count × pulse value)","Wrong pulse value configured","Simple meters, high reliability"],
          ["DLMS/COSEM","Ethernet or serial","Utility-grade tariff data","Complex protocol, specialized driver","Utility billing meters"],
          ["API/REST","Ethernet HTTP","Rich data, often pre-processed","Auth, rate limits, format changes","Cloud meters, smart PDUs"],
        ]}
        caption="Protocol and data availability depend on meter model and firmware. Always verify with OEM documentation."
      />

      <h2 id="energy-kpis" style={S.h2}>Energy KPIs — kW, kWh, Demand, Power Factor, PUE</h2>
      <p style={S.p}><strong>kW (Kilowatt) — Instantaneous Power:</strong> Real power being consumed at any moment. Used for load monitoring, capacity checks aur real-time alerts. Meter se directly read hota hai.</p>
      <p style={S.p}><strong>kWh (Kilowatt-hour) — Energy Consumed:</strong> Power × Time. Accumulated reading hai — billing ka basis. Sub-metering se different circuits ka kWh compare karo. Always monotonically increasing — sudden drop indicates meter reset ya communication issue.</p>
      <p style={S.p}><strong>kVAR — Reactive Power:</strong> Inductive/capacitive loads se generated. Power factor correction ke liye relevant. Lagging power factor (inductive loads — motors, transformers) reactive power demand increase karta hai.</p>
      <p style={S.p}><strong>Power Factor (PF):</strong> Real Power / Apparent Power = kW / kVA. 1.0 ideal hai. Low power factor (typically below 0.9) utility charges badha sakta hai aur current draw increase karta hai same kW load pe. IT equipment aur UPS typically good power factor maintain karte hain.</p>
      <p style={S.p}><strong>Peak Demand:</strong> Maximum average power in a specified interval (typically 15 or 30 minutes, utility tariff ke hisaab se). Utility billing mein demand charges significant hote hain. EMS demand tracking aur alerts provide karta hai.</p>

      <h2 id="pue-analysis" style={S.h2}>PUE and Energy-Efficiency Analysis</h2>
      <p style={S.p}>PUE (Power Usage Effectiveness) = Total Facility Power ÷ IT Equipment Power. Value 1.0 ideal hai (sirf IT consume karta hai, zero overhead). Practical data centers mein 1.2–1.5 range common hai — values project design, cooling efficiency, IT utilization aur climate pe depend karte hain. Hyperscale optimized facilities 1.1 ke karib achieve karte hain.</p>
      <Callout type="important" title="PUE Calculation — Metering Boundary Matters">
        PUE accurately calculate karne ke liye metering boundary precisely define karo. "Total Facility" mein kya include hai — lighting? Security? Office HVAC? "IT Equipment" mein sirf servers? Networking? Storage? Uptime Institute aur Green Grid ke PUE tiers (PUE1, PUE2, PUE3) different measurement points define karte hain. Different methodologies se different PUE values milti hain — comparison ke liye methodology align karo.
      </Callout>
      <p style={S.p}>EMS PUE real-time aur historical dono calculate kar sakta hai. Instantaneous PUE (current kW readings se) operational snapshot deta hai — lekin ye formal annual PUE ke equivalent nahi hai. Period PUE (kWh accumulated over a defined time period — monthly/annual) zyada meaningful hai sustainability reporting aur benchmarking ke liye, aur Uptime Institute / Green Grid methodology ke saath aligned hota hai. Rolling trend operational efficiency track karta hai. PUE spike investigate karo — cooling inefficiency? Low IT utilization? DG running (alag efficiency curve)? EMS trend data cause identify karne mein help karta hai.</p>
    </>
  );
}
