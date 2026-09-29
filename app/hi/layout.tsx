import type { ReactNode } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// app/hi/layout.tsx — every /hi/* page
//
// Marks the page content as Hindi in the server-rendered HTML. <html lang> is
// switched to "hi" by components/HtmlLang.tsx (see the note there).
// `display: contents` means this wrapper adds no box — layout is unchanged.
// ═══════════════════════════════════════════════════════════════════════════

export default function HindiLayout({ children }: { children: ReactNode }) {
  return (
    <div lang="hi" style={{ display: "contents" }}>
      {children}
    </div>
  );
}
