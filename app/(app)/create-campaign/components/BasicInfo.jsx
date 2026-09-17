"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const categories = [
  {
    id: "724ab01c-2223-4514-93ec-27b2cc51b68e",
    name: "Medical & Health",
  },
  {
    id: "f3a6e06a-fbc0-433c-bc7e-aba8f6daf112",
    name: "Education",
  },
  {
    id: "080aec2c-7639-42cb-80c5-9038cdef5098",
    name: "Emergency & Crisis",
  },
  {
    id: "51f844c4-7e89-4f69-a1ac-97df2c652675",
    name: "Business & Entrepreneurship",
  },
  {
    id: "074b8ffc-2b60-4246-bcba-6b0a531a6574",
    name: "Community & Social",
  },
  {
    id: "5aa78afa-7eb5-4ec8-871f-22ae9a72e728",
    name: "Religion & Charity",
  },
  {
    id: "d798aa24-9418-4ef4-8b5b-1b1a0f1fce2c",
    name: "Personal & Life Events",
  },
  {
    id: "26ea1e87-3e40-4d48-bbc2-fa9da49c06b8",
    name: "Housing & Shelter",
  },
  {
    id: "25466d58-b1a0-4063-8844-6f9d61489bac",
    name: "Creative & Arts",
  },
  {
    id: "9f02e510-1975-466f-bf44-d0365a4cd7fc",
    name: "Sports & Fitness",
  },
  {
    id: "15004dff-0e91-4fdd-918e-748c31c59b11",
    name: "Technology & Innovation",
  },
  {
    id: "81a278dd-d3a9-46fc-bb6e-1ef3625e498b",
    name: "Animals & Environment",
  },
];

export default function BasicInfo({
  formData,
  setFormData,
  onNext,
  onSaveAndExit,
  onCancel,
  isSaving,
  isRestarting = false,
}) {
  const today = new Date().toISOString().split("T")[0];

  /*
   * =========================================================
   * RESTART CAMPAIGN DATE
   * =========================================================
   */

  const tomorrow = useMemo(() => {
    const date = new Date();

    date.setDate(date.getDate() + 1);

    return date.toISOString().split("T")[0];
  }, []);

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

    if (value !== "" && value !== null && value !== undefined) {
      clearError(field);
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
    const isValid = validateBasicInfo();

    if (!isValid) {
      requestAnimationFrame(() => {
        const firstError = document.querySelector(".form-field-error");

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

  const displayPosition = getDisplayPosition();

  /*
   * =========================================================
   * UI
   * =========================================================
   */

  return (
    <>
      <div className="form-intro-section">
        <h1 className="form-main-title">Let's start with the basics</h1>

        <p className="form-sub-title">
          Tell us about your campaign in a few simple steps
        </p>
      </div>

      <div className="form-container-main">
        {/* =====================================================
            CAMPAIGN TITLE
        ====================================================== */}

        <div className="form-group">
          <label className="form-label">
            Campaign Title <span>*</span>
          </label>

          <input
            className={`input-field ${
              errors.title ? "input-field--error" : ""
            }`}
            placeholder="Enter a compelling title"
            value={formData.title || ""}
            onChange={(event) => updateField("title", event.target.value)}
          />

          {errors.title && <p className="form-field-error">{errors.title}</p>}
        </div>

        {/* =====================================================
            CATEGORY
        ====================================================== */}

        <div className="form-group">
          <label className="form-label">
            Category <span>*</span>
          </label>

          <select
            className={`input-field ${
              errors.categoryId ? "input-field--error" : ""
            }`}
            value={formData.categoryId || ""}
            onChange={(event) => {
              const selectedId = event.target.value;

              const selectedCategory = categories.find(
                (category) => category.id === selectedId,
              );

              setFormData((current) => ({
                ...current,

                categoryId: selectedId,

                category: selectedCategory?.name || "",
              }));

              if (selectedId) {
                clearError("categoryId");
              }
            }}
          >
            <option value="">Select a category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {errors.categoryId && (
            <p className="form-field-error">{errors.categoryId}</p>
          )}
        </div>

        {/* =====================================================
            GOAL
        ====================================================== */}

        <div className="form-group">
          <label className="form-label">
            Goal Amount <span>*</span>
          </label>

          <input
            className={`input-field ${errors.goal ? "input-field--error" : ""}`}
            type="text"
            inputMode="numeric"
            placeholder="Enter an amount"
            value={
              formData.goal
                ? `₦${Number(formData.goal).toLocaleString("en-NG")}`
                : ""
            }
            onChange={(event) => {
              const rawValue = event.target.value.replace(/[₦,\s]/g, "");

              if (/^\d*$/.test(rawValue)) {
                updateField("goal", rawValue);
              }
            }}
          />

          {errors.goal && <p className="form-field-error">{errors.goal}</p>}
        </div>

        {/* =====================================================
            ORGANISER
        ====================================================== */}

        <div className="form-group">
          <label className="form-label">
            Organiser Name <span className="optional-text">(Optional)</span>
          </label>

          <input
            className="input-field"
            placeholder="Enter a name"
            value={formData.organiser || ""}
            onChange={(event) => updateField("organiser", event.target.value)}
          />

          <p className="helper-text">
            Enter a name if you want a different name from your profile name
          </p>
        </div>

        {/* =====================================================
            END DATE
        ====================================================== */}

        <div className="form-group">
          {isRestarting && (
            <div className="restart-end-date-notice">
              <strong>Choose a new campaign end date</strong>

              <p>
                Your previous campaign has ended. Select a new future date to
                restart it.
              </p>
            </div>
          )}

          <label className="form-label">
            {isRestarting ? "New Campaign End Date" : "Campaign End Date"}{" "}
            <span>*</span>
          </label>

          <input
            className={`input-field ${
              errors.duration ? "input-field--error" : ""
            }`}
            type="date"
            min={minimumEndDate}
            value={formData.duration || ""}
            onChange={(event) => updateField("duration", event.target.value)}
          />

          <p className="helper-text">
            {isRestarting
              ? "Choose when you want the restarted campaign to end"
              : "Choose the date you want your campaign to end"}
          </p>

          {errors.duration && (
            <p className="form-field-error">{errors.duration}</p>
          )}
        </div>

        {/* =====================================================
            COVER IMAGE
        ====================================================== */}

        <div className="form-group">
          <label className="form-label">
            Cover Image <span>*</span>
          </label>

          <p className="helper-text cover-image-helper">
            Upload a campaign cover image. It will be displayed in a 16:7 ratio.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="cover-file-input"
            onChange={handleImageSelect}
          />

          {existingCoverImage ? (
            <div
              className={`cover-image-preview ${
                errors.coverImage ? "cover-image-preview--error" : ""
              }`}
            >
              <img src={existingCoverImage} alt="Campaign cover preview" />

              <div className="cover-image-preview__overlay">
                <button
                  type="button"
                  className="cover-image-change-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change Image
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
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
                You'll be able to reposition the image before using it.
              </p>
            </button>
          )}

          {errors.coverImage && (
            <p className="form-field-error">{errors.coverImage}</p>
          )}
        </div>

        {/* =====================================================
            BOTTOM NAVIGATION
        ====================================================== */}

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
              onClick={onCancel}
              disabled={isSaving}
            >
              Cancel process
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
                "Continue"
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
                <img
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
