"use client";
import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function MetersAndKPIs() {
  return (
    <>
      <h2 id="energy-meters" style={S.h2}>Energy Meters — The Foundation of EMS</h2>
      <p style={S.p}>The foundation of EMS is energy meters. Without accurate metering EMS is nothing — the dashboards will all show zero or wrong. Energy meters measure voltage and current and from these calculate kW, kWh, kVAR, power factor, frequency and demand. In a data center meters are typically installed at the utility incomer, transformer secondary, UPS input/output, CRAC/chiller circuits, and at PDU level — according to the project instrumentation design.</p>
      <p style={S.p}>Meters come in different accuracy classes. IEC 62053 and IEC 61557-12 standards are relevant — there are Class 0.2S, 0.5S, 1, 2 accuracy grades. Billing-grade meters (Class 0.5 or better) are needed at the utility interface. For sub-metering Class 1 or 2 is often sufficient. Current Transformers (CT) and Voltage Transformers (VT/PT) isolate the meter on high-voltage circuits and provide accurate measurement. CT ratio and VT ratio must be correctly configured — a wrong ratio means proportionally wrong energy readings.</p>
      <Callout type="warning" title="CT Polarity and Ratio — Common Error Source">
        Polarity matters in CT connections — a reversed CT measures kW and kWh in the wrong direction (negative reading possible). A CT secondary open-circuit is hazardous (high voltage). The CT ratio (e.g., 200:5 A) must be correctly programmed in the meter — a wrong ratio means energy readings are proportionally off. Always verify with meter commissioning test.
      </Callout>
      <p style={S.p}>Modern meters natively support Modbus RTU or Modbus TCP — kW, kWh, kVAR, power factor, frequency, voltage and current are all available in registers. Pulse output meters are also common — every pulse represents an energy quantum (verify from the OEM spec — 1 pulse = 1 Wh? 10 Wh? 1 kWh?). Direct API integration is available in some intelligent meters and sub-metering systems.</p>

      <h2 id="meter-integration" style={S.h2}>Meter Integration and Data Acquisition</h2>
      <p style={S.p}>To integrate an energy meter over Modbus RTU/TCP: obtain the OEM register map (32-bit energy registers are typically in 2 consecutive Holding Registers — FC 03), configure baud rate/parity/slave ID, add the device in EMS, apply scaling (raw register value to engineering unit), and enable historian logging. Common issue: the word order in 32-bit energy values (High Word first or Low Word first) is OEM-specific — with the wrong order a completely incorrect energy reading comes through.</p>
      <p style={S.p}>BACnet meters (increasingly common in newer deployments) communicate over BACnet/IP or MS/TP. Analog Input objects expose energy readings. Pulse counter integrations connect to a digital input of the BMS/EMS controller — set the pulse rate and integration interval correctly. Data validation is essential: the accumulated meter reading must be monotonically increasing — if the value suddenly drops, investigate a rollover or comm issue.</p>
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
      <p style={S.p}><strong>kW (Kilowatt) — Instantaneous Power:</strong> Real power being consumed at any moment. Used for load monitoring, capacity checks and real-time alerts. It is read directly from the meter.</p>
      <p style={S.p}><strong>kWh (Kilowatt-hour) — Energy Consumed:</strong> Power × Time. It is an accumulated reading — the basis of billing. Compare the kWh of different circuits through sub-metering. Always monotonically increasing — a sudden drop indicates a meter reset or communication issue.</p>
      <p style={S.p}><strong>kVAR — Reactive Power:</strong> Generated by inductive/capacitive loads. Relevant for power factor correction. A lagging power factor (inductive loads — motors, transformers) increases reactive power demand.</p>
      <p style={S.p}><strong>Power Factor (PF):</strong> Real Power / Apparent Power = kW / kVA. 1.0 is ideal. A low power factor (typically below 0.9) can increase utility charges and increases current draw for the same kW load. IT equipment and UPS typically maintain a good power factor.</p>
      <p style={S.p}><strong>Peak Demand:</strong> Maximum average power in a specified interval (typically 15 or 30 minutes, according to the utility tariff). Demand charges are significant in utility billing. EMS provides demand tracking and alerts.</p>

      <h2 id="pue-analysis" style={S.h2}>PUE and Energy-Efficiency Analysis</h2>
      <p style={S.p}>PUE (Power Usage Effectiveness) = Total Facility Power ÷ IT Equipment Power. A value of 1.0 is ideal (only IT consumes, zero overhead). In practical data centers the 1.2–1.5 range is common — values depend on project design, cooling efficiency, IT utilization and climate. Hyperscale optimized facilities achieve close to 1.1.</p>
      <Callout type="important" title="PUE Calculation — Metering Boundary Matters">
        To calculate PUE accurately, define the metering boundary precisely. What is included in "Total Facility" — lighting? Security? Office HVAC? Only servers in "IT Equipment"? Networking? Storage? The Uptime Institute and Green Grid PUE tiers (PUE1, PUE2, PUE3) define different measurement points. Different methodologies give different PUE values — align the methodology for comparison.
      </Callout>
      <p style={S.p}>EMS can calculate both real-time and historical PUE. Instantaneous PUE (from current kW readings) gives an operational snapshot — but it is not equivalent to the formal annual PUE. Period PUE (kWh accumulated over a defined time period — monthly/annual) is more meaningful for sustainability reporting and benchmarking, and is aligned with the Uptime Institute / Green Grid methodology. The rolling trend tracks operational efficiency. Investigate a PUE spike — cooling inefficiency? Low IT utilization? DG running (a different efficiency curve)? EMS trend data helps identify the cause.</p>
    </>
  );
}
