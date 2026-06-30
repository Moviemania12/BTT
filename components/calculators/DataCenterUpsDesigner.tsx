"use client";

import { useState, useMemo, type ChangeEvent } from "react";
import {
  kwToKva,
  calculateRedundancy,
  calculateBatteriesPerString,
  calculateBatteryAh,
  calculateHeatDissipation,
  SQRT_3,
  STANDARD_LT_VOLTAGE_3PHASE,
  BATTERY_ROOM_SQM_PER_UNIT_ASSUMPTION,
  BATTERY_ROOM_AISLE_FACTOR_ASSUMPTION,
} from "@/lib/engineering/electrical";
import { CalculatorCard } from "@/components/engineering/CalculatorCard";
import { CalculatorField } from "@/components/engineering/CalculatorField";

type TierLevel = "II" | "III" | "IV";

const TIER_INFO: Record<TierLevel, { label: string; description: string; redundancy: "N" | "N+1" | "2N" }> = {
  II: { label: "Tier II (N)", description: "Single path, no redundancy", redundancy: "N" },
  III: { label: "Tier III (N+1)", description: "Concurrently maintainable, one extra module", redundancy: "N+1" },
  IV: { label: "Tier IV (2N)", description: "Fully fault tolerant, two independent paths", redundancy: "2N" },
};

// First-pass design assumptions — explicitly disclosed to the user, not hidden defaults.
const MODULE_KVA = 250;
const DC_BUS_VOLTAGE = 192;
const BATTERY_UNIT_AH = 100;
const BATTERY_DOD = 0.8;
const BATTERY_EFFICIENCY = 0.9;
const CABLE_CURRENT_DENSITY = 4; // A/mm²
const GENERATOR_DERATING = 1.25;
const TRANSFORMER_HEADROOM = 1.2;
const RACKS_PER_PDU_PAIR = 10;

