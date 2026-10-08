import MarketingPage from "@/components/site/MarketingPage";
import { notFound } from "next/navigation";
import GuideView, { SLUGS } from "@/components/site/views/GuideView";
import meta from "@/components/site/views/meta.json";

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const m = meta.guides[slug];
  return m ? { title: `${m.title} | Fundu`, description: m.description } : {};
}

export default async function GuidePage({ params }) {
  const { slug } = await params;
  if (!SLUGS.includes(slug)) notFound();
  return <MarketingPage><GuideView slug={slug} /></MarketingPage>;
}
