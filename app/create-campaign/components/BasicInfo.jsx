"use client";

import React from "react";

const categories = [
  { id: "724ab01c-2223-4514-93ec-27b2cc51b68e", name: "Medical & Health" },
  { id: "f3a6e06a-fbc0-433c-bc7e-aba8f6daf112", name: "Education" },
  { id: "080aec2c-7639-42cb-80c5-9038cdef5098", name: "Emergency & Crisis" },
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
  onSaveDraft,
  isSaving,
}) {
  const today = new Date().toISOString().split("T")[0];

  const canContinue =
    formData.title && formData.categoryId && formData.goal && formData.duration;

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
            Campaign Title <span>*</span>
          </label>

          <input
            className="input-field"
            placeholder="Enter a compelling title"
            value={formData.title}
            disabled={isSaving}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
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
              const selectedCat = categories.find(
                (category) => category.id === selectedId,
              );

              setFormData({
                ...formData,
                categoryId: selectedId,
                category: selectedCat ? selectedCat.name : "",
              });
            }}
          >
            <option value="">Select a category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
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
            type="text"
            inputMode="numeric"
            placeholder="Enter an amount"
            value={
              formData.goal
                ? `₦${Number(formData.goal).toLocaleString("en-NG")}`
                : ""
            }
            disabled={isSaving}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[₦,\s]/g, "");

              if (/^\d*$/.test(rawValue)) {
                setFormData({
                  ...formData,
                  goal: rawValue,
                });
              }
            }}
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
              setFormData({
                ...formData,
                organiser: e.target.value,
              })
            }
          />

          <p className="helper-text">
            Enter a name if you want a different name from your profile name
          </p>
        </div>

        <div className="form-group">
          <label className="form-label">
            Campaign End Date <span>*</span>
          </label>

          <input
            className="input-field"
            type="date"
            min={today}
            value={formData.duration || ""}
            disabled={isSaving}
            onChange={(e) =>
              setFormData({
                ...formData,
                duration: e.target.value,
              })
            }
          />

          <p className="helper-text">
            Choose the date you want your campaign to end
          </p>
        </div>

        <div className="form-actions">
          <button className="btn-cancel" type="button" disabled={isSaving}>
            Cancel process
          </button>

          <button
            className={`btn-continue ${
              canContinue ? "filled" : ""
            } ${isSaving ? "is-loading" : ""}`}
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
