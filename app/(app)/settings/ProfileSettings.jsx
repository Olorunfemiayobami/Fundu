"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProfileSavedView from "./ProfileSavedView";

const BIO_LIMIT = 300;
const regions = "AF AL DZ AS AD AO AI AQ AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BA BW BR BN BG BF BI CV KH CM CA KY CF TD CL CN CO KM CG CD CR CI HR CU CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF GA GM GE DE GH GI GR GL GD GP GU GT GN GW GY HT HN HK HU IS IN ID IR IQ IE IL IT JM JP JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG MK MP NO OM PK PW PS PA PG PY PE PH PL PT PR QA RE RO RU RW KN LC VC WS SM ST SA SN RS SC SL SG SK SI SB SO ZA SS ES LK SD SR SE CH SY TW TJ TZ TH TL TG TO TT TN TR TM TC TV UG UA AE GB US UY UZ VU VA VE VN VG VI YE ZM ZW".split(" ");
const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
const countries = regions.map((code) => countryNames.of(code)).sort((a, b) => a.localeCompare(b, "en"));

export default function ProfileSettings({ authUser, profile, campaignCount, onSaved }) {
  const [editing, setEditing] = useState(false);
  const [focusBio, setFocusBio] = useState(false);
  const [notice, setNotice] = useState("");
  const returnFocus = useRef(null);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 5000);
    return () => clearTimeout(timer);
  }, [notice]);

  function finishEditing() {
    setEditing(false);
    requestAnimationFrame(() => (document.querySelector(returnFocus.current || ".settings-profile-edit") || document.querySelector(".settings-profile-edit"))?.focus());
  }

  if (editing) return <ProfileEditor authUser={authUser} profile={profile} focusBio={focusBio} onCancel={finishEditing} onSaved={(updates, user) => { onSaved(updates, user); setNotice("Profile saved"); finishEditing(); }} />;

  return <><div className="settings-profile-notice" role="status">{notice}</div><ProfileSavedView authUser={authUser} profile={profile} campaignCount={campaignCount} onEdit={() => { returnFocus.current = ".settings-profile-edit"; setFocusBio(false); setEditing(true); }} onAddBio={() => { returnFocus.current = ".settings-profile-add-bio"; setFocusBio(true); setEditing(true); }} /></>;
}

