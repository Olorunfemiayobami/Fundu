import MarketingPage from "@/components/site/MarketingPage";
import ContactView from "@/components/site/views/ContactView";

export const metadata = { title: "Contact us | Fundu", description: "Questions, problems or ideas. Send the Fundu team a message." };

export default function ContactPage() {
  return <MarketingPage><ContactView /></MarketingPage>;
}
