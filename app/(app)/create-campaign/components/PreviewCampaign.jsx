"use client";

import React from "react";

import Badge from "@/components/ui/Badge";
import CategoryBadge from "@/components/ui/CategoryBadge";

export default function PreviewCampaign({
  campaignData,
  blocks,
  onNext,
  onBack,
  onSaveAndExit,
  isSaving,
}) {
  const renderImageRow = (imageArray) => {
    if (!imageArray || imageArray.length === 0) {
      return null;
    }

    return (
      <div className="preview-media-row">
        {imageArray.map((url, idx) => (
          <div key={`${url}-${idx}`} className="preview-media-item">
            <img src={url} alt={`Campaign image ${idx + 1}`} />
          </div>
        ))}
      </div>
    );
  };

  const renderVideo = (videoUrl, blockId) => {
    const embedUrl = getVideoEmbedUrl(videoUrl);

    if (!embedUrl) {
      return null;
    }

    return (
      <div className="preview-video-embed">
        <iframe
          src={embedUrl}
          title={`Campaign video ${blockId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  };

  const goalAmount = Number(campaignData.goal || 0);

  const coverImage =
    campaignData.imagePreview ||
    campaignData.coverImage ||
    campaignData.cover_image ||
    campaignData.image_url ||
    campaignData.preview_image ||
    "";

  const formatEndDate = (dateString) => {
    if (!dateString) {
      return "No end date selected";
    }

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="form-container-main">
      <div className="preview-web-wrapper">
        {/* COVER IMAGE */}

        {coverImage && (
          <div className="preview-hero-container">
            <img
              src={coverImage}
              alt={
                campaignData.title
                  ? `${campaignData.title} cover`
                  : "Campaign cover"
              }
              className="preview-hero-img"
            />
          </div>
        )}

        {/* META */}

        <div className="preview-meta-row">
          <CategoryBadge category={campaignData.category} />

          <Badge status="Draft" />
        </div>

        {/* HEADER */}

        <div className="preview-header-flex">
          <div className="header-left">
            <h1 className="preview-title-text">
              {campaignData.title || "Untitled Campaign"}
            </h1>

            <p className="preview-author-text">
              by {campaignData.organiser || "Organizer Name"}
            </p>
          </div>

          <div className="header-right">
            <h2 className="preview-amount-text">
              ₦{goalAmount.toLocaleString("en-NG")}
            </h2>

            <p className="preview-goal-label">Fundraising goal</p>
          </div>
        </div>

        <hr className="preview-divider" />

        {/* STORY */}

        <div className="preview-story-container">
          {blocks.length === 0 ? (
            <div className="preview-empty-story">
              <p>No story content has been added yet.</p>
            </div>
          ) : (
            blocks.map((block) => (
              <div key={block.id} className="block-spacing">
                {block.type === "section" && (
                  <div className="section-block">
                    {block.title && (
                      <h3 className="section-block-title">{block.title}</h3>
                    )}

                    {block.content && (
                      <p className="section-block-body">{block.content}</p>
                    )}

                    {renderImageRow(block.media)}
                  </div>
                )}

                {block.type === "text" && block.content && (
                  <p className="text-block-style">{block.content}</p>
                )}

                {(block.type === "image" || block.type === "media") &&
                  renderImageRow(block.media)}

                {block.type === "video" && renderVideo(block.url, block.id)}
              </div>
            ))
          )}
        </div>

        {/* END DATE */}

        <div className="preview-end-date-card">
          <p className="preview-end-date-label">Campaign end date</p>

          <p className="preview-end-date-value">
            {formatEndDate(campaignData.duration)}
          </p>
        </div>

        {/* ACTIONS */}

        <div className="campaign-bottom-actions">
          <button
            type="button"
            className="campaign-action-save-exit"
            onClick={onSaveAndExit}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save & Exit"}
          </button>

          <div className="campaign-bottom-actions__right">
            <button
              type="button"
              className="campaign-action-secondary"
              onClick={onBack}
              disabled={isSaving}
            >
              Edit Story
            </button>

            <button
              type="button"
              className="campaign-action-primary"
              onClick={onNext}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Continue to Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   VIDEO URL HELPER
========================================================= */

function getVideoEmbedUrl(value) {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value.trim());

    const hostname = url.hostname.replace(/^www\./, "").toLowerCase();

    if (hostname === "youtu.be") {
      const videoId = url.pathname.split("/").filter(Boolean)[0];

      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

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
