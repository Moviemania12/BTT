import { randomInt } from "node:crypto";

// ═══════════════════════════════════════════════════════════════════════════
// lib/demoRequest.ts — BTT Employee Manager demo request: validation,
// temporary demo credentials and the two emails. Server-side only.
//
// The temporary username + password are shown to the customer right away.
// They start working when the owner issues the 3-day licence key for them in
// the Windows app (License & Customer Mgmt → customer login = these values);
// licence keys are signed with the owner's private key, which never leaves the
// owner PC and is never on this website.
//
// No addresses or secrets live here: the owner's inbox comes from the
// DEMO_NOTIFY_TO environment variable and is never sent to the browser.
// ═══════════════════════════════════════════════════════════════════════════

export const EMPLOYEE_RANGES = ["", "1–25", "26–100", "101–300", "301–1000", "1000+"];

export type DemoData = { name: string; company: string; email: string; mobile: string; employees: string };
export type DemoCredentials = { username: string; temporaryPassword: string };

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** Returns the cleaned data and the list of invalid fields. */
export function validateDemoRequest(body: Record<string, unknown>): { data: DemoData; errors: string[] } {
  const data: DemoData = {
    name: str(body.name, 100),
    company: str(body.company, 150),
    email: str(body.email, 200).toLowerCase(),
    mobile: str(body.mobile, 20),
    employees: str(body.employees, 20),
  };
  const errors: string[] = [];
  if (data.name.length < 2) errors.push("name");
  if (data.company.length < 2) errors.push("company");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.push("email");
  if (!/^\+?[0-9][0-9\s-]{8,15}$/.test(data.mobile)) errors.push("mobile");
  if (!EMPLOYEE_RANGES.includes(data.employees)) errors.push("employees");
  return { data, errors };
}

// No look-alike characters (0/O, 1/l/I) so the password can be typed from a phone screen.
const LOWER = "abcdefghijkmnpqrstuvwxyz";
const UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const DIGIT = "23456789";

function pick(chars: string): string {
  return chars[randomInt(chars.length)];
}

/** Temporary demo login. Username: demo_<company>_<4 digits>; password: 10 characters with
 *  upper, lower and digits (the Windows app needs at least 8 and forces a change on first sign-in). */
export function makeDemoCredentials(company: string): DemoCredentials {
  const slug = company.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "").slice(0, 12) || "company";
  const username = `demo_${slug}_${1000 + randomInt(9000)}`;
  const all = LOWER + UPPER + DIGIT;
  const chars = [pick(LOWER), pick(UPPER), pick(DIGIT), ...Array.from({ length: 7 }, () => pick(all))];
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return { username, temporaryPassword: chars.join("") };
}

export function ownerEmail(d: DemoData, c: DemoCredentials, requestedAt: string) {
  const subject = `Demo request: ${d.company} — BTT Employee Manager (3 days)`;
  const text = [
    "New 3-day demo request (unlimited employees)",
    "",
    `Name:       ${d.name}`,
    `Company:    ${d.company}`,
    `Email:      ${d.email}`,
    `Mobile:     ${d.mobile}`,
    `Employees:  ${d.employees || "-"}`,
    `Requested:  ${requestedAt}`,
    "",
    "Temporary login shown to the customer:",
    `  Username:           ${c.username}`,
    `  Temporary password: ${c.temporaryPassword}`,
    "",
    "Next step: Windows app → License & Customer Mgmt → add the customer, enter this username",
    "and temporary password, issue a 3-day licence and send the licence key to the customer.",
  ].join("\n");
  return { subject, text };
}

export function customerEmail(d: DemoData, c: DemoCredentials) {
  const subject = "Your BTT Employee Manager 3-day demo";
  const text = [
    `Hello ${d.name},`,
    "",
    "Thank you for requesting the BTT Employee Manager demo (3 days, unlimited employees).",
    "",
    "Your temporary login:",
    `  Username:           ${c.username}`,
    `  Temporary password: ${c.temporaryPassword}`,
    "",
    "We will verify your request and email your 3-day licence key. Then:",
    "  1. Download the Windows application from https://behindthetech.in/products/btt-employee-manager/download",
    "  2. Open it and enter the username, temporary password and licence key.",
    "  3. Set your own password.",
    "",
    "Questions? Just reply to this email.",
    "",
    "Behind The Tech",
  ].join("\n");
  return { subject, text };
}
