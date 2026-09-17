"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
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

  const [comments, setComments] = useState([]);
  const [commentUsers, setCommentUsers] = useState({});
  const [commentText, setCommentText] = useState("");
  const [postingComment, setPostingComment] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  /* ======================================================
     CHECK WHETHER VIEWER IS LOGGED IN
  ====================================================== */

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

  /* ======================================================
     LOAD CAMPAIGN
  ====================================================== */

  useEffect(() => {
    if (!campaignId) return;

    loadCampaignPage();
  }, [campaignId]);

  async function loadCampaignPage() {
    setLoading(true);
    setLoadError("");

    try {
      const { data: campaignRow, error: campaignError } = await supabase
        .from("campaigns")
        .select("*")
        .eq("id", campaignId)
        .eq("status", "active")
        .maybeSingle();

      if (campaignError) {
        throw campaignError;
      }

      if (!campaignRow) {
        setLoadError(
          "This campaign could not be found or is not currently active.",
        );
        return;
      }

      setCampaign(campaignRow);

      /* CREATOR */

      if (campaignRow.creator_id) {
        const { data: creatorRow, error: creatorError } = await supabase
          .from("users")
          .select("id, full_name, display_name, avatar_url")
          .eq("id", campaignRow.creator_id)
          .maybeSingle();

        if (creatorError) {
          console.error("Creator load error:", creatorError);
        }

        setCreator(creatorRow || null);
      }

      /* CATEGORY */

      if (campaignRow.category_id) {
        const { data: categoryRow, error: categoryError } = await supabase
          .from("categories")
          .select("id, name, slug")
          .eq("id", campaignRow.category_id)
          .maybeSingle();

        if (categoryError) {
          console.error("Category load error:", categoryError);
        }

        setCategory(categoryRow || null);
      }

      /* BANK ACCOUNT */

      const { data: bankRows, error: bankError } = await supabase
        .from("campaign_bank_accounts")
        .select(
          `
              id,
              campaign_id,
              user_id,
              account_holder_name,
              account_number,
              bank_name,
              is_active
            `,
        )
        .eq("campaign_id", campaignRow.id)
        .eq("is_active", true)
        .order("updated_at", {
          ascending: false,
        })
        .limit(1);

      if (bankError) {
        console.error("Bank load error:", bankError);
      }

      setBankAccount(bankRows?.[0] || null);

      /* COMMENTS */

      const { data: commentRows, error: commentsError } = await supabase
        .from("comments")
        .select(
          `
              id,
              campaign_id,
              user_id,
              content,
              created_at
            `,
        )
        .eq("campaign_id", campaignRow.id)
        .order("created_at", {
          ascending: true,
        });

      if (commentsError) {
        console.error("Comments load error:", commentsError);
      }

      const safeComments = commentRows || [];

      setComments(safeComments);

      /* LOAD COMMENT AUTHORS */

      const userIds = [
        ...new Set(
          safeComments.map((comment) => comment.user_id).filter(Boolean),
        ),
      ];

      if (userIds.length > 0) {
        const { data: commentUserRows, error: commentUsersError } =
          await supabase
            .from("users")
            .select("id, full_name, display_name, avatar_url")
            .in("id", userIds);

        if (commentUsersError) {
          console.error("Comment users load error:", commentUsersError);
        }

        const nextMap = {};

        for (const user of commentUserRows || []) {
          nextMap[user.id] = user;
        }

        setCommentUsers(nextMap);
      }
    } catch (error) {
      console.error("Campaign page load error:", error);

      setLoadError("We couldn't load this campaign right now.");
    } finally {
      setLoading(false);
    }
  }

  /* ======================================================
     STORY
  ====================================================== */

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

  /* ======================================================
     CALCULATED VALUES
  ====================================================== */

  const organizerName =
    creator?.display_name || creator?.full_name || "Campaign Organizer";

  const organizerInitials = getInitials(organizerName);

  const coverImage =
    campaign?.cover_image ||
    campaign?.image_url ||
    campaign?.preview_image ||
    "";

  const amountRaised = Number(campaign?.amount_raised || 0);

  const goalAmount = Number(campaign?.goal_amount || 0);

  const progressPercentage =
    goalAmount > 0
      ? Math.min(100, Math.round((amountRaised / goalAmount) * 100))
      : 0;

  const daysRemaining = getDaysRemaining(campaign?.end_date);

  /*
   * The Edit Campaign button is only shown when the
   * signed-in user owns this campaign.
   */

  const isCampaignOwner =
    Boolean(viewer?.id) && viewer.id === campaign?.creator_id;

  /* ======================================================
     COPY
  ====================================================== */

  async function copyText(value, label = "Copied") {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(String(value));

      setCopyMessage(label);

      window.setTimeout(() => {
        setCopyMessage("");
      }, 1800);
    } catch {
      window.prompt("Copy this:", value);
    }
  }

  async function copyCampaignLink() {
    await copyText(window.location.href, "Campaign link copied");
  }

  /* ======================================================
     SHARE
  ====================================================== */

  async function shareCampaign() {
    const url = window.location.href;

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
    const url = encodeURIComponent(window.location.href);

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

  /* ======================================================
     COMMENTS
  ====================================================== */

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
       * The database function handles the entire comment
       * activity flow in one transaction:
       *
       * 1. Creates the comment.
       * 2. Adds "Comment posted" to the commenter's history.
       * 3. If somebody else owns the campaign, creates an
       *    unread "New comment" notification for the owner.
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

      /*
       * Supabase may return the composite comments row
       * directly or as a one-item array depending on the
       * generated client/runtime response.
       */

      const newComment = Array.isArray(data) ? data[0] : data;

      if (!newComment?.id) {
        throw new Error("The new comment could not be loaded.");
      }

      /*
       * Show the new comment immediately without reloading
       * the entire campaign page.
       */

      setComments((current) => [...current, newComment]);

      setCommentText("");

      /*
       * Make sure we have the current commenter's profile
       * available so their real name/initials appear beside
       * the newly posted comment immediately.
       */

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

      /*
       * The RPC created Activity records.
       *
       * If this viewer owns the campaign, their own
       * "Comment posted" history has changed, so tell
       * Fundu's Activity UI to refresh.
       *
       * If somebody else owns the campaign, the owner's
       * unread notification is already safely stored in
       * Supabase. Their sidebar will pick it up when their
       * authenticated Fundu UI refreshes.
       */

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

  /* ======================================================
     LOADING
  ====================================================== */

  if (!authChecked || loading) {
    return (
      <div className="public-campaign-loading">
        <p>Loading campaign...</p>
      </div>
    );
  }

  /* ======================================================
     ERROR
  ====================================================== */

  if (loadError || !campaign) {
    return (
      <div className="public-campaign-error-page">
        <h1>Campaign unavailable</h1>

        <p>{loadError || "This campaign is unavailable."}</p>

        <Link href={viewer ? "/explore" : "/"}>Go back</Link>
      </div>
    );
  }

  /* ======================================================
     PAGE
  ====================================================== */

  return (
    <div className="public-campaign-page-shell">
      <div className="public-campaign-page">
        <button
          type="button"
          className="public-campaign-back"
          onClick={() => router.back()}
        >
          ← Back
        </button>

        {/* HEADER */}

        <section className="public-campaign-header-card">
          <div className="public-campaign-title-block">
            <h1>{campaign.title}</h1>

            <div className="public-campaign-meta-row">
              <div className="public-campaign-badges">
                <span className="public-campaign-category">
                  {category?.name || "Campaign"}
                </span>

                <span className="public-campaign-status">Active</span>
              </div>

              <div className="public-campaign-dates">
                <span>
                  Published{" "}
                  {formatDate(campaign.start_date || campaign.created_at)}
                </span>

                <span>·</span>

                <span>Ends {formatDate(campaign.end_date)}</span>
              </div>
            </div>
          </div>

          {/* ORGANIZER */}

          <div className="public-campaign-organizer-row">
            <div className="public-campaign-organizer">
              <div className="public-campaign-avatar">{organizerInitials}</div>

              <div>
                <strong>{organizerName}</strong>

                <span>Campaign Organizer</span>
              </div>
            </div>

            <div className="public-campaign-header-actions">
              {isCampaignOwner && (
                <button
                  type="button"
                  className="public-campaign-edit-button"
                  onClick={() =>
                    router.push(`/create-campaign?campaign=${campaign.id}`)
                  }
                >
                  Edit Campaign
                </button>
              )}

              <button
                type="button"
                className="public-campaign-share-button"
                onClick={shareCampaign}
              >
                Share Campaign
              </button>

              <button
                type="button"
                className="public-campaign-copy-link"
                onClick={copyCampaignLink}
              >
                Copy Link
              </button>
            </div>
          </div>

          {/* COVER */}

          {coverImage ? (
            <div className="public-campaign-cover">
              <img src={coverImage} alt={campaign.title} />
            </div>
          ) : (
            <div className="public-campaign-cover public-campaign-cover--empty">
              No campaign cover image
            </div>
          )}
        </section>

        {/* COPY MESSAGE */}

        {copyMessage && (
          <div className="public-campaign-copy-toast">{copyMessage}</div>
        )}

        {/* BODY */}

        <div className="public-campaign-columns">
          {/* LEFT */}

          <div className="public-campaign-primary-column">
            <section className="public-campaign-card">
              <h2>About This Campaign</h2>

              <StoryBlocks
                blocks={storyBlocks}
                fallbackText={campaign.story_content || campaign.description}
              />
            </section>

            {/* UPDATES */}

            <section className="public-campaign-card">
              <div className="public-campaign-section-heading">
                <h2>Campaign Updates</h2>

                <span>0 updates</span>
              </div>

              <div className="public-campaign-empty-state">
                <strong>No updates yet</strong>

                <p>
                  The organizer has not posted any public campaign updates yet.
                </p>
              </div>
            </section>

            {/* COMMENTS */}

            <section className="public-campaign-card">
              <h2>Comments ({comments.length})</h2>

              <div className="public-campaign-comments">
                {comments.length === 0 ? (
                  <div className="public-campaign-empty-state">
                    <strong>No comments yet</strong>

                    <p>Be the first person to leave a supportive comment.</p>
                  </div>
                ) : (
                  comments.map((comment) => {
                    const author = commentUsers[comment.user_id];

                    const authorName =
                      author?.display_name || author?.full_name || "Fundu User";

                    return (
                      <div className="public-campaign-comment" key={comment.id}>
                        <div className="public-campaign-comment-avatar">
                          {getInitials(authorName)}
                        </div>

                        <div className="public-campaign-comment-content">
                          <div className="public-campaign-comment-meta">
                            <strong>{authorName}</strong>

                            <span>
                              {formatRelativeDate(comment.created_at)}
                            </span>
                          </div>

                          <p>{comment.content}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* COMMENT FORM */}

              <div className="public-campaign-comment-form">
                {viewer ? (
                  <>
                    <textarea
                      value={commentText}
                      onChange={(event) => setCommentText(event.target.value)}
                      placeholder="Leave a supportive comment..."
                      maxLength={800}
                    />

                    <div className="public-campaign-comment-actions">
                      <button
                        type="button"
                        onClick={postComment}
                        disabled={!commentText.trim() || postingComment}
                      >
                        {postingComment ? "Posting..." : "Post Comment"}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="public-campaign-signin-comment">
                    <p>Sign in to leave a supportive comment.</p>

                    <Link href={`/signin?redirect=/campaign/${campaign.id}`}>
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT */}

          <aside className="public-campaign-side-column">
            {/* BANK */}

            <section className="public-campaign-support-card">
              <div>
                <h2>Support This Campaign</h2>

                <p>
                  Send your contribution directly to the organizer&apos;s bank
                  account.
                </p>
              </div>

              {bankAccount ? (
                <div className="public-campaign-bank-box">
                  <BankRow
                    label="BANK"
                    value={bankAccount.bank_name}
                    onCopy={() =>
                      copyText(bankAccount.bank_name, "Bank copied")
                    }
                  />

                  <BankRow
                    label="ACCOUNT NAME"
                    value={bankAccount.account_holder_name}
                    onCopy={() =>
                      copyText(
                        bankAccount.account_holder_name,
                        "Account name copied",
                      )
                    }
                  />

                  <BankRow
                    label="ACCOUNT NUMBER"
                    value={bankAccount.account_number}
                    accent
                    onCopy={() =>
                      copyText(
                        bankAccount.account_number,
                        "Account number copied",
                      )
                    }
                  />
                </div>
              ) : (
                <div className="public-campaign-bank-unavailable">
                  Bank details are not currently available.
                </div>
              )}

              <small>
                Your contribution goes directly to the campaign organizer. Fundu
                does not receive or hold campaign funds.
              </small>
            </section>

            {/* PROGRESS */}

            <section className="public-campaign-side-card">
              <div className="public-campaign-raised">
                {formatMoney(amountRaised)}
              </div>

              <p className="public-campaign-goal">
                of {formatMoney(goalAmount)} goal
              </p>

              <div className="public-campaign-progress-track">
                <div
                  className="public-campaign-progress-fill"
                  style={{
                    width: `${progressPercentage}%`,
                  }}
                />
              </div>

              <div className="public-campaign-progress-labels">
                <span>{progressPercentage}% complete</span>

                <span>
                  {daysRemaining === null
                    ? "No end date"
                    : `${daysRemaining} ${
                        daysRemaining === 1 ? "day" : "days"
                      } remaining`}
                </span>
              </div>

              <div className="public-campaign-side-divider" />

              <small>Amount reported by the campaign organizer.</small>
            </section>

            {/* STAY UPDATED */}

            <section className="public-campaign-side-card">
              <div className="public-campaign-update-icon">✉</div>

              <h3>Stay Updated</h3>

              <p>
                Get notified when the organizer posts updates about this
                campaign&apos;s progress.
              </p>

              <input
                type="email"
                placeholder="Enter your email address"
                disabled
              />

              <button
                type="button"
                className="public-campaign-subscribe-button"
                disabled
              >
                Subscribe to Updates
              </button>
            </section>

            {/* SHARE */}

            <section className="public-campaign-side-card">
              <h3>Help spread the word</h3>

              <div className="public-campaign-social-row">
                <button type="button" onClick={() => shareTo("whatsapp")}>
                  WA
                </button>

                <button type="button" onClick={() => shareTo("facebook")}>
                  f
                </button>

                <button type="button" onClick={() => shareTo("x")}>
                  X
                </button>

                <button type="button" onClick={() => shareTo("copy")}>
                  ↗
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   STORY COMPONENT
====================================================== */

function StoryBlocks({ blocks, fallbackText }) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="public-campaign-story-fallback">
        <p>{fallbackText || "The organizer has not added a story yet."}</p>
      </div>
    );
  }

  return (
    <div className="public-campaign-story">
      {blocks.map((block) => {
        /* =================================================
           SECTION BLOCK
        ================================================= */

        if (block.type === "section") {
          return (
            <div className="public-story-section" key={block.id}>
              {block.title && <h3>{block.title}</h3>}

              {block.content && <p>{block.content}</p>}

              {Array.isArray(block.media) && block.media.length > 0 && (
                <StoryImages images={block.media} />
              )}
            </div>
          );
        }

        /* =================================================
           TEXT BLOCK
        ================================================= */

        if (block.type === "text") {
          return block.content ? (
            <p className="public-story-text" key={block.id}>
              {block.content}
            </p>
          ) : null;
        }

        /* =================================================
           IMAGE BLOCK

           "media" is intentionally kept here so campaigns
           created before the Image Block change still work.
        ================================================= */

        if (block.type === "image" || block.type === "media") {
          return (
            <StoryImages
              key={block.id}
              images={Array.isArray(block.media) ? block.media : []}
            />
          );
        }

        /* =================================================
           VIDEO BLOCK
        ================================================= */

        if (block.type === "video") {
          return (
            <StoryVideo
              key={block.id}
              url={block.url || ""}
              blockId={block.id}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

/* ======================================================
   STORY IMAGES
====================================================== */

function StoryImages({ images }) {
  if (!images?.length) {
    return null;
  }

  return (
    <div className="public-story-media-grid">
      {images.map((url, index) => (
        <div className="public-story-media-item" key={`${url}-${index}`}>
          <img src={url} alt={`Campaign story image ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}

/* ======================================================
   STORY VIDEO
====================================================== */

function StoryVideo({ url, blockId }) {
  const embedUrl = getVideoEmbedUrl(url);

  if (!embedUrl) {
    return null;
  }

  return (
    <div className="public-story-video">
      <iframe
        src={embedUrl}
        title={`Campaign video ${blockId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

/* ======================================================
   VIDEO URL HELPER
====================================================== */

function getVideoEmbedUrl(value) {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value.trim());

    const hostname = url.hostname.replace(/^www\./, "").toLowerCase();

    /* YouTube short link:
       https://youtu.be/VIDEO_ID
    */

    if (hostname === "youtu.be") {
      const videoId = url.pathname.split("/").filter(Boolean)[0];

      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    /* YouTube:
       watch, Shorts, Live and Embed links
    */

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (url.pathname === "/watch") {
        const videoId = url.searchParams.get("v");

        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      const parts = url.pathname.split("/").filter(Boolean);

      if (
        parts[0] === "embed" ||
        parts[0] === "shorts" ||
        parts[0] === "live"
      ) {
        const videoId = parts[1];

        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }
    }

    /* Vimeo:
       https://vimeo.com/123456789
       https://player.vimeo.com/video/123456789
    */

    if (hostname === "vimeo.com" || hostname === "player.vimeo.com") {
      const parts = url.pathname.split("/").filter(Boolean);

      const videoId =
        hostname === "player.vimeo.com" && parts[0] === "video"
          ? parts[1]
          : parts[0];

      if (videoId && /^\d+$/.test(videoId)) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}

/* ======================================================
   BANK ROW
====================================================== */

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

/* ======================================================
   HELPERS
====================================================== */

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

function getDaysRemaining(endDate) {
  if (!endDate) {
    return null;
  }

  const end = new Date(endDate);
  const today = new Date();

  end.setHours(23, 59, 59, 999);

  today.setHours(0, 0, 0, 0);

  if (Number.isNaN(end.getTime())) {
    return null;
  }

  return Math.max(
    0,
    Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
  );
}

function getInitials(name) {
  return String(name || "Fundu User")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
