import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleFeedback, ContactCard } from "@/components/help/HelpUI";
import HelpIcon from "@/components/help/HelpIcon";
import { getHelpArticle, getHelpTopic, helpArticles, helpArticleUrl } from "@/lib/helpContent";
import "@/styles/help.css";

export function generateStaticParams() { return helpArticles.map(item => ({ topic: item.topic, article: item.slug })); }
export async function generateMetadata({ params }) { const { topic, article } = await params; const item = getHelpArticle(topic, article); return { title: item ? `${item.title} | Fundu Help` : "Help | Fundu", description: item?.summary }; }

export default async function HelpArticlePage({ params }) {
  const { topic: topicSlug, article: articleSlug } = await params;
  const topic = getHelpTopic(topicSlug);
  const item = getHelpArticle(topicSlug, articleSlug);
  if (!topic || !item) notFound();
  const siblings = helpArticles.filter(other => other.topic === topicSlug && other.slug !== articleSlug).slice(0, 3);
  const minutes = Math.max(1, Math.ceil(`${item.intro} ${item.paragraphs.join(" ")}`.split(/\s+/).length / 200));
  return <main className="help-page help-inner"><nav className="help-breadcrumb" aria-label="Breadcrumb"><Link href="/help">Help</Link><span>/</span><Link href={`/help/${topic.slug}`}>{topic.name}</Link><span>/</span><strong aria-current="page">{item.title}</strong></nav><div className="help-article-layout"><article className="help-article"><Link className="help-article-topic" href={`/help/${topic.slug}`}>{topic.name}</Link><h1>{item.title}</h1><p className="help-article-intro">{item.intro}</p><p className="help-reading-time"><HelpIcon name="clock" />{minutes} min read</p>{item.steps ? <><ol className="help-steps">{item.steps.map((step, index) => <li key={step}><h2>{step}</h2><p>{item.stepDetails[index]}</p></li>)}</ol><p className="help-article-after">Your campaign goes live without waiting for manual approval. Fundu may review or remove it later if it is reported or violates our Terms.</p></> : <div className="help-article-body">{item.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>}{item.tip && <aside className="help-callout help-tip"><strong><HelpIcon name="bulb" />Your work is saved as you go</strong><p>{item.tip}</p></aside>}{item.note && <aside className="help-callout help-note"><strong><HelpIcon name="info" />About the hosting fee</strong><p>{item.note}</p></aside>}{item.link && <p className="help-article-link"><Link href={item.link.href}>{item.link.text} →</Link></p>}<ArticleFeedback /><div className="help-article-contact"><ContactCard /></div></article><aside className="help-related"><div className="help-related-card"><h2>Related articles</h2>{siblings.map(other => <Link key={other.slug} href={helpArticleUrl(other)}>{other.title}<HelpIcon name="chevr" /></Link>)}</div><Link className="help-all-articles" href={`/help/${topic.slug}`}><HelpIcon name="back" />All {topic.name} articles</Link><div className="help-related-contact"><ContactCard /></div></aside></div></main>;
}
