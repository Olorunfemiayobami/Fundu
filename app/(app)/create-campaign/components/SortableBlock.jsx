"use client";

import React, { useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { supabase } from "@/lib/supabase";

export default function SortableBlock({ block, removeBlock, updateBlockData }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");

  const fileInputRef = useRef(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.6 : 1,
    position: "relative",
  };

  const isImageBlock = block.type === "image" || block.type === "media";

  /* =========================================================
     IMAGE UPLOAD
  ========================================================= */

  const handleFileChange = async (event) => {
    const input = event.target;

    const files = Array.from(input.files || []);

    const currentMedia = Array.isArray(block.media) ? block.media : [];

    const availableSlots = 4 - currentMedia.length;

    const selectedFiles = files
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, availableSlots);

    /*
     * Reset the input immediately so the same image
     * can be selected again later if necessary.
     */

    input.value = "";

    if (selectedFiles.length === 0) {
      return;
    }

    setImageUploadError("");
    setIsUploadingImages(true);

    try {
      /*
       * Make sure the user is signed in.
       */

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        throw authError;
      }

      if (!user) {
        throw new Error(
          "You need to sign in before uploading campaign images.",
        );
      }

      /*
       * Upload each selected image to Supabase Storage.
       */

      const uploadedUrls = [];

      for (const file of selectedFiles) {
        const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";

        const safeExtension = extension.replace(/[^a-z0-9]/g, "") || "jpg";

        const uniqueFileName = `${Date.now()}-${crypto.randomUUID()}.${safeExtension}`;

        /*
         * Each user's Story images are kept inside
         * their own folder.
         */

        const filePath = `${user.id}/story/${uniqueFileName}`;

        const { error: uploadError } = await supabase.storage
          .from("campaign-images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

        if (uploadError) {
          throw uploadError;
        }

        /*
         * Get the permanent public URL.
         */

        const { data: publicUrlData } = supabase.storage
          .from("campaign-images")
          .getPublicUrl(filePath);

        const publicUrl = publicUrlData?.publicUrl;

        if (!publicUrl) {
          throw new Error(
            "The image was uploaded but its public URL could not be created.",
          );
        }

        uploadedUrls.push(publicUrl);
      }

      /*
       * Store permanent Supabase URLs in the Story block.
       *
       * These are the values that will eventually be saved
       * inside campaigns.story_blocks.
       */

      if (uploadedUrls.length > 0) {
        updateBlockData(block.id, {
          media: [...currentMedia, ...uploadedUrls],
        });
      }
    } catch (error) {
      console.error("Story image upload error:", error);

      setImageUploadError(
        error?.message || "We couldn't upload your images. Please try again.",
      );
    } finally {
      setIsUploadingImages(false);
    }
  };

  /* =========================================================
     REMOVE IMAGE
  ========================================================= */

  const removeImage = (index) => {
    const updatedMedia = (block.media || []).filter(
      (_, currentIndex) => currentIndex !== index,
    );

    updateBlockData(block.id, {
      media: updatedMedia,
    });
  };

  /* =========================================================
     TEXT
  ========================================================= */

  const handleTextChange = (field, value) => {
    updateBlockData(block.id, {
      [field]: value,
    });
  };

  /* =========================================================
     VIDEO
  ========================================================= */

  const videoEmbedUrl =
    block.type === "video" ? getVideoEmbedUrl(block.url || "") : null;

  /* =========================================================
     ICON
  ========================================================= */

  const renderBlockIcon = () => {
    if (isImageBlock) {
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />

          <circle cx="8.5" cy="8.5" r="1.5" />

          <polyline points="21 15 16 10 5 21" />
        </svg>
      );
    }

    switch (block.type) {
      case "video":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />

            <path d="M10 9L15 12L10 15V9Z" />
          </svg>
        );

      case "section":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        );

      case "text":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 7V4h16v3M9 20h6M12 4v16" />
          </svg>
        );

      default:
        return null;
    }
  };

  function getBlockLabel() {
    if (isImageBlock) {
      return "Image Block";
    }

    if (block.type === "video") {
      return "Video Block";
    }

    if (block.type === "section") {
      return "Section Block";
    }

    if (block.type === "text") {
      return "Text Block";
    }

    return "Story Block";
  }

  return (
    <div ref={setNodeRef} style={style} className="story-block-card">
      <div className="block-header">
        <div className="block-header-left">
          {/* DRAG HANDLE */}

          <div className="drag-handle-container" {...attributes} {...listeners}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M7.49722 10.8304C7.95736 10.8304 8.33037 10.4574 8.33037 9.99722C8.33037 9.53708 7.95736 9.16406 7.49722 9.16406C7.03708 9.16406 6.66406 9.53708 6.66406 9.99722C6.66406 10.4574 7.03708 10.8304 7.49722 10.8304Z"
                stroke="#888888"
                strokeWidth="1.66631"
              />

              <path
                d="M7.49722 4.99834C7.95736 4.99834 8.33037 4.62532 8.33037 4.16519C8.33037 3.70505 7.95736 3.33203 7.49722 3.33203C7.03708 3.33203 6.66406 3.70505 6.66406 4.16519C6.66406 4.62532 7.03708 4.99834 7.49722 4.99834Z"
                stroke="#888888"
                strokeWidth="1.66631"
              />

              <path
                d="M7.49722 16.6624C7.95736 16.6624 8.33037 16.2894 8.33037 15.8292C8.33037 15.3691 7.95736 14.9961 7.49722 14.9961C7.03708 14.9961 6.66406 15.3691 6.66406 15.8292C6.66406 16.2894 7.03708 16.6624 7.49722 16.6624Z"
                stroke="#888888"
                strokeWidth="1.66631"
              />

              <path
                d="M12.4972 10.8304C12.9574 10.8304 13.3304 10.4574 13.3304 9.99722C13.3304 9.53708 12.9574 9.16406 12.4972 9.16406C12.0371 9.16406 11.6641 9.53708 11.6641 9.99722C11.6641 10.4574 12.0371 10.8304 12.4972 10.8304Z"
                stroke="#888888"
                strokeWidth="1.66631"
              />

              <path
                d="M12.4972 4.99834C12.9574 4.99834 13.3304 4.62532 13.3304 4.16519C13.3304 3.70505 12.9574 3.33203 12.4972 3.33203C12.0371 3.33203 11.6641 3.70505 11.6641 4.16519C11.6641 4.62532 12.0371 4.99834 12.4972 4.99834Z"
                stroke="#888888"
                strokeWidth="1.66631"
              />

              <path
                d="M12.4972 16.6624C12.9574 16.6624 13.3304 16.2894 13.3304 15.8292C13.3304 15.3691 12.9574 14.9961 12.4972 14.9961C12.0371 14.9961 11.6641 15.3691 11.6641 15.8292C11.6641 16.2894 12.0371 16.6624 12.4972 16.6624Z"
                stroke="#888888"
                strokeWidth="1.66631"
              />
            </svg>
          </div>

          <div className="block-label-group">
            {renderBlockIcon()}

            <span className="block-type-label">{getBlockLabel()}</span>
          </div>
        </div>

        <div className="block-header-right">
          {/* COLLAPSE */}

          <button
            type="button"
            className="collapse-btn"
            onClick={() => setIsExpanded((current) => !current)}
            style={{
              transform: isExpanded ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.2s ease",
            }}
            aria-label={isExpanded ? "Collapse block" : "Expand block"}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M18 14L10 6L2 14"
                stroke="#4A5565"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* DELETE */}

          <button
            type="button"
            onClick={() => removeBlock(block.id)}
            className="block-control-btn"
            aria-label="Delete block"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fc1010"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="block-body">
          {/* TEXT */}

          {block.type === "text" && (
            <textarea
              className="block-textarea"
              placeholder="Enter your text..."
              value={block.content || ""}
              onChange={(event) =>
                handleTextChange("content", event.target.value)
              }
            />
          )}

          {/* SECTION */}

          {block.type === "section" && (
            <>
              <input
                className="block-input"
                placeholder="Section title"
                value={block.title || ""}
                onChange={(event) =>
                  handleTextChange("title", event.target.value)
                }
              />

              <textarea
                className="block-textarea"
                placeholder="Section content..."
                value={block.content || ""}
                onChange={(event) =>
                  handleTextChange("content", event.target.value)
                }
              />
            </>
          )}

          {/* IMAGE */}

          {isImageBlock && (
            <div className="media-block-wrapper">
              <p className="media-counter">
                Images {block.media?.length || 0}/4
              </p>

              {(block.media?.length || 0) < 4 && (
                <div
                  className={`media-dropzone ${
                    isUploadingImages ? "media-dropzone--uploading" : ""
                  }`}
                  onClick={() => {
                    if (!isUploadingImages) {
                      fileInputRef.current?.click();
                    }
                  }}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    disabled={isUploadingImages}
                    hidden
                  />

                  {isUploadingImages ? (
                    <>
                      <div className="story-image-upload-spinner" />

                      <h3>Uploading images...</h3>

                      <p>Please wait while your images are saved.</p>
                    </>
                  ) : (
                    <>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 3V15"
                          stroke="#333333"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />

                        <path
                          d="M17 8L12 3L7 8"
                          stroke="#333333"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />

                        <path
                          d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15"
                          stroke="#333333"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>

                      <h3>Upload images</h3>

                      <p>
                        {4 - (block.media?.length || 0)}{" "}
                        {4 - (block.media?.length || 0) === 1
                          ? "slot"
                          : "slots"}{" "}
                        remaining
                      </p>
                    </>
                  )}
                </div>
              )}

              {imageUploadError && (
                <p className="story-image-upload-error">{imageUploadError}</p>
              )}

              {block.media?.length > 0 && (
                <div className="media-preview-grid">
                  {block.media.map((url, idx) => (
                    <div key={`${url}-${idx}`} className="media-preview-item">
                      <img src={url} alt={`Campaign image ${idx + 1}`} />

                      <button
                        type="button"
                        className="remove-img-btn"
                        onClick={() => removeImage(idx)}
                        aria-label={`Remove image ${idx + 1}`}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#fc1010"
                          strokeWidth="3"
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VIDEO */}

          {block.type === "video" && (
            <div className="video-block-wrapper">
              <div className="video-block-field">
                <label htmlFor={`video-url-${block.id}`}>Video link</label>

                <input
                  id={`video-url-${block.id}`}
                  type="url"
                  className="block-input"
                  placeholder="Paste a YouTube or Vimeo link"
                  value={block.url || ""}
                  onChange={(event) =>
                    handleTextChange("url", event.target.value)
                  }
                />

                <p className="video-block-helper">
                  Paste the link to your video from YouTube or Vimeo.
                </p>
              </div>

              {block.url?.trim() && videoEmbedUrl && (
                <div className="video-embed-preview">
                  <iframe
                    src={videoEmbedUrl}
                    title="Campaign video preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}

              {block.url?.trim() && !videoEmbedUrl && (
                <p className="video-block-error">
                  Enter a valid YouTube or Vimeo video link.
                </p>
              )}
            </div>
          )}
        </div>
      )}
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

    /* YouTube short links */

    if (hostname === "youtu.be") {
      const videoId = url.pathname.split("/").filter(Boolean)[0];

      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    /* YouTube */

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

    /* Vimeo */

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
