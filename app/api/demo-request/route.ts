import { NextResponse } from "next/server";
import {
  customerEmail,
  makeDemoCredentials,
  ownerEmail,
  validateDemoRequest,
  type DemoCredentials,
  type DemoData,
} from "@/lib/demoRequest";

// ═══════════════════════════════════════════════════════════════════════════
// app/api/demo-request/route.ts — BTT Employee Manager 3-day demo request.
//
// 1. Validates the request (name, company, email, mobile, optional employee count).
// 2. Creates a temporary demo username + password and returns them to the page.
// 3. Sends the enquiry to the owner's inbox and a confirmation to the customer.
//
// It does NOT create a licence: demo licences are Ed25519-signed with the owner's
// private key, which lives only on the owner's PC (Windows app → License &
// Customer Mgmt) and must never be on a web server. The owner issues the 3-day key
// for these credentials and emails it.
//
// Configuration (environment variables only — nothing secret or visible in the code):
//   RESEND_API_KEY   email API key (https://resend.com)
//   DEMO_NOTIFY_TO   owner inbox that receives the enquiry (never shown on the site or in the form)
//   MAIL_FROM        optional; a "Name <address>" sender on a domain verified in Resend, once one
//                    is set up. Until then this defaults to Resend's own verified sandbox sender
//                    (onboarding@resend.dev), which needs no domain verification at all.
//   DEMO_REQUEST_WEBHOOK_URL / DEMO_REQUEST_WEBHOOK_SECRET  (optional, alternative channel)
// With no channel configured the endpoint answers 503 and shows no credentials:
// it never pretends a request was received. No email address is ever sent to the browser.
// ═══════════════════════════════════════════════════════════════════════════

export const runtime = "nodejs";

// Very small in-memory rate limit (per server instance) — a first line of
// defence against form spam.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

async function sendEmail(to: string, subject: string, text: string, replyTo?: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || "BTT Employee Manager <onboarding@resend.dev>",
      to: [to],
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    // eslint-disable-next-line no-console -- diagnostic only: surfaces Resend's real error in the server log
    console.error(`[demo-request] Resend send to ${to} failed: HTTP ${res.status} — ${body}`);
    throw new Error(`email ${res.status}: ${body}`);
  }
}

async function notifyOwner(data: DemoData, creds: DemoCredentials, requestedAt: string): Promise<boolean> {
  let delivered = false;
  if (process.env.RESEND_API_KEY && process.env.DEMO_NOTIFY_TO) {
    const m = ownerEmail(data, creds, requestedAt);
    await sendEmail(process.env.DEMO_NOTIFY_TO, m.subject, m.text, data.email);
    delivered = true;
  }
  const webhook = process.env.DEMO_REQUEST_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.DEMO_REQUEST_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.DEMO_REQUEST_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({
        type: "btt-employee-manager-demo",
        demo_days: 3,
        employee_limit: "unlimited",
        requested_at: requestedAt,
        ...data,
        demo_username: creds.username,
        demo_temporary_password: creds.temporaryPassword,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    delivered = true;
  }
  return delivered;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled → pretend nothing (do not help bots tune themselves).
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ message: "Request received." }, { status: 200 });
  }

  const { data, errors } = validateDemoRequest(body);
  if (errors.length) {
    return NextResponse.json({ message: `Please check: ${errors.join(", ")}.` }, { status: 400 });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });
  }

  const configured = Boolean(
    (process.env.RESEND_API_KEY && process.env.DEMO_NOTIFY_TO) || process.env.DEMO_REQUEST_WEBHOOK_URL,
  );
  if (!configured) {
    return NextResponse.json({ message: "Online demo requests are not switched on yet." }, { status: 503 });
  }

  const creds = makeDemoCredentials(data.company);
  const requestedAt = new Date().toISOString();
  try {
    await notifyOwner(data, creds, requestedAt);
  } catch (err) {
    // eslint-disable-next-line no-console -- diagnostic only: the real cause, not just a generic 502
    console.error("[demo-request] notifyOwner failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ message: "We could not record your request right now." }, { status: 502 });
  }

  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const m = customerEmail(data, creds);
      await sendEmail(data.email, m.subject, m.text);
      emailed = true;
    } catch (err) {
      // eslint-disable-next-line no-console -- diagnostic only
      console.error("[demo-request] customer email failed:", err instanceof Error ? err.message : err);
      emailed = false; // the credentials are still shown on the page
    }
  }

  return NextResponse.json({
    message: "Request received. Your 3-day licence key will be emailed to you after verification.",
    username: creds.username,
    temporaryPassword: creds.temporaryPassword,
    emailed,
  });
}
