import { notFound } from "next/navigation";
import { TopicContent } from "@/components/help/HelpUI";
import { getHelpTopic, helpTopics } from "@/lib/helpContent";
import "@/styles/help.css";

export function generateStaticParams() { return helpTopics.map(topic => ({ topic: topic.slug })); }
export async function generateMetadata({ params }) { const { topic: slug } = await params; const topic = getHelpTopic(slug); return { title: topic ? `${topic.name} | Fundu Help` : "Help | Fundu" }; }
export default async function HelpTopicPage({ params }) { const { topic: slug } = await params; const topic = getHelpTopic(slug); if (!topic) notFound(); return <TopicContent topic={topic} />; }
