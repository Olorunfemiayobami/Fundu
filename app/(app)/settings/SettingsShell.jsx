import Link from "next/link";

const sections = [
  ["profile", "Profile", "Your name, photo and bio", "user"],
  ["payment-methods", "Payment methods", "How supporters can pay you", "wallet"],
  ["security", "Sign-in and security", "Password, Google and devices", "shield"],
];
const resources = [["/help", "Help", "help"], ["/terms", "Terms of Service", "file"], ["/privacy", "Privacy Policy", "lock"]];
const paths = {
  user: "M20 21v-2a7 7 0 0 0-14 0v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  wallet: "M20 7H5a2 2 0 0 1 0-4h13v4M5 7H3v13h18V7M17 13h4M17 13v3h4",
  shield: "M12 3 3 7v6c0 5 9 9 9 9s9-4 9-9V7zM8 12l3 3 5-6",
  help: "M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3M12 17h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  file: "M14 2H5v20h14V7zM14 2v6h5M8 12h8M8 16h8",
  lock: "M5 10h14v12H5zM8 10V6a4 4 0 0 1 8 0v4",
  logout: "M9 4H4v16h5M9 12h12M16 7l5 5-5 5",
  back: "M20 12H4M10 6l-6 6 6 6",
  chevron: "m9 5 7 7-7 7",
};

function Icon({ name }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export default function SettingsShell({ section, name, email, avatar, onLogout, logoutError, children }) {
  const active = section || "profile";
  const title = sections.find(([key]) => key === active)?.[1] || "Bank Account";
  return (
    <div className={`settings-page settings-redesign ${section ? "settings-redesign--section" : "settings-redesign--menu"}`}>
      <header className="settings-header"><div><h1>Settings</h1><p>Manage your profile, payment methods and sign-in.</p></div></header>
      <header className="settings-section-topbar"><Link href="/settings" aria-label="Back to Settings"><Icon name="back" /></Link><h1>{title}</h1><span /></header>
      <div className="settings-layout">
        <aside className="settings-directory">
          <div className="settings-user-card">{avatar}<div className="settings-user-card__text"><strong>{name}</strong><span title={email}>{email}</span></div></div>
          <nav className="settings-tabs" aria-label="Settings sections">
            {sections.map(([key, label, description, icon]) => <Link key={key} href={`/settings/${key}`} className={`settings-tab ${active === key ? "active" : ""}`} aria-current={active === key ? "page" : undefined}><span className="settings-icon-chip"><Icon name={icon} /></span><span className="settings-menu-copy"><strong>{label}</strong><span>{description}</span></span><span className="settings-menu-chevron"><Icon name="chevron" /></span></Link>)}
          </nav>
          <nav className="settings-resources" aria-label="Support and policies">{resources.map(([href, label, icon]) => <Link href={href} key={href}><Icon name={icon} /><strong>{label}</strong><span className="settings-menu-chevron"><Icon name="chevron" /></span></Link>)}</nav>
          <button type="button" className="settings-logout-btn" onClick={onLogout}><Icon name="logout" />Log out</button>
          {logoutError && <p role="alert" className="settings-logout-error">{logoutError}</p>}
        </aside>
        <div className="settings-content">{children}</div>
      </div>
    </div>
  );
}
