"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import UpsPduToDcim from "../svg/UpsPduToDcim";

export default function CoreFunctions() {
  return (
    <>
      <h2 id="asset-management" style={S.h2}>Asset and Rack Management</h2>
      <p style={S.p}>Asset management DCIM ka foundation hai. Har equipment piece — server, switch, UPS, PDU, patch panel — ek asset record ke roop mein DCIM database mein exist karta hai: make, model, serial number, asset tag, purchase date, warranty, location (data hall, row, rack, U position), responsible team, power draw (nameplate aur actual). Rack elevation view individual U slots ka 2D diagram show karta hai — visually kaunsa slot occupied hai, kaunsa empty hai, upar se dekhne pe full picture milti hai.</p>
      <p style={S.p}>Asset discovery automated ya manual ho sakti hai. Network discovery (ping sweep, SNMP scan) active devices discover karta hai. Barcode/QR scanning physical assets tag karna allow karta hai. Spreadsheet import bulk asset population ke liye use hota hai initial deployment mein. Discovery tools ke baad manual verification zaroori hoti hai — discovered data always complete ya accurate nahi hoti.</p>
      <Callout type="important" title="Asset Data Quality — Garbage In, Garbage Out">
        DCIM ki capacity planning sirf utni accurate hai jitni asset data accurate hai. Agar rack mein 5 servers hain lekin DCIM mein 3 show ho rahe hain — capacity calculation wrong hogi. Data quality maintenance ongoing process hai — every MAC (Move/Add/Change) pe DCIM update hona chahiye. Stale or inaccurate asset data DCIM ki usefulness severely compromise karta hai.
      </Callout>

      <h2 id="power-chain" style={S.h2}>Power Chain and Capacity Visualization</h2>
      <p style={S.p}>DCIM power chain model karta hai — utility → transformer → UPS → static transfer switch → PDU → rack → individual outlet → server. Ye hierarchical model allow karta hai ki ek server se trace karo aur dekho wo kaunsi UPS pe, kaunsi circuit pe, kaunsi breaker pe hai. Power chain visualization capacity planning ke liye critical hai — agar UPS A 80% load pe hai, new servers UPS B pe provision karo.</p>
      <p style={S.p}>Actual power data intelligent PDUs (iPDUs) se aata hai — outlet-level current monitoring provide karte hain kuch models. SNMP se PDU data — per-outlet kW, total kW, temperature (kuch models) — DCIM mein real-time visible hota hai. Nameplate (rated) vs actual power comparison DCIM mein available hota hai jahan real metering present hai. Where metering nahi hai — nameplate estimation use hoti hai jo typically conservative aur inaccurate hoti hai.</p>

      <h2 id="cooling-environment" style={S.h2}>Cooling and Environmental Monitoring</h2>
      <p style={S.p}>DCIM environmental monitoring temperature, humidity aur differential pressure sensors se data collect karta hai — typically SNMP ya BACnet wireless/wired sensors se. CRAC/CRAH units se supply air temperature, return air temperature, cooling capacity — where unit supports SNMP ya BACnet. DCIM floor plan pe sensors ka heatmap view show karta hai — hot spots identify hote hain visually. Cooling capacity vs IT load correlation DCIM mein track hoti hai — PUE calculation ke liye bhi relevant.</p>
      <p style={S.p}>DCIM cooling data typically <TopicLink slug="bms" variant="inline"/> se bhi receive kar sakta hai integration ke through — BMS detailed HVAC operational data deta hai jabki DCIM IT context provide karta hai. Dono together comprehensive picture dete hain.</p>

      <h2 id="space-capacity" style={S.h2}>Space, Power and Cooling Capacity Planning</h2>
      <p style={S.p}>Capacity planning DCIM ka highest-value function hai. Three critical dimensions: <strong>Space capacity</strong> — total U slots vs occupied vs reserved vs available per rack, per row, per zone. <strong>Power capacity</strong> — UPS/PDU rated capacity vs actual measured load vs allocated (reserved for planned equipment) — remaining headroom calculate karo. <strong>Cooling capacity</strong> — CRAC/CRAH rated cooling tonnage vs current IT load — stranded cooling identify karo.</p>
      <p style={S.p}>Capacity forecasting: current consumption trend pe based — DCIM project karta hai kab capacity full hogi. "What-if" analysis: agar 10 aur servers add karein to power, space, cooling pe kya impact? DCIM planning view se verify karo before purchase aur commissioning. Forecasting accuracy depends on data quality aur usage growth assumptions — treat as projections, not guarantees.</p>

      <h2 id="cable-management" style={S.h2}>Cable and Connectivity Management</h2>
      <p style={S.p}>Kuch DCIM platforms cable management include karte hain — port connectivity tracking: server NIC A → patch panel port X → switch port Y. Ye logical connectivity map cable plant accurately reflect kare to useful hai, lekin manual update required hoti hai har cable change pe. Automated cable discovery limited hai — some platforms use barcode-labeled cables ya electronic patch panels. Cable management DCIM ka optional feature hai — kuch platforms mein basic hai, kuch mein comprehensive. Verify capabilities per platform.</p>

      <h2 id="mac-workflows" style={S.h2}>Moves, Adds, Changes and Work Orders</h2>
      <p style={S.p}>DCIM MAC (Move/Add/Change) workflows manage karta hai — new server add karna chahte ho to DCIM mein planned change enter karo: target rack, U slot, power requirement, network connectivity. Capacity check automatic hoti hai — is rack pe itna power aur space hai? Approval workflow send hota hai relevant teams ko. Work order generate hota hai installation team ke liye. Post-installation DCIM update karo aur verify karo asset correctly registered hai. Audit trail every change document karta hai — who requested, who approved, when executed.</p>

      <h2 id="alarms-analytics" style={S.h2}>Alarms, Analytics and Dashboards</h2>
      <p style={S.p}>DCIM alarms environmental thresholds pe (temperature &gt;30°C), power thresholds pe (rack &gt;80% rated power), device communication failure pe, aur battery backup events pe generate karte hain. Analytics engine trend data analyze karta hai — rack power growth rate, cooling efficiency over time, capacity utilization trends. Dashboard executive view (facility-level KPIs) aur operational view (individual device status) dono provide karta hai. Customization level platform pe depend karta hai.</p>

      <h2 id="dcim-reporting" style={S.h2}>DCIM Reporting in Depth</h2>
      <p style={S.p}><strong>Asset Reports:</strong> Full asset inventory by location, by type, by status; warranty expiry; equipment age; untracked/ghost assets.</p>
      <p style={S.p}><strong>Capacity Reports:</strong> Space utilization per rack/row/hall; power utilization per UPS/PDU/rack; cooling capacity vs IT load; capacity runway (months until full at current growth rate).</p>
      <p style={S.p}><strong>Power Reports:</strong> Real-time and historical per-rack kW; UPS load %; PDU branch currents; peak demand periods; power efficiency per rack.</p>
      <p style={S.p}><strong>Environmental Reports:</strong> Temperature trend per zone; hot spot history; humidity compliance; out-of-range incidents.</p>
      <p style={S.p}><strong>Alarm Reports:</strong> Alarm count by severity, by device, by location; MTTR; unacknowledged alarms history.</p>
      <p style={S.p}><strong>Availability/History:</strong> Device uptime, downtime events, planned vs unplanned outages (where tracked). Custom reports aur API export platform capability pe depend karte hain — verify per platform.</p>

      <h2 id="integration" style={S.h2}>DCIM Integration Architecture</h2>
      <p style={S.p}><strong>Southbound (from devices to DCIM):</strong> SNMP from intelligent PDUs, UPS, environmental sensors, switches; Modbus from UPS, energy meters, CRAC units; REST API from modern smart devices, cloud meters; BACnet from CRAC/CRAH where supported; agent-based from servers (OS agent, IPMI); manual import CSV/XLSX.</p>
      <p style={S.p}><strong>Northbound (from DCIM to other systems):</strong> Common integration patterns include REST API (BMS, EMS, NMS, CMMS ke saath), SNMP traps (NMS ko), Syslog (SIEM ko), aur WebHooks (event-driven notification). Ye sab general architecture patterns hain — kaunse specifically available hain ye DCIM platform, edition aur version pe depend karta hai. Integration design karte time vendor documentation se confirm karo.</p>
      <Callout type="warning" title="Data Normalization — Critical for Integration">
        Different sources — SNMP PDU, Modbus meter, BACnet CRAC — different units, scales aur naming use karte hain. DCIM data normalization karta hai: same rack ka power kW mein consistently show karo chahe source PDU SNMP ho ya meter Modbus. Normalization mapping carefully configure karo aur verify karo — wrong normalization misleading capacity data produce karta hai.
      </Callout>

      <h2 id="ups-pdu-to-dcim" style={S.h2}>How UPS and PDU Data Reaches DCIM — Step by Step</h2>
      <Figure caption="Fig 2 — Complete workflow showing how UPS and PDU data is discovered, configured and integrated into DCIM power chain visualization."><UpsPduToDcim/></Figure>
      <p style={S.p}>Step 1: UPS ka communication interface identify karo — SNMP network management card (most common), Modbus TCP/RTU, ya manufacturer proprietary protocol. PDU ke liye: intelligent PDUs typically SNMP support karte hain built-in. Step 2: OEM MIB file (SNMP ke liye) ya register map (Modbus) obtain karo — ye DCIM point mapping ke liye zaroori hai. Step 3: Network connectivity verify karo — DCIM server se UPS/PDU IP ping, SNMP walk test karo (snmpwalk command). Step 4: DCIM mein device add karo, protocol configure karo, discovery run karo. Step 5: Discovered points map karo relevant DCIM objects pe — UPS battery %, load %, bypass status; PDU total kW, per-branch current. Step 6: Asset link karo — ye UPS kaunse racks serve karta hai? PDU branch X kaunse servers pe connected? Step 7: Alarms, trends aur capacity reports configure karo.</p>
    </>
  );
}
