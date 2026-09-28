import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/it/servers/server-basics/headings";
import { faqSchema } from "./metadata";
import Content from "./sections/Content";
export { metadata } from "./metadata";

export default function ServerBasicsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="server-basics" headings={HEADINGS} readingTimeMinutes={22} lang="hi" alternateHref="/learn/it/servers/server-basics">
        <Content />
      </ArticleLayout>
    </>
  );
}
