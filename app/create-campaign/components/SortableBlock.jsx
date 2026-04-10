import React, { useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableBlock({ block, removeBlock, updateBlockData }) {
  const [isExpanded, setIsExpanded] = useState(true);
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

  // Logic to handle functional file uploads (Max 4 slots as per design)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const currentMedia = block.media || [];

    const availableSlots = 4 - currentMedia.length;
    const newFiles = files
      .slice(0, availableSlots)
      .map((file) => URL.createObjectURL(file));

    if (newFiles.length > 0) {
      updateBlockData(block.id, { media: [...currentMedia, ...newFiles] });
    }
  };

  const removeImage = (index) => {
    const updatedMedia = block.media.filter((_, i) => i !== index);
    updateBlockData(block.id, { media: updatedMedia });
  };

  // Generic handler for input/textarea changes
  const handleTextChange = (field, value) => {
    updateBlockData(block.id, { [field]: value });
  };

  const renderBlockIcon = () => {
    switch (block.type) {
      case "media":
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
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.49722 4.99834C7.95736 4.99834 8.33037 4.62532 8.33037 4.16519C8.33037 3.70505 7.95736 3.33203 7.49722 3.33203C7.03708 3.33203 6.66406 3.70505 6.66406 4.16519C6.66406 4.62532 7.03708 4.99834 7.49722 4.99834Z"
                stroke="#888888"
                strokeWidth="1.66631"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.49722 16.6624C7.95736 16.6624 8.33037 16.2894 8.33037 15.8292C8.33037 15.3691 7.95736 14.9961 7.49722 14.9961C7.03708 14.9961 6.66406 15.3691 6.66406 15.8292C6.66406 16.2894 7.03708 16.6624 7.49722 16.6624Z"
                stroke="#888888"
                strokeWidth="1.66631"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.4972 10.8304C12.9574 10.8304 13.3304 10.4574 13.3304 9.99722C13.3304 9.53708 12.9574 9.16406 12.4972 9.16406C12.0371 9.16406 11.6641 9.53708 11.6641 9.99722C11.6641 10.4574 12.0371 10.8304 12.4972 10.8304Z"
                stroke="#888888"
                strokeWidth="1.66631"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.4972 4.99834C12.9574 4.99834 13.3304 4.62532 13.3304 4.16519C13.3304 3.70505 12.9574 3.33203 12.4972 3.33203C12.0371 3.33203 11.6641 3.70505 11.6641 4.16519C11.6641 4.62532 12.0371 4.99834 12.4972 4.99834Z"
                stroke="#888888"
                strokeWidth="1.66631"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.4972 16.6624C12.9574 16.6624 13.3304 16.2894 13.3304 15.8292C13.3304 15.3691 12.9574 14.9961 12.4972 14.9961C12.0371 14.9961 11.6641 15.3691 11.6641 15.8292C11.6641 16.2894 12.0371 16.6624 12.4972 16.6624Z"
                stroke="#888888"
                strokeWidth="1.66631"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="block-label-group">
            {renderBlockIcon()}
            <span className="block-type-label">
              {block.type.charAt(0).toUpperCase() + block.type.slice(1)} Block
            </span>
          </div>
        </div>

        <div className="block-header-right" style={{ display: "flex" }}>
          {/* COLLAPSE BUTTON */}
          <button
            className="collapse-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              transform: isExpanded ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.2s ease",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M18 14L10 6L2 14"
                stroke="#4A5565"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* DELETE BUTTON */}
          <button
            onClick={() => removeBlock(block.id)}
            className="block-control-btn"
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

      {/* COLLAPSIBLE BODY */}
      {isExpanded && (
        <div className="block-body">
          {block.type === "text" && (
            <textarea
              className="block-textarea"
              placeholder="Enter your text..."
              value={block.content || ""}
              onChange={(e) => handleTextChange("content", e.target.value)}
            />
          )}

          {block.type === "section" && (
            <>
              <input
                className="block-input"
                placeholder="Section title"
                value={block.title || ""}
                onChange={(e) => handleTextChange("title", e.target.value)}
              />
              <textarea
                className="block-textarea"
                placeholder="Section content..."
                value={block.content || ""}
                onChange={(e) => handleTextChange("content", e.target.value)}
              />
            </>
          )}

          {block.type === "media" && (
            <div className="media-block-wrapper">
              <p className="media-counter">
                Media {block.media?.length || 0}/4
              </p>

              <div
                className="media-dropzone"
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  hidden
                />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3V15"
                    stroke="#333333"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 8L12 3L7 8"
                    stroke="#333333"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                    stroke="#333333"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3>Upload images or videos</h3>
                <p>{4 - (block.media?.length || 0)} slots remaining</p>
              </div>

              {block.media?.length > 0 && (
                <div className="media-preview-grid">
                  {block.media.map((url, idx) => (
                    <div key={idx} className="media-preview-item">
                      <img src={url} alt="upload preview" />
                      <button
                        className="remove-img-btn"
                        onClick={() => removeImage(idx)}
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
        </div>
      )}
    </div>
  );
}