export default function DataCenterUpsDesigner() {
  const [rackCount, setRackCount] = useState<number>(100);
  const [kwPerRack, setKwPerRack] = useState<number>(5);
  const [tier, setTier] = useState<TierLevel>("III");
  const [backupMin, setBackupMin] = useState<number>(15);
  const [pf, setPf] = useState<number>(0.9);

  const result = useMemo(() => {
    if (rackCount <= 0 || kwPerRack <= 0 || backupMin <= 0 || pf <= 0 || pf > 1) return null;

    const totalCriticalKw = rackCount * kwPerRack;
    const totalCriticalKva = kwToKva(totalCriticalKw, pf);
    if (totalCriticalKva === null) return null;

    const tierInfo = TIER_INFO[tier];
    const redundancy = calculateRedundancy(totalCriticalKva, MODULE_KVA, tierInfo.redundancy);
    if (redundancy === null) return null;

    const requiredAh = calculateBatteryAh({
      loadWatts: totalCriticalKw * 1000,
      runtimeMinutes: backupMin,
      busVoltage: DC_BUS_VOLTAGE,
      depthOfDischarge: BATTERY_DOD,
      efficiency: BATTERY_EFFICIENCY,
    });
    if (requiredAh === null) return null;

    const batteriesPerString = calculateBatteriesPerString(DC_BUS_VOLTAGE, 12) ?? 0;
    const parallelPerString = Math.max(1, Math.ceil(requiredAh / BATTERY_UNIT_AH));
    const stringsNeeded = tier === "IV" ? 2 : 1;
    const totalBatteries = batteriesPerString * parallelPerString * stringsNeeded;

    const batteryRoomArea = totalBatteries * BATTERY_ROOM_SQM_PER_UNIT_ASSUMPTION * BATTERY_ROOM_AISLE_FACTOR_ASSUMPTION;

    const currentPerPhase = (redundancy.totalCapacityKva * 1000) / (SQRT_3 * STANDARD_LT_VOLTAGE_3PHASE);
    const cableSizeMm2 = currentPerPhase / CABLE_CURRENT_DENSITY;

    const generatorKva = redundancy.totalCapacityKva * GENERATOR_DERATING;
    const transformerKva = redundancy.totalCapacityKva * TRANSFORMER_HEADROOM;
    const pduQuantity = Math.max(2, Math.ceil(rackCount / RACKS_PER_PDU_PAIR) * 2);

    const heat = calculateHeatDissipation({
      ratingKva: redundancy.totalCapacityKva,
      efficiencyPercent: redundancy.totalCapacityKva > 500 ? 96 : redundancy.totalCapacityKva > 100 ? 95 : 94,
    });

    return {
      tierInfo,
      totalCriticalKw,
      totalCriticalKva,
      redundancy,
      requiredAh,
      batteriesPerString,
      parallelPerString,
      stringsNeeded,
      totalBatteries,
      batteryRoomArea,
      currentPerPhase,
      cableSizeMm2,
      generatorKva,
      transformerKva,
      pduQuantity,
      heat,
    };
  }, [rackCount, kwPerRack, tier, backupMin, pf]);

  return (
    <div
      style={{
        border: "3px solid #0066CC",
        borderRadius: "14px",
        padding: "1.75rem",
        margin: "2rem 0",
        background: "linear-gradient(135deg, #eaf4ff 0%, #ffffff 100%)",
      }}
    >
      <p style={{ fontWeight: 800, fontSize: "1.2rem", color: "#0066CC", marginBottom: "0.3rem" }}>
        🧮 Data Center UPS Designer — Complete System Sizing Tool
      </p>
      <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.2rem" }}>
        Enter rack details to get a full first-pass sizing across UPS, battery, generator, transformer, PDU, and cabling.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
        <CalculatorField label="Number of Racks" min={1} value={rackCount} onChange={setRackCount} />
        <CalculatorField label="kW per Rack" min={0.5} step={0.5} value={kwPerRack} onChange={setKwPerRack} />
        <div>
          <label style={{ fontSize: "0.85rem", color: "#475569", display: "block", marginBottom: "0.3rem" }}>Tier Level</label>
          <select value={tier} onChange={(e: ChangeEvent<HTMLSelectElement>) => setTier(e.target.value as TierLevel)} style={{ width: "100%", padding: "0.5rem 0.7rem", borderRadius: "6px", border: "1.5px solid #cbd5e1" }}>
            <option value="II">Tier II (N)</option>
            <option value="III">Tier III (N+1)</option>
            <option value="IV">Tier IV (2N)</option>
          </select>
        </div>
        <CalculatorField label="Backup Time" unit="minutes" min={1} value={backupMin} onChange={setBackupMin} />
        <CalculatorField label="Power Factor" min={0.1} max={1} step={0.01} value={pf} onChange={setPf} />
      </div>

      {result === null ? (
        <div style={{ padding: "1rem", background: "#fef2f2", borderRadius: "8px", border: "1px solid #fecaca" }}>
          <p style={{ fontSize: "0.95rem", color: "#dc2626", fontWeight: 600 }}>
            ⚠️ Please enter valid positive values — racks &gt; 0, kW/rack &gt; 0, backup time &gt; 0, and PF between 0.1 and 1.
          </p>
        </div>
      ) : (
        <>
          <div style={{ background: "#0f172a", borderRadius: "10px", padding: "1rem 1.3rem", marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.2rem" }}>
              {result.tierInfo.label} — {result.tierInfo.description}
            </p>
            <p style={{ fontSize: "1.4rem", fontWeight: 800, color: "#ffffff" }}>
              Total UPS Capacity Required: {result.redundancy.totalCapacityKva.toFixed(0)} kVA
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.8rem" }}>
            {[
              { label: "Recommended UPS Modules", value: `${result.redundancy.totalModules} × ${MODULE_KVA} kVA`, note: `Base need: ${result.redundancy.baseModules} modules` },
              { label: "Number of Batteries", value: `${result.totalBatteries}`, note: `${result.batteriesPerString} per string × ${result.parallelPerString} parallel` },
              { label: "Number of Strings", value: `${result.stringsNeeded}`, note: tier === "IV" ? "2N — fully redundant strings" : "Single string path" },
              { label: "Battery Room Area", value: `${result.batteryRoomArea.toFixed(1)} m²`, note: "Includes 30% access/aisle space" },
              { label: "Cable Size (per phase)", value: `${result.cableSizeMm2.toFixed(0)} mm²`, note: `At ${result.currentPerPhase.toFixed(0)} A, 415V 3-phase` },
              { label: "Generator Size", value: `${result.generatorKva.toFixed(0)} kVA`, note: "UPS load + 25% derating margin" },
              { label: "Transformer Size", value: `${result.transformerKva.toFixed(0)} kVA`, note: "UPS load + 20% headroom" },
              { label: "PDU Quantity", value: `${result.pduQuantity}`, note: "Redundant A+B feed, ~10 racks/PDU" },
              { label: "Heat Dissipation", value: `${result.heat?.btuPerHour.toFixed(0) ?? "—"} BTU/hr`, note: `${result.heat?.lossesKw.toFixed(1) ?? "—"} kW UPS losses` },
              { label: "Estimated UPS Efficiency", value: `~${result.redundancy.totalCapacityKva > 500 ? 96 : result.redundancy.totalCapacityKva > 100 ? 95 : 94}%`, note: "Double conversion, typical at this scale" },
              { label: "Required Battery Capacity", value: `${result.requiredAh.toFixed(0)} Ah`, note: `Per string, at ${backupMin} min backup` },
            ].map((item) => (
              <div key={item.label} style={{ background: "#ffffff", border: "1.5px solid #bfdbfe", borderRadius: "8px", padding: "0.8rem 1rem" }}>
                <p style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "0.25rem" }}>{item.label}</p>
                <p style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0066CC", marginBottom: "0.2rem" }}>{item.value}</p>
                <p style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{item.note}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: "1rem", lineHeight: 1.5 }}>
            ⚠️ Yeh sizing tool first-pass estimation deta hai using industry-standard rules of thumb
            (192V DC bus, 100Ah VRLA units, 250kVA modular blocks, 4 A/mm² cable density). Actual
            project design OEM datasheet, site survey, aur structural/electrical consultant verification
            ke baad hi finalize karna chahiye — yeh calculator design ka starting point hai, final
            answer nahi.
          </p>
        </>
      )}
    </div>
  );
}
