"use client";

import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import UpsToBmsIntegration from "../svg/UpsToBmsIntegration";

export default function UpsIntegration() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 12 — UPS TO BMS INTEGRATION
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="ups-integration" style={S.h2}>How to Integrate a UPS with BMS — Step by Step</h2>

      <p style={S.p}>
        UPS integration is a bread-and-butter task for BMS engineers. Once you understand this process properly — how to read a Modbus register map, how to add a device in the BMS, how to configure point mapping and scaling — this skill applies to almost every equipment integration.
      </p>

      <Figure caption="Fig 3 — Complete UPS-to-BMS integration workflow from OEM documentation through commissioning.">
        <UpsToBmsIntegration />
      </Figure>

      <h3 style={S.h3}>Step 1 — Identify UPS Make, Model and Communication Interface</h3>
      <p style={S.p}>
        First note the UPS make, model number and firmware version. Different models even from the same vendor have different register maps and communication capabilities — and in some UPS the communication protocol is available through a separate optional card (Modbus card, SNMP card, BACnet card) that must be installed. Confirm the model from the UPS front panel or nameplate. Identify the communication interface — it can be an RS-485 serial port (Modbus RTU), Ethernet port (Modbus TCP or BACnet/IP), SNMP network card, or another interface. Some UPS have multiple interfaces — select the appropriate one for the BMS.
      </p>

      <Callout type="important" title="Three Separate Questions — Data Available, Exposed, and Integrated">
        There are three separate questions in BMS integration. First: what data does the equipment measure or calculate internally? Second: which subset has been exposed in the OEM communication interface (register map, BACnet object list, SNMP MIB)? Third: which points are actually configured and integrated in the BMS project? These three are not automatically the same. A UPS may track 50+ parameters internally — but only 20 may be exposed in the register map — and only 10 may actually be configured in the BMS project. Always verify from OEM documentation what is actually available via the specific communication interface.
      </Callout>

      <h3 style={S.h3}>Step 2 — Obtain OEM Documentation</h3>
      <p style={S.p}>
        This is the most important step. Without OEM documentation it is blind guessing — reading the wrong register can give wrong values or even equipment command issues. Required documents:
      </p>
      <ul style={S.ul}>
        <li><strong>Modbus register map</strong> — if Modbus is being used. Register address (1-based or 0-based clearly noted), register type (HR/IR/Coil/DI), data type (UINT16, INT16, FLOAT32), scaling formula, units.</li>
        <li><strong>BACnet object list</strong> — if BACnet is being used. Device ID, all object types and instance numbers, Present_Value units, writable properties.</li>
        <li><strong>SNMP MIB file</strong> — if SNMP is being used. OID tree, data types, accessible OIDs.</li>
        <li><strong>Communication manual</strong> — physical connection, baud rate, parity, default settings.</li>
        <li><strong>OEM monitoring software</strong> (if available) — for cross-checking values.</li>
      </ul>

      <Callout type="important" title="Register Map Version Matters">
        The register map can change on a UPS firmware update. Always confirm the documentation version that matches the installed firmware. If you integrate with an old register map, some points will not map correctly. If there seems to be a mismatch, ask the vendor for the latest firmware-specific documentation.
      </Callout>

      <h3 style={S.h3}>Step 3 — Configure Physical Communication</h3>
      <p style={S.p}>
        <strong>RS-485 (Modbus RTU):</strong> Connect to the UPS RS-485 port — verify A and B wire polarity (A = positive, B = negative in most conventions, but confirm the OEM manual). Follow OEM guidance for the shield/ground wire. Termination resistor (typically 120 ohm) at both ends of the bus — if the UPS is at the bus end, enable the resistor (internal DIP switch or jumper). Set baud rate, parity, stop bits and slave ID from the UPS front panel or web interface. Configure the same settings on the BMS controller.
      </p>
      <p style={S.p}>
        <strong>Ethernet (Modbus TCP or BACnet/IP):</strong> Assign an IP address to the UPS network interface — a static IP is preferred for BMS integration (with DHCP the IP can change). Set the IP address, subnet mask, default gateway. Verify connectivity with ping. Confirm firewall/VLAN rules — the UPS IP and required port are reachable from the BMS server.
      </p>

      <h3 style={S.h3}>Step 4 — Configure BMS Driver and Device</h3>
      <p style={S.p}>
        Add a new device in the BMS software. Select the protocol (Modbus RTU, Modbus TCP, BACnet/IP, SNMP). Enter the connection parameters — IP address and port (for Modbus TCP), or COM port and baud/parity/slave ID (for RTU), or community string and OIDs (for SNMP). Give the device a name that identifies it — e.g., "UPS-ROOM-A-APC-250kVA". Save and verify the device is coming online — the BMS typically shows a green/gray/red indicator for device communication status.
      </p>

      <h3 style={S.h3}>Step 5 — Discover or Manually Create Points</h3>
      <p style={S.p}>
        BACnet devices can often be auto-discovered — the BMS sends a Who-Is broadcast and BACnet devices respond with I-Am. The object list can be imported automatically. In Modbus and SNMP there is typically no auto-discovery — points have to be created manually. From the OEM register map, for each point: register address, register type, function code, data type, scaling, engineering unit — enter all of these. A shortcut: some BMS platforms support importing a Modbus device configuration file (CSV/XML) — it saves time.
      </p>

      <h3 style={S.h3}>Step 6 — Map and Bind Points</h3>
      <p style={S.p}>
        Link every BMS point to a physical address. In Modbus: device → function code → register address → data type. In BACnet: device → object type → instance → property (typically Present_Value). In SNMP: device → OID. The tag name identifies the point — follow a naming convention: e.g., "UPS-A1.Output_Load_Pct", "UPS-A1.Battery_Voltage", "UPS-A1.Bypass_Status". Consistent naming simplifies future maintenance.
      </p>

      <h3 style={S.h3}>Step 7 — Configure Scaling, Data Types and Engineering Units</h3>
      <p style={S.p}>
        Read the scaling formula from the OEM documentation. Enter it in the BMS point configuration. The data type must match the OEM specification — UINT16 for most 0-based values, INT16 for signed (e.g., temperature can be negative), FLOAT32 for floating point (2 registers, verify byte order). Configure the engineering unit — %, V, A, Hz, kW, min, °C. If the unit is configured wrong, there will be operator confusion and the alarm thresholds will be wrong.
      </p>

      <Callout type="best-practice" title="Verify Scaling Before Alarming">
        Before configuring alarm limits, verify that the scaled values are correct — cross-check with the UPS local display. If the BMS shows 72.4% load and the UPS display shows 72%, the scaling is approximately correct. If the BMS is showing 7240 — the scaling factor is missing. Fix first, then configure alarms and trends.
      </Callout>

      <h3 style={S.h3}>Step 8 — Create HMI Graphics</h3>
      <p style={S.p}>
        Build a dedicated HMI page for the UPS — single line diagram style is ideal. Input → UPS block → Output, battery level indicator, key parameters (load%, output V, battery SOC, mode). Color coding: normal (green), warning (amber), critical (red). Bind every displayed value to the correct BMS tag — verify the binding is correct by checking that the value changes on screen when the UPS condition changes.
      </p>

      <h3 style={S.h3}>Step 9 — Configure Alarms</h3>
      <p style={S.p}>
        Per project policy, configure the relevant alarm points. Common UPS alarms in BMS:
      </p>
      <ul style={S.ul}>
        <li><strong>UPS Common Alarm</strong> — single digital input, priority per project. Acknowledge required.</li>
        <li><strong>UPS Critical Alarm</strong> — if exposed separately, highest priority.</li>
        <li><strong>Output Load % High</strong> — analog alarm, threshold per project (e.g., 80% warning, 95% critical). Add 2-3% deadband.</li>
        <li><strong>Battery SOC Low</strong> — warn when battery below x% SOC. Threshold project-specific.</li>
        <li><strong>Battery Runtime Low</strong> — warn when estimated runtime below threshold.</li>
        <li><strong>Operating Mode — Bypass</strong> — a digital alarm if the UPS goes into bypass mode.</li>
        <li><strong>Communication Failure</strong> — auto-generated when BMS loses comms with UPS.</li>
      </ul>
      <p style={S.p}>
        Configure delay/debounce where appropriate — so there is no alarm on transient spikes. Keep the alarm message meaningful — "UPS-A1 Output Load High — 92.3 %" vs a generic "Analog High Alarm".
      </p>

      <h3 style={S.h3}>Step 10 — Configure Trends</h3>
      <p style={S.p}>
        Trend-log the key UPS points: output load %, output voltage per phase, battery SOC, battery temperature (if available). Select the log interval — every 1–5 minutes for load monitoring, longer intervals for stable parameters like battery voltage at rest. Historian retention period per project policy.
      </p>

      <h3 style={S.h3}>Step 11 — Point-to-Point Testing and Commissioning</h3>
      <p style={S.p}>
        Test every point individually. Compare the BMS value with the UPS local display. Load % — do the values match? Bypass status — if the bypass point has to be tested, it must be a planned, authorized test per site SOP/MOP/EOP, OEM procedure, risk assessment and supervision — operating bypass casually is not safe; coordinate with the site operations team. Alarm — use the test alarm function on the UPS (if an OEM test mode is available) or simulate a dry contact; avoid inducing actual fault conditions without proper planning. Trend — verify some readings in the data logger. Document all tests — write each point's result in the commissioning sign-off sheet (UPS source value, BMS displayed value, pass/fail).
      </p>

      <ComparisonTable
        title="Typical UPS Points for BMS Integration (Verify with OEM Register Map)"
        headers={["Point Name", "Type", "Source", "Typical Engineering Unit", "Common Use"]}
        rows={[
          ["Input Voltage L1/L2/L3", "Analog", "Modbus IR/HR or BACnet AI", "V AC", "Grid supply monitoring"],
          ["Input Current L1/L2/L3", "Analog", "Modbus IR/HR or BACnet AI", "A", "Load current monitoring"],
          ["Input Frequency", "Analog", "Modbus IR/HR", "Hz", "Grid frequency alarm"],
          ["Output Voltage L1/L2/L3", "Analog", "Modbus IR/HR or BACnet AI", "V AC", "Output quality"],
          ["Output Current L1/L2/L3", "Analog", "Modbus IR/HR", "A", "Load monitoring"],
          ["Output Load %", "Analog", "Modbus IR/HR", "%", "Capacity alarm threshold"],
          ["Output Frequency", "Analog", "Modbus IR/HR", "Hz", "Output frequency check"],
          ["Battery Voltage", "Analog", "Modbus IR/HR", "V DC", "Battery health"],
          ["Battery SOC / Capacity %", "Analog", "Modbus IR/HR or SNMP OID", "%", "Low battery alarm"],
          ["Battery Runtime Remaining", "Analog", "Modbus IR/HR or SNMP OID", "min", "Run time alarm"],
          ["Battery Temperature", "Analog", "Modbus IR/HR", "°C", "Thermal management"],
          ["UPS Operating Mode", "Analog/Digital", "Modbus HR or BACnet AV", "Enum", "Normal/Bypass/Battery"],
          ["Bypass Status", "Digital", "Modbus Coil/DI or BACnet BI", "On/Off", "Alarm when on bypass"],
          ["Common Alarm", "Digital", "Dry contact or Modbus DI", "Active/Normal", "General alarm catch-all"],
          ["Critical Alarm", "Digital", "Dry contact or Modbus DI", "Active/Normal", "Highest priority alarm"],
        ]}
        caption="Actual point names, register addresses and object instances are UPS-specific. Always verify with OEM documentation. Never assume register addresses from another model."
      />

      <Callout type="maintenance" title="UPS Integration — Ongoing Maintenance">
        After a UPS firmware update, do an integration test — the register map or BACnet object list can change. In annual preventive maintenance verify the BMS-UPS integration: all points are showing correct values, alarms are functional, trends are logging.
      </Callout>
    </>
  );
}
