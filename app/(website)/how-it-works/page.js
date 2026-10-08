import MarketingPage from "@/components/site/MarketingPage";
import HowItWorksView from "@/components/site/views/HowItWorksView";

export const metadata = { title: "How Fundu works | Fundu", description: "Everything that happens, from the moment you decide to ask for help to the moment support lands in your account." };

export default function HowItWorksPage() {
  return <MarketingPage><HowItWorksView /></MarketingPage>;
}
