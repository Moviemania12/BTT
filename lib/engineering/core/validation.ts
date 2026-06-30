// ═══════════════════════════════════════════════════════════════════════════
// lib/engineering/core/validation.ts
//
// Domain-agnostic input validation helpers. Used by every calculator across
// every domain. Contains no formulas, no domain assumptions.
// ═══════════════════════════════════════════════════════════════════════════

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

/** True if a number is finite and not NaN — the baseline safety check. */
export function isValidNumber(n: number): boolean {
  return typeof n === "number" && isFinite(n) && !isNaN(n);
}

/** Validates a value is a finite positive number (> 0). */
export function isPositive(n: number): boolean {
  return isValidNumber(n) && n > 0;
}

/** Validates a value is finite and non-negative (>= 0). */
export function isNonNegative(n: number): boolean {
  return isValidNumber(n) && n >= 0;
}

/** Validates a ratio/fraction is within (0, 1] — e.g. power factor, DoD, efficiency. */
export function isValidFraction(n: number): boolean {
  return isValidNumber(n) && n > 0 && n <= 1;
}

/** Validates a percentage is within [0, 100]. */
export function isValidPercent(n: number): boolean {
  return isValidNumber(n) && n >= 0 && n <= 100;
}

/**
 * Runs a set of named checks and returns the first failure as a
 * ValidationResult, or {valid: true} if all pass.
 */
export function validateFields(
  checks: Array<{ check: boolean; message: string }>
): ValidationResult {
  for (const { check, message } of checks) {
    if (!check) return { valid: false, message };
  }
  return { valid: true };
}

/** Common reusable error message builders, kept consistent across all calculators in all domains. */
export const VALIDATION_MESSAGES = {
  mustBePositive: (field: string) => `${field} must be greater than 0.`,
  mustBeFraction: (field: string) => `${field} must be between 0 and 1.`,
  mustBePercent: (field: string) => `${field} must be between 0 and 100.`,
  mustBeNonNegative: (field: string) => `${field} cannot be negative.`,
  generic: "Please check your inputs — one or more values are invalid.",
} as const;
