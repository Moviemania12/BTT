// ═══════════════════════════════════════════════════════════════════════════
// lib/engineering/electrical/constants.ts
//
// Electrical-domain constants. Verifiable physical constants are clearly
// separated from design ASSUMPTIONS (which are explicitly flagged as such
// so any calculator using them must disclose "first-pass estimation").
// ═══════════════════════════════════════════════════════════════════════════

/** √3 — used throughout 3-phase electrical calculations (mathematical constant) */
export const SQRT_3 = Math.sqrt(3);

/** Standard 3-phase LT voltage in Indian Data Centers (V) — industry-standard convention */
export const STANDARD_LT_VOLTAGE_3PHASE = 415;

/** Standard single-phase voltage in India (V) */
export const STANDARD_VOLTAGE_1PHASE = 230;

/** Standard grid frequency in India (Hz) */
export const STANDARD_FREQUENCY_HZ = 50;

/** 1 Watt in BTU/hr — verifiable physical conversion constant */
export const WATTS_TO_BTU_PER_HOUR = 3.412142;

/** Conductor resistivity at typical operating temperature (Ω·mm²/m) — verifiable physical property */
export const CONDUCTOR_RESISTIVITY = {
  copper: 0.0175,
  aluminium: 0.0282,
} as const;

// ─── Design ASSUMPTIONS (not universal constants — explicitly flagged) ───────
// Any calculator using these must disclose them as first-pass estimation
// rules, never as code/standard values.

/** Battery room area per VRLA unit INCLUDING aisle/access space — industry rule of thumb */
export const BATTERY_ROOM_SQM_PER_UNIT_ASSUMPTION = 0.25;
export const BATTERY_ROOM_AISLE_FACTOR_ASSUMPTION = 1.3;

/** Typical cable current density for LT copper cable sizing — industry rule of thumb */
export const CABLE_CURRENT_DENSITY_ASSUMPTION = 4; // A/mm²