function ProfileEditor({ authUser, profile, focusBio, onCancel, onSaved }) {
  const router = useRouter();
  const initial = useRef({ fullName: profile?.full_name || "", displayName: profile?.display_name || "", country: profile?.country || "", bio: profile?.bio || "", avatarUrl: profile?.avatar_url || "" }).current;
  const [form, setForm] = useState(initial);
  const [photoFile, setPhotoFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [discard, setDiscard] = useState(null);
  const fileInput = useRef(null);
  const fullNameInput = useRef(null);
  const bioInput = useRef(null);
  const blobUrl = useRef(null);
  const uploadedPhoto = useRef(null);
  const bypassGuard = useRef(false);
  const dirty = Object.keys(initial).some((key) => initial[key] !== form[key]) || Boolean(photoFile);
  const valid = Boolean(form.fullName.trim()) && form.bio.length <= BIO_LIMIT;
  const busy = saving;

  useEffect(() => {
    (focusBio ? bioInput : fullNameInput).current?.focus();
    return () => { if (blobUrl.current) URL.revokeObjectURL(blobUrl.current); };
  }, [focusBio]);

  useEffect(() => {
    if (!dirty && !busy) return;
    const currentUrl = location.href;
    const currentState = history.state;
    function leave(event) {
      if (bypassGuard.current) return;
      event.preventDefault();
      event.returnValue = "";
    }
    function navigate(event) {
      if (bypassGuard.current || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.href === location.href || (url.pathname === location.pathname && url.search === location.search && url.hash)) return;
      event.preventDefault();
      event.stopPropagation();
      if (busy) return;
      setDiscard({ href: url.href, local: url.origin === location.origin });
    }
    function back(event) {
      if (bypassGuard.current || location.href === currentUrl) return;
      const targetUrl = location.href;
      event.stopImmediatePropagation();
      history.pushState(currentState, "", currentUrl);
      if (!busy) setDiscard({ href: targetUrl, local: true });
    }
    function blockLogout(event) {
      const logoutButton = event.target.closest?.(".settings-logout-btn, button.app-sidebar__profile-menu-item");
      if (!logoutButton || bypassGuard.current) return;
      event.preventDefault(); event.stopPropagation();
      if (!busy) setDiscard({ logout: logoutButton });
    }
    window.addEventListener("beforeunload", leave);
    window.addEventListener("popstate", back, true);
    document.addEventListener("click", navigate, true);
    document.addEventListener("click", blockLogout, true);
    return () => { window.removeEventListener("beforeunload", leave); window.removeEventListener("popstate", back, true); document.removeEventListener("click", navigate, true); document.removeEventListener("click", blockLogout, true); };
  }, [dirty, busy]);

  function change(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
  }
  function cancel() { if (busy) return; if (dirty) setDiscard({ cancel: true }); else onCancel(); }
  function choosePhoto(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { setPhotoError("Choose a JPG, PNG or WEBP image."); return; }
    if (file.size > 5 * 1024 * 1024) { setPhotoError("Choose an image up to 5 MB."); return; }
    if (blobUrl.current) URL.revokeObjectURL(blobUrl.current);
    blobUrl.current = URL.createObjectURL(file);
    uploadedPhoto.current = null;
    setPhotoFile(file);
    setForm((current) => ({ ...current, avatarUrl: blobUrl.current }));
    setPhotoError(""); setError("");
  }
  function removePhoto() {
    if (blobUrl.current) URL.revokeObjectURL(blobUrl.current);
    blobUrl.current = null; uploadedPhoto.current = null;
    setPhotoFile(null); setForm((current) => ({ ...current, avatarUrl: "" })); setPhotoError("");
  }
  async function save(event) {
    event.preventDefault();
    if (!dirty || !valid || busy) return;
    setSaving(true); setError("");
    try {
      let avatarUrl = form.avatarUrl;
      if (photoFile) {
        if (!uploadedPhoto.current) {
          const extension = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[photoFile.type];
          const filePath = `${authUser.id}/${crypto.randomUUID()}.${extension}`;
          const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, photoFile, { upsert: false, contentType: photoFile.type });
          if (uploadError) throw new Error("Your photo couldn’t be uploaded. Please try saving again.");
          const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
          uploadedPhoto.current = data.publicUrl;
        }
        avatarUrl = uploadedPhoto.current;
      }
      const updates = { full_name: form.fullName.trim(), display_name: form.displayName.trim() || null, bio: form.bio.trim() || null, country: form.country.trim() || null, avatar_url: avatarUrl || null, updated_at: new Date().toISOString() };
      const { error: profileError } = await supabase.from("users").update(updates).eq("id", authUser.id);
      if (profileError) throw new Error("Your profile couldn’t be saved. Please try again.");
      const metadata = { full_name: updates.full_name, display_name: updates.display_name, bio: updates.bio, country: updates.country, avatar_url: updates.avatar_url };
      const { data, error: authError } = await supabase.auth.updateUser({ data: metadata });
      if (authError) throw new Error("Your profile was saved, but account details couldn’t be synced. Please try saving again.");
      bypassGuard.current = true;
      onSaved(updates, data?.user);
    } catch (failure) { setError(failure.message || "Your profile couldn’t be saved. Please try again."); }
    finally { setSaving(false); }
  }
  function confirmDiscard() {
    bypassGuard.current = true;
    if (discard.cancel) { onCancel(); return; }
    if (discard.logout) { discard.logout.click(); return; }
    if (discard.local) router.push(new URL(discard.href).pathname + new URL(discard.href).search + new URL(discard.href).hash);
    else location.assign(discard.href);
  }
  const initials = (form.fullName || "User").trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  return (
    <section className="settings-panel settings-profile-editor" aria-labelledby="settings-editor-heading">
      <header className="settings-editor-mobile-header"><button type="button" onClick={cancel} disabled={busy} aria-label="Cancel editing profile">×</button><h1>Edit profile</h1><span /></header>
      <div className="settings-panel-header"><div><h2 id="settings-editor-heading">Edit profile</h2><p>Changes show on your campaigns as soon as you save.</p></div></div>
      <form onSubmit={save}>
        <fieldset disabled={busy}>
          <div className="settings-editor-photo-row"><span className="settings-profile-photo">{form.avatarUrl ? <img src={form.avatarUrl} alt="Profile preview" /> : <span>{initials}</span>}</span><div><div className="settings-editor-photo-actions"><button className="settings-outline-btn" type="button" onClick={() => fileInput.current?.click()}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 16V3m-5 5 5-5 5 5M5 17v4h14v-4" /></svg> Change photo</button><button className="settings-editor-remove" type="button" onClick={removePhoto} disabled={!form.avatarUrl}>Remove</button></div><p id="settings-photo-help">JPG, PNG or WEBP, up to 5 MB.</p><input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={choosePhoto} hidden aria-label="Choose profile photo" aria-describedby="settings-photo-help settings-photo-error" />{photoError && <p id="settings-photo-error" className="settings-editor-error" role="alert">{photoError}</p>}</div></div>
          <div className="settings-editor-grid">
            <label className="settings-field"><span>Full name</span><input ref={fullNameInput} name="fullName" value={form.fullName} onChange={change} required autoComplete="name" /></label>
            <label className="settings-field"><span>Display name <span className="settings-editor-optional">(optional)</span></span><input name="displayName" value={form.displayName} onChange={change} aria-describedby="settings-display-help" /><small id="settings-display-help">Used in greetings, like “Good afternoon, {form.displayName.trim() || form.fullName.trim().split(/\s+/)[0] || "there"}”.</small></label>
            <label className="settings-field"><span>Email</span><span className="settings-editor-email"><input name="email" value={authUser?.email || profile?.email || ""} readOnly aria-describedby="settings-email-help" /><span aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 10h14v12H5zM8 10V6a4 4 0 0 1 8 0v4" /></svg></span></span><small id="settings-email-help">Used to sign in. It isn’t shown on your campaigns.</small></label>
            <label className="settings-field"><span>Country</span><select name="country" value={form.country} onChange={change}><option value="">Choose your country</option>{form.country && !countries.includes(form.country) && <option value={form.country}>{form.country}</option>}{countries.map((country) => <option key={country} value={country}>{country}</option>)}</select></label>
            <label className="settings-field settings-editor-bio"><span>Bio <span className="settings-editor-optional">(optional)</span></span><textarea ref={bioInput} name="bio" value={form.bio} onChange={change} rows={4} maxLength={Math.max(BIO_LIMIT, initial.bio.length)} aria-describedby="settings-bio-count" aria-invalid={form.bio.length > BIO_LIMIT || undefined} placeholder="A line or two about you. Supporters may see this on your campaigns." /><small id="settings-bio-count" className={form.bio.length > BIO_LIMIT ? "settings-editor-error" : undefined}>{form.bio.length} of {BIO_LIMIT} characters.{form.bio.length > BIO_LIMIT && " Shorten your bio to save."}</small></label>
          </div>
          <p className="settings-info-note">ⓘ Your name, photo and bio can appear on your public campaign pages as the organizer.</p>
          {error && <p className="settings-editor-error" role="alert">{error}</p>}
        </fieldset>
        <footer className="settings-editor-savebar">{dirty && <span className="settings-editor-dirty">● Unsaved changes</span>}<button className="settings-outline-btn" type="button" onClick={cancel} disabled={busy}>Cancel</button><button className="settings-primary-btn" type="submit" disabled={!dirty || !valid || busy}>{saving ? "Saving…" : "Save changes"}</button></footer>
      </form>
      {discard && <DiscardChangesDialog onKeep={() => setDiscard(null)} onDiscard={confirmDiscard} />}
    </section>
  );
}

