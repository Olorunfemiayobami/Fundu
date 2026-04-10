"use client";
import React, { useRef } from "react";

const categories = [
  { id: "724ab01c-2223-4514-93ec-27b2cc51b68e", name: "Medical & Health" },
  { id: "f3a6e06a-fbc0-433c-bc7e-aba8f6daf112", name: "Education" },
  { id: "080aec2c-7639-42cb-80c5-9038cdef5098", name: "Emergency & Crisis" },
  {
    id: "51f844c4-7e89-4f69-a1ac-97df2c652675",
    name: "Business & Entrepreneurship",
  },
  { id: "074b8ffc-2b60-4246-bcba-6b0a531a6574", name: "Community & Social" },
  { id: "5aa78afa-7eb5-4ec8-871f-22ae9a72e728", name: "Religion & Charity" },
  {
    id: "d798aa24-9418-4ef4-8b5b-1b1a0f1fce2c",
    name: "Personal & Life Events",
  },
  { id: "26ea1e87-3e40-4d48-bbc2-fa9da49c06b8", name: "Housing & Shelter" },
  { id: "25466d58-b1a0-4063-8844-6f9d61489bac", name: "Creative & Arts" },
  { id: "9f02e510-1975-466f-bf44-d0365a4cd7fc", name: "Sports & Fitness" },
  {
    id: "15004dff-0e91-4fdd-918e-748c31c59b11",
    name: "Technology & Innovation",
  },
  { id: "81a278dd-d3a9-46fc-bb6e-1ef3625e498b", name: "Animals & Environment" },
];

export default function BasicInfo({
  formData,
  setFormData,
  onNext,
  onSaveDraft,
  isSaving, // Added isSaving prop
}) {
  const fileInputRef = useRef(null);

  const canContinue =
    formData.title &&
    formData.categoryId &&
    formData.goal &&
    formData.imagePreview;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("The image is too large. Please select a file smaller than 10MB.");
      e.target.value = "";
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Please upload a JPG, PNG, or WebP image.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        imagePreview: reader.result,
        coverImageFile: file,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="form-intro-section">
        <h1 className="form-main-title">Let's start with the basics</h1>
        <p className="form-sub-title">
          Tell us about your campaign in a few simple steps
        </p>
      </div>

      <div className="form-container-main">
        <div className="form-group">
          <label className="form-label">
            Cover Image <span>*</span>
          </label>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.webp"
          />
          <div
            className={`upload-box ${isSaving ? "disabled" : ""}`}
            onClick={() => !isSaving && fileInputRef.current.click()}
          >
            {formData.imagePreview ? (
              <div className="preview-container">
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="image-preview-render"
                />
                {!isSaving && (
                  <div className="change-image-overlay">
                    Click to change image
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="upload-icon-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <path
                      d="M24 6V30"
                      stroke="#1E807F"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M34 16L24 6L14 16"
                      stroke="#1E807F"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M42 30V38C42 42 38 42 38 42H10C6 42 6 38 6 38V30"
                      stroke="#1E807F"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="upload-text">Upload cover image</p>
                <span className="upload-subtext">
                  PNG, JPG, or WebP up to 10MB
                </span>
              </>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Campaign Title <span>*</span>
          </label>
          <input
            className="input-field"
            placeholder="Enter a compelling title"
            value={formData.title}
            disabled={isSaving}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Category <span>*</span>
          </label>
          <select
            className="input-field"
            value={formData.categoryId || ""}
            disabled={isSaving}
            onChange={(e) => {
              const selectedId = e.target.value;
              const selectedCat = categories.find((c) => c.id === selectedId);
              setFormData({
                ...formData,
                categoryId: selectedId,
                category: selectedCat ? selectedCat.name : "",
              });
            }}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">
            Goal Amount <span>*</span>
          </label>
          <input
            className="input-field"
            type="number"
            placeholder="₦ 50,000"
            value={formData.goal}
            disabled={isSaving}
            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Organiser Name <span className="optional-text">(Optional)</span>
          </label>
          <input
            className="input-field"
            placeholder="Enter a name"
            value={formData.organiser}
            disabled={isSaving}
            onChange={(e) =>
              setFormData({ ...formData, organiser: e.target.value })
            }
          />
          <p className="helper-text">
            Enter a name if you want a different name from your profile name
          </p>
        </div>

        <div className="form-group">
          <label className="form-label">
            Campaign Duration <span className="optional-text">(Optional)</span>
          </label>
          <select
            className="input-field"
            value={formData.duration}
            disabled={isSaving}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
          >
            <option value="">Choose Duration</option>
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
            <option value="90">90 Days</option>
          </select>
        </div>

        <div className="form-actions">
          <button className="btn-cancel" type="button" disabled={isSaving}>
            Cancel process
          </button>

          <button
            className={`btn-continue ${canContinue ? "filled" : ""} ${isSaving ? "is-loading" : ""}`}
            onClick={onNext}
            disabled={!canContinue || isSaving}
            type="button"
          >
            {isSaving ? (
              <div className="button-loader-content">
                <div className="spinner"></div>
                <span>Saving...</span>
              </div>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
