"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableBlock from "./SortableBlock";

export default function Story({
  formData,
  setFormData,
  blocks,
  setBlocks,
  onNext,
  onBack,
  onSaveAndExit,
  isSaving,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [storyError, setStoryError] = useState("");

  const menuRef = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),

    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  /* =========================================================
     CLOSE ADD BLOCK MENU
  ========================================================= */

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  /* =========================================================
     KEEP formData.storyBlocks IN SYNC
  ========================================================= */

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      storyBlocks: blocks,
    }));
  }, [blocks, setFormData]);

  /* =========================================================
     DRAG / REORDER
  ========================================================= */

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id === over.id) {
      return;
    }

    const oldIndex = blocks.findIndex((block) => block.id === active.id);
    const newIndex = blocks.findIndex((block) => block.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    setBlocks((current) => arrayMove(current, oldIndex, newIndex));
  };

  /* =========================================================
     UPDATE BLOCK
  ========================================================= */

  const updateBlockData = (id, newData) => {
    setBlocks((previous) =>
      previous.map((block) =>
        block.id === id
          ? {
              ...block,
              ...newData,
            }
          : block,
      ),
    );

    setStoryError("");
  };

  /* =========================================================
     ADD BLOCK
  ========================================================= */

  const addBlock = (type) => {
    const newBlock = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      title: "",
      content: "",
      media: [],
      url: "",
    };

    setBlocks((current) => [...current, newBlock]);

    setIsMenuOpen(false);
    setStoryError("");
  };

  /* =========================================================
     REMOVE BLOCK
  ========================================================= */

  const removeBlock = (id) => {
    setBlocks((current) => current.filter((block) => block.id !== id));
  };

  /* =========================================================
     STORY VALIDATION
  ========================================================= */

  function hasUsefulStoryContent() {
    return blocks.some((block) => {
      const hasTitle = Boolean(block.title?.trim());
      const hasContent = Boolean(block.content?.trim());

      const hasImages = Array.isArray(block.media) && block.media.length > 0;

      const hasVideo = block.type === "video" && Boolean(block.url?.trim());

      return hasTitle || hasContent || hasImages || hasVideo;
    });
  }

  function handleContinue() {
    if (!hasUsefulStoryContent()) {
      setStoryError("Add some story content before continuing to preview.");

      requestAnimationFrame(() => {
        document.querySelector(".story-validation-error")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });

      return;
    }

    setStoryError("");

    onNext();
  }

  return (
    <>
      <div className="form-intro-section">
        <h1 className="form-main-title">Tell your story</h1>

        <p className="form-sub-title">
          Help supporters understand why you're raising money and what their
          support will make possible.
        </p>
      </div>

      <div className="form-container-main">
        {/* STORY BLOCKS */}

        {blocks.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={blocks.map((block) => block.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="blocks-list">
                {blocks.map((block) => (
                  <SortableBlock
                    key={block.id}
                    block={block}
                    removeBlock={removeBlock}
                    updateBlockData={updateBlockData}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {/* ADD BLOCK */}

        <div className="add-block-container" ref={menuRef}>
          <button
            type="button"
            className="add-block-btn"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#888"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>

            <span>Add Block</span>
          </button>

          {isMenuOpen && (
            <div className="story-options-menu">
              {/* IMAGE */}

              <button
                type="button"
                className="menu-option"
                onClick={() => addBlock("image")}
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  textAlign: "left",
                }}
              >
                <div className="option-icon media-bg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>

                <div className="option-text">
                  <h3>Image Block</h3>
                  <p>Upload up to 4 images</p>
                </div>
              </button>

              <div className="menu-separator" />

              {/* VIDEO */}

              <button
                type="button"
                className="menu-option"
                onClick={() => addBlock("video")}
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  textAlign: "left",
                }}
              >
                <div className="option-icon video-bg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E11D48"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M10 9L15 12L10 15V9Z" />
                  </svg>
                </div>

                <div className="option-text">
                  <h3>Video Block</h3>
                  <p>Embed a YouTube or Vimeo video</p>
                </div>
              </button>

              <div className="menu-separator" />

              {/* SECTION */}

              <button
                type="button"
                className="menu-option"
                onClick={() => addBlock("section")}
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  textAlign: "left",
                }}
              >
                <div className="option-icon section-bg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                  >
                    <path d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>

                <div className="option-text">
                  <h3>Section Block</h3>
                  <p>Title and supporting content</p>
                </div>
              </button>

              <div className="menu-separator" />

              {/* TEXT */}

              <button
                type="button"
                className="menu-option"
                onClick={() => addBlock("text")}
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  textAlign: "left",
                }}
              >
                <div className="option-icon text-bg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                  >
                    <path d="M4 7V4h16v3M9 20h6M12 4v16" />
                  </svg>
                </div>

                <div className="option-text">
                  <h3>Text Block</h3>
                  <p>Add a paragraph or longer text</p>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* INLINE VALIDATION */}

        {storyError && (
          <p className="form-field-error story-validation-error">
            {storyError}
          </p>
        )}

        {/* BOTTOM NAVIGATION */}

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
              Back to basics
            </button>

            <button
              type="button"
              className="campaign-action-primary"
              onClick={handleContinue}
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="button-loader-content">
                  <span className="spinner" />
                  <span>Saving...</span>
                </span>
              ) : (
                "Continue to Preview"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
