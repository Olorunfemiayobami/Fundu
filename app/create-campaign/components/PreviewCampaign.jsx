import React from "react";
import Badge from "../../../components/ui/Badge";
import CategoryBadge from "../../../components/ui/CategoryBadge"; // Universal category component

export default function PreviewCampaign({
  campaignData,
  blocks,
  onNext,
  onBack,
}) {
  // Renders media in the 4-column grid as per web specs
  const renderMediaRow = (mediaArray) => {
    if (!mediaArray || mediaArray.length === 0) return null;
    return (
      <div className="preview-media-row">
        {mediaArray.map((url, idx) => (
          <div key={idx} className="preview-media-item">
            <img src={url} alt={`Campaign media ${idx + 1}`} />
          </div>
        ))}
      </div>
    );
  };

  return (
    /* 6. Main container with global form padding */
    <div className="form-container-main">
      <div className="preview-web-wrapper">
        {/* 1. Hero Image */}
        <div className="preview-hero-container">
          <img
            src={campaignData.imagePreview || "/placeholder-hero.jpg"}
            className="preview-hero-img"
            alt="Campaign Hero"
          />
        </div>

        <div className="preview-content-body">
          {/* 2. Meta Row (Category & Status) */}
          <div className="preview-meta-row">
            <CategoryBadge category={campaignData.category} />
            <Badge status="Draft" />
          </div>

          {/* 3. Header Info */}
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
                ${Number(campaignData.goal || 0).toLocaleString()}
              </h2>
            </div>
          </div>

          <hr className="preview-divider" />

          {/* 4 & 5. Dynamic Content Blocks */}
          <div className="preview-story-container">
            {blocks.map((block) => (
              <div key={block.id} className="block-spacing">
                {/* Section Block Layout */}
                {block.type === "section" && (
                  <div className="section-block">
                    <h3 className="section-block-title">{block.title}</h3>
                    <p className="section-block-body">{block.content}</p>
                  </div>
                )}

                {/* Text Block Layout */}
                {block.type === "text" && (
                  <p className="text-block-style">{block.content}</p>
                )}

                {/* Media Row Layout */}
                {block.type === "media" && renderMediaRow(block.media)}
              </div>
            ))}
          </div>
        </div>
        <div className="form-actions-story">
          <button className="btn-back-basics" onClick={onBack}>
            Edit Story
          </button>
          <button className="btn-continue-preview" onClick={onNext}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
