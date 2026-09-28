import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/it/networking/load-balancer/headings";
import { faqSchema } from "./metadata";
import Content from "./sections/Content";
export { metadata } from "./metadata";

export default function LoadBalancerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ArticleLayout slug="load-balancer" headings={HEADINGS} readingTimeMinutes={110} lang="hi" alternateHref="/learn/it/networking/load-balancer">
        <Content />
      </ArticleLayout>
    </>
  );
}
