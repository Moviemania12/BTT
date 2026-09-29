// ═══════════════════════════════════════════════════════════════════════════
// components/calculators/calculatorGuides.ts
//
// Plain-English explanatory text shown under each calculator (see
// CalculatorGuide.tsx): purpose, inputs, formula, a worked example and
// related reading. Text only — it does not touch calculator logic or UI.
// Every formula and example number below was checked against the code in
// lib/engineering/electrical/formulas.ts and the calculator components.
// ═══════════════════════════════════════════════════════════════════════════

export interface CalculatorGuideData {
  /** What the calculator does and when to use it. */
  purpose: string;
  /** Each input the calculator asks for, and what it means. */
  inputs: { name: string; meaning: string }[];
  /** Formula lines, exactly as the calculator applies them. */
  formula: string[];
  /** A short practical example with real numbers. */
  example: string;
  /** How to read / use the result, and its limits. */
  note: string;
  /** Topic slugs from lib/topics.ts to link as further reading. */
  topics: string[];
  /** Other tools worth opening next. */
  alsoTry: { href: string; label: string }[];
}

export const CALCULATOR_GUIDES: Record<string, CalculatorGuideData> = {
  "battery-ah-calculator": {
    purpose:
      "Works out how many amp-hours (Ah) a UPS battery bank must hold to carry a given load for a required backup time. Use it when you are sizing a new battery bank or checking whether an existing one is big enough.",
    inputs: [
      { name: "Load (W)", meaning: "The power the UPS must supply from batteries, in watts." },
      { name: "Runtime (minutes)", meaning: "How long the batteries must carry that load before the generator or mains takes over." },
      { name: "DC Bus Voltage (V)", meaning: "The nominal DC voltage of the battery string feeding the UPS." },
      { name: "Depth of Discharge", meaning: "The fraction of the battery capacity you allow to be used (0.8 means 80%)." },
      { name: "System Efficiency", meaning: "Combined efficiency of the UPS and battery path (0.9 means 90%)." },
    ],
    formula: ["Ah = (Load × Runtime in hours) ÷ (DC Bus Voltage × Depth of Discharge × Efficiency)"],
    example:
      "A 50,000 W load that must run for 15 minutes on a 192 V bus, with 80% depth of discharge and 90% efficiency, needs (50,000 × 0.25) ÷ (192 × 0.8 × 0.9) ≈ 90.4 Ah.",
    note:
      "This is a straight energy calculation. Real battery sizing also depends on the manufacturer's discharge tables, temperature, ageing margin and the end-of-life voltage — confirm the final selection against the battery datasheet.",
    topics: ["battery-bank", "ups"],
    alsoTry: [
      { href: "/tools/ups-runtime-calculator", label: "UPS Runtime Calculator" },
      { href: "/tools/battery-string-calculator", label: "Battery String Calculator" },
      { href: "/tools/battery-quantity-calculator", label: "Battery Quantity Calculator" },
    ],
  },
  "ups-runtime-calculator": {
    purpose:
      "Estimates how long a battery bank can keep a load running once mains power is lost. It is the reverse of the battery Ah calculation: you know the battery, and you want the backup time.",
    inputs: [
      { name: "Battery Capacity (Ah)", meaning: "Total amp-hour rating of the battery string." },
      { name: "DC Bus Voltage (V)", meaning: "Nominal DC voltage of the battery string." },
      { name: "Depth of Discharge", meaning: "The fraction of capacity you are willing to use (0.8 means 80%)." },
      { name: "System Efficiency", meaning: "Combined UPS and battery efficiency (0.9 means 90%)." },
      { name: "Load (W)", meaning: "The power drawn from the batteries, in watts." },
    ],
    formula: ["Runtime (hours) = (Ah × DC Bus Voltage × Depth of Discharge × Efficiency) ÷ Load in watts", "Runtime (minutes) = Runtime (hours) × 60"],
    example:
      "A 100 Ah string on a 192 V bus, at 80% depth of discharge and 90% efficiency, feeding a 50,000 W load runs for (100 × 192 × 0.8 × 0.9) ÷ 50,000 ≈ 0.28 hours, or about 16.6 minutes.",
    note:
      "Battery capacity is not constant: a fast discharge delivers fewer usable amp-hours than a slow one, and cold or aged batteries deliver less again. Treat the result as an estimate and compare it with the manufacturer's runtime tables.",
    topics: ["ups", "battery-bank"],
    alsoTry: [
      { href: "/tools/battery-ah-calculator", label: "Battery Ah Calculator" },
      { href: "/tools/ups-load-calculator", label: "UPS Load Calculator" },
    ],
  },
  "battery-quantity-calculator": {
    purpose:
      "Counts how many batteries are needed to reach a target bank capacity, and how many you need in total when the bank is built from more than one string for redundancy.",
    inputs: [
      { name: "Required Bank Capacity (Ah)", meaning: "The amp-hour capacity the bank must provide (for example from the Battery Ah Calculator)." },
      { name: "Per-Battery Rating (Ah)", meaning: "The amp-hour rating of one battery or block." },
      { name: "Number of Strings", meaning: "How many identical strings you plan to build (more than one gives redundancy)." },
    ],
    formula: ["Parallel batteries per string = Required Ah ÷ Per-Battery Ah (rounded up)", "Total batteries = Parallel batteries per string × Number of strings"],
    example:
      "A 400 Ah requirement built from 100 Ah batteries needs 4 in parallel per string. With 2 strings the bank has 8 batteries in this calculation.",
    note:
      "The number of batteries in series is decided separately by the DC bus voltage — use the Battery String Calculator for that. Paralleling many strings also needs correct cabling and protection, so follow the UPS manufacturer's limits on the number of strings.",
    topics: ["battery-bank", "ups"],
    alsoTry: [
      { href: "/tools/battery-string-calculator", label: "Battery String Calculator" },
      { href: "/tools/battery-ah-calculator", label: "Battery Ah Calculator" },
    ],
  },
  "battery-string-calculator": {
    purpose:
      "Finds how many batteries must be connected in series to reach the DC bus voltage a UPS expects. Every string in the bank uses this same series count.",
    inputs: [
      { name: "Required DC Bus Voltage (V)", meaning: "The DC voltage the UPS needs from the battery string." },
      { name: "Per-Battery Voltage", meaning: "The nominal voltage of one battery block: 2 V, 6 V or 12 V." },
    ],
    formula: ["Batteries per string = DC Bus Voltage ÷ Per-Battery Voltage (rounded up)"],
    example:
      "A 192 V bus built from 12 V batteries needs 192 ÷ 12 = 16 batteries in series. A 480 V bus built from the same batteries needs 40.",
    note:
      "If the division is not a whole number the result is rounded up and the actual string voltage will be slightly higher than requested; the calculator shows the resulting voltage. Always match the string voltage window to the UPS specification.",
    topics: ["battery-bank", "ups"],
    alsoTry: [
      { href: "/tools/battery-quantity-calculator", label: "Battery Quantity Calculator" },
      { href: "/tools/battery-ah-calculator", label: "Battery Ah Calculator" },
    ],
  },
  "ups-load-calculator": {
    purpose:
      "Turns your total connected load into a recommended UPS rating in kVA, allowing for how much of the load runs at the same time, the power factor, and room to grow.",
    inputs: [
      { name: "Total Connected Load (kW)", meaning: "The sum of the nameplate load of everything the UPS will feed." },
      { name: "Demand Factor", meaning: "The share of the connected load expected to run at once (0.7 means 70%)." },
      { name: "Power Factor", meaning: "The ratio of real power (kW) to apparent power (kVA) of the load." },
      { name: "Future Growth (%)", meaning: "Extra capacity you want to keep in reserve for future load." },
    ],
    formula: ["Applied load (kW) = Connected load × Demand factor", "Base kVA = Applied load ÷ Power factor", "Recommended kVA = Base kVA × (1 + Growth ÷ 100)"],
    example:
      "100 kW connected load with a demand factor of 0.7, a power factor of 0.9 and 20% growth: 100 × 0.7 = 70 kW applied, 70 ÷ 0.9 ≈ 77.8 kVA, and 77.8 × 1.2 ≈ 93.3 kVA recommended.",
    note:
      "The result is the size the load needs, not a product selection. The final UPS rating still has to allow for the redundancy design (see the UPS Redundancy Calculator) and be matched to the ratings the manufacturer actually offers.",
    topics: ["ups", "pdu"],
    alsoTry: [
      { href: "/tools/ups-redundancy-calculator", label: "UPS Redundancy Calculator" },
      { href: "/tools/data-center-ups-designer", label: "Data Center UPS Designer" },
    ],
  },
  "ups-redundancy-calculator": {
    purpose:
      "Shows how many UPS modules a given IT load needs under N, N+1, N+2 or 2N redundancy, how many of them are spares, and how much of the installed capacity the load actually uses.",
    inputs: [
      { name: "IT Load (kVA)", meaning: "The load the UPS system must support." },
      { name: "UPS Module Size (kVA)", meaning: "The rating of one UPS module." },
      { name: "Redundancy Architecture", meaning: "N (no spare), N+1 (one spare module), N+2 (two spares) or 2N (a fully duplicated system)." },
    ],
    formula: ["N = IT load ÷ Module size (rounded up)", "N+1 = N + 1, N+2 = N + 2, 2N = N × 2", "Utilisation = IT load ÷ (Total modules × Module size)"],
    example:
      "A 400 kVA load on 100 kVA modules needs N = 4 modules. N+1 installs 5 modules (500 kVA, 80% utilised); 2N installs 8 modules (800 kVA, 50% utilised).",
    note:
      "This counts modules only. Real redundancy also depends on the distribution paths, static bypass, batteries and maintenance design, and tier certification looks at the whole system, not just the module count.",
    topics: ["ups", "sts", "data-center-types"],
    alsoTry: [
      { href: "/tools/ups-load-calculator", label: "UPS Load Calculator" },
      { href: "/tools/data-center-ups-designer", label: "Data Center UPS Designer" },
    ],
  },
  "data-center-ups-designer": {
    purpose:
      "Chains the main UPS sizing steps together from a single IT load: kW to kVA, module count for your chosen redundancy, battery string size, the amp-hours the battery bank must hold, and the heat the UPS itself adds to the room.",
    inputs: [
      { name: "IT Load (kW) and Power Factor", meaning: "The real IT load and its power factor, used to get the load in kVA." },
      { name: "UPS Module Size (kVA) and Redundancy", meaning: "The rating of one module and the architecture: N, N+1, N+2 or 2N." },
      { name: "Required Backup Runtime (minutes)", meaning: "How long the batteries must carry the full IT load." },
      { name: "DC Bus Voltage and Per-Battery Voltage", meaning: "Used to find how many batteries sit in one series string." },
      { name: "Depth of Discharge and Battery / UPS Efficiency", meaning: "Battery usage limit and combined efficiency, both as fractions between 0 and 1." },
      { name: "UPS Module Efficiency (%)", meaning: "Used to estimate the losses the UPS dissipates as heat." },
    ],
    formula: [
      "kVA = kW ÷ Power factor",
      "Modules = (kVA ÷ Module size, rounded up) plus spares for the chosen redundancy",
      "Batteries per string = DC bus voltage ÷ Battery voltage; Required Ah as in the Battery Ah Calculator",
      "UPS heat loss (kW) = Installed capacity (kVA) × (1 − Module efficiency)",
    ],
    example:
      "With the default inputs — 400 kW at 0.9 power factor on 250 kVA modules in N+1 — the load is about 444 kVA, so 2 modules are needed and 3 are installed (750 kVA). A 15-minute runtime on a 480 V bus of 12 V batteries gives 40 batteries per string and about 283 Ah, and 96% module efficiency means roughly 30 kW of heat from the UPS.",
    note:
      "This is a first-pass design aid. It does not size generators, transformers, PDUs or cabling. Final design must be confirmed against OEM datasheets, the site survey and a qualified electrical design review.",
    topics: ["ups", "battery-bank", "sts"],
    alsoTry: [
      { href: "/tools/ups-redundancy-calculator", label: "UPS Redundancy Calculator" },
      { href: "/tools/battery-ah-calculator", label: "Battery Ah Calculator" },
      { href: "/tools/cooling-calculator", label: "Cooling Calculator" },
    ],
  },
  "cooling-calculator": {
    purpose:
      "Converts an IT heat load into the cooling numbers used when sizing air conditioning: tons of refrigeration, BTU per hour, and the supply airflow (CFM) needed to carry that heat away.",
    inputs: [
      { name: "IT / Heat Load (kW)", meaning: "The heat to be removed. Nearly all the electrical power an IT load draws ends up as heat." },
      { name: "Return-to-Supply Air Temperature Differential (°C)", meaning: "The difference between the hot return air and the cold supply air; typical data center values are 8–12 °C." },
    ],
    formula: [
      "Tons of refrigeration = kW ÷ 3.517",
      "BTU/hr = kW × 3,412.14",
      "CFM = BTU/hr ÷ (1.08 × ΔT in °F), where ΔT in °F = ΔT in °C × 1.8",
    ],
    example:
      "A 100 kW load with a 10 °C differential is about 28.4 tons, 341,214 BTU/hr and roughly 17,550 CFM of supply air.",
    note:
      "These are sensible-heat figures at standard air conditions. Real cooling design also accounts for humidity, altitude, fan and pump heat, redundancy and airflow management, so treat the result as a starting point.",
    topics: ["chiller", "crac", "containment"],
    alsoTry: [
      { href: "/tools/rci-calculator", label: "RCI Calculator" },
      { href: "/tools/pue-calculator", label: "PUE Calculator" },
      { href: "/tools/unit-converter", label: "Unit Converter" },
    ],
  },
  "rci-calculator": {
    purpose:
      "Scores how well rack inlet temperatures stay inside the recommended and allowable ranges. RCI_HI shows the risk of over-temperature (hot spots) and RCI_LO shows over-cooling. 100% means every reading is inside the recommended range.",
    inputs: [
      { name: "Rack Inlet Temperatures (°C)", meaning: "Comma-separated inlet readings measured at the racks." },
      { name: "Min / Max Recommended (°C)", meaning: "The recommended inlet temperature range. The defaults, 18–27 °C, are the ASHRAE recommended range." },
      { name: "Min / Max Allowable (°C)", meaning: "The allowable inlet range. The defaults, 15–32 °C, are the ASHRAE Class A1 allowable range." },
    ],
    formula: [
      "RCI_HI = [1 − (Σ readings above Max recommended) ÷ ((Max allowable − Max recommended) × n)] × 100",
      "RCI_LO = [1 − (Σ readings below Min recommended) ÷ ((Min recommended − Min allowable) × n)] × 100",
    ],
    example:
      "Four inlet readings of 24, 26, 28 and 29 °C with the default ranges: the readings exceed the 27 °C limit by 1 °C and 2 °C, a total of 3. RCI_HI = [1 − 3 ÷ ((32 − 27) × 4)] × 100 = 85%, and RCI_LO = 100%.",
    note:
      "The calculator rates 100% as ideal, 96% or above as good, 91% or above as acceptable, and anything lower as poor, with hot or cold spots likely. RCI depends on where and how many readings you take, so measure consistently across the room.",
    topics: ["rci", "containment", "airflow-management"],
    alsoTry: [
      { href: "/tools/cooling-calculator", label: "Cooling Calculator" },
      { href: "/tools/pue-calculator", label: "PUE Calculator" },
    ],
  },
  "pue-calculator": {
    purpose:
      "Calculates Power Usage Effectiveness (PUE), the standard measure of how much of a data center's total power reaches the IT equipment, and its inverse, DCiE. A lower PUE means less power lost to cooling, power conversion and other overhead.",
    inputs: [
      { name: "Total Facility Power (kW)", meaning: "Everything the site draws: IT, cooling, UPS losses, lighting and other overhead." },
      { name: "IT Equipment Power (kW)", meaning: "The power that reaches servers, storage and network equipment." },
    ],
    formula: ["PUE = Total facility power ÷ IT equipment power", "DCiE = (1 ÷ PUE) × 100%", "Overhead (kW) = Total facility power − IT equipment power"],
    example:
      "A site drawing 1,600 kW in total with 1,000 kW of IT load has a PUE of 1.60 and a DCiE of 62.5%. The other 600 kW (37.5% of the total) is overhead.",
    note:
      "The calculator labels a PUE of 1.2 or lower as excellent, up to 1.5 as good, up to 1.8 as average and anything higher as needing improvement. Compare like with like: PUE should be measured over a consistent period, at the same metering points.",
    topics: ["chiller", "airflow-management", "ups"],
    alsoTry: [
      { href: "/tools/cooling-calculator", label: "Cooling Calculator" },
      { href: "/tools/rci-calculator", label: "RCI Calculator" },
    ],
  },
  "unit-converter": {
    purpose:
      "Converts the units that come up daily in data center work — power (W, kW, HP, BTU/hr, tons of refrigeration), temperature, length and pressure — so you can move between electrical, mechanical and imperial values without a lookup table.",
    inputs: [
      { name: "Category", meaning: "Power, temperature, length or pressure." },
      { name: "Value", meaning: "The number you want to convert." },
      { name: "From / To unit", meaning: "The unit you have and the unit you want." },
    ],
    formula: [
      "Power, length and pressure: value × (From unit ÷ To unit), each expressed in a base unit (W, m or Pa)",
      "Temperature: °F = °C × 9 ÷ 5 + 32, and K = °C + 273.15",
    ],
    example:
      "100 kW is about 28.43 tons of refrigeration (100,000 W ÷ 3,516.85 W per ton). 100 °C is 212 °F.",
    note:
      "Conversion factors are the standard published values. Where a unit has more than one definition (such as horsepower), the converter uses mechanical horsepower.",
    topics: ["chiller", "ups"],
    alsoTry: [
      { href: "/tools/cooling-calculator", label: "Cooling Calculator" },
      { href: "/tools/ups-load-calculator", label: "UPS Load Calculator" },
    ],
  },
};
