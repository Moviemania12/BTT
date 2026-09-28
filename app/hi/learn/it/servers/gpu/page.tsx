import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/it/servers/gpu/headings";
import { faqSchema } from "./metadata";
import Content from "./sections/Content";
export { metadata } from "./metadata";

export default function GpuPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="gpu" headings={HEADINGS} readingTimeMinutes={20} lang="hi" alternateHref="/learn/it/servers/gpu">
        <Content />
      </ArticleLayout>
    </>
  );
}
