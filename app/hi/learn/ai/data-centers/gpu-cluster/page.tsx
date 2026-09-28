import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/ai/data-centers/gpu-cluster/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { gpuClusterMetadata } from "@/content/gpu-cluster/metadata.hi";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function GpuClusterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ArticleLayout
        slug="gpu-cluster"
        headings={HEADINGS}
        readingTimeMinutes={gpuClusterMetadata.readingTimeMinutes}
       lang="hi" alternateHref="/learn/ai/data-centers/gpu-cluster">
        <Content />
      </ArticleLayout>
    </>
  );
}
