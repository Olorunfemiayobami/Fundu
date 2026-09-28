import { notFound } from "next/navigation";
import SettingsScreen from "../SettingsScreen";

export default async function SettingsSectionPage({ params }) {
  const { section } = await params;
  if (!["profile", "payment-methods", "security", "bank-account"].includes(section)) notFound();
  return <SettingsScreen section={section} />;
}
