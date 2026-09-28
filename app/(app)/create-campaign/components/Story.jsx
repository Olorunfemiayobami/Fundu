"use client";

import React, { useCallback, useEffect, useState } from "react";

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

import { StoryTips } from "./CreateCampaignLayout";
import SortableBlock from "./SortableBlock";

export default function Story({
  formData,
  setFormData,
  blocks,
  setBlocks,
  onNext,
  onBack,
  isSaving,
  onUploadingChange,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [insertAfterId, setInsertAfterId] = useState(null);
  const [uploadingIds, setUploadingIds] = useState(() => new Set());
  const [announcement, setAnnouncement] = useState("");
  const [storyError, setStoryError] = useState("");


  useEffect(() => {
    onUploadingChange?.(uploadingIds.size>0);
    return () => onUploadingChange?.(false);
  }, [uploadingIds, onUploadingChange]);

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

  const addBlock = useCallback((type) => {
    const newBlock = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      title: "",
      content: "",
      media: [],
      url: "",
    };

    setBlocks((current) => {
      const anchor = current.findIndex(block => block.id === insertAfterId);
      const index = insertAfterId && anchor !== -1 ? anchor + 1 : current.length;
      return [...current.slice(0,index),newBlock,...current.slice(index)];
    });
    setInsertAfterId(null);
    setAnnouncement("Block added.");
    requestAnimationFrame(() => document.getElementById("story-block-" + newBlock.id)?.querySelector("input:not([type=file]), textarea, [data-upload]")?.focus());

    setIsMenuOpen(false);
    setStoryError("");
  }, [insertAfterId, setBlocks]);

  /* =========================================================
     REMOVE BLOCK
  ========================================================= */

  const removeBlock = (id) => {
    const block=blocks.find(item=>item.id===id);
    const hasContent=block && (block.title?.trim() || block.content?.trim() || block.media?.length || block.url?.trim());
    if (uploadingIds.has(id) || (hasContent && !window.confirm("Delete this block and its content? This cannot be undone."))) return;
    setBlocks((current) => current.filter((block) => block.id !== id));
    if(insertAfterId === id) {setInsertAfterId(null);setIsMenuOpen(false);}
    setAnnouncement("Block deleted.");
  };

  const onUploadBusyChange = useCallback((id, busy) => {
    setUploadingIds(current => {
      if(current.has(id) === busy) return current;
      const next=new Set(current);if(busy) next.add(id);else next.delete(id);return next;
    });
  }, []);
  function moveBlock(id, direction) {
    setBlocks(current => {
      const index=current.findIndex(block=>block.id===id), destination=index+direction;
      if(index<0 || destination<0 || destination>=current.length) return current;
      return arrayMove(current,index,destination);
    });
    setAnnouncement(direction<0 ? "Block moved up." : "Block moved down.");
  }
  function openInsert(id) {setInsertAfterId(id);setIsMenuOpen(true);}
  const blockOptions=[
    ["section","Section","A heading with a paragraph under it","☰"],
    ["text","Text","A paragraph on its own","T"],
    ["image","Images","Up to 4 photos in a grid","▧"],
    ["video","Video","A YouTube or Vimeo link","▷"],
  ];
  function renderAddPanel() {
    return <section className="cw-add-panel" aria-label="Choose a story block">
      <div className="cw-add-panel-heading"><h2>Add a block</h2><button type="button" aria-label="Close Add a block" onClick={()=>{setIsMenuOpen(false);setInsertAfterId(null);}}>×</button></div>
      <div className="cw-add-options">{blockOptions.map(([type,label,description,icon])=><button type="button" key={type} onClick={()=>addBlock(type)}><span className="cw-block-icon" aria-hidden="true">{icon}</span><strong>{label}</strong><span>{description}</span></button>)}</div>
    </section>;
  }

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
    if(uploadingIds.size) return;
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
      <div className="form-intro-section"><h1 className="form-main-title">Tell your story</h1><p className="form-sub-title">Explain what happened, what the money is for and how you’ll use it. Build it from blocks.</p></div>
      <div className="form-container-main cw-story">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={blocks.map(block=>block.id)} strategy={verticalListSortingStrategy}>
            <div className="blocks-list">
              {blocks.map((block,index)=><React.Fragment key={block.id}>
                <SortableBlock block={block} removeBlock={removeBlock} updateBlockData={updateBlockData} moveBlock={moveBlock} canMoveUp={index>0} canMoveDown={index<blocks.length-1} onUploadBusyChange={onUploadBusyChange} />
                {index<blocks.length-1 && <div className="cw-insert-line"><button type="button" aria-label="Add a block here" aria-expanded={isMenuOpen && insertAfterId===block.id} onClick={()=>openInsert(block.id)}>+</button></div>}
                {isMenuOpen && insertAfterId===block.id && renderAddPanel()}
              </React.Fragment>)}
            </div>
          </SortableContext>
        </DndContext>
        {isMenuOpen && insertAfterId===null ? renderAddPanel() : <button type="button" className="cw-add-trigger" onClick={()=>openInsert(null)}>+ Add a block</button>}
        <StoryTips />
        {storyError && <p className="form-field-error story-validation-error" role="alert">{storyError}</p>}
        <span className="cw-story-announcement" role="status">{announcement}</span>
        {uploadingIds.size>0 && <p className="helper-text" role="status">Wait for your images to finish uploading before continuing.</p>}
        <div className="campaign-bottom-actions"><div className="campaign-bottom-actions__right">
          <button type="button" className="campaign-action-secondary" aria-label="Back to basics" onClick={onBack} disabled={isSaving || uploadingIds.size>0}>← Back to basics</button>
          <button type="button" className="campaign-action-primary" onClick={handleContinue} disabled={isSaving || uploadingIds.size>0}>{isSaving ? "Saving…" : "Continue to preview"}</button>
        </div></div>
      </div>
    </>
  );
}
