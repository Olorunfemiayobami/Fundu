import MarketingPage from "@/components/site/MarketingPage";
import GuidesView from "@/components/site/views/GuidesView";

export const metadata = { title: "Tips & guides | Fundu", description: "Short, practical guides for writing your story, sharing your link, posting updates and saying thank you." };

export default function GuidesPage() {
  return <MarketingPage><GuidesView /></MarketingPage>;
}
