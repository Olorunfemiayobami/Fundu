"use client";
import { useState, useEffect, useRef } from "react";
import "../../styles/campaignform.css";

const categories = [
  "Medical & Health",
  "Education",
  "Emergency & Crisis",
  "Business & Entrepreneurship",
  "Community & Social",
  "Religion & Charity",
  "Personal & Life Events",
  "Housing & Shelter",
  "Creative & Arts",
  "Sports & Fitness",
  "Technology & Innovation",
  "Animals & Environment",
];

const durations = [
  "1 week",
  "2 weeks",
  "3 weeks",
  "4 weeks",
  "5 weeks",
  "6 weeks",
  "7 weeks",
  "8 weeks",
];

export default function CreateCampaign() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    goal: "",
    organiser: "",
    duration: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isFilled, setIsFilled] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const { title, category, goal } = formData;
    setIsFilled(!!(title.trim() && category && goal && imagePreview));
  }, [formData, imagePreview]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setOpenDropdown(null);
  };

  const toggleDropdown = (e, name) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className="create-campaign-page">
      <div className="campaign-inner-container">
        {/* Progress Header */}
        <div className="progress-header-row">
          <div className="progress-bar">
            <div className="progress-stage">
              <div className="step-num-container active">
                <span className="step-number-text">1</span>
              </div>
              <span className="step-label active">Basic info</span>
            </div>
            <div className="stage-line"></div>
            <div className="progress-stage">
              <div className="step-num-container inactive">
                <span className="step-number-text">2</span>
              </div>
              <span className="step-label inactive">Story</span>
            </div>
            <div className="stage-line"></div>
            <div className="progress-stage">
              <div className="step-num-container inactive">
                <span className="step-number-text">3</span>
              </div>
              <span className="step-label inactive">Preview</span>
            </div>
            <div className="stage-line"></div>
            <div className="progress-stage">
              <div className="step-num-container inactive">
                <span className="step-number-text">4</span>
              </div>
              <span className="step-label inactive">Publish</span>
            </div>
          </div>
          <button className="btn-save-draft">Save Draft</button>
        </div>

        <div className="form-intro-section">
          <h1 className="form-main-title">Let's start with the basics</h1>
          <p className="form-sub-title">
            Tell us about your campaign in a few simple steps
          </p>
        </div>

        <div className="form-container-main">
          {/* Cover Image Upload */}
          <div className="form-group">
            <label className="form-label">
              Cover Image <span>*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="hidden-file-input"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <div
              className="upload-box"
              onClick={() => fileInputRef.current.click()}
            >
              {imagePreview ? (
                <div className="preview-container">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview-render"
                  />
                  <div className="change-image-overlay">
                    Click to change image
                  </div>
                </div>
              ) : (
                <>
                  <div className="upload-icon-container">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
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
                  <p className="upload-text">Upload cover image or video</p>
                  <span className="upload-subtext">
                    PNG, JPG, MP4 up to 10MB
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
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <p className="helper-text">Make it clear and compelling</p>
          </div>

          <div className="form-group dropdown-relative">
            <label className="form-label">
              Category <span>*</span>
            </label>
            <div
              className="dropdown-trigger"
              onClick={(e) => toggleDropdown(e, "category")}
            >
              <span>{formData.category || "Select a category"}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className={openDropdown === "category" ? "rotate" : ""}
              >
                <path
                  d="M5.83594 8.33203L10.0026 12.4987L14.1693 8.33203"
                  stroke="#1E807F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {openDropdown === "category" && (
              <div className="category-list-container">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className="category-item"
                    onClick={() => handleSelect("category", cat)}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Goal Amount <span>*</span>
            </label>
            <input
              className="input-field"
              placeholder="$ 50,000"
              type="number"
              value={formData.goal}
              onChange={(e) =>
                setFormData({ ...formData, goal: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, organiser: e.target.value })
              }
            />
          </div>

          <div className="form-group dropdown-relative">
            <label className="form-label">
              Campaign Duration{" "}
              <span className="optional-text">(Optional)</span>
            </label>
            <div
              className="dropdown-trigger"
              onClick={(e) => toggleDropdown(e, "duration")}
            >
              <span>{formData.duration || "Choose Duration"}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className={openDropdown === "duration" ? "rotate" : ""}
              >
                <path
                  d="M5.83594 8.33203L10.0026 12.4987L14.1693 8.33203"
                  stroke="#1E807F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {openDropdown === "duration" && (
              <div className="category-list-container">
                {durations.map((dur) => (
                  <div
                    key={dur}
                    className="category-item"
                    onClick={() => handleSelect("duration", dur)}
                  >
                    {dur}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button className="btn-cancel">Cancel process</button>
            <button className={`btn-continue ${isFilled ? "filled" : ""}`}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
