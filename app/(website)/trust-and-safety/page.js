import MarketingPage from "@/components/site/MarketingPage";
import TrustView from "@/components/site/views/TrustView";

export const metadata = { title: "Trust & safety | Fundu", description: "What Fundu does to keep pages trustworthy, what it can’t do, and how to give and raise money safely." };

export default function TrustPage() {
  return <MarketingPage><TrustView /></MarketingPage>;
}
