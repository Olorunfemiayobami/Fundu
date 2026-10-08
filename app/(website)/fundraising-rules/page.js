import MarketingPage from "@/components/site/MarketingPage";
import RulesView from "@/components/site/views/RulesView";

export const metadata = { title: "Fundraising rules | Fundu", description: "What you can raise money for on Fundu, the rules every page follows, and what isn’t allowed." };

export default function RulesPage() {
  return <MarketingPage><RulesView /></MarketingPage>;
}
