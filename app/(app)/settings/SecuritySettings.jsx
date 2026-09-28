"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import SettingsDialog from "./SettingsDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
import DeleteAccountDialog from "./DeleteAccountDialog";

const iconPaths = {
  email: "M3 5h18v14H3zM3 5l9 7 9-7",
  key: "M14 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0M13 7l8-5M17 4l3 3",
  google: "M20 8a9 9 0 1 0 1 4h-9",
  logout: "M9 4H4v16h5M9 12h12M16 7l5 5-5 5",
  trash: "M3 6h18M5 6l1 15h12l1-15M9 6V3h6v3M10 10v7M14 10v7",
};
function SecurityIcon({ name }) { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={iconPaths[name]} /></svg>; }

export default function SecuritySettings({ authUser, campaignCount, liveCount = 0 }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteResume, setDeleteResume] = useState(false);
  useEffect(() => { if (new URLSearchParams(window.location.search).get("deleteAccount") === "confirm") { setDeleteResume(true); setDeleteOpen(true); window.history.replaceState(window.history.state, "", window.location.pathname); } }, []);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordConfigured, setPasswordConfigured] = useState(false);
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [deviceError, setDeviceError] = useState("");
  const [deviceNotice, setDeviceNotice] = useState("");
  const [resending, setResending] = useState(false);
  const [resendError, setResendError] = useState("");
  const [resendNotice, setResendNotice] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const email = authUser?.email || "";
  const verified = Boolean(email && authUser?.email_confirmed_at);
  const identityProviders = authUser?.identities?.map((identity) => identity.provider) || [];
  const googleConnected = identityProviders.includes("google");
  const providers = [...identityProviders, ...(authUser?.app_metadata?.providers || [])];
  const googleOnly = googleConnected && !providers.includes("email") && !passwordConfigured;

  useEffect(() => {
    if (!cooldown) return;
    const timer = setTimeout(() => setCooldown((remaining) => Math.max(0, remaining - 1)), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);
  async function resendVerification() {
    if (!email || resending || cooldown) return;
    setResending(true); setResendError(""); setResendNotice("");
    try {
      const { error } = await supabase.auth.resend({ type: "signup", email, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } });
      if (error) throw error;
      setResendNotice("Check your email for a verification link."); setCooldown(60);
    } catch { setResendError("We couldn’t send the verification email. Please try again."); }
    finally { setResending(false); }
  }
  async function signOutOthers() {
    if (signingOut) return;
    setSigningOut(true); setDeviceError(""); setDeviceNotice("");
    try {
      const { error } = await supabase.auth.signOut({ scope: "others" });
      if (error) throw error;
      setConfirmSignOut(false); setDeviceNotice("Signed out of other devices");
    } catch { setDeviceError("We couldn’t sign out the other devices. Please try again."); }
    finally { setSigningOut(false); }
  }

  return (
    <section className="settings-panel settings-security" aria-labelledby="settings-security-heading">
      <div className="settings-panel-header"><div><h2 id="settings-security-heading">Sign-in and security</h2><p>How you sign in, and what to do if something looks wrong.</p></div></div>
      <div><h3>Sign-in methods</h3><div className="settings-security-list">
        <div className="settings-security-row"><span className="settings-security-icon"><SecurityIcon name="email" /></span><div className="settings-security-copy"><h4>Email</h4><p>{email || "No email address linked."}{email && (verified ? ". Verified." : ". Not verified.")}</p></div>{verified ? <span className="settings-security-pill">✓ Verified</span> : <div className="settings-security-action"><button className="settings-outline-btn" type="button" disabled={!email || resending || cooldown > 0} onClick={resendVerification}>{resending ? "Sending…" : cooldown ? `Resend in ${cooldown}s` : "Resend verification email"}</button></div>}</div>
        {(resendError || resendNotice) && <div className="settings-security-feedback">{resendError && <p role="alert" className="settings-security-error">{resendError}</p>}{resendNotice && <p role="status">{resendNotice}</p>}</div>}
        <div className="settings-security-row"><span className="settings-security-icon"><SecurityIcon name="key" /></span><div className="settings-security-copy"><h4>Password</h4><p>{googleOnly ? "Add a password to sign in with your email, too." : "Use a password you don’t use anywhere else."}</p></div><button type="button" className="settings-outline-btn settings-security-action" disabled={!email} onClick={() => setPasswordOpen(true)}>{googleOnly ? "Set a password" : "Change password"}</button></div>
        <div className="settings-security-row"><span className="settings-security-icon"><SecurityIcon name="google" /></span><div className="settings-security-copy"><h4>Google</h4><p>Sign in with your Google account instead of a password.</p></div><span className={googleConnected ? "settings-security-pill" : "settings-security-muted"}>{googleConnected ? "✓ Connected" : "Not connected"}</span></div>
      </div></div>
      <div><h3>Devices</h3><div className="settings-security-list"><div className="settings-security-row"><span className="settings-security-icon"><SecurityIcon name="logout" /></span><div className="settings-security-copy"><h4>Sign out everywhere else</h4><p>If you signed in on a shared or lost device, this signs out every other session.</p></div><button className="settings-outline-btn settings-security-action" type="button" onClick={() => { setDeviceError(""); setConfirmSignOut(true); }}>Sign out other devices</button></div></div>{deviceNotice && <p className="settings-security-device-notice" role="status">{deviceNotice}</p>}</div>
      <div className="settings-security-danger"><h3>Delete account</h3><p>Permanently removes your profile and all {campaignCount} {campaignCount === 1 ? "campaign" : "campaigns"}, including live ones. Their links will stop working and supporters won’t see your payment details any more. This can’t be undone.</p><button type="button" className="settings-outline-btn" onClick={() => { setDeleteResume(false); setDeleteOpen(true); }}><SecurityIcon name="trash" />Delete my account</button></div>
      {deleteOpen && <DeleteAccountDialog campaignCount={campaignCount} liveCount={liveCount} googleOnly={googleOnly} resume={deleteResume} onClose={() => setDeleteOpen(false)} />}
      {passwordOpen && <ChangePasswordDialog authUser={authUser} googleOnly={googleOnly} onClose={() => setPasswordOpen(false)} onUpdated={() => setPasswordConfigured(true)} />}
      {confirmSignOut && <SettingsDialog title="Sign out of other devices?" description="Your other Fundu sessions will end. You’ll stay signed in here." busy={signingOut} onClose={() => setConfirmSignOut(false)} footer={<><button data-initial-focus className="settings-outline-btn" type="button" disabled={signingOut} onClick={() => setConfirmSignOut(false)}>Cancel</button><button className="settings-primary-btn" type="button" disabled={signingOut} onClick={signOutOthers}>{signingOut ? "Signing out…" : "Sign out other devices"}</button></>}>{deviceError && <p className="settings-security-error" role="alert">{deviceError}</p>}</SettingsDialog>}
    </section>
  );
}

