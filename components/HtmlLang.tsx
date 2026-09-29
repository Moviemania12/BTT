"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// ═══════════════════════════════════════════════════════════════════════════
// components/HtmlLang.tsx
//
// Keeps <html lang> in sync with the current route: "hi" for /hi and /hi/*,
// "en" for everything else. Mounted once in app/layout.tsx.
//
// Why a client component: the site has ONE root layout (a single <html>), and
// Next.js cannot vary <html lang> per route from a static root layout without
// forcing every page to render dynamically. The server-rendered HTML therefore
// carries lang="en", an inline script in <head> corrects it to "hi" on /hi/*
// before first paint, and this component keeps it right during client-side
// navigation. Content on /hi/* is additionally wrapped in lang="hi" on the
// server (app/hi/layout.tsx), so the language is present in the raw HTML too.
// ═══════════════════════════════════════════════════════════════════════════

export function langForPath(pathname: string | null): "hi" | "en" {
  return pathname === "/hi" || (pathname ?? "").startsWith("/hi/") ? "hi" : "en";
}

export default function HtmlLang() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.lang = langForPath(pathname);
  }, [pathname]);
  return null;
}
