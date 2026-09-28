"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CampaignStorageImage from "@/components/campaigns/CampaignStorageImage";
import Badge from "@/components/ui/Badge";
import { supabase } from "@/lib/supabase";
import "@/styles/campaign-card.css";
const DAY = 86400000;
const ACTIVITY_LABELS = {
  campaign_draft_created: "Draft created",
  campaign_published: "Campaign published",
  campaign_edited: "Campaign edited",
  campaign_story_updated: "Story updated",
  campaign_images_updated: "Campaign images updated",
  campaign_end_date_changed: "End date changed",
  campaign_update_published: "Update posted",
  final_campaign_update_published: "Final update posted",
  campaign_update_edited: "Update edited",
  campaign_update_deleted: "Update deleted",
  amount_raised_updated: "Amount raised updated",
  campaign_ended_early: "Campaign ended early",
  bank_account_added: "Bank account added",
  bank_account_updated: "Bank account updated",
};
function getDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}
function getRelativeTime(value) {
  const date = getDate(value);
  if (!date) return null;
  const minutes = Math.max(
    0,
    Math.floor((Date.now() - date.getTime()) / 60000),
  );
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} ${days === 1 ? "day" : "days"} ago`;
}
function CardIcon({ name }) {
  const paths = {
    edit: (
      <>
        <path d="m15 5 4 4M4 20l4-1L20 7a2.8 2.8 0 0 0-4-4L4 15l-1 5Z" />
        <path d="M12 20h9" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    link: (
      <>
        <path d="m10 13 4-4" />
        <path d="M8 16H6a4 4 0 0 1-3-7l4-4a4 4 0 0 1 6 0" />
        <path d="M16 8h2a4 4 0 0 1 3 7l-4 4a4 4 0 0 1-6 0" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 11h18" />
      </>
    ),
    message: (
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2v-10A8.5 8.5 0 0 1 10.5 3h2a8.5 8.5 0 0 1 8.5 8.5Z" />
    ),
    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8" cy="8" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </>
    ),
    more: (
      <>
        <circle cx="5" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
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
export default function CampaignCard({
  campaign,
  variant = "creator",
  onShare,
  onPostUpdate,
  onDelete,
  onEnd,
  appearance = "default",
  viewerId = null,
  onDuplicate,
  selectable = false,
  selected = false,
  onSelect,
  preview = false,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [failedCover, setFailedCover] = useState(null);
  const [latestActivity, setLatestActivity] = useState(null);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const copyTimerRef = useRef(null);
  const campaignId = campaign?.id;
  const creatorId = campaign?.creator_id;
  const campaignUpdatedAt = campaign?.updated_at;
  const campaignStatus = campaign?.status;
  const campaignUpdateCount = campaign?.updates_count;

  /* =========================================================
     LATEST CREATOR ACTIVITY
  ========================================================= */

  useEffect(() => {
    if (variant === "public" || !campaignId || !creatorId) {
      return;
    }
    let cancelled = false;
    let requestNumber = 0;
    async function loadLatestActivity() {
      const currentRequest = ++requestNumber;
      try {
        let query = supabase
          .from("activity_feed")
          .select("id, campaign_id, activity_type, title, created_at")
          .eq("campaign_id", campaignId)
          .eq("user_id", creatorId)
          .order("created_at", {
            ascending: false,
          })
          .order("id", {
            ascending: false,
          })
          .limit(1)
          .maybeSingle();
        if (appearance !== "collection")
          query = query.not("activity_type", "like", "campaign_reached_%");
        const { data, error } = await query;
        if (cancelled || currentRequest !== requestNumber) return;
        if (error) throw error;
        setLatestActivity({
          campaignId,
          item: data || null,
        });
      } catch (error) {
        if (!cancelled && currentRequest === requestNumber) {
          console.error("Latest campaign activity error:", error);
        }
      }
    }
    loadLatestActivity();
    window.addEventListener("focus", loadLatestActivity);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", loadLatestActivity);
    };
  }, [
    variant,
    appearance,
    campaignId,
    creatorId,
    campaignUpdatedAt,
    campaignStatus,
    campaignUpdateCount,
  ]);

  /* =========================================================
     COPY FEEDBACK AND MENU
  ========================================================= */

  useEffect(() => {
    return () => window.clearTimeout(copyTimerRef.current);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    function closeOutside(event) {
      if (!menuRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    function closeWithEscape(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    if (appearance === "collection")
      menuRef.current
        ?.querySelector(".collection-menu a, .collection-menu button")
        ?.focus();
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [menuOpen, appearance]);
  if (!campaign) return null;

  /* =========================================================
     CAMPAIGN VALUES
  ========================================================= */

  const isPublic = variant === "public";
  const now = new Date();
  const status = campaign.status?.toLowerCase() || "draft";
  const endDate = getDate(campaign.end_date);
  const endedDate =
    getDate(campaign.ended_at) || endDate || getDate(campaign.updated_at);
  const hasExpired = Boolean(endDate && endDate <= now);
  const isDraft = status === "draft";
  const isInactive =
    status === "inactive" ||
    status === "ended" ||
    status === "completed" ||
    (status === "active" && hasExpired);
  const isActive = status === "active" && !isInactive;
  const title = campaign.title || "Untitled Campaign";
  const goalAmount = Math.max(0, Number(campaign.goal_amount) || 0);
  const recordedAmount = Math.max(0, Number(campaign.amount_raised) || 0);
  const amountRaised = !isPublic && isDraft ? 0 : recordedAmount;
  const progress =
    goalAmount > 0
      ? Math.min(100, Math.max(0, (amountRaised / goalAmount) * 100))
      : 0;
  const percentage = Math.round(progress);
  const coverImage =
    campaign.cover_image || campaign.image_url || campaign.preview_image || "";
  const hasCover = Boolean(coverImage) && failedCover !== coverImage;
  const currency = campaign.currency || "NGN";
  const editUrl = `/create-campaign?campaign=${campaign.id}`;
  const creatorUrl = `/campaigns/${campaign.id}`;
  const publicUrl = `/campaign/${campaign.id}`;
  function formatMoney(amount) {
    try {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      return `₦${Number(amount || 0).toLocaleString("en-NG")}`;
    }
  }
  const daysLeft = endDate
    ? Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / DAY))
    : null;
  const calendarLabel = isDraft && !preview
    ? "Not started"
    : isInactive
      ? "0 days left"
      : daysLeft === null
        ? "No end date"
        : `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left`;
  const clicks = isDraft
    ? 0
    : (campaign.metrics?.donation_clicks ?? campaign.donation_clicks ?? 0);
  const updates = isDraft
    ? 0
    : (campaign.updates_count ?? campaign.update_count ?? 0);

  /* =========================================================
     LAST ACTION UNDER THE TITLE
  ========================================================= */

  const lastAction =
    (latestActivity?.campaignId === campaign.id ? latestActivity?.item : null) ||
    campaign.latest_activity ||
    null;
  let statusLine;
  if (lastAction) {
    const action =
      ACTIVITY_LABELS[lastAction.activity_type] ||
      lastAction.title ||
      "Campaign updated";
    const when = getRelativeTime(lastAction.created_at);
    statusLine = when ? `${action} · ${when}` : action;
  } else if (isDraft) {
    statusLine = "Not published yet";
  } else if (isInactive) {
    statusLine = endedDate
      ? `Ended ${endedDate.toLocaleDateString("en-NG", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}`
      : "Ended";
  } else {
    statusLine = "Active campaign";
  }
  async function handleCopyLink() {
    const url = `${window.location.origin}${publicUrl}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copy this campaign link:", url);
    }
  }

  /* Collection views reuse this component; the dashboard keeps its existing view. */
  if (appearance === "collection") {
    const cover = hasCover ? (
      <CampaignStorageImage
        src={coverImage}
        alt={`${title} cover`}
        onError={() => setFailedCover(coverImage)}
      />
    ) : (
      <span className="collection-cover-fallback" aria-hidden="true">
        <CardIcon name="image" />
      </span>
    );
    const initials = (campaign.creator_name || "Campaign organizer")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
    const menu = (
      <div className="collection-menu-wrap" ref={menuRef}>
        <button
          type="button"
          ref={menuButtonRef}
          className="collection-button collection-more"
          aria-label={`More actions for ${title}`}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <CardIcon name="more" />
        </button>
        {menuOpen && (
          <div className="collection-menu">
            {isDraft ? (
              <>
                <Link href={editUrl} onClick={() => setMenuOpen(false)}>
                  Continue editing
                </Link>
                <Link
                  href={`${editUrl}&preview=true`}
                  onClick={() => setMenuOpen(false)}
                >
                  Preview
                </Link>
                {onDuplicate && (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onDuplicate(campaign);
                    }}
                  >
                    Duplicate
                  </button>
                )}
              </>
            ) : (
              <>
                <Link href={creatorUrl} onClick={() => setMenuOpen(false)}>
                  View details
                </Link>
                {isActive && (
                  <>
                    <Link href={editUrl} onClick={() => setMenuOpen(false)}>
                      Edit campaign
                    </Link>
                    {onEnd && (
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          onEnd(campaign);
                        }}
                      >
                        End campaign early
                      </button>
                    )}
                  </>
                )}
              </>
            )}
            {onDelete && (
              <button
                type="button"
                className="collection-delete"
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(campaign);
                }}
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    );
    const reportedProgress = (
      <div
        className="collection-progress"
        role="progressbar"
        aria-label={`${title} progress`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      >
        <span
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    );
    const PublicCard = preview ? "article" : Link;
    if (isPublic)
      return (
        <PublicCard
          href={preview ? undefined : publicUrl}
          className="collection-card collection-card--public"
        >
          <div className="collection-cover">
            {cover}
            <span className="collection-category">
              {campaign.category_name || "Campaign"}
            </span>
          </div>
          <div className="collection-body">
            <h2>{title}</h2>
            <div className="collection-organizer">
              <span className="collection-avatar" aria-hidden="true">
                {initials}
              </span>
              <span>{campaign.creator_name || "Campaign organizer"}</span>
              {(preview || viewerId === campaign.creator_id) && (
                <span className="collection-yours">Yours</span>
              )}
            </div>
            <div className="collection-funding">
              <div>
                <strong>{formatMoney(amountRaised)}</strong>
                <span>raised</span>
              </div>
              <b>{percentage}%</b>
            </div>
            {reportedProgress}
            <div className="collection-public-bottom">
              <span>of {formatMoney(goalAmount)} goal</span>
              <span>
                <CardIcon name="calendar" />
                {isInactive ? "Ended" : calendarLabel}
              </span>
            </div>
          </div>
        </PublicCard>
      );
    if (variant === "row")
      return (
        <article
          className={`collection-row ${selectable ? "collection-row--selectable" : ""}`}
        >
          {selectable && (
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onSelect?.(campaign.id)}
              aria-label={`Select draft ${title}`}
            />
          )}
          <Link
            href={isDraft ? editUrl : creatorUrl}
            className={`collection-row__cover ${hasCover ? "" : "collection-row__cover--missing"}`}
            aria-label={
              isDraft && !hasCover
                ? `Add cover image to ${title}`
                : isDraft
                  ? `Edit ${title}`
                  : `View ${title}`
            }
          >
            {cover}
          </Link>
          <Link
            href={isDraft ? editUrl : creatorUrl}
            className="collection-row__copy"
          >
            <h3>{title}</h3>
            <p className={isDraft && !hasCover ? "collection-needs-cover" : ""}>
              {isDraft && !hasCover ? "Needs a cover image" : statusLine}
            </p>
            <p className="collection-row__mobile-value">
              {isDraft ? "Goal" : "Raised"}{" "}
              {isDraft
                ? formatMoney(goalAmount)
                : `${formatMoney(amountRaised)} of ${formatMoney(goalAmount)}`}
            </p>
          </Link>
          <div className="collection-row__value">
            <span>{isDraft ? "Goal" : "Raised"}</span>
            <strong>
              {isDraft
                ? formatMoney(goalAmount)
                : `${formatMoney(amountRaised)} of ${formatMoney(goalAmount)}`}
            </strong>
          </div>
          <div className="collection-row__actions">
            {isDraft ? (
              <>
                <Link
                  href={editUrl}
                  className="collection-button collection-button--teal collection-row__desktop-action"
                >
                  <CardIcon name="edit" />
                  Continue editing
                </Link>
                <Link
                  href={`${editUrl}&preview=true`}
                  className="collection-button collection-row__desktop-action"
                  aria-label={`Preview ${title}`}
                >
                  <CardIcon name="eye" />
                </Link>
              </>
            ) : (
              <Link
                href={creatorUrl}
                className="collection-button collection-row__desktop-action"
              >
                <CardIcon name="eye" />
                View
              </Link>
            )}
            {menu}
          </div>
        </article>
      );
    return (
      <article className="collection-card collection-card--creator">
        <Link
          href={creatorUrl}
          className="collection-cover"
          aria-label={`View ${title}`}
        >
          {cover}
        </Link>
        <div className="collection-body">
          <Link href={creatorUrl} className="collection-title">
            <h3>{title}</h3>
          </Link>
          <p className="collection-status">{statusLine}</p>
          <div className="collection-funding">
            <div>
              <strong>{formatMoney(amountRaised)}</strong>
              <span>of {formatMoney(goalAmount)}</span>
            </div>
            <b>{percentage}%</b>
          </div>
          {reportedProgress}
          <div className="collection-stats">
            <span>
              <CardIcon name="link" />
              {clicks} clicks
            </span>
            <span>
              <CardIcon name="calendar" />
              {calendarLabel}
            </span>
            <span>
              <CardIcon name="message" />
              {updates} updates
            </span>
          </div>
          <div className="collection-actions">
            <button
              type="button"
              className="collection-button collection-button--orange"
              onClick={() => onPostUpdate?.(campaign)}
            >
              <CardIcon name="edit" />
              Post update
            </button>
            <button
              type="button"
              className="collection-button"
              onClick={handleCopyLink}
            >
              <CardIcon name="link" />
              {copied ? "Copied" : "Copy link"}
            </button>
            {menu}
          </div>
          <span className="collection-sr" role="status">
            {copied ? "Campaign link copied" : ""}
          </span>
        </div>
      </article>
    );
  }
  /* =========================================================
     PUBLIC CARD — EXISTING APPEARANCE
  ========================================================= */

  if (isPublic) {
    return (
      <article className="campaign-card campaign-card--public">
        <Link href={publicUrl} className="campaign-card__public-image-wrap">
          <CampaignStorageImage
            src={coverImage || "/campaign-placeholder.jpg"}
            alt={title}
            className="campaign-card__image"
          />

          {campaign.category_name && (
            <span className="campaign-card__category">
              {campaign.category_name}
            </span>
          )}
        </Link>

        <div className="campaign-card__public-content">
          <div className="campaign-card__public-title-group">
            <Link
              href={publicUrl}
              className="campaign-card__title campaign-card__title--public"
            >
              {title}
            </Link>

            <p className="campaign-card__creator">
              by{" "}
              {campaign.creator_name ||
                campaign.organizer_name ||
                "Fundu Organizer"}
            </p>
          </div>

          <div className="campaign-card__progress-area">
            <div className="campaign-card__progress-track">
              <div
                className="campaign-card__progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="campaign-card__funding-row">
              <div>
                <strong>{formatMoney(amountRaised)}</strong>
                <span>raised</span>
              </div>

              <span>of {formatMoney(goalAmount)}</span>
            </div>
          </div>

          <div className="campaign-card__separator" />

          <div className="campaign-card__public-footer">
            <span className="campaign-card__days-left">
              {daysLeft === null
                ? "Ongoing"
                : daysLeft === 1
                  ? "1 day left"
                  : `${daysLeft} days left`}
            </span>

            <Link href={publicUrl} className="campaign-card__support">
              Support
            </Link>
          </div>
        </div>
      </article>
    );
  }

  /* =========================================================
     SHARED CREATOR CARD
     Dashboard and Campaigns list
  ========================================================= */

  return (
    <article
      className={`campaign-card campaign-card--creator ${isDraft ? "campaign-card--draft" : ""} ${isInactive ? "campaign-card--inactive" : ""}`}
    >
      <div className="creator-card__cover">
        {hasCover ? (
          <CampaignStorageImage
            src={coverImage}
            alt={`${title} cover`}
            className="creator-card__image"
            onError={() => setFailedCover(coverImage)}
          />
        ) : (
          <Link href={editUrl} className="creator-card__missing-cover">
            <CardIcon name="image" />
            <span>Add a cover image</span>
          </Link>
        )}

        <div className="creator-card__badge-wrap">
          {isDraft ? (
            <Badge status="Draft" />
          ) : isActive ? (
            <Badge status="Active" />
          ) : (
            <span className="creator-card__ended-badge">Ended</span>
          )}
        </div>
      </div>

      <div className="creator-card__body">
        <div className="creator-card__heading">
          <h3 title={title}>
            <Link href={creatorUrl}>{title}</Link>
          </h3>

          <p>{statusLine}</p>
        </div>

        <div className="creator-card__funding">
          <div className="creator-card__amount">
            <div>
              <strong>{formatMoney(amountRaised)}</strong>
              <span>of {formatMoney(goalAmount)}</span>
            </div>

            <span>{percentage}%</span>
          </div>

          <div
            className="creator-card__progress"
            role="progressbar"
            aria-label={`${title}: ${percentage}% of goal`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percentage}
          >
            <div
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <div className="creator-card__stats">
          <span>
            <CardIcon name="link" />
            {clicks} clicks
          </span>

          <span>
            <CardIcon name="calendar" />
            {calendarLabel}
          </span>

          <span>
            <CardIcon name="message" />
            {updates} updates
          </span>
        </div>

        <div className="creator-card__actions">
          {isDraft ? (
            <>
              <Link
                href={editUrl}
                className="creator-card__button creator-card__button--primary"
              >
                <CardIcon name="edit" />
                Continue editing
              </Link>

              <Link
                href={`${editUrl}&preview=true`}
                className="creator-card__button creator-card__preview"
                aria-label={`Preview ${title}`}
                title="Preview campaign"
              >
                <CardIcon name="eye" />
                <span>Preview</span>
              </Link>
            </>
          ) : isActive ? (
            <>
              <button
                type="button"
                className="creator-card__button creator-card__button--orange"
                onClick={() => onPostUpdate?.(campaign)}
              >
                <CardIcon name="edit" />
                Post update
              </button>

              <button
                type="button"
                className="creator-card__button"
                onClick={handleCopyLink}
              >
                <CardIcon name="link" />
                {copied ? "Copied" : "Copy link"}
              </button>
            </>
          ) : (
            <Link
              href={creatorUrl}
              className="creator-card__button creator-card__button--primary"
            >
              <CardIcon name="eye" />
              View
            </Link>
          )}

          <div className="creator-card__menu-wrap" ref={menuRef}>
            <button
              type="button"
              ref={menuButtonRef}
              className="creator-card__button creator-card__more"
              aria-label={`More actions for ${title}`}
              aria-expanded={menuOpen}
              title="More actions"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <CardIcon name="more" />
            </button>

            {menuOpen && (
              <div className="creator-card__menu">
                {isActive && (
                  <>
                    <Link href={creatorUrl} onClick={() => setMenuOpen(false)}>
                      View details
                    </Link>

                    <Link href={editUrl} onClick={() => setMenuOpen(false)}>
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        onEnd?.(campaign);
                      }}
                    >
                      End campaign
                    </button>
                  </>
                )}

                <button
                  type="button"
                  className="creator-card__delete"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete?.(campaign);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <span className="creator-card__announcement" role="status">
          {copied ? "Campaign link copied." : ""}
        </span>
      </div>
    </article>
  );
}
