import MarketingPage from "@/components/site/MarketingPage";
import { notFound } from "next/navigation";
import CategoryView, { SLUGS } from "@/components/site/views/CategoryView";
import meta from "@/components/site/views/meta.json";

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const m = meta.categories[slug];
  return m ? { title: `${m.title} | Fundu`, description: m.description } : {};
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  if (!SLUGS.includes(slug)) notFound();
  return <MarketingPage><CategoryView slug={slug} /></MarketingPage>;
}
