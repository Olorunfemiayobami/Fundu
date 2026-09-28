"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import SettingsDialog from "./SettingsDialog";

const reasons = ["My fundraiser is finished", "I made a mistake or a duplicate account", "It didn’t work for my supporters", "Privacy concerns", "Something else"];

  async function authHeaders() {
    const { data, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !data?.session?.access_token) throw new Error("Please sign in again.");
    return { Authorization: `Bearer ${data.session.access_token}`, "Content-Type": "application/json" };
  }

export default function DeleteAccountDialog({ campaignCount, liveCount, googleOnly, resume = false, onClose }) {
  const [step, setStep] = useState(resume ? 2 : 1);
  const [acknowledged, setAcknowledged] = useState(false);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [availability, setAvailability] = useState(null);
  const [error, setError] = useState("");
  const input = useRef(null), pending = useRef(false);

  const checkAvailability = useCallback(async () => {
    setAvailability(null); setError("");
    try {
      const response = await fetch("/api/account", { headers: await authHeaders(), cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setAvailability(data);
      if (resume && !data.googleConfirmed && data.ready) setError("Google confirmation wasn’t completed or expired. Please confirm again.");
    } catch { setAvailability({ ready: false, message: "We couldn’t check account deletion. Please retry." }); }
  }, [resume]);
  useEffect(() => { checkAvailability(); }, [checkAvailability]);
  useEffect(() => { if (step === 2) input.current?.focus(); }, [step]);

  async function confirmGoogle() {
    if (pending.current) return;
    pending.current = true; setBusy(true); setError("");
    try {
      const response = await fetch("/api/account/google", { method: "POST", headers: await authHeaders() });
      const data = await response.json();
      if (!response.ok || !data.url) throw new Error(data.message);
      window.location.assign(data.url);
    } catch { setError("Google confirmation couldn’t start. Please try again."); setBusy(false); pending.current = false; }
  }
  async function deleteAccount(event) {
    event.preventDefault();
    if (pending.current || !availability?.ready || !acknowledged || confirmation !== "DELETE" || (googleOnly ? !availability.googleConfirmed : !password)) return;
    pending.current = true; setBusy(true); setError("");
    try {
      const response = await fetch("/api/account", { method: "POST", headers: await authHeaders(), body: JSON.stringify({ acknowledged, confirmation, password: googleOnly ? undefined : password, reason }) });
      const data = await response.json();
      if (!response.ok || !data.deleted) { setError(data.message || "Deletion couldn’t finish. Please retry."); return; }
      setPassword("");
      // Supabase removes the browser's stored session even if its remote JWT is now invalid.
      await supabase.auth.signOut({ scope: "local" }).catch(() => {});
      window.location.replace("/account-deleted");
    } catch { setError("We couldn’t confirm deletion finished. Please retry; your account may already have been deleted."); }
    finally { pending.current = false; setBusy(false); }
  }
  const unavailable = availability && !availability.ready;
  const canDelete = acknowledged && confirmation === "DELETE" && availability?.ready && (googleOnly ? availability.googleConfirmed : Boolean(password));
  const close = () => { if (!busy) onClose(); };
  return <SettingsDialog className={`settings-dialog--delete settings-dialog--delete-step-${step}`} eyebrow={`Step ${step} of 2`} title={step === 1 ? "Delete your account?" : "Confirm it’s you"} description={step === 1 ? "Here’s what will happen. This can’t be undone." : "One last check before we delete everything."} busy={busy} onClose={close} icon={<span className="settings-delete-icon" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={step === 1 ? "M3 6h18M5 6l1 15h12l1-15M9 6V3h6v3M10 10v7M14 10v7" : "M5 10h14v11H5zM8 10V6a4 4 0 0 1 8 0v4"} /></svg></span>} footer={step === 1 ? <><button data-initial-focus type="button" className="settings-outline-btn" onClick={close}>Keep my account</button><button type="button" className="settings-delete-btn" disabled={!acknowledged} onClick={() => setStep(2)}>Continue</button></> : <><button type="button" className="settings-outline-btn" disabled={busy} onClick={() => { setStep(1); setPassword(""); setError(""); }}>Back</button><button type="submit" form="settings-delete-form" className="settings-delete-btn" disabled={!canDelete || busy}>{busy ? "Deleting…" : "Delete my account"}</button></>}>
    <span className="settings-delete-mobile-title" aria-hidden="true">Delete account</span><button type="button" className="settings-delete-close" aria-label="Close delete account" disabled={busy} onClick={close}>×</button>
    {step === 1 ? <><div className="settings-delete-consequences"><div><span className="settings-delete-consequence-icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 7h6l2 2h10v12H3z" /></svg></span><strong>{campaignCount} {campaignCount === 1 ? "campaign is" : "campaigns are"} deleted</strong><p>Including {liveCount} live {liveCount === 1 ? "campaign" : "campaigns"}. Their links stop working and show a “page not found” message.</p></div><div><span className="settings-delete-consequence-icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 5h18v15H3zM16 10h5v5h-5z" /></svg></span><strong>Your payment methods are removed</strong><p>Supporters won’t see your bank or wallet details any more.</p></div><div><span className="settings-delete-consequence-icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a8 8 0 0 0-16 0v2M16 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0" /></svg></span><strong>Your profile and activity are erased</strong><p>Updates, comments you posted and your history go too.</p></div></div><div className="settings-delete-alternative"><h3>Only want to stop one fundraiser?</h3><p>You can end a campaign early instead and keep your account.</p><Link href="/campaigns">Go to My campaigns</Link></div><label className="settings-password-checkbox"><input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} />I understand this is permanent and can’t be undone.</label></> : <form id="settings-delete-form" className="settings-password-form" onSubmit={deleteAccount}>
      {googleOnly ? <div><p>Confirm with the same Google account you use for Fundu.</p><button ref={input} type="button" className="settings-outline-btn" disabled={busy || !availability?.ready || availability?.googleConfirmed} onClick={confirmGoogle}>{availability?.googleConfirmed ? "✓ Google confirmed" : "Confirm with Google"}</button></div> : <label className="settings-password-field"><span>Enter your password to confirm</span><span className="settings-password-input"><input aria-label="Enter your password to confirm" ref={input} type={visible ? "text" : "password"} autoComplete="current-password" value={password} disabled={busy} required onChange={(event) => setPassword(event.target.value)} /><button type="button" disabled={busy} aria-label={visible ? "Hide password" : "Show password"} onClick={() => setVisible((current) => !current)}><span aria-hidden="true">{visible ? "Hide" : "Show"}</span></button></span></label>}
      <label className="settings-password-field"><span>Type DELETE to confirm</span><input className="settings-delete-input" autoComplete="off" spellCheck={false} value={confirmation} disabled={busy} required onChange={(event) => setConfirmation(event.target.value)} /></label>
      <label className="settings-password-field"><span>Why are you leaving? <span className="settings-security-muted">(optional)</span></span><select className="settings-delete-input" value={reason} disabled={busy} onChange={(event) => setReason(event.target.value)}><option value="">Choose a reason</option>{reasons.map((item) => <option key={item}>{item}</option>)}</select><small>Optional. Reason feedback isn’t saved yet.</small></label>
      {!acknowledged && <label className="settings-password-checkbox"><input type="checkbox" disabled={busy} checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} />I understand this is permanent and can’t be undone.</label>}
      {!availability && <p role="status">Checking account deletion…</p>}{unavailable && <div><p role="status">{availability.message}</p><button type="button" className="settings-outline-btn" disabled={busy} onClick={checkAvailability}>Retry availability check</button></div>}{error && <p role="alert" className="settings-security-error">{error}</p>}
    </form>}
  </SettingsDialog>;
}
