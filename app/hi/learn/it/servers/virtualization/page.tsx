import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/it/servers/virtualization/headings";
import { faqSchema } from "./metadata";
import Content from "./sections/Content";
export { metadata } from "./metadata";

export default function VirtualizationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="virtualization" headings={HEADINGS} readingTimeMinutes={24} lang="hi" alternateHref="/learn/it/servers/virtualization">
        <Content />
      </ArticleLayout>
    </>
  );
}
