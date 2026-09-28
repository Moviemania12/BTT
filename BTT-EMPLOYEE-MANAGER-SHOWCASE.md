# BTT Employee Manager — website showcase (local changes, not committed)

## Routes
| URL | What |
|---|---|
| `/` | New flagship section right after the hero (`ProductShowcase`) |
| `/products/btt-employee-manager` | Full product page: hero, problem → solution, 15 features, how it works, screenshot gallery + product tour, mobile app, who it is for, 3-day demo CTA, FAQ, SoftwareApplication JSON-LD |
| `/products/btt-employee-manager#tour` | Opens the product tour (auto-advancing lightbox) |
| `/products/btt-employee-manager/demo` | Demo request form |
| `POST /api/demo-request` | Validates + forwards the request (see below) |

## Files
New
- `lib/bttEmployeeManager.ts` — all product copy (features that exist only)
- `components/btt-employee-manager/ProductShowcase.tsx`, `ScreenshotGallery.tsx`, `PhoneScreens.tsx`, `DemoRequestForm.tsx`, `bem.css`
- `app/products/btt-employee-manager/page.tsx`, `app/products/btt-employee-manager/demo/page.tsx`
- `app/api/demo-request/route.ts`
- `public/images/btt-employee-manager/*.webp` (10 screens, 34–128 KB each)

Changed (one line each)
- `app/page.tsx` — `<ProductShowcase />` after `<HeroV2 />`
- `app/sitemap.ts` — 2 new URLs
- `components/Footer.tsx` — "BTT Employee Manager" link under Resources

## Screenshots
Desktop screens are real captures of the Windows application (v0.11 + v0.14 mobile link)
running on a demo database: employee names replaced by "Employee 01…", site renamed
"Demo Data Center", no phone numbers/addresses. No real staff data is on the website.

Mobile screens are HTML previews built from the real app layout (same fields/labels/colours),
because the app uses FLAG_SECURE and Android blocks screenshots of it. They are labelled
"Screen previews".

Screens still worth adding later (not captured because the demo data had nothing to show):
- Penalty / Shortage report with a real shortage case
- Excel export (Monthly Roster sheet) — from a demo database, not live data
- Reports screen with a report run

## Demo flow — what exists and what is still needed
The form collects name, company, email, mobile, employee range (optional) and POSTs to
`/api/demo-request`. The route validates, rate-limits, drops honeypot bots and forwards the
request to `DEMO_REQUEST_WEBHOOK_URL` (optional `DEMO_REQUEST_WEBHOOK_SECRET` sent as a
Bearer token). Without that env var it returns 503 and the form offers a pre-filled email to
hello@behindthetech.in. Nothing is faked.

Licences are NOT created by the website on purpose: keys are Ed25519-signed with the owner
private key, which must stay on the owner PC. The owner issues the demo from
Windows → License & Customer Mgmt (issue_license(duration_days=3)). There is no employee
limit in the licence, so "unlimited employees" is accurate.

Backend work still required
1. Set `DEMO_REQUEST_WEBHOOK_URL` (e.g. Google Apps Script → Sheet + email, or a CRM) on
   Vercel and in `.env.local` for local testing.
2. Demo key grace period: signed licences currently carry `grace_days = 15`, so a 3-day key
   keeps working for 15 more days in GRACE status. For a strict 3-day demo, add a
   `grace_days` option (0 for demo) to `owner_license_service.issue_license` and a "Demo
   (3 days, no grace)" preset on the License & Customer Mgmt page.
3. Installer link: host the Windows installer (download page / Vercel Blob) and send the
   link with the licence email.

## Checks run (sandbox copy)
`next build` (compile + type-check + lint): passed. Desktop 1440×900 and mobile 390×844:
no horizontal overflow; gallery thumbs, lightbox (←/→/Esc), tour (#tour, auto-advance),
demo validation and the 503 fallback all verified; no console errors from the new code.
Google Fonts and the other site sections could not be fetched in the sandbox, so run
`npm run build` locally for the full-site check.


## v0.15 — demo request, download page, support email (local changes, not committed)

### Demo flow
1. The customer fills the demo form (name, company, email, mobile, optional employee count).
2. The page immediately shows a **temporary username + temporary password**
   (`demo_<company>_<4 digits>`, 10-character password). They are also emailed to the customer.
3. The enquiry (with those credentials) goes to the owner's inbox.
4. The owner opens **Windows → License & Customer Mgmt**, adds the customer, types the same
   username/temporary password, issues a **3-day** licence and emails the key. The licence
   is signed on the owner PC only; the website never creates licences.
5. The customer installs the Windows app, enters username + temporary password + key and sets a
   new password.

### Email / environment variables (Vercel → Settings → Environment Variables, and `.env.local`)
| Variable | Value |
|---|---|
| `RESEND_API_KEY` | API key from resend.com (domain `behindthetech.in` verified there) |
| `DEMO_NOTIFY_TO` | the owner's private inbox — only here, never in code or on the site |
| `MAIL_FROM` | `Behind The Tech <support@behindthetech.in>` |
| `DEMO_REQUEST_WEBHOOK_URL` | optional second channel (e.g. Google Sheet) |

Visible contact everywhere on the product pages: **support@behindthetech.in**. Forward that
mailbox to the owner's Gmail at the domain's email provider (e.g. Cloudflare Email Routing /
ImprovMX / Zoho): `support@behindthetech.in → owner inbox`. No SMTP password or API key is in
the source code.

Without an email/webhook channel the form answers "not switched on yet" and shows no credentials.

### Download page
Only: what the product does, Windows download, Android download, 3-day demo, system
requirements, support contact. Files are auto-detected in `public/downloads/` (git-ignored) or
taken from `BTT_EM_WINDOWS_URL` / `BTT_EM_ANDROID_URL`.

### Tests
`npm run test:demo` — validation, temporary credentials, email content, and a check that no
Gmail address or API key is in the site source.
