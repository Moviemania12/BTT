"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/sections/RoomCalculations.tsx
//
// Part 11 — Battery Room Engineering Calculations (Blueprint v3.0 Part 11)
// Heading IDs: room-engineering-calculations, h2-ventilation-calc,
//              heat-load-calc, cooling-load-calc, floor-loading-calc,
//              weight-calc, room-sizing-calc
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, SectionIntro } from "../shared";

export default function RoomCalculations() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          PART 11 — BATTERY ROOM ENGINEERING CALCULATIONS
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="room-engineering-calculations" style={S.h2}>Battery Room Engineering Calculations</h2>

      <SectionIntro
        quickAnswer="Battery room design sirf racks aur batteries arrange karne se nahi hota — 6 engineering calculations mandatory hain: hydrogen ventilation, heat load, cooling load, floor loading, battery weight, aur room sizing. Yeh calculations civil, HVAC, aur structural engineers ke saath coordinate karte waqt provide karni hoti hain."
        engineerTip="Indian projects mein sabse commonly skipped calculation floor loading hai. Engineers assume karte hain ki standard office floor kafi hai — galat. VRLA 2V cells easily 65-80kg each hote hain; 3 strings × 96 cells = 288 cells × 70kg average = 20,160 kg sirf batteries. Uss room ka floor loading verify kiya? Structural engineer mandatory hai."
        keyTakeaway="Yeh 6 calculations battery room ka 'civil brief' bana deti hain — inke bina construction drawings issue nahi honi chahiye."
      />

      {/* ─── 11.1 H₂ Ventilation ─────────────────────────────────── */}
      <h3 id="h2-ventilation-calc" style={S.h3}>11.1 — Hydrogen Ventilation Calculation</h3>

      <p style={S.p}>
        VRLA batteries mein normal float charging pe minimal hydrogen gas banta hai — lekin
        overcharge ya equalisation pe significant H₂ generation hoti hai. H₂ ka Lower Explosive
        Limit (LEL) air mein sirf 4% hai — yeh bahut low hai. Ventilation mandatory hai.
      </p>

      <p style={S.p}>
        <strong>Formula (IEEE 1187):</strong>
        <br />
        H₂ generation rate (L/hr) = 0.00042 × I_charge (A) × N_cells
      </p>

      <p style={S.p}>
        <strong>Minimum ventilation rate:</strong>
        <br />
        Q (m³/hr) = (H₂_rate_L/hr × Safety_factor) ÷ 0.01
        <br />
        Safety factor = 5× (standard); 0.01 = 1% of air volume (= 25% of LEL, safety limit)
      </p>

      <ComparisonTable
        headers={["Parameter", "Value", "Unit", "Source"]}
        rows={[
          ["H₂ generation constant", "0.00042", "L per Ah per cell", "IEEE 1187"],
          ["Charge current (example)", "50", "A (at C10 rate for 500Ah bank)", "Project-specific"],
          ["Number of cells (example)", "288", "cells (3 strings × 96 cells for 192V)", "String design"],
          ["H₂ rate", "0.00042 × 50 × 288 = 6.05", "L/hr", "Calculated"],
          ["Safety factor", "5×", "Dimensionless", "Standard practice"],
          ["Min ventilation (Q)", "(6.05 × 5) ÷ 0.01 = 3,025", "m³/hr", "Required HVAC exhaust rate"],
        ]}
      />

      <Callout type="danger" title="Danger — Ventilation Fan Must Be Explosion-Proof">
        Battery room ka exhaust fan H₂ gas through flow karta hai — ordinary fan motors spark
        kar sakte hain aur H₂ ignite ho sakta hai. ATEX-rated ya explosion-proof (Ex-rated) fans
        mandatory hain battery room exhaust ke liye. Regular industrial fans kabhi mat lagao.
      </Callout>

      <ComparisonTable
        headers={["Battery Room Size", "Cells (192V, 3 strings)", "H₂ Rate (50A charge)", "Min Ventilation Required"]}
        rows={[
          ["Small (100 kVA UPS)", "96 cells", "2.0 L/hr", "1,010 m³/hr"],
          ["Medium (500 kVA UPS)", "288 cells", "6.0 L/hr", "3,025 m³/hr"],
          ["Large (1 MVA UPS)", "576 cells", "12.1 L/hr", "6,050 m³/hr"],
          ["Very Large (2 MVA UPS)", "1152 cells", "24.2 L/hr", "12,100 m³/hr"],
        ]}
      />

      <p style={S.p}>
        H₂ sensor (electrochemical type) install karo ceiling ke paas — H₂ lighter than air hai
        isliye ceiling pe collect hota hai. Sensor alarm at 10% LEL (0.4% H₂ in air) aur
        critical at 20% LEL (0.8% H₂) set karo.
      </p>

      {/* ─── 11.2 Heat Load ─────────────────────────────────────────── */}
      <h3 id="heat-load-calc" style={S.h3}>11.2 — Heat Load Calculation</h3>

      <p style={S.p}>
        Battery bank heat generate karta hai during both charge aur discharge. Yeh heat battery
        room temperature raise karta hai — jo battery life reduce karta hai. Cooling design
        ke liye heat load accurately calculate karna zaroori hai.
      </p>

      <p style={S.p}>
        <strong>Charge heat (W):</strong> Q_charge = V_charge × I_charge × (1 − η_charge)
        <br />
        <strong>Discharge heat (W):</strong> Q_discharge = I² × R_internal × N_cells
      </p>

      <ComparisonTable
        headers={["Heat Source", "Formula", "Example (500 kVA, 192V bank)", "Notes"]}
        rows={[
          ["Battery charging heat", "V × I × (1−η)", "192V × 200A × 0.08 = 3,072 W", "η = 0.92 (92% charge efficiency)"],
          ["Battery discharge heat", "I² × R × N_cells", "200² × 0.001Ω × 288 = 11,520 W", "R per cell = 1mΩ typical VRLA 2V"],
          ["Charger/rectifier losses", "UPS total losses − inverter losses", "~5–8% of UPS rating", "From UPS efficiency curve"],
          ["Lighting", "Measured or designed", "300–500 W typical battery room", "LED, motion-controlled"],
          ["TOTAL HEAT LOAD", "Sum of above", "~15–20 kW for 500 kVA example", "Varies significantly by design"],
        ]}
      />

      <Callout type="important" title="Important — Worst Case Is Discharge, Not Charge">
        Heat load calculation ke liye worst case condition consider karo: full discharge at maximum
        current. Discharge pe internal resistance loss maximum hota hai aur yeh sab heat room
        mein jaati hai. Charge normal steady-state operation hai; discharge is the
        emergency — aur temperature spike tabhi hoti hai jab cooling most critical hoti hai.
      </Callout>

      {/* ─── 11.3 Cooling Load ──────────────────────────────────────── */}
      <h3 id="cooling-load-calc" style={S.h3}>11.3 — Battery Room Cooling Load</h3>

      <p style={S.p}>
        Battery room HVAC load = Battery heat + UPS partial losses (if UPS in same room) +
        Lighting + Envelope heat gain (solar, walls).
      </p>

      <p style={S.p}>
        <strong>Total cooling (kW) = Battery_heat + UPS_losses + Lighting + Envelope_gain</strong>
      </p>

      <ComparisonTable
        headers={["Component", "Value (500 kVA example)", "Notes"]}
        rows={[
          ["Battery self-heat (float)", "3.0–5.0 kW", "At steady float — lower than discharge"],
          ["Charger losses", "3.0–5.0 kW", "From UPS rectifier operating near battery room"],
          ["Lighting (LED)", "0.3–0.5 kW", "LED, occupancy sensor recommended"],
          ["Envelope gain (India summer)", "1.0–3.0 kW", "Depends on insulation, exterior wall exposure"],
          ["Safety margin (20%)", "1.5–3.0 kW", "Standard engineering safety factor"],
          ["TOTAL DESIGN LOAD", "8.8–16.5 kW", "Size HVAC accordingly"],
        ]}
      />

      <Callout type="best-practice" title="Best Practice — N+1 HVAC for Battery Room">
        Battery room HVAC hamesha N+1 redundant hona chahiye — ek unit fail hone pe second
        unit full load handle kare. Single HVAC failure + Indian summer = battery room at
        40–45°C = VRLA life cut in half within weeks. Battery room HVAC is a critical system,
        not a commodity.
      </Callout>

      {/* ─── 11.4 Floor Loading ─────────────────────────────────────── */}
      <h3 id="floor-loading-calc" style={S.h3}>11.4 — Floor Loading Calculation</h3>

      <p style={S.p}>
        <strong>Floor load (kN/m²) = (Total weight in kg × 9.81 ÷ 1000) ÷ Footprint (m²)</strong>
      </p>

      <ComparisonTable
        headers={["Building Floor Type", "Typical Capacity", "Battery Room Suitable?"]}
        rows={[
          ["Standard office floor", "250–300 kg/m²", "No — insufficient for VRLA banks"],
          ["Light industrial floor", "500–750 kg/m²", "Marginal — verify with structural engineer"],
          ["Heavy industrial / ground floor", "1000–2000+ kg/m²", "Yes — suitable for most battery rooms"],
          ["Dedicated concrete pad (ground)", "Design-specific, typically 2000+ kg/m²", "Yes — preferred for large banks"],
          ["Raised floor (data center)", "Usually 500–1000 kg/m²", "Verify — battery rooms typically NOT on raised floor"],
        ]}
      />

      <ComparisonTable
        headers={["Battery Bank", "Example Configuration", "Battery Weight", "Rack Weight", "Total Load", "Approx Floor Area", "Load per m²"]}
        rows={[
          ["100 kVA, 10 min", "1 string, 16×12V 100Ah, 1 rack", "16 × 33kg = 528 kg", "80 kg", "608 kg", "2.0 m²", "304 kg/m²"],
          ["500 kVA, 15 min", "3 strings, 96×2V 600Ah, 6 racks", "288 × 65kg = 18,720 kg", "6×120kg = 720 kg", "19,440 kg", "24 m²", "810 kg/m²"],
          ["1 MVA, 15 min", "3 strings, 96×2V 1200Ah, 6 racks", "288 × 110kg = 31,680 kg", "6×150kg = 900 kg", "32,580 kg", "36 m²", "905 kg/m²"],
        ]}
      />

      <Callout type="danger" title="Danger — Always Commission Structural Engineer">
        Floor loading calculation ONLY gives you the requirement. Actual floor capacity verification
        needs a licensed structural engineer who reviews the existing slab design. Never assume.
        Many Indian Data Center battery rooms are on upper floors of buildings not designed for
        this load — structural failure risk is real. Get written sign-off from structural engineer
        before proceeding.
      </Callout>

      {/* ─── 11.5 Battery Weight Calculation ─────────────────────────── */}
      <h3 id="weight-calc" style={S.h3}>11.5 — Battery Weight Calculation</h3>

      <p style={S.p}>
        <strong>Total weight = (Cell weight × Cells per string × Number of strings) + (Rack weight × Number of racks)</strong>
      </p>

      <ComparisonTable
        headers={["Battery Type", "Typical Weight per Unit", "Weight per kWh", "Example Bank (500 kVA, 15 min, 192V)"]}
        rows={[
          ["VRLA AGM 12V 100Ah", "28–35 kg", "~30 kg/kWh", "16 cells/string × 3 strings = 48 × 32kg avg = 1,536 kg"],
          ["VRLA AGM 2V 600Ah", "60–75 kg", "~28 kg/kWh", "96 cells/string × 3 strings = 288 × 67kg avg = 19,296 kg"],
          ["LFP 48V 100Ah rack module", "45–55 kg per module", "~10 kg/kWh", "~12 modules = 12 × 50kg = 600 kg (same energy)"],
          ["VLA 2V 1000Ah", "110–140 kg", "~30 kg/kWh", "288 × 125kg avg = 36,000 kg"],
        ]}
      />

      <p style={S.p}>
        LFP ke saath VRLA replace karna weight mein 3× reduction deta hai same energy ke liye —
        yeh upper floor installations mein floor loading concern significantly reduce karta hai.
        Many retrofit projects sirf weight reduction ke liye LFP choose karte hain.
      </p>

      {/* ─── 11.6 Room Sizing ────────────────────────────────────────── */}
      <h3 id="room-sizing-calc" style={S.h3}>11.6 — Room Sizing Calculation</h3>

      <p style={S.p}>
        <strong>Minimum room area = Battery footprint + Aisle space + Access space + Equipment space</strong>
      </p>

      <ComparisonTable
        headers={["Space Component", "Minimum Requirement", "Why Required"]}
        rows={[
          ["Rack/battery footprint", "Actual rack dimensions × quantity", "Physical space for batteries"],
          ["Front aisle width", "1000mm minimum, 1200mm recommended", "Maintenance access, cell replacement, trolley movement"],
          ["Rear clearance", "600mm minimum", "Cable access, rear connections"],
          ["Side clearance (walls)", "200mm minimum", "Thermal expansion clearance, ventilation circulation"],
          ["Electrical panel clearance", "1000mm working space in front", "IS/NEC requirement for electrical panels"],
          ["Emergency egress path", "Min 900mm clear path to exit", "Fire safety — always maintain clear egress"],
          ["HVAC equipment space", "Project-specific", "Indoor unit, drain, cable space"],
        ]}
      />

      <ComparisonTable
        headers={["UPS Size", "Runtime", "String Config", "Approx Battery Room Size"]}
        rows={[
          ["100 kVA", "10 min", "1 string, 16×12V", "15–20 m² (3m × 5m minimum)"],
          ["500 kVA", "15 min", "3 strings, 96×2V", "40–60 m² (6m × 8m minimum)"],
          ["1 MVA", "15 min", "3 strings, 96×2V 1200Ah", "60–90 m² (8m × 10m minimum)"],
          ["2 MVA, Tier IV (2N)", "15 min", "Two independent 3-string banks", "120–180 m² (two separate rooms)"],
        ]}
      />

      <Callout type="best-practice" title="Best Practice — Design for 1.5× Current Capacity">
        Battery room thoda bada banao — future expansion ke liye 50% extra space design mein
        include karo. Adding a fourth string to an existing battery room mein jab room full ho
        ya aisle blocked ho toh yeh impossible ya bahut expensive ho jaata hai. Upfront 50%
        extra space cost negligible hai vs future retrofit cost.
      </Callout>
    </>
  );
}
