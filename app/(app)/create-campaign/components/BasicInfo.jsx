"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import CampaignStorageImage from "@/components/campaigns/CampaignStorageImage";

export default function BasicInfo({
  formData,
  setFormData,
  onNext,
  onSaveAndExit,
  onCancel,
  onDiscardDraft,
  coverUploadFailed = false,
  onCoverChanged,
  onRetryCover,
  isDraft = true,
  discardError,
  isSaving,
  isRestarting = false,
  profileName = "",
}) {
  const today = new Intl.DateTimeFormat("en-CA", {timeZone:"Africa/Lagos",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categoryAttempt, setCategoryAttempt] = useState(0);

  const [attempted, setAttempted] = useState(false);
  const coverPreviewRef = useRef(null);
  useEffect(() => {
    let cancelled = false;
    supabase.from("categories").select("id,name").order("name").then(({data,error}) => {
      if(cancelled) return;
      setCategories(data || []); setCategoryError(error ? "Could not load categories. Please retry." : ""); setCategoryLoading(false);
    }).catch(() => {if(!cancelled) {setCategoryError("Could not load categories. Please retry.");setCategoryLoading(false);}});
    return () => {cancelled=true;};
  }, [categoryAttempt]);
  const endDays = formData.duration ? Math.round((Date.parse(formData.duration+"T00:00:00Z")-Date.parse(today+"T00:00:00Z"))/86400000) : null;

  /*
   * =========================================================
   * RESTART CAMPAIGN DATE
   * =========================================================
   */

  const tomorrow = useMemo(() => {
    const date = new Date(today + "T00:00:00Z");

    date.setUTCDate(date.getUTCDate() + 1);

    return date.toISOString().split("T")[0];
  }, [today]);

  const minimumEndDate = isRestarting ? tomorrow : today;

  /*
   * =========================================================
   * REFS
   * =========================================================
   */

  const fileInputRef = useRef(null);
  const cropAreaRef = useRef(null);

  /*
   * =========================================================
   * STATE
   * =========================================================
   */

  const [errors, setErrors] = useState({});

  const [cropModalOpen, setCropModalOpen] = useState(false);

  const [cropAreaSize, setCropAreaSize] = useState({
    width: 0,
    height: 0,
  });

  const [sourceImage, setSourceImage] = useState(null);
  const [sourceFile, setSourceFile] = useState(null);

  const [imageMeta, setImageMeta] = useState({
    width: 0,
    height: 0,
  });

  const [cropState, setCropState] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });

  const [dragState, setDragState] = useState({
    dragging: false,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });

  /*
   * =========================================================
   * MEASURE CROP AREA
   * =========================================================
   *
   * The crop area does not exist in the DOM until the modal
   * opens.
   *
   * We therefore measure it after React renders the modal.
   */

  useEffect(() => {
    if (!cropModalOpen) {
      setCropAreaSize({
        width: 0,
        height: 0,
      });

      return;
    }

    let frameId;

    function measureCropArea() {
      const element = cropAreaRef.current;

      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();

      if (!rect.width || !rect.height) {
        return;
      }

      setCropAreaSize({
        width: rect.width,
        height: rect.height,
      });
    }

    /*
     * Wait until the modal is actually mounted.
     */

    frameId = requestAnimationFrame(() => {
      measureCropArea();
    });

    /*
     * ResizeObserver handles:
     *
     * - browser resizing
     * - responsive modal resizing
     * - mobile orientation changes
     */

    let resizeObserver;

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        measureCropArea();
      });

      if (cropAreaRef.current) {
        resizeObserver.observe(cropAreaRef.current);
      }
    }

    window.addEventListener("resize", measureCropArea);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      resizeObserver?.disconnect();

      window.removeEventListener("resize", measureCropArea);
    };
  }, [cropModalOpen]);

  /*
   * =========================================================
   * EXISTING COVER
   * =========================================================
   */

  const existingCoverImage = useMemo(() => {
    return (
      formData.imagePreview ||
      formData.coverImage ||
      formData.cover_image ||
      formData.image_url ||
      formData.preview_image ||
      ""
    );
  }, [formData]);

  /*
   * =========================================================
   * FIELD HELPERS
   * =========================================================
   */

  function clearError(field) {
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = {
        ...current,
      };

      delete next[field];

      return next;
    });
  }

  function updateField(field, value) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    if (attempted) {
      const invalid = field === "title" ? !value.trim() : field === "goal" ? !value || Number(value)<=0 : field === "duration" ? !value || value < minimumEndDate : false;
      setErrors(current => ({...current,[field]: invalid ? (field === "duration" ? "Choose a valid end date." : field === "goal" ? "Enter a goal greater than zero." : "Enter a campaign title.") : undefined}));
    }
  }

  /*
   * =========================================================
   * VALIDATION
   * =========================================================
   */

  function validateBasicInfo() {
    const nextErrors = {};

    if (!formData.title?.trim()) {
      nextErrors.title = "You have not entered a campaign title.";
    }

    if (!formData.categoryId) {
      nextErrors.categoryId = "You have not selected a category.";
    }

    if (!formData.goal || Number(formData.goal) <= 0) {
      nextErrors.goal = "You have not entered a valid goal amount.";
    }

    if (!formData.duration) {
      nextErrors.duration = isRestarting
        ? "Choose a new end date to restart this campaign."
        : "You have not selected a campaign end date.";
    }

    /*
     * =========================================================
     * RESTART DATE VALIDATION
     * =========================================================
     */

    if (isRestarting && formData.duration) {
      const selectedDate = new Date(`${formData.duration}T00:00:00`);

      const todayStart = new Date();

      todayStart.setHours(0, 0, 0, 0);

      if (Number.isNaN(selectedDate.getTime()) || selectedDate <= todayStart) {
        nextErrors.duration = "Choose a future date to restart this campaign.";
      }
    }

    if (formData.duration && (formData.duration < minimumEndDate || Number.isNaN(Date.parse(formData.duration)))) { nextErrors.duration = "Choose a valid end date."; }

    const hasCoverImage =
      formData.coverImageFile ||
      formData.imagePreview ||
      formData.coverImage ||
      formData.cover_image ||
      formData.image_url ||
      formData.preview_image;

    if (!hasCoverImage) {
      nextErrors.coverImage = "You have not added a cover image.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  /*
   * =========================================================
   * CONTINUE
   * =========================================================
   */

  function handleContinue() {
    setAttempted(true);
    const isValid = validateBasicInfo();

    if (!isValid) {
      requestAnimationFrame(() => {
        const firstError = document.querySelector('.cw-basics [data-invalid="true"], .cw-basics [aria-invalid="true"]');
        firstError?.focus();

        firstError?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });

      return;
    }

    onNext();
  }

  /*
   * =========================================================
   * IMAGE SELECT
   * =========================================================
   */

  function handleImageSelect(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }
    onCoverChanged?.();

    if (!file.type.startsWith("image/")) {
      setErrors((current) => ({
        ...current,
        coverImage: "Please select a valid image file.",
      }));

      event.target.value = "";

      return;
    }

    const objectUrl = URL.createObjectURL(file);

    const image = new Image();

    image.onload = () => {
      setSourceImage(objectUrl);
      setSourceFile(file);

      setImageMeta({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });

      /*
       * Reset the crop whenever a new image is selected.
       */

      setCropState({
        x: 0,
        y: 0,
        scale: 1,
      });

      setCropAreaSize({
        width: 0,
        height: 0,
      });

      setCropModalOpen(true);

      clearError("coverImage");
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);

      setErrors((current) => ({
        ...current,
        coverImage: "We could not open this image. Try another file.",
      }));

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    image.src = objectUrl;
  }

  /*
   * =========================================================
   * CLOSE CROP MODAL
   * =========================================================
   */

  function closeCropModal() {
    if (sourceImage) {
      URL.revokeObjectURL(sourceImage);
    }

    setSourceImage(null);
    setSourceFile(null);

    setImageMeta({
      width: 0,
      height: 0,
    });

    setCropAreaSize({
      width: 0,
      height: 0,
    });

    setCropState({
      x: 0,
      y: 0,
      scale: 1,
    });

    setDragState({
      dragging: false,
      startX: 0,
      startY: 0,
      initialX: 0,
      initialY: 0,
    });

    setCropModalOpen(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  /*
   * =========================================================
   * CROP GEOMETRY
   * =========================================================
   */

  function getCropGeometry() {
    const cropWidth = 1600;
    const cropHeight = 700;

    const imageWidth = imageMeta.width;
    const imageHeight = imageMeta.height;

    if (!imageWidth || !imageHeight) {
      return null;
    }

    /*
     * This is the equivalent of object-fit: cover.
     *
     * It guarantees that the selected image completely
     * covers the 1600 × 700 crop frame.
     */

    const minimumScale = Math.max(
      cropWidth / imageWidth,
      cropHeight / imageHeight,
    );

    const finalScale = minimumScale * cropState.scale;

    const renderedWidth = imageWidth * finalScale;

    const renderedHeight = imageHeight * finalScale;

    return {
      cropWidth,
      cropHeight,
      finalScale,
      renderedWidth,
      renderedHeight,
    };
  }

  /*
   * =========================================================
   * CLAMP IMAGE POSITION
   * =========================================================
   */

  function clampPosition(nextX, nextY, renderedWidth, renderedHeight) {
    const cropWidth = 1600;
    const cropHeight = 700;

    const minX = cropWidth - renderedWidth;
    const minY = cropHeight - renderedHeight;

    return {
      x: Math.min(0, Math.max(minX, nextX)),
      y: Math.min(0, Math.max(minY, nextY)),
    };
  }

  /*
   * =========================================================
   * DISPLAY POSITION
   * =========================================================
   *
   * cropState uses the real 1600 × 700 coordinate system.
   *
   * This converts those coordinates to the size of the
   * crop area visible on the user's screen.
   */

  function getDisplayPosition() {
    const geometry = getCropGeometry();

    if (!geometry || !cropAreaSize.width) {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      };
    }

    const ratio = cropAreaSize.width / geometry.cropWidth;

    return {
      x: cropState.x * ratio,
      y: cropState.y * ratio,

      width: geometry.renderedWidth * ratio,

      height: geometry.renderedHeight * ratio,
    };
  }

  /*
   * =========================================================
   * DRAG IMAGE
   * =========================================================
   */

  function handlePointerDown(event) {
    if (!sourceImage || !cropAreaSize.width) {
      return;
    }

    event.preventDefault();

    event.currentTarget.setPointerCapture(event.pointerId);

    setDragState({
      dragging: true,

      startX: event.clientX,
      startY: event.clientY,

      initialX: cropState.x,
      initialY: cropState.y,
    });
  }

  function handlePointerMove(event) {
    if (!dragState.dragging) {
      return;
    }

    const geometry = getCropGeometry();

    if (!geometry || !cropAreaSize.width) {
      return;
    }

    event.preventDefault();

    /*
     * Convert screen pixels back into our
     * 1600px crop coordinate system.
     */

    const ratio = 1600 / cropAreaSize.width;

    const deltaX = (event.clientX - dragState.startX) * ratio;

    const deltaY = (event.clientY - dragState.startY) * ratio;

    const next = clampPosition(
      dragState.initialX + deltaX,
      dragState.initialY + deltaY,

      geometry.renderedWidth,
      geometry.renderedHeight,
    );

    setCropState((current) => ({
      ...current,

      x: next.x,
      y: next.y,
    }));
  }

  function handlePointerUp(event) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setDragState((current) => ({
      ...current,
      dragging: false,
    }));
  }

  /*
   * =========================================================
   * ZOOM
   * =========================================================
   */

  function handleZoomChange(event) {
    const nextScale = Number(event.target.value);

    const oldGeometry = getCropGeometry();

    if (!oldGeometry) {
      return;
    }

    /*
     * Determine which point in the image is currently
     * underneath the center of the crop frame.
     */

    const centerX = 800 - cropState.x;
    const centerY = 350 - cropState.y;

    const relativeCenterX = centerX / oldGeometry.renderedWidth;

    const relativeCenterY = centerY / oldGeometry.renderedHeight;

    const minimumScale = Math.max(
      1600 / imageMeta.width,
      700 / imageMeta.height,
    );

    const newRenderedWidth = imageMeta.width * minimumScale * nextScale;

    const newRenderedHeight = imageMeta.height * minimumScale * nextScale;

    /*
     * Keep the same part of the image underneath
     * the center while zooming.
     */

    const nextX = 800 - relativeCenterX * newRenderedWidth;

    const nextY = 350 - relativeCenterY * newRenderedHeight;

    const clamped = clampPosition(
      nextX,
      nextY,
      newRenderedWidth,
      newRenderedHeight,
    );

    setCropState({
      x: clamped.x,
      y: clamped.y,
      scale: nextScale,
    });
  }

  /*
   * =========================================================
   * CREATE CROPPED IMAGE
   * =========================================================
   */

  async function createCroppedImage() {
    if (!sourceImage || !sourceFile) {
      return;
    }

    const geometry = getCropGeometry();

    if (!geometry) {
      return;
    }

    try {
      const image = new Image();

      const loadedImage = await new Promise((resolve, reject) => {
        image.onload = () => resolve(image);

        image.onerror = () =>
          reject(new Error("We could not process this image."));

        image.src = sourceImage;
      });

      const canvas = document.createElement("canvas");

      canvas.width = 1600;
      canvas.height = 700;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("We could not prepare this image.");
      }

      /*
       * Give the canvas a white background.
       *
       * This prevents transparent PNG areas from
       * becoming black when converted to JPEG.
       */

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.drawImage(
        loadedImage,

        cropState.x,
        cropState.y,

        geometry.renderedWidth,
        geometry.renderedHeight,
      );

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/jpeg", 0.9);
      });

      if (!blob) {
        throw new Error("We could not create the cropped image.");
      }

      const croppedFile = new File([blob], `fundu-cover-${Date.now()}.jpg`, {
        type: "image/jpeg",
      });

      /*
       * This blob URL is ONLY used for the immediate
       * BasicInfo preview.
       *
       * saveCampaign later uploads coverImageFile to
       * Supabase Storage and saves the permanent URL.
       */

      const previewUrl = URL.createObjectURL(blob);

      setFormData((current) => {
        /*
         * Clean up an older temporary preview URL if
         * the user changes the cover more than once.
         */

        if (
          current.imagePreview &&
          String(current.imagePreview).startsWith("blob:")
        ) {
          URL.revokeObjectURL(current.imagePreview);
        }

        return {
          ...current,

          coverImageFile: croppedFile,
          imagePreview: previewUrl,
          coverImageChanged: true,
        };
      });

      clearError("coverImage");

      /*
       * We no longer need the original selected image.
       */

      URL.revokeObjectURL(sourceImage);

      setSourceImage(null);
      setSourceFile(null);

      setImageMeta({
        width: 0,
        height: 0,
      });

      setCropAreaSize({
        width: 0,
        height: 0,
      });

      setCropState({
        x: 0,
        y: 0,
        scale: 1,
      });

      setDragState({
        dragging: false,
        startX: 0,
        startY: 0,
        initialX: 0,
        initialY: 0,
      });

      setCropModalOpen(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Cover crop error:", error);

      setErrors((current) => ({
        ...current,

        coverImage:
          error?.message ||
          "We could not process this image. Try another file.",
      }));
    }
  }

  async function handleReposition() {
    try {
      const displayedImage = coverPreviewRef.current?.querySelector("img");
      const response = await fetch(displayedImage?.currentSrc || existingCoverImage);
      if(!response.ok) throw new Error("Could not load cover");
      const blob=await response.blob();
      handleImageSelect({target:{files:[new File([blob], "campaign-cover.jpg", {type:blob.type || "image/jpeg"})],value:""}});
    } catch {setErrors(current=>({...current,coverImage:"Could not reopen this cover. Use Replace to upload it again."}));}
  }
  const displayPosition = getDisplayPosition();

  /*
   * =========================================================
   * UI
   * =========================================================
   */

  return (
    <>
      <div className="form-intro-section">
        <h1 className="form-main-title">Let&apos;s start with the basics</h1>

        <p className="form-sub-title">
          The essentials supporters see first.
        </p>
      </div>

      <div className="form-container-main cw-basics">
<div className="form-group">
          <label className="form-label" htmlFor="basics-title">Campaign title</label>
          <input id="basics-title" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "basics-title-error" : "basics-title-help"} className={`input-field ${errors.title ? "input-field--error" : ""}`} value={formData.title || ""} onChange={e=>updateField("title",e.target.value)} placeholder="Give your campaign a clear title" />

          <p className="helper-text" id="basics-title-help">Keep it short and specific. {(formData.title || "").length} characters.</p>{errors.title && <p className="form-field-error" id="basics-title-error">{errors.title}</p>}</div>
          <div className="cw-field-pair">
          <div className="form-group">
          <label className="form-label" htmlFor="basics-categoryId">Category</label>
          <select id="basics-categoryId" aria-invalid={Boolean(errors.categoryId)} aria-describedby={errors.categoryId ? "basics-categoryId-error" : undefined} className="input-field" disabled={categoryLoading} value={formData.categoryId || ""} onChange={e=>{const selectedId=e.target.value;setFormData(current=>({...current,categoryId:selectedId,category:categories.find(c=>c.id===selectedId)?.name || ""}));if(selectedId)clearError("categoryId");else if(attempted)setErrors(current=>({...current,categoryId:"Select a category."}));}}>
          <option value="">{categoryLoading ? "Loading categories…" : "Select a category"}</option>{formData.categoryId && !categories.some(c=>c.id===formData.categoryId) && <option value={formData.categoryId}>{formData.category || "Current category"}</option>}{categories.map(c=>
          <option key={c.id} value={c.id}>{c.name}</option>)}</select>{categoryError && <p role="alert" className="form-field-error">{categoryError} <button type="button" onClick={()=>{setCategoryLoading(true);setCategoryAttempt(n=>n+1);}}>Retry</button>
          </p>}{errors.categoryId && <p className="form-field-error" id="basics-categoryId-error">{errors.categoryId}</p>}</div>
          <div className="form-group">
          <label className="form-label" htmlFor="basics-goal">Goal amount</label>
          <div className={`cw-goal ${errors.goal ? "cw-goal--error" : ""}`}>
          <span aria-hidden="true">₦</span>
          <input id="basics-goal" aria-invalid={Boolean(errors.goal)} aria-describedby={errors.goal ? "basics-goal-error" : undefined} aria-label="Goal amount in naira" className="input-field" type="text" inputMode="numeric" placeholder="0" value={String(formData.goal || "").replace(/\B(?=(\d{3})+(?!\d))/g,",")} onChange={e=>{const raw=e.target.value.replace(/[₦,\s]/g,"");if(/^\d*$/.test(raw))updateField("goal",raw);}} />

          </div>{errors.goal && <p className="form-field-error" id="basics-goal-error">{errors.goal}</p>}</div>
          </div>
          <div className="cw-field-pair">
          <div className="form-group">
          <label className="form-label" htmlFor="basics-duration">{isRestarting ? "New end date" : "End date"}</label>
          <input id="basics-duration" aria-invalid={Boolean(errors.duration)} aria-describedby={errors.duration ? "basics-duration-error" : "basics-duration-help"} className="input-field" type="date" min={minimumEndDate} value={formData.duration || ""} onChange={e=>updateField("duration",e.target.value)} />

          <p className="helper-text" id="basics-duration-help">{endDays === null ? "Choose when your campaign ends." : endDays >= 0 ? `${endDays} ${endDays === 1 ? "day" : "days"} from today.` : "Choose a future end date."}</p>{errors.duration && <p className="form-field-error" id="basics-duration-error">{errors.duration}</p>}</div>
          <div className="form-group">
          <label className="form-label" htmlFor="basics-organiser">Organizer name <span className="optional-text">(optional)</span>
          </label>
          <input id="basics-organiser" aria-describedby="basics-organiser-help" className="input-field" value={formData.organiser || ""} placeholder={profileName || "Your profile name"} onChange={e=>updateField("organiser",e.target.value)} />

          <p className="helper-text" id="basics-organiser-help">Leave blank to use your profile name.</p>{errors.organiser && <p className="form-field-error" id="basics-organiser-error">{errors.organiser}</p>}</div>
          </div>        {/* =====================================================
            COVER IMAGE
        ====================================================== */}

        <div className="form-group">
          <label className="form-label">
            Cover image
          </label>



          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="cover-file-input"
            onChange={handleImageSelect}
          />

          {coverUploadFailed ? <div className="cw-cover-upload-failed" role="alert"><strong><span className="action-icon action-icon--alert" />Cover didn&apos;t upload</strong><p>Your other images and text are safe.</p><div><button type="button" onClick={onRetryCover} disabled={isSaving}><span className="action-icon action-icon--refresh" />Retry upload</button><button type="button" onClick={() => fileInputRef.current?.click()} disabled={isSaving}>Choose another image</button></div></div> : existingCoverImage ? (
            <div
              ref={coverPreviewRef}
              className={`cover-image-preview ${
                errors.coverImage ? "cover-image-preview--error" : ""
              }`}
            >
              <CampaignStorageImage src={existingCoverImage} alt="Campaign cover preview" />

              <div className="cover-image-preview__overlay">
                <button type="button" className="cover-image-change-btn" onClick={handleReposition} disabled={isSaving}>Reposition</button>
                <button
                  type="button"
                  className="cover-image-change-btn"
                  data-invalid={Boolean(errors.coverImage)}
                  disabled={isSaving}
                  onClick={() => fileInputRef.current?.click()}
                >
                  ↑ Replace
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              data-invalid={Boolean(errors.coverImage)}
              className={`upload-box cover-upload-box ${
                errors.coverImage ? "upload-box--error" : ""
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="cover-upload-icon">
                <span>↑</span>
              </div>

              <p className="upload-text">Upload Cover Image</p>

              <p className="upload-subtext">Recommended size: 1600 × 700px</p>

              <p className="upload-subtext">
                You&apos;ll be able to reposition the image before using it.
              </p>
            </button>
          )}

          <p className="helper-text">Shown at 16:7. Best at 1600 × 700 px, JPG or PNG.</p>
          {errors.coverImage && (
            <p className="form-field-error">{errors.coverImage}</p>
          )}
        </div>

        {/* =====================================================
            BOTTOM NAVIGATION
        ====================================================== */}

        {discardError && <p role="alert" className="form-field-error">{discardError}</p>}
        <div className="campaign-bottom-actions">
          <button
            type="button"
            className="campaign-action-save-exit"
            onClick={onSaveAndExit}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save & Exit"}
          </button>

            <button
              type="button"
              className="campaign-action-secondary cw-discard"
              onClick={isDraft ? onDiscardDraft : onCancel}
              disabled={isSaving}
            >
              {isDraft ? "Discard draft" : "Cancel editing"}
            </button>
          <div className="campaign-bottom-actions__right">


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
                "Continue to story"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          CROP MODAL
      ====================================================== */}

      {cropModalOpen && sourceImage && (
        <div className="cover-crop-backdrop" role="presentation">
          <div
            className="cover-crop-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cover-crop-title"
          >
            {/* HEADER */}

            <div className="cover-crop-modal__header">
              <div>
                <h2 id="cover-crop-title">Adjust your cover image</h2>

                <p>
                  Drag the image to choose what will be visible on your
                  campaign.
                </p>
              </div>

              <button
                type="button"
                className="cover-crop-close"
                onClick={closeCropModal}
                aria-label="Close crop modal"
              >
                ×
              </button>
            </div>

            {/* CROP AREA */}

            <div
              ref={cropAreaRef}
              className={`cover-crop-area ${
                dragState.dragging ? "is-dragging" : ""
              }`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {displayPosition.width > 0 && displayPosition.height > 0 && (
                <CampaignStorageImage
                  src={sourceImage}
                  alt="Adjust campaign cover"
                  draggable="false"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,

                    display: "block",

                    width: `${displayPosition.width}px`,
                    height: `${displayPosition.height}px`,

                    maxWidth: "none",

                    transform: `translate3d(${displayPosition.x}px, ${displayPosition.y}px, 0)`,

                    transformOrigin: "top left",

                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              )}

              <div className="cover-crop-area__guide">
                <span>16:7</span>
              </div>
            </div>

            {/* ZOOM */}

            <div className="cover-crop-controls">
              <label>Zoom</label>

              <input
                type="range"
                min="1"
                max="3"
                step="0.01"
                value={cropState.scale}
                onChange={handleZoomChange}
              />
            </div>

            <p className="cover-crop-tip">
              Drag the photo until the most important part is inside the frame.
            </p>

            {/* ACTIONS */}

            <div className="cover-crop-actions">
              <button
                type="button"
                className="cover-crop-cancel"
                onClick={closeCropModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="cover-crop-confirm"
                onClick={createCroppedImage}
                disabled={!displayPosition.width || !displayPosition.height}
              >
                Use Image
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
