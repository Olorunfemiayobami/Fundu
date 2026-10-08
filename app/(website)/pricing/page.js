import MarketingPage from "@/components/site/MarketingPage";
import PricingView from "@/components/site/views/PricingView";

export const metadata = { title: "Pricing | Fundu", description: "Pay for the page, never a cut of the money. Hosting is ₦100 a day, and free during early access." };

export default function PricingPage() {
  return <MarketingPage><PricingView /></MarketingPage>;
}
