"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";

// ─── Conversion tables (standard published factors) ───────────────────────
// Power: base = Watts
const POWER_UNITS = {
  W: { label: "Watts (W)", toBase: 1 },
  kW: { label: "Kilowatts (kW)", toBase: 1000 },
  HP: { label: "Horsepower (mechanical, HP)", toBase: 745.7 },
  "BTU/hr": { label: "BTU/hr", toBase: 0.29307107 },
  Ton: { label: "Ton of Refrigeration", toBase: 3516.85 },
} as const;

// Length: base = Meters
const LENGTH_UNITS = {
  mm: { label: "Millimeters (mm)", toBase: 0.001 },
  cm: { label: "Centimeters (cm)", toBase: 0.01 },
  m: { label: "Meters (m)", toBase: 1 },
  km: { label: "Kilometers (km)", toBase: 1000 },
  in: { label: "Inches (in)", toBase: 0.0254 },
  ft: { label: "Feet (ft)", toBase: 0.3048 },
  yd: { label: "Yards (yd)", toBase: 0.9144 },
} as const;

// Pressure: base = Pascals
const PRESSURE_UNITS = {
  Pa: { label: "Pascals (Pa)", toBase: 1 },
  kPa: { label: "Kilopascals (kPa)", toBase: 1000 },
  bar: { label: "Bar", toBase: 100000 },
  psi: { label: "PSI", toBase: 6894.757 },
  atm: { label: "Atmospheres (atm)", toBase: 101325 },
} as const;

// Temperature: not a simple multiply — needs dedicated formulas
const TEMPERATURE_UNITS = {
  C: { label: "Celsius (°C)" },
  F: { label: "Fahrenheit (°F)" },
  K: { label: "Kelvin (K)" },
} as const;

type PowerUnit = keyof typeof POWER_UNITS;
type LengthUnit = keyof typeof LENGTH_UNITS;
type PressureUnit = keyof typeof PRESSURE_UNITS;
type TemperatureUnit = keyof typeof TEMPERATURE_UNITS;

type Category = "Power" | "Temperature" | "Length" | "Pressure";

const CATEGORY_UNITS: Record<Category, Record<string, { label: string; toBase?: number }>> = {
  Power: POWER_UNITS,
  Temperature: TEMPERATURE_UNITS,
  Length: LENGTH_UNITS,
  Pressure: PRESSURE_UNITS,
};

// ─── Pure conversion functions ─────────────────────────────────────────────

function convertBaseUnit(
  value: number,
  fromUnit: string,
  toUnit: string,
  table: Record<string, { toBase: number }>
): number {
  const baseValue = value * table[fromUnit].toBase;
  return baseValue / table[toUnit].toBase;
}

function celsiusToFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}
function fahrenheitToCelsius(f: number): number {
  return ((f - 32) * 5) / 9;
}
function celsiusToKelvin(c: number): number {
  return c + 273.15;
}
function kelvinToCelsius(k: number): number {
  return k - 273.15;
}

function convertTemperature(value: number, fromUnit: TemperatureUnit, toUnit: TemperatureUnit): number {
  if (fromUnit === toUnit) return value;

  // Normalize to Celsius first, then to the target unit.
  let celsius: number;
  if (fromUnit === "C") celsius = value;
  else if (fromUnit === "F") celsius = fahrenheitToCelsius(value);
  else celsius = kelvinToCelsius(value); // K -> C

  if (toUnit === "C") return celsius;
  if (toUnit === "F") return celsiusToFahrenheit(celsius);
  return celsiusToKelvin(celsius); // -> K
}

// Formats a number to a readable precision: small/large numbers get
// significant-digit formatting, mid-range numbers get fixed decimals
// with trailing zeros stripped.
function formatSmart(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "0";

  const abs = Math.abs(n);
  if (abs >= 1000 || abs < 0.01) {
    return parseFloat(n.toPrecision(6)).toString();
  }
  return parseFloat(n.toFixed(4)).toString();
}

// ─── Shared style tokens (design system) ───────────────────────────────────

