"use client";

import React, { useEffect, useRef, useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { supabase } from "@/lib/supabase";
import CampaignStorageImage from "@/components/campaigns/CampaignStorageImage";

export default function SortableBlock({ block, removeBlock, updateBlockData, moveBlock, canMoveUp, canMoveDown, onUploadBusyChange }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const [failedFiles, setFailedFiles] = useState([]);

  const fileInputRef = useRef(null);
  const [menuOpen,setMenuOpen]=useState(false);
  const menuRef=useRef(null), menuButtonRef=useRef(null);
  const photoSensors=useSensors(useSensor(PointerSensor,{activationConstraint:{distance:5}}),useSensor(KeyboardSensor,{coordinateGetter:sortableKeyboardCoordinates}));
  useEffect(()=>{
    onUploadBusyChange?.(block.id,isUploadingImages);
    return ()=>onUploadBusyChange?.(block.id,false);
  },[block.id,isUploadingImages,onUploadBusyChange]);
  useEffect(()=>{
    if(!menuOpen) return;
    function closeOutside(event){if(!menuRef.current?.contains(event.target))setMenuOpen(false);}
    function escape(event){if(event.key==="Escape"){setMenuOpen(false);menuButtonRef.current?.focus();}}
    const frame=requestAnimationFrame(()=>menuRef.current?.querySelector('[role="menuitem"]:not(:disabled)')?.focus());
    document.addEventListener("pointerdown",closeOutside);document.addEventListener("keydown",escape);
    return ()=>{cancelAnimationFrame(frame);document.removeEventListener("pointerdown",closeOutside);document.removeEventListener("keydown",escape);};
  },[menuOpen]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id, disabled: isUploadingImages });

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

  const uploadFiles = async (files) => {
    const currentMedia = Array.isArray(block.media) ? block.media : [];
    const selectedFiles = files.filter(file => file.type.startsWith("image/")).slice(0, 4 - currentMedia.length);
    if (!selectedFiles.length || isUploadingImages) return;
    setImageUploadError("");
    setFailedFiles([]);
    setIsUploadingImages(true);
    const uploadedUrls = [];
    let remaining = selectedFiles;
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw authError || new Error("Sign in before uploading.");
      for (let index = 0; index < selectedFiles.length; index++) {
        const file = selectedFiles[index];
        remaining = selectedFiles.slice(index);
        const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
        const path = `${user.id}/story/${Date.now()}-${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage.from("campaign-images").upload(path, file, { cacheControl: "60", upsert: false, contentType: file.type });
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("campaign-images").getPublicUrl(path);
        if (!data?.publicUrl) throw new Error("Could not create image URL.");
        uploadedUrls.push(data.publicUrl);
        remaining = selectedFiles.slice(index + 1);
      }
    } catch (error) {
      console.error("Story image upload error:", error);
      setFailedFiles(remaining);
      setImageUploadError("Didn't upload");
    } finally {
      if (uploadedUrls.length) updateBlockData(block.id, { media: [...currentMedia, ...uploadedUrls] });
      setIsUploadingImages(false);
    }
  };
  const handleFileChange = event => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    void uploadFiles(files);
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
      return "Images";
    }

    if (block.type === "video") {
      return "Video";
    }

    if (block.type === "section") {
      return "Section";
    }

    if (block.type === "text") {
      return "Text";
    }

    return "Story";
  }

  const media=Array.isArray(block.media)?block.media:[];
  const photoIds=media.map((_,index)=>block.id+"-photo-"+index);
  const summary=isImageBlock ? media.length+" of 4 photos" : block.type === "section" ? block.title : block.type === "video" ? block.url : block.content;
  function movePhoto(index,direction){
    const destination=index+direction;
    if(destination<0 || destination>=media.length || isUploadingImages)return;
    updateBlockData(block.id,{media:arrayMove(media,index,destination)});
  }
  function photoDragEnd({active,over}){
    if(!over || active.id===over.id || isUploadingImages)return;
    const from=photoIds.indexOf(active.id),to=photoIds.indexOf(over.id);
    if(from>=0 && to>=0)updateBlockData(block.id,{media:arrayMove(media,from,to)});
  }
  function menuKeys(event){
    if(!["ArrowDown","ArrowUp","Home","End"].includes(event.key))return;
    event.preventDefault();const buttons=[...event.currentTarget.querySelectorAll('button:not(:disabled)')];const index=buttons.indexOf(document.activeElement);
    const next=event.key==="Home"?0:event.key==="End"?buttons.length-1:(index+(event.key==="ArrowDown"?1:-1)+buttons.length)%buttons.length;buttons[next]?.focus();
  }
  return (
    <div ref={setNodeRef} style={style} id={"story-block-"+block.id} className="story-block-card">
      <div className="block-header">
        <div className="block-header-left">
          <button type="button" className="drag-handle-container" {...attributes} {...listeners} aria-label="Drag to reorder" disabled={isUploadingImages}><svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true">{[5,10,15].flatMap(y=>[5,11].map(x=><circle key={x+"-"+y} cx={x} cy={y} r="1.2"/>))}</svg></button>
          <span className="cw-block-icon" aria-hidden="true">{renderBlockIcon()}</span>
          <strong className="block-type-label">{getBlockLabel()}</strong>
          <span className="cw-block-summary">{summary}</span>
        </div>
        <div className="block-header-right">
          <button type="button" className="collapse-btn" aria-label={isExpanded?"Collapse block":"Expand block"} aria-expanded={isExpanded} aria-controls={"story-body-"+block.id} onClick={()=>setIsExpanded(value=>!value)}><span aria-hidden="true">{isExpanded?"⌃":"⌄"}</span></button>
          <div className="cw-block-menu-wrap" ref={menuRef}>
            <button type="button" className="cw-block-more" ref={menuButtonRef} aria-label={"More actions for "+getBlockLabel()+" block"} aria-haspopup="menu" aria-expanded={menuOpen} aria-controls={menuOpen?"story-menu-"+block.id:undefined} disabled={isUploadingImages} onClick={()=>setMenuOpen(value=>!value)}>⋯</button>
            {menuOpen && <div className="cw-block-menu" id={"story-menu-"+block.id} role="menu" aria-label="Block actions" onKeyDown={menuKeys}>
              <button type="button" role="menuitem" disabled={!canMoveUp} onClick={()=>{moveBlock(block.id,-1);setMenuOpen(false);menuButtonRef.current?.focus();}}>Move up</button>
              <button type="button" role="menuitem" disabled={!canMoveDown} onClick={()=>{moveBlock(block.id,1);setMenuOpen(false);menuButtonRef.current?.focus();}}>Move down</button>
              <button type="button" role="menuitem" className="cw-delete-block" onClick={()=>{removeBlock(block.id);setMenuOpen(false);}}>Delete</button>
            </div>}
          </div>
        </div>
      </div>
      {isExpanded && <div className="block-body" id={"story-body-"+block.id}>
        {block.type === "text" && <><label className="cw-story-label" htmlFor={"story-text-"+block.id}>Text</label><textarea id={"story-text-"+block.id} className="block-textarea" placeholder="Write your paragraph…" value={block.content || ""} onChange={event=>handleTextChange("content",event.target.value)} /><p className="cw-block-helper">Line breaks are kept on your public page.</p></>}
        {block.type === "section" && <>
          <label className="cw-story-label" htmlFor={"story-title-"+block.id}>Section heading</label><input id={"story-title-"+block.id} className="block-input" placeholder="Section title" value={block.title || ""} onChange={event=>handleTextChange("title",event.target.value)} />
          <label className="cw-story-label" htmlFor={"story-content-"+block.id}>Paragraph</label><textarea id={"story-content-"+block.id} className="block-textarea" placeholder="Tell supporters more…" value={block.content || ""} onChange={event=>handleTextChange("content",event.target.value)} /><p className="cw-block-helper">Line breaks are kept on your public page.</p>
        </>}
        {isImageBlock && <div className="media-block-wrapper">
          <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={handleFileChange} disabled={isUploadingImages} hidden />
          {isUploadingImages && <p role="status" className="cw-block-helper">Uploading images… Please wait while your images are saved.</p>}
          <DndContext sensors={photoSensors} collisionDetection={closestCenter} onDragEnd={photoDragEnd}>
            <SortableContext items={photoIds} strategy={rectSortingStrategy}>
              <div className="media-preview-grid">
                {media.map((url,index)=><StoryPhoto key={photoIds[index]} id={photoIds[index]} url={url} index={index} count={media.length} disabled={isUploadingImages} onRemove={()=>removeImage(index)} onMove={direction=>movePhoto(index,direction)} />)}
                {isUploadingImages && <div className="cw-photo-upload cw-photo-upload--busy" role="status"><span className="cw-saving-spinner" aria-hidden="true" /><strong>Uploading…</strong></div>}
                {!isUploadingImages && failedFiles.length > 0 && <div className="cw-photo-upload cw-photo-upload--failed" role="alert"><strong>Didn&apos;t upload</strong><button type="button" aria-label={`Retry uploading image ${media.length + 1}`} onClick={() => uploadFiles(failedFiles)}><span className="action-icon action-icon--refresh" /></button><button type="button" onClick={() => fileInputRef.current?.click()}>Choose another</button></div>}
                {Array.from({length:Math.max(0,4-media.length-(isUploadingImages || failedFiles.length ? 1 : 0))},(_,index)=><button key={"empty-"+index} type="button" data-upload className="cw-photo-upload" disabled={isUploadingImages} onClick={()=>fileInputRef.current?.click()} aria-label="Upload story images"><span aria-hidden="true">↑</span><strong>Add photos</strong></button>)}
              </div>
            </SortableContext>
          </DndContext>
          {imageUploadError && <p className="story-image-upload-error" role="alert">Only the failed image needs attention. Your other images and text are safe.</p>}
          <p className="cw-block-helper">Drag photos to reorder. Up to 4 per block.</p>
        </div>}
        {block.type === "video" && <div className="video-block-wrapper"><div className="video-block-field"><label htmlFor={"video-url-"+block.id}>Video link</label><input id={"video-url-"+block.id} type="url" className="block-input" placeholder="Paste a YouTube or Vimeo link" value={block.url || ""} onChange={event=>handleTextChange("url",event.target.value)} aria-describedby={"video-help-"+block.id} /><p className="video-block-helper" id={"video-help-"+block.id}>Paste the link to your video from YouTube or Vimeo.</p></div>
          {block.url?.trim() && videoEmbedUrl && <div className="video-embed-preview"><iframe src={videoEmbedUrl} title="Campaign video preview" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>}
          {block.url?.trim() && !videoEmbedUrl && <p className="video-block-error" role="alert">Enter a valid YouTube or Vimeo video link.</p>}
        </div>}
      </div>}
    </div>
  );
}

function StoryPhoto({id,url,index,count,disabled,onRemove,onMove}) {
  const {attributes,listeners,setNodeRef,transform,transition,isDragging}=useSortable({id,disabled});
  return <div className="media-preview-item" ref={setNodeRef} style={{transform:CSS.Transform.toString(transform),transition,opacity:isDragging ? 0.6 : 1,zIndex:isDragging?2:0}}>
    <CampaignStorageImage src={url} alt={"Campaign image "+(index+1)} />
    <button type="button" className="remove-img-btn" disabled={disabled} onClick={onRemove} aria-label={"Remove image "+(index+1)}>×</button>
    <div className="cw-photo-controls"><button type="button" {...attributes} {...listeners} disabled={disabled} aria-label={"Drag to reorder image "+(index+1)}>⠿</button><button type="button" disabled={disabled || index===0} onClick={()=>onMove(-1)} aria-label={"Move image "+(index+1)+" earlier"}>←</button><button type="button" disabled={disabled || index===count-1} onClick={()=>onMove(1)} aria-label={"Move image "+(index+1)+" later"}>→</button></div>
  </div>;
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
