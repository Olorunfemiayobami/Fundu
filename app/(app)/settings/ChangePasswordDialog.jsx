"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import SettingsDialog from "./SettingsDialog";

function PasswordField({ label, id, value, onChange, autoComplete, invalid, describedBy, inputRef, initialFocus, disabled }) {
  const [visible, setVisible] = useState(false);
  return <label className="settings-password-field" htmlFor={id}><span>{label}</span><span className="settings-password-input"><input ref={inputRef} id={id} type={visible ? "text" : "password"} value={value} onChange={onChange} autoComplete={autoComplete} required disabled={disabled} aria-invalid={invalid || undefined} aria-describedby={describedBy} data-initial-focus={initialFocus || undefined} /><button type="button" disabled={disabled} onClick={() => setVisible((current) => !current)} aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`} aria-pressed={visible}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />{visible && <path d="m3 3 18 18" />}</svg></button></span></label>;
}

export default function ChangePasswordDialog({ authUser, googleOnly, onClose, onUpdated }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signOutOthers, setSignOutOthers] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [resetSending, setResetSending] = useState(false);
  const [resetNotice, setResetNotice] = useState("");
  const [currentError, setCurrentError] = useState("");
  const [newError, setNewError] = useState("");
  const [formError, setFormError] = useState("");
  const [updated, setUpdated] = useState(false);
  const [othersSignedOut, setOthersSignedOut] = useState(false);
  const [deviceError, setDeviceError] = useState("");
  const currentInput = useRef(null);
  const doneButton = useRef(null);
  const requestInFlight = useRef(false);
  const busy = updating || resetSending;
  const enoughCharacters = newPassword.length >= 8;
  const different = Boolean(newPassword) && (googleOnly || newPassword !== currentPassword);
  const mismatch = Boolean(confirmPassword) && confirmPassword !== newPassword;
  const valid = enoughCharacters && different && confirmPassword === newPassword && (googleOnly || Boolean(currentPassword)) && Boolean(authUser?.email);

  useEffect(() => { if (updated) doneButton.current?.focus(); }, [updated]);

  async function sendResetLink() {
    if (requestInFlight.current || !authUser?.email) return;
    requestInFlight.current = true; setResetSending(true); setFormError(""); setResetNotice("");
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(authUser.email, { redirectTo: `${window.location.origin}/reset-password` });
      if (error) throw error;
      setResetNotice("Check your email for a password reset link.");
    } catch { setFormError("We couldn’t send the reset link. Please try again."); }
    finally { requestInFlight.current = false; setResetSending(false); }
  }

  async function updatePassword(event) {
    event.preventDefault();
    if (!valid || requestInFlight.current) return;
    requestInFlight.current = true; setUpdating(true); setCurrentError(""); setNewError(""); setFormError("");
    try {
      if (!googleOnly) {
        const { data, error } = await supabase.auth.signInWithPassword({ email: authUser.email, password: currentPassword });
        if (error || data?.user?.id !== authUser.id) {
          setCurrentError(error?.code && error.code !== "invalid_credentials" ? "We couldn’t verify your current password. Please try again." : "That password isn’t right");
          requestAnimationFrame(() => currentInput.current?.focus());
          return;
        }
      }
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        if (error.code === "same_password") setNewError("Choose a password different from your current password.");
        else if (error.code === "weak_password") setNewError("Choose a stronger password and try again.");
        else if (error.code === "reauthentication_needed") setFormError("Please use an email reset link to confirm your identity and change your password.");
        else setFormError("Your password couldn’t be updated. Please try again.");
        return;
      }
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      onUpdated?.(data?.user);
      if (signOutOthers) {
        try {
          const { error: signOutError } = await supabase.auth.signOut({ scope: "others" });
          if (signOutError) throw signOutError;
          setOthersSignedOut(true);
        } catch { setDeviceError("Your password was updated, but we couldn’t sign out the other devices."); }
      }
      setUpdated(true);
    } catch { setFormError("Your password couldn’t be updated. Please try again."); }
    finally { requestInFlight.current = false; setUpdating(false); }
  }

  async function retrySignOut() {
    if (requestInFlight.current) return;
    requestInFlight.current = true; setUpdating(true); setDeviceError("");
    try {
      const { error } = await supabase.auth.signOut({ scope: "others" });
      if (error) throw error;
      setOthersSignedOut(true);
    } catch { setDeviceError("We couldn’t sign out the other devices. Please try again."); }
    finally { requestInFlight.current = false; setUpdating(false); }
  }

  const close = () => { if (!busy) onClose(); };
  const title = updated ? "Password updated" : googleOnly ? "Set a password" : "Change password";
  const description = updated ? `You’re still signed in here.${othersSignedOut ? " Other devices have been signed out." : ""}` : "Use one you don’t use anywhere else.";
  const icon = <span className="settings-password-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{updated ? <><circle cx="12" cy="12" r="9" /><path d="m7 12 3 3 7-7" /></> : <path d="M14 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0M13 7l8-5M17 4l3 3" />}</svg></span>;

  return <SettingsDialog title={title} description={description} icon={icon} className={`settings-dialog--password ${updated ? "settings-dialog--password-success" : ""}`} busy={busy} onClose={close} footer={updated ? <button ref={doneButton} type="button" className="settings-primary-btn" disabled={busy} onClick={close}>Done</button> : <><button type="button" className="settings-outline-btn settings-password-cancel" disabled={busy} onClick={close}>Cancel</button><button type="submit" form="settings-password-form" className="settings-primary-btn" disabled={!valid || busy}>{updating ? "Updating…" : "Update password"}</button></>}>
    <span className="settings-password-mobile-title" aria-hidden="true">{googleOnly ? "Set a password" : "Change password"}</span>
    <button type="button" className="settings-password-close" disabled={busy} aria-label={`Close ${googleOnly ? "set password" : "change password"}`} onClick={close}>×</button>
    {updated ? <div className="settings-password-success-content">{deviceError && <div><p role="alert" className="settings-security-error">{deviceError}</p><button type="button" className="settings-outline-btn" disabled={busy} onClick={retrySignOut}>{updating ? "Signing out…" : "Retry signing out other devices"}</button></div>}</div> : <form id="settings-password-form" className="settings-password-form" onSubmit={updatePassword}>
      {!googleOnly && <div><PasswordField label="Current password" id="settings-current-password" value={currentPassword} inputRef={currentInput} initialFocus disabled={busy} autoComplete="current-password" onChange={(event) => { setCurrentPassword(event.target.value); setCurrentError(""); }} invalid={Boolean(currentError)} describedBy={currentError ? "settings-current-password-error" : undefined} />{currentError && <p id="settings-current-password-error" role="alert" className="settings-security-error">{currentError}</p>}<button className="settings-password-reset" type="button" disabled={busy || Boolean(resetNotice)} onClick={sendResetLink}>{resetSending ? "Sending reset link…" : "Forgot your current password? Email me a reset link"}</button></div>}
      <div><PasswordField label="New password" id="settings-new-password" value={newPassword} autoComplete="new-password" initialFocus={googleOnly} disabled={busy} onChange={(event) => { setNewPassword(event.target.value); setNewError(""); }} invalid={Boolean(newError)} describedBy={`settings-password-requirements${newError ? " settings-new-password-error" : ""}`} /><ul id="settings-password-requirements" className="settings-password-requirements"><li className={enoughCharacters ? "met" : ""}>{enoughCharacters ? "✓" : "○"} At least 8 characters</li>{!googleOnly && <li className={different ? "met" : ""}>{different ? "✓" : "○"} Different from your current password</li>}</ul>{newError && <p id="settings-new-password-error" className="settings-security-error" role="alert">{newError}</p>}</div>
      <div><PasswordField label="Confirm new password" id="settings-confirm-password" value={confirmPassword} disabled={busy} autoComplete="new-password" onChange={(event) => setConfirmPassword(event.target.value)} invalid={mismatch} describedBy={mismatch ? "settings-password-mismatch" : undefined} />{mismatch && <p id="settings-password-mismatch" className="settings-security-error" role="alert">⚠ Passwords don’t match</p>}</div>
      <label className="settings-password-checkbox"><input type="checkbox" checked={signOutOthers} disabled={busy} onChange={(event) => setSignOutOthers(event.target.checked)} />Sign out of other devices too</label>
      {googleOnly && <button className="settings-password-reset" type="button" disabled={busy || Boolean(resetNotice)} onClick={sendResetLink}>Email me a reset link instead</button>}
      {resetNotice && <p role="status" className="settings-password-reset-notice">{resetNotice}</p>}{formError && <p role="alert" className="settings-security-error">{formError}</p>}
    </form>}
  </SettingsDialog>;
}
