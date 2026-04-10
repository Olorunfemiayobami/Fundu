"use client";
import React, { useState, useEffect, useRef } from "react";
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

// Added: isSaving to the props
export default function Story({
  formData,
  setFormData,
  blocks,
  setBlocks,
  onNext,
  onBack,
  isSaving, // Destructured here
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      setBlocks(arrayMove(blocks, oldIndex, newIndex));
    }
  };

  const updateBlockData = (id, newData) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, ...newData } : block)),
    );
  };

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now().toString(),
      type,
      title: "",
      content: "",
      media: [],
    };
    setBlocks([...blocks, newBlock]);
    setIsMenuOpen(false);
  };

  const removeBlock = (id) => {
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  return (
    <>
      <div className="form-intro-section">
        <h1 className="form-main-title">Tell your story</h1>
        <p className="form-sub-title">
          Tell us about your campaign in a few simple steps
        </p>
      </div>

      <div className="form-container-main">
        {blocks.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={blocks.map((b) => b.id)}
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

        <div className="add-block-container" ref={menuRef}>
          <div
            className="add-block-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#888"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add Block</span>
          </div>

          {isMenuOpen && (
            <div className="story-options-menu">
              <div className="menu-option" onClick={() => addBlock("media")}>
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
                  <h3>Media Block</h3>
                  <p>Upload images or videos</p>
                </div>
              </div>
              <div className="menu-separator"></div>
              <div className="menu-option" onClick={() => addBlock("section")}>
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
                  <p>Title + content + optional media</p>
                </div>
              </div>
              <div className="menu-separator"></div>
              <div className="menu-option" onClick={() => addBlock("text")}>
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
                  <p>Simple paragraph</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="form-actions-story">
          <button
            className="btn-back-basics"
            onClick={onBack}
            disabled={isSaving}
          >
            Back to basics
          </button>

          <button
            className={`btn-continue-preview ${isSaving ? "is-loading" : ""}`}
            onClick={onNext}
            disabled={isSaving}
          >
            {isSaving ? (
              <div className="button-loader-content">
                <div className="spinner"></div>
                <span>Saving...</span>
              </div>
            ) : (
              "Continue to Preview"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
