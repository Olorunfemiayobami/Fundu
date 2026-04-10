"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BasicInfo from "./components/BasicInfo";
import Story from "./components/Story";
import PreviewCampaign from "./components/PreviewCampaign";
import PublishCampaign from "./components/PublishCampaign";
import { saveCampaign } from "@/lib/saveCampaign";
import { supabase } from "@/lib/supabase";
import "./styles/campaignform.css";

function CreateCampaignContent() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [step, setStep] = useState(1);
  const [campaignId, setCampaignId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!!editId);

  // --- NEW STATE FOR SUCCESS SCREEN ---
  const [isPublished, setIsPublished] = useState(false);
  const [campaignLink, setCampaignLink] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    categoryId: "",
    goal: "",
    organiser: "",
    duration: "",
    imagePreview: null,
    coverImageFile: null,
    currency: "NGN",
    country: "Nigeria",
    shortDescription: "",
  });

  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    if (editId) {
      const fetchCampaignData = async () => {
        try {
          const { data, error } = await supabase
            .from("campaigns")
            .select("*")
            .eq("id", editId)
            .single();

          if (error) throw error;

          if (data) {
            setCampaignId(data.id);
            const dbImage = data.cover_image || data.image_url || null;

            setFormData({
              title: data.title || "",
              category: data.category || "",
              categoryId: data.category_id || "",
              goal: data.goal_amount || "",
              organiser: data.organiser_name || "",
              duration: data.duration?.toString() || "",
              imagePreview: dbImage,
              currency: data.currency || "NGN",
              country: data.country || "Nigeria",
              shortDescription: data.description || "",
            });

            if (data.story_blocks) {
              const parsedBlocks =
                typeof data.story_blocks === "string"
                  ? JSON.parse(data.story_blocks)
                  : data.story_blocks;
              setBlocks(parsedBlocks);
            }
          }
        } catch (error) {
          console.error("Error loading campaign for edit:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCampaignData();
    }
  }, [editId]);

  const handleSaveProcess = async (
    currentFormData = formData,
    currentBlocks = blocks,
    payoutDetails = null,
    isFinalPublish = false,
  ) => {
    setIsSaving(true);
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) {
        alert("Authentication error: Please sign in to save your campaign.");
        return false;
      }

      const result = await saveCampaign({
        campaignId: campaignId || editId,
        userId: user.id,
        formData: currentFormData,
        blocks: currentBlocks,
        payoutDetails: payoutDetails,
        status: isFinalPublish ? "active" : "draft",
      });

      if (result.success) {
        setCampaignId(result.campaignId);
        // Set the link for the success screen
        setCampaignLink(
          `${window.location.origin}/campaigns/${result.campaignId}`,
        );
        return true;
      } else {
        alert("Save failed: " + result.error);
        return false;
      }
    } catch (error) {
      console.error("Unexpected error saving:", error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async (payoutDetails) => {
    const saved = await handleSaveProcess(
      formData,
      blocks,
      payoutDetails,
      true,
    );
    if (saved) {
      // --- UPDATE: SHOW SUCCESS SCREEN INSTEAD OF ALERT ---
      setIsPublished(true);
    }
  };

  const nextStep = async () => {
    if (step === 1 || step === 2) {
      const saved = await handleSaveProcess();
      if (!saved) return;
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const steps = [
    { id: 1, label: "Basic Info" },
    { id: 2, label: "Story" },
    { id: 3, label: "Preview" },
    { id: 4, label: "Publish" },
  ];

  if (isLoading) {
    return (
      <div
        className="create-campaign-page"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div className="spinner"></div>
        <p className="font-urbanist" style={{ marginTop: "12px" }}>
          Loading campaign data...
        </p>
      </div>
    );
  }

  // --- NEW: SUCCESS SCREEN RENDER LOGIC ---
  if (isPublished) {
    return (
      <div
        className="create-campaign-page"
        style={{
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <div
          className="success-card-container"
          style={{
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "24px",
            boxShadow: "0px 10px 30px rgba(0,0,0,0.05)",
            textAlign: "center",
            maxWidth: "420px",
            width: "90%",
            border: "1px solid #F0F0F0",
          }}
        >
          <div
            className="success-icon-circle"
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#1B827F",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 13L9 17L19 7"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2
            className="font-urbanist"
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#0A0A0A",
              marginBottom: "8px",
            }}
          >
            Your campaign is live! 🥳
          </h2>
          <p
            className="font-urbanist"
            style={{ color: "#666", marginBottom: "32px", lineHeight: "1.5" }}
          >
            Congratulations! Your campaign has been created successfully.
          </p>

          <button
            onClick={() => (window.location.href = campaignLink)}
            style={{
              width: "100%",
              backgroundColor: "#1B827F",
              color: "#white",
              padding: "16px",
              borderRadius: "12px",
              border: "none",
              fontWeight: "600",
              fontSize: "16px",
              cursor: "pointer",
              marginBottom: "16px",
            }}
          >
            View Campaign
          </button>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => {
                navigator.clipboard.writeText(campaignLink);
                alert("Link copied!");
              }}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #E0E0E0",
                backgroundColor: "white",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              <span>🔗</span> Copy Link
            </button>
            <button
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #E0E0E0",
                backgroundColor: "white",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              <span>📤</span> Share
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="create-campaign-page">
      <div className="page-title-bar">
        <div className="title-left">
          <div className="back-btn" onClick={() => step > 1 && prevStep()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.9974 15.8302L4.16406 9.9981L9.9974 4.16602"
                stroke="#0A0A0A"
                strokeWidth="1.66631"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.8307 9.99805H4.16406"
                stroke="#0A0A0A"
                strokeWidth="1.66631"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="page-title-text">
            {editId ? "Edit campaign" : "Create campaign"}
          </h3>
        </div>
        <button
          className={`btn-save-draft-aligned ${isSaving ? "is-loading" : ""}`}
          onClick={() => handleSaveProcess()}
          disabled={isSaving}
        >
          {isSaving ? (
            <div className="button-loader-content">
              <div className="spinner"></div>
              <span>Saving...</span>
            </div>
          ) : (
            "Save Draft"
          )}
        </button>
      </div>

      <div className="campaign-inner-container">
        <div className="progress-container-main">
          {steps.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="step-wrapper">
                <div
                  className={`step-circle ${step >= item.id ? "active" : "inactive"}`}
                >
                  {item.id}
                </div>
                <span
                  className={`step-label-bottom ${step >= item.id ? "active" : "inactive"}`}
                >
                  {item.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="step-connector-line"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {step === 1 && (
          <BasicInfo
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onSaveDraft={handleSaveProcess}
            isSaving={isSaving}
          />
        )}

        {step === 2 && (
          <Story
            formData={formData}
            setFormData={setFormData}
            blocks={blocks}
            setBlocks={setBlocks}
            onNext={nextStep}
            onBack={prevStep}
            onSaveDraft={handleSaveProcess}
            isSaving={isSaving}
          />
        )}

        {step === 3 && (
          <div className="preview-step-wrapper">
            <PreviewCampaign
              campaignData={formData}
              blocks={blocks}
              onNext={nextStep}
              onBack={prevStep}
            />
          </div>
        )}

        {step === 4 && (
          <PublishCampaign
            onBack={prevStep}
            onPublish={handlePublish}
            isSaving={isSaving}
          />
        )}
      </div>
    </div>
  );
}

export default function CreateCampaign() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateCampaignContent />
    </Suspense>
  );
}
