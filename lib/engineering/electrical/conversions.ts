// ═══════════════════════════════════════════════════════════════════════════
// lib/engineering/electrical/conversions.ts
//
// Electrical-domain unit conversions. Pure functions, no React, no UI.
// Used by UPS, Battery Bank, Transformer, DG Set, PDU, STS, RMU, HT Yard.
// ═══════════════════════════════════════════════════════════════════════════

export const wattsToKw = (w: number): number => w / 1000;
export const kwToWatts = (kw: number): number => kw * 1000;
export const kwToMw = (kw: number): number => kw / 1000;
export const mwToKw = (mw: number): number => mw * 1000;

export const whToKwh = (wh: number): number => wh / 1000;
export const kwhToWh = (kwh: number): number => kwh * 1000;

/** 1 Watt = 3.412142 BTU/hr — verifiable physical constant */
export const wattsToBtuPerHour = (w: number): number => w * 3.412142;
export const btuPerHourToWatts = (btu: number): number => btu / 3.412142;

export const voltsToKilovolts = (v: number): number => v / 1000;
export const kilovoltsToVolts = (kv: number): number => kv * 1000;

export const minutesToHours = (min: number): number => min / 60;
export const hoursToMinutes = (hr: number): number => hr * 60;

export const sqmToSqft = (sqm: number): number => sqm * 10.7639;
export const sqftToSqm = (sqft: number): number => sqft / 10.7639;
