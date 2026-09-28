"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import UpsPduToDcim from "../svg/UpsPduToDcim";

export default function CoreFunctions() {
  return (
    <>
      <h2 id="asset-management" style={S.h2}>Asset and Rack Management</h2>
      <p style={S.p}>Asset management is the foundation of DCIM. Every piece of equipment — server, switch, UPS, PDU, patch panel — exists in the DCIM database as an asset record: make, model, serial number, asset tag, purchase date, warranty, location (data hall, row, rack, U position), responsible team, power draw (nameplate and actual). The rack elevation view shows a 2D diagram of individual U slots — visually which slot is occupied, which is empty; looking at it from the top you get the full picture.</p>
      <p style={S.p}>Asset discovery can be automated or manual. Network discovery (ping sweep, SNMP scan) discovers active devices. Barcode/QR scanning allows tagging physical assets. Spreadsheet import is used for bulk asset population in the initial deployment. Manual verification is essential after discovery tools — discovered data is not always complete or accurate.</p>
      <Callout type="important" title="Asset Data Quality — Garbage In, Garbage Out">
        DCIM capacity planning is only as accurate as the asset data. If a rack has 5 servers but DCIM shows 3 — the capacity calculation will be wrong. Data quality maintenance is an ongoing process — DCIM must be updated on every MAC (Move/Add/Change). Stale or inaccurate asset data severely compromises the usefulness of DCIM.
      </Callout>

      <h2 id="power-chain" style={S.h2}>Power Chain and Capacity Visualization</h2>
      <p style={S.p}>DCIM models the power chain — utility → transformer → UPS → static transfer switch → PDU → rack → individual outlet → server. This hierarchical model lets you trace from a server and see which UPS, which circuit, which breaker it is on. Power chain visualization is critical for capacity planning — if UPS A is at 80% load, provision new servers on UPS B.</p>
      <p style={S.p}>Actual power data comes from intelligent PDUs (iPDUs) — some models provide outlet-level current monitoring. PDU data over SNMP — per-outlet kW, total kW, temperature (some models) — is visible in real time in DCIM. A nameplate (rated) vs actual power comparison is available in DCIM where real metering is present. Where there is no metering — nameplate estimation is used, which is typically conservative and inaccurate.</p>

      <h2 id="cooling-environment" style={S.h2}>Cooling and Environmental Monitoring</h2>
      <p style={S.p}>DCIM environmental monitoring collects data from temperature, humidity and differential pressure sensors — typically from SNMP or BACnet wireless/wired sensors. From CRAC/CRAH units: supply air temperature, return air temperature, cooling capacity — where the unit supports SNMP or BACnet. DCIM shows a heatmap view of the sensors on the floor plan — hot spots are identified visually. Cooling capacity vs IT load correlation is tracked in DCIM — also relevant for PUE calculation.</p>
      <p style={S.p}>DCIM can typically also receive cooling data from <TopicLink slug="bms" variant="inline"/> through integration — the BMS gives detailed HVAC operational data while DCIM provides the IT context. Together they give a comprehensive picture.</p>

      <h2 id="space-capacity" style={S.h2}>Space, Power and Cooling Capacity Planning</h2>
      <p style={S.p}>Capacity planning is the highest-value function of DCIM. Three critical dimensions: <strong>Space capacity</strong> — total U slots vs occupied vs reserved vs available per rack, per row, per zone. <strong>Power capacity</strong> — UPS/PDU rated capacity vs actual measured load vs allocated (reserved for planned equipment) — calculate the remaining headroom. <strong>Cooling capacity</strong> — CRAC/CRAH rated cooling tonnage vs current IT load — identify stranded cooling.</p>
      <p style={S.p}>Capacity forecasting: based on the current consumption trend — DCIM projects when capacity will be full. "What-if" analysis: if we add 10 more servers, what is the impact on power, space, cooling? Verify from the DCIM planning view before purchase and commissioning. Forecasting accuracy depends on data quality and usage growth assumptions — treat as projections, not guarantees.</p>

      <h2 id="cable-management" style={S.h2}>Cable and Connectivity Management</h2>
      <p style={S.p}>Some DCIM platforms include cable management — port connectivity tracking: server NIC A → patch panel port X → switch port Y. This logical connectivity map is useful if it accurately reflects the cable plant, but a manual update is required on every cable change. Automated cable discovery is limited — some platforms use barcode-labeled cables or electronic patch panels. Cable management is an optional DCIM feature — basic in some platforms, comprehensive in others. Verify capabilities per platform.</p>

      <h2 id="mac-workflows" style={S.h2}>Moves, Adds, Changes and Work Orders</h2>
      <p style={S.p}>DCIM manages MAC (Move/Add/Change) workflows — if you want to add a new server, enter the planned change in DCIM: target rack, U slot, power requirement, network connectivity. The capacity check is automatic — does this rack have this much power and space? An approval workflow is sent to the relevant teams. A work order is generated for the installation team. Post-installation, update DCIM and verify the asset is correctly registered. The audit trail documents every change — who requested, who approved, when executed.</p>

      <h2 id="alarms-analytics" style={S.h2}>Alarms, Analytics and Dashboards</h2>
      <p style={S.p}>DCIM alarms are generated on environmental thresholds (temperature &gt;30°C), on power thresholds (rack &gt;80% rated power), on device communication failure, and on battery backup events. The analytics engine analyzes trend data — rack power growth rate, cooling efficiency over time, capacity utilization trends. The dashboard provides both an executive view (facility-level KPIs) and an operational view (individual device status). The customization level depends on the platform.</p>

      <h2 id="dcim-reporting" style={S.h2}>DCIM Reporting in Depth</h2>
      <p style={S.p}><strong>Asset Reports:</strong> Full asset inventory by location, by type, by status; warranty expiry; equipment age; untracked/ghost assets.</p>
      <p style={S.p}><strong>Capacity Reports:</strong> Space utilization per rack/row/hall; power utilization per UPS/PDU/rack; cooling capacity vs IT load; capacity runway (months until full at current growth rate).</p>
      <p style={S.p}><strong>Power Reports:</strong> Real-time and historical per-rack kW; UPS load %; PDU branch currents; peak demand periods; power efficiency per rack.</p>
      <p style={S.p}><strong>Environmental Reports:</strong> Temperature trend per zone; hot spot history; humidity compliance; out-of-range incidents.</p>
      <p style={S.p}><strong>Alarm Reports:</strong> Alarm count by severity, by device, by location; MTTR; unacknowledged alarms history.</p>
      <p style={S.p}><strong>Availability/History:</strong> Device uptime, downtime events, planned vs unplanned outages (where tracked). Custom reports and API export depend on platform capability — verify per platform.</p>

      <h2 id="integration" style={S.h2}>DCIM Integration Architecture</h2>
      <p style={S.p}><strong>Southbound (from devices to DCIM):</strong> SNMP from intelligent PDUs, UPS, environmental sensors, switches; Modbus from UPS, energy meters, CRAC units; REST API from modern smart devices, cloud meters; BACnet from CRAC/CRAH where supported; agent-based from servers (OS agent, IPMI); manual import CSV/XLSX.</p>
      <p style={S.p}><strong>Northbound (from DCIM to other systems):</strong> Common integration patterns include REST API (with BMS, EMS, NMS, CMMS), SNMP traps (to NMS), Syslog (to SIEM), and WebHooks (event-driven notification). These are all general architecture patterns — which ones are specifically available depends on the DCIM platform, edition and version. Confirm from vendor documentation when designing the integration.</p>
      <Callout type="warning" title="Data Normalization — Critical for Integration">
        Different sources — SNMP PDU, Modbus meter, BACnet CRAC — use different units, scales and naming. DCIM does data normalization: show the same rack's power consistently in kW whether the source is PDU SNMP or meter Modbus. Configure and verify the normalization mapping carefully — wrong normalization produces misleading capacity data.
      </Callout>

      <h2 id="ups-pdu-to-dcim" style={S.h2}>How UPS and PDU Data Reaches DCIM — Step by Step</h2>
      <Figure caption="Fig 2 — Complete workflow showing how UPS and PDU data is discovered, configured and integrated into DCIM power chain visualization."><UpsPduToDcim/></Figure>
      <p style={S.p}>Step 1: Identify the UPS communication interface — SNMP network management card (most common), Modbus TCP/RTU, or manufacturer proprietary protocol. For PDUs: intelligent PDUs typically support SNMP built-in. Step 2: Obtain the OEM MIB file (for SNMP) or register map (Modbus) — this is essential for DCIM point mapping. Step 3: Verify network connectivity — ping the UPS/PDU IP from the DCIM server, do an SNMP walk test (snmpwalk command). Step 4: Add the device in DCIM, configure the protocol, run discovery. Step 5: Map the discovered points to the relevant DCIM objects — UPS battery %, load %, bypass status; PDU total kW, per-branch current. Step 6: Link the asset — which racks does this UPS serve? Which servers is PDU branch X connected to? Step 7: Configure alarms, trends and capacity reports.</p>
    </>
  );
}