const cardStyle: CSSProperties = {
  border: "1px solid #E5E7EB",
  borderRadius: "16px",
  boxShadow: "0 8px 30px rgba(15,23,42,.06)",
  background: "#ffffff",
  padding: "1.75rem",
};

const inputStyle: CSSProperties = {
  border: "1px solid #D1D5DB",
  borderRadius: "8px",
  padding: "0.6rem 0.8rem",
  fontSize: "1rem",
  width: "100%",
  color: "#111827",
  background: "#ffffff",
};

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: "0.9rem",
  fontWeight: 600,
  color: "#111827",
  marginBottom: "0.4rem",
};

export default function UnitConverterClient() {
  const [category, setCategory] = useState<Category>("Power");
  const [fromUnit, setFromUnit] = useState<string>("kW");
  const [toUnit, setToUnit] = useState<string>("Ton");
  const [inputValue, setInputValue] = useState<string>("100");

  const unitsForCategory = CATEGORY_UNITS[category];
  const unitKeys = Object.keys(unitsForCategory);

  function handleCategoryChange(next: Category) {
    setCategory(next);
    const keys = Object.keys(CATEGORY_UNITS[next]);
    setFromUnit(keys[0]);
    setToUnit(keys[1] ?? keys[0]);
  }

  const numericInput = parseFloat(inputValue);
  const hasValidInput = inputValue.trim() !== "" && Number.isFinite(numericInput);

  const result = useMemo(() => {
    if (!hasValidInput) return null;

    if (category === "Temperature") {
      return convertTemperature(numericInput, fromUnit as TemperatureUnit, toUnit as TemperatureUnit);
    }
    if (category === "Power") {
      return convertBaseUnit(numericInput, fromUnit, toUnit, POWER_UNITS);
    }
    if (category === "Length") {
      return convertBaseUnit(numericInput, fromUnit, toUnit, LENGTH_UNITS);
    }
    return convertBaseUnit(numericInput, fromUnit, toUnit, PRESSURE_UNITS);
  }, [category, fromUnit, toUnit, numericInput, hasValidInput]);

  return (
    <main data-homepage-theme="light" style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "2.5rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.5rem" }}>
          <Link href="/tools" style={{ color: "#2563EB", textDecoration: "none" }}>
            Tools
          </Link>{" "}
          / Unit Converter
        </p>

        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
          Unit Converter
        </h1>
        <p style={{ fontSize: "1.05rem", color: "#374151", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "680px" }}>
          Convert Power, Temperature, Length, and Pressure units commonly used in Data Center engineering work.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {/* Controls */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>
              Convert
            </h2>

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={labelStyle} htmlFor="category">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value as Category)}
                style={inputStyle}
              >
                <option value="Power">Power</option>
                <option value="Temperature">Temperature</option>
                <option value="Length">Length</option>
                <option value="Pressure">Pressure</option>
              </select>
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={labelStyle} htmlFor="inputValue">
                Value
              </label>
              <input
                id="inputValue"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={inputStyle}
                step="any"
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle} htmlFor="fromUnit">
                  From
                </label>
                <select id="fromUnit" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} style={inputStyle}>
                  {unitKeys.map((key) => (
                    <option key={key} value={key}>
                      {unitsForCategory[key].label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle} htmlFor="toUnit">
                  To
                </label>
                <select id="toUnit" value={toUnit} onChange={(e) => setToUnit(e.target.value)} style={inputStyle}>
                  {unitKeys.map((key) => (
                    <option key={key} value={key}>
                      {unitsForCategory[key].label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {category === "Power" && (
              <p style={{ fontSize: "0.8rem", color: "#6B7280", marginTop: "1rem" }}>
                kVA requires a power factor — see the UPS Load Calculator.
              </p>
            )}
          </div>

          {/* Result */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>
              Result
            </h2>

            <div style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.25rem" }}>
              {unitsForCategory[fromUnit]?.label} → {unitsForCategory[toUnit]?.label}
            </div>
            <div style={{ fontSize: "2.25rem", fontWeight: 800, color: "#2563EB", lineHeight: 1.15 }}>
              {result === null ? "—" : formatSmart(result)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
