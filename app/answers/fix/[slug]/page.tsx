import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildSocialMeta } from "@/lib/schemas";
import { FIX_ANSWERS, FIX_ANSWER_SLUGS } from "@/content/answers/fix";
import FixAnswerPage from "@/components/answers/FixAnswerPage";

// ═══════════════════════════════════════════════════════════════════════════
// app/answers/fix/[slug]/page.tsx
//
// Statically generated from FIX_ANSWER_SLUGS only (generateStaticParams) —
// any slug not in content/answers/fix.ts renders notFound(), never an empty
// or thin page. Same server/client-free pattern as the /tools pages.
// ═══════════════════════════════════════════════════════════════════════════

export function generateStaticParams() {
  return FIX_ANSWER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const answer = FIX_ANSWERS[slug];
  if (!answer) return {};

  const url = `https://behindthetech.in/answers/fix/${answer.slug}`;
  return {
    title: answer.seoTitle,
    description: answer.seoDescription,
    alternates: { canonical: url },
    ...buildSocialMeta({ title: answer.seoTitle, description: answer.seoDescription, url, type: "article" }),
  };
}

export default async function FixAnswerRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const answer = FIX_ANSWERS[slug];
  if (!answer) notFound();

  return <FixAnswerPage answer={answer} />;
}
