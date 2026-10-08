import { timingSafeEqual } from "node:crypto";

/**
 * Guard for internal/maintenance API routes (poster generation, content generation).
 * These call paid AI services, so they must not be open to the public.
 * Allowed only with `Authorization: Bearer <CRON_SECRET>` — the same header Vercel Cron
 * sends automatically when the CRON_SECRET environment variable is set.
 * Returns a 401 Response when the caller is not authorised, otherwise null.
 */
export function requireCronSecret(req: Request): Response | null {
  const secret = (process.env.CRON_SECRET ?? "").trim();
  const given = req.headers.get("authorization") ?? "";
  const expected = `Bearer ${secret}`;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  const ok = secret.length > 0 && a.length === b.length && timingSafeEqual(a, b);
  if (ok) return null;
  return new Response(JSON.stringify({ error: "Unauthorized." }), {
    status: 401,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
