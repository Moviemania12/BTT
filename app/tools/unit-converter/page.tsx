import type { Metadata } from "next";
import { buildSocialMeta } from "@/lib/schemas";
import UnitConverterClient from "./UnitConverterClient";
import CalculatorGuide from "@/components/calculators/CalculatorGuide";

// ═══════════════════════════════════════════════════════════════════════════
// app/tools/unit-converter/page.tsx
//
// Server component — exports metadata and renders the client calculator.
// `metadata` cannot live in a client component (needs useState), so the
// interactive UI lives in the sibling UnitConverterClient.tsx.
// ═══════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "Unit Converter — Power, Temperature, Length, Pressure | Behind The Tech",
  description:
    "Free engineering unit converter for Data Center work — convert Power (kW, HP, BTU/hr, Tons), Temperature (°C, °F, K), Length (mm to feet), and Pressure (Pa, bar, PSI, atm) instantly.",
  alternates: { canonical: "https://behindthetech.in/tools/unit-converter" },
  keywords: [
    "unit converter",
    "kW to BTU/hr converter",
    "kW to HP converter",
    "celsius to fahrenheit converter",
    "PSI to bar converter",
    "engineering unit converter",
    "data center unit conversion",
  ],
  ...buildSocialMeta({
    title: "Unit Converter — Power, Temperature, Length, Pressure | Behind The Tech",
    description:
      "Free engineering unit converter for Data Center work — convert Power (kW, HP, BTU/hr, Tons), Temperature (°C, °F, K), Length (mm to feet), and Pressure (Pa, bar, PSI, atm) instantly.",
    url: "https://behindthetech.in/tools/unit-converter",
  }),
};

export default function UnitConverterPage() {
  return (
    <>
      <UnitConverterClient />
      <div style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
          <CalculatorGuide slug="unit-converter" />
        </div>
      </div>
    </>
  );
}
