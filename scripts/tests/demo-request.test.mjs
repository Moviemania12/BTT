// BTT Employee Manager demo request — unit checks (run: npm run test:demo).
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import {
  customerEmail,
  makeDemoCredentials,
  ownerEmail,
  validateDemoRequest,
} from "../../lib/demoRequest.ts";

const good = { name: "Ravi Kumar", company: "Acme Facility Services Pvt Ltd", email: "Ravi@Acme.in", mobile: "+91 98765 43210", employees: "26–100" };

test("demo request: valid data is accepted and cleaned", () => {
  const { data, errors } = validateDemoRequest(good);
  assert.deepEqual(errors, []);
  assert.equal(data.email, "ravi@acme.in");
});

test("demo request: invalid fields are reported", () => {
  const { errors } = validateDemoRequest({ name: "R", company: "", email: "x@", mobile: "12", employees: "lots" });
  assert.deepEqual(errors.sort(), ["company", "email", "employees", "mobile", "name"]);
});

test("temporary demo credentials: format and randomness", () => {
  const seen = new Set();
  for (let i = 0; i < 200; i++) {
    const c = makeDemoCredentials(good.company);
    assert.match(c.username, /^demo_acmefacility_\d{4}$/);
    assert.equal(c.temporaryPassword.length, 10);
    assert.match(c.temporaryPassword, /[a-z]/);
    assert.match(c.temporaryPassword, /[A-Z]/);
    assert.match(c.temporaryPassword, /[2-9]/);
    assert.doesNotMatch(c.temporaryPassword, /[01OlI]/);
    seen.add(c.temporaryPassword);
  }
  assert.ok(seen.size > 195);
  assert.match(makeDemoCredentials("!!!").username, /^demo_company_\d{4}$/);
});

test("emails: owner gets the enquiry + credentials, customer gets a login with no visible support address", () => {
  const { data } = validateDemoRequest(good);
  const c = makeDemoCredentials(data.company);
  const o = ownerEmail(data, c, "2026-09-27T10:00:00Z");
  assert.ok(o.text.includes(data.mobile) && o.text.includes(c.username) && o.text.includes(c.temporaryPassword));
  const m = customerEmail(data, c);
  assert.ok(m.text.includes(c.temporaryPassword));
  assert.doesNotMatch(m.text, /@behindthetech\.in/i);
});

test("no private Gmail address, mail secret, or behindthetech.in address anywhere in the site source", () => {
  const root = new URL("../../", import.meta.url).pathname;
  const offenders = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(tsx?|jsx?|mjs|css|md|json)$/.test(name)) {
        const t = readFileSync(p, "utf8");
        if (/@gmail\.com/i.test(t) || /re_[A-Za-z0-9]{20,}/.test(t) || /@behindthetech\.in/i.test(t)) offenders.push(p);
      }
    }
  };
  for (const d of ["app", "components", "lib", "public"]) {
    try { walk(join(root, d)); } catch { /* folder not present */ }
  }
  assert.deepEqual(offenders, []);
});
