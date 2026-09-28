"use client";

import LoadingScreen, { NotFoundScreen } from "@/components/feedback/LoadingScreen";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import CampaignStorageImage from "@/components/campaigns/CampaignStorageImage";
import ReportCampaignDialog from "@/components/campaigns/ReportCampaignDialog";
import { ActionIcon } from "@/components/feedback/ActionDialog";
import { StoryBlocks, CampaignCover, CampaignFundingProgress } from "@/components/campaigns/PublicCampaignContent";
import "./campaign-public.css";

export default function PublicCampaignPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params?.id;

  const [viewer, setViewer] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const [campaign, setCampaign] = useState(null);
  const [creator, setCreator] = useState(null);
  const [category, setCategory] = useState(null);
  const [bankAccount, setBankAccount] = useState(null);

  const [campaignUpdates, setCampaignUpdates] = useState([]);
  const [updatesError, setUpdatesError] = useState("");

  const [comments, setComments] = useState([]);
  const [commentUsers, setCommentUsers] = useState({});
  const [commentText, setCommentText] = useState("");
  const [postingComment, setPostingComment] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [reportOpen, setReportOpen] = useState(false);

  const [viewerProfile, setViewerProfile] = useState(null);
  const [commentsError, setCommentsError] = useState("");
  const [failedCover, setFailedCover] = useState(null);
  const [viewingPhoto, setViewingPhoto] = useState(null);
  const [supportVisible, setSupportVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const [clockNow, setClockNow] = useState(Date.now());
  const supportRef = useRef(null);
  const photoDialogRef = useRef(null);
  const photoTriggerRef = useRef(null);
  const copyTimerRef = useRef(null);
  const loadRequestRef = useRef(0);

  useEffect(() => {
    const timer = window.setInterval(() => setClockNow(Date.now()), 30000);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(copyTimerRef.current);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setViewerProfile(null);
    if (!viewer?.id) return;
    supabase
      .from("users")
      .select("id, display_name, full_name, avatar_url")
      .eq("id", viewer.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setViewerProfile(data || null);
      });
    return () => {
      cancelled = true;
    };
  }, [viewer?.id]);

  function openPhoto(url, alt = "Campaign photo") {
    photoTriggerRef.current = document.activeElement;
    setViewingPhoto({ url, alt });
  }

  useEffect(() => {
    if (!viewingPhoto) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = photoDialogRef.current;
    const closeButton = dialog?.querySelector("button");
    closeButton?.focus();
    function onKey(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setViewingPhoto(null);
      }
      if (event.key === "Tab") {
        event.preventDefault();
        closeButton?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      if (photoTriggerRef.current?.isConnected) photoTriggerRef.current.focus();
    };
  }, [viewingPhoto]);

  /* CHECK WHETHER VIEWER IS LOGGED IN */

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;

      setViewer(user || null);
      setAuthChecked(true);
    }

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setViewer(session?.user || null);
      setAuthChecked(true);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  /* LOAD CAMPAIGN — existing tables and public access rules */
  useEffect(() => {
    if (!campaignId || !authChecked) return;
    loadCampaignPage();
    return () => {
      loadRequestRef.current += 1;
    };
  }, [campaignId, authChecked, viewer?.id]);

  async function loadCampaignPage() {
    const request = ++loadRequestRef.current;
    setLoading(true);
    setLoadError("");
    setCampaign(null);
    setBankAccount(null);
    setCommentsError("");
    setUpdatesError("");
    try {
      let { data: row, error } = await supabase
        .from("campaigns")
        .select("*")
        .eq("id", campaignId)
        .in("status", ["active", "ended"])
        .maybeSingle();
      if (error) throw error;
      const previewRequested =
        new URLSearchParams(window.location.search).get("preview") === "true";
      if (!row && viewer?.id && previewRequested) {
        const result = await supabase
          .from("campaigns")
          .select("*")
          .eq("id", campaignId)
          .eq("creator_id", viewer.id)
          .eq("status", "draft")
          .maybeSingle();
        if (result.error) throw result.error;
        row = result.data;
      }
      if (!row)
        throw new Error(
          "This campaign could not be found or is not publicly available.",
        );
      const ended = campaignHasEnded(row, Date.now());
      const results = await Promise.all([
        row.creator_id
          ? supabase
              .from("users")
              .select("id, full_name, display_name, avatar_url")
              .eq("id", row.creator_id)
              .maybeSingle()
          : Promise.resolve({ data: null }),
        row.category_id
          ? supabase
              .from("categories")
              .select("id, name, slug")
              .eq("id", row.category_id)
              .maybeSingle()
          : Promise.resolve({ data: null }),
        !ended && row.status === "active"
          ? supabase
              .from("campaign_bank_accounts")
              .select(
                "id, campaign_id, user_id, account_holder_name, account_number, bank_name, is_active",
              )
              .eq("campaign_id", row.id)
              .eq("is_active", true)
              .order("updated_at", { ascending: false })
              .limit(1)
          : Promise.resolve({ data: [] }),
        supabase
          .from("campaign_updates")
          .select("id, title, content, image_urls, is_final_update, created_at")
          .eq("campaign_id", row.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("comments")
          .select("id, campaign_id, user_id, content, created_at")
          .eq("campaign_id", row.id)
          .order("created_at", { ascending: true }),
      ]);
      const [
        creatorResult,
        categoryResult,
        bankResult,
        updateResult,
        commentResult,
      ] = results;
      const safeComments = commentResult.error ? [] : commentResult.data || [];
      const ids = [
        ...new Set(
          safeComments.map((comment) => comment.user_id).filter(Boolean),
        ),
      ];
      let authors = [];
      if (ids.length) {
        const result = await supabase
          .from("users")
          .select("id, full_name, display_name, avatar_url")
          .in("id", ids);
        if (!result.error) authors = result.data || [];
      }
      if (request !== loadRequestRef.current) return;
      setCampaign(row);
      setCreator(creatorResult.data || null);
      setCategory(categoryResult.data || null);
      setBankAccount(bankResult.data?.[0] || null);
      setCampaignUpdates(updateResult.error ? [] : updateResult.data || []);
      setUpdatesError(
        updateResult.error
          ? "We couldn't load updates. Refresh the page to try again."
          : "",
      );
      setComments(safeComments);
      setCommentsError(
        commentResult.error
          ? "We couldn't load words of support. Refresh the page to try again."
          : "",
      );
      setCommentUsers(
        Object.fromEntries(authors.map((author) => [author.id, author])),
      );
      for (const result of results)
        if (result.error)
          console.error("Campaign detail data error:", result.error);
    } catch (error) {
      if (request === loadRequestRef.current)
        setLoadError(
          error?.message || "We couldn't load this campaign right now.",
        );
    } finally {
      if (request === loadRequestRef.current) setLoading(false);
    }
  }

  /* STORY */

  const storyBlocks = useMemo(() => {
    if (!campaign?.story_blocks) return [];

    if (Array.isArray(campaign.story_blocks)) {
      return campaign.story_blocks;
    }

    if (typeof campaign.story_blocks === "string") {
      try {
        const parsed = JSON.parse(campaign.story_blocks);

        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }

    return [];
  }, [campaign]);

  /* CALCULATED VALUES */

  const organizerName =
    creator?.display_name || creator?.full_name || "Campaign Organizer";

  const organizerInitials = getInitials(organizerName);

  const coverImage =
    campaign?.cover_image ||
    campaign?.image_url ||
    campaign?.preview_image ||
    "";

  const amountRaised = Math.max(0, Number(campaign?.amount_raised) || 0);

  const goalAmount = Math.max(0, Number(campaign?.goal_amount) || 0);

  const progressPercentage =
    goalAmount > 0
      ? Math.min(100, Math.round((amountRaised / goalAmount) * 100))
      : 0;

  const daysRemaining = getDaysRemaining(campaign?.end_date, clockNow);

  const isCampaignEnded = campaignHasEnded(campaign, clockNow);

  const isCampaignOwner =
    Boolean(viewer?.id) && viewer.id === campaign?.creator_id;

  useEffect(() => {
    if (loading || !supportRef.current) return;
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSupportVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(supportRef.current);
    return () => observer.disconnect();
  }, [loading, campaign?.id, isCampaignEnded]);

  useEffect(() => {
    if (loading || !campaign) return;
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -55% 0px", threshold: 0 },
    );
    for (const id of ["about", "updates", "comments"]) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [loading, campaign?.id]);

  /* COPY */

  async function copyText(value, label = "Copied") {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(String(value));

      setCopyMessage(label);

      window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => {
        setCopyMessage("");
      }, 1800);
    } catch {
      window.prompt("Copy this:", value);
    }
  }

  async function copyCampaignLink() {
    await copyText(
      `${window.location.origin}/campaign/${campaignId}`,
      "Campaign link copied",
    );
  }

  /* SHARE */

  async function shareCampaign() {
    const url = `${window.location.origin}/campaign/${campaignId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: campaign?.title || "Fundu campaign",
          text: campaign?.title
            ? `Support ${campaign.title} on Fundu`
            : "Support this campaign on Fundu",
          url,
        });

        return;
      } catch (error) {
        if (error?.name === "AbortError") {
          return;
        }
      }
    }

    await copyCampaignLink();
  }

  function shareTo(platform) {
    const url = encodeURIComponent(
      `${window.location.origin}/campaign/${campaignId}`,
    );

    const text = encodeURIComponent(
      campaign?.title
        ? `Support ${campaign.title} on Fundu`
        : "Support this campaign on Fundu",
    );

    const links = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    };

    if (platform === "copy") {
      copyCampaignLink();
      return;
    }

    window.open(links[platform], "_blank", "noopener,noreferrer");
  }

  /* COMMENTS */

  async function postComment() {
    if (!viewer) {
      router.push(`/signin?redirect=/campaign/${campaignId}`);
      return;
    }

    const content = commentText.trim();

    if (!content || postingComment) {
      return;
    }

    setPostingComment(true);

    try {
      /*
       * The database function creates the comment,
       * records the commenter's activity, and notifies
       * the campaign owner where applicable.
       */

      const { data, error } = await supabase.rpc("post_campaign_comment", {
        p_campaign_id: campaignId,
        p_content: content,
      });

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error("The comment could not be created.");
      }

      const newComment = Array.isArray(data) ? data[0] : data;

      if (!newComment?.id) {
        throw new Error("The new comment could not be loaded.");
      }

      setComments((current) => [...current, newComment]);
      setCommentText("");

      if (!commentUsers[viewer.id]) {
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select(
            `
              id,
              full_name,
              display_name,
              avatar_url
            `,
          )
          .eq("id", viewer.id)
          .maybeSingle();

        if (profileError) {
          console.error("Comment profile load error:", profileError);
        }

        if (profile) {
          setCommentUsers((current) => ({
            ...current,
            [viewer.id]: profile,
          }));
        }
      }

      if (typeof window !== "undefined" && isCampaignOwner) {
        window.dispatchEvent(new CustomEvent("fundu:activity-updated"));
      }
    } catch (error) {
      console.error("Post comment error:", error);

      alert(
        error?.message || "Your comment could not be posted. Please try again.",
      );
    } finally {
      setPostingComment(false);
    }
  }

  /* LOADING */

  if (!authChecked || loading) {
    return (
      <LoadingScreen variant="detail" label="Loading campaign" />
    );
  }

  /* ERROR */

  if (loadError === "This campaign could not be found or is not publicly available.") {
    return <NotFoundScreen homeHref={viewer ? "/dashboard" : "/"} exploreHref={viewer ? "/explore" : "/webexplore"} />;
  }

  if (loadError || !campaign) {
    return (
      <div className="public-campaign-error-page">
        <h1>Campaign unavailable</h1>

        <p>{loadError || "This campaign is unavailable."}</p>

        <Link href={viewer ? "/explore" : "/"}>Go back</Link>
      </div>
    );
  }

  /* PUBLIC CAMPAIGN */
  const viewerName =
    viewerProfile?.display_name ||
    viewerProfile?.full_name ||
    viewer?.user_metadata?.full_name ||
    "Fundu supporter";
  const viewerAvatar =
    viewerProfile?.avatar_url || viewer?.user_metadata?.avatar_url || "";
  const preview = campaign.status === "draft" && isCampaignOwner;
  return (
    <div
      className={`pc-page ${viewer ? "pc-page--signed-in" : "pc-page--visitor"}`}
    >
      {viewer && (
        <Link href="/explore" className="pc-back">
          ← Back to Explore
        </Link>
      )}
      {isCampaignOwner && (
        <div className="pc-owner">
          <span>
            <PCIcon name="eye" />
            <span className="pc-owner__desktop">
              {preview
                ? "This is a preview. Publish to share it."
                : "This is your campaign. You're seeing what supporters see."}
            </span>
            <span className="pc-owner__mobile">
              {preview ? "Preview: publish to share" : "This is your campaign"}
            </span>
          </span>
          <Link href={`/campaigns/${campaign.id}`}>Manage campaign</Link>
        </div>
      )}
      <div className="pc-grid">
        <header className="pc-title">
          <span className="pc-category">{category?.name || "Campaign"}</span>
          {isCampaignEnded && (
            <span className="pc-ended-pill">
              Ended
              {campaign.end_date ? ` ${formatDate(campaign.end_date)}` : ""}
            </span>
          )}
          <h1>{campaign.title || "Untitled campaign"}</h1>
          <div className="pc-organizer-row">
            <div className="pc-organizer">
              <span className="pc-avatar" aria-hidden="true">
                {organizerInitials}
              </span>
              <div>
                <strong>{organizerName} is organizing this fundraiser</strong>
                <p>
                  {preview
                    ? "Not published yet."
                    : `Published ${formatDate(campaign.start_date || campaign.created_at)}.`}{" "}
                  {campaign.end_date
                    ? `${isCampaignEnded ? "Ended" : "Ends"} ${formatDate(campaign.end_date)}.`
                    : "No end date."}
                </p>
              </div>
            </div>
            {!preview && (
              <button
                type="button"
                className="pc-button pc-title__share"
                onClick={shareCampaign}
              >
                <PCIcon name="share" />
                Share
              </button>
            )}
          </div>
        </header>
        <CampaignCover src={failedCover !== coverImage ? coverImage : null} title={campaign.title} onError={() => setFailedCover(coverImage)} />
        <aside
          className="pc-support"
          id="campaign-support"
          ref={supportRef}
          tabIndex={-1}
          aria-label="Campaign support details"
        >
          <CampaignFundingProgress amountRaised={amountRaised} goalAmount={goalAmount} percentage={progressPercentage} infoIcon={<PCIcon name="info" />} statusText={preview ? "Draft preview" : isCampaignEnded ? "Campaign ended" : daysRemaining === null ? "No end date" : `${daysRemaining} ${daysRemaining === 1 ? "day" : "days"} left`} />
          <div className="pc-support__give">
            {preview ? (
              <>
                <h2>This is a draft preview</h2>
                <p>
                  Publish the campaign before supporters can give by transfer.
                </p>
              </>
            ) : isCampaignEnded ? (
              <>
                <h2>This campaign has ended</h2>
                <p>
                  Contributions are closed. You can still read the story and
                  updates and share the campaign.
                </p>
              </>
            ) : (
              <>
                <h2>Give by bank transfer</h2>
                <ol className="pc-give-steps">
                  <li>
                    <strong>Copy the account number</strong>
                    <span>It&apos;s at the top of the details below.</span>
                  </li>
                  <li>
                    <strong>Send a transfer from your bank app</strong>
                    <span>
                      Any amount helps. It goes straight to the organizer.
                    </span>
                  </li>
                  <li>
                    <a href="#comments">Leave a word of support</a>
                    <span>So the organizer knows you gave.</span>
                  </li>
                </ol>
                {bankAccount ? (
                  <div className="pc-bank">
                    <PublicBankRow
                      label="Account number"
                      value={bankAccount.account_number}
                      accent
                      copied={copyMessage === "Account number copied"}
                      onCopy={() =>
                        copyText(
                          bankAccount.account_number,
                          "Account number copied",
                        )
                      }
                    />
                    <PublicBankRow
                      label="Account name"
                      value={bankAccount.account_holder_name}
                      copied={copyMessage === "Account name copied"}
                      onCopy={() =>
                        copyText(
                          bankAccount.account_holder_name,
                          "Account name copied",
                        )
                      }
                    />
                    <PublicBankRow
                      label="Bank"
                      value={bankAccount.bank_name}
                      copied={copyMessage === "Bank copied"}
                      onCopy={() =>
                        copyText(bankAccount.bank_name, "Bank copied")
                      }
                    />
                  </div>
                ) : (
                  <p className="pc-bank-unavailable">
                    Bank details are not currently available. Please check back
                    before sending money.
                  </p>
                )}
                <p className="pc-funds-note">
                  <PCIcon name="shield" />
                  Money goes directly to the organizer&apos;s account. Fundu
                  never receives or holds campaign funds.
                </p>
              </>
            )}
          </div>
          {!preview && (
            <div className="pc-share">
              <h3>Can&apos;t give right now? Share it</h3>
              <div className="pc-share__buttons">
                <button
                  type="button"
                  className="pc-button"
                  onClick={() => shareTo("whatsapp")}
                >
                  WhatsApp
                </button>
                <button
                  type="button"
                  className="pc-button"
                  onClick={() => shareTo("facebook")}
                >
                  Facebook
                </button>
                <button
                  type="button"
                  className="pc-button"
                  onClick={() => shareTo("x")}
                >
                  X
                </button>
                <button
                  type="button"
                  className="pc-button"
                  onClick={copyCampaignLink}
                >
                  <PCIcon name="link" />
                  {copyMessage === "Campaign link copied"
                    ? "Copied"
                    : "Copy link"}
                </button>
              </div>
              <button type="button" className="pc-report-link" onClick={() => setReportOpen(true)}><ActionIcon name="flag" />Report campaign</button>
            </div>
          )}
        </aside>
        <nav className="pc-tabs" aria-label="Campaign sections">
          <a
            href="#about"
            aria-current={activeSection === "about" ? "location" : undefined}
          >
            About
          </a>
          <a
            href="#updates"
            aria-current={activeSection === "updates" ? "location" : undefined}
          >
            Updates {updatesError ? "" : campaignUpdates.length}
          </a>
          <a
            href="#comments"
            aria-current={activeSection === "comments" ? "location" : undefined}
          >
            Words of support {commentsError ? "" : comments.length}
          </a>
        </nav>
        <section id="about" className="pc-section pc-about" tabIndex={-1}>
          <h2>About this campaign</h2>
          <StoryBlocks
            blocks={storyBlocks}
            fallbackText={campaign.story_content || campaign.description}
            onViewImage={openPhoto}
          />
        </section>
        <section id="updates" className="pc-section pc-updates" tabIndex={-1}>
          <h2>
            Updates {!updatesError && <span>{campaignUpdates.length}</span>}
          </h2>
          {updatesError ? (
            <p role="status">{updatesError}</p>
          ) : campaignUpdates.length ? (
            <div className="pc-update-list">
              {campaignUpdates.map((update) => (
                <article className="pc-update" key={update.id}>
                  {update.is_final_update && (
                    <span className="pc-category">Final update</span>
                  )}
                  <h3>{update.title || "Campaign update"}</h3>
                  {update.content && <p>{update.content}</p>}
                  {Array.isArray(update.image_urls) &&
                    update.image_urls.length > 0 && (
                      <div className="pc-update__photos">
                        {update.image_urls
                          .filter(
                            (url) => typeof url === "string" && url.trim(),
                          )
                          .map((url, index) => (
                            <button
                              type="button"
                              key={`${url}-${index}`}
                              onClick={() =>
                                openPhoto(
                                  url,
                                  `${update.title || "Update"} photo ${index + 1}`,
                                )
                              }
                              aria-label={`View ${update.title || "update"} photo ${index + 1}`}
                            >
                              <CampaignStorageImage
                                src={url}
                                alt={`${update.title || "Update"} photo ${index + 1}`}
                                loading="lazy"
                              />
                            </button>
                          ))}
                      </div>
                    )}
                  <time dateTime={update.created_at}>
                    Posted {formatDate(update.created_at)}
                  </time>
                </article>
              ))}
            </div>
          ) : (
            <div className="pc-empty">
              <PCIcon name="message" />
              <div>
                <strong>No updates yet</strong>
                <p>
                  When the organizer shares progress, photos or receipts,
                  they&apos;ll appear here.
                </p>
              </div>
            </div>
          )}
        </section>
        <section id="comments" className="pc-section pc-comments" tabIndex={-1}>
          <h2>
            Words of support {!commentsError && <span>{comments.length}</span>}
          </h2>
          <div className="pc-comments__card">
            {commentsError ? (
              <p role="status">{commentsError}</p>
            ) : comments.length ? (
              <div className="pc-comment-list">
                {comments.map((comment) => {
                  const author = commentUsers[comment.user_id];
                  const name =
                    author?.display_name || author?.full_name || "Supporter";
                  return (
                    <article className="pc-comment" key={comment.id}>
                      <span className="pc-avatar" aria-hidden="true">
                        {getInitials(name)}
                      </span>
                      <div>
                        <div className="pc-comment__meta">
                          <strong>{name}</strong>
                          <time dateTime={comment.created_at}>
                            {formatRelativeDate(comment.created_at)}
                          </time>
                        </div>
                        <p>{comment.content}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p>
                No comments yet. Gave something, or just want to cheer them on?
                Be the first.
              </p>
            )}
            {preview ? (
              <p>Comments will be available after publishing.</p>
            ) : isCampaignEnded ? (
              <p>This campaign has ended, so comments are closed.</p>
            ) : viewer ? (
              <form
                className="pc-comment-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  postComment();
                }}
              >
                <div className="pc-commenting-as">
                  {viewerAvatar ? (
                    <img src={viewerAvatar} alt="" />
                  ) : (
                    <span className="pc-avatar" aria-hidden="true">
                      {getInitials(viewerName)}
                    </span>
                  )}
                  <span>
                    Commenting as <strong>{viewerName}</strong>
                  </span>
                </div>
                <label htmlFor="public-comment-message">Your message</label>
                <textarea
                  id="public-comment-message"
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                  placeholder="Leave a kind word for the organizer"
                  maxLength={800}
                  required
                  disabled={postingComment}
                />
                <button
                  type="submit"
                  className="pc-button pc-button--teal"
                  disabled={!commentText.trim() || postingComment}
                >
                  {postingComment ? "Posting..." : "Post comment"}
                </button>
              </form>
            ) : (
              <div className="pc-sign-in">
                <p>Sign in to leave a word of support.</p>
                <Link
                  href={`/signin?redirect=${encodeURIComponent(`/campaign/${campaign.id}#comments`)}`}
                  className="pc-button pc-button--teal"
                >
                  Sign in to comment
                </Link>
              </div>
            )}
          </div>
        </section>
        <section className="pc-how">
          <h2>How giving on Fundu works</h2>
          <div>
            <article>
              <PCIcon name="shield" />
              <h3>Direct to the organizer</h3>
              <p>
                Transfers go straight to their bank account. Fundu is the page,
                not the middleman.
              </p>
            </article>
            <article>
              <PCIcon name="info" />
              <h3>Totals come from the organizer</h3>
              <p>
                The amount raised is updated by the organizer, not verified by
                Fundu.
              </p>
            </article>
            <article>
              <PCIcon name="link" />
              <h3>One link, always current</h3>
              <p>Updates, photos and progress stay on this page.</p>
            </article>
          </div>
        </section>
      </div>
      {!viewer && (
        <section className="pc-fundraiser">
          <div>
            <h2>Raising money for something?</h2>
            <p>Give your goal a page of its own and share one link.</p>
          </div>
          <Link href="/signup" className="pc-button pc-button--teal">
            Start a fundraiser
          </Link>
        </section>
      )}
      {!viewer && !isCampaignEnded && !preview && !supportVisible && (
        <div className="pc-quick-give">
          <div>
            <strong>{formatMoney(amountRaised)} raised</strong>
            <span>
              {progressPercentage}% of {formatMoney(goalAmount)}
            </span>
          </div>
          <button
            type="button"
            className="pc-button pc-button--teal"
            onClick={() => {
              supportRef.current?.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "auto"
                  : "smooth",
                block: "start",
              });
              supportRef.current?.focus({ preventScroll: true });
            }}
          >
            Give by transfer
          </button>
        </div>
      )}
      <span className="pc-announcement" role="status" aria-live="polite">
        {copyMessage}
      </span>
      <ReportCampaignDialog open={reportOpen} campaignId={campaign?.id} onClose={() => setReportOpen(false)} />
      {viewingPhoto && (
        <div
          className="pc-lightbox"
          onClick={(event) => {
            if (event.target === event.currentTarget) setViewingPhoto(null);
          }}
        >
          <div
            ref={photoDialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={viewingPhoto.alt}
            tabIndex={-1}
          >
            <button
              type="button"
              className="pc-lightbox__close"
              onClick={() => setViewingPhoto(null)}
              aria-label="Close photo"
            >
              ×
            </button>
            <CampaignStorageImage
              src={viewingPhoto.url}
              alt={viewingPhoto.alt}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function PCIcon({ name }) {
  const paths = {
    eye: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v6M12 7h.01" />
      </>
    ),
    shield: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    message: (
      <path d="M21 11a8 8 0 0 1-8 8H5l-3 3V11a8 8 0 0 1 8-8h3a8 8 0 0 1 8 8Z" />
    ),
    link: (
      <>
        <path d="m10 13 4-4M8 16H6a4 4 0 0 1-3-7l4-4a4 4 0 0 1 6 0M16 8h2a4 4 0 0 1 3 7l-4 4a4 4 0 0 1-6 0" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="12" height="13" rx="2" />
        <path d="M16 8V3H3v13h5" />
      </>
    ),
    share: (
      <>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
function PublicBankRow({ label, value, accent = false, copied, onCopy }) {
  return (
    <div className={`pc-bank-row ${accent ? "pc-bank-row--number" : ""}`}>
      <div>
        <span>{label}</span>
        <strong>{value || "Not available"}</strong>
      </div>
      {value && (
        <button
          type="button"
          className={`pc-button ${accent ? "pc-button--teal" : ""}`}
          aria-label={`Copy ${label.toLowerCase()}`}
          onClick={onCopy}
        >
          {accent && <PCIcon name="copy" />}
          {copied ? "Copied" : "Copy"}
        </button>
      )}
    </div>
  );
}

/* STORY COMPONENT */



/* STORY IMAGES */



/* STORY VIDEO */



/* VIDEO URL HELPER */



/* BANK ROW */

function BankRow({ label, value, accent = false, onCopy }) {
  return (
    <div className="public-campaign-bank-row">
      <div>
        <span>{label}</span>

        <strong className={accent ? "public-campaign-bank-accent" : ""}>
          {value || "Not available"}
        </strong>
      </div>

      {value && (
        <button type="button" onClick={onCopy}>
          Copy
        </button>
      )}
    </div>
  );
}

/* HELPERS */

function formatMoney(value) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function formatDate(value) {
  if (!value) {
    return "Not set";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not set";
  }

  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatRelativeDate(value) {
  if (!value) return "";

  const date = new Date(value);
  const now = new Date();

  const diff = Math.max(0, now.getTime() - date.getTime());

  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  return formatDate(value);
}

function getDaysRemaining(endDate, now = Date.now()) {
  if (!endDate) return null;
  const end = new Date(endDate).getTime();
  return Number.isFinite(end)
    ? Math.max(0, Math.ceil((end - now) / 86400000))
    : null;
}

function campaignHasEnded(campaign, now = Date.now()) {
  if (!campaign) return false;
  if (["ended", "inactive", "completed"].includes(campaign.status)) return true;
  const end = campaign.end_date ? new Date(campaign.end_date).getTime() : NaN;
  return Number.isFinite(end) && end <= now;
}

function getInitials(name) {
  return String(name || "Fundu User")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
