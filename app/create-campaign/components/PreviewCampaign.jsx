import React from "react";
import Badge from "../../../components/ui/Badge";
import CategoryBadge from "../../../components/ui/CategoryBadge";

export default function PreviewCampaign({
  campaignData,
  blocks,
  onNext,
  onBack,
}) {
  const renderMediaRow = (mediaArray) => {
    if (!mediaArray || mediaArray.length === 0) {
      return null;
    }

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

  const goalAmount = Number(campaignData.goal || 0);

  const formatEndDate = (dateString) => {
    if (!dateString) return "No end date selected";

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
        <div className="preview-meta-row">
          <CategoryBadge category={campaignData.category} />
          <Badge status="Draft" />
        </div>

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
              ₦{goalAmount.toLocaleString()}
            </h2>
          </div>
        </div>

        <hr className="preview-divider" />

        <div className="preview-story-container">
          {blocks.map((block) => (
            <div key={block.id} className="block-spacing">
              {block.type === "section" && (
                <div className="section-block">
                  <h3 className="section-block-title">{block.title}</h3>

                  <p className="section-block-body">{block.content}</p>
                </div>
              )}

              {block.type === "text" && (
                <p className="text-block-style">{block.content}</p>
              )}

              {block.type === "media" && renderMediaRow(block.media)}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "24px",
            marginBottom: "32px",
            padding: "16px",
            border: "1px solid #E6E6E6",
            borderRadius: "10px",
            backgroundColor: "#FAFAFA",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "#666",
              marginBottom: "4px",
            }}
          >
            Campaign end date
          </p>

          <p
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#333",
              margin: 0,
            }}
          >
            {formatEndDate(campaignData.duration)}
          </p>
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
