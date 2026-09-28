"use client";

import { S, Callout, ComparisonTable, Figure } from "../shared";
import BmsPointMappingBinding from "../svg/BmsPointMappingBinding";

export default function DataFlow() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 9 — DATA FLOW
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="data-flow" style={S.h2}>Data Flow — From Equipment to HMI</h2>

      <p style={S.p}>
        This section covers the most important technical concept of BMS — how a single data value reaches the operator screen from physical equipment. Configuration is required at every step, and failure is possible at every step. Understanding this chain makes troubleshooting dramatically faster.
      </p>

      <h3 style={S.h3}>The Complete Data Chain</h3>
      <p style={S.p}>
        The chain is in this order: <strong>Physical equipment</strong> (UPS inverter output) →{" "} <strong>Sensor / Equipment controller</strong> (UPS onboard measurement, exposed via Modbus port) → <strong>Communication interface</strong> (RS-485 cable or Ethernet) →{" "} <strong>Gateway</strong> (if protocol conversion is required) → <strong>BMS controller / integration server</strong> (polls the device) → <strong>BMS server database</strong> (stores timestamped value) → <strong>Point / Tag</strong> (named reference in BMS, with scaling applied) → <strong>HMI graphic</strong> (binds to tag, displays value) → <strong>Alarm / Trend / Report</strong> (generated from tag value vs configured limits).
      </p>

      <h3 style={S.h3}>Data Point, Tag and Object — What These Mean</h3>
      <p style={S.p}>
        A <strong>Data point</strong> (or simply "point") is a single monitored or controlled value in a BMS — such as "UPS-1 Output Load %". A point is a named entity with attributes: current value, engineering unit, alarm limits, trend configuration, data quality.{" "} A <strong>Tag</strong> is essentially the same concept — a string identifier that references the point. Different BMS platforms use different terminology: "Variable" in Schneider EcoStruxure, "Data Point" in Siemens Desigo, "Point" in Metasys.{" "} <strong>Object</strong> is a BACnet-specific term — Analog Input, Binary Output, Schedule, Trend Log, etc. objects exist in a BACnet device, each with properties.
      </p>

      <h3 style={S.h3}>Register, Object Instance and Device Address</h3>
      <p style={S.p}>
        <strong>Modbus register:</strong> A 16-bit memory location in the equipment's controller that holds a specific value. The function code specifies which type of register to read. Holding Registers (FC 03) are read/write; Input Registers (FC 04) are read-only. The address is a numeric offset (0-based internally, often 1-based in OEM docs — this is a source of confusion).
      </p>
      <p style={S.p}>
        <strong>BACnet Object Instance:</strong> Every BACnet object has a type and an instance number — "Analog Input, Instance 5" (often written AI 5). A device can have multiple AI objects, each with a unique instance. The <strong>Device ID</strong> is the unique identifier of the BACnet device on the network — in a large installation it must be unique. An <strong>SNMP OID</strong> is a dotted-number path that identifies a specific MIB leaf node — e.g., .1.3.6.1.4.1.9999.1.3.0 can be a UPS vendor-specific OID.
      </p>

      <h3 style={S.h3}>Point Mapping and Point Binding</h3>
      <p style={S.p}>
        <strong>Point mapping</strong> is the process in which a tag in the BMS is linked to a physical address (Modbus register, BACnet object, SNMP OID). This is a configuration step — specify in the BMS database where the data source for "UPS-1.Output_Load_Pct" will come from. <strong>Point binding</strong> or <strong>data binding</strong> is the step in the HMI graphic in which a graphic element (a text field, progress bar, color indicator) is linked to a specific BMS tag. When the tag value updates, the graphic updates automatically.
      </p>

      <Callout type="important" title="Mapping vs Binding — Two Different Steps">
        Mapping = configure the data source for the point in the backend (address, register, protocol). Binding = link the HMI graphic element to that point in the frontend. Both steps must be correct. Common mistake: the mapping is correct, the live value is coming into the backend — but the wrong point is bound in the graphic, or the binding is missing entirely. When troubleshooting, verify these two separately.
      </Callout>

      <h3 style={S.h3}>Scaling, Engineering Units and Data Types</h3>
      <p style={S.p}>
        The raw value the equipment transmits is typically not in an engineering unit. A Modbus register transmits a 16-bit integer — e.g., 7245. The BMS must know how to interpret this integer. The OEM documentation has the scaling formula — such as: <em>Output_Load_Pct = register_value × 0.1</em>, or <em>Output_Voltage_V = register_value / 10.0</em>.
      </p>
      <p style={S.p}>
        The data type is also important. UINT16 (unsigned 16-bit, 0–65535), INT16 (signed, −32768 to +32767), UINT32 (32-bit unsigned, 2 registers), FLOAT32 (IEEE 754 float, 2 registers) — all require different decoding. In 32-bit values the byte/word order (endianness) matters — Big Endian or Little Endian. With the wrong byte order the value will come out completely wrong (reversed bits). The engineering unit is configured in the BMS — %, V, A, Hz, kW, °C, etc. — so display, alarm limits and reports are in the correct unit.
      </p>

      <h3 style={S.h3}>Polling, COV and Communication Timeouts</h3>
      <p style={S.p}>
        In <strong>Polling</strong> the BMS reads the value from the device at every configured interval. For fast-changing values (load %) a shorter interval is preferred; for slowly-changing values (room temperature) a longer interval is sufficient. The actual interval depends on controller scan capability, network load, point count and project requirements — there is no universal standard interval. This affects network load and controller capacity.
      </p>
      <p style={S.p}>
        <strong>COV (Change of Value)</strong> is a BACnet feature. The BMS registers a COV subscription — the device notifies the BMS when Present_Value changes by the configured increment (COV Increment). It is efficient for bandwidth — it can also give a better response time than interval-based polling. The <strong>Communication timeout</strong> configures how long without a response before the BMS marks the point with "Communication Failure" or "Bad" quality. The timeout value is configured according to the BMS driver, controller type and project requirement — there is no universal mandatory value.
      </p>

      <h3 style={S.h3}>Data Quality and Status Flags</h3>
      <p style={S.p}>
        Every BMS point has a quality status. <strong>Good</strong> — the value is reliable and current. <strong>Bad</strong> — communication failure or device offline. <strong>Uncertain</strong> — the value is available but reliability is questionable (e.g., sensor fault flag set). <strong>Stale</strong> — the value did not update in the expected interval. <strong>Override</strong> — the value is manually forced in the BMS (not coming from the actual equipment). In the HMI data quality is indicated by color code — green (good), red (bad), amber (uncertain). Data quality is also relevant for alarms — on "Bad" quality, is the alarm suppressed or separately alarmed?
      </p>

      <h3 style={S.h3}>Alarm Limits, Deadbands and Hysteresis</h3>
      <p style={S.p}>
        Alarm limits are configured per point in the BMS. High-High, High, Low, Low-Low — multiple levels are possible. Deadband (or hysteresis) is a band that prevents alarm toggling — if the High alarm limit is set at 90% and the value came to 90.1%, the alarm triggers. If the deadband is 2%, the alarm will clear only when the value comes below 88% — it will not clear at 90%. This prevents "flicker" or "chattering" when the value oscillates around the limit.
      </p>

      <h3 style={S.h3}>Trend Logging — What Gets Stored and How</h3>
      <p style={S.p}>
        Trend logging stores the time-series history of a point. In the configuration: log interval (e.g., every 5 minutes), trigger type (interval or COV), max records, circular buffer behavior (oldest overwrite). It is stored in the data historian — in compressed format, tagged with timestamp and quality. A long-term historian allows querying years of data — for root cause analysis, for capacity planning, for compliance reporting. The BACnet Trend Log object does controller-side logging — data is preserved even on a network interruption.
      </p>

      <h3 style={S.h3}>Historian and Data Retention</h3>
      <p style={S.p}>
        The historian is a dedicated database that stores BMS point values in time-series format. OSIsoft PI (now AVEVA PI), InfluxDB, SQL Server, or proprietary BMS databases can be used. The retention period — how long to keep data — depends on project requirements, client contracts and regulatory requirements. There is no universal mandatory retention period. Plan storage capacity according to point count, logging interval and retention period.
      </p>

      <Figure caption="Fig 5 — BMS point mapping and data binding flow — from physical Modbus register and BACnet object to tag, scaling, alarm limits and trend log.">
        <BmsPointMappingBinding />
      </Figure>
    </>
  );
}
