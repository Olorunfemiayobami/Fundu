import React from "react";

const CampaignStory = ({ storyBlocks, storyContent, organiserName }) => {
  let blocks = [];

  if (storyBlocks) {
    blocks = typeof storyBlocks === "string" ? JSON.parse(storyBlocks) : storyBlocks;
  }

  // Fallback to storyContent if blocks are empty
  if (blocks.length === 0 && storyContent) {
    blocks = [{ type: "text", content: storyContent }];
  }

  if (blocks.length === 0) {
    return (
      <section className="story-section">
        <h3 className="font-urbanist">Campaign Story</h3>
        <p className="no-story">No story details provided for this campaign.</p>
      </section>
    );
  }

  return (
    <section className="story-section">
      <h3 className="section-title font-urbanist">Campaign Story</h3>

      <div className="story-content">
        {blocks.map((block, index) => (
          <div key={index} className={`story-block block-${block.type}`}>
            
            {/* 1. Handle "section" type (Matches your Preview logic) */}
            {block.type === "section" && (
              <div className="section-block">
                {block.title && <h4 className="story-section-title">{block.title}</h4>}
                <p className="story-text">{block.content}</p>
              </div>
            )}

            {/* 2. Handle standard "text" type */}
            {block.type === "text" && (
              <p className="story-text">{block.content}</p>
            )}

            {/* 3. Handle "image" or "media" type */}
            {(block.type === "image" || block.type === "media") && (
              <div className="story-image-wrapper">
                {/* If it's the media array from your preview, we show the first one or map them */}
                {Array.isArray(block.media) ? (
                  block.media.map((url, mIdx) => (
                    <img key={mIdx} src={url} alt="Campaign visual" className="story-image" />
                  ))
                ) : (
                  <img src={block.content} alt="Story visual" className="story-image" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="story-footer">
        <div className="trust-banner">
          <p className="disclaimer">
            Fundu does not hold funds. Donations are processed by trusted
            providers and sent directly to{" "}
            <strong>{organiserName || "the organiser"}</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CampaignStory;