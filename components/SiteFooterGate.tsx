"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// components/SiteFooterGate.tsx
//
// Renders the shared <Footer /> (passed in as children by app/layout.tsx) on
// every page EXCEPT those that already render their own <Footer /> inline.
// This gives every content page (articles, hubs, tools, study, reference, DC
// map, 404 …) the same footer with Privacy Policy, Terms, Contact and About
// links, without editing the frozen homepage or ~200 article files.
//
// If you add a new page that renders <Footer /> itself, add its path below —
// otherwise the footer will appear twice.
// ═══════════════════════════════════════════════════════════════════════════

/** Pages that already render <Footer /> themselves. */
const PAGES_WITH_OWN_FOOTER = new Set<string>([
  "/",
  // About section
  "/about",
  "/about/mission",
  "/about/kumar-anil",
  "/about/contact",
  // Product section
  "/products/btt-employee-manager",
  "/products/btt-employee-manager/demo",
  "/products/btt-employee-manager/download",
  // Legal / policy pages (components/PolicyLayout.tsx renders <Footer />)
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
  "/disclaimer",
  "/editorial-policy",
  "/content-policy",
  "/fact-checking-policy",
  "/correction-policy",
  "/affiliate-disclosure",
  "/advertising-disclosure",
  "/accessibility",
]);

export default function SiteFooterGate({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const normalised = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (PAGES_WITH_OWN_FOOTER.has(normalised)) return null;
  return <>{children}</>;
}
