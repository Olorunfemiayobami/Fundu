"use client";

import { useState } from "react";
import ActionDialog from "@/components/feedback/ActionDialog";
import { supabase } from "@/lib/supabase";

const reasons = ["Misleading or false information", "Fraud or scam", "Impersonation", "Inappropriate content", "Receiving information issue", "Other"];

export default function ReportCampaignDialog({ open, campaignId, onClose }) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function close() {
    if (busy) return;
    onClose();
    setTimeout(() => { setReason(""); setDetails(""); setError(""); setSent(false); }, 0);
  }

  async function submit() {
    if (!reason || busy) return;
    setBusy(true); setError("");
    try {
      const session = await supabase.auth.getSession().catch(() => ({ data: { session: null } }));
      const token = session.data?.session?.access_token;
      const response = await fetch("/api/reports", { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ campaignId, reason, details }) });
      if (!response.ok) throw new Error("Report submission failed");
      setSent(true);
    } catch (failure) { console.error("Campaign report failed:", failure); setError("We couldn't send your report. Try again."); }
    finally { setBusy(false); }
  }

  return <ActionDialog open={open} onClose={close} busy={busy} title={sent ? "Report submitted" : "Report this campaign"} description={sent ? undefined : "Tell us what doesn't look right. Your report will help us review this campaign."} icon={sent ? "ccircle" : "flag"} tone={sent ? "success" : "warning"} error={error} success={sent} safeLabel="Cancel" actionLabel={sent ? "Done" : "Submit report"} busyLabel="Sending report…" actionDisabled={!sent && !reason} onAction={sent ? close : submit}>
    {sent ? <p className="report-dialog-sent">Thanks for letting us know. We&apos;ll review it.</p> : <div className="report-dialog-fields">
      <fieldset disabled={busy}><legend>Reason</legend>{reasons.map(option => <label className={`report-reason${reason === option ? " report-reason--selected" : ""}`} key={option}><input type="radio" name="report-reason" value={option} checked={reason === option} onChange={() => setReason(option)} />{option}</label>)}</fieldset>
      <label className="report-details">Tell us more <span>(optional)</span><textarea rows={3} maxLength={2000} value={details} disabled={busy} onChange={event => setDetails(event.target.value)} placeholder="What did you notice?" /></label>
    </div>}
  </ActionDialog>;
}
