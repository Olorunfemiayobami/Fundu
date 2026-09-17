import "@/styles/settings.css";

export default function SettingsLayout({ children }) {
  // We remove the Sidebar from here because Page.js now handles it
  // along with the tab-switching logic.
  return <div className="settings-layout-wrapper">{children}</div>;
}
