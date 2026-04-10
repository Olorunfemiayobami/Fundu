"use client";
import React, { useState, useEffect, useRef } from "react";
import InputField from "@/components/ui/InputField";
import { supabase } from "@/lib/supabase";

export default function Profile() {
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    email: "",
    username: "",
    bio: "",
    countryCode: "+234",
    phone: "",
    avatarUrl: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setFormData({
            id: user.id,
            fullName: user.user_metadata?.full_name || "",
            email: user.email || "",
            username: user.user_metadata?.username || "",
            bio: user.user_metadata?.bio || "",
            countryCode: user.user_metadata?.country_code || "+234",
            phone: user.user_metadata?.phone || "",
            avatarUrl: user.user_metadata?.avatar_url || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !formData.id) return;

    // 1. Added a frontend check to match your 5MB bucket limit
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    setUploadingImage(true);
    try {
      const fileExt = file.name.split(".").pop();

      // 2. UPDATED PATH: This creates the folder /id/id.ext
      // This matches the SQL policy: (storage.foldername(name))[1] = auth.uid()
      const filePath = `${formData.id}/${formData.id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type, // Ensures the correct mime-type is sent
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      const publicUrl = `${data.publicUrl}?t=${new Date().getTime()}`;

      setFormData((prev) => ({ ...prev, avatarUrl: publicUrl }));

      // Immediately sync with auth metadata
      await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });

      console.log("Avatar updated successfully");
    } catch (error) {
      console.error("Error uploading image:", error.message);
      alert("Upload failed: " + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = async () => {
    if (isEditing) {
      try {
        const { error } = await supabase.auth.updateUser({
          data: {
            full_name: formData.fullName,
            username: formData.username,
            bio: formData.bio,
            country_code: formData.countryCode,
            phone: formData.phone,
            avatar_url: formData.avatarUrl,
          },
        });

        if (error) throw error;
        alert("Profile updated!");
      } catch (error) {
        alert("Update failed: " + error.message);
      }
    }
    setIsEditing(!isEditing);
  };

  if (loading)
    return (
      <div className="tab-loading-overlay">
        <div className="spinner"></div>
        <p
          className="font-urbanist"
          style={{ color: "#E9FFFE", fontSize: "14px", fontWeight: "500" }}
        >
          Fetching your profile...
        </p>
      </div>
    );

  return (
    <section className="profile-body" style={{ flex: 1 }}>
      <div
        className="profile-top-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          className="profile-header-text font-urbanist"
          style={{ fontSize: "20px", fontWeight: "600" }}
        >
          Profile
        </h3>
        <button
          className={
            isEditing ? "btn-continue filled" : "btn-save-draft-aligned"
          }
          onClick={toggleEdit}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <div className="profile-image-wrapper">
        <div
          className="profile-avatar-circle font-urbanist"
          style={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f0f0",
          }}
        >
          {uploadingImage ? (
            <span style={{ fontSize: "14px" }}>Uploading...</span>
          ) : formData.avatarUrl ? (
            <img
              src={formData.avatarUrl}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span
              style={{ fontSize: "32px", fontWeight: "bold", color: "#1E807F" }}
            >
              {formData.fullName
                ? formData.fullName.charAt(0).toUpperCase()
                : "U"}
            </span>
          )}

          {isEditing && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: "none" }}
              />
              <button
                className="upload-camera-btn"
                onClick={() => fileInputRef.current.click()}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 100,
                  borderRadius: "50%", // Makes the button itself a circle
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M4.50417 14.6673H11.4908C13.3308 14.6673 14.0642 13.5407 14.1508 12.1673L14.4975 6.66065C14.5908 5.22065 13.4442 4.00065 11.9975 4.00065C11.5908 4.00065 11.2175 3.76732 11.0308 3.40732L10.5508 2.44065C10.2442 1.83398 9.44417 1.33398 8.76417 1.33398H7.23751C6.55084 1.33398 5.75084 1.83398 5.44417 2.44065L4.96417 3.40732C4.77751 3.76732 4.40417 4.00065 3.99751 4.00065C2.55084 4.00065 1.40417 5.22065 1.49751 6.66065L1.84417 12.1673C1.92417 13.5407 2.66417 14.6673 4.50417 14.6673Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 5.33398H9"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.0026 11.9993C9.19594 11.9993 10.1693 11.026 10.1693 9.83268C10.1693 8.63935 9.19594 7.66602 8.0026 7.66602C6.80927 7.66602 5.83594 8.63935 5.83594 9.83268C5.83594 11.026 6.80927 11.9993 8.0026 11.9993Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="profile-form-container">
        <InputField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Enter your name"
        />
        <InputField
          label="Email"
          name="email"
          value={formData.email}
          disabled={true}
        />
        <InputField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Enter a username"
        />
        <InputField
          label="Bio"
          name="bio"
          isTextArea={true}
          value={formData.bio}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Tell us a bit about yourself..."
        />

        <div className="form-group">
          <label className="form-label font-urbanist">Phone Number</label>
          <div className="phone-input-combined">
            <div className="country-code-wrapper">
              <InputField
                isSelect={true}
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                disabled={!isEditing}
                options={[
                  { value: "+234", label: "+234" },
                  { value: "+1", label: "+1" },
                  { value: "+44", label: "+44" },
                ]}
              />
            </div>
            <div className="phone-number-wrapper">
              <InputField
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="profile-bottom-banner">
        <p className="banner-text font-urbanist">
          💡 Your profile information is visible to campaign creators when you
          donate.
        </p>
      </div>
    </section>
  );
}
