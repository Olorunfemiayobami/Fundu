import MarketingPage from "@/components/site/MarketingPage";
import AboutView from "@/components/site/views/AboutView";

export const metadata = { title: "About us | Fundu", description: "Fundu gives every goal one proper page and one link to share. Built in Nigeria, step by step." };

export default function AboutPage() {
  return <MarketingPage><AboutView /></MarketingPage>;
}
