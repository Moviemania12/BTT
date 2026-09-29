import type { ReactNode } from "react";
import {
  TOPICS,
  TRACK_BASE_URLS,
  TRACK_LABELS,
  CATEGORY_LABELS,
  getTopicUrl,
} from "@/lib/topics";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://behindthetech.in";

/**
 * TechArticle + BreadcrumbList JSON-LD built from the topic registry
 * (lib/topics.ts). Name, description, URL and category path all come from the
 * registry — nothing is invented. Used by ArticleLayout and by the flagship
 * pages that render ArticlePage directly.
 */
export default function ArticleStructuredData({
  slug,
  lang,
}: {
  slug: string;
  lang?: "en" | "hi";
}): ReactNode {
  const topic = TOPICS[slug];
  if (!topic) return null;
  let schema: ReactNode = null;
  const language = lang === "hi" ? "hi" : "en";
  const topicPath = getTopicUrl(topic);
  const pageUrl = `${SITE_URL}${language === "hi" ? "/hi" : ""}${topicPath}`;
  const crumbs: { name: string; item: string }[] = [{ name: "Home", item: SITE_URL }];
  if (topic.track === "learn") {
    crumbs.push({ name: TRACK_LABELS.learn, item: `${SITE_URL}/learn` });
  } else {
    crumbs.push({ name: TRACK_LABELS[topic.track], item: `${SITE_URL}${TRACK_BASE_URLS[topic.track]}` });
    crumbs.push({
      name: CATEGORY_LABELS[topic.category],
      item: `${SITE_URL}${TRACK_BASE_URLS[topic.track]}/${topic.category}`,
    });
  }
  crumbs.push({ name: topic.title, item: pageUrl });

  schema = (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: topic.title,
          description: topic.description,
          inLanguage: language,
          url: pageUrl,
          mainEntityOfPage: pageUrl,
          author: { "@type": "Person", name: "Kumar Anil" },
          publisher: { "@type": "Organization", name: "Behind The Tech", url: SITE_URL },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: c.item,
          })),
        }}
      />
    </>
  );
  return schema;
}
