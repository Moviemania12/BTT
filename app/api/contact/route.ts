import { NextResponse } from "next/server";

// ═══════════════════════════════════════════════════════════════════════════
// app/api/contact/route.ts — Contact form (/about/contact)
//
// Validates the message and emails it to the site owner through Resend, using
// the same environment variables as the demo-request form:
//   RESEND_API_KEY   email API key (https://resend.com)
//   DEMO_NOTIFY_TO   owner inbox that receives the message (never sent to the browser)
//   MAIL_FROM        optional verified sender; defaults to Resend's sandbox sender
//
// Nothing is stored in a database. With no email channel configured the route
// answers 503 — it never pretends a message was received.
// ═══════════════════════════════════════════════════════════════════════════

export const runtime = "nodejs";

const ENQUIRY_TYPES = [
  "Business & Collaboration",
  "Suggest a Topic",
  "Report an Issue",
  "Newsletter Signup",
  "General Enquiry",
];

// Small in-memory rate limit (per server instance) — first line of defence against spam.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled → pretend success, do nothing (don't help bots tune themselves).
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ message: "Message received." }, { status: 200 });
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 200).toLowerCase();
  const type = clean(body.type, 60);
  const message = clean(body.message, 4000);

  const errors: string[] = [];
  if (name.length < 2) errors.push("name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.push("email");
  if (message.length < 5) errors.push("message");
  if (type && !ENQUIRY_TYPES.includes(type)) errors.push("enquiry type");
  if (errors.length) {
    return NextResponse.json({ message: `Please check: ${errors.join(", ")}.` }, { status: 400 });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ message: "Too many messages. Please try again later." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.DEMO_NOTIFY_TO;
  if (!apiKey || !to) {
    return NextResponse.json(
      { message: "The contact form is not available right now. Please email us or use LinkedIn instead." },
      { status: 503 },
    );
  }

  const subject = `[BTT Contact] ${type || "General Enquiry"} — ${name}`;
  const text = [
    "New message from the Behind The Tech contact form.",
    "",
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Type:    ${type || "General Enquiry"}`,
    `Sent at: ${new Date().toISOString()}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.MAIL_FROM || "Behind The Tech <onboarding@resend.dev>",
        to: [to],
        subject,
        text,
        reply_to: email,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      // eslint-disable-next-line no-console -- diagnostic only (status code, never the message content)
      console.error(`[contact] Resend responded HTTP ${res.status}`);
      return NextResponse.json({ message: "We could not send your message right now. Please try again later." }, { status: 502 });
    }
  } catch (err) {
    // eslint-disable-next-line no-console -- diagnostic only
    console.error("[contact] send failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ message: "We could not send your message right now. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ message: "Message received." });
}
