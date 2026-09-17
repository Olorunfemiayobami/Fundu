"use client";

import Link from "next/link";
import "@/styles/campaign-card.css";

export default function CampaignCard({
  campaign,
  variant = "creator",
  onShare,
  onPostUpdate,
  onDelete,
}) {
  if (!campaign) return null;

  const isPublic = variant === "public";

  const status = campaign.status?.toLowerCase() || "draft";

  const hasExpired =
    campaign.end_date && new Date(campaign.end_date) < new Date();

  const isDraft = status === "draft";

  const isInactive =
    status === "inactive" ||
    status === "ended" ||
    status === "completed" ||
    (status === "active" && hasExpired);

  const isActive = status === "active" && !isInactive;

  const goalAmount = Number(campaign.goal_amount || 0);
  const amountRaised = Number(campaign.amount_raised || 0);

  const progress =
    goalAmount > 0 ? Math.min((amountRaised / goalAmount) * 100, 100) : 0;

  const coverImage =
    campaign.cover_image ||
    campaign.image_url ||
    campaign.preview_image ||
    "/campaign-placeholder.jpg";

  const currency = campaign.currency || "NGN";

  function formatMoney(amount) {
    try {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      return `₦${Number(amount || 0).toLocaleString()}`;
    }
  }

  function getDaysActive() {
    if (!campaign.start_date && !campaign.created_at) {
      return 0;
    }

    const start = new Date(campaign.start_date || campaign.created_at);

    const end =
      isInactive && campaign.end_date
        ? new Date(campaign.end_date)
        : new Date();

    const difference = end.getTime() - start.getTime();

    return Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24)));
  }

  function getDaysLeft() {
    if (!campaign.end_date) return null;

    const end = new Date(campaign.end_date);
    const now = new Date();

    const difference = end.getTime() - now.getTime();

    return Math.max(0, Math.ceil(difference / (1000 * 60 * 60 * 24)));
  }

  function getLastUpdated() {
    if (!campaign.updated_at) {
      return "N/A";
    }

    const updated = new Date(campaign.updated_at);
    const now = new Date();

    const difference = now.getTime() - updated.getTime();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (days <= 0) return "Today";
    if (days === 1) return "1 day ago";

    return `${days} days ago`;
  }

  function getEndedDate() {
    const dateValue =
      campaign.ended_at || campaign.end_date || campaign.updated_at;

    if (!dateValue) return "N/A";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return "N/A";

    return new Intl.DateTimeFormat("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  }

  const daysActive = getDaysActive();
  const daysLeft = getDaysLeft();

  const clicks =
    campaign.metrics?.donation_clicks ?? campaign.donation_clicks ?? 0;

  const comments = campaign.comments_count ?? campaign.comment_count ?? 0;

  const updates = campaign.updates_count ?? campaign.update_count ?? 0;

  /*
    ========================================
    PUBLIC / EXPLORE CARD
    ========================================
  */

  if (isPublic) {
    return (
      <article className="campaign-card campaign-card--public">
        <Link
          href={`/campaign/${campaign.id}`}
          className="campaign-card__public-image-wrap"
        >
          <img
            src={coverImage}
            alt={campaign.title || "Campaign"}
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
              href={`/campaign/${campaign.id}`}
              className="campaign-card__title campaign-card__title--public"
            >
              {campaign.title || "Untitled Campaign"}
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
                <strong>{formatMoney(amountRaised)}</strong> <span>raised</span>
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

            <Link
              href={`/campaign/${campaign.id}`}
              className="campaign-card__support"
            >
              Support
            </Link>
          </div>
        </div>
      </article>
    );
  }

  /*
    ========================================
    CREATOR / MY CAMPAIGNS CARD
    ========================================
  */

  return (
    <article
      className={`campaign-card campaign-card--creator ${
        isDraft ? "campaign-card--draft" : ""
      } ${isInactive ? "campaign-card--inactive" : ""}`}
    >
      <div className="campaign-card__image-wrap">
        <img
          src={coverImage}
          alt={campaign.title || "Campaign"}
          className="campaign-card__image"
        />

        <span
          className={`campaign-card__status ${
            isDraft
              ? "campaign-card__status--draft"
              : isInactive
                ? "campaign-card__status--inactive"
                : "campaign-card__status--active"
          }`}
        >
          {isDraft ? "Draft" : isInactive ? "Ended" : "Active"}
        </span>
      </div>

      <div className="campaign-card__creator-content">
        <h3 className="campaign-card__title">
          {campaign.title || "Untitled Campaign"}
        </h3>

        <div className="campaign-card__amount">
          <div className="campaign-card__amount-line">
            <strong>
              {formatMoney(
                isDraft && !campaign.amount_raised ? goalAmount : amountRaised,
              )}
            </strong>

            <span>
              {isDraft
                ? "to be raised"
                : `raised of ${formatMoney(goalAmount)} goal`}
            </span>
          </div>

          <div
            className={`campaign-card__stats ${
              isDraft ? "campaign-card__disabled" : ""
            }`}
          >
            <div className="campaign-card__stat">
              <span className="campaign-card__stat-label">Clicks</span>

              <strong>{isDraft ? 0 : clicks}</strong>
            </div>

            <div className="campaign-card__stat">
              <span className="campaign-card__stat-label">Days Active</span>

              <strong>{isDraft ? 0 : daysActive}</strong>
            </div>
          </div>
        </div>

        <div
          className={`campaign-card__engagement ${
            isDraft ? "campaign-card__disabled" : ""
          }`}
        >
          <span>
            {isDraft ? 0 : comments} {comments === 1 ? "comment" : "comments"}
          </span>

          <span>
            {isDraft ? 0 : updates} {updates === 1 ? "update" : "updates"}
          </span>
        </div>

        <div
          className={`campaign-card__last-updated ${
            isDraft ? "campaign-card__disabled" : ""
          }`}
        >
          <span>{isInactive ? "Ended:" : "Last updated:"}</span>

          <strong>
            {isDraft ? "N/A" : isInactive ? getEndedDate() : getLastUpdated()}
          </strong>
        </div>

        {/* ========================================
            CARD ACTIONS
        ======================================== */}

        <div className="campaign-card__actions">
          {/* ACTIVE */}

          {isActive && (
            <>
              <Link
                href={`/campaigns/${campaign.id}`}
                className="campaign-card__button campaign-card__button--outline"
              >
                <img
                  src="/view.svg"
                  alt=""
                  className="campaign-card__button-icon"
                  aria-hidden="true"
                />
                View
              </Link>

              <button
                type="button"
                className="campaign-card__button campaign-card__button--outline"
                onClick={() => onShare?.(campaign)}
              >
                <img
                  src="/share.svg"
                  alt=""
                  className="campaign-card__button-icon"
                  aria-hidden="true"
                />
                Share
              </button>
            </>
          )}

          {/* DRAFT */}

          {isDraft && (
            <>
              <Link
                href={`/create-campaign?campaign=${campaign.id}`}
                className="campaign-card__button campaign-card__button--outline"
              >
                <img
                  src="/edit.svg"
                  alt=""
                  className="campaign-card__button-icon"
                  aria-hidden="true"
                />
                Edit
              </Link>

              <button
                type="button"
                className="campaign-card__button campaign-card__button--outline campaign-card__button--delete"
                onClick={() => onDelete?.(campaign)}
              >
                <img
                  src="/delete.svg"
                  alt=""
                  className="campaign-card__button-icon"
                  aria-hidden="true"
                />
                Delete
              </button>
            </>
          )}

          {/* INACTIVE */}

          {isInactive && (
            <>
              <Link
                href={`/campaigns/${campaign.id}`}
                className="campaign-card__button campaign-card__button--outline"
              >
                <img
                  src="/view.svg"
                  alt=""
                  className="campaign-card__button-icon"
                  aria-hidden="true"
                />
                View
              </Link>

              <button
                type="button"
                className="campaign-card__button campaign-card__button--outline"
                onClick={() => onShare?.(campaign)}
              >
                <img
                  src="/share.svg"
                  alt=""
                  className="campaign-card__button-icon"
                  aria-hidden="true"
                />
                Share
              </button>
            </>
          )}
        </div>

        {/* ========================================
            POST UPDATE
        ======================================== */}

        <button
          type="button"
          className={`campaign-card__button campaign-card__button--primary ${
            isDraft ? "campaign-card__button--disabled" : ""
          }`}
          disabled={isDraft}
          onClick={() => {
            if (!isDraft) {
              onPostUpdate?.(campaign);
            }
          }}
        >
          <img
            src="/post.svg"
            alt=""
            className="campaign-card__button-icon"
            aria-hidden="true"
          />

          {isInactive ? "Post Final Update" : "Post Update"}
        </button>

        <p
          className={`campaign-card__helper ${
            isDraft ? "campaign-card__disabled" : ""
          }`}
        >
          {isInactive
            ? "Let your supporters know how the campaign ended."
            : "Let your supporters know how their funds are being used."}
        </p>
      </div>
    </article>
  );
}
