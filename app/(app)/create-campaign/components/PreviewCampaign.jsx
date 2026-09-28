"use client";

import { useEffect, useState } from "react";
import { StoryBlocks, CampaignCover, CampaignFundingProgress } from "@/components/campaigns/PublicCampaignContent";
import { supabase } from "@/lib/supabase";
import { PreviewTips } from "./CreateCampaignLayout";
import "@/app/campaign/[id]/campaign-public.css";

export default function PreviewCampaign({ campaignData, blocks = [], campaignId, creatorProfile, onEditStep, onNext, onBack, isSaving }) {
  const [mode, setMode] = useState("desktop");
  const [failedCover, setFailedCover] = useState(null);
  const [bank, setBank] = useState(null);
  const [bankState, setBankState] = useState(campaignId ? "loading" : "ready");
  const [bankRetry, setBankRetry] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function loadBank() {
      if (!campaignId) {
        if (!cancelled) { setBank(null); setBankState("ready"); }
        return;
      }
      setBankState("loading");
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;
        if (!user) throw new Error("Sign in to check your bank account.");
        const { data, error } = await supabase.from("campaign_bank_accounts")
          .select("account_holder_name,account_number,bank_name")
          .eq("campaign_id", campaignId).eq("user_id", user.id).eq("is_active", true).maybeSingle();
        if (error) throw error;
        if (!cancelled) { setBank(data); setBankState("ready"); }
      } catch {
        if (!cancelled) { setBank(null); setBankState("error"); }
      }
    }
    loadBank();
    return () => { cancelled = true; };
  }, [campaignId, bankRetry]);

  const title = campaignData.title?.trim() || "Untitled campaign";
  const organizer = campaignData.organiser?.trim() || creatorProfile?.name || "Organizer";
  const initials = organizer.split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase();
  const goal = Number(String(campaignData.goal || "0").replace(/,/g, "")) || 0;
  const cover = campaignData.imagePreview || campaignData.cover_image || campaignData.image_url || campaignData.preview_image || campaignData.coverImage || "";
  const end = campaignData.duration ? new Date(`${campaignData.duration}T00:00:00+01:00`) : null;
  const validEnd = end && !Number.isNaN(end.getTime());
  const date = validEnd ? end.toLocaleDateString("en-NG", { timeZone: "Africa/Lagos", day: "numeric", month: "short", year: "numeric" }) : "";
  const days = validEnd ? Math.max(0, Math.ceil((end.getTime() - Date.now()) / 86400000)) : null;
  const checks = [
    { text: "Title, goal and end date", done: Boolean(campaignData.title?.trim() && goal > 0 && validEnd), step: 1 },
    { text: "Cover image", done: Boolean(cover), step: 1 },
    { text: `Story with ${blocks.length} ${blocks.length === 1 ? "block" : "blocks"}`, done: blocks.some(block => block.content?.trim() || block.media?.length || block.url?.trim()), step: 2 },
    { text: bankState === "loading" ? "Checking bank account…" : bankState === "error" ? "Couldn't check bank account" : "Bank account", done: Boolean(bank), step: 4 },
  ];

  return <section className="cw-preview">
    <div className="cw-preview-heading"><div><h2>Preview your page</h2><p>This is what supporters will see when you share your link.</p></div>
      <div className="cw-preview-switch" role="group" aria-label="Preview size">
        <button type="button" aria-pressed={mode === "desktop"} onClick={() => setMode("desktop")}>▱ Desktop</button>
        <button type="button" aria-pressed={mode === "mobile"} onClick={() => setMode("mobile")}>▯ Mobile</button>
      </div>
    </div>
    <div className="cw-preview-columns"><div className="cw-preview-main">
      <div className={`cw-preview-browser cw-preview--${mode}`}>
        <div className="cw-preview-browser-bar"><span className="cw-preview-dots" aria-hidden="true">● ● ●</span><span className="cw-preview-address">fundu-jade.vercel.app/campaign/{campaignId || "…"}</span><span className="cw-preview-mobile-label">◉ Supporters will see this</span></div>
        <div className="pc-page cw-preview-public"><div className="pc-grid">
          <header className="pc-title"><span className="pc-category">{campaignData.category || "Campaign"}</span><h1>{title}</h1><div className="pc-organizer"><span className="pc-avatar" aria-hidden="true">{initials}</span><div><strong>{organizer} is organizing this fundraiser</strong><p>Not published yet. {date ? `Ends ${date}.` : "No end date."}</p></div></div></header>
          <CampaignCover src={failedCover !== cover ? cover : null} title={title} onError={() => setFailedCover(cover)} />
          <aside className="pc-support" aria-label="Preview fundraising details"><CampaignFundingProgress amountRaised={0} goalAmount={goal} percentage={0} statusText={days === null ? "No end date" : `${days} ${days === 1 ? "day" : "days"} left`} />
            {bankState === "loading" ? <p className="cw-preview-bank-status" role="status">Checking bank details…</p> : bankState === "error" ? <div className="cw-preview-bank-placeholder"><strong>Couldn&apos;t load bank details</strong><button type="button" onClick={() => setBankRetry(value => value + 1)}>Retry</button></div> : bank ? <div className="pc-bank">{[["Account number", bank.account_number], ["Account name", bank.account_holder_name], ["Bank", bank.bank_name]].map(([label, value]) => <div className="cw-preview-bank-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div> : <div className="cw-preview-bank-placeholder"><strong>Bank details will show here</strong><p>Add a bank account in the next step so supporters know where to send money.</p></div>}
          </aside>
          <section className="pc-section pc-about"><h2>About this campaign</h2><StoryBlocks blocks={blocks} fallbackText={campaignData.shortDescription} /></section>
        </div></div>
      </div>
    </div><aside className="cw-preview-checks"><section className="cw-quick-check"><h2>Quick check</h2><ul>{checks.map((check, index) => <li key={index}><span className={check.done ? "cw-check--done" : "cw-check--missing"} aria-label={check.done ? "Complete" : "Incomplete"}>{check.done ? "✓" : "×"}</span><span>{check.text}</span><button type="button" disabled={isSaving || (index === 3 && bankState === "loading")} onClick={() => onEditStep(check.step)}>{check.step === 4 ? bank ? "Edit" : "Add in next step" : "Edit"}</button></li>)}</ul>{bankState === "error" && <button type="button" onClick={() => setBankRetry(value => value + 1)}>Retry bank check</button>}</section><PreviewTips /></aside></div>
    <div className="campaign-bottom-actions"><div className="campaign-bottom-actions__right"><button type="button" className="campaign-action-secondary" aria-label="Back to story" disabled={isSaving} onClick={onBack}>← Back to story</button><button type="button" className="campaign-action-primary" disabled={isSaving} onClick={onNext}>Continue to publish</button></div></div>
  </section>;
}
