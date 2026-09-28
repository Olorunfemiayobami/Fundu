"use client";
import CampaignStorageImage from "@/components/campaigns/CampaignStorageImage";

export function StoryBlocks({ blocks, fallbackText, onViewImage }) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="public-campaign-story-fallback">
        <PublicStoryText
          text={fallbackText || "The organizer has not added a story yet."}
        />
      </div>
    );
  }

  return (
    <div className="public-campaign-story">
      {blocks.map((block, index) => {
        if (!block) return null;
        if (typeof block === "string")
          return (
            <p className="public-story-text" key={`text-${index}`}>
              {block}
            </p>
          );
        if (block.type === "section") {
          return (
            <div
              className="public-story-section"
              key={block.id || `story-${index}`}
            >
              {block.title && <h3>{block.title}</h3>}

              {block.content && <PublicStoryText text={block.content} />}

              {getPublicStoryImages(block).length > 0 && (
                <StoryImages
                  images={getPublicStoryImages(block)}
                  onViewImage={onViewImage}
                />
              )}
            </div>
          );
        }

        if (block.type === "text") {
          return block.content ? (
            <p className="public-story-text" key={block.id || `story-${index}`}>
              {block.content}
            </p>
          ) : null;
        }

        /*
         * Retain support for older campaigns using
         * the "media" block type.
         */

        if (block.type === "image" || block.type === "media") {
          return (
            <StoryImages
              key={block.id || `story-${index}`}
              images={getPublicStoryImages(block)}
              onViewImage={onViewImage}
            />
          );
        }

        if (block.type === "video") {
          return (
            <StoryVideo
              key={block.id || `story-${index}`}
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

function StoryImages({ images, onViewImage }) {
  const Photo = onViewImage ? "button" : "div";
  if (!images?.length) {
    return null;
  }

  return (
    <div className="public-story-media-grid">
      {images
        .filter((url) => typeof url === "string" && url.trim())
        .map((url, index) => (
          <Photo
            type={onViewImage ? "button" : undefined}
            className="public-story-media-item"
            key={`${url}-${index}`}
            onClick={() =>
              onViewImage?.(url, `Campaign story photo ${index + 1}`)
            }
            aria-label={onViewImage ? `View campaign story photo ${index + 1}` : undefined}
          >
            <CampaignStorageImage
              src={url}
              alt={`Campaign story image ${index + 1}`}
            />
          </Photo>
        ))}
    </div>
  );
}

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

function getPublicStoryImages(block) {
  for (const key of ["media", "images", "image_urls"]) {
    if (Array.isArray(block[key]))
      return block[key].filter(
        (value) =>
          typeof value === "string" &&
          value.trim() &&
          !value.startsWith("blob:"),
      );
  }
  const single =
    block.src ||
    block.imageUrl ||
    block.image_url ||
    block.image ||
    (block.type !== "video" ? block.url : "");
  return typeof single === "string" &&
    single.trim() &&
    !single.startsWith("blob:")
    ? [single]
    : [];
}

function PublicStoryText({ text }) {
  const paragraphs = String(text || "")
    .split(/\n\s*\n/)
    .filter((value) => value.trim());
  return (
    <>
      {paragraphs.map((paragraph, index) => {
        const lines = paragraph.trim().split("\n");
        if (lines.every((line) => /^\s*(?:[-*•]|\d+[.)])\s+/.test(line))) {
          return (
            <ul className="pc-story-list" key={index}>
              {lines.map((line, lineIndex) => {
                const content = line.replace(/^\s*(?:[-*•]|\d+[.)])\s+/, "");
                const amount = content.match(/₦[\d,.]+\s*$/);
                return (
                  <li key={lineIndex}>
                    <span>
                      {amount
                        ? content
                            .slice(0, amount.index)
                            .replace(/[:–—-]\s*$/, "")
                            .trim()
                        : content}
                    </span>
                    {amount && <strong>{amount[0]}</strong>}
                  </li>
                );
              })}
            </ul>
          );
        }
        return (
          <p className="public-story-text" key={index}>
            {paragraph}
          </p>
        );
      })}
    </>
  );
}

export function CampaignCover({src,title,onError}) {
  return <div className="pc-cover">{src ? <CampaignStorageImage src={src} alt={`${title || "Campaign"} cover`} onError={onError}/> : <div className="pc-cover__fallback">{title || "Campaign"}</div>}</div>;
}
export function CampaignFundingProgress({amountRaised,goalAmount,percentage,statusText,infoIcon}) {
  const money=value=>new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(Number(value||0));
  return <><div className="pc-raised"><strong>{money(amountRaised)}</strong><span>{percentage}%</span></div><p className="pc-goal">raised of {money(goalAmount)} goal</p><div className="pc-progress" role="progressbar" aria-label="Campaign fundraising progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage} aria-valuetext={`${money(amountRaised)} reported raised of ${money(goalAmount)} goal`}><div style={{width:percentage+"%"}}/></div><div className="pc-progress-meta"><span>{infoIcon}Reported by the organizer</span><strong>{statusText}</strong></div></>;
}
