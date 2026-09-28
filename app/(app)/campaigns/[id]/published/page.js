"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import CampaignStorageImage from "@/components/campaigns/CampaignStorageImage";
import { ActionIcon } from "@/components/feedback/ActionDialog";
import "@/styles/published-campaign.css";

export default function PublishedCampaignPage() {
  const { id } = useParams();
  const router = useRouter();
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [shareOptions, setShareOptions] = useState(false);
  const timer = useRef(null);
  const link = typeof window === "undefined" ? "" : `${window.location.origin}/campaign/${id}`;

  useEffect(() => {
    let live = true;
    async function load() {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth?.user) return;
      const { data, error: loadError } = await supabase.from("campaigns").select("*").eq("id", id).eq("creator_id", auth.user.id).maybeSingle();
      if (!live) return;
      if (loadError) { console.error("Could not load published campaign:", loadError); setError("We couldn't load this campaign. Try again."); return; }
      if (!data || data.status !== "active") { router.replace(`/campaigns/${id}`); return; }
      setCampaign(data);
    }
    load();
    return () => { live = false; clearTimeout(timer.current); };
  }, [id, router]);

  async function copyLink() {
    try { await navigator.clipboard.writeText(link); setCopied(true); clearTimeout(timer.current); timer.current = setTimeout(() => setCopied(false), 2000); }
    catch { setError("Couldn't copy the link. You can select it in the box instead."); }
  }
  async function share() {
    if (navigator.share) {
      try { await navigator.share({ title: campaign.title || "Fundu campaign", url: link }); }
      catch (cause) { if (cause?.name !== "AbortError") setShareOptions(true); }
    } else setShareOptions(current => !current);
  }

  if (error && !campaign) return <div className="published-load-error" role="alert">{error} <button type="button" onClick={() => window.location.reload()}>Retry</button></div>;
  if (!campaign) return <div className="published-loading" role="status">Loading campaign…</div>;
  const publicCampaign = campaign.is_public !== false;
  const image = campaign.image_url || campaign.cover_image || campaign.preview_image;
  return <div className="published-page"><section className="published-card">
    <div className="published-icon"><ActionIcon name="ccircle" /></div>
    <h1>Your campaign is published</h1><p className="published-intro">Share the link so people can see your story and support you.</p>
    <div className="published-preview">{image && <CampaignStorageImage src={image} alt={`${campaign.title} cover`} />}<div><h2>{campaign.title}</h2><p><ActionIcon name={publicCampaign ? "globe" : "lock"} /><span><strong>{publicCampaign ? "Public." : "Private."}</strong> {publicCampaign ? "Listed on Explore, and anyone with the link can view it." : "Hidden from Explore. Anyone with the link can view it."}</span></p></div></div>
    <label className="published-link-label" htmlFor="published-link">Campaign link</label><div className="published-link-row"><input id="published-link" readOnly value={link} onFocus={event => event.target.select()} /><button type="button" className={`published-copy${copied ? " published-copy--done" : ""}`} onClick={copyLink}><ActionIcon name={copied ? "check" : "copy"} />{copied ? "Copied" : "Copy link"}</button></div><span className="published-live" aria-live="polite">{copied ? "Campaign link copied" : ""}</span>
    {error && <p className="published-error" role="alert">{error}</p>}
    <div className="published-actions"><button type="button" className="published-primary" onClick={share}><ActionIcon name="share" />Share campaign</button><a href={link} target="_blank" rel="noopener noreferrer"><ActionIcon name="ext" />View public page</a><Link href={`/campaigns/${id}`}>Manage campaign</Link></div>
    {shareOptions && <div className="published-share-fallback"><a href={`https://wa.me/?text=${encodeURIComponent(link)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a><a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`} target="_blank" rel="noopener noreferrer">X</a><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`} target="_blank" rel="noopener noreferrer">Facebook</a><button type="button" onClick={copyLink}>Copy link</button></div>}
  </section></div>;
}