function DiscardChangesDialog({ onKeep, onDiscard }) {
  const dialog = useRef(null);
  const keep = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    keep.current?.focus();
    function keydown(event) {
      if (event.key === "Escape") { event.preventDefault(); onKeep(); }
      if (event.key === "Tab") {
        const buttons = dialog.current?.querySelectorAll("button");
        if (!buttons?.length) return;
        if (event.shiftKey && document.activeElement === buttons[0]) { event.preventDefault(); buttons[buttons.length - 1].focus(); }
        else if (!event.shiftKey && document.activeElement === buttons[buttons.length - 1]) { event.preventDefault(); buttons[0].focus(); }
      }
    }
    function focus(event) { if (!dialog.current?.contains(event.target)) keep.current?.focus(); }
    document.addEventListener("keydown", keydown); document.addEventListener("focusin", focus);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", keydown); document.removeEventListener("focusin", focus); if (previous?.isConnected) previous.focus(); };
  }, [onKeep]);
  return <div className="settings-discard-overlay"><div ref={dialog} className="settings-discard-dialog" role="dialog" aria-modal="true" aria-labelledby="settings-discard-title" aria-describedby="settings-discard-copy"><h2 id="settings-discard-title">Discard your changes?</h2><p id="settings-discard-copy">Your unsaved profile changes will be lost.</p><div><button ref={keep} className="settings-outline-btn" type="button" onClick={onKeep}>Keep editing</button><button className="settings-primary-btn" type="button" onClick={onDiscard}>Discard changes</button></div></div></div>;
}

