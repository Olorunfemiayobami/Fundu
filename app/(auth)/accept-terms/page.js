"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { legalAcceptanceRequest } from "@/lib/legalAcceptanceClient";
import { TERMS_VERSION } from "@/lib/legalVersion";
import { supabase } from "@/lib/supabase";
import "@/styles/auth.css";

export default function AcceptTermsPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active && !data.session) router.replace("/signin");
    });
    return () => { active = false; };
  }, [router]);

  async function submit(event) {
    event.preventDefault();
    if (!accepted) {
      setError("Accept the Terms to continue.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await legalAcceptanceRequest("POST", { context: "signup" });
      router.replace("/dashboard");
      router.refresh();
    } catch (cause) {
      setError(cause.message || "Could not save your acceptance. Please try again.");
      setBusy(false);
    }
  }

  return <main className="auth auth-route is-open"><div className="authbg"><div className="authbg__fallback" /><div className="authbg__scrim" /></div><section className="auth-consent-page"><h1>Before you continue</h1><p>Read the current Fundu Terms of Service and Privacy Policy.</p><p>Terms version {TERMS_VERSION}</p><form onSubmit={submit} className="auth-consent"><label><input type="checkbox" checked={accepted} onChange={event => setAccepted(event.target.checked)} /> I agree to Fundu&apos;s <Link href="/terms" target="_blank">Terms of Service</Link> and acknowledge the <Link href="/privacy" target="_blank">Privacy Policy</Link>.</label>{error && <p role="alert" className="auth-consent-error">{error}</p>}<button className="btn btn--primary authsubmit" type="submit" disabled={busy || !accepted}>{busy ? "Saving…" : "Continue to Fundu"}</button></form></section></main>;
}
